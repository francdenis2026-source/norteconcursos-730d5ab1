import test from 'node:test';
import assert from 'node:assert/strict';
import { rhythmInsights } from '../src/lib/rhythmInsights.ts';

const s = (subject, total, accuracy, avgSeconds) => ({ subject, total, correct: Math.round((total * accuracy) / 100), accuracy, avgSeconds });

test('cruza acerto e tempo médio para apontar pontos fortes e fracos', () => {
  const { items, overallSeconds } = rhythmInsights([
    s('Português', 20, 90, 60), s('Constitucional', 20, 85, 100), s('Penal', 20, 40, 30), s('Informática', 20, 45, 120), s('Contabilidade', 20, 70, 62),
  ]);
  const by = Object.fromEntries(items.map((i) => [i.subject, i.kind]));
  assert.ok(overallSeconds > 0);
  assert.equal(by['Português'], 'strong');
  assert.equal(by['Constitucional'], 'strong-slow');
  assert.equal(by['Penal'], 'weak-fast');
  assert.equal(by['Informática'], 'weak-slow');
  assert.equal(by['Contabilidade'], 'neutral');
  assert.equal(items[0].kind, 'weak-slow', 'o que mais precisa de atenção vem primeiro');
});

test('amostra pequena não gera conclusão', () => {
  assert.equal(rhythmInsights([s('X', 3, 0, 10)]).items.length, 0);
});
