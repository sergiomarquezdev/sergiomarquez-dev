# Plan: Add Instagram channel + Esem Projects mention

**Date**: 2026-05-07
**Status**: ready_to_execute
**Branch suggestion**: `feat/instagram-channel-and-esem-mention`
**Origin**: handoff from a separate Claude session that was building Sergio's personal-brand presence on TikTok + Instagram. The bio of both social profiles points to `sergiomarquez.dev`, so the site needs to (a) link back to Instagram for symmetry with the existing TikTok/X handles, and (b) mention Esem Projects (the AI agency Sergio runs) so visitors arriving from social have a discoverable path to it.

## Context — what Sergio is doing in social

- New TikTok account `@sergiomarquezp_` — already active, 75 followers, 11+ videos about Claude Code / AI dev tooling. Display name: `Sergio · IA y Claude Code`. Bio: "Pruebo agentes IA cada día / Lo que funciona · lo que no / 🇪🇸 Founder @esemprojects". Link in bio: `sergiomarquez.dev`.
- New Instagram account `@sergiomarquezp_` — empty (0 posts, 0 followers). Display name + bio mirror TikTok. Link in bio: `sergiomarquez.dev`. Will cross-post Reels from TikTok content.
- Strategy: TikTok/IG = thought leadership tech-IA. Audience = developers, founders, AI tool fans. NOT a direct B2B funnel for the agency. The personal site (this repo) is the destination of all social bios — it must reinforce that authority and make Esem Projects discoverable as a secondary signal.

## Goal

Two changes, scoped tight:

1. **Add Instagram as a writing channel** so the site mirrors all social presences Sergio actively uses.
2. **Add a discreet mention of Esem Projects** so Esem becomes findable from the personal site without becoming the primary CTA.

Non-goals:
- No redesign of any section. Both changes are additive within existing components.
- No change to the primary CTA (`¿Llevamos IA a producción? → contacto@sergiomarquez.dev`). The Esem mention is a secondary signal, not a competing CTA.
- No new top-level page or route (Esem already has its own site at `esemprojects.es`).

## Background — what's already in the repo

| Element | Status | File |
|---|---|---|
| `CvWritingChannel.platform` union type | Has `"blog" \| "youtube" \| "linkedin" \| "x" \| "tiktok"`. Missing `"instagram"` | `src/data/cv.ts:25` |
| `basics.urls` | Has `linkedin, github, x, youtube, tiktok, blog?`. Missing `instagram?` | `src/data/cv.ts:40-48` |
| `cv.es.json` / `cv.en.json` `writing.channels[]` | 5 entries (blog, youtube, linkedin, x, tiktok). Missing instagram | `public/cv.es.json:181-207` + `public/cv.en.json` (same shape) |
| `cv.{es,en}.json` `basics.urls` | Same socials as type. Missing instagram URL | `public/cv.{es,en}.json` (top of file) |
| `SocialLinks.astro` | Renders icons for each social in header. Has tiktok | `src/components/layout/SocialLinks.astro` |
| `Writing.astro` | Renders the "Donde comparto lo que aprendo" section using `writing.channels[]`. Icon/label mapper per platform | `src/components/sections/Writing.astro` |
| Vanity redirect pages | `/tiktok`, `/linkedin`, `/youtube`, `/yt` redirect to the respective external profile | `src/pages/{tiktok,linkedin,youtube,yt}/index.astro` |
| Esem Projects mention | **0 references in the entire repo** (verified via grep) | — |

Production site URL: `https://sergiomarquez.dev` (Cloudflare Pages, Astro 5, ES default + `/en/`).

## Tasks — Task 1: Instagram as writing channel

### 1.1 Update type definitions (`src/data/cv.ts`)

- Extend `CvWritingChannel.platform` union to include `"instagram"`:
  ```ts
  platform: "blog" | "youtube" | "linkedin" | "x" | "tiktok" | "instagram";
  ```
- Add optional `instagram?: string` to `basics.urls`:
  ```ts
  urls: {
      site: string;
      linkedin: string;
      github: string;
      x: string;
      youtube: string;
      tiktok: string;
      instagram?: string;
      blog?: string;
  };
  ```

### 1.2 Update CV data files

Both `public/cv.es.json` and `public/cv.en.json`:

- Add `"instagram": "https://www.instagram.com/sergiomarquezp_/"` inside `basics.urls` (after `tiktok`).
- Append a new entry inside `writing.channels[]` (after the tiktok entry):

  ES:
  ```json
  {
      "platform": "instagram",
      "handle": "@sergiomarquezp_",
      "description": "Reels y carruseles sobre IA, agentes y Claude Code"
  }
  ```

  EN:
  ```json
  {
      "platform": "instagram",
      "handle": "@sergiomarquezp_",
      "description": "Reels and carousels about AI, agents and Claude Code"
  }
  ```

### 1.3 Update icon/label mapper in `Writing.astro`

- Read the existing platform → icon mapping (likely a `switch`/lookup keyed on `channel.platform`).
- Add an Instagram case using the same SVG pattern as the existing platforms. Reuse a Lucide / Simple Icons / inline SVG for Instagram consistent with the others (don't introduce a new icon library).
- Add the localized label if there is a label table (e.g. `Instagram` for both locales).
- Verify the icon container styles (size, color, hover) match the other channels.

### 1.4 Update `SocialLinks.astro` (header social row)

- Add an Instagram entry to the social icons rendered in the header, immediately after TikTok (preserve the existing visual order).
- Use `aria-label="Instagram"` for accessibility.
- Source the URL from `basics.urls.instagram` (with a guard since it's optional in the type — use `assertDefined()` helper or a conditional render, never `!`).

### 1.5 (Optional) Vanity redirect `/instagram`

- Mirror the existing `src/pages/{tiktok,linkedin,youtube}/index.astro` pattern: a tiny Astro page that 301-redirects `sergiomarquez.dev/instagram` → `https://www.instagram.com/sergiomarquezp_/`.
- Skip if Sergio doesn't want the vanity URL. Default: **include it**, for parity with the other socials.

## Tasks — Task 2: Esem Projects mention

This task has a design decision: **where** to mention Esem. Pick option A unless Sergio prefers otherwise.

### Option A (recommended) — One-liner inside the About narrative

In the existing "Backend reconvertido a IA" / About section (`region "Backend reconvertido a IA"` in the rendered DOM, look for the corresponding section component), append a short sentence at the end of the existing summary:

ES:
> "También dirijo [Esem Projects](https://esemprojects.es), agencia de IA aplicada para clínicas en España."

EN:
> "I also run [Esem Projects](https://esemprojects.es), an applied-AI agency for clinics in Spain."

Implementation:
- The summary lives in `cv.{es,en}.json` `basics.summary`. Append the sentence to the existing string (with a leading space).
- Verify the rendering component supports inline links inside the summary. If it renders as plain text, either (a) extend the component to render markdown-light links (overkill) or (b) move the mention to its own field.
- Cleaner alternative: add a new optional field to the CV type (e.g. `basics.alsoRunning?: { name: string; url: string; description: string }`) and render it as a small line under the summary, styled muted. This avoids markdown-in-summary parsing.

### Option B — Footer line

Add a single muted line in the footer ("Sergio Márquez · also building Esem Projects") with a link to `esemprojects.es`. Lower visibility, lower commitment, but less editorial.

### Option C — Dedicated card in the "Cosas que he construido" projects section

Add Esem Projects as a project card with `featured: true`. Higher visibility but reframes Esem as "another project I built" rather than "the agency I currently run". Probably wrong framing.

**Pick Option A.** The agency is current, ongoing, and Sergio's main commercial vehicle — the About narrative is where it belongs. If Option A's implementation friction (inline link in JSON-rendered summary) is high, fall back to the `alsoRunning` typed field variant of Option A.

## Constraints (from this repo's CLAUDE.md)

- MUST run `pnpm run validate` before considering complete (type-check + lint + test + build).
- NEVER use `!` non-null assertions — Biome will fail. Use type narrowing or `assertDefined()` helpers.
- LF line endings only. On Windows verify with `git diff --ignore-cr-at-eol --name-only` before committing.
- Update `README.md` and `CHANGELOG.md` if the changes affect data flow or documented features. For this work: a CHANGELOG entry under `[Unreleased]` is appropriate. README probably untouched.
- i18n route duplication is intentional (`src/pages/index.astro` and `src/pages/en/index.astro` are identical) — do not deduplicate.

## Done criteria

- [ ] `CvWritingChannel.platform` includes `"instagram"`.
- [ ] `basics.urls` type has `instagram?: string`.
- [ ] Both `cv.es.json` and `cv.en.json` have an `instagram` URL in `basics.urls` and an `instagram` channel in `writing.channels[]` (with localized description).
- [ ] `Writing.astro` renders the new Instagram channel with an icon and label, visually consistent with the existing channels.
- [ ] `SocialLinks.astro` renders an Instagram icon in the header with `aria-label="Instagram"` linking to the IG profile.
- [ ] (Optional but recommended) `/instagram` vanity redirect added.
- [ ] Esem Projects mentioned in the About section (Option A) with a working link to `https://esemprojects.es`, in both ES and EN.
- [ ] `pnpm run validate` passes (type-check + lint + test + build all green).
- [ ] `CHANGELOG.md` entry added under `[Unreleased]`.
- [ ] Manual smoke test: dev server, scroll to Writing section, confirm Instagram visible; scroll to About, confirm Esem mention visible. Toggle to `/en/`, confirm both render in English.

## Branch + commit suggestion

```bash
git checkout -b feat/instagram-channel-and-esem-mention
# implement tasks
pnpm run validate
git add -p   # don't blanket-add — review each hunk
git commit -m "feat(cv): add Instagram channel and Esem Projects mention"
```

Conventional commit; no Co-Authored-By per Sergio's global rules.

## Out of scope (explicitly)

- Building `sergiomarquez.dev/links` (a Linktree-style page consolidating all destinations). That's a separate larger plan; mentioned here for context only because it was discussed in the originating session.
- Updating `esemprojects.es` to reciprocate the link to `sergiomarquez.dev`. Different repo.
- Any redesign of the About, Writing, or social-row sections beyond the additive changes specified.
- Adding YouTube Shorts, X threads strategy, or any non-Instagram social.
