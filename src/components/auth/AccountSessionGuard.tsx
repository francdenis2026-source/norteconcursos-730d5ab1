import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { clearPersistedAuthSession, supabase } from '@/integrations/supabase/client';
import { createAccountSessionMonitor, type AccountSessionState } from '@/lib/accountSession';
import { verifyAccountSession } from '@/lib/accountSessionApi';
import { endIdleSession } from '@/lib/sessionIdle';
import { endFocus } from '@/lib/focusSession';
import { stopStudyClock } from '@/lib/studyClock';
import { SessionVerificationScreen } from './SessionVerificationScreen';

export type AccountAccess = { userId: string; sessionKey: string; claim: boolean; accessToken: string };

/** Server ownership is independent of the same-browser tab lock. */
export function AccountSessionGuard({ access, children }: { access: AccountAccess | null; children: ReactNode }) {
  const { pathname } = useLocation();
  const [snapshot, setSnapshot] = useState<{ key: string; state: AccountSessionState } | null>(null);
  const monitor = useRef<ReturnType<typeof createAccountSessionMonitor> | null>(null);
  const currentAccess = useRef(access);
  currentAccess.current = access;
  const state = access ? snapshot?.key === access.sessionKey ? snapshot.state : 'checking' : 'verified';
  useEffect(() => {
    if (!access) return;
    const { userId, sessionKey, claim } = access;
    const session = createAccountSessionMonitor({
      claim,
      verify: (takeover, signal) => {
        const current = currentAccess.current;
        if (!current || current.sessionKey !== sessionKey) throw new Error('Authentication session changed');
        return verifyAccountSession(userId, sessionKey, takeover, signal, current.accessToken);
      },
      publish: state => setSnapshot({ key: sessionKey, state }),
      revoke: () => {
        void endIdleSession({
          // Never write progress under a session that has lost ownership.
          save: async () => {},
          stop: () => { endFocus(); stopStudyClock(); },
          signOut: () => supabase.auth.signOut({ scope: 'local' }),
          clear: clearPersistedAuthSession,
          redirect: () => window.location.replace('/auth?reason=another-device'),
        });
      },
    });
    monitor.current = session;
    void session.check(true);
    // Realtime pushes an eviction the instant another device claims the account; the poll below
    // is only a fallback for a dropped channel. Neither needs help from tab-switch or token-refresh
    // churn, which used to force an extra check on every focus/visibilitychange and every silent
    // auto-refresh (itself triggered by focus) — making a mere tab switch look like a logout.
    const channel = supabase.channel(`account-session:${userId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'active_user_sessions', filter: `user_id=eq.${userId}` }, () => { void session.check(); })
      .subscribe();
    const reconnect = () => { if (document.visibilityState !== 'hidden') void session.check(); };
    const poll = window.setInterval(() => { void session.check(); }, 60_000);
    window.addEventListener('online', reconnect);
    return () => {
      session.dispose(); monitor.current = null;
      void supabase.removeChannel(channel);
      window.clearInterval(poll);
      window.removeEventListener('online', reconnect);
    };
  }, [access?.userId, access?.sessionKey, access?.claim]);
  if (pathname === '/' || state === 'verified' || (state === 'checking' && (pathname === '/auth' || pathname === '/admin'))) return children;
  return <SessionVerificationScreen state={state} onRetry={() => { void monitor.current?.check(true); }} />;
}
