import * as React from "react";
import { BookOpen, Video, ListChecks, PenLine, RotateCcw, Trophy, Coffee, Dumbbell, Moon, CalendarCheck2, ChevronLeft, ChevronRight, Clock, Flame, Target, Hourglass } from "lucide-react";
import { PCAC_ACTIVITY_LABEL, PCAC_PHASE_LABEL, type PcAcActivityType, type PcAcPlanDay, type PcAcPlanWeek } from "@/lib/pcAcreMasterPlan";
import type { PcAcWeeklyGridRow } from "@/lib/pcAcreStudyPlan";
import { findPcAcStudyResource, pcAcStudyResourceUrl } from "@/lib/pcAcStudyResources";
import "@/styles/cronograma-studio.css";

type Act = PcAcPlanDay["activities"][number];
export const NON_STUDY: ReadonlySet<PcAcActivityType> = new Set(["rotina", "pausa", "exercicio", "descanso", "compromisso"]);
export const DAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
export const WEEKDAY_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
export const fmtBr = (iso: string) => iso.split("-").reverse().join("/");
export const fmtShort = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");
export const toMin = (v?: string) => { if (!v) return 0; const [h, m] = v.split(":").map(Number); return (h ?? 0) * 60 + (m ?? 0); };
export const actMin = (a: Act) => a.minutes ?? Math.max(0, toMin(a.end) - toMin(a.start));
export const fmtDur = (m: number) => { const h = Math.floor(m / 60), r = m % 60; return h ? `${h}h${r ? String(r).padStart(2, "0") : ""}` : `${r}min`; };
export const studyMinutes = (d: PcAcPlanDay) => d.activities.filter((a) => !NON_STUDY.has(a.type)).reduce((s, a) => s + actMin(a), 0);

/** Ícone + animação: desenha o traço ao montar e repete um movimento próprio do tipo (virar página, pulsar, girar…). */
const ICONS: Record<PcAcActivityType, { Icon: React.ComponentType<{ "aria-hidden"?: boolean }>; anim: string }> = {
  teoria: { Icon: BookOpen, anim: "flip" }, video: { Icon: Video, anim: "pulse" }, questoes: { Icon: ListChecks, anim: "tick" },
  redacao: { Icon: PenLine, anim: "write" }, revisao: { Icon: RotateCcw, anim: "spin" }, simulado: { Icon: Trophy, anim: "bob" },
  descanso: { Icon: Moon, anim: "float" }, pausa: { Icon: Coffee, anim: "steam" }, rotina: { Icon: Coffee, anim: "steam" },
  exercicio: { Icon: Dumbbell, anim: "lift" }, compromisso: { Icon: CalendarCheck2, anim: "tick" },
};
export function Ani({ anim, children }: { anim: string; children: React.ReactNode }) { return <span className="cs-ai" data-ai={anim}>{children}</span>; }
export function TypeIcon({ type }: { type: PcAcActivityType }) { const { Icon, anim } = ICONS[type]; return <Ani anim={anim}><Icon aria-hidden /></Ani>; }

function useNow(ms = 30000) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => { const id = window.setInterval(() => setNow(new Date()), ms); return () => window.clearInterval(id); }, [ms]);
  return now;
}
function useCountUp(target: number, ms = 900) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    const t0 = performance.now(); let raf = 0;
    const tick = (n: number) => { const p = Math.min(1, (n - t0) / ms); setV(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function Ring({ value, size = 96, label, sub }: { value: number; size?: number; label: string; sub: string }) {
  const r = 42, c = 2 * Math.PI * r, shown = useCountUp(Math.round(value * 100));
  return (
    <div className="cs-ring" style={{ width: size, height: size }} role="img" aria-label={`${label}: ${Math.round(value * 100)}%`}>
      <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r={r} className="cs-ring__t" /><circle cx="50" cy="50" r={r} className="cs-ring__v" strokeDasharray={c} style={{ strokeDashoffset: c * (1 - value) }} /></svg>
      <b>{shown}<small>%</small></b><span>{sub}</span>
    </div>
  );
}

/** Rosca por tipo de atividade (minutos). */
function Donut({ parts }: { parts: { type: PcAcActivityType; minutes: number }[] }) {
  const total = parts.reduce((s, p) => s + p.minutes, 0) || 1, r = 38, c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg className="cs-donut" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r={r} className="cs-donut__t" />
      {parts.map((p) => { const len = (p.minutes / total) * c; const el = <circle key={p.type} cx="50" cy="50" r={r} className="cs-donut__s" data-type={p.type} strokeDasharray={`${Math.max(0, len - 1.5)} ${c}`} strokeDashoffset={-off} />; off += len; return el; })}
    </svg>
  );
}

type CommonProps = { todayKey: string; onOpenDay: (date: string) => void; renderShortcut: (a: Act) => React.ReactNode };

/* ================= HOJE ================= */
export function TodayView({ day, nextStudyDay, examDays, onOpenDay, renderShortcut }: CommonProps & { day: PcAcPlanDay | null; nextStudyDay?: PcAcPlanDay | undefined; examDays: number }) {
  const now = useNow();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (!day) {
    return (
      <div className="cs-empty"><Ani anim="float"><Moon aria-hidden /></Ani><h3>Hoje não há blocos planejados</h3>
        <p>{nextStudyDay ? `Seu próximo dia de estudo é ${WEEKDAY_FULL[nextStudyDay.weekday]}, ${fmtBr(nextStudyDay.date)}.` : "Ajuste seus dias de estudo em “Ajustes”."}</p>
        {nextStudyDay && <button type="button" className="cs-btn" onClick={() => onOpenDay(nextStudyDay.date)}>Ver esse dia <ChevronRight aria-hidden /></button>}
      </div>
    );
  }
  const acts = day.activities;
  const studyTotal = studyMinutes(day);
  const done = acts.filter((a) => !NON_STUDY.has(a.type) && a.end && toMin(a.end) <= nowMin).reduce((s, a) => s + actMin(a), 0);
  const current = acts.find((a) => a.start && a.end && toMin(a.start) <= nowMin && nowMin < toMin(a.end));
  const next = acts.find((a) => a.start && toMin(a.start) > nowMin);
  const byType = new Map<PcAcActivityType, number>();
  acts.forEach((a) => byType.set(a.type, (byType.get(a.type) ?? 0) + actMin(a)));
  const parts = [...byType].map(([type, minutes]) => ({ type, minutes })).sort((a, b) => b.minutes - a.minutes);
  const focus = current ?? next;
  const untilMin = focus?.start && !current ? toMin(focus.start) - nowMin : focus?.end ? toMin(focus.end) - nowMin : 0;

  return (
    <div className="cs-today">
      <section className="cs-pane cs-pane--timeline" aria-label="Linha do tempo de hoje">
        <header className="cs-pane__h"><h3><Ani anim="tick"><CalendarCheck2 aria-hidden /></Ani> {WEEKDAY_FULL[day.weekday]}, {fmtBr(day.date)}</h3><span className="cs-chip">{acts.length} blocos</span></header>
        <ol className="cs-tl">
          {acts.map((a, i) => {
            const state = a.start && a.end ? (toMin(a.end) <= nowMin ? "past" : toMin(a.start) <= nowMin ? "now" : "next") : "next";
            const isStudy = !NON_STUDY.has(a.type);
            return (
              <li key={i} className="cs-tl__row" data-type={a.type} data-state={state} style={{ animationDelay: `${Math.min(i, 14) * 35}ms` }}>
                <span className="cs-tl__time">{a.start ? <><b>{a.start}</b><i>{a.end}</i></> : <b>dia</b>}</span>
                <span className="cs-tl__dot"><TypeIcon type={a.type} /></span>
                <div className="cs-tl__body">
                  <p><b>{a.subject ?? PCAC_ACTIVITY_LABEL[a.type]}</b><span className="cs-tag" data-type={a.type}>{PCAC_ACTIVITY_LABEL[a.type]}</span>{a.start && <em>{fmtDur(actMin(a))}</em>}</p>
                  {(a.topic || a.detail) && <small>{a.topic ? `${a.topic} — ` : ""}{a.detail}</small>}
                </div>
                {isStudy && <span className="cs-tl__go">{renderShortcut(a)}</span>}
              </li>
            );
          })}
        </ol>
      </section>
      <aside className="cs-side">
        <section className="cs-pane cs-focus" data-live={current ? "now" : "next"}>
          <small className="cs-eyebrow">{current ? <><i className="cs-live" /> Agora</> : "Próximo bloco"}</small>
          {focus ? (
            <>
              <div className="cs-focus__t"><span className="cs-focus__ic" data-type={focus.type}><TypeIcon type={focus.type} /></span><div><b>{focus.subject ?? PCAC_ACTIVITY_LABEL[focus.type]}</b><small>{focus.start}–{focus.end} · {PCAC_ACTIVITY_LABEL[focus.type]}</small></div></div>
              <p className="cs-focus__c"><Hourglass aria-hidden /> {current ? "termina em" : "começa em"} <b>{fmtDur(Math.max(0, untilMin))}</b></p>
            </>
          ) : <p className="cs-muted">Sem mais blocos hoje. Bom descanso!</p>}
        </section>
        <section className="cs-pane cs-stats">
          <Ring value={studyTotal ? Math.min(1, done / studyTotal) : 0} label="Estudo de hoje" sub="do dia" />
          <dl><div><dt>Estudo</dt><dd>{fmtDur(studyTotal)}</dd></div><div><dt>Concluído</dt><dd>{fmtDur(done)}</dd></div><div><dt>Prova em</dt><dd>{examDays} d</dd></div></dl>
        </section>
        <section className="cs-pane cs-mix">
          <header className="cs-pane__h"><h3><Ani anim="bob"><Target aria-hidden /></Ani> Como o dia se divide</h3></header>
          <div className="cs-mix__body"><Donut parts={parts} /><ul>{parts.slice(0, 5).map((p) => <li key={p.type} data-type={p.type}><i />{PCAC_ACTIVITY_LABEL[p.type]}<b>{fmtDur(p.minutes)}</b></li>)}</ul></div>
        </section>
      </aside>
    </div>
  );
}

/* ================= SEMANA ================= */
export function WeekView({ weeks, weekIndex, setWeekIndex, todayKey, onOpenDay }: CommonProps & { weeks: PcAcPlanWeek[]; weekIndex: number; setWeekIndex: (n: number) => void }) {
  const week = weeks[Math.min(weekIndex, weeks.length - 1)];
  if (!week) return <div className="cs-empty"><Ani anim="float"><Moon aria-hidden /></Ani><h3>Sem semanas planejadas</h3><p>Faltam poucos dias para a prova: veja “Revisão final”.</p></div>;
  const total = week.days.reduce((s, d) => s + studyMinutes(d), 0);
  return (
    <div className="cs-week">
      <header className="cs-week__bar">
        <button type="button" className="cs-icon" aria-label="Semana anterior" disabled={weekIndex <= 0} onClick={() => setWeekIndex(weekIndex - 1)}><ChevronLeft aria-hidden /></button>
        <div className="cs-week__t" aria-live="polite"><b>Semana {week.weekNumber} de {weeks.length}</b><span>{fmtBr(week.startDate)} a {fmtBr(week.endDate)}</span></div>
        <span className="cs-phase" data-phase={week.phase}>{PCAC_PHASE_LABEL[week.phase]}</span>
        <span className="cs-chip"><Clock aria-hidden /> {fmtDur(total)} de estudo</span>
        <ol className="cs-pips" aria-label="Semanas">{weeks.map((w, i) => <li key={w.weekNumber}><button type="button" data-phase={w.phase} aria-current={i === weekIndex || undefined} title={`Semana ${w.weekNumber}`} onClick={() => setWeekIndex(i)}>{w.weekNumber}</button></li>)}</ol>
        <button type="button" className="cs-icon" aria-label="Próxima semana" disabled={weekIndex >= weeks.length - 1} onClick={() => setWeekIndex(weekIndex + 1)}><ChevronRight aria-hidden /></button>
      </header>
      <ul className="cs-cols" style={{ gridTemplateColumns: `repeat(${week.days.length}, minmax(0, 1fr))` }}>
        {week.days.map((d, ci) => {
          const sm = studyMinutes(d);
          return (
            <li key={d.date} style={{ animationDelay: `${ci * 45}ms` }}>
              <button type="button" className="cs-col" data-today={d.date === todayKey || undefined} data-rest={sm === 0 || undefined} onClick={() => onOpenDay(d.date)} aria-label={`${WEEKDAY_FULL[d.weekday]} ${fmtBr(d.date)}: abrir dia`}>
                <span className="cs-col__h"><b>{DAY_SHORT[d.weekday]}</b><i>{fmtShort(d.date)}</i>{d.date === todayKey && <em>Hoje</em>}<small>{sm ? fmtDur(sm) : "livre"}</small></span>
                <span className="cs-col__b">
                  {d.activities.filter((a) => a.type !== "rotina").map((a, i) => (
                    <span key={i} className="cs-blk" data-type={a.type} style={{ flexGrow: Math.max(8, actMin(a)) }} title={`${a.start ?? ""} ${PCAC_ACTIVITY_LABEL[a.type]}${a.subject ? " · " + a.subject : ""}`}>
                      <TypeIcon type={a.type} /><span><b>{a.subject ?? PCAC_ACTIVITY_LABEL[a.type]}</b><small>{a.start ? `${a.start}–${a.end}` : ""}</small></span>
                    </span>
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <footer className="cs-legend">{(["teoria", "questoes", "revisao", "simulado", "redacao", "exercicio", "pausa", "compromisso"] as PcAcActivityType[]).map((t) => <span key={t} data-type={t}><i />{PCAC_ACTIVITY_LABEL[t]}</span>)}</footer>
    </div>
  );
}

/* ================= PLANO COMPLETO (mapa de calor) ================= */
export function PlanView({ weeks, todayKey, onOpenDay, onPickWeek }: Omit<CommonProps, "renderShortcut"> & { weeks: PcAcPlanWeek[]; onPickWeek: (i: number) => void }) {
  const all = weeks.flatMap((w) => w.days);
  const mins = all.map(studyMinutes).filter((m) => m > 0), max = Math.max(60, ...mins), min = Math.min(max - 1, ...(mins.length ? mins : [0]));
  const totalMin = all.reduce((s, d) => s + studyMinutes(d), 0);
  const blocks = all.reduce((s, d) => s + d.activities.filter((a) => !NON_STUDY.has(a.type)).length, 0);
  const phases = (["fundamentos", "pratica", "revisao"] as const).map((p) => ({ p, n: weeks.filter((w) => w.phase === p).length }));
  const hours = useCountUp(Math.round(totalMin / 60));
  if (!weeks.length) return <div className="cs-empty"><h3>Sem plano para o período</h3></div>;
  return (
    <div className="cs-plan">
      <section className="cs-pane cs-heat" aria-label="Mapa do plano">
        <header className="cs-pane__h"><h3><Ani anim="flip"><ListChecks aria-hidden /></Ani> Mapa do plano · cada quadrado é um dia</h3>
          <span className="cs-scale" aria-hidden="true">menos <i /><i /><i /><i /> mais</span></header>
        <div className="cs-heat__grid" style={{ gridTemplateRows: `auto repeat(${weeks.length}, minmax(34px, 1fr))` }}>
          <div className="cs-heat__head"><span />{[1, 2, 3, 4, 5, 6, 0].map((d) => <b key={d}>{DAY_SHORT[d]}</b>)}</div>
          {weeks.map((w, wi) => (
            <div key={w.weekNumber} className="cs-heat__row" data-phase={w.phase} style={{ animationDelay: `${wi * 40}ms` }}>
              <button type="button" className="cs-heat__w" onClick={() => onPickWeek(wi)} title={PCAC_PHASE_LABEL[w.phase]}><b>S{w.weekNumber}</b><small>{fmtShort(w.startDate)}</small></button>
              {[1, 2, 3, 4, 5, 6, 0].map((wd) => {
                const d = w.days.find((x) => x.weekday === wd);
                if (!d) return <span key={wd} className="cs-heat__c" data-empty />;
                const sm = studyMinutes(d);
                return <button key={wd} type="button" className="cs-heat__c" data-today={d.date === todayKey || undefined} style={{ "--i": sm ? 0.25 + 0.75 * ((sm - min) / Math.max(1, max - min)) : 0 } as React.CSSProperties} onClick={() => onOpenDay(d.date)} aria-label={`${WEEKDAY_FULL[wd]} ${fmtBr(d.date)}: ${sm ? fmtDur(sm) : "sem estudo"}`}><span>{d.date.slice(8)}</span>{sm > 0 && <small>{fmtDur(sm)}</small>}</button>;
              })}
            </div>
          ))}
        </div>
      </section>
      <aside className="cs-side">
        <section className="cs-pane cs-kpis"><div><b>{weeks.length}</b><span>semanas</span></div><div><b>{hours}h</b><span>de estudo</span></div><div><b>{blocks}</b><span>blocos</span></div></section>
        <section className="cs-pane cs-phases"><header className="cs-pane__h"><h3><Ani anim="bob"><Flame aria-hidden /></Ani> Fases do plano</h3></header>
          <ol>{phases.map(({ p, n }) => <li key={p} data-phase={p}><span>{PCAC_PHASE_LABEL[p]}</span><b>{n} sem.</b><i style={{ width: `${(n / weeks.length) * 100}%` }} /></li>)}</ol>
        </section>
      </aside>
    </div>
  );
}

/* ================= DISCIPLINAS ================= */
export function DisciplinesView({ grid, empty }: { grid: PcAcWeeklyGridRow[]; empty: string }) {
  if (!grid.length) return <div className="cs-empty"><h3>Disciplinas</h3><p>{empty}</p></div>;
  const max = Math.max(...grid.map((g) => g.totalMinutes), 1);
  return (
    <div className="cs-disc">
      <ul>
        {grid.map((g, i) => {
          const res = findPcAcStudyResource(g.name);
          return (
            <li key={g.id} style={{ animationDelay: `${Math.min(i, 16) * 30}ms` }}>
              <span className="cs-disc__n"><b>{g.name}</b><span className="cs-peso" data-peso={g.peso}>peso {g.peso}</span></span>
              <span className="cs-disc__bar"><i style={{ width: `${(g.totalMinutes / max) * 100}%` }} /></span>
              <span className="cs-disc__m">{fmtDur(g.totalMinutes)}/sem</span>
              <span className="cs-disc__d" aria-label="Dias da semana">{[1, 2, 3, 4, 5, 6, 0].map((d) => <i key={d} data-on={g.days.includes(d) || undefined}>{DAY_SHORT[d]![0]}</i>)}</span>
              {res ? <a className="cs-disc__a" href={pcAcStudyResourceUrl(res.courseId)}>Teoria <ChevronRight aria-hidden /></a> : <span />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ================= REVISÃO FINAL ================= */
export function FinalView({ days }: { days: PcAcPlanDay[] }) {
  return (
    <div className="cs-final">
      <header><Ani anim="float"><Flame aria-hidden /></Ani><div><h3>Reta final</h3><p>Nada de conteúdo novo: revisar, descansar e chegar tranquilo à prova.</p></div></header>
      <ol>{days.map((d, i) => <li key={d.date} style={{ animationDelay: `${i * 70}ms` }}><span className="cs-final__d"><b>{DAY_SHORT[d.weekday]}</b><i>{fmtShort(d.date)}</i></span><p>{d.activities[0]?.detail}</p></li>)}</ol>
    </div>
  );
}
