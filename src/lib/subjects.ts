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

export function canonicalSubject(raw: string | null | undefined): string {
  const text = (raw ?? "").trim();
  if (!text) return text;
  // "Matemática Financeira — Juros simples": a família é o que vem antes do travessão com espaços.
  const key = strip(text.split(/\s[—–]\s/)[0] ?? text);
  if (key.startsWith("raciocinio logico")) return "Raciocínio Lógico";
  if (key.startsWith("informatica") || key.startsWith("nocoes de informatica"))
    return "Informática";
  if (key === "portugues" || key.startsWith("lingua portuguesa")) return "Língua Portuguesa";
  if (/\bingles\b/.test(key)) return "Língua Inglesa";
  return text;
}

/** Banca em maiúsculas e sem variações ("Cebraspe", "CESPE/CEBRASPE" → "CEBRASPE"). Vazio fica vazio. */
export function canonicalBoard(raw: string | null | undefined): string {
  const b = (raw ?? "").trim().replace(/\s+/g, " ").toUpperCase();
  return /^CESPE\b|^CEBRASPE\b/.test(b) ? "CEBRASPE" : b;
}

// Igual a canonicalSubject, mas para career_name (cargo): algumas importações antigas gravaram o
// nome da INSTITUIÇÃO em career_name em vez do nome do cargo (ex.: um conserto pontual para a PRF
// trocou "Policial Rodoviário Federal" por "Polícia Rodoviária Federal" para bater com outra tela,
// e uma reimportação posterior trouxe de volta o nome do cargo original) — sem isso, o mesmo cargo
// aparece duas vezes em filtros. A lista cresce conforme outros pares forem encontrados.
const CAREER_NAME_ALIASES: Record<string, string> = {
  "polícia rodoviária federal": "Policial Rodoviário Federal",
};

export function canonicalCareerName(raw: string | null | undefined): string {
  const text = (raw ?? "").trim();
  if (!text) return text;
  return CAREER_NAME_ALIASES[strip(text)] ?? text;
}
