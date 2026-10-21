export type AccountSessionState = 'checking' | 'verified' | 'unavailable' | 'revoked';

/** A login can claim once. Refresh, focus, polling and retries only verify ownership. */
export function createAccountSessionMonitor(options: {
  claim: boolean;
  verify: (claim: boolean, signal: AbortSignal) => Promise<boolean>;
  publish: (state: AccountSessionState) => void;
  revoke: () => void;
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
    controller = new AbortController();
    const signal = controller.signal;
    const timeout = setTimeout(() => controller?.abort(), 8000);
    pending = Promise.resolve().then(() => options.verify(takeover, signal)).then(owns => {
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
    }).finally(() => { clearTimeout(timeout); pending = null; });
    return pending;
  };
  return { check, dispose: () => { disposed = true; controller?.abort(); } };
}
