import type { Question } from "./questionFormat";
import type { Incidence, IncidenceItem } from "./topicIncidence";
import { bestItemFor, normalizeSubjectKey, prepareItems } from "./topicIncidence";

// "Foco na prova": entre as questões do treinador, separa as que têm potencial de cair no concurso do aluno.
// Potencial = o assunto da questão corresponde a um assunto do edital que as provas da banca cobram com
// frequência (alta chance) ou a questão é de prova recente da mesma área. É tendência, não garantia.

export type ExamFocus = "off" | "alta" | "alta-media" | "recentes";

export const EXAM_FOCUS_LABEL: Record<ExamFocus, string> = {
  off: "Todas",
  alta: "Alta chance",
  "alta-media": "Alta e média chance",
  recentes: "Provas recentes",
};

/** Quantos anos, contando do exame mais novo da área, ainda valem como "recente". */
export const RECENT_YEARS = 2;

export interface Potential {
  tier: Incidence["tier"] | null;
  /** 0..4: ordena do mais provável para o menos provável. */
  score: number;
  recent: boolean;
}

const TIER_WEIGHT: Record<Incidence["tier"], number> = { alta: 3, media: 2, baixa: 1, nunca: 0, amostra: 0 };

export function examPotential(
  catalog: Question[],
  items: IncidenceItem[],
  incidence: ReadonlyMap<string, Incidence>,
  topicOf: ReadonlyMap<string, string | null>,
): Map<string, Potential> {
  const prepared = prepareItems(items);
  const areaSubjects = new Set(prepared.flatMap((p) => [...p.subjects]));
  const inArea = (q: Question) => areaSubjects.has(normalizeSubjectKey(q.subject));
  const years = catalog.filter(inArea).map((q) => Number(q.year)).filter((y) => Number.isFinite(y) && y > 1990);
  const newest = years.length ? Math.max(...years) : 0;
  const result = new Map<string, Potential>();
  for (const q of catalog) {
    if (!inArea(q)) continue;
    const topic = q.testedTopic || q.subtopic || topicOf.get(q.id) || "";
    const itemId = topic ? bestItemFor(normalizeSubjectKey(q.subject), topic, prepared) : null;
    const found = itemId ? incidence.get(itemId) : undefined;
    const year = Number(q.year);
    const recent = newest > 0 && Number.isFinite(year) && year >= newest - RECENT_YEARS;
    const tier = found?.tier ?? null;
    const score = (tier ? TIER_WEIGHT[tier] + (found?.score ?? 0) : 0) + (recent ? 0.5 : 0);
    result.set(q.id, { tier, score, recent });
  }
  return result;
}

export function matchesExamFocus(focus: ExamFocus, potential: Potential | undefined): boolean {
  if (focus === "off") return true;
  if (!potential) return false;
  if (focus === "alta") return potential.tier === "alta";
  if (focus === "alta-media") return potential.tier === "alta" || potential.tier === "media";
  return potential.recent;
}

export function countByExamFocus(
  questions: Question[],
  potential: ReadonlyMap<string, Potential>,
): Record<ExamFocus, number> {
  const out: Record<ExamFocus, number> = { off: questions.length, alta: 0, "alta-media": 0, recentes: 0 };
  for (const q of questions) {
    const p = potential.get(q.id);
    if (matchesExamFocus("alta", p)) out.alta++;
    if (matchesExamFocus("alta-media", p)) out["alta-media"]++;
    if (matchesExamFocus("recentes", p)) out.recentes++;
  }
  return out;
}

/** Mais prováveis primeiro; dentro do mesmo grau, a ordem recebida (já embaralhada) é mantida. */
export function prioritizeByPotential<T extends { id: string }>(
  questions: T[],
  potential: ReadonlyMap<string, Potential>,
): T[] {
  return questions
    .map((q, index) => ({ q, index, score: potential.get(q.id)?.score ?? 0 }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.q);
}
