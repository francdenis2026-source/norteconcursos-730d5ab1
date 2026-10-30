import test from "node:test";
import assert from "node:assert/strict";
import { answerHistory, isMissingIdentitySchema } from "../src/lib/answerHistory.ts";

const catalog = [
  { id: "same", source: "official", table: "official_exam_questions" },
  { id: "same", source: "official", table: "board_exam_questions" },
  { id: "unique", source: "curated", table: "curated_question_catalog" },
];
test("history shares the same first answer across modalities, including an initial error", () => {
  const rows = [
    { question_id: "same", question_table: "board_exam_questions", selected_answer: "A", is_correct: true, modality: "simulator", answered_at: "2026-10-20T12:00:00Z" },
    { question_id: "same", question_table: "board_exam_questions", selected_answer: "B", is_correct: false, modality: "trainer", answered_at: "2026-10-20T11:00:00Z" },
    { question_id: "same", question_table: "official_exam_questions", selected_answer: "C", is_correct: true },
  ];
  const history = answerHistory(rows, catalog);
  assert.equal(history.size, 2);
  assert.deepEqual(history.get("board_exam_questions:same"), { selected: "B", isCorrect: false });
  assert.deepEqual(history.get("official_exam_questions:same"), { selected: "C", isCorrect: true });
});
test("blank rows are excluded, and ambiguous legacy identities are never assigned to a table", () => {
  const rows = [
    { question_id: "same", question_source: "official", selected_answer: "B", is_correct: false },
    { question_id: "unique", question_source: "curated", selected_answer: null, is_correct: null },
  ];
  assert.equal(answerHistory(rows, catalog).size, 0);
  rows.push({ question_id: "unique", question_source: "curated", selected_answer: "A", is_correct: true });
  assert.equal(answerHistory(rows, catalog).get("curated_question_catalog:unique").isCorrect, true);
});
test("compatibility fallbacks never hide authorization or connection failures", () => {
  for (const code of ["PGRST202", "42883"]) assert.equal(isMissingIdentitySchema({ code }), true);
  for (const code of ["42501", "PGRST301", "08006"]) assert.equal(isMissingIdentitySchema({ code }), false);
});

test("practice filters consume physical history without conflating UUID collisions", async () => {
  const { trainerPracticeQuestions } = await import("../src/lib/trainerFilters.ts");
  const questions = catalog.map(q => ({ ...q, text: "Question", subject: "Português" }));
  const answers = new Map([["board_exam_questions:same", { isCorrect: false }]]);
  assert.deepEqual(trainerPracticeQuestions(questions, "all", answers, new Map()).map(q => q.table), ["board_exam_questions"]);
  assert.equal(trainerPracticeQuestions(questions, "new", answers, new Map()).length, 2);
  assert.equal(trainerPracticeQuestions(questions, "wrong", answers, new Map()).length, 1);
});

test("a saved trainer answer disappears from unanswered filters but stays available for review", async () => {
  const { trainerPracticeQuestions } = await import("../src/lib/trainerFilters.ts");
  const questions = [
    { id: "q1", source: "official", table: "official_exam_questions", text: "Question", subject: "Direito" },
    { id: "q2", source: "official", table: "board_exam_questions", text: "Question", subject: "Direito" },
  ];
  const firstHistory = answerHistory([], questions);
  assert.equal(trainerPracticeQuestions(questions, "new", firstHistory, new Map()).length, 2);
  const savedHistory = answerHistory([
    { question_id: "q1", question_source: "official", question_table: "official_exam_questions", selected_answer: "C", is_correct: true },
  ], questions);
  assert.deepEqual(trainerPracticeQuestions(questions, "new", savedHistory, new Map()).map(q => q.id), ["q2"]);
  assert.deepEqual(trainerPracticeQuestions(questions, "all", savedHistory, new Map()).map(q => q.id), ["q1"]);
  assert.deepEqual(savedHistory.get("official_exam_questions:q1"), { selected: "C", isCorrect: true });
});
