import { PlatformActivityHistory } from "@/components/dashboard/PlatformActivityHistory";
import { canonicalSubject } from "@/lib/subjects";
import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BookOpenCheck,
  Brain,
  Flame,
  Gauge,
  Lightbulb,
  ListChecks,
  Target,
  Trophy,
} from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LockedState } from "@/components/dashboard/PageHero";
import { cn } from "@/lib/utils";
import { StudyTimeCard } from "@/components/dashboard/StudyTimeCard";
import { usePerformanceOverview, type SubjectAccuracy } from "@/hooks/usePerformanceOverview";
import { useStudyMaterialList, type StudyMaterialSummary } from "@/lib/studyMaterials";
import { rhythmInsights, type RhythmKind } from "@/lib/rhythmInsights";

export const Route = createFileRoute("/dashboard/performance")({
  component: PerformancePage,
});

const MIN_ITEMS_FOR_SIGNAL = 5;
const WEAK_THRESHOLD = 60;

function PerformancePage() {
  const { user, isLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const { data, loading, error, retry } = usePerformanceOverview(user?.id, real);
  const { data: libraryMaterials } = useStudyMaterialList(real);
  if (isLoading) return <p role="status">Carregando seu desempenho…</p>;
  if (!real || !user)
    return (
      <LockedState
        image="dashboard"
        title="Meu desempenho"
        description="Entre para acompanhar seus estudos, questões e simulados na plataforma."
      />
    );
  return (
    <div className="space-y-6">
      <section className="page-hero page-hero--lg" data-hero="dashboard">
        <div className="page-hero__text">
          <span className="hero-chip">
            <Activity /> Estudos na plataforma
          </span>
          <h1>
            Meu <em>desempenho</em>
          </h1>
          <p className="page-hero__desc">
            Acompanhe acertos, tempo de resposta, simulados e tempo ativo de estudo. Os resultados
            de concursos realizados ficam em uma área própria.
          </p>
        </div>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
        <div>
          <p className="font-semibold">Procurando suas provas de concursos?</p>
          <p className="text-sm text-muted-foreground">
            Envios, cadernos, gabaritos e notas de corte ficam em Minhas provas e diagnóstico.
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-semibold hover:bg-muted"
          to="/dashboard/student-exams"
          search={{ career: undefined }}
        >
          Minhas provas e diagnóstico →
        </Link>
      </div>
      {error ? (
        <div role="alert" className="rounded-2xl border p-5">
          <p>
            Não foi possível carregar os indicadores. Nenhum dado indisponível foi tratado como
            zero.
          </p>
          <button
            type="button"
            className="mt-3 min-h-11 rounded-lg border px-4 font-semibold"
            onClick={retry}
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <PerformanceOverviewTab
          userId={user.id}
          overview={data}
          loading={loading}
          libraryMaterials={libraryMaterials ?? []}
        />
      )}
      {data && !error && (
        <PlatformActivityHistory
          userId={user.id}
          responses={data.responses}
          attempts={data.attempts}
        />
      )}
    </div>
  );
}

const RHYTHM_STYLE: Record<RhythmKind, { label: string; cls: string }> = {
  strong: {
    label: "Ponto forte",
    cls: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
  },
  "strong-slow": {
    label: "Acerta, mas devagar",
    cls: "bg-sky-100 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200",
  },
  neutral: { label: "No esperado", cls: "bg-muted text-foreground" },
  weak: {
    label: "Ponto fraco",
    cls: "bg-rose-100 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
  },
  "weak-fast": {
    label: "Erra com pressa",
    cls: "bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200",
  },
  "weak-slow": {
    label: "Lacuna de conteúdo",
    cls: "bg-rose-200 text-rose-950 dark:bg-rose-950/60 dark:text-rose-100",
  },
};
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Pontos fortes e fracos por matéria, cruzando acerto com o tempo médio por questão (só a 1ª resposta de cada uma). */
function RhythmCard({
  subjects,
}: {
  subjects: import("@/hooks/usePerformanceOverview").SubjectAccuracy[];
}) {
  const { items, overallSeconds } = rhythmInsights(subjects);
  if (!items.length) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seu ritmo por matéria</CardTitle>
        <CardDescription>
          Acerto e tempo médio por questão, comparados com a sua própria média (
          {mmss(overallSeconds)} por questão). Cada questão tem cronômetro próprio, que conta só o
          tempo em que você está com ela aberta e ativo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((i) => (
          <div key={i.subject} className="rounded-xl border p-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold">{i.subject}</p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${RHYTHM_STYLE[i.kind].cls}`}
              >
                {RHYTHM_STYLE[i.kind].label}
              </span>
              <p className="ml-auto text-xs text-muted-foreground">
                {i.accuracy}% de acerto · {mmss(i.avgSeconds)} por questão · {i.total} questões
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{i.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function PerformanceOverviewTab({
  userId,
  overview,
  loading,
  libraryMaterials,
}: {
  userId: string;
  overview: import("@/hooks/usePerformanceOverview").PerformanceOverview | null;
  loading: boolean;
  libraryMaterials: StudyMaterialSummary[];
}) {
  if (loading || !overview)
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        Reunindo tempo de estudo, questões, simulados e revisões…
      </div>
    );

  const { trainer, difficulty, simulators, errors, streak, rank } = overview;
  const weakSubjects = trainer.bySubject.filter(
    (s) => s.total >= MIN_ITEMS_FOR_SIGNAL && s.accuracy < WEAK_THRESHOLD,
  );
  const strongSubjects = trainer.bySubject.filter(
    (s) => s.total >= MIN_ITEMS_FOR_SIGNAL && s.accuracy >= 80,
  );
  const libraryByDiscipline = new Map<string, StudyMaterialSummary>();
  for (const item of libraryMaterials) {
    const key = canonicalSubject(item.discipline);
    if (!libraryByDiscipline.has(key)) libraryByDiscipline.set(key, item);
  }

  const suggestions = buildSuggestions({
    weakSubjects,
    errors,
    simulators,
    streak,
    libraryByDiscipline,
  });

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ListChecks}
          label="Questões respondidas"
          value={String(trainer.totalAnswered)}
          detail={
            trainer.totalAnswered ? `${trainer.accuracy}% de aproveitamento` : "Comece no Treinador"
          }
          tone="navy"
        />
        <MetricCard
          icon={Brain}
          label="Simulados realizados"
          value={String(simulators.count)}
          detail={
            simulators.count
              ? `melhor resultado: ${simulators.bestAccuracy}%`
              : "Ainda nenhum simulado"
          }
          tone="amber"
        />
        <MetricCard
          icon={Flame}
          label="Sequência de estudo"
          value={`${streak.current} dia${streak.current === 1 ? "" : "s"}`}
          detail={`recorde: ${streak.longest} dia${streak.longest === 1 ? "" : "s"}`}
          tone={streak.current > 0 ? "emerald" : "rose"}
        />
        <MetricCard
          icon={Trophy}
          label={rank ? rank.levelName : "Nível"}
          value={rank ? `${rank.totalPoints} pts` : "—"}
          detail={
            rank
              ? `${rank.stars} estrela${rank.stars === 1 ? "" : "s"}`
              : "Responda questões para pontuar"
          }
          tone="navy"
        />
      </section>

      <RhythmCard subjects={trainer.bySubject} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="h-5 w-5 text-primary" />
              Pontos fortes e fracos no Treinador
            </CardTitle>
            <CardDescription>
              Primeira resposta de cada questão, por disciplina. Repetições não aumentam sua
              amostra.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trainer.bySubject.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Responda questões no Treinador para ver seus pontos fortes e fracos aqui.
              </p>
            ) : (
              <>
                {strongSubjects.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-xs font-black uppercase tracking-wider text-emerald-700">
                      Pontos fortes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {strongSubjects.map((s) => (
                        <Badge
                          key={s.subject}
                          variant="outline"
                          className="border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300"
                        >
                          {s.subject} · {s.accuracy}%
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {weakSubjects.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-xs font-black uppercase tracking-wider text-rose-700">
                      Precisam de reforço
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {weakSubjects.map((s) => (
                        <Badge
                          key={s.subject}
                          variant="outline"
                          className="border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300"
                        >
                          {s.subject} · {s.accuracy}%
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <SubjectTable subjects={trainer.bySubject} />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpenCheck className="h-5 w-5 text-primary" />
              Caderno de erros
            </CardTitle>
            <CardDescription>
              Classificações registradas no Caderno de erros, por status de revisão.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {errors.total === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma classificação de revisão registrada. Os acertos e erros das suas respostas
                aparecem no detalhamento por disciplina.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 font-semibold text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300">
                  {errors.pendente} pendentes
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-semibold text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-300">
                  {errors.revisado} revisadas
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {errors.dominado} dominadas
                </span>
              </div>
            )}
            <Link
              to="/dashboard/errors"
              className="inline-block text-xs font-bold text-primary hover:underline"
            >
              Abrir o Caderno de erros →
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Onde você precisa de mais atenção
          </CardTitle>
          <CardDescription>
            Cruzamos seus erros e o tempo mediano por questão para apontar a disciplina e o assunto
            que merecem reforço.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {difficulty.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Responda questões no Treinador para criar seu diagnóstico de dificuldade.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {difficulty.slice(0, 6).map((item) => (
                <div
                  key={`${item.subject}-${item.topic}`}
                  className="rounded-xl border bg-muted/20 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold" title={item.subject}>
                        {item.subject}
                      </p>
                      <p className="truncate text-xs text-muted-foreground" title={item.topic}>
                        {item.topic}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                      {item.difficultyScore}% atenção
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {item.accuracy}% de acertos · {item.answered}{" "}
                      {item.answered === 1 ? "questão" : "questões"}
                    </span>
                    <span className="tabular-nums">mediana {item.medianSeconds}s</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${Math.max(4, item.difficultyScore)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Sugestões e estratégia de estudo
          </CardTitle>
          <CardDescription>
            Geradas a partir do seu desempenho real — focam no que mais vai pesar na sua nota.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Continue respondendo questões e fazendo simulados para receber sugestões
              personalizadas.
            </p>
          ) : (
            suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border p-3 text-sm">
                <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div className="min-w-0">
                  <p>{s.text}</p>
                  {s.link?.kind === "library" && (
                    <Link
                      to="/dashboard/library/$slug"
                      params={{ slug: s.link.slug }}
                      className="mt-1 inline-block text-xs font-bold text-primary hover:underline"
                    >
                      {s.link.label} →
                    </Link>
                  )}
                  {s.link?.kind === "errors" && (
                    <Link
                      to="/dashboard/errors"
                      className="mt-1 inline-block text-xs font-bold text-primary hover:underline"
                    >
                      {s.link.label} →
                    </Link>
                  )}
                  {s.link?.kind === "mock-exams" && (
                    <Link
                      to="/dashboard/mock-exams"
                      className="mt-1 inline-block text-xs font-bold text-primary hover:underline"
                    >
                      {s.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <StudyTimeCard userId={userId} />
    </div>
  );
}

type SuggestionLink =
  | { kind: "library"; slug: string; label: string }
  | { kind: "errors"; label: string }
  | { kind: "mock-exams"; label: string };

interface Suggestion {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  link?: SuggestionLink | undefined;
}

function buildSuggestions({
  weakSubjects,
  errors,
  simulators,
  streak,
  libraryByDiscipline,
}: {
  weakSubjects: SubjectAccuracy[];
  errors: { pendente: number; total: number };
  simulators: { count: number };
  streak: { current: number };
  libraryByDiscipline: Map<string, StudyMaterialSummary>;
}): Suggestion[] {
  const suggestions: Suggestion[] = [];
  for (const subject of weakSubjects.slice(0, 3)) {
    const material = libraryByDiscipline.get(subject.subject);
    suggestions.push({
      icon: Target,
      text: `${subject.subject} está com ${subject.accuracy}% de acerto — abaixo do ideal. Revise a teoria e volte a praticar.`,
      link: material
        ? {
            kind: "library",
            slug: material.slug,
            label: `Estudar "${material.title}" na Biblioteca`,
          }
        : undefined,
    });
  }
  if (errors.pendente > 0)
    suggestions.push({
      icon: AlertTriangle,
      text: `Você tem ${errors.pendente} questão${errors.pendente === 1 ? "" : "s"} marcada${
        errors.pendente === 1 ? "" : "s"
      } como "ainda tenho dúvida" no Caderno de erros. Revisá-las é o jeito mais rápido de ganhar pontos.`,
      link: { kind: "errors", label: "Abrir o Caderno de erros" },
    });
  if (simulators.count === 0)
    suggestions.push({
      icon: Brain,
      text: "Você ainda não fez nenhum simulado cronometrado. Simular a prova real ajuda a treinar ritmo e ansiedade, além de medir sua nota estimada.",
      link: { kind: "mock-exams", label: "Fazer um simulado" },
    });
  if (streak.current === 0)
    suggestions.push({
      icon: Flame,
      text: "Sua sequência de estudo está zerada. Estudar um pouco todo dia rende mais do que maratonas espaçadas — comece hoje.",
    });
  return suggestions;
}

const TONE_STYLES: Record<string, string> = {
  navy: "bg-ink text-white",
  emerald: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
  amber: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  rose: "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
};

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "navy",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail?: string;
  tone?: keyof typeof TONE_STYLES;
}) {
  return (
    <Card className={cn("border-none shadow-sm", TONE_STYLES[tone])}>
      <CardContent className="flex items-start gap-3 p-4">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 opacity-80" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
          <p className="truncate text-xl font-black">{value}</p>
          {detail && <p className="mt-0.5 truncate text-[11px] opacity-70">{detail}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function SubjectTable({
  subjects,
}: {
  subjects: { subject: string; correct: number; total: number; accuracy: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalhamento por matéria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjects.map((s) => (
          <div
            key={s.subject}
            className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 text-xs"
          >
            <span className="col-span-2 min-w-0 break-words font-semibold sm:col-span-1">
              {s.subject}
            </span>
            <div className="col-span-2 flex min-w-0 flex-wrap items-center gap-2 sm:col-span-1 sm:justify-end">
              <span className="tabular-nums text-muted-foreground">
                {s.correct}/{s.total} ({s.accuracy}%)
              </span>
              {s.total < MIN_ITEMS_FOR_SIGNAL && (
                <Badge variant="outline" className="text-[10px] text-muted-foreground">
                  amostra pequena
                </Badge>
              )}
            </div>
            <div className="col-span-2 h-2 min-w-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={cn(
                  "h-full rounded-full",
                  s.accuracy < 50
                    ? "bg-rose-500"
                    : s.accuracy < 75
                      ? "bg-amber-500"
                      : "bg-emerald-500",
                )}
                style={{ width: `${s.accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
