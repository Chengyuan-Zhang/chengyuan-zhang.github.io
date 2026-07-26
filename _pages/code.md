---
layout: archive
title: "Code & Data"
permalink: /code/
author_profile: true
---

Implementations behind my papers, plus an interactive simulator. Everything here is public on
GitHub; issues and pull requests are welcome.

Research code
-----

<div class="course-grid">

  <div class="course-card">
    <div class="course-card__header">
      <span class="course-card__code">Python · PyMC</span>
      <span class="course-card__term">Bayesian calibration</span>
    </div>
    <h3>IDM_Bayesian_Calibration</h3>
    <p class="course-card__meta">Probabilistic graphical models for car-following</p>
    <p>
      Implements MA-IDM and Bayesian IDM, the dynamic AR+IDM formulation from the Bayesian dynamic
      regression paper, and multi-vehicle ring-road simulations. Models are built with PyMC and
      calibrated on the highD naturalistic driving dataset; preprocessed trajectories ship with the
      repository.
    </p>
    <div class="tags">
      <span class="tag">MA-IDM</span>
      <span class="tag">AR + IDM</span>
      <span class="tag">highD</span>
      <span class="tag">Ring-road simulation</span>
    </div>
    <p class="repo-links">
      <a href="https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration"><i class="fab fa-github"></i> Repository</a>
      <a href="https://ieeexplore.ieee.org/document/10415310">T-ITS paper</a>
      <a href="https://doi.org/10.1016/j.trc.2024.104719">TR-C paper</a>
      <a href="https://youtu.be/GIqcL6I7MsU">Video</a>
    </p>
  </div>

  <div class="course-card">
    <div class="course-card__header">
      <span class="course-card__code">Python</span>
      <span class="course-card__term">Interaction modeling</span>
    </div>
    <h3>Gaussian_Velocity_Field</h3>
    <p class="course-card__meta">Gaussian velocity fields for lane-change scenarios</p>
    <p>
      Reference implementation of the Gaussian velocity field (GVF), which represents multi-vehicle
      interaction inside a region of interest around the ego vehicle. Each frame becomes a
      13 × 17 × 2 tensor over a meshed ROI, giving a fixed-size description of a scene that varies
      in the number of surrounding vehicles.
    </p>
    <div class="tags">
      <span class="tag">Gaussian processes</span>
      <span class="tag">Lane change</span>
      <span class="tag">highD</span>
      <span class="tag">Visualization</span>
    </div>
    <p class="repo-links">
      <a href="https://github.com/Chengyuan-Zhang/Gaussian_Velocity_Field"><i class="fab fa-github"></i> Repository</a>
      <a href="https://ieeexplore.ieee.org/abstract/document/9357407">T-ITS paper</a>
      <a href="https://youtu.be/AcyDn43hb7I">Demo</a>
      <a href="{{ '/posts/GVF/' | relative_url }}">Tutorial note</a>
    </p>
  </div>

  <div class="course-card">
    <div class="course-card__header">
      <span class="course-card__code">Project site</span>
      <span class="course-card__term">Pattern discovery</span>
    </div>
    <h3>Multivehicle-Interaction</h3>
    <p class="course-card__meta">Companion site for the interaction-pattern work</p>
    <p>
      Collects results and media for the general framework of learning multi-vehicle interaction
      patterns from video, and for the Foundations and Trends review on social interactions in
      autonomous driving.
    </p>
    <div class="tags">
      <span class="tag">Multi-vehicle interaction</span>
      <span class="tag">Video</span>
      <span class="tag">Review</span>
    </div>
    <p class="repo-links">
      <a href="https://github.com/Chengyuan-Zhang/Multivehicle-Interaction"><i class="fab fa-github"></i> Repository</a>
      <a href="https://chengyuan-zhang.github.io/Multivehicle-Interaction/">Project website</a>
      <a href="https://ieeexplore.ieee.org/abstract/document/8917212">ITSC paper</a>
      <a href="https://www.nowpublishers.com/article/Details/ROB-078">FnT review</a>
    </p>
  </div>

</div>

Interactive demo
-----

<div class="course-grid">

  <div class="course-card">
    <div class="course-card__header">
      <span class="course-card__code">JavaScript</span>
      <span class="course-card__term">Runs in the browser</span>
    </div>
    <h3>traffic-sim</h3>
    <p class="course-card__meta">Stochastic ring-road traffic simulator</p>
    <p>
      Cars follow the Intelligent Driver Model on a circular track, and you can switch between three
      driver-noise models drawn from recent work on Bayesian car-following calibration. Small
      perturbations grow into stop-and-go waves with no bottleneck present, reproducing the Sugiyama
      experiment. Inspired by Dr. Martin Treiber's work on stochastic car-following.
    </p>
    <div class="tags">
      <span class="tag">IDM</span>
      <span class="tag">Driver noise</span>
      <span class="tag">Stop-and-go waves</span>
      <span class="tag">No install</span>
    </div>
    <p class="repo-links">
      <a href="https://chengyuan-zhang.github.io/traffic-sim/"><i class="fas fa-play"></i> Launch simulator</a>
      <a href="https://github.com/Chengyuan-Zhang/traffic-sim"><i class="fab fa-github"></i> Repository</a>
    </p>
  </div>

</div>

<p class="text-muted">
  Datasets used above are released by their original owners: the
  <a href="https://www.highd-dataset.com/">highD dataset</a> is distributed by RWTH Aachen and is not
  redistributed here beyond the preprocessed caches needed to reproduce the published results.
</p>
