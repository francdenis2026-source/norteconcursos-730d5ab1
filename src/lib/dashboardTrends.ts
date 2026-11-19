import { acreDateKey } from "./acreTime";
import type { ActivityRecord, TrainingRecord } from "./studentDashboard";

/** Últimos `count` dias (YYYY-MM-DD) até `today`, contados pela data do Acre. */
export function lastDayKeys(today: string, count: number) {
  const base = Date.parse(`${today}T12:00:00Z`);
  return Array.from({ length: count }, (_, i) =>
    new Date(base - (count - 1 - i) * 86_400_000).toISOString().slice(0, 10),
  );
}

export type DailyAnswers = { date: string; total: number; correct: number; accuracy: number | null };

/**
 * Primeiras respostas por dia, com a mesma regra do treinador:
 * cada questão conta uma vez, na data da primeira resposta.
 */
export function dailyAnswerSeries(rows: TrainingRecord[], today: string, count: number) {
  const seen = new Set<string>();
  const byDay = new Map<string, { total: number; correct: number }>();
  const ordered = rows
    .map((row) => ({ row, time: Date.parse(row.created_at) }))
    .filter(
      ({ row, time }) =>
        Number.isFinite(time) && typeof row.is_correct === "boolean" && !!row.question_id?.trim(),
    )
    .sort((a, b) => a.time - b.time || a.row.id.localeCompare(b.row.id));
  for (const { row, time } of ordered) {
    const key = JSON.stringify([row.question_source, row.question_id]);
    if (seen.has(key)) continue;
    seen.add(key);
    const day = acreDateKey(new Date(time));
    const entry = byDay.get(day) ?? { total: 0, correct: 0 };
    entry.total++;
    if (row.is_correct) entry.correct++;
    byDay.set(day, entry);
  }
  return lastDayKeys(today, count).map<DailyAnswers>((date) => {
    const entry = byDay.get(date) ?? { total: 0, correct: 0 };
    return {
      date,
      ...entry,
      accuracy: entry.total ? Math.round((entry.correct / entry.total) * 100) : null,
    };
  });
}

/** Segundos ativos por dia, com o relógio ao vivo de hoje (sem somar duas vezes). */
export function dailyStudySeries(
  rows: ActivityRecord[],
  live: number,
  today: string,
  count: number,
) {
  const byDay = new Map<string, number>();
  for (const row of rows)
    if (/^\d{4}-\d{2}-\d{2}$/.test(row.study_date) && Number.isFinite(row.active_seconds))
      byDay.set(row.study_date, (byDay.get(row.study_date) ?? 0) + Math.max(0, row.active_seconds));
  byDay.set(today, Math.max(byDay.get(today) ?? 0, Number.isFinite(live) ? Math.max(0, live) : 0));
  return lastDayKeys(today, count).map((date) => ({ date, seconds: byDay.get(date) ?? 0 }));
}

/** Duração curta para eixos e rótulos: "2h31", "45min", "0". */
export function shortDuration(seconds: number) {
  const minutes = Math.round(Math.max(0, seconds) / 60);
  if (!minutes) return "0";
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

const WEEKDAY = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
/** Rótulo de dia: "qui 12". */
export function dayLabel(date: string) {
  const weekday = WEEKDAY[new Date(`${date}T12:00:00Z`).getUTCDay()] ?? "";
  return `${weekday} ${date.slice(8, 10)}`;
}

/** Respeita a preferência do sistema por menos movimento (animações dos gráficos). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}
