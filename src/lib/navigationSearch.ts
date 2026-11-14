import { studentGroupLabel } from './studentNavigation';
import { navigationKey, type NavigationTarget } from './dashboardNavigation';

type SearchTarget = NavigationTarget & { label: string; group: string; soon?: boolean };
const DETAILS: Record<string, { description: string; terms: string }> = {
  '/dashboard': { description: 'Resumo da sua preparação.', terms: 'inicio painel resumo home' },
  '/dashboard/study-coach': { description: 'Disponibilidade e distribuição da semana.', terms: 'estrategia de estudos orientacao estudar planejamento configuracao rotina' },
  '/dashboard/cronograma': { description: 'Conteúdo do edital distribuído na sua rotina.', terms: 'agenda calendario horario cronograma' },
  '/dashboard/study-plan': { description: 'Metas e ajustes do plano de estudos.', terms: 'metas planejamento resultados ajustes diagnostico plano por resultados' },
  '/dashboard/my-contest': { description: 'Concurso que orienta sua preparação.', terms: 'objetivo cargo concurso alvo' },
  '/dashboard/edital': { description: 'Disciplinas e assuntos do seu edital.', terms: 'conteudo programatico materias edital' },
  '/dashboard/pc-acre-edital': { description: 'Edital verticalizado da PC-AC por cargo e assunto.', terms: 'PCAC policia civil acre edital verticalizado tópicos cargo disciplinas marcar estudado' },
  '/dashboard/library': { description: 'Legislação, súmulas e material de apoio.', terms: 'lei leis seca sumula sumulas legislacao biblioteca direito' },
  '/dashboard/leis': { description: 'Legislação complementar do concurso.', terms: 'lei leis seca extravagante extravagantes especiais legislacao direito' },
  '/dashboard/disciplinas': { description: 'Materiais organizados por disciplina.', terms: 'materias assuntos disciplinas trilhas' },
  '/dashboard/media': { description: 'Videoaulas e podcasts.', terms: 'video videos aula aulas podcast podcasts audio' },
  '/dashboard/question-trainer': { description: 'Pratique questões e aprenda com as respostas.', terms: 'treinar treino praticar exercicio exercicios questao questoes' },
  '/dashboard/errors': { description: 'Revise as questões que você errou.', terms: 'revisar revisao erros erradas corrigir caderno automatico' },
  '/dashboard/flashcards': { description: 'Cartões de revisão para fixar o conteúdo.', terms: 'cartao cartoes memorizar memoria revisao revisar' },
  '/dashboard/mock-exams': { description: 'Treino com tempo e ritmo de prova.', terms: 'simulado simulados simulacao simular prova provas' },
  '/dashboard/student-exams': { description: 'Provas realizadas e diagnóstico de resultado.', terms: 'minhas provas e diagnostico gabarito resultado concursos realizados' },
  '/dashboard/performance': { description: 'Resultados e evolução.', terms: 'estatistica estatisticas desempenho evolucao acertos progresso' },
  '/dashboard/study-room': { description: 'Conteúdo e cronômetro de foco.', terms: 'estudar sala estudos pomodoro timer foco revisar revisao ferramentas central' },
  '/dashboard/notebooks': { description: 'Suas questões em cadernos e coleções.', terms: 'meus cadernos favoritas favoritos colecoes' },
  '/dashboard/question-bank': { description: 'Acervo de questões com filtros.', terms: 'acervo banco catalogo explorar questoes' },
  '/dashboard/ctb': { description: 'Código de Trânsito Brasileiro e resoluções.', terms: 'ferramentas painel transito ctb multas pontos' },
  '/dashboard/calculadora-penal': { description: 'Cálculo de pena e prazos.', terms: 'ferramentas calculadora pena calculo penal' },
  '/dashboard/questions': { description: 'Concursos, editais e objetivo em foco.', terms: 'concursos editais oportunidades buscar catálogo objetivo' },
  '/dashboard/material': { description: 'Disciplinas, guias, leis e ferramentas.', terms: 'materiais disciplinas central estudos guias' },
  '/dashboard/dicionario': { description: 'Termos técnicos e jurídicos explicados.', terms: 'dicionario glossario termos significado' },
  '/dashboard/essays': { description: 'Redação e discursivas de provas.', terms: 'redacao discursiva texto correcao' },
  '/dashboard/ai-solver': { description: 'Resolução de questões passo a passo.', terms: 'ia inteligencia artificial resolver resolucao' },
  '/dashboard/history': { description: 'Simulados e questões respondidas.', terms: 'historico atividades estudos registro' },
  '/dashboard/ranking': { description: 'Sua pontuação entre os estudantes.', terms: 'ranking classificacao pontos posicao' },
  '/dashboard/medals': { description: 'Conquistas por constância e desempenho.', terms: 'medalhas conquistas insignias' },
  '/dashboard/enem': { description: 'Questões e simulados do ENEM.', terms: 'enem vestibular' },
  '/dashboard/profile': { description: 'Dados e preferências.', terms: 'conta dados senha cadastro perfil' },
  '/dashboard/subscriptions': { description: 'Plano, uso e assinatura.', terms: 'assinatura pagamento premium plus gratuito plano' },
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
