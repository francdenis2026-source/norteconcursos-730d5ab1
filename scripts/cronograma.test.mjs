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

test("cronograma: painel do dia divide blocos em etapas sem perder minutos", async () => {
  const { selfCheckDia } = await import("../src/lib/cronogramaDia.ts");
  selfCheckDia();
});

test("cronograma: teoria liga o conteúdo ao material certo", async () => {
  const { selfCheckTeoria } = await import("../src/lib/cronogramaTeoria.ts");
  selfCheckTeoria();
});
