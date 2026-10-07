import { canonicalSubject } from "./subjects";

// Raio-X dos editais: cruza o que cada edital lista com o que as provas já cadastradas realmente
// cobraram, para mostrar o que mais cai, o que nunca caiu e o que tende a cair no próximo concurso.
// Tudo é estatística sobre as provas cadastradas: é uma tendência, não uma garantia.

export interface RadarQuestion {
  contest: string;
  career: string;
  board: string;
  year: number;
  subject: string;
  topicId: string | null;
}

export interface RadarTopic {
  id: string;
  editionId: string;
  discipline: string;
  text: string;
}

export interface RadarEdition {
  id: string;
  contest: string;
  role: string;
  year: number;
  board: string | null;
}

export type Sphere = "todas" | "federal" | "civil" | "outras";

export const norm = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function sphereOf(contest: string): Exclude<Sphere, "todas"> {
  const name = norm(contest);
  if (/federal|penitenciario nacional/.test(name)) return "federal";
  if (
    name.startsWith("policia civil") ||
    /policia cientifica|instituto de criminalistica/.test(name)
  )
    return "civil";
  return "outras";
}

export interface ExamInfo {
  key: string;
  contest: string;
  career: string;
  board: string;
  year: number;
  total: number;
}

export interface DisciplineStat {
  subject: string;
  exams: number;
  weightedShare: number; // 0..1, com peso maior para provas recentes
  lastShare: number;
  expected: number; // questões esperadas numa prova de tamanho médio
  trend: "sobe" | "cai" | "estavel" | "indefinida";
  trendDelta: number; // pontos percentuais
}

export type TopicTier = "alta" | "media" | "baixa" | "nunca" | "amostra";

// Rótulo e estilo de cada faixa de probabilidade — compartilhados entre o Raio-X dos editais e o
// Panorama das provas, para que o mesmo tópico apareça com a mesma cor e o mesmo texto nas duas áreas.
export const TIER_LABEL: Record<TopicTier, string> = {
  alta: "Quase sempre cai",
  media: "Cai com frequência",
  baixa: "Cai de vez em quando",
  nunca: "Nunca caiu",
  amostra: "Poucos dados",
};

export const TIER_STYLE: Record<TopicTier, string> = {
  alta: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
  media: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
  baixa: "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200",
  nunca: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  amostra: "bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400",
};

export interface TopicStat {
  key: string;
  discipline: string;
  text: string;
  examsInEdital: number;
  examsAsked: number;
  questions: number;
  lastYear: number | null;
  score: number; // 0..1: frequência ponderada pela recência
  tier: TopicTier;
  /** IDs de syllabus_topics (de todas as edições) que geraram este agregado — para linkar ao resumo do assunto. */
  topicIds: string[];
}

export interface EditalChange {
  contest: string;
  role: string;
  from: number;
  to: number;
  added: { discipline: string; text: string }[];
  removed: { discipline: string; text: string }[];
  addedDisciplines: string[];
  removedDisciplines: string[];
}

export interface RadarResult {
  exams: ExamInfo[];
  totalQuestions: number;
  averageExamSize: number;
  yearRange: [number, number] | null;
  boards: string[];
  disciplines: DisciplineStat[];
  topics: TopicStat[];
  changes: EditalChange[];
  examsWithSyllabus: number;
}

// Prova de 3 anos atrás pesa metade de uma prova do ano mais recente.
const weight = (year: number, maxYear: number) => Math.pow(0.5, (maxYear - year) / 3);

const examKey = (q: { contest: string; career: string; year: number }) =>
  `${norm(q.contest)}|${norm(q.career)}|${q.year}`;

const topicKey = (discipline: string, text: string) =>
  `${norm(canonicalSubject(discipline))}||${norm(text)}`;

export function analyzeEditals(
  questions: RadarQuestion[],
  topics: RadarTopic[],
  editions: RadarEdition[],
): RadarResult {
  const exams = new Map<
    string,
    ExamInfo & { subjects: Map<string, number>; byTopic: Map<string, number> }
  >();
  const topicById = new Map(topics.map((t) => [t.id, t]));
  for (const q of questions) {
    const key = examKey(q);
    const exam = exams.get(key) ?? {
      key,
      contest: q.contest,
      career: q.career,
      board: q.board,
      year: q.year,
      total: 0,
      subjects: new Map(),
      byTopic: new Map(),
    };
    exam.total += 1;
    const subject = canonicalSubject(q.subject);
    exam.subjects.set(subject, (exam.subjects.get(subject) ?? 0) + 1);
    const topic = q.topicId ? topicById.get(q.topicId) : undefined;
    if (topic) {
      const tk = topicKey(topic.discipline, topic.text);
      exam.byTopic.set(tk, (exam.byTopic.get(tk) ?? 0) + 1);
    }
    exams.set(key, exam);
  }
  const examList = [...exams.values()].sort(
    (a, b) => a.year - b.year || a.contest.localeCompare(b.contest),
  );
  const totalQuestions = examList.reduce((sum, e) => sum + e.total, 0);
  const averageExamSize = examList.length ? totalQuestions / examList.length : 0;
  const maxYear = examList.reduce((m, e) => Math.max(m, e.year), 0);
  const minYear = examList.reduce((m, e) => Math.min(m, e.year), maxYear);

  // Disciplinas
  const subjects = new Set<string>();
  for (const e of examList) for (const s of e.subjects.keys()) subjects.add(s);
  const disciplines: DisciplineStat[] = [...subjects].map((subject) => {
    let wSum = 0;
    let wShare = 0;
    let present = 0;
    const shares: { year: number; share: number }[] = [];
    for (const e of examList) {
      const share = (e.subjects.get(subject) ?? 0) / e.total;
      const w = weight(e.year, maxYear);
      wSum += w;
      wShare += w * share;
      if (e.subjects.has(subject)) present += 1;
      shares.push({ year: e.year, share });
    }
    const half = Math.ceil(shares.length / 2);
    const recent = shares.slice(-half);
    const earlier = shares.slice(0, shares.length - half);
    const avg = (list: { share: number }[]) =>
      list.length ? list.reduce((s, x) => s + x.share, 0) / list.length : 0;
    const delta = earlier.length ? Math.round((avg(recent) - avg(earlier)) * 1000) / 10 : 0;
    const weightedShare = wSum ? wShare / wSum : 0;
    return {
      subject,
      exams: present,
      weightedShare,
      lastShare: shares.at(-1)?.share ?? 0,
      expected: Math.round(weightedShare * averageExamSize * 10) / 10,
      trend: !earlier.length ? "indefinida" : delta >= 2 ? "sobe" : delta <= -2 ? "cai" : "estavel",
      trendDelta: delta,
    };
  });
  disciplines.sort((a, b) => b.weightedShare - a.weightedShare);

  // Tópicos do edital x o que caiu
  const editionByKey = new Map<string, RadarEdition>();
  for (const edition of editions)
    editionByKey.set(`${norm(edition.contest)}|${norm(edition.role)}|${edition.year}`, edition);
  const topicsByEdition = new Map<string, RadarTopic[]>();
  for (const t of topics)
    topicsByEdition.set(t.editionId, [...(topicsByEdition.get(t.editionId) ?? []), t]);

  const agg = new Map<
    string,
    {
      discipline: string;
      text: string;
      inEdital: number;
      asked: number;
      questions: number;
      last: number | null;
      wAsked: number;
      wTotal: number;
      topicIds: Set<string>;
    }
  >();
  let examsWithSyllabus = 0;
  for (const e of examList) {
    const edition = editionByKey.get(e.key);
    if (!edition) continue;
    examsWithSyllabus += 1;
    const w = weight(e.year, maxYear);
    for (const t of topicsByEdition.get(edition.id) ?? []) {
      const key = topicKey(t.discipline, t.text);
      const item = agg.get(key) ?? {
        discipline: canonicalSubject(t.discipline),
        text: t.text,
        inEdital: 0,
        asked: 0,
        questions: 0,
        last: null,
        wAsked: 0,
        wTotal: 0,
        topicIds: new Set<string>(),
      };
      item.inEdital += 1;
      item.wTotal += w;
      item.topicIds.add(t.id);
      const count = e.byTopic.get(key) ?? 0;
      if (count > 0) {
        item.asked += 1;
        item.questions += count;
        item.wAsked += w;
        item.last = Math.max(item.last ?? 0, e.year);
      }
      agg.set(key, item);
    }
  }
  const topicStats: TopicStat[] = [...agg.entries()].map(([key, item]) => {
    const score = item.wTotal ? item.wAsked / item.wTotal : 0;
    const tier: TopicTier =
      item.inEdital < 2
        ? "amostra"
        : item.asked === 0
          ? "nunca"
          : score >= 0.7
            ? "alta"
            : score >= 0.4
              ? "media"
              : "baixa";
    return {
      key,
      discipline: item.discipline,
      text: item.text,
      examsInEdital: item.inEdital,
      examsAsked: item.asked,
      questions: item.questions,
      lastYear: item.last,
      score,
      tier,
      topicIds: [...item.topicIds],
    };
  });
  topicStats.sort((a, b) => b.score - a.score || b.questions - a.questions);

  // Mudanças entre as duas últimas edições de cada cargo
  const roles = new Map<string, RadarEdition[]>();
  for (const edition of editions) {
    const hasExam = examList.some(
      (e) => e.key === `${norm(edition.contest)}|${norm(edition.role)}|${edition.year}`,
    );
    if (!hasExam) continue;
    const key = `${norm(edition.contest)}|${norm(edition.role)}`;
    roles.set(key, [...(roles.get(key) ?? []), edition]);
  }
  const changes: EditalChange[] = [];
  for (const list of roles.values()) {
    const sorted = [...list].sort((a, b) => a.year - b.year);
    if (sorted.length < 2) continue;
    const previous = sorted[sorted.length - 2]!;
    const latest = sorted[sorted.length - 1]!;
    const toMap = (edition: RadarEdition) =>
      new Map(
        (topicsByEdition.get(edition.id) ?? []).map((t) => [topicKey(t.discipline, t.text), t]),
      );
    const before = toMap(previous);
    const after = toMap(latest);
    const added = [...after.entries()]
      .filter(([k]) => !before.has(k))
      .map(([, t]) => ({ discipline: canonicalSubject(t.discipline), text: t.text }));
    const removed = [...before.entries()]
      .filter(([k]) => !after.has(k))
      .map(([, t]) => ({ discipline: canonicalSubject(t.discipline), text: t.text }));
    const disc = (m: Map<string, RadarTopic>) =>
      new Set([...m.values()].map((t) => canonicalSubject(t.discipline)));
    const dBefore = disc(before);
    const dAfter = disc(after);
    changes.push({
      contest: latest.contest,
      role: latest.role,
      from: previous.year,
      to: latest.year,
      added,
      removed,
      addedDisciplines: [...dAfter].filter((d) => !dBefore.has(d)),
      removedDisciplines: [...dBefore].filter((d) => !dAfter.has(d)),
    });
  }

  return {
    exams: examList.map(({ subjects: _s, byTopic: _b, ...info }) => info),
    totalQuestions,
    averageExamSize: Math.round(averageExamSize),
    yearRange: examList.length ? [minYear, maxYear] : null,
    boards: [...new Set(examList.map((e) => e.board).filter(Boolean))].sort(),
    disciplines,
    topics: topicStats,
    changes,
    examsWithSyllabus,
  };
}
