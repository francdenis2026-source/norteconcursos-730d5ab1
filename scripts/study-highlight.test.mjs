import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const load = (f, req) => { const m = { exports: {} }; vm.runInNewContext(ts.transpileModule(readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { module: m, exports: m.exports, require: req, RegExp, String, Math, Number }); return m.exports; };
const lh = load('src/lib/legalHighlights.ts', () => ({}));
const { studyTextParts } = load('src/lib/studyHighlight.ts', () => lh);
const kinds = (t) => [...studyTextParts(t).filter((p) => p.kind).map((p) => `${p.kind}:${p.text}`)];

test('números, prazos e penas são destacados', () => {
  const k = kinds('A pena é de reclusão de dez a quinze anos, e o prazo é de 30 dias.');
  assert.ok(k.some((x) => x.startsWith('sanction:reclusão')));
  assert.ok(k.some((x) => x.startsWith('quantity:') && x.includes('quinze anos')));
  assert.ok(k.some((x) => x === 'quantity:30 dias'));
});

test('proibições, restrições e exceções recebem destaques próprios', () => {
  const k = kinds('É vedado o uso, salvo autorização, e somente a autoridade pode decidir.');
  assert.ok(k.includes('prohibition:vedado'));
  assert.ok(k.some((x) => x.startsWith('exception:salvo')));
  assert.ok(k.includes('obligation:somente'));
});

test('rótulos de abertura viram etiqueta e o restante do texto continua destacado', () => {
  const p = studyTextParts('ATUALIZAÇÃO: o prazo passou a ser de 60 dias.');
  assert.equal(p[0].tag, 'update');
  assert.equal(p[0].text, 'ATUALIZAÇÃO');
  assert.ok(p.some((x) => x.kind === 'quantity' && x.text === '60 dias'));
  assert.equal(studyTextParts('Exemplo: João foi preso.')[0].tag, 'example');
  assert.equal(studyTextParts('Atenção: cuidado com o prazo.')[0].tag, 'warning');
});

test('texto sem destaque e partes sempre reconstroem o original', () => {
  const plain = 'O servidor deve agir com cuidado.';
  assert.equal(studyTextParts(plain).map((p) => p.text).join(''), plain);
  const t = 'ATUALIZAÇÃO: é vedado, em nenhuma hipótese, cobrar mais de 5% ao mês.';
  const joined = studyTextParts(t).map((p) => p.text).join('');
  assert.equal(joined.replace(/\s+/g, ' ').toLowerCase(), t.replace(/^atualiza[çc][ãa]o:\s*/i, '').replace(/\s+/g, ' ').toLowerCase().replace(/^/, 'atualização'));
});

test('palavras comuns não são marcadas por engano', () => {
  assert.equal(kinds('A casa é bonita e o carro novo está na garagem.').length, 0);
});
