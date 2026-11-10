import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpenText, CalendarClock, ChevronDown, ClipboardList, Info, Landmark, Loader2, Minus, Radar, ScanSearch, Target } from "lucide-react";
import { Button as AstryxButton } from "@astryxdesign/core/Button";
import { TabList, Tab } from "@astryxdesign/core/TabList";
import { Theme } from "@astryxdesign/core/theme";
import { themes as astryxThemes, defaultThemeSlug } from "../../astryx-themes";
import { getActiveTheme } from "@/lib/theme";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CONFIDENCE_LABEL, answerStats, confidence, dedupeQuestions, examKey, recommendations, recurringThemes, sequenceStats, splitByKind, subjectProfile, type BancaQuestion, type Verdict } from "@/lib/bancaProfile";
import { cn } from "@/lib/utils";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { INVESTIGATOR_FOCUS } from "@/data/pcAcreIdecanRadar";
import "@/styles/inteligencia-idecan-refinement.css";
const PC_CAREERS = new Set(["Delegado de Polícia", "Escrivão de Polícia", "Agente / Investigador de Polícia"]);
const CURRENT_YEAR = new Date().getFullYear();
const IdecanTrainerLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
  ({ href: _href, target, ...props }, ref) => <Link {...props} {...(target ? { target } : {})} ref={ref} to="/dashboard/question-trainer" search={{ board: "IDECAN" }} />,
);
IdecanTrainerLink.displayName = "IdecanTrainerLink";

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
    <div className={cn("rounded-lg border p-3 text-sm", VERDICT_STYLE[verdict.level])}>
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

function SubjectBars({
  subjects,
  maxShare,
  rows,
}: {
  subjects: ReturnType<typeof subjectProfile>["subjects"];
  maxShare: number;
  rows: BancaQuestion[];
}) {
  return (
    <div className="space-y-2">
      {subjects.slice(0, 12).map((s) => (
        <div key={s.subject} className="rounded-lg border border-border/60 p-2.5 text-sm">
          <div className="idecan-subject-row">
          <Link to="/dashboard/question-trainer" search={{ board: "IDECAN", subject: s.subject }} className="w-40 shrink-0 truncate font-semibold hover:text-primary sm:w-52" title={s.subject}>
            {s.subject}
          </Link>
          <div className="idecan-subject-meter h-3 flex-1 overflow-hidden rounded bg-muted">
            <progress aria-label={`Participação de ${s.subject}`} value={s.share} max={maxShare} />
          </div>
          <span className="w-28 text-right tabular-nums text-muted-foreground">
            {pct(s.share, 1)} · ~{Math.round(s.avgItems)} itens
          </span>
          <span className="w-5" aria-label={s.trend ?? "sem tendência"}>
            {s.trend === "sobe" ? (
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
            ) : s.trend === "cai" ? (
              <ArrowDownRight className="h-4 w-4 text-rose-600" />
            ) : s.trend === "estavel" ? (
              <Minus className="h-4 w-4 text-muted-foreground" />
            ) : null}
          </span>
          </div>
          <div className="mt-2 flex gap-2 text-[11px]">
            <Link to="/dashboard/question-trainer" search={{ board: "IDECAN", subject: s.subject }} className="rounded-md border px-2 py-1 font-semibold text-primary hover:bg-primary/10">Treinar questões</Link>
            <Link to="/dashboard/library" search={{ collection: "subjects", discipline: s.subject }} className="rounded-md border px-2 py-1 font-semibold text-muted-foreground hover:bg-muted">Ver teoria</Link>
          </div>
          {(() => {
            const themes = recurringThemes(rows, s.subject, 1).slice(0, 6);
            return themes.length ? <div className="mt-2 flex flex-wrap items-center gap-1.5" aria-label={`Subtópicos recorrentes de ${s.subject}`}><span className="mr-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Subtópicos:</span>{themes.map((theme) => <Link key={theme.label} to="/dashboard/question-trainer" search={{ board: "IDECAN", subject: s.subject, topic: theme.label }} className="idecan-subtopic-chip" title={`${theme.label} · ${theme.exams} provas`}><span className="idecan-subtopic-chip__label">{theme.label}</span><span className="idecan-subtopic-chip__count">{theme.exams} {theme.exams === 1 ? "prova" : "provas"}</span></Link>)}</div> : null;
          })()}
        </div>
      ))}
    </div>
  );
}

export function IdecanIntelligenceWorkspace({ rows, loading = false, error = false, onRetry }: {
  rows: BancaQuestion[];
  loading?: boolean;
  error?: boolean;
  onRetry: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState("edital");
  const [mode, setMode] = React.useState(getActiveTheme);
  const workspaceRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const node = workspaceRef.current;
    if (!node) return;
    const resize = () => node.style.setProperty("--idecan-height", `${Math.max(280, window.innerHeight - node.getBoundingClientRect().top - 12)}px`);
    const observer = new ResizeObserver(resize);
    observer.observe(document.documentElement);
    if (node.parentElement) observer.observe(node.parentElement);
    const shell = node.closest(".app-shell");
    const chrome = new MutationObserver(resize);
    if (shell) chrome.observe(shell, { attributes: true, attributeFilter: ["class", "data-focus-mode"] });
    const theme = new MutationObserver(() => setMode(getActiveTheme()));
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    document.addEventListener("fullscreenchange", resize);
    resize();
    return () => { observer.disconnect(); chrome.disconnect(); theme.disconnect(); window.removeEventListener("resize", resize); document.removeEventListener("fullscreenchange", resize); };
  }, []);
  const all = React.useMemo(() => dedupeQuestions(rows), [rows]);
  const pcRows = React.useMemo(() => all.filter((r) => PC_CAREERS.has(r.career)), [all]);
  const examsAll = React.useMemo(() => new Set(all.map(examKey)).size, [all]);
  const examsPc = React.useMemo(() => new Set(pcRows.map(examKey)).size, [pcRows]);
  const conf = confidence(pcRows.length, examsPc);

  const currentYearExams = React.useMemo(() => {
    const byExam = new Map<
      string,
      { contest: string; year: number; career: string; items: number }
    >();
    for (const r of all) {
      if (r.year !== CURRENT_YEAR) continue;
      const key = `${examKey(r)}|${r.rawCareer ?? r.career}`;
      const cur = byExam.get(key) ?? {
        contest: r.contest,
        year: r.year,
        career: r.rawCareer || r.career,
        items: 0,
      };
      cur.items += 1;
      byExam.set(key, cur);
    }
    return [...byExam.values()].sort((a, b) => a.contest.localeCompare(b.contest, "pt-BR"));
  }, [all]);

  const pcExams = React.useMemo(() => {
    const byExam = new Map<
      string,
      {
        contest: string;
        year: number;
        career: string;
        items: number;
        top: { subject: string; share: number }[];
      }
    >();
    for (const r of pcRows) {
      const key = `${examKey(r)}|${r.rawCareer ?? r.career}`;
      const cur = byExam.get(key) ?? {
        contest: r.contest,
        year: r.year,
        career: r.rawCareer || r.career,
        items: 0,
        top: [],
      };
      cur.items += 1;
      byExam.set(key, cur);
    }
    for (const [key, entry] of byExam) {
      const items = pcRows.filter((r) => `${examKey(r)}|${r.rawCareer ?? r.career}` === key);
      const bySubject = new Map<string, number>();
      for (const r of items) bySubject.set(r.subject, (bySubject.get(r.subject) ?? 0) + 1);
      entry.top = [...bySubject.entries()]
        .map(([subject, n]) => ({ subject, share: n / items.length }))
        .sort((a, b) => b.share - a.share)
        .slice(0, 3);
    }
    return [...byExam.values()].sort(
      (a, b) => b.year - a.year || a.contest.localeCompare(b.contest, "pt-BR"),
    );
  }, [pcRows]);

  const profile = React.useMemo(() => subjectProfile(pcRows), [pcRows]);
  const allProfile = React.useMemo(() => subjectProfile(all), [all]);
  const maxShare = Math.max(0.0001, ...profile.subjects.map((s) => s.share));
  const themes = React.useMemo(
    () =>
      profile.subjects
        .slice(0, 5)
        .map((s) => ({ subject: s.subject, themes: recurringThemes(pcRows, s.subject) }))
        .filter((t) => t.themes.length > 0),
    [profile.subjects, pcRows],
  );
  const kinds = React.useMemo(() => splitByKind(pcRows), [pcRows]);
  const answersCe = kinds.ce.length ? answerStats(kinds.ce) : null;
  const answersMc = kinds.mc.length ? answerStats(kinds.mc) : null;
  const sequence = answersCe ? sequenceStats(kinds.ce) : null;
  const recs = React.useMemo(
    () =>
      recommendations({
        board: "IDECAN",
        career: "Polícia Civil",
        answerKinds: [
          ...(answersCe ? (["ce"] as const) : []),
          ...(answersMc ? (["mc"] as const) : []),
        ],
        subjects: profile.subjects,
        themes,
        conf,
      }),
    [answersCe, answersMc, profile.subjects, themes, conf],
  );

  return (
    <Theme theme={astryxThemes[defaultThemeSlug]} mode={mode}>
    <section ref={workspaceRef} className="idecan-intelligence-page idecan-workspace" aria-label="Inteligência IDECAN">
      <header className="idecan-command-bar">
        <Radar aria-hidden="true" />
        <h1>Inteligência <strong>IDECAN</strong></h1>
        <p>Polícia Civil · análise do acervo</p>
        <AstryxButton label="Treinar IDECAN" as={IdecanTrainerLink} href="/dashboard/question-trainer?board=IDECAN" icon={<Target />} size="sm" />
      </header>
      <dl className="idecan-summary" aria-label="Base da análise IDECAN">
        <div><dt>Provas IDECAN</dt><dd>{loading || error ? "—" : examsAll}</dd></div>
        <div><dt>Provas de Polícia Civil</dt><dd>{loading || error ? "—" : examsPc}</dd></div>
        <div><dt>Questões analisadas · PC</dt><dd>{loading || error ? "—" : pcRows.length}</dd></div>
        <div><dt>Confiança da amostra</dt><dd>{loading || error ? "—" : CONFIDENCE_LABEL[conf]}</dd></div>
      </dl>
      <TabList value={activeTab} onChange={setActiveTab} role="tablist" layout="fill" hasDivider aria-label="Análises IDECAN">
        <Tab id="idecan-tab-edital" value="edital" label="Edital PC-AC" icon={<ClipboardList />} panelId="idecan-panel-edital" />
        <Tab id="idecan-tab-disciplinas" value="disciplinas" label="Disciplinas" icon={<BookOpenText />} panelId="idecan-panel-disciplinas" />
        <Tab id="idecan-tab-provas" value="provas" label="Provas" icon={<Landmark />} panelId="idecan-panel-provas" />
        <Tab id="idecan-tab-gabaritos" value="gabaritos" label="Gabaritos" icon={<ScanSearch />} panelId="idecan-panel-gabaritos" />
        <Tab id="idecan-tab-plano" value="plano" label="Plano de ação" icon={<Target />} panelId="idecan-panel-plano" />
      </TabList>
      {loading ? <section role="status" className="idecan-state"><Loader2 className="animate-spin" aria-hidden="true" /> Carregando análise IDECAN…</section> : error ? <section role="alert" className="idecan-state"><p>Não foi possível carregar as provas. Tente novamente.</p><AstryxButton label="Tentar novamente" onClick={onRetry} /></section> : <>
      <section role="tabpanel" tabIndex={0} id="idecan-panel-edital" aria-labelledby="idecan-tab-edital" hidden={activeTab !== "edital"} className="idecan-panel">
      <Card className="idecan-card idecan-card--matrix border-primary/25 bg-primary/[0.03]">
        <CardHeader>
          <CardTitle className="text-base">Edital PC-AC 2026 · Oficial Investigador</CardTitle>
          <CardDescription>
            Disciplinas do Anexo III, com prioridade de estudo e subtemas. Quando não há amostra IDECAN suficiente, esta matriz continua sendo a referência principal.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {(pcAcVerticalCargos.find((cargo) => cargo.id === "investigador")?.blocks ?? []).flatMap((block) => block.disciplines).map((discipline) => {
            const focus = INVESTIGATOR_FOCUS.find((item) => item.subject === discipline.name || item.filter === discipline.name || discipline.name.includes(item.subject));
            return <details key={discipline.id} className="idecan-discipline-disclosure rounded-xl border bg-card p-3">
              <summary><strong>{discipline.name}</strong>{focus && <Badge variant="outline">{focus.priority}</Badge>}<ChevronDown aria-hidden="true" /></summary>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{focus?.topics ?? discipline.topics?.slice(0, 3).join(" · ") ?? "Tópicos do Anexo III cadastrados no edital verticalizado."}</p>
              <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador" }} className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline">Abrir edital →</Link>
            </details>;
          })}
        </CardContent>
      </Card>

      </section>
      <section role="tabpanel" tabIndex={0} id="idecan-panel-disciplinas" aria-labelledby="idecan-tab-disciplinas" hidden={activeTab !== "disciplinas"} className="idecan-panel">
      <Card className="idecan-card idecan-card--map">
        <CardHeader>
          <CardTitle className="text-base">Mapa completo da IDECAN por disciplina</CardTitle>
          <CardDescription>
            Inclui todas as carreiras e provas da banca disponíveis no acervo, além do recorte de Polícia Civil.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allProfile.subjects.length ? (
            <SubjectBars subjects={allProfile.subjects} maxShare={Math.max(0.0001, ...allProfile.subjects.map((s) => s.share))} rows={all} />
          ) : <p className="text-sm text-muted-foreground">Ainda não há disciplinas classificadas.</p>}
        </CardContent>
      </Card>

      <Card className="idecan-card idecan-card--weights">
        <CardHeader>
          <CardTitle className="text-base">O que a IDECAN mais cobra na Polícia Civil</CardTitle>
          <CardDescription>
            Peso médio de cada disciplina nas provas de Delegado, Escrivão e Agente/Investigador. A
            seta compara a prova mais recente com a média das anteriores (só quando há pelo menos 3
            provas).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile.subjects.length ? (
            <SubjectBars subjects={profile.subjects} maxShare={maxShare} rows={pcRows} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Ainda sem dados suficientes para calcular o peso por disciplina.
            </p>
          )}
        </CardContent>
      </Card>

      {themes.length > 0 && (
        <Card className="idecan-card idecan-card--themes">
          <CardHeader>
            <CardTitle className="text-base">
              Assuntos que a IDECAN repete em Polícia Civil
            </CardTitle>
            <CardDescription>
              Temas que reaparecem em provas diferentes, nas disciplinas de maior peso.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {themes.map((t) => (
              <div key={t.subject} className="space-y-1.5">
                <h4 className="text-sm font-semibold">{t.subject}</h4>
                <ul className="space-y-1 text-sm">
                  {t.themes.slice(0, 5).map((x) => (
                    <li key={x.label} className="flex justify-between gap-3">
                      <span>{x.label}</span>
                      <span className="shrink-0 text-muted-foreground">
                        {x.exams} provas · {x.items} itens
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      </section>
      <section role="tabpanel" tabIndex={0} id="idecan-panel-provas" aria-labelledby="idecan-tab-provas" hidden={activeTab !== "provas"} className="idecan-panel">
      {currentYearExams.length > 0 && (
        <Card className="idecan-card idecan-card--recent">
          <CardHeader>
            <CardTitle className="text-base">
              Provas da IDECAN em {CURRENT_YEAR} (ano corrente)
            </CardTitle>
            <CardDescription>
              As provas mais recentes mostram para onde a banca está indo agora.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {currentYearExams.map((e) => (
              <div key={`${e.contest}-${e.career}`} className="rounded-lg border p-3 text-sm">
                <p className="font-semibold">{e.contest}</p>
                <p className="text-xs text-muted-foreground">
                  {e.career} · {e.items} questões no acervo
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="idecan-card idecan-card--police">
        <CardHeader>
          <CardTitle className="text-base">Provas de Polícia Civil aplicadas pela IDECAN</CardTitle>
          <CardDescription>
            As comparáveis mais diretas para a PC-AC: mesma banca, mesma natureza de carreira. As 3
            disciplinas de maior peso aparecem em cada prova.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {pcExams.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Ainda não há provas de Polícia Civil da IDECAN no acervo.
            </p>
          )}
          {pcExams.map((e) => (
            <div
              key={`${e.contest}-${e.career}-${e.year}`}
              className="rounded-lg border p-4 text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                  {e.contest} <span className="font-normal text-muted-foreground">· {e.year}</span>
                </p>
                <Badge variant="outline">{e.career}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{e.items} questões no acervo</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {e.top.map((t) => (
                  <span
                    key={t.subject}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium"
                  >
                    {t.subject} · {pct(t.share)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      </section>
      <section role="tabpanel" tabIndex={0} id="idecan-panel-gabaritos" aria-labelledby="idecan-tab-gabaritos" hidden={activeTab !== "gabaritos"} className="idecan-panel">
      {(answersCe || answersMc) && (
        <Card className="idecan-card idecan-card--answers">
          <CardHeader>
            <CardTitle className="text-base">Padrões no gabarito (Polícia Civil)</CardTitle>
            <CardDescription>
              Testes estatísticos simples sobre as respostas oficiais. O resultado mais comum é "sem
              padrão", e isso também é informação útil.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { key: "ce", title: "Provas Certo/Errado", stats: answersCe },
              { key: "mc", title: "Provas de múltipla escolha", stats: answersMc },
            ].map(({ key, title, stats }) =>
              stats ? (
                <div key={key} className="space-y-3">
                  <h4 className="text-sm font-semibold">
                    {title}{" "}
                    <span className="font-normal text-muted-foreground">· {stats.n} itens</span>
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(stats.shares)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([letter, share]) => (
                        <div key={letter} className="idecan-answer-row text-sm">
                          <span className="w-12 font-medium">
                            {key === "ce" ? (letter === "C" ? "Certo" : "Errado") : letter}
                          </span>
                          <div className="idecan-subject-meter h-3 flex-1 overflow-hidden rounded bg-muted">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${share * 100}%` }}
                            />
                          </div>
                          <span className="w-24 text-right tabular-nums text-muted-foreground">
                            {pct(share, 1)} ({stats.counts[letter]})
                          </span>
                        </div>
                      ))}
                  </div>
                  <VerdictBox title="Distribuição das respostas" verdict={stats.verdict} />
                  {key === "ce" && sequence && (
                    <VerdictBox title="Ordem dos gabaritos na prova" verdict={sequence.verdict} />
                  )}
                </div>
              ) : null,
            )}
          </CardContent>
        </Card>
      )}

      {!answersCe && !answersMc && <p className="idecan-state">Ainda não há gabaritos de Polícia Civil suficientes para esta análise.</p>}
      </section>
      <section role="tabpanel" tabIndex={0} id="idecan-panel-plano" aria-labelledby="idecan-tab-plano" hidden={activeTab !== "plano"} className="idecan-panel">
      <Card className="idecan-card idecan-card--base">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-base">
            <ScanSearch className="h-4 w-4" aria-hidden /> Base da análise
            <Badge variant={conf === "alta" || conf === "media" ? "default" : "secondary"}>
              {CONFIDENCE_LABEL[conf]}
            </Badge>
          </CardTitle>
          <CardDescription>
            {pcRows.length} questões oficiais em {examsPc} {examsPc === 1 ? "prova" : "provas"} de
            Delegado, Escrivão e Agente/Investigador aplicadas pela IDECAN, de um total de{" "}
            {all.length} questões em {examsAll} provas da banca no acervo.
          </CardDescription>
        </CardHeader>
        {(conf === "insuficiente" || conf === "baixa") && (
          <CardContent>
            <p className="flex gap-2 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Ainda são poucas provas de Polícia Civil da IDECAN no acervo. Leia os padrões abaixo
              como pista, não como tendência confirmada — e use o edital PC-AC 001/2026 como guia principal.
            </p>
          </CardContent>
        )}
      </Card>

      <Card className="idecan-card idecan-card--recommendations">
        <CardHeader>
          <CardTitle className="text-base">O que fazer com isso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recs.map((r) => (
            <div key={r.title} className="rounded-lg border p-4 text-sm">
              <strong>{r.title}</strong>
              <p className="mt-1 leading-relaxed text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="idecan-card idecan-card--continue">
        <CardHeader>
          <CardTitle className="text-base">Continue a preparação</CardTitle>
          <CardDescription>
            Leve esse diagnóstico para onde você organiza e pratica os estudos.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/dashboard/study-coach"
            className="flex items-center gap-3 rounded-xl border p-3 text-sm transition-[background-color,transform] duration-150 hover:bg-muted/60 active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <ClipboardList className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>
              <strong className="block">Ajustar meu planejamento</strong>
              <span className="text-xs text-muted-foreground">
                Redistribua a semana pelas disciplinas de maior peso.
              </span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
          <Link
            to="/dashboard/question-trainer"
            search={{ board: "IDECAN" }}
            className="flex items-center gap-3 rounded-xl border p-3 text-sm transition-[background-color,transform] duration-150 hover:bg-muted/60 active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <Target className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>
              <strong className="block">Treinar questões da IDECAN</strong>
              <span className="text-xs text-muted-foreground">
                Pratique com correção imediata, filtrando pela banca.
              </span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
          <Link
            to="/dashboard/mock-exams"
            search={{ board: "IDECAN" }}
            className="flex items-center gap-3 rounded-xl border p-3 text-sm transition-[background-color,transform] duration-150 hover:bg-muted/60 active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <CalendarClock className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>
              <strong className="block">Simular uma prova da IDECAN</strong>
              <span className="text-xs text-muted-foreground">
                Resolva um caderno real em condições de prova.
              </span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
          <Link
            to="/dashboard/perfil-bancas"
            className="flex items-center gap-3 rounded-xl border p-3 text-sm transition-[background-color,transform] duration-150 hover:bg-muted/60 active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <BookOpenText className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>
              <strong className="block">Comparar com outras bancas</strong>
              <span className="text-xs text-muted-foreground">
                A mesma análise, para qualquer banca do acervo.
              </span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        </CardContent>
      </Card>

      </section>
      </>}
      <footer className="idecan-method-note"><Info aria-hidden="true" /> Histórico de questões oficiais ativas. O edital PC-AC 001/2026 orienta a preparação; diferenças estatísticas não garantem resultados futuros.</footer>
    </section>
    </Theme>
  );
}
