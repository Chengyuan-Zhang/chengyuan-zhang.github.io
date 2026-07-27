---
layout: single
title: "Notes"
permalink: /notes/
author_profile: true
---

### My Research Notes

<p class="text-muted">Click <a href="{{ '/blog-posts/' | relative_url }}">here</a> for all posts.</p>

{% comment %}
The list below is generated from _data/notes.yml (order, topics, planned
items) and _posts (links and titles). Nothing here is hand-maintained, so the
page cannot drift from the posts. A post that is not yet listed in notes.yml
is shown at the top of the list rather than being silently omitted.
{% endcomment %}

<div class="topic-legend" id="notes-filter" role="toolbar" aria-label="Filter notes by topic">
  <span class="topic-legend__hint">Topic:</span>
  <button type="button" class="topic-btn is-active" data-topic="all">All</button>
{%- for topic in site.data.note_topics %}
  <button type="button" class="topic-btn" data-topic="{{ topic.id }}"><span class="topic-ico">{{ topic.icon }}</span> {{ topic.label }}</button>
{%- endfor %}
</div>

{%- assign curated = site.data.notes | map: "post" | compact | join: "|" %}

<ol id="notes-list" class="notes-list">
{%- for post in site.posts %}
{%- unless curated contains post.url %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title | smartify }}</a> <span class="pill pill--accent">New</span></li>
{%- endunless %}
{%- endfor %}
{%- for item in site.data.notes %}
{%- assign icons = "" %}
{%- for id in item.topics %}
{%- assign topic = site.data.note_topics | where: "id", id | first %}
{%- if topic %}{% assign icons = icons | append: topic.icon %}{% endif %}
{%- endfor %}
{%- capture tag_html %}{% if icons != "" %} <span class="note-tags">{{ icons }}</span>{% endif %}{% endcapture %}
{%- capture attrs %}{% if item.topics %} data-topics="{{ item.topics | join: ' ' }}"{% endif %}{% endcapture %}
{%- if item.post %}
{%- assign p = site.posts | where: "url", item.post | first %}
{%- unless p %}{% assign p = site.posts | where: "permalink", item.post | first %}{% endunless %}
{%- assign href = p.url | default: item.post %}
{%- assign title = item.label | default: p.title | default: item.post %}
  <li{{ attrs }}><a href="{{ href | relative_url }}">{{ title | smartify }}</a>{{ tag_html }}</li>
{%- elsif item.link %}
  <li{{ attrs }}><a href="{{ item.link }}">{{ item.label | smartify }}</a>{{ tag_html }}</li>
{%- elsif item.planned %}
  <li{{ attrs }}>{{ item.planned | smartify }} <span class="pill">Planned</span>{{ tag_html }}</li>
{%- endif %}
{%- endfor %}
</ol>

<p id="notes-empty-msg" class="pub-empty-msg" hidden>No notes match this topic yet.</p>

### Collected Online Blogs and Books (by other researchers)

1. [Bayesian Data Analysis](https://sites.stat.columbia.edu/gelman/book/)
2. [Bayesian Neural Networks](https://www.cs.toronto.edu/~duvenaud/distill_bayes_net/public/)
3. [Pattern Recognition and Machine Learning (PRML)](https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf)
4. [Spatiotemporal Data Modeling](https://spatiotemporal-data.github.io/)
5. [Probabilistic Artificial Intelligence](https://arxiv.org/pdf/2502.05244)
6. [如何努力成为一个 Top Ph.D. Student](https://github.com/pengsida/learning_research/)
7. Sharpen your scientific plotting with an artist's eye — [plottie.art](https://plottie.art/)
8. [Optimization Bootcamp](https://faculty.washington.edu/sbrunton/OptimizationBootcamp.pdf)
9. [Tensor Decompositions for Data Science](https://users.wfu.edu/ballard/pdfs/tensor_textbook.pdf)
10. Color palettes — [Paul Tol's notes](https://sronpersonalpages.nl/~pault/#sec:qualitative)

<script src="{{ '/assets/js/notes-filter.js' | relative_url }}"></script>
