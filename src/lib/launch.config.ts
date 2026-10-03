import type { SubscriptionTier } from "@/types";

/** Chaves de lançamento: mude para `true` quando o recurso estiver pronto. */
export const AI_ENABLED = false;
export const PAYMENTS_ENABLED = false;

/** Fase de testes: contas gratuitas usam o plano abaixo até a liberação dos planos. */
export const TESTING_PHASE = true;
export const TESTING_TIER: SubscriptionTier = "essential";

export const SOON_LABEL = "Em breve";
export const TESTING_NOTICE =
  "Estamos em fase de testes. Durante este período, todas as contas usam o plano Essencial. Em breve os planos serão liberados.";
export const PAYMENTS_NOTICE =
  "Os pagamentos estão desativados por enquanto. Em breve os planos serão ativados.";
