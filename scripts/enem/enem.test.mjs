import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateEnemPackage, sameFields } from "./import-enem.mjs";
import { filterSimulatorQuestions } from "../../src/lib/simulatorFilters.ts";
import { filterTrainerQuestions } from "../../src/lib/trainerFilters.ts";
const pack = JSON.parse(
  await readFile(new URL("../../docs/enem-question-batch-01-2026-10-14.json", import.meta.url)),
);

test("ENEM rejects annulled items, lost alternatives and missing classification before import", () => {
  assert.equal(validateEnemPackage(pack).questions.length, 14);
  const change = (fn) => {
    const p = structuredClone(pack);
    fn(p);
    return p;
  };
  assert.throws(() => validateEnemPackage(change((p) => (p.questions[0].item_number = 178))));
  assert.throws(() =>
    validateEnemPackage(
      change(
        (p) =>
          (p.questions[0].question_text = p.questions[0].question_text.replace(/^E\).*$/m, "")),
      ),
    ),
  );
  assert.throws(() =>
    validateEnemPackage(change((p) => (p.questions[0].current_syllabus_topic_id = "missing"))),
  );
  assert.throws(() => validateEnemPackage(change((p) => p.questions.push(p.questions[0]))));
});
test("ENEM filter stays exclusive in trainer and simulator, including an empty combination", () => {
  const rows = ["ENEM", "Polícia Federal"].map((contest, i) => ({
    id: String(i),
    contest,
    subject: "Matemática",
    board: "INEP",
    career: "Ensino Médio",
    year: 2025,
    sourceKind: "official",
    source: "official",
    state: "",
    category: "",
    explanation: "",
    legalBasis: [],
    checkedAt: null,
    difficulty: "média",
  }));
  const simulator = Object.fromEntries(
    [
      "contest",
      "subject",
      "board",
      "career",
      "year",
      "source",
      "state",
      "category",
      "reviewed",
    ].map((k) => [k, k === "contest" ? "ENEM" : "all"]),
  );
  assert.deepEqual(
    filterSimulatorQuestions(rows, simulator).map((q) => q.contest),
    ["ENEM"],
  );
  assert.equal(filterSimulatorQuestions(rows, { ...simulator, subject: "Química" }).length, 0);
  const trainer = {
    ...simulator,
    area: "all",
    topic: "all",
    appliedExam: "all",
    difficulty: "all",
  };
  assert.deepEqual(
    filterTrainerQuestions(
      rows.map((q) => ({ ...q, year: "2025" })),
      trainer,
      new Map(),
    ).map((q) => q.contest),
    ["ENEM"],
  );
});
test("reimport comparison detects changed content and accepts equivalent timestamp formats", () => {
  assert.equal(sameFields({ question_text: "edited" }, { question_text: "original" }), false);
  assert.equal(
    sameFields(
      { verified_at: "2026-10-14T03:30:00+00:00" },
      { verified_at: "2026-10-14T03:30:00Z" },
    ),
    true,
  );
});
