"""Drive assets/js/notes-filter.js in a real browser against the rendered notes page.

Serves a minimal mirror over HTTP, because file:// makes history.replaceState throw
a SecurityError and the filter would appear broken for the wrong reason. Clicks each
topic button in turn and compares the surviving item count against _data/notes.yml.

Requires Chrome, plus the dependencies of check_notes. Skips cleanly if Chrome is
not installed.
"""
from __future__ import annotations

import io
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Dict, List, Tuple

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import check_notes as cn

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

PAGE = """<!doctype html><html><head><meta charset="utf-8"><title>t</title></head>
<body>%s
<script>
window.addEventListener('load', function () {
  var topic = %s;
  if (topic !== 'all') {
    document.querySelector('.topic-btn[data-topic="' + topic + '"]').click();
  }
  var items = Array.prototype.slice.call(document.getElementById('notes-list').children);
  var active = document.querySelector('.topic-btn.is-active');
  document.title = JSON.stringify({
    visible: items.filter(function (li) { return !li.hidden; }).length,
    total: items.length,
    active: active ? active.getAttribute('data-topic') : null,
    pressed: document.querySelectorAll('.topic-btn[aria-pressed="true"]').length,
    emptyHidden: document.getElementById('notes-empty-msg').hidden,
    hash: window.location.hash
  });
});
</script></body></html>"""


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args: Any) -> None:
        pass


def serve(directory: str) -> Tuple[ThreadingHTTPServer, int]:
    httpd = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=directory))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


def probe(chrome_profile: str, url: str) -> Dict[str, Any]:
    result = subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
         "--user-data-dir=" + chrome_profile, "--virtual-time-budget=3000", "--dump-dom", url],
        capture_output=True, text=True, encoding="utf-8", timeout=90).stdout
    found = re.search(r"<title>(.*?)</title>", result, re.S)
    if found is None:
        raise RuntimeError("探针未返回结果")
    return json.loads(found.group(1).replace("&quot;", '"'))


def main() -> int:
    if not os.path.exists(CHROME):
        print("未找到 Chrome，跳过浏览器测试")
        return 0

    root = cn.repo_root()
    site = cn.build_site(root)
    body = cn.render(root, site)
    entries = site["data"]["notes"]

    expected = {"all": len(entries)}
    for topic in site["data"]["note_topics"]:
        expected[topic["id"]] = sum(1 for e in entries if topic["id"] in (e.get("topics") or []))

    tmp = tempfile.mkdtemp(prefix="notes-test-")
    js_dir = os.path.join(tmp, "assets", "js")
    os.makedirs(js_dir)
    shutil.copy(os.path.join(root, "assets", "js", "notes-filter.js"), js_dir)
    httpd, port = serve(tmp)
    failures: List[str] = []

    try:
        for topic, want in expected.items():
            page = PAGE % (body, json.dumps(topic))
            io.open(os.path.join(tmp, "t.html"), "w", encoding="utf-8").write(page)
            got = probe(os.path.join(tmp, "profile"), "http://127.0.0.1:%d/t.html" % port)
            ok = (got["visible"] == want
                  and got["active"] == topic
                  and got["pressed"] == 1
                  and got["emptyHidden"] == (want > 0)
                  and got["hash"] == ("" if topic == "all" else "#topic=" + topic))
            if not ok:
                failures.append("%s -> %s" % (topic, got))
            print("  [%s] %-9s 可见 %2d/%d (期望 %2d)  active=%-9s pressed=%d  hash=%r"
                  % ("OK " if ok else "FAIL", topic, got["visible"], got["total"], want,
                     got["active"], got["pressed"], got["hash"]))
    finally:
        httpd.shutdown()
        shutil.rmtree(tmp, ignore_errors=True)

    print()
    if failures:
        print("失败:", failures)
        return 1
    print("筛选交互全部正确")
    return 0


if __name__ == "__main__":
    sys.exit(main())
