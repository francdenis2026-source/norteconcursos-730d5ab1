import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSupportLines, reflowParagraphs, reflowStem, needsMissingSupportText } from '../src/lib/questionText.ts';

const PF = `  1 Imagine uma operação de busca na selva. Sem mapas,
    binóculos ou apoio logístico; somente com um facão. Assim
    eram feitas as operações de combate à pornografia infantil
  4 pela Polícia Federal até o dia em que peritos criminais
    federais desenvolveram, no estado de Mato Grosso do Sul,
    o Nudetective.
  7 O programa executa em minutos uma busca que
    poderia levar meses, encontrando todo o conteúdo
    pornográfico de pedofilia em computadores, pendrives,
 10 smartphones e demais mídias de armazenamento.`;

test('numeração de linhas do PDF é separada do texto', () => {
  const { lines, numbered } = parseSupportLines(PF);
  assert.equal(numbered, true);
  assert.equal(lines[0].n, 1);
  assert.equal(lines[0].text.startsWith('Imagine'), true);
  assert.equal(lines.find((l) => l.n === 10).text.startsWith('smartphones'), true);
  assert.equal(lines.filter((l) => l.n !== null).length, 4);
});

test('texto sem numeração não é tratado como numerado', () => {
  const r = parseSupportLines('Primeira linha do texto.\nSegunda linha continua aqui.\nTerceira linha encerra.');
  assert.equal(r.numbered, false);
  assert.equal(r.lines.length, 3);
});

test('linhas quebradas viram parágrafos e falas ficam separadas', () => {
  const lines = [
    'Imagine uma operação de busca na selva. Sem mapas,',
    'binóculos ou apoio logístico; somente com um facão.',
    'Assim eram feitas as operações.',
    '— Até o ponto a que chegou o seu trabalho? —',
    'perguntei.',
    '— Sim — respondeu Dupin.',
  ];
  const p = reflowParagraphs(lines);
  assert.ok(p.length >= 2 && p.length <= 4);
  assert.ok(p[0].includes('Imagine uma operação') && p[0].includes('facão.'));
  assert.ok(p.some((x) => x.startsWith('— Sim')));
});

test('enunciado quebrado em linhas é reunido sem mexer em listas', () => {
  const s = reflowStem('Considere as afirmações a seguir sobre o\ntexto lido, e julgue:\nI - primeira\nII - segunda');
  assert.equal(s.split('\n').length, 3);
  assert.ok(s.startsWith('Considere as afirmações a seguir sobre o texto lido'));
});

test('questões que dependem de um texto ausente são detectadas', () => {
  const pt = 'Língua Portuguesa';
  assert.equal(needsMissingSupportText({ subject: pt, text: 'De acordo com o texto, a ciência avança por rupturas.' }), true);
  assert.equal(needsMissingSupportText({ subject: pt, text: 'No primeiro parágrafo, o termo "medo" exerce função sintática.' }), true);
  assert.equal(needsMissingSupportText({ subject: pt, text: 'Texto-base:\nAlgum texto.\n\nDe acordo com o texto, ...' }), false);
  assert.equal(needsMissingSupportText({ subject: pt, text: 'Texto: “Embora a tecnologia tenha facilitado o acesso.” Com base nesse texto, julgue o item.' }), false);
  assert.equal(needsMissingSupportText({ subject: pt, text: 'O trecho "Embora tivesse provas" pode ser reescrito como…' }), false);
  assert.equal(needsMissingSupportText({ subject: 'Direito Penal', text: 'De acordo com o texto legal, o crime…' }), false);
});
