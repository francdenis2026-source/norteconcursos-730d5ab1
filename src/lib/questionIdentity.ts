// Identidade permanente de uma questão.
//
// "source" (official | curated | personal) agrupa tabelas diferentes: itens de
// official_exam_questions e de board_exam_questions são ambos "official". A
// identidade real é o par (tabela física, id). Posição no treino, número do
// item na prova e ordem do simulado NÃO fazem parte da identidade.
//
// O código público é a chave primária completa com o prefixo da tabela, sem
// gravar nada nas questões: NC-OF-<uuid> (official_exam_questions), NC-BA-
// (board_exam_questions), NC-AU- (curated_question_catalog), NC-PE- (question_bank).
// O mesmo cálculo existe no banco em public.question_public_code().
import type { Question, QuestionTable } from "./questionFormat";

const prefixes: Record<QuestionTable, string> = {
  official_exam_questions: "OF",
  board_exam_questions: "BA",
  curated_question_catalog: "AU",
  question_bank: "PE",
};
const tableByPrefix = Object.fromEntries(
  Object.entries(prefixes).map(([table, prefix]) => [prefix, table]),
) as Record<string, QuestionTable>;
export const QUESTION_TABLES = Object.keys(prefixes) as QuestionTable[];
export type QuestionReference = Pick<Question, "id" | "source" | "table" | "didacticProvenance">;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isQuestionTable(value: unknown): value is QuestionTable {
  return typeof value === "string" && value in prefixes;
}

/** A source group is not a physical identity: official contains two tables. */
export function questionIdentity(question: QuestionReference): string {
  return `${question.table ?? `legacy-${question.source}`}:${question.id}`;
}
/** Chave estável "<tabela>:<id>" entre tabelas (mesmo valor de questionIdentity). */
export const questionRef = questionIdentity;

/** Full primary key, never a truncated hash or a session position. */
export function questionCode(question: QuestionReference): string {
  return `NC-${question.table ? prefixes[question.table] : `LEG-${question.source}`}-${question.id}`;
}

/** Tabela física; quando o objeto não a informa, usa a tabela mais provável só para gravar na conta. */
export function questionTableOf(question: { source: string; table?: unknown }): QuestionTable {
  if (isQuestionTable(question.table)) return question.table;
  if (question.source === "curated") return "curated_question_catalog";
  if (question.source === "personal") return "question_bank";
  return "official_exam_questions";
}

export function parseQuestionRef(ref: string): { table: QuestionTable; id: string } | null {
  const at = ref.indexOf(":");
  if (at < 0) return null;
  const table = ref.slice(0, at);
  const id = ref.slice(at + 1).toLowerCase();
  return isQuestionTable(table) && UUID.test(id) ? { table, id } : null;
}

/** Lê um código informado pelo usuário (aceita minúsculas, espaços e traços ausentes). */
export function parseQuestionCode(value: string): { table: QuestionTable; id: string } | null {
  const match =
    /^NC[\s-]*(OF|BA|AU|PE)[\s-]*([0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12})$/i.exec(
      value.trim(),
    );
  if (!match) return null;
  const hex = match[2]!.replace(/-/g, "").toLowerCase();
  const id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  return { table: tableByPrefix[match[1]!.toUpperCase()]!, id };
}

export function simulatorReference(question: {
  id: string;
  originalId: string;
  sourceKind: "official" | "curated";
  didacticProvenance?: Question["didacticProvenance"];
}): QuestionReference {
  const table = question.id.slice(0, question.id.indexOf(":"));
  if (!(table in prefixes)) throw new Error("Origem física da questão não identificada.");
  return {
    id: question.originalId,
    source: question.sourceKind,
    table: table as QuestionTable,
    ...(question.didacticProvenance ? { didacticProvenance: question.didacticProvenance } : {}),
  };
}
