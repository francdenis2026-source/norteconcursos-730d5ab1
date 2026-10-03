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

export const SOON_LABEL = "Em breve";
export const TESTING_NOTICE =
  "Plataforma aberta e gratuita por 30 dias, em fase de testes. Durante este período, todas as contas usam o plano Essencial. Em breve os planos serão liberados.";
export const PAYMENTS_NOTICE =
  "Os pagamentos estão desativados por enquanto. Em breve os planos serão ativados.";
