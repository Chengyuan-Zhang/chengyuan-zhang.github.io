---
permalink: /
title: "Chengyuan Zhang"
seo_title: "Chengyuan Zhang — Stochastic Driver Models and Bayesian Inference"
excerpt: "Dr. Chengyuan Zhang — Postdoctoral Researcher, McGill University. Stochastic models of human driving
behavior, Bayesian inference and calibration, and uncertainty-aware traffic simulation."
author_profile: true
redirect_from:

- /about/
- /about.html

---

<div class="hero-wrap">
  <canvas class="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-intro">
    <p class="hero-intro__lead">Postdoctoral Researcher, McGill University. Stochastic models of human behavior, and the Bayesian inference that makes them trustworthy.</p>
  </div>
</div>
<script src="{{ '/assets/js/hero-trajectories.js' | relative_url }}" defer></script>

I am a Postdoctoral Researcher in Civil Engineering at McGill University, working with
Prof. [Lijun Sun](https://lijunsun.github.io/). I received my Ph.D. from the same group in 2026, and my B.Eng. in
Vehicle Engineering from Chongqing University in 2019. I was also a visiting researcher at Carnegie Mellon University
with Prof. Changliu Liu in 2023 and Prof. Ding Zhao in 2018, and at UC Berkeley with Prof. Masayoshi Tomizuka from 2019
to 2020.

Human behavior is only partly determined by the situation a person is in. I model what is left over.
In driving, that residual carries memory, differs systematically between individuals, and switches between
latent behavioral regimes, and the same structure reappears when the unit of analysis becomes a road segment
rather than a person. Modeling it properly is what allows uncertainty to travel from individual decisions to
the collective dynamics they produce, a step most behavior models stop short of. I build the Bayesian
inference and the benchmarks that make this practical on naturalistic data, so that simulation, which is how
automated vehicles and traffic operations are actually tested, quantifies its uncertainty instead of assuming
it away.

<div class="callout" markdown="1">
**Where I am heading.** The methods above were developed on driving because it is one of the few human
behaviors with both a mature mechanistic theory and enough measurement to test one. I now want to take the
same approach to behavior that is harder to measure: interaction between people and automated vehicles,
pedestrian movement, and world models with enough cognitive structure to say why someone acted rather than
only what they did next. If you work on related problems, I would be glad to hear from you at
[enzozcy@gmail.com](mailto:enzozcy@gmail.com), or you can browse my [CV]({{ '/cv/' | relative_url }}).
</div>



Featured Research
------

<div class="research-grid" markdown="1">

<div class="research-card" markdown="1">
<img class="research-card__thumb" src="{{ '/images/cards/traffic.jpg' | relative_url }}" alt="Pooled, hierarchical and unpooled graphical models of the intelligent driver model" loading="lazy" decoding="async" />

### Stochastic Behavior Models
<p class="research-card__lead">Treating variability as structure to be modeled: memory, individual heterogeneity, and latent regimes.</p>

- Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior ([arXiv: 2506.14762](https://arxiv.org/abs/2506.14762))
- When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior ([ISTTT26](https://arxiv.org/abs/2507.07012))
- Calibrating Car-Following Models via Bayesian Dynamic Regression ([ISTTT25 & TR Part C](https://doi.org/10.1016/j.trc.2024.104719))
- A Bayesian Gaussian Mixture Model for Probabilistic Modeling of Car-Following Behaviors ([IEEE T-ITS](https://ieeexplore.ieee.org/document/10337758))
</div>

<div class="research-card" markdown="1">
<img class="research-card__thumb" src="{{ '/images/cards/uncertainty.jpg' | relative_url }}" alt="Poster on Bayesian calibration of the intelligent driver model" loading="lazy" decoding="async" />

### Scalable Bayesian Inference & Calibration
<p class="research-card__lead">Making posterior inference over behavior models tractable, online, and comparable.</p>

- Active Simulation-Based Inference for Scalable Car-Following Model Calibration ([arXiv: 2602.05246](https://arxiv.org/abs/2602.05246))
- Bayesian Calibration of the Intelligent Driver Model ([IEEE T-ITS](https://ieeexplore.ieee.org/document/10415310))
- AutoTune: A Unified Benchmark for Highway Traffic Microsimulation Calibration (IEEE IV 2026)
- Online Calibration of Context-Driven Car-Following Models (IEEE IV 2026)
</div>

<div class="research-card" markdown="1">
<img class="research-card__thumb" src="{{ '/images/cards/spatiotemporal.jpg' | relative_url }}" alt="Sequential spatiotemporal patterns extracted from multivehicle interactions" loading="lazy" decoding="async" />

### From Individual Behavior to Collective Dynamics
<p class="research-card__lead">Carrying calibrated uncertainty from single decisions up to network and flow scale.</p>

- From Micro Interactions to Traffic Flow: Stochastic Driver Models for Realistic Traffic Simulation ([Ph.D. thesis]({{ '/files/phd-research-summary.pdf' | relative_url }}))
- Discovering dynamic patterns from spatiotemporal data with time-varying low-rank autoregression ([IEEE TKDE](https://ieeexplore.ieee.org/document/10177995))
- Forecasting sparse movement speed of urban road networks with nonstationary temporal matrix factorization ([Transportation Science](https://pubsonline.informs.org/doi/abs/10.1287/trsc.2024.0629))
</div>

<div class="research-card" markdown="1">
<img class="research-card__thumb" src="{{ '/images/cards/multiagent.jpg' | relative_url }}" alt="Multiple vehicles and a pedestrian interacting at an intersection" loading="lazy" decoding="async" />

### Multi-Agent Interaction
<p class="research-card__lead">Representing how road users respond to one another, and when that response actually matters.</p>

- Social interactions for autonomous driving: A review and perspectives ([Foundations and Trends® in Robotics](https://www.nowpublishers.com/article/Details/ROB-078))
- Spatiotemporal learning of multivehicle interaction patterns in lane-change scenarios ([IEEE T-ITS](https://ieeexplore.ieee.org/abstract/document/9357407))
- Interactive Car-Following: Matters but NOT Always ([IEEE ITSC23](https://ieeexplore.ieee.org/abstract/document/10421996))
</div>

</div>

Selected Publications
------

<div class="pub-item">
  <img class="pub-item__thumb" src="{{ '/images/MA-IDM.jpg' | relative_url }}" alt="Markov Regime-Switching IDM" loading="lazy">
  <div class="pub-item__body">
    <a class="pub-item__title" href="https://arxiv.org/abs/2506.14762">Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior</a>
    <span class="pub-item__venue">Chengyuan Zhang, Cathy Wu, Lijun Sun — preprint (2025)</span>
    <span class="pub-item__links">
      <a href="https://arxiv.org/abs/2506.14762">arXiv</a>
      <a href="{{ '/files/TRB2026_Markov.pdf' | relative_url }}">poster</a>
    </span>
  </div>
</div>

<div class="pub-item">
  <img class="pub-item__thumb" src="{{ '/images/idm_pgm.png' | relative_url }}" alt="Bayesian IDM calibration" loading="lazy">
  <div class="pub-item__body">
    <a class="pub-item__title" href="https://ieeexplore.ieee.org/document/10415310">Bayesian Calibration of the Intelligent Driver Model</a>
    <span class="pub-item__venue">Chengyuan Zhang, Lijun Sun — IEEE T-ITS (2023)</span>
    <span class="pub-item__links">
      <a href="https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration">code</a>
      <a href="https://youtu.be/GIqcL6I7MsU">video</a>
    </span>
  </div>
</div>

<div class="pub-item">
  <img class="pub-item__thumb" src="{{ '/images/GVF_framework.png' | relative_url }}" alt="Spatiotemporal lane change" loading="lazy">
  <div class="pub-item__body">
    <a class="pub-item__title" href="https://ieeexplore.ieee.org/abstract/document/9357407">Spatiotemporal Learning of Multi-Vehicle Interaction Patterns in Lane-Change Scenarios</a>
    <span class="pub-item__venue">Chengyuan Zhang, Jiacheng Zhu, Wenshuo Wang, Junqiang Xi — IEEE T-ITS (2021)</span>
    <span class="pub-item__links">
      <a href="https://github.com/Chengyuan-Zhang/Gaussian_Velocity_Field">code</a>
      <a href="https://youtu.be/AcyDn43hb7I">demo</a>
      <a href="https://chengyuan-zhang.github.io/Multivehicle-Interaction/">project</a>
    </span>
  </div>
</div>

<p>
  <a href="#pdf-container"
     id="pdf-toggle"
     class="btn--toggle"
     role="button"
     aria-expanded="false"
     aria-controls="pdf-container"
     onclick="event.preventDefault(); togglePDF(this);">My Ph.D. Research Summary</a>
</p>

<div id="pdf-container" class="pdf-container" hidden>
  <iframe src="{{ '/files/phd-research-summary.pdf' | relative_url }}"
          title="Chengyuan Zhang — Ph.D. Research Summary"
          loading="lazy"></iframe>
</div>

<script>
  function togglePDF(trigger) {
    var container = document.getElementById("pdf-container");
    var hidden = container.hasAttribute("hidden");
    if (hidden) {
      container.removeAttribute("hidden");
      trigger.setAttribute("aria-expanded", "true");
      trigger.textContent = "Hide PDF";
    } else {
      container.setAttribute("hidden", "");
      trigger.setAttribute("aria-expanded", "false");
      trigger.textContent = "My Ph.D. Research Summary";
    }
  }
</script>

News
-----

<ul class="news-list">
  <li><span class="news-date">07/2026</span> I am delighted to give a talk "Beyond White Noise: What Naturalistic Data Reveal About Memory, Heterogeneity, and Latent Regimes in Car-Following" at Chair of Econometrics and Statistics, TU Dresden (invited by Dr. Martin Treiber).</li>
  <li><span class="news-date">05/2026</span> I am delighted to share that I successfully defended my PhD thesis, From Micro Interactions to Traffic Flow: Stochastic Driver Models for Realistic Traffic Simulation, at McGill University. Sincere thanks to my advisor Prof. Lijun Sun, my committee, and everyone who supported me along the way.</li>
</ul>

<p><a href="{{ '/news/' | relative_url }}" class="btn--toggle" role="button">Read more</a></p>

<p>&nbsp;</p>

<div class="demo-card">
  <div class="demo-card__icon"><i class="fas fa-circle-notch"></i></div>
  <div class="demo-card__body">
    <div class="demo-card__label">Interactive Demo</div>
    <div class="demo-card__title"><a href="https://chengyuan-zhang.github.io/traffic-sim/" target="_blank" rel="noopener" class="demo-card__link">Ring-Road Traffic Simulator</a></div>
    <div class="demo-card__desc">An in-browser simulator visualizing car-following dynamics, stop-and-go waves, and how driver heterogeneity emerges on a circular road — a playground for the models behind my research.</div>
  </div>
  <div class="demo-card__cta" aria-hidden="true">Launch <i class="fas fa-arrow-right"></i></div>
</div>

<div class="funding-logos">
  <div><img src="{{ '/images/FRQNT.png' | relative_url }}" alt="FRQNT" loading="lazy" decoding="async"></div>
  <div><img src="{{ '/images/ivado-cmyk_logo-full-degrade-730x245.png' | relative_url }}" alt="IVADO" loading="lazy" decoding="async"></div>
  <div><img src="{{ '/images/mitacs_transparent.png' | relative_url }}" alt="Mitacs" loading="lazy" decoding="async"></div>
  <div><img src="{{ '/images/CIRRELT_logo.png' | relative_url }}" alt="CIRRELT" loading="lazy" decoding="async"></div>
</div>
