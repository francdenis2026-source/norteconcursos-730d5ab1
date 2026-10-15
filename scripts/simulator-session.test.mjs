import test from "node:test";
import assert from "node:assert/strict";
import {
  simulatorPapers,
  simulatorAnswers,
  randomSimulator,
  simulatorFingerprint,
  restoreSimulatorDraft,
  saveSimulatorResult,
} from "../src/lib/simulatorSession.ts";
const q = {
  id: "official:q1",
  originalId: "q1",
  sourceKind: "official",
  contest: "Polícia Civil do Acre",
  career: "Investigador",
  year: 2025,
  board: "CEBRASPE",
  subject: "Direito Penal",
  text: "Qual a alternativa correta?\n(A) Primeira.\n(B) Segunda.\n(C) Terceira.",
  answer: "A",
  itemNumber: 2,
};
const catalog = [
  q,
  { ...q, id: "official:q2", originalId: "q2", itemNumber: 1 },
  { ...q, id: "other-job", career: "Delegado" },
  { ...q, id: "other-year", year: 2024 },
  { ...q, id: "curated", sourceKind: "curated" },
  { ...q, id: "repertoire", contest: "Repertório — Apostilas Opção (OP-100AG-21)" },
];
test("paper catalog excludes authored and repertoire and separates role/year without truncating the selected paper", () => {
  const groups = simulatorPapers(catalog);
  assert.equal(groups.length, 3);
  assert.deepEqual(
    groups
      .find((p) => p.question.career === "Investigador" && p.question.year === 2025)
      .questions.map((q) => q.id),
    ["official:q2", "official:q1"],
  );
});
test("CEBRASPE multiple-choice retains alternatives, and genuine true/false stays C/E", () => {
  assert.deepEqual(simulatorAnswers(q), ["A", "B", "C"]);
  assert.deepEqual(simulatorAnswers({ ...q, text: "Julgue o item.", answer: "C" }), ["C", "E"]);
});
test("custom draw is without replacement and never fills shortages with unrelated items", () => {
  const selected = randomSimulator(catalog.slice(0, 2), 20, () => 0);
  assert.equal(selected.length, 2);
  assert.equal(new Set(selected.map((q) => q.id)).size, 2);
  assert.deepEqual(catalog[0], q);
});
const now = 1_800_000_000_000;
const draft = () => ({
  version: 1,
  owner: "alice",
  scope: "contests",
  attemptId: "bbbbbbbb-1111-4111-8111-aaaaaaaaaaaa",
  title: "Prova PC-AC",
  contestFilter: q.contest,
  subjectFilter: null,
  phase: "active",
  startedAt: now - 3_600_000,
  durationMinutes: 30,
  endedAt: null,
  questions: [{ id: q.id, fingerprint: simulatorFingerprint(q) }],
  answers: { [q.id]: "B" },
  flagged: [q.id],
  currentIndex: 0,
});
test("draft preserves answers/flags even past deadline without granting extra time", () => {
  const restored = restoreSimulatorDraft(draft(), "alice", "contests", [q], now);
  assert.ok(restored);
  assert.equal(restored.draft.startedAt, now - 3_600_000);
  assert.equal(restored.draft.answers[q.id], "B");
  assert.deepEqual(restored.draft.flagged, [q.id]);
});
test("draft cannot cross accounts, ENEM scope, changed or withdrawn content", () => {
  const d = draft();
  assert.equal(restoreSimulatorDraft(d, "bob", "contests", [q], now), null);
  assert.equal(restoreSimulatorDraft(d, "alice", "enem", [q], now), null);
  assert.equal(restoreSimulatorDraft(d, "alice", "contests", [], now), null);
  assert.equal(restoreSimulatorDraft(d, "alice", "contests", [{ ...q, answer: "C" }], now), null);
  assert.equal(
    restoreSimulatorDraft({ ...d, answers: { [q.id]: "E" } }, "alice", "contests", [q], now),
    null,
  );
});
test("invalid timer, repeated IDs and invalid result timestamps cannot resume", () => {
  const d = draft();
  for (const patch of [
    { durationMinutes: -1 },
    { durationMinutes: Infinity },
    { startedAt: now + 1 },
    { questions: [d.questions[0], d.questions[0]] },
    { phase: "result", endedAt: null },
  ])
    assert.equal(restoreSimulatorDraft({ ...d, ...patch }, "alice", "contests", [q], now), null);
});
const attempt = {
  id: "id",
  user_id: "alice",
  total_questions: 1,
  correct_answers: 1,
  finished_at: "2026-10-15T12:00:00.000Z",
};
const rows = [
  {
    attempt_id: "id",
    user_id: "alice",
    question_id: "q1",
    question_order: 1,
    selected_answer: "A",
    official_answer: "A",
  },
];
test("retry after detail write failure uses same attempt and confirms both summary and answers", async () => {
  let stored = null,
    saved = [],
    attemptInserts = 0,
    fail = true;
  const port = {
    writeAttempt: async (a) => {
      if (!stored) {
        stored = { ...a };
        attemptInserts++;
      }
    },
    readAttempt: async () => stored,
    writeResponses: async (r) => {
      if (fail) throw Error("offline");
      saved = r;
    },
    readResponses: async () => saved,
  };
  await assert.rejects(saveSimulatorResult(attempt, rows, port), /offline/);
  fail = false;
  await saveSimulatorResult(attempt, rows, port);
  assert.equal(attemptInserts, 1);
  assert.deepEqual(saved, rows);
});
test("existing inconsistent result cannot be silently overwritten or followed by detail writes", async () => {
  let wrote = false;
  await assert.rejects(
    saveSimulatorResult(attempt, rows, {
      writeAttempt: async () => {},
      readAttempt: async () => ({ ...attempt, correct_answers: 0 }),
      writeResponses: async () => {
        wrote = true;
      },
      readResponses: async () => [],
    }),
    /diverge/,
  );
  assert.equal(wrote, false);
});
test("incomplete detail readback does not report a saved result", async () => {
  await assert.rejects(
    saveSimulatorResult(attempt, rows, {
      writeAttempt: async () => {},
      readAttempt: async () => attempt,
      writeResponses: async () => {},
      readResponses: async () => [],
    }),
    /respostas/,
  );
});
