# Architecture

Technical architecture of the sergiomarquez.dev portfolio site.

## Data Flow

```
public/cv.{es,en}.json
        |
        v
src/data/cv.ts
  loadCv(locale)          -- reads JSON from disk at build time
  cvCache                 -- pre-loads all locales into a Record<Locale, CvData>
  getCv(locale): CvData   -- returns cached data for a locale
  cv: CvData              -- default export (es) for backward compat (redirect pages)
        |
        v
src/pages/{index,en/index}.astro
  getLocale(Astro.currentLocale) -> locale
  getCv(locale) -> cv
        |
        v
src/components/HomePage.astro
  Receives full CvData, destructures into sections
        |
        v
About / Experience / Projects / Certifications
  Each receives its slice of CvData as props
```

The data layer is pure functions with no side effects after initial load, making it fully testable without Astro runtime.

## Component Tree

```
Layout.astro
├── BaseHead.astro              -- <head>: meta, hreflang, JSON-LD, OG tags
├── LanguageSwitcher.astro      -- mobile language toggle (visible < 1024px)
├── Spotlight.astro             -- cursor-tracking radial gradient overlay
├── mobile-header               -- inline in Layout (visible < 1024px)
├── layout/SidebarLeft.astro    -- sticky left column (visible >= 1024px)
│   ├── GitHubActivity.astro    -- latest commit widget
│   ├── layout/Navigation.astro -- scroll-spy nav links
│   ├── layout/SocialLinks.astro
│   └── LanguageSwitcher.astro  -- desktop language toggle
├── layout/MainContent.astro    -- <main> wrapper with max-width
│   └── <slot />                -- page content injected here
│       └── HomePage.astro
│           ├── About.astro
│           ├── Experience.astro
│           ├── Projects.astro
│           └── Certifications.astro
└── layout/SidebarRight.astro   -- email link (visible >= 1024px)
```

The `layout/` subdirectory contains structural components (sidebars, nav, main content wrapper). Top-level components in `components/` are content-oriented sections.

## i18n Strategy

### Routing

Configured in `astro.config.mjs`:
- `prefixDefaultLocale: false` -- Spanish at `/`, English at `/en/`
- `src/pages/index.astro` and `src/pages/en/index.astro` are intentionally identical files
- Astro injects different `currentLocale` per route automatically

### Translation

- `src/i18n/index.ts` exports a `ui` dictionary keyed by locale
- `t(locale, key)` returns translated strings for UI labels, SEO text, ARIA labels
- Content translations live in the JSON files (`cv.es.json`, `cv.en.json`), not in the `ui` dict
- Separation: `ui` dict = interface chrome, JSON files = portfolio content

### Locale Detection

In `Layout.astro`, an inline script runs on first visit:
1. Checks `localStorage` for `preferred-locale`
2. If not set, checks `navigator.language`
3. English speakers on `/` get redirected to `/en/`
4. Preference stored in `localStorage` for subsequent visits

### Hreflang

`BaseHead.astro` emits three `<link rel="alternate">` tags:
- `hreflang="es"` pointing to `/`
- `hreflang="en"` pointing to `/en/`
- `hreflang="x-default"` pointing to `/` (Spanish as fallback)

## Design System

### CSS Custom Properties (Single Source of Truth)

Defined in `src/styles/global.css` under `:root`:
- Color palette: `--background`, `--primary-text`, `--secondary-text`, `--tertiary-text`, `--accent`, `--accent-muted`, `--accent-hover`, `--navy-light`, `--navy-lighter`, `--border-color`
- Typography: Modular scale (Major Third, ratio 1.25) via `--text-xs` through `--text-3xl`
- Vertical rhythm: `--base-lh: 1.5`, `--rhythm: calc(1rem * var(--base-lh))`
- Measure: `--measure: 66ch` for prose readability
- Spotlight: `--spotlight-color`, `--mouse-x`, `--mouse-y`
- Font: `--font-family-sans: "Geist Variable", system-ui, sans-serif`

### Tailwind Bridge

`tailwind.config.ts` maps CSS custom properties to Tailwind utility classes:
```ts
colors: {
  background: "var(--background)",
  accent: "var(--accent)",
  // ...
}
```

This keeps CSS custom properties as the single source of truth while enabling Tailwind utilities in templates.

### Scoped Styles

Each `.astro` component uses `<style>` blocks for component-specific styles. Global styles (animations, print, base resets) live in `global.css`.

## Testing Strategy

### What is Tested

- **cv.ts**: Structure validation across locales, locale parity checks, default export behavior (see `src/data/__tests__/cv.test.ts`)
- **github.ts**: SHA truncation, message truncation/ellipsis, multi-line handling, repo name extraction, error/null handling, event filtering (see `src/data/__tests__/github.test.ts`)

### Why These

Both modules are pure functions with clear inputs/outputs -- ideal for unit testing. They contain the transformation logic (truncation, parsing, caching) that is most likely to regress.

### What is Not Tested (and Why)

- **Astro components**: Require browser/DOM environment. Astro's rendering pipeline is covered by the build step in `bun run validate`.
- **i18n/index.ts**: Pure lookup table with TypeScript enforcement. Type errors catch missing keys at compile time.
- **Redirect pages**: 7 trivial files that return 301 responses. Verified by build success.

### Test Utilities

`assertDefined<T>()` is defined locally in `github.test.ts` to satisfy Biome's `noNonNullAssertion` rule without using `!` assertions. Not extracted to a shared utility -- single consumer, YAGNI.

## Build & Deploy

### Local Development

- **Bun** as package manager and script runner
- `bun run dev` starts Astro dev server at `localhost:4321`
- `bun run validate` runs the full pipeline: type-check + lint + test + build

### CI (GitHub Actions)

`.github/workflows/ci.yml` runs on push/PR to `main`:
1. Checkout + setup Bun
2. `bun install`
3. `bun run type-check`
4. `bun run lint`
5. `bun run test`
6. `bun run build`

### Production (Cloudflare Pages)

- Builds from `main` branch using `npm ci` (not Bun)
- Both `bun.lockb` and `package-lock.json` must be kept in sync
- `"prepare": "husky || true"` prevents CI failure from missing git hooks

### Pre-commit Hooks

- Husky + lint-staged
- Runs `biome check --write` on staged files in `src/` only
- Scoped to avoid linting lockfiles and root config files

## Design Decisions

### Why No Content Collections

Astro Content Collections are designed for Markdown/MDX content with frontmatter. The CV data is structured JSON served as static assets from `public/`. Using Content Collections would add unnecessary abstraction for a single JSON file per locale.

### Why Manual Redirect Pages

There are 7 redirect pages (`/linkedin`, `/github`, `/x`, `/twitter`, `/youtube`, `/yt`, `/blog`). Each is a trivial `.astro` file returning a 301. Generating them from data would save ~50 lines but add indirection. YAGNI -- the manual approach is readable and maintainable at this scale.

### Why CSS Custom Properties Over Tailwind Theme

CSS custom properties in `global.css` serve as the canonical design tokens. Tailwind's `tailwind.config.ts` bridges them into utility classes. This means:
- Design tokens are readable without knowing Tailwind
- Scoped `<style>` blocks in Astro components can reference tokens directly
- Tailwind utilities remain available for rapid prototyping in templates
