export interface EditionSelection {
  id: string;
  contest_name: string;
  role_name: string;
  contest_year: number;
  exam_board: string | null;
}

export function contestOptions(editions: EditionSelection[]): string[] {
  return [...new Set(editions.map((edition) => edition.contest_name))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

export function roleOptions(editions: EditionSelection[], contest: string): string[] {
  if (!contest) return [];
  return [
    ...new Set(
      editions
        .filter((edition) => edition.contest_name === contest)
        .map((edition) => edition.role_name),
    ),
  ].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function editionOptions(
  editions: EditionSelection[],
  contest: string,
  role: string,
): EditionSelection[] {
  if (!contest || !role) return [];
  return editions
    .filter((edition) => edition.contest_name === contest && edition.role_name === role)
    .sort((a, b) => b.contest_year - a.contest_year || a.id.localeCompare(b.id));
}
