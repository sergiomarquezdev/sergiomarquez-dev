# CLAUDE.md

Personal portfolio site — data-driven from `public/cv.json` through typed loader into Astro 5 components.

## Rules

- MUST run `bun run validate` before considering any task complete (runs type-check + lint + test + build)
- MUST keep both lockfiles in sync: after adding/removing dependencies with `bun`, also run `npm install --package-lock-only` to update `package-lock.json`. Cloudflare Pages uses `npm ci`
- MUST keep `|| true` in `"prepare": "husky || true"`. Without it, CI environments fail during `npm ci`
- NEVER use `!` non-null assertions. Biome flags `noNonNullAssertion`. Use type narrowing or `assertDefined()` helpers

## Gotchas

- **`astro check` false positives for cv**: Reports `cv` as unused in redirect pages — the import IS used in frontmatter before an early `return`
- **Windows `core.autocrlf` phantom files**: Biome enforces LF line endings. Git's `core.autocrlf` creates phantom "modified" files. Check actual changes with `git diff --ignore-cr-at-eol --name-only`
- **lint-staged scoped to `src/`**: Avoids running Biome on root config files
