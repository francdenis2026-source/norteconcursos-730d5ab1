import { trainerBoard, isEnemContest } from "@/lib/trainerFilters";
import {
  questionContestValue,
  questionContestOptionLabel,
  selectedQuestionCareer,
} from "@/lib/questionFilterIdentity";
import { needsMissingSupportText } from "@/lib/questionText";
import { filterSimulatorQuestions, simulatorFilterFacets } from "@/lib/simulatorFilters";
import { fetchAllRows, isMissingQuestionTable } from "@/lib/catalog";
import { isEligibleQuestion } from "@/lib/questionFormat";
import { canonicalSubject, canonicalBoard, canonicalCareerName } from "@/lib/subjects";
import React from "react";
import { simulatorClock } from "@/lib/simulatorClock";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { LockedState } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  Lock,
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
import { checkFeatureAccess } from "@/lib/subscriptions.config";
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

import { ENEM_AREAS } from "@/data/enem";
import { enemSimulatorCatalog, enemSimulatorFilters, enemQuestionArea } from "@/lib/enemScope";

export const Route = createFileRoute("/dashboard/mock-exams")({
  validateSearch: (
    search: Record<string, unknown>,
  ): Partial<
    Record<
      | "mode"
      | "area"
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
    mode: search["mode"] === "enem" ? "enem" : undefined,
    area: typeof search["area"] === "string" ? search["area"] : undefined,
    contest: typeof search["contest"] === "string" ? search["contest"] : undefined,
    board: typeof search["board"] === "string" ? search["board"] : undefined,
    career: typeof search["career"] === "string" ? search["career"] : undefined,
    year: typeof search["year"] === "string" ? search["year"] : undefined,
    subject: typeof search["subject"] === "string" ? search["subject"] : undefined,
    source: typeof search["source"] === "string" ? search["source"] : undefined,
    state: typeof search["state"] === "string" ? search["state"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    reviewed: typeof search["reviewed"] === "string" ? search["reviewed"] : undefined,
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
  state: string;
  category: string;
  checkedAt: string | null;
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
  const queryClient = useQueryClient();
  const loadGeneration = React.useRef(0);
  const [showCompetition, setShowCompetition] = React.useState(false);
  const routeSearch = Route.useSearch();
  const isEnemMode =
    routeSearch.mode === "enem" || routeSearch.contest?.trim().toUpperCase() === "ENEM";
  const [enemArea, setEnemArea] = React.useState(routeSearch.area || "all");
  const { user, isLoading: authLoading, isAdmin } = useAuthStatus();
  const hasMockExamAccess =
    isAdmin || checkFeatureAccess(user?.subscription_tier ?? "free", "mockExams").included;
  const [stage, setStage] = React.useState<SimulatorStage>("setup");
  const [catalog, setCatalog] = React.useState<SimulatorQuestion[]>([]);
  const [historyUnavailable, setHistoryUnavailable] = React.useState(false);
  const [history, setHistory] = React.useState<AttemptHistory[]>([]);
  const [rankProfile, setRankProfile] = React.useState<RankProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [contest, setContest] = React.useState(
    isEnemMode ? "ENEM" : questionContestValue(routeSearch.contest || "all"),
  );
  const [subject, setSubject] = React.useState(canonicalSubject(routeSearch.subject) || "all");
  const [board, setBoard] = React.useState(trainerBoard(routeSearch.board));
  const [career, setCareer] = React.useState(
    selectedQuestionCareer(
      routeSearch.career || "all",
      routeSearch.contest || "all",
      routeSearch.year || 0,
    ),
  );
  const [year, setYear] = React.useState(routeSearch.year || "all");
  const [sourceKind, setSourceKind] = React.useState(routeSearch.source || "all");
  const [state, setState] = React.useState(routeSearch.state || "all");
  const [category, setCategory] = React.useState(routeSearch.category || "all");
  const [reviewed, setReviewed] = React.useState(routeSearch.reviewed || "all");
  React.useEffect(() => {
    setEnemArea(ENEM_AREAS.some((a) => a.id === routeSearch.area) ? routeSearch.area! : "all");
    setContest(isEnemMode ? "ENEM" : questionContestValue(routeSearch.contest || "all"));
    setSubject(canonicalSubject(routeSearch.subject) || "all");
    setBoard(trainerBoard(routeSearch.board));
    setCareer(
      selectedQuestionCareer(
        routeSearch.career || "all",
        routeSearch.contest || "all",
        routeSearch.year || 0,
      ),
    );
    setYear(routeSearch.year || "all");
    setSourceKind(routeSearch.source || "all");
    setState(routeSearch.state || "all");
    setCategory(routeSearch.category || "all");
    setReviewed(routeSearch.reviewed || "all");
  }, [
    isEnemMode,
    routeSearch.area,
    routeSearch.contest,
    routeSearch.subject,
    routeSearch.board,
    routeSearch.career,
    routeSearch.year,
    routeSearch.source,
    routeSearch.state,
    routeSearch.category,
    routeSearch.reviewed,
  ]);
  const [limit, setLimit] = React.useState(20);
  const [durationMinutes, setDurationMinutes] = React.useState(30);
  React.useEffect(() => {
    if (!isEnemMode) {
      setLimit((n) => (LIMITS.includes(n) ? n : 20));
      setDurationMinutes((n) => (DURATIONS.includes(n) ? n : 30));
    }
  }, [isEnemMode]);
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
    if (!user || user.id === "demo-user") { setLoading(false); return; }
    const generation = ++loadGeneration.current;
    setLoading(true);
    setLoadError(null);
    try {
      const query = async (
        table: "official_exam_questions" | "curated_question_catalog" | "board_exam_questions",
        fields: string,
      ) => ({
        error: null,
        data: await queryClient.fetchQuery({
          queryKey: ["simulator-catalog", user.id, isEnemMode, table, fields],
          staleTime: 5 * 60_000,
          retry: 1,
          queryFn: () => fetchAllRows<Record<string, unknown>>((from, to) => {
          let request = supabase
            .from(table)
            .select(fields + ",content_status,law_version_checked_at,state,career_category")
            .eq("content_status", "active");
          if (isEnemMode) request = request.eq("contest_name", "ENEM");
          return request.abortSignal(AbortSignal.timeout(20000)).order("id").range(from, to).returns<Record<string, unknown>[]>();
          }),
        }),
      });
      const loadHistory = () => {
        if (!user || user.id === "demo-user") return Promise.resolve({ data: [], error: null });
        let request = supabase
          .from("simulator_attempts")
          .select(
            "id,title,total_questions,correct_answers,wrong_answers,blank_answers,accuracy,duration_seconds,finished_at",
          )
          .eq("user_id", user.id);
        if (isEnemMode) request = request.eq("contest_filter", "ENEM");
        return request.abortSignal(AbortSignal.timeout(8000)).order("finished_at", { ascending: false }).limit(8);
      };
      const [officialResult, curatedResult, boardResult, historyResult] =
        await Promise.all([
          query(
            "official_exam_questions",
            "id,contest_name,exam_year,career_name,exam_board,subject,item_number,question_text,official_answer,review_note,legal_basis,legal_review_required,legal_audit_completed,context_review_required",
          ),
          query(
            "curated_question_catalog",
            "id,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,difficulty,legal_basis",
          ),
          query(
            "board_exam_questions",
            "id,contest_name,exam_year,career_name,board,subject,support_text,stem,options,official_answer,explanation,legal_basis,legal_review_required,needs_visual",
          ).catch((error: unknown) => {
            if (isMissingQuestionTable(error)) return { data: [], error: null };
            throw error;
          }),
          loadHistory(),

        ]);
      if (generation !== loadGeneration.current) return;
      if (officialResult.error) throw officialResult.error;
      if (curatedResult.error) throw curatedResult.error;
      const official = ((officialResult.data || []) as Array<Record<string, unknown>>)
        .filter(isEligibleQuestion)
        .map((row): SimulatorQuestion => ({
          id: String(row["id"]),
          sourceKind: "official",
          contest: String(row["contest_name"]),
          year: Number(row["exam_year"]),
          career: canonicalCareerName(String(row["career_name"] || "Carreira policial")),
          board: canonicalBoard(String(row["exam_board"] || "Não informada")),
          subject: canonicalSubject(String(row["subject"])),
          state: String(row["state"] || ""),
          category: String(row["career_category"] || ""),
          checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
          subtopic: null,
          itemNumber: Number(row["item_number"]),
          text: String(row["question_text"]),
          answer: String(row["official_answer"]) as Answer,
          explanation: String(
            row["review_note"] || "Gabarito definitivo conferido na fonte oficial.",
          ),
          difficulty: null,
          legalBasis: parseLegalBasis(row["legal_basis"]),
        }));
      const curated = ((curatedResult.data || []) as Array<Record<string, unknown>>)
        .filter(isEligibleQuestion)
        .map((row): SimulatorQuestion => ({
          id: String(row["id"]),
          sourceKind: "curated",
          contest: String(row["contest_name"]),
          year: Number(row["contest_year"]),
          career: canonicalCareerName(String(row["career_name"] || "Carreira policial")),
          board: canonicalBoard(String(row["exam_board"] || "Não informada")),
          subject: canonicalSubject(String(row["subject"])),
          state: String(row["state"] || ""),
          category: String(row["career_category"] || ""),
          checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
          subtopic: row["subtopic"] ? String(row["subtopic"]) : null,
          itemNumber: null,
          text: String(row["question_text"]),
          answer: String(row["official_answer"]) as Answer,
          explanation: String(row["explanation"]),
          difficulty: row["difficulty"] ? String(row["difficulty"]) : null,
          legalBasis: parseLegalBasis(row["legal_basis"]),
        }));
      const boardQuestions = boardResult.data
        .map((row): Record<string, unknown> => ({
          ...row,
          context_review_required: row["needs_visual"],
          legal_audit_completed: !row["legal_review_required"] || !!row["law_version_checked_at"],
        }))
        .filter(isEligibleQuestion)
        .map((row): SimulatorQuestion => ({
          id: String(row["id"]),
          sourceKind: "official",
          contest: String(row["contest_name"]),
          year: Number(row["exam_year"]),
          career: canonicalCareerName(String(row["career_name"] || "Carreira policial")),
          board: canonicalBoard(String(row["board"] || "Não informada")),
          subject: canonicalSubject(String(row["subject"])),
          subtopic: null,
          itemNumber: null,
          state: String(row["state"] || ""),
          category: String(row["career_category"] || ""),
          checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
          text: `${row["support_text"] ? "Texto-base:\n" + String(row["support_text"]) + "\n\n" : ""}${String(row["stem"])}\n${Object.entries(
            (row["options"] || {}) as Record<string, string>,
          )
            .map(([letter, text]) => `(${letter}) ${text}`)
            .join("\n")}`,
          answer: String(row["official_answer"]) as Answer,
          explanation: String(
            row["explanation"] || "Gabarito definitivo da banca. Comentário em preparação.",
          ),
          difficulty: null,
          legalBasis: parseLegalBasis(row["legal_basis"]),
        }));
      // simulado vale nota: questões que citam um texto ausente ficam de fora para não prejudicar o candidato
      setCatalog(
        [...official, ...curated, ...boardQuestions].filter(
          (q) =>
            !needsMissingSupportText({
              subject: q.subject,
              text: q.text,
              source: q.sourceKind === "curated" ? "curated" : "official",
            }),
        ),
      );
      setHistoryUnavailable(!!historyResult.error);
      setHistory(
        ((historyResult.data || []) as AttemptHistory[]).filter(
          (item) => !isEnemMode || /ENEM/i.test(item.title),
        ),
      );

    } catch (error) {
      if (generation !== loadGeneration.current) return;
      setLoadError(
        "Não foi possível carregar as questões. Confira sua conexão e tente novamente.",
      );
    } finally {
      if (generation === loadGeneration.current) setLoading(false);
    }
  }, [authLoading, user?.id, isEnemMode, queryClient]);

  React.useEffect(() => {
    void loadData();
    return () => { loadGeneration.current += 1; };
  }, [loadData]);
  React.useEffect(() => {
    if (!showCompetition || !user || isEnemMode) return;
    let active = true;
    void supabase.rpc("my_rank_summary", { _period: "all", _metric: "points" }).abortSignal(AbortSignal.timeout(8000)).maybeSingle().then(({data}) => { if (active) setRankProfile(data as RankProfile | null); });
    return () => { active = false; };
  }, [showCompetition, user?.id, isEnemMode]);
  React.useEffect(() => {
    if (stage !== "active" || !startedAt) return;
    const tick = () => {
      const clock = simulatorClock(startedAt, durationMinutes * 60, Date.now());
      setElapsedSeconds(clock.elapsed);
      setTimeLeft(clock.remaining);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", tick); };
  }, [stage, startedAt, durationMinutes]);
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

  const scopedCatalog = React.useMemo(
    () => (isEnemMode ? enemSimulatorCatalog(catalog, enemArea) : catalog.filter(question => !isEnemContest(question.contest))),
    [catalog, isEnemMode, enemArea],
  );
  const filters = React.useMemo(() => {
    const selected = {
      contest,
      subject,
      board,
      career,
      year,
      source: sourceKind,
      state,
      category,
      reviewed,
    };
    return isEnemMode ? enemSimulatorFilters(selected) : selected;
  }, [contest, subject, board, career, year, sourceKind, state, category, reviewed, isEnemMode]);
  const facets = React.useMemo(
    () => simulatorFilterFacets(scopedCatalog, filters),
    [scopedCatalog, filters],
  );
  const options = (key: keyof typeof facets) =>
    [...facets[key].keys()].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const contests = options("contest");
  const subjects = options("subject");
  const boards = options("board");
  const careers = options("career");
  const years = options("year").sort((a, b) => Number(b) - Number(a));
  const resetChildren = () => {
    setBoard("all");
    setCareer("all");
    setYear("all");
    setSubject("all");
    setState("all");
    setCategory("all");
  };
  const available = React.useMemo(
    () => filterSimulatorQuestions(scopedCatalog, filters),
    [scopedCatalog, filters],
  );
  const current = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const result = React.useMemo(() => calculateResult(questions, answers), [questions, answers]);

  function startSimulator() {
    if (!hasMockExamAccess) {
      toast.error("Simulados completos são um recurso dos planos pagos.");
      return;
    }
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
  if (!user || user.id === "demo-user") return <LockedState image="exam-hall" title="Simulador de provas" description="Entre na sua conta para preparar e acompanhar suas provas cronometradas." />;
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
        durationSeconds={durationMinutes * 60}
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
    <div className="simulator-workspace mx-auto max-w-6xl space-y-6 pb-6">
      <section className="exam-simulator-hero" aria-labelledby="simulator-title">
        <div className="exam-simulator-hero__content">
          <span className="exam-simulator-hero__eyebrow">Preparação em condições de prova</span>
          <h1 id="simulator-title">{isEnemMode ? "Simulador ENEM" : "Simulador de provas"}</h1>
          <p>Pratique a gestão do tempo, marque questões para revisar e confira seu desempenho ao finalizar.</p>
          <span className="exam-simulator-hero__catalog">{scopedCatalog.length.toLocaleString("pt-BR")} questões disponíveis • {new Set(scopedCatalog.map(q => q.subject)).size} disciplinas</span>
          {isEnemMode && <Link to="/dashboard/enem" className="mt-3 inline-block text-sm underline">Voltar à área ENEM</Link>}
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card className="command-panel border-0 shadow-lg ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5 text-emerald-600" /> Configure sua prova
            </CardTitle>
            <CardDescription>
              Configure o foco. A seleção usa somente conteúdo com status ativo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {isEnemMode ? (
                <Field label="Área do conhecimento">
                  <Select
                    value={enemArea}
                    onValueChange={(value) => {
                      setEnemArea(value);
                      setSubject("all");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as áreas do ENEM</SelectItem>
                      {ENEM_AREAS.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              ) : (
                <>
                  <Field label="Concurso ou material">
                    <Select
                      value={contest}
                      onValueChange={(v) => {
                        setContest(v);
                        resetChildren();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os concursos</SelectItem>
                        {contests.map((i) => (
                          <SelectItem key={i} value={i}>
                            {questionContestOptionLabel(i)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Provas são agrupadas por órgão; referências de apostilas, pelo material. Cargo
                      e ano permanecem nos filtros próprios.
                    </p>
                  </Field>
                  <Field label="Banca organizadora">
                    <Select
                      value={board}
                      onValueChange={(value) => {
                        setBoard(value);
                        setCareer("all");
                        setYear("all");
                        setSubject("all");
                      }}
                    >
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
                  <Field label="Cargo">
                    <Select
                      value={career}
                      onValueChange={(value) => {
                        setCareer(value);
                        setYear("all");
                        setSubject("all");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os cargos</SelectItem>
                        {careers.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </>
              )}
            </div>
            <details className="simulator-extra-filters">
              <summary>Refinar a seleção <span>Ano, origem, estado, categoria e explicações</span></summary>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                <Select
                  value={sourceKind}
                  onValueChange={(value) => {
                    setSourceKind(value);
                    setContest(isEnemMode ? "ENEM" : "all");
                    resetChildren();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Provas e materiais de estudo</SelectItem>
                    <SelectItem value="official">Provas oficiais</SelectItem>
                    <SelectItem value="curated">Autorais e repertório de estudo</SelectItem>
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
              {!isEnemMode && (
                <>
                  <Field label="Estado">
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os estados</SelectItem>
                        {options("state").map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Categoria">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {options("category").map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </>
              )}
              <Field label="Comentário didático">
                <Select value={reviewed} onValueChange={setReviewed}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="reviewed">Com exemplo e fontes conferidas</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              </div>
            </details>
            <div className="border-t pt-5">
              <h3 className="mb-3 text-sm font-semibold">Formato da prova</h3>
              <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Quantidade de questões">
                <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(isEnemMode ? [10, 20, 30, 45, 90] : LIMITS).map((i) => (
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
                    {(isEnemMode ? [15, 30, 60, 120, 300, 330] : DURATIONS).map((i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} minutos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold">{available.length} questões disponíveis</p>
                <p className="text-xs text-muted-foreground">
                  Serão sorteadas {Math.min(limit, available.length)} questões sem repetição.
                  {available.length > 0 && ` Tempo médio: ${Math.round(durationMinutes * 60 / Math.min(limit, available.length))} segundos por questão.`}
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  setWarningAccepted(false);
                  setStartWarningOpen(true);
                }}
                disabled={!available.length || !hasMockExamAccess}
                className="hero-primary-action gap-2 rounded-lg"
              >
                <Play className="h-4 w-4 fill-current" /> Iniciar simulado
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setContest(isEnemMode ? "ENEM" : "all"); resetChildren(); setSourceKind("all"); setReviewed("all"); setEnemArea("all"); }}>Limpar filtros</Button>
            {!hasMockExamAccess && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-md border border-primary/30 bg-primary/10 p-4 text-sm text-foreground"
              >
                <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Simulados completos e cronometrados são um recurso dos planos pagos.{" "}
                  <Link
                    to="/dashboard/subscriptions"
                    className="font-semibold text-primary underline"
                  >
                    Veja os planos
                  </Link>
                  .
                </span>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="command-panel border-0 shadow-lg ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <History className="h-5 w-5 text-blue-600" /> Histórico recente
            </CardTitle>
            <CardDescription>Seus últimos simulados concluídos.</CardDescription>
          </CardHeader>
          <CardContent>
            {historyUnavailable ? <p role="status" className="text-sm text-muted-foreground">O histórico está indisponível no momento. Você pode preparar a prova e tentar carregar o histórico novamente depois.</p> : history.length ? (
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
      {!isEnemMode && <Button variant="outline" aria-expanded={showCompetition} onClick={() => setShowCompetition(value => !value)}>{showCompetition ? "Ocultar ranking" : "Consultar ranking e conquistas"}</Button>}
      {!isEnemMode && showCompetition && (
        <div className="grid gap-6 xl:grid-cols-[.7fr_1.3fr]">
          <RankIdentity profile={rankProfile} />
          <Leaderboard userId={user?.id} />
        </div>
      )}
      <details className="simulator-extra-filters"><summary>Explorar o acervo disponível</summary><CatalogOverview catalog={scopedCatalog} enem={isEnemMode} /></details>
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

function RankIdentity({ profile }: { profile: RankProfile | null }) {
  const position = profile?.rank_position;
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

interface RankRow {
  rank_position: number;
  user_id: string;
  display_name: string;
  points: number;
  questions: number;
  accuracy: number;
  stars: number;
  level_name: string;
  is_me: boolean;
}
const PERIODS = [
  ["week", "Semana"],
  ["month", "Mês"],
  ["all", "Geral"],
] as const;
const METRICS = [
  ["points", "Pontos"],
  ["questions", "Questões"],
] as const;

function Leaderboard({ userId }: { userId?: string | undefined }) {
  const [period, setPeriod] = React.useState<(typeof PERIODS)[number][0]>("week");
  const [metric, setMetric] = React.useState<(typeof METRICS)[number][0]>("points");
  const [rows, setRows] = React.useState<RankRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!userId || userId === "demo-user") {
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    void supabase
      .rpc("get_ranking", { _period: period, _metric: metric, _limit: 10 })
      .then(({ data }) => {
        if (!alive) return;
        setRows((data || []) as RankRow[]);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [period, metric, userId]);

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
      active
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground hover:text-foreground",
    );

  return (
    <Card className="border-0 shadow-lg ring-1 ring-border/70">
      <CardHeader className="space-y-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Trophy className="h-5 w-5 text-amber-500" /> Ranking
        </CardTitle>
        <CardDescription>
          Simulados e questões do Treinador valem pontos (+1 por questão, +2 se acertar sem ajuda).
          Só a primeira resposta de cada questão conta. Administradores ficam fora. Sobrenomes ficam
          protegidos.
        </CardDescription>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1.5" role="tablist" aria-label="Período">
            {PERIODS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={period === id}
                className={pill(period === id)}
                onClick={() => setPeriod(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5" role="tablist" aria-label="Ordenar por">
            {METRICS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={metric === id}
                className={pill(metric === id)}
                onClick={() => setMetric(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2
              className="h-5 w-5 animate-spin text-muted-foreground"
              aria-label="Carregando"
            />
          </div>
        ) : rows.length ? (
          <div className="space-y-2">
            {rows.map((item) => (
              <div
                key={item.user_id}
                className={cn(
                  "grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-xl border p-3",
                  item.is_me && "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20",
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
                    {item.is_me ? " (você)" : ""}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.level_name} · {item.accuracy}% de acerto
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black">
                    {metric === "questions" ? `${item.questions} questões` : `${item.points} pts`}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {metric === "questions" ? `${item.points} pts` : `${item.questions} questões`}
                  </p>
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
            Ninguém pontuou neste período ainda. Resolva questões ou faça um simulado para abrir o
            ranking.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CatalogOverview({
  catalog,
  enem = false,
}: {
  catalog: SimulatorQuestion[];
  enem?: boolean;
}) {
  const group = (key: "board" | "career" | "subject") =>
    Array.from(
      catalog.reduce(
        (map, item) => map.set(item[key], (map.get(item[key]) || 0) + 1),
        new Map<string, number>(),
      ),
    ).sort((a, b) => b[1] - a[1]);
  const sections = enem
    ? [{ title: "Disciplinas do ENEM", items: group("subject") }]
    : [
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
          {enem
            ? "Questões do ENEM organizadas por disciplina da área selecionada."
            : "Visão do banco ativo por banca, carreira e disciplina. Os números acompanham automaticamente a expansão do catálogo."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-muted-foreground">
              {section.title}
            </p>
            <div className="space-y-2">
              {section.items.slice(0, enem ? section.items.length : 8).map(([name, count]) => (
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
  durationSeconds: number;
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
    durationSeconds,
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
  const [finishOpen, setFinishOpen] = React.useState(false);
  const examRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    examRef.current?.focus({ preventScroll: true });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);
  const content = (
    <div ref={examRef} tabIndex={-1} className="simulator-exam-expanded" role="region" aria-label="Simulado em andamento" onKeyDown={(event) => {
      if (event.key !== "Tab" || cancelOpen || finishOpen) return;
      const controls = Array.from(examRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [role="radio"]:not([data-disabled]), a[href], [tabindex="0"]') ?? []);
      const first = controls[0], last = controls.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === examRef.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}>
      <div className="simulator-exam-toolbar sticky top-0 z-10 border-b bg-background/95 p-4 backdrop-blur">
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
            <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90" aria-hidden="true">
              <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="3" opacity=".15" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - Math.min(100, timeLeft / durationSeconds * 100)} />
            </svg>
            <span><span className="block text-[10px] font-medium uppercase tracking-wide">Tempo restante</span>{formatTime(timeLeft)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setCancelOpen(true);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={() => setFinishOpen(true)} disabled={saving}>
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
      <div className="simulator-exam-grid grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
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
            <p className="mx-auto max-w-5xl whitespace-pre-wrap text-base font-medium leading-8 md:text-lg">{current.text}</p>
            <div className="rounded-2xl border bg-muted/20 p-5">
              <p className="mb-4 text-sm font-bold">
                {isCebraspeStyle(current.board)
                  ? "Julgue o item:"
                  : "Assinale a alternativa correta:"}
              </p>
              <RadioGroup
                value={answers[current.id] || ""}
                onValueChange={(v) => setAnswers((old) => ({ ...old, [current.id]: v as Answer }))}
                disabled={saving}
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
                  disabled={saving}
                  onClick={() => currentIndex === questions.length - 1 ? setFinishOpen(true) : setCurrentIndex((i) => i + 1)}
                >
                  {currentIndex === questions.length - 1 ? "Revisar e finalizar" : "Próxima"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-fit lg:sticky lg:top-40">
          <CardHeader>
            <CardTitle className="text-base">Mapa da prova</CardTitle>
            <CardDescription>Clique para navegar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid gap-2">
              <Button variant="outline" size="sm" onClick={() => { const index = questions.findIndex(q => !answers[q.id]); if (index >= 0) setCurrentIndex(index); }} disabled={answeredCount === questions.length}>Ir à primeira pendente ({questions.length - answeredCount})</Button>
              <Button variant="outline" size="sm" onClick={() => { const index = questions.findIndex(q => flagged.has(q.id)); if (index >= 0) setCurrentIndex(index); }} disabled={!flagged.size}>Rever marcadas ({flagged.size})</Button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  aria-label={`Questão ${i + 1}, ${answers[q.id] ? "respondida" : "pendente"}${flagged.has(q.id) ? ", marcada para revisão" : ""}`}
                  aria-current={i === currentIndex ? "step" : undefined}
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
      <Dialog open={finishOpen} onOpenChange={setFinishOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Finalizar e conferir o resultado?</DialogTitle><DialogDescription>Depois de finalizar, suas respostas não poderão ser alteradas nesta tentativa.</DialogDescription></DialogHeader>
          <div className="grid grid-cols-3 gap-3 rounded-xl bg-muted p-4 text-center text-sm">
            <div><strong className="block text-xl">{answeredCount}</strong>Respondidas</div>
            <div><strong className="block text-xl">{questions.length - answeredCount}</strong>Em branco</div>
            <div><strong className="block text-xl">{flagged.size}</strong>Marcadas</div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setFinishOpen(false)} disabled={saving}>Continuar prova</Button><Button onClick={() => void finish()} disabled={saving}>{saving ? "Salvando…" : "Finalizar simulado"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancelar simulado?</DialogTitle>
            <DialogDescription>
              O resultado não será salvo nem afetará suas questões, estrelas ou posição no ranking.
              Você pode continuar a prova ou confirmar o cancelamento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Continuar prova
            </Button>
            <Button
              variant="destructive"
              disabled={saving}
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
  return typeof document === "undefined" ? content : createPortal(content, document.body);
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
      <Card><CardContent className="grid gap-4 p-5 sm:grid-cols-3">
        <div><p className="text-sm text-muted-foreground">Conclusão da prova</p><p className="mt-1 text-xl font-bold">{Math.round((result.correct + result.wrong) / questions.length * 100)}% respondida</p></div>
        <div><p className="text-sm text-muted-foreground">Tempo médio por resposta</p><p className="mt-1 text-xl font-bold">{result.correct + result.wrong ? `${Math.round(elapsed / (result.correct + result.wrong))} segundos` : "Sem respostas"}</p></div>
        <div><p className="text-sm text-muted-foreground">Próxima ação</p><p className="mt-1 text-sm font-semibold">{result.wrong ? "Revisar os erros e suas explicações" : result.blank ? "Retomar as questões deixadas em branco" : "Avançar para uma nova sessão"}</p></div>
      </CardContent></Card>
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
    <div className="mx-auto max-w-6xl space-y-6" role="status" aria-label="Carregando simulador" aria-busy="true">
      <Skeleton className="h-52 rounded-2xl" />
      <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Preparando as questões disponíveis para sua prova…</p>
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]"><Skeleton className="h-96 rounded-2xl" /><Skeleton className="h-64 rounded-2xl" /></div>
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
