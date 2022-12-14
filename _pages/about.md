---
permalink: /
title: "About Me"
excerpt: "About Me"
author_profile: true
redirect_from:

- /about/
- /about.html

---

I'm a Ph.D. student in the Department of Civil Engineering, McGill University. I received my B.S. degree in Vehicle
Engineering from Chongqing University in 2019. From 2019 to 2020, I was as a visiting researcher with the Department
of Mechanical Engineering, UC Berkeley. My research interests are Bayesian learning, macro/micro driving behavior
analysis, and multi-agent interaction modeling in intelligent transportation systems.

News
=====

* <span style="color:darkred"> New! </span> 11/2022: The preprint of our recent work "Discovering dynamic patterns from spatiotemporal data with time-varying low-rank autoregression" is available on [arXiv](https://arxiv.org/abs/2211.15482). The adapted datasets and Python implementation are available at [https://github.com/xinychen/vars](https://github.com/xinychen/vars).
* <span style="color:darkred"> New! </span> 11/2022: Our long paper on [Social Interactions for Autonomous Driving](https://www.nowpublishers.com/article/Details/ROB-078) is accepted by Foundations and Trends in Robotics.
* <span style="color:darkred"> New! </span> 11/2022: Our 1st International Workshop on [Socially Interactive Autonomous Mobility (SIAM)](https://interactive-driving.github.io/) will be hosted at IEEE IV'23.

[//]: # ([Read more]&#40;https://chengyuan-zhang.github.io/news/&#41;{: .btn})

<button onclick="window.location.href='https://chengyuan-zhang.github.io/news/';">Read more</button>

<p>&nbsp;</p>

Featured Research
======

## Social Interactions for Autonomous Driving: A Review and Perspective.

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

1) What is social interaction in road traffic scenes? 2) How to measure and evaluate social interaction? 3) How to model
   and reveal the process of social interaction? 4) How do human drivers reach an implicit agreement and negotiate
   smoothly
   in social interaction? This paper reviews various approaches to modeling and learning the social interactions between
   human drivers, ranging from optimization theory, deep learning, and graphical models to social force theory and
   behavioral & cognitive science. We also highlight some new directions, critical challenges, and opening questions for
   future research.

</details>

- Access our book
  via: [[ebook](https://www.nowpublishers.com/article/Details/ROB-078)] [[arxiv](https://arxiv.org/abs/2208.07541)].

<br/> 

## Spatiotemporal Learning of Multivehicle Interaction Patterns in Lane-Change Scenarios

Chengyuan Zhang, Jiacheng Zhu, Wenshuo Wang, and Junqiang Xi. IEEE Transaction on Intelligent Transportation
Systems.

<center>
  <img src="../images/GVF_framework.Png" width="85%" />
</center>

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

- Access our paper via: [[arxiv](https://arxiv.org/pdf/2003.00759v2.pdf)]
  or [[paper](https://ieeexplore.ieee.org/document/9357407)].
- Watch the demos via: [[YouTube](https://youtu.be/AcyDn43hb7I)].
- Code for implementing Gaussian Velocity
  Field: [[Github repo](https://github.com/Chengyuan-Zhang/Gaussian_Velocity_Field)].
- Also check the supplements via: [[Spatiotemporal_Appendix.pdf](./files/Spatiotemporal_Appendix.pdf)].

<br/>  

## Bayesian Calibration of Intelligent Driver Model

Chengyuan Zhang and Lijun Sun.

<center>
  <img src="../images/idm_pgm.png" width="100%" />
</center>

<details>
  <summary><b>[Abstract]</b></summary>

Accurate calibration of car-following models is essential for investigating microscopic human driving behaviors. This
work proposes a memory-augmented Bayesian calibration approach, which leverages the Bayesian inference and stochastic
processes (i.e., Gaussian processes) to calibrate an unbiased car-following model while extracting the serial
correlations of residual. This calibration approach is applied to the intelligent driver model (IDM) and develops a
novel model named MA-IDM. To evaluate the effectiveness of the developed approach, three models with different
hierarchies (i.e., pooled, hierarchical, and unpooled) are tested. Experiments demonstrate that the MA-IDM can estimate
the noise level of unrelated errors by decoupling the serial correlation of residuals. Furthermore, a stochastic
simulation method is also developed based on our Bayesian calibration approach, which can obtain unbiased posterior
motion states and generate anthropomorphic driving behaviors. Simulation results indicate that the MA-IDM outperforms
Bayesian IDM in simulation accuracy and uncertainty quantification. With this Bayesian approach, we can generate
enormous but nonidentical driving behaviors by sampling from the posteriors, which can help develop a realistic traffic
simulator.
</details>

- Access our paper via: [[arxiv](https://arxiv.org/abs/2210.03571)].
- Codes are available: [[Github repo](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration)].

<br/>  