import numpy as np
import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec

# Set random seed for reproducibility
np.random.seed(42)

def generate_brownian_path(t, n_paths=1):
    """Generate multiple Brownian motion paths"""
    dt = t[1] - t[0]
    dW = np.random.normal(0, np.sqrt(dt), (n_paths, len(t)-1))
    W = np.cumsum(dW, axis=1)
    return np.concatenate([np.zeros((n_paths, 1)), W], axis=1)

def transform_ito(x, dt, func, func_prime):
    """Apply Itô transformation"""
    dW = np.diff(x)
    dx_ito = func_prime(x[:-1]) * dW + 0.5 * func_prime(func_prime(x[:-1])) * dt
    return np.concatenate(([func(0)], func(x[0]) + np.cumsum(dx_ito)))

# Time points
t = np.linspace(0, 1, 1000)
dt = t[1] - t[0]

# Generate multiple paths for different visualizations
n_paths = 5
paths = generate_brownian_path(t, n_paths)

# Create figure with custom layout
plt.style.use('default')
fig = plt.figure(figsize=(15, 12))
gs = GridSpec(3, 2, figure=fig)
fig.patch.set_facecolor('white')

# Plot 1: Multiple Brownian paths
ax1 = fig.add_subplot(gs[0, :])
ax1.set_facecolor('white')
for i in range(n_paths):
    ax1.plot(t, paths[i], alpha=0.7, linewidth=1.5)
ax1.grid(True, linestyle='--', alpha=0.3)
ax1.set_title('Sample Paths of Brownian Motion', pad=20)
ax1.set_ylabel('Value')

# Plot 2: Quadratic Variation
ax2 = fig.add_subplot(gs[1, 0])
ax2.set_facecolor('white')

# Compute quadratic variation for different time partitions
n_points = [10, 50, 200]
colors = ['#2563eb', '#dc2626', '#059669']

for n, color in zip(n_points, colors):
    t_coarse = np.linspace(0, 1, n)
    path_coarse = np.interp(t_coarse, t, paths[0])
    increments = np.diff(path_coarse)
    quad_var = np.cumsum(increments**2)
    ax2.plot(t_coarse[1:], quad_var, 
             label=f'n={n} points', 
             color=color, 
             linewidth=2)

ax2.plot(t, t, '--', color='black', label='t (limit)', alpha=0.7)
ax2.grid(True, linestyle='--', alpha=0.3)
ax2.legend()
ax2.set_title('Quadratic Variation Approximation', pad=20)
ax2.set_ylabel('Quadratic Variation')

# Plot 3: Different Transformations
ax3 = fig.add_subplot(gs[1, 1])
ax3.set_facecolor('white')

# Example path
path = paths[0]

# Different transformations
def f1(x): return x**2
def f1_prime(x): return 2*x

def f2(x): return np.exp(x)
def f2_prime(x): return np.exp(x)

# Apply transformations
ito_quad = transform_ito(path, dt, f1, f1_prime)
ito_exp = transform_ito(path, dt, f2, f2_prime)
standard_quad = f1(path)
standard_exp = f2(path)

ax3.plot(t, ito_quad, label='Itô (x²)', color='#2563eb', linewidth=2)
ax3.plot(t, standard_quad, '--', label='Standard (x²)', color='#2563eb', alpha=0.7)
ax3.plot(t, ito_exp, label='Itô (exp(x))', color='#dc2626', linewidth=2)
ax3.plot(t, standard_exp, '--', label='Standard (exp(x))', color='#dc2626', alpha=0.7)
ax3.grid(True, linestyle='--', alpha=0.3)
ax3.legend()
ax3.set_title('Different Transformations: Itô vs Standard', pad=20)
ax3.set_ylabel('Value')

# Plot 4: Local Time
ax4 = fig.add_subplot(gs[2, :])
ax4.set_facecolor('white')

# Compute local time approximation
def compute_local_time(path, a, eps):
    """Approximate local time at level a"""
    indicator = np.abs(path - a) < eps
    return np.cumsum(indicator) * dt / (2 * eps)

levels = [-0.5, 0, 0.5]
eps = 0.1

for a in levels:
    local_time = compute_local_time(path, a, eps)
    ax4.plot(t, local_time, label=f'Level {a}', linewidth=2)

ax4.grid(True, linestyle='--', alpha=0.3)
ax4.legend()
ax4.set_title('Local Time at Different Levels', pad=20)
ax4.set_xlabel('Time')
ax4.set_ylabel('Local Time')

# Adjust layout
plt.tight_layout()
plt.savefig('src/components/ito-plot.png', 
            format='png',
            dpi=300,
            bbox_inches='tight',
            facecolor='white',
            edgecolor='none')
plt.close()