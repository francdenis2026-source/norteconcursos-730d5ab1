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

test('FGV inline full text and reviewed image support are recognized without accepting a missing text',()=>{
 const subject='Língua Portuguesa';
 const body='A biblioteca pública promove a leitura e reúne a comunidade em atividades culturais. Os participantes encontram livros e compartilham suas experiências, enquanto os profissionais organizam oficinas para diferentes públicos. ';
 for(const intro of ['Leia: ','Leia o texto a seguir: ','Leia a notícia a seguir, publicada em junho: ','Leia o seguinte trecho de poema, de um autor: ','Leia, a seguir, um trecho do texto de apresentação: '])assert.equal(needsMissingSupportText({subject,text:intro+body+' No texto, a ideia principal é apresentada.'}),false);
 assert.equal(needsMissingSupportText({subject,text:'Leia o texto a seguir: https://example.test/texto. No texto, a função conativa aparece.',figures:['https://example.test/support.png']}),false);
 assert.equal(needsMissingSupportText({subject,text:'Leia o texto a seguir: https://example.test/texto. No texto, a função conativa aparece.'}),true);
 assert.equal(needsMissingSupportText({subject,text:'Leia o texto a seguir: No texto, assinale a opção que apresenta a ideia correta. '+body}),true);
 assert.equal(needsMissingSupportText({subject,text:'Segundo o texto, qual a ideia principal?',figures:['https://example.test/decorative.png']}),true);
 assert.equal(needsMissingSupportText({subject,text:'Leia o texto a seguir: No texto, julgue a afirmação.',figures:['javascript:alert(1)']}),true);
});
