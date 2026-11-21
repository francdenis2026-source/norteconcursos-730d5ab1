import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const base = path.resolve('data/pcac-2026/2026-11-21');
const manifest = JSON.parse(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'));
assert.equal(manifest.contest_name, 'PC-AC 2026');
assert.equal(manifest.files.length, 15, 'Expected 15 discipline snapshots');

// A redação do material jurídico não é autorização de publicação: cada item
// exige registro completo de fontes oficiais verificadas, ainda que a aula exista.
const LEGAL_DISCIPLINES = new Set([
  'Legislação Institucional',
  'Noções de Direito Administrativo',
  'Noções de Direito Constitucional',
  'Noções de Direito Penal e Processual Penal',
]);
const OFFICIAL_HOSTS = new Set(['www.planalto.gov.br', 'planalto.gov.br', 'legis.ac.gov.br', 'www.legis.ac.gov.br', 'www12.senado.leg.br', 'www.stf.jus.br', 'portal.stf.jus.br', 'noticias.stf.jus.br']);
const uniqueSlugs = new Set();
const questionAnswers = new Map();
const report = { disciplines: 0, materials: 0, quiz_items: 0, checked_reviews: 0, legacy_reviews: 0, pending_revalidation: 0, missing_reviews: 0 };
for (const item of manifest.files) {
  assert.match(item.path, /^data\/pcac-2026\/2026-11-21\/quiz-[a-z0-9-]+\.json$/);
  const fullPath = path.resolve(item.path);
  assert.ok(fullPath.startsWith(base + path.sep), 'Invalid path');
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  assert.equal(data.authorial_not_official, true);
  assert.equal(data.contest_name, manifest.contest_name);
  assert.equal(data.materials.length, data.modules);
  assert.equal(data.modules, item.modules);
  assert.equal(data.quiz_items, item.quiz_items);
  let quizCount = 0;
  for (const material of data.materials) {
    assert.ok(typeof material.slug === 'string' && material.slug.startsWith('pcac-2026-'));
    assert.equal(material.discipline, data.discipline);
    assert.ok(!uniqueSlugs.has(material.slug), 'Duplicate slug: ' + material.slug);
    uniqueSlugs.add(material.slug);
    assert.ok(Array.isArray(material.quiz) && material.quiz.length > 0, material.slug);
    const promptsInsideMaterial = new Set();
    for (const q of material.quiz) {
      assert.ok(typeof q.q === 'string' && q.q.trim(), 'Empty prompt: ' + material.slug);
      assert.equal(typeof q.a, 'boolean', 'Invalid answer: ' + material.slug);
      assert.ok(typeof q.why === 'string' && q.why.trim().length >= 80, 'Short explanation: ' + material.slug);
      const normalized = q.q.normalize('NFD').replace(/\p{M}/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
      assert.ok(!promptsInsideMaterial.has(normalized), 'Duplicate question in material: ' + material.slug);
      promptsInsideMaterial.add(normalized);
      const old = questionAnswers.get(normalized);
      assert.ok(!old || old.answer === q.a,
        'Conflicting answer to equivalent prompt: ' + material.slug + ' versus ' + (old?.slug ?? 'unknown'));
      questionAnswers.set(normalized, { answer: q.a, slug: material.slug });
      quizCount++;
    }
    const review = material.practice_review;
    if (LEGAL_DISCIPLINES.has(material.discipline) && review?.status === 'reviewed') {
      assert.equal(review.version, 1, 'Legacy legal approval: ' + material.slug);
      assert.ok(review.syllabus_topic_id && /^[0-9a-f-]{36}$/i.test(review.syllabus_topic_id), 'Missing legal syllabus reference: ' + material.slug);
      assert.ok(review.scope && review.checked_at && Array.isArray(review.sources) && review.sources.length, 'Unverified legal approval: ' + material.slug);
      for (const source of review.sources) {
        const url = new URL(source.url);
        assert.equal(url.protocol, 'https:', 'Non-HTTPS legal source: ' + material.slug);
        assert.ok(OFFICIAL_HOSTS.has(url.hostname) || /(?:^|\\.)(?:stf|stj)\\.jus\\.br$/.test(url.hostname), 'Nonofficial legal source: ' + material.slug);
        assert.match(source.sha256 ?? '', /^[0-9a-f]{64}$/i, 'Missing legal source SHA-256: ' + material.slug);
        assert.ok(!Number.isNaN(Date.parse(source.checked_at ?? '')), 'Missing legal source date: ' + material.slug);
      }
      assert.ok(Array.isArray(review.items) && review.items.length === material.quiz.length, 'Incomplete legal source-to-quiz mapping: ' + material.slug);
      for (const entry of review.items) {
        assert.ok(review.sources.some(source => source.url === entry.source_url), 'Unmapped legal evidence: ' + material.slug);
      }
    }
    if (!review) { report.missing_reviews++; continue; }
    if (review.status === 'needs_revalidation') report.pending_revalidation++;
    if (review.version !== 1) { report.legacy_reviews++; continue; }
    if (review.status !== 'reviewed') continue;
    assert.equal(review.material_slug, material.slug);
    assert.ok(Array.isArray(review.items));
    assert.equal(review.items.length, material.quiz.length, 'Review item count mismatch');
    for (let i = 0; i < material.quiz.length; i++) {
      const expected = material.quiz[i];
      const actual = review.items[i];
      assert.equal(actual.q, expected.q, 'Review question drift: ' + material.slug);
      assert.equal(actual.a, expected.a, 'Review answer drift: ' + material.slug);
      assert.equal(actual.why, expected.why, 'Review explanation drift: ' + material.slug);
    }
    report.checked_reviews++;
  }
  assert.equal(quizCount, item.quiz_items);
  report.disciplines++;
  report.materials += data.modules;
  report.quiz_items += quizCount;
}

const constitution = JSON.parse(fs.readFileSync(path.join(base, 'quiz-nocoes-de-direito-constitucional.json'), 'utf8'));
const acreConstitution = constitution.materials.find(m => m.slug === 'pcac-2026-constitucional-constituicao-acre-policia-civil');
assert.ok(acreConstitution, 'Missing Acre constitutional law lesson');
assert.equal(acreConstitution.quiz[2].a, false, 'STF ADI 7466 invalidated art. 131 IV: ISE is not a current security organ');
assert.match(acreConstitution.quiz[2].why, /ADI 7[.]466/);

const institutional = JSON.parse(fs.readFileSync(path.join(base, 'quiz-legislacao-institucional.json'), 'utf8'));
const institutionalAcre = institutional.materials.find(m => m.slug === 'pcac-2026-constituicao-seguranca-publica-art144-acre');
assert.ok(institutionalAcre, 'Missing institutional constitutional law lesson');
assert.equal(institutionalAcre.quiz[4].a, false, 'STF ADI 7466 invalidated art. 131 IV');
assert.match(institutionalAcre.quiz[4].why, /ADI 7[.]466/);

assert.equal(report.materials, 190);
assert.equal(report.quiz_items, 1474);
assert.ok(questionAnswers.size > 1000, 'Unexpectedly many identical quiz prompts');
console.log('PC-AC 2026 snapshot integrity:', JSON.stringify(report, null, 2));
