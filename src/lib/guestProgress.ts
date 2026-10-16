/** Local visitor progress only; the server still chooses the day's ten questions. */
export interface GuestAnswerRecord {
  id: string;
  key: string;
  correct: boolean;
}
export interface GuestProgress {
  day: string;
  used: number;
  answers: GuestAnswerRecord[];
  legacyUsed: number;
}
export interface GuestStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
const quotaKey = (day: string) => `norteconcurso:guest-quota:${day}`;
const progressKey = (day: string) => `norteconcurso:guest-progress:v1:${day}`;
const count = (value: unknown) => Math.min(10, Math.max(0, Math.floor(Number(value) || 0)));
export function readGuestProgress(storage: GuestStorage, day: string): GuestProgress {
  let quota = 0;
  const answers: GuestAnswerRecord[] = [];
  try {
    quota = count(storage.getItem(quotaKey(day)));
  } catch {
    /* Storage can be unavailable. */
  }
  try {
    const saved: unknown = JSON.parse(storage.getItem(progressKey(day)) ?? "null");
    if (saved && typeof saved === "object" && "answers" in saved && Array.isArray(saved.answers)) {
      const seen = new Set<string>(),
        keys = new Set<string>();
      for (const row of saved.answers) {
        if (
          !row ||
          typeof row.id !== "string" ||
          typeof row.key !== "string" ||
          typeof row.correct !== "boolean" ||
          seen.has(row.id) ||
          keys.has(row.key)
        )
          continue;
        seen.add(row.id);
        keys.add(row.key);
        answers.push({ id: row.id, key: row.key, correct: row.correct });
        if (answers.length === 10) break;
      }
      if ("used" in saved) quota = Math.max(quota, count(saved.used));
    }
  } catch {
    /* Preserve the legacy quota even if the newer record is damaged. */
  }
  const used = Math.max(quota, answers.length);
  return { day, used, answers, legacyUsed: Math.max(0, used - answers.length) };
}
export function recordGuestAnswer(storage: GuestStorage, day: string, answer: GuestAnswerRecord) {
  const state = readGuestProgress(storage, day);
  if (
    state.used >= 10 ||
    state.answers.some((row) => row.id === answer.id || row.key === answer.key)
  )
    return { ...state, recorded: false };
  const next = {
    ...state,
    used: state.used + 1,
    answers: [...state.answers, answer],
    recorded: true,
  };
  // Persist the quota first: an interrupted write must not grant extra answers.
  storage.setItem(quotaKey(day), String(next.used));
  storage.setItem(progressKey(day), JSON.stringify({ used: next.used, answers: next.answers }));
  return next;
}
