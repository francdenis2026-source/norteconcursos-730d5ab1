import { legalTextParts } from "./legalHighlights";

export type LiteralExercise = { before: string; answer: string; after: string; kind: string };
/** Practice comes exclusively from the current source. It never changes the law or infers an offence. */
export function literalExercises(source: string): LiteralExercise[] {
  const parts = legalTextParts(source);
  const candidates: (LiteralExercise & { offset: number })[] = [];
  let offset = 0;
  for (const part of parts) {
    if (part.kind) candidates.push({ before: source.slice(0, offset), answer: part.text, after: source.slice(offset + part.text.length), kind: part.kind, offset });
    offset += part.text.length;
  }
  // Definitions and administrative provisions also deserve specific practice.
  if (!candidates.length) {
    const expression = /(?<![\p{L}\p{N}_])[\p{L}]{5,}(?![\p{L}\p{N}_])/gu;
    for (const match of source.matchAll(expression)) {
      const start = match.index!;
      candidates.push({ before: source.slice(0, start), answer: match[0], after: source.slice(start + match[0].length), kind: "source", offset: start });
      if (candidates.length === 3) break;
    }
  }
  const priority = ["quantity", "exception", "requirement", "sanction", "source"];
  candidates.sort((a, b) => priority.indexOf(a.kind) - priority.indexOf(b.kind) || a.offset - b.offset);
  const distinct = candidates.filter((entry, index, all) => all.findIndex(other => other.answer.toLocaleLowerCase("pt-BR") === entry.answer.toLocaleLowerCase("pt-BR")) === index);
  return distinct.slice(0, 3).map(({ offset: _offset, ...entry }) => entry);
}

export function matchesLiteralAnswer(answer: string, sourceAnswer: string): boolean {
  const normalize = (text: string) => text.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
  return normalize(answer) === normalize(sourceAnswer);
}
