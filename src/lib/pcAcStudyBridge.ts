import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { insertTrainerAnswer, isDefinitiveAnswerError } from "@/lib/trainerAnswerQueue";

/** Resposta da Área de estudo PC-AC, enviada pelo iframe e guardada até chegar ao banco. */
export type PcAcStudyAnswer = {
  id: string;
  /** Id da questão no catálogo do treinador (board_exam_questions); null em respostas antigas. */
  uid: string | null;
  seconds: number;
  question_key: string;
  question_text: string;
  topic_id: string;
  topic_name: string | null;
  subject_name: string | null;
  mode: "estudo" | "simulado";
  selected: string;
  correct: string;
  is_correct: boolean;
  answered_at: string;
};

export const PC_AC_STUDY_SAVED_EVENT = "pcac-study-saved";
const PENDING_KEY = "pcac-study-pending";
const LETTERS = ["A", "B", "C", "D", "E"];
const CONTEST = "PC-AC 2026 — questão autoral";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readPending(): PcAcStudyAnswer[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
    return Array.isArray(parsed) ? (parsed as PcAcStudyAnswer[]) : [];
  } catch {
    return [];
  }
}

function writePending(rows: PcAcStudyAnswer[]) {
  try {
    if (rows.length) localStorage.setItem(PENDING_KEY, JSON.stringify(rows));
    else localStorage.removeItem(PENDING_KEY);
  } catch {
    /* Sem armazenamento local, a resposta segue na tela e só não é reenviada depois. */
  }
}

/** Converte a mensagem do iframe em resposta válida; devolve null se o formato não bater. */
export function parseStudyMessage(data: unknown): PcAcStudyAnswer | null {
  if (!data || typeof data !== "object") return null;
  const d: Record<string, unknown> = data as Record<string, unknown>;
  if (d["type"] !== "pcac-answer") return null;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : null);
  const id = str(d["id"], 64);
  const key = str(d["key"], 80);
  const topicId = str(d["topic_id"], 60);
  const selected = str(d["selected"], 1);
  const correct = str(d["correct"], 1);
  const answeredAt = str(d["answered_at"], 40);
  if (!id || !key || !topicId || !selected || !correct || !answeredAt) return null;
  if (!LETTERS.includes(selected) || !LETTERS.includes(correct)) return null;
  if (Number.isNaN(Date.parse(answeredAt))) return null;
  const rawUid = str(d["uid"], 40);
  const secs =
    typeof d["seconds"] === "number" && Number.isFinite(d["seconds"])
      ? Math.round(d["seconds"])
      : 0;
  return {
    id,
    uid: rawUid && UUID.test(rawUid) ? rawUid.toLowerCase() : null,
    seconds: Math.min(3600, Math.max(0, secs)),
    question_key: key,
    question_text: str(d["question_text"], 600) ?? "",
    topic_id: topicId,
    topic_name: str(d["topic_name"], 120),
    subject_name: str(d["subject_name"], 120),
    mode: d["mode"] === "simulado" ? "simulado" : "estudo",
    selected,
    correct,
    is_correct: selected === correct,
    answered_at: answeredAt,
  };
}

export function enqueueStudyAnswer(row: PcAcStudyAnswer) {
  const queue = readPending();
  // Só uma tentativa por questão: se a mesma questão já espera na fila, a primeira vale.
  if (row.uid && queue.some((r) => r.uid === row.uid && r.id !== row.id)) return;
  writePending([...queue.filter((r) => r.id !== row.id), row]);
}

let flushing = false;

/** Envia as respostas pendentes. Só remove da fila o que o banco confirmou. */
export async function flushStudyAnswers() {
  if (flushing) return;
  const queued = readPending();
  if (!queued.length) return;
  flushing = true;
  try {
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (!userId) return;
    const remaining: PcAcStudyAnswer[] = [];
    let saved = 0;
    for (const row of queued) {
      if (row.uid) {
        // Mesma tabela e mesmas regras do treinador: o banco guarda só a primeira tentativa de cada questão.
        const error = await insertTrainerAnswer({
          id: row.id,
          user_id: userId,
          question_id: row.uid,
          question_source: "official",
          question_table: "board_exam_questions",
          contest_name: CONTEST,
          subject: row.subject_name ?? "Estudo PC-AC",
          selected_answer: row.selected,
          official_answer: row.correct,
          is_correct: row.is_correct,
          asked_for_help: false,
          topic: row.topic_name,
          response_seconds: row.seconds,
          created_at: row.answered_at,
        } as never);
        if (!error) saved += 1;
        else if (
          !isDefinitiveAnswerError(error) ||
          /origin is missing or ambiguous/i.test(
            String((error as { message?: string }).message ?? ""),
          )
        ) {
          // Falha de rede ou catálogo ainda não carregado no banco: a resposta fica guardada e é reenviada depois.
          remaining.push(row);
        }
        continue;
      }
      const { error } = await supabase
        .from("pcac_study_responses" as never)
        .upsert({ ...row, user_id: userId } as never, { onConflict: "id", ignoreDuplicates: true });
      if (error) remaining.push(row);
      else saved += 1;
    }
    writePending(remaining);
    if (saved > 0) window.dispatchEvent(new Event(PC_AC_STUDY_SAVED_EVENT));
  } finally {
    flushing = false;
  }
}

/** Respostas já registradas no banco para as questões da área: [id da questão, acertou (1/0), data, letra marcada]. */
export async function fetchAnsweredAreaQuestions(): Promise<
  [string, number, string, string][] | null
> {
  try {
    const rows = await fetchAllRows<{
      question_table: string;
      question_id: string;
      selected_answer: string;
      is_correct: boolean;
      answered_at: string;
    }>(
      (from, to) =>
        supabase
          .rpc("get_question_first_answers" as never)
          .order("answered_at")
          .order("question_id")
          .range(from, to) as unknown as PromiseLike<{ data: never[] | null; error: unknown }>,
    );
    return rows
      .filter((r) => r.question_table === "board_exam_questions")
      .map((r) => [r.question_id, r.is_correct ? 1 : 0, r.answered_at, r.selected_answer]);
  } catch {
    return null;
  }
}
