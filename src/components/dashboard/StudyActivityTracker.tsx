import { useEffect } from "react";
import { flushStudyClock, startStudyClock, stopStudyClock } from "@/lib/studyClock";

/** Active study time is recorded independently of any visible clock. */
export function StudyActivityTracker({ userId }: { userId: string }) {
  useEffect(() => {
    startStudyClock(userId);
    return () => {
      void flushStudyClock();
      stopStudyClock();
    };
  }, [userId]);
  return null;
}
