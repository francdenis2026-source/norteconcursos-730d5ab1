import * as React from "react";
import { examInstant } from "@/lib/examClock";
import { platformNow } from "@/lib/platformClock";

const pad = (n: number) => String(n).padStart(2, "0");

/** Contagem regressiva da prova para a faixa da Área do aluno: dias em destaque, data e relógio numa linha. */
export function HeroCountdown({ examDate }: { examDate: string }) {
  const target = React.useMemo(() => examInstant(examDate), [examDate]);
  const [now, setNow] = React.useState(() => platformNow());
  React.useEffect(() => {
    let id = 0;
    const tick = () => setNow(platformNow());
    const start = () => {
      tick();
      window.clearInterval(id);
      id = window.setInterval(tick, 1000);
    };
    const vis = () => (document.visibilityState === "visible" ? start() : window.clearInterval(id));
    start();
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);
  const s = Math.floor(Math.max(0, target - now) / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Rio_Branco", ...o }).format(new Date(target));
  const dateLabel = `${fmt({ day: "2-digit" })} ${fmt({ month: "short" }).replace(".", "")} ${fmt({ year: "numeric" })} · ${fmt({ weekday: "long" })}`;
  return (
    <div
      className="hx-cd"
      role="timer"
      aria-label={`Prova em ${fmt({ day: "2-digit", month: "long", year: "numeric" })}: faltam ${d} dias, ${h} horas e ${m} minutos`}
    >
      <span className="hx-cd__days" aria-hidden="true">
        <b>{d}</b>
        <i>{d === 1 ? "dia" : "dias"}</i>
      </span>
      <span className="hx-cd__meta" aria-hidden="true">
        <span className="hx-cd__label">Prova objetiva</span>
        <span className="hx-cd__date">{dateLabel}</span>
        <span className="hx-cd__clock">
          <b>{pad(h)}</b>
          <i>h</i>
          <b>{pad(m)}</b>
          <i>min</i>
          <b>{pad(sec)}</b>
          <i>s</i>
        </span>
      </span>
    </div>
  );
}
