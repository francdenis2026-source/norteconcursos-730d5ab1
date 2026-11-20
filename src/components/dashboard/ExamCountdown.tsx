import * as React from "react";
import "@/styles/exam-countdown.css";

/** Prova às 8h no horário do Acre (UTC-5), salvo hora já informada na data. */
function examInstant(examDate: string) {
  return new Date(examDate.length > 10 ? examDate : `${examDate}T08:00:00-05:00`).getTime();
}
const pad = (n: number) => String(n).padStart(2, "0");

/** Dígito que "vira" (desce e entra) quando o valor muda. */
function Digit({ value }: { value: string }) {
  return (
    <span className="xc-digit" aria-hidden="true">
      <span key={value} className="xc-digit__in">{value}</span>
    </span>
  );
}
function Unit({ value, label }: { value: string; label: string }) {
  return (
    <span className="xc-unit">
      <span className="xc-unit__val">{value.split("").map((d, i) => <Digit key={i} value={d} />)}</span>
      <small>{label}</small>
    </span>
  );
}

/**
 * Contagem regressiva sincronizada com a data da prova do concurso escolhido: folha de calendário com o dia
 * da prova e relógio digital (dias, horas, minutos, segundos) cujos dígitos viram a cada mudança; uma linha
 * fina mostra quanto do dia atual já passou. Atualiza a cada segundo e pausa com a aba oculta.
 */
export function ExamCountdown({ examDate }: { examDate: string }) {
  const target = React.useMemo(() => examInstant(examDate), [examDate]);
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    let id = 0;
    const start = () => { setNow(Date.now()); id = window.setInterval(() => setNow(Date.now()), 1000); };
    const vis = () => { window.clearInterval(id); if (document.visibilityState === "visible") start(); };
    start();
    document.addEventListener("visibilitychange", vis);
    return () => { window.clearInterval(id); document.removeEventListener("visibilitychange", vis); };
  }, []);
  const left = Math.max(0, target - now);
  const s = Math.floor(left / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const dt = new Date(target);
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Rio_Branco", ...o }).format(dt);
  const dayFrac = 1 - (s % 86400) / 86400;
  const label = `Prova em ${fmt({ day: "2-digit", month: "long", year: "numeric" })}: faltam ${d} dias, ${h} horas e ${m} minutos`;

  return (
    <div className="xc" role="timer" aria-label={label}>
      <div className="xc-cal" aria-hidden="true">
        <span className="xc-cal__month">{fmt({ month: "short" }).replace(".", "")}</span>
        <span className="xc-cal__day">{fmt({ day: "2-digit" })}</span>
        <span className="xc-cal__year">{fmt({ weekday: "short" }).replace(".", "")} · {fmt({ year: "numeric" })}</span>
      </div>
      <div className="xc-clock">
        <small className="xc-clock__label"><i className="xc-live" /> Contagem para a prova</small>
        <div className="xc-clock__row" aria-hidden="true">
          <Unit value={String(d).padStart(2, "0")} label="dias" />
          <span className="xc-sep">:</span>
          <Unit value={pad(h)} label="horas" />
          <span className="xc-sep">:</span>
          <Unit value={pad(m)} label="min" />
          <span className="xc-sep">:</span>
          <Unit value={pad(sec)} label="seg" />
        </div>
        <span className="xc-day" aria-hidden="true"><i style={{ transform: `scaleX(${dayFrac})` }} /></span>
      </div>
    </div>
  );
}
