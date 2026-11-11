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
import "@/styles/student-home-compact.css";
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
    title: "Agenda de estudos",
    text: "Organize seu dia de estudo",
    tone: "gold",
    icon: CalendarClock,
  },
  {
    to: "/dashboard/question-trainer",
    title: "Treinar questões",
    tone: "teal",
    text: "Pratique e revise seus erros",
    icon: BrainCircuit,
  },
  {
    to: "/dashboard/library",
    title: "Material de estudo",
    tone: "gold",
    text: "Leis, teoria e disciplinas",
    icon: BookOpen,
  },
  {
    to: "/dashboard/edital",
    title: "Edital e disciplinas",
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
  const examDate = objective?.examDate || undefined;
  const isPcAcre = Boolean(
    objective &&
      /acre|pc[-\s]?ac/i.test(
        `${objective.agency} ${objective.role} ${objective.examBoard}`,
      ),
  );
  const days = daysToExam(examDate, today);
  const examCountdown =
    days === null
      ? null
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
  return (
    <div className="student-home student-hub student-desk student-overview sh2">
      <header className="sh2-hero workspace-banner">
        <div className="sh2-hero__hello">
          <p>
            {hello}, {firstName}.
          </p>
          <h1 id="student-home-title">Área do aluno</h1>
          <span className="sh2-hero__date">
            <CalendarClock aria-hidden="true" />
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "long",
              timeZone: ACRE_TZ,
            }).format(now)}{" "}
            · Acre
          </span>
        </div>
        <section className="sh2-hero__contest" aria-label="Concurso e prova">
          {isPcAcre ? (
            <span className="student-hub__acre-flag" aria-label="Bandeira do Acre" role="img" />
          ) : (
            <Trophy className="sh2-hero__icon" aria-hidden="true" />
          )}
          <div className="sh2-hero__contest-copy">
            <small>Concurso ativo</small>
            <h2>
              {objective?.agency ??
                (q.objective.isPending
                  ? "Carregando…"
                  : q.objective.isError
                    ? "Concurso indisponível"
                    : "Nenhum concurso selecionado")}
            </h2>
            {objective && (
              <p>{[objective.role, objective.examBoard].filter(Boolean).join(" · ")}</p>
            )}
          </div>
          {objective && (
            <div className="sh2-hero__exam">
              <small>Data da prova</small>
              {examDate && days !== null ? (
                <time dateTime={examDate}>{formatExamDate(examDate)}</time>
              ) : (
                <strong>A definir</strong>
              )}
              {examCountdown && <p>{examCountdown}</p>}
            </div>
          )}
          {q.objective.isError ? (
            <button
              type="button"
              className="sh2-link"
              onClick={() => void q.objective.refetch()}
              disabled={q.objective.isFetching}
            >
              Tentar novamente
            </button>
          ) : (
            <Link to="/dashboard/my-contest" className="sh2-link">
              {objective ? "Trocar concurso" : "Meu concurso"} <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </section>
      </header>

      <section className="sh2-kpis" aria-label="Seu progresso">
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
          tone="green"
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

      <div className="sh2-board" role="region" aria-label="Seu estudo de hoje e prioridades">
        <section className="sh2-card" data-tone="gold" aria-labelledby="dashboard-schedule-title">
          <SectionTitle
            icon={CalendarClock}
            title="Agenda de estudos"
            id="dashboard-schedule-title"
            aside={
              plan && (q.plans.data?.length ?? 0) > 1 ? (
                <select
                  className="sh2-select"
                  aria-label="Cronograma exibido"
                  value={plan.id}
                  onChange={(e) => choosePlan(e.target.value)}
                >
                  {q.plans.data!.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              ) : plan ? (
                <span className="sh2-tag">{plan.name}</span>
              ) : null
            }
          />
          <div className="sh2-card__body">
            {q.plans.isPending ? (
              <PanelLoading />
            ) : q.plans.isError ? (
              <QueryError
                text="Não foi possível carregar seus cronogramas."
                retry={() => q.plans.refetch()}
              />
            ) : !plan ? (
              <>
                <div className="sh2-next">
                  <Sparkles aria-hidden="true" />
                  <div>
                    <strong>{priority.title}</strong>
                    <small>{priority.reason}</small>
                  </div>
                </div>
                {cronogramaLocked ? (
                  <p className="sh2-note" role="status">
                    Edital {objective?.agency} ativo: novos cronogramas ficam bloqueados. Troque o
                    edital em <Link to="/dashboard/my-contest">Meu concurso</Link> para liberar.
                  </p>
                ) : (
                  <Link to="/dashboard/cronograma" className="sh2-link">
                    Montar meu cronograma <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </>
            ) : !validDashboardConfig(plan.config) ? (
              <EmptyPanel
                title="Este plano precisa de ajustes"
                text="Abra o cronograma para conferir disciplinas, dias e horários."
              >
                <Link to="/dashboard/cronograma" search={{ plano: plan.id }} className="sh2-link">
                  Conferir cronograma <ArrowRight aria-hidden="true" />
                </Link>
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
                <div className="sh2-progress">
                  <span>
                    {new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: ACRE_TZ }).format(
                      now,
                    )}
                  </span>
                  <strong>
                    {schedule.completed} de {schedule.total} conteúdos
                  </strong>
                  <progress
                    value={schedule.completed}
                    max={Math.max(1, schedule.total)}
                    aria-label="Conteúdos com teoria e questões concluídos"
                  />
                </div>
                {days !== null && days <= 14 && (
                  <p className="sh2-note sh2-note--alert" role="alert">
                    <Clock aria-hidden="true" />
                    {days < 0
                      ? "A data da prova já passou. Atualize seu objetivo."
                      : days === 0
                        ? "A prova é hoje. Faça uma revisão leve e preserve seu ritmo."
                        : `Faltam ${days} ${days === 1 ? "dia" : "dias"} para a prova. Priorize os blocos sinalizados.`}
                  </p>
                )}
                {adaptiveAgenda && (
                  <div className="sh2-next" data-kind={adaptiveAgenda.tone}>
                    <Target aria-hidden="true" />
                    <div>
                      <strong>{adaptiveAgenda.title}</strong>
                      <small>{adaptiveAgenda.text}</small>
                    </div>
                  </div>
                )}
                {schedule.blocks.length ? (
                  <ol className="sh2-blocks">
                    {schedule.blocks.slice(0, 4).map((block, i) => (
                      <li key={`${block.discId}:${i}`}>
                        <time>
                          {block.start}
                          <small>{block.end}</small>
                        </time>
                        <div>
                          <strong>{block.nome}</strong>
                          <small>
                            {block.topic ? `${block.topic} · ` : ""}
                            {block.minutes} min
                          </small>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="sh2-note">
                    Hoje não há bloco previsto. Próximo dia de estudo:{" "}
                    {schedule.nextStudyDay === null
                      ? "definido no cronograma"
                      : [
                          "domingo",
                          "segunda-feira",
                          "terça-feira",
                          "quarta-feira",
                          "quinta-feira",
                          "sexta-feira",
                          "sábado",
                        ][schedule.nextStudyDay]}
                    .
                  </p>
                )}
                {schedule.blocks.length > 4 && (
                  <p className="sh2-note">Mais {schedule.blocks.length - 4} blocos no cronograma.</p>
                )}
                {schedule.next && (
                  <p className="sh2-note">
                    Próximo assunto: <strong>{schedule.next.t.t}</strong> · {schedule.next.d.nome}
                  </p>
                )}
              </>
            )}
          </div>
          <footer className="sh2-card__foot">
            {plan ? (
              <Link
                to="/dashboard/cronograma"
                search={{ plano: plan.id, painel: "1" }}
                className="sh2-cta"
              >
                {schedule?.blocks.length ? "Abrir atividades do dia" : "Abrir cronograma"}
                <ArrowRight aria-hidden="true" />
              </Link>
            ) : (
              <Link
                className="sh2-cta"
                to={priority.to}
                {...("params" in priority ? { params: priority.params } : {})}
                {...("search" in priority ? { search: priority.search } : {})}
              >
                {priority.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            )}
            {!cronogramaLocked && (
              <Link to="/dashboard/study-coach" className="sh2-link">
                {q.strategy.data ? "Rever estratégia" : "Ajustar rotina"}
              </Link>
            )}
          </footer>
        </section>

        <section className="sh2-card" data-tone="blue" aria-labelledby="dashboard-rhythm-title">
          <SectionTitle
            icon={TrendingUp}
            title="Seu ritmo na semana"
            id="dashboard-rhythm-title"
            onOpen={(event) => openMetric("week", event.currentTarget)}
          />
          <div className="sh2-card__body">
            {q.activity.isError ? (
              <QueryError
                text="Não foi possível consultar o tempo de estudo."
                retry={() => q.activity.refetch()}
              />
            ) : !time ? (
              <PanelLoading />
            ) : (
              <WeeklyRhythmChart
                days={time.days}
                formatDuration={duration}
                onSelectDay={(date, trigger) => openMetric("today", trigger, date)}
                onOpenHistory={(trigger) => openMetric("week", trigger)}
              />
            )}
          </div>
        </section>

        <div className="sh2-stack">
          <section className="sh2-card" data-tone="rose" aria-labelledby="dashboard-review-title">
            <SectionTitle
              icon={BrainCircuit}
              title="Prioridades de revisão"
              id="dashboard-review-title"
              aside={
                stats && stats.pending !== null && !q.reinforcement.isError ? (
                  <span className="sh2-tag">{stats.pending} erros pendentes</span>
                ) : null
              }
            />
            <div className="sh2-card__body">
              {q.training.isError ? (
                <QueryError
                  text="Não conseguimos consultar suas respostas."
                  retry={() => q.training.refetch()}
                />
              ) : !stats ? (
                <PanelLoading />
              ) : !stats.total ? (
                <p className="sh2-note">Responda questões para receber sugestões de revisão.</p>
              ) : stats.signals.length ? (
                <ul className="sh2-signals">
                  {stats.signals.map((s) => (
                    <li key={s.subject}>
                      <div>
                        <strong title={s.subject}>{s.subject}</strong>
                        <small>
                          {s.correct} {s.correct === 1 ? "acerto" : "acertos"} em {s.total}
                        </small>
                      </div>
                      <Link
                        to="/dashboard/question-trainer"
                        search={{ mode: "reforco", subject: s.subject }}
                        aria-label={`Revisar erros de ${s.subject}`}
                      >
                        Revisar
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="sh2-note">
                  Nenhum sinal de reforço por enquanto. As sugestões aparecem a partir de 5
                  respostas por disciplina, com acerto abaixo de 60%.
                </p>
              )}
              {q.reinforcement.isError && (
                <QueryError
                  text="Não conseguimos conferir as tentativas de reforço."
                  retry={() => q.reinforcement.refetch()}
                />
              )}
            </div>
            <footer className="sh2-card__foot">
              <Link
                to="/dashboard/question-trainer"
                {...(stats?.total ? { search: { mode: "reforco" } } : {})}
                className="sh2-link"
              >
                {stats?.total ? "Abrir revisão de erros" : "Resolver primeiras questões"}
                <ArrowRight aria-hidden="true" />
              </Link>
            </footer>
          </section>

          <section className="sh2-card" data-tone="violet" aria-labelledby="dashboard-reading-title">
            <SectionTitle icon={BookOpen} title="Continue sua leitura" id="dashboard-reading-title" />
            <div className="sh2-card__body">
              {q.reading.isPending ? (
                <PanelLoading />
              ) : q.reading.isError ? (
                <QueryError
                  text="Não conseguimos recuperar sua última leitura."
                  retry={() => q.reading.refetch()}
                />
              ) : q.reading.data ? (
                <Link
                  to="/dashboard/legal-course/$slug"
                  params={{ slug: q.reading.data.slug }}
                  search={{ art: q.reading.data.article }}
                  className="sh2-row-link"
                >
                  <div>
                    <strong>{q.reading.data.title}</strong>
                    <small>{q.reading.data.label}</small>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <Link to="/dashboard/library" className="sh2-row-link">
                  <div>
                    <strong>Encontre seu próximo conteúdo</strong>
                    <small>Leis e disciplinas por assunto</small>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </section>
          <ResumeSessions userId={user.id} compact className="student-desk__sessions" />
        </div>
      </div>

      <nav className="sh2-shortcuts" aria-label="Atalhos de estudo">
        {destinations.map(({ to, title, text, icon: Icon }, i) => (
          <Link
            key={to}
            to={to}
            data-tone={tones[i % tones.length]}
            title={text}
            {...(to === "/dashboard/ranking"
              ? {
                  search: { section: "general", period: "all", page: 1, size: 20, q: "" } as never,
                }
              : {})}
          >
            <Icon aria-hidden="true" />
            <span>
              <strong>{title}</strong>
              {to === "/dashboard/ranking" && rankText && <small>{rankText}</small>}
            </span>
          </Link>
        ))}
        <Link to="/dashboard/performance" data-tone="blue">
          <TrendingUp aria-hidden="true" />
          <span>
            <strong>Desempenho</strong>
          </span>
        </Link>
        <Link to="/dashboard/student-exams" search={{ career: undefined }} data-tone="rose">
          <FileText aria-hidden="true" />
          <span>
            <strong>Minhas provas</strong>
          </span>
        </Link>
      </nav>

      <section className="sh2-resources" aria-labelledby="dashboard-resources-title">
        <h2 id="dashboard-resources-title">Editais e acervo</h2>
        <PcAcreEditalSpotlight />
        <PcprExamSpotlight compact />
        <PlatformQuestionCounts compact />
      </section>
      <details className="student-home__data-note">
        <summary>Como este painel calcula seus indicadores</summary>
        <p>
          Respostas e aproveitamento vêm das primeiras respostas salvas no treinador. Reforços não
          pontuam novamente. Tempo ativo vem das sessões da plataforma; hoje usa o maior valor entre
          o registro sincronizado e o relógio ao vivo, sem duplicar minutos. Dias seguem o horário
          do Acre. A cobertura do cronograma exige teoria e questões registradas no assunto; não
          representa aprovação nem domínio da disciplina. Erros pendentes são erros sem acerto
          posterior registrado no reforço, considerando as questões disponíveis no acervo.
        </p>
        <Link to="/dashboard/performance">Consultar desempenho detalhado</Link>
      </details>
    </div>
  );
}

const tones = ["gold", "blue", "green", "violet", "amber", "rose"] as const;

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
  tone: "blue" | "green" | "amber" | "violet";
}) {
  return (
    <button
      type="button"
      className="sh2-kpi"
      data-tone={tone}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${label}: ${value}. Ver detalhes`}
    >
      <Icon aria-hidden="true" />
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
        <em>{detail}</em>
      </span>
    </button>
  );
}
function SectionTitle({
  icon: Icon,
  title,
  id,
  aside,
  onOpen,
}: {
  icon: LucideIcon;
  title: string;
  id: string;
  aside?: React.ReactNode;
  onOpen?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <header className="sh2-card__head">
      <Icon aria-hidden="true" />
      <h2 id={id}>
        {onOpen ? (
          <button type="button" aria-haspopup="dialog" onClick={onOpen}>
            {title}
            <ArrowRight aria-hidden="true" />
          </button>
        ) : (
          title
        )}
      </h2>
      {aside}
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
