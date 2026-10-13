// Mide el JS total del build comprimido con gzip y brotli (criterio: < 100 KB)
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

const dir = path.resolve("dist/assets");
let gz = 0, br = 0;
for (const f of (await readdir(dir)).filter((f) => f.endsWith(".js"))) {
  const buf = await readFile(path.join(dir, f));
  const g = gzipSync(buf, { level: 9 }).length, b = brotliCompressSync(buf).length;
  gz += g; br += b;
  console.log(`${f.padEnd(32)} ${(buf.length / 1024).toFixed(1).padStart(7)} KB  gzip ${(g / 1024).toFixed(1).padStart(6)} KB  br ${(b / 1024).toFixed(1).padStart(6)} KB`);
}
console.log(`\nTotal JS: gzip ${(gz / 1024).toFixed(1)} KB · brotli ${(br / 1024).toFixed(1)} KB`);
if (gz > 100 * 1024) process.exitCode = 1;
