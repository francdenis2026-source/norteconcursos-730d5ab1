import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionText } from "@/components/dashboard/QuestionText";
import { QuestionFigures } from "@/components/dashboard/QuestionFigures";
import { QuestionSupportText } from "@/components/library/QuestionSupportText";
import { parseQuestion, type Answer, type Question } from "@/lib/questionFormat";
import { hasStepByStep } from "@/lib/exerciseCenter";

type Props = { question: Question; position: number; total: number; onPrev: () => void; onNext: () => void };

/** Um exercício por vez. A resposta fica oculta até o aluno pedir; ele pode pedir antes ou depois de marcar. */
export function ExerciseCard({ question: q, position, total, onPrev, onNext }: Props) {
  const [picked, setPicked] = useState<Answer | null>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    setPicked(null);
    setRevealed(false);
  }, [q.id]);

  const parsed = parseQuestion(q.text);
  const hasOptions = parsed.options.length > 0;
  const options = hasOptions
    ? parsed.options
    : [
        { letter: "C" as const, text: "Certo" },
        { letter: "E" as const, text: "Errado" },
      ];
  const labelFor = (a: Answer) => (hasOptions ? `Alternativa ${a}` : a === "C" ? "Certo" : "Errado");
  const steps = q.resolutionSteps ?? [];

  return (
    <article className="exercise-card space-y-4" aria-label={`Exercício ${position} de ${total}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Exercício {position} de {total} · {q.subtopic?.trim() || "Geral"}
      </p>
      {parsed.base && (
        <aside className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border bg-muted/40 p-3 text-sm">
          <strong>{parsed.baseLabel}</strong>
          <QuestionSupportText text={parsed.base} citesLines={/linhas?\s+\d+/i.test(q.text)} />
        </aside>
      )}
      <QuestionText text={parsed.stem} />
      <QuestionFigures urls={q.figures} illustrations={parsed.illustrations} />
      <div className="space-y-2" role="group" aria-label="Alternativas">
        {options.map((o) => (
          <button
            type="button"
            key={o.letter}
            aria-pressed={picked === o.letter}
            onClick={() => setPicked(o.letter)}
            className={`flex min-h-11 w-full gap-3 rounded-xl border p-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${picked === o.letter ? "border-primary bg-primary/10" : "hover:border-primary/50"}`}
          >
            <strong>{o.letter}</strong>
            <span className="min-w-0 break-words"><QuestionText text={o.text} /></span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant={revealed ? "outline" : "default"} aria-expanded={revealed} onClick={() => setRevealed((v) => !v)}>
          {revealed ? <EyeOff className="mr-2 h-4 w-4" aria-hidden="true" /> : <Eye className="mr-2 h-4 w-4" aria-hidden="true" />}
          {revealed ? "Ocultar resposta" : "Ver resposta e passo a passo"}
        </Button>
        <span className="ml-auto flex gap-2">
          <Button type="button" variant="outline" disabled={position <= 1} onClick={onPrev}>
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Anterior
          </Button>
          <Button type="button" variant="outline" disabled={position >= total} onClick={onNext}>
            Próximo <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        </span>
      </div>
      {revealed && (
        <section className="space-y-3 rounded-xl border p-4" aria-live="polite">
          <p className="text-sm">
            <strong>Gabarito: {labelFor(q.answer)}</strong>
            {picked && (picked === q.answer ? " · você acertou" : ` · você marcou ${labelFor(picked)}`)}
          </p>
          <section>
            <h3 className="mb-1 text-sm font-bold">Entenda a resposta</h3>
            <QuestionText text={q.explanation} />
          </section>
          <section>
            <h3 className="mb-1 text-sm font-bold">Como resolver</h3>
            {hasStepByStep(q) ? (
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                {steps.map((s, i) => <li key={i}><QuestionText text={s} /></li>)}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">Esta questão não tem resolução passo a passo cadastrada.</p>
            )}
          </section>
          {q.studyTip && (
            <section className="rounded-lg border bg-muted/40 p-3">
              <h3 className="mb-1 text-sm font-bold">Dica de prova</h3>
              <QuestionText text={q.studyTip} />
            </section>
          )}
        </section>
      )}
    </article>
  );
}
