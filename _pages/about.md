---
permalink: /
title: "About Me"
excerpt: "About Me"
author_profile: true
redirect_from:

- /about/
- /about.html

---

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

📢 <span style="color:darkred"> I am actively seeking a postdoctoral position focused on <em>stochastic
modeling and simulation of human social behaviors</em> in complex and interactive scenarios, <em>dynamic
interaction modeling</em> (including both drivers and pedestrians), and <em>Bayesian inference</em> for human
social behaviors. If my research interests align with your group, I would be excited to connect!</span>



Featured Research
======

- **Traffic Flow Theory & Traffic Simulations**
    - Bayesian calibration of car-following models ([IEEE T-ITS](https://ieeexplore.ieee.org/document/10415310))
    - Calibrating Car-Following Models via Bayesian Dynamic
      Regression ([ISTTT25 & TR Part C](https://authors.elsevier.com/sd/article/S0968-090X(24)00240-7))
- **Multi-Agent Social Interactions & Driver World Model**
    - Social interactions for autonomous driving: A review and
      perspectives ([Foundations and Trends® in Robotics](https://www.nowpublishers.com/article/Details/ROB-078))
    - Spatiotemporal learning of multivehicle interaction patterns in lane-change
      scenarios ([IEEE T-ITS](https://ieeexplore.ieee.org/abstract/document/9357407))
    - Interactive Car-Following: Matters but NOT
      Always ([IEEE ITSC23](https://ieeexplore.ieee.org/abstract/document/10421996))
- **Spatiotemporal Data Modeling & Interpretable Pattern Discovery**
    - Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following
      Behavior ([arXiv: 2506.14762](https://arxiv.org/abs/2506.14762))
    - Discovering dynamic patterns from spatiotemporal data with time-varying low-rank
      autoregression ([IEEE TKDE](https://ieeexplore.ieee.org/document/10177995))
    - Forecasting sparse movement speed of urban road networks with nonstationary temporal matrix
      factorization ([Transportation Science](https://xinychen.github.io/papers/notmf.pdf))
- **Robust Uncertainty Quantification with Trustworthy AI**
    - When Context Is Not Enough: Modeling Unexplained Variability in Car-Following
      Behavior ([ISTTT26](https://arxiv.org/abs/2507.07012))
    - Active Simulation-Based Inference for Scalable Car-Following Model
      Calibration ([arXiv: 2602.05246](https://arxiv.org/abs/2602.05246))

<button onclick="togglePDF()" style="margin-bottom: 10px;">My Ph.D. Research Summary</button>

<div id="pdf-container" style="display: none;">
  <iframe src="/files/PhD research summary.pdf" width="100%" height="690px" style="border:1px solid #ccc;"></iframe>
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

* <span style="color:darkred"> New! </span> New preprint alert! Our paper "Active Simulation-Based Inference for Scalable Car-Following Model Calibration" is now available on [arXiv: 2602.05246](https://arxiv.org/abs/2602.05246). Please check it out!
* <span style="color:darkred"> New! </span> Two papers "Online Calibration of Context-Driven Car-Following Models" and "AutoTune: A Unified Benchmark for
  Highway Traffic Microsimulation Calibration" are accepted at IEEE IV 2026.
* <span style="color:darkred"> New! </span> Our paper "When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior" is accepted at the 26th International Symposium on Transportation and Traffic Theory ([ISTTT26](https://www.isttt2026.vtk.ed.tum.de/)). See you in Munich! [[arXiv](https://arxiv.org/abs/2507.07012)]
* <span style="color:darkred"> New! </span> New preprint alert! Our paper "Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior" is now available on [arXiv: 2506.14762](https://arxiv.org/abs/2506.14762). Please check it out!

<button onclick="window.location.href='https://chengyuan-zhang.github.io/news/';">Read more</button>

<p>&nbsp;</p>


<br>
<center>
    <img src="../images/FRQNT.png" width="20%" /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src="../images/ivado-cmyk_logo-full-degrade-730x245.png" width="20%" />  <img src="../images/mitacs_transparent.png" width="20%" /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src="../images/CIRRELT_logo.png" width="20%" />
</center>
