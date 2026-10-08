import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {validateLawReview} from './apply-library-law-review.mjs';
const read=name=>JSON.parse(readFileSync(`docs/library/tutor-law-${name}-2026-10-07.json`,'utf8'));
const review=read('review'),examples=read('examples'),manifest=read('manifest');
function load(file,overrides={}) {
 const module={exports:{}};
 const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const native=createRequire(import.meta.url);
 vm.runInNewContext(code,{module,exports:module.exports,require:name=>overrides[name]??native(name),URL});
 return module.exports;
}
const laws=load('src/lib/legalLibrary.ts');
const chronology=load('src/lib/legalChronology.ts');

test('All law case cards expose distinct presentation for case, resolution, pitfall and variation',()=>{
 const {WorkedExampleContent}=load('src/components/library/WorkedExamples.tsx',{
  './LearningIllustrations':{LearningIllustration:()=>null},
  '@/lib/studyEnrichment':{},
  '@/lib/studySourceUrl':{isStudySourceUrl:()=>true},
 });
 const cases=examples.flatMap((row,i)=>row.content.cases.map(c=>({...c,id:`${i}-${c.id}`})));
 const html=renderToStaticMarkup(React.createElement(WorkedExampleContent,{enrichment:{content:{cases,illustrations:[]},sources:[],checked_at:'2026-10-07'}}));
 assert.equal(cases.length,93);
 for(const className of ['worked-case','worked-case-badge','worked-resolution mt-4','worked-pitfall mt-4 text-sm leading-6','worked-variation mt-4 rounded-lg border p-3']){
  assert.equal(html.split(`class="${className}"`).length-1,93);
 }
});

test('Current library revision migrations have distinct version identifiers',()=>{
 const versions=readdirSync('supabase/migrations').filter(name=>/^20261007\d+_.*\.sql$/.test(name)).map(name=>name.split('_')[0]);
 assert.equal(new Set(versions).size,versions.length);
});

test('Every law has its own guide, source evidence, multiple cases and retrieval practice',()=>{
 assert.equal(validateLawReview(review).materials,39);
 assert.equal(examples.length,39);assert.equal(manifest.length,39);
 assert.equal(new Set(manifest.map(m=>m.course_slug)).size,39);
 for(const row of manifest){
  const material=review.materials.find(m=>m.slug===row.material_slug);
  const example=examples.find(e=>e.material_slug===row.material_slug);
  assert.equal(material.patch.legal_review.course_slug,row.course_slug);
  assert.equal(laws.materialLawSlug({slug:row.material_slug}),row.course_slug);
  assert.equal(example.content.cases.length,row.cases);assert.ok(row.cases>=2);
  assert.equal(material.patch.flashcards.length,row.flashcards);assert.ok(row.flashcards>=12);
  assert.match(material.patch.body_md,new RegExp(`/dashboard/legal-course/${row.course_slug}`));
  assert.ok(example.sources.some(source=>source.sha256===row.sha256&&source.url===row.source_url));
  assert.ok(example.content.cases.every(c=>c.steps.length>=2&&c.variation.scenario&&c.variation.answer&&c.articles.length));
 }
});

test('Law filtering uses official diploma identity, separates CP/CPP and handles URL variations',()=>{
 const question=url=>({legalBasis:[{url}]});
 assert.equal(laws.questionMatchesLaw(question('https://www.planalto.gov.br/ccivil_03/leis/2003/L10.826.htm?utm_source=x#art14'),'armas'),true);
 assert.equal(laws.questionMatchesLaw(question('https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm#art14'),'codigo-processo-penal'),false);
 assert.equal(laws.questionMatchesLaw(question('https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm'),'codigo-processo-penal'),true);
 assert.equal(laws.questionMatchesLaw(question('https://example.com/leis/l11343.htm'),'drogas'),false);
 assert.equal(laws.questionMatchesLaw(question('https://www.planalto.gov.br/ccivil_03/leis/l11343.htm'),'lei-desconhecida'),false);
 assert.equal(laws.questionMatchesLaw({legalBasis:[]},'drogas'),false);
 assert.equal(laws.officialLawIdentity('https://www.planalto.gov.br/leis/l10977.htm')===laws.officialLawIdentity('https://www.planalto.gov.br/2022/decreto/d10977.htm'),false);
 assert.equal(laws.materialLawSlug({slug:'rlm-contagem-probabilidade-basica'}),undefined);
 assert.equal(laws.materialLawSlug({slug:'constitucional-nacionalidade-medidas-retirada',discipline:'Direito Constitucional',law_course_slug:'migracao'}),undefined);
 // Canonical identity overrides historical erroneous grouping.
 assert.equal(laws.materialLawSlug({slug:'legislacao-armas-revisao',law_course_slug:'seguranca-privada'}),'armas');
});

test('Catalog renders one study entry per law in separate areas and keeps deep reading accessible',()=>{
 const data=manifest.map(m=>({...laws.legalLibraryEntry(m.course_slug),id:m.course_slug,overview:{current_units:m.current_units,chapters:[{}]}}));
 const {LegalPathCatalog}=load('src/components/library/LegalPathCatalog.tsx',{
  '@/lib/legalCourses':{useLegalCourses:()=>({data,isPending:false,isError:false})},
  '@/lib/legalLibrary':laws,
  '@/lib/legalChronology':chronology,
  '@tanstack/react-router':{Link:({children,to,params})=>React.createElement('a',{href:to.replace('$slug',params.slug)},children)},
 });
 const materials=manifest.map(m=>({slug:m.material_slug}));
 const html=renderToStaticMarkup(React.createElement(LegalPathCatalog,{userId:'test',materials,searching:false}));
 assert.equal((html.match(/Estudar: guia, exemplos e flashcards/g)??[]).length,39);
 assert.equal((html.match(/Leitura integral e revisão por dispositivo/g)??[]).length,39);
 for(const group of laws.LEGAL_GROUPS)assert.ok(html.includes(group));
 const only=renderToStaticMarkup(React.createElement(LegalPathCatalog,{userId:'test',materials:[{slug:'legislacao-drogas-revisao'}],searching:true}));
 assert.equal((only.match(/Estudar: guia, exemplos e flashcards/g)??[]).length,1);
 assert.ok(!only.includes('/dashboard/library/processo-penal-cpp-provas-flagrante-revisao'));
 assert.ok(html.indexOf('/dashboard/library/penal-principios-direito-penal')<html.indexOf('/dashboard/library/legislacao-transito-revisao'));
});

test('Laws sort by dated official acts rather than original year or verification timestamps',()=>{
 const entries=laws.LEGAL_LIBRARY;
 const ordered=[...entries].reverse().sort(chronology.compareLawChronology);
 assert.equal(Object.keys(chronology.LAW_CHRONOLOGY).length,39);
 assert.equal(ordered[0].slug,'codigo-penal');
 for(let i=1;i<ordered.length;i++)assert.ok(chronology.LAW_CHRONOLOGY[ordered[i-1].slug].date>=chronology.LAW_CHRONOLOGY[ordered[i].slug].date);
 assert.ok(ordered.findIndex(c=>c.slug==='tortura')<ordered.findIndex(c=>c.slug==='budapeste'));
 assert.equal(chronology.compareLawChronology({slug:'unknown',title:'A'},{slug:'codigo-penal',title:'B'})>0,true);
 assert.ok(chronology.lawChronologyLabel('codigo-penal').includes('22/09/2026'));
 for(const value of Object.values(chronology.LAW_CHRONOLOGY)){
  assert.match(value.date,/^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new URL(value.source_url).hostname,'www.planalto.gov.br');
  assert.ok(!['expired','reference'].includes(value.state));
 }
});

test('Other study material uses its own revision date, with undated entries last',()=>{
 const rows=[{title:'Antigo',updated_at:'2024-01-01',sort_order:1},{title:'Atual',updated_at:'2026-10-07',sort_order:90},{title:'Sem data'}];
 assert.deepEqual(rows.sort(chronology.compareMaterialRevision).map(r=>r.title),['Atual','Antigo','Sem data']);
});

test('Relevant update states stay visible and complementary laws do not acquire historical-edital quizzes',()=>{
 for(const slug of ['antifaccao','pensao-regulamento']){
  const material=review.materials.find(m=>m.patch.legal_review.course_slug===slug);
  assert.deepEqual(material.patch.quiz,[]);
  assert.ok(material.patch.flashcards.some(c=>c.f.startsWith('Aplicação')));
 }
 const cp=review.materials.find(m=>m.patch.legal_review.course_slug==='codigo-penal');
 assert.ok(cp.patch.legal_review.changes.some(c=>c.title.includes('15.358')));
 assert.ok(cp.patch.legal_review.changes.some(c=>c.title.includes('545')));
 assert.ok(!cp.patch.legal_review.changes.some(c=>c.title.startsWith('EC ')));
 const traffic=review.materials.find(m=>m.patch.legal_review.course_slug==='transito');
 assert.ok(traffic.patch.legal_review.changes.some(c=>c.state==='expired'));
});
