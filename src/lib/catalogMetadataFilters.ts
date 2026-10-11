import { canonicalBoard, canonicalCareerName, canonicalSubject } from "./subjects";
export const METADATA_FILTER_KEYS = [
  "contest",
  "board",
  "career",
  "year",
  "subject",
  "source",
  "state",
  "category",
] as const;
type Key = (typeof METADATA_FILTER_KEYS)[number];
type Metadata = Record<Key, string>;
export type MetadataFilters = Record<Key, string>;
const valueOf = (row: Metadata, key: Key) =>
  key === "subject"
    ? canonicalSubject(row.subject)
    : key === "board"
      ? canonicalBoard(row.board)
      : key === "career"
        ? canonicalCareerName(row.career)
        : row[key];
export function filterCatalogMetadata<T extends Metadata>(rows: T[], filters: MetadataFilters) {
  return rows.filter((row) =>
    METADATA_FILTER_KEYS.every(
      (key) => filters[key] === "all" || valueOf(row, key) === valueOf(filters, key),
    ),
  );
}
export function catalogMetadataFacets(rows: Metadata[], filters: MetadataFilters) {
  const counts = {} as Record<Key, Map<string, number>>;
  for (const key of METADATA_FILTER_KEYS) {
    const map = new Map<string, number>();
    for (const row of filterCatalogMetadata(rows, { ...filters, [key]: "all" })) {
      const value = valueOf(row, key);
      if (value) map.set(value, (map.get(value) ?? 0) + 1);
    }
    counts[key] = map;
  }
  return counts;
}
