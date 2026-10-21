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
