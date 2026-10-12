import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuestion } from '../src/lib/questionFormat.ts';

test('texto de apoio ligado: rótulo, parágrafos em branco e enunciado separados', () => {
  const raw = 'Texto-base [Texto 1]:\nPrimeiro parágrafo do texto.\n\nSegundo parágrafo do texto.\n\n[[/texto-base]]\nDe acordo com o texto, assinale a correta.\n(A) um\n(B) dois\n(C) três\n(D) quatro\n(E) cinco';
  const p = parseQuestion(raw);
  assert.equal(p.baseLabel, 'Texto 1');
  assert.ok(p.base.includes('Primeiro parágrafo') && p.base.includes('Segundo parágrafo'));
  assert.ok(p.stem.startsWith('De acordo com o texto'));
  assert.equal(p.options.length, 5);
});

test('formato antigo (sem marcador) continua funcionando', () => {
  const p = parseQuestion('Texto-base:\nUm texto curto.\n\nQual é a ideia central?\n(A) a\n(B) b\n(C) c\n(D) d');
  assert.equal(p.baseLabel, 'Texto de apoio');
  assert.equal(p.base, 'Um texto curto.');
  assert.equal(p.options.length, 4);
});
