import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isEligibleQuestion,parseQuestion,splitExplanation,questionAnswers} from '../../src/lib/questionFormat.ts';

const pack=JSON.parse(readFileSync(new URL('../../docs/reviews/cespe2016-stf2008-original-release-01-2026-10-17.json',import.meta.url)));
test('original items render the complete historical support and original command with C/E answers',()=>{
  for(const item of pack.items){
    const row=item.row,support=pack.supports.find(s=>s.id===row.support_text_id);
    assert.equal(isEligibleQuestion(row),true);
    assert.match(support.label,/2008/);
    assert.equal(row.question_text,item.original_instruction+'\n\n'+item.official_statement);
    const text=`Texto-base [${support.label}]:\n${support.body}\n\n[[/texto-base]]\n${row.question_text}`;
    const parsed=parseQuestion(text);
    assert.equal(parsed.base,support.body);assert.equal(parsed.stem,row.question_text);
    assert.ok(splitExplanation(row.review_note).example.length>50);
    assert.deepEqual(questionAnswers({source:'official',text,board:row.exam_board}),['C','E']);
  }
});
