---
layout: single
title: "Bayesian Calibration of the Intelligent Driver Model"
permalink: /papers/bayesian-idm-calibration/
paper_key: zhang2024bayesian
description: "Hierarchical Bayesian inference represents uncertainty in IDM parameters, while a Gaussian process models temporally correlated discrepancies in memory-augmented IDM."
author_profile: true
breadcrumb:
  - name: "Publications"
    url: /publications/
faq:
  - q: "What does Bayesian IDM calibration add to a single best fit?"
    a: >-
      Hierarchical Bayesian inference represents uncertainty in IDM parameters,
      while a Gaussian process models temporally correlated discrepancies in
      memory-augmented IDM.
  - q: "Is a posterior interval the same as variation in future driving?"
    a: >-
      No. A parameter posterior represents uncertainty about parameters. A
      predictive distribution additionally reflects the model's stochastic
      process and how simulated states evolve. Both depend on the model and data
      assumptions.
---

{% include paper-header.html %}

## What does Bayesian IDM calibration add to a single best fit?

Hierarchical Bayesian inference represents uncertainty in IDM parameters, while a Gaussian process models temporally correlated discrepancies in memory-augmented IDM.

## Abstract

{% assign source = site.data.paper_abstracts[page.paper_key] %}
<p>{{ source.abstract | escape }}</p>
<p class="text-muted">Full abstract from the <a href="{{ source.source }}">linked arXiv version</a>, checked {{ source.checked }}. The bibliographic record above identifies {% if page.paper_key == 'zhang2025markov' %}the preprint{% else %}the journal publication; the abstract is the preprint text{% endif %}.</p>

## Research summary

A posterior distribution describes parameter uncertainty conditional on the observations, prior, and model. This paper combines hierarchical Bayesian IDM calibration with a Gaussian process for residual dependence, producing memory-augmented IDM (MA-IDM).

The HighD evaluation compares MA-IDM with Bayesian IDM using independent errors. This separates uncertainty about parameters from temporal dependence in the discrepancy between model predictions and observations.

## Is a posterior interval the same as variation in future driving?

No. A parameter posterior represents uncertainty about parameters. A predictive distribution additionally reflects the model's stochastic process and how simulated states evolve. Both depend on the model and data assumptions.

<figure>
<img src="{{ '/images/idm_pgm.png' | relative_url }}" alt="Probabilistic graphical models for Bayesian IDM calibration" width="700" height="347" loading="lazy">
<figcaption>Graphical model illustration from the existing research materials. Hierarchical structure describes how information is shared across drivers.</figcaption>
</figure>

## Where should I start?

Use the [calibration reading guide](/research/bayesian-calibration/) to connect the model to [hierarchical models](/posts/hierarchical/) and [autocorrelation](/posts/autocorrelation/). The [reference repository](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration) contains Bayesian IDM, MA-IDM, and dynamic IDM implementations.

[Research poster](/files/TRB_poster_MA_IDM_Chengyuan_2022.pdf) · [Presentation](https://youtu.be/GIqcL6I7MsU) · [Dynamic regression extension](/papers/bayesian-dynamic-regression/)
