import test from "node:test";
import assert from "node:assert/strict";
import { buildMetricLists, catalogById } from "../src/lib/metricQuestionLists.ts";

const row = (n, ok, at, source = "official") => ({
  id: `r${n}`,
  question_id: `q${n}`,
  question_source: source,
  subject: "Direito Penal",
  is_correct: ok,
  created_at: at,
});

test("only the first answer of each question counts, newest first", () => {
  const lists = buildMetricLists(
    [
      row(1, false, "2026-10-01T10:00:00Z"),
      { ...row(1, true, "2026-10-02T10:00:00Z"), id: "r1b" },
      row(2, true, "2026-10-03T10:00:00Z"),
      row(3, false, "2026-10-04T10:00:00Z"),
    ],
    [],
  );
  assert.deepEqual(lists.answered.map((i) => i.questionId), ["q3", "q2", "q1"]);
  assert.deepEqual(lists.correct.map((i) => i.questionId), ["q2"]);
  assert.deepEqual(lists.wrong.map((i) => i.questionId), ["q3", "q1"], "a later right answer does not undo the first wrong one");
});

test("the lists add up to the headline numbers", () => {
  const rows = Array.from({ length: 10 }, (_, i) => row(i, i % 3 !== 0, `2026-10-0${(i % 9) + 1}T10:00:00Z`));
  const lists = buildMetricLists(rows, []);
  assert.equal(lists.correct.length + lists.wrong.length, lists.answered.length);
  assert.equal(lists.answered.length, 10);
});

test("the same id from two sources stays two different questions", () => {
  const lists = buildMetricLists([row(1, true, "2026-10-01T10:00:00Z", "official"), row(1, false, "2026-10-01T11:00:00Z", "curated")], []);
  assert.equal(lists.answered.length, 2);
});

test("skipped items are listed apart from answers, newest first", () => {
  const lists = buildMetricLists([], [
    { question_id: "a", question_table: "board_exam_questions", reviewed: false, saved_at: "2026-10-01T10:00:00Z" },
    { question_id: "b", question_table: "official_exam_questions", reviewed: false, saved_at: "2026-10-05T10:00:00Z" },
  ]);
  assert.deepEqual(lists.skipped.map((i) => i.questionId), ["b", "a"]);
  assert.equal(lists.answered.length, 0);
  assert.ok(lists.skipped.every((i) => i.result === "skipped"));
});

test("catalog lookup by id keeps the first registration", () => {
  const index = catalogById([{ id: "x", text: "um" }, { id: "x", text: "dois" }, { id: "y", text: "três" }]);
  assert.equal(index.get("x").text, "um");
  assert.equal(index.size, 2);
});
