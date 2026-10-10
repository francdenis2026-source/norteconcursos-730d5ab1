import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { validateCorpus } from "./import-question-corpus.mjs";
import { sessionAuthHeaders } from "./supabase-session-auth.mjs";

export function reviewChanges(previous, next) {
  validateCorpus(previous);
  validateCorpus(next);
  if (
    previous.source.id !== next.source.id ||
    previous.source.raw_text !== next.source.raw_text ||
    previous.candidates.length !== next.candidates.length
  )
    throw Error("Fonte divergente");
  const changes = [];
  for (const c of next.candidates) {
    const old = previous.candidates.find((x) => x.id === c.id);
    if (
      !old ||
      ["corpus_id", "source_key", "source_page", "discipline"].some((k) => c[k] !== old[k]) ||
      ["raw_text", "key", "page", "number", "subject", "answer"].some(
        (k) => c.payload[k] !== old.payload[k],
      )
    )
      throw Error("Extração original divergente");
    if (
      JSON.stringify(c.payload) === JSON.stringify(old.payload) &&
      c.content_status === old.content_status
    )
      continue;
    if (
      old.content_status !== "under_review" ||
      c.content_status === "under_review" ||
      !c.payload.individual_review
    )
      throw Error("Decisão anterior protegida ou revisão ausente");
    changes.push({
      candidate: c.id,
      expected_status: old.content_status,
      expected_payload: old.payload,
      next_status: c.content_status,
      next_payload: c.payload,
    });
  }
  return changes;
}
export async function run(previousPath, nextPath, reportPath, mode) {
  if (mode && mode !== "--dry-run") throw Error("Modo inválido");
  const changes = reviewChanges(
    JSON.parse(fs.readFileSync(previousPath, "utf8")),
    JSON.parse(fs.readFileSync(nextPath, "utf8")),
  );
  const report = {
    decisions: changes.length,
    updated: 0,
    unchanged: 0,
    dry_run: mode === "--dry-run",
    complete: false,
  };
  const save = () => fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  save();
  if (!report.dry_run) {
    const project = process.env.TASK_SUPABASE_PROJECT,
      key = process.env.TASK_SUPABASE_KEY;
    if (!/^[a-z]{20}$/.test(project ?? "") || !key)
      throw Error("Defina credenciais no ambiente da sessão");
    for (const change of changes) {
      const res = await fetch(
        `https://${project}.supabase.co/rest/v1/rpc/review_corpus_candidate`,
        {
          method: "POST",
          headers: { ...sessionAuthHeaders(key), "Content-Type": "application/json" },
          body: JSON.stringify(change),
          signal: AbortSignal.timeout(60000),
        },
      );
      if (!res.ok) throw Error(`Revisão recusada HTTP ${res.status}; consulte o registro atual`);
      const state = await res.json();
      if (!["updated", "unchanged"].includes(state)) throw Error("Resposta de revisão inválida");
      report[state]++;
      save();
    }
  }
  report.complete = true;
  save();
  return report;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [previous, next, report, mode] = process.argv.slice(2);
  if (!previous || !next || !report)
    throw Error(
      "Uso: node scripts/review-question-corpus.mjs ANTERIOR_JSON NOVO_JSON RELATORIO_JSON [--dry-run]",
    );
  console.log(JSON.stringify(await run(previous, next, report, mode)));
}
