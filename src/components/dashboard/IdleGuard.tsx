import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { IDLE_LOGOUT_SECONDS, IDLE_READING_LOGOUT_SECONDS, IDLE_WARNING_SECONDS, idleSeconds, markActive, startActivityTracking } from "@/lib/activity";
import { endFocus } from "@/lib/focusSession";
import { showsReadingControl } from "@/lib/readingScale";
import { flushStudyClock, stopStudyClock } from "@/lib/studyClock";

/**
 * Encerra a sessão após 5 minutos sem nenhuma interação (mouse, teclado, rolagem ou toque).
 * Não desloga quem está assistindo vídeo, ouvindo podcast/leitura em voz alta (reprodução conta como atividade)
 * e dá 15 minutos nas páginas de leitura.
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
      // Leitura longa (leis, materiais) tem tolerância maior; o aviso vem 1 min antes do limite.
      const limit = showsReadingControl(window.location.pathname) ? IDLE_READING_LOGOUT_SECONDS : IDLE_LOGOUT_SECONDS;
      const warning = limit === IDLE_LOGOUT_SECONDS ? IDLE_WARNING_SECONDS : limit - 60;
      if (idle >= limit) void end();
      else setRemaining(idle >= warning ? limit - idle : null);
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
