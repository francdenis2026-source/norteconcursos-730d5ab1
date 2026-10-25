import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows, isMissingQuestionTable } from "@/lib/catalog";

type Identity = { question_id: string; question_source: string };
export function useUnseenActivity(userId: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ["unseen-study-activity", userId],
    enabled: enabled && !!userId,
    staleTime: 0,
    retry: 1,
    queryFn: async () => {
      const simulator = fetchAllRows<Identity>((from, to) =>
        supabase
          .from("simulator_responses")
          .select("question_id,question_source")
          .not("selected_answer", "is", null)
          .eq("user_id", userId!)
          .order("id")
          .range(from, to),
      );
      const reinforcement = fetchAllRows<Identity>((from, to) =>
        supabase
          .from("question_reinforcement_attempts")
          .select("question_id,question_source")
          .eq("user_id", userId!)
          .order("id")
          .range(from, to),
      ).catch((error) => {
        if (isMissingQuestionTable(error)) return [];
        throw error;
      });
      return new Set(
        (await Promise.all([simulator, reinforcement]))
          .flat()
          .map((row) => `${row.question_source}:${row.question_id}`),
      );
    },
  });
}
