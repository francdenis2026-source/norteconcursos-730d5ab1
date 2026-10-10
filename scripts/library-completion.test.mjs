import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {sessionAuthHeaders} from './supabase-session-auth.mjs';
import {validateLawReview} from './apply-library-law-review.mjs';
function load(file,overrides={}){const module={exports:{}};const native=createRequire(import.meta.url);const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;vm.runInNewContext(code,{module,exports:module.exports,require:name=>overrides[name]??native(name),URL});return module.exports;}
const highlights=load('src/lib/legalHighlights.ts');
const practice=load('src/lib/legalLiteralPractice.ts',{'./legalHighlights':highlights});
test('Literal practice uses exact source slices, distinct answers, explicit exceptions and numeric thresholds',()=>{
 for(const source of ['Art. 1. Pena: reclusão de 3 a 8 anos; salvo autorização.','A avaliação biopsicossocial considera impedimentos e barreiras.','Caput: 3 pessoas; § 1º: 3 pessoas.']){
  const exercises=practice.literalExercises(source);assert.ok(exercises.length>0);assert.ok(exercises.length<=3);
  assert.equal(new Set(exercises.map(x=>x.answer)).size,exercises.length);
  for(const e of exercises)assert.equal(e.before+e.answer+e.after,source);
 }
 assert.equal(practice.matchesLiteralAnswer('  SALVO  ','salvo'),true);
 assert.equal(practice.matchesLiteralAnswer('3','3 ou mais pessoas'),false);
 assert.equal(practice.matchesLiteralAnswer('inferior','igual ou inferior'),false);
 assert.equal(practice.literalExercises('').length,0);
});
test('Unanswered literal exercises withhold the selected answer and safely escape source HTML',()=>{
 const component=load('src/components/library/LegalLiteralPractice.tsx',{'@/lib/legalLiteralPractice':practice});
 const html=renderToStaticMarkup(React.createElement(component.LegalLiteralPractice,{source:'<script>alert(1)</script> Pena: reclusão de 3 a 8 anos.',label:'Art. 1'}));
 assert.ok(!html.includes('<script>'));assert.ok(html.includes('&lt;script&gt;'));
 assert.ok(html.includes('[lacuna]'));assert.ok(html.includes('disabled=""'));assert.ok(!html.includes('Correspondência literal correta'));
 assert.ok(!html.includes('de 3 a 8 anos'));
 const duplicated=renderToStaticMarkup(React.createElement(component.LegalLiteralPractice,{source:'Art. 1. 3 pessoas; Art. 2. 3 pessoas.',label:'Art. 1'}));
 assert.ok(!duplicated.includes('3 pessoas'));assert.ok(duplicated.includes('outra ocorrência omitida'));
 const route=readFileSync('src/routes/dashboard/legal-course.$slug.tsx','utf8');
 assert.ok(route.indexOf('<LegalLiteralPractice')>route.indexOf('(mode === "read" || revealed)'));
 assert.ok(route.includes('key={unit.content_sha256}'));
});
test('Historical CPP curator wording is not drilled as a current requirement; practical cards append to existing decks',()=>{
 const {legalStudyCaveat}=load('src/lib/legalStudyCaveats.ts');
 assert.equal(legalStudyCaveat('codigo-processo-penal','art-262').literalPractice,false);
 assert.equal(legalStudyCaveat('codigo-penal','art-262'),null);
 const pack=JSON.parse(readFileSync('docs/library/completion-practice-review-2026-10-10.json','utf8'));
 assert.equal(validateLawReview(pack).materials,5);
 const previous=JSON.parse(readFileSync('docs/library/tutor-law-review-2026-10-07.json','utf8'));
 for(const material of pack.materials){
  const old=previous.materials.find(x=>x.slug===material.slug).patch.flashcards;
  assert.deepEqual(material.patch.flashcards.slice(0,old.length),old);
  assert.ok(material.patch.flashcards.length>old.length);
 }
 assert.equal(pack.materials.find(x=>x.slug==='penal-principios-direito-penal').patch.quiz.length,8);
});
test('Session auth supports legacy JWT and modern secret without persisting credentials',()=>{
 assert.deepEqual(sessionAuthHeaders('aa.bb.cc'),{apikey:'aa.bb.cc',Authorization:'Bearer aa.bb.cc'});
 assert.deepEqual(sessionAuthHeaders('sb_secret_example'),{apikey:'sb_secret_example'});
 assert.throws(()=>sessionAuthHeaders(''));
});
test('Completion preserves law identities and previous flashcards while correcting unsafe pending examples',()=>{
 const pack=JSON.parse(readFileSync('docs/library/completion-review-2026-10-09.json','utf8'));
 assert.equal(validateLawReview(pack).materials,39);assert.equal(pack.courses.length,39);
 assert.ok(pack.materials.every(m=>!Object.hasOwn(m.patch,'flashcards')&&!Object.hasOwn(m.patch,'quiz')));
 const examples=JSON.parse(readFileSync('docs/library/completion-examples-2026-10-09.json','utf8'));
 assert.equal(examples.length,39);
 const cases=slug=>examples.find(x=>x.material_slug===slug).content.cases;
 assert.match(cases('legislacao-armas-revisao').find(x=>x.id==='arm-1').variation.answer,/ADI 3112/);
 assert.match(cases('legislacao-tortura-revisao').find(x=>x.id==='tor-3').conclusion,/não se afirma fechado obrigatório/);
 assert.match(cases('legislacao-drogas-revisao').find(x=>x.id==='drog-5').variation.answer,/subsidiário/);
 assert.match(cases('legislacao-temporaria-revisao').find(x=>x.id==='temp-2').conclusion,/cinco requisitos/);
 const anti=pack.materials.find(x=>x.slug==='legislacao-antifaccao-marco-legal').patch.body_md;
 assert.match(anti,/Caso concreto 5/);assert.ok(!anti.includes('Quem apenas apoia não é integrante'));
 const sql=readFileSync('supabase/migrations/20261010030000_reviewed_legal_unit_correction.sql','utf8');
 assert.match(sql,/Concurrent unit change/);assert.match(sql,/source_sha256 is distinct/);assert.ok(!sql.includes('legal_course_progress'));
});
