import test from "node:test";
import assert from "node:assert/strict";
import { examPotential, matchesExamFocus, countByExamFocus, prioritizeByPotential } from "../src/lib/examPotential.ts";

const items = [
  { id: "d1:0", subjects: ["Direito Penal"], text: "Crimes contra a administração pública peculato corrupção" },
  { id: "d1:1", subjects: ["Direito Penal"], text: "Aplicação da lei penal no tempo e no espaço" },
];
const incidence = new Map([
  ["d1:0", { id: "d1:0", tier: "alta", score: 0.9, examsAsked: 5, examsPool: 6, questions: 9, lastYear: 2025 }],
  ["d1:1", { id: "d1:1", tier: "baixa", score: 0.2, examsAsked: 1, examsPool: 6, questions: 1, lastYear: 2020 }],
]);
const q = (id, subject, topic, year) => ({ id, subject, testedTopic: topic, subtopic: null, year: String(year) });
const catalog = [
  q("a", "Direito Penal", "peculato e corrupção na administração pública", 2020),
  q("b", "Direito Penal", "aplicação da lei penal no espaço", 2025),
  q("c", "Direito Penal", "tema sem relação alguma", 2024),
  q("d", "Informática", "windows", 2025),
];
const potential = examPotential(catalog, items, incidence, new Map());

test("questão do assunto de alta chance entra em 'alta'", () => {
  assert.equal(potential.get("a").tier, "alta");
  assert.ok(matchesExamFocus("alta", potential.get("a")));
  assert.ok(!matchesExamFocus("alta", potential.get("b")));
});

test("recentes valem só dentro da área do edital", () => {
  assert.ok(matchesExamFocus("recentes", potential.get("b")));
  assert.ok(matchesExamFocus("recentes", potential.get("c")));
  assert.equal(potential.get("d"), undefined);
  assert.ok(!matchesExamFocus("recentes", potential.get("a")));
});

test("contagem e ordenação: mais prováveis primeiro, empate mantém a ordem", () => {
  const counts = countByExamFocus(catalog, potential);
  assert.equal(counts.alta, 1);
  assert.equal(counts.recentes, 2);
  const order = prioritizeByPotential(catalog, potential).map((x) => x.id);
  assert.equal(order[0], "a");
  assert.deepEqual(order.slice(-1), ["d"]);
});

test("sem foco, tudo passa", () => {
  assert.ok(matchesExamFocus("off", undefined));
});
