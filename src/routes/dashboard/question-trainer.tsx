import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  CircleHelp,
  Flame,
  Loader2,
  RotateCcw,
  Sparkles,
  Strikethrough,
  Target,
  X,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import {
  type Answer,
  type Question,
  answerLabel,
  boardAnswers,
  DIFFICULTY_LABEL,
  DIFFICULTY_STYLE,
  examKey,
  formatDate,
  hasReviewedExplanation,
  isLegallyVerified,
  isPlaceholderExplanation,
  normalizeDifficulty,
  parseBasis,
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/question-trainer")({
  validateSearch: (search: Record<string, unknown>) => ({
    contest: typeof search.contest === "string" ? search.contest : undefined,
    board: typeof search.board === "string" ? search.board : undefined,
    career: typeof search.career === "string" ? search.career : undefined,
    year: typeof search.year === "string" ? search.year : undefined,
    subject: typeof search.subject === "string" ? search.subject : undefined,
    source: typeof search.source === "string" ? search.source : undefined,
    reviewed: typeof search.reviewed === "string" ? search.reviewed : undefined,
    state: typeof search.state === "string" ? search.state : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: QuestionTrainer,
});

type OrderMode = "random" | "exam";

function QuestionTrainer() {
  const routeFilters = Route.useSearch();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuthStatus();
  const userId = user?.id;
  const isGuest = !authLoading && (!user || userId === "demo-user");
  // O painel/área do cliente é só pra quem tem conta. Visitante nunca fica
  // aqui — é redirecionado pro Desafio Diário público (/desafio-diario),
  // que tem sua própria página fora do /dashboard.
  React.useEffect(() => {
    if (isGuest) navigate({ to: "/desafio-diario", replace: true });
  }, [isGuest, navigate]);
  const [catalog, setCatalog] = React.useState<Question[]>([]);
  const [hidden, setHidden] = React.useState(0);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [started, setStarted] = React.useState(false);
  const [contest, setContest] = React.useState(routeFilters.contest || "all");
  const [board, setBoard] = React.useState(routeFilters.board || "all");
  const [career, setCareer] = React.useState(routeFilters.career || "all");
  const [year, setYear] = React.useState(routeFilters.year || "all");
  const [appliedExam, setAppliedExam] = React.useState("all");
  const [subject, setSubject] = React.useState(routeFilters.subject || "all");
  const [source, setSource] = React.useState(routeFilters.source || "all");
  const [reviewed, setReviewed] = React.useState(routeFilters.reviewed || "all");
  const [state, setState] = React.useState(routeFilters.state || "all");
  const [category, setCategory] = React.useState(routeFilters.category || "all");
  const [difficulty, setDifficulty] = React.useState("all");
  const [limit, setLimit] = React.useState("20");
  const [orderMode, setOrderMode] = React.useState<OrderMode>("random");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [struck, setStruck] = React.useState<Answer[]>([]);
  const [answered, setAnswered] = React.useState(false);
  const [helpUsed, setHelpUsed] = React.useState(false);
  const [modal, setModal] = React.useState<"help" | "result" | null>(null);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);
  const [startedAt, setStartedAt] = React.useState(Date.now());

  React.useEffect(() => {
    if (authLoading || isGuest) return;
    // Sem sessão real (nem visitante, nem logado) não há nada pra carregar
    // — visitante já foi redirecionado pro Desafio Diário no efeito acima.
    if (!userId || userId === "demo-user") {
      setLoading(false);
      return;
    }
    let active = true;
    void (async () => {
      try {
        // Se a migration de verificação legal ainda não foi aplicada, as colunas novas não existem:
        // repetimos a consulta sem elas e seguimos sem o filtro de vigência (avisando na tela).
        const query = async (
          table: "official_exam_questions" | "curated_question_catalog" | "question_bank",
          base: string,
          extra: string,
          refine: (builder: any) => any, // eslint-disable-line @typescript-eslint/no-explicit-any
        ) => {
          const full = await refine(supabase.from(table).select(`${base},${extra}`));
          if (!full.error) return { ...full, gated: true };
          const plain = await refine(supabase.from(table).select(base));
          return { ...plain, gated: false };
        };
        const [officialResult, curatedResult, personalResult] = await Promise.all([
          query(
            "official_exam_questions",
            "id,contest_name,exam_year,career_name,exam_board,subject,question_text,official_answer,review_note,legal_basis,state,career_category",
            "law_version_checked_at,legal_review_required,legal_audit_completed,difficulty",
            (builder) => builder.eq("content_status", "active").neq("official_answer", "X"),
          ),
          query(
            "curated_question_catalog",
            "id,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,state,career_category",
            "law_version_checked_at",
            (builder) => builder.eq("content_status", "active"),
          ),
          !userId
            ? Promise.resolve({ data: [], error: null, gated: true })
            : query(
                "question_bank",
                "id,contest_name,contest_year,subject,subtopic,question_text,official_answer,explanation,legal_basis,content_status,difficulty,state,career_category",
                "law_version_checked_at",
                (builder) => builder.eq("user_id", userId),
              ),
        ]);
        let hiddenCount = 0;
        const gate = (
          rows: Array<Record<string, unknown>>,
          gated: boolean,
          extraOk: (row: Record<string, unknown>) => boolean = () => true,
        ) =>
          rows.filter((row) => {
            const ok =
              !gated ||
              (extraOk(row) &&
                isLegallyVerified(parseBasis(row.legal_basis), row.law_version_checked_at));
            if (!ok) hiddenCount += 1;
            return ok;
          });
        if (officialResult.error) throw officialResult.error;
        if (curatedResult.error) throw curatedResult.error;
        if (personalResult.error) throw personalResult.error;
        const catalog: Question[] = [
          ...gate(
            (officialResult.data || []) as Array<Record<string, unknown>>,
            officialResult.gated,
            (row) => !(row.legal_review_required && !row.legal_audit_completed),
          ).map((row) => ({
            id: String(row.id),
            source: "official" as const,
            contest: String(row.contest_name),
            year: String(row.exam_year),
            career: String(row.career_name || "Carreira policial"),
            board: String(row.exam_board || "CEBRASPE"),
            subject: String(row.subject),
            subtopic: null,
            text: String(row.question_text),
            answer: String(row.official_answer) as Answer,
            explanation: String(
              row.review_note || "Item conferido com o gabarito definitivo da prova oficial.",
            ),
            legalBasis: parseBasis(row.legal_basis),
            checkedAt: row.law_version_checked_at ? String(row.law_version_checked_at) : null,
            difficulty: normalizeDifficulty(row.difficulty),
            state: String(row.state || ""),
            category: String(row.career_category || ""),
          })),
          ...gate(
            (curatedResult.data || []) as Array<Record<string, unknown>>,
            curatedResult.gated,
          ).map((row) => ({
            id: String(row.id),
            source: "curated" as const,
            contest: String(row.contest_name),
            year: String(row.contest_year),
            career: String(row.career_name || "Carreira policial"),
            board: String(row.exam_board || "Banca"),
            subject: String(row.subject),
            subtopic: row.subtopic ? String(row.subtopic) : null,
            text: String(row.question_text),
            answer: String(row.official_answer) as Answer,
            explanation: String(row.explanation || "Explicação editorial em revisão."),
            legalBasis: parseBasis(row.legal_basis),
            checkedAt: row.law_version_checked_at ? String(row.law_version_checked_at) : null,
            difficulty: normalizeDifficulty(row.difficulty),
            state: String(row.state || ""),
            category: String(row.career_category || ""),
          })),
          ...((personalResult.data || []) as Array<Record<string, unknown>>)
            .filter(
              (row) =>
                !["obsolete", "revoked", "archived"].includes(
                  String(row.content_status || "active"),
                ) &&
                /^[A-E]$/.test(String(row.official_answer)) &&
                (!personalResult.gated ||
                  isLegallyVerified(parseBasis(row.legal_basis), row.law_version_checked_at)),
            )
            .map((row) => ({
              id: String(row.id),
              source: "personal" as const,
              contest: String(row.contest_name),
              year: String(row.contest_year),
              career: "Meu caderno",
              board: /^[CE]$/.test(String(row.official_answer)) ? "CEBRASPE" : "Multibanca",
              subject: String(row.subject),
              subtopic: row.subtopic ? String(row.subtopic) : null,
              text: String(row.question_text),
              answer: String(row.official_answer) as Answer,
              explanation: String(row.explanation || "Explicação pedagógica em revisão."),
              legalBasis: parseBasis(row.legal_basis),
              checkedAt: row.law_version_checked_at ? String(row.law_version_checked_at) : null,
              difficulty: normalizeDifficulty(row.difficulty),
              state: String(row.state || ""),
              category: String(row.career_category || ""),
            })),
        ];
        if (active) {
          setCatalog(catalog);
          setHidden(hiddenCount);
        }
      } catch (loadError) {
        if (active)
          setError(
            loadError instanceof Error ? loadError.message : "Não foi possível carregar o treino.",
          );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [authLoading, userId, isGuest]);

  // Cada lista mostra só o que existe combinado com os OUTROS filtros já escolhidos,
  // para nunca montar uma combinação sem questões.
  const choices = React.useMemo(() => {
    const filters = {
      contest,
      board,
      career,
      year,
      subject,
      source,
      reviewed,
      difficulty,
      state,
      category,
    } as const;
    const fields = {
      contest: (item: Question) => item.contest,
      board: (item: Question) => item.board,
      career: (item: Question) => item.career,
      year: (item: Question) => item.year,
      subject: (item: Question) => item.subject,
      source: (item: Question) => item.source,
      reviewed: (item: Question) => (hasReviewedExplanation(item) ? "reviewed" : "pending"),
      difficulty: (item: Question) => item.difficulty,
      state: (item: Question) => item.state,
      category: (item: Question) => item.category,
    };
    const scoped = (skip: keyof typeof fields) =>
      catalog.filter((item) =>
        (Object.keys(fields) as Array<keyof typeof fields>).every(
          (key) => key === skip || filters[key] === "all" || fields[key](item) === filters[key],
        ),
      );
    const exams = Array.from(
      new Map(
        scoped("contest").map((item) => [
          examKey(item),
          `${item.contest} — ${item.career} · ${item.board} · ${item.year}`,
        ]),
      ).entries(),
    ).sort((a, b) => b[1].localeCompare(a[1], "pt-BR", { numeric: true }));
    return {
      contests: unique(scoped("contest").map(fields.contest)),
      boards: unique(scoped("board").map(fields.board)),
      careers: unique(scoped("career").map(fields.career)),
      years: unique(scoped("year").map(fields.year)).sort((x, y) => Number(y) - Number(x)),
      subjects: unique(scoped("subject").map(fields.subject)),
      states: unique(scoped("state").map(fields.state)),
      categories: unique(scoped("category").map(fields.category)),
      exams: exams.filter(([key]) => {
        const [c, ca, b, y] = key.split("::");
        return (
          (contest === "all" || c === contest) &&
          (career === "all" || ca === career) &&
          (board === "all" || b === board) &&
          (year === "all" || y === year)
        );
      }),
    };
  }, [
    catalog,
    contest,
    board,
    career,
    year,
    subject,
    source,
    reviewed,
    difficulty,
    state,
    category,
  ]);
  // Ao mexer em um filtro individual, a "prova aplicada" escolhida antes deixa de valer.
  const manual =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setAppliedExam("all");
      setter(value);
    };
  const pool = React.useMemo(
    () =>
      catalog.filter(
        (item) =>
          (contest === "all" || item.contest === contest) &&
          (board === "all" || item.board === board) &&
          (career === "all" || item.career === career) &&
          (year === "all" || item.year === year) &&
          (appliedExam === "all" || examKey(item) === appliedExam) &&
          (subject === "all" || item.subject === subject) &&
          (source === "all" || item.source === source) &&
          (reviewed === "all" || hasReviewedExplanation(item)) &&
          (difficulty === "all" || item.difficulty === difficulty) &&
          (state === "all" || item.state === state) &&
          (category === "all" || item.category === category),
      ),
    [
      catalog,
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
    const ordered = orderMode === "random" ? shuffled(pool) : [...pool];
    setQuestions(ordered.slice(0, Number(limit)));
    setIndex(0);
    setCorrect(0);
    setWrong(0);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setHelpUsed(false);
    setStartedAt(Date.now());
    setStarted(true);
  };
  const selectAppliedExam = (value: string) => {
    setAppliedExam(value);
    if (value === "all") return;
    const [selectedContest, selectedCareer, selectedBoard, selectedYear] = value.split("::");
    setContest(selectedContest);
    setCareer(selectedCareer);
    setBoard(selectedBoard);
    setYear(selectedYear);
  };

  const question = questions[index];
  const submit = async () => {
    if (!selected || !question || answered || !user) return;
    const isCorrect = selected === question.answer;
    setAnswered(true);
    if (isCorrect) setCorrect((value) => value + 1);
    else setWrong((value) => value + 1);
    setModal("result");
    if (user.id !== "demo-user") {
      await supabase.from("question_training_responses").insert({
        user_id: user.id,
        question_id: question.id,
        question_source: question.source,
        contest_name: question.contest,
        subject: question.subject,
        selected_answer: selected,
        official_answer: question.answer,
        is_correct: isCorrect,
        asked_for_help: helpUsed,
        response_seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      });
    }
  };
  const next = () => {
    setModal(null);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setHelpUsed(false);
    setStartedAt(Date.now());
    setIndex((value) => value + 1);
  };
  const restart = () => {
    setIndex(0);
    setCorrect(0);
    setWrong(0);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setHelpUsed(false);
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
        {hidden > 0 && (
          <div className="mx-auto max-w-4xl rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            {hidden} questão(ões) de legislação estão ocultas até a vigência ser conferida no
            Planalto.
          </div>
        )}
        <TrainerSetup
          total={catalog.length}
          available={pool.length}
          choices={choices}
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
            limit,
            orderMode,
          }}
          setters={{
            setContest: manual(setContest),
            setBoard: manual(setBoard),
            setCareer: manual(setCareer),
            setYear: manual(setYear),
            setAppliedExam: selectAppliedExam,
            setSubject: manual(setSubject),
            setSource: manual(setSource),
            setReviewed: manual(setReviewed),
            setDifficulty: manual(setDifficulty),
            setState: manual(setState),
            setCategory: manual(setCategory),
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
      <TrainingResult total={questions.length} correct={correct} wrong={wrong} restart={restart} />
    );

  const isCorrect = selected === question.answer;
  const parsed = parseQuestion(question.text);
  const hasOptions = parsed.options.length > 0;
  const explanation = splitExplanation(question.explanation);
  const correctOption = parsed.options.find((option) => option.letter === question.answer);
  const certoErrado = !hasOptions && /CEBRASPE|CESPE/i.test(question.board);
  const labelFor = (answer: Answer) =>
    hasOptions ? `Alternativa ${answer}` : answerLabel(answer, question.board);
  const chooseOption = (letter: Answer) => {
    if (answered) return;
    setStruck((items) => items.filter((item) => item !== letter));
    setSelected(letter);
  };
  const toggleStrike = (letter: Answer) => {
    if (answered) return;
    setStruck((items) =>
      items.includes(letter) ? items.filter((item) => item !== letter) : [...items, letter],
    );
    if (selected === letter) setSelected(null);
  };
  return (
    <div className="trainer-session-shell mx-auto max-w-4xl space-y-2.5 pb-4 sm:space-y-4 sm:pb-8">
      <header className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <Button variant="ghost" size="sm" onClick={() => setStarted(false)}>
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Configuração
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Flame className="mr-1 h-3.5 w-3.5 text-orange-500" /> Treinador
          </Badge>
          <Badge variant="outline">Não afeta ranking</Badge>
        </div>
      </header>
      <div className="session-status-bar rounded-lg border bg-card px-3 py-2 shadow-sm sm:rounded-xl sm:px-4 sm:py-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px] sm:mb-2 sm:text-xs">
          <span className="font-bold">
            Questão {index + 1} de {questions.length}
          </span>
          <span className="text-muted-foreground">
            {correct} certas · {wrong} erradas
          </span>
        </div>
        <Progress value={(index / questions.length) * 100} className="h-1.5" />
      </div>
      <Card
        className="question-window overflow-hidden border-0 shadow-xl ring-1 ring-border/70 animate-in fade-in slide-in-from-bottom-3 duration-300"
        key={question.id}
      >
        <div className="h-1 bg-gradient-to-r from-amber-500 via-sky-500 to-blue-800" />
        <CardContent className="p-3.5 sm:p-5 md:p-7">
          <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-5 sm:gap-2">
            <Badge>{question.board}</Badge>
            <Badge variant="outline">{question.subject}</Badge>
            <Badge variant="outline">
              {question.contest} · {question.year}
            </Badge>
            <Badge
              variant="outline"
              className={cn("font-bold", DIFFICULTY_STYLE[question.difficulty])}
            >
              {DIFFICULTY_LABEL[question.difficulty]}
            </Badge>
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
                      disabled={answered}
                      onClick={() => chooseOption(option.letter)}
                      className={cn(
                        "group flex flex-1 items-start gap-2 rounded-lg border-2 border-border bg-background p-2.5 text-left text-sm leading-5 transition-all duration-200 hover:border-primary hover:bg-primary/5 disabled:hover:bg-background sm:gap-3 sm:rounded-xl sm:p-3 sm:leading-6",
                        isStruck && "opacity-50",
                        isSelected &&
                          !answered &&
                          "border-blue-600 bg-blue-50 ring-4 ring-blue-600/10 hover:bg-blue-50",
                        isRight && "border-emerald-500 bg-emerald-50 hover:bg-emerald-50",
                        isWrong && "border-rose-500 bg-rose-50 hover:bg-rose-50",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-bold sm:h-7 sm:w-7 sm:rounded-lg sm:text-xs",
                          isSelected && !answered && "bg-blue-600 text-white",
                          isRight && "bg-emerald-600 text-white",
                          isWrong && "bg-rose-600 text-white",
                        )}
                      >
                        {option.letter}
                      </span>
                      <span className={cn(isStruck && "line-through")}>{option.text}</span>
                    </button>
                    <Button
                      type="button"
                      variant={isStruck ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
                      disabled={answered}
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
              boardAnswers(question.board).length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-5",
            )}
          >
            {(hasOptions ? [] : boardAnswers(question.board)).map((answer) => (
              <button
                key={answer}
                type="button"
                aria-pressed={selected === answer}
                disabled={answered}
                onClick={() => setSelected(answer)}
                className={cn(
                  "group relative flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:shadow-md disabled:hover:translate-y-0 sm:min-h-16 sm:rounded-xl sm:px-4 sm:text-base",
                  selected === answer &&
                    !answered &&
                    "scale-[1.02] border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20 ring-4 ring-blue-600/15 hover:bg-blue-600 hover:text-white",
                  answered &&
                    answer === question.answer &&
                    "border-emerald-500 bg-emerald-50 text-emerald-700",
                  answered &&
                    selected === answer &&
                    answer !== question.answer &&
                    "border-rose-500 bg-rose-50 text-rose-700",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                    selected === answer &&
                      !answered &&
                      "bg-white text-blue-700 group-hover:bg-white group-hover:text-blue-700",
                  )}
                >
                  {selected === answer && !answered ? <Check className="h-4 w-4" /> : answer}
                </span>
                {labelFor(answer)}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="ghost"
              className="text-amber-700"
              disabled={answered}
              onClick={() => {
                setHelpUsed(true);
                setModal("help");
              }}
            >
              <CircleHelp className="mr-2 h-4 w-4" /> Estou em dúvida
            </Button>
            <Button
              size="lg"
              disabled={!selected || answered}
              onClick={submit}
              className="h-11 min-w-44 sm:h-12"
            >
              Confirmar resposta <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={modal !== null} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {modal === "help" ? (
            <>
              <DialogHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 sm:mx-0">
                  <BrainCircuit />
                </div>
                <DialogTitle>Rota de raciocínio</DialogTitle>
                <DialogDescription>
                  Orientação sem revelar o gabarito. Volte à questão e decida com método.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <GuideStep
                  number="1"
                  text={`Identifique a regra central de ${question.subject}${question.subtopic ? `: ${question.subtopic}` : ""}.`}
                />
                <GuideStep
                  number="2"
                  text={
                    certoErrado
                      ? "Procure termos absolutos, exceções e relações de causa. Uma única parte falsa torna o item errado."
                      : "Elimine primeiro as alternativas incompatíveis com o enunciado e compare as restantes."
                  }
                />
                <GuideStep
                  number="3"
                  text={
                    question.legalBasis.length
                      ? "Use a fonte oficial indicada como eixo; não responda apenas pela intuição."
                      : "Reescreva mentalmente a afirmação em uma frase simples e teste cada premissa."
                  }
                />
              </div>
              <DialogFooter>
                <Button onClick={() => setModal(null)}>Voltar e responder</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <div
                  className={cn(
                    "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl sm:mx-0",
                    isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
                  )}
                >
                  {isCorrect ? <CheckCircle2 /> : <X />}
                </div>
                <DialogTitle>
                  {isCorrect ? "Resposta correta" : "Vamos corrigir este ponto"}
                </DialogTitle>
                <DialogDescription>
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
                    {correctOption && (
                      <p className="mt-1 text-sm leading-6">{correctOption.text}</p>
                    )}
                  </div>
                )}
                {!isPlaceholderExplanation(explanation.main) && (
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
              </div>
              <DialogFooter>
                <Button onClick={next}>
                  {index + 1 === questions.length ? "Ver resultado" : "Próxima questão"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
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
  setLimit: (value: string) => void;
  setOrderMode: (value: OrderMode) => void;
};

function TrainerSetup({
  total,
  available,
  choices,
  values,
  setters,
  start,
}: {
  total: number;
  available: number;
  choices: {
    contests: string[];
    boards: string[];
    careers: string[];
    years: string[];
    subjects: string[];
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
  };
  return (
    <div className="trainer-setup mx-auto max-w-5xl space-y-3 pb-5 animate-in fade-in duration-300 sm:space-y-5 sm:pb-10">
      <section className="question-trainer-hero tactical-feature-hero overflow-hidden rounded-xl p-4 text-white shadow-xl sm:rounded-2xl sm:p-6 md:p-8">
        <div className="grid gap-3 sm:gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Badge className="mb-2 border-amber-300/30 bg-amber-300/10 text-amber-100 hover:bg-amber-300/10 sm:mb-4">
              <BrainCircuit className="mr-1.5 h-3.5 w-3.5" /> Treinamento de precisão
            </Badge>
            <h1 className="text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
              Monte sua sessão de questões
            </h1>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-300 sm:mt-3 sm:text-sm sm:leading-6">
              Escolha a banca, carreira, concurso e disciplina. Aqui cada resposta recebe correção
              imediata e orientação pedagógica, sem afetar o ranking dos simulados.
            </p>
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
        <CardContent className="p-3.5 sm:p-5 md:p-7">
          <div className="mb-3 flex items-center gap-2.5 sm:mb-6 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 sm:h-11 sm:w-11">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black">Filtros do treino</h2>
              <p className="text-xs text-muted-foreground">
                As opções podem ser combinadas livremente.
              </p>
            </div>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <TrainerFilter
              label="Banca"
              value={values.board}
              setValue={setters.setBoard}
              options={choices.boards}
            />
            <TrainerFilter
              label="Disciplina"
              value={values.subject}
              setValue={setters.setSubject}
              options={choices.subjects}
            />
            <TrainerFilter
              label="Concurso"
              value={values.contest}
              setValue={setters.setContest}
              options={choices.contests}
            />
            <TrainerFilter
              label="Carreira ou cargo"
              value={values.career}
              setValue={setters.setCareer}
              options={choices.careers}
            />
            <TrainerFilter
              label="Estado"
              value={values.state}
              setValue={setters.setState}
              options={choices.states}
            />
            <TrainerFilter
              label="Categoria"
              value={values.category}
              setValue={setters.setCategory}
              options={choices.categories}
            />
            <TrainerFilter
              label="Ano"
              value={values.year}
              setValue={setters.setYear}
              options={choices.years}
            />
            <TrainerFilter
              label="Prova aplicada"
              value={values.appliedExam}
              setValue={setters.setAppliedExam}
              options={choices.exams.map(([value]) => value)}
              labels={Object.fromEntries(choices.exams)}
            />
            <TrainerFilter
              label="Origem"
              value={values.source}
              setValue={setters.setSource}
              options={["official", "curated", "personal"]}
              labels={{
                official: "Provas oficiais",
                curated: "Autorais auditadas",
                personal: "Meu caderno",
              }}
            />
            <TrainerFilter
              label="Explicação didática"
              value={values.reviewed}
              setValue={setters.setReviewed}
              options={["reviewed"]}
              labels={{ reviewed: "Só com exemplo do dia a dia revisado" }}
              allLabel="Todas as questões"
            />
            <TrainerFilter
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
            <label className="space-y-1.5 sm:space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Ordem das questões
              </span>
              <Select
                value={values.orderMode}
                onValueChange={(value) => setters.setOrderMode(value as OrderMode)}
              >
                <SelectTrigger className="h-10 bg-background sm:h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Aleatório inteligente</SelectItem>
                  <SelectItem value="exam">Ordem do acervo</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>
          <div className="mt-4 flex flex-col gap-2.5 rounded-xl border bg-muted/30 p-3 sm:mt-7 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:p-4">
            <div>
              <p className="font-black">
                {Math.min(available, Number(values.limit))} questões serão usadas
              </p>
              <p className="text-xs text-muted-foreground">
                {values.orderMode === "random"
                  ? "Seleção embaralhada uma única vez ao iniciar; a questão fica estável enquanto você responde."
                  : "Questões apresentadas na ordem cadastrada, com correção após cada resposta."}
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
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
  allLabel?: string;
  hideAll?: boolean;
}) {
  return (
    <label className="space-y-1.5 sm:space-y-2">
      <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="h-10 bg-background sm:h-11">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {!hideAll && <SelectItem value="all">{allLabel}</SelectItem>}
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {labels?.[option] || option}
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

function GuideStep({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border p-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 font-black text-amber-700">
        {number}
      </span>
      <p className="leading-6">{text}</p>
    </div>
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
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
