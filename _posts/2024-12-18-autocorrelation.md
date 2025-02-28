---
title: 'Modeling Autocorrelation: FFT vs Gaussian Processes'
date: 2024-12-18
permalink: /posts/autocorrelation/
tags:

- autocorrelation
- forecasting
- time series
- Gaussian processes
- Fourier transform

---

**Autocorrelation** is a key property of time series data, describing the dependency of a variable on its past values.
Both the **Fourier Transform (FT)** and **Gaussian Processes (GP)** can model autocorrelation, but they operate in
fundamentally different domains: FFT in the **frequency domain** and GP in the **time domain**. Despite their
differences, the two methods are mathematically connected through the **spectral representation theorem**. This blog
explores the core concepts, their mathematical underpinnings, and practical differences.

_(I was reading a paper "Label Correlation Biases Direct Time Series Forecast" submitted to ICLR2025, which noticed the
autocorrelation of the time series data in forecasting problem. So I'm interested in making a straightforward comparison
of this approach with the GP-based modeling of autocorrelation in my work "Bayesian Calibration of the Intelligent
Driver Model".)_

## **1. The Math Basics of Autocorrelation**

For a stationary stochastic process \\(x(t)\\), the **autocovariance function** \\(R(\tau)\\) at lag \\(\tau\\) is
defined as:

$$
R(\tau) = \mathbb{E}[(x(t) - \mu)(x(t+\tau) - \mu)],
$$

where \\(\mu\\) is the mean of \\(x(t)\\).

The **spectral representation theorem** states that the autocovariance function has a **Fourier Transform
representation**:

$$
S(f) = \mathcal{F}[R(\tau)] = \int_{-\infty}^\infty R(\tau) e^{-j2\pi f\tau} d\tau,
$$

where \\(S(f)\\) is the **power spectral density (PSD)**. This means the autocovariance in the time domain is
fundamentally linked to the distribution of power across frequencies.

## **2. FFT-Based Modeling of Autocorrelation**

The **Fast Fourier Transform (FFT)** is widely used to model autocorrelation by analyzing the signal in the frequency
domain. It relies on the **Wiener-Khinchin theorem**, which states:

$$
R(\tau) = \mathcal{F}^{-1}[\mid X(f)\mid^2],
$$

where \\(X(f)\\) is the Fourier Transform of the signal \\(x(t)\\), and \\(\mid X(f)\mid^2\\) is the **power spectrum**.

### **Practical Use**

FFT is effective for periodic or oscillatory signals, where autocorrelation corresponds to _peaks in specific
frequencies_.

## **3. GP-Based Modeling of Autocorrelation**

A **Gaussian Process (GP)** models autocorrelation in the time domain using a **kernel function** \\(k(t, t')\\), which
defines the covariance between any two points:

$$
k(t, t') = R(\tau) = R(|t - t'|).
$$

For **stationary processes**, the kernel depends only on the lag \\(\tau = \mid t - t'\mid\\). Examples of kernels
include:

- **Squared Exponential (SE) Kernel**:

  $$
  k(\tau) = \sigma_k^2 \exp\left(-\frac{\tau^2}{2\ell^2}\right),
  $$
  where \\(\ell\\) is the lengthscale controlling how fast correlations decay, and \\(\sigma_k^2\\) denotes the
  variance.

- **Spectral Mixture Kernel**:
  Combines sinusoidal and Gaussian components, effectively mimicking the Fourier Transform.

### **How GP Models Autocorrelation**

- The kernel \\(k(t, t')\\) models the covariance directly in the time domain.
- The Fourier Transform of the kernel provides the corresponding spectral density \\(S(f)\\), linking GPs to the
  frequency domain.

## **4. Connections**

Both FFT and GP are connected through the **spectral representation theorem**:

1. FFT explicitly computes the **power spectral density** \\(S(f)\\), from which the autocovariance \\(R(\tau)\\) can be
   reconstructed:

   $$
   R(\tau) = \mathcal{F}^{-1}[S(f)].
   $$

2. GP defines \\(R(\tau)\\) through its kernel function. The **Fourier Transform of the kernel** gives the power
   spectrum:

   $$
   S(f) = \mathcal{F}[k(\tau)].
   $$

For example:

- The **SE kernel** in GPs has a **Gaussian spectrum** in the frequency domain.
- The **Matérn kernel** corresponds to a spectral density that decays polynomially.

Both approaches provide equivalent information for stationary processes.

## **5. Practical Differences Between FFT and GP**

| **Aspect**               | **FFT-Based Approach**                             | **GP-Based Approach**                         |
|--------------------------|----------------------------------------------------|-----------------------------------------------|
| **Domain**               | Frequency domain                                   | Time domain                                   |
| **Assumption**           | Stationarity (spectral analysis of autocorrelation) | Stationarity with a parametric covariance     |
| **Output**               | Explicit power spectrum \\(\mid X(f)\mid^2\\)            | Implicit autocorrelation via \\(k(t, t')\\) |
| **Computational Cost**   | Fast (\\(O(N \log N)\\))                           | Costly (\\(O(N^3)\\) for GP kernel inversion) |
| **Flexibility**          | Best for periodic signals                          | Highly flexible (custom kernels)              |
| **Interpretability**     | Direct analysis of spectral components             | Interpretable through kernel hyperparameters  |

## **6. When to Use FFT vs GP?**

- **Use FFT** if:
    - You need efficient spectral analysis.
    - The autocorrelation is periodic or stationary.
    - Computational cost is a concern.

- **Use GP** if:
    - You require flexibility in modeling complex, non-periodic correlations.
    - You need u**ncertainty quantification** (that's why I need GP!).
    - You want to incorporate domain knowledge via custom kernels.

## **Summary**

Both FFT and GP are powerful tools for modeling autocorrelation, grounded in the spectral representation theorem. FFT
excels in computational efficiency and explicit spectral analysis, while GP offers flexibility and the ability to model
rich temporal structures. Choosing between the two depends on the specific requirements of your application, such as
computational constraints, data properties, and the need for interpretability.

---

## My Research on GP for Modeling Autocorrelation

- **Chengyuan Zhang** and Lijun Sun* (2023). Bayesian Calibration of the Intelligent Driver Model. IEEE Transactions on
  Intelligent Transportation
  Systems. [[IEEE TITS](https://ieeexplore.ieee.org/document/10415310)] [[arXiv](https://arXiv.org/abs/2210.03571)] [[code](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration)] [[presentation](https://youtu.be/GIqcL6I7MsU)] [[poster](../files/TRB_poster_MA_IDM_Chengyuan_2022.pdf)]

(also see my research on AR processes for modeling autocorrelation:)
- **Chengyuan Zhang**, Wenshuo Wang, and Lijun Sun* (2024). Calibrating Car-Following Models via Bayesian Dynamic
  Regression. Transportation research part C: emerging technologies. (Accepted to ISTTT25 Special
  Issue) [[TR PartC](https://authors.elsevier.com/sd/article/S0968-090X(24)00240-7)] [[arXiv](https://arXiv.org/pdf/2307.03340.pdf)] [[code](https://github.com/Chengyuan-Zhang/IDM_Bayesian_Calibration)] [[presentation](https://youtu.be/GIqcL6I7MsU)] [[slides](../_talks/ISTTT25_slides_Chengyuan.pdf)]
