import { supabase } from "@/integrations/supabase/client";

/** Resposta da Área de estudo PC-AC, enviada pelo iframe e guardada até chegar ao banco. */
export type PcAcStudyAnswer = {
  id: string;
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
  if (d['type'] !== "pcac-answer") return null;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : null);
  const id = str(d['id'], 64);
  const key = str(d['key'], 80);
  const topicId = str(d['topic_id'], 60);
  const selected = str(d['selected'], 1);
  const correct = str(d['correct'], 1);
  const answeredAt = str(d['answered_at'], 40);
  if (!id || !key || !topicId || !selected || !correct || !answeredAt) return null;
  if (!LETTERS.includes(selected) || !LETTERS.includes(correct)) return null;
  if (Number.isNaN(Date.parse(answeredAt))) return null;
  return {
    id,
    question_key: key,
    question_text: str(d['question_text'], 600) ?? "",
    topic_id: topicId,
    topic_name: str(d['topic_name'], 120),
    subject_name: str(d['subject_name'], 120),
    mode: d['mode'] === "simulado" ? "simulado" : "estudo",
    selected,
    correct,
    is_correct: selected === correct,
    answered_at: answeredAt,
  };
}

export function enqueueStudyAnswer(row: PcAcStudyAnswer) {
  writePending([...readPending().filter((r) => r.id !== row.id), row]);
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
