# Spec: Rediseño Portfolio — Marca Personal IA / Automatizaciones

**Fecha:** 2026-05-05
**Branch:** `feat/redesign-ai-brand`
**Decisiones tomadas por:** Claude (carta blanca delegada por el usuario)

---

## Diagnóstico del estado actual

El portfolio en producción (`sergiomarquez.dev`) parece más un CV plano que un portfolio con marca. Problemas concretos:

1. **Light theme uniforme**, sin personalidad. Acento azul `#2563eb` genérico. No comunica "IA / automatizaciones".
2. **Hero sin gancho.** El visitante no entiende en 5 segundos qué hace Sergio. Solo ve nombre + tagline + redes.
3. **Métricas escondidas en bullets.** Datos potentes (`70%→90% validación`, `-15% latencia / -35% coste`, `8-10h/config`, ensemble GPT+Claude+Gemini) están enterrados en `experience[].highlights[]` como texto corrido.
4. **Proyectos uniformes.** Todos parecen igual de importantes. No se diferencia un blog autónomo IA de un container Docker.
5. **Sin jerarquía visual.** Todo el texto pesa igual. No hay énfasis en lo que diferencia a Sergio.
6. **Falta presencia de marca personal.** Bloggea, graba YouTube, está en redes — pero la web no lo refleja como activo.

## Posicionamiento

> **"Sergio Márquez — Ingeniero IA aplicada con backend de verdad. Llevo IA a producción con métricas, no demos."**

Tono: técnico, sereno, con autoridad por sustancia (no por hype). Modelo: Linus Lee + Brittany Chiang + un punto de espectacularidad de Razorpay/Societies para los KPIs.

## Sistema de marca

### Paleta — Dark "AI Engineer"

**Decisión:** dark theme con un acento único distintivo. Para no caer en el "mar de azules IA", el acento será **lime/electric green** (`#A3E635` aprox), color que evoca terminal/code/máquina sin ser cliché de matrix.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0A0A0B` | Fondo principal (casi-negro neutro, no azul) |
| `--bg-elevated` | `#111113` | Cards, surfaces elevadas |
| `--bg-subtle` | `#1A1A1D` | Hover states, secciones alternas |
| `--text-primary` | `#F5F5F7` | Texto principal |
| `--text-secondary` | `#A1A1AA` | Texto secundario |
| `--text-tertiary` | `#71717A` | Meta, fechas, captions |
| `--border` | `rgba(255,255,255,0.08)` | Bordes sutiles |
| `--border-strong` | `rgba(255,255,255,0.16)` | Bordes destacados |
| `--accent` | `#A3E635` | Acento de marca (lime) |
| `--accent-glow` | `rgba(163,230,53,0.15)` | Glows, hovers |
| `--accent-text` | `#84CC16` | Acento sobre fondo claro (cuando aplique) |
| `--metric-positive` | `#A3E635` | KPIs positivos (mejoras) |
| `--gradient-hero` | `radial-gradient(ellipse at top, rgba(163,230,53,0.08), transparent 60%)` | Sutil glow en hero |

### Tipografía

| Rol | Fuente | Notas |
|---|---|---|
| **Display / Hero** | **Instrument Serif** (variable) | Serif moderno para nombre, headlines de impacto. Personalidad sin barroquismo. |
| **Sans / UI** | **Geist Variable** (ya cargada) | Cuerpo, nav, labels. Mantenemos. |
| **Mono / Métricas** | **JetBrains Mono Variable** | KPIs, stack tags, código, fechas. Tabular nums. |

Carga: las 3 como variable fonts locales, `font-display: swap`, preload solo de Geist (la más pesada en tiempo).

### Lenguaje gráfico

- **Borders sutiles** + **subtle glows** en hover (no boxes pesadas).
- **Números grandes** en mono para métricas (estilo agencia: "−35%", "90%", "8h").
- **Chips/badges** con borde fino para stack y tags.
- **Aside vertical "//"** o **`>` prompt** como guiño técnico minimalista (en lugar de "ASCII art" gritado).
- **Un único elemento orgánico**: en hero, un canvas decorativo con grid de puntos animados muy sutil (efecto "embeddings/agentes" sin gritar). Respeta `prefers-reduced-motion`.
- **Cero gradientes flashy**, cero glassmorphism efectista. Premium por restraint.

## Arquitectura del nuevo home

```
[ HERO ]
  Pre-headline mono: "// AI Engineer · Backend · Automation"
  Headline serif XL: "Llevo IA a producción con métricas, no demos."
  Subheadline sans: 1-2 líneas de qué hace concretamente
  Stack chips: Python · FastAPI · LLMs · RAG · n8n · GCP
  CTAs: [ Hablemos ] [ Ver casos ↓ ]
  Decoración: dot-grid canvas sutil (lime, opacity baja)
  Status badge: "● Available for new opportunities"  (lime dot pulsante)

[ IMPACT BAR ]   ← NUEVO
  Banda con 4 KPIs grandes en mono extraídos del CV:
  −35% coste infra | +20pp validación | 8-10h ahorradas / config | <100ms latencia
  Cada KPI con label corta + 1 línea de contexto

[ ABOUT ]
  Summary del CV reformateado como párrafo narrativo con keywords resaltadas.
  Reescritura mínima del summary para reforzar posicionamiento.

[ CASOS ]   ← reemplaza/complementa "Experience"
  Antes era timeline genérico de 3 trabajos.
  Ahora: 3 "casos" estilo agencia, cada uno con:
    - Empresa + rol + período (header compacto)
    - Headline del caso (1 frase potente)
    - 2-3 KPIs grandes mono al frente
    - 3 bullets de qué hizo concretamente
    - Stack chips
  Mantenemos los 3 trabajos, pero el primero (IA/ML 2025-presente) destaca visualmente.

[ PROYECTOS ]
  Reorganizar:
    - 1 proyecto destacado grande (One dAIly Blog) con preview
    - 2-3 proyectos secundarios en grid
    - Resto en "more on GitHub →"
  Cards con KPI/headline en mono, no solo nombre.

[ ESCRITURA & PRESENCIA ]   ← NUEVA
  Sección compacta:
  - Link a blog.sergiomarquez.dev con preview del último post (best-effort, fallback a link simple)
  - Grid de redes con icono + handle + 1 línea de qué publica en cada una
  - YouTube como canal destacado

[ CERTIFICACIONES ]
  Mantener pero más compacto, en 2 columnas.

[ FOOTER / CONTACTO ]
  CTA grande "¿Llevamos IA a producción?" + email + redes secundarias
```

## Restricciones técnicas

1. **Mantener Astro 5 + i18n actual** (es / en, sin tocar routing).
2. **Mantener `cv.{es,en}.json` como fuente única** de datos. NO cambiar schema, solo añadir campos opcionales si hace falta.
3. **Mantener `output: "static"`** y deploy a Cloudflare Pages tal cual.
4. **No introducir frameworks UI** (React/Solid). Astro + vanilla JS para interactividad mínima.
5. **Tailwind v4 + CSS vars custom** como ahora. No reescribir el approach.
6. **Performance budget:**
   - LCP < 2.0s
   - CLS < 0.05
   - JS total inicial < 30KB
   - Sin bibliotecas de animación pesadas (no GSAP, no Framer). CSS + ~100 líneas vanilla JS para canvas.
7. **Accesibilidad:** WCAG AA, contraste verificado en todos los pares texto/fondo, focus visible con acento lime, `prefers-reduced-motion` respetado.
8. **i18n parity:** todo cambio de copy en CV se aplica a ambos locales.
9. **Tests existentes deben seguir pasando.** Si cambia el schema del CV, actualizar `cv.test.ts`.

## Cambios de datos en `cv.{es,en}.json`

**Añadir campos opcionales** para soportar el nuevo diseño sin romper:

```json
{
  "basics": {
    ...existing,
    "tagline": "...",   // reescribir más punchy
    "summary": "...",   // mantener, posible polish
    "headline": "...",  // NUEVO: frase hero corta y potente
    "stackChips": ["Python", "FastAPI", "LLMs", "RAG", "n8n", "GCP"],  // NUEVO
    "status": {
      "available": true,
      "label": "Disponible para nuevas oportunidades"  // EN: "Available for new opportunities"
    }  // NUEVO
  },
  "metrics": [   // NUEVO array para impact bar
    {
      "value": "-35%",
      "label": "coste infraestructura",
      "context": "Migración chat a Google ADK + LiteLLM"
    },
    {
      "value": "70→90%",
      "label": "validación documentos",
      "context": "Ensemble GPT + Claude + Gemini con OCR ajustado"
    },
    {
      "value": "8-10h",
      "label": "ahorradas por configuración",
      "context": "Automatización RAG con n8n + Python"
    },
    {
      "value": "-15%",
      "label": "latencia chat",
      "context": "Arquitectura agéntica con Google ADK"
    }
  ],
  "experience": [
    {
      ...existing,
      "headline": "...",  // NUEVO: 1 frase potente del caso
      "kpis": [           // NUEVO: 2-3 KPIs destacados
        { "value": "-35%", "label": "coste" },
        { "value": "+20pp", "label": "validación" }
      ]
    }
  ],
  "projects": [
    {
      ...existing,
      "featured": true,   // NUEVO: marcar 1-2 destacados
      "kpi": {            // NUEVO opcional
        "value": "1/día",
        "label": "post autónomo"
      }
    }
  ],
  "writing": {  // NUEVO
    "blogUrl": "https://blog.sergiomarquez.dev",
    "channels": [
      { "platform": "blog", "handle": "blog.sergiomarquez.dev", "description": "Notas técnicas sobre IA aplicada y backend" },
      { "platform": "youtube", "handle": "@sergiomarquezp", "description": "Tutoriales y casos prácticos" },
      { "platform": "linkedin", "handle": "sergiomarquezp", "description": "Reflexiones sobre ingeniería IA" },
      { "platform": "x", "handle": "@sergiomarquezp_", "description": "Notas cortas, descubrimientos diarios" },
      { "platform": "tiktok", "handle": "@sergiomarquezp_", "description": "Pills cortas de IA" }
    ]
  }
}
```

Todos los campos nuevos son **opcionales** en TypeScript para no romper compatibilidad ni tests existentes.

## Componentes — qué se crea, modifica, elimina

### Crear nuevos
- `src/components/sections/Hero.astro` — sección hero con headline serif + dot-grid canvas
- `src/components/sections/ImpactBar.astro` — banda de KPIs
- `src/components/sections/CaseStudy.astro` — un caso de experiencia
- `src/components/sections/CasesGrid.astro` — grid de casos (reemplaza Experience)
- `src/components/sections/FeaturedProject.astro` — proyecto destacado grande
- `src/components/sections/ProjectCard.astro` — card de proyecto secundario
- `src/components/sections/Writing.astro` — sección escritura/presencia
- `src/components/ui/MetricKpi.astro` — primitivo KPI (value mono + label)
- `src/components/ui/StackChip.astro` — chip de stack reutilizable
- `src/components/ui/StatusBadge.astro` — badge "disponible" con dot pulsante
- `src/components/ui/DotGrid.astro` — canvas animado del hero
- `src/components/icons/ArrowRightIcon.astro` — flecha CTA

### Modificar
- `src/styles/global.css` — sustituir tokens light por dark + lime, añadir tipografías, ajustar typescale
- `src/data/cv.ts` — extender tipos `CvData` con campos opcionales nuevos
- `src/components/HomePage.astro` — recomponer secciones según nueva arquitectura
- `src/components/About.astro` — simplificar (parte del summary va al hero ahora)
- `src/components/BaseHead.astro` — actualizar OG image referencia (si se regenera) y precargar nuevas fuentes
- `src/components/Spotlight.astro` — adaptar a dark + acento lime (más sutil)
- `src/components/layout/SidebarLeft.astro` — adaptar a dark, retocar jerarquía
- `src/components/layout/SidebarRight.astro` — dark
- `src/components/layout/Navigation.astro` — dark, indicador con acento lime
- `src/components/layout/MobileNav.astro` — dark
- `src/components/layout/Footer.astro` — refundir como CTA section
- `src/components/Certifications.astro` — compactar a 2 columnas
- `public/cv.es.json`, `public/cv.en.json` — añadir campos nuevos
- `src/data/__tests__/cv.test.ts` — actualizar para nuevos campos opcionales

### Eliminar (si quedan obsoletos)
- `src/components/Experience.astro` — reemplazado por `CasesGrid` + `CaseStudy`
- `src/components/Projects.astro` — refactorizado en `FeaturedProject` + `ProjectCard` + grid

### Mantener tal cual
- `src/components/GitHubActivity.astro` (solo ajuste visual al dark)
- `src/components/LanguageSwitcher.astro` (ajuste visual)
- `src/components/icons/*` (ajuste de stroke a `currentColor` ya está OK)
- Toda la estructura i18n y rutas redirect

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Romper i18n parity | Tests añadidos verifican que todos los nuevos campos opcionales existen en ambos locales si se usan |
| LCP regresa por fuentes nuevas | Solo Geist preloaded; Instrument Serif y JetBrains Mono con `font-display: swap` y subset latin |
| Canvas hero pesa | Vanilla JS < 1KB, respeta `prefers-reduced-motion`, no se ejecuta en mobile (<1024px) |
| `astro check` rompe por tipos | Campos nuevos son `?` opcionales en `CvData` |
| Tests existentes rompen | Solo tocamos campos opcionales nuevos; los existentes mantienen schema |
| OG image desfasada con nuevo theme | Plan incluye regenerar `og-image.png` (puede ser placeholder en MVP, mejora posterior) |
| Cloudflare cache | Sin cambios en build output structure, deploy normal |

## Definition of Done

1. `pnpm run validate` pasa (type-check + lint + test + build) en local.
2. Visual QA con Playwright en 3 viewports (mobile 375px, tablet 768px, desktop 1440px) en ambos locales (es/en).
3. Lighthouse: Perf ≥ 95, A11y = 100, Best Practices ≥ 95, SEO = 100 en home (medido en build local con preview).
4. Contraste WCAG AA verificado para todos los pares texto/fondo del nuevo theme.
5. `prefers-reduced-motion: reduce` desactiva canvas y animaciones no esenciales.
6. Commit limpio en `feat/redesign-ai-brand`, push a origin.
7. Documentación: CHANGELOG.md actualizado con entrada `## [Unreleased]` describiendo el rediseño.

## Out of scope (explícito)

- Generación dinámica de OG image (queda con placeholder o image existente).
- Modo light toggle (solo dark).
- Tercer locale.
- Refactor de redirect pages a locale-aware.
- CMS / contenido dinámico (sigue siendo JSON estático).
- Migración a `@fontsource` para Geist (queda local como ahora).
- Eliminar dep muerta `non.geist` (puede limpiarse en commit aparte).
- Test E2E con Playwright (los tests Vitest existentes son suficientes para esta iteración).
