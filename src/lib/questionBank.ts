import type { Question } from "./questionFormat";
import { examKey } from "./questionFormat";
import { needsMissingSupportText } from "./questionText";
import { parseQuestionCode, questionCode } from "./questionIdentity";
import { dedupeSharedExamItems } from "./questionDuplicates";
import { trainerCollectionQuestions } from "./trainerFilters";
import {
  questionContestValue,
  selectedQuestionCareer,
  isAppliedExamQuestion,
} from "./questionFilterIdentity";

export type BankCollection = "contests" | "enem";
export type BankSource = "all" | Question["source"];
const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
/** Search the same provenance metadata in the bank and at the trainer destination. */
export function searchQuestionCatalog(catalog: Question[], query: string) {
  // Um código permanente completo (ex.: BD-1A2B-3C4D-5E6F) localiza exatamente aquela questão.
  const code = parseQuestionCode(query);
  if (code) return catalog.filter((q) => q.table === code.table && q.id.toLowerCase() === code.id);
  const text = fold(query);
  return text
    ? catalog.filter((q) =>
        fold(
          `${q.contest} ${q.board} ${q.subject} ${q.career} ${q.year} ${questionCode(q)}`,
        ).includes(text),
      )
    : catalog;
}
// Mesma contagem do Treinador de questões: o mesmo item cadastrado para mais de um cargo
// da mesma prova (ex.: Agente e Papiloscopista) é unido num só, senão o Acervo mostrava mais
// questões do que o aluno realmente consegue treinar nesse filtro.
export function availableQuestionBank(catalog: Question[], collection: BankCollection) {
  return dedupeSharedExamItems(
    trainerCollectionQuestions(catalog, collection).filter((q) => !needsMissingSupportText(q)),
  );
}
/** Published training inventory across both preparations; private notebooks stay separate. */
export function publishedQuestionBank(catalog: Question[]) {
  return [
    ...availableQuestionBank(catalog, "contests"),
    ...availableQuestionBank(catalog, "enem"),
  ].filter((question) => question.source !== "personal");
}
/** Only official questions belong to a paper; authored practice must not inflate its total. */
export function questionBankExams(catalog: Question[]) {
  const groups = new Map<
    string,
    { key: string; question: Question; count: number; subjects: Set<string>; questions: Question[] }
  >();
  for (const question of catalog) {
    if (!isAppliedExamQuestion(question)) continue;
    const key = examKey(question);
    const group = groups.get(key) ?? {
      key,
      question,
      count: 0,
      subjects: new Set<string>(),
      questions: [],
    };
    group.count++;
    group.questions.push(question);
    group.subjects.add(question.subject);
    groups.set(key, group);
  }
  return [...groups.values()].sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}
export function questionBankSearch(
  collection: BankCollection,
  source: BankSource,
  query: string,
  selection: { subject?: string; board?: string; year?: string; exam?: Question },
) {
  const exam = selection.exam;
  return {
    mode: "catalog",
    limit: "all",
    catalogQuery: query.trim() || undefined,
    contest: exam ? questionContestValue(exam.contest) : collection === "enem" ? "ENEM" : undefined,
    source: exam ? "official" : source === "all" ? undefined : source,
    subject: selection.subject,
    board: exam?.board ?? selection.board,
    year: exam?.year ?? selection.year,
    career: exam ? selectedQuestionCareer(exam.career, exam.contest, exam.year) : undefined,
    appliedExam: exam ? examKey(exam) : undefined,
  };
}
