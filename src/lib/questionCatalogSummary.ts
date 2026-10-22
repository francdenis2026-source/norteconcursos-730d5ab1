import type { Question } from "./questionFormat";

/** Aggregate only the caller's scope; unknown metadata is not a real board/year. */
export function catalogGroups(items: Question[], field: "subject" | "board" | "year") {
  const groups = new Map<string, Question[]>();
  for (const item of items) {
    const name = item[field];
    if (!name || (field === "board" && ["Não informada", "Meu caderno"].includes(name))) continue;
    if (field === "year" && !/^\d{4}$/.test(name)) continue;
    const group = groups.get(name) ?? [];
    group.push(item);
    groups.set(name, group);
  }
  return [...groups]
    .map(([name, questions]) => ({ name, questions }))
    .sort(
      (a, b) => b.questions.length - a.questions.length || a.name.localeCompare(b.name, "pt-BR"),
    );
}
export const catalogNumber = (value: number) => value.toLocaleString("pt-BR");
