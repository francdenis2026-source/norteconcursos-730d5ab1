import type { StudyMaterialSummary } from "./studyMaterials";
import { libraryArea, libraryDiscipline, libraryTopic, type LibraryArea } from "./libraryOrganization";
import { materialLawSlug } from "./legalLibrary";
import { matchesTopicFilter } from "./filterTaxonomy";
import { identifyingLibraryLaws, matchesLibrarySearch } from "./librarySearch";
import type { ContentHit } from "./contentSearch";
import { looseMatch } from "./tolerantWords";

export type LibrarySearchScope = { area: LibraryArea; discipline: string; contest: string; topic: string; law: string };
export function scopeLibraryMaterials(items: StudyMaterialSummary[], scope: LibrarySearchScope) {
  return items.filter(item =>
    (scope.area === "all" || libraryArea(item) === scope.area) &&
    (scope.discipline === "all" || libraryDiscipline(item) === scope.discipline) &&
    (scope.contest === "all" || item.contest_name === scope.contest) &&
    matchesTopicFilter(libraryDiscipline(item), libraryTopic(item), scope.topic) &&
    (scope.law === "all" || materialLawSlug(item) === scope.law));
}
export function matchingLibraryMaterials(scoped: StudyMaterialSummary[], query: string, index: Map<string,string>, hits: ContentHit[]) {
  const identities = identifyingLibraryLaws(query);
  const contentLaws = new Set(hits.map(hit => hit.slug));
  const strict = scoped.filter(item => identities.length
    ? identities.includes(materialLawSlug(item) ?? "")
    : matchesLibrarySearch(index.get(item.id) ?? "", query) || contentLaws.has(materialLawSlug(item) ?? ""));
  // Nada casou exatamente: tenta plural/singular, um erro de digitação e frases naturais.
  if (strict.length || identities.length || query.trim().length < 4) return strict;
  const tolerant = scoped.filter(item => looseMatch(index.get(item.id) ?? "", query));
  return tolerant.length ? tolerant : scoped.filter(item => looseMatch(index.get(item.id) ?? "", query, true));
}
