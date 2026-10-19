import test from 'node:test';
import assert from 'node:assert/strict';
import { activityDateRange,activityPracticeSearch,freshActivityQuestions,otherStudentStats } from '../src/lib/dailyStudyActivity.ts';
test('daily and seven-day history use exclusive Acre boundaries, including month changes',()=>{
 assert.deepEqual(activityDateRange('2026-11-01'),{start:'2026-11-01T05:00:00.000Z',end:'2026-11-02T05:00:00.000Z'});
 assert.deepEqual(activityDateRange('2026-11-01',true),{start:'2026-10-26T05:00:00.000Z',end:'2026-11-02T05:00:00.000Z'});
 assert.throws(()=>activityDateRange('2026-02-30'));
});
const q=(id,extra={})=>({id,source:'official',subject:'Língua Portuguesa',testedTopic:'Concordância verbal',text:'Enunciado '+id,...extra});
test('new practice excludes all seen identities and duplicate text, preserving exact discipline and topic',()=>{
 const catalog=[q('trainer'),q('simulator'),q('reinforced'),q('copy',{text:'Enunciado trainer'}),q('new'),q('another-topic',{testedTopic:'Crase'}),q('another-subject',{subject:'Direito Penal'})];
 const result=freshActivityQuestions(catalog,new Set(['official:trainer','official:simulator','official:reinforced']),'Língua Portuguesa','Concordância verbal');
 assert.deepEqual(result.map(q=>q.id),['new']);
 assert.deepEqual(freshActivityQuestions([q('no-topic',{testedTopic:null})],new Set(),'Língua Portuguesa','Crase'),[]);
});
test('practice links carry new-only mode and known topic without fabricated classifications',()=>{
 const search=activityPracticeSearch(q('known'),'unique-click');
 assert.equal(search.unseen,'1');assert.equal(search.studyTopic,'Concordância verbal');assert.equal(search.go,'1');assert.equal(search.subject,'Língua Portuguesa');
 assert.equal(activityPracticeSearch({subject:'Matemática',text:''},'click').studyTopic,undefined);
});
test('other-student mean excludes the owner, requires five peers and rejects inconsistent data',()=>{
 assert.equal(otherStudentStats({total:5,correct:4,wrong:1},{is_correct:true}),null);
 assert.deepEqual(otherStudentStats({total:6,correct:4,wrong:2},{is_correct:true}),{total:5,correct:3,wrong:2,accuracy:60});
 assert.deepEqual(otherStudentStats({total:5,correct:4,wrong:1},null),{total:5,correct:4,wrong:1,accuracy:80});
 assert.equal(otherStudentStats({total:10,correct:2,wrong:3},null),null);
});
