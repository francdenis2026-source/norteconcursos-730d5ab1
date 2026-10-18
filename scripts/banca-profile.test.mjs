import test from "node:test";
import assert from "node:assert/strict";
import {
  answerStats,
  confidence,
  dedupeQuestions,
  recommendations,
  recurringThemes,
  sequenceStats,
  splitByKind,
  subjectProfile,
  summarizeBoards,
} from "../src/lib/bancaProfile.ts";

const q = (over = {}) => ({
  board: "CEBRASPE",
  contest: "Concurso A",
  career: "Agente",
  year: 2021,
  subject: "Direito Penal",
  topic: "Tema X: detalhe",
  answer: "C",
  item: 1,
  text: "texto",
  ...over,
});

test("gabarito equilibrado não gera padrão", () => {
  const rows = Array.from({ length: 200 }, (_, i) => q({ answer: i % 2 ? "C" : "E" }));
  const s = answerStats(rows);
  assert.equal(s.kind, "ce");
  assert.equal(s.verdict.level, "sem_padrao");
});

test("gabarito muito desbalanceado é sinalizado", () => {
  const rows = Array.from({ length: 300 }, (_, i) => q({ answer: i < 200 ? "E" : "C" }));
  assert.equal(answerStats(rows).verdict.level, "padrao");
});

test("poucos itens: sem dados", () => {
  assert.equal(answerStats([q(), q()]).verdict.level, "sem_dados");
});

test("múltipla escolha uniforme não gera padrão e viés forte gera", () => {
  const even = Array.from({ length: 250 }, (_, i) => q({ answer: "ABCDE"[i % 5] }));
  assert.equal(answerStats(even).kind, "mc");
  assert.equal(answerStats(even).verdict.level, "sem_padrao");
  const skew = Array.from({ length: 250 }, (_, i) => q({ answer: i < 120 ? "C" : "ABDE"[i % 4] }));
  assert.notEqual(answerStats(skew).verdict.level, "sem_padrao");
});

test("sequência alternada perfeita é detectada; sequência embaralhada não", () => {
  const alternate = [];
  for (const contest of ["A", "B", "C"])
    for (let i = 1; i <= 60; i++) alternate.push(q({ contest, item: i, answer: i % 2 ? "C" : "E" }));
  assert.notEqual(sequenceStats(alternate).verdict.level, "sem_padrao");
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const random = [];
  for (const contest of ["A", "B", "C", "D"])
    for (let i = 1; i <= 80; i++) random.push(q({ contest, item: i, answer: rnd() < 0.5 ? "C" : "E" }));
  assert.notEqual(sequenceStats(random).verdict.level, "padrao"); // aleatório não deve virar "padrão" (indício isolado pode ocorrer por acaso)
});

test("itens repetidos entre cargos da mesma prova contam uma vez", () => {
  const rows = [q({ text: "mesma", career: "Agente" }), q({ text: "mesma", career: "Escrivão" }), q({ text: "outra" })];
  assert.equal(dedupeQuestions(rows).length, 2);
});

test("perfil por disciplina: média por prova e tendência", () => {
  const rows = [];
  const exam = (contest, year, penal, adm) => {
    for (let i = 0; i < penal; i++) rows.push(q({ contest, year, subject: "Direito Penal", text: `p${contest}${i}` }));
    for (let i = 0; i < adm; i++) rows.push(q({ contest, year, subject: "Direito Administrativo", text: `a${contest}${i}` }));
  };
  exam("P1", 2018, 20, 20);
  exam("P2", 2021, 20, 20);
  exam("P3", 2025, 30, 10);
  const { exams, subjects } = subjectProfile(rows);
  assert.equal(exams, 3);
  const penal = subjects.find((s) => s.subject === "Direito Penal");
  assert.equal(penal.trend, "sobe");
  assert.equal(subjects.find((s) => s.subject === "Direito Administrativo").trend, "cai");
});

test("temas recorrentes exigem aparecer em provas diferentes", () => {
  const rows = [
    q({ contest: "A", topic: "Inquérito policial: arquivamento" }),
    q({ contest: "B", topic: "Inquérito policial: prazo" }),
    q({ contest: "C", topic: "Inquérito policial: relatório" }),
    q({ contest: "A", topic: "Tema único: x" }),
  ];
  const t = recurringThemes(rows, "Direito Penal");
  assert.equal(t.length, 1);
  assert.equal(t[0].exams, 3);
});

test("confiança escala com amostra", () => {
  assert.equal(confidence(800, 8), "alta");
  assert.equal(confidence(200, 3), "media");
  assert.equal(confidence(70, 2), "baixa");
  assert.equal(confidence(20, 1), "insuficiente");
});

test("resumo por banca ignora cargos com poucos itens e recomendações respeitam a amostra", () => {
  const rows = Array.from({ length: 80 }, (_, i) => q({ text: `t${i}` }));
  const s = summarizeBoards(rows);
  assert.equal(s[0].board, "CEBRASPE");
  assert.equal(s[0].careers[0].career, "Agente");
  const r = recommendations({
    board: "X",
    career: null,
    answerKinds: [],
    subjects: [],
    themes: [],
    conf: "insuficiente",
  });
  assert.match(r[0].title, /insuficiente/i);
});

test("provas Certo/Errado e de múltipla escolha da mesma banca são separadas por prova, não por letra", () => {
  const ce = Array.from({ length: 10 }, (_, i) => q({ contest: "CE", answer: i % 2 ? "C" : "E", item: i + 1 }));
  const mc = Array.from({ length: 10 }, (_, i) => q({ contest: "MC", answer: "ABCDE"[i % 5], item: i + 1 }));
  const { ce: a, mc: b } = splitByKind([...ce, ...mc]);
  assert.equal(a.length, 10);
  assert.equal(b.length, 10);
  assert.ok(b.every((r) => r.contest === "MC"));
});
