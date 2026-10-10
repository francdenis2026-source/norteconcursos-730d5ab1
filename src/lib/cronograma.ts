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
export interface CronoDisc { id: string; nome: string; peso: 1 | 2; topicos: CronoTopic[] }
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

export interface WeekBlock { discId: string; nome: string; minutes: number; start: string; end: string; first: boolean }
export const MIN_BLOCK = 30;
export const MAX_BLOCK = 120; // PDF: peso 2, primeira vez que vai estudar = 2 horas
const GAP = 10;

const hhmm = (min: number) =>
  `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Peso efetivo: peso do edital × o quanto falta × reforço se o desempenho está baixo. */
export function effectiveWeight(d: CronoDisc, st: DiscStats): number {
  const remaining = st.total ? 1 - st.done / st.total : 1;
  const acc = accuracy(st);
  return d.peso * (0.3 + remaining) * (acc !== null && acc < 70 ? 1.3 : 1);
}

/** Monta a semana: day (0-6) → blocos com horário. Minutos em múltiplos de 30. */
export function buildWeek(cfg: CronoConfig, progress: Record<string, TopicProgress>): Record<number, WeekBlock[]> {
  const days = [...new Set(cfg.days)].sort((a, b) => a - b);
  const out: Record<number, WeekBlock[]> = {};
  for (const d of days) out[d] = [];
  if (!days.length || !cfg.discs.length) return out;

  const slots = Math.max(1, Math.round((cfg.weeklyHours * 60) / MIN_BLOCK));
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
  const perDay: Record<number, { d: CronoDisc; minutes: number; first: boolean }[]> = Object.fromEntries(days.map((d) => [d, []]));
  const order = cfg.discs.map((d, i) => ({ d, n: alloc[i] ?? 0 })).sort((a, b) => b.n - a.n);
  for (const { d, n } of order) {
    let remaining = n * MIN_BLOCK;
    let first = stats.get(d.id)!.done === 0;
    while (remaining > 0) {
      const m = Math.min(remaining, MAX_BLOCK);
      const day = [...days].sort((a, b) => Number(has[a]!.has(d.id)) - Number(has[b]!.has(d.id)) || load[a]! - load[b]! || a - b)[0]!;
      perDay[day]!.push({ d, minutes: m, first });
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
      out[day]!.push({ discId: b.d.id, nome: b.d.nome, minutes: b.minutes, start: hhmm(t), end: hhmm(t + b.minutes), first: b.first });
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
