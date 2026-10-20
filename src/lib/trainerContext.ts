import { isEnemContest } from "./trainerFilters";
import { canonicalSubject } from "./subjects";
import { activityTopic, type ActivityQuestion } from "./dailyStudyActivity";

export function trainerContext(
  question: ActivityQuestion | undefined,
  subject: string,
  topic: string,
  studyTopic?: string,
) {
  if (question) {
    const current = activityTopic(question);
    return {
      discipline: canonicalSubject(question.subject) || "Disciplina não identificada",
      topic: current || "Assunto não identificado",
      automatic: !!current && !question.testedTopic?.trim() && !question.subtopic?.trim(),
    };
  }
  return {
    discipline: subject && subject !== "all" ? canonicalSubject(subject) : "Todas as disciplinas",
    topic:
      studyTopic ||
      (topic && topic !== "all" ? topic.split("::").at(-1) || topic : "Todos os assuntos"),
    automatic: false,
  };
}

/** External discipline links stay scoped; the sidebar opens the unfiltered trainer. */
export function lockedTrainerSubject(value: string | undefined) {
  return value && value.trim() && value !== "all" ? canonicalSubject(value) : null;
}
export function trainerDisciplineCatalog<T extends { subject: string }>(
  catalog: T[],
  subject: string | null,
): T[] {
  return subject ? catalog.filter((q) => canonicalSubject(q.subject) === subject) : catalog;
}

/** A contextual entry keeps its preparation area until the general trainer is reopened. */
export function lockedTrainerCollection(
  filters: Record<string, string | undefined>,
): "enem" | "contests" | null {
  const contextual = [
    "subject",
    "contest",
    "edition",
    "syllabus",
    "law",
    "appliedExam",
    "area",
    "board",
    "career",
    "year",
    "topic",
  ].some((key) => !!filters[key]?.trim() && filters[key] !== "all");
  if (!contextual) return null;
  return isEnemContest(filters["contest"] || filters["appliedExam"]?.split("::")[0] || "")
    ? "enem"
    : "contests";
}

export function trainerTopicSubject(topic: string): string | null {
  return topic.includes("::") ? canonicalSubject(topic.split("::")[0]) || null : null;
}
