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
