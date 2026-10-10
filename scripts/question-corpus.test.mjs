import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { digest, validateCorpus, run } from "./import-question-corpus.mjs";
function fixture() {
  const id = digest("public synthetic fixture");
  return {
    source: {
      id,
      title: "Fixture",
      publisher: "Teste",
      page_count: 2,
      raw_text: "Texto sintético",
    },
    candidates: [
      {
        id: digest(id + ":Direito:1"),
        corpus_id: id,
        source_key: "Direito:1",
        discipline: "Direito Penal",
        source_page: 1,
        content_status: "under_review",
        payload: { raw_text: "Exemplo sintético" },
      },
    ],
  };
}
function approved() {
  const x = fixture(),
    c = x.candidates[0];
  c.content_status = "reviewed";
  c.payload.individual_review = {
    publication_approved: true,
    context_complete: true,
    answer_verified: true,
    legal_current: true,
    explanation: "Revisão sintética para testar validação.",
  };
  c.payload.publication = {
    syllabus_topic_id: "topic",
    subject: "Direito Penal",
    question_text: "Exemplo\n(A) Um\n(B) Dois\n(C) Três\n(D) Quatro",
    official_answer: "A",
    is_original: false,
    content_status: "active",
    law_version_checked_at: "2026-01-01",
    legal_basis: [{ url: "https://www.planalto.gov.br/ccivil_03/leis/teste.htm" }],
  };
  return x;
}
test("same printed number with distinct occurrence keeps distinct provenance", () => {
  const a = fixture(),
    c = structuredClone(a.candidates[0]);
  c.source_key += ":2";
  c.id = digest(c.corpus_id + ":" + c.source_key);
  a.candidates.push(c);
  assert.equal(validateCorpus(a).candidates.length, 2);
});
test("rejects invented id or duplicate occurrence", () => {
  const a = fixture();
  a.candidates[0].id = digest("wrong");
  assert.throws(() => validateCorpus(a), /Candidato/);
});
test("legal label cannot bypass official-source verification", () => {
  const a = approved();
  a.candidates[0].payload.legal_review_required = false;
  a.candidates[0].payload.publication.legal_basis = [];
  assert.throws(() => validateCorpus(a), /jurídica/);
});
test("review does not authorize missing alternatives", () => {
  const a = approved();
  a.candidates[0].payload.publication.question_text = "Exemplo\n(A) Um\n(C) Três\n(D) Quatro";
  assert.throws(() => validateCorpus(a), /Alternativas/);
});
test("empty figure alternatives cannot be published", () => {
  const a = approved();
  a.candidates[0].payload.publication.question_text = "Exemplo\n(A) Um\n(B)\n(C) Três\n(D) Quatro";
  assert.throws(() => validateCorpus(a), /sem conteúdo/);
});
test("future legal check and unofficial host are rejected", () => {
  for (const [k, v] of [
    ["law_version_checked_at", "2999-01-01"],
    ["legal_basis", [{ url: "https://planalto.gov.br.example.com/fake" }]],
  ]) {
    const a = approved();
    a.candidates[0].payload.publication[k] = v;
    assert.throws(() => validateCorpus(a), /jurídica/);
  }
});
test("quarantined original cannot be published by a rerun", () => {
  const a = approved();
  a.candidates[0].content_status = "obsolete";
  assert.throws(() => validateCorpus(a), /revisão individual/);
});
test("dry run validates without contacting database", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "corpus-test-"));
  const input = path.join(dir, "pack.json"),
    report = path.join(dir, "report.json");
  fs.writeFileSync(input, JSON.stringify(fixture()));
  const original = global.fetch;
  global.fetch = () => {
    throw Error("Network not allowed");
  };
  try {
    assert.equal((await run(input, report, "--dry-run")).catalogued, 1);
    assert.equal(JSON.parse(fs.readFileSync(report)).complete, true);
  } finally {
    global.fetch = original;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
