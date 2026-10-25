import type { Question } from "./questionFormat";
import { matchesQuestionContest, matchesQuestionCareer } from "./questionFilterIdentity";
import { needsMissingSupportText } from "./questionText";

export type ExamAvailabilityIdentity = {
  contest: string;
  year: string;
  board: string;
  roles: readonly string[];
};
/** The input is the eligible catalog used by the trainer; never count archived raw rows. */
export function examAvailableCounts(catalog: Question[], exam: ExamAvailabilityIdentity) {
  return exam.roles.map(
    (role) =>
      new Set(
        catalog
          .filter(
            (q) =>
              matchesQuestionContest(q.contest, exam.contest) &&
              q.year === exam.year &&
              matchesQuestionCareer(q.career, q.contest, q.year, role, exam.contest, exam.year) &&
              q.board === exam.board &&
              q.source === "official" &&
              !needsMissingSupportText(q),
          )
          .map((q) => q.itemNumber ?? q.id),
      ).size,
  );
}
