import { platformNow } from "@/lib/platformClock";
import { useEffect, useState } from "react";
import { TacticalClock } from "@/components/brand/TacticalClock";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const TZ = "America/Rio_Branco";
const day = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TZ,
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
});
const hm = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TZ,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const full = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TZ,
  dateStyle: "full",
  timeStyle: "medium",
});

/**
 * Data e hora oficiais da plataforma (horário do Acre, UTC−5). Usa o relógio do servidor
 * como referência: se o relógio do aparelho estiver errado, a plataforma continua certa.
 */
export function AcreClock() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(platformNow());
    const tick = window.setInterval(() => setNow(platformNow()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  if (now === null) return null;
  const d = new Date(now);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="app-streak app-clock"
          role="timer"
          aria-label={`Horário do Acre: ${full.format(d)}`}
        >
          <span className="tabular capitalize">{day.format(d).replace(".", "")}</span>
          <TacticalClock time={hm.format(d)} seconds={d.getUTCSeconds()} />
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span className="capitalize">{full.format(d)}</span> · horário do Acre
      </TooltipContent>
    </Tooltip>
  );
}
