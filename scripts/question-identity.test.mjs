import test from "node:test";
import assert from "node:assert/strict";
import {
  questionCode,
  questionRef,
  parseQuestionCode,
  parseQuestionRef,
  simulatorQuestionCode,
  simulatorQuestionRef,
} from "../src/lib/questionIdentity.ts";
import { searchQuestionCatalog } from "../src/lib/questionBank.ts";

const ID = "1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d";
const question = (extra = {}) => ({
  id: ID,
  source: "official",
  table: "board_exam_questions",
  contest: "Polícia Civil do Estado do Paraná",
  board: "FGV",
  career: "Agente",
  year: "2026",
  subject: "Informática",
  ...extra,
});

test("the code is derived from table and id, never from position or session", () => {
  assert.equal(questionCode(question()), "BD-1A2B-3C4D-5E6F");
  assert.equal(questionCode(question({ itemNumber: 7 })), "BD-1A2B-3C4D-5E6F");
  assert.equal(questionCode(question({ text: "outra coisa", subject: "Outra" })), "BD-1A2B-3C4D-5E6F");
});

test("the same uuid in different tables never shares a code or a reference", () => {
  const tables = ["official_exam_questions", "board_exam_questions", "curated_question_catalog", "question_bank"];
  const codes = tables.map((table) => questionCode(question({ table })));
  assert.equal(new Set(codes).size, 4);
  assert.deepEqual(codes.map((code) => code.slice(0, 2)), ["OF", "BD", "CU", "PE"]);
  assert.equal(new Set(tables.map((table) => questionRef(question({ table })))).size, 4);
});

test("source official without a table falls back to the original table, curated and personal map directly", () => {
  assert.equal(questionRef(question({ table: undefined })), `official_exam_questions:${ID}`);
  assert.equal(questionRef(question({ table: undefined, source: "curated" })), `curated_question_catalog:${ID}`);
  assert.equal(questionRef(question({ table: undefined, source: "personal" })), `question_bank:${ID}`);
});

test("codes and references round-trip, tolerating case, spaces and missing dashes", () => {
  const code = questionCode(question());
  assert.deepEqual(parseQuestionCode(code), { table: "board_exam_questions", idPrefix: "1a2b3c4d5e6f" });
  assert.deepEqual(parseQuestionCode(" bd 1a2b 3c4d 5e6f "), parseQuestionCode(code));
  assert.equal(parseQuestionCode("XX-1A2B-3C4D-5E6F"), null);
  assert.equal(parseQuestionCode("BD-1A2B-3C4D"), null);
  assert.deepEqual(parseQuestionRef(questionRef(question())), { table: "board_exam_questions", id: ID });
  assert.equal(parseQuestionRef("nada:xyz"), null);
});

test("a simulator row keeps the identity of the physical table", () => {
  const row = { id: `board_exam_questions:${ID}`, originalId: ID };
  assert.equal(simulatorQuestionRef(row), `board_exam_questions:${ID}`);
  assert.equal(simulatorQuestionCode(row), questionCode(question()));
  assert.equal(simulatorQuestionCode({ id: "sem-prefixo", originalId: ID }), "");
});

test("the permanent code finds exactly one question in the catalog search", () => {
  const other = question({ id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee" });
  const sameIdOtherTable = question({ table: "official_exam_questions" });
  const catalog = [question(), other, sameIdOtherTable];
  const found = searchQuestionCatalog(catalog, "bd-1a2b-3c4d-5e6f");
  assert.equal(found.length, 1);
  assert.equal(found[0], catalog[0]);
  assert.equal(searchQuestionCatalog(catalog, "OF-1A2B-3C4D-5E6F")[0], sameIdOtherTable);
  assert.equal(searchQuestionCatalog(catalog, "FGV").length, 3);
});
