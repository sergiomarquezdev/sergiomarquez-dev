# Sergio Marquez - Personal Portfolio

> **Bilingual (ES/EN) portfolio for a backend & AI engineer who builds his own projects: personal stationery in two inks, light first, built with Astro 7 and scoped vanilla CSS**

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-99%2B-brightgreen)](https://pagespeed.web.dev/)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100%2F100-brightgreen)](https://pagespeed.web.dev/)
[![CI](https://github.com/sergiomarquezdev/sergiomarquez-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/sergiomarquezdev/sergiomarquez-dev/actions/workflows/ci.yml)

Source code for my **personal portfolio**, for a **backend & AI engineer**: LLM systems in production on Google Cloud (agents, RAG, data) plus his own projects built with AI agents. The page reads like his printed stationery: the front of a business card, a letter sheet with the work, and the back of the card in a teal flood. Built with Astro 7 (SSG) and scoped vanilla CSS over design tokens, fully driven by `public/cv.{es,en}.json`. It ships no JavaScript of its own.

Live Site: [sergiomarquez.dev](https://sergiomarquez.dev)

---

## Design system

Light first, in the visual family of [One dAIly Blog](https://blog.sergiomarquez.dev) without copying it. Warm uncoated paper (`#fafaf9`), warm black ink, a **teal identity ink** (`#0d4b4d`) for the name, project and role names, and **coral only for state**: the monogram square, the email underline and hover/focus/active. Square corners, no shadows, no cards, no icons. A dark scheme follows `prefers-color-scheme` (no toggle); the teal footer flood is the same in both.

| Role | Family | Use |
|---|---|---|
| Sans | **Space Grotesk** (variable 300-700) | Name (700), headings and item names (600), all running text (400) |
| Serif | **Instrument Serif** (400, roman) | Only the headline statement, the About summary and the featured project headline |

Both fonts are self-hosted latin subsets in `public/fonts/` (version in the file name, served immutable) with metric-matched local fallbacks. There is no monospace.

All tokens (inks, type steps, 8px spacing module, motion) are CSS custom properties in [`src/styles/global.css`](./src/styles/global.css); it is the only file with color values or `prefers-color-scheme` (plus the two `theme-color` metas in `BaseHead.astro`).

---

## Key Features

- **Bilingual (i18n)**: ES at `/`, EN at `/en/`, language switcher as a plain link with `lang`/`hreflang`, and hreflang alternates. No automatic redirect by browser language.
- **Data-driven content**: every section renders from `public/cv.{es,en}.json`; interface strings live in `src/i18n/index.ts`. Key parity between locales is enforced by tests.
- **Front of the card** (first screen): name at display size, tagline, serif statement, and the contact block with the email as the main action plus the six channels (blog, LinkedIn, X, YouTube, TikTok, GitHub) with handle and description. Links work from the first viewport.
- **About, Projects, Experience**: headings hang in a margin column and stay pinned (`position: sticky`) while their section scrolls. One featured project, then an index of the rest. The current role shows all its highlights; earlier roles fold theirs into a native `<details>`. Certifications close the Experience section.
- **Back of the card** (footer, outside `<main>`): full-bleed teal flood with the email, the channel names and the language switch.
- **Links overprint**: on hover and focus a link turns coral and its underline goes from 1px to 2px in a two-frame step (`steps(2)`, 90 ms). No other motion; `prefers-reduced-motion` removes it.
- **Bilingual 404**: one static `404.html` (Cloudflare serves it for any path) with the message in Spanish and English, `noindex`, no canonical, hreflang or JSON-LD.
- **Accessibility**: skip link, landmarks, no heading skips, 2px coral focus ring, links at least 24px tall, content fully visible without JavaScript.
- **SEO**: canonical, hreflang (es, en, x-default), JSON-LD `ProfilePage` with `Person` as `mainEntity`, OG/Twitter cards, sitemap (redirects are never listed), PWA manifest and `apple-touch-icon`.
- **Vanity redirects**: `/linkedin`, `/github`, `/x`, `/twitter`, `/youtube`, `/yt`, `/blog`, `/tiktok` → external profiles, declared in `astro.config.mjs` (`redirects`) from `basics.urls` in `cv.es.json`. Static output emits a meta refresh page with `noindex` for each.
- **Performance**: inlined CSS, two preloaded font files, no client JavaScript, no build-time network calls, immutable caching for fonts (`public/_headers`).

---

## Tech Stack

- **[Astro](https://astro.build/) ^7.3.5** -- Static site generator with i18n routing
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) ^3.7.4** -- i18n sitemap generation
- **Scoped vanilla CSS** -- design tokens in `global.css` + a preflight-style reset (`reset.css`); no CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** -- Type-safe JavaScript
- **[Vitest](https://vitest.dev/) ^5.0.3** -- Unit testing framework
- **Fonts** -- [Space Grotesk](https://fontsource.org/fonts/space-grotesk) variable and [Instrument Serif](https://fontsource.org/fonts/instrument-serif) 400, latin subsets from Fontsource 5.3.0, self-hosted in `public/fonts/`
- **[Biome](https://biomejs.dev/)** -- Fast linting and formatting
- **[pnpm](https://pnpm.io/)** -- Package manager (local dev and Cloudflare Pages)
- **[Cloudflare Pages](https://pages.cloudflare.com/)** -- Hosting & CDN (builds with pnpm)

---

## Project Structure

```
sergiomarquez-dev/
├── .github/workflows/ci.yml     # GitHub Actions CI pipeline + CF Pages deploy hook
├── .github/dependabot.yml       # Monthly grouped GitHub Actions updates
├── .husky/                      # Git hooks (pre-commit via lint-staged)
├── .vscode/                     # Shared VS Code settings & extensions
├── docs/
│   ├── ARCHITECTURE.md          # Architecture documentation
│   └── archive/                 # Historical specs (shipped work), kept for reference
├── public/                      # Static assets served as-is
│   ├── _headers                 # Cloudflare headers: cache-control, CSP, HSTS and other security headers
│   ├── ads.txt                  # Google AdSense verification
│   ├── cv.es.json               # Portfolio data (Spanish)
│   ├── cv.en.json               # Portfolio data (English)
│   ├── fonts/                   # Space Grotesk + Instrument Serif (latin woff2, versioned names)
│   ├── favicon.ico / favicon.svg
│   ├── apple-touch-icon.png     # 180x180 iOS icon
│   ├── icon-192.{png,svg} / icon-512.png  # PWA icons
│   ├── manifest.webmanifest     # PWA manifest
│   ├── og-image.png / og-image.svg
│   ├── Profile.pdf              # Downloadable resume
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── BaseHead.astro       # Meta tags, preloads, manifest, hreflang, JSON-LD (noindex mode for 404)
│   │   ├── EmailLink.astro      # mailto link with a break opportunity after "@"
│   │   ├── HomePage.astro       # Section composition
│   │   ├── LanguageSwitcher.astro # Plain link to the other locale
│   │   ├── SergioMark.astro     # Path-based "S■M" monogram
│   │   ├── SiteHeader.astro     # Monogram + language switch
│   │   ├── SiteFooter.astro     # Back of the card: teal flood with email and channels
│   │   └── sections/            # Intro (front of the card), About, Projects, Experience
│   ├── data/
│   │   ├── cv.ts                # Typed loader + locale cache for cv JSON, getChannels()
│   │   └── __tests__/           # Unit tests (cv data)
│   ├── i18n/
│   │   └── index.ts             # Locale config, translation dict, helpers
│   ├── layouts/
│   │   └── Layout.astro         # Skip link, header, <main>, footer
│   ├── pages/
│   │   ├── index.astro          # Home page (ES, default locale)
│   │   ├── en/index.astro       # Home page (EN)
│   │   └── 404.astro            # Static bilingual 404 (noindex)
│   └── styles/
│       ├── global.css           # Tokens, @font-face, base type, links, focus, section grid
│       └── reset.css            # Preflight-style CSS reset (no framework)
├── astro.config.mjs
├── vitest.config.ts
├── biome.json
├── pnpm-workspace.yaml          # pnpm build-script approvals (esbuild, sharp)
├── CLAUDE.md                    # Agent instructions (AGENTS.md is a synced copy)
├── AGENTS.md
├── CHANGELOG.md
├── PRODUCT.md                   # Product context for design work (impeccable)
├── DESIGN.md                    # Design system derived from the build (sidecar: .impeccable/design.json)
├── SECURITY.md                  # Vulnerability reporting policy
└── package.json
```

---

## Quick Start

### Prerequisites

- **Node.js 24** (`.nvmrc` pins 24.18.0)
- **[pnpm](https://pnpm.io/)** (the project lockfile is `pnpm-lock.yaml`)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sergiomarquezdev/sergiomarquez-dev.git
   cd sergiomarquez-dev
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm run dev
   ```

   - Spanish (default): `http://localhost:4321/`
   - English: `http://localhost:4321/en/`
   - Hot reload enabled for instant feedback

---

## Available Scripts

```bash
# Development
pnpm run dev            # Start development server with hot reload
pnpm run build          # Create production build
pnpm run preview        # Preview production build locally

# Quality checks
pnpm run type-check     # TypeScript validation with Astro
pnpm run lint           # Biome linting
pnpm run lint:fix       # Auto-fix linting issues
pnpm run format         # Auto-format with Biome
pnpm run format:check   # Check formatting without modifying

# Testing
pnpm run test           # Run unit tests (Vitest)
pnpm run test:watch     # Run tests in watch mode

# Full validation (mandatory before committing)
pnpm run validate       # type-check + lint + test + build
```

---

## Development Workflow

1. Update content in `public/cv.es.json` / `public/cv.en.json` or tweak components.
2. Test locally with `pnpm run dev` -- check both `/` (ES) and `/en/` (EN).
3. Run `pnpm run validate` to ensure everything passes.
4. Commit changes (pre-commit hook runs lint-staged on `src/`).
5. Push to `main` -- CI runs lint/type-check/test/build, then triggers the Cloudflare Pages deploy hook.

> Note: pushes touching only Markdown, `docs/` or `.vscode/` skip CI and deploy (`paths-ignore` in `ci.yml`).

---

## Performance & SEO

- **Lighthouse / PageSpeed**: last measured before the 2026-10 redesign (99 mobile / 100 desktop performance); re-measure after deploy
- **Sitemap**: Generated automatically via `@astrojs/sitemap` with i18n support; redirects are never listed
- **Hreflang**: `<link rel="alternate">` tags for ES, EN, and x-default
- **Structured data**: JSON-LD `ProfilePage` (with `Person` as `mainEntity`) via `BaseHead.astro`
- **Canonical URLs**: Per-page canonical links
- **PWA manifest**: `manifest.webmanifest` for installability
- **Fast delivery**: Static output served from Cloudflare Pages CDN with immutable caching for fonts (`public/_headers`)

---

## Contact

**Sergio Marquez**
_Backend & AI Engineer -- agents, RAG and LLMs in production_

- Website: [sergiomarquez.dev](https://sergiomarquez.dev)
- Email: [contacto@sergiomarquez.dev](mailto:contacto@sergiomarquez.dev)
- LinkedIn: [sergiomarquezp](https://www.linkedin.com/in/sergiomarquezp/)
- GitHub: [sergiomarquezdev](https://github.com/sergiomarquezdev)
- X (Twitter): [@sergiomarquezp\_](https://x.com/sergiomarquezp_)
- YouTube: [@sergio\_marquezp](https://www.youtube.com/@sergio_marquezp)
- TikTok: [@sergio\_marquezp](https://www.tiktok.com/@sergio_marquezp)

---

<div align="center">

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>
