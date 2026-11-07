# chengyuan-zhang.github.io

Source for my academic homepage: <https://chengyuan-zhang.github.io>

I am a postdoctoral researcher in Civil Engineering at McGill University, working with
Prof. Lijun Sun on Bayesian statistics, trustworthy machine learning, and stochastic driver
models for traffic simulation. The site collects my publications, talks, teaching, research
notes, and CV.

## Stack

Jekyll, built and served by GitHub Pages from the `master` branch. The theme is a detached fork of
[academicpages](https://github.com/academicpages/academicpages.github.io), itself derived from
[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) (© Michael Rose, MIT). See `LICENSE`.

## Layout

| Path | Contents |
| --- | --- |
| `_pages/` | Top-level pages (home, publications, talks, teaching, CV, notes, miscellaneous) |
| `_posts/` | Research notes, surfaced on `/notes/` and `/blog-posts/` |
| `_sass/_custom.scss` | All site-specific styling, including dark mode |
| `assets/js/site.js` | Shared behaviour: greedy navigation, sticky footer, sidebar links |
| `assets/js/` | Page-level interaction scripts, plain JS, loaded per page with `defer` |
| `images/`, `photos/`, `files/` | Figures, photography, and downloadable PDFs |
| `_data/navigation.yml` | Main navigation |

## Running locally

```sh
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

`_config.yml` is not reloaded on change; restart the server after editing it.

## Conventions

- `files/chengyuan-zhang.bib` and `_includes/publications-schema.html` are build artifacts.
  Register a DOI or arXiv id in `scripts/build_bibliography.py` and re-run it to fetch
  registry metadata. For accepted papers without a registry record, add the author-confirmed
  entry to `MANUAL` and identify any earlier preprint separately.
- There is no JavaScript build step. `assets/js/site.js` holds shared behaviour and every page
  script is a standalone vanilla-JS file loaded with `defer` from the page that needs it. Do not
  reintroduce jQuery.
- Images are served as committed, with no build-time processing. Downscale and re-encode before
  committing: roughly 1600 px on the longest side and under ~300 KB for photographs, smaller for
  thumbnails. `scripts/optimize_images.py` does this for the known oversized files.
- Markdown pages should contain no `<h1>`. The page title in the front matter already renders one,
  so in-page sections start at `##`. Set `hide_title: true` if a page draws its own title.

## Regenerating artifacts

```sh
py -3 scripts/build_bibliography.py   # bibliography + publication structured data
py -3 scripts/optimize_images.py      # downscale images and photos
```

## Research pages and search metadata

Four representative paper pages live in `_pages/paper-*.md`; three research reading
paths live in `_pages/research-*.md`. Keep interpretation in the page body and the
versioned original abstract in `_data/paper_abstracts.json`. That file records the
public arXiv source/version and retrieval date. Do not silently replace a preprint
abstract with an assumed journal abstract.

`scripts/build_bibliography.py` also generates `_data/publication_records.json`.
The visible Publications page supplies ordering via its unique `data-bib` keys;
the bibliography supplies citation identity. The generator refuses missing,
extra, or duplicate keys. Paper headers, Scholar citation tags, and paper JSON-LD
all read the generated records. `paper_key` must refer to an existing record.

To regenerate schema and records from the existing verified bibliography without
refreshing publication metadata over the network:

```sh
python scripts/build_bibliography.py --schema-only
python scripts/check_seo.py
python scripts/check_notes.py
```

The offline checks use the existing python-liquid/PyYAML checks plus Markdown and
BeautifulSoup. `check_seo.py` creates review pages in ignored `_site/seo-preview`;
it is not a substitute for a Jekyll/GitHub Pages build. On this workstation the
existing Liquid dependencies can be loaded with `PYTHONPATH=_site/post-preview-deps`.
The preview uses existing compiled theme CSS and disables analytics by omitting
the analytics include. Verify the deployed HTML and sitemap after an approved push.

## Analytics

Off by default. To turn on GoatCounter, which sets no cookies and stores no
personal data, register a site at <https://www.goatcounter.com/> and set both
values in `_config.yml`:

```yaml
analytics:
  provider: goatcounter
  goatcounter:
    code: your-site-code     # subdomain of your-site-code.goatcounter.com
```

Clicks on `.pdf` and `.bib` links are additionally recorded as events named
`download/files/...`. Links to paper summaries, GitHub repositories, the traffic
simulator, and the email contact use `research-summary/...`, `code/...`,
`simulator/...`, and `contact/email`. Query strings and email addresses are not
included in these event paths. The footer also carries a busuanzi hit counter,
which reports site totals only.
