export const ENEM_STUDY_GROUPS = [
  {
    id: "linguagens",
    name: "Linguagens",
    subjects: [
      "Língua Portuguesa",
      "Literatura",
      "Língua Inglesa",
      "Língua Espanhola",
      "Artes e Educação Física",
    ],
    color: "border-rose-500 text-rose-700 dark:text-rose-300",
  },
  {
    id: "humanas",
    name: "Ciências Humanas",
    subjects: ["História", "Geografia", "Filosofia", "Sociologia"],
    color: "border-orange-500 text-orange-700 dark:text-orange-300",
  },
  {
    id: "natureza",
    name: "Ciências da Natureza",
    subjects: ["Biologia", "Física", "Química"],
    color: "border-emerald-500 text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "matematica",
    name: "Matemática",
    subjects: ["Matemática"],
    color: "border-sky-500 text-sky-700 dark:text-sky-300",
  },
  {
    id: "redacao",
    name: "Redação",
    subjects: ["Redação"],
    color: "border-violet-500 text-violet-700 dark:text-violet-300",
  },
];
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function matchesEnemMaterial(
  m: { contest_name: string | null; discipline: string; title: string; topic_label: string },
  area: string,
  search: string,
) {
  if (m.contest_name !== "ENEM") return false;
  const group = ENEM_STUDY_GROUPS.find((g) => g.id === area);
  if (area !== "all" && (!group || !group.subjects.includes(m.discipline))) return false;
  return fold(`${m.discipline} ${m.title} ${m.topic_label}`).includes(fold(search.trim()));
}
