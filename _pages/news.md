---
layout: single
title: "Recent News"
permalink: /news/
author_profile: true
---

{% comment %}
Entries live in _data/news.yml so that this page and the summary on the home
page can never drift apart. Add new items at the top of that file.
{% endcomment %}

<ul class="news-list">
{%- for item in site.data.news %}
  <li><span class="news-date">{{ item.date }}</span> {{ item.text | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>
{%- endfor %}
</ul>
