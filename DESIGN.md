---
name: sergiomarquez.dev
description: Personal stationery printed in two inks, a business card front, a letter sheet of work, and a teal-flooded card back.
colors:
  paper: "#fafaf9"
  ink: "#1c1917"
  ink-secondary: "#57534e"
  identity-teal: "#0d4b4d"
  state-coral: "#c2410c"
  state-coral-pressed: "#9a3412"
  mark-orange: "#f97316"
  rule: "#d6d3d1"
  flood-teal: "#0d4b4d"
  flood-ink: "#fafaf9"
  flood-ink-secondary: "#b9d3d0"
  flood-coral: "#fdba74"
  paper-dark: "#0c0a09"
  ink-dark: "#f5f5f4"
  ink-secondary-dark: "#a8a29e"
  identity-teal-dark: "#70abab"
  state-coral-dark: "#fb923c"
  state-coral-pressed-dark: "#fdba74"
  rule-dark: "#44403c"
typography:
  display:
    fontFamily: "Space Grotesk, Space Grotesk Fallback, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.7rem + 5.6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Instrument Serif, Instrument Serif Fallback, Georgia, serif"
    fontSize: "clamp(2rem, 1.5rem + 2.1vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: "Space Grotesk, Space Grotesk Fallback, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.34rem + 1.2vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Instrument Serif, Instrument Serif Fallback, Georgia, serif"
    fontSize: "clamp(1.375rem, 1.16rem + 0.9vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.3
  title:
    fontFamily: "Space Grotesk, Space Grotesk Fallback, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.13rem + 0.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "Space Grotesk, Space Grotesk Fallback, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.01rem + 0.22vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  body-strong:
    fontFamily: "Space Grotesk, Space Grotesk Fallback, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.01rem + 0.22vw, 1.1875rem)"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "Space Grotesk, Space Grotesk Fallback, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.84rem + 0.15vw, 0.9375rem)"
    fontWeight: 600
    lineHeight: 1.6
  meta:
    fontFamily: "Space Grotesk, Space Grotesk Fallback, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.84rem + 0.15vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0"
spacing:
  s-1: "0.5rem"
  s-2: "1rem"
  s-3: "1.5rem"
  s-4: "2rem"
  s-6: "3rem"
  s-8: "4rem"
  section: "clamp(4rem, 2.5rem + 6vw, 8rem)"
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 3rem)"
  container: "72rem"
  measure: "62ch"
components:
  text-link:
    textColor: "{colors.ink}"
  text-link-hover:
    textColor: "{colors.state-coral}"
  text-link-active:
    textColor: "{colors.state-coral-pressed}"
  email-primary:
    textColor: "{colors.identity-teal}"
    typography: "{typography.title}"
  email-primary-hover:
    textColor: "{colors.state-coral}"
  section-head:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
  index-row:
    padding: "1.5rem 0"
    rounded: "{rounded.none}"
  card-back-flood:
    backgroundColor: "{colors.flood-teal}"
    textColor: "{colors.flood-ink}"
    padding: "clamp(4rem, 2.5rem + 6vw, 8rem) 0"
    rounded: "{rounded.none}"
  language-switch:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  monogram:
    width: "3.6rem"
    height: "2rem"
---

# Design System: sergiomarquez.dev

## Overview

**Creative North Star: "Two-Ink Personal Stationery"**

The site is Sergio's printed stationery at screen scale. The first viewport is the front of a business card: the name at full width in teal ink, the tagline in secondary ink, a serif statement on the left and a working contact block (email first, then six channels with handles) set on a diagonal at the card's bottom edge, closed by a 1px rule. Below it runs the letter sheet (About, Projects, Experience), and the page ends on the card's reverse: a single full-bleed teal flood carrying the email again.

Two inks do the work, warm black for text and teal for identity, on uncoated warm-white paper. Coral is a third, state-only ink. Corners are square, nothing casts a shadow, there are no cards, chips or icons: type, weight, ink and a twelve-column grid carry all hierarchy. Density is calm and textual; every section head hangs in a left margin column and stays pinned while its section scrolls past.

The world is shared with One dAIly Blog (same faces, same warm-neutral base) without its mono kickers, accent italics or cream ground. Dark mode follows `prefers-color-scheme` only, by swapping the token block; no component carries its own colors.

**Key Characteristics:**
- Warm-white paper, warm-black ink, teal identity ink, coral state ink.
- Space Grotesk for everything structural; Instrument Serif (regular, never italic) for statements and ledes only.
- Square corners, flat surfaces, 1px rules as the only dividers.
- Hanging, sticky section heads in a 3-of-12 margin column.
- Two-step overprint motion (90ms, `steps(2)`), no easing curves.
- One flood panel per page: the teal card back.

## Colors

A restrained two-ink palette on warm neutrals, with one state ink held in reserve.

### Primary
- **Identity Teal** (`identity-teal`): the identity layer. The display name, the 404 code, the featured project name, the current role title, the primary email link, list and disclosure markers, the text selection fill and native `accent-color`. Lightens to `identity-teal-dark` in dark mode.

### Secondary
- **State Coral** (`state-coral`): state only. Hover and focus color of every link and summary, the 2px focus outline, and the 2px underline of the email link (the one place it appears at rest in text). `state-coral-pressed` is the `:active` color.
- **Mark Orange** (`mark-orange`): the square in the S■M monogram and nowhere else. Same value in both schemes; decorative, never text.

### Neutral
- **Paper** (`paper`): page ground; also `theme-color`.
- **Ink** (`ink`): running text, headings, link text at rest.
- **Secondary Ink** (`ink-secondary`): tagline, meta lines, contact labels and channel descriptions, past-role headlines, company and certification headings.
- **Rule** (`rule`): every 1px divider (index rows, role rows, card edge, certification list, 404 block split).

### Flood (card back)
- **Flood Teal** (`flood-teal`) with **Flood Ink** (`flood-ink`), **Flood Secondary Ink** (`flood-ink-secondary`) and **Flood Coral** (`flood-coral`). Identical in light and dark. The footer re-maps `--ink`, `--ink-2`, `--accent` and `--accent-strong` to these, so every shared component re-inks itself inside the flood without its own rules; selection inverts to paper on teal.

### Named Rules
**The Third Ink Rule.** Coral marks state. At rest it appears only on the monogram square and the email underline; everything else turns coral only on hover, focus or press.

**The Token Block Rule.** Colors and `prefers-color-scheme` live only in the `:root` token block of `global.css`. Components reference tokens; none declares a hex or a scheme query. The one exception is the pair of `theme-color` meta tags in the document head, which must mirror `paper` and `paper-dark` as literals.

**The Single Flood Rule.** One full-bleed teal panel per page, the footer. No other section gets a background.

## Typography

**Display Font:** Space Grotesk (variable 300 to 700, metric-matched Arial fallback)
**Serif Font:** Instrument Serif 400 regular (metric-matched Georgia fallback)

**Character:** A geometric grotesk with a slight engineering edge sets the name, structure and data; a narrow, high-contrast serif speaks in the first person. Both are self-hosted, latin subset, `font-display: swap`, with size-adjusted fallbacks so the line box does not shift.

### Hierarchy
- **Display** (700, `--step-4`, 0.95, -0.035em, teal): the name on the card front and the 404 code. One per page.
- **Statement** (serif 400, `--step-3`, 1.1, max 18em): the presentation sentence on the card front.
- **Headline** (600, `--step-2`, 1.1, -0.02em): section heads and the footer head.
- **Lede** (serif 400, `--step-lede`, 1.3): About summary (max 34em), featured project headline, 404 message.
- **Title** (600, `--step-1`, 1.1 to 1.3): featured project name, primary email link.
- **Body** (400, `--step-0`, 1.6, max `--measure`): all running text, one size.
- **Body Strong** (600, `--step-0`, 1.3): project and role names in index rows, company and certification heads.
- **Label** (600, `--step--1`): contact labels, language switch, disclosure summaries.
- **Meta** (400, `--step--1`, secondary ink): stacks, periods, open-source note, channel descriptions.

Dates and periods use tabular numerals.

### Named Rules
**The One Running Size Rule.** All running text (summaries, highlights, descriptions) is set at `--step-0` and capped at 62ch; hierarchy comes from weight, ink and position, not more sizes.

**The Upright Serif Rule.** Instrument Serif is regular weight and upright only, and only for statement and lede roles. No italic accents.

## Layout

A centered container (`--container` 72rem, fluid `--gutter` padding). From 56rem up, sections use a twelve-column grid with a `--s-3` column gap: the section head occupies columns 1 to 3, is `position: sticky` at `top: --s-4`, and the body runs columns 4 to 12. Project index rows split their nine body columns 3 + 6 (name, then headline and stack). Below 56rem everything stacks in one column and heads sit above their body with a `--s-3` gap.

The card front (Intro) fills `min(100svh - 4rem, 52rem)` on desktop: name and tagline across the top, statement in columns 1 to 6 and the contact block in 7 to 12 aligned to the bottom, then a full-width 1px rule as the card edge. Contact rows are a 5.5rem label column plus value; under 36rem the email row drops its label column so the address gets the full width.

Vertical rhythm: sections are separated by `--section` (4 to 8rem fluid). All spacing is a whole multiple of the 8px module (`--s-1` to `--s-8`); no loose values. The header is a 4rem bar: monogram left, language link right.

## Elevation & Depth

Fully flat. No `box-shadow` anywhere; depth is conveyed by ink density (full ink for current, secondary ink for past and meta), 1px rules, and the single teal flood for the card back. Sticky section heads give the only sense of layering, by staying in place rather than lifting.

### Named Rules
**The Printed Surface Rule.** Nothing floats above the paper: no shadows, no overlays, no blurred backdrops.

## Shapes

Square corners throughout (`--radius: 0`, also applied to the focus outline). Dividers are 1px solid rules in `rule` (on the flood, `ink-secondary` re-mapped). Underlines are the main line work: 1px at rest with a 0.2em offset, 2px on hover and focus, 2px coral permanently on the email. Lists use an en-dash marker in teal. The only filled geometry is the monogram square.

## Components

### Links
Every link is underlined text. Rest: inherits text color, 1px underline in `currentColor`. Hover and focus: `state-coral` and a 2px underline, transitioned with `--step-motion` (90ms, `steps(2, jump-none)`) so the change prints in two frames. Active: `state-coral-pressed`. Focus also draws a 2px coral outline at 3px offset, the most visible thing on the page while it exists.

### Email Link (signature)
A `mailto:` whose visible text is the address, with a `<wbr>` after "@" so narrow columns break before the domain. Unstyled itself; each context sets it. On the card front: Title size, teal, 2px coral underline. On the card back: the largest text in the panel, `clamp(--step-1, 8vw, --step-3)` 600, tight leading, 2px flood-coral underline.

### Contact Block
A list of label/value rows on a 5.5rem label grid: Label-style secondary-ink name, then a handle link with a Meta description beneath. The email row comes first and larger. Channels are named in text, never with icons.

### Section Head
Headline style, hung in the margin column and sticky on wide screens. It is the real section title (an `h2`), not a decorative label above one.

### Project Index
The featured project leads: teal Title name, serif Lede headline, Meta stack joined by " · ", then its bare URL. The rest form rule-separated rows (`--s-3` block padding): name in Body Strong, optional "open source" Meta, then Body headline and Meta stack. Closed by a ruled "more on GitHub" link.

### Experience Rows
Roles grouped under a secondary-ink company head. The current role is in full ink with a teal title and all highlights and stack shown; past roles use secondary-ink headlines and fold their detail into a `<details>` with a Label-style summary and teal marker.

### Card Back (Footer)
The teal flood with section-grid head, a secondary line, the large email, a wrapping row of channel links in 600, and a colophon (language switch and copyright) above a 1px secondary rule.

### Navigation
No nav menu. The header holds only the S■M monogram (72:40 SVG, letters in `currentColor`, square in `mark-orange`, 3.6 x 2rem, links home) and a text language switch ("English" / "Español") with `lang` and `hreflang`.

## Do's and Don'ts

### Do:
- **Do** take every color from the token block; let the footer's re-mapping re-ink shared components.
- **Do** keep running text at `--step-0` with a 62ch measure and build hierarchy from weight, ink and position.
- **Do** space in whole 8px units (`--s-1` to `--s-8`, `--section`).
- **Do** hang section heads in columns 1 to 3 and keep them sticky on wide screens.
- **Do** transition state with `--step-motion` only, and let `prefers-reduced-motion` remove it.
- **Do** give the current item full ink and teal, and past items secondary ink with folded detail.

### Don't:
- **Don't** use coral at rest outside the monogram square and the email underline.
- **Don't** add shadows, rounded corners, cards, chips or pills; stacks are " · "-joined text.
- **Don't** add icons; channels and actions are named in text. The monogram is the only graphic.
- **Don't** add a second flood panel or tint a section background.
- **Don't** set Instrument Serif in italic, or use it for headings, labels or body.
- **Don't** add mono labels or small caps kickers above headings.
- **Don't** write `prefers-color-scheme` or a hex value inside a component stylesheet (only the head `theme-color` metas mirror paper as literals).
