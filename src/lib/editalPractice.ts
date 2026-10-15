import type { EditalEdition } from "./editalCatalog";
import type { Question } from "./questionFormat";
import { canonicalBoard } from "./subjects";
import {
  isAppliedExamQuestion,
  matchesQuestionContest,
  matchesQuestionCareer,
  questionContestLabel,
} from "./questionFilterIdentity";
import { needsMissingSupportText } from "./questionText";

/** A topic's current syllabus mapping is not evidence of the paper it came from. */
export function editalExamQuestions(catalog: Question[], edition: EditalEdition) {
  if (
    !edition.contest_name?.trim() ||
    !edition.role_name?.trim() ||
    !Number.isInteger(edition.contest_year)
  )
    return [];
  const candidates = catalog.filter(
    (q) =>
      isAppliedExamQuestion(q) &&
      !needsMissingSupportText(q) &&
      q.year === String(edition.contest_year) &&
      matchesQuestionContest(q.contest, questionContestLabel(edition.contest_name)) &&
      matchesQuestionCareer(
        q.career,
        q.contest,
        q.year,
        edition.role_name,
        edition.contest_name,
        edition.contest_year,
      ),
  );
  const knownBoard = (value: string | null | undefined) =>
    !!value?.trim() && !/^(?:n[aã]o informada|desconhecida|a definir)$/i.test(value.trim());
  const board = knownBoard(edition.exam_board) ? canonicalBoard(edition.exam_board) : null;
  if (board) return candidates.filter((q) => canonicalBoard(q.board) === board);
  // A missing edition field can be resolved only by one unambiguous board in this paper's eligible items.
  const identified = new Set(
    candidates.filter((q) => knownBoard(q.board)).map((q) => canonicalBoard(q.board)),
  );
  if (identified.size !== 1) return [];
  const [resolved] = identified;
  return candidates.filter((q) => canonicalBoard(q.board) === resolved);
}
export function editalPracticeSearch(edition: EditalEdition) {
  return {
    edition: edition.id,
    go: "1",
    mode: "catalog",
    limit: "all",
    ...(/^\s*(?:ENEM\b|Exame Nacional do Ensino M[eé]dio\b)/i.test(edition.contest_name)
      ? { contest: "ENEM" }
      : {}),
  };
}
