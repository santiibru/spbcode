import compression from "compression";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { contactRouter } from "./contact.ts";

// Variables de entorno desde .env si existe (Node ≥ 20.12)
if (existsSync(".env")) process.loadEnvFile(".env");

const here = path.dirname(fileURLToPath(import.meta.url));
// build/server/index.js → ../../dist   |   server/index.ts → ../dist
const distDir = process.env.STATIC_DIR ?? [path.resolve(here, "../../dist"), path.resolve(here, "../dist")].find(existsSync)!;

const app = express();
app.disable("x-powered-by");
// Detrás del proxy de Hostinger, para que req.ip sea la IP real del visitante
app.set("trust proxy", Number(process.env.TRUST_PROXY ?? 1));

app.use(compression());
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

app.use("/api", contactRouter);

app.use(
  express.static(distDir, {
    setHeaders(res, file) {
      // Los archivos de /assets llevan hash en el nombre: se pueden cachear para siempre
      if (file.includes(`${path.sep}assets${path.sep}`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      else res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    },
  }),
);

app.use((_req, res) => {
  res.status(404).sendFile(path.join(distDir, "404.html"));
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`spbcode en http://localhost:${port}`));
