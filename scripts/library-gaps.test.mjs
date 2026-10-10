import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import vm from 'node:vm';
const read=name=>JSON.parse(readFileSync('docs/library/gaps-'+name+'-2026-10-10.json','utf8'));
const materials=read('materials'),paths=read('paths'),examples=read('examples');
function load(file,overrides={}){const module={exports:{}};const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{module,exports:module.exports,require:n=>overrides[n],URL});return module.exports;}
const laws=load('src/lib/legalLibrary.ts');
const search=load('src/lib/librarySearch.ts',{'./legalLibrary':laws});
test('Missing PF laws have distinct identity, classification and exact searchable numbers',()=>{
 assert.equal(laws.LEGAL_LIBRARY.length,42);
 assert.equal(search.matchingLibraryLaws('9.454').join(','),'ric');
 assert.equal(search.matchingLibraryLaws('9.455').join(','),'tortura');
 assert.equal(search.matchingLibraryLaws('RIC').join(','),'ric');
 assert.equal(search.matchingLibraryLaws('13.060').join(','),'menor-potencial-ofensivo');
 assert.equal(search.matchingLibraryLaws('12.341').join(','),'uso-forca');
 for(const course of paths.courses)assert.equal(laws.materialLawSlug({slug:course.material_slug}),course.slug);
 assert.equal(laws.legalLibraryEntry('uso-forca').group,'Direitos humanos — uso da força');
 assert.equal(laws.questionMatchesLaw({legalBasis:[{url:paths.courses[0].source_url}]},'tortura'),false);
});
test('New packages validate offline without credentials, with source-based complete reading',()=>{
 const dir=mkdtempSync(join(tmpdir(),'law-gaps-'));
 try {
  for(const [script,name] of [['import-library-materials','materials'],['import-library-sources','sources'],['import-legal-paths','paths'],['import-study-enrichment','examples']]){
   const run=spawnSync(process.execPath,['scripts/'+script+'.mjs','docs/library/gaps-'+name+'-2026-10-10.json',join(dir,name+'.json'),'--dry-run'],{encoding:'utf8',env:{...process.env,TASK_SUPABASE_KEY:'',TASK_SUPABASE_PROJECT:'',TASK_LIBRARY_REVIEWER:''}});
   assert.equal(run.status,0,run.stderr);
  }
 }finally{rmSync(dir,{recursive:true,force:true});}
 assert.equal(paths.units.length,27);assert.equal(paths.units.filter(u=>u.content_status==='excluded').length,1);
 assert.equal(examples.flatMap(e=>e.content.cases).length,14);
 assert.equal(materials.flatMap(m=>m.quiz).length,24);
 for(const course of paths.courses){
  const guide=materials.find(m=>m.slug===course.material_slug);assert.ok(guide);
  const units=paths.units.filter(u=>u.course_id===course.id);
  assert.equal(units.filter(u=>u.content_status==='current').length,course.overview.current_units);
  for(const c of examples.find(e=>e.material_slug===guide.slug).content.cases)for(const art of c.articles)assert.ok(units.some(u=>u.label===art),'Unlinked article '+art);
 }
});
test('Historical RIC wording and old implementation deadlines do not create current-law drills',()=>{
 const caveats=load('src/lib/legalStudyCaveats.ts');
 for(const key of ['art-3','art-5'])assert.equal(caveats.legalStudyCaveat('ric',key).literalPractice,false);
 assert.equal(caveats.legalStudyCaveat('ric','art-1'),null);
 const ric=materials.find(m=>m.slug==='legislacao-ric-revisao');
 assert.ok(ric.body_md.includes('revogado em 2009'));assert.ok(ric.body_md.includes('9.545 para 9.454'));
});
test('Force regulation distinguishes annual training from renewed weapon qualification and historical cutoff',()=>{
 const guide=materials.find(m=>m.slug==='legislacao-uso-forca-revisao');
 assert.ok(guide.body_md.includes('07/01/2026'));assert.ok(guide.body_md.includes('Não se trata de alteração dos arts. 3º, 11 e 16 do decreto'));
 assert.ok(guide.quiz.find(q=>q.q.includes('revogou a capacitação anual')).a===false);
 const c=examples.find(e=>e.material_slug===guide.slug).content.cases.find(c=>c.id==='uf-3');
 assert.ok(c.steps[0].includes('anual'));assert.ok(c.steps[1].includes('três anos'));
 const urls=load('src/lib/studySourceUrl.ts',{'./questionFormat':{isOfficialUrl:()=>false}});
 assert.equal(urls.isStudySourceUrl(guide.legal_review.changes[0].url),true);
 assert.equal(urls.isStudySourceUrl('https://dspace.mj.gov.br.attacker.example/'),false);
});
