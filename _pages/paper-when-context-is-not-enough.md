---
layout: single
title: "When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior"
permalink: /papers/when-context-is-not-enough/
paper_key: zhang2025context
description: "Context-dependent predictions and a nonstationary Gaussian process jointly represent the expected acceleration and the evolving temporal structure of residual variability."
author_profile: true
---

{% include paper-header.html %}

## Why model driving variability after accounting for traffic context?

Context-dependent predictions and a nonstationary Gaussian process jointly represent the expected acceleration and the evolving temporal structure of residual variability.

## Abstract

{% assign source = site.data.paper_abstracts[page.paper_key] %}
<p>{{ source.abstract | escape }}</p>
<p class="text-muted">Full abstract from the <a href="{{ source.source }}">linked arXiv version</a>, checked {{ source.checked }}. The bibliographic record above identifies {% if page.paper_key == 'zhang2025markov' %}the preprint{% else %}the journal publication; the abstract is the preprint text{% endif %}.</p>

## Research summary

Similar gaps and speeds can lead to different acceleration sequences. This work combines a context-dependent mean model with a Gaussian process whose covariance changes with context, using a scenario-adaptive Gibbs kernel.

The useful distinction is between predicting the expected response and modeling how departures from that response persist. The model provides both components for stochastic simulation. Residual variability is defined relative to the inputs and mean model; it does not uniquely identify driver intention or perception error.

## How can I use it?

The [public implementation](https://github.com/Chengyuan-Zhang/ISTTT26-When-Context-Is-Not-Enough) includes training, simulation, CSV validation, and a synthetic quickstart. It does not bundle highD data, trained weights, or paper benchmark results. Follow the repository's data requirements before using your own trajectories.

[Research poster](/files/TRB2026_Nonstationary.pdf) · [Gaussian processes for time series](/posts/gp-time-series/) · [Stochastic driving behavior](/research/stochastic-driving-behavior/)
