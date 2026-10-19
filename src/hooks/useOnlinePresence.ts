import { useSyncExternalStore } from "react";
import { createPublicPresenceClient } from "@/integrations/supabase/client";
import { browserPresenceId, countOnlineBrowsers, type OnlinePresence } from "@/lib/studyPresence";

const INITIAL: OnlinePresence = { state: "connecting", count: null };
let snapshot: OnlinePresence = INITIAL;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
function publish(next: OnlinePresence) {
  if (next.state === snapshot.state && next.count === snapshot.count) return;
  snapshot = next;
  listeners.forEach((listener) => listener());
}

/** Mounted once in the root, so both public pages and the authenticated panel participate. */
export function startOnlinePresence() {
  let stopped = false,
    joined = false,
    revision = 0;
  const storage = {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
  };
  const key = browserPresenceId(storage, () => crypto.randomUUID());
  const client = createPublicPresenceClient();
  const channel = client.channel("norte-online-v1", { config: { presence: { key } } });
  publish(INITIAL);
  const unavailable = () => {
    if (!stopped) publish({ state: "unavailable", count: null });
  };
  const sync = () => {
    if (stopped || !joined || !navigator.onLine) return;
    const state = channel.presenceState<{ visible: boolean }>();
    const count = countOnlineBrowsers(state);
    // The first sync may precede our own track acknowledgement. Do not present that as zero online.
    const selfPresent = state[key]?.some((entry) => entry.visible);
    if (count !== null && (document.visibilityState !== "visible" || selfPresent))
      publish({ state: "ready", count });
  };
  const visibility = async () => {
    const current = ++revision;
    if (stopped || !joined || !navigator.onLine) return;
    try {
      const result =
        document.visibilityState === "visible"
          ? await channel.track({ visible: true })
          : await channel.untrack();
      if (stopped || current !== revision) return;
      if (result !== "ok") unavailable();
      else sync();
    } catch {
      if (!stopped && current === revision) unavailable();
    }
  };
  const offline = () => {
    revision++;
    unavailable();
  };
  const pageHide = () => {
    revision++;
    if (joined) void channel.untrack();
  };
  channel.on("presence", { event: "sync" }, sync).subscribe((status) => {
    if (stopped) return;
    joined = status === "SUBSCRIBED";
    if (joined) void visibility();
    else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED")
      unavailable();
  });
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("offline", offline);
  window.addEventListener("online", visibility);
  window.addEventListener("pagehide", pageHide);
  window.addEventListener("pageshow", visibility);
  return () => {
    stopped = true;
    revision++;
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("offline", offline);
    window.removeEventListener("online", visibility);
    window.removeEventListener("pagehide", pageHide);
    window.removeEventListener("pageshow", visibility);
    void client.removeChannel(channel).finally(() => client.realtime.disconnect());
    publish(INITIAL);
  };
}

export function useOnlinePresence() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => INITIAL,
  );
}
