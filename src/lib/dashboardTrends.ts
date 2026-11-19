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

export type ChartRange = "7d" | "30d" | "12m";
export const CHART_RANGES: ReadonlyArray<readonly [ChartRange, string]> = [
  ["7d", "7 dias"],
  ["30d", "30 dias"],
  ["12m", "12 meses"],
];
export type StudyBucket = {
  key: string;
  /** Rótulo curto do eixo: "qui 12", "12/11" ou "nov". */
  label: string;
  /** Rótulo completo da dica: "quinta-feira, 12 de novembro". */
  fullLabel: string;
  seconds: number;
  current: boolean;
};
const MONTHS_SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Tempo ativo agrupado por dia (7 ou 30 dias) ou por mês (12 meses), no horário do Acre. */
export function studyBuckets(
  rows: ActivityRecord[],
  live: number,
  today: string,
  range: ChartRange,
): StudyBucket[] {
  if (range !== "12m") {
    const days = dailyStudySeries(rows, live, today, range === "7d" ? 7 : 30);
    return days.map((d) => ({
      key: d.date,
      label: range === "7d" ? dayLabel(d.date) : `${d.date.slice(8, 10)}/${d.date.slice(5, 7)}`,
      fullLabel: new Date(`${d.date}T12:00:00Z`).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        timeZone: "UTC",
      }),
      seconds: d.seconds,
      current: d.date === today,
    }));
  }
  const byMonth = new Map<string, number>();
  for (const row of rows)
    if (/^\d{4}-\d{2}-\d{2}$/.test(row.study_date) && Number.isFinite(row.active_seconds))
      byMonth.set(
        row.study_date.slice(0, 7),
        (byMonth.get(row.study_date.slice(0, 7)) ?? 0) + Math.max(0, row.active_seconds),
      );
  // Hoje: soma o relógio ao vivo só se ele passar do registro sincronizado do dia.
  const todaySynced = rows
    .filter((r) => r.study_date === today && Number.isFinite(r.active_seconds))
    .reduce((s, r) => s + Math.max(0, r.active_seconds), 0);
  const extra = Math.max(0, (Number.isFinite(live) ? live : 0) - todaySynced);
  byMonth.set(today.slice(0, 7), (byMonth.get(today.slice(0, 7)) ?? 0) + extra);
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 12 + i, 1));
    const key = date.toISOString().slice(0, 7);
    const name = MONTHS_SHORT[date.getUTCMonth()] ?? "";
    return {
      key,
      label: name,
      fullLabel: date.toLocaleDateString("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }),
      seconds: byMonth.get(key) ?? 0,
      current: key === today.slice(0, 7),
    };
  });
}

/** Marcas do eixo de tempo em minutos, em passos redondos (15 min, 30 min, 1 h, 2 h…), até 5 marcas. */
export function minuteTicks(maxMinutes: number) {
  const steps = [15, 30, 60, 90, 120, 180, 240, 360, 600, 1200, 3000, 6000];
  const top = Math.max(1, maxMinutes);
  const step = steps.find((s) => Math.ceil(top / s) <= 4) ?? Math.ceil(top / 4);
  const count = Math.max(1, Math.ceil(top / step));
  return Array.from({ length: count + 1 }, (_, i) => i * step);
}
