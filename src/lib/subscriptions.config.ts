import type { SubscriptionTier } from "../types";

export interface TierFeature {
  name: string;
  included: boolean;
  limit?: number | "unlimited";
}

export interface TierPlan {
  id: SubscriptionTier;
  name: string;
  /** Preço mensal em reais. */
  price: number;
  /** Preço do plano anual (2 meses grátis). Só informativo enquanto os pagamentos estão desligados. */
  annualPrice?: number;
  description: string;
  features: Record<string, TierFeature>;
  isPopular?: boolean;
}

/** Limite diário de questões do plano Gratuito (renova à meia-noite do Acre). */
export const FREE_DAILY_QUESTIONS = 20;
/** Materiais da Biblioteca e do percurso de leis que o plano Gratuito abre por dia. */
export const FREE_DAILY_LIBRARY = 3;
/** Simulados por mês (mês do Acre) do Gratuito e do Essencial; o Gratuito faz só simulados curtos. */
export const FREE_MONTHLY_MOCKS = 1;
export const ESSENTIAL_MONTHLY_MOCKS = 2;
export const FREE_MOCK_MAX_QUESTIONS = 20;

export const SUBSCRIPTION_PLANS: TierPlan[] = [
  {
    id: "free",
    name: "Gratuito",
    price: 0,
    description: "Para quem está começando a jornada.",
    features: {
      aiSolver: { name: "Resoluções com IA", included: false },
      questions: { name: "Questões por dia", included: true, limit: FREE_DAILY_QUESTIONS },
      mockExams: { name: "Simulado curto por mês", included: true, limit: FREE_MONTHLY_MOCKS },
      performanceAnalytics: { name: "Análise básica", included: true },
      timer: { name: "Cronômetro", included: true },
      studyPlan: { name: "Plano de Estudos", included: false },
      cronograma: { name: "Cronograma por edital", included: false },
      notebooks: { name: "Cadernos de estudo", included: false },
      flashcards: { name: "Flashcards", included: false },
      library: { name: "Biblioteca e leis (por dia)", included: true, limit: FREE_DAILY_LIBRARY },
      editalRadar: { name: "Radar do edital e Panorama das provas", included: false },
      bankProfile: { name: "Perfil das bancas", included: false },
      currencyFilter: { name: "Filtro Atual: conteúdo novo e em alta", included: false },
      essays: { name: "Redação para concursos", included: false },
      examRegistration: { name: "Cadastro e análise das suas provas", included: false },
    },
  },
  {
    id: "essential",
    name: "Essencial",
    price: 24.9,
    annualPrice: 249,
    description: "Foco total em resolução de questões.",
    features: {
      aiSolver: { name: "Resoluções com IA por dia", included: true, limit: 10 },
      questions: { name: "Questões por dia", included: true, limit: 100 },
      mockExams: { name: "Simulados por mês", included: true, limit: ESSENTIAL_MONTHLY_MOCKS },
      performanceAnalytics: { name: "Análise detalhada", included: true },
      timer: { name: "Cronômetro", included: true },
      studyPlan: { name: "Plano de Estudos", included: true },
      cronograma: { name: "Cronograma por edital", included: true },
      notebooks: { name: "Cadernos de estudo", included: true },
      flashcards: { name: "Flashcards", included: true },
      library: { name: "Biblioteca e leis comentadas", included: true },
      editalRadar: { name: "Radar do edital e Panorama das provas", included: true },
      bankProfile: { name: "Perfil das bancas", included: false },
      currencyFilter: { name: "Filtro Atual: conteúdo novo e em alta", included: true },
      essays: { name: "Redação para concursos", included: true },
      examRegistration: { name: "Cadastro e análise das suas provas", included: false },
    },
  },
  {
    id: "plus",
    name: "Plus",
    price: 39.9,
    annualPrice: 399,
    description: "O melhor custo-benefício para sua aprovação.",
    isPopular: true,
    features: {
      aiSolver: { name: "Resoluções com IA por dia", included: true, limit: 30 },
      questions: { name: "Questões ilimitadas", included: true, limit: "unlimited" },
      mockExams: { name: "Simulados ilimitados", included: true, limit: "unlimited" },
      performanceAnalytics: { name: "Análise avançada", included: true },
      timer: { name: "Cronômetro", included: true },
      studyPlan: { name: "Plano de Estudos", included: true },
      cronograma: { name: "Cronograma por edital", included: true },
      notebooks: { name: "Cadernos de estudo", included: true },
      flashcards: { name: "Flashcards", included: true },
      library: { name: "Biblioteca e leis comentadas", included: true },
      editalRadar: { name: "Radar do edital e Panorama das provas", included: true },
      bankProfile: { name: "Perfil das bancas", included: true },
      currencyFilter: { name: "Filtro Atual: conteúdo novo e em alta", included: true },
      essays: { name: "Redação para concursos", included: true },
      examRegistration: { name: "Cadastro e análise das suas provas", included: false },
    },
  },
  {
    id: "premium",
    name: "Premium",
    price: 59.9,
    annualPrice: 599,
    description: "Acompanhamento completo e ferramentas exclusivas.",
    features: {
      aiSolver: { name: "Resoluções com IA por dia", included: true, limit: 100 },
      questions: { name: "Questões ilimitadas", included: true, limit: "unlimited" },
      mockExams: { name: "Simulados ilimitados", included: true, limit: "unlimited" },
      performanceAnalytics: { name: "Relatórios consolidados", included: true },
      timer: { name: "Cronômetro", included: true },
      studyPlan: { name: "Plano de Estudos", included: true },
      cronograma: { name: "Cronograma por edital", included: true },
      notebooks: { name: "Cadernos de estudo", included: true },
      flashcards: { name: "Flashcards", included: true },
      library: { name: "Biblioteca e leis comentadas", included: true },
      editalRadar: { name: "Radar do edital e Panorama das provas", included: true },
      bankProfile: { name: "Perfil das bancas", included: true },
      currencyFilter: { name: "Filtro Atual: conteúdo novo e em alta", included: true },
      essays: { name: "Redação para concursos", included: true },
      examRegistration: { name: "Cadastro e análise das suas provas", included: true },
      prioritySupport: { name: "Suporte com resposta em até 1 dia útil", included: true },
    },
  },
];

export const checkFeatureAccess = (tier: SubscriptionTier, featureKey: string): TierFeature => {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === tier) || SUBSCRIPTION_PLANS[0];
  if (!plan) return { name: "Feature", included: false };
  return plan.features[featureKey] || { name: "Feature", included: false };
};

// Cadastrar e analisar as próprias provas é do plano mais completo (Premium); admin também tem acesso.
// A regra de verdade está no banco: public.can_register_student_exams().
export const canRegisterExams = (tier: SubscriptionTier, role?: string | null): boolean =>
  role === "admin" || checkFeatureAccess(tier, "examRegistration").included;
