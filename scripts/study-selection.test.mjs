import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveStudySelection } from "../src/lib/studySelection.ts";

const subjects = ["Língua Portuguesa", "Direito Penal", "Matemática"];

test("usa a disciplina da URL quando ela existe na lista", () => {
  assert.deepEqual(
    resolveStudySelection({ subjects, suggested: "Matemática", urlSubject: "Direito Penal", urlTopic: "Crimes contra a vida" }),
    { subject: "Direito Penal", topic: "Crimes contra a vida" },
  );
});

test("ignora disciplina da URL inexistente e cai na última escolha salva", () => {
  assert.deepEqual(
    resolveStudySelection({ subjects, suggested: "Matemática", urlSubject: "Inexistente", saved: { subject: "Direito Penal", topic: "Furto" } }),
    { subject: "Direito Penal", topic: "Furto" },
  );
});

test("sem escolha salva, usa a matéria sugerida pelo plano, sem assunto", () => {
  assert.deepEqual(resolveStudySelection({ subjects, suggested: "Matemática" }), { subject: "Matemática", topic: "" });
});

test("sem sugestão válida, usa a primeira disciplina", () => {
  assert.deepEqual(resolveStudySelection({ subjects, suggested: "" }), { subject: "Língua Portuguesa", topic: "" });
});

test("enquanto a lista carrega, aceita o valor da URL sem validar", () => {
  assert.deepEqual(resolveStudySelection({ subjects: [], suggested: "", urlSubject: "Direito Penal", urlTopic: "Furto" }), { subject: "Direito Penal", topic: "Furto" });
});

test("assunto salvo só vale para a mesma disciplina", () => {
  assert.deepEqual(
    resolveStudySelection({ subjects, suggested: "Matemática", urlSubject: "Matemática", saved: { subject: "Direito Penal", topic: "Furto" } }),
    { subject: "Matemática", topic: "" },
  );
});
