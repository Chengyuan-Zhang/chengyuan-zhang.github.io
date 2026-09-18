---
layout: single
title: "Bayesian Calibration and Inference for Car-Following Models"
permalink: /research/bayesian-calibration/
description: "How Bayesian car-following calibration connects trajectory data, hierarchical parameters, temporal residuals, posterior checks, and public IDM implementations."
faq:
  - q: "What does the posterior tell us?"
    a: >-
      It expresses parameter uncertainty conditional on the data, prior,
      likelihood, and model structure. It is not a guarantee that the parameters
      identify a unique behavior mechanism. A narrow posterior should be read
      together with the data's operating range and the model's predictive checks.
  - q: "What data and choices are needed?"
    a: >-
      Begin with time-ordered leader-follower trajectories and the inputs
      required by the selected implementation, typically speed, spacing,
      relative speed, and a defined sampling interval. Check vehicle identities,
      units, missing observations, acceleration construction, and episode
      boundaries before fitting. Use the repository's actual input format and
      dataset terms.
---

Bayesian calibration combines a prior with a model of observed trajectories to infer a distribution over parameters. For car-following, the observation and residual models matter alongside the acceleration rule: they determine what the data imply about uncertainty and how that uncertainty enters simulation.

## What does the posterior tell us?

It expresses parameter uncertainty conditional on the data, prior, likelihood, and model structure. It is not a guarantee that the parameters identify a unique behavior mechanism. A narrow posterior should be read together with the data's operating range and the model's predictive checks.

[Bayesian Calibration of the Intelligent Driver Model](/papers/bayesian-idm-calibration/) combines hierarchical parameter inference with Gaussian-process residual dependence. [Bayesian Dynamic Regression](/papers/bayesian-dynamic-regression/) develops the autoregressive alternative.

## What data and choices are needed?

Begin with time-ordered leader-follower trajectories and the inputs required by the selected implementation, typically speed, spacing, relative speed, and a defined sampling interval. Check vehicle identities, units, missing observations, acceleration construction, and episode boundaries before fitting. Use the repository's actual input format and dataset terms.

The [public IDM implementation](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration) contains Bayesian IDM, MA-IDM, dynamic AR+IDM, and simulation examples. Its README is the starting point for environment and file requirements. [Code & Data](/code/) explains the available projects and dataset-access boundaries.

## A practical reading and checking sequence

1. **Define the response and likelihood.** Specify what is observed and what is generated. Speed and spacing observations are not interchangeable with directly observed acceleration.
2. **Choose pooling.** Decide how parameters are shared between drivers. See [hierarchical models](/posts/hierarchical/) and [random effects](/posts/random-effects/).
3. **Inspect residual structure.** Plot residuals over time and examine dependence. Read [autocorrelation](/posts/autocorrelation/), [Gaussian processes](/posts/gp-time-series/), and [autoregressive processes](/posts/AR/).
4. **Check inference.** Inspect chain mixing, convergence diagnostics, effective sample sizes, and sampler warnings before interpreting posterior intervals. These checks assess computation; they do not establish predictive validity.
5. **Check generated trajectories.** Compare speed and spacing evolution, uncertainty, and temporal patterns on data held out from fitting. Distinguish next-step predictions from simulations that feed their generated states back into the model.
6. **Record the conditions.** Preserve the data split, sampling interval, prior, model specification, seed, and simulation horizon so the comparison can be reproduced.

This is a guide to using the research and implementation, rather than a new benchmark result. The appropriate diagnostic depends on the model and intended use.

## Where should I go next?

For context-dependent covariance, read [When Context Is Not Enough](/papers/when-context-is-not-enough/) and its [synthetic quickstart](https://github.com/Chengyuan-Zhang/ISTTT26-When-Context-Is-Not-Enough#first-run). For the distinction between uncertainty in one trajectory and collective traffic behavior, continue to [traffic simulation](/research/traffic-simulation/).
