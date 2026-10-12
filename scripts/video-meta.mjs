// Lê data de publicação e permissão de incorporação dos vídeos do catálogo (páginas públicas do YouTube).
// Uso: node scripts/video-meta.mjs   → grava src/data/videoMeta.json  (id → { d: "AAAA-MM-DD", e: true|false })
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const src = readFileSync("src/data/topicVideos.ts", "utf8");
const ids = [...new Set([...src.matchAll(/id: "([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]))];
const out = existsSync("src/data/videoMeta.json") ? JSON.parse(readFileSync("src/data/videoMeta.json", "utf8")) : {};
const todo = ids.filter((id) => !(id in out));
console.log(ids.length, "vídeos;", todo.length, "a consultar");
async function one(id) {
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${id}`, { signal: AbortSignal.timeout(15000), headers: { Range: "bytes=0-300000", "User-Agent": "Mozilla/5.0", "Accept-Language": "pt-BR" } });
    const t = await r.text();
    const d = t.match(/"uploadDate":"(\d{4}-\d{2}-\d{2})/)?.[1] ?? null;
    const status = t.match(/"playabilityStatus":\{"status":"([A-Z_]+)"/)?.[1] ?? null;
    const emb = t.match(/"playableInEmbed":(true|false)/)?.[1];
    out[id] = { d, e: emb ? emb === "true" : null, s: status };
  } catch { out[id] = { d: null, e: null, s: "ERR" }; }
}
let i = 0;
await Promise.all(Array.from({ length: 8 }, async () => { while (i < todo.length) { await one(todo[i++]); if (i % 50 === 0) { console.log(i); writeFileSync("src/data/videoMeta.json", JSON.stringify(out)); } } }));
writeFileSync("src/data/videoMeta.json", JSON.stringify(out));
const vals = Object.values(out);
console.log("com data:", vals.filter((v) => v.d).length, "| não incorporáveis:", vals.filter((v) => v.e === false).length, "| indisponíveis:", vals.filter((v) => v.s && v.s !== "OK").length);
