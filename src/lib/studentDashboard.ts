import { acreDateKey, acreDaysAgoKey } from "./acreTime";
import { canonicalSubject } from "./subjects";
import {
  buildWeek,
  canonicalDiscipline,
  nextTopic,
  topicDone,
  type CronoConfig,
  type TopicProgress,
} from "./cronograma";

export type TrainingRecord = {
  id: string;
  question_id: string;
  question_source: string;
  subject: string;
  is_correct: boolean;
  created_at: string;
};
export type ReinforcementRecord = Omit<TrainingRecord, "subject">;
export type ActivityRecord = { study_date: string; active_seconds: number };
export type DashboardPlan = { id: string; name: string; config: unknown };
const key = (r: { question_source: string; question_id: string }) =>
  JSON.stringify([r.question_source, r.question_id]);
const chronologically = (
  a: { created_at: string; id: string },
  b: { created_at: string; id: string },
) => Date.parse(a.created_at) - Date.parse(b.created_at) || a.id.localeCompare(b.id);

/** First answers and reinforcement stay separate, matching the trainer's scoring rule. */
export function summarizeTraining(
  rows: TrainingRecord[],
  attempts: ReinforcementRecord[] | null,
  today: string,
) {
  const first = new Map<string, TrainingRecord>();
  for (const row of [...rows].sort(chronologically))
    if (row.question_id && typeof row.is_correct === "boolean" && !first.has(key(row)))
      first.set(key(row), row);
  const latest = new Map<string, ReinforcementRecord>();
  for (const row of [...(attempts ?? [])].sort(chronologically)) latest.set(key(row), row);
  const subjects = new Map<string, { subject: string; total: number; correct: number }>();
  let correct = 0,
    todayCount = 0,
    pending = 0;
  for (const row of first.values()) {
    if (row.is_correct) correct++;
    else if (!latest.get(key(row))?.is_correct) pending++;
    const date = new Date(row.created_at);
    if (Number.isFinite(date.getTime()) && acreDateKey(date) === today) todayCount++;
    const subject = canonicalSubject(row.subject) || "Sem disciplina identificada";
    const s = subjects.get(subject) ?? { subject, total: 0, correct: 0 };
    s.total++;
    if (row.is_correct) s.correct++;
    subjects.set(subject, s);
  }
  const total = first.size;
  return {
    total,
    correct,
    wrong: total - correct,
    accuracy: total ? Math.round((correct / total) * 100) : null,
    today: todayCount,
    pending: attempts === null ? null : pending,
    subjects: [...subjects.values()]
      .map((s) => ({ ...s, accuracy: Math.round((s.correct / s.total) * 100) }))
      .sort((a, b) => b.total - a.total || a.subject.localeCompare(b.subject)),
    signals: [...subjects.values()]
      .filter((s) => s.total >= 5 && s.correct / s.total < 0.6)
      .sort((a, b) => a.correct / a.total - b.correct / b.total || b.total - a.total)
      .slice(0, 3),
  };
}

/** The live clock already contains today's sessions: take the maximum, never add it twice. */
export function summarizeStudyTime(rows: ActivityRecord[], live: number, now: Date) {
  const today = acreDateKey(now),
    byDay = new Map<string, number>();
  for (const row of rows)
    if (/^\d{4}-\d{2}-\d{2}$/.test(row.study_date) && Number.isFinite(row.active_seconds))
      byDay.set(row.study_date, (byDay.get(row.study_date) ?? 0) + Math.max(0, row.active_seconds));
  byDay.set(today, Math.max(byDay.get(today) ?? 0, Number.isFinite(live) ? Math.max(0, live) : 0));
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = acreDaysAgoKey(6 - i, now);
    return { date, seconds: byDay.get(date) ?? 0 };
  });
  return {
    today: byDay.get(today) ?? 0,
    total: [...byDay.values()].reduce((a, b) => a + b, 0),
    week: days.reduce((sum, d) => sum + d.seconds, 0),
    days,
  };
}

export function validDashboardConfig(value: unknown): value is CronoConfig {
  if (!value || typeof value !== "object") return false;
  const c = value as CronoConfig;
  return (
    Array.isArray(c.days) &&
    c.days.length > 0 &&
    c.days.every((d) => Number.isInteger(d) && d >= 0 && d <= 6) &&
    Number.isFinite(c.weeklyHours) &&
    c.weeklyHours > 0 &&
    c.weeklyHours <= 80 &&
    typeof c.startTime === "string" &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(c.startTime) &&
    Array.isArray(c.discs) &&
    c.discs.length > 0 &&
    c.discs.every(
      (d) =>
        d &&
        typeof d.id === "string" &&
        typeof d.nome === "string" &&
        [1, 2].includes(d.peso) &&
        Array.isArray(d.topicos) &&
        d.topicos.every((t) => t && typeof t.id === "string" && typeof t.t === "string"),
    )
  );
}
export function dashboardSchedule(
  config: CronoConfig,
  progress: Record<string, TopicProgress>,
  day: number,
) {
  const cfg = {
    ...config,
    discs: config.discs.map((d) => ({ ...d, nome: canonicalDiscipline(d.nome) })),
  };
  const topics = cfg.discs.flatMap((d) => d.topicos);
  return {
    blocks: buildWeek(cfg, progress)[day] ?? [],
    next: nextTopic(cfg, progress),
    completed: topics.filter((t) => topicDone(progress[t.id])).length,
    total: topics.length,
  };
}

export function daysToExam(value: string | undefined, today: string): number | null {
  if (!value) return null;
  const parse = (s: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const n = Date.parse(`${s}T12:00:00Z`);
    return Number.isFinite(n) && new Date(n).toISOString().slice(0, 10) === s ? n : null;
  };
  const a = parse(value),
    b = parse(today);
  return a === null || b === null ? null : Math.round((a - b) / 86400000);
}

type ReadingProgress = { unit_id: string; read_at: string | null };
type ReadingUnit = {
  id: string;
  course_id: string;
  unit_key: string;
  label: string;
  content_status: string;
};
type ReadingCourse = {
  id: string;
  slug: string;
  title: string;
  status: string;
  syllabus_topic_id: string | null;
};
export function recentReading(
  progress: ReadingProgress[],
  units: ReadingUnit[],
  courses: ReadingCourse[],
) {
  for (const p of progress) {
    const u = units.find((u) => u.id === p.unit_id && u.content_status === "current");
    const c =
      u &&
      courses.find((c) => c.id === u.course_id && c.status === "active" && !!c.syllabus_topic_id);
    if (u && c) return { slug: c.slug, title: c.title, article: u.unit_key, label: u.label };
  }
  return null;
}
