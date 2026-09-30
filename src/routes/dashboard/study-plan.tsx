import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Crosshair,
  FileCheck2,
  Gauge,
  Loader2,
  RefreshCw,
  Route as RouteIcon,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/study-plan")({ component: StudyPlanPage });
type CareerId = "PF" | "PRF" | "PC";
type Metric = { correct: number; wrong: number; blank: number; total: number };
type ExamRow = {
  id: string;
  contest_name: string | null;
  contest_year: string | number | null;
  exam_board: string | null;
  correct_count: number | null;
  wrong_count: number | null;
  blank_count: number | null;
  score_net: number | null;
  extracted_data: Record<string, unknown> | null;
  storage_path: string;
};
type SubjectPlan = {
  name: string;
  share: number;
  accuracy: number | null;
  reason: string;
  sessions: string[];
};

const CAREERS: Record<
  CareerId,
  {
    fullName: string;
    board: string;
    accent: string;
    target: string;
    subjects: Array<{ name: string; weight: number; aliases: string[] }>;
  }
> = {
  PF: {
    fullName: "Polícia Federal",
    board: "CEBRASPE",
    accent: "from-sky-500 to-blue-700",
    target: "Elevar a nota líquida e reduzir respostas de risco no modelo Certo/Errado.",
    subjects: [
      { name: "Informática e Tecnologia", weight: 16, aliases: ["informática", "tecnologia"] },
      { name: "Contabilidade", weight: 12, aliases: ["contabilidade"] },
      {
        name: "Estatística e Raciocínio Lógico",
        weight: 15,
        aliases: ["estatística", "raciocínio lógico"],
      },
      { name: "Língua Portuguesa", weight: 15, aliases: ["portuguesa", "português"] },
      { name: "Direito Administrativo", weight: 9, aliases: ["administrativo"] },
      { name: "Direito Constitucional", weight: 9, aliases: ["constitucional"] },
      {
        name: "Direito Penal e Processual Penal",
        weight: 12,
        aliases: ["penal", "processual penal"],
      },
      {
        name: "Legislação Especial e Direitos Humanos",
        weight: 8,
        aliases: ["legislação", "direitos humanos"],
      },
      { name: "Atualidades e Economia", weight: 4, aliases: ["atualidades", "economia"] },
    ],
  },
  PRF: {
    fullName: "Polícia Rodoviária Federal",
    board: "CEBRASPE",
    accent: "from-amber-400 to-orange-600",
    target: "Consolidar o núcleo comum e construir domínio específico em Trânsito e Física.",
    subjects: [
      { name: "Legislação de Trânsito", weight: 24, aliases: ["trânsito", "transito"] },
      { name: "Língua Portuguesa", weight: 13, aliases: ["portuguesa", "português"] },
      { name: "Raciocínio Lógico-Matemático", weight: 10, aliases: ["raciocínio", "matemática"] },
      { name: "Informática", weight: 8, aliases: ["informática"] },
      { name: "Física", weight: 10, aliases: ["física"] },
      {
        name: "Direito Constitucional e Administrativo",
        weight: 12,
        aliases: ["constitucional", "administrativo"],
      },
      {
        name: "Direito Penal, Processo Penal e Legislação Especial",
        weight: 13,
        aliases: ["penal", "processual", "legislação"],
      },
      {
        name: "Ética, Cidadania e Direitos Humanos",
        weight: 6,
        aliases: ["ética", "direitos humanos", "cidadania"],
      },
      {
        name: "Geopolítica e Língua Estrangeira",
        weight: 4,
        aliases: ["geopolítica", "geografia", "inglês", "espanhol"],
      },
    ],
  },
  PC: {
    fullName: "Polícia Civil",
    board: "Multibancas",
    accent: "from-violet-500 to-indigo-700",
    target: "Aproveitar a base policial e ganhar precisão em provas de múltipla escolha.",
    subjects: [
      { name: "Direito Penal", weight: 16, aliases: ["direito penal"] },
      { name: "Direito Processual Penal", weight: 16, aliases: ["processual penal"] },
      {
        name: "Legislação Penal Especial",
        weight: 13,
        aliases: ["legislação penal", "legislação especial"],
      },
      { name: "Direito Constitucional", weight: 10, aliases: ["constitucional"] },
      { name: "Direito Administrativo", weight: 9, aliases: ["administrativo"] },
      { name: "Língua Portuguesa", weight: 13, aliases: ["portuguesa", "português"] },
      { name: "Informática", weight: 8, aliases: ["informática"] },
      { name: "Raciocínio Lógico", weight: 7, aliases: ["raciocínio"] },
      {
        name: "Medicina Legal e Criminalística",
        weight: 8,
        aliases: ["medicina legal", "criminalística"],
      },
    ],
  },
};
const PHASES = [
  {
    weeks: "1–3",
    title: "Diagnóstico e base",
    detail: "Teoria objetiva, lei seca vigente e caderno de erros.",
  },
  {
    weeks: "4–7",
    title: "Ganho de volume",
    detail: "Blocos de questões por assunto e revisão espaçada.",
  },
  {
    weeks: "8–10",
    title: "Integração",
    detail: "Simulados mistos, controle de tempo e estratégia da banca.",
  },
  {
    weeks: "11–12",
    title: "Reta final",
    detail: "Revisão de falhas, simulados completos e redução de risco.",
  },
];
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
function readMetrics(data: Record<string, unknown> | null) {
  const result: Record<string, Metric> = {};
  const raw = data?.["by_subject"];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return result;
  for (const [subject, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const item = value as Record<string, unknown>;
    const correct = Number(item["correct"] ?? item["corretas"] ?? 0),
      wrong = Number(item["wrong"] ?? item["erradas"] ?? 0),
      blank = Number(item["blank"] ?? item["branco"] ?? item["em_branco"] ?? 0);
    result[normalize(subject)] = {
      correct,
      wrong,
      blank,
      total: Number(item["total"] ?? correct + wrong + blank),
    };
  }
  return result;
}
function careerMatch(contest: string, career: CareerId) {
  const name = normalize(contest);
  if (career === "PF")
    return name.includes("policia federal") || name.includes("agente de policia federal");
  if (career === "PRF") return name.includes("rodoviaria federal") || name.includes("prf");
  return name.includes("policia civil") || name.includes("policia penal");
}

function StudyPlanPage() {
  const [career, setCareer] = React.useState<CareerId>("PF");
  const [weeklyHours, setWeeklyHours] = React.useState(15);
  const [rows, setRows] = React.useState<ExamRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    const saved = localStorage.getItem("norte_study_career") as CareerId | null;
    const hours = Number(localStorage.getItem("norte_study_hours"));
    if (saved && CAREERS[saved]) setCareer(saved);
    if (hours >= 5 && hours <= 40) setWeeklyHours(hours);
  }, []);
  React.useEffect(() => {
    let active = true;
    void (async () => {
      setLoading(true);
      try {
        const { data: auth } = await supabase.auth.getSession();
        if (!auth.session) throw new Error("Entre novamente para gerar seu plano personalizado.");
        const { data, error: queryError } = await supabase
          .from("student_exam_documents")
          .select(
            "id,contest_name,contest_year,exam_board,correct_count,wrong_count,blank_count,score_net,extracted_data,storage_path",
          )
          .eq("user_id", auth.session.user.id)
          .order("contest_year", { ascending: true });
        if (queryError) throw queryError;
        if (active) setRows((data || []) as ExamRow[]);
      } catch (e) {
        if (active)
          setError(e instanceof Error ? e.message : "Não foi possível analisar seu histórico.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  const attempts = React.useMemo(
    () => rows.filter((row) => row.storage_path?.startsWith("manual-entry/")),
    [rows],
  );
  const aggregate = React.useMemo(() => {
    const all: Record<string, Metric> = {};
    for (const row of attempts)
      for (const [key, metric] of Object.entries(readMetrics(row.extracted_data))) {
        const old = all[key] || { correct: 0, wrong: 0, blank: 0, total: 0 };
        all[key] = {
          correct: old.correct + metric.correct,
          wrong: old.wrong + metric.wrong,
          blank: old.blank + metric.blank,
          total: old.total + metric.total,
        };
      }
    return all;
  }, [attempts]);
  const subjects = React.useMemo<SubjectPlan[]>(() => {
    const scored = CAREERS[career].subjects.map((subject) => {
      const metric = Object.entries(aggregate)
        .filter(([name]) => subject.aliases.some((alias) => name.includes(normalize(alias))))
        .reduce<Metric>(
          (sum, [, value]) => ({
            correct: sum.correct + value.correct,
            wrong: sum.wrong + value.wrong,
            blank: sum.blank + value.blank,
            total: sum.total + value.total,
          }),
          { correct: 0, wrong: 0, blank: 0, total: 0 },
        );
      const answered = metric.correct + metric.wrong;
      const accuracy = answered ? Math.round((metric.correct / answered) * 100) : null;
      const weakness = accuracy === null ? 0.45 : (100 - accuracy) / 100;
      return {
        ...subject,
        accuracy,
        score:
          subject.weight *
          (1 + weakness * 1.25 + (metric.total ? metric.blank / metric.total : 0.2) * 0.65),
      };
    });
    const total = scored.reduce((sum, item) => sum + item.score, 0);
    return scored
      .map((item) => ({
        name: item.name,
        share: Math.max(5, Math.round((item.score / total) * 100)),
        accuracy: item.accuracy,
        reason:
          item.accuracy === null
            ? "Sem amostra suficiente: construir base e medir no primeiro simulado."
            : item.accuracy < 60
              ? "Ponto crítico identificado no seu histórico."
              : item.accuracy < 75
                ? "Desempenho intermediário com margem clara de ganho."
                : "Base consistente: manter por revisão e questões difíceis.",
        sessions:
          item.accuracy !== null && item.accuracy >= 75
            ? ["Questões avançadas", "Revisão de erros"]
            : ["Teoria direcionada", "Questões da banca", "Revisão 24h/7d"],
      }))
      .sort((a, b) => b.share - a.share);
  }, [career, aggregate]);
  const plan = CAREERS[career];
  const federal = attempts.filter(
    (row) =>
      careerMatch(String(row.contest_name || ""), "PF") ||
      careerMatch(String(row.contest_name || ""), "PRF"),
  );
  const current = attempts.filter((row) => careerMatch(String(row.contest_name || ""), career));
  const latest = current.at(-1);
  const pfScores = attempts
    .filter((row) => careerMatch(String(row.contest_name || ""), "PF") && row.score_net !== null)
    .map((row) => Number(row.score_net));
  const evolution = pfScores.length >= 2 ? pfScores.at(-1)! - pfScores[0]! : null;
  const questionGoal = Math.max(180, Math.round(weeklyHours * 18));
  const savePlan = () => {
    localStorage.setItem("norte_study_career", career);
    localStorage.setItem("norte_study_hours", String(weeklyHours));
    toast.success(`Plano ${career} salvo com ${weeklyHours} horas semanais.`);
  };

  return (
    <div className="space-y-7 pb-10">
      <section className="page-hero page-hero--lg" data-hero="journey">
        <div className="grid gap-7 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <span className="hero-chip">
              <Sparkles /> Inteligência baseada na sua trajetória
            </span>
            <h1>
              Operação aprovação: <em>PF, PRF e Polícia Civil</em>
            </h1>
            <p className="page-hero__desc">
              Um ciclo adaptativo que transforma suas provas anteriores em prioridades, metas de
              questões e revisões mensuráveis.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <HeroMetric
              label="Provas analisadas"
              value={String(attempts.length)}
              icon={FileCheck2}
            />
            <HeroMetric label="Provas federais" value={String(federal.length)} icon={ShieldCheck} />
            <HeroMetric
              label="Evolução PF"
              value={
                evolution === null ? "Em análise" : `${evolution > 0 ? "+" : ""}${evolution} pts`
              }
              icon={TrendingUp}
            />
          </div>
        </div>
      </section>
      {error && (
        <Card className="border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10">
          <CardContent className="flex items-center gap-3 py-4 text-sm text-amber-900 dark:text-amber-200">
            <RefreshCw className="h-4 w-4" /> {error} O plano-base continua disponível.
          </CardContent>
        </Card>
      )}
      <section className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border bg-card p-2 shadow-sm">
          {(Object.keys(CAREERS) as CareerId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCareer(id)}
              className={cn(
                "rounded-xl px-3 py-3 text-left transition-all",
                career === id ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted",
              )}
            >
              <span className="block text-lg font-black">{id}</span>
              <span
                className={cn(
                  "hidden text-xs sm:block",
                  career === id ? "text-primary-foreground/75" : "text-muted-foreground",
                )}
              >
                {CAREERS[id].fullName}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-sm">
          <Clock3 className="ml-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap text-xs font-bold">Horas/semana</span>
          {[10, 15, 20, 30].map((h) => (
            <Button
              key={h}
              size="sm"
              variant={weeklyHours === h ? "default" : "ghost"}
              onClick={() => setWeeklyHours(h)}
            >
              {h}h
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={savePlan}>
            <Save className="mr-1.5 h-3.5 w-3.5" /> Salvar
          </Button>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Target}
          label="Meta semanal"
          value={`${questionGoal} questões`}
          detail={`${Math.round(questionGoal / 6)} por dia de treino`}
        />
        <MetricCard
          icon={Gauge}
          label="Meta de precisão"
          value={career === "PC" ? "≥ 80%" : "≥ 75%"}
          detail={career === "PC" ? "múltipla escolha" : "com controle de risco C/E"}
        />
        <MetricCard
          icon={CalendarDays}
          label="Ciclo recomendado"
          value="12 semanas"
          detail="4 fases com recalibração"
        />
        <MetricCard
          icon={BarChart3}
          label="Última referência"
          value={latest?.score_net != null ? `${latest.score_net} pontos` : "Diagnóstico inicial"}
          detail={
            latest ? `${latest.contest_name} · ${latest.contest_year}` : "faça o primeiro simulado"
          }
        />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/25">
            <div className="flex justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Crosshair className="h-5 w-5 text-primary" /> Matriz de prioridade — {career}
                </CardTitle>
                <CardDescription className="mt-1">
                  Carga recalculada pelo peso da carreira, seus erros e omissões.
                </CardDescription>
              </div>
              {loading && (
                <Badge variant="outline">
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" /> analisando
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="divide-y p-0">
            {subjects.map((subject, index) => {
              const hours = Math.max(0.5, (weeklyHours * subject.share) / 100);
              return (
                <div
                  key={subject.name}
                  className="grid gap-3 px-5 py-4 md:grid-cols-[2rem_1fr_8rem] md:items-center"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black",
                      index < 3 ? "bg-rose-100 text-rose-700" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold">{subject.name}</p>
                      {subject.accuracy !== null && (
                        <Badge
                          variant="outline"
                          className={cn(
                            subject.accuracy < 60 && "border-rose-300 bg-rose-50 text-rose-700",
                          )}
                        >
                          {subject.accuracy}% no histórico
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{subject.reason}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {subject.sessions.map((session) => (
                        <span
                          key={session}
                          className="rounded-md bg-muted px-2 py-1 text-[10px] font-semibold"
                        >
                          {session}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="text-lg font-black">{hours.toFixed(1)}h</p>
                    <p className="text-xs text-muted-foreground">{subject.share}% da semana</p>
                    <Progress value={subject.share * 3} className="mt-2 h-1.5" />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BrainCircuit className="h-5 w-5 text-violet-600" /> Estratégia da banca
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="rounded-xl bg-muted/60 p-4">
                <p className="font-black">{plan.board}</p>
                <p className="mt-1 text-muted-foreground">{plan.target}</p>
              </div>
              <Strategy career={career} />
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/[0.03]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpenCheck className="h-5 w-5 text-primary" /> Sessão padrão de 90 min
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Session minutes="10" title="Revisão ativa" detail="flashcards e erros anteriores" />
              <Session minutes="30" title="Teoria cirúrgica" detail="um tópico do edital" />
              <Session minutes="40" title="Questões" detail={`estilo ${plan.board}`} />
              <Session minutes="10" title="Caderno de erros" detail="causa, regra e prevenção" />
            </CardContent>
          </Card>
        </div>
      </section>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RouteIcon className="h-5 w-5 text-emerald-600" /> Linha de execução — 12 semanas
          </CardTitle>
          <CardDescription>
            Cada fase só avança quando as métricas mínimas forem atingidas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {PHASES.map((phase, index) => (
              <div key={phase.weeks} className="rounded-2xl border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-black text-primary-foreground">
                    {index + 1}
                  </span>
                  <Badge variant="secondary">Semanas {phase.weeks}</Badge>
                </div>
                <p className="font-black">{phase.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{phase.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <section
        className="page-hero page-hero--sm md:!flex-row md:!items-end md:!justify-between"
        data-hero="exam-hall"
      >
        <div>
          <span className="hero-chip">Próxima missão</span>
          <h2 className="font-display mt-3 text-3xl font-extrabold leading-none">
            Execute um diagnóstico <span className="text-brass">{career}</span>
          </h2>
          <p className="page-hero__desc">
            O resultado alimentará a próxima recalibração do plano. Gabarito e explicações só
            aparecem ao finalizar.
          </p>
        </div>
        <Button asChild size="lg" className="hero-btn-primary mt-5 md:mt-0">
          <Link
            to="/dashboard/mock-exams"
            search={{
              contest: plan.fullName,
              board: plan.board === "Multibancas" ? undefined : plan.board,
            }}
          >
            Iniciar treino direcionado <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

function HeroMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="hero-stat">
      <span>
        <Icon />
        <span className="truncate">{label}</span>
      </span>
      <strong className="truncate !text-xl tabular">{value}</strong>
    </div>
  );
}
function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card>
      <CardContent className="flex gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">{label}</p>
          <p className="font-black">{value}</p>
          <p className="text-[11px] text-muted-foreground">{detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}
function Session({ minutes, title, detail }: { minutes: string; title: string; detail: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary">
        {minutes}
      </span>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
function Strategy({ career }: { career: CareerId }) {
  const items =
    career === "PC"
      ? [
          "Treinar alternativas e eliminação técnica",
          "Meta de 80% antes de elevar dificuldade",
          "Revisar legislação pela fonte oficial vigente",
        ]
      : career === "PRF"
        ? [
            "Uma errada anula uma certa: responder com segurança",
            "Bloco específico diário de Trânsito",
            "Física por modelos de problema, não por memorização",
          ]
        : [
            "Uma errada anula uma certa: controlar risco",
            "Alternar blocos básico e específico",
            "Simulado completo quinzenal com 120 itens",
          ];
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
