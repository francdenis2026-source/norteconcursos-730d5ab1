import "@/styles/question-workspace.css";
import preparationAreasArt from "@/assets/questions/preparation-areas.webp";
import { questionIdentity } from "@/lib/questionIdentity";
import { useResponseSeconds } from "@/hooks/useResponseSeconds";
import { useSessionHydration } from "@/hooks/useSessionHydration";
import { snapshotUploader } from "@/lib/sessionSnapshotsAccount";
import { openRow, recordLocalSave } from "@/lib/sessionSnapshots";
import { LawText } from "@/components/dashboard/LawText";
import { ResumeSessions } from "@/components/dashboard/ResumeSessions";
import { QuestionText } from "@/components/dashboard/QuestionText";
import { QuestionCode } from "@/components/dashboard/QuestionCode";
import { scrollAppToSection } from "@/lib/appScroll";
import { QuestionProse } from "@/components/dashboard/QuestionProse";
import {
  trainerContext,
  lockedTrainerSubject,
  lockedTrainerCollection,
  trainerTopicSubject,
  trainerDisciplineCatalog,
} from "@/lib/trainerContext";
import { useUnseenActivity } from "@/hooks/useUnseenActivity";
import { freshActivityQuestions } from "@/lib/dailyStudyActivity";
import { AnswerFeedback } from "@/components/dashboard/AnswerFeedback";
import { QuestionTimer } from "@/components/dashboard/QuestionTimer";
import { useQuery } from "@tanstack/react-query";
import { fetchEditalEditions } from "@/lib/editalEditions";
import { editalExamQuestions } from "@/lib/editalPractice";
import { examCoverage, sessionExamCoverage } from "@/lib/examCoverage";
import { SaveStudyLater } from "@/components/dashboard/SaveStudyLater";
import { dedupeSharedExamItems, expandAnsweredBySiblings } from "@/lib/questionDuplicates";
import { accountStudyLaterPort } from "@/lib/studyLaterAccount";
import { pushStudyLaterItem } from "@/lib/studyLaterSync";
import { readStudyLater, saveStudyLater, studyLaterHas } from "@/lib/studyLater";
import { canStrikeQuestion } from "@/lib/studyLater";
import { TrainerSessionMap } from "@/components/dashboard/TrainerSessionMap";
import { QuestionFilterPicker } from "@/components/dashboard/QuestionFilterPicker";
import { QuestionFigures } from "@/components/dashboard/QuestionFigures";
import { searchQuestionCatalog } from "@/lib/questionBank";
import {
  trainerSessionSize,
  catalogSessionQuestions,
  trainerReachableIndex,
  trainerTally,
  trainerCanFinish,
  type TrainerResult,
} from "@/lib/trainerSession";
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
  GraduationCap,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
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
  SkipForward,
  Strikethrough,
  Target,
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
import { Hint } from "@/components/ui/hint";
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
import { ReadingSizeInline } from "@/components/accessibility/ReadingSizeInline";
import { QuestionAudioButton } from "@/components/dashboard/QuestionAudioButton";
import { ReportQuestionButton } from "@/components/dashboard/ReportQuestionButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { checkFeatureAccess } from "@/lib/subscriptions.config";

export const Route = createFileRoute("/dashboard/question-trainer")({
  validateSearch: (
    search: Record<string, unknown>,
  ): Partial<
    Record<
      | "studyTopic"
      | "unseen"
      | "fresh"
      | "edition"
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
      | "currency"
      | "limit",
      string | undefined
    >
  > => ({
    studyTopic: typeof search["studyTopic"] === "string" ? search["studyTopic"] : undefined,
    unseen: search["unseen"] === "1" ? "1" : undefined,
    fresh: typeof search["fresh"] === "string" ? search["fresh"] : undefined,
    edition: typeof search["edition"] === "string" ? search["edition"] : undefined,
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
    currency: typeof search["currency"] === "string" ? search["currency"] : undefined,
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
  const lockedSubject = lockedTrainerSubject(routeFilters.subject);
  const lockedCollection = lockedTrainerCollection(routeFilters);
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
    error: catalogError,
    reload: reloadCatalog,
  } = useQuestionCatalog(userId, canLoad);
  const examEdition = useQuery({
    queryKey: ["trainer-exam-edition", userId, routeFilters.edition],
    enabled: canLoad && !!routeFilters.edition,
    queryFn: async () => {
      const found = (await fetchEditalEditions()).find((e) => e.id === routeFilters.edition);
      if (!found) throw Error("Edição não encontrada");
      return found;
    },
    retry: false,
  });
  // Questões sem o texto de apoio ficam fora do treino até que o conteúdo esteja disponível.

  const law = routeFilters.law;
  const [contest, setContest] = React.useState(
    questionContestValue(routeFilters.contest || (lockedCollection === "enem" ? "ENEM" : "all")),
  );
  const collection = lockedCollection ?? (isEnemContest(contest) ? "enem" : "contests");
  // Questões de Português que remetem a "o texto" sem o texto de apoio ficam fora do treino até o texto ser cadastrado:
  // sem ele, o aluno não consegue resolver.
  const { catalog, missingSupportText } = React.useMemo(() => {
    const collectionCatalog = trainerCollectionQuestions(
      searchQuestionCatalog(
        syllabusQuestions(
          routeFilters.edition
            ? examEdition.data
              ? editalExamQuestions(fullCatalog, examEdition.data)
              : []
            : fullCatalog,
          routeFilters.syllabus,
        ),
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
  }, [
    fullCatalog,
    law,
    collection,
    routeFilters.syllabus,
    routeFilters.catalogQuery,
    routeFilters.edition,
    examEdition.data,
  ]);
  const subjectCatalog = React.useMemo(
    () => trainerDisciplineCatalog(catalog, lockedSubject),
    [catalog, lockedSubject],
  );
  const {
    locked: lockedBase,
    identityReady,
    loading: lockedLoading,
    error: historyError,
    reload: reloadHistory,
    markLocked,
  } = useLockedAnswers(userId, canLoad, catalog);
  // O mesmo item cadastrado para dois cargos da mesma prova (ex.: Agente e Papiloscopista) é uma questão só.
  const locked = React.useMemo(
    () => expandAnsweredBySiblings(lockedBase, catalog, (q) => questionIdentity(q as never)),
    [lockedBase, catalog],
  );
  const unseenHistory = useUnseenActivity(userId, canLoad && routeFilters.unseen === "1");
  const error =
    catalogError ??
    historyError ??
    (routeFilters.unseen === "1" && unseenHistory.isError
      ? "Não foi possível conferir as questões feitas em simulados. Nenhuma questão será repetida sem essa conferência."
      : null);
  const { reinforced, markReinforced } = useReinforcement(userId, canLoad);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [started, setStarted] = React.useState(false);
  const [practiceMode, setPracticeMode] = React.useState<"new" | "wrong" | "all" | "catalog">(
    routeFilters.mode === "catalog" ? "catalog" : routeFilters.mode === "reforco" ? "wrong" : "new",
  );
  const [sessionReinforce, setSessionReinforce] = React.useState(false);
  const [board, setBoard] = React.useState(trainerBoard(routeFilters.board));
  const [career, setCareer] = React.useState(
    selectedQuestionCareer(
      routeFilters.career || "all",
      routeFilters.contest || (lockedCollection === "enem" ? "ENEM" : "all"),
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
  const [currency, setCurrency] = React.useState(routeFilters.currency || "all");
  // O filtro "Atual" é do Essencial para cima (durante o período de testes todas as contas têm Essencial).
  const currencyAllowed =
    isAdmin || checkFeatureAccess(user?.subscription_tier ?? "free", "currencyFilter").included;
  const activeCurrency = currencyAllowed ? currency : "all";
  const [limit, setLimit] = React.useState(routeFilters.limit || "20");
  const [orderMode, setOrderMode] = React.useState<OrderMode>(
    routeFilters.limit === "all" ? "exam" : "random",
  );
  const loading =
    catalogLoading ||
    lockedLoading ||
    (!!routeFilters.edition && examEdition.isPending) ||
    (routeFilters.unseen === "1" && (unseenHistory.isPending || unseenHistory.isFetching));
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [struck, setStruck] = React.useState<Answer[]>([]);
  const [communityOpen, setCommunityOpen] = React.useState(false);
  // seconds: tempo ativo até responder, guardado aqui para não depender do relógio nem do histórico remoto.
  const sessionAnswers = React.useRef(
    new Map<number, { selected: Answer; isCorrect: boolean; seconds?: number }>(),
  );
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const savingRef = React.useRef(false);
  const responseIdRef = React.useRef(crypto.randomUUID());
  const [answered, setAnswered] = React.useState(false);
  const [reviewingPast, setReviewingPast] = React.useState(false);
  const [supportNotice, setSupportNotice] = React.useState(false);
  const supportNoticeId = React.useId();
  const [modal, setModal] = React.useState<"help" | null>(null);
  const [mapOpen, setMapOpen] = React.useState(false);
  const library = useStudyMaterialList(canLoad && answered && modal === "help");
  const [results, setResults] = React.useState<TrainerResult[]>([]);
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
  const clearBookmark = () => {
    bookmarkRef.current = null;
    if (!userId) return;
    // A sessão encerrada também sai da conta, para outros aparelhos não oferecerem retomada.
    void snapshotUploader(userId).close("trainer", "trainer", Date.now());
    try {
      localStorage.removeItem(`trainer-bookmark:${userId}`);
      sessionStorage.removeItem(`trainer-bookmark:${userId}`);
    } catch {
      /* A blocked store must not prevent ending the session. */
    }
  };
  const confirmLeave = () => {
    if (savingRef.current) return;
    clearBookmark();
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
  // Traz da conta a sessão mais recente antes de tentar retomar (outro aparelho).
  const sessionsReady = useSessionHydration(userId, canLoad);
  const pendingRestore = React.useRef(false);
  const [resumeNotice, setResumeNotice] = React.useState(false);
  const [bookmarkError, setBookmarkError] = React.useState(false);
  const restoredSeconds = React.useRef<number | null>(null);
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
            questionSeconds: questionSecs,
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
  const persistBookmark = React.useCallback(() => {
    const saved = bookmarkRef.current;
    if (!saved) return;
    try {
      localStorage.setItem(`trainer-bookmark:${saved.userId}`, JSON.stringify(saved.value));
      recordLocalSave(localStorage, "trainer", saved.userId, "trainer", saved.value.savedAt);
      setBookmarkError(false);
    } catch {
      setBookmarkError(true);
    }
    // Espelho na conta: conteúdo sem relógios, para só enviar quando algo mudou de fato.
    const { savedAt, questionSeconds, ...stable } = saved.value;
    void questionSeconds;
    snapshotUploader(saved.userId).schedule(
      openRow("trainer", "trainer", saved.value, savedAt),
      JSON.stringify(stable),
    );
  }, []);
  // Save selections, position and active time before a browser reload can discard React.
  React.useEffect(() => {
    persistBookmark();
  });
  React.useEffect(() => {
    const onHide = () => persistBookmark();
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
      const saved = bookmarkRef.current;
      if (saved) {
        try {
          localStorage.setItem(`trainer-bookmark:${saved.userId}`, JSON.stringify(saved.value));
        } catch {
          /* Navigation remains possible when storage is blocked. */
        }
      }
    };
  }, [persistBookmark]);
  React.useEffect(() => {
    // A new law link must never reuse a session or filters belonging to the previous law.
    sessionAnswers.current.clear();
    setStarted(false);
    setQuestions([]);
    setResults([]);
    setIndex(0);
    setModal(null);
    setContest(
      questionContestValue(routeFilters.contest || (lockedCollection === "enem" ? "ENEM" : "all")),
    );
    setBoard(trainerBoard(routeFilters.board));
    setCareer(
      selectedQuestionCareer(
        routeFilters.career || "all",
        routeFilters.contest || (lockedCollection === "enem" ? "ENEM" : "all"),
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
    setCurrency(routeFilters.currency || "all");
    setAppliedExam(routeFilters.appliedExam || "all");
    setLimit(routeFilters.limit || "20");
    setOrderMode(routeFilters.limit === "all" ? "exam" : "random");
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
    routeFilters.edition,
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
    routeFilters.unseen,
    routeFilters.studyTopic,
    routeFilters.fresh,
    routeFilters.mode,
    routeFilters.appliedExam,
    routeFilters.catalogQuery,
    routeFilters.limit,
  ]);
  React.useEffect(() => {
    if (
      !pendingRestore.current ||
      loading ||
      error ||
      examEdition.isError ||
      !userId ||
      !sessionsReady
    )
      return;
    pendingRestore.current = false;
    try {
      const storageKey = `trainer-bookmark:${userId}`;
      const raw = localStorage.getItem(storageKey) ?? sessionStorage.getItem(storageKey);
      if (!raw) return;
      const restored = restoreTrainerBookmark(JSON.parse(raw), routeKey, subjectCatalog);
      if (!restored) return;
      const b = restored.bookmark;
      sessionAnswers.current = new Map(
        (b.sessionAttempts ?? []).map(({ index, ...answer }) => [index, answer]),
      );
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
      restoredSeconds.current = b.questionSeconds ?? 0;
      setResumeNotice(true);
      setStartedAt(b.startedAt);
      setStarted(true);
      setModal(null);
      setAnswered(false); // The saved-answer gate is always reconstructed from the database.
      restoredSelection.current = restored.questions[b.index]?.id ?? null;
      const f = b.filters;
      setContest(
        lockedCollection === "enem" && !isEnemContest(f.contest)
          ? "ENEM"
          : questionContestValue(f.contest),
      );
      setBoard(f.board);
      setCareer(selectedQuestionCareer(f.career, f.contest, f.year));
      setYear(f.year);
      setAppliedExam(f.appliedExam);
      setSubject(lockedSubject ?? f.subject);
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
  }, [
    loading,
    error,
    examEdition.isError,
    userId,
    routeKey,
    subjectCatalog,
    lockedSubject,
    lockedCollection,
    sessionsReady,
  ]);
  const examNotice = routeFilters.edition ? (
    <aside role="status" className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
      <strong>
        Prova selecionada:{" "}
        {examEdition.data
          ? `${examEdition.data.contest_name} · ${examEdition.data.role_name} · ${examEdition.data.contest_year}`
          : "Consultando edição"}
      </strong>
      <p>
        {routeFilters.go === "1"
          ? "Você está resolvendo somente as questões oficiais elegíveis desta prova, com correção após cada resposta."
          : "Este treino está restrito às questões oficiais elegíveis dessa prova. Os filtros só refinam essa seleção."}
      </p>
      {examEdition.data && !catalogLoading && (
        <p className="mt-2 font-semibold">
          {examCoverage(
            {
              contest: examEdition.data.contest_name,
              career: examEdition.data.role_name,
              year: examEdition.data.contest_year,
            },
            catalog.length,
            true,
          )}
        </p>
      )}
      <Link
        to="/dashboard/edital"
        search={{ edition: routeFilters.edition }}
        className="mt-2 inline-block underline"
      >
        Voltar ao meu edital
      </Link>
    </aside>
  ) : null;
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
  const activityNotice =
    routeFilters.unseen === "1" ? (
      <aside role="status" className="rounded-xl border bg-muted p-4 text-sm">
        <strong>
          Questões novas · {routeFilters.subject}
          {routeFilters.studyTopic ? ` · ${routeFilters.studyTopic}` : ""}
        </strong>
        <p>
          Somente itens deste assunto ainda não feitos no treinador, no reforço ou nos simulados. Se
          não houver itens inéditos disponíveis, o assunto será mantido.
        </p>
      </aside>
    ) : null;
  const { correct, wrong, skipped } = trainerTally(results, questions.length);

  const activityCatalog = React.useMemo(
    () =>
      routeFilters.unseen === "1"
        ? freshActivityQuestions(
            subjectCatalog,
            new Set([...(unseenHistory.data ?? []), ...locked.keys(), ...reinforced.keys()]),
            routeFilters.subject,
            routeFilters.studyTopic,
          )
        : subjectCatalog,
    [
      subjectCatalog,
      routeFilters.unseen,
      routeFilters.subject,
      routeFilters.studyTopic,
      unseenHistory.data,
      locked,
      reinforced,
    ],
  );
  const practiceCatalog = React.useMemo(
    () => trainerPracticeQuestions(activityCatalog, practiceMode, locked, reinforced),
    [activityCatalog, practiceMode, locked, reinforced],
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
          currency: activeCurrency,
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
      activeCurrency,
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
      currencies: options("currency", currency).filter((key) => key !== "recent"),
      exams: options("exam", appliedExam).map(
        (key) => [key, key.split("::").join(" · ")] as [string, string],
      ),
    };
  }, [
    facets,
    contest,
    board,
    career,
    year,
    subject,
    topic,
    state,
    category,
    currency,
    appliedExam,
  ]);
  const manual =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setAppliedExam("all");
      setter(value);
    };
  const pool = React.useMemo(
    () =>
      dedupeSharedExamItems(
        filterTrainerQuestions(
          activityCatalog,
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
            currency: activeCurrency,
            state,
            category,
          },
          topicOf,
        ),
      ),
    [
      activityCatalog,
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
      activeCurrency,
      state,
      category,
    ],
  );
  // Modos de prática. "new": só questões ainda não respondidas (a 1ª resposta é a que conta para ranking e medalhas).
  // "wrong" e "all": reforço de questões já respondidas; as novas tentativas ficam numa tabela própria e não pontuam.
  const [notice, setNotice] = React.useState("");
  const fresh = React.useMemo(
    () => pool.filter((q) => !locked.has(questionIdentity(q))),
    [pool, locked],
  );
  const answeredPool = React.useMemo(
    () => pool.filter((q) => locked.has(questionIdentity(q))),
    [pool, locked],
  );
  // erro na 1ª tentativa e ainda não recuperado no reforço
  const wrongPending = React.useMemo(
    () =>
      answeredPool.filter((q) => {
        const k = questionIdentity(q);
        return (
          locked.get(k)?.isCorrect === false &&
          !reinforced.get(lockedKey(q.source, q.id))?.lastCorrect
        );
      }),
    [answeredPool, locked, reinforced],
  );
  const recovered = answeredPool.filter((q) => {
    const k = questionIdentity(q);
    return (
      locked.get(k)?.isCorrect === false && reinforced.get(lockedKey(q.source, q.id))?.lastCorrect
    );
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
    if (loading || authLoading || error || !canLoad) return;
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
    if (!autoStart.current || loading || started || examEdition.isError) return;
    if (routeFilters.edition) {
      autoStart.current = false;
      if (!trainingPool.length) {
        setNotice(
          "Não há questões elegíveis disponíveis desta prova para iniciar. Nenhuma questão de outra prova será incluída.",
        );
        return;
      }
      startTraining();
      return;
    }
    if (pool.length === 0 && routeFilters.unseen === "1") {
      autoStart.current = false;
      setNotice(
        "Não há questões novas disponíveis para este assunto no momento. Nenhuma questão já feita ou de outro assunto será incluída.",
      );
      return;
    }
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
    // Link que pede um tamanho (ex.: prova inteira com limit=all): usa o fluxo normal de início, sem sorteio de 10.
    if (routeFilters.limit) {
      startTraining();
      return;
    }
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
    if (
      value !== "all" &&
      lockedCollection &&
      (isEnemContest(value.split("::")[0] ?? "") ? "enem" : "contests") !== lockedCollection
    )
      return;
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

  React.useEffect(() => {
    if (started && questions.length > 0 && index >= questions.length) clearBookmark();
  }, [started, questions.length, index, userId]);
  const question = questions[index];
  const focusTarget = !started
    ? "trainer-setup"
    : question
      ? "trainer-question"
      : "trainer-result-title";
  const focusKey = `${routeKey}:${focusTarget}:${index}:${question?.source ?? ""}:${question?.id ?? ""}`;
  const focusedEntry = React.useRef("");
  React.useEffect(() => {
    if (!canLoad || loading || error || focusedEntry.current === focusKey) return;
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => {
        if (scrollAppToSection(focusTarget)) focusedEntry.current = focusKey;
      });
    });
    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    };
  }, [canLoad, loading, error, focusKey, focusTarget]);
  const setupSubjects = question
    ? []
    : [...new Set(trainingPool.map((q) => canonicalSubject(q.subject)))];
  const context = trainerContext(
    question,
    subject === "all" && setupSubjects.length === 1 ? setupSubjects[0] || subject : subject,
    topic,
    routeFilters.studyTopic,
  );

  // Questão sem o texto de apoio (só aparece se o aluno pediu): é marcada e não pontua.
  const noText = !!question && needsMissingSupportText(question);
  const nonScoring =
    sessionReinforce || noText || (!!question && locked.has(questionIdentity(question)));
  // Tempo da resposta: o desta sessão; senão, o gravado na conta (questão revista depois); senão, nada.
  const sessionSeconds = sessionAnswers.current.get(index)?.seconds;
  const storedSeconds = useResponseSeconds(
    userId,
    question?.id,
    answered && sessionSeconds === undefined && reviewingPast,
  );
  const shownSeconds =
    sessionSeconds ??
    (answered && !reviewingPast ? questionSecs : (storedSeconds.data ?? undefined));
  React.useEffect(() => {
    const seconds = restoredSeconds.current ?? 0;
    restoredSeconds.current = null;
    questionSecsRef.current = seconds;
    setQuestionSecs(seconds);
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
      (nonScoring ? undefined : locked.get(questionIdentity(question)));
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
        sessionAnswers.current.set(index, {
          selected,
          isCorrect,
          seconds: Math.max(0, questionSecsRef.current),
        });
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
          ...(identityReady ? { question_table: question.table } : {}),
          contest_name: question.contest,
          subject: question.subject,
          selected_answer: selected,
          official_answer: question.answer,
          is_correct: isCorrect,
          // Learning support is available only after this answer is saved.
          asked_for_help: false,
          response_seconds: Math.max(0, questionSecsRef.current),
        },
        { onConflict: "id", ignoreDuplicates: true },
      );
      if (error) throw error;
      const { data: savedResponse, error: verifyError } = await supabase
        .from("question_training_responses")
        .select("question_id,question_source,selected_answer,is_correct")
        .eq("id", responseIdRef.current)
        .eq("user_id", user.id)
        .single();
      if (
        verifyError ||
        savedResponse.question_id !== question.id ||
        savedResponse.question_source !== question.source ||
        savedResponse.selected_answer !== selected ||
        savedResponse.is_correct !== isCorrect
      )
        throw new Error("A resposta salva diverge do conteúdo exibido. Atualize a questão.");
      sessionAnswers.current.set(index, {
        selected,
        isCorrect,
        seconds: Math.max(0, questionSecsRef.current),
      });
      setAnswered(true);
      setDailyUsed((n) => n + 1);
      markLocked(question, { selected, isCorrect });
      void reloadHistory();
      setResults((prev) => {
        const copy = [...prev];
        copy[index] = isCorrect ? "ok" : "err";
        return copy;
      });
      setModal(null);
    } catch (error) {
      // O servidor também aplica o limite diário do plano (gatilho no banco).
      if (/limite di[aá]rio/i.test(String((error as { message?: unknown })?.message ?? ""))) {
        if (dailyLimit !== "unlimited") setDailyUsed(dailyLimit);
        setSaveError(
          "Você atingiu o limite diário de questões do seu plano. Ele renova à meia-noite (horário do Acre).",
        );
      } else {
        setSaveError("Não foi possível salvar sua resposta. Tente novamente.");
      }
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };
  const goTo = (target: number) => {
    if (savingRef.current || target < 0 || target > questions.length) return;
    if (target < questions.length && target > trainerReachableIndex(results, questions.length))
      return;
    if (target === questions.length && !trainerCanFinish(results, questions.length)) return;
    moveTo(target);
  };
  const moveTo = (target: number) => {
    setMapOpen(false);
    responseIdRef.current = crypto.randomUUID();
    setModal(null);
    setSaveError("");
    setCommunityOpen(false);
    setIndex(target);
    if (target === index)
      window.requestAnimationFrame(() => scrollAppToSection("trainer-question"));
  };
  const next = () => goTo(index + 1);
  // Pular não responde, não conta como erro e não pontua; a questão fica em "Estudar depois" para revisão.
  const skipQuestion = () => {
    if (!question || answered || savingRef.current || !user) return;
    setResults((prev) => {
      const copy = [...prev];
      copy[index] = "skipped";
      return copy;
    });
    try {
      const before = readStudyLater(localStorage, user.id);
      const items = saveStudyLater(
        localStorage,
        user.id,
        question,
        new Date().toISOString(),
        "skipped",
      );
      const item = items.find((entry) => studyLaterHas([entry], question));
      if (item && !studyLaterHas(before, question))
        void pushStudyLaterItem(user.id, item, accountStudyLaterPort(user.id)).catch(() => false);
      toast.message("Questão pulada. Ela ficou em Meus cadernos → Estudar depois.");
    } catch {
      toast.message("Questão pulada, mas não foi possível guardá-la em Estudar depois.");
    }
    moveTo(index + 1);
  };
  const restart = () => {
    clearBookmark();
    setResumeNotice(false);
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

  if (authLoading || isGuest)
    return (
      <Center>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>{isGuest ? "Redirecionando…" : "Preparando seu treino…"}</p>
      </Center>
    );
  if (routeFilters.edition && examEdition.isError)
    return (
      <Center>
        <p>
          Não foi possível conferir a prova selecionada. Nenhuma questão de outra prova será usada.
        </p>
        <Button onClick={() => void examEdition.refetch()}>Tentar carregar a prova</Button>
        <Link to="/dashboard/edital" search={{ edition: routeFilters.edition }}>
          Voltar ao meu edital
        </Link>
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
        <Button
          onClick={() => {
            if (catalogError) void reloadCatalog();
            if (historyError) void reloadHistory();
            if (routeFilters.unseen === "1") void unseenHistory.refetch();
          }}
        >
          Tentar novamente
        </Button>
        <Button asChild variant="outline">
          <Link to="/dashboard/question-bank">Voltar ao banco</Link>
        </Button>
      </Center>
    );
  if (!started && !loading && routeFilters.edition && routeFilters.go === "1")
    return (
      <Center>
        {autoStart.current ? (
          <Loader2 className="h-7 w-7 animate-spin" />
        ) : (
          <Target className="h-8 w-8 text-primary" />
        )}
        <p role="status">
          {autoStart.current
            ? "Abrindo as questões da prova escolhida…"
            : notice || "Treino encerrado. Suas respostas confirmadas permanecem no histórico."}
        </p>
        {!autoStart.current && catalog.length > 0 && (
          <Button onClick={startTraining}>Resolver novamente esta prova</Button>
        )}
        <Button asChild variant="outline">
          <Link to="/dashboard/edital" search={{ edition: routeFilters.edition }}>
            Voltar ao meu edital
          </Link>
        </Button>
      </Center>
    );
  if (!started)
    return (
      <div className="trainer-workbench question-workspace" aria-busy={loading}>
        <header className="trainer-workbench-heading trainer-workbench-hero workspace-banner">
          <div>
            <span className="trainer-panel-kicker">PRATICAR E EVOLUIR</span>
            <h1 id="trainer-title">Treinador de questões</h1>
            <p>Uma seleção precisa. Uma questão por vez. Clareza para aprender.</p>
          </div>
          <Link to="/dashboard/question-bank" className="trainer-catalog-link">
            <BookOpenCheck aria-hidden="true" />
            Explorar acervo
            <ArrowRight aria-hidden="true" />
          </Link>
        </header>
        <ResumeSessions userId={userId} only="trainer" skipRoute={routeKey} compact />
        {loading && (
          <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Carregando questões e conferindo seu histórico…
          </p>
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
        {examNotice}
        {lawNotice}
        {activityNotice}
        <div
          id="trainer-setup"
          tabIndex={-1}
          className="trainer-focus-target"
          aria-label="Configurar treino de questões"
        >
          {context.automatic && (
            <TrainerContextBanner
              discipline={context.discipline}
              topic={context.topic}
              automatic={context.automatic}
              setup
            />
          )}
          <TrainerSetup
            practiceModes={
              <section className="trainer-practice-panel" aria-label="Modo de prática">
                {missingSupportText > 0 && (
                  <details className="trainer-quality-note">
                    <summary>Questões com conteúdo incompleto ficam fora do treino</summary>
                    <p>
                      {missingSupportText} questões desta área aguardam texto de apoio. Elas não
                      entram na seleção até que o material esteja disponível.
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
                <h2 className="text-base font-semibold">Como você quer praticar?</h2>
                <div className="trainer-practice-modes">
                  {(
                    [
                      ["catalog", "Todas da seleção", `${pool.length} disponíveis`],
                      ["new", "Questões novas", `${fresh.length} sem resposta`],
                      [
                        "wrong",
                        "Revisar meus erros",
                        `${wrongPending.length} pendentes${recovered ? ` · ${recovered} recuperados` : ""}`,
                      ],
                      ["all", "Revisar respostas", `${answeredPool.length} respondidas`],
                    ] as const
                  ).map(([id, title, sub]) => (
                    <label
                      key={id}
                      className="trainer-practice-mode"
                      data-mode={id}
                      data-active={practiceMode === id}
                    >
                      <input
                        type="radio"
                        name="practice-mode"
                        className="mr-2"
                        checked={practiceMode === id}
                        onChange={() => changePracticeMode(id)}
                      />
                      <span className="trainer-practice-mode__title">{title}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {loading ? "Consultando questões disponíveis…" : sub}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            }
            lockedSubject={lockedSubject}
            lockedCollection={lockedCollection}
            loading={loading}
            available={
              practiceMode === "catalog"
                ? catalogSessionQuestions(trainingPool, locked, dailyRemaining).length
                : trainingPool.length
            }
            dailyRemaining={practiceMode === "new" ? dailyRemaining : undefined}
            newAnswersRemaining={dailyRemaining}
            choices={choices}
            facets={facets}
            currencyLocked={!currencyAllowed}
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
              currency: activeCurrency,
              state,
              category,
              area,
              topic,
              limit,
              orderMode,
            }}
            setters={{
              setContest: (value: string) => {
                if (
                  value !== "all" &&
                  lockedCollection &&
                  (isEnemContest(value) ? "enem" : "contests") !== lockedCollection
                )
                  return;
                setAppliedExam("all");
                setContest(value === "all" && lockedCollection === "enem" ? "ENEM" : value);
              },
              setBoard: manual(setBoard),
              setCareer: manual(setCareer),
              setYear: manual(setYear),
              setAppliedExam: selectAppliedExam,
              setSubject: (value: string) => {
                if (lockedSubject) return;
                setSubject(value);
                setArea("all");
                setTopic("all");
              },
              setSource: setSource,
              setReviewed: setReviewed,
              setDifficulty: setDifficulty,
              setCurrency: setCurrency,
              setState: setState,
              setCategory: setCategory,
              setArea: (value: string) => {
                setArea(value);
                if (!lockedSubject) setSubject("all");
                setTopic("all");
              },
              setTopic: (value: string) => {
                const topicSubject = trainerTopicSubject(value);
                if (lockedSubject && topicSubject && topicSubject !== lockedSubject) return;
                if (topicSubject && !lockedSubject) {
                  setSubject(topicSubject);
                  setArea("all");
                }
                setTopic(value);
              },
              setLimit,
              setOrderMode,
            }}
            start={startTraining}
          />
        </div>
        <details className="question-workspace__help">
          <summary>Como funciona este treino</summary>
          <p>
            Primeiras respostas registram seu desempenho. Revisões não pontuam novamente. O
            cronômetro acompanha seu ritmo, sem limitar o tempo da questão.
          </p>
          {practiceMode === "catalog" && (
            <p>{examCoverage({ contest, career, year }, pool.length, true)}</p>
          )}
        </details>
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
        skipped={skipped}
        reviewFirstError={() => goTo(results.findIndex((result) => result === "err"))}
        reviewFirstSkipped={() => goTo(results.findIndex((result) => result === "skipped"))}
      />
    );

  const isCorrect = selected === question.answer;
  const parsed = parseQuestion(question.text);
  const hasOptions = parsed.options.length > 0;
  const explanation = splitExplanation(question.explanation);
  const relatedMaterials = relatedTrainerMaterials(question, library.data ?? []);
  const supportAvailable = canOpenTrainerLearning(
    answered && locked.has(questionIdentity(question)),
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
  const priorAnswer = nonScoring ? locked.get(questionIdentity(question)) : undefined;
  const correctOption = parsed.options.find((option) => option.letter === question.answer);
  const certoErrado =
    question.kind === "true_false" || (!hasOptions && questionAnswers(question).join("") === "CE");
  const canStrike = canStrikeQuestion(question);
  const labelFor = (answer: Answer) =>
    hasOptions ? `Alternativa ${answer}` : questionAnswerLabel(answer, question);
  const chooseOption = (letter: Answer) => {
    if (answered || savingRef.current) return;
    setStruck((items) => items.filter((item) => item !== letter));
    setSelected(letter);
  };
  const toggleStrike = (letter: Answer) => {
    if (!canStrike || answered || savingRef.current) return;
    setStruck((items) =>
      items.includes(letter) ? items.filter((item) => item !== letter) : [...items, letter],
    );
    if (selected === letter) setSelected(null);
  };
  return (
    <div className="trainer-session-shell trainer-resolution-workspace question-workspace">
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
            <DialogTitle>Encerrar este treino?</DialogTitle>
            <DialogDescription>
              {saving
                ? "Aguarde enquanto sua resposta é salva."
                : "Ao encerrar, a retomada desta sessão será removida. As respostas já confirmadas permanecem no seu histórico. Para continuar depois, você pode atualizar ou fechar a página."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button onClick={cancelLeave}>Continuar estudando</Button>
            <Button variant="outline" onClick={confirmLeave} disabled={saving}>
              Encerrar treino
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <aside
        role="status"
        className="trainer-session-status"
        data-error={bookmarkError || undefined}
      >
        <ShieldCheck aria-hidden="true" />
        <span>
          {bookmarkError
            ? "Não foi possível salvar a retomada neste navegador. Evite recarregar antes de concluir."
            : resumeNotice
              ? "Treino retomado. Sua posição fica salva neste navegador."
              : "Sua posição fica salva neste navegador para continuar depois."}
        </span>
        {sessionExamCoverage(questions) && (
          <details>
            <summary>Cobertura da prova</summary>
            <p>{sessionExamCoverage(questions)}</p>
          </details>
        )}
      </aside>
      {examNotice}
      {lawNotice}
      {activityNotice}
      {noText && <MissingTextNotice scoring />}
      {(sessionReinforce || (practiceMode === "catalog" && nonScoring && !noText)) && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-sky-300 bg-sky-50 p-3 text-sm text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-100"
        >
          <RefreshCw className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            <strong>Modo reforço.</strong> Revisão sem novos pontos ou consumo do limite diário. Sua
            primeira resposta permanece como registro oficial.
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
      <header className="trainer-session-command">
        <div>
          <span className="trainer-panel-kicker">
            {isEnemContest(question.contest) ? "PREPARAÇÃO ENEM" : "TREINAMENTO POR QUESTÕES"}
          </span>
          <h1>{question.subject}</h1>
        </div>
        <div>
          {user?.id && <SaveStudyLater userId={user.id} question={question} />}
          <Button
            className="trainer-map-trigger"
            variant="outline"
            onClick={() => setMapOpen(true)}
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Navegar questões
          </Button>
          <Button variant="outline" onClick={() => setConfirmStop(true)}>
            <PauseCircle className="mr-2 h-4 w-4" />
            Encerrar treino
          </Button>
        </div>
      </header>
      <div className="trainer-session-layout">
        <div className="trainer-question-column">
          <Card
            id="trainer-question"
            tabIndex={-1}
            aria-label="Questão atual do treino"
            className="question-window trainer-question-paper trainer-focus-target"
            key={question.id}
          >
            <CardContent className="trainer-question-content">
              <QuestionCode question={question} />
              {context.automatic && (
                <TrainerContextBanner
                  discipline={context.discipline}
                  topic={context.topic}
                  automatic={context.automatic}
                />
              )}
              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
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
                {currencyAllowed && question.currencyTags?.length ? (
                  <Hint content={question.currencyNote ?? question.currencyTags.join(" · ")}>
                    <Badge
                      variant="outline"
                      className="gap-1 border-amber-500/60 font-bold text-amber-700 dark:text-amber-300"
                    >
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Atual:{" "}
                      {question.currencyTags.filter((tag) => tag !== "Prova recente")[0] ??
                        "Prova recente"}
                    </Badge>
                  </Hint>
                ) : null}
                <span className="ml-auto">
                  <ReportQuestionButton question={question} />
                </span>
              </div>
              {results[index] === "skipped" && !answered && (
                <p
                  role="status"
                  className="mb-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm"
                >
                  Questão pulada — disponível em Meus cadernos → Estudar depois. Ainda não
                  respondida.
                </p>
              )}
              {(reviewingPast || priorAnswer) && (
                <div
                  role="status"
                  className="mb-3 flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-200"
                >
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Você já respondeu esta questão .{" "}
                    {reviewingPast ? "Resposta já registrada — revisão sem novo envio. " : ""}
                    Esta tentativa não gera novos pontos no ranking.
                  </span>
                </div>
              )}
              <div className="trainer-question-heading">
                <div className="min-w-0 flex-1 basis-24">
                  <h2 className="font-display text-xl font-extrabold leading-none text-foreground sm:text-3xl">
                    Questão {index + 1}{" "}
                    <span className="text-muted-foreground">de {questions.length}</span>
                  </h2>
                  <p className="trainer-mobile-summary mt-1.5 text-xs text-muted-foreground">
                    {correct + wrong} respondidas · {correct} acertos · {wrong} erros · {skipped}{" "}
                    puladas
                  </p>
                </div>
                {(!reviewingPast || sessionSeconds !== undefined) && (
                  <div className="question-timing-row" aria-label="Tempo de resolução">
                    <QuestionTimer seconds={sessionSeconds ?? questionSecs} completed={answered} />
                  </div>
                )}
              </div>
              <progress
                className="trainer-question-progress"
                value={correct + wrong}
                max={Math.max(1, questions.length)}
                aria-label="Questões respondidas nesta sessão"
              />
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
              <div className="mb-3 flex flex-wrap items-center gap-2 border-b pb-3">
                <QuestionAudioButton
                  text={[
                    reflowStem(parsed.stem),
                    ...parsed.options.map((option) => `${option.letter}. ${option.text}`),
                  ].join("\n")}
                />
                <ReadingSizeInline className="ml-auto" />
              </div>
              <QuestionProse text={reflowStem(parsed.stem)} className="trainer-question-stem" />
              <QuestionFigures urls={question.figures} illustrations={parsed.illustrations} />
              <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:mt-5 sm:text-xs">
                {certoErrado ? "Julgue o item" : "Assinale a alternativa correta"}
              </p>
              {hasOptions && (
                <div className="mt-3 space-y-2">
                  {parsed.options.map((option) => {
                    const isStruck = !answered && struck.includes(option.letter);
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
                            "trainer-option",
                            isStruck && "is-eliminated",
                            isSelected && !answered && "is-selected",
                            isRight && "is-correct",
                            isWrong && "is-incorrect",
                          )}
                        >
                          <span className="trainer-option-letter">{option.letter}</span>
                          <span className={cn("q-option-text flex-1", isStruck && "line-through")}>
                            <LawText text={option.text} />
                          </span>
                          {isRight && (
                            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                              <Check className="h-3.5 w-3.5 text-current" /> Correta
                            </span>
                          )}
                          {isWrong && (
                            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400">
                              <XCircle className="h-3.5 w-3.5 text-current" /> Sua resposta
                            </span>
                          )}
                        </button>
                        {canStrike && !answered && (
                          <Hint content={isStruck ? "Desfazer risco" : "Riscar alternativa"}>
                            <Button
                              type="button"
                              variant={isStruck ? "secondary" : "ghost"}
                              size="sm"
                              className="min-h-11 shrink-0 gap-1.5 px-2"
                              disabled={answered || saving}
                              aria-pressed={isStruck}
                              aria-label={
                                isStruck
                                  ? `Desfazer risco da alternativa ${option.letter}`
                                  : `Riscar alternativa ${option.letter}`
                              }
                              onClick={() => toggleStrike(option.letter)}
                            >
                              <Strikethrough aria-hidden="true" className="h-4 w-4" />
                            </Button>
                          </Hint>
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
                  <div key={answer} className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      aria-pressed={selected === answer}
                      disabled={answered || saving}
                      onClick={() => chooseOption(answer)}
                      className={cn(
                        "trainer-verdict min-w-0 flex-1",
                        !answered && struck.includes(answer) && "is-eliminated",
                        selected === answer && !answered && "is-selected",
                        answered && answer === question.answer && "is-correct",
                        answered &&
                          selected === answer &&
                          answer !== question.answer &&
                          "is-incorrect",
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
                      <span className={cn(!answered && struck.includes(answer) && "line-through")}>
                        {labelFor(answer)}
                      </span>
                      {answered && (answer === question.answer || selected === answer) && (
                        <span className="trainer-verdict__outcome">
                          {answer === question.answer ? (
                            <Check aria-hidden="true" size={14} className="text-current" />
                          ) : (
                            <XCircle aria-hidden="true" size={14} className="text-current" />
                          )}
                          {answer === question.answer ? "Gabarito" : "Sua resposta"}
                        </span>
                      )}
                    </button>
                    {canStrike && !answered && (
                      <Button
                        type="button"
                        variant={struck.includes(answer) ? "secondary" : "ghost"}
                        size="sm"
                        className="min-h-11 shrink-0 gap-1.5 px-2"
                        disabled={saving}
                        aria-pressed={struck.includes(answer)}
                        aria-label={`${struck.includes(answer) ? "Desfazer risco de" : "Riscar"} ${labelFor(answer)}`}
                        onClick={() => toggleStrike(answer)}
                      >
                        <Strikethrough aria-hidden="true" className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {answered && (
                <AnswerFeedback
                  selected={selected ? labelFor(selected) : "—"}
                  answer={labelFor(question.answer)}
                  correct={isCorrect}
                  sourceLabel={question.source === "official" ? "Gabarito oficial" : "Gabarito"}
                  elapsedSeconds={shownSeconds}
                >
                  {!isPlaceholderExplanation(explanation.main) && (
                    <QuestionProse
                      text={
                        explanation.main.length > 420
                          ? `${explanation.main.slice(0, 420)}…`
                          : explanation.main
                      }
                    />
                  )}
                </AnswerFeedback>
              )}
              <div className="trainer-answer-actions">
                <Button
                  variant="outline"
                  disabled={index === 0 || saving}
                  onClick={() => goTo(index - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Questão anterior
                </Button>
                {!answered ? (
                  <>
                    <Button variant="outline" disabled={saving} onClick={skipQuestion}>
                      <SkipForward className="mr-2 h-4 w-4" aria-hidden="true" />
                      Pular questão
                    </Button>
                    <Button
                      size="lg"
                      disabled={!selected || saving || (reachedDailyLimit && !nonScoring)}
                      onClick={submit}
                      className="trainer-main-action"
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
                    <Button size="lg" onClick={next} className="trainer-main-action">
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
                    <QuestionSocialPanel
                      questionId={question.id}
                      questionSource={question.source}
                    />
                  )}
                </details>
              )}
            </CardContent>
          </Card>
        </div>
        <aside className="trainer-session-overview">
          <TrainerSessionMap
            total={questions.length}
            index={index}
            results={results}
            saving={saving}
            onSelect={goTo}
          />
        </aside>
      </div>
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="trainer-map-window">
          <DialogTitle>Mapa da sessão</DialogTitle>
          <DialogDescription>
            Consulte o progresso e retome uma questão já liberada.
          </DialogDescription>
          <TrainerSessionMap
            total={questions.length}
            index={index}
            results={results}
            saving={saving}
            onSelect={goTo}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={modal !== null && supportAvailable}
        onOpenChange={(open) => !open && setModal(null)}
      >
        <DialogContent className="trainer-learning-window">
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
            <div className="trainer-learning-body">
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
                  <QuestionProse text={explanation.main} className="text-sm" />
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
  currency: string;
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
  setCurrency: (value: string) => void;
  setState: (value: string) => void;
  setCategory: (value: string) => void;
  setArea: (value: string) => void;
  setTopic: (value: string) => void;
  setLimit: (value: string) => void;
  setOrderMode: (value: OrderMode) => void;
};

function TrainerSetup({
  practiceModes,
  loading,
  lockedSubject,
  lockedCollection,
  available,
  dailyRemaining,
  newAnswersRemaining,
  choices,
  facets,
  currencyLocked,
  values,
  setters,
  start,
}: {
  practiceModes: React.ReactNode;
  loading: boolean;
  lockedSubject: string | null;
  lockedCollection: "enem" | "contests" | null;
  currencyLocked: boolean;
  available: number;
  dailyRemaining?: number | undefined;
  newAnswersRemaining?: number | undefined;
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
    currencies: string[];
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
    if (!lockedSubject) setters.setSubject("all");
    setters.setSource("all");
    setters.setReviewed("all");
    setters.setDifficulty("all");
    setters.setCurrency("all");
    setters.setState("all");
    setters.setCategory("all");
    setters.setArea("all");
    setters.setTopic("all");
  };
  const selected = Object.entries(values).filter(
    ([key, value]) => !["limit", "orderMode"].includes(key) && value !== "all",
  );
  return (
    <div className="trainer-configuration">
      <section className="trainer-config-card" aria-labelledby="trainer-content-title">
        <header className="trainer-config-heading">
          <span>
            <BookOpenCheck aria-hidden="true" />
          </span>
          <div>
            <h2 id="trainer-content-title">O que você quer estudar?</h2>
            <p>Escolha os filtros e o modo de prática.</p>
          </div>
        </header>
        <fieldset className="trainer-collection">
          <legend>Área de preparação</legend>
          <div>
            {(["contests", "enem"] as const).map((collection) => {
              const active = isEnemContest(values.contest) === (collection === "enem");
              return (
                <button
                  key={collection}
                  type="button"
                  data-preparation={collection}
                  aria-pressed={active}
                  disabled={!!lockedCollection && collection !== lockedCollection}
                  title={
                    lockedCollection && collection !== lockedCollection
                      ? "Abra o Treinador de questões pela barra lateral para mudar a área de preparação."
                      : undefined
                  }
                  aria-label={collection === "enem" ? "ENEM" : "Concursos públicos"}
                  onClick={() => {
                    if (active || (lockedCollection && collection !== lockedCollection)) return;
                    reset();
                    setters.setContest(collection === "enem" ? "ENEM" : "all");
                  }}
                >
                  <span
                    className="trainer-collection__art"
                    aria-hidden="true"
                    style={{ backgroundImage: `url("${preparationAreasArt}")` }}
                  />
                  {collection === "enem" ? (
                    <GraduationCap aria-hidden="true" />
                  ) : (
                    <ShieldCheck aria-hidden="true" />
                  )}
                  <span>
                    {collection === "enem" ? "ENEM" : "Concursos públicos"}
                    <small>
                      {collection === "enem"
                        ? "Somente questões do exame"
                        : "Bancas, cargos e editais"}
                    </small>
                  </span>
                  {active && <CheckCircle2 aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </fieldset>
        {lockedCollection && (
          <p className="trainer-scope-note">
            Área vinculada a este treino. Para mudar, abra o Treinador de questões pela barra
            lateral.
          </p>
        )}
        {values.area !== "all" && (
          <p className="trainer-scope-note">
            Área do cronograma: <strong>{values.area}</strong>
            <button
              type="button"
              onClick={() => {
                setters.setArea("all");
                setters.setTopic("all");
              }}
            >
              Remover
            </button>
          </p>
        )}
        {practiceModes}
        <div className="trainer-filter-grid">
          {lockedSubject ? (
            <div
              className="trainer-field trainer-fixed-discipline"
              role="group"
              aria-label="Disciplina fixa neste treino"
            >
              <span className="trainer-field__label">Disciplina</span>
              <div>
                <strong>{lockedSubject}</strong>
                <Lock aria-hidden="true" />
              </div>
              <p>
                Para trocar de disciplina, abra <strong>Treinador de questões</strong> na barra
                lateral.
              </p>
            </div>
          ) : (
            <TrainerFilter
              label="Disciplina"
              value={values.subject}
              setValue={setters.setSubject}
              options={choices.subjects}
              counts={facets.counts["subject"]}
              allCount={facets.totals["subject"]}
              allLabel="Todas as disciplinas"
            />
          )}
          <TrainerFilter
            label="Assunto"
            value={values.topic}
            setValue={setters.setTopic}
            options={choices.topics}
            counts={facets.counts["topic"]}
            allCount={facets.totals["topic"]}
            labels={Object.fromEntries(
              choices.topics.map((value) => [value, topicFilterLabel(value)]),
            )}
            allLabel="Todos os assuntos"
          />
          {!isEnemContest(values.contest) && (
            <TrainerFilter
              label="Banca"
              value={values.board}
              setValue={setters.setBoard}
              options={choices.boards}
              counts={facets.counts["board"]}
              allCount={facets.totals["board"]}
              allLabel="Todas as bancas"
            />
          )}
          <TrainerFilter
            label="Ano"
            value={values.year}
            setValue={setters.setYear}
            options={choices.years}
            counts={facets.counts["year"]}
            allCount={facets.totals["year"]}
            allLabel="Todos os anos"
          />
        </div>
        <details
          className="trainer-refinements"
          open={
            [
              "contest",
              "career",
              "currency",
              "appliedExam",
              "source",
              "reviewed",
              "difficulty",
              "state",
              "category",
            ].some((key) => values[key as keyof SetupValues] !== "all") || undefined
          }
        >
          <summary>
            <SlidersHorizontal aria-hidden="true" />
            <span>
              Mais filtros
              <small>Concurso, cargo, atualidade, origem e dificuldade</small>
            </span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className="trainer-filter-grid">
            <TrainerFilter
              label="Concurso / material de origem"
              description="De onde vêm as questões: órgão do concurso ou material de estudo."
              allLabel="Todos os concursos e materiais"
              value={values.contest}
              setValue={setters.setContest}
              options={choices.contests}
              counts={facets.counts["contest"]}
              allCount={facets.totals["contest"]}
              labels={Object.fromEntries(
                choices.contests.map((value) => [value, questionContestOptionLabel(value)]),
              )}
              hideAll={isEnemContest(values.contest)}
            />
            {!isEnemContest(values.contest) && (
              <TrainerFilter
                label="Cargo da prova"
                description="Função disputada, como Agente, Escrivão ou Perito. Apenas cargos identificados."
                value={values.career}
                setValue={setters.setCareer}
                options={choices.careers}
                counts={facets.counts["career"]}
                allCount={facets.totals["career"]}
                allLabel="Qualquer cargo"
              />
            )}
            {currencyLocked ? (
              <div
                role="note"
                className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground"
              >
                <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Atualidade</strong>: conteúdo novo e em alta
                  nas provas, a partir do plano Essencial.{" "}
                  <Link
                    to="/dashboard/subscriptions"
                    className="font-semibold text-primary underline"
                  >
                    Ver planos
                  </Link>
                </span>
              </div>
            ) : (
              <TrainerFilter
                label="Atualidade"
                value={values.currency}
                setValue={setters.setCurrency}
                options={["recent", ...choices.currencies]}
                labels={{ recent: "Tudo que é atual" }}
                counts={facets.counts["currency"]}
                allCount={facets.totals["currency"]}
                allLabel="Todas as questões"
              />
            )}
            <TrainerFilter
              label="Prova aplicada"
              value={values.appliedExam}
              setValue={setters.setAppliedExam}
              options={choices.exams.map(([key]) => key)}
              labels={Object.fromEntries(choices.exams)}
              counts={facets.counts["exam"]}
              allCount={facets.totals["exam"]}
            />
            <TrainerFilter
              label="Origem"
              value={values.source}
              setValue={setters.setSource}
              options={["official", "curated", "personal"]}
              labels={{
                official: "Provas oficiais",
                curated: "Autorais e repertório de estudo",
                personal: "Meu caderno",
              }}
              counts={facets.counts["source"]}
              allCount={facets.totals["source"]}
            />
            <TrainerFilter
              label="Dificuldade"
              value={values.difficulty}
              setValue={setters.setDifficulty}
              options={["fácil", "média", "difícil"]}
              labels={{ fácil: "Fácil", média: "Média", difícil: "Difícil" }}
              counts={facets.counts["difficulty"]}
              allCount={facets.totals["difficulty"]}
            />
            <TrainerFilter
              label="Explicação didática"
              value={values.reviewed}
              setValue={setters.setReviewed}
              options={["reviewed"]}
              labels={{ reviewed: "Com explicação e exemplo" }}
              counts={facets.counts["reviewed"]}
              allCount={facets.totals["reviewed"]}
            />
            <TrainerFilter
              label="Estado"
              value={values.state}
              setValue={setters.setState}
              options={choices.states}
              counts={facets.counts["state"]}
              allCount={facets.totals["state"]}
            />
            <TrainerFilter
              label="Categoria"
              value={values.category}
              setValue={setters.setCategory}
              options={choices.categories}
              counts={facets.counts["category"]}
              allCount={facets.totals["category"]}
            />
          </div>
        </details>
        <div className="trainer-filter-footer">
          <span>
            {selected.length
              ? `${selected.length} ${selected.length === 1 ? "critério aplicado" : "critérios aplicados"}`
              : "Nenhum filtro adicional aplicado"}
          </span>
          <button type="button" onClick={reset}>
            <RotateCcw aria-hidden="true" />
            Limpar filtros
          </button>
        </div>
      </section>
      <aside className="trainer-session-builder" aria-labelledby="trainer-session-title">
        <h2 id="trainer-session-title">Configurar sessão</h2>
        <div className="trainer-stock">
          <strong>{loading ? "…" : available.toLocaleString("pt-BR")}</strong>
          <span>questões disponíveis neste modo</span>
        </div>
        <TrainerFilter
          label="Quantidade"
          value={values.limit}
          setValue={setters.setLimit}
          options={["5", "10", "20", "30", "50", "all"]}
          labels={{ all: "Todas as questões da seleção" }}
          hideAll
        />
        <QuestionFilterPicker
          label="Ordem das questões"
          value={values.orderMode}
          onChange={(value) => setters.setOrderMode(value as OrderMode)}
          options={["random", "exam"]}
          labels={{ random: "Ordem aleatória", exam: "Ordem do acervo" }}
          hideAll
        />
        <div className="trainer-start-bar">
          <p>
            {loading
              ? "Conferindo as questões disponíveis…"
              : dailyRemaining === 0
                ? "Limite de novas respostas atingido hoje"
                : sessionSize
                  ? `${sessionSize} ${sessionSize === 1 ? "questão" : "questões"} nesta sessão`
                  : "Nenhuma questão para estes filtros"}
          </p>
          {newAnswersRemaining !== undefined && (
            <small>
              {newAnswersRemaining} novas respostas disponíveis hoje. Revisões não consomem esse
              limite.
            </small>
          )}
          <Button
            disabled={loading || !sessionSize}
            onClick={start}
            className="trainer-main-action"
          >
            <span>Começar sessão</span>
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </aside>
    </div>
  );
}

function TrainerFilter({
  label,
  description,
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
  description?: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
  allLabel?: string;
  hideAll?: boolean;
}) {
  return (
    <QuestionFilterPicker
      label={label}
      description={description}
      value={value}
      onChange={setValue}
      options={options}
      labels={labels}
      counts={counts}
      allCount={allCount}
      allLabel={allLabel}
      hideAll={hideAll}
      quantity={label === "Quantidade"}
    />
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
  review,
  mixed,
  correct,
  wrong,
  skipped,
  restart,
  reviewFirstError,
  reviewFirstSkipped,
}: {
  total: number;
  review: boolean;
  mixed: boolean;
  correct: number;
  wrong: number;
  skipped: number;
  restart: () => void;
  reviewFirstError: () => void;
  reviewFirstSkipped: () => void;
}) {
  const answered = correct + wrong;
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
  return (
    <section
      className="trainer-workbench trainer-results question-workspace"
      aria-labelledby="trainer-result-title"
    >
      <header className="trainer-result-header">
        <span>
          <CheckCircle2 aria-hidden="true" />
        </span>
        <div>
          <p className="trainer-panel-kicker">RESULTADOS DESTA SESSÃO</p>
          <h1 id="trainer-result-title" tabIndex={-1}>
            Treino concluído
          </h1>
          <p>Confira suas respostas e escolha o próximo passo.</p>
        </div>
      </header>
      <div className="trainer-result-layout">
        <section className="trainer-result-score" aria-label="Resumo do treino">
          <span>Aproveitamento nesta sessão</span>
          <strong>{accuracy}%</strong>
          <progress value={accuracy} max={100} aria-label="Percentual de acertos da sessão" />
          <dl>
            <div>
              <dt>Acertos</dt>
              <dd>{correct}</dd>
            </div>
            <div>
              <dt>Erros</dt>
              <dd>{wrong}</dd>
            </div>
            <div>
              <dt>Puladas (sem resposta)</dt>
              <dd>{skipped}</dd>
            </div>
            <div>
              <dt>Questões</dt>
              <dd>{total}</dd>
            </div>
          </dl>
          <p>
            {mixed
              ? "Primeiras respostas registram seu desempenho. Questões já respondidas são revisões e não pontuam novamente."
              : review
                ? "Sessão de revisão: suas primeiras respostas permanecem como registro oficial, sem nova pontuação."
                : "Suas respostas foram registradas no desempenho."}
          </p>
        </section>
        <section className="trainer-result-next">
          <h2>Transforme o treino em aprendizado</h2>
          <p>
            {wrong
              ? "Retome o primeiro erro, confira o raciocínio e use o mapa para localizar as outras respostas que merecem revisão."
              : "Você concluiu esta seleção. Consulte sua evolução ou configure outra sessão para continuar praticando."}
          </p>
          {skipped > 0 && (
            <>
              <p>
                {skipped} {skipped === 1 ? "questão foi pulada" : "questões foram puladas"}: não
                contam como erro nem geram pontos. Elas estão em Meus cadernos → Estudar depois.
              </p>
              <Button variant="outline" onClick={reviewFirstSkipped}>
                <SkipForward className="mr-2 h-4 w-4" />
                Voltar às questões puladas
              </Button>
              <Button asChild variant="outline">
                <Link to="/dashboard/notebooks">Abrir Estudar depois</Link>
              </Button>
            </>
          )}
          {wrong > 0 && (
            <Button variant="outline" onClick={reviewFirstError}>
              <BookOpenCheck className="mr-2 h-4 w-4" />
              Rever o primeiro erro
            </Button>
          )}
          <Button className="trainer-main-action" onClick={restart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Configurar novo treino
          </Button>
          <Link to="/dashboard/performance">
            Ver meu desempenho
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </div>
    </section>
  );
}

function TrainerContextBanner({
  discipline,
  topic,
  automatic,
  setup = false,
}: {
  discipline: string;
  topic: string;
  automatic: boolean;
  setup?: boolean;
}) {
  return (
    <div
      className="trainer-context"
      aria-label={
        setup ? "Disciplina e assunto selecionados" : "Disciplina e assunto da questão atual"
      }
      aria-live="polite"
      aria-atomic="true"
    >
      <div>
        <span>{setup ? "Disciplina selecionada" : "Disciplina desta questão"}</span>
        <strong>{discipline}</strong>
      </div>
      <div>
        <span>{setup ? "Assunto selecionado" : "Assunto desta questão"}</span>
        <strong>{topic}</strong>
        {automatic && <small>Identificado automaticamente pelo enunciado</small>}
      </div>
      {setup && <p>Escolha o assunto nos filtros abaixo ou confirme para iniciar o treino.</p>}
    </div>
  );
}
