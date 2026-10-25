/** Authentication inactivity is independent of study/media accounting. */
// Long study sessions must not be interrupted while the student is reading,
// solving or reviewing without moving the pointer. The warning still gives a
// clear escape hatch before the session expires.
export const SESSION_IDLE_MS = 5 * 60_000;
export const SESSION_WARNING_MS = 60_000;

/** Stable across token refreshes, different for a new password/email login. Never stores tokens. */
export function sessionActivityKey(session: { user: { id: string }; access_token: string } | null): string | null {
  if (!session) return null;
  let id = "current";
  try {
    const payload = session.access_token.split(".")[1]!;
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (typeof decoded.session_id === "string") id = decoded.session_id;
  } catch { /* Older tokens still get an account-scoped deadline. */ }
  return `norte_auth_activity:${session.user.id}:${id}`;
}

type Options = {
  key: string;
  storage: Pick<Storage, "getItem" | "setItem">;
  now: () => number;
  monotonic: () => number;
  onExpire: () => void;
  onRemaining: (seconds: number | null) => void;
};

/** Reads the deadline before accepting input: returning after expiry cannot renew a stale login. */
export function createIdleSession(options: Options) {
  const { key, storage, now, monotonic, onExpire, onRemaining } = options;
  const read = () => {
    try { const value = Number(storage.getItem(key)); return Number.isFinite(value) ? value : 0; }
    catch { return 0; }
  };
  const write = (value: number) => { try { storage.setItem(key, String(value)); } catch { /* memory fallback */ } };
  let at = read() || now();
  let anchor = monotonic() - (now() - at);
  let ended = false;
  if (!read()) write(at);
  const check = () => {
    if (ended) return false;
    const shared = read();
    if (shared > at) {
      at = shared;
      anchor = monotonic() - (now() - at);
    }
    const elapsed = Math.max(0, now() - at, monotonic() - anchor);
    if (shared === -1 || at === -1 || elapsed >= SESSION_IDLE_MS) {
      ended = true;
      write(-1);
      onExpire();
      return false;
    }
    const left = SESSION_IDLE_MS - elapsed;
    onRemaining(left <= SESSION_WARNING_MS ? Math.ceil(left / 1000) : null);
    return true;
  };
  const interact = () => {
    if (!check()) return;
    // At most one shared-storage write per second; real interaction still clears the warning.
    if (Math.max(now() - at, monotonic() - anchor) >= 1000) {
      at = now(); anchor = monotonic(); write(at);
    }
    onRemaining(null);
  };
  return { check, interact };
}

/** Saving progress and contacting auth must never indefinitely block a local logout. */
export async function endIdleSession(options: {
  save: () => Promise<unknown>;
  stop: () => void;
  signOut: () => Promise<unknown>;
  clear: () => void;
  redirect: () => void;
  timeoutMs?: number;
}) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    try { void options.save().catch(() => {}); } catch { /* progress is already queued locally */ }
    options.stop();
    await Promise.race([
      Promise.resolve().then(options.signOut),
      new Promise<void>(resolve => { timer = setTimeout(resolve, options.timeoutMs ?? 1500); }),
    ]);
  } catch { /* Offline or stalled authentication still expires locally. */ }
  finally {
    clearTimeout(timer);
    try { options.clear(); } finally { options.redirect(); }
  }
}
