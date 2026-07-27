"""Write intrinsic width and height onto every local <img> in the site's pages.

Without them the browser cannot reserve space before an image loads, so the page
reflows as each one arrives. Measured before this ran: 994px of unreserved height
on the home page, 608px on talks and 598px on miscellaneous.

Dimensions are read from the actual files with Pillow rather than assumed, and
images that already declare a size, or that are not local, are left alone.

Requires Pillow. Run from anywhere; pass --check to report without writing.
"""
from __future__ import annotations

import glob
import io
import os
import re
import sys
from typing import Dict, List, Optional, Tuple

from PIL import Image

IMG_TAG = re.compile(r"<img\b[^>]*>", re.I)
# The value may itself contain the other quote character, as in
# src="{{ '/images/x.jpg' | relative_url }}", so match the delimiter explicitly.
SRC_ATTR = re.compile(r"""src\s*=\s*(?:"([^"]*)"|'([^']*)')""", re.I)
LIQUID_PATH = re.compile(r"\{\{\s*['\"]([^'\"]+)['\"]\s*\|[^}]*\}\}")


def repo_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))


def local_path(root: str, src: str) -> Optional[str]:
    match = LIQUID_PATH.search(src)
    rel = match.group(1) if match else src
    if rel.startswith(("http://", "https://", "//", "data:")):
        return None
    rel = rel.split("?")[0].split("#")[0].lstrip("/")
    candidate = os.path.join(root, rel.replace("/", os.sep))
    return candidate if os.path.isfile(candidate) else None


def size_of(path: str, cache: Dict[str, Tuple[int, int]]) -> Optional[Tuple[int, int]]:
    if path not in cache:
        try:
            with Image.open(path) as im:
                cache[path] = im.size
        except Exception:
            return None
    return cache[path]


def process(text: str, root: str, cache: Dict[str, Tuple[int, int]],
            report: List[str], source: str) -> str:
    def fix(match: "re.Match[str]") -> str:
        tag = match.group(0)
        if re.search(r"\bwidth\s*=", tag, re.I) or re.search(r"\bheight\s*=", tag, re.I):
            return tag
        src = SRC_ATTR.search(tag)
        if src is None:
            return tag
        value = src.group(1) if src.group(1) is not None else src.group(2)
        path = local_path(root, value)
        if path is None:
            report.append("%s: 跳过 (非本地) %s" % (source, value[:60]))
            return tag
        size = size_of(path, cache)
        if size is None:
            report.append("%s: 跳过 (无法读取) %s" % (source, path))
            return tag
        report.append("%s: %dx%d  %s" % (source, size[0], size[1], os.path.basename(path)))
        # Preserve the tag's own closing style; appending after a self-closing
        # slash would leave "/ width=..." in the middle and invalidate the tag.
        body = tag[:-1].rstrip()
        close = ">"
        if body.endswith("/"):
            body = body[:-1].rstrip()
            close = " />"
        return body + ' width="%d" height="%d"%s' % (size[0], size[1], close)

    return IMG_TAG.sub(fix, text)


def main() -> int:
    root = repo_root()
    check_only = "--check" in sys.argv
    cache: Dict[str, Tuple[int, int]] = {}
    report: List[str] = []
    changed = 0

    targets = sorted(glob.glob(os.path.join(root, "_pages", "*")) +
                     glob.glob(os.path.join(root, "_posts", "*.md")) +
                     glob.glob(os.path.join(root, "_includes", "*.html")))
    for path in targets:
        if not path.endswith((".md", ".html")):
            continue
        raw = io.open(path, encoding="utf-8", newline="").read()
        newline = "\r\n" if "\r\n" in raw else "\n"
        text = raw.replace("\r\n", "\n")
        out = process(text, root, cache, report, os.path.basename(path))
        if out != text:
            changed += 1
            if not check_only:
                io.open(path, "w", encoding="utf-8", newline="").write(out.replace("\n", newline))

    added = sum(1 for line in report if "x" in line and "跳过" not in line)
    skipped = [line for line in report if "跳过" in line]
    print("处理文件 %d 个, 需要修改 %d 个" % (len(targets), changed))
    print("补齐尺寸的 <img>: %d" % added)
    print("跳过: %d" % len(skipped))
    for line in skipped[:10]:
        print("   ", line)
    if check_only:
        print("\n(--check 模式, 未写入)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
