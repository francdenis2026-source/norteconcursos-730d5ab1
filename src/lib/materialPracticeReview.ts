import type { QuizItem } from './studyMaterials';

export type MaterialPracticeReview = {
  version: 1;
  status: 'reviewed';
  material_slug: string;
  subject: string;
  topic_label: string;
  law?: string;
  syllabus_topic_id: string;
  checked_at: string;
  scope: string;
  sources: { url: string; sha256: string; checked_at: string }[];
  items: (QuizItem & { source_url: string; article?: string; origin: string; source_unit_id?: string })[];
};
export function isPracticeOfficialSource(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && !u.username && !u.password && !u.port &&
      (['www.planalto.gov.br','planalto.gov.br','cfc.org.br','www.cfc.org.br','www1.cfc.org.br','www12.senado.leg.br','cpc.org.br','www.cpc.org.br','conteudo.cvm.gov.br'].includes(u.hostname) || /^(?:[a-z0-9-]+\.)*(?:stf|stj)\.jus\.br$/.test(u.hostname));
  } catch { return false; }
}
/** An existing approval cannot silently survive any change to the quiz it reviewed. */
export function matchesPracticeReview(quiz: QuizItem[], value: unknown, materialSlug: string): value is MaterialPracticeReview {
  if (!value || typeof value !== 'object') return false;
  const r = value as MaterialPracticeReview;
  if (r.version !== 1 || r.status !== 'reviewed' || r.material_slug !== materialSlug || !r.subject || !r.topic_label || !r.scope || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(r.syllabus_topic_id ?? '')) return false;
  const checked = Date.parse(r.checked_at);
  if (!Number.isFinite(checked) || checked > Date.now() + 60_000 || !Array.isArray(r.sources) || !r.sources.length) return false;
  if (!r.sources.every(s => s && isPracticeOfficialSource(s.url) && /^[a-f0-9]{64}$/i.test(s.sha256) && Number.isFinite(Date.parse(s.checked_at)))) return false;
  if (!Array.isArray(r.items) || r.items.length !== quiz.length || !quiz.length) return false;
  return quiz.every((q,i) => { const item = r.items[i]; return item && item.q === q.q && item.a === q.a && item.why === q.why && typeof q.a === 'boolean' && r.sources.some(s => s.url === item.source_url); });
}


/**
 * Didactic approval for non-statutory accounting practice built from the
 * course's cited teaching files. This is deliberately separate from the
 * official-source review required for legal/normative materials.
 */
export type MaterialDidacticReview = {
  version: 1;
  review_type: "didactic";
  status: "reviewed";
  material_slug: string;
  subject: string;
  topic_label: string;
  checked_at: string;
  method: string;
  source_note: string;
  items: { q: string; a: boolean; why: string }[];
};

export function matchesDidacticReview(
  quiz: QuizItem[],
  value: unknown,
  materialSlug: string,
): value is MaterialDidacticReview {
  if (!value || typeof value !== "object") return false;
  const r = value as MaterialDidacticReview;
  if (
    r.version !== 1 ||
    r.review_type !== "didactic" ||
    r.status !== "reviewed" ||
    r.material_slug !== materialSlug ||
    r.subject !== "Contabilidade Geral e Análise Financeira" ||
    !r.topic_label ||
    !r.method ||
    !r.source_note ||
    !Number.isFinite(Date.parse(r.checked_at)) ||
    !Array.isArray(r.items) ||
    r.items.length !== quiz.length ||
    !quiz.length
  ) return false;
  return quiz.every((q, i) => {
    const item = r.items[i];
    return !!item && item.q === q.q && item.a === q.a && item.why === q.why;
  });
}

/** Explicit PC-AC course-only approval for nonlegal, nonfinancial didactic exercises.
 *  Does not substitute the hashed official-source gate for statutory topics.
 */
const MANUAL_DIDACTIC_SUBJECTS = new Set([
  "Análise de Dados e Informações",
  "Estatística",
  "Língua Portuguesa",
  "Noções de Administração",
  "Noções de Informática",
  "Raciocínio Lógico",
  "Realidade do Estado do Acre",
  "Tecnologia da Informação e Segurança da Informação",
]);
export type MaterialManualReview = {
  version: 1;
  review_type: "didactic_manual";
  status: "reviewed";
  material_slug: string;
  subject: string;
  topic_label: string;
  checked_at: string;
  method: string;
  source_note: string;
  items: { q: string; a: boolean; why: string }[];
};
export function matchesManualReview(
  quiz: QuizItem[],
  value: unknown,
  materialSlug: string,
): value is MaterialManualReview {
  if (!materialSlug.startsWith("pcac-2026-") || !value || typeof value !== "object") return false;
  const review = value as MaterialManualReview;
  const checked = Date.parse(review.checked_at);
  if (
    review.version !== 1 ||
    review.review_type !== "didactic_manual" ||
    review.status !== "reviewed" ||
    review.material_slug !== materialSlug ||
    !MANUAL_DIDACTIC_SUBJECTS.has(review.subject) ||
    !review.topic_label?.trim() ||
    !review.method?.trim() ||
    !review.source_note?.trim() ||
    !Number.isFinite(checked) ||
    checked > Date.now() + 60_000 ||
    !Array.isArray(review.items) ||
    !quiz.length ||
    review.items.length !== quiz.length
  ) return false;
  return quiz.every((q, i) => {
    const item = review.items[i];
    return !!item && item.q === q.q && item.a === q.a && item.why === q.why && typeof q.a === "boolean";
  });
}
