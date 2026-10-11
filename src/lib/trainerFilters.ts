import type { Question } from "./questionFormat";
import { examKey, hasReviewedExplanation } from "./questionFormat";
import { subjectInArea } from "./questionTopics";
import { canonicalBoard } from "./subjects";

export function trainerBoard(value?: string) {
  return !value || value === "all" ? "all" : canonicalBoard(value);
}

export type TrainerFilters = Record<
  | "area"
  | "topic"
  | "contest"
  | "board"
  | "career"
  | "year"
  | "appliedExam"
  | "subject"
  | "source"
  | "reviewed"
  | "difficulty"
  | "state"
  | "category",
  string
>;

// An empty combination stays empty: selecting a board must never fall back to another.
export function filterTrainerQuestions(
  catalog: Question[],
  filters: TrainerFilters,
  topics: ReadonlyMap<string, string | null>,
) {
  const f = filters;
  return catalog.filter(
    (q) =>
      (f.area === "all" || subjectInArea(f.area, q.subject)) &&
      (f.topic === "all" || topics.get(q.id) === f.topic) &&
      (f.contest === "all" || q.contest === f.contest) &&
      (f.board === "all" || canonicalBoard(q.board) === trainerBoard(f.board)) &&
      (f.career === "all" || q.career === f.career) &&
      (f.year === "all" || q.year === f.year) &&
      (f.appliedExam === "all" || examKey(q) === f.appliedExam) &&
      (f.subject === "all" || q.subject === f.subject) &&
      (f.source === "all" || q.source === f.source) &&
      (f.reviewed === "all" || hasReviewedExplanation(q)) &&
      (f.difficulty === "all" || q.difficulty === f.difficulty) &&
      (f.state === "all" || q.state === f.state) &&
      (f.category === "all" || q.category === f.category),
  );
}
