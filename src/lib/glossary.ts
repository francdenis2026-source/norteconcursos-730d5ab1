import generated from "@/data/glossary.generated.json";
import { CURATED_GLOSSARY } from "@/data/glossaryCurated";
import { EDITAL_GLOSSARY } from "@/data/glossaryEdital";

export type GlossaryEntry = {
  term: string;
  meaning: string;
  synonyms?: string[];
  example?: string;
  area?: string;
  laws?: string[];
};

/** Palavras comuns demais para sublinhar sozinhas no texto: continuam no dicionário e na busca. */
const NO_AUTO = new Set(["parada", "guarda", "ativo", "passivo", "publicidade", "competencia", "eficiencia", "tutela", "predicado", "regencia", "coesao", "coerencia", "denotacao", "conotacao", "culpa", "dolo", "moralidade", "legalidade", "representacao", "estacionamento", "liquidacao", "empenho", "backup"]);

/** Sem acento, minúsculas; mantém o mesmo comprimento do original (um caractere por caractere). */
export const normalize = (s: string) =>
  [...s].map((c) => c.normalize("NFD")[0]!.toLowerCase()).join("");

const isLetter = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c);

function buildEntries(): GlossaryEntry[] {
  const byKey = new Map<string, GlossaryEntry>();
  for (const e of generated as GlossaryEntry[]) byKey.set(normalize(e.term), e);
  for (const e of [...CURATED_GLOSSARY, ...EDITAL_GLOSSARY]) byKey.set(normalize(e.term), { ...byKey.get(normalize(e.term)), ...e });
  return [...byKey.values()].sort((a, b) => normalize(a.term).localeCompare(normalize(b.term), "pt-BR"));
}

export const GLOSSARY: GlossaryEntry[] = buildEntries();

type Index = { byKey: Map<string, GlossaryEntry>; keys: string[] };
let cached: Index | null = null;
function index(): Index {
  if (cached) return cached;
  const byKey = new Map<string, GlossaryEntry>();
  for (const e of GLOSSARY) {
    for (const t of [e.term, ...(e.synonyms ?? [])]) {
      const k = normalize(t);
      if (k.length >= 3 && !NO_AUTO.has(k) && !byKey.has(k)) byKey.set(k, e);
    }
  }
  cached = { byKey, keys: [...byKey.keys()].sort((a, b) => b.length - a.length) };
  return cached;
}

export type GlossarySegment = { text: string; entry?: GlossaryEntry };

/** Divide o texto em trechos; marca só a primeira ocorrência de cada verbete (evita poluir a leitura). */
export function annotate(text: string): GlossarySegment[] {
  const { byKey, keys } = index();
  const norm = normalize(text);
  const out: GlossarySegment[] = [];
  const seen = new Set<GlossaryEntry>();
  let last = 0;
  let i = 0;
  while (i < norm.length) {
    if (isLetter(norm[i - 1]) || !isLetter(norm[i])) { i++; continue; }
    const key = keys.find((k) => norm.startsWith(k, i) && !isLetter(norm[i + k.length]));
    const entry = key ? byKey.get(key) : undefined;
    if (key && entry && !seen.has(entry)) {
      if (i > last) out.push({ text: text.slice(last, i) });
      out.push({ text: text.slice(i, i + key.length), entry });
      seen.add(entry);
      i += key.length;
      last = i;
    } else {
      while (isLetter(norm[i])) i++;
    }
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out.length ? out : [{ text }];
}

export function searchGlossary(query: string, area?: string): GlossaryEntry[] {
  const q = normalize(query.trim());
  return GLOSSARY.filter((e) => (!area || e.area === area) && (!q || normalize(`${e.term} ${(e.synonyms ?? []).join(" ")} ${e.meaning}`).includes(q)));
}
