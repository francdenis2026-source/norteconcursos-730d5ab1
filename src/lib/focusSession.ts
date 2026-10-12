/**
 * Sessão do modo foco: vive fora do React e no localStorage, para que o tempo de estudo sobreviva à ida
 * a Questões ou Dicionário e ao retorno. Enquanto o aluno está fora ("away"), o relógio fica parado e,
 * ao voltar, continua de onde parou; o horário exibido é sempre o real.
 */
import { idleSeconds, IDLE_PAUSE_SECONDS } from "@/lib/activity";

export type FocusSession = {
  /** Endereço (caminho e busca) da área de estudo, para voltar exatamente a ela. */
  returnTo: string;
  title: string;
  /** Segundos de estudo acumulados. */
  elapsed: number;
  /** Pausa manual do aluno. */
  paused: boolean;
  /** Aluno foi a Questões ou Dicionário: relógio parado até voltar. */
  away: boolean;
  awayAt: number;
};

const KEY = "norte_focus_session";
const AWAY_EXPIRES_MS = 30 * 60 * 1000;
const listeners = new Set<() => void>();
let session: FocusSession | null = null;

function load(): FocusSession | null {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? "null") as FocusSession | null;
    if (!s || typeof s.elapsed !== "number") return null;
    if (s.away && Date.now() - s.awayAt > AWAY_EXPIRES_MS) return null;
    return s;
  } catch {
    return null;
  }
}
function save(next: FocusSession | null) {
  session = next;
  try {
    if (next) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  } catch {
    /* storage indisponível: a sessão vale só nesta aba */
  }
  listeners.forEach((l) => l());
}
if (typeof window !== "undefined") session = load();

export const getFocusSession = () => session;
export const subscribeFocusSession = (cb: () => void) => {
  listeners.add(cb);
  return () => void listeners.delete(cb);
};

/** Começa (ou retoma, se for a mesma área) uma sessão de foco. */
export function beginFocus(returnTo: string, title: string) {
  const prev = session && !session.away ? session : null;
  if (session?.away && session.returnTo === returnTo) save({ ...session, away: false, title });
  else save({ returnTo, title, elapsed: prev?.returnTo === returnTo ? prev.elapsed : 0, paused: false, away: false, awayAt: 0 });
}
/** Um segundo de estudo: só conta com a aba visível, sem pausa e com o aluno interagindo. */
export function tickFocus() {
  if (!session || session.paused || session.away) return;
  if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
  if (idleSeconds() >= IDLE_PAUSE_SECONDS) return;
  save({ ...session, elapsed: session.elapsed + 1 });
}
export function setFocusPaused(paused: boolean) {
  if (session) save({ ...session, paused });
}
/** Aluno saiu para Questões ou Dicionário: congela o relógio. */
export function goAway(returnTo: string) {
  if (session) save({ ...session, returnTo, away: true, awayAt: Date.now() });
}
export function endFocus() {
  save(null);
}
