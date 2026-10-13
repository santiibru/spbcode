import { SITE } from "./config";
import { type Dict, type Locale, localeNames, localePath, locales, ogLocales, LANG_KEY } from "./i18n";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const abs = (path: string) => SITE.url + path;

function alternates() {
  return [
    ...locales.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(localePath(l))}">`),
    `<link rel="alternate" hreflang="x-default" href="${abs("/")}">`,
  ].join("\n    ");
}

function jsonLd(lang: Locale, dict: Dict) {
  const business = `${SITE.url}/#business`;
  const person = `${SITE.url}/#person`;
  const address = { "@type": "PostalAddress", addressLocality: "Milano", addressRegion: "MI", addressCountry: "IT" };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": business,
        name: SITE.name,
        url: abs(localePath(lang)),
        description: dict.meta.description,
        email: SITE.email,
        address,
        areaServed: { "@type": "City", name: "Milano" },
        availableLanguage: ["it", "es"],
        founder: { "@id": person },
        ...(SITE.ogImage ? { image: abs(SITE.ogImage) } : {}),
      },
      {
        "@type": "Person",
        "@id": person,
        name: SITE.author,
        jobTitle: dict.meta.jobTitle,
        workLocation: { "@type": "Place", address },
        knowsLanguage: ["it", "es"],
        worksFor: { "@id": business },
      },
    ],
  };
  // evita que un "</script>" dentro de los datos cierre la etiqueta
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function renderHead(lang: Locale, dict: Dict) {
  const url = abs(localePath(lang));
  const { title, description } = dict.meta;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    `<link rel="canonical" href="${url}">`,
    alternates(),
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:locale" content="${ogLocales[lang]}">`,
    ...locales.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${ogLocales[l]}">`),
    ...(SITE.ogImage
      ? [
          `<meta property="og:image" content="${abs(SITE.ogImage)}">`,
          `<meta property="og:image:width" content="1200">`,
          `<meta property="og:image:height" content="630">`,
          `<meta name="twitter:card" content="summary_large_image">`,
        ]
      : [`<meta name="twitter:card" content="summary">`]),
    `<script type="application/ld+json">${jsonLd(lang, dict)}</script>`,
  ];
  return tags.join("\n    ");
}

// Página mínima en la misma estética para "/" y para el 404
function shell(title: string, body: string, extraHead = "") {
  return `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#07080a">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <title>${esc(title)}</title>
    ${extraHead}
    <style>
      body{margin:0;min-height:100vh;min-height:100svh;display:grid;place-items:center;background:#07080a;color:#e8eaed;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;padding:24px;box-sizing:border-box}
      main{text-align:center}
      .logo{font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-weight:600;font-size:20px}.logo span{color:#7dd3a8}
      p{color:#8b919a;margin:20px 0 28px;line-height:1.6}
      nav{display:flex;gap:12px;justify-content:center}
      a{color:#e8eaed;text-decoration:none;border:1px solid #2a2e35;border-radius:999px;padding:10px 20px;font-weight:600}
      a:hover{border-color:#7dd3a8;color:#7dd3a8}
      a:focus-visible{outline:2px solid #7dd3a8;outline-offset:3px}
    </style>
  </head>
  <body>
    <main>${body}</main>
  </body>
</html>
`;
}

const langLinks = () =>
  `<nav aria-label="Lingua / Idioma">${locales
    .map((l) => `<a href="${localePath(l)}" hreflang="${l}" lang="${l}">${localeNames[l]}</a>`)
    .join("")}</nav>`;

// "/": sugiere idioma sin forzar. Manda la elección guardada; si no hay, el idioma del navegador.
export function renderRootPage() {
  const supported = JSON.stringify(locales);
  const script = `<script>(function(){var s=${supported},p=null;try{p=localStorage.getItem("${LANG_KEY}")}catch(e){}
var l=s.indexOf(p)>-1?p:null;if(!l){var n=navigator.languages||[navigator.language||""];for(var i=0;i<n.length&&!l;i++){var c=String(n[i]).slice(0,2).toLowerCase();if(s.indexOf(c)>-1)l=c}}
location.replace("/"+(l||"${locales[0]}")+"/"+location.hash)})()</script>`;
  const head = [
    `<meta name="description" content="Sviluppo web su misura · Desarrollo web a medida.">`,
    `<link rel="canonical" href="${abs("/")}">`,
    alternates(),
    script,
  ].join("\n    ");
  return shell(
    "spbcode — Sviluppo web su misura · Desarrollo web a medida",
    `<div class="logo">spb<span>code</span></div><p>Scegli la lingua · Elegí el idioma</p>${langLinks()}`,
    head,
  );
}

export function renderNotFoundPage() {
  return shell(
    "404 · spbcode",
    `<div class="logo">spb<span>code</span></div><p>Pagina non trovata · Página no encontrada</p>${langLinks()}`,
    `<meta name="robots" content="noindex">`,
  );
}

export function renderSitemap(lastmod: string) {
  const links = [
    ...locales.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(localePath(l))}"/>`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${abs("/")}"/>`,
  ].join("\n    ");
  const urls = locales
    .map((l) => `  <url>\n    <loc>${abs(localePath(l))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    ${links}\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${abs("/sitemap.xml")}\n`;
}
