---
name: portfolio-guide
description: Architecture guide for portfolio with cv.json content paths, design tokens, CI/CD pipeline, and file conventions
---

# sergiomarquez.dev Portfolio Guide

## When to Use This Skill

Use when the user mentions: architecture, arquitectura, structure, estructura, conventions, convenciones, how does, como funciona, where is, donde esta, data flow, flujo de datos, cv.json, add section, nueva seccion, deployment, despliegue, testing, design system, sistema de diseno, new component, nuevo componente, update content, actualizar contenido, folder, carpeta, file location, ubicacion de archivo, design tokens, Cloudflare Pages, CI/CD, bun, lockfile.

This skill takes PRIORITY over guessing project structure. Consult before implementing features.

## Capabilities

- Content update guide (cv.json paths for each section)
- New section checklist (6 steps: JSON -> type -> component -> page -> nav -> test)
- Social redirect pattern
- Layout structure (three-column desktop, single-column mobile)
- File conventions (components, layout, icons, data, tests, pages, styles)
- Design tokens (navy theme: background, primary-text, secondary-text, accent)
- CI/CD pipeline (GitHub Actions + Cloudflare Pages)
- Key gotchas (dual lockfile, path alias, Biome LF, Lighthouse targets)

DO NOT USE for: actual implementation (use portfolio-dev), backend changes.

Single-page portfolio site. All content driven by `public/cv.json`.

## Content Updates

To update portfolio content, edit `public/cv.json`:

| Section | JSON Path | Component |
|---------|-----------|-----------|
| Bio/summary | `basics.summary` | `About.astro` |
| Job title | `basics.label` | `SidebarLeft.astro` |
| Work history | `experience[]` | `Experience.astro` |
| Projects | `projects[]` | `Projects.astro` |
| Certifications | `certifications[]` | `Certifications.astro` |
| Social links | `basics.profiles[]` | `SocialLinks.astro` |

No code changes needed for content updates -- just edit the JSON.

## Adding a New Section

1. Add data to `public/cv.json` under a new key
2. Update `CvData` type in `src/data/cv.ts`
3. Create component: `src/components/NewSection.astro`
4. Add to `src/pages/index.astro` with `<section id="new-section">`
5. Add nav link in `src/components/layout/Navigation.astro`
6. Add test in `src/data/__tests__/cv.test.ts`

## Adding a Social Redirect

Create `src/pages/platform-name/index.astro`:
```astro
---
import { cv } from '@/data/cv';
const url = cv.basics.profiles.find(p => p.network === 'PlatformName')?.url;
return Astro.redirect(url ?? 'https://sergiomarquez.dev');
---
```

## Layout Structure

```
┌──────────────────────────────────────────────┐
│                  Spotlight                     │
├──────────┬───────────────────────┬────────────┤
│ Sidebar  │    Main Content       │  Sidebar   │
│ Left     │                       │  Right     │
│ (sticky) │  ┌─ About ──────┐    │  (email)   │
│          │  ├─ Experience ──┤    │            │
│ Name     │  ├─ Projects ───┤    │            │
│ Title    │  └─ Certs ──────┘    │            │
│ Nav      │                       │            │
│ Social   │                       │            │
├──────────┴───────────────────────┴────────────┤
│              (mobile: single column)           │
└──────────────────────────────────────────────┘
```

Desktop: three-column (sidebar sticky at `lg:` breakpoint).
Mobile: single column with mobile header.

## File Conventions

| Type | Location | Naming |
|------|----------|--------|
| Section components | `src/components/` | PascalCase.astro |
| Layout components | `src/components/layout/` | PascalCase.astro |
| Icon components | `src/components/icons/` | PascalCaseIcon.astro |
| Data loaders | `src/data/` | kebab-case.ts |
| Tests | `src/data/__tests__/` | module-name.test.ts |
| Pages | `src/pages/` | kebab-case or index.astro |
| Styles | `src/styles/` | kebab-case.css |

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0a192f` | Page background (navy) |
| `--primary-text` | `#ccd6f6` | Headings, primary text |
| `--secondary-text` | `#8892b0` | Body text, descriptions |
| `--accent` | `#64ffda` | Links, highlights, hover |
| `--accent-muted` | `rgba(100,255,218,0.1)` | Subtle backgrounds |
| `--navy-light` | `#112240` | Card backgrounds |
| `--navy-lighter` | `#233554` | Borders, hover states |

Font: Geist Variable (non.geist package).

## Testing

- **Runner:** Vitest (globals mode)
- **Tests:** `src/data/__tests__/cv.test.ts`, `github.test.ts`
- **Focus:** Data loader validation (structure, required fields)
- **Command:** `bun run test`

## CI/CD Pipeline

```
Push/PR to main → GitHub Actions (ci.yml)
  ├── bun install
  ├── type-check (astro check)
  ├── lint (biome check)
  ├── test (vitest)
  └── build (astro build)

Push to main → Cloudflare Pages (automatic)
  ├── npm ci (uses package-lock.json)
  └── npm run build → dist/
```

Pre-commit: Husky runs lint-staged → Biome check on `src/**/*`.

## Key Gotchas

1. **Content = JSON only:** All portfolio content lives in `public/cv.json`. Never hardcode content in components.
2. **Dual lockfile:** `bun.lock` + `package-lock.json` must stay in sync.
3. **Path alias:** Use `@/` imports (e.g., `import { cv } from '@/data/cv'`).
4. **Biome LF:** Enforces LF endings. Windows users may see phantom diffs.
5. **Redirect pages:** `astro check` false positives on unused imports -- ignore.
6. **Lighthouse target:** 95+ performance, 100 SEO. Test before merging visual changes.
