import * as sharedSubjects from "../src/lib/subjects.ts";
import * as sharedTaxonomy from "../src/lib/filterTaxonomy.ts";
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const native=createRequire(import.meta.url);
const contran=await import('../src/data/contranGuides.ts');
const contranStudy=await import('../src/lib/contranStudy.ts');
function load(file,overrides={}) { const module={exports:{}}; const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText; vm.runInNewContext(code,{module,exports:module.exports,require:n=>overrides[n]??native(n),URL}); return module.exports; }
const laws=load('src/lib/legalLibrary.ts');
const organization=load('src/lib/libraryOrganization.ts',{'./legalLibrary':laws,'./subjects':sharedSubjects});
test('CONTRAN current study rejects whole repeal and expired guides while preserving compatible amendments',()=>{
 const rows=contranStudy.currentContranGuides(contran.CONTRAN_GUIDES);
 assert.equal(contran.CONTRAN_GUIDES.length,100);assert.equal(rows.length,90);
 assert.equal(new Set(contran.CONTRAN_GUIDES.map(g=>g.number)).size,100);
 for(const n of [1029,1014,1011,1002,992,981,979,972,971,962])assert.ok(!rows.some(r=>r.number===n));
 const base=rows.find(r=>r.number===973);
 assert.equal(contranStudy.currentContranGuides([{...base,officialSituation:'Revoga a Resolução 180/05'}]).length,1);
 assert.equal(contranStudy.currentContranGuides([{...base,officialSituation:'Revogada pela Resolução 1020/25'}]).length,0);
 assert.equal(contranStudy.currentContranGuides([{...base,officialSituation:'Revogada em parte; artigos restantes em vigor'}]).length,1);
 assert.equal(contranStudy.currentContranGuides(contran.CONTRAN_GUIDES,'Resolução 1.026/2026')[0].number,1026);
 assert.equal(contranStudy.currentContranGuides(contran.CONTRAN_GUIDES,'álcool')[0].number,1031);
 assert.equal(rows[0].number,1026);
});
test('CONTRAN source editions match both audited batches and keep temporal and amendment caveats',()=>{
 const report=JSON.parse(readFileSync('docs/library/contran-review-2026-10-12.json','utf8'));
 const batch2=JSON.parse(readFileSync('docs/library/contran-review-2026-10-12-batch02.json','utf8'));
 assert.equal(report.batch_resolutions,50);
 assert.equal(batch2.batch_resolutions,50);assert.equal(batch2.current_guides,48);
 const evidence=[...report.evidence,...batch2.evidence];
 for(const guide of contranStudy.currentContranGuides(contran.CONTRAN_GUIDES)){
  const e=evidence.find(e=>e.number===guide.number);
  assert.equal(e.ok,true);assert.equal(guide.sourceSha256,e.sha256);
  const source=JSON.parse(readFileSync('public'+guide.textPath,'utf8'));
  assert.equal(source.source_url,guide.sourceUrl);assert.ok(source.text.length>80);
  assert.match(source.edition,/original.*não compilação/);
  assert.ok(guide.example.scenario&&guide.example.answer&&guide.example.variation&&guide.example.variationAnswer);
 }
 const get=n=>contran.CONTRAN_GUIDES.find(g=>g.number===n);
 assert.match(get(1031).warning,/12\/10\/2026.*vigência diferida/);
 assert.match(get(1026).warning,/12\/10\/2026.*novembro/);
 assert.match(get(1007).warning,/2026.*2027/);
 assert.match(get(1009).points.join(' '),/revogado pela 1020/);
 assert.match(get(923).points.join(' '),/15 para 30 dias/);
 assert.match(get(949).warning,/2026.*não apresentar.*futuro/);
 assert.match(get(939).warning,/28\/12\/2018.*retificado/);
 assert.match(get(936).points.join(' '),/1º\/01\/2021.*retificação/);
 assert.match(get(957).warning,/fronteira exata/);
 assert.equal(get(937).publicationDate,'2022-04-01');
 assert.equal(get(937).publicationIndexDate,'01.04.222');
 assert.match(get(917).example.answer,/superior a 2,50/);
 for(const e of batch2.evidence){
  const g=get(e.number);assert.ok(g.reviewedScope);
  assert.equal(g.sourceSha256,e.sha256);
 }
 for(const n of [954,948,949,939,936,924])assert.ok(get(n).relatedSources.some(s=>/delibera|retifica/i.test(s.label)));
});
test('CONTRAN library link respects discipline and contest filters, and cases keep their answers closed',()=>{
 const link=load('src/components/library/ContranLibraryLink.tsx',{
  '@/data/contranGuides':contran,'@/lib/contranStudy':contranStudy,
  '@tanstack/react-router':{Link:({to,search,children,...props})=>React.createElement('a',{...props,href:to+'?'+new URLSearchParams(search)},children)},
 }).ContranLibraryLink;
 const props={area:'legislation',discipline:'all',contest:'all',topic:'all',query:'1031'};
 const html=renderToStaticMarkup(React.createElement(link,props));
 assert.match(html,/Resoluções do CONTRAN/);assert.match(html,/\/dashboard\/ctb\?tab=resolucoes/);assert.ok(!html.includes('target="_blank"'));
 assert.equal(renderToStaticMarkup(React.createElement(link,{...props,contest:'PF'})),'');
 assert.equal(renderToStaticMarkup(React.createElement(link,{...props,discipline:'Direito Penal'})),'');
 const reader=load('src/components/library/ContranStudy.tsx',{'./StudyText':{StudyText:({text})=>text,HighlightToggle:()=>null},'@/data/contranGuides':contran,'@/lib/contranStudy':contranStudy,'@/data/ctbPanel':{RESOLUCOES_COBRADAS:[]},'@/components/ui/tabs':{Tabs:({children})=>React.createElement('div',null,children),TabsList:({children})=>React.createElement('div',null,children),TabsTrigger:({children})=>React.createElement('button',null,children),TabsContent:({children})=>React.createElement('div',null,children)}}).ContranStudy;
 const result=renderToStaticMarkup(React.createElement(reader,{query:'1031'}));
 assert.ok(result.includes('Caso prático'));assert.ok(result.includes('Agora é com você'));assert.ok(result.includes('Ver resposta comentada'));
 assert.ok(!/<details[^>]*\bopen(?:=|\s|>)/.test(result));
 assert.ok(result.includes('border-emerald-500')&&result.includes('border-violet-300'));
 assert.ok(!result.includes('Resolução 1.029/2026'));
});
const sample=(slug,discipline)=>({id:slug,slug,discipline,title:slug,topic_label:slug,summary:null,contest_name:'PF',content_status:'active',sort_order:1,syllabus_topic_order:1,law_version_checked_at:null});
const items=[
 sample('legislacao-armas-revisao','Legislação Especial'),
 sample('legislacao-drogas-revisao','Legislação Penal Especial'),
 sample('legislacao-cin-revisao','Legislação Especial'),
 sample('legislacao-maria-penha-revisao','Direito Penal'),
 sample('penal-principios-direito-penal','Legislação Especial'),
 sample('processo-penal-cpp-provas-flagrante-revisao','Direito Processual Penal'),
 sample('legislacao-uso-forca-revisao','Direitos Humanos'),
 sample('rlm-a','Raciocínio Lógico'), sample('port-a','Língua Portuguesa'),sample('admin-a','Direito Administrativo'),
];
test('Canonical study taxonomy separates laws despite historical mixed labels and preserves every material once',()=>{
 const groups=organization.libraryDisciplines(items);
 assert.equal(groups.flatMap(([,rows])=>rows).length,items.length);
 assert.equal(new Set(groups.flatMap(([,rows])=>rows.map(r=>r.id))).size,items.length);
 assert.equal(groups.find(([label])=>label==='Legislação penal extravagante')[1].length,2);
 assert.equal(organization.libraryDiscipline(items[3]),'Proteção de pessoas e violência doméstica');
 assert.equal(organization.libraryArea(items[4]),'legislation');
 assert.equal(organization.libraryArea(items[6]),'legislation');
 assert.equal(organization.libraryArea(items[7]),'general');
 assert.equal(organization.LIBRARY_AREAS.filter(a=>a.id!=='all').reduce((sum,a)=>sum+items.filter(i=>organization.libraryArea(i)===a.id).length,0),items.length);
});
test('Navigator has four colored areas, three labelled dependent selectors and a single clear search',()=>{
 const {LibraryNavigation}=load('src/components/library/LibraryNavigation.tsx',{'@/lib/libraryOrganization':organization,'@/lib/filterTaxonomy':sharedTaxonomy});
 const noop=()=>{};
 const html=renderToStaticMarkup(React.createElement(LibraryNavigation,{items,area:'legislation',onArea:noop,query:'11.340',onQuery:noop,discipline:'all',onDiscipline:noop,disciplines:organization.libraryDisciplines(items.filter(i=>organization.libraryArea(i)==='legislation')),topic:'all',onTopic:noop,topics:['Armas'],contest:'all',onContest:noop,contests:['PF','PC'],count:1,searchingContent:false,onReset:noop}));
 assert.equal((html.match(/aria-pressed="true"/g)??[]).length,1);
 assert.equal((html.match(/class="library-area library-tone-/g)??[]).length,4);
 assert.equal((html.match(/<select/g)??[]).length,3);
 assert.ok(html.includes('library-tone-amber'));assert.ok(html.includes('library-tone-blue'));assert.ok(html.includes('library-tone-teal'));
 assert.ok(!html.includes('<option value="Raciocínio Lógico"'));assert.ok(html.includes('<option value="Direito Penal"'));
 assert.ok(html.includes('1</strong> material encontrado'));assert.ok(html.includes('Limpar filtros'));
 assert.ok(html.includes('aria-label="Limpar busca"'));
});
test('Each legal section contains only its own discipline and retains chronology within that section',()=>{
 const chronology=load('src/lib/legalChronology.ts');
 const search=load('src/lib/librarySearch.ts',{'./legalLibrary':laws,'./subjects':sharedSubjects});
 const match=load('src/components/library/LibrarySearchMatch.tsx',{'@/lib/librarySearch':search});
 const data=laws.LEGAL_LIBRARY.map(c=>({...c,id:c.slug,overview:{current_units:2,chapters:[]}}));
 const {LegalPathCatalog}=load('src/components/library/LegalPathCatalog.tsx',{'@/lib/legalCourses':{useLegalCourses:()=>({data,isPending:false,isError:false})},'@/lib/legalLibrary':laws,'@/lib/legalChronology':chronology,'@/lib/libraryOrganization':organization,'@/lib/librarySearch':search,'./LibrarySearchMatch':match,'@tanstack/react-router':{Link:({to,params,children,...props})=>React.createElement('a',{...props,href:to.replace('$slug',params.slug)},children)}});
 const html=renderToStaticMarkup(React.createElement(LegalPathCatalog,{userId:'test',materials:laws.LEGAL_LIBRARY.map(e=>sample(e.material_slug,'Legislação Especial')),searching:false}));
 assert.equal((html.match(/class="library-subject library-tone-/g)??[]).length,8);
 assert.equal((html.match(/Estudar artigo por artigo/g)??[]).length,42);
 for(const group of laws.LEGAL_GROUPS) {
  const start=html.indexOf('<h3>'+group+'</h3>');
  const stop=html.indexOf('<details class="library-subject',start);
  const section=html.slice(start,stop===-1?undefined:stop);
  for(const law of laws.LEGAL_LIBRARY)assert.equal(section.includes('/dashboard/library/'+law.material_slug),law.group===group,law.slug);
  const expected=laws.LEGAL_LIBRARY.filter(law=>law.group===group).sort(chronology.compareLawChronology);
  for(let i=1;i<expected.length;i++)assert.ok(section.indexOf('/dashboard/library/'+expected[i-1].material_slug)<section.indexOf('/dashboard/library/'+expected[i].material_slug));
 }
});

const courseSearchLibrary = load('src/lib/librarySearch.ts', {'./legalLibrary': laws});
const courseSearch = load('src/lib/legalCourseSearch.ts', {'./librarySearch': courseSearchLibrary});
const searchUnit = (key, body, chapter = 'Crimes') => ({id:key,unit_key:key,label:`Art. ${key.slice(4)}`,chapter,body_text:body,content_status:'current'});
test('Article search finds deep text, accents and combined terms without numeric false positives', () => {
 const unit = searchUnit('art-213', 'Introdução. '.repeat(80) + 'Estupro mediante violência ou grave ameaça. Lesão corporal.');
 for (const query of ['estupro', 'AMEACA', 'lesao corporal', 'grave violencia', 'Art.213', 'artigo 213', '213']) assert.equal(courseSearch.matchesLegalUnit(unit, query), true, query);
 for (const query of ['estupro homicidio', 'art. 21', '21']) assert.equal(courseSearch.matchesLegalUnit(unit, query), false, query);
 assert.equal(courseSearch.matchesLegalUnit(searchUnit('art-798-a', 'Suspensão'), 'Art. 798-A'), true);
 const excerpt = courseSearch.legalSearchExcerpt(unit.body_text, 'estupro');
 assert.ok(excerpt.includes('Estupro')); assert.ok(excerpt.length < 260); assert.ok(excerpt.startsWith('…'));
 assert.equal(courseSearch.legalSearchExcerpt(unit.body_text, 'inexistente'), '');
});
test('A selected article outside the results is replaced; an empty result never opens an unrelated article', () => {
 const a=searchUnit('art-1','Estupro'), b=searchUnit('art-2','Outra regra');
 assert.equal(courseSearch.selectVisibleLegalUnit([a],b),a);
 assert.equal(courseSearch.selectVisibleLegalUnit([a,b],b),b);
 assert.equal(courseSearch.selectVisibleLegalUnit([],b),undefined);
});
test('Search highlighting preserves original text and remains available with study highlights disabled', () => {
 const highlights = load('src/lib/legalHighlights.ts');
 const {LegalSearchText} = load('src/components/library/LegalStudyReading.tsx', {
  '@/lib/legalHighlights': highlights, '@/lib/librarySearch': courseSearchLibrary,
  './LegalRefText': {LegalRefText:({text})=>text}, './Markdown': {}, '@/lib/legalRefs': {},
 });
 const text='Lesão corporal mediante violência. <script>não executar</script>';
 for (const highlighted of [true,false]) {
  const html=renderToStaticMarkup(React.createElement(LegalSearchText,{text,query:'lesao',highlighted}));
  assert.match(html, /data-search-hit="true" class="library-search-match">Lesão<\/mark>/);
  assert.ok(html.includes('&lt;script&gt;')); assert.ok(!html.includes('<script>'));
  const parts=courseSearchLibrary.libraryMatchParts(text,'lesao');
  assert.equal(parts.map(p=>p.text).join(''),text);
 }
});
function renderCourseSearch(query) {
 let stateCall=0;
 const rows=[searchUnit('art-1','Preâmbulo. '.repeat(80)+'Estupro consta no inciso V.'),searchUnit('art-2','Regra sem o termo pesquisado.')];
 const course={id:'course',slug:'hediondos',title:'Crimes hediondos',material_slug:'hediondos',overview:{intro:'',jurisprudence:[],contest:'PF',objectives:[]}};
 const none=()=>null;
 const stubs={
  react:{...React,useState:initial=>{const result=React.useState(initial);return ++stateCall===2?[query,result[1]]:result;}},
  '@tanstack/react-router':{createFileRoute:()=>options=>({...options,useSearch:()=>({art:'art-2'})}),useParams:()=>({slug:'hediondos'}),useNavigate:()=>none,Link:({children})=>React.createElement('a',null,children)},
  '@tanstack/react-query':{useQueryClient:()=>({})},sonner:{toast:{}},
  '@/components/ui/button':{Button:({children,onClick,disabled})=>React.createElement('button',{onClick,disabled},children)},
  '@/hooks/useDashboard':{useAuthStatus:()=>({user:{id:'test'},isLoading:false})},
  '@/hooks/useFocusMode':{useFocusMode:()=>({focus:false,bar:none,containerClass:''})},
  '@/lib/legalCourses':{useLegalCourses:()=>({data:[course]}),useLegalUnits:()=>({data:rows}),useLegalProgress:()=>({data:[],isPending:false}),useLegalExplanationCoverage:()=>({data:[]}),useLegalRefIndex:()=>({data:null}),useLegalExplanation:()=>({isSuccess:true,data:{simples:'Explicação geral'}})},
  '@/lib/legalLearning':{selectNextLegalUnit:()=>rows[1],legalProgressSummary:()=>({read:0,practiced:0,difficult:0,due:0})},
  '@/lib/legalCourseSearch':courseSearch,'@/lib/librarySearch':courseSearchLibrary,
  '@/components/library/LibrarySearchMatch':load('src/components/library/LibrarySearchMatch.tsx',{'@/lib/librarySearch':courseSearchLibrary}),
  '@/components/library/LegalRefText':{LegalRefProvider:({children})=>children},
  '@/lib/studyMaterials':{useStudyMaterial:()=>({})},'@/lib/mediaStore':{useMediaCatalog:()=>({catalog:[]})},'@/lib/relatedVideos':{lawVideos:()=>[]},
  '@/lib/cobrancaData':{topArticles:()=>[],cobrancaOf:none},'@/lib/cobrancas':{CARGO_GROUPS:[],countFor:()=>0},
  '@/components/study/StudyTools':{toolsAreaFor:none},'@/lib/legalStudyCaveats':{legalStudyCaveat:none},'@/lib/studySourceUrl':{isStudySourceUrl:()=>false},'@/integrations/supabase/client':{supabase:{}},
 };
 // Peripheral panels do not affect the search or article selection under test.
 const nullModule=new Proxy({}, {get:()=>none});
 const imports=[...readFileSync('src/routes/dashboard/legal-course.$slug.tsx','utf8').matchAll(/from "([^"]+)"/g)].map(m=>m[1]);
 for(const name of imports) if(!stubs[name]) stubs[name]=nullModule;
 const {Route}=load('src/routes/dashboard/legal-course.$slug.tsx',stubs);
 return renderToStaticMarkup(React.createElement(Route.component));
}
test('The course screen shows the found excerpt instead of the previously opened article',()=>{
 const html=renderCourseSearch('estupro');
 assert.match(html,/Trecho encontrado na busca/);assert.match(html,/>Estupro<\/mark>/);
 assert.match(html,/<h2[^>]*>Art\. 1<\/h2>/);assert.ok(!/<h2[^>]*>Art\. 2<\/h2>/.test(html));
 assert.ok(html.includes('Ver no texto oficial'));
});
test('The course screen explicitly reports no matches without leaving the previous lesson visible',()=>{
 const html=renderCourseSearch('inexistente');
 assert.ok(html.includes('Nenhum artigo corresponde'));assert.ok(!html.includes('id="dispositivo-aberto"'));
 assert.ok(html.includes('Limpar busca e filtros'));
});
