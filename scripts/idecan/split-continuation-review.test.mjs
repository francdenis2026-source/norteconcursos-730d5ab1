import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { buildAll, reviewDirectory } from './build-continuation-review.mjs';
import { splitReview } from './split-continuation-review.mjs';

test('partes reproduzem todos os 177 pareceres, sem duplicação e com limite em bytes', () => {
  const { changes } = buildAll();
  const parts = splitReview(changes);
  assert.equal(parts.length, 6);
  assert.deepEqual(parts.flatMap((p) => p.items), changes);
  assert.equal(new Set(parts.flatMap((p) => p.items.map((c) => c.candidate))).size,177);
  const manifest = JSON.parse(fs.readFileSync(`${reviewDirectory}/partes/manifesto.json`));
  for (const [i,p] of parts.entries()) {
    assert.ok(Buffer.byteLength(p.sql) <= 180000);
    assert.equal(fs.readFileSync(`${reviewDirectory}/partes/${p.file}`,'utf8'),p.sql);
    assert.equal(manifest.parts[i].sha256,createHash('sha256').update(p.sql).digest('hex'));
    assert.equal(manifest.parts[i].bytes,Buffer.byteLength(p.sql));
    assert.deepEqual(manifest.parts[i].candidate_ids,p.items.map((c) => c.candidate));
  }
  assert.throws(() => splitReview(changes,100), /excede/);
});
