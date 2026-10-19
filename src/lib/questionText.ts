/**
 * Formatação dos textos das questões. Os textos de apoio vêm de PDFs transcritos: quebras de linha na largura da
 * coluna, recuo e, nas provas do Cebraspe, numeração de linhas a cada 3 linhas ("1 A polícia…", "4 conhecimentos…").
 * Aqui separamos a numeração do texto, reorganizamos os parágrafos para leitura e detectamos questões que dependem
 * de um texto que não está cadastrado.
 */

export type SupportLine = { n: number | null; text: string };

const GUTTER = /^\s*(\d{1,3})\s{1,3}(\S.*)$/;

/** Separa a numeração de linhas do texto, quando ela existe (números crescentes em várias linhas). */
export function parseSupportLines(raw: string): { lines: SupportLine[]; numbered: boolean } {
  const rows = raw
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => l.trim() !== "");
  const parsed = rows.map((r): SupportLine => {
    const m = GUTTER.exec(r);
    return m ? { n: Number(m[1]), text: m[2]!.trim() } : { n: null, text: r.trim() };
  });
  const nums = parsed.filter((l) => l.n !== null).map((l) => l.n!);
  let increasing = 0;
  for (let i = 1; i < nums.length; i++) if (nums[i]! > nums[i - 1]!) increasing++;
  // texto numerado: pelo menos 3 linhas numeradas em ordem crescente (a numeração não pode ser parte de uma lista comum)
  const numbered =
    nums.length >= 3 && increasing >= nums.length - 2 && nums.length >= parsed.length / 6;
  return numbered
    ? { lines: parsed, numbered }
    : { lines: rows.map((r) => ({ n: null, text: r.trim() })), numbered: false };
}

const END = /[.!?…:»”"')\]]\s*$/;
const DASH_START = /^[—–-]\s?\S/;

/** Junta as linhas quebradas pelo PDF em parágrafos, mantendo falas e títulos curtos em linhas próprias. */
export function reflowParagraphs(lines: string[]): string[] {
  const clean = lines.map((l) => l.trim()).filter(Boolean);
  if (!clean.length) return [];
  const longest = Math.max(...clean.map((l) => l.length));
  const out: string[] = [];
  let cur = "";
  clean.forEach((line, i) => {
    cur = cur ? `${cur} ${line}` : line;
    const next = clean[i + 1];
    const shortLine = line.length < longest * 0.62;
    // título curto sem pontuação final (ex.: nome do texto ou do autor)
    const heading = shortLine && !END.test(line) && line.length < 60 && cur === line;
    const endsParagraph =
      !next ||
      (END.test(line) && (shortLine || DASH_START.test(next))) ||
      heading ||
      (shortLine && DASH_START.test(next));
    if (endsParagraph) {
      out.push(cur);
      cur = "";
    }
  });
  return out;
}

/** Reorganiza um enunciado quebrado em linhas curtas, sem mexer em listas e itens numerados. */
export function reflowStem(text: string): string {
  const lines = text.replace(/\r/g, "").split("\n");
  if (lines.length < 2) return text;
  const out: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    const prev = out[out.length - 1];
    const isListItem = /^(\(?[a-eA-E]\)|[IVX]+\s*[-–.)]|\d+\s*[-–.)]|[-•*])\s/.test(line);
    if (prev !== undefined && line && !isListItem && !END.test(prev) && /^[a-zà-ú]/.test(line))
      out[out.length - 1] = `${prev} ${line}`;
    else out.push(raw.trimEnd());
  }
  return out.join("\n");
}

// ───────── Questões que dependem de texto ausente ─────────
const REFERS_TO_TEXT = new RegExp(
  [
    String.raw`(?:de acordo com|segundo|conforme|com base n?|considerando|à luz d?|a partir d?|leitura d?)\s*o\s+texto|(?:no|do|ao|pelo|neste|deste|desse|nesse)\s+texto`,
    String.raw`texto\s+(?:[IVX]+|\d+|[A-Z]{2}\d[A-Z]\d(?:-[IVX]+)?)`,
    String.raw`(?:primeiro|segundo|terceiro|quarto|quinto|sexto|último|penúltimo)\s+par[áa]grafo`,
    String.raw`par[áa]grafo\s+\d+`,
    String.raw`linhas?\s+\d+`,
    String.raw`segundo\s+o\s+autor`,
  ].join("|"),
  "i",
);
const SELF_CONTAINED =
  /(?:^|\n)\s*(?:texto|leia(?: o texto| o trecho)?|observe(?: o texto| o trecho)?)\s*[:：]\s*["“«]/i;

// Provas FGV frequentemente trazem o texto integral depois de “Leia ...:”, sem aspas.
const INLINE_PROMPT =
  /^\s*Leia(?:,\s*a seguir,)?(?:\s*[:：]\s*|\s+(?:o|a|um|uma)(?:\s+seguinte)?\s+(?:texto|trecho|not[íi]cia|excerto|fragmento|poema|cr[ôo]nica)\b[^:\n]{0,180}[:：]\s*)/i;
const ONLY_COMMAND =
  /^(?:https?:\/\/|no texto|segundo o texto|de acordo com o texto|com base n[eo]s?s?e? texto|assinale|julgue|considere as|(?:a|o) (?:expressão|termo|vocábulo|trecho)\b)/i;
function embeddedSupportText(text: string, figures?: string[]) {
  const prompt = INLINE_PROMPT.exec(text);
  if (!prompt) return false;
  // A reviewed image can be the support itself. Unresolved visuals remain blocked by catalog eligibility.
  if (
    figures?.some((url) => {
      try {
        return new URL(url).protocol === "https:";
      } catch {
        return false;
      }
    })
  )
    return true;
  const body = text
    .slice(prompt[0].length)
    .split(/\n\s*\(?[A-E]\)/)[0]!
    .trim();
  return (
    !ONLY_COMMAND.test(body) && body.length >= 120 && (body.match(/\p{L}+/gu)?.length ?? 0) >= 20
  );
}

/** Questões de Português que remetem a "o texto" sem o texto de apoio. O treinador as deixa de fora até o texto ser cadastrado. */
export function needsMissingSupportText(q: {
  subject: string;
  text: string;
  source?: string;
  figures?: string[] | undefined;
}): boolean {
  // itens autorais e do caderno pessoal trazem o seu contexto no próprio enunciado
  if (q.source === "curated" || q.source === "personal") return false;
  if (!/portugu|reda[çc][ãa]o|interpreta/i.test(q.subject.normalize("NFC"))) return false;
  if (/^(Texto-base|Comando)(?: \[[^\]]+\])?:\n/.test(q.text)) return false;
  if (SELF_CONTAINED.test(q.text) || embeddedSupportText(q.text, q.figures)) return false;
  // enunciado com texto longo entre aspas dentro dele é autossuficiente
  const quoted = [...q.text.matchAll(/["“«]([^"”»]{200,})["”»]/g)];
  if (quoted.length) return false;
  return REFERS_TO_TEXT.test(q.text);
}

export type SupportBlockKind = "title" | "source" | "dialogue" | "body";

const SOURCE_START =
  /^(dispon[ií]vel em|fonte|internet|adaptad[oa]|texto adaptado|acesso em|in:|apud|\(?\s*(?:adaptad[oa]|com adapta)|[A-ZÀ-Ú][A-ZÀ-Ú.\s,'-]{2,}\.\s)/i;

/** Classifica um parágrafo reorganizado para dar a cada tipo o estilo de leitura adequado. */
export function classifySupportBlock(p: string, index: number): SupportBlockKind {
  if (/^[—–-]\s?\S/.test(p)) return "dialogue";
  if (SOURCE_START.test(p) && p.length < 220) return "source";
  if (index === 0 && p.length < 80 && !/[.!?…:]\s*$/.test(p)) return "title";
  if (p.length < 60 && !/[.!?…:,;]\s*$/.test(p) && !/^[a-zà-ú]/.test(p)) return "title";
  return "body";
}
