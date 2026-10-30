import * as React from "react";
import {
  trainerRouteKey,
  restoreTrainerBookmark,
  type TrainerBookmark,
} from "@/lib/internalNavigation";
import { legalLibraryEntry, questionMatchesLaw } from "@/lib/legalLibrary";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpenCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronDown,
  Flame,
  Lock,
  Loader2,
  RotateCcw,
  SkipForward,
  Sparkles,
  Strikethrough,
  Target,
  X,
  Timer,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { useLockedAnswers } from "@/hooks/useLockedAnswers";
import { questionIdentity } from "@/lib/questionIdentity";
import { fetchQuestionsAnsweredToday, getDailyQuestionLimit } from "@/lib/questionDailyLimit";
import {
  type Answer,
  type Question,
  questionAnswerLabel,
  questionAnswers,
  DIFFICULTY_LABEL,
  DIFFICULTY_STYLE,
  examKey,
  formatDate,
  hasReviewedExplanation,
  isPlaceholderExplanation,
  parseQuestion,
  basisHref,
  shuffled,
  splitExplanation,
} from "@/lib/questionFormat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { canonicalSubject, canonicalCareerName } from "@/lib/subjects";
import { questionTopic, topicFilterLabel } from "@/lib/filterTaxonomy";
import { filterTrainerQuestions, trainerBoard, trainerFilterFacets, trainerPracticeQuestions } from "@/lib/trainerFilters";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { canOpenTrainerLearning, relatedTrainerMaterials } from "@/lib/trainerLearning";
import { TrainerLearningMaterials } from "@/components/dashboard/TrainerLearningMaterials";
import { QuestionSocialPanel } from "@/components/dashboard/QuestionSocialPanel";
import { ReportQuestionButton } from "@/components/dashboard/ReportQuestionButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/question-trainer")({
  head: () => ({
    meta: [
      { title: "Treinador de questões | Norte Concursos" },
      { name: "description", content: "Treine questões de concursos por banca, cargo e disciplina na sua preparação Norte Concursos." },
      { property: "og:title", content: "Treinador de questões | Norte Concursos" },
      { property: "og:description", content: "Sua sessão de questões de concursos por banca, cargo e disciplina." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  validateSearch: (
    search: Record<string, unknown>,
  ): Partial<
    Record<
      | "law"
      | "contest"
      | "board"
      | "career"
      | "year"
      | "subject"
      | "source"
      | "reviewed"
      | "state"
      | "category"
      | "area"
      | "topic"
      | "go"
      | "catalogQuery"
      | "mode"
      | "limit"
      | "reinforce",
      string | undefined
    >
  > => ({
    law: typeof search["law"] === "string" ? search["law"] : undefined,
    contest: typeof search["contest"] === "string" ? search["contest"] : undefined,
    board: typeof search["board"] === "string" ? search["board"] : undefined,
    career: typeof search["career"] === "string" ? search["career"] : undefined,
    year: typeof search["year"] === "string" ? search["year"] : undefined,
    subject: typeof search["subject"] === "string" ? search["subject"] : undefined,
    source: typeof search["source"] === "string" ? search["source"] : undefined,
    reviewed: typeof search["reviewed"] === "string" ? search["reviewed"] : undefined,
    state: typeof search["state"] === "string" ? search["state"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    area: typeof search["area"] === "string" ? search["area"] : undefined,
    topic: typeof search["topic"] === "string" ? search["topic"] : undefined,
    go: typeof search["go"] === "string" ? search["go"] : undefined,
    catalogQuery: typeof search["catalogQuery"] === "string" ? search["catalogQuery"] : undefined,
    mode: typeof search["mode"] === "string" ? search["mode"] : undefined,
    limit: typeof search["limit"] === "string" ? search["limit"] : undefined,
    reinforce: typeof search["reinforce"] === "string" ? search["reinforce"] : undefined,
  }),
  component: QuestionTrainer,
});

type OrderMode = "random" | "exam";

function QuestionTrainer() {
  const routeFilters = Route.useSearch();
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isAdmin } = useAuthStatus();
  const userId = user?.id;
  const dailyLimit = getDailyQuestionLimit(user?.subscription_tier ?? "free", isAdmin);
  const [dailyUsed, setDailyUsed] = React.useState(0);
  const reachedDailyLimit = dailyLimit !== "unlimited" && dailyUsed >= dailyLimit;
  React.useEffect(() => {
    if (!userId || userId === "demo-user") return;
    let active = true;
    void fetchQuestionsAnsweredToday(userId).then((n) => {
      if (active) setDailyUsed(n);
    });
    return () => {
      active = false;
    };
  }, [userId]);
  const isGuest = !authLoading && (!user || userId === "demo-user");
  // O painel/área do cliente é só pra quem tem conta. Visitante nunca fica
  // aqui — é redirecionado pro Desafio Diário público (/desafio-diario),
  // que tem sua própria página fora do /dashboard.
  React.useEffect(() => {
    if (isGuest) navigate({ to: "/desafio-diario", replace: true });
  }, [isGuest, navigate]);
  const canLoad = !authLoading && !isGuest && !!userId && userId !== "demo-user";
  const {
    catalog: fullCatalog,
    loading: catalogLoading,
    error,
  } = useQuestionCatalog(userId, canLoad);
  const law = routeFilters.law;
  const catalog = React.useMemo(
    () => (law === undefined ? fullCatalog : fullCatalog.filter((q) => questionMatchesLaw(q, law))),
    [fullCatalog, law],
  );
  const library = useStudyMaterialList(canLoad);
  const { locked, loading: lockedLoading, markLocked } = useLockedAnswers(userId, canLoad, catalog);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [started, setStarted] = React.useState(false);
  const [contest, setContest] = React.useState(routeFilters.contest || "all");
  const [board, setBoard] = React.useState(trainerBoard(routeFilters.board));
  const [career, setCareer] = React.useState(canonicalCareerName(routeFilters.career) || "all");
  const [year, setYear] = React.useState(routeFilters.year || "all");
  const [appliedExam, setAppliedExam] = React.useState("all");
  const [subject, setSubject] = React.useState(canonicalSubject(routeFilters.subject) || "all");
  const [source, setSource] = React.useState(routeFilters.source || "all");
  const [reviewed, setReviewed] = React.useState(routeFilters.reviewed || "all");
  const [state, setState] = React.useState(routeFilters.state || "all");
  const [category, setCategory] = React.useState(routeFilters.category || "all");
  // Vindos do cronograma: matéria do plano (pode juntar várias do banco) e assunto classificado por palavras-chave.
  const [area, setArea] = React.useState(routeFilters.area || "all");
  const [topic, setTopic] = React.useState(routeFilters.topic || "all");
  const autoStart = React.useRef(routeFilters.go === "1");
  const [difficulty, setDifficulty] = React.useState("all");
  const [limit, setLimit] = React.useState("20");
  const [orderMode, setOrderMode] = React.useState<OrderMode>("random");
  const [includeAnswered, setIncludeAnswered] = React.useState(false);
  const loading = catalogLoading || lockedLoading;
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [struck, setStruck] = React.useState<Answer[]>([]);
  const [saving, setSaving] = React.useState(false);
  const savingRef = React.useRef(false);
  const responseIdRef = React.useRef(crypto.randomUUID());
  const [answered, setAnswered] = React.useState(false);
  const [reviewingPast, setReviewingPast] = React.useState(false);
  const [supportNotice, setSupportNotice] = React.useState(false);
  const [savedForStudy, setSavedForStudy] = React.useState(false);
  const [confirmExit, setConfirmExit] = React.useState(false);
  const supportNoticeId = React.useId();
  const [modal, setModal] = React.useState<"help" | "result" | null>(null);
  const [results, setResults] = React.useState<("ok" | "err" | "skipped")[]>([]);
  const [startedAt, setStartedAt] = React.useState(Date.now());
  const [pausedAt, setPausedAt] = React.useState<number | null>(null);
  const routeKey = trainerRouteKey(routeFilters);
  const pendingRestore = React.useRef(false);
  const restoredSelection = React.useRef<string | null>(null);
  const bookmarkRef = React.useRef<{ userId: string; value: TrainerBookmark } | null>(null);
  bookmarkRef.current =
    userId && started
      ? {
          userId,
          value: {
            version: 1,
            savedAt: Date.now(),
            route: routeKey,
            questions: questions.map(({ id, source, table }) => ({ id, source, table })),
            index,
            selected,
            struck,
            results,
            startedAt,
            filters: {
              contest,
              board,
              career,
              year,
              appliedExam,
              subject,
              source,
              reviewed,
              state,
              category,
              area,
              topic,
              difficulty,
              limit,
              orderMode,
            },
          },
        }
      : null;
  React.useEffect(
    () => () => {
      const saved = bookmarkRef.current;
      if (!saved) return;
      try {
        sessionStorage.setItem(`trainer-bookmark:${saved.userId}`, JSON.stringify(saved.value));
      } catch {
        /* Storage can be unavailable; navigation must still work. */
      }
    },
    [],
  );
  React.useEffect(() => {
    // A new law link must never reuse a session or filters belonging to the previous law.
    setStarted(false);
    setQuestions([]);
    setResults([]);
    setIndex(0);
    setModal(null);
    setContest(routeFilters.contest || "all");
    setBoard(trainerBoard(routeFilters.board));
    setCareer(canonicalCareerName(routeFilters.career) || "all");
    setYear(routeFilters.year || "all");
    setSubject(canonicalSubject(routeFilters.subject) || "all");
    setSource(routeFilters.source || "all");
    setReviewed(routeFilters.reviewed || "all");
    setState(routeFilters.state || "all");
    setCategory(routeFilters.category || "all");
    setArea(routeFilters.area || "all");
    setTopic(routeFilters.topic || "all");
    setDifficulty("all");
    setAppliedExam("all");
    autoStart.current = routeFilters.go === "1";
    pendingRestore.current = true;
  }, [
    law,
    routeFilters.contest,
    routeFilters.board,
    routeFilters.career,
    routeFilters.year,
    routeFilters.subject,
    routeFilters.source,
    routeFilters.reviewed,
    routeFilters.state,
    routeFilters.category,
    routeFilters.area,
    routeFilters.topic,
    routeFilters.go,
  ]);
  React.useEffect(() => {
    if (!pendingRestore.current || loading || error || !userId) return;
    pendingRestore.current = false;
    try {
      const storageKey = `trainer-bookmark:${userId}`;
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return;
      const restored = restoreTrainerBookmark(JSON.parse(raw), routeKey, catalog);
      if (!restored) return;
      sessionStorage.removeItem(storageKey);
      const b = restored.bookmark;
      setQuestions(restored.questions);
      setIndex(b.index);
      setResults(b.results);
      setSelected(b.selected as Answer | null);
      setStruck(b.struck as Answer[]);
      setStartedAt(b.startedAt);
      setPausedAt(null);
      setStarted(true);
      setModal(null);
      setAnswered(false); // The saved-answer gate is always reconstructed from the database.
      restoredSelection.current = restored.questions[b.index]?.id ?? null;
      const f = b.filters;
      setContest(f.contest);
      setBoard(f.board);
      setCareer(f.career);
      setYear(f.year);
      setAppliedExam(f.appliedExam);
      setSubject(f.subject);
      setSource(f.source);
      setReviewed(f.reviewed);
      setState(f.state);
      setCategory(f.category);
      setArea(f.area);
      setTopic(f.topic);
      setDifficulty(f.difficulty);
      setLimit(f.limit);
      setOrderMode(f.orderMode === "exam" ? "exam" : "random");
      autoStart.current = false;
    } catch {
      /* Corrupt or unavailable storage is never a prerequisite for training. */
    }
  }, [loading, error, userId, routeKey, catalog]);
  const lawNotice =
    law !== undefined ? (
      <aside className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm" role="status">
        <strong>{legalLibraryEntry(law)?.title ?? "Lei não identificada"}</strong>
        <p className="mt-1">
          {catalogLoading
            ? "Conferindo o banco…"
            : `${catalog.length} questões com referência oficial a este diploma.`}{" "}
          O filtro não inclui questões de outras leis automaticamente.
        </p>
        {!catalogLoading && !catalog.length && (
          <p className="mt-2">
            Use os casos resolvidos e flashcards do material enquanto não há questões identificadas
            para esta lei no banco.
          </p>
        )}
        <Link to="/dashboard/question-trainer" search={{}} className="mt-2 inline-block underline">
          Remover o filtro de lei
        </Link>
      </aside>
    ) : null;
  const correct = results.filter((r) => r === "ok").length;
  const wrong = results.filter((r) => r === "err").length;

  // Cada lista mostra só o que existe combinado com os OUTROS filtros já escolhidos,
  const topicOf = React.useMemo(
    () => new Map(catalog.map((q) => [q.id, questionTopic(q)])),
    [catalog],
  );
  const trainingCatalog = React.useMemo(
    () => includeAnswered ? catalog : trainerPracticeQuestions(catalog, "new", locked, new Map()),
    [catalog, includeAnswered, locked],
  );
  const facets = React.useMemo(
    () =>
      trainerFilterFacets(
        trainingCatalog,
        {
          area,
          topic,
          contest,
          board,
          career,
          year,
          appliedExam,
          subject,
          source,
          reviewed,
          difficulty,
          state,
          category,
        },
        topicOf,
      ),
    [
      trainingCatalog,
      area,
      topic,
      contest,
      board,
      career,
      year,
      appliedExam,
      subject,
      source,
      reviewed,
      difficulty,
      state,
      category,
      topicOf,
      trainingCatalog,
    ],
  );
  const choices = React.useMemo(() => {
    const options = (key: keyof typeof facets.counts, selected: string) =>
      unique([...facets.counts[key].keys(), ...(selected !== "all" ? [selected] : [])]);
    return {
      contests: options("contest", contest),
      boards: options("board", board),
      careers: options("career", career),
      years: options("year", year).sort((a, b) => Number(b) - Number(a)),
      subjects: options("subject", subject),
      topics: options("topic", topic),
      states: options("state", state),
      categories: options("category", category),
      exams: options("exam", appliedExam).map(
        (key) => [key, key.split("::").join(" · ")] as [string, string],
      ),
    };
  }, [facets, contest, board, career, year, subject, topic, state, category, appliedExam]);
  const manual =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setAppliedExam("all");
      setter(value);
    };
  const pool = React.useMemo(
    () =>
      filterTrainerQuestions(
        trainingCatalog,
        {
          area,
          topic,
          contest,
          board,
          career,
          year,
          appliedExam,
          subject,
          source,
          reviewed,
          difficulty,
          state,
          category,
        },
        topicOf,
      ),
    [
      trainingCatalog,
      area,
      topic,
      topicOf,
      contest,
      board,
      career,
      year,
      appliedExam,
      subject,
      source,
      reviewed,
      difficulty,
      state,
      category,
    ],
  );
  const startTraining = () => {
    responseIdRef.current = crypto.randomUUID();
    const ordered = orderMode === "random" ? shuffled(pool) : [...pool];
    setQuestions(ordered.slice(0, Number(limit)));
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setSupportNotice(false);
    setStartedAt(Date.now());
    setStarted(true);
  };
  // Veio do cronograma com ?go=1: começa direto, com 10 questões do assunto, assim que houver questões.
  React.useEffect(() => {
    if (!autoStart.current || loading || started || pool.length === 0) return;
    autoStart.current = false;
    responseIdRef.current = crypto.randomUUID();
    setLimit("10");
    const ordered = shuffled(pool).slice(0, 10);
    setQuestions(ordered);
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setSupportNotice(false);
    setStartedAt(Date.now());
    setStarted(true);
  }, [loading, started, pool]);
  const selectAppliedExam = (value: string) => {
    setAppliedExam(value);
    if (value === "all") return;
    const [
      selectedContest = "all",
      selectedCareer = "all",
      selectedBoard = "all",
      selectedYear = "all",
    ] = value.split("::");
    setContest(selectedContest);
    setCareer(selectedCareer);
    setBoard(selectedBoard);
    setYear(selectedYear);
  };

  const question = questions[index];
  const savedQuestionsKey = userId ? `trainer-saved-questions:${userId}` : null;
  React.useEffect(() => {
    if (!savedQuestionsKey || !question) return;
    try {
      const saved = JSON.parse(localStorage.getItem(savedQuestionsKey) || "[]") as string[];
      setSavedForStudy(saved.includes(`${question.source}:${question.id}`));
    } catch {
      setSavedForStudy(false);
    }
  }, [savedQuestionsKey, question?.id, question?.source]);
  const toggleSavedForStudy = () => {
    if (!savedQuestionsKey || !question) return;
    const key = `${question.source}:${question.id}`;
    try {
      const saved = JSON.parse(localStorage.getItem(savedQuestionsKey) || "[]") as string[];
      const nextSaved = saved.includes(key) ? saved.filter((item) => item !== key) : [...saved, key];
      localStorage.setItem(savedQuestionsKey, JSON.stringify(nextSaved));
      setSavedForStudy(nextSaved.includes(key));
      toast.success(nextSaved.includes(key) ? "Questão salva para estudar depois." : "Questão removida dos estudos salvos.");
    } catch {
      toast.error("Não foi possível salvar esta questão agora.");
    }
  };
  // Já respondida antes (nesta sessão ou em qualquer sessão anterior): mostra
  // em modo revisão, sem permitir reenviar. Só rearma quando a questão exibida
  // muda — back/forward dentro da sessão não reconta nem reseta o cronômetro.
  React.useEffect(() => {
    if (!question) return;
    // Enquanto o histórico de respostas ainda está carregando, espera: decidir "não respondida"
    // antes de saber é o que deixava responder de novo e, ao voltar, mostrar como não respondida.
    if (lockedLoading) return;
    const past = locked.get(questionIdentity(question));
    if (past) {
      setSelected(past.selected);
      setAnswered(true);
      setReviewingPast(true);
      setSupportNotice(false);
      setStruck([]);
      setResults((prev) => {
        if (prev[index]) return prev;
        const copy = [...prev];
        copy[index] = past.isCorrect ? "ok" : "err";
        return copy;
      });
    } else {
      if (restoredSelection.current === question.id) {
        restoredSelection.current = null;
        setAnswered(false);
        setReviewingPast(false);
        return;
      }
      setSelected(null);
      setAnswered(false);
      setReviewingPast(false);
      setSupportNotice(false);
      setStruck([]);
      setStartedAt(Date.now());
      setPausedAt(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só deve rodar quando a questão exibida muda (ou quando o histórico termina de carregar)
  }, [index, question?.id, question?.source, lockedLoading]);
  const submit = async () => {
    if (
      !selected ||
      !question ||
      answered ||
      !user ||
      savingRef.current ||
      reachedDailyLimit ||
      lockedLoading
    )
      return;
    savingRef.current = true;
    setSaving(true);
    const isCorrect = selected === question.answer;
    try {
      const { error } = await supabase.from("question_training_responses").upsert(
        {
          id: responseIdRef.current,
          user_id: user.id,
          question_id: question.id,
          question_source: question.source,
          question_table: question.table,
          contest_name: question.contest,
          subject: question.subject,
          selected_answer: selected,
          official_answer: question.answer,
          is_correct: isCorrect,
          // Learning support is available only after this answer is saved.
          asked_for_help: false,
          response_seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
        },
        { onConflict: "id", ignoreDuplicates: true },
      );
      if (error) throw error;
      // A request may have succeeded before a network retry. A duplicate ID must
      // never UPDATE an immutable answer or be credited as a different question.
      const { data: stored, error: verifyError } = await supabase
        .from("question_training_responses")
        .select("id,user_id,question_id,question_source,question_table,selected_answer")
        .eq("id", responseIdRef.current)
        .eq("user_id", user.id)
        .maybeSingle();
      if (verifyError || !stored ||
        stored.question_id !== question.id ||
        stored.question_source !== question.source ||
        stored.question_table !== question.table ||
        stored.selected_answer !== selected) {
        responseIdRef.current = crypto.randomUUID();
        throw new Error("ANSWER_SAVE_NOT_CONFIRMED");
      }
      setAnswered(true);
      setDailyUsed((n) => n + 1);
      markLocked(question, { selected, isCorrect });
      setResults((prev) => {
        const copy = [...prev];
        copy[index] = isCorrect ? "ok" : "err";
        return copy;
      });
      if (!isCorrect) {
        setModal("result");
      }
      // Acertos recebem feedback integrado e persistente no cartão.
      // Não navegar automaticamente: o aluno controla quando quer prosseguir.
    } catch (error) {
      // Never show raw database internals to students. Surface known recoverable causes.
      const code = typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code ?? "")
        : "";
      const detail = typeof error === "object" && error !== null && "details" in error
        ? String((error as { details?: unknown }).details ?? "")
        : "";
      const message = typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message ?? "")
        : "";
      if (detail.includes("NORTE_SESSION_REPLACED")) {
        toast.error("Sua sessão foi substituída por outro login. Entre novamente para continuar.");
      } else if (code === "P0429") {
        toast.error("O limite de questões do seu plano foi atingido. Confira a renovação diária.");
      } else if (message.includes("Question origin is missing or ambiguous")) {
        toast.error("Não foi possível identificar a origem da questão. Atualize a página e tente novamente.");
      } else {
        toast.error("Não foi possível registrar sua resposta. Verifique a conexão e tente novamente.");
      }
      // Keep the selected answer so the learner can retry without losing progress.
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };
  const goTo = (target: number) => {
    if (target < 0 || target > questions.length) return;
    responseIdRef.current = crypto.randomUUID();
    setModal(null);
    setPausedAt(null);
    setIndex(target);
  };
  const next = () => goTo(index + 1);
  const restart = () => {
    responseIdRef.current = crypto.randomUUID();
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setReviewingPast(false);
    setSupportNotice(false);
    setStartedAt(Date.now());
    setQuestions((items) => (orderMode === "random" ? shuffled(items) : [...items]));
  };

  if (authLoading || loading || isGuest)
    return (
      <Center>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>{isGuest ? "Redirecionando…" : "Preparando seu treino…"}</p>
      </Center>
    );
  if (!user)
    return (
      <Center>
        <BrainCircuit className="h-10 w-10 text-primary" />
        <p>Entre na sua conta para treinar e salvar o progresso.</p>
        <Button asChild>
          <Link to="/auth">Entrar</Link>
        </Button>
      </Center>
    );
  if (error)
    return (
      <Center>
        <XCircle className="h-10 w-10 text-destructive" />
        <p>{error}</p>
        <Button asChild variant="outline">
          <Link to="/dashboard/question-bank">Voltar ao banco</Link>
        </Button>
      </Center>
    );
  if (!started)
    return (
      <div className="space-y-4">
        {lawNotice}
        <TrainerSetup
          total={trainingCatalog.length}
          available={pool.length}
          choices={choices}
          facets={facets}
          values={{
            contest,
            board,
            career,
            year,
            appliedExam,
            subject,
            source,
            reviewed,
            difficulty,
            state,
            category,
            area,
            topic,
            limit,
            orderMode,
            includeAnswered,
          }}
          setters={{
            setContest: manual(setContest),
            setBoard: manual(setBoard),
            setCareer: manual(setCareer),
            setYear: manual(setYear),
            setAppliedExam: selectAppliedExam,
            setSubject: manual((value: string) => {
              setSubject(value);
              setTopic("all");
            }),
            setSource: manual(setSource),
            setReviewed: manual(setReviewed),
            setDifficulty: manual(setDifficulty),
            setState: manual(setState),
            setCategory: manual(setCategory),
            setArea: (value: string) => {
              setArea(value);
              setSubject("all");
              setTopic("all");
            },
            setTopic: manual(setTopic),
            setLimit,
            setOrderMode,
            setIncludeAnswered,
          }}
          start={startTraining}
        />
      </div>
    );
  if (!questions.length)
    return (
      <Center>
        <Target className="h-10 w-10 text-primary" />
        <p>Nenhuma questão ativa corresponde aos filtros escolhidos.</p>
        <Button onClick={() => setStarted(false)}>Alterar filtros</Button>
      </Center>
    );
  if (!question)
    return (
      <TrainingResult total={questions.length} correct={correct} wrong={wrong} restart={restart} />
    );

  const isCorrect = selected === question.answer;
  const parsed = parseQuestion(question.text);
  const hasOptions = parsed.options.length > 0;
  const explanation = splitExplanation(question.explanation);
  const relatedMaterials = relatedTrainerMaterials(question, library.data ?? []);
  const supportAvailable = canOpenTrainerLearning(
    // O registro local é atualizado antes do refresh do histórico remoto.
    // Considerar `answered` aqui evita bloquear a explicação logo após o envio.
    answered,
    saving,
    // O salvamento da resposta já foi confirmado; não depender de uma segunda busca de histórico.
    false,
  );
  const openLearning = () => {
    if (!supportAvailable || savingRef.current) {
      setSupportNotice(true);
      return;
    }
    setSupportNotice(false);
    setPausedAt((value) => value ?? Date.now());
    setModal("help");
    if (library.isError) void library.refetch();
  };
  const correctOption = parsed.options.find((option) => option.letter === question.answer);
  const certoErrado = !hasOptions && questionAnswers(question).join("") === "CE";
  const labelFor = (answer: Answer) =>
    hasOptions ? `Alternativa ${answer}` : questionAnswerLabel(answer, question);
  const chooseOption = (letter: Answer) => {
    if (answered || savingRef.current) return;
    setStruck((items) => items.filter((item) => item !== letter));
    setSelected(letter);
  };
  const toggleStrike = (letter: Answer) => {
    if (answered || savingRef.current) return;
    setStruck((items) =>
      items.includes(letter) ? items.filter((item) => item !== letter) : [...items, letter],
    );
    if (selected === letter) setSelected(null);
  };
  return (
    <div className="trainer-session-shell mx-auto max-w-4xl space-y-2.5 pb-4 sm:space-y-4 sm:pb-8">
      {lawNotice}
      {routeFilters.reinforce === "1" && (
        <div className="reinforce-banner">
          <BookOpenCheck className="h-5 w-5 shrink-0" />
          <div>
            <p className="reinforce-banner-title">Exercícios para reforçar o aprendizado</p>
            <p className="reinforce-banner-subtitle">
              Questões de {question.subject} selecionadas a partir do material que você acabou de
              estudar.
            </p>
          </div>
        </div>
      )}
      {reachedDailyLimit && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-md border border-primary/30 bg-primary/10 p-4 text-sm text-foreground"
        >
          <Lock className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Você usou as {dailyLimit} questões de hoje do plano Gratuito. O limite renova amanhã —
            ou{" "}
            <Link to="/dashboard/subscriptions" className="font-semibold text-primary underline">
              mude de plano
            </Link>{" "}
            para responder sem limite diário.
          </span>
        </div>
      )}
      <header className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={() => setStarted(false)}>
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Configuração
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setConfirmExit(true)}>
            Sair do treino
          </Button>
          <Button variant="ghost" size="sm" disabled={index === 0} onClick={() => goTo(index - 1)}>
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Anterior
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={index + 1 >= questions.length}
            onClick={next}
          >
            <SkipForward className="mr-1.5 h-4 w-4" /> Pular
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={savedForStudy ? "secondary" : "outline"} size="sm" onClick={toggleSavedForStudy} disabled={savedForStudy} aria-pressed={savedForStudy}>
            {savedForStudy ? <BookmarkCheck className="mr-1.5 h-4 w-4" /> : <Bookmark className="mr-1.5 h-4 w-4" />}
            {savedForStudy ? "Salva" : "Salvar"}
          </Button>
          <Badge variant="secondary">
            <Flame className="mr-1 h-3.5 w-3.5" /> Treinador
          </Badge>
          <Badge variant="outline">Ranking de questões</Badge>
        </div>
      </header>
      <Card
        className="question-window overflow-hidden border border-border bg-card text-foreground shadow-2xl ring-1 ring-amber-400/15 animate-in fade-in slide-in-from-bottom-3 duration-300"
        key={question.id}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden>
              <i className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <i className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <i className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Treinador de questões
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden />{" "}
            Correção imediata
          </span>
        </div>
        <CardContent className="p-3.5 sm:p-5 md:p-7">
          <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
            <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">
              {question.subject}
            </span>
            <Badge variant="outline">{question.board}</Badge>
            <Badge variant="outline">
              {question.contest} · {question.year}
            </Badge>
            <Badge
              variant="outline"
              className={cn("font-bold", DIFFICULTY_STYLE[question.difficulty])}
            >
              {DIFFICULTY_LABEL[question.difficulty]}
            </Badge>
            <span className="ml-auto">
              <ReportQuestionButton question={question} />
            </span>
          </div>
          {answered && isCorrect && !reviewingPast && (
            <section
              role="status"
              aria-live="polite"
              className="mb-5 overflow-hidden rounded-2xl border border-emerald-500/35 bg-emerald-50/85 shadow-[0_12px_32px_-22px_rgba(5,150,105,0.48)] dark:border-emerald-400/30 dark:bg-emerald-500/10"
            >
              <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
                >
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-300">
                    Resposta confirmada
                  </p>
                  <h3 className="text-lg font-bold tracking-tight text-emerald-950 dark:text-emerald-100 sm:text-xl">
                    Muito bem! Você acertou esta questão.
                  </h3>
                  <p className="text-sm leading-6 text-emerald-900/85 dark:text-emerald-100/85">
                    Sua resposta foi registrada. Confira a explicação e avance no seu ritmo.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-500/15 bg-white/45 px-4 py-3 dark:bg-emerald-950/20 sm:px-5">
                <span className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
                  O feedback continuará aqui até você mudar de questão.
                </span>
                <Button size="sm" onClick={next} className="bg-emerald-700 text-white hover:bg-emerald-800">
                  {index + 1 === questions.length ? "Ver resultado" : "Próxima questão"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </section>
          )}
          {reviewingPast && (
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-200">
              <Lock className="h-3.5 w-3.5 shrink-0" /> Você já respondeu esta questão antes —
              revisão apenas, sem reenvio.
            </div>
          )}
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-none text-foreground sm:text-3xl">
                Questão {index + 1}{" "}
                <span className="text-muted-foreground">de {questions.length}</span>
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {correct} certas · {wrong} erradas
              </p>
            </div>
            <ElapsedTimer startedAt={startedAt} running={!answered && !pausedAt} />
          </div>
          <div
            className="mb-4 flex gap-1 sm:mb-6 sm:gap-1.5"
            role="img"
            aria-label={`Questão ${index + 1} de ${questions.length}`}
          >
            {questions.map((q, i) => (
              <i
                key={q.id}
                className={cn(
                  "h-1.5 min-w-0 flex-1 rounded-full transition-colors",
                  results[i] === "ok" && "bg-emerald-500",
                  results[i] === "err" && "bg-rose-500",
                  !results[i] && i === index && "bg-amber-400",
                  !results[i] && i !== index && "bg-muted",
                )}
              />
            ))}
          </div>
          {parsed.base && (
            <details
              open
              className="mb-3 rounded-lg border bg-muted/40 sm:mb-4 sm:rounded-xl [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer select-none items-center justify-between px-4 py-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                {parsed.baseLabel}
                <span className="text-[10px] font-medium normal-case">mostrar / ocultar</span>
              </summary>
              <div className="max-h-52 overflow-y-auto whitespace-pre-line px-3 pb-3 text-sm leading-6 text-foreground sm:max-h-80 sm:px-4 sm:pb-4 sm:leading-7">
                {parsed.base}
              </div>
            </details>
          )}
          <p className="whitespace-pre-line text-[15px] font-medium leading-6 text-foreground sm:text-base sm:leading-7 md:text-lg">
            {parsed.stem}
          </p>
          <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:mt-5 sm:text-xs">
            {certoErrado ? "Julgue o item" : "Assinale a alternativa correta"}
          </p>
          {hasOptions && (
            <div className="mt-3 space-y-2">
              {parsed.options.map((option) => {
                const isStruck = struck.includes(option.letter);
                const isSelected = selected === option.letter;
                const isRight = answered && option.letter === question.answer;
                const isWrong = answered && isSelected && option.letter !== question.answer;
                return (
                  <div key={option.letter} className="flex items-start gap-2">
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      disabled={answered || saving}
                      onClick={() => chooseOption(option.letter)}
                      className={cn(
                        "group flex flex-1 items-center gap-2 rounded-xl border border-border bg-background p-2.5 text-left text-sm leading-5 transition-all duration-200 hover:border-amber-400/50 hover:bg-amber-400/5 disabled:hover:bg-background sm:gap-3 sm:p-3 sm:leading-6",
                        isStruck && "opacity-50",
                        isSelected &&
                          !answered &&
                          "border-amber-400/70 bg-amber-400/10 ring-4 ring-amber-400/10 hover:bg-amber-400/10",
                        isRight &&
                          "border-emerald-500/70 bg-emerald-500/10 hover:bg-emerald-500/10",
                        isWrong && "border-rose-500/70 bg-rose-500/10 hover:bg-rose-500/10",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[11px] font-bold sm:h-7 sm:w-7 sm:rounded-lg sm:text-xs",
                          isSelected && !answered && "bg-amber-400 text-slate-900",
                          isRight && "bg-emerald-600 text-white",
                          isWrong && "bg-rose-600 text-white",
                        )}
                      >
                        {option.letter}
                      </span>
                      <span className={cn("flex-1", isStruck && "line-through")}>
                        {option.text}
                      </span>
                      {isRight && (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          <Check className="h-3.5 w-3.5" /> Correta
                        </span>
                      )}
                      {isWrong && (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400">
                          <XCircle className="h-3.5 w-3.5" /> Sua resposta
                        </span>
                      )}
                    </button>
                    <Button
                      type="button"
                      variant={isStruck ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
                      disabled={answered || saving}
                      aria-pressed={isStruck}
                      aria-label={
                        isStruck
                          ? `Desfazer risco da alternativa ${option.letter}`
                          : `Riscar alternativa ${option.letter}`
                      }
                      title={isStruck ? "Desfazer risco" : "Riscar alternativa"}
                      onClick={() => toggleStrike(option.letter)}
                    >
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
          <div
            className={cn(
              "mt-3 grid gap-2",
              hasOptions && "hidden",
              questionAnswers(question).length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-5",
            )}
          >
            {(hasOptions ? [] : questionAnswers(question)).map((answer) => (
              <button
                key={answer}
                type="button"
                aria-pressed={selected === answer}
                disabled={answered || saving}
                onClick={() => setSelected(answer)}
                className={cn(
                  "group relative flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:shadow-md disabled:hover:translate-y-0 sm:min-h-16 sm:rounded-xl sm:px-4 sm:text-base",
                  selected === answer &&
                    !answered &&
                    "scale-[1.02] border-amber-400 bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/20 ring-4 ring-amber-400/15 hover:bg-amber-400 hover:text-slate-900",
                  answered &&
                    answer === question.answer &&
                    "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                  answered &&
                    selected === answer &&
                    answer !== question.answer &&
                    "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                    selected === answer &&
                      !answered &&
                      "bg-white text-amber-700 group-hover:bg-white group-hover:text-amber-700",
                  )}
                >
                  {selected === answer && !answered ? <Check className="h-4 w-4" /> : answer}
                </span>
                {labelFor(answer)}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
            {!answered ? (
              <>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="ghost"
                    aria-disabled={!supportAvailable}
                    aria-describedby={supportNotice ? supportNoticeId : undefined}
                    className="text-muted-foreground"
                    onClick={openLearning}
                  >
                    <Lock className="mr-2 h-4 w-4" aria-hidden="true" /> Entender este assunto
                  </Button>
                  <Button variant="outline" onClick={toggleSavedForStudy} disabled={savedForStudy} aria-pressed={savedForStudy}>
                    {savedForStudy ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                    {savedForStudy ? "Salva para estudar" : "Salvar para estudar"}
                  </Button>
                  <Button variant="ghost" onClick={next} disabled={index + 1 >= questions.length}>
                    <SkipForward className="mr-2 h-4 w-4" /> Pular questão
                  </Button>
                </div>
                <Button
                  size="lg"
                  disabled={!selected || saving || reachedDailyLimit}
                  onClick={submit}
                  className="h-11 min-w-44 bg-amber-400 text-slate-900 shadow-[0_8px_24px_-8px_oklch(0.8_0.13_78/0.8)] hover:bg-amber-300 sm:h-12"
                >
                  Confirmar resposta <Check className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={openLearning}>
                  <BookOpenCheck className="mr-2 h-4 w-4" aria-hidden="true" /> Entender este
                  assunto
                </Button>
                <Button
                  size="lg"
                  onClick={next}
                  className="h-11 min-w-44 bg-amber-400 text-slate-900 shadow-[0_8px_24px_-8px_oklch(0.8_0.13_78/0.8)] hover:bg-amber-300 sm:h-12"
                >
                  {index + 1 === questions.length ? "Ver resultado" : "Próxima questão"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {answered && (
            <div className="mt-4 space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4" role="region" aria-label="Explicação da questão">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-black uppercase tracking-wider text-primary">Explicação da questão</p>
                <Button variant="outline" size="sm" onClick={toggleSavedForStudy} disabled={savedForStudy} aria-pressed={savedForStudy}>
                  {savedForStudy ? <BookmarkCheck className="mr-1.5 h-4 w-4" /> : <Bookmark className="mr-1.5 h-4 w-4" />}
                  {savedForStudy ? "Salva" : "Salvar para estudar"}
                </Button>
              </div>
              {!isCorrect && <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">Resposta correta: {labelFor(question.answer)}</p>}
              {isPlaceholderExplanation(explanation.main) ? (
                <p className="text-sm leading-6 text-muted-foreground">Esta questão ainda não tem um comentário detalhado. Consulte os materiais relacionados.</p>
              ) : (
                <p className="whitespace-pre-line text-sm leading-6">{explanation.main}</p>
              )}
              {explanation.example && <p className="text-sm leading-6"><strong>Exemplo:</strong> {explanation.example}</p>}
            </div>
          )}
          {supportNotice && !supportAvailable && !answered && (
            <div
              id={supportNoticeId}
              role="status"
              className="mt-3 flex items-start gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-xs leading-5 text-muted-foreground"
            >
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                {saving
                  ? "Sua resposta está sendo salva. A revisão será liberada em seguida."
                  : "Confirme sua resposta para acessar a explicação, os materiais e os exercícios de revisão."}
              </p>
            </div>
          )}
          {answered && (
            <QuestionSocialPanel questionId={question.id} questionSource={question.source} />
          )}
        </CardContent>
      </Card>
      <Dialog open={confirmExit} onOpenChange={setConfirmExit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sair do treino?</DialogTitle>
            <DialogDescription>
              Seu progresso desta sessão será mantido apenas até você retornar. Deseja realmente sair?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmExit(false)}>Continuar treinando</Button>
            <Button variant="destructive" onClick={() => { setConfirmExit(false); setStarted(false); }}>
              Sair do treino
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={modal !== null && supportAvailable}
        onOpenChange={(open) => {
          if (open) return;
          if (pausedAt) {
            const pausedFor = Date.now() - pausedAt;
            setStartedAt((value) => value + pausedFor);
            setPausedAt(null);
          }
          setModal(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <>
            <DialogHeader>
              <div
                className={cn(
                  "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl sm:mx-0",
                  isCorrect
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
                )}
              >
                {modal === "help" ? <BrainCircuit /> : isCorrect ? <CheckCircle2 /> : <X />}
              </div>
              <DialogTitle>
                {modal === "help"
                  ? "Entenda, revise e fixe"
                  : isCorrect
                    ? "Resposta correta"
                    : "Vamos corrigir este ponto"}
              </DialogTitle>
              <DialogDescription>
                {modal === "help" && (
                  <span className="mb-1 block">
                    Revise o raciocínio e aprofunde o assunto com o conteúdo da plataforma.
                  </span>
                )}
                Você marcou {selected ? labelFor(selected) : "—"}. O gabarito é{" "}
                {labelFor(question.answer)}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {!isCorrect && (
                <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
                  <p className="mb-1 text-xs font-black uppercase tracking-wider text-emerald-700">
                    Resposta correta
                  </p>
                  <p className="text-sm font-bold">{labelFor(question.answer)}</p>
                  {correctOption && <p className="mt-1 text-sm leading-6">{correctOption.text}</p>}
                </div>
              )}
              {isPlaceholderExplanation(explanation.main) ? (
                <p className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Esta questão ainda não tem um comentário detalhado. Consulte as fontes e os
                  materiais relacionados abaixo, quando disponíveis.
                </p>
              ) : (
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="mb-1 text-xs font-black uppercase tracking-wider text-primary">
                    Comentário da questão
                  </p>
                  <p className="text-sm leading-6">{explanation.main}</p>
                </div>
              )}
              {explanation.example && (
                <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:bg-amber-950/30">
                  <p className="mb-1 text-xs font-black uppercase tracking-wider text-amber-700">
                    Exemplo do dia a dia
                  </p>
                  <p className="text-sm leading-6">{explanation.example}</p>
                </div>
              )}
              {question.checkedAt && question.legalBasis.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Vigência conferida na fonte oficial em {formatDate(question.checkedAt)}.
                </p>
              )}
              {question.legalBasis.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Fontes oficiais vinculadas
                  </p>
                  <div className="space-y-2">
                    {question.legalBasis.map((basis, basisIndex) =>
                      basis.url ? (
                        <a
                          key={`${basis.url}-${basisIndex}`}
                          href={basisHref(basis)}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-lg border p-3 text-sm font-medium text-primary hover:bg-muted"
                        >
                          {basis.title || basis.lei || "Fonte oficial"}
                          {basis.artigo ? ` · ${basis.artigo}` : ""}
                        </a>
                      ) : (
                        <div key={basisIndex} className="rounded-lg border p-3 text-sm">
                          {basis.title || basis.lei || "Fonte oficial"}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
              {modal === "help" ? (
                <TrainerLearningMaterials
                  key={question.source + question.id}
                  materials={relatedMaterials}
                  loading={library.isLoading}
                  error={library.isError}
                />
              ) : (
                <Button variant="outline" className="w-full" onClick={openLearning}>
                  <BookOpenCheck className="mr-2 h-4 w-4" /> Revisar com materiais e flashcards
                </Button>
              )}
            </div>
            <DialogFooter>
              {modal === "help" && (
                <Button variant="outline" onClick={() => setModal(null)}>
                  Voltar à questão
                </Button>
              )}
              <Button onClick={next}>
                {index + 1 === questions.length ? "Ver resultado" : "Próxima questão"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type SetupValues = {
  contest: string;
  board: string;
  career: string;
  year: string;
  appliedExam: string;
  subject: string;
  source: string;
  reviewed: string;
  difficulty: string;
  state: string;
  category: string;
  area: string;
  topic: string;
  limit: string;
  orderMode: OrderMode;
  includeAnswered: boolean;
};
type SetupSetters = {
  setContest: (value: string) => void;
  setBoard: (value: string) => void;
  setCareer: (value: string) => void;
  setYear: (value: string) => void;
  setAppliedExam: (value: string) => void;
  setSubject: (value: string) => void;
  setSource: (value: string) => void;
  setReviewed: (value: string) => void;
  setDifficulty: (value: string) => void;
  setState: (value: string) => void;
  setCategory: (value: string) => void;
  setArea: (value: string) => void;
  setTopic: (value: string) => void;
  setLimit: (value: string) => void;
  setOrderMode: (value: OrderMode) => void;
  setIncludeAnswered: (value: boolean) => void;
};

function TrainerSetup({
  total,
  available,
  choices,
  facets,
  values,
  setters,
  start,
}: {
  total: number;
  available: number;
  facets: { counts: Record<string, Map<string, number>>; totals: Record<string, number> };
  choices: {
    contests: string[];
    boards: string[];
    careers: string[];
    years: string[];
    subjects: string[];
    topics: string[];
    states: string[];
    categories: string[];
    exams: Array<[string, string]>;
  };
  values: SetupValues;
  setters: SetupSetters;
  start: () => void;
}) {
  const reset = () => {
    setters.setContest("all");
    setters.setBoard("all");
    setters.setCareer("all");
    setters.setYear("all");
    setters.setAppliedExam("all");
    setters.setSubject("all");
    setters.setSource("all");
    setters.setReviewed("all");
    setters.setDifficulty("all");
    setters.setState("all");
    setters.setCategory("all");
    setters.setArea("all");
    setters.setTopic("all");
    setters.setIncludeAnswered(false);
  };
  return (
    <div className="trainer-setup mx-auto max-w-5xl space-y-2 pb-4 animate-in fade-in duration-300 sm:space-y-3 sm:pb-6">
      <section className="question-trainer-hero tactical-feature-hero overflow-hidden rounded-xl p-3 text-white shadow-xl sm:rounded-2xl sm:p-4 md:p-5">
        <div className="grid gap-3 sm:gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Badge className="mb-1.5 border-amber-300/30 bg-amber-300/10 text-amber-100 hover:bg-amber-300/10">
              <BrainCircuit className="mr-1.5 h-3.5 w-3.5" /> Treinamento de precisão
            </Badge>
            <h1 className="text-xl font-black leading-tight sm:text-2xl">
              Monte sua sessão de questões
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 sm:rounded-xl sm:px-4 sm:py-3">
              <p className="text-xl font-black sm:text-2xl">{total}</p>
              <p className="text-[10px] text-slate-300">questões ativas</p>
            </div>
            <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 sm:rounded-xl sm:px-4 sm:py-3">
              <p className="text-xl font-black text-amber-200 sm:text-2xl">{available}</p>
              <p className="text-[10px] text-slate-300">na seleção</p>
            </div>
          </div>
        </div>
      </section>
      <Card className="command-panel border-0 shadow-lg ring-1 ring-border/70">
        <CardContent className="p-3 sm:p-4 md:p-5">
          <div className="mb-2 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 sm:h-11 sm:w-11">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black">Filtros do treino</h2>
            </div>
          </div>
          {values.area !== "all" && (
            <p className="mb-3 flex flex-wrap items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold">
              Filtro do seu cronograma: {values.area}
              <button
                type="button"
                className="underline"
                onClick={() => {
                  setters.setArea("all");
                  setters.setTopic("all");
                }}
              >
                limpar
              </button>
            </p>
          )}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
            <TrainerFilter
              counts={facets.counts["board"]}
              allCount={facets.totals["board"]}
              label="Banca"
              value={values.board}
              setValue={setters.setBoard}
              options={choices.boards}
            />
            <TrainerFilter
              counts={facets.counts["subject"]}
              allCount={facets.totals["subject"]}
              label="Disciplina"
              value={values.subject}
              setValue={setters.setSubject}
              options={choices.subjects}
            />
            <TrainerFilter
              counts={facets.counts["topic"]}
              allCount={facets.totals["topic"]}
              label="Assunto"
              value={values.topic}
              setValue={setters.setTopic}
              options={choices.topics}
              labels={Object.fromEntries(
                choices.topics.map((value) => [value, topicFilterLabel(value)]),
              )}
              allLabel="Todos os assuntos"
            />
            <TrainerFilter
              counts={facets.counts["difficulty"]}
              allCount={facets.totals["difficulty"]}
              label="Dificuldade"
              value={values.difficulty}
              setValue={setters.setDifficulty}
              options={["fácil", "média", "difícil"]}
              labels={{ fácil: "Fácil", média: "Média", difícil: "Difícil" }}
            />
            <TrainerFilter
              label="Quantidade"
              value={values.limit}
              setValue={setters.setLimit}
              options={["5", "10", "20", "30", "50"]}
              allLabel="Quantidade"
              hideAll
            />
            <label className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Ordem das questões
              </span>
              <Select
                value={values.orderMode}
                onValueChange={(value) => setters.setOrderMode(value as OrderMode)}
              >
                <SelectTrigger className="h-9 bg-background sm:h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Aleatório inteligente</SelectItem>
                  <SelectItem value="exam">Ordem do acervo</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>
          <details className="trainer-more group mt-3 rounded-lg border bg-muted/20 px-3 py-2 open:bg-muted/30">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-black uppercase tracking-wider text-muted-foreground [&::-webkit-details-marker]:hidden">
              Mais filtros
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
            <TrainerFilter
              counts={facets.counts["contest"]}
              allCount={facets.totals["contest"]}
              label="Concurso"
              value={values.contest}
              setValue={setters.setContest}
              options={choices.contests}
            />
            <TrainerFilter
              counts={facets.counts["career"]}
              allCount={facets.totals["career"]}
              label="Carreira ou cargo"
              value={values.career}
              setValue={setters.setCareer}
              options={choices.careers}
            />
            <TrainerFilter
              counts={facets.counts["state"]}
              allCount={facets.totals["state"]}
              label="Estado"
              value={values.state}
              setValue={setters.setState}
              options={choices.states}
            />
            <TrainerFilter
              counts={facets.counts["category"]}
              allCount={facets.totals["category"]}
              label="Categoria"
              value={values.category}
              setValue={setters.setCategory}
              options={choices.categories}
            />
            <TrainerFilter
              counts={facets.counts["year"]}
              allCount={facets.totals["year"]}
              label="Ano"
              value={values.year}
              setValue={setters.setYear}
              options={choices.years}
            />
            <TrainerFilter
              counts={facets.counts["exam"]}
              allCount={facets.totals["exam"]}
              label="Prova aplicada"
              value={values.appliedExam}
              setValue={setters.setAppliedExam}
              options={choices.exams.map(([value]) => value)}
              labels={Object.fromEntries(choices.exams)}
            />
            <TrainerFilter
              counts={facets.counts["source"]}
              allCount={facets.totals["source"]}
              label="Origem"
              value={values.source}
              setValue={setters.setSource}
              options={["official", "curated", "personal"]}
              labels={{
                official: "Provas oficiais",
                curated: "Questões autorais",
                personal: "Meu caderno",
              }}
            />
            <TrainerFilter
              counts={facets.counts["reviewed"]}
              allCount={facets.totals["reviewed"]}
              label="Explicação didática"
              value={values.reviewed}
              setValue={setters.setReviewed}
              options={["reviewed"]}
              labels={{ reviewed: "Com explicação e exemplo do dia a dia" }}
              allLabel="Todas as questões"
            />
            <label className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 sm:col-span-2 lg:col-span-3">
              <input
                type="checkbox"
                checked={values.includeAnswered}
                onChange={(event) => setters.setIncludeAnswered(event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              <span>
                <span className="block text-sm font-bold">Incluir questões já respondidas</span>
                <span className="block text-xs text-muted-foreground">
                  Exibe questões anteriores para revisão. Elas continuarão bloqueadas para novo envio.
                </span>
              </span>
            </label>
            </div>
          </details>
          <div className="mt-3 flex flex-col gap-2 rounded-xl border bg-muted/30 p-2.5 sm:flex-row sm:items-center sm:justify-between sm:p-3">
            <div>
              <p className="font-black">
                {Math.min(available, Number(values.limit))} questões serão usadas
              </p>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2 sm:flex">
              <Button variant="outline" size="sm" onClick={reset} className="sm:h-10 sm:px-4">
                Limpar filtros
              </Button>
              <Button
                disabled={!available}
                onClick={start}
                className="hero-primary-action h-9 sm:h-10"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Iniciar treinamento
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TrainerFilter({
  label,
  value,
  setValue,
  options,
  labels,
  allLabel = "Todos",
  hideAll = false,
  counts,
  allCount,
}: {
  counts?: Map<string, number> | undefined;
  allCount?: number | undefined;
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
  allLabel?: string;
  hideAll?: boolean;
}) {
  return (
    <label className="space-y-1">
      <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="h-9 bg-background sm:h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {!hideAll && (
            <SelectItem value="all">
              {allLabel}
              {allCount !== undefined ? ` (${allCount.toLocaleString("pt-BR")})` : ""}
            </SelectItem>
          )}
          {options
            .filter((option) => !counts || (counts.get(option) ?? 0) > 0 || option === value)
            .map((option) => (
              <SelectItem key={option} value={option}>
                {labels?.[option] || option}
                {counts ? ` (${(counts.get(option) ?? 0).toLocaleString("pt-BR")})` : ""}
                {hideAll ? " questões" : ""}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "pt-BR", { numeric: true }),
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-4 text-center text-muted-foreground">
      {children}
    </div>
  );
}
function TrainingResult({
  total,
  correct,
  wrong,
  restart,
}: {
  total: number;
  correct: number;
  wrong: number;
  restart: () => void;
}) {
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl items-center">
      <Card className="w-full overflow-hidden text-center shadow-xl">
        <div className="h-2 bg-gradient-to-r from-emerald-500 to-sky-500" />
        <CardContent className="space-y-6 p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Treino concluído
            </p>
            <h1 className="mt-2 text-4xl font-black">{accuracy}%</h1>
            <p className="mt-2 text-muted-foreground">
              {correct} certas · {wrong} erradas · {total} questões
            </p>
          </div>
          <Progress value={accuracy} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={restart}>
              <RotateCcw className="mr-2 h-4 w-4" /> Treinar novamente
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/dashboard/question-bank">Nova seleção</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ElapsedTimer({ startedAt, running }: { startedAt: number; running: boolean }) {
  const [secs, setSecs] = React.useState(0);
  React.useEffect(() => {
    const tick = () => setSecs(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    tick();
    if (!running) return;
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startedAt, running]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <span
      className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-1.5 font-mono text-sm font-semibold tabular-nums text-foreground"
      role="timer"
      aria-label="Tempo nesta questão"
    >
      <Timer className="h-4 w-4 text-amber-400" aria-hidden /> {mm}:{ss}
    </span>
  );
}
