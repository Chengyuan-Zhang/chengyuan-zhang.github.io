"""Check that the talks map covers every in-person talk listed on the page.

The coordinates in assets/js/talks-map.js are maintained by hand next to a page
that is also written by hand, so the two drift. They already had: the page
listed nine in-person talks and the map showed seven, missing TU Dresden and
ISTTT26. This compares them and fails loudly instead.

Run from anywhere. Exits non-zero when they disagree.
"""
from __future__ import annotations

import io
import os
import re
import sys
from typing import List, Set, Tuple

ONLINE = "online"


def repo_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))


def page_talks(path: str) -> List[Tuple[str, str]]:
    """Return (venue, location) for talks that happened somewhere physical."""
    html = io.open(path, encoding="utf-8").read()
    talks: List[Tuple[str, str]] = []
    for meta in re.findall(r'class="talk-entry__meta"[^>]*>(.*?)</p>', html, re.S):
        text = re.sub(r"<[^>]+>", "\u00b7", meta)
        parts = [p.strip() for p in text.split("\u00b7") if p.strip()]
        if len(parts) < 2:
            continue
        venue, place = parts[0], parts[1]
        if place.lower() == ONLINE:
            continue
        talks.append((venue, place))
    return talks


def map_talks(path: str) -> List[Tuple[str, str]]:
    js = io.open(path, encoding="utf-8").read()
    block = re.search(r"var TALKS = \[(.*?)\n  \];", js, re.S)
    if block is None:
        raise ValueError("TALKS array not found")
    out: List[Tuple[str, str]] = []
    for row in re.findall(r"\{([^{}]*)\}", block.group(1)):
        city = re.search(r"city:\s*'([^']*)'", row)
        venue = re.search(r"venue:\s*'([^']*)'", row)
        if city and venue:
            out.append((venue.group(1), city.group(1)))
    return out


def city_of(place: str) -> str:
    return place.split(",")[0].strip().lower()


def main() -> int:
    root = repo_root()
    page = page_talks(os.path.join(root, "_pages", "talks.md"))
    mapped = map_talks(os.path.join(root, "assets", "js", "talks-map.js"))

    print("页面上的线下报告: %d 场" % len(page))
    for venue, place in page:
        print("   %-62s %s" % (venue[:60], place))
    print("\n地图上的点: %d 个" % len(mapped))
    for venue, city in mapped:
        print("   %-40s %s" % (venue, city))

    page_cities: Set[str] = {city_of(p) for _, p in page}
    map_cities: Set[str] = {city_of(c) for _, c in mapped}

    missing = sorted(page_cities - map_cities)
    extra = sorted(map_cities - page_cities)

    print()
    if missing:
        print("地图缺少这些城市:", missing)
    if extra:
        print("地图多出这些城市:", extra)
    if len(page) != len(mapped):
        print("数量不一致: 页面 %d 场, 地图 %d 个点 (同城多场属正常, 请人工确认)"
              % (len(page), len(mapped)))
    if missing or extra:
        return 1
    print("地图与页面一致")
    return 0


if __name__ == "__main__":
    sys.exit(main())
