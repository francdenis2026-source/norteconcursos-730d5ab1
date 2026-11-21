/**
 * Cronograma de estudos por edital: tipos, estatísticas de progresso e montagem da semana.
 * A semana é determinística e se ajusta ao que o aluno já fez (menos conteúdo concluído e
 * desempenho abaixo de 70% aumentam o tempo da disciplina).
 */
const strip = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
/** Nomes que os editais escrevem de jeitos diferentes viram um só (chave sem acento/minúscula → nome padrão). */
const ALIAS: Record<string, string> = {
  "arquivologia (somente escrivao)": "Arquivologia",
  "contabilidade geral": "Contabilidade",
  "etica": "Ética no Serviço Público",
  "etica e cidadania": "Ética no Serviço Público",
  "legislacao": "Legislação Especial",
  "direitos humanos e participacao social": "Direitos Humanos",
  "probabilidade e estatistica": "Estatística",
  "direito penal e de direito processual penal": "Direito Penal e Processual Penal",
  "atualidades e conhecimentos sobre o estado": "Atualidades e Conhecimentos sobre Sergipe",
  "administracao / situacoes gerenciais": "Administração Geral e Situações Gerenciais",
};
/** Nome padrão da disciplina: sem "Noções de"/"Conhecimentos de", com variações de Informática, Raciocínio Lógico etc. unificadas. */
export function canonicalDiscipline(raw: string): string {
  const key = strip(raw).replace(/^(nocoes|conhecimentos) de /, "");
  if (key.startsWith("raciocinio logico")) return "Raciocínio Lógico";
  if (key.startsWith("informatica")) return "Informática";
  if (ALIAS[key]) return ALIAS[key];
  const clean = raw.trim().replace(/^(Noções|Conhecimentos) de /i, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}
/** Disciplinas genéricas de um edital específico não servem para montar um cronograma do zero. */
export const isGenericDiscipline = (nome: string) =>
  /^(conhecimentos (especificos|tecnicos)|atualidades e conhecimentos sobre sergipe)$/.test(strip(nome));

export interface CronoTopic { id: string; t: string }
export interface CronoDisc {
  id: string; nome: string; peso: 1 | 2; topicos: CronoTopic[];
  /** Pontos da disciplina na prova (questões × peso da questão). Quando existe, manda mais que o peso 1|2. */
  pontos?: number;
}
export interface CronoConfig {
  discs: CronoDisc[];
  days: number[]; // 0 = domingo … 6 = sábado
  startTime: string; // HH:MM
  weeklyHours: number;
  /** Painel do dia: simulado no último dia de estudo e redação no penúltimo (ou único). */
  simulado?: boolean;
  essay?: boolean;
}
export interface TopicProgress {
  video: boolean; pdf: boolean; podcast: boolean;
  qtde: number; acertos: number;
  revPdf: boolean; revQuestoes: boolean;
  /** Última atualização do conteúdo (data em que foi marcado). Base da revisão espaçada. */
  updatedAt?: string | undefined;
}
export const EMPTY_PROGRESS: TopicProgress = {
  video: false, pdf: false, podcast: false, qtde: 0, acertos: 0, revPdf: false, revQuestoes: false,
};

export interface DiscStats { done: number; total: number; qtde: number; acertos: number }
export const accuracy = (s: { qtde: number; acertos: number }) =>
  s.qtde > 0 ? Math.round((100 * s.acertos) / s.qtde) : null;
/** Um conteúdo está "concluído" quando a aprendizagem (vídeo ou PDF) foi feita e há questões resolvidas. */
export const topicDone = (p?: TopicProgress) => !!p && (p.video || p.pdf) && p.qtde > 0;

export function discStats(d: CronoDisc, progress: Record<string, TopicProgress>): DiscStats {
  let done = 0, qtde = 0, acertos = 0;
  for (const t of d.topicos) {
    const p = progress[t.id];
    if (topicDone(p)) done++;
    qtde += p?.qtde ?? 0;
    acertos += p?.acertos ?? 0;
  }
  return { done, total: d.topicos.length, qtde, acertos };
}

export interface WeekBlock {
  discId: string; nome: string; topic: string; topicId: string; minutes: number;
  start: string; end: string; first: boolean;
  /** Minutos desde 00:00 sem enrolar em 24h — para ordenar/comparar sem o bug de "00:10" < "22:30". */
  rawStart: number; rawEnd: number;
}
export const MIN_BLOCK = 30;
export const MAX_BLOCK = 120; // PDF: peso 2, primeira vez que vai estudar = 2 horas
const GAP = 10;
/** Simulado ≈ 12% das horas da semana (de 1 a 3 h); redação 40 min (60 min com 10 h ou mais por semana). */
export const simuladoMinutes = (weeklyHours: number) =>
  Math.min(180, Math.max(60, Math.round((weeklyHours * 60 * 0.12) / MIN_BLOCK) * MIN_BLOCK));
export const essayMinutes = (weeklyHours: number) => (weeklyHours >= 10 ? 60 : 40);
/** Fases até a prova: base (teoria), prática (>90 d → ≤90 d: mais questões) e revisão (≤30 d: erros e revisão). */
export const PRACTICE_PHASE_DAYS = 90;
export const FINAL_PHASE_DAYS = 30;
export type StudyPhase = "base" | "pratica" | "revisao";
export const studyPhase = (daysLeft?: number | null): StudyPhase =>
  daysLeft == null || daysLeft < 0 || daysLeft > PRACTICE_PHASE_DAYS ? "base" : daysLeft > FINAL_PHASE_DAYS ? "pratica" : "revisao";

const hhmm = (min: number) =>
  `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Peso efetivo: pontos da prova (ou peso 1|2 ×10) × o quanto falta × reforço proporcional ao erro. */
export function effectiveWeight(d: CronoDisc, st: DiscStats): number {
  const remaining = st.total ? 1 - st.done / st.total : 1;
  const acc = accuracy(st);
  // com 5+ questões o reforço cresce com o erro (70% → 1.0 … 40% → 1.45); com menos, o histórico é pouco confiável
  const boost = acc !== null && st.qtde >= 5 && acc < 70 ? 1 + Math.min(0.5, (70 - acc) / 70 * 1.0) : 1;
  return (d.pontos ?? d.peso * 10) * (0.3 + remaining) * boost;
}

/** Assunto já estudado com desempenho fraco (≥5 questões e <60% de acerto): o mais fraco primeiro. */
export function weakTopic(d: CronoDisc, progress: Record<string, TopicProgress>, skip?: Set<string>): CronoTopic | undefined {
  let worst: { t: CronoTopic; acc: number } | undefined;
  for (const t of d.topicos) {
    const p = progress[t.id];
    if (!p || p.qtde < 5 || skip?.has(t.id)) continue;
    const a = (100 * p.acertos) / p.qtde;
    if (a < 60 && (!worst || a < worst.acc)) worst = { t, acc: a };
  }
  return worst?.t;
}

/** Dias de revisão espaçada depois de concluir um conteúdo (mesmo critério do plano de estudos). */
export const REVIEW_DAYS = [1, 7, 30];
export interface RevisionDue { discId: string; nome: string; topic: string; topicId: string; daysSince: number; offset: number }

/** Conteúdos concluídos que já pedem revisão: o maior intervalo vencido (1, 7 ou 30 dias), mais atrasados primeiro. */
export function dueRevisions(
  cfg: CronoConfig, progress: Record<string, TopicProgress>, now = new Date(), limit = 6,
): RevisionDue[] {
  const out: RevisionDue[] = [];
  for (const d of cfg.discs)
    for (const t of d.topicos) {
      const p = progress[t.id];
      if (!p?.updatedAt || !topicDone(p) || (p.revPdf && p.revQuestoes)) continue;
      const daysSince = Math.floor((now.getTime() - new Date(p.updatedAt).getTime()) / 86_400_000);
      const offset = [...REVIEW_DAYS].reverse().find((o) => daysSince >= o);
      if (offset === undefined) continue;
      out.push({ discId: d.id, nome: d.nome, topic: t.t, topicId: t.id, daysSince, offset });
    }
  return out.sort((a, b) => b.daysSince - a.daysSince).slice(0, limit);
}

/** Atraso: se o aluno estudou algo na janela de 7 dias mas ficou abaixo da meta, a diferença (até 25%) entra na semana. */
export function catchUpMinutes(weeklyHours: number, studiedMin: number | null): number {
  if (studiedMin === null || studiedMin <= 0) return 0;
  const deficit = weeklyHours * 60 - studiedMin;
  if (deficit <= 0) return 0;
  return Math.floor(Math.min(deficit, weeklyHours * 15) / MIN_BLOCK) * MIN_BLOCK;
}

/** Monta a semana: day (0-6) → blocos com horário. Minutos em múltiplos de 30. */
export function buildWeek(cfg: CronoConfig, progress: Record<string, TopicProgress>, opts: { carryMinutes?: number } = {}): Record<number, WeekBlock[]> {
  const days = [...new Set(cfg.days)].sort((a, b) => a - b);
  const out: Record<number, WeekBlock[]> = {};
  for (const d of days) out[d] = [];
  if (!days.length || !cfg.discs.length) return out;

  // Simulado (60 min) e redação (40 min) saem do total semanal: a soma da semana bate com as horas informadas.
  const reserved = (cfg.simulado ? simuladoMinutes(cfg.weeklyHours) : 0) + (cfg.essay ? essayMinutes(cfg.weeklyHours) : 0);
  const budget = cfg.weeklyHours * 60 + (opts.carryMinutes ?? 0);
  const slots = Math.max(1, Math.round((budget - Math.min(reserved, cfg.weeklyHours * 30)) / MIN_BLOCK));
  const stats = new Map(cfg.discs.map((d) => [d.id, discStats(d, progress)]));
  const w = cfg.discs.map((d) => effectiveWeight(d, stats.get(d.id)!));
  const sum = w.reduce((a, b) => a + b, 0);

  // maiores restos: reparte as fatias de 30 min entre as disciplinas
  const share = w.map((x) => (x / sum) * slots);
  const alloc = share.map(Math.floor);
  let left = slots - alloc.reduce((a, b) => a + b, 0);
  share.map((s, i) => [s - Math.floor(s), i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1])
    .forEach(([, i]) => { if (left-- > 0) alloc[i] = (alloc[i] ?? 0) + 1; });

  // cada disciplina vira blocos de até 2 h; coloca sempre no dia mais vazio que ainda não a tem
  const load = Object.fromEntries(days.map((d) => [d, 0]));
  const has = Object.fromEntries(days.map((d) => [d, new Set<string>()]));
  const perDay: Record<number, { d: CronoDisc; topic: string; topicId: string; minutes: number; first: boolean }[]> = Object.fromEntries(days.map((d) => [d, []]));
  const order = cfg.discs.map((d, i) => ({ d, n: alloc[i] ?? 0 })).sort((a, b) => b.n - a.n);
  for (const { d, n } of order) {
    let remaining = n * MIN_BLOCK;
    let first = stats.get(d.id)!.done === 0;
    while (remaining > 0) {
      const m = Math.min(remaining, MAX_BLOCK);
      const day = [...days].sort((a, b) => Number(has[a]!.has(d.id)) - Number(has[b]!.has(d.id)) || load[a]! - load[b]! || a - b)[0]!;
      const pending = d.topicos.find((topic) => !topicDone(progress[topic.id]));
      perDay[day]!.push({ d, topic: pending?.t ?? "Próximo conteúdo", topicId: pending?.id ?? "", minutes: m, first });
      has[day]!.add(d.id);
      load[day]! += m;
      remaining -= m;
      first = false;
    }
  }

  const [h, m] = cfg.startTime.split(":").map(Number);
  for (const day of days) {
    let t = (h ?? 19) * 60 + (m ?? 0);
    for (const b of perDay[day]!.sort((a, b2) => b2.minutes - a.minutes || a.d.nome.localeCompare(b2.d.nome))) {
      out[day]!.push({
        discId: b.d.id, nome: b.d.nome, topic: b.topic, topicId: b.topicId, minutes: b.minutes,
        start: hhmm(t), end: hhmm(t + b.minutes), first: b.first, rawStart: t, rawEnd: t + b.minutes,
      });
      t += b.minutes + GAP;
    }
  }
  return out;
}

/** Próximo conteúdo a estudar: primeiro não concluído, na disciplina de maior peso efetivo. */
export function nextTopic(cfg: CronoConfig, progress: Record<string, TopicProgress>) {
  let best: { d: CronoDisc; t: CronoTopic; w: number } | null = null;
  for (const d of cfg.discs) {
    const t = d.topicos.find((x) => !topicDone(progress[x.id]));
    if (!t) continue;
    const w = effectiveWeight(d, discStats(d, progress));
    if (!best || w > best.w) best = { d, t, w };
  }
  return best;
}

/** Self-check (rodado por scripts/cronograma.test.mjs): total de minutos bate e nenhum bloco passa de 2 h. */
export function selfCheck() {
  const mk = (id: string, peso: 1 | 2): CronoDisc => ({ id, nome: id, peso, topicos: [{ id: id + "1", t: "x" }] });
  const cfg: CronoConfig = { discs: [mk("a", 2), mk("b", 1), mk("c", 1)], days: [1, 2, 3, 4, 5], startTime: "19:00", weeklyHours: 10 };
  const wk = buildWeek(cfg, {});
  const blocks = Object.values(wk).flat();
  const total = blocks.reduce((s, b) => s + b.minutes, 0);
  if (total !== 600) throw new Error(`total ${total} != 600`);
  if (blocks.some((b) => b.minutes > MAX_BLOCK || b.minutes % MIN_BLOCK)) throw new Error("bloco inválido");
  const a = blocks.filter((b) => b.discId === "a").reduce((s, b) => s + b.minutes, 0);
  const b2 = blocks.filter((b) => b.discId === "b").reduce((s, b) => s + b.minutes, 0);
  if (a <= b2) throw new Error("peso 2 deve receber mais tempo");
  return true;
}

export interface WeekExplanation { discId: string; nome: string; minutes: number; reason: string }
/** Por que cada disciplina recebeu esse tempo (pontos/peso, quanto falta, desempenho). */
export function explainWeek(cfg: CronoConfig, progress: Record<string, TopicProgress>, week: Record<number, WeekBlock[]>): WeekExplanation[] {
  const minutes = new Map<string, number>();
  for (const b of Object.values(week).flat()) minutes.set(b.discId, (minutes.get(b.discId) ?? 0) + b.minutes);
  return cfg.discs.map((d) => {
    const st = discStats(d, progress), acc = accuracy(st);
    const parts = [d.pontos != null ? `vale ${Math.round(d.pontos)} pts na prova` : `peso ${d.peso}`];
    parts.push(st.total ? `${st.total - st.done} de ${st.total} conteúdos por fazer` : "sem conteúdos");
    if (acc !== null && st.qtde >= 5) parts.push(acc < 70 ? `acerto ${acc}% (reforço)` : `acerto ${acc}%`);
    return { discId: d.id, nome: d.nome, minutes: minutes.get(d.id) ?? 0, reason: parts.join(" · ") };
  }).sort((a, b) => b.minutes - a.minutes);
}

export const TOPIC_MIN = 60; // estimativa média: aprender + praticar um conteúdo
export interface Coverage { need: number; have: number; ok: boolean; priority: string[] }
/** O conteúdo restante cabe até a prova? Se não, diz o que priorizar (maior peso efetivo). */
export function coverage(cfg: CronoConfig, progress: Record<string, TopicProgress>, daysLeft: number | null): Coverage | null {
  if (daysLeft === null || daysLeft < 0) return null;
  const left = cfg.discs.reduce((n, d) => n + d.topicos.filter((t) => !topicDone(progress[t.id])).length, 0);
  const have = Math.round((daysLeft / 7) * cfg.weeklyHours * 60);
  const need = left * TOPIC_MIN;
  const priority = [...cfg.discs]
    .sort((a, b) => effectiveWeight(b, discStats(b, progress)) - effectiveWeight(a, discStats(a, progress)))
    .slice(0, 3).map((d) => d.nome);
  return { need, have, ok: need <= have, priority };
}

/** Self-check: simulado/redação saem das horas semanais. */
export function selfCheckReserva() {
  const mk = (id: string, peso: 1 | 2): CronoDisc => ({ id, nome: id, peso, topicos: [{ id: id + "1", t: "x" }] });
  const cfg: CronoConfig = { discs: [mk("a", 2), mk("b", 1)], days: [1, 2, 3, 4, 5], startTime: "19:00", weeklyHours: 10, simulado: true, essay: true };
  const total = Object.values(buildWeek(cfg, {})).flat().reduce((s, b) => s + b.minutes, 0);
  if (total > 600 - simuladoMinutes(10) - essayMinutes(10) + MIN_BLOCK) throw new Error(`reserva ignorada: ${total}`);
  // pontos mandam: 20 pts recebem mais que 5 pts
  const pts: CronoConfig = { ...cfg, simulado: false, essay: false, discs: [{ ...mk("a", 1), pontos: 20 }, { ...mk("b", 1), pontos: 5 }] };
  const w = Object.values(buildWeek(pts, {})).flat();
  const m = (id: string) => w.filter((x) => x.discId === id).reduce((n, x) => n + x.minutes, 0);
  if (m("a") <= m("b") * 2) throw new Error("pontos não pesaram");
  // assunto fraco e atraso
  const weak = weakTopic({ ...mk("a", 1), topicos: [{ id: "t", t: "t" }] }, { t: { ...EMPTY_PROGRESS, video: true, qtde: 10, acertos: 3 } });
  if (weak?.id !== "t") throw new Error("assunto fraco");
  if (catchUpMinutes(10, 0) !== 0 || catchUpMinutes(10, 300) !== 150 || catchUpMinutes(10, 700) !== 0) throw new Error("atraso");
  if (studyPhase(null) !== "base" || studyPhase(60) !== "pratica" || studyPhase(10) !== "revisao") throw new Error("fases");
  const old = new Date(Date.now() - 8 * 86_400_000).toISOString();
  const rv = dueRevisions({ discs: [mk("a", 1)] , days: [1], startTime: "19:00", weeklyHours: 1 }, { "a1": { ...EMPTY_PROGRESS, video: true, qtde: 1, acertos: 1, updatedAt: old } });
  if (rv.length !== 1 || rv[0]!.offset !== 7) throw new Error("revisão: conteúdo de 8 dias deve vencer a revisão de 7 dias");
  if (coverage(cfg, {}, 1)?.ok !== false) throw new Error("cobertura");
  return true;
}

/** Self-check: nomes unificados e sem repetição. */
export function disciplineNamesCheck(names: string[]) {
  const out = names.map(canonicalDiscipline);
  const want: [string, string][] = [
    ["Noções de Direito Penal", "Direito Penal"], ["Informática", "Informática"], ["Conhecimentos de Informática", "Informática"],
    ["Noções de Informática", "Informática"], ["Raciocínio Lógico Quantitativo", "Raciocínio Lógico"],
    ["Raciocínio Lógico-Matemático", "Raciocínio Lógico"], ["Ética", "Ética no Serviço Público"], ["Contabilidade Geral", "Contabilidade"],
    ["Noções de Legislação Especial", "Legislação Especial"],
  ];
  for (const [a, b] of want) if (canonicalDiscipline(a) !== b) throw new Error(`${a} -> ${canonicalDiscipline(a)} != ${b}`);
  return out;
}
