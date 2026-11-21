import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { authoredMaterialPractice, matchesMaterialScope } from '../src/lib/materialPractice.ts';
import { matchesPracticeReview, matchesDidacticReview, matchesManualReview, isPracticeOfficialSource } from '../src/lib/materialPracticeReview.ts';
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

test('PC-AC manual reviews unlock only matching nonlegal didactic exercises', () => {
  const slug = 'pcac-2026-guia-administracao-geral-02-funcoes-administrativas-podc';
  const quiz = [
    { q: 'Planejar define metas e métodos.', a: true, why: 'A função planejamento define objetivos e meios antes da execução.' },
    { q: 'Dirigir consiste exclusivamente em aplicar sanções.', a: false, why: 'A direção também envolve liderança, motivação, comunicação e orientação.' },
  ];
  const review = {
    version: 1, review_type: 'didactic_manual', status: 'reviewed',
    material_slug: slug, subject: 'Noções de Administração', topic_label: 'Funções administrativas',
    checked_at: '2026-11-21T12:00:00Z', method: 'Conferência individual',
    source_note: 'Material didático autoral', items: quiz,
  };
  assert.equal(matchesManualReview(quiz, review, slug), true);
  assert.equal(authoredMaterialPractice(quiz, { subject: 'Noções de Administração' }, slug, 'Funções administrativas', review).length, 2);
  assert.equal(authoredMaterialPractice(quiz, { subject: 'Noções de Administração' }, slug, 'Funções administrativas').length, 0);
  for (const key of ['q', 'a', 'why']) {
    const changed = structuredClone(quiz);
    changed[0][key] = key === 'a' ? false : changed[0][key] + ' altered';
    assert.equal(matchesManualReview(changed, review, slug), false);
  }
  assert.equal(matchesManualReview(quiz, { ...review, subject: 'Legislação Institucional' }, slug), false);
  assert.equal(matchesManualReview(quiz, { ...review, subject: 'Contabilidade Geral' }, slug), false);
  assert.equal(matchesManualReview(quiz, { ...review, material_slug: 'wrong-slug' }, slug), false);
  assert.equal(matchesManualReview(quiz, { ...review, status: 'needs_revalidation' }, slug), false);
  assert.equal(authoredMaterialPractice(quiz, {subject:'Noções de Direito Constitucional'}, slug, 'Artigo 37', {...review,subject:'Noções de Direito Constitucional'}).length, 0);
});

test('Acre legal source verification accepts the official LEGIS portal only', () => {
  assert.equal(isPracticeOfficialSource('https://www.legis.ac.gov.br/detalhar_constituicao'), true);
  assert.equal(isPracticeOfficialSource('https://legis.ac.gov.br/detalhar/674'), true);
  assert.equal(isPracticeOfficialSource('https://www.legis.ac.gov.br.evil.example/detalhar/674'), false);
  assert.equal(isPracticeOfficialSource('http://www.legis.ac.gov.br/detalhar/674'), false);
});

test('PC-AC saved subject reviews are enforced against exact production quiz snapshots', () => {
  const manifest = JSON.parse(readFileSync(new URL('../data/pcac-2026/2026-11-21/manifest.json', import.meta.url)));
  const permitted = new Set([
    'Análise de Dados e Informações', 'Estatística', 'Língua Portuguesa', 'Arquivologia', 'Contabilidade Geral',
    'Noções de Administração', 'Noções de Informática', 'Raciocínio Lógico',
    'Realidade do Estado do Acre', 'Tecnologia da Informação e Segurança da Informação',
  ]);
  let eligibleModules = 0;
  let availableItems = 0;
  for (const file of manifest.files) {
    const name = file.path.split('/').at(-1);
    const snapshot = JSON.parse(readFileSync(new URL('../data/pcac-2026/2026-11-21/' + name, import.meta.url)));
    for (const module of snapshot.materials) {
      const scope = { subject: module.discipline };
      const result = authoredMaterialPractice(module.quiz, scope, module.slug, module.topic_label, module.practice_review);
      const approved = permitted.has(module.discipline) && matchesManualReview(module.quiz, module.practice_review, module.slug);
      if (approved) {
        assert.equal(result.length, module.quiz.length, 'Valid didactic review must expose every unique item: ' + module.slug);
        eligibleModules++;
        availableItems += result.length;
      } else if (module.practice_review?.review_type === 'didactic_manual') {
        assert.equal(result.length, 0, 'Disallowed or out-of-date review must not expose questions: ' + module.slug);
      }
    }
  }
  assert.ok(eligibleModules >= 100);
  assert.ok(availableItems >= 700);
});

test('PC-AC reviewed archival-method topics open; privacy and normative archival topics remain locked', () => {
  const archived = JSON.parse(readFileSync(new URL('../data/pcac-2026/2026-11-21/quiz-arquivologia.json', import.meta.url)));
  let opened = 0, blocked = 0;
  for (const material of archived.materials) {
    const questions = authoredMaterialPractice(material.quiz, {subject:'Arquivologia'}, material.slug, material.topic_label, material.practice_review);
    if (material.slug.includes('-06-digitalizacao-acesso-') || material.slug.includes('-11-acesso-sigilo-') || material.slug.includes('-16-gestao-da-informacao-') || material.slug.includes('-05-documentos-digitais-') || material.slug.includes('-10-digitalizacao-e-preservacao-')) {
      assert.equal(questions.length, 0, 'Normative archival exercises must not be approved through a generic didactic review: ' + material.slug);
      blocked++;
    } else {
      assert.equal(questions.length, material.quiz.length, 'Reviewed archival-method exercises should be accessible: ' + material.slug);
      opened++;
      const changed = structuredClone(material.quiz);
      changed[0].a = !changed[0].a;
      assert.equal(authoredMaterialPractice(changed, {subject:'Arquivologia'}, material.slug, material.topic_label, material.practice_review).length, 0);
    }
  }
  assert.equal(opened,12);
  assert.equal(blocked,5);
});

test('PC-AC calculation-only accounting modules unlock after exact manual review; accounting norms remain locked', () => {
  const snapshot = JSON.parse(readFileSync(new URL('../data/pcac-2026/2026-11-21/quiz-contabilidade-geral.json', import.meta.url)));
  const eligibleSlugs = new Set([
    'pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao',
    'pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio',
  ]);
  let approved = 0;
  for (const lesson of snapshot.materials) {
    const scope = { subject: 'Contabilidade Geral' };
    const result = authoredMaterialPractice(lesson.quiz, scope, lesson.slug, lesson.topic_label, lesson.practice_review);
    if (eligibleSlugs.has(lesson.slug)) {
      assert.equal(result.length, lesson.quiz.length, 'Calculation lesson must expose each reviewed item: ' + lesson.slug);
      assert.equal(authoredMaterialPractice(lesson.quiz, {...scope, law:'codigo-penal'}, lesson.slug, lesson.topic_label, lesson.practice_review).length, 0);
      const changed = structuredClone(lesson.quiz); changed[0].why += ' altered';
      assert.equal(authoredMaterialPractice(changed, scope, lesson.slug, lesson.topic_label, lesson.practice_review).length, 0);
      approved++;
    } else assert.equal(result.length, 0, 'Normative accounting lesson must remain blocked: ' + lesson.slug);
  }
  assert.equal(approved,2);
});
