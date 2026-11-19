import { SmartBackLink } from "@/components/dashboard/SmartBackLink";
import { examOriginLabel } from "@/lib/examLabel";
import * as React from "react";
import {
  trainerRouteKey,
  restoreTrainerBookmark,
  type TrainerBookmark,
} from "@/lib/internalNavigation";
import { legalLibraryEntry, questionMatchesLaw } from "@/lib/legalLibrary";
import { createFileRoute, Link, useBlocker, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Briefcase,
  CalendarDays,
  Clock3,
  Database,
  FileText,
  Gauge,
  Landmark,
  Layers,
  MapPin,
  Shuffle,
  Tags,
  Trophy,
  BookmarkCheck,
  BookOpenCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ListOrdered,
  Lock,
  Loader2,
  LogOut,
  Pause,
  Play,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  RotateCcw,
  Settings2,
  SkipForward,
  Sparkles,
  Strikethrough,
  Target,
  TrendingUp,
  X,
  Timer,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { useLockedAnswers } from "@/hooks/useLockedAnswers";
import { useReinforcement } from "@/hooks/useReinforcement";
import {
  enqueuePendingAnswer,
  flushPendingAnswers,
  insertTrainerAnswer,
  readPendingAnswers,
  type TrainerAnswerRow,
} from "@/lib/trainerAnswerQueue";
import { questionIdentity } from "@/lib/questionIdentity";
import { normalizeTrainerQuestionQuantity, trainerQuestionQuantityOptions } from "@/lib/trainerSession";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  filterTrainerQuestions,
  trainerBoard,
  trainerFilterFacets,
  trainerPracticeQuestions,
} from "@/lib/trainerFilters";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { materialPracticePool, type MaterialPracticeScope } from "@/lib/materialPractice";
import { canOpenTrainerLearning, relatedTrainerMaterials } from "@/lib/trainerLearning";
import { TrainerLearningMaterials } from "@/components/dashboard/TrainerLearningMaterials";
import { QuestionFigures } from "@/components/dashboard/QuestionFigures";
import { QuestionSocialPanel } from "@/components/dashboard/QuestionSocialPanel";
import { ReportQuestionButton } from "@/components/dashboard/ReportQuestionButton";
import { BackToEdital } from "@/components/pcAcreVerticalizado/BackToEdital";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import "@/styles/trainer-success-feedback.css";
import "@/styles/learning-workspace-refinement.css";

import "@/styles/question-trainer-experience.css";
import "@/styles/question-filter-contrast.css";
import "@/styles/question-practice-workspaces.css";
import "@/styles/student-assessment-workspaces.css";
import "@/styles/question-trainer-professional-refinement.css";
import "@/styles/question-trainer-wide.css";
import "@/styles/question-trainer-viewport.css";
import "@/styles/trainer-mobile-refine.css";
import "@/styles/trainer-paused.css";
import "@/styles/trainer-exam-focus.css";
import "@/styles/trainer-setup-studio.css";
import "@/styles/trainer-setup-focus-layout.css";
import "@/styles/trainer-session-qt4.css";
import "@/styles/trainer-session-frame.css";
import { useEditalIncidence } from "@/hooks/useEditalIncidence";
import { PCAC_INCIDENCE_ITEMS } from "@/lib/pcAcIncidenceItems";
import {
  EXAM_FOCUS_LABEL,
  countByExamFocus,
  examPotential,
  matchesExamFocus,
  prioritizeByPotential,
  type ExamFocus,
} from "@/lib/examPotential";
import { Hint } from "@/components/ui/hint";
import { useWorkspaceFullscreen } from "@/hooks/useWorkspaceFullscreen";

export const Route = createFileRoute("/dashboard/question-trainer")({
  head: () => ({
    meta: [
      { title: "Treinador de questões | Norte Concursos" },
      {
        name: "description",
        content:
          "Treine questões de concursos por banca, cargo e disciplina na sua preparação Norte Concursos.",
      },
      { property: "og:title", content: "Treinador de questões | Norte Concursos" },
      {
        property: "og:description",
        content: "Sua sessão de questões de concursos por banca, cargo e disciplina.",
      },
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
      | "reinforce"
      | "studySubject"
      | "materialTopic"
      | "studyArticle"
      | "back"
      | "relevance",
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
    studySubject: typeof search["studySubject"] === "string" ? search["studySubject"] : undefined,
    materialTopic:
      typeof search["materialTopic"] === "string" ? search["materialTopic"] : undefined,
    studyArticle: typeof search["studyArticle"] === "string" ? search["studyArticle"] : undefined,
    back: typeof search["back"] === "string" ? search["back"] : undefined,
    relevance: typeof search["relevance"] === "string" ? search["relevance"] : undefined,
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
  const [relevance, setRelevance] = React.useState(routeFilters.relevance || "all");
  const {
    catalog: fullCatalog,
    loading: catalogLoading,
    error,
    reload: reloadCatalog,
  } = useQuestionCatalog(userId, canLoad);
  const law = routeFilters.law;
  const scoped = React.useMemo(
    () => (law === undefined ? fullCatalog : fullCatalog.filter((q) => questionMatchesLaw(q, law))),
    [fullCatalog, law],
  );
  const materialScope = React.useMemo<MaterialPracticeScope>(
    () => ({
      ...(routeFilters.studySubject ? { subject: routeFilters.studySubject } : {}),
      ...(routeFilters.materialTopic ? { topic: routeFilters.materialTopic } : {}),
      ...(law ? { law } : {}),
      ...(routeFilters.studyArticle ? { article: routeFilters.studyArticle } : {}),
    }),
    [routeFilters.studySubject, routeFilters.materialTopic, law, routeFilters.studyArticle],
  );
  const hasMaterialScope = Boolean(
    routeFilters.studySubject || routeFilters.materialTopic || routeFilters.studyArticle,
  );
  const materialCatalog = React.useMemo(
    () => (hasMaterialScope ? materialPracticePool(scoped, materialScope) : scoped),
    [scoped, materialScope, hasMaterialScope],
  );
  // PC-AC OIP: somente questões vinculadas a tópicos do edital ativo do cargo.
  // Itens sem vínculo verificável permanecem no acervo geral, mas não entram neste recorte.
  const catalog = materialCatalog;
  const library = useStudyMaterialList(canLoad);
  const { locked, loading: lockedLoading, markLocked } = useLockedAnswers(userId, canLoad, catalog);
  const { reinforced, markReinforced } = useReinforcement(userId, canLoad);
  const practiceMode = routeFilters.mode === "reforco";
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [started, setStarted] = React.useState(false);
  const pendingRowRef = React.useRef<TrainerAnswerRow | null>(null);
  const [pendingAnswers, setPendingAnswers] = React.useState(0);
  const retryPendingAnswers = React.useCallback(async () => {
    if (!userId) return;
    const left = await flushPendingAnswers(userId);
    setPendingAnswers(left);
    if (!left) toast.success("Respostas salvas.");
  }, [userId]);
  React.useEffect(() => {
    if (!userId) return;
    const sync = () => {
      if (!readPendingAnswers(userId).length) return;
      void flushPendingAnswers(userId).then(setPendingAnswers);
    };
    setPendingAnswers(readPendingAnswers(userId).length);
    sync();
    window.addEventListener("online", sync);
    const timer = window.setInterval(sync, 30_000);
    return () => {
      window.removeEventListener("online", sync);
      window.clearInterval(timer);
    };
  }, [userId]);
  React.useEffect(() => {
    const root = document.documentElement;
    const nav = document.querySelector<HTMLElement>(".app-bottom-nav");
    if (!nav || typeof ResizeObserver === "undefined") return;
    // The fixed bottom nav's real height varies by device/safe-area; the trainer dock sits right above it.
    const sync = () => {
      const visible = getComputedStyle(nav).display !== "none";
      const offset = visible
        ? Math.max(0, Math.ceil(window.innerHeight - nav.getBoundingClientRect().top))
        : 0;
      root.style.setProperty("--trainer-dock-bottom", `${offset}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(nav);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
      root.style.removeProperty("--trainer-dock-bottom");
    };
  }, []);
  const [contest, setContest] = React.useState(routeFilters.contest || "all");
  const [board, setBoard] = React.useState(trainerBoard(routeFilters.board));
  const [career, setCareer] = React.useState(canonicalCareerName(routeFilters.career) || "all");
  const [year, setYear] = React.useState(routeFilters.year || "all");
  const [appliedExam, setAppliedExam] = React.useState("all");
  const [subject, setSubject] = React.useState(
    canonicalSubject(routeFilters.studySubject ?? routeFilters.subject) || "all",
  );
  const [source, setSource] = React.useState(routeFilters.source || "all");
  const [reviewed, setReviewed] = React.useState(routeFilters.reviewed || "all");
  const [state, setState] = React.useState(routeFilters.state || "all");
  const [category, setCategory] = React.useState(routeFilters.category || "all");
  // Vindos do cronograma: matéria do plano (pode juntar várias do banco) e assunto classificado por palavras-chave.
  const [area, setArea] = React.useState(routeFilters.area || "all");
  const [topic, setTopic] = React.useState(
    routeFilters.materialTopic || routeFilters.topic || "all",
  );
  const autoStart = React.useRef(routeFilters.go === "1");
  const [difficulty, setDifficulty] = React.useState("all");
  const [limit, setLimit] = React.useState("20");
  const [orderMode, setOrderMode] = React.useState<OrderMode>("random");
  const [examFocus, setExamFocus] = React.useState<ExamFocus>("off");
  const [includeAnswered, setIncludeAnswered] = React.useState(false);
  const loading = catalogLoading || lockedLoading;
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [struck, setStruck] = React.useState<Answer[]>([]);
  const [saving, setSaving] = React.useState(false);
  const savingRef = React.useRef(false);
  const workspaceFs = useWorkspaceFullscreen(true);
  const responseIdRef = React.useRef(crypto.randomUUID());
  const [answered, setAnswered] = React.useState(false);
  const [responseSeconds, setResponseSeconds] = React.useState<number | null>(null);
  const [successFeedback, setSuccessFeedback] = React.useState(false);
  const successTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearSuccessFeedback = React.useCallback(() => {
    if (successTimer.current !== null) clearTimeout(successTimer.current);
    successTimer.current = null;
    setSuccessFeedback(false);
  }, []);
  React.useEffect(
    () => () => {
      if (successTimer.current !== null) clearTimeout(successTimer.current);
    },
    [],
  );

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
  // Tentar sair do Treinador (home, outro menu, outra aba da área) com um treino em andamento
  // pede confirmação em vez de perder a sessão silenciosamente; o relógio pausa enquanto a
  // confirmação está na tela e volta a contar de onde parou se o aluno decidir continuar.
  const blocker = useBlocker({
    shouldBlockFn: ({ current, next }) => started && current.routeId !== next.routeId,
    // Sem aviso nativo do navegador ao recarregar: a sessão é guardada e retomada automaticamente.
    enableBeforeUnload: false,
    withResolver: true,
  });
  React.useEffect(() => {
    if (blocker.status === "blocked") setPausedAt(Date.now());
  }, [blocker.status]);
  const [userPaused, setUserPaused] = React.useState(false);
  const pauseByUser = () => {
    setPausedAt((value) => value ?? Date.now());
    setUserPaused(true);
  };
  const resumeFromPause = () => {
    if (pausedAt) {
      setStartedAt((value) => value + (Date.now() - pausedAt));
      setPausedAt(null);
    }
  };
  const resumeUserPause = () => {
    setUserPaused(false);
    resumeFromPause();
  };
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
  // A sessão em andamento fica guardada a cada alteração (resposta, pulo, marcação, posição), para
  // sobreviver a recarregar a página. Só sai do aparelho quando o aluno confirma "Sair do treino".
  React.useEffect(() => {
    const saved = bookmarkRef.current;
    if (!saved) return;
    try {
      localStorage.setItem(`trainer-bookmark:${saved.userId}`, JSON.stringify(saved.value));
    } catch {
      /* Armazenamento indisponível: a prova segue, só não é retomada após recarregar. */
    }
  });
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
    setSubject(canonicalSubject(routeFilters.studySubject ?? routeFilters.subject) || "all");
    setSource(routeFilters.source || "all");
    setReviewed(routeFilters.reviewed || "all");
    setState(routeFilters.state || "all");
    setCategory(routeFilters.category || "all");
    setArea(routeFilters.area || "all");
    setTopic(routeFilters.materialTopic || routeFilters.topic || "all");
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
    routeFilters.studySubject,
    routeFilters.source,
    routeFilters.reviewed,
    routeFilters.state,
    routeFilters.category,
    routeFilters.area,
    routeFilters.topic,
    routeFilters.materialTopic,
    routeFilters.studyArticle,
    routeFilters.go,
  ]);
  React.useEffect(() => {
    if (!pendingRestore.current || loading || error || !userId) return;
    pendingRestore.current = false;
    try {
      const storageKey = `trainer-bookmark:${userId}`;
      const raw = localStorage.getItem(storageKey) ?? sessionStorage.getItem(storageKey);
      if (!raw) return;
      const restored = restoreTrainerBookmark(JSON.parse(raw), routeKey, catalog);
      if (!restored) return;
      const b = restored.bookmark;
      setQuestions(restored.questions);
      setIndex(b.index);
      setResults(b.results);
      setSelected(b.selected as Answer | null);
      setStruck(b.struck as Answer[]);
      // O treino fica "pausado" enquanto o aluno está fora desta área: o relógio não deve
      // contar o tempo entre sair e voltar, só o tempo de fato gasto respondendo.
      setStartedAt(b.startedAt + Math.max(0, Date.now() - b.savedAt));
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
    () =>
      practiceMode
        ? trainerPracticeQuestions(catalog, "wrong", locked, reinforced)
        : includeAnswered
          ? catalog
          : trainerPracticeQuestions(catalog, "new", locked, reinforced),
    [catalog, includeAnswered, locked, reinforced, practiceMode],
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
          // Aderência ao edital limita as questões do treino, mas não deve ocultar
          // bancas, disciplinas ou demais opções do acervo geral nos seletores.
          relevance: "all",
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
  const basePool = React.useMemo(
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
          relevance,
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
      relevance,
    ],
  );
  // Foco na prova: só existe quando o aluno ativou um edital com indicação de chance (PC-AC).
  const chance = useEditalIncidence(userId, PCAC_INCIDENCE_ITEMS, true);
  const potential = React.useMemo(
    () =>
      chance.incidence
        ? examPotential(trainingCatalog, PCAC_INCIDENCE_ITEMS, chance.incidence, topicOf)
        : null,
    [chance.incidence, trainingCatalog, topicOf],
  );
  const focusCounts = React.useMemo(
    () => (potential ? countByExamFocus(basePool, potential) : null),
    [potential, basePool],
  );
  const activeFocus: ExamFocus = potential ? examFocus : "off";
  const pool = React.useMemo(
    () =>
      activeFocus === "off" || !potential
        ? basePool
        : basePool.filter((q) => matchesExamFocus(activeFocus, potential.get(q.id))),
    [basePool, activeFocus, potential],
  );
  const normalizedLimit = normalizeTrainerQuestionQuantity(limit, pool.length);
  React.useEffect(() => {
    if (loading || started || restoredSelection.current) return;
    if (normalizedLimit !== limit) setLimit(normalizedLimit);
  }, [loading, started, normalizedLimit, limit]);

  const startTraining = () => {
    responseIdRef.current = crypto.randomUUID();
    const arranged = orderMode === "random" ? shuffled(pool) : [...pool];
    // Com foco na prova, as mais prováveis vêm primeiro (e, no mesmo grau, a ordem escolhida).
    const ordered = activeFocus !== "off" && potential ? prioritizeByPotential(arranged, potential) : arranged;
    const requestedCount =
      normalizedLimit === "all"
        ? pool.length
        : Math.max(0, Math.min(pool.length, Math.floor(Number(normalizedLimit) || 0)));
    setQuestions(ordered.slice(0, requestedCount));
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setSupportNotice(false);
    setStartedAt(Date.now());
    setStarted(true);
  };
  // Durante o treino, a área da questão ocupa a tela inteira (sem menu lateral), sobretudo no celular.
  React.useEffect(() => {
    if (!started) return;
    document.dispatchEvent(new Event("norte:workspace-enter"));
    return () => { document.dispatchEvent(new Event("norte:workspace-exit")); };
  }, [started]);
  // Veio do cronograma com ?go=1: começa direto, com 10 questões do assunto, assim que houver questões.
  React.useEffect(() => {
    if (!autoStart.current || loading || started || pool.length === 0) return;
    autoStart.current = false;
    responseIdRef.current = crypto.randomUUID();
    setLimit(normalizeTrainerQuestionQuantity("10", pool.length));
    const ordered = shuffled(pool).slice(0, Math.min(pool.length, 10));
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
      const nextSaved = saved.includes(key)
        ? saved.filter((item) => item !== key)
        : [...saved, key];
      localStorage.setItem(savedQuestionsKey, JSON.stringify(nextSaved));
      setSavedForStudy(nextSaved.includes(key));
      toast.success(
        nextSaved.includes(key)
          ? "Questão salva para estudar depois."
          : "Questão removida dos estudos salvos.",
      );
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
    // No reforço, a fila já é só de questões erradas (e ainda não reforçadas com
    // sucesso): mostrar a resposta antiga aqui impediria qualquer nova tentativa.
    const past = practiceMode ? undefined : locked.get(questionIdentity(question));
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
      setResponseSeconds(null);
      setReviewingPast(false);
      setSupportNotice(false);
      setStruck([]);
      setStartedAt(Date.now());
      setPausedAt(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só deve rodar quando a questão exibida muda (ou quando o histórico termina de carregar)
  }, [index, question?.id, question?.source, lockedLoading, practiceMode]);
  const finishAnswer = (elapsedSeconds: number, isCorrect: boolean, answer: Answer) => {
    if (!question) return;
    setResponseSeconds(elapsedSeconds);
    setAnswered(true);
    // Reforço nunca conta para o limite diário, o ranking nem as medalhas — só a 1ª resposta oficial.
    if (practiceMode) {
      markReinforced(question.source, question.id, isCorrect);
    } else {
      setDailyUsed((n) => n + 1);
      markLocked(question, { selected: answer, isCorrect });
    }
    setResults((prev) => {
      const copy = [...prev];
      copy[index] = isCorrect ? "ok" : "err";
      return copy;
    });
    if (!isCorrect) {
      setModal("result");
    } else {
      clearSuccessFeedback();
      setSuccessFeedback(true);
      // Duração suficiente para leitura; saída automática sem clique.
      // O timer é cancelado se o usuário navegar manualmente.
      successTimer.current = setTimeout(() => {
        successTimer.current = null;
        next();
      }, 3500);
    }
  };
  const submit = async () => {
    if (
      !selected ||
      !question ||
      answered ||
      !user ||
      savingRef.current ||
      (reachedDailyLimit && !practiceMode) ||
      lockedLoading
    )
      return;
    savingRef.current = true;
    setSaving(true);
    const isCorrect = selected === question.answer;
    const elapsedSeconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
    if (practiceMode) {
      // Tentativa de reforço: guarda em tabela própria, nunca na resposta oficial
      // (question_training_responses), que é imutável e já tem a 1ª resposta.
      try {
        const { error } = await supabase.from("question_reinforcement_attempts").insert({
          user_id: user.id,
          question_id: question.id,
          question_source: question.source,
          contest_name: question.contest,
          board: question.board,
          subject: question.subject,
          selected_answer: selected,
          official_answer: question.answer,
          is_correct: isCorrect,
          response_seconds: elapsedSeconds,
        });
        if (error) throw error;
      } catch (error) {
        console.error("Falha ao gravar tentativa de reforço", error);
        toast.warning("Não foi possível salvar esta tentativa de reforço agora.");
      } finally {
        finishAnswer(elapsedSeconds, isCorrect, selected);
        savingRef.current = false;
        setSaving(false);
      }
      return;
    }
    try {
      const row: TrainerAnswerRow = {
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
        topic: questionTopic(question),
        response_seconds: elapsedSeconds,
      };
      pendingRowRef.current = row;
      const error = await insertTrainerAnswer(row);
      if (error) throw error;
      // A request may have succeeded before a network retry. A duplicate ID must
      // never UPDATE an immutable answer or be credited as a different question.
      const { data: stored, error: verifyError } = await supabase
        .from("question_training_responses")
        .select("id,user_id,question_id,question_source,question_table,selected_answer")
        .eq("id", responseIdRef.current)
        .eq("user_id", user.id)
        .maybeSingle();
      if (
        verifyError ||
        !stored ||
        stored.question_id !== question.id ||
        stored.question_source !== question.source ||
        stored.question_table !== question.table ||
        stored.selected_answer !== selected
      ) {
        responseIdRef.current = crypto.randomUUID();
        throw new Error("ANSWER_SAVE_NOT_CONFIRMED");
      }
      finishAnswer(elapsedSeconds, isCorrect, selected);
    } catch (error) {
      // Never show raw database internals to students. Surface known recoverable causes.
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? String((error as { code?: unknown }).code ?? "")
          : "";
      const detail =
        typeof error === "object" && error !== null && "details" in error
          ? String((error as { details?: unknown }).details ?? "")
          : "";
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message ?? "")
          : "";
      if (detail.includes("NORTE_SESSION_REPLACED")) {
        toast.error("Sua sessão foi substituída por outro login. Entre novamente para continuar.");
      } else if (code === "P0429") {
        toast.error("O limite de questões do seu plano foi atingido. Confira a renovação diária.");
      } else if (message.includes("Question origin is missing or ambiguous")) {
        toast.error(
          "Não foi possível identificar a origem da questão. Atualize a página e tente novamente.",
        );
      } else {
        console.error("Falha ao gravar resposta do treino", { code, message, detail });
        // Não trava o aluno: mostra o gabarito agora, guarda a resposta no aparelho e reenvia sozinho.
        const row = pendingRowRef.current;
        if (row) {
          enqueuePendingAnswer(row);
          setPendingAnswers(readPendingAnswers(row.user_id).length);
        }
        finishAnswer(elapsedSeconds, isCorrect, selected);
        toast.warning("Resposta mostrada, mas ainda não salva. Vamos reenviar sozinhos.", {
          action: { label: "Tentar novamente", onClick: () => void retryPendingAnswers() },
        });
      }
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };
  const goTo = (target: number) => {
    if (target < 0 || target > questions.length) return;
    clearSuccessFeedback();
    responseIdRef.current = crypto.randomUUID();
    setModal(null);
    setPausedAt(null);
    setResponseSeconds(null);
    setIndex(target);
  };
  const next = () => goTo(index + 1);
  const restart = () => {
    clearSuccessFeedback();
    responseIdRef.current = crypto.randomUUID();
    setIndex(0);
    setResults([]);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setResponseSeconds(null);
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
        <p className="text-xs text-muted-foreground">
          Em conexões instáveis isso pode acontecer sem o acervo estar indisponível de verdade.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => void reloadCatalog()}>Tentar novamente</Button>
          <Button asChild variant="outline">
            <SmartBackLink to="/dashboard/question-bank">Voltar ao banco</SmartBackLink>
          </Button>
        </div>
      </Center>
    );
  if (!started)
    return (
      <div className="space-y-4">
        <BackToEdital back={routeFilters.back} />
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
            limit: normalizedLimit,
            orderMode,
            includeAnswered,
            relevance,
          }}
          focus={
            potential && focusCounts
              ? { mode: activeFocus, setMode: setExamFocus, counts: focusCounts, label: chance.edital?.label ?? "" }
              : chance.edital && (chance.loading || chance.checking)
                ? { mode: "off", setMode: setExamFocus, counts: null, label: chance.edital.label }
                : null
          }
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
            setRelevance,
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
    <div className="nc-learning-workspace question-workspace trainer-session-shell trainer-reading-workspace qt2-session qt4 space-y-2.5 pb-4 sm:space-y-4 sm:pb-8">
      <QtFitViewport depKey={question.id} />
      <BackToEdital back={routeFilters.back} />
      {lawNotice}
      {successFeedback && (
        <div
          role="status"
          aria-live="polite"
          className="trainer-success-overlay pointer-events-none fixed inset-x-3 top-20 z-[80] flex justify-center sm:inset-x-6 sm:top-24"
        >
          <div className="trainer-success-message relative flex w-full max-w-[340px] items-center gap-3 overflow-hidden rounded-2xl border border-emerald-400/25 bg-[#112821]/95 px-4 py-3 text-white shadow-[0_16px_48px_rgba(0,0,0,.32)] backdrop-blur-lg animate-in fade-in slide-in-from-top-3 duration-300 motion-reduce:animate-none">
            <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="h-11 w-11 shrink-0">
              <circle cx="24" cy="24" r="22" fill="#1BAF83" fillOpacity=".17" />
              <circle cx="24" cy="24" r="16" fill="#24B487" />
              <path
                d="m17 24 5 5 10-11"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="21" stroke="#5EE1B6" strokeOpacity=".4" />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-emerald-200">
                Resposta correta
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-5">Muito bem! Você acertou.</p>
              <p className="mt-0.5 text-xs text-emerald-100/75">
                Avançando para a próxima questão…
              </p>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-emerald-200/15">
              <span className="trainer-success-progress block h-full w-full origin-left bg-emerald-400" />
            </span>
          </div>
        </div>
      )}
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
      {reachedDailyLimit && !practiceMode && (
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
      <Card
        className="question-window overflow-hidden border border-border bg-card text-foreground shadow-2xl ring-1 ring-amber-400/15 animate-in fade-in slide-in-from-bottom-3 duration-300"
        key={question.id}
      >
        <div className="qt2-strip">
          <span className="qt2-strip__title">Treinador de questões</span>
          <span className="qt2-strip__live">
            <i aria-hidden /> Correção imediata
          </span>
          <div className="qt2-strip__actions">
            <Hint content={userPaused ? "Retomar o treino e o cronômetro" : "Pausar o treino; o cronômetro para até você retomar"}>
              <Button
                variant="ghost"
                size="sm"
                className="qt2-strip__btn"
                aria-pressed={userPaused}
                onClick={userPaused ? resumeUserPause : pauseByUser}
              >
                {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {userPaused ? "Retomar" : "Pausar"}
              </Button>
            </Hint>
            <Hint content="Encerrar o treino; pedimos confirmação antes de sair">
              <Button
                variant="ghost"
                size="sm"
                className="qt2-strip__btn qt2-strip__btn--stop"
                onClick={() => setConfirmExit(true)}
              >
                <LogOut className="h-4 w-4" /> Encerrar
              </Button>
            </Hint>
          <Hint content={workspaceFs.active ? "Restaurar a janela (Esc)" : "Maximizar a tela"}>
            <Button
              variant="ghost"
              size="icon"
              className="qt2-strip__fs"
              aria-label={workspaceFs.active ? "Restaurar a janela" : "Maximizar a tela"}
              aria-pressed={workspaceFs.active}
              onClick={workspaceFs.active ? workspaceFs.exit : workspaceFs.enter}
            >
              {workspaceFs.active ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </Hint>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Mais opções do treino" data-hint="Configuração, desempenho e ranking">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStarted(false)}>
                <Settings2 className="mr-2 h-4 w-4" /> Configuração do treino
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/performance">
                  <TrendingUp className="mr-2 h-4 w-4" /> Análise de desempenho
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard/ranking"
                  search={{ section: "general", period: "all", page: 1, size: 20, q: "" }}
                >
                  <ListOrdered className="mr-2 h-4 w-4" /> Ranking de questões
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setConfirmExit(true)}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sair do treino
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        {userPaused && (
          <div className="qt2-paused" role="dialog" aria-modal="false" aria-label="Treino pausado">
            <Pause aria-hidden="true" />
            <strong>Treino pausado</strong>
            <p>Cronômetro parado. Toque em uma alternativa ou em Retomar para continuar.</p>
            <Button onClick={resumeUserPause} className="qt2-paused__resume">
              <Play className="mr-2 h-4 w-4" /> Retomar treino
            </Button>
          </div>
        )}
        <CardContent
          className={`trainer-reading-content p-3.5 sm:p-5 md:p-7${userPaused ? " qt2-content-paused" : ""}`}
          // Treino pausado: tocar na questão (ou em uma alternativa) retoma o cronômetro. O primeiro
          // toque só retoma; a questão estava borrada, então nenhuma alternativa é marcada às cegas.
          onClickCapture={
            userPaused
              ? (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  resumeUserPause();
                }
              : undefined
          }
        >
          <div className="trainer-reading-meta mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
            <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">
              {question.subject}
            </span>
            <Badge variant="outline">{examOriginLabel(question)}</Badge>
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
            <div className="trainer-reading-review mb-3 flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-200">
              <Lock className="h-3.5 w-3.5 shrink-0" /> Você já respondeu esta questão antes —
              revisão apenas, sem reenvio.
            </div>
          )}
          <div className="trainer-reading-heading mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-none text-foreground sm:text-3xl">
                Questão {index + 1}{" "}
                <span className="text-muted-foreground">de {questions.length}</span>
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {correct} certas · {wrong} erradas
              </p>
            </div>
          </div>
          <div className="trainer-reading-progress mb-4 flex gap-1 sm:mb-6 sm:gap-1.5">
            <div
              className="trainer-reading-progress__bars"
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
            <ElapsedTimer startedAt={startedAt} running={!answered && !pausedAt} />
          </div>
          {pendingAnswers > 0 && (
            <div
              className="trainer-reading-pending mb-2 flex items-center justify-between gap-2 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs font-semibold"
              role="status"
            >
              <span>
                {pendingAnswers} resposta{pendingAnswers > 1 ? "s" : ""} aguardando envio
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                onClick={() => void retryPendingAnswers()}
              >
                Tentar novamente
              </Button>
            </div>
          )}
          <section className="trainer-reading-stem" aria-label="Enunciado da questão">
            {parsed.base && (
              <details
                open
                className="mb-3 rounded-lg border bg-muted/40 sm:mb-4 sm:rounded-xl [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer select-none items-center justify-between px-4 py-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                  {parsed.baseLabel}
                  <span className="text-[10px] font-medium normal-case">mostrar / ocultar</span>
                </summary>
                <div className="max-h-52 overflow-y-auto whitespace-pre-line break-words px-3 pb-3 text-base leading-7 text-left [overflow-wrap:anywhere] text-foreground sm:max-h-80 sm:px-4 sm:pb-4">
                  {parsed.base}
                </div>
              </details>
            )}
            <p className="whitespace-pre-line break-words text-left [overflow-wrap:anywhere] text-base font-medium leading-7 text-foreground">
              {parsed.stem.replace(/\*\*(.+?)\*\*/g, "$1")}
            </p>
            <QuestionFigures urls={question.figures} illustrations={parsed.illustrations} />
          </section>
          <section className="trainer-reading-answers" aria-label="Alternativas da questão">
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
                    <div key={option.letter} className="trainer-option-row flex items-start gap-2">
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        data-state={isRight ? "right" : isWrong ? "wrong" : isSelected ? "selected" : undefined}
                        disabled={answered || saving}
                        onClick={() => chooseOption(option.letter)}
                        className={cn(
                          "trainer-option group flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-background p-2.5 text-left text-sm leading-5 transition-all duration-200 hover:border-amber-400/50 hover:bg-amber-400/5 disabled:hover:bg-background sm:gap-3 sm:p-3 sm:leading-6",
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
                            "trainer-option__letter flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[11px] font-bold sm:h-7 sm:w-7 sm:rounded-lg sm:text-xs",
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
                        className="trainer-option__strike h-9 w-9 shrink-0 sm:h-10 sm:w-10"
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
          </section>
          <div className="trainer-reading-actions trainer-action-dock mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="trainer-action-dock__secondary flex flex-wrap gap-2">
              <Button
                variant="ghost"
                className="trainer-action-dock__btn"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Questão anterior"
                data-hint="Voltar à questão anterior"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Anterior</span>
              </Button>
              <Button
                variant={answered ? "outline" : "ghost"}
                aria-disabled={!answered && !supportAvailable}
                aria-describedby={!answered && supportNotice ? supportNoticeId : undefined}
                className={cn("trainer-action-dock__btn", !answered && "text-muted-foreground")}
                onClick={openLearning}
                data-hint="Abrir a explicação do assunto; o cronômetro pausa"
              >
                {answered ? (
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Lock className="h-4 w-4" aria-hidden="true" />
                )}
                <span>Entender assunto</span>
              </Button>
              {!answered && (
                <Button
                  variant="ghost"
                  className="trainer-action-dock__btn"
                  onClick={next}
                  disabled={index + 1 >= questions.length}
                  aria-label="Pular questão"
                  data-hint="Pular sem responder; ela volta depois"
                >
                  <SkipForward className="h-4 w-4" aria-hidden="true" />
                  <span>Pular</span>
                </Button>
              )}
              <Button
                variant={savedForStudy ? "secondary" : "ghost"}
                className="trainer-action-dock__btn"
                onClick={toggleSavedForStudy}
                data-hint="Guardar esta questão no caderno de estudo"
                disabled={savedForStudy}
                aria-pressed={savedForStudy}
              >
                {savedForStudy ? (
                  <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Bookmark className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{savedForStudy ? "Salva" : "Salvar p/ estudar"}</span>
              </Button>
            </div>
            {!answered ? (
              <Button
                size="lg"
                disabled={!selected || saving || (reachedDailyLimit && !practiceMode)}
                onClick={submit}
                className="trainer-action-dock__primary h-11 min-w-44 bg-amber-400 text-slate-900 shadow-[0_8px_24px_-8px_oklch(0.8_0.13_78/0.8)] hover:bg-amber-300 sm:h-12"
              >
                {selected ? "Confirmar resposta" : "Escolha uma alternativa"}{" "}
                <Check className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={next}
                className="trainer-action-dock__primary h-11 min-w-44 bg-amber-400 text-slate-900 shadow-[0_8px_24px_-8px_oklch(0.8_0.13_78/0.8)] hover:bg-amber-300 sm:h-12"
              >
                {index + 1 === questions.length ? "Ver resultado" : "Próxima questão"}
                <ArrowRight className="ml-2 h-4 w-4 text-slate-900" aria-hidden="true" />
              </Button>
            )}
          </div>
          {answered && (!isPlaceholderExplanation(explanation.main) || explanation.example || !isCorrect) && (
            <div
              className="trainer-reading-explanation mt-4 space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
              role="region"
              aria-label="Explicação da questão"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-black uppercase tracking-wider text-primary">
                  Explicação da questão
                </p>
                {responseSeconds !== null && (
                  <span className="rounded-full border border-primary/20 bg-background/70 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    Tempo de resposta: {formatResponseTime(responseSeconds)}
                  </span>
                )}
              </div>
              {!isCorrect && (
                <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                  Resposta correta: {labelFor(question.answer)}
                </p>
              )}
              {isPlaceholderExplanation(explanation.main) ? null : (
                <p className="whitespace-pre-line break-words text-base leading-7 text-left [overflow-wrap:anywhere]">{explanation.main}</p>
              )}
              {explanation.example && (
                <p className="whitespace-pre-line break-words text-base leading-7 text-left [overflow-wrap:anywhere]">
                  <strong>Exemplo:</strong> {explanation.example}
                </p>
              )}
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
        </CardContent>
      </Card>
      {answered && !isPlaceholderExplanation(explanation.main) && (
        <details
          className="trainer-review-community"
          aria-label="Desempenho e comentários da questão"
        >
          <summary className="trainer-review-community__toggle">
            Desempenho e comentários desta questão
          </summary>
          <QuestionSocialPanel questionId={question.id} questionSource={question.source} />
        </details>
      )}
      <Dialog
        open={confirmExit || blocker.status === "blocked"}
        onOpenChange={(open) => {
          if (open) return;
          if (blocker.status === "blocked") {
            resumeFromPause();
            blocker.reset?.();
          }
          setConfirmExit(false);
        }}
      >
        <DialogContent className="trainer-exit-dialog max-w-[440px] overflow-hidden border-slate-600/40 p-0 text-slate-50 shadow-2xl">
          <div className="trainer-exit-dialog__art" aria-hidden="true">
            <svg viewBox="0 0 440 190" preserveAspectRatio="xMidYMid slice" role="presentation">
              <defs>
                <linearGradient id="trainer-exit-scene" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#1b2937" />
                  <stop offset="1" stopColor="#080e15" />
                </linearGradient>
                <linearGradient id="trainer-exit-book" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#304054" />
                  <stop offset="1" stopColor="#101923" />
                </linearGradient>
              </defs>
              <rect width="440" height="190" fill="url(#trainer-exit-scene)" />
              <g opacity=".27" stroke="#92a6bb" strokeWidth="2" fill="url(#trainer-exit-book)">
                <path d="M-20 125 90 112 130 127 22 145Z" />
                <path d="M-15 147 97 135 136 151 18 170Z" />
                <path d="M345 84 461 70 470 130 354 146Z" />
                <path d="M293 150 429 126 449 171 310 190Z" />
              </g>
              <g opacity=".25" stroke="#94a3b8" strokeWidth="1.6">
                <path d="M20 145 119 130M20 157 123 143M358 113l92-12M317 171l107-19" />
              </g>
              <rect width="440" height="190" fill="#090f17" opacity=".54" />
              <circle cx="220" cy="93" r="51" fill="#e65c6b" opacity=".07" />
              <circle
                cx="220"
                cy="93"
                r="35"
                fill="#e65c6b"
                opacity=".14"
                stroke="#fb8493"
                strokeOpacity=".23"
              />
              <path
                d="M207 77v-5a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v12m-32 0v29a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-12M223 93h29m-9-9 9 9-9 9"
                fill="none"
                stroke="#f8a0ab"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="trainer-exit-dialog__body">
            <DialogHeader className="space-y-2 text-center sm:text-center">
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-50">
                Encerrar o treino?
              </DialogTitle>
              <DialogDescription className="mx-auto max-w-[330px] text-sm leading-6 text-slate-300">
                {blocker.status === "blocked"
                  ? "O cronômetro está pausado. As respostas já registradas continuam no seu histórico."
                  : "As respostas já registradas continuam no seu histórico. Ao encerrar, esta sessão não será retomada automaticamente."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:space-x-0">
              <Button
                variant="outline"
                className="w-full border-slate-500/60 bg-slate-800/70 text-slate-50 hover:bg-slate-700 hover:text-white"
                onClick={() => {
                  if (blocker.status === "blocked") {
                    resumeFromPause();
                    blocker.reset?.();
                  }
                  setConfirmExit(false);
                }}
              >
                <BookOpenCheck className="mr-2 h-4 w-4" /> Continuar treinando
              </Button>
              <Button
                variant="destructive"
                className="w-full bg-rose-600 text-white hover:bg-rose-500"
                onClick={() => {
                  setConfirmExit(false);
                  if (userId) {
                    try {
                      localStorage.removeItem(`trainer-bookmark:${userId}`);
                      sessionStorage.removeItem(`trainer-bookmark:${userId}`);
                    } catch {
                      /* ignora */
                    }
                  }
                  if (blocker.status === "blocked") blocker.proceed?.();
                  else setStarted(false);
                }}
              >
                <ArrowRight className="mr-2 h-4 w-4" /> Encerrar treino
              </Button>
            </DialogFooter>
          </div>
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
                  subject={question.subject}
                  topic={question.subtopic ?? ""}
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
  relevance: string;
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
  setRelevance: (value: string) => void;
};

type ExamFocusProps = {
  mode: ExamFocus;
  setMode: (value: ExamFocus) => void;
  counts: Record<ExamFocus, number> | null;
  label: string;
};

/** Escolha de foco: começa pelas questões com maior potencial de cair na prova do edital ativo. */
function ExamFocusPicker({ mode, setMode, counts, label }: ExamFocusProps) {
  const modes: ExamFocus[] = ["off", "alta", "alta-media", "recentes"];
  return (
    <section className="qt2-focus" aria-label={`Foco na prova ${label}`}>
      <header>
        <Target aria-hidden="true" />
        <div>
          <strong>Foco na prova · {label}</strong>
          <span>Comece pelo que mais tem chance de cair. Baseado nas provas da banca já cobradas.</span>
        </div>
      </header>
      <div className="qt2-focus__options" role="radiogroup" aria-label="Escolher o foco">
        {modes.map((id) => {
          const count = counts?.[id];
          const empty = counts !== null && id !== "off" && !count;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={mode === id}
              disabled={!counts || empty}
              onClick={() => setMode(id)}
              data-active={mode === id}
            >
              {EXAM_FOCUS_LABEL[id]}
              {id !== "off" && <small>{counts ? count?.toLocaleString("pt-BR") : "…"}</small>}
            </button>
          );
        })}
      </div>
      {mode !== "off" && (
        <p>
          As questões mais prováveis vêm primeiro. É uma tendência estatística, não uma garantia de prova.
        </p>
      )}
    </section>
  );
}

function TrainerSetup({
  total,
  available,
  choices,
  facets,
  values,
  setters,
  focus,
  start,
}: {
  focus: ExamFocusProps | null;
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
  const usedCount = values.limit === "all" ? available : Math.min(available, Number(values.limit));
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
    setters.setRelevance("all");
    setters.setIncludeAnswered(false);
  };
  const difficultyLabels: Record<string, string> = { fácil: "Fácil", média: "Média", difícil: "Difícil" };
  const sourceLabels: Record<string, string> = {
    official: "Provas oficiais",
    curated: "Questões autorais",
    personal: "Meu caderno",
  };
  const examLabels = Object.fromEntries(choices.exams);
  const active = (
    [
      ["Edital", values.relevance, "PC-AC 2026 · Oficial Investigador", () => setters.setRelevance("all")],
      ["Banca", values.board, values.board, () => setters.setBoard("all")],
      ["Disciplina", values.subject, values.subject, () => setters.setSubject("all")],
      ["Assunto", values.topic, topicFilterLabel(values.topic), () => setters.setTopic("all")],
      ["Dificuldade", values.difficulty, difficultyLabels[values.difficulty], () => setters.setDifficulty("all")],
      ["Concurso", values.contest, values.contest, () => setters.setContest("all")],
      ["Cargo", values.career, values.career, () => setters.setCareer("all")],
      ["Estado", values.state, values.state, () => setters.setState("all")],
      ["Categoria", values.category, values.category, () => setters.setCategory("all")],
      ["Ano", values.year, values.year, () => setters.setYear("all")],
      ["Prova", values.appliedExam, examLabels[values.appliedExam] ?? values.appliedExam, () => setters.setAppliedExam("all")],
      ["Origem", values.source, sourceLabels[values.source], () => setters.setSource("all")],
      ["Explicação", values.reviewed, "Com explicação didática", () => setters.setReviewed("all")],
    ] as Array<[string, string, string | undefined, () => void]>
  ).filter(([, value]) => value !== "all");
  const moreActive = [
    values.contest,
    values.career,
    values.state,
    values.category,
    values.year,
    values.appliedExam,
    values.source,
    values.reviewed,
  ].filter((v) => v !== "all").length + (values.includeAnswered ? 1 : 0);
  const quantities = trainerQuestionQuantityOptions(available);
  const minutes = Math.max(1, Math.round(usedCount * 2));
  return (
    <div className="trainer-setup qt2 qt3 pb-4 animate-in fade-in duration-300 sm:pb-6">
      <QtFitViewport depKey="setup" root=".qt3" target=".qt3" varName="--qt3-h" />
      <div className="qt3-main">
        <header className="qt3-hero">
          <img src="/media/hero/toolkit.webp" alt="" aria-hidden="true" decoding="async" />
          <div className="qt3-hero__copy">
            <small>Treinamento de precisão</small>
            <h1>Monte sua sessão de questões</h1>
            <p aria-label="Resumo das questões">
              <span>
                <b>{total.toLocaleString("pt-BR")}</b> ativas
              </span>
              <span>
                <b>{available.toLocaleString("pt-BR")}</b> na seleção
              </span>
            </p>
          </div>
        </header>
        {values.area !== "all" && (
          <p className="qt3-note">
            Filtro do seu cronograma: <b>{values.area}</b>
            <button
              type="button"
              onClick={() => {
                setters.setArea("all");
                setters.setTopic("all");
              }}
            >
              limpar
            </button>
          </p>
        )}
        {focus && <ExamFocusPicker {...focus} />}

        <section className="qt3-panel" aria-labelledby="qt3-filters-title">
          <h2 id="qt3-filters-title" className="qt3-panel__title">
            <Settings2 aria-hidden="true" /> O que você quer treinar
          </h2>
          <div className="qt3-grid">
            <TrainerFilter
              icon={Target}
              label="Aderência ao edital"
              value={values.relevance}
              setValue={setters.setRelevance}
              options={["pcac-oip"]}
              labels={{ "pcac-oip": "PC-AC 2026 · Oficial Investigador" }}
              allLabel="Todas as questões"
            />
            <TrainerFilter
              icon={Landmark}
              counts={facets.counts["board"]}
              allCount={facets.totals["board"]}
              label="Banca"
              value={values.board}
              setValue={setters.setBoard}
              options={choices.boards}
            />
            <TrainerFilter
              icon={BookOpen}
              counts={facets.counts["subject"]}
              allCount={facets.totals["subject"]}
              label="Disciplina"
              value={values.subject}
              setValue={setters.setSubject}
              options={choices.subjects}
            />
            <TrainerFilter
              icon={Tags}
              counts={facets.counts["topic"]}
              allCount={facets.totals["topic"]}
              label="Assunto"
              value={values.topic}
              setValue={setters.setTopic}
              options={choices.topics}
              labels={Object.fromEntries(choices.topics.map((value) => [value, topicFilterLabel(value)]))}
              allLabel="Todos os assuntos"
            />
          </div>

          <div className="qt3-row">
            <div className="qt3-field">
              <span className="qt3-field__label" id="qt3-diff">
                <Gauge aria-hidden="true" /> Dificuldade
              </span>
              <div className="qt3-chips" role="radiogroup" aria-labelledby="qt3-diff">
                {(["all", "fácil", "média", "difícil"] as const).map((d) => {
                  const count = d === "all" ? facets.totals["difficulty"] : facets.counts["difficulty"]?.get(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={values.difficulty === d}
                      data-level={d}
                      disabled={d !== "all" && !count && values.difficulty !== d}
                      onClick={() => setters.setDifficulty(d)}
                    >
                      <i aria-hidden="true" />
                      {d === "all" ? "Todas" : difficultyLabels[d]}
                      {count !== undefined && <small>{count.toLocaleString("pt-BR")}</small>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="qt3-field">
              <span className="qt3-field__label" id="qt3-qty">
                <ListOrdered aria-hidden="true" /> Quantidade
              </span>
              {available ? (
                <div className="qt3-chips" role="radiogroup" aria-labelledby="qt3-qty">
                  {[...quantities, ...(available > 50 ? ["all"] : [])].map((q) => (
                    <button
                      key={q}
                      type="button"
                      role="radio"
                      aria-checked={values.limit === q}
                      onClick={() => setters.setLimit(q)}
                    >
                      {q === "all" ? `Todas (${available.toLocaleString("pt-BR")})` : q}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="qt3-muted">Sem questões disponíveis</p>
              )}
            </div>
            <div className="qt3-field">
              <span className="qt3-field__label" id="qt3-order">
                <Shuffle aria-hidden="true" /> Ordem
              </span>
              <div className="qt3-chips" role="radiogroup" aria-labelledby="qt3-order">
                {(
                  [
                    ["random", "Aleatório inteligente"],
                    ["exam", "Ordem do acervo"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={values.orderMode === id}
                    onClick={() => setters.setOrderMode(id as OrderMode)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <details className="qt3-more">
            <summary>
              <Layers aria-hidden="true" /> Mais filtros
              {moreActive > 0 && <span className="qt3-badge">{moreActive}</span>}
              <ChevronDown className="qt3-more__chev" aria-hidden="true" />
            </summary>
            <div className="qt3-grid">
              <TrainerFilter icon={Trophy} counts={facets.counts["contest"]} allCount={facets.totals["contest"]} label="Concurso" value={values.contest} setValue={setters.setContest} options={choices.contests} />
              <TrainerFilter icon={Briefcase} counts={facets.counts["career"]} allCount={facets.totals["career"]} label="Carreira ou cargo" value={values.career} setValue={setters.setCareer} options={choices.careers} />
              <TrainerFilter icon={MapPin} counts={facets.counts["state"]} allCount={facets.totals["state"]} label="Estado" value={values.state} setValue={setters.setState} options={choices.states} />
              <TrainerFilter icon={Layers} counts={facets.counts["category"]} allCount={facets.totals["category"]} label="Categoria" value={values.category} setValue={setters.setCategory} options={choices.categories} />
              <TrainerFilter icon={CalendarDays} counts={facets.counts["year"]} allCount={facets.totals["year"]} label="Ano" value={values.year} setValue={setters.setYear} options={choices.years} />
              <TrainerFilter icon={FileText} counts={facets.counts["exam"]} allCount={facets.totals["exam"]} label="Prova aplicada" value={values.appliedExam} setValue={setters.setAppliedExam} options={choices.exams.map(([value]) => value)} labels={examLabels} />
              <TrainerFilter icon={Database} counts={facets.counts["source"]} allCount={facets.totals["source"]} label="Origem" value={values.source} setValue={setters.setSource} options={["official", "curated", "personal"]} labels={sourceLabels} />
              <TrainerFilter icon={Sparkles} counts={facets.counts["reviewed"]} allCount={facets.totals["reviewed"]} label="Explicação didática" value={values.reviewed} setValue={setters.setReviewed} options={["reviewed"]} labels={{ reviewed: "Com explicação e exemplo do dia a dia" }} allLabel="Todas as questões" />
              <label className="qt3-toggle">
                <input
                  type="checkbox"
                  checked={values.includeAnswered}
                  onChange={(event) => setters.setIncludeAnswered(event.target.checked)}
                />
                <span className="qt3-toggle__switch" aria-hidden="true" />
                <span>
                  <b>Incluir questões já respondidas</b>
                  <small>Para revisão. Continuam bloqueadas para novo envio.</small>
                </span>
              </label>
            </div>
          </details>
        </section>
      </div>

      <aside className="qt3-summary" aria-labelledby="qt3-summary-title">
        <div className="qt3-summary__card">
          <p className="qt3-summary__eyebrow">Sua sessão</p>
          <h2 id="qt3-summary-title" className="qt3-summary__count">
            <b>{usedCount.toLocaleString("pt-BR")}</b>
            <span>{usedCount === 1 ? "questão" : "questões"}</span>
          </h2>
          <ul className="qt3-summary__facts">
            <li>
              <Clock3 aria-hidden="true" /> cerca de {minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60 ? `${minutes % 60} min` : ""}` : `${minutes} min`}
            </li>
            <li>
              <Shuffle aria-hidden="true" /> {values.orderMode === "random" ? "Aleatório inteligente" : "Ordem do acervo"}
            </li>
          </ul>
          <div className="qt3-summary__filters">
            <p>Filtros ativos</p>
            {active.length ? (
              <ul>
                {active.map(([label, , display, clear]) => (
                  <li key={label}>
                    <span title={`${label}: ${display ?? ""}`}>
                      <small>{label}</small> {display}
                    </span>
                    <button type="button" onClick={clear} aria-label={`Remover filtro ${label}`}>
                      <X aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="qt3-muted">Nenhum: todas as questões disponíveis.</span>
            )}
          </div>
          <div className="qt3-summary__actions">
            <Button disabled={!available} onClick={start} className="qt3-start hero-primary-action">
              <Sparkles aria-hidden="true" /> Iniciar treinamento
            </Button>
            <Button variant="ghost" onClick={reset} className="qt3-reset" disabled={!active.length && !values.includeAnswered}>
              <RotateCcw aria-hidden="true" /> Limpar filtros
            </Button>
          </div>
        </div>
        <nav className="qt3-quick" aria-label="Acesso rápido">
          <Link to="/dashboard/question-trainer" search={{ mode: "reforco" } as never} data-tone="rose">
            <RotateCcw aria-hidden="true" /> <span>Revisar erros</span>
          </Link>
          <Link to="/dashboard/notebooks" data-tone="violet">
            <Bookmark aria-hidden="true" /> <span>Cadernos</span>
          </Link>
          <Link to="/dashboard/mock-exams" data-tone="gold">
            <Target aria-hidden="true" /> <span>Simulados</span>
          </Link>
          <Link to="/dashboard/question-bank" data-tone="blue">
            <ListOrdered aria-hidden="true" /> <span>Banco de questões</span>
          </Link>
          <Link to="/dashboard/performance" data-tone="green">
            <TrendingUp aria-hidden="true" /> <span>Desempenho</span>
          </Link>
        </nav>
      </aside>

      <div className="qt3-mobilebar">
        <span>
          <b>{usedCount.toLocaleString("pt-BR")}</b> questões
        </span>
        <Button disabled={!available} onClick={start} className="qt3-start hero-primary-action">
          <Sparkles aria-hidden="true" /> Iniciar
        </Button>
      </div>
    </div>
  );
}

function TrainerFilter({
  icon: Icon,
  label,
  value,
  setValue,
  options,
  labels,
  allLabel = "Todos",
  hideAll = false,
  counts,
  allCount,
  disabled = false,
  placeholder,
}: {
  icon?: typeof Target;
  counts?: Map<string, number> | undefined;
  allCount?: number | undefined;
  disabled?: boolean;
  placeholder?: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
  allLabel?: string;
  hideAll?: boolean;
}) {
  return (
    <label className="qt3-field" data-set={value !== "all" || undefined}>
      <span className="qt3-field__label">
        {Icon && <Icon aria-hidden="true" />}
        {label}
      </span>
      <Select disabled={disabled} value={disabled ? "" : value} onValueChange={setValue}>
        <SelectTrigger disabled={disabled} className="qt3-select">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="trainer-select-content">
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
      className="trainer-timer-chip flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-1.5 font-mono text-sm font-semibold tabular-nums text-foreground"
      role="timer"
      aria-label="Tempo nesta questão"
    >
      <Timer className="h-4 w-4 text-amber-400" aria-hidden /> {mm}:{ss}
    </span>
  );
}

function formatResponseTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes > 0 ? `${minutes}min ${String(rest).padStart(2, "0")}s` : `${rest}s`;
}

/**
 * Ajusta a janela da questão à altura visível (sem rolagem da página no computador):
 * mede onde o cartão começa e a faixa fixa do rodapé e grava em --qt4-h.
 */
function QtFitViewport({
  depKey,
  root = ".qt4",
  target = ".question-window",
  varName = "--qt4-h",
}: {
  depKey: string;
  root?: string;
  target?: string;
  varName?: string;
}) {
  const markerRef = React.useRef<HTMLSpanElement | null>(null);
  React.useLayoutEffect(() => {
    const shell = markerRef.current?.closest<HTMLElement>(root);
    if (!shell) return;
    // Tela cheia: remove o respiro/faixa que a estrutura do painel reserva acima da sessão.
    const undo: Array<() => void> = [];
    const zero = (el: HTMLElement, prop: string) => {
      const prev = el.style.getPropertyValue(prop);
      const prio = el.style.getPropertyPriority(prop);
      el.style.setProperty(prop, "0", "important");
      undo.push(() => (prev ? el.style.setProperty(prop, prev, prio) : el.style.removeProperty(prop)));
    };
    const pullUp = () => {
      const app = shell.closest<HTMLElement>(".app-shell");
      if (!app || app.getAttribute("data-focus-mode") !== "true" || root !== ".qt4") return;
      if (shell.getBoundingClientRect().top < 16) return;
      for (let el: HTMLElement | null = shell; el && el !== app; el = el.parentElement) {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.paddingTop) > 0) zero(el, "padding-top");
        if (parseFloat(cs.marginTop) > 0) zero(el, "margin-top");
        for (let sib = el.previousElementSibling as HTMLElement | null; sib; sib = sib.previousElementSibling as HTMLElement | null) {
          const sc = getComputedStyle(sib);
          if (sc.display === "none" || sc.position === "fixed" || sc.position === "absolute") continue;
          if (sib.getBoundingClientRect().height > 0 && !sib.querySelector(".qt2-strip")) {
            const prevDisplay = sib.style.getPropertyValue("display");
            sib.style.setProperty("display", "none", "important");
            undo.push(() => (prevDisplay ? sib.style.setProperty("display", prevDisplay) : sib.style.removeProperty("display")));
          }
        }
      }
    };
    // A tela da questão em tela cheia cabe inteira; qualquer rolagem herdada da tela anterior
    // (ex.: a montagem rolada até o botão) empurrava o topo da janela para baixo do menu.
    const resetScroll = () => {
      if (root !== ".qt4") return;
      const app = shell.closest<HTMLElement>(".app-shell");
      if (!app || app.getAttribute("data-focus-mode") !== "true") return;
      for (let el: HTMLElement | null = shell.parentElement; el && el !== app; el = el.parentElement) {
        if (el.scrollTop !== 0) el.scrollTop = 0;
      }
    };
    const fit = () => {
      pullUp();
      resetScroll();
      const card = target === root ? shell : shell.querySelector<HTMLElement>(target);
      if (!card) return;
      const top = card.getBoundingClientRect().top;
      const strip = document.querySelector<HTMLElement>(".dev-strip");
      const stripH =
        strip && getComputedStyle(strip).position === "fixed" ? strip.getBoundingClientRect().height : 0;
      let tail = 0;
      if (target !== root) {
        for (let el = card.nextElementSibling; el; el = el.nextElementSibling) {
          const box = (el as HTMLElement).getBoundingClientRect();
          if (box.height > 0) tail += box.height + 12;
        }
      }
      const scroller = shell.closest<HTMLElement>(".app-content");
      let bottom = window.innerHeight - stripH;
      if (scroller) {
        const pad = parseFloat(getComputedStyle(scroller).paddingBottom) || 0;
        bottom = Math.min(bottom, scroller.getBoundingClientRect().bottom - pad);
      }
      const h = Math.max(440, Math.floor(bottom - top - tail - 10));
      shell.style.setProperty(varName, `${h}px`);
    };
    fit();
    const raf = requestAnimationFrame(fit);
    const late = window.setTimeout(fit, 350);
    const content = shell.closest<HTMLElement>("#dashboard-content");
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    if (content) ro?.observe(content);
    window.addEventListener("resize", fit);
    document.addEventListener("fullscreenchange", fit);
    return () => {
      undo.splice(0).forEach((fn) => fn());
      cancelAnimationFrame(raf);
      window.clearTimeout(late);
      ro?.disconnect();
      window.removeEventListener("resize", fit);
      document.removeEventListener("fullscreenchange", fit);
    };
  }, [depKey, root, target, varName]);
  return <span ref={markerRef} hidden aria-hidden="true" />;
}
