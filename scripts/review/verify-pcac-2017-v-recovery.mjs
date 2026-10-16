// Run with: node --import ./scripts/alias.mjs THIS BEFORE AFTER CONTEXT REVIEW REPORT [--prepared]
import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {parseQuestion,isEligibleQuestion,splitExplanation} from '../../src/lib/questionFormat.ts';
import {sameReviewRow} from './publish-question-review.mjs';
const [beforePath,afterPath,contextPath,reviewPath,reportPath,mode]=process.argv.slice(2);
if(!reportPath||(mode&&mode!=='--prepared'))throw Error('BEFORE AFTER CONTEXT REVIEW REPORT [--prepared]');
const load=async p=>JSON.parse(await readFile(p,'utf8'));
const [before,after,context,review]=await Promise.all([beforePath,afterPath,contextPath,reviewPath].map(load));
const contexts=new Map(context.items.map(i=>[i.expected.id,i])),reviews=new Map(review.items.map(i=>[i.expected.id,i])),rows=new Map(after.map(r=>[r.id,r]));
assert.equal(before.length,after.length);assert.equal(rows.size,after.length);
for(const original of before){
 const repaired=contexts.get(original.id),decision=mode==='--prepared'?null:reviews.get(original.id);
 const expected=decision?{...decision.expected,...decision.patch}:repaired?{...repaired.expected,...repaired.patch}:original;
 const actual=rows.get(original.id);assert(sameReviewRow(actual,expected),`Unexpected field change: ${original.id}`);
 assert.equal(actual.official_answer,original.official_answer);assert.equal(actual.raw_extraction,original.raw_extraction);
}
for(const {expected} of context.items){const parsed=parseQuestion(rows.get(expected.id).question_text);assert(parsed.stem.length>10);assert.deepEqual(parsed.options.map(o=>o.letter),['A','B','C','D','E']);assert(parsed.options.every(o=>o.text.trim()));}
for(const item of review.items){const desired={...item.expected,...item.patch};assert.equal(isEligibleQuestion(desired),item.patch.content_status==='active');assert(splitExplanation(item.patch.review_note).example.length>40);}
const canonical=number=>after.find(r=>r.career_name==='Agente de Polícia Civil'&&r.item_number===number);
assert.deepEqual(parseQuestion(canonical(14).question_text).options.map(o=>o.text.trim()),['@','#','$','=','+']);
assert.deepEqual(parseQuestion(canonical(18).question_text).options.map(o=>o.text.trim()),['1/72','7/99','7/(3⁶)','1/(3¹⁸)','392/(9²)']);
assert.equal(Array.from({length:12},(_,i)=>2**i).reduce((a,b)=>a+b,0)+5,4100);
const choose=(n,k)=>Array.from({length:k},(_,i)=>(n-i)/(i+1)).reduce((a,b)=>a*b,1);
assert.equal([2,3,4].reduce((s,k)=>s+choose(4,k)*choose(7,6-k),0),371);assert.equal(7/(9*8*7),1/72);
const report={mode:mode==='--prepared'?'prepared':'published',verified_at:new Date().toISOString(),context_repairs_verified:context.items.length,complete_exam_records_compared:after.length,original_answers_and_raw_preserved:true,untargeted_records_preserved:before.filter(r=>!contexts.has(r.id)&&!reviews.has(r.id)).length,editorial_decisions_checked:review.items.length,active_eligible:review.items.filter(i=>isEligibleQuestion({...i.expected,...i.patch})).length,formula_and_math_checks:true};
await writeFile(reportPath,JSON.stringify(report,null,2)+'\n');console.log(report);
