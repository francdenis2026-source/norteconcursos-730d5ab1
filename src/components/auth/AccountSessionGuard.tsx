import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { clearPersistedAuthSession, supabase } from '@/integrations/supabase/client';
import { createAccountSessionMonitor, type AccountSessionState } from '@/lib/accountSession';
import { verifyAccountSession } from '@/lib/accountSessionApi';
import { endIdleSession } from '@/lib/sessionIdle';
import { endFocus } from '@/lib/focusSession';
import { stopStudyClock } from '@/lib/studyClock';
import { Button } from '@/components/ui/button';

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
    const resume = () => { if (document.visibilityState !== 'hidden') void session.check(); };
    const channel = supabase.channel(`account-session:${userId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'active_user_sessions', filter: `user_id=eq.${userId}` }, () => { void session.check(); })
      .subscribe();
    const poll = window.setInterval(() => { void session.check(); }, 15_000);
    window.addEventListener('focus', resume);
    window.addEventListener('pageshow', resume);
    window.addEventListener('online', resume);
    document.addEventListener('visibilitychange', resume);
    return () => {
      session.dispose(); monitor.current = null;
      void supabase.removeChannel(channel);
      window.clearInterval(poll);
      window.removeEventListener('focus', resume);
      window.removeEventListener('pageshow', resume);
      window.removeEventListener('online', resume);
      document.removeEventListener('visibilitychange', resume);
    };
  }, [access?.userId, access?.sessionKey, access?.claim]);
  useEffect(() => { if (access) void monitor.current?.check(); }, [access?.accessToken]);
  if (pathname === '/' || state === 'verified' || (state === 'checking' && (pathname === '/auth' || pathname === '/admin'))) return children;
  return <main className="grid min-h-dvh place-items-center bg-background p-6 text-foreground" aria-busy={state === 'checking'}>
    <section className="w-full max-w-md rounded-2xl border bg-card p-7 text-center shadow-lg" role="status">
      <h1 className="text-xl font-semibold">{state === 'checking' ? 'Verificando sua sessão…' : state === 'revoked' ? 'Sessão encerrada' : 'Não foi possível confirmar seu acesso'}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{state === 'checking' ? 'Confirmando o dispositivo conectado à sua conta.' : state === 'revoked' ? 'Sua conta foi aberta em outro dispositivo. Entre novamente para continuar neste aparelho.' : 'Confira sua conexão e tente novamente. Seu acesso precisa ser validado antes de continuar.'}</p>
      {state === 'unavailable' && <Button className="mt-5" onClick={() => { void monitor.current?.check(true); }}>Tentar novamente</Button>}
      <Link to="/" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border px-4 text-sm font-semibold">Página inicial</Link>
    </section>
  </main>;
}
