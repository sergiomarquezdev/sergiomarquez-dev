# 📄 Guía de Implementación: Verificación de AdSense para sergiomarquez.dev

## 🎯 Objetivo

Implementar la **solución mínima** para verificar el dominio principal `sergiomarquez.dev` con Google AdSense, permitiendo posteriormente monetizar el subdominio `blog.sergiomarquez.dev`.

## 📋 Contexto

- **Dominio principal**: `sergiomarquez.dev` (portfolio básico)
- **Subdominio**: `blog.sergiomarquez.dev` (blog con sistema completo de cookies)
- **AdSense Publisher ID**: `ca-pub-7569719493920591`
- **Objetivo**: Verificación mínima sin contaminar el portfolio actual

---

## 🛠️ Implementación Requerida

### 1. 🍪 **Sistema de Cookies Mínimo**

Crear un sistema básico de consentimiento solo para AdSense en `sergiomarquez.dev`:

#### A) **Banner de Cookies Simple**

```html
<!-- Cookie Banner (mostrar solo si no hay consentimiento) -->
<div
  id="cookie-banner"
  style="display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #2d3748; color: white; padding: 20px; z-index: 1000; text-align: center;"
>
  <p style="margin: 0 0 15px 0;">
    Este sitio utiliza cookies de Google AdSense para personalizar anuncios.
    <a href="/privacy" style="color: #63b3ed;">Ver Política de Privacidad</a>
  </p>
  <button
    onclick="acceptCookies()"
    style="background: #48bb78; color: white; border: none; padding: 10px 20px; margin-right: 10px; border-radius: 4px; cursor: pointer;"
  >
    Aceptar
  </button>
  <button
    onclick="rejectCookies()"
    style="background: #e53e3e; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;"
  >
    Rechazar
  </button>
</div>
```

#### B) **JavaScript para Gestión de Consentimiento**

```javascript
<script>
// Gestión de consentimiento de cookies
function checkCookieConsent() {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
        document.getElementById('cookie-banner').style.display = 'block';
    } else if (consent === 'accepted') {
        loadAdSense();
    }
}

function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    document.getElementById('cookie-banner').style.display = 'none';
    loadAdSense();
}

function rejectCookies() {
    localStorage.setItem('cookie-consent', 'rejected');
    document.getElementById('cookie-banner').style.display = 'none';
}

function loadAdSense() {
    // Solo cargar AdSense si el usuario ha dado consentimiento
    if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7569719493920591';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }
}

// Verificar consentimiento al cargar la página
document.addEventListener('DOMContentLoaded', checkCookieConsent);
</script>
```

### 2. 🏷️ **Verificación de AdSense**

#### **Opción Recomendada: Etiqueta Meta** (Más simple)

Añadir en el `<head>` de todas las páginas de `sergiomarquez.dev`:

```html
<meta name="google-adsense-account" content="ca-pub-7569719493920591" />
```

#### **Alternativa: Fragmento de código**

Si prefieres usar el script completo:

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7569719493920591"
  crossorigin="anonymous"
></script>
```

#### **Alternativa: Archivo ads.txt**

Crear archivo `ads.txt` en el directorio root con:

```
google.com, pub-7569719493920591, DIRECT, f08c47fec0942fa0
```

### 3. 📄 **Página de Política de Privacidad Mínima**

Crear `/privacy.html` o `/privacy/index.html`:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Política de Privacidad - Sergio Márquez</title>
    <meta name="google-adsense-account" content="ca-pub-7569719493920591" />
  </head>
  <body>
    <div
      style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;"
    >
      <h1>Política de Privacidad</h1>

      <h2>Uso de Cookies</h2>
      <p>
        Este sitio web utiliza cookies de Google AdSense para personalizar los
        anuncios que se muestran.
      </p>

      <h2>Google AdSense</h2>
      <p>
        Google AdSense utiliza cookies para mostrar anuncios relevantes. Puedes
        obtener más información sobre cómo Google utiliza la información
        publicitaria en
        <a href="https://policies.google.com/privacy"
          >su política de privacidad</a
        >.
      </p>

      <h2>Consentimiento</h2>
      <p>
        Al continuar navegando por este sitio, aceptas el uso de cookies según
        se describe en esta política.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier consulta sobre esta política, puedes contactar a través
        del blog:
        <a href="https://blog.sergiomarquez.dev">blog.sergiomarquez.dev</a>
      </p>
    </div>
  </body>
</html>
```

---

## 🚀 **Pasos de Implementación**

### **Paso 1**: Implementar el código

1. Añadir la etiqueta meta de AdSense en todas las páginas
2. Implementar el banner de cookies
3. Crear la página de política de privacidad

### **Paso 2**: Verificar en AdSense

1. Ir a Google AdSense
2. Seleccionar "Etiqueta meta" como método de verificación
3. Confirmar que el código está implementado
4. Hacer clic en "Verificar"

### **Paso 3**: Confirmación

Una vez verificado, AdSense permitirá añadir el subdominio `blog.sergiomarquez.dev` para monetización.

---

## ⚠️ **Notas Importantes**

1. **GDPR Compliance**: El banner de cookies es obligatorio en Europa
2. **Simplicidad**: Esta implementación es mínima y no interfiere con el portfolio actual
3. **Escalabilidad**: Si más adelante quieres expandir, puedes migrar al sistema completo del blog
4. **Testing**: Asegúrate de que el banner aparece en la primera visita
5. **Verificación**: Puede tardar unas horas en propagarse y ser detectado por AdSense

---

## 🔗 **Referencias**

- [Política de AdSense](https://support.google.com/adsense/answer/9012903)
- [GDPR y Cookies](https://policies.google.com/privacy)
- [Guía ads.txt](https://support.google.com/adsense/answer/7532444)

---

**✅ Con esta implementación tendrás la verificación de AdSense funcionando con el mínimo impacto en tu portfolio actual.**
