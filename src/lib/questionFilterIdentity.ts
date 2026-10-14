import { panoramaCareer } from "./panoramaFilters";

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
const states: [string, string][] = [
  ["acre", "do Acre"],
  ["alagoas", "de Alagoas"],
  ["amapa", "do Amapá"],
  ["amazonas", "do Amazonas"],
  ["bahia", "da Bahia"],
  ["ceara", "do Ceará"],
  ["distrito federal", "do Distrito Federal"],
  ["espirito santo", "do Espírito Santo"],
  ["goias", "de Goiás"],
  ["maranhao", "do Maranhão"],
  ["mato grosso do sul", "de Mato Grosso do Sul"],
  ["mato grosso", "de Mato Grosso"],
  ["minas gerais", "de Minas Gerais"],
  ["para", "do Pará"],
  ["paraiba", "da Paraíba"],
  ["parana", "do Paraná"],
  ["pernambuco", "de Pernambuco"],
  ["piaui", "do Piauí"],
  ["rio de janeiro", "do Rio de Janeiro"],
  ["rio grande do norte", "do Rio Grande do Norte"],
  ["rio grande do sul", "do Rio Grande do Sul"],
  ["rondonia", "de Rondônia"],
  ["roraima", "de Roraima"],
  ["santa catarina", "de Santa Catarina"],
  ["sao paulo", "de São Paulo"],
  ["sergipe", "de Sergipe"],
  ["tocantins", "do Tocantins"],
];

/** A filter label is not a replacement for the original contest/provenance stored on the question. */
export function questionContestLabel(raw: string) {
  const text = raw.replace(/\s+/g, " ").trim();
  const key = fold(text);
  if (/op-100ag-21/i.test(text) && /repertorio|apostilas/.test(key))
    return "Repertório — Apostilas Opção (OP-100AG-21)";
  if (/apostilas opcao/.test(key))
    return `Repertório — Apostilas Opção${/\bpp[- ]mg\b/.test(key) ? " — PP-MG" : ""}`;
  if (/^policia federal.*material de estudo historico/.test(key))
    return "Material histórico — Polícia Federal";
  // Explicit material labels stay distinct from real exams and from other publishers.
  if (/repertorio|material historico/.test(key)) return text;
  if (/^(policia rodoviaria federal|prf)(\b|$)/.test(key)) return "Polícia Rodoviária Federal";
  if (/^(policia federal|pf)(\b|$)/.test(key)) return "Polícia Federal";
  const family = /^policia (?:judiciaria )?civil\b/.test(key)
    ? "Polícia Civil"
    : /^policia penal\b/.test(key)
      ? "Polícia Penal"
      : /^policia militar\b/.test(key)
        ? "Polícia Militar"
        : null;
  if (family) {
    for (const [state, label] of states)
      if (new RegExp(`\\b${state}\\b`).test(key)) return `${family} ${label}`;
  }
  return text;
}

function specificLegacyContest(raw: string) {
  if (questionContestLabel(raw) === raw.trim()) return false;
  return (
    /quest[aã]o\s*\d+/i.test(raw) ||
    /\s[–—-]\s.*(?:agente|delegado|escriv[aã]o|investigador|perito|m[eé]dico|t[eé]cnico)/i.test(raw)
  );
}
/** Old links identifying a paper/item keep their exact scope; new choices use the grouped label. */
export function questionContestValue(value: string) {
  return specificLegacyContest(value) ? value : questionContestLabel(value);
}
export function questionContestOptionLabel(value: string) {
  return specificLegacyContest(value)
    ? `${questionContestLabel(value)} · seleção específica do link`
    : questionContestLabel(value);
}
export function matchesQuestionContest(raw: string, selected: string) {
  if (selected === "all") return true;
  return specificLegacyContest(selected)
    ? fold(raw) === fold(selected)
    : fold(questionContestLabel(raw)) === fold(questionContestLabel(selected));
}

export function questionCareerLabel(career: string, contest: string, year: string | number) {
  const explicit = fold(career).match(/^(agente|delegado|escrivao) de policia (civil|federal)$/);
  if (explicit)
    return `${({ agente: "Agente", delegado: "Delegado", escrivao: "Escrivão" } as Record<string, string>)[explicit[1]!]} de Polícia ${explicit[2] === "civil" ? "Civil" : "Federal"}`;
  return panoramaCareer(career, questionContestLabel(contest), Number(year));
}
export function selectedQuestionCareer(career: string, contest = "all", year: string | number = 0) {
  if (!career || career === "all") return "all";
  // Explicit organization suffixes must not be removed by the older generic alias table.
  if (/de policia (civil|federal)$/.test(fold(career)))
    return questionCareerLabel(career, contest, year);
  if (contest === "all" && /^(agente|delegado|escrivao) de policia$/.test(fold(career)))
    return questionCareerLabel(career, "Polícia Civil", year);
  return questionCareerLabel(career, contest, year);
}
export function matchesQuestionCareer(
  career: string,
  contest: string,
  year: string | number,
  selected: string,
  selectedContest = "all",
  selectedYear: string | number = 0,
) {
  return (
    selected === "all" ||
    fold(questionCareerLabel(career, contest, year)) ===
      fold(selectedQuestionCareer(selected, selectedContest, selectedYear))
  );
}
