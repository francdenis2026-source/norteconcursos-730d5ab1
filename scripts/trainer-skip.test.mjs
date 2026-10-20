import test from "node:test";
import assert from "node:assert/strict";
import { trainerCanFinish, trainerReachableIndex, trainerTally } from "../src/lib/trainerSession.ts";
import { restoreTrainerBookmark } from "../src/lib/internalNavigation.ts";
import { attemptDetails } from "../src/lib/attemptDetails.ts";

test("skipped questions are counted apart and never as answers or errors", () => {
  const tally = trainerTally(["ok", "skipped", "err", "skipped", undefined], 6);
  assert.deepEqual(tally, { correct: 1, wrong: 1, skipped: 2, answered: 2, remaining: 2 });
});

test("a skipped question is passed, so the student can move on and come back", () => {
  assert.equal(trainerReachableIndex(["skipped"], 10), 1);
  assert.equal(trainerReachableIndex(["ok", "skipped", undefined], 10), 2);
  assert.equal(trainerReachableIndex(["ok", null, "err"], 100), 1);
  assert.equal(trainerReachableIndex(["ok", "ok"], 2), 1);
});

test("the session can end only when every item was answered or consciously skipped", () => {
  assert.equal(trainerCanFinish(["ok", "skipped"], 2), true);
  assert.equal(trainerCanFinish(["ok", "skipped"], 3), false);
  assert.equal(trainerCanFinish(["skipped", "skipped"], 2), true);
});

const catalog = [1, 2, 3].map((n) => ({ id: `q${n}`, source: "official", table: "board_exam_questions" }));
const filters = Object.fromEntries(
  ["contest", "board", "career", "year", "appliedExam", "subject", "source", "reviewed", "state", "category", "area", "topic", "difficulty", "limit", "orderMode"].map((k) => [k, "all"]),
);
const bookmark = (results, extra = {}) => ({
  version: 1,
  route: "r",
  savedAt: 1,
  questions: catalog.map(({ id, source, table }) => ({ id, source, table })),
  index: 2,
  selected: null,
  struck: [],
  results,
  startedAt: 1,
  filters,
  ...extra,
});

test("a refresh restores skipped questions in the saved session", () => {
  const restored = restoreTrainerBookmark(bookmark(["ok", "skipped"]), "r", catalog, 10);
  assert.deepEqual(restored.bookmark.results, ["ok", "skipped"]);
  assert.equal(restoreTrainerBookmark(bookmark(["ok", "pulei"]), "r", catalog, 10), null);
});

test("a saved answer must still match its result, a skip cannot hide it", () => {
  const attempts = [{ index: 1, selected: "A", isCorrect: true }];
  assert.equal(restoreTrainerBookmark(bookmark(["ok", "skipped"], { sessionAttempts: attempts }), "r", catalog, 10), null);
});

test("attempt details: rule, score and ranking stay separate", () => {
  const row = { id: "a1", title: "Prova", total_questions: 10, correct_answers: 6, wrong_answers: 2, blank_answers: 2, accuracy: 60, duration_seconds: 600, finished_at: "2026-10-20T10:00:00Z" };
  const plain = attemptDetails(row, undefined, undefined);
  assert.equal(plain.rule.id, "simple");
  assert.equal(plain.score, 6);
  assert.equal(plain.ruleRecorded, false);
  assert.equal(plain.ranking, null);
  const withRecords = attemptDetails(
    row,
    { attempt_id: "a1", scoring_rule: "net_one_to_one", rule_verified: true, score: "4.00", max_score: "10.00", skipped_count: 1 },
    { attempt_id: "a1", answered: 8, counted: 5, repeated: 3, points: 12, attempt_valid: true },
  );
  assert.equal(withRecords.rule.id, "net_one_to_one");
  assert.equal(withRecords.score, 4);
  assert.equal(withRecords.skipped, 1);
  assert.deepEqual(withRecords.ranking, { answered: 8, counted: 5, repeated: 3, points: 12, attemptValid: true });
});

test("the time spent on each answer survives a page refresh and is validated", () => {
  const attempts = (seconds) => [{ index: 0, selected: "A", isCorrect: true, ...(seconds === undefined ? {} : { seconds }) }];
  const ok = restoreTrainerBookmark(bookmark(["ok"], { sessionAttempts: attempts(42) }), "r", catalog, 10);
  assert.equal(ok.bookmark.sessionAttempts[0].seconds, 42);
  assert.ok(restoreTrainerBookmark(bookmark(["ok"], { sessionAttempts: attempts() }), "r", catalog, 10), "older bookmarks without time still restore");
  assert.equal(restoreTrainerBookmark(bookmark(["ok"], { sessionAttempts: attempts(-1) }), "r", catalog, 10), null);
  assert.equal(restoreTrainerBookmark(bookmark(["ok"], { sessionAttempts: attempts(Number.NaN) }), "r", catalog, 10), null);
});
