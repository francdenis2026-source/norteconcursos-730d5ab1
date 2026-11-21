import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const base = path.resolve('data/pcac-2026/2026-11-21');
const manifest = JSON.parse(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'));
assert.equal(manifest.contest_name, 'PC-AC 2026');
assert.equal(manifest.files.length, 15, 'Expected 15 discipline snapshots');

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
assert.equal(report.materials, 190);
assert.equal(report.quiz_items, 1474);
assert.ok(questionAnswers.size > 1000, 'Unexpectedly many identical quiz prompts');
console.log('PC-AC 2026 snapshot integrity:', JSON.stringify(report, null, 2));
