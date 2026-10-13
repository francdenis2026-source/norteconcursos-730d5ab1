import data from "@/data/artigosCobrados.json";
import { countFor, type ArtStat, type CargoGroup } from "@/lib/cobrancas";

type Data = { generatedAt: string; questions: number; withRef: number; laws: Record<string, Record<string, ArtStat>> };
const D = data as unknown as Data;

export const COBRANCA_UPDATED = D.generatedAt;
export const COBRANCA_QUESTIONS = D.questions;

export const cobrancaOf = (slug: string, art: string): ArtStat | undefined => D.laws[slug]?.[art];

/** Artigos de uma lei ordenados pela cobrança no cargo escolhido ("all" = todos). */
export function topArticles(slug: string, group: CargoGroup | "all", limit = 8): { art: string; n: number; stat: ArtStat }[] {
  const law = D.laws[slug] ?? {};
  return Object.entries(law)
    .map(([art, stat]) => ({ art, n: countFor(stat, group), stat }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n || b.stat.n - a.stat.n)
    .slice(0, limit);
}
