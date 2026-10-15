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
