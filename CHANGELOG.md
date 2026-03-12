# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

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

### Changed

- Layout redesigned from single-column with header to sidebar architecture
- Portfolio data split from single `cv.json` into locale-specific `cv.es.json` and `cv.en.json`
- Data loader updated with locale-aware cache (`getCv(locale)`)
- CSS custom properties as single source of truth, bridged to Tailwind via `tailwind.config.ts`
