// Lista as questões de Português que citam "o texto" sem ter o texto de apoio, agrupadas por prova.
// Uso: node --import ./scripts/alias.mjs scripts/support-texts/report.mjs [saida.md]
import { readFileSync, writeFileSync } from "node:fs";
import { needsMissingSupportText } from "../../src/lib/questionText.ts";

const env = readFileSync(".env.local", "utf8");
const get = (k) => env.match(new RegExp(`${k}=(.*)`))[1].trim().replace(/^"|"$/g, "");
const url = get("VITE_SUPABASE_URL"), key = get("SUPABASE_SERVICE_ROLE_KEY");

async function all(path) {
  const rows = [];
  for (let off = 0; ; off += 1000) {
    const r = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${off}-${off + 999}` } });
    const d = await r.json();
    rows.push(...d);
    if (d.length < 1000) return rows;
  }
}

const rows = await all("official_exam_questions?select=contest_name,exam_year,exam_board,item_number,subject,question_text&subject=ilike.*portugu*&content_status=eq.active");
const groups = new Map();
for (const r of rows) {
  if (!needsMissingSupportText({ subject: r.subject, text: r.question_text, source: "official" })) continue;
  const k = `${r.contest_name} (${r.exam_year})`;
  groups.set(k, [...(groups.get(k) ?? []), r.item_number]);
}
const lines = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
const total = lines.reduce((n, [, v]) => n + v.length, 0);
const md = [
  "# Questões de Língua Portuguesa sem o texto de apoio",
  "",
  `Gerado em ${new Date().toISOString().slice(0, 10)}. ${total} questões de ${lines.length} provas citam "o texto", "parágrafo" ou "linha" e não têm o texto cadastrado. Enquanto o texto não existir, o treinador as deixa de fora.`,
  "",
  "Para cadastrar: transcreva cada texto do caderno oficial em um arquivo JSON (formato em `scripts/support-texts/build.mjs`) e gere o SQL com `node scripts/support-texts/build.mjs arquivo.json saida.sql`.",
  "",
  "| Prova | Questões sem texto | Números dos itens |",
  "|---|---|---|",
  ...lines.map(([k, v]) => `| ${k} | ${v.length} | ${[...new Set(v)].sort((a, b) => a - b).join(", ")} |`),
  "",
].join("\n");
writeFileSync(process.argv[2] ?? "docs/questoes-textos-de-apoio-pendentes.md", md);
console.log(`${total} questões em ${lines.length} provas`);
