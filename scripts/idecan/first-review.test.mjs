import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { reviewChanges } from '../review-question-corpus.mjs';
import { validateCorpus } from '../import-question-corpus.mjs';
import { buildReview, reviewSql } from './build-first-review.mjs';
const root = 'supabase/imports/idecan';
const directory = root + '/revisao-2026-10-23';
const json = (file) => JSON.parse(fs.readFileSync(file));
const notes = json(directory + '/pareceres-portugues.json'), support = json(directory + '/textos-apoio.json');
const changes = [];
for (const role of ['inspetor', 'escrivao']) {
  test(`${role}: original extraction survives each individual decision`, () => {
    const original = json(`${root}/pcce_${role}_2021_corpus.json`);
    const { next, changes: delta } = buildReview(original, role, notes, support);
    changes.push(...delta);
    assert.deepEqual(next, json(`${directory}/pcce_${role}_2021_revisado.json`));
    validateCorpus(next);
    assert.equal(delta.length, role === 'inspetor' ? 10 : 13);
    for (let i = 0; i < original.candidates.length; i++) {
      const old = original.candidates[i], current = next.candidates[i];
      const { individual_review: review, ...extraction } = current.payload;
      assert.deepEqual(extraction, old.payload);
      if (review) {
        assert.equal(review.publication_approved, false);
        assert(!current.payload.publication);
      }
      if (i < 10) {
        assert.equal(review.restored_context.support_passage.lines.length, role === 'inspetor' ? 31 : 26);
        assert.equal(review.answer_verified, role === 'escrivao');
      }
    }
    assert.equal(reviewChanges(original, next).length, delta.length);
  });
}
test('document ambiguity and two pedagogical doubts are not silently resolved', () => {
  const pack = json(directory + '/pcce_inspetor_2021_revisado.json');
  assert(pack.candidates.slice(0,10).every((c) => !c.payload.individual_review.answer_verified));
  for (const n of [7,9]) assert.equal(pack.candidates[n-1].payload.individual_review.pedagogical_check_complete, false);
  assert(pack.candidates.slice(0,10).every((c) => c.payload.individual_review.blockers.includes('vinculo_a_topico_de_edital_ativo_nao_conferido')));
});
test('only the three confirmed Escrivão annulments are rejected', () => {
  const pack = json(directory + '/pcce_escrivao_2021_revisado.json');
  assert.deepEqual(pack.candidates.filter((c) => c.content_status === 'rejected').map((c) => c.payload.item_number), [18,43,79]);
  const queue = json(directory + '/fila-revisao.json');
  assert.equal(queue.items.filter((x) => x.triage_only).length, 177);
  assert(queue.items.every((x) => x.publication_approved === false));
  assert.equal(queue.remote_application_verified, false);
});
test('manual SQL artifact uses reviewed changes and does not permit publication', () => {
  const all = ['inspetor','escrivao'].flatMap((role) => buildReview(json(`${root}/pcce_${role}_2021_corpus.json`),role,notes,support).changes);
  assert.equal(reviewSql(all), fs.readFileSync(directory + '/aplicar-primeira-revisao.sql','utf8'));
  all[0].next_payload.individual_review.publication_approved=true;
  assert.throws(() => reviewSql(all), /não autoriza publicação/);
});
