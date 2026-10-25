import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { clearPersistedAuthSession, supabase } from "@/integrations/supabase/client";
import { createIdleSession, endIdleSession } from "@/lib/sessionIdle";
import { endFocus } from "@/lib/focusSession";
import { flushStudyClock, stopStudyClock } from "@/lib/studyClock";

/** Mounted once for every authenticated session, including outside the dashboard. */
export function SessionIdleGuard({ sessionKey }: { sessionKey: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);
  const monitor = useRef<ReturnType<typeof createIdleSession> | null>(null);
  useEffect(() => {
    let storage: Pick<Storage, "getItem" | "setItem">;
    try { storage = window.localStorage; }
    catch { storage = { getItem: () => null, setItem: () => {} }; }
    const session = createIdleSession({
      key: sessionKey, storage, now: Date.now, monotonic: () => performance.now(),
      onRemaining: setRemaining,
      onExpire: () => {
        setExpired(true);
        void endIdleSession({
          save: flushStudyClock,
          stop: () => { endFocus(); stopStudyClock(); },
          signOut: () => supabase.auth.signOut({ scope: "local" }),
          clear: clearPersistedAuthSession,
          redirect: () => window.location.replace("/auth?reason=inactive"),
        });
      },
    });
    monitor.current = session;
    const interaction = (event: Event) => { if (event.isTrusted) session.interact(); };
    const check = () => { session.check(); };
    const shared = (event: StorageEvent) => { if (event.key === sessionKey) check(); };
    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;
    for (const event of events) window.addEventListener(event, interaction, { capture: true, passive: true });
    window.addEventListener("storage", shared);
    window.addEventListener("focus", check);
    window.addEventListener("pageshow", check);
    document.addEventListener("visibilitychange", check);
    const timer = window.setInterval(check, 1000);
    check();
    return () => {
      monitor.current = null;
      window.clearInterval(timer);
      for (const event of events) window.removeEventListener(event, interaction, { capture: true });
      window.removeEventListener("storage", shared);
      window.removeEventListener("focus", check);
      window.removeEventListener("pageshow", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [sessionKey]);

  return (
    <Dialog open={expired || remaining !== null} onOpenChange={(open) => { if (!open && !expired) monitor.current?.interact(); }}>
      <DialogContent onPointerDownOutside={event => event.preventDefault()} onEscapeKeyDown={event => { if (expired) event.preventDefault(); }}>
        <DialogTitle>{expired ? "Sessão encerrada" : "Você ainda está aí?"}</DialogTitle>
        <DialogDescription>{expired
          ? "Cinco minutos sem interação. Redirecionando para entrar novamente…"
          : `Por segurança, sua sessão será encerrada em ${remaining} segundos sem interação.`}</DialogDescription>
        {!expired && <Button onClick={() => monitor.current?.interact()}>Continuar estudando</Button>}
      </DialogContent>
    </Dialog>
  );
}
