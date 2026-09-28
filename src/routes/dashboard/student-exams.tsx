import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Award,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleSlash2,
  ExternalLink,
  FileStack,
  Image as ImageIcon,
  Lightbulb,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student-exams")({
  validateSearch: (search: Record<string, unknown>) => ({
    career: typeof search.career === "string" ? search.career : undefined,
  }),
  component: StudentExamIntelligence,
  errorComponent: ExamRouteError,
});

type Verdict = "correta" | "errada" | "anulada" | "branco" | "pendente_conferencia";

interface ExamAnalysis {
  items?: Record<string, Verdict>;
  resultado_oficial?: { nota_total?: number; classificacao_ampla_objetiva?: number };
}

interface ExamRow {
  id: string;
  contest_name: string | null;
  contest_year: string | number | null;
  exam_board: string | null;
  correct_count: number | null;
  wrong_count: number | null;
  blank_count: number | null;
  score_net: number | null;
  score_raw: number | null;
  file_name: string;
  storage_path: string;
  extracted_data: ExamAnalysis | null;
}

interface QuestionReference {
  key: string;
  contest: string;
  year: string;
  item: number;
  subject: string;
  subtopic: string | null;
  text: string;
  answer: string | null;
  explanation: string;
  legalBasis: Array<{ title?: string; norma?: string; artigo?: string; url?: string }>;
}

interface ExamGroup {
  key: string;
  contest: string;
  canonicalContest: string;
  year: string;
  board: string;
  correct: number;
  wrong: number;
  blank: number;
  score: number;
  analysis: ExamAnalysis | null;
  pages: ExamRow[];
}

interface SubjectMetric {
  subject: string;
  correct: number;
  wrong: number;
  blank: number;
  total: number;
  accuracy: number;
}

const canonicalContest = (name: string) =>
  name.toLocaleLowerCase("pt-BR").includes("agente de polícia federal") ? "Polícia Federal" : name;

const percent = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

const questionKey = (contest: string, year: string, item: number) =>
  `${canonicalContest(contest)}__${year}__${item}`;

function StudentExamIntelligence() {
  const { career } = Route.useSearch();
  const [rows, setRows] = React.useState<ExamRow[]>([]);
  const [questions, setQuestions] = React.useState<Map<string, QuestionReference>>(new Map());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedContest, setSelectedContest] = React.useState<string | null>(null);
  const [openExam, setOpenExam] = React.useState<string | null>(null);
  const [pageUrls, setPageUrls] = React.useState<Record<string, string>>({});
  const [reloadKey, setReloadKey] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData.session;
        if (!session) throw new Error("Sua sessão expirou. Entre novamente para ver as provas.");

        const [examResult, officialResult, personalResult] = await Promise.all([
          supabase
            .from("student_exam_documents")
            .select(
              "id,contest_name,contest_year,exam_board,correct_count,wrong_count,blank_count,score_net,score_raw,file_name,storage_path,extracted_data",
            )
            .eq("user_id", session.user.id)
            .order("contest_year", { ascending: true }),
          supabase
            .from("official_exam_questions")
            .select(
              "contest_name,exam_year,item_number,subject,question_text,official_answer,review_note,legal_basis,content_status",
            )
            .eq("content_status", "active"),
          supabase
            .from("question_bank")
            .select(
              "contest_name,contest_year,item_number,subject,subtopic,question_text,official_answer,explanation,legal_basis,content_status",
            )
            .eq("user_id", session.user.id),
        ]);
        if (examResult.error) throw examResult.error;

        const referenceMap = new Map<string, QuestionReference>();
        for (const raw of (officialResult.data || []) as Array<Record<string, unknown>>) {
          const contest = String(raw.contest_name || "Concurso");
          const year = String(raw.exam_year || "");
          const item = Number(raw.item_number || 0);
          referenceMap.set(questionKey(contest, year, item), {
            key: questionKey(contest, year, item),
            contest,
            year,
            item,
            subject: String(raw.subject || "Disciplina não classificada"),
            subtopic: null,
            text: String(raw.question_text || "Enunciado indisponível"),
            answer: raw.official_answer ? String(raw.official_answer) : null,
            explanation: String(
              raw.review_note ||
                "Gabarito confirmado na fonte oficial. A explicação pedagógica detalhada ainda está em revisão editorial.",
            ),
            legalBasis: Array.isArray(raw.legal_basis) ? raw.legal_basis : [],
          });
        }
        for (const raw of (personalResult.data || []) as Array<Record<string, unknown>>) {
          const status = String(raw.content_status || "active");
          if (["obsolete", "revoked", "archived"].includes(status)) continue;
          const contest = String(raw.contest_name || "Concurso");
          const year = String(raw.contest_year || "");
          const item = Number(raw.item_number || 0);
          referenceMap.set(questionKey(contest, year, item), {
            key: questionKey(contest, year, item),
            contest,
            year,
            item,
            subject: String(raw.subject || "Disciplina não classificada"),
            subtopic: raw.subtopic ? String(raw.subtopic) : null,
            text: String(raw.question_text || "Enunciado indisponível"),
            answer: raw.official_answer ? String(raw.official_answer) : null,
            explanation: String(raw.explanation || "Explicação em revisão editorial."),
            legalBasis: Array.isArray(raw.legal_basis) ? raw.legal_basis : [],
          });
        }

        if (!active) return;
        setRows((examResult.data || []) as ExamRow[]);
        setQuestions(referenceMap);
      } catch (loadError) {
        console.error("Falha ao carregar inteligência de provas", loadError);
        if (active)
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Não foi possível carregar suas provas.",
          );
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const groups = React.useMemo(() => {
    const grouped = new Map<string, ExamGroup>();
    for (const row of rows) {
      const contest = String(row.contest_name || "Concurso");
      const year = String(row.contest_year || "—");
      const key = `${contest}__${year}`;
      const current = grouped.get(key) || {
        key,
        contest,
        canonicalContest: canonicalContest(contest),
        year,
        board: String(row.exam_board || "Banca não informada"),
        correct: 0,
        wrong: 0,
        blank: 0,
        score: 0,
        analysis: null,
        pages: [],
      };
      if (row.storage_path?.startsWith("manual-entry/")) {
        current.correct = Number(row.correct_count ?? 0);
        current.wrong = Number(row.wrong_count ?? 0);
        current.blank = Number(row.blank_count ?? 0);
        current.score = Number(row.score_net ?? row.score_raw ?? 0);
        current.analysis = row.extracted_data;
      } else {
        current.pages.push(row);
      }
      grouped.set(key, current);
    }
    return Array.from(grouped.values()).sort((a, b) =>
      a.year.localeCompare(b.year, "pt-BR", { numeric: true }),
    );
  }, [rows]);

  React.useEffect(() => {
    if (!groups.length) return;
    const requested = career
      ? groups.find((group) => {
          const expected = career.toLocaleLowerCase("pt-BR");
          const actual = group.contest.toLocaleLowerCase("pt-BR");
          return actual.includes(expected) || expected.includes(actual);
        })?.contest
      : null;
    setSelectedContest(
      (current) =>
        requested ||
        (current && groups.some((group) => group.contest === current)
          ? current
          : groups.at(-1)?.contest || null),
    );
  }, [groups, career]);

  const subjectMetrics = React.useMemo(() => {
    const map = new Map<string, SubjectMetric>();
    for (const group of groups) {
      for (const [itemText, verdict] of Object.entries(group.analysis?.items || {})) {
        const reference = questions.get(
          questionKey(group.canonicalContest, group.year, Number(itemText)),
        );
        if (!reference || verdict === "anulada" || verdict === "pendente_conferencia") continue;
        const metric = map.get(reference.subject) || {
          subject: reference.subject,
          correct: 0,
          wrong: 0,
          blank: 0,
          total: 0,
          accuracy: 0,
        };
        if (verdict === "correta") metric.correct += 1;
        if (verdict === "errada") metric.wrong += 1;
        if (verdict === "branco") metric.blank += 1;
        metric.total += 1;
        metric.accuracy = percent(metric.correct, metric.correct + metric.wrong);
        map.set(reference.subject, metric);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.accuracy - b.accuracy || b.total - a.total);
  }, [groups, questions]);

  if (loading) return <LoadingState />;
  if (error)
    return (
      <EmptyState title="Não foi possível carregar suas provas" description={error}>
        <Button onClick={() => setReloadKey((value) => value + 1)}>
          <RefreshCw className="mr-2 h-4 w-4" /> Tentar novamente
        </Button>
      </EmptyState>
    );
  if (!groups.length)
    return (
      <EmptyState
        title="Nenhuma prova encontrada"
        description="Não há provas vinculadas à conta atualmente conectada."
      />
    );

  const attempts = groups.filter((group) => group.correct + group.wrong + group.blank > 0);
  const totalCorrect = attempts.reduce((sum, group) => sum + group.correct, 0);
  const totalWrong = attempts.reduce((sum, group) => sum + group.wrong, 0);
  const totalBlank = attempts.reduce((sum, group) => sum + group.blank, 0);
  const totalItems = totalCorrect + totalWrong + totalBlank;
  const responseAccuracy = percent(totalCorrect, totalCorrect + totalWrong);
  const omissionRate = percent(totalBlank, totalItems);
  const bestAttempt = [...attempts].sort((a, b) => examAccuracy(b) - examAccuracy(a))[0];
  const firstAttempt = attempts[0];
  const latestAttempt = attempts.at(-1);
  const evolution =
    latestAttempt && firstAttempt ? examAccuracy(latestAttempt) - examAccuracy(firstAttempt) : 0;
  const contests = Array.from(new Set(groups.map((group) => group.contest)));
  const selectedGroups = groups.filter((group) => group.contest === selectedContest);
  const weakest = subjectMetrics[0];
  const strongest = [...subjectMetrics].sort(
    (a, b) => b.accuracy - a.accuracy || b.total - a.total,
  )[0];

  const toggleExam = async (group: ExamGroup) => {
    if (openExam === group.key) {
      setOpenExam(null);
      return;
    }
    setOpenExam(group.key);
    const missing = group.pages.filter((page) => !pageUrls[page.id]);
    if (!missing.length) return;
    const signed = await Promise.all(
      missing.map((page) =>
        supabase.storage.from("student-exams").createSignedUrl(page.storage_path, 3600),
      ),
    );
    setPageUrls((current) => {
      const next = { ...current };
      missing.forEach((page, index) => {
        const url = signed[index].data?.signedUrl;
        if (url) next[page.id] = url;
      });
      return next;
    });
  };

  return (
    <div className="space-y-7 pb-10">
      <Hero attempts={attempts.length} years={new Set(attempts.map((item) => item.year)).size} />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Target}
          label="Precisão ao responder"
          value={`${responseAccuracy}%`}
          detail={`${totalCorrect} acertos em ${totalCorrect + totalWrong} respondidas`}
          tone="emerald"
        />
        <MetricCard
          icon={CircleSlash2}
          label="Taxa de omissão"
          value={`${omissionRate}%`}
          detail={`${totalBlank} itens deixados em branco`}
          tone={omissionRate > 20 ? "rose" : "amber"}
        />
        <MetricCard
          icon={Award}
          label="Melhor desempenho"
          value={`${bestAttempt ? examAccuracy(bestAttempt) : 0}%`}
          detail={bestAttempt ? `${bestAttempt.contest} ${bestAttempt.year}` : "Sem dados"}
          tone="navy"
        />
        <MetricCard
          icon={evolution >= 0 ? TrendingUp : TrendingDown}
          label="Evolução histórica"
          value={`${evolution >= 0 ? "+" : ""}${evolution} p.p.`}
          detail={
            firstAttempt && latestAttempt
              ? `${firstAttempt.year} → ${latestAttempt.year}`
              : "Uma tentativa"
          }
          tone={evolution >= 0 ? "emerald" : "rose"}
        />
      </section>
      <Timeline groups={attempts} />
      <section className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <DisciplineAnalysis metrics={subjectMetrics} />
        <ActionPlan
          weakest={weakest}
          strongest={strongest}
          omissionRate={omissionRate}
          wrong={totalWrong}
          blank={totalBlank}
        />
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-primary">Desempenho por concurso</h2>
          <p className="text-sm text-muted-foreground">
            As métricas permanecem separadas por carreira e banca.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {contests.map((contest) => (
            <button
              key={contest}
              type="button"
              onClick={() => setSelectedContest(contest)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-bold transition",
                selectedContest === contest
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40"
                  : "border-slate-200 text-muted-foreground hover:border-emerald-300",
              )}
            >
              {contest}
            </button>
          ))}
        </div>
        {selectedGroups.map((group) => (
          <ContestCard
            key={group.key}
            group={group}
            references={questions}
            open={openExam === group.key}
            pageUrls={pageUrls}
            onToggle={() => void toggleExam(group)}
          />
        ))}
      </section>
    </div>
  );
}

function Hero({ attempts, years }: { attempts: number; years: number }) {
  return (
    <section className="relative overflow-hidden rounded-[30px] bg-[#071a2f] px-6 py-8 text-white shadow-xl md:px-10 md:py-10">
      <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <Badge className="mb-4 border-emerald-300/20 bg-emerald-400/10 text-emerald-200">
            Inteligência de desempenho
          </Badge>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Minha trajetória em concursos
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Uma leitura objetiva do seu histórico, das falhas recorrentes e do próximo passo de
            estudo.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center">
            <p className="text-2xl font-black text-emerald-300">{attempts}</p>
            <p className="text-[11px] text-slate-400">provas analisadas</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center">
            <p className="text-2xl font-black text-emerald-300">{years}</p>
            <p className="text-[11px] text-slate-400">anos no histórico</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline({ groups }: { groups: ExamGroup[] }) {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-emerald-600" /> Linha do tempo geral
        </CardTitle>
        <CardDescription>
          Aproveitamento nas questões respondidas; compare concursos com cautela porque bancas e
          critérios mudam.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto pb-6">
        <div className="flex min-w-max items-start gap-0">
          {groups.map((group, index) => {
            const accuracy = examAccuracy(group);
            const previous = index ? examAccuracy(groups[index - 1]) : null;
            const delta = previous === null ? null : accuracy - previous;
            return (
              <div key={group.key} className="relative w-44 px-3 text-center">
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-200" />
                <div
                  className={cn(
                    "relative mx-auto flex h-11 w-11 items-center justify-center rounded-full border-4 border-background text-xs font-black text-white",
                    accuracy >= 70
                      ? "bg-emerald-500"
                      : accuracy >= 50
                        ? "bg-amber-500"
                        : "bg-rose-500",
                  )}
                >
                  {accuracy}%
                </div>
                <p className="mt-3 text-sm font-black">{group.year}</p>
                <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                  {group.contest}
                </p>
                {delta !== null && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "mt-2 text-[10px]",
                      delta >= 0 ? "text-emerald-700" : "text-rose-700",
                    )}
                  >
                    {delta >= 0 ? "+" : ""}
                    {delta} p.p.
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function DisciplineAnalysis({ metrics }: { metrics: SubjectMetric[] }) {
  const ranked = [...metrics].sort((a, b) => b.total - a.total).slice(0, 12);
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-violet-600" /> Raio-X das disciplinas
        </CardTitle>
        <CardDescription>
          Calculado somente sobre itens com classificação editorial disponível. Cobertura atual:{" "}
          {metrics.reduce((sum, item) => sum + item.total, 0)} itens.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {ranked.length ? (
          ranked.map((item) => (
            <div key={item.subject}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="truncate font-bold" title={item.subject}>
                  {item.subject}
                </span>
                <span
                  className={cn(
                    "font-black",
                    item.accuracy >= 70
                      ? "text-emerald-600"
                      : item.accuracy >= 50
                        ? "text-amber-600"
                        : "text-rose-600",
                  )}
                >
                  {item.accuracy}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={cn(
                    "h-full rounded-full",
                    item.accuracy >= 70
                      ? "bg-emerald-500"
                      : item.accuracy >= 50
                        ? "bg-amber-500"
                        : "bg-rose-500",
                  )}
                  style={{ width: `${item.accuracy}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {item.correct} acertos · {item.wrong} erros · {item.blank} em branco
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            As disciplinas ainda estão em revisão editorial e aparecerão aqui quando forem
            liberadas.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ActionPlan({
  weakest,
  strongest,
  omissionRate,
  wrong,
  blank,
}: {
  weakest?: SubjectMetric;
  strongest?: SubjectMetric;
  omissionRate: number;
  wrong: number;
  blank: number;
}) {
  const steps = [
    weakest
      ? `Prioridade 1: revisar ${weakest.subject}, atualmente com ${weakest.accuracy}% de precisão em ${weakest.total} itens mapeados.`
      : "Prioridade 1: concluir a classificação editorial das disciplinas.",
    omissionRate > 20
      ? `Treinar decisão de resposta: ${blank} itens ficaram em branco (${omissionRate}%). Separe desconhecimento de falta de tempo.`
      : `A taxa de omissão está controlada em ${omissionRate}%; preserve a seleção cuidadosa de respostas.`,
    `Criar um ciclo de revisão dos ${wrong} erros: conceito → exemplo resolvido → nova questão em 24 horas e novamente em 7 dias.`,
  ];
  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm dark:from-emerald-950/30 dark:to-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-amber-500" /> Plano de ação orientado por dados
        </CardTitle>
        <CardDescription>
          {strongest
            ? `Ponto forte atual: ${strongest.subject} (${strongest.accuracy}%).`
            : "Plano atualizado conforme novas provas forem analisadas."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex gap-3 rounded-xl border border-emerald-100 bg-white/80 p-3 text-sm dark:bg-slate-950/30"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
              {index + 1}
            </span>
            <p className="leading-relaxed">{step}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ContestCard({
  group,
  references,
  open,
  pageUrls,
  onToggle,
}: {
  group: ExamGroup;
  references: Map<string, QuestionReference>;
  open: boolean;
  pageUrls: Record<string, string>;
  onToggle: () => void;
}) {
  const answered = group.correct + group.wrong;
  const accuracy = percent(group.correct, answered);
  const reviewItems = Object.entries(group.analysis?.items || {})
    .flatMap(([itemText, verdict]) => {
      if (verdict !== "errada" && verdict !== "branco") return [];
      const reference = references.get(
        questionKey(group.canonicalContest, group.year, Number(itemText)),
      );
      return reference ? [{ reference, verdict }] : [];
    })
    .slice(0, 12);
  return (
    <Card
      className={cn(
        "overflow-hidden border-slate-200 shadow-sm",
        open && "border-emerald-300 shadow-md",
      )}
    >
      <button type="button" className="w-full text-left" onClick={onToggle}>
        <CardHeader className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/30">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
                {group.contest} — {group.year}
                <Badge className="bg-emerald-600">Analisada</Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {group.board} · {group.pages.length} páginas · {answered + group.blank} itens
                contabilizados
              </CardDescription>
            </div>
            <div className="grid grid-cols-4 items-center gap-5 text-center">
              <MiniMetric label="Acertos" value={group.correct} className="text-emerald-600" />
              <MiniMetric label="Erros" value={group.wrong} className="text-rose-600" />
              <MiniMetric label="Saldo" value={group.score} className="text-primary" />
              <div className="flex items-center gap-2">
                <MiniMetric label="Precisão" value={`${accuracy}%`} className="text-amber-600" />
                <ChevronDown className={cn("h-5 w-5 transition-transform", open && "rotate-180")} />
              </div>
            </div>
          </div>
        </CardHeader>
      </button>
      {open && (
        <CardContent className="space-y-6 border-t bg-slate-50/50 pt-5 dark:bg-slate-950/20">
          <div className="grid gap-3 sm:grid-cols-4">
            <ScoreBox
              icon={CheckCircle2}
              label="Corretas"
              value={group.correct}
              tone="text-emerald-600"
            />
            <ScoreBox icon={XCircle} label="Erradas" value={group.wrong} tone="text-rose-600" />
            <ScoreBox
              icon={CircleSlash2}
              label="Em branco"
              value={group.blank}
              tone="text-amber-600"
            />
            <ScoreBox icon={Target} label="Pontuação" value={group.score} tone="text-primary" />
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-black">
              <BookOpenCheck className="h-4 w-4" /> Como corrigir erros e omissões
            </h3>
            {reviewItems.length ? (
              <div className="space-y-3">
                {reviewItems.map(({ reference, verdict }) => (
                  <div key={reference.key} className="rounded-2xl border bg-background p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">Item {reference.item}</Badge>
                      <Badge className={verdict === "errada" ? "bg-rose-600" : "bg-amber-500"}>
                        {verdict === "errada" ? "Erro" : "Em branco"}
                      </Badge>
                      <span className="text-xs font-bold text-muted-foreground">
                        {reference.subject}
                        {reference.subtopic ? ` · ${reference.subtopic}` : ""}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">{reference.text}</p>
                    <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                      <strong>Resposta oficial: {reference.answer || "—"}.</strong>{" "}
                      {reference.explanation}
                    </div>
                    {reference.legalBasis.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {reference.legalBasis
                          .filter((basis) => basis.url)
                          .map((basis, index) => (
                            <a
                              key={`${reference.key}-${index}`}
                              href={basis.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
                            >
                              {basis.title || basis.norma || "Fonte oficial"}
                              {basis.artigo ? ` · ${basis.artigo}` : ""}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                <AlertTriangle className="mr-2 inline h-4 w-4" />
                As questões desta prova ainda não foram liberadas pela revisão editorial. Os números
                permanecem disponíveis, mas nenhuma orientação não verificada será exibida.
              </div>
            )}
          </div>
          {group.pages.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black">
                <ImageIcon className="h-4 w-4" /> Caderno digitalizado
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {group.pages.map((page, index) => (
                  <a
                    key={page.id}
                    href={pageUrls[page.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-[3/4] overflow-hidden rounded-xl border bg-muted shadow-sm transition hover:-translate-y-1 hover:ring-2 hover:ring-emerald-400"
                  >
                    {pageUrls[page.id] ? (
                      <img
                        src={pageUrls[page.id]}
                        alt={`Página ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                        carregando…
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-5 text-[10px] font-bold text-white">
                      Página {index + 1}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function examAccuracy(group: ExamGroup) {
  return percent(group.correct, group.correct + group.wrong);
}
function ScoreBox({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <Icon className={cn("mb-2 h-5 w-5", tone)} />
      <p className={cn("text-2xl font-black", tone)}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
  tone: "navy" | "emerald" | "amber" | "rose";
}) {
  const styles = {
    navy: "bg-[#071a2f] text-white",
    emerald: "bg-emerald-600 text-white",
    amber: "bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    rose: "bg-rose-50 text-rose-950 dark:bg-rose-950/30 dark:text-rose-100",
  };
  return (
    <Card className={cn("border-0 shadow-sm", styles[tone])}>
      <CardContent className="pt-5">
        <Icon className="mb-4 h-5 w-5 opacity-80" />
        <p className="text-xs font-bold uppercase tracking-wide opacity-70">{label}</p>
        <p className="mt-1 text-3xl font-black">{value}</p>
        <p className="mt-2 text-xs opacity-70">{detail}</p>
      </CardContent>
    </Card>
  );
}
function MiniMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: number | string;
  className?: string;
}) {
  return (
    <div>
      <p className={cn("text-lg font-black", className)}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
function LoadingState() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-3 text-center">
      <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
      <p className="text-sm font-bold">Calculando seu histórico de desempenho…</p>
      <p className="text-xs text-muted-foreground">
        Provas, disciplinas e questões estão sendo organizadas.
      </p>
    </div>
  );
}
function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-4 text-center">
      <FileStack className="h-14 w-14 text-muted-foreground/30" />
      <h2 className="text-xl font-black">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
function ExamRouteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <EmptyState
      title="O painel encontrou uma inconsistência"
      description="Seus dados continuam protegidos. Recarregue para reconstruir os indicadores."
    >
      <Button onClick={reset}>
        <RefreshCw className="mr-2 h-4 w-4" /> Recarregar painel
      </Button>
    </EmptyState>
  );
}
