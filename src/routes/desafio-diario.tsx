import {
  dailyGuestQuestions,
  pendingGuestQuestions,
  guestContentKey,
} from "@/lib/dailyGuestQuestions";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpenCheck,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  GUEST_DAILY_LIMIT,
  getGuestProgressToday,
  getAcreDateKey,
  onAcreDayChange,
  registerGuestAnswer,
} from "@/lib/guestQuota";
import {
  type Answer,
  type Question,
  basisHref,
  shuffled,
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

type Step = "loading" | "blocked" | "intro" | "playing" | "done" | "error" | "unavailable";

function DesafioDiario() {
  const [step, setStep] = React.useState<Step>("loading");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const sessionDay = React.useRef("");
  const submitting = React.useRef(false);
  const [remaining, setRemaining] = React.useState(GUEST_DAILY_LIMIT);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [answered, setAnswered] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);
  const [dayChanged, setDayChanged] = React.useState(false);

  // Virou o dia no Acre: as 10 questões grátis foram renovadas. Se a pessoa deixou a
  // aba aberta, recarrega para buscar o novo conjunto (sem interromper quem está jogando).
  React.useEffect(() => onAcreDayChange(() => setDayChanged(true)), []);
  React.useEffect(() => {
    if (dayChanged && step !== "playing") window.location.reload();
  }, [dayChanged, step]);

  React.useEffect(() => {
    let active = true;
    void (async () => {
      try {
        await getAcreDateKey(true);
        const progress = await getGuestProgressToday();
        const remainingToday = Math.max(0, GUEST_DAILY_LIMIT - progress.used);
        sessionDay.current = progress.day;
        const { data, error } = await supabase
          .rpc("get_daily_guest_questions", { p_limit: 10 })
          .select(
            "id,contest_name,exam_year,career_name,exam_board,subject,question_text,official_answer,review_note,legal_basis,difficulty,state,career_category,content_status,law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required",
          );
        if (error) throw error;
        if ((await getAcreDateKey(true)) !== progress.day) {
          if (active) window.location.reload();
          return;
        }
        const daily = shuffled(
          pendingGuestQuestions(
            dailyGuestQuestions((data || []) as Record<string, unknown>[]),
            progress,
          ),
        );
        if (!active) return;
        setRemaining(remainingToday);
        setCorrect(progress.answers.filter((a) => a.correct).length);
        setWrong(progress.answers.filter((a) => !a.correct).length);
        setQuestions(daily);
        setStep(remainingToday <= 0 ? "blocked" : !daily.length ? "unavailable" : "intro");
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
    setSelected(null);
    setAnswered(false);
    setStep("playing");
  };

  const question = questions[index];
  const submit = async () => {
    if (!selected || !question || answered || submitting.current) return;
    submitting.current = true;
    try {
      const isCorrect = selected === question.answer;
      const result = await registerGuestAnswer(
        { id: question.id, key: guestContentKey(question.text), correct: isCorrect },
        sessionDay.current,
      );
      setRemaining(Math.max(0, GUEST_DAILY_LIMIT - result.used));
      if (!result.recorded) {
        const pending = pendingGuestQuestions(questions, result);
        setQuestions(pending);
        setIndex(0);
        setSelected(null);
        setCorrect(result.answers.filter((a) => a.correct).length);
        setWrong(result.answers.filter((a) => !a.correct).length);
        setStep(
          result.used >= GUEST_DAILY_LIMIT ? "blocked" : pending.length ? "intro" : "unavailable",
        );
        return;
      }
      setAnswered(true);
      if (isCorrect) setCorrect((value) => value + 1);
      else setWrong((value) => value + 1);
    } catch {
      setErrorMessage(
        "Não foi possível salvar sua resposta neste navegador. Verifique se o armazenamento está disponível e tente novamente.",
      );
      setStep("error");
    } finally {
      submitting.current = false;
    }
  };
  const next = () => {
    setSelected(null);
    setAnswered(false);
    if (index + 1 >= questions.length || remaining <= 0) {
      setStep("done");
    } else {
      setIndex((value) => value + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[oklch(0.12_0.025_263/0.92)] pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" aria-label="Norte Concurso — início">
            <NorteBrand light />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="app-top-btn !w-auto gap-1.5 px-3 text-sm font-semibold text-white/75 hover:!bg-white/10 hover:!text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Início
            </Link>
            <Link
              to="/auth"
              search={{ mode: "register" }}
              className="btn-brass !h-9 !px-4 !text-sm"
            >
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

        {step === "unavailable" && (
          <Center>
            <BookOpenCheck className="h-8 w-8" />
            <p>Não há novas questões liberadas para você neste desafio agora.</p>
            <p className="text-sm">
              A próxima rodada renova à meia-noite do Acre. Sua cota não foi consumida por esta
              consulta.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Consultar novamente
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
                <Link
                  to="/auth"
                  search={{ mode: undefined }}
                  className="hero-btn-ghost inline-flex items-center px-4 text-sm"
                >
                  Já tenho conta
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: "register" }}
                  className="hero-btn-primary inline-flex items-center gap-2 px-4 text-sm"
                >
                  Criar conta grátis <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            }
          />
        )}

        {step === "intro" && (
          <div className="daily-intro">
            <PageHero
              className="daily-intro__hero"
              image="trainer"
              size="lg"
              kicker="Sem cadastro · grátis"
              icon={Zap}
              title={
                <>
                  Desafio diário <em>Norte Concurso</em>
                </>
              }
              description={`${questions.length} questões de certo ou errado de segurança pública disponíveis para você hoje, com explicação após cada resposta. A rodada é compartilhada entre os visitantes e renova à meia-noite do Acre.`}
              actions={
                <button type="button" className="btn-brass" onClick={startChallenge}>
                  Começar agora <ArrowRight />
                </button>
              }
            >
              <div className="page-hero__stats max-w-xl">
                <HeroStat icon={Zap} label="Questões" value={questions.length} />
                <HeroStat icon={ShieldCheck} label="Gabarito" value="Oficial" />
                <HeroStat
                  icon={Sparkles}
                  label="Disciplinas"
                  value={new Set(questions.map((q) => q.subject)).size}
                />
              </div>
            </PageHero>
            <p
              className="flex flex-wrap gap-2 text-sm text-muted-foreground"
              aria-label="Formato do desafio"
            >
              <Badge variant="outline">Cebraspe / Cespe · Certo ou errado</Badge>
              <Badge variant="outline">Segurança pública</Badge>
              <span>Confira a explicação após confirmar a resposta.</span>
            </p>
            <section className="daily-intro__guide" aria-labelledby="daily-guide-title">
              <figure className="daily-intro__visual">
                <img
                  src="/media/hero/study-desk.webp"
                  alt="Ambiente de estudo e preparação para concursos"
                  width={960}
                  height={540}
                />
                <figcaption>Um treino por dia. Mais direção para sua preparação.</figcaption>
              </figure>
              <div className="daily-intro__steps">
                <h2 id="daily-guide-title">Seu treino em três passos</h2>
                <ol>
                  <li>
                    <b>01</b>
                    <div>
                      <strong>Resolva no seu ritmo</strong>
                      <p>Leia o enunciado e marque Certo ou Errado.</p>
                    </div>
                  </li>
                  <li>
                    <b>02</b>
                    <div>
                      <strong>Entenda a resposta</strong>
                      <p>Confira o gabarito e a explicação após responder.</p>
                    </div>
                  </li>
                  <li>
                    <b>03</b>
                    <div>
                      <strong>Veja seu resultado</strong>
                      <p>Ao concluir, acompanhe seus acertos e pontos de revisão.</p>
                    </div>
                  </li>
                </ol>
                <button type="button" className="btn-brass" onClick={startChallenge}>
                  Iniciar meu desafio <ArrowRight />
                </button>
              </div>
            </section>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          {step === "done" && (
            <TrainingResult total={correct + wrong} correct={correct} wrong={wrong} />
          )}

          {step === "playing" && question && (
            <QuestionPlayer
              question={question}
              index={index}
              total={questions.length}
              remaining={remaining}
              selected={selected}
              answered={answered}
              correct={correct}
              wrong={wrong}
              onSelect={(letter) => {
                if (answered) return;
                setSelected(letter);
              }}
              onSubmit={submit}
              onNext={next}
              isLast={index + 1 >= questions.length || remaining <= 0}
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
  answered,
  correct,
  wrong,
  onSelect,
  onSubmit,
  onNext,
  isLast,
}: {
  question: Question;
  index: number;
  total: number;
  remaining: number;
  selected: Answer | null;
  answered: boolean;
  correct: number;
  wrong: number;
  onSelect: (answer: Answer) => void;
  onSubmit: () => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const parsed = parseQuestion(question.text);
  const explanation = splitExplanation(question.explanation);
  const isCorrect = selected === question.answer;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="secondary">Desafio de segurança pública</Badge>
        <Badge variant="outline">{remaining} restantes hoje</Badge>
      </div>
      <div className="rounded-xl border bg-card px-4 py-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold">
            Questão {index + 1} de {total}
          </span>
          <span className="text-muted-foreground">
            {correct} certas · {wrong} erradas
          </span>
        </div>
        <Progress value={((index + (answered ? 1 : 0)) / total) * 100} className="h-1.5" />
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-5 md:p-7">
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge>{question.board}</Badge>
            <Badge variant="outline">Certo ou errado</Badge>
            <Badge variant="outline">{question.subject}</Badge>
            <Badge variant="outline">
              {question.contest} · {question.year}
            </Badge>
            <Badge variant="outline">{question.career}</Badge>
          </div>
          {parsed.base && (
            <details open className="mb-4 rounded-xl border bg-muted/40">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                {parsed.baseLabel}
              </summary>
              <div className="max-h-80 overflow-y-auto whitespace-pre-line px-4 pb-4 text-sm leading-7">
                {parsed.base}
              </div>
            </details>
          )}
          <p className="whitespace-pre-line text-base font-medium leading-7 md:text-lg">
            {parsed.stem}
          </p>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Julgue o item
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(["C", "E"] as const).map((answer) => (
              <button
                key={answer}
                type="button"
                aria-pressed={selected === answer}
                disabled={answered}
                onClick={() => onSelect(answer)}
                className={cn(
                  "min-h-16 rounded-xl border-2 px-4 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                  selected === answer && !answered
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-border bg-background",
                  answered &&
                    answer === question.answer &&
                    "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200",
                  answered &&
                    selected === answer &&
                    !isCorrect &&
                    "border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
                )}
              >
                {answer === "C" ? "Certo" : "Errado"}
              </button>
            ))}
          </div>
          {!answered && (
            <div className="mt-6 flex justify-end">
              <Button size="lg" disabled={!selected} onClick={onSubmit}>
                Confirmar resposta <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {answered && (
        <section
          aria-label="Explicação da resposta"
          aria-live="polite"
          className="space-y-4 rounded-2xl border bg-card p-5 md:p-7"
        >
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            ) : (
              <XCircle className="h-6 w-6 text-rose-600" />
            )}
            <div>
              <h2 className="text-lg font-bold">
                {isCorrect ? "Resposta correta" : "Vamos revisar este ponto"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Gabarito oficial:{" "}
                <strong className="text-foreground">
                  {question.answer === "C" ? "Certo" : "Errado"}
                </strong>
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-bold">Entenda a resposta</h3>
            <p className="whitespace-pre-line text-sm leading-7">{explanation.main}</p>
          </div>
          {explanation.example && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100">
              <h3 className="mb-2 text-sm font-bold">Exemplo prático</h3>
              <p className="whitespace-pre-line text-sm leading-7">{explanation.example}</p>
            </div>
          )}
          {question.legalBasis.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {question.legalBasis.map((basis, i) => (
                <a
                  key={i}
                  href={basisHref(basis)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border px-3 py-2 text-xs underline"
                >
                  {basis.title || basis.lei || "Consultar fonte oficial"}
                </a>
              ))}
            </div>
          )}
          <div className="flex justify-end">
            <Button size="lg" onClick={onNext}>
              {isLast ? "Ver resultado" : "Próxima questão"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      )}
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
