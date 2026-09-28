#!/usr/bin/env node
// Confere no Planalto a vigência de cada base legal citada pelas questões do banco.
//  - artigo/lei vigente  -> grava law_version_checked_at (a questão passa a aparecer no treinador)
//  - artigo/lei revogado -> content_status='revoked' (sai do treinador) e é listado no relatório
//  - página inacessível ou artigo não localizado -> segue oculta e é listada para revisão manual
// Uso: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/verify-legal-questions.mjs [--apply]
// Sem --apply é só simulação (nada é gravado).
import { createClient } from "@supabase/supabase-js";

const apply = process.argv.includes("--apply");
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const TABLES = ["official_exam_questions", "curated_question_catalog", "question_bank"];
const pages = new Map();

async function loadLaw(url) {
  if (!pages.has(url)) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      const buf = new Uint8Array(await res.arrayBuffer());
      const html = new TextDecoder(/charset=utf-?8/i.test(res.headers.get("content-type") ?? "") ? "utf-8" : "windows-1252").decode(buf);
      pages.set(url, res.ok ? html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ") : null);
    } catch {
      pages.set(url, null);
    }
  }
  return pages.get(url);
}

// -> "vigente" | "revogado" | "indeterminado"
async function checkBasis(basis) {
  if (!basis?.url || !/planalto\.gov\.br/i.test(basis.url)) return { state: "indeterminado", why: "sem link do Planalto" };
  const text = await loadLaw(basis.url.split("#")[0]);
  if (!text) return { state: "indeterminado", why: "página do Planalto inacessível" };
  if (/\bREVOGAD[AO]\b/.test(text.slice(0, 600))) return { state: "revogado", why: "norma inteira revogada" };
  const num = String(basis.artigo ?? "").match(/art(?:igo)?s?\.?\s*(\d+)/i)?.[1];
  if (!num) return { state: "vigente", why: "norma vigente (sem artigo específico)" };
  const start = text.search(new RegExp(`Art\.?\s*${num}\s*[ºo°]?(?!\d)`));
  if (start < 0) return { state: "indeterminado", why: `art. ${num} não localizado` };
  const rest = text.slice(start + 5);
  const end = rest.search(/Art\.?\s*\d+\s*[ºo°]?(?!\d)/);
  const article = text.slice(start, start + 5 + (end < 0 ? rest.length : end));
  if (/\((Revogad[oa]|Vetado)/i.test(article.slice(0, 400)))
    return { state: "revogado", why: `art. ${num} revogado/vetado` };
  return { state: "vigente", why: `art. ${num} vigente` };
}

const report = { vigente: 0, revogado: [], indeterminado: [] };
for (const table of TABLES) {
  const { data, error } = await db.from(table).select("*").neq("legal_basis", "[]");
  if (error) throw error;
  for (const row of data) {
    if (["revoked", "obsolete", "archived"].includes(row.content_status)) continue;
    const results = [];
    for (const basis of row.legal_basis ?? []) results.push({ basis, ...(await checkBasis(basis)) });
    const bad = results.find((r) => r.state === "revogado");
    const unknown = results.find((r) => r.state === "indeterminado");
    const label = `${table} ${row.id} (${row.contest_name} ${row.exam_year ?? row.contest_year})`;
    if (bad) {
      report.revogado.push(`${label}: ${bad.why}`);
      if (apply) await db.from(table).update({ content_status: "revoked" }).eq("id", row.id);
    } else if (unknown) {
      report.indeterminado.push(`${label}: ${unknown.why}`);
    } else {
      report.vigente += 1;
      if (apply) {
        const patch = { law_version_checked_at: new Date().toISOString() };
        if (table === "official_exam_questions") Object.assign(patch, { legal_audit_completed: true, legal_review_required: false });
        await db.from(table).update(patch).eq("id", row.id);
      }
    }
  }
}
console.log(`\n${apply ? "APLICADO" : "SIMULAÇÃO"} — vigentes conferidas: ${report.vigente}`);
if (report.revogado.length) console.log(`\n⚠ REVOGADAS/DESATUALIZADAS (removidas do treinador):\n- ${report.revogado.join("\n- ")}`);
if (report.indeterminado.length) console.log(`\nSem conferência automática (seguem ocultas, revisar):\n- ${report.indeterminado.join("\n- ")}`);
