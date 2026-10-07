import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import vm from 'node:vm';
const module = { exports: {} };
vm.runInNewContext(ts.transpileModule(readFileSync('src/lib/legalLearning.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{module,exports:module.exports});
const {legalProgressSummary,selectNextLegalUnit} = module.exports;
test('Reading is distinct from recall and unrelated units do not enter the summary',()=>{
 const rows=[{unit_id:'a',read_at:'2026-10-04',recall_attempts:0,review_step:0,last_rating:null,due_at:null},{unit_id:'b',read_at:'2026-10-04',recall_attempts:2,review_step:0,last_rating:'again',due_at:'2026-10-04T10:00:00Z'},{unit_id:'other',read_at:'2026-10-04',recall_attempts:99,review_step:5,last_rating:'easy',due_at:'2026-10-01'}];
 assert.deepEqual(JSON.parse(JSON.stringify(legalProgressSummary(['a','b'],rows,Date.parse('2026-10-04T11:00:00Z')))),{read:2,practiced:1,difficult:1,due:1,repeated:0});
});
test('An overdue review precedes unread content; excluded articles never enter the plan',()=>{
 const units=[{id:'unread',content_status:'current'},{id:'due',content_status:'current'},{id:'excluded',content_status:'excluded'}];
 const rows=[{unit_id:'due',read_at:'2026-10-04',recall_attempts:1,due_at:'2026-10-04T10:00:00Z'},{unit_id:'excluded',due_at:'2026-10-01'}];
 assert.equal(selectNextLegalUnit(units,rows,Date.parse('2026-10-04T11:00:00Z')).id,'due');
 assert.equal(selectNextLegalUnit(units,rows,Date.parse('2026-10-04T09:00:00Z')).id,'unread');
 assert.equal(selectNextLegalUnit([units[2]],rows),undefined);
});
test('Legal path importer rejects altered text, forged publication and foreign units offline',()=>{
 const directory=mkdtempSync(join(tmpdir(),'legal-path-'));
 try{
  const course=JSON.parse(readFileSync('docs/library/legal-path-pedagogy-2026-10-04.json'))[0];
  course.overview.current_units=1;course.overview.excluded_units=0;
  const body='Art. 1º Texto de teste para validar integridade.';
  const unit={id:'11111111-1111-4111-8111-111111111111',course_id:course.id,unit_key:'art-1',label:'Art. 1',chapter:'Teste',position:0,body_text:body,content_sha256:createHash('sha256').update(body).digest('hex'),content_status:'current',recall:{prompts:['Explique a regra.'],checklist:['Compare com a fonte.']}};
  const path=join(directory,'package.json'),report=join(directory,'report.json');
  const run=packageData=>{writeFileSync(path,JSON.stringify(packageData));return spawnSync(process.execPath,['scripts/import-legal-paths.mjs',path,report,'--dry-run'],{env:{...process.env,TASK_SUPABASE_KEY:'',TASK_SUPABASE_PROJECT:'',TASK_LIBRARY_REVIEWER:''},encoding:'utf8'}).status;};
  assert.equal(run({courses:[course],units:[unit]}),0);
  assert.notEqual(run({courses:[course],units:[{...unit,body_text:'Alterado'}]}),0);
  assert.notEqual(run({courses:[{...course,status:'active'}],units:[unit]}),0);
  assert.notEqual(run({courses:[course],units:[{...unit,course_id:'22222222-2222-4222-8222-222222222222'}]}),0);
 }finally{rmSync(directory,{recursive:true,force:true});}
});
