import type { Contest } from "@/types";

const ACTIVE_EDITAL_STATUSES: Contest["status"][] = ["Edital Publicado", "Inscrições Abertas"];

export function hasActiveEdital(contest: Pick<Contest, "status"> | null | undefined): boolean {
  return !!contest && ACTIVE_EDITAL_STATUSES.includes(contest.status);
}

export function activeEditalLabel(contest: Pick<Contest, "agency" | "role">): string {
  return `${contest.agency} · ${contest.role}`;
}
