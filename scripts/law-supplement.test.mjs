import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import {renderToStaticMarkup} from 'react-dom/server';
import {validateLawReview} from './apply-library-law-review.mjs';
const read=name=>JSON.parse(readFileSync(`docs/library/law-supplement-${name}-2026-10-07.json`,'utf8'));
const materials=read('materials'),paths=read('paths'),review=read('review');

test('Source publication rejects an invalid database status before any request',()=>{
 const dir=mkdtempSync(join(tmpdir(),'norte-source-status-'));
 const rows=read('sources'),input=join(dir,'input.json'),report=join(dir,'report.json');
 const run=()=>spawnSync(process.execPath,['scripts/import-library-sources.mjs',input,report,'--dry-run'],{encoding:'utf8'});
 try {writeFileSync(input,JSON.stringify(rows));assert.equal(run().status,0);rows[0].status='current';writeFileSync(input,JSON.stringify(rows));assert.notEqual(run().status,0);}
 finally {rmSync(dir,{recursive:true,force:true});}
});

test('Complementary reading cannot masquerade as an active edital question set',()=>{
 const dir=mkdtempSync(join(tmpdir(),'norte-law-supplement-'));
 const env={...process.env,TASK_SUPABASE_KEY:'',TASK_SUPABASE_PROJECT:'',TASK_LIBRARY_REVIEWER:''};
 const run=rows=>{const input=join(dir,'input.json');writeFileSync(input,JSON.stringify(rows));return spawnSync(process.execPath,['scripts/import-library-materials.mjs',input,join(dir,'report.json'),'--dry-run'],{env,encoding:'utf8'});};
 try {
  assert.equal(materials.length,4);assert.equal(run(materials).status,0);
  assert.equal(materials.filter(m=>m._supplemental_scope).length,3);
  const mixed=structuredClone(materials);mixed[0].quiz=[materials[1].quiz[0]];
  assert.notEqual(run(mixed).status,0);
  const unmarked=structuredClone(materials);delete unmarked[0]._supplemental_scope;
  assert.notEqual(run(unmarked).status,0);
  const note=structuredClone(materials);note[0].source_note='Sem declaração de alcance';
  assert.notEqual(run(note).status,0);
 } finally {rmSync(dir,{recursive:true,force:true});}
});

test('Complete paths cover every external article, retain the veto and distinguish host amendments',()=>{
 assert.equal(paths.courses.length,2);assert.equal(paths.units.length,66);
 for(const c of paths.courses){
  const units=paths.units.filter(u=>u.course_id===c.id);
  const total=c.slug==='antifaccao'?44:22;
  for(let n=1;n<=total;n++)assert.equal(units.filter(u=>u.label===`Art. ${n}`).length,1);
  assert.equal(units.filter(u=>u.content_status==='current').length,c.overview.current_units);
 }
 const anti=paths.courses.find(c=>c.slug==='antifaccao');
 assert.equal(paths.units.find(u=>u.course_id===anti.id&&u.label==='Art. 43').content_status,'excluded');
 assert.match(paths.units.find(u=>u.course_id===anti.id&&u.label==='Art. 44').body_text,/entra em vigor/);
});

test('Future food-payment rules and expired traffic MP have distinct notices',()=>{
 assert.deepEqual(validateLawReview(review),{materials:8,courses:5,enrichments:8});
 const changes=review.materials.flatMap(m=>m.patch.legal_review.changes);
 const future=changes.filter(c=>c.url.endsWith('l15479.htm'));
 assert.ok(future.length>0&&future.every(c=>c.state==='future'&&c.vigency.includes('30/07/2027')));
 const ended=changes.find(c=>c.url.endsWith('adc-96-mpv1.360.htm'));
 assert.equal(ended.state,'expired');assert.match(ended.vigency,/15\/09\/2026/);
 assert.ok(review.enrichments.every(e=>Object.keys(e.patch).join()==='source_body_sha256'));
});

const require=createRequire(import.meta.url);
function compile(path,resolve=require){
 const module={exports:{}};
 vm.runInNewContext(ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{module,exports:module.exports,require:resolve,URL});
 return module.exports;
}
const format=compile('src/lib/questionFormat.ts');
const sources=compile('src/lib/studySourceUrl.ts',()=>format);
const markdown=compile('src/components/library/Markdown.tsx',name=>name==='@/lib/studySourceUrl'?sources:require(name));

test('Example sections are highlighted without absorbing the following legal text',()=>{
 const source='## Texto legal\n\nArt. 1º: regra neutra.\n\n## 3. Primeira aplicação\n\nCaso fictício para aprender.\n\n### Resolução\n\nExplicação do caso.\n\n## Outra regra legal\n\nArt. 2º: texto neutro.';
 const html=renderToStaticMarkup(markdown.Markdown({source}));
 const section=html.match(/<section[^>]*class="study-example"[^>]*>(.*?)<\/section>/s)?.[1];
 assert.ok(section?.includes('Caso fictício para aprender.'));
 assert.ok(section?.includes('Explicação do caso.'));
 assert.ok(!section?.includes('Art. 1º'));
 assert.ok(!section?.includes('Art. 2º'));
 assert.ok(html.includes('Art. 2º: texto neutro.'));
});

test('Explicit inline examples and example columns are highlighted while legal mentions stay neutral',()=>{
 const source='**Exemplo:** situação didática.\n\nArt. 10: a lei menciona, por exemplo, uma hipótese.\n\n| Regra | Exemplo prático |\n|---|---|\n| Texto legal | Caso fictício |';
 const html=renderToStaticMarkup(markdown.Markdown({source}));
 assert.match(html,/<p class="study-example"><strong>Exemplo:/);
 assert.match(html,/<p>Art. 10:/);
 assert.match(html,/<td>Texto legal<\/td>/);
 assert.match(html,/<td class="study-example-cell">Caso fictício<\/td>/);
});
test('Rendered study links navigate to complements and refuse script or deceptive URLs',()=>{
 const html=renderToStaticMarkup(markdown.Markdown({source:'[Complemento](/dashboard/library/legislacao-antifaccao-marco-legal)\n\n[Lei](https://www.planalto.gov.br/ccivil_03/)\n\n[Perigo](javascript:alert)\n\n[Falso](https://www.planalto.gov.br.attacker.invalid/)'}));
 assert.match(html,/href="\/dashboard\/library\/legislacao-antifaccao-marco-legal"/);
 assert.match(html,/rel="noopener noreferrer"/);
 assert.equal((html.match(/<a /g)||[]).length,2);
 for(const value of ['//attacker.invalid','/dashboard/library/../conta','/dashboard/library/lei?redirect=bad','javascript:alert'])assert.equal(markdown.studyMarkdownHref(value),null);
});
