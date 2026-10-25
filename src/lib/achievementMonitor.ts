import type { Achievement } from "@/types";

/** Announce only server-issued awards confirmed in the user's saved collection. */
export function createAchievementMonitor({
  award,
  load,
  onSnapshot,
  onEarned,
}: {
  award: () => Promise<Achievement[]>;
  load: () => Promise<Achievement[]>;
  onSnapshot: (list: Achievement[]) => void;
  onEarned: (achievement: Achievement) => void;
}) {
  const announced = new Set<string>();
  const pending = new Map<string, Achievement>();
  let stopped = false;
  let inFlight: Promise<void> | undefined;
  return {
    refresh(): Promise<void> {
      if (stopped) return Promise.resolve();
      if (inFlight) return inFlight;
      inFlight = (async () => {
        const issued = await award();
        if (stopped) return;
        for (const achievement of issued)
          if (achievement.id && !announced.has(achievement.id))
            pending.set(achievement.id, achievement);
        const saved = await load();
        if (stopped) return;
        onSnapshot(saved);
        const confirmed = new Set(saved.map(({ id }) => id));
        for (const [id, achievement] of pending) {
          if (!confirmed.has(id)) continue;
          pending.delete(id);
          announced.add(id);
          onEarned(achievement);
        }
      })().finally(() => {
        inFlight = undefined;
      });
      return inFlight;
    },
    stop() {
      stopped = true;
      pending.clear();
    },
  };
}
