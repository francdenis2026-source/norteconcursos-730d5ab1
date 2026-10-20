import test from "node:test";
import assert from "node:assert/strict";
import {
  nextUnansweredIndex,
  restoreSimulatorDraft,
  simulatorFingerprint,
  simulatorItemStatus,
  simulatorProgress,
  simulatorReportQuestion,
} from "../src/lib/simulatorSession.ts";

const mk = (n) => ({
  id: `official_exam_questions:0000000${n}-0000-4000-8000-000000000000`,
  originalId: `0000000${n}-0000-4000-8000-000000000000`,
  sourceKind: "official",
  contest: "Prova",
  career: "Agente",
  year: 2026,
  board: "FGV",
  subject: "Direito",
  text: `Enunciado ${n}\n(A) um\n(B) dois`,
  answer: "A",
  itemNumber: n,
});
const questions = [1, 2, 3, 4, 5].map(mk);
const id = (n) => questions[n - 1].id;

test("skipping marks a blank question without answering or erring", () => {
  const answers = { [id(1)]: "A", [id(4)]: "B" };
  const skipped = new Set([id(2)]);
  assert.equal(simulatorItemStatus(id(1), answers, skipped), "answered");
  assert.equal(simulatorItemStatus(id(2), answers, skipped), "skipped");
  assert.equal(simulatorItemStatus(id(3), answers, skipped), "pending");
  const progress = simulatorProgress(questions, answers, skipped);
  assert.deepEqual(
    [progress.answered, progress.blank, progress.skipped, progress.unvisited],
    [2, 3, 1, 2],
  );
  assert.deepEqual(progress.unansweredIndexes, [1, 2, 4]);
});

test("an answer wins over a stale skip marker", () => {
  assert.equal(simulatorItemStatus(id(2), { [id(2)]: "B" }, new Set([id(2)])), "answered");
});

test("the next blank question wraps around so the candidate can return before finishing", () => {
  const answers = { [id(2)]: "A", [id(3)]: "A", [id(4)]: "A", [id(5)]: "A" };
  // só a atual está em branco: devolve ela mesma (o app então abre o resumo de entrega)
  assert.equal(nextUnansweredIndex(questions, answers, 0), 0);
  assert.equal(nextUnansweredIndex(questions, { ...answers, [id(1)]: "A" }, 2), -1);
  assert.equal(nextUnansweredIndex(questions, { [id(1)]: "A", [id(2)]: "A" }, 1), 2);
  assert.equal(nextUnansweredIndex(questions, { [id(1)]: "A", [id(3)]: "A", [id(4)]: "A", [id(5)]: "A" }, 3), 1);
});

const draft = (extra = {}) => ({
  version: 1,
  owner: "u1",
  scope: "contests",
  attemptId: "11111111-1111-4111-8111-111111111111",
  title: "Prova",
  contestFilter: null,
  subjectFilter: null,
  phase: "active",
  startedAt: 1000,
  durationMinutes: 60,
  endedAt: null,
  questions: questions.map((q) => ({ id: q.id, fingerprint: simulatorFingerprint(q) })),
  answers: { [id(1)]: "A" },
  flagged: [],
  currentIndex: 1,
  ...extra,
});

test("a refresh restores skipped questions and the recorded rule", () => {
  const restored = restoreSimulatorDraft(draft({ skipped: [id(2), id(3)], rule: "net_one_to_one" }), "u1", "contests", questions, 5000);
  assert.ok(restored);
  assert.deepEqual(restored.draft.skipped, [id(2), id(3)]);
  assert.equal(restored.draft.rule, "net_one_to_one");
});

test("drafts saved before skip support still restore", () => {
  assert.ok(restoreSimulatorDraft(draft(), "u1", "contests", questions, 5000));
});

test("a draft with skipped ids outside the paper or an unknown rule is rejected", () => {
  assert.equal(restoreSimulatorDraft(draft({ skipped: ["intruso"] }), "u1", "contests", questions, 5000), null);
  assert.equal(restoreSimulatorDraft(draft({ rule: "descontar_tudo" }), "u1", "contests", questions, 5000), null);
});

test("reports from the simulator carry the physical table and id", () => {
  const report = simulatorReportQuestion(questions[0]);
  assert.equal(report.table, "official_exam_questions");
  assert.equal(report.id, questions[0].originalId);
  assert.equal(simulatorReportQuestion({ ...questions[0], id: "sem-tabela" }), null);
});
