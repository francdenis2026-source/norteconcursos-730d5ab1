import { acreDateKey } from "./acreTime";
import { FREE_MOCK_MAX_QUESTIONS, checkFeatureAccess } from "@/lib/subscriptions.config";
import type { SubscriptionTier } from "@/types";

/** Início do mês corrente no Acre (UTC-5), em ISO, para contar os simulados do mês. */
export function acreMonthStartISO(now: Date = new Date()): string {
  return `${acreDateKey(now).slice(0, 8)}01T05:00:00.000Z`;
}

export type MockQuota =
  | { allowed: true; limit: number | null; remaining: number | null }
  | { allowed: false; reason: "limit" | "size"; limit: number | null; maxQuestions?: number };

/**
 * Regra de simulados por plano (a mesma do gatilho do servidor):
 * Gratuito 1 por mês e só curto (até FREE_MOCK_MAX_QUESTIONS), Essencial 2 por mês, Plus e Premium sem limite.
 * `used` = simulados já feitos neste mês; `questions` = tamanho do simulado que se quer começar.
 */
export function mockQuota(tier: SubscriptionTier, used: number, questions: number): MockQuota {
  const feature = checkFeatureAccess(tier, "mockExams");
  if (!feature.included) return { allowed: false, reason: "limit", limit: 0 };
  const limit = typeof feature.limit === "number" ? feature.limit : null;
  const maxQuestions = tier === "free" ? FREE_MOCK_MAX_QUESTIONS : undefined;
  if (maxQuestions !== undefined && questions > maxQuestions)
    return { allowed: false, reason: "size", limit, maxQuestions };
  if (limit !== null && used >= limit) return { allowed: false, reason: "limit", limit };
  return { allowed: true, limit, remaining: limit === null ? null : limit - used };
}

export function mockQuotaMessage(quota: MockQuota): string | null {
  if (quota.allowed) return null;
  if (quota.reason === "size")
    return `No plano Gratuito o simulado é curto: até ${quota.maxQuestions} questões. Escolha menos questões ou conheça os planos.`;
  return quota.limit
    ? `Você usou ${quota.limit === 1 ? "o simulado" : `os ${quota.limit} simulados`} do mês no seu plano. Renova no dia 1º (horário do Acre).`
    : "Simulados não fazem parte do seu plano.";
}
