export type AccountSessionState = 'checking' | 'verified' | 'unavailable' | 'revoked';

/** A login can claim once. Refresh, focus, polling and retries only verify ownership. */
export function createAccountSessionMonitor(options: {
  claim: boolean;
  verify: (claim: boolean, signal: AbortSignal) => Promise<boolean>;
  publish: (state: AccountSessionState) => void;
  revoke: () => void;
  timeoutMs?: number;
}) {
  let disposed = false;
  let revoked = false;
  let claim = options.claim;
  let pending: Promise<void> | null = null;
  let controller: AbortController | undefined;
  const check = (conceal = false): Promise<void> => {
    if (disposed || revoked) return Promise.resolve();
    if (conceal) options.publish('checking');
    if (pending) return pending;
    const takeover = claim;
    claim = false;
    const request = new AbortController();
    controller = request;
    const signal = request.signal;
    let abort: () => void;
    const aborted = new Promise<never>((_, reject) => {
      abort = () => reject(signal.reason ?? new Error('Session verification aborted'));
      signal.addEventListener('abort', abort, { once: true });
    });
    const timeout = setTimeout(() => request.abort(new Error('Session verification timed out')), options.timeoutMs ?? 8000);
    // Aborting fetch alone cannot release a request stalled before fetch (e.g. an
    // SDK auth/storage lock). Bound the entire operation and discard late results.
    pending = Promise.race([Promise.resolve().then(() => options.verify(takeover, signal)), aborted]).then(owns => {
      if (disposed) return;
      if (owns) options.publish('verified');
      else {
        revoked = true;
        options.publish('revoked');
        options.revoke();
      }
    }).catch(() => {
      // Network/permissions errors cannot grant access or mean another device logged in.
      if (!disposed) options.publish('unavailable');
    }).finally(() => { clearTimeout(timeout); signal.removeEventListener('abort', abort); pending = null; });
    return pending;
  };
  return { check, dispose: () => { disposed = true; controller?.abort(); } };
}
