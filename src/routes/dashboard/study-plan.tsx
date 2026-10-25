import { StudyPlanningNav } from "@/components/dashboard/StudyPlanningNav";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Crosshair,
  FileCheck2,
  Gauge,
  Loader2,
  RefreshCw,
  Route as RouteIcon,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AgenteContabilidadePlan } from "@/components/dashboard/AgenteContabilidadePlan";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
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
  minutes: number;
  accuracy: number | null;
  answered: number;
  reason: string;
  level: "critico" | "intermediario" | "solido" | "sem-dados";
};
type StoredPlan = { career: CareerId; hours: number; examDate: string };

/** Poucas respostas não sustentam uma conclusão: abaixo disso o aproveitamento é só um indício. */
const MIN_SAMPLE = 20;
const MINUTES_PER_QUESTION = 2.5;
const QUESTION_TIME_SHARE = 0.45;
const DEFAULT_WEEKS = 12;
const STUDY_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

const CAREERS: Record<
  CareerId,
  {
    fullName: string;
    board: string;
    target: string;
    accuracyGoal: number;
    subjects: Array<{ name: string; weight: number; aliases: string[] }>;
    strategy: string[];
  }
> = {
  PF: {
    fullName: "Polícia Federal",
    board: "CEBRASPE",
    target: "Elevar a nota líquida e reduzir respostas de risco no modelo Certo/Errado.",
    accuracyGoal: 75,
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
    strategy: [
      "Uma errada anula uma certa: só marque o que você consegue justificar.",
      "Alterne blocos de base (Português, Lógica) e de conteúdo específico.",
      "Faça um simulado completo de 120 itens a cada quinze dias.",
    ],
  },
  PRF: {
    fullName: "Polícia Rodoviária Federal",
    board: "CEBRASPE",
    target: "Consolidar o núcleo comum e construir domínio específico em Trânsito e Física.",
    accuracyGoal: 75,
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
    strategy: [
      "Uma errada anula uma certa: responda com segurança, não por palpite.",
      "Reserve um bloco curto e diário para Trânsito: é a matéria mais pesada.",
      "Em Física, estude por modelos de problema, não por memorização de fórmulas.",
    ],
  },
  PC: {
    fullName: "Polícia Civil",
    board: "Multibancas",
    target: "Aproveitar a base policial e ganhar precisão em provas de múltipla escolha.",
    accuracyGoal: 80,
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
    strategy: [
      "Treine eliminação técnica de alternativas, não só o acerto direto.",
      "Chegue a 80% de acerto por assunto antes de subir a dificuldade.",
      "Confira a legislação pela fonte oficial vigente antes de memorizar.",
    ],
  },
};

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

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

/** Cada matéria do histórico conta para UMA matéria do plano: a de alias mais específico (mais longo). */
function bestSubjectFor(key: string, subjects: (typeof CAREERS)[CareerId]["subjects"]) {
  let best = -1;
  let bestLen = 0;
  subjects.forEach((subject, index) => {
    for (const alias of subject.aliases) {
      const a = normalize(alias);
      if (key.includes(a) && a.length > bestLen) {
        best = index;
        bestLen = a.length;
      }
    }
  });
  return best;
}

function weeksUntil(examDate: string) {
  if (!examDate) return null;
  const target = new Date(`${examDate}T12:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const days = Math.ceil((target.getTime() - Date.now()) / 86_400_000);
  return days > 0 ? Math.max(1, Math.ceil(days / 7)) : null;
}

/** Quatro fases proporcionais ao tempo que falta; com menos de 4 semanas só há reta final. */
function buildPhases(weeks: number) {
  const names = [
    {
      title: "Diagnóstico e base",
      detail: "Teoria objetiva, lei seca vigente e caderno de erros.",
      gate: "Primeiro simulado feito e erros classificados por assunto.",
    },
    {
      title: "Ganho de volume",
      detail: "Blocos de questões por assunto e revisão espaçada (24h e 7 dias).",
      gate: "Meta semanal de questões cumprida por duas semanas seguidas.",
    },
    {
      title: "Integração",
      detail: "Simulados mistos, controle de tempo e leitura da banca.",
      gate: "Precisão geral acima da meta em dois simulados.",
    },
    {
      title: "Reta final",
      detail: "Revisão das falhas recorrentes, simulados completos e redução de risco.",
      gate: "Sem matéria crítica no ranking de prioridade.",
    },
  ];
  if (weeks < 4) return [{ ...names[3]!, from: 1, to: weeks }];
  const ends = [0.25, 0.6, 0.85, 1].map((p) => Math.max(1, Math.round(weeks * p)));
  for (let i = 1; i < ends.length; i++) if (ends[i]! <= ends[i - 1]!) ends[i] = ends[i - 1]! + 1;
  ends[3] = Math.max(weeks, ends[2]! + 1);
  return names.map((phase, i) => ({
    ...phase,
    from: i === 0 ? 1 : ends[i - 1]! + 1,
    to: ends[i]!,
  }));
}

/** Distribui os minutos de cada matéria em blocos de até 90 min, sem repetir a matéria no mesmo dia. */
function buildWeek(subjects: SubjectPlan[]) {
  const blocks: Array<{ name: string; minutes: number }> = [];
  for (const subject of subjects) {
    let left = subject.minutes;
    while (left >= 30) {
      const size = left >= 120 ? 90 : left;
      blocks.push({ name: subject.name, minutes: size });
      left -= size;
    }
  }
  blocks.sort((a, b) => b.minutes - a.minutes);
  const days = STUDY_DAYS.map((day) => ({ day, load: 0, items: [] as typeof blocks }));
  for (const block of blocks) {
    const free = days.filter((d) => !d.items.some((i) => i.name === block.name));
    const pool = free.length ? free : days;
    const target = pool.reduce((min, d) => (d.load < min.load ? d : min), pool[0]!);
    target.items.push(block);
    target.load += block.minutes;
  }
  return days;
}

const fmtMinutes = (m: number) =>
  m % 60 === 0
    ? `${m / 60}h`
    : m < 60
      ? `${m}min`
      : `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}`;

function StudyPlanPage() {
  const [career, setCareer] = React.useState<CareerId>("PF");
  const [weeklyHours, setWeeklyHours] = React.useState(15);
  const [examDate, setExamDate] = React.useState("");
  const [userId, setUserId] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);
  const [rows, setRows] = React.useState<ExamRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    void (async () => {
      setLoading(true);
      try {
        const { data: auth } = await supabase.auth.getSession();
        if (!auth.session) throw new Error("Entre novamente para gerar seu plano personalizado.");
        const uid = auth.session.user.id;
        if (active) {
          setUserId(uid);
          // Preferências ficam por conta: o mesmo aparelho pode ser usado por mais de uma pessoa.
          try {
            const raw = localStorage.getItem(`norte_study_plan:${uid}`);
            if (raw) {
              const saved = JSON.parse(raw) as Partial<StoredPlan>;
              if (saved.career && CAREERS[saved.career]) setCareer(saved.career);
              if (saved.hours && saved.hours >= 5 && saved.hours <= 40) setWeeklyHours(saved.hours);
              if (saved.examDate) setExamDate(saved.examDate);
            }
          } catch {
            /* sem armazenamento local: o plano usa os valores padrão */
          }
          setReady(true);
        }
        const { data, error: queryError } = await supabase
          .from("student_exam_documents")
          .select(
            "id,contest_name,contest_year,exam_board,correct_count,wrong_count,blank_count,score_net,extracted_data,storage_path",
          )
          .eq("user_id", uid)
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

  React.useEffect(() => {
    if (!ready || !userId) return;
    try {
      const value: StoredPlan = { career, hours: weeklyHours, examDate };
      localStorage.setItem(`norte_study_plan:${userId}`, JSON.stringify(value));
    } catch {
      /* ignora: o plano continua funcionando sem salvar */
    }
  }, [ready, userId, career, weeklyHours, examDate]);

  const attempts = React.useMemo(
    () => rows.filter((row) => row.storage_path?.startsWith("manual-entry/")),
    [rows],
  );
  const plan = CAREERS[career];
  const current = React.useMemo(
    () => attempts.filter((row) => careerMatch(String(row.contest_name || ""), career)),
    [attempts, career],
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
    const sums: Metric[] = plan.subjects.map(() => ({ correct: 0, wrong: 0, blank: 0, total: 0 }));
    for (const [key, value] of Object.entries(aggregate)) {
      const index = bestSubjectFor(key, plan.subjects);
      if (index < 0) continue;
      const sum = sums[index]!;
      sum.correct += value.correct;
      sum.wrong += value.wrong;
      sum.blank += value.blank;
      sum.total += value.total;
    }
    const scored = plan.subjects.map((subject, index) => {
      const metric = sums[index]!;
      const answered = metric.correct + metric.wrong;
      const accuracy = answered ? Math.round((metric.correct / answered) * 100) : null;
      const reliable = answered >= MIN_SAMPLE;
      const weakness = accuracy === null ? 0.45 : (100 - accuracy) / 100;
      const blankRate = metric.total ? metric.blank / metric.total : 0.2;
      return {
        subject,
        accuracy,
        answered,
        reliable,
        score: subject.weight * (1 + weakness * 1.25 + blankRate * 0.65),
      };
    });
    const total = scored.reduce((sum, item) => sum + item.score, 0);
    const monthMinutes = weeklyHours * 60;
    return scored
      .map((item): SubjectPlan => {
        const share = Math.max(5, Math.round((item.score / total) * 100));
        const level: SubjectPlan["level"] =
          item.accuracy === null || !item.reliable
            ? "sem-dados"
            : item.accuracy < 60
              ? "critico"
              : item.accuracy < plan.accuracyGoal
                ? "intermediario"
                : "solido";
        const reason = {
          "sem-dados":
            item.accuracy === null
              ? "Ainda sem respostas suas aqui: comece pela base e meça no primeiro simulado."
              : `Só ${item.answered} respostas no histórico (mínimo ${MIN_SAMPLE}): tome como indício, não como diagnóstico.`,
          critico: "Ponto crítico no seu histórico: prioridade máxima nesta semana.",
          intermediario: `Abaixo da meta de ${plan.accuracyGoal}%: há ganho claro com questões e revisão.`,
          solido: "Base consistente: mantenha com questões difíceis e revisão de erros.",
        }[level];
        return {
          name: item.subject.name,
          share,
          minutes: Math.max(30, Math.round((monthMinutes * share) / 100 / 15) * 15),
          accuracy: item.accuracy,
          answered: item.answered,
          reason,
          level,
        };
      })
      .sort((a, b) => b.share - a.share);
  }, [plan, aggregate, weeklyHours]);

  const week = React.useMemo(() => buildWeek(subjects), [subjects]);
  const weeksLeft = weeksUntil(examDate);
  const totalWeeks = weeksLeft ?? DEFAULT_WEEKS;
  const phases = React.useMemo(() => buildPhases(totalWeeks), [totalWeeks]);
  const questionGoal =
    Math.round((weeklyHours * 60 * QUESTION_TIME_SHARE) / MINUTES_PER_QUESTION / 10) * 10;

  const totals = React.useMemo(() => {
    let correct = 0;
    let wrong = 0;
    for (const row of current) {
      correct += Number(row.correct_count ?? 0);
      wrong += Number(row.wrong_count ?? 0);
    }
    return { correct, wrong, answered: correct + wrong };
  }, [current]);
  const overallAccuracy = totals.answered
    ? Math.round((totals.correct / totals.answered) * 100)
    : null;
  const scores = current
    .filter((row) => row.score_net !== null)
    .map((row) => Number(row.score_net));
  const trend = scores.length >= 2 ? Math.round((scores.at(-1)! - scores[0]!) * 100) / 100 : null;
  const latest = current.at(-1);
  const critical = subjects.filter((s) => s.level === "critico");
  const solid = subjects.filter((s) => s.level === "solido");

  return (
    <div className="study-plan-page space-y-7 pb-10">
      <PageHero
        image="journey"
        size="sm"
        kicker="Baseado nas suas provas"
        icon={Sparkles}
        title={<>Ajustes pelos resultados: <em>{plan.fullName}</em></>}
        description="Consulte prioridades a partir das provas realizadas. A carreira, a carga horária e a data abaixo são os parâmetros deste diagnóstico; confira se correspondem ao objetivo da sua preparação."
      >
        <div className="page-hero__stats">
          <HeroStat icon={FileCheck2} label="Provas da carreira" value={String(current.length)} />
          <HeroStat icon={Gauge} label="Precisão geral" value={overallAccuracy === null ? "—" : `${overallAccuracy}%`} />
          <HeroStat icon={TrendingUp} label="Tendência" value={trend === null ? "—" : `${trend > 0 ? "+" : ""}${trend} pts`} />
        </div>
      </PageHero>
      <StudyPlanningNav active="diagnosis" />

      {error && (
        <Card className="border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10">
          <CardContent className="flex items-center gap-3 py-4 text-sm text-amber-900 dark:text-amber-200">
            <RefreshCw className="h-4 w-4" /> {error} O plano-base continua disponível.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
              1
            </span>
            Defina seu objetivo
          </CardTitle>
          <CardDescription>As alterações são salvas automaticamente na sua conta.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mb-2 text-xs font-bold text-muted-foreground">Carreira</p>
            <div className="grid grid-cols-1 gap-2 rounded-2xl border bg-muted/30 p-1.5 sm:grid-cols-3">
              {(Object.keys(CAREERS) as CareerId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCareer(id)}
                  aria-pressed={career === id}
                  data-control-tone={{ PF: "gold", PRF: "sky", PC: "violet" }[id]}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-left transition-[color,background-color,box-shadow]",
                    career === id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted",
                  )}
                >
                  <span className="block text-base font-black">{id}</span>
                  <span
                    className={cn(
                      "hidden text-[11px] sm:block",
                      career === id ? "text-primary-foreground/75" : "text-muted-foreground",
                    )}
                  >
                    {CAREERS[id].fullName}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" /> Horas de estudo por semana
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[10, 15, 20, 30].map((h) => (
                <Button
                  key={h}
                  size="sm"
                  variant={weeklyHours === h ? "default" : "outline"}
                  aria-pressed={weeklyHours === h}
                  data-control-tone="teal"
                  onClick={() => setWeeklyHours(h)}
                >
                  {h}h
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="plan-exam-date"
              className="mb-2 flex items-center gap-1.5 text-xs font-bold text-muted-foreground"
            >
              <CalendarClock className="h-3.5 w-3.5" /> Data da prova (opcional)
            </label>
            <input
              id="plan-exam-date"
              type="date"
              value={examDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setExamDate(e.target.value)}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {weeksLeft
                ? `Faltam ${weeksLeft} semana${weeksLeft > 1 ? "s" : ""}: as fases abaixo foram ajustadas.`
                : `Sem data, o ciclo usa ${DEFAULT_WEEKS} semanas.`}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                2
              </span>
              Seu ponto de partida
            </CardTitle>
            {loading && (
              <Badge variant="outline">
                <Loader2 className="mr-1 h-3 w-3 animate-spin" /> analisando
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {current.length === 0 ? (
            <div className="flex flex-col gap-3 rounded-2xl border border-dashed p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="h-4 w-4 text-amber-600" /> Ainda não há provas de{" "}
                  {plan.fullName} no seu histórico
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sem resultados seus, o plano usa só o peso da carreira. Registre uma prova ou faça
                  o diagnóstico para ele passar a priorizar o que você erra.
                </p>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <Link to="/dashboard/student-exams" search={{ career }}>
                  Registrar prova
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={BarChart3}
                label="Última prova"
                value={latest?.score_net != null ? `${latest.score_net} pontos` : "Sem nota"}
                detail={`${latest?.contest_name ?? ""} · ${latest?.contest_year ?? ""}`}
              />
              <MetricCard
                icon={Target}
                label="Precisão geral"
                value={overallAccuracy === null ? "—" : `${overallAccuracy}%`}
                detail={`meta ${plan.accuracyGoal}% · ${totals.answered} respostas`}
              />
              <MetricCard
                icon={AlertTriangle}
                label="Críticas"
                value={critical.length ? String(critical.length) : "Nenhuma"}
                detail={
                  critical.length
                    ? critical
                        .map((s) => s.name)
                        .slice(0, 2)
                        .join(", ")
                    : "abaixo de 60% com amostra válida"
                }
              />
              <MetricCard
                icon={CheckCircle2}
                label="Sólidas"
                value={solid.length ? String(solid.length) : "Nenhuma"}
                detail={
                  solid.length
                    ? solid
                        .map((s) => s.name)
                        .slice(0, 2)
                        .join(", ")
                    : `acima da meta com ${MIN_SAMPLE}+ respostas`
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/25">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                3
              </span>
              <Crosshair className="h-5 w-5 text-primary" /> Prioridades da semana — {career}
            </CardTitle>
            <CardDescription>
              Tempo dividido pelo peso da carreira, seus erros e suas omissões. Em cada linha, vá
              direto para as questões ou para o estudo.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y p-0">
            {subjects.map((subject, index) => (
              <div
                key={subject.name}
                className="grid gap-3 px-5 py-4 md:grid-cols-[2rem_1fr_9rem] md:items-center"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black",
                    subject.level === "critico"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-muted text-muted-foreground",
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
                          subject.level === "critico" && "border-rose-300 bg-rose-50 text-rose-700",
                          subject.level === "solido" &&
                            "border-emerald-300 bg-emerald-50 text-emerald-700",
                        )}
                      >
                        {subject.accuracy}% · {subject.answered} resp.
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{subject.reason}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                      <Link to="/dashboard/question-trainer" search={{ subject: subject.name }}>
                        Treinar questões
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="h-7 text-xs">
                      <Link to="/dashboard/study-room" search={{ subject: subject.name }}>
                        Estudar
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="md:text-right">
                  <p className="text-lg font-black tabular">{fmtMinutes(subject.minutes)}</p>
                  <p className="text-xs text-muted-foreground">{subject.share}% da semana</p>
                  <Progress value={Math.min(100, subject.share * 4)} className="mt-2 h-1.5" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" /> Metas da semana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Goal
                label="Questões"
                value={`${questionGoal}`}
                detail={`≈ ${Math.round(questionGoal / 6)} por dia de estudo`}
              />
              <Goal
                label="Precisão mínima"
                value={`${plan.accuracyGoal}%`}
                detail={career === "PC" ? "múltipla escolha" : "com controle de risco Certo/Errado"}
              />
              <Goal
                label="Simulado completo"
                value="a cada 15 dias"
                detail="para medir evolução real"
              />
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                A meta de questões considera {Math.round(QUESTION_TIME_SHARE * 100)}% do tempo de
                estudo em questões, a ~{MINUTES_PER_QUESTION} min cada.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BrainCircuit className="h-5 w-5 text-amber-600" /> Estratégia — {plan.board}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground">{plan.target}</p>
              <ul className="space-y-2">
                {plan.strategy.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
              4
            </span>
            <CalendarDays className="h-5 w-5 text-primary" /> Sua semana de estudo
          </CardTitle>
          <CardDescription>
            Blocos de até 90 min, sem repetir a matéria no mesmo dia. Domingo fica para revisão
            semanal dos erros e, a cada quinze dias, o simulado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {week.map((day) => (
              <div key={day.day} className="rounded-2xl border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-black">{day.day}</span>
                  <span className="text-xs text-muted-foreground tabular">
                    {fmtMinutes(day.load)}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {day.items.map((item) => (
                    <li
                      key={`${day.day}-${item.name}`}
                      className="rounded-lg bg-muted/60 px-2 py-1.5 text-xs"
                    >
                      <span className="block font-semibold leading-tight">{item.name}</span>
                      <span className="text-muted-foreground">{fmtMinutes(item.minutes)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border bg-primary/[0.03] p-4">
            <p className="mb-2 text-sm font-bold">Como usar cada bloco de 90 minutos</p>
            <div className="grid gap-2 text-xs sm:grid-cols-4">
              <Step minutes="10" title="Revisão ativa" detail="flashcards e erros anteriores" />
              <Step minutes="30" title="Teoria objetiva" detail="um tópico do edital" />
              <Step minutes="40" title="Questões" detail={`estilo ${plan.board}`} />
              <Step minutes="10" title="Caderno de erros" detail="causa, regra e prevenção" />
            </div>
          </div>
        </CardContent>
      </Card>

      {career === "PF" && <AgenteContabilidadePlan />}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
              5
            </span>
            <RouteIcon className="h-5 w-5 text-emerald-600" /> Linha de execução — {totalWeeks}{" "}
            semana{totalWeeks > 1 ? "s" : ""}
          </CardTitle>
          <CardDescription>
            Só passe para a próxima fase quando atingir o critério de saída.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "grid gap-3",
              phases.length > 1 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-1",
            )}
          >
            {phases.map((phase, index) => (
              <div key={phase.title} className="rounded-2xl border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-black text-primary-foreground">
                    {index + 1}
                  </span>
                  <Badge variant="secondary">
                    {phase.from === phase.to
                      ? `Semana ${phase.from}`
                      : `Semanas ${phase.from}–${phase.to}`}
                  </Badge>
                </div>
                <p className="font-black">{phase.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{phase.detail}</p>
                <p className="mt-3 border-t pt-2 text-[11px] font-semibold">
                  <span className="text-emerald-700 dark:text-emerald-400">Para avançar:</span>{" "}
                  {phase.gate}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="font-black">
            {current.length ? "Refaça a medição" : "Faça seu diagnóstico"} — {career}
          </p>
          <p className="text-sm text-muted-foreground">
            O resultado recalcula as prioridades acima. Gabarito e explicações só aparecem ao finalizar.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
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
          <Button asChild variant="outline">
            <Link to="/dashboard/cronograma">Ver cronograma por edital</Link>
          </Button>
        </div>
      </Card>
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
    <div className="flex gap-3 rounded-2xl border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="font-black">{value}</p>
        <p className="truncate text-[11px] text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function Goal({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b pb-2 last:border-0">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-[11px] text-muted-foreground">{detail}</p>
      </div>
      <p className="text-right text-lg font-black tabular">{value}</p>
    </div>
  );
}

function Step({ minutes, title, detail }: { minutes: string; title: string; detail: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary">
        {minutes}′
      </span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
