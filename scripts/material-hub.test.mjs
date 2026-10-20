import test from "node:test";
import assert from "node:assert/strict";
import { hubLaws, hubSubjects, subjectIcon, EXPECTED_SUBJECTS } from "../src/lib/materialHub.ts";

const item = (slug, discipline, extra = {}) => ({ slug, discipline, law_course_slug: null, ...extra });

test("expected disciplines always appear, with or without material", () => {
  const subjects = hubSubjects([item("a", "Português"), item("b", "Língua Portuguesa"), item("c", "Química")]);
  const names = subjects.map((s) => s.name);
  for (const { name } of EXPECTED_SUBJECTS) assert.ok(names.includes(name === "Matemática" ? "Matemática" : name), name);
  assert.equal(subjects.find((s) => s.name === "Língua Portuguesa").count, 2, "aliases are merged");
  assert.equal(subjects.find((s) => s.name === "Química").count, 1);
  assert.equal(subjects.find((s) => s.name === "Física").count, 0);
});

test("other disciplines found in the library are appended after the expected ones", () => {
  const subjects = hubSubjects([item("a", "Geografia"), item("b", "Atualidades")]);
  const names = subjects.map((s) => s.name);
  assert.equal(names.slice(0, EXPECTED_SUBJECTS.length).join("|"), EXPECTED_SUBJECTS.map((s) => s.name).join("|"));
  assert.deepEqual(names.slice(EXPECTED_SUBJECTS.length), ["Atualidades", "Geografia"]);
});

test("legislation and subjects never mix", () => {
  const items = [item("x", "Português"), item("y", "Legislação Penal Extravagante"), item("z", "Direito Constitucional")];
  assert.ok(!hubSubjects(items).some((s) => /legisla|constitucional/i.test(s.name) && s.count > 0));
  assert.ok(hubLaws(items).every((l) => !/portugu/i.test(l.name)));
  assert.equal(hubLaws(items).length, 2);
});

test("icons follow the subject name", () => {
  assert.equal(subjectIcon("Física"), "fisica");
  assert.equal(subjectIcon("Raciocínio Lógico"), "logica");
  assert.equal(subjectIcon("Contabilidade Geral"), "contabilidade");
  assert.equal(subjectIcon("Geografia"), "geral");
});
