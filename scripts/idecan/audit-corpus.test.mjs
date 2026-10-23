import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { auditCorpus, sourceKind, renderReport } from "./audit-corpus.mjs";
const item = (changes = {}) => ({
  board: "IDECAN", contest_name: "PC - Polícia Civil", career_name: "Agente",
  exam_year: 2026, exam_type: "A", item_number: 1, subject: "Português",
  stem: "Enunciado completo?", options: { A: "Sim", B: "Não", C: "Outro", D: "Nenhum" },
  official_answer: "A", source_url: "https://concurso.idecan.org.br/prova.pdf",
  answer_key_url: "https://concurso.idecan.org.br/gabarito.pdf", ...changes,
});
test("duplicate booklets do not inflate incidence and conflicting keys remain explicit", () => {
  const report = auditCorpus([item(), item({ exam_type: "B" }), item({ exam_type: "C", official_answer: "B" })]);
  assert.equal(report.received_items, 3);
  assert.equal(report.retained_items, 1);
  assert.equal(report.duplicates, 1);
  assert.equal(report.conflicts, 1);
  assert.equal(report.publication_approved, false);
});
test("military questions have a separate comparison scope and per-booklet denominator", () => {
  const report = auditCorpus([item(), item({ item_number: 2, stem: "Outro?", subject: "Penal" }), item({ contest_name: "PM", career_name: "Soldado" })]);
  assert.equal(report.civil_police_items, 2);
  assert.equal(report.exams[0].subjects[0].share_of_retained_items, 50);
  assert.equal(report.exams[1].comparison_scope, "seguranca_complementar");
  assert.equal(report.exams[1].original_exam_items, null);
});
test("official-looking URLs do not certify an answer key or accept lookalike domains", () => {
  assert.equal(sourceKind("https://idecan.org.br.evil.test/key.pdf"), "mirror");
  assert.equal(sourceKind("https://antigo-concurso.idecan.org.br/Concurso.aspx?ID=201"), "contest_page");
  assert.equal(sourceKind("https://antigo-concurso.idecan.org.br/ConcursoDownloadArquivo.aspx?ID=GABARITO_OFICIAL_DEFINITIVO.pdf"), "generic_filename_not_reverified");
  assert.equal(sourceKind(item().answer_key_url), "official_link_not_reverified");
});
test("existing corpus is reproducible and its metadata does not approve publication", () => {
  const rows = JSON.parse(fs.readFileSync(new URL("../../supabase/imports/idecan/idecan_questions.json", import.meta.url)));
  const report = auditCorpus(rows);
  assert.equal(report.received_items, rows.length);
  assert.equal(report.exams.reduce((n, e) => n + e.retained_items, 0), report.retained_items);
  assert.deepEqual(report, JSON.parse(fs.readFileSync(new URL("../../supabase/imports/idecan/auditoria-local.json", import.meta.url))));
  assert.equal(report.online_verification_performed, false);
  assert.equal(report.database_import_performed, false);
  assert.equal(report.publication_approved, false);
  assert.match(renderReport(report), /não são pesos do edital/);
  assert.throws(() => auditCorpus([item({ board: "Outra banca" })]));
});

test("annulled items stay out of the retained subject denominator", () => {
  const report = auditCorpus([item(), item({ item_number: 2, stem: "Anulada?", official_answer: "X" })]);
  assert.equal(report.received_items, 2);
  assert.equal(report.annulled_items, 1);
  assert.equal(report.retained_items, 1);
  assert.equal(report.exams[0].subjects[0].share_of_retained_items, 100);
});
