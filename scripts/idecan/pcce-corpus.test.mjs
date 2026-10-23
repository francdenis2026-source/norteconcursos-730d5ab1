import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateCorpus, digest } from '../import-question-corpus.mjs';
import { stagingSql } from './prepare-staging.mjs';
const load = (career) => JSON.parse(fs.readFileSync(new URL(`../../supabase/imports/idecan/pcce_${career}_2021_corpus.json`, import.meta.url)));
for (const career of ['inspetor', 'escrivao']) {
  test(`${career}: complete historical paper, traceable pages and no publication`, () => {
    const pack = validateCorpus(load(career));
    assert.equal(pack.candidates.length, 100);
    assert.equal(pack.source.metadata.booklet_sha256, pack.source.id);
    assert.deepEqual(pack.candidates.map((c) => c.payload.item_number), Array.from({ length: 100 }, (_, i) => i + 1));
    assert(pack.candidates.every((c) => c.content_status === 'under_review' && !c.payload.publication));
    assert(pack.candidates.every((c) => c.id === digest(pack.source.id + ':' + c.source_key)));
    assert(pack.candidates.every((c) => c.payload.source_pages.includes(c.source_page) && c.payload.source_pages.every((p) => p <= pack.source.page_count)));
    assert(pack.candidates.every((c) => c.payload.alternative_labels_extracted.join('') === 'ABCDE'));
    assert(pack.candidates.filter((c) => /DIREITO|LEGISLAÇÃO/.test(c.discipline)).every((c) => c.payload.legal_review_required));
    assert(pack.candidates.every((c) => c.payload.syllabus_mapping_required && c.payload.context_review_required));
  });
}
test('official document ambiguity and annulments survive staging', () => {
  const inspector = load('inspetor'), clerk = load('escrivao');
  assert.equal(inspector.source.metadata.answer_key_section_heading, 'preliminar_in_document_listed_as_final');
  assert(inspector.candidates.every((c) => c.payload.answer_key_requires_clarification));
  assert(clerk.candidates.every((c) => !c.payload.answer_key_requires_clarification));
  assert.deepEqual(clerk.candidates.filter((c) => c.payload.annulled_in_document).map((c) => c.payload.item_number), [18, 43, 79]);
  assert.deepEqual(inspector.candidates.filter((c) => c.payload.annulled_in_document).map((c) => c.payload.item_number), [17, 68, 76, 77, 90]);
  assert.equal(clerk.candidates[0].payload.answer_in_official_document, 'B');
  assert.equal(inspector.candidates[0].payload.answer_in_official_document, 'D');
});
test('SQL generator refuses publication and matches the reviewed artifact', () => {
  const packs = [load('inspetor'), load('escrivao')];
  assert.equal(stagingSql(packs), fs.readFileSync(new URL('../../supabase/imports/idecan/pcce_2021_acervo_privado.sql', import.meta.url), 'utf8'));
  packs[0].candidates[0].content_status = 'reviewed';
  assert.throws(() => stagingSql(packs), /acervo privado/);
});
