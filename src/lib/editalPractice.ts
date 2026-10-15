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
    !edition.exam_board?.trim() ||
    !Number.isInteger(edition.contest_year)
  )
    return [];
  return catalog.filter(
    (q) =>
      isAppliedExamQuestion(q) &&
      !needsMissingSupportText(q) &&
      q.year === String(edition.contest_year) &&
      canonicalBoard(q.board) === canonicalBoard(edition.exam_board!) &&
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
}
export function editalPracticeSearch(edition: EditalEdition) {
  return {
    edition: edition.id,
    mode: "catalog",
    limit: "all",
    ...(/^\s*(?:ENEM\b|Exame Nacional do Ensino M[eé]dio\b)/i.test(edition.contest_name)
      ? { contest: "ENEM" }
      : {}),
  };
}
