import type { Question } from "./questionFormat";
import { parseQuestion, questionAnswers } from "./questionFormat";
import { canonicalSubject } from "./subjects";
import { classifyTopic } from "./questionTopics";
import { legalLibraryEntry, officialLawIdentity } from "./legalLibrary";
import { questionIdentity } from "./questionIdentity";
import { needsMissingSupportText } from "./questionText";
import { dedupeSharedExamItems } from "./questionDuplicates";

export type MaterialPracticeScope = {
  subject?: string | undefined;
  topic?: string | undefined;
  law?: string | undefined;
  article?: string | undefined;
  contest?: string | undefined;
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
/** No keyword fallback to the entire discipline when the requested topic is unknown. */
export function materialTopic(subject: string, label: string) {
  return classifyTopic(subject, label) ?? label.trim();
}
function articles(value: string): string[] {
  return [
    ...value.matchAll(
      /(?:^|[\s,;#])(?:arts?\.?\s*|art-?)?(\d+)(?:[º°o])?(?:\s*-\s*([a-z]))?(?=$|[\s,;:.§/])/gi,
    ),
  ].map((m) => m[1] + (m[2] ? "-" + m[2].toLowerCase() : ""));
}
export function matchesMaterialScope(q: Question, scope: MaterialPracticeScope): boolean {
  if (scope.subject && canonicalSubject(q.subject) !== canonicalSubject(scope.subject))
    return false;
  if (scope.contest && normalize(q.contest) !== normalize(scope.contest)) return false;
  if (scope.law) {
    const entry = legalLibraryEntry(scope.law);
    const lawId = entry && officialLawIdentity(entry.source_url);
    if (!lawId) return false;
    const bases = q.legalBasis.filter((b) => officialLawIdentity(b.url) === lawId);
    if (!bases.length) return false;
    if (scope.article) {
      const requested = articles(scope.article);
      if (
        requested.length !== 1 ||
        !bases.some(
          (b) =>
            articles(b.artigo ?? "").includes(requested[0]!) ||
            articles((b.url ?? "").split("#")[1] ?? "").includes(requested[0]!),
        )
      )
        return false;
    }
  } else if (scope.article) return false;
  if (scope.topic) {
    const requested = normalize(scope.topic);
    const explicit = [q.testedTopic, q.subtopic].filter((v): v is string => !!v);
    const labels = explicit.length
      ? explicit
      : [classifyTopic(q.subject, q.text)].filter((v): v is string => !!v);
    if (!labels.some((label) => normalize(label) === requested)) return false;
  }
  return true;
}
export function materialPracticePool(
  catalog: Question[],
  scope: MaterialPracticeScope,
): Question[] {
  const seen = new Set<string>();
  return dedupeSharedExamItems(
    catalog.filter((q) => {
      const key = questionIdentity(q);
      if (
        seen.has(key) ||
        q.source === "personal" ||
        needsMissingSupportText(q) ||
        !matchesMaterialScope(q, scope)
      )
        return false;
      const parsed = parseQuestion(q.text);
      if (
        parsed.options.length
          ? !parsed.options.some((o) => o.letter === q.answer)
          : questionAnswers(q).join("") !== "CE" || !["C", "E"].includes(q.answer)
      )
        return false;
      seen.add(key);
      return true;
    }),
  );
}
/** Same immutable scope is consumed by the inline session and the full trainer. */
export function materialPracticeSearch(scope: MaterialPracticeScope) {
  return {
    ...(scope.law ? { law: scope.law } : {}),
    ...(scope.subject ? { studySubject: scope.subject } : {}),
    ...(scope.topic ? { materialTopic: scope.topic } : {}),
    ...(scope.article ? { studyArticle: scope.article } : {}),
    ...(scope.contest ? { contest: scope.contest } : {}),
    limit: "20",
  };
}
