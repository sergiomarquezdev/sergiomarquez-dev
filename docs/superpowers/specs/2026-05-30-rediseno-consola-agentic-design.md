# Rediseño sergiomarquez.dev — Consola agentic (Concept "Agentic Console")

> Estado: aprobado por el usuario (delegación de criterio). Fecha: 2026-05-30.

## Problema

La web actual parece un currículum: usa la plantilla portfolio-dev (rail
izquierdo fijo con nav vertical) + secciones apiladas y etiquetadas (SOBRE MÍ /
EXPERIENCIA / CERTIFICACIONES) con el mismo peso visual. No engancha y no refleja
lo que el usuario realmente publica.

El aire de CV es un problema de **layout**, no de paleta.

## Decisiones (cerradas con el usuario)

1. **Posicionamiento**: autoridad *builder* en Claude / agentes / agentic dev /
   spec-driven. Público: devs, founders, comunidad IA. El "métricas, no demos"
   pasa a ser prueba, no titular. (Evidencia: LinkedIn migrado a Claude Code,
   GitHub lleno de tooling IA/agentes.)
2. **Tema**: se mantiene **dark + lime** (`#a3e635`). El público es técnico; dark
   + neón = lenguaje "builder serio" (Vercel/Linear/Resend) y da continuidad con
   los carruseles. El "que llame la atención" sale del layout, no de un fondo claro.
   El lime falla en contraste sobre blanco (~1.4:1), así que light queda descartado.
3. **Dirección visual**: **Consola agentic**. La web se siente como una sesión de
   agente/terminal: window chrome, prompts, mono, cursor, logs/diffs, lime como
   acento.
4. **Modelo de interacción**: metáfora visual + **⌘K real** (command palette que
   navega de verdad). **Sin REPL obligatorio.**

## Principio rector (no negociable)

**Nadie queda bloqueado nunca.** Todo lo que se hace con la terminal/⌘K se puede
hacer con scroll y clicks normales. La estética terminal es piel; los botones son
botones, los enlaces son enlaces. El ⌘K es un atajo *opcional y descubrible*
(chip `⌘K` visible). En móvil no hay ⌘K: navegación táctil normal. Protege SEO y
accesibilidad.

## Tokens (sin cambios de paleta)

Se conservan los tokens de `global.css` (dark + lime + Geist + Instrument Serif +
JetBrains Mono). Se añade una **capa terminal** de utilidades CSS:
- window chrome (barra + traffic lights), prompt (`>` lime), comentario mono,
  cursor parpadeante (`@keyframes blink`), botón terminal, chip de tecla (kbd).
- Respetar `brand/sergio/tokens/effects.md`: nada de glassmorphism, drop shadows
  ni gradientes > 15%.

## Arquitectura (qué cambia)

Data-driven intacto: `public/cv.{es,en}.json` → `src/data/cv.ts` → componentes.
Paridad ES/EN obligatoria (la imponen los tests `cv.test.ts`).

### Capa de datos (reframe de copy, ambos locales)
- `basics.tagline`, `basics.summary`, `basics.headline`/`headlineAccent`,
  `basics.stackChips`, `basics.status.label`: reorientados a builder/agentes.
- `projects[].headline`: enfatizar lo agéntico/IA donde sea honesto.
- `experience`, `metrics`, `writing`, `certifications`: se mantienen como prueba;
  copy retocado. Se conserva número de entradas (paridad).
- Posible campo nuevo simétrico para la línea "proof" del héroe (o derivar de i18n).

### Shell
- `Layout.astro`: envuelve el contenido en estética de ventana de terminal.
- `SidebarLeft.astro` → **panel de consola** (sticky desktop): logo + nombre +
  `whoami` one-liner + Navigation como lista de comandos mono (`cd ~/about`…) +
  chip `⌘K` + socials. Mantiene `display:none` < 1024px.
- `Hero.astro` → **sesión de terminal**: window chrome (`sergio@dev — ~/portfolio`),
  `> whoami` con headline tipográfico grande (Geist + acento Instrument Serif
  italic lime), `> cat ~/.now` (status), `> ls ./proof` (teaser métricas),
  botones de acción terminal. Typing sutil con fallback `prefers-reduced-motion`.
- **`CommandPalette.astro`** (nuevo): `<dialog>` accesible. Atajos: ir a secciones,
  cambiar idioma, abrir GitHub/LinkedIn/blog/X, copiar email. Abre con ⌘/Ctrl+K y
  `/`; Esc cierra; flechas + Enter. Filtro por texto.

### Secciones (reframe ligero + cabeceras prompt)
Cada sección recibe una cabecera mono estilo prompt (`~ % cat about.md`,
`~ % git log work/`, `~ % ls builds/`, `~ % cat signals.md`). Se conservan los
componentes internos; se reorienta copy e i18n. Certificaciones se de-enfatiza.

### i18n
Nuevas claves: labels de comandos de nav, textos del ⌘K, prompts de sección,
`hero.*`. SEO `seo.title`/`seo.description` actualizados al nuevo posicionamiento.

## No-objetivos (YAGNI)
- No REPL interactivo.
- No light mode.
- No cambiar el stack ni el pipeline de build.
- No tocar el blog (subdominio aparte).

## Verificación
- `pnpm run validate` (type-check + lint + test + build) en verde.
- QA visual en `localhost:4321` (desktop + móvil) vía navegador.
- Commit + push a `main` (deploy Cloudflare Pages).
