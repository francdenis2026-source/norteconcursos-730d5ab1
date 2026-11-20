import * as React from "react";
import "@/styles/exam-countdown.css";

/** Prova às 8h no horário do Acre (UTC-5), salvo hora já informada na data. */
function examInstant(examDate: string) {
  return new Date(examDate.length > 10 ? examDate : `${examDate}T08:00:00-05:00`).getTime();
}
const pad = (n: number) => String(n).padStart(2, "0");

/** Dígito que rola para cima quando muda. */
function Roll({ value }: { value: string }) {
  return (
    <span className="xr" aria-hidden="true">
      {value.split("").map((c, i) => (
        <span key={`${i}-${c}`} className="xr__d">{c}</span>
      ))}
    </span>
  );
}

/**
 * Contagem regressiva da prova do concurso escolhido: dias em destaque com anel do dia que se esvazia,
 * relógio hh:mm:ss com dígitos que rolam e a data da prova. Atualiza a cada segundo, pausa com a aba oculta.
 */
export function ExamCountdown({ examDate }: { examDate: string }) {
  const target = React.useMemo(() => examInstant(examDate), [examDate]);
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    let id = 0;
    const tick = () => setNow(Date.now());
    const start = () => { tick(); window.clearInterval(id); id = window.setInterval(tick, 1000); };
    const vis = () => (document.visibilityState === "visible" ? start() : window.clearInterval(id));
    start();
    document.addEventListener("visibilitychange", vis);
    return () => { window.clearInterval(id); document.removeEventListener("visibilitychange", vis); };
  }, []);
  const s = Math.floor(Math.max(0, target - now) / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Rio_Branco", ...o }).format(new Date(target));
  const C = 2 * Math.PI * 21;
  const dayLeft = (s % 86400) / 86400;

  return (
    <div className="xc" role="timer" aria-label={`Prova em ${fmt({ day: "2-digit", month: "long", year: "numeric" })}: faltam ${d} dias, ${h} horas e ${m} minutos`}>
      <span className="xc__days" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21" className="xc__track" />
          <circle cx="24" cy="24" r="21" className="xc__arc" strokeDasharray={C} strokeDashoffset={C * (1 - dayLeft)} />
        </svg>
        <b><Roll value={String(d)} /></b>
      </span>
      <span className="xc__info" aria-hidden="true">
        <small>dias para a prova</small>
        <span className="xc__clock">
          <Roll value={pad(h)} /><i>h</i><Roll value={pad(m)} /><i>m</i><Roll value={pad(sec)} /><i>s</i>
        </span>
        <span className="xc__date">{`${fmt({ day: "2-digit" })} ${fmt({ month: "short" }).replace(".", "")} ${fmt({ year: "numeric" })} · ${fmt({ weekday: "long" })}`}</span>
      </span>
    </div>
  );
}
