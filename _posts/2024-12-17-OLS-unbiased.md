---
title: 'Proof: unbiasedness of ordinary least squares (OLS)'
date: 2024-12-17
permalink: /posts/ols-unbiased/
tags:

- OLS
- regression
- proof

---

**Consider the linear regression model:**
$$
\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon},
$$
where:
- \\(\mathbf{y}\\) is an \\(n \times 1\\) vector of observations.
- \\(\mathbf{X}\\) is an \\(n \times p\\) design matrix (full column rank).
- \\(\boldsymbol{\beta}\\) is a \\(p \times 1\\) vector of unknown parameters.
- \\(\boldsymbol{\varepsilon}\\) is an \\(n \times 1\\) vector of errors with
- \\(\mathbb{E}[\boldsymbol{\varepsilon}\|\mathbf{X}] = \mathbf{0}\\).

**Ordinary Least Squares (OLS) Estimator:**

$$
\hat{\boldsymbol{\beta}}_{\text{OLS}} = (\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{X}^\top \mathbf{y}.
$$

**Proof of Unbiasedness:**

1. Substitute \\(\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}\\) into the OLS estimator:

   $$
   \hat{\boldsymbol{\beta}}_{\text{OLS}} = (\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{X}^\top(\mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}).
   $$

2. Distribute \\(\mathbf{X}^\top\\):

   $$
   \hat{\boldsymbol{\beta}}_{\text{OLS}} = (\mathbf{X}^\top \mathbf{X})^{-1}(\mathbf{X}^\top\mathbf{X}\boldsymbol{\beta} + \mathbf{X}^\top\boldsymbol{\varepsilon}).
   $$

3. Simplify \\(\mathbf{X}^\top\mathbf{X}\boldsymbol{\beta}\\):

   $$
   \hat{\boldsymbol{\beta}}_{\text{OLS}} = \boldsymbol{\beta} + (\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{X}^\top \boldsymbol{\varepsilon}.
   $$

4. Take the conditional expectation given \\(\mathbf{X}\\):

   $$
   \mathbb{E}[\hat{\boldsymbol{\beta}}_{\text{OLS}}\|\mathbf{X}] = \mathbb{E}[\boldsymbol{\beta} + (\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{X}^\top \boldsymbol{\varepsilon}\|\mathbf{X}].
   $$

5. Since \\(\boldsymbol{\beta}\\) is constant and \\(\mathbb{E}[\boldsymbol{\varepsilon}\|\mathbf{X}] = \mathbf{0}\\):

   $$
   \mathbb{E}[\hat{\boldsymbol{\beta}}_{\text{OLS}}\|\mathbf{X}] = \boldsymbol{\beta} + (\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{X}^\top \mathbb{E}[\boldsymbol{\varepsilon}|\mathbf{X}] = \boldsymbol{\beta}.
   $$

Thus:

$$
\mathbb{E}[\hat{\boldsymbol{\beta}}_{\text{OLS}}|\mathbf{X}] = \boldsymbol{\beta} \implies \mathbb{E}[\hat{\boldsymbol{\beta}}_{\text{OLS}}] = \boldsymbol{\beta}.
$$

**Conclusion:** The OLS estimator is unbiased.
