---
layout: single
title: "From Driver Variability to Traffic Simulation"
permalink: /research/traffic-simulation/
description: "Explore how car-following dynamics and temporally structured driver variability enter traffic simulation, with research papers, code, and an interactive ring-road model."
faq:
  - q: "Why can temporal noise assumptions change a simulation?"
    a: >-
      Acceleration affects speed, and speed affects position and the next gap. A
      persistent acceleration deviation can accumulate through these updates. In
      a multi-vehicle simulation, each generated trajectory also changes the
      input to a following vehicle. This is why the residual process is part of
      the simulation model.
---

A traffic simulator repeatedly turns a driving response into updated speed and position. Temporal structure therefore matters: independent fluctuations and persistent deviations can generate different trajectories even when their one-step variation looks similar.

## Why can temporal noise assumptions change a simulation?

Acceleration affects speed, and speed affects position and the next gap. A persistent acceleration deviation can accumulate through these updates. In a multi-vehicle simulation, each generated trajectory also changes the input to a following vehicle. This is why the residual process is part of the simulation model.

The [MA-IDM paper](/papers/bayesian-idm-calibration/) and [dynamic regression paper](/papers/bayesian-dynamic-regression/) provide two ways to represent temporal dependence. [When Context Is Not Enough](/papers/when-context-is-not-enough/) lets that dependence adapt to the driving context.

## Explore the ring-road simulator

The [interactive simulator](https://chengyuan-zhang.github.io/traffic-sim/) provides a visual entry point into car-following dynamics. Read its [Motivation & Models guide](https://chengyuan-zhang.github.io/traffic-sim/models.html) for the implemented equations and model choices.

For a useful comparison, hold the road and vehicle settings fixed, change one available noise-model setting, and observe both individual speed changes and the formation or decay of collective waves. Repeat the comparison because a single stochastic realization need not be representative.

The demo illustrates model behavior. It does not by itself reproduce a paper's benchmark or validate a safety claim. For research use, consult the [simulation source](https://github.com/Chengyuan-Zhang/traffic-sim) and [calibration implementation](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration), recording the model, initial conditions, time step, random seed, and evaluation horizon.

## Which result should I inspect first?

The [When Context Is Not Enough paper page](/papers/when-context-is-not-enough/) connects context-dependent residual structure to trajectory simulation. The [Ph.D. research summary](/files/phd-research-summary.pdf) provides the broader research context.

Continue to [stochastic driving behavior](/research/stochastic-driving-behavior/) for the conceptual distinctions, or [Bayesian calibration](/research/bayesian-calibration/) for the inference workflow.
