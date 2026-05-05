# Plan: Rediseño Portfolio — Marca Personal IA

> **Para agentes:** ejecutar tarea por tarea con checkpoints de review entre tareas. Steps usan `- [ ]`.

**Goal:** Rediseñar el portfolio personal de Sergio Márquez con identidad de marca "Ingeniero IA aplicada" (dark + lime accent + serif editorial), reemplazando el look "CV plano" actual.

**Architecture:** Astro 5 SSG + Tailwind v4 + CSS vars custom. Mantenemos i18n actual, datos en `cv.{es,en}.json`, sin frameworks UI. Añadimos componentes nuevos para hero/impact bar/casos/writing y migramos design tokens a dark theme con acento lime.

**Tech Stack:** Astro 5, Tailwind v4, Vitest, TypeScript, Geist/Instrument Serif/JetBrains Mono.

**Spec:** `plans/2026-05-05-redesign-ai-brand-spec.md`

**Branch:** `feat/redesign-ai-brand`

---

## Convenciones de ejecución

1. **Después de cada tarea:** `pnpm run type-check && pnpm run lint && pnpm run test`. Si pasa → commit. Si falla → arreglar antes de seguir.
2. **Commits:** conventional commits, sin `Co-Authored-By`.
3. **Build final** se hace al cerrar todas las tareas (`pnpm run validate`).
4. **No tocar:** `astro.config.mjs` salvo Task 2, sistema i18n, redirects sociales.
5. Si Biome marca diff de CRLF/LF en Windows, ignorar (`git diff --ignore-cr-at-eol`).

---

## Task 1: Extender tipos del CV con campos opcionales

**Files:**
- Modify: `src/data/cv.ts`
- Modify: `src/data/__tests__/cv.test.ts`

- [ ] **Step 1: Leer estado actual de `cv.ts`**

Identificar la `interface CvData`. Comprobar exports.

- [ ] **Step 2: Añadir interfaces nuevas**

En `src/data/cv.ts`, después de las interfaces existentes y antes de `export interface CvData`, añadir:

```ts
export interface CvMetric {
  value: string;
  label: string;
  context?: string;
}

export interface CvKpi {
  value: string;
  label: string;
}

export interface CvStatus {
  available: boolean;
  label: string;
}

export interface CvWritingChannel {
  platform: "blog" | "youtube" | "linkedin" | "x" | "tiktok";
  handle: string;
  description: string;
}

export interface CvWriting {
  blogUrl: string;
  channels: CvWritingChannel[];
}
```

- [ ] **Step 3: Extender `CvData["basics"]`, experience y projects**

Añadir como **opcionales** a las interfaces:

```ts
// dentro de basics:
headline?: string;
stackChips?: string[];
status?: CvStatus;

// dentro de cada experience entry:
headline?: string;
kpis?: CvKpi[];

// dentro de cada project:
featured?: boolean;
kpi?: CvKpi;

// a nivel raíz de CvData:
metrics?: CvMetric[];
writing?: CvWriting;
```

- [ ] **Step 4: Actualizar test de schema**

En `src/data/__tests__/cv.test.ts`, añadir un nuevo `it()` que verifique que **si** estos campos existen, lo hacen en ambos locales con la misma estructura. Patrón:

```ts
it("optional brand fields exist in both locales when present", () => {
  const es = getCv("es");
  const en = getCv("en");
  expect(!!es.metrics).toBe(!!en.metrics);
  expect(!!es.writing).toBe(!!en.writing);
  expect(!!es.basics.headline).toBe(!!en.basics.headline);
  expect(!!es.basics.stackChips).toBe(!!en.basics.stackChips);
  expect(!!es.basics.status).toBe(!!en.basics.status);
  if (es.metrics && en.metrics) {
    expect(es.metrics.length).toBe(en.metrics.length);
  }
  if (es.writing && en.writing) {
    expect(es.writing.channels.length).toBe(en.writing.channels.length);
  }
});
```

- [ ] **Step 5: Run tests**

```bash
pnpm run type-check && pnpm test
```

Expected: PASS (los nuevos campos son opcionales, los datos actuales no los tienen, test no falla).

- [ ] **Step 6: Commit**

```bash
git add src/data/cv.ts src/data/__tests__/cv.test.ts
git commit -m "feat(cv): extend types with optional brand fields (metrics, kpis, writing, status)"
```

---

## Task 2: Poblar `cv.es.json` y `cv.en.json` con los nuevos campos

**Files:**
- Modify: `public/cv.es.json`
- Modify: `public/cv.en.json`

- [ ] **Step 1: Editar `cv.es.json` — añadir bloque `metrics`**

A nivel raíz, después de `experience`:

```json
"metrics": [
  {
    "value": "−35%",
    "label": "coste infraestructura",
    "context": "Migración del chat a arquitectura agéntica con Google ADK + LiteLLM"
  },
  {
    "value": "70 → 90%",
    "label": "validación de documentos",
    "context": "Ensemble GPT + Claude + Gemini con OCR ajustado"
  },
  {
    "value": "8–10h",
    "label": "ahorradas por configuración",
    "context": "Automatización de ingesta RAG con n8n + Python (Sheets → MongoDB + Pinecone)"
  },
  {
    "value": "−15%",
    "label": "latencia del chat",
    "context": "Migración a Google ADK con LiteLLM"
  }
]
```

- [ ] **Step 2: `cv.es.json` — extender `basics`**

Añadir dentro de `basics` (después de `summary`):

```json
"headline": "Llevo IA a producción con métricas, no demos.",
"stackChips": ["Python", "FastAPI", "LLMs", "RAG", "n8n", "GCP"],
"status": {
  "available": true,
  "label": "Disponible para nuevas oportunidades"
}
```

- [ ] **Step 3: `cv.es.json` — añadir `headline` y `kpis` al primer experience**

Al primer item de `experience` (Desarrollador IA/ML, May 2025 – Presente), añadir:

```json
"headline": "Ingeniero IA aplicada con backend de producción: RAG, agentes y automatización con métricas reales.",
"kpis": [
  { "value": "−35%", "label": "coste infra" },
  { "value": "+20pp", "label": "validación" },
  { "value": "8–10h", "label": "/config" }
]
```

Al segundo experience (Full-Stack), añadir:

```json
"headline": "Backend Java/Spring con liderazgo en migración a GKE y CI/CD.",
"kpis": [
  { "value": "GKE", "label": "migración liderada" },
  { "value": "3 meses", "label": "Dublín 2022" }
]
```

Al tercero (Prácticas), no añadir kpis (el tamaño visual lo distingue).

- [ ] **Step 4: `cv.es.json` — marcar projects featured y añadir kpi**

- One dAIly Blog: añadir `"featured": true, "kpi": { "value": "1/día", "label": "post autónomo" }`
- AI Photo Transformer: `"featured": false, "kpi": { "value": "Multi-IA", "label": "pipeline" }`
- Video Transcriber: sin kpi (tag implícito CUDA)
- Resto: sin cambios.

- [ ] **Step 5: `cv.es.json` — añadir bloque `writing`**

A nivel raíz, antes de `certifications`:

```json
"writing": {
  "blogUrl": "https://blog.sergiomarquez.dev",
  "channels": [
    {
      "platform": "blog",
      "handle": "blog.sergiomarquez.dev",
      "description": "Notas técnicas sobre IA aplicada y backend en producción"
    },
    {
      "platform": "youtube",
      "handle": "@sergiomarquezp",
      "description": "Tutoriales y casos prácticos de IA"
    },
    {
      "platform": "linkedin",
      "handle": "in/sergiomarquezp",
      "description": "Reflexiones sobre ingeniería IA"
    },
    {
      "platform": "x",
      "handle": "@sergiomarquezp_",
      "description": "Notas cortas y descubrimientos diarios"
    },
    {
      "platform": "tiktok",
      "handle": "@sergiomarquezp_",
      "description": "Pills cortas de IA"
    }
  ]
}
```

- [ ] **Step 6: Replicar todo en `cv.en.json` con traducciones**

Mismo árbol estructural, traduciendo:

- `metrics[].label` y `.context` → inglés
- `basics.headline` → "I ship AI to production with metrics, not demos."
- `basics.status.label` → "Available for new opportunities"
- `experience[].headline`:
  - IA/ML: "Applied AI engineer with production backend: RAG, agents, and automation with real metrics."
  - Full-Stack: "Java/Spring backend leading GKE migration and CI/CD."
- `experience[].kpis[].label`: "infra cost", "validation", "/config", "led migration", "Dublin 2022"
- `projects[].kpi.label`: "autonomous post", "pipeline"
- `writing.channels[].description` → inglés equivalente

`stackChips` y `kpi.value` (números/símbolos) idénticos.

- [ ] **Step 7: Run tests**

```bash
pnpm test
```

Expected: PASS. El nuevo test añadido en Task 1 verifica parity de los nuevos campos.

- [ ] **Step 8: Commit**

```bash
git add public/cv.es.json public/cv.en.json
git commit -m "feat(cv): populate new brand data (metrics, kpis, writing, status) in both locales"
```

---

## Task 3: Migrar design tokens a dark theme con acento lime

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Leer `global.css` actual**

Identificar bloque `:root` con CSS vars existentes.

- [ ] **Step 2: Reemplazar bloque `:root` completo**

Sustituir todas las vars de color por:

```css
:root {
  /* Backgrounds */
  --bg: #0A0A0B;
  --bg-elevated: #111113;
  --bg-subtle: #1A1A1D;
  --bg-overlay: rgba(10, 10, 11, 0.8);

  /* Text */
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1AA;
  --text-tertiary: #71717A;

  /* Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --border-accent: rgba(163, 230, 53, 0.4);

  /* Accent (lime) */
  --accent: #A3E635;
  --accent-hover: #BEF264;
  --accent-muted: rgba(163, 230, 53, 0.10);
  --accent-glow: rgba(163, 230, 53, 0.18);
  --accent-text: #BEF264;

  /* Backwards-compat aliases (will be removed once migration done) */
  --background: var(--bg);
  --primary-text: var(--text-primary);
  --secondary-text: var(--text-secondary);
  --tertiary-text: var(--text-tertiary);
  --border-color: var(--border);
  --surface: var(--bg-elevated);
  --surface-alt: var(--bg-subtle);
  --spotlight-color: var(--accent-muted);

  /* Typography families */
  --font-sans: "Geist Variable", system-ui, sans-serif;
  --font-serif: "Instrument Serif", "Times New Roman", serif;
  --font-mono: "JetBrains Mono Variable", "SF Mono", Menlo, monospace;
  --font-family-sans: var(--font-sans); /* alias */

  /* Type scale (Major Third 1.25) — sin cambios estructurales */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-display: 4.5rem;

  /* Rhythm */
  --base-lh: 1.55;
  --rhythm: calc(1rem * var(--base-lh));
}

html, body {
  background-color: var(--bg);
  color: var(--text-primary);
}
```

Mantener todo lo demás del fichero (resets, `.section-title`, `.card-interactive`, `.sr-only`, `.tabular-nums`, `.delay-*`, `@keyframes`).

- [ ] **Step 3: Actualizar `.card-interactive` para dark**

Sustituir:

```css
.card-interactive {
  transition: background-color 200ms ease, border-color 200ms ease, transform 200ms ease;
  border: 1px solid var(--border);
  background-color: var(--bg-elevated);
}
.card-interactive:hover {
  background-color: var(--bg-subtle);
  border-color: var(--border-strong);
}
```

- [ ] **Step 4: Añadir utility para acento lime en focus**

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

- [ ] **Step 5: Verificar que el sitio sigue arrancando**

```bash
pnpm run dev
```

Visual: aún saldrá roto en componentes que tengan colores hardcoded — eso se arregla en tareas siguientes. Solo confirmar que **arranca sin errores de build**. Cerrar dev server.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(theme): migrate design tokens to dark theme with lime accent"
```

---

## Task 4: Cargar tipografías nuevas (Instrument Serif + JetBrains Mono)

**Files:**
- Create: `public/fonts/InstrumentSerif-Regular.woff2` (descarga manual)
- Create: `public/fonts/InstrumentSerif-Italic.woff2`
- Create: `public/fonts/JetBrainsMono-var.woff2`
- Modify: `src/styles/global.css`
- Modify: `src/components/BaseHead.astro`

- [ ] **Step 1: Descargar fuentes**

Descargar de fuentes oficiales:
- Instrument Serif (regular + italic): https://fonts.google.com/specimen/Instrument+Serif (variantes regular y italic, weight 400)
- JetBrains Mono variable: https://github.com/JetBrains/JetBrainsMono/releases (último release, archivo `JetBrainsMono[wght].woff2` o similar variable)

Convertir a `.woff2` si no lo están (usar `fonttools` o `wakamai-fondue` web). Subset latin (suficiente para ES/EN).

Colocar en `public/fonts/`:
- `InstrumentSerif-Regular.woff2`
- `InstrumentSerif-Italic.woff2`
- `JetBrainsMono-var.woff2`

Si descargar/subsettear es bloqueante, **fallback aceptable**: usar `@fontsource/instrument-serif` y `@fontsource-variable/jetbrains-mono` vía npm e importar desde el CSS. En ese caso ajustar Step 2.

- [ ] **Step 2: Añadir `@font-face` en `global.css`**

Al inicio del fichero, después del `@font-face` existente de Geist:

```css
@font-face {
  font-family: "Instrument Serif";
  src: url("/fonts/InstrumentSerif-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Instrument Serif";
  src: url("/fonts/InstrumentSerif-Italic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "JetBrains Mono Variable";
  src: url("/fonts/JetBrainsMono-var.woff2") format("woff2-variations");
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: NO preloadar Serif ni Mono**

Solo Geist sigue preloaded en `BaseHead.astro` (es la fuente del cuerpo, crítica para LCP). Las otras dos cargan con `font-display: swap`.

- [ ] **Step 4: Build de verificación**

```bash
pnpm run build
```

Expected: build OK, las nuevas fuentes copiadas a `dist/fonts/`.

- [ ] **Step 5: Commit**

```bash
git add public/fonts/ src/styles/global.css
git commit -m "feat(fonts): add Instrument Serif and JetBrains Mono variable fonts"
```

---

## Task 5: Crear primitivos UI — `MetricKpi`, `StackChip`, `StatusBadge`

**Files:**
- Create: `src/components/ui/MetricKpi.astro`
- Create: `src/components/ui/StackChip.astro`
- Create: `src/components/ui/StatusBadge.astro`

- [ ] **Step 1: `MetricKpi.astro`**

```astro
---
interface Props {
  value: string;
  label: string;
  context?: string;
  size?: "sm" | "md" | "lg";
}
const { value, label, context, size = "md" } = Astro.props;
---
<div class={`kpi kpi--${size}`}>
  <div class="kpi__value tabular-nums">{value}</div>
  <div class="kpi__label">{label}</div>
  {context && <div class="kpi__context">{context}</div>}
</div>

<style>
  .kpi {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .kpi__value {
    font-family: var(--font-mono);
    font-weight: 500;
    color: var(--accent);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .kpi--sm .kpi__value { font-size: var(--text-2xl); }
  .kpi--md .kpi__value { font-size: var(--text-4xl); }
  .kpi--lg .kpi__value { font-size: var(--text-5xl); }
  .kpi__label {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    text-transform: lowercase;
    letter-spacing: 0.01em;
  }
  .kpi__context {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    line-height: 1.5;
    margin-top: 0.25rem;
  }
</style>
```

- [ ] **Step 2: `StackChip.astro`**

```astro
---
interface Props {
  label: string;
  variant?: "default" | "accent";
}
const { label, variant = "default" } = Astro.props;
---
<span class={`chip chip--${variant}`}>{label}</span>

<style>
  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.625rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
    background-color: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 999px;
    line-height: 1.4;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .chip--accent {
    color: var(--accent-text);
    border-color: var(--border-accent);
    background-color: var(--accent-muted);
  }
</style>
```

- [ ] **Step 3: `StatusBadge.astro`**

```astro
---
interface Props {
  available: boolean;
  label: string;
}
const { available, label } = Astro.props;
---
<div class={`status ${available ? "status--available" : ""}`}>
  <span class="status__dot" aria-hidden="true"></span>
  <span class="status__label">{label}</span>
</div>

<style>
  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-secondary);
    background-color: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 999px;
    letter-spacing: 0.02em;
  }
  .status__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background-color: var(--text-tertiary);
  }
  .status--available .status__dot {
    background-color: var(--accent);
    box-shadow: 0 0 0 0 var(--accent-glow);
    animation: status-pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .status--available .status__label {
    color: var(--text-primary);
  }
  @keyframes status-pulse {
    0%, 100% { box-shadow: 0 0 0 0 var(--accent-glow); }
    50% { box-shadow: 0 0 0 6px transparent; }
  }
  @media (prefers-reduced-motion: reduce) {
    .status--available .status__dot { animation: none; }
  }
</style>
```

- [ ] **Step 4: Type-check**

```bash
pnpm run type-check
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): add MetricKpi, StackChip and StatusBadge primitives"
```

---

## Task 6: Crear `DotGrid.astro` — canvas decorativo del hero

**Files:**
- Create: `src/components/ui/DotGrid.astro`

- [ ] **Step 1: Componente con canvas y script vanilla**

```astro
---
// Decorative animated dot grid for hero. Pure vanilla, ~1KB minified.
// Respects prefers-reduced-motion and disables on touch/small viewports.
---
<canvas class="dotgrid" aria-hidden="true"></canvas>

<script>
  type Dot = { x: number; y: number; baseAlpha: number; phase: number };

  function init() {
    const canvas = document.querySelector<HTMLCanvasElement>(".dotgrid");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!desktop) {
      canvas.style.display = "none";
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;

    const SPACING = 28;
    const ACCENT = "163, 230, 53";

    function resize() {
      if (!canvas || !ctx) return;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      dots = [];
      for (let y = SPACING; y < height; y += SPACING) {
        for (let x = SPACING; x < width; x += SPACING) {
          dots.push({
            x,
            y,
            baseAlpha: 0.06 + Math.random() * 0.04,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function draw(t: number) {
      if (!canvas || !ctx) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const dx = d.x - mouseX;
        const dy = d.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 140);
        const pulse = reduced ? 0 : Math.sin(t * 0.0008 + d.phase) * 0.02;
        const alpha = d.baseAlpha + pulse + proximity * 0.5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2 + proximity * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return;
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function onLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
</script>

<style>
  .dotgrid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    opacity: 0.9;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }
  @media (max-width: 1023px) {
    .dotgrid { display: none; }
  }
</style>
```

- [ ] **Step 2: Type-check**

```bash
pnpm run type-check
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/DotGrid.astro
git commit -m "feat(ui): add decorative animated dot grid for hero"
```

---

## Task 7: Crear `Hero.astro` — nueva sección hero

**Files:**
- Create: `src/components/sections/Hero.astro`

- [ ] **Step 1: Implementar componente**

```astro
---
import type { CvData } from "../../data/cv";
import StackChip from "../ui/StackChip.astro";
import StatusBadge from "../ui/StatusBadge.astro";
import DotGrid from "../ui/DotGrid.astro";
import type { Locale } from "../../i18n";

interface Props {
  basics: CvData["basics"];
  locale: Locale;
}
const { basics, locale } = Astro.props;
const headline = basics.headline ?? basics.tagline;
const stack = basics.stackChips ?? [];
const eyebrow = locale === "en" ? "// AI Engineer · Backend · Automation" : "// Ingeniería IA · Backend · Automatización";
const sub = basics.summary;
const ctaPrimary = locale === "en" ? "Let's talk" : "Hablemos";
const ctaSecondary = locale === "en" ? "See cases" : "Ver casos";
---
<section class="hero" aria-labelledby="hero-headline">
  <DotGrid />
  <div class="hero__inner">
    {basics.status && (
      <div class="hero__status">
        <StatusBadge available={basics.status.available} label={basics.status.label} />
      </div>
    )}
    <p class="hero__eyebrow">{eyebrow}</p>
    <h1 id="hero-headline" class="hero__headline">{headline}</h1>
    {sub && <p class="hero__sub">{sub}</p>}
    {stack.length > 0 && (
      <ul class="hero__stack" aria-label="Stack">
        {stack.map((s) => <li><StackChip label={s} /></li>)}
      </ul>
    )}
    <div class="hero__ctas">
      <a class="btn btn--primary" href={`mailto:${basics.email}`}>{ctaPrimary} →</a>
      <a class="btn btn--ghost" href="#cases">{ctaSecondary} ↓</a>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding: clamp(3rem, 8vw, 6rem) 0 clamp(3rem, 6vw, 5rem);
    isolation: isolate;
    overflow: hidden;
  }
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-muted), transparent 70%);
    pointer-events: none;
    z-index: -1;
  }
  .hero__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 56rem;
  }
  .hero__status { margin-bottom: 0.5rem; }
  .hero__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-text);
    margin: 0;
    letter-spacing: 0.02em;
  }
  .hero__headline {
    font-family: var(--font-serif);
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 400;
    line-height: 1.05;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.02em;
  }
  .hero__sub {
    font-family: var(--font-sans);
    font-size: var(--text-lg);
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0;
    max-width: 42rem;
  }
  .hero__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
  }
  .hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem 1.25rem;
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    font-weight: 500;
    border-radius: 999px;
    text-decoration: none;
    transition: all 200ms ease;
    border: 1px solid transparent;
  }
  .btn--primary {
    background-color: var(--accent);
    color: #0A0A0B;
  }
  .btn--primary:hover {
    background-color: var(--accent-hover);
    transform: translateY(-1px);
  }
  .btn--ghost {
    color: var(--text-primary);
    border-color: var(--border-strong);
    background-color: transparent;
  }
  .btn--ghost:hover {
    background-color: var(--bg-elevated);
    border-color: var(--text-secondary);
  }
</style>
```

- [ ] **Step 2: Type-check**

```bash
pnpm run type-check
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.astro
git commit -m "feat(sections): add Hero with serif headline, status badge and dot grid"
```

---

## Task 8: Crear `ImpactBar.astro` — banda de KPIs

**Files:**
- Create: `src/components/sections/ImpactBar.astro`

- [ ] **Step 1: Implementar**

```astro
---
import type { CvMetric } from "../../data/cv";
import MetricKpi from "../ui/MetricKpi.astro";
import type { Locale } from "../../i18n";

interface Props {
  metrics: CvMetric[];
  locale: Locale;
}
const { metrics, locale } = Astro.props;
const title = locale === "en" ? "// Impact in production" : "// Impacto en producción";
---
<section class="impact" aria-labelledby="impact-title">
  <p id="impact-title" class="impact__title">{title}</p>
  <ul class="impact__grid">
    {metrics.map((m) => (
      <li class="impact__item">
        <MetricKpi value={m.value} label={m.label} context={m.context} size="md" />
      </li>
    ))}
  </ul>
</section>

<style>
  .impact {
    padding: clamp(2rem, 4vw, 3rem) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .impact__title {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin: 0 0 1.5rem;
    letter-spacing: 0.02em;
  }
  .impact__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: clamp(1.5rem, 3vw, 2.5rem);
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .impact__item { min-width: 0; }
</style>
```

- [ ] **Step 2: Type-check + Commit**

```bash
pnpm run type-check
git add src/components/sections/ImpactBar.astro
git commit -m "feat(sections): add ImpactBar with production metrics grid"
```

---

## Task 9: Crear `CaseStudy.astro` y `CasesGrid.astro`

**Files:**
- Create: `src/components/sections/CaseStudy.astro`
- Create: `src/components/sections/CasesGrid.astro`

- [ ] **Step 1: `CaseStudy.astro`**

```astro
---
import type { CvData } from "../../data/cv";
import MetricKpi from "../ui/MetricKpi.astro";

interface Props {
  entry: CvData["experience"][number];
  index: number;
}
const { entry, index } = Astro.props;
const isLatest = index === 0;
const period = entry.period;
const isCurrent = /presente|present/i.test(period);
---
<article class={`case ${isLatest ? "case--featured" : ""}`}>
  <header class="case__head">
    <div class="case__meta">
      <span class="case__company">{entry.company}</span>
      <span class="case__sep">·</span>
      <span class="case__role">{entry.role}</span>
      {isCurrent && <span class="case__live" aria-label="actual">●</span>}
    </div>
    <span class="case__period">{period}</span>
  </header>
  {entry.headline && <p class="case__headline">{entry.headline}</p>}
  {entry.kpis && entry.kpis.length > 0 && (
    <ul class="case__kpis">
      {entry.kpis.map((k) => (
        <li><MetricKpi value={k.value} label={k.label} size={isLatest ? "md" : "sm"} /></li>
      ))}
    </ul>
  )}
  {entry.highlights && entry.highlights.length > 0 && (
    <ul class="case__bullets">
      {entry.highlights.slice(0, isLatest ? 4 : 3).map((h) => <li>{h}</li>)}
    </ul>
  )}
</article>

<style>
  .case {
    padding: clamp(1.5rem, 3vw, 2rem);
    border: 1px solid var(--border);
    border-radius: 1rem;
    background-color: var(--bg-elevated);
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .case:hover { border-color: var(--border-strong); transform: translateY(-2px); }
  .case--featured { border-color: var(--border-accent); background-color: var(--bg-elevated); }
  .case__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    margin-bottom: 0.75rem;
  }
  .case__meta {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .case__company { color: var(--text-primary); font-weight: 500; }
  .case__sep { color: var(--text-tertiary); }
  .case__live {
    color: var(--accent);
    font-size: 0.625rem;
    animation: status-pulse 2.4s ease-in-out infinite;
  }
  .case__period {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-tertiary);
    letter-spacing: 0.02em;
  }
  .case__headline {
    font-family: var(--font-serif);
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    line-height: 1.3;
    color: var(--text-primary);
    margin: 0 0 1.25rem;
  }
  .case--featured .case__headline {
    font-size: clamp(1.5rem, 2.5vw, 1.875rem);
  }
  .case__kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.25rem;
    list-style: none;
    padding: 1rem 0;
    margin: 0 0 1rem;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .case__bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  .case__bullets li {
    position: relative;
    padding-left: 1.25rem;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }
  .case__bullets li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--accent);
    font-family: var(--font-mono);
  }
</style>
```

- [ ] **Step 2: `CasesGrid.astro`**

```astro
---
import type { CvData } from "../../data/cv";
import CaseStudy from "./CaseStudy.astro";
import type { Locale } from "../../i18n";

interface Props {
  experience: CvData["experience"];
  locale: Locale;
}
const { experience, locale } = Astro.props;
const title = locale === "en" ? "Cases in production" : "Casos en producción";
const eyebrow = locale === "en" ? "// Experience" : "// Experiencia";
---
<section id="cases" class="cases" aria-labelledby="cases-title">
  <header class="cases__head">
    <p class="cases__eyebrow">{eyebrow}</p>
    <h2 id="cases-title" class="cases__title">{title}</h2>
  </header>
  <div class="cases__grid">
    {experience.map((entry, i) => <CaseStudy entry={entry} index={i} />)}
  </div>
</section>

<style>
  .cases { padding: clamp(3rem, 6vw, 5rem) 0; }
  .cases__head { margin-bottom: 2rem; }
  .cases__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-text);
    margin: 0 0 0.5rem;
    letter-spacing: 0.02em;
  }
  .cases__title {
    font-family: var(--font-serif);
    font-size: clamp(1.875rem, 4vw, 2.75rem);
    font-weight: 400;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .cases__grid {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
```

- [ ] **Step 3: Type-check + Commit**

```bash
pnpm run type-check
git add src/components/sections/CaseStudy.astro src/components/sections/CasesGrid.astro
git commit -m "feat(sections): add CaseStudy and CasesGrid replacing flat experience timeline"
```

---

## Task 10: Crear `FeaturedProject.astro`, `ProjectCard.astro`, `ProjectsSection.astro`

**Files:**
- Create: `src/components/sections/FeaturedProject.astro`
- Create: `src/components/sections/ProjectCard.astro`
- Create: `src/components/sections/ProjectsSection.astro`

- [ ] **Step 1: `FeaturedProject.astro`**

```astro
---
import type { CvData } from "../../data/cv";
import StackChip from "../ui/StackChip.astro";
import MetricKpi from "../ui/MetricKpi.astro";
import LockIcon from "../icons/LockIcon.astro";

interface Props {
  project: CvData["projects"][number];
  locale: "es" | "en";
}
const { project, locale } = Astro.props;
const href = project.url ?? (project.private ? null : project.github?.[0]);
const isExternal = !!href && !href.startsWith("/");
const visit = locale === "en" ? "Visit project" : "Ver proyecto";
const Tag = href ? "a" : "div";
---
<Tag
  class={`featured ${href ? "featured--linked" : ""}`}
  {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
>
  <div class="featured__body">
    <p class="featured__eyebrow">// Featured project</p>
    <h3 class="featured__name">
      {project.name}
      {project.private && <LockIcon class="featured__lock" />}
    </h3>
    <p class="featured__headline">{project.headline}</p>
    {project.kpi && (
      <div class="featured__kpi">
        <MetricKpi value={project.kpi.value} label={project.kpi.label} size="lg" />
      </div>
    )}
    <ul class="featured__stack" aria-label="Stack">
      {project.stack.map((s) => <li><StackChip label={s} /></li>)}
    </ul>
    {href && <span class="featured__cta">{visit} →</span>}
  </div>
</Tag>

<style>
  .featured {
    display: block;
    padding: clamp(2rem, 4vw, 3rem);
    border: 1px solid var(--border-accent);
    border-radius: 1.25rem;
    background:
      radial-gradient(ellipse at top right, var(--accent-muted), transparent 60%),
      var(--bg-elevated);
    text-decoration: none;
    color: inherit;
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .featured--linked:hover { border-color: var(--accent); transform: translateY(-2px); }
  .featured__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-text);
    margin: 0 0 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .featured__name {
    font-family: var(--font-serif);
    font-size: clamp(1.875rem, 3vw, 2.5rem);
    font-weight: 400;
    color: var(--text-primary);
    margin: 0 0 0.75rem;
    line-height: 1.1;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .featured__lock { width: 1.25rem; height: 1.25rem; color: var(--text-tertiary); }
  .featured__headline {
    font-size: var(--text-base);
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0 0 1.5rem;
    max-width: 36rem;
  }
  .featured__kpi { margin-bottom: 1.5rem; }
  .featured__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0 0 1.25rem;
  }
  .featured__cta {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--accent);
  }
</style>
```

- [ ] **Step 2: `ProjectCard.astro`**

```astro
---
import type { CvData } from "../../data/cv";
import StackChip from "../ui/StackChip.astro";
import LockIcon from "../icons/LockIcon.astro";

interface Props {
  project: CvData["projects"][number];
}
const { project } = Astro.props;
const href = project.url ?? (project.private ? null : project.github?.[0]);
const Tag = href ? "a" : "div";
---
<Tag
  class={`pcard ${href ? "pcard--linked" : ""}`}
  {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
>
  <h4 class="pcard__name">
    {project.name}
    {project.private && <LockIcon class="pcard__lock" />}
  </h4>
  <p class="pcard__headline">{project.headline}</p>
  <ul class="pcard__stack" aria-label="Stack">
    {project.stack.slice(0, 5).map((s) => <li><StackChip label={s} /></li>)}
  </ul>
</Tag>

<style>
  .pcard {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 0.875rem;
    background-color: var(--bg-elevated);
    text-decoration: none;
    color: inherit;
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .pcard--linked:hover { border-color: var(--border-strong); transform: translateY(-2px); }
  .pcard__name {
    font-family: var(--font-serif);
    font-size: 1.375rem;
    font-weight: 400;
    color: var(--text-primary);
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 1.2;
  }
  .pcard__lock { width: 1rem; height: 1rem; color: var(--text-tertiary); }
  .pcard__headline {
    font-size: 0.9375rem;
    line-height: 1.55;
    color: var(--text-secondary);
    margin: 0;
  }
  .pcard__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0;
  }
</style>
```

- [ ] **Step 3: `ProjectsSection.astro`**

```astro
---
import type { CvData } from "../../data/cv";
import FeaturedProject from "./FeaturedProject.astro";
import ProjectCard from "./ProjectCard.astro";
import type { Locale } from "../../i18n";

interface Props {
  projects: CvData["projects"];
  locale: Locale;
}
const { projects, locale } = Astro.props;
const featured = projects.find((p) => p.featured) ?? projects[0];
const rest = projects.filter((p) => p !== featured);
const eyebrow = locale === "en" ? "// Projects" : "// Proyectos";
const title = locale === "en" ? "Things I've built" : "Cosas que he construido";
const moreLabel = locale === "en" ? "More on GitHub" : "Más en GitHub";
const githubUrl = "https://github.com/sergiomarquezdev";
---
<section id="projects" class="psection" aria-labelledby="projects-title">
  <header class="psection__head">
    <p class="psection__eyebrow">{eyebrow}</p>
    <h2 id="projects-title" class="psection__title">{title}</h2>
  </header>
  {featured && <FeaturedProject project={featured} locale={locale} />}
  {rest.length > 0 && (
    <div class="psection__grid">
      {rest.map((p) => <ProjectCard project={p} />)}
    </div>
  )}
  <a class="psection__more" href={githubUrl} target="_blank" rel="noopener noreferrer">
    {moreLabel} →
  </a>
</section>

<style>
  .psection { padding: clamp(3rem, 6vw, 5rem) 0; display: flex; flex-direction: column; gap: 1.25rem; }
  .psection__head { margin-bottom: 0.5rem; }
  .psection__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-text);
    margin: 0 0 0.5rem;
  }
  .psection__title {
    font-family: var(--font-serif);
    font-size: clamp(1.875rem, 4vw, 2.75rem);
    font-weight: 400;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .psection__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }
  .psection__more {
    align-self: flex-start;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--accent);
    text-decoration: none;
    padding: 0.5rem 0;
  }
  .psection__more:hover { color: var(--accent-hover); }
</style>
```

- [ ] **Step 4: Type-check + Commit**

```bash
pnpm run type-check
git add src/components/sections/FeaturedProject.astro src/components/sections/ProjectCard.astro src/components/sections/ProjectsSection.astro
git commit -m "feat(sections): add FeaturedProject, ProjectCard and ProjectsSection"
```

---

## Task 11: Crear `Writing.astro` — sección escritura/presencia

**Files:**
- Create: `src/components/sections/Writing.astro`

- [ ] **Step 1: Implementar**

```astro
---
import type { CvWriting } from "../../data/cv";
import type { Locale } from "../../i18n";
import BlogIcon from "../icons/BlogIcon.astro";
import YouTubeIcon from "../icons/YouTubeIcon.astro";
import LinkedInIcon from "../icons/LinkedInIcon.astro";
import XIcon from "../icons/XIcon.astro";
import TikTokIcon from "../icons/TikTokIcon.astro";

interface Props {
  writing: CvWriting;
  locale: Locale;
}
const { writing, locale } = Astro.props;
const eyebrow = locale === "en" ? "// Writing & presence" : "// Escritura y presencia";
const title = locale === "en" ? "Where I share what I learn" : "Donde comparto lo que aprendo";

const iconMap = {
  blog: BlogIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  tiktok: TikTokIcon,
};

const urlMap = {
  blog: writing.blogUrl,
  youtube: "https://www.youtube.com/@sergiomarquezp",
  linkedin: "https://www.linkedin.com/in/sergiomarquezp/",
  x: "https://x.com/sergiomarquezp_",
  tiktok: "https://www.tiktok.com/@sergiomarquezp_",
};
---
<section id="writing" class="writing" aria-labelledby="writing-title">
  <header class="writing__head">
    <p class="writing__eyebrow">{eyebrow}</p>
    <h2 id="writing-title" class="writing__title">{title}</h2>
  </header>
  <ul class="writing__grid">
    {writing.channels.map((c) => {
      const Icon = iconMap[c.platform];
      const url = urlMap[c.platform];
      return (
        <li>
          <a class="wcard" href={url} target="_blank" rel="noopener noreferrer">
            <div class="wcard__icon"><Icon class="wcard__svg" /></div>
            <div class="wcard__body">
              <span class="wcard__handle">{c.handle}</span>
              <span class="wcard__desc">{c.description}</span>
            </div>
            <span class="wcard__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      );
    })}
  </ul>
</section>

<style>
  .writing { padding: clamp(3rem, 6vw, 5rem) 0; }
  .writing__head { margin-bottom: 2rem; }
  .writing__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-text);
    margin: 0 0 0.5rem;
  }
  .writing__title {
    font-family: var(--font-serif);
    font-size: clamp(1.875rem, 4vw, 2.75rem);
    font-weight: 400;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .writing__grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 0.75rem;
  }
  .wcard {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    background-color: var(--bg-elevated);
    text-decoration: none;
    color: inherit;
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .wcard:hover { border-color: var(--border-strong); transform: translateY(-1px); }
  .wcard__icon {
    width: 2.25rem;
    height: 2.25rem;
    display: grid;
    place-items: center;
    background-color: var(--bg-subtle);
    border-radius: 0.5rem;
    color: var(--accent);
  }
  .wcard__svg { width: 1.125rem; height: 1.125rem; }
  .wcard__body { display: flex; flex-direction: column; gap: 0.125rem; min-width: 0; }
  .wcard__handle {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--text-primary);
  }
  .wcard__desc {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.4;
  }
  .wcard__arrow {
    font-family: var(--font-mono);
    color: var(--text-tertiary);
    font-size: 0.875rem;
  }
  .wcard:hover .wcard__arrow { color: var(--accent); }
</style>
```

- [ ] **Step 2: Type-check + Commit**

```bash
pnpm run type-check
git add src/components/sections/Writing.astro
git commit -m "feat(sections): add Writing section showing blog and social channels"
```

---

## Task 12: Refactorizar `HomePage.astro` para usar nuevas secciones

**Files:**
- Modify: `src/components/HomePage.astro`

- [ ] **Step 1: Reemplazar contenido completo del componente**

```astro
---
import type { CvData } from "../data/cv";
import { getLocale } from "../i18n";
import Hero from "./sections/Hero.astro";
import ImpactBar from "./sections/ImpactBar.astro";
import About from "./About.astro";
import CasesGrid from "./sections/CasesGrid.astro";
import ProjectsSection from "./sections/ProjectsSection.astro";
import Writing from "./sections/Writing.astro";
import Certifications from "./Certifications.astro";
import Footer from "./layout/Footer.astro";

interface Props {
  cv: CvData;
}
const { cv } = Astro.props;
const locale = getLocale(Astro.currentLocale);
const { basics, experience, projects, certifications, metrics, writing } = cv;
---
<div class="home">
  <Hero basics={basics} locale={locale} />
  {metrics && metrics.length > 0 && <ImpactBar metrics={metrics} locale={locale} />}
  <section id="about" class="home__about" data-observe>
    <About basics={basics} />
  </section>
  <section id="cases-section" data-observe>
    <CasesGrid experience={experience} locale={locale} />
  </section>
  <section id="projects-section" data-observe>
    <ProjectsSection projects={projects} locale={locale} />
  </section>
  {writing && (
    <section id="writing-section" data-observe>
      <Writing writing={writing} locale={locale} />
    </section>
  )}
  <section id="certifications" data-observe>
    <Certifications certifications={certifications} />
  </section>
  <Footer email={basics.email} name={basics.name} urls={basics.urls} />
</div>

<script>
  // Reuse existing fade-up observer
  const items = document.querySelectorAll<HTMLElement>("[data-observe]");
  if (items.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  [data-observe] {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 600ms ease, transform 600ms ease;
  }
  [data-observe].is-visible {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-observe] { opacity: 1; transform: none; transition: none; }
  }
</style>
```

- [ ] **Step 2: Type-check**

```bash
pnpm run type-check
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/HomePage.astro
git commit -m "refactor(home): recompose HomePage with new sections (hero, impact, cases, projects, writing)"
```

---

## Task 13: Adaptar `About.astro` al nuevo theme y simplificarlo

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Sustituir componente**

El About ahora es secundario (el hero ya capta atención). Lo simplificamos a párrafo narrativo:

```astro
---
import type { CvData } from "../data/cv";
import { getLocale } from "../i18n";

interface Props {
  basics: CvData["basics"];
}
const { basics } = Astro.props;
const locale = getLocale(Astro.currentLocale);
const eyebrow = locale === "en" ? "// About" : "// Sobre mí";
const title = locale === "en" ? "Backend engineer turned AI builder" : "Backend reconvertido a IA";
---
<section class="about" aria-labelledby="about-title">
  <header class="about__head">
    <p class="about__eyebrow">{eyebrow}</p>
    <h2 id="about-title" class="about__title">{title}</h2>
  </header>
  <p class="about__body">{basics.summary}</p>
</section>

<style>
  .about {
    padding: clamp(3rem, 6vw, 5rem) 0;
    max-width: 56rem;
  }
  .about__head { margin-bottom: 1.5rem; }
  .about__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-text);
    margin: 0 0 0.5rem;
  }
  .about__title {
    font-family: var(--font-serif);
    font-size: clamp(1.875rem, 4vw, 2.75rem);
    font-weight: 400;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .about__body {
    font-family: var(--font-sans);
    font-size: var(--text-lg);
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Type-check + Commit**

```bash
pnpm run type-check
git add src/components/About.astro
git commit -m "refactor(about): simplify and align with new theme"
```

---

## Task 14: Adaptar `Certifications.astro` al dark theme

**Files:**
- Modify: `src/components/Certifications.astro`

- [ ] **Step 1: Reescribir componente**

```astro
---
import type { CvData } from "../data/cv";
import { formatDate, getLocale } from "../i18n";
import LinkIcon from "./icons/LinkIcon.astro";

interface Props {
  certifications: CvData["certifications"];
}
const { certifications } = Astro.props;
const locale = getLocale(Astro.currentLocale);
const eyebrow = locale === "en" ? "// Certifications" : "// Certificaciones";
const title = locale === "en" ? "Certifications & training" : "Certificaciones y formación";
---
<section class="certs" aria-labelledby="certs-title">
  <header class="certs__head">
    <p class="certs__eyebrow">{eyebrow}</p>
    <h2 id="certs-title" class="certs__title">{title}</h2>
  </header>
  <ul class="certs__list">
    {certifications.map((c) => {
      const Tag = c.url ? "a" : "div";
      return (
        <li>
          <Tag
            class={`cert ${c.url ? "cert--linked" : ""}`}
            {...(c.url ? { href: c.url, target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <div class="cert__body">
              <span class="cert__name">{c.name}</span>
              <span class="cert__meta">
                <span class="cert__issuer">{c.issuer}</span>
                <span class="cert__sep">·</span>
                <span class="cert__date">{formatDate(c.date, locale)}</span>
              </span>
            </div>
            {c.url && <LinkIcon class="cert__icon" />}
          </Tag>
        </li>
      );
    })}
  </ul>
</section>

<style>
  .certs { padding: clamp(3rem, 6vw, 5rem) 0; }
  .certs__head { margin-bottom: 1.5rem; }
  .certs__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-text);
    margin: 0 0 0.5rem;
  }
  .certs__title {
    font-family: var(--font-serif);
    font-size: clamp(1.875rem, 4vw, 2.75rem);
    font-weight: 400;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .certs__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 0.5rem;
  }
  .cert {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    background-color: var(--bg-elevated);
    color: inherit;
    text-decoration: none;
    transition: border-color 200ms ease;
  }
  .cert--linked:hover { border-color: var(--border-strong); }
  .cert__body { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
  .cert__name {
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    color: var(--text-primary);
    line-height: 1.35;
  }
  .cert__meta {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-tertiary);
    display: inline-flex;
    gap: 0.375rem;
  }
  .cert__issuer { color: var(--text-secondary); }
  .cert__sep { color: var(--text-tertiary); }
  .cert__icon { width: 1rem; height: 1rem; color: var(--text-tertiary); flex-shrink: 0; }
</style>
```

- [ ] **Step 2: Type-check + Commit**

```bash
pnpm run type-check
git add src/components/Certifications.astro
git commit -m "refactor(certifications): align with new dark theme and 2-column layout"
```

---

## Task 15: Adaptar layout (sidebars, nav, footer, spotlight) al dark theme

**Files:**
- Modify: `src/components/layout/SidebarLeft.astro`
- Modify: `src/components/layout/SidebarRight.astro`
- Modify: `src/components/layout/Navigation.astro`
- Modify: `src/components/layout/MobileNav.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/components/layout/SocialLinks.astro`
- Modify: `src/components/Spotlight.astro`
- Modify: `src/components/LanguageSwitcher.astro`
- Modify: `src/components/GitHubActivity.astro`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: SidebarLeft — actualizar tipografía y colores**

En `<style>`:
- Cambiar la fuente del nombre/h1 a `var(--font-serif)`, peso 400
- Asegurar todos los `color:` apuntan a CSS vars del nuevo tema (`--text-primary`, `--text-secondary`, etc.)
- Actualizar el logo "Sm" si es texto: usar `var(--font-mono)` y `var(--accent)`

Si el componente tenía hardcoded blue (`#2563eb` o similar), reemplazar por `var(--accent)`.

- [ ] **Step 2: Navigation — indicador con acento lime**

En el indicador animado de la nav: cambiar `background-color` a `var(--accent)`. El item activo: `color: var(--text-primary)`. Inactivos: `color: var(--text-tertiary)`. Hover: `color: var(--text-secondary)`.

- [ ] **Step 3: MobileNav — adaptar a dark**

Fondo: `var(--bg-elevated)`. Borde superior: `1px solid var(--border)`. Activo: `color: var(--accent)`. Inactivo: `color: var(--text-tertiary)`.

- [ ] **Step 4: SidebarRight — texto vertical**

`color: var(--text-tertiary)`. Línea decorativa: `background-color: var(--border-strong)`. Hover en email: `color: var(--accent)`.

- [ ] **Step 5: Footer — refundir como CTA**

Reescribir el componente:

```astro
---
import type { CvData } from "../../data/cv";
import { getLocale } from "../../i18n";
import SocialLinks from "./SocialLinks.astro";

interface Props {
  email: string;
  name: string;
  urls: CvData["basics"]["urls"];
}
const { email, name, urls } = Astro.props;
const locale = getLocale(Astro.currentLocale);
const headline = locale === "en" ? "Want to ship AI to production?" : "¿Llevamos IA a producción?";
const sub = locale === "en"
  ? "Open to backend + AI roles, freelance projects, and collaborations."
  : "Abierto a roles backend + IA, proyectos freelance y colaboraciones.";
const cta = locale === "en" ? "Email me" : "Escríbeme";
---
<footer class="cta-footer">
  <div class="cta-footer__inner">
    <p class="cta-footer__eyebrow">// Contact</p>
    <h2 class="cta-footer__headline">{headline}</h2>
    <p class="cta-footer__sub">{sub}</p>
    <a class="cta-footer__btn" href={`mailto:${email}`}>{cta} →</a>
    <div class="cta-footer__socials">
      <SocialLinks urls={urls} />
    </div>
    <p class="cta-footer__copy">© {new Date().getFullYear()} {name}</p>
  </div>
</footer>

<style>
  .cta-footer {
    padding: clamp(4rem, 8vw, 6rem) 0 clamp(2rem, 4vw, 3rem);
    border-top: 1px solid var(--border);
    margin-top: clamp(3rem, 6vw, 5rem);
  }
  .cta-footer__inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  .cta-footer__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--accent-text);
    margin: 0;
  }
  .cta-footer__headline {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 400;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }
  .cta-footer__sub {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--text-secondary);
    margin: 0;
    max-width: 36rem;
  }
  .cta-footer__btn {
    margin-top: 0.5rem;
    padding: 0.875rem 1.5rem;
    background-color: var(--accent);
    color: #0A0A0B;
    border-radius: 999px;
    font-family: var(--font-sans);
    font-weight: 500;
    text-decoration: none;
    transition: background-color 200ms ease, transform 200ms ease;
  }
  .cta-footer__btn:hover { background-color: var(--accent-hover); transform: translateY(-1px); }
  .cta-footer__socials { margin-top: 1.5rem; }
  .cta-footer__copy {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-tertiary);
    margin-top: 1.5rem;
  }
</style>
```

- [ ] **Step 6: SocialLinks — aplicar dark hover lime**

En el `<style>`: links color `var(--text-tertiary)`, hover `var(--accent)`.

- [ ] **Step 7: Spotlight — reducir intensidad y usar lime**

En `Spotlight.astro` el radial-gradient: usar `var(--spotlight-color)` (que ya apunta a `--accent-muted`). Asegurar opacity baja, no más de 8%.

- [ ] **Step 8: LanguageSwitcher — dark con borde sutil**

```css
a {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  text-decoration: none;
  transition: all 200ms ease;
}
a:hover { color: var(--accent); border-color: var(--border-accent); }
```

- [ ] **Step 9: GitHubActivity — dark + acento lime**

Dot pulsante: `background-color: var(--accent)`. Texto `color: var(--text-tertiary)`. Sha en mono.

- [ ] **Step 10: Layout — fondo dark explícito**

En `Layout.astro`, asegurar que el wrapper raíz toma `background: var(--bg)` y `color: var(--text-primary)`. Ya lo hace `body` en global.css, pero confirmar que no haya overrides.

- [ ] **Step 11: Build local + visual smoke test**

```bash
pnpm run build && pnpm run preview &
sleep 3 && curl -s http://localhost:4321/ | head -20
```

Confirmar que el HTML servido tiene `body` con bg dark. Cerrar preview.

- [ ] **Step 12: Commit**

```bash
git add src/components/layout/ src/components/Spotlight.astro src/components/LanguageSwitcher.astro src/components/GitHubActivity.astro src/layouts/Layout.astro
git commit -m "refactor(layout): adapt sidebars, nav, footer and spotlight to dark theme with lime accent"
```

---

## Task 16: Eliminar componentes obsoletos

**Files:**
- Delete: `src/components/Experience.astro`
- Delete: `src/components/Projects.astro`

- [ ] **Step 1: Verificar que no se importan en ningún sitio**

```bash
rg -l "Experience\.astro|Projects\.astro" src/
```

Expected: solo `HomePage.astro` antes (ya refactorizado, no debería aparecer). Si aparece otro fichero usándolos, NO borrar y reportar.

- [ ] **Step 2: Borrar archivos**

```bash
git rm src/components/Experience.astro src/components/Projects.astro
```

- [ ] **Step 3: Validate**

```bash
pnpm run validate
```

Expected: type-check + lint + test + build pasan.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove obsolete Experience and Projects components"
```

---

## Task 17: Validación final, visual QA y documentación

**Files:**
- Modify: `CHANGELOG.md` (si existe; si no, crear)
- Modify: `README.md` (si menciona el diseño antiguo)

- [ ] **Step 1: Full validate**

```bash
pnpm run validate
```

Expected: PASS en todo. Si falla, **arreglar antes de continuar**.

- [ ] **Step 2: Visual QA con Playwright**

Levantar `pnpm run preview` y visitar:
- `http://localhost:4321/` (ES desktop 1440×900)
- `http://localhost:4321/en/` (EN desktop)
- `http://localhost:4321/` viewport 768×1024 (tablet)
- `http://localhost:4321/` viewport 375×812 (mobile)

Verificar manualmente con screenshots:
- Hero se ve con headline serif grande, dot grid sutil, status badge, stack chips, CTAs
- ImpactBar muestra 4 KPIs en mono lime
- CasesGrid muestra el primer trabajo destacado con kpis
- ProjectsSection muestra featured + grid
- Writing aparece con 5 channels
- Certifications en grid 2 columnas
- Footer CTA grande
- Mobile: nav inferior funciona, todo apilado correcto
- Sin errores en consola

- [ ] **Step 3: Lighthouse local (opcional pero recomendado)**

Ejecutar Lighthouse en `pnpm run preview` desde Chrome DevTools. Verificar:
- Performance ≥ 95
- Accessibility = 100
- Best Practices ≥ 95
- SEO = 100

Si performance < 95: revisar tamaño de fuentes, asset bundle. Si accessibility < 100: revisar contraste y alt texts.

- [ ] **Step 4: CHANGELOG**

Editar `CHANGELOG.md` (crearlo si no existe):

```md
# Changelog

## [Unreleased]

### Changed
- Complete redesign of portfolio with "AI Engineer" personal brand identity.
- Migrated from light minimalist theme to dark theme with lime accent (#A3E635).
- New typography system: Instrument Serif (display), Geist (body), JetBrains Mono (metrics/code).
- Recomposed home structure: Hero, Impact Bar, About, Cases (replaces Experience), Projects, Writing & Presence, Certifications, CTA Footer.

### Added
- Hero section with serif headline, animated dot grid, status badge.
- Impact Bar showcasing production metrics (cost, validation, latency).
- Case Studies replacing flat experience timeline (KPIs front and center).
- Featured Project + secondary grid for projects, with KPI badges.
- Writing & Presence section consolidating blog and social channels.
- New optional CV fields: `metrics`, `headline`, `kpis`, `featured`, `kpi`, `writing`, `status`, `stackChips`.
- UI primitives: `MetricKpi`, `StackChip`, `StatusBadge`, `DotGrid`.

### Removed
- Old `Experience.astro` and `Projects.astro` components (replaced by sections under `src/components/sections/`).
```

- [ ] **Step 5: README — sección de diseño**

Si el README menciona el theme/design viejo, actualizar a:

> **Design system:** Dark theme with lime (#A3E635) accent. Typography: Instrument Serif (display), Geist Variable (body), JetBrains Mono Variable (mono/metrics). All design tokens are CSS custom properties in `src/styles/global.css`.

- [ ] **Step 6: Commit final docs**

```bash
git add CHANGELOG.md README.md
git commit -m "docs: update CHANGELOG and README for AI brand redesign"
```

- [ ] **Step 7: Push**

```bash
git push -u origin feat/redesign-ai-brand
```

Expected: branch publicada en GitHub.

- [ ] **Step 8: Reportar al usuario**

URL del branch + resumen de commits.

---

## Self-review checklist (ejecutar después de Task 17)

- [ ] Todos los componentes nuevos en `src/components/sections/` y `src/components/ui/`
- [ ] No quedan referencias a `Experience.astro` o `Projects.astro`
- [ ] Todos los textos hardcoded de UI están traducidos (ES/EN)
- [ ] CSS vars antiguas siguen disponibles vía aliases (no rompen otros componentes)
- [ ] `prefers-reduced-motion` desactiva animaciones donde aplica
- [ ] Mobile (<768px): hero stack vertical, nav bottom funciona
- [ ] No hay `console.log` ni código de debug
- [ ] Lighthouse score Performance ≥ 95, A11y 100, SEO 100
- [ ] Build genera assets correctos en `dist/`
- [ ] Branch pusheada a `origin/feat/redesign-ai-brand`
