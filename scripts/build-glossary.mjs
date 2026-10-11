// Gera src/data/glossary.generated.json a partir dos "termos" das explicações por artigo (scripts/explicacoes/*.json).
// Termos com mais de um sentido ficam com o primeiro e mantêm a lista de leis onde aparecem.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const map = new Map();
for (const f of readdirSync("scripts/explicacoes").filter((n) => n.endsWith(".json")).sort()) {
  const d = JSON.parse(readFileSync(`scripts/explicacoes/${f}`, "utf8"));
  for (const u of Object.values(d.units ?? {})) for (const t of u.termos ?? []) {
    const k = norm(t.termo);
    const cur = map.get(k) ?? { term: t.termo, meaning: t.significado, laws: [] };
    if (d.course_slug && !cur.laws.includes(d.course_slug)) cur.laws.push(d.course_slug);
    map.set(k, cur);
  }
}
const out = [...map.values()].sort((a, b) => norm(a.term).localeCompare(norm(b.term), "pt-BR"));
writeFileSync("src/data/glossary.generated.json", JSON.stringify(out, null, 1) + "\n");
console.log(out.length, "termos");
