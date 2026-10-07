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

// Igual a canonicalSubject, mas para career_name (cargo). Dois padrões já identificados no
// histórico de importações, ambos reunidos aqui como o mesmo cargo (nunca estados/editais
// diferentes — ver nota em exam-panorama.tsx sobre o que NÃO é unificado):
// 1) O nome da INSTITUIÇÃO foi gravado em career_name em vez do nome do cargo (um conserto pontual
//    trocou career_name pelo nome do órgão para bater com outra tela — migration
//    20260927000000_fix_career_name_join_mismatch.sql, para PRF, PC-AC e PP-AC — e uma
//    reimportação posterior trouxe de volta o nome do cargo original, deixando os dois
//    coexistindo).
// 2) O mesmo cargo, do mesmo órgão/estado, foi escrito por extenso de formas diferentes em
//    importações de anos diferentes (ex.: TPAG de Minas Gerais, 2025 e 2026).
// A lista cresce conforme outros pares forem encontrados.
// Chaves já passadas por strip() (sem acento, minúsculas) — strip() não remove parênteses.
const CAREER_NAME_ALIASES: Record<string, string> = {
  "policia rodoviaria federal": "Policial Rodoviário Federal",
  "policia civil do acre": "Agente de Polícia Civil",
  "policia penal do acre": "Agente de Polícia Penal",
  "tecnico assistente da policia civil e de atividades governamentais (tpag) auxiliar de pericia":
    "Técnico-Assistente – Auxiliar de Perícia (TPAG)",
};

export function canonicalCareerName(raw: string | null | undefined): string {
  const text = (raw ?? "").trim();
  if (!text) return text;
  return CAREER_NAME_ALIASES[strip(text)] ?? text;
}
