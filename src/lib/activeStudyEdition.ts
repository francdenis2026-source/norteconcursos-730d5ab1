export type ActiveStudyEdition = {
  id: string;
  contestName: string;
  roleName: string;
  year: number | string;
  examBoard?: string | null;
};

export const ACTIVE_STUDY_EDITION_EVENT = "norte:active-study-edition-change";

const storageKey = (userId: string) => "norte-active-study-edition:" + userId;

export function readActiveStudyEdition(userId?: string | null): ActiveStudyEdition | null {
  if (!userId || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<ActiveStudyEdition>;
    if (
      typeof value.id !== "string" ||
      typeof value.contestName !== "string" ||
      typeof value.roleName !== "string"
    ) return null;
    return {
      id: value.id,
      contestName: value.contestName,
      roleName: value.roleName,
      year: value.year ?? "",
      examBoard: value.examBoard ?? null,
    };
  } catch {
    return null;
  }
}

export function saveActiveStudyEdition(userId: string, edition: ActiveStudyEdition) {
  if (!userId || typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(edition));
    window.dispatchEvent(new Event(ACTIVE_STUDY_EDITION_EVENT));
    return true;
  } catch {
    return false;
  }
}
