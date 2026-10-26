import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  matchesPracticeReview,
  isPracticeOfficialSource,
} from "../src/lib/materialPracticeReview.ts";
import { parseQuestion, questionAnswers } from "../src/lib/questionFormat.ts";
import { parseDidacticProvenance } from "../src/lib/didacticQuestion.ts";
const root = new URL("../supabase/imports/portugues-materiais-2026-10-24/", import.meta.url);
const m = JSON.parse(readFileSync(new URL("materials-package.json", root)));
const q = JSON.parse(readFileSync(new URL("questions-package.json", root)));
const routes = JSON.parse(readFileSync(new URL("input-routing.json", root)));
test("all 74 files route to published Portuguese materials and duplicate filenames never determine identity", () => {
  assert.equal(routes.length, 74);
  assert.equal(routes.filter((r) => r.duplicate_of !== null).length, 1);
  assert.equal(routes[9].duplicate_of, 0);
  assert.notEqual(routes[45].document_sha256, routes[46].document_sha256);
  assert.equal(routes[46].material_slug, "portugues-oracoes-adverbiais-conectores");
  assert.equal(new Set(m.rows.map((r) => r.material.slug)).size, 16);
  assert.equal(m.rows.filter((r) => r.kind === "new").length, 12);
  assert.equal(m.rows.filter((r) => r.kind === "update").length, 4);
  for (const r of routes) assert.ok(m.rows.some((x) => x.material.slug === r.material_slug));
  for (const r of m.rows) {
    assert.equal(r.material.discipline, "Língua Portuguesa");
    assert.equal(r.material.content_status, "active");
    assert.ok(!r.material.slug.startsWith("enem-"));
  }
});
test("every local twenty-item battery passes the platform approval validator and existing quizzes stay intact", () => {
  let count = 0;
  for (const r of m.rows) {
    assert.equal(r.material.quiz.length, 20);
    assert.ok(
      matchesPracticeReview(r.material.quiz, r.material.practice_review, r.material.slug),
      r.material.slug,
    );
    assert.equal(r.material.practice_review.syllabus_topic_id, r.topic.id);
    if (r.kind === "update") assert.deepEqual(r.material.quiz, r.expected_material.quiz);
    count += r.material.quiz.length;
  }
  assert.equal(count, 320);
});
test("official Senate guidance is supported without accepting lookalike domains or insecure protocols", () => {
  assert.ok(isPracticeOfficialSource("https://www12.senado.leg.br/manualdecomunicacao/estilos"));
  for (const url of [
    "http://www12.senado.leg.br/manual",
    "https://www12.senado.leg.br.evil.test/manual",
    "https://www12.senado.leg.br@evil.test/manual",
    "https://evil.test/manual",
  ])
    assert.equal(isPracticeOfficialSource(url), false, url);
});
test("previous worked examples and progress identities are preserved and final text hashes are valid", () => {
  const titles = [];
  for (const r of m.rows) {
    const e = r.enrichment;
    assert.equal(
      e.source_body_sha256,
      createHash("sha256").update(r.material.body_md).digest("hex"),
    );
    const before = r.expected_active_enrichments.flatMap((e) => e.content.cases);
    assert.deepEqual(e.content.cases.slice(0, before.length), before);
    assert.equal(e.content.cases.length, before.length + 1);
    titles.push(e.content.cases.at(-1).title);
    assert.ok(!/AlfaCon|Giancarla Bombonato/.test(r.material.body_md));
  }
  assert.equal(new Set(titles).size, 16);
});
test("each active catalog item has a valid format, reviewed key and explicit didactic provenance", () => {
  const active = q.rows.filter((r) => r.question);
  assert.equal(active.length, 105);
  assert.equal(q.rows.length, 202);
  assert.equal(
    new Set(q.rows.map((r) => r.audit.document_sha256 + ":" + r.audit.item_number)).size,
    202,
  );
  for (const r of active) {
    const x = r.question;
    assert.equal(x.exam_board, "Material didático");
    assert.equal(x.subject, "Língua Portuguesa");
    assert.equal(x.is_original, false);
    assert.ok(parseDidacticProvenance(x.didactic_provenance));
    assert.ok(
      questionAnswers({ text: x.question_text }).includes(x.official_answer),
      String(r.input_index),
    );
    const parsed = parseQuestion(x.question_text);
    if (parsed.options.length) assert.ok(parsed.options.length >= 4);
    assert.ok(m.rows.some((row) => row.material.slug === x.didactic_provenance.materialSlug));
    assert.ok(x.explanation.includes("Exemplo"));
    assert.ok(!x.question_text.includes("Parte superior do formulário"));
  }
});
test("uncertain keys, missing context and historical official-document models remain outside student training", () => {
  const pending = q.rows.filter((r) => r.audit.review_status === "needs_review");
  assert.equal(pending.length, 94);
  for (const r of pending) {
    assert.equal(r.question, null);
    assert.equal(r.audit.question_id, null);
    assert.equal(r.audit.current_answer, null);
  }
  for (const index of [122, 130, 131, 162, 163, 166, 191, 196])
    assert.equal(q.rows.find((r) => r.input_index === index).audit.review_status, "needs_review");
  assert.equal(q.rows.filter((r) => r.audit.review_status === "duplicate_reused").length, 3);
  for (const r of q.rows.filter((r) => r.audit.review_status === "duplicate_reused"))
    assert.ok(q.rows.some((t) => t.question?.id === r.audit.question_id));
});
test("current normative references carry actual official retrieval hashes and old manual availability is not fabricated", () => {
  for (const s of m.sources) {
    assert.match(s.sha256, /^[a-f0-9]{64}$/);
    assert.ok(Number.isFinite(Date.parse(s.checked_at)));
  }
  assert.ok(m.sources.some((s) => s.url.includes("d9758")));
  assert.ok(m.sources.some((s) => s.url.includes("l15263")));
  assert.ok(!m.sources.some((s) => s.url.includes("manual-de-redacao.pdf")));
  const red = m.rows.find((r) => r.key === "redacao").material;
  assert.match(red.legal_review.scope, /não pôde ser reconsultado/);
  assert.match(red.body_md, /Decreto 9.758\/2019/);
  assert.match(red.body_md, /Lei 15.263\/2025/);
});
