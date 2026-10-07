# Product

<!-- impeccable:product-schema 1 -->

> Fuente: repositorio (`public/cv.{es,en}.json`, `src/i18n/index.ts`, `docs/archive/`), decisiones de tono confirmadas por Sergio el 2026-10-04 (handoff de perfil profesional) y el encargo del rediseño de 2026-10-07. No hubo ronda de entrevista en esta sesión: lo marcado *(inferido)* sale de esa evidencia y debe confirmarse si cambia una decisión.

## Platform

web

## Users

- **Profesionales técnicos que llegan desde un canal de Sergio** (blog One dAIly Blog, LinkedIn, X, YouTube, TikTok, GitHub) o desde una búsqueda de su nombre. Quieren saber en menos de un minuto quién es, a qué se dedica y dónde seguirle. Leen en móvil con frecuencia, porque buena parte del tráfico social es móvil *(inferido)*.
- **Contactos profesionales** (colegas, comunidad de IA, personas que valoran una colaboración) que necesitan una presentación seria y un modo directo de escribirle. No es un proceso de selección: la web no debe sonar a candidatura.
- Audiencia bilingüe: castellano por defecto, inglés en `/en/`.

## Product Purpose

`sergiomarquez.dev` es la tarjeta de presentación de Sergio Márquez y el punto de enlace a todo lo que publica: blog, vídeos cortos de IA, redes y código. Éxito: un visitante entiende su perfil (ingeniero backend e IA que lleva sistemas con LLMs a producción), ve lo que ha construido y sale hacia el blog, un canal o un email sin fricción.

## Positioning

Sergio no solo trabaja con IA: sus propios canales son sistemas que él ha construido. El blog se investiga, escribe, ilustra y publica solo cada día; la serie de vídeos cortos sale de un pipeline propio. En su trabajo diseña y opera asistentes multi-agente con RAG, validación documental multimodal y plataformas de datos sobre Google Cloud, y programa a diario con agentes desde 2024. Un portfolio vecino puede listar las mismas tecnologías; no puede enlazar a máquinas propias que publican a diario.

## Operating Context

- Una página por idioma (`/` ES, `/en/` EN), estática (Astro 7, Cloudflare Pages), sin backend.
- Todo el contenido vive en `public/cv.es.json` y `public/cv.en.json` (paridad de claves ES/EN impuesta por tests); los textos de interfaz en `src/i18n/index.ts`.
- Atajos de redirección que Sergio comparte en bios y vídeos: `/blog`, `/github`, `/linkedin`, `/tiktok`, `/twitter`, `/x`, `/youtube`, `/yt` (páginas de redirección con meta refresh hacia la URL del JSON, no un 301, con `noindex` y fuera del sitemap).
- Contacto por `mailto:` a `contacto@sergiomarquez.dev`. No hay formulario.
- El blog vive en `blog.sergiomarquez.dev` (otro repositorio, `one-daily-blog`), con identidad editorial propia en claro.

## Capabilities and Constraints

- Contenido: identidad y resumen (`basics`), tres etapas de experiencia en VITALY, doce proyectos (uno destacado: One dAIly Blog), seis canales de publicación (`writing.channels`, con GitHub), dos certificaciones.
- i18n ES/EN con `hreflang` y canonical; el visitante cambia de idioma con un enlace visible (sin redirección automática por idioma).
- SEO: `Person` en JSON-LD, Open Graph y Twitter cards, sitemap con alternates.
- CSP estricta en `public/_headers`: fuentes, imágenes y scripts solo desde el propio origen.
- Fuentes autoalojadas; nada de CDNs externos en runtime.
- Repos privados siguen privados: un proyecto privado no enlaza a su código.
- `pnpm run validate` (type-check, lint, test, build) debe pasar antes de cerrar cualquier cambio.

## Brand Commitments

- **Voz**: primera persona, profesional, técnica, sin coloquialismos ni frases planas de marketing. Sin cifras del trabajo (ni porcentajes, ni ahorros, ni volúmenes). Que no se note que busca empleo: nada de "disponible", "open to work" ni llamadas tipo "contrátame".
- Titulares y bios sin nombres de proyectos (no se mantienen a diario); los proyectos van en su sección.
- Empresa visible: VITALY. Ningún nombre interno de producto, cliente o codename. Esem no se menciona.
- Ubicación pública: Badajoz.
- Desde 2024 programa a diario con agentes (Claude Code y Codex).
- **Familia visual con One dAIly Blog** (decisión del propietario, 2026-10-07): modo claro, coherente con el blog sin copiarlo; puede compartir fuentes y paleta base. La estética terminal/dev oscura anterior queda descartada.
- Marca existente: monograma "S■M" (SVG en `src/components/SergioMark.astro`, favicon, iconos). Su color de acento actual (lima) pertenece al mundo descartado.

## Evidence on Hand

- Textos reales en ES/EN: resumen, titular, experiencia con logros, doce proyectos con stack y enlaces, canales con handle y descripción, certificaciones (`public/cv.*.json`).
- One dAIly Blog en producción (`https://blog.sergiomarquez.dev`), con artículos e ilustraciones propias.
- Juegos publicados en itch.io (One Bad Wire, Pingufly); repos públicos en GitHub (acestream-docker-home, búsqueda vectorial multimodal, agente personal con Google ADK, transcriptor de vídeo).
- CV en PDF (`public/Profile.pdf`), no enlazado desde la página actual.
- **No existen** y no deben inventarse: fotografía de Sergio en el repo, capturas de proyectos, testimonios, clientes, métricas publicables, logos de empresas, premios.

## Product Principles

1. **Presentación, no candidatura.** La página explica quién es y qué construye; nunca pide trabajo.
2. **Mostrar lo construido antes que enumerar tecnologías.** Los proyectos y los canales propios son la prueba; las listas de stack son apoyo.
3. **Un nodo de enlaces que se entiende sin instrucciones.** Cada canal se encuentra en segundos y se reconoce sin depender de iconos.
4. **Datos primero.** Todo texto visible sale de los JSON o de i18n; cambiar el perfil no exige tocar componentes.
5. **Menos piezas.** Cada componente, script o fuente tiene que justificar su peso.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste 4.5:1 en texto normal y 3:1 en texto grande e indicadores de foco, navegación completa por teclado con foco visible, `prefers-reduced-motion` respetado, contenido visible sin JavaScript, HTML semántico con landmarks y enlace de salto al contenido. `lang` correcto por página.
