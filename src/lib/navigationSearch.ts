import { studentGroupLabel } from './studentNavigation';
import { navigationKey, type NavigationTarget } from './dashboardNavigation';

type SearchTarget = NavigationTarget & { label: string; group: string; soon?: boolean };
const DETAILS: Record<string, { description: string; terms: string }> = {
  '/dashboard': { description: 'Retome sua preparação e acompanhe suas prioridades.', terms: 'inicio painel resumo home' },
  '/dashboard/study-coach': { description: 'Configure a disponibilidade e a distribuição da semana.', terms: 'estrategia de estudos orientacao estudar planejamento configuracao rotina' },
  '/dashboard/cronograma': { description: 'Distribua o conteúdo do edital na sua rotina.', terms: 'agenda calendario horario cronograma' },
  '/dashboard/study-plan': { description: 'Acompanhe metas e ajuste seu plano de estudos.', terms: 'metas planejamento resultados ajustes diagnostico plano por resultados' },
  '/dashboard/my-contest': { description: 'Defina o concurso que orienta sua preparação.', terms: 'objetivo cargo concurso alvo' },
  '/dashboard/edital': { description: 'Consulte as disciplinas e tópicos do seu edital.', terms: 'conteudo programatico materias edital' },
  '/dashboard/library': { description: 'Consulte legislação, súmulas e material de apoio.', terms: 'lei leis seca sumula sumulas legislacao biblioteca direito' },
  '/dashboard/leis': { description: 'Estude a legislação complementar do seu concurso.', terms: 'lei leis seca extravagante extravagantes especiais legislacao direito' },
  '/dashboard/disciplinas': { description: 'Encontre conteúdos por disciplina.', terms: 'materias assuntos disciplinas trilhas' },
  '/dashboard/media': { description: 'Aprenda com aulas em vídeo e áudio.', terms: 'video videos aula aulas podcast podcasts audio' },
  '/dashboard/question-trainer': { description: 'Pratique questões e aprenda com as respostas.', terms: 'treinar treino praticar exercicio exercicios questao questoes' },
  '/dashboard/errors': { description: 'Revise questões que precisam de mais atenção.', terms: 'revisar revisao erros erradas corrigir caderno automatico' },
  '/dashboard/flashcards': { description: 'Reforce a memória com cartões de revisão.', terms: 'cartao cartoes memorizar memoria revisao revisar' },
  '/dashboard/mock-exams': { description: 'Treine com tempo e ritmo de prova.', terms: 'simulado simulados simulacao simular prova provas' },
  '/dashboard/student-exams': { description: 'Registre provas de concursos realizados e consulte o diagnóstico.', terms: 'minhas provas e diagnostico gabarito resultado concursos realizados' },
  '/dashboard/performance': { description: 'Entenda seus resultados e sua evolução.', terms: 'estatistica estatisticas desempenho evolucao acertos progresso' },
  '/dashboard/study-tools': { description: 'Organize sessões de foco e revisão.', terms: 'pomodoro timer foco revisar revisao ferramentas' },
  '/dashboard/notebooks': { description: 'Organize manualmente suas questões em cadernos e coleções.', terms: 'meus cadernos favoritas favoritos colecoes' },
  '/dashboard/question-bank': { description: 'Explore o acervo e abra o Treinador com filtros.', terms: 'acervo banco catalogo explorar questoes' },
  '/dashboard/ctb': { description: 'Consulte o Código de Trânsito Brasileiro e as resoluções.', terms: 'ferramentas painel transito ctb multas pontos' },
  '/dashboard/calculadora-penal': { description: 'Use o recurso de cálculo associado à legislação penal.', terms: 'ferramentas calculadora pena calculo penal' },
  '/dashboard/questions': { description: 'Busque concursos e escolha seu objetivo em foco.', terms: 'concursos editais oportunidades buscar' },
  '/dashboard/profile': { description: 'Gerencie seus dados e preferências.', terms: 'conta dados senha cadastro perfil' },
  '/dashboard/subscriptions': { description: 'Consulte seu plano, uso e assinatura.', terms: 'assinatura pagamento premium plus gratuito plano' },
};
export const normalizeNavigationText = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function navigationDetails(item: SearchTarget) {
  return DETAILS[item.href] ?? { description: `Acesse ${item.label.toLocaleLowerCase('pt-BR')}.`, terms: '' };
}
export function searchNavigation<T extends SearchTarget>(items: T[], query: string, group = 'all'): T[] {
  const terms = normalizeNavigationText(query).split(/\s+/).filter(Boolean);
  return items.filter(item => {
    if (group !== 'all' && item.group !== group) return false;
    const details = navigationDetails(item);
    const text = normalizeNavigationText(`${item.label} ${item.group} ${studentGroupLabel(item.group)} ${details.description} ${details.terms}`);
    return terms.every(term => text.includes(term));
  }).sort((a, b) => {
    const exact = (item: T) => normalizeNavigationText(item.label).startsWith(normalizeNavigationText(query)) ? 1 : 0;
    return Number(!!a.soon) - Number(!!b.soon) || (terms.length ? exact(b) - exact(a) : 0);
  });
}
export function recentNavigation<T extends SearchTarget>(items: T[], keys: string[]) {
  return [...new Set(keys)].map(key => items.find(item => navigationKey(item) === key && !item.soon)).filter((item): item is T => !!item).slice(0, 3);
}
