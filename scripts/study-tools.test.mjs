import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const m = { exports: {} };
vm.runInNewContext(ts.transpileModule(readFileSync('src/lib/studyTools.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { module: m, exports: m.exports, require: () => ({}), Math, Number, Map, Set, BigInt, Error });
const { calc, describe, combinacao, arranjo, fat, regraDeTres, truthTable, parseNumbers } = m.exports;

test('calculadora respeita precedência, potência, porcentagem e parênteses', () => {
  assert.equal(calc('2+3*4'), 14);
  assert.equal(calc('(2+3)*4'), 20);
  assert.equal(calc('2^3^2'), 512);
  assert.equal(calc('-2^2'), -4);
  assert.equal(calc('50%'), 0.5);
  assert.equal(calc('5!'), 120);
  assert.equal(calc('sqrt(81)+abs(-3)'), 12);
  assert.equal(calc('1,5+1,5'), 3);
  assert.ok(Math.abs(calc('sin(30)') - 0.5) < 1e-12);
  assert.throws(() => calc('1/0'));
  assert.throws(() => calc('2+'));
  assert.throws(() => calc('2$3'));
  assert.throws(() => calc('foo(2)'));
});

test('estatística: média, mediana, moda e desvios', () => {
  const d = describe([2, 3, 3, 5, 12]);
  assert.equal(d.mean, 5);
  assert.equal(d.median, 3);
  assert.deepEqual([...d.modes], [3]);
  assert.equal(d.range, 10);
  assert.ok(Math.abs(d.varPop - 13.2) < 1e-9);
  assert.ok(Math.abs(d.varSample - 16.5) < 1e-9);
  assert.equal(describe([1, 2, 3, 4]).median, 2.5);
  assert.deepEqual([...describe([1, 2, 3]).modes], []);
  assert.deepEqual([...parseNumbers('1, 2;3 4,5 x')], [1, 2, 3, 4.5]);
  assert.equal(describe([]), null);
});

test('combinatória exata e regra de três', () => {
  assert.equal(fat(5), 120n);
  assert.equal(combinacao(5, 2), 10n);
  assert.equal(arranjo(5, 2), 20n);
  assert.equal(combinacao(60, 6), 50063860n);
  assert.throws(() => combinacao(2, 3));
  assert.equal(regraDeTres(4, 12, 6, true), 8);
  assert.equal(regraDeTres(2, 10, 6), 30);
});

test('tabela-verdade: equivalência da condicional e classificação', () => {
  const a = truthTable('p→q');
  const b = truthTable('¬p∨q');
  assert.deepEqual([...a.rows.map((r) => r.result)], [...b.rows.map((r) => r.result)]);
  assert.equal(truthTable('p∨¬p').kind, 'tautologia');
  assert.equal(truthTable('p∧¬p').kind, 'contradição');
  assert.equal(truthTable('p→q').kind, 'contingência');
  assert.deepEqual([...truthTable('p -> q').rows.map((r) => r.result)], [true, false, true, true]);
  assert.equal(truthTable('¬(p∧q)').rows.length, 4);
  assert.throws(() => truthTable('p∧'));
  assert.throws(() => truthTable('x'));
});
