import { useEffect, useState } from "react";
import { idleSeconds, IDLE_PAUSE_SECONDS, startActivityTracking } from "@/lib/activity";

/** Mounted per question: monotonic elapsed time, excluding hidden and idle intervals. */
export function useGuestQuestionTimer(completed: boolean) {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => startActivityTracking(), []);
  useEffect(() => {
    if (completed) return;
    let elapsed = 0;
    let last = performance.now();
    const visibility = () => {
      last = performance.now();
      setPaused(document.visibilityState !== "visible");
    };
    const timer = window.setInterval(() => {
      const now = performance.now();
      const inactive =
        document.visibilityState !== "visible" || idleSeconds() >= IDLE_PAUSE_SECONDS;
      if (!inactive) elapsed += Math.max(0, now - last);
      last = now;
      setSeconds(Math.floor(elapsed / 1000));
      setPaused(inactive);
    }, 250);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [completed]);
  return { seconds, paused };
}
