"""Explicit sentencing review, integrated with current text and qualified sources."""
import json,sys
from pathlib import Path
rows={}
def add(n,text,points,warning,case,variation,qa,term,meaning):
 rows['art-'+str(n)]=dict(simples=text,pontos=points,atencao=[warning],exemplo=case+' Variação: '+variation,prova=qa,
 termos=[dict(termo=term,significado=meaning)],remissoes=['https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'])
add(55,'As restritivas enumeradas no artigo seguem a duração da pena privativa substituída, com a ressalva de cumprimento abreviado dos serviços comunitários. A regra não transforma prestação pecuniária em obrigação de dias equivalentes.',
 ['Mesma duração para as espécies dos incisos III–VI do art. 43.', 'Ressalva expressa do art. 46, §4º.'],
 'Não ignorar a ressalva nem converter automaticamente toda restritiva em tempo de prisão. Requisitos de substituição continuam pertinentes.',
 'A limitação de fim de semana substitui pena privativa nos requisitos legais; a questão pede sua duração pela regra geral.',
 'Para serviços comunitários na hipótese do art. 46, §4º, analisar a possibilidade de menor tempo e seu limite.',
 ['Toda restritiva é medida temporal idêntica? Não; o artigo delimita as espécies.', 'A regra tem ressalva? Sim; remete ao art. 46, §4º.'],'Duração substitutiva','Tempo da restritiva nas espécies indicadas, com exceção expressa.')
add(56,'Interdições profissionais e funcionais dependem de crime cometido no exercício da atividade com violação dos deveres inerentes. A profissão não é motivo suficiente para proibir o exercício sem identificar esse vínculo.',
 ['Remissão ao art. 47, I e II.', 'Crime no exercício E violação de dever inerente.'],
 'Não impor perda definitiva de cargo por esta frase sobre interdição temporária. Diferenciar espécie de pena e efeitos da condenação do art. 92.',
 'Crime ocorre no exercício da profissão e viola dever inerente, atendidos os demais requisitos.',
 'Em crime sem vínculo com o exercício, a mera profissão não preenche os dois requisitos do artigo.',
 ['Basta o réu ter profissão? Não; exige vínculo e violação.', 'Interdição temporária é perda definitiva automática? Não; são institutos diferentes.'],'Dever inerente','Dever ligado ao exercício da profissão, atividade ou função.')
add(57,'O artigo remete à interdição de dirigir do art. 47, III para crimes culposos de trânsito. O regime deve ser integrado ao CTB atual, que tem sanções e regras próprias; não se usa a remissão como código completo de trânsito.',
 ['Crimes culposos de trânsito são o recorte expresso.', 'Interdição temporária não é qualquer multa administrativa.'],
 'Não copiar automaticamente prazo ou forma do CP para todo caso do CTB. Identificar o tipo e a disciplina especial vigente, sem inventar suspensão universal.',
 'A questão trata de crime culposo de trânsito e pede a interdição a que remete o CP.',
 'Se o fato é apenas infração administrativa, a sanção precisa ser examinada no regime administrativo, sem presumir crime ou esta pena.',
 ['O recorte textual é de crimes culposos? Sim.', 'Toda infração administrativa é essa pena criminal? Não; distinguir os regimes.'],'Interdição temporária','Espécie de restritiva no recorte legal, integrada à legislação de trânsito.')
add(58,'A multa criminal ordinária remete ao regime do art. 49. O parágrafo admite multa substitutiva sem cominação expressa na Parte Especial, mas sua referência antiga ao parágrafo único do art. 44 deve ser integrada à redação atual.',
 ['Regime geral de dias-multa e valor do dia do art. 49.', 'Multa substitutiva não depende sempre de previsão em cada tipo.'],
 'O art. 44 hoje possui vários parágrafos, não o antigo parágrafo único. Não criar regra pelo texto residual nem ignorar disciplina especial de multa.',
 'A questão exige que cada tipo mencione multa para permitir qualquer substituição legal.',
 'Em multa ordinária com previsão específica de lei especial, conferir seu regime em vez de importar todos os limites gerais.',
 ['O parágrafo antigo do art. 44 é nomenclatura atual? Não; integrar a redação vigente.', 'Limites gerais afastam toda regra especial? Não; identificar disciplina diversa.'],'Multa substitutiva','Substituição na hipótese legal, diferente de multa originalmente cominada.')
add(59,'O juiz fundamenta pena-base e outras decisões nos critérios legais de individualização. Os oito vetores não autorizam pena automática por estereótipos; antecedentes, conduta social e comportamento da vítima têm limites e funções distintos.',
 ['Pena, quantidade, regime e substituição são decisões indicadas.', 'Súmula 444/STJ: inquéritos e ações em curso não agravam pena-base.', 'Súmula 241: não usar a mesma reincidência também como circunstância judicial.'],
 'Não desqualificar vítima por vida sexual ou estilo de vida para culpá-la por violência. ADPF 1107 exige respeito à dignidade; valoração concreta não dispensa fundamentação e proibição de dupla contagem.',
 'A pena-base é elevada apenas porque existe inquérito ainda em curso.',
 'Condenação definitiva exige análise própria; não permite automaticamente repetir o mesmo fundamento em várias fases.',
 ['Inquérito em curso basta para maus antecedentes? Não, conforme Súmula 444.', 'O mesmo dado de reincidência pode ser contado nas duas fases? A Súmula 241 veda essa dupla valoração.'],'Circunstâncias judiciais','Vetores de individualização com fundamentos concretos e limites próprios.')
add(60,'A situação econômica é critério principal na multa. A lei admite aumento até o triplo quando a multa máxima seria ineficaz diante dessa situação, e mantém hipótese de multa substitutiva a integrar com o art. 44 atual.',
 ['Situação econômica do réu é critério principal.', 'Aumento ATÉ o triplo é condicionado à ineficácia mesmo no máximo.'],
 'Não triplicar toda multa automaticamente. A referência a até seis meses no §2º não deve ser usada como veto universal às possibilidades posteriores do art. 44.',
 'A decisão demonstra que mesmo a multa máxima é ineficaz pela situação econômica e examina o aumento.',
 'Sem demonstração dessa condição, não impor triplo só por chamar o condenado de rico.',
 ['O triplo é obrigatório em toda condenação? Não; há condição e limite máximo.', 'O critério é somente a pena de prisão? Não; o caput indica principalmente a situação econômica.'],'Ineficácia econômica','Condição concreta que fundamenta o aumento excepcional da multa.')
add(61,'Agravantes legais atuam quando a circunstância não constitui nem qualifica o crime. O rol inclui reincidência e motivos, meios e contextos específicos; em 2025 foi acrescentada a prática nas dependências de instituição de ensino.',
 ['Não duplicar elementar/qualificadora como agravante.', 'Alínea m: instituição de ensino, Lei 15.159/2025, publicada e vigente em 4/7/2025.', 'Embriaguez preordenada não é sinônimo de toda embriaguez.'],
 'Não presumir circunstância por rótulo genérico nem criar fração fixa inexistente no artigo. Cada agravante exige seus pressupostos.',
 'A mesma circunstância já qualifica o crime e é novamente usada como agravante.',
 'Se é circunstância autônoma que não constitui nem qualifica o tipo, examinar sua incidência e fundamentação.',
 ['Pode duplicar qualificadora pela mesma razão? Não; o caput ressalva esse uso.', 'A agravante escolar é apenas projeto de lei? Não; foi incluída na redação legal de 2025.'],'Agravante','Circunstância legal da segunda fase, com vedação da dupla valoração do mesmo elemento.')
add(62,'No concurso de pessoas, organização, coação/indução e execução mediante paga têm agravantes próprias. A posição de cada agente e sua conduta precisam ser identificadas; estar no grupo não prova todas as hipóteses.',
 ['Organizar/dirigir cooperação é hipótese do inciso I.', 'Executar ou participar mediante paga/promessa está no IV.'],
 'Não agravar indiscriminadamente todos pela atividade específica de um participante. Concurso exige contribuição e responsabilidade individual.',
 'Um agente dirige a atividade dos demais e a hipótese legal é demonstrada.',
 'Outro participante sem essa direção não recebe a mesma agravante automaticamente só por estar no concurso.',
 ['Todo participante necessariamente organiza? Não; identificar o papel.', 'Promessa de recompensa consta do texto? Sim; no inciso IV.'],'Agravante individual','Incidência ligada à atuação do agente, não transmitida automaticamente a todos.')
add(63,'Reincidência exige novo crime depois do trânsito em julgado de condenação por crime anterior, no Brasil ou exterior. A ordem dos eventos é essencial; processo em curso não equivale a condenação definitiva.',
 ['Trânsito anterior ao novo crime.', 'Condenação brasileira OU estrangeira, respeitados os demais requisitos.'],
 'Não usar condenação que só se tornou definitiva depois do novo fato para afirmar este requisito. Examinar também art. 64 e regime pertinente.',
 'O novo crime ocorre antes do trânsito em julgado da condenação anterior.',
 'Se ocorre depois do trânsito, esse requisito temporal muda, sem dispensar os demais.',
 ['Basta processo anterior aberto? Não; exige condenação transitada.', 'A data da sentença posterior substitui a data do novo crime? Não; a ordem exigida usa os eventos indicados.'],'Reincidência','Novo crime após condenação anterior definitiva, nas condições pertinentes.')
add(64,'O período depurador de reincidência é contado do cumprimento ou extinção da pena até a infração posterior, com regra de cômputo do período de prova sem revogação. Crimes militares próprios e políticos têm ressalva específica.',
 ['Período SUPERIOR a 5 anos, não exatamente cinco.', 'Marco não é automaticamente o trânsito da condenação.', 'Não confundir reincidência com toda análise de antecedentes.'],
 'O artigo não apaga automaticamente todos os dados históricos após cinco anos. Antecedentes e limites jurisprudenciais exigem análise própria; crime militar próprio não é qualquer crime de militar.',
 'A questão conta os cinco anos somente desde o trânsito, ignorando o cumprimento ou extinção.',
 'Com o marco correto, ainda verificar se o período é superior a cinco e o cômputo de prova sem revogação.',
 ['O marco legal é sempre o trânsito? Não; cumprimento ou extinção.', 'Exatamente cinco é superior a cinco? Não; observar a expressão do inciso.'],'Período depurador','Intervalo relevante à reincidência, com marcos legais específicos.')
add(65,'Atenuantes têm requisitos próprios. A Lei 15.160/2025 alterou a regra etária: menor de 21 no fato ou maior de 70 na sentença, com exceção para crime envolvendo violência sexual contra mulher. Outras atenuantes não são isenção automática.',
 ['Idades em momentos diferentes: FATO e SENTENÇA.', 'Exceção etária expressa para violência sexual contra mulher; Lei 15.160 publicada e vigente em 4/7/2025.', 'Súmula 231/STJ distingue atenuante da causa de diminuição.'],
 'Mudança prejudicial exige lei penal no tempo. Súmula 545 revisada em 10/9/2025, DJEN 2/12/2025: a confissão possibilita atenuação independentemente de uso no convencimento. O PDF geral ainda contém a versão antiga; utilizar o enunciado atualizado consultado no SCON. Não se certificam aqui todas as modalidades de confissão e teses do Tema 1194.',
 'A questão pede a redação etária atual e ignora a exceção expressa para violência sexual contra mulher.',
 'Em fato anterior à mudança, analisar irretroatividade prejudicial; não aplicar a exceção nova só por constar no compilado de hoje.',
 ['As duas idades são aferidas na mesma data? Não; fato para 21 e sentença para 70.', 'A atenuante de confissão depende sempre de uso pelo julgador? Não; a Súmula 545 revisada afasta essa exigência, sem dispensar análise dos demais requisitos.'],'Atenuante etária','Benefício ligado à idade em marcos distintos e à exceção atual, com análise temporal.')
add(66,'Circunstância relevante anterior ou posterior pode atenuar a pena mesmo sem previsão expressa específica. A regra exige fundamentação e não é autorização para criar causa de diminuição ou afastar os limites da fase intermediária.',
 ['Circunstância relevante pode ser anterior OU posterior.', 'Atenuação é possibilidade fundamentada.'],
 'Não confundir atenuante inominada com fração obrigatória de diminuição. A Súmula 231/STJ qualifica o mínimo legal na segunda fase.',
 'Uma circunstância relevante é demonstrada e fundamentada para exame da atenuação.',
 'Alegação genérica sem suporte não autoriza redução automática nem percentual inventado.',
 ['Exige que a circunstância conste de rol específico? Não; o artigo admite não prevista expressamente.', 'O artigo fixa metade obrigatória? Não; não contém tal fração.'],'Atenuante inominada','Circunstância relevante fora do rol específico, a valorar fundamentadamente.')
add(67,'No concurso de agravantes e atenuantes, a pena se aproxima do limite indicado pelas preponderantes. A lista textual inclui motivos, personalidade e reincidência; a aplicação concreta não é contagem mecânica de sinais positivos e negativos.',
 ['Identificar natureza e preponderância, não apenas quantidade.', 'Fundamentar o concurso e evitar duplicação de fatos.'],
 'O artigo não contém fórmula universal de compensação para toda confissão e reincidência. A Súmula 545 revisada afasta a exigência de uso da confissão no convencimento, mas não resolve sozinha a compensação nem todas as teses do Tema 1194.',
 'A decisão apenas conta duas atenuantes e uma agravante, sem examinar sua natureza.',
 'Com fundamentação sobre preponderância e teses aplicáveis, a análise deixa de ser simples soma aritmética.',
 ['Basta contar o número de circunstâncias? Não; o texto trata de preponderância.', 'O artigo fixa fração única de compensação? Não; não apresenta essa fórmula.'],'Preponderância','Peso jurídico da circunstância no concurso, distinto de mera contagem.')
add(68,'A dosimetria segue três fases: pena-base pelos critérios judiciais, agravantes/atenuantes e causas de aumento/diminuição. O parágrafo tem regra específica para concurso de causas da Parte Especial, sem permitir ignorar todas as majorantes indiscriminadamente.',
 ['1ª: art. 59; 2ª: agravantes/atenuantes; 3ª: causas de aumento/diminuição.', 'Parágrafo: faculdade no concurso de causas da Parte Especial, com prevalência da que mais altera.'],
 'Súmula 231 trata de atenuante na segunda fase, não proibição universal de diminuir abaixo do mínimo em toda terceira fase. Não valorar o mesmo fato duas vezes.',
 'A causa de diminuição é tratada como simples atenuante e colocada na segunda fase.',
 'Reconhecida sua natureza de causa, examinar a terceira fase e seus requisitos, não os mesmos limites da atenuante.',
 ['Agravantes vêm antes da pena-base? Não; a ordem é trifásica.', 'Atenuante e causa de diminuição são equivalentes? Não; ocupam fases e regimes distintos.'],'Sistema trifásico','Sequência legal das três etapas de cálculo da pena.')
add(69,'Mais de uma ação ou omissão produzindo dois ou mais crimes tem regra de cumulação. Reclusão é executada antes da detenção quando cumuladas; restritivas compatíveis podem ser cumpridas simultaneamente, e as demais sucessivamente.',
 ['Mais de uma conduta; cumulação das penas privativas.', 'Compatibilidade orienta simultaneidade das restritivas.'],
 'Não presumir concurso material em toda pluralidade de crimes: examinar também formal e continuidade. O §1º impõe condição própria à substituição.',
 'Duas ações autônomas preenchem crimes distintos sem configuração de continuidade.',
 'Se há uma só ação, reavaliar o art. 70, sem somar automaticamente pela regra material.',
 ['Quantidade de crimes resolve sozinha o tipo de concurso? Não; considerar condutas e requisitos.', 'Restritivas incompatíveis são sempre simultâneas? Não; o §2º prevê sucessividade.'],'Concurso material','Pluralidade de condutas com a cumulação nas condições do artigo.')
add(70,'Uma ação ou omissão com dois ou mais crimes tem regra de exasperação, mas dolo e desígnios autônomos levam à cumulação prevista. A pena pela regra favorável não deve superar a soma cabível no concurso material.',
 ['Regra: pena mais grave ou uma igual, com 1/6 até metade.', 'Desígnios autônomos na hipótese dolosa: cumulação.', 'Parágrafo limita pelo concurso material.'],
 'Não atribuir desígnios autônomos apenas pela pluralidade de vítimas. Demonstrar o elemento necessário e comparar o resultado das regras.',
 'Uma só conduta produz crimes na hipótese de concurso formal sem desígnios autônomos.',
 'Se a conduta dolosa tem desígnios autônomos demonstrados, a resposta passa à cumulação.',
 ['Toda ação única garante exasperação? Não; há hipótese de cumulação.', 'Pode superar a soma material pela regra do parágrafo? Não; esse é o limite comparativo.'],'Concurso formal','Pluralidade de crimes numa conduta, com regimes diferentes conforme os requisitos.')
add(71,'Continuidade exige crimes da mesma espécie e conexão nas condições que permitem considerar os seguintes continuação do primeiro. O parágrafo qualifica crimes dolosos com violência/ameaça e vítimas diferentes; não basta proximidade temporal isolada.',
 ['Regra: aumento de 1/6 a 2/3.', 'Hipótese qualificada: até o triplo, com critérios e limites remissivos.', 'Tempo, lugar, modo e outras condições são relevantes.'],
 'Não prometer continuidade automática por repetir um delito. A análise concreta e os requisitos jurisprudenciais precisam de verificação; até o triplo não é triplo obrigatório.',
 'A questão conclui continuidade apenas porque dois fatos ocorreram na mesma semana.',
 'Se todos os vínculos pertinentes são demonstrados, a conclusão pode mudar; ainda identificar regra comum ou qualificada.',
 ['Proximidade temporal sozinha resolve? Não; a redação exige conjunto de condições.', 'O parágrafo determina sempre triplicar? Não; prevê até o triplo com os critérios.'],'Continuidade delitiva','Tratamento unitário condicionado de crimes sucessivos, distinto de repetição automática.')
add(72,'O texto prevê multas distintas e integrais no concurso de crimes. A interpretação do regime de continuidade exige cuidado específico; não se usa uma frase geral para certificar toda combinação de penas e benefícios.',
 ['Multas e penas privativas têm regras que devem ser distinguidas.', 'Identificar material, formal ou continuidade antes do cálculo.'],
 'Este bloco não certifica todas as teses de multa no crime continuado. Não gerar exercício automático que transforme a literalidade em resposta universal para qualquer continuidade.',
 'A questão mistura a redução de uma pena privativa com cancelamento automático de todas as multas.',
 'Se a hipótese é continuidade, exigir a interpretação pertinente antes de aplicar mecanicamente regra de outro concurso.',
 ['Exasperação da prisão apaga toda multa automaticamente? Não; é preciso analisar o regime da multa.', 'A literalidade certifica toda continuidade? Não; há integração interpretativa específica.'],'Multa no concurso','Sanção pecuniária com análise própria conforme o tipo de concurso.')
add(73,'Erro na execução atinge pessoa diversa da pretendida e remete às condições da vítima visada. Se a vítima pretendida também é atingida, há remissão ao concurso formal. É diferente de erro sobre identidade antes da execução.',
 ['Considerar art. 20, §3º quanto às qualidades da vítima pretendida.', 'Se ambas são atingidas, remissão ao art. 70.'],
 'Não aplicar o mesmo cálculo a todo erro ou pluralidade de resultados sem seus elementos. Distinguir erro de execução e erro sobre pessoa.',
 'O meio se desvia e atinge pessoa diversa daquela contra quem o agente pretendia atuar.',
 'Se também atinge a pretendida, reavaliar a hipótese final e o art. 70, não repetir a resposta de vítima única.',
 ['O erro sempre isenta? Não; há disciplina de imputação própria.', 'A pessoa pretendida também atingida é irrelevante? Não; muda a remissão prevista.'],'Aberratio ictus','Erro na execução que desvia a ofensa para pessoa diferente.')
add(74,'Resultado diferente do pretendido, fora do erro contra pessoa do artigo anterior, tem imputação culposa se o fato admite culpa. Se o resultado pretendido também ocorre, remete ao concurso formal; não se cria crime culposo sem previsão.',
 ['Resultado diverso: culpa apenas se prevista para o fato.', 'Ocorrência conjunta do resultado pretendido: art. 70.'],
 'Não tratar todo desvio como art. 73 nem inventar modalidade culposa em tipo que não a admite. Analisar nexo e elementos.',
 'Sobrevém resultado diverso e o tipo correspondente não prevê culpa, na hipótese restrita do artigo.',
 'Se há previsão culposa e seus pressupostos, a possibilidade de imputação muda.',
 ['O artigo cria culpa para qualquer delito? Não; condiciona à previsão de crime culposo.', 'Resultado pretendido também ocorrido dispensa concurso? Não; o texto remete ao art. 70.'],'Resultado diverso','Desvio do resultado na hipótese legal, distinto de apenas trocar a pessoa atingida.')
add(75,'O limite atual de cumprimento de penas privativas é quarenta anos, com unificação quando a soma excede esse teto. Não é limite universal da pena total da sentença nem base automática para todos os benefícios.',
 ['Redação de 2019: 40 anos, não o antigo teto de 30.', 'Nova condenação por fato posterior ao início tem regra do §2º.'],
 'Mudança mais gravosa exige lei penal no tempo. Não recalcular automaticamente progressão e benefícios usando apenas o teto unificado; não impor quarenta anos retroativamente por ser texto atual.',
 'Uma questão chama quarenta anos de teto obrigatório da soma de todas as penas da sentença.',
 'Se pede tempo de cumprimento na hipótese atual, analisar a unificação e suas condições, distinguindo soma e execução.',
 ['Soma da sentença e teto de cumprimento são idênticos? Não; o limite se refere ao cumprimento.', 'A alteração autoriza retroatividade prejudicial? Não; observar a lei penal no tempo.'],'Unificação','Ajuste para o limite de cumprimento, sem equiparar todos os cálculos e benefícios.')
add(76,'No concurso de infrações, a execução começa pela pena mais grave. O dispositivo organiza prioridade de cumprimento, sem apagar as demais penas ou substituir o cálculo das regras de concurso.',
 ['Primeiramente a mais grave.', 'Ordem de execução é diferente de quantidade total.'],
 'Não deduzir que executar primeiro uma pena extingue todas as outras. A espécie e o regime de execução devem ser considerados.',
 'O candidato lê prioridade da pena mais grave como cancelamento das demais.',
 'Se a questão apenas pede qual vem primeiro, a resposta usa a prioridade sem afirmar extinção.',
 ['As demais penas desaparecem pelo artigo? Não; ele dispõe sobre ordem.', 'O artigo resolve sozinho a dosimetria do concurso? Não; é regra de execução prioritária.'],'Prioridade de execução','Ordem de cumprimento, distinta de exclusão de outras sanções.')
add(77,'Sursis suspende condicionalmente execução da pena privativa, com limites, período de prova e requisitos. É subsidiário à substituição cabível do art. 44 e diferente da suspensão condicional do processo.',
 ['Regra: pena até 2 anos; prova de 2 a 4.', 'Hipótese etária/saúde: pena até 4; prova de 4 a 6.', 'Multa anterior não impede por si; observar requisitos cumulativos.'],
 'Não transferir o limite de um ano da suspensão do processo para o sursis penal. Pena curta não garante automaticamente benefício; não confundir com absolvição ou extinção imediata.',
 'Pena de dois anos é analisada com os requisitos do sursis e sem substituição indicada/cabível.',
 'Se a substituição do art. 44 é cabível e indicada, a condição do inciso III muda a análise.',
 ['Sursis penal e suspensão do processo são iguais? Não; têm objetos e requisitos distintos.', 'Até dois anos, sozinho, assegura sursis? Não; observar os demais requisitos.'],'Sursis penal','Suspensão condicionada da execução da pena, não do processo.')
add(78,'Durante o sursis há condições de observação. No primeiro ano a regra prevê serviços ou limitação de fim de semana; a hipótese especial exige reparação ressalvada impossibilidade e circunstâncias inteiramente favoráveis, com condições cumulativas.',
 ['Primeiro ano e período total de prova são distintos.', 'Especial: as três condições do §2º são cumulativas.'],
 'Não exigir reparação impossível como se o texto não tivesse ressalva. A possibilidade de condições especiais não significa ausência de deveres.',
 'O caso preenche os requisitos do §2º, mas a questão manda escolher só uma de suas três condições.',
 'Se faltam circunstâncias inteiramente favoráveis, não presumir a mesma substituição das condições do primeiro ano.',
 ['As condições especiais são alternativas? Não; são aplicadas cumulativamente.', 'O artigo ignora impossibilidade de reparar? Não; expressamente a ressalva.'],'Sursis especial','Hipótese de condições substitutivas com requisitos e deveres cumulativos próprios.')
add(79,'A sentença pode acrescentar condições ao sursis quando adequadas ao fato e à situação pessoal. Essa faculdade não é autorização para impor condições arbitrárias ou impossíveis, nem elimina as regras do benefício.',
 ['Adequação ao fato E à situação pessoal.', 'Condições devem ser especificadas na sentença.'],
 'Não inventar sanção autônoma com base na faculdade. Avaliar motivação, possibilidade e direitos, sem prometer que qualquer condição é válida.',
 'A condição é imposta sem considerar a situação pessoal e o fato.',
 'Com adequação e fundamentação pertinentes, a faculdade pode ser examinada, sem dispensar os limites legais.',
 ['Qualquer condição arbitrária é permitida? Não; o texto exige adequação.', 'A faculdade apaga o art. 78? Não; complementa o regime sem substituí-lo irrestritamente.'],'Condição adequada','Dever compatível com fato e situação pessoal, nos limites do benefício.')
rows['art-65']['remissoes'] += ['https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15160.htm','https://scon.stj.jus.br/SCON/sumstj/toc.jsp?livre=545&tipo_visualizacao=RESUMO']
rows['art-61']['remissoes'].append('https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15159.htm')
rows['art-59']['remissoes'] += ['https://www.stj.jus.br/docs_internet/SumulasSTJ.pdf','https://noticias.stf.jus.br/postsnoticias/provas-em-processo-de-crime-sexual-em-que-houver-constrangimento-a-vitima-sao-nulas-decide-stf/']
if __name__=='__main__':
 assert len(rows)==25
 Path(sys.argv[1]).write_text(json.dumps(dict(course_slug='codigo-penal',units=rows),ensure_ascii=False,indent=2)+'\n');print(len(rows),'specific sentencing reviews')
