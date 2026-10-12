import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateArticlePackage,checkArticlePreflight,explanationPayload} from './article-explanation-package.mjs';
import {explanationExample,explanationPractice} from '../src/lib/explanationPractice.ts';
import ts from 'typescript';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const pack=JSON.parse(readFileSync('docs/library/article-explanations-identification-pension-2026-10-11.json','utf8'));
const native=createRequire(import.meta.url),module={exports:{}};
const code=ts.transpileModule(readFileSync('src/components/library/UnitExplanation.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
vm.runInNewContext(code,{module,exports:module.exports,require:name=>({
  '@/lib/legalCourses':{},
  '@/lib/explanationPractice':{explanationExample,explanationPractice},
  './LegalRefText':{LegalRefText:({text})=>React.createElement('span',null,text)},
}[name]??native(name))});
const {ExplanationChecks}=module.exports;
function fixture(){
  return {
    legal_courses:pack.laws.map(l=>{const r=pack.units.find(r=>r.course_slug===l.slug);return {id:r.course_id,slug:l.slug,status:'active',source_url:l.source_url,syllabus_topic_id:r.syllabus_topic_id};}),
    legal_course_units:pack.units.map(r=>({id:r.unit_id,course_id:r.course_id,unit_key:r.unit_key,content_status:'current',content_sha256:r.content_sha256})),
    syllabus_topics:pack.units.map(r=>({id:r.syllabus_topic_id,edition_id:r.edition_id,content_status:'current'})),
    syllabus_editions:pack.units.map(r=>({id:r.edition_id,status:'active'})),
    content_sources:pack.laws.flatMap(l=>[l.source_url,...(l.additional_sources??[]).map(s=>s.url)]).map(url=>({url,is_official:true,status:'vigente'})),
    legal_unit_explanations:pack.units.filter(r=>r.expected).map(r=>structuredClone(r.expected)),
  };
}
test('all 94 current units of four norms have authored cases, variations and closed-answer practice',()=>{
  validateArticlePackage(pack);assert.equal(pack.units.length,94);checkArticlePreflight(pack,fixture());
  for(const row of pack.units){assert.ok(explanationExample(row.exemplo).variation);for(const q of row.prova)assert.ok(explanationPractice(q));}
  assert.deepEqual(pack.laws.map(l=>l.units),[13,22,30,29]);
});
test('entire batch rejects changed source, stale curriculum, missing article or conflicting existing revision',()=>{
  for(const mutate of [s=>s.legal_course_units[0].content_sha256='f'.repeat(64),s=>s.syllabus_editions.forEach(e=>e.status='archived'),s=>s.legal_course_units.push({...s.legal_course_units[0],id:'00000000-0000-0000-0000-000000000000'}),s=>s.legal_unit_explanations[0].simples='A conflicting published revision',s=>s.legal_unit_explanations.shift()]){
    const s=fixture();mutate(s);assert.throws(()=>checkArticlePreflight(pack,s));
  }
  const s=fixture();s.legal_unit_explanations=pack.units.map(r=>({...explanationPayload(r),status:'published'}));assert.doesNotThrow(()=>checkArticlePreflight(pack,s));
});
test('practice does not guess answers for legacy notes and rendering keeps authored answer collapsed',()=>{
  assert.equal(explanationPractice('Uma assertiva comentada sem pergunta.'),null);
  assert.equal(explanationPractice('Uma pergunta sem resposta?'),null);
  const html=renderToStaticMarkup(React.createElement(ExplanationChecks,{items:['Qual regra? RESPOSTA-RESERVADA']}));
  assert.ok(!html.includes('textarea'));assert.match(html,/<details class="mt-2">/);assert.ok(!html.includes('<details open'));assert.ok(html.indexOf('RESPOSTA-RESERVADA')>html.indexOf('<details'));
});

test('targeted corrections require an explicit complete list, unchanged course count and previous revision',()=>{
 const p=structuredClone(pack),s=fixture(),law=p.laws[0],selected=p.units.filter(r=>r.course_slug===law.slug).slice(0,2);
 p.laws=[{...law,units:2,scope_type:'targeted_correction',course_current_units:law.units,target_unit_keys:selected.map(r=>r.unit_key)}];p.units=selected;
 p.units[0].content_sha256='d'.repeat(64);s.legal_course_units.find(u=>u.id===p.units[0].unit_id).content_sha256=p.units[0].content_sha256;
 assert.doesNotThrow(()=>checkArticlePreflight(p,s));
 const bad=structuredClone(p);bad.laws[0].target_unit_keys[1]=bad.laws[0].target_unit_keys[0];assert.throws(()=>checkArticlePreflight(bad,s));
 const incomplete=structuredClone(p);delete incomplete.units[0].expected;assert.throws(()=>checkArticlePreflight(incomplete,s));
});

test('security covers all 72 current units and distinguishes 2027 tax effects from 2026 checking',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-security-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,72);
 assert.equal(p.laws[0].additional_sources.length,3);
 for(const r of p.units){assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 for(const key of ['art-67','art-68']){const r=p.units.find(r=>r.unit_key===key);assert.ok(r.atencao.some(t=>t.includes('2027')&&t.includes('futura')));}
 const bad=structuredClone(p);bad.laws[0].additional_sources[0].url='https://unverified.invalid/lei';assert.throws(()=>validateArticlePackage(bad));
});

test('idosa covers every current article, excludes veto and distinguishes current penalties and historical remissions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-idosa-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,117);assert.ok(!p.units.some(u=>u.unit_key==='art-72'));
 for(const r of p.units){assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const unit=k=>p.units.find(r=>r.unit_key===k);
 assert.match(unit('art-94').simples,/não se aplica.*independentemente da pena/);
 assert.match(unit('art-99').simples,/dois a cinco.*três a sete.*oito a quatorze/);
 assert.match(unit('art-113').simples,/revogada.*art\. 75/);
 assert.match(unit('art-15').pontos.join(' '),/Tema 952.*Tema 1016/);
 assert.ok(p.laws[0].additional_sources.filter(r=>new URL(r.url).hostname==='processo.stj.jus.br').length===2);
 const guide=JSON.parse(readFileSync('docs/library/idosa-complete-path-review-2026-10-11.json','utf8'));
 assert.equal(guide.materials.length,2);
 for(const m of guide.materials){assert.ok(m.patch.body_md.includes('/dashboard/legal-course/idosa'));for(const old of m.expected.flashcards)assert.ok(m.patch.flashcards.some(c=>c.f===old.f&&c.b===old.b));}
 const bad=structuredClone(p);bad.laws[0].additional_sources[0].url='https://processo.stj.jus.br.unverified.invalid/';assert.throws(()=>validateArticlePackage(bad));
});
test('examples retain legal distinctions at age thresholds, biometrics and benefit review',()=>{
  const get=(slug,key)=>pack.units.find(r=>r.course_slug===slug&&r.unit_key===key);
  assert.match(get('cin','art-15').exemplo,/cinquenta e nove/);assert.match(get('cin','art-25').atencao.join(' '),/Não conte os dez anos da emissão/);
  assert.match(get('icn','art-3').simples,/exclui dados biométricos/);assert.match(get('sic','art-12').atencao.join(' '),/Não transporte os dois terços/);
  assert.match(get('pensao-regulamento','art-15').atencao.join(' '),/§2º remete literalmente/);assert.match(get('pensao-regulamento','art-10').atencao.join(' '),/exceção/);
});
