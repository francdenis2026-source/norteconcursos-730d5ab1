import type { SubscriptionTier } from "@/types";

/** Chaves de lançamento: mude para `true` quando o recurso estiver pronto. */
export const AI_ENABLED = false;
export const PAYMENTS_ENABLED = false;

/** Fase de testes: contas gratuitas usam o plano abaixo até a liberação dos planos. */
export const TESTING_PHASE = true;
/** Duração anunciada da fase de testes (só texto; o fim real é decidido ao virar TESTING_PHASE). */
export const TESTING_DAYS = 30;
export const TESTING_TIER: SubscriptionTier = "essential";

/** A fase de testes só vale para quem está no plano gratuito/Essencial; planos acima (Plus, Premium) ficam como estão. */
export const isTestingTier = (tier: string) => tier === "free" || tier === "essential";

/** Abertura pública da fase de testes (horário do Acre). Quem já tinha conta ganha os 30 dias a partir daqui. */
export const TESTING_OPENED_AT = "2026-10-03T00:00:00-05:00";

/**
 * Fim do plano vigente para exibir o contador.
 * - Plano com vencimento definido: usa o vencimento.
 * - Gratuito/Essencial na fase de testes: 30 dias após o cadastro (ou após a abertura, o que for mais tarde).
 * - Plano pago sem vencimento: sem contador.
 */
export function planEndsAt(createdAt: string | undefined, tier: string, expiresAt?: string | null): string | null {
  if (expiresAt) return expiresAt;
  if (!TESTING_PHASE || !isTestingTier(tier) || !createdAt) return null;
  const start = Math.max(new Date(createdAt).getTime(), new Date(TESTING_OPENED_AT).getTime());
  return new Date(start + TESTING_DAYS * 86_400_000).toISOString();
}

export const SOON_LABEL = "Em breve";
export const TESTING_NOTICE =
  "Plataforma aberta e gratuita por 30 dias, em fase de testes. Durante este período, todas as contas usam o plano Essencial. Em breve os planos pagos serão ativados.";
export const PAYMENTS_NOTICE =
  "Os pagamentos estão desativados por enquanto. Em breve os planos serão ativados.";
