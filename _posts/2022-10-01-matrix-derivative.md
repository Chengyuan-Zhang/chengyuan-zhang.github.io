---
title: 'Matrix derivative of Frobenius norm involving Hadamard product'
date: 2022-10-01
permalink: /posts/matrix-derivative/
tags:

- matrix derivative
- tricks
- Hadamard product
- Frobenuis product

mathjax: true
---



**Problem**: Solve $\frac{\partial\left\|\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})\right\|_
{F}^{2}}{\partial\boldsymbol{W}}$ and $\frac{\partial\left\|\boldsymbol{A}\circ (
\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})\right\|_{F}^{2}}{\partial\boldsymbol{X}}$, where $\circ$ denotes the
Hadamard product, and all variables are matrices.

### Solution

We define $\boldsymbol{Z}=\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})$, then we have

$$
\begin{aligned}
\partial\|\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})\|_F^2
&= \partial \boldsymbol{Z}:\boldsymbol{Z} \\
&= 2\boldsymbol{Z}:d\boldsymbol{Z} \\
&= 2\boldsymbol{Z}:d(\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})) \\
&= 2\boldsymbol{Z}:\boldsymbol{A}\circ d(-\boldsymbol{W}^\top\boldsymbol{X}) \\
&= -2(\boldsymbol{A}\circ\boldsymbol{Z}):(d\boldsymbol{W}^\top\cdot\boldsymbol{X}
   +\boldsymbol{W}^\top\cdot d\boldsymbol{X}) \\
&= -2(\boldsymbol{A}\circ\boldsymbol{Z}):(d\boldsymbol{W}^\top\cdot\boldsymbol{X}) \\
&\quad -2(\boldsymbol{A}\circ\boldsymbol{Z}):(\boldsymbol{W}^\top\cdot d\boldsymbol{X}) \\
&= -2(\boldsymbol{A}\circ\boldsymbol{Z})\boldsymbol{X}^\top:d\boldsymbol{W}^\top
   -2\boldsymbol{W}(\boldsymbol{A}\circ\boldsymbol{Z}):d\boldsymbol{X} \\
&= -2\boldsymbol{X}(\boldsymbol{A}\circ\boldsymbol{Z})^\top:d\boldsymbol{W}
   -2\boldsymbol{W}(\boldsymbol{A}\circ\boldsymbol{Z}):d\boldsymbol{X}.
\end{aligned}
$$

Therefore, we have

$$
\begin{aligned}
\frac{\partial\|\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})\|_F^2}{\partial\boldsymbol{W}}
&= -2\boldsymbol{X}(\boldsymbol{A}\circ\boldsymbol{Z})^\top \\
&= -2\boldsymbol{X}(\boldsymbol{A}\circ\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X}))^\top,
\end{aligned}
$$

and

$$
\begin{aligned}
\frac{\partial\|\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})\|_F^2}{\partial\boldsymbol{X}}
&= -2\boldsymbol{W}(\boldsymbol{A}\circ\boldsymbol{Z}) \\
&= -2\boldsymbol{W}(\boldsymbol{A}\circ\boldsymbol{A}\circ (\boldsymbol{Y}-\boldsymbol{W}^\top\boldsymbol{X})).
\end{aligned}
$$

### Notes

1. The Frobenuis product of two matrices $\boldsymbol{A}$ and $\boldsymbol{B}$ is defined as $\boldsymbol{A}:
   \boldsymbol{B}=\text{tr}(\boldsymbol{A}^\top\boldsymbol{B})$.
2. $\boldsymbol{A}:\boldsymbol{B}\circ\boldsymbol{C}=\boldsymbol{A}\circ\boldsymbol{B}:\boldsymbol{C}$.
