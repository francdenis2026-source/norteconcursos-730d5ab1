import test from "node:test";
import assert from "node:assert/strict";
import { filterTrainerQuestions, trainerBoard, trainerCollectionQuestions, isEnemContest } from "../src/lib/trainerFilters.ts";
import { isMissingQuestionTable } from "../src/lib/catalog.ts";

const all = Object.fromEntries(
  [
    "area",
    "topic",
    "contest",
    "board",
    "career",
    "year",
    "appliedExam",
    "subject",
    "source",
    "reviewed",
    "difficulty",
    "state",
    "category",
  ].map((key) => [key, "all"]),
);
const q = (id, board, source = "official") => ({
  id,
  board,
  source,
  contest: "Concurso",
  career: "Agente",
  year: "2025",
  subject: "Língua Portuguesa",
  difficulty: "média",
  state: "AC",
  category: "Segurança",
  text: "Uma pergunta",
  explanation: "Explicação pedagógica detalhada.",
});
const rows = [
  q("cespe", "CESPE/CEBRASPE"),
  q("fgv", "FGV"),
  q("ibfc", "IBFC"),
  q("fgv-curated", "Fgv", "curated"),
  q("ibade", "IBADE", "curated"),
];
const run = (filters) => filterTrainerQuestions(rows, { ...all, ...filters }, new Map());

test("FGV includes its eligible sources and never Cebraspe", () => {
  assert.deepEqual(
    run({ board: "fgv" }).map((q) => q.id),
    ["fgv", "fgv-curated"],
  );
});
test("IBFC and IBADE remain separate boards", () => {
  assert.deepEqual(
    run({ board: "IBFC" }).map((q) => q.id),
    ["ibfc"],
  );
  assert.deepEqual(
    run({ board: "IBADE" }).map((q) => q.id),
    ["ibade"],
  );
});
test("Cebraspe aliases from old booklets match the same board", () => {
  assert.equal(trainerBoard(" cespe / PF / 2009 "), "CEBRASPE");
  assert.deepEqual(
    run({ board: "Cebraspe" }).map((q) => q.id),
    ["cespe"],
  );
});
test("incompatible board and discipline produce zero, without cross-board fallback", () => {
  assert.deepEqual(run({ board: "FGV", subject: "Informática" }), []);
  assert.deepEqual(run({ board: "VUNESP" }), []);
});
test("switching selections does not reuse the previous board's results", () => {
  assert.equal(run({ board: "CEBRASPE" })[0].id, "cespe");
  assert.equal(run({ board: "IBFC" })[0].id, "ibfc");
  assert.equal(run({ board: "all" }).length, rows.length);
  assert.deepEqual(
    run({ board: "FGV", source: "curated" }).map((q) => q.id),
    ["fgv-curated"],
  );
});
test("only absent optional tables may be omitted; permissions and network errors surface", () => {
  assert.equal(isMissingQuestionTable({ code: "42P01" }), true);
  assert.equal(isMissingQuestionTable({ code: "PGRST205" }), true);
  for (const e of [{ code: "42501" }, { code: "PGRST301" }, new Error("Network failure"), null])
    assert.equal(isMissingQuestionTable(e), false);
});

test("ENEM and public contest collections cannot mix shared disciplines", () => {
  const catalog = [
    {...q("enem", "INEP"), contest: "ENEM"},
    {...q("enem-full", "INEP"), contest: "Exame Nacional do Ensino Médio"},
    {...q("pf", "CEBRASPE"), contest: "Polícia Federal"},
  ];
  assert.deepEqual(trainerCollectionQuestions(catalog, "enem").map(q => q.id), ["enem", "enem-full"]);
  assert.deepEqual(trainerCollectionQuestions(catalog, "contests").map(q => q.id), ["pf"]);
  assert.equal(isEnemContest("ENEM 2024"), true);
  assert.equal(isEnemContest("Polícia Civil"), false);
});
