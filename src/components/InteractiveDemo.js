import React from 'react';
import itoPlot from './ito-plot.png';

export const InteractiveDemo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Geometric Principles of Itô Calculus</h3>
        <p className="text-sm text-gray-600 mb-4">
          Visual exploration of stochastic path properties and their geometric implications
        </p>
      </div>
      
      <div className="w-full flex justify-center bg-white p-4 border rounded-lg">
        <img
          src={itoPlot}
          alt="Geometric principles of Itô calculus"
          className="max-w-full h-auto object-contain"
          style={{
            display: 'block',
            maxHeight: '800px',
            backgroundColor: 'white'
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div>
          <h4 className="font-medium mb-2">Structural Analysis:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><strong>Sample Paths:</strong> The top panel illustrates the fundamental properties of Brownian motion - continuous trajectories with nowhere-differentiable paths</li>
            <li><strong>Quadratic Variation:</strong> The middle left demonstrates the convergence of quadratic variations for different partition sizes, evidencing why dW²_t = dt</li>
            <li><strong>Transform Analysis:</strong> The middle right compares standard and Itô transformations for both polynomial (x²) and exponential functions, highlighting the systematic effect of the correction term</li>
            <li><strong>Local Time:</strong> The bottom panel visualizes the occupation density through local time at various levels, a key invariant of the process</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Theoretical Implications:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>The limiting behavior of quadratic variations provides the foundational justification for the Itô formula's correction term</li>
            <li>The transformation comparisons demonstrate how the geometric structure of irregular paths necessitates modifications to classical calculus rules</li>
            <li>Local time measurements reveal the fine structure of path behavior, connecting to fundamental theoretical results in stochastic analysis</li>
          </ul>
        </div>
      </div>

      <div className="text-sm text-gray-500 border-t pt-4">
        <p>
          These visualizations illuminate the fundamental relationship between path irregularity and geometric 
          correction terms in stochastic calculus. The non-vanishing quadratic variation of Brownian motion 
          necessitates the modification of classical differential rules, leading to the systematic emergence 
          of second-order terms in the Itô formula. This framework provides the mathematical foundation for 
          understanding diffusive processes in both theoretical and applied contexts.
        </p>
      </div>
    </div>
  );
};