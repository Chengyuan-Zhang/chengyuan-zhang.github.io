---
permalink: /
title: "About Me"
excerpt: "About Me"
author_profile: true
redirect_from:

- /about/
- /about.html

---

<div class="hero-intro">
  <p class="hero-intro__lead">Ph.D. candidate at McGill University — Bayesian learning, trustworthy AI, and driver world models for multi-agent traffic systems.</p>
</div>

I'm a final-year Ph.D. candidate at McGill University, advised by
Prof. [Lijun Sun](https://lijunsun.github.io/). I have also been a visiting researcher at CMU
(with Prof. Changliu Liu, 2023; Prof. Ding Zhao, 2018) and UC Berkeley
(with Prof. Masayoshi Tomizuka, 2019–2020). I received my B.Eng. in Vehicle Engineering
from Chongqing University in 2019.

My research builds *trustworthy AI* for multi-agent traffic systems, combining **Bayesian
statistics** with **generative models** to create interpretable *driver world models* that
capture the stochasticity of human behavior — a statistically grounded path toward safe,
reliable autonomous systems.

<div class="callout" markdown="1">
**Open to postdoc positions.** I'm actively seeking a postdoctoral role focused on *stochastic modeling of human social behaviors*, *dynamic interaction modeling* (drivers and pedestrians), and *Bayesian approaches* to trustworthy, cognitively grounded world models. If this aligns with your group's interests, I'd be glad to connect.
</div>

<a class="demo-card" href="https://chengyuan-zhang.github.io/traffic-sim/" target="_blank" rel="noopener">
  <div class="demo-card__icon"><i class="fas fa-circle-notch"></i></div>
  <div class="demo-card__body">
    <div class="demo-card__label">Interactive Demo</div>
    <h3 class="demo-card__title">Ring-Road Traffic Simulator</h3>
    <p class="demo-card__desc">An in-browser simulator visualizing car-following dynamics, stop-and-go waves, and how driver heterogeneity emerges on a circular road — a playground for the models behind my research.</p>
  </div>
  <div class="demo-card__cta">Launch <i class="fas fa-arrow-right"></i></div>
</a>



Featured Research
======

<div class="research-grid" markdown="1">

<div class="research-card" markdown="1">
### Traffic Flow Theory & Simulation
- Bayesian calibration of car-following models ([IEEE T-ITS](https://ieeexplore.ieee.org/document/10415310))
- Calibrating Car-Following Models via Bayesian Dynamic Regression ([ISTTT25 & TR Part C](https://authors.elsevier.com/sd/article/S0968-090X(24)00240-7))
</div>

<div class="research-card" markdown="1">
### Multi-Agent Social Interactions & Driver World Model
- Social interactions for autonomous driving: A review and perspectives ([Foundations and Trends® in Robotics](https://www.nowpublishers.com/article/Details/ROB-078))
- Spatiotemporal learning of multivehicle interaction patterns in lane-change scenarios ([IEEE T-ITS](https://ieeexplore.ieee.org/abstract/document/9357407))
- Interactive Car-Following: Matters but NOT Always ([IEEE ITSC23](https://ieeexplore.ieee.org/abstract/document/10421996))
</div>

<div class="research-card" markdown="1">
### Spatiotemporal Data & Interpretable Patterns
- Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior ([arXiv: 2506.14762](https://arxiv.org/abs/2506.14762))
- Discovering dynamic patterns from spatiotemporal data with time-varying low-rank autoregression ([IEEE TKDE](https://ieeexplore.ieee.org/document/10177995))
- Forecasting sparse movement speed of urban road networks with nonstationary temporal matrix factorization ([Transportation Science](https://xinychen.github.io/papers/notmf.pdf))
</div>

<div class="research-card" markdown="1">
### Robust Uncertainty & Trustworthy AI
- When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior ([ISTTT26](https://arxiv.org/abs/2507.07012))
- Active Simulation-Based Inference for Scalable Car-Following Model Calibration ([arXiv: 2502.05246](https://arxiv.org/abs/2502.05246))
</div>

</div>

Selected Publications
======

<div class="pub-item">
  <img class="pub-item__thumb" src="{{ '/images/MA-IDM.png' | relative_url }}" alt="Markov Regime-Switching IDM" loading="lazy">
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
  <img class="pub-item__thumb" src="{{ '/images/GVF_framework.Png' | relative_url }}" alt="Spatiotemporal lane change" loading="lazy">
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

<button class="btn--toggle" onclick="togglePDF()">My Ph.D. Research Summary</button>

<div id="pdf-container" class="pdf-container" style="display: none;">
  <iframe src="/files/PhD research summary.pdf"></iframe>
</div>

<script>
  function togglePDF() {
    const container = document.getElementById("pdf-container");
    const button = event.target;
    const visible = container.style.display === "block";
    container.style.display = visible ? "none" : "block";
    button.textContent = visible ? "My Ph.D. Research Summary" : "Hide PDF";
  }
</script>

News
=====

<ul class="news-list">
  <li><span class="news-date">Feb 2025</span> New preprint: "Active Simulation-Based Inference for Scalable Car-Following Model Calibration" — <a href="https://arxiv.org/abs/2502.05246">arXiv: 2502.05246</a>.</li>
  <li><span class="news-date">2026</span> Two papers accepted at IEEE IV 2026: "Online Calibration of Context-Driven Car-Following Models" and "AutoTune: A Unified Benchmark for Highway Traffic Microsimulation Calibration."</li>
  <li><span class="news-date">2026</span> Paper accepted at <a href="https://www.isttt2026.vtk.ed.tum.de/">ISTTT26</a>: "When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior" [<a href="https://arxiv.org/abs/2507.07012">arXiv</a>]. See you in Munich!</li>
  <li><span class="news-date">Jun 2025</span> New preprint: "Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior" — <a href="https://arxiv.org/abs/2506.14762">arXiv: 2506.14762</a>.</li>
</ul>

<button class="btn--toggle" onclick="window.location.href='https://chengyuan-zhang.github.io/news/';">Read more</button>

<p>&nbsp;</p>

<div class="funding-logos">
  <div><img src="../images/FRQNT.png" alt="FRQNT" loading="lazy"></div>
  <div><img src="../images/ivado-cmyk_logo-full-degrade-730x245.png" alt="IVADO" loading="lazy"></div>
  <div><img src="../images/mitacs_transparent.png" alt="Mitacs" loading="lazy"></div>
  <div><img src="../images/CIRRELT_logo.png" alt="CIRRELT" loading="lazy"></div>
</div>
