/** Browser offline events are immediate; HTTP checks also detect Wi-Fi without internet.
 * Two failed probes avoid replacing the workspace for one transient request failure. */
export function createConnectionMonitor(options: {
  probe: (signal: AbortSignal) => Promise<boolean>;
  publish: (online: boolean) => void;
  timeoutMs?: number;
}) {
  let online = true;
  let failures = 0;
  let generation = 0;
  let disposed = false;
  let pending: { controller: AbortController; promise: Promise<boolean> } | undefined;
  const publish = (value: boolean) => {
    if (online === value || disposed) return;
    online = value;
    options.publish(value);
  };
  const offline = () => {
    generation++;
    pending?.controller.abort();
    pending = undefined;
    failures = 2;
    publish(false);
  };
  const check = (): Promise<boolean> => {
    if (disposed) return Promise.resolve(false);
    if (pending) return pending.promise;
    const version = generation;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const timeout = new Promise<boolean>(resolve => {
      timer = setTimeout(() => { controller.abort(); resolve(false); }, options.timeoutMs ?? 3000);
    });
    const request = { controller, promise: Promise.resolve(false) };
    request.promise = Promise.race([
      Promise.resolve().then(() => options.probe(controller.signal)).catch(() => false),
      timeout,
    ]).then(reachable => {
      if (disposed || version !== generation) return false;
      failures = reachable ? 0 : failures + 1;
      if (reachable) publish(true);
      else if (failures >= 2) publish(false);
      return reachable;
    }).finally(() => {
      clearTimeout(timer);
      if (pending === request) pending = undefined;
    });
    pending = request;
    return request.promise;
  };
  return {
    check,
    offline,
    dispose: () => { disposed = true; generation++; pending?.controller.abort(); },
  };
}
