/** Accept platform locations only, never an external return destination. */
export function dashboardHref(value: string, origin = "https://norteconcursos.xyz"): string | null {
  try {
    const url = new URL(value, origin);
    if (url.origin !== origin || url.username || url.password) return null;
    if (url.pathname !== "/dashboard" && !url.pathname.startsWith("/dashboard/")) return null;
    return url.pathname + url.search + url.hash;
  } catch {
    return null;
  }
}

export function trainerRouteKey(search: Record<string, unknown>): string {
  return JSON.stringify(
    Object.entries(search)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

export const trainerFilterKeys = [
  "contest",
  "board",
  "career",
  "year",
  "appliedExam",
  "subject",
  "source",
  "reviewed",
  "state",
  "category",
  "area",
  "topic",
  "difficulty",
  "limit",
  "orderMode",
] as const;
export type TrainerBookmark = {
  version: 1;
  practiceMode?: "new" | "wrong" | "all" | "catalog";
  sessionAttempts?: { index: number; selected: "A" | "B" | "C" | "D" | "E"; isCorrect: boolean }[];
  savedAt: number;
  route: string;
  questions: { id: string; source: string; table?: string | undefined }[];
  index: number;
  selected: string | null;
  struck: string[];
  results: ("ok" | "err")[];
  startedAt: number;
  filters: Record<(typeof trainerFilterKeys)[number], string>;
};

/** Resolve IDs against today's eligible catalog; removed/unpublished items cannot return. */
export function restoreTrainerBookmark<
  T extends { id: string; source: string; table?: string | undefined },
>(
  value: unknown,
  route: string,
  catalog: T[],
  now = Date.now(),
): { bookmark: TrainerBookmark; questions: T[] } | null {
  if (!value || typeof value !== "object") return null;
  const b = value as TrainerBookmark;
  if (
    b.version !== 1 ||
    b.route !== route ||
    !Number.isFinite(b.savedAt) ||
    b.savedAt > now ||
    now - b.savedAt > 4 * 60 * 60 * 1000
  )
    return null;
  if (
    !Array.isArray(b.questions) ||
    !b.questions.length ||
    b.questions.length > catalog.length ||
    !Number.isInteger(b.index) ||
    b.index < 0 ||
    b.index > b.questions.length ||
    !Array.isArray(b.results) ||
    b.results.length > b.questions.length ||
    b.results.some((r) => r !== null && r !== "ok" && r !== "err") ||
    !Array.isArray(b.struck) ||
    b.struck.some((r) => !["A", "B", "C", "D", "E"].includes(r)) ||
    (b.selected !== null && !["A", "B", "C", "D", "E"].includes(b.selected)) ||
    !Number.isFinite(b.startedAt) ||
    !b.filters ||
    typeof b.filters !== "object" ||
    trainerFilterKeys.some((k) => typeof b.filters[k] !== "string")
  )
    return null;
  if (b.practiceMode !== undefined && !["new", "wrong", "all", "catalog"].includes(b.practiceMode))
    return null;
  if (
    b.sessionAttempts !== undefined &&
    (!Array.isArray(b.sessionAttempts) ||
      b.sessionAttempts.length > b.questions.length ||
      new Set(b.sessionAttempts.map((a) => a?.index)).size !== b.sessionAttempts.length ||
      b.sessionAttempts.some(
        (a) =>
          !a ||
          !Number.isInteger(a.index) ||
          a.index < 0 ||
          a.index >= b.questions.length ||
          !["A", "B", "C", "D", "E"].includes(a.selected) ||
          typeof a.isCorrect !== "boolean" ||
          b.results[a.index] !== (a.isCorrect ? "ok" : "err"),
      ))
  )
    return null;
  const key = (q: { id: string; source: string; table?: string | undefined }) =>
    `${q.table ?? q.source}:${q.id}`;
  const byId = new Map(catalog.map((q) => [key(q), q]));
  if (b.questions.some((q) => !q || typeof q.id !== "string" || !byId.has(key(q)))) return null;
  if (new Set(b.questions.map(key)).size !== b.questions.length) return null;
  const results: ("ok" | "err")[] = [];
  b.results.forEach((r, i) => {
    if (r === "ok" || r === "err") results[i] = r;
  });
  return { bookmark: { ...b, results }, questions: b.questions.map((q) => byId.get(key(q))!) };
}
