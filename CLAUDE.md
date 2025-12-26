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
bun run validate     # Full pipeline: type-check + lint + build
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
- Bun (package manager)
- Cloudflare Pages (deployment)
