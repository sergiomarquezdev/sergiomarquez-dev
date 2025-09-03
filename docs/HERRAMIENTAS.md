# Herramientas de Desarrollo - Guía Rápida

## 🚀 Bun (Package Manager & Runtime)

Bun ha reemplazado a npm como package manager del proyecto, proporcionando instalaciones 17x más rápidas.

### Comandos principales:
```bash
# Instalar dependencias
bun install

# Agregar nueva dependencia
bun add <package>

# Agregar dependencia de desarrollo  
bun add -D <package>

# Remover dependencia
bun remove <package>

# Ejecutar scripts
bun run <script-name>
```

## 🎯 Biome (Linter & Formatter)

Biome ha reemplazado a ESLint + Prettier, proporcionando linting y formateo 35x más rápido en una sola herramienta.

### Comandos principales:
```bash
# Verificar código (lint + format check)
bun run lint

# Aplicar correcciones automáticas
bun run lint:fix

# Solo formatear
bun run format

# Solo verificar formato
bun run format:check
```

### Configuración
La configuración está en `biome.json` y incluye:
- Compatibilidad 97% con Prettier
- Reglas de linting recomendadas
- Organización automática de imports
- Soporte para Astro, TypeScript, JavaScript

## 📋 Comandos de Desarrollo

Los comandos habituales siguen funcionando igual, pero ahora son más rápidos:

```bash
# Desarrollo
bun run dev

# Build
bun run build

# Validación completa (type-check + lint + build)
bun run validate

# Type checking
bun run type-check
```

## 🔧 Beneficios Obtenidos

- ⚡ **Instalaciones ultra-rápidas**: Bun vs npm (17x mejora)
- 🎨 **Formateo ultra-rápido**: Biome vs Prettier (35x mejora)  
- 🔍 **Linting ultra-rápido**: Biome vs ESLint (significativamente más rápido)
- 📦 **Configuración simplificada**: Un archivo vs múltiples archivos de config
- 🛠️ **Herramientas unificadas**: Una herramienta en lugar de múltiples
- 💾 **Menor uso de espacio**: Menos dependencias instaladas

## 📁 Archivos de Configuración

- `biome.json` - Configuración de Biome (linting + formatting)
- `bun.lock` - Lockfile de Bun (equivalente a package-lock.json)
- `package.json` - Scripts actualizados para usar Bun/Biome

## 🔄 Migración Completada

- ✅ ESLint → Biome
- ✅ Prettier → Biome  
- ✅ npm → Bun
- ✅ Configuraciones múltiples → Configuración unificada
- ✅ Dependencias obsoletas removidas
