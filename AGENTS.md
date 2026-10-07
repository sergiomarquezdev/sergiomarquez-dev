# CLAUDE.md

Personal portfolio site (ES/EN) -- data-driven from `public/cv.{es,en}.json` through typed loader into Astro 7 components. `AGENTS.md` is a synced copy of this file -- update both together.

## Rules

- MUST run `pnpm run validate` before considering any task complete (runs type-check + lint + test + build)
- Uses pnpm. Run `pnpm install` after dependency changes. Cloudflare Pages is configured to use pnpm. Keep `pnpm-workspace.yaml` tracked -- it holds the build-script approvals (esbuild, sharp)
- MUST keep `|| true` in `"prepare": "husky || true"`. Without it, CI environments fail
- NEVER use `!` non-null assertions. Biome flags `noNonNullAssertion` (recommended preset). Use type narrowing or an `assertDefined()` helper defined locally in the test file that needs it
- MUST update documentation (README.md, CHANGELOG.md, docs/) when adding/removing features, changing data flow, or modifying project structure

## Gotchas

- **Doc-only pushes don't deploy**: CI has `paths-ignore` for `**.md`, `docs/**` and `.vscode/**` -- a push touching only docs never triggers build or Cloudflare Pages deploy
- **Windows `core.autocrlf` phantom files**: Biome enforces LF line endings. Git's `core.autocrlf` creates phantom "modified" files. Check actual changes with `git diff --ignore-cr-at-eol --name-only`
- **lint-staged scoped to `src/`**: Avoids running Biome on root config files
- **i18n route duplication**: `src/pages/index.astro` and `src/pages/en/index.astro` are intentionally the same file except for relative import depth (`../` vs `../../`) -- Astro injects different `currentLocale` per route
- **`[hidden]` must win in reset.css**: the reset's `[hidden]` `!important` rule keeps the attribute working on elements whose scoped styles set a `display` (grid/flex rows). Nothing uses `hidden` today; keep the rule so a future toggle doesn't silently fail
