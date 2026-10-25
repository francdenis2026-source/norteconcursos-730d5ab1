import test from 'node:test';
import assert from 'node:assert/strict';
import { activityDateRange,activityPracticeSearch,freshActivityQuestions,otherStudentStats,studyPeriodSummary,trainingPeriodRows } from '../src/lib/dailyStudyActivity.ts';
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

test('all six study periods preserve exclusive Acre dates and calendar month/year semantics',()=>{
 assert.deepEqual(activityDateRange('2026-10-19','day'),{start:'2026-10-19T05:00:00.000Z',end:'2026-10-20T05:00:00.000Z'});
 for(const [period,date] of [['7d','2026-10-13'],['15d','2026-10-05'],['30d','2026-09-20'],['6m','2026-04-20'],['1y','2025-10-20']]) assert.equal(activityDateRange('2026-10-19',period).start,date+'T05:00:00.000Z');
 assert.equal(activityDateRange('2024-08-30','6m').start,'2024-02-29T05:00:00.000Z');
 assert.equal(activityDateRange('2025-08-30','6m').start,'2025-02-28T05:00:00.000Z');
});

test('period totals, daily averages and monthly buckets agree without live-time duplication',()=>{
 const rows=[{study_date:'2026-10-19',active_seconds:60},{study_date:'2026-10-19',active_seconds:30},{study_date:'2026-10-15',active_seconds:120},{study_date:'2026-09-25',active_seconds:300},{study_date:'2025-01-01',active_seconds:999},{study_date:'2026-10-20',active_seconds:999}];
 const week=studyPeriodSummary(rows,100,'2026-10-19','2026-10-19','7d');
 assert.equal(week.total,220);assert.equal(week.activeDays,2);assert.equal(week.average,31);assert.equal(week.days.length,7);
 const month=studyPeriodSummary(rows,100,'2026-10-19','2026-10-19','30d');assert.equal(month.total,520);assert.equal(month.days.length,30);
 const half=studyPeriodSummary(rows,100,'2026-10-19','2026-10-19','6m');assert.equal(half.total,520);assert.equal(half.monthly,true);assert.equal(half.buckets.reduce((s,d)=>s+d.seconds,0),520);
 const old=studyPeriodSummary(rows,10000,'2026-10-19','2026-09-25','day');assert.equal(old.total,300);assert.equal(old.days.length,1);
});

test('question history periods filter first responses before computing discipline totals',()=>{
 const row=(id,created_at,extra={})=>({id,question_id:id,question_source:'official',is_correct:true,created_at,...extra});
 const rows=[row('a','2026-10-19T05:00:00Z'),row('b','2026-10-13T05:00:00Z'),row('c','2026-10-05T05:00:00Z'),row('d','2026-09-20T05:00:00Z'),row('e','2026-04-20T05:00:00Z'),row('f','2025-10-20T05:00:00Z'),row('g','2025-10-19T05:00:00Z'),row('a-repeat','2026-10-19T20:00:00Z',{question_id:'g'}),row('invalid','not-a-date')];
 for(const [period,count] of [['day',1],['7d',2],['15d',3],['30d',4],['6m',5],['1y',6],['all',7]]) assert.equal(trainingPeriodRows(rows,period,'2026-10-19').length,count,period);
 assert.equal(trainingPeriodRows(rows,'7d','2026-10-19').some(r=>r.id==='a-repeat'),false);
 assert.equal(trainingPeriodRows([row('other-source','2026-10-19T05:00:00Z',{question_id:'a',question_source:'curated'}),...rows],'day','2026-10-19').length,2);
});
