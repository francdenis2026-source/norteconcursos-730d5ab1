// Identidade permanente de uma questão.
//
// "source" (official | curated | personal) agrupa tabelas diferentes: itens de
// official_exam_questions e de board_exam_questions são ambos "official". A
// identidade real é, portanto, o par (tabela física, id). Posição no treino,
// número do item na prova e ordem do simulado NÃO fazem parte da identidade.
//
// O código público é derivado dessa identidade, sem gravar nada nas questões:
//   OF-1A2B-3C4D-5E6F  (official_exam_questions)
//   BD-…               (board_exam_questions)
//   CU-…               (curated_question_catalog)
//   PE-…               (question_bank, caderno pessoal)
// Os 12 caracteres são o início do UUID (aleatório) da linha, em maiúsculas.
// O mesmo cálculo existe no banco em public.question_public_code().
import type { Question, QuestionTable, Source } from "./questionFormat";

export const QUESTION_TABLES: readonly QuestionTable[] = [
  "official_exam_questions",
  "board_exam_questions",
  "curated_question_catalog",
  "question_bank",
];

const PREFIX: Record<QuestionTable, string> = {
  official_exam_questions: "OF",
  board_exam_questions: "BD",
  curated_question_catalog: "CU",
  question_bank: "PE",
};
const TABLE_BY_PREFIX = Object.fromEntries(
  Object.entries(PREFIX).map(([table, prefix]) => [prefix, table]),
) as Record<string, QuestionTable>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type QuestionIdentity = { table: QuestionTable; id: string };

export function isQuestionTable(value: unknown): value is QuestionTable {
  return typeof value === "string" && (QUESTION_TABLES as readonly string[]).includes(value);
}

/**
 * Tabela física da questão. Quando o objeto não traz `table`, usa a origem
 * lógica; "official" cai em official_exam_questions (a tabela mais antiga) e,
 * por isso, só é confiável quando `table` vem preenchido pelo carregador.
 */
export function questionTableOf(question: { source: Source | string; table?: unknown }) {
  if (isQuestionTable(question.table)) return question.table;
  if (question.source === "curated") return "curated_question_catalog";
  if (question.source === "personal") return "question_bank";
  return "official_exam_questions";
}

/** Chave estável entre tabelas: "<tabela>:<uuid>". Nunca depende de filtro, ordem ou sessão. */
export function questionRef(question: { id: string; source: string; table?: unknown }) {
  return `${questionTableOf(question)}:${String(question.id).toLowerCase()}`;
}

export function parseQuestionRef(ref: string): QuestionIdentity | null {
  const at = ref.indexOf(":");
  if (at < 0) return null;
  const table = ref.slice(0, at);
  const id = ref.slice(at + 1).toLowerCase();
  return isQuestionTable(table) && UUID.test(id) ? { table, id } : null;
}

/** Código curto, estável e legível: prefixo da tabela + 12 caracteres do UUID. */
export function questionCode(question: { id: string; source: string; table?: unknown }) {
  const table = questionTableOf(question);
  const hex = String(question.id).replace(/-/g, "").toUpperCase();
  if (!/^[0-9A-F]{12,}$/.test(hex)) return "";
  const body = hex.slice(0, 12).match(/.{4}/g)!.join("-");
  return `${PREFIX[table]}-${body}`;
}

/** Lê um código informado pelo usuário (aceita minúsculas, espaços e traços ausentes). */
export function parseQuestionCode(
  value: string,
): { table: QuestionTable; idPrefix: string } | null {
  const compact = value.toUpperCase().replace(/[^0-9A-Z]/g, "");
  const match = /^(OF|BD|CU|PE)([0-9A-F]{12})$/.exec(compact);
  if (!match) return null;
  return { table: TABLE_BY_PREFIX[match[1]!]!, idPrefix: match[2]!.toLowerCase() };
}

/** Identidade de uma linha de simulador: id físico guardado em originalId + prefixo "tabela:" no id local. */
export function simulatorQuestionRef(question: { id: string; originalId: string }) {
  const at = question.id.indexOf(":");
  const table = at > 0 ? question.id.slice(0, at) : "";
  return isQuestionTable(table) ? `${table}:${question.originalId.toLowerCase()}` : null;
}

export function simulatorQuestionCode(question: { id: string; originalId: string }) {
  const ref = simulatorQuestionRef(question);
  const parsed = ref ? parseQuestionRef(ref) : null;
  return parsed ? questionCode({ id: parsed.id, source: "official", table: parsed.table }) : "";
}
