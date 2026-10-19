import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validateReview} from './publish-question-review.mjs';
const [root,questionPath,sourcesPath]=process.argv.slice(2);
if(!root||!questionPath||!sourcesPath)throw Error('Usage: EVIDENCE_ROOT CURRENT_QUESTION SNAPSHOT_SOURCES');
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const expected=await read(questionPath),sources=await read(sourcesPath);
if(expected.id!=='76a0df58-50ad-465e-af73-12763e76347f'||expected.content_status!=='under_review'||expected.official_answer!=='A'||expected.current_syllabus_topic_id!=='d46e9663-f7aa-5ccb-a571-894b924f919e')throw Error('Unexpected original, status, key or verified syllabus');
const captures=await read(root+'/mprj-evidence.json'),capture=captures.find(c=>c.name==='lc106');
const federal=(await read('outputs/pc-pending-review-2026-10-16/laws/manifest.json')).invest;
const catalogPath=root+'/mprj-externos.html',catalog=await readFile(catalogPath),catalogHash=createHash('sha256').update(catalog).digest('hex');
for(const c of [capture,federal])if(!c||createHash('sha256').update(await readFile(c.path)).digest('hex')!==c.sha256)throw Error('Legal evidence changed');
const paperPath='outputs/pc-pending-review-2026-10-16/nonro8-rj-paper.pdf',keyPath='outputs/pc-pending-review-2026-10-16/nonro8-rj-key.pdf';
const documents=[];
for(const [field,path,page] of [['question_source_id',paperPath,14],['answer_key_source_id',keyPath,1]]){
 const source=sources.find(s=>s.id===expected[field]),bytes=await readFile(path),sha=createHash('sha256').update(bytes).digest('hex');
 if(!source?.is_official||!source.notes.includes(sha)||bytes.subarray(0,4).toString()!=='%PDF')throw Error('Official exam evidence mismatch');
 documents.push({source_id:source.id,url:source.url,path,sha256:sha,page,visually_verified:true,item:48,official_answer:'A'});
}
const row={id:'b1b34d14-9682-56fd-88d5-468da18b5853',source_type:'lei',title:'LC estadual 106/2003 — MPRJ — art. 35, § 1º (requisições e notificações)',issuer:'Ministério Público do Estado do Rio de Janeiro',url:capture.url,published_on:'2003-01-03',checked_at:capture.captured_at,status:'vigente',is_official:true,notes:`Texto compilado disponibilizado pelo MPRJ na página oficial de atos normativos externos. Conferência pontual do art. 35, § 1º, página 28: encaminhamento pelo PGJ das notificações/requisições aos membros dos Tribunais de Contas. Não certifica todas as disposições do diploma. SHA-256 ${capture.sha256}. Catálogo SHA-256 ${catalogHash}.`};
const sourcePack={jurisdiction:'RJ-MPRJ-LC106',items:[{row,evidence:{...capture,reviewed:true,norm:'LC 106/2003',current_effect_reviewed:true,reviewed_articles:['35 § 1º'],page:28,catalog_capture:{url:'https://www.mprj.mp.br/web/guest/servicos/consulta-juridica/atos-normativos-entendimentos-institucionais/atos-normativos-externos',path:catalogPath,sha256:catalogHash}}}]};
const now=new Date().toISOString();
const explanation=`GABARITO DEFINITIVO: A — conferido no documento oficial do Cebraspe, questão 48, caderno 662_PCRJ_001_01.

ENTENDA A RESPOSTA
O delegado com atribuição conduz a investigação criminal e pode requisitar perícias, informações, documentos e dados que interessem à apuração dos fatos: é a regra do art. 2º, § 2º, da Lei 12.830/2013. Essa atribuição não se confunde com o regime de encaminhamento interno previsto na lei orgânica do Ministério Público.
No Rio de Janeiro, o art. 35, § 1º, da Lei Complementar estadual 106/2003 determina que as notificações e requisições ali previstas, quando dirigidas aos membros dos Tribunais de Contas, sejam encaminhadas pelo Procurador-Geral de Justiça. Esse é o fundamento específico da distinção cobrada pela alternativa A.

ATENÇÃO AO ALCANCE
A expressão “oficiar à Corte de Contas”, empregada na alternativa, deve ser compreendida no contexto dessas notificações e requisições e dos destinatários expressamente enumerados na lei. Não transforme a resposta em uma proibição de toda e qualquer comunicação administrativa direta de um promotor com o órgão. A lei menciona membros dos Tribunais de Contas, não indistintamente qualquer servidor ou mensagem enviada ao tribunal.
Também não se conclui que o delegado tenha poderes ilimitados: a requisição deve ter relação com investigação de sua atribuição, observar o regime de sigilo aplicável e respeitar as hipóteses sujeitas à autorização judicial. A comunicação direta, por si só, não afasta esses limites.

EXEMPLO: durante investigação de sua atribuição, o delegado necessita de documento relacionado ao fato investigado e pode requisitá-lo nos limites legais. Não se aplica a ele, por simples analogia, a regra de encaminhamento pelo chefe do Ministério Público.
VARIAÇÃO: se um membro do MPRJ expede uma das requisições do art. 35 com destinatário enquadrado no § 1º, como um membro do Tribunal de Contas, o encaminhamento deve observar a via do Procurador-Geral de Justiça.
CONTRASTE: enviar uma comunicação administrativa ordinária a um setor do tribunal não é automaticamente a mesma situação normativa de requisitar informações de um destinatário enumerado no § 1º.

FIXAÇÃO
1. A lei orgânica do MPRJ rege automaticamente o encaminhamento de atos de um delegado? Não; cada instituição tem suas atribuições e seu regime legal.
2. O art. 35, § 1º, impede qualquer mensagem direta do promotor ao tribunal? Não; disciplina as notificações/requisições e os destinatários nele previstos.
3. Requisitar documentos dispensa sempre autorização judicial? Não; devem ser respeitadas as reservas e os limites legais aplicáveis.

FONTES E DATAS
LC estadual 106/2003, art. 35, § 1º: PDF obtido do portal oficial do MPRJ em 19/10/2026, página 28 (${capture.url}).
Lei 12.830/2013, art. 2º, § 2º: cópia oficial do Planalto capturada em 16/10/2026, hash reconferido nesta revisão (${federal.url}). A tentativa de nova transferência do Planalto foi bloqueada pela configuração de rede; a data da captura federal não foi avançada.
Caderno, página 14, e gabarito oficial definitivo, página 1: cópias oficiais preservadas, hashes e questão/letra conferidos visualmente. Trata-se de revisão pontual da questão 48, sem certificação integral da prova, da lei orgânica ou de jurisprudência não consultada.`;
const review=validateReview({items:[{table:'official_exam_questions',expected,patch:{content_status:'active',current_syllabus_topic_id:expected.current_syllabus_topic_id,legal_audit_completed:true,legal_review_required:false,legal_basis:[{url:row.url,artigo:'35, § 1º',title:row.title},{url:federal.url,artigo:'2º, § 2º',title:'Lei 12.830/2013 — investigação criminal pelo delegado'}],law_version_checked_at:now,verified_at:now,review_note:expected.review_note+'\n\nRevisão pontual concluída em 19/10/2026: localizada a LC estadual 106/2003 no portal oficial do MPRJ, art. 35, § 1º, página 28. Caderno página 14 e gabarito definitivo página 1 conferidos: item 48, A. Pendência estadual resolvida; comentário distingue requisições aos membros do Tribunal de Contas de toda comunicação administrativa. Fonte federal Planalto preservada de 16/10, sem alegar nova captura online.'+'\n\n'+explanation},evidence:{legal:true,reason:'State-law blocker resolved with freshly captured official MPRJ compilation, scoped article 35 §1; exact original official paper/final key visually checked; prior federal official capture hash verified; verified existing syllabus pointer preserved.',sources:[row.url,federal.url,...documents.map(d=>d.url)],state_capture:capture,federal_capture:federal,documents,source_capture_dates_preserved:true}}]});
await writeFile(root+'/source-pack.json',JSON.stringify(sourcePack,null,2)+'\n');
await writeFile(root+'/review-pack.json',JSON.stringify(review,null,2)+'\n');
console.log(JSON.stringify({items:1,question:expected.id,key:'A',source:row.id,comment_sha256:createHash('sha256').update(explanation).digest('hex')}));
