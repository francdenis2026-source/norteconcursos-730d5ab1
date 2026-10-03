import { canonicalSubject } from "@/lib/subjects";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  Strikethrough,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { GUEST_DAILY_LIMIT, getGuestRemainingToday, registerGuestAnswer } from "@/lib/guestQuota";
import {
  type Answer,
  type Question,
  DIFFICULTY_LABEL,
  DIFFICULTY_STYLE,
  questionAnswerLabel,
  questionAnswers,
  isPlaceholderExplanation,
  normalizeDifficulty,
  isEligibleQuestion,
  parseBasis,
  parseQuestion,
  splitExplanation,
} from "@/lib/questionFormat";

// Página pública do Desafio Diário — as MESMAS 10 questões oficiais pra
// todo visitante, no mesmo dia (fuso do Acre, relógio do servidor). Fica
// FORA do /dashboard de propósito: quem não tem conta nunca entra no
// painel/área do cliente. A única porta de leitura do banco pra visitante
// é public.get_daily_guest_questions() (SECURITY DEFINER) — a tabela
// official_exam_questions não tem policy de SELECT para anon.
export const Route = createFileRoute("/desafio-diario")({
  component: DesafioDiario,
  head: () => ({
    title: "Desafio diário grátis | Norte Concurso",
    meta: [
      {
        name: "description",
        content:
          "Responda 10 questões oficiais de concursos públicos por dia, sem cadastro. Mesmas questões pra todo mundo, todo dia.",
      },
    ],
  }),
});

type Step = "loading" | "blocked" | "intro" | "playing" | "done" | "error";

function DesafioDiario() {
  const [step, setStep] = React.useState<Step>("loading");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [remaining, setRemaining] = React.useState(GUEST_DAILY_LIMIT);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [struck, setStruck] = React.useState<Answer[]>([]);
  const [answered, setAnswered] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const remainingToday = await getGuestRemainingToday();
        const { data, error } = await supabase
          .rpc("get_daily_guest_questions", { p_limit: 10 })
          .select(
            "id,contest_name,exam_year,career_name,exam_board,subject,question_text,official_answer,review_note,legal_basis,difficulty,state,career_category,content_status,law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required",
          );
        if (error) throw error;
        const daily: Question[] = ((data || []) as Array<Record<string, unknown>>)
          .filter(isEligibleQuestion)
          .map((row) => ({
            id: String(row["id"]),
            source: "official" as const,
            contest: String(row["contest_name"]),
            year: String(row["exam_year"]),
            career: String(row["career_name"] || "Carreira policial"),
            board: String(row["exam_board"] || "CEBRASPE"),
            subject: canonicalSubject(String(row["subject"])),
            subtopic: null,
            text: String(row["question_text"]),
            answer: String(row["official_answer"]) as Answer,
            explanation: String(
              row["review_note"] || "Item conferido com o gabarito definitivo da prova oficial.",
            ),
            legalBasis: parseBasis(row["legal_basis"]),
            checkedAt: row["law_version_checked_at"] ? String(row["law_version_checked_at"]) : null,
            difficulty: normalizeDifficulty(row["difficulty"]),
            state: String(row["state"] || ""),
            category: String(row["career_category"] || ""),
          }));
        if (!active) return;
        setRemaining(remainingToday);
        setQuestions(daily);
        setStep(remainingToday <= 0 || !daily.length ? "blocked" : "intro");
      } catch (err) {
        if (active) {
          setErrorMessage(err instanceof Error ? err.message : "Não foi possível carregar.");
          setStep("error");
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const startChallenge = () => {
    setIndex(0);
    setCorrect(0);
    setWrong(0);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    setStep("playing");
  };

  const question = questions[index];
  const submit = async () => {
    if (!selected || !question || answered) return;
    const isCorrect = selected === question.answer;
    setAnswered(true);
    if (isCorrect) setCorrect((value) => value + 1);
    else setWrong((value) => value + 1);
    setShowResult(true);
    const used = await registerGuestAnswer();
    setRemaining(Math.max(0, GUEST_DAILY_LIMIT - used));
  };
  const next = () => {
    setShowResult(false);
    setSelected(null);
    setStruck([]);
    setAnswered(false);
    if (index + 1 >= questions.length) {
      setStep("done");
    } else {
      setIndex((value) => value + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[oklch(0.12_0.025_263/0.92)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" aria-label="Norte Concurso — início">
            <NorteBrand light />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="app-top-btn !w-auto gap-1.5 px-3 text-sm font-semibold text-white/75 hover:!bg-white/10 hover:!text-white">
              <ArrowLeft className="h-4 w-4" /> Início
            </Link>
            <Link to="/auth" search={{ mode: "register" }} className="btn-brass !h-9 !px-4 !text-sm">
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 sm:py-10">
        {step === "loading" && (
          <Center>
            <Loader2 className="h-8 w-8 animate-spin text-brass" />
            <p>Preparando o desafio de hoje…</p>
          </Center>
        )}

        {step === "error" && (
          <Center>
            <XCircle className="h-10 w-10 text-destructive" />
            <p>{errorMessage}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Tentar de novo
            </Button>
          </Center>
        )}

        {step === "blocked" && (
          <PageHero
            image="trainer"
            size="lg"
            kicker="Desafio de hoje concluído"
            icon={Sparkles}
            title={
              <>
                Você já respondeu <em>hoje.</em>
              </>
            }
            description={`Suas ${GUEST_DAILY_LIMIT} questões grátis de hoje já foram usadas neste computador. O desafio libera de novo amanhã, ou crie uma conta para treinar sem limite agora mesmo.`}
            actions={
              <>
                <Link to="/auth" search={{ mode: undefined }} className="hero-btn-ghost inline-flex items-center px-4 text-sm">
                  Já tenho conta
                </Link>
                <Link to="/auth" search={{ mode: "register" }} className="hero-btn-primary inline-flex items-center gap-2 px-4 text-sm">
                  Criar conta grátis <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            }
          />
        )}

        {step === "intro" && (
          <PageHero
            image="trainer"
            size="lg"
            kicker="Sem cadastro · grátis"
            icon={Zap}
            title={
              <>
                Desafio diário <em>Norte Concurso</em>
              </>
            }
            description={`${questions.length} questões oficiais de concursos públicos, sorteadas hoje — as mesmas para todo mundo que entrar hoje. Correção na hora, com explicação didática em cada uma.`}
            actions={
              <button type="button" className="btn-brass" onClick={startChallenge}>
                Começar agora <ArrowRight />
              </button>
            }
          >
            <div className="page-hero__stats max-w-xl">
              <HeroStat icon={Zap} label="Questões" value={questions.length} />
              <HeroStat icon={ShieldCheck} label="Gabarito" value="Oficial" />
              <HeroStat icon={Sparkles} label="Custo" value="Grátis" />
            </div>
          </PageHero>
        )}

        <div className="mx-auto max-w-3xl">
        {step === "done" && (
          <TrainingResult total={questions.length} correct={correct} wrong={wrong} />
        )}

        {step === "playing" && question && (
          <QuestionPlayer
            question={question}
            index={index}
            total={questions.length}
            remaining={remaining}
            selected={selected}
            struck={struck}
            answered={answered}
            showResult={showResult}
            correct={correct}
            wrong={wrong}
            onSelect={(letter) => {
              if (answered) return;
              setStruck((items) => items.filter((item) => item !== letter));
              setSelected(letter);
            }}
            onToggleStrike={(letter) => {
              if (answered) return;
              setStruck((items) =>
                items.includes(letter)
                  ? items.filter((item) => item !== letter)
                  : [...items, letter],
              );
              if (selected === letter) setSelected(null);
            }}
            onSubmit={submit}
            onNext={next}
            isLast={index + 1 >= questions.length}
          />
        )}
        </div>
      </main>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center gap-4 text-center text-muted-foreground">
      {children}
    </div>
  );
}

function QuestionPlayer({
  question,
  index,
  total,
  remaining,
  selected,
  struck,
  answered,
  showResult,
  correct,
  wrong,
  onSelect,
  onToggleStrike,
  onSubmit,
  onNext,
  isLast,
}: {
  question: Question;
  index: number;
  total: number;
  remaining: number;
  selected: Answer | null;
  struck: Answer[];
  answered: boolean;
  showResult: boolean;
  correct: number;
  wrong: number;
  onSelect: (letter: Answer) => void;
  onToggleStrike: (letter: Answer) => void;
  onSubmit: () => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const isCorrect = selected === question.answer;
  const parsed = parseQuestion(question.text);
  const hasOptions = parsed.options.length > 0;
  const explanation = splitExplanation(question.explanation);
  const correctOption = parsed.options.find((option) => option.letter === question.answer);
  const certoErrado = !hasOptions && questionAnswers(question).join("") === "CE";
  const labelFor = (answer: Answer) =>
    hasOptions ? `Alternativa ${answer}` : questionAnswerLabel(answer, question);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          <Sparkles className="mr-1 h-3.5 w-3.5 text-amber-500" /> Desafio do dia
        </Badge>
        <Badge variant="outline">{remaining} restantes hoje</Badge>
      </div>
      <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-bold">
            Questão {index + 1} de {total}
          </span>
          <span className="text-muted-foreground">
            {correct} certas · {wrong} erradas
          </span>
        </div>
        <Progress value={(index / total) * 100} className="h-1.5" />
      </div>
      <Card
        className="overflow-hidden border-0 shadow-xl ring-1 ring-border/70 animate-in fade-in slide-in-from-bottom-3 duration-300"
        key={question.id}
      >
        <div className="h-1 bg-gradient-to-r from-amber-500 via-sky-500 to-blue-800" />
        <CardContent className="p-5 md:p-7">
          <div className="mb-5 flex flex-wrap gap-2">
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
              className="mb-4 rounded-xl border bg-muted/40 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer select-none items-center justify-between px-4 py-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                {parsed.baseLabel}
                <span className="text-[10px] font-medium normal-case">mostrar / ocultar</span>
              </summary>
              <div className="max-h-80 overflow-y-auto whitespace-pre-line px-4 pb-4 text-sm leading-7 text-foreground">
                {parsed.base}
              </div>
            </details>
          )}
          <p className="whitespace-pre-line text-base font-medium leading-7 text-foreground md:text-lg">
            {parsed.stem}
          </p>
          <p className="mt-5 text-xs font-black uppercase tracking-wider text-muted-foreground">
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
                      onClick={() => onSelect(option.letter)}
                      className={cn(
                        "group flex flex-1 items-start gap-3 rounded-xl border-2 border-border bg-background p-3 text-left text-sm leading-6 transition-all duration-200 hover:border-primary hover:bg-primary/5 disabled:hover:bg-background",
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
                          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold",
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
                      className="h-10 w-10 shrink-0"
                      disabled={answered}
                      aria-pressed={isStruck}
                      aria-label={
                        isStruck
                          ? `Desfazer risco da alternativa ${option.letter}`
                          : `Riscar alternativa ${option.letter}`
                      }
                      title={isStruck ? "Desfazer risco" : "Riscar alternativa"}
                      onClick={() => onToggleStrike(option.letter)}
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
                disabled={answered}
                onClick={() => onSelect(answer)}
                className={cn(
                  "group relative flex min-h-16 items-center justify-center gap-2 rounded-xl border-2 border-border bg-background px-4 font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:shadow-md disabled:hover:translate-y-0",
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
          <div className="mt-6 flex justify-end">
            <Button
              size="lg"
              disabled={!selected || answered}
              onClick={onSubmit}
              className="min-w-44"
            >
              Confirmar resposta <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={showResult} onOpenChange={(open) => !open && onNext()}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
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
          </div>
          <DialogFooter>
            <Button onClick={onNext}>
              {isLast ? "Ver resultado" : "Próxima questão"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TrainingResult({
  total,
  correct,
  wrong,
}: {
  total: number;
  correct: number;
  wrong: number;
}) {
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  return (
    <Card className="overflow-hidden shadow-xl">
      <div className="mock-result-hero tactical-feature-hero p-7 text-center text-white md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
          <Sparkles className="h-7 w-7 text-amber-200" />
        </div>
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-200">
          Desafio diário concluído
        </p>
        <h1 className="mt-1 text-4xl font-black md:text-5xl">{accuracy}%</h1>
        <p className="mt-2 text-slate-200">
          {correct} certas · {wrong} erradas · {total} questões
        </p>
      </div>
      <CardContent className="space-y-6 p-8 text-center">
        <Progress value={accuracy} />
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Foi seu desafio diário grátis. Crie uma conta pra treinar sem limite e desbloquear o
            acervo autoral completo.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" asChild>
              <Link to="/auth" search={{ mode: "register" }}>
                Criar conta grátis
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/auth">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
