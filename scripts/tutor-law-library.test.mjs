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
 const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const native=createRequire(import.meta.url);
 vm.runInNewContext(code,{module,exports:module.exports,require:name=>overrides[name]??native(name),URL});
 return module.exports;
}
const laws=load('src/lib/legalLibrary.ts');
const chronology=load('src/lib/legalChronology.ts');

test('Legal highlights preserve source characters, classify full expressions and avoid diploma numbers',()=>{
 const {legalTextParts}=load('src/lib/legalHighlights.ts');
 const samples=['Art. 288. Associarem-se 3 (três) ou mais pessoas, para o fim específico de cometer crimes:',
 'Pena - reclusão, de 1 (um) a 3 (três) anos. Salvo se houver grave ameaça.','Lei 15.358/2026, conferida em 07/10/2026; <script>alert(1)</script> & íntegro.',
 'A pena aumenta-se de 1/3 (um terço) até a metade; 700 a 1.200 dias-multa.','mediante dolo; indolores não são dolo; desde que cumulativamente presentes.'];
 for(const source of samples)assert.equal(legalTextParts(source).map(p=>p.text).join(''),source);
 const parts=legalTextParts(samples[0]);
 assert.ok(parts.some(p=>p.text==='3 (três) ou mais pessoas'&&p.kind==='quantity'));
 assert.ok(parts.some(p=>p.text==='para o fim específico de'&&p.kind==='requirement'));
 assert.equal(legalTextParts(samples[2]).some(p=>p.kind),false);
 assert.equal(legalTextParts('indolores').some(p=>p.kind),false);
 assert.ok(legalTextParts('reiteradamente ou não').some(p=>p.text==='reiteradamente ou não'&&p.kind==='exception'));
 const highlights=load('src/lib/legalHighlights.ts');
 const sourceUrls=load('src/lib/studySourceUrl.ts',{'./questionFormat':load('src/lib/questionFormat.ts')});
 const markdown=load('src/components/library/Markdown.tsx',{'@/lib/studySourceUrl':sourceUrls});
 const reading=load('src/components/library/LegalStudyReading.tsx',{'@/lib/legalHighlights':highlights,'./Markdown':markdown});
 const html=renderToStaticMarkup(React.createElement(reading.LegalStudyReading,{source:samples[2]}));
 assert.ok(html.includes('&lt;script&gt;'));assert.ok(!html.includes('<script>'));assert.ok(html.includes('aria-pressed="true"'));
 const formatted=renderToStaticMarkup(React.createElement(reading.LegalStudyReading,{source:'## Caso concreto\n\n**Salvo** grave ameaça. [Lei](https://www.planalto.gov.br/ccivil_03/leis/l11343.htm)',markdown:true}));
 assert.match(formatted,/study-example/);assert.match(formatted,/legal-highlight-exception/);assert.match(formatted,/href="https:\/\/www.planalto.gov.br/);
 const route=readFileSync('src/routes/dashboard/legal-course.$slug.tsx','utf8');
 assert.match(route,/\(mode === "read" \|\| revealed\)/);
 assert.match(route,/LegalStudyReading source=\{unit.body_text\}/);
});

test('Library search finds disciplines, law names and numbers, body content and exact short acronyms',()=>{
 const search=load('src/lib/librarySearch.ts',{'./legalLibrary':laws});
 const sample=slug=>({id:slug,slug,title:'Guia de estudo',discipline:'Legislação',topic_label:'Estudo por lei',summary:null,contest_name:'PF'});
 const maria=search.librarySearchText(sample('legislacao-maria-penha-revisao'),{id:'x',body_md:'Proteção e medidas protetivas de urgência.'});
 for(const query of ['MARIA DA PENHA','lei 11.340/2006','Lei nº 11.340','11340','medidas urgencia','legislacao'])assert.equal(search.matchesLibrarySearch(maria,query),true,query);
 const cpp=search.librarySearchText(sample('processo-penal-cpp-provas-flagrante-revisao'));
 assert.equal(search.matchesLibrarySearch(cpp,'CPP'),true);
 assert.equal(search.matchesLibrarySearch(cpp,'CP'),false);
 const rlm=search.librarySearchText({...sample('rlm-a'),discipline:'Raciocínio Lógico Matemático'});
 assert.equal(search.matchesLibrarySearch(rlm,'RLM'),true);
 assert.equal(search.matchesLibrarySearch(rlm,'trafico'),false);
 assert.equal(search.matchesLibrarySearch(maria,''),true);
});

test('Content search respects active publication, server page caps and failed reads',async()=>{
 let fail=false;
 const pages=[[{id:'a',body_md:'assunto'}],[{id:'b',body_md:'lei'}],[]];
 const offsets=[];
 const query={select(){return this},eq(field,value){assert.equal(field,'content_status');assert.equal(value,'active');return this},order(){return this},range(start){offsets.push(start);return Promise.resolve(fail?{error:Error('failed'),data:null}:{error:null,data:pages[start]})}};
 const store=load('src/lib/studyMaterials.ts',{'@/lib/userStorage':{},'@tanstack/react-query':{},'@/integrations/supabase/client':{supabase:{from:table=>{assert.equal(table,'study_materials');return query}}}});
 const rows=await store.fetchLibrarySearchContent();
 assert.equal(rows.length,2);assert.deepEqual(offsets,[0,1,2]);
 fail=true;await assert.rejects(store.fetchLibrarySearchContent(),/failed/);
});

test('Antifaction comparison preserves practice, separates definitions from offences and renders five colored cases',()=>{
 const pack=JSON.parse(readFileSync('docs/library/antifaccao-comparison-review-2026-10-07.json','utf8'));
 assert.equal(validateLawReview(pack).materials,1);
 const current=pack.materials[0];
 const previous=review.materials.find(m=>m.slug===current.slug).patch;
 assert.equal(current.slug,'legislacao-antifaccao-marco-legal');
 assert.deepEqual(current.patch.flashcards.slice(0,previous.flashcards.length),previous.flashcards);
 assert.equal(current.patch.flashcards.length,26);
 assert.equal(pack.courses.length,0);
 assert.ok(!Object.hasOwn(current.patch,'quiz'));
 assert.equal(pack.enrichments.length,1);
 assert.ok(pack.enrichments.every(e=>e.expected.status==='active'&&e.expected.source_body_sha256&&Object.keys(e.patch).join()==='source_body_sha256'));
 const {Markdown}=load('src/components/library/Markdown.tsx',{'@/lib/studySourceUrl':{isStudySourceUrl:url=>/^https:\/\//.test(url)}});
 const html=renderToStaticMarkup(React.createElement(Markdown,{source:readFileSync('docs/library/antifaccao-associacoes-comparacao-2026-10-07.md','utf8')}));
 assert.equal((html.match(/class="study-example"/g)??[]).length,5);
 assert.match(html,/definição não é o mesmo que tipo penal/);
 assert.match(html,/reiteradamente ou não/);
 assert.match(html,/no que couber/);
 assert.match(html,/não autoriza somar os quatro crimes automaticamente/);
 assert.equal(current.patch.legal_review.sources.filter(s=>/planalto|stj/.test(s.url)).length,7);
 const change=current.patch.legal_review.changes.find(c=>/l15245/.test(c.url));
 assert.match(change.vigency,/30\/10\/2025.*art\. 4º/);
});

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
