import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {validateLawReview} from './apply-library-law-review.mjs';

const read=name=>JSON.parse(readFileSync(`docs/library/${name}`,'utf8'));
const additions=read('continuation-cases-2026-10-11.json');
const review=read('continuation-review-2026-10-11.json');
const examples=read('continuation-examples-2026-10-11.json');
const coverage=read('continuation-coverage-2026-10-11.json').rows;

test('Continuation appends cases and illustrations without losing previously published teaching',()=>{
  const previous=read('completion-examples-2026-10-09.json');
  assert.equal(examples.length,4);
  for(const entry of examples){
    const old=previous.find(x=>x.material_slug===entry.material_slug);
    assert.deepEqual(entry.content.cases.slice(0,old.content.cases.length),old.content.cases);
    assert.deepEqual(entry.content.illustrations.slice(0,old.content.illustrations.length),old.content.illustrations);
    assert.equal(entry.content.cases.length,old.content.cases.length+6);
    assert.equal(new Set(entry.content.cases.map(c=>c.id)).size,entry.content.cases.length);
    for(const c of entry.content.cases.slice(old.content.cases.length)){
      assert.ok(c.variation.scenario&&c.variation.answer&&c.pitfall);
      assert.ok(c.steps.length>=2&&c.articles.length);
    }
  }
});

test('Existing saved deck indices are preserved; new case cards do not leak the resolution',()=>{
  const old=read('tutor-law-review-2026-10-07.json');
  const recent=read('completion-practice-review-2026-10-10.json');
  for(const material of review.materials){
    const prior=recent.materials.find(x=>x.slug===material.slug)??old.materials.find(x=>x.slug===material.slug);
    assert.deepEqual(material.patch.flashcards.slice(0,prior.patch.flashcards.length),prior.patch.flashcards);
    assert.equal(material.patch.flashcards.length,prior.patch.flashcards.length+6);
    const row=coverage.find(c=>c.material_slug===material.slug);
    for(const [i,c] of additions[row.law].cases.entries()){
      const card=material.patch.flashcards[row.flashcards_before+i];
      assert.equal(card.f,c.scenario+'\n\n'+c.question);
      assert.ok(card.b.includes(c.conclusion)&&card.b.includes(c.variation.answer));
    }
  }
});

test('Bounded material review keeps law readings and learner progress outside the patch',()=>{
  assert.deepEqual(validateLawReview(review),{materials:4,courses:0,enrichments:0});
  for(const m of review.materials){
    const e=examples.find(x=>x.material_slug===m.slug);
    assert.equal(e.source_body_sha256,createHash('sha256').update(m.patch.body_md).digest('hex'));
    assert.ok(m.expected.updated_at&&m.expected.body_sha256);
    assert.match(m.patch.legal_review.scope,/Conferência pontual/);
    assert.match(m.patch.body_md,/não são questões oficiais de banca/);
  }
  assert.equal(coverage.reduce((n,r)=>n+r.cases_after-r.cases_before,0),24);
  assert.equal(coverage.reduce((n,r)=>n+r.flashcards_after-r.flashcards_before,0),24);
  assert.equal(coverage.reduce((n,r)=>n+r.quiz_after-r.quiz_before,0),24);
});

test('Exercises distinguish current deadlines, age limits, competence and nonautomatic effects',()=>{
  const cpp=additions['codigo-processo-penal'].cases;
  assert.match(cpp.find(c=>c.id==='cpp-ampl-decadencia').conclusion,/seis meses.*doze/);
  assert.match(cpp.find(c=>c.id==='cpp-ampl-decadencia').variation.answer,/não altera.*natureza da ação/);
  assert.match(cpp.find(c=>c.id==='cpp-ampl-fianca').variation.answer,/48 horas/);
  assert.match(cpp.find(c=>c.id==='cpp-ampl-recursos').variation.answer,/não estabelece concessão automática/);
  const lep=additions.lep.cases;
  assert.match(lep.find(c=>c.id==='lep-ampl-isolamento').conclusion,/20 − 8 = 12/);
  assert.match(lep.find(c=>c.id==='lep-ampl-falta-remicao').conclusion,/teto é vinte/);
  assert.match(lep.find(c=>c.id==='lep-ampl-conclusao-estudo').conclusion,/30 \+ 10 = 40/);
  for(const law of Object.values(additions)){
    assert.equal(law.quiz.length,6);
    assert.equal(law.quiz.filter(q=>q.a).length,3);
    assert.equal(law.quiz.filter(q=>!q.a).length,3);
  }
});

test('Published additions render in colored case blocks with collapsed resolutions and variations',()=>{
  const native=createRequire(import.meta.url);
  const load=(file,deps={})=>{
    const module={exports:{}};
    const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
    vm.runInNewContext(code,{module,exports:module.exports,require:name=>deps[name]??native(name),URL});
    return module.exports;
  };
  const diagrams=load('src/lib/learningDiagrams.ts');
  const illustrations=load('src/components/library/LearningIllustrations.tsx',{'@/lib/learningDiagrams':diagrams});
  const components=load('src/components/library/WorkedExamples.tsx',{
    './StudyText':{StudyText:({text})=>text,HighlightToggle:()=>null},
    './LearningIllustrations':illustrations,
    '@/lib/studyEnrichment':{useStudyEnrichment:()=>{throw Error('Unexpected network hook');}},
    '@/lib/studySourceUrl':{isStudySourceUrl:url=>new URL(url).hostname==='www.planalto.gov.br'},
  });
  for(const entry of examples){
    const html=renderToStaticMarkup(React.createElement(components.WorkedExampleContent,{enrichment:{...entry,content:{...entry.content,cases:entry.content.cases.slice(-6)}}}));
    assert.equal((html.match(/class="worked-case"/g)??[]).length,6);
    assert.equal((html.match(/class="worked-resolution mt-4"/g)??[]).length,6);
    assert.ok(!/<details[^>]*\bopen(?:=|\s|>)/.test(html));
    assert.ok(html.includes('worked-pitfall')&&html.includes('worked-variation'));
    assert.ok(html.includes('E se o caso mudar?')&&html.includes('Fontes destes exemplos'));
  }
  const css=readFileSync('src/styles.css','utf8');
  for(const name of ['--example-bg','--example-ink','--pitfall-bg','--variation-bg'])assert.ok(css.includes(name));
});
