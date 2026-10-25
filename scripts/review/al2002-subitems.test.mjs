import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isEligibleQuestion,parseQuestion,splitExplanation,questionAnswers} from '../../src/lib/questionFormat.ts';
const pack=JSON.parse(readFileSync(new URL('../../docs/reviews/cespe2016-al2002-subitems-release-01-2026-10-17.json',import.meta.url)));
test('original imported subitems render full dated support, compound identity, command and C/E controls',()=>{
  const approved=pack.decisions.filter(d=>d.publication_approved);assert.equal(approved.length,9);
  for(const d of approved){
    const row=d.row,parsed=parseQuestion(row.question_text);
    assert.equal(isEligibleQuestion(row),true);assert.equal(parsed.base,pack.support_body);
    assert.ok(parsed.stem.includes(`Questão ${d.original_question_number} — Subitem ${d.original_subitem_number}`));
    assert.ok(parsed.stem.includes(d.original_instruction));assert.ok(parsed.stem.endsWith(d.official_statement));
    assert.deepEqual(questionAnswers({source:'curated',text:row.question_text,board:row.exam_board}),['C','E']);
    assert.ok(splitExplanation(row.explanation).example.length>50);assert.equal(row.is_original,false);
  }
});
test('historical temporal comparison remains anchored to the source date',()=>{
  const d=pack.decisions.find(d=>d.source_item_index_zero_based===66);
  assert.ok(d.row.question_text.includes('26/12/2001'));assert.match(d.row.explanation,/1991/);assert.equal(d.row.official_answer,'C');
  assert.equal(pack.decisions.find(d=>d.source_item_index_zero_based===59).row,undefined);
});
