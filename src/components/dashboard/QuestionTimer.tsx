import "./QuestionTimer.css";

/** A compact stopwatch: the dial shows seconds within a minute, never a deadline. */
export function QuestionTimer({
  seconds,
  completed = false,
  paused = false,
}: {
  seconds: number;
  completed?: boolean;
  paused?: boolean;
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
      <svg className="question-stopwatch__dial" viewBox="0 0 40 46" fill="none" aria-hidden="true">
        <path
          d="M16 2h8M20 2v5M32 9l3 3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="26" r="16" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
        <circle
          cx="20"
          cy="26"
          r="16"
          stroke="currentColor"
          strokeWidth="2"
          pathLength="60"
          strokeDasharray={`${remainder} 60`}
          transform="rotate(-90 20 26)"
        />
        {Array.from({ length: 12 }, (_, i) => i * 30).map((angle) => (
          <path
            key={angle}
            d="M20 13v2"
            stroke="currentColor"
            strokeWidth="1.5"
            transform={`rotate(${angle} 20 26)`}
          />
        ))}
        <path
          d="M20 26V16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${remainder * 6} 20 26)`}
        />
        <circle cx="20" cy="26" r="2.5" fill="currentColor" />
      </svg>
      <div className="question-stopwatch__body">
        <span className="question-stopwatch__label">Nesta questão</span>
        <span className="question-stopwatch__time">{time}</span>
        <span className="question-stopwatch__status">
          <i aria-hidden="true" />
          {completed ? "Finalizado" : paused ? "Pausado" : "Tempo ativo"}
        </span>
      </div>
    </div>
  );
}
