import type { Question } from "./questionFormat";
import { examKey, hasReviewedExplanation } from "./questionFormat";
import { subjectInArea } from "./questionTopics";
import { canonicalBoard, canonicalSubject, canonicalCareerName } from "./subjects";
import {
  matchesQuestionContest,
  matchesQuestionCareer,
  questionContestLabel,
  questionCareerLabel,
} from "./questionFilterIdentity";
import {
  matchesTopicFilter,
  scopedTopic,
  topicLabels,
  filterTopicIdentity,
} from "./filterTaxonomy";

export function trainerBoard(value?: string) {
  return !value || value.trim().toLowerCase() === "all" ? "all" : canonicalBoard(value);
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
      matchesTopicFilter(q.subject, topics.get(q.id), f.topic) &&
      matchesQuestionContest(q.contest, f.contest) &&
      (f.board === "all" || canonicalBoard(q.board) === trainerBoard(f.board)) &&
      matchesQuestionCareer(q.career, q.contest, q.year, f.career, f.contest, f.year) &&
      (f.year === "all" || q.year === f.year) &&
      (f.appliedExam === "all" || examKey(q) === f.appliedExam) &&
      (f.subject === "all" || canonicalSubject(q.subject) === canonicalSubject(f.subject)) &&
      (f.source === "all" || q.source === f.source) &&
      (f.reviewed === "all" ||
        (f.reviewed === "reviewed"
          ? hasReviewedExplanation(q)
          : f.reviewed === "pending" && !hasReviewedExplanation(q))) &&
      (f.difficulty === "all" || q.difficulty === f.difficulty) &&
      (f.state === "all" || q.state === f.state) &&
      (f.category === "all" || q.category === f.category),
  );
}

export const TRAINER_FACET_KEYS = [
  "board",
  "subject",
  "topic",
  "contest",
  "career",
  "state",
  "category",
  "year",
  "exam",
  "source",
  "reviewed",
  "difficulty",
] as const;
export function trainerFilterFacets(
  catalog: Question[],
  filters: TrainerFilters,
  topics: ReadonlyMap<string, string | null>,
) {
  const counts = {} as Record<(typeof TRAINER_FACET_KEYS)[number], Map<string, number>>;
  const totals = {} as Record<(typeof TRAINER_FACET_KEYS)[number], number>;
  for (const key of TRAINER_FACET_KEYS) {
    const field = key === "exam" ? "appliedExam" : key;
    const rows = filterTrainerQuestions(catalog, { ...filters, [field]: "all" }, topics);
    const map = new Map<string, number>();
    const topicNames =
      key === "topic"
        ? topicLabels(
            rows
              .map((q) => (topics.get(q.id) ? scopedTopic(q.subject, topics.get(q.id)!) : ""))
              .filter(Boolean),
          )
        : [];
    const topicNamesByIdentity = new Map(
      topicNames.map((name) => [filterTopicIdentity(name), name]),
    );
    for (const q of rows) {
      const rawTopic = topics.get(q.id);
      const value =
        key === "exam"
          ? examKey(q)
          : key === "board"
            ? canonicalBoard(q.board)
            : key === "subject"
              ? canonicalSubject(q.subject)
              : key === "reviewed"
                ? hasReviewedExplanation(q)
                  ? "reviewed"
                  : "pending"
                : key === "topic"
                  ? rawTopic
                    ? (topicNamesByIdentity.get(
                        filterTopicIdentity(scopedTopic(q.subject, rawTopic)),
                      ) ?? "")
                    : ""
                  : key === "career"
                    ? questionCareerLabel(q.career, q.contest, q.year)
                    : key === "contest"
                      ? questionContestLabel(q.contest)
                      : q[key];
      if (value) map.set(value, (map.get(value) ?? 0) + 1);
    }
    // Preserve counts for older plan URLs whose topic has no discipline prefix.
    if (key === "topic" && filters.topic !== "all" && !map.has(filters.topic)) {
      map.set(
        filters.topic,
        rows.filter((q) => matchesTopicFilter(q.subject, topics.get(q.id), filters.topic)).length,
      );
    }
    counts[key] = map;
    if ((key === "contest" || key === "career") && filters[key] !== "all" && !map.has(filters[key]))
      map.set(filters[key], filterTrainerQuestions(rows, filters, topics).length);
    totals[key] = rows.length;
  }
  return { counts, totals };
}

/** Scope by exam identity, never by a shared discipline such as Portuguese. */
export function isEnemContest(contest: string) {
  const name = contest.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  return /^(?:ENEM\b|Exame Nacional do Ensino Medio\b)/i.test(name);
}
export function trainerCollectionQuestions(catalog: Question[], collection: "enem" | "contests") {
  return catalog.filter((question) => isEnemContest(question.contest) === (collection === "enem"));
}

export type TrainerPracticeMode = "new" | "wrong" | "all";
/** Filter the catalog before deriving facets, so options reflect the student's own history. */
export function trainerPracticeQuestions(
  catalog: Question[],
  mode: TrainerPracticeMode,
  answers: ReadonlyMap<string, { isCorrect: boolean }>,
  reinforcements: ReadonlyMap<string, { lastCorrect: boolean }>,
) {
  return catalog.filter(question => {
    const key = `${question.source}:${question.id}`;
    if (mode === "new") return !answers.has(key);
    if (mode === "all") return answers.has(key);
    return answers.get(key)?.isCorrect === false && !reinforcements.get(key)?.lastCorrect;
  });
}
