// Disponibilidade de UMA prova de banca (board_exam_questions) sem baixar o acervo inteiro —
// mesma ideia do useOfficialYearQuestions, mas para provas como a IDECAN (PC SC, CBMMG, PMSC),
// que não ficam em official_exam_questions.
import { useQuery } from "@tanstack/react-query";
import { canonicalBoard, canonicalCareerName } from "@/lib/subjects";
import { supabase } from "@/integrations/supabase/client";
import { type Question } from "@/lib/questionFormat";
import { fetchAllRows, isMissingQuestionTable } from "@/lib/catalog";

const EMPTY_CATALOG: Question[] = [];

const COLUMNS = "id,contest_name,exam_year,career_name,board,item_number,content_status";

function boardRowToAvailabilityQuestion(row: Record<string, unknown>): Question {
  return {
    id: String(row["id"]),
    source: "official" as const,
    table: "board_exam_questions" as const,
    syllabusTopicId: null,
    contest: String(row["contest_name"]),
    year: String(row["exam_year"]),
    career: canonicalCareerName(String(row["career_name"])),
    board: canonicalBoard(String(row["board"] ?? "")) || "Não informada",
    subject: "",
    subtopic: null,
    text: "",
    answer: "A",
    explanation: "",
    legalBasis: [],
    checkedAt: null,
    difficulty: "média",
    state: "",
    category: "",
    itemNumber: Number(row["item_number"]) || undefined,
    testedTopic: null,
  } as Question;
}

/** Itens ATIVOS de uma prova de banca específica, para contar disponibilidade na chamada da home. */
export function useBoardYearQuestions(year: string, board: string, enabled: boolean) {
  const result = useQuery({
    queryKey: ["board-year-questions", year, board],
    enabled,
    staleTime: 5 * 60_000,
    retry: 0,
    queryFn: async ({ signal }) => {
      const rows = await fetchAllRows<Record<string, unknown>>(
        (from, to) =>
          supabase
            .from("board_exam_questions")
            .select(COLUMNS)
            .eq("content_status", "active")
            .neq("official_answer", "X")
            .eq("exam_year", Number(year))
            .eq("board", board)
            .abortSignal(AbortSignal.any([signal, AbortSignal.timeout(20000)]))
            .order("id")
            .range(from, to) as unknown as PromiseLike<{
            data: Record<string, unknown>[] | null;
            error: unknown;
          }>,
        1000,
      ).catch((error: unknown) => {
        if (isMissingQuestionTable(error)) return [];
        throw error;
      });
      return rows.map(boardRowToAvailabilityQuestion);
    },
  });
  return {
    catalog: result.data ?? EMPTY_CATALOG,
    loading: result.isPending,
    error: result.error ? "Não foi possível carregar a disponibilidade da prova." : null,
  };
}
