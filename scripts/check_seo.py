"""Offline checks for SEO templates and research pages; not a Jekyll build.

Uses the same python-liquid dependency as check_notes.py, plus Markdown and bs4.
Writes review previews under ignored _site/seo-preview.
"""
from __future__ import annotations

import html
import json
import re
from pathlib import Path
from typing import Any

import markdown
import yaml
from bs4 import BeautifulSoup
from liquid import Environment, DictLoader

from check_notes import front_matter
from build_bibliography import build_schema

ROOT = Path(__file__).resolve().parents[1]


def jekyll_includes(text: str) -> str:
    """Jekyll treats unquoted include filenames as literals; python-liquid does not."""
    text = re.sub(r'({%[-]?\s*include\s+)([\w./-]+)', r"\1'\2'", text)
    return re.sub(r'{%\s*include\s+.*?%}', lambda m: m[0].replace('=', ':'), text)


def environment(site: dict[str, Any]) -> Environment:
    templates = {p.relative_to(ROOT / '_includes').as_posix(): jekyll_includes(p.read_text(encoding='utf-8'))
                 for p in (ROOT / '_includes').rglob('*') if p.is_file()}
    env = Environment(loader=DictLoader(templates))
    env.add_filter('markdownify', lambda v: markdown.markdown(str(v), extensions=['extra']))
    env.add_filter('jsonify', lambda v: json.dumps(v, ensure_ascii=False, default=str))
    env.add_filter('absolute_url', lambda v: site['url'] + site.get('baseurl', '') + str(v))
    env.add_filter('relative_url', lambda v: site.get('baseurl', '') + str(v))
    env.add_filter('date_to_xmlschema', lambda v: str(v))
    env.add_filter('strip_html', lambda v: BeautifulSoup(str(v), 'html.parser').get_text())
    return env


def main() -> int:
    site = yaml.safe_load((ROOT / '_config.yml').read_text(encoding='utf-8'))
    site['data'] = {}
    site['related_posts'] = []
    site['posts'] = []
    for p in (ROOT / '_data').glob('*'):
        if p.suffix in ('.json', '.yml'):
            site['data'][p.stem] = yaml.safe_load(p.read_text(encoding='utf-8'))
    env = environment(site)
    out = ROOT / '_site/seo-preview'
    out.mkdir(parents=True, exist_ok=True)
    schema_path = out / 'schema-regenerated.html'
    # Rebuild and compare to catch stale committed schema, not just valid JSON.
    build_schema(ROOT / 'files/chengyuan-zhang.bib', schema_path)
    assert schema_path.read_bytes() == (ROOT / '_includes/publications-schema.html').read_bytes()
    pubs = (ROOT / '_pages/publications.md').read_text(encoding='utf-8')
    order = re.findall(r'data-bib="([^"]+)"', pubs)
    payload = json.loads(re.search(r'<script[^>]*>(.*?)</script>', schema_path.read_text(encoding='utf-8'), re.S)[1])
    assert [x['item']['@id'].split('#')[-1] for x in payload['itemListElement']] == order
    book = site['data']['publication_records']['chen2023latex']
    assert book['@type'] == 'Book' and book['publisher']['name'] == 'Tsinghua University Press'
    assert 'isPartOf' not in book
    records = site['data']['publication_records']
    accepted = records['zhang2025markov']
    assert accepted['creativeWorkStatus'] == 'Accepted' and accepted['dateAccepted'] == '2026'
    assert 'datePublished' not in accepted and 'sameAs' not in accepted
    assert accepted['isBasedOn'] == 'https://arxiv.org/abs/2506.14762v1'
    all_urls = set()
    for folder in ('_pages', '_posts'):
        for path in (ROOT / folder).glob('*.md'):
            meta, _ = front_matter(path.read_text(encoding='utf-8'))
            if meta.get('published') is False:
                continue
            if meta.get('permalink'):
                all_urls.add(meta['permalink'])
    sources = list((ROOT / '_pages').glob('paper-*.md')) + list((ROOT / '_pages').glob('research-*.md'))
    sources += [ROOT / '_pages/about.md', ROOT / '_pages/publications.md', ROOT / '_pages/news.md']
    report = []
    for path in sources:
        page, body = front_matter(path.read_text(encoding='utf-8'))
        page.setdefault('author_profile', True)
        page['url'] = page['permalink']
        ctx = {'site': site, 'page': page}
        head = env.get_template('seo.html').render(**ctx)
        rendered = env.from_string(jekyll_includes(body)).render(**ctx)
        content = markdown.markdown(rendered, extensions=['extra'])
        soup = BeautifulSoup(head + content, 'html.parser')
        if page['url'] in ('/', '/news/'):
            latest = site['data']['news'][0]
            first_news = soup.select_one('.news-list li')
            latest_text = BeautifulSoup(markdown.markdown(latest['text']), 'html.parser').get_text(' ', strip=True)
            assert latest['date'] in first_news.get_text(' ', strip=True)
            assert latest_text in first_news.get_text(' ', strip=True)
        if page['url'] == '/publications/':
            assert soup.select_one('#pubs-chart') is None
            assert not any('pubs-chart' in (script.get('src') or '') for script in soup.select('script[src]'))
            assert soup.select_one('#topic-filter') is not None
        assert soup.find('link', rel='canonical')['href'] == site['url'] + page['url']
        assert soup.title.get_text() == soup.find('meta', property='og:title')['content']
        assert soup.title.get_text() == soup.find('meta', attrs={'name':'twitter:title'})['content']
        assert '{{' not in head and '{%' not in head
        for node in soup.select('script[type="application/ld+json"]'):
            json.loads(node.string)
        for a in BeautifulSoup(content, 'html.parser').select('a[href]'):
            url = a['href'].split('#')[0]
            if url.startswith(('/papers/', '/research/', '/posts/')):
                assert url in all_urls, (path, url)
        key = page.get('paper_key')
        if key:
            expected = records[key]
            assert soup.find('meta', attrs={'name':'citation_title'})['content'] == expected['headline']
            assert [a['content'] for a in soup.select('meta[name="citation_author"]')] == [a['name'] for a in expected['author']]
            date_meta = soup.find('meta', attrs={'name':'citation_publication_date'})
            if 'datePublished' in expected:
                assert date_meta['content'] == expected['datePublished']
            else:
                assert date_meta is None
            if key == 'zhang2024bayesian':
                for name, value in [('citation_volume','25'), ('citation_issue','8'), ('citation_firstpage','9308'), ('citation_lastpage','9320'), ('citation_journal_title','IEEE Transactions on Intelligent Transportation Systems')]:
                    assert soup.find('meta', attrs={'name':name})['content'] == value
            abstract = site['data']['paper_abstracts'][key]
            assert abstract['abstract'] in soup.get_text()
            assert re.search(r'v\d+$', abstract['source'])
            assert f'/papers/{path.stem.removeprefix("paper-")}/' in pubs
        else:
            assert soup.find('meta', attrs={'name':'citation_title'}) is None
        # Keep the existing theme wrappers and sidebar for visual review.
        body_html = env.from_string(jekyll_includes(front_matter((ROOT / '_layouts/single.html').read_text(encoding='utf-8'))[1])).render(**ctx, content=content)
        nav = env.get_template('masthead.html').render(**ctx)
        doc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + head
        doc += '<link rel="stylesheet" href="/assets/css/main.css"></head><body>' + nav + body_html + '</body></html>'
        doc = doc.replace(site['url'], '')
        target = out / page['url'].strip('/') / 'index.html'
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(doc, encoding='utf-8')
        report.append({'source':str(path.relative_to(ROOT)), 'url':page['url'], 'paper_key':key, 'status':'PASS'})
    # Quoted/non-ASCII text must remain JSON-safe, and post author identity must resolve.
    probe = env.get_template('seo.html').render(site=site, page={'url':'/posts/probe/', 'title':'A "quoted" title & 中文', 'date':'2026-09-13'})
    nodes = [json.loads(n.string) for n in BeautifulSoup(probe,'html.parser').select('script[type="application/ld+json"]')]
    assert nodes[-1]['author']['@id'] == site['url']+'/#person'
    disabled_post = '/posts/when-context-is-not-enough/'
    disabled_meta, _ = front_matter((ROOT / '_posts/2026-09-08-when-context-is-not-enough.md').read_text(encoding='utf-8'))
    assert disabled_meta.get('published') is False
    for path in list((ROOT / '_pages').glob('*.md')) + [ROOT / '_data/notes.yml']:
        assert disabled_post not in path.read_text(encoding='utf-8'), path
    (out / 'checks.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(f'PASS: {len(report)} page previews, 21 ordered records, book mapping, author IDs, citation metadata, abstract versions, and research links.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
