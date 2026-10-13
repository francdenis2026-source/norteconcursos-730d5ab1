"""Victim and witness procedure with privacy, accessibility and special testimony."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CF='https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
LBI='https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm'
CRI='https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13431.htm'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(201,'Ofendido é ouvido quando possível, recebe informações processuais e proteção de intimidade; não se confunde com testemunha compromissada.',
 ['Declara circunstâncias, autoria que conheça ou presuma e provas; ausência injustificada após intimação permite condução nos termos legais.', 'Informar ingresso/saída de prisão, audiência, sentença e acórdãos; meio eletrônico por opção.', 'Espaço separado e eventual atendimento multidisciplinar; custeio legal pelo ofensor ou Estado.', 'Proteger dados, honra e imagem, com sigilo pertinente; integrar proteção especial da vítima criança.'],
 'Presumir autor não equivale a reconhecer autoria definitivamente. Sigilo de dados deve preservar garantias de defesa sem exposição pública indevida.',
 'Vítima indica provas e endereço para comunicações; recebe notícia da audiência e proteção de seus dados.',
 'Se criança vítima de violência, aplica-se depoimento especial cabível, em vez de repetir o relato de forma revitimizadora.',
 ['Ofendido tem direito a comunicações previstas? Sim.', 'Toda vítima é testemunha sob compromisso? Não.'], 'Proteção do ofendido','Informação, atendimento e preservação da intimidade no procedimento.',[CRI])
add(202,'Toda pessoa pode ser testemunha; impedimentos, dispensas e ausência de compromisso são analisados nas regras específicas.',
 ['Capacidade de depor não depende de condição social.', 'Não excluir criança ou pessoa com deficiência só por essa condição.', 'Integrar acessibilidade e os arts. 206–208.'],
 'Pode depor não significa que todos sempre prestam compromisso ou que nenhum sigilo limita o depoimento.',
 'Pessoa com deficiência relata fato com apoio acessível adequado.',
 'Criança pode ser ouvida no procedimento pertinente, sem aplicar compromisso incompatível com a idade.',
 ['Deficiência impede automaticamente testemunhar? Não.', 'Toda pessoa presta sempre compromisso? Não.'], 'Aptidão testemunhal','Possibilidade de relatar conhecimento, com regras específicas e acessibilidade.',[LBI,CRI])
add(203,'Testemunha promete verdade, identifica-se, informa relação com as partes e explica como sabe o que relata.',
 ['Qualificação pessoal e profissional.', 'Parentesco ou outras relações devem ser esclarecidos.', 'Razões da ciência permitem avaliar credibilidade; observar exceções ao compromisso.'],
 'Dizer ouvi falar não é igual a presenciar: registrar a origem do conhecimento, sem atribuir percepção inexistente.',
 'Testemunha explica que viu o fato e informa relação com a vítima.',
 'Se apenas recebeu relato alheio, deve indicar essa origem, sem convertê-lo em observação direta.',
 ['Deve explicar como sabe o fato? Sim.', 'Parentesco pode ser ocultado por conveniência? Não.'], 'Razão de ciência','Origem do conhecimento relatado ao juízo.')
add(204,'Depoimento é oral, sem texto pronto trazido para substituí-lo; breve consulta a apontamentos é permitida.',
 ['Oralidade é regra.', 'Apontamento breve não é leitura integral de depoimento escrito.', 'Integrar recursos de acessibilidade e exceções legais próprias.'],
 'Não proibir toda consulta breve, nem admitir narrativa previamente redigida como substituto comum da oitiva.',
 'Testemunha consulta nota breve para lembrar data e depois responde oralmente.',
 'Leitura de texto inteiro preparado não se enquadra na simples consulta permitida.',
 ['Breve consulta é vedada? Não.', 'Pode substituir o depoimento por texto pronto como regra? Não.'], 'Oralidade testemunhal','Prestação por respostas orais, com consulta breve permitida.')
add(205,'Dúvida sobre identidade da testemunha leva a verificação pelos meios disponíveis, sem necessariamente impedir o depoimento desde logo.',
 ['Juiz verifica identificação.', 'Pode colher o relato enquanto esclarece identidade.', 'Não ignorar a dúvida nem dispensar registro.'],
 'Documento divergente não exige automaticamente descartar todo o relato antes da verificação.',
 'Nome apresenta divergência e juiz verifica dados, podendo ouvir a pessoa desde logo.',
 'Se identidade continuar incerta, a questão precisa ser esclarecida e valorada, não escondida.',
 ['Dúvida impede sempre ouvir imediatamente? Não.', 'Verificação é dispensável? Não.'], 'Verificação de identidade','Esclarecimento da identificação de quem depõe.')
add(206,'Há dever geral de depor, mas familiares enumerados podem recusar, salvo impossibilidade de obter ou integrar a prova por outro modo.',
 ['Ascendente, descendente, afim reto, cônjuge mesmo separado na terminologia histórica, irmão e vínculos adotivos enumerados.', 'Dispensa não é absoluta: exceção de prova insubstituível.', 'Integrar ausência de compromisso do art. 208 e proteção contra autoincriminação.'],
 'Não confundir direito familiar de recusa com proibição profissional de sigilo ou obrigação de se incriminar.',
 'Irmão do acusado pode recusar depoimento quando a prova pode ser obtida por outras fontes.',
 'Prova insubstituível exige examinar ressalva legal, sem impor autoincriminação contra garantia constitucional.',
 ['A recusa familiar é absoluta em todos os casos? Não.', 'É idêntica ao sigilo profissional? Não.'], 'Dispensa familiar','Faculdade legal de recusar depoimento, com ressalva expressa.',[CF])
add(207,'Dever de segredo por função, ministério, ofício ou profissão impede depoimento; exceção exige desobrigação pela parte interessada e vontade de depor.',
 ['Sigilo profissional não é mera preferência.', 'Desobrigação e vontade são requisitos cumulativos do texto.', 'Integrar normas profissionais especiais, sem presumir renúncia a todo segredo.'],
 'Liberação da parte não força o profissional a testemunhar; vontade isolada não elimina segredo.',
 'Profissional vinculado a segredo não relata informações protegidas só porque foi convocado.',
 'Parte interessada desobriga e profissional quer depor: examina-se cabimento e limites especiais aplicáveis.',
 ['Desobrigação sozinha obriga depoimento? Não.', 'Vontade sem desobrigação supera o segredo por este artigo? Não.'], 'Segredo profissional','Proteção de informações vinculada à função ou atividade.')
add(208,'O texto exclui compromisso para menores de 14 anos, familiares do art. 206 e hipóteses mentais descritas historicamente; isso não significa exclusão automática da oitiva.',
 ['Menor de 14 não presta compromisso; completar 14 não mantém essa dispensa por idade.', 'Familiares do art. 206 ficam sem compromisso na hipótese pertinente.', 'Deficiência não equivale a incapacidade civil nem falta de credibilidade; integrar acessibilidade e avaliação concreta.', 'Criança vítima/testemunha de violência tem depoimento especial próprio.'],
 'Não usar terminologia histórica para excluir toda pessoa com deficiência ou presumir mentira. Ausência de compromisso não é proibição de ouvir.',
 'Criança de 13 anos relata fato sem compromisso, no procedimento protetivo aplicável.',
 'Testemunha com deficiência recebe recursos acessíveis; não é descartada apenas por diagnóstico.',
 ['Sem compromisso significa proibido depor? Não.', 'Deficiência torna relato automaticamente falso? Não.'], 'Oitiva sem compromisso','Depoimento nas hipóteses de dispensa da promessa formal.',[LBI,CRI])
add(209,'Juiz pode ouvir testemunhas adicionais necessárias e pessoas referidas nos relatos; quem nada sabe de relevante não conta como testemunha.',
 ['Relevância e necessidade justificam complementação.', 'Pessoas referidas podem esclarecer o fato.', 'Não substituir investigação acusatória irrestritamente.'],
 'Testemunha do juízo não dispensa imparcialidade ou contraditório.',
 'Depoente aponta pessoa que presenciou detalhe relevante; juiz avalia sua oitiva.',
 'Pessoa sem qualquer conhecimento útil não é computada na forma do §2º.',
 ['Pessoa referida pode ser ouvida? Sim.', 'Quem nada sabe relevante deve contar necessariamente? Não.'], 'Testemunha referida','Pessoa mencionada cuja ciência pode justificar oitiva.')
add(210,'Testemunhas são ouvidas separadamente e não devem saber ou ouvir os relatos umas das outras; há advertência e espaços para incomunicabilidade.',
 ['Separação antes e durante audiência.', 'Advertir sobre falso testemunho nos termos cabíveis.', 'Oitiva remota também precisa controle para evitar interferência.'],
 'Não permitir acompanhar respostas anteriores para ajustar versão.',
 'Testemunhas aguardam em espaços separados e entram individualmente.',
 'Em vídeo, verificar que não acompanham ou recebem orientações sobre relatos anteriores.',
 ['Podem ouvir umas às outras como regra? Não.', 'Separação começa só depois de depor? Não.'], 'Incomunicabilidade','Controle para que relatos não sejam contaminados por oitiva de outros.')
add(211,'Ao reconhecer possível falso testemunho na sentença, juiz remete cópia para apuração policial; hipóteses de apresentação imediata exigem integração com o procedimento atual.',
 ['Afirmação falsa, silêncio ou negativa sobre verdade relevante.', 'Encaminhamento não é condenação automática.', 'Parágrafo usa remissões históricas; não importar rito antigo de plenário sem conferência atual.'],
 'Contradição ou memória imprecisa não equivalem sempre a falsidade dolosa; apuração exige requisitos do crime.',
 'Sentença aponta indícios de falsidade e encaminha cópia à polícia para investigar.',
 'Testemunha confundiu data sem demonstração de dolo: não decretar culpa automaticamente pela divergência.',
 ['Remessa condena imediatamente? Não.', 'Toda imprecisão prova crime? Não.'], 'Apuração de falso testemunho','Investigação própria do possível delito, separada da valoração do depoimento.')
add(212,'Partes perguntam diretamente à testemunha; juiz afasta indução, irrelevância e repetição, podendo complementar pontos não esclarecidos.',
 ['Modelo de perguntas diretas pelas partes.', 'Juiz controla pertinência e forma.', 'Complementação judicial é subsidiária sobre pontos obscuros.'],
 'Não confundir rito testemunhal com o interrogatório do art. 188 nem fazer o juiz substituir sistematicamente a acusação.',
 'Acusação e defesa perguntam; juiz rejeita questão que já sugere a resposta.',
 'Ponto relevante permanece sem esclarecimento: juiz pode complementar nos limites do artigo.',
 ['Todas as perguntas passam obrigatoriamente pela voz do juiz? Não.', 'Pergunta que induz resposta pode ser afastada? Sim.'], 'Pergunta direta','Questão formulada pela parte ao depoente com controle judicial.')
add(213,'Testemunha relata fatos, sem apreciações pessoais desvinculadas; opiniões inseparáveis da narrativa podem ser admitidas.',
 ['Distinguir percepção factual de julgamento moral.', 'Exceção de inseparabilidade.', 'Não reduzir toda descrição cotidiana a opinião proibida.'],
 'Dizer pareceu embriagado pode integrar percepção descrita, mas exige base; insulto ou julgamento alheio não substitui fato.',
 'Depoente descreve fala arrastada e desequilíbrio, explicando sua percepção.',
 'Afirmar pessoa é má sem fato pertinente deve ser controlado como apreciação desvinculada.',
 ['Toda percepção inseparável é proibida? Não.', 'Julgamento moral substitui relato de fatos? Não.'], 'Apreciação inseparável','Percepção que integra a narrativa sem virar opinião gratuita.')
add(214,'Contradita ocorre antes do depoimento; juiz registra alegação e resposta e só exclui ou dispensa compromisso nas hipóteses dos arts. 207–208.',
 ['Momento anterior à oitiva.', 'Parcialidade pode afetar valoração sem exclusão automática.', 'Registrar contradita e resposta.'],
 'Conhecer uma parte não leva por si à exclusão; distinguir credibilidade, sigilo e ausência de compromisso.',
 'Defesa contradita antes do relato apontando relação e juiz registra a resposta.',
 'Relação não enquadrada em impedimento pode ser valorada, sem impedir ouvir automaticamente.',
 ['Toda contradita exclui testemunha? Não.', 'Resposta precisa registro? Sim.'], 'Contradita','Objeção prévia às condições ou credibilidade da testemunha.')
add(215,'Registro do depoimento deve preservar tanto quanto possível as expressões e frases efetivamente usadas.',
 ['Fidelidade ao sentido e às palavras.', 'Não substituir relato por conclusão do redator.', 'Integrar documentação audiovisual atual quando cabível.'],
 'Resumo não deve converter incerteza em certeza ou relato indireto em percepção direta.',
 'Testemunha diz acho que era azul e o registro mantém a dúvida expressa.',
 'Não registrar tenho certeza se isso nunca foi afirmado.',
 ['Pode transformar dúvida em certeza? Não.', 'Expressões reais devem ser preservadas? Sim.'], 'Fidelidade documental','Registro sem alteração indevida do significado do depoimento.')
add(216,'Depoimento reduzido a termo tem assinaturas previstas; se testemunha não pode ou não sabe assinar, alguém assina por ela após leitura na presença de ambos.',
 ['Assinatura da testemunha, juiz e partes no modelo textual.', 'Leitura antecede assinatura por terceiro.', 'Integrar formas digitais e registro audiovisual legalmente cabíveis, sem inventar autoria.'],
 'Não atribuir assinatura própria a quem não a fez nem dispensar compreensão do termo.',
 'Testemunha não sabe assinar; termo é lido com ela e a pessoa que assinará a seu pedido.',
 'Registro eletrônico precisa autenticidade no regime aplicável, não assinatura fictícia.',
 ['Terceiro pode assinar na hipótese prevista? Sim.', 'Leitura é dispensável nesse caso? Não.'], 'Assinatura a pedido','Subscrição por outra pessoa após leitura nas condições legais.')
add(217,'Se presença do réu prejudica depoimento por humilhação, temor ou grave constrangimento, primeiro usar videoconferência; retirada só se vídeo for impossível, com defensor.',
 ['Impacto na verdade do relato precisa verificação.', 'Motivos e providência constam do termo.', 'Proteção da criança integra legislação especial.'],
 'Não retirar automaticamente réu por simples preferência sem motivo, nem afastar também seu defensor.',
 'Testemunha teme seriamente depor diante do réu; juiz fundamenta vídeo.',
 'Vídeo inviável permite retirada motivada, mantendo defensor e registro dos fundamentos.',
 ['Retirada é sempre primeira opção? Não.', 'Defensor permanece? Sim.'], 'Proteção na oitiva','Medida motivada que preserva depoente e contraditório.',[CRI])
add(218,'Testemunha regularmente intimada que falta sem justificativa pode ser apresentada por polícia ou conduzida por oficial com auxílio público.',
 ['Intimação regular e ausência injustificada.', 'Providência judicial, não punição arbitrária.', 'Distinguir testemunha de acusado que exerce silêncio.'],
 'Não aplicar esta regra como autorização genérica de conduzir acusado para interrogatório.',
 'Testemunha intimada não comparece sem motivo e juiz determina apresentação.',
 'Ausência justificada exige analisar causa, sem presumir desobediência automaticamente.',
 ['A falta justificada preenche o requisito? Não.', 'A regra é de testemunha? Sim.'], 'Apresentação de testemunha','Providência judicial na ausência injustificada após intimação regular.')
add(219,'Testemunha faltosa pode sofrer sanção e custas previstas, sem prejuízo de apuração de desobediência; a remissão ao antigo art. 453 exige integração atual.',
 ['Multa é faculdade judicial nas condições legais.', 'Não confundir sanção processual com condenação criminal imediata.', 'Conferir regras atuais da multa e procedimento; não usar conteúdo atual do art. 453 como se fosse a faixa antiga.'],
 'Não inventar valor em reais a partir da remissão histórica nem afirmar crime automático por toda ausência.',
 'Falta injustificada é apreciada para sanção e custos da diligência, com fundamento legal e defesa.',
 'Justificativa válida afasta tratar o fato como ausência injustificada, exigindo apreciação própria.',
 ['Toda falta condena automaticamente por desobediência? Não.', 'Remissão histórica dispensa conferir regime atual? Não.'], 'Sanção por falta','Consequência processual distinta da apuração de eventual delito.')
add(220,'Quem não pode comparecer por enfermidade ou velhice será ouvido onde estiver, com avaliação da impossibilidade.',
 ['Idade por si não prova impossibilidade.', 'Preservar condições de participação e defesa.', 'Não confundir com antecipação por risco de perda do depoimento.'],
 'Local especial não transforma o relato em ato sem contraditório.',
 'Enfermidade impede deslocamento e oitiva ocorre no local em que a testemunha se encontra.',
 'Pessoa idosa apta a comparecer não recebe impossibilidade fictícia só por idade.',
 ['Enfermidade pode justificar oitiva no local? Sim.', 'Toda idade avançada prova impossibilidade? Não.'], 'Oitiva fora da sede','Depoimento no local da pessoa efetivamente impossibilitada.')
add(221,'Autoridades enumeradas ajustam local e momento como testemunhas; somente grupo restrito pode optar por escrito. Militares e servidores têm comunicações próprias.',
 ['Escrito: Presidente/Vice da República e presidentes do Senado, Câmara e STF.', 'Perguntas das partes deferidas pelo juiz seguem ofício.', 'Militar requisitado ao superior; mandado a servidor comunicado imediatamente ao chefe com dia e hora.', 'Lista conserva nomes institucionais históricos; integrar cargos atuais sem ampliar privilégio.'],
 'Não atribuir depoimento escrito a toda autoridade da lista, nem confundir prerrogativa testemunhal com foro penal de acusado.',
 'Governador ouvido como testemunha ajusta local e horário, sem adquirir opção escrita apenas pelo caput.',
 'Presidente do Senado pode optar por respostas escritas no rito previsto, com perguntas deferidas.',
 ['Todo listado pode optar por escrito? Não.', 'Servidor tem comunicação ao chefe? Sim.'], 'Prerrogativa testemunhal','Tratamento da oitiva de certas funções, distinto de competência penal.')
add(222,'Testemunha fora da jurisdição é ouvida por precatória ao juiz da residência ou por vídeo nos termos legais; carta não suspende a instrução.',
 ['Prazo razoável e partes intimadas.', 'Após prazo, julgamento pode ocorrer; carta devolvida é juntada a qualquer tempo.', 'Vídeo pode ocorrer na audiência com participação defensiva; integrar interrogatório final e contraditório atuais.'],
 'Não confundir continuidade da instrução com licença para eliminar defesa relevante ou fazer interrogatório em ordem indevida sem análise.',
 'Testemunha de outra comarca é ouvida pelo destinatário, com ciência das partes, enquanto atos locais avançam.',
 'Videoconferência pode permitir relato na audiência, sem carta exigir suspensão automática.',
 ['Precatória suspende automaticamente instrução? Não.', 'Carta devolvida depois pode ser juntada? Sim.'], 'Precatória de oitiva','Pedido judicial interno para colher relato fora da jurisdição.')
add('222-a','Rogatória exige demonstração prévia de imprescindibilidade e custos pela parte requerente, observadas garantias e regimes especiais aplicáveis.',
 ['Diligência internacional, distinta de precatória interna.', 'Aplicam-se não suspensão e regra de devolução do art. 222, §§1º–2º.', 'Não presumir indispensável só por testemunha morar no exterior.'],
 'Não confundir custos da rogatória com eliminação automática da assistência jurídica devida; conferir situação concreta e normas especiais.',
 'Parte demonstra necessidade indispensável de oitiva externa antes da expedição.',
 'Diligência sem relevância essencial pode não satisfazer o requisito apenas por conveniência.',
 ['Exige imprescindibilidade prévia? Sim.', 'É idêntica à precatória entre comarcas? Não.'], 'Carta rogatória','Instrumento de cooperação internacional para diligência juridicamente cabível.')
add(223,'Testemunha sem domínio do português precisa de intérprete; dificuldades de fala ou audição exigem meios acessíveis integrados ao art. 192 e LBI.',
 ['Tradução de perguntas e respostas.', 'Não presumir comunicação idêntica em todas as deficiências.', 'Recursos devem assegurar compreensão e expressão.'],
 'Intérprete não deve substituir o relato por opinião pessoal nem excluir pessoa por deficiência.',
 'Testemunha estrangeira presta relato com perguntas e respostas interpretadas.',
 'Usuário de Libras tem suporte compatível, não perguntas escritas inacessíveis por mera presunção.',
 ['A testemunha precisa compreender perguntas? Sim.', 'Deficiência impede automaticamente ouvir? Não.'], 'Interpretação testemunhal','Apoio linguístico ou acessível sem alterar a autoria do relato.',[LBI])
add(224,'Testemunha comunica ao juiz mudança de residência durante um ano, sob consequências previstas para omissão.',
 ['Prazo de um ano.', 'Não depende de nova pergunta judicial para informar mudança.', 'Preservar sigilo pertinente de endereço e distinguir dever de publicidade geral.'],
 'Comunicar ao juiz não significa publicar endereço para qualquer interessado.',
 'Testemunha muda de residência dentro do período e informa o juízo para futura intimação.',
 'Endereço protegido deve ser tratado com segurança; dever de informar não autoriza exposição pública.',
 ['O prazo textual é um ano? Sim.', 'Comunicação exige divulgação pública irrestrita? Não.'], 'Atualização de endereço','Informação ao juízo para viabilizar comunicação no período legal.')
add(225,'Risco concreto de perder o depoimento por ausência, enfermidade ou velhice pode justificar oitiva antecipada, com garantias e regime especial pertinente.',
 ['Receio de indisponibilidade na instrução deve ser fundamentado.', 'Pedido de qualquer parte ou iniciativa prevista, integrada ao sistema acusatório.', 'Criança vítima/testemunha de violência: Lei 13.431 tem protocolos e hipóteses próprias de antecipação.'],
 'Velhice isolada não torna automática toda antecipação; não colher sem defesa por simples pressa.',
 'Doença grave ameaça possibilidade de oitiva futura e juiz fundamenta antecipação com participação das partes.',
 'Criança em hipótese especial segue rito protetivo, sem repetir desnecessariamente relato ou afastar ampla defesa.',
 ['A antecipação dispensa fundamento de risco? Não.', 'Há lei especial para depoimento de criança vítima de violência? Sim.'], 'Depoimento antecipado','Produção preservadora do relato sob fundamento e garantias.',[CRI])
assert len(rows)==26
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'victim and witness units reviewed')
