import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isEligibleQuestion,parseQuestion,splitExplanation,questionAnswers} from '../../src/lib/questionFormat.ts';
const pack=JSON.parse(readFileSync(new URL('../../docs/reviews/cespe2016-held-official-conference-01-2026-10-17.json',import.meta.url)));
test('27 approved originals render full historical support, original command and author example',()=>{
  const approved=pack.decisions.filter(d=>d.publication_approved);
  assert.equal(approved.length,27);
  for(const d of approved){
    const row=d.row,support=pack.supports.find(s=>s.id===row.support_text_id);
    assert.equal(isEligibleQuestion(row),true);
    assert.ok(support.label.includes(String(row.exam_year)));
    assert.equal(row.question_text,d.original_instruction+'\n\n'+d.official_statement);
    const text=`Texto-base [${support.label}]:\n${support.body}\n\n[[/texto-base]]\n${row.question_text}`;
    const parsed=parseQuestion(text);
    assert.equal(parsed.base,support.body);assert.equal(parsed.stem,row.question_text);
    assert.ok(splitExplanation(row.review_note).example.length>50);
    assert.deepEqual(questionAnswers({source:'official',text,board:row.exam_board}),['C','E']);
  }
});
test('23 retained decisions have blockers and no public row',()=>{
  const held=pack.decisions.filter(d=>!d.publication_approved);assert.equal(held.length,23);
  for(const d of held){assert.equal(d.row,undefined);assert.ok(d.remaining_blockers.length>0);}
});
