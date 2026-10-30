import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  normalizeImportText,
  parseBoardImport,
  planBoardImport,
  toBoardExamRow,
} from "../src/lib/questionImport.ts";

const question = (changes = {}) => ({
  board: "FGV",
  contest_name: "Prova sintética",
  career_name: "Agente",
  exam_year: 2026,
  exam_type: "Tipo 1",
  item_number: 1,
  subject: "Informática",
  stem: "Qual alternativa representa corretamente o conteúdo descrito?",
  options: {
    A: "Primeira alternativa",
    B: "Segunda alternativa",
    C: "Terceira alternativa",
    D: "Quarta alternativa",
  },
  official_answer: "B",
  source_url: "https://example.test/prova.pdf",
  answer_key_url: "https://example.test/gabarito.pdf",
  ...changes,
});

test("reimported content is detected with a new item number, booklet, URL and formatting", () => {
  const original = question({ id: "existing" });
  const incoming = question({
    item_number: 99,
    exam_type: "Tipo 2",
    source_url: "https://example.test/copia.pdf",
    stem: "  QUAL ALTERNATIVA\nrepresenta corretamente o conteúdo descrito?  ",
    options: {
      D: "Quarta alternativa",
      C: "Terceira alternativa",
      B: "Segunda alternativa",
      A: "Primeira alternativa",
    },
  });
  const plan = planBoardImport([incoming], [original]);
  assert.equal(plan.ready.length, 0);
  assert.equal(plan.duplicates, 1);
  assert.equal(plan.issues[0].existingId, "existing");
  assert.equal(plan.issues[0].origin, "catalog");
});

test("duplicates within a file are skipped and all conflicting answer keys block confirmation", () => {
  const q = question();
  const plan = planBoardImport(
    [q, question({ item_number: 2 }), question({ item_number: 3, official_answer: "A" })],
    [],
  );
  assert.equal(plan.ready.length, 1);
  assert.equal(plan.duplicates, 1);
  assert.equal(plan.conflicts, 1);
  assert.equal(plan.issues[1].reason, "answer_conflict");
  const legacy = [question(), question({ official_answer: "A", item_number: 4 })];
  assert.equal(planBoardImport([q], legacy).conflicts, 1);
});

test("a printed position occupied by a different question is not silently overwritten", () => {
  const plan = planBoardImport([question({ stem: "Outro enunciado." })], [question()]);
  assert.equal(plan.conflicts, 1);
  assert.equal(plan.issues[0].reason, "position_conflict");
});

test("shared passages never merge distinct questions; different contexts and figures survive", () => {
  const q = question({ support_text: "Texto de apoio comum." });
  for (const changes of [
    { stem: "Outra pergunta sobre o texto." },
    { support_text: "Outro texto de apoio." },
    { career_name: "Delegado" },
    { exam_year: 2025 },
    { board: "Outra banca" },
    { options: { ...q.options, A: "Resposta diferente" } },
    { figure_urls: ["https://example.test/figura.png"] },
  ])
    assert.equal(
      planBoardImport([question({ ...q, item_number: 2, ...changes })], [q]).ready.length,
      1,
    );
});

test("incomplete visual items remain separate until their figures are restored", () => {
  const q = question({ needs_visual: true });
  assert.equal(planBoardImport([question({ ...q, item_number: 2 })], [q]).ready.length, 1);
});

test("normalization handles Unicode spacing without deleting accents, math signs or numbers", () => {
  assert.equal(normalizeImportText(" Cafe\u0301\u00a0\n A\u200b "), "café a");
  assert.notEqual(normalizeImportText("ano"), normalizeImportText("anão"));
  assert.notEqual(normalizeImportText("x < 10"), normalizeImportText("x > 10"));
  assert.notEqual(normalizeImportText("x > 10"), normalizeImportText("x > 100"));
});

test("validation forces review and cannot trust IDs or fingerprint columns from a file", () => {
  const [q] = parseBoardImport([
    question({
      id: "fake",
      content_status: "active",
      import_content_key: "fake",
      import_unique_key: "fake",
    }),
  ]);
  assert.equal(q.content_status, "under_review");
  assert.equal(q.id, undefined);
  assert.equal(q.import_content_key, undefined);
  assert.equal(q.import_unique_key, undefined);
  for (const value of [
    [],
    [null],
    [question({ options: {} })],
    [question({ official_answer: "Z" })],
    [question({ stem: " " })],
    [question({ source_url: "javascript:alert(1)" })],
  ])
    assert.throws(() => parseBoardImport(value));
});

test("the actual repository import file remains accepted, including held visual questions", () => {
  const rows = parseBoardImport(
    JSON.parse(
      fs.readFileSync(
        new URL("../supabase/imports/fgv/fgv_questions.json", import.meta.url),
        "utf8",
      ),
    ),
  );
  assert.equal(rows.length, 754);
  assert(rows.every((q) => q.content_status === "under_review"));
  const repeated = planBoardImport(rows, rows);
  assert.equal(repeated.ready.length, 0);
  assert.equal(repeated.duplicates, 754);
});

test("the IDECAN repository import file is accepted and its review metadata survives the table mapping", () => {
  const rows = parseBoardImport(
    JSON.parse(
      fs.readFileSync(
        new URL("../supabase/imports/idecan/idecan_questions.json", import.meta.url),
        "utf8",
      ),
    ),
  );
  assert.equal(rows.length, 273);
  assert(rows.every((q) => q.content_status === "under_review"));
  assert.equal(rows.filter((q) => q.support_text).length, 30);
  assert.equal(rows.filter((q) => "legal_review" in q).length, 65);
  assert.equal(rows.filter((q) => q.answer_key_status === "preliminar").length, 0);
  const mapped = rows.map(toBoardExamRow);
  assert(mapped.every((r) => !("legal_review" in r) && !("answer_key_status" in r)));
  const verified = mapped.filter((_, i) => typeof rows[i].legal_review === "object");
  assert.equal(verified.length, 65);
  assert(
    verified.every(
      (r) =>
        r.legal_review_required === false &&
        r.law_version_checked_at === "2026-10-22T12:00:00Z" &&
        Array.isArray(r.legal_basis) &&
        r.legal_basis.length === 1 &&
        String(r.legal_basis[0].url).startsWith("https://"),
    ),
  );
  const preliminar = mapped.filter((_, i) => rows[i].answer_key_status === "preliminar");
  assert.equal(preliminar.length, 0);
  assert(
    preliminar.every((r) =>
      String(r.review_note).includes("Gabarito preliminar"),
    ),
  );
  assert(mapped.filter((_, i) => rows[i].answer_key_status === "definitivo").every((r) => !r.review_note));
  const repeated = planBoardImport(rows, rows);
  assert.equal(repeated.ready.length, 0);
  assert.equal(repeated.duplicates, 273);
});
