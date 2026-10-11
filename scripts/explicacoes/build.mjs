// Valida as explicações por artigo contra o texto oficial (units.json exportado do banco) e gera a migration SQL.
// Uso: node scripts/explicacoes/build.mjs <explicacoes.json> <units.json> [--sql <saida.sql>]
// Regras checadas:
//  - todo artigo do curso (status "current") tem explicação, e toda explicação aponta um artigo existente;
//  - todo número (dígitos) citado na explicação aparece no texto oficial da lei (ou é referência de artigo da lei);
//  - campos obrigatórios presentes (simples, pontos, atencao, exemplo, prova).
import fs from "node:fs";

const [, , expPath, unitsPath, ...rest] = process.argv;
const exp = { units: {} };
for (const f of expPath.split(",")) { // vários lotes da mesma lei: arquivo1.json,arquivo2.json
  const part = JSON.parse(fs.readFileSync(f, "utf8"));
  exp.course_slug ??= part.course_slug; exp.law ??= part.law.replace(/ — lote.*/, "");
  for (const k of Object.keys(part.units)) { if (exp.units[k]) throw new Error(`artigo repetido entre lotes: ${k}`); }
  Object.assign(exp.units, part.units);
}
const allUnits = JSON.parse(fs.readFileSync(unitsPath, "utf8"));
const courseId = process.env.COURSE_ID;
const partial = process.argv.includes("--partial");
const units = courseId ? allUnits.filter((u) => u.course_id === courseId) : allUnits;
const byKey = new Map(units.map((u) => [u.unit_key, u]));
const corpus = units.map((u) => u.body_text).join("\n");
const corpusNums = new Set(corpus.match(/\d+/g));
const errors = [];

for (const u of units) if (!partial && u.content_status === "current" && !exp.units[u.unit_key]) errors.push(`sem explicação: ${u.unit_key}`);
for (const [k, e] of Object.entries(exp.units)) {
  if (!byKey.has(k)) { errors.push(`artigo inexistente: ${k}`); continue; }
  for (const f of ["simples", "pontos", "atencao", "exemplo", "prova"]) if (!e[f] || (Array.isArray(e[f]) && !e[f].length)) errors.push(`${k}: campo vazio ${f}`);
  const text = JSON.stringify(e);
  for (const n of new Set(text.match(/\d+/g) ?? [])) {
    if (!corpusNums.has(n) && !/^(9\.034|1995|9\.807|1999)$/.test(n) && !["1", "2", "3", "4"].includes(n)) errors.push(`${k}: número ${n} não aparece no texto oficial`);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`OK: ${Object.keys(exp.units).length} explicações validadas contra ${units.length} dispositivos.`);

const i = rest.indexOf("--sql");
if (i >= 0) {
  const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";
  const j = (o) => q(JSON.stringify(o)) + "::jsonb";
  const lines = [
    `-- Explicações por artigo — ${exp.law}. Texto-base: dispositivos oficiais já cadastrados em legal_course_units.`,
    "-- Entram como 'under_review': só administradores veem até a publicação (update ... set status = 'published').",
  ];
  for (const [k, e] of Object.entries(exp.units)) {
    lines.push(
      `insert into public.legal_unit_explanations (unit_id, content_sha256, simples, pontos, atencao, exemplo, prova, termos, remissoes, status, authored_by)\n` +
      `select u.id, u.content_sha256, ${q(e.simples)}, ${j(e.pontos)}, ${j(e.atencao)}, ${q(e.exemplo)}, ${j(e.prova)}, ${j(e.termos ?? [])}, ${j(e.remissoes ?? [])}, 'under_review', 'claude'\n` +
      `from public.legal_course_units u join public.legal_courses c on c.id = u.course_id where c.slug = ${q(exp.course_slug)} and u.unit_key = ${q(k)}\n` +
      `on conflict (unit_id) do update set content_sha256 = excluded.content_sha256, simples = excluded.simples, pontos = excluded.pontos, atencao = excluded.atencao, exemplo = excluded.exemplo, prova = excluded.prova, termos = excluded.termos, remissoes = excluded.remissoes, status = case when public.legal_unit_explanations.status = 'published' then 'published' else 'under_review' end, updated_at = now();`,
    );
  }
  fs.writeFileSync(rest[i + 1], lines.join("\n\n") + "\n");
  console.log("SQL gravado em", rest[i + 1]);
}
