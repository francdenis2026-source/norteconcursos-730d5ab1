"""Explicit per-article proof and forensic practice, not automatic statute approval."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CF='https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
ADI='https://portal.stf.jus.br/processos/detalhe.asp?incidente=5840274'
STJ157='https://scon.stj.jus.br/SCON/pesquisar.jsp?b=ACOR&fr=veja&i=1&livre=%28%27AGRHC%27+INPATH%28CLAS%29+AND+%27815195%27+INPATH%28NUM%29%29+OR+%28%28%27AgRg+no+HC+815195%27%29+INPATH%28SUCE%29%29&thesaurus=JURIDICO'
CUSTODIA='https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/09122021-Quebra-da-cadeia-de-custodia-nao-gera-nulidade-obrigatoria-da-prova--define-Sexta-Turma.aspx'
GRAF='https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=453761'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(155,'Convicção fundamentada usa prova sob contraditório judicial; elementos informativos não podem ser fundamento exclusivo, ressalvadas provas cautelares, não repetíveis e antecipadas.',
 ['Livre apreciação não dispensa motivação nem licitude.', 'Inquérito pode integrar o conjunto, mas não substituir prova judicial pela mera repetição de suspeitas.', 'Restrições civis são observadas quanto ao estado das pessoas.'],
 'Não afirmar que inquérito é sempre inutilizável ou que qualquer condenação pode apoiar-se exclusivamente nele.',
 'Depoimento só policial é comparado com prova judicial: informação investigativa não basta como fundamento exclusivo.',
 'Prova não repetível tem regime ressalvado, com garantias aplicáveis; não se torna proibida só por origem anterior ao processo.',
 ['Toda informação de inquérito é proibida? Não.', 'Livre apreciação dispensa motivação? Não.'], 'Elemento informativo','Dado de investigação distinto da prova judicial em contraditório.')
add(156,'O texto distribui prova da alegação e prevê diligências judiciais; a aplicação deve preservar presunção de inocência, ônus acusatório e sistema acusatório.',
 ['Acusação demonstra o fato imputado; não cabe exigir que acusado prove inocência.', 'Prova antecipada exige urgência, relevância, necessidade, adequação e proporcionalidade.', 'ADI 6298: diligências suplementares pontuais, nos limites legais, para dúvida relevante ao mérito; não substituir atuação acusatória.'],
 'Não tratar o inciso I como licença para juiz investigar de ofício. Nem afirmar proibição absoluta de qualquer esclarecimento suplementar na instrução.',
 'Na instrução há dúvida relevante sobre prova existente; juiz fundamenta diligência suplementar nos limites legais.',
 'Juiz não pode assumir apuração investigativa para construir acusação que o MP não demonstrou.',
 ['O acusado deve provar inocência? Não.', 'Diligência suplementar pontual é sempre proibida? Não; observar ADI e limites legais.'], 'Diligência suplementar','Esclarecimento pontual autorizado sem substituição da acusação.',[CF,ADI])
add(157,'Prova obtida violando Constituição ou lei é inadmissível; derivadas também, salvo ausência de nexo ou fonte independente. O §5º de impedimento automático foi declarado inconstitucional.',
 ['Fonte independente exige percurso próprio juridicamente adequado, não justificativa inventada.', 'Preclusa a decisão de retirada, inutilização judicial pode ser acompanhada pelas partes.', '§4º vetado não contém regra ativa.', 'ADIs 6298/6299/6300/6305 e AgRg HC 815195/STJ: não ensinar o §5º como impedimento automático vigente.'],
 'Nem toda prova posterior é automaticamente contaminada; examinar nexo. Inconstitucionalidade do §5º não torna a prova ilícita admissível.',
 'Dado obtido ilicitamente conduz diretamente a outra prova: examinar derivação e as exceções legais.',
 'A fonte realmente independente pode ser utilizada; não basta dizer que alguém poderia encontrar o mesmo dado de qualquer maneira.',
 ['O §5º impõe impedimento automático atual? Não; foi declarado inconstitucional.', 'Fonte independente precisa de fundamento real? Sim.'], 'Prova derivada','Prova ligada causalmente à obtenção ilícita, sujeita às exceções legais.',[STJ157,'https://legis.senado.gov.br/norma/528776'])
add(158,'Infração com vestígios exige exame de corpo de delito direto ou indireto; confissão não o substitui. Há prioridade para vítimas vulneráveis enumeradas.',
 ['Prioridade: violência doméstica contra mulher; violência contra criança, adolescente, idoso ou pessoa com deficiência.', 'Corpo de delito não significa apenas cadáver.', 'Se vestígios desapareceram, integrar a exceção probatória do art. 167.'],
 'Confessar não dispensa exame quando ele é exigível e possível.',
 'Lesão deixa vestígios: exame documenta materialidade mesmo com confissão.',
 'Vestígios desapareceram e exame não é possível: avaliar art. 167, sem equiparar confissão isolada ao exame.',
 ['Corpo de delito é só cadáver? Não.', 'Confissão supre o exame exigível? Não.'], 'Corpo de delito','Vestígios materiais da infração e sua constatação pericial.')
add('158-a','Cadeia de custódia documenta cronologicamente posse e manuseio do vestígio, do reconhecimento ao descarte.',
 ['Início na preservação do local ou detecção em procedimento policial/pericial.', 'Agente que reconhece elemento relevante responde por sua preservação.', 'Vestígio pode ser bruto, visível ou latente.', 'STJ: falha não gera nulidade automática universal; avaliar confiabilidade e caso concreto, sem torná-la irrelevante.'],
 'Não confundir cadeia de custódia com mera assinatura final do laudo, nem minimizar perda de rastreabilidade.',
 'Agente identifica material potencialmente relevante, preserva-o e registra percurso até análise e destinação.',
 'Falta de registro exige exame de confiabilidade; não se presume validade absoluta nem exclusão automática de todo o processo.',
 ['Começa só no laboratório? Não.', 'Toda falha anula automaticamente todas as provas? Não.'], 'Rastreabilidade','Possibilidade de reconstruir posse e manuseio cronológicos.',[CUSTODIA])
add('158-b','São dez etapas: reconhecimento, isolamento, fixação, coleta, acondicionamento, transporte, recebimento, processamento, armazenamento e descarte.',
 ['Reconhecer distingue interesse; isolar preserva; fixar descreve posição e características.', 'Coletar recolhe; acondicionar individualiza com data, hora e responsável; transportar mantém condições e posse.', 'Recebimento formal identifica procedimento, origem, transportador, rastreio, exame, tipo, protocolo e receptor.', 'Processar examina e gera laudo; armazenar guarda com vínculo; descarte respeita lei e autorização quando pertinente.'],
 'Fotografia pode ilustrar fixação, mas não dispensa a descrição; processamento não é transporte.',
 'Vestígio é fotografado e descrito antes da coleta, acondicionado individualmente e recebido com protocolo.',
 'Descarte não se faz só porque exame acabou: verificar autorização e regime legal.',
 ['Fixação é sinônimo de coleta? Não.', 'Descarte precisa respeitar legislação? Sim.'], 'Fixação do vestígio','Descrição detalhada do estado e posição, com ilustrações possíveis.')
add('158-c','Coleta é preferencialmente por perito oficial, com encaminhamento à central; todos os vestígios devem seguir o regime de custódia.',
 ['Preferencialmente não significa exclusivamente em todo caso.', 'Órgão central detalha cumprimento técnico.', 'Entrada em local isolado ou remoção antes da liberação pericial é proibida; o texto tipifica sua realização como fraude processual.'],
 'Não autorizar curiosos a remover material nem ensinar que preferência elimina preservação por outros agentes.',
 'Perito recolhe material e encaminha à central, mantendo registro e conservação.',
 'Agente que chega antes deve preservar, não retirar informalmente o vestígio do local isolado.',
 ['Coleta é sempre exclusivamente oficial no texto? Não; preferencialmente.', 'Remoção antes da liberação está autorizada? Não.'], 'Coleta preservada','Recolhimento com respeito à natureza e à liberação do local.')
add('158-d','Acondicionamento depende do material; recipiente individualizado e lacrado deve preservar integridade, sem contaminação ou vazamento.',
 ['Lacre numerado individualmente; resistência e espaço para informações.', 'Abertura pelo perito analista ou pessoa autorizada motivadamente.', 'Rompimento registrado com responsável, matrícula, data, local, finalidade e novo lacre.', 'Lacre rompido fica dentro do novo recipiente.'],
 'Abrir e fechar sem registro rompe a rastreabilidade; não reutilizar lacre como se intacto.',
 'Perito abre recipiente, registra rompimento e novo lacre, guardando o antigo no novo acondicionamento.',
 'Pessoa autorizada motivadamente pode abrir, mas isso não dispensa identificação e registro.',
 ['Lacre anterior deve ser descartado sem registro? Não.', 'Abertura autorizada dispensa ficha? Não.'], 'Lacre individualizado','Selo numerado para controle da inviolabilidade e de suas aberturas.')
add('158-e','Institutos de Criminalística devem ter central de custódia segura, vinculada ao órgão central de perícia, com protocolo e rastreio de acessos e movimentações.',
 ['Recepção, conferência, devolução, seleção e distribuição em ambiente adequado.', 'Entrada e saída protocoladas com relação ao inquérito.', 'Cada acesso identifica pessoa, data e hora; tramitação registra responsável, destino e momento.'],
 'Sala de depósito sem controle de acesso e ambiente adequado não satisfaz toda a central legal.',
 'Vestígio ingressa com protocolo e cada consulta ou saída recebe identificação e horário.',
 'Transferência interna também é ação a registrar, não apenas a chegada do laboratório.',
 ['Acesso de pessoa precisa identificação e horário? Sim.', 'Só entrada inicial merece protocolo? Não.'], 'Central de custódia','Estrutura segura de guarda e controle rastreável dos vestígios.')
add('158-f','Depois da perícia, material volta e permanece na central; armazenamento diverso depende de falta de condições e determinação formal.',
 ['Falta de espaço ou condições não legitima destino informal.', 'Diretor do órgão central de perícia requer solução.', 'Autoridade policial ou judicial determina condições do depósito diverso.'],
 'Perícia concluída não autoriza descarte automático.',
 'Material examinado retorna à central para guarda rastreável.',
 'Peça volumosa sem espaço exige requerimento do diretor e determinação das condições de guarda externa.',
 ['Exame terminado significa descarte livre? Não.', 'Guarda diversa exige determinação nas condições legais? Sim.'], 'Retorno à custódia','Reintegração do material examinado à guarda institucional.')
add(159,'Perito oficial com diploma superior realiza exame; na falta, duas pessoas idôneas com formação e habilitação relacionadas, prestando compromisso.',
 ['Um perito oficial é a regra; dois não oficiais na ausência.', 'MP, assistente de acusação, ofendido, querelante e acusado formulam quesitos e indicam assistente técnico.', 'Assistente atua após admissão e conclusão do exame/laudo oficial; partes intimadas.', 'Oitiva: mandado e questões com dez dias mínimos; parecer do assistente tem prazo judicial.', 'Material disponível no órgão, sob guarda e presença oficial, salvo impossibilidade de conservação; perícia complexa admite pluralidade de especialistas.'],
 'Assistente técnico não substitui o perito oficial nem leva livremente o vestígio para casa.',
 'Perito oficial produz laudo; assistente admitido examina material no órgão sob controle e apresenta parecer.',
 'Sem oficial, dois idôneos habilitados prestam compromisso; não nomear um só não oficial como regra.',
 ['Dois peritos oficiais são sempre obrigatórios? Não.', 'Assistente atua antes do laudo oficial por esta regra? Não.'], 'Assistente técnico','Profissional indicado pela parte, distinto do perito responsável pelo exame.')
add(160,'Laudo descreve minuciosamente o exame e responde quesitos em até dez dias, prorrogáveis excepcionalmente a pedido dos peritos.',
 ['Prazo do laudo: dez dias.', 'Exceção requer provocação pericial e fundamento.', 'Descrição e respostas são componentes distintos.'],
 'Não confundir prazo do laudo com 45 dias do exame mental ou antecedência da intimação pericial.',
 'Peritos apresentam descrição técnica e respostas no laudo em dez dias.',
 'Complexidade excepcional pode justificar pedido de prorrogação, não demora automática sem explicação.',
 ['Prazo comum é dez dias? Sim.', 'Prorrogação é automática sem pedido? Não.'], 'Laudo pericial','Documento técnico descritivo com resposta às questões formuladas.')
add(161,'Exame de corpo de delito pode ocorrer em qualquer dia e horário.',
 ['Não depende de dia útil.', 'Não depende de expediente judicial.', 'Horário livre não elimina demais garantias e condições técnicas.'],
 'Não atrasar vestígio perecível só porque é feriado ou noite.',
 'Lesão precisa documentação urgente na madrugada: artigo permite exame nesse horário.',
 'Permissão temporal não dispensa equipe habilitada ou custódia do material.',
 ['Pode ser feito em feriado? Sim.', 'Qualquer horário dispensa condições técnicas? Não.'], 'Disponibilidade temporal','Possibilidade legal de exame independentemente do calendário forense.')
add(162,'Autópsia ocorre ordinariamente pelo menos seis horas após óbito; sinais evidentes podem justificar antecipação, declarada no auto.',
 ['Seis horas são regra mínima, com exceção fundamentada pelos peritos.', 'Morte violenta: exame externo basta sem infração a apurar ou quando define causa e não há necessidade interna relevante.', 'Não reduzir toda morte violenta a exame externo automático.'],
 'A exceção não é autorização livre sem declaração pericial; condições do exame externo devem ser verificadas.',
 'Sinais evidentes de morte permitem aos peritos realizar antes de seis horas, com declaração no auto.',
 'Dúvida de circunstância interna relevante impede usar a suficiência externa como regra geral.',
 ['Nunca pode ocorrer antes de seis horas? Pode, na exceção fundamentada.', 'Toda morte violenta dispensa exame interno? Não.'], 'Autópsia','Exame cadavérico com requisitos e possíveis modalidades legais.')
add(163,'Exumação pericial tem dia e hora marcados e auto circunstanciado; administrador indica sepultura, sob pena legal, ou fazem-se pesquisas registradas.',
 ['Abrange cemitério público e particular.', 'Recusa, falta de indicação ou cadáver fora de sepultura exigem pesquisas.', 'Registrar a diligência e suas circunstâncias.'],
 'Exumação não é retirada informal de restos sem determinação e documentação.',
 'Administrador informa sepultura e diligência marcada é registrada em auto.',
 'Se não há indicação, autoridade pesquisa e documenta os procedimentos realizados.',
 ['Administrador particular também deve indicar? Sim.', 'Pesquisas devem constar do auto? Sim.'], 'Exumação','Retirada de restos para exame, mediante diligência formal.')
add(164,'Cadáver é fotografado como encontrado; lesões externas e vestígios locais também, na medida do possível.',
 ['Posição original é registro obrigatório.', 'Possibilidade qualifica o registro adicional de lesões e vestígios.', 'Integrar preservação do local e cadeia de custódia.'],
 'Não reposicionar primeiro e documentar como se fosse a posição original.',
 'Equipe registra fotograficamente a posição encontrada antes de alteração pericial.',
 'Limitação real para algum detalhe é documentada, sem dispensar arbitrariamente a posição do cadáver.',
 ['A posição encontrada deve ser fotografada? Sim.', 'Pode montar posição fictícia como original? Não.'], 'Registro cadavérico','Documentação da posição e dos elementos externos encontrados.')
add(165,'Peritos juntam, quando possível, fotografias, esquemas ou desenhos rubricados para representar lesões cadavéricas.',
 ['Ilustrações complementam descrição técnica.', 'Rubrica identifica responsabilidade pelo material.', 'Possibilidade não autoriza falsificação ou omissão injustificada.'],
 'Desenho é apoio ao laudo, não substituto de exame real.',
 'Perito usa esquema rubricado para localizar lesões descritas no laudo.',
 'Fotografias insuficientes podem ser complementadas por desenhos, sem inventar lesões.',
 ['Esquemas podem ser usados? Sim.', 'Ilustração dispensa exame? Não.'], 'Ilustração pericial','Representação visual identificada que auxilia a descrição do exame.')
add(166,'Dúvida de identidade do cadáver exumado exige reconhecimento institucional ou testemunhal, auto descritivo e autenticação de objetos úteis.',
 ['Instituto de identificação ou repartição congênere, ou testemunhas.', 'Auto de reconhecimento e identidade com sinais e indicações.', 'Objetos úteis arrecadados e autenticados em qualquer caso.'],
 'Não presumir identidade só pela sepultura se subsiste dúvida fundada.',
 'Sinais e objetos associados ao cadáver exumado são documentados para o reconhecimento.',
 'Depoimento de familiar é examinado com a documentação, sem dispensar arrecadação dos objetos úteis.',
 ['Pode haver prova testemunhal de reconhecimento? Sim.', 'Objetos úteis devem ser autenticados? Sim.'], 'Reconhecimento de identidade','Identificação documentada do cadáver cuja identidade é duvidosa.')
add(167,'Se vestígios desapareceram e o exame se tornou impossível, testemunhas podem suprir sua falta.',
 ['Exige impossibilidade ligada ao desaparecimento.', 'Não é dispensa genérica de perícia possível.', 'Confissão não substitui automaticamente o exame exigível.'],
 'Falta de vontade de periciar não equivale a desaparecimento dos vestígios.',
 'Lesões não deixaram vestígios disponíveis ao tempo do exame: avaliar prova testemunhal substitutiva.',
 'Vestígios conservados tornam perícia possível; não dispensá-la só por haver confissão.',
 ['Testemunhas sempre dispensam exame possível? Não.', 'Desaparecimento pode permitir suprimento testemunhal? Sim.'], 'Suprimento testemunhal','Substituição probatória nas condições excepcionais do artigo.')
add(168,'Lesões com exame incompleto exigem complementação; incapacidade para ocupações habituais por mais de 30 dias é verificada após esse prazo contado do crime.',
 ['Autoridade policial/judicial pode determinar; MP, ofendido, acusado ou defensor podem requerer.', 'Auto inicial orienta suprimento ou retificação.', 'Exame do CP 129, §1º, I logo após 30 dias do fato; falta do complementar pode ser suprida por testemunhas.'],
 'Não contar 30 dias do primeiro laudo, nem confundir ocupação habitual com apenas emprego remunerado.',
 'Lesão pode gerar incapacidade superior a 30 dias; exame complementar após esse período avalia a classificação.',
 'Primeiro exame incompleto por outro motivo pode ser complementado sem fingir que toda hipótese tem prazo obrigatório de 30 dias.',
 ['Prazo específico é contado do crime? Sim.', 'Todo complementar precisa esperar 30 dias? Não.'], 'Exame complementar','Perícia que supre ou retifica exame inicial de lesões.', ['https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'])
add(169,'Autoridade preserva o local até chegada pericial; laudo pode ilustrar e deve registrar alterações e suas consequências na dinâmica.',
 ['Providência imediata contra alteração.', 'Fotografias, desenhos ou esquemas podem apoiar.', 'Integrar liberação pericial e hipóteses especiais legais, não remover indiscriminadamente.'],
 'Alteração inevitável não deve ser ocultada no laudo; discutir impacto é parte da reconstrução.',
 'Equipe isola o local e peritos descrevem os vestígios encontrados.',
 'Houve mudança antes da chegada: peritos registram e analisam consequências, sem apresentar cenário alterado como intacto.',
 ['Alterações devem ser registradas? Sim.', 'Fotografias permitem ignorar mudanças? Não.'], 'Preservação do local','Manutenção do estado relevante para análise, com registro das intervenções.')
add(170,'Laboratório guarda material suficiente para eventual nova perícia; laudos podem ser ilustrados por fotografias, microfotografias, desenhos e esquemas.',
 ['Reserva para contraprova ou novo exame.', 'Ilustração quando conveniente.', 'Integração com custódia e limites materiais de conservação.'],
 'Não consumir sem registro todo o material como regra, inviabilizando arbitrariamente exame posterior.',
 'Laboratório analisa amostra e preserva porção suficiente para novo exame possível.',
 'Impossibilidade material real deve ser documentada e tratada tecnicamente, não escondida.',
 ['Prevê reserva para nova perícia? Sim.', 'Ilustração é sempre obrigatória neste artigo? Não; quando conveniente.'], 'Reserva pericial','Material preservado para exame posterior pertinente.')
add(171,'Rompimento de obstáculo ou escalada exige descrição dos vestígios e indicação pericial de instrumentos, meios e época presumida do fato.',
 ['Análise técnica do modo de execução.', 'Descrever vestígios antes de concluir.', 'Integrar corpo de delito e eventual impossibilidade do art. 167.'],
 'Qualificadora não deve ser presumida só pelo nome dado à ocorrência.',
 'Fechadura rompida é descrita e perito indica instrumento e meio provável.',
 'Sem vestígio disponível, avaliar justificativa de impossibilidade e regime probatório, não fabricar laudo.',
 ['Só dizer houve rompimento basta ao laudo? Não.', 'Época presumida integra o exame? Sim.'], 'Vestígio de execução','Marca material que ajuda a reconstruir meios e instrumentos empregados.')
add(172,'Peritos avaliam coisas destruídas, deterioradas ou produto do crime quando necessário; impossibilidade direta permite elementos dos autos e diligências.',
 ['Necessidade da avaliação.', 'Via indireta precisa elementos existentes e obtidos legitimamente.', 'Não confundir estimativa fundamentada com palpite.'],
 'Destruição do objeto não torna impossível toda avaliação, mas exige suporte técnico para reconstrução.',
 'Bem destruído é avaliado com registros disponíveis e diligências técnicas.',
 'Sem dados confiáveis, não inventar valor para preencher relatório.',
 ['Só avaliação direta é permitida? Não.', 'Palpite sem elementos satisfaz via indireta? Não.'], 'Avaliação indireta','Estimativa técnica fundamentada sem exame direto possível.')
add(173,'Perícia de incêndio verifica causa, início, perigo à vida ou patrimônio alheio, dano, valor e demais circunstâncias relevantes.',
 ['Origem e local inicial.', 'Perigo distinto do dano já ocorrido.', 'Extensão e valor documentados.'],
 'Não concluir incêndio criminoso apenas porque houve fogo; causas e circunstâncias exigem apuração.',
 'Peritos investigam ponto inicial e risco ao prédio vizinho, além do prejuízo.',
 'Causa acidental exige análise própria; o laudo não deve presumir dolo a partir do dano.',
 ['Perigo e dano são avaliados? Sim.', 'Todo fogo prova crime doloso? Não.'], 'Dinâmica do incêndio','Reconstrução técnica da origem, propagação, risco e dano.')
add(174,'Grafotecnia compara escrito questionado com padrões reconhecidos ou autenticamente atribuídos; obtenção de novo padrão deve respeitar não autoincriminação.',
 ['Documentos reconhecidos pela pessoa, judicialmente ou sem dúvida de autenticidade podem servir.', 'Autoridade pode requisitar arquivos públicos ou examinar no local.', 'Acusado não deve ser compelido a produzir ativamente padrão incriminador; preservar informação sobre direitos.', 'Precatória pode viabilizar diligência em local conhecido, sem eliminar garantias.'],
 'Não transformar mandará escrever do inciso IV em obrigação coercitiva do acusado de produzir prova contra si. Fonte oficial STF sobre colheita sem advertência foi consultada por conteúdo indexado; acesso direto falhou.',
 'Perícia compara assinatura discutida com documentos autênticos já disponíveis.',
 'Pedido de nova escrita ao acusado não autoriza puni-lo só por exercer a garantia de não autoincriminação.',
 ['Pode comparar documentos autênticos existentes? Sim.', 'Acusado é compelido a produzir ativamente padrão contra si? Não.'], 'Padrão gráfico','Escrita de comparação com autenticidade e obtenção legítima.',[CF,GRAF])
add(175,'Instrumentos empregados na infração são examinados para verificar natureza e eficiência.',
 ['Identificar características do objeto.', 'Avaliar aptidão relacionada ao uso alegado.', 'Exame não decide sozinho autoria ou dolo.'],
 'Objeto apreendido não prova automaticamente que foi usado pelo acusado.',
 'Ferramenta vinculada ao fato passa por exame de características e capacidade.',
 'Conclusão sobre eficiência não elimina necessidade de ligar instrumento, conduta e autor por prova.',
 ['Eficiência integra exame? Sim.', 'Laudo sozinho define toda autoria? Não.'], 'Eficiência do instrumento','Aptidão técnica relevante à utilização investigada.')
add(176,'Autoridade e partes podem formular quesitos até o ato da diligência, observados os procedimentos específicos aplicáveis.',
 ['Quesitos são perguntas técnicas.', 'Momento limite do artigo: ato da diligência.', 'Não confundir com antecedência de dez dias para oitiva pericial do art. 159.'],
 'Não aplicar prazo de intimação da audiência como se fosse toda formulação de quesito neste artigo.',
 'Parte apresenta questão técnica até o ato do exame para esclarecimento pericial.',
 'Na oitiva posterior, regras específicas de antecedência e intimação continuam aplicáveis.',
 ['Partes também formulam quesitos? Sim.', 'O artigo fixa dez dias para toda pergunta? Não.'], 'Quesito','Pergunta técnica destinada ao perito.')
add(177,'Perícia por precatória tem nomeação no juízo deprecado; em ação privada, acordo das partes pode permitir nomeação pelo deprecante.',
 ['Regra: nomeação no destino.', 'Exceção: ação privada e acordo.', 'Quesitos judiciais e das partes transcritos na precatória.'],
 'Não estender acordo da ação privada a toda ação pública sem fundamento.',
 'Juízo solicita perícia em outra comarca e destino nomeia peritos.',
 'Na ação privada, acordo pode deslocar nomeação ao solicitante, com quesitos transcritos.',
 ['Regra é nomeação no deprecado? Sim.', 'A exceção dispensa acordo? Não.'], 'Juízo deprecado','Órgão destinatário da diligência solicitada por precatória.')
add(178,'Perícia oficial é requisitada ao diretor da repartição e o laudo assinado é juntado ao processo.',
 ['Requisição institucional.', 'Laudo com assinatura dos responsáveis.', 'Integrar quantidade e qualificações atuais do art. 159.'],
 'Plural histórico não torna dois oficiais obrigatórios em todo exame atual.',
 'Autoridade requisita ao diretor e junta laudo firmado pelo perito oficial competente.',
 'Perícia complexa pode ter mais profissionais, sem transformar pluralidade em regra universal.',
 ['Requisição vai ao diretor? Sim.', 'Dois oficiais são sempre exigidos pelo plural? Não.'], 'Requisição pericial','Solicitação institucional do exame técnico.')
add(179,'Perícia não oficial tem auto lavrado pelo escrivão e assinado pelos peritos; laudo prorrogado do art. 160 segue subscrição e rubrica indicadas.',
 ['Art. 159, §1º: assinatura dos peritos e da autoridade se presente.', 'Parágrafo remete ao art. 160, parágrafo único.', 'Expressão datilografado é histórica: integrar documentação eletrônica e identificação atuais.'],
 'Não exigir máquina de escrever como condição contemporânea de validade, nem dispensar autenticação dos responsáveis.',
 'Dois não oficiais assinam o auto lavrado; autoridade também assina se participou do exame.',
 'Documento eletrônico segue autenticidade aplicável, sem simular dispensa de autoria por formato digital.',
 ['Autoridade ausente deve assinar como presente? Não.', 'Peritos precisam identificar sua autoria? Sim.'], 'Auto do exame','Registro formal da diligência pericial não oficial.')
add(180,'Divergência pericial é registrada ou exposta em laudos separados e leva à nomeação de terceiro; se este divergir de ambos, pode haver novo exame.',
 ['Preservar opiniões e respostas divergentes.', 'Terceiro não apaga os laudos anteriores.', 'Divergência dupla permite novo exame por outros peritos.'],
 'Não obrigar peritos a fabricar consenso nem tratar terceiro como vencedor automático de qualquer disputa.',
 'Dois peritos divergem e autoridade nomeia terceiro, registradas as conclusões.',
 'Terceiro discorda de ambos: pode ser determinado novo exame, não simples escolha arbitrária.',
 ['A divergência deve ser documentada? Sim.', 'Terceiro impede sempre novo exame? Não.'], 'Divergência pericial','Conclusões técnicas discordantes preservadas para esclarecimento.')
add(181,'Formalidades ausentes e laudo omisso, obscuro ou contraditório exigem suprimento, complementação ou esclarecimento; pode haver novo exame por outros peritos.',
 ['Autoridade judiciária determina correção.', 'Separar obscuridade de mera discordância da parte.', 'Novo exame é possibilidade quando conveniente.'],
 'Deficiência técnica não deve ser ocultada nem resolvida com conclusão judicial sem base.',
 'Laudo deixa quesito essencial sem resposta; juiz determina complementação.',
 'Se a falha exige novo exame, outros peritos podem ser designados conforme a necessidade.',
 ['Omissão pode exigir complemento? Sim.', 'Novo exame é automaticamente proibido? Não.'], 'Esclarecimento pericial','Correção ou explicação de lacunas e ambiguidades técnicas.')
add(182,'Juiz pode aceitar ou rejeitar laudo total ou parcialmente, mediante apreciação fundamentada do conjunto probatório.',
 ['Laudo não vincula mecanicamente.', 'Motivação continua indispensável.', 'Não substituir ciência por opinião pessoal arbitrária.'],
 'Livre apreciação não significa ignorar prova técnica sem razões.',
 'Juiz acolhe parte do laudo e explica por que outra conclusão não é sustentada pelo conjunto.',
 'Discordância pessoal sem fundamento não legitima rejeição do exame.',
 ['O laudo vincula sempre integralmente? Não.', 'Rejeição dispensa motivação? Não.'], 'Valoração pericial','Análise judicial fundamentada da prova técnica.')
add(183,'Na ação que não é pública, observar o art. 19 sobre destino e disponibilidade dos autos investigativos pertinentes.',
 ['Remissão à disciplina da ação privada.', 'Verificar legitimidade e prazo de queixa.', 'Exame não transforma iniciativa privada em denúncia obrigatória do MP.'],
 'Não supor ação pública apenas porque houve perícia policial.',
 'Perícia em investigação de delito de ação privada integra autos disponíveis ao legitimado na forma do art. 19.',
 'A existência de laudo não elimina o prazo e os requisitos de propositura da queixa.',
 ['Perícia muda automaticamente natureza da ação? Não.', 'Remissão é ao art. 19? Sim.'], 'Iniciativa privada','Propositura por legitimado mediante queixa nas hipóteses legais.')
add(184,'Juiz ou polícia nega perícia requerida desnecessária ao esclarecimento, ressalvado exame de corpo de delito exigível.',
 ['Avaliar necessidade concreta.', 'Ressalva protege exame de materialidade.', 'Integrar art. 167 quando vestígios desapareceram e exame é impossível.'],
 'Não negar exame obrigatório possível por simples conveniência, nem aceitar toda diligência inútil sem análise.',
 'Pedido pericial irrelevante é motivadamente negado por ausência de necessidade.',
 'Infração com vestígios disponíveis exige corpo de delito, sem dispensa arbitrária pela regra geral.',
 ['Toda perícia pedida é obrigatória? Não.', 'Regra autoriza negar corpo de delito exigível por conveniência? Não.'], 'Necessidade pericial','Pertinência do exame, com ressalva legal da materialidade.')
assert len(rows)==36
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'evidence units reviewed')
