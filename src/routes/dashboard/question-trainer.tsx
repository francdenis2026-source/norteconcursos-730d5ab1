import { searchQuestionCatalog } from "@/lib/questionBank";
import { trainerSessionSize, catalogSessionQuestions } from "@/lib/trainerSession";
import {
  questionContestValue,
  questionContestOptionLabel,
  selectedQuestionCareer,
} from "@/lib/questionFilterIdentity";
import * as React from "react";
import {
  trainerRouteKey,
  restoreTrainerBookmark,
  type TrainerBookmark,
} from "@/lib/internalNavigation";
import { legalLibraryEntry, questionMatchesLaw } from "@/lib/legalLibrary";
import { createFileRoute, Link, useNavigate, useBlocker } from "@tanstack/react-router";
import {
  PauseCircle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  RefreshCw,
  BrainCircuit,
  Check,
  CheckCircle2,
  Lock,
  Loader2,
  RotateCcw,
  Sparkles,
  Strikethrough,
  Target,
  Timer,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { useLockedAnswers, lockedKey } from "@/hooks/useLockedAnswers";
import { useReinforcement } from "@/hooks/useReinforcement";
import { QuestionSupportText } from "@/components/library/QuestionSupportText";
import { MissingTextNotice } from "@/components/library/MissingTextNotice";
import { needsMissingSupportText, reflowStem } from "@/lib/questionText";
import { idleSeconds, IDLE_PAUSE_SECONDS, startActivityTracking } from "@/lib/activity";
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
import { canonicalSubject } from "@/lib/subjects";
import { questionTopic, topicFilterLabel } from "@/lib/filterTaxonomy";
import {
  filterTrainerQuestions,
  trainerBoard,
  trainerFilterFacets,
  isEnemContest,
  trainerCollectionQuestions,
  trainerPracticeQuestions,
  syllabusQuestions,
} from "@/lib/trainerFilters";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { canOpenTrainerLearning, relatedTrainerMaterials } from "@/lib/trainerLearning";
import { TrainerLearningMaterials } from "@/components/dashboard/TrainerLearningMaterials";
import { QuestionSocialPanel } from "@/components/dashboard/QuestionSocialPanel";
import { ReportQuestionButton } from "@/components/dashboard/ReportQuestionButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/question-trainer")({
  validateSearch: (
    search: Record<string, unknown>,
  ): Partial<
    Record<
      | "syllabus"
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
      | "reinforce"
      | "mode"
      | "appliedExam"
      | "catalogQuery"
      | "limit",
      string | undefined
    >
  > => ({
    syllabus: typeof search["syllabus"] === "string" ? search["syllabus"] : undefined,
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
    reinforce: typeof search["reinforce"] === "string" ? search["reinforce"] : undefined,
    mode: typeof search["mode"] === "string" ? search["mode"] : undefined,
    appliedExam: typeof search["appliedExam"] === "string" ? search["appliedExam"] : undefined,
    catalogQuery: typeof search["catalogQuery"] === "string" ? search["catalogQuery"] : undefined,
    limit:
      typeof search["limit"] === "string" &&
      ["5", "10", "20", "30", "50", "all"].includes(search["limit"])
        ? search["limit"]
        : undefined,
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
  // Questões sem o texto de apoio ficam fora do treino até que o conteúdo esteja disponível.

  const law = routeFilters.law;
  const [contest, setContest] = React.useState(questionContestValue(routeFilters.contest || "all"));
  const collection = isEnemContest(contest) ? "enem" : "contests";
  // Questões de Português que remetem a "o texto" sem o texto de apoio ficam fora do treino até o texto ser cadastrado:
  // sem ele, o aluno não consegue resolver.
  const { catalog, missingSupportText } = React.useMemo(() => {
    const collectionCatalog = trainerCollectionQuestions(
      searchQuestionCatalog(
        syllabusQuestions(fullCatalog, routeFilters.syllabus),
        routeFilters.catalogQuery ?? "",
      ),
      collection,
    );
    const scoped =
      law === undefined
        ? collectionCatalog
        : collectionCatalog.filter((q) => questionMatchesLaw(q, law));
    const usable = scoped.filter((q) => !needsMissingSupportText(q));
    return { catalog: usable, missingSupportText: scoped.length - usable.length };
  }, [fullCatalog, law, collection, routeFilters.syllabus, routeFilters.catalogQuery]);
  const { locked, loading: lockedLoading, markLocked } = useLockedAnswers(userId, canLoad);
  const { reinforced, markReinforced } = useReinforcement(userId, canLoad);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [started, setStarted] = React.useState(false);
  const [practiceMode, setPracticeMode] = React.useState<"new" | "wrong" | "all" | "catalog">(
    routeFilters.mode === "catalog" ? "catalog" : routeFilters.mode === "reforco" ? "wrong" : "new",
  );
  const [sessionReinforce, setSessionReinforce] = React.useState(false);
  const catalogReviewKeys = React.useRef(new Set<string>());
  const [board, setBoard] = React.useState(trainerBoard(routeFilters.board));
  const [career, setCareer] = React.useState(
    selectedQuestionCareer(
      routeFilters.career || "all",
      routeFilters.contest || "all",
      routeFilters.year || 0,
    ),
  );
  const [year, setYear] = React.useState(routeFilters.year || "all");
  const [appliedExam, setAppliedExam] = React.useState(routeFilters.appliedExam || "all");
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
  const [limit, setLimit] = React.useState(routeFilters.limit || "20");
  const [orderMode, setOrderMode] = React.useState<OrderMode>("random");
  const loading = catalogLoading || lockedLoading;
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [struck, setStruck] = React.useState<Answer[]>([]);
  const [eliminationOpen, setEliminationOpen] = React.useState(false);
  const [communityOpen, setCommunityOpen] = React.useState(false);
  const sessionAnswers = React.useRef(new Map<number, { selected: Answer; isCorrect: boolean }>());
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const savingRef = React.useRef(false);
  const responseIdRef = React.useRef(crypto.randomUUID());
  const [answered, setAnswered] = React.useState(false);
  const [reviewingPast, setReviewingPast] = React.useState(false);
  const [supportNotice, setSupportNotice] = React.useState(false);
  const supportNoticeId = React.useId();
  const [modal, setModal] = React.useState<"help" | null>(null);
  const library = useStudyMaterialList(canLoad && answered && modal === "help");
  const [results, setResults] = React.useState<("ok" | "err")[]>([]);
  const [startedAt, setStartedAt] = React.useState(Date.now());
  const [confirmStop, setConfirmStop] = React.useState(false);
  const sessionInProgress = started && questions.length > 0 && index < questions.length;
  const blocker = useBlocker({
    shouldBlockFn: () => sessionInProgress || savingRef.current,
    enableBeforeUnload: () => sessionInProgress || savingRef.current,
    withResolver: true,
  });
  const leaveDialogOpen = confirmStop || blocker.status === "blocked";
  const cancelLeave = () => {
    setConfirmStop(false);
    blocker.reset?.();
  };
  const confirmLeave = () => {
    if (savingRef.current) return;
    if (blocker.status === "blocked") blocker.proceed();
    else {
      setConfirmStop(false);
      setStarted(false);
    }
  };

  // Cronômetro da questão: conta só o tempo ativo (aba visível e aluno interagindo) enquanto a questão está
  // aberta e sem resposta, e recomeça do zero a cada questão. É o tempo gravado como response_seconds.
  const [questionSecs, setQuestionSecs] = React.useState(0);
  React.useEffect(() => startActivityTracking(), []);
  const questionSecsRef = React.useRef(0);
  const routeKey = trainerRouteKey(routeFilters);
  const pendingRestore = React.useRef(false);
  const restoredSelection = React.useRef<string | null>(null);
  const bookmarkRef = React.useRef<{ userId: string; value: TrainerBookmark } | null>(null);
  bookmarkRef.current =
    userId && sessionInProgress
      ? {
          userId,
          value: {
            version: 1,
            practiceMode,
            sessionAttempts: Array.from(sessionAnswers.current, ([index, answer]) => ({
              index,
              ...answer,
            })),
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
    sessionAnswers.current.clear();
    setStarted(false);
    setQuestions([]);
    setResults([]);
    setIndex(0);
    setModal(null);
    setContest(questionContestValue(routeFilters.contest || "all"));
    setBoard(trainerBoard(routeFilters.board));
    setCareer(
      selectedQuestionCareer(
        routeFilters.career || "all",
        routeFilters.contest || "all",
        routeFilters.year || 0,
      ),
    );
    setYear(routeFilters.year || "all");
    setSubject(canonicalSubject(routeFilters.subject) || "all");
    setSource(routeFilters.source || "all");
    setReviewed(routeFilters.reviewed || "all");
    setState(routeFilters.state || "all");
    setCategory(routeFilters.category || "all");
    setArea(routeFilters.area || "all");
    setTopic(routeFilters.topic || "all");
    setDifficulty("all");
    setAppliedExam(routeFilters.appliedExam || "all");
    setLimit(routeFilters.limit || "20");
    setPracticeMode(
      routeFilters.mode === "catalog"
        ? "catalog"
        : routeFilters.mode === "reforco"
          ? "wrong"
          : "new",
    );
    autoStart.current = routeFilters.go === "1";
    pendingRestore.current = true;
  }, [
    law,
    routeFilters.syllabus,
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
    routeFilters.mode,
    routeFilters.appliedExam,
    routeFilters.catalogQuery,
    routeFilters.limit,
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
      sessionAnswers.current = new Map(
        (b.sessionAttempts ?? []).map(({ index, ...answer }) => [index, answer]),
      );
      catalogReviewKeys.current = new Set(locked.keys());
      setPracticeMode(
        b.practiceMode ??
          (routeFilters.mode === "catalog"
            ? "catalog"
            : routeFilters.mode === "reforco"
              ? "wrong"
              : "new"),
      );
      setSessionReinforce(
        b.practiceMode
          ? b.practiceMode === "all" || b.practiceMode === "wrong"
          : routeFilters.mode === "reforco",
      );
      setQuestions(restored.questions);
      setIndex(b.index);
      setResults(b.results);
      setSelected(b.selected as Answer | null);
      setStruck(b.struck as Answer[]);
      setStartedAt(b.startedAt);
      setStarted(true);
      setModal(null);
      setAnswered(false); // The saved-answer gate is always reconstructed from the database.
      restoredSelection.current = restored.questions[b.index]?.id ?? null;
      const f = b.filters;
      setContest(questionContestValue(f.contest));
      setBoard(f.board);
      setCareer(selectedQuestionCareer(f.career, f.contest, f.year));
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

  const practiceCatalog = React.useMemo(
    () => trainerPracticeQuestions(catalog, practiceMode, locked, reinforced),
    [catalog, practiceMode, locked, reinforced],
  );
  const changePracticeMode = (mode: "new" | "wrong" | "all" | "catalog") => {
    if (mode === practiceMode) return;
    setPracticeMode(mode);
    setNotice(
      "Os filtros foram preservados. As opções e quantidades agora refletem o modo de prática escolhido.",
    );
  };
  // Cada lista mostra só o que existe combinado com os OUTROS filtros já escolhidos,
  const topicOf = React.useMemo(
    () => new Map(catalog.map((q) => [q.id, questionTopic(q)])),
    [catalog],
  );
  const facets = React.useMemo(
    () =>
      trainerFilterFacets(
        practiceCatalog,
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
      practiceCatalog,
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
        catalog,
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
      catalog,
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
  // Modos de prática. "new": só questões ainda não respondidas (a 1ª resposta é a que conta para ranking e medalhas).
  // "wrong" e "all": reforço de questões já respondidas; as novas tentativas ficam numa tabela própria e não pontuam.
  const [notice, setNotice] = React.useState("");
  const fresh = React.useMemo(
    () => pool.filter((q) => !locked.has(lockedKey(q.source, q.id))),
    [pool, locked],
  );
  const answeredPool = React.useMemo(
    () => pool.filter((q) => locked.has(lockedKey(q.source, q.id))),
    [pool, locked],
  );
  // erro na 1ª tentativa e ainda não recuperado no reforço
  const wrongPending = React.useMemo(
    () =>
      answeredPool.filter((q) => {
        const k = lockedKey(q.source, q.id);
        return locked.get(k)?.isCorrect === false && !reinforced.get(k)?.lastCorrect;
      }),
    [answeredPool, locked, reinforced],
  );
  const recovered = answeredPool.filter((q) => {
    const k = lockedKey(q.source, q.id);
    return locked.get(k)?.isCorrect === false && reinforced.get(k)?.lastCorrect;
  }).length;
  const trainingPool =
    practiceMode === "catalog"
      ? pool
      : practiceMode === "new"
        ? fresh
        : practiceMode === "wrong"
          ? wrongPending
          : answeredPool;
  const dailyRemaining =
    (practiceMode === "new" || practiceMode === "catalog") && dailyLimit !== "unlimited"
      ? Math.max(0, dailyLimit - dailyUsed)
      : undefined;
  const startTraining = () => {
    responseIdRef.current = crypto.randomUUID();
    const orderedPool = orderMode === "random" ? shuffled(trainingPool) : [...trainingPool];
    const ordered =
      practiceMode === "catalog"
        ? catalogSessionQuestions(orderedPool, locked, dailyRemaining)
        : orderedPool;
    if (!ordered.length) {
      setNotice(
        practiceMode === "new"
          ? "Você já respondeu todas as questões deste filtro. Escolha “Reforço” para refazer as que errou."
          : "Não há questões para este modo de reforço neste filtro.",
      );
      return;
    }
    catalogReviewKeys.current = new Set(locked.keys());
    setSessionReinforce(practiceMode === "all" || practiceMode === "wrong");
    const count = trainerSessionSize(
      ordered.length,
      limit,
      practiceMode === "new" ? dailyRemaining : undefined,
    );
    if (!count) {
      setNotice(
        "O limite de novas respostas foi atingido hoje. Você pode revisar questões já respondidas.",
      );
      return;
    }
    setQuestions(ordered.slice(0, count));
    sessionAnswers.current.clear();
    setSaveError("");
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setSupportNotice(false);
    setStartedAt(Date.now());
    setStarted(true);
  };
  // Veio com ?go=1 (cronograma, cursos, leis): começa direto, com 10 questões ainda não respondidas do assunto.
  React.useEffect(() => {
    if (!autoStart.current || loading || started) return;
    if (pool.length === 0) {
      // assunto sem questões catalogadas: treina a matéria inteira em vez de abrir uma tela vazia
      if (topic !== "all") {
        setNotice(
          "Ainda há poucas questões deste assunto específico; o treino usa a matéria inteira.",
        );
        setTopic("all");
      }
      return;
    }
    autoStart.current = false;
    if (trainingPool.length === 0) {
      setNotice(
        practiceMode === "new"
          ? "Você já respondeu todas as questões deste tema. Escolha “Reforço” para refazer as que errou ou outro assunto."
          : "Não há questões para este modo de reforço neste tema.",
      );
      return;
    }
    catalogReviewKeys.current = new Set(locked.keys());
    setSessionReinforce(practiceMode === "all" || practiceMode === "wrong");
    setLimit("10");
    const count = trainerSessionSize(trainingPool.length, 10, dailyRemaining);
    if (!count) {
      setNotice(
        "O limite de novas respostas foi atingido hoje. Você pode revisar questões já respondidas.",
      );
      return;
    }
    responseIdRef.current = crypto.randomUUID();
    setQuestions(shuffled(trainingPool).slice(0, count));
    sessionAnswers.current.clear();
    setSaveError("");
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setSupportNotice(false);
    setStartedAt(Date.now());
    setStarted(true);
  }, [loading, started, pool, trainingPool, practiceMode, topic]);
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
  // Questão sem o texto de apoio (só aparece se o aluno pediu): é marcada e não pontua.
  const noText = !!question && needsMissingSupportText(question);
  const nonScoring =
    sessionReinforce ||
    noText ||
    (practiceMode === "catalog" &&
      !!question &&
      catalogReviewKeys.current.has(lockedKey(question.source, question.id)));
  React.useEffect(() => {
    questionSecsRef.current = 0;
    setQuestionSecs(0);
  }, [startedAt, index, question?.id, question?.source]);
  React.useEffect(() => {
    if (!started || !question || answered || leaveDialogOpen) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible" || idleSeconds() >= IDLE_PAUSE_SECONDS) return;
      questionSecsRef.current += 1;
      setQuestionSecs(questionSecsRef.current);
    }, 1000);
    return () => window.clearInterval(id);
  }, [started, question?.id, question?.source, answered, index, leaveDialogOpen]);
  // Já respondida antes (nesta sessão ou em qualquer sessão anterior): mostra
  // em modo revisão, sem permitir reenviar. Só rearma quando a questão exibida
  // muda — back/forward dentro da sessão não reconta nem reseta o cronômetro.
  React.useEffect(() => {
    if (!question) return;
    // Enquanto o histórico de respostas ainda está carregando, espera: decidir "não respondida"
    // antes de saber é o que deixava responder de novo e, ao voltar, mostrar como não respondida.
    if (lockedLoading) return;
    const past =
      sessionAnswers.current.get(index) ??
      (nonScoring ? undefined : locked.get(lockedKey(question.source, question.id)));
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só deve rodar quando a questão exibida muda (ou quando o histórico termina de carregar)
  }, [index, question?.id, question?.source, lockedLoading, nonScoring]);
  const submit = async () => {
    if (
      !selected ||
      !question ||
      answered ||
      !user ||
      savingRef.current ||
      (reachedDailyLimit && !nonScoring) ||
      lockedLoading
    )
      return;
    savingRef.current = true;
    setSaving(true);
    setSaveError("");
    const isCorrect = selected === question.answer;
    if (nonScoring) {
      // Reforço (ou questão sem texto): guarda o desempenho de estudo, mas não pontua nem consome o limite diário.
      try {
        const { error } = await supabase.from("question_reinforcement_attempts").insert({
          id: responseIdRef.current,
          user_id: user.id,
          question_id: question.id,
          question_source: question.source,
          contest_name: question.contest,
          board: question.board ?? "",
          subject: question.subject,
          selected_answer: selected,
          official_answer: question.answer,
          is_correct: isCorrect,
          response_seconds: Math.max(0, questionSecsRef.current),
        });
        if (
          error &&
          !/PGRST205|42P01|does not exist|schema cache/i.test(
            `${error.code ?? ""} ${error.message}`,
          )
        )
          throw error;
        if (error)
          toast.message(
            "Reforço registrado só nesta sessão: o histórico de reforço ainda não foi habilitado no banco.",
          );
        sessionAnswers.current.set(index, { selected, isCorrect });
        setAnswered(true);
        markReinforced(question.source, question.id, isCorrect);
        setResults((prev) => {
          const copy = [...prev];
          copy[index] = isCorrect ? "ok" : "err";
          return copy;
        });
        setModal(null);
      } catch {
        setSaveError("Não foi possível salvar sua tentativa de reforço. Tente novamente.");
      } finally {
        savingRef.current = false;
        setSaving(false);
      }
      return;
    }
    try {
      const { error } = await supabase.from("question_training_responses").upsert(
        {
          id: responseIdRef.current,
          user_id: user.id,
          question_id: question.id,
          question_source: question.source,
          contest_name: question.contest,
          subject: question.subject,
          selected_answer: selected,
          official_answer: question.answer,
          is_correct: isCorrect,
          // Learning support is available only after this answer is saved.
          asked_for_help: false,
          response_seconds: Math.max(0, questionSecsRef.current),
        },
        { onConflict: "id" },
      );
      if (error) throw error;
      sessionAnswers.current.set(index, { selected, isCorrect });
      setAnswered(true);
      setDailyUsed((n) => n + 1);
      markLocked(question.source, question.id, { selected, isCorrect });
      setResults((prev) => {
        const copy = [...prev];
        copy[index] = isCorrect ? "ok" : "err";
        return copy;
      });
      setModal(null);
    } catch {
      setSaveError("Não foi possível salvar sua resposta. Tente novamente.");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };
  const goTo = (target: number) => {
    if (target < 0 || target > questions.length) return;
    responseIdRef.current = crypto.randomUUID();
    setModal(null);
    setSaveError("");
    setEliminationOpen(false);
    setCommunityOpen(false);
    setIndex(target);
  };
  const next = () => goTo(index + 1);
  const restart = () => {
    responseIdRef.current = crypto.randomUUID();
    sessionAnswers.current.clear();
    setStarted(false);
    setQuestions([]);
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setReviewingPast(false);
    setSupportNotice(false);
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
      <div className="mx-auto max-w-5xl space-y-4">
        <section className="trainer-study-hero" aria-labelledby="trainer-title">
          <div className="trainer-study-hero__content">
            <span className="trainer-study-hero__eyebrow">Prática orientada</span>
            <h1 id="trainer-title">Treinador de questões</h1>
            <p>Escolha o que estudar, responda no seu ritmo e aprenda com a correção.</p>
            <span className="trainer-study-hero__catalog">
              {practiceCatalog.length.toLocaleString("pt-BR")}{" "}
              {practiceMode === "catalog"
                ? "questões do acervo"
                : practiceMode === "new"
                  ? "questões ainda não respondidas"
                  : practiceMode === "wrong"
                    ? "erros pendentes de reforço"
                    : "questões já respondidas"}
            </span>
          </div>
        </section>
        {practiceMode === "catalog" && (
          <div className="rounded-xl border bg-card p-4 text-sm" role="status">
            <p className="font-semibold">
              {pool.length.toLocaleString("pt-BR")} questões na seleção atual
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ajuste disciplina, banca, ano ou assunto abaixo. Questões já respondidas são revisadas
              sem pontuar novamente.
              {dailyRemaining !== undefined
                ? ` Você pode registrar ${dailyRemaining} ${dailyRemaining === 1 ? "nova resposta" : "novas respostas"} hoje; esse limite é aplicado ao montar a sessão.`
                : ""}
            </p>
          </div>
        )}
        {routeFilters.catalogQuery && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3 text-sm">
            <span>
              Busca do acervo: <strong>{routeFilters.catalogQuery}</strong>
            </span>
            <Link
              to="/dashboard/question-trainer"
              search={{ ...routeFilters, catalogQuery: undefined }}
              className="inline-flex min-h-11 items-center font-semibold underline"
            >
              Remover busca
            </Link>
          </div>
        )}
        {routeFilters.syllabus && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-primary/5 p-3 text-sm">
            <span>Questões vinculadas ao assunto escolhido no edital.</span>
            <Link
              to="/dashboard/edital/$topicId"
              params={{ topicId: routeFilters.syllabus }}
              className="font-semibold text-primary underline"
            >
              Voltar ao assunto
            </Link>
          </div>
        )}
        {lawNotice}
        <section
          className="space-y-3 rounded-xl border bg-card p-4 text-sm"
          aria-label="Modo de prática"
        >
          {missingSupportText > 0 && (
            <details className="trainer-quality-note">
              <summary>Questões com conteúdo incompleto ficam fora do treino</summary>
              <p>
                {missingSupportText} questões desta área aguardam texto de apoio. Elas não entram na
                seleção até que o material esteja disponível.
              </p>
            </details>
          )}
          {notice && (
            <p
              className="rounded-lg border border-amber-300 bg-amber-50 p-2 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100"
              role="status"
            >
              {notice}
            </p>
          )}
          <h2 className="text-base font-semibold">1. Escolha seu objetivo</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                [
                  "catalog",
                  "Todas da seleção",
                  `${pool.length} questões, incluindo as já respondidas.`,
                ],
                ["new", "Questões novas", `${fresh.length} ainda não respondidas neste filtro.`],
                [
                  "wrong",
                  "Revisar meus erros",
                  `${wrongPending.length} erros pendentes${recovered ? ` · ${recovered} já recuperados` : ""}. Não pontuam de novo.`,
                ],
                [
                  "all",
                  "Revisar respostas",
                  `${answeredPool.length} já respondidas. Não pontuam de novo.`,
                ],
              ] as const
            ).map(([id, title, sub]) => (
              <label
                key={id}
                className={`cursor-pointer rounded-xl border p-3 ${practiceMode === id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
              >
                <input
                  type="radio"
                  name="practice-mode"
                  className="mr-2"
                  checked={practiceMode === id}
                  onChange={() => changePracticeMode(id)}
                />
                <span className="font-semibold">{title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{sub}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            A primeira resposta registra seu desempenho. Nas revisões, você acompanha o aprendizado
            sem pontuar novamente.
          </p>
        </section>
        <TrainerSetup
          available={
            practiceMode === "catalog"
              ? catalogSessionQuestions(trainingPool, locked, dailyRemaining).length
              : trainingPool.length
          }
          dailyRemaining={practiceMode === "new" ? dailyRemaining : undefined}
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
          }}
          setters={{
            setContest: manual(setContest),
            setBoard: manual(setBoard),
            setCareer: manual(setCareer),
            setYear: manual(setYear),
            setAppliedExam: selectAppliedExam,
            setSubject: (value: string) => {
              setSubject(value);
              setTopic("all");
            },
            setSource: setSource,
            setReviewed: setReviewed,
            setDifficulty: setDifficulty,
            setState: setState,
            setCategory: setCategory,
            setArea: (value: string) => {
              setArea(value);
              setSubject("all");
              setTopic("all");
            },
            setTopic: setTopic,
            setLimit,
            setOrderMode,
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
      <TrainingResult
        total={questions.length}
        correct={correct}
        wrong={wrong}
        restart={restart}
        review={sessionReinforce}
        mixed={practiceMode === "catalog"}
      />
    );

  const isCorrect = selected === question.answer;
  const parsed = parseQuestion(question.text);
  const hasOptions = parsed.options.length > 0;
  const explanation = splitExplanation(question.explanation);
  const relatedMaterials = relatedTrainerMaterials(question, library.data ?? []);
  const supportAvailable = canOpenTrainerLearning(
    answered && locked.has(lockedKey(question.source, question.id)),
    saving,
    lockedLoading,
  );
  const openLearning = () => {
    if (!supportAvailable || savingRef.current) {
      setSupportNotice(true);
      return;
    }
    setSupportNotice(false);
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
      <Dialog
        open={leaveDialogOpen}
        onOpenChange={(open) => {
          if (!open) cancelLeave();
        }}
      >
        <DialogContent
          className="max-w-sm rounded-2xl"
          onEscapeKeyDown={(event) => {
            if (saving) event.preventDefault();
          }}
        >
          <DialogHeader>
            <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PauseCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <DialogTitle>Interromper o treino?</DialogTitle>
            <DialogDescription>
              {saving
                ? "Aguarde enquanto sua resposta é salva."
                : "Você ainda tem questões nesta sessão. As respostas já confirmadas permanecem registradas; a alternativa selecionada só é enviada ao confirmar a resposta."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button onClick={cancelLeave}>Continuar estudando</Button>
            <Button variant="outline" onClick={confirmLeave} disabled={saving}>
              Sair do treino
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {lawNotice}
      {noText && <MissingTextNotice scoring />}
      {(sessionReinforce || (practiceMode === "catalog" && nonScoring && !noText)) && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-sky-300 bg-sky-50 p-3 text-sm text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-100"
        >
          <RefreshCw className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            <strong>Modo reforço.</strong> Esta tentativa fica registrada para você acompanhar sua
            evolução, mas não conta de novo para o ranking, as medalhas nem o limite diário. A sua
            primeira resposta continua sendo a oficial.
          </p>
        </div>
      )}
      {routeFilters.reinforce === "1" && !sessionReinforce && (
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
      {reachedDailyLimit && !nonScoring && (
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
      <header className="trainer-session-toolbar">
        <Button variant="outline" onClick={() => setConfirmStop(true)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Sair do treino
        </Button>
        <span>{sessionReinforce ? "Sessão de revisão" : "Sessão de questões"}</span>
        <Button variant="ghost" disabled={index === 0 || saving} onClick={() => goTo(index - 1)}>
          Questão anterior
        </Button>
      </header>
      <Card
        className="question-window overflow-hidden border border-border bg-card text-foreground shadow-2xl ring-1 ring-amber-400/15 animate-in fade-in slide-in-from-bottom-3 duration-300"
        key={question.id}
      >
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
          {reviewingPast && (
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-200">
              <Lock className="h-3.5 w-3.5 shrink-0" /> Resposta já registrada — revisão sem novo
              envio.
            </div>
          )}
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-none text-foreground sm:text-3xl">
                Questão {index + 1}{" "}
                <span className="text-muted-foreground">de {questions.length}</span>
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {correct} acertos · {wrong} erros
              </p>
            </div>
            {!reviewingPast && <ElapsedTimer seconds={questionSecs} />}
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
              <div className="max-h-64 overflow-y-auto px-3 pb-3 text-foreground sm:max-h-[26rem] sm:px-4 sm:pb-4">
                <QuestionSupportText
                  text={parsed.base}
                  citesLines={/(^|\W)linhas?\s+\d+/i.test(
                    `${parsed.stem} ${parsed.options.map((o) => o.text).join(" ")}`,
                  )}
                />
              </div>
            </details>
          )}
          <p className="whitespace-pre-line text-[15px] font-medium leading-6 text-foreground sm:text-base sm:leading-7 md:text-lg">
            {reflowStem(parsed.stem)}
          </p>
          <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:mt-5 sm:text-xs">
            {certoErrado ? "Julgue o item" : "Assinale a alternativa correta"}
          </p>
          {hasOptions && !answered && (
            <button
              type="button"
              className="trainer-elimination-toggle"
              aria-pressed={eliminationOpen}
              onClick={() => {
                setEliminationOpen((value) => !value);
                setStruck([]);
              }}
            >
              <Strikethrough aria-hidden="true" className="h-4 w-4" />
              {eliminationOpen ? "Ocultar ferramenta de eliminação" : "Eliminar alternativas"}
            </button>
          )}
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
                    {eliminationOpen && !answered && (
                      <Button
                        type="button"
                        variant={isStruck ? "secondary" : "ghost"}
                        size="icon"
                        className="h-[44px] w-[44px] shrink-0"
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
                    )}
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
          {answered && (
            <section
              className={cn("trainer-answer-feedback", isCorrect ? "is-correct" : "is-incorrect")}
              role="status"
              aria-label="Correção da resposta"
            >
              <div className="flex items-center gap-2 font-semibold">
                {isCorrect ? (
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <XCircle aria-hidden="true" className="h-5 w-5" />
                )}
                {isCorrect ? "Resposta correta" : "Resposta incorreta"}
              </div>
              <p>
                Você marcou <strong>{selected ? labelFor(selected) : "—"}</strong>. Gabarito:{" "}
                <strong>{labelFor(question.answer)}</strong>.
              </p>
              {!isPlaceholderExplanation(explanation.main) && (
                <p className="trainer-answer-feedback__comment">
                  {explanation.main.length > 420
                    ? `${explanation.main.slice(0, 420)}…`
                    : explanation.main}
                </p>
              )}
            </section>
          )}
          <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
            {!answered ? (
              <>
                <Button
                  size="lg"
                  disabled={!selected || saving || (reachedDailyLimit && !nonScoring)}
                  onClick={submit}
                  className="h-11 min-w-44 bg-amber-400 text-slate-900 shadow-[0_8px_24px_-8px_oklch(0.8_0.13_78/0.8)] hover:bg-amber-300 sm:h-12"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando resposta…
                    </>
                  ) : (
                    <>
                      Confirmar resposta <Check className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={openLearning}>
                  <BookOpenCheck className="mr-2 h-4 w-4" aria-hidden="true" /> Comentário e
                  materiais
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
          {saveError && (
            <p
              role="alert"
              className="mt-3 rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100"
            >
              {saveError}
            </p>
          )}
          {supportNotice && !supportAvailable && (
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
            <details
              className="trainer-community"
              onToggle={(event) => setCommunityOpen(event.currentTarget.open)}
            >
              <summary>Discussão desta questão</summary>
              {communityOpen && (
                <QuestionSocialPanel questionId={question.id} questionSource={question.source} />
              )}
            </details>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={modal !== null && supportAvailable}
        onOpenChange={(open) => !open && setModal(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <>
            <DialogHeader>
              <div
                className={cn(
                  "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl sm:mx-0",
                  isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
                )}
              >
                <BookOpenCheck aria-hidden="true" />
              </div>
              <DialogTitle>Comentário e materiais</DialogTitle>
              <DialogDescription>
                <span className="mb-1 block">
                  Revise o raciocínio e aprofunde o assunto com o conteúdo da plataforma.
                </span>
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
              <TrainerLearningMaterials
                key={question.source + question.id}
                materials={relatedMaterials}
                loading={library.isLoading}
                error={library.isError}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setModal(null)}>
                Voltar à questão
              </Button>
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
};

function TrainerSetup({
  available,
  dailyRemaining,
  choices,
  facets,
  values,
  setters,
  start,
}: {
  available: number;
  dailyRemaining?: number | undefined;
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
  const sessionSize = trainerSessionSize(available, values.limit, dailyRemaining);
  const reset = () => {
    setters.setContest(isEnemContest(values.contest) ? "ENEM" : "all");
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
  };
  return (
    <div className="trainer-setup mx-auto max-w-5xl space-y-3 pb-5 animate-in fade-in duration-300 sm:space-y-5 sm:pb-10">
      <Card className="command-panel border-0 shadow-lg ring-1 ring-border/70">
        <CardContent className="p-3.5 sm:p-5 md:p-7">
          <div className="mb-3 flex items-center gap-2.5 sm:mb-6 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 sm:h-11 sm:w-11">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black">2. Defina o conteúdo</h2>
              <p className="text-xs text-muted-foreground">
                Escolha a disciplina e, se quiser, o assunto. Use os critérios adicionais para
                refinar.
              </p>
            </div>
          </div>
          <fieldset className="mb-5 rounded-xl border bg-muted/20 p-4">
            <legend className="px-1 text-sm font-semibold">Área de preparação</legend>
            <div className="flex flex-wrap gap-2">
              {(["contests", "enem"] as const).map((collection) => {
                const active = isEnemContest(values.contest) === (collection === "enem");
                return (
                  <Button
                    key={collection}
                    type="button"
                    variant={active ? "default" : "outline"}
                    aria-pressed={active}
                    onClick={() => {
                      if (active) return;
                      reset();
                      setters.setContest(collection === "enem" ? "ENEM" : "all");
                    }}
                  >
                    {collection === "enem" ? "ENEM" : "Concursos públicos"}
                  </Button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              As opções e questões pertencem somente à área escolhida. Ao trocar de área, os filtros
              anteriores são limpos.
            </p>
          </fieldset>
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            {!isEnemContest(values.contest) && (
              <TrainerFilter
                counts={facets.counts["board"]}
                allCount={facets.totals["board"]}
                label="Banca"
                value={values.board}
                setValue={setters.setBoard}
                options={choices.boards}
              />
            )}
          </div>
          <details
            className="trainer-extra-filters"
            open={
              Object.entries({
                contest: isEnemContest(values.contest) ? "all" : values.contest,
                career: values.career,
                state: values.state,
                category: values.category,
                year: values.year,
                exam: values.appliedExam,
                source: values.source,
                reviewed: values.reviewed,
                difficulty: values.difficulty,
              }).some(([, value]) => value !== "all") || undefined
            }
          >
            <summary>
              Refinar seleção <span>Concurso, cargo, ano, prova e outros critérios</span>
            </summary>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {" "}
              <TrainerFilter
                counts={facets.counts["contest"]}
                allCount={facets.totals["contest"]}
                label="Concurso ou material"
                hideAll={isEnemContest(values.contest)}
                value={values.contest}
                setValue={setters.setContest}
                options={choices.contests}
                labels={Object.fromEntries(
                  choices.contests.map((value) => [value, questionContestOptionLabel(value)]),
                )}
              />
              <TrainerFilter
                counts={facets.counts["career"]}
                allCount={facets.totals["career"]}
                label="Cargo"
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
                  curated: "Autorais e repertório de estudo",
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
              <TrainerFilter
                counts={facets.counts["difficulty"]}
                allCount={facets.totals["difficulty"]}
                label="Dificuldade"
                value={values.difficulty}
                setValue={setters.setDifficulty}
                options={["fácil", "média", "difícil"]}
                labels={{ fácil: "Fácil", média: "Média", difícil: "Difícil" }}
              />
            </div>
          </details>
          <div className="mt-5 border-t pt-5">
            <h3 className="mb-3 text-sm font-semibold">3. Monte sua sessão</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <TrainerFilter
                label="Quantidade"
                value={values.limit}
                setValue={setters.setLimit}
                options={["5", "10", "20", "30", "50", "all"]}
                labels={{ all: "Todas as questões da seleção" }}
                allLabel="Quantidade"
                hideAll
              />{" "}
              <label className="space-y-1.5 sm:space-y-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Ordem das questões
                </span>
                <Select
                  value={values.orderMode}
                  onValueChange={(value) => setters.setOrderMode(value as OrderMode)}
                >
                  <SelectTrigger
                    aria-label="Ordem das questões"
                    className="min-h-[44px] bg-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Ordem aleatória</SelectItem>
                    <SelectItem value="exam">Ordem do acervo</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>
          </div>
          <div className="trainer-start-bar mt-5 flex flex-col gap-3 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-black">
                {dailyRemaining === 0
                  ? "Limite de novas respostas atingido hoje"
                  : sessionSize
                    ? `${sessionSize} ${sessionSize === 1 ? "questão" : "questões"} nesta sessão`
                    : "Nenhuma questão para estes filtros"}
              </p>
              {dailyRemaining !== undefined && (
                <p className="text-sm text-muted-foreground">
                  {dailyRemaining} novas respostas disponíveis hoje. Revisões não consomem esse
                  limite.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {values.orderMode === "random"
                  ? "Questões em ordem aleatória, com correção após cada resposta."
                  : "Questões na ordem do acervo, com correção após cada resposta."}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:flex">
              <Button variant="outline" size="sm" onClick={reset} className="sm:h-10 sm:px-4">
                Limpar filtros
              </Button>
              <Button
                disabled={!sessionSize}
                onClick={start}
                className="hero-primary-action min-h-[48px]"
              >
                <ArrowRight className="mr-2 h-4 w-4" /> Começar sessão
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
  const usableOptions = options.filter(
    (option) => !counts || (counts.get(option) ?? 0) > 0 || option === value,
  );
  if (
    value === "all" &&
    counts &&
    usableOptions.length <= 1 &&
    !["Disciplina", "Assunto"].includes(label)
  )
    return null;
  return (
    <label className="space-y-1.5 sm:space-y-2">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger aria-label={label} className="min-h-[44px] bg-background">
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
                {hideAll && option !== "all" ? " questões" : ""}
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
  mixed,
  total,
  review,
  correct,
  wrong,
  restart,
}: {
  total: number;
  mixed: boolean;
  review: boolean;
  correct: number;
  wrong: number;
  restart: () => void;
}) {
  const answeredCount = correct + wrong;
  const accuracy = answeredCount ? Math.round((correct / answeredCount) * 100) : 0;
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl items-center">
      <Card className="w-full overflow-hidden text-center shadow-xl">
        <div className="h-2 bg-gradient-to-r from-emerald-500 to-sky-500" />
        <CardContent className="space-y-6 p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Treino concluído
            </p>
            <h1 className="mt-2 text-4xl font-black">{accuracy}%</h1>
            <p className="mt-2 text-muted-foreground">Aproveitamento nesta sessão</p>
            <dl className="trainer-result-metrics">
              <div>
                <dt>Acertos</dt>
                <dd>{correct}</dd>
              </div>
              <div>
                <dt>Erros</dt>
                <dd>{wrong}</dd>
              </div>
              <div>
                <dt>Questões</dt>
                <dd>{total}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-muted-foreground">
              {mixed
                ? "Primeiras respostas registram seu desempenho. Questões já respondidas são revisões e não pontuam novamente."
                : review
                  ? "Sessão de revisão: suas primeiras respostas permanecem como registro oficial, sem nova pontuação."
                  : "Suas respostas foram registradas no desempenho."}
            </p>
          </div>
          <Progress value={accuracy} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={restart}>
              <RotateCcw className="mr-2 h-4 w-4" /> Configurar novo treino
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/dashboard/performance">Ver meu desempenho</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ElapsedTimer({ seconds }: { seconds: number }) {
  const secs = seconds;
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
