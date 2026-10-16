import { platformNow } from "@/lib/platformClock";
/**
 * Atividade do usuário na plataforma: mouse, teclado, rolagem ou toque. Serve para dois fins:
 * (1) parar de contar tempo de estudo quando não há ninguém interagindo e
 * (2) encerrar a sessão após 5 minutos de inatividade.
 * O instante da última interação fica no localStorage para valer entre abas do mesmo navegador.
 */
const KEY = "norte_last_activity";
export const IDLE_PAUSE_SECONDS = 120;
export const IDLE_LOGOUT_SECONDS = 300;
export const IDLE_WARNING_SECONDS = 240;

const monotonicNow = () => typeof performance === "undefined" ? Date.now() : performance.now();
let lastMonotonic = monotonicNow();
let subscribers = 0;

function stored(): number {
  try {
    const v = Number(localStorage.getItem(KEY));
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

/** Registra uma interação agora (no máximo uma gravação a cada 2 segundos). */
export function markActive(force = false) {
  const monotonic = monotonicNow();
  if (!force && monotonic - lastMonotonic < 2000) return;
  lastMonotonic = monotonic;
  const now = platformNow();
  try {
    localStorage.setItem(KEY, String(now));
  } catch {
    /* storage indisponível: vale só nesta aba */
  }
}

/** Segundos desde a última interação em qualquer aba. */
export function idleSeconds(): number {
  const local = Math.max(0, (monotonicNow() - lastMonotonic) / 1000);
  const shared = (platformNow() - stored()) / 1000;
  return Math.floor(shared >= 0 ? Math.min(local, shared) : local);
}

const EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "wheel", "touchstart", "pointerdown", "click"] as const;
const handler = () => markActive();

/** Começa a observar a atividade. Devolve a função que para a observação. */
export function startActivityTracking(): () => void {
  if (subscribers++ === 0) {
    markActive(true);
    for (const e of EVENTS) window.addEventListener(e, handler, { passive: true, capture: true });
  }
  let stopped = false;
  return () => {
    if (stopped) return;
    stopped = true;
    if (--subscribers === 0) for (const e of EVENTS) window.removeEventListener(e, handler, { capture: true });
  };
}
