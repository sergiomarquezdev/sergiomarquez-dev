# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a data-driven personal portfolio website built with Astro and Tailwind CSS. The entire site content is sourced from `public/cv.json`, making it straightforward to update and maintain without touching component code.

## Development Commands

```bash
# Development server with hot reload
bun run dev              # Starts at http://localhost:4321

# Production build
bun run build            # Static site generation to dist/

# Preview production build
bun run preview

# Quality checks
bun run type-check       # Astro + TypeScript validation
bun run lint             # Biome linting (read-only)
bun run lint:fix         # Auto-fix linting issues
bun run format           # Format code with Biome
bun run format:check     # Check formatting without changes

# Full validation pipeline
bun run validate         # Runs type-check + lint + build
```

**Important:** This project uses **Bun** as the package manager. Use `bun install` for dependencies, not npm or yarn.

## Architecture

### Data-Driven Content Flow

1. **Source of truth:** `public/cv.json` contains all portfolio data (profile, experience, projects, certifications)
2. **Type-safe loader:** `src/data/cv.ts` reads `cv.json` at build time and provides TypeScript types via `CvData` interface
3. **Component rendering:** All `.astro` components in `src/components/` consume typed data props from the loader
4. **Single page composition:** `src/pages/index.astro` imports cv data and passes slices to each section component

**Key principle:** To update site content, edit `public/cv.json`. To change layout or styling, edit the corresponding Astro component.

### Build Configuration

- **SSG mode:** Astro outputs static HTML/CSS/JS (no server runtime)
- **CSS optimization:** Uses LightningCSS for minification (configured in `astro.config.mjs` vite settings)
- **Asset handling:** Assets stored in `_astro/` directory with hashed filenames
- **SEO:** Sitemap auto-generated via `@astrojs/sitemap` integration, comprehensive meta tags in `BaseHead.astro`

### Linting & Formatting

- **Tool:** Biome (configured in `biome.json`)
- **Line width:** 100 characters
- **Astro overrides:** `useConst`, `useImportType`, `noUnusedVariables`, and `noUnusedImports` rules disabled for `.astro` files (necessary due to Astro's component structure)

## Multi-Agent Workflow (Optional)

If using the GitHub Copilot instructions workflow, this project follows a **Planner/Executor** pattern:

- **Planner mode:** Creates implementation plans in `/docs/implementation-plan/` and maintains `/docs/scratchpad.md`
- **Executor mode:** Implements tasks one at a time, updates status boards, and documents lessons learned
- **Discipline:** TDD where applicable, run tests after each vertical slice, update documentation continuously, pause to reflect on blockers

**Note:** This workflow is optional and managed via `.github/copilot-instructions.md`. Claude Code users can ignore unless explicitly working with that pattern.

## Component Structure

Each section component (About, Technologies, Experience, Projects, Certifications) follows the same pattern:

```typescript
// Import cv data
import { cv } from "../data/cv";
const { sectionData } = cv;

// Pass to component
<SectionComponent data={sectionData} />
```

Components use Tailwind utility classes for styling. The design is dark-mode-first with a minimalist aesthetic.

## Deployment

- **Platform:** Cloudflare Pages
- **Trigger:** Automatic deployment on push to `main` branch
- **Build command:** `bun run build`
- **Output directory:** `dist/`

## Important Notes

- Astro components use the `.astro` extension and combine HTML-like templating with a TypeScript frontmatter section
- All content changes should go through `public/cv.json` to maintain data-driven architecture
- The cv.json schema is enforced by the `CvData` type in `src/data/cv.ts` - update both if adding new fields
- Biome handles both linting and formatting - no need for separate Prettier/ESLint
