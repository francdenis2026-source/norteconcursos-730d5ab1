import{readFile,writeFile}from'node:fs/promises';import{createHash}from'node:crypto';
import{validateReview}from'./publish-question-review.mjs';import{validateRepairs}from'./repair-question-context.mjs';import{validateProvenance}from'./repair-question-provenance.mjs';
const[root]=process.argv.slice(2);if(!root)throw Error('Usage: CURRENT_EVIDENCE_ROOT');
const read=async n=>JSON.parse(await readFile(root+'/'+n+'.json','utf8'));
const[q]=await read('question-before'),sources=await read('sources-before'),editions=await read('editions-before'),topics=await read('topics-before'),captures=await read('exam-captures'),catalog=await read('catalog');
if(q.id!=='b47e9f19-31a4-49d0-871b-c4e6d9c03147'||q.content_status!=='under_review'||q.official_answer!=='E'||q.item_number!==94||q.exam_year!==2019||q.support_text_id)throw Error('Scope, original answer or context changed');
const edition=editions.find(e=>e.id==='39433bcf-e8e3-4ffc-9013-83e11468334c');
const hash=b=>createHash('sha256').update(b).digest('hex'),catalogHash=hash(await readFile(root+'/catalog.json')),now=new Date().toISOString();
const ids={edital:'a98a9a33-f02f-51b9-8266-0816918ebc7f',prova:'e9d264f2-561c-509a-8bb9-aa58b0b34e08',gabarito:'1d04617f-9668-5a60-ae87-e7f935542a82'},files={edital:'ED_1_PRF_2018_ABT.PDF',prova:'440_PRF_001_00_PAG_9.PDF',gabarito:'GAB_DEFINITIVO_MATRIZ_440_PRF_001_00_PAG_9.PDF'};
const sourceItems=[];
for(const kind of ['edital','prova','gabarito']){
 const c=captures.find(c=>c.file===files[kind]),entry=[...catalog.arquivosEdital,...catalog.arquivosGabarito].find(e=>e.nomeArquivo===files[kind]);
 if(!c||!entry||hash(await readFile(c.path))!==c.sha256||sources.some(s=>s.url===c.url))throw Error('Capture changed or source already exists; preserve and inspect');
 const row={id:ids[kind],source_type:kind==='edital'?'edital':'outro',title:kind==='edital'?'Edital nº 1 — PRF 2018/2019 — abertura (recorte de poderes administrativos)':kind==='prova'?'Prova objetiva — PRF 2019 — matriz 440_PRF_001_00':'Gabarito oficial definitivo — PRF 2019 — matriz 440_PRF_001_00',issuer:'PRF / Cebraspe',url:c.url,published_on:entry.dataArquivoObj?.slice(0,10)||null,checked_at:c.captured_at,status:'vigente',is_official:true,notes:`Concurso histórico: edital de 2018, prova aplicada em 03/02/2019. Documento listado no catálogo oficial PRF_18. Conferência pontual do item 94: prova página PDF 8, definitivo página 1, resposta E; edital página 39, Direito Administrativo, item 4.2 (uso e abuso do poder). Não certifica os demais itens nem a vigência atual de todas as normas do edital histórico. SHA-256 ${c.sha256}. Catálogo SHA-256 ${catalogHash}.`};
 sourceItems.push({kind,row,evidence:{visually_verified:true,pdf_path:c.path,sha256:c.sha256,catalog_url:'https://apis.cebraspe.org.br/cebraspe/eventos/PRF_18',catalog_path:root+'/catalog.json',catalog_sha256:catalogHash}});
}
const sourcePack={sources:sourceItems,edition:{expected:edition,source_id:ids.edital}},edital=sourceItems.find(i=>i.kind==='edital'),prova=sourceItems.find(i=>i.kind==='prova'),key=sourceItems.find(i=>i.kind==='gabarito');
const order=Math.max(...topics.filter(t=>t.edition_id===edition.id&&t.discipline==='Direito Administrativo').map(t=>t.topic_order),0)+1;
const topic={id:'9ba6a0f7-2335-5ebd-8c8d-1f3013ef6451',edition_id:edition.id,block_name:'Edital histórico oficial — Bloco III, item 4',discipline:'Direito Administrativo',topic_order:order,topic_text:'4 Poderes administrativos. 4.1 Hierárquico, disciplinar, regulamentar e de polícia. 4.2 Uso e abuso do poder.',content_status:'current'};
const topicPack={expected_edition:{...edition,source_id:ids.edital},expected_source:edital.row,evidence:{...edital.evidence,url:edital.row.url},items:[{row:topic,page:39,reference:'Bloco III — Direito Administrativo, item 4.2 — Uso e abuso do poder; edital de 2018, prova de 2019.'}]};
const provenancePatch={question_source_id:ids.prova,answer_key_source_id:ids.gabarito,source_page:8,verified_at:now,review_note:q.review_note+'\n\nConferência documental de 19/10/2026: prova original PRF aplicada em 03/02/2019, questão 94, página PDF 8; gabarito oficial definitivo, página 1, E. Referências genéricas substituídas pelos PDFs exatos listados no catálogo PRF_18. Contexto e fundamento jurídico conferidos nas etapas próprias.'};
const provenancePack=validateProvenance({items:[{expected:q,patch:provenancePatch,evidence:{visually_verified:true,reason:'Exact original item 94, exam date 03/02/2019 and final E key visually confirmed.',item_number:94,official_answer:'E',page:8,prova:{path:prova.evidence.pdf_path,url:prova.row.url,sha256:prova.evidence.sha256},gabarito:{path:key.evidence.pdf_path,url:key.row.url,sha256:key.evidence.sha256}}}]});
const afterProvenance={...q,...provenancePatch};
const command='No tocante aos poderes administrativos e à responsabilidade civil do Estado, julgue os próximos itens.';
const contextPatch={question_text:'Comando: '+command+'\nItem: '+q.question_text,context_review_required:false,verified_at:now,review_note:afterProvenance.review_note+'\n\nComando geral do bloco restaurado a partir da página PDF 8, preservando a frase original do item após “Item:” e a extração original. Não há caso ou imagem faltante para esta questão.'};
const contextPack=validateRepairs({items:[{expected:afterProvenance,patch:contextPatch,evidence:{reason:'Original general judgment command restored; no missing case or illustration in item 94.',visually_verified:true,pdf_sha256:prova.evidence.sha256,pdf_path:prova.evidence.pdf_path,source_url:prova.row.url,page:8,question_format:'certo_errado'}}]});
const afterContext={...afterProvenance,...contextPatch},manifest=JSON.parse(await readFile('outputs/pc-pending-review-2026-10-16/laws/manifest.json','utf8'));
for(const c of [manifest.cf,manifest.proc])if(hash(await readFile(c.path))!==c.sha256||!sources.some(s=>s.url===c.url&&s.is_official&&s.status==='vigente'))throw Error('Official constitutional/procedural basis unavailable');
const comment=`GABARITO DEFINITIVO: ERRADO (E), questão 94 da PRF 2019.

ONDE ESTÁ O ERRO?
O erro está em afirmar que o abuso de poder “não decorre de conduta omissiva”. A atuação abusiva também pode resultar de uma omissão: a autoridade deixa injustificadamente de praticar um ato que tinha o dever jurídico de realizar.
Excesso de poder envolve ultrapassar os limites de competência. Desvio de finalidade envolve utilizar a atuação administrativa para finalidade incompatível com aquela prevista juridicamente. A referência a essas espécies não permite concluir que toda conduta abusiva deva ser uma ação positiva: também é necessário examinar a inércia diante de um dever de agir.

BASE NORMATIVA E SEU ALCANCE
A Constituição, art. 37, caput, exige atuação administrativa conforme os princípios ali previstos. Na Administração Pública federal, a Lei 9.784/1999, art. 2º, impõe, entre outros, legalidade, finalidade e motivação. Seu art. 48 estabelece o dever de emitir decisão nos processos administrativos e sobre solicitações ou reclamações em matéria de competência do órgão. Há, portanto, deveres positivos de atuação; descumpri-los de modo abusivo não se torna lícito apenas porque a autoridade ficou inerte.
A Lei 9.784/1999 disciplina o processo administrativo federal: o exemplo baseado nela não significa aplicar automaticamente o mesmo regime a qualquer Estado ou Município.

EXEMPLO: a autoridade competente mantém deliberadamente sem decisão um requerimento já apto a ser decidido, sem justificativa, para prejudicar o interessado. A omissão precisa ser examinada à luz do dever de decidir, da finalidade e das demais circunstâncias: não há imunidade apenas porque não foi expedido um ato positivo.
VARIAÇÃO: a demora decorre de diligência necessária e devidamente justificada. Não se conclui automaticamente que qualquer atraso é abuso de poder. Deve-se verificar o dever jurídico, os fatos, os prazos e a motivação.
CONTRASTE: agir além da competência e deixar abusivamente de cumprir um dever de atuação são formas distintas de violar os limites jurídicos. A expressão “não decorre” exclui indevidamente a segunda possibilidade.

CUIDADO COM O PRAZO
No regime do art. 49 da Lei 9.784/1999, o prazo de até 30 dias para decidir é contado após a conclusão da instrução, com possibilidade de prorrogação por igual período expressamente motivada. Não se deve contar automaticamente esse prazo desde qualquer protocolo nem considerar a prorrogação livre de justificativa.

FIXAÇÃO
1. Abuso de poder exige sempre uma ação positiva? Não; pode decorrer de omissão diante de um dever de agir.
2. Toda demora é automaticamente abuso? Não; é necessário verificar a situação concreta e o regime aplicável.
3. Identificar abuso administrativo significa automaticamente comprovar crime de abuso de autoridade? Não. A tipificação penal tem requisitos próprios e não se presume a partir da classificação administrativa.

NÃO CONFUNDA REGIMES
A questão cobra poderes administrativos. Não deve ser usada para ensinar automaticamente os crimes e penas da antiga Lei 4.898/1965, mencionada em outra parte do edital histórico e posteriormente revogada. Esta revisão não ativa nem certifica esses outros dispositivos do programa.

FONTES E DATAS
Constituição, art. 37, caput (${manifest.cf.url}); Lei 9.784/1999, arts. 2º, 48 e 49 (${manifest.proc.url}). Cópias oficiais do Planalto capturadas em 16/10/2026, com hashes reconferidos nesta revisão; não se declarou nova captura online nem precedente judicial não consultado.
Caderno, gabarito definitivo e edital obtidos diretamente do Cebraspe em 19/10/2026: item 94, páginas PDF 8 e 1, letra E; programa de poderes administrativos na página 39 do edital. Revisão individual, sem certificação integral do concurso.`;
const legalPack=validateReview({items:[{table:'official_exam_questions',expected:afterContext,patch:{content_status:'active',current_syllabus_topic_id:topic.id,legal_audit_completed:true,legal_review_required:false,legal_basis:[{url:manifest.cf.url,title:'Constituição — princípios da Administração Pública',artigo:'37, caput'},{url:manifest.proc.url,title:'Lei 9.784/1999 — finalidade, motivação e dever de decidir',artigo:'2º, 48 e 49'}],law_version_checked_at:now,verified_at:now,review_note:comment+'\n\nHISTÓRICO EDITORIAL — registros anteriores preservados; pendências de origem, contexto e revisão resolvidas nesta conferência pontual:\n'+afterContext.review_note},evidence:{legal:true,reason:'Original final E key; omission under a legal duty to act distinguished from automatic criminal liability, ordinary justified delay, or obsolete abuse-of-authority offenses.',sources:[manifest.cf.url,manifest.proc.url,prova.row.url,key.row.url,edital.row.url],federal_captures:[manifest.cf,manifest.proc],reviewed_pages:{prova:8,gabarito:1,edital:39}}}]});
for(const[name,pack]of Object.entries({'source-pack':sourcePack,'topic-pack':topicPack,'provenance-pack':provenancePack,'context-pack':contextPack,'legal-pack':legalPack}))await writeFile(root+'/'+name+'.json',JSON.stringify(pack,null,2)+'\n');
console.log(JSON.stringify({question:q.id,key:'E',topic:topic.id,source_ids:ids,comment_sha256:hash(Buffer.from(comment))}));
