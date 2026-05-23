# Site Revamp Design Spec
**Date:** 2026-05-22

## Overview

Migrate ericsavoie119.github.io from plain HTML/CSS/JS to Astro, and redesign the visual layer from the current warm orange/peachy palette to Slate & Moss. The writing infrastructure comes for free with Astro's Markdown support — no blog link in the nav yet, but the plumbing is there when needed.

---

## Visual Design

### Palette — Slate & Moss (replaces all orange/peachy tones)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#1e2a27` | Page background |
| `--color-surface` | `#253530` | Card backgrounds |
| `--color-surface-raised` | `#2e4a3e` | Card header bars, tags |
| `--color-border` | `#2e3e3a` | Dividers, card borders |
| `--color-text-primary` | `#e8e0d0` | Headings, primary text |
| `--color-text-secondary` | `#7a9e8a` | Body copy, subtitles |
| `--color-accent` | `#7ac4a0` | Tags, stat numbers, links |
| `--color-nav-bg` | `#1a2522` | Navbar background |

No orange. No warm beige. All orange/red references in the current CSS are dropped.

### Typography

- Font: `-apple-system, BlinkMacSystemFont, sans-serif` (keep SF Pro, no Google Fonts dependency)
- Hero heading: 48–56px, weight 800, letter-spacing -1.5px
- Body: 16px, weight 400, line-height 1.6
- Labels/tags: 10–11px, uppercase, letter-spacing 0.1em

---

## Pages

### Home (`/`)

**Navbar**
- Dark (`#1a2522`) background, 1px bottom border
- Left: "Eric Savoie" wordmark
- Right: Apps, Writing (hidden for now), Privacy
- Sticky on scroll

**Hero section**
- Left: iOS Developer tag (pill), large name heading, one-line tagline, two stat chips (apps shipped, tech stacks learned)
- Right: Headshot (circular, 120px, moss green border) — Eric to provide headshot PNG at `/assets/images/headshot.png`
- No background image or texture — colour alone carries it

**Apps section**
- Section label: "Live on the App Store"
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Card style: Accent Header Bar
  - Header bar (`#2e4a3e`): app icon (80px, rounded) + app name + category subtitle
  - Body: description text, tech tags as pills, App Store button
  - Border: 1px `#3a5e50`, radius 12px
- Apps ordered by tech learned (most → least), same as current

**Footer**
- Minimal: © Eric Savoie + Privacy link

### Writing (`/writing/`)

- Not linked from nav yet
- Astro content collection of `.md` / `.mdx` files in `src/content/writing/`
- Index page lists posts (title, date, reading time)
- Post page: readable prose width (~680px), dark background, cream text
- Diagrams: embed as `<img>` (PNG exports from Excalidraw/draw.io) or inline Mermaid via an Astro integration
- No categories, no tags, no search — just a chronological list

### Other pages

- `/apps/fast-simple-invoice-maker/` — keep as-is, reskin to Slate & Moss
- `/legal/privacy-policy.html` → migrate to Astro page
- `/poker-timer/` — keep as-is, no reskin needed (standalone tool)

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Astro 4.x |
| Rendering | Static output (`output: 'static'`) |
| Hosting | GitHub Pages (existing CNAME `savoie.app`) |
| Styling | Plain CSS (no Tailwind) — existing CSS variables migrated to new palette |
| Writing | Astro content collections + `.md` files |
| Diagrams | PNG embeds or `astro-mermaid` integration |
| Deploy | GitHub Actions (`withastro/action`) |

---

## Migration Approach

The existing site is plain HTML. The migration is a port, not a rewrite — content moves, markup stays largely the same.

1. Scaffold a new Astro project inside the repo root, replacing `index.html` as the entry point
2. Create Astro components for: `Navbar`, `Footer`, `AppCard`, `Hero`, `Layout`
3. Port the home page app data from the inline JS template strings in `index.html` into an Astro data file (`src/data/apps.ts`)
4. Migrate CSS to new Slate & Moss palette — update variables, remove all orange/warm references
5. Set up GitHub Actions deploy to replace the current direct-push-to-main approach
6. Port `/apps/fast-simple-invoice-maker/` and `/legal/privacy-policy.html` to Astro pages
7. Create `/writing/` content collection scaffolding (empty index, no posts yet)
8. Verify CNAME and `output: 'static'` produce the same URL structure as before (no redirect breakage)

---

## Out of Scope

- No dark/light mode toggle (dark only)
- No search
- No CMS — all content is files in the repo
- No analytics changes
- Blog section deleted — content was AI-generated, not worth migrating
