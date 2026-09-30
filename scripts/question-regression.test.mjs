import test from "node:test";
import assert from "node:assert/strict";
import {
  parseQuestion,
  questionAnswers,
  questionAnswerLabel,
  isLegallyVerified,
  isEligibleQuestion,
} from "../src/lib/questionFormat.ts";
import { fetchAllRows } from "../src/lib/catalog.ts";

const question = {
  text: "Julgue o item a seguir. Uma afirmação.",
  source: "curated",
  board: "IBADE",
};
test("authorial judgment does not inherit multiple choice from the board", () => {
  assert.deepEqual(questionAnswers(question), ["C", "E"]);
  assert.equal(questionAnswerLabel("C", question), "Certo");
});
test("Cebraspe multiple-choice booklet preserves its actual alternatives", () => {
  const q = {
    ...question,
    source: "official",
    board: "Cebraspe",
    text: "Escolha.\n(A) Um\n(B) Dois\n(C) Três\n(D) Quatro\n(E) Cinco",
  };
  assert.deepEqual(questionAnswers(q), ["A", "B", "C", "D", "E"]);
  assert.equal(questionAnswerLabel("C", q), "Alternativa C");
});
test("inline parenthesized and legacy alternatives preserve their contents", () => {
  for (const text of [
    "Escolha (A) Um; (B) Dois; (C) Três; (D) Quatro",
    "Escolha A) Um; B) Dois; C) Três; D) Quatro",
  ]) {
    const parsed = parseQuestion(text);
    assert.equal(parsed.stem, "Escolha");
    assert.deepEqual(
      parsed.options.map((o) => o.text),
      ["Um", "Dois", "Três", "Quatro"],
    );
  }
});
test("personal multiple choice with correct answer C retains all choices", () => {
  assert.deepEqual(
    questionAnswers({
      ...question,
      source: "personal",
      board: "Meu caderno",
      answer: "C",
      text: "Escolha (A) Um; (B) Dois; (C) Três; (D) Quatro",
    }),
    ["A", "B", "C", "D"],
  );
});
test("legal gates reject missing evidence, invalid dates and mixed sources", () => {
  const official = { url: "https://www.planalto.gov.br/ccivil_03/leis/l9455.htm" };
  assert.equal(isLegallyVerified([], null, true), false);
  assert.equal(isLegallyVerified([], null, false), true);
  assert.equal(isLegallyVerified([official], "invalid"), false);
  assert.equal(isLegallyVerified([official], "2999-01-01"), false);
  assert.equal(
    isLegallyVerified([official, { url: "https://example.org/lei" }], "2020-01-01"),
    false,
  );
  assert.equal(
    isLegallyVerified([{ url: "https://planalto.gov.br.evil.example/lei" }], "2020-01-01"),
    false,
  );
  assert.equal(isLegallyVerified([official], "2020-01-01"), true);
});
test("draft, missing legal evidence, cancelled and pending context stay outside training", () => {
  const row = {
    content_status: "active",
    subject: "Informática",
    legal_basis: [],
    official_answer: "C",
  };
  assert.equal(isEligibleQuestion(row), true);
  for (const patch of [
    { content_status: "under_review" },
    { content_status: "draft" },
    { official_answer: "X" },
    { subject: "Direito Penal" },
    { context_review_required: true },
  ])
    assert.equal(isEligibleQuestion({ ...row, ...patch }), false);
});
test("pagination handles a server cap below requested page size without gaps", async () => {
  const all = Array.from({ length: 7 }, (_, id) => ({ id }));
  assert.deepEqual(
    await fetchAllRows(
      (from, to) =>
        Promise.resolve({ data: all.slice(from, Math.min(to + 1, from + 2)), error: null }),
      5,
    ),
    all,
  );
});
test("pagination does not silently accept failed requests", async () => {
  await assert.rejects(
    fetchAllRows(() => Promise.resolve({ data: null, error: new Error("offline") })),
    /offline/,
  );
});
