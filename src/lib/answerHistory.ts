import type { Answer, Question } from "./questionFormat";
import { questionIdentity } from "./questionIdentity";

export type AnswerHistoryRow = {
  question_id: string;
  question_source?: string;
  question_table?: string | null;
  selected_answer: string | null;
  is_correct: boolean | null;
  created_at?: string;
  answered_at?: string;
  modality?: string;
};
export type PreviousAnswer = { selected: Answer; isCorrect: boolean };

/** Blank items never become answers. Legacy source groups are resolved only when unambiguous. */
export function answerHistory(
  rows: AnswerHistoryRow[],
  catalog: Pick<Question, "id" | "source" | "table">[],
): Map<string, PreviousAnswer> {
  const candidates = new Map<string, Set<string>>();
  for (const q of catalog) {
    const legacy = `${q.source}:${q.id}`;
    const identities = candidates.get(legacy) ?? new Set();
    identities.add(questionIdentity(q));
    candidates.set(legacy, identities);
  }
  const result = new Map<string, PreviousAnswer>();
  const sorted = [...rows].sort((a, b) =>
    (a.answered_at ?? a.created_at ?? "").localeCompare(b.answered_at ?? b.created_at ?? ""),
  );
  for (const row of sorted) {
    if (!row.selected_answer || row.is_correct === null) continue;
    const matches = candidates.get(`${row.question_source}:${row.question_id}`);
    const key = row.question_table
      ? `${row.question_table}:${row.question_id}`
      : matches?.size === 1 ? [...matches][0] : undefined;
    if (key && !result.has(key)) result.set(key, {
      selected: row.selected_answer as Answer,
      isCorrect: row.is_correct,
    });
  }
  return result;
}

export function isMissingIdentitySchema(error: unknown): boolean {
  const code = (error as { code?: string } | null)?.code;
  return code === "PGRST202" || code === "42883";
}
