import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parseDidacticProvenance, questionDisplayOrigin } from "../src/lib/didacticQuestion.ts";
import { filterTrainerQuestions, trainerFilterFacets } from "../src/lib/trainerFilters.ts";
import { questionIdentity, simulatorReference } from "../src/lib/questionIdentity.ts";
import { parseQuestion, questionAnswers } from "../src/lib/questionFormat.ts";
import { isAppliedExamQuestion } from "../src/lib/questionFilterIdentity.ts";
const p = JSON.parse(
  fs.readFileSync(
    new URL(
      "../supabase/imports/didactic-question-catalog-2026-10-24/package.json",
      import.meta.url,
    ),
  ),
);
const rows = p.rows.filter((r) => r.question);
function mapped(r) {
  const q = r.question;
  return {
    id: q.id,
    table: "curated_question_catalog",
    source: "curated",
    contest: q.contest_name,
    year: String(q.contest_year),
    career: q.career_name,
    board: q.exam_board,
    subject: q.subject,
    subtopic: q.subtopic,
    testedTopic: q.tested_topic,
    text: q.question_text,
    answer: q.official_answer,
    explanation: q.explanation,
    legalBasis: q.legal_basis,
    checkedAt: q.law_version_checked_at,
    difficulty: q.difficulty,
    state: "",
    category: "",
    isOriginal: q.is_original,
    didacticProvenance: parseDidacticProvenance(q.didactic_provenance),
  };
}
const q = mapped(rows[0]);
const all = {
  area: "all",
  topic: "all",
  contest: "all",
  board: "all",
  career: "all",
  year: "all",
  appliedExam: "all",
  subject: "all",
  source: "all",
  reviewed: "all",
  difficulty: "all",
  state: "all",
  category: "all",
};
test("all inputs are classified and unverified items never enter the training catalog", () => {
  assert.equal(p.rows.length, 192);
  assert.equal(rows.length, 164);
  assert.equal(p.rows.filter((r) => r.audit.review_status === "needs_review").length, 25);
  assert.equal(p.rows.filter((r) => r.audit.review_status === "duplicate_reused").length, 3);
  for (const r of p.rows) {
    if (r.audit.review_status === "needs_review") {
      assert.equal(r.question, null);
      assert.equal(r.audit.current_answer, null);
      assert.equal(r.audit.question_id, null);
    }
  }
  assert.equal(
    new Set(p.rows.map((r) => r.audit.document_sha256 + ":" + r.audit.item_number)).size,
    192,
  );
});
test("catalogued material is explicitly didactic and does not masquerade as an official applied exam or original authoring", () => {
  for (const r of rows) {
    const q = mapped(r);
    assert.equal(questionDisplayOrigin(q), "didactic");
    assert.equal(q.isOriginal, false);
    assert.equal(q.board, "Material didático");
    assert.equal(isAppliedExamQuestion(q), false);
    assert.ok(
      q.didacticProvenance.publisher &&
        q.didacticProvenance.itemNumber &&
        q.didacticProvenance.documentName,
    );
  }
  assert.equal(
    parseDidacticProvenance({ ...q.didacticProvenance, documentSha256: "bad" }),
    undefined,
  );
  assert.equal(parseDidacticProvenance({ ...q.didacticProvenance, itemNumber: 0 }), undefined);
});
test("origin filter and facet counts use display origin, preserving official and curated scoring identity", () => {
  const official = {
    ...q,
    id: "official",
    source: "official",
    table: "official_exam_questions",
    didacticProvenance: undefined,
  };
  const authored = { ...q, id: "authored", didacticProvenance: undefined, isOriginal: true };
  const catalog = [q, official, authored];
  assert.deepEqual(
    filterTrainerQuestions(catalog, { ...all, source: "didactic" }, new Map()).map((q) => q.id),
    [q.id],
  );
  assert.deepEqual(
    filterTrainerQuestions(catalog, { ...all, source: "curated" }, new Map()).map((q) => q.id),
    ["authored"],
  );
  const facet = trainerFilterFacets(catalog, all, new Map());
  for (const kind of ["didactic", "official", "curated"])
    assert.equal(facet.counts.source.get(kind), 1);
  assert.equal(questionIdentity(q), questionIdentity({ ...q, didacticProvenance: undefined }));
  const ref = simulatorReference({
    id: "curated_question_catalog:" + q.id,
    originalId: q.id,
    sourceKind: "curated",
    didacticProvenance: q.didacticProvenance,
  });
  assert.equal(ref.source, "curated");
  assert.equal(questionIdentity(ref), questionIdentity(q));
  assert.ok(ref.didacticProvenance);
});
test("CE and the five-option MP exercise retain answer formats and reviewed keys", () => {
  for (const r of rows) {
    const q = mapped(r);
    assert.ok(questionAnswers(q).includes(q.answer));
  }
  const multi = mapped(rows.find((r) => r.input_index === 188));
  assert.equal(parseQuestion(multi.text).options.length, 5);
  assert.equal(multi.answer, "B");
  const ce = mapped(rows.find((r) => r.input_index === 34));
  assert.deepEqual(questionAnswers(ce), ["C", "E"]);
  assert.ok(ce.text.includes("prestação alternativa"));
});
