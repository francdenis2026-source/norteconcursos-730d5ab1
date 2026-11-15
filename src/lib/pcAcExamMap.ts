import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import { INVESTIGATOR_RADAR, PCAC_IDECAN_PRIORITY } from "@/data/pcAcreIdecanRadar";
import { pcAcDisciplinePoints, type PcAcDisciplinePoints } from "@/lib/pcAcreExamWeights";
import { pcAcVerticalTopicGroups, type PcAcTopicGroup } from "@/lib/pcAcreTopicStructure";

/** Mapa da prova objetiva da PC-AC (IDECAN): blocos → disciplinas → assuntos, com questões do
 * Anexo II e destaque dos assuntos que a análise da banca aponta como mais prováveis. */

export type MapLevel = "Muito alta" | "Alta" | "Média";

export interface MapTopic extends PcAcTopicGroup {
  hot: boolean;
}

export interface MapDiscipline extends PcAcDisciplinePoints {
  level: MapLevel;
  topics: MapTopic[];
}

export interface MapBlock {
  title: string;
  questions: number;
  points: number;
  disciplines: MapDiscipline[];
}

const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

interface Hint {
  subject: string;
  level: MapLevel;
  keywords: string[];
}

function keywordsOf(text: string): string[] {
  return norm(text)
    .split(/,| e |;|\//)
    .map((k) => k.trim())
    .filter((k) => k.length >= 5);
}

const HINTS: Hint[] = [
  ...PCAC_IDECAN_PRIORITY.map((p) => ({
    subject: norm(p.subject),
    level: (p.level === "Muito alta"
      ? "Muito alta"
      : p.level === "Alta"
        ? "Alta"
        : "Média") as MapLevel,
    keywords: keywordsOf(p.reason),
  })),
  ...INVESTIGATOR_RADAR.map((p) => ({
    subject: norm(p.subject),
    level: (p.priority === "Muito alta"
      ? "Muito alta"
      : p.priority === "Média"
        ? "Média"
        : "Alta") as MapLevel,
    keywords: keywordsOf(p.topics),
  })),
];

function hintsFor(name: string): Hint[] {
  const n = norm(name);
  const stem = n
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 2);
  return HINTS.filter(
    (h) =>
      h.subject === n ||
      h.subject.includes(n) ||
      n.includes(h.subject) ||
      (stem.length > 0 && stem.every((w) => h.subject.includes(w))),
  );
}

const LEVEL_RANK: Record<MapLevel, number> = { "Muito alta": 3, Alta: 2, Média: 1 };

function levelFor(d: PcAcDisciplinePoints, hints: Hint[]): MapLevel {
  const fromHint = hints.reduce<MapLevel | null>(
    (best, h) => (!best || LEVEL_RANK[h.level] > LEVEL_RANK[best] ? h.level : best),
    null,
  );
  // Peso oficial manda: disciplina com peso 2 ou ≥10 questões nunca fica abaixo de "Alta".
  if (d.weight >= 2 || d.questions >= 10) return fromHint === "Muito alta" ? fromHint : "Alta";
  return fromHint ?? (d.questions >= 6 ? "Alta" : "Média");
}

export function buildPcAcExamMap(cargo: PcAcVerticalCargo): MapBlock[] {
  const points = pcAcDisciplinePoints(cargo);
  const byBlock = new Map<string, MapBlock>();
  for (const block of cargo.blocks) {
    for (const discipline of block.disciplines) {
      const p = points.find((row) => row.id === discipline.id);
      if (!p) continue;
      const hints = hintsFor(discipline.name);
      const keys = hints.flatMap((h) => h.keywords);
      const topics = pcAcVerticalTopicGroups(discipline).map((t) => {
        const text = norm([t.title, ...t.subtopics].join(" "));
        return { ...t, hot: keys.some((k) => text.includes(k)) };
      });
      const entry: MapDiscipline = { ...p, level: levelFor(p, hints), topics };
      const cur = byBlock.get(block.title) ?? {
        title: block.title,
        questions: 0,
        points: 0,
        disciplines: [],
      };
      cur.questions += p.questions;
      cur.points += p.points;
      cur.disciplines.push(entry);
      byBlock.set(block.title, cur);
    }
  }
  return [...byBlock.values()].map((b) => ({ ...b, questions: Math.round(b.questions) }));
}
