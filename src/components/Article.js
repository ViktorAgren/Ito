import React from 'react';
import { CodeWindow } from './CodeWindow';
import { LatexBlock } from './LatexBlock';
import { InteractiveDemo } from './InteractiveDemo';
import { Theorem } from './Theorem';
import { Note } from './Note';
import { InlineMath } from './InlineMath';

export const Article = () => {
  return (
    <article className="journal-article">
      <header>
        <h1 className="text-2xl font-semibold mb-2">Itô's Lemma: A Geometric Journey</h1>
        <p className="text-gray-600 italic mb-4">
          The emergence of geometric structure in stochastic analysis
        </p>
      </header>

      <section>
        <h2 className="section-title">1. Foundations and Geometric Intuition</h2>
        
        <p>
          The central insight of Itô calculus emerges from the interaction between irregular paths and curved surfaces. 
          Consider a filtered probability space <InlineMath tex="(\Omega, \mathcal{F}, \{\mathcal{F}_t\}_{t \geq 0}, \mathbb{P})" /> 
          supporting a Brownian motion <InlineMath tex="W_t" />. The geometric structure of stochastic calculus 
          manifests through the non-vanishing quadratic variation of Brownian paths.
        </p>

        <h3 className="subsection-title">Quadratic Variation and Path Geometry</h3>
        <p>
          The fundamental distinction between classical and stochastic calculus lies in the path properties of Brownian motion.
          For any partition <InlineMath tex="\Pi_n" /> of <InlineMath tex="[0,t]" /> with mesh <InlineMath tex="|\Pi_n| \to 0" />,
          we encounter a remarkable property:
        </p>

        <LatexBlock 
          equation="\lim_{n \to \infty} \sum_{t_i \in \Pi_n} (W_{t_{i+1}} - W_{t_i})^2 = t \quad \text{a.s.}"
        />

        <p>
          This almost sure convergence represents a fundamental geometric invariant, forcing a systematic 
          reconsideration of differential geometry in the stochastic setting.
        </p>

        <Theorem title="The Geometric Form of Itô's Lemma">
          <p>
            Let <InlineMath tex="X_t" /> be an Itô process and <InlineMath tex="f \in C^{2}(\mathbb{R}^2)" />. Then:
          </p>
          
          <LatexBlock 
            equation="dX_t = \mu_t dt + \sigma_t dW_t"
          />
          
          <p>The differential of <InlineMath tex="f" /> decomposes into geometric components:</p>

          <LatexBlock 
            equation="df = \underbrace{\frac{\partial f}{\partial t}dt}_{\text{temporal evolution}} + \underbrace{(\mu_t\frac{\partial f}{\partial x}dt + \sigma_t\frac{\partial f}{\partial x}dW_t)}_{\text{directional change}} + \underbrace{\frac{1}{2}\sigma_t^2\frac{\partial^2 f}{\partial x^2}dt}_{\text{geometric correction}}"
          />
        </Theorem>

        <InteractiveDemo />

        <h3 className="subsection-title">Local Time and Path Properties</h3>
        <p>
          The geometric structure extends to local time <InlineMath tex="L_t^a" />, a measure of the path's
          occupation density at level <InlineMath tex="a" />. This concept emerges naturally through:
        </p>

        <LatexBlock 
          equation="L_t^a = \lim_{\epsilon \to 0} \frac{1}{2\epsilon} \int_0^t \mathbf{1}_{\{|W_s - a| < \epsilon\}} ds \quad \text{(in probability)}"
        />

        <h3 className="subsection-title">Geometric Extension: The Tanaka-Meyer Formula</h3>
        <p>
          For non-smooth functions, the geometric framework extends through the Tanaka-Meyer formula. 
          For <InlineMath tex="f(x) = |x|" />:
        </p>

        <LatexBlock 
          equation="|W_t| = \int_0^t \text{sign}(W_s)dW_s + L_t^0"
        />

        <p>
          This represents a fundamental extension of Itô's lemma to convex functions, where local time 
          naturally emerges as the geometric correction term.
        </p>

        <h2 className="section-title mt-8">2. Geometric Applications</h2>
        
        <p>
          The geometric framework provides fundamental insights across stochastic analysis. In mathematical finance, 
          the curvature correction manifests in the relationship between logarithmic and arithmetic returns:
        </p>

        <Note>
          <p>
            Consider a geometric Brownian motion with the semimartingale decomposition:
            <LatexBlock 
              equation="d\log(S_t) = (r - \frac{1}{2}\sigma^2)dt + \sigma dW_t"
            />
            The <InlineMath tex="-\frac{1}{2}\sigma^2" /> term arises directly from the geometric correction in Itô's lemma.
          </p>
        </Note>

        <p>
          This geometric perspective extends beyond finance to quantum mechanics (through the Feynman-Kac formula), 
          statistical mechanics (via stochastic differential geometry), and the study of random dynamical systems.
        </p>
      </section>
    </article>
  );
};

export default Article;