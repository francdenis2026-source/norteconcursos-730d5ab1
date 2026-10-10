/**
 * Cronômetro da sala de estudo: foco e pausa de acordo com o tempo programado para o bloco.
 *  - até 30 min: um foco só, sem pausa;
 *  - acima disso: focos de 25 min com pausa de 5 (a cada 4 focos, pausa de 15), até somar o tempo do bloco.
 * O tempo de pausa NÃO conta como estudo.
 */
export interface Segment {
  type: "focus" | "break";
  ms: number;
}

const MIN = 60_000;

export function makeSegments(plannedMinutes: number): Segment[] {
  const total = Math.max(1, Math.round(plannedMinutes));
  if (total <= 30) return [{ type: "focus", ms: total * MIN }];
  const out: Segment[] = [];
  let remaining = total;
  let focusCount = 0;
  while (remaining > 0) {
    // Evita sobrar um foco minúsculo no fim: se restam até 35 min, fecha num foco só.
    const f = remaining <= 35 ? remaining : 25;
    out.push({ type: "focus", ms: f * MIN });
    remaining -= f;
    focusCount += 1;
    if (remaining > 0) out.push({ type: "break", ms: (focusCount % 4 === 0 ? 15 : 5) * MIN });
  }
  return out;
}

export interface TimerState {
  seg: number;
  /** Tempo que falta no segmento atual quando parado. */
  remainingMs: number;
  /** Tempo de FOCO acumulado (sem pausas). */
  studiedMs: number;
  running: boolean;
  /** Instante (epoch ms) em que o segmento atual termina, se estiver rodando. */
  endAt: number | null;
  /** Último instante processado, para somar o foco com precisão. */
  lastTick: number | null;
  finished: boolean;
}

export const initialState = (segments: Segment[]): TimerState => ({
  seg: 0,
  remainingMs: segments[0]?.ms ?? 0,
  studiedMs: 0,
  running: false,
  endAt: null,
  lastTick: null,
  finished: false,
});

/** Avança o relógio até `now`: soma foco, troca de segmento e informa se mudou de fase. */
export function advance(
  state: TimerState,
  segments: Segment[],
  now: number,
): { state: TimerState; changed: boolean } {
  if (!state.running || state.endAt === null || state.finished) return { state, changed: false };
  let s = { ...state };
  let changed = false;
  let cursor = s.lastTick ?? now;
  // Pode atravessar mais de um segmento se a aba ficou em segundo plano.
  for (let guard = 0; guard < 50 && s.running && s.endAt !== null; guard++) {
    const seg = segments[s.seg];
    if (!seg) break;
    const until = Math.min(now, s.endAt);
    if (seg.type === "focus") s.studiedMs += Math.max(0, until - cursor);
    cursor = until;
    if (now < s.endAt) break;
    // Segmento terminou.
    changed = true;
    if (s.seg + 1 >= segments.length) {
      s = { ...s, running: false, endAt: null, remainingMs: 0, finished: true };
      break;
    }
    const nextSeg = segments[s.seg + 1]!;
    s = { ...s, seg: s.seg + 1, remainingMs: nextSeg.ms, endAt: s.endAt + nextSeg.ms };
  }
  return {
    state: {
      ...s,
      lastTick: now,
      remainingMs: s.endAt !== null ? Math.max(0, s.endAt - now) : s.remainingMs,
    },
    changed,
  };
}

export const start = (s: TimerState, now: number): TimerState => ({
  ...s,
  running: true,
  endAt: now + s.remainingMs,
  lastTick: now,
});

export function pause(s: TimerState, segments: Segment[], now: number): TimerState {
  const { state } = advance(s, segments, now);
  return { ...state, running: false, endAt: null, lastTick: null };
}

/** Pula para a próxima fase (por exemplo, encerrar a pausa antes da hora). */
export function skip(s: TimerState, segments: Segment[], now: number): TimerState {
  if (s.finished) return s;
  const cur = advance(s, segments, now).state;
  if (cur.seg + 1 >= segments.length)
    return { ...cur, running: false, endAt: null, lastTick: null, remainingMs: 0, finished: true };
  const next = segments[cur.seg + 1]!;
  return {
    ...cur,
    seg: cur.seg + 1,
    remainingMs: next.ms,
    endAt: cur.running ? now + next.ms : null,
    lastTick: cur.running ? now : null,
  };
}

export const fmtClock = (ms: number) => {
  const t = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

/** Verificação rápida: node --experimental-strip-types src/lib/studyTimer.ts */
export function selfCheck() {
  const a = makeSegments(25);
  const b = makeSegments(60);
  const c = makeSegments(120);
  const focusSum = (s: Segment[]) =>
    s.filter((x) => x.type === "focus").reduce((n, x) => n + x.ms, 0) / MIN;
  console.assert(a.length === 1 && focusSum(a) === 25, "25 min = um foco");
  console.assert(
    focusSum(b) === 60 && b.some((x) => x.type === "break"),
    "60 min = 60 de foco com pausa",
  );
  console.assert(focusSum(c) === 120, "120 min = 120 de foco");
  // avança 30 min: o foco de 25 acaba, 5 de pausa, sem somar a pausa
  let s = start(initialState(b), 0);
  s = advance(s, b, 30 * MIN).state;
  console.assert(s.seg >= 1 && Math.round(s.studiedMs / MIN) === 25, "só o foco conta como estudo");
  return b.map((x) => `${x.type[0]}${x.ms / MIN}`).join(" ");
}
