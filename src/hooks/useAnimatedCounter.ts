import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Tweens the displayed integer toward `value` instead of jumping, for a "live counter" feel. Skips the tween under prefers-reduced-motion. */
export function useAnimatedCounter(value: number | undefined, durationMs = 900) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value === undefined) return;
    const from = prevValue.current ?? value;
    prevValue.current = value;
    if (from === value || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return display;
}
