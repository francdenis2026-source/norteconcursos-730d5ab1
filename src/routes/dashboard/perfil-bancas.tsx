import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Dices,
  Gauge,
  Info,
  Landmark,
  Lightbulb,
  Loader2,
  Minus,
  PieChart,
  ScanSearch,
} from "lucide-react";
import { Donut, YearBars, CHART_COLORS, type Slice } from "@/components/dashboard/bancas/PerfilCharts";
import "@/styles/perfil-bancas-pro.css";
import { PlanGate } from "@/components/dashboard/PlanGate";
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStatus } from "@/hooks/useDashboard";
import { withCatalogCache } from "@/lib/catalogCache";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { canonicalBoard, canonicalCareerName, canonicalSubject } from "@/lib/subjects";
import { panoramaOrganization } from "@/lib/panoramaFilters";
import {
  CONFIDENCE_LABEL,
  answerStats,
  careerOptions,
  confidence,
  dedupeQuestions,
  examKey,
  orgOptions,
  recommendations,
  recurringThemes,
  sequenceStats,
  splitByKind,
  subjectProfile,
  summarizeBoards,
  unifiedCareer,
  type BancaQuestion,
  type Verdict,
} from "@/lib/bancaProfile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/perfil-bancas")({
  component: () => (
    <PlanGate feature="bankProfile" title="Perfil das bancas">
      <PerfilBancasPage />
    </PlanGate>
  ),
});

type Row = Record<string, unknown>;
type Page = PromiseLike<{ data: Row[] | null; error: unknown }>;

function rowToBancaQuestion(r: Row, boardField: string, textField: string): BancaQuestion | null {
  const board = canonicalBoard(String(r[boardField] ?? ""));
  if (!board || board === "Não informada") return null;
  return {
    board,
    contest: String(r["contest_name"] ?? ""),
    career: unifiedCareer(
      canonicalCareerName(String(r["career_name"] ?? "")),
      String(r["contest_name"] ?? ""),
    ),
    rawCareer: String(r["career_name"] ?? ""),
    org: panoramaOrganization(String(r["contest_name"] ?? "")).family,
    year: Number(r["exam_year"]),
    subject: canonicalSubject(String(r["subject"] ?? "")),
    topic: r["tested_topic"] ? String(r["tested_topic"]) : null,
    answer: String(r["official_answer"] ?? ""),
    item: r["item_number"] == null ? null : Number(r["item_number"]),
    text: String(r[textField] ?? ""),
  };
}

async function loadQuestions(): Promise<BancaQuestion[]> {
  const [officialRows, boardRows] = await Promise.all([
    fetchAllRows<Row>(
      (from, to) =>
        supabase
          .from("official_exam_questions")
          .select(
            "exam_board,contest_name,career_name,exam_year,subject,tested_topic,official_answer,item_number,question_text",
          )
          .eq("content_status", "active")
          .neq("official_answer", "X")
          .order("id")
          .range(from, to) as unknown as Page,
    ),
    fetchAllRows<Row>(
      (from, to) =>
        supabase
          .from("board_exam_questions")
          .select(
            "board,contest_name,career_name,exam_year,subject,tested_topic,official_answer,item_number,stem",
          )
          .eq("content_status", "active")
          .neq("official_answer", "X")
          .order("id")
          .range(from, to) as unknown as Page,
    ),
  ]);
  const out: BancaQuestion[] = [];
  for (const r of officialRows) {
    const q = rowToBancaQuestion(r, "exam_board", "question_text");
    if (q) out.push(q);
  }
  for (const r of boardRows) {
    const q = rowToBancaQuestion(r, "board", "stem");
    if (q) out.push(q);
  }
  return out;
}

const pct = (v: number, d = 0) => `${(v * 100).toFixed(d).replace(".", ",")}%`;

const VERDICT_STYLE: Record<Verdict["level"], string> = {
  sem_dados: "border-border bg-muted/40 text-muted-foreground",
  sem_padrao: "border-emerald-500/30 bg-emerald-500/5",
  indicio: "border-amber-500/40 bg-amber-500/5",
  padrao: "border-amber-600/50 bg-amber-500/10",
};
const VERDICT_LABEL: Record<Verdict["level"], string> = {
  sem_dados: "Dados insuficientes",
  sem_padrao: "Sem padrão",
  indicio: "Indício fraco",
  padrao: "Diferença estatística",
};

function VerdictBox({ title, verdict }: { title: string; verdict: Verdict }) {
  return (
    <div className={cn("rounded-lg border p-4 text-sm", VERDICT_STYLE[verdict.level])}>
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <strong>{title}</strong>
        <Badge variant="outline" className="text-[11px]">
          {VERDICT_LABEL[verdict.level]}
        </Badge>
      </div>
      <p className="leading-relaxed">{verdict.text}</p>
    </div>
  );
}

function PerfilBancasPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const query = useQuery({
    queryKey: ["perfil-bancas"],
    enabled: real,
    staleTime: 10 * 60_000,
    queryFn: () => withCatalogCache(`perfil-bancas:${user?.id ?? ""}`, loadQuestions),
  });
  const [boardChoice, setBoardChoice] = React.useState<string | null>(null);
  const [orgChoice, setOrgChoice] = React.useState<string>("");
  const [careerChoice, setCareerChoice] = React.useState<string>("");

  const rows = React.useMemo(() => query.data ?? [], [query.data]);
  const boards = React.useMemo(() => summarizeBoards(rows), [rows]);
  const board =
    boardChoice ?? boards.find((b) => b.board === "CEBRASPE")?.board ?? boards[0]?.board ?? null;
  const summary = boards.find((b) => b.board === board) ?? null;
  const boardRows = React.useMemo(() => rows.filter((r) => r.board === board), [rows, board]);
  const orgs = React.useMemo(() => orgOptions(boardRows), [boardRows]);
  const org = orgs.some((o) => o.value === orgChoice) ? orgChoice : "";
  const orgRows = React.useMemo(
    () => (org ? boardRows.filter((r) => r.org === org) : boardRows),
    [boardRows, org],
  );
  const careers = React.useMemo(() => careerOptions(orgRows), [orgRows]);
  const career = careers.some((c) => c.value === careerChoice) ? careerChoice : "";

  const view = React.useMemo(() => {
    if (!board) return null;
    const scope = career ? orgRows.filter((r) => r.career === career) : dedupeQuestions(orgRows);
    const deduped = career ? dedupeQuestions(scope) : scope;
    const exams = new Set(deduped.map(examKey)).size;
    const conf = confidence(deduped.length, exams);
    const kinds = splitByKind(deduped);
    const answersCe = kinds.ce.length ? answerStats(kinds.ce) : null;
    const answersMc = kinds.mc.length ? answerStats(kinds.mc) : null;
    const sequence = answersCe ? sequenceStats(splitByKind(career ? scope : orgRows).ce) : null;
    const answerKinds: ("ce" | "mc")[] = [
      ...(answersCe ? (["ce"] as const) : []),
      ...(answersMc ? (["mc"] as const) : []),
    ];
    const profile = subjectProfile(deduped);
    const themes = profile.subjects
      .slice(0, 4)
      .map((s) => ({ subject: s.subject, themes: recurringThemes(deduped, s.subject) }))
      .filter((t) => t.themes.length > 0);
    const years = deduped.map((r) => r.year);
    const yearMap = new Map<number, { items: number; exams: Set<string> }>();
    for (const r of deduped) {
      if (!Number.isFinite(r.year)) continue;
      const e = yearMap.get(r.year) ?? { items: 0, exams: new Set<string>() };
      e.items += 1;
      e.exams.add(examKey(r));
      yearMap.set(r.year, e);
    }
    const byYear = [...yearMap.entries()].sort((x, y) => x[0] - y[0]).map(([year, e]) => ({ year, items: e.items, exams: e.exams.size }));
    return {
      rowsScope: deduped,
      byYear,
      items: deduped.length,
      exams,
      conf,
      answersCe,
      answersMc,
      sequence,
      profile,
      themes,
      first: years.length ? Math.min(...years) : null,
      last: years.length ? Math.max(...years) : null,
      recs: recommendations({
        board,
        career: career || null,
        answerKinds,
        subjects: profile.subjects,
        themes,
        conf,
      }),
    };
  }, [board, orgRows, career]);

  if (authLoading || (real && query.isLoading))
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  if (!real)
    return (
      <LockedState
        image="field-map"
        title={
          <>
            Perfil das <em>bancas</em>
          </>
        }
        description="Entre na sua conta para entender como cada banca monta as provas, com base no histórico de concursos da plataforma."
      />
    );
  if (query.isError || !summary || !view)
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <PageHero
          image="field-map"
          size="sm"
          kicker="Meu concurso"
          icon={Landmark}
          title={
            <>
              Perfil das <em>bancas</em>
            </>
          }
          description="Não foi possível carregar o histórico agora. Tente de novo em instantes."
        />
      </div>
    );

  return <PerfilStudio {...{ view, boards, board, org, orgs, career, careers, setBoardChoice, setOrgChoice, setCareerChoice }} />;
}

interface PerfilView {
  rowsScope: BancaQuestion[];
  byYear: { year: number; items: number; exams: number }[];
  items: number;
  exams: number;
  conf: ReturnType<typeof confidence>;
  answersCe: ReturnType<typeof answerStats> | null;
  answersMc: ReturnType<typeof answerStats> | null;
  sequence: ReturnType<typeof sequenceStats> | null;
  profile: ReturnType<typeof subjectProfile>;
  themes: { subject: string; themes: ReturnType<typeof recurringThemes> }[];
  first: number | null;
  last: number | null;
  recs: ReturnType<typeof recommendations>;
}

function useCount(target: number) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 700);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

function PerfilStudio(props: {
  view: PerfilView;
  boards: ReturnType<typeof summarizeBoards>;
  board: string | null;
  org: string;
  orgs: ReturnType<typeof orgOptions>;
  career: string;
  careers: ReturnType<typeof careerOptions>;
  setBoardChoice: (v: string) => void;
  setOrgChoice: (v: string) => void;
  setCareerChoice: (v: string) => void;
}) {
  const { view, boards, board, org, orgs, career, careers, setBoardChoice, setOrgChoice, setCareerChoice } = props;
  const subjects = view.profile.subjects;
  const top = subjects.slice(0, 12);
  const [pick, setPick] = React.useState<string | null>(null);
  const [hover, setHover] = React.useState<string | null>(null);
  const [kind, setKind] = React.useState<"ce" | "mc">(view.answersCe ? "ce" : "mc");
  React.useEffect(() => { setPick(null); setKind(view.answersCe ? "ce" : "mc"); }, [board, org, career, view.answersCe]);
  const selKey = hover ?? pick ?? top[0]?.subject ?? null;
  const sel = subjects.find((s) => s.subject === selKey) ?? null;
  const selThemes = React.useMemo(() => (sel ? recurringThemes(view.rowsScope, sel.subject).slice(0, 6) : []), [sel, view.rowsScope]);
  const maxShare = Math.max(0.0001, ...top.map((s) => s.share));
  const slices: Slice[] = React.useMemo(() => {
    const head = top.slice(0, 6).map((s, i) => ({ key: s.subject, label: s.subject, value: s.share, color: CHART_COLORS[i]! }));
    const rest = subjects.filter((s) => !head.some((h) => h.key === s.subject)).reduce((a, s) => a + s.share, 0);
    return rest > 0.001 ? [...head, { key: "__rest", label: "Outras disciplinas", value: rest, color: "var(--c7)" }] : head;
  }, [top, subjects]);
  const items = useCount(view.items);
  const exams = useCount(view.exams);
  const stats = kind === "ce" ? view.answersCe : view.answersMc;
  const confTone = view.conf === "alta" || view.conf === "media" ? "ok" : "warn";
  const trendIcon = (t: string | null) => t === "sobe" ? <ArrowUpRight aria-hidden /> : t === "cai" ? <ArrowDownRight aria-hidden /> : t === "estavel" ? <Minus aria-hidden /> : null;

  return (
    <div className="pf-root">
      <header className="pf-bar">
        <span className="pf-bar__t"><Landmark aria-hidden /><h1>Perfil das bancas</h1></span>
        <div className="pf-filters">
          <label><span>Banca</span>
            <select value={board ?? ""} onChange={(e) => { setBoardChoice(e.target.value); setOrgChoice(""); setCareerChoice(""); }}>
              {boards.map((b) => <option key={b.board} value={b.board}>{b.board} · {b.items} itens</option>)}
            </select></label>
          <label><span>Órgão</span>
            <select value={org} onChange={(e) => { setOrgChoice(e.target.value); setCareerChoice(""); }}>
              <option value="">Todos os órgãos</option>
              {orgs.map((o) => <option key={o.value} value={o.value}>{o.value} · {o.items}</option>)}
            </select></label>
          <label><span>Cargo</span>
            <select value={career} onChange={(e) => setCareerChoice(e.target.value)} title="Cargos iguais com nomes diferentes entre órgãos e anos aparecem juntos para dar mais precisão.">
              <option value="">Todos os cargos</option>
              {careers.map((c) => <option key={c.value} value={c.value}>{c.value} · {c.items}</option>)}
            </select></label>
        </div>
        <div className="pf-chips">
          <span><ScanSearch aria-hidden /><b>{items}</b> questões</span>
          <span><Landmark aria-hidden /><b>{exams}</b> {view.exams === 1 ? "prova" : "provas"}{view.first != null ? ` · ${view.first === view.last ? view.first : `${view.first}–${view.last}`}` : ""}</span>
          <span data-tone={confTone} title="Confiança da amostra"><Gauge aria-hidden />{CONFIDENCE_LABEL[view.conf]}</span>
        </div>
      </header>

      <div className="pf-grid">
        <section className="pf-pane pf-subjects" aria-label="O que a banca cobra">
          <header><h2><PieChart aria-hidden /> O que a banca cobra{career ? ` · ${career}` : ""}</h2><small>Peso médio por prova</small></header>
          <div className="pf-subjects__body">
            <div className="pf-side">
              <Donut slices={slices} active={sel && slices.some((s) => s.key === sel.subject) ? sel.subject : null} onHover={setHover} onPick={(k) => k !== "__rest" && setPick(k)} centerTitle={sel ? "peso médio" : ""} centerValue={sel ? pct(sel.share, 1) : "—"} />
              {sel && (
                <div className="pf-detail" key={sel.subject}>
                  <h3>{sel.subject}</h3>
                  <p><span><b>~{Math.round(sel.avgItems)}</b> itens/prova</span><span><b>{sel.exams}</b> provas</span>{sel.trend && <span className="pf-trend" data-t={sel.trend}>{trendIcon(sel.trend)}{sel.trend === "sobe" ? "em alta" : sel.trend === "cai" ? "em queda" : "estável"}</span>}</p>
                  {selThemes.length > 0 ? (
                    <ul>{selThemes.map((t) => <li key={t.label} title={`${t.exams} provas · ${t.items} itens`}><span>{t.label}</span><em>{t.exams}×</em></li>)}</ul>
                  ) : <small>Sem assuntos recorrentes nesta disciplina.</small>}
                </div>
              )}
            </div>
            <ol className="pf-bars">
              {top.map((s, i) => (
                <li key={s.subject} style={{ "--d": `${i * 35}ms`, "--c": CHART_COLORS[i % CHART_COLORS.length] } as React.CSSProperties}>
                  <button type="button" data-on={sel?.subject === s.subject} onMouseEnter={() => setHover(s.subject)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(s.subject)} onBlur={() => setHover(null)} onClick={() => setPick(s.subject)} aria-pressed={pick === s.subject}>
                    <span className="pf-bars__n" title={s.subject}>{s.subject}</span>
                    <span className="pf-bars__t"><i style={{ width: `${(s.share / maxShare) * 100}%` }} /></span>
                    <span className="pf-bars__v">{pct(s.share, 1)}</span>
                    <span className="pf-bars__tr" data-t={s.trend ?? ""}>{trendIcon(s.trend)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="pf-col">
          <section className="pf-pane pf-timeline" aria-label="Questões por ano">
            <header><h2><BarChart3 aria-hidden /> Questões por ano</h2><small>Volume no acervo</small></header>
            {view.byYear.length > 0 ? <YearBars data={view.byYear} /> : <small>Sem dados por ano.</small>}
          </section>

          <section className="pf-pane pf-key" aria-label="Padrões no gabarito">
            <header>
              <h2><Dices aria-hidden /> Padrões no gabarito</h2>
              {view.answersCe && view.answersMc ? (
                <div className="pf-seg" role="group" aria-label="Tipo de prova">
                  <button type="button" aria-pressed={kind === "ce"} onClick={() => setKind("ce")}>Certo/Errado</button>
                  <button type="button" aria-pressed={kind === "mc"} onClick={() => setKind("mc")}>Múltipla</button>
                </div>
              ) : <small>{stats ? `${stats.n} itens` : ""}</small>}
            </header>
            {stats ? (
              <>
                <ul className="pf-answers">
                  {Object.entries(stats.shares).sort(([a], [b]) => a.localeCompare(b)).map(([letter, share], i) => (
                    <li key={letter} title={`${stats.counts[letter]} itens`}>
                      <b>{kind === "ce" ? (letter === "C" ? "Certo" : "Errado") : letter}</b>
                      <span><i style={{ width: `${share * 100}%`, animationDelay: `${i * 60}ms` }} /></span>
                      <em>{pct(share, 1)}</em>
                    </li>
                  ))}
                </ul>
                <div className="pf-verdicts">
                  <p data-l={stats.verdict.level}><b>{VERDICT_LABEL[stats.verdict.level]}</b> {stats.verdict.text}</p>
                  {kind === "ce" && view.sequence && <p data-l={view.sequence.verdict.level}><b>Ordem · {VERDICT_LABEL[view.sequence.verdict.level]}</b> {view.sequence.verdict.text}</p>}
                </div>
              </>
            ) : <small>Sem gabaritos suficientes.</small>}
          </section>

          <section className="pf-pane pf-recs" aria-label="O que fazer com isso">
            <header><h2><Lightbulb aria-hidden /> O que fazer com isso</h2></header>
            <ul>
              {view.recs.map((r, i) => (
                <li key={r.title} style={{ "--d": `${i * 50}ms` } as React.CSSProperties}><b>{r.title}</b><p>{r.text}</p></li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
