# CLAUDE.md

Personal portfolio site (ES/EN) -- data-driven from `public/cv.{es,en}.json` through typed loader into Astro 5 components.

## Rules

- MUST run `pnpm run validate` before considering any task complete (runs type-check + lint + test + build)
- Uses pnpm. Run `pnpm install` after dependency changes. Cloudflare Pages is configured to use pnpm
- MUST keep `|| true` in `"prepare": "husky || true"`. Without it, CI environments fail
- NEVER use `!` non-null assertions. Biome flags `noNonNullAssertion`. Use type narrowing or `assertDefined()` helpers
- MUST update documentation (README.md, CHANGELOG.md, docs/) when adding/removing features, changing data flow, or modifying project structure

## Gotchas

- **`astro check` false positives for cv**: Reports `cv` as unused in redirect pages — the import IS used in frontmatter before an early `return`
- **Windows `core.autocrlf` phantom files**: Biome enforces LF line endings. Git's `core.autocrlf` creates phantom "modified" files. Check actual changes with `git diff --ignore-cr-at-eol --name-only`
- **lint-staged scoped to `src/`**: Avoids running Biome on root config files
- **i18n route duplication**: `src/pages/index.astro` and `src/pages/en/index.astro` are intentionally identical -- Astro injects different `currentLocale` per route
