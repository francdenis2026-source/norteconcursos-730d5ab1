import { navigationKey, type NavigationTarget } from './dashboardNavigation';

type SearchTarget = NavigationTarget & { label: string; group: string; soon?: boolean };
const DETAILS: Record<string, { description: string; terms: string }> = {
  '/dashboard': { description: 'Retome sua preparação e acompanhe suas prioridades.', terms: 'inicio painel resumo home' },
  '/dashboard/study-coach': { description: 'Organize suas prioridades e próximos passos.', terms: 'estrategia orientacao estudar planejamento' },
  '/dashboard/cronograma': { description: 'Distribua o conteúdo do edital na sua rotina.', terms: 'agenda calendario horario cronograma' },
  '/dashboard/study-plan': { description: 'Acompanhe metas e ajuste seu plano de estudos.', terms: 'metas planejamento resultados' },
  '/dashboard/my-contest': { description: 'Defina o concurso que orienta sua preparação.', terms: 'objetivo cargo concurso alvo' },
  '/dashboard/edital': { description: 'Consulte as disciplinas e tópicos do seu edital.', terms: 'conteudo programatico materias edital' },
  '/dashboard/library': { description: 'Consulte legislação, súmulas e material de apoio.', terms: 'lei leis seca sumula sumulas legislacao biblioteca direito' },
  '/dashboard/leis': { description: 'Estude a legislação complementar do seu concurso.', terms: 'lei leis seca extravagante legislacao direito' },
  '/dashboard/disciplinas': { description: 'Encontre conteúdos por disciplina.', terms: 'materias assuntos disciplinas trilhas' },
  '/dashboard/media': { description: 'Aprenda com aulas em vídeo e áudio.', terms: 'video videos aula aulas podcast podcasts audio' },
  '/dashboard/question-trainer': { description: 'Pratique questões e aprenda com as respostas.', terms: 'treinar treino praticar exercicio exercicios questao questoes' },
  '/dashboard/errors': { description: 'Revise questões que precisam de mais atenção.', terms: 'revisar revisao erros erradas corrigir caderno' },
  '/dashboard/flashcards': { description: 'Reforce a memória com cartões de revisão.', terms: 'cartao cartoes memorizar memoria revisao revisar' },
  '/dashboard/mock-exams': { description: 'Treine com tempo e ritmo de prova.', terms: 'simulado simulados simulacao simular prova provas' },
  '/dashboard/student-exams': { description: 'Consulte suas provas e o diagnóstico dos resultados.', terms: 'diagnostico provas gabarito resultado' },
  '/dashboard/performance': { description: 'Entenda seus resultados e sua evolução.', terms: 'estatistica estatisticas desempenho evolucao acertos progresso' },
  '/dashboard/study-tools': { description: 'Organize sessões de foco e revisão.', terms: 'pomodoro timer foco revisar revisao ferramentas' },
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
    const text = normalizeNavigationText(`${item.label} ${item.group} ${details.description} ${details.terms}`);
    return terms.every(term => text.includes(term));
  }).sort((a, b) => {
    const exact = (item: T) => normalizeNavigationText(item.label).startsWith(normalizeNavigationText(query)) ? 1 : 0;
    return Number(!!a.soon) - Number(!!b.soon) || (terms.length ? exact(b) - exact(a) : 0);
  });
}
export function recentNavigation<T extends SearchTarget>(items: T[], keys: string[]) {
  return [...new Set(keys)].map(key => items.find(item => navigationKey(item) === key && !item.soon)).filter((item): item is T => !!item).slice(0, 3);
}
