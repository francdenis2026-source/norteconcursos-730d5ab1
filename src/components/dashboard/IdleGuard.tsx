import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { IDLE_LOGOUT_SECONDS, IDLE_WARNING_SECONDS, idleSeconds, markActive, startActivityTracking } from "@/lib/activity";
import { endFocus } from "@/lib/focusSession";
import { flushStudyClock, stopStudyClock } from "@/lib/studyClock";

/**
 * Encerra a sessão após 5 minutos sem nenhuma interação (mouse, teclado, rolagem ou toque).
 * Um minuto antes, avisa e permite continuar. Enquanto o aluno está parado, o relógio de estudo já não conta
 * (a partir de 2 minutos), então o tempo registrado não inclui a ausência.
 */
export function IdleGuard() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const stop = startActivityTracking();
    let ended = false;
    const end = async () => {
      if (ended) return;
      ended = true;
      endFocus();
      await flushStudyClock();
      stopStudyClock();
      await supabase.auth.signOut();
      window.location.assign("/auth?reason=inactive");
    };
    const check = () => {
      const idle = idleSeconds();
      if (idle >= IDLE_LOGOUT_SECONDS) void end();
      else setRemaining(idle >= IDLE_WARNING_SECONDS ? IDLE_LOGOUT_SECONDS - idle : null);
    };
    const id = window.setInterval(check, 1000);
    const onVisible = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      stop();
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (remaining === null) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4" role="alertdialog" aria-modal="true" aria-labelledby="idle-title">
      <div className="w-full max-w-sm space-y-4 rounded-2xl bg-background p-6 text-center shadow-2xl">
        <h2 id="idle-title" className="text-lg font-bold">Você ainda está aí?</h2>
        <p className="text-sm text-muted-foreground">Sem interação por alguns minutos. Por segurança e para não contar tempo de estudo errado, a sessão será encerrada em</p>
        <p className="font-mono text-4xl font-bold tabular-nums" aria-live="polite">{remaining}s</p>
        <Button className="w-full" onClick={() => { markActive(true); setRemaining(null); }}>Continuar estudando</Button>
      </div>
    </div>
  );
}
