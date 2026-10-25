import { acreDateKey, acreDaysAgoKey } from "./acreTime";
import { canonicalSubject } from "./subjects";
import type { TrainingActivity, SimulatorActivity } from "@/hooks/usePerformanceOverview";

export type ProgressPeriod = 7 | 30 | "all";

/** Same first-answer methodology as the lifetime overview; repeats remain activity. */
export function progressSummary(
  responses: TrainingActivity[],
  attempts: SimulatorActivity[],
  period: ProgressPeriod,
  now: Date,
) {
  const end = now.getTime();
  const valid = responses.filter(
    (r) => Number.isFinite(Date.parse(r.created_at)) && Date.parse(r.created_at) <= end,
  );
  const start =
    period === "all" ? -Infinity : Date.parse(`${acreDaysAgoKey(period - 1, now)}T00:00:00-05:00`);
  const within = (date: string) => Date.parse(date) >= start && Date.parse(date) <= end;
  const seen = new Set<string>();
  const first = [...valid]
    .sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at) || a.id.localeCompare(b.id))
    .filter((r) => {
      const key = `${r.question_source}:${r.question_id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .filter((r) => within(r.created_at));
  const sessions = attempts.filter((a) => within(a.finished_at));
  const days = new Set([
    ...valid.filter((r) => within(r.created_at)).map((r) => acreDateKey(new Date(r.created_at))),
    ...sessions.map((a) => acreDateKey(new Date(a.finished_at))),
  ]);
  const groups = new Map<string, { subject: string; total: number; correct: number }>();
  for (const row of first) {
    const subject = canonicalSubject(row.subject) || "Sem disciplina";
    const group = groups.get(subject) ?? { subject, total: 0, correct: 0 };
    group.total++;
    group.correct += Number(row.is_correct);
    groups.set(subject, group);
  }
  const subjects = [...groups.values()]
    .map((g) => ({ ...g, accuracy: Math.round((100 * g.correct) / g.total) }))
    .sort(
      (a, b) => a.accuracy - b.accuracy || b.total - a.total || a.subject.localeCompare(b.subject),
    );
  const signals = subjects.filter((s) => s.total >= 5);
  const correct = first.filter((r) => r.is_correct).length;
  const comparisonStart =
    period === "all" && first.length
      ? Date.parse(`${acreDateKey(new Date(first[0]!.created_at))}T00:00:00-05:00`)
      : start;
  const midpoint = comparisonStart + (end - comparisonStart) / 2;
  const earlier = first.filter((r) => Date.parse(r.created_at) < midpoint);
  const later = first.filter((r) => Date.parse(r.created_at) >= midpoint);
  const evolution =
    earlier.length >= 5 && later.length >= 5
      ? Math.round(
          1000 *
            (later.filter((r) => r.is_correct).length / later.length -
              earlier.filter((r) => r.is_correct).length / earlier.length),
        ) / 10
      : null;
  return {
    answered: first.length,
    correct,
    accuracy: first.length ? Math.round((100 * correct) / first.length) : null,
    days: days.size,
    simulators: sessions.length,
    subjects,
    weak: signals.filter((s) => s.accuracy < 60),
    best: signals.length ? signals[signals.length - 1]! : null,
    evolution,
    earlier: earlier.length,
    later: later.length,
  };
}
