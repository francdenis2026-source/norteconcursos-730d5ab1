import test from "node:test";
import assert from "node:assert/strict";
import {
  performanceSourceResults,
  fallbackDifficulty,
  historicalErrorSummary,
} from "../src/lib/performanceAnalysis.ts";
import { publishReview, validateReview } from "./review/publish-question-review.mjs";

test("missing optional RPC does not discard recorded answers or simulator results", () => {
  const answers = [{ id: "a" }];
  const sims = [{ id: "s" }];
  const state = performanceSourceResults(
    [answers, sims, [], { data: null }, { data: null }, { error: { code: "PGRST202" } }].map(
      (value) => ({ status: "fulfilled", value }),
    ),
  );
  assert.deepEqual(state.values[0], answers);
  assert.deepEqual(state.values[1], sims);
  assert.equal(state.available.training, true);
  assert.equal(state.difficultyAvailable, false);
  assert.equal(state.warnings.length, 1);
});
test("failed sources are unavailable instead of genuine empty histories", () => {
  const state = performanceSourceResults([
    { status: "rejected", reason: Error("offline") },
    ...Array.from({ length: 5 }, () => ({ status: "fulfilled", value: { data: [] } })),
  ]);
  assert.equal(state.available.training, false);
  assert.equal(state.available.simulators, true);
});
test("discipline fallback counts first answers, distinguishes sources and caps old idle time", () => {
  const row = {
    id: "1",
    question_id: "q",
    question_source: "official",
    subject: "Direito Administrativo",
    created_at: "2026-10-01",
    is_correct: false,
    response_seconds: 9999,
  };
  const stats = fallbackDifficulty([
    { ...row, id: "2", is_correct: true, created_at: "2026-10-02" },
    row,
    { ...row, id: "3", question_source: "curated", is_correct: true, response_seconds: 10 },
  ]);
  assert.equal(stats.length, 1);
  assert.equal(stats[0].answered, 2);
  assert.equal(stats[0].accuracy, 50);
  assert.equal(stats[0].avgSeconds, 455);
  assert.equal(stats[0].topic, "Visão por disciplina");
});
const pack = () => ({
  purpose: "explanation-improvement",
  items: [
    {
      table: "official_exam_questions",
      expected: {
        id: "q",
        content_status: "active",
        syllabus_topic_id: "topic",
        question_text: "Preserved",
        official_answer: "C",
        legal_basis: [{ url: "https://www.planalto.gov.br/cf" }],
      },
      patch: {
        review_note: "Explanation ".repeat(30),
        law_version_checked_at: "2026-10-14T00:00:00Z",
      },
      evidence: {
        legal: true,
        reason: "Simplify teaching",
        sources: ["https://www.planalto.gov.br/cf"],
      },
    },
  ],
});
const request =
  (writes, changed = false) =>
  async (path, method = "GET", body) => {
    if (method === "PATCH") {
      writes.push(body);
      return [{ ...pack().items[0].expected, ...body }];
    }
    if (path.startsWith("official_exam_questions"))
      return [
        {
          ...pack().items[0].expected,
          ...(changed ? { review_note: "Other account edited" } : {}),
        },
      ];
    if (path.startsWith("syllabus_topics"))
      return [{ edition_id: "edition", content_status: "current" }];
    if (path.startsWith("syllabus_editions")) return [{ source_id: "source", status: "active" }];
    return [{ is_official: true, source_type: "edital", status: "vigente" }];
  };
test("active explanation improvements cannot change answers, stem or publication status", () => {
  for (const patch of [
    { official_answer: "E" },
    { question_text: "Changed" },
    { content_status: "under_review" },
  ]) {
    const p = pack();
    Object.assign(p.items[0].patch, patch);
    assert.throws(() => validateReview(p));
  }
});
test("active explanation dry run validates current syllabus and does not write", async () => {
  const writes = [];
  const result = await publishReview(pack(), request(writes), { dryRun: true });
  assert.equal(result.pending.length, 1);
  assert.equal(writes.length, 0);
});
test("concurrent explanation edit blocks publishing without any write", async () => {
  const writes = [];
  await assert.rejects(publishReview(pack(), request(writes, true)), /Concurrent revision/);
  assert.equal(writes.length, 0);
});
test("active explanation update preserves original answer and text in readback", async () => {
  const writes = [];
  const result = await publishReview(pack(), request(writes));
  assert.deepEqual(result.updated, ["q"]);
  assert.equal(writes.length, 1);
  assert.equal(writes[0].official_answer, undefined);
});

test("historical errors without status remain pending and do not merge sources", () => {
  const rows = [
    { question_id: "q", question_source: "official", is_correct: false },
    { question_id: "q", question_source: "curated", is_correct: false },
    { question_id: "ok", question_source: "official", is_correct: true },
  ];
  assert.deepEqual(
    historicalErrorSummary(rows, [
      { question_id: "q", question_source: "official", status: "dominado" },
    ]),
    { pendente: 1, revisado: 0, dominado: 1, total: 2 },
  );
});
