import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const native=createRequire(import.meta.url);
function load(file,overrides={}) {
 const module={exports:{}};
 const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,require:n=>overrides[n]??native(n)});return module.exports;
}
const markdown=load('src/components/library/Markdown.tsx',{
 './GlossaryText':{GlossaryText:({text})=>text},
 '@/lib/studySourceUrl':{isStudySourceUrl:v=>v.startsWith('https://')},
 '@/lib/internalNavigation':{dashboardHref:v=>v.startsWith('/dashboard/')?v:null},
 '@tanstack/react-router':{Link:({to,children,...props})=>React.createElement('a',{...props,href:to},children)},
});
const reader=load('src/components/library/PortugueseStudyReading.tsx',{'./Markdown':markdown});
const pack=JSON.parse(readFileSync('supabase/imports/portugues-organizacao-2026-10-25/package.json','utf8'));

test('Portuguese reader indexes the actual subjects, gives each a working unique anchor and opens only the first initially',()=>{
 const source='## Regência\n\nPrimeiro texto.\n\n### Exemplo resolvido\n\n**Conclusão:** explicado.\n\n## Crase\n\nSegundo texto.';
 const html=renderToStaticMarkup(React.createElement(reader.PortugueseStudyReading,{source}));
 assert.ok(html.includes('aria-label="Assuntos deste material"'));
 const targets=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
 assert.equal(targets.length,2);assert.equal(new Set(targets).size,2);
 for(const target of targets)assert.ok(html.includes('id="'+target+'"'));
 assert.equal((html.match(/ open=""/g)||[]).length,1);
 assert.ok(html.includes('Primeiro texto.'));assert.ok(html.includes('Segundo texto.'));
 assert.ok(html.includes('class="study-example"'));
});

test('Sections preserve the introduction, nested headings, tables and links instead of slicing their contents',()=>{
 const source='Introdução.\r\n\r\n## Pronomes\r\n\r\n### Relativos\r\n\r\n| A | B |\r\n| --- | --- |\r\n| um | dois |\r\n\r\n[Revisar](/dashboard/library/portugues-regencia-crase)';
 const sections=reader.portugueseSections(source);
 assert.equal(sections.length,2);assert.equal(sections[0].title,'Apresentação');
 assert.ok(sections[1].body.includes('### Relativos'));assert.ok(sections[1].body.includes('| um | dois |'));
 const html=renderToStaticMarkup(React.createElement(reader.PortugueseStudyReading,{source}));
 assert.ok(html.includes('<table>'));assert.ok(html.includes('/dashboard/library/portugues-regencia-crase'));
});

test('The topic reader retains the supplied legal/highlight renderer for every section',()=>{
 const bodies=[];
 renderToStaticMarkup(React.createElement(reader.PortugueseStudyReading,{source:'## A\n\nUm.\n\n## B\n\nDois.',renderSection:body=>{bodies.push(body);return React.createElement('div',null,body);}}));
 assert.deepEqual(bodies,['Um.','Dois.']);
});

test('Every revised module has concrete examples and complete didactic cases while practice and topic identity stay untouched',()=>{
 assert.equal(pack.rows.length,17);assert.equal(pack.counts.preserved_local_questions,340);
 assert.equal(new Set(pack.rows.map(r=>r.slug)).size,17);
 let count=0;
 for(const row of pack.rows){
  assert.equal(row.expected_material.discipline,'Língua Portuguesa');
  assert.deepEqual(Object.keys(row.patch).sort(),['body_md','reviewed_at','reviewed_by','source_note','summary']);
  assert.ok(row.patch.body_md.includes('### ')||row.slug.startsWith('enem-'));
  const examples=row.patch.body_md.split('### Exemplo resolvido\n').slice(1);
  if(!row.slug.startsWith('enem-'))assert.ok(examples.length>=3,row.slug);
  for(const example of examples){assert.ok(example.includes('**Situação:**'));assert.ok(example.includes('**Análise:**'));assert.ok(example.includes('**Conclusão:**'));count++;}
  const html=renderToStaticMarkup(React.createElement(reader.PortugueseStudyReading,{source:row.patch.body_md}));
  assert.ok(html.includes('study-example'));assert.ok(!html.includes('undefined'));
  for(const c of row.enrichment.content.cases){
   for(const key of ['title','scenario','question','conclusion','pitfall'])assert.ok(c[key]?.trim(),row.slug+':'+key);
   assert.ok(c.steps.length&&c.steps.every(s=>s.trim()));assert.ok(c.variation.scenario&&c.variation.answer);
  }
  for(const c of row.expected_enrichment?.content.cases??[])assert.ok(row.enrichment.content.cases.some(n=>JSON.stringify(n)===JSON.stringify(c)),'Previous case preserved');
 }
 assert.equal(count,55);
});

test('Language examples use grammar labels while legal examples retain legal labels',()=>{
 const worked=load('src/components/library/WorkedExamples.tsx',{
  './StudyText':{StudyText:({text})=>text},'./LearningIllustrations':{LearningIllustration:()=>null},
  '@/lib/studyEnrichment':{},'@/lib/studySourceUrl':{isStudySourceUrl:()=>true},
 });
 const enrichment=pack.rows[1].enrichment;
 const language=renderToStaticMarkup(React.createElement(worked.WorkedExampleContent,{enrichment,languageStudy:true}));
 assert.ok(language.includes('Conceitos relacionados'));assert.ok(language.includes('Língua Portuguesa · exemplo comentado'));
 assert.ok(!language.includes('Dispositivos relevantes'));
 const legal=renderToStaticMarkup(React.createElement(worked.WorkedExampleContent,{enrichment}));
 assert.ok(legal.includes('Dispositivos relevantes'));
});
