import { parseQuestion, questionAnswers, type Question } from "./questionFormat";
import { questionTopic } from "./filterTaxonomy";
import { classifyTopic } from "./questionTopics";
import { questionRef } from "./questionIdentity";

export type StudyLaterItem = {
  key: string;
  question: Question;
  topic: string | null;
  alternatives: { letter: string; text: string; topic: string | null; subject: string }[];
  savedAt: string;
  notes: string;
  reviewed: boolean;
  /** "skipped": o aluno pulou a questão no treino; "saved" (ou ausente): salva por escolha. */
  reason?: "saved" | "skipped";
  /** "user": o aluno definiu o assunto; ausente = sugestão automática ou do cadastro. */
  topicSource?: "user" | undefined;
};
export interface StudyLaterStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
export const studyLaterKey = (userId: string) => `norte:study-later:v1:${userId}`;
/** Identidade pela tabela física (official e board dividem a origem "official"). */
export const studyLaterIdentity = (question: Pick<Question, "source" | "id" | "table">) =>
  questionRef(question);
/** Itens salvos antes da identidade por tabela usavam "origem:id"; continuam reconhecidos. */
export const studyLaterLegacyIdentity = (question: Pick<Question, "source" | "id">) =>
  `${question.source}:${question.id}`;
export const studyLaterHas = (
  items: readonly Pick<StudyLaterItem, "key">[],
  question: Pick<Question, "source" | "id" | "table">,
) =>
  items.some(
    (item) =>
      item.key === studyLaterIdentity(question) || item.key === studyLaterLegacyIdentity(question),
  );
export function canStrikeQuestion(question: Question) {
  return (
    question.kind !== "true_false" &&
    questionAnswers(question).join("") !== "CE" &&
    (parseQuestion(question.text).options.length >= 2 || question.kind === "multiple_choice")
  );
}
export function readStudyLater(storage: StudyLaterStorage, userId: string): StudyLaterItem[] {
  if (!userId || userId === "demo-user") return [];
  const raw = storage.getItem(studyLaterKey(userId));
  if (!raw) return [];
  const items: unknown = JSON.parse(raw);
  if (
    !Array.isArray(items) ||
    !items.every(
      (item) =>
        item &&
        typeof item.key === "string" &&
        typeof item.question?.id === "string" &&
        typeof item.question?.text === "string" &&
        typeof item.question?.subject === "string" &&
        Array.isArray(item.alternatives) &&
        typeof item.notes === "string" &&
        typeof item.reviewed === "boolean" &&
        typeof item.savedAt === "string",
    )
  )
    throw new Error("O caderno salvo não pôde ser lido. Os dados existentes foram preservados.");
  return items;
}
export function writeStudyLater(
  storage: StudyLaterStorage,
  userId: string,
  items: StudyLaterItem[],
) {
  if (!userId || userId === "demo-user")
    throw new Error("Entre na sua conta para salvar no caderno.");
  storage.setItem(studyLaterKey(userId), JSON.stringify(items));
}
export function saveStudyLater(
  storage: StudyLaterStorage,
  userId: string,
  question: Question,
  now = new Date().toISOString(),
  reason: "saved" | "skipped" = "saved",
) {
  const items = readStudyLater(storage, userId);
  const key = studyLaterIdentity(question);
  if (studyLaterHas(items, question)) return items;
  const parsed = parseQuestion(question.text);
  const item: StudyLaterItem = {
    key,
    question: { ...question },
    topic: questionTopic({ ...question, text: parsed.stem }),
    alternatives: parsed.options.map((option) => ({
      ...option,
      subject: question.subject,
      topic: classifyTopic(question.subject, option.text),
    })),
    savedAt: now,
    notes: "",
    reviewed: false,
    reason,
  };
  const result = [item, ...items];
  writeStudyLater(storage, userId, result);
  return result;
}
