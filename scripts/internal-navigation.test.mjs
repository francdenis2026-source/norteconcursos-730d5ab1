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
test('new law, expired sessions, missing questions and invalid filters cannot restore old training', () => {
 const b=bookmark();
 assert.equal(restoreTrainerBookmark(b,trainerRouteKey({law:'drogas'}),catalog,now),null);
 assert.equal(restoreTrainerBookmark({...b,savedAt:now-14400001},b.route,catalog,now),null);
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
