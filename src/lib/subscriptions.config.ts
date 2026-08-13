import { SubscriptionTier } from '../types';

export interface TierFeature {
  name: string;
  included: boolean;
  limit?: number | 'unlimited';
}

export interface TierPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  description: string;
  features: Record<string, TierFeature>;
  isPopular?: boolean;
}

export const SUBSCRIPTION_PLANS: TierPlan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    description: 'Para quem está começando a jornada.',
    features: {
      questions: { name: 'Questões por dia', included: true, limit: 10 },
      mockExams: { name: 'Simulados completos', included: false },
      performanceAnalytics: { name: 'Análise básica', included: true },
      timer: { name: 'Cronômetro', included: true },
      studyPlan: { name: 'Plano de Estudos', included: false },
    }
  },
  {
    id: 'essential',
    name: 'Essencial',
    price: 19.90,
    description: 'Foco total em resolução de questões.',
    features: {
      questions: { name: 'Questões por dia', included: true, limit: 100 },
      mockExams: { name: 'Simulados completos', included: true, limit: 2 },
      performanceAnalytics: { name: 'Análise detalhada', included: true },
      timer: { name: 'Cronômetro', included: true },
      studyPlan: { name: 'Plano de Estudos', included: true },
    }
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 29.90,
    description: 'O melhor custo-benefício para sua aprovação.',
    isPopular: true,
    features: {
      questions: { name: 'Questões ilimitadas', included: true, limit: 'unlimited' },
      mockExams: { name: 'Simulados ilimitados', included: true, limit: 'unlimited' },
      performanceAnalytics: { name: 'Análise avançada', included: true },
      timer: { name: 'Cronômetro', included: true },
      studyPlan: { name: 'Plano de Estudos adaptativo', included: true },
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49.90,
    description: 'Acompanhamento completo e ferramentas exclusivas.',
    features: {
      questions: { name: 'Questões ilimitadas', included: true, limit: 'unlimited' },
      mockExams: { name: 'Simulados ilimitados', included: true, limit: 'unlimited' },
      performanceAnalytics: { name: 'Relatórios consolidados', included: true },
      timer: { name: 'Cronômetro', included: true },
      studyPlan: { name: 'Plano de Estudos personalizado', included: true },
      prioritySupport: { name: 'Suporte Prioritário', included: true },
    }
  }
];

export const checkFeatureAccess = (tier: SubscriptionTier, featureKey: string): TierFeature => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === tier) || SUBSCRIPTION_PLANS[0];
  return plan.features[featureKey] || { name: 'Feature', included: false };
};
