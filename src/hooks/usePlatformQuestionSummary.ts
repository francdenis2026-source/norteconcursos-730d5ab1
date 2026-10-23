import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { parsePlatformQuestionSummary } from "@/lib/platformQuestionSummary";

/** Same RPC, query cache and refresh policy for the homepage and every global dashboard counter. */
export function usePlatformQuestionSummary(enabled = true) {
  return useQuery({
    queryKey: ["public-question-summary"],
    enabled,
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: 1,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_question_summary");
      if (error) throw error;
      return parsePlatformQuestionSummary(data);
    },
  });
}
