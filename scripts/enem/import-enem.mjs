import { readFile, writeFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import { sessionAuthHeaders } from "../supabase-session-auth.mjs";

export function validateEnemPackage(p) {
  if (!p.sources?.length || !p.editions?.length || !p.topics?.length)
    throw Error("Matriz e fontes ausentes");
  const ids = new Set();
  for (const q of p.questions ?? []) {
    if (ids.has(q.id) || q.contest_name !== "ENEM")
      throw Error("Questão duplicada ou fora do ENEM");
    ids.add(q.id);
    const labels = [...q.question_text.matchAll(/^([A-E])\)\s+\S/gm)].map((m) => m[1]);
    if (labels.join("") !== "ABCDE" || !/^[A-E]$/.test(q.official_answer))
      throw Error("Alternativas ou gabarito incompletos");
    if (
      q.content_status !== "active" ||
      q.context_review_required ||
      q.legal_review_required ||
      !q.review_note?.includes("Resolução:")
    )
      throw Error("Revisão incompleta");
    if (
      !p.evidence?.reviewed_items?.includes(q.item_number) ||
      p.evidence?.excluded_annulled?.includes(q.item_number)
    )
      throw Error("Item não revisado ou anulado");
    if (!p.evidence?.visually_verified_pages?.includes(q.source_page))
      throw Error("Página não conferida");
    if (
      !p.topics.some(
        (t) =>
          t.id === q.current_syllabus_topic_id &&
          t.discipline === q.subject &&
          t.content_status === "current",
      )
    )
      throw Error("Classificação sem matriz");
    for (const id of [q.question_source_id, q.answer_key_source_id])
      if (
        !p.sources.some(
          (s) => s.id === id && s.is_official && new URL(s.url).hostname === "download.inep.gov.br",
        )
      )
        throw Error("Fonte de prova não oficial");
  }
  return p;
}

export function sameFields(actual, expected) {
  return (
    !!actual &&
    Object.entries(expected).every(([key, value]) =>
      /_at$/.test(key) && typeof value === "string"
        ? Date.parse(actual[key]) === Date.parse(value)
        : isDeepStrictEqual(actual[key], value),
    )
  );
}

async function main() {
  const [input, output, mode] = process.argv.slice(2);
  if (!input || !output || (mode && mode !== "--dry-run"))
    throw Error("Uso: node scripts/enem/import-enem.mjs PACOTE RELATORIO [--dry-run]");
  const pack = validateEnemPackage(JSON.parse(await readFile(input, "utf8")));
  const report = {
    dry_run: mode === "--dry-run",
    questions: pack.questions.length,
    inserted: {},
    preserved: {},
  };
  if (!report.dry_run) {
    const { TASK_SUPABASE_PROJECT: project, TASK_SUPABASE_KEY: key } = process.env;
    if (!/^[a-z]{20}$/.test(project ?? "") || !key)
      throw Error("Configure projeto e chave apenas no ambiente da sessão");
    const request = async (path, method = "GET", body) => {
      const res = await fetch(`https://${project}.supabase.co/rest/v1/${path}`, {
        method,
        headers: {
          ...sessionAuthHeaders(key),
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      if (!res.ok) throw Error(`Supabase ${res.status}: ${await res.text()}`);
      return res.json();
    };
    const groups = [
      ["content_sources", pack.sources, "url"],
      ["syllabus_editions", pack.editions, "id"],
      ["syllabus_topics", pack.topics, "id"],
      ["official_exam_questions", pack.questions, "id"],
    ];
    // Check every existing row before writing anything. Never replace another review.
    for (const [table, rows, identity] of groups) {
      for (const row of rows) {
        const found = await request(
          `${table}?${identity}=eq.${encodeURIComponent(row[identity])}&select=*`,
        );
        if (found.length && !sameFields(found[0], row))
          throw Error(`Registro existente diverge: ${table}/${row.id}; preservado`);
      }
    }
    for (const [table, rows, identity] of groups) {
      if (!rows.length) continue;
      const inserted = await request(`${table}?on_conflict=${identity}`, "POST", rows);
      report.inserted[table] = inserted.length;
      report.preserved[table] = rows.length - inserted.length;
      for (const row of rows) {
        const [actual] = await request(
          `${table}?${identity}=eq.${encodeURIComponent(row[identity])}&select=*`,
        );
        if (!sameFields(actual, row))
          throw Error(`Verificação posterior diverge: ${table}/${row.id}`);
      }
    }
  }
  await writeFile(output, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report));
}
if (process.argv[1]?.replaceAll("\\", "/").endsWith("/import-enem.mjs")) await main();
