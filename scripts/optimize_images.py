"""Downscale and re-encode oversized site images in place.

Originals remain recoverable via git history. Run from the repository root.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

# (path, max_width, kind) - kind: "jpeg" | "png" | "png-alpha"
JOBS: list[tuple[str, int, str]] = [
    ("images/Weixin Image_20240718123054.jpg", 1400, "jpeg"),
    ("images/Weixin Image_20240718141140.jpg", 1400, "jpeg"),
    ("images/ISTTT26_1.jpg", 1600, "jpeg"),
    ("images/ISTTT26_2.jpg", 1600, "jpeg"),
    ("images/ITSC_2019.jpg", 1600, "jpeg"),
    ("images/2018cmu_ws.jpg", 1400, "jpeg"),
    ("images/Chengyuan.jpg", 700, "jpeg"),
    ("images/MA-IDM.png", 900, "png"),
    ("images/idm_pgm.png", 900, "png"),
    ("images/GVF_framework.Png", 900, "png"),
    ("images/iv24.png", 1400, "png"),
    ("images/itsc2023.png", 1400, "png"),
    ("images/wordcloud_1920x.png", 1600, "png-alpha"),
]


def resize(im: Image.Image, max_side: int) -> Image.Image:
    longest = max(im.width, im.height)
    if longest <= max_side:
        return im
    scale = max_side / longest
    return im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)


def process(path: Path, max_side: int, kind: str) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as im:
        im.load()
        im = resize(im, max_side)
        if kind == "jpeg":
            im.convert("RGB").save(
                path, "JPEG", quality=82, optimize=True, progressive=True
            )
        elif kind == "png":
            # Alpha verified fully opaque; dropping it saves a whole channel.
            im.convert("RGB").save(path, "PNG", optimize=True, compress_level=9)
        else:
            im.convert("RGBA").quantize(
                colors=256, method=Image.Quantize.FASTOCTREE
            ).save(path, "PNG", optimize=True, compress_level=9)
    return before, path.stat().st_size


def main() -> int:
    root = Path.cwd()
    if not (root / "_config.yml").exists():
        print("run from the repository root", file=sys.stderr)
        return 1

    photos = [(str(p.relative_to(root)).replace(os.sep, "/"), 1600, "jpeg")
              for p in sorted((root / "photos").glob("*.jpg"))]

    jobs = photos if "--photos-only" in sys.argv else JOBS + photos

    total_before = total_after = 0
    for rel, max_side, kind in jobs:
        path = root / rel
        if not path.exists():
            print(f"SKIP (missing) {rel}")
            continue
        before, after = process(path, max_side, kind)
        total_before += before
        total_after += after
        print(f"{before/1024:9.0f} KB -> {after/1024:8.0f} KB  ({100*(1-after/before):4.1f}% saved)  {rel}")

    print(f"\nTOTAL {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB "
          f"({100*(1-total_after/total_before):.1f}% saved)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
