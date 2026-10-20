// Primeira resposta do aluno a uma questão do treinador: alternativa escolhida, tempo e data.
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FirstResponse {
  selected_answer: string;
  response_seconds: number | null;
  created_at: string;
  is_correct: boolean;
}

export function useFirstResponse(
  userId: string | undefined,
  questionId: string | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["first-response", userId, questionId],
    enabled: enabled && !!userId && !!questionId,
    staleTime: 5 * 60_000,
    retry: 0,
    queryFn: async (): Promise<FirstResponse | null> => {
      const { data, error } = await supabase
        .from("question_training_responses")
        .select("selected_answer,response_seconds,created_at,is_correct")
        .eq("user_id", userId!)
        .eq("question_id", questionId!)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const seconds = Number(data.response_seconds);
      return {
        selected_answer: String(data.selected_answer),
        response_seconds: Number.isFinite(seconds) && seconds > 0 ? seconds : null,
        created_at: String(data.created_at),
        is_correct: !!data.is_correct,
      };
    },
  });
}
