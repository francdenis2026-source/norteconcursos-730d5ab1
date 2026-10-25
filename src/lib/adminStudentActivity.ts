export type StudentActivity = {
  total_seconds: number;
  today_seconds: number;
  sessions: number;
  recent: { last_seen_at: string }[];
};
export type StudentSort = "activity" | "access" | "name";
export type ActivityPeriod = "today" | "total";
export function lastStudentAccess(login: string | null, activity: StudentActivity | null) {
  const dates = [login, ...(activity?.recent ?? []).map((s) => s.last_seen_at)].filter(
    (d): d is string => !!d && Number.isFinite(Date.parse(d)),
  );
  return dates.sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? null;
}
export function activeSeconds(activity: StudentActivity | null, period: ActivityPeriod) {
  return activity
    ? Math.max(0, Number(period === "today" ? activity.today_seconds : activity.total_seconds) || 0)
    : null;
}
export function activityDuration(seconds: number | null) {
  if (seconds === null) return "Indisponível";
  if (seconds < 60) return `${Math.floor(seconds)} s`;
  const minutes = Math.floor(seconds / 60);
  return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}
export function sortStudents<
  T extends {
    id: string;
    full_name: string | null;
    email: string | null;
    lastAccess: string | null;
    activity: StudentActivity | null;
  },
>(rows: T[], sort: StudentSort, period: ActivityPeriod): T[] {
  const name = (r: T) => r.full_name?.trim() || r.email || "";
  const byName = (a: T, b: T) =>
    name(a).localeCompare(name(b), "pt-BR", { sensitivity: "base" }) || a.id.localeCompare(b.id);
  const byAccess = (a: T, b: T) =>
    (Date.parse(b.lastAccess ?? "") || 0) - (Date.parse(a.lastAccess ?? "") || 0);
  return [...rows].sort((a, b) =>
    sort === "name"
      ? byName(a, b)
      : sort === "access"
        ? byAccess(a, b) || byName(a, b)
        : (activeSeconds(b.activity, period) ?? -1) - (activeSeconds(a.activity, period) ?? -1) ||
          byAccess(a, b) ||
          byName(a, b),
  );
}
