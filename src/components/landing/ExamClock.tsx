import * as React from "react";
import { examInstant } from "@/lib/examClock";
import { platformNow } from "@/lib/platformClock";
import "@/styles/exam-clock.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Contagem para a prova: anel de dias + módulos de horas, minutos e segundos. Pausa com a aba oculta. */
export function ExamClock({ examDate, label = "Prova objetiva" }: { examDate: string; label?: string }) {
  const target = React.useMemo(() => examInstant(examDate), [examDate]);
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    let id = 0;
    const tick = () => setNow(platformNow());
    const start = () => { tick(); window.clearInterval(id); id = window.setInterval(tick, 1000); };
    const vis = () => (document.visibilityState === "visible" ? start() : window.clearInterval(id));
    start();
    document.addEventListener("visibilitychange", vis);
    return () => { window.clearInterval(id); document.removeEventListener("visibilitychange", vis); };
  }, []);
  const s = now === null ? 0 : Math.floor(Math.max(0, target - now) / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const date = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Rio_Branco", day: "2-digit", month: "short", year: "numeric" }).format(new Date(target)).replace(".", "");
  const R = 40, C = 2 * Math.PI * R, frac = (s % 86400) / 86400;
  return (
    <div className="ek" role="timer" aria-label={`${label} em ${date}: faltam ${d} dias`}>
      <div className="ek__ring" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="47" className="ek__ticks" />
          <circle cx="50" cy="50" r={R} className="ek__track" />
          <circle cx="50" cy="50" r={R} className="ek__arc" strokeDasharray={C} strokeDashoffset={C * (1 - frac)} />
        </svg>
        <b>{now === null ? "--" : d}</b>
        <small>dias</small>
      </div>
      <div className="ek__side" aria-hidden="true">
        <span className="ek__head"><i />{label} · {date}</span>
        <span className="ek__cells">
          {[[h, "horas"], [m, "min"], [sec, "seg"]].map(([v, l], i) => (
            <span className="ek__cell" key={i}><b>{now === null ? "--" : pad(v as number)}</b><small>{l}</small></span>
          ))}
        </span>
      </div>
    </div>
  );
}
