import { QuestionText } from "@/components/dashboard/QuestionText";
import { QuestionCode } from "@/components/dashboard/QuestionCode";
import { QuestionTimer } from "@/components/dashboard/QuestionTimer";
import { QuestionStudyCompanion } from "@/components/dashboard/QuestionStudyCompanion";
import { useGuestQuestionTimer } from "@/hooks/useGuestQuestionTimer";
import { AnswerFeedback } from "@/components/dashboard/AnswerFeedback";
import "@/styles/daily-challenge.css";
import { QuestionFigures } from "@/components/dashboard/QuestionFigures";
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
  Loader2,
  ShieldCheck,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { PageHero } from "@/components/dashboard/PageHero";
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
    <div className="daily-page min-h-[100svh] bg-background">
      <header className="daily-header sticky top-0 z-30 pt-[env(safe-area-inset-top)]">
        <div className="daily-container flex min-h-18 items-center justify-between gap-3">
          <Link to="/" aria-label="Norte Concurso — início">
            <NorteBrand />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="daily-home-link">
              <ArrowLeft className="h-4 w-4" /> Início
            </Link>
            <Link
              to="/auth"
              search={{ mode: "register" }}
              className="btn-brass !min-h-11 !px-4 !text-sm"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      <main className="daily-container daily-main">
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
            description={`Suas ${GUEST_DAILY_LIMIT} questões grátis de hoje já foram usadas neste computador. O desafio libera de novo à meia-noite do Acre. Crie uma conta para conhecer os planos e continuar sua preparação.`}
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
          <div className="daily-overview">
            <div className="daily-heading">
              <div>
                <span className="daily-eyebrow">SUA PREPARAÇÃO, TODOS OS DIAS</span>
                <h1>Desafio diário</h1>
              </div>
              <p>
                Segurança pública <span aria-hidden="true">/</span> Cebraspe e Cespe
              </p>
            </div>
            <div className="daily-intro-grid">
              <section className="daily-cover" aria-labelledby="daily-cover-title">
                <img
                  src="/media/hero/trainer.webp"
                  alt=""
                  width={1536}
                  height={1024}
                  fetchPriority="high"
                />
                <div className="daily-cover__content">
                  <span className="daily-cover__badge">
                    <Zap size={14} /> GRÁTIS · SEM CADASTRO
                  </span>
                  <h2 id="daily-cover-title">
                    Um desafio hoje.
                    <br />
                    <em>Mais preparo amanhã.</em>
                  </h2>
                  <p>
                    Questões de concursos de segurança pública para testar seus conhecimentos e
                    aprender com cada resposta.
                  </p>
                  <button type="button" className="btn-brass" onClick={startChallenge}>
                    Começar meu desafio <ArrowRight size={18} />
                  </button>
                  <span className="daily-cover__note">
                    <ShieldCheck size={16} /> Gabarito oficial e explicação após responder
                  </span>
                </div>
              </section>
              <aside className="daily-round" aria-labelledby="daily-round-title">
                <div className="daily-round__heading">
                  <span className="daily-eyebrow">SUA RODADA</span>
                  <span className="daily-round__tag">Disponível hoje</span>
                </div>
                <h2 id="daily-round-title">Pronto para começar?</h2>
                <div className="daily-metrics">
                  <div>
                    <strong>{questions.length.toString().padStart(2, "0")}</strong>
                    <span>questões disponíveis</span>
                  </div>
                  <div>
                    <strong>
                      {new Set(questions.map((q) => q.subject)).size.toString().padStart(2, "0")}
                    </strong>
                    <span>disciplinas</span>
                  </div>
                </div>
                <h3>Neste desafio</h3>
                <ul className="daily-subjects">
                  {Array.from(new Set(questions.map((q) => q.subject))).map((subject) => (
                    <li key={subject}>
                      <BookOpenCheck size={15} />
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
                <div className="daily-round__renewal">
                  <Sparkles size={18} />
                  <p>
                    <strong>Uma nova rodada a cada dia</strong>
                    <span>
                      Renova à meia-noite do Acre. Até {GUEST_DAILY_LIMIT} respostas grátis por dia
                      neste aparelho.
                    </span>
                  </p>
                </div>
              </aside>
            </div>
            <section className="daily-method" aria-label="Como funciona o desafio">
              {[
                ["01", "Resolva no seu ritmo", "Leia o enunciado e escolha Certo ou Errado."],
                ["02", "Aprenda com a resposta", "Confirme sua escolha para ver a explicação."],
                ["03", "Acompanhe seu resultado", "Veja seus acertos e o que precisa revisar."],
              ].map(([number, title, description]) => (
                <div key={number}>
                  <span>{number}</span>
                  <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        <div className={step === "done" ? "daily-result" : "daily-workspace"}>
          {step === "done" && (
            <TrainingResult total={correct + wrong} correct={correct} wrong={wrong} />
          )}

          {step === "playing" && question && (
            <QuestionPlayer
              key={question.id}
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
  const { seconds, paused } = useGuestQuestionTimer(answered);
  const parsed = parseQuestion(question.text);
  const explanation = splitExplanation(question.explanation);
  const isCorrect = selected === question.answer;
  return (
    <div className="daily-player">
      <aside className="daily-session" aria-label="Progresso do desafio">
        <span className="daily-eyebrow">DESAFIO DIÁRIO</span>
        <h1>Seu treino de hoje</h1>
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
              {Math.round(((index + (answered ? 1 : 0)) / total) * 100)}% da rodada
            </span>
          </div>
          <Progress value={((index + (answered ? 1 : 0)) / total) * 100} className="h-1.5" />
        </div>
        <div className="daily-session__scores">
          <div>
            <strong>{correct}</strong>
            <span>Certas hoje</span>
          </div>
          <div>
            <strong>{wrong}</strong>
            <span>Erradas hoje</span>
          </div>
        </div>
        <p className="daily-session__tip">
          <BookOpenCheck size={18} /> Leia com atenção. A explicação aparece depois de confirmar sua
          resposta.
        </p>
        <p className="daily-session__renewal">Nova rodada à meia-noite do Acre.</p>
      </aside>
      <div className="daily-question-column">
        <Card className="daily-question-card overflow-hidden">
          <CardContent className="p-5 md:p-7">
            <div className="daily-question-heading">
              <div>
                <span className="daily-eyebrow">SUA PRÁTICA DE HOJE</span>
                <h2>
                  Questão {index + 1} <span>de {total}</span>
                </h2>
              </div>
              <QuestionTimer seconds={seconds} completed={answered} paused={paused} />
            </div>
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
            <QuestionCode question={question} />
            <QuestionText text={parsed.stem} />
            <QuestionFigures urls={question.figures} illustrations={parsed.illustrations} />
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
                    "daily-answer min-h-16 rounded-xl border-2 px-4 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                    selected === answer && !answered
                      ? "daily-answer-selected"
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
                  <span>{answer === "C" ? "Certo" : "Errado"}</span>
                  {answered && (answer === question.answer || selected === answer) && (
                    <span className="daily-answer__outcome">
                      {answer === question.answer ? (
                        <Check aria-hidden="true" size={14} />
                      ) : (
                        <XCircle aria-hidden="true" size={14} />
                      )}
                      {answer === question.answer ? "Gabarito" : "Sua resposta"}
                    </span>
                  )}
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
          <>
            <AnswerFeedback
              selected={selected === "C" ? "Certo" : "Errado"}
              answer={question.answer === "C" ? "Certo" : "Errado"}
              correct={isCorrect}
              sourceLabel="Gabarito oficial"
            />
            <section
              aria-label="Explicação da resposta"
              className="space-y-4 rounded-2xl border bg-card p-5 md:p-7"
            >
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
          </>
        )}
        <QuestionStudyCompanion subject={question.subject} answered={answered} />
      </div>
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
            Foi seu desafio diário grátis. Crie uma conta para conhecer os planos e continuar sua
            preparação com o acervo da plataforma.
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
