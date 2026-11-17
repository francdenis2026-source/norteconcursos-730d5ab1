/**
 * Linha do tempo "de agora" para o widget flutuante do cronograma: junta os blocos de
 * hoje com a sobra de ontem que atravessa a meia-noite, intercala intervalos e localiza
 * o bloco atual a partir do minuto do dia (Acre). Funções puras, sem rede nem relógio,
 * para reusar a mesma lógica que já corrigiu o bug de ordenação na virada do dia
 * (ver pcAcreMasterPlan.ts) sem reintroduzi-lo aqui.
 */
import type { WeekBlock } from "./cronograma";

export type TimelineKind = "estudo" | "intervalo";

export interface TimelineBlock {
  kind: TimelineKind;
  /** Minutos desde 00:00 de hoje, sem enrolar (pode ser negativo ou passar de 1440). */
  startMin: number;
  endMin: number;
  /** Horário exibível, já enrolado em 24h. */
  start: string;
  end: string;
  nome?: string;
  topic?: string;
}

const GAP_AS_BREAK = 5; // intervalos menores que isso não aparecem como etapa própria

/** Desenrola os horários de uma lista de blocos já em ordem (de um único dia). */
function unwrap(blocks: WeekBlock[], dayOffset = 0): TimelineBlock[] {
  let offset = dayOffset;
  let prevEnd = -Infinity;
  return blocks.map((b) => {
    let s = b.rawStart + offset;
    let e = b.rawEnd + offset;
    if (s < prevEnd) {
      offset += 1440;
      s += 1440;
      e += 1440;
    }
    prevEnd = e;
    return { kind: "estudo", startMin: s, endMin: e, start: b.start, end: b.end, nome: b.nome, topic: b.topic };
  });
}

/**
 * Linha do tempo de hoje: blocos de `today` + a parte do último bloco de `yesterday`
 * que ainda não tinha terminado quando a meia-noite chegou (ex.: plantão que vira a noite).
 * `today`/`yesterday` são os arrays de `buildWeek(...)[dia]` (pode faltar: `[]`).
 */
export function buildTodayTimeline(today: WeekBlock[], yesterday: WeekBlock[]): TimelineBlock[] {
  const carry = unwrap(yesterday)
    .map((b) => ({ ...b, startMin: b.startMin - 1440, endMin: b.endMin - 1440 }))
    .filter((b) => b.endMin > 0);
  const combined = [...carry, ...unwrap(today)].sort((a, b) => a.startMin - b.startMin);
  const out: TimelineBlock[] = [];
  for (const block of combined) {
    const prev = out.at(-1);
    if (prev && block.startMin - prev.endMin >= GAP_AS_BREAK) {
      out.push({
        kind: "intervalo",
        startMin: prev.endMin,
        endMin: block.startMin,
        start: prev.end,
        end: block.start,
      });
    }
    out.push(block);
  }
  return out;
}

export type ScheduleStatus =
  | { state: "estudando"; block: TimelineBlock; remainingMin: number; next: TimelineBlock | null }
  | { state: "intervalo"; block: TimelineBlock; remainingMin: number; next: TimelineBlock | null }
  | { state: "antes"; next: TimelineBlock }
  | { state: "concluido" }
  | { state: "vazio" };

/** Onde o aluno está agora dentro da linha do tempo de hoje, dado o minuto atual (Acre, 0…1439). */
export function locateNow(timeline: TimelineBlock[], nowMin: number): ScheduleStatus {
  if (!timeline.length) return { state: "vazio" };
  const current = timeline.find((b) => nowMin >= b.startMin && nowMin < b.endMin);
  if (current) {
    const idx = timeline.indexOf(current);
    const next = timeline.slice(idx + 1).find((b) => b.kind === "estudo") ?? null;
    return {
      state: current.kind === "estudo" ? "estudando" : "intervalo",
      block: current,
      remainingMin: Math.max(0, Math.ceil(current.endMin - nowMin)),
      next,
    };
  }
  const upcoming = timeline.find((b) => b.startMin > nowMin);
  if (upcoming) return { state: "antes", next: upcoming };
  return { state: "concluido" };
}
