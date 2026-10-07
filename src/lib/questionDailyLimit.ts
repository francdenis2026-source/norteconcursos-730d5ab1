/** Limite diário de questões do Treinador, por plano (plano Gratuito: 10/dia). */
import type { SubscriptionTier } from "@/types";
import { checkFeatureAccess } from "@/lib/subscriptions.config";
import { acreDayStartISO } from "@/lib/acreTime";
import { supabase } from "@/integrations/supabase/client";

export function getDailyQuestionLimit(
  tier: SubscriptionTier,
  isAdmin = false,
): number | "unlimited" {
  if (isAdmin) return "unlimited";
  const f = checkFeatureAccess(tier, "questions");
  return f.included ? (f.limit ?? 0) : 0;
}

/** Questões respondidas hoje (dia do Acre) pelo aluno, contadas no servidor. */
export async function fetchQuestionsAnsweredToday(userId: string): Promise<number> {
  const { count } = await supabase
    .from("question_training_responses")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", acreDayStartISO());
  return count ?? 0;
}
