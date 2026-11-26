import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../src/estudo/estudo-pc-acre.html', import.meta.url), 'utf8');
function setup() {
  const context = vm.createContext({
    QS: [{ t: 'media', c: 0, ops: ['A', 'B'] }, { t: 'media' }, { t: 'probabilidade' }, { t: 'media' }, { t: 'media' }],
    QSUBJ: { 0: 'estatistica', 1: 'estatistica', 2: 'estatistica', 3: 'outra', 4: 'estatistica' },
    ans: {}, SHOW: {}, LOG: [],
    mixed: ids => ids, qIdx: t => [0, 1, 2, 3, 4].filter(i => context.QS[i].t === t),
    seen: i => context.LOG.some(row => row.i === i),
    save: () => {}, logAns: (i, ok) => context.LOG.push({ i, ok }),
    render: i => { context.scrolledTo = i; },
    document: { querySelectorAll: () => [{ id: 'q0' }, { id: 'q1' }] },
  });
  const start = html.indexOf('const HIDDEN = new Set();');
  const end = html.indexOf('let MIX = 0;', start);
  assert.ok(start > 0 && end > start);
  vm.runInContext(html.slice(start, end), context);
  return context;
}

test('ocultar respondida remove da leitura, preserva resposta e histórico e permite restaurar', () => {
  const c = setup(); c.choose(0, 0); c.hideAnswered(0);
  assert.deepEqual(Array.from(c.readingOrder([0, 1])), [1]);
  assert.equal(c.ans[0], 0); assert.equal(c.LOG.length, 1);
  assert.equal(c.scrolledTo, 1);
  c.restoreAnswered(); assert.deepEqual(Array.from(c.readingOrder([0, 1])), [0, 1]);
});
test('erro prioriza outra inédita do mesmo assunto e disciplina sem duplicar', () => {
  const c = setup(); c.choose(0, 1);
  assert.equal(c.relatedQuestion(0), 1);
  assert.deepEqual(Array.from(c.readingOrder([2, 0, 4, 1])), [2, 0, 1, 4]);
  c.hideAnswered(0);
  assert.deepEqual(Array.from(c.readingOrder([2, 0, 4, 1])), [1, 2, 4]);
});
test('não sugere respondidas, outro assunto ou outra disciplina; não inventa questão', () => {
  const c = setup(); c.ans[1] = 0; c.LOG.push({ i: 4, ok: false });
  assert.equal(c.relatedQuestion(0), null);
  c.choose(0, 1); assert.deepEqual(Array.from(c.readingOrder([0, 2, 3])), [0, 2, 3]);
});
test('acerto não altera ordem e questão pendente não pode ser ocultada', () => {
  const c = setup(); c.hideAnswered(0);
  assert.deepEqual(Array.from(c.readingOrder([0, 1])), [0, 1]);
  c.choose(0, 0); assert.deepEqual(Array.from(c.readingOrder([2, 0, 1])), [2, 0, 1]);
});