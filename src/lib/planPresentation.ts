import type { TierFeature } from "@/lib/subscriptions.config";
import { AI_ENABLED, TESTING_DAYS } from "@/lib/launch.config";

export const PLAN_ROWS: [string, string][] = [
  ["questions", "Questões"],
  ["mockExams", "Simulados"],
  ["aiSolver", "Resolução com IA"],
  ["studyPlan", "Plano de estudos"],
  ["performanceAnalytics", "Análise de desempenho"],
  ["examRegistration", "Análise das suas provas"],
  ["prioritySupport", "Suporte prioritário"],
  ["library", "Biblioteca e leis comentadas"],
  ["notebooks", "Cadernos de estudo"],
  ["flashcards", "Flashcards"],
  ["editalRadar", "Radar do edital e Panorama"],
  ["essays", "Redação para concursos"],
];

export function planValue(key: string, f: TierFeature | undefined): string | null {
  if (!f || !f.included) return null;
  if (key === "aiSolver" && !AI_ENABLED) return "Em breve";
  if (f.limit === "unlimited") return "Ilimitado";
  if (typeof f.limit === "number")
    return key === "questions" || key === "aiSolver" || key === "library"
      ? `${f.limit}/dia`
      : `${f.limit}`;
  return "Incluído";
}

export const FAQ: [string, string][] = [
  [
    "Como funciona o período de testes?",
    `Por ${TESTING_DAYS} dias a plataforma está aberta e gratuita: ao criar a conta você usa tudo do plano Plus (só a análise das suas provas, exclusiva do Premium, fica de fora), sem cartão e sem cobrança.`,
  ],
  [
    "O que acontece quando os 30 dias terminam?",
    "A conta volta automaticamente para o plano Gratuito, que continua disponível. Você vê um aviso e pode escolher renovar para um plano pago quando eles estiverem ativos. Nada é cobrado sem você pedir.",
  ],
  [
    "Os planos pagos já estão disponíveis?",
    "Ainda não. Eles serão ativados em breve; durante o teste os preços abaixo são apenas informativos.",
  ],
  [
    "Preciso me cadastrar para testar?",
    "Não para começar: o Desafio diário libera 10 questões oficiais por dia sem cadastro. Para salvar seu progresso, ranking e medalhas, crie a conta gratuita.",
  ],
];
