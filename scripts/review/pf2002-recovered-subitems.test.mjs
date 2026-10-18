import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isEligibleQuestion,parseQuestion,questionAnswers} from '../../src/lib/questionFormat.ts';
const pack=JSON.parse(readFileSync(new URL('../../docs/reviews/cespe2016-pf2000-2002-recovered-sources-2026-10-18.json',import.meta.url)));
test('PF/2002 original subitems render complete context and compound identity with C/E controls',()=>{
 const approved=pack.decisions.filter(d=>d.publication_approved);assert.equal(approved.length,4);
 for(const d of approved){
  const row=d.row,parsed=parseQuestion(row.question_text);
  assert.equal(isEligibleQuestion(row),true);assert.equal(parsed.base,pack.support_body);
  assert.ok(parsed.stem.includes(`Questão 32 — Subitem ${d.original_subitem_number}`));
  assert.ok(parsed.stem.endsWith(d.official_statement));
  assert.deepEqual(questionAnswers({source:'curated',text:row.question_text,board:row.exam_board}),['C','E']);
 }
 assert.equal(pack.decisions[0].row,undefined);
});
