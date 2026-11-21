import type { Question } from "@/lib/questionFormat";

export type Facet = { name: string; count: number };
const GENERAL = "Geral";
const topicOf = (q: Question) => (q.subtopic ?? "").trim() || GENERAL;

/** Autorais primeiro; um mesmo id aparece uma vez. */
export function mergeExercises(authored: Question[], catalog: Question[]): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const q of [...authored, ...catalog]) {
    if (seen.has(q.id)) continue;
    seen.add(q.id);
    out.push(q);
  }
  return out;
}

function facets(names: string[]): Facet[] {
  const counts = new Map<string, number>();
  for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export const exerciseDisciplines = (items: Question[]): Facet[] => facets(items.map((q) => q.subject));

export const exerciseTopics = (items: Question[], discipline: string): Facet[] =>
  facets(items.filter((q) => q.subject === discipline).map(topicOf));

/** `topic` vazio devolve toda a disciplina. */
export const filterExercises = (items: Question[], discipline: string, topic: string): Question[] =>
  items.filter((q) => q.subject === discipline && (!topic || topicOf(q) === topic));

export const hasStepByStep = (q: Question): boolean => (q.resolutionSteps?.length ?? 0) > 0;
