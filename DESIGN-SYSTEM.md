# UI Design System & Guidelines

## 🎨 Design Philosophy

### Core Principles
- **Apple-Inspired Simplicity**: Clean, minimal design following Apple's Human Interface Guidelines
- **Content-First**: Design serves the content, not the other way around
- **Performance-Minded**: Beautiful but optimized for speed
- **Accessibility-Inclusive**: Designed for everyone, regardless of ability
- **Mobile-First**: Optimized for iPhone and iPad experiences

### Design Values
- **Clarity**: Clear visual hierarchy and intuitive navigation
- **Consistency**: Unified experience across all pages and components
- **Elegance**: Refined aesthetics with attention to detail
- **Functionality**: Beautiful designs that serve a purpose

---

## 🎯 Brand Identity

### Logo & Typography
```css
/* Primary Brand Font */
font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui;

/* Logo Treatment */
.brand-logo {
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}
```

### Brand Voice
- **Professional yet approachable**
- **Technical but accessible**
- **Confident without being boastful**
- **Focused on user benefits**

---

## 🌈 Color System

### Primary Palette
```css
:root {
  /* Primary Blues (Apple-inspired) */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #007aff;  /* Primary */
  --color-primary-600: #0051d0;
  --color-primary-700: #0040a0;
  --color-primary-800: #003370;
  --color-primary-900: #002650;

  /* Secondary Greens */
  --color-secondary-50: #f0fdf4;
  --color-secondary-100: #dcfce7;
  --color-secondary-200: #bbf7d0;
  --color-secondary-300: #86efac;
  --color-secondary-400: #4ade80;
  --color-secondary-500: #30d158;  /* Secondary */
  --color-secondary-600: #16a34a;
  --color-secondary-700: #15803d;
  --color-secondary-800: #166534;
  --color-secondary-900: #14532d;

  /* Accent Orange */
  --color-accent-50: #fff7ed;
  --color-accent-100: #ffedd5;
  --color-accent-200: #fed7aa;
  --color-accent-300: #fdba74;
  --color-accent-400: #fb923c;
  --color-accent-500: #ff9500;  /* Accent */
  --color-accent-600: #ea580c;
  --color-accent-700: #c2410c;
  --color-accent-800: #9a3412;
  --color-accent-900: #7c2d12;
}
```

### Neutral Palette
```css
:root {
  /* Light Mode */
  --color-background: #f5f5f7;      /* Light gray background */
  --color-surface: #ffffff;         /* White cards/surfaces */
  --color-surface-secondary: #f8f9fa;
  --color-border: #e5e5e7;         /* Light borders */
  --color-text-primary: #1d1d1f;   /* Dark text */
  --color-text-secondary: #86868b; /* Gray text */
  --color-text-tertiary: #c7c7cc;  /* Light gray text */

  /* Dark Mode Support */
  --color-background-dark: #000000;
  --color-surface-dark: #1c1c1e;
  --color-border-dark: #38383a;
  --color-text-primary-dark: #ffffff;
  --color-text-secondary-dark: #98989d;
}
```

### Color Usage Guidelines
- **Primary Blue**: CTAs, links, active states, navigation highlights
- **Secondary Green**: Success states, positive feedback, eco-friendly features
- **Accent Orange**: Warnings, pending states, launch dates
- **Neutrals**: Text, backgrounds, borders, subtle UI elements

---

## 📝 Typography System

### Font Stack
```css
:root {
  /* Apple System Fonts */
  --font-family-primary: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 
                         'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --font-family-mono: 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
```

### Type Scale
```css
:root {
  /* Font Sizes */
  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 1.875rem;   /* 30px */
  --font-size-4xl: 2.25rem;    /* 36px */
  --font-size-5xl: 3rem;       /* 48px */
  --font-size-6xl: 3.75rem;    /* 60px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-snug: 1.4;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.8;
}
```

### Typography Components
```css
/* Headings */
.heading-1 {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: -0.025em;
}

.heading-2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  letter-spacing: -0.02em;
}

.heading-3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  letter-spacing: -0.01em;
}

/* Body Text */
.body-large {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
}

.body-base {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.body-small {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

/* Captions */
.caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-tight);
  color: var(--color-text-secondary);
}
```

---

## 📏 Spacing System

### Spacing Scale
```css
:root {
  /* Base: 0.25rem (4px) */
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

### Spacing Guidelines
- **Micro spacing (1-3)**: Icon padding, button text spacing
- **Component spacing (4-8)**: Card padding, form field spacing
- **Section spacing (12-24)**: Between major sections
- **Layout spacing (32+)**: Page margins, hero sections

---

## 🎛 Component Library

### Buttons
```css
/* Primary Button */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  text-decoration: none;
  border-radius: 0.5rem;
  background: var(--color-primary-500);
  color: white;
  border: 2px solid var(--color-primary-500);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
}

.btn-secondary:hover {
  background: var(--color-primary-500);
  color: white;
}

/* Button Sizes */
.btn-small {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
}

.btn-large {
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-lg);
}
```

### Cards
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card--featured {
  border: 2px solid var(--color-primary-500);
  box-shadow: 0 4px 20px rgba(0, 122, 255, 0.1);
}
```

### Form Elements
```css
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-surface);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
:root {
  --breakpoint-xs: 320px;   /* Small phones */
  --breakpoint-sm: 640px;   /* Large phones */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Small laptops */
  --breakpoint-xl: 1280px;  /* Desktop */
  --breakpoint-2xl: 1536px; /* Large desktop */
}
```

### Responsive Utilities
```css
/* Mobile-first approach */
@media (min-width: 640px) {
  .sm\:text-lg { font-size: var(--font-size-lg); }
  .sm\:p-6 { padding: var(--space-6); }
}

@media (min-width: 768px) {
  .md\:text-xl { font-size: var(--font-size-xl); }
  .md\:p-8 { padding: var(--space-8); }
}

@media (min-width: 1024px) {
  .lg\:text-2xl { font-size: var(--font-size-2xl); }
  .lg\:p-12 { padding: var(--space-12); }
}
```

---

## ✨ Animation & Motion

### Timing Functions
```css
:root {
  /* Easing Functions */
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Duration */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
}
```

### Animation Patterns
```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp var(--duration-slow) var(--ease-out-cubic);
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Hover Effects */
.hover-lift {
  transition: transform var(--duration-normal) var(--ease-out-cubic);
}

.hover-lift:hover {
  transform: translateY(-4px);
}
```

---

## 🎯 Layout System

### Grid System
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); }
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--space-8); }
}

/* Flexible Grid */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Auto-fit Grid */
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Flexbox Utilities
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: var(--space-4); }
```

---

## 🌙 Dark Mode Support

### Dark Mode Variables
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-background-dark);
    --color-surface: var(--color-surface-dark);
    --color-border: var(--color-border-dark);
    --color-text-primary: var(--color-text-primary-dark);
    --color-text-secondary: var(--color-text-secondary-dark);
  }
}

/* Manual dark mode toggle */
.dark {
  --color-background: var(--color-background-dark);
  --color-surface: var(--color-surface-dark);
  --color-border: var(--color-border-dark);
  --color-text-primary: var(--color-text-primary-dark);
  --color-text-secondary: var(--color-text-secondary-dark);
}
```

---

## ♿ Accessibility Guidelines

### Color Contrast
- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text (18px+)**: 3:1 minimum contrast ratio
- **UI components**: 3:1 minimum contrast ratio

### Focus States
```css
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Remove default focus styles */
*:focus:not(.focus-visible) {
  outline: none;
}
```

### Semantic HTML
```html
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Use landmarks -->
<nav aria-label="Main navigation">
<main>
<aside aria-label="Sidebar">
<footer>

<!-- Use proper form labels -->
<label for="email">Email Address</label>
<input type="email" id="email" required>
```

---

## 📐 Design Tokens (CSS Custom Properties)

### Complete Token System
```css
:root {
  /* Colors */
  --primary: var(--color-primary-500);
  --secondary: var(--color-secondary-500);
  --accent: var(--color-accent-500);
  --background: var(--color-background);
  --surface: var(--color-surface);
  --text: var(--color-text-primary);
  --text-muted: var(--color-text-secondary);
  --border: var(--color-border);

  /* Spacing */
  --space-xs: var(--space-2);
  --space-sm: var(--space-4);
  --space-md: var(--space-6);
  --space-lg: var(--space-8);
  --space-xl: var(--space-12);

  /* Typography */
  --text-xs: var(--font-size-xs);
  --text-sm: var(--font-size-sm);
  --text-base: var(--font-size-base);
  --text-lg: var(--font-size-lg);
  --text-xl: var(--font-size-xl);

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

---

## 🎨 Icon System

### Icon Guidelines
- **Style**: Use SF Symbols or similar system icons
- **Size**: 16px, 20px, 24px standard sizes
- **Weight**: Match text weight (regular, medium, semibold)
- **Color**: Inherit from parent or use semantic colors

### Icon Implementation
```css
.icon {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-block;
  vertical-align: middle;
}

.icon--small { width: 1rem; height: 1rem; }
.icon--large { width: 1.5rem; height: 1.5rem; }
.icon--primary { color: var(--color-primary-500); }
.icon--secondary { color: var(--color-text-secondary); }
```

---

This design system provides a solid foundation for creating consistent, accessible, and beautiful interfaces. All components should follow these guidelines to ensure a cohesive user experience across your entire website.

**Next Steps:**
1. Implement the design tokens in your CSS
2. Create component library based on these guidelines
3. Apply consistent styling to all existing pages
4. Document any custom components you create 