import { supabase } from "@/integrations/supabase/client";

export type TrainerAnswerRow = {
  id: string;
  user_id: string;
  question_id: string;
  question_source: string;
  question_table: string | undefined;
  contest_name?: string | null;
  subject?: string | null;
  selected_answer: string;
  official_answer: string;
  is_correct: boolean;
  asked_for_help: boolean;
  topic?: string | null;
  response_seconds: number;
};

const queueKey = (userId: string) => `trainer-pending-answers:${userId}`;

const errorInfo = (error: unknown) => {
  const e = (typeof error === "object" && error !== null ? error : {}) as Record<string, unknown>;
  return {
    code: String(e["code"] ?? ""),
    message: String(e["message"] ?? ""),
    details: String(e["details"] ?? ""),
  };
};

/** Erros em que reenviar não adianta: o servidor recusou a resposta de propósito. */
export function isDefinitiveAnswerError(error: unknown) {
  const { code, message, details } = errorInfo(error);
  return (
    code === "P0429" ||
    details.includes("NORTE_SESSION_REPLACED") ||
    message.includes("Question origin is missing or ambiguous") ||
    message.includes("immutable")
  );
}

// Coluna `topic` vem de uma migração que pode ainda não ter sido aplicada no banco.
const isMissingTopicColumn = (error: unknown) => {
  const { code, message } = errorInfo(error);
  return code === "PGRST204" || code === "42703" || (/topic/i.test(message) && /column|schema cache/i.test(message));
};

export async function insertTrainerAnswer(row: TrainerAnswerRow) {
  const options = { onConflict: "id", ignoreDuplicates: true } as const;
  const first = await supabase.from("question_training_responses").upsert(row, options);
  if (!first.error || !isMissingTopicColumn(first.error)) return first.error;
  const { topic: _topic, ...withoutTopic } = row;
  void _topic;
  const retry = await supabase.from("question_training_responses").upsert(withoutTopic, options);
  return retry.error;
}

export function readPendingAnswers(userId: string): TrainerAnswerRow[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(queueKey(userId)) || "[]");
    return Array.isArray(parsed) ? (parsed as TrainerAnswerRow[]) : [];
  } catch {
    return [];
  }
}

function writePendingAnswers(userId: string, rows: TrainerAnswerRow[]) {
  try {
    if (rows.length) localStorage.setItem(queueKey(userId), JSON.stringify(rows));
    else localStorage.removeItem(queueKey(userId));
  } catch {
    /* Storage can be unavailable; the answer is still shown to the student. */
  }
}

export function enqueuePendingAnswer(row: TrainerAnswerRow) {
  const rows = readPendingAnswers(row.user_id).filter((item) => item.id !== row.id);
  writePendingAnswers(row.user_id, [...rows, row]);
}

let flushing = false;

/** Reenvia as respostas guardadas. Devolve quantas ainda estão pendentes. */
export async function flushPendingAnswers(userId: string) {
  if (flushing) return readPendingAnswers(userId).length;
  flushing = true;
  try {
    const remaining: TrainerAnswerRow[] = [];
    for (const row of readPendingAnswers(userId)) {
      const error = await insertTrainerAnswer(row);
      if (error && !isDefinitiveAnswerError(error)) remaining.push(row);
    }
    writePendingAnswers(userId, remaining);
    return remaining.length;
  } finally {
    flushing = false;
  }
}
