---
layout: single
title: "Stochastic Driving Behavior: Memory, Heterogeneity, and Regimes"
permalink: /research/stochastic-driving-behavior/
description: "A research guide to temporal memory, differences between drivers, latent behavioral regimes, and unexplained variability in car-following models."
faq:
  - q: "What kinds of variation should a model distinguish?"
    a: >-
      Driver heterogeneity concerns differences between individuals.
      Within-driver variation concerns how one driver's responses change over
      time. Traffic context concerns the observed operating situation. Residual
      variability is what remains unexplained by the chosen inputs and mean
      model. These concepts overlap in data, but they are not interchangeable.
  - q: "Does unexplained variability reveal a hidden psychological cause?"
    a: >-
      A structured residual or latent state can support a useful interpretation
      of behavior without uniquely identifying its cause. Omitted inputs,
      observation error, and model limitations can also contribute. These models
      make the structure inspectable and usable in simulation; identifying a
      particular psychological mechanism requires additional evidence.
---

Similar traffic conditions do not always produce the same driving response. My research asks how to represent this variation so that a model can describe both individual behavior and possible future trajectories.

## What kinds of variation should a model distinguish?

**Driver heterogeneity** concerns differences between individuals. **Within-driver variation** concerns how one driver's responses change over time. **Traffic context** concerns the observed operating situation. **Residual variability** is what remains unexplained by the chosen inputs and mean model. These concepts overlap in data, but they are not interchangeable.

A hierarchy can represent differences across drivers; a correlated residual process can represent persistence over time; a switching model can represent distinct latent modes. Choosing one of these models is a substantive decision about which structure to describe.

## A reading path through the research

1. [Bayesian calibration of IDM](/papers/bayesian-idm-calibration/) introduces hierarchical parameter uncertainty and memory-augmented residuals. Start here for the distinction between parameter uncertainty and stochastic driving variation.
2. [Bayesian dynamic regression](/papers/bayesian-dynamic-regression/) represents residual history with autoregressive dynamics. Read it alongside the [autocorrelation note](/posts/autocorrelation/).
3. [When Context Is Not Enough](/papers/when-context-is-not-enough/) lets residual magnitude and persistence adapt to context.
4. [Markov regime-switching IDM](/papers/markov-regime-switching-idm/) represents behavioral modes and traffic scenarios with separate latent processes. The [FHMM note](/posts/FHMM-IDM/) explains the inference structure.

## Does unexplained variability reveal a hidden psychological cause?

A structured residual or latent state can support a useful interpretation of behavior without uniquely identifying its cause. Omitted inputs, observation error, and model limitations can also contribute. These models make the structure inspectable and usable in simulation; identifying a particular psychological mechanism requires additional evidence.

Continue to [Bayesian calibration and inference](/research/bayesian-calibration/) for practical model checks, or [traffic simulation](/research/traffic-simulation/) to explore how temporal assumptions affect generated trajectories.
