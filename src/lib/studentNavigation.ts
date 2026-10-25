import type { NavigationTarget } from './dashboardNavigation';

type StudentTarget = NavigationTarget & { group: string; soon?: boolean; adminOnly?: boolean };
const SECTION_DESTINATIONS: Record<string, string> = {
  Planejamento: '/dashboard/study-coach',
  'Meu concurso': '/dashboard/my-contest',
  'Material didático': '/dashboard/material',
  Ferramentas: '/dashboard/study-tools',
  Questões: '/dashboard/question-trainer',
  Provas: '/dashboard/mock-exams',
  ENEM: '/dashboard/enem',
  Desempenho: '/dashboard/performance',
  Conta: '/dashboard/profile',
};
/** Resolve destinations against the authorized menu, never invent or expose a route. */
export function studentSections<T extends StudentTarget>(items: T[]) {
  const available = items.filter(item => !item.soon && !item.adminOnly);
  const groups = [...new Set(available.map(item => item.group))];
  return groups.flatMap(group => {
    const entries = available.filter(item => item.group === group && item.href !== '/dashboard');
    const entry = entries.find(item => item.href === SECTION_DESTINATIONS[group]) ?? entries[0];
    return entry ? [{ group, entry, entries }] : [];
  });
}

/** Internal group identifiers stay stable for artwork, permissions and saved navigation. */
export function studentGroupLabel(group: string) {
  return ({ Planejamento: 'Meu planejamento', 'Meu concurso': 'Meu objetivo', 'Material didático': 'Materiais', Questões: 'Questões e revisão' } as Record<string, string>)[group] ?? group;
}

/** Related destinations share a compact, labelled segment in the workspace navigation. */
export function studentNavigationSegment(href: string) {
  if (['/dashboard/edital-radar', '/dashboard/exam-panorama', '/dashboard/perfil-bancas', '/dashboard/inteligencia-idecan'].includes(href)) return 'Análise do concurso';
  if (['/dashboard/my-contest', '/dashboard/edital', '/dashboard/careers', '/dashboard/questions'].includes(href)) return 'Objetivo';
  if (['/dashboard/library', '/dashboard/leis', '/dashboard/ctb', '/dashboard/calculadora-penal'].includes(href)) return 'Leis e ferramentas';
  if (['/dashboard/disciplinas', '/dashboard/media', '/dashboard/dicionario', '/dashboard/essays'].includes(href)) return 'Conteúdos';
  if (['/dashboard/ranking', '/dashboard/medals'].includes(href)) return 'Conquistas';
  if (['/dashboard/performance', '/dashboard/history'].includes(href)) return 'Resultados';
  return '';
}
