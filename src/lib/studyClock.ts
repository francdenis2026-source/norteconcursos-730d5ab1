/** Accumulates active usage across logins, keeping pending sends until server acknowledgement. */
import { supabase } from "@/integrations/supabase/client";
import { acreDateKey } from "@/lib/acreTime";
import { platformNow } from "@/lib/platformClock";
import { idleSeconds, IDLE_PAUSE_SECONDS } from "@/lib/activity";

type Pending = { id: string; day: string; seconds: number };
interface State { day: string; today: number; unsent: number; pending: Pending[]; lastTick: number }
const BEAT_MS = 30_000;
const listeners = new Set<() => void>();
const memory = new Map<string, State>();
const flushing = new Map<string, Promise<void>>();
let uid = "", sid = "", sessionDay = "";
let timers: number[] = [];
let snapshot = 0;
const key = (user = uid) => `norte_clock_v2:${user}`;

function read(user = uid): State {
  const day = acreDateKey();
  let saved: Partial<State> | null = memory.get(user) ?? null;
  try { saved = JSON.parse(localStorage.getItem(key(user)) ?? "null") ?? saved; } catch { /* memory fallback */ }
  const pending = saved?.pending ?? (saved?.unsent ? [{ id: sid, day: saved.day ?? day, seconds: saved.unsent }] : []);
  return { day, today: saved?.day === day ? saved.today ?? 0 : 0, pending, unsent: pending.reduce((sum, batch) => sum + batch.seconds, 0), lastTick: saved?.lastTick ?? platformNow() };
}
function write(state: State, user = uid) {
  const next = { ...state, unsent: state.pending.reduce((sum, batch) => sum + batch.seconds, 0) };
  memory.set(user, next);
  try { localStorage.setItem(key(user), JSON.stringify(next)); } catch { /* memory fallback */ }
  if (user === uid) { snapshot = next.today; listeners.forEach(listener => listener()); }
}
function sessionId(user: string, day: string) {
  const sessionKey = `norte_study_session:${user}:${day}`;
  try {
    const saved = sessionStorage.getItem(sessionKey);
    if (saved) return saved;
    const id = crypto.randomUUID(); sessionStorage.setItem(sessionKey, id); return id;
  } catch { return crypto.randomUUID(); }
}
async function withLock(user: string, run: () => Promise<void>, kind = "state") {
  if (typeof navigator !== "undefined" && navigator.locks) return navigator.locks.request(`norte-clock:${kind}:${user}`, run);
  return run();
}
export function flushStudyClock(): Promise<void> {
  const user = uid;
  if (!user) return Promise.resolve();
  const existing = flushing.get(user);
  if (existing) return existing;
  const job = withLock(user, async () => {
    // Drain only the backlog present at entry; new active seconds wait for the next beat.
    let budget = read(user).unsent;
    while (budget > 0) {
      if (uid !== user) return;
      const batch = read(user).pending.find(item => item.seconds > 0);
      if (!batch) break;
      const seconds = Math.min(120, batch.seconds, budget);
      try {
        const { error } = await supabase.rpc("study_heartbeat", { _id: batch.id, _seconds: seconds });
        if (error) return;
      } catch { return; }
      await withLock(user, async () => {
        const state = read(user);
        write({ ...state, pending: state.pending.map(item => item.id === batch.id ? { ...item, seconds: Math.max(0, item.seconds - seconds) } : item).filter(item => item.seconds > 0) }, user);
      });
      budget -= seconds;
    }
  }, "flush").finally(() => { flushing.delete(user); });
  flushing.set(user, job);
  return job;
}
function rotateSession() {
  const day = acreDateKey();
  if (day === sessionDay) return;
  sessionDay = day; sid = sessionId(uid, day);
  // Establish the row on its own Acre day, before deferred heartbeats.
  void supabase.rpc("study_heartbeat", { _id: sid, _seconds: 0 }).then(() => {});
  const user = uid;
  void supabase.rpc("study_time_today").then(({ data }) => {
    if (uid !== user || sessionDay !== day || typeof data !== "number") return;
    const state = read(user);
    const pendingToday = state.pending.filter(batch => batch.day === day).reduce((sum, batch) => sum + batch.seconds, 0);
    write({ ...state, today: Math.max(state.today, data + pendingToday) }, user);
  });
}
export function startStudyClock(userId: string) {
  if (uid === userId && timers.length) return;
  stopStudyClock(); uid = userId; sessionDay = "";
  rotateSession(); write({ ...read(), lastTick: platformNow() });
  timers = [window.setInterval(() => {
    const user = uid;
    if (!user || document.visibilityState !== "visible") return;
    void withLock(user, async () => {
      if (uid !== user) return;
      rotateSession();
      const state = read(user), now = platformNow();
      // Shared tick prevents two visible windows counting the same second twice.
      const delta = Math.floor((now - state.lastTick) / 1000);
      if (delta <= 0) return;
      const active = document.visibilityState === "visible" && idleSeconds() < IDLE_PAUSE_SECONDS;
      const seconds = active ? Math.min(delta, 5) : 0;
      const pending = state.pending.map(batch => ({ ...batch }));
      if (seconds) {
        const batch = pending.find(item => item.id === sid);
        if (batch) batch.seconds += seconds;
        else pending.push({ id: sid, day: state.day, seconds });
      }
      write({ ...state, lastTick: now, today: state.today + seconds, pending }, user);
    });
  }, 1000), window.setInterval(() => void flushStudyClock(), BEAT_MS)];
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("storage", onStorage);
  void flushStudyClock();
}
export function stopStudyClock() {
  timers.forEach(timer => window.clearInterval(timer)); timers = [];
  document.removeEventListener("visibilitychange", onVisibility);
  window.removeEventListener("pagehide", onPageHide);
  window.removeEventListener("storage", onStorage);
  uid = ""; snapshot = 0; listeners.forEach(listener => listener());
}
const onVisibility = () => {
  if (document.visibilityState === "hidden") void flushStudyClock();
  else if (uid) { rotateSession(); write({ ...read(), lastTick: platformNow() }); }
};
const onPageHide = () => void flushStudyClock();
const onStorage = (event: StorageEvent) => {
  if (uid && event.key === key()) { snapshot = read().today; listeners.forEach(listener => listener()); }
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
