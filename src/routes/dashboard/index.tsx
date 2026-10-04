import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Circle,
  Clock,
  Compass,
  Download,
  FileText,
  Layers,
  MapPin,
  NotebookPen,
  ShieldAlert,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardData, useAuthStatus } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MockService } from "@/services/mockService";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { StudyGoals } from "@/components/dashboard/StudyGoals";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Painel do aluno | Norte Concurso" },
      {
        name: "description",
        content:
          "Acompanhe seu plano, desempenho e próximas atividades de preparação para concursos.",
      },
      { property: "og:title", content: "Painel do aluno | Norte Concurso" },
      {
        property: "og:description",
        content: "Sua central de preparação, questões, provas e desempenho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardIndex,
});

type AccessAuditLog = {
  id: string;
  feature_key: string;
  attempt_time: string;
  was_blocked: boolean;
};

type ProfileChange = {
  new: {
    onboarding_steps?: { contest: boolean; notebook: boolean; plan: boolean };
    onboarding_done?: boolean;
  };
};

const TRAINER_SEARCH = {
  contest: undefined,
  board: undefined,
  career: undefined,
  year: undefined,
  subject: undefined,
  source: undefined,
  reviewed: undefined,
  state: undefined,
  category: undefined,
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function DashboardIndex() {
  const { stats, focusedContest, isLoading } = useDashboardData();
  const { user } = useAuthStatus();
  const [showTour, setShowTour] = React.useState(false);
  const [checklist, setChecklist] = React.useState({
    contest: false,
    notebook: false,
    plan: false,
  });
  const [isUpdatingTour, setIsUpdatingTour] = React.useState(false);
  const [dailyQuota, setDailyQuota] = React.useState({ used: 0, total: 0 });
  const [blockedAttempts, setBlockedAttempts] = React.useState<AccessAuditLog[]>([]);
  const [isLoadingAttempts, setIsLoadingAttempts] = React.useState(false);

  React.useEffect(() => {
    const fetchOnboarding = async () => {
      const status = await MockService.getOnboardingStatus();
      if (!status.onboarding_done) {
        setShowTour(true);
      }

      const storedContest = localStorage.getItem("norte_focused_contest");
      const storedNotebooks = JSON.parse(localStorage.getItem("norte_notebooks") || "[]");

      const currentSteps = {
        contest: !!storedContest,
        notebook: storedNotebooks.length > 0,
        plan: user?.subscription_tier !== "free",
      };

      setChecklist(currentSteps);

      if (user && JSON.stringify(status.onboarding_steps) !== JSON.stringify(currentSteps)) {
        MockService.updateOnboardingStatus({ onboarding_steps: currentSteps });
      }

      const responses = MockService.getUserResponses();
      const today = new Date().toISOString().split("T")[0];
      const todayCount = responses.filter(
        (response) => response.createdAt?.split("T")[0] === today,
      ).length;
      const userRole = (user?.role || "free") as string;
      const limit = userRole === "free" ? 10 : userRole === "essential" ? 100 : Infinity;
      setDailyQuota({ used: todayCount, total: limit === Infinity ? 9999 : limit });

      if (limit !== Infinity) {
        const usagePercent = (todayCount / (limit as number)) * 100;
        const lastNotified = localStorage.getItem("norte_last_quota_notify");
        const todayStr = new Date().toDateString();

        if (usagePercent >= 100 && lastNotified !== `100_${todayStr}`) {
          toast.error("Cota diária esgotada! Considere um upgrade para continuar respondendo.");
          localStorage.setItem("norte_last_quota_notify", `100_${todayStr}`);
        } else if (
          usagePercent >= 80 &&
          lastNotified !== `80_${todayStr}` &&
          lastNotified !== `100_${todayStr}`
        ) {
          toast.warning("Você atingiu 80% da sua cota diária de questões.");
          localStorage.setItem("norte_last_quota_notify", `80_${todayStr}`);
        }
      }

      setIsLoadingAttempts(true);
      const logs = await MockService.getAccessAuditLogs();
      setBlockedAttempts((logs as AccessAuditLog[]).filter((log) => log.was_blocked));
      setIsLoadingAttempts(false);
    };

    fetchOnboarding();

    if (user) {
      const channel = supabase
        .channel("profile_sync")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${user.id}`,
          },
          (payload: ProfileChange) => {
            if (payload.new.onboarding_steps) {
              setChecklist(payload.new.onboarding_steps);
            }
            if (payload.new.onboarding_done !== undefined) {
              setShowTour(!payload.new.onboarding_done);
            }
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
    return undefined;
  }, [user]);

  const completeTour = async () => {
    setIsUpdatingTour(true);
    await MockService.updateOnboardingStatus({ onboarding_done: true });
    setShowTour(false);
    setIsUpdatingTour(false);
    toast.success("Tudo pronto! Boa sorte nos estudos.");
  };

  if (isLoading) return <DashboardSkeleton />;

  const handleExportCSV = () => {
    const responses = MockService.getUserResponses();
    if (responses.length === 0) {
      toast.error("Nenhum dado para exportar");
      return;
    }

    const headers = ["Data", "Questão ID", "Acertou", "Tempo (seg)"];
    const csvContent = [
      headers.join(","),
      ...responses.map((r) =>
        [
          new Date(r.createdAt).toLocaleString(),
          r.questionId,
          r.isCorrect ? "Sim" : "Não",
          r.timeSpent,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `resultados_norte_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exportação CSV concluída!");
  };

  const handleExportPDF = () => {
    toast.success("Gerando relatório para impressão...");
    setTimeout(() => {
      window.print();
    }, 600);
  };

  const chartData =
    stats?.byDiscipline.map((d) => ({
      name:
        d.disciplineId === "1" ? "Português" : d.disciplineId === "4" ? "Constitucional" : "Outras",
      acertos: d.correct,
      total: d.total,
    })) || [];

  const accuracy = stats?.accuracyRate ?? 0;
  const minutes = Math.floor((stats?.timeSpent || 0) / 60);
  const unlimited = dailyQuota.total === 9999;
  const quotaPercent = dailyQuota.total ? (dailyQuota.used / dailyQuota.total) * 100 : 0;
  const firstName = user?.full_name?.split(" ")[0] || "Estudante";

  return (
    <div className="space-y-5 sm:space-y-7">
      <PageHero
        image="dashboard"
        size="lg"
        kicker="Central de preparação"
        icon={Compass}
        title={
          <>
            {greeting()}, <em>{firstName}.</em>
          </>
        }
        description="Prioridades, ritmo e desempenho reunidos para você avançar com clareza hoje."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hero-btn-ghost gap-2">
                  <Download className="h-4 w-4" /> Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Formato de exportação</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer gap-2">
                  <FileText className="h-4 w-4" /> CSV (Excel)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer gap-2">
                  <Download className="h-4 w-4" /> PDF (relatório)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="hero-btn-primary gap-2" asChild>
              <Link to="/dashboard/question-trainer" search={TRAINER_SEARCH}>
                Treinar agora <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        }
      >
        <div className="page-hero__stats">
          <HeroStat icon={Target} label="Foco atual" value={focusedContest?.agency || "—"} />
          <HeroStat icon={CheckCircle2} label="Taxa de acerto" value={`${accuracy.toFixed(1)}%`} />
          <HeroStat icon={Clock} label="Tempo efetivo" value={`${minutes} min`} />
          <HeroStat
            icon={Zap}
            label="Cota diária"
            value={
              unlimited ? (
                `${dailyQuota.used}/∞`
              ) : (
                <>
                  {dailyQuota.used}/{dailyQuota.total}
                  <i className="hero-stat__bar" aria-hidden="true">
                    <b
                      style={{
                        width: `${Math.min(quotaPercent, 100)}%`,
                        background:
                          quotaPercent > 90
                            ? "var(--color-destructive)"
                            : quotaPercent > 70
                              ? "var(--color-amber-400)"
                              : "var(--color-emerald-400)",
                      }}
                    />
                  </i>
                </>
              )
            }
          />
        </div>
      </PageHero>

      {showTour && (
        <section className="onboarding-banner no-print">
          <div>
            <span className="hero-chip">Primeiros passos</span>
            <h2 className="font-display mt-3 text-2xl font-bold">
              Configure sua rota de preparação
            </h2>
            <div className="onboarding-steps">
              <OnboardingStep label="Definir concurso" done={checklist.contest} />
              <OnboardingStep label="Criar caderno" done={checklist.notebook} />
              <OnboardingStep label="Ajustar plano" done={checklist.plan} />
            </div>
          </div>
          <Button onClick={completeTour} className="hero-btn-primary" disabled={isUpdatingTour}>
            {isUpdatingTour ? "Sincronizando..." : "Concluir configuração"}
          </Button>
        </section>
      )}

      <section className="quick-actions no-print" aria-label="Ações rápidas">
        <QuickAction
          to="/dashboard/question-trainer"
          icon={BrainCircuit}
          title="Treinar"
          text="Questões por filtro"
        />
        <QuickAction
          to="/dashboard/mock-exams"
          icon={Trophy}
          title="Simular"
          text="Prova completa"
        />
        <QuickAction
          to="/dashboard/edital"
          icon={MapPin}
          title="Edital"
          text="Estudar por assunto"
        />
        <QuickAction
          to="/dashboard/performance"
          icon={Layers}
          title="Evolução"
          text="Raio-X de desempenho"
        />
      </section>

      <StudyGoals planTier={user?.subscription_tier} />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Card className="command-panel">
          <CardHeader className="pb-2">
            <div className="section-title">
              <div>
                <h2>Evolução por disciplina</h2>
                <p>Acertos acumulados nas suas sessões</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/performance">
                  Raio-X <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-72 sm:h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: -18, right: 8, top: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: "var(--color-muted)" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-popover)",
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Bar
                    dataKey="acertos"
                    name="Acertos"
                    fill="var(--color-chart-1)"
                    radius={[8, 8, 2, 2]}
                    maxBarSize={56}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState
                icon={BarChart3}
                title="Sem dados por enquanto"
                text="Resolva sua primeira sessão de questões para ver a evolução por disciplina."
                action={
                  <Button size="sm" asChild>
                    <Link to="/dashboard/question-trainer" search={TRAINER_SEARCH}>
                      Começar treino
                    </Link>
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>

        <Card className="command-panel no-print">
          <CardHeader className="pb-3">
            <div className="section-title">
              <div>
                <h2>Próximas atividades</h2>
                <p>Sequência sugerida para hoje</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/study-plan">
                  Ver plano <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <TaskRow
              icon={Trophy}
              tone="brass"
              title="Simulado semanal"
              meta="Simulado · prioridade"
              to="/dashboard/mock-exams"
              cta="Iniciar"
            />
            <TaskRow
              icon={NotebookPen}
              tone="signal"
              title="Revisão dos erros recentes"
              meta="Repetição espaçada · sugerido hoje"
              to="/dashboard/errors"
              cta="Revisar"
            />
            <TaskRow
              icon={BrainCircuit}
              tone="jade"
              title="Bloco de questões do seu concurso"
              meta="Treino direcionado"
              to="/dashboard/question-trainer"
              cta="Treinar"
            />
            <TaskRow
              icon={Timer}
              title="Sessão de foco"
              meta="Pomodoro · 25 min"
              to="/dashboard/timer"
              cta="Abrir"
            />
          </CardContent>
        </Card>
      </div>

      {(isLoadingAttempts || blockedAttempts.length > 0) && (
        <Card className="command-panel no-print">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between gap-3">
              <span className="section-title">
                <span>
                  <h2>Limites do plano</h2>
                  <p>Recursos que você tentou usar além da sua cota</p>
                </span>
              </span>
              <Badge variant="outline" className="shrink-0">
                {blockedAttempts.length} bloqueios
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingAttempts ? (
              <div className="space-y-2">
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
            ) : (
              <div className="grid gap-2 md:grid-cols-3">
                {blockedAttempts.slice(0, 3).map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex items-center gap-3 rounded-xl border border-destructive/15 bg-destructive/5 p-3"
                  >
                    <ShieldAlert className="h-4 w-4 shrink-0 text-destructive" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{attempt.feature_key}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(attempt.attempt_time).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard/profile">Planos</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  title,
  text,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <Link to={to} className="quick-action">
      <span className="quick-action__icon">
        <Icon />
      </span>
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <ArrowRight />
    </Link>
  );
}

function TaskRow({
  icon: Icon,
  title,
  meta,
  to,
  cta,
  tone,
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
  to: string;
  cta: string;
  tone?: "brass" | "signal" | "jade";
}) {
  return (
    <div className="task-row" data-tone={tone}>
      <span className="task-row__icon">
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{meta}</p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link to={to}>{cta}</Link>
      </Button>
    </div>
  );
}

function OnboardingStep({ label, done }: { label: string; done: boolean }) {
  return (
    <span className="onboarding-step" data-done={done}>
      {done ? <CheckCircle2 /> : <Circle />}
      {label}
    </span>
  );
}

function EmptyState({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <span className="metric-tile__icon h-12 w-12 rounded-2xl">
        <Icon />
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">{text}</p>
      </div>
      {action}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[300px] rounded-[22px]" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-2xl" />
    </div>
  );
}
