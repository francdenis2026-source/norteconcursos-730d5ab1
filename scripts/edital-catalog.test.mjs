import test from "node:test";
import assert from "node:assert/strict";
import {
  filterEditalEditions,
  editalSourceUrl,
  editalMaterials,
  contestStudyEditions,
} from "../src/lib/editalCatalog.ts";
const editions = [
  {
    id: "old",
    contest_name: "Polícia Federal",
    role_name: "Agente",
    contest_year: 2014,
    status: "archived",
    exam_board: "Cebraspe",
    source: { source_type: "edital" },
  },
  {
    id: "new",
    contest_name: "Polícia Federal",
    role_name: "Agente",
    contest_year: 2025,
    status: "active",
    exam_board: "Cebraspe",
    source: { source_type: "edital" },
  },
  {
    id: "proof",
    contest_name: "Polícia Civil",
    role_name: "Delegado",
    contest_year: 2026,
    status: "active",
    exam_board: "FGV",
    source: { source_type: "outro" },
  },
];
test("public-service goal catalog does not mix ENEM into competition editions", () => {
  const enem = { ...editions[0], id: "enem", contest_name: " ENEM 2025 " };
  assert.deepEqual(
    contestStudyEditions([...editions, enem]).map((e) => e.id),
    editions.map((e) => e.id),
  );
  assert.equal(contestStudyEditions([enem]).length, 0);
});
test("edital catalog finds recent and archived editions by accent-free terms, year, and document type", () => {
  assert.deepEqual(
    filterEditalEditions(editions, "policia agente").map((e) => e.id),
    ["new", "old"],
  );
  assert.deepEqual(
    filterEditalEditions(editions, "", "2014", "archived").map((e) => e.id),
    ["old"],
  );
  assert.deepEqual(
    filterEditalEditions(editions, "", "all", "reference").map((e) => e.id),
    ["proof"],
  );
  assert.deepEqual(filterEditalEditions(editions, "FGV", "2025"), []);
});
test("edital document links reject executable or insecure schemes and retain archived official links", () => {
  assert.equal(editalSourceUrl({ url: "javascript:alert(1)" }), null);
  assert.equal(editalSourceUrl({ url: "http://example.com" }), null);
  assert.equal(
    editalSourceUrl({ url: "https://www.gov.br/pf/edital.pdf", status: "substituido" }),
    "https://www.gov.br/pf/edital.pdf",
  );
});
test("broad syllabus topic finds individual study materials while excluding unrelated disciplines and duplicates", () => {
  const materials = [
    {
      slug: "a",
      discipline: "Direito Penal",
      title: "Aplicação da lei penal",
      topic_label: "Aplicação da lei penal",
    },
    {
      slug: "b",
      discipline: "Direito Processual Penal",
      title: "Inquérito policial",
      topic_label: "Inquérito policial",
    },
    {
      slug: "wrong",
      discipline: "Contabilidade",
      title: "Inquérito policial",
      topic_label: "Inquérito policial",
    },
  ];
  const hits = editalMaterials(
    materials,
    "Direito Penal e Processual Penal",
    "Aplicação da lei penal; inquérito policial; preservação de provas, competência e recursos.",
  );
  assert.deepEqual(new Set(hits.map((h) => h.id)), new Set(["a", "b"]));
  assert.equal(hits.length, 2);
  assert.deepEqual(editalMaterials(materials, "Informática", "Inquérito policial"), []);
});

import { editalExamQuestions, editalPracticeSearch } from "../src/lib/editalPractice.ts";
const practiceEdition = { ...editions[1], role_name: "Agente de Polícia Federal" };
const paperQuestion = {
  id: "correct",
  source: "official",
  table: "official_exam_questions",
  contest: "Polícia Federal",
  career: "Agente de Polícia Federal",
  year: "2025",
  board: "CEBRASPE",
  subject: "Direito Penal",
  text: "Julgue o item sobre a tipicidade penal.",
  syllabusTopicId: "remapped-current-topic",
};
test("edition practice uses original paper identity rather than a shared or remapped syllabus", () => {
  const variants = [
    paperQuestion,
    { ...paperQuestion, id: "other-year", year: "2021" },
    { ...paperQuestion, id: "other-career", career: "Escrivão de Polícia Federal" },
    { ...paperQuestion, id: "other-board", board: "FGV" },
    { ...paperQuestion, id: "other-agency", contest: "Polícia Civil do Acre" },
    { ...paperQuestion, id: "authored", source: "curated" },
    { ...paperQuestion, id: "personal", source: "personal" },
  ];
  assert.deepEqual(
    editalExamQuestions(variants, practiceEdition).map((q) => q.id),
    ["correct"],
  );
});
test("same-year police papers in different states and cargos cannot leak across editions", () => {
  const e = {
    ...practiceEdition,
    contest_name: "Polícia Civil do Estado de Sergipe",
    role_name: "Escrivão de Polícia Civil",
    contest_year: 2021,
  };
  const q = {
    ...paperQuestion,
    contest: "Polícia Civil do Estado de Sergipe - Escrivão de Polícia",
    career: "Escrivão de Polícia",
    year: "2021",
  };
  assert.equal(editalExamQuestions([q], e).length, 1);
  assert.equal(editalExamQuestions([{ ...q, contest: "Polícia Civil do Acre" }], e).length, 0);
  assert.equal(editalExamQuestions([{ ...q, career: "Delegado de Polícia" }], e).length, 0);
});
test("incomplete metadata and unavailable papers stay empty without a broad fallback", () => {
  assert.equal(
    editalExamQuestions([paperQuestion], { ...practiceEdition, exam_board: null }).length,
    1,
  );
  assert.deepEqual(editalExamQuestions([paperQuestion], { ...practiceEdition, role_name: "" }), []);
  assert.deepEqual(
    editalExamQuestions([paperQuestion], { ...practiceEdition, contest_year: 2014 }),
    [],
  );
  assert.deepEqual(
    editalExamQuestions(
      [{ ...paperQuestion, contest: "Material histórico — Polícia Federal" }],
      practiceEdition,
    ),
    [],
  );
});
test("edition links retain all catalog and review modes without a subject-only filter", () => {
  assert.deepEqual(editalPracticeSearch(practiceEdition), {
    edition: "new",
    go: "1",
    mode: "catalog",
    limit: "all",
  });
  assert.deepEqual(editalPracticeSearch({ ...practiceEdition, id: "enem", contest_name: "ENEM" }), {
    edition: "enem",
    go: "1",
    mode: "catalog",
    limit: "all",
    contest: "ENEM",
  });
});

test("missing board is resolved from this paper only when unambiguous, never across distinct boards", () => {
  const e = { ...practiceEdition, exam_board: null };
  assert.equal(editalExamQuestions([paperQuestion], e).length, 1);
  assert.deepEqual(
    editalExamQuestions(
      [paperQuestion, { ...paperQuestion, id: "another-board", board: "FGV" }],
      e,
    ),
    [],
  );
  assert.deepEqual(editalExamQuestions([{ ...paperQuestion, board: "Não informada" }], e), []);
});
