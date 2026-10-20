import test from "node:test";
import assert from "node:assert/strict";
import { questionCode, questionIdentity, simulatorReference } from "../src/lib/questionIdentity.ts";

test("physical sources with the same primary key never share a permanent code", () => {
  const id = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
  const tables = ["official_exam_questions", "board_exam_questions", "curated_question_catalog", "question_bank"];
  const refs = tables.map(table => ({ id, table, source: "official" }));
  assert.equal(new Set(refs.map(questionIdentity)).size, 4);
  assert.equal(new Set(refs.map(questionCode)).size, 4);
  for (const ref of refs) assert.ok(questionCode(ref).endsWith(id));
});

test("trainer, saved snapshot and simulator expose exactly the same code", () => {
  const question = { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", source: "official", table: "board_exam_questions" };
  const sim = { id: `${question.table}:${question.id}`, originalId: question.id, sourceKind: "official" };
  assert.equal(questionCode(question), questionCode(simulatorReference(sim)));
  assert.equal(questionCode(question), questionCode(JSON.parse(JSON.stringify(question))));
  assert.equal(questionCode({ ...question, index: 99, text: "Edited commentary" }), questionCode(question));
});

test("unknown legacy origin remains explicit instead of claiming an official table", () => {
  assert.match(questionCode({ id: "same", source: "official" }), /LEG-official/);
  assert.throws(() => simulatorReference({ id: "unknown:same", originalId: "same", sourceKind: "official" }));
});
