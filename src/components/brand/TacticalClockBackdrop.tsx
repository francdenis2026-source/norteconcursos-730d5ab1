import { useEffect, useId, useState, type CSSProperties } from "react";
import { platformNow } from "@/lib/platformClock";
import { backdropClockAngles, backdropClockTick } from "@/lib/backdropClock";
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
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    motion.addEventListener("change", sync);
    // Adopt the shared server clock's corrections without rendering on every second.
    const interval = window.setInterval(sync, 60_000);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);
  const angles = epoch === null ? null : backdropClockAngles(epoch);
  const tick = epoch === null ? null : backdropClockTick(epoch);
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
          <stop offset="0" stopColor="#8f7c57" />
          <stop offset="0.55" stopColor="#c5b58d" />
          <stop offset="1" stopColor="#a38e66" />
        </linearGradient>
      </defs>
      <image href="/media/hero/home-bg-texture.webp" width="2087" height="753" />
      <rect width="2087" height="753" className="tactical-clock-backdrop__veil" />
      {angles && tick && (
        <g
          key={epoch}
          className="tactical-clock-backdrop__mechanism"
          transform="translate(1043 387)"
          style={{ "--hand-gold": `url(#${goldId})` } as CSSProperties}
        >
          <g className="tactical-clock-backdrop__scale">
            {Array.from({ length: 60 }, (_, minute) =>
              minute % 5 === 0 ? (
                <g key={minute} transform={`rotate(${minute * 6})`}>
                  {minute === 0 ? (
                    <>
                      <rect
                        x="-3.5"
                        y="-184"
                        width="2"
                        height="10"
                        rx="1"
                        className="tactical-clock-backdrop__hour-mark"
                      />
                      <rect
                        x="1.5"
                        y="-184"
                        width="2"
                        height="10"
                        rx="1"
                        className="tactical-clock-backdrop__hour-mark"
                      />
                    </>
                  ) : (
                    <rect
                      x="-1.4"
                      y="-184"
                      width="2.8"
                      height={minute % 15 === 0 ? 10 : 6}
                      rx="1.2"
                      className="tactical-clock-backdrop__hour-mark"
                    />
                  )}
                </g>
              ) : (
                <circle
                  key={minute}
                  cx="0"
                  cy="-181"
                  r="0.65"
                  transform={`rotate(${minute * 6})`}
                  className="tactical-clock-backdrop__minute-mark"
                />
              ),
            )}
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__hour"
            style={{ "--hand-angle": `${angles.hour}deg` } as CSSProperties}
          >
            <rect x="-2.8" y="-114" width="5.6" height="128" rx="1.8" />
            <path className="tactical-clock-backdrop__edge" d="M-1.5-109V-12" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__minute"
            style={{ "--hand-angle": `${angles.minute}deg` } as CSSProperties}
          >
            <rect x="-1.7" y="-160" width="3.4" height="176" rx="1.2" />
          </g>
          <g
            className="tactical-clock-backdrop__hand tactical-clock-backdrop__second"
            style={
              {
                "--hand-angle": `${tick.angle}deg`,
                "--hand-delay": `${tick.delay}s`,
              } as CSSProperties
            }
          >
            <path className="tactical-clock-backdrop__needle" d="M0 20V-173" />
          </g>
          <circle r="6.5" className="tactical-clock-backdrop__hub" />
          <circle r="3.5" className="tactical-clock-backdrop__collar" />
        </g>
      )}
    </svg>
  );
}
