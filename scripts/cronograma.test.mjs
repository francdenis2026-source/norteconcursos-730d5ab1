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

test("edital: aulas relacionadas exigem assunto e disciplina compatíveis", async () => {
  const { default: assert } = await import("node:assert/strict");
  const { editalLessonLinks } = await import("../src/lib/editalStudy.ts");
  const tracks = [
    { slug: "portugues", title: "Português", discipline: "Língua Portuguesa", lessons: [
      { id: "crase", title: "Emprego da crase", edital: "Emprego da crase" },
      { id: "verbos", title: "Conjugação verbal", edital: "Conjugação verbal" },
    ] },
    { slug: "outra", title: "Outra disciplina", discipline: "Informática", lessons: [
      { id: "crase", title: "Emprego da crase", edital: "Emprego da crase" },
    ] },
  ];
  const result = editalLessonLinks("Língua Portuguesa", "Emprego da crase", tracks);
  assert.deepEqual(result.lessons.map(l => [l.track, l.lesson]), [["portugues", "crase"]]);
  assert.deepEqual(result.tracks.map(t => t.slug), ["portugues"]);
  assert.equal(editalLessonLinks("Língua Portuguesa", "Figuras de linguagem", tracks).lessons.length, 0);
});
