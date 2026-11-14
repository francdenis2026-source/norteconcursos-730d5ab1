export const rankingKinds = ["general", "questions", "simulators"] as const;
export type RankingKind = (typeof rankingKinds)[number];
export const rankingPeriods = ["all", "month"] as const;
export type RankingPeriod = (typeof rankingPeriods)[number];
export interface RankingEntry {
  rank_position: number;
  user_id: string;
  display_name: string;
  points: number;
  question_points: number;
  simulator_points: number;
  study_points: number;
  extra_points: number;
  study_hours: number;
  questions: number;
  accuracy: number;
  simulators: number;
  is_me: boolean;
  stars: number;
  level_name: string;
}
export type MyRankingEntry = Omit<RankingEntry, "rank_position"> & { rank_position: number | null };
export interface RankingPageData {
  entries: RankingEntry[];
  my_entry: MyRankingEntry | null;
  total: number;
  participants: number;
  page: number;
  page_size: number;
  page_count: number;
  partial?: boolean;
}

/** Reject incompatible RPC payloads instead of rendering a broken or misleading ranking. */
export function readRankingPage(value: unknown): RankingPageData {
  if (!value || typeof value !== "object") throw new Error("Invalid ranking page");
  const page = value as RankingPageData;
  const integer = (n: unknown, min = 0) =>
    typeof n === "number" && Number.isSafeInteger(n) && n >= min;
  const entry = (row: MyRankingEntry, own = false) =>
    row &&
    typeof row.user_id === "string" &&
    typeof row.display_name === "string" &&
    typeof row.level_name === "string" &&
    integer(row.points) &&
    integer(row.questions) &&
    integer(row.accuracy) &&
    row.accuracy <= 100 &&
    integer(row.simulators) &&
    integer(row.stars, 1) &&
    row.stars <= 5 &&
    typeof row.study_hours === "number" &&
    Number.isFinite(row.study_hours) &&
    typeof row.is_me === "boolean" &&
    (integer(row.rank_position, 1) || (own && row.rank_position === null));
  if (
    !Array.isArray(page.entries) ||
    !page.entries.every((row) => entry(row)) ||
    !integer(page.total) ||
    !integer(page.participants) ||
    page.total > page.participants ||
    !integer(page.page, 1) ||
    !integer(page.page_count, 1) ||
    page.page > page.page_count ||
    !integer(page.page_size, 1) ||
    page.page_size > 100 ||
    page.entries.length > page.page_size ||
    // A corrupted or stale result must never display repeated students, swapped
    // placements or positions inconsistent with the canonical server order.
    page.entries.some((row, index) => {
      const previousPosition = page.entries[index - 1]?.rank_position;
      return (
        (previousPosition !== undefined && row.rank_position < previousPosition) ||
        page.entries.some((other, otherIndex) => otherIndex < index && other.user_id === row.user_id)
      );
    }) ||

    (page.my_entry !== null && (!entry(page.my_entry, true) || !page.my_entry.is_me))
  )
    throw new Error("Invalid ranking page");
  return page;
}
export function rankingSearch(search: Record<string, unknown>) {
  const page = Number(search["page"]);
  const size = Number(search["size"]);
  return {
    section: rankingKinds.includes(search["section"] as RankingKind)
      ? (search["section"] as RankingKind)
      : ("general" as RankingKind),
    period: rankingPeriods.includes(search["period"] as RankingPeriod)
      ? (search["period"] as RankingPeriod)
      : ("all" as RankingPeriod),
    page: Number.isSafeInteger(page) && page > 0 ? Math.min(page, 1_000_000) : 1,
    size: [20, 50, 100].includes(size) ? size : 20,
    q: typeof search["q"] === "string" ? search["q"].trim().slice(0, 100) : "",
  };
}

export function rankingPositionPage(position: number, size: number) {
  return Math.floor((position - 1) / size) + 1;
}

/** Compatibility is explicitly marked partial; it cannot certify the complete participant list. */
export function partialRankingPage(
  entries: RankingEntry[],
  page: number,
  size: number,
  query: string,
): RankingPageData {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR");
  const filtered = entries.filter((entry) =>
    normalize(entry.display_name).includes(normalize(query)),
  );
  const count = Math.max(1, Math.ceil(filtered.length / size));
  const current = Math.min(page, count);
  return {
    entries: filtered.slice((current - 1) * size, current * size),
    my_entry: entries.find((entry) => entry.is_me) ?? null,
    total: filtered.length,
    participants: entries.length,
    page: current,
    page_size: size,
    page_count: count,
    partial: true,
  };
}

/** Níveis do ranking (mesmos cortes de public.level_of no banco). */
export const RANKING_LEVELS = [
  { name: "Aspirante", min: 0, stars: 1 },
  { name: "Competidor", min: 250, stars: 2 },
  { name: "Avançado", min: 750, stars: 3 },
  { name: "Especialista", min: 1500, stars: 4 },
  { name: "Elite", min: 3000, stars: 5 },
] as const;

/** Quem ainda não pontuou não ocupa posição nem recebe estrelas na tela. */
export const hasScore = (row: { points: number }) => row.points > 0;

/** Nível atual e quanto falta para o próximo, a partir dos pontos gerais. */
export function levelProgress(points: number) {
  const safe = Math.max(0, Math.floor(Number.isFinite(points) ? points : 0));
  let index = 0;
  for (let i = 0; i < RANKING_LEVELS.length; i++) if (safe >= RANKING_LEVELS[i]!.min) index = i;
  const level = RANKING_LEVELS[index]!;
  const next = RANKING_LEVELS[index + 1] ?? null;
  const span = next ? next.min - level.min : 0;
  return {
    name: level.name,
    stars: level.stars,
    next: next ? { name: next.name, min: next.min } : null,
    missing: next ? next.min - safe : 0,
    percent: next ? Math.min(100, Math.round((100 * (safe - level.min)) / span)) : 100,
  };
}
