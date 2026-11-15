// Nota de uma tentativa de prova/simulado, separada do aproveitamento de estudo
// e da pontuação do ranking.
//
// Nota da prova  -> depende da regra da edição (aqui).
// Aproveitamento -> acertos sobre o total / sobre as respondidas (estudo).
// Ranking        -> calculado no servidor, só com a 1ª resposta de cada questão.
//
// Nenhuma regra é presumida por banca: o desconto "um erro anula um acerto" só
// é aplicado quando a edição tem essa regra registrada em contest_reference_info.
// Qualquer outra situação usa pontuação simples e diz isso ao aluno.
import { questionCareerLabel, questionContestLabel } from "./questionFilterIdentity";

export type ScoringRuleId = "net_one_to_one" | "simple" | "pcac_2026_weighted";

export interface ScoringRule {
  id: ScoringRuleId;
  /** true quando a regra vem de registro da edição; false quando é a pontuação padrão da plataforma. */
  verified: boolean;
  label: string;
  description: string;
}

export const SIMPLE_RULE: ScoringRule = {
  id: "simple",
  verified: false,
  label: "Pontuação simples",
  description:
    "1 ponto por acerto, sem desconto por erro. A regra oficial desta prova não está registrada na plataforma, por isso nada foi descontado.",
};

export const NET_RULE: ScoringRule = {
  id: "net_one_to_one",
  verified: true,
  label: "Nota líquida (um erro anula um acerto)",
  description:
    "Regra registrada para esta edição: cada acerto vale +1, cada erro vale −1 e questões em branco valem 0.",
};

export const PCAC_WEIGHTED_RULE: ScoringRule = {
  id: "pcac_2026_weighted",
  verified: true,
  label: "Pontuação ponderada — PC-AC 2026",
  description:
    "Regra do edital: conhecimentos básicos e jurídicos valem 1 ponto por acerto; conhecimentos específicos valem 2 pontos. A prova integral soma até 160 pontos, sem desconto por erro. Os critérios mínimos de aprovação só são avaliados quando a tentativa reproduz a distribuição oficial completa.",
};

export function scoringRuleFromId(id: unknown): ScoringRule {
  if (id === "net_one_to_one") return NET_RULE;
  if (id === "pcac_2026_weighted") return PCAC_WEIGHTED_RULE;
  return SIMPLE_RULE;
}

export interface ReferenceRuleRow {
  contest_name: string;
  contest_year: string | number;
  exam_board?: string | null;
  scoring_rule?: string | null;
}

export interface PaperIdentity {
  contest: string;
  career: string;
  board: string;
  year: number | string;
}

const fold = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

/** Só reconhece regras de correção explicitamente registradas para a edição; o resto fica não verificado. */
export function ruleFromRegistry(text: string | null | undefined): ScoringRule | null {
  if (!text) return null;
  const normalized = fold(text);
  if (
    /conhecimentos basicos\s*24\s*[×x]\s*peso\s*1/.test(normalized) &&
    /conhecimentos juridicos\s*16\s*[×x]\s*peso\s*1/.test(normalized) &&
    /conhecimentos especificos\s*60\s*[×x]\s*peso\s*2/.test(normalized) &&
    /maximo\s*160/.test(normalized)
  )
    return PCAC_WEIGHTED_RULE;
  return /nota\s+l[ií]quida/i.test(text) && /corretas?\s*-\s*erradas?/i.test(text)
    ? NET_RULE
    : null;
}

/**
 * Regra de uma prova específica. Só aplica pontuação especial quando a edição (concurso/cargo + ano + banca/estilo)
 * consta no registro; qualquer dúvida cai na pontuação simples.
 */
export function resolveScoringRule(
  paper: PaperIdentity | null,
  registry: readonly ReferenceRuleRow[],
): ScoringRule {
  if (!paper) return SIMPLE_RULE;
  const career = fold(questionCareerLabel(paper.career, paper.contest, paper.year));
  const contest = fold(questionContestLabel(paper.contest));
  const names = new Set([career, contest]);
  const board = fold(paper.board);
  const pcacAuthorialAlias =
    String(paper.year) === "2026" &&
    /pc-?ac|policia civil do acre/.test(contest) &&
    /oficial investigador/.test(career);
  const matches = registry.filter((row) => {
    if (String(row.contest_year) !== String(paper.year)) return false;
    const rowName = fold(questionContestLabel(row.contest_name));
    const directMatch = names.has(rowName);
    const fullContestAndCareerMatch =
      Boolean(contest && career) && rowName.includes(contest) && rowName.includes(career);
    const pcacAliasMatch = pcacAuthorialAlias && rowName.includes("policia civil do acre");
    const contestMatches = directMatch || fullContestAndCareerMatch || pcacAliasMatch;
    const boardMatches =
      !row.exam_board ||
      !board ||
      board === "all" ||
      fold(row.exam_board) === board ||
      (pcacAuthorialAlias && board === "autoral" && fold(row.exam_board) === "idecan");
    return contestMatches && boardMatches;
  });
  // Registros divergentes para a mesma edição: não escolhe um por conta própria.
  const rules = new Set(matches.map((row) => ruleFromRegistry(row.scoring_rule)?.id ?? "none"));
  if (rules.size !== 1) return SIMPLE_RULE;
  return ruleFromRegistry(matches[0]!.scoring_rule) ?? SIMPLE_RULE;
}

export interface AttemptCounts {
  total: number;
  correct: number;
  wrong: number;
  blank: number;
  /** Needed only by weighted editions; preserves each question's subject and result. */
  items?: { subject: string; correct: boolean }[];
}

export interface ApprovalCheck {
  evaluated: boolean;
  approved: boolean | null;
  reasons: string[];
}

export interface AttemptScore {
  rule: ScoringRule;
  answered: number;
  /** Nota conforme a regra (pode ser negativa na regra com desconto). */
  score: number;
  maxScore: number;
  /** Acertos / total de questões da tentativa (inteiro, 0–100). */
  accuracyOfTotal: number;
  /** Acertos / respondidas (inteiro, 0–100); 0 sem respostas. */
  accuracyOfAnswered: number;
  /** Respondidas / total (inteiro, 0–100). */
  completion: number;
  /** Critérios eliminatórios do edital, avaliados apenas na distribuição oficial completa. */
  approval?: ApprovalCheck;
}

const BASIC_SUBJECTS = new Set(
  [
    "Língua Portuguesa",
    "Raciocínio Lógico",
    "Raciocínio Lógico-Matemático",
    "Noções de Informática",
    "Informática",
    "Realidade do Estado do Acre",
    "Realidade étnica, social, geográfica, cultural, política e econômica do Estado do Acre",
  ].map(fold),
);
const LEGAL_SUBJECTS = new Set(
  [
    "Noções de Direito Constitucional",
    "Direito Constitucional",
    "Noções de Direito Administrativo",
    "Direito Administrativo",
    "Noções de Direito Penal e Processual Penal",
    "Direito Penal e Processual Penal",
    "Direito Penal",
    "Direito Processual Penal",
    "Legislação Penal e Processual Penal Especial",
    "Legislação Institucional",
  ].map(fold),
);

/** No edital PC-AC 2026, básicos/jurídicos valem 1 e os demais tópicos específicos valem 2. */
export function pcacWeightForSubject(subject: string): number {
  const normalized = fold(subject);
  return BASIC_SUBJECTS.has(normalized) || LEGAL_SUBJECTS.has(normalized) ? 1 : 2;
}

type PcacSubjectGroup =
  | "basic_portuguese"
  | "basic_logic"
  | "basic_it"
  | "basic_acre"
  | "legal_constitutional"
  | "legal_administrative"
  | "legal_penal"
  | "legal_institutional"
  | "specific";

function pcacSubjectGroup(subject: string): PcacSubjectGroup {
  const normalized = fold(subject);
  if (normalized === fold("Língua Portuguesa")) return "basic_portuguese";
  if (["raciocinio logico", "raciocinio logico-matematico"].includes(normalized))
    return "basic_logic";
  if (["nocoes de informatica", "informatica"].includes(normalized)) return "basic_it";
  if (
    normalized === fold("Realidade do Estado do Acre") ||
    normalized ===
      fold("Realidade étnica, social, geográfica, cultural, política e econômica do Estado do Acre")
  )
    return "basic_acre";
  if (["nocoes de direito constitucional", "direito constitucional"].includes(normalized))
    return "legal_constitutional";
  if (["nocoes de direito administrativo", "direito administrativo"].includes(normalized))
    return "legal_administrative";
  if (
    [
      "nocoes de direito penal e processual penal",
      "direito penal e processual penal",
      "direito penal",
      "direito processual penal",
    ].includes(normalized)
  )
    return "legal_penal";
  if (normalized === fold("Legislação Institucional")) return "legal_institutional";
  return "specific";
}

function evaluatePcacApproval(
  items: { subject: string; correct: boolean }[],
  score: number,
): ApprovalCheck {
  const expected: Record<PcacSubjectGroup, number> = {
    basic_portuguese: 6,
    basic_logic: 6,
    basic_it: 8,
    basic_acre: 4,
    legal_constitutional: 3,
    legal_administrative: 3,
    legal_penal: 6,
    legal_institutional: 4,
    specific: 60,
  };
  const counts = new Map<PcacSubjectGroup, { total: number; correct: number }>();
  for (const item of items) {
    const group = pcacSubjectGroup(item.subject);
    const current = counts.get(group) ?? { total: 0, correct: 0 };
    current.total += 1;
    if (item.correct) current.correct += 1;
    counts.set(group, current);
  }
  const distributionMatches =
    items.length === 100 &&
    (Object.entries(expected) as [PcacSubjectGroup, number][]).every(
      ([group, total]) => (counts.get(group)?.total ?? 0) === total,
    );
  if (!distributionMatches)
    return {
      evaluated: false,
      approved: null,
      reasons: ["A amostra não reproduz a distribuição oficial de 100 questões do edital."],
    };

  const reasons: string[] = [];
  if (score < 80) reasons.push("Pontuação total inferior a 80/160 (mínimo de 50%).");
  const minimums: [PcacSubjectGroup, string][] = [
    ["basic_portuguese", "Língua Portuguesa"],
    ["basic_logic", "Raciocínio Lógico"],
    ["basic_it", "Noções de Informática"],
    ["basic_acre", "Realidade do Estado do Acre"],
    ["legal_constitutional", "Noções de Direito Constitucional"],
    ["legal_administrative", "Noções de Direito Administrativo"],
    ["legal_penal", "Noções de Direito Penal e Processual Penal"],
    ["legal_institutional", "Legislação Institucional"],
  ];
  for (const [group, label] of minimums) {
    if ((counts.get(group)?.correct ?? 0) < 1)
      reasons.push(`Mínimo de 1 ponto não atingido em ${label}.`);
  }
  if ((counts.get("specific")?.correct ?? 0) * 2 < 2)
    reasons.push("Mínimo de 2 pontos não atingido em Conhecimentos Específicos.");
  return { evaluated: true, approved: reasons.length === 0, reasons };
}

export function scoreAttempt(counts: AttemptCounts, rule: ScoringRule = SIMPLE_RULE): AttemptScore {
  const total = Math.max(0, counts.total);
  const answered = counts.correct + counts.wrong;
  const weightedItems = counts.items ?? [];
  // A weighted score is never guessed from aggregate counts: without the item subjects,
  // fall back explicitly to the standard rule rather than display a misleading weighted note.
  const appliedRule =
    rule.id === "pcac_2026_weighted" && weightedItems.length !== total ? SIMPLE_RULE : rule;
  const weightedMax =
    appliedRule.id === "pcac_2026_weighted"
      ? weightedItems.reduce((sum, item) => sum + pcacWeightForSubject(item.subject), 0)
      : total;
  const score =
    appliedRule.id === "net_one_to_one"
      ? counts.correct - counts.wrong
      : appliedRule.id === "pcac_2026_weighted"
        ? weightedItems.reduce(
            (sum, item) => sum + (item.correct ? pcacWeightForSubject(item.subject) : 0),
            0,
          )
        : counts.correct;
  return {
    rule: appliedRule,
    answered,
    score,
    maxScore: weightedMax,
    accuracyOfTotal: total ? Math.round((counts.correct / total) * 100) : 0,
    accuracyOfAnswered: answered ? Math.round((counts.correct / answered) * 100) : 0,
    completion: total ? Math.round((answered / total) * 100) : 0,
    ...(appliedRule.id === "pcac_2026_weighted"
      ? { approval: evaluatePcacApproval(weightedItems, score) }
      : {}),
  };
}

/** "56,00" no padrão brasileiro. */
export function formatScore(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
