# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
