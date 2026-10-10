import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const native=createRequire(import.meta.url);
function load(file,overrides={}) { const module={exports:{}}; const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText; vm.runInNewContext(code,{module,exports:module.exports,require:n=>overrides[n]??native(n),URL}); return module.exports; }
const laws=load('src/lib/legalLibrary.ts');
const organization=load('src/lib/libraryOrganization.ts',{'./legalLibrary':laws});
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
 assert.equal(organization.libraryArea(items[4]),'law');
 assert.equal(organization.libraryArea(items[6]),'legislation');
 assert.equal(organization.libraryArea(items[7]),'general');
 assert.equal(organization.LIBRARY_AREAS.filter(a=>a.id!=='all').reduce((sum,a)=>sum+items.filter(i=>organization.libraryArea(i)===a.id).length,0),items.length);
});
test('Navigator has four colored areas, three labelled dependent selectors and a single clear search',()=>{
 const {LibraryNavigation}=load('src/components/library/LibraryNavigation.tsx',{'@/lib/libraryOrganization':organization});
 const noop=()=>{};
 const html=renderToStaticMarkup(React.createElement(LibraryNavigation,{items,area:'legislation',onArea:noop,query:'11.340',onQuery:noop,discipline:'all',onDiscipline:noop,disciplines:organization.libraryDisciplines(items.filter(i=>organization.libraryArea(i)==='legislation')),topic:'all',onTopic:noop,topics:['Armas'],contest:'all',onContest:noop,contests:['PF','PC'],count:1,searchingContent:false,onReset:noop}));
 assert.equal((html.match(/aria-pressed="true"/g)??[]).length,1);
 assert.equal((html.match(/class="library-area library-tone-/g)??[]).length,4);
 assert.equal((html.match(/<select/g)??[]).length,3);
 assert.ok(html.includes('library-tone-amber'));assert.ok(html.includes('library-tone-blue'));assert.ok(html.includes('library-tone-teal'));
 assert.ok(!html.includes('<option value="Raciocínio Lógico"'));assert.ok(!html.includes('<option value="Direito Penal"'));
 assert.ok(html.includes('1</strong> material encontrado'));assert.ok(html.includes('Limpar filtros'));
 assert.ok(html.includes('aria-label="Limpar busca"'));
});
test('Each legal section contains only its own discipline and retains chronology within that section',()=>{
 const chronology=load('src/lib/legalChronology.ts');
 const search=load('src/lib/librarySearch.ts',{'./legalLibrary':laws});
 const match=load('src/components/library/LibrarySearchMatch.tsx',{'@/lib/librarySearch':search});
 const data=laws.LEGAL_LIBRARY.map(c=>({...c,id:c.slug,overview:{current_units:2,chapters:[]}}));
 const {LegalPathCatalog}=load('src/components/library/LegalPathCatalog.tsx',{'@/lib/legalCourses':{useLegalCourses:()=>({data,isPending:false,isError:false})},'@/lib/legalLibrary':laws,'@/lib/legalChronology':chronology,'@/lib/libraryOrganization':organization,'@/lib/librarySearch':search,'./LibrarySearchMatch':match,'@tanstack/react-router':{Link:({to,params,children,...props})=>React.createElement('a',{...props,href:to.replace('$slug',params.slug)},children)}});
 const html=renderToStaticMarkup(React.createElement(LegalPathCatalog,{userId:'test',materials:laws.LEGAL_LIBRARY.map(e=>sample(e.material_slug,'Legislação Especial')),searching:false}));
 assert.equal((html.match(/class="library-subject library-tone-/g)??[]).length,8);
 assert.equal((html.match(/Estudar: guia, exemplos e flashcards/g)??[]).length,42);
 for(const group of laws.LEGAL_GROUPS) {
  const start=html.indexOf('<h3>'+group+'</h3>');
  const stop=html.indexOf('<details class="library-subject',start);
  const section=html.slice(start,stop===-1?undefined:stop);
  for(const law of laws.LEGAL_LIBRARY)assert.equal(section.includes('/dashboard/library/'+law.material_slug),law.group===group,law.slug);
  const expected=laws.LEGAL_LIBRARY.filter(law=>law.group===group).sort(chronology.compareLawChronology);
  for(let i=1;i<expected.length;i++)assert.ok(section.indexOf('/dashboard/library/'+expected[i-1].material_slug)<section.indexOf('/dashboard/library/'+expected[i].material_slug));
 }
});
