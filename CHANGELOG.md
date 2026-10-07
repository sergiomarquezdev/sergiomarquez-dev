# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Redesign extras (2026-10-07): JSON-LD now wraps the `Person` in a `ProfilePage` (`mainEntity`, same fields, `sameAs` with the six profiles); `apple-touch-icon.png` (180x180); a GitHub channel at the end of `writing.channels` ("Código de mis proyectos abiertos" / "Code for my open projects", copy pending the owner's confirmation); `getChannels(cv)` in `src/data/cv.ts`, which builds each channel link from `basics.urls[platform]` and replaces the hardcoded URL map.
- Redesign review (2026-10-07): JSON-LD `ProfilePage` gains `url` (the page canonical), `inLanguage` and `image` (absolute og-image URL). New `EmailLink.astro` (mailto with a break after "@", shared by the front and the back of the card), global `.display` class (the name and the 404 code) and `otherLocale()` in `src/i18n/index.ts`.
- YouTube is back with the new channel `@sergio_marquezp` (2026-10-04). The old `@sergiomarquezp` was deleted on 2026-09-24; the new URL is `https://www.youtube.com/@sergio_marquezp`.
  - Restored `basics.urls.youtube` and the "Writing & Presence" channel (short AI videos) in `cv.es.json`/`cv.en.json`, the `CvData` types and the data tests, `SocialLinks`, `Writing`, `YouTubeIcon`, the `/youtube` and `/yt` redirect pages and their sitemap exclusions.
  - JSON-LD `sameAs` lists YouTube again alongside TikTok.
  - Instagram and Esem Projects stay removed.

### Fixed

- TikTok profile link (2026-10-04): the account is `@sergio_marquezp`, not `@sergiomarquezp_` (that handle does not exist on TikTok). Fixed in `basics.urls.tiktok` and the "Writing & Presence" handle of `cv.es.json`/`cv.en.json`, the `Writing` URL map and the README. X stays `@sergiomarquezp_`.

### Changed

- Intro and About copy (2026-10-07), ES and EN: the tagline drops "en producción" / "in production" (the statement right below already says it) and carries the location instead; the summary no longer repeats the project list or the Claude Code line from Projects and Experience, and states the working method instead. The Person JSON-LD description follows the summary.
- **Redesign "two-ink stationery"** (2026-10-07). The dark terminal look (lime accent, Geist, JetBrains Mono, ⌘K palette, sidebar, cursor spotlight) is replaced by a light page in the One dAIly Blog family: warm paper, warm black ink, teal identity ink and coral only for state, square corners, no shadows, cards or icons, and a dark scheme by `prefers-color-scheme`. The page is the front of a business card (name, tagline, serif statement, email and the six channels in the first screen), a sheet with About, Projects (featured project + index) and Experience (current role open, earlier roles in `<details>`, certifications), and the back of the card as a teal footer outside `<main>`. Section headings hang in a sticky margin column; links overprint to coral in two frames. New components: `SiteHeader`, `SiteFooter`, `sections/{Intro,About,Projects,Experience}`; rewritten `Layout`, `BaseHead`, `HomePage`, `LanguageSwitcher` (plain link with `lang`/`hreflang`), `SergioMark` (one variant, `currentColor` + `--mark`) and `404`.
  - Fonts: Space Grotesk (variable) and Instrument Serif 400, latin woff2 from Fontsource 5.3.0, self-hosted in `public/fonts/` with the version in the file name and metric-matched fallbacks. Two preloads, no monospace.
  - The page ships no JavaScript of its own: the only `<script>` left is the JSON-LD.
  - Copy: every interface string moves to `src/i18n/index.ts` (no more `locale === "en"` ternaries in components). `seo.title` and `seo.description` are shortened to 56 and 154/142 characters. `lang.switch` reads "English"/"Español".
  - Data: `experience[].highlights` no longer ends with a "Stack: …" line; it moves to `experience[].stack: string[]` (same content, both locales).
  - 404: one static bilingual page (Cloudflare serves a single `404.html`), `noindex`, without canonical, hreflang or JSON-LD (new `noindex` prop on `Layout`/`BaseHead`).
  - Brand assets with the new palette: `favicon.svg`/`.ico`, `icon-192.{svg,png}`, `icon-512.png`, `apple-touch-icon.png`, `manifest.webmanifest` colors and `og-image.{svg,png}` (1200x630: monogram, name, ES headline, domain; the old "con métricas, no demos" line is gone). Provenance: generated with a temporary Node script (not kept) that outlines the text with `opentype.js` from `@fontsource/space-grotesk@5.3.0` (700 and 500 `.woff`) and `@fontsource/instrument-serif@5.3.0` (400 `.woff`) and rasterizes with `sharp`; the favicon ICO embeds 16/32/48 PNGs.
  - `astro.config.mjs`: dropped the `vite.build.rollupOptions` asset naming (the build no longer emits `dist/assets/`) and `build.assets: "_astro"` (Astro's default). `public/_headers` loses the `/assets/*` rule.
- Redesign review (2026-10-07):
  - Dark scheme: `--teal` goes from neon `#2dd4bf` to a desaturated identity teal `#70abab` (7.62:1 on `#0c0a09`; also the `::selection` pair) and `--rule` from `#292524` (1.30:1, barely visible) to `#44403c` (1.92:1, decorative).
  - Front of the card (desktop): the statement hangs under the tagline, the contact block sits on the bottom edge and a 1px `--rule` line closes the block, so name, statement and contact run on a diagonal like a printed card.
  - Experience: role rules, role rows and the certifications rule reach the right edge of columns 4-12 like the project index; `--measure` only limits running text (headline, highlights, stack).
  - Back of the card on mobile: the email scales with the viewport (`clamp(--step-1, 8vw, --step-3)`) and wraps after "@", so at 390px it is larger (31px) than the "Contacto" heading (26px).
  - `basics.urls.blog` is required in `CvData` (the `/blog` redirect depends on it) and checked by the data tests. `BaseHead` resolves every absolute URL against `Astro.site` (no ad-hoc fallback) and now carries `<link rel="manifest">` (moved from `Layout`). `og:locale:alternate` and `LanguageSwitcher` derive the other locale with `otherLocale()` instead of a ternary. `SergioMark` and `LanguageSwitcher` lose their unused `class` prop.
- Vanity redirects (2026-10-07): the 8 hand-written stubs under `src/pages/{blog,github,linkedin,tiktok,twitter,x,youtube,yt}/` become the `redirects` map in `astro.config.mjs`, fed by `basics.urls` of `cv.es.json` (the `/blog` stub hardcoded its URL). Same output: meta refresh, `noindex`, canonical to the target. The sitemap regex filter is gone because Astro never lists redirects.
- Security headers (2026-10-07): the CSP now allows Cloudflare Web Analytics (`static.cloudflareinsights.com` in `script-src`, `cloudflareinsights.com` in `connect-src`). Cloudflare injects the beacon and the old policy blocked it, so analytics never ran and every visit logged a console error. Added `Cross-Origin-Opener-Policy: same-origin`.
- CI (2026-10-07): `pnpm audit` runs right after install, so an advisory fails in seconds instead of after the build; the deploy hook call has `--max-time 30 --retry 2`.
- Git hooks (2026-10-07): added the missing `.husky/pre-commit` (`pnpm exec lint-staged`); until now lint-staged never ran. Its two globs collapse into one.

- Profile copy (2026-10-04), ES and EN: hero (role, headline, tagline, status, chips and proof line), summary, current-role experience, SEO title/description, OG alt text and footer CTA now describe the current work (LLM systems on Google Cloud, agents, RAG, data) and own projects without the closed studio. Location is Badajoz.
  - Work metrics removed: the `metrics` impact bar and the current-role KPIs are gone, and the highlights are qualitative.
  - Projects: added One Bad Wire, Pingufly (itch.io), the daily short AI videos and acestream-docker-home; the blog headline reflects the single daily post; the voice receptionist no longer claims real calls.
  - The hero proof line no longer claims "40+ open-source repos" (there are 24 public repos), and "Ver work" reads "Ver proyectos".
  - EN full-stack KPI label fixed from "3 meses" to "3 months".

- CV copy (2026-09-24): the generative-AI work from the closed applied-AI studio is now described as past experience ("En paralelo, con mi propio estudio de IA aplicada, construí y operé…" / "through my own applied-AI studio, I built and operated…"). The voice-receptionist project headline moves to the past tense ("atendió llamadas reales" / "handled real calls"), because that agent no longer runs.

### Removed

- Redesign review cleanup (2026-10-07): the `/_astro/*` cache rule in `public/_headers` (the build emits no `_astro/` directory), and the unused `.sr-only` class and `--s-12` token in `global.css`.
- Redesign cleanup (2026-10-07): the automatic redirect to `/en/` by browser language and its `localStorage` preference (it also sent Googlebot to `/en/`; Google advises against language redirects), the `html.js` gate and fade-in on scroll, `CommandPalette`, `Spotlight`, `GitHubActivity` with `src/data/github.ts` and its tests (three GitHub API calls per build for a widget that no longer rendered), `layout/`, `ui/`, `icons/`, the old `sections/`, `About`, `Certifications`, `src/scripts/scrollSpy.ts`, `public/fonts/Geist-var-latin.woff2`, and the compat `cv` export of `src/data/cv.ts`. Unused data fields go too: `basics.headlineAccent`, `basics.stackChips`, `basics.status`, `experience[].kpis`, `projects[].kpi`, `writing.blogUrl`, and the `metrics`/`alsoRunning`/`image` types.
- Deleted channels and ventures (2026-09-24). The YouTube channel (`@sergiomarquezp`) and the Instagram account (`@sergiomarquezp_`) no longer exist.
  - Both leave `basics.urls` and the "Writing & Presence" channels in `cv.es.json`/`cv.en.json`, the `CvData` types and the data tests, `SocialLinks` and `Writing`.
  - Also removed: the `/youtube`, `/yt` and `/instagram` redirect pages, their sitemap exclusions and the now-unused `YouTubeIcon`/`InstagramIcon`.
  - JSON-LD `sameAs` swaps YouTube for the TikTok profile, which is still live.
  - The "also running Esem Projects" line is gone: the studio is closed and `esemprojects.es` is expiring.

### Dependencies

- Removed `@fontsource/instrument-serif` and `@fontsource-variable/jetbrains-mono` (2026-10-07): the two font files now live in `public/fonts/`.
- Refreshed the lockfile (2026-10-07) to clear `sharp` <0.35.5, `source-map-js` <1.2.2 (high) and `smol-toml` <=1.8.0 (moderate), which made `pnpm audit` fail in CI. Astro 7.3.5, Biome 2.5.15, Vitest 5.0.3, lint-staged 17.6.0.
- Removed the five `pnpm-workspace.yaml` overrides (`nanoid`, `fast-uri`, `js-yaml`, `devalue`, `http-cache-semantics`) and the `minimumReleaseAgeExclude` entry: a clean resolution already picks patched versions.
- Removed the direct `lightningcss` dependency and `cssMinify: "lightningcss"`: Vite 8 ships it and uses it as the default CSS minifier (identical `dist/index.html`, 116 818 bytes).

- Upgraded **Astro 5.16 → 7.1** (Vite 8, Rust compiler now default). `src/data/cv.ts` resolves `public/cv.*.json` from `process.cwd()` instead of module-relative paths: Astro 7 executes prerender chunks from `dist/.prerender/chunks/`, so `import.meta.url`-relative resolution pointed inside `dist/`. Verified the `dist/` layout is unchanged (fonts under `/assets/`, scripts under `/_astro/`) and the top-level `vite.build.rollupOptions.output` override still applies to the prerender build.
- Updated @astrojs/sitemap 3.6 → 3.7.3, @astrojs/check 0.9.5 → 0.9.9, Biome 2.3 → 2.5.4, lightningcss 1.30 → 1.32, Vitest 4.0 → 4.1.10, lint-staged 16.2 → 17.0.8.
- **TypeScript capped at ^6.0.3** (not 7.x): `astro check` depends on the TS Language Service API, which the TS 7 native compiler does not expose until 7.1. Confirmed again on `@astrojs/check` 0.9.10, whose peer range is still `^5.0.0 || ^6.0.0`.
- Fixed Biome 2.5 `useOptionalChain` warning in `src/data/github.ts`.
- Follow-up pass (2026-09-24): Astro 7.1.6 → 7.3.4, @astrojs/sitemap 3.7.3 → 3.7.4, Biome 2.5.7 → 2.5.14, lint-staged 17.3.0 → 17.5.1, Vitest 4.1.10 → **5.0.1** (major; no config or test changes needed — `vitest.config.ts` has no globals/plugins that Vitest 5 touches, all 23 tests pass unchanged).
- Re-confirmed the **TypeScript ^6.0.3 cap still applies**: 6.0.3 remains the latest stable 6.x release and `@astrojs/check`'s peer range is still `^5.0.0 || ^6.0.0` (checked against `@astrojs/check@latest`, still 0.9.10) — TS 7.0.2 is out but unsupported by `astro check` until `@astrojs/check` adds a peer range for it.
- Held back **Astro 7.3.5**: published ~8h before this run, inside pnpm 11's default minimum-release-age window. Kept 7.3.4 per policy instead of excluding it; no code changes needed either way.
- `astro@7.1.6` was pinned in `minimumReleaseAgeExclude` (`pnpm-workspace.yaml`) — removed now that 7.1.6 is no longer resolved anywhere in the lockfile.

### Security

- Security headers (2026-09-24): `public/_headers` gains a `/*` block with Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy and HSTS, matching the blog.
  - The CSP allows only the site's own origin. `'unsafe-inline'` stays for scripts and styles because Astro inlines both (`inlineStylesheets: "always"`) and Cloudflare injects an inline bot-detection script.
  - `font-src` includes `data:` because the build inlines font files as `data:font/woff2` URIs; without it JetBrains Mono failed to load.
  - Checked in Chrome against the built `dist/` served with these headers: no violations on `/`, `/en/` or the 404 page, and the Ctrl+K palette still works. A control run without `data:` caught the font violation, so the check is not blind.
- CI runs `pnpm audit --audit-level=moderate` after the build, with no ignores.
- `.github/dependabot.yml` keeps the SHA-pinned GitHub Actions current (monthly, grouped). npm dependencies stay manual and gated by the audit step.
- Added `SECURITY.md`: report through GitHub private vulnerability reporting or contacto@sergiomarquez.dev.
- Cleared all 16 advisories reported by `pnpm audit` (10 high, 6 moderate — all transitive). Astro 7.1.0 → 7.1.6 fixed `js-yaml`, `sharp`, `postcss`, `mdast-util-to-hast` and `picomatch`; `@astrojs/check` 0.9.9 → 0.9.10 fixed `ajv` and `fast-uri`; Vitest picked up a patched `picomatch`.
- Added a `rollup: ^4.62.4` override in `pnpm-workspace.yaml`: `astro > @rollup/pluginutils` resolved rollup 4.44.2, vulnerable to arbitrary file write via path traversal ([GHSA-mw96-cpmx-2vgc](https://github.com/advisories/GHSA-mw96-cpmx-2vgc)). No upstream release lifts that transitive pin yet — remove the override once Astro ships one.
- `pnpm audit` now reports no known vulnerabilities.
- Follow-up pass (2026-09-24): **removed the `rollup` override** — Astro 7.3's Vite 8 no longer resolves `rollup` anywhere in the tree (`@rollup/pluginutils` dependency is gone), confirmed via `grep -i rollup pnpm-lock.yaml` returning nothing before the override was dropped.
- `pnpm audit` surfaced 7 new advisories after the Astro/Vitest bump (6 high, 1 moderate), all transitive and one version behind their fix: `nanoid` (astro > vite > postcss, GHSA-mwcw-c2x4-8c55), `fast-uri` ×4 (@astrojs/check > @astrojs/language-server > volar-service-*, host-confusion/SSRF advisories), `js-yaml` (astro > @astrojs/internal-helpers, GHSA-2883-xcg3-v3hh), `devalue` (astro, GHSA-9rgm-9g3h-6x36). None of the parent packages had shipped a release bumping these yet, so added same-major overrides in `pnpm-workspace.yaml`: `nanoid: '>=3.3.19 <4'`, `fast-uri: '>=3.1.8 <4'`, `js-yaml: '>=4.3.2 <5'`, `devalue: '>=5.9.4 <6'`. `pnpm audit` is clean again.

### Tooling

- Updated Biome 2.5.4 → 2.5.7, lint-staged 17.0.8 → 17.3.0, lightningcss 1.32 → 1.33, Fontsource packages 5.2.8 → 5.3.0.
- Renamed the seven `biome-ignore lint/complexity/noImportant` suppressions in `src/styles/global.css` to `noImportantStyles`; Biome 2.5.7 no longer accepts the old category name and failed the whole lint run with `suppressions/parse` errors. Bumped `biome.json`'s `$schema` to 2.5.7.

### CI & Infrastructure

- **Node 22.18.0 → 24.18.0** (`.nvmrc`): Node 22 is in LTS maintenance nearing EOL (April 2027); 24 is the active LTS (EOL April 2028). Also clears the corepack `EBADENGINE` warning on Cloudflare Pages builds and satisfies lint-staged 17's `>= 22.22.1` requirement.
- Pinned pnpm through the `packageManager` field (`pnpm@11.6.0`) so local, CI and Cloudflare Pages all resolve the same version (CF was defaulting to 10.11.1).
- CI workflow: bumped pinned actions (checkout v7.0.0, setup-node v7.0.0, pnpm/action-setup v6.0.9 — clears the "Node.js 20 deprecated" annotation), pnpm set up before setup-node with `cache: "pnpm"` store caching, removed the redundant `setup-biome` step (`pnpm run lint` already runs the local Biome devDependency), deploy-hook secret now passed via `env`, dropped the duplicate `CHANGELOG.md` paths-ignore entry.
- Disabled Cloudflare Pages automatic git deployments for production: deploys now happen only through the CI deploy hook, so production is gated on CI passing (previously every push built twice and deployed even if CI failed).

### Documentation

- `PRODUCT.md` (product context) and `DESIGN.md` + `.impeccable/design.json` (design system recorded from the shipped build) for design work with the impeccable skill (2026-10-07). `.impeccable/config.json` keeps the detector exceptions: Space Grotesk and Instrument Serif are the brand faces shared with the blog.
- Realigned README.md with the shipped site: hybrid AI Engineer + builder intro and contact tagline, complete `public/` and `src/` structure trees (`_headers`, `fonts/`, PWA icons, `404.astro`, `/instagram` and `/tiktok` redirects, `SergioMark`), full dependency list (`@astrojs/sitemap`, Fontsource packages), Node 22 prerequisite and consistent Lighthouse 99/100 figures.
- Refreshed CLAUDE.md and AGENTS.md (now synced copies): current gotchas (doc-only pushes skip CI/deploy, `html.js` gate, `[hidden]` reset rule, i18n import-depth nuance) and the `pnpm-workspace.yaml` tracking rule.
- Updated `docs/ARCHITECTURE.md` data flow and component tree to the Agentic Console composition (Hero, ImpactBar, Cases, Projects, Writing, MobileNav, CommandPalette); redirect page count corrected 7 → 9.
- Archived shipped/obsolete docs into `docs/archive/` (Agentic Console design spec, 2026 profile-update spec, One dAIly Blog marketing context) and removed the empty `docs/superpowers/` and `.agents/` directories.

## [2026-06-21]

### Content & positioning

- Reframed the profile from "assistants / smart search / document validation" to a hybrid **AI Engineer + builder** angle covering conversational, voice and generative AI agents in production. Updated `tagline`, `headline`, `stackChips`, `status` and `summary` in both locales.
- Rebuilt the `projects` list (5 → 8) from code-verified stacks: added AI Video Ad Generator, AI Voice Receptionist 24/7, WhatsApp AI Agent, Multimodal Vector Search and a Google ADK personal agent; corrected AI Photo Transformer's stack (was Supabase/HTMX, now Gemini 2.0 Flash + Seedream 4 + PostgreSQL + SSE); dropped the off-brand Acestream and gesture-whiteboard demos.
- `alsoRunning` reworded to present Esem Projects as an applied-AI studio (voice/WhatsApp agents, ad generation, automation).

### Performance (final optimization audit)

- Inline all CSS (`inlineStylesheets: "always"`) — single-page site; removes both render-blocking stylesheet requests and exposes `@font-face` rules at first HTML parse.
- Preload the three above-the-fold fonts (Geist sans, JetBrains Mono, Instrument Serif italic). Mono/serif woff2 URLs resolved through Vite `?url` imports so preload hashes always match the CSS.
- Subset `Geist-var.woff2` to latin (62.6 KB → 29.3 KB, −53%) as `Geist-var-latin.woff2` with explicit `unicode-range`.
- New `public/_headers` with immutable cache-control for `/assets/*`, `/_astro/*` and `/fonts/*` (Cloudflare Pages).
- Removed Tailwind entirely (zero utility classes in the markup): `@import "tailwindcss"` replaced by `src/styles/reset.css` (preflight-equivalent); dropped `tailwind.config.ts`, the Vite plugin and the `tailwindcss`/`@tailwindcss/vite` deps.
- `DotGrid` draw loop pauses via IntersectionObserver while the hero is off-screen (was an unconditional rAF loop).
- Removed invisible `backdrop-filter: blur(8px)` from the opaque mobile nav.

### Accessibility (Lighthouse 95 → 100)

- Raised `--text-tertiary` `#71717a` → `#85858f`: the old token failed WCAG AA contrast (≈4.1:1) on every eyebrow/period/kicker (confirmed by Lighthouse `color-contrast`).
- `CaseStudy` "current" dot: prohibited `aria-label` on a generic span replaced by an `aria-hidden` dot + translated `.sr-only` text (new `case.current` i18n key).
- Command palette upgraded to the combobox pattern: `role="combobox"` + `aria-activedescendant` on the input, `role="group"` per command group, result-count live region (new `cmdk.results` i18n key), pre-rendered toast, empty state moved out of the listbox as `role="status"`, and anchor scrolling that respects `prefers-reduced-motion`.
- Demoted the sidebar/mobile-header name from `<h1>` to `<p>` — the hero headline is the single h1 per page.
- Language switcher touch target expanded to ~44px via invisible `::after` overlay.
- Below-the-fold sections only start hidden when JS runs (`html.js` gate set by the inline head script) — content stays visible with JS disabled.

### SEO

- Removed `build.format: "file"`: the EN canonical/og:url pointed at `/en.html` (a URL that 308-redirects). Default directory format keeps canonical, hreflang and sitemap consistent on `/en/`.
- Sitemap excludes the nine social redirect stubs (they carry `noindex`; listing them contradicted it) and no longer stamps a fake `lastmod` on every deploy.
- Added `og:locale:alternate`; `robots.txt` cleaned (single sitemap index, dropped ignored `Crawl-delay`); manifest description refreshed to "AI Engineer".

### Fixed

- `CaseStudy` live-dot animation referenced `status-pulse` keyframes that only existed inside the dead `StatusBadge` component (never compiled into any page) — now uses the global `pulse` keyframes and actually animates.
- `[hidden]` elements with an author `display` (e.g. palette items, `display: flex`) are forced hidden in the reset — without the Tailwind preflight rule the palette filter visually did nothing.
- Footer/sidebar social links now wrap (`flex-wrap: wrap`) instead of overflowing horizontally on narrow mobile viewports (`SocialLinks.astro`).

### Removed (dead code)

- Components with zero imports: `SidebarRight.astro`, `StatusBadge.astro`, `AwardIcon.astro`.
- Unused `non.geist` dependency (the font ships self-hosted from `public/fonts/`), stale `package-lock.json` (pnpm-only project), unused `@/*` tsconfig alias, unused `vitest` globals flag.
- Dead CSS in `global.css`: `.animate-*`, `.delay-*`, `.section-title`, `.card-interactive`, `.tok-flag`, `.term-section-head`, `fade-up`/`fade-in` keyframes, and the backwards-compat token aliases (scrollbar/404/Spotlight migrated to canonical tokens).
- `astro:page-load` listeners and re-init `AbortController`s in five components — there is no `<ClientRouter />`, so they never fired.

### Changed (internal)

- Deduplicated ~100 lines of identical scroll-spy logic from `Navigation.astro` and `MobileNav.astro` into `src/scripts/scrollSpy.ts`.
- `cv.test.ts` gained a validation suite: recursive key parity between `cv.es.json`/`cv.en.json`, required https URLs, and `writing.channels[].platform` enum check (the loader itself stays a trusting `JSON.parse`; tests run before build in `validate`).

### Added

- **"Agentic Console" redesign**: terminal-aesthetic shell (window chrome, shell prompts, monospace tokens, blinking caret) reframing the site as an agent session. Net-new `CommandPalette.astro` — an accessible `<dialog>` opened with `⌘/Ctrl+K` or `/` (plus a discoverable `⌘K` chip) that jumps to sections, opens links, toggles locale, and copies the email. Progressive enhancement: every action is also reachable via normal scroll/links, so no user is ever blocked.
- Shared terminal CSS layer in `global.css` (`.term-window`, `.term-titlebar`, `.term-dots`, `.tok-*`, `.caret`, `.kbd`, `.term-btn`), respecting brand effect rules (no glassmorphism, drop shadows, or gradients > 15%).
- `hero.*` and `cmdk.*` i18n keys (ES/EN) for the terminal hero lines and command palette.
- Instagram (`@sergiomarquezp_`) as a writing channel and header social link, including new `InstagramIcon.astro` and `/instagram` vanity redirect.
- `basics.alsoRunning` optional CV field rendered as a muted line under the About summary, surfacing **Esem Projects** (`https://esemprojects.es`) without competing with the primary CTA.
- `basics.headlineAccent` optional CV field that splits the hero headline into a sans-serif lead and an Instrument Serif italic + lime accent suffix (matches the canonical `Métricas, no demos.` brand signature treatment).
- Numbered kicker meta row on `ProjectCard` (`0X / Build privado` or `0X / Open source`) with hover-animated `↗`/`→` affordance.

### Changed

- **Profile content refreshed to "AI Engineer" positioning (2026)**: reframed `cv.{es,en}.json` from one year of real work — tagline, summary, headline ("Construyo sistemas de IA agéntica en producción."), `stackChips` (`Agentic RAG`, `Google ADK`, `Vertex AI`, `Claude Code`, `Python/FastAPI`, `GCP`), status, and the current role (→ "Ingeniero de IA / AI Engineer") with agentic-RAG + GCP-platform highlights and KPIs. Refreshed the Impact Bar metrics (−75% processing cost, 70→90% document validation, −35% infra cost, 3.6M+ records). Aligned i18n `seo.title`/`seo.description`/`structured.knowsAbout`/`og.imageAlt`/`hero.role`. Employer-internal product names kept out (abstracted capabilities + metrics).
- **Reader-friendly rewrite (recruiter-oriented)**: after a GPT-5 review, reframed the public copy to lead with what the work does in plain language (assistants, smart search over docs, document validation) and pushed deep jargon (agentic/ADK/LLM-as-judge) into supporting detail. Applied to `cv.{es,en}.json` tagline/summary and i18n `seo.title`/`seo.description`/`structured.knowsAbout`. Hero headline kept.
- **Repositioned** from "Backend reconvertido a IA" to builder-authority on Claude Code / AI agents / agentic & spec-driven development. Updated `cv.{es,en}.json` (tagline, summary, headline, `stackChips`, status, featured project), hero, about title, footer CTA, and SEO title/description/`knowsAbout`.
- `SidebarLeft` reworked into a console panel: `$ whoami`, nav rendered as a `cd ~/<section>` command list with `# label` comments, and a `⌘K` chip. `Hero` rebuilt as a terminal session (window chrome + `whoami`/`cat ~/.now`/`ls ./proof` prompts) with the headline accent set in Instrument Serif italic lime. Section eyebrows converted to shell-prompt headers (`~ % cat about.md`, `~ % git log work/`, `~ % ls builds/`, …).
- Hero `.hero` now clips overflow so the decorative `DotGrid` bleed (width 160%) can never create page-wide horizontal scroll.
- Hero eyebrow restructured into segments (`// Topic` in lime + `·` separators in tertiary) instead of a single monochrome line.
- Sidebar nav indicator switched from `scaleX(0.5 → 1)` of a 64px bar to a `width 24px → 40px` transition for a cleaner active state and lower default visual weight.
- Sidebar social links converted from flat icon buttons to circular icons with 1px border, matching the design-system handoff aesthetic.
- Sidebar brand name set in Instrument Serif italic for editorial weight.
- Section eyebrows (About, Cases, Projects, Writing, Certifications) shifted from lime `accent-text` to muted tertiary uppercase mono (11px, `0.12em` letter-spacing) — restores "lime sparingly" discipline; lime now reserved for hero headline accent, nav active indicator, and CTAs.

### Changed (legacy)

- **Complete portfolio redesign** with "AI Engineer" personal brand identity.
- Migrated from light minimalist theme to dark theme with lime accent (`#A3E635`).
- New typography system: **Instrument Serif** (display headlines), **Geist Variable** (body), **JetBrains Mono Variable** (metrics, code, mono labels).
- Recomposed home structure: Hero → Impact Bar → About → Cases (replaces flat Experience timeline) → Projects → Writing & Presence → Certifications → CTA Footer.
- `Footer.astro` rebuilt as a full-width CTA section with serif headline and lime button.
- `About`, `Certifications`, sidebars, navigation, mobile nav, language switcher, GitHub activity, spotlight and base layout adapted to the new dark theme and typography system.

### Added

- `Hero.astro` section with serif headline, eyebrow `// Ingeniería IA · Backend · Automatización`, stack chips and primary/ghost CTA buttons.
- Decorative animated `DotGrid.astro` canvas in hero — pure vanilla, ~1KB, respects `prefers-reduced-motion`, hidden below 1024px, bleeds beyond hero with radial mask to avoid hard rectangular edges.
- `ImpactBar.astro` showing four production metrics in mono lime (cost, validation, savings, latency).
- `CaseStudy.astro` + `CasesGrid.astro` replacing the flat experience timeline. Each case shows headline, KPIs front-and-center and contextual bullets with `→` lime markers.
- `FeaturedProject.astro` for the lead project (One dAIly Blog) with prominent KPI badge and accent-bordered card.
- `ProjectCard.astro` + `ProjectsSection.astro` for secondary projects in a responsive grid.
- `Writing.astro` consolidating blog and social channels with handle + description per platform.
- UI primitives in `src/components/ui/`: `MetricKpi`, `StackChip`, `StatusBadge`, `DotGrid`.
- New optional CV fields: `metrics`, `basics.headline`, `basics.stackChips`, `basics.status`, `experience[].headline`, `experience[].kpis`, `projects[].featured`, `projects[].kpi`, `writing` block. All optional in `CvData` to preserve backwards compatibility.
- Test in `cv.test.ts` verifying parity of new optional brand fields between locales.
- Spec and plan documents under `plans/` documenting the redesign rationale and execution steps.

### Removed

- Old `Experience.astro` and `Projects.astro` components (replaced by sections under `src/components/sections/`).

### Added (pre-redesign)

- Custom 404 page (`src/pages/404.astro`) with branded layout, ES/EN message, and home CTA
- `og-image.png` (1200×630) replacing the SVG placeholder for proper social media previews
- PWA icons `icon-192.png` and `icon-512.png` for installable app support
- `og:image:type` meta tag in BaseHead for correct MIME declaration
- Font preload `<link rel="preload">` for Geist Variable with static `/fonts/Geist-var.woff2`
- `sr-only` utility class in global.css for screen-reader-only content
- Visually-hidden `<h2 id="heading-about">` in About section for landmark accessibility
- `aria-labelledby` on all four page sections pointing to their respective headings
- `aria.mobileNav` i18n key ("Navegación móvil" / "Mobile navigation") to distinguish from desktop nav
- IntersectionObserver-driven section animations — fade-up fires when section enters viewport
- Mobile bottom navigation bar with scroll-spy, icon + label items, and safe-area support
- Footer component with CTA and copyright (i18n)
- Timeline visual in experience section with animated dot for current role
- Project thumbnails using GitHub OG images with lazy loading and fallback placeholders
- Hero line in About section with keyword highlighting
- Section separators (border-top) between content sections
- Lock icon badge for private projects (replaces dead `href="#"` links)
- `formatDate` i18n helper using `Intl.DateTimeFormat` for certification dates
- Touch feedback on interactive cards (`:active` state)
- Tablet breakpoint (768px) with social links in header and wider content padding
- Navigation icons: UserIcon, BriefcaseIcon, CodeIcon, AwardIcon, LockIcon
- `image` optional field in project type for manual thumbnail override

### Changed

- `--tertiary-text` color changed from `#94a3b8` to `#64748b` (WCAG AA compliant, ~5:1 contrast)
- `--tertiary-text` color changed from `#64748b` to `#52606d` (~6.4:1 contrast — previous value sat at the 4.5:1 boundary and Lighthouse/axe-core flagged `.role-period`, `.cert-meta`, `.footer-copyright`)
- Certifications now render as `<div>` when no URL present, removing `href="#"` dead links
- `heading-experience`, `heading-projects`, `heading-certifications` IDs added to section `<h2>` elements
- Mobile nav `aria-label` changed to `aria.mobileNav` (previously shared label with desktop nav)
- Mobile nav label font-size increased from 10px to 11px for legibility
- Project OG images now use `alt={project.name}` instead of empty `alt=""`
- `@import "non.geist"` replaced with explicit `@font-face` pointing to `/fonts/Geist-var.woff2`
- `manifest.webmanifest` updated with PNG icons and corrected `theme_color` to accent blue
- Static `animate-fade-up` classes on sections replaced with IntersectionObserver
- Language switcher redesigned with border, larger font, and secondary-text color
- Social links touch targets increased to 44x44px minimum
- Projects render as `<div>` (not `<a>`) when private/no URL, removing dead links
- Internationalization (i18n) with Spanish (default) and English locales
- Language switcher component with automatic locale detection on first visit
- Hreflang alternate links (ES, EN, x-default) for SEO
- GitHub activity widget showing latest public commit at build time
- Spotlight effect with cursor-tracking radial gradient
- Scroll-spy navigation highlighting active section in sidebar
- Sidebar layout with sticky left sidebar (nav + social) and right sidebar (email)
- Mobile-responsive header with language switcher
- Unit test suite with Vitest for data layer (cv loader, GitHub client)
- GitHub Actions CI pipeline (type-check, lint, test, build)
- Print styles hiding navigation and adjusting layout for paper
- PWA manifest (`manifest.webmanifest`)
- Vanity redirect pages (`/linkedin`, `/github`, `/x`, `/twitter`, `/youtube`, `/yt`, `/blog`)
- Skip-to-content link and ARIA labels for accessibility
- `prefers-reduced-motion` support disabling animations
- Architecture documentation (`docs/ARCHITECTURE.md`)
- Layout redesigned from single-column with header to sidebar architecture
- Portfolio data split from single `cv.json` into locale-specific `cv.es.json` and `cv.en.json`
- Data loader updated with locale-aware cache (`getCv(locale)`)
- CSS custom properties as single source of truth, bridged to Tailwind via `tailwind.config.ts`
