import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isEligibleQuestion, parseQuestion, splitExplanation, questionAnswers, hasReviewedExplanation, basisHref } from '../../src/lib/questionFormat.ts';

const pack = JSON.parse(readFileSync(new URL('../../docs/reviews/cespe2016-adapted-cpc-publication-01-2026-10-17.json', import.meta.url)));

test('published adaptations remain eligible and render as true/false with a distinct example', () => {
  for (const { row } of pack.items) {
    assert.equal(isEligibleQuestion(row), true);
    const question = { source: 'curated', text: row.question_text, board: row.exam_board,
      explanation: row.explanation, legalBasis: row.legal_basis,
      checkedAt: row.law_version_checked_at, subject: row.subject };
    assert.deepEqual(questionAnswers(question), ['C', 'E']);
    assert.equal(parseQuestion(row.question_text).options.length, 0);
    assert.ok(splitExplanation(row.explanation).example.length > 80);
    assert.equal(hasReviewedExplanation(question), true);
    for (const basis of row.legal_basis) assert.match(basisHref(basis), /#art\d+$/);
  }
});

test('new wording and current answers cannot be presented as original CESPE exam items', () => {
  assert.equal(pack.original_exam_items_published, 0);
  for (const item of pack.items) {
    assert.equal(item.kind, 'author_adaptation_not_original_exam');
    assert.equal(item.row.exam_board, 'Autoral (adaptação)');
    assert.match(item.row.question_text, /^Treino adaptado e atualizado/);
    assert.match(item.row.explanation, /não uma certificação da resposta histórica/);
    assert.ok(item.row.external_item_key.endsWith(item.origin_candidate_id));
  }
});
