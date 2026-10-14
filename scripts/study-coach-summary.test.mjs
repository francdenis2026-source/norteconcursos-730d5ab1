import test from 'node:test';
import assert from 'node:assert/strict';
import { coachWeekSummary } from '../src/lib/studyCoachSummary.ts';
const schedule = [{day:1, blocks:[{key:'a',subject:'Português'},{key:'b',subject:'Direito'}]}];
test('weekly coach progress excludes other plans, weeks, unknown keys and duplicates', () => {
 const check = {plan_id:'p',week_start:'2026-10-12',block_key:'a'};
 const result = coachWeekSummary(schedule,[check,check,{...check,block_key:'b',plan_id:'other'},{...check,block_key:'b',week_start:'2026-10-05'},{...check,block_key:'unknown'}],'p','2026-10-12',1);
 assert.equal(result.completed,1); assert.equal(result.percentage,50); assert.equal(result.nextBlock.key,'b');
});
test('empty and rest days do not invent scheduled work', () => {
 assert.equal(coachWeekSummary([],[],'p','2026-10-12',1).percentage,0);
 assert.equal(coachWeekSummary(schedule,[],'p','2026-10-12',0).nextBlock,undefined);
});
test('completed day has no pending recommendation', () => {
 const checks=['a','b'].map(block_key=>({block_key,plan_id:'p',week_start:'2026-10-12'}));
 const result=coachWeekSummary(schedule,checks,'p','2026-10-12',1);
 assert.equal(result.percentage,100); assert.equal(result.nextBlock,undefined);
});
