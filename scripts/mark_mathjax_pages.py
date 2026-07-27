"""Mark the pages that need MathJax, so the loader does not have to guess.

The include first tried to sniff page.content for a maths delimiter, but inside
the head that variable already holds rendered HTML and kramdown has consumed the
display delimiters, so a post could contain maths and still be missed. Deciding
from the source and recording the answer in front matter is deterministic.

Run from anywhere; pass --check to report without writing.
"""
from __future__ import annotations

import glob
import io
import os
import re
import sys
from typing import List, Tuple

DISPLAY = ("$$", "\\[", "\\begin{equation", "\\begin{align")
INLINE = re.compile(r"(?<!\$)\$[^$\n]{1,200}\$(?!\$)")
PAREN = "\\("


def repo_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))


def split_front_matter(text: str) -> Tuple[str, str]:
    match = re.match(r"\A(---\r?\n.*?\r?\n---\r?\n)(.*)\Z", text, re.S)
    if match is None:
        raise ValueError("no front matter")
    return match.group(1), match.group(2)


def needs_math(body: str) -> bool:
    stripped = re.sub(r"```.*?```", "", body, flags=re.S)      # fenced code is not typeset
    if any(d in stripped for d in DISPLAY):
        return True
    if PAREN in stripped:
        return True
    return bool(INLINE.search(stripped))


def main() -> int:
    root = repo_root()
    check_only = "--check" in sys.argv
    changed: List[str] = []
    marked: List[str] = []
    stale: List[str] = []

    targets = sorted(glob.glob(os.path.join(root, "_posts", "*.md")) +
                     glob.glob(os.path.join(root, "_pages", "*.md")))
    for path in targets:
        raw = io.open(path, encoding="utf-8", newline="").read()
        newline = "\r\n" if "\r\n" in raw else "\n"
        text = raw.replace("\r\n", "\n")
        try:
            front, body = split_front_matter(text)
        except ValueError:
            continue

        wanted = needs_math(body)
        declared = re.search(r"^mathjax:\s*(\S+)\s*$", front, re.M)
        has = declared is not None and declared.group(1).lower() == "true"
        name = os.path.basename(path)

        if wanted:
            marked.append(name)
        if wanted == has:
            continue

        if wanted:
            front = front[:-4] + "mathjax: true\n---\n"
        else:
            front = re.sub(r"^mathjax:.*\n", "", front, flags=re.M)
            stale.append(name)
        changed.append(name)
        if not check_only:
            io.open(path, "w", encoding="utf-8", newline="").write(
                (front + body).replace("\n", newline))

    print("扫描 %d 个文件, 需要 MathJax 的 %d 个" % (len(targets), len(marked)))
    for name in marked:
        print("   ", name)
    if stale:
        print("移除多余标记:", stale)
    print("改动 %d 个%s" % (len(changed), " (--check 模式, 未写入)" if check_only else ""))
    return 1 if (check_only and changed) else 0


if __name__ == "__main__":
    sys.exit(main())
