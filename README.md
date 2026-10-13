# spbcode

Sitio personal de una sola página, bilingüe (italiano / español), en React + Vite + TypeScript.
Cada idioma sale prerenderizado como HTML estático (`/it/`, `/es/`) y React lo hidrata en el navegador.
Un servidor Express sirve los archivos y expone `POST /api/contact`.

## Estructura

```
src/
  i18n/          textos: it.ts, es.ts (tipados por types.ts) y locales.ts (idiomas e ids de sección)
  components/    Hero, CodeBackground, TopBar, LangSwitch, Services, Works, Method, About, Contact, Footer
  config.ts      URL del sitio, email visible, línea de stack, foto y imagen OG opcionales
  seo.ts         <head> por idioma (hreflang, OG, JSON-LD), página "/", 404, sitemap y robots
  main.tsx       entrada del cliente (hidrata)
  entry-server.tsx  entrada del prerender
scripts/
  prerender.mjs  genera dist/it/, dist/es/, dist/index.html, 404.html, sitemap.xml, robots.txt
  size.mjs       mide el JS comprimido (falla si supera 100 KB gzip)
server/          Express: estáticos + /api/contact (validación, honeypot, límite por IP, SMTP)
```

## Desarrollo

```bash
npm install
cp .env.example .env      # completar valores
npm run dev               # sitio en http://localhost:5173 (/it/ o /es/)
npm run dev:server        # API en http://localhost:3000 (Vite le pasa /api por proxy)
```

Sin SMTP configurado y fuera de producción, los mensajes del formulario se imprimen en la consola del servidor.

## Build

```bash
npm run build   # typecheck → cliente → SSR → prerender → servidor
npm run size    # control del peso de JS
npm start       # sirve dist/ y la API en $PORT (por defecto 3000)
```

Salida: `dist/` (sitio estático) y `build/server/index.js` (servidor).

## Variables de entorno

| Variable | Cuándo | Uso |
| --- | --- | --- |
| `VITE_SITE_URL` | build | URL pública sin barra final (canonical, hreflang, sitemap, JSON-LD) |
| `VITE_CONTACT_EMAIL` | build | email visible en Contacto |
| `PORT` | runtime | puerto del servidor |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | runtime | envío de email (465 = SSL) |
| `MAIL_FROM`, `MAIL_TO` | runtime | remitente y destinatario de los mensajes |
| `TRUST_PROXY` | runtime | saltos de proxy a confiar para obtener la IP real (por defecto 1) |

Las `VITE_*` se graban en el HTML durante el build: si cambian, hay que volver a construir.

## Despliegue en Hostinger (app Node.js)

`npm install` ejecuta el build automáticamente (script `postinstall`), porque el preset
Express de Hostinger solo corre `npm install` y no tiene campo de build command.
Por eso las herramientas de build (Vite, TypeScript) están en `dependencies`.

1. En hPanel → **Websites → Add website → Node.js app**, importar el repositorio de GitHub (rama `main`).
2. Configuración:
   - Framework: **Express** (no Vite: ese preset publica solo estáticos y no arranca la API)
   - Versión de Node: 22.x
   - Directorio raíz: el principal (`.`)
   - Archivo de entrada: `build/server/index.js`
3. Cargar las variables de entorno de la tabla anterior en el panel de la app (nunca en el repo).
   Las `VITE_*` se graban en el build: después de cambiarlas hay que hacer un redeploy.
4. Para el SMTP, crear una casilla en **Emails** con el dominio (`info@spbcode.com`) y usar `smtp.hostinger.com:465` con sus credenciales.
5. Desplegar y verificar: `/` redirige a `/it/` o `/es/`, `/sitemap.xml` responde, y el formulario envía.
6. Dar de alta el sitemap en Google Search Console.

En un VPS el proceso es el mismo: `npm ci` (que ya construye), y `npm start` bajo pm2 o systemd detrás de nginx (con `TRUST_PROXY=1`).

## Agregar un idioma (p. ej. inglés)

1. `src/i18n/locales.ts`: sumar `"en"` a `locales`, `localeNames`, `ogLocales` y `sectionIds`.
2. Crear `src/i18n/en.ts` con el tipo `Dict` (TypeScript marca lo que falte).
3. Sumarlo en `loadDict` (`src/i18n/index.ts`) y en `dicts` (`src/entry-server.tsx`).
4. Servidor: agregar el id de contacto en `server/contact.ts` y el idioma en la validación de `lang`.

## Antes de publicar

- [ ] Revisar que los textos de **Lavori / Trabajos** reflejen lo que hace cada proyecto.
- [ ] Definir `VITE_SITE_URL` y `VITE_CONTACT_EMAIL` reales.
- [ ] (Opcional) Foto en `public/img/` (WebP/AVIF) y completar `SITE.photo` en `src/config.ts`.
- [ ] (Opcional) Imagen OG 1200×630 en `public/` y completar `SITE.ogImage`.
- [ ] Probar el formulario en producción con el SMTP real.
