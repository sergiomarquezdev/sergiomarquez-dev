# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

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
