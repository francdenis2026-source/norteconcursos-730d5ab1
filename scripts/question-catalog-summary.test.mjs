import test from "node:test";
import assert from "node:assert/strict";
import { catalogGroups } from "../src/lib/questionCatalogSummary.ts";
import {
  availableQuestionBank,
  publishedQuestionBank,
  questionBankSearch,
  questionBankExams,
} from "../src/lib/questionBank.ts";
const question = (id, overrides = {}) => ({
  id,
  table: "official_exam_questions",
  source: "official",
  contest: "Polícia Civil do Acre",
  year: "2025",
  career: "Agente",
  board: "CEBRASPE",
  subject: "Matemática",
  text: "Quanto é dois mais dois?",
  legalBasis: [],
  explanation: "Quatro.",
  ...overrides,
});
const rows = [
  question("1"),
  question("2", { subject: "Informática" }),
  question("3", { contest: "ENEM", career: "ENEM", board: "INEP" }),
  question("4", { table: "question_bank", source: "personal", board: "Meu caderno" }),
];
test("published platform total combines collections but excludes the private notebook", () => {
  const published = publishedQuestionBank(rows);
  assert.equal(published.length, 3);
  assert.equal(availableQuestionBank(published, "contests").length, 2);
  assert.equal(availableQuestionBank(published, "enem").length, 1);
});
test("unknown metadata does not inflate board or year indicators; missing subject is omitted", () => {
  const items = [...rows, question("5", { board: "Não informada", year: "Sem ano", subject: "" })];
  assert.equal(catalogGroups(items, "board").length, 2);
  assert.equal(catalogGroups(items, "year").length, 1);
  assert.equal(catalogGroups(items, "subject").length, 2);
  assert.equal(catalogGroups(items, "board")[0].questions.length, 2);
});
test("group details preserve the exact counted metadata and official exam identity", () => {
  const contests = availableQuestionBank(rows, "contests");
  const math = catalogGroups(contests, "subject").find((g) => g.name === "Matemática");
  assert.equal(math.questions.length, 2);
  assert.equal(
    questionBankSearch("contests", "all", "", { subject: math.name }).subject,
    "Matemática",
  );
  assert.equal(questionBankSearch("enem", "all", "", {}).contest, "ENEM");
  const exams = questionBankExams(contests);
  assert.equal(exams.length, 1);
  assert.equal(exams[0].count, 2);
  assert.deepEqual(exams[0].questions.map((q) => q.id).sort(), ["1", "2"]); // the private item must not inflate the paper
  assert.equal(
    questionBankSearch("contests", "all", "", { exam: exams[0].question }).appliedExam,
    exams[0].key,
  );
});
