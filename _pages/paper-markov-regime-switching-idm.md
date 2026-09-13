---
layout: single
title: "Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior"
permalink: /papers/markov-regime-switching-idm/
paper_key: zhang2025markov
description: "FHMM-IDM uses separate latent Markov processes for driving behavior and traffic scenarios, with regime-specific IDM parameters inferred jointly from trajectories."
author_profile: true
---

{% include paper-header.html %}

## How are latent driving regimes different from traffic scenarios?

FHMM-IDM uses separate latent Markov processes for driving behavior and traffic scenarios, with regime-specific IDM parameters inferred jointly from trajectories.

## Abstract

{% assign source = site.data.paper_abstracts[page.paper_key] %}
<p>{{ source.abstract | escape }}</p>
<p class="text-muted">Full abstract from the <a href="{{ source.source }}">linked arXiv version</a>, checked {{ source.checked }}. The bibliographic record above identifies {% if page.paper_key == 'zhang2025markov' %}the preprint{% else %}the journal publication; the abstract is the preprint text{% endif %}.</p>

## Research summary

A single set of IDM parameters can average over distinct driving behaviors. FHMM-IDM instead uses regime-specific parameters and two latent Markov processes to represent behavioral regimes and traffic scenarios separately.

These regimes are inferred model states. Labels such as acceleration or steady following summarize their fitted behavior; they should not be read as direct measurements of a driver's psychology. The preprint evaluates interpretable regime structure on HighD trajectories.

## What is the distinction between a behavior regime and a traffic scenario?

A behavior regime describes how the driver responds; a traffic scenario describes the surrounding operating conditions. The model gives these two factors separate state sequences. This distinction makes it possible to inspect their temporal relationship rather than force both into one classification.

<figure>
<img src="{{ '/images/blogs/FHMM-IDM_concepts.jpg' | relative_url }}" alt="Conceptual distinction between driving behavior regimes and traffic scenarios in FHMM-IDM" width="1166" height="491" loading="lazy">
<figcaption>Conceptual illustration used in the accompanying note: driving behavior and traffic scenarios form distinct parts of the model. This is a model diagram, not a performance comparison.</figcaption>
</figure>

[Technical note and inference equations](/posts/FHMM-IDM/) · [Research poster](/files/TRB2026_Markov.pdf) · [Stochastic driving behavior](/research/stochastic-driving-behavior/)
