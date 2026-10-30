import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { canonicalBoard, canonicalCareerName, canonicalSubject } from "@/lib/subjects";
import { isEligibleQuestion, normalizeDifficulty, parseBasis, type Question } from "@/lib/questionFormat";

/**
 * Lightweight, read-only catalog for browsing filters.
 * Full stems, choices, and explanations are fetched by the trainer only after navigation.
 * Published counts here are a preview: duplicate/text-support eligibility is finalized by the trainer.
 */
const EMPTY: Question[] = [];
const metadataFields = {
  official_exam_questions: "id,contest_name,exam_year,career_name,exam_board,subject,official_answer,legal_basis,law_version_checked_at,content_status,legal_review_required,legal_audit_completed,context_review_required,state,career_category,difficulty",
  curated_question_catalog: "id,contest_name,contest_year,career_name,exam_board,subject,official_answer,legal_basis,law_version_checked_at,content_status,state,career_category,difficulty,is_original",
  board_exam_questions: "id,contest_name,exam_year,career_name,board,subject,official_answer,legal_basis,law_version_checked_at,content_status,legal_review_required,needs_visual,state,career_category,difficulty",
  question_bank: "id,contest_name,contest_year,subject,official_answer,legal_basis,law_version_checked_at,content_status,state,career_category,difficulty",
} as const;

type CatalogTable = keyof typeof metadataFields;
async function loadTable(table: CatalogTable, userId: string) {
  return fetchAllRows<Record<string, unknown>>((from, to) => {
    let request = supabase.from(table).select(metadataFields[table] as string).eq("content_status", "active");
    if (table === "question_bank") request = request.eq("user_id", userId);
    return request.order("id").range(from, to) as unknown as PromiseLike<{
      data: Record<string, unknown>[] | null;
      error: unknown;
    }>;
  }, 1000);
}

function toQuestion(table: CatalogTable, row: Record<string, unknown>): Question | null {
  const normalized = {
    ...row,
    context_review_required: table === "board_exam_questions"
      ? row["needs_visual"]
      : row["context_review_required"],
    legal_audit_completed: table === "board_exam_questions"
      ? (!row["legal_review_required"] || !!row["law_version_checked_at"])
      : row["legal_audit_completed"],
  };
  if (!isEligibleQuestion(normalized)) return null;
  const personal = table === "question_bank";
  const boardSource = table === "board_exam_questions";
  return {
    id: String(row["id"]),
    table,
    source: personal ? "personal" : table === "curated_question_catalog" ? "curated" : "official",
    contest: String(row["contest_name"] ?? ""),
    year: String(row[boardSource || table === "official_exam_questions" ? "exam_year" : "contest_year"] ?? ""),
    career: personal ? "Meu caderno" : canonicalCareerName(String(row["career_name"] ?? "Carreira policial")),
    board: personal ? "Meu caderno" : canonicalBoard(String(row[boardSource ? "board" : "exam_board"] ?? "")) || "Não informada",
    subject: canonicalSubject(String(row["subject"] ?? "")),
    subtopic: null,
    text: "",
    answer: String(row["official_answer"]) as Question["answer"],
    explanation: "",
    legalBasis: parseBasis(row["legal_basis"]),
    checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
    difficulty: normalizeDifficulty(row["difficulty"]),
    state: String(row["state"] ?? ""),
    category: String(row["career_category"] ?? ""),
    ...(table === "curated_question_catalog" ? { isOriginal: row["is_original"] === true } : {}),
  };
}

export function useQuestionCatalogMetadata(userId: string | undefined, enabled: boolean) {
  const result = useQuery({
    queryKey: ["question-catalog-metadata", userId],
    enabled: enabled && !!userId,
    staleTime: 15 * 60_000,
    retry: 0,
    queryFn: async () => {
      const tables = ["official_exam_questions", "curated_question_catalog", "board_exam_questions", "question_bank"] as const;
      const result = await Promise.all(
        tables.map(async (table) => ({ table, rows: await loadTable(table, userId!) })),
      );
      return result.flatMap(({ table, rows }) =>
        rows.map((row) => toQuestion(table, row)).filter((question): question is Question => question !== null),
      );
    },
  });
  return {
    catalog: result.data ?? EMPTY,
    loading: result.isPending,
    error: result.error ? "Não foi possível carregar os filtros do acervo." : null,
    reload: result.refetch,
  };
}
