import test from "node:test";
import assert from "node:assert/strict";
import { canOpenTrainerLearning, relatedTrainerMaterials } from "../src/lib/trainerLearning.ts";

const material = (slug, discipline, topic_label, extra = {}) => ({
  slug,
  discipline,
  topic_label,
  title: topic_label,
  sort_order: 1,
  content_status: "active",
  ...extra,
});
const question = (subject, subtopic, legalBasis = []) => ({ subject, subtopic, legalBasis });

test("revisão exige resposta salva da questão atual, inclusive ao trocar de questão", () => {
  const history = new Set(["official:previous"]);
  assert.equal(canOpenTrainerLearning(history.has("official:current"), false, false), false);
  // Selecionar alternativa, clicar na ajuda e falhar no salvamento não criam histórico.
  assert.equal(canOpenTrainerLearning(false, false, false), false);
  assert.equal(canOpenTrainerLearning(true, true, false), false);
  assert.equal(canOpenTrainerLearning(true, false, true), false);
  history.add("official:current");
  assert.equal(canOpenTrainerLearning(history.has("official:current"), false, false), true);
});

test("lei identificada vincula seu material apesar das categorias diferentes", () => {
  const q = question("Legislação Penal Especial", "Associação para o tráfico", [
    { url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm?origem=teste" },
  ]);
  const materials = [
    material("legislacao-organizacoes-revisao", "Legislação Especial", "Organizações criminosas"),
    material("legislacao-drogas-revisao", "Legislação Especial", "Lei de Drogas"),
    material("archived", "Legislação Especial", "Tráfico", {
      law_course_slug: "drogas",
      content_status: "archived",
    }),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(q, materials).map((m) => m.slug),
    ["legislacao-drogas-revisao"],
  );
});

test("prioriza tópico do mesmo código e não sugere outra lei com palavras parecidas", () => {
  const q = question("Direito Penal", "Crimes contra a pessoa", [
    { url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm" },
  ]);
  const materials = [
    material("penal-principios-direito-penal", "Direito Penal", "Princípios", { sort_order: 0 }),
    material("cp-pessoa", "Direito Penal", "Crimes contra a pessoa", {
      law_course_slug: "codigo-penal",
    }),
    material("legislacao-trafico-pessoas-revisao", "Direito Penal", "Crimes contra a pessoa"),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(q, materials).map((m) => m.slug),
    ["cp-pessoa", "penal-principios-direito-penal"],
  );
});

test("português liga crase sem substituir por primeiro material da disciplina", () => {
  const materials = [
    material("verbos", "Língua Portuguesa", "Verbos e conjugação"),
    material("crase", "Língua Portuguesa", "Crase: casos práticos"),
    material("outra", "Direito Penal", "Crase: casos práticos"),
  ];
  assert.deepEqual(
    relatedTrainerMaterials(question("Português", "Crase"), materials).map((m) => m.slug),
    ["crase"],
  );
  assert.deepEqual(relatedTrainerMaterials(question("Português", null), materials), []);
});

test("tópicos genéricos e coincidências parciais não recomendam material alheio", () => {
  assert.deepEqual(
    relatedTrainerMaterials(question("Direito Penal", "Direito Penal"), [
      material("general", "Direito Penal", "Direito Penal"),
    ]),
    [],
  );
  assert.deepEqual(
    relatedTrainerMaterials(question("Contabilidade Geral", "Patrimônio e balanço patrimonial"), [
      material("receitas", "Contabilidade Geral", "Balanço de receitas"),
    ]),
    [],
  );
});
