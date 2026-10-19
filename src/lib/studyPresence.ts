export type StudyPresence = { studying_now: number; as_of: string; window_seconds: number };

/** Reject missing/malformed/stale data rather than displaying a fabricated count. */
export function validStudyPresence(value: unknown, now = Date.now()): StudyPresence | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Partial<StudyPresence>;
  if (
    !Number.isSafeInteger(data.studying_now) ||
    data.studying_now! < 0 ||
    data.window_seconds !== 90 ||
    typeof data.as_of !== "string"
  )
    return null;
  const timestamp = Date.parse(data.as_of);
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > 60_000) return null;
  return data as StudyPresence;
}

export function studyPresenceLabel(count: number) {
  return count === 1
    ? "1 pessoa estudando agora"
    : `${count.toLocaleString("pt-BR")} pessoas estudando agora`;
}
