// Tempo que o aluno levou na 1ª resposta de uma questão do treinador (question_training_responses.response_seconds).
// Usado quando a questão é revista depois, em outra sessão ou aparelho, e o relógio local já não existe.
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useResponseSeconds(
  userId: string | undefined,
  questionId: string | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["response-seconds", userId, questionId],
    enabled: enabled && !!userId && !!questionId,
    staleTime: 5 * 60_000,
    retry: 0,
    queryFn: async (): Promise<number | null> => {
      const { data, error } = await supabase
        .from("question_training_responses")
        .select("response_seconds")
        .eq("user_id", userId!)
        .eq("question_id", questionId!)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      const seconds = Number(data?.response_seconds);
      return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
    },
  });
}
