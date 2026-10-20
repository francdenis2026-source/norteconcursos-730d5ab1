// Sessões de questões em andamento neste navegador (treino e simulado), para o aluno voltar de onde parou.
//
// As fontes são as mesmas que as telas já gravam a cada resposta: o marcador do treinador
// (`trainer-bookmark:<usuário>`) e o rascunho do simulado (`norte:simulator:v1:<usuário>:<escopo>`).
// Aqui só se LÊ e resume; nada é gravado. O que o aluno acertou, errou ou pulou no treino vem do marcador;
// no simulado o gabarito só aparece na entrega, então o resumo mostra respondidas, em branco e prazo.
import { simulatorClock } from "./simulatorClock";

export interface ResumeSession {
  kind: "trainer" | "simulator";
  title: string;
  /** Número (1 a total) da questão em que o aluno parou. */
  position: number;
  total: number;
  answered: number;
  correct: number | null;
  wrong: number | null;
  skipped: number;
  /** Questões ainda sem resposta nem pulo (treino) ou em branco (simulado). */
  remaining: number;
  savedAt: number;
  /** Simulado: segundos que restam no prazo; null no treino. */
  secondsLeft: number | null;
  /** Simulado já encerrado e aguardando gravação do resultado. */
  unsavedResult: boolean;
  to: "/dashboard/question-trainer" | "/dashboard/mock-exams";
  search: Record<string, string>;
}

export interface ResumeStorage {
  getItem(key: string): string | null;
}

const TRAINER_SEARCH_KEYS = new Set([
  "studyTopic",
  "unseen",
  "fresh",
  "edition",
  "syllabus",
  "law",
  "contest",
  "board",
  "career",
  "year",
  "subject",
  "source",
  "reviewed",
  "state",
  "category",
  "area",
  "topic",
  "go",
  "reinforce",
  "mode",
  "appliedExam",
  "catalogQuery",
  "currency",
  "limit",
]);

const parse = (raw: string | null): unknown => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/** O marcador guarda a rota como pares [chave, valor]; devolve só os filtros que a tela aceita. */
export function trainerSearchFromRoute(route: unknown): Record<string, string> {
  const search: Record<string, string> = {};
  const entries = parse(typeof route === "string" ? route : null);
  if (!Array.isArray(entries)) return search;
  for (const entry of entries)
    if (
      Array.isArray(entry) &&
      typeof entry[0] === "string" &&
      typeof entry[1] === "string" &&
      TRAINER_SEARCH_KEYS.has(entry[0])
    )
      search[entry[0]] = entry[1];
  return search;
}

export function trainerResume(storage: ResumeStorage, userId: string): ResumeSession | null {
  const b = parse(storage.getItem(`trainer-bookmark:${userId}`)) as {
    version?: number;
    route?: string;
    savedAt?: number;
    questions?: unknown[];
    index?: number;
    results?: unknown[];
    filters?: Record<string, string>;
  } | null;
  if (
    !b ||
    b.version !== 1 ||
    !Array.isArray(b.questions) ||
    !b.questions.length ||
    !Array.isArray(b.results) ||
    !Number.isInteger(b.index) ||
    (b.index as number) < 0 ||
    (b.index as number) >= b.questions.length
  )
    return null;
  const count = (value: string) => b.results!.filter((r) => r === value).length;
  const correct = count("ok");
  const wrong = count("err");
  const skipped = count("skipped");
  const total = b.questions.length;
  const f = b.filters ?? {};
  const label = [f["subject"], f["contest"], f["year"]]
    .filter((part) => part && part !== "all")
    .join(" · ");
  return {
    kind: "trainer",
    title: `Treino${label ? ` — ${label}` : ""}`,
    position: (b.index as number) + 1,
    total,
    answered: correct + wrong,
    correct,
    wrong,
    skipped,
    remaining: Math.max(0, total - correct - wrong - skipped),
    savedAt: Number.isFinite(b.savedAt) ? (b.savedAt as number) : 0,
    secondsLeft: null,
    unsavedResult: false,
    to: "/dashboard/question-trainer",
    search: trainerSearchFromRoute(b.route),
  };
}

export function simulatorResume(
  storage: ResumeStorage,
  userId: string,
  scope: "enem" | "contests",
  now: number,
): ResumeSession | null {
  const d = parse(storage.getItem(`norte:simulator:v1:${userId}:${scope}`)) as {
    version?: number;
    owner?: string;
    title?: string;
    phase?: string;
    startedAt?: number;
    durationMinutes?: number;
    questions?: { id: string }[];
    answers?: Record<string, string>;
    skipped?: string[];
    currentIndex?: number;
    endedAt?: number | null;
  } | null;
  if (
    !d ||
    d.version !== 1 ||
    d.owner !== userId ||
    !Array.isArray(d.questions) ||
    !d.questions.length ||
    !d.answers ||
    typeof d.startedAt !== "number" ||
    typeof d.durationMinutes !== "number" ||
    (d.phase !== "active" && d.phase !== "result")
  )
    return null;
  const ids = new Set(d.questions.map((q) => q?.id));
  const answered = Object.keys(d.answers).filter((id) => ids.has(id)).length;
  const skipped = (d.skipped ?? []).filter((id) => ids.has(id) && !d.answers![id]).length;
  const total = d.questions.length;
  const secondsLeft =
    d.phase === "result" ? 0 : simulatorClock(d.startedAt, d.durationMinutes * 60, now).remaining;
  return {
    kind: "simulator",
    title: d.title || (scope === "enem" ? "Simulado ENEM" : "Simulado"),
    position: Math.min(total, Math.max(0, (d.currentIndex ?? 0) + 1)),
    total,
    answered,
    correct: null,
    wrong: null,
    skipped,
    remaining: total - answered,
    savedAt: d.startedAt,
    secondsLeft,
    unsavedResult: d.phase === "result",
    to: "/dashboard/mock-exams",
    search: scope === "enem" ? { mode: "enem" } : {},
  };
}

/** Sessões que o aluno pode retomar neste navegador. */
export function readInProgressSessions(
  storage: ResumeStorage,
  userId: string,
  now: number,
): ResumeSession[] {
  if (!userId || userId === "demo-user") return [];
  return [
    trainerResume(storage, userId),
    simulatorResume(storage, userId, "contests", now),
    simulatorResume(storage, userId, "enem", now),
  ].filter((session): session is ResumeSession => session !== null);
}

export interface DiscardStorage {
  removeItem(key: string): void;
}

/** Chaves locais que guardam a sessão; apagá-las é o que faz a barra "em andamento" sumir. */
export function sessionStorageKeys(session: ResumeSession, userId: string): string[] {
  return session.kind === "trainer"
    ? [`trainer-bookmark:${userId}`]
    : [`norte:simulator:v1:${userId}:${session.search["mode"] === "enem" ? "enem" : "contests"}`];
}

/** Escopo da linha espelhada na conta (study_session_snapshots) para a sessão. */
export function sessionSnapshotScope(session: ResumeSession): "trainer" | "enem" | "contests" {
  return session.kind === "trainer"
    ? "trainer"
    : session.search["mode"] === "enem"
      ? "enem"
      : "contests";
}

/** Fecha a sessão neste navegador. As respostas já confirmadas continuam no histórico da conta. */
export function discardLocalSession(
  local: DiscardStorage,
  userId: string,
  session: ResumeSession,
  session2?: DiscardStorage,
) {
  for (const key of sessionStorageKeys(session, userId)) {
    for (const store of [local, session2]) {
      try {
        store?.removeItem(key);
      } catch {
        /* Um armazenamento bloqueado não impede fechar a sessão. */
      }
    }
  }
}
