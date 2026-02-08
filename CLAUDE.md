# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- MUST run `bun run validate` before considering any task complete (runs type-check + lint + test + build).
- MUST keep both lockfiles in sync: after adding/removing dependencies with `bun`, also run `npm install --package-lock-only` to update `package-lock.json`. Cloudflare Pages uses `npm ci`.
- MUST keep `|| true` in `"prepare": "husky || true"`. Without it, CI environments fail during `npm ci`.
- NEVER use `!` non-null assertions in TypeScript. Biome flags `noNonNullAssertion`. Use type narrowing or `assertDefined()` helpers instead.
- lint-staged globs are scoped to `src/` to avoid running Biome on root config files.
- `astro check` reports `cv` as unused in redirect pages — these are false positives (the import IS used in frontmatter before an early `return`).

## Commands

```bash
bun run dev          # Dev server at localhost:4321
bun run build        # Production build
bun run validate     # Full pipeline: type-check + lint + test + build
bun run test         # Vitest unit tests
bun run lint:fix     # Auto-fix Biome lint issues
bun run format       # Biome formatting
```

## Architecture

**Data-driven portfolio**: All content flows from `public/cv.json` through typed loader `src/data/cv.ts` into Astro components.

```
public/cv.json → src/data/cv.ts (CvData type) → src/pages/index.astro → src/components/*.astro
```

**Stack**: Astro 5 (static SSG), Tailwind CSS 4 (Vite plugin), TypeScript, Biome (lint/format), Vitest, Husky + lint-staged, Cloudflare Pages.

**Styling**: Tailwind CSS 4 via Vite plugin. Design tokens in `src/styles/global.css` as CSS variables (--background, --primary-text, etc.), extended in `tailwind.config.ts`.

**Redirect pages**: `src/pages/{github,linkedin,twitter,x,youtube,yt}/index.astro` are simple redirects to social profiles.

## Key Files

- `public/cv.json` — Edit here to update portfolio content
- `src/data/cv.ts` — TypeScript types and loader (CvData)
- `src/layouts/Layout.astro` — Base layout with BaseHead and Header
- `astro.config.mjs` — Static output, sitemap, LightningCSS minification

## Testing

Tests live in `src/data/__tests__/` using Vitest. Convention: `{module}.test.ts` colocated with source in `__tests__/` directories.

## Gotchas

**Biome enforces LF line endings**: On Windows, git's `core.autocrlf` creates phantom "modified" files. Check actual changes with `git diff --ignore-cr-at-eol --name-only`.
