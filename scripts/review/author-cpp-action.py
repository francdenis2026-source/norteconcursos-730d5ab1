"""Explicit action-penal review; statute text stays separate from current interpretation."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CF='https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
CC='https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm'
CP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'
MP='https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm'
L15438='https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15438.htm'
SENADO='https://legis.senado.gov.br/norma/528776'
ANPP='https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=29%2F04%2F2025&num_registro=202400865397'
CONF='https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27021393%27'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(24,'A denúncia do Ministério Público inicia a ação pública. Quando a lei exige, são necessárias representação do legitimado ou requisição do Ministro da Justiça; não confundir essas condições com queixa.',
 ['Ação pública: titularidade do MP; manifestação da vítima não transfere a titularidade.', '§1º: morte ou ausência judicial do ofendido transmite representação ao cônjuge, ascendente, descendente ou irmão.', '§2º: crime em detrimento do patrimônio ou interesse da União, Estado ou Município tem ação pública; o enquadramento do caso precisa ser efetivo.'],
 'Atualização de integração: o §5º do art. 171 do CP foi revogado pela Lei 15.397/2026. Não usar estelionato atual como exemplo automático de representação; situações intertemporais têm análise própria.',
 'Em delito cuja lei exige representação, a vítima manifesta vontade válida de persecução e o MP examina a denúncia: a vítima não passa a ser titular da ação pública.',
 'Em ação privada, a peça acusatória é queixa apresentada pelo legitimado; não aplicar a regra de denúncia como se fossem a mesma espécie.',
 ['Representação transforma a ação pública em privada? Não; o titular continua sendo o MP.', 'Todo crime exige manifestação da vítima? Não; a condição depende da lei aplicável.'], 'Condição de procedibilidade','Requisito legal para exercer a ação em determinados crimes.',[CF,CP])
add(25,'Na regra geral do CPP, a representação pode ser retratada antes do oferecimento da denúncia; depois de oferecida, torna-se irretratável. Oferecimento e recebimento são momentos diferentes.',
 ['Marco geral: oferecimento, não recebimento da denúncia.', 'Lei Maria da Penha, art. 16: retratação da representação em ação condicionada exige audiência judicial específica, antes do recebimento, ouvido o MP.', 'Não estender a retratação especial a delitos de ação incondicionada.'],
 'O art. 16 da Lei Maria da Penha é regra especial. Não formular exercício que diga que recebimento é sempre o marco do CPP ou que toda violência doméstica depende de representação.',
 'Em ação condicionada comum, o MP já ofereceu a denúncia. Uma retratação posterior não produz o efeito previsto antes desse marco.',
 'Na hipótese condicionada regida pelo art. 16 da Lei Maria da Penha, conferir a audiência especial antes do recebimento e as demais exigências.',
 ['O CPP 25 usa recebimento como marco geral? Não; usa oferecimento.', 'A regra especial dispensa verificar se a ação é condicionada? Não; delitos incondicionados não dependem de representação.'], 'Retratação','Retirada de manifestação anterior, sujeita ao marco e ao regime legal próprios.',[MP])
add(26,'A redação histórica prevê início de ação por auto de flagrante ou portaria nas contravenções. Esse processo judicialiforme não foi recebido pela Constituição: ação penal pública é promovida pelo MP.',
 ['Separar apuração policial de propositura da ação penal.', 'CF 129, I: titularidade privativa da ação pública pelo MP.', 'CPP 3º-A: estrutura acusatória; juiz não ocupa função de acusação.'],
 'Texto visível na compilação não comprova aplicabilidade atual. Não ensinar portaria policial ou judicial como substituta vigente da denúncia.',
 'Uma contravenção é apurada em termo circunstanciado. Encaminhar informações ao órgão competente não torna o policial autor da ação judicial.',
 'Juiz recebe documento do fato; não pode substituir o MP oferecendo acusação por portaria própria.',
 ['Portaria judicial inicia validamente ação pública atual por contravenção? Não; há titularidade constitucional do MP.', 'Auto de flagrante e denúncia são o mesmo ato? Não; documentam fases e funções diferentes.'], 'Processo judicialiforme','Modelo histórico incompatível com a titularidade acusatória constitucional.',[CF])
add(27,'Qualquer pessoa pode levar ao MP informações escritas sobre fato de ação pública, autoria, tempo, lugar e elementos disponíveis. É provocação para exame, não imposição de denunciar.',
 ['Legitimidade para comunicar não exige ser a vítima.', 'Informações devem permitir verificar o fato e sua autoria.', 'O MP aprecia suporte, tipicidade e condições da persecução.'],
 'Notícia-crime não equivale a queixa, denúncia ou prova definitiva. Respeitar eventual necessidade de representação.',
 'Morador comunica por escrito possível crime de ação pública e indica documentos: o MP examina a notícia e as diligências pertinentes.',
 'Comunicação sem dados verificáveis não obriga denúncia nem autoriza condenação.',
 ['Só a vítima pode provocar o MP pelo art. 27? Não; qualquer pessoa.', 'A comunicação obriga o MP a denunciar? Não; exige exame dos pressupostos.'], 'Provocação do MP','Comunicação de informações para apreciação do órgão acusador.')
add(28,'Arquivamento não é determinado pela polícia. O MP manifesta-se e comunica vítima, investigado e autoridade policial. A leitura atual inclui a interpretação do STF nas ADIs do juiz das garantias.',
 ['STF: manifestação pelo arquivamento é submetida ao juiz competente; MP pode encaminhar ao Procurador-Geral ou instância revisora para homologação.', '§1º: vítima ou representante pode requerer revisão em 30 dias do recebimento da comunicação.', 'STF: juiz também pode provocar revisão quando identificar patente ilegalidade ou teratologia; não é discordância irrestrita sobre conveniência acusatória.', '§2º: em crimes contra União, Estados e Municípios, chefia do órgão de representação judicial pode provocar a revisão.'],
 'Não reproduzir o regime antigo de juiz discordar livremente e impor denúncia, nem apresentar o caput isolado como descrição integral do procedimento. Senado registra a interpretação das ADIs 6298, 6299, 6300 e 6305; STJ AgRg no RMS 73963 reafirma ausência de revisão automática universal.',
 'A vítima recebe comunicação do arquivamento e manifesta discordância dentro de 30 dias: a matéria pode ser submetida à instância ministerial competente.',
 'O juiz observa patente ilegalidade no arquivamento e provoca a revisão; isso não o transforma em titular da acusação nem permite que ele ofereça denúncia.',
 ['A polícia pode arquivar o inquérito por conta própria? Não; CPP 17.', 'O prazo da vítima conta do fato criminoso? Não; do recebimento da comunicação.', 'Qualquer divergência judicial autoriza substituir o MP? Não; o controle referido exige patente ilegalidade ou teratologia.'], 'Revisão ministerial','Reexame da manifestação de arquivamento pelo órgão competente do MP.',[SENADO,CF,'https://scon.stj.jus.br/SCON/GetInteiroTeorDoAcordao?dt_publicacao=08%2F09%2F2025&num_registro=202402643106'])
add('28-a','O ANPP é negociação do MP com investigado assistido por defensor, sujeita à homologação judicial. Exige pressupostos objetivos e subjetivos; pena baixa, isoladamente, não assegura oferta automática.',
 ['Caput: não ser caso de arquivamento; infração sem violência ou grave ameaça; pena mínima inferior, não igual, a quatro anos; necessidade e suficiência para reprovação e prevenção.', '§1º: considerar causas de aumento e diminuição concretamente aplicáveis ao aferir a pena mínima.', 'I–V: reparar/restituir salvo impossibilidade; renúncia voluntária a bens pertinentes; serviço por pena mínima reduzida de 1 a 2/3; prestação pecuniária; outras condições proporcionais e compatíveis, combinadas conforme acordo.', '§2º: impedimentos incluem transação cabível, reincidência ou habitualidade nos termos legais, benefício nos cinco anos anteriores à infração e violência doméstica/familiar ou contra mulher por razões de sexo feminino em favor do agressor.', 'Tema 1303/STJ (2025): silêncio ou ausência de confissão no inquérito não impedem proposta; confissão pode ocorrer perante MP após avaliação informada, negociação e aceitação com defesa.', '§§3º–8º: acordo escrito e assinado por MP/investigado/defensor; juiz ouve investigado com defensor, verifica voluntariedade/legalidade, devolve condições inadequadas para reformulação e pode recusar homologação.', '§§9º–11: vítima intimada da homologação e descumprimento; quebra comunicada ao juiz pode levar à rescisão e denúncia, e justificar recusa de suspensão condicional do processo.', '§§12º–14: cumprimento integral leva à extinção da punibilidade; certidão de antecedentes tem a exceção legal para impedir novo benefício; recusa de proposta admite requerer revisão superior.', 'HC 185913/STF e Tema 1098/STJ: retroatividade benéfica em processos em andamento sem trânsito, mesmo sem confissão anterior; pendentes em 18/09/2024 exigem manifestação motivada na primeira oportunidade; novas investigações/ações seguem oferta antes do recebimento, ressalvada proposta no curso da ação quando cabível.'],
 'Jurisprudência atual distingue confissão necessária à formalização de confissão prévia no inquérito. Não ensinar limite absoluto até a sentença, oferta automática pelo juiz ou aplicação após trânsito em julgado. Consulta ao acórdão do STJ citado e Informativo 843 não certifica toda jurisprudência posterior.',
 'Investigado por infração sem violência, pena mínima de dois anos, permaneceu em silêncio na polícia. O MP deve examinar os outros requisitos, sem negar proposta só pela falta de confissão policial; a negociação ocorre com defensor.',
 'Pena mínima exatamente de quatro anos não atende ao limite do caput, salvo efeito de causa de diminuição aplicável que altere a aferição. Violência doméstica possui impedimento próprio mesmo com pena baixa.',
 ['Pena mínima de quatro anos, sem redução aplicável, atende ao limite? Não; deve ser inferior a quatro.', 'Silêncio no inquérito impede automaticamente o ANPP? Não; Tema 1303 distingue o momento da confissão.', 'Cumprimento integral gera condenação penal? Não; o juízo decreta extinção da punibilidade.', 'Juiz pode substituir o MP e oferecer o acordo? Não; controla legalidade e voluntariedade e pode provocar apreciação motivada nos termos dos precedentes.'], 'ANPP','Acordo de não persecução penal, com negociação assistida e controle judicial.',[ANPP,CONF,CF])
add(29,'A ação privada subsidiária da pública cabe diante de inércia do MP no prazo legal, com legitimado e requisitos próprios. Não nasce apenas porque a vítima discorda de atuação tempestiva do MP.',
 ['CF 5º, LIX: garantia diante de ação pública não intentada no prazo.', 'MP pode aditar, repudiar e substituir a queixa, intervir, produzir prova e recorrer.', 'Negligência do querelante permite ao MP retomar como parte principal.', 'Arquivamento ou diligência tempestiva não se confundem automaticamente com inércia.'],
 'Separar ação exclusivamente privada de subsidiária: o regime de perempção do art. 60 não elimina a possibilidade de retomada pelo MP.',
 'Sem manifestação do MP no prazo legal para acusar, o legitimado avalia queixa subsidiária com assistência e requisitos.',
 'O MP tempestivamente requer diligência efetivamente indispensável: não concluir que toda ausência de denúncia caracteriza inércia.',
 ['Discordância da vítima com arquivamento equivale a inércia? Não; há mecanismos próprios de revisão.', 'O MP fica afastado após a queixa subsidiária? Não; mantém as atribuições do art. 29.'], 'Ação subsidiária','Iniciativa privada admitida na ação pública diante de inércia no prazo legal.',[CF])
add(30,'A ação privada é proposta pelo ofendido ou por quem tem qualidade legal para representá-lo. A queixa exige legitimidade e capacidade, além dos demais requisitos da peça.',
 ['Titularidade privada não se presume: depende do regime do delito.', 'Representação legal e representação como condição da ação pública são conceitos diferentes.', 'Morte/ausência e conflitos de representação têm disciplina nos artigos seguintes.'],
 'O direito de queixa não torna dispensável a assistência técnica necessária. Verificar decadência e poderes especiais.',
 'Ofendido em crime de ação exclusivamente privada procura advogado para apresentar queixa fundamentada.',
 'Em crime de ação pública, sua manifestação não converte denúncia em queixa privada comum; avaliar eventual hipótese subsidiária.',
 ['Queixa e representação são sempre equivalentes? Não; correspondem a regimes e funções distintos.', 'Qualquer terceiro pode ajuizar queixa por conta própria? Não; precisa de legitimidade.'], 'Querelante','Legitimado que promove a ação penal privada.')
add(31,'Morte do ofendido ou ausência declarada judicialmente transmite o direito de oferecer queixa ou prosseguir ao cônjuge, ascendente, descendente ou irmão, observada a preferência legal.',
 ['Sucessão processual não é transmissão da responsabilidade penal.', 'Abrange oferecimento e continuidade.', 'Art. 36 disciplina preferência e possibilidade de prosseguimento.'],
 'Ausência exige declaração judicial nos termos do texto; mero paradeiro desconhecido não comprova essa hipótese.',
 'Após morte do ofendido, descendente legitimado pretende prosseguir na ação privada: verificar preferência e prazo.',
 'A morte do acusado tem efeito diferente: analisar CPP 62 e extinção da punibilidade, não substituí-lo por familiar no polo penal.',
 ['Irmão integra a enumeração do art. 31? Sim.', 'Morte do acusado transmite a acusação contra seus herdeiros? Não; responsabilidade penal é pessoal.'], 'Sucessão do querelante','Transmissão da iniciativa ou continuidade privada nas hipóteses legais.',[CF])
add(32,'Quem não pode pagar as despesas da ação privada sem comprometer o sustento próprio ou familiar pode requerer assistência jurídica. O CPP prevê nomeação de advogado; a Constituição assegura assistência integral ao necessitado.',
 ['A nomeação depende de requerimento e demonstração da necessidade.', 'Pobreza é insuficiência para despesas sem privar recursos indispensáveis.', 'Atestado policial é meio expressamente previsto, não exigência exclusiva que dispense o regime constitucional e da Defensoria.'],
 'Não exigir indigência absoluta. Assistência não elimina prazo decadencial nem garante procedência da queixa.',
 'Pessoa com renda modesta demonstra que custas comprometeriam alimentação familiar e pede assistência para a queixa.',
 'A declaração e os demais elementos são examinados no regime pertinente; falta de atestado policial não torna, sozinha, impossível assistência constitucional.',
 ['É necessário não ter renda alguma? Não; considera-se comprometimento do sustento indispensável.', 'Assistência jurídica afasta o prazo da queixa automaticamente? Não.'], 'Assistência jurídica','Proteção de acesso à justiça para quem comprova insuficiência de recursos.',[CF])
add(33,'Curador especial protege o exercício da queixa quando falta representante ou há conflito de interesses nas hipóteses legais. A terminologia histórica sobre deficiência não autoriza presumir incapacidade por diagnóstico.',
 ['Juiz competente nomeia de ofício ou a requerimento do MP.', 'Menor de 18 anos sem representante ou com interesses conflitantes precisa da proteção adequada.', 'Lei 13.146 e Código Civil exigem análise atual de capacidade e salvaguardas; deficiência não equivale automaticamente a incapacidade.'],
 'Preservar o texto oficial como texto histórico, explicando seu vocabulário e integração atual. Curadoria é proteção específica, não substituição indiscriminada da vontade da pessoa com deficiência.',
 'Adolescente ofendido não tem representante disponível: juiz examina nomeação de curador especial para exercer a queixa.',
 'Adulto com deficiência capaz de exprimir vontade não perde automaticamente o direito de agir por ter esse diagnóstico.',
 ['Conflito com o representante pode justificar curador? Sim; nas hipóteses legais.', 'Deficiência, isoladamente, prova incapacidade? Não; o regime atual rejeita essa equiparação.'], 'Curador especial','Representação protetiva específica diante de falta ou conflito.',[CC,'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm'])
add(34,'A legitimação paralela entre 18 e 21 anos pertence ao regime histórico. A maioridade civil aos 18 anos tornou superada a extensão de representação fundada apenas nessa idade.',
 ['CC art. 5º: maioridade aos 18.', 'Representação especial por fundamento diverso exige análise própria.', 'Não confundir a redação mantida na compilação com regra etária atual.'],
 'Não treinar como vigente a alternativa de que pais continuam titulares só porque o ofendido tem 19 ou 20 anos.',
 'Ofendido de 19 anos, civilmente capaz, exerce a queixa por meio de advogado: a antiga faixa etária não cria titularidade paralela dos pais.',
 'Conflito de representação de menor de 18 segue art. 33, situação diferente.',
 ['Ter 20 anos mantém representante legal automaticamente? Não; a maioridade é aos 18.', 'O art. 34 deve ser lido isoladamente como atual? Não; integrar o Código Civil.'], 'Maioridade civil','Marco de 18 anos que supera a antiga incapacidade etária.',[CC])
add(36,'Havendo vários sucessores legitimados à queixa, a lei dá preferência ao cônjuge e depois ao parente mais próximo na enumeração do art. 31. Outro legitimado pode prosseguir diante de desistência ou abandono.',
 ['Art. 31 define os legitimados; art. 36 organiza concorrência.', 'Preferência não é monopólio absoluto de continuidade.', 'Abandono precisa ser analisado com sucessão e perempção, não convertido automaticamente em fim da ação.'],
 'Memória: primeiro identificar legitimados, depois preferência, finalmente prazo e continuidade.',
 'Cônjuge e filho comparecem para a mesma queixa após morte da vítima: aplica-se a preferência ao cônjuge.',
 'O preferente abandona a instância e outro legitimado pode prosseguir, observados os demais requisitos.',
 ['Preferência inicial impede toda continuidade por outro familiar legitimado? Não.', 'Art. 36 cria legitimados além dos do art. 31? Não; regula os que já possuem direito.'], 'Preferência sucessória','Ordem de exercício entre pessoas com direito de queixa.')
add(37,'Pessoas jurídicas legalmente constituídas podem exercer ação privada por representante indicado em contrato ou estatuto; no silêncio, por diretor ou sócio-gerente.',
 ['Abrange fundações, associações e sociedades.', 'Constituição legal e representação devem ser demonstradas.', 'Art. 60, IV: extinção sem sucessor possui consequência própria.'],
 'A possibilidade processual não significa que toda pessoa jurídica possa ser vítima de qualquer tipo penal: verificar o bem jurídico e o delito.',
 'Associação legalmente constituída apresenta queixa por seu presidente, designado pelo estatuto, em delito que admite essa posição de vítima.',
 'Pessoa sem poder estatutário ou legal não representa automaticamente a entidade por ser associada.',
 ['O estatuto pode definir quem representa a associação? Sim.', 'Todo associado tem poder de queixa em nome da entidade? Não.'], 'Representação da pessoa jurídica','Atuação por pessoa habilitada pelo ato constitutivo ou pela regra supletiva.')
add(38,'A regra geral é decadência em seis meses do conhecimento da autoria; na queixa subsidiária, conta-se do esgotamento do prazo para denúncia. Existe exceção atual expressa para violência doméstica e familiar contra a mulher.',
 ['Caput: seis meses, salvo disposição contrária; não contar automaticamente da data do fato.', '§1º: sucessão dos arts. 24 e 31 permanece sujeita ao regime previsto.', 'Lei 15.438/2026, publicada em 19/06/2026: §2º estabelece 12 meses para queixa ou representação no âmbito de violência doméstica e familiar contra a mulher, com os mesmos marcos indicados.', 'A exceção não torna todo crime doméstico condicionado; delitos incondicionados independem de representação.'],
 'Atualização recente destacada: 12 meses no âmbito do §2º, não seis. Não aplicar aumento prejudicial retroativamente nem presumir reabertura de decadência já consumada; examinar o marco temporal e a natureza do caso.',
 'Em fato sujeito ao regime novo e à representação, no âmbito doméstico contra mulher, a ofendida manifesta-se no oitavo mês do conhecimento da autoria: o prazo específico é de 12 meses.',
 'Em ação privada comum fora dessa hipótese, seis meses seguem como regra; alegar que todo prazo passou para um ano é incorreto.',
 ['O prazo geral começa sempre no dia do crime? Não; no conhecimento da autoria.', 'A Lei 15.438 alterou todos os prazos para 12 meses? Não; criou hipótese específica.', 'O §2º permite exigir representação para crime incondicionado? Não.'], 'Decadência','Perda do direito de queixa ou representação pelo decurso do prazo legal.',[L15438,CP,MP])
add(39,'Representação pode ser pessoal ou por procurador com poderes especiais, escrita ou oral, perante juiz, MP ou polícia. O conteúdo e a manifestação válida importam; não é sinônimo de denúncia.',
 ['Declaração oral ou escrito sem assinatura autenticada é reduzido a termo conforme §1º.', '§2º: incluir dados úteis à apuração do fato e autoria.', '§§3º–4º: providências de investigação e encaminhamento à autoridade competente.', '§5º: elementos suficientes podem dispensar inquérito; denúncia no prazo de 15 dias nessa hipótese.'],
 'Não exigir sempre documento com fórmula sacramental nem considerar toda notícia automaticamente representação. Respeitar regime acusatório na atuação judicial.',
 'A vítima manifesta oralmente vontade de persecução ao MP, fornecendo dados: o ato é documentado e examinado quanto à validade.',
 'Documentos completos já habilitam ação: a indispensabilidade do inquérito não pode ser presumida.',
 ['Representação tem de ser exclusivamente escrita? Não; admite declaração oral reduzida a termo.', 'Elementos suficientes podem dispensar inquérito? Sim; §5º.'], 'Representação oral','Manifestação documentada da vontade de persecução em ação condicionada.')
add(40,'Ao encontrar possível crime de ação pública em autos ou papéis, o juiz ou tribunal remete ao MP as cópias e documentos necessários. Não oferece a denúncia no lugar do órgão acusador.',
 ['Remessa é comunicação institucional.', 'MP aprecia medidas cabíveis e suporte acusatório.', 'Estrutura acusatória preserva separação entre julgar e acusar.'],
 'O artigo não obriga denúncia nem autoriza juiz substituir investigação ou acusação.',
 'Em processo cível aparece documento indicativo de crime de ação pública: juiz envia cópias ao MP.',
 'O MP verifica ausência de justa causa: o envio não supre essa exigência.',
 ['O juiz denuncia com base no art. 40? Não; remete documentos ao MP.', 'A remessa prova automaticamente o crime? Não.'], 'Remessa de peças','Encaminhamento informativo para exame da acusação.',[CF])
add(41,'A acusação deve descrever fato criminoso e circunstâncias, identificar o acusado, classificar juridicamente o fato e apresentar testemunhas quando necessário. A defesa precisa compreender o que lhe é imputado.',
 ['Identificação pode ocorrer por esclarecimentos suficientes, não só qualificação completa.', 'Fato e circunstâncias são centrais; mera cópia do nome do crime não basta.', 'CPP 395: inépcia, falta de pressuposto/condição e falta de justa causa têm consequências próprias.'],
 'Não exigir rol de testemunhas em toda acusação; o texto diz quando necessário. Erro de classificação não é sempre inépcia se o fato está adequadamente narrado.',
 'Denúncia indica conduta, lugar, data possível, participação e circunstâncias, permitindo identificar o acusado e exercer defesa.',
 'Peça apenas diz que o réu cometeu determinado crime, sem narrativa individualizável: examinar inépcia e defesa.',
 ['Rol de testemunhas é obrigatório sem exceção? Não; quando necessário.', 'Só o nome do crime substitui a exposição do fato? Não.'], 'Imputação','Descrição do fato atribuído ao acusado, base para contraditório e defesa.')
add(42,'O MP não pode desistir da ação pública proposta. Indisponibilidade da ação não exige pedir condenação sem prova nem impede os mecanismos legais de consenso.',
 ['Desistência da ação é diferente de pedido de absolvição.', 'Acordos dependem de previsão e requisitos próprios.', 'Questões de mérito seguem prova, contraditório e regime processual.'],
 'Não ensinar que indisponibilidade obriga acusação a defender condenação a qualquer custo. Desistência do recurso possui disciplina no art. 576.',
 'Após instrução, MP entende inexistir prova suficiente e pede absolvição: não se trata de retirar unilateralmente a ação.',
 'MP solicita simples desistência da ação proposta por conveniência, sem instituto legal aplicável: art. 42 impede.',
 ['Pedir absolvição equivale sempre a desistir da ação? Não.', 'Art. 42 permite desistência livre por conveniência? Não.'], 'Indisponibilidade','Vedação de retirada discricionária da ação pública proposta.')
add(44,'Advogado que apresenta queixa por mandato precisa de poderes especiais. O instrumento deve mencionar o nome do querelante e o fato criminoso, ressalvadas diligências prévias necessárias.',
 ['Procuração geral para o foro não substitui poderes especiais exigidos.', 'Identificar outorgante e fato delimita autorização.', 'A exceção depende de esclarecimentos que exigem diligências previamente requeridas.'],
 'Não trocar querelante por querelado na reprodução do requisito literal. Regularização e decadência demandam exame próprio do caso e jurisprudência.',
 'Ofendido outorga mandato com poderes de queixa e descrição do episódio; advogado pode propor a ação dentro dos requisitos.',
 'Procuração genérica sem autorização específica exige examinar vício e possibilidade de saneamento, sem presumir validade automática.',
 ['Procuração geral é sempre suficiente para queixa? Não; exige poderes especiais.', 'O requisito literal menciona o nome do querelante? Sim.'], 'Poderes especiais','Autorização expressa para ato que não se presume no mandato geral.')
add(45,'O MP pode aditar a queixa e intervém nos termos subsequentes do processo, mesmo em ação privada. A atuação preserva limites da titularidade e o regime da ação.',
 ['Intervenção fiscaliza regularidade e indivisibilidade.', 'Ação privada comum não é automaticamente convertida em pública.', 'Ação subsidiária possui poderes mais amplos expressos no art. 29.'],
 'Não equiparar qualquer aditamento à substituição do titular da ação privada comum. Delimitar fato, legitimidade e modalidade.',
 'MP acompanha queixa privada e aponta necessidade de correção pertinente à atuação legal.',
 'Na subsidiária, pode repudiar a queixa e oferecer denúncia substitutiva conforme art. 29; distinguir os regimes.',
 ['MP fica inteiramente excluído de ação privada? Não.', 'Toda queixa vira ação pública pela intervenção? Não.'], 'Aditamento','Complementação ou correção da peça nos limites legais.')
add(46,'Regra geral: MP oferece denúncia em cinco dias com acusado preso e quinze com solto ou afiançado, a partir do recebimento dos autos. Leis especiais podem prever prazos próprios.',
 ['Retorno de inquérito do solto após diligências faz contar do novo recebimento nos termos do caput.', '§1º: dispensado inquérito, contar do recebimento de peças informativas ou representação.', '§2º: aditamento da queixa em três dias; silêncio nesse prazo indica não ter o que aditar.'],
 'Não contar da prisão, da chegada à delegacia ou do conhecimento da vítima. Cinco/quinze são prazos gerais, não universais de toda lei especial.',
 'MP recebe autos de investigado preso: o prazo geral para denúncia é de cinco dias desse recebimento.',
 'Sem inquérito, recebe peças suficientes relativas a acusado solto: observar marco do §1º e prazo geral de quinze dias.',
 ['O prazo geral do preso começa automaticamente no flagrante? Não; no recebimento dos autos pelo MP.', 'O prazo de aditamento da queixa é quinze dias? Não; três dias.'], 'Prazo para denúncia','Lapso acusatório geral contado do recebimento da informação pertinente.')
add(47,'O MP requisita diretamente a autoridades e funcionários os esclarecimentos, documentos e elementos complementares necessários, quando possam ou devam fornecê-los.',
 ['Requisição é dirigida a quem tem atribuição ou possibilidade de fornecer.', 'Complementação não depende sempre de retorno integral do inquérito.', 'Necessidade de informação não afasta sigilo protegido e reserva judicial.'],
 'Não transformar poder de requisitar em autorização geral para interceptar comunicações ou obter qualquer dado sem requisitos próprios.',
 'Documento administrativo indispensável à compreensão do fato é requisitado ao órgão que o mantém.',
 'Conteúdo de comunicação protegido exige observar a legislação e autorização judicial aplicáveis.',
 ['Toda complementação exige devolver o inquérito? Não; há requisição direta.', 'A requisição afasta toda reserva de jurisdição? Não.'], 'Requisição complementar','Solicitação institucional obrigatória dentro das atribuições e limites legais.',[CF])
add(48,'A ação privada segue indivisibilidade: queixa contra um autor conhecido impõe considerar todos os demais autores do mesmo crime; o MP fiscaliza a regra.',
 ['Não escolher seletivamente quem perseguir entre autores conhecidos sem consequência.', 'Autoria ainda desconhecida não equivale automaticamente a renúncia voluntária.', 'Arts. 49 e 51 disciplinam extensão de renúncia e perdão.'],
 'Separar indivisibilidade privada de titularidade pública. Identificação, ciência e conduta do querelante precisam de exame concreto.',
 'Ofendido conhece dois coautores do mesmo episódio e exclui deliberadamente um da queixa: examinar indivisibilidade e efeitos da renúncia.',
 'Segundo autor ainda não era identificado; não presumir escolha voluntária só pela descoberta posterior.',
 ['Queixa privada permite escolher livremente entre coautores conhecidos? Não.', 'Desconhecimento de outro autor é sempre renúncia? Não; analisar os fatos.'], 'Indivisibilidade','Regra que impede seleção indevida entre autores na ação privada.')
add(49,'Renúncia ao direito de queixa em favor de um dos autores estende-se aos demais, pela indivisibilidade. Renúncia acontece antes do exercício do direito de queixa.',
 ['Renúncia é unilateral; não depende de aceitação.', 'Expressa ou tácita conforme regime do CP/CPP.', 'Após iniciar a ação, diferenciar perdão e perempção.'],
 'Renúncia à queixa não é a mesma figura que retratação de representação na ação pública condicionada.',
 'Antes de propor queixa, ofendido renuncia ao direito quanto a um coautor conhecido: o efeito alcança os demais.',
 'Depois da queixa, manifestação de perdão exige observar aceitação e regras próprias.',
 ['Renúncia exige concordância do beneficiado? Não; é unilateral.', 'Renúncia a um coautor fica restrita a ele? Não; estende-se aos outros.'], 'Renúncia à queixa','Abandono unilateral do direito antes de seu exercício.',[CP])
add(50,'Renúncia expressa exige declaração assinada pelo legitimado ou procurador com poderes especiais. O parágrafo sobre direitos paralelos após 18 anos integra o antigo regime etário.',
 ['Caput: assinatura e poderes específicos quando há procurador.', 'CC art. 5º fixa maioridade aos 18.', 'Não manter representação etária automática até 21 nem tratar renúncia como perdão bilateral.'],
 'O parágrafo único deve ser qualificado como historicamente superado quanto à antiga maioridade. Situações especiais de representação têm fundamento próprio.',
 'Adulto capaz assina renúncia expressa antes de apresentar queixa: há manifestação unilateral documentada.',
 'Seu pai não mantém direito paralelo apenas porque o adulto tem 19 anos.',
 ['Renúncia expressa dispensa declaração assinada? Não.', 'A antiga faixa 18–21 cria atualmente dois titulares por idade? Não.'], 'Renúncia expressa','Manifestação escrita e assinada de abandono do direito de queixa.',[CC,CP])
add(51,'Perdão a um querelado beneficia os demais, mas não produz efeito em relação a quem o recusa. Ao contrário da renúncia, depende de aceitação.',
 ['Concedido após exercício da ação privada.', 'Extensão preserva indivisibilidade.', 'Recusa individual impede efeito favorável para o recusante.'],
 'Não usar perdão como causa automática de extinção em ação pública nem ignorar quem expressamente recusa.',
 'Dois querelados recebem perdão; um aceita e o outro recusa. Examinar extinção para o aceitante, mantendo distinção do recusante.',
 'Antes da queixa, abandono unilateral do direito é renúncia; não pedir aceitação como requisito dela.',
 ['Perdão produz efeito para quem recusa? Não.', 'Renúncia e perdão possuem a mesma necessidade de aceitação? Não.'], 'Perdão do ofendido','Desistência do prosseguimento privado que depende de aceitação.',[CP])
add(52,'O dispositivo descreve perdão na antiga faixa de 18 a 21 anos. Com maioridade civil aos 18, não existe representação etária paralela automática fundada apenas nessa faixa.',
 ['Integrar CC art. 5º.', 'Capacidade e salvaguardas específicas precisam de fundamento distinto.', 'Aceitação do querelado permanece requisito do perdão.'],
 'Não ensinar oposição dos pais como veto etário geral ao perdão de adulto capaz.',
 'Querelante capaz de 20 anos concede perdão; a idade sozinha não dá aos pais poder de impedir sua manifestação.',
 'Querelante menor de 18 demanda análise própria de representação, distinta da regra histórica.',
 ['Pai tem veto automático só porque querelante tem 20 anos? Não.', 'Maioridade atual é 21 anos? Não; 18.'], 'Regime etário histórico','Antiga maioridade que não deve ser apresentada como direito atual.',[CC])
add(53,'Curador nomeado pelo juiz pode aceitar o perdão quando falta representante ou existe conflito na hipótese legal. A redação antiga sobre deficiência deve ser integrada ao regime atual de capacidade.',
 ['Proteção da manifestação do querelado, não punição por condição pessoal.', 'Ausência de representante ou conflito são relevantes.', 'Deficiência não presume incapacidade; Lei 13.146 e Código Civil exigem análise adequada.'],
 'Não reproduzir vocabulário discriminatório como categoria pedagógica atual nem retirar capacidade automaticamente por diagnóstico.',
 'Há necessidade legal de representação e conflito com representante: juiz examina curadoria específica para eventual aceitação.',
 'Adulto com deficiência capaz de manifestar vontade não é substituído automaticamente por curador.',
 ['Conflito de interesses pode exigir curador? Sim, na hipótese legal.', 'Toda deficiência torna inválida aceitação pessoal? Não.'], 'Aceitação protegida','Manifestação acompanhada da representação adequada quando legalmente necessária.',[CC,'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm'])
add(54,'O art. 54 remete ao art. 52 para aceitação por menor de 21. A remissão tem de ser lida com maioridade aos 18: não criar incapacidade automática do adulto de 18 a 20.',
 ['Menoridade atual não se estende até 21.', 'Aceitação do perdão é distinta de sua concessão.', 'Representação de menor de 18 ou salvaguarda específica precisa ser examinada em seu regime.'],
 'A antiga faixa etária não pode ser usada como resposta atual em exercício literal sem ressalva.',
 'Querelado capaz de 19 anos aceita perdão por manifestação válida: não exigir representante apenas por ter menos de 21.',
 'Se é menor de 18, avaliar proteção e representação aplicáveis em vez de ignorar a idade.',
 ['Adulto de 19 precisa de representante só por idade? Não.', 'Art. 54 trata de concessão pelo querelante? Não; de aceitação pelo querelado.'], 'Aceitação do perdão','Concordância do querelado com a manifestação do ofendido.',[CC])
add(55,'A aceitação do perdão pode ser realizada por procurador, desde que possua poderes especiais. Mandato genérico não substitui autorização para esse ato.',
 ['Distinguir quem concede e quem aceita.', 'Poderes especiais precisam abranger aceitação.', 'Recusa ou ausência de aceitação seguem regras próprias.'],
 'A exigência é para atuação por procurador, não proibição da manifestação pessoal válida.',
 'Querelado autoriza especificamente advogado a aceitar o perdão, que documenta essa aceitação.',
 'Advogado com mandato genérico não presume autorização especial.',
 ['Pode haver aceitação por procurador? Sim, com poderes especiais.', 'Mandato geral basta automaticamente? Não.'], 'Mandato especial','Autorização delimitada para aceitação de perdão.')
add(56,'Perdão expresso concedido fora dos autos segue a forma documentada do art. 50: declaração assinada pelo legitimado ou procurador com poderes especiais, integrada à capacidade atual.',
 ['Extraprocessual é fora dos autos, não necessariamente antes da ação.', 'Perdão continua sujeito à aceitação.', 'Remissão ao art. 50 não reativa a antiga maioridade.'],
 'Não confundir o local da declaração com o momento jurídico de renúncia ou perdão.',
 'Após a queixa, ofendido assina documento de perdão fora dos autos; apresentar e verificar aceitação válida.',
 'Antes de exercer direito de queixa, abandono do direito é renúncia, ainda que feito por documento semelhante.',
 ['Perdão fora dos autos dispensa aceitação? Não.', 'Extraprocessual significa sempre anterior à queixa? Não.'], 'Perdão extraprocessual','Manifestação de perdão documentada fora dos autos.')
add(57,'Renúncia tácita e perdão tácito podem ser demonstrados por todos os meios de prova admitidos. O comportamento precisa revelar a manifestação juridicamente pertinente.',
 ['Renúncia ocorre antes da queixa; perdão pressupõe exercício da ação.', 'Não há prova documental única obrigatória para a forma tácita.', 'CP art. 104: receber indenização, por si, não implica renúncia tácita.'],
 'Não presumir abandono penal só porque houve reparação civil. Permissão de meios de prova não afasta proibição de prova ilícita.',
 'Conduta incompatível com intenção de exercer a queixa é comprovada por elementos lícitos e apreciada concretamente.',
 'Recebimento de indenização, isoladamente, não prova renúncia ao direito penal.',
 ['Forma tácita só pode ser provada por documento? Não.', 'Indenização recebida significa sempre renúncia? Não; CP 104.'], 'Manifestação tácita','Vontade inferida de comportamento juridicamente significativo.',[CP,CF])
add(58,'Perdão expressamente concedido nos autos exige intimar o querelado para dizer em três dias se aceita, com advertência de que silêncio significa aceitação. Aceito, extingue-se a punibilidade.',
 ['Prazo: três dias.', 'Intimação deve cientificar o efeito do silêncio.', 'Recusa expressa impede o efeito para o recusante.'],
 'Silêncio não é aceitação universal em qualquer ato: aqui depende do procedimento e advertência específicos.',
 'Querelado intimado com a advertência permanece em silêncio durante os três dias: aplica-se aceitação prevista no artigo.',
 'Se manifesta recusa, não declarar extinção para ele só porque outro querelado aceitou.',
 ['O prazo do art. 58 é cinco dias? Não; três.', 'O efeito do silêncio deve ser informado na intimação? Sim.'], 'Aceitação pelo silêncio','Efeito específico após intimação advertida e decurso do prazo.')
add(59,'A aceitação do perdão fora do processo deve constar de declaração assinada pelo querelado, representante habilitado ou procurador com poderes especiais.',
 ['Documento expressa aceitação, não só concessão.', 'Poderes e capacidade precisam estar adequados.', 'Levar a declaração aos autos permite examinar a extinção.'],
 'Não presumir que assinatura apenas do ofendido documenta aceitação do querelado.',
 'Querelado assina declaração aceitando o perdão, apresentada ao processo para apreciação.',
 'Documento só com concessão do querelante deixa pendente a aceitação válida.',
 ['Quem assina a aceitação é necessariamente só o ofendido? Não; o querelado ou habilitado.', 'Procurador precisa de poderes especiais? Sim.'], 'Declaração de aceitação','Documento que registra concordância com o perdão.')
add(60,'Perempção extingue a punibilidade em ação exclusivamente privada por hipóteses legais de abandono ou falta de continuidade. Não se confunde com decadência anterior à ação.',
 ['I: querelante deixa de promover andamento por 30 dias seguidos.', 'II: morte/incapacidade sem sucessor comparecer em 60 dias, ressalvado art. 36.', 'III: ausência injustificada a ato em que deva estar presente ou falta de pedido de condenação nas alegações finais.', 'IV: extinção da pessoa jurídica sem sucessor.', 'Subsidiária da pública: MP pode retomar diante de negligência pelo art. 29.'],
 'Não atribuir abandono ao querelante por demora do próprio órgão judicial. Distinguir 30 dias de inércia e 60 para sucessão.',
 'Querelante, responsável por impulso exigível, deixa de promover andamento por 30 dias seguidos: examinar perempção no regime privado.',
 'Na subsidiária, negligência permite retomada pelo MP; não aplicar automaticamente extinção da pública.',
 ['Perempção é o mesmo que não oferecer queixa em seis meses? Não; isso é decadência.', 'Sucessão após morte tem prazo de 30 dias no inciso II? Não; 60.', 'Não pedir condenação nas alegações finais pode gerar perempção? Sim; inciso III.'], 'Perempção','Consequência legal de abandono ou falta de continuidade na ação exclusivamente privada.')
add(61,'O juiz declara de ofício a extinção da punibilidade quando a reconhece, em qualquer fase. Pedido de parte admite autuação separada, oitiva contrária e prova quando conveniente.',
 ['Reconhecimento não depende necessariamente de requerimento.', 'Se concedida prova no incidente, prazo de cinco dias.', 'Decisão em cinco dias ou apreciação na sentença final conforme parágrafo.'],
 'De ofício não significa sem exame dos pressupostos ou sem contraditório pertinente. Extinção não é automaticamente absolvição de mérito.',
 'Os autos comprovam causa extintiva da punibilidade; juiz a reconhece mesmo sem pedido específico.',
 'Se há controvérsia fática em requerimento, ouvir a outra parte e examinar prova antes de concluir.',
 ['Juiz só pode reconhecer extinção se a defesa pedir? Não.', 'Prazo de prova facultado no parágrafo é dez dias? Não; cinco.'], 'Extinção da punibilidade','Impossibilidade jurídica de aplicar sanção penal por causa legal.')
add(62,'Morte do acusado extingue a punibilidade, mas exige certidão de óbito e oitiva do MP para a declaração prevista no CPP. Informação informal não basta.',
 ['Certidão é requisito probatório expresso.', 'MP deve ser ouvido.', 'Responsabilidade penal não passa aos familiares.'],
 'Diferenciar morte do acusado de morte do ofendido: esta pode permitir sucessão do direito de queixa, aquela não gera réu substituto familiar.',
 'Defesa apresenta certidão de óbito do acusado; após ouvir MP, juiz examina e declara extinção.',
 'Relato verbal de falecimento sem certidão não satisfaz o requisito expresso do art. 62.',
 ['Mera notícia de morte basta pelo art. 62? Não; exige certidão.', 'Herdeiros respondem penalmente no lugar do falecido? Não.'], 'Certidão de óbito','Documento exigido para provar morte e examinar extinção penal.',[CF,CP])
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'explicit action-penal units authored')
