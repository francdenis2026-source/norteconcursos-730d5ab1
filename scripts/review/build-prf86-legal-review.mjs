import{readFile,writeFile}from'node:fs/promises';import{createHash}from'node:crypto';
import{validateReview}from'./publish-question-review.mjs';import{validateRepairs}from'./repair-question-context.mjs';import{validateProvenance}from'./repair-question-provenance.mjs';
const[root]=process.argv.slice(2);if(!root)throw Error('Usage: CURRENT_EVIDENCE_ROOT');
const read=async f=>JSON.parse(await readFile(root+'/'+f,'utf8'));
const[q]=await read('question-before.json'),[support]=await read('support-before.json'),sources=await read('sources-before.json'),topics=await read('topics-before.json'),editions=await read('editions-before.json');
const topic=topics.find(t=>t.id==='2bb66da9-031d-56be-a234-f50241b6be22');
if(q.id!=='e06f3ad5-8c0d-4b20-885e-486c3ebb9275'||q.content_status!=='under_review'||q.official_answer!=='E'||q.item_number!==86||q.exam_year!==2021||q.support_text_id!==support.id||topic?.content_status!=='current')throw Error('Unexpected original, key or verified topic');
const edition=editions.find(e=>e.id===topic.edition_id),edital=sources.find(s=>s.id===edition?.source_id);
if(edition?.status!=='active'||!edital?.is_official||edital.source_type!=='edital'||edital.status!=='vigente')throw Error('Official active syllabus required');
const captures=JSON.parse(await readFile('outputs/audits/prf90-review-2026-10-19/exam-captures.json','utf8'));
const docs=[];
for(const[kind,file,page]of[['prova','578_PRF_001_01.PDF',5],['gabarito','GAB_DEFINITIVO_578_PRF_001_01.PDF',1]]){
 const c=captures.find(c=>c.file===file),s=sources.find(s=>s.url===c?.url);
 if(!s?.is_official||s.status!=='vigente'||!s.notes?.includes(c.sha256)||createHash('sha256').update(await readFile(c.path)).digest('hex')!==c.sha256)throw Error('Official exam capture changed');
 docs.push({kind,source:s,evidence:{path:c.path,url:c.url,sha256:c.sha256,page,visually_verified:true}});
}
const prova=docs.find(d=>d.kind==='prova'),key=docs.find(d=>d.kind==='gabarito'),now=new Date().toISOString();
const provenancePatch={question_source_id:prova.source.id,answer_key_source_id:key.source.id,source_page:5,verified_at:now,review_note:q.review_note+'\n\nConferência documental de 19/10/2026: item 86, caderno oficial PRF 2021 página PDF 5 e gabarito definitivo página 1, letra E. Substituídas as referências genéricas pelos documentos exatos; revisão de contexto e jurídica tratadas nas etapas seguintes.'};
const provenancePack=validateProvenance({items:[{expected:q,patch:provenancePatch,evidence:{visually_verified:true,reason:'Original item 86 and final E key visually confirmed in the same official PRF 2021 booklet used for item 90.',item_number:86,official_answer:'E',page:5,prova:prova.evidence,gabarito:key.evidence}}]});
const afterProvenance={...q,...provenancePatch};
const contextPatch={context_review_required:false,verified_at:now,review_note:afterProvenance.review_note+'\n\nContexto conferido na página 5: contrato de treinamento, multa por inexecução, ausência de prévia oitiva e impetração de mandado de segurança. Mantidos o texto de apoio compartilhado e a frase original do item, sem duplicação do cenário no enunciado.'};
const contextPack=validateRepairs({items:[{expected:afterProvenance,patch:contextPatch,evidence:{reason:'Existing shared scenario and instruction visually matched to original page 5; isolated judgment remains verbatim.',visually_verified:true,pdf_sha256:prova.evidence.sha256,pdf_path:prova.evidence.path,source_url:prova.source.url,page:5,question_format:'certo_errado',support_expected:support,reviewed_context:support.body}}]});
const afterContext={...afterProvenance,...contextPatch};
const cf=JSON.parse(await readFile('outputs/pc-pending-review-2026-10-16/laws/manifest.json','utf8')).cf;
if(createHash('sha256').update(await readFile(cf.path)).digest('hex')!==cf.sha256||!sources.some(s=>s.url===cf.url&&s.is_official&&s.status==='vigente'))throw Error('Official constitutional capture unavailable');
const comment=`GABARITO DEFINITIVO: ERRADO (E), questão 86 da PRF 2021.

POR QUE ESTÁ ERRADA?
No caso da prova, a empresa impetrou mandado de segurança contra a multa aplicada sem prévia oitiva. O que se questiona é a regularidade jurídica da atuação administrativa. Isso é controle de legalidade/juridicidade, não a substituição do mérito administrativo por uma preferência do juiz.
O art. 5º, LXIX, da Constituição prevê o mandado de segurança para proteger direito líquido e certo diante de ilegalidade ou abuso de poder, quando presentes os demais requisitos. Já o art. 5º, LV, assegura contraditório e ampla defesa nos processos administrativos. São parâmetros jurídicos de controle da atuação descrita no enunciado.

DISTINGA PARA NÃO ERRAR
Legalidade/juridicidade: o ato respeitou a lei, o procedimento, a finalidade e as garantias aplicáveis? O controle pode examinar esses limites.
Mérito administrativo: escolha legítima de conveniência e oportunidade dentro do espaço permitido pelo direito. O juiz não passa a ser o gestor nem pode simplesmente trocar uma escolha administrativa lícita pela que pessoalmente considera melhor.
Essa distinção não torna o ato discricionário imune ao Judiciário. Uma alegação de discricionariedade não protege ilegalidade ou abuso de poder. Ao mesmo tempo, a propositura do mandado de segurança não garante sua concessão: é preciso demonstrar direito líquido e certo e cumprir os requisitos da via escolhida.

EXEMPLO: a empresa sustenta que a Administração aplicou uma sanção sem permitir defesa. Examinar essa alegação e as garantias procedimentais é controle de legalidade, ainda que o ato tenha conteúdo administrativo.
VARIAÇÃO: o interessado apenas prefere que a Administração adote outra escolha, sem demonstrar violação jurídica, e pede que o juiz imponha sua preferência ao gestor. Isso não equivale à finalidade constitucional do mandado de segurança.
CONTRASTE COM A QUESTÃO 90: a 90 afirma que buscar controle judicial de abusos é aplicação da sindicabilidade — Certo. A 86 qualifica o mandado de segurança como controle judicial de mérito administrativo — Errado. Ter controle judicial não significa substituir livremente a escolha administrativa.

FIXAÇÃO
1. O mandado de segurança protege uma preferência pessoal do impetrante por outra decisão administrativa? Não; exige direito líquido e certo e ilegalidade ou abuso de poder, além dos demais requisitos.
2. Ato discricionário fica imune ao controle judicial? Não; seus limites jurídicos podem ser controlados.
3. No cenário narrado, analisar a falta de prévia oitiva equivale a escolher por conveniência do juiz qual contrato celebrar? Não; são análises distintas.

ALERTA HISTÓRICO
O cenário é o da prova de 2021. Sua descrição da contratação de treinamento não é uma explicação do regime licitatório atual. Esta revisão se limita ao controle judicial cobrado na questão 86, sem declarar atualizadas as regras de contratação mencionadas no caso.

FONTES E DATAS
Constituição, art. 5º, LXIX, LV e XXXV: ${cf.url}. Cópia oficial do Planalto capturada em 16/10/2026, hash reconferido nesta revisão. A nova consulta ao Planalto não foi concluída; não se atribui a esta revisão captura nova nem precedente judicial que não tenha sido consultado.
Caderno e gabarito definitivo oficiais do Cebraspe obtidos em 19/10/2026: páginas PDF 5 e 1, item 86, letra E. Vínculo ao edital: página 39, Bloco III — Direito Administrativo, controle judicial. O caso compartilhado e o comando foram conferidos no original.`;
const legalPack=validateReview({items:[{table:'official_exam_questions',expected:afterContext,patch:{content_status:'active',current_syllabus_topic_id:topic.id,legal_audit_completed:true,legal_review_required:false,legal_basis:[{url:cf.url,title:'Constituição — mandado de segurança e garantias procedimentais',artigo:'5º, LXIX, LV e XXXV'}],law_version_checked_at:now,verified_at:now,review_note:comment+'\n\nHISTÓRICO EDITORIAL — registros anteriores preservados; as pendências descritas abaixo foram resolvidas nesta revisão pontual:\n'+afterContext.review_note},evidence:{legal:true,reason:'Judicial legality review distinguished from unrestricted replacement of administrative discretion; official E key, exact item and shared context verified; no unconsulted case holding asserted.',sources:[cf.url,prova.source.url,key.source.url,edital.url],federal_capture:cf,reviewed_pages:{prova:5,gabarito:1,edital:39}}}]});
for(const[name,pack]of Object.entries({'provenance-pack':provenancePack,'context-pack':contextPack,'legal-pack':legalPack}))await writeFile(root+'/'+name+'.json',JSON.stringify(pack,null,2)+'\n');
console.log(JSON.stringify({question:q.id,key:'E',comment_sha256:createHash('sha256').update(comment).digest('hex')}));
