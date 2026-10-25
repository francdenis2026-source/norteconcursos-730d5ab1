// Nomes de matéria vêm de várias importações e variam ("Raciocínio Lógico" e "Raciocínio
// Lógico-Matemático" são a mesma matéria). Esta função devolve um nome único por matéria e deve
// ser aplicada onde a matéria é lida do banco, para que listas, filtros e gráficos agrupem igual.
const strip = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[-–—:/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const SUBJECT_ALIASES: Record<string, string> = {};
const families: Record<string, string[]> = {
  "Língua Portuguesa": ["Português", "Língua Portuguesa"],
  "Língua Inglesa": ["Inglês", "Língua Inglesa", "Língua Estrangeira - Inglês"],
  "Raciocínio Lógico": [
    "RLM",
    "Raciocínio Lógico",
    "Raciocínio Lógico-Matemático",
    "Raciocínio Lógico Matemático",
    "Raciocínio Lógico (RLM)",
    "Raciocínio Lógico-Matemático (RLM)",
    "Raciocínio Lógico Matemático (RLM)",
    "Raciocínio Lógico-Matemático - RLM",
    "Raciocínio Lógico Matemático - RLM",
    "RLM - Raciocínio Lógico",
    "RLM - Raciocínio Lógico-Matemático",
    "RLM - Raciocínio Lógico Matemático",
    "Matemática e Raciocínio Lógico",
    "Raciocínio Lógico e Matemático",
  ],
  Informática: [
    "Informática",
    "Noções de Informática",
    "Informática Básica",
    "Microsoft Office e Informática",
  ],
  "Direito Penal": ["Direito Penal", "Noções de Direito Penal"],
  "Direito Processual Penal": [
    "Direito Processual Penal",
    "Noções de Direito Processual Penal",
    "Direito de Processo Penal",
    "Processo Penal",
    "Processual Penal",
    "CPP",
    "Noções de Processo Penal",
  ],
  "Direito Constitucional": ["Direito Constitucional", "Noções de Direito Constitucional"],
  "Direito Administrativo": ["Direito Administrativo", "Noções de Direito Administrativo"],
  "Contabilidade Geral": ["Contabilidade", "Contabilidade Geral", "Noções de Contabilidade"],
  Estatística: ["Estatística", "Estatística e Probabilidade", "Noções de Estatística"],
  "Direitos Humanos": ["Direitos Humanos", "Direito Humanos", "Noções de Direitos Humanos"],
  "Medicina Legal": ["Medicina Legal", "Noções de Medicina Legal"],
  Criminalística: ["Criminalística", "Noções de Criminalística"],
  Criminologia: ["Criminologia", "Noções de Criminologia"],
  "Legislação de Trânsito": ["Legislação de Trânsito", "Direito de Trânsito", "CTB"],
  "Legislação Penal Extravagante": [
    "Legislação Penal Extravagante",
    "Legislação Penal Especial",
    "Legislação Extravagante",
    "Legislação de Direito Penal e Processual Penal Especial",
    "Noções de Legislação Penal e Processual Extravagante",
  ],
  "Legislação Específica da PF": [
    "Legislação Específica da PF",
    "Legislação específica da Polícia Federal",
  ],
  "Lei Orgânica da PCMG": [
    "Lei Orgânica da PCMG",
    "Lei Orgânica da Polícia Civil do Estado de Minas Gerais",
  ],
  "Conhecimentos Específicos": ["Conhecimentos Específicos", "Conhecimentos Especificos"],
};
for (const [name, aliases] of Object.entries(families))
  for (const alias of aliases) SUBJECT_ALIASES[strip(alias)] = name;

/** Exact aliases only: combined disciplines, military law and specialist subjects stay distinct. */
const LOWER_CONNECTORS = new Set(["de", "da", "do", "das", "dos", "e", "em", "a", "o"]);
/** Importações antigas às vezes gravaram a disciplina toda em maiúsculas; sem alias conhecido,
 * devolve em formato de título em vez de manter "LEGISLAÇÃO ESPECÍFICA" gritando na tela. */
function titleCasePtBr(text: string): string {
  return text
    .toLocaleLowerCase("pt-BR")
    .split(" ")
    .map((word, i) =>
      i > 0 && LOWER_CONNECTORS.has(word)
        ? word
        : word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1),
    )
    .join(" ");
}

export function canonicalSubject(raw: string | null | undefined): string {
  const text = (raw ?? "").replace(/\s+/g, " ").trim();
  if (!text) return text;
  if (/^https?:\/\//i.test(text)) return "Disciplina não classificada";
  const known = SUBJECT_ALIASES[strip(text)];
  if (known) return known;
  const cleaned = text.replace(/^•\s*Boa prova!\s*/i, "");
  return cleaned === cleaned.toLocaleUpperCase("pt-BR") &&
    cleaned !== cleaned.toLocaleLowerCase("pt-BR")
    ? titleCasePtBr(cleaned)
    : cleaned;
}

/** Match case/accent/spacing variants without merging different articles or narrower subjects. */
export function topicIdentity(raw: string | null | undefined) {
  return strip((raw ?? "").replace(/\s+/g, " ").trim()).replace(/[.。]+$/, "");
}

export function canonicalTopic(raw: string | null | undefined): string | null {
  const text = (raw ?? "").replace(/\s+/g, " ").trim();
  if (!text) return null;
  const aliases: Record<string, string> = {
    "tabela verdade": "Tabela-verdade",
    crase: "Crase",
    pontuacao: "Pontuação",
    "regime de competencia": "Regime de competência",
    "lei maria da penha": "Lei Maria da Penha",
    "inquerito policial": "Inquérito policial",
    "cadeia de custodia": "Cadeia de custódia",
  };
  return aliases[topicIdentity(text)] ?? text;
}

/** Banca em maiúsculas e sem variações ("Cebraspe", "CESPE/CEBRASPE" → "CEBRASPE"). Vazio fica vazio. */
export function canonicalBoard(raw: string | null | undefined): string {
  const b = (raw ?? "").trim().replace(/\s+/g, " ").toUpperCase();
  if (["nao informada", "nao informado", "banca nao informada"].includes(strip(b)))
    return "Não informada";
  return /^CESPE\b|^CEBRASPE\b/.test(b) ? "CEBRASPE" : b;
}

// Igual a canonicalSubject, mas para career_name (cargo). Padrões já identificados no histórico
// de importações, todos reunidos aqui como o mesmo cargo (nunca estados/editais diferentes com
// cargos de fato diferentes — ver nota em exam-panorama.tsx sobre o que NÃO é unificado):
// 1) O nome da INSTITUIÇÃO foi gravado em career_name em vez do nome do cargo (um conserto pontual
//    trocou career_name pelo nome do órgão para bater com outra tela — migration
//    20260927000000_fix_career_name_join_mismatch.sql, para PRF, PC-AC e PP-AC — e uma
//    reimportação posterior trouxe de volta o nome do cargo original, deixando os dois
//    coexistindo).
// 2) O mesmo cargo, do mesmo órgão/estado, foi escrito por extenso de formas diferentes em
//    importações de anos diferentes (ex.: TPAG de Minas Gerais, 2025 e 2026).
// 3) O mesmo cargo (Delegado de Polícia Civil) é nomeado de forma diferente por banca/estado:
//    "Delegado de Polícia" (SC, DF, RO, ES), "Delegado de Polícia Civil" (PI, CE) e "Delegado de
//    Polícia Substituto" (MG, nome do cargo durante o estágio probatório) são o mesmo cargo —
//    confirmado pelo usuário em 2026-10-07. O mesmo padrão vale para "Oficial Investigador" (PI)
//    e "Oficial Investigador de Polícia" (CE).
// A lista cresce conforme outros pares forem encontrados.
// Chaves já passadas por strip() (sem acento, minúsculas) — strip() não remove parênteses.
const CAREER_NAME_ALIASES: Record<string, string> = {
  "policia rodoviaria federal": "Policial Rodoviário Federal",
  "policia civil do acre": "Agente de Polícia Civil",
  "policia penal do acre": "Agente de Polícia Penal",
  "tecnico assistente da policia civil e de atividades governamentais (tpag) auxiliar de pericia":
    "Técnico-Assistente – Auxiliar de Perícia (TPAG)",
  "delegado de policia civil": "Delegado de Polícia",
  "delegado de policia substituto": "Delegado de Polícia",
  "oficial investigador de policia": "Oficial Investigador",
};

export function canonicalCareerName(raw: string | null | undefined): string {
  const text = (raw ?? "").trim();
  if (!text) return text;
  return CAREER_NAME_ALIASES[strip(text)] ?? text;
}
