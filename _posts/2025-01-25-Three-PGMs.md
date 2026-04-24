---
title: 'Fundamental Probabilistic Graphical Models: Tail-to-Tail, Head-to-Tail, and Head-to-Head'
date: 2025-01-25
permalink: /posts/three-PGMs/
tags:

- PGM
- conditional independence
- d-separation

---


**Probabilistic graphical models (PGMs)** provide a compact, visual language for reasoning about joint distributions
over many random variables. In directed acyclic graphs (DAGs), three elementary three-node structures — **tail-to-tail**,
**head-to-tail**, and **head-to-head** — serve as the building blocks that determine *when two variables are
(conditionally) independent*. Understanding these three patterns is the key to reading any larger Bayesian network.

In this post, we will cover:

1. **What do directed PGMs encode?**
2. **Tail-to-tail structure (common cause / fork).**
3. **Head-to-tail structure (chain / cascade).**
4. **Head-to-head structure (collider / v-structure).**
5. **A unified view: d-separation.**

---

## 1. What Do Directed PGMs Encode?

A directed PGM (Bayesian network) over variables $X_1, \dots, X_n$ factorizes the joint distribution according to the
graph structure:

$$
p(X_1, \dots, X_n) = \prod_{i=1}^n p(X_i \mid \mathrm{Pa}(X_i)),
$$

where $\mathrm{Pa}(X_i)$ denotes the parents of $X_i$ in the DAG. The graph makes **conditional independence**
assumptions explicit: whether information flows between two nodes depends on *which other nodes we condition on*.

For three variables $X$, $Y$, and $Z$, there are exactly three possible ways $Z$ can sit between $X$ and $Y$ in a
directed graph. Each has a very different independence behavior.

---

## 2. Tail-to-Tail Structure (Common Cause / Fork)

### Graph

$$
X \;\leftarrow\; Z \;\rightarrow\; Y
$$

Both arrows leave from $Z$ — $Z$ is the common parent (both tails attach to $Z$). This models a **common cause**: $Z$
influences both $X$ and $Y$.

### Factorization

$$
p(X, Y, Z) = p(Z)\, p(X \mid Z)\, p(Y \mid Z).
$$

### Independence behavior

- **Marginally**: $X$ and $Y$ are generally **dependent**, because both are driven by the shared cause $Z$.

  $$
  p(X, Y) = \sum_{Z} p(Z)\, p(X \mid Z)\, p(Y \mid Z) \neq p(X)\, p(Y) \quad \text{in general.}
  $$

- **Conditioned on $Z$**: $X$ and $Y$ become **independent**,

  $$
  p(X, Y \mid Z) = p(X \mid Z)\, p(Y \mid Z) \;\;\Longrightarrow\;\; X \perp\!\!\!\perp Y \mid Z.
  $$

### Intuition

Once the common cause $Z$ is known, the shared source of variability is "explained," so $X$ carries no extra
information about $Y$ beyond what $Z$ already provides. In driving: if $Z$ is road condition, then braking distance
($X$) and tire wear ($Y$) co-vary marginally, but become independent once we fix the road.

---

## 3. Head-to-Tail Structure (Chain / Cascade)

### Graph

$$
X \;\rightarrow\; Z \;\rightarrow\; Y
$$

The arrow into $Z$ meets the arrow out of $Z$ at its node — a *head* meets a *tail*. This models a **causal chain**:
$X$ influences $Y$ only through the mediator $Z$.

### Factorization

$$
p(X, Y, Z) = p(X)\, p(Z \mid X)\, p(Y \mid Z).
$$

### Independence behavior

- **Marginally**: $X$ and $Y$ are generally **dependent**, because information flows along the chain.

  $$
  p(X, Y) = \sum_{Z} p(X)\, p(Z \mid X)\, p(Y \mid Z) \neq p(X)\, p(Y) \quad \text{in general.}
  $$

- **Conditioned on $Z$**: the chain is **blocked**, and $X \perp\!\!\!\perp Y \mid Z$:

  $$
  p(Y \mid X, Z)
  = \frac{p(X, Y, Z)}{p(X, Z)}
  = \frac{p(X)\, p(Z \mid X)\, p(Y \mid Z)}{p(X)\, p(Z \mid X)}
  = p(Y \mid Z).
  $$

### Intuition

If the mediator $Z$ is observed, $X$ adds nothing to our knowledge of $Y$: the "message" from $X$ to $Y$ has to pass
through $Z$, and once $Z$ is fixed the channel is closed. This is the classical **Markov property**: the future depends
on the past only through the present.

---

## 4. Head-to-Head Structure (Collider / V-structure)

### Graph

$$
X \;\rightarrow\; Z \;\leftarrow\; Y
$$

Both arrows point *into* $Z$ — two *heads* meet. $Z$ is a **collider** on the path between $X$ and $Y$. This is the
most counter-intuitive of the three.

### Factorization

$$
p(X, Y, Z) = p(X)\, p(Y)\, p(Z \mid X, Y).
$$

Note that $X$ and $Y$ are drawn from independent priors here.

### Independence behavior

- **Marginally**: $X$ and $Y$ are **independent**,

  $$
  p(X, Y) = \sum_{Z} p(X)\, p(Y)\, p(Z \mid X, Y) = p(X)\, p(Y)
  \;\;\Longrightarrow\;\; X \perp\!\!\!\perp Y.
  $$

  *Exactly the opposite* of the fork and chain!

- **Conditioned on $Z$** (or any descendant of $Z$): $X$ and $Y$ generally become **dependent**:

  $$
  p(X, Y \mid Z) = \frac{p(X)\, p(Y)\, p(Z \mid X, Y)}{p(Z)} \neq p(X \mid Z)\, p(Y \mid Z) \quad \text{in general.}
  $$

### Intuition: "Explaining Away"

If two independent causes $X$ and $Y$ can each produce effect $Z$, then observing $Z$ creates a dependence between
them: learning that one cause is present *reduces the posterior probability* of the other.

- Example: $X$ = "engine failure", $Y$ = "flat tire", $Z$ = "car stopped on the highway". A priori the two failure
  modes are independent. But if we observe $Z$ and then learn the engine is fine, we infer that a flat tire becomes
  more likely — the engine has been *explained away*.

This property is central to Bayesian inference: conditioning on a collider *opens* a path that was previously closed.

---

## 5. A Unified View: d-Separation

The three structures above are precisely the local rules of **d-separation**, the graphical criterion for conditional
independence in a Bayesian network. For an undirected path between $X$ and $Y$ and a conditioning set $\mathcal{C}$, the
path is *blocked* if any node along it satisfies one of the following:

| Structure at node $Z$ | Blocked when | Open when |
|---|---|---|
| Tail-to-tail ($X \leftarrow Z \rightarrow Y$) | $Z \in \mathcal{C}$ | $Z \notin \mathcal{C}$ |
| Head-to-tail ($X \rightarrow Z \rightarrow Y$) | $Z \in \mathcal{C}$ | $Z \notin \mathcal{C}$ |
| Head-to-head ($X \rightarrow Z \leftarrow Y$) | $Z \notin \mathcal{C}$ **and** no descendant of $Z$ is in $\mathcal{C}$ | $Z$ or any descendant of $Z$ $\in \mathcal{C}$ |

If *every* undirected path between $X$ and $Y$ is blocked given $\mathcal{C}$, then $X$ and $Y$ are
**d-separated** by $\mathcal{C}$, which implies

$$
X \perp\!\!\!\perp Y \mid \mathcal{C}.
$$

So the tail-to-tail and head-to-tail structures behave identically — observing the middle node *blocks* the flow of
information — whereas the head-to-head structure is their *opposite*: observing the collider (or any of its
descendants) *opens* the path.

---

## Summary

- **Tail-to-tail** ($X \leftarrow Z \rightarrow Y$): common cause. $X$ and $Y$ are marginally dependent, independent
  given $Z$.
- **Head-to-tail** ($X \rightarrow Z \rightarrow Y$): causal chain. $X$ and $Y$ are marginally dependent, independent
  given the mediator $Z$.
- **Head-to-head** ($X \rightarrow Z \leftarrow Y$): collider / v-structure. $X$ and $Y$ are marginally independent,
  but become dependent once $Z$ (or a descendant) is observed — the "explaining away" effect.

These three patterns — two that *close* under conditioning and one that *opens* under conditioning — are all that is
needed to read conditional independence off any directed graphical model via d-separation. They recur everywhere in
practice, from latent-variable models and hierarchical Bayesian models to hidden Markov models and causal inference.

---

### References

- J. Pacheco, *Probabilistic Graphical Models*, CSC 535 Lecture Notes, University of Arizona, Fall 2020.
  [[slides]](https://www2.cs.arizona.edu/~pachecoj/courses/csc535_fall20/lectures/pgms.pdf)
- C. M. Bishop, *Pattern Recognition and Machine Learning*, Chapter 8: Graphical Models. Springer, 2006.
- D. Koller and N. Friedman, *Probabilistic Graphical Models: Principles and Techniques*. MIT Press, 2009.
