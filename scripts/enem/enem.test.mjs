import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateEnemPackage, sameFields } from "./import-enem.mjs";
import { filterSimulatorQuestions } from "../../src/lib/simulatorFilters.ts";
import { filterTrainerQuestions } from "../../src/lib/trainerFilters.ts";
import { isEligibleQuestion, parseQuestion } from "../../src/lib/questionFormat.ts";
import { needsMissingSupportText } from "../../src/lib/questionText.ts";
import { ENEM_STUDY_GROUPS, matchesEnemMaterial } from "../../src/lib/enemStudy.ts";

import {
  enemQuestionArea,
  enemSimulatorCatalog,
  enemSimulatorFilters,
  enemVideoSelection,
} from "../../src/lib/enemScope.ts";
import { ENEM_AREAS } from "../../src/data/enem.ts";
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

test("all published ENEM questions have complete options and support in the actual trainer parser", async () => {
  let count = 0;
  for (const batch of ["01", "02", "03"]) {
    const p = JSON.parse(
      await readFile(
        new URL(`../../docs/enem-question-batch-${batch}-2026-10-14.json`, import.meta.url),
      ),
    );
    validateEnemPackage(p);
    for (const q of p.questions) {
      assert.equal(isEligibleQuestion(q), true, String(q.item_number));
      const parsed = parseQuestion(q.question_text);
      assert.equal(parsed.options.map((o) => o.letter).join(""), "ABCDE");
      assert.ok(parsed.stem);
      assert.equal(
        needsMissingSupportText({ subject: q.subject, text: q.question_text, source: "official" }),
        false,
      );
      count++;
    }
  }
  assert.equal(count, 53);
});
test("ENEM materials keep subject areas separate and support accent-insensitive search", () => {
  const m = {
    contest_name: "ENEM",
    discipline: "Física",
    title: "Eletricidade",
    topic_label: "Circuitos",
  };
  assert.equal(matchesEnemMaterial(m, "natureza", "fisica"), true);
  assert.equal(matchesEnemMaterial(m, "humanas", ""), false);
  assert.equal(matchesEnemMaterial({ ...m, contest_name: "Polícia Federal" }, "all", ""), false);
  const all = ENEM_STUDY_GROUPS.flatMap((g) => g.subjects);
  assert.equal(new Set(all).size, all.length);
});

test("ENEM scope excludes other exams and non-ENEM subjects even with unrelated route filters", () => {
  const catalog = [
    {
      contest: "ENEM",
      subject: "Matemática",
      board: "Inep",
      career: "Estudante",
      year: 2025,
      sourceKind: "official",
      state: "",
      category: "",
      explanation: "",
      legalBasis: [],
      checkedAt: null,
    },
    {
      contest: "Polícia Federal",
      subject: "Matemática",
      board: "CEBRASPE",
      career: "Agente",
      year: 2025,
      sourceKind: "official",
      state: "AC",
      category: "Policial",
      explanation: "",
      legalBasis: [],
      checkedAt: null,
    },
    {
      contest: "ENEM",
      subject: "Direito Penal",
      board: "Inep",
      career: "Estudante",
      year: 2025,
      sourceKind: "official",
      state: "",
      category: "",
      explanation: "",
      legalBasis: [],
      checkedAt: null,
    },
  ];
  const filters = enemSimulatorFilters({
    contest: "Polícia Federal",
    subject: "all",
    board: "CEBRASPE",
    career: "Agente",
    year: "all",
    source: "all",
    state: "AC",
    category: "Policial",
    reviewed: "all",
  });
  assert.deepEqual(filterSimulatorQuestions(enemSimulatorCatalog(catalog), filters), [catalog[0]]);
  assert.equal(
    filterSimulatorQuestions(enemSimulatorCatalog(catalog), { ...filters, source: "curated" })
      .length,
    0,
  );
});

test("ENEM areas include the actual subject labels and empty areas stay empty", () => {
  const catalog = [
    "Biologia",
    "Química",
    "Física",
    "História",
    "Sociologia",
    "Filosofia",
    "Artes e Educação Física",
    "Português",
    "Inglês",
    "Matemática",
  ].map((subject) => ({ contest: "ENEM", subject }));
  assert.deepEqual(
    enemSimulatorCatalog(catalog, "natureza").map((q) => q.subject),
    ["Biologia", "Química", "Física"],
  );
  assert.deepEqual(
    enemSimulatorCatalog(catalog, "humanas").map((q) => q.subject),
    ["História", "Sociologia", "Filosofia"],
  );
  assert.equal(enemSimulatorCatalog(catalog, "linguagens").length, 3);
  assert.equal(enemQuestionArea("Informática"), null);
  assert.equal(enemSimulatorCatalog(catalog, "unknown").length, 0);
});

test("video selection never falls back to another subject or topic, and deduplicates entries", () => {
  const math = { id: "math", title: "Matemática" },
    bio = { id: "bio", title: "Biologia" };
  const topics = {
    "ENEM — Matemática": { "*": [math], Funções: [math] },
    "ENEM — Biologia": { Ecologia: [bio] },
    "Língua Portuguesa": { "*": [math] },
  };
  assert.deepEqual(enemVideoSelection(topics, "Matemática").videos, [math]);
  assert.deepEqual(enemVideoSelection(topics, "Biologia", "Ecologia").videos, [bio]);
  assert.deepEqual(enemVideoSelection(topics, "Biologia", "Funções").videos, []);
  assert.deepEqual(enemVideoSelection(topics, "Física").videos, []);
  assert.deepEqual(enemVideoSelection(topics, "Língua Portuguesa").videos, []);
  assert.deepEqual(enemVideoSelection(topics, "Artes, Educação Física e Tecnologias").videos, []);
});

test("Artes has its own video category rather than borrowing Portuguese classes", () => {
  const arts = ENEM_AREAS.flatMap((a) => a.subjects).find(
    (s) => s.name === "Artes, Educação Física e Tecnologias",
  );
  assert.equal(arts.videoKey, "ENEM — Artes, Educação Física e Tecnologias");
});
