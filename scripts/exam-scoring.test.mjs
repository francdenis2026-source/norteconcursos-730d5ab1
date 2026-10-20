import test from "node:test";
import assert from "node:assert/strict";
import {
  NET_RULE,
  SIMPLE_RULE,
  formatScore,
  resolveScoringRule,
  ruleFromRegistry,
  scoreAttempt,
} from "../src/lib/examScoring.ts";

const registry = [
  {
    contest_name: "Agente de Polícia Federal",
    contest_year: "2025",
    exam_board: "CEBRASPE",
    scoring_rule: "Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.",
  },
  {
    contest_name: "Polícia Penal do Acre",
    contest_year: "2023",
    exam_board: null,
    scoring_rule: "Pontuação ponderada: Gerais 1pt/questão (máx 30), Específicos 2pt/questão (máx 60), total 0-90.",
  },
  { contest_name: "Polícia Rodoviária Federal", contest_year: "2019", exam_board: null, scoring_rule: null },
];
const pf2025 = { contest: "Polícia Federal", career: "Agente de Polícia Federal", board: "CEBRASPE", year: 2025 };

test("a registered net rule is read from the registry text, nothing else is inferred", () => {
  assert.equal(ruleFromRegistry(registry[0].scoring_rule), NET_RULE);
  assert.equal(ruleFromRegistry(registry[1].scoring_rule), null);
  assert.equal(ruleFromRegistry(null), null);
});

test("the deduction applies only to the edition that has the rule on record", () => {
  assert.equal(resolveScoringRule(pf2025, registry).id, "net_one_to_one");
  assert.equal(resolveScoringRule({ ...pf2025, year: 2021 }, registry).id, "simple");
  assert.equal(resolveScoringRule({ ...pf2025, board: "FGV" }, registry).id, "simple");
  assert.equal(resolveScoringRule({ ...pf2025, career: "Delegado de Polícia Federal", contest: "Outra" }, registry).id, "simple");
  assert.equal(resolveScoringRule(null, registry), SIMPLE_RULE);
  assert.equal(resolveScoringRule(pf2025, []), SIMPLE_RULE);
});

test("a board is not assumed to have one universal rule: unregistered CEBRASPE papers stay simple", () => {
  const prf = { contest: "Polícia Rodoviária Federal", career: "Policial Rodoviário Federal", board: "CEBRASPE", year: 2019 };
  assert.equal(resolveScoringRule(prf, registry).id, "simple");
  assert.equal(resolveScoringRule({ contest: "Polícia Penal do Acre", career: "Agente", board: "X", year: 2023 }, registry).id, "simple");
});

test("conflicting registry rows for one edition fall back to the simple rule", () => {
  const conflicting = [
    registry[0],
    { ...registry[0], scoring_rule: "Pontuação ponderada", contest_name: "Agente de Polícia Federal" },
  ];
  assert.equal(resolveScoringRule(pf2025, conflicting).id, "simple");
});

test("net rule: one wrong answer cancels one right answer and blanks are worth zero", () => {
  // Exemplo registrado no HANDOFF: 82 acertos, 26 erros e 12 em branco = 56,00.
  const s = scoreAttempt({ total: 120, correct: 82, wrong: 26, blank: 12 }, NET_RULE);
  assert.equal(s.score, 56);
  assert.equal(formatScore(s.score), "56,00");
  assert.equal(s.answered, 108);
  assert.equal(s.accuracyOfTotal, 68);
  assert.equal(s.accuracyOfAnswered, 76);
  assert.equal(s.completion, 90);
});

test("blank answers are never an error under any rule", () => {
  const allBlank = { total: 10, correct: 0, wrong: 0, blank: 10 };
  assert.equal(scoreAttempt(allBlank, NET_RULE).score, 0);
  assert.equal(scoreAttempt(allBlank, SIMPLE_RULE).score, 0);
  const mixed = { total: 10, correct: 4, wrong: 0, blank: 6 };
  assert.equal(scoreAttempt(mixed, NET_RULE).score, 4);
});

test("without a registered rule nothing is deducted", () => {
  const s = scoreAttempt({ total: 20, correct: 10, wrong: 8, blank: 2 }, SIMPLE_RULE);
  assert.equal(s.score, 10);
  assert.equal(scoreAttempt({ total: 20, correct: 10, wrong: 8, blank: 2 }, NET_RULE).score, 2);
});

test("a heavily wrong attempt can be negative only under the net rule", () => {
  assert.equal(scoreAttempt({ total: 10, correct: 1, wrong: 9, blank: 0 }, NET_RULE).score, -8);
  assert.equal(scoreAttempt({ total: 10, correct: 1, wrong: 9, blank: 0 }, SIMPLE_RULE).score, 1);
});

test("an empty attempt has no division by zero", () => {
  const s = scoreAttempt({ total: 0, correct: 0, wrong: 0, blank: 0 });
  assert.deepEqual([s.accuracyOfTotal, s.accuracyOfAnswered, s.completion, s.score], [0, 0, 0, 0]);
});
