"""Compile assets/css/main.scss the way Jekyll does, to catch Sass errors locally.

Ruby on this machine is 2.2.6, far below Jekyll's minimum, so stylesheet changes
could previously only be validated by pushing and looking at the live site. This
strips the Jekyll front matter, compiles with libsass using the same load path
that _config.yml declares, and reports the first error with its line.

Requires libsass. Run from anywhere.
"""
from __future__ import annotations

import io
import os
import re
import sys
from typing import List

import sass
import yaml


def repo_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))


def load_paths(root: str) -> List[str]:
    config = yaml.safe_load(io.open(os.path.join(root, "_config.yml"), encoding="utf-8").read())
    sass_cfg = config.get("sass") or {}
    declared = sass_cfg.get("sass_dir", "_sass")
    return [os.path.join(root, declared), os.path.join(root, "_sass")]


def main() -> int:
    root = repo_root()
    entry = os.path.join(root, "assets", "css", "main.scss")
    source = io.open(entry, encoding="utf-8").read()
    source = re.sub(r"\A---.*?---\s*", "", source, flags=re.S)   # Jekyll front matter

    try:
        css = sass.compile(string=source, include_paths=load_paths(root),
                           output_style="compressed")
    except sass.CompileError as exc:
        print("编译失败:\n")
        print(str(exc).strip())
        return 1

    print("编译成功")
    print("  压缩后大小: %d 字节 (%.1f KB)" % (len(css), len(css) / 1024))
    for token in ("$muted-color", "--c-muted)", "$gray"):
        if token in css:
            print("  警告: 输出里出现未解析的 %r" % token)
    checks = {
        "mjx-container[display=\"true\"]": "MathJax 溢出规则",
        "prefers-reduced-motion": "减弱动效",
        ":focus-visible": "焦点样式",
        "#646b70": "muted 文本色",
    }
    for needle, label in checks.items():
        print("  %-14s %s" % ("存在" if needle in css else "缺失", label))
    return 0


if __name__ == "__main__":
    sys.exit(main())
