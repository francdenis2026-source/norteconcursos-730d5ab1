// A fresh history check is required before starting a scored session. The query
// is shared by consumers, but never assumes cached answers are still complete.
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Answer } from "@/lib/questionFormat";
import { fetchAllRows } from "@/lib/catalog";

export type LockedAnswer = { selected: Answer; isCorrect: boolean };
export const lockedKey = (source: string, id: string) => `${source}:${id}`;
type Row = {
  question_id: string;
  question_source: string;
  selected_answer: string;
  is_correct: boolean;
  created_at: string;
};
const EMPTY_LOCKED = new Map<string, LockedAnswer>();

export function useLockedAnswers(userId: string | undefined, enabled: boolean) {
  const client = useQueryClient();
  const key = ["question-locked-answers", userId];
  const result = useQuery({
    queryKey: key,
    enabled: enabled && !!userId,
    staleTime: 0,
    retry: 0,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const rows = await fetchAllRows<Row>((from, to) =>
        supabase
          .from("question_training_responses")
          .select("question_id,question_source,selected_answer,is_correct,created_at")
          .eq("user_id", userId!)
          .abortSignal(AbortSignal.timeout(20000))
          .order("created_at", { ascending: true })
          .range(from, to),
      );
      const answers = new Map<string, LockedAnswer>();
      for (const row of rows) {
        const key = lockedKey(row.question_source, row.question_id);
        if (!answers.has(key))
          answers.set(key, { selected: row.selected_answer as Answer, isCorrect: row.is_correct });
      }
      return answers;
    },
  });
  const markLocked = React.useCallback(
    (source: string, id: string, answer: LockedAnswer) => {
      client.setQueryData<Map<string, LockedAnswer>>(
        ["question-locked-answers", userId],
        (previous) => {
          const next = new Map(previous);
          next.set(lockedKey(source, id), answer);
          return next;
        },
      );
    },
    [client, userId],
  );
  return {
    locked: result.data ?? EMPTY_LOCKED,
    loading: enabled && !!userId && (result.isPending || result.isFetching),
    error: result.isError
      ? "Não foi possível conferir seu histórico de respostas. Tente novamente."
      : null,
    reload: result.refetch,
    markLocked,
  };
}
