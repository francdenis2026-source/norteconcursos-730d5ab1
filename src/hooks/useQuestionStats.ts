import { canonicalBoard, canonicalSubject } from "@/lib/subjects";
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
  /** Por disciplina (nome canônico): total cadastrado, disponíveis no treino, revisadas, oficiais e autorais. */
  bySubject: { subject: string; total: number; eligible: number; reviewed: number; official: number; curated: number }[];
  /** Questões por banca organizadora. */
  byBoard: { board: string; total: number; official: number; curated: number }[];
};

const OFFICIAL_COLUMNS =
  "id,subject,exam_board,review_note,legal_basis,official_answer,law_version_checked_at,content_status,legal_review_required,legal_audit_completed,context_review_required";
const BOARD_COLUMNS =
  "id,subject,board,explanation,legal_basis,official_answer,law_version_checked_at,content_status,legal_review_required,needs_visual";
const CURATED_COLUMNS =
  "id,subject,exam_board,explanation,legal_basis,official_answer,law_version_checked_at,content_status";

const isReviewed = (row: Row, explanation: unknown) =>
  hasReviewedExplanation({
    explanation: String(explanation ?? ""),
    legalBasis: parseBasis(row["legal_basis"]),
    checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
    subject: canonicalSubject(String(row["subject"] ?? "")),
  } as Question);

async function loadStats(): Promise<QuestionStats> {
  const [official, curated, boardRaw] = await Promise.all([
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
    fetchAllRows<Row>(
      (from, to) =>
        supabase
          .from("board_exam_questions")
          .select(BOARD_COLUMNS)
          .order("id")
          .range(from, to) as unknown as Page,
    ).catch(() => [] as Row[]), // tabela ainda não criada
  ]);

  // Provas de bancas (FGV etc.): contam como oficiais; "needs_visual" equivale a revisão de contexto pendente.
  const board = boardRaw.map((r) => ({
    ...r,
    exam_board: r["board"],
    context_review_required: r["needs_visual"],
    legal_audit_completed: !r["legal_review_required"] || !!r["law_version_checked_at"],
  }));
  const subjects = new Map<string, QuestionStats["bySubject"][number]>();
  const boards = new Map<string, QuestionStats["byBoard"][number]>();
  let eligible = 0;
  let reviewed = 0;
  const add = (rows: Row[], kind: "official" | "curated") => {
    for (const row of rows) {
      const name = canonicalSubject(String(row["subject"] ?? "")) || "Sem disciplina";
      const board = canonicalBoard(String(row["exam_board"] ?? "")) || "NÃO INFORMADA";
      const s = subjects.get(name) ?? { subject: name, total: 0, eligible: 0, reviewed: 0, official: 0, curated: 0 };
      const bd = boards.get(board) ?? { board, total: 0, official: 0, curated: 0 };
      s.total++; s[kind]++; bd.total++; bd[kind]++;
      if (isEligibleQuestion(row)) {
        s.eligible++; eligible++;
        if (isReviewed(row, row[kind === "official" ? "review_note" : "explanation"])) { s.reviewed++; reviewed++; }
      }
      subjects.set(name, s);
      boards.set(board, bd);
    }
  };
  add(official, "official");
  add(board, "official");
  add(curated, "curated");

  return {
    raw: official.length + board.length + curated.length,
    eligible,
    reviewed,
    official: official.length + board.length,
    curated: curated.length,
    bySubject: [...subjects.values()].sort((x, y) => y.total - x.total),
    byBoard: [...boards.values()].sort((x, y) => y.total - x.total),
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
