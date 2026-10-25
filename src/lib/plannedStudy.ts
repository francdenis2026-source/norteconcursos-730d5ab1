import { canonicalSubject, canonicalTopic } from "./subjects";
import { materialTopic } from "./materialPractice";
export function plannedPractice(subject: string, topic?: string) {
  return {
    planned: "1",
    go: "1",
    mode: "catalog",
    subject: canonicalSubject(subject),
    studySubject: canonicalSubject(subject),
    ...(topic ? { materialTopic: materialTopic(subject, topic) } : {}),
    limit: "20",
  };
}
export function plannedAvailability(available: number, requested = 20) {
  return available === 0
    ? "Não há questões elegíveis para o assunto planejado. Nenhum outro assunto foi incluído."
    : available < requested
      ? `Seu plano prevê ${requested} questões; há ${available} disponíveis neste recorte. A atividade usará somente essas ${available}, sem incluir outros assuntos.`
      : "";
}

/** Explicit catalog metadata takes precedence; unknown topics never widen the selection. */
export function matchesPlannedStudy(
  question: {
    subject: string;
    text: string;
    subtopic?: string | null;
    testedTopic?: string | null;
  },
  selection: {
    subject?: string | undefined;
    topic?: string | undefined;
    subjects?: string[] | undefined;
  },
) {
  const subject = canonicalSubject(question.subject);
  if (selection.subject && subject !== canonicalSubject(selection.subject)) return false;
  if (selection.subjects && !selection.subjects.map(canonicalSubject).includes(subject))
    return false;
  if (!selection.topic) return true;
  const explicit = [question.testedTopic, question.subtopic].filter(
    (s): s is string => !!s?.trim(),
  );
  const labels = explicit.length ? explicit : [materialTopic(question.subject, question.text)];
  const key = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  return labels.some(
    (label) =>
      key(canonicalTopic(label) ?? label) ===
      key(canonicalTopic(selection.topic!) ?? selection.topic!),
  );
}
export function plannedSubjects(value?: string): string[] | undefined {
  if (value === undefined) return undefined;
  try {
    const data: unknown = JSON.parse(value);
    return Array.isArray(data)
      ? data.filter((s): s is string => typeof s === "string" && !!s.trim())
      : [];
  } catch {
    return [];
  }
}
