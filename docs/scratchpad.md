# Scratchpad - Implementación AdSense

## Estado Actual

- **Fecha**: 2025-08-29
- **Proyecto**: sergiomarquez.dev (portfolio principal)
- **Objetivo**: Implementar verificación de AdSense para permitir monetización del blog en subdominio

## Tareas Activas

- [x] [Implementación AdSense Verification](./implementation-plan/adsense-verification.md) - **COMPLETADO** ✅
- [x] [Portfolio Audit and Optimization](./implementation-plan/portfolio-audit.md) - **PLAN READY** �

## Lessons Learned

- [2025-08-29] El dominio principal `sergiomarquez.dev` debe verificarse con AdSense antes de poder monetizar subdominios como `blog.sergiomarquez.dev`
- [2025-08-29] Se requiere implementación mínima de cookies y política de privacidad para cumplir con GDPR
- [2025-08-29] Tres opciones de verificación: fragmento de código, ads.txt, o etiqueta meta (más simple)
- [2025-08-29] **IMPLEMENTACIÓN EXITOSA**: Meta tag de AdSense integrada con banner de cookies GDPR-compliant
- [2025-08-29] Astro permite scripts con tipo `client:load` para funcionalidad del lado del cliente
- [2025-08-29] LocalStorage es efectivo para guardar consentimiento de cookies del usuario

## Notas de Proyecto

- Publisher ID: `ca-pub-7569719493920591`
- Proyecto usa Astro como framework
- Estructura actual es un portfolio minimalista
- Evitar contaminar el diseño actual con implementaciones complejas
