import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateArticlePackage,checkArticlePreflight,explanationPayload} from './article-explanation-package.mjs';
import {explanationExample,explanationPractice} from '../src/lib/explanationPractice.ts';
import {hasCurrentExplanationReview} from '../src/lib/explanationReview.ts';
import {buildExplanationQuiz} from '../src/lib/explanationQuiz.ts';
import {legalStudyCaveat} from '../src/lib/legalStudyCaveats.ts';
import ts from 'typescript';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const pack=JSON.parse(readFileSync('docs/library/article-explanations-identification-pension-2026-10-11.json','utf8'));
test('antifaction review preserves prior versions and separates timelines, percentages and constitutional guarantees',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-antifaction-procedures-2026-10-12.json','utf8'));
 validateArticlePackage(p);
 assert.equal(p.units.length,41);
 assert.equal(new Set(p.units.map(r=>r.unit_key)).size,41);
 assert.ok(!p.units.some(r=>['art-1','art-2','art-43'].includes(r.unit_key)));
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);assert.ok(r.prova.every(q=>explanationPractice(q)));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-5').pontos.join(' '),/não se somam 24 horas/);
 assert.match(get('art-24').atencao.join(' '),/Não importar as contas trimestrais/);
 assert.match(get('art-38').atencao.join(' '),/veda gravidade abstrata/);
 assert.match(get('art-40').simples,/condenação transitada em julgado/);
 assert.match(get('art-41').pontos.join(' '),/não a 60% de todas as receitas/);
 assert.match(get('art-42').simples,/25\/09\/2026/);
 assert.match(get('art-42').atencao.join(' '),/transição/);
 assert.ok(p.supplementary_source_evidence.some(e=>e.slug==='mpv1394'&&/^[a-f0-9]{64}$/.test(e.sha256)));
});
test('disputed antifaction rules and superseded betting fragments use qualified authored practice',()=>{
 for(const key of ['art-9','art-10','art-11','art-12','art-17','art-29','art-30','art-35','art-38','art-40','art-42']){
  assert.equal(legalStudyCaveat('antifaccao',key)?.literalPractice,false);
 }
 assert.equal(legalStudyCaveat('antifaccao','art-24'),null);
 assert.match(legalStudyCaveat('antifaccao','art-42').explanation,/revogou.*transitória/);
 assert.equal(legalStudyCaveat('antifaccao','art-2').literalPractice,false);
 assert.equal(legalStudyCaveat('lavagem','art-17-d').literalPractice,false);
});
test('drug care separates voluntary accommodation, exceptional hospitalization and PIA deadlines',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-care-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,25);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);assert.ok(r.prova.every(q=>explanationPractice(q)));}
 assert.ok(p.units.every(r=>parseInt(r.unit_key.split('-')[1],10)<27));
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-23-a').pontos.join(' '),/máximo de 90 dias.*72 horas/);
 assert.match(get('art-23-a').pontos.join(' '),/exclui os da segurança pública/);
 assert.match(get('art-23-b').pontos.join(' '),/30 dias desde ingresso/);
 assert.match(get('art-26-a').pontos.join(' '),/Adesão E permanência voluntárias/);
 assert.match(get('art-26-a').atencao.join(' '),/veda internação em comunidades/);
 assert.match(get('art-8-d').atencao.join(' '),/marco é a aprovação/);
 assert.match(get('art-16').prova.join(' '),/preservar a identidade/);
});
test('drug literal practice does not teach criminal cannabis use or absolute custody and conversion prohibitions',()=>{
 for(const key of ['art-27','art-28','art-29','art-30','art-35','art-44'])assert.equal(legalStudyCaveat('drogas',key)?.literalPractice,false);
 const cannabis=legalStudyCaveat('drogas','art-28');
 assert.match(cannabis.explanation,/presunção relativa/);
 assert.match(cannabis.explanation,/procedimento não penal/);
 const custody=legalStudyCaveat('drogas','art-44');
 assert.match(custody.explanation,/Inafiançabilidade não impõe custódia automática/);
 assert.match(custody.explanation,/conversão exige requisitos/);
 assert.match(legalStudyCaveat('drogas','art-35').explanation,/não dispensa estabilidade e permanência/);
 assert.equal(legalStudyCaveat('drogas','art-23-a'),null);
});
const native=createRequire(import.meta.url),module={exports:{}};
const code=ts.transpileModule(readFileSync('src/components/library/UnitExplanation.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
vm.runInNewContext(code,{module,exports:module.exports,require:name=>({
  '@/lib/legalCourses':{},
  '@/lib/explanationPractice':{explanationExample,explanationPractice},
  '@/lib/explanationReview':{hasCurrentExplanationReview},
  './LegalRefText':{LegalRefText:({text})=>React.createElement('span',null,text)},
}[name]??native(name))});
const {ExplanationChecks}=module.exports;
test('editorial approval requires reviewer, matching source and review of the latest content',()=>{
 const e={status:'published',reviewed_by:'reviewer',reviewed_at:'2026-10-11T20:00:00Z',updated_at:'2026-10-11T20:00:00Z',content_sha256:'hash'};
 assert.equal(hasCurrentExplanationReview(e,'hash'),true);
 assert.equal(hasCurrentExplanationReview({...e,reviewed_by:null},'hash'),false);
 assert.equal(hasCurrentExplanationReview({...e,reviewed_at:null},'hash'),false);
 assert.equal(hasCurrentExplanationReview({...e,updated_at:'2026-10-11T21:00:00Z'},'hash'),false);
 assert.equal(hasCurrentExplanationReview(e,'changed-source'),false);
 assert.equal(hasCurrentExplanationReview({...e,status:'under_review'},'hash'),false);
});
test('true/false uses authored yes/no answers rather than turning headings into true assertions',()=>{
 const items=buildExplanationQuiz(['O prazo é sempre trinta dias? Não; há prazos distintos.','A remoção é medida administrativa? Sim; é distinta de penalidade.','Qual é o prazo? Trinta dias.','Assertiva que reduz o prazo erra.'],'unit');
 assert.equal(items.length,2);
 assert.equal(items.find(i=>i.text.startsWith('O prazo')).correct,false);
 assert.equal(items.find(i=>i.text.startsWith('A remoção')).correct,true);
 assert.equal(items.find(i=>i.text.startsWith('O prazo')).why,'Não; há prazos distintos.');
 assert.deepEqual(buildExplanationQuiz(['Rol de penalidades.','O prazo? A lei define.'],'unit'),[]);
});
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
  const s=fixture(),reviewedAt=new Date().toISOString();s.legal_unit_explanations=pack.units.map(r=>({...explanationPayload(r),status:'published',reviewed_by:'verified-reviewer',reviewed_at:reviewedAt,updated_at:reviewedAt}));assert.doesNotThrow(()=>checkArticlePreflight(pack,s));
  s.legal_unit_explanations[0].reviewed_by=null;assert.throws(()=>checkArticlePreflight(pack,s));
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

for (const [file,count] of [['pcd-foundations',39],['pcd-accessibility',21],['pcd-communication',20],['pcd-capacity-crimes',14],['pcd-recent-communication',2],['pcd-final',31]]) {
 test(`LBI reviewed package ${file}: explicit cases and answer keys`,()=>{
  const p=JSON.parse(readFileSync(`docs/library/article-explanations-${file}-2026-10-11.json`,'utf8'));
  validateArticlePackage(p);assert.equal(p.units.length,count);
  for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 });
}

test('LBI complete review covers 127 distinct current units and preserves historical warnings',()=>{
 const names=['foundations','accessibility','communication','capacity-crimes','recent-communication','final'];
 const rows=names.flatMap(n=>JSON.parse(readFileSync(`docs/library/article-explanations-pcd-${n}-2026-10-11.json`,'utf8')).units);
 assert.equal(rows.length,127);assert.equal(new Set(rows.map(r=>r.unit_key)).size,127);
 for(const k of ['art-29','art-82','art-106'])assert.ok(!rows.some(r=>r.unit_key===k));
 const row=k=>rows.find(r=>r.unit_key===k);
 assert.match(row('art-103').simples,/revogado.*14.230/);
 assert.match(row('art-114').simples,/revogados.*CPC/);
 assert.match(row('art-126').simples,/31\/12\/2026/);
 assert.match(row('art-111').simples,/120 dias/);
 assert.match(row('art-109').simples,/gravíssima/);
});

test('five investigation statutes: closed practice preserves constitutional and repeal distinctions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-investigation-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,30);
 assert.deepEqual(p.laws.map(l=>l.units),[4,13,2,7,4]);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 assert.ok(p.units.flatMap(r=>buildExplanationQuiz(r.prova,r.unit_id)).length>=30);
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('temporaria','art-1').simples,/cinco requisitos cumulativos/);
 assert.match(get('temporaria','art-4').simples,/revogada.*13.869/);
 assert.match(get('tortura','art-1').atencao.join(' '),/fechado não é obrigatório/);
 assert.match(get('tortura','art-1').simples,/21\/05\/2026/);
 assert.match(get('identificacao-criminal','art-7-a').atencao.join(' '),/cumprimento da pena/);
 assert.match(get('identificacao-criminal','art-3').atencao.join(' '),/30 dias/);
 assert.match(get('delegado','art-2').simples,/afastou.*exclusividade/);
});

test('special procedures cover 71 current units with cases and preserve different safeguards',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-special-procedures-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,71);assert.deepEqual(p.laws.map(l=>l.units),[17,14,18,22]);
 assert.equal(new Set(p.units.map(r=>r.unit_id)).size,71);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('interceptacao','art-5').simples,/renovações sucessivas/);
 assert.match(get('interceptacao','art-2').atencao.join(' '),/quatro anos.*8º-A/);
 assert.match(get('trafico-pessoas','art-7').simples,/revogado.*13.445/);
 assert.match(get('trafico-pessoas','art-11').atencao.join(' '),/12h.*não autoriza interceptação/);
 assert.match(get('testemunhas','art-2').simples,/não da eventual preservação/);
 assert.match(get('testemunhas','art-14').simples,/maio de 2026.*cumulativos/);
 assert.match(get('terrorismo','art-2').simples,/um ou mais/);
 assert.match(get('terrorismo','art-5').atencao.join(' '),/não aplicar.*indistintamente/i);
});

test('organization review distinguishes current amendments, historical CP and infiltration limits',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-organizacoes-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,37);assert.equal(new Set(p.units.map(r=>r.unit_id)).size,37);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-2').simples,/15.487\/2026.*mesmo sem menor/);
 assert.match(get('art-288').simples,/15.245\/2025.*§2º/);
 assert.match(get('art-4').atencao.join(' '),/irrenunciável.*não podem apoiar-se apenas nas declarações/i);
 assert.match(get('art-10').atencao.join(' '),/720.*virtual/);
 assert.match(get('art-10-a').simples,/720 dias no total/);
 assert.match(get('art-21-b').simples,/duas ou mais/);
 assert.match(get('art-15').atencao.join(' '),/transações.*dado cadastral/);
});

test('abuse review preserves intent, nonautomatic effects and current advocacy penalty',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-abuso-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,40);assert.equal(new Set(p.units.map(r=>r.unit_id)).size,40);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-1').simples,/finalidade específica/);
 assert.match(get('art-4').simples,/reincidência em abuso.*não são automáticas/);
 assert.match(get('art-10').simples,/mesmo com intimação prévia/);
 assert.match(get('art-43').simples,/14.365\/2022.*2 a 4 anos/);
 assert.match(get('art-42').atencao.join(' '),/15.487\/2026/);
 assert.match(get('art-15-a').simples,/aumenta 2\/3.*dobra/);
 assert.match(get('art-22').atencao.join(' '),/não substitui inviolabilidade/);
});

test('racism review distinguishes personal injury, recreation and nonautomatic effects',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-racismo-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,23);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-2-a').simples,/2 a 5 anos.*CP 140.*incondicionada/);
 assert.match(get('art-20-b').atencao.join(' '),/Não estender automaticamente/);
 assert.match(get('art-20-a').simples,/1\/3 até metade/);
 assert.match(get('art-18').simples,/não são automáticos.*art. 17.*vetado/);
 assert.match(get('art-6').atencao.join(' '),/exatamente 18/);
});

test('heinous review separates current catalog from revoked modifying fragments',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-hediondos-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,17);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-1').simples,/vicaricídio.*2026/);
 assert.match(get('art-2').simples,/não equivale.*liberdade provisória.*revogado/);
 assert.match(get('art-6').simples,/24 a 30.*15.397\/2026/);
 assert.match(get('art-7').simples,/1996.*concurso/);
 assert.match(get('art-8').atencao.join(' '),/1355\/2026.*embora não hediondo/);
 assert.match(get('art-214').simples,/revogado em 2009/);
 assert.match(get('art-270').simples,/não torna.*hediondo/);
});

test('federal basics preserve chemical deadlines, identity transition and force limits',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-federal-basics-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,51);assert.deepEqual(p.laws.map(l=>l.units),[23,7,13,8]);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('quimicos','art-2').atencao.join(' '),/338.*03\/08\/2026/);
 assert.match(get('quimicos','art-11').simples,/24 horas/);
 assert.match(get('quimicos','art-12').simples,/48h/);
 assert.match(get('quimicos','art-19').exemplo,/R\$300/);
 assert.match(get('cpf','art-1').atencao.join(' '),/não prova.*login/);
 assert.match(get('identidade','art-4').simples,/CPF tornou-se.*obrigatório/);
 assert.match(get('identidade','art-11').simples,/60 anos naquele marco/);
 assert.match(get('menor-potencial-ofensivo','art-4').simples,/não é impossibilidade/);
});

test('compliance review guards unconstitutional removal, financial records and force reporting',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-compliance-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,42);assert.deepEqual(p.laws.map(l=>l.units),[24,11,7]);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('lavagem','art-17-d').simples,/4911.*inconstitucional.*2020/i);
 assert.match(get('lavagem','art-7').simples,/estadual\/DF.*15.358\/2026/);
 assert.match(get('lavagem','art-10').simples,/cinco anos desde encerramento/);
 assert.match(get('lavagem','art-14').simples,/Banco Central/);
 assert.match(get('uso-forca','art-7').pontos.join(' '),/presídio.*sem exigir lesão/i);
 assert.match(get('ric','art-3').simples,/2009.*não deve ser ensinado/);
});

test('Henry Borel review separates constitutional requisitions, time rules and different protection statutes',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-henry-borel-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,34);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-5').simples,/14.826\/2024.*brincar/);
 assert.match(get('art-14').simples,/município não é sede.*não há delegado.*24h/);
 assert.match(get('art-15').simples,/24h/);
 assert.match(get('art-21').simples,/7192.*2024.*sem força vinculante/);
 assert.match(get('art-25').atencao.join(' '),/Não copiar pena.*2 a 5/);
 assert.match(get('art-29').atencao.join(' '),/26\/05\/2026.*benéficos/);
 assert.match(get('art-31').atencao.join(' '),/revogado em 2024.*121-A/);
 assert.match(get('art-33').simples,/1186.*idade da menina/);
});

test('antifaction comparison uses thresholds with material elements rather than headcount alone',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-antifaction-comparison-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,2);assert.equal(p.laws[0].course_current_units,43);
 const r=p.units.find(r=>r.unit_key==='art-2');
 assert.match(r.pontos.join(' '),/TRÁFICO começa em 2.*FACÇÃO em 3.*em 4/);
 assert.match(r.pontos.join(' '),/estável\/permanente.*reiteradamente ou não/);
 assert.match(r.atencao.join(' '),/não determina cumulação automática.*não certifica constitucionalidade/);
 assert.equal(r.prova.length,4);
 assert.equal(buildExplanationQuiz(r.prova,r.unit_id).length,2);
 for(const row of p.units){assert.ok(row.expected);assert.ok(explanationExample(row.exemplo).variation);for(const q of row.prova)assert.ok(explanationPractice(q));}
});

test('drug criminal review guards cannabis, sentencing, cooperation and impairment distinctions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-crimes-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,22);assert.equal(p.laws[0].course_current_units,84);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-28').atencao.join(' '),/40 g.*seis plantas.*presunção relativa/);
 assert.match(get('art-33').atencao.join(' '),/1154.*1241.*excepcionalmente expressiva/);
 assert.match(get('art-34').atencao.join(' '),/2026.*não é hediondo/);
 assert.match(get('art-35').atencao.join(' '),/1355.*2026.*não seja hediondo/);
 assert.match(get('art-40-a').atencao.join(' '),/mais gravosa não retroage/);
 assert.match(get('art-41').atencao.join(' '),/2025.*cumulativas.*2023.*alternatividade/);
 assert.match(get('art-46').simples,/parcial|não tinha plena capacidade/);
 assert.match(get('art-47').atencao.join(' '),/não significa internação automática/);
 for(const key of ['art-28','art-33','art-41','art-42','art-44']) assert.equal(legalStudyCaveat('drogas',key).literalPractice,false);
});

test('drug procedure separates custody, evidence, defense and constitutional hearing order',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-procedure-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,13);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-50').atencao.join(' '),/não é dispensa geral.*excepcional/);
 assert.match(get('art-50-a').simples,/trinta dias contados da apreensão/);
 assert.match(get('art-51').simples,/trinta.*preso.*noventa.*solto/);
 assert.match(get('art-55').atencao.join(' '),/antecede o recebimento/);
 assert.match(get('art-57').pontos.join(' '),/interrogatório ao final/);
 assert.match(get('art-59').simples,/347.*independe da prisão/);
 for(const key of ['art-48','art-50','art-54','art-57','art-59']) assert.equal(legalStudyCaveat('drogas',key).literalPractice,false);
});

test('drug final review preserves third parties, historical deadlines and current regulatory remissions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-final-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,25);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-60').atencao.join(' '),/2022.*origem lícita.*Boa-fé/);
 assert.match(get('art-62-a').pontos.join(' '),/revogado.*14.973\/2024/);
 assert.match(get('art-63-c').atencao.join(' '),/8.666.*revogada.*14.133.*12.607\/2025/);
 assert.match(get('art-63-f').pontos.join(' '),/exatamente seis não/);
 assert.match(get('art-66').pontos.join(' '),/1.036.*09\/07\/2026/);
 assert.match(get('art-37').atencao.join(' '),/2026.*integrada.*art. 33/);
 assert.match(get('art-74').atencao.join(' '),/Não aplicar.*automaticamente/);
 const packs=['drug-care','drug-crimes','drug-procedure','drug-final'].map(n=>JSON.parse(readFileSync(`docs/library/article-explanations-${n}-2026-10-12.json`,'utf8')));
 assert.equal(new Set(packs.flatMap(pack=>pack.units.map(r=>r.unit_key))).size,84);
 for(const key of ['art-37','art-40-a','art-63','art-63-a','art-63-c','art-66']) assert.equal(legalStudyCaveat('drogas',key).literalPractice,false);
});

test('drug structural repair preserves authored teaching and separates crime from treatment chapters',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-structure-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,11);
 for(const r of p.units){
  assert.notEqual(r.content_sha256,r.expected.content_sha256);
  for(const field of ['simples','pontos','atencao','exemplo','prova','termos','remissoes']) assert.deepEqual(r[field],r.expected[field]);
 }
 const chapters=JSON.parse(readFileSync('docs/library/drug-chapter-corrections-2026-10-12.json','utf8'));
 assert.equal(new Set(chapters.units.map(r=>r.unit_key)).size,84);
 const get=k=>chapters.units.find(r=>r.unit_key===k).chapter;
 assert.match(get('art-33'),/TÍTULO IV.*DOS CRIMES/);assert.doesNotMatch(get('art-33'),/Comunidade Terapêutica/);
 assert.match(get('art-27'),/DOS CRIMES E DAS PENAS/);
 assert.match(get('art-50'),/Da Investigação/);assert.match(get('art-55'),/Da Instrução Criminal/);
 assert.match(get('art-60'),/DESTINAÇÃO DE BENS/);assert.match(get('art-65'),/COOPERAÇÃO INTERNACIONAL/);
 const text=JSON.parse(readFileSync('docs/library/drug-structural-corrections-2026-10-12.json','utf8'));
 assert.equal(text.changes.length,11);assert.equal(text.additions.length,0);
 for(const r of text.changes) assert.equal(r.expected.body_text,r.body_text+'\n\n'+r.moved_captions.join('\n\n'));
});

test('arms registration review distinguishes institutional permissions and current administrative rules',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-arms-registration-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,13);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-4').pontos.join(' '),/trinta dias úteis/);
 assert.match(get('art-5').atencao.join(' '),/não significa porte nacional/);
 assert.match(get('art-6').atencao.join(' '),/2021.*população.*15.306\/2025/s);
 assert.match(get('art-7-a').atencao.join(' '),/5157.*2024.*inconstitucional.*50%/);
 assert.match(get('art-7').pontos.join(' '),/24 horas/);
 assert.match(get('art-9').atencao.join(' '),/311\/2025.*322\/2025.*19.040\/2025/);
 assert.match(get('art-11-a').simples,/R\$ 80 mais munição/);
 for(const key of ['art-3','art-5','art-6','art-7-a','art-9']) assert.equal(legalStudyCaveat('armas',key).literalPractice,false);
});
