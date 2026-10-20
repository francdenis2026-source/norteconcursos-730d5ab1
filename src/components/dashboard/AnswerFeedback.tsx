import { useEffect, useRef, type ReactNode } from "react";
import { Check, CheckCircle2, Timer, X, XCircle } from "lucide-react";
import "@/styles/answer-feedback.css";

type AnswerFeedbackProps = {
  selected: string;
  answer: string;
  correct: boolean;
  sourceLabel?: string;
  /** Tempo ativo gasto até responder; ausente quando não foi medido (ex.: resposta antiga revisitada). */
  elapsedSeconds?: number | undefined;
  children?: ReactNode;
};

/** 75 -> "1min 15s"; 42 -> "42s". */
export function formatAnswerTime(seconds: number) {
  const total = Math.max(0, Math.round(Number.isFinite(seconds) ? seconds : 0));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h
    ? `${h}h ${String(m).padStart(2, "0")}min`
    : m
      ? `${m}min ${String(s).padStart(2, "0")}s`
      : `${s}s`;
}

/** One clear verdict across guest and authenticated practice; correctness never relies on color. */
export function AnswerFeedback({
  selected,
  answer,
  correct,
  sourceLabel = "Gabarito",
  elapsedSeconds,
  children,
}: AnswerFeedbackProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const node = ref.current;
      if (!node) return;
      const bounds = node.getBoundingClientRect();
      // Keep the correction visible after long stems, without moving focus away from the user.
      if (bounds.bottom > window.innerHeight - 24 || bounds.top < 100) {
        node.scrollIntoView({ block: "nearest", behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [selected, answer]);
  const VerdictIcon = correct ? CheckCircle2 : XCircle;
  return (
    <section
      ref={ref}
      className="answer-feedback"
      data-correct={correct}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Correção da resposta"
    >
      <div className="answer-feedback__heading">
        <span className="answer-feedback__icon">
          <VerdictIcon aria-hidden="true" className="text-current" />
        </span>
        <div>
          <h2>{correct ? "Você acertou" : "Você errou"}</h2>
          <p>
            {correct
              ? "Sua resposta corresponde ao gabarito."
              : "Compare as respostas e confira a explicação para revisar este ponto."}
          </p>
        </div>
        {elapsedSeconds !== undefined && (
          <div
            className="answer-feedback__time ml-auto inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            title="Tempo ativo gasto nesta questão, sem contar abas ocultas nem pausas"
            data-answer-time={Math.round(elapsedSeconds)}
          >
            <Timer className="h-3 w-3" aria-hidden="true" />
            <span>
              Respondida em{" "}
              <strong className="font-semibold text-foreground">
                {formatAnswerTime(elapsedSeconds)}
              </strong>
            </span>
          </div>
        )}
      </div>
      <div className="answer-feedback__comparison">
        <div className="answer-feedback__selected">
          <span>Sua resposta</span>
          <strong>
            {correct ? (
              <Check aria-hidden="true" className="text-current" />
            ) : (
              <X aria-hidden="true" className="text-current" />
            )}
            {selected}
          </strong>
        </div>
        <div className="answer-feedback__official">
          <span>{sourceLabel}</span>
          <strong>
            <Check aria-hidden="true" className="text-current" />
            {answer}
          </strong>
        </div>
      </div>
      {children && <div className="answer-feedback__comment">{children}</div>}
    </section>
  );
}
