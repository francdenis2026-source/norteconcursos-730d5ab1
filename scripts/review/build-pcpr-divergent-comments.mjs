// Commentary only: preserve the preliminary keys, archived status and legal-check date.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validateReview} from './publish-question-review.mjs';
const [input,output]=process.argv.slice(2);
if(!input||!output)throw Error('Usage: CURRENT_PCPR_SNAPSHOT REVIEW_PACK');
const rows=JSON.parse(await readFile(input,'utf8'));
const LAW='https://www.planalto.gov.br/ccivil_03/leis/l9613.htm';
const LEP='https://www.planalto.gov.br/ccivil_03/leis/l7210.htm';
const STJ='https://scon.stj.jus.br/SCON/sumstj/toc.jsp?livre=%22439%22.num.&O=JT';
const STF='https://noticias.stf.jus.br/postsnoticias/stf-vai-decidir-se-exigencia-de-exame-criminologico-para-progressao-de-regime-vale-para-crimes-anteriores/';
const limit='Nota de atualização editorial — 19/10/2026: comentários ampliados com base nas cópias oficiais consultadas em 16/10/2026. A nova consulta online ao Planalto, STF e STJ foi bloqueada por erro HTTP 403. A data da conferência jurídica anterior foi preservada. Não se certificam alterações normativas, decisões posteriores nem gabarito definitivo ainda não conferidos. Item mantido fora do treino pontuado; comentário para estudo, sem substituir a resposta oficial.';
const comments={
14:`QUESTÃO 14 — CORRUPÇÃO PASSIVA E AUTOLAVAGEM
Gabarito preliminar registrado: A. Conclusão jurídica editorial: C é compatível com os atos autônomos de dissimulação descritos; isso não é retificação oficial da FGV.

ENTENDA EM DUAS ETAPAS
1. Solicitar ou receber vantagem indevida em razão da função caracteriza corrupção passiva (art. 317 do Código Penal).
2. Depois, simular uma compra e emitir documentação falsa para esconder a origem da propina pode configurar lavagem (art. 1º da Lei 9.613/1998). Quando o próprio autor da infração antecedente pratica esses atos autônomos, fala-se em autolavagem. Não basta presumir lavagem porque houve corrupção: é preciso identificar a ocultação ou dissimulação adicional.
No caso, a operação simulada com obras de arte e notas falsas fornece a razão jurídica para sustentar C, com concurso material quando se reconhecem condutas autônomas (art. 69 do CP).

COMENTÁRIO DAS ALTERNATIVAS
A: não é seguro tratar como mero exaurimento uma operação autônoma montada para dissimular a origem dos valores. A divergência incide exatamente aqui.
B: a Lei 9.613/1998 não prevê modalidade culposa. Saber que Ricardo ocupa cargo público, isoladamente, não demonstra ciência da origem criminosa do dinheiro. A responsabilização de Amanda exige prova dos elementos do tipo e do dolo; não se presume culpa penal por sua profissão ou pelo cargo do cliente.
C: juridicamente compatível com a descrição de corrupção seguida de atos próprios de ocultação ou dissimulação. Não transforma todo gasto de dinheiro ilícito em autolavagem.
D: incorreta. O art. 2º, II, estabelece a autonomia processual em relação à infração antecedente. Seu § 1º exige indícios suficientes da existência da infração antecedente, não condenação prévia do seu autor.
E: não há absorção automática da corrupção pela lavagem quando existem condutas autônomas.

EXEMPLO: receber propina e usá-la diretamente para uma despesa cotidiana não comprova, por si só, uma nova lavagem.
VARIAÇÃO: encenar a venda de um quadro e produzir notas falsas para apresentar a propina como receita lícita revela uma etapa adicional de dissimulação, se comprovados os elementos do crime.
FIXAÇÃO: o autor da corrupção pode cometer lavagem do mesmo dinheiro? Sim, se praticar atos autônomos que preencham o tipo; o simples recebimento ou gasto não basta automaticamente.

FONTES: Lei 9.613/1998, arts. 1º e 2º, II e § 1º (${LAW}); Código Penal, arts. 317 e 69 (https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm). A conclusão decorre desses dispositivos e dos fatos descritos; nenhum novo precedente específico de autolavagem foi certificado nesta atualização.

${limit}`,
51:`QUESTÃO 51 — EXAME CRIMINOLÓGICO E PROGRESSÃO DE REGIME
Gabarito preliminar registrado: E. A alternativa expressa a exigência de motivação concreta na sistemática jurisprudencial da Súmula 439/STJ. Sua aplicação deve ser situada no tempo.

ENTENDA A DIFERENÇA
Cumprir a fração da pena é o requisito temporal. Bom comportamento e a avaliação dos requisitos subjetivos constituem análise distinta. O prazo cumprido não torna automática a progressão.
A Súmula 439/STJ enuncia: “Admite-se o exame criminológico pelas peculiaridades do caso, desde que em decisão motivada.” Nos precedentes da súmula, a exigência excepcional do exame deve se apoiar nas particularidades concretas; a gravidade abstrata do delito e a extensão da pena, isoladamente, não individualizam essa necessidade.
Entretanto, a Lei 14.843/2024 modificou o art. 112, § 1º, da LEP: o texto passou a mencionar a boa conduta e os resultados do exame criminológico. Por isso, não se pode ensinar que o exame foi abolido nem transportar automaticamente a sistemática anterior para todo fato posterior.

A DATA DO CRIME IMPORTA
É necessário separar o regime anterior e os fatos alcançados pela nova exigência. A lei penal mais gravosa não retroage (Constituição, art. 5º, XL). A notícia oficial do STF de 07/07/2025 registra o reconhecimento da repercussão geral no Tema 1408, RE 1.536.743, sobre a incidência temporal do exame. Reconhecer repercussão geral não equivale a julgar o mérito. Esta atualização não certifica o andamento posterior. Tema 1381, sobre saída temporária e trabalho externo, é assunto diferente.
O enunciado cita as reformas de 2003 e 2024, mas omite a data do crime. Essa omissão impede apresentar E como regra universal atual sem ressalva.

COMENTÁRIO DAS ALTERNATIVAS
A: não resolve a questão dizer que basta ser crime hediondo e ignorar o regime temporal; o texto novo do § 1º tampouco se limita aos hediondos.
B: incorreta; o exame não foi definitivamente banido.
C: não basta invocar discricionariedade ou gravidade abstrata para justificar a exigência individual na sistemática da Súmula 439.
D: incorreta; atestado de comportamento e parecer favorável não vinculam automaticamente o juiz nem eliminam os demais requisitos. Além disso, o enunciado não afirma manifestação favorável do MP.
E: corresponde ao fundamento da Súmula 439 e à linha do gabarito preliminar, com a ressalva temporal exposta acima.

EXEMPLO: em caso submetido ao regime anterior, a decisão diz apenas “o crime é grave e a pena é longa”. Essa justificativa genérica não demonstra peculiaridade concreta para exigir o exame.
VARIAÇÃO: fatos individualizados da execução, devidamente demonstrados e motivados, podem justificar o exame na sistemática da súmula. Para um fato alcançado pela redação nova, é preciso examinar a exigência legal do art. 112, § 1º, e o controle judicial aplicável, sem repetir automaticamente a regra antiga.
FIXAÇÃO: completar o prazo dispensa os demais requisitos? Não. A Súmula 439 afirma que o exame é proibido? Não. A notícia sobre repercussão geral já traz uma tese final vinculante? Não.

FONTES: LEP, art. 112, §§ 1º e 2º (${LEP}); Súmula 439/STJ (${STJ}); STF, notícia de 07/07/2025 sobre o Tema 1408 (${STF}); Constituição, art. 5º, XL (https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm).

${limit}`};
const items=[14,51].map(number=>{
 const matches=rows.filter(q=>q.contest_name==='Polícia Civil do Estado do Paraná'&&q.exam_year===2026&&q.career_name==='Delegado de Polícia'&&q.item_number===number);
 if(matches.length!==1||matches[0].content_status!=='archived'||matches[0].official_answer!==(number===14?'A':'E'))throw Error(`Unexpected identity/status/key: ${number}`);
 const expected=matches[0];
 return {table:'board_exam_questions',expected,patch:{explanation:comments[number],review_note:`${expected.review_note}\n\n${limit}`,law_version_checked_at:expected.law_version_checked_at},evidence:{legal:true,reason:'Expand archived commentary with examples and alternative-by-alternative analysis; retain preliminary answer, archive decision and prior legal verification date. Online renewal blocked (403).',sources:number===14?[LAW,'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm']:[LEP,STJ,STF],source_evidence_date:'2026-10-16',online_reverification:'blocked_http_403'}};
});
const pack=validateReview({purpose:'explanation-improvement',items});
await writeFile(output,JSON.stringify(pack,null,2)+'\n');
console.log(JSON.stringify(items.map(i=>({item:i.expected.item_number,id:i.expected.id,status:i.expected.content_status,answer:i.expected.official_answer,comment_sha256:createHash('sha256').update(i.patch.explanation).digest('hex')}))));
