/** Coalesce profile reads and discard completions from a previous account. */
export function createSessionProfileLoader<S, T>(options: {
  identify: (session: S) => string;
  load: (session: S) => Promise<T>;
  publish: (value: T) => void;
  change: (session: S | null) => void;
  fail: (error: unknown) => void;
}) {
  let identity: string | null | undefined;
  let generation = 0;
  let pending: Promise<void> | null = null;
  let disposed = false;
  const select = (session: S | null) => {
    if (disposed) return;
    const next = session === null ? null : options.identify(session);
    if (next !== identity) {
      identity = next;
      generation++;
      pending = null;
      options.change(session);
    }
  };
  return {
    select,
    run(session: S | null): Promise<void> {
      if (disposed) return Promise.resolve();
      select(session);
      if (session === null) return Promise.resolve();
      if (pending) return pending;
      const version = generation;
      const task = Promise.resolve()
        .then(() => options.load(session))
        .then((value) => {
          if (!disposed && version === generation) options.publish(value);
        })
        .catch((error) => {
          if (!disposed && version === generation) options.fail(error);
        })
        .finally(() => {
          if (pending === task) pending = null;
        });
      pending = task;
      return task;
    },
    dispose() {
      disposed = true;
      generation++;
      pending = null;
    },
  };
}
