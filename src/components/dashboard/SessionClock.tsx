import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const BEAT_MS = 30_000;
const KEY = "norte_study_session";

export const fmtClock = (total: number) => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const two = (n: number) => String(n).padStart(2, "0");
  return `${two(h)}:${two(m)}:${two(s)}`;
};

/** Um id por aba/sessão do navegador; reaproveitado se a página for recarregada. */
function sessionId() {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return saved;
    const id = crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/**
 * Relógio da sessão de estudo: conta só o tempo em que a aba está visível e envia
 * batimentos ao servidor (para o total do dia e para o painel do administrador).
 */
export function SessionClock({ userId }: { userId: string }) {
  const [seconds, setSeconds] = useState(0);
  const [today, setToday] = useState(0);
  const unsent = useRef(0);
  const id = useRef<string>("");

  useEffect(() => {
    id.current = sessionId();
    let alive = true;
    void supabase.rpc("study_time_today").then(({ data }) => alive && typeof data === "number" && setToday(data));

    const flush = () => {
      const delta = unsent.current;
      if (delta <= 0) return;
      unsent.current = 0;
      void supabase.rpc("study_heartbeat", { _id: id.current, _seconds: delta }).then(({ error }) => {
        if (error) unsent.current += delta; // tenta de novo no próximo batimento
      });
    };

    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setSeconds((s) => s + 1);
      unsent.current += 1;
    }, 1000);
    const beat = window.setInterval(flush, BEAT_MS);
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onHide);
    return () => {
      alive = false;
      window.clearInterval(tick);
      window.clearInterval(beat);
      document.removeEventListener("visibilitychange", onHide);
      flush();
    };
  }, [userId]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="app-streak" role="timer" aria-label={`Tempo desta sessão: ${fmtClock(seconds)}`}>
          <Timer />
          <span className="tabular">{fmtClock(seconds)}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        Tempo estudando nesta sessão. Hoje: {fmtClock(today + seconds)}
      </TooltipContent>
    </Tooltip>
  );
}
