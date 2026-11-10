import { PlatformQuestionCounts } from "@/components/dashboard/PlatformQuestionCounts";
import { WeeklyRhythmChart } from "@/components/dashboard/WeeklyRhythmChart";
import "@/styles/student-desk.css";
import "@/styles/student-overview.css";
import "@/styles/student-overview-v3.css";
import "@/styles/student-hub-refresh.css";
import "@/styles/student-home-premium.css";
import "@/styles/student-home-navigation-refinement.css";
import "@/styles/student-dashboard-premium.css";
import "@/styles/student-adaptive-agenda.css";
import "@/styles/student-overview-card-refinement.css";
import "@/styles/student-home-hero-rework.css";
import "@/styles/student-dashboard-professional-refinement.css";
import "@/styles/student-home-astrix.css";
import { StudentMetricPanel, type StudentMetric } from "@/components/dashboard/StudentMetricPanel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ResumeSessions } from "@/components/dashboard/ResumeSessions";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Medal,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import {
  summarizeTraining,
  summarizeStudyTime,
  validDashboardConfig,
  dashboardSchedule,
  daysToExam,
} from "@/lib/studentDashboard";
import { canonicalDiscipline } from "@/lib/cronograma";
import { acreDateKey, acreHour, ACRE_TZ } from "@/lib/acreTime";
import { platformDate } from "@/lib/platformClock";
import { hasActiveEdital } from "@/lib/cronogramaGuard";
import { getStudyToday, subscribeStudyClock, fmtHuman } from "@/lib/studyClock";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { LockedState } from "@/components/dashboard/PageHero";
import { PcprExamSpotlight } from "@/components/dashboard/PcprExamSpotlight";
import { PcAcreEditalSpotlight } from "@/components/dashboard/PcAcreEditalSpotlight";
import type { UserProfile } from "@/types";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Área do aluno | Norte Concursos" },
      {
        name: "description",
        content:
          "Seu próximo passo, cronograma e evolução nos estudos, conectados aos registros da plataforma.",
      },
    ],
  }),
  component: DashboardIndex,
});
const liveMinutes = () => Math.floor(getStudyToday() / 60) * 60;
const number = (n: number) => n.toLocaleString("pt-BR");
const duration = (seconds: number) => (seconds > 0 ? fmtHuman(seconds) : "0 min");
const formatExamDate = (value?: string | null) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
};
const destinations = [
  {
    to: "/dashboard/cronograma",
    title: "Cronograma",
    text: "Organize seu dia de estudo",
    tone: "gold",
    icon: CalendarClock,
  },
  {
    to: "/dashboard/question-trainer",
    title: "Questões",
    tone: "teal",
    text: "Pratique e revise seus erros",
    icon: BrainCircuit,
  },
  {
    to: "/dashboard/library",
    title: "Conteúdo",
    tone: "gold",
    text: "Leis, teoria e disciplinas",
    icon: BookOpen,
  },
  {
    to: "/dashboard/edital",
    title: "Meu edital",
    tone: "gold",
    text: "Estude o que será cobrado",
    icon: FileText,
  },
  {
    to: "/dashboard/mock-exams",
    title: "Simulados",
    tone: "gold",
    text: "Prepare seu ritmo de prova",
    icon: Trophy,
  },
  {
    to: "/dashboard/ranking",
    title: "Ranking",
    tone: "gold",
    text: "Veja sua posição entre os alunos",
    icon: Medal,
  },
];
function DashboardIndex() {
  const { user, isLoading } = useAuthStatus();
  if (isLoading) return <DashboardSkeleton />;
  if (!user || user.id === "demo-user")
    return (
      <LockedState
        image="journey"
        title="Área do aluno"
        description="Entre na sua conta para acompanhar sua preparação e seus registros de estudo."
      />
    );
  return <StudentHome key={user.id} user={user} />;
}
function StudentHome({ user }: { user: UserProfile }) {
  const [now, setNow] = React.useState(platformDate);
  const [personalExamDate, setPersonalExamDate] = React.useState(user.personal_exam_date ?? "");
  const [examDateDraft, setExamDateDraft] = React.useState("");
  const [isEditingExamDate, setIsEditingExamDate] = React.useState(false);
  const [isSavingExamDate, setIsSavingExamDate] = React.useState(false);
  const [metric, setMetric] = React.useState<StudentMetric | null>(null);
  const metricTrigger = React.useRef<HTMLElement | null>(null);
  const [metricDate, setMetricDate] = React.useState<string | null>(null);
  const openMetric = (value: StudentMetric, trigger: HTMLElement, date: string | null = null) => {
    setMetricDate(date);
    metricTrigger.current = trigger;
    setMetric(value);
  };
  const [selectedId, setSelectedId] = React.useState(() => {
    try {
      return localStorage.getItem(`norte:dashboard-plan:${user.id}`) ?? "";
    } catch {
      return "";
    }
  });
  const q = useStudentDashboard(user.id, selectedId || undefined);
  // Posição no ranking geral no atalho (quando o servidor responde); sem ela, o texto padrão.
  const rank = useQuery({
    queryKey: ["home-rank-summary", user.id],
    staleTime: 60_000,
    retry: 0,
    queryFn: async () => {
      const response = (await supabase
        .rpc("my_rank_summary", { _period: "all", _metric: "points" })
        .maybeSingle()) as unknown as {
        data: { rank_position: number | null; total_points: number } | null;
        error: unknown;
      };
      if (response.error) throw response.error;
      return response.data;
    },
  });
  const rankText = rank.data?.rank_position
    ? `${rank.data.rank_position}º lugar · ${rank.data.total_points} pts`
    : null;
  const plan = q.plans.data?.find((p) => p.id === selectedId) ?? q.plans.data?.[0];
  React.useEffect(() => {
    setPersonalExamDate(user.personal_exam_date ?? "");
  }, [user.id, user.personal_exam_date]);
  React.useEffect(() => {
    if (q.plans.isSuccess && plan?.id !== selectedId) setSelectedId(plan?.id ?? "");
  }, [q.plans.isSuccess, plan?.id, selectedId]);
  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(platformDate()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const live = React.useSyncExternalStore(subscribeStudyClock, liveMinutes, () => 0);
  const today = acreDateKey(now);
  const day = new Date(`${today}T12:00:00Z`).getUTCDay();
  const stats = React.useMemo(
    () =>
      q.training.data
        ? summarizeTraining(
            q.training.data,
            q.reinforcement.isSuccess ? q.reinforcement.data : null,
            today,
          )
        : null,
    [q.training.data, q.reinforcement.data, q.reinforcement.isSuccess, today],
  );
  const time = React.useMemo(
    () => (q.activity.data ? summarizeStudyTime(q.activity.data, live, now) : null),
    [q.activity.data, live, now],
  );
  const schedule =
    plan && plan.id === selectedId && validDashboardConfig(plan.config) && q.progress.isSuccess
      ? dashboardSchedule(plan.config, q.progress.data, day)
      : null;
  const adaptiveAgenda = React.useMemo(() => {
    if (!schedule || !stats) return null;
    const subjectStats = new Map(stats.subjects.map((s) => [canonicalDiscipline(s.subject), s]));
    const ranked = schedule.blocks
      .map((block) => ({ block, stat: subjectStats.get(canonicalDiscipline(block.nome)) }))
      .sort((a, b) => (a.stat?.accuracy ?? 101) - (b.stat?.accuracy ?? 101));
    const focus = ranked.find((item) => item.stat && item.stat.total >= 3 && item.stat.accuracy < 70);
    if (focus?.stat) {
      return {
        tone: "focus" as const,
        title: `Prioridade de hoje: ${focus.block.nome}`,
        text: `${focus.stat.accuracy}% de acerto em ${focus.stat.total} questões. Comece por este bloco e revise os erros ao final.`,
      };
    }
    const first = ranked[0];
    return first
      ? { tone: "next" as const, title: `Próximo foco: ${first.block.nome}`, text: "Siga o bloco previsto e registre teoria e questões no painel do dia." }
      : null;
  }, [schedule, stats]);
  const objective = q.objective.data;
  const cronogramaLocked = hasActiveEdital(objective);
  const effectiveExamDate = personalExamDate || objective?.examDate || undefined;
  const isPcAcre = Boolean(
    objective &&
      /acre|pc[-\s]?ac/i.test(
        `${objective.agency} ${objective.role} ${objective.examBoard}`,
      ),
  );
  const days = daysToExam(effectiveExamDate, today);
  const examCountdown =
    days === null
      ? "Defina o dia para ativar a contagem regressiva."
      : days > 0
        ? "Faltam " + days + " " + (days === 1 ? "dia" : "dias") + " para a prova"
        : days === 0
          ? "Sua prova é hoje. Boa preparação!"
          : "A prova ocorreu há " + Math.abs(days) + " " + (Math.abs(days) === 1 ? "dia." : "dias.");
  const firstName = user.full_name?.trim().split(/\s+/)[0] || "Estudante";
  const hour = acreHour(now),
    hello = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const priority =
    schedule && plan
      ? {
          title: schedule.blocks.length
            ? "Seu cronograma está pronto para hoje."
            : "Consulte seu próximo dia de estudo.",
          reason: `${plan.name}: conteúdo e atividades no seu cronograma por edital.`,
          label: schedule.blocks.length ? "Abrir sessão do cronograma" : "Ver meu cronograma",
          to: "/dashboard/cronograma",
          search: { plano: plan.id, painel: "1" },
        }
      : q.reading.data
        ? {
            title: "Continue de onde você parou.",
            reason: `Sua última leitura disponível: ${q.reading.data.title} · ${q.reading.data.label}.`,
            label: "Continuar minha leitura",
            to: "/dashboard/legal-course/$slug",
            params: { slug: q.reading.data.slug },
            search: { art: q.reading.data.article },
          }
        : stats?.pending && stats.pending > 0
          ? {
              title: "Transforme os erros em aprendizado.",
              reason:
                "Há erros sem acerto posterior registrado. Abra o reforço para conferir as questões disponíveis e revisar o raciocínio.",
              label: "Revisar meus erros",
              to: "/dashboard/question-trainer",
              search: { mode: "reforco" },
            }
          : q.objective.isSuccess && !objective
            ? {
                title: "Comece pelas questões.",
                reason:
                  "Escolha uma disciplina, pratique e use a correção para orientar seu próximo estudo.",
                label: "Iniciar meu treino",
                to: "/dashboard/question-trainer",
              }
            : q.strategy.data && !plan
              ? {
                  title: "Sua estratégia de estudos está salva.",
                  reason:
                    "Abra o assistente para consultar a distribuição do estudo. Para executar por assunto, organize também seu cronograma por edital.",
                  label: "Abrir minha estratégia",
                  to: "/dashboard/study-coach",
                }
              : {
                  title: "Seu próximo avanço começa aqui.",
                  reason:
                    "Escolha um assunto, resolva com atenção e use a correção para definir o próximo estudo.",
                  label: "Resolver questões",
                  to: "/dashboard/question-trainer",
                };
  const choosePlan = (id: string) => {
    setSelectedId(id);
    try {
      localStorage.setItem(`norte:dashboard-plan:${user.id}`, id);
    } catch {
      /* Optional navigation preference. */
    }
  };
  const openExamDateEditor = () => {
    setExamDateDraft(personalExamDate || objective?.examDate || "");
    setIsEditingExamDate(true);
  };
  const savePersonalExamDate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!examDateDraft || daysToExam(examDateDraft, today) === null) {
      toast.error("Escolha uma data válida para a prova.");
      return;
    }
    setIsSavingExamDate(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ personal_exam_date: examDateDraft })
        .eq("id", user.id)
        .select("personal_exam_date")
        .single();
      if (error) throw error;
      setPersonalExamDate(data.personal_exam_date ?? examDateDraft);
      setIsEditingExamDate(false);
      window.dispatchEvent(new Event("norte:profile-updated"));
      toast.success("Data da prova salva com sucesso.");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar a data da prova.");
    } finally {
      setIsSavingExamDate(false);
    }
  };
  const clearPersonalExamDate = async () => {
    if (!personalExamDate) {
      setIsEditingExamDate(false);
      return;
    }
    setIsSavingExamDate(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ personal_exam_date: null })
        .eq("id", user.id);
      if (error) throw error;
      setPersonalExamDate("");
      setExamDateDraft(objective?.examDate ?? "");
      setIsEditingExamDate(false);
      window.dispatchEvent(new Event("norte:profile-updated"));
      toast.success(objective?.examDate ? "Data oficial do concurso restaurada." : "Data da prova removida.");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Não foi possível remover a data da prova.");
    } finally {
      setIsSavingExamDate(false);
    }
  };
  return (
    <div className="student-home student-hub student-desk student-overview">
      <header className="student-hub__masthead student-hub__masthead--careers student-hub__masthead--revamped workspace-banner">
        <div className="student-hub__hero-layout">
          <div className="student-hub__hero-copy">
            <p className="student-hub__welcome">
              {hello}, {firstName}.
            </p>
            <h1 id="student-home-title">Área do aluno</h1>
            <p className="student-hub__hero-subtitle">
              Seu estudo, suas prioridades e sua evolução — tudo em um só lugar.
            </p>
            <div className="student-hub__masthead-actions">
              <span className="student-hub__date">
                <CalendarClock aria-hidden="true" />
                {new Intl.DateTimeFormat("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  timeZone: ACRE_TZ,
                }).format(now)}
                <small>Acre</small>
              </span>
            </div>
          </div>

          <aside className="student-hub__exam-spotlight" aria-label="Data da prova">
            <div className="student-hub__exam-spotlight-heading">
              <span>Data da prova</span>
              <span className="student-hub__exam-status" data-defined={Boolean(effectiveExamDate)}>
                {personalExamDate ? "Personalizada" : effectiveExamDate ? "Data oficial" : "A definir"}
              </span>
            </div>
            <p className="student-hub__exam-date">
              {effectiveExamDate ? formatExamDate(effectiveExamDate) : "Escolha uma data"}
            </p>
            <p className="student-hub__exam-countdown">{examCountdown}</p>
            <section
              className="student-hub__active-contest"
              aria-label="Concurso ativo"
              data-has-objective={Boolean(objective)}
              data-pc-acre={isPcAcre ? "true" : "false"}
            >
              <div className="student-hub__active-contest-heading">
                <span className="student-hub__active-contest-icon" aria-hidden="true">
                  <Trophy />
                </span>
                <div className="student-hub__active-contest-copy">
                  <span className="student-hub__active-contest-label">Concurso ativo</span>
                  <strong>
                    {objective?.agency ?? "Nenhum concurso selecionado"}
                  </strong>
                  <span className="student-hub__active-contest-meta">
                    {objective
                      ? `${objective.role} · ${objective.examBoard}`
                      : "Escolha um concurso para começar sua preparação."}
                  </span>
                </div>
                {isPcAcre && (
                  <span className="student-hub__acre-flag" aria-label="Acre" role="img" />
                )}
              </div>
              {objective && (
                <p className="student-hub__active-contest-description">
                  Gerencie ou altere o concurso em preparação.
                </p>
              )}
              <Link to="/dashboard/my-contest" className="student-hub__contest-action">
                <span>{objective ? "Trocar concurso" : "Escolher concurso"}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </section>

            {!isEditingExamDate ? (
              <Button
                type="button"
                size="default"
                variant="default"
                onClick={openExamDateEditor}
                className="student-hub__exam-action"
              >
                <CalendarClock aria-hidden="true" />
                {personalExamDate
                  ? "Alterar data da prova"
                  : effectiveExamDate
                    ? "Ajustar data da prova"
                    : "Escolher data da prova"}
              </Button>
            ) : (
              <form onSubmit={savePersonalExamDate} className="student-hub__exam-form">
                <label htmlFor="student-personal-exam-date">Selecione o dia no calendário</label>
                <input
                  id="student-personal-exam-date"
                  type="date"
                  required
                  value={examDateDraft}
                  onChange={(event) => setExamDateDraft(event.target.value)}
                />
                <div className="student-hub__exam-form-actions">
                  <Button type="submit" size="sm" disabled={isSavingExamDate || !examDateDraft}>
                    {isSavingExamDate ? "Salvando..." : "Salvar data"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={isSavingExamDate}
                    onClick={() => setIsEditingExamDate(false)}
                  >
                    Cancelar
                  </Button>
                  {personalExamDate && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={isSavingExamDate}
                      onClick={() => void clearPersonalExamDate()}
                      className="student-hub__exam-clear"
                    >
                      {objective?.examDate ? "Usar data oficial" : "Remover data"}
                    </Button>
                  )}
                </div>
                <p>A contagem regressiva será atualizada automaticamente após salvar.</p>
              </form>
            )}
          </aside>
        </div>
      </header>
      {!schedule && (
        <section
          className="student-desk__next"
          data-accent="gold"
          aria-labelledby="dashboard-next-step"
        >
          <div className="student-hub__resume-copy">
            <span className="student-desk__eyebrow">
              <Sparkles aria-hidden="true" /> Seu próximo passo
            </span>
            <h2 id="dashboard-next-step">{priority.title}</h2>
            <p>{priority.reason}</p>
          </div>
          <Link
            className="student-home__primary"
            to={priority.to}
            {...("params" in priority ? { params: priority.params } : {})}
            {...("search" in priority ? { search: priority.search } : {})}
          >
            {priority.label}
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      )}
      <PcAcreEditalSpotlight />
      <PlatformQuestionCounts compact />
      <section className="student-desk__panel" aria-labelledby="student-metrics-title">
        <div className="student-desk__section-heading">
          <h2 id="student-metrics-title">Seu painel de estudo</h2>
          <span>Progresso atualizado e seus atalhos, em um só lugar</span>
        </div>
        <section className="student-home__metrics" aria-label="Seu progresso">
          <Metric
            icon={BrainCircuit}
            label="Questões resolvidas"
            tone="blue"
            onOpen={(event) => openMetric("questions", event.currentTarget)}
            value={q.training.isError ? "Indisponível" : stats ? number(stats.total) : "…"}
            detail={stats ? `${number(stats.today)} hoje` : "Dados do treinador"}
          />
          <Metric
            icon={CheckCircle2}
            label="Taxa de acerto"
            tone="teal"
            onOpen={(event) => openMetric("accuracy", event.currentTarget)}
            value={
              q.training.isError
                ? "Indisponível"
                : stats
                  ? stats.accuracy === null
                    ? "Sem respostas"
                    : `${stats.accuracy}%`
                  : "…"
            }
            detail={
              stats?.total
                ? `${number(stats.correct)} acertos · ${number(stats.wrong)} erros`
                : "Comece pelas questões"
            }
          />
          <Metric
            icon={Clock}
            label="Tempo ativo hoje"
            tone="amber"
            onOpen={(event) => openMetric("today", event.currentTarget)}
            value={q.activity.isError ? "Indisponível" : time ? duration(time.today) : "…"}
            detail="Somando suas sessões"
          />
          <Metric
            icon={TrendingUp}
            label="Estudo nesta semana"
            tone="violet"
            onOpen={(event) => openMetric("week", event.currentTarget)}
            value={q.activity.isError ? "Indisponível" : time ? duration(time.week) : "…"}
            detail={time ? `${duration(time.total)} no total` : "Últimos 7 dias"}
          />
        </section>
        <div className="student-desk__panel-divider" role="separator" aria-hidden="true" />
        <nav className="student-hub__shortcuts" aria-label="Caminhos de estudo">
          {destinations.map(({ to, title, text, tone, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              data-accent={tone}
              {...(to === "/dashboard/ranking"
                ? {
                    search: { section: "general", page: 1, size: 20, q: "" } as never,
                    "data-rank": "",
                  }
                : {})}
            >
              <span className="student-home__tool-icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{to === "/dashboard/ranking" && rankText ? rankText : text}</small>
              </div>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </section>
      <StudentMetricPanel
        metric={metric}
        userId={user.id}
        selectedDate={metricDate}
        userName={user.full_name?.trim() || "Estudante"}
        training={q.training.data}
        activity={q.activity.data}
        live={live}
        now={now}
        loading={
          metric === "questions" || metric === "accuracy"
            ? q.training.isPending
            : q.activity.isPending
        }
        error={
          metric === "questions" || metric === "accuracy" ? q.training.isError : q.activity.isError
        }
        onRetry={() => {
          void (metric === "questions" || metric === "accuracy"
            ? q.training.refetch()
            : q.activity.refetch());
        }}
        onClose={() => setMetric(null)}
        returnFocus={metricTrigger.current}
      />
      <div
        className="student-hub__workspace"
        role="region"
        aria-label="Seu estudo de hoje e prioridades"
      >
        <div className="student-hub__main">
          <section
            className="student-home__card student-home__schedule"
            data-accent="gold"
            aria-labelledby="dashboard-schedule-title"
          >
            <SectionTitle
              icon={CalendarClock}
              title="Agenda de estudos"
              id="dashboard-schedule-title"
              description="Atividades do dia, conectadas ao seu cronograma."
            />
            {q.plans.isPending ? (
              <PanelLoading />
            ) : q.plans.isError ? (
              <QueryError
                text="Não foi possível carregar seus cronogramas."
                retry={() => q.plans.refetch()}
              />
            ) : !plan ? (
              <EmptyPanel
                title={cronogramaLocked ? "Cronograma vinculado ao edital ativo" : "Seu dia de estudo começa com um plano"}
                text={cronogramaLocked
                  ? `O edital ${objective?.agency} · ${objective?.role} está ativo. Para manter disciplinas e assuntos organizados, a criação de novos cronogramas fica bloqueada enquanto ele estiver em foco.`
                  : "Distribua disciplinas e assuntos nos dias em que você pode estudar."}
              >
                {cronogramaLocked ? (
                  <div className="flex items-center gap-3 rounded-lg border border-amber-500/25 bg-amber-500/5 p-3 text-sm text-muted-foreground" role="status">
                    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="h-8 w-8 shrink-0 text-amber-400">
                      <path d="M14 21v-5a10 10 0 0 1 20 0v5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <rect x="10" y="20" width="28" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="24" cy="29" r="2" fill="currentColor" /><path d="M24 31v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span>Edite ou troque o edital ativo em <Link to="/dashboard/my-contest">Meu concurso</Link> para liberar um novo planejamento.</span>
                  </div>
                ) : (
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/cronograma">
                      Montar meu cronograma
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                )}
              </EmptyPanel>
            ) : (
              <>
                {(q.plans.data?.length ?? 0) > 1 ? (
                  <label className="student-home__select">
                    Cronograma exibido
                    <select value={plan.id} onChange={(e) => choosePlan(e.target.value)}>
                      {q.plans.data!.map((p) => (
                        <option value={p.id} key={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <p className="student-home__plan-name">{plan.name}</p>
                )}
                {!validDashboardConfig(plan.config) ? (
                  <EmptyPanel
                    title="Este plano precisa de ajustes"
                    text="Abra o cronograma para conferir disciplinas, dias e horários."
                  >
                    <Button variant="outline" asChild>
                      <Link to="/dashboard/cronograma" search={{ plano: plan.id }}>
                        Conferir cronograma
                      </Link>
                    </Button>
                  </EmptyPanel>
                ) : q.progress.isError ? (
                  <QueryError
                    text="Não conseguimos consultar o progresso deste cronograma."
                    retry={() => q.progress.refetch()}
                  />
                ) : !schedule ? (
                  <PanelLoading />
                ) : (
                  <>
                    <div className="student-home__agenda-status" role="status">
                      <span className={schedule.completed > 0 ? "is-active" : "is-new"} aria-hidden="true" />
                      <div>
                        <strong>{schedule.completed > 0 ? "Plano em andamento" : "Plano pronto para começar"}</strong>
                        <small>
                          {schedule.completed} de {schedule.total} conteúdos concluídos
                          {schedule.blocks.length ? ` · ${schedule.blocks.length} blocos previstos hoje` : " · sem blocos previstos hoje"}
                        </small>
                      </div>
                      <Link to="/dashboard/cronograma" search={{ plano: plan.id, painel: "1" }}>
                        Abrir painel <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                    {days !== null && days <= 14 && (
                      <div className="student-home__agenda-alert" role="alert">
                        <Clock aria-hidden="true" />
                        <span>{days < 0 ? "A data da prova já passou. Atualize seu objetivo." : days === 0 ? "A prova é hoje. Faça uma revisão leve e preserve seu ritmo." : `Faltam ${days} ${days === 1 ? "dia" : "dias"} para a prova. Priorize os blocos sinalizados.`}</span>
                      </div>
                    )}
                    <div className="student-home__coverage">
                      <span>Progresso do conteúdo</span>
                      <strong>
                        {schedule.completed} de {schedule.total}
                      </strong>
                      <progress
                        value={schedule.completed}
                        max={Math.max(1, schedule.total)}
                        aria-label="Conteúdos com teoria e questões concluídos"
                      />
                    </div>
                    <div className="student-home__day-heading">
                      <h3>
                        {new Intl.DateTimeFormat("pt-BR", {
                          weekday: "long",
                          timeZone: ACRE_TZ,
                        }).format(now)}
                      </h3>
                      <span>Horários previstos · Acre</span>
                    </div>
                    {adaptiveAgenda && (
                      <div className={`student-home__adaptive-agenda student-home__adaptive-agenda--${adaptiveAgenda.tone}`}>
                        <Target aria-hidden="true" />
                        <div>
                          <strong>{adaptiveAgenda.title}</strong>
                          <small>{adaptiveAgenda.text}</small>
                        </div>
                      </div>
                    )}
                    {schedule.blocks.length ? (
                      <ol className="student-home__blocks">
                        {schedule.blocks.slice(0, 4).map((block, i) => (
                          <li key={`${block.discId}:${i}`}>
                            <span>
                              {block.start}
                              <small>{block.end}</small>
                            </span>
                            <div>
                              <strong>{block.nome}</strong>
                              <small>{block.topic ? `${block.topic} · ` : ""}{block.minutes} min previstos</small>
                            </div>
                            <Clock aria-hidden="true" />
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <div className="student-home__quiet student-home__schedule-empty">
                        <strong>Hoje não há bloco previsto.</strong>
                        <span>
                          Seu próximo dia de estudo é {schedule.nextStudyDay === null ? "definido no cronograma" : ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][schedule.nextStudyDay]}.
                        </span>
                      </div>
                    )}
                    {schedule.blocks.length > 4 && (
                      <p className="student-home__quiet">
                        Mais {schedule.blocks.length - 4} blocos no cronograma.
                      </p>
                    )}
                    {schedule.next && (
                      <div className="student-home__next-topic">
                        <span>Próximo assunto</span>
                        <strong>{schedule.next.t.t}</strong>
                        <small>{schedule.next.d.nome}</small>
                      </div>
                    )}
                    <Button
                      asChild
                      variant="outline"
                      className="student-home__primary student-home__wide-action"
                    >
                      <Link to="/dashboard/cronograma" search={{ plano: plan.id, painel: "1" }}>
                        {schedule.blocks.length
                          ? "Abrir atividades do dia"
                          : "Abrir cronograma completo"}
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </section>

          <div className="student-hub__planning-link">
            <Sparkles aria-hidden="true" />
            <p>
              Precisa ajustar sua rotina?
              {cronogramaLocked ? (
                <span className="student-hub__planning-link--locked" role="status">
                  Planejamento bloqueado pelo edital ativo
                </span>
              ) : (
                <Link to="/dashboard/study-coach">
                  {q.strategy.data ? "Rever minha estratégia" : "Organizar com o assistente"}
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </p>
          </div>
          <section
            className="student-home__card"
            data-accent="gold"
            aria-labelledby="dashboard-rhythm-title"
          >
            <SectionTitle
              icon={TrendingUp}
              title="Seu ritmo na semana"
              id="dashboard-rhythm-title"
              onOpen={(event) => openMetric("week", event.currentTarget)}
              description="Seu tempo ativo nos últimos 7 dias."
            />
            {q.activity.isError ? (
              <QueryError
                text="Não foi possível consultar o tempo de estudo."
                retry={() => q.activity.refetch()}
              />
            ) : !time ? (
              <PanelLoading />
            ) : (
              <>
                <WeeklyRhythmChart
                  days={time.days}
                  formatDuration={duration}
                  onSelectDay={(date, trigger) => openMetric("today", trigger, date)}
                  onOpenHistory={(trigger) => openMetric("week", trigger)}
                />
              </>
            )}
          </section>
        </div>
        <aside className="student-hub__rail" aria-label="Seu objetivo e suas prioridades">
          <ResumeSessions userId={user.id} compact className="student-desk__sessions" />
          <section
            className="student-home__card"
            data-accent="gold"
            aria-labelledby="dashboard-objective-title"
          >
            <SectionTitle icon={Target} title="Concurso em foco" id="dashboard-objective-title" />
            {q.objective.isPending ? (
              <PanelLoading />
            ) : q.objective.isError ? (
              <QueryError
                text="Não foi possível consultar seu concurso."
                retry={() => q.objective.refetch()}
              />
            ) : objective ? (
              <>
                <h3 className="student-home__objective-name">{objective.agency}</h3>
                <p className="student-home__quiet">{objective.role}</p>
                <p className="student-home__quiet">{objective.examBoard}</p>
                <Link to="/dashboard/my-contest" className="student-home__text-link">
                  Consultar meu concurso
                  <ArrowRight aria-hidden="true" />
                </Link>
              </>
            ) : (
              <EmptyPanel
                title="Qual é o seu concurso?"
                text="Defina seu objetivo para orientar sua preparação."
              >
                <Link to="/dashboard/questions" className="student-home__text-link">
                  Consultar concursos e editais
                  <ArrowRight aria-hidden="true" />
                </Link>
              </EmptyPanel>
            )}

          </section>

          <section
            className="student-home__card"
            data-accent="gold"
            aria-labelledby="dashboard-reading-title"
          >
            <SectionTitle
              icon={BookOpen}
              title="Continue sua leitura"
              id="dashboard-reading-title"
            />
            {q.reading.isPending ? (
              <PanelLoading />
            ) : q.reading.isError ? (
              <QueryError
                text="Não conseguimos recuperar sua última leitura."
                retry={() => q.reading.refetch()}
              />
            ) : q.reading.data ? (
              <>
                <h3 className="student-home__objective-name">{q.reading.data.title}</h3>
                <p className="student-home__quiet">
                  Última leitura disponível · {q.reading.data.label}
                </p>
                <Link
                  to="/dashboard/legal-course/$slug"
                  params={{ slug: q.reading.data.slug }}
                  search={{ art: q.reading.data.article }}
                  className="student-home__text-link"
                >
                  Continuar leitura
                  <ArrowRight aria-hidden="true" />
                </Link>
              </>
            ) : (
              <EmptyPanel
                title="Encontre seu próximo conteúdo"
                text="Leis e disciplinas organizadas para estudar por assunto."
              >
                <Link to="/dashboard/library" className="student-home__text-link">
                  Explorar conteúdo
                  <ArrowRight aria-hidden="true" />
                </Link>
              </EmptyPanel>
            )}
          </section>

          <section
            className="student-home__card"
            data-accent="rose"
            aria-labelledby="dashboard-review-title"
          >
            <SectionTitle
              icon={BrainCircuit}
              title="Prioridades de revisão"
              id="dashboard-review-title"
              description="Disciplinas que pedem mais atenção."
            />
            {q.training.isError ? (
              <QueryError
                text="Não conseguimos consultar suas respostas."
                retry={() => q.training.refetch()}
              />
            ) : !stats ? (
              <PanelLoading />
            ) : !stats.total ? (
              <EmptyPanel
                title="Descubra seus pontos de atenção"
                text="Responda questões para receber sugestões de revisão."
              >
                <Link to="/dashboard/question-trainer" className="student-home__text-link">
                  Resolver minhas primeiras questões
                  <ArrowRight aria-hidden="true" />
                </Link>
              </EmptyPanel>
            ) : (
              <>
                {stats.signals.length ? (
                  <ul className="student-home__signals">
                    {stats.signals.map((s) => (
                      <li key={s.subject}>
                        <div>
                          <strong>{s.subject}</strong>
                          <small>
                            {s.correct} {s.correct === 1 ? "acerto" : "acertos"} em {s.total}{" "}
                            questões
                          </small>
                        </div>
                        <Link
                          to="/dashboard/question-trainer"
                          search={{ mode: "reforco", subject: s.subject }}
                          aria-label={`Revisar erros de ${s.subject}`}
                        >
                          Revisar
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="student-home__quiet">
                    Nenhum sinal de reforço por enquanto. As sugestões aparecem a partir de 5
                    respostas por disciplina, com acerto abaixo de 60%.
                  </p>
                )}
                {q.reinforcement.isError ? (
                  <QueryError
                    text="Seu desempenho está disponível, mas não conseguimos conferir as tentativas de reforço."
                    retry={() => q.reinforcement.refetch()}
                  />
                ) : (
                  stats.pending !== null && (
                    <p className="student-home__review-count">
                      <strong>{stats.pending}</strong> erros sem acerto posterior registrado no
                      reforço.
                    </p>
                  )
                )}
                {q.reinforcement.isSuccess && q.reinforcement.data === null && (
                  <p className="student-home__footnote">
                    Recuperações no reforço ainda não estão disponíveis neste resumo.
                  </p>
                )}
                <Link
                  to="/dashboard/question-trainer"
                  search={{ mode: "reforco" }}
                  className="student-home__text-link"
                >
                  Abrir revisão de erros
                  <ArrowRight aria-hidden="true" />
                </Link>
                <p className="student-home__footnote">
                  A revisão usa as questões atualmente disponíveis no acervo.
                </p>
              </>
            )}
          </section>
          <nav className="student-hub__results" aria-label="Resultados e provas">
            <Link to="/dashboard/performance">
              <TrendingUp aria-hidden="true" />
              <span>Desempenho na plataforma</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/dashboard/student-exams" search={{ career: undefined }}>
              <FileText aria-hidden="true" />
              <span>Minhas provas e diagnóstico</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </nav>
        </aside>
      </div>
      <PcprExamSpotlight compact />
      <details className="student-home__data-note">
        <summary>Como este painel calcula seus indicadores</summary>
        <p>
          Respostas e aproveitamento vêm das primeiras respostas salvas no treinador. Reforços não
          pontuam novamente. Tempo ativo vem das sessões da plataforma; hoje usa o maior valor entre
          o registro sincronizado e o relógio ao vivo, sem duplicar minutos. Dias seguem o horário
          do Acre. A cobertura do cronograma exige teoria e questões registradas no assunto; não
          representa aprovação nem domínio da disciplina. As informações são atualizadas ao retornar
          à aba e periodicamente enquanto o painel está aberto.
        </p>
        <Link to="/dashboard/performance">Consultar desempenho detalhado</Link>
      </details>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
  onOpen,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  onOpen: React.MouseEventHandler<HTMLButtonElement>;
  tone?: "blue" | "teal" | "amber" | "violet";
}) {
  return (
    <button
      type="button"
      className="student-home__metric"
      data-tone={tone}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${label}: ${value}. Ver detalhes`}
    >
      <span>
        <Icon aria-hidden="true" />
      </span>
      <div>
        <h2>{label}</h2>
        <strong data-placeholder={/^(Indisponível|Sem respostas)$/.test(value) || undefined}>
          {value}
        </strong>
        <p>{detail}</p>
      </div>
      <ArrowRight className="student-home__metric-arrow" aria-hidden="true" />
    </button>
  );
}
function SectionTitle({
  icon: Icon,
  title,
  id,
  description,
  onOpen,
}: {
  icon: LucideIcon;
  title: string;
  id: string;
  description?: string;
  onOpen?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <header className="student-home__section-title">
      <span>
        <Icon aria-hidden="true" />
      </span>
      <div>
        <h2 id={id}>
          {onOpen ? (
            <button
              type="button"
              className="student-home__section-button"
              aria-haspopup="dialog"
              onClick={onOpen}
            >
              {title}
              <ArrowRight aria-hidden="true" />
            </button>
          ) : (
            title
          )}
        </h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}
function EmptyPanel({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="student-home__empty">
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
function PanelLoading() {
  return (
    <div className="student-home__loading" role="status">
      <Loader2 aria-hidden="true" className="animate-spin" />
      Carregando seus registros…
    </div>
  );
}
function QueryError({ text, retry }: { text: string; retry: () => unknown }) {
  return (
    <div className="student-home__error" role="status">
      <p>{text}</p>
      <button type="button" onClick={() => void retry()}>
        <RefreshCw aria-hidden="true" />
        Tentar novamente
      </button>
    </div>
  );
}
function DashboardSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Carregando painel">
      <Skeleton className="h-40 rounded-2xl" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  );
}
