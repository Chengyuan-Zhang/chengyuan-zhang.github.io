---
layout: single
title: "Calibrating Car-Following Models via Bayesian Dynamic Regression"
permalink: /papers/bayesian-dynamic-regression/
paper_key: zhang2024calibrating
description: "Dynamic regression combines a parsimonious car-following model with autoregressive error dynamics, retaining historical information for calibration and probabilistic simulation."
author_profile: true
---

{% include paper-header.html %}

## Why account for serially correlated car-following residuals?

Dynamic regression combines a parsimonious car-following model with autoregressive error dynamics, retaining historical information for calibration and probabilistic simulation.

## Abstract

{% assign source = site.data.paper_abstracts[page.paper_key] %}
<p>{{ source.abstract | escape }}</p>
<p class="text-muted">Full abstract from the <a href="{{ source.source }}">linked arXiv version</a>, checked {{ source.checked }}. The bibliographic record above identifies {% if page.paper_key == 'zhang2025markov' %}the preprint{% else %}the journal publication; the abstract is the preprint text{% endif %}.</p>

## Research summary

An instantaneous car-following rule does not necessarily explain the temporal dependence remaining in observed trajectories. This paper couples the car-following mean with autoregressive residual dynamics inside a Bayesian calibration framework.

The result is a stochastic model in which recent residual history informs subsequent responses. The deterministic car-following component remains interpretable, while the error process represents temporal structure that independent noise would discard.

## How does this relate to memory-augmented IDM?

Both approaches model residual dependence. [MA-IDM](/papers/bayesian-idm-calibration/) uses a Gaussian process; dynamic regression uses an autoregressive time-series specification. The distinction concerns the model for temporal dependence, and should be assessed through fitted dynamics and predictive simulation.

## How can I explore the method?

Read the notes on [autoregressive processes](/posts/AR/) and [connections among stochastic processes](/posts/processes_connections/), then consult the [reference implementation](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration).

[ISTTT25 slides](/files/ISTTT25_slides_Chengyuan.pdf) · [Presentation](https://youtu.be/GIqcL6I7MsU) · [From driver variability to traffic simulation](/research/traffic-simulation/)
