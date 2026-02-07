# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun run dev          # Start dev server at localhost:4321
bun run build        # Production build
bun run preview      # Preview production build

# Quality
bun run type-check   # TypeScript validation (astro check)
bun run lint         # Biome linting
bun run lint:fix     # Auto-fix lint issues
bun run format       # Biome formatting
bun run validate     # Full pipeline: type-check + lint + test + build
bun run test         # Run vitest unit tests
```

## Architecture

**Data-driven portfolio**: All content flows from `public/cv.json` through typed loader `src/data/cv.ts` into Astro components.

```
public/cv.json (content source)
       ↓
src/data/cv.ts (typed loader with CvData type)
       ↓
src/pages/index.astro (destructures cv into sections)
       ↓
src/components/{About,Experience,Projects,Certifications}.astro
```

**Styling**: Tailwind CSS 4 via Vite plugin. Design tokens in `src/styles/global.css` as CSS variables (--background, --primary-text, etc.), extended in `tailwind.config.ts`.

**Redirect pages**: `src/pages/{github,linkedin,twitter,x,youtube,yt}/index.astro` are simple redirects to social profiles.

## Key Files

- `public/cv.json` - Edit here to update portfolio content
- `src/data/cv.ts` - TypeScript types for CV structure (CvData)
- `src/layouts/Layout.astro` - Base layout with BaseHead and Header
- `astro.config.mjs` - Static output, sitemap, LightningCSS minification

## Stack

- Astro 5 (static SSG)
- Tailwind CSS 4 (Vite plugin)
- TypeScript
- Biome (lint/format)
- Bun (local package manager)
- Vitest (unit testing)
- Husky + lint-staged (pre-commit hooks)
- Cloudflare Pages (deployment, uses npm ci)

## Gotchas

**Dual lockfile requirement**: Bun is used locally (`bun.lock`), but Cloudflare Pages runs `npm ci` which requires `package-lock.json`. Both lockfiles must be kept in sync. After adding/removing dependencies with bun, also run `npm install --package-lock-only` to update `package-lock.json`.

**Husky prepare script in CI**: The `"prepare": "husky || true"` script must keep the `|| true` fallback. Without it, CI environments (Cloudflare, GitHub Actions) fail during `npm ci` because husky can't initialize outside a full git checkout.

**lint-staged globs scoped to src/**: lint-staged patterns use `src/**/*.{ts,js,json,css}` instead of `*.{ts,js,json,css}` to avoid running Biome on root files like `package-lock.json` (which Biome rejects as outside its config scope).

**Biome enforces LF line endings**: Biome normalizes to LF. On Windows, git's `core.autocrlf` converts files back to CRLF in the working tree, creating phantom "modified" files with no real content changes. Don't commit these -- check with `git diff --ignore-cr-at-eol --name-only` to see actual changes.

**Biome `noNonNullAssertion` rule**: Use type narrowing helpers (e.g., `assertDefined()`) instead of `!` non-null assertions in tests. Biome flags `result!.property` patterns.

**Redirect page `cv` import warnings**: `astro check` reports `cv` as unused in redirect pages (`src/pages/{github,linkedin,...}/index.astro`) because the early `return` confuses the checker. These are false positives -- the import IS used in the frontmatter.
