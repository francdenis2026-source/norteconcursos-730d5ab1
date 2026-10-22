import test from "node:test";
import assert from "node:assert/strict";
import { canonicalSubject, canonicalTopic, canonicalBoard } from "../src/lib/subjects.ts";
import { subjectInArea, classifyTopic } from "../src/lib/questionTopics.ts";
import {
  questionTopic,
  scopedTopic,
  matchesTopicFilter,
  topicLabels,
} from "../src/lib/filterTaxonomy.ts";
import {
  filterTrainerQuestions,
  trainerFilterFacets,
  TRAINER_FACET_KEYS,
  trainerBoard,
} from "../src/lib/trainerFilters.ts";
import { libraryTopic, libraryDiscipline } from "../src/lib/libraryOrganization.ts";
import { topicsFor } from "../src/data/studyTopics.ts";
import { filterSimulatorQuestions } from "../src/lib/simulatorFilters.ts";
import { auditFilterTaxonomy } from "./audit-filter-taxonomy.mjs";
import { catalogMetadataFacets, filterCatalogMetadata } from "../src/lib/catalogMetadataFilters.ts";

test("aliases unify only equivalent disciplines and are idempotent", () => {
  for (const [raw, expected] of [
    ["  Noções de Direito Penal ", "Direito Penal"],
    ["PROCESSUAL PENAL", "Direito Processual Penal"],
    ["Contabilidade", "Contabilidade Geral"],
    ["Estatística e Probabilidade", "Estatística"],
    ["Direito Humanos", "Direitos Humanos"],
    ["Raciocínio Lógico-Matemático", "Raciocínio Lógico"],
    ["Lingua Estrangeira - Ingles", "Língua Inglesa"],
  ]) {
    assert.equal(canonicalSubject(raw), expected);
    assert.equal(canonicalSubject(expected), expected);
  }
  for (const separate of [
    "Matemática Financeira",
    "Contabilidade Pública",
    "Contabilidade de Custos",
    "Direito Penal Militar",
    "Direito Processual Penal Militar",
    "Raciocínio Lógico Matemático, Estatístico e Contábil",
    "Direito Penal e Processual Penal",
    "Redação Oficial",
    "Tecnologia da Informação",
  ])
    assert.equal(canonicalSubject(separate), separate);
  assert.equal(canonicalSubject("https://g1.globo.com"), "Disciplina não classificada");
  assert.equal(canonicalBoard(" NÃO INFORMADA "), "Não informada");
  assert.equal(trainerBoard("all"), "all");
});

test("areas and scheduled topics separate ethics, human rights and special laws", () => {
  assert.equal(subjectInArea("Direitos Humanos", "Legislação Penal Especial"), false);
  assert.equal(subjectInArea("Ética no Serviço Público", "Direitos Humanos"), false);
  assert.equal(subjectInArea("Direito Penal", "Direito Processual Penal"), false);
  assert.equal(subjectInArea("Direito Penal", "Direito Penal Militar"), false);
  assert.equal(subjectInArea("Raciocínio Lógico", "Matemática Financeira"), false);
  assert.equal(subjectInArea("Contabilidade Geral", "Contabilidade Pública"), false);
  assert.equal(subjectInArea("Direito Penal e Processual Penal", "Noções de Processo Penal"), true);
  assert.equal(
    classifyTopic("Direitos Humanos", "A lei de drogas trata do tráfico de drogas"),
    null,
  );
  assert.equal(classifyTopic("Direito Penal e Processual Penal", "prisão preventiva"), null);
  assert.ok(!topicsFor("Direitos Humanos").some((topic) => topic.includes("Drogas")));
  assert.ok(topicsFor("Legislação Especial").some((topic) => topic.includes("Drogas")));
  assert.ok(!topicsFor("Estatística").includes("Negação de proposições"));
});

test("stored reviewed topic prevails over approximate text classification", () => {
  assert.equal(
    questionTopic({
      subject: "Língua Portuguesa",
      subtopic: "Sintaxe: complemento nominal",
      text: "O texto apresenta uma vírgula",
    }),
    "Sintaxe: complemento nominal",
  );
  assert.equal(
    questionTopic({
      subject: "Língua Portuguesa",
      subtopic: null,
      text: "Emprego do sinal indicativo de crase",
    }),
    "Crase",
  );
  assert.equal(canonicalTopic(" CRASE "), "Crase");
  assert.equal(
    topicLabels([
      scopedTopic("Estatística", "probabilidade"),
      scopedTopic("Estatística", "Probabilidade"),
      scopedTopic("RLM", "Probabilidade"),
    ]).length,
    2,
  );
  assert.equal(
    matchesTopicFilter("RLM", "Probabilidade", scopedTopic("Estatística", "Probabilidade")),
    false,
  );
  assert.equal(matchesTopicFilter("Português", "crase", "Crase"), true); // existing plan links
  assert.equal(topicLabels(["CPP::Art. 25", "CPP::Art. 26"]).length, 2);
  assert.equal(topicLabels(["Área A::B", "Área::A B"]).length, 2);
});

const all = Object.fromEntries(
  [
    "area",
    "topic",
    "contest",
    "board",
    "career",
    "year",
    "appliedExam",
    "subject",
    "source",
    "reviewed",
    "difficulty",
    "state",
    "category",
  ].map((key) => [key, "all"]),
);
const q = (id, subject, board, extra = {}) => ({
  id,
  subject,
  board,
  source: "official",
  contest: "Concurso",
  career: "Agente",
  year: "2025",
  state: "AC",
  category: "Segurança",
  difficulty: "média",
  explanation: "Explicação pedagógica revisada e detalhada do item de prova.",
  text: "Questão",
  subtopic: "Probabilidade",
  ...extra,
});
test("every facet count matches actual filtering across all combinations", () => {
  const catalog = [
    q("1", "Raciocínio Lógico", "FGV"),
    q("2", "RLM", "FGV"),
    q("3", "Estatística", "CEBRASPE"),
    q("4", "Estatística", "FGV", { state: "MG", source: "curated" }),
  ];
  const topics = new Map(catalog.map((item) => [item.id, item.subtopic]));
  for (const selected of [
    all,
    { ...all, board: "FGV" },
    { ...all, subject: "RLM", topic: scopedTopic("RLM", "Probabilidade") },
    { ...all, state: "MG", source: "curated" },
    { ...all, area: "Estatística" },
  ]) {
    const facets = trainerFilterFacets(catalog, selected, topics);
    for (const key of TRAINER_FACET_KEYS) {
      const field = key === "exam" ? "appliedExam" : key;
      // The discipline picker clears the old topic and schedule area when it changes.
      const candidates =
        field === "subject" ? { ...selected, topic: "all", area: "all" } : selected;
      for (const [value, count] of facets.counts[key])
        assert.equal(
          filterTrainerQuestions(catalog, { ...candidates, [field]: value }, topics).length,
          count,
          `${key}: ${value}`,
        );
      assert.equal(
        facets.totals[key],
        filterTrainerQuestions(catalog, { ...candidates, [field]: "all" }, topics).length,
      );
    }
  }
});

test("library filter joins multiple guides for the same law without merging CP/CPP topics", () => {
  const a = {
    slug: "legislacao-drogas-revisao",
    discipline: "Legislação Especial",
    topic_label: "Lei 11.343/2006 — revisão",
  };
  const b = {
    slug: "outro-guia",
    discipline: "Legislação Penal Especial",
    topic_label: "Lei de Drogas",
    law_course_slug: "drogas",
  };
  assert.equal(libraryTopic(a), libraryTopic(b));
  assert.equal(libraryDiscipline(a), libraryDiscipline(b));
  const cp = {
    slug: "penal-principios-direito-penal",
    discipline: "Direito Penal",
    topic_label: "Aplicação da lei no tempo",
  };
  assert.equal(libraryTopic(cp), cp.topic_label);
});

test("older plan links find the broader topic without replacing the student's subject filter", () => {
  assert.equal(
    matchesTopicFilter("Português", "Concordância nominal", "Concordância verbal e nominal"),
    true,
  );
  assert.equal(
    matchesTopicFilter("Direito Penal", "Concordância nominal", "Concordância verbal e nominal"),
    false,
  );
  const catalog = [q("legacy", "Língua Portuguesa", "FGV", { subtopic: "Concordância nominal" })];
  const topics = new Map([["legacy", "Concordância nominal"]]);
  assert.equal(
    trainerFilterFacets(
      catalog,
      { ...all, subject: "Português", topic: "Concordância verbal e nominal" },
      topics,
    ).counts.topic.get("Concordância verbal e nominal"),
    1,
  );
});

test("simulator respects board, state, category, discipline and source carried from the central", () => {
  const filters = {
    contest: "all",
    subject: "all",
    board: "FGV",
    career: "all",
    year: "all",
    source: "official",
    state: "AC",
    category: "Segurança",
    reviewed: "all",
  };
  const items = [
    q("chosen", "Noções de Direito Penal", "FGV"),
    q("other-state", "Direito Penal", "FGV", { state: "MG" }),
    q("other-board", "Direito Penal", "CESPE"),
    q("other-source", "Direito Penal", "FGV", { source: "curated" }),
  ].map((item) => ({
    ...item,
    year: 2025,
    sourceKind: item.source,
    legalBasis: [],
    checkedAt: null,
  }));
  assert.deepEqual(
    filterSimulatorQuestions(items, { ...filters, subject: "Direito Penal" }).map(
      (item) => item.id,
    ),
    ["chosen"],
  );
  assert.equal(filterSimulatorQuestions(items, { ...filters, board: "IBFC" }).length, 0);
});

test("read-only audit counts naming variants and keeps ambiguous headers as review candidates", () => {
  const snapshot = {
    questions: [
      { subject: "Noções de Direito Penal", content_status: "active" },
      { subject: "Direito Penal", content_status: "active" },
      { subject: "Conhecimentos Específicos", content_status: "active" },
      { subject: "https://g1.globo.com", content_status: "active" },
      { subject: "Noções de Informática", content_status: "under_review" },
    ],
  };
  const before = JSON.stringify(snapshot);
  const report = auditFilterTaxonomy(snapshot);
  assert.equal(report.tables.questions.activeMetadata, 4);
  assert.equal(report.equivalentNames.length, 1);
  assert.equal(report.ambiguousLabels.length, 2);
  assert.equal(JSON.stringify(snapshot), before);
});

test("central metadata facets retain sources and yield the same count as each selection", () => {
  const rows = [
    q("a", "Contabilidade", "FGV"),
    q("b", "Contabilidade Geral", "FGV"),
    q("c", "Contabilidade Pública", "CEBRASPE"),
    q("mine", "Direito Penal", "Meu caderno", { source: "personal", career: "Meu caderno" }),
  ];
  const filters = {
    contest: "all",
    board: "FGV",
    career: "all",
    year: "all",
    subject: "all",
    source: "all",
    state: "all",
    category: "all",
  };
  const counts = catalogMetadataFacets(rows, filters);
  assert.equal(counts.subject.get("Contabilidade Geral"), 2);
  assert.equal(counts.subject.has("Contabilidade Pública"), false);
  for (const [field, values] of Object.entries(counts))
    for (const [value, count] of values)
      assert.equal(filterCatalogMetadata(rows, { ...filters, [field]: value }).length, count);
  assert.equal(
    filterCatalogMetadata(rows, {
      ...filters,
      board: "Meu caderno",
      source: "personal",
      career: "Meu caderno",
    }).length,
    1,
  );
});
