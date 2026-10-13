// Genera el HTML estático de cada idioma a partir del build del cliente (dist/)
// y del build SSR (build/ssr/). React hidrata encima en el navegador.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssr = await import(pathToFileURL(path.join(root, "build/ssr/entry-server.js")).href);

let template = await readFile(path.join(dist, "index.html"), "utf8");

// CSS inline: evita una petición bloqueante en el primer render
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = await readFile(path.join(dist, cssLink[1]), "utf8");
  template = template.replace(cssLink[0], () => `<style>${css}</style>`);
}

for (const lang of ssr.locales) {
  const { html, dict } = ssr.render(lang);
  const page = template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<title>.*?<\/title>\s*/, "")
    .replace("<!--app-head-->", () => ssr.renderHead(lang, dict))
    .replace("<!--app-html-->", () => html);
  await mkdir(path.join(dist, lang), { recursive: true });
  await writeFile(path.join(dist, lang, "index.html"), page);
  console.log(`  ✓ /${lang}/`);
}

await writeFile(path.join(dist, "index.html"), ssr.renderRootPage());
await writeFile(path.join(dist, "404.html"), ssr.renderNotFoundPage());
await writeFile(path.join(dist, "sitemap.xml"), ssr.renderSitemap(new Date().toISOString().slice(0, 10)));
await writeFile(path.join(dist, "robots.txt"), ssr.renderRobots());
console.log("  ✓ / · 404 · sitemap.xml · robots.txt");
