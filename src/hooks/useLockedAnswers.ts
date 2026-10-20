// A fresh history check is required before starting a scored session. The query
// is shared by consumers, but never assumes cached answers are still complete.
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Answer } from "@/lib/questionFormat";
import { fetchAllRows } from "@/lib/catalog";

export type LockedAnswer = {
  selected: Answer;
  isCorrect: boolean;
  /** Onde a 1ª resposta foi dada; ausente em respostas recém-gravadas nesta sessão. */
  origin?: "trainer" | "simulator";
};
export const lockedKey = (source: string, id: string) => `${source}:${id}`;
type Row = {
  question_id: string;
  question_source: string;
  selected_answer: string;
  is_correct: boolean;
  created_at: string;
};
type SimulatorRow = {
  question_id: string;
  question_source: string;
  selected_answer: string | null;
  is_correct: boolean | null;
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
      // Respostas dadas em simulados também são tentativas: a 1ª resposta de qualquer modalidade é a que vale.
      const simulated = await fetchAllRows<SimulatorRow>((from, to) =>
        supabase
          .from("simulator_responses")
          .select("question_id,question_source,selected_answer,is_correct,created_at")
          .eq("user_id", userId!)
          .not("selected_answer", "is", null)
          .abortSignal(AbortSignal.timeout(20000))
          .order("created_at", { ascending: true })
          .range(from, to),
      );
      const attempts = [
        ...rows.map((row) => ({
          at: row.created_at,
          source: row.question_source,
          id: row.question_id,
          selected: row.selected_answer,
          ok: row.is_correct,
          origin: "trainer" as const,
        })),
        ...simulated.map((row) => ({
          at: row.created_at,
          source: row.question_source,
          id: row.question_id,
          selected: row.selected_answer ?? "",
          ok: row.is_correct === true,
          origin: "simulator" as const,
        })),
      ].sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
      const answers = new Map<string, LockedAnswer>();
      for (const row of attempts) {
        const key = lockedKey(row.source, row.id);
        if (!row.selected || answers.has(key)) continue;
        answers.set(key, {
          selected: row.selected as Answer,
          isCorrect: row.ok,
          origin: row.origin,
        });
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
