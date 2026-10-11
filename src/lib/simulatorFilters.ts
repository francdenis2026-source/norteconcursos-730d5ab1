import { canonicalBoard, canonicalCareerName, canonicalSubject } from "./subjects";
import { hasReviewedExplanation, type Question } from "./questionFormat";

type Item = {
  contest: string;
  subject: string;
  board: string;
  career: string;
  year: number;
  sourceKind: string;
  state: string;
  category: string;
  explanation: string;
  legalBasis: Question["legalBasis"];
  checkedAt: string | null;
};
export type SimulatorFilters = Record<
  | "contest"
  | "subject"
  | "board"
  | "career"
  | "year"
  | "source"
  | "state"
  | "category"
  | "reviewed",
  string
>;
export function filterSimulatorQuestions<T extends Item>(catalog: T[], f: SimulatorFilters) {
  return catalog.filter(
    (item) =>
      (f.contest === "all" || item.contest === f.contest) &&
      (f.subject === "all" || canonicalSubject(item.subject) === canonicalSubject(f.subject)) &&
      (f.board === "all" || canonicalBoard(item.board) === canonicalBoard(f.board)) &&
      (f.career === "all" || canonicalCareerName(item.career) === canonicalCareerName(f.career)) &&
      (f.year === "all" || item.year === Number(f.year)) &&
      (f.source === "all" || item.sourceKind === f.source) &&
      (f.state === "all" || item.state === f.state) &&
      (f.category === "all" || item.category === f.category) &&
      (f.reviewed === "all" ||
        (f.reviewed === "reviewed"
          ? hasReviewedExplanation(item as unknown as Question)
          : f.reviewed === "pending" && !hasReviewedExplanation(item as unknown as Question))),
  );
}
