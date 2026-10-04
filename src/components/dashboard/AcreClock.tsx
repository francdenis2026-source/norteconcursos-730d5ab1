import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const TZ = "America/Rio_Branco";
const day = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, weekday: "short", day: "2-digit", month: "2-digit" });
const hm = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false });
const full = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, dateStyle: "full", timeStyle: "medium" });

/**
 * Data e hora oficiais da plataforma (horário do Acre, UTC−5). Usa o relógio do servidor
 * como referência: se o relógio do aparelho estiver errado, a plataforma continua certa.
 */
export function AcreClock() {
  const [offset, setOffset] = useState(0); // servidor − aparelho, em ms
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const sync = async () => {
      const t0 = Date.now();
      const { data } = await supabase.rpc("server_now");
      if (!alive || typeof data !== "string") return;
      const t1 = Date.now();
      setOffset(new Date(data).getTime() - (t0 + t1) / 2);
    };
    void sync();
    const resync = window.setInterval(sync, 10 * 60_000);
    setNow(Date.now());
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      alive = false;
      window.clearInterval(resync);
      window.clearInterval(tick);
    };
  }, []);

  if (now === null) return null;
  const d = new Date(now + offset);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="app-streak hidden lg:inline-flex" role="timer" aria-label={`Horário do Acre: ${full.format(d)}`}>
          <CalendarClock />
          <span className="tabular capitalize">{day.format(d).replace(".", "")}</span>
          <span className="tabular">{hm.format(d)}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span className="capitalize">{full.format(d)}</span> · horário do Acre
      </TooltipContent>
    </Tooltip>
  );
}
