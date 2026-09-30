import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import {
  hasReviewedExplanation,
  isEligibleQuestion,
  parseBasis,
  type Question,
} from "@/lib/questionFormat";

type Row = Record<string, unknown>;
type Page = PromiseLike<{ data: Row[] | null; error: unknown }>;

export type QuestionStats = {
  /** Every question registered on the platform (official + authored), any status. */
  raw: number;
  /** Questions that pass the trainer's eligibility gates (active, answer key, legal validity). */
  eligible: number;
  /** Eligible questions with a didactic explanation + everyday example and verified sources. */
  reviewed: number;
  official: number;
  curated: number;
};

const OFFICIAL_COLUMNS =
  "id,subject,review_note,legal_basis,official_answer,law_version_checked_at,content_status,legal_review_required,legal_audit_completed,context_review_required";
const CURATED_COLUMNS =
  "id,subject,explanation,legal_basis,official_answer,law_version_checked_at,content_status";

const isReviewed = (row: Row, explanation: unknown) =>
  hasReviewedExplanation({
    explanation: String(explanation ?? ""),
    legalBasis: parseBasis(row["legal_basis"]),
    checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
    subject: String(row["subject"] ?? ""),
  } as Question);

async function loadStats(): Promise<QuestionStats> {
  const [official, curated] = await Promise.all([
    fetchAllRows<Row>(
      (from, to) =>
        supabase
          .from("official_exam_questions")
          .select(OFFICIAL_COLUMNS)
          .order("id")
          .range(from, to) as unknown as Page,
    ),
    fetchAllRows<Row>(
      (from, to) =>
        supabase
          .from("curated_question_catalog")
          .select(CURATED_COLUMNS)
          .order("id")
          .range(from, to) as unknown as Page,
    ),
  ]);

  const eligibleOfficial = official.filter(isEligibleQuestion);
  const eligibleCurated = curated.filter(isEligibleQuestion);

  return {
    raw: official.length + curated.length,
    eligible: eligibleOfficial.length + eligibleCurated.length,
    reviewed:
      eligibleOfficial.filter((row) => isReviewed(row, row["review_note"])).length +
      eligibleCurated.filter((row) => isReviewed(row, row["explanation"])).length,
    official: official.length,
    curated: curated.length,
  };
}

export function useQuestionStats(enabled: boolean) {
  return useQuery({
    queryKey: ["platform-question-stats"],
    queryFn: loadStats,
    enabled,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}
