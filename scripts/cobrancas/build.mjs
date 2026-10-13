// Levanta quais artigos de lei aparecem nas questões de provas da plataforma, por tipo de cargo.
// Uso: node --import ./scripts/alias.mjs scripts/cobrancas/build.mjs
// Saída: src/data/artigosCobrados.json (lido pela interface; regenerar quando entrarem novas provas).
//
// Fontes de citação, por questão: legal_basis, enunciado, comentário e nota de revisão. Só conta citação que
// resolve para um artigo existente de uma lei do percurso de estudo (índice de dispositivos); "art. 5º" sem lei
// identificável não é contado. Contagem por questão (a mesma questão citando o artigo duas vezes conta uma vez).
import { readFileSync, writeFileSync } from "node:fs";
import { buildRefIndex, splitRefs } from "../../src/lib/legalRefs.ts";
import { cargoGroup } from "../../src/lib/cobrancas.ts";
import { buildMatcher, matchQuestion } from "./match.mjs";

const env = readFileSync(".env.local", "utf8");
const get = (k) => env.match(new RegExp(`${k}=(.*)`))[1].trim().replace(/^"|"$/g, "");
const url = get("VITE_SUPABASE_URL"), key = get("SUPABASE_SERVICE_ROLE_KEY");
async function all(path) {
  const rows = [];
  for (let off = 0; ; off += 1000) {
    const r = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${off}-${off + 999}` } });
    const d = await r.json();
    if (!Array.isArray(d)) throw new Error(JSON.stringify(d).slice(0, 200));
    rows.push(...d);
    if (d.length < 1000) return rows;
  }
}

const courses = await all("legal_courses?select=id,slug,title&status=eq.active");
const slugOf = Object.fromEntries(courses.map((c) => [c.id, c.slug]));
const unitRows = await all("legal_course_units?select=course_id,unit_key,label,body_text&content_status=eq.current");
const index = buildRefIndex(courses, unitRows.map((u) => ({ course_id: u.course_id, unit_key: u.unit_key })));
const matcher = buildMatcher(unitRows.map((u) => ({ ...u, slug: slugOf[u.course_id] })));
// só questões de matérias jurídicas são ligadas por conteúdo
const LEGAL_SUBJECT = /direito|legisla|penal|processual|transito|humanos|constitu|administr|execucao|estatuto|criminal/i;

const sources = [
  { kind: "prova", table: "official_exam_questions", cols: "id,contest_name,exam_year,career_name,subject,question_text,legal_basis,review_note" },
  { kind: "prova", table: "board_exam_questions", cols: "id,contest_name,exam_year,career_name,subject,support_text,stem,options,legal_basis,explanation" },
  { kind: "repertorio", table: "curated_question_catalog", cols: "id,contest_name,contest_year,career_name,subject,question_text,legal_basis,explanation" },
];

const laws = {};
let questions = 0, withRef = 0;
for (const s of sources) {
  let rows;
  try { rows = await all(`${s.table}?select=${s.cols}&content_status=eq.active`); } catch { continue; }
  for (const q of rows) {
    questions++;
    const basis = Array.isArray(q.legal_basis) ? q.legal_basis.map((b) => `${b?.title ?? ""}`).join("; ") : "";
    const text = [basis, q.question_text, q.stem, q.explanation, q.review_note].filter(Boolean).join("\n");
    const found = new Set();
    for (const p of splitRefs(text, "", index)) if (p.href) found.add(`${p.href.slug}|${p.href.art}`);
    let how = "r";
    if (!found.size && LEGAL_SUBJECT.test((q.subject ?? "").normalize("NFD").replace(/[̀-ͯ]/g, ""))) {
      // sem citação explícita: liga pelo conteúdo do enunciado (precisão medida em eval.mjs: cerca de 91% no artigo, com cobertura menor)
      const m = matchQuestion(matcher, [q.question_text, q.stem].filter(Boolean).join(" "));
      if (m) { found.add(`${m.slug}|${m.art}`); how = "i"; }
    }
    if (!found.size) continue;
    withRef++;
    const group = cargoGroup(q.contest_name, q.career_name);
    const year = q.exam_year ?? q.contest_year ?? null;
    for (const f of found) {
      const [slug, art] = f.split("|");
      const law = (laws[slug] ??= {});
      const a = (law[art] ??= { n: 0, r: 0, p: 0, g: {}, c: [] });
      a.n++;
      if (how === "r") a.r++;
      if (s.kind === "prova") a.p++;
      a.g[group] = (a.g[group] ?? 0) + 1;
      const label = `${q.contest_name}${year ? ` ${year}` : ""}`;
      if (a.c.length < 4 && !a.c.includes(label)) a.c.push(label);
    }
  }
}
const out = { generatedAt: new Date().toISOString().slice(0, 10), questions, withRef, laws };
writeFileSync("src/data/artigosCobrados.json", JSON.stringify(out));
const arts = Object.values(laws).reduce((n, l) => n + Object.keys(l).length, 0);
console.log(`${questions} questões, ${withRef} com artigo identificado, ${Object.keys(laws).length} leis, ${arts} artigos cobrados`);
for (const [slug, l] of Object.entries(laws)) console.log(slug.padEnd(26), Object.keys(l).length, "artigos; mais cobrados:", Object.entries(l).sort((a, b) => b[1].n - a[1].n).slice(0, 4).map(([k, v]) => `${k}(${v.n})`).join(", "));
