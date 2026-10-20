import { questionIdentity } from "./questionIdentity";
import { canonicalSubject } from "./subjects";
import { classifyTopic } from "./questionTopics";
import type { Question } from "./questionFormat";

export type StudyPeriod = "day" | "7d" | "15d" | "30d" | "6m" | "1y";
export const STUDY_PERIODS: { value: StudyPeriod; label: string }[] = [
  { value: "day", label: "Dia" },
  { value: "7d", label: "7 dias" },
  { value: "15d", label: "15 dias" },
  { value: "30d", label: "30 dias" },
  { value: "6m", label: "6 meses" },
  { value: "1y", label: "1 ano" },
];
export function activityDateRange(day: string, period: StudyPeriod | boolean = "day") {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw Error("Invalid study date");
  const end = new Date(`${day}T05:00:00Z`);
  if (!Number.isFinite(end.getTime()) || end.toISOString().slice(0, 10) !== day)
    throw Error("Invalid study date");
  end.setUTCDate(end.getUTCDate() + 1);
  const start = new Date(end);
  const value = typeof period === "boolean" ? (period ? "7d" : "day") : period;
  if (value === "6m" || value === "1y") {
    const date = start.getUTCDate();
    start.setUTCDate(1);
    start.setUTCMonth(start.getUTCMonth() - (value === "6m" ? 6 : 12));
    const last = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0),
    ).getUTCDate();
    start.setUTCDate(Math.min(date, last));
  } else start.setUTCDate(start.getUTCDate() - { day: 1, "7d": 7, "15d": 15, "30d": 30 }[value]);
  return { start: start.toISOString(), end: end.toISOString() };
}

export function studyPeriodSummary(
  rows: { study_date: string; active_seconds: number }[],
  live: number,
  today: string,
  day: string,
  period: StudyPeriod,
) {
  const range = activityDateRange(day, period),
    start = range.start.slice(0, 10),
    end = range.end.slice(0, 10);
  const byDay = new Map<string, number>();
  for (const row of rows)
    if (row.study_date >= start && row.study_date < end && Number.isFinite(row.active_seconds))
      byDay.set(row.study_date, (byDay.get(row.study_date) ?? 0) + Math.max(0, row.active_seconds));
  if (today >= start && today < end)
    byDay.set(
      today,
      Math.max(byDay.get(today) ?? 0, Number.isFinite(live) ? Math.max(0, live) : 0),
    );
  const days = [];
  for (
    let date = new Date(range.start);
    date.toISOString() < range.end;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const key = date.toISOString().slice(0, 10);
    days.push({ date: key, seconds: byDay.get(key) ?? 0 });
  }
  const total = days.reduce((sum, d) => sum + d.seconds, 0),
    activeDays = days.filter((d) => d.seconds > 0).length;
  const monthly = period === "6m" || period === "1y";
  const buckets = new Map<string, number>();
  for (const d of days) {
    const key = monthly ? d.date.slice(0, 7) : d.date;
    buckets.set(key, (buckets.get(key) ?? 0) + d.seconds);
  }
  return {
    range,
    days,
    total,
    activeDays,
    average: Math.round(total / days.length),
    monthly,
    buckets: [...buckets].map(([date, seconds]) => ({ date, seconds })),
  };
}
export type ActivityQuestion = {
  subject: string;
  testedTopic?: string | null;
  subtopic?: string | null;
  text: string;
};
export function activityTopic(question: ActivityQuestion) {
  return (
    question.testedTopic?.trim() ||
    question.subtopic?.trim() ||
    classifyTopic(question.subject, question.text) ||
    null
  );
}
const fold = (s: string) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();
export function freshActivityQuestions(
  catalog: Question[],
  seen: ReadonlySet<string>,
  subject?: string,
  topic?: string,
) {
  const hasSeen = (q: Question) => seen.has(questionIdentity(q)) || seen.has(`${q.source}:${q.id}`);
  const fingerprint = (text: string) =>
    text.normalize("NFC").replace(/\s+/g, " ").trim().toLocaleLowerCase("pt-BR");
  const seenTexts = new Set(
    catalog
      .filter((q) => hasSeen(q) && q.text.trim())
      .map((q) => fingerprint(q.text)),
  );
  return catalog.filter(
    (q) =>
      !hasSeen(q) &&
      !seenTexts.has(fingerprint(q.text)) &&
      (!subject || canonicalSubject(q.subject) === canonicalSubject(subject)) &&
      (!topic || fold(activityTopic(q) || "") === fold(topic)),
  );
}
export function activityPracticeSearch(question: ActivityQuestion, fresh: string) {
  const topic = activityTopic(question);
  return {
    subject: canonicalSubject(question.subject),
    ...(topic ? { studyTopic: topic } : {}),
    unseen: "1",
    go: "1",
    fresh,
  };
}
export function otherStudentStats(
  stats: { total: number; correct: number; wrong: number },
  own: { is_correct: boolean } | null,
) {
  const total = Math.max(0, Number(stats.total) - (own ? 1 : 0));
  const correct = Math.max(0, Number(stats.correct) - (own?.is_correct ? 1 : 0));
  const wrong = Math.max(0, Number(stats.wrong) - (own && !own.is_correct ? 1 : 0));
  if (total < 5 || correct + wrong !== total) return null;
  return { total, correct, wrong, accuracy: Math.round((correct / total) * 1000) / 10 };
}

/** Deduplicate before applying the date filter: a later repeat never becomes a new first answer. */
export function trainingPeriodRows<
  T extends {
    id: string;
    question_source: string;
    question_id: string;
    is_correct: boolean;
    created_at: string;
  },
>(rows: T[], period: StudyPeriod | "all", day: string): T[] {
  const first = new Map<string, T>();
  for (const row of [...rows].sort(
    (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at) || a.id.localeCompare(b.id),
  )) {
    const key = JSON.stringify([row.question_source, row.question_id]);
    if (
      row.question_id &&
      typeof row.is_correct === "boolean" &&
      Number.isFinite(Date.parse(row.created_at)) &&
      !first.has(key)
    )
      first.set(key, row);
  }
  const range = period === "all" ? null : activityDateRange(day, period);
  return [...first.values()].filter(
    (row) =>
      !range ||
      (Date.parse(row.created_at) >= Date.parse(range.start) &&
        Date.parse(row.created_at) < Date.parse(range.end)),
  );
}
