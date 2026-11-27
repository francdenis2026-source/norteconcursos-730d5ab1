import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";

export type PcacEditalHit = { cargos: string[]; block: string; discipline: string; item: number; text: string };

/** Procura a lei (pelo número, ex.: "13.869") no conteúdo programático do edital PC-AC 001/2026. */
export function pcacEditalMatch(title: string): PcacEditalHit | null {
  const num = title.match(/\b(\d{1,2}\.\d{3})\s*\/\s*\d{2,4}/)?.[1] ?? title.match(/\b(\d{1,2}\.\d{3})\b/)?.[1];
  if (!num) return null;
  let hit: PcacEditalHit | null = null;
  const cargos = new Set<string>();
  for (const c of pcAcVerticalCargos) {
    for (const b of c.blocks) {
      for (const d of b.disciplines) {
        (d.topics ?? []).forEach((t, i) => {
          if (!t.includes(num)) return;
          cargos.add(c.label);
          if (!hit) hit = { cargos: [], block: b.title, discipline: d.name, item: i + 1, text: t };
        });
      }
    }
  }
  if (!hit) return null;
  return { ...(hit as PcacEditalHit), cargos: [...cargos] };
}
