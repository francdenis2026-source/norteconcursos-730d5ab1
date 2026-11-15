import test from "node:test";
import assert from "node:assert/strict";
import {
  NET_RULE,
  PCAC_WEIGHTED_RULE,
  SIMPLE_RULE,
  pcacWeightForSubject,
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
const pcac2026Registry = [
  {
    contest_name: "Polícia Civil do Acre — Oficial Investigador de Polícia",
    contest_year: "2026",
    exam_board: "IDECAN",
    scoring_rule:
      "PC-AC 001/2026: 100 questões; conhecimentos básicos 24×peso 1; conhecimentos jurídicos 16×peso 1; conhecimentos específicos 60×peso 2; máximo 160 pontos. Questão anulada: pontuação atribuída a todos os candidatos (item 18.5).",
  },
];
const pcac2026 = {
  contest: "Polícia Civil do Acre",
  career: "Oficial Investigador de Polícia",
  board: "AUTORAL",
  year: 2026,
};

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


test("PC-AC 2026 official weighted rule is recognized only for the exact edition and authorial IDECAN-style practice", () => {
  assert.equal(ruleFromRegistry(pcac2026Registry[0].scoring_rule), PCAC_WEIGHTED_RULE);
  assert.equal(resolveScoringRule(pcac2026, pcac2026Registry).id, "pcac_2026_weighted");
  assert.equal(
    resolveScoringRule(
      { ...pcac2026, contest: "Norte Concursos — treino autoral PC-AC 2026" },
      pcac2026Registry,
    ).id,
    "pcac_2026_weighted",
  );
  assert.equal(resolveScoringRule({ ...pcac2026, year: 2025 }, pcac2026Registry).id, "simple");
  assert.equal(resolveScoringRule({ ...pcac2026, career: "Delegado" }, pcac2026Registry).id, "simple");
});

test("PC-AC subject weights follow the edital: basics/legal 1 point and specific 2 points", () => {
  assert.equal(pcacWeightForSubject("Língua Portuguesa"), 1);
  assert.equal(pcacWeightForSubject("Noções de Direito Penal e Processual Penal"), 1);
  assert.equal(pcacWeightForSubject("Legislação Institucional"), 1);
  assert.equal(pcacWeightForSubject("Contabilidade Geral e Análise Financeira"), 2);
  assert.equal(pcacWeightForSubject("Noções de Administração"), 2);
  const fullExam = [
    ...Array.from({ length: 6 }, () => ({ subject: "Língua Portuguesa", correct: true })),
    ...Array.from({ length: 6 }, () => ({ subject: "Raciocínio Lógico", correct: true })),
    ...Array.from({ length: 8 }, () => ({ subject: "Noções de Informática", correct: true })),
    ...Array.from({ length: 4 }, () => ({ subject: "Realidade do Estado do Acre", correct: true })),
    ...Array.from({ length: 3 }, () => ({ subject: "Noções de Direito Constitucional", correct: true })),
    ...Array.from({ length: 3 }, () => ({ subject: "Noções de Direito Administrativo", correct: true })),
    ...Array.from({ length: 6 }, () => ({ subject: "Noções de Direito Penal e Processual Penal", correct: true })),
    ...Array.from({ length: 4 }, () => ({ subject: "Legislação Institucional", correct: true })),
    ...Array.from({ length: 60 }, () => ({ subject: "Contabilidade Geral e Análise Financeira", correct: true })),
  ];
  const score = scoreAttempt(
    { total: 100, correct: 100, wrong: 0, blank: 0, items: fullExam },
    PCAC_WEIGHTED_RULE,
  );
  assert.equal(score.score, 160);
  assert.equal(score.maxScore, 160);
});

test("weighted score uses each answered question's area and falls back if item details are missing", () => {
  const items = [
    { subject: "Língua Portuguesa", correct: true },
    { subject: "Noções de Direito Penal e Processual Penal", correct: false },
    { subject: "Contabilidade Geral e Análise Financeira", correct: true },
    { subject: "Noções de Administração", correct: true },
  ];
  const score = scoreAttempt(
    { total: 4, correct: 3, wrong: 1, blank: 0, items },
    PCAC_WEIGHTED_RULE,
  );
  assert.equal(score.score, 5);
  assert.equal(score.maxScore, 6);
  assert.equal(score.accuracyOfTotal, 75);
  assert.equal(
    scoreAttempt({ total: 4, correct: 3, wrong: 1, blank: 0 }, PCAC_WEIGHTED_RULE).rule.id,
    "simple",
  );
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
