/**
 * One accent hue per student section so icons and active nav states carry meaning
 * at a glance, instead of every area reading the same flat gold. "Meu concurso"
 * keeps the brand gold since it is the primary/target section; the rest map to a
 * hue that matches what the section is for (status colors inside pages, like
 * correct/incorrect question badges, remain separately semantic).
 */
export const STUDENT_GROUP_TONES: Record<string, string> = {
  Planejamento: "violet",
  "Meu concurso": "gold",
  "Material didático": "sky",
  Ferramentas: "orange",
  Questões: "emerald",
  Provas: "rose",
  ENEM: "indigo",
  Desempenho: "teal",
  Conta: "slate",
  Administração: "slate",
};
