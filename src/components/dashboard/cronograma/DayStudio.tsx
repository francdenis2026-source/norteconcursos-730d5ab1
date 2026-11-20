import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "@/styles/cronograma-day.css";

export type DayItem = {
  key: number;
  type: string;
  Icon: React.ComponentType<{ "aria-hidden"?: boolean }>;
  label: string;
  start?: string | undefined;
  end?: string | undefined;
  minutes: number;
  subject?: string | undefined;
  topic?: string | undefined;
  detail: string;
  isStudy: boolean;
  actions: React.ReactNode;
};
export type DayType = { type: string; label: string; Icon: DayItem["Icon"]; count: number; minutes: number };
export type DayChip = { tone: "gold" | "blue" | "green" | "rose"; Icon: DayItem["Icon"]; text: React.ReactNode };

const fmt = (m: number) => {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h ? (r ? `${h}h${String(r).padStart(2, "0")}` : `${h}h`) : `${r}min`;
};

/** Dia aberto em tela cheia: cabeçalho único, trilho de tipos e linha do tempo em colunas que ocupam toda a janela. */
export function DayStudio(props: {
  title: string;
  subtitle: string;
  chips: DayChip[];
  items: DayItem[];
  types: DayType[];
  weekClass: string;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const { title, subtitle, chips, items, types, weekClass, hasPrev, hasNext, onPrev, onNext, onClose } = props;
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const total = types.reduce((s, t) => s + t.minutes, 0) || 1;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrev) onPrev();
      else if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [hasPrev, hasNext, onPrev, onNext, onClose]);

  React.useEffect(() => { bodyRef.current?.scrollTo({ top: 0 }); }, [title]);
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="cd-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className={`cd-panel ${weekClass}`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="cd-head">
          <div className="cd-head__title">
            <h2>{title}</h2>
            <small>{subtitle}</small>
          </div>
          <div className="cd-chips">
            {chips.map((c, i) => (
              <span key={i} data-tone={c.tone} style={{ "--d": `${i * 50}ms` } as React.CSSProperties}><c.Icon aria-hidden />{c.text}</span>
            ))}
          </div>
          <nav className="cd-nav" aria-label="Navegar entre dias">
            <button type="button" onClick={onPrev} disabled={!hasPrev} aria-label="Dia anterior"><ChevronLeft aria-hidden /><span>Anterior</span></button>
            <button type="button" onClick={onNext} disabled={!hasNext} aria-label="Próximo dia"><span>Próximo</span><ChevronRight aria-hidden /></button>
            <button type="button" className="cd-close" onClick={onClose} aria-label="Fechar"><X aria-hidden /></button>
          </nav>
        </header>

        <div className="cd-shape" role="img" aria-label="Distribuição do dia por tipo de atividade">
          {types.map((t) => (
            <i key={t.type} data-type={t.type} style={{ flexGrow: Math.max(t.minutes, 1) } as React.CSSProperties} title={`${t.label} · ${fmt(t.minutes)}`} />
          ))}
        </div>

        <div className="cd-body">
          <aside className="cd-rail" aria-label="Resumo por tipo">
            <p>Neste dia</p>
            <ul>
              {types.map((t, i) => (
                <li key={t.type} data-type={t.type} style={{ "--d": `${i * 40}ms`, "--p": `${Math.round((t.minutes / total) * 100)}%` } as React.CSSProperties}>
                  <span className="cd-ico"><t.Icon aria-hidden /></span>
                  <b>{t.label}</b>
                  <em>{t.count}× · {fmt(t.minutes)}</em>
                  <u aria-hidden />
                </li>
              ))}
            </ul>
          </aside>
          <div className="cd-scroll" ref={bodyRef}>
            <ol className="cd-timeline">
              {items.map((it, i) => (
                <li key={it.key} className="cd-item" data-type={it.type} data-kind={it.isStudy ? "study" : "other"} style={{ "--d": `${Math.min(i, 14) * 35}ms` } as React.CSSProperties}>
                  <span className="cd-time">{it.start ? <><b>{it.start}</b><small>{it.end}</small></> : <b>Dia todo</b>}</span>
                  <span className="cd-dot"><it.Icon aria-hidden /></span>
                  <div className="cd-card">
                    <p className="cd-card__head">
                      <span className="cd-tag">{it.label}</span>
                      {it.subject && <strong>{it.subject}</strong>}
                      {it.start && <em>{fmt(it.minutes)}</em>}
                    </p>
                    {it.topic && <p className="cd-card__topic">{it.topic}</p>}
                    {it.detail && <p className="cd-card__detail">{it.detail}</p>}
                    {it.actions && <p className="cd-card__acts">{it.actions}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
