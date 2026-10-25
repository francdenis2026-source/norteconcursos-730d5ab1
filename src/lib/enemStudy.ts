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
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-300",
  },
  {
    id: "humanas",
    name: "Ciências Humanas",
    subjects: ["História", "Geografia", "Filosofia", "Sociologia"],
    dot: "bg-orange-500",
    text: "text-orange-700 dark:text-orange-300",
  },
  {
    id: "natureza",
    name: "Ciências da Natureza",
    subjects: ["Biologia", "Física", "Química"],
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "matematica",
    name: "Matemática",
    subjects: ["Matemática"],
    dot: "bg-sky-500",
    text: "text-sky-700 dark:text-sky-300",
  },
  {
    id: "redacao",
    name: "Redação",
    subjects: ["Redação"],
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
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
