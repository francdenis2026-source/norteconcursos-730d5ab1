import test from "node:test";
import assert from "node:assert/strict";
import { parsePlatformQuestionSummary } from "../src/lib/platformQuestionSummary.ts";
import { reviewedQuestionBank } from "../src/lib/questionBank.ts";
test("registered inventory and published availability remain distinct without inventing a total", () => {
  assert.deepEqual(parsePlatformQuestionSummary({ registered: 9084, available: 5668 }), {
    registered: 9084,
    available: 5668,
  });
  assert.deepEqual(parsePlatformQuestionSummary({ registered: 0, available: 0 }), {
    registered: 0,
    available: 0,
  });
});
test("failed, missing or inconsistent summaries never masquerade as zero available questions", () => {
  for (const payload of [
    null,
    [],
    {},
    { registered: 10 },
    { registered: "10", available: 4 },
    { registered: 10, available: -1 },
    { registered: 10, available: 11 },
    { registered: 10, available: 1.5 },
    { registered: Infinity, available: 0 },
    { registered: 2 ** 54, available: 0 },
  ]) {
    assert.throws(() => parsePlatformQuestionSummary(payload), /indisponível/);
  }
});
test("didactic review counts only the complete public training catalog, excluding private and nonreviewed items", () => {
  const q = {
    id: "1",
    source: "official",
    table: "official_exam_questions",
    contest: "PC Acre",
    year: "2025",
    board: "CEBRASPE",
    career: "Agente",
    subject: "Matemática",
    text: "O resultado da soma de dois e dois é quatro.",
    answer: "C",
    legalBasis: [],
    checkedAt: null,
    explanation: "Dois mais dois são quatro. Exemplo: dois pares de objetos.",
  };
  const rows = [
    q,
    { ...q, id: "2", source: "personal", table: "question_bank" },
    { ...q, id: "3", explanation: "Gabarito preliminar." },
  ];
  assert.deepEqual(
    reviewedQuestionBank(rows).map((q) => q.id),
    ["1"],
  );
});
