import type { Question, QuestionTable } from "./questionFormat";

const prefixes: Record<QuestionTable, string> = {
  official_exam_questions: "OF",
  board_exam_questions: "BA",
  curated_question_catalog: "AU",
  question_bank: "PE",
};
export type QuestionReference = Pick<Question, "id" | "source" | "table">;

/** A source group is not a physical identity: official contains two tables. */
export function questionIdentity(question: QuestionReference): string {
  return `${question.table ?? `legacy-${question.source}`}:${question.id}`;
}

/** Full primary key, never a truncated hash or a session position. */
export function questionCode(question: QuestionReference): string {
  return `NC-${question.table ? prefixes[question.table] : `LEG-${question.source}`}-${question.id}`;
}

export function simulatorReference(question: {
  id: string;
  originalId: string;
  sourceKind: "official" | "curated";
}): QuestionReference {
  const table = question.id.slice(0, question.id.indexOf(":"));
  if (!(table in prefixes)) throw new Error("Origem física da questão não identificada.");
  return { id: question.originalId, source: question.sourceKind, table: table as QuestionTable };
}
