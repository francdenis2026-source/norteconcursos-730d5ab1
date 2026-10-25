export type ContranExample = {
  scenario: string;
  question: string;
  answer: string;
  variation: string;
  variationAnswer: string;
};

export type ContranGuide = {
  number: number;
  year: number;
  title: string;
  subject: string;
  issueDate: string;
  publicationDate: string;
  publicationIndexDate?: string;
  lastRelatedActDate: string;
  checkedAt: string;
  officialSituation: string;
  sourceUrl: string;
  relatedSources: { label: string; url: string }[];
  sourceSha256: string;
  historical: boolean;
  reviewedScope?: string;
  points: string[];
  warning: string;
  example: ContranExample;
  textPath?: string;
};

export function normalizeContranText(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/** An amended act is not necessarily repealed; historical guides are never current recommendations. */
export function currentContranGuides(guides: readonly ContranGuide[], query = "") {
  const search = normalizeContranText(query).trim().replace(/\b(?:contran|resolucao|resolucoes)\b/g, "").trim();
  return guides.filter((g) => {
    const situation = normalizeContranText(g.officialSituation);
    const whollyRevoked = /\brevogada\b/.test(situation) && !/parcialmente revogada|revogada (?:em parte|parcialmente)/.test(situation);
    return !g.historical && !whollyRevoked && (!search || normalizeContranText(
    `${g.number}/${g.year} ${g.number.toLocaleString("pt-BR")}/${g.year} ${g.title} ${g.subject} ${g.officialSituation} ${g.points.join(" ")}`,
    ).includes(search));
  }).sort((a, b) => b.lastRelatedActDate.localeCompare(a.lastRelatedActDate)
    || b.publicationDate.localeCompare(a.publicationDate) || b.number - a.number);
}

export function contranDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
