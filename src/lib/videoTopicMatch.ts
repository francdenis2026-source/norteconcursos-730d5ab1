import { topicStems } from "./topicIncidence";

export const GENERAL_TOPIC = "Revisões e aulas gerais";

/** Quanto do assunto pedido aparece no texto candidato (0..1) e quantos radicais coincidem. */
function overlap(wanted: string, candidate: string) {
  const w = new Set(topicStems(wanted));
  const c = new Set(topicStems(candidate));
  if (!w.size || !c.size) return { shared: 0, score: 0 };
  let shared = 0;
  for (const stem of c) if (w.has(stem)) shared++;
  return { shared, score: shared / Math.min(w.size, c.size) };
}

export function topicMatchScore(wanted: string, candidate: string): number {
  const { shared, score } = overlap(wanted, candidate);
  return shared >= 2 || (shared >= 1 && score >= 0.6) ? score + shared * 0.01 : 0;
}

/**
 * Qual videoaula melhor atende ao assunto pedido (ex.: um assunto do cronograma).
 * Só conta correspondência real com o assunto ou o título; sem ela, devolve nulo
 * (quem chamou decide mostrar as aulas gerais da matéria, nunca um vídeo de outro assunto).
 */
export function bestTopicMatch<T extends { topic?: string | undefined; title: string }>(
  wanted: string,
  entries: T[],
): { entry: T; topic: string; score: number } | null {
  let best: { entry: T; topic: string; score: number } | null = null;
  for (const entry of entries) {
    const topic = entry.topic || "";
    if (!topic || topic === GENERAL_TOPIC) continue;
    const score = Math.max(topicMatchScore(wanted, topic), topicMatchScore(wanted, entry.title) * 0.95);
    if (score > 0 && (!best || score > best.score)) best = { entry, topic, score };
  }
  return best;
}
