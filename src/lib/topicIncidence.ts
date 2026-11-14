import { canonicalSubject } from "./subjects";
import type { TopicTier } from "./editalRadar";

// Chance de um assunto do edital cair na prova, estimada pelo que a banca já cobrou.
// A conta é a mesma do Raio-X dos editais: em quantas das provas analisadas (com peso maior para as
// recentes) o assunto apareceu. É estatística sobre as provas cadastradas: tendência, não garantia.

/** Uma linha agregada de questões da banca: prova + matéria + assunto cobrado + quantidade. */
export interface IdecanGroup {
  contest: string;
  career: string;
  year: number;
  subject: string;
  topic: string | null;
  n: number;
}

/** Um assunto do edital a classificar. `subjects` são as matérias da plataforma que o cobrem. */
export interface IncidenceItem {
  id: string;
  subjects: string[];
  text: string;
}

export interface Incidence {
  id: string;
  tier: TopicTier;
  /** 0..1: proporção ponderada das provas em que o assunto apareceu. */
  score: number;
  examsAsked: number;
  examsPool: number;
  questions: number;
  lastYear: number | null;
}

// Mesmos cortes do Raio-X (src/lib/editalRadar.ts).
const HIGH = 0.7;
const MEDIUM = 0.4;
/** Menos provas que isso na matéria: não há base para classificar. */
const MIN_EXAMS = 2;
/** Sem assuntos informados em quantidade suficiente, "nunca caiu" seria um falso alarme. */
const MIN_TAGGED_QUESTIONS = 8;
const MIN_TAGGED_SHARE = 0.2;

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOP = new Set([
  "para", "pela", "pelo", "pelas", "pelos", "com", "sem", "sobre", "entre", "como", "suas", "seus",
  "esta", "este", "isso", "tambem", "quando", "onde", "cada", "mais", "menos",
  "conceito", "conceitos", "nocoes", "nocao", "aspectos", "especies", "tipos", "formas",
  "geral", "gerais", "basico", "basicos", "fundamentos", "aplicacao", "uso",
]);

/** Radicais das palavras relevantes: tolera plural, gênero e pequenas variações. */
export function topicStems(text: string): string[] {
  const out = new Set<string>();
  for (const word of normalize(text).split(" ")) {
    if (word.length < 4 || STOP.has(word)) continue;
    out.add(word.slice(0, 6));
  }
  return [...out];
}

/** Quanto do assunto da questão aparece no item do edital (0..1) e quantos radicais coincidem. */
function overlap(questionStems: string[], itemStems: Set<string>) {
  if (!questionStems.length) return { shared: 0, coverage: 0 };
  const shared = questionStems.filter((s) => itemStems.has(s)).length;
  return { shared, coverage: shared / questionStems.length };
}

const examKey = (g: IdecanGroup) => `${normalize(g.contest)}|${normalize(g.career)}|${g.year}`;

const POLICE = /policia|penitenciar|seguranca publica|perito|delegado|investigador|escriv|papiloscop|agente prisional|guarda/;
/** Provas da área policial pesam mais que as de áreas afins. */
export const isPoliceExam = (contest: string, career: string) =>
  POLICE.test(normalize(`${contest} ${career}`));

const recency = (year: number, maxYear: number) => Math.pow(0.5, (maxYear - year) / 3);

export interface PreparedItem {
  item: IncidenceItem;
  subjects: Set<string>;
  stems: Set<string>;
}

export function prepareItems(items: IncidenceItem[]): PreparedItem[] {
  return items.map((item) => ({
    item,
    subjects: new Set(item.subjects.map((s) => normalize(canonicalSubject(s)))),
    stems: new Set(topicStems(item.text)),
  }));
}

/** Assunto do edital que melhor descreve um assunto cobrado (mesma regra do selo de chance). */
export function bestItemFor(subjectKey: string, topicText: string, prepared: PreparedItem[]): string | null {
  const qStems = topicStems(topicText);
  let best: { id: string; coverage: number; shared: number; size: number } | null = null;
  for (const p of prepared) {
    if (!p.subjects.has(subjectKey)) continue;
    const { shared, coverage } = overlap(qStems, p.stems);
    if (shared < Math.min(2, qStems.length) || coverage < 0.5) continue;
    const candidate = { id: p.item.id, coverage, shared, size: p.stems.size };
    if (
      !best ||
      candidate.coverage > best.coverage ||
      (candidate.coverage === best.coverage && candidate.shared > best.shared) ||
      (candidate.coverage === best.coverage && candidate.shared === best.shared && candidate.size < best.size)
    )
      best = candidate;
  }
  return best?.id ?? null;
}

export const normalizeSubjectKey = (subject: string) => normalize(canonicalSubject(subject));

export function computeIncidence(groups: IdecanGroup[], items: IncidenceItem[]): Map<string, Incidence> {
  const result = new Map<string, Incidence>();
  if (!items.length) return result;

  const maxYear = groups.reduce((m, g) => Math.max(m, g.year), 0);
  const subjectOf = (g: IdecanGroup) => normalize(canonicalSubject(g.subject));
  const prepared = prepareItems(items);

  // Provas por matéria (com o peso de cada uma) e questões com assunto informado.
  const examsBySubject = new Map<string, Map<string, number>>();
  const questionsBySubject = new Map<string, { total: number; tagged: number }>();
  for (const g of groups) {
    if (g.n <= 0) continue;
    const subject = subjectOf(g);
    const exams = examsBySubject.get(subject) ?? new Map<string, number>();
    exams.set(
      examKey(g),
      recency(g.year, maxYear) * (isPoliceExam(g.contest, g.career) ? 1 : 0.5),
    );
    examsBySubject.set(subject, exams);
    const stat = questionsBySubject.get(subject) ?? { total: 0, tagged: 0 };
    stat.total += g.n;
    if (g.topic) stat.tagged += g.n;
    questionsBySubject.set(subject, stat);
  }

  // Cada questão com assunto vai para o item do edital que melhor a descreve.
  const asked = new Map<string, { exams: Set<string>; questions: number; last: number }>();
  for (const g of groups) {
    if (g.n <= 0 || !g.topic) continue;
    const bestId = bestItemFor(subjectOf(g), g.topic, prepared);
    if (!bestId) continue;
    const entry = asked.get(bestId) ?? { exams: new Set<string>(), questions: 0, last: 0 };
    entry.exams.add(examKey(g));
    entry.questions += g.n;
    entry.last = Math.max(entry.last, g.year);
    asked.set(bestId, entry);
  }

  for (const p of prepared) {
    const pool = new Map<string, number>();
    let total = 0;
    let tagged = 0;
    for (const subject of p.subjects) {
      for (const [key, w] of examsBySubject.get(subject) ?? []) pool.set(key, w);
      const stat = questionsBySubject.get(subject);
      if (stat) {
        total += stat.total;
        tagged += stat.tagged;
      }
    }
    const entry = asked.get(p.item.id);
    const poolWeight = [...pool.values()].reduce((s, w) => s + w, 0);
    const askedWeight = entry ? [...entry.exams].reduce((s, key) => s + (pool.get(key) ?? 0), 0) : 0;
    const score = poolWeight ? askedWeight / poolWeight : 0;
    const insufficient =
      pool.size < MIN_EXAMS || tagged < MIN_TAGGED_QUESTIONS || (total > 0 && tagged / total < MIN_TAGGED_SHARE);
    const tier: TopicTier = insufficient
      ? "amostra"
      : !entry || entry.exams.size === 0
        ? "nunca"
        : score >= HIGH
          ? "alta"
          : score >= MEDIUM
            ? "media"
            : "baixa";
    result.set(p.item.id, {
      id: p.item.id,
      tier,
      score,
      examsAsked: entry?.exams.size ?? 0,
      examsPool: pool.size,
      questions: entry?.questions ?? 0,
      lastYear: entry && entry.last ? entry.last : null,
    });
  }
  return result;
}

/** Texto do selo: curto, discreto e sem prometer o que a estatística não garante. */
export const SEAL_LABEL: Record<TopicTier, string> = {
  alta: "Alta chance",
  media: "Chance média",
  baixa: "Chance baixa",
  nunca: "Sem registro",
  amostra: "Poucos dados",
};

export function incidenceBasis(inc: Incidence): string {
  if (inc.tier === "amostra")
    return "Ainda não há provas da IDECAN suficientes nesta matéria para estimar a chance deste assunto.";
  if (inc.tier === "nunca")
    return `Não apareceu nas ${inc.examsPool} provas da IDECAN analisadas nesta matéria. Estimativa a partir do acervo da plataforma, não uma garantia.`;
  const last = inc.lastYear ? `; última vez em ${inc.lastYear}` : "";
  return `Caiu em ${inc.examsAsked} de ${inc.examsPool} provas da IDECAN analisadas (${inc.questions} ${inc.questions === 1 ? "questão" : "questões"}${last}). Estimativa a partir do acervo da plataforma, não uma garantia.`;
}
