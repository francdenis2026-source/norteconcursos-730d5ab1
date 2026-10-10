// Tipos e helpers de formatação de questão compartilhados entre o Treinador
// de Questões (área logada, /dashboard/question-trainer) e o Desafio Diário
// público (visitante sem cadastro, /desafio-diario) — extraídos pra um só
// lugar pra não duplicar a lógica de parsing entre as duas páginas.

export type Answer = "A" | "B" | "C" | "D" | "E";
export type Source = "official" | "curated" | "personal";
// Tabela física de origem. "source" agrupa official_exam_questions e
// board_exam_questions sob "official" pro Treinador; quando uma ação precisa
// saber a tabela exata (corrigir a questão na fonte, por exemplo), use "table".
export type QuestionTable =
  "official_exam_questions" | "curated_question_catalog" | "question_bank" | "board_exam_questions";
export type Difficulty = "fácil" | "média" | "difícil";
export type LegalBasis = { title?: string; lei?: string; artigo?: string; url?: string };
export type Question = {
  id: string;
  source: Source;
  table?: QuestionTable;
  contest: string;
  year: string;
  career: string;
  board: string;
  subject: string;
  subtopic: string | null;
  text: string;
  answer: Answer;
  explanation: string;
  legalBasis: LegalBasis[];
  checkedAt: string | null;
  difficulty: Difficulty;
  state: string;
  category: string;
  kind?: "true_false" | "multiple_choice";
};

export const normalizeDifficulty = (value: unknown): Difficulty => {
  const text = String(value ?? "").toLowerCase();
  if (text.startsWith("fác") || text.startsWith("fac")) return "fácil";
  if (text.startsWith("dif")) return "difícil";
  return "média";
};
export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  fácil: "Fácil",
  média: "Média",
  difícil: "Difícil",
};
export const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  fácil:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300",
  média:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-300",
  difícil:
    "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300",
};

export const parseBasis = (value: unknown): LegalBasis[] =>
  Array.isArray(value)
    ? value.filter((item): item is LegalBasis => Boolean(item) && typeof item === "object")
    : [];
// O Planalto marca cada artigo com uma âncora "#artN" (ex.: <a name="art205">
// antes de "Art. 205."), então quando sabemos o artigo dá pra pular a busca
// manual e abrir a página já rolada direto no trecho certo.
export const basisHref = (basis: LegalBasis) => {
  if (!basis.url) return undefined;
  if (!basis.artigo || basis.url.includes("#")) return basis.url;
  const artigoAnchor = basis.artigo.replace(/[^0-9A-Za-z-]/g, "");
  return artigoAnchor ? `${basis.url}#art${artigoAnchor}` : basis.url;
};
// Fontes oficiais aceitas para legislação e jurisprudência (CONTENT_GOVERNANCE.md).
// Tratados e instrumentos internacionais sem decreto de internalização no
// Planalto (ex.: Declaração Universal dos Direitos Humanos, resoluções da
// Assembleia Geral da ONU) são verificados diretamente nas fontes primárias
// dos organismos que os custodiam.
const OFFICIAL_SOURCE =
  /(^|\.)(planalto\.gov\.br|stf\.jus\.br|stj\.jus\.br|tst\.jus\.br|tse\.jus\.br|ohchr\.org|unodc\.org|un\.org)(\/|$)/i;
export const isOfficialUrl = (url?: string) => {
  try {
    return Boolean(url) && OFFICIAL_SOURCE.test(new URL(String(url)).hostname + "/");
  } catch {
    return false;
  }
};
// Questão com base legal só entra no treino se a vigência foi conferida na fonte oficial
// (data registrada + link oficial). Assim nenhuma resposta desatualizada é exibida.
export const isLegalSubject = (subject: string) => /direito|legisla/i.test(subject);
export const isLegallyVerified = (basis: LegalBasis[], checkedAt: unknown, required = false) => {
  if (!basis.length) return !required;
  const date = typeof checkedAt === "string" ? Date.parse(checkedAt) : NaN;
  return (
    Number.isFinite(date) &&
    date <= Date.now() &&
    basis.every((item) => isOfficialUrl(item.url) && /^https?:\/\//i.test(item.url ?? ""))
  );
};
export const isEligibleQuestion = (row: Record<string, unknown>) =>
  row["content_status"] === "active" &&
  row["official_answer"] !== "X" &&
  !row["context_review_required"] &&
  !(row["legal_review_required"] && !row["legal_audit_completed"]) &&
  isLegallyVerified(
    parseBasis(row["legal_basis"]),
    row["law_version_checked_at"],
    isLegalSubject(String(row["subject"] ?? "")),
  );
// Explicações podem trazer um trecho "Exemplo: …" — mostramos separado, em destaque.
export function splitExplanation(text: string) {
  const match = text.match(/\n?\s*Exemplo(?: pr[aá]tico)?:\s*([\s\S]*)$/i);
  if (!match || match.index === undefined) return { main: text.trim(), example: "" };
  return { main: text.slice(0, match.index).trim(), example: (match[1] ?? "").trim() };
}
export const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("pt-BR") : "";
// Alguns itens ainda em fase de importação têm review_note preenchido só com
// metadado de auditoria ("Importado do caderno oficial...", "aguardando
// revisão de conteúdo...") em vez de uma explicação de verdade escrita pra
// quem está estudando. Não é uma explicação — não deve aparecer como se fosse.
const PLACEHOLDER_NOTE =
  /aguardando revis[ãa]o de conte[úu]do|transcri[çc][ãa]o verbatim|importado do caderno oficial/i;
export const isPlaceholderExplanation = (text: string) => PLACEHOLDER_NOTE.test(text);
// "Revisada" = já tem explicação didática com exemplo do dia a dia (bloco "Exemplo:")
// E, se depender de lei/súmula, essa fonte já foi conferida vigente no Planalto (checkedAt
// preenchido) — a mesma checagem que o treinador já faz pra decidir o que entra no treino.
export const hasReviewedExplanation = (question: Question) =>
  /Exemplo(?: pr[aá]tico)?:/i.test(question.explanation) &&
  isLegallyVerified(question.legalBasis, question.checkedAt, isLegalSubject(question.subject));
export const questionAnswers = (question: Question): Answer[] => {
  const options = parseQuestion(question.text).options;
  if (options.length) return options.map((option) => option.letter);
  if (
    question.kind === "true_false" ||
    (question.kind !== "multiple_choice" &&
      (question.source === "curated" ||
        /julgue|certo ou errado|CEBRASPE|CESPE/i.test(question.text + " " + question.board)))
  )
    return ["C", "E"];
  return boardAnswers(question.board);
};
export const questionAnswerLabel = (answer: Answer, question: Question) =>
  questionAnswers(question).join("") === "CE"
    ? answer === "C"
      ? "Certo"
      : "Errado"
    : `Alternativa ${answer}`;
export const boardAnswers = (board: string): Answer[] =>
  /CEBRASPE|CESPE/i.test(board)
    ? ["C", "E"]
    : /IBFC/i.test(board)
      ? ["A", "B", "C", "D"]
      : ["A", "B", "C", "D", "E"];
export const answerLabel = (answer: Answer, board: string) =>
  /CEBRASPE|CESPE/i.test(board) ? (answer === "C" ? "Certo" : "Errado") : `Alternativa ${answer}`;
export const examKey = (question: Question) =>
  [question.contest, question.career, question.board, question.year].join("::");
export function shuffled<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex]!, result[index]!];
  }
  return result;
}

export type ParsedQuestion = {
  baseLabel: string;
  base: string;
  stem: string;
  options: { letter: Answer; text: string }[];
};

// question_text guarda tudo num campo só: "Texto-base:\n…\n\n<enunciado>\n(A) …\n(B) …" (ou
// "Comando:\n…\n\nItem: …" nos itens Certo/Errado). Separamos texto de apoio, enunciado e alternativas.
export function parseQuestion(raw: string): ParsedQuestion {
  let text = raw.replace(/\r/g, "").trim();
  let base = "";
  let baseLabel = "Texto de apoio";
  const head = text.match(/^(Texto-base|Comando):\n([\s\S]*?)\n\n(?=\S)/);
  if (head) {
    baseLabel = head[1] === "Comando" ? "Comando da questão" : "Texto de apoio";
    base = (head[2] ?? "").trim();
    text = text.slice(head[0].length).trim();
  }
  text = text.replace(/^Item:\s*/, "");

  const lines = text.split("\n");
  const firstOption = lines.findIndex((line) => /^\s*\(A\)\s?/.test(line));
  if (firstOption >= 0 && !/\([B-E]\)/.test(lines[firstOption] ?? "")) {
    const options: { letter: Answer; text: string }[] = [];
    for (const line of lines.slice(firstOption)) {
      const match = line.match(/^\s*\(([A-E])\)\s?(.*)$/);
      const last = options[options.length - 1];
      if (match)
        options.push({ letter: (match[1] ?? "A") as Answer, text: (match[2] ?? "").trim() });
      else if (last) last.text += ` ${line.trim()}`;
    }
    return { baseLabel, base, stem: lines.slice(0, firstOption).join("\n").trim(), options };
  }

  // Formato antigo: alternativas na mesma linha ("… A) texto; B) texto; C) …").
  const matches = [...text.matchAll(/(?:^|[\s:;.])(\(?([A-E])\))\s+/g)];
  const marks: number[] = [];
  const ends: number[] = [];
  for (const match of matches) {
    if (match[2] !== "ABCDE"[marks.length]) continue;
    marks.push(match.index + match[0].indexOf(match[1]!));
    ends.push(match.index + match[0].length);
  }
  if (marks.length >= 4) {
    const options = marks.map((start, i) => ({
      letter: "ABCDE".charAt(i) as Answer,
      text: text
        .slice(ends[i], marks[i + 1] ?? text.length)
        .replace(/[;\s]+$/, "")
        .trim(),
    }));
    return { baseLabel, base, stem: text.slice(0, marks[0] ?? 0).trim(), options };
  }
  return { baseLabel, base, stem: text, options: [] };
}
