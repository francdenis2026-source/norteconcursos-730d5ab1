import "./QuestionTimer.css";
import { TacticalClock } from "@/components/brand/TacticalClock";

/** A compact stopwatch: the dial shows seconds within a minute, never a deadline. */
export function QuestionTimer({
  seconds,
  completed = false,
  paused = false,
  compact = false,
}: {
  seconds: number;
  completed?: boolean;
  paused?: boolean;
  /** Inline badge instead of the full dial — for headers with little vertical room. */
  compact?: boolean;
}) {
  const elapsed = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const remainder = elapsed % 60;
  const time = hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  return (
    <div
      className="question-stopwatch"
      data-completed={completed || undefined}
      data-paused={(!completed && paused) || undefined}
      role="timer"
      aria-live="off"
      aria-label={`Tempo nesta questão: ${time}${completed ? ", finalizado" : paused ? ", pausado" : ""}`}
    >
      <TacticalClock
        size={compact ? "compact" : "question"}
        time={time}
        seconds={elapsed}
        {...(compact ? {} : { label: "Nesta questão" })}
        status={completed ? "Finalizado" : paused ? "Pausado" : "Tempo ativo"}
        paused={paused && !completed}
        completed={completed}
      />
    </div>
  );
}
