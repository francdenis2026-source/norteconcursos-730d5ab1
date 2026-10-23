import { useEffect, useId, useState, type CSSProperties } from "react";
import { platformNow } from "@/lib/platformClock";
import { backdropClockAngles } from "@/lib/backdropClock";
import "./TacticalClockBackdrop.css";

/** One SVG viewport keeps the original artwork and its hands aligned through every crop. */
export function TacticalClockBackdrop() {
  const goldId = `backdrop-gold-${useId().replace(/:/g, "")}`;
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
      <defs>
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#80602e" />
          <stop offset="0.38" stopColor="#cfaa5c" />
          <stop offset="0.5" stopColor="#f1d48a" />
          <stop offset="0.63" stopColor="#c39a4e" />
          <stop offset="1" stopColor="#967036" />
        </linearGradient>
      </defs>
      <image href="/media/hero/home-bg-texture.webp" width="2087" height="753" />
      <rect width="2087" height="753" className="tactical-clock-backdrop__veil" />
      {angles && (
        <g
          key={epoch}
          className="tactical-clock-backdrop__mechanism"
          transform="translate(1043 387)"
          style={{ "--hand-gold": `url(#${goldId})` } as CSSProperties}
        >
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__hour"
            style={{ "--hand-angle": `${angles.hour}deg` } as CSSProperties}
          >
            <path
              fillRule="evenodd"
              d="M0-130L7-96L5-16L4 17H-4L-5-16L-7-96Z M0-106L3.5-91L2-23H-2L-3.5-91Z"
            />
            <path className="tactical-clock-backdrop__facet" d="M0-126V-110" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__minute"
            style={{ "--hand-angle": `${angles.minute}deg` } as CSSProperties}
          >
            <path
              fillRule="evenodd"
              d="M0-168L4.5-147L3-17L2.5 19H-2.5L-3-17L-4.5-147Z M0-147L1.7-139L1.2-26H-1.2L-1.7-139Z"
            />
            <path className="tactical-clock-backdrop__facet" d="M0-164V-151" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__second"
            style={{ "--hand-angle": `${angles.second}deg` } as CSSProperties}
          >
            <path className="tactical-clock-backdrop__needle" d="M0 33V-176" />
            <path d="M0-182L2.2-173L0-166L-2.2-173Z M0 19L3.5 26L0 33L-3.5 26Z" />
          </g>
          <circle r="9" className="tactical-clock-backdrop__hub" />
          <circle r="5.5" className="tactical-clock-backdrop__collar" />
          <circle r="2" className="tactical-clock-backdrop__jewel" />
        </g>
      )}
    </svg>
  );
}
