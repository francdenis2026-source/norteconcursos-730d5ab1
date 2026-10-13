import test from 'node:test';
import assert from 'node:assert/strict';
import { cargoGroup, heatOf, countFor } from '../src/lib/cobrancas.ts';
import { buildMatcher, matchQuestion } from './cobrancas/match.mjs';

test('cargo é agrupado pelo nome do concurso e do cargo', () => {
  assert.equal(cargoGroup('Polícia Federal', 'Agente'), 'PF');
  assert.equal(cargoGroup('Polícia Rodoviária Federal', 'Policial'), 'PRF');
  assert.equal(cargoGroup('Polícia Civil do Estado de Rondônia - Escrivão', ''), 'PC');
  assert.equal(cargoGroup('Polícia Militar do Estado de São Paulo', 'Cabo PM'), 'PM');
  assert.equal(cargoGroup('Departamento Penitenciário Nacional', 'Agente'), 'Penal');
  assert.equal(cargoGroup('Câmara dos Deputados', 'Técnico'), 'Outros');
});

test('nível de cobrança e contagem por cargo', () => {
  assert.equal(heatOf(0), null);
  assert.equal(heatOf(1), 'baixa');
  assert.equal(heatOf(2), 'media');
  assert.equal(heatOf(4), 'alta');
  const stat = { n: 5, r: 2, p: 5, g: { PF: 4, PC: 1 }, c: [] };
  assert.equal(countFor(stat, 'all'), 5);
  assert.equal(countFor(stat, 'PF'), 4);
  assert.equal(countFor(stat, 'PRF'), 0);
  assert.equal(countFor(undefined, 'PF'), 0);
});

test('ligação por conteúdo escolhe o artigo mais parecido e recusa o ambíguo', () => {
  const units = [
    { slug: 'cp', unit_key: 'art-155', label: 'Art. 155', body_text: 'Subtrair, para si ou para outrem, coisa alheia móvel: pena de reclusão. Furto de coisa móvel alheia, subtração noturna, repouso noturno.' },
    { slug: 'cp', unit_key: 'art-312', label: 'Art. 312', body_text: 'Apropriar-se o funcionário público de dinheiro, valor ou outro bem móvel público: peculato, desvio em proveito próprio.' },
    { slug: 'cp', unit_key: 'art-121', label: 'Art. 121', body_text: 'Matar alguém: homicídio simples, motivo torpe, motivo fútil, meio cruel, qualificadoras do homicídio.' },
    { slug: 'cp', unit_key: 'art-171', label: 'Art. 171', body_text: 'Obter vantagem ilícita mediante artifício, ardil ou meio fraudulento, induzindo vítima em erro: estelionato.' },
    { slug: 'cp', unit_key: 'art-33', label: 'Art. 33', body_text: 'Regime inicial de cumprimento da pena de reclusão, fechado, semiaberto, aberto, progressão.' },
  ];
  const m = buildMatcher(units);
  const hit = matchQuestion(m, 'Configura peculato o funcionário público que desvia dinheiro público em proveito próprio, apropriando-se de bem móvel.', { min: 0.1, margin: 1.2 });
  assert.equal(hit?.art, 'art-312');
  assert.equal(matchQuestion(m, 'Questão sobre matemática financeira e juros.', { min: 0.1 }), null);
});
