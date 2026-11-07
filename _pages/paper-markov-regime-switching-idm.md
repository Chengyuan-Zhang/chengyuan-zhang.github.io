---
layout: single
title: "Modeling Within-Driver Heterogeneity in Car-Following through Coupled Response–Scenario Dynamics"
permalink: /papers/markov-regime-switching-idm/
paper_key: zhang2025markov
description: "PS-HMM-IDM models driving response regimes and traffic scenarios using a joint Markov process and regime-specific IDM response relationships."
author_profile: true
breadcrumb:
  - name: "Publications"
    url: /publications/
faq:
  - q: "How are latent driving regimes different from traffic scenarios?"
    a: >-
      PS-HMM-IDM represents driving response regimes and traffic scenarios
      as paired states connected by a joint Markov process. Each response
      regime has its own IDM response relationship.
  - q: "What is the distinction between a behavior regime and a traffic scenario?"
    a: >-
      A response regime describes how acceleration relates to driving inputs;
      a traffic scenario describes the distribution of observed kinematics.
      Their paired states allow the same response regime to recur across
      scenarios and a scenario to accompany multiple responses.
---

{% include paper-header.html %}

## How are latent driving regimes different from traffic scenarios?

PS-HMM-IDM represents driving response regimes and traffic scenarios as paired states connected by a joint Markov process. Each response regime has its own IDM response relationship.

## Research summary

A single set of IDM parameters can average over distinct driving responses. PS-HMM-IDM represents response regimes and traffic scenarios as paired states, allowing the same response relationship to recur across scenarios and a scenario to accompany multiple responses.

The regimes are inferred model states, not direct measurements of a driver's psychology. The study examines their temporal structure in highD car-following episodes.

## What is the distinction between a behavior regime and a traffic scenario?

A response regime describes how acceleration relates to driving inputs; a traffic scenario describes the distribution of observed kinematics. Their paired states allow the same response regime to recur across scenarios and a scenario to accompany multiple responses.

<figure>
<img src="{{ '/images/blogs/FHMM-IDM_concepts.jpg' | relative_url }}" alt="Conceptual distinction between driving behavior regimes and traffic scenarios in the earlier FHMM-IDM preprint" width="1166" height="491" loading="lazy">
<figcaption>Conceptual illustration from the earlier preprint and accompanying note, showing driving behavior and traffic scenarios as distinct parts of the model.</figcaption>
</figure>

## Earlier preprint abstract

{% assign source = site.data.paper_abstracts[page.paper_key] %}
<p>{{ source.abstract | escape }}</p>
<p class="text-muted">Full abstract from the <a href="{{ source.source }}">earlier arXiv version</a>, checked {{ source.checked }}. This preprint uses the title "Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior" and an earlier model formulation; the accepted manuscript has been substantially revised.</p>

[Technical note on the earlier preprint](/posts/FHMM-IDM/) · [Earlier research poster](/files/TRB2026_Markov.pdf) · [Stochastic driving behavior](/research/stochastic-driving-behavior/)
