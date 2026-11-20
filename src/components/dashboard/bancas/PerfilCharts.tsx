import * as React from "react";

export const CHART_COLORS = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)", "var(--c6)"];

export type Slice = { key: string; label: string; value: number; color: string };

const TAU = Math.PI * 2;

/** Rosca interativa: o trecho sob o mouse (ou selecionado) cresce e o centro mostra o valor. */
export function Donut({ slices, active, onHover, onPick, centerTitle, centerValue }: {
  slices: Slice[]; active: string | null; onHover: (k: string | null) => void; onPick: (k: string) => void;
  centerTitle: string; centerValue: string;
}) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const r = 44;
  const C = TAU * r;
  let acc = 0;
  return (
    <div className="pf-donut" role="img" aria-label="Distribuição por disciplina">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} className="pf-donut__track" />
        {slices.map((s, i) => {
          const len = (s.value / total) * C;
          const off = -acc;
          acc += len;
          const on = active === s.key;
          return (
            <circle
              key={s.key}
              cx="60" cy="60" r={r}
              className="pf-donut__seg"
              data-on={on} data-dim={active !== null && !on}
              style={{ stroke: s.color, strokeDasharray: `${Math.max(len - 1.5, 0.1)} ${C}`, strokeDashoffset: off, animationDelay: `${i * 60}ms` }}
              onMouseEnter={() => onHover(s.key)} onMouseLeave={() => onHover(null)} onClick={() => onPick(s.key)}
            />
          );
        })}
      </svg>
      <div className="pf-donut__c"><small>{centerTitle}</small><b>{centerValue}</b></div>
    </div>
  );
}

/** Itens por ano de prova: colunas com dica ao apontar. */
export function YearBars({ data }: { data: { year: number; items: number; exams: number }[] }) {
  const [hover, setHover] = React.useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.items));
  const h = hover != null ? data.find((d) => d.year === hover) : null;
  return (
    <div className="pf-years">
      <p className="pf-years__tip" aria-live="polite">
        {h ? <><b>{h.year}</b> · {h.items} questões · {h.exams} {h.exams === 1 ? "prova" : "provas"}</> : <span>Aponte uma coluna para ver o ano</span>}
      </p>
      <div className="pf-years__cols" role="img" aria-label="Questões por ano">
        {data.map((d, i) => (
          <button key={d.year} type="button" className="pf-years__col" data-on={hover === d.year} onMouseEnter={() => setHover(d.year)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(d.year)} onBlur={() => setHover(null)} aria-label={`${d.year}: ${d.items} questões`}>
            <i style={{ height: `${Math.max(6, (d.items / max) * 100)}%`, animationDelay: `${i * 30}ms` }} />
            <span>{String(d.year).slice(2)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
