import test from "node:test";
import assert from "node:assert/strict";
import {
  dedupeSharedExamItems,
  expandAnsweredBySiblings,
  questionContentKey,
  sharedItemSiblings,
} from "../src/lib/questionDuplicates.ts";

const base = {
  source: "official",
  table: "board_exam_questions",
  contest: "Polícia Civil do Estado do Paraná",
  year: "2026",
  board: "FGV",
  answer: "B",
  text: "Texto-base:\nUma foto digital guarda metadados.\n\nSobre a captura e data e a hora em que a foto foi registrada, é correto afirmar:\n(A) nada\n(B) EXIF",
};
const agente = { ...base, id: "30000000-0000-4000-8000-00000000000a", career: "Agente" };
const papiloscopista = { ...base, id: "30000000-0000-4000-8000-00000000000b", career: "Papiloscopista" };
const key = (q) => `${q.source}:${q.id}`;

test("the same item registered for two roles of the same exam is one question", () => {
  const list = [agente, papiloscopista];
  assert.equal(dedupeSharedExamItems(list).length, 1);
  assert.equal(dedupeSharedExamItems(list)[0], agente);
  assert.equal(dedupeSharedExamItems(list, (q) => (q === papiloscopista ? 1 : 0))[0], papiloscopista);
});

test("whitespace and case do not hide a duplicate", () => {
  const spaced = { ...papiloscopista, text: base.text.replace("foto", "FOTO").replace(/ /g, "  ") };
  assert.equal(dedupeSharedExamItems([agente, spaced]).length, 1);
});

test("different items that share the same support text are never merged", () => {
  const support = "Texto-base [Texto 1]:\n" + "Um parágrafo longo compartilhado. ".repeat(5) + "\n\n[[/texto-base]]\n";
  const first = { ...base, id: "a", text: support + "Primeiro enunciado diferente?" };
  const second = { ...base, id: "b", text: support + "Segundo enunciado diferente?" };
  assert.equal(dedupeSharedExamItems([first, second]).length, 2);
});

test("different exams, boards, years or answer keys are different questions", () => {
  const variants = [
    { ...agente, year: "2025" },
    { ...agente, board: "CEBRASPE" },
    { ...agente, contest: "Polícia Civil de Outro Estado" },
    { ...agente, answer: "C" },
  ];
  for (const variant of variants) {
    assert.equal(dedupeSharedExamItems([agente, { ...variant, id: "x" }]).length, 2, JSON.stringify(variant).slice(0, 40));
  }
});

test("authored, personal and very short texts are never merged by content", () => {
  const curated = { ...agente, source: "curated", table: "curated_question_catalog" };
  assert.equal(questionContentKey(curated), null);
  assert.equal(dedupeSharedExamItems([curated, { ...curated, id: "other" }]).length, 2);
  const tiny = { ...agente, text: "Certo?" };
  assert.equal(dedupeSharedExamItems([tiny, { ...tiny, id: "z" }]).length, 2);
});

test("an answer given to one registration counts for its identical sibling", () => {
  const answered = new Map([[key(agente), { selected: "B", isCorrect: true }]]);
  const expanded = expandAnsweredBySiblings(answered, [agente, papiloscopista, { ...base, id: "outro", text: base.text + " extra" }], key);
  assert.equal(expanded.has(key(papiloscopista)), true);
  assert.equal(expanded.has(key({ ...base, id: "outro" })), false);
  assert.equal(answered.size, 1, "the original map is not mutated");
});

test("siblings are indexed by table:id", () => {
  const siblings = sharedItemSiblings([agente, papiloscopista]);
  assert.deepEqual(siblings.get(`board_exam_questions:${agente.id}`), [`board_exam_questions:${papiloscopista.id}`]);
});

test("several identical rows in the SAME role are not proof of a duplicate and stay untouched", () => {
  const same = [1, 2, 3].map((n) => ({ ...agente, id: `acre-${n}` }));
  assert.equal(dedupeSharedExamItems(same).length, 3);
  assert.equal(sharedItemSiblings(same).size, 0);
  const answered = new Map([[key(same[0]), true]]);
  assert.equal(expandAnsweredBySiblings(answered, same, key).size, 1);
});

test("rows without a role are never merged by content", () => {
  const anonymous = [{ ...agente, career: undefined }, { ...papiloscopista, career: undefined, id: "x" }];
  assert.equal(dedupeSharedExamItems(anonymous).length, 2);
});
