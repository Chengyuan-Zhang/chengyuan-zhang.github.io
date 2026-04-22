---
permalink: /
title: "About Me"
excerpt: "About Me"
author_profile: true
redirect_from:

- /about/
- /about.html

---

<div class="hero">
  <div class="hero__text">
    <p class="hero__name">Chengyuan Zhang</p>
    <p class="hero__tagline">Ph.D. candidate at McGill University — Trustworthy AI, Bayesian learning, and driver world models for multi-agent traffic systems.</p>
    <div class="hero__links">
      <a href="{{ base_path }}/publications/">📄 Publications</a>
      <a href="{{ base_path }}/cv/">📋 CV</a>
      <a href="https://scholar.google.com/">🎓 Google Scholar</a>
      <a href="https://github.com/Chengyuan-Zhang">💻 GitHub</a>
      <a href="mailto:enzozcy@gmail.com">✉️ Email</a>
    </div>
  </div>
</div>

I'm a final-year Ph.D. candidate at McGill University under the supervision of
Prof. [Lijun Sun](https://lijunsun.github.io/). I was a visiting student researcher at the Robotics Institute, Carnegie
Mellon University in 2023 under the supervision of Prof. Changliu Liu, and at the Department of Mechanical Engineering
in 2018 under the supervision of Prof. Ding Zhao. Additionally, I conducted research at the Department of Mechanical
Engineering, UC Berkeley from 2019 to 2020 under the supervision of Prof. Masayoshi Tomizuka. I earned my Bachelor
degree in Vehicle Engineering from Chongqing University, in 2019.

My research is dedicated to establishing the foundations of _Trustworthy AI/ML_ within complex, multi-agent dynamical
systems. I bridge the gap between _Traffic Flow Theory_ and _Embodied AI_ by developing advanced frameworks for
**interpretable spatiotemporal reasoning** and **robust uncertainty quantification**. By integrating
**Bayesian Statistics** with **Generative Models**, my work transforms high-dimensional, evolving urban traffic data
into high-fidelity _Driver World Models_. These models explicitly account for the inherent stochasticity of
human-centric behaviors, providing a statistically rigorous pathway toward the safe and efficient deployment of
autonomous systems in real-world, information-rich environments.

👋 Please feel free to contact me to schedule a quick discussion if you are interested in collaborating with me.

<div class="callout" markdown="1">
📢 I am actively seeking a postdoctoral position focused on *stochastic modeling and simulation of human social behaviors* in complex and interactive scenarios, *dynamic interaction modeling* (drivers and pedestrians), and *Bayesian approaches* to trustworthy, cognitively grounded world models. If my research interests align with your group, I would be excited to connect!
</div>



Featured Research
======

<div class="research-grid" markdown="1">

<div class="research-card" markdown="1">
### 🚦 Traffic Flow Theory & Simulation
- Bayesian calibration of car-following models ([IEEE T-ITS](https://ieeexplore.ieee.org/document/10415310))
- Calibrating Car-Following Models via Bayesian Dynamic Regression ([ISTTT25 & TR Part C](https://authors.elsevier.com/sd/article/S0968-090X(24)00240-7))
</div>

<div class="research-card" markdown="1">
### 🤝 Multi-Agent Social Interactions & Driver World Model
- Social interactions for autonomous driving: A review and perspectives ([Foundations and Trends® in Robotics](https://www.nowpublishers.com/article/Details/ROB-078))
- Spatiotemporal learning of multivehicle interaction patterns in lane-change scenarios ([IEEE T-ITS](https://ieeexplore.ieee.org/abstract/document/9357407))
- Interactive Car-Following: Matters but NOT Always ([IEEE ITSC23](https://ieeexplore.ieee.org/abstract/document/10421996))
</div>

<div class="research-card" markdown="1">
### 🧭 Spatiotemporal Data & Interpretable Patterns
- Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior ([arXiv: 2506.14762](https://arxiv.org/abs/2506.14762))
- Discovering dynamic patterns from spatiotemporal data with time-varying low-rank autoregression ([IEEE TKDE](https://ieeexplore.ieee.org/document/10177995))
- Forecasting sparse movement speed of urban road networks with nonstationary temporal matrix factorization ([Transportation Science](https://xinychen.github.io/papers/notmf.pdf))
</div>

<div class="research-card" markdown="1">
### 🛡️ Robust Uncertainty & Trustworthy AI
- When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior ([ISTTT26](https://arxiv.org/abs/2507.07012))
- Active Simulation-Based Inference for Scalable Car-Following Model Calibration ([arXiv: 2602.05246](https://arxiv.org/abs/2602.05246))
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
  <li><span class="badge-new">New</span> New preprint alert! Our paper "Active Simulation-Based Inference for Scalable Car-Following Model Calibration" is now available on <a href="https://arxiv.org/abs/2602.05246">arXiv: 2602.05246</a>. Please check it out!</li>
  <li><span class="badge-new">New</span> Two papers "Online Calibration of Context-Driven Car-Following Models" and "AutoTune: A Unified Benchmark for Highway Traffic Microsimulation Calibration" are accepted at IEEE IV 2026.</li>
  <li><span class="badge-new">New</span> Our paper "When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior" is accepted at the 26th International Symposium on Transportation and Traffic Theory (<a href="https://www.isttt2026.vtk.ed.tum.de/">ISTTT26</a>). See you in Munich! [<a href="https://arxiv.org/abs/2507.07012">arXiv</a>]</li>
  <li><span class="badge-new">New</span> New preprint alert! Our paper "Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior" is now available on <a href="https://arxiv.org/abs/2506.14762">arXiv: 2506.14762</a>. Please check it out!</li>
</ul>

<button class="btn--toggle" onclick="window.location.href='https://chengyuan-zhang.github.io/news/';">Read more</button>

<p>&nbsp;</p>

<div class="funding-logos">
  <img src="../images/FRQNT.png" alt="FRQNT" loading="lazy">
  <img src="../images/ivado-cmyk_logo-full-degrade-730x245.png" alt="IVADO" loading="lazy">
  <img src="../images/mitacs_transparent.png" alt="Mitacs" loading="lazy">
  <img src="../images/CIRRELT_logo.png" alt="CIRRELT" loading="lazy">
</div>
