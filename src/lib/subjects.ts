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
