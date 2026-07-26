"""Build files/chengyuan-zhang.bib from verified Crossref and arXiv metadata.

Provenance rules:
  * DOI entries are fetched live from Crossref. Each DOI was confirmed earlier at
    title similarity 1.00 against the title on the publications page.
  * arXiv entries are fetched live from the arXiv API.
  * MANUAL entries are for records no registry can supply (papers accepted but not
    yet published, a Chinese textbook, a patent, and one paper whose publisher has
    not deposited its DOI). Their fields come from the publications page and, for
    the Transportation Science paper, from the arXiv journal reference.

Nothing here is invented. Run from the repository root.
"""
from __future__ import annotations

import json
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

UA = "chengyuan-zhang.github.io bibliography build (mailto:enzozcy@gmail.com)"
ATOM = {"a": "http://www.w3.org/2005/Atom"}

DOIS: dict[str, str] = {
    "zhang2024calibrating": "10.1016/j.trc.2024.104719",
    "zhang2024bayesian": "10.1109/tits.2024.3354102",
    "chen2024bayesian": "10.1109/tits.2023.3334909",
    "chen2023discovering": "10.1109/tkde.2023.3294440",
    "zhang2022spatiotemporal": "10.1109/tits.2021.3057645",
    "zhang2019efficient": "10.1115/1.4043688",
    "zhang2018chaotic": "10.1115/1.4037931",
    "zhang2024learning": "10.1109/iv55156.2024.10588568",
    "zhang2023interactive": "10.1109/itsc57777.2023.10421996",
    "wang2020learning": "10.1109/iv47402.2020.9304849",
    "zhang2019general": "10.1109/itsc.2019.8917212",
    "wang2022social": "10.1561/9781638281290",
}

ARXIV: dict[str, str] = {
    "kong2026active": "2602.05246",
    "zhang2025markov": "2506.14762",
    "zhang2025context": "2507.07012",
}

MANUAL = r"""@article{chen2025forecasting,
  author    = {Chen, Xinyu and Zhang, Chengyuan and Zhao, Xi-Le and Saunier, Nicolas and Sun, Lijun},
  title     = {Forecasting Sparse Movement Speed of Urban Road Networks with Nonstationary Temporal Matrix Factorization},
  journal   = {Transportation Science},
  year      = {2025},
  doi       = {10.1287/trsc.2024.0629},
  note      = {arXiv:2203.10651}
}

@inproceedings{kong2026online,
  author    = {Kong, Menglin and Zhang, Chengyuan and Sun, Lijun},
  title     = {Online Calibration of Context-Driven Car-Following Models},
  booktitle = {2026 {IEEE} Intelligent Vehicles Symposium ({IV})},
  year      = {2026},
  note      = {Accepted}
}

@inproceedings{hickert2026autotune,
  author    = {Hickert, Cameron and Wang, Athena and Samaei, Maryam and Zhang, Chengyuan and Sun, Lijun and Wang, Yanbing and Ameli, Mostafa and Wu, Cathy},
  title     = {{AutoTune}: A Unified Benchmark for Highway Traffic Microsimulation Calibration},
  booktitle = {2026 {IEEE} Intelligent Vehicles Symposium ({IV})},
  year      = {2026},
  note      = {Accepted}
}

@book{chen2023latex,
  author    = {Chen, Xinyu and Jin, Jieling and Liao, Qionghua and Zhang, Chengyuan and Chen, Xiaoxu},
  title     = {Academic Writing with {LaTeX}},
  publisher = {Tsinghua University Press},
  year      = {2023},
  note      = {In Chinese}
}

@misc{zhang2018patent,
  author       = {Zhang, Chengyuan and Zhang, Xiaomin and Ye, Hongyun and Shi, Jinming and Wang, Manzhi and Ning, Xianxiong},
  title        = {Cam-Connecting Rod Type Mechanical Three-Dimensional Parking Device},
  howpublished = {Chinese patent {CN108222589B}},
  year         = {2018}
}
"""


def get(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.read()
    except Exception as exc:  # noqa: BLE001
        print(f"  ! {url}: {exc}", file=sys.stderr)
        return None


PROPER_NOUNS = ("Bayesian", "Gaussian", "Markov", "Hankel", "Kalman", "Dirichlet", "Poisson")


def braces(s: str) -> str:
    """Protect acronyms, CamelCase and proper nouns from BibTeX style lowercasing."""
    s = re.sub(r"(?<![{\w])([A-Z]{2,}|[A-Z][a-z]*[A-Z][A-Za-z]*)(?![}\w])", r"{\1}", s)
    for noun in PROPER_NOUNS:
        s = re.sub(rf"(?<![{{\w]){noun}(?![}}\w])", f"{{{noun}}}", s)
    return s


def year_of(m: dict) -> str:
    for k in ("published-print", "published-online", "issued", "created"):
        parts = m.get(k, {}).get("date-parts") or []
        if parts and parts[0] and parts[0][0]:
            return str(parts[0][0])
    return ""


def authors_of(m: dict) -> str:
    out = []
    for a in m.get("author", []):
        fam, giv = a.get("family"), a.get("given")
        out.append(f"{fam}, {giv}" if fam and giv else (fam or giv or ""))
    return " and ".join(x for x in out if x)


def fmt(entry_type: str, key: str, fields: dict[str, str]) -> str:
    rows = [f"  {k:<9} = {{{v}}}" for k, v in fields.items() if v]
    return f"@{entry_type}{{{key},\n" + ",\n".join(rows) + "\n}\n"


def from_crossref(key: str, doi: str) -> str | None:
    raw = get(f"https://api.crossref.org/works/{urllib.parse.quote(doi)}")
    if not raw:
        return None
    m = json.loads(raw)["message"]
    title = braces((m.get("title") or [""])[0])
    container = braces((m.get("container-title") or [""])[0])
    author, year, doi_out = authors_of(m), year_of(m), m.get("DOI", "")
    typ = m.get("type", "")
    if typ == "proceedings-article":
        return fmt("inproceedings", key, {
            "author": author, "title": title, "booktitle": container,
            "pages": m.get("page", ""), "year": year,
            "publisher": m.get("publisher", ""), "doi": doi_out,
        })
    if typ in ("monograph", "book"):
        return fmt("book", key, {
            "author": author, "title": title,
            "publisher": m.get("publisher", ""), "year": year, "doi": doi_out,
        })
    return fmt("article", key, {
        "author": author, "title": title, "journal": container,
        "volume": m.get("volume", ""), "number": m.get("issue", ""),
        "pages": m.get("page", ""), "year": year, "doi": doi_out,
    })


def from_arxiv(key: str, arxiv_id: str) -> str | None:
    raw = get(f"http://export.arxiv.org/api/query?id_list={arxiv_id}")
    if not raw:
        return None
    entry = ET.fromstring(raw).find("a:entry", ATOM)
    if entry is None:
        return None
    title = " ".join((entry.findtext("a:title", namespaces=ATOM) or "").split())
    names = [a.findtext("a:name", namespaces=ATOM) or "" for a in entry.findall("a:author", ATOM)]
    author = " and ".join(
        f"{n.rsplit(' ', 1)[1]}, {n.rsplit(' ', 1)[0]}" if " " in n else n for n in names
    )
    year = (entry.findtext("a:published", namespaces=ATOM) or "")[:4]
    return fmt("misc", key, {
        "author": author,
        "title": braces(title),
        "year": year,
        "eprint": arxiv_id,
        "archivePrefix": "arXiv",
        "primaryClass": (entry.find("{http://arxiv.org/schemas/atom}primary_category") or {}).get("term", "")
        if entry.find("{http://arxiv.org/schemas/atom}primary_category") is not None else "",
        "note": f"arXiv:{arxiv_id}",
    })


def build_schema(bib_path: Path, out_path: Path) -> int:
    """Emit an ItemList of ScholarlyArticle from the generated bibliography."""
    text = bib_path.read_text(encoding="utf-8")
    items = []
    for blk in re.split(r"\n(?=@)", text):
        blk = blk.strip()
        if not blk.startswith("@"):
            continue
        etype = re.match(r"@(\w+)\{", blk).group(1)
        def field(name: str) -> str:
            m = re.search(rf"\n\s*{name}\s*=\s*\{{(.*?)\}},?\n", blk, re.S)
            return re.sub(r"[{}]", "", " ".join(m.group(1).split())) if m else ""

        title = field("title")
        if not title:
            continue
        node: dict = {
            "@type": "ScholarlyArticle" if etype in ("article", "inproceedings") else "CreativeWork",
            "headline": title,
            "author": [{"@type": "Person", "name": " ".join(reversed([p.strip() for p in a.split(",")])).strip()}
                       for a in field("author").split(" and ") if a.strip()],
        }
        if field("year"):
            node["datePublished"] = field("year")
        venue = field("journal") or field("booktitle") or field("publisher")
        if venue:
            node["isPartOf"] = {"@type": "Periodical", "name": venue}
        if field("doi"):
            node["sameAs"] = f"https://doi.org/{field('doi')}"
        elif field("eprint"):
            node["sameAs"] = f"https://arxiv.org/abs/{field('eprint')}"
        items.append(node)

    payload = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Publications of Chengyuan Zhang",
        "itemListOrder": "https://schema.org/ItemListOrderDescending",
        "numberOfItems": len(items),
        "itemListElement": [{"@type": "ListItem", "position": i + 1, "item": it}
                            for i, it in enumerate(items)],
    }
    out_path.write_text(
        "<!-- Generated from files/chengyuan-zhang.bib. Do not edit by hand. -->\n"
        '<script type="application/ld+json">\n'
        + json.dumps(payload, indent=2, ensure_ascii=False)
        + "\n</script>\n",
        encoding="utf-8",
    )
    print(f"wrote {out_path} with {len(items)} items, {out_path.stat().st_size / 1024:.1f} KB")
    return len(items)


def main() -> int:
    if not Path("_config.yml").exists():
        print("run from the repository root", file=sys.stderr)
        return 1

    header = (
        "% Bibliography for Chengyuan Zhang\n"
        "% https://chengyuan-zhang.github.io/publications/\n"
        "% Journal, conference and book entries are generated from Crossref;\n"
        "% preprints from the arXiv API. Please report errors to enzozcy@gmail.com.\n\n"
    )

    chunks, failed = [], []
    for key, doi in DOIS.items():
        bib = from_crossref(key, doi)
        (chunks if bib else failed).append(bib or f"{key} ({doi})")
        print(f"  {'crossref ' if bib else 'FAILED   '} {key}")
        time.sleep(1.0)
    for key, aid in ARXIV.items():
        bib = from_arxiv(key, aid)
        (chunks if bib else failed).append(bib or f"{key} (arXiv:{aid})")
        print(f"  {'arxiv    ' if bib else 'FAILED   '} {key}")
        time.sleep(1.0)

    if failed:
        print("\nUnresolved, refusing to invent entries:", failed, file=sys.stderr)
        return 1

    out = Path("files/chengyuan-zhang.bib")
    out.write_text(header + "\n".join(chunks) + "\n" + MANUAL, encoding="utf-8")
    total = len(chunks) + MANUAL.count("\n@") + 1
    print(f"\nwrote {out} with {total} entries, {out.stat().st_size / 1024:.1f} KB")
    build_schema(out, Path("_includes/publications-schema.html"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
