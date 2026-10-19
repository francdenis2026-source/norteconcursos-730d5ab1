export type StudyPresence = { studying_now: number; as_of: string; window_seconds: number };
export type PresenceSnapshot = { presence: StudyPresence; receivedAt: number };

/** The RPC generates as_of on the server. Device wall clocks are not a freshness reference. */
export function parseStudyPresence(value: unknown): StudyPresence | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Partial<StudyPresence>;
  if (
    !Number.isSafeInteger(data.studying_now) ||
    data.studying_now! < 0 ||
    data.window_seconds !== 90 ||
    typeof data.as_of !== "string" ||
    !Number.isFinite(Date.parse(data.as_of))
  )
    return null;
  return data as StudyPresence;
}

/** Age a successful POST RPC response using the monotonic clock, including cached query results. */
export function freshStudyPresence(
  snapshot: PresenceSnapshot | undefined,
  now: number,
): StudyPresence | null {
  if (!snapshot || !Number.isFinite(snapshot.receivedAt) || !Number.isFinite(now)) return null;
  const age = now - snapshot.receivedAt;
  return age >= 0 && age <= 60_000 ? parseStudyPresence(snapshot.presence) : null;
}

export function studyPresenceLabel(count: number) {
  return count === 1
    ? "1 pessoa estudando agora"
    : `${count.toLocaleString("pt-BR")} pessoas estudando agora`;
}
