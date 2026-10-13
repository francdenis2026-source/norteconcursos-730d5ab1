"""Article-specific civil effects and jurisdiction with constitutional integrations."""
import json,sys
from pathlib import Path
CPP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'
CF='https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
CP='https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'
CC='https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm'
FORO='https://portal.stf.jus.br/processos/detalhe.asp?incidente=6742436'
FORONEWS='https://noticias.stf.jus.br/postsnoticias/acoes-contra-autoridades-permanecem-no-stf-mesmo-apos-saida-do-cargo/'
rows={}
def add(n,s,p,a,c,v,q,t,d,links=()):
 rows['art-'+str(n)]=dict(simples=s,pontos=p,atencao=[a],exemplo=c+' Variação: '+v,prova=q,termos=[dict(termo=t,significado=d)],remissoes=[CPP,*links])
add(63,'Condenação penal transitada em julgado permite executar reparação no juízo cível por ofendido, representante ou herdeiros. O mínimo fixado na sentença não elimina liquidação do dano efetivamente sofrido.',
 ['Exige trânsito da sentença condenatória para execução pelo título penal.', 'Art. 387, IV: valor mínimo reparatório; observar requisitos e contraditório na fixação.', 'Liquidação complementar permite apurar dano além do mínimo, sem duplicar indenização.'],
 'Não confundir pena de multa, prestação ao Estado e reparação devida à vítima. Condenação sem valor determinado pode exigir liquidação.',
 'Sentença definitiva fixa mínimo reparatório de R$ 5 mil; vítima executa esse valor e pode demonstrar dano adicional pela via adequada.',
 'Sem condenação definitiva, não usar CPP 63 como título penal já formado; eventual ação civil autônoma tem disciplina própria.',
 ['O mínimo impede apurar dano efetivo maior? Não.', 'Herdeiros podem promover execução da reparação? Sim; estão no caput.'], 'Ação civil ex delicto','Reparação civil decorrente de fato criminoso.',[CC])
add(64,'A reparação pode ser buscada por ação civil autônoma contra autor do crime e, quando cabível, responsável civil, independentemente da execução de sentença penal definitiva.',
 ['Responsável civil não precisa ser réu penal, mas sua responsabilidade exige fundamento.', 'Ação penal instaurada permite ao juiz cível suspender a ação civil até julgamento definitivo.', 'Suspensão pelo parágrafo é faculdade, não automatismo universal.'],
 'Não exigir condenação penal prévia para toda reparação. Responsabilidade de terceiro não decorre só de parentesco.',
 'Vítima propõe reparação enquanto se apura o delito; juiz cível avalia a suspensão diante da ação penal.',
 'A inclusão de terceiro depende de responsabilidade civil própria e defesa; não basta chamá-lo de familiar do autor.',
 ['A ação civil autônoma exige sempre condenação penal transitada? Não.', 'O parágrafo manda suspender obrigatoriamente todo processo civil? Não; poderá.'], 'Responsável civil','Pessoa obrigada à reparação por fundamento civil, ainda que não seja autora penal.',[CC])
add(65,'A decisão penal definitiva que reconhece uma excludente de ilicitude vincula a esfera civil quanto a esse reconhecimento. A consequência indenizatória ainda depende das regras civis aplicáveis.',
 ['Hipóteses: necessidade, legítima defesa, estrito cumprimento do dever e exercício regular de direito.', 'CC 929–930: necessidade pode preservar reparação ao terceiro inocente e regresso nos termos legais.', 'ADPF 779: legítima defesa da honra não integra legítima defesa e não justifica violência contra mulher.'],
 'Não concluir que toda excludente elimina qualquer indenização, especialmente a pessoa inocente atingida. A tese da honra foi afastada pelo STF.',
 'Sentença reconhece estado de necessidade ao sacrificar bem de terceiro inocente; o reconhecimento penal não elimina automaticamente seu direito civil previsto em lei.',
 'Agressor alega honra para justificar violência contra mulher: essa tese não é legítima defesa admitida pela ADPF 779.',
 ['Necessidade afasta sempre reparação a terceiro inocente? Não; observar CC 929–930.', 'Honra legitima violência contra mulher? Não; ADPF 779.'], 'Coisa julgada penal no cível','Vinculação civil aos pontos penalmente decididos nos limites legais.',[CC,'https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=511556&ori=1.'])
add(66,'Absolvição criminal não impede toda ação civil. Quando a inexistência material do fato foi categoricamente reconhecida, essa conclusão não pode ser ignorada na reparação fundada no mesmo fato.',
 ['Absolvição por insuficiência de prova tem efeito distinto de inexistência comprovada.', 'CC 935 também trata de existência do fato e autoria decididas criminalmente.', 'Analisar fundamento da decisão, não apenas o resultado absolvido.'],
 'Não afirmar que qualquer absolvição permite indenização nem que qualquer absolvição a proíbe.',
 'Absolvição por falta de prova suficiente deixa aberta análise civil dentro de seus requisitos.',
 'Sentença categoricamente afirma que o fato nunca existiu: não usar ação civil para presumir o mesmo fato existente.',
 ['Absolvição por falta de prova sempre elimina ação civil? Não.', 'Reconhecimento categórico da inexistência do fato é irrelevante ao cível? Não.'], 'Fundamento absolutório','Razão da absolvição que define seus efeitos extrapenais.',[CC])
add(67,'Arquivamento investigativo, extinção da punibilidade ou absolvição por fato não constituir crime não impedem, por si, a ação civil reparatória.',
 ['Arquivamento não é sentença civil de inexistência do dano.', 'Extinção da punibilidade não elimina automaticamente obrigação civil.', 'Fato atípico penalmente pode ser ilícito civil.'],
 'A lista não assegura indenização automática: dano, nexo e fundamento civil precisam ser comprovados.',
 'Fato não preenche tipo penal, mas pode violar dever civil e causar dano demonstrado; avaliar reparação própria.',
 'Sem dano e sem fundamento de responsabilidade, ausência de obstáculo penal não cria indenização.',
 ['Atipicidade penal exclui sempre ilícito civil? Não.', 'Prescrição penal determina automaticamente prescrição civil? Não; são regimes distintos.'], 'Independência relativa','Separação entre esferas com pontos de vinculação legal.',[CC])
add(68,'A redação atribui ao MP reparação em favor de pessoa pobre a pedido. Sua aplicação atual depende da organização da Defensoria Pública e da interpretação de inconstitucionalidade progressiva.',
 ['CF 134: assistência jurídica é função da Defensoria.', 'STJ: legitimidade substitutiva do MP subsiste excepcionalmente onde Defensoria não estiver organizada.', 'Informativo 592: antes de extinguir por ilegitimidade do MP no caso tratado, intimar Defensoria para ciência e possível assunção.'],
 'Não apresentar MP como advogado civil universal de qualquer pessoa pobre, nem declarar a regra extinta em todo lugar sem analisar a estrutura institucional.',
 'Defensoria organizada é cientificada de ação ajuizada pelo MP em favor de necessitados para avaliar assunção do polo ativo conforme precedente.',
 'Local sem Defensoria organizada exige examinar a legitimidade residual reconhecida, não presumir estrutura existente.',
 ['O caput pode ser aplicado isoladamente em toda localidade? Não.', 'A Defensoria pode precisar ser intimada antes da extinção pela ilegitimidade? Sim; no regime do precedente.'], 'Inconstitucionalidade progressiva','Transição de atribuição vinculada à efetiva organização institucional.',[CF,'https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisarumaedicao&livre=%270592%27.cod.'])
add(69,'Competência indica qual órgão julga, por critérios territoriais, materiais e funcionais. A enumeração do CPP deve ser integrada às competências da Constituição.',
 ['Lugar da infração; domicílio/residência; natureza; distribuição.', 'Conexão/continência; prevenção; prerrogativa de função.', 'Constituição precede a aplicação das regras de reunião e preferência do CPP.'],
 'Não escolher o juiz apenas pela proximidade da delegacia ou residência da vítima sem hipótese legal.',
 'Primeiro identificar justiça e órgão constitucionalmente competentes, depois aplicar o critério territorial pertinente.',
 'Prerrogativa constitucional pode exigir tribunal; a regra territorial sozinha não a afasta.',
 ['Local da delegacia determina sempre competência? Não.', 'A lista do CPP dispensa consultar Constituição? Não.'], 'Competência','Delimitação legal da atribuição jurisdicional.',[CF])
add(70,'Regra territorial: lugar da consumação; na tentativa, último ato de execução. Existem regras específicas para fatos transfronteiriços, limites incertos e certas modalidades de estelionato.',
 ['§1º: execução iniciada no Brasil e consumação fora, último ato brasileiro.', '§2º: último ato fora, lugar onde no Brasil produziu ou deveria produzir resultado parcial.', '§3º: divisa/jurisdição incerta, prevenção.', '§4º, Lei 14.155/2021: estelionato mediante depósito, cheques indicados ou transferência, domicílio da vítima; várias vítimas, prevenção.'],
 'Não confundir teoria do lugar do crime no CP com regra processual do CPP. §4º não é regra para qualquer delito nem toda modalidade de fraude.',
 'Estelionato por transferência de valores na hipótese do §4º: competência pelo domicílio da vítima, não automaticamente conta do autor.',
 'Tentativa comum fora dessa exceção: identificar onde ocorreu último ato de execução.',
 ['Tentativa segue sempre residência da vítima? Não; regra do último ato.', 'Pluralidade de vítimas na hipótese do §4º leva à prevenção? Sim.'], 'Competência territorial','Foro definido por vínculo espacial previsto na legislação.')
add(71,'Crime permanente ou continuado que abrange duas ou mais jurisdições define competência pela prevenção entre juízos competentes.',
 ['Permanente: consumação se prolonga; continuado: pluralidade de condutas nos requisitos materiais.', 'Abrangência em mais de uma jurisdição é relevante.', 'Não confundir com qualquer crime instantâneo investigado em cidades diferentes.'],
 'O CPP 71 trata de competência; o CP 71 trata de crime continuado e pena. Mesmo número não significa mesmo tema.',
 'Crime permanente desenvolve-se em duas jurisdições; examinar prevenção por ato pertinente.',
 'Crime instantâneo em local conhecido não muda de foro só porque testemunhas moram em outro local.',
 ['CPP 71 é regra de aumento de pena? Não; de competência.', 'Permanente e continuado são idênticos? Não.'], 'Prevenção','Fixação entre órgãos competentes por antecedência de ato relevante.',[CP])
add(72,'Quando o lugar da infração é desconhecido, usa-se domicílio ou residência do réu. Residências múltiplas levam à prevenção; sem residência certa ou paradeiro conhecido, primeiro juízo que conhecer o fato.',
 ['Critério é subsidiário ao lugar conhecido.', '§1º: mais de uma residência, prevenção.', '§2º: sem residência certa/paradeiro ignorado, primeiro conhecimento.'],
 'Desconhecimento do local do crime não é o mesmo que desconhecimento do endereço do réu.',
 'Local do fato não é identificado, mas o acusado tem residência certa: aplica-se o critério subsidiário.',
 'Se também não há residência certa nem paradeiro conhecido, observar o §2º.',
 ['Usar residência exige necessariamente desconhecer o lugar da infração? Sim, nesta regra.', 'Múltiplas residências levam sempre à escolha livre da vítima? Não; prevenção.'], 'Foro subsidiário','Critério territorial usado quando o principal não é conhecido.')
add(73,'Em ação exclusivamente privada, o querelante pode preferir o foro do domicílio ou residência do réu mesmo conhecendo o lugar do crime.',
 ['Faculdade específica do querelante.', 'Exige modalidade exclusivamente privada.', 'Não estender automaticamente à ação privada subsidiária da pública.'],
 'A eleição legal não é escolha de qualquer cidade; fica restrita aos foros indicados.',
 'Ofendido em ação exclusivamente privada prefere a residência do querelado ao lugar conhecido da infração.',
 'Na ação pública, vítima não escolhe esse foro só por preferência.',
 ['A faculdade vale para qualquer ação penal? Não.', 'Conhecer o lugar do fato impede a preferência na privada exclusiva? Não.'], 'Foro facultativo privado','Opção territorial expressa para ação exclusivamente privada.')
add(74,'Competência pela natureza depende de organização judiciária e Constituição, incluindo o Júri para crimes dolosos contra a vida. A lista antiga do §1º não esgota tipos atuais.',
 ['CF 5º, XXXVIII: Júri e garantias constitucionais.', 'Lei 14.994/2024 criou feminicídio autônomo no CP 121-A; não excluí-lo por não constar da enumeração de 1948.', 'Atual art. 122 do CP e seus resultados/hipóteses exigem leitura própria, não antiga remissão ao parágrafo único.', 'Desclassificação tem efeitos próprios; referências antigas do §3º devem ser integradas aos atuais arts. 419 e 492.'],
 'Lei 15.358/2026 introduziu ressalva no art. 78, I, com controvérsia constitucional nas ADIs 7952, 7956, 7957 e 7958. Não ensinar exclusão indiscriminada do Júri ou decisão final dessas ações sem consulta.',
 'Acusação de feminicídio atual exige considerar CP 121-A e competência constitucional, mesmo fora da antiga lista literal.',
 'Infração culposa contra a vida não é incluída só por envolver morte; natureza e requisitos são decisivos.',
 ['A lista de 1948 prova que feminicídio autônomo está fora do Júri? Não.', 'Todo crime com resultado morte é necessariamente doloso contra a vida? Não.'], 'Competência material','Atribuição pelo tipo/natureza da infração.',[CF,CP,'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15358.htm'])
add(75,'Entre juízes igualmente competentes na mesma circunscrição, a precedência da distribuição fixa competência. Atos anteriores podem prevenir, observada a separação atual das funções judiciais.',
 ['Distribuição organiza órgãos igualmente habilitados.', 'Parágrafo cita fiança, preventiva e diligência anterior à acusação.', 'CPP 3º-B/3º-C e organização do juiz das garantias exigem integrar o regime atual.'],
 'Não ensinar que toda atuação investigativa faz o juiz necessariamente julgar o mérito, ignorando juiz das garantias e suas exceções.',
 'A ação é distribuída entre varas igualmente competentes segundo regras objetivas do tribunal.',
 'Medida investigativa é examinada por juiz das garantias; verificar a divisão vigente antes de concluir prevenção para julgamento.',
 ['Distribuição permite escolher juiz por preferência pessoal? Não.', 'O parágrafo elimina o juiz das garantias? Não.'], 'Distribuição','Designação impessoal de processos entre órgãos habilitados.',[CF])
add(76,'Conexão liga infrações por pessoas, finalidade ou influência probatória. Pode fundamentar reunião quando não houver separação legal obrigatória ou facultativa.',
 ['I: simultaneidade/grupo, concurso em tempos/lugares diversos, reciprocidade.', 'II: facilitar, ocultar, obter impunidade ou vantagem de outra infração.', 'III: prova de um fato influencia prova de outro.'],
 'Conexão não significa qualquer semelhança de crimes nem supera automaticamente competência constitucional.',
 'Fraude é praticada para ocultar outro delito: examinar conexão finalística do inciso II.',
 'Dois crimes semelhantes sem vínculo pessoal, finalístico ou probatório não se conectam só pelo nome do tipo.',
 ['Influência de prova de um crime em outro pode gerar conexão? Sim.', 'Mesmo nome do delito basta sempre? Não.'], 'Conexão','Vínculo entre infrações relevante à competência e reunião.')
add(77,'Continência ocorre quando várias pessoas são acusadas da mesma infração e nas hipóteses de unidade previstas pela remissão penal. As numerações antigas do CP exigem atualização interpretativa.',
 ['Inciso I: pluralidade de acusados, mesma infração.', 'Inciso II: integrar atuais CP 70, 73 e 74, em vez de copiar números anteriores à reforma de 1984.', 'Conexão e continência não são sinônimos, embora possam reunir processos.'],
 'O CP 51 atual trata da multa; a remissão histórica não faz da multa a causa atual da continência.',
 'Dois coautores são acusados do mesmo furto: há continência por cumulação subjetiva.',
 'Infrações distintas podem ter conexão sem serem o mesmo fato compartilhado.',
 ['Duas pessoas acusadas da mesma infração enquadram-se no inciso I? Sim.', 'Deve-se ler a remissão ao antigo CP 51 como regra atual da multa? Não.'], 'Continência','Unidade relevante entre acusados ou imputações nas hipóteses legais.',[CP])
add(78,'Na reunião por conexão ou continência, critérios de prevalência orientam o órgão competente, sempre integrados às ressalvas legais e constitucionais.',
 ['I: texto atual prioriza Júri frente a outro órgão comum, com ressalva de 2026 para homicídios/tentativas na hipótese especial indicada.', 'II: mesma categoria, pena mais grave; penas iguais, maior número de infrações; demais casos, prevenção.', 'III: categorias diversas, órgão de maior graduação.', 'IV: jurisdição especial prevalece em concurso com comum, ressalvadas separações constitucionais/legais; art. 79 preserva comum e militar.'],
 'Atualização: Lei 15.358/2026 acrescentou ressalva ao inciso I. STF abriu audiência nas ADIs 7952/7956/7957/7958 em agosto de 2026; audiência não é julgamento nem validação definitiva. Este conteúdo não certifica ausência de cautelares posteriores nem retirada universal do Júri.',
 'Dois delitos conexos de mesma categoria possuem penas de gravidade diferente: examinar prevalência do lugar do delito mais grave.',
 'No recorte novo de homicídio ligado a organização ultraviolenta, conferir requisitos legais e situação das ADIs; não usar a simples palavra facção para mudar qualquer competência.',
 ['Penas iguais fazem prevalecer sempre o local do primeiro fato? Não; considerar maior número e depois prevenção.', 'Audiência pública resolve constitucionalidade definitivamente? Não.'], 'Prevalência jurisdicional','Critério de escolha na reunião de competências.',[CF,'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15358.htm','https://noticias.stf.jus.br/postsnoticias/stf-retoma-debates-sobre-a-lei-antifaccao/'])
add(79,'Conexão e continência geralmente reúnem processo e julgamento, mas há separações expressas, especialmente entre justiça comum e militar e entre adulto e adolescente.',
 ['Menores: integrar ECA e sistema próprio, não antigo modelo penal de menores.', '§1º: situação do art. 152 pode fazer cessar unidade.', '§2º: unidade processual não garante julgamento conjunto em toda hipótese.', 'Antiga remissão ao art. 461 não deve substituir exame do procedimento atual do Júri.'],
 'Não usar conexão para processar adolescente como adulto nem para reunificar órgãos com competências separadas.',
 'Adulto e adolescente participam do fato: procedimentos seguem seus sistemas próprios, apesar do vínculo fático.',
 'Caso envolvendo justiça militar e comum requer separação indicada, não atração automática de tudo pela especializada.',
 ['Adulto e adolescente seguem necessariamente o mesmo processo penal por conexão? Não.', 'Unidade de processo sempre implica julgamento único? Não.'], 'Separação obrigatória','Ruptura da reunião nas hipóteses expressas.',[CF,'https://www.planalto.gov.br/ccivil_03/leis/l8069.htm'])
add(80,'Juiz pode separar processos por diferença de tempo/lugar, excesso de acusados para evitar prolongar prisão provisória ou outro motivo relevante.',
 ['Separação é facultativa e exige razão concreta.', 'Protege duração razoável e organização adequada.', 'Não confundir com hipóteses obrigatórias do art. 79.'],
 'Faculdade não é escolha arbitrária sem fundamentação. Reunião conveniente não justifica prisão indefinida.',
 'Muitos acusados e agendas distintas prolongariam custódia; juiz fundamenta separação pertinente.',
 'Número reduzido e ausência de dificuldade não autorizam invocar excesso fictício sem motivação.',
 ['Só diferença de local permite separação? Não; há outras razões legais.', 'Separação é obrigatória em toda pluralidade de acusados? Não.'], 'Separação facultativa','Desmembramento motivado por conveniência processual relevante.',[CF])
add(81,'Após reunião regular, absolvição ou desclassificação do delito próprio geralmente não elimina competência para os outros. Júri tem ressalva específica antes do plenário.',
 ['Caput: manutenção após decisão sobre infração própria.', 'Parágrafo: juiz desclassifica, impronuncia ou absolve, excluindo Júri, e remete ao competente.', 'Distinguir decisão antes do plenário e desclassificação pelos jurados, regida pelo art. 492.'],
 'Não afirmar manutenção do Júri em qualquer fase após afastar crime doloso contra vida.',
 'Juiz exclui a competência do Júri na fase inicial por impronúncia e remete delito restante ao órgão competente.',
 'Se a desclassificação ocorre pelo Conselho de Sentença, examinar art. 492 e atuação do juiz presidente.',
 ['O parágrafo repete simplesmente a regra geral de manutenção? Não; traz ressalva do Júri.', 'Fase da desclassificação é irrelevante? Não.'], 'Perpetuação da competência','Manutenção após reunião, com exceções legais.')
add(82,'Processos separados apesar de vínculo podem ser avocados pela jurisdição prevalente, salvo existência de sentença definitiva; então eventual unidade é de soma ou unificação de penas.',
 ['Avocação busca corrigir fragmentação antes de sentença definitiva.', 'Não reunir processo já julgado só porque há conexão.', 'Súmula 235/STJ: conexão não determina reunião quando um já foi julgado.'],
 'Não confundir sentença definitiva com decisão interlocutória nem unificação de penas com novo julgamento conjunto.',
 'Um processo conexo já foi julgado; não impor reunião para reiniciar sua instrução.',
 'Antes de julgamento definitivo, órgão prevalente pode avocar observando competência e garantias.',
 ['Conexão exige sempre reunir processo já julgado? Não; Súmula 235.', 'Unificação de penas equivale a julgamento conjunto retroativo? Não.'], 'Avocação','Chamada de processo ao órgão de jurisdição prevalente.', ['https://scon.stj.jus.br/SCON/sumstj/toc.jsp?sumula=235.num.'])
add(83,'Prevenção fixa competência quando dois ou mais juízes são igualmente competentes ou possuem jurisdição cumulativa e um pratica antes ato processual ou medida pertinente, mesmo anterior à acusação.',
 ['Pressupõe concorrência de órgãos habilitados.', 'Antecedência do ato relevante não é preferência pessoal.', 'Integrar divisão entre garantias e instrução e regras objetivas do tribunal.'],
 'Juiz constitucionalmente incompetente não se torna competente só por agir primeiro. Não ignorar regime do juiz das garantias.',
 'Entre órgãos habilitados, o primeiro ato pertinente previne nos termos legais.',
 'Medida por órgão incompetente não afasta a regra constitucional correta.',
 ['Qualquer ato por qualquer juiz cria competência? Não.', 'Prevenção pode envolver medida anterior à denúncia? Sim.'], 'Juízo prevento','Órgão cuja antecedência relevante fixa a atribuição.',[CF])
add(84,'Prerrogativa de função decorre da Constituição, com tribunal e âmbito próprios. O CPP não cria sozinho foro amplo para qualquer agente ou qualquer fato após deixar o cargo.',
 ['Conferir CF 102, 105, 108 e 125 e natureza comum/de responsabilidade.', 'ADI 2797 afastou a ampliação da Lei 10.628/2002 nos antigos §§1º–2º; não ressuscitá-los.', 'HC 232627 e Inq 4787/STF, 2025: foro para crime praticado no cargo e em razão dele permanece após saída, mesmo se investigação/ação começa depois.', 'Embargos julgados em maio de 2026: alcance inclui titulares de cargos vitalícios; maior graduação prevalece em sucessão de cargos, sem novo declínio pela saída posterior.', 'Em princípio, fatos no período eleitoral a pretexto da função não ganham foro; há exceções por crimes funcionais conexos posteriores ou outro motivo de competência originária.', 'Orientação tem incidência imediata em processos em curso, ainda que instrução finalizada; não confundir manutenção funcional com foro universal para qualquer delito não funcional.'],
 'Atualização de 2025/2026 não equivale a reviver os parágrafos inconstitucionais. Acesso integral à página do STF retornou 403 nesta conferência; andamento oficial indexado foi consultado, sem certificar todos os efeitos intertemporais ou o Tema 1147.',
 'Autoridade deixa mandato depois de delito cometido no exercício e em razão da função; avaliar manutenção do foro segundo a tese atual, não declínio automático pelo fim do cargo.',
 'Fato sem vínculo funcional exige verificar categoria, Constituição e precedentes próprios; não presumir mesma solução pela mera qualidade de ex-autoridade.',
 ['Saída do cargo sempre afasta foro no delito funcional abrangido pela tese? Não.', 'Mudança de 2025 restabeleceu os antigos parágrafos da Lei 10.628? Não.'], 'Foro por função','Competência constitucional definida pela função e regime jurisprudencial pertinente.',[CF,FORO,FORONEWS])
add(85,'Exceção da verdade em crime contra honra tem regra de julgamento ligada ao foro constitucional da autoridade querelante, quando oposta e admitida. Não transfere automaticamente toda ação penal.',
 ['Separar admissibilidade da exceção e seu julgamento.', 'Tribunais de Apelação é denominação histórica; consultar competência constitucional atual.', 'Identificar cargo, tipo contra honra e cabimento da prova.'],
 'Não concluir que vítima autoridade torna todo acusado sujeito ao mesmo foro para toda a causa.',
 'Exceção da verdade é admitida contra autoridade com foro constitucional pertinente: examinar órgão competente para a exceção.',
 'Sem exceção admitida, não usar art. 85 como atração automática de toda ação.',
 ['A regra exige exceção oposta e admitida? Sim.', 'Foro do querelante sempre atrai integralmente qualquer ação contra seu crítico? Não.'], 'Exceção da verdade','Defesa específica de prova do fato nos limites do tipo e da competência.',[CF])
add(86,'A lista de 1941 sobre competência do STF não substitui a Constituição vigente. Cargos citados têm distribuição atual entre STF, STJ e regimes de responsabilidade distintos.',
 ['CF 102: competências originárias do STF.', 'CF 105: diversos membros de tribunais têm foro no STJ.', 'Crimes comuns e de responsabilidade não são categorias intercambiáveis.'],
 'Não ensinar que todo desembargador atualmente é julgado pelo STF porque aparece na lista histórica.',
 'Caso envolvendo desembargador exige consultar CF 105 e regime atual, sem atribuir STF pela simples leitura do inciso III.',
 'Membro do STF em crime comum possui regra constitucional própria no CF 102.',
 ['A lista antiga prevalece contra a Constituição? Não.', 'Todo crime de responsabilidade tem necessariamente o mesmo órgão de crime comum? Não.'], 'Competência constitucional originária','Julgamento diretamente atribuído pela Constituição a tribunal.',[CF])
add(87,'A referência a Tribunais de Apelação e cargos locais é histórica. Constituição atual disciplina foro de governador, prefeitos, magistrados, membros do MP e demais autoridades conforme cada categoria.',
 ['Governador em crime comum: CF 105 indica STJ.', 'Prefeito: CF 29, X, integrado à competência material pertinente.', 'Magistratura/MP: verificar CF 96, 108 e 125 e prerrogativas próprias.'],
 'Não colocar todas as autoridades enumeradas no mesmo tribunal atual. Interventor e secretários têm regime específico a conferir, não analogia automática.',
 'Acusação comum contra governador exige observar competência do STJ, não lista antiga de Tribunais de Apelação.',
 'Prefeito envolvido em fato de competência federal demanda integração material; a regra local não apaga competência constitucional.',
 ['Governador por crime comum vai necessariamente ao TJ pela lista de 1941? Não.', 'Todos os cargos do artigo possuem foro atual idêntico? Não.'], 'Atualização constitucional do foro','Substituição de referência histórica pelo regime vigente da Constituição.',[CF])
add(88,'Em crime praticado fora do Brasil sujeito à jurisdição penal brasileira, foro territorial é a capital do Estado onde o acusado residiu por último; se nunca residiu no país, capital da República.',
 ['Antes: verificar aplicabilidade da lei penal brasileira e competência material.', 'Última residência no Brasil, não necessariamente residência atual.', 'Sem residência anterior brasileira: Brasília.'],
 'O art. 88 organiza foro; não cria extraterritorialidade penal para qualquer fato estrangeiro.',
 'Acusado residiu por último no Acre e delito no exterior está sujeito à jurisdição brasileira: examinar capital do Estado como foro territorial.',
 'Nunca residiu no Brasil: observar capital da República, além da competência material.',
 ['Art. 88 torna todo crime exterior punível no Brasil? Não.', 'Sem residência anterior no Brasil, o foro indicado é capital da República? Sim.'], 'Foro de fato exterior','Critério territorial para delito estrangeiro submetido à jurisdição brasileira.',[CF,CP])
add(89,'O CPP define foro para crimes em embarcações nas águas/locais indicados: primeiro porto brasileiro após o crime ou último porto quando se afasta do país. A Constituição define a justiça competente.',
 ['Abrange águas territoriais e rios/lagos fronteiriços; em alto-mar, embarcação nacional.', 'CF 109, IX: crime a bordo de navio é federal, ressalvada competência militar.', 'Navio não é qualquer pequena embarcação: qualificação e competência exigem exame.'],
 'Não confundir comarca territorial com justiça estadual obrigatória, nem igualar canoa a navio federal automaticamente.',
 'Crime a bordo de navio na hipótese constitucional: combinar justiça federal com foro territorial indicado pelo primeiro porto brasileiro pertinente.',
 'Pequena embarcação exige verificar categoria e outros fundamentos, não atribuir competência federal só pelo nome barco.',
 ['O CPP 89 impõe justiça estadual em todo caso? Não.', 'Primeiro porto após fato pode definir foro territorial? Sim, nas hipóteses do artigo.'], 'Foro marítimo','Regra territorial associada ao percurso da embarcação.',[CF])
add(90,'Em crimes a bordo de aeronave nas hipóteses do artigo, foro territorial segue local do pouso após o fato ou comarca de partida. A Constituição reserva crimes a bordo de aeronaves à justiça federal, salvo militares.',
 ['Aeronave nacional: espaço aéreo brasileiro ou alto-mar.', 'Aeronave estrangeira: espaço aéreo brasileiro.', 'CF 109, IX: distinguir justiça competente e critério de território.'],
 'Não interpretar a palavra comarca como prova de competência estadual nem como regra para crime ocorrido só no aeroporto.',
 'Crime ocorre a bordo de aeronave e ela pousa em território brasileiro: aplicar foro pertinente junto à competência constitucional.',
 'Fato apenas em terminal de aeroporto, fora da aeronave, exige analisar seus próprios fundamentos, não aplicar inciso IX por associação.',
 ['Crime a bordo e crime no aeroporto são automaticamente equivalentes? Não.', 'A competência militar permanece ressalvada pela Constituição? Sim.'], 'Foro aeronáutico','Critério territorial para crime a bordo em hipóteses legais.',[CF])
add(91,'Se a competência territorial dos casos de embarcação ou aeronave continuar incerta pelas regras dos arts. 89 e 90, usa-se prevenção entre órgãos competentes.',
 ['Regra residual vinculada aos dois artigos anteriores.', 'Primeiro resolver competência constitucional/material.', 'Prevenção não escolhe livremente qualquer órgão.'],
 'Não aplicar essa regra residual antes de tentar identificar os portos, pousos ou partidas pertinentes.',
 'Dados do percurso não permitem definir foro pelos artigos anteriores; examinar prevenção entre juízos habilitados.',
 'Se o pouso pertinente é conhecido e define o foro, não substituir a regra por escolha de conveniência.',
 ['Art. 91 vale quando as regras anteriores não resolvem a incerteza? Sim.', 'Prevenção dispensa órgão materialmente competente? Não.'], 'Competência residual','Critério que resolve incerteza não solucionada pelas regras principais.',[CF])
Path(sys.argv[1]).write_text(json.dumps({'course_slug':'codigo-processo-penal','units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'civil and jurisdiction units explicitly authored')
