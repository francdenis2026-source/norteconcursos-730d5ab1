import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { digest } from "./import-question-corpus.mjs";
import { reviewChanges, run } from "./review-question-corpus.mjs";
function fixture() {
  const id = digest("synthetic review source");
  return {
    source: { id, title: "Synthetic", publisher: "Test", page_count: 1, raw_text: "Synthetic" },
    candidates: [
      {
        id: digest(id + ":one"),
        corpus_id: id,
        source_key: "one",
        source_page: 1,
        discipline: "Teste",
        content_status: "under_review",
        payload: { raw_text: "Synthetic stem", key: "one", page: 1, answer: "A" },
      },
    ],
  };
}
function decision() {
  const x = fixture();
  x.candidates[0].content_status = "rejected";
  x.candidates[0].payload.individual_review = {
    publication_approved: false,
    explanation: "Insufficient data",
  };
  return x;
}
test("review records expected payload for optimistic concurrency", () => {
  const [x] = reviewChanges(fixture(), decision());
  assert.equal(x.expected_status, "under_review");
  assert.equal(x.expected_payload.raw_text, "Synthetic stem");
  assert.equal(x.next_status, "rejected");
});
test("review cannot replace original stem, answer, page or provenance", () => {
  for (const field of ["raw_text", "answer", "page", "key"]) {
    const next = decision();
    next.candidates[0].payload[field] = "changed";
    assert.throws(() => reviewChanges(fixture(), next), /Extração/);
  }
});
test("existing decisions cannot be overwritten", () => {
  const old = decision(),
    next = structuredClone(old);
  next.candidates[0].payload.individual_review.explanation = "Different";
  assert.throws(() => reviewChanges(old, next), /protegida/);
  assert.deepEqual(reviewChanges(old, old), []);
});
test("dry review makes no database requests", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "corpus-review-"));
  const files = ["old", "next", "report"].map((x) => path.join(dir, x + ".json"));
  fs.writeFileSync(files[0], JSON.stringify(fixture()));
  fs.writeFileSync(files[1], JSON.stringify(decision()));
  const fetch = global.fetch;
  global.fetch = () => {
    throw Error("Unexpected network");
  };
  try {
    assert.equal((await run(...files, "--dry-run")).decisions, 1);
  } finally {
    global.fetch = fetch;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

function heldFixture() {
  const x = decision();
  x.candidates[0].content_status = "reviewed";
  return x;
}
function refinement() {
  const x = heldFixture();
  Object.assign(x.candidates[0].payload.individual_review, {
    explanation: "Verified with the primary source",
    refinement_reason: "Primary source resolves the previous ambiguity",
    primary_evidence: [
      {
        url: "https://example.org/official",
        title: "Synthetic primary source",
        verified: true,
        checked_at: new Date().toISOString(),
      },
    ],
  });
  return x;
}
test("held refinement requires evidence and preserves extraction", () => {
  assert.equal(reviewChanges(heldFixture(), refinement(), true).length, 1);
  const bad = refinement();
  bad.candidates[0].payload.individual_review.primary_evidence = [];
  assert.throws(() => reviewChanges(heldFixture(), bad, true), /evidência/);
  bad.candidates[0].payload.answer = "B";
  assert.throws(() => reviewChanges(heldFixture(), bad, true), /Extração/);
});
test("refinement cannot change approved or excluded decisions", () => {
  const approved = heldFixture();
  approved.candidates[0].payload.individual_review.publication_approved = true;
  assert.throws(() => reviewChanges(approved, refinement(), true), /protegida/);
  assert.throws(() => reviewChanges(decision(), refinement(), true), /protegida/);
  assert.throws(() => reviewChanges(fixture(), refinement(), true), /protegida/);
});
