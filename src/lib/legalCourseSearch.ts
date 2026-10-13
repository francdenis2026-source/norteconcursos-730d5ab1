import type { LegalUnit } from "./legalCourses";
import { libraryMatchParts, matchesLibrarySearch, normalizeLibrarySearch } from "./librarySearch";

export function legalArticleSearchKey(query: string): string | undefined {
  const article = query.trim().match(/^(?:art(?:igo)?\.?\s*)?(\d+)[º°]?(?:\s*-?\s*([a-z]))?$/i);
  return article ? `art-${Number(article[1])}${article[2] ? `-${article[2].toLowerCase()}` : ""}` : undefined;
}
/** Search only the units supplied by the currently open course. */
export function matchesLegalUnit(unit: Pick<LegalUnit, "label" | "unit_key" | "chapter" | "body_text">, query: string): boolean {
  const article = legalArticleSearchKey(query);
  if (article) return unit.unit_key.toLowerCase() === article;
  return matchesLibrarySearch(normalizeLibrarySearch(`${unit.label} ${unit.chapter} ${unit.body_text}`), query);
}

/** Keep a selected result only while it belongs to the filtered list. */
export function selectVisibleLegalUnit<T extends { id: string }>(visible: T[], preferred?: T): T | undefined {
  return visible.find(unit => unit.id === preferred?.id) ?? visible[0];
}

export function legalSearchExcerpt(text: string, query: string, length = 220): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const parts = libraryMatchParts(clean, query);
  const first = parts.findIndex(part => part.match);
  if (first < 0) return "";
  const offset = parts.slice(0, first).reduce((total, part) => total + part.text.length, 0);
  let start = Math.max(0, offset - Math.floor(length / 3));
  // Do not start in the middle of a word.
  if (start) { const space = clean.lastIndexOf(" ", start); if (space >= 0) start = space + 1; }
  const end = Math.min(clean.length, Math.max(start + length, offset + parts[first]!.text.length));
  return `${start ? "… " : ""}${clean.slice(start, end)}${end < clean.length ? " …" : ""}`;
}
