# Writing and “Look Under the Hood” blueprint

Status: proposal only. Nothing in this document is wired into the site.

## The editorial idea

“Look Under the Hood” should be a recurring technical series written for developers who know the public API but want to understand the machinery beneath it.

The first sequence has a particularly clear audience:

> UIKit explained from the perspective of somebody who learned SwiftUI first.

Every article should give the reader:

1. a familiar SwiftUI starting point;
2. a UIKit equivalent they can build;
3. a side-by-side mental map;
4. one layer of underlying system behaviour;
5. a concrete next step.

This makes the series useful both as a tutorial and as a record of investigation.

## Split the original material

The source draft contains two strong articles that should not compete with each other.

### Part 1 — From `@main` to Hello World

Purpose: a practical, follow-along foundation.

Reader outcome: build a scene-based UIKit “Hello, world!” and understand the roles of `UIApplicationMain`, `AppDelegate`, `SceneDelegate`, `UIWindow`, `UIViewController`, and `UILabel`.

Keep:

- the SwiftUI starting point;
- the explanation of `@main`;
- the explicit `UIApplicationMain` call;
- the app delegate and scene delegate;
- the final UIKit label;
- a SwiftUI-to-UIKit mapping table.

Move out:

- assembly listings;
- address calculations;
- private SwiftUI symbol hunting;
- the extended symbolic-breakpoint detour.

Draft: `drafts/look-under-the-hood-01-how-swiftui-calls-uikit.md`

### Part 2 — Tracing SwiftUI’s launch path

Purpose: the first true under-the-hood investigation.

Reader outcome: learn a repeatable debugging method, not merely a list of private symbols.

Suggested structure:

1. State the question: “How does an `App` become a window?”
2. Add a breakpoint on `UIApplicationMain`.
3. Capture and annotate the stack trace.
4. Trace `App.main()` and `runApp()`.
5. Identify the private app and scene delegates.
6. Follow scene connection to the host window.
7. Separate observed implementation detail from supported API.
8. End with the recovered launch chain.

Provisional title: **Following SwiftUI from `App.main()` to `UIWindow`**

## Series runway

The series can grow without locking the site into a narrow UIKit-only label.

1. **How does SwiftUI call UIKit?** — entry point, scenes, windows.
2. **Following SwiftUI from `App.main()` to `UIWindow`** — LLDB and private implementation.
3. **A SwiftUI `View` is not a `UIView`** — value descriptions, view hierarchies, hosting.
4. **From `VStack` to Auto Layout** — layout negotiation and constraints.
5. **From `@State` to targets, actions, and delegates** — event flow and ownership.
6. **View lifecycle from a SwiftUI perspective** — identity, updates, and view-controller callbacks.

## Proposed path through the site

Use “Writing” everywhere in the interface. Avoid mixing “Blog,” “Notes,” and “Articles.”

```text
Home
├── global navigation: Writing
└── latest writing section
    └── featured Look Under the Hood card
        ↓
/writing/
├── series introduction
└── article card
    ↓
/writing/look-under-the-hood/how-swiftui-calls-uikit/
```

Recommended canonical URL:

`/writing/look-under-the-hood/how-swiftui-calls-uikit/`

Do not include `part-1` in the slug. Titles and series order may evolve; the subject is the stable identifier.

### Homepage

Add “Writing” to the global navigation beside “Apps.”

Below the apps section, add a restrained **Latest writing** section with one featured card. The homepage should preview the writing, not become the full archive.

Card content:

- eyebrow: `LOOK UNDER THE HOOD · 01`
- title: `How does SwiftUI call UIKit?`
- summary: `Rebuilding a SwiftUI app launch in UIKit, one hidden piece at a time.`
- metadata: `9 min read · SwiftUI · UIKit`
- action: `Read article →`

### Writing landing page

Replace the empty state with:

- heading: `// Writing`
- one-sentence promise: “Notes on iOS engineering, shipped products, and what sits beneath the abstractions.”
- a featured series block for Look Under the Hood;
- article cards ordered newest first.

With one article, use a single generous feature row instead of a sparse three-column grid.

### Article page

Provide:

- breadcrumb: `Writing / Look Under the Hood / Part 1`;
- series label and part number;
- title, subtitle, topics, and reading time;
- a narrow reading column;
- optional sticky table of contents only on wide screens and only for long articles;
- “What you’ll build” near the top;
- code blocks with filenames and a copy action;
- mapping tables and small flow diagrams;
- previous/next series navigation;
- a bottom link back to all writing.

## Native visual direction

The current live Astro design—not the older design-system document—is the visual source of truth.

Existing site language:

- JetBrains Mono throughout;
- off-white `#F9F9FB` background;
- charcoal `#22252A` navigation and primary text;
- crimson `#C51B29` accent;
- thin `#E2E5EA` borders;
- compact type and `//` prefixes;
- simple 12px cards with little decoration.

The writing section should extend that language:

- use `//` for section labels and crimson for series markers;
- use charcoal code blocks with a thin crimson top rule;
- keep cards flat and bordered rather than heavily shadowed;
- set article body text at roughly 17–18px with a 1.75 line height;
- limit the prose column to approximately 720px;
- let code and diagrams expand to approximately 900px when helpful;
- keep technical metadata small and muted;
- use the same navbar, footer, spacing rhythm, and breakpoints as the rest of the site.

Avoid generic blog styling: large centred hero text, tag clouds, emoji reading-time markers, gradients, and unrelated blue link colours would feel imported rather than native.

## Article page sketch

```text
┌─────────────────────────────────────────────────────────────┐
│ ES                                      Apps  Writing  Privacy│
├─────────────────────────────────────────────────────────────┤
│ Writing / Look Under the Hood / Part 1                      │
│                                                             │
│ // LOOK UNDER THE HOOD · 01                                 │
│ How does SwiftUI call UIKit?                                │
│ Rebuilding a SwiftUI app launch in UIKit,                   │
│ one hidden piece at a time.                                 │
│ 9 min read · SwiftUI · UIKit                                │
│                                                             │
│ ┌─ WHAT YOU'LL BUILD ─────────────────────────────────────┐ │
│ │ @main App → UIApplicationMain → SceneDelegate → UIWindow│ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                  narrow reading column                       │
│  Why this series                                             │
│  prose…                                                      │
│                                                              │
│  // swift · AppDelegate.swift                Copy            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ final class AppDelegate…                               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  SwiftUI-to-UIKit map                                        │
│  ┌──────────────────┬─────────────────────────────────────┐  │
│  │ @main            │ main.swift                          │  │
│  └──────────────────┴─────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ Next: Following SwiftUI from App.main() to UIWindow →        │
└─────────────────────────────────────────────────────────────┘
```

## Content model when implementation begins

Astro content collections are a natural fit. Suggested frontmatter:

```yaml
title: "How does SwiftUI call UIKit?"
description: "Rebuilding a SwiftUI app launch in UIKit, one hidden piece at a time."
publishedAt: 2026-00-00
updatedAt:
series: look-under-the-hood
seriesTitle: Look Under the Hood
seriesPart: 1
topics:
  - SwiftUI
  - UIKit
draft: true
```

Suggested future structure:

```text
src/
├── content/
│   └── writing/
│       └── how-swiftui-calls-uikit.md
├── components/
│   └── writing/
│       ├── ArticleCard.astro
│       ├── ArticleHeader.astro
│       ├── CodeBlock.astro
│       └── SeriesNavigation.astro
└── pages/
    └── writing/
        ├── index.astro
        └── [...slug].astro
```

This is an implementation direction only. The current draft remains outside `src` and is not part of the site build.

## Publication checklist

- Test every code sample in a clean Xcode project.
- Add version labels for Xcode, Swift, and iOS.
- Use only public APIs in the tutorial path.
- Label private-symbol observations as implementation details.
- Provide meaningful alt text for screenshots and diagrams.
- Check code blocks at 320px viewport width.
- Add Article structured data and social-card metadata.
- Link each part both forward and backward.
- Add the article URL to the sitemap only when published.
- Keep the draft flag on until screenshots, sample code, and technical review are complete.
