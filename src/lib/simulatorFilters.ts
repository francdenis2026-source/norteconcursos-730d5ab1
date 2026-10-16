import { canonicalBoard, canonicalCareerName, canonicalSubject } from "./subjects";
import { hasReviewedExplanation, type Question } from "./questionFormat";
import {
  matchesQuestionContest,
  matchesQuestionCareer,
  questionContestLabel,
  questionCareerLabel,
} from "./questionFilterIdentity";

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
      matchesQuestionContest(item.contest, f.contest) &&
      (f.subject === "all" || canonicalSubject(item.subject) === canonicalSubject(f.subject)) &&
      (f.board === "all" || canonicalBoard(item.board) === canonicalBoard(f.board)) &&
      matchesQuestionCareer(item.career, item.contest, item.year, f.career, f.contest, f.year) &&
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

export const SIMULATOR_FACET_KEYS = [
  "contest",
  "board",
  "career",
  "year",
  "source",
  "subject",
  "state",
  "category",
  "reviewed",
] as const;
export function simulatorFilterFacets<T extends Item>(catalog: T[], filters: SimulatorFilters) {
  const facets = {} as Record<(typeof SIMULATOR_FACET_KEYS)[number], Map<string, number>>;
  for (const key of SIMULATOR_FACET_KEYS) {
    const rows = filterSimulatorQuestions(catalog, { ...filters, [key]: "all" });
    const counts = new Map<string, number>();
    for (const item of rows) {
      const value =
        key === "contest"
          ? questionContestLabel(item.contest)
          : key === "career"
            ? questionCareerLabel(item.career, item.contest, item.year)
            : key === "source"
              ? item.sourceKind
              : key === "year"
                ? String(item.year)
                : key === "board"
                  ? canonicalBoard(item.board)
                  : key === "subject"
                    ? canonicalSubject(item.subject)
                    : key === "reviewed"
                      ? hasReviewedExplanation(item as unknown as Question)
                        ? "reviewed"
                        : "pending"
                      : item[key];
      if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    if (filters[key] !== "all" && !counts.has(filters[key]))
      counts.set(filters[key], filterSimulatorQuestions(rows, { ...filters }).length);
    facets[key] = counts;
  }
  return facets;
}
