import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { authoredMaterialPractice, matchesMaterialScope } from '../src/lib/materialPractice.ts';
import { matchesPracticeReview, matchesDidacticReview } from '../src/lib/materialPracticeReview.ts';
const pack=JSON.parse(readFileSync(new URL('../supabase/imports/materials-normative-2026-10-24/course-additions-package.json',import.meta.url)));
const row=pack.rows.find(r=>r.review.law==='budapeste');
test('published snapshot unlocks its twenty normative exercises and carries official evidence',()=>{
 const qs=authoredMaterialPractice(row.quiz,{law:'budapeste'},row.slug,'Convenção',row.review);
 assert.equal(qs.length,20);assert.ok(qs.every(q=>q.legalBasis[0].url===row.review.sources[0].url));
 assert.equal(authoredMaterialPractice(row.quiz,{law:'budapeste'},row.slug,'Convenção').length,0);
});
test('approval is invalidated by any answer, explanation, statement, slug or official source change',()=>{
 for(const key of ['q','why','a']){const q=structuredClone(row.quiz);q[0][key]=key==='a'?!q[0][key]:q[0][key]+' changed';assert.equal(matchesPracticeReview(q,row.review,row.slug),false);}
 assert.equal(matchesPracticeReview(row.quiz,row.review,'other-material'),false);
 const r=structuredClone(row.review);r.sources[0].url='https://planalto.gov.br.evil.example/';assert.equal(matchesPracticeReview(row.quiz,r,row.slug),false);
 assert.equal(authoredMaterialPractice(row.quiz,{law:'eca'},row.slug,'Convenção',row.review).length,0);
});
test('convention and promulgating decree article numbers never leak into one another',()=>{
 const a=authoredMaterialPractice(row.quiz,{law:'budapeste',article:'Convenção — Artigo 2'},row.slug,'Convenção',row.review);
 assert.ok(a.length>0);assert.ok(a.every(q=>q.legalBasis[0].artigo==='Convenção — Artigo 2'));
 const b=authoredMaterialPractice(row.quiz,{law:'budapeste',article:'Art. 2'},row.slug,'Convenção',row.review);
 assert.ok(b.every(q=>!q.legalBasis[0].artigo.includes('Convenção')));
 const base={subject:'Direito Penal',contest:'',legalBasis:[{url:row.review.sources[0].url,artigo:'Art. 2'}]};
 assert.equal(matchesMaterialScope(base,{law:'budapeste',article:'Convenção — Artigo 2'}),false);
});

test('PC-AC didactic accounting approval only unlocks an exactly matching reviewed quiz', () => {
  const slug = 'pcac-2026-contabilidade-analise-financeira-conciliacao-fracionamento-atipicidade';
  const subject = 'Contabilidade Geral e Análise Financeira';
  const label = 'Análise de fluxos financeiros, fracionamento e padrões atípicos';
  const quiz = [
    { q: 'Fracionamento, isoladamente, comprova um crime.', a: false, why: 'É apenas um possível indício que exige investigação contextual.' },
    { q: 'Saldo final é saldo inicial somado aos créditos, menos os débitos.', a: true, why: 'É a identidade aritmética de movimentação, após conciliações.' },
  ];
  const review = {
    version: 1, review_type: 'didactic', status: 'reviewed',
    material_slug: slug, subject, topic_label: label,
    checked_at: '2026-11-21T12:00:00Z',
    method: 'Verificação de cada enunciado, gabarito e justificativa.',
    source_note: 'Material didático autoral PC-AC 2026.',
    items: quiz.map(({ q, a, why }) => ({ q, a, why })),
  };
  const scope = { subject };
  assert.equal(matchesDidacticReview(quiz, review, slug), true);
  assert.equal(authoredMaterialPractice(quiz, scope, slug, label, review).length, 2);
  assert.equal(authoredMaterialPractice(quiz, scope, slug, label).length, 0);
  for (const field of ['q', 'a', 'why']) {
    const altered = structuredClone(quiz);
    altered[0][field] = field === 'a' ? true : altered[0][field] + ' modified';
    assert.equal(matchesDidacticReview(altered, review, slug), false);
    assert.equal(authoredMaterialPractice(altered, scope, slug, label, review).length, 0);
  }
  const oldReview = { status: 'reviewed', items_checked: 2, review_date: '2026-11-14' };
  assert.equal(authoredMaterialPractice(quiz, scope, slug, label, oldReview).length, 0);
  assert.equal(matchesDidacticReview(quiz, { ...review, items: quiz.slice(0, 1) }, slug), false);
  assert.equal(matchesDidacticReview(quiz, { ...review, material_slug: 'other' }, slug), false);
});
