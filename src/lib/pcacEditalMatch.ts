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

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\bno[cç]oes de\b/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const KEY: Array<[RegExp, 0 | 1 | 2]> = [
  [/portugues|raciocinio|matematica|informatica|realidade do acre|acre/, 0],
  [/direito|legislacao|penal|constitucional|administrativo|leis/, 1],
  [/contabil|estatistic|arquivolog|tecnologia da informacao|seguranca da informacao|analise de dados|administracao|medicina legal|criminolog|gestao/, 2],
];
export const PCAC_BLOCKS = ["Conhecimentos básicos", "Conhecimentos jurídicos", "Conhecimentos específicos", "Outras disciplinas"] as const;

/** Bloco do edital PC-AC (Oficial Investigador e demais cargos) a que pertence uma disciplina; 3 = fora do edital. */
export function pcacBlockOf(name: string): 0 | 1 | 2 | 3 {
  const n = norm(name);
  const inEdital = pcAcVerticalCargos.some((c) => c.blocks.some((b) => b.disciplines.some((d) => { const dn = norm(d.name); return dn.includes(n) || n.includes(dn.split(" ").slice(0, 2).join(" ")); })));
  if (!inEdital && !/acre|informatica|portugues|raciocinio|matematica/.test(n)) return 3;
  for (const [re, b] of KEY) if (re.test(n)) return b;
  return 3;
}
