import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeExercises, exerciseDisciplines, exerciseTopics, filterExercises, hasStepByStep } from '../src/lib/exerciseCenter.ts';
const q = (id, subject, subtopic, extra = {}) => ({ id, subject, subtopic, ...extra });
test('merge keeps authored first and drops duplicate ids', () => {
  const out = mergeExercises([q('a', 'Português', 'Crase'), q('b', 'Português', 'Crase')], [q('b', 'Português', 'Crase'), q('c', 'Matemática', null)]);
  assert.deepEqual(out.map(x => x.id), ['a', 'b', 'c']);
});
test('disciplines counts and sorts pt-BR', () => {
  const out = exerciseDisciplines([q('1', 'Matemática', 'x'), q('2', 'Administração', 'y'), q('3', 'Matemática', 'x'), q('4', 'Ética', 'z')]);
  assert.deepEqual(out, [{ name: 'Administração', count: 1 }, { name: 'Ética', count: 1 }, { name: 'Matemática', count: 2 }]);
});
test('topics groups null and empty subtopic as "Geral"', () => {
  const out = exerciseTopics([q('1', 'Português', null), q('2', 'Português', ''), q('3', 'Português', 'Crase'), q('4', 'Matemática', 'Juros')], 'Português');
  assert.deepEqual(out, [{ name: 'Crase', count: 1 }, { name: 'Geral', count: 2 }]);
});
test('filter by discipline and topic', () => {
  const items = [q('1', 'Português', null), q('2', 'Português', 'Crase'), q('3', 'Matemática', 'Crase')];
  assert.deepEqual(filterExercises(items, 'Português', 'Geral').map(x => x.id), ['1']);
  assert.deepEqual(filterExercises(items, 'Português', 'Crase').map(x => x.id), ['2']);
  assert.deepEqual(filterExercises(items, 'Português', '').map(x => x.id), ['1', '2']);
});
test('hasStepByStep false for empty or missing steps', () => {
  assert.equal(hasStepByStep(q('1', 'a', 'b')), false);
  assert.equal(hasStepByStep(q('1', 'a', 'b', { resolutionSteps: [] })), false);
  assert.equal(hasStepByStep(q('1', 'a', 'b', { resolutionSteps: ['1º passo'] })), true);
});
