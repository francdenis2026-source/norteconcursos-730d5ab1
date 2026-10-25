// Nome de cada lei citada pelo número ("Lei n.º 11.340/2006" -> "Lei Maria da Penha").
//
// Só identifica a norma; não afirma que o texto está vigente nem substitui a conferência no Planalto
// (CONTENT_GOVERNANCE.md). Normas desconhecidas ficam sem dica: nunca se adivinha um nome.
import { LEGAL_LIBRARY } from "./legalLibrary";

export type LawKind = "lei" | "lc" | "dl" | "decreto";
export interface LawName {
  kind: LawKind;
  number: string;
  year: number;
  /** Nome pelo qual a norma é conhecida. */
  name: string;
  /** Planalto, quando a biblioteca da plataforma tem a norma. */
  sourceUrl?: string;
}

const LABEL: Record<LawKind, string> = {
  lei: "Lei",
  lc: "Lei Complementar",
  dl: "Decreto-Lei",
  decreto: "Decreto",
};

// Nomes consagrados de normas federais frequentes em provas de carreiras policiais e jurídicas.
const KNOWN: [LawKind, string, number, string][] = [
  ["lei", "11340", 2006, "Lei Maria da Penha"],
  ["lei", "11343", 2006, "Lei de Drogas"],
  ["lei", "8069", 1990, "Estatuto da Criança e do Adolescente (ECA)"],
  ["lei", "8078", 1990, "Código de Defesa do Consumidor"],
  ["lei", "13869", 2019, "Lei de Abuso de Autoridade"],
  ["lei", "8429", 1992, "Lei de Improbidade Administrativa"],
  ["lei", "8112", 1990, "Regime Jurídico dos Servidores Públicos Civis da União"],
  ["lei", "9784", 1999, "Lei do Processo Administrativo Federal"],
  ["lei", "14133", 2021, "Lei de Licitações e Contratos Administrativos"],
  ["lei", "13709", 2018, "Lei Geral de Proteção de Dados Pessoais (LGPD)"],
  ["lei", "12965", 2014, "Marco Civil da Internet"],
  ["lei", "8072", 1990, "Lei dos Crimes Hediondos"],
  ["lei", "9455", 1997, "Lei de Tortura"],
  ["lei", "9099", 1995, "Lei dos Juizados Especiais Cíveis e Criminais"],
  ["lei", "13146", 2015, "Estatuto da Pessoa com Deficiência"],
  ["lei", "12737", 2012, "Lei Carolina Dieckmann (delitos informáticos)"],
  ["lei", "9296", 1996, "Lei de Interceptação Telefônica"],
  ["lei", "7716", 1989, "Lei dos Crimes de Preconceito de Raça ou de Cor"],
  ["lei", "12016", 2009, "Lei do Mandado de Segurança"],
  ["lei", "9503", 1997, "Código de Trânsito Brasileiro (CTB)"],
  ["lei", "13445", 2017, "Lei de Migração"],
  ["lei", "12830", 2013, "Lei da Investigação Criminal pelo Delegado de Polícia"],
  ["lei", "13964", 2019, "Pacote Anticrime"],
  ["lei", "9605", 1998, "Lei de Crimes Ambientais"],
  ["lei", "9613", 1998, "Lei de Lavagem de Dinheiro"],
  ["lei", "7492", 1986, "Lei dos Crimes contra o Sistema Financeiro Nacional"],
  ["lei", "8906", 1994, "Estatuto da Advocacia e da OAB"],
  ["lei", "12318", 2010, "Lei de Alienação Parental"],
  ["lei", "14344", 2022, "Lei Henry Borel"],
  ["lc", "75", 1993, "Lei Orgânica do Ministério Público da União"],
  ["dl", "2848", 1940, "Código Penal"],
  ["dl", "3689", 1941, "Código de Processo Penal"],
];

const table = new Map<string, LawName>();
const key = (kind: LawKind, number: string) => `${kind}:${number.replace(/\./g, "")}`;
const put = (law: LawName) => {
  const k = key(law.kind, law.number);
  const current = table.get(k);
  table.set(k, { ...current, ...law });
};
for (const [kind, number, year, name] of KNOWN) put({ kind, number, year, name });
// A biblioteca da plataforma já traz o nome e o link oficial das normas que cobre.
for (const entry of LEGAL_LIBRARY) {
  const m = /^(Decreto-Lei|Lei Complementar|Lei|Decreto)\s+([\d.]+)\/(\d{4})\s+—\s+(.+)$/.exec(
    entry.title,
  );
  if (!m) continue;
  const kind: LawKind =
    m[1] === "Decreto-Lei"
      ? "dl"
      : m[1] === "Lei Complementar"
        ? "lc"
        : m[1] === "Decreto"
          ? "decreto"
          : "lei";
  put({
    kind,
    number: m[2]!.replace(/\./g, ""),
    year: Number(m[3]),
    name: m[4]!.trim(),
    sourceUrl: entry.source_url,
  });
}

export const formatLawNumber = (number: string) =>
  number.length > 3 ? number.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : number;
export const lawTitle = (law: LawName) =>
  `${LABEL[law.kind]} nº ${formatLawNumber(law.number)}/${law.year}`;

const MENTION =
  /\b(Lei\s+Complementar|Lei\s+Federal|Lei|Decreto-Lei|Decreto)\s*(?:n\s*\.?\s*[º°o]?\s*\.?\s*)?(\d{1,3}(?:\.\d{3})?|\d{2,5})(?:\s*\/\s*(\d{4})|,\s*de\s+\d{1,2}\s*[º°o]?\s+de\s+[a-zç]+\s+de\s+(\d{4}))?(?![\d])/gi;

export type LawPart = { text: string; law?: LawName };

/**
 * Quebra o texto em pedaços; os que citam uma lei conhecida trazem o nome. Se o ano citado
 * não bate com o da norma cadastrada com aquele número, não há dica (podem ser normas diferentes).
 */
export function splitLawMentions(text: string): LawPart[] {
  const parts: LawPart[] = [];
  let last = 0;
  for (const m of text.matchAll(MENTION)) {
    const word = m[1]!.toLowerCase().replace(/\s+/g, " ");
    const kind: LawKind = word.startsWith("lei complementar")
      ? "lc"
      : word === "decreto-lei"
        ? "dl"
        : word === "decreto"
          ? "decreto"
          : "lei";
    const law = table.get(key(kind, m[2]!));
    const year = m[3] ?? m[4];
    const yearOk = year ? Number(year) === law?.year : kind === "lei" || kind === "lc";
    if (!law || !yearOk) continue;
    const start = m.index!;
    if (start > last) parts.push({ text: text.slice(last, start) });
    parts.push({ text: m[0], law });
    last = start + m[0].length;
  }
  if (!parts.length) return [{ text }];
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
