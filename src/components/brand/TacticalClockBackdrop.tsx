import { useEffect, useState, type CSSProperties } from "react";
import { platformNow } from "@/lib/platformClock";
import { backdropClockAngles } from "@/lib/backdropClock";
import "./TacticalClockBackdrop.css";

/** One SVG viewport keeps the original artwork and its hands aligned through every crop. */
export function TacticalClockBackdrop() {
  const [epoch, setEpoch] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const sync = () => {
      setPaused(document.hidden);
      if (!document.hidden) setEpoch(platformNow());
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    // Adopt the shared server clock's corrections without rendering on every second.
    const interval = window.setInterval(sync, 60_000);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  const angles = epoch === null ? null : backdropClockAngles(epoch);
  return (
    <svg
      className="tactical-clock-backdrop"
      viewBox="0 0 2087 753"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      data-paused={paused || undefined}
    >
      <image href="/media/hero/home-bg-texture.webp" width="2087" height="753" />
      <rect width="2087" height="753" className="tactical-clock-backdrop__veil" />
      {angles && (
        <g
          key={epoch}
          className="tactical-clock-backdrop__mechanism"
          transform="translate(1043 387)"
        >
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__hour"
            style={{ "--hand-angle": `${angles.hour}deg` } as CSSProperties}
          >
            <path d="M-9 28 L-11-76 L0-137 L11-76 L9 28Z" />
            <path className="tactical-clock-backdrop__inlay" d="M0-116V-15" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__minute"
            style={{ "--hand-angle": `${angles.minute}deg` } as CSSProperties}
          >
            <path d="M-6 35 L-7-126 L0-187 L7-126 L6 35Z" />
            <path className="tactical-clock-backdrop__inlay" d="M0-163V-20" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__second"
            style={{ "--hand-angle": `${angles.second}deg` } as CSSProperties}
          >
            <path d="M0 48V-201" />
            <path className="tactical-clock-backdrop__tip" d="M-4-188L0-205L4-188Z" />
            <circle cy="34" r="8" />
          </g>
          <circle r="14" className="tactical-clock-backdrop__hub" />
          <circle r="6" className="tactical-clock-backdrop__jewel" />
        </g>
      )}
    </svg>
  );
}
