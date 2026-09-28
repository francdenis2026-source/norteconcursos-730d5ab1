import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  Target,
  X,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/question-trainer")({
  validateSearch: (search: Record<string, unknown>) => ({
    contest: typeof search.contest === "string" ? search.contest : undefined,
    board: typeof search.board === "string" ? search.board : undefined,
    career: typeof search.career === "string" ? search.career : undefined,
    year: typeof search.year === "string" ? search.year : undefined,
    subject: typeof search.subject === "string" ? search.subject : undefined,
    source: typeof search.source === "string" ? search.source : undefined,
  }),
  component: QuestionTrainer,
});

type Answer = "A" | "B" | "C" | "D" | "E";
type Source = "official" | "curated" | "personal";
type LegalBasis = { title?: string; lei?: string; artigo?: string; url?: string };
type Question = {
  id: string;
  source: Source;
  contest: string;
  year: string;
  career: string;
  board: string;
  subject: string;
  subtopic: string | null;
  text: string;
  answer: Answer;
  explanation: string;
  legalBasis: LegalBasis[];
};

const parseBasis = (value: unknown): LegalBasis[] =>
  Array.isArray(value)
    ? value.filter((item): item is LegalBasis => Boolean(item) && typeof item === "object")
    : [];
const boardAnswers = (board: string): Answer[] =>
  /CEBRASPE|CESPE/i.test(board)
    ? ["C", "E"]
    : /IBFC/i.test(board)
      ? ["A", "B", "C", "D"]
      : ["A", "B", "C", "D", "E"];
const answerLabel = (answer: Answer, board: string) =>
  /CEBRASPE|CESPE/i.test(board) ? (answer === "C" ? "Certo" : "Errado") : `Alternativa ${answer}`;

function QuestionTrainer() {
  const filters = Route.useSearch();
  const { user, isLoading: authLoading } = useAuthStatus();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<Answer | null>(null);
  const [answered, setAnswered] = React.useState(false);
  const [helpUsed, setHelpUsed] = React.useState(false);
  const [modal, setModal] = React.useState<"help" | "result" | null>(null);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);
  const [startedAt, setStartedAt] = React.useState(Date.now());

  React.useEffect(() => {
    if (authLoading || !user || user.id === "demo-user") {
      setLoading(false);
      return;
    }
    let active = true;
    void (async () => {
      try {
        const [officialResult, curatedResult, personalResult] = await Promise.all([
          supabase
            .from("official_exam_questions")
            .select(
              "id,contest_name,exam_year,career_name,exam_board,subject,question_text,official_answer,review_note,legal_basis",
            )
            .eq("content_status", "active")
            .neq("official_answer", "X"),
          supabase
            .from("curated_question_catalog")
            .select(
              "id,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,legal_basis",
            )
            .eq("content_status", "active"),
          supabase
            .from("question_bank")
            .select(
              "id,contest_name,contest_year,subject,subtopic,question_text,official_answer,explanation,legal_basis,content_status",
            )
            .eq("user_id", user.id),
        ]);
        if (officialResult.error) throw officialResult.error;
        if (curatedResult.error) throw curatedResult.error;
        if (personalResult.error) throw personalResult.error;
        const catalog: Question[] = [
          ...((officialResult.data || []) as Array<Record<string, unknown>>).map((row) => ({
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
          })),
          ...((curatedResult.data || []) as Array<Record<string, unknown>>).map((row) => ({
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
          })),
          ...((personalResult.data || []) as Array<Record<string, unknown>>)
            .filter(
              (row) =>
                !["obsolete", "revoked", "archived"].includes(
                  String(row.content_status || "active"),
                ) && /^[A-E]$/.test(String(row.official_answer)),
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
            })),
        ];
        const match = (actual: string, expected?: string) => !expected || actual === expected;
        const filtered = catalog.filter(
          (q) =>
            match(q.contest, filters.contest) &&
            match(q.board, filters.board) &&
            match(q.career, filters.career) &&
            match(q.year, filters.year) &&
            match(q.subject, filters.subject) &&
            match(q.source, filters.source),
        );
        if (active) setQuestions(filtered.sort(() => Math.random() - 0.5));
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
  }, [
    authLoading,
    user,
    filters.board,
    filters.career,
    filters.contest,
    filters.source,
    filters.subject,
    filters.year,
  ]);

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
    setAnswered(false);
    setHelpUsed(false);
    setStartedAt(Date.now());
    setQuestions((items) => [...items].sort(() => Math.random() - 0.5));
  };

  if (authLoading || loading)
    return (
      <Center>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Preparando seu treino…</p>
      </Center>
    );
  if (!user || user.id === "demo-user")
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
  if (!questions.length)
    return (
      <Center>
        <Target className="h-10 w-10 text-primary" />
        <p>Nenhuma questão ativa corresponde aos filtros escolhidos.</p>
        <Button asChild>
          <Link to="/dashboard/question-bank">Alterar filtros</Link>
        </Button>
      </Center>
    );
  if (!question)
    return (
      <TrainingResult total={questions.length} correct={correct} wrong={wrong} restart={restart} />
    );

  const isCorrect = selected === question.answer;
  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard/question-bank">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Configuração
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Flame className="mr-1 h-3.5 w-3.5 text-orange-500" /> Treinador
          </Badge>
          <Badge variant="outline">Não afeta ranking</Badge>
        </div>
      </header>
      <div className="rounded-2xl border bg-card px-4 py-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-xs">
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
        className="overflow-hidden border-0 shadow-xl ring-1 ring-border/70 animate-in fade-in slide-in-from-bottom-3 duration-300"
        key={question.id}
      >
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500" />
        <CardContent className="p-5 md:p-7">
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge>{question.board}</Badge>
            <Badge variant="outline">{question.subject}</Badge>
            <Badge variant="outline">
              {question.contest} · {question.year}
            </Badge>
          </div>
          <p className="text-base font-medium leading-7 text-foreground md:text-lg">
            {question.text}
          </p>
          <p className="mt-5 text-xs font-black uppercase tracking-wider text-muted-foreground">
            {/CEBRASPE|CESPE/i.test(question.board)
              ? "Julgue o item"
              : "Assinale a alternativa correta"}
          </p>
          <div
            className={cn(
              "mt-3 grid gap-2",
              boardAnswers(question.board).length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-5",
            )}
          >
            {boardAnswers(question.board).map((answer) => (
              <button
                key={answer}
                type="button"
                disabled={answered}
                onClick={() => setSelected(answer)}
                className={cn(
                  "group flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 px-4 font-bold transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md disabled:hover:translate-y-0",
                  selected === answer && !answered && "border-primary bg-primary/5 text-primary",
                  answered &&
                    answer === question.answer &&
                    "border-emerald-500 bg-emerald-50 text-emerald-700",
                  answered &&
                    selected === answer &&
                    answer !== question.answer &&
                    "border-rose-500 bg-rose-50 text-rose-700",
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs group-hover:bg-primary group-hover:text-primary-foreground">
                  {answer}
                </span>
                {answerLabel(answer, question.board)}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
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
              className="min-w-44"
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
                    /CEBRASPE|CESPE/i.test(question.board)
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
                  Você marcou {selected ? answerLabel(selected, question.board) : "—"}. O gabarito é{" "}
                  {answerLabel(question.answer, question.board)}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="mb-1 text-xs font-black uppercase tracking-wider text-primary">
                    Explicação pedagógica
                  </p>
                  <p className="text-sm leading-6">{question.explanation}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Como resolver melhor
                  </p>
                  <ol className="space-y-2 text-sm">
                    <li>1. Classifique o comando e o tema cobrado.</li>
                    <li>2. Localize a palavra que confirma ou invalida a afirmação.</li>
                    <li>3. Registre a regra no caderno de erros e refaça em 24 horas.</li>
                  </ol>
                </div>
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
                            href={basis.url}
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
