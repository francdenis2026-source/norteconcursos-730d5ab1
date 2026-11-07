import type { SubscriptionTier } from "@/types";

/** Chaves de lançamento: mude para `true` quando o recurso estiver pronto. */
export const AI_ENABLED = false;
export const PAYMENTS_ENABLED = false;

/** Fase de testes: todas as contas usam o plano abaixo até a liberação dos planos pagos. */
export const TESTING_PHASE = true;
/** Duração real, em dias, do acesso gratuito (usada nos cálculos de data). */
export const TESTING_DAYS = 182;
/** Rótulo em texto da duração acima, para exibir nas telas (mantenha alinhado com TESTING_DAYS). */
export const TESTING_LABEL = "6 meses";
/** Durante a fase de testes a conta usa o plano Plus: tudo da plataforma, menos o que é só do Premium (análise das suas provas). */
export const TESTING_TIER: SubscriptionTier = "plus";

/**
 * Liberação geral (06/11/2026): licenças pagas foram revogadas e todas as contas — Gratuito,
 * Essencial, Plus ou Premium gravados — passam a valer como Plus grátis durante a fase de testes.
 */
export const isTestingTier = (_tier: string) => true;

/** Abertura pública da liberação geral (horário do Acre). Toda conta já existente ganha os 6 meses a partir daqui. */
export const TESTING_OPENED_AT = "2026-11-06T00:00:00-05:00";

/**
 * Fim do plano vigente para exibir o contador: sempre os 6 meses de liberação geral a partir do
 * cadastro (ou da abertura da liberação, o que for mais tarde) — ignora qualquer vencimento pago
 * gravado, já que as licenças foram revogadas enquanto a fase de testes estiver ativa.
 */
export function planEndsAt(
  createdAt: string | undefined,
  tier: string,
  expiresAt?: string | null,
): string | null {
  if (TESTING_PHASE && isTestingTier(tier) && createdAt) {
    const start = Math.max(new Date(createdAt).getTime(), new Date(TESTING_OPENED_AT).getTime());
    return new Date(start + TESTING_DAYS * 86_400_000).toISOString();
  }
  return expiresAt ?? null;
}

/**
 * Plano em vigor agora (mesma regra do app e do servidor): durante a fase de testes, toda conta
 * vale Plus (`trial: true`) pelos 6 meses de liberação geral, independente do plano gravado ou de
 * um vencimento pago anterior; passado esse prazo, volta ao Gratuito. Fora da fase de testes, usa
 * o plano e o vencimento gravados normalmente.
 */
export function effectiveTier(
  tier: string | null | undefined,
  createdAt: string | undefined,
  expiresAt: string | null | undefined,
  now = Date.now(),
): { tier: string; expiredFrom?: string; trial?: boolean } {
  const current = tier || "free";
  if (TESTING_PHASE && isTestingTier(current) && createdAt) {
    const end = planEndsAt(createdAt, current, expiresAt);
    if (end && new Date(end).getTime() > now) {
      return { tier: TESTING_TIER, trial: true };
    }
    return { tier: "free", expiredFrom: TESTING_TIER };
  }
  if (expiresAt && new Date(expiresAt).getTime() < now) {
    return { tier: "free", ...(current !== "free" ? { expiredFrom: current } : {}) };
  }
  return { tier: current };
}

export const SOON_LABEL = "Em breve";
export const TESTING_NOTICE =
  `Plataforma liberada: revogamos as licenças pagas e, durante a fase de testes, toda conta — nova ou já cadastrada — usa o plano Plus de graça por ${TESTING_LABEL}, sem cartão. Depois, sua conta segue no plano Gratuito.`;
export const PAYMENTS_NOTICE =
  "Os pagamentos estão desativados por enquanto. Em breve os planos serão ativados.";
