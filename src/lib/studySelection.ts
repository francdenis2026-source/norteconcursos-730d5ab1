// Escolha de disciplina e assunto da Sala de estudo.
// Prioridade: parâmetro da URL (link de cronograma) > última escolha salva no aparelho > matéria sugerida pelo plano.

export interface StudySelection {
  subject: string;
  topic: string;
}

export const STUDY_PICK_KEY = "norte_focus_pick";

export function resolveStudySelection(input: {
  subjects: string[];
  suggested: string;
  urlSubject?: string | undefined;
  urlTopic?: string | undefined;
  saved?: StudySelection | null | undefined;
}): StudySelection {
  const { subjects, suggested, urlSubject, urlTopic, saved } = input;
  // Enquanto a lista ainda carrega, aceita o valor informado sem validar.
  const accepted = (name: string | undefined) =>
    !!name && (subjects.length === 0 || subjects.includes(name)) ? name : undefined;
  const subject =
    accepted(urlSubject) ??
    accepted(saved?.subject) ??
    accepted(suggested) ??
    subjects[0] ??
    "";
  const topic =
    urlSubject === subject && urlTopic
      ? urlTopic
      : saved?.subject === subject
        ? (saved.topic ?? "")
        : "";
  return { subject, topic };
}
