import { useId } from "react";
import insignia from "@/assets/auth/distintivo.webp";
import "./TacticalClock.css";

type TacticalClockProps = {
  time: string;
  seconds: number;
  label?: string;
  status?: string;
  size?: "compact" | "question" | "focus";
  progress?: number;
  paused?: boolean;
  completed?: boolean;
  urgent?: boolean;
};

/** Presentation only: every hand and arc follows the caller's authoritative timer. */
export function TacticalClock({
  time,
  seconds,
  label,
  status,
  size = "compact",
  progress,
  paused = false,
  completed = false,
  urgent = false,
}: TacticalClockProps) {
  const id = useId().replace(/:/g, "");
  const second = ((Math.floor(Number.isFinite(seconds) ? seconds : 0) % 60) + 60) % 60;
  const arc = Math.max(0, Math.min(1, progress ?? second / 60));
  return (
    <span
      className={`tactical-clock tactical-clock--${size}`}
      data-paused={paused || undefined}
      data-completed={completed || undefined}
      data-urgent={urgent || undefined}
    >
      <span className="tactical-clock__face" aria-hidden="true">
        <span className="tactical-clock__engraving">
          <img src={insignia} alt="" decoding="async" />
        </span>
        <svg className="tactical-clock__dial" viewBox="0 0 240 240" fill="none">
          <defs>
            <path id={`${id}-title`} d="M 48,119 A 72,72 0 0,1 192,119" />
          </defs>
          <circle cx="120" cy="120" r="115" className="tactical-clock__rim" />
          <circle cx="120" cy="120" r="104" className="tactical-clock__track" />
          <circle
            cx="120"
            cy="120"
            r="104"
            className="tactical-clock__arc"
            pathLength="100"
            strokeDasharray={`${arc * 100} 100`}
            transform="rotate(-90 120 120)"
          />
          {Array.from({ length: 60 }, (_, i) => (
            <path
              key={i}
              d={i % 5 === 0 ? "M120 23v12" : "M120 25v5"}
              transform={`rotate(${i * 6} 120 120)`}
              className={i % 5 === 0 ? "tactical-clock__major" : "tactical-clock__minor"}
            />
          ))}
          <text className="tactical-clock__bezel">
            <textPath href={`#${id}-title`} startOffset="50%" textAnchor="middle">
              CARREIRAS POLICIAIS
            </textPath>
          </text>
          <path
            className="tactical-clock__hand"
            d="M116 37l4-9 4 9z"
            transform={`rotate(${second * 6} 120 120)`}
          />
        </svg>
        {size !== "compact" && <span className="tactical-clock__signature">NORTE · PRECISÃO</span>}
      </span>
      <span className="tactical-clock__display">
        {label && <span className="tactical-clock__label">{label}</span>}
        <span className="tactical-clock__time">{time}</span>
        {status && (
          <span className="tactical-clock__status">
            <i />
            {status}
          </span>
        )}
      </span>
    </span>
  );
}
