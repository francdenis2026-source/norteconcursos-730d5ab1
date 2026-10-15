import { parseQuestion, type Question } from "./questionFormat";
import { questionTopic } from "./filterTaxonomy";
import { classifyTopic } from "./questionTopics";
export type StudyLaterItem = {
  key: string;
  question: Question;
  topic: string;
  note: string;
  savedAt: string;
  reviewed: boolean;
};
export const studyLaterKey = (userId: string) => `norte:study-later:v1:${userId}`;
export const studyQuestionKey = (q: Question) => `${q.source}:${q.id}`;
export function questionStudyTopics(q: Question) {
  return {
    main: questionTopic(q),
    alternatives: parseQuestion(q.text).options.map((o) => ({
      letter: o.letter,
      topic: classifyTopic(q.subject, o.text),
    })),
  };
}
export function readStudyLater(userId: string): StudyLaterItem[] {
  const raw = localStorage.getItem(studyLaterKey(userId));
  if (!raw) return [];
  const data: unknown = JSON.parse(raw);
  if (
    !Array.isArray(data) ||
    data.some((x) => !x || typeof x.key !== "string" || typeof x.question?.text !== "string")
  )
    throw new Error("Caderno inválido");
  return data;
}
export function writeStudyLater(userId: string, items: StudyLaterItem[]) {
  localStorage.setItem(studyLaterKey(userId), JSON.stringify(items));
  window.dispatchEvent(new Event("study-later-changed"));
}
export function addStudyLater(
  items: StudyLaterItem[],
  question: Question,
  topic: string,
  note: string,
): StudyLaterItem[] {
  const key = studyQuestionKey(question),
    previous = items.find((i) => i.key === key);
  return [
    {
      key,
      question,
      topic,
      note,
      savedAt: previous?.savedAt ?? new Date().toISOString(),
      reviewed: previous?.reviewed ?? false,
    },
    ...items.filter((i) => i.key !== key),
  ];
}
