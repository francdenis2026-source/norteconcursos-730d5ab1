import { canonicalSubject } from "@/lib/subjects";
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Crown,
  Flag,
  Gauge,
  History,
  Loader2,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TimerReset,
  Trophy,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/mock-exams")({
  validateSearch: (
    search: Record<string, unknown>,
  ): Partial<
    Record<
      | "contest"
      | "board"
      | "career"
      | "year"
      | "subject"
      | "source"
      | "reviewed"
      | "state"
      | "category",
      string | undefined
    >
  > => ({
    contest: typeof search["contest"] === "string" ? search["contest"] : undefined,
    board: typeof search["board"] === "string" ? search["board"] : undefined,
    career: typeof search["career"] === "string" ? search["career"] : undefined,
    year: typeof search["year"] === "string" ? search["year"] : undefined,
    subject: typeof search["subject"] === "string" ? search["subject"] : undefined,
    source: typeof search["source"] === "string" ? search["source"] : undefined,
  }),
  component: ProfessionalSimulator,
});

type Answer = "A" | "B" | "C" | "D" | "E";
type SimulatorStage = "setup" | "active" | "result";
interface SimulatorQuestion {
  id: string;
  sourceKind: "official" | "curated";
  contest: string;
  year: number;
  career: string;
  board: string;
  subject: string;
  subtopic: string | null;
  itemNumber: number | null;
  text: string;
  answer: Answer;
  explanation: string;
  difficulty: string | null;
  legalBasis: Array<{ title?: string; lei?: string; artigo?: string; url?: string }>;
}
interface AttemptHistory {
  id: string;
  title: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  blank_answers: number;
  accuracy: number;
  duration_seconds: number;
  finished_at: string;
}
interface SubjectResult {
  subject: string;
  total: number;
  correct: number;
  wrong: number;
  blank: number;
  accuracy: number;
}
interface RankProfile {
  rank_position?: number;
  user_id: string;
  display_name?: string;
  total_points: number;
  stars: number;
  level_name: string;
  completed_simulators: number;
  best_accuracy: number;
}
const LIMITS = [10, 20, 30, 50];
const DURATIONS = [15, 30, 60, 120];

function ProfessionalSimulator() {
  const routeSearch = Route.useSearch();
  const { user, isLoading: authLoading } = useAuthStatus();
  const [stage, setStage] = React.useState<SimulatorStage>("setup");
  const [catalog, setCatalog] = React.useState<SimulatorQuestion[]>([]);
  const [history, setHistory] = React.useState<AttemptHistory[]>([]);
  const [rankProfile, setRankProfile] = React.useState<RankProfile | null>(null);
  const [leaderboard, setLeaderboard] = React.useState<RankProfile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [contest, setContest] = React.useState(routeSearch.contest || "all");
  const [subject, setSubject] = React.useState(routeSearch.subject || "all");
  const [board, setBoard] = React.useState(routeSearch.board || "all");
  const [career, setCareer] = React.useState(routeSearch.career || "all");
  const [year, setYear] = React.useState(routeSearch.year || "all");
  const [sourceKind, setSourceKind] = React.useState(routeSearch.source || "all");
  const [limit, setLimit] = React.useState(20);
  const [durationMinutes, setDurationMinutes] = React.useState(30);
  const [startWarningOpen, setStartWarningOpen] = React.useState(false);
  const [warningAccepted, setWarningAccepted] = React.useState(false);
  const [questions, setQuestions] = React.useState<SimulatorQuestion[]>([]);
  const [answers, setAnswers] = React.useState<Record<string, Answer>>({});
  const [flagged, setFlagged] = React.useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  const loadData = React.useCallback(async () => {
    if (authLoading) return;
    setLoading(true);
    setLoadError(null);
    try {
      const [officialResult, curatedResult, historyResult, rankResult, leaderboardResult] =
        await Promise.all([
          supabase
            .from("official_exam_questions")
            .select(
              "id,contest_name,exam_year,career_name,exam_board,subject,item_number,question_text,official_answer,review_note,legal_basis",
            )
            .eq("content_status", "active")
            .neq("official_answer", "X"),
          supabase
            .from("curated_question_catalog")
            .select(
              "id,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,difficulty,legal_basis",
            )
            .eq("content_status", "active"),
          user && user.id !== "demo-user"
            ? supabase
                .from("simulator_attempts")
                .select(
                  "id,title,total_questions,correct_answers,wrong_answers,blank_answers,accuracy,duration_seconds,finished_at",
                )
                .eq("user_id", user.id)
                .order("finished_at", { ascending: false })
                .limit(8)
            : Promise.resolve({ data: [], error: null }),
          user && user.id !== "demo-user"
            ? supabase
                .from("user_rank_profiles")
                .select("user_id,total_points,stars,level_name,completed_simulators,best_accuracy")
                .eq("user_id", user.id)
                .maybeSingle()
            : Promise.resolve({ data: null, error: null }),
          user && user.id !== "demo-user"
            ? supabase.rpc("get_public_leaderboard", { limit_count: 10 })
            : Promise.resolve({ data: [], error: null }),
        ]);
      if (officialResult.error) throw officialResult.error;
      if (curatedResult.error) throw curatedResult.error;
      const official = ((officialResult.data || []) as Array<Record<string, unknown>>).map(
        (row): SimulatorQuestion => ({
          id: String(row["id"]),
          sourceKind: "official",
          contest: String(row["contest_name"]),
          year: Number(row["exam_year"]),
          career: String(row["career_name"]),
          board: String(row["exam_board"]),
          subject: canonicalSubject(String(row["subject"])),
          subtopic: null,
          itemNumber: Number(row["item_number"]),
          text: String(row["question_text"]),
          answer: String(row["official_answer"]) as Answer,
          explanation: String(
            row["review_note"] || "Gabarito definitivo conferido na fonte oficial.",
          ),
          difficulty: null,
          legalBasis: parseLegalBasis(row["legal_basis"]),
        }),
      );
      const curated = ((curatedResult.data || []) as Array<Record<string, unknown>>).map(
        (row): SimulatorQuestion => ({
          id: String(row["id"]),
          sourceKind: "curated",
          contest: String(row["contest_name"]),
          year: Number(row["contest_year"]),
          career: String(row["career_name"]),
          board: String(row["exam_board"]),
          subject: canonicalSubject(String(row["subject"])),
          subtopic: row["subtopic"] ? String(row["subtopic"]) : null,
          itemNumber: null,
          text: String(row["question_text"]),
          answer: String(row["official_answer"]) as Answer,
          explanation: String(row["explanation"]),
          difficulty: row["difficulty"] ? String(row["difficulty"]) : null,
          legalBasis: parseLegalBasis(row["legal_basis"]),
        }),
      );
      setCatalog([...official, ...curated]);
      setHistory((historyResult.data || []) as AttemptHistory[]);
      setRankProfile((rankResult.data || null) as RankProfile | null);
      setLeaderboard((leaderboardResult.data || []) as RankProfile[]);
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Não foi possível carregar o banco de questões.",
      );
    } finally {
      setLoading(false);
    }
  }, [authLoading, user]);

  React.useEffect(() => {
    void loadData();
  }, [loadData]);
  React.useEffect(() => {
    if (stage !== "active" || timeLeft <= 0) return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => Math.max(0, value - 1));
      setElapsedSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage, timeLeft]);
  React.useEffect(() => {
    if (stage === "active" && timeLeft === 0 && startedAt)
      void finishSimulator(true); /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [timeLeft, stage, startedAt]);

  React.useEffect(() => {
    if (stage !== "active") return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [stage]);

  const contests = React.useMemo(
    () =>
      Array.from(new Set(catalog.map((item) => item["contest"]))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [catalog],
  );
  const subjects = React.useMemo(
    () =>
      Array.from(
        new Set(
          catalog
            .filter((item) => contest === "all" || item["contest"] === contest)
            .map((item) => item["subject"]),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [catalog, contest],
  );
  const boards = React.useMemo(
    () =>
      Array.from(new Set(catalog.map((item) => item["board"]))).sort((a, b) => a.localeCompare(b)),
    [catalog],
  );
  const careers = React.useMemo(
    () =>
      Array.from(new Set(catalog.map((item) => item["career"]))).sort((a, b) => a.localeCompare(b)),
    [catalog],
  );
  const years = React.useMemo(
    () => Array.from(new Set(catalog.map((item) => item["year"]))).sort((a, b) => b - a),
    [catalog],
  );
  const available = React.useMemo(
    () =>
      catalog.filter(
        (item) =>
          (contest === "all" || item["contest"] === contest) &&
          (subject === "all" || item["subject"] === subject) &&
          (board === "all" || item["board"] === board) &&
          (career === "all" || item["career"] === career) &&
          (year === "all" || item["year"] === Number(year)) &&
          (sourceKind === "all" || item["sourceKind"] === sourceKind),
      ),
    [catalog, contest, subject, board, career, year, sourceKind],
  );
  const current = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const result = React.useMemo(() => calculateResult(questions, answers), [questions, answers]);

  function startSimulator() {
    if (!available.length) {
      toast.error("Nenhuma questão ativa corresponde aos filtros escolhidos.");
      return;
    }
    setQuestions(shuffle(available).slice(0, Math.min(limit, available.length)));
    setAnswers({});
    setFlagged(new Set());
    setCurrentIndex(0);
    setStartedAt(Date.now());
    setElapsedSeconds(0);
    setTimeLeft(durationMinutes * 60);
    setStage("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelSimulator() {
    const wasEarly = elapsedSeconds < 60;
    setStage("setup");
    setQuestions([]);
    setAnswers({});
    setFlagged(new Set());
    setStartedAt(null);
    setTimeLeft(0);
    setElapsedSeconds(0);
    toast.info(
      wasEarly
        ? "Treino cancelado em menos de 1 minuto. Nenhum dado foi registrado."
        : "Treino cancelado. O resultado não foi registrado nem afetou o ranking.",
    );
  }

  async function finishSimulator(automatic = false) {
    if (!questions.length || saving) return;
    setSaving(true);
    const computed = calculateResult(questions, answers);
    if (user && user.id !== "demo-user") {
      const title = contest === "all" ? "Simulado multidisciplinar" : `Simulado — ${contest}`;
      const { data: attempt, error } = await supabase
        .from("simulator_attempts")
        .insert({
          user_id: user.id,
          title,
          contest_filter: contest === "all" ? null : contest,
          subject_filter: subject === "all" ? null : subject,
          total_questions: questions.length,
          correct_answers: computed.correct,
          wrong_answers: computed.wrong,
          blank_answers: computed.blank,
          accuracy: computed.accuracy,
          duration_seconds: elapsedSeconds,
          time_limit_seconds: durationMinutes * 60,
          finished_at: new Date().toISOString(),
        })
        .select("id")
        .single();
      if (error) toast.error("O resultado foi calculado, mas não pôde ser salvo no histórico.");
      else if (attempt) {
        const rows = questions.map((q, index) => ({
          attempt_id: attempt.id,
          user_id: user.id,
          question_id: q.id,
          question_source: q.sourceKind,
          question_order: index + 1,
          subject: q.subject,
          selected_answer: answers[q.id] || null,
          official_answer: q.answer,
          is_correct: answers[q.id] ? answers[q.id] === q.answer : null,
          was_flagged: flagged.has(q.id),
        }));
        const { error: detailError } = await supabase.from("simulator_responses").insert(rows);
        if (detailError)
          toast.error("O resumo foi salvo, mas houve falha ao detalhar as respostas.");
      }
    }
    setSaving(false);
    setStage("result");
    if (automatic) toast.warning("Tempo encerrado. O simulado foi finalizado automaticamente.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function resetSimulator() {
    setStage("setup");
    setQuestions([]);
    setAnswers({});
    setFlagged(new Set());
    setStartedAt(null);
    void loadData();
  }

  if (loading || authLoading) return <LoadingState />;
  if (loadError) return <ErrorState message={loadError} retry={loadData} />;
  if (stage === "active" && current)
    return (
      <ActiveSimulator
        questions={questions}
        currentIndex={currentIndex}
        current={current}
        answers={answers}
        flagged={flagged}
        timeLeft={timeLeft}
        answeredCount={answeredCount}
        saving={saving}
        setCurrentIndex={setCurrentIndex}
        setAnswers={setAnswers}
        setFlagged={setFlagged}
        finish={finishSimulator}
        cancel={cancelSimulator}
      />
    );
  if (stage === "result")
    return (
      <ResultView
        questions={questions}
        answers={answers}
        result={result}
        elapsed={elapsedSeconds}
        reset={resetSimulator}
      />
    );

  return (
    <div className="space-y-6 pb-6">
      <section className="mock-exam-hero tactical-feature-hero overflow-hidden rounded-2xl p-6 text-white shadow-xl md:p-9">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_.8fr] lg:items-center">
          <div>
            <Badge className="mb-4 border-amber-300/30 bg-amber-300/10 text-amber-100 hover:bg-amber-300/10">
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Sala de simulação
            </Badge>
            <h1 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
              Simulador de prova policial
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
              Treine com questões oficiais e autorais auditadas, receba diagnóstico por disciplina e
              transforme cada erro em uma próxima ação de estudo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <HeroMetric value={catalog.length} label="questões ativas" icon={BookOpenCheck} />
            <HeroMetric value={contests.length} label="concursos" icon={ShieldCheck} />
            <HeroMetric
              value={new Set(catalog.map((i) => i.subject)).size}
              label="disciplinas"
              icon={BarChart3}
            />
            <HeroMetric value={history.length} label="tentativas recentes" icon={History} />
          </div>
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <Card className="command-panel border-0 shadow-lg ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5 text-emerald-600" /> Monte seu treino
            </CardTitle>
            <CardDescription>
              Configure o foco. A seleção usa somente conteúdo com status ativo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Concurso ou carreira">
                <Select
                  value={contest}
                  onValueChange={(v) => {
                    setContest(v);
                    setSubject("all");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os concursos</SelectItem>
                    {contests.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Banca organizadora">
                <Select value={board} onValueChange={setBoard}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as bancas</SelectItem>
                    {boards.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Carreira ou cargo">
                <Select value={career} onValueChange={setCareer}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as carreiras</SelectItem>
                    {careers.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Ano de referência">
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os anos</SelectItem>
                    {years.map((item) => (
                      <SelectItem key={item} value={String(item)}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Origem das questões">
                <Select value={sourceKind} onValueChange={setSourceKind}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Oficiais e autorais</SelectItem>
                    <SelectItem value="official">Provas oficiais</SelectItem>
                    <SelectItem value="curated">Questões autorais auditadas</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Disciplina">
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as disciplinas</SelectItem>
                    {subjects.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Quantidade de questões">
                <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LIMITS.map((i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} questões
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Tempo de prova">
                <Select
                  value={String(durationMinutes)}
                  onValueChange={(v) => setDurationMinutes(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATIONS.map((i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} minutos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold">{available.length} questões disponíveis</p>
                <p className="text-xs text-muted-foreground">
                  Serão sorteadas {Math.min(limit, available.length)} questões sem repetição.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  setWarningAccepted(false);
                  setStartWarningOpen(true);
                }}
                disabled={!available.length}
                className="hero-primary-action gap-2 rounded-lg"
              >
                <Play className="h-4 w-4 fill-current" /> Iniciar simulado
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="command-panel border-0 shadow-lg ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <History className="h-5 w-5 text-blue-600" /> Histórico recente
            </CardTitle>
            <CardDescription>Últimas tentativas registradas no Supabase.</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length ? (
              <div className="space-y-3">
                {history.slice(0, 5).map((i) => (
                  <HistoryRow key={i.id} item={i} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed text-center">
                <Trophy className="mb-3 h-10 w-10 text-muted-foreground/30" />
                <p className="font-semibold">Sua jornada começa aqui</p>
                <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                  Finalize o primeiro simulado para formar sua linha histórica.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-[.7fr_1.3fr]">
        <RankIdentity profile={rankProfile} leaderboard={leaderboard} userId={user?.id} />
        <Leaderboard rows={leaderboard} userId={user?.id} />
      </div>
      <CatalogOverview catalog={catalog} />
      <Dialog open={startWarningOpen} onOpenChange={setStartWarningOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="h-5 w-5 text-emerald-600" /> Compromisso de prova
            </DialogTitle>
            <DialogDescription>
              Leia antes de iniciar. O cronômetro começará imediatamente após a confirmação.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 rounded-xl border bg-muted/30 p-4 text-sm">
            <p className="font-bold">Durante o simulado:</p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>o gabarito e os comentários ficam ocultos até a finalização;</li>
              <li>fechar ou atualizar a página pode encerrar o treino em andamento;</li>
              <li>para cancelar, será necessário digitar a frase de confirmação;</li>
              <li>
                cancelamentos com menos de 1 minuto não são registrados e nunca afetam o ranking.
              </li>
            </ul>
          </div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-3">
            <Checkbox
              checked={warningAccepted}
              onCheckedChange={(value) => setWarningAccepted(value === true)}
            />
            <span className="text-sm">
              Estou preparado e entendo que devo concluir o simulado para registrar meu desempenho.
            </span>
          </label>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStartWarningOpen(false)}>
              Voltar
            </Button>
            <Button
              disabled={!warningAccepted}
              onClick={() => {
                setStartWarningOpen(false);
                startSimulator();
              }}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Play className="mr-2 h-4 w-4" /> Confirmar e iniciar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RankIdentity({
  profile,
  leaderboard,
  userId,
}: {
  profile: RankProfile | null;
  leaderboard: RankProfile[];
  userId?: string | undefined;
}) {
  const position = leaderboard.find((item) => item.user_id === userId)?.rank_position;
  const nextTarget =
    !profile || profile.total_points < 250
      ? 250
      : profile.total_points < 750
        ? 750
        : profile.total_points < 1500
          ? 1500
          : profile.total_points < 3000
            ? 3000
            : 3000;
  const progress = profile
    ? Math.min(100, Math.round((profile.total_points / nextTarget) * 100))
    : 0;
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg ring-1 ring-amber-200 dark:from-amber-950/20 dark:to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Crown className="h-5 w-5 text-amber-600" /> Minha liga
        </CardTitle>
        <CardDescription>Seu perfil competitivo evolui automaticamente.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-3xl font-black">{profile?.level_name || "Aspirante"}</p>
            <p className="text-sm text-muted-foreground">
              {profile?.total_points || 0} pontos ·{" "}
              {position ? `${position}º lugar` : "classificação inicial"}
            </p>
          </div>
          <div className="flex gap-1" aria-label={`${profile?.stars || 1} estrelas`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-6 w-6",
                  star <= (profile?.stars || 1)
                    ? "fill-amber-400 text-amber-500"
                    : "text-amber-200",
                )}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-xs font-semibold">
            <span>Progresso para a próxima estrela</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5 bg-amber-200 [&>div]:bg-amber-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/70 p-3 dark:bg-card">
            <p className="text-xl font-black">{profile?.completed_simulators || 0}</p>
            <p className="text-[11px] text-muted-foreground">simulados concluídos</p>
          </div>
          <div className="rounded-xl bg-white/70 p-3 dark:bg-card">
            <p className="text-xl font-black">{Math.round(profile?.best_accuracy || 0)}%</p>
            <p className="text-[11px] text-muted-foreground">melhor precisão</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Leaderboard({ rows, userId }: { rows: RankProfile[]; userId?: string | undefined }) {
  return (
    <Card className="border-0 shadow-lg ring-1 ring-border/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Trophy className="h-5 w-5 text-amber-500" /> Ranking geral
        </CardTitle>
        <CardDescription>
          Classificação por pontos. Sobrenomes e dados pessoais permanecem protegidos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length ? (
          <div className="space-y-2">
            {rows.map((item) => (
              <div
                key={item.user_id}
                className={cn(
                  "grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-xl border p-3",
                  item.user_id === userId &&
                    "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-black",
                    item.rank_position === 1
                      ? "bg-amber-400 text-white"
                      : item.rank_position === 2
                        ? "bg-slate-300 text-slate-700"
                        : item.rank_position === 3
                          ? "bg-orange-400 text-white"
                          : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.rank_position}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">
                    {item.display_name}
                    {item.user_id === userId ? " (você)" : ""}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.level_name} · {item.completed_simulators} simulados
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black">{item.total_points} pts</p>
                  <div className="flex justify-end gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-3 w-3",
                          star <= item.stars ? "fill-amber-400 text-amber-500" : "text-slate-200",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            O ranking será exibido após os primeiros candidatos concluírem simulados.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CatalogOverview({ catalog }: { catalog: SimulatorQuestion[] }) {
  const group = (key: "board" | "career" | "subject") =>
    Array.from(
      catalog.reduce(
        (map, item) => map.set(item[key], (map.get(item[key]) || 0) + 1),
        new Map<string, number>(),
      ),
    ).sort((a, b) => b[1] - a[1]);
  const sections = [
    { title: "Principais bancas", items: group("board") },
    { title: "Carreiras e cargos", items: group("career") },
    { title: "Disciplinas", items: group("subject") },
  ];
  return (
    <Card className="border-0 shadow-lg ring-1 ring-border/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <BookOpenCheck className="h-5 w-5 text-blue-600" /> Acervo organizado
        </CardTitle>
        <CardDescription>
          Visão do banco ativo por banca, carreira e disciplina. Os números acompanham
          automaticamente a expansão do catálogo.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-muted-foreground">
              {section.title}
            </p>
            <div className="space-y-2">
              {section.items.slice(0, 8).map(([name, count]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2"
                >
                  <span className="truncate text-sm font-semibold">{name}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ActiveSimulator(p: {
  questions: SimulatorQuestion[];
  currentIndex: number;
  current: SimulatorQuestion;
  answers: Record<string, Answer>;
  flagged: Set<string>;
  timeLeft: number;
  answeredCount: number;
  saving: boolean;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, Answer>>>;
  setFlagged: React.Dispatch<React.SetStateAction<Set<string>>>;
  finish: (automatic?: boolean) => Promise<void>;
  cancel: () => void;
}) {
  const {
    questions,
    currentIndex,
    current,
    answers,
    flagged,
    timeLeft,
    answeredCount,
    saving,
    setCurrentIndex,
    setAnswers,
    setFlagged,
    finish,
    cancel,
  } = p;
  const progress = (answeredCount / questions.length) * 100;
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [cancelPhrase, setCancelPhrase] = React.useState("");
  return (
    <div className="space-y-5 pb-8">
      <div className="exam-status-bar sticky top-[82px] z-10 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Simulado em andamento
            </p>
            <p className="font-bold">
              Questão {currentIndex + 1} de {questions.length}
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-black",
              timeLeft < 300
                ? "bg-red-50 text-red-700"
                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
            )}
          >
            <Clock3 className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setCancelPhrase("");
                setCancelOpen(true);
              }}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => void finish()} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Finalizar
            </Button>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Progress value={progress} className="h-2" />
          <span className="whitespace-nowrap text-xs font-semibold">
            {answeredCount}/{questions.length} respondidas
          </span>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <Card className="exam-question-window border-0 shadow-lg ring-1 ring-border/70">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{current.subject}</Badge>
              <Badge variant="secondary">{current.board}</Badge>
              <span className="text-xs text-muted-foreground">
                {current.contest} · {current.year}
                {current.itemNumber ? ` · Item ${current.itemNumber}` : ""}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-7 p-6 md:p-9">
            <p className="text-lg font-medium leading-8 md:text-xl">{current.text}</p>
            <div className="rounded-2xl border bg-muted/20 p-5">
              <p className="mb-4 text-sm font-bold">
                {isCebraspeStyle(current.board)
                  ? "Julgue o item:"
                  : "Assinale a alternativa correta:"}
              </p>
              <RadioGroup
                value={answers[current.id] || ""}
                onValueChange={(v) => setAnswers((old) => ({ ...old, [current.id]: v as Answer }))}
                className={cn(
                  "grid gap-3",
                  isCebraspeStyle(current.board) ? "sm:grid-cols-2" : "sm:grid-cols-5",
                )}
              >
                {answerOptions(current.board).map((option) => (
                  <AnswerOption
                    key={option}
                    value={option}
                    label={
                      isCebraspeStyle(current.board)
                        ? option === "C"
                          ? "Certo"
                          : "Errado"
                        : `Alternativa ${option}`
                    }
                    selected={answers[current.id] === option}
                  />
                ))}
              </RadioGroup>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                className={cn(
                  "gap-2",
                  flagged.has(current.id) && "border-amber-400 bg-amber-50 text-amber-800",
                )}
                onClick={() =>
                  setFlagged((old) => {
                    const next = new Set(old);
                    if (next.has(current.id)) next.delete(current.id);
                    else next.add(current.id);
                    return next;
                  })
                }
              >
                <Flag className={cn("h-4 w-4", flagged.has(current.id) && "fill-current")} />
                {flagged.has(current.id) ? "Marcada para revisão" : "Marcar para revisão"}
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((i) => i + 1)}
                >
                  Próxima
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-fit xl:sticky xl:top-[220px]">
          <CardHeader>
            <CardTitle className="text-base">Mapa da prova</CardTitle>
            <CardDescription>Clique para navegar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "relative flex h-10 items-center justify-center rounded-lg border text-xs font-bold transition",
                    i === currentIndex
                      ? "border-primary bg-primary text-primary-foreground"
                      : answers[q.id]
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : "hover:bg-muted",
                  )}
                >
                  {i + 1}
                  {flagged.has(q.id) && (
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-xs text-muted-foreground">
              <Legend color="bg-primary" label="Questão atual" />
              <Legend color="bg-emerald-400" label="Respondida" />
              <Legend color="bg-amber-500" label="Marcada para revisão" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancelar simulado?</DialogTitle>
            <DialogDescription>
              O resultado não será salvo nem afetará suas questões, estrelas ou posição no ranking.
              Para confirmar, digite exatamente:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-lg bg-red-50 p-3 text-center font-mono text-sm font-black text-red-700">
              CANCELAR SIMULADO
            </div>
            <Input
              value={cancelPhrase}
              onChange={(event) => setCancelPhrase(event.target.value)}
              placeholder="Digite a frase de confirmação"
              autoComplete="off"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Continuar prova
            </Button>
            <Button
              variant="destructive"
              disabled={cancelPhrase.trim().toUpperCase() !== "CANCELAR SIMULADO"}
              onClick={() => {
                setCancelOpen(false);
                cancel();
              }}
            >
              Cancelar definitivamente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ResultView({
  questions,
  answers,
  result,
  elapsed,
  reset,
}: {
  questions: SimulatorQuestion[];
  answers: Record<string, Answer>;
  result: ReturnType<typeof calculateResult>;
  elapsed: number;
  reset: () => void;
}) {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <div className="space-y-6 pb-8">
      <section className="mock-result-hero tactical-feature-hero rounded-2xl p-7 text-white shadow-xl md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge className="mb-3 bg-white/10 text-emerald-100 hover:bg-white/10">
              Diagnóstico concluído
            </Badge>
            <h1 className="text-3xl font-black md:text-4xl">Seu desempenho: {result.accuracy}%</h1>
            <p className="mt-2 text-slate-200">{performanceMessage(result.accuracy)}</p>
          </div>
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-emerald-300/20 bg-white/10">
            <span className="text-3xl font-black">
              {result.correct}/{questions.length}
            </span>
          </div>
        </div>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <ResultMetric icon={CheckCircle2} label="Acertos" value={result.correct} tone="emerald" />
        <ResultMetric icon={XCircle} label="Erros" value={result.wrong} tone="red" />
        <ResultMetric icon={AlertTriangle} label="Em branco" value={result.blank} tone="amber" />
        <ResultMetric icon={Gauge} label="Precisão" value={`${result.accuracy}%`} tone="blue" />
        <ResultMetric icon={TimerReset} label="Tempo" value={formatTime(elapsed)} tone="slate" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Desempenho por disciplina
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.bySubject.map((i) => (
              <div key={i.subject}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-semibold">{i.subject}</span>
                  <span
                    className={cn(
                      "font-black",
                      i.accuracy >= 70
                        ? "text-emerald-600"
                        : i.accuracy >= 50
                          ? "text-amber-600"
                          : "text-red-600",
                    )}
                  >
                    {i.accuracy}%
                  </span>
                </div>
                <Progress value={i.accuracy} />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {i.correct} certas · {i.wrong} erradas · {i.blank} em branco
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              Plano pós-simulado
            </CardTitle>
            <CardDescription>Ações sugeridas a partir do resultado real.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.bySubject
              .slice()
              .sort((a, b) => a.accuracy - b.accuracy)
              .slice(0, 3)
              .map((i, n) => (
                <div key={i.subject} className="flex gap-3 rounded-xl border p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                    {n + 1}
                  </span>
                  <div>
                    <p className="font-bold">Reforçar {i.subject}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Revise a teoria dos itens errados, refaça as questões sem consultar o gabarito
                      e programe nova bateria em 24 horas. Precisão atual: {i.accuracy}%.
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Correção comentada</CardTitle>
              <CardDescription>
                Entenda o gabarito e transforme falhas em aprendizado.
              </CardDescription>
            </div>
            <Button onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Novo simulado
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions.map((q, n) => {
            const selected = answers[q.id],
              correct = selected === q.answer,
              isOpen = open === q.id;
            return (
              <div
                key={q.id}
                className={cn(
                  "overflow-hidden rounded-xl border",
                  correct ? "border-emerald-200" : "border-red-200",
                )}
              >
                <button
                  className="flex w-full items-center gap-3 p-4 text-left"
                  onClick={() => setOpen(isOpen ? null : q.id)}
                >
                  {correct ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                    {n + 1}. {q.text}
                  </span>
                  <Badge variant="outline">
                    Você: {selected || "Branco"} · Gabarito: {q.answer}
                  </Badge>
                </button>
                {isOpen && (
                  <div className="border-t bg-muted/20 p-5">
                    <p className="text-sm leading-6">{q.explanation}</p>
                    {q.legalBasis.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {q.legalBasis
                          .filter((s) => s.url)
                          .map((s, i) => (
                            <a
                              key={`${s.url}-${i}`}
                              href={basisHref(s)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-blue-700 underline underline-offset-4"
                            >
                              {s.title || s.lei || "Fonte oficial"}
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function AnswerOption({
  value,
  label,
  selected,
}: {
  value: Answer;
  label: string;
  selected: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition",
        selected ? "border-primary bg-primary/5" : "hover:border-primary/40 hover:bg-muted/40",
      )}
    >
      <RadioGroupItem value={value} />
      <span className="font-bold">
        {value} — {label}
      </span>
    </label>
  );
}
function HeroMetric({
  value,
  label,
  icon: Icon,
}: {
  value: number;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <Icon className="mb-3 h-5 w-5 text-emerald-300" />
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs text-slate-300">{label}</p>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-bold">{label}</span>
      {children}
    </label>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
      {label}
    </div>
  );
}
function HistoryRow({ item }: { item: AttemptHistory }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{item.title}</p>
        <p className="text-[11px] text-muted-foreground">
          {new Date(item.finished_at).toLocaleDateString("pt-BR")} · {item.total_questions} questões
        </p>
      </div>
      <div className="text-right">
        <p
          className={cn(
            "text-lg font-black",
            item.accuracy >= 70
              ? "text-emerald-600"
              : item.accuracy >= 50
                ? "text-amber-600"
                : "text-red-600",
          )}
        >
          {Math.round(item.accuracy)}%
        </p>
        <p className="text-[10px] text-muted-foreground">{item.correct_answers} acertos</p>
      </div>
    </div>
  );
}
function ResultMetric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  tone: "emerald" | "red" | "amber" | "blue" | "slate";
}) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <span className={cn("rounded-xl p-2.5", tones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-2xl font-black">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
function LoadingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader2 className="h-9 w-9 animate-spin text-emerald-600" />
      <p className="mt-3 text-sm text-muted-foreground">Preparando o banco de questões...</p>
    </div>
  );
}
function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <Card className="mx-auto mt-10 max-w-xl">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <h2 className="mt-4 text-xl font-bold">Não foi possível abrir o simulador</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Button className="mt-5" onClick={retry}>
          Tentar novamente
        </Button>
      </CardContent>
    </Card>
  );
}
function calculateResult(questions: SimulatorQuestion[], answers: Record<string, Answer>) {
  let correct = 0,
    wrong = 0,
    blank = 0;
  const map = new Map<string, SubjectResult>();
  questions.forEach((q) => {
    const selected = answers[q.id],
      row = map.get(q.subject) || {
        subject: q.subject,
        total: 0,
        correct: 0,
        wrong: 0,
        blank: 0,
        accuracy: 0,
      };
    row.total++;
    if (!selected) {
      blank++;
      row.blank++;
    } else if (selected === q.answer) {
      correct++;
      row.correct++;
    } else {
      wrong++;
      row.wrong++;
    }
    map.set(q.subject, row);
  });
  const bySubject = Array.from(map.values())
    .map((i) => ({ ...i, accuracy: i.total ? Math.round((i.correct / i.total) * 100) : 0 }))
    .sort((a, b) => b.total - a.total);
  return {
    correct,
    wrong,
    blank,
    accuracy: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    bySubject,
  };
}
function parseLegalBasis(value: unknown): SimulatorQuestion["legalBasis"] {
  return Array.isArray(value) ? (value as SimulatorQuestion["legalBasis"]) : [];
}
// O Planalto marca cada artigo com uma âncora "#artN" (ex.: <a name="art205">
// antes de "Art. 205."), então quando sabemos o artigo dá pra pular a busca
// manual e abrir a página já rolada direto no trecho certo.
function basisHref(basis: { artigo?: string; url?: string }) {
  if (!basis.url) return undefined;
  if (!basis.artigo || basis.url.includes("#")) return basis.url;
  const artigoAnchor = basis.artigo.replace(/[^0-9A-Za-z-]/g, "");
  return artigoAnchor ? `${basis.url}#art${artigoAnchor}` : basis.url;
}
function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}
function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = seconds % 60;
  return h > 0
    ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function performanceMessage(accuracy: number) {
  if (accuracy >= 80)
    return "Excelente domínio. Mantenha revisões espaçadas e avance para baterias mais longas.";
  if (accuracy >= 60)
    return "Boa base. A correção comentada abaixo mostra onde buscar os próximos pontos.";
  if (accuracy >= 40)
    return "Você já tem uma base, mas precisa concentrar a revisão nas disciplinas mais frágeis.";
  return "Use este diagnóstico como ponto de partida: revise a teoria e refaça os itens errados em 24 horas.";
}
function isCebraspeStyle(board: string) {
  return /CEBRASPE|CESPE/i.test(board);
}
function answerOptions(board: string): Answer[] {
  if (isCebraspeStyle(board)) return ["C", "E"];
  if (/IBFC/i.test(board)) return ["A", "B", "C", "D"];
  return ["A", "B", "C", "D", "E"];
}
