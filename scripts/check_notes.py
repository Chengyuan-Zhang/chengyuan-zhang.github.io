"""Render the Liquid in _pages/notes.md offline and check the generated markup.

The site cannot be built locally (this machine has Ruby 2.2.6, far below Jekyll's
minimum), so this reimplements just enough of Jekyll's object model and filters to
exercise the template. It guards two things that are easy to get wrong and only
show up after deploying:

  * whitespace, because a blank line inside a raw HTML block makes kramdown stop
    treating the block as HTML and leak closing tags into the visible text;
  * drift, because the list must stay consistent with _posts/ without anyone
    remembering to update it.

Requires PyYAML and python-liquid (1.x). Run from anywhere.
"""
from __future__ import annotations

import glob
import io
import os
import re
import sys
from typing import Any, Dict, List, Optional, Tuple

import yaml
from liquid import Environment

Post = Dict[str, Any]
Site = Dict[str, Any]


def front_matter(text: str) -> Tuple[Dict[str, Any], str]:
    match = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n", text, re.S)
    if match is None:
        raise ValueError("no front matter")
    return yaml.safe_load(match.group(1)), text[match.end():]


def load_posts(root: str) -> List[Post]:
    posts: List[Post] = []
    for path in glob.glob(os.path.join(root, "_posts", "*.md")):
        meta, body = front_matter(io.open(path, encoding="utf-8").read())
        posts.append({
            "title": " ".join(str(meta["title"]).split()),
            "permalink": meta["permalink"],
            "url": meta["permalink"],
            "date": str(meta["date"]),
            "tags": meta.get("tags") or [],
            "content": body,
            "file": os.path.basename(path),
        })
    posts.sort(key=lambda p: p["date"], reverse=True)   # Jekyll orders site.posts newest first
    return posts


def smartify(value: Any) -> str:
    text = str(value).replace("---", "\u2014").replace("--", "\u2013")
    return re.sub(r'"([^"]*)"', "\u201c\\1\u201d", text)


def build_env() -> Environment:
    env = Environment()
    env.add_filter("relative_url", lambda v: str(v))
    env.add_filter("absolute_url", lambda v: "https://chengyuan-zhang.github.io" + str(v))
    env.add_filter("smartify", smartify)
    env.add_filter("markdownify", lambda v: "<p>%s</p>" % v)
    env.add_filter("slugify", lambda v: re.sub(r"[^a-z0-9]+", "-", str(v).lower()).strip("-"))
    return env


def build_site(root: str) -> Site:
    def data(name: str) -> Any:
        path = os.path.join(root, "_data", name)
        return yaml.safe_load(io.open(path, encoding="utf-8").read())

    return {
        "posts": load_posts(root),
        "data": {"notes": data("notes.yml"), "note_topics": data("note_topics.yml")},
    }


def render(root: str, site: Optional[Site] = None) -> str:
    """Return the rendered body of _pages/notes.md."""
    _, template = front_matter(io.open(os.path.join(root, "_pages", "notes.md"), encoding="utf-8").read())
    return build_env().from_string(template).render(site=site or build_site(root), page={})


def repo_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))


def main() -> int:
    root = repo_root()
    site = build_site(root)
    out = render(root, site)
    failures: List[str] = []

    def check(label: str, ok: bool, detail: str = "") -> None:
        print("  [%s] %s%s" % ("OK " if ok else "FAIL", label, ("  -> " + detail) if detail else ""))
        if not ok:
            failures.append(label)

    print("渲染成功，共 %d 行\n" % len(out.split("\n")))

    found = re.search(r'<ol id="notes-list".*?</ol>', out, re.S)
    if found is None:
        print("  [FAIL] 未找到 notes-list")
        return 1
    block = found.group(0)
    lines = block.split("\n")

    print("--- 列表结构 ---")
    check("无空行 (kramdown 安全)", all(l.strip() for l in lines),
          str([i for i, l in enumerate(lines) if not l.strip()]))
    check("li 标签配对", block.count("<li") == block.count("</li>"),
          "%d 开 / %d 闭" % (block.count("<li"), block.count("</li>")))
    items = re.findall(r"<li([^>]*)>(.*?)</li>", block)
    check("条目数 == 数据条目数", len(items) == len(site["data"]["notes"]),
          "%d vs %d" % (len(items), len(site["data"]["notes"])))

    print("\n--- 与 _posts 的一致性 ---")
    by_url = {p["url"]: p for p in site["posts"]}
    hrefs = re.findall(r'<li[^>]*><a href="(/posts/[^"]+)"', block)
    check("内部链接全部指向真实文章", all(h in by_url for h in hrefs),
          str([h for h in hrefs if h not in by_url]))
    check("每篇文章都被引用", len(set(hrefs)) == len(by_url),
          str([u for u in by_url if u not in hrefs]))
    check("无 New 标记 (说明全部已登记)", ">New</span>" not in block)

    print("\n--- 标题来源 ---")
    labels = {e["post"]: e.get("label") for e in site["data"]["notes"] if e.get("post")}
    drift = [(h, t, by_url[h]["title"])
             for h, t in re.findall(r'<li[^>]*><a href="(/posts/[^"]+)">(.*?)</a>', block)
             if not labels.get(h) and t != smartify(by_url[h]["title"])]
    check("未覆盖标题与文章标题一致", not drift, str(drift))
    print("  有意简写的条目: %d" % sum(1 for v in labels.values() if v))

    print("\n--- 主题筛选 ---")
    valid = {t["id"] for t in site["data"]["note_topics"]}
    used = {t for a in re.findall(r'data-topics="([^"]*)"', block) for t in a.split()}
    check("data-topics 值均为已定义主题", used <= valid, str(used - valid))
    icon_of = {t["id"]: t["icon"] for t in site["data"]["note_topics"]}
    bad_icons = []
    for attrs, body in items:
        declared = re.search(r'data-topics="([^"]*)"', attrs)
        want = "".join(icon_of[t] for t in declared.group(1).split()) if declared else ""
        shown = re.search(r'<span class="note-tags">([^<]*)</span>', body)
        if want != (shown.group(1) if shown else ""):
            bad_icons.append((body[:45], want, shown.group(1) if shown else ""))
    check("图标与 data-topics 完全对应", not bad_icons, str(bad_icons))
    buttons = set(re.findall(r'data-topic="([^"]+)"', out))
    check("筛选按钮 = all + 全部主题", buttons == valid | {"all"}, str(sorted(buttons)))

    print("\n--- 前 3 行与后 3 行 ---")
    for line in lines[:3] + ["  ..."] + lines[-3:]:
        print("   ", line[:118])

    print("\n--- 漂移安全网 (模拟漏登记一篇文章) ---")
    dropped = site["data"]["notes"][1]["post"]
    site["data"]["notes"] = [e for e in site["data"]["notes"] if e.get("post") != dropped]
    block2 = re.search(r'<ol id="notes-list".*?</ol>', render(root, site), re.S).group(0)
    first_li = re.search(r"<li[^>]*>.*?</li>", block2, re.S).group(0)
    check("漏登记的文章仍然出现", dropped in block2)
    check("且置顶", dropped in first_li)
    check("且带 New 标记", ">New</span>" in first_li)
    check("条目总数不变", block2.count("<li") == len(items), str(block2.count("<li")))
    check("仍无空行", all(l.strip() for l in block2.split("\n")))
    print("    " + first_li[:118])

    print()
    if failures:
        print("失败 %d 项: %s" % (len(failures), failures))
        return 1
    print("全部检查通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
