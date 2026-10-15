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
  getChannels(cv)         -- writing.channels in order, href from basics.urls[platform],
                             label from a constant map (Blog, LinkedIn, X, YouTube, TikTok, Instagram, GitHub)
  getChannelGroups(cv)    -- channels bucketed by platform into blog / video / profiles (fixed order),
                             with a shared description only when every member has the same one
  groupProjects(projects) -- projects bucketed by their `group` (PROJECT_GROUPS order), featured first
  groupByCompany(exp)     -- consecutive roles at one company under one heading; first role is current
  projectHref(project)    -- public url, else first repo unless private
  displayUrl(href)        -- URL without scheme or trailing slash, for running text
        |
        v
src/pages/{index,en/index}.astro
  getLocale(Astro.currentLocale) -> locale
  getCv(locale) -> cv
        |
        v
src/components/HomePage.astro
  Composes the sections, each with its slice of CvData as props
        |
        v
sections/Intro / sections/About / sections/Projects / sections/Experience
  (SiteHeader and SiteFooter read getCv(locale) themselves from Layout)
```

The data layer is pure functions with no side effects after initial load, making it fully testable without Astro runtime. Logic that shapes the data for a section (grouping, link choice) lives here, not in the `.astro` frontmatter, so it is covered by unit tests; components only render. Interface strings (section names, labels, 404 copy, SEO title and description) come from `t(locale, key)` in `src/i18n/index.ts`; components hold no hardcoded copy and no `locale === "en" ? … : …` ternaries (the other locale comes from `otherLocale(locale)`).

## Component Tree

```
Layout.astro                    -- <html lang>, skip link, header, <main id="main">, footer
├── BaseHead.astro              -- <head>: preloads, meta, manifest, canonical, hreflang, OG/Twitter,
│                                  JSON-LD (ProfilePage with url, inLanguage, image; Person as mainEntity)
│                                  (`noindex` prop: robots noindex, no canonical/hreflang/JSON-LD)
├── SiteHeader.astro
│   ├── SergioMark.astro        -- "S■M" monogram, letters in currentColor, square in --mark
│   └── LanguageSwitcher.astro  -- plain link to the other locale (lang + hreflang)
├── <main id="main">
│   └── <slot />
│       └── HomePage.astro
│           ├── sections/Intro.astro       -- front of the card: h1 name, tagline, statement, contact block
│           │                                 (EmailLink)
│           ├── sections/About.astro       -- summary in serif
│           ├── sections/Projects.astro    -- projects by group, featured leading its group + GitHub link
│           └── sections/Experience.astro  -- roles grouped by company (current open, earlier in <details>)
│                                             + certifications
└── SiteFooter.astro            -- back of the card (outside <main>): teal flood, email (EmailLink),
                                   channels, LanguageSwitcher, copyright
```

`sections/` holds the home-page content sections; the top level of `components/` holds the shared pieces (`BaseHead`, `SiteHeader`, `SiteFooter`, `LanguageSwitcher`, `SergioMark`, `EmailLink`, `HomePage`). There are no client scripts: the only `<script>` in the output is the JSON-LD block.

### Heading outline

`h1` = name (404: "404", plus a visually hidden message in both languages). `h2` = About, Projects, Experience, and the footer "Contact". Projects use `h3` for each group head and `h4` for every project name; Experience uses `h3` for the company and for "Certifications", `h4` for each role.

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

### No automatic language redirect

There is no locale detection script. Every visitor (and every crawler) gets the URL they asked for; the switcher in the header and the footer links to the other locale's home with `lang` and `hreflang`. Google advises against redirecting by browser language, and the old inline redirect sent any English browser, Googlebot included, from `/` to `/en/`.

### Hreflang

`BaseHead.astro` emits three `<link rel="alternate">` tags:
- `hreflang="es"` pointing to `/`
- `hreflang="en"` pointing to `/en/`
- `hreflang="x-default"` pointing to `/` (Spanish as fallback)

## Design System

### Tokens (single source of truth)

Defined in `src/styles/global.css` under `:root`, redefined for dark under `@media (prefers-color-scheme: dark)` in the same block. No other file sets colors or reads the color scheme (except the two `theme-color` metas in `BaseHead.astro`).

- Inks: `--paper`, `--ink`, `--ink-2`, `--teal` (identity), `--accent` / `--accent-strong` (state only: hover, focus, active, email underline), `--mark` (monogram square only, never text or focus), `--rule`
- Flood (footer, same in both schemes): `--flood`, `--flood-ink`, `--flood-ink-2`, `--flood-accent`. `SiteFooter` re-points `--ink`, `--ink-2` and `--accent` at the flood tokens, so every state inside it re-inks without extra rules.
- Type: `--font-sans` (Space Grotesk), `--font-serif` (Instrument Serif), fluid steps `--step--1` … `--step-4`, line heights, tracking, `--measure: 62ch`
- Space: 8px module (`--s-1` … `--s-8`), `--section`, `--gutter`, `--container: 72rem`
- Shape and motion: `--radius: 0`, `--step-motion: 90ms steps(2, jump-none)`

### Fonts

Two files in `public/fonts/` (Space Grotesk variable, Instrument Serif 400; latin subset, Fontsource 5.3.0, version in the file name because `/fonts/*` is served immutable), declared with `@font-face` in `global.css` and preloaded in `BaseHead.astro`. Metric-matched `Fallback` faces (measured for the blog) keep the line box stable during the swap.

### Layout

`.container` centers the page at `--container` with `--gutter` side padding. From `56rem`, `.grid-12` is a 12-column grid; sections hang their heading in columns 1-3 (`position: sticky`) and put content in 4-12. Rules and item rows (project index, roles, certifications, footer) run to the right edge of column 12; only running text is held to `--measure`. The intro (front of the card) is as tall as its content: the name on top, then the statement on the left and the grouped contact block on the right, both on the bottom edge, closed by a 1px `--rule` line. Below `56rem` everything stacks in one column.

### CSS Reset

`src/styles/reset.css` is a preflight-style modern reset (box-sizing, zeroed margins, list/media/form normalization, `[hidden]` enforcement) imported at the top of `global.css`. There is no CSS framework: the markup uses BEM-ish class names with scoped styles, and every value comes from the custom-property tokens.

### Scoped Styles

Each `.astro` component uses `<style>` blocks for component-specific styles. Global styles (tokens, fonts, base type, links, focus, selection, reduced motion, `.display` (the name and the 404 code), `.container`, the section grid) live in `global.css`.

### Brand assets

`favicon.svg`, `favicon.ico`, `icon-192.{svg,png}`, `icon-512.png`, `apple-touch-icon.png` and `og-image.{svg,png}` use the paper, ink, teal and mark tokens. The OG image text is converted to outlines (librsvg cannot load web fonts) and rasterized with `sharp`; the generator script is not kept in the repo (see CHANGELOG).

## Testing Strategy

### What is Tested

- **cv.ts** (`src/data/__tests__/cv.test.ts`): structure across locales, structural and recursive key parity between ES and EN, https URLs, known channel platforms, `getChannels()` resolving every channel to an https link with a label, and no `Stack:` line left inside `highlights`.
- **cv.ts helpers** (same file): `getChannelGroups()` (every channel once, same groups in ES and EN, shared description only when identical), `groupProjects()` (every project once, featured first, group order), project `group` valid and equal in both locales, `groupByCompany()` (grouping, only the first role current, a returning company opens a new group, input not mutated), `projectHref()` (url wins, private repos never link) and `displayUrl()`.
- **i18n** (`src/i18n/__tests__/i18n.test.ts`): `getLocale()` fallback, `otherLocale()`, `homePath()`, and `formatDate()` (year-only and invalid dates kept as-is, month names per locale, and the first day of a month formatted in UTC so the build machine's time zone cannot shift it back a month; that test sets `process.env.TZ` west of UTC itself, so it catches the regression on CI and on any local machine).

### Why These

The loader trusts `JSON.parse` (no runtime schema), so these tests are the safety net that catches typos and drift in `cv.es.json` / `cv.en.json` before the build.

### What is Not Tested (and Why)

- **Astro components**: Require browser/DOM environment. Astro's rendering pipeline is covered by the build step in `pnpm run validate`.
- **The `ui` dictionary in i18n/index.ts**: Pure lookup table with TypeScript enforcement. Type errors catch missing keys at compile time (the helpers next to it are tested, see above).
- **Vanity redirects**: declared in `astro.config.mjs`; `dist/_redirects` is generated from the same map. Verified by build success and, after deploy, by `curl -sI https://sergiomarquez.dev/yt` (expect `302` with the YouTube `location`).

### Test Utilities

When a test needs to narrow an optional value, define a local `assertDefined<T>()` in that test file instead of using `!` (Biome's `noNonNullAssertion`). No shared helper: YAGNI until a second consumer exists.

## Build & Deploy

### Local Development

- **pnpm** as package manager and script runner
- `pnpm run dev` starts Astro dev server at `localhost:4321`
- `pnpm run validate` runs the full pipeline: type-check + lint + test + build

### CI (GitHub Actions)

`.github/workflows/ci.yml` runs on push/PR to `main`:
1. Checkout + setup Node (`.nvmrc`) + setup pnpm
2. `pnpm install --frozen-lockfile`
3. `pnpm run lint` (Biome CLI)
4. `pnpm run type-check`
5. `pnpm run test`
6. `pnpm run build`
7. On `main`: trigger the Cloudflare Pages deploy hook

### Production (Cloudflare Pages)

- Builds from `main` branch using pnpm (`pnpm-lock.yaml` is the only lockfile)
- `public/_headers` sets the security headers and immutable cache-control for `/fonts/*` (the build emits no `/_astro/` assets: CSS is inlined and there is no client JS)
- `"prepare": "husky || true"` prevents CI failure from missing git hooks

### Pre-commit Hooks

- Husky + lint-staged
- Runs `biome check --write` on staged files in `src/` only
- Scoped to avoid linting lockfiles and root config files

## Design Decisions

### Why No Content Collections

Astro Content Collections are designed for Markdown/MDX content with frontmatter. The CV data is structured JSON served as static assets from `public/`. Using Content Collections would add unnecessary abstraction for a single JSON file per locale.

### Why Config Redirects

The 9 vanity links (`/linkedin`, `/github`, `/x`, `/twitter`, `/youtube`, `/yt`, `/blog`, `/tiktok`, `/instagram`) live in the `redirects` map of `astro.config.mjs`, with destinations read from `basics.urls` in `cv.es.json`. With static output Astro emits a meta refresh page with `noindex` and a canonical to the target, and the sitemap never lists redirects, so no filter is needed. On top of that, the `cloudflare-redirects` integration in the same file writes `dist/_redirects` at `astro:build:done` from the same map (each path with and without trailing slash, status 302): Cloudflare Pages answers a short link with one real redirect before any asset is served, instead of 308 to the trailing slash plus the meta refresh page. The URLs still live only in the JSON; the meta refresh pages remain the fallback and are what `astro dev` serves. 302, not 301, because the destinations follow the JSON and may change.

### Why CSS Custom Properties (and No Framework)

CSS custom properties in `global.css` serve as the canonical design tokens, consumed directly by scoped `<style>` blocks in Astro components. Tailwind was removed once an audit showed zero utility classes in the markup — only its preflight mattered, now replaced by `src/styles/reset.css`. This keeps the token layer readable, the CSS payload minimal, and one less dependency to track.
