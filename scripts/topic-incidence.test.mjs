import { test } from "node:test";
import assert from "node:assert/strict";
import { incidenceEditalFor } from "../src/lib/incidenceEditais.ts";
import { computeIncidence, incidenceBasis, isPoliceExam, topicStems, SEAL_LABEL } from "../src/lib/topicIncidence.ts";

const PT = "Língua Portuguesa";
const police = (year, extra = {}) => ({ contest: `Polícia Civil ${year}`, career: "Investigador", year, ...extra });
const g = (exam, subject, topic, n = 1) => ({ ...exam, subject, topic, n });

const items = [
  { id: "crase", subjects: [PT], text: "Crase." },
  { id: "concord", subjects: [PT], text: "Concordância verbal e nominal." },
  { id: "pont", subjects: [PT], text: "Pontuação." },
];

function fiveExams() {
  const out = [];
  for (const year of [2021, 2022, 2023, 2024, 2025]) {
    const exam = police(year);
    out.push(g(exam, PT, "Crase", 2), g(exam, PT, "Interpretação de texto", 3));
    if (year >= 2024) out.push(g(exam, PT, "Concordância verbal", 1));
  }
  return out;
}

test("classifica em alta, média e sem registro conforme a proporção de provas", () => {
  const r = computeIncidence(fiveExams(), items);
  assert.equal(r.get("crase").tier, "alta");
  assert.equal(r.get("crase").examsAsked, 5);
  assert.equal(r.get("concord").tier, "media");
  assert.equal(r.get("concord").examsAsked, 2);
  assert.equal(r.get("pont").tier, "nunca");
});

test("a questão de crase não é atribuída ao item de concordância", () => {
  const r = computeIncidence(fiveExams(), items);
  assert.equal(r.get("concord").questions, 2);
  assert.equal(r.get("crase").questions, 10);
});

test("provas recentes pesam mais que as antigas", () => {
  const list = [
    { id: "antigo", subjects: [PT], text: "Regência verbal." },
    { id: "recente", subjects: [PT], text: "Colocação pronominal." },
  ];
  const groups = [];
  for (const year of [2019, 2020, 2021, 2023, 2024, 2025]) {
    const exam = police(year);
    groups.push(g(exam, PT, "Interpretação de texto", 9));
    if (year <= 2021) groups.push(g(exam, PT, "Regência verbal"));
    if (year >= 2023) groups.push(g(exam, PT, "Colocação pronominal"));
  }
  const r = computeIncidence(groups, list);
  assert.equal(r.get("antigo").examsAsked, 3);
  assert.equal(r.get("recente").examsAsked, 3);
  assert.ok(r.get("recente").score > r.get("antigo").score);
});

test("provas da área policial pesam mais que as de áreas afins", () => {
  const list = [
    { id: "x", subjects: [PT], text: "Crase." },
    { id: "y", subjects: [PT], text: "Regência verbal." },
  ];
  const groups = [];
  for (const [i, kind] of ["police", "police", "other", "other"].entries()) {
    const exam = kind === "police"
      ? { contest: `Polícia Civil ${i}`, career: "Agente", year: 2025 }
      : { contest: `Prefeitura ${i}`, career: "Professor", year: 2025 };
    groups.push(g(exam, PT, "Interpretação de texto", 9));
    if (kind === "police") groups.push(g(exam, PT, "Crase"));
    else if (i === 2) groups.push(g(exam, PT, "Regência verbal"));
  }
  const r = computeIncidence(groups, list);
  assert.ok(r.get("x").score > r.get("y").score);
  assert.equal(isPoliceExam("Polícia Civil do Acre", "Escrivão"), true);
  assert.equal(isPoliceExam("Prefeitura de Rio Branco", "Professor"), false);
});

test("com uma só prova na matéria não há base: poucos dados", () => {
  const exam = police(2025);
  const r = computeIncidence([g(exam, PT, "Crase", 10)], items);
  for (const item of items) assert.equal(r.get(item.id).tier, "amostra");
});

test("sem assuntos informados nas questões, evita o falso 'nunca caiu'", () => {
  const groups = [];
  for (const year of [2022, 2023, 2024, 2025]) groups.push(g(police(year), "Direito Penal", null, 20));
  const r = computeIncidence(groups, [{ id: "dp", subjects: ["Direito Penal"], text: "Teoria do crime." }]);
  assert.equal(r.get("dp").tier, "amostra");
});

test("item coberto por duas matérias reúne as provas das duas", () => {
  const list = [{ id: "nocoes", subjects: ["Direito Penal", "Direito Processual Penal"], text: "Inquérito policial. Prisão em flagrante." }];
  const groups = [];
  for (const year of [2023, 2024, 2025]) {
    const exam = police(year);
    groups.push(g(exam, "Direito Penal", "Teoria do crime", 5), g(exam, "Direito Processual Penal", "Inquérito policial", 3));
  }
  const r = computeIncidence(groups, list);
  assert.equal(r.get("nocoes").examsPool, 3);
  assert.equal(r.get("nocoes").examsAsked, 3);
  assert.equal(r.get("nocoes").tier, "alta");
});

test("os radicais ignoram acento, plural e palavras genéricas", () => {
  assert.deepEqual(topicStems("Noções de Concordâncias verbais"), ["concor", "verbai"]);
  assert.ok(topicStems("Tabelas-verdade").includes("tabela"));
});

test("o texto de apoio informa a base e nunca promete", () => {
  const r = computeIncidence(fiveExams(), items);
  const text = incidenceBasis(r.get("crase"));
  assert.match(text, /5 de 5 provas da IDECAN/);
  assert.match(text, /não uma garantia/);
  assert.equal(SEAL_LABEL.alta, "Alta chance");
});

test("a indicação só vale para o edital que o aluno ativou", () => {
  const pcac = incidenceEditalFor({ agency: "Polícia Civil do Acre", name: "Concurso PC-AC 2026" });
  assert.equal(pcac?.id, "pcac");
  assert.equal(pcac?.board, "IDECAN");
  assert.equal(incidenceEditalFor({ agency: "Polícia Civil de Goiás", name: "PC-GO" }), null);
  assert.equal(incidenceEditalFor({ agency: "Prefeitura de Rio Branco", name: "Acre 2026" }), null);
  assert.equal(incidenceEditalFor(undefined), null);
  assert.equal(incidenceEditalFor(null), null);
});
