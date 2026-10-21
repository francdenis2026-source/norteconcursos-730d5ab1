export type DeviceSessionState = "checking" | "active" | "unavailable" | "replaced";

/** One request at a time, no reclaim operation, and replacement is terminal.
 * Generation cleanup ignores responses for a previous account/session. */
export function monitorDeviceSession(options: {
  verify: () => Promise<boolean>;
  publish: (state: DeviceSessionState) => void;
  replaced: () => void;
}) {
  let stopped = false;
  let pending: Promise<void> | undefined;
  const check = (): Promise<void> => {
    if (stopped) return Promise.resolve();
    if (pending) return pending;
    pending = (async () => {
      try {
        const active = await options.verify();
        if (stopped) return;
        if (active) options.publish("active");
        else {
          stopped = true;
          options.publish("replaced");
          options.replaced();
        }
      } catch {
        // Connectivity problems never revoke tokens, but protected screens
        // stay suspended until the server can confirm ownership again.
        if (!stopped) options.publish("unavailable");
      } finally { pending = undefined; }
    })();
    return pending;
  };
  options.publish("checking");
  return { check, stop: () => { stopped = true; } };
}
