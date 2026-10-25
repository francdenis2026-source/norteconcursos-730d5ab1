"""Document falsity and mental health: specific examples and modern integrations."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'
SAUDE='https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10216.htm'
LEP='https://www.planalto.gov.br/ccivil_03/leis/l7210.htm'
CNJ='https://www.cnj.jus.br/perguntas-frequentes-sobre-a-politica-antimanicomial-do-poder-judiciario/'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(145,'Falsidade de documento dos autos é arguida por escrito em incidente separado, com contraditório, prova e decisão sobre sua permanência no processo.',
 ['Parte contrária responde em 48 horas.', 'Cada parte tem três dias sucessivos para provar; juiz pode ordenar diligências necessárias.', 'Falsidade reconhecida por decisão irrecorrível: retirar documento e enviar com incidente ao MP.'],
 'Incidente não é condenação automática pelo crime de falsidade. Não confundir 48 horas da resposta com três dias sucessivos de prova.',
 'Parte aponta falsidade de recibo por escrito; outra responde e ambas produzem prova nos prazos próprios.',
 'Após reconhecimento definitivo, documento é retirado e MP recebe o incidente para atuação cabível, sem condenação criminal automática.',
 ['Prazo da resposta é 48 horas? Sim.', 'Decisão do incidente condena automaticamente por falsidade? Não.'], 'Desentranhamento','Retirada do documento dos autos pela decisão pertinente.')
add(146,'Procurador que suscita falsidade documental precisa de poderes especiais para essa arguição.',
 ['Exigência ligada à atuação por procurador.', 'Procuração geral não substitui autorização específica prevista.', 'Distinguir arguição pela própria parte.'],
 'Não estender automaticamente poderes gerais do mandato à arguição de falsidade.',
 'Advogado apresenta procuração com poderes especiais para suscitar o incidente documental.',
 'Mandato apenas geral exige verificar a autorização específica, em vez de presumir preenchimento.',
 ['Poderes gerais são o requisito textual? Não; especiais.', 'A exigência é dirigida à arguição por procurador? Sim.'], 'Mandato especial','Autorização específica para a arguição de falsidade.')
add(147,'Juiz pode verificar de ofício a falsidade do documento no processo, observando o incidente e garantias pertinentes.',
 ['Iniciativa incidental não depende de pedido da parte.', 'Preservar contraditório e prova.', 'Não autoriza assumir investigação criminal autônoma contra possível falsificador.'],
 'Separar controle do documento utilizado no processo de substituição da atuação acusatória pelo juiz.',
 'Magistrado identifica sinais de alteração no documento e determina sua verificação incidental.',
 'Apuração penal de eventual falsificação seguirá órgãos e procedimento próprios, sem o juiz transformar-se em acusador.',
 ['A verificação depende sempre de pedido? Não.', 'O artigo autoriza juiz a substituir acusação em outro processo? Não.'], 'Verificação incidental','Exame da autenticidade documental para os fins do processo.')
add(148,'Decisão sobre falsidade no incidente não produz coisa julgada em prejuízo de posterior processo penal ou civil.',
 ['Qualquer que seja o resultado do incidente.', 'Efeito documental no processo não encerra toda controvérsia externa.', 'Posterior causa tem contraditório e requisitos próprios.'],
 'Não tratar reconhecimento incidental como condenação penal definitiva, nem negativa como imunidade civil absoluta.',
 'Documento é retirado após o incidente; investigação e eventual processo pela falsificação seguem próprios requisitos.',
 'Negativa incidental não impede automaticamente toda ação civil posterior sobre a autenticidade e seus efeitos.',
 ['A decisão impede toda causa posterior? Não.', 'Ela pode afetar o uso do documento no processo atual? Sim.'], 'Limite da decisão incidental','Ausência de coisa julgada prejudicial sobre a ulterior causa penal ou civil.')
add(149,'Dúvida sobre integridade mental leva a exame médico-legal determinado pelo juiz, com curador e suspensão da ação já iniciada, ressalvadas diligências urgentes.',
 ['Pode haver iniciativa do juiz, MP, defensor, curador, ascendente, descendente, irmão ou cônjuge.', 'No inquérito, autoridade policial representa ao juiz; não ordena sozinha o incidente judicial.', 'Curador é nomeado ao determinar exame; diligências prejudicadas pelo adiamento podem prosseguir.'],
 'Deficiência ou diagnóstico, por si, não significa inimputabilidade automática. O exame esclarece a questão no contexto legal.',
 'Há dúvida fundada e defensor pede exame; juiz determina, nomeia curador e suspende a ação, preservando prova urgente.',
 'Durante inquérito, delegado encaminha representação ao juiz competente em vez de decretar por conta própria o incidente.',
 ['Toda deficiência torna automaticamente inimputável? Não.', 'Provas urgentes podem ser realizadas? Sim.'], 'Incidente de avaliação mental','Procedimento para esclarecer dúvida relevante com perícia e garantias.',[CP])
add(150,'O exame tem prazo ordinário máximo de 45 dias, prorrogável por necessidade demonstrada pelos peritos. A referência histórica a manicômio deve ser integrada à proteção atual em saúde mental.',
 ['Maior prazo exige demonstração pericial, não adiamento arbitrário.', 'Autos podem ir aos peritos se não houver prejuízo à marcha.', 'Lei 10.216: cuidado digno, comunitário preferencial; internação exige insuficiência de recursos extra-hospitalares e laudo motivado.', 'CNJ orienta leitura dos códigos à luz da lei de saúde mental e da Convenção sobre deficiência; não certificar prazo uniforme de implementação local.'],
 'Estar preso não basta para ensinar internação asilar automática. Preservar texto histórico separado da aplicação atual; exame e tratamento não são conceitos idênticos.',
 'Peritos explicam necessidade de prolongar exame além de 45 dias e o juiz analisa a justificativa.',
 'Diagnóstico não autoriza recolhimento asilar automático; cuidado segue fundamentos clínicos, direitos e rede adequada.',
 ['45 dias podem ser prorrogados sem justificativa pericial? Não.', 'Prisão, sozinha, impõe tratamento asilar automático? Não.'], 'Avaliação médico-legal','Exame técnico, distinto de internação terapêutica ou medida de segurança.',[SAUDE,CNJ])
add(151,'Se o exame aponta inimputabilidade ao tempo do fato, o processo prossegue com curador; a remissão histórica ao CP 22 deve ser integrada ao atual CP 26.',
 ['Avaliar capacidade no momento da ação ou omissão.', 'Processo continua com curador; exame não determina arquivamento automático.', 'Medida de segurança exige decisão e pressupostos próprios, inclusive apuração do fato.'],
 'CP 22 atual trata de coação e ordem, não é a regra atual de inimputabilidade. Não impor medida automaticamente só por laudo.',
 'Perícia examina capacidade ao tempo do delito e conclui pela hipótese do CP 26; processo segue com curador e apuração de mérito.',
 'Se o fato imputado não foi demonstrado, o laudo não cria crime nem condenação por presunção.',
 ['O processo para definitivamente só pelo laudo? Não.', 'A regra atual a integrar é CP 26? Sim.'], 'Inimputabilidade ao fato','Condição juridicamente avaliada no momento da conduta, não presumida por diagnóstico.',[CP])
add(152,'Transtorno mental superveniente à infração suspende o processo até recuperação, salvo diligências urgentes; ao retornar, acusado pode reinquirir testemunhas ouvidas sem sua presença.',
 ['Distinguir condição ao tempo do fato do art. 151 e superveniência.', 'Preservação de prova urgente conforme art. 149, §2º.', 'Eventual internação exige integração com cuidados e requisitos atuais de saúde; não é punição automática.', 'Restabelecimento retoma o curso e preserva a reinquirição prevista.'],
 'Não prosseguir o mérito apenas com curador em toda doença posterior. Também não tratar a expressão histórica manicômio como internação asilar obrigatória.',
 'Após o fato, acusado apresenta quadro que exige suspensão nos termos do incidente; prova urgente é preservada.',
 'Restabelecido, poderá reinquirir testemunhas ouvidas sem presença, observadas garantias e rito.',
 ['Art. 151 e 152 examinam o mesmo momento? Não.', 'Há faculdade de reinquirição após recuperação? Sim.'], 'Superveniência clínica','Condição surgida após a infração, com efeitos processuais próprios.',[SAUDE,CNJ])
add(153,'O incidente de avaliação mental tramita em apartado e só é apensado ao principal depois da apresentação do laudo.',
 ['Apartado durante a perícia.', 'Laudo precede apensamento.', 'Resultado técnico não dispensa decisão judicial própria.'],
 'Não confundir a organização dos autos com suspensão absoluta de todas as diligências urgentes.',
 'Autos do incidente são mantidos separados durante o exame e apensados após o laudo.',
 'Enquanto isso, diligência que seria prejudicada pelo adiamento pode ser preservada conforme art. 149.',
 ['Apensamento ocorre antes do laudo? Não.', 'O laudo substitui toda decisão judicial? Não.'], 'Apensamento','Vinculação dos autos do incidente ao processo principal após a etapa prevista.')
add(154,'Condição mental surgida na execução exige regime de execução e saúde atuais, sem depender exclusivamente da antiga remissão ao art. 682.',
 ['Integrar LEP 108 e 183, CP e Lei 10.216, distinguindo tratamento e eventual substituição da pena.', 'LEP 183 prevê possível substituição por medida de segurança por decisão judicial, incluindo provocação da Defensoria.', 'Internação não pode ser punição administrativa automática; exige pressupostos legais e clínicos e direitos.', 'Não confundir superveniência na execução com incapacidade ao tempo do fato.'],
 'A remissão antiga não basta para ensinar envio automático e indefinido a manicômio. Não declarar revogação textual dos dispositivos sem base.',
 'Durante cumprimento da pena surge condição mental; juízo da execução examina assistência e eventual medida juridicamente cabível.',
 'Equipe clínica e assistência adequadas são relevantes; autoridade administrativa não converte pena indefinidamente por sua própria ordem.',
 ['Só o art. 682 resolve atualmente toda a matéria? Não.', 'A conversão prevista na LEP é administrativa automática? Não; judicial e condicionada.'], 'Superveniência na execução','Alteração de saúde durante cumprimento da pena, submetida a regime próprio.',[LEP,SAUDE,CNJ])
assert len(rows)==10
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'document and health units reviewed')
