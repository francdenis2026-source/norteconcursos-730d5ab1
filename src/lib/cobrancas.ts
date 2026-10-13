/** Classificação de cargos e níveis de cobrança de artigos em provas (dados em src/data/artigosCobrados.json). */

export const CARGO_GROUPS = ["PF", "PRF", "PC", "PM", "Penal", "Outros"] as const;
export type CargoGroup = (typeof CARGO_GROUPS)[number];

export const CARGO_LABEL: Record<CargoGroup, string> = {
  PF: "Polícia Federal",
  PRF: "Polícia Rodoviária Federal",
  PC: "Polícias Civis",
  PM: "Polícias Militares e Bombeiros",
  Penal: "Polícia Penal e sistema prisional",
  Outros: "Outros cargos",
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Agrupa a prova pelo tipo de carreira, a partir do nome do concurso e do cargo. */
export function cargoGroup(contest: string | null | undefined, career?: string | null): CargoGroup {
  const t = norm(`${contest ?? ""} ${career ?? ""}`);
  if (/rodoviaria federal|\bprf\b/.test(t)) return "PRF";
  if (/policia federal|\bpf\b|departamento de policia federal/.test(t)) return "PF";
  if (/policia penal|penitenciari|\bdepen\b|agente de execucao|sistema prisional/.test(t)) return "Penal";
  if (/policia civil|\bpc[- ]/.test(t)) return "PC";
  if (/policia militar|\bpm\b|bombeiro|\bpmdf\b|\bcbm/.test(t)) return "PM";
  return "Outros";
}

export type ArtStat = { n: number; r: number; p: number; g: Partial<Record<CargoGroup, number>>; c: string[] };
export type Heat = "alta" | "media" | "baixa" | null;

/** Nível de cobrança pelo total de questões que citam o artigo (poucas provas ainda: limites baixos e explicáveis ao aluno). */
export function heatOf(n: number): Heat {
  if (n >= 4) return "alta";
  if (n >= 2) return "media";
  if (n >= 1) return "baixa";
  return null;
}

export const HEAT_LABEL: Record<Exclude<Heat, null>, string> = { alta: "Muito cobrado", media: "Cobrado", baixa: "Já caiu" };

/** Soma as questões do artigo para o cargo escolhido ("all" = todos). */
export function countFor(stat: ArtStat | undefined, group: CargoGroup | "all"): number {
  if (!stat) return 0;
  return group === "all" ? stat.n : (stat.g[group] ?? 0);
}
