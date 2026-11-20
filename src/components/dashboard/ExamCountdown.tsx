import * as React from "react";
import "@/styles/exam-countdown.css";

/** Prova às 8h no horário do Acre (UTC-5), salvo hora já informada na data. */
function examInstant(examDate: string) {
  return new Date(examDate.length > 10 ? examDate : `${examDate}T08:00:00-05:00`).getTime();
}
const pad = (n: number, w = 2) => String(n).padStart(w, "0");

/**
 * Placa "split-flap" real: a metade de cima com o número antigo dobra para baixo (rotateX) revelando o novo,
 * e a metade de baixo do novo cai em seguida. Quatro camadas, só transform; reinicia a cada troca de valor.
 */
function Flap({ value }: { value: string }) {
  const prev = React.useRef(value);
  const [pair, setPair] = React.useState({ from: value, to: value, n: 0 });
  React.useEffect(() => {
    if (value !== prev.current) {
      setPair((p) => ({ from: prev.current, to: value, n: p.n + 1 }));
      prev.current = value;
    }
  }, [value]);
  const { from, to, n } = pair;
  return (
    <span className="xf" aria-hidden="true">
      <span className="xf-half xf-top"><b>{to}</b></span>
      <span className="xf-half xf-bot"><b>{n ? from : to}</b></span>
      {n > 0 && (
        <React.Fragment key={n}>
          <span className="xf-half xf-top xf-fold"><b>{from}</b></span>
          <span className="xf-half xf-bot xf-drop"><b>{to}</b></span>
        </React.Fragment>
      )}
    </span>
  );
}
function Unit({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <span className="xc-unit" data-accent={accent || undefined}>
      <span className="xc-unit__val">{value.split("").map((d, i) => <Flap key={i} value={d} />)}</span>
      <small>{label}</small>
    </span>
  );
}

/**
 * Contagem regressiva sincronizada com a data da prova do concurso escolhido.
 * Calendário de mesa (a folha do dia se solta quando a contagem de dias muda), placas split-flap para
 * dias/horas/minutos/segundos, anel dos segundos e barra do dia.  * Atualiza a cada segundo, pausa com a aba oculta; leitores de tela recebem um rótulo por minuto.
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

  const left = Math.max(0, target - now);
  const s = Math.floor(left / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const dt = new Date(target);
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Rio_Branco", ...o }).format(dt);

  // Folha do calendário: ao mudar o número de dias, a folha anterior se solta.
  const lastDays = React.useRef(d);
  const [tear, setTear] = React.useState<{ n: number; days: number } | null>(null);
  React.useEffect(() => {
    if (d !== lastDays.current) { setTear((t) => ({ n: (t?.n ?? 0) + 1, days: lastDays.current })); lastDays.current = d; }
  }, [d]);

  const label = `Prova em ${fmt({ day: "2-digit", month: "long", year: "numeric" })}: faltam ${d} dias, ${h} horas e ${m} minutos`;
  const ring = 2 * Math.PI * 15;

  return (
    <div className="xc" role="timer" aria-label={label}>
      <div className="xc-cal" aria-hidden="true" title={fmt({ weekday: "long", day: "2-digit", month: "long", year: "numeric" })}>
        <span className="xc-cal__rings"><i /><i /></span>
        <span className="xc-cal__month">{fmt({ month: "short" }).replace(".", "")} · {fmt({ year: "2-digit" })}</span>
        <span className="xc-cal__page">
          <b>{fmt({ day: "2-digit" })}</b>
        </span>
        {tear && (
          <span key={tear.n} className="xc-cal__tear">
            <b>{pad(tear.days)}</b>
          </span>
        )}
      </div>
      <div className="xc-board">
        <div className="xc-board__row" aria-hidden="true">
          <Unit value={pad(d, d > 99 ? 3 : 2)} label="dias" accent />
          <span className="xc-colon"><i /><i /></span>
          <Unit value={pad(h)} label="horas" />
          <span className="xc-colon"><i /><i /></span>
          <Unit value={pad(m)} label="min" />
          <span className="xc-colon"><i /><i /></span>
          <Unit value={pad(sec)} label="seg" />
        </div>
      </div>
      <span className="xc-day" aria-hidden="true"><i style={{ transform: `scaleX(${1 - (s % 86400) / 86400})` }} /></span>
      <svg className="xc-ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="15" />
        <circle cx="18" cy="18" r="15" className="xc-ring__fill" strokeDasharray={ring} strokeDashoffset={ring * (sec / 60)} />
        <text x="18" y="22">{pad(sec)}</text>
      </svg>
    </div>
  );
}
