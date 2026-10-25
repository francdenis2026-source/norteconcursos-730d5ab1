import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarClock,
  ClipboardList,
  Info,
  Landmark,
  Loader2,
  Minus,
  Radar,
  ScanSearch,
  ShieldCheck,
  Target,
} from "lucide-react";
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { canonicalBoard, canonicalCareerName, canonicalSubject } from "@/lib/subjects";
import {
  CONFIDENCE_LABEL,
  answerStats,
  confidence,
  dedupeQuestions,
  examKey,
  recommendations,
  recurringThemes,
  sequenceStats,
  splitByKind,
  subjectProfile,
  unifiedCareer,
  type BancaQuestion,
  type Verdict,
} from "@/lib/bancaProfile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/inteligencia-idecan")({
  component: InteligenciaIdecan,
  head: () => ({
    meta: [
      { title: "Inteligência IDECAN | Norte Concursos" },
      {
        name: "description",
        content:
          "Análise estatística real das provas da IDECAN no acervo, com foco nas provas de Polícia Civil para preparar a PC-AC.",
      },
    ],
  }),
});

/** Cargos de polícia civil (carreira investigativa), já unificados por unifiedCareer. */
const PC_CAREERS = new Set([
  "Delegado de Polícia",
  "Escrivão de Polícia",
  "Agente / Investigador de Polícia",
]);
const CURRENT_YEAR = new Date().getFullYear();

type Row = Record<string, unknown>;
type Page = PromiseLike<{ data: Row[] | null; error: unknown }>;

function rowToQuestion(r: Row): BancaQuestion | null {
  const board = canonicalBoard(String(r["board"] ?? ""));
  if (!board || board === "Não informada") return null;
  return {
    board,
    contest: String(r["contest_name"] ?? ""),
    career: unifiedCareer(
      canonicalCareerName(String(r["career_name"] ?? "")),
      String(r["contest_name"] ?? ""),
    ),
    rawCareer: String(r["career_name"] ?? ""),
    year: Number(r["exam_year"]),
    subject: canonicalSubject(String(r["subject"] ?? "")),
    topic: r["tested_topic"] ? String(r["tested_topic"]) : null,
    answer: String(r["official_answer"] ?? ""),
    item: r["item_number"] == null ? null : Number(r["item_number"]),
    text: String(r["stem"] ?? ""),
  };
}

async function loadIdecanQuestions(): Promise<BancaQuestion[]> {
  const rows = await fetchAllRows<Row>(
    (from, to) =>
      supabase
        .from("board_exam_questions")
        .select(
          "board,contest_name,career_name,exam_year,subject,tested_topic,official_answer,item_number,stem",
        )
        .ilike("board", "%IDECAN%")
        .eq("content_status", "active")
        .neq("official_answer", "X")
        .order("id")
        .range(from, to) as unknown as Page,
  );
  const out: BancaQuestion[] = [];
  for (const r of rows) {
    const q = rowToQuestion(r);
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
}: {
  subjects: ReturnType<typeof subjectProfile>["subjects"];
  maxShare: number;
}) {
  return (
    <div className="space-y-2">
      {subjects.slice(0, 12).map((s) => (
        <div key={s.subject} className="flex items-center gap-3 text-sm">
          <span className="w-40 shrink-0 truncate sm:w-52" title={s.subject}>
            {s.subject}
          </span>
          <div className="h-3 flex-1 overflow-hidden rounded bg-muted">
            <div
              className="h-full bg-primary/80"
              style={{ width: `${(s.share / maxShare) * 100}%` }}
            />
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
      ))}
    </div>
  );
}

function InteligenciaIdecan() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const query = useQuery({
    queryKey: ["inteligencia-idecan"],
    enabled: real,
    staleTime: 10 * 60_000,
    queryFn: loadIdecanQuestions,
  });
  const rows = query.data ?? [];

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
  const answerKinds: ("ce" | "mc")[] = [
    ...(answersCe ? (["ce"] as const) : []),
    ...(answersMc ? (["mc"] as const) : []),
  ];
  const recs = React.useMemo(
    () =>
      recommendations({
        board: "IDECAN",
        career: "Polícia Civil",
        answerKinds,
        subjects: profile.subjects,
        themes,
        conf,
      }),
    [answerKinds, profile.subjects, themes, conf],
  );

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
            Inteligência <em>IDECAN</em>
          </>
        }
        description="Entre na sua conta para ver a análise real das provas da IDECAN no acervo, com foco na Polícia Civil do Acre."
      />
    );
  if (query.isError)
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <PageHero
          image="field-map"
          size="sm"
          kicker="Meu objetivo"
          icon={Radar}
          title={
            <>
              Inteligência <em>IDECAN</em>
            </>
          }
          description="Não foi possível carregar as provas agora. Tente de novo em instantes."
        />
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <PageHero
        image="field-map"
        size="sm"
        kicker="Meu objetivo · banca esperada para a PC-AC"
        icon={Radar}
        title={
          <>
            Inteligência <em>IDECAN</em>
          </>
        }
        description="Leitura estatística das provas reais da IDECAN no acervo — o que ela mais cobra, tendências e padrões de gabarito — com foco nas provas de carreira policial civil, a referência mais próxima da Polícia Civil do Acre."
      >
        <div className="page-hero__stats">
          <HeroStat icon={Landmark} label="Provas IDECAN no acervo" value={examsAll} />
          <HeroStat icon={ShieldCheck} label="Provas de Polícia Civil" value={examsPc} />
          <HeroStat icon={ScanSearch} label="Questões analisadas (PC)" value={pcRows.length} />
        </div>
      </PageHero>

      <Card>
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
              como pista, não como tendência confirmada — e use o edital da PC-AC como guia
              principal assim que ele sair.
            </p>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mapa completo da IDECAN por disciplina</CardTitle>
          <CardDescription>
            Inclui todas as carreiras e provas da banca disponíveis no acervo, além do recorte de Polícia Civil.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allProfile.subjects.length ? (
            <SubjectBars subjects={allProfile.subjects} maxShare={Math.max(0.0001, ...allProfile.subjects.map((s) => s.share))} />
          ) : <p className="text-sm text-muted-foreground">Ainda não há disciplinas classificadas.</p>}
        </CardContent>
      </Card>

      {currentYearExams.length > 0 && (
        <Card>
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

      <Card>
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

      <Card>
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
            <SubjectBars subjects={profile.subjects} maxShare={maxShare} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Ainda sem dados suficientes para calcular o peso por disciplina.
            </p>
          )}
        </CardContent>
      </Card>

      {themes.length > 0 && (
        <Card>
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

      {(answersCe || answersMc) && (
        <Card>
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
                        <div key={letter} className="flex items-center gap-3 text-sm">
                          <span className="w-12 font-medium">
                            {key === "ce" ? (letter === "C" ? "Certo" : "Errado") : letter}
                          </span>
                          <div className="h-3 flex-1 overflow-hidden rounded bg-muted">
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

      <Card>
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

      <Card>
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

      <p className="flex gap-2 px-1 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        Como ler: as contas usam apenas questões oficiais ativas da IDECAN no acervo. Padrão
        estatístico não é garantia de que a próxima prova repita o histórico, e a PC-AC ainda não
        tem edital publicado — assim que sair, ele vem primeiro.
      </p>
    </div>
  );
}
