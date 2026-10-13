import test from 'node:test';
test('CPP plenário integra garantias, recursos e execução do júri',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-jury-verdict-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,27);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(478).atencao.join(' '),/silêncio não é confissão/);
 assert.match(get(479).simples,/três dias úteis/);
 assert.match(get(483).atencao.join(' '),/não cria absolvição imune/);
 assert.match(get(492).pontos.join(' '),/independe do total da pena/);
 assert.match(get(497).exemplo,/não ao interventor/);
 for(const n of [475,483,492])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
test('CPP instalação preserva defesa e distingue contagem de aptidão',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-jury-installation-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,20);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(451).atencao.join(' '),/Não sortear impedido/);
 assert.match(get(456).pontos.join(' '),/mínimo de dez dias/);
 assert.match(get(457).pontos.join(' '),/ele e defensor/);
 assert.match(get(461).pontos.join(' '),/não encontrada.*certificado, julgamento ocorre/);
 assert.match(get(466).pontos.join(' '),/uso prolongado de celular/);
 assert.match(get(468).simples,/Defesa e depois MP/);
});
test('CPP organização distingue lista, convocação, conselho e dispensa',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-jury-organization-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,26);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(426).atencao.join(' '),/ter integrado Conselho/);
 assert.match(get(437).atencao.join(' '),/Não ensinar dispensa automática/);
 assert.match(get(439).atencao.join(' '),/Não apresentar função como imunidade/);
 assert.match(get(440).atencao.join(' '),/Não transformar desempate em aprovação garantida/);
 assert.match(get(447).atencao.join(' '),/quórum de instalação de quinze/);
});
test('CPP júri primeira fase distingue requisitos, prova indireta e recursos',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-jury-first-phase-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,19);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(413).pontos.join(' '),/isolado é insuficiente.*intimidação objetiva/);
 assert.match(get(415).pontos.join(' '),/única tese defensiva/);
 assert.match(get(416).simples,/apelação/);
 assert.match(get(422).simples,/até cinco testemunhas/);
 for(const n of [411,413])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
test('CPP rito comum protege defesa, prioridade e limites próprios',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-common-procedure-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,14);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(394).atencao.join(' '),/exatamente quatro/);
 assert.match(get('394-a').atencao.join(' '),/Não estender isenção ao acusado/);
 assert.match(get(397).pontos.join(' '),/salvo inimputabilidade/);
 assert.match(get(403).pontos.join(' '),/tempo de defesa individual/);
 assert.match(get(405).atencao.join(' '),/não significa dispensar acesso/);
});
test('CPP sentenças separa regime histórico, mudança factual e intimação',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-sentences-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,20);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 for(const n of [373,374,375,376,377,378,379,380,387])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
 assert.match(get(383).simples,/sem alterar os fatos/);
 assert.match(get(384).pontos.join(' '),/três testemunhas/);
 assert.match(get(386).pontos.join(' '),/inexistência provada versus ausência/);
 assert.match(get(392).pontos.join(' '),/igual ou superior a um ano/);
});
test('CPP proteção e citação não confundem edital, hora certa e prescrição',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-protection-citations-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,24);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get('350-a').pontos.join(' '),/qualquer crime/);
 assert.match(get(362).simples,/252–254.*atual/);
 assert.match(get(364).atencao.join(' '),/Não ensinar trinta/);
 assert.match(get(366).pontos.join(' '),/processo pode continuar suspenso/);
 assert.match(get(367).atencao.join(' '),/não presume verdade/);
 for(const n of [362,364,366])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
test('CPP fiança distingue competência, percentuais e prisão por pobreza',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-bail-2026-10-13.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,30);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(322).pontos.join(' '),/Exatamente quatro/);
 assert.match(get(325).pontos.join(' '),/dois terços.*mil vezes/s);
 assert.match(get(340).atencao.join(' '),/pobreza não substitui risco concreto/);
 assert.match(get(343).pontos.join(' '),/Metade, não totalidade/);
 assert.match(get(344).simples,/pena definitivamente imposta/);
 for(const n of [327,340])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
test('CPP flagrante e preventiva integram alterações 2025/2026 sem automatismos',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-flagrant-preventive-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,23);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(306).atencao.join(' '),/atrasar comunicação imediata/);
 assert.match(get(310).pontos.join(' '),/15.358\/2026.*privacidade/s);
 assert.match(get('310-a').pontos.join(' '),/dez dias contados de sua realização/);
 assert.match(get(313).pontos.join(' '),/15.487\/2026/);
 assert.match(get(316).pontos.join(' '),/não gera soltura automática/);
 for(const n of [310,'310-a',313,316])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
test('CPP custódia distingue júri, diploma e identificação genética específica',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-custody-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,20);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(283).pontos.join(' '),/1068.*independe do total/s);
 assert.match(get(295).pontos.join(' '),/afastou inciso VII/);
 assert.match(get(292).pontos.join(' '),/puerpério imediato/);
 assert.match(get('300-a').simples,/15.280\/2025/);
 assert.match(get('300-a').atencao.join(' '),/qualquer investigado solto/);
 assert.ok(!p.units.some(r=>r.unit_key==='art-298'));
 for(const n of [282,283,292,295])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
test('CPP defesa não restaura multa antiga, curador etário ou interrogatório coercitivo',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-participants-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,31);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(260).simples,/incompatível.*395 e 444/s);
 assert.match(get(262).simples,/não impõe curador.*18 e 21/s);
 assert.match(get(265).pontos.join(' '),/sem repetir antiga multa judicial/);
 assert.match(get(271).pontos.join(' '),/aboliu essa peça/);
 assert.match(get(279).atencao.join(' '),/nem anunciar revogação textual inexistente/);
 for(const n of [260,262,264,265,271,277,279])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
test('CPP reconhecimento e busca preservam garantias além da redação histórica',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-recognition-search-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,25);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(226).pontos.join(' '),/1258.*obrigatório.*prisão preventiva/s);
 assert.match(get(226).pontos.join(' '),/Repetição não cura.*independente/s);
 assert.match(get(241).atencao.join(' '),/Não.*presença.*dispensa/s);
 assert.match(get(244).pontos.join(' '),/posterior não cria retroativamente/s);
 assert.match(get(245).atencao.join(' '),/livre e comprovado.*todo consentimento verbal é inválido/s);
 for(const n of [226,241,242,244,245])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateArticlePackage,checkArticlePreflight,explanationPayload} from './article-explanation-package.mjs';
import {explanationExample,explanationPractice} from '../src/lib/explanationPractice.ts';
import {hasCurrentExplanationReview} from '../src/lib/explanationReview.ts';
import {buildExplanationQuiz} from '../src/lib/explanationQuiz.ts';
import {legalStudyCaveat} from '../src/lib/legalStudyCaveats.ts';
import ts from 'typescript';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const pack=JSON.parse(readFileSync('docs/library/article-explanations-identification-pension-2026-10-11.json','utf8'));

test('CPP: proteção testemunhal não dispensa defesa ou presume incapacidade',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-witnesses-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,26);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(208).atencao.join(' '),/Ausência de compromisso não é proibição/);
 assert.match(get(217).simples,/primeiro usar videoconferência.*retirada só se vídeo for impossível/);
 assert.match(get(214).simples,/antes.*só exclui.*207–208/s);
 assert.match(get(221).pontos.join(' '),/Escrito: Presidente\/Vice.*presidentes/);
 assert.match(get(225).atencao.join(' '),/Velhice isolada não torna automática/);
 for(const n of [208,211,216,219,221,223])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});

test('CPP: interrogatório preserva silêncio e modulações distintas da confissão',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-interrogation-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,15);assert.ok(!p.units.some(r=>r.unit_key==='art-194'));
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(185).pontos.join(' '),/decisão de vídeo com dez dias de antecedência ao ato/);
 assert.match(get(198).atencao.join(' '),/Não ensinar.*permissão atual/);
 assert.match(get(199).pontos.join(' '),/3\/7\/2024.*não estender.*atenuante/s);
 assert.match(get(197).pontos.join(' '),/1194.*2025.*retratação.*utilidade/s);
 assert.match(get(200).atencao.join(' '),/Não afirmar que toda retratação perde/);
 for(const n of [186,192,197,198,199,200])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});

test('CPP: provas não restauram impedimento inconstitucional ou coerção grafotécnica',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-evidence-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,36);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(157).simples,/§5º.*declarado inconstitucional/);
 assert.match(get(156).atencao.join(' '),/Não tratar.*licença.*Nem afirmar proibição absoluta/s);
 assert.match(get('158-a').pontos.join(' '),/não gera nulidade automática/);
 assert.match(get(159).pontos.join(' '),/Um perito oficial.*dois não oficiais/);
 assert.match(get('158-d').pontos.join(' '),/Lacre rompido fica dentro/);
 assert.match(get(168).atencao.join(' '),/Não contar 30 dias do primeiro laudo/);
 assert.match(get(174).atencao.join(' '),/Não transformar.*obrigação coercitiva/);
 for(const n of [156,157,'158-a',174,178,179])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});

test('CPP: falsidade incidental não condena e saúde mental não impõe internação automática',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-document-health-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,10);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(145).pontos.join(' '),/48 horas.*três dias sucessivos/s);
 assert.match(get(148).simples,/não produz coisa julgada.*posterior/);
 assert.match(get(150).simples,/45 dias.*necessidade demonstrada/);
 assert.match(get(151).atencao.join(' '),/CP 22 atual trata de coação.*Não impor medida automaticamente/s);
 assert.match(get(152).pontos.join(' '),/reinquirição/);
 assert.match(get(154).pontos.join(' '),/183.*Defensoria/);
 for(const n of [150,151,152,154])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});

test('CPP: garantias distinguem origem ilícita, reparação e preservação de valor',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-assets-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,30);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(118).atencao.join(' '),/não ensinar.*só termina depois/si);
 assert.match(get(120).pontos.join(' '),/cinco dias sucessivos.*dois dias/);
 assert.match(get(131).atencao.join(' '),/Nem levantamento mecânico.*nem retenção indefinida/);
 assert.match(get(134).pontos.join(' '),/Não exige origem ilícita/);
 assert.match(get('133-a').simples,/transferência definitiva depende de condenação/);
 assert.match(get('144-a').pontos.join(' '),/dez dias.*80%/);
 for(const n of [119,121,124,127,130,131,142])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});

test('CPP: incidentes não eliminam preclusão nem atualizam moeda histórica por suposição',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-incidents-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,26);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(92).simples,/estado civil.*suspensão.*definitiva/);
 assert.match(get(93).pontos.join(' '),/retoma-se.*toda a matéria/);
 assert.match(get(101).atencao.join(' '),/Rejeição simples não prova malícia.*não pode virar multa/);
 assert.match(get(109).simples,/não reabre.*territorial.*preclusa/);
 assert.match(get(117).pontos.join(' '),/102.*reclamação.*Não apresentar avocatória/s);
 for(const n of [101,103,107,108,109,117])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n).literalPractice,false);
});

test('CPP competência: Constituição, foro 2026 e ressalva do Júri não se confundem com referências antigas',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-civil-jurisdiction-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,29);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.ok(p.units.every(r=>r.expected&&explanationExample(r.exemplo).variation&&r.prova.every(q=>explanationPractice(q))));
 assert.match(get(65).pontos.join(' '),/929.*930.*terceiro inocente/);
 assert.match(get(68).pontos.join(' '),/intimar Defensoria/);
 assert.match(get(70).pontos.join(' '),/domicílio da vítima.*prevenção/);
 assert.match(get(74).pontos.join(' '),/121-A/);
 assert.match(get(78).atencao.join(' '),/15.358.*audiência não é julgamento/s);
 assert.match(get(84).pontos.join(' '),/maio de 2026.*vitalícios/);
 assert.match(get(84).pontos.join(' '),/período eleitoral.*exceções/);
 assert.match(get(84).pontos.join(' '),/imediata.*instrução finalizada/);
 assert.match(get(89).atencao.join(' '),/canoa.*navio/);
 for(const n of [65,68,74,75,77,78,79,83,84,85,86,87,89,90])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n)?.literalPractice,false);
});

test('CPP ação penal: prazos novos, ANPP e regras etárias não viram pegadinhas desatualizadas',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cpp-action-2026-10-13.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,38);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.ok(p.units.every(r=>r.expected&&explanationExample(r.exemplo).variation&&r.prova.length>=2&&r.prova.every(q=>explanationPractice(q))));
 assert.equal(get(35),undefined);assert.equal(get(43),undefined);
 assert.match(get(38).pontos.join(' '),/15.438.*19\/06\/2026.*12 meses/);
 assert.match(get(38).atencao.join(' '),/não.*retroativamente.*decadência já consumada/i);
 assert.match(get('28-a').pontos.join(' '),/Tema 1303.*silêncio.*confissão no inquérito não impedem/i);
 assert.match(get('28-a').pontos.join(' '),/Tema 1098.*trânsito/);
 assert.match(get('28-a').pontos.join(' '),/inferior, não igual, a quatro/);
 assert.match(get(25).pontos.join(' '),/oferecimento, não recebimento/);
 assert.match(get(28).pontos.join(' '),/patente ilegalidade ou teratologia/);
 assert.match(get(46).simples,/cinco dias.*quinze/);
 assert.match(get(60).pontos.join(' '),/30 dias.*60 dias/);
 for(const n of [24,25,26,28,'28-a',33,34,38,50,52,53,54])assert.equal(legalStudyCaveat('codigo-processo-penal','art-'+n)?.literalPractice,false);
});
test('antifaction review preserves prior versions and separates timelines, percentages and constitutional guarantees',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-antifaction-procedures-2026-10-12.json','utf8'));
 validateArticlePackage(p);
 assert.equal(p.units.length,41);
 assert.equal(new Set(p.units.map(r=>r.unit_key)).size,41);
 assert.ok(!p.units.some(r=>['art-1','art-2','art-43'].includes(r.unit_key)));
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);assert.ok(r.prova.every(q=>explanationPractice(q)));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-5').pontos.join(' '),/não se somam 24 horas/);
 assert.match(get('art-24').atencao.join(' '),/Não importar as contas trimestrais/);
 assert.match(get('art-38').atencao.join(' '),/veda gravidade abstrata/);
 assert.match(get('art-40').simples,/condenação transitada em julgado/);
 assert.match(get('art-41').pontos.join(' '),/não a 60% de todas as receitas/);
 assert.match(get('art-42').simples,/25\/09\/2026/);
 assert.match(get('art-42').atencao.join(' '),/transição/);
 assert.ok(p.supplementary_source_evidence.some(e=>e.slug==='mpv1394'&&/^[a-f0-9]{64}$/.test(e.sha256)));
});
test('disputed antifaction rules and superseded betting fragments use qualified authored practice',()=>{
 for(const key of ['art-9','art-10','art-11','art-12','art-17','art-29','art-30','art-35','art-38','art-40','art-42']){
  assert.equal(legalStudyCaveat('antifaccao',key)?.literalPractice,false);
 }
 assert.equal(legalStudyCaveat('antifaccao','art-24'),null);
 assert.match(legalStudyCaveat('antifaccao','art-42').explanation,/revogou.*transitória/);
 assert.equal(legalStudyCaveat('antifaccao','art-2').literalPractice,false);
 assert.equal(legalStudyCaveat('lavagem','art-17-d').literalPractice,false);
});
test('drug care separates voluntary accommodation, exceptional hospitalization and PIA deadlines',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-care-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,25);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);assert.ok(r.prova.every(q=>explanationPractice(q)));}
 assert.ok(p.units.every(r=>parseInt(r.unit_key.split('-')[1],10)<27));
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-23-a').pontos.join(' '),/máximo de 90 dias.*72 horas/);
 assert.match(get('art-23-a').pontos.join(' '),/exclui os da segurança pública/);
 assert.match(get('art-23-b').pontos.join(' '),/30 dias desde ingresso/);
 assert.match(get('art-26-a').pontos.join(' '),/Adesão E permanência voluntárias/);
 assert.match(get('art-26-a').atencao.join(' '),/veda internação em comunidades/);
 assert.match(get('art-8-d').atencao.join(' '),/marco é a aprovação/);
 assert.match(get('art-16').prova.join(' '),/preservar a identidade/);
});
test('drug literal practice does not teach criminal cannabis use or absolute custody and conversion prohibitions',()=>{
 for(const key of ['art-27','art-28','art-29','art-30','art-35','art-44'])assert.equal(legalStudyCaveat('drogas',key)?.literalPractice,false);
 const cannabis=legalStudyCaveat('drogas','art-28');
 assert.match(cannabis.explanation,/presunção relativa/);
 assert.match(cannabis.explanation,/procedimento não penal/);
 const custody=legalStudyCaveat('drogas','art-44');
 assert.match(custody.explanation,/Inafiançabilidade não impõe custódia automática/);
 assert.match(custody.explanation,/conversão exige requisitos/);
 assert.match(legalStudyCaveat('drogas','art-35').explanation,/não dispensa estabilidade e permanência/);
 assert.equal(legalStudyCaveat('drogas','art-23-a'),null);
});
const native=createRequire(import.meta.url),module={exports:{}};
const code=ts.transpileModule(readFileSync('src/components/library/UnitExplanation.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
vm.runInNewContext(code,{module,exports:module.exports,require:name=>({
  '@/lib/legalCourses':{},
  '@/lib/explanationPractice':{explanationExample,explanationPractice},
  '@/lib/explanationReview':{hasCurrentExplanationReview},
  './LegalRefText':{LegalRefText:({text})=>React.createElement('span',null,text)},
  './StudyText':{HighlightToggle:()=>null},
}[name]??native(name))});
const {ExplanationChecks}=module.exports;
test('editorial approval requires reviewer, matching source and review of the latest content',()=>{
 const e={status:'published',reviewed_by:'reviewer',reviewed_at:'2026-10-11T20:00:00Z',updated_at:'2026-10-11T20:00:00Z',content_sha256:'hash'};
 assert.equal(hasCurrentExplanationReview(e,'hash'),true);
 assert.equal(hasCurrentExplanationReview({...e,reviewed_by:null},'hash'),false);
 assert.equal(hasCurrentExplanationReview({...e,reviewed_at:null},'hash'),false);
 assert.equal(hasCurrentExplanationReview({...e,updated_at:'2026-10-11T21:00:00Z'},'hash'),false);
 assert.equal(hasCurrentExplanationReview(e,'changed-source'),false);
 assert.equal(hasCurrentExplanationReview({...e,status:'under_review'},'hash'),false);
});
test('true/false uses authored yes/no answers rather than turning headings into true assertions',()=>{
 const items=buildExplanationQuiz(['O prazo é sempre trinta dias? Não; há prazos distintos.','A remoção é medida administrativa? Sim; é distinta de penalidade.','Qual é o prazo? Trinta dias.','Assertiva que reduz o prazo erra.'],'unit');
 assert.equal(items.length,2);
 assert.equal(items.find(i=>i.text.startsWith('O prazo')).correct,false);
 assert.equal(items.find(i=>i.text.startsWith('A remoção')).correct,true);
 assert.equal(items.find(i=>i.text.startsWith('O prazo')).why,'Não; há prazos distintos.');
 assert.deepEqual(buildExplanationQuiz(['Rol de penalidades.','O prazo? A lei define.'],'unit'),[]);
});
function fixture(){
  return {
    legal_courses:pack.laws.map(l=>{const r=pack.units.find(r=>r.course_slug===l.slug);return {id:r.course_id,slug:l.slug,status:'active',source_url:l.source_url,syllabus_topic_id:r.syllabus_topic_id};}),
    legal_course_units:pack.units.map(r=>({id:r.unit_id,course_id:r.course_id,unit_key:r.unit_key,content_status:'current',content_sha256:r.content_sha256})),
    syllabus_topics:pack.units.map(r=>({id:r.syllabus_topic_id,edition_id:r.edition_id,content_status:'current'})),
    syllabus_editions:pack.units.map(r=>({id:r.edition_id,status:'active'})),
    content_sources:pack.laws.flatMap(l=>[l.source_url,...(l.additional_sources??[]).map(s=>s.url)]).map(url=>({url,is_official:true,status:'vigente'})),
    legal_unit_explanations:pack.units.filter(r=>r.expected).map(r=>structuredClone(r.expected)),
  };
}
test('all 94 current units of four norms have authored cases, variations and closed-answer practice',()=>{
  validateArticlePackage(pack);assert.equal(pack.units.length,94);checkArticlePreflight(pack,fixture());
  for(const row of pack.units){assert.ok(explanationExample(row.exemplo).variation);for(const q of row.prova)assert.ok(explanationPractice(q));}
  assert.deepEqual(pack.laws.map(l=>l.units),[13,22,30,29]);
});
test('entire batch rejects changed source, stale curriculum, missing article or conflicting existing revision',()=>{
  for(const mutate of [s=>s.legal_course_units[0].content_sha256='f'.repeat(64),s=>s.syllabus_editions.forEach(e=>e.status='archived'),s=>s.legal_course_units.push({...s.legal_course_units[0],id:'00000000-0000-0000-0000-000000000000'}),s=>s.legal_unit_explanations[0].simples='A conflicting published revision',s=>s.legal_unit_explanations.shift()]){
    const s=fixture();mutate(s);assert.throws(()=>checkArticlePreflight(pack,s));
  }
  const s=fixture(),reviewedAt=new Date().toISOString();s.legal_unit_explanations=pack.units.map(r=>({...explanationPayload(r),status:'published',reviewed_by:'verified-reviewer',reviewed_at:reviewedAt,updated_at:reviewedAt}));assert.doesNotThrow(()=>checkArticlePreflight(pack,s));
  s.legal_unit_explanations[0].reviewed_by=null;assert.throws(()=>checkArticlePreflight(pack,s));
});
test('practice does not guess answers for legacy notes and rendering keeps authored answer collapsed',()=>{
  assert.equal(explanationPractice('Uma assertiva comentada sem pergunta.'),null);
  assert.equal(explanationPractice('Uma pergunta sem resposta?'),null);
  const html=renderToStaticMarkup(React.createElement(ExplanationChecks,{items:['Qual regra? RESPOSTA-RESERVADA']}));
  assert.ok(!html.includes('textarea'));assert.match(html,/<details class="mt-2">/);assert.ok(!html.includes('<details open'));assert.ok(html.indexOf('RESPOSTA-RESERVADA')>html.indexOf('<details'));
});

test('targeted corrections require an explicit complete list, unchanged course count and previous revision',()=>{
 const p=structuredClone(pack),s=fixture(),law=p.laws[0],selected=p.units.filter(r=>r.course_slug===law.slug).slice(0,2);
 p.laws=[{...law,units:2,scope_type:'targeted_correction',course_current_units:law.units,target_unit_keys:selected.map(r=>r.unit_key)}];p.units=selected;
 p.units[0].content_sha256='d'.repeat(64);s.legal_course_units.find(u=>u.id===p.units[0].unit_id).content_sha256=p.units[0].content_sha256;
 assert.doesNotThrow(()=>checkArticlePreflight(p,s));
 const bad=structuredClone(p);bad.laws[0].target_unit_keys[1]=bad.laws[0].target_unit_keys[0];assert.throws(()=>checkArticlePreflight(bad,s));
 const incomplete=structuredClone(p);delete incomplete.units[0].expected;assert.throws(()=>checkArticlePreflight(incomplete,s));
});

test('security covers all 72 current units and distinguishes 2027 tax effects from 2026 checking',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-security-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,72);
 assert.equal(p.laws[0].additional_sources.length,3);
 for(const r of p.units){assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 for(const key of ['art-67','art-68']){const r=p.units.find(r=>r.unit_key===key);assert.ok(r.atencao.some(t=>t.includes('2027')&&t.includes('futura')));}
 const bad=structuredClone(p);bad.laws[0].additional_sources[0].url='https://unverified.invalid/lei';assert.throws(()=>validateArticlePackage(bad));
});

test('idosa covers every current article, excludes veto and distinguishes current penalties and historical remissions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-idosa-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,117);assert.ok(!p.units.some(u=>u.unit_key==='art-72'));
 for(const r of p.units){assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const unit=k=>p.units.find(r=>r.unit_key===k);
 assert.match(unit('art-94').simples,/não se aplica.*independentemente da pena/);
 assert.match(unit('art-99').simples,/dois a cinco.*três a sete.*oito a quatorze/);
 assert.match(unit('art-113').simples,/revogada.*art\. 75/);
 assert.match(unit('art-15').pontos.join(' '),/Tema 952.*Tema 1016/);
 assert.ok(p.laws[0].additional_sources.filter(r=>new URL(r.url).hostname==='processo.stj.jus.br').length===2);
 const guide=JSON.parse(readFileSync('docs/library/idosa-complete-path-review-2026-10-11.json','utf8'));
 assert.equal(guide.materials.length,2);
 for(const m of guide.materials){assert.ok(m.patch.body_md.includes('/dashboard/legal-course/idosa'));for(const old of m.expected.flashcards)assert.ok(m.patch.flashcards.some(c=>c.f===old.f&&c.b===old.b));}
 const bad=structuredClone(p);bad.laws[0].additional_sources[0].url='https://processo.stj.jus.br.unverified.invalid/';assert.throws(()=>validateArticlePackage(bad));
});
test('examples retain legal distinctions at age thresholds, biometrics and benefit review',()=>{
  const get=(slug,key)=>pack.units.find(r=>r.course_slug===slug&&r.unit_key===key);
  assert.match(get('cin','art-15').exemplo,/cinquenta e nove/);assert.match(get('cin','art-25').atencao.join(' '),/Não conte os dez anos da emissão/);
  assert.match(get('icn','art-3').simples,/exclui dados biométricos/);assert.match(get('sic','art-12').atencao.join(' '),/Não transporte os dois terços/);
  assert.match(get('pensao-regulamento','art-15').atencao.join(' '),/§2º remete literalmente/);assert.match(get('pensao-regulamento','art-10').atencao.join(' '),/exceção/);
});

for (const [file,count] of [['pcd-foundations',39],['pcd-accessibility',21],['pcd-communication',20],['pcd-capacity-crimes',14],['pcd-recent-communication',2],['pcd-final',31]]) {
 test(`LBI reviewed package ${file}: explicit cases and answer keys`,()=>{
  const p=JSON.parse(readFileSync(`docs/library/article-explanations-${file}-2026-10-11.json`,'utf8'));
  validateArticlePackage(p);assert.equal(p.units.length,count);
  for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 });
}

test('LBI complete review covers 127 distinct current units and preserves historical warnings',()=>{
 const names=['foundations','accessibility','communication','capacity-crimes','recent-communication','final'];
 const rows=names.flatMap(n=>JSON.parse(readFileSync(`docs/library/article-explanations-pcd-${n}-2026-10-11.json`,'utf8')).units);
 assert.equal(rows.length,127);assert.equal(new Set(rows.map(r=>r.unit_key)).size,127);
 for(const k of ['art-29','art-82','art-106'])assert.ok(!rows.some(r=>r.unit_key===k));
 const row=k=>rows.find(r=>r.unit_key===k);
 assert.match(row('art-103').simples,/revogado.*14.230/);
 assert.match(row('art-114').simples,/revogados.*CPC/);
 assert.match(row('art-126').simples,/31\/12\/2026/);
 assert.match(row('art-111').simples,/120 dias/);
 assert.match(row('art-109').simples,/gravíssima/);
});

test('five investigation statutes: closed practice preserves constitutional and repeal distinctions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-investigation-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,30);
 assert.deepEqual(p.laws.map(l=>l.units),[4,13,2,7,4]);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 assert.ok(p.units.flatMap(r=>buildExplanationQuiz(r.prova,r.unit_id)).length>=30);
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('temporaria','art-1').simples,/cinco requisitos cumulativos/);
 assert.match(get('temporaria','art-4').simples,/revogada.*13.869/);
 assert.match(get('tortura','art-1').atencao.join(' '),/fechado não é obrigatório/);
 assert.match(get('tortura','art-1').simples,/21\/05\/2026/);
 assert.match(get('identificacao-criminal','art-7-a').atencao.join(' '),/cumprimento da pena/);
 assert.match(get('identificacao-criminal','art-3').atencao.join(' '),/30 dias/);
 assert.match(get('delegado','art-2').simples,/afastou.*exclusividade/);
});

test('special procedures cover 71 current units with cases and preserve different safeguards',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-special-procedures-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,71);assert.deepEqual(p.laws.map(l=>l.units),[17,14,18,22]);
 assert.equal(new Set(p.units.map(r=>r.unit_id)).size,71);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('interceptacao','art-5').simples,/renovações sucessivas/);
 assert.match(get('interceptacao','art-2').atencao.join(' '),/quatro anos.*8º-A/);
 assert.match(get('trafico-pessoas','art-7').simples,/revogado.*13.445/);
 assert.match(get('trafico-pessoas','art-11').atencao.join(' '),/12h.*não autoriza interceptação/);
 assert.match(get('testemunhas','art-2').simples,/não da eventual preservação/);
 assert.match(get('testemunhas','art-14').simples,/maio de 2026.*cumulativos/);
 assert.match(get('terrorismo','art-2').simples,/um ou mais/);
 assert.match(get('terrorismo','art-5').atencao.join(' '),/não aplicar.*indistintamente/i);
});

test('organization review distinguishes current amendments, historical CP and infiltration limits',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-organizacoes-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,37);assert.equal(new Set(p.units.map(r=>r.unit_id)).size,37);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-2').simples,/15.487\/2026.*mesmo sem menor/);
 assert.match(get('art-288').simples,/15.245\/2025.*§2º/);
 assert.match(get('art-4').atencao.join(' '),/irrenunciável.*não podem apoiar-se apenas nas declarações/i);
 assert.match(get('art-10').atencao.join(' '),/720.*virtual/);
 assert.match(get('art-10-a').simples,/720 dias no total/);
 assert.match(get('art-21-b').simples,/duas ou mais/);
 assert.match(get('art-15').atencao.join(' '),/transações.*dado cadastral/);
});

test('abuse review preserves intent, nonautomatic effects and current advocacy penalty',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-abuso-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,40);assert.equal(new Set(p.units.map(r=>r.unit_id)).size,40);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-1').simples,/finalidade específica/);
 assert.match(get('art-4').simples,/reincidência em abuso.*não são automáticas/);
 assert.match(get('art-10').simples,/mesmo com intimação prévia/);
 assert.match(get('art-43').simples,/14.365\/2022.*2 a 4 anos/);
 assert.match(get('art-42').atencao.join(' '),/15.487\/2026/);
 assert.match(get('art-15-a').simples,/aumenta 2\/3.*dobra/);
 assert.match(get('art-22').atencao.join(' '),/não substitui inviolabilidade/);
});

test('racism review distinguishes personal injury, recreation and nonautomatic effects',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-racismo-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,23);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-2-a').simples,/2 a 5 anos.*CP 140.*incondicionada/);
 assert.match(get('art-20-b').atencao.join(' '),/Não estender automaticamente/);
 assert.match(get('art-20-a').simples,/1\/3 até metade/);
 assert.match(get('art-18').simples,/não são automáticos.*art. 17.*vetado/);
 assert.match(get('art-6').atencao.join(' '),/exatamente 18/);
});

test('heinous review separates current catalog from revoked modifying fragments',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-hediondos-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,17);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-1').simples,/vicaricídio.*2026/);
 assert.match(get('art-2').simples,/não equivale.*liberdade provisória.*revogado/);
 assert.match(get('art-6').simples,/24 a 30.*15.397\/2026/);
 assert.match(get('art-7').simples,/1996.*concurso/);
 assert.match(get('art-8').atencao.join(' '),/1355\/2026.*embora não hediondo/);
 assert.match(get('art-214').simples,/revogado em 2009/);
 assert.match(get('art-270').simples,/não torna.*hediondo/);
});

test('federal basics preserve chemical deadlines, identity transition and force limits',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-federal-basics-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,51);assert.deepEqual(p.laws.map(l=>l.units),[23,7,13,8]);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('quimicos','art-2').atencao.join(' '),/338.*03\/08\/2026/);
 assert.match(get('quimicos','art-11').simples,/24 horas/);
 assert.match(get('quimicos','art-12').simples,/48h/);
 assert.match(get('quimicos','art-19').exemplo,/R\$300/);
 assert.match(get('cpf','art-1').atencao.join(' '),/não prova.*login/);
 assert.match(get('identidade','art-4').simples,/CPF tornou-se.*obrigatório/);
 assert.match(get('identidade','art-11').simples,/60 anos naquele marco/);
 assert.match(get('menor-potencial-ofensivo','art-4').simples,/não é impossibilidade/);
});

test('compliance review guards unconstitutional removal, financial records and force reporting',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-compliance-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,42);assert.deepEqual(p.laws.map(l=>l.units),[24,11,7]);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=(s,k)=>p.units.find(r=>r.course_slug===s&&r.unit_key===k);
 assert.match(get('lavagem','art-17-d').simples,/4911.*inconstitucional.*2020/i);
 assert.match(get('lavagem','art-7').simples,/estadual\/DF.*15.358\/2026/);
 assert.match(get('lavagem','art-10').simples,/cinco anos desde encerramento/);
 assert.match(get('lavagem','art-14').simples,/Banco Central/);
 assert.match(get('uso-forca','art-7').pontos.join(' '),/presídio.*sem exigir lesão/i);
 assert.match(get('ric','art-3').simples,/2009.*não deve ser ensinado/);
});

test('Henry Borel review separates constitutional requisitions, time rules and different protection statutes',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-henry-borel-review-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,34);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-5').simples,/14.826\/2024.*brincar/);
 assert.match(get('art-14').simples,/município não é sede.*não há delegado.*24h/);
 assert.match(get('art-15').simples,/24h/);
 assert.match(get('art-21').simples,/7192.*2024.*sem força vinculante/);
 assert.match(get('art-25').atencao.join(' '),/Não copiar pena.*2 a 5/);
 assert.match(get('art-29').atencao.join(' '),/26\/05\/2026.*benéficos/);
 assert.match(get('art-31').atencao.join(' '),/revogado em 2024.*121-A/);
 assert.match(get('art-33').simples,/1186.*idade da menina/);
});

test('antifaction comparison uses thresholds with material elements rather than headcount alone',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-antifaction-comparison-2026-10-11.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,2);assert.equal(p.laws[0].course_current_units,43);
 const r=p.units.find(r=>r.unit_key==='art-2');
 assert.match(r.pontos.join(' '),/TRÁFICO começa em 2.*FACÇÃO em 3.*em 4/);
 assert.match(r.pontos.join(' '),/estável\/permanente.*reiteradamente ou não/);
 assert.match(r.atencao.join(' '),/não determina cumulação automática.*não certifica constitucionalidade/);
 assert.equal(r.prova.length,4);
 assert.equal(buildExplanationQuiz(r.prova,r.unit_id).length,2);
 for(const row of p.units){assert.ok(row.expected);assert.ok(explanationExample(row.exemplo).variation);for(const q of row.prova)assert.ok(explanationPractice(q));}
});

test('drug criminal review guards cannabis, sentencing, cooperation and impairment distinctions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-crimes-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,22);assert.equal(p.laws[0].course_current_units,84);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-28').atencao.join(' '),/40 g.*seis plantas.*presunção relativa/);
 assert.match(get('art-33').atencao.join(' '),/1154.*1241.*excepcionalmente expressiva/);
 assert.match(get('art-34').atencao.join(' '),/2026.*não é hediondo/);
 assert.match(get('art-35').atencao.join(' '),/1355.*2026.*não seja hediondo/);
 assert.match(get('art-40-a').atencao.join(' '),/mais gravosa não retroage/);
 assert.match(get('art-41').atencao.join(' '),/2025.*cumulativas.*2023.*alternatividade/);
 assert.match(get('art-46').simples,/parcial|não tinha plena capacidade/);
 assert.match(get('art-47').atencao.join(' '),/não significa internação automática/);
 for(const key of ['art-28','art-33','art-41','art-42','art-44']) assert.equal(legalStudyCaveat('drogas',key).literalPractice,false);
});

test('drug procedure separates custody, evidence, defense and constitutional hearing order',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-procedure-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,13);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-50').atencao.join(' '),/não é dispensa geral.*excepcional/);
 assert.match(get('art-50-a').simples,/trinta dias contados da apreensão/);
 assert.match(get('art-51').simples,/trinta.*preso.*noventa.*solto/);
 assert.match(get('art-55').atencao.join(' '),/antecede o recebimento/);
 assert.match(get('art-57').pontos.join(' '),/interrogatório ao final/);
 assert.match(get('art-59').simples,/347.*independe da prisão/);
 for(const key of ['art-48','art-50','art-54','art-57','art-59']) assert.equal(legalStudyCaveat('drogas',key).literalPractice,false);
});

test('drug final review preserves third parties, historical deadlines and current regulatory remissions',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-final-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,25);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-60').atencao.join(' '),/2022.*origem lícita.*Boa-fé/);
 assert.match(get('art-62-a').pontos.join(' '),/revogado.*14.973\/2024/);
 assert.match(get('art-63-c').atencao.join(' '),/8.666.*revogada.*14.133.*12.607\/2025/);
 assert.match(get('art-63-f').pontos.join(' '),/exatamente seis não/);
 assert.match(get('art-66').pontos.join(' '),/1.036.*09\/07\/2026/);
 assert.match(get('art-37').atencao.join(' '),/2026.*integrada.*art. 33/);
 assert.match(get('art-74').atencao.join(' '),/Não aplicar.*automaticamente/);
 const packs=['drug-care','drug-crimes','drug-procedure','drug-final'].map(n=>JSON.parse(readFileSync(`docs/library/article-explanations-${n}-2026-10-12.json`,'utf8')));
 assert.equal(new Set(packs.flatMap(pack=>pack.units.map(r=>r.unit_key))).size,84);
 for(const key of ['art-37','art-40-a','art-63','art-63-a','art-63-c','art-66']) assert.equal(legalStudyCaveat('drogas',key).literalPractice,false);
});

test('drug structural repair preserves authored teaching and separates crime from treatment chapters',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-drug-structure-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,11);
 for(const r of p.units){
  assert.notEqual(r.content_sha256,r.expected.content_sha256);
  for(const field of ['simples','pontos','atencao','exemplo','prova','termos','remissoes']) assert.deepEqual(r[field],r.expected[field]);
 }
 const chapters=JSON.parse(readFileSync('docs/library/drug-chapter-corrections-2026-10-12.json','utf8'));
 assert.equal(new Set(chapters.units.map(r=>r.unit_key)).size,84);
 const get=k=>chapters.units.find(r=>r.unit_key===k).chapter;
 assert.match(get('art-33'),/TÍTULO IV.*DOS CRIMES/);assert.doesNotMatch(get('art-33'),/Comunidade Terapêutica/);
 assert.match(get('art-27'),/DOS CRIMES E DAS PENAS/);
 assert.match(get('art-50'),/Da Investigação/);assert.match(get('art-55'),/Da Instrução Criminal/);
 assert.match(get('art-60'),/DESTINAÇÃO DE BENS/);assert.match(get('art-65'),/COOPERAÇÃO INTERNACIONAL/);
 const text=JSON.parse(readFileSync('docs/library/drug-structural-corrections-2026-10-12.json','utf8'));
 assert.equal(text.changes.length,11);assert.equal(text.additions.length,0);
 for(const r of text.changes) assert.equal(r.expected.body_text,r.body_text+'\n\n'+r.moved_captions.join('\n\n'));
});

test('arms registration review distinguishes institutional permissions and current administrative rules',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-arms-registration-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,13);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-4').pontos.join(' '),/trinta dias úteis/);
 assert.match(get('art-5').atencao.join(' '),/não significa porte nacional/);
 assert.match(get('art-6').atencao.join(' '),/2021.*população.*15.306\/2025/s);
 assert.match(get('art-7-a').atencao.join(' '),/5157.*2024.*inconstitucional.*50%/);
 assert.match(get('art-7').pontos.join(' '),/24 horas/);
 assert.match(get('art-9').atencao.join(' '),/311\/2025.*322\/2025.*19.040\/2025/);
 assert.match(get('art-11-a').simples,/R\$ 80 mais munição/);
 for(const key of ['art-3','art-5','art-6','art-7-a','art-9']) assert.equal(legalStudyCaveat('armas',key).literalPractice,false);
});

test('arms criminal review prevents unconstitutional custody and sentencing conflation',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-arms-crimes-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,12);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-12').atencao.join(' '),/890.*2026.*herdeiro.*próprio registro/s);
 assert.match(get('art-13').pontos.join(' '),/24 horas/);
 assert.match(get('art-14').atencao.join(' '),/3112.*inconstitucional/);
 assert.match(get('art-15').pontos.join(' '),/subsidiariedade/);
 assert.match(get('art-16').atencao.join(' '),/668.*não é hedionda/);
 assert.match(get('art-17').pontos.join(' '),/criminal preexistente/);
 assert.match(get('art-18').pontos.join(' '),/a qualquer título/);
 assert.match(get('art-21-a').pontos.join(' '),/25\/03\/2026.*não retroage/);
 assert.match(get('art-21-a').atencao.join(' '),/1259.*2024.*2026.*reavaliar/);
 for(const key of ['art-12','art-14','art-15','art-16','art-21','art-21-a']) assert.equal(legalStudyCaveat('armas',key).literalPractice,false);
 const captions=JSON.parse(readFileSync('docs/library/arms-caption-corrections-2026-10-12.json','utf8'));
 assert.equal(captions.changes.length,7);assert.equal(captions.additions.length,0);
 for(const r of captions.changes) assert.equal(r.expected.body_text,r.body_text+'\n\n'+r.moved_captions.join('\n\n'));
});

test('arms final review separates expired transitions, conditioned efficacy and current controls',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-arms-final-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,17);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-23').pontos.join(' '),/14.967\/2024.*exclusivamente/);
 assert.match(get('art-25').simples,/48 horas/);assert.match(get('art-25').pontos.join(' '),/trimestral.*semestral/s);
 assert.match(get('art-29').simples,/10.884\/2004.*decreto regulamentador/);
 assert.match(get('art-30').simples,/2008.*11.922\/2009.*2009/);
 assert.match(get('art-32').atencao.join(' '),/Não estender.*homicídio.*porte anterior/);
 assert.match(get('art-34').prova.join(' '),/exatamente mil.*Não/);
 assert.match(get('art-35').pontos.join(' '),/63,94%.*não/);
 const packs=['registration','crimes','final'].map(n=>JSON.parse(readFileSync(`docs/library/article-explanations-arms-${n}-2026-10-12.json`,'utf8')));
 assert.equal(new Set(packs.flatMap(pack=>pack.units.map(r=>r.unit_key))).size,41);
 for(const key of ['art-24','art-27','art-29','art-30','art-35','anexo-1']) assert.equal(legalStudyCaveat('armas',key).literalPractice,false);
});

test('Maria protection review distinguishes scope, revictimization and emergency authorities',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-maria-protection-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,16);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-5').atencao.join(' '),/1412.*2026.*fora desses vínculos/);
 assert.match(get('art-7').atencao.join(' '),/não exige necessariamente morte.*121-B/);
 assert.match(get('art-9').atencao.join(' '),/Não confundir vínculo.*salário/);
 assert.match(get('art-10-a').atencao.join(' '),/não autoriza negar atendimento/);
 assert.match(get('art-11').pontos.join(' '),/15.455\/2026.*48 horas.*MTE regional e MPT/);
 assert.match(get('art-12-c').simples,/sexual.*moral.*patrimonial.*15.411\/2026/);
 assert.match(get('art-12-d').pontos.join(' '),/não enumera qualquer policial.*13.084\/2026/s);
 for(const key of ['art-1','art-2','art-5','art-12','art-12-c','art-12-d']) assert.equal(legalStudyCaveat('maria-penha',key).literalPractice,false);
});

test('Maria procedure review integrates 2026 changes without automatic imprisonment or coercive consent',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-maria-procedure-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,16);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match([get('art-16-a').simples,...get('art-16-a').pontos].join(' '),/incondicionada/);
 assert.match(get('art-20').simples,/provocação válida.*de ofício.*13.964\/2019/);
 assert.match(get('art-22').pontos.join(' '),/simultâneo.*sem ação principal/s);
 assert.match(get('art-24-a').pontos.join(' '),/livremente consentida.*intimidação/s);
 assert.match(get('art-24-a').atencao.join(' '),/não revoga formalmente.*adulteração/s);
 for(const key of ['art-16','art-16-a','art-20','art-22','art-24-a']) assert.equal(legalStudyCaveat('maria-penha',key).literalPractice,false);
});

test('Maria final review does not teach historical amendments as current host law',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-maria-final-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,24);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-42').simples,/12.403\/2011.*revogou o IV.*inciso III/);
 assert.match(get('art-44').simples,/14.994\/2024.*dois a cinco.*15.455\/2026.*trabalho doméstico/);
 assert.match(get('art-45').simples,/14.344\/2022.*criança\/adolescente/);
 assert.match(get('art-43').pontos.join(' '),/1333.*não junto ao §2º/);
 assert.match(get('art-38-a').atencao.join(' '),/não significa publicidade irrestrita/);
 const packs=['protection','procedure','final'].map(n=>JSON.parse(readFileSync(`docs/library/article-explanations-maria-${n}-2026-10-12.json`,'utf8')));
 assert.equal(new Set(packs.flatMap(pack=>pack.units.map(r=>r.unit_key))).size,56);
 for(const key of ['art-40-a','art-41','art-42','art-43','art-44','art-45']) assert.equal(legalStudyCaveat('maria-penha',key).literalPractice,false);
});

test('contravention general review separates special rules, historic measures and current law',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-contravencoes-general-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,22);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-4').simples,/tentativa.*não é punível/);
 assert.match(get('art-6').pontos.join(' '),/exatamente quinze/);
 assert.match(get('art-7').pontos.join(' '),/estrangeira por contravenção não/);
 assert.match(get('art-9').simples,/9.268\/1996.*inadimplemento não autoriza/);
 assert.match(get('art-14').simples,/sem tratar.*presunção automática/);
 assert.match(get('art-59').atencao.join(' '),/não atribuir.*revogação expressa/);
 for(const key of ['art-3','art-9','art-10','art-12','art-13','art-14','art-15','art-16','art-17','art-38','art-59','art-64'])assert.equal(legalStudyCaveat('contravencoes',key).literalPractice,false);
 const moved=JSON.parse(readFileSync('docs/library/contravencoes-structural-corrections-2026-10-12.json','utf8'));
 assert.equal(moved.changes.length,64);assert.equal(moved.additions.length,0);
 for(const r of moved.changes)assert.equal(r.expected.body_text,r.body_text+'\n\n'+r.moved_captions.join('\n\n'));
 const chapters=JSON.parse(readFileSync('docs/library/contravencoes-chapter-corrections-2026-10-12.json','utf8'));
 assert.equal(chapters.units.length,66);assert.match(chapters.units.find(r=>r.unit_key==='art-24').chapter,/PATRIMÔNIO/);
});

test('contravention public review respects non-reception, special statutes and tripled penalty',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-contravencoes-public-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,18);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-19').simples,/857.*circunstâncias concretas/);
 assert.match(get('art-21').pontos.join(' '),/maior de 60, não exatamente 60.*1333/s);
 assert.match(get('art-25').simples,/não foi recepcionado/);
 assert.match(get('art-32').simples,/720.*309.*perigo de dano/);
 assert.match(get('art-28').pontos.join(' '),/9.605.*balões/);
 for(const key of ['art-18','art-19','art-20','art-21','art-22','art-25','art-28','art-32','art-34'])assert.equal(legalStudyCaveat('contravencoes',key).literalPractice,false);
});

test('contravention amendment reference resolves to the verified Planalto path',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-contravencoes-links-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,1);assert.equal(p.units[0].unit_key,'art-20');
 assert.ok(p.units[0].remissoes.includes('https://www.planalto.gov.br/ccivil_03/leis/l6734.htm'));
 assert.ok(p.units[0].expected.remissoes.some(u=>u.includes('1970-1979')));
});

test('contravention final block closes 66 distinct units without drilling superseded regimes',()=>{
 const load=s=>JSON.parse(readFileSync(`docs/library/article-explanations-contravencoes-${s}-2026-10-12.json`,'utf8'));
 const p=load('final');validateArticlePackage(p);assert.equal(p.units.length,26);
 const all=[...load('general').units,...load('public').units,...p.units];assert.equal(all.length,66);assert.equal(new Set(all.map(r=>r.unit_key)).size,66);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);assert.ok(r.prova.length>=2);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-50').atencao.join(' '),/924.*pedido de vista.*não apresentar voto como tese final/);
 assert.match(get('art-58').simples,/6.259\/1944.*1.508\/1951/);
 assert.match(get('art-63').pontos.join(' '),/revogado.*gratuitamente/);
 assert.match(get('art-66').pontos.join(' '),/24 horas/);
 assert.match(get('art-70').simples,/6.538\/1978.*ADPF 46/);
 for(const key of ['art-50','art-51','art-52','art-53','art-54','art-55','art-56','art-57','art-58','art-62','art-63','art-66','art-70'])assert.equal(legalStudyCaveat('contravencoes',key).literalPractice,false);
 const footer=JSON.parse(readFileSync('docs/library/contravencoes-footer-correction-2026-10-12.json','utf8'));
 assert.equal(footer.changes.length,1);assert.match(footer.changes[0].body_text,/1.*janeiro de 1942/);assert.doesNotMatch(footer.changes[0].body_text,/GETULIO|Francisco Campos/);
});

test('environmental general review separates entity liability, substitution limits and duplicate aggravation',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-ambientais-general-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,13);assert.equal(new Set(p.units.map(r=>r.unit_key)).size,13);
 assert.ok(!p.units.some(r=>['art-1','art-5'].includes(r.unit_key)));
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);assert.ok(r.prova.length>=2);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-3').pontos.join(' '),/548181.*dupla imputação obrigatória/);
 assert.match(get('art-7').simples,/inferior a quatro.*não igual a quatro/);
 assert.match(get('art-10').simples,/cinco anos.*doloso.*três.*culposo/);
 assert.match(get('art-12').simples,/360 salários mínimos/);
 assert.match(get('art-15').simples,/não constitui nem qualifica/);
});

test('environmental procedure review distinguishes sursis, entity penalties and repair safeguards',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-ambientais-procedure-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,11);
 for(const r of p.units){assert.ok(r.expected);assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-16').simples,/não superior a três.*diferente.*processo/);
 assert.match(get('art-19').simples,/contraditório/);
 assert.match(get('art-20').pontos.join(' '),/pedido expresso.*indicação do valor/);
 assert.match(get('art-22').simples,/não excede dez anos/);
 assert.match(get('art-27').simples,/comprovada impossibilidade.*não é necessariamente reparação integral/);
 assert.match(get('art-28').simples,/não é sursis.*nem extinção automática/);
});

test('environmental seizure review preserves current rules and qualifies animal disposal',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-ambientais-seizure-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,2);
 for(const r of p.units){assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 assert.match(p.units.find(r=>r.unit_key==='art-24').simples,/preponderantemente.*não decorre.*irregularidade isolada/);
 assert.match(p.units.find(r=>r.unit_key==='art-25').pontos.join(' '),/13.052\/2014.*640.*veda interpretação/s);
 assert.equal(legalStudyCaveat('ambientais','art-25').literalPractice,false);
 const c=JSON.parse(readFileSync('docs/library/ambientais-captions-correction-2026-10-12.json','utf8'));assert.equal(c.changes.length,2);
 for(const r of c.changes){assert.equal(r.expected.body_text,r.body_text+'\n\n'+r.moved_captions.join('\n\n'));assert.ok(r.body_text.startsWith('Art.'));}
});

test('environmental final rules preserve jurisdiction, subsidiary law and historical implementation dates',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-ambientais-final-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,6);
 for(const r of p.units){assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-76').pontos.join(' '),/667.*não afasta automaticamente.*140.*4757/s);
 assert.match(get('art-77').simples,/soberania.*Ministério da Justiça/);
 assert.match(get('art-79').simples,/subsidiariamente.*sem apagar regras especiais/);
 assert.match(get('art-80').simples,/não é prazo.*pagar multa/);
 assert.ok(!p.units.some(r=>r.unit_key==='art-81'));
});

test('environmental fauna review includes 2025 and 2026 changes without adverse analogy',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-ambientais-fauna-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,5);
 for(const r of p.units){assert.ok(explanationExample(r.exemplo).variation);for(const q of r.prova)assert.ok(explanationPractice(q));}
 const get=k=>p.units.find(r=>r.unit_key===k);
 assert.match(get('art-29').pontos.join(' '),/atos de pesca estão excluídos/);
 assert.match(get('art-31').simples,/parecer técnico oficial favorável e licença/);
 const animal=get('art-32');assert.match(animal.pontos.join(' '),/15.150\/2025.*15.355\/2026.*15.183\/2025/s);
 assert.ok(animal.remissoes.includes('https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14064.htm'));
 assert.match(animal.atencao.join(' '),/não.*analogia prejudicial.*não retroage/si);
 assert.equal(legalStudyCaveat('ambientais','art-32').literalPractice,false);
 assert.match(get('art-33').simples,/ou multa, ou ambas/);
});

test('ambientais: pesca e flora preservam limites, revisão de incêndio e poda condicionada',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-ambientais-pesca-flora-2026-10-12.json','utf8'));
 const get=k=>p.units.find(u=>u.unit_key===k);
 assert.equal(p.units.length,20);assert.equal(p.laws[0].scope_type,'targeted_correction');
 assert.ok(p.units.every(u=>u.expected&&u.exemplo.includes('Variação:')&&u.prova.length>=2));
 assert.ok(!p.units.some(u=>['art-43','art-47','art-1','art-5','art-81'].includes(u.unit_key)));
 assert.match(get('art-41').pontos.join(' '),/demais formas de vegetação/);
 assert.match(get('art-49').pontos.join(' '),/45 dias.*fundamentada/);
 assert.match(get('art-49').atencao.join(' '),/não é autorização.*desmatar/);
 assert.match(get('art-50-a').prova.join(' '),/superior/);
 assert.match(get('art-37').atencao.join(' '),/ADPF 640/);
});

test('ambientais: redações de licenciamento e transição histórica não viram treino literal residual',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-ambientais-poluicao-administracao-2026-10-12.json','utf8'));
 const get=k=>p.units.find(u=>u.unit_key===k);
 assert.equal(p.units.length,22);assert.ok(p.units.every(u=>u.expected&&u.exemplo.includes('Variação:')&&u.prova.length>=2));
 assert.match(get('art-60').pontos.join(' '),/6 meses a 2 anos/);
 assert.match(get('art-67').pontos.join(' '),/culposo.*revogado/);
 assert.match(get('art-79-a').atencao.join(' '),/1998.*suspensão universal/);
 assert.match(get('art-73').pontos.join(' '),/50%.*pode ser alterado/);
 assert.match(get('art-69-a').prova.join(' '),/dano significativo.*uso/);
 for(const key of ['art-49','art-60','art-67','art-71','art-79-a'])assert.equal(legalStudyCaveat('ambientais',key).literalPractice,false);
 assert.equal(legalStudyCaveat('ambientais','art-34'),null);
});

test('CP: aplicação e teoria preservam limites e impedem literalidade histórica',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-aplicacao-teoria-2026-10-12.json','utf8'));
 assert.equal(p.units.length,30);assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 assert.ok(!p.units.some(r=>r.unit_key==='art-1'));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(13).pontos.join(' '),/devia E podia/);
 assert.match(get(16).pontos.join(' '),/RECEBIMENTO/);
 assert.match(get(17).pontos.join(' '),/ABSOLUTA/);
 assert.match(get(23).atencao.join(' '),/defesa da honra/);
 assert.match(get(25).pontos.join(' '),/observar o caput/);
 for(const n of [9,10,11,23,25,26])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP: penas separam regimes, multa e texto residual de substituição',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-penas-2026-10-12.json','utf8'));
 assert.equal(p.units.length,20);assert.ok(p.units.every(r=>r.expected&&r.prova.length>=2&&r.exemplo.includes('Variação:')));
 assert.ok(!p.units.some(r=>['art-42','art-43','art-47'].includes(r.unit_key)));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(33).atencao.join(' '),/Súmula 269.*440/);
 assert.match(get(35).atencao.join(' '),/faculdade/);
 assert.match(get(46).pontos.join(' '),/SUPERIOR a 6/);
 assert.match(get(49).pontos.join(' '),/10 a 360/);
 assert.match(get(51).atencao.join(' '),/antiga conversão/);
 assert.match(get(54).atencao.join(' '),/proibição geral atual/);
 for(const n of [33,35,36,39,41,44,51,54])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP: dosimetria incorpora súmula revisada e distingue fases, teto e sursis',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-dosimetria-concurso-sursis-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,25);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 assert.deepEqual(p.units.map(r=>r.unit_key),Array.from({length:25},(_,i)=>'art-'+(55+i)));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(65).simples,/15.160.*violência sexual contra mulher/);
 assert.match(get(65).atencao.join(' '),/545 revisada.*independentemente de uso/);
 assert.match(get(65).prova.join(' '),/depende sempre.*Não/);
 assert.match(get(64).pontos.join(' '),/SUPERIOR a 5/);
 assert.match(get(68).atencao.join(' '),/segunda fase.*não.*terceira fase/);
 assert.match(get(75).atencao.join(' '),/não impor quarenta anos retroativamente/);
 assert.match(get(77).simples,/diferente da suspensão condicional do processo/);
 for(const n of [58,59,60,65,67,68,72,75,77])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP: efeitos e ação incluem alterações de 2026 e limites de medidas',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-efeitos-livramento-acao-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,25);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 assert.ok(!p.units.some(r=>['art-81','art-90'].includes(r.unit_key)));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(83).atencao.join(' '),/441.*não interrompe.*subjetivos/);
 assert.match(get(89).atencao.join(' '),/617.*antes do término/);
 assert.match(get('91-a').pontos.join(' '),/SUPERIOR a 6.*15.358.*25\/3\/2026/s);
 assert.match(get(92).pontos.join(' '),/15.487.*7\/8\/2026.*180 dias/s);
 assert.match(get(92).prova.join(' '),/Nunca são automáticos.*Não.*todo crime do ECA.*Não/s);
 assert.match(get(97).pontos.join(' '),/527.*máximo abstratamente/);
 assert.match(get(103).pontos.join(' '),/12 meses.*19\/6\/2026/);
 assert.match(get(103).atencao.join(' '),/não reabre automaticamente decadência/);
 assert.match(get(102).pontos.join(' '),/OFERECIMENTO/);
 for(const n of [83,89,91,'91-a',92,96,97,98,99,102,103])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP: prescrição não usa trânsito unilateral, pena hipotética ou reinício universal',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-extincao-prescricao-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,15);
 assert.deepEqual(p.units.map(r=>r.unit_key),Array.from({length:15},(_,i)=>'art-'+(106+i)));
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(112).simples,/ambas as partes.*modulação/);
 assert.match(get(112).atencao.join(' '),/não.*regra atual absoluta.*403/si);
 assert.match(get(110).pontos.join(' '),/220.*não influi.*punitiva/);
 assert.match(get(109).atencao.join(' '),/438/);
 assert.match(get(115).simples,/4\/7\/2025.*não retroage/);
 assert.match(get(117).atencao.join(' '),/inciso V.*HC 176473.*confirm/s);
 assert.match(get(120).simples,/18.*declaratória.*sem efeito condenatório/);
 for(const n of [107,109,110,111,112,115,116,117,119,120])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP: vida e integridade preservam limites recentes e decisões cautelares',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-vida-integridade-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,15);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 assert.ok(!p.units.some(r=>['art-123','art-124','art-125','art-126'].includes(r.unit_key)));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(121).atencao.join(' '),/Não.*inciso.*revogados.*bis in idem/s);
 assert.match(get('121-b').atencao.join(' '),/não.*rede de apoio.*não retroagem/si);
 assert.match(get('121-b').simples,/10\/4\/2026.*15\/4\/2026/);
 assert.match(get(128).atencao.join(' '),/não.*referendou.*24\/10\/2025.*não.*posteriores/si);
 assert.match(get(129).pontos.join(' '),/15.455.*2\/7\/2026.*EXCEÇÃO/s);
 assert.match(get(129).atencao.join(' '),/542.*incondicionada/);
 assert.match(get(133).pontos.join(' '),/2 a.*5.*3 a.*7.*8 a.*14/);
 assert.match(get(136).atencao.join(' '),/Não.*castigo físico moderado.*18-A/s);
 for(const n of [121,'121-a','121-b',122,127,128,129,133,134,'135-a',136])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP: honra e liberdade não restauram remissões ou iniciativa superadas',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-honra-liberdade-2026-10-12.json','utf8'));
 validateArticlePackage(p);assert.equal(p.units.length,20);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(140).simples,/Lei 7.716.*14.532.*11\/1\/2023/s);
 assert.match(get(147).pontos.join(' '),/EXCETO/);
 assert.match(get('147-a').atencao.join(' '),/Não reativar.*revogado/si);
 assert.match(get('147-a').pontos.join(' '),/Representação no/);
 assert.match(get('147-b').pontos.join(' '),/não é por qualquer uso.*imagem\/som/);
 assert.match(get(150).atencao.join(' '),/280.*fundadas razões.*Não.*suspeita/si);
 assert.match(get(151).simples,/40.*6.538/);
 assert.match(get(151).atencao.join(' '),/Bloquear exercícios automáticos/);
 for(const n of [140,141,144,145,'146-a',147,'147-a','147-b','147-c',148,149,150,151])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP final lote1: patrimônio e trabalho não ensinam textos residuais como atuais',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-final-lote-1-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,50);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(155).atencao.join(' '),/15.517.*23\/9\/2026/);
 assert.match(get(158).simples,/Não inserir ultraviolenta/);
 assert.doesNotMatch(get(158).pontos.join(' '),/ultraviolenta/);
 assert.match(get(170).pontos.join(' '),/estelionato tem remissão própria/);
 assert.match(get(171).atencao.join(' '),/revogou.*Não ensinar representação/);
 assert.match(get('168-a').atencao.join(' '),/legislação tributária posterior.*9\/1\/2026/s);
 assert.match(get(165).simples,/62.*9.605/);assert.match(get(201).simples,/direito constitucional de greve/);
 for(const n of [153,154,'154-a',155,158,165,166,'168-a',171,180,'180-a',181,182,201,204,213])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP final lote2: vulnerabilidade, sigilo e perigo não viram automatismos',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-final-lote-2-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,50);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get('217-a').atencao.join(' '),/8\/12\/2025.*8\/3\/2026.*593/s);
 assert.match(get('234-b').atencao.join(' '),/7871.*não conhecida.*não decide constitucionalidade/);
 assert.match(get('234-b').pontos.join(' '),/Ressalvada decisão judicial fundamentada/);
 assert.match(get(259).pontos.join(' '),/POSSA causar dano/);
 assert.match(get(247).pontos.join(' '),/sem presumir crime por pobreza/);
 for(const n of ['217-a','234-b',226,244,246,247,248,249,266,268])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP final lote3: medicamento sem registro, classificação e identidade têm ressalvas reais',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-final-lote-3-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,50);
 assert.ok(p.units.every(r=>r.expected&&r.exemplo.includes('Variação:')&&r.prova.length>=2));const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(273).simples,/1003.*2023.*1 a.*3/s);assert.match(get(273).atencao.join(' '),/inconstitucional/);
 assert.match(get(270).atencao.join(' '),/rol atual.*não inclui/);
 assert.match(get(307).atencao.join(' '),/522.*identidade falsa/);
 assert.match(get(289).atencao.join(' '),/73.*estelionato estadual/);
 assert.match(get(282).atencao.join(' '),/8\/6\/2026.*não responsabilidade objetiva/);
 for(const n of [270,273,282,283,284,286,287,288,289,297,299,304,307,309,310,311,315])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP final lote4: textos residuais, multas e hipóteses especiais não geram treino indevido',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-final-lote-4-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,50);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get(318).simples,/334-A/);
 assert.match(get(328).atencao.join(' '),/servidor também pode/);
 assert.match(get('337-a').pontos.join(' '),/contumaz/);
 assert.match(get('337-h').atencao.join(' '),/exceções legais motivadas/);
 assert.ok(!get('337-h').atencao.some(x=>x==='Pagamento fora da ordem cronológica também é crime.'));
 assert.match(get('338-a').atencao.join(' '),/8\/12\/2025.*Henry Borel/);
 assert.match(get(348).atencao.join(' '),/companheiro.*não certificada/);
 for(const n of [322,326,335,'337-a','337-h','337-j','338-a',348])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
});

test('CP final lote5: exceções democráticas e suspensão judicial distinguem texto de aplicação',()=>{
 const p=JSON.parse(readFileSync('docs/library/article-explanations-cp-final-lote-5-2026-10-12.json','utf8'));validateArticlePackage(p);assert.equal(p.units.length,31);
 const get=n=>p.units.find(r=>r.unit_key==='art-'+n);
 assert.match(get('359-k').pontos.join(' '),/§4º.*direitos humanos/);
 assert.match(get('359-h').atencao.join(' '),/ausência de criação.*OU.*ausência de registro/);
 for(const n of ['359-m--2','359-m--3']){
  assert.match(get(n).simples,/Texto compilado.*suspensão/s);
  assert.match(get(n).atencao.join(' '),/9\/5\/2026.*EPs.*41.*não autoriza.*automática/s);
  assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
 }
 for(const n of [351,352,'359-k','359-l','359-m','359-t',360,361])assert.equal(legalStudyCaveat('codigo-penal','art-'+n).literalPractice,false);
 assert.match(get(361).exemplo,/1942.*1940.*Variação/s);
});
