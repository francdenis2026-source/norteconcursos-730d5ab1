// Gera o SQL que cadastra textos de apoio de provas e liga cada texto aos seus itens.
// Uso: node scripts/support-texts/build.mjs <arquivo.json> <saida.sql>
//
// Formato do arquivo (um por prova):
// {
//   "contest": "Câmara dos Deputados",       // igual a official_exam_questions.contest_name
//   "year": 2026,
//   "board": "CEBRASPE",
//   "source": "Caderno de provas CD-PLF 2026 (transcrição verbatim)",
//   "texts": [
//     { "label": "Texto 1", "body": "Parágrafos separados por linha em branco.\n\nSegundo parágrafo…", "items": [1, 2, 3, 4, 5, 6, 7, 8] }
//   ]
// }
// O texto deve ser transcrito do caderno oficial, sem alterações. Se a prova numera as linhas, mantenha a numeração
// no início de cada linha ("1 Imagine uma operação…"): o treinador a separa e oferece as linhas numeradas.
import { readFileSync, writeFileSync } from "node:fs";

const quote = (s) => `'${String(s).replace(/'/g, "''")}'`;

export function buildSupportTextsSql(doc) {
  if (!doc || !doc.contest || !Number.isInteger(doc.year) || !Array.isArray(doc.texts) || !doc.texts.length) throw new Error("Arquivo inválido: informe contest, year e texts");
  const seen = new Map();
  const out = [`-- Textos de apoio: ${doc.contest} ${doc.year}${doc.board ? ` (${doc.board})` : ""}`];
  doc.texts.forEach((t, n) => {
    if (!t.label || !t.body || !String(t.body).trim()) throw new Error(`Texto ${n + 1}: informe label e body`);
    if (!Array.isArray(t.items) || !t.items.length || t.items.some((i) => !Number.isInteger(i) || i < 1)) throw new Error(`Texto "${t.label}": informe a lista de itens (números inteiros)`);
    for (const i of t.items) {
      if (seen.has(i)) throw new Error(`O item ${i} aparece nos textos "${seen.get(i)}" e "${t.label}"`);
      seen.set(i, t.label);
    }
    // tag única evita conflito com qualquer conteúdo do texto
    const tag = `$txt${n}$`;
    out.push(
      `with t as (insert into public.question_support_texts (label, body, contest_name, exam_year, exam_board, source_note) values (${quote(t.label)}, ${tag}${String(t.body).trim()}${tag}, ${quote(doc.contest)}, ${doc.year}, ${doc.board ? quote(doc.board) : "null"}, ${doc.source ? quote(doc.source) : "null"}) returning id)`,
      `update public.official_exam_questions q set support_text_id = t.id from t where q.contest_name = ${quote(doc.contest)} and q.exam_year = ${doc.year} and q.subject ilike '%portugu%' and q.item_number in (${t.items.join(", ")});`,
    );
  });
  return out.join("\n") + "\n";
}

if (process.argv[1] && process.argv[1].endsWith("build.mjs") && process.argv[2]) {
  const [input, output] = process.argv.slice(2);
  if (!output) throw new Error("Uso: node scripts/support-texts/build.mjs <arquivo.json> <saida.sql>");
  writeFileSync(output, buildSupportTextsSql(JSON.parse(readFileSync(input, "utf8"))));
  console.log("OK", output);
}
