import { questionAnswers, type Answer, type Question } from "./questionFormat";
import { isAppliedExamQuestion } from "./questionFilterIdentity";

export interface SimulatorQuestion {
  id: string;
  originalId: string;
  sourceKind: "official" | "curated";
  contest: string;
  year: number;
  career: string;
  board: string;
  subject: string;
  subtopic: string | null;
  itemNumber: number | null;
  state: string;
  category: string;
  checkedAt: string | null;
  text: string;
  answer: Answer;
  explanation: string;
  difficulty: string | null;
  legalBasis: Question["legalBasis"];
  kind?: "true_false" | "multiple_choice";
}
export function simulatorAnswers(q: SimulatorQuestion): Answer[] {
  return questionAnswers({
    ...q,
    itemNumber: q.itemNumber ?? undefined,
    source: q.sourceKind,
    year: String(q.year),
    difficulty: "média",
  });
}
export function simulatorPaperKey(q: SimulatorQuestion) {
  return JSON.stringify([q.contest, q.career, q.board, q.year]);
}
export function simulatorPapers(catalog: SimulatorQuestion[]) {
  const groups = new Map<
    string,
    { key: string; title: string; question: SimulatorQuestion; questions: SimulatorQuestion[] }
  >();
  for (const q of catalog) {
    if (!isAppliedExamQuestion({ source: q.sourceKind, contest: q.contest })) continue;
    const key = simulatorPaperKey(q),
      group = groups.get(key) ?? {
        key,
        title: `${q.contest} · ${q.career} · ${q.board} · ${q.year}`,
        question: q,
        questions: [],
      };
    group.questions.push(q);
    groups.set(key, group);
  }
  return [...groups.values()]
    .map((g) => ({
      ...g,
      questions: g.questions.sort(
        (a, b) =>
          (a.itemNumber ?? Infinity) - (b.itemNumber ?? Infinity) || a.id.localeCompare(b.id),
      ),
    }))
    .sort((a, b) => b.question.year - a.question.year || a.title.localeCompare(b.title, "pt-BR"));
}
export function randomSimulator<T>(catalog: T[], count: number, random = Math.random): T[] {
  const copy = [...catalog];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, Math.max(0, Math.min(Math.floor(count), copy.length)));
}
export function simulatorFingerprint(q: SimulatorQuestion) {
  const text = JSON.stringify([q.text, q.answer, q.contest, q.career, q.board, q.year]);
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16);
}
export interface SimulatorDraft {
  version: 1;
  owner: string;
  scope: "enem" | "contests";
  attemptId: string;
  title: string;
  contestFilter: string | null;
  subjectFilter: string | null;
  phase: "active" | "result";
  startedAt: number;
  durationMinutes: number;
  endedAt: number | null;
  questions: { id: string; fingerprint: string }[];
  answers: Record<string, Answer>;
  flagged: string[];
  currentIndex: number;
}
/** Re-resolve against the current eligible catalog; never restore stale/revoked questions. */
export function restoreSimulatorDraft(
  value: unknown,
  owner: string,
  scope: SimulatorDraft["scope"],
  catalog: SimulatorQuestion[],
  now: number,
) {
  const d = value as SimulatorDraft;
  if (
    !d ||
    d.version !== 1 ||
    d.owner !== owner ||
    d.scope !== scope ||
    !["active", "result"].includes(d.phase) ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(d.attemptId) ||
    typeof d.title !== "string" ||
    !d.title.trim() ||
    !Number.isFinite(d.startedAt) ||
    d.startedAt > now ||
    !Number.isInteger(d.durationMinutes) ||
    d.durationMinutes < 1 ||
    d.durationMinutes > 720 ||
    !Array.isArray(d.questions) ||
    !d.questions.length ||
    d.questions.length > catalog.length ||
    !Number.isInteger(d.currentIndex) ||
    d.currentIndex < 0 ||
    d.currentIndex >= d.questions.length ||
    !d.answers ||
    typeof d.answers !== "object" ||
    !Array.isArray(d.flagged) ||
    !(d.contestFilter === null || typeof d.contestFilter === "string") ||
    !(d.subjectFilter === null || typeof d.subjectFilter === "string") ||
    (d.phase === "active" && d.endedAt !== null) ||
    (d.phase === "result" &&
      (!Number.isFinite(d.endedAt) || d.endedAt! < d.startedAt || d.endedAt! > now))
  )
    return null;
  const byId = new Map(catalog.map((q) => [q.id, q]));
  if (new Set(d.questions.map((q) => q?.id)).size !== d.questions.length) return null;
  const questions: SimulatorQuestion[] = [];
  for (const ref of d.questions) {
    const q = byId.get(ref?.id);
    if (!q || simulatorFingerprint(q) !== ref.fingerprint) return null;
    questions.push(q);
  }
  const ids = new Set(questions.map((q) => q.id));
  if (
    d.flagged.some((id) => !ids.has(id)) ||
    Object.entries(d.answers).some(
      ([id, answer]) => !ids.has(id) || !simulatorAnswers(byId.get(id)!).includes(answer),
    )
  )
    return null;
  return { draft: d, questions };
}

export async function saveSimulatorResult(
  attempt: Record<string, unknown>,
  responses: Record<string, unknown>[],
  port: {
    writeAttempt: (row: Record<string, unknown>) => Promise<void>;
    readAttempt: () => Promise<Record<string, unknown> | null>;
    writeResponses: (rows: Record<string, unknown>[]) => Promise<void>;
    readResponses: () => Promise<Record<string, unknown>[]>;
  },
) {
  // Inserts use ON CONFLICT DO NOTHING: retries cannot change an already scored attempt.
  await port.writeAttempt(attempt);
  const stored = await port.readAttempt();
  if (
    !stored ||
    Object.entries(attempt).some(([key, value]) =>
      key === "finished_at"
        ? Date.parse(String(stored[key])) !== Date.parse(String(value))
        : typeof value === "number"
          ? Number(stored[key]) !== value
          : stored[key] !== value,
    )
  )
    throw Error(
      "O resumo salvo diverge desta tentativa. Nenhum resultado anterior foi sobrescrito.",
    );
  await port.writeResponses(responses);
  const rows = await port.readResponses();
  const byOrder = new Map(rows.map((r) => [Number(r["question_order"]), r]));
  if (
    rows.length !== responses.length ||
    responses.some((expected) =>
      Object.entries(expected).some(
        ([key, value]) => byOrder.get(Number(expected["question_order"]))?.[key] !== value,
      ),
    )
  )
    throw Error(
      "Não foi possível confirmar todas as respostas no histórico. Tente salvar novamente.",
    );
}
