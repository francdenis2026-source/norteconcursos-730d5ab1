// Read the same first-answer history in the trainer, simulator and error notebook.
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Question } from "@/lib/questionFormat";
import { fetchAllRows } from "@/lib/catalog";
import { answerHistory, isMissingIdentitySchema, type AnswerHistoryRow, type PreviousAnswer } from "@/lib/answerHistory";

export type LockedAnswer = PreviousAnswer;
// Kept for the existing reinforcement history until its source metadata is migrated.
export const lockedKey = (source: string, id: string) => `${source}:${id}`;
const EMPTY_CATALOG: Question[] = [];

export function useLockedAnswers(userId: string | undefined, enabled: boolean, catalog: Pick<Question, "id" | "source" | "table">[] = EMPTY_CATALOG) {
  const client = useQueryClient();
  const key = ["question-locked-answers", userId];
  const result = useQuery({
    queryKey: key,
    enabled: enabled && !!userId,
    staleTime: 0,
    retry: 0,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { error: probeError } = await supabase.rpc("get_question_first_answers" as never).range(0, 0);
      if (!probeError) {
        const rows = await fetchAllRows<AnswerHistoryRow>((from, to) =>
          supabase.rpc("get_question_first_answers" as never)
            .order("answered_at").order("question_table").order("question_id")
            .range(from, to) as unknown as PromiseLike<{ data: AnswerHistoryRow[] | null; error: unknown }>,
        );
        return { rows, identityReady: true };
      }
      if (!isMissingIdentitySchema(probeError)) throw probeError;
      // Compatibility before the migration: both modalities, no invented table identities.
      const rows = await Promise.all([
        fetchAllRows<AnswerHistoryRow>((from, to) => supabase.from("question_training_responses")
          .select("question_id,question_source,selected_answer,is_correct,created_at")
          .eq("user_id", userId!).order("created_at").order("id").range(from, to)),
        fetchAllRows<AnswerHistoryRow>((from, to) => supabase.from("simulator_responses")
          .select("question_id,question_source,selected_answer,is_correct,created_at")
          .eq("user_id", userId!).not("selected_answer", "is", null)
          .order("created_at").order("id").range(from, to)),
      ]);
      return { rows: rows.flat(), identityReady: false };
    },
  });
  const locked = React.useMemo(() => answerHistory(result.data?.rows ?? [], catalog), [result.data, catalog]);
  const markLocked = React.useCallback((question: Pick<Question, "id" | "source" | "table">, answer: LockedAnswer) => {
    client.setQueryData<{ rows: AnswerHistoryRow[]; identityReady: boolean }>(["question-locked-answers", userId], previous => previous && ({
      ...previous,
      rows: [...previous.rows, { question_id: question.id, question_source: question.source, question_table: question.table ?? null,
        selected_answer: answer.selected, is_correct: answer.isCorrect, created_at: new Date().toISOString() }],
    }));
  }, [client, userId]);
  return {
    locked,
    identityReady: result.data?.identityReady ?? false,
    loading: enabled && !!userId && (result.isPending || result.isFetching),
    error: result.isError ? "Não foi possível conferir seu histórico de respostas. Tente novamente." : null,
    reload: result.refetch,
    markLocked,
  };
}
