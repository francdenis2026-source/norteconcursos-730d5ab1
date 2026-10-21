export type SessionTabState = "checking" | "owner" | "blocked" | "unavailable";

/** One authenticated document per origin, even across independent logins.
 * No copied tab ID, token changes or server heartbeat.
 * A brief abortable acquisition tolerates effect cleanup/reload handoff. A blocked
 * tab never remains queued to take the lock during a later reload of the owner.
 */
export function claimSessionTab(
  locks: Pick<LockManager, "request"> | undefined,
  publish: (state: SessionTabState) => void,
): () => void {
  let disposed = false;
  let timedOut = false;
  let release: (() => void) | undefined;
  publish("checking");
  if (!locks) {
    publish("unavailable");
    return () => { disposed = true; };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
    if (!disposed) publish("blocked");
  }, 150);
  void Promise.resolve().then(() => {
    if (disposed) return;
    return locks.request("norte:authenticated-tab", { signal: controller.signal }, async lock => {
      clearTimeout(timer);
      if (disposed || timedOut) return;
      if (!lock) { publish("blocked"); return; }
      const held = new Promise<void>(resolve => { release = resolve; });
      publish("owner");
      await held;
    });
  }).catch(() => {
    clearTimeout(timer);
    if (!disposed && !timedOut) publish("unavailable");
  });
  return () => {
    disposed = true;
    clearTimeout(timer);
    controller.abort();
    release?.();
  };
}
