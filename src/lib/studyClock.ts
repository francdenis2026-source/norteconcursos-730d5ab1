/**
 * Relógio de tempo na plataforma. Vive FORA do React: trocar de seção, de aba do navegador ou
 * recarregar a página não zera nada. O total do dia (fuso do Acre) fica no localStorage e é
 * somado ao que o servidor já registrou; os segundos ainda não enviados também ficam guardados.
 */
import { supabase } from "@/integrations/supabase/client";
import { acreDateKey } from "@/lib/acreTime";

interface State {
  day: string;
  /** Segundos de hoje (servidor + local). */
  today: number;
  /** Segundos contados que o servidor ainda não recebeu. */
  unsent: number;
}

const BEAT_MS = 30_000;
const listeners = new Set<() => void>();
let uid = "";
let sid = "";
let timers: number[] = [];
let snapshot = 0;

const key = () => `norte_clock_v2:${uid}`;

function read(): State {
  const fresh: State = { day: acreDateKey(), today: 0, unsent: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(key()) ?? "null") as State | null;
    if (!saved) return fresh;
    // Virou o dia (meia-noite do Acre): zera o total do dia, mas não perde o que falta enviar.
    return saved.day === fresh.day ? saved : { ...fresh, unsent: saved.unsent || 0 };
  } catch {
    return fresh;
  }
}
function write(s: State) {
  snapshot = s.today;
  try {
    localStorage.setItem(key(), JSON.stringify(s));
  } catch {
    /* storage indisponível: segue só em memória */
  }
  listeners.forEach((l) => l());
}

function sessionId() {
  try {
    const saved = sessionStorage.getItem("norte_study_session");
    if (saved) return saved;
    const id = crypto.randomUUID();
    sessionStorage.setItem("norte_study_session", id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export async function flushStudyClock() {
  if (!uid) return;
  const s = read();
  if (s.unsent <= 0) return;
  write({ ...s, unsent: 0 });
  const { error } = await supabase.rpc("study_heartbeat", { _id: sid, _seconds: s.unsent });
  if (error) write({ ...read(), unsent: read().unsent + s.unsent }); // tenta de novo no próximo batimento
}

export function startStudyClock(userId: string) {
  if (uid === userId && timers.length) return;
  stopStudyClock();
  uid = userId;
  sid = sessionId();
  write(read());

  // Reconcilia com o que o servidor já tem hoje (outro aparelho/aba, ou dados locais apagados).
  void supabase.rpc("study_time_today").then(({ data }) => {
    if (uid !== userId || typeof data !== "number") return;
    const s = read();
    write({ ...s, today: Math.max(s.today, data + s.unsent) });
  });

  timers = [
    window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const s = read();
      write({ ...s, today: s.today + 1, unsent: s.unsent + 1 });
    }, 1000),
    window.setInterval(() => void flushStudyClock(), BEAT_MS),
  ];
  document.addEventListener("visibilitychange", onHide);
  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("storage", onStorage);
}

export function stopStudyClock() {
  timers.forEach((t) => window.clearInterval(t));
  timers = [];
  document.removeEventListener("visibilitychange", onHide);
  window.removeEventListener("pagehide", onPageHide);
  window.removeEventListener("storage", onStorage);
  uid = "";
}

const onHide = () => document.visibilityState === "hidden" && void flushStudyClock();
const onPageHide = () => void flushStudyClock();
// Outra aba atualizou o total: acompanha.
const onStorage = (e: StorageEvent) => {
  if (e.key === key()) {
    snapshot = read().today;
    listeners.forEach((l) => l());
  }
};

export const subscribeStudyClock = (cb: () => void) => {
  listeners.add(cb);
  return () => void listeners.delete(cb);
};
export const getStudyToday = () => snapshot;

export const fmtClock = (total: number) => {
  const two = (n: number) => String(n).padStart(2, "0");
  return `${two(Math.floor(total / 3600))}:${two(Math.floor((total % 3600) / 60))}:${two(total % 60)}`;
};
/** 4325 -> "1 h 12 min"; 40 -> "menos de 1 min". */
export const fmtHuman = (total: number) => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h} h ${String(m).padStart(2, "0")} min`;
  return m > 0 ? `${m} min` : "menos de 1 min";
};
