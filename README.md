# Sergio Marquez - Personal Portfolio

> **Bilingual (ES/EN) portfolio with a builder personal brand (Claude Code / AI agents) — "Agentic Console" terminal aesthetic, built with Astro and Tailwind CSS**

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)](https://pagespeed.web.dev/)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100%2F100-brightgreen)](https://pagespeed.web.dev/)
[![CI](https://github.com/sergiomarquezdev/sergiomarquez-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/sergiomarquezdev/sergiomarquez-dev/actions/workflows/ci.yml)

Source code for my **personal portfolio**, positioned as a builder working with Claude Code, AI agents, and agentic / spec-driven development (with a backend-of-truth track record). The UI adopts an "Agentic Console" terminal aesthetic. Built with Astro 5 (SSG) + Tailwind v4, fully driven by `public/cv.{es,en}.json`.

Live Site: [sergiomarquez.dev](https://sergiomarquez.dev)

---

## Design system

Dark theme with lime (`#A3E635`) accent — distinctive in a sea of blue AI sites. Three-font typography system:

| Role | Family | Use |
|---|---|---|
| Display | **Instrument Serif** | Hero headline, section titles |
| Body / UI | **Geist Variable** | Paragraphs, navigation, labels |
| Mono | **JetBrains Mono Variable** | Shell prompts (`~ % cat …`), window chrome, command palette, KPIs, code, dates |

All design tokens are CSS custom properties in [`src/styles/global.css`](./src/styles/global.css). Backwards-compat aliases preserved (`--background`, `--primary-text`, etc.) so legacy components keep working during migration.

---

## Key Features

- **Bilingual (i18n)**: Full ES/EN support with automatic locale detection, language switcher and hreflang tags.
- **Data-driven content**: All sections rendered from `public/cv.{es,en}.json`. Optional brand fields (`metrics`, `kpis`, `headline`, `writing`, `featured`) are validated for parity in tests.
- **Hero section**: Terminal-window session (window chrome + `whoami`/`cat ~/.now`/`ls ./proof` prompts), Geist display headline with Instrument Serif italic lime accent and blinking caret, animated `DotGrid` canvas (vanilla, <1KB, respects `prefers-reduced-motion`), stack chips and CTAs.
- **Command palette (`⌘K`)**: Accessible `<dialog>` opened with `⌘/Ctrl+K`, `/`, or a discoverable `⌘K` chip — jumps to sections, opens links, toggles locale, copies email. Optional/progressive: everything is also reachable via normal scroll and links, so no user is blocked (no REPL).
- **Impact Bar**: Four production metrics in mono lime — cost, validation rate, time saved, latency. Pulled from `cv.metrics`.
- **Cases (replaces flat Experience timeline)**: Each work entry is a card with KPI badges front-and-center, headline in serif and arrow-marker bullets.
- **Projects**: Featured project gets a large card with KPI and lime accent border; secondary projects in a responsive grid.
- **Writing & Presence**: Consolidated grid of blog + social channels (YouTube, LinkedIn, X, TikTok, blog) with platform icon, handle and one-line description.
- **CTA Footer**: Full-width "¿Construimos algo con agentes?" — serif headline + lime button + socials.
- **Sidebar layout** (desktop): Sticky left console panel with name (serif), `$ whoami` + tagline comment, GitHub activity, `cd ~/<section>` scroll-spy command nav, `⌘K` chip and social links. Right sidebar shows vertical email.
- **Mobile bottom nav**: Sticky bar with icons, scroll-spy and safe-area support.
- **Spotlight effect**: Subtle cursor-tracking radial gradient.
- **GitHub activity widget**: Latest commit fetched at build time from GitHub Events API.
- **Accessibility**: Skip links, ARIA labels, keyboard nav, `prefers-reduced-motion` support, focus-visible with lime outline.
- **SEO**: Canonical URLs, hreflang alternates, JSON-LD `Person` schema, OG/Twitter cards, sitemap, PWA manifest.
- **Vanity redirects**: `/linkedin`, `/github`, `/x`, `/twitter`, `/youtube`, `/yt`, `/blog`, `/tiktok` → external profiles.
- **Performance**: Lighthouse 95+ on every metric. Static output, compressed HTML, CSS minification via lightningcss.

---

## Tech Stack

- **[Astro](https://astro.build/) ^5.16.0** -- Static site generator with i18n routing
- **[Tailwind CSS](https://tailwindcss.com/) ^4.1.17** -- Utility-first CSS framework (via Vite plugin)
- **[TypeScript](https://www.typescriptlang.org/)** -- Type-safe JavaScript
- **[Vitest](https://vitest.dev/) ^4.0.18** -- Unit testing framework
- **[lightningcss](https://lightningcss.dev/)** -- CSS minification
- **[non.geist](https://vercel.com/font/sans)** -- Modern typography (Geist Variable)
- **[Biome](https://biomejs.dev/)** -- Fast linting and formatting
- **[Bun](https://bun.sh/)** -- Preferred package manager (local dev)
- **[Cloudflare Pages](https://pages.cloudflare.com/)** -- Hosting & CDN (uses `npm ci`)

---

## Project Structure

```
sergiomarquez-dev/
├── .github/workflows/ci.yml     # GitHub Actions CI pipeline
├── .husky/                      # Git hooks (pre-commit via lint-staged)
├── .vscode/                     # Shared VS Code settings & extensions
├── docs/
│   └── ARCHITECTURE.md          # Architecture documentation
├── public/                      # Static assets served as-is
│   ├── ads.txt                  # Google AdSense verification
│   ├── cv.es.json               # Portfolio data (Spanish)
│   ├── cv.en.json               # Portfolio data (English)
│   ├── manifest.webmanifest     # PWA manifest
│   ├── og-image.svg
│   ├── Profile.pdf              # Downloadable resume
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── BaseHead.astro       # Meta tags, hreflang, JSON-LD
│   │   ├── Certifications.astro
│   │   ├── Experience.astro
│   │   ├── GitHubActivity.astro # Live latest commit widget
│   │   ├── HomePage.astro       # Section composition
│   │   ├── LanguageSwitcher.astro
│   │   ├── Projects.astro
│   │   ├── Spotlight.astro      # Cursor-tracking spotlight effect
│   │   ├── icons/               # SVG icon components (Link, Lock, User, Briefcase, Code, Award, GitHub, etc.)
│   │   └── layout/              # Layout sub-components
│   │       ├── Footer.astro     # CTA + copyright footer
│   │       ├── MainContent.astro
│   │       ├── MobileNav.astro  # Bottom nav bar with scroll-spy
│   │       ├── Navigation.astro # Scroll-spy sidebar nav
│   │       ├── SidebarLeft.astro
│   │       ├── SidebarRight.astro
│   │       └── SocialLinks.astro
│   ├── data/
│   │   ├── cv.ts                # Typed loader + locale cache for cv JSON
│   │   ├── github.ts            # GitHub Events API client
│   │   └── __tests__/           # Unit tests (cv, github)
│   ├── i18n/
│   │   └── index.ts             # Locale config, translation dict, helpers
│   ├── layouts/
│   │   └── Layout.astro         # Base layout (sidebar + mobile header)
│   ├── pages/
│   │   ├── index.astro          # Home page (ES, default locale)
│   │   ├── en/index.astro       # Home page (EN)
│   │   ├── linkedin/index.astro # Vanity redirect pages
│   │   ├── github/index.astro
│   │   ├── x/index.astro
│   │   ├── twitter/index.astro
│   │   ├── youtube/index.astro
│   │   ├── yt/index.astro
│   │   └── blog/index.astro
│   └── styles/
│       └── global.css           # Design tokens, animations, print styles
├── astro.config.mjs
├── tailwind.config.ts           # Bridges CSS custom properties to Tailwind
├── vitest.config.ts
├── biome.json
├── CLAUDE.md
├── AGENTS.md
├── CHANGELOG.md
└── package.json
```

---

## Quick Start

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **[Bun](https://bun.sh/)** (recommended) or **npm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sergiomarquezdev/sergiomarquez-dev.git
   cd sergiomarquez-dev
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

   - Spanish (default): `http://localhost:4321/`
   - English: `http://localhost:4321/en/`
   - Hot reload enabled for instant feedback

---

## Available Scripts

```bash
# Development
bun run dev            # Start development server with hot reload
bun run build          # Create production build
bun run preview        # Preview production build locally

# Quality checks
bun run type-check     # TypeScript validation with Astro
bun run lint           # Biome linting
bun run lint:fix       # Auto-fix linting issues
bun run format         # Auto-format with Biome
bun run format:check   # Check formatting without modifying

# Testing
bun run test           # Run unit tests (Vitest)
bun run test:watch     # Run tests in watch mode

# Full validation (mandatory before committing)
bun run validate       # type-check + lint + test + build
```

---

## Development Workflow

1. Update content in `public/cv.es.json` / `public/cv.en.json` or tweak components.
2. Test locally with `bun run dev` -- check both `/` (ES) and `/en/` (EN).
3. Run `bun run validate` to ensure everything passes.
4. Commit changes (pre-commit hook runs lint-staged on `src/`).
5. Push to `main` -- Cloudflare Pages builds and deploys automatically.

---

## Performance & SEO

- **Lighthouse**: 95+ performance, 100/100 SEO
- **Sitemap**: Generated automatically via `@astrojs/sitemap` with i18n support
- **Hreflang**: `<link rel="alternate">` tags for ES, EN, and x-default
- **Structured data**: JSON-LD Person schema via `BaseHead.astro`
- **Canonical URLs**: Per-page canonical links
- **PWA manifest**: `manifest.webmanifest` for installability
- **Fast delivery**: Static output served from Cloudflare Pages CDN

---

## Contact

**Sergio Marquez**
_AI Engineer -- agentic AI & RAG systems in production on GCP_

- Website: [sergiomarquez.dev](https://sergiomarquez.dev)
- Email: [contacto@sergiomarquez.dev](mailto:contacto@sergiomarquez.dev)
- LinkedIn: [sergiomarquezp](https://www.linkedin.com/in/sergiomarquezp/)
- GitHub: [sergiomarquezdev](https://github.com/sergiomarquezdev)
- X (Twitter): [@sergiomarquezp\_](https://x.com/sergiomarquezp_)
- YouTube: [@sergiomarquezp](https://www.youtube.com/@sergiomarquezp)

---

<div align="center">

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>
