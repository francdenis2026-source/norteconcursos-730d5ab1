// Perfil de banca: estatística descritiva sobre as questões oficiais ativas da plataforma.
// Regra de ouro: só afirmar o que a amostra sustenta. Sempre devolver o tamanho da amostra
// e, quando não há padrão, dizer isso com clareza em vez de inventar tendência.

export interface BancaQuestion {
  board: string;
  contest: string;
  /** Cargo unificado (ver unifiedCareer): o mesmo cargo com nomes diferentes entre órgãos vira um só. */
  career: string;
  /** Nome do cargo como veio da prova; só serve para separar provas de cargos diferentes. */
  rawCareer?: string;
  /** Órgão (Polícia Federal, PRF, Polícia Civil...) para filtrar sem perder a unificação do cargo. */
  org?: string;
  year: number;
  subject: string;
  topic: string | null;
  answer: string; // C | E | A..E
  item: number | null;
  text: string;
}

export type Confidence = "alta" | "media" | "baixa" | "insuficiente";
export type VerdictLevel = "sem_dados" | "sem_padrao" | "indicio" | "padrao";

export interface Verdict {
  level: VerdictLevel;
  text: string;
}

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

export const examKey = (q: Pick<BancaQuestion, "contest" | "year">) => `${q.contest}|${q.year}`;

/**
 * Uma prova é Certo/Errado quando só tem C e E; basta um A, B ou D para ser de múltipla escolha.
 * Letras C e E existem nos dois tipos, então a classificação é por prova, nunca por item.
 */
export function splitByKind(rows: BancaQuestion[]): { ce: BancaQuestion[]; mc: BancaQuestion[] } {
  const mcExams = new Set<string>();
  for (const r of rows)
    if (/^[ABD]$/.test(r.answer)) mcExams.add(`${examKey(r)}|${r.rawCareer ?? r.career}`);
  const ce: BancaQuestion[] = [];
  const mc: BancaQuestion[] = [];
  for (const r of rows) (mcExams.has(`${examKey(r)}|${r.rawCareer ?? r.career}`) ? mc : ce).push(r);
  return { ce, mc };
}

/** Remove a mesma questão repetida em cargos diferentes da mesma prova (itens comuns). */
export function dedupeQuestions(rows: BancaQuestion[]): BancaQuestion[] {
  const seen = new Set<string>();
  const out: BancaQuestion[] = [];
  for (const q of rows) {
    const key = `${examKey(q)}|${norm(q.text).slice(0, 120)}|${q.answer}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}

export function confidence(items: number, exams: number): Confidence {
  if (items >= 500 && exams >= 5) return "alta";
  if (items >= 150 && exams >= 3) return "media";
  if (items >= 60 && exams >= 2) return "baixa";
  return "insuficiente";
}

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  alta: "Amostra ampla",
  media: "Amostra moderada",
  baixa: "Amostra pequena",
  insuficiente: "Dados insuficientes",
};

const pct = (value: number, digits = 0) => `${(value * 100).toFixed(digits).replace(".", ",")}%`;

// ------------------------------------------------------------------ cargos

const ident = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Junta o mesmo cargo escrito de formas diferentes entre órgãos e anos ("Agente de Polícia",
 * "Agente de Polícia Judiciária", "Investigador de Polícia I"...), para ter amostra maior e
 * leitura mais precisa. Cargos sem regra mantêm o nome original.
 */
export function unifiedCareer(rawCareer: string, contest = ""): string {
  const raw = rawCareer.trim();
  const t = ident(raw);
  const c = ident(contest);
  if (/delegado/.test(t)) return "Delegado de Polícia";
  if (/escrivao/.test(t)) return "Escrivão de Polícia";
  if (/papiloscopista|datiloscopista/.test(t)) return "Papiloscopista / Datiloscopista";
  if (/medico.?legista/.test(t)) return "Médico-Legista";
  if (/perito/.test(t)) return "Perito Criminal";
  if (/rodoviari/.test(t)) return "Policial Rodoviário Federal";
  if (/agente de policia penal|execucao penal|agente penitenciario/.test(t))
    return "Agente de Polícia Penal";
  if (t === "departamento penitenciario nacional" || (/penitenciario nacional/.test(c) && !t))
    return "Agente de Polícia Penal";
  if (/agente de policia|investigador|inspetor de policia/.test(t))
    return "Agente / Investigador de Polícia";
  if (/tecnico.*(pericia|policia civil|tpag)/.test(t)) return "Técnico de Perícia (apoio)";
  return raw;
}

export interface Option {
  value: string;
  items: number;
  exams: number;
}

const countOptions = (
  rows: BancaQuestion[],
  key: (q: BancaQuestion) => string | undefined,
  min: number,
): Option[] => {
  const by = new Map<string, BancaQuestion[]>();
  for (const r of rows) {
    const k = key(r);
    if (!k) continue;
    if (!by.has(k)) by.set(k, []);
    by.get(k)!.push(r);
  }
  return [...by.entries()]
    .map(([value, list]) => {
      const d = dedupeQuestions(list);
      return { value, items: d.length, exams: new Set(d.map(examKey)).size };
    })
    .filter((o) => o.items >= min)
    .sort((a, b) => b.items - a.items);
};

export const careerOptions = (rows: BancaQuestion[], min = 40) =>
  countOptions(rows, (q) => q.career, min);
export const orgOptions = (rows: BancaQuestion[], min = 40) =>
  countOptions(rows, (q) => q.org, min);

// ---------------------------------------------------------------- gabarito

export interface AnswerStats {
  kind: "ce" | "mc" | "none";
  n: number;
  counts: Record<string, number>;
  shares: Record<string, number>;
  statistic: number; // z (certo/errado) ou qui-quadrado (múltipla escolha)
  verdict: Verdict;
}

const CHI2_CRIT: Record<number, [number, number]> = {
  3: [7.81, 11.34],
  4: [9.49, 13.28],
};

export function answerStats(rows: Pick<BancaQuestion, "answer">[]): AnswerStats {
  const counts: Record<string, number> = {};
  for (const r of rows) counts[r.answer] = (counts[r.answer] ?? 0) + 1;
  const letters = Object.keys(counts).filter((k) => /^[A-E]$/.test(k));
  const ceOnly = Object.keys(counts).every((k) => k === "C" || k === "E");
  const n = rows.length;
  const shares: Record<string, number> = {};
  for (const [k, v] of Object.entries(counts)) shares[k] = n ? v / n : 0;
  if (n < 60)
    return {
      kind: ceOnly ? "ce" : letters.length ? "mc" : "none",
      n,
      counts,
      shares,
      statistic: 0,
      verdict: {
        level: "sem_dados",
        text: `Só ${n} questões com gabarito: pouco para concluir qualquer coisa sobre o gabarito.`,
      },
    };
  if (ceOnly) {
    const e = counts["E"] ?? 0;
    const p = e / n;
    const z = (p - 0.5) / Math.sqrt(0.25 / n);
    const small = Math.abs(p - 0.5) < 0.03;
    let verdict: Verdict;
    if (Math.abs(z) < 1.96)
      verdict = {
        level: "sem_padrao",
        text: `${pct(p)} de Errado em ${n} itens: compatível com o acaso. Não há viés de gabarito que ajude a decidir.`,
      };
    else
      verdict = {
        level: Math.abs(z) >= 2.58 ? "padrao" : "indicio",
        text: `${pct(p)} de Errado em ${n} itens (${p > 0.5 ? "mais" : "menos"} Errado que o esperado)${
          small
            ? ", mas a diferença é pequena demais para virar estratégia"
            : ". É um indício, não uma regra: não use isso para chutar"
        }.`,
      };
    return { kind: "ce", n, counts, shares, statistic: z, verdict };
  }
  const k = Math.max(letters.length, 4);
  const expected = n / k;
  let chi2 = 0;
  for (let i = 0; i < k; i++) {
    const letter = "ABCDE"[i]!;
    chi2 += ((counts[letter] ?? 0) - expected) ** 2 / expected;
  }
  const crit = CHI2_CRIT[k - 1] ?? CHI2_CRIT[4]!;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const verdict: Verdict =
    chi2 < crit[0]
      ? {
          level: "sem_padrao",
          text: `As alternativas A a ${"ABCDE"[k - 1]} aparecem de forma equilibrada em ${n} itens. Não há letra "mais provável".`,
        }
      : {
          level: chi2 >= crit[1] ? "padrao" : "indicio",
          text: `A alternativa ${top?.[0]} aparece em ${pct((top?.[1] ?? 0) / n)} dos ${n} itens, acima do esperado (${pct(1 / k)}). Ainda assim, não escolha pela letra: a diferença não substitui o conhecimento.`,
        };
  return { kind: "mc", n, counts, shares, statistic: chi2, verdict };
}

// -------------------------------------------------------- sequência (provas CE)

export interface SequenceStats {
  exams: number;
  pooledZ: number;
  repeatRate: number; // chance de o item seguinte ter o mesmo gabarito do anterior
  verdict: Verdict;
}

/** Teste de corridas (Wald–Wolfowitz) por prova, combinado entre as provas. */
export function sequenceStats(rows: BancaQuestion[]): SequenceStats {
  const byExam = new Map<string, BancaQuestion[]>();
  for (const r of rows) {
    if (r.item == null || (r.answer !== "C" && r.answer !== "E")) continue;
    const key = `${examKey(r)}|${r.rawCareer ?? r.career}`;
    if (!byExam.has(key)) byExam.set(key, []);
    byExam.get(key)!.push(r);
  }
  const zs: number[] = [];
  let same = 0;
  let pairs = 0;
  for (const list of byExam.values()) {
    list.sort((a, b) => (a.item ?? 0) - (b.item ?? 0));
    const seq = list.map((r) => r.answer);
    const n = seq.length;
    if (n < 30) continue;
    const n1 = seq.filter((a) => a === "C").length;
    const n2 = n - n1;
    if (n1 === 0 || n2 === 0) continue;
    let runs = 1;
    for (let i = 1; i < n; i++) {
      if (seq[i] !== seq[i - 1]) runs++;
      else same++;
      pairs++;
    }
    const mu = 1 + (2 * n1 * n2) / n;
    const variance = (2 * n1 * n2 * (2 * n1 * n2 - n)) / (n * n * (n - 1));
    if (variance > 0) zs.push((runs - mu) / Math.sqrt(variance));
  }
  if (zs.length < 2)
    return {
      exams: zs.length,
      pooledZ: 0,
      repeatRate: 0,
      verdict: {
        level: "sem_dados",
        text: "Poucas provas completas para testar a sequência dos gabaritos.",
      },
    };
  const pooled = zs.reduce((a, b) => a + b, 0) / Math.sqrt(zs.length);
  const repeatRate = pairs ? same / pairs : 0;
  const verdict: Verdict =
    Math.abs(pooled) < 1.96
      ? {
          level: "sem_padrao",
          text: `A ordem dos Certo/Errado dentro da prova parece aleatória (${zs.length} provas testadas): saber o gabarito do item anterior não ajuda a prever o próximo.`,
        }
      : {
          level: Math.abs(pooled) >= 2.58 ? "padrao" : "indicio",
          text: `A ordem dos gabaritos ${pooled > 0 ? "alterna mais" : "repete mais"} do que o acaso: ${pct(repeatRate)} dos itens têm o mesmo gabarito do item anterior (o acaso seria 50%), em ${zs.length} provas. O efeito é pequeno e não garante nada sobre a próxima prova; não use como método de chute.`,
        };
  return { exams: zs.length, pooledZ: pooled, repeatRate, verdict };
}

// ------------------------------------------------------------- disciplinas

export interface SubjectShare {
  subject: string;
  share: number; // média das provas
  avgItems: number;
  latestShare: number | null;
  trend: "sobe" | "cai" | "estavel" | null;
  exams: number;
}

export function subjectProfile(rows: BancaQuestion[]): { exams: number; subjects: SubjectShare[] } {
  const exams = new Map<string, Map<string, number>>();
  const years = new Map<string, number>();
  for (const r of rows) {
    const key = examKey(r);
    years.set(key, Math.max(years.get(key) ?? 0, r.year));
    if (!exams.has(key)) exams.set(key, new Map());
    const m = exams.get(key)!;
    m.set(r.subject, (m.get(r.subject) ?? 0) + 1);
  }
  const keys = [...exams.keys()].sort((a, b) => (years.get(a) ?? 0) - (years.get(b) ?? 0));
  const totals = new Map(
    keys.map((k) => [k, [...exams.get(k)!.values()].reduce((a, b) => a + b, 0)]),
  );
  const all = new Set<string>();
  for (const m of exams.values()) for (const s of m.keys()) all.add(s);
  const subjects: SubjectShare[] = [];
  for (const subject of all) {
    const shares = keys.map((k) => (exams.get(k)!.get(subject) ?? 0) / (totals.get(k) || 1));
    const items = keys.map((k) => exams.get(k)!.get(subject) ?? 0);
    const mean = shares.reduce((a, b) => a + b, 0) / keys.length;
    const present = shares.filter((s) => s > 0).length;
    const latest = shares[shares.length - 1] ?? null;
    const earlier = shares.slice(0, -1);
    let trend: SubjectShare["trend"] = null;
    const latestTotal = totals.get(keys[keys.length - 1]!) ?? 0;
    if (earlier.length >= 2 && latest != null && latestTotal >= 30) {
      const prev = earlier.reduce((a, b) => a + b, 0) / earlier.length;
      trend = latest - prev >= 0.03 ? "sobe" : prev - latest >= 0.03 ? "cai" : "estavel";
    }
    subjects.push({
      subject,
      share: mean,
      avgItems: items.reduce((a, b) => a + b, 0) / keys.length,
      latestShare: latest,
      trend,
      exams: present,
    });
  }
  subjects.sort((a, b) => b.share - a.share);
  return { exams: keys.length, subjects };
}

// ----------------------------------------------------------------- temas

export interface Theme {
  label: string;
  exams: number;
  items: number;
}

const themeOf = (topic: string | null) => {
  if (!topic) return null;
  const head = topic.split(/[:–—]/)[0]!.trim();
  return head.length >= 4 ? head : null;
};

/** Temas (rótulo do assunto cobrado) que reaparecem em provas diferentes dentro da disciplina. */
export function recurringThemes(rows: BancaQuestion[], subject: string, min = 2): Theme[] {
  const map = new Map<string, { label: string; exams: Set<string>; items: number }>();
  for (const r of rows) {
    if (r.subject !== subject) continue;
    const label = themeOf(r.topic);
    if (!label) continue;
    const key = norm(label);
    const cur = map.get(key) ?? { label, exams: new Set<string>(), items: 0 };
    cur.exams.add(examKey(r));
    cur.items += 1;
    map.set(key, cur);
  }
  return [...map.values()]
    .filter((t) => t.exams.size >= min)
    .map((t) => ({ label: t.label, exams: t.exams.size, items: t.items }))
    .sort((a, b) => b.exams - a.exams || b.items - a.items)
    .slice(0, 8);
}

// ---------------------------------------------------------------- conjunto

export interface BancaSummary {
  board: string;
  items: number;
  exams: number;
  contests: number;
  firstYear: number;
  lastYear: number;
  confidence: Confidence;
}

export function summarizeBoards(rows: BancaQuestion[]): BancaSummary[] {
  const by = new Map<string, BancaQuestion[]>();
  for (const r of rows) {
    if (!by.has(r.board)) by.set(r.board, []);
    by.get(r.board)!.push(r);
  }
  const out: BancaSummary[] = [];
  for (const [board, list] of by) {
    const deduped = dedupeQuestions(list);
    const exams = new Set(deduped.map(examKey));
    const years = deduped.map((r) => r.year);
    out.push({
      board,
      items: deduped.length,
      exams: exams.size,
      contests: new Set(deduped.map((r) => r.contest)).size,
      firstYear: Math.min(...years),
      lastYear: Math.max(...years),
      confidence: confidence(deduped.length, exams.size),
    });
  }
  return out.sort((a, b) => b.items - a.items);
}

export interface Recommendation {
  title: string;
  text: string;
}

export function recommendations(args: {
  board: string;
  career: string | null;
  answerKinds: ("ce" | "mc")[];
  subjects: SubjectShare[];
  themes: { subject: string; themes: Theme[] }[];
  conf: Confidence;
}): Recommendation[] {
  const out: Recommendation[] = [];
  if (args.conf === "insuficiente")
    return [
      {
        title: "Amostra insuficiente",
        text: "Ainda não há provas suficientes dessa banca na plataforma para recomendar prioridades com segurança. Use o edital do seu concurso como guia principal.",
      },
    ];
  const top = args.subjects.slice(0, 3);
  if (top.length) {
    const cover = top.reduce((a, b) => a + b.share, 0);
    out.push({
      title: "Onde estão os pontos",
      text: `${top.map((s) => `${s.subject} (${pct(s.share)})`).join(", ")} concentram ${pct(cover)} da prova${args.career ? ` de ${args.career}` : ""}, em média. Comece o estudo por aí, sem abandonar o resto do edital.`,
    });
  }
  const rising = args.subjects.filter((s) => s.trend === "sobe").slice(0, 2);
  const falling = args.subjects.filter((s) => s.trend === "cai").slice(0, 2);
  if (rising.length)
    out.push({
      title: "Ganhando espaço na prova mais recente",
      text: `${rising.map((s) => s.subject).join(" e ")} pesaram mais na prova mais recente do que na média das anteriores. Pode ser mudança de linha da banca, mas só uma prova não confirma.`,
    });
  if (falling.length)
    out.push({
      title: "Perdendo espaço",
      text: `${falling.map((s) => s.subject).join(" e ")} pesaram menos na prova mais recente. Não deixe de estudar, mas o retorno por hora pode ser menor.`,
    });
  const strong = args.themes.flatMap((t) =>
    t.themes.filter((x) => x.exams >= 3).map((x) => ({ ...x, subject: t.subject })),
  );
  if (strong.length)
    out.push({
      title: "Temas que a banca repete",
      text: `Apareceram em 3 ou mais provas: ${strong
        .slice(0, 5)
        .map((t) => `${t.label} (${t.subject})`)
        .join("; ")}. Vale dominar esses antes dos temas raros.`,
    });
  if (args.answerKinds.includes("ce"))
    out.push({
      title: "Sobre o gabarito (Certo/Errado)",
      text: "Na prova Certo/Errado, cada erro anula um acerto. Como não há viés de gabarito comprovado, a regra é responder só o que você tem convicção e deixar em branco o que for chute.",
    });
  if (args.answerKinds.includes("mc"))
    out.push({
      title: "Sobre o gabarito",
      text: "Não escolha alternativa pela letra. Elimine as erradas pelo conteúdo; a distribuição das letras não é um atalho confiável.",
    });
  return out;
}
