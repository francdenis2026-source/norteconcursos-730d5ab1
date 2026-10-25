import { matchesPracticeReview } from "./materialPracticeReview";
import type { Question } from "./questionFormat";
import { parseQuestion, questionAnswers } from "./questionFormat";
import { canonicalSubject, canonicalTopic } from "./subjects";
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
      /(?:^|[\s,;#])(?:arts?\.?\s*|artigos?\s*|art-?)?(\d+)(?:[º°o])?(?:\s*-\s*([a-z]))?(?=$|[\s,;:.§/])/gi,
    ),
  ].map((m) => m[1] + (m[2] ? "-" + m[2].toLowerCase() : ""));
}
/** Treaty articles and the promulgating decree have independent numbering. */
function sameArticle(citation: string, requested: string): boolean {
  const namespace = (s: string) => /conven[cç][aã]o|tratado/i.test(s) ? "treaty" : "statute";
  const wanted = articles(requested);
  return wanted.length === 1 && namespace(citation) === namespace(requested) && articles(citation).includes(wanted[0]!);
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
            sameArticle(b.artigo ?? "", scope.article!) ||
            (!b.artigo && sameArticle((b.url ?? "").split("#")[1] ?? "", scope.article!)),
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

/** Local, unscored exercises of the opened material; never inserted into the public catalog. */
export function authoredMaterialPractice(
  quiz: { q: string; a: boolean; why: string }[],
  scope: MaterialPracticeScope,
  key: string,
  label: string,
  review?: unknown,
): Question[] {
  const normative = !!(scope.law || scope.article || /direito|legisla|contabilidade|reda[çc][ãa]o oficial/i.test(`${scope.subject ?? ""} ${label}`));
  const approved = matchesPracticeReview(quiz, review, key) ? review : null;
  if (normative && !approved) return [];
  if (approved) {
    if (scope.subject && canonicalSubject(approved.subject) !== canonicalSubject(scope.subject)) return [];
    if (scope.law && approved.law !== scope.law) return [];
    if (scope.topic && normalize(materialTopic(approved.subject, canonicalTopic(approved.topic_label) ?? approved.topic_label)) !== normalize(scope.topic)) return [];
  }
  const seen = new Set<string>();
  return quiz.flatMap((item, index) => {
    const evidence = approved?.items[index];
    if (scope.article && (!evidence?.article || !sameArticle(evidence.article, scope.article))) return [];
    const normalized = normalize(item.q);
    if (!item.q.trim() || !item.why.trim() || typeof item.a !== "boolean" || seen.has(normalized))
      return [];
    seen.add(normalized);
    return [
      {
        id: `material:${key}:${index}`,
        source: "curated" as const,
        contest: scope.contest ?? "Fixação por assunto",
        year: "",
        career: "",
        board: "Norte Concursos · exercício autoral",
        subject: scope.subject ?? "",
        subtopic: scope.topic ?? null,
        text: item.q,
        answer: item.a ? ("C" as const) : ("E" as const),
        explanation: item.why,
        legalBasis: evidence ? [{ url: evidence.source_url, ...(evidence.article ? { artigo: evidence.article } : {}) }] : [],
        checkedAt: approved?.checked_at ?? null,
        difficulty: "média" as const,
        state: "",
        category: "",
        kind: "true_false" as const,
      },
    ];
  });
}
export function mergeMaterialPractice(catalog: Question[], authored: Question[]): Question[] {
  const seen = new Set<string>();
  return [...catalog, ...authored].filter((q) => {
    const parsed = parseQuestion(q.text);
    const key =
      normalize(parsed.base) +
      "\n" +
      normalize(parsed.stem.replace(/^julgue\s+(?:o\s+)?item\s*:?\s*/i, "")) +
      "\n" +
      parsed.options.map((o) => normalize(o.text)).join("\n") +
      "\n" +
      JSON.stringify([...(q.figures ?? []), ...(parsed.illustrations ?? []).map((i) => i.url)]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
