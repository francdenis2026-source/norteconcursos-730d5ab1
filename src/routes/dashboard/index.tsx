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
import { acreDateKey, acreHour, ACRE_TZ } from "@/lib/acreTime";
import { platformDate } from "@/lib/platformClock";
import { getStudyToday, subscribeStudyClock, fmtHuman } from "@/lib/studyClock";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LockedState } from "@/components/dashboard/PageHero";
import { PcprExamSpotlight } from "@/components/dashboard/PcprExamSpotlight";
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
const destinations = [
  {
    to: "/dashboard/question-trainer",
    title: "Questões",
    text: "Pratique e revise seus erros",
    icon: BrainCircuit,
  },
  {
    to: "/dashboard/library",
    title: "Conteúdo",
    text: "Leis, teoria e disciplinas",
    icon: BookOpen,
  },
  {
    to: "/dashboard/edital",
    title: "Meu edital",
    text: "Estude o que será cobrado",
    icon: FileText,
  },
  {
    to: "/dashboard/mock-exams",
    title: "Simulados",
    text: "Prepare seu ritmo de prova",
    icon: Trophy,
  },
  {
    to: "/dashboard/ranking",
    title: "Ranking",
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
  const objective = q.objective.data;
  const days = daysToExam(objective?.examDate, today);
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
                title: "Dê direção à sua preparação.",
                reason:
                  "Escolha seu concurso para acompanhar o objetivo. Você também pode começar pelas questões ou pelo conteúdo abaixo.",
                label: "Consultar concursos e editais",
                to: "/dashboard/questions",
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
    <div className="student-home student-hub">
      <header className="student-hub__masthead student-hub__masthead--careers">
        <div className="student-hub__hero-copy">
          <p className="student-hub__welcome">
            {hello}, {firstName}.
          </p>
          <h1 id="student-home-title">Área do aluno</h1>
          <p>Seu estudo, suas prioridades e sua evolução.</p>
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
            <Link to="/dashboard/performance">
              Meu desempenho <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <picture className="student-hub__hero-visual" aria-hidden="true">
          <img
            src="/media/hero/auth-carreiras-composicao.webp"
            alt=""
            width={1440}
            height={600}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </header>
      <PcprExamSpotlight />
      <ResumeSessions userId={user.id} className="mb-4 space-y-3" />
      <section className="student-home__metrics" aria-label="Seu resumo de estudos">
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
      <nav className="student-hub__shortcuts" aria-label="Caminhos de estudo">
        {destinations.map(({ to, title, text, icon: Icon }, i) => (
          <Link
            key={to}
            to={to}
            data-tone={i}
            {...(to === "/dashboard/ranking"
              ? { search: { section: "general", page: 1, size: 20, q: "" } as never, "data-rank": "" }
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
      <div className="student-hub__workspace">
        <div className="student-hub__main">
          {!schedule && (
            <section className="student-hub__resume" aria-labelledby="dashboard-next-step">
              <img
                className="student-home__art"
                src="/media/hero/painel-aluno-direcao-estudos.webp"
                alt=""
                aria-hidden="true"
                width={2172}
                height={724}
                decoding="async"
              />
              <div className="student-hub__resume-copy">
                <span className="student-hub__kicker">
                  <span /> SEU PRÓXIMO PASSO
                </span>
                <h2 id="dashboard-next-step">{priority.title}</h2>
                <p>{priority.reason}</p>
                <Link
                  className="student-home__primary"
                  to={priority.to}
                  {...("params" in priority ? { params: priority.params } : {})}
                  {...("search" in priority ? { search: priority.search } : {})}
                >
                  {priority.label}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </section>
          )}
          <section
            className="student-home__card student-home__schedule"
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
                title="Seu dia de estudo começa com um plano"
                text="Distribua disciplinas e assuntos nos dias em que você pode estudar."
              >
                <Button variant="outline" asChild>
                  <Link to="/dashboard/cronograma">
                    Montar meu cronograma
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
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
                              <small>{block.minutes} min previstos</small>
                            </div>
                            <Clock aria-hidden="true" />
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="student-home__quiet">
                        Este cronograma não prevê blocos para hoje. Consulte os próximos dias ou use
                        um dos caminhos de estudo abaixo.
                      </p>
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
              <Link to="/dashboard/study-coach">
                {q.strategy.data ? "Rever minha estratégia" : "Organizar com o assistente"}
                <ArrowRight aria-hidden="true" />
              </Link>
            </p>
          </div>
          <section className="student-home__card" aria-labelledby="dashboard-rhythm-title">
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
                <div className="student-home__week" role="list" aria-label="Tempo ativo por dia">
                  {time.days.map((d) => (
                    <div role="listitem" key={d.date} data-today={d.date === today}>
                      <button
                        type="button"
                        className="student-home__week-day"
                        aria-haspopup="dialog"
                        aria-label={`${d.date.split("-").reverse().join("/")}: ${duration(d.seconds)}. Ver detalhes do dia`}
                        onClick={(event) => openMetric("today", event.currentTarget, d.date)}
                      >
                        <span>
                          {d.date.slice(8)}/{d.date.slice(5, 7)}
                        </span>
                        <div className="student-home__bar-track">
                          <i
                            style={{
                              height: d.seconds
                                ? `${Math.max(6, (d.seconds / Math.max(1, ...time.days.map((d) => d.seconds))) * 100)}%`
                                : "0%",
                            }}
                          />
                        </div>
                        <strong>
                          {d.seconds
                            ? d.seconds < 60
                              ? "<1 min"
                              : d.seconds < 3600
                                ? `${Math.floor(d.seconds / 60)} min`
                                : `${Math.round(d.seconds / 360) / 10} h`
                            : "—"}
                        </strong>
                      </button>
                    </div>
                  ))}
                </div>
                {!time.week && (
                  <p className="student-home__quiet">
                    Nenhum tempo ativo registrado nesta semana. Seus próximos períodos de uso
                    aparecerão aqui.
                  </p>
                )}
                <button
                  type="button"
                  className="student-home__text-link"
                  aria-haspopup="dialog"
                  onClick={(event) => openMetric("week", event.currentTarget)}
                >
                  Ver histórico de tempo
                  <ArrowRight aria-hidden="true" />
                </button>
              </>
            )}
          </section>
        </div>
        <aside className="student-hub__rail" aria-label="Seu objetivo e suas prioridades">
          <section className="student-home__card" aria-labelledby="dashboard-objective-title">
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
                {objective.examDate && (
                  <p className="student-home__exam-date">
                    {days !== null
                      ? days > 0
                        ? `${days} dias para a data registrada`
                        : days === 0
                          ? "Data da prova registrada para hoje"
                          : "A data registrada da prova já passou"
                      : "Confira a data da prova no concurso"}
                  </p>
                )}
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

          <section className="student-home__card" aria-labelledby="dashboard-reading-title">
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

          <section className="student-home__card" aria-labelledby="dashboard-review-title">
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
        <strong>{value}</strong>
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
      <Skeleton className="h-64 rounded-2xl" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}
