import { legalTextParts, type LegalHighlightKind } from "@/lib/legalHighlights";

/**
 * Destaques didáticos para textos explicativos (explicações por artigo, cursos, resoluções, exemplos).
 * Reaproveita os grifos do texto oficial (requisitos, exceções, números e penas) e acrescenta:
 * vedações, palavras que restringem (somente, exclusivo, obrigatório) e rótulos de abertura
 * (ATUALIZAÇÃO, Exemplo, Atenção...). São auxílios de leitura: não reescrevem nem classificam o texto.
 */
export type StudyKind = LegalHighlightKind | "prohibition" | "obligation";
export type TagKind = "update" | "example" | "warning" | "exception" | "rule" | "tip";
export type StudyPart = { text: string; kind?: StudyKind; tag?: TagKind };

export const STUDY_LABELS: Record<StudyKind, string> = {
  requirement: "Requisitos e condições",
  exception: "Exceções e negações",
  quantity: "Números, prazos e limites",
  sanction: "Penas e consequências",
  prohibition: "Proibições e nulidades",
  obligation: "Regras que restringem",
};

const TAGS: { re: RegExp; tag: TagKind }[] = [
  { re: /^(atualiza[çc][ãa]o(?:\s+(?:de|em)\s+[^:–-]{1,40})?)\s*:\s*/i, tag: "update" },
  { re: /^(exemplos?(?:\s+pr[áa]ticos?)?)\s*:\s*/i, tag: "example" },
  { re: /^(aten[çc][ãa]o|cuidado|pegadinha|erro\s+comum|armadilha)\s*:\s*/i, tag: "warning" },
  { re: /^(exce[çc][ãa]o|exce[çc][õo]es)\s*:\s*/i, tag: "exception" },
  { re: /^(regra(?:\s+geral)?|importante|lembre-se)\s*:\s*/i, tag: "rule" },
  { re: /^(dica|macete|observa[çc][ãa]o)\s*:\s*/i, tag: "tip" },
];

const EXTRA: { kind: StudyKind; pattern: string }[] = [
  { kind: "prohibition", pattern: String.raw`vedad[oa]s?|proibid[oa]s?|inadmissíve(?:l|is)|ilícit[oa]s?|nul[oa]s?|nulidade|inafiançáve(?:l|is)|imprescritíve(?:l|is)|insuscetíve(?:l|is)|não\s+cabe(?:m)?|em\s+nenhuma\s+hipótese|sob\s+pena\s+de` },
  { kind: "obligation", pattern: String.raw`obrigatóri[oa]s?|exclusiv[oa]s?|exclusivamente|privativ[oa]s?|privativamente|somente|apenas|unicamente|indispensáve(?:l|is)` },
];

function extraParts(text: string): StudyPart[] {
  const matches: { start: number; end: number; kind: StudyKind; priority: number }[] = [];
  EXTRA.forEach((rule, priority) => {
    const re = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${rule.pattern})(?![\\p{L}\\p{N}_])`, "giu");
    for (const m of text.matchAll(re)) matches.push({ start: m.index!, end: m.index! + m[0].length, kind: rule.kind, priority });
  });
  matches.sort((a, b) => a.start - b.start || a.priority - b.priority || b.end - a.end);
  const out: StudyPart[] = [];
  let end = 0;
  for (const m of matches) {
    if (m.start < end) continue;
    if (m.start > end) out.push({ text: text.slice(end, m.start) });
    out.push({ text: text.slice(m.start, m.end), kind: m.kind });
    end = m.end;
  }
  if (end < text.length) out.push({ text: text.slice(end) });
  return out;
}

/** Divide o texto em trechos comuns e destacados, com o rótulo de abertura (se houver) como primeiro trecho. */
export function studyTextParts(text: string): StudyPart[] {
  const parts: StudyPart[] = [];
  let rest = text;
  for (const { re, tag } of TAGS) {
    const m = re.exec(text);
    if (m) {
      parts.push({ text: m[1]!.toUpperCase(), tag });
      rest = text.slice(m[0].length);
      break;
    }
  }
  // proibições e palavras restritivas têm cor própria e prioridade; o resto segue os grifos do texto oficial
  for (const p of extraParts(rest)) {
    if (p.kind) parts.push(p);
    else for (const q of legalTextParts(p.text)) parts.push(q.kind ? { text: q.text, kind: q.kind } : { text: q.text });
  }
  return parts;
}
