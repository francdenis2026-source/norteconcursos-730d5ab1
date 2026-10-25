import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSupportTextsSql } from './support-texts/build.mjs';

const doc = { contest: "Câmara dos Deputados", year: 2026, board: 'CEBRASPE', source: "Caderno CD-PLF 2026", texts: [{ label: 'Texto 1', body: "A ciência é feita de 'descobertas'.\n\nSegundo parágrafo.", items: [1, 2, 3] }, { label: 'Texto 2', body: 'Outro texto.', items: [4, 5] }] };

test('gera SQL que cadastra cada texto e liga aos itens da prova', () => {
  const sql = buildSupportTextsSql(doc);
  assert.match(sql, /insert into public\.question_support_texts/);
  assert.equal((sql.match(/update public\.official_exam_questions/g) || []).length, 2);
  assert.match(sql, /q\.item_number in \(1, 2, 3\)/);
  assert.match(sql, /q\.item_number in \(4, 5\)/);
  assert.match(sql, /exam_year = 2026/);
  assert.ok(sql.includes("'descobertas'"), 'aspas simples dentro do texto ficam intactas (dollar quoting)');
  assert.ok(sql.includes("'Câmara dos Deputados'"));
});

test('rejeita item repetido, texto vazio e itens inválidos', () => {
  assert.throws(() => buildSupportTextsSql({ ...doc, texts: [{ label: 'A', body: 'x', items: [1] }, { label: 'B', body: 'y', items: [1] }] }), /aparece nos textos/);
  assert.throws(() => buildSupportTextsSql({ ...doc, texts: [{ label: 'A', body: '  ', items: [1] }] }));
  assert.throws(() => buildSupportTextsSql({ ...doc, texts: [{ label: 'A', body: 'x', items: [] }] }));
  assert.throws(() => buildSupportTextsSql({ ...doc, texts: [{ label: 'A', body: 'x', items: ['1'] }] }));
  assert.throws(() => buildSupportTextsSql({ contest: 'X' }));
});
