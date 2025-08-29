# 🧪 Guía Completa del Sistema de Testing y CI/CD

## 🎯 Objetivo
Documentar todo el sistema de testing, validación y CI/CD implementado en el proyecto One Daily Blog para replicarlo en otros proyectos Astro.

---

## 📋 Arquitectura General del Sistema

### 🏗️ **Estructura de Testing**
```
proyecto/
├── .github/workflows/         # GitHub Actions
│   ├── ci.yml                # CI/CD principal
│   ├── auto-fix.yml          # Auto-corrección automatizada
│   └── health-monitor.yml    # Monitoreo de salud
├── scripts/                  # Scripts locales
│   ├── pre-commit-hook.sh    # Hook pre-commit
│   └── setup-dev-environment.sh
├── src/test/                 # Tests unitarios
│   ├── api.test.ts          # Tests de API
│   └── test-utils.ts        # Utilidades de testing
├── eslint.config.js          # Configuración ESLint
└── package.json             # Scripts npm
```

---

## 🔧 **1. Sistema Pre-Commit Local**

### **Pre-Commit Hook** (`scripts/pre-commit-hook.sh`)

**Propósito**: Validar código antes de cada commit localmente.

**Validaciones que ejecuta**:
1. ✅ **TypeScript**: `npm run type-check`
2. ✅ **ESLint**: `npm run lint` (con auto-fix)
3. ✅ **Prettier**: `npm run format:check` (con auto-format)
4. ⚠️ **Security Audit**: `npm audit` (no-blocking)
5. ✅ **Build Test**: `npm run build`

**Instalación**:
```bash
# Automática via setup script
npm run setup

# Manual
cp scripts/pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

**Características**:
- **Auto-fix**: Corrige automáticamente problemas de linting y formato
- **Build validation**: Verifica que el proyecto compile correctamente
- **Non-blocking security**: Auditoría de seguridad informa pero no bloquea
- **Colored output**: Salida coloreada para mejor UX

---

## 🤖 **2. GitHub Actions CI/CD**

### **A) Workflow Principal** (`ci.yml`)

**Triggers**:
- Push a `main`
- Pull Requests a `main`
- Manual dispatch
- Ignora cambios en documentación

**Jobs**:

#### **🔍 Job: test-and-validate**
```yaml
- TypeScript validation    # npm run type-check
- ESLint code quality     # npm run lint
- Prettier formatting     # npm run format:check
- Security audit          # npm audit --audit-level=moderate
- Dependency validation   # npm ls --depth=0
```

#### **🏗️ Job: build-and-deploy**
```yaml
- Build Astro site        # npm run build
- Verify build metrics    # Validar 750+ páginas HTML
- Test site preview       # npm run preview (timeout 15s)
- Deployment ready check  # Verificar estructura build
```

#### **🌐 Job: post-deploy-verification**
```yaml
- Health check main site  # curl https://blog.sergiomarquez.dev
- API endpoint check      # curl API + validate JSON
- Critical pages verify   # Homepage, About, RSS
- Performance baseline   # Measure load time (<2000ms)
```

#### **🤖 Job: auto-fix-issues** (si falla CI)
```yaml
- Auto-fix linting issues # npm run lint:fix
- Update dependencies     # npm audit fix --force
- Auto-commit fixes       # git commit + push
```

### **B) Auto-Fix Workflow** (`auto-fix.yml`)

**Triggers**:
- Manual dispatch (con opciones)
- Programado semanal (Domingos 2 AM)

**Tipos de fix disponibles**:
- `all`: Todos los fixes
- `linting`: Solo ESLint/Prettier
- `dependencies`: Updates de dependencias
- `formatting`: Solo formato
- `security`: Solo seguridad

**Proceso**:
1. Ejecuta fixes según tipo seleccionado
2. Verifica que fixes no rompan build
3. Commitea cambios automáticamente
4. Genera reporte de summary

### **C) Health Monitor** (`health-monitor.yml`)

**Triggers**:
- Programado cada 6 horas
- Manual dispatch

**Monitoreo**:
- **Availability**: Homepage, About, RSS, API
- **Performance**: Load time measurement
- **Auto-issue creation**: Crea issues automáticamente si falla

**Endpoints monitoreados**:
```bash
- https://blog.sergiomarquez.dev         # Homepage
- https://blog.sergiomarquez.dev/about   # About page
- https://blog.sergiomarquez.dev/rss.xml # RSS feed
- https://blogapi.sergiomarquez.dev/api/posts # API
```

---

## ⚙️ **3. Configuración de Herramientas**

### **ESLint Config** (`eslint.config.js`)

**Características**:
- Configuración moderna (ESLint 9+)
- Soporte para JavaScript, TypeScript y Astro
- Reglas personalizadas para calidad de código
- Globals para Node.js y Browser

**Reglas clave**:
```javascript
'no-console': 'warn',           // Warn en console.log
'no-debugger': 'error',         // Error en debugger
'prefer-const': 'error',        // Preferir const
'no-unused-vars': 'error',      // Variables no usadas
'eqeqeq': ['error', 'always'],  // === siempre
```

### **Package.json Scripts**

```json
{
  "scripts": {
    "validate": "npm run type-check && npm run lint && npm run format:check",
    "type-check": "astro check",
    "lint": "eslint . --ext .js,.ts,.astro",
    "lint:fix": "eslint . --ext .js,.ts,.astro --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "health-check": "curl -f -s https://blog.sergiomarquez.dev && echo 'Site is up!'",
    "security-audit": "npm audit && npm run lint && echo 'Security audit complete'",
    "pre-deploy": "npm run validate && npm run test && npm run build"
  }
}
```

---

## 🧪 **4. Testing Setup**

### **Framework de Testing**
- **Vitest**: Test runner moderno y rápido
- **jsdom**: DOM testing environment
- **Test utilities**: Mocks y helpers reutilizables

### **Estructura de Tests**
```typescript
// src/test/test-utils.ts - Utilities
export const mockPost: DbPost = { /* mock data */ };

// src/test/api.test.ts - API tests
describe('API functions', () => {
  test('should fetch posts correctly', async () => {
    // Test implementation
  });
});
```

---

## 🚀 **5. Implementación en Nuevo Proyecto**

### **Paso 1: Copiar Archivos Base**
```bash
# Crear estructura
mkdir -p .github/workflows scripts src/test

# Copiar workflows
cp ci.yml auto-fix.yml health-monitor.yml .github/workflows/

# Copiar scripts
cp scripts/* scripts/

# Copiar configuraciones
cp eslint.config.js package.json ./
```

### **Paso 2: Personalizar Configuración**

**En workflows YAML**:
```yaml
# Cambiar URLs en health checks
- https://tu-sitio.com
- https://api.tu-sitio.com

# Ajustar métricas esperadas
if [ "$HTML_COUNT" -ge 50 ]; then  # Tu número esperado
```

**En scripts**:
```bash
# Personalizar comandos específicos del proyecto
npm run your-build-command
```

### **Paso 3: Actualizar package.json**
```json
{
  "scripts": {
    "validate": "npm run type-check && npm run lint && npm run format:check",
    "type-check": "astro check",
    "lint": "eslint . --ext .js,.ts,.astro",
    "lint:fix": "eslint . --ext .js,.ts,.astro --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "setup": "bash scripts/setup-dev-environment.sh",
    "health-check": "curl -f -s https://tu-sitio.com && echo 'Site is up!'"
  },
  "devDependencies": {
    "@eslint/js": "^9.34.0",
    "@typescript-eslint/eslint-plugin": "^8.41.0",
    "@typescript-eslint/parser": "^8.41.0",
    "eslint": "^9.34.0",
    "eslint-plugin-astro": "^1.3.1",
    "prettier": "^3.6.2",
    "prettier-plugin-astro": "^0.14.1",
    "vitest": "^3.2.4"
  }
}
```

### **Paso 4: Configurar Entorno**
```bash
# Instalar dependencias
npm install

# Configurar hooks y entorno
npm run setup

# Verificar funcionamiento
npm run validate
```

---

## 🎯 **6. Beneficios del Sistema**

### **Para Desarrolladores**:
- ✅ **Feedback inmediato**: Pre-commit hook detecta problemas al instante
- ✅ **Auto-corrección**: Muchos problemas se arreglan automáticamente
- ✅ **Consistencia**: Formato y estilo uniformes
- ✅ **Calidad**: TypeScript + ESLint garantizan código robusto

### **Para Producción**:
- ✅ **Reliability**: Health monitoring 24/7
- ✅ **Quick recovery**: Auto-fixes para problemas comunes
- ✅ **Performance tracking**: Métricas de rendimiento automáticas
- ✅ **Issue management**: Creación automática de issues en fallos

### **Para CI/CD**:
- ✅ **Pipeline robusto**: Múltiples validaciones en paralelo
- ✅ **Self-healing**: Capacidad de auto-reparación
- ✅ **Comprehensive**: Cubre testing, build, deploy y monitoring
- ✅ **Scalable**: Fácil de adaptar a diferentes proyectos

---

## ⚠️ **Notas Importantes**

1. **URLs personalizables**: Cambiar todas las URLs en workflows
2. **Métricas adaptables**: Ajustar números esperados según proyecto
3. **Tokens requeridos**: Algunos workflows necesitan `GITHUB_TOKEN`
4. **Dependencies**: Instalar todas las dev dependencies listadas
5. **Testing coverage**: Adaptar tests según funcionalidad del proyecto

---

## 📚 **Referencias y Documentación**

- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)
- [GitHub Actions Workflows](https://docs.github.com/en/actions/using-workflows)
- [Vitest Testing Framework](https://vitest.dev/guide/)
- [Prettier Code Formatter](https://prettier.io/docs/en/configuration.html)
- [Astro Check TypeScript](https://docs.astro.build/en/reference/cli-reference/#astro-check)

---

**✅ Con este sistema tendrás un proyecto con testing enterprise-grade, CI/CD robusto y monitoreo automático.**
