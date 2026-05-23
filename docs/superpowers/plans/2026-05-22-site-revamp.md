# Site Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate ericsavoie119.github.io from plain HTML/CSS to Astro 4, redesign with Slate & Moss palette, and add writing section scaffolding.

**Architecture:** Astro 4 static site, components in `src/components/`, pages in `src/pages/`, app data in `src/data/apps.ts`, static assets in `public/`. GitHub Actions deploys `dist/` to GitHub Pages. The existing site stays live until deployment is switched in the final task.

**Tech Stack:** Astro 4, plain CSS (no Tailwind), GitHub Actions (`actions/deploy-pages`), GitHub Pages.

---

## File Map

**Create:**
- `astro.config.mjs` — Astro config (static output, site URL)
- `package.json` — dependencies
- `src/layouts/Layout.astro` — base HTML wrapper with head/meta
- `src/components/Navbar.astro` — sticky dark navbar
- `src/components/Footer.astro` — minimal footer
- `src/components/Hero.astro` — headshot + name + tagline + stats
- `src/components/AppCard.astro` — accent-header-bar card
- `src/data/apps.ts` — typed array of all 12 apps
- `src/pages/index.astro` — home page
- `src/pages/writing/index.astro` — writing index (empty state for now)
- `src/content/config.ts` — content collection definition
- `src/styles/global.css` — Slate & Moss design tokens + base resets
- `.github/workflows/deploy.yml` — build & deploy to GitHub Pages

**Copy to `public/` (static, served verbatim):**
- `public/CNAME` ← `CNAME`
- `public/robots.txt` ← `robots.txt`
- `public/.nojekyll` ← `.nojekyll`
- `public/assets/images/` ← `assets/images/`
- `public/poker-timer/` ← `poker-timer/`
- `public/apps/fast-simple-invoice-maker/` ← `apps/fast-simple-invoice-maker/`
- `public/legal/privacy-policy.html` ← `legal/privacy-policy.html`
- `public/manifest.json` ← `manifest.json`

**Delete after Astro is verified locally:**
- `index.html`, `assets/`, `apps/`, `legal/`, `privacy-policy.html`, `terms.html`, `sitemap.xml`, `scripts/`, `_disabled_assets_backup/`

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

- [ ] **Step 1: Initialise Astro with the minimal template**

Run from the repo root:
```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```
When prompted "How would you like to use TypeScript?" choose **Strict**.
When prompted about existing files, choose to ignore/skip (we keep our files).

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Replace `astro.config.mjs` with the correct config**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://savoie.app',
  output: 'static',
  trailingSlash: 'ignore',
});
```

- [ ] **Step 4: Verify Astro dev server starts**

```bash
npm run dev
```
Expected: server running at `http://localhost:4321`. The default Astro placeholder page loads. No errors in terminal.

- [ ] **Step 5: Add `dist/` to `.gitignore`**

Append to `.gitignore`:
```
# Astro build output
dist/
.astro/
```

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore
git commit -m "feat: scaffold Astro project"
```

---

## Task 2: Copy static assets to `public/`

**Files:**
- Create: `public/` directory structure

- [ ] **Step 1: Copy all static assets**

```bash
mkdir -p public
cp CNAME public/CNAME
cp robots.txt public/robots.txt
cp .nojekyll public/.nojekyll
cp manifest.json public/manifest.json
cp -r assets/images public/assets/images
cp -r poker-timer public/poker-timer
cp -r apps public/apps
mkdir -p public/legal
cp legal/privacy-policy.html public/legal/privacy-policy.html
```

- [ ] **Step 2: Verify images are accessible in dev server**

With `npm run dev` running, open `http://localhost:4321/assets/images/Eric.png`.
Expected: the Eric.png icon loads in the browser.

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "feat: copy static assets to public/"
```

---

## Task 3: Global CSS — Slate & Moss design tokens

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create the global stylesheet**

```css
/* src/styles/global.css */
:root {
  --color-bg:             #1e2a27;
  --color-surface:        #253530;
  --color-surface-raised: #2e4a3e;
  --color-border:         #2e3e3a;
  --color-border-card:    #3a5e50;
  --color-text-primary:   #e8e0d0;
  --color-text-secondary: #7a9e8a;
  --color-accent:         #7ac4a0;
  --color-nav-bg:         #1a2522;

  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --radius-card: 12px;
  --radius-sm:   6px;
  --radius-pill: 20px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-family: var(--font); background: var(--color-bg); color: var(--color-text-primary); }

body { min-height: 100vh; line-height: 1.6; }

a { color: inherit; text-decoration: none; }

img { display: block; max-width: 100%; }

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add Slate & Moss global CSS tokens"
```

---

## Task 4: Layout component

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Create the Layout component**

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const {
  title,
  description = 'Eric Savoie builds iOS apps across productivity, finance, AI, and utilities.',
  canonicalUrl = 'https://savoie.app/',
  ogImage = 'https://savoie.app/assets/images/Eric.png',
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="author" content="Eric Savoie" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <link rel="canonical" href={canonicalUrl} />
    <title>{title}</title>
    <link rel="stylesheet" href="/assets/css/global.css" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

Wait — we're importing from a path that doesn't exist yet. Change the stylesheet link to use an inline import instead:

```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const {
  title,
  description = 'Eric Savoie builds iOS apps across productivity, finance, AI, and utilities.',
  canonicalUrl = 'https://savoie.app/',
  ogImage = 'https://savoie.app/assets/images/Eric.png',
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="author" content="Eric Savoie" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <link rel="canonical" href={canonicalUrl} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add Layout component"
```

---

## Task 5: Navbar component

**Files:**
- Create: `src/components/Navbar.astro`

- [ ] **Step 1: Create Navbar**

```astro
---
// src/components/Navbar.astro
const path = Astro.url.pathname;
const isHome = path === '/' || path === '';
const isApps = path.startsWith('/#apps');
const isPrivacy = path.includes('privacy-policy');
---
<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo">Eric Savoie</a>
    <div class="nav-links">
      <a href="/#apps" class:list={['nav-link', { active: isApps }]}>Apps</a>
      <a href="/legal/privacy-policy.html" class:list={['nav-link', { active: isPrivacy }]}>Privacy</a>
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-nav-bg);
    border-bottom: 1px solid var(--color-border);
  }
  .nav-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo {
    color: var(--color-text-primary);
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: -0.2px;
  }
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  .nav-link {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    transition: color 150ms ease;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--color-accent);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: add Navbar component"
```

---

## Task 6: Footer component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Footer**

```astro
---
// src/components/Footer.astro
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container">
    <span>© {year} Eric Savoie</span>
    <a href="/legal/privacy-policy.html">Privacy</a>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--color-border);
    padding: 2rem 0;
    margin-top: 4rem;
  }
  .footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }
  .footer a {
    color: var(--color-text-secondary);
    transition: color 150ms ease;
  }
  .footer a:hover { color: var(--color-accent); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component"
```

---

## Task 7: App data file

**Files:**
- Create: `src/data/apps.ts`

- [ ] **Step 1: Create the typed app data**

```typescript
// src/data/apps.ts
export interface App {
  name: string;
  image: string;
  category: string;
  description: string;
  tech: string[];
  links: {
    appStore?: string;
    features?: string;
  };
}

export const apps: App[] = [
  {
    name: 'Curiosity AI',
    image: '/assets/images/apps/CuriosityAI/appstore.png',
    category: 'Anonymous community chat',
    description: 'Drop into live, topic-based rooms, speak your mind anonymously, and let built-in AI help you express ideas and keep conversations productive.',
    tech: ['Cognito Identity Pool', 'DynamoDB', 'SigV4', 'WebSockets', 'URLSessionWebSocketTask', 'OpenAI ChatGPT API', 'OpenAI Moderation API', 'Streaming API responses', 'Presigned URLs', 'CryptoKit'],
    links: { appStore: 'https://apps.apple.com/gb/app/curiosity-ai/id6753080466' },
  },
  {
    name: 'Bread Engineer',
    image: '/assets/images/icons/BreadEngineer.png',
    category: 'ML‑driven fermentation timer for perfect loaves',
    description: 'On‑device machine learning predicts peak fermentation for your dough—no more guesswork. Generous two‑month trial included.',
    tech: ['CoreML', 'CloudKit', 'SwiftData', 'Firebase Auth', 'Firebase Analytics', 'Tuist', 'Module architecture', 'Photo Compression', 'Fastlane'],
    links: { appStore: 'https://apps.apple.com/gb/app/bread-engineer/id6738381066' },
  },
  {
    name: 'GridMetrics',
    image: '/assets/images/apps/GridMetrics/1024.png',
    category: 'Real‑time electricity grid insights',
    description: 'See the real time distribution of the UK grid generation mix.',
    tech: ['AWS APIGateway', 'AWS Lambda', 'AWS S3', 'AWS EC2', 'AWS ECR'],
    links: { appStore: 'https://apps.apple.com/gb/app/gridmetrics/id6752292390' },
  },
  {
    name: 'Swivo',
    image: '/assets/images/apps/Swivo/appstore.png',
    category: 'AI-generated social video feed',
    description: 'Like TikTok for AI generated content with cloud-powered video generation.',
    tech: ['UICollectionView', 'UIKit', 'Google Cloud Platform', 'Vertex AI API', 'VEO3 (Video Generation)', 'Cloud Storage'],
    links: { appStore: 'https://apps.apple.com/gb/app/swivo/id6753713071' },
  },
  {
    name: 'BeLoved',
    image: '/assets/images/apps/BeLoved/appstore.png',
    category: 'Beautiful relationship tracker',
    description: 'Track anniversaries, milestones, and special dates with notifications to never miss a moment.',
    tech: ['WidgetKit', 'StoreKit Configuration files'],
    links: { appStore: 'https://apps.apple.com/gb/app/beloved/id6752829410' },
  },
  {
    name: 'Fast Simple Invoice Maker',
    image: '/assets/images/apps/Fast%20Simple%20Invoice%20Maker/appstore.png',
    category: 'Create professional invoices fast',
    description: 'Invoice apps that create PDFs had log ins and lots of friction when creating PDFs is quite simple so I made a Fast Simple version.',
    tech: ['PDFKit'],
    links: {
      appStore: 'https://apps.apple.com/gb/app/fast-simple-invoice-maker/id6752559476',
      features: '/apps/fast-simple-invoice-maker/',
    },
  },
  {
    name: 'Infinite Ruler',
    image: '/assets/images/icons/infiniteruler.png',
    category: 'Measure anything with your phone',
    description: 'An app that uses known DPI values to turn your phone into an old school ruler. Limited use but kind of fun.',
    tech: ['Measurement framework'],
    links: { appStore: 'https://apps.apple.com/gb/app/infinite-ruler/id6746876762' },
  },
  {
    name: 'Loan Calculator Smart',
    image: '/assets/images/apps/LoanCalculatorSmart/appstore.png',
    category: 'Compare loans with interactive charts',
    description: 'A comprehensive loan comparison tool featuring multi-scenario analysis, interactive charts, breakeven calculations, and PDF report generation.',
    tech: ['Swift Charts'],
    links: { appStore: 'https://apps.apple.com/gb/app/loan-calculator-smart/id6752863737' },
  },
  {
    name: 'SuperGoodBudget',
    image: '/assets/images/apps/SuperGoodBudget/appstore.png',
    category: 'Budget smarter, spend better',
    description: 'Inspired by YNAB budgeting and tracking every dollar you spend helps to keep you on top of your finances.',
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/supergoodbudget/id6752673311' },
  },
  {
    name: 'Flip Clock Flow',
    image: '/assets/images/apps/Flip%20Clock%20Flow/appstore.png',
    category: 'Elegant flip clock + focus timer',
    description: 'A cool nostalgic clock built by referencing open source code.',
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/flip-clock-flow/id6752408901' },
  },
  {
    name: 'Water?',
    image: '/assets/images/apps/Water%3F/appstore.png',
    category: 'Elegant hydration tracker',
    description: "Track the amount of water you're drinking during the day - interesting to see if you hit the water requirements every day.",
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/water/id6752577649' },
  },
  {
    name: 'Tip Calculator Fast',
    image: '/assets/images/apps/Tip%20Calculator%20Fast/appstore.png',
    category: 'Split bills in seconds',
    description: 'Using a keyboard toolbar and auto focusing textfields to achieve the fastest tip calculator on the market.',
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/tip-calculator-fast/id6752381498' },
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/apps.ts
git commit -m "feat: add typed app data"
```

---

## Task 8: AppCard component

**Files:**
- Create: `src/components/AppCard.astro`

- [ ] **Step 1: Create AppCard with accent header bar style**

```astro
---
// src/components/AppCard.astro
import type { App } from '../data/apps';

interface Props {
  app: App;
}
const { app } = Astro.props;
---
<div class="app-card">
  <div class="app-card-header">
    <img src={app.image} alt={`${app.name} icon`} class="app-icon" width="52" height="52" />
    <div>
      <h3 class="app-name">{app.name}</h3>
      <span class="app-category">{app.category}</span>
    </div>
  </div>
  <div class="app-card-body">
    <p class="app-description">{app.description}</p>
    {app.tech.length > 0 && (
      <div class="tech-tags">
        {app.tech.map(t => <span class="tech-tag">{t}</span>)}
      </div>
    )}
    <div class="app-links">
      {app.links.appStore && (
        <a href={app.links.appStore} class="btn-store" target="_blank" rel="noopener noreferrer">
          App Store ↗
        </a>
      )}
      {app.links.features && (
        <a href={app.links.features} class="btn-features">Features</a>
      )}
    </div>
  </div>
</div>

<style>
  .app-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border-card);
    border-radius: var(--radius-card);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .app-card-header {
    background: var(--color-surface-raised);
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .app-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    flex-shrink: 0;
  }

  .app-name {
    color: var(--color-text-primary);
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .app-category {
    color: var(--color-accent);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .app-card-body {
    padding: 14px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .app-description {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tech-tag {
    background: var(--color-bg);
    color: var(--color-accent);
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: var(--radius-pill);
    border: 1px solid var(--color-border);
  }

  .app-links {
    margin-top: auto;
    display: flex;
    gap: 8px;
    padding-top: 4px;
  }

  .btn-store, .btn-features {
    background: transparent;
    border: 1px solid var(--color-border-card);
    color: var(--color-accent);
    font-size: 0.8rem;
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    transition: border-color 150ms ease, color 150ms ease;
    cursor: pointer;
  }

  .btn-store:hover, .btn-features:hover {
    border-color: var(--color-accent);
    color: var(--color-text-primary);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AppCard.astro
git commit -m "feat: add AppCard component with accent header bar"
```

---

## Task 9: Hero component

**Files:**
- Create: `src/components/Hero.astro`

Note: This component references `/assets/images/headshot.png`. Eric needs to add that file to `public/assets/images/headshot.png` before the photo appears. Until then it will show a placeholder circle.

- [ ] **Step 1: Create Hero**

```astro
---
// src/components/Hero.astro
---
<section class="hero" id="home">
  <div class="container hero-inner">
    <div class="hero-text">
      <span class="hero-tag">iOS Developer</span>
      <h1 class="hero-name">Eric Savoie</h1>
      <p class="hero-tagline">Building iOS apps one experiment at a time.</p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-num">12</span>
          <span class="stat-label">Apps shipped</span>
        </div>
        <div class="stat">
          <span class="stat-num">6+</span>
          <span class="stat-label">Tech stacks</span>
        </div>
      </div>
    </div>
    <div class="hero-photo">
      <img src="/assets/images/headshot.png" alt="Eric Savoie" width="120" height="120" />
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 5rem 0 4rem;
    border-bottom: 1px solid var(--color-border);
  }

  .hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .hero-tag {
    display: inline-block;
    background: var(--color-surface-raised);
    color: var(--color-accent);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    letter-spacing: 0.05em;
    width: fit-content;
  }

  .hero-name {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.05;
    color: var(--color-text-primary);
  }

  .hero-tagline {
    font-size: 1.1rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
    max-width: 420px;
  }

  .hero-stats {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .stat {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 8px 14px;
    text-align: center;
  }

  .stat-num {
    display: block;
    color: var(--color-accent);
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
  }

  .stat-label {
    display: block;
    color: var(--color-text-secondary);
    font-size: 0.7rem;
    margin-top: 2px;
  }

  .hero-photo img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-surface-raised);
    /* Placeholder style if image missing */
    background: var(--color-surface-raised);
  }

  @media (max-width: 600px) {
    .hero-inner {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
    .hero-photo img {
      width: 80px;
      height: 80px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component"
```

---

## Task 10: Home page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create the home page**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import AppCard from '../components/AppCard.astro';
import Footer from '../components/Footer.astro';
import { apps } from '../data/apps';
---
<Layout
  title="Eric Savoie | iOS Developer & App Builder"
  description="Eric Savoie builds iOS apps across productivity, finance, AI, and utilities. Explore shipped App Store projects."
  canonicalUrl="https://savoie.app/"
>
  <Navbar />
  <Hero />
  <main>
    <section id="apps" class="apps-section">
      <div class="container">
        <h2 class="section-title">Live on the App Store</h2>
        <p class="section-subtitle">Apps currently available for download</p>
        <div class="apps-grid">
          {apps.map(app => <AppCard app={app} />)}
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>

<style>
  .apps-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .section-subtitle {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
    margin-bottom: 2.5rem;
  }

  .apps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 900px) {
    .apps-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 560px) {
    .apps-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Verify the home page in dev server**

Run `npm run dev`, open `http://localhost:4321`.
Check:
- Dark slate background loads (no white flash)
- Navbar shows "Eric Savoie" + Apps + Privacy links
- Hero section shows name, tagline, stats, and a placeholder circle (or headshot if Eric has added the file)
- All 12 app cards render with accent header bars
- Tech tags appear on apps that have them
- App Store buttons are present
- No console errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: home page with hero and app grid"
```

---

## Task 11: Writing section scaffold

**Files:**
- Create: `src/content/config.ts`
- Create: `src/pages/writing/index.astro`

- [ ] **Step 1: Define the writing content collection**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
  }),
});

export const collections = { writing };
```

- [ ] **Step 2: Create the writing index page (empty state)**

```astro
---
// src/pages/writing/index.astro
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/Navbar.astro';
import Footer from '../../components/Footer.astro';
---
<Layout
  title="Writing | Eric Savoie"
  description="Notes and write-ups from Eric Savoie."
  canonicalUrl="https://savoie.app/writing/"
>
  <Navbar />
  <main>
    <div class="container writing-container">
      <h1>Writing</h1>
      <p class="empty">Nothing here yet — check back soon.</p>
    </div>
  </main>
  <Footer />
</Layout>

<style>
  .writing-container {
    padding: 4rem 0;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    letter-spacing: -0.5px;
  }
  .empty {
    color: var(--color-text-secondary);
    font-size: 1rem;
  }
</style>
```

- [ ] **Step 3: Verify writing page at `http://localhost:4321/writing/`**

Expected: dark page with "Writing" heading and "Nothing here yet" message. No errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/pages/writing/index.astro
git commit -m "feat: writing section scaffold"
```

---

## Task 12: Build check and local sign-off

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: completes with no errors. `dist/` folder is created.

- [ ] **Step 2: Preview the production build locally**

```bash
npm run preview
```
Open `http://localhost:4321`. Verify:
- Home page renders correctly in the preview build
- All 12 app cards load with icons
- `http://localhost:4321/writing/` loads
- `http://localhost:4321/legal/privacy-policy.html` loads (served from `public/`)
- `http://localhost:4321/apps/fast-simple-invoice-maker/` loads
- `http://localhost:4321/poker-timer/` loads

**STOP HERE.** Show the preview to Eric and get sign-off before proceeding to deployment tasks.

---

## Task 13: GitHub Actions deploy workflow

**Prerequisite:** Eric has reviewed and approved the local preview.

**Files:**
- Create: `.github/workflows/deploy.yml`

Before this task, you also need to enable GitHub Pages with the "GitHub Actions" source in the repo settings:
`https://github.com/EricSavoie119/ericsavoie119.github.io/settings/pages` → Source: **GitHub Actions**

- [ ] **Step 1: Create the workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 2: Commit and push**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: GitHub Actions deploy to GitHub Pages"
git push origin main
```

- [ ] **Step 3: Verify the Actions workflow runs**

Go to `https://github.com/EricSavoie119/ericsavoie119.github.io/actions`.
Expected: "Deploy to GitHub Pages" workflow runs and passes. Both `build` and `deploy` jobs go green.

- [ ] **Step 4: Verify live site**

Open `https://savoie.app`. Expected: new Slate & Moss site is live.

---

## Task 14: Clean up old files

**Prerequisite:** Live site at savoie.app is confirmed working.

- [ ] **Step 1: Remove old root-level HTML and asset files**

```bash
rm -f index.html privacy-policy.html terms.html sitemap.xml
rm -rf assets/ apps/ legal/ scripts/ _disabled_assets_backup/ gradientswell.json
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
```
Expected: no errors. All content comes from `src/` and `public/`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old plain HTML files now that Astro is live"
git push origin main
```
