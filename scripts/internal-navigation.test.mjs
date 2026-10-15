import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dashboardHref, restoreTrainerBookmark, trainerRouteKey, trainerFilterKeys } from '../src/lib/internalNavigation.ts';

const catalog = [{ id:'q1', source:'official', table:'board_exam_questions', text:'fresh' }, { id:'q2',source:'curated',table:'curated_question_catalog' }];
const now = Date.now();
const bookmark = () => ({ version:1, savedAt:now, route:trainerRouteKey({subject:'Direito Penal'}),questions:catalog.map(({id,source,table})=>({id,source,table})), index:1, selected:'B',struck:['C'],results:['ok'],startedAt:now-3000,filters:Object.fromEntries(trainerFilterKeys.map(k=>[k,'all'])) });

test('return paths retain filters and fragments but reject external/open redirect destinations', () => {
 assert.equal(dashboardHref('/dashboard/library?q=CPP#artigos'),'/dashboard/library?q=CPP#artigos');
 for(const s of ['https://evil.invalid/dashboard','//evil.invalid/dashboard','javascript:alert(1)','/dashboardevil','/dashboard/../auth','https://norteconcursos.xyz@evil.invalid/dashboard'])assert.equal(dashboardHref(s),null);
});
test('restore retains order, position and results using current eligible question bodies', () => {
 const b=bookmark(), result=restoreTrainerBookmark(b,b.route,catalog,now);
 assert.equal(result.questions[0].text,'fresh');
 assert.equal(result.bookmark.index,1); assert.deepEqual(result.bookmark.results,['ok']);
 assert.equal(result.bookmark.selected,'B');
 assert.equal(trainerRouteKey({year:'2025',subject:'Direito Penal'}),trainerRouteKey({subject:'Direito Penal',year:'2025'}));
});
test('new law, future timestamps, missing questions and invalid filters cannot restore old training', () => {
 const b=bookmark();
 assert.equal(restoreTrainerBookmark(b,trainerRouteKey({law:'drogas'}),catalog,now),null);
 assert.equal(restoreTrainerBookmark({...b,savedAt:now+1},b.route,catalog,now),null);
 assert.equal(restoreTrainerBookmark(b,b.route,catalog.slice(1),now),null);
 assert.equal(restoreTrainerBookmark({...b,index:99},b.route,catalog,now),null);
 assert.equal(restoreTrainerBookmark({...b,filters:{}},b.route,catalog,now),null);
 assert.equal(restoreTrainerBookmark({...b,questions:[b.questions[0],b.questions[0]]},b.route,catalog,now),null);
});
test('skipped questions preserve sparse results after JSON serialization', () => {
 const b=bookmark();b.results=[null,'err'];
 const r=restoreTrainerBookmark(b,b.route,catalog,now);
 assert.equal(r.bookmark.results[0],undefined);assert.equal(r.bookmark.results[1],'err');
});
test('755 decision manifest is unique and quarantines missing evidence without approving questions', () => {
 const m=JSON.parse(readFileSync('docs/question-taxonomy-review-2026-10-11.json','utf8'));
 assert.equal(m.decisions.length,755);
 assert.equal(new Set(m.decisions.map(d=>d.table+':'+d.id)).size,755);
 assert.equal(m.decisions.filter(d=>d.decision==='correct').length,747);
 assert.equal(m.decisions.filter(d=>d.decision==='retain').length,8);
 assert.equal(m.decisions.filter(d=>d.quarantine).length,378);
 assert.ok(m.decisions.every(d=>!/^Eixo|^Conhecimentos (?:Espec|Gerais|do cargo)|^https:/i.test(d.new_subject)));
 const sql=readFileSync('supabase/migrations/20261011120000_question_taxonomy_review_755.sql','utf8');
 assert.match(sql,/md5\(q.question_text\)/);assert.match(sql,/THEN 'under_review' ELSE q.content_status END/);
 assert.doesNotMatch(sql,/SET\s+(question_text|official_answer|legal_basis|law_version_checked_at)/i);
});
test('platform Links do not request new tabs; trainer bookmarks are scoped to the signed-in user', () => {
 for(const file of ['src/components/dashboard/TrainerLearningMaterials.tsx','src/components/cronograma/DayRun.tsx','src/routes/dashboard/errors.tsx']){
  const text=readFileSync(file,'utf8');
  for(const tag of text.match(/<Link\b[\s\S]*?>/g)||[])assert.doesNotMatch(tag,/target="_blank"/);
 }
 const trainer=readFileSync('src/routes/dashboard/question-trainer.tsx','utf8');
 assert.match(trainer,/trainer-bookmark:\$\{saved.userId\}/);assert.match(trainer,/trainer-bookmark:\$\{userId\}/);
 assert.match(trainer,/setAnswered\(false\); \/\/ The saved-answer gate/);
});

test('restored reinforcement retains answer locks and rejects malformed or contradictory attempts', () => {
 const b={...bookmark(),practiceMode:'wrong',sessionAttempts:[{index:0,selected:'A',isCorrect:true}]};
 const restored=restoreTrainerBookmark(b,b.route,catalog,now);
 assert.equal(restored.bookmark.practiceMode,'wrong');
 assert.deepEqual(restored.bookmark.sessionAttempts,b.sessionAttempts);
 for(const attempts of [[{index:5,selected:'A',isCorrect:true}],[{index:0,selected:'X',isCorrect:true}],[{index:0,selected:'A',isCorrect:false}], [...b.sessionAttempts,...b.sessionAttempts], [null]]) assert.equal(restoreTrainerBookmark({...b,sessionAttempts:attempts},b.route,catalog,now),null);
 assert.equal(restoreTrainerBookmark({...b,practiceMode:'invalid'},b.route,catalog,now),null);
});

const {trainerSessionSize}=await import('../src/lib/trainerSession.ts');
test('announced training size respects stock, daily first-answer allowance and review independence', () => {
 assert.equal(trainerSessionSize(100,'20',3),3);
 assert.equal(trainerSessionSize(100,'20',0),0);
 assert.equal(trainerSessionSize(100,'20'),20);
 assert.equal(trainerSessionSize(4,'20'),4);
 assert.equal(trainerSessionSize(100,'500'),50);
 assert.equal(trainerSessionSize(100,'corrupt'),20);
 assert.equal(trainerSessionSize(100,'10',-1),0);
 assert.equal(trainerSessionSize(NaN,'20'),0);
});

const home=await import('../src/lib/studentDashboard.ts');
test('student overview uses the first scored answer, source identity and latest reinforcement',()=>{
 const rows=[
 {id:'b',question_id:'q1',question_source:'official',subject:'Português',is_correct:true,created_at:'2026-10-15T08:00:00Z'},
 {id:'a',question_id:'q1',question_source:'official',subject:'Português',is_correct:false,created_at:'2026-10-15T02:00:00Z'},
 {id:'c',question_id:'q1',question_source:'personal',subject:'Matemática',is_correct:false,created_at:'2026-10-15T09:00:00Z'},
 {id:'d',question_id:'q2',question_source:'official',subject:'Português',is_correct:true,created_at:'2026-10-15T09:00:00Z'}];
 const attempts=[{...rows[0],id:'review',is_correct:true,created_at:'2026-10-15T10:00:00Z'}];
 const result=home.summarizeTraining(rows,attempts,'2026-10-15');assert.equal(result.total,3);assert.equal(result.correct,1);assert.equal(result.wrong,2);assert.equal(result.today,2);assert.equal(result.pending,1);assert.equal(result.accuracy,33);
 assert.equal(home.summarizeTraining(rows,null,'2026-10-15').pending,null);
 assert.equal(home.summarizeTraining(rows,[...attempts,{...attempts[0],id:'later',is_correct:false,created_at:'2026-10-15T11:00:00Z'}],'2026-10-15').pending,2);
});
test('student review signals require at least five answers and never infer mastery from one item',()=>{
 const rows=Array.from({length:5},(_,i)=>({id:`a${i}`,question_id:`q${i}`,question_source:'official',subject:'Matemática',is_correct:i===0,created_at:'2026-10-15T09:00:00Z'}));
 assert.equal(home.summarizeTraining(rows.slice(0,4),[],'2026-10-15').signals.length,0);
 assert.equal(home.summarizeTraining(rows,[],'2026-10-15').signals[0].subject,'Matemática');
 assert.equal(home.summarizeTraining([],[],'2026-10-15').accuracy,null);
});
test('active time sums separate sessions and does not add the live clock twice',()=>{
 const rows=[{study_date:'2026-10-15',active_seconds:90},{study_date:'2026-10-15',active_seconds:60},{study_date:'2026-10-14',active_seconds:100},{study_date:'2026-10-01',active_seconds:200},{study_date:'2026-10-14',active_seconds:-50}];
 const r=home.summarizeStudyTime(rows,180,new Date('2026-10-15T08:00:00Z'));assert.equal(r.today,180);assert.equal(r.week,280);assert.equal(r.total,480);assert.equal(r.days.length,7);
 assert.equal(home.summarizeStudyTime(rows,80,new Date('2026-10-15T08:00:00Z')).today,150);
 const beforeMidnight=home.summarizeStudyTime([{study_date:'2026-10-14',active_seconds:60}],120,new Date('2026-10-15T04:30:00Z'));assert.equal(beforeMidnight.days.at(-1).date,'2026-10-14');assert.equal(beforeMidnight.total,120);
});
test('exam countdown preserves civil dates, past dates and rejects invalid calendar values',()=>{
 assert.equal(home.daysToExam('2026-10-16','2026-10-15'),1);assert.equal(home.daysToExam('2026-10-15','2026-10-15'),0);assert.equal(home.daysToExam('2026-10-14','2026-10-15'),-1);assert.equal(home.daysToExam('2026-02-31','2026-10-15'),null);assert.equal(home.daysToExam(undefined,'2026-10-15'),null);
});
test('dashboard schedule follows the selected config and the same completion criteria as cronograma',()=>{
 const config={days:[1],weeklyHours:1,startTime:'19:00',discs:[{id:'d',nome:'Português',peso:1,topicos:[{id:'t1',t:'Crase'},{id:'t2',t:'Verbos'}]}]};
 assert.equal(home.validDashboardConfig(config),true);assert.equal(home.validDashboardConfig({...config,startTime:'27:00'}),false);assert.equal(home.validDashboardConfig({...config,weeklyHours:NaN}),false);assert.equal(home.validDashboardConfig({}),false);
 const progress={t1:{video:true,pdf:false,podcast:false,qtde:0,acertos:0,revPdf:false,revQuestoes:false}};
 assert.equal(home.dashboardSchedule(config,progress,1).completed,0);progress.t1.qtde=3;
 const result=home.dashboardSchedule(config,progress,1);assert.equal(result.completed,1);assert.equal(result.next.t.id,'t2');assert.equal(result.blocks.reduce((s,b)=>s+b.minutes,0),60);assert.equal(home.dashboardSchedule(config,progress,2).blocks.length,0);
});
test('resume reading skips excluded units, inactive courses and unlinked material',()=>{
 const progress=[{unit_id:'excluded',read_at:'2026-10-15'},{unit_id:'orphan',read_at:'2026-10-14'},{unit_id:'valid',read_at:'2026-10-13'}];
 const units=[{id:'excluded',course_id:'a',unit_key:'art-1',label:'Art. 1',content_status:'excluded'},{id:'orphan',course_id:'b',unit_key:'art-2',label:'Art. 2',content_status:'current'},{id:'valid',course_id:'a',unit_key:'art-3',label:'Art. 3',content_status:'current'}];
 const courses=[{id:'a',slug:'codigo-penal',title:'Código Penal',status:'active',syllabus_topic_id:'topic'},{id:'b',slug:'orphan',title:'Sem vínculo',status:'active',syllabus_topic_id:null}];
 assert.equal(home.recentReading(progress,units,courses).article,'art-3');assert.equal(home.recentReading(progress,units,courses.map(c=>({...c,status:'inactive'}))),null);
});

test('a catalog session larger than 500 restores all current eligible question IDs',()=>{
 const many=Array.from({length:601},(_,i)=>({id:`large-${i}`,source:'official',table:'official_exam_questions'}));
 const b={...bookmark(),practiceMode:'catalog',questions:many,filters:{...bookmark().filters,limit:'all'}};
 assert.equal(restoreTrainerBookmark(b,b.route,many,now).questions.length,601);
 assert.equal(restoreTrainerBookmark(b,b.route,many.slice(0,600),now),null);
});

const {activeNavigation,navigationKey}=await import('../src/lib/dashboardNavigation.ts');
test('ENEM tab links have distinct identity and the tab-specific menu takes precedence over its landing page',()=>{
 const menu=[{href:'/dashboard/enem',label:'Área ENEM'},{href:'/dashboard/enem',label:'Materiais',search:{tab:'materiais'}},{href:'/dashboard/enem',label:'Questões',search:{tab:'questoes'}}];
 assert.equal(new Set(menu.map(navigationKey)).size,3);
 assert.equal(activeNavigation(menu,'/dashboard/enem',{tab:'questoes'}).label,'Questões');
 assert.equal(activeNavigation(menu,'/dashboard/enem',{}).label,'Área ENEM');
 assert.equal(activeNavigation(menu,'/dashboard/enem',{tab:'materiais'}).label,'Materiais');
 assert.equal(activeNavigation(menu,'/dashboard/question-trainer'),undefined);
});
test('nested and legal reading routes resolve to the right navigation destination',()=>{
 const menu=[{href:'/dashboard'},{href:'/dashboard/library'},{href:'/dashboard/admin'},{href:'/dashboard/admin/students'}];
 assert.equal(activeNavigation(menu,'/dashboard/legal-course/codigo-penal').href,'/dashboard/library');
 assert.equal(activeNavigation(menu,'/dashboard/admin/students/1').href,'/dashboard/admin/students');
 assert.equal(activeNavigation(menu,'/dashboard/').href,'/dashboard');
});
const {trainerReachableIndex}=await import('../src/lib/trainerSession.ts');
test('question map allows revisiting answers and the next unanswered question without skipping ahead',()=>{
 assert.equal(trainerReachableIndex([],100),0);
 assert.equal(trainerReachableIndex(['ok','err'],100),2);
 assert.equal(trainerReachableIndex(['ok',null,'err'],100),1);
 assert.equal(trainerReachableIndex(['ok','ok'],2),1);
 assert.equal(trainerReachableIndex(Array(2),10),0);
});

test('unfinished sessions remain resumable after days and preserve active question time', () => {
 const b={...bookmark(),savedAt:now-7*86400000,questionSeconds:42};
 assert.equal(restoreTrainerBookmark(b,b.route,catalog,now).bookmark.questionSeconds,42);
 assert.equal(restoreTrainerBookmark({...b,questionSeconds:-1},b.route,catalog,now),null);
});
