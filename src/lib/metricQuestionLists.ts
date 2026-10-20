// Listas de questões por trás dos números do painel: acertos, erros, respondidas e puladas.
//
// Mesma regra dos números (summarizeTraining): conta só a PRIMEIRA resposta de cada questão. A lista de
// puladas são as do treino que seguem sem resposta nem revisão. Cada item aponta para a questão do acervo
// quando ela ainda existe; se saiu do acervo, o item continua na lista, só sem o enunciado.
import type { Question } from "./questionFormat";
import type { SkippedQuestion } from "@/hooks/useSkippedQuestions";

export type MetricListKind = "correct" | "wrong" | "answered" | "skipped";

export interface AnsweredRow {
  id: string;
  question_id: string;
  question_source: string;
  subject: string;
  is_correct: boolean;
  created_at: string;
}

export interface MetricListItem {
  key: string;
  questionId: string;
  source: string;
  subject: string;
  /** Data da resposta (ou de quando foi pulada). */
  at: string;
  result: "correct" | "wrong" | "skipped";
}

export const METRIC_LIST_LABEL: Record<MetricListKind, { title: string; empty: string }> = {
  correct: { title: "Questões que você acertou", empty: "Nenhum acerto neste período." },
  wrong: { title: "Questões que você errou", empty: "Nenhum erro neste período." },
  answered: { title: "Questões respondidas", empty: "Nenhuma questão respondida neste período." },
  skipped: {
    title: "Questões puladas",
    empty: "Você não tem questões puladas pendentes. Pule no treino para deixá-las aqui.",
  },
};

const keyOf = (row: { question_source: string; question_id: string }) =>
  `${row.question_source}:${row.question_id}`;

/** Primeira resposta de cada questão, mais recentes primeiro. */
function firstAnswers(rows: readonly AnsweredRow[]): AnsweredRow[] {
  const first = new Map<string, AnsweredRow>();
  const chronological = [...rows].sort(
    (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at) || a.id.localeCompare(b.id),
  );
  for (const row of chronological)
    if (row.question_id && typeof row.is_correct === "boolean" && !first.has(keyOf(row)))
      first.set(keyOf(row), row);
  return [...first.values()].sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at) || b.id.localeCompare(a.id),
  );
}

export function buildMetricLists(
  rows: readonly AnsweredRow[],
  skipped: readonly SkippedQuestion[],
): Record<MetricListKind, MetricListItem[]> {
  const answered = firstAnswers(rows).map((row): MetricListItem => ({
    key: keyOf(row),
    questionId: row.question_id,
    source: row.question_source,
    subject: row.subject,
    at: row.created_at,
    result: row.is_correct ? "correct" : "wrong",
  }));
  const pending = [...skipped]
    .sort((a, b) => Date.parse(b.saved_at) - Date.parse(a.saved_at))
    .map((item): MetricListItem => ({
      key: `skipped:${item.question_table}:${item.question_id}`,
      questionId: item.question_id,
      source: "",
      subject: "",
      at: item.saved_at,
      result: "skipped",
    }));
  return {
    correct: answered.filter((item) => item.result === "correct"),
    wrong: answered.filter((item) => item.result === "wrong"),
    answered,
    skipped: pending,
  };
}

/** Acervo indexado por id (uuid) para achar o enunciado de cada item da lista. */
export function catalogById(catalog: readonly Question[]): Map<string, Question> {
  const index = new Map<string, Question>();
  for (const question of catalog) if (!index.has(question.id)) index.set(question.id, question);
  return index;
}
