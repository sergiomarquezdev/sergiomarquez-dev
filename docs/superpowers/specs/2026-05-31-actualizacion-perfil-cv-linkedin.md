# Actualización de perfil: CV web + LinkedIn (2026)

- **Fecha**: 2026-05-31
- **Estado**: aprobado en chat, en implementación
- **Tarea relacionada**: reflejar el último año de trabajo (equipo nuevo) en el CV de la web y en LinkedIn.

## Contexto

El CV de la web y LinkedIn llevaban meses sin actualizar. La evidencia real (un año de imputaciones Redmine + 5 meses de actividad Claude Code del PC de trabajo) se sintetizó en un inventario profesional: `C:/Users/smarq/Downloads/perfil-inventario.md` (local, **fuera del repo** por contener contexto interno del empleador).

El salto no es "qué empresa" sino la **profundidad**: de "Python AI Developer / RAG" a sistemas de IA agéntica en producción (Google ADK + LiteLLM), evaluación LLM-as-judge, validación documental multi-LLM, plataforma de datos GCP y GitOps en GKE.

## Decisiones

- **Posicionamiento**: Agentic/GenAI-first, con la plataforma GCP de producción como capa de credibilidad.
- **Título**: AI Engineer / Ingeniero de IA (antes "Desarrollador IA/ML").
- **Guardrails de confidencialidad**: VITALY/Preving sí (ya públicos en la web). **Cero nombres internos**: sin codenames, sin aplicativos internos, sin nombres de producto internos. Métricas y cifras abstractas sí. Sin horas Redmine ni nº de prompts.
- **Énfasis Claude Code**: skill principal (agentes, orquestadores, skills) + revisión multi-modelo.
- **Alcance / orden**: CV web primero, luego LinkedIn (confirmación antes de guardar cada sección).

## Cambios en el CV (`public/cv.{es,en}.json`)

- **basics**: `tagline`, `summary`, `headline` (+`headlineAccent` "en producción." / "in production."), `stackChips`, `status.label`.
- **experience[0]** (rol actual): `role` → Ingeniero de IA / AI Engineer; `summary`, `highlights` (abstraídos, sin nombres internos), `headline`, `kpis`.
- **metrics** (Impact Bar): 4 métricas (ver abajo).
- **Sin cambios**: experience[1]/[2], projects, writing, certifications, urls, alsoRunning.

## Métricas publicables (acordadas)

- **−75% coste de procesado de datos** (de ~1.400 € a ~300 €): procesado más rápido + limpieza de documentos huérfanos (plataforma GCP).
- **70 → 90% validación documental**: consenso multi-LLM (GPT + Claude + Gemini) con OCR.
- **−35% coste infra** y **~15% latencia**: migración del chat a arquitectura agéntica (Google ADK + LiteLLM).
- **3,6M+ registros procesados, 0 pérdida**; backfill 2× (34 → 17 min).
- **91% → ~0% falsos negativos** en evaluación RAG (LLM-as-judge).

## Plan LinkedIn (después del CV)

Por secciones, con draft + confirmación antes de guardar cada una: **Titular → Acerca de → Experiencia (rol actual: título + bullets) → Aptitudes** (añadir Claude Code, Google ADK, Vertex AI, LiteLLM, RAG, Dataform, Dataflow, GKE). Foto/banner fuera de alcance.

## Fuera de alcance

Foto/banner de LinkedIn; proyectos personales; certificaciones; historial Claude del PC personal (no disponible como fichero en el formato nuevo).
