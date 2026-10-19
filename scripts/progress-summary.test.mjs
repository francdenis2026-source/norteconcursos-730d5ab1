import test from "node:test";
import assert from "node:assert/strict";
import { progressSummary } from "../src/lib/progressSummary.ts";
const now = new Date("2026-10-19T04:50:00Z"); // Still October 18 in Acre.
const row = (id, created_at, is_correct = false, extra = {}) => ({
  id,
  question_id: id,
  question_source: "official",
  subject: "Direito Penal",
  is_correct,
  created_at,
  ...extra,
});
test("7-day period uses Acre boundaries, rejects invalid/future timestamps", () => {
  const data = progressSummary(
    [
      row("before", "2026-10-12T04:59:59Z"),
      row("start", "2026-10-12T05:00:00Z", true),
      row("utc", "2026-10-19T04:00:00Z"),
      row("future", "2026-10-19T05:00:00Z"),
      row("invalid", "bad"),
    ],
    [],
    7,
    now,
  );
  assert.equal(data.answered, 2);
  assert.equal(data.accuracy, 50);
  assert.equal(data.days, 2);
});
test("deduplicates before filtering, preserving first-answer methodology and source identity", () => {
  const data = progressSummary(
    [
      row("q", "2026-09-01T12:00:00Z"),
      row("again", "2026-10-18T12:00:00Z", true, { question_id: "q" }),
      row("q", "2026-10-18T13:00:00Z", true, { question_source: "curated" }),
    ],
    [],
    7,
    now,
  );
  assert.equal(data.answered, 1);
  assert.equal(data.correct, 1);
  assert.equal(data.days, 1);
});
test("empty history has no fabricated accuracy, best subject or evolution", () => {
  const d = progressSummary([], [], "all", now);
  assert.equal(d.accuracy, null);
  assert.equal(d.best, null);
  assert.equal(d.evolution, null);
  assert.deepEqual(d.weak, []);
});
test("evolution compares equal time halves and requires five answers in each", () => {
  const early = Array.from({ length: 5 }, (_, i) => row(`a${i}`, "2026-10-12T10:00:00Z", i === 0));
  const late = Array.from({ length: 5 }, (_, i) => row(`b${i}`, "2026-10-18T10:00:00Z", i < 4));
  assert.equal(progressSummary([...early, ...late], [], 7, now).evolution, 60);
  assert.equal(progressSummary([...early, ...late.slice(0, 4)], [], 7, now).evolution, null);
});
test("weak subject signals require adequate samples; simulators do not inflate accuracy", () => {
  const rows = Array.from({ length: 5 }, (_, i) => row(`a${i}`, "2026-10-18T10:00:00Z", i === 0));
  rows.push(row("small", "2026-10-18T11:00:00Z", true, { subject: "Informática" }));
  const d = progressSummary(
    rows,
    [{ finished_at: "2026-10-17T12:00:00Z", correct_answers: 100, total_questions: 100 }],
    7,
    now,
  );
  assert.equal(d.answered, 6);
  assert.equal(d.simulators, 1);
  assert.equal(d.days, 2);
  assert.equal(d.weak.length, 1);
  assert.equal(d.weak[0].accuracy, 20);
  assert.equal(d.best.subject, "Direito Penal");
});
test("all-time comparisons ignore later repeats but practice days include them", () => {
  const d = progressSummary(
    [
      row("q", "2026-09-01T12:00:00Z"),
      row("r", "2026-10-18T12:00:00Z", true, { question_id: "q" }),
    ],
    [],
    "all",
    now,
  );
  assert.equal(d.answered, 1);
  assert.equal(d.days, 2);
  assert.equal(d.evolution, null);
});
