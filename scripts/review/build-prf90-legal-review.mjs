import{readFile,writeFile}from'node:fs/promises';import{createHash}from'node:crypto';
import{validateReview}from'./publish-question-review.mjs';import{validateRepairs}from'./repair-question-context.mjs';import{validateProvenance}from'./repair-question-provenance.mjs';
const[root]=process.argv.slice(2);if(!root)throw Error('Usage: CURRENT_EVIDENCE_ROOT');
const read=async f=>JSON.parse(await readFile(root+'/'+f,'utf8'));
const[q]=await read('question-before.json'),[support]=await read('support-before.json'),sources=await read('sources-before.json'),editions=await read('editions-before.json'),topics=await read('topics-before.json'),captures=await read('exam-captures.json');
if(q.id!=='8fd7fd64-a6ef-416d-b92a-426091e3cc13'||q.content_status!=='under_review'||q.official_answer!=='C'||q.item_number!==90||q.exam_year!==2021||q.support_text_id!==support.id)throw Error('Scope or shared context changed');
const edition=editions.find(e=>e.id==='1503387b-c4a4-48ec-a249-9a514bf60e51');
const catalogHash=createHash('sha256').update(await readFile(root+'/catalog.json')).digest('hex');
const now=new Date().toISOString(),ids={edital:'c991ed39-636c-535f-a55a-d721b47e4ae8',prova:'167943f0-ae50-50fb-8fea-bd414b7f9547',gabarito:'5d856d09-d026-5085-b6a9-3eb8d456e2c7'},files={edital:'ED_1_PRF_2021_ABERTURA.PDF',prova:'578_PRF_001_01.PDF',gabarito:'GAB_DEFINITIVO_578_PRF_001_01.PDF'};
const sourceItems=[];
for(const kind of ['edital','prova','gabarito']){
 const c=captures.find(c=>c.file===files[kind]);if(!c||createHash('sha256').update(await readFile(c.path)).digest('hex')!==c.sha256)throw Error('Captured official PDF changed');
 if(sources.some(s=>s.url===c.url))throw Error('Source already exists; preserve its metadata and rebuild explicitly');
 const row={id:ids[kind],source_type:kind==='edital'?'edital':'outro',title:kind==='edital'?'Edital nº 1 — PRF 2021 — abertura (recorte de controle judicial)':kind==='prova'?'Prova objetiva — PRF 2021 — itens 9 a 120 — caderno 578_PRF_001_01':'Gabarito oficial definitivo — PRF 2021 — itens 9 a 120 — 578_PRF_001_01',issuer:'PRF / Cebraspe',url:c.url,published_on:kind==='edital'?'2021-01-18':'2021-05-31',checked_at:c.captured_at,status:'vigente',is_official:true,notes:`Documento original do concurso histórico PRF 2021, listado no catálogo oficial capturado nesta execução. Conferência individual do item 90: prova página 5, gabarito definitivo página 1, resposta C; edital página 39, Direito Administrativo, item 6.2 (controle judicial). Não é nova abertura nem revisão integral do concurso. SHA-256 ${c.sha256}. Catálogo SHA-256 ${catalogHash}.`};
 sourceItems.push({kind,row,evidence:{visually_verified:true,pdf_path:c.path,sha256:c.sha256,catalog_url:'https://apis.cebraspe.org.br/cebraspe/eventos/PRF_21',catalog_path:root+'/catalog.json',catalog_sha256:catalogHash}});
}
const sourcePack={sources:sourceItems,edition:{expected:edition,source_id:ids.edital}};
const edAfter={...edition,source_id:ids.edital},edital=sourceItems.find(s=>s.kind==='edital'),prova=sourceItems.find(s=>s.kind==='prova'),key=sourceItems.find(s=>s.kind==='gabarito');
const order=Math.max(...topics.filter(t=>t.edition_id===edition.id&&t.discipline==='Direito Administrativo').map(t=>t.topic_order),0)+1;
const topic={id:'2bb66da9-031d-56be-a234-f50241b6be22',edition_id:edition.id,block_name:'Edital histórico oficial — Bloco III, item 6',discipline:'Direito Administrativo',topic_order:order,topic_text:'6 Controle da Administração Pública. 6.1 Controle exercido pela Administração Pública. 6.2 Controle judicial. 6.3 Controle legislativo.',content_status:'current'};
const topicPack={expected_edition:edAfter,expected_source:edital.row,evidence:{...edital.evidence,url:edital.row.url},items:[{row:topic,page:39,reference:'Direito Administrativo, itens 6, 6.1, 6.2 e 6.3; edital original, página 39. Retificação nº 2 não alterou esse recorte.'}]};
const provenancePatch={question_source_id:ids.prova,answer_key_source_id:ids.gabarito,source_page:5,review_note:q.review_note+'\n\nConferência documental de 19/10/2026: substituídas as referências genéricas pelos PDFs oficiais do Cebraspe, listados no catálogo PRF_21. Item 90, caderno página 5, gabarito definitivo página 1: C. A questão permanece em revisão até concluir contexto e fundamento jurídico.',verified_at:now};
const provenancePack=validateProvenance({items:[{expected:q,patch:provenancePatch,evidence:{visually_verified:true,reason:'Exact original PRF 2021 item 90 and final C key visually confirmed; correct PDF page 5, not legacy page 6.',item_number:90,official_answer:'C',page:5,prova:{path:prova.evidence.pdf_path,url:prova.row.url,sha256:prova.evidence.sha256},gabarito:{path:key.evidence.pdf_path,url:key.row.url,sha256:key.evidence.sha256}}}]});
const afterProvenance={...q,...provenancePatch};
const contextPatch={context_review_required:false,review_note:afterProvenance.review_note+'\n\nContexto conferido na página 5 do PDF: o texto compartilhado existente corresponde ao caso de contrato de treinamento, multa por inexecução e impetração de mandado de segurança, seguido do comando de julgamento dos itens. Texto de apoio e enunciado originais preservados; sem duplicar o caso no enunciado.',verified_at:now};
const contextPack=validateRepairs({items:[{expected:afterProvenance,patch:contextPatch,evidence:{reason:'Shared scenario and instruction visually matched against the official booklet; original isolated item preserved to avoid duplicate context in the reader.',visually_verified:true,pdf_sha256:prova.evidence.sha256,pdf_path:prova.evidence.pdf_path,source_url:prova.row.url,page:5,question_format:'certo_errado',support_expected:support,reviewed_context:support.body}}]});
const afterContext={...afterProvenance,...contextPatch};
const cf=JSON.parse(await readFile('outputs/pc-pending-review-2026-10-16/laws/manifest.json','utf8')).cf;
if(createHash('sha256').update(await readFile(cf.path)).digest('hex')!==cf.sha256||!sources.some(s=>s.url===cf.url&&s.is_official&&s.status==='vigente'))throw Error('Preserved official constitutional basis unavailable');
const comment=`GABARITO DEFINITIVO: CERTO (C), item 90 da PRF 2021.

ENTENDA EM LINGUAGEM SIMPLES
Sindicabilidade é a possibilidade de submeter a atuação administrativa a controle. No item, a empresa recorre ao Judiciário para questionar um possível abuso da Administração: esse acesso ao controle judicial concretiza a sindicabilidade.
O nome do princípio é uma construção doutrinária; não é necessário que a Constituição utilize literalmente a palavra “sindicabilidade”. Seu fundamento normativo, para o aspecto judicial cobrado, está no art. 5º, XXXV, da Constituição: “a lei não excluirá da apreciação do Poder Judiciário lesão ou ameaça a direito”.

APLICAÇÃO AO CASO
O contexto informa que foi aplicada multa sem prévia oitiva e que a empresa impetrou mandado de segurança. A questão 90 cobra a possibilidade de questionar o ato em juízo. Não afirma que a empresa necessariamente vencerá nem que toda ação ou via processual escolhida será admissível: o resultado depende dos requisitos da medida e da análise do caso.
Também não autoriza o juiz a substituir livremente a conveniência e a oportunidade da Administração. Possibilidade de controle não é sinônimo de revisão irrestrita do mérito administrativo. No caso narrado, a ausência de prévia oitiva suscita controle da regularidade do procedimento; não se confunde com o juiz escolher qual seria o contrato mais conveniente.

EXEMPLO: uma empresa é multada pela Administração e busca tutela judicial alegando que não pôde se defender. O ato administrativo pode ser examinado pelo Judiciário: há aplicação da sindicabilidade.
VARIAÇÃO: o interessado identifica ameaça concreta a seu direito antes de o dano se consumar. O art. 5º, XXXV, também menciona ameaça; a garantia não depende sempre de esperar um prejuízo já ocorrido.
CONTRASTE: permitir ajuizar a ação não significa dar razão antecipada ao autor. O pedido pode ser rejeitado se não houver a ilegalidade alegada ou se faltarem requisitos processuais.

FIXAÇÃO
1. A palavra sindicabilidade precisa aparecer literalmente no art. 5º para existir fundamento constitucional? Não. A norma assegura apreciação judicial de lesão ou ameaça a direito.
2. Ajuizar a ação garante vitória? Não; garante-se acesso ao controle, nos termos do sistema processual.
3. Controle judicial e livre substituição de conveniência administrativa são a mesma coisa? Não.

ALERTA HISTÓRICO
O caso foi redigido para a prova de 2021. Sua descrição de contratação de treinamento não deve ser utilizada isoladamente para ensinar o atual regime de dispensa/inexigibilidade. Este item trata de controle da Administração, não de atualizar automaticamente as regras licitatórias do cenário.

FONTES E DATAS
Constituição, art. 5º, XXXV: ${cf.url}. Utilizada a cópia oficial do Planalto capturada em 16/10/2026, com hash reconferido em 19/10. As tentativas de nova captura do Planalto retornaram HTTP 503; não foi declarada transferência nova ou julgamento jurisprudencial não consultado.
Caderno original e gabarito definitivo obtidos do Cebraspe em 19/10/2026: item 90, páginas PDF 5 e 1, resposta C. Edital de abertura, página 39, Bloco III — Direito Administrativo, controle judicial. Revisão pontual do item, sem certificação integral do edital ou dos demais itens.`;
const legalPack=validateReview({items:[{table:'official_exam_questions',expected:afterContext,patch:{content_status:'active',current_syllabus_topic_id:topic.id,legal_audit_completed:true,legal_review_required:false,legal_basis:[{url:cf.url,title:'Constituição Federal — garantia de acesso à Justiça',artigo:'5º, XXXV'}],law_version_checked_at:now,verified_at:now,review_note:afterContext.review_note+'\n\nRevisão jurídica/editorial concluída em 19/10/2026: fundamento constitucional do controle judicial identificado no art. 5º, XXXV; gabarito C confirmado, contexto e origem documental corrigidos; liberada apenas esta questão.\n\n'+comment},evidence:{legal:true,reason:'Constitutional basis for judicial review; final C key, exact original item, shared context and original syllabus scope individually verified. No unconsulted precedent asserted.',sources:[cf.url,prova.row.url,key.row.url,edital.row.url],federal_capture:cf,reviewed_pages:{prova:5,gabarito:1,edital:39}}}]});
for(const[name,pack]of Object.entries({'source-pack':sourcePack,'topic-pack':topicPack,'provenance-pack':provenancePack,'context-pack':contextPack,'legal-pack':legalPack}))await writeFile(root+'/'+name+'.json',JSON.stringify(pack,null,2)+'\n');
console.log(JSON.stringify({question:q.id,key:'C',topic:topic.id,source_ids:ids,comment_sha256:createHash('sha256').update(comment).digest('hex')}));
