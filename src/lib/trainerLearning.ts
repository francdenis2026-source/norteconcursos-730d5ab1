import { LEGAL_LIBRARY, materialLawSlug, questionMatchesLaw } from "./legalLibrary";
import { canonicalSubject } from "./subjects";
import type { Question } from "./questionFormat";
import type { StudyMaterialSummary } from "./studyMaterials";

export function canOpenTrainerLearning(
  savedForCurrentQuestion: boolean,
  saving: boolean,
  loading: boolean,
) {
  return savedForCurrentQuestion && !saving && !loading;
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const generic = new Set(
  "direito legislacao questoes questao geral gerais especial especiais principios estudo revisao teoria pratica concurso concursos publico publicos sobre para como penal processual codigo introducao basico basica".split(
    " ",
  ),
);
const terms = (value: string) =>
  new Set(
    normalize(value)
      .split(" ")
      .filter((word) => word.length >= 4 && !generic.has(word)),
  );

/** Only suggest an identified diploma or a topic match within the same discipline. */
export function relatedTrainerMaterials(
  question: Pick<Question, "subject" | "subtopic" | "legalBasis">,
  materials: StudyMaterialSummary[],
) {
  const laws: string[] = LEGAL_LIBRARY.filter((entry) =>
    questionMatchesLaw(question, entry.slug),
  ).map((entry) => entry.slug);
  const topic = normalize(question.subtopic ?? "");
  const wanted = terms(question.subtopic ?? "");
  return materials
    .filter((material) => material.content_status === "active")
    .map((material) => {
      const law = materialLawSlug(material);
      const sameLaw = !!law && laws.includes(law);
      if (laws.length && !sameLaw) return { material, score: 0 };
      if (
        !sameLaw &&
        (law || canonicalSubject(material.discipline) !== canonicalSubject(question.subject))
      )
        return { material, score: 0 };
      const title = normalize(`${material.topic_label} ${material.title}`);
      const shared = [...wanted].filter((word) => terms(title).has(word)).length;
      const exact = wanted.size > 0 && topic.length >= 5 && title.includes(topic);
      const topical = exact || (shared >= 2 && shared / wanted.size >= 0.5);
      return { material, score: (sameLaw ? 100 : 0) + (topical ? 20 + shared : 0) };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.material.sort_order - b.material.sort_order ||
        a.material.slug.localeCompare(b.material.slug),
    )
    .slice(0, 3)
    .map((item) => item.material);
}
