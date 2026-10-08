/** Lexical reading aids only. Never rewrites the source or classifies an offence. */
export type LegalHighlightKind = "requirement" | "exception" | "quantity" | "sanction";
export const LEGAL_HIGHLIGHT_LABELS: Record<LegalHighlightKind, string> = {
  requirement: "Requisitos e condições",
  exception: "Exceções e negações",
  quantity: "Números, limites e prazos",
  sanction: "Penas e consequências",
};
export type LegalTextPart = { text: string; kind?: LegalHighlightKind };
const number = String.raw`(?:\d+(?:[.,]\d+)*|um|uma|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|quinze|vinte|trinta|quarenta|sessenta|noventa|cem)`;
const written = String.raw`(?:\s*\([^()\n]{1,60}\))?`;
const value = `${number}${written}`;
const rules: { kind: LegalHighlightKind; pattern: string }[] = [
  {kind:"quantity",pattern:String.raw`(?:de\s+)?${value}\s+(?:a|até)\s+${value}\s+(?:dias?-multa|dias?|meses|mês|anos?|horas?|pessoas?)`},
  {kind:"quantity",pattern:String.raw`${value}(?:\s+ou\s+mais)?\s+(?:dias?-multa|dias?|meses|mês|anos?|horas?|pessoas?)`},
  {kind:"quantity",pattern:String.raw`(?<![\d./])(?:1|2|3|5)\s*\/\s*(?:2|3|4|5|6|8|10|12)(?![\d/])${written}|\d+(?:[.,]\d+)?\s*%|(?:um|dois|três)\s+(?:terços?|quartos?|sextos?)|metade|dobro|superiores?\s+a\s+${value}|inferiores?\s+a\s+${value}|no\s+mínimo|no\s+máximo`},
  {kind:"exception",pattern:String.raw`reiteradamente\s+ou\s+não|ainda\s+que(?:\s+informalmente)?|salvo(?:\s+se)?|exceto|ressalvad[oa]s?|ressalvadas?\s+as|sem\s+prejuízo|independentemente|não\s+(?:se\s+aplica|poderá|pode|será|é|admite)|vedad[oa]s?|proibid[oa]s?|somente|exclusivamente|apenas`},
  {kind:"requirement",pattern:String.raw`estabilidade\s+e\s+permanência|estável\s+e\s+permanente|divisão\s+de\s+tarefas|estruturalmente\s+ordenada|grave\s+ameaça|violência|coação|dolo|culpa|com\s+o\s+(?:fim|objetivo|propósito)\s+de|para\s+o\s+fim(?:\s+específico)?\s+de|desde\s+que|mediante|no\s+que\s+couber|cumulativamente|alternativamente|obrigatóri[oa]s?|deverá|depende\s+de`},
  {kind:"sanction",pattern:String.raw`reclusão|detenção|multa|perda\s+do\s+cargo|perdimento|aumenta(?:-se)?|reduzida|redução|diminuição|inabilitação|suspensão\s+do\s+direito`},
];

export function legalTextParts(text: string): LegalTextPart[] {
  const matches: {start:number; end:number; kind:LegalHighlightKind; priority:number}[] = [];
  rules.forEach((rule,priority)=>{
    const expression=new RegExp(`(?<![\\p{L}\\p{N}_])(?:${rule.pattern})(?![\\p{L}\\p{N}_])`,"giu");
    for(const match of text.matchAll(expression)) matches.push({start:match.index!,end:match.index!+match[0].length,kind:rule.kind,priority});
  });
  matches.sort((a,b)=>a.start-b.start||a.priority-b.priority||b.end-a.end);
  const parts: LegalTextPart[]=[];
  let end=0;
  for(const match of matches){
    if(match.start<end)continue;
    if(match.start>end)parts.push({text:text.slice(end,match.start)});
    parts.push({text:text.slice(match.start,match.end),kind:match.kind});end=match.end;
  }
  if(end<text.length)parts.push({text:text.slice(end)});
  return parts;
}
