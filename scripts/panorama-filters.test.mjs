import test from "node:test";
import assert from "node:assert/strict";
import { normalizePanoramaRow, panoramaCareer, panoramaFilterState, filterPanoramaRows } from "../src/lib/panoramaFilters.ts";

const row = (contest, career, scope = "estadual", family = "Polícia Civil", year = 2025) => normalizePanoramaRow({ contest_name: contest, career_name: career, exam_year: year, exam_board: "Cebraspe", subject: "Noções de Direito Penal", items: 3, scope, family });
const rows = [
  ...["Agente de Polícia", "Agente de Polícia Civil", "Agente de Polícia Judiciária"].map(name => row("Polícia Civil de Pernambuco", name)),
  ...["Escrivão de Polícia", "Escrivão de Polícia Civil"].map(name => row("Polícia Civil de Pernambuco", name)),
  ...["Investigador de Polícia", "Investigador de Polícia I", "Oficial Investigador de Polícia"].map(name => row("Polícia Civil de Minas Gerais", name)),
  row("Polícia Federal", "Agente de Polícia", "estadual", "Outros órgãos"),
  row("Polícia Federal", "Delegado de Polícia Federal", "federal", "Polícia Federal"),
  row("Polícia Civil do Ceará", "Delegado de Polícia Civil"),
  row("Departamento Penitenciário Nacional", "Departamento Penitenciário Nacional", "federal", "Polícia Penal", 2021),
  row("Polícia Penal do Acre", "Agente de Polícia Penal", "estadual", "Polícia Penal"),
  row("Polícia Civil de Minas Gerais", "Perito Criminal – Área I"),
  row("Polícia Civil de Minas Gerais", "Perito Criminal – Área II"),
];
test("equivalent PC titles form one option and preserve every historical count", () => {
  const state = panoramaFilterState(rows, { scope: "estadual", family: "Polícia Civil", role: "all" });
  assert.equal(state.roles.filter(name => name === "Agente de Polícia Civil").length, 1);
  assert.ok(!state.roles.includes("Agente de Polícia"));
  assert.ok(!state.roles.includes("Investigador de Polícia I"));
  assert.ok(state.roles.includes("Oficial Investigador"));
  assert.ok(state.roles.includes("Perito Criminal – Área I"));
  assert.ok(state.roles.includes("Perito Criminal – Área II"));
  assert.equal(filterPanoramaRows(rows, { ...state.filters, role: "Agente de Polícia Civil" }).reduce((sum, r) => sum + r.items, 0), 9);
  assert.ok(rows.every(r => r.raw_career_name));
});
test("PF and PC roles are distinct even when their raw labels are identical", () => {
  const federal = panoramaFilterState(rows, { scope: "federal", family: "Polícia Federal", role: "all" });
  assert.deepEqual(federal.roles, ["all", "Agente de Polícia Federal", "Delegado de Polícia Federal"]);
  assert.equal(filterPanoramaRows(rows, { ...federal.filters, role: "Agente de Polícia Federal" }).length, 1);
  assert.ok(!federal.families.includes("Polícia Civil"));
  assert.equal(panoramaCareer("Delegado de Polícia", "Polícia Civil do Ceará", 2025), "Delegado de Polícia Civil");
});
test("organization incorrectly stored as a role is repaired only for the confirmed edition", () => {
  assert.equal(rows.find(r => r.contest_name === "Departamento Penitenciário Nacional").career_name, "Agente Federal de Execução Penal");
  assert.equal(panoramaCareer("Departamento Penitenciário Nacional", "Departamento Penitenciário Nacional", 2030), "Departamento Penitenciário Nacional");
  assert.equal(row("PRF", "Polícia Rodoviária Federal").scope, "federal");
});
test("invalid child filters reset within the selected parent without returning impossible results", () => {
  const state = panoramaFilterState(rows, { scope: "estadual", family: "Polícia Federal", role: "Delegado de Polícia Federal" });
  assert.equal(state.filters.family, "all");
  assert.equal(state.filters.role, "all");
  assert.ok(!state.roles.includes("Delegado de Polícia Federal"));
  assert.ok(!state.scopes.includes("municipal"));
  const shrunk = panoramaFilterState(rows.filter(r => r.family === "Polícia Federal"), { scope: "all", family: "Polícia Civil", role: "Investigador de Polícia" });
  assert.equal(shrunk.filters.family, "all");
  assert.equal(shrunk.filters.role, "all");
  assert.ok(filterPanoramaRows(rows, state.filters).every(r => r.scope === "estadual"));
});
test("normalization is idempotent and original role stays available for linking syllabus topics", () => {
  for (const item of rows) assert.deepEqual(normalizePanoramaRow(item), item);
});
