import { useMemo, useState } from "react";
import { CheckCircle2, ListChecks, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LAW_PRACTICE_QUESTIONS } from "@/data/lawPracticeQuestions";

/**
 * Questões autorais de múltipla escolha para uma lei inteira: exercício fixo (não liga ao
 * dispositivo aberto), distinto do acervo oficial da plataforma (ver LawPracticeLink, exibido
 * junto). Estado só do navegador: não é registrado como tentativa nem altera o progresso da lei.
 */
export function LawPracticeQuiz({ law }: { law: string }) {
  const questions = useMemo(() => LAW_PRACTICE_QUESTIONS[law] ?? [], [law]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<{ right: number; answered: number }>({ right: 0, answered: 0 });
  const [finished, setFinished] = useState(false);

  if (!questions.length) {
    return (
      <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
        As questões autorais desta lei ainda estão em preparação.
      </p>
    );
  }

  const question = questions[index]!;
  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore({ right: 0, answered: 0 });
    setFinished(false);
  };
  const pick = (letter: string) => {
    if (picked) return;
    setPicked(letter);
    setScore((prev) => ({
      right: prev.right + (letter === question.answer ? 1 : 0),
      answered: prev.answered + 1,
    }));
  };
  const next = () => {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setPicked(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((100 * score.right) / questions.length);
    return (
      <div className="space-y-4 rounded-xl border bg-card p-5 text-center">
        <ListChecks className="mx-auto h-8 w-8 text-primary" aria-hidden />
        <p className="text-lg font-bold">
          Você acertou {score.right} de {questions.length} questões ({pct}%)
        </p>
        <p className="text-sm text-muted-foreground">
          Exercícios autorais de fixação; não são questões atribuídas a nenhuma banca.
        </p>
        <Button variant="outline" className="gap-2" onClick={restart}>
          <RotateCcw className="h-4 w-4" /> Refazer as {questions.length} questões
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Questão {index + 1} de {questions.length}
        </span>
        {score.answered > 0 && (
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold tabular-nums">
            {score.right} acerto{score.right === 1 ? "" : "s"}
          </span>
        )}
      </div>
      <p className="font-semibold leading-7">{question.stem}</p>
      <div className="space-y-2">
        {question.options.map((option) => {
          const isPicked = picked === option.letter;
          const isAnswer = option.letter === question.answer;
          const reveal = !!picked;
          return (
            <button
              key={option.letter}
              type="button"
              disabled={reveal}
              onClick={() => pick(option.letter)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition-colors",
                !reveal && "hover:border-primary/50 hover:bg-muted/50",
                reveal && isAnswer && "border-emerald-500 bg-emerald-500/10",
                reveal && isPicked && !isAnswer && "border-rose-500 bg-rose-500/10",
                reveal && !isPicked && !isAnswer && "opacity-60",
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold">
                {option.letter}
              </span>
              <span className="min-w-0 flex-1 leading-6">{option.text}</span>
              {reveal && isAnswer && (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              )}
              {reveal && isPicked && !isAnswer && (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
      {picked && (
        <div
          className={cn(
            "space-y-2 rounded-xl border p-4 text-sm",
            picked === question.answer
              ? "border-emerald-500/40 bg-emerald-500/5"
              : "border-amber-500/40 bg-amber-500/5",
          )}
        >
          <p className="font-semibold">
            {picked === question.answer ? "Resposta correta." : `A resposta certa é a ${question.answer}.`}
          </p>
          <p className="leading-6 text-muted-foreground">{question.explanation}</p>
          {question.articles && question.articles.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Dispositivo{question.articles.length > 1 ? "s" : ""}: {question.articles.join("; ")}.
            </p>
          )}
          <Button size="sm" onClick={next}>
            {index + 1 < questions.length ? "Próxima questão →" : "Ver resultado"}
          </Button>
        </div>
      )}
    </div>
  );
}
