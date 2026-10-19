import { canonicalSubject } from "./subjects";
import { classifyTopic } from "./questionTopics";
import type { Question } from "./questionFormat";

export function activityDateRange(day: string, week = false) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw Error("Invalid study date");
  const end = new Date(`${day}T05:00:00Z`);
  if (!Number.isFinite(end.getTime()) || end.toISOString().slice(0, 10) !== day)
    throw Error("Invalid study date");
  const start = new Date(end);
  if (week) start.setUTCDate(start.getUTCDate() - 6);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
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
  const fingerprint = (text: string) =>
    text.normalize("NFC").replace(/\s+/g, " ").trim().toLocaleLowerCase("pt-BR");
  const seenTexts = new Set(
    catalog
      .filter((q) => seen.has(`${q.source}:${q.id}`) && q.text.trim())
      .map((q) => fingerprint(q.text)),
  );
  return catalog.filter(
    (q) =>
      !seen.has(`${q.source}:${q.id}`) &&
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
