// Questões que o aluno pulou no treino e ainda estão em "Estudar depois" (reason = skipped).
// Vêm da conta (study_later_items) e, enquanto a tabela não existe, do caderno deste navegador.
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { readStudyLater } from "@/lib/studyLater";
import { isMissingStudyLaterTable } from "@/lib/studyLaterSync";

export interface SkippedQuestion {
  question_id: string;
  question_table: string;
  reviewed: boolean;
  saved_at: string;
}

type Result = { data?: unknown; error: unknown };

export function useSkippedQuestions(userId: string | undefined) {
  return useQuery({
    queryKey: ["skipped-questions", userId],
    enabled: !!userId && userId !== "demo-user",
    staleTime: 30_000,
    retry: 0,
    queryFn: async (): Promise<{ items: SkippedQuestion[]; fromAccount: boolean }> => {
      const response = (await (
        supabase.from("study_later_items" as never) as unknown as {
          select(columns: string): {
            eq(
              column: string,
              value: string,
            ): { eq(column: string, value: string): PromiseLike<Result> };
          };
        }
      )
        .select("question_id,question_table,reviewed,saved_at")
        .eq("user_id", userId!)
        .eq("reason", "skipped")) as Result;
      if (!response.error)
        return { items: (response.data as SkippedQuestion[] | null) ?? [], fromAccount: true };
      if (!isMissingStudyLaterTable(response.error)) throw response.error;
      // Sem a tabela na conta: o que este navegador guarda.
      const local = readStudyLater(localStorage, userId!);
      return {
        fromAccount: false,
        items: local
          .filter((item) => item.reason === "skipped")
          .map((item) => ({
            question_id: item.question.id,
            question_table: item.question.table ?? "",
            reviewed: item.reviewed,
            saved_at: item.savedAt,
          })),
      };
    },
  });
}

/** Puladas que seguem sem resposta no treinador (as respondidas depois deixam de contar como puladas). */
export function pendingSkipped(
  skipped: readonly SkippedQuestion[],
  answeredIds: ReadonlySet<string>,
): SkippedQuestion[] {
  return skipped.filter((item) => !item.reviewed && !answeredIds.has(item.question_id));
}
