import * as React from "react";
import { examInstant } from "@/lib/examClock";
import { platformNow } from "@/lib/platformClock";
import "@/styles/exam-countdown.css";


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
 * Contagem regressiva da prova do concurso escolhido: dias em destaque num anel graduado, módulos de horas, minutos e segundos com dígitos que rolam, e a data da prova. Atualiza a cada segundo, pausa com a aba oculta.
 */
export function ExamCountdown({ examDate }: { examDate: string }) {
  const target = React.useMemo(() => examInstant(examDate), [examDate]);
  const [now, setNow] = React.useState(() => platformNow());
  // Os dígitos só rolam depois da primeira exibição: na abertura da página nada se mexe nem muda de tamanho.
  const [live, setLive] = React.useState(false);
  React.useEffect(() => {
    const id = window.setTimeout(() => setLive(true), 1200);
    return () => window.clearTimeout(id);
  }, []);
  React.useEffect(() => {
    let id = 0;
    const tick = () => setNow(platformNow());
    const start = () => { tick(); window.clearInterval(id); id = window.setInterval(tick, 1000); };
    const vis = () => (document.visibilityState === "visible" ? start() : window.clearInterval(id));
    start();
    document.addEventListener("visibilitychange", vis);
    return () => { window.clearInterval(id); document.removeEventListener("visibilitychange", vis); };
  }, []);
  const s = Math.floor(Math.max(0, target - now) / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Rio_Branco", ...o }).format(new Date(target));
  const R = 23;
  const C = 2 * Math.PI * R;
  const dayLeft = (s % 86400) / 86400;

  return (
    <span className="xr" aria-hidden="true">
      {value.split("").map((c, i) => (
        <span key={`${i}-${c}`} className="xr__d">{c}</span>
      ))}
    </span>
  );
}

/**
 * Contagem regressiva da prova do concurso escolhido: dias em destaque num anel graduado, módulos de horas, minutos e segundos com dígitos que rolam, e a data da prova. Atualiza a cada segundo, pausa com a aba oculta.
 */
export function ExamCountdown({ examDate }: { examDate: string }) {
  const target = React.useMemo(() => examInstant(examDate), [examDate]);
  const [now, setNow] = React.useState(() => platformNow());
  // Os dígitos só rolam depois da primeira exibição: na abertura da página nada se mexe nem muda de tamanho.
  const [live, setLive] = React.useState(false);
  React.useEffect(() => {
    const id = window.setTimeout(() => setLive(true), 1200);
    return () => window.clearTimeout(id);
  }, []);
  React.useEffect(() => {
    let id = 0;
    const tick = () => setNow(platformNow());
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
    <div className="xc" data-live={live ? "true" : "false"} role="timer" aria-label={`Prova em ${fmt({ day: "2-digit", month: "long", year: "numeric" })}: faltam ${d} dias, ${h} horas e ${m} minutos`}>
      <span className="xc__days" aria-hidden="true">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" className="xc__ticks" />
          <circle cx="30" cy="30" r={R} className="xc__track" />
          <circle cx="30" cy="30" r={R} className="xc__arc" strokeDasharray={C} strokeDashoffset={C * (1 - dayLeft)} />
        </svg>
        <b><Roll value={String(d)} /></b>
        <em>dias</em>
      </span>
      <span className="xc__info" aria-hidden="true">
        <span className="xc__date">
          <small>Prova</small>
          {`${fmt({ day: "2-digit" })} ${fmt({ month: "short" }).replace(".", "")} ${fmt({ year: "numeric" })} · ${fmt({ weekday: "long" })}`}
        </span>
        <span className="xc__clock">
          <span className="xc__cell"><Roll value={pad(h)} /><i>horas</i></span>
          <span className="xc__cell"><Roll value={pad(m)} /><i>min</i></span>
          <span className="xc__cell"><Roll value={pad(sec)} /><i>seg</i></span>
        </span>
      </span>
    </div>
  );
}
