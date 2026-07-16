# CLAUDE.md

Personal portfolio site (ES/EN) -- data-driven from `public/cv.{es,en}.json` through typed loader into Astro 7 components. `AGENTS.md` is a synced copy of this file -- update both together.

## Rules

- MUST run `pnpm run validate` before considering any task complete (runs type-check + lint + test + build)
- Uses pnpm. Run `pnpm install` after dependency changes. Cloudflare Pages is configured to use pnpm. Keep `pnpm-workspace.yaml` tracked -- it holds the build-script approvals (esbuild, sharp)
- MUST keep `|| true` in `"prepare": "husky || true"`. Without it, CI environments fail
- NEVER use `!` non-null assertions. Biome flags `noNonNullAssertion` (recommended preset). Use type narrowing or a local `assertDefined()` helper (see `src/data/__tests__/github.test.ts`)
- MUST update documentation (README.md, CHANGELOG.md, docs/) when adding/removing features, changing data flow, or modifying project structure

## Gotchas

- **Doc-only pushes don't deploy**: CI has `paths-ignore` for `**.md`, `docs/**` and `.vscode/**` -- a push touching only docs never triggers build or Cloudflare Pages deploy
- **`astro check` false positives for cv**: Reports `cv` as unused in redirect pages — the import IS used in frontmatter before an early `return`
- **Windows `core.autocrlf` phantom files**: Biome enforces LF line endings. Git's `core.autocrlf` creates phantom "modified" files. Check actual changes with `git diff --ignore-cr-at-eol --name-only`
- **lint-staged scoped to `src/`**: Avoids running Biome on root config files
- **i18n route duplication**: `src/pages/index.astro` and `src/pages/en/index.astro` are intentionally the same file except for relative import depth (`../` vs `../../`) -- Astro injects different `currentLocale` per route
- **`html.js` gate**: below-the-fold sections start hidden only when the inline head script in `Layout.astro` adds `.js` to `<html>` -- content stays visible with JS disabled. Don't hide sections unconditionally and don't remove that script
- **`[hidden]` must win in reset.css**: elements with an author `display` (e.g. ⌘K palette items with `display: flex`) rely on the reset's `[hidden]` `!important` rule -- without it the palette filter visually does nothing
