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
Prof. [Lijun Sun](https://lijunsun.github.io/).
I was a visiting researcher at the Robotics Institute, Carnegie Mellon University in 2023 under the supervision of Prof.
Changliu Liu, and at the Department of Mechanical Engineering in 2018. Additionally, I conducted research at the
Department of Mechanical Engineering, UC Berkeley from 2019 to 2020 under the supervision of Prof. Masayoshi Tomizuka.

My research focuses on **Bayesian inference**, **spatiotemporal modeling**, **traffic flow theory**, and **multi-agent
interaction modeling** within **intelligent transportation systems**, with an emphasis on bridging the gap between
theoretical modeling and practical traffic simulation through advanced statistical techniques with appropriate
**uncertainty quantification**. My motivation lies in advancing the understanding of **human driving behaviors** to
improve **microscopic traffic simulations**, ultimately contributing to safer and more efficient transportation systems.

👋 Please feel free to contact me to schedule a quick discussion if you are interested in collaborating with me.

📢 <span style="color:darkred"> I am actively seeking a postdoctoral position focused on topics such as <em>stochastic
modeling and simulation of human driving behaviors</em> (beyond traditional car-following scenarios), <em>social
interaction modeling</em> (including both drivers and pedestrians), and <em>Bayesian inference</em>. If my research
interests align with your group, I would be excited to connect!</span>

News
=====

* <span style="color:darkred"> New! </span> New preprint alert! Our paper "When Context Is Not Enough: Modeling Unexplained Variability in Car-Following Behavior" is now available on [arXiv: 2507.07012](https://arxiv.org/abs/2507.07012). Please check it out!
* <span style="color:darkred"> New! </span> New preprint alert! Our paper "Markov Regime-Switching Intelligent Driver Model for Interpretable Car-Following Behavior" is now available on [arXiv: 2506.14762](https://arxiv.org/abs/2506.14762). Please check it out!
* <span style="color:darkred"> New! </span> I am delighted to give an online talk "Stochastic Modeling and Simulations of Car-Following Behaviors" at MIT (invited by Dr. Xinyu Chen with the Department of Urban Studies and Planning).
* <span style="color:darkred"> New! </span> Our paper "Forecasting sparse movement speed of urban road networks with nonstationary temporal matrix factorization" was accepted to Transportation Science.  [[TranSci](https://pubsonline.informs.org/doi/abs/10.1287/trsc.2024.0629)] [[preprint](https://xinychen.github.io/papers/notmf.pdf)] [[arXiv](https://arXiv.org/abs/2203.10651)] [[code](https://github.com/xinychen/tracebase)] [[blog I](https://medium.com/p/b1c59faf05ea)] [[blog II](https://medium.com/p/4705df163fcf)] [[slides](https://xinychen.github.io/slides/notmf.pdf)]
* <span style="color:darkred"> New! </span> I received the **CIRRELT Doctoral Scholarship of Excellence - Final Stages**. Thanks, CIRRELT!

<button onclick="window.location.href='https://chengyuan-zhang.github.io/news/';">Read more</button>

<p>&nbsp;</p>

Featured Research
======

- **Traffic Flow Theory & Traffic Simulations**
    - Bayesian calibration of car-following models ([IEEE T-ITS](https://ieeexplore.ieee.org/document/10415310))
    - Calibrating Car-Following Models via Bayesian Dynamic
      Regression ([ISTTT25 & TR Part C](https://authors.elsevier.com/sd/article/S0968-090X(24)00240-7))
- **Multi-Agent Social Interactions & Human Driving Behaviors**
    - Social interactions for autonomous driving: A review and
      perspectives ([Foundations and Trends® in Robotics](https://www.nowpublishers.com/article/Details/ROB-078))
    - Spatiotemporal learning of multivehicle interaction patterns in lane-change
      scenarios ([IEEE T-ITS](https://ieeexplore.ieee.org/abstract/document/9357407))
- **Spatiotemporal Modeling & Interpretable pattern discovery**
    - Discovering dynamic patterns from spatiotemporal data with time-varying low-rank
      autoregression ([IEEE TKDE](https://ieeexplore.ieee.org/document/10177995))
    - Forecasting sparse movement speed of urban road networks with nonstationary temporal matrix
      factorization ([Transportation Science](https://xinychen.github.io/papers/notmf.pdf))

### Bayesian Calibration of the Car-Following Models

Chengyuan Zhang and Lijun Sun. *IEEE Transaction on Intelligent Transportation Systems.*

<iframe width="640" height="400" src="https://www.youtube.com/embed/GIqcL6I7MsU" title="Chengyuan Zhang: Bayesian Calibration of the Intelligent Driver Model | TFTC General Webinar Series" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<details>
  <summary><b>[Abstract]</b></summary>

Accurate calibration of car-following models is essential for understanding human driving behaviors and implementing
high-fidelity microscopic simulations. This work proposes a memory-augmented Bayesian calibration technique to capture
both uncertainty in the model parameters and the temporally correlated behavior discrepancy between model predictions
and observed data. Specifically, we characterize the parameter uncertainty using a hierarchical Bayesian framework and
model the temporally correlated errors using Gaussian processes. We apply the Bayesian calibration technique to the
intelligent driver model (IDM) and develop a novel stochastic car-following model named memory-augmented IDM (MA-IDM).
To evaluate the effectiveness of MA-IDM, we compare the proposed MA-IDM with Bayesian IDM in which errors are assumed to
be i.i.d., and our simulation results based on the HighD dataset show that MA-IDM can generate more realistic driving
behaviors and provide better uncertainty quantification than Bayesian IDM. By analyzing the lengthscale parameter of the
Gaussian process, we also show that taking the driving actions from the past five seconds into account can be helpful in
modeling and simulating the human driver’s car-following behaviors.
</details>

- Access our preprint via:
  GP+IDM [[IEEE TITS](https://ieeexplore.ieee.org/document/10415310)] [[arXiv](https://arxiv.org/abs/2210.03571)] and
  AR+IDM [[TR PartC](https://authors.elsevier.com/sd/article/S0968-090X(24)00240-7)] [[arXiv](https://arxiv.org/pdf/2307.03340.pdf)]
  .
- Codes are available: [[Github repo](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration)].
- Presentation: [[recording](https://youtu.be/GIqcL6I7MsU)] [[poster](../files/TRB_poster_MA_IDM_Chengyuan_2022.pdf)].

<br/>  

### Spatiotemporal Learning of Multivehicle Interaction Patterns in Lane-Change Scenarios

Chengyuan Zhang, Jiacheng Zhu, Wenshuo Wang, and Junqiang Xi. *IEEE Transaction on Intelligent Transportation Systems.*

[//]: # (<center>)

[//]: # (  <img src="../images/GVF_framework.Png" width="85%" />)

[//]: # (</center>)

<iframe width="640" height="360" src="https://www.youtube.com/embed/AcyDn43hb7I" title="Demos for Spatiotemporal Learning of Multivehicle Interaction Patterns in Lane-Change Scenarios;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<details>
  <summary><b>[Abstract]</b></summary>

Interpretation of common-yet-challenging interaction scenarios can benefit well-founded decisions for autonomous
vehicles. Previous research achieved this using their prior knowledge of specific scenarios with predefined models,
limiting their adaptive capabilities. This paper describes a Bayesian nonparametric approach that leverages continuous (
i.e., Gaussian processes) and discrete (i.e., Dirichlet processes) stochastic processes to reveal underlying interaction
patterns of the ego vehicle with other nearby vehicles. Our model relaxes dependency on the number of surrounding
vehicles by developing an acceleration-sensitive velocity field based on Gaussian processes. The experiment results
demonstrate that the velocity field can represent the _spatial_ interactions between the ego vehicle and its
surroundings. Then, a discrete Bayesian nonparametric model, integrating Dirichlet processes and hidden Markov models,
is developed to learn the interaction patterns over the _temporal_ space by segmenting and clustering the sequential
interaction data into interpretable granular patterns automatically. We then evaluate our approach in the highway
lane-change scenarios using the highD dataset collected from real-world settings. Results demonstrate that our proposed
Bayesian nonparametric approach provides an insight into the complicated lane-change interactions of the ego vehicle
with multiple surrounding traffic participants based on the interpretable interaction patterns and their transition
properties in temporal relationships. Our proposed approach sheds light on efficiently analyzing other kinds of
multi-agent interactions, such as vehicle-pedestrian interactions.
</details>

- Access our paper via: [[arXiv](https://arxiv.org/pdf/2003.00759v2.pdf)]
  , [[paper](https://ieeexplore.ieee.org/document/9357407)],
  or [[project website](https://chengyuan-zhang.github.io/Multivehicle-Interaction/)].
- Watch the demos via: [[YouTube](https://youtu.be/AcyDn43hb7I)].
- Code for implementing Gaussian Velocity
  Field: [[Github repo](https://github.com/Chengyuan-Zhang/Gaussian_Velocity_Field)].
- Also check the supplements via: [[Spatiotemporal_Appendix.pdf](./files/Spatiotemporal_Appendix.pdf)].

<br/>

### Social Interactions for Autonomous Driving: A Review and Perspective

Wenshuo Wang, Letian Wang, Chengyuan Zhang, Changliu Liu, and Lijun Sun. *Foundations and Trends in Robotics*.

<center>
  <img src="../images/review_interaction_scene.JPG" width="60%" />
</center>

<details>
  <summary><b>[Abstract]</b></summary>

No human drives a car in a vacuum; she/he must negotiate with other road users to achieve their goals in social traffic
scenes. A rational human driver can interact with other road users in a socially-compatible way through implicit
communications to complete their driving tasks smoothly in interaction-intensive, safety-critical environments. This
paper aims to review the existing approaches and theories to help understand and rethink the interactions among human
drivers toward social autonomous driving. We take this survey to seek the answers to a series of fundamental questions:

1) What is social interaction in road traffic scenes?
2) How to measure and evaluate social interaction?
3) How to model and reveal the process of social interaction?
4) How do human drivers reach an implicit agreement and negotiate smoothly in social interaction?

This paper reviews various approaches to modeling and learning the social interactions between human drivers, ranging
from optimization theory, deep learning, and graphical models to social force theory and behavioral & cognitive science.
We also highlight some new directions, critical challenges, and opening questions for future research.

</details>

- Access our book
  via: [[ebook](https://www.nowpublishers.com/article/Details/ROB-078)], [[arXiv](https://arxiv.org/abs/2208.07541)],
  or [[project website](https://chengyuan-zhang.github.io/Multivehicle-Interaction/)].

<br/> 

### An Efficient Parking Solution: A Cam-Linkage Double-Parallelogram Mechanism Based 1-Degrees of Freedom Stack Parking System

Chengyuan Zhang, Xiaomin Zhang, Hongyun Ye, Ming Wei, and Xianxiong Ning. *ASME Journal of Mechanisms and Robotics*.

<iframe width="1280" height="462" src="https://www.youtube.com/embed/lmwdDsUXUw8" title="An Efficient Parking Solution: A Novel Stack Parking System" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- This is a very interesting mechanical work (a.k.a. big toy) that was done during my undergraduate study.
- Access our work
  via: [[ASME JMR](https://doi.org/10.1115/1.4043688)].

<br/> 

Thanks & Fundings
======
<br>
<center>
    <img src="../images/FRQNT.png" width="37%" /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src="../images/ivado-cmyk_logo-full-degrade-730x245.png" width="37%" /><br>
    <img src="../images/mitacs_transparent.png" width="37%" /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src="../images/CIRRELT_logo.png" width="37%" />
</center>
