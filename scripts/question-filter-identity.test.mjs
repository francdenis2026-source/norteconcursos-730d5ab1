import test from "node:test";
import assert from "node:assert/strict";
import {
  questionContestLabel,
  questionContestValue,
  questionCareerLabel,
  matchesQuestionContest,
} from "../src/lib/questionFilterIdentity.ts";
import {
  filterSimulatorQuestions,
  simulatorFilterFacets,
  SIMULATOR_FACET_KEYS,
} from "../src/lib/simulatorFilters.ts";
import { filterTrainerQuestions, trainerFilterFacets } from "../src/lib/trainerFilters.ts";

const all = Object.fromEntries(SIMULATOR_FACET_KEYS.map((key) => [key, "all"]));
const item = (id, contest, career, year, sourceKind = "official") => ({
  id,
  contest,
  career,
  year,
  sourceKind,
  source: sourceKind,
  subject: "Português",
  board: "FGV",
  state: "AC",
  category: "Segurança",
  explanation: "Comentário",
  legalBasis: [],
  checkedAt: null,
  difficulty: "média",
  text: "Texto",
  subtopic: null,
});
const oldMaterial = "Campo Grande — Assistente — questão 18 (repertório OP-100AG-21)";
const catalog = [
  item("1", oldMaterial, "Assistente", 2021, "curated"),
  item(
    "2",
    "Campo Grande — Assistente — questão 19 (repertório OP-100AG-21)",
    "Assistente",
    2021,
    "curated",
  ),
  item(
    "3",
    "Boa Vista — GCM — questão 8 (repertório OP-100AG-21)",
    "Guarda Municipal",
    2021,
    "curated",
  ),
  item(
    "4",
    "Polícia Civil do Estado do Amazonas - Investigador de Polícia",
    "Investigador de Polícia",
    2022,
  ),
  item("5", "Polícia Civil do Amazonas – Escrivão de Polícia", "Escrivão de Polícia", 2022),
  item(
    "6",
    "Polícia Civil do Estado do Amazonas - Investigador de Polícia",
    "Investigador de Polícia",
    2025,
  ),
  item("7", "Polícia Federal", "Agente de Polícia Federal", 2025),
  item(
    "8",
    "Polícia Federal — material de estudo histórico",
    "Agente de Polícia Federal",
    2021,
    "curated",
  ),
];
test("item-level bibliography entries form one material choice without losing questions", () => {
  const facets = simulatorFilterFacets(catalog, all);
  const label = "Repertório — Apostilas Opção (OP-100AG-21)";
  assert.equal(facets.contest.get(label), 3);
  assert.ok(![...facets.contest.keys()].some((name) => /questão \d/.test(name)));
  assert.equal(
    filterSimulatorQuestions(catalog, { ...all, contest: label, career: "Assistente" }).length,
    2,
  );
  assert.equal(catalog[0].contest, oldMaterial);
  assert.notEqual(
    questionContestLabel("Apostilas Opção — PP-MG — repertório de concursos anteriores"),
    label,
  );
});
test("institution variants group while job, edition and origin filters retain their boundaries", () => {
  const selected = {
    ...all,
    contest: "Polícia Civil do Amazonas",
    career: "Investigador de Polícia",
    year: "2022",
  };
  assert.deepEqual(
    filterSimulatorQuestions(catalog, selected).map((q) => q.id),
    ["4"],
  );
  assert.equal(
    filterSimulatorQuestions(catalog, { ...all, contest: "Polícia Civil do Amazonas" }).length,
    3,
  );
  assert.equal(
    questionContestLabel("Polícia Judiciária Civil do Estado de Mato Grosso - Escrivão de Polícia"),
    "Polícia Civil de Mato Grosso",
  );
  assert.notEqual(
    questionContestLabel("Polícia Civil de Mato Grosso do Sul"),
    questionContestLabel("Polícia Civil de Mato Grosso"),
  );
  assert.equal(
    filterSimulatorQuestions(catalog, { ...all, contest: "Polícia Federal", source: "official" })
      .length,
    1,
  );
  assert.notEqual(questionContestLabel(catalog[7].contest), "Polícia Federal");
  assert.equal(
    questionCareerLabel("Agente de Polícia", "Polícia Federal", 2025),
    "Agente de Polícia Federal",
  );
  assert.equal(
    questionCareerLabel("Agente de Polícia", "Polícia Civil do Acre", 2017),
    "Agente de Polícia Civil",
  );
});
test("previous links to one item or a specific paper do not silently widen the scope", () => {
  assert.equal(questionContestValue(oldMaterial), oldMaterial);
  assert.deepEqual(
    filterSimulatorQuestions(catalog, { ...all, contest: oldMaterial }).map((q) => q.id),
    ["1"],
  );
  assert.equal(matchesQuestionContest(catalog[4].contest, catalog[3].contest), false);
  assert.equal(
    questionContestValue("Polícia Civil do Estado do Amazonas"),
    "Polícia Civil do Amazonas",
  );
});
test("every simulator facet equals the actual matching pool, including legacy selections", () => {
  for (const filters of [
    all,
    { ...all, contest: oldMaterial },
    { ...all, contest: "Polícia Civil do Amazonas" },
    { ...all, source: "official" },
    { ...all, year: "2022" },
  ]) {
    const facets = simulatorFilterFacets(catalog, filters);
    for (const key of SIMULATOR_FACET_KEYS)
      for (const [value, count] of facets[key])
        assert.equal(
          filterSimulatorQuestions(catalog, { ...filters, [key]: value }).length,
          count,
          `${key}:${value}`,
        );
  }
});
test("trainer and simulator use the same grouped contest and role identities", () => {
  const questions = catalog.map((q) => ({ ...q, year: String(q.year) }));
  const filters = { ...all, area: "all", topic: "all", appliedExam: "all", difficulty: "all" };
  const topics = new Map();
  const facets = trainerFilterFacets(questions, filters, topics);
  assert.equal(facets.counts.contest.get("Repertório — Apostilas Opção (OP-100AG-21)"), 3);
  assert.equal(
    filterTrainerQuestions(
      questions,
      {
        ...filters,
        contest: "Polícia Civil do Amazonas",
        career: "Escrivão de Polícia Civil",
        year: "2022",
      },
      topics,
    ).length,
    1,
  );
  assert.equal(
    filterTrainerQuestions(questions, { ...filters, contest: oldMaterial }, topics).length,
    1,
  );
});

test('job choices reject institutions and material labels without inventing a role', async()=>{
 const {isSpecificQuestionCareer}=await import('../src/lib/questionFilterIdentity.ts');
 for(const career of ['Polícia Federal','Polícia Civil de outro estado','Repertório — Apostilas Opção','Diversos','ENEM','Departamento Penitenciário Nacional'])
   assert.equal(isSpecificQuestionCareer(career,career,2030),false,career);
 for(const career of ['Agente de Polícia Federal','Policial Penal','Soldado da Polícia Militar','Perito Criminal Federal'])
   assert.equal(isSpecificQuestionCareer(career,'Polícia Federal',2025),true,career);
 assert.equal(isSpecificQuestionCareer('Departamento Penitenciário Nacional','Departamento Penitenciário Nacional',2021),true);
 assert.equal(isSpecificQuestionCareer('Polícia Civil do Acre','Polícia Civil do Acre',2017),true);
 assert.equal(isSpecificQuestionCareer('Polícia Rodoviária Federal','Polícia Rodoviária Federal',2021),true);
});
