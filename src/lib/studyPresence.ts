export type PresenceState = "connecting" | "ready" | "unavailable";
export type OnlinePresence = { state: PresenceState; count: number | null };
export const BROWSER_PRESENCE_KEY = "norte-presence-browser:v1";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Random first-party browser identifier only. No account, name, IP or fingerprint is stored. */
export function browserPresenceId(
  storage: Pick<Storage, "getItem" | "setItem">,
  create: () => string,
): string {
  try {
    const saved = storage.getItem(BROWSER_PRESENCE_KEY);
    if (saved && UUID.test(saved)) return saved;
  } catch {
    /* A blocked store gets a temporary ID for this page. */
  }
  const id = create();
  try {
    storage.setItem(BROWSER_PRESENCE_KEY, id);
  } catch {
    /* Memory-only fallback. */
  }
  return id;
}

/** Presence keys are shared between tabs; multiple active metas for one browser count only once. */
export function countOnlineBrowsers(value: unknown): number | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return Object.values(value).filter(
    (entries) =>
      Array.isArray(entries) &&
      entries.some((entry) => entry && typeof entry === "object" && entry.visible === true),
  ).length;
}

export function studyPresenceLabel(count: number) {
  return count === 1 ? "1 visitante online" : `${count.toLocaleString("pt-BR")} visitantes online`;
}
