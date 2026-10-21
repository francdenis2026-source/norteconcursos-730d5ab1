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
/** Páginas de leitura (leis, materiais, trilhas): ler sem tocar na tela é normal; tolera até 15 min. */
export const IDLE_READING_LOGOUT_SECONDS = 900;

const monotonicNow = () => typeof performance === "undefined" ? Date.now() : performance.now();
let lastMonotonic = monotonicNow();
let subscribers = 0;
let playerTimer = 0;

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

/** Estado de reprodução dos players do YouTube (iframes não expõem isso sem a API de mensagens). */
const youtubePlaying = new Map<unknown, boolean>();
const isYoutubeOrigin = (origin: string) => /^https:\/\/(www\.)?youtube(-nocookie)?\.com$/.test(origin);

function onPlayerMessage(event: MessageEvent) {
  if (!isYoutubeOrigin(event.origin) || !event.source) return;
  try {
    const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
    const state = data?.event === "onStateChange" ? data.info : data?.info?.playerState;
    if (typeof state === "number") youtubePlaying.set(event.source, state === 1);
  } catch {
    /* mensagem de outra origem ou formato: ignora */
  }
}

/** Pede aos iframes do YouTube que informem play/pause (exige enablejsapi=1 na URL do embed). */
function subscribePlayers() {
  if (typeof document === "undefined") return;
  document.querySelectorAll<HTMLIFrameElement>("iframe").forEach((frame) => {
    if (!/youtube(-nocookie)?\.com/.test(frame.src)) return;
    try {
      frame.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), new URL(frame.src).origin);
    } catch {
      /* iframe ainda carregando */
    }
  });
}

/** Há algo sendo reproduzido (vídeo, podcast/áudio, leitura em voz alta, YouTube) com a aba visível ou tocando som. */
export function mediaPlaying(): boolean {
  if (typeof document === "undefined") return false;
  try {
    if (typeof speechSynthesis !== "undefined" && speechSynthesis.speaking && !speechSynthesis.paused) return true;
    for (const media of document.querySelectorAll<HTMLMediaElement>("video, audio")) {
      if (!media.paused && !media.ended && media.readyState > 2) return true;
    }
    for (const frame of document.querySelectorAll<HTMLIFrameElement>("iframe")) {
      if (frame.contentWindow && youtubePlaying.get(frame.contentWindow)) return true;
    }
  } catch {
    /* ambiente sem DOM completo */
  }
  return false;
}

/** Segundos desde a última interação em qualquer aba. Reprodução de mídia conta como atividade. */
export function idleSeconds(): number {
  if (mediaPlaying()) {
    markActive(); // mantém o marcador compartilhado fresco para as outras abas não deslogarem
    return 0;
  }
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
    window.addEventListener("message", onPlayerMessage);
    playerTimer = window.setInterval(subscribePlayers, 3000);
  }
  let stopped = false;
  return () => {
    if (stopped) return;
    stopped = true;
    if (--subscribers === 0) {
      for (const e of EVENTS) window.removeEventListener(e, handler, { capture: true });
      window.removeEventListener("message", onPlayerMessage);
      window.clearInterval(playerTimer);
    }
  };
}
