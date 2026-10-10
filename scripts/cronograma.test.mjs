import test from "node:test";
import { selfCheck, disciplineNamesCheck, canonicalDiscipline, isGenericDiscipline } from "../src/lib/cronograma.ts";

test("cronograma: semana soma o tempo semanal e respeita pesos", () => {
  selfCheck();
});

test("cronograma: nomes de disciplinas padronizados", () => {
  disciplineNamesCheck(["Informática"]);
  if (canonicalDiscipline("Língua Portuguesa") !== "Língua Portuguesa") throw new Error("português mudou");
  if (!isGenericDiscipline("Conhecimentos Específicos")) throw new Error("genérica");
});
