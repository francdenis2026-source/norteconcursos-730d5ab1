// Localizador de leis: o aluno digita número ("11.343", "lei 11343/2006"), nome ("Maria da Penha"),
// sigla ("LEP", "ECA") ou um tema ("armas", "violência doméstica") e acha a lei de estudo na hora.
// Só organiza o que a biblioteca já publica (LEGAL_LIBRARY); não cria nem altera conteúdo jurídico.
import { LEGAL_LIBRARY, officialLawIdentity } from "./legalLibrary";
import { normalizeLibrarySearch, libraryLawResultTitle } from "./librarySearch";

export type LawKind = "Lei" | "Decreto" | "Decreto-Lei" | "Código" | "Outro";
export interface LawTheme {
  id: string;
  label: string;
}
export const LAW_THEMES: LawTheme[] = [
  { id: "drogas-armas", label: "Drogas e armas" },
  { id: "crime-organizado", label: "Crime organizado e terrorismo" },
  { id: "violencia-protecao", label: "Proteção de pessoas" },
  { id: "prisao-execucao", label: "Prisão, execução e juizados" },
  { id: "investigacao", label: "Investigação e polícia" },
  { id: "identificacao", label: "Identificação civil" },
  { id: "forca-seguranca", label: "Uso da força e segurança" },
  { id: "transito-outros", label: "Trânsito, migração e meio ambiente" },
  { id: "codigos", label: "Códigos" },
];

/** Tema(s) e termos de busca por lei: nomes populares, siglas e assuntos que o aluno costuma digitar. */
const META: Record<string, { themes: string[]; terms: string }> = {
  drogas: {
    themes: ["drogas-armas"],
    terms: "lei de drogas entorpecentes tóxicos tráfico de drogas sisnad antidrogas",
  },
  armas: {
    themes: ["drogas-armas"],
    terms: "estatuto do desarmamento arma de fogo porte posse sinarm",
  },
  quimicos: {
    themes: ["drogas-armas", "investigacao"],
    terms: "produtos químicos controle precursores",
  },
  organizacoes: {
    themes: ["crime-organizado"],
    terms: "orcrim organização criminosa colaboração premiada delação infiltração",
  },
  terrorismo: { themes: ["crime-organizado"], terms: "antiterrorismo terrorista" },
  antifaccao: {
    themes: ["crime-organizado"],
    terms: "antifaccao anti faccao facções raul jungmann",
  },
  lavagem: {
    themes: ["crime-organizado"],
    terms: "lavagem de dinheiro branqueamento ocultação de bens coaf",
  },
  hediondos: {
    themes: ["crime-organizado", "prisao-execucao"],
    terms: "crimes hediondos equiparados",
  },
  interceptacao: {
    themes: ["investigacao"],
    terms: "interceptação telefônica escuta grampo telemática",
  },
  "maria-penha": {
    themes: ["violencia-protecao"],
    terms: "violência doméstica mulher medidas protetivas familiar",
  },
  "henry-borel": {
    themes: ["violencia-protecao"],
    terms: "violência doméstica criança adolescente henry",
  },
  idosa: { themes: ["violencia-protecao"], terms: "estatuto do idoso pessoa idosa" },
  eca: {
    themes: ["violencia-protecao"],
    terms: "eca estatuto da criança e do adolescente menor ato infracional",
  },
  pcd: { themes: ["violencia-protecao"], terms: "pessoa com deficiência inclusão lbi" },
  racismo: {
    themes: ["violencia-protecao"],
    terms: "racismo preconceito discriminação injúria racial",
  },
  "trafico-pessoas": {
    themes: ["violencia-protecao", "crime-organizado"],
    terms: "tráfico de pessoas",
  },
  testemunhas: {
    themes: ["violencia-protecao", "investigacao"],
    terms: "proteção a vítimas e testemunhas provita",
  },
  lep: { themes: ["prisao-execucao"], terms: "lep execução penal presos regime progressão" },
  temporaria: { themes: ["prisao-execucao", "investigacao"], terms: "prisão temporária" },
  tortura: { themes: ["prisao-execucao", "violencia-protecao"], terms: "crime de tortura" },
  juizados: {
    themes: ["prisao-execucao"],
    terms: "juizados especiais jecrim jecc termo circunstanciado menor potencial ofensivo",
  },
  contravencoes: { themes: ["prisao-execucao"], terms: "lcp contravenção penal jogo do bicho" },
  "identificacao-criminal": {
    themes: ["identificacao", "investigacao"],
    terms: "identificação criminal datiloscópica dna",
  },
  delegado: {
    themes: ["investigacao"],
    terms: "delegado de polícia inquérito policial investigação",
  },
  "pf-interestadual": {
    themes: ["investigacao"],
    terms: "polícia federal repercussão interestadual internacional",
  },
  abuso: { themes: ["investigacao", "forca-seguranca"], terms: "abuso de autoridade" },
  budapeste: {
    themes: ["investigacao"],
    terms: "convenção de budapeste crimes cibernéticos cibercrime",
  },
  cin: { themes: ["identificacao"], terms: "cin carteira de identidade nacional" },
  icn: { themes: ["identificacao"], terms: "icn identificação civil nacional" },
  sic: { themes: ["identificacao"], terms: "sic serviço de identificação do cidadão" },
  identidade: { themes: ["identificacao"], terms: "carteira de identidade rg" },
  ric: { themes: ["identificacao"], terms: "ric registro de identidade civil" },
  cpf: { themes: ["identificacao"], terms: "cpf cadastro de pessoas físicas identificador único" },
  "uso-forca": { themes: ["forca-seguranca"], terms: "uso diferenciado da força" },
  "menor-potencial-ofensivo": {
    themes: ["forca-seguranca"],
    terms: "instrumentos de menor potencial ofensivo uso da força armas não letais",
  },
  "seguranca-privada": { themes: ["forca-seguranca"], terms: "segurança privada vigilante" },
  transito: { themes: ["transito-outros"], terms: "ctb código de trânsito brasileiro trânsito" },
  migracao: { themes: ["transito-outros"], terms: "migração estrangeiros imigrante" },
  ambientais: { themes: ["transito-outros"], terms: "crimes ambientais meio ambiente" },
  "pensao-regulamento": { themes: ["transito-outros"], terms: "pensão especial" },
  "codigo-penal": { themes: ["codigos"], terms: "cp código penal decreto-lei 2848" },
  "codigo-processo-penal": {
    themes: ["codigos"],
    terms: "cpp código de processo penal decreto-lei 3689",
  },
};

export interface LawRow {
  slug: string;
  /** Título completo mostrado ao aluno. */
  title: string;
  /** Nome popular da lei (sem o número). */
  nickname: string;
  kind: LawKind;
  /** Número só com dígitos (ex.: "11343"); null quando a lei não tem número no título. */
  number: string | null;
  /** Número formatado (ex.: "11.343/2006"). */
  numberLabel: string | null;
  year: number | null;
  group: string;
  themes: string[];
  sourceUrl: string;
  /** Texto normalizado usado pela busca. */
  haystack: string;
}

const TITLE = /^(Decreto-Lei|Decreto|Lei)\s+([\d.]+)\/(\d{4})\s+—\s+(.+)$/;
const formatNumber = (digits: string) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function lawRowOf(entry: (typeof LEGAL_LIBRARY)[number]): LawRow {
  const meta = META[entry.slug];
  const match = TITLE.exec(entry.title);
  const identity = officialLawIdentity(entry.source_url)?.split(":").pop() ?? null;
  let kind: LawKind = "Outro";
  let number: string | null = null;
  let year: number | null = null;
  let nickname = libraryLawResultTitle(entry.slug).replace(/^[A-Z]+ · /, "");
  if (match) {
    kind = match[1] as LawKind;
    number = match[2]!.replace(/\./g, "");
    year = Number(match[3]);
    nickname = match[4]!;
  } else {
    if (/^C[óo]digo/i.test(entry.title)) kind = "Código";
    number = identity;
    nickname = entry.title.replace(/\s+—\s+leitura.*$/i, "");
    const named = /(\d{4})\s*$/.exec(libraryLawResultTitle(entry.slug));
    year = named ? Number(named[1]) : null;
  }
  if (entry.slug === "codigo-penal") {
    number = "2848";
    year = 1940;
  }
  if (entry.slug === "codigo-processo-penal") {
    number = "3689";
    year = 1941;
  }
  if (entry.slug === "antifaccao") {
    kind = "Lei";
    number = "15358";
    year = 2026;
  }
  const numberLabel = number ? `${formatNumber(number)}${year ? `/${year}` : ""}` : null;
  const themes = meta?.themes ?? [];
  return {
    slug: entry.slug,
    title: libraryLawResultTitle(entry.slug),
    nickname,
    kind,
    number,
    numberLabel,
    year,
    group: entry.group,
    themes,
    sourceUrl: entry.source_url,
    haystack: normalizeLibrarySearch(
      [
        entry.title,
        libraryLawResultTitle(entry.slug),
        kind,
        number,
        year,
        entry.group,
        meta?.terms,
        entry.slug.replace(/-/g, " "),
      ]
        .filter(Boolean)
        .join(" "),
    ),
  };
}
export const LAW_ROWS: LawRow[] = LEGAL_LIBRARY.map(lawRowOf);

const KIND_WORDS: Record<string, LawKind> = {
  lei: "Lei",
  leis: "Lei",
  decreto: "Decreto",
  decretos: "Decreto",
  dl: "Decreto-Lei",
  codigo: "Código",
};
const FILLER = new Set(["de", "da", "do", "das", "dos", "n", "no", "numero", "num", "e", "a", "o"]);

export interface LawHit {
  row: LawRow;
  score: number;
  /** Por que apareceu: "número", "nome" ou "tema". */
  reason: "número" | "nome" | "tema";
}

/**
 * Procura por número (com ou sem pontos, com ou sem ano), nome, sigla ou tema. Todos os termos
 * precisam casar; o número exato vem primeiro, depois o nome, depois o tema. Consulta vazia = nada.
 */
export function searchLaws(query: string, rows: LawRow[] = LAW_ROWS): LawHit[] {
  const tokens = normalizeLibrarySearch(query).split(" ").filter(Boolean);
  if (!tokens.length) return [];
  const hits: LawHit[] = [];
  for (const row of rows) {
    let score = 0;
    let numeric = false;
    let ok = true;
    const words = row.haystack.split(" ");
    const nick = normalizeLibrarySearch(row.nickname);
    for (const token of tokens) {
      if (FILLER.has(token) && tokens.length > 1) continue;
      if (/^\d+$/.test(token)) {
        const isYear = token.length === 4 && Number(token) >= 1900 && Number(token) <= 2100;
        if (row.number && token === row.number) {
          score += 100;
          numeric = true;
        } else if (isYear && row.year === Number(token)) {
          score += 40;
        } else if (row.number && token.length >= 3 && row.number.startsWith(token)) {
          score += 55;
          numeric = true;
        } else if (words.includes(token)) score += 15;
        else ok = false;
      } else if (token in KIND_WORDS) {
        if (row.kind === KIND_WORDS[token]) score += 10;
        else if (!row.haystack.includes(token)) ok = false;
      } else if (token.length <= 3 ? words.includes(token) : row.haystack.includes(token)) {
        score += nick.includes(token) ? 30 : 18;
      } else ok = false;
      if (!ok) break;
    }
    if (ok && score > 0)
      hits.push({
        row,
        score,
        reason: numeric ? "número" : tokens.some((t) => nick.includes(t)) ? "nome" : "tema",
      });
  }
  return hits.sort(
    (a, b) =>
      b.score - a.score ||
      (b.row.year ?? 0) - (a.row.year ?? 0) ||
      a.row.title.localeCompare(b.row.title, "pt-BR"),
  );
}

export type LawSort = "relevancia" | "az" | "numero" | "recentes" | "antigas";
export function sortLaws(rows: LawRow[], mode: LawSort): LawRow[] {
  const copy = [...rows];
  if (mode === "az") return copy.sort((a, b) => a.nickname.localeCompare(b.nickname, "pt-BR"));
  if (mode === "numero")
    return copy.sort(
      (a, b) =>
        Number(a.number ?? Infinity) - Number(b.number ?? Infinity) ||
        (a.year ?? 0) - (b.year ?? 0),
    );
  if (mode === "recentes") return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  if (mode === "antigas") return copy.sort((a, b) => (a.year ?? Infinity) - (b.year ?? Infinity));
  return copy;
}
export const lawsByTheme = (rows: LawRow[], theme: string) =>
  theme === "all" ? rows : rows.filter((row) => row.themes.includes(theme));
