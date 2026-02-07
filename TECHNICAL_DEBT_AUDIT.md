# Technical Debt Audit Report

**Project:** sergiomarquez-web (Portfolio)
**Date:** 2026-02-07
**Auditor:** Claude Code (Technical Debt Manager Agent)
**Branch:** `claude/audit-technical-debt-XlT9s`

---

## Executive Summary

This is a well-maintained, production-quality Astro 5 portfolio site with **minimal dependency footprint** (9 total packages), **zero type errors**, **zero lint violations**, and a **clean data-driven architecture**. The overall technical debt level is **Low**.

The project scores well on maintainability, but there are actionable improvements across testing, resilience, code duplication, and minor configuration issues that, if addressed, would further harden the codebase for long-term evolution.

### Debt Score: 2.3 / 10 (Low)

| Category | Severity | Items |
|----------|----------|-------|
| Code Quality | Low | 5 |
| Dependencies | Low | 2 |
| Testing | High | 2 |
| Documentation | Low | 1 |
| Architecture/Design | Low | 4 |
| Infrastructure/Config | Medium | 3 |
| Performance | Low | 2 |

---

## 1. Code Quality Debt

### TD-001: Duplicated `.section-title` styles across components
- **Severity:** Low
- **Location:** `src/components/Experience.astro:45-58`, `src/components/Projects.astro:49-62`, `src/components/Certifications.astro:49-61`
- **Description:** The `.section-title` CSS block (margin, font-size, font-weight, letter-spacing, text-transform, color, and the `display: none` at 1024px breakpoint) is **identically repeated** in three components.
- **Impact:** Any change to section title styling requires editing 3 files. Risk of drift over time.
- **Recommendation:** Extract into a shared CSS class in `global.css` or create a `SectionTitle.astro` component.
- **Effort:** ~30 min

### TD-002: Duplicated card hover pattern across components
- **Severity:** Low
- **Location:** `src/components/Experience.astro:66-77`, `src/components/Projects.astro:70-81`, `src/components/Certifications.astro:72-83`
- **Description:** The card styling pattern (block display, padding, negative margin, border-radius, hover with `accent-muted` background, transition) is repeated in Experience, Projects, and Certifications.
- **Impact:** Minor. Consistent now, but changes to card styling would need 3 edits.
- **Recommendation:** Could extract a shared `.card-interactive` class or a wrapper component if new sections are added.
- **Effort:** ~30 min

### TD-003: Hardcoded structured data in BaseHead.astro
- **Severity:** Low
- **Location:** `src/components/BaseHead.astro:45-75`
- **Description:** The JSON-LD structured data block contains hardcoded values (name, jobTitle, URLs, worksFor, knowsAbout) that **duplicate** data already present in `cv.json`. If CV data changes, the structured data may fall out of sync.
- **Impact:** SEO inconsistency risk. Currently correct, but fragile to future edits.
- **Recommendation:** Generate the JSON-LD dynamically from the `cv` data object, similar to how other components consume it.
- **Effort:** ~1 hr

### TD-004: Redirect page URLs hardcoded (not sourced from cv.json)
- **Severity:** Low
- **Location:** `src/pages/{github,linkedin,twitter,x,youtube,yt}/index.astro`
- **Description:** Each redirect page has a hardcoded URL string. These URLs are also defined in `cv.json` under `basics.urls`. If a social URL changes, it must be updated in **two places**.
- **Impact:** Low probability of drift (URLs rarely change), but violates the single-source-of-truth architecture.
- **Recommendation:** Import URLs from `cv.ts` or generate redirect pages programmatically.
- **Effort:** ~1 hr

### TD-005: Navigation items hardcoded independently from page sections
- **Severity:** Low
- **Location:** `src/components/layout/Navigation.astro:7-12` vs `src/pages/index.astro:20-34`
- **Description:** The `navItems` array in `Navigation.astro` is manually synced with the section IDs in `index.astro`. Adding a new section requires editing both files.
- **Impact:** Low. With only 4 sections this is manageable, but could be a source of bugs if sections are added/removed.
- **Recommendation:** Define section config in a shared constant or derive navigation from page structure.
- **Effort:** ~30 min

---

## 2. Dependency Debt

### TD-006: Package version at 0.0.1
- **Severity:** Low
- **Location:** `package.json:4`
- **Description:** `"version": "0.0.1"` suggests the project has never had a formal version. While not blocking for a personal portfolio, it means there's no versioning discipline.
- **Impact:** Negligible for a single-deployee site. Becomes relevant if the project grows or gets forked.
- **Recommendation:** Adopt semantic versioning with meaningful releases (e.g., `1.0.0` for the current stable site).
- **Effort:** ~10 min

### TD-007: Unused Markdown/Shiki configuration
- **Severity:** Low
- **Location:** `astro.config.mjs:30-35`
- **Description:** The `markdown.shikiConfig` block is configured but no Markdown content exists in the project. The comment says "if needed for future content."
- **Impact:** Dead configuration. Minimal runtime cost since Astro tree-shakes unused features, but adds cognitive noise.
- **Recommendation:** Remove until Markdown/MDX content is actually introduced. Easy to re-add later.
- **Effort:** ~5 min

---

## 3. Testing Debt

### TD-008: No test framework or test files exist
- **Severity:** High
- **Location:** Project-wide
- **Description:** There are **zero tests** in the project. No test framework is installed, no test scripts in `package.json`, no `__tests__` or `*.test.*` files anywhere.
- **Impact:** Critical business logic is untested:
  - `src/data/github.ts`: API response parsing, message truncation logic, error handling
  - `src/data/cv.ts`: Data loading and type correctness
  - Navigation scroll detection logic (complex DOM interaction in `Navigation.astro`)
  - Redirect pages returning correct 301 status codes
- **Recommendation:**
  1. Install a test runner (Vitest pairs well with Astro/Vite)
  2. Add unit tests for `github.ts` (pure logic: SHA shortening, message truncation, event filtering)
  3. Add a snapshot or smoke test for the build output
  4. Add the test command to the `validate` script
- **Effort:** ~4 hrs for initial setup + core tests

### TD-009: No CI/CD pipeline definition in repository
- **Severity:** High
- **Location:** Project-wide (no `.github/workflows/`, no `gitlab-ci.yml`, no equivalent)
- **Description:** No continuous integration configuration exists. The `validate` script exists locally but there's nothing ensuring it runs before deployment.
- **Impact:** Broken builds or type errors could be deployed to production without automated checks.
- **Recommendation:** Add a GitHub Actions workflow that runs `bun run validate` on PRs and pushes to main.
- **Effort:** ~1 hr

---

## 4. Documentation Debt

### TD-010: No architectural decision records or changelog
- **Severity:** Low
- **Location:** Project-wide
- **Description:** The project has a good `CLAUDE.md` and `README.md`, but lacks:
  - A `CHANGELOG.md` to track versions and changes
  - Any architectural decision records explaining design choices (e.g., why static SSG, why Brittany Chiang design system, why `readFileSync` for data loading)
- **Impact:** Low for a solo project. Increases onboarding time if others contribute.
- **Recommendation:** Start a minimal `CHANGELOG.md` tracking notable changes. ADRs are optional.
- **Effort:** ~30 min

---

## 5. Architecture/Design Debt

### TD-011: GitHub API fetch at build time without caching or timeout
- **Severity:** Medium
- **Location:** `src/data/github.ts:25-30`
- **Description:** The `getLatestCommit()` function calls the GitHub Events API at build time with **no timeout** and **no caching**. If the API is slow or down (as seen in the build log: `getaddrinfo EAI_AGAIN api.github.com`), it adds latency to every build.
- **Impact:** Build failures in offline/restricted environments. Build time variability. During the audit, the build took 14ms extra for the failed fetch.
- **Recommendation:**
  1. Add an `AbortSignal.timeout()` (e.g., 5 seconds)
  2. Consider caching the result to a local file so builds succeed offline
  3. Consider moving this to client-side fetch for always-fresh data
- **Effort:** ~1 hr

### TD-012: PWA manifest background_color mismatch
- **Severity:** Low
- **Location:** `public/manifest.webmanifest:7-8`
- **Description:** The manifest uses `background_color: "#0a0a0a"` and `theme_color: "#0a0a0a"`, but the actual site background defined in `global.css` is `--background: #0f172a`. These colors don't match.
- **Impact:** On PWA splash screens or task switcher, the background color would briefly flash a different shade before the CSS loads.
- **Recommendation:** Update manifest to use `#0f172a` to match the design system.
- **Effort:** ~5 min

### TD-013: Favicon type mismatch in BaseHead
- **Severity:** Low
- **Location:** `src/components/BaseHead.astro:18`
- **Description:** The `<link>` tag declares `type="image/svg+xml"` but the actual file is `/favicon.ico` (ICO format, not SVG). This is a metadata mismatch.
- **Impact:** Most browsers will still display the favicon correctly by sniffing the content type, but it's technically incorrect.
- **Recommendation:** Either change the type to `image/x-icon` or replace the favicon with an actual SVG.
- **Effort:** ~5 min

### TD-014: `EmailIcon` component exists but is never used
- **Severity:** Low
- **Location:** `src/components/icons/EmailIcon.astro`
- **Description:** The `EmailIcon.astro` component is defined but not imported or used anywhere in the codebase. `SidebarRight.astro` renders the email as text, not using this icon.
- **Impact:** Dead code. Minimal build impact since Astro tree-shakes unused components.
- **Recommendation:** Remove the component or use it in the sidebar email section.
- **Effort:** ~5 min

---

## 6. Infrastructure/Config Debt

### TD-015: Biome linting disabled for all `.astro` files (unused vars/imports)
- **Severity:** Medium
- **Location:** `biome.json:19-29`
- **Description:** `noUnusedVariables` and `noUnusedImports` are disabled for all `.astro` files due to Astro's variable hoisting behavior. While necessary for some patterns (like `Astro.props`), this blanket disable means genuinely unused imports in `.astro` files will never be caught.
- **Impact:** Dead imports can accumulate silently. Currently clean (verified manually), but no automated guard.
- **Recommendation:** Monitor Biome's Astro support improvements. When possible, narrow the override or use `// biome-ignore` comments per-case instead of blanket disable.
- **Effort:** ~15 min (periodic review)

### TD-016: No pre-commit hooks or git hooks
- **Severity:** Medium
- **Location:** Project-wide
- **Description:** There's no `husky`, `lint-staged`, `lefthook`, or equivalent pre-commit hook. Developers can commit without running lint/format/type-check.
- **Impact:** Format or lint violations could be committed. Currently mitigated by developer discipline, but fragile.
- **Recommendation:** Add `husky` + `lint-staged` (or `lefthook`) to run `biome check` and `astro check` on staged files before each commit.
- **Effort:** ~30 min

### TD-017: Build output directory not gitignored verification
- **Severity:** Low
- **Location:** `.gitignore`
- **Description:** Verified that `dist/` is properly gitignored. No issue here, but the `node_modules/` pattern relies on the default `.gitignore`. This is noted as verified-clean.
- **Impact:** None. Clean.
- **Recommendation:** No action needed.
- **Effort:** N/A

---

## 7. Performance Debt

### TD-018: Spotlight mousemove listener has no cleanup mechanism
- **Severity:** Low
- **Location:** `src/components/Spotlight.astro:33`
- **Description:** The `mousemove` event listener is added globally via `document.addEventListener` but never removed. The `initSpotlight()` function is called both on load and on `astro:page-load`, potentially adding duplicate listeners after view transitions.
- **Impact:** Minor memory leak on SPAs with view transitions. Not an issue for this static site currently, but becomes relevant if client-side navigation (View Transitions API) is enabled.
- **Recommendation:** Track the listener and remove it before re-adding, or use `{ once: false }` with a guard. Similarly, `Navigation.astro:117` has the same pattern.
- **Effort:** ~30 min

### TD-019: Stagger animation delays defined but partially unused
- **Severity:** Low
- **Location:** `src/styles/global.css:140-154`
- **Description:** CSS classes `.delay-400` and `.delay-500` are defined but never used in any template. Only `.delay-100` through `.delay-300` are used (in `index.astro`).
- **Impact:** ~4 lines of unused CSS. Negligible file size impact.
- **Recommendation:** Remove `.delay-400` and `.delay-500` or leave them for future use.
- **Effort:** ~5 min

---

## Priority Matrix

### Immediate (High Impact / Low Effort)
| ID | Item | Effort |
|----|------|--------|
| TD-012 | Fix PWA manifest background_color mismatch | 5 min |
| TD-013 | Fix favicon type mismatch in BaseHead | 5 min |
| TD-014 | Remove unused EmailIcon component | 5 min |
| TD-007 | Remove unused Markdown/Shiki config | 5 min |

### Short-term (High Value)
| ID | Item | Effort |
|----|------|--------|
| TD-008 | Set up test framework + core unit tests | 4 hrs |
| TD-009 | Add CI/CD pipeline (GitHub Actions) | 1 hr |
| TD-011 | Add timeout/fallback to GitHub API fetch | 1 hr |
| TD-016 | Add pre-commit hooks | 30 min |

### Medium-term (Maintenance)
| ID | Item | Effort |
|----|------|--------|
| TD-001 | Extract shared `.section-title` styles | 30 min |
| TD-003 | Generate JSON-LD from cv.json data | 1 hr |
| TD-004 | Source redirect URLs from cv.json | 1 hr |
| TD-005 | Shared section/nav configuration | 30 min |

### Low Priority (Nice to Have)
| ID | Item | Effort |
|----|------|--------|
| TD-002 | Extract shared card hover pattern | 30 min |
| TD-006 | Bump version to 1.0.0 | 10 min |
| TD-010 | Start CHANGELOG.md | 30 min |
| TD-015 | Review Biome Astro overrides | 15 min |
| TD-018 | Add event listener cleanup | 30 min |
| TD-019 | Remove unused delay classes | 5 min |

---

## Validation Results

```
Type checking:  0 errors, 0 warnings, 0 hints (33 files)
Linting:        0 issues (31 files checked)
Formatting:     0 issues (31 files checked)
Build:          Success (8 pages, 2.53s)
```

**Build warning (non-blocking):** Vite reports unused imports from `@astrojs/internal-helpers/remote` in Astro's own module — this is upstream, not project debt.

**Build note:** GitHub API fetch failed at build time (`EAI_AGAIN` — DNS resolution failure in sandboxed environment). The component handled it gracefully by returning null. This validates the error handling in `github.ts` but underscores **TD-011** (timeout/caching recommendation).

---

## Conclusion

This portfolio project demonstrates strong engineering fundamentals:
- Clean data-driven architecture with single source of truth
- Full TypeScript strict mode with zero errors
- Comprehensive SEO (meta tags, OpenGraph, JSON-LD, sitemap)
- Accessibility-first design (skip links, semantic HTML, reduced motion)
- Minimal, well-chosen dependency tree

The two highest-impact improvements are:
1. **Adding a test framework** (TD-008) to protect the data loading and API integration logic
2. **Adding CI/CD** (TD-009) to enforce the `validate` pipeline automatically

Total estimated effort to address all items: **~12 hours**
