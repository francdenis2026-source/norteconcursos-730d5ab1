import * as React from "react";
import { Link } from "@tanstack/react-router";
import "@/styles/idecan-studio.css";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpenText, CalendarClock, ClipboardList, Gauge, Info, Landmark, LayoutGrid, Loader2, Minus, PieChart, Radar, ScanSearch, Target, TrendingUp } from "lucide-react";
import { CONFIDENCE_LABEL, answerStats, confidence, dedupeQuestions, examKey, recommendations, recurringThemes, sequenceStats, splitByKind, subjectProfile, type BancaQuestion, type Confidence, type Verdict } from "@/lib/bancaProfile";
import { INVESTIGATOR_FOCUS, INVESTIGATOR_RADAR } from "@/data/pcAcreIdecanRadar";

const PC_CAREERS = new Set(["Delegado de Polícia", "Escrivão de Polícia", "Agente / Investigador de Polícia"]);
const CURRENT_YEAR = new Date().getFullYear();
const COLORS = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)", "var(--c6)"];
const OTHER = "var(--c7)";
const pct = (v: number, d = 0) => `${(v * 100).toFixed(d).replace(".", ",")}%`;
const VERDICT_LABEL: Record<Verdict["level"], string> = { sem_dados: "Dados insuficientes", sem_padrao: "Sem padrão", indicio: "Indício fraco", padrao: "Diferença estatística" };
const CONF_LEVEL: Record<Confidence, number> = { insuficiente: 1, baixa: 2, media: 3, alta: 4 };
const TABS = [
  { id: "panorama", label: "Panorama", icon: PieChart },
  { id: "disciplinas", label: "Disciplinas", icon: LayoutGrid },
  { id: "provas", label: "Provas", icon: Landmark },
  { id: "gabaritos", label: "Gabaritos", icon: ScanSearch },
  { id: "plano", label: "Plano de ação", icon: Target },
] as const;
type TabId = (typeof TABS)[number]["id"];

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function CountUp({ to }: { to: number }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (reduced()) { setV(to); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 700);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}</>;
}

type Slice = { key: string; label: string; value: number; color: string };

function Donut({ slices, active, onHover, onPick, title, value, label }: {
  slices: Slice[]; active: string | null; onHover: (k: string | null) => void; onPick: (k: string) => void; title: string; value: string; label: string;
}) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const r = 44;
  const C = Math.PI * 2 * r;
  let acc = 0;
  return (
    <div className="ix-donut" role="img" aria-label={label}>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} className="ix-donut__track" />
        {slices.map((s, i) => {
          const len = (s.value / total) * C;
          const off = -acc;
          acc += len;
          const on = active === s.key;
          return (
            <circle key={s.key} cx="60" cy="60" r={r} className="ix-donut__seg" data-on={on} data-dim={active !== null && !on}
              style={{ stroke: s.color, strokeDasharray: `${Math.max(len - 1.5, 0.1)} ${C}`, strokeDashoffset: off, animationDelay: `${i * 60}ms` }}
              onMouseEnter={() => onHover(s.key)} onMouseLeave={() => onHover(null)} onClick={() => onPick(s.key)} />
          );
        })}
      </svg>
      <div className="ix-donut__c"><small>{title}</small><b>{value}</b></div>
    </div>
  );
}

function TrendIcon({ t }: { t: "sobe" | "cai" | "estavel" | null }) {
  if (t === "sobe") return <ArrowUpRight aria-label="em alta" />;
  if (t === "cai") return <ArrowDownRight aria-label="em queda" />;
  if (t === "estavel") return <Minus aria-label="estável" />;
  return null;
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="ix-empty"><Info aria-hidden="true" />{children}</p>;
}

export function IdecanIntelligenceWorkspace({ rows, loading = false, error = false, onRetry }: {
  rows: BancaQuestion[];
  loading?: boolean;
  error?: boolean;
  onRetry: () => void;
}) {
  const [tab, setTab] = React.useState<TabId>("panorama");
  const [sel, setSel] = React.useState<string | null>(null);
  const [hov, setHov] = React.useState<string | null>(null);
  const [examSel, setExamSel] = React.useState(0);
  const [cell, setCell] = React.useState<string | null>(null);
  const [yearHov, setYearHov] = React.useState<number | null>(null);
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const resize = () => node.style.setProperty("--ix-h", `${Math.max(420, window.innerHeight - node.getBoundingClientRect().top - 14)}px`);
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    if (node.parentElement) ro.observe(node.parentElement);
    const shell = node.closest(".app-shell");
    const mo = new MutationObserver(resize);
    if (shell) mo.observe(shell, { attributes: true, attributeFilter: ["class", "data-focus-mode"] });
    window.addEventListener("resize", resize);
    document.addEventListener("fullscreenchange", resize);
    resize();
    return () => { ro.disconnect(); mo.disconnect(); window.removeEventListener("resize", resize); document.removeEventListener("fullscreenchange", resize); };
  }, []);

  const all = React.useMemo(() => dedupeQuestions(rows), [rows]);
  const pcRows = React.useMemo(() => all.filter((r) => PC_CAREERS.has(r.career)), [all]);
  const examsAll = React.useMemo(() => new Set(all.map(examKey)).size, [all]);
  const examsPc = React.useMemo(() => new Set(pcRows.map(examKey)).size, [pcRows]);
  const conf = confidence(pcRows.length, examsPc);

  const currentYear = React.useMemo(() => {
    const m = new Map<string, { contest: string; career: string; items: number }>();
    for (const r of all) {
      if (r.year !== CURRENT_YEAR) continue;
      const k = `${examKey(r)}|${r.rawCareer ?? r.career}`;
      const cur = m.get(k) ?? { contest: r.contest, career: r.rawCareer || r.career, items: 0 };
      cur.items += 1;
      m.set(k, cur);
    }
    return [...m.values()].sort((a, b) => a.contest.localeCompare(b.contest, "pt-BR"));
  }, [all]);

  const profile = React.useMemo(() => subjectProfile(pcRows), [pcRows]);
  const subjects = profile.subjects;
  const colorOf = React.useCallback((subject: string) => {
    const i = subjects.findIndex((s) => s.subject === subject);
    return i >= 0 && i < COLORS.length ? COLORS[i]! : OTHER;
  }, [subjects]);

  const matrix = React.useMemo(() => {
    const m = new Map<string, { key: string; contest: string; year: number; career: string; items: number; subj: Map<string, number> }>();
    for (const r of pcRows) {
      const key = `${examKey(r)}|${r.rawCareer ?? r.career}`;
      const cur = m.get(key) ?? { key, contest: r.contest, year: r.year, career: r.rawCareer || r.career, items: 0, subj: new Map<string, number>() };
      cur.items += 1;
      cur.subj.set(r.subject, (cur.subj.get(r.subject) ?? 0) + 1);
      m.set(key, cur);
    }
    return [...m.values()].sort((a, b) => b.year - a.year || a.contest.localeCompare(b.contest, "pt-BR"));
  }, [pcRows]);

  const years = React.useMemo(() => {
    const m = new Map<number, { items: number; exams: Set<string> }>();
    for (const r of pcRows) {
      const cur = m.get(r.year) ?? { items: 0, exams: new Set<string>() };
      cur.items += 1;
      cur.exams.add(examKey(r));
      m.set(r.year, cur);
    }
    return [...m.entries()].map(([year, v]) => ({ year, items: v.items, exams: v.exams.size })).sort((a, b) => a.year - b.year);
  }, [pcRows]);

  const themes = React.useMemo(
    () => subjects.slice(0, 5).map((s) => ({ subject: s.subject, themes: recurringThemes(pcRows, s.subject) })).filter((t) => t.themes.length > 0),
    [subjects, pcRows],
  );
  const topThemes = React.useMemo(
    () => themes.flatMap((t) => t.themes.map((x) => ({ ...x, subject: t.subject }))).sort((a, b) => b.exams - a.exams || b.items - a.items).filter((t, i, arr) => arr.findIndex((o) => o.label === t.label) === i).slice(0, 8),
    [themes],
  );
  const kinds = React.useMemo(() => splitByKind(pcRows), [pcRows]);
  const answersCe = kinds.ce.length ? answerStats(kinds.ce) : null;
  const answersMc = kinds.mc.length ? answerStats(kinds.mc) : null;
  const sequence = answersCe ? sequenceStats(kinds.ce) : null;
  const recs = React.useMemo(
    () => recommendations({
      board: "IDECAN", career: "Polícia Civil",
      answerKinds: [...(answersCe ? (["ce"] as const) : []), ...(answersMc ? (["mc"] as const) : [])],
      subjects, themes, conf,
    }),
    [answersCe, answersMc, subjects, themes, conf],
  );

  const active = sel ?? subjects[0]?.subject ?? null;
  const activeSubject = subjects.find((s) => s.subject === active) ?? null;
  const activeThemes = React.useMemo(() => (active ? recurringThemes(pcRows, active, 1).slice(0, 8) : []), [pcRows, active]);
  const maxShare = Math.max(0.0001, ...subjects.map((s) => s.share));

  const donutSlices: Slice[] = React.useMemo(() => {
    const top = subjects.slice(0, 6).map((s, i) => ({ key: s.subject, label: s.subject, value: s.share, color: COLORS[i]! }));
    const rest = subjects.slice(6).reduce((a, s) => a + s.share, 0);
    return rest > 0 ? [...top, { key: "__outras", label: "Outras disciplinas", value: rest, color: OTHER }] : top;
  }, [subjects]);
  const focus = hov ?? active;
  const focusSlice = donutSlices.find((s) => s.key === focus) ?? null;
  const total = donutSlices.reduce((a, s) => a + s.value, 0) || 1;

  const state = loading
    ? <section role="status" className="ix-state"><Loader2 className="animate-spin" aria-hidden="true" /> Carregando análise IDECAN…</section>
    : error
      ? <section role="alert" className="ix-state"><p>Não foi possível carregar as provas. Tente novamente.</p><button type="button" className="ix-btn" onClick={onRetry}>Tentar novamente</button></section>
      : null;

  const pick = (k: string) => { if (k !== "__outras") setSel(k); };

  /* ---------- painéis ---------- */
  const panorama = (
    <div className="ix-grid ix-grid--pan">
      <section className="ix-pane ix-pane--donut" style={{ ["--d" as string]: "0ms" }}>
        <header><h2><PieChart aria-hidden="true" />Peso por disciplina</h2><small>média por prova</small></header>
        {subjects.length ? <>
          <Donut slices={donutSlices} active={focus} onHover={setHov} onPick={pick} title={focusSlice ? "participação" : "disciplinas"} value={focusSlice ? pct(focusSlice.value / total, 1) : String(subjects.length)} label="Participação de cada disciplina nas provas de Polícia Civil" />
          <p className="ix-donut__name" style={{ color: focusSlice?.color }}>{focusSlice?.label ?? "Aponte uma fatia"}</p>
          {activeSubject && <div className="ix-detail">
            <h3>{activeSubject.subject}</h3>
            <p><span>~<b>{Math.round(activeSubject.avgItems)}</b> itens/prova</span><span><b>{activeSubject.exams}</b> provas</span>{activeSubject.trend && <span className="ix-trend" data-t={activeSubject.trend}><TrendIcon t={activeSubject.trend} />{activeSubject.trend === "sobe" ? "em alta" : activeSubject.trend === "cai" ? "em queda" : "estável"}</span>}</p>
            <div className="ix-actions">
              <Link to="/dashboard/question-trainer" search={{ board: "IDECAN", subject: activeSubject.subject }} className="ix-btn ix-btn--gold"><Target aria-hidden="true" />Treinar</Link>
              <Link to="/dashboard/library" search={{ collection: "subjects", discipline: activeSubject.subject }} className="ix-btn"><BookOpenText aria-hidden="true" />Teoria</Link>
            </div>
          </div>}
        </> : <Empty>Ainda sem dados suficientes para calcular o peso por disciplina.</Empty>}
      </section>

      <section className="ix-pane ix-pane--rank" style={{ ["--d" as string]: "60ms" }}>
        <header><h2><TrendingUp aria-hidden="true" />Ranking de cobrança</h2><small>clique para detalhar</small></header>
        <ul className="ix-bars">
          {subjects.slice(0, 12).map((s, i) => (
            <li key={s.subject} style={{ ["--c" as string]: colorOf(s.subject), ["--d" as string]: `${i * 40}ms` }}>
              <button type="button" data-on={s.subject === active} onClick={() => setSel(s.subject)} onMouseEnter={() => setHov(s.subject)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(s.subject)} onBlur={() => setHov(null)}>
                <span className="ix-bars__n" title={s.subject}>{s.subject}</span>
                <span className="ix-bars__t"><i style={{ width: `${(s.share / maxShare) * 100}%` }} /></span>
                <span className="ix-bars__v">{pct(s.share, 1)}</span>
                <span className="ix-bars__tr" data-t={s.trend ?? ""}><TrendIcon t={s.trend} /></span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="ix-pane ix-pane--year" style={{ ["--d" as string]: "120ms" }}>
        <header><h2><CalendarClock aria-hidden="true" />Questões por ano</h2><small>Polícia Civil</small></header>
        {years.length ? <>
          <p className="ix-tip" aria-live="polite">{yearHov != null ? (() => { const y = years.find((d) => d.year === yearHov); return y ? <><b>{y.year}</b> · {y.items} questões · {y.exams} {y.exams === 1 ? "prova" : "provas"}</> : null; })() : <span>Aponte uma coluna</span>}</p>
          <div className="ix-cols" role="img" aria-label="Questões de Polícia Civil por ano">
            {(() => { const max = Math.max(1, ...years.map((d) => d.items)); return years.map((d, i) => (
              <button key={d.year} type="button" data-on={yearHov === d.year} onMouseEnter={() => setYearHov(d.year)} onMouseLeave={() => setYearHov(null)} onFocus={() => setYearHov(d.year)} onBlur={() => setYearHov(null)} aria-label={`${d.year}: ${d.items} questões`}>
                <i style={{ height: `${Math.max(6, (d.items / max) * 100)}%`, animationDelay: `${i * 35}ms` }} /><span>{String(d.year).slice(2)}</span>
              </button>
            )); })()}
          </div>
        </> : <Empty>Sem provas de Polícia Civil no acervo.</Empty>}
      </section>

      <section className="ix-pane ix-pane--themes" style={{ ["--d" as string]: "180ms" }}>
        <header><h2><Radar aria-hidden="true" />Assuntos que se repetem</h2><small>provas em que apareceu</small></header>
        {topThemes.length ? <ul className="ix-bars ix-bars--sm">
          {topThemes.map((t, i) => (
            <li key={`${t.subject}-${t.label}`} style={{ ["--c" as string]: colorOf(t.subject), ["--d" as string]: `${i * 40}ms` }}>
              <Link to="/dashboard/question-trainer" search={{ board: "IDECAN", subject: t.subject, topic: t.label }} className="ix-bars__row" title={`${t.subject} · ${t.items} itens`}>
                <span className="ix-bars__n">{t.label}</span>
                <span className="ix-bars__t"><i style={{ width: `${(t.exams / Math.max(1, topThemes[0]!.exams)) * 100}%` }} /></span>
                <span className="ix-bars__v">{t.exams}×</span>
              </Link>
            </li>
          ))}
        </ul> : <Empty>Nenhum assunto se repetiu em mais de uma prova ainda.</Empty>}
      </section>
    </div>
  );

  const heatCols = matrix.slice(0, 14).reverse();
  const heatRows = subjects.slice(0, 10);
  const heatMax = Math.max(0.0001, ...heatRows.flatMap((s) => heatCols.map((e) => (e.subj.get(s.subject) ?? 0) / e.items)));
  const cellInfo = (() => {
    if (!cell) return null;
    const [si, ei] = cell.split("|").map(Number) as [number, number];
    const s = heatRows[si]; const e = heatCols[ei];
    if (!s || !e) return null;
    const n = e.subj.get(s.subject) ?? 0;
    return { subject: s.subject, exam: `${e.contest} · ${e.year}`, n, share: n / e.items };
  })();

  const disciplinas = (
    <div className="ix-grid ix-grid--dis">
      <section className="ix-pane ix-pane--heat">
        <header><h2><LayoutGrid aria-hidden="true" />Mapa de calor: disciplina × prova</h2><small>mais escuro = mais questões</small></header>
        {heatRows.length && heatCols.length ? <>
          <p className="ix-tip" aria-live="polite">{cellInfo ? <><b>{cellInfo.subject}</b> · {cellInfo.exam} · {cellInfo.n} {cellInfo.n === 1 ? "questão" : "questões"} ({pct(cellInfo.share)})</> : <span>Aponte uma célula para ver o detalhe</span>}</p>
          <div className="ix-heat" style={{ ["--n" as string]: heatCols.length }}>
            <div className="ix-heat__row ix-heat__row--h"><span />{heatCols.map((e) => <span key={e.key} className="ix-heat__h" title={`${e.contest} · ${e.year}`}>{String(e.year).slice(2)}</span>)}</div>
            {heatRows.map((s, si) => (
              <div key={s.subject} className="ix-heat__row" data-on={s.subject === active}>
                <button type="button" className="ix-heat__n" title={s.subject} onClick={() => setSel(s.subject)}>{s.subject}</button>
                {heatCols.map((e, ei) => {
                  const n = e.subj.get(s.subject) ?? 0;
                  const v = n / e.items;
                  return <i key={e.key} className="ix-heat__c" tabIndex={0} data-z={n === 0} style={{ ["--v" as string]: n ? `${Math.round(14 + (v / heatMax) * 74)}%` : "0%", animationDelay: `${(si * heatCols.length + ei) * 6}ms` }}
                    onMouseEnter={() => setCell(`${si}|${ei}`)} onMouseLeave={() => setCell(null)} onFocus={() => setCell(`${si}|${ei}`)} onBlur={() => setCell(null)} aria-label={`${s.subject}, ${e.contest} ${e.year}: ${n} questões`} />;
                })}
              </div>
            ))}
          </div>
        </> : <Empty>Sem dados suficientes para o mapa de calor.</Empty>}
      </section>
      <section className="ix-pane ix-pane--det">
        <header><h2><Target aria-hidden="true" />{activeSubject?.subject ?? "Disciplina"}</h2><small>subtópicos cobrados</small></header>
        {activeSubject ? <>
          <div className="ix-kpis">
            <div><small>Participação</small><b>{pct(activeSubject.share, 1)}</b></div>
            <div><small>Itens/prova</small><b>~{Math.round(activeSubject.avgItems)}</b></div>
            <div><small>Provas</small><b>{activeSubject.exams}</b></div>
            <div><small>Tendência</small><b className="ix-trend" data-t={activeSubject.trend ?? ""}><TrendIcon t={activeSubject.trend} />{activeSubject.trend === "sobe" ? "alta" : activeSubject.trend === "cai" ? "queda" : activeSubject.trend === "estavel" ? "estável" : "—"}</b></div>
          </div>
          {activeThemes.length ? <ul className="ix-bars ix-bars--sm">
            {activeThemes.map((t, i) => (
              <li key={t.label} style={{ ["--c" as string]: colorOf(activeSubject.subject), ["--d" as string]: `${i * 40}ms` }}>
                <Link to="/dashboard/question-trainer" search={{ board: "IDECAN", subject: activeSubject.subject, topic: t.label }} className="ix-bars__row" title={`${t.exams} provas · ${t.items} itens`}>
                  <span className="ix-bars__n">{t.label}</span>
                  <span className="ix-bars__t"><i style={{ width: `${(t.items / Math.max(1, activeThemes[0]!.items)) * 100}%` }} /></span>
                  <span className="ix-bars__v">{t.items}</span>
                </Link>
              </li>
            ))}
          </ul> : <Empty>Sem subtópicos identificados para esta disciplina.</Empty>}
          <div className="ix-actions">
            <Link to="/dashboard/question-trainer" search={{ board: "IDECAN", subject: activeSubject.subject }} className="ix-btn ix-btn--gold"><Target aria-hidden="true" />Treinar questões</Link>
            <Link to="/dashboard/library" search={{ collection: "subjects", discipline: activeSubject.subject }} className="ix-btn"><BookOpenText aria-hidden="true" />Ver teoria</Link>
          </div>
        </> : <Empty>Escolha uma disciplina no mapa.</Empty>}
      </section>
    </div>
  );

  const exam = matrix[Math.min(examSel, Math.max(0, matrix.length - 1))] ?? null;
  const examSlices: Slice[] = exam ? [...exam.subj.entries()].sort((a, b) => b[1] - a[1]).map(([s, n]) => ({ key: s, label: s, value: n, color: colorOf(s) })) : [];
  const [examHov, setExamHov] = React.useState<string | null>(null);
  const examFocus = examSlices.find((s) => s.key === examHov) ?? null;

  const provas = (
    <div className="ix-grid ix-grid--prv">
      <section className="ix-pane ix-pane--list">
        <header><h2><Landmark aria-hidden="true" />Provas de Polícia Civil</h2><small>{matrix.length} no acervo</small></header>
        {matrix.length ? <ul className="ix-exams">
          {matrix.map((e, i) => {
            const sl = [...e.subj.entries()].sort((a, b) => b[1] - a[1]);
            return (
              <li key={e.key} style={{ ["--d" as string]: `${Math.min(i, 12) * 30}ms` }}>
                <button type="button" data-on={exam?.key === e.key} onClick={() => setExamSel(i)}>
                  <span className="ix-exams__t"><b>{e.contest}</b><em>{e.year}</em></span>
                  <span className="ix-exams__m">{e.career} · {e.items} questões</span>
                  <span className="ix-stack" aria-hidden="true">{sl.map(([s, n]) => <i key={s} style={{ width: `${(n / e.items) * 100}%`, background: colorOf(s) }} title={`${s}: ${n}`} />)}</span>
                </button>
              </li>
            );
          })}
        </ul> : <Empty>Ainda não há provas de Polícia Civil da IDECAN no acervo.</Empty>}
        {currentYear.length > 0 && <p className="ix-year-note"><CalendarClock aria-hidden="true" /><span><b>{CURRENT_YEAR}:</b> {currentYear.length} {currentYear.length === 1 ? "prova" : "provas"} da IDECAN no acervo</span></p>}
      </section>
      <section className="ix-pane ix-pane--exam">
        <header><h2><PieChart aria-hidden="true" />{exam ? `${exam.contest} · ${exam.year}` : "Prova"}</h2><small>{exam?.career}</small></header>
        {exam ? <div className="ix-exam-body">
          <Donut slices={examSlices} active={examHov} onHover={setExamHov} onPick={(k) => setSel(k)} title={examFocus ? "da prova" : "questões"} value={examFocus ? pct(examFocus.value / exam.items) : String(exam.items)} label="Composição da prova por disciplina" />
          <ul className="ix-legend">
            {examSlices.map((s) => (
              <li key={s.key} data-on={examHov === s.key} onMouseEnter={() => setExamHov(s.key)} onMouseLeave={() => setExamHov(null)}>
                <i style={{ background: s.color }} /><span title={s.label}>{s.label}</span><b>{s.value}</b><em>{pct(s.value / exam.items)}</em>
              </li>
            ))}
          </ul>
        </div> : <Empty>Selecione uma prova.</Empty>}
      </section>
    </div>
  );

  const ceShares = answersCe ? [{ key: "C", label: "Certo", value: answersCe.counts["C"] ?? 0, color: "var(--c3)" }, { key: "E", label: "Errado", value: answersCe.counts["E"] ?? 0, color: "var(--c4)" }] : [];
  const [ceHov, setCeHov] = React.useState<string | null>(null);
  const ceFocus = ceShares.find((s) => s.key === ceHov) ?? null;
  const mcLetters = answersMc ? Object.keys(answersMc.shares).filter((k) => /^[A-E]$/.test(k)).sort() : [];
  const verdict = (title: string, v: Verdict) => (
    <p className="ix-verdict" data-l={v.level}><b>{title}</b><em>{VERDICT_LABEL[v.level]}</em><span>{v.text}</span></p>
  );

  const gabaritos = (
    <div className="ix-grid ix-grid--gab">
      {answersCe ? (
        <section className="ix-pane">
          <header><h2><ScanSearch aria-hidden="true" />Certo / Errado</h2><small>{answersCe.n} itens</small></header>
          <div className="ix-ce">
            <Donut slices={ceShares} active={ceHov} onHover={setCeHov} onPick={() => undefined} title={ceFocus?.label ?? "Certo"} value={pct((ceFocus ?? ceShares[0]!).value / (answersCe.n || 1), 1)} label="Distribuição de Certo e Errado" />
            <ul className="ix-legend">
              {ceShares.map((s) => <li key={s.key} data-on={ceHov === s.key} onMouseEnter={() => setCeHov(s.key)} onMouseLeave={() => setCeHov(null)}><i style={{ background: s.color }} /><span>{s.label}</span><b>{s.value}</b><em>{pct(s.value / (answersCe.n || 1), 1)}</em></li>)}
            </ul>
          </div>
          <div className="ix-verdicts">{verdict("Distribuição", answersCe.verdict)}{sequence && verdict("Ordem na prova", sequence.verdict)}</div>
        </section>
      ) : null}
      {answersMc ? (
        <section className="ix-pane">
          <header><h2><ScanSearch aria-hidden="true" />Múltipla escolha</h2><small>{answersMc.n} itens</small></header>
          <div className="ix-mc" role="img" aria-label="Distribuição das alternativas corretas">
            <span className="ix-mc__ref" style={{ bottom: `calc(${(1 / Math.max(1, mcLetters.length)) * 100}% * 0.78 + 22px)` }}><em>acaso</em></span>
            {mcLetters.map((l, i) => {
              const sh = answersMc.shares[l] ?? 0;
              const max = Math.max(...mcLetters.map((k) => answersMc.shares[k] ?? 0), 0.0001);
              return <div key={l} className="ix-mc__col" title={`${l}: ${answersMc.counts[l]} itens`}><b>{pct(sh)}</b><i style={{ height: `${(sh / max) * 78}%`, animationDelay: `${i * 70}ms` }} /><span>{l}</span></div>;
            })}
          </div>
          <div className="ix-verdicts">{verdict("Distribuição", answersMc.verdict)}</div>
        </section>
      ) : null}
      {!answersCe && !answersMc && <section className="ix-pane"><Empty>Ainda não há gabaritos de Polícia Civil suficientes para esta análise.</Empty></section>}
    </div>
  );

  const links = [
    { to: "/dashboard/study-coach", icon: ClipboardList, t: "Ajustar meu planejamento", d: "Redistribua a semana pelas disciplinas de maior peso." },
    { to: "/dashboard/question-trainer", icon: Target, t: "Treinar questões da IDECAN", d: "Correção imediata, filtrando pela banca.", search: { board: "IDECAN" } },
    { to: "/dashboard/mock-exams", icon: CalendarClock, t: "Simular uma prova", d: "Um caderno real em condições de prova.", search: { board: "IDECAN" } },
    { to: "/dashboard/perfil-bancas", icon: BookOpenText, t: "Comparar com outras bancas", d: "A mesma análise para qualquer banca." },
  ] as const;

  const plano = (
    <div className="ix-grid ix-grid--pln">
      <section className="ix-pane">
        <header><h2><Gauge aria-hidden="true" />O que fazer com isso</h2><small>{CONFIDENCE_LABEL[conf]}</small></header>
        {(conf === "insuficiente" || conf === "baixa") && <p className="ix-warn"><Info aria-hidden="true" />Ainda são poucas provas de Polícia Civil da IDECAN. Leia como pista, não como tendência, e use o edital PC-AC 001/2026 como guia principal.</p>}
        <ol className="ix-recs">{recs.map((r, i) => <li key={r.title} style={{ ["--d" as string]: `${i * 50}ms` }}><span>{i + 1}</span><div><b>{r.title}</b><p>{r.text}</p></div></li>)}</ol>
      </section>
      <section className="ix-pane">
        <header><h2><ArrowRight aria-hidden="true" />Continue a preparação</h2></header>
        <div className="ix-links">
          {links.map((l) => {
            const Icon = l.icon;
            return "search" in l
              ? <Link key={l.t} to={l.to} search={l.search} className="ix-link"><Icon aria-hidden="true" /><span><b>{l.t}</b><small>{l.d}</small></span><ArrowRight aria-hidden="true" /></Link>
              : <Link key={l.t} to={l.to} className="ix-link"><Icon aria-hidden="true" /><span><b>{l.t}</b><small>{l.d}</small></span><ArrowRight aria-hidden="true" /></Link>;
          })}
        </div>
        <details className="ix-more">
          <summary><b>Análise detalhada da banca</b><small>orientação cruzando edital e provas policiais da IDECAN</small></summary>
          <ul>
            {INVESTIGATOR_FOCUS.map((item, i) => <li key={item.subject}><div><b>{i + 1}. {item.subject}</b><em>{item.priority}</em></div><p>{item.topics}</p></li>)}
            {INVESTIGATOR_RADAR.map((item, i) => <li key={`r-${item.subject}`}><div><b>R{i + 1}. {item.subject}</b><em>{item.priority}</em></div><p>{item.topics}</p><small>Base: {item.evidence}</small></li>)}
          </ul>
        </details>
      </section>
    </div>
  );

  const kpis = [
    { l: "Provas IDECAN", v: examsAll },
    { l: "Provas de PC", v: examsPc },
    { l: "Questões · PC", v: pcRows.length },
  ];
  const cl = CONF_LEVEL[conf];
  const content: Record<TabId, React.ReactNode> = { panorama, disciplinas, provas, gabaritos, plano };

  return (
    <section ref={rootRef} className="ix-root idecan-intelligence-page" aria-label="Inteligência IDECAN">
      <header className="ix-bar">
        <div className="ix-bar__t"><Radar aria-hidden="true" /><h1>Inteligência <strong>IDECAN</strong></h1></div>
        <dl className="ix-chips" aria-label="Base da análise IDECAN">
          {kpis.map((k) => <div key={k.l}><dt>{k.l}</dt><dd>{loading || error ? "—" : <CountUp to={k.v} />}</dd></div>)}
          <div className="ix-conf" data-l={conf} title={`Confiança da amostra: ${CONFIDENCE_LABEL[conf]}`}>
            <dt>Confiança</dt>
            <dd>{loading || error ? "—" : <><span aria-hidden="true">{[1, 2, 3, 4].map((n) => <i key={n} data-on={n <= cl} />)}</span>{CONFIDENCE_LABEL[conf]}</>}</dd>
          </div>
        </dl>
        <Link to="/dashboard/question-trainer" search={{ board: "IDECAN" }} className="ix-btn ix-btn--gold"><Target aria-hidden="true" />Treinar IDECAN</Link>
      </header>
      <nav className="ix-tabs" role="tablist" aria-label="Análises IDECAN">
        {TABS.map((t) => { const Icon = t.icon; return (
          <button key={t.id} type="button" role="tab" id={`ix-tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`ix-panel-${t.id}`} onClick={() => setTab(t.id)}><Icon aria-hidden="true" />{t.label}</button>
        ); })}
      </nav>
      {state ?? <div role="tabpanel" tabIndex={0} id={`ix-panel-${tab}`} aria-labelledby={`ix-tab-${tab}`} className="ix-panel" key={tab}>{content[tab]}</div>}
      <footer className="ix-note"><Info aria-hidden="true" />Histórico de questões oficiais ativas. O edital PC-AC 001/2026 orienta a preparação; diferenças estatísticas não garantem resultados futuros.</footer>
    </section>
  );
}
