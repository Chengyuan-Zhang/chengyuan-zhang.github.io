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
  After adding a publication, register its DOI or arXiv id in `scripts/build_bibliography.py`
  and re-run it; it fetches metadata from Crossref and arXiv and refuses to emit an entry it
  cannot resolve.
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
