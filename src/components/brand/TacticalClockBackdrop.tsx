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
            <path d="M-3 16 L-4-73 L0-112 L4-73 L3 16Z" />
            <path className="tactical-clock-backdrop__inlay" d="M0-95V-16" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__minute"
            style={{ "--hand-angle": `${angles.minute}deg` } as CSSProperties}
          >
            <path d="M-2 20 L-3-117 L0-156 L3-117 L2 20Z" />
            <path className="tactical-clock-backdrop__inlay" d="M0-139V-18" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__second"
            style={{ "--hand-angle": `${angles.second}deg` } as CSSProperties}
          >
            <path d="M0 24V-167" />
            <path className="tactical-clock-backdrop__tip" d="M-1.5-158L0-170L1.5-158Z" />
          </g>
          <circle r="8" className="tactical-clock-backdrop__hub" />
          <circle r="3" className="tactical-clock-backdrop__jewel" />
        </g>
      )}
    </svg>
  );
}
