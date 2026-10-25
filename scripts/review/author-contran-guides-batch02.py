"""Second scoped CONTRAN batch: manually authored applications of checked provisions."""
import json
from pathlib import Path

guides = {}
def add(number, title, scope, points, warning, scenario, question, answer, variation, consequence, historical=False):
    guides[number] = dict(title=title, reviewedScope=scope, points=points, warning=warning,
        example=dict(scenario=scenario,question=question,answer=answer,variation=variation,variationAnswer=consequence),
        historical=historical)

add(971,'Rio de Janeiro: calendário excepcional de 2022','Arts. 1º–4º e cronogramas dos Anexos I e II',
 ['A medida tem recorte territorial no Rio de Janeiro e decorre da pandemia.', 'Os cronogramas referem-se a vencimentos e procedimentos de 2020–2022.'],
 'Calendário histórico: não usar para prorrogar CNH vencida em 2026. O PDF traz inclusive a expressão impossível “31 de setembro de 2022”; não criar exercício que a ensine como data válida.',
 'Uma pessoa invoca este calendário de 2022 para dirigir com CNH vencida em outubro de 2026.',
 'O ato concede essa prorrogação?', 'Não. O benefício exige enquadramento no período e nas hipóteses originais.',
 'A questão pede a retomada dos prazos ocorrida no Rio de Janeiro em 2022.',
 'Nesse caso, trata-se de consulta histórica, exigindo a fonte e eventuais correções do período.',True)
add(970,'Iluminação: emitir luz não é retrorrefletir','Art. 2º, I–IV; divisão dos anexos dos arts. 3º e 4º',
 ['Dispositivo de iluminação ilumina a via; dispositivo de sinalização emite sinal para outros usuários.', 'Retrorrefletor indica a presença do veículo devolvendo luz originada de outra fonte.'],
 'Ler com a alteração da 1024/2026 sobre lanternas especiais. Este guia não substitui os ensaios dos anexos nem autoriza mudar o sistema original.',
 'Um dispositivo traseiro devolve a luz do farol de outro veículo, sem produzir luz própria.',
 'É retrorrefletor ou farol?', 'Retrorrefletor: a fonte luminosa não está no próprio dispositivo.',
 'O equipamento projeta um facho para iluminar a via à frente.', 'A função descrita é de farol; não basta a cor da peça para classificar sua função.')
add(969,'Placas: regra geral e exceção da motocicleta','Arts. 2º–4º',
 ['Regra geral: PIV dianteira e traseira após o registro.', 'Motocicletas, motonetas, reboques e os demais veículos listados no art. 2º, § 1º usam apenas a PIV traseira.', 'Carga que encobre a placa pode exigir segunda PIV traseira.'],
 'Não exigir troca universal de placa antiga só pela existência do modelo novo; as hipóteses de substituição dependem do art. 56.',
 'Uma motocicleta registrada está sem placa dianteira, mas possui a traseira regular.',
 'A ausência da dianteira, por si só, viola a regra desta resolução?', 'Não. Motocicletas estão na exceção expressa da PIV apenas traseira.',
 'O mesmo fato ocorre com um automóvel comum.', 'Aplica-se a regra geral de placas dianteira e traseira; a exceção da motocicleta não se estende ao automóvel.')
add(968,'Identificação: VIN e seus três blocos','Arts. 2º–4º, com foco no art. 3º, I–IV',
 ['VIN: 17 caracteres distribuídos em WMI, VDS e VIS.', 'WMI identifica o fabricante; VDS descreve características; VIS individualiza o veículo.', 'Identificadores gravados e placa são instrumentos distintos.'],
 'O marco de 1º/01/2025 indicado no catálogo é anterior à conferência de 2026. Não misturar os campos VIN com o código da placa ou ensinar todas as gravações a partir deste resumo.',
 'Uma questão chama o código alfanumérico da placa de VIN de 17 caracteres.',
 'A identificação está correta?', 'Não. A placa e o número de identificação veicular são identificadores diferentes.',
 'A questão descreve a seção inicial de três caracteres que identifica o fabricante.', 'Trata-se do WMI, primeira seção do VIN.')
add(967,'Baixa: retirar de circulação não é transferir','Arts. 2º–4º',
 ['A baixa é obrigatória nas hipóteses de veículo irrecuperável, definitivamente desmontado e outras previstas no art. 2º.', 'A solicitação motivada é dirigida ao órgão executivo estadual ou distrital de registro.', 'Cumpridas as exigências, o órgão emite a Certidão de Baixa.'],
 'Não confundir baixa definitiva com transferência de proprietário ou simples falta de uso. O recolhimento de documentos e identificadores depende da hipótese do art. 3º.',
 'Um veículo foi definitivamente desmontado e seu responsável pretende apenas transferir o registro como se pudesse circular.',
 'A transferência substitui o procedimento de baixa?', 'Não. A desmontagem definitiva está entre as hipóteses de baixa obrigatória.',
 'O veículo continua íntegro e foi vendido para uso regular.', 'A venda comum exige o procedimento de transferência; não se presume baixa só pela troca de proprietário.')
add(966,'Retrovisores: anexos dependem do veículo','Arts. 2º–4º',
 ['Retrovisor permite observar área adjacente sem visão direta.', 'Motocicletas e veículos listados no art. 3º seguem o Anexo I.', 'Automóveis e veículos listados no art. 4º seguem os Anexos II, III e IV.'],
 'Ensaios e equivalências técnicas devem respeitar o dispositivo aplicável. Não deduzir conformidade só porque o acessório cabe no veículo.',
 'Um candidato aplica ao retrovisor de motocicleta o conjunto de anexos reservado aos automóveis.',
 'A escolha do anexo está correta?', 'Não. O art. 3º remete as motocicletas ao Anexo I.',
 'O caso trata de retrovisores de um automóvel.', 'A referência é o art. 4º e seus Anexos II, III e IV, com as condições técnicas previstas.')
add(965,'Estacionamento reservado: competência e sinalização','Arts. 2º e 4º; confronto com a alteração 1012/2024',
 ['Estacionamento específico em via pública é estabelecido pelo órgão com circunscrição sobre a via.', 'A sinalização deve seguir os padrões do CONTRAN.', 'Credenciais para pessoa idosa ou com deficiência têm disciplina modificada pela 1012/2024.'],
 'Pintura particular não cria área pública de estacionamento exclusivo. Não copiar o capítulo antigo de credenciais sem a alteração de 2024.',
 'Um comerciante pinta a via pública como vaga exclusiva de sua loja, sem regulamentação do órgão competente.',
 'A pintura cria estacionamento específico regular?', 'Não. O art. 2º exige estabelecimento e regulamentação pelo órgão de trânsito competente.',
 'O órgão com circunscrição regulamenta e sinaliza a área nos padrões do CONTRAN.', 'A origem da área agora atende ao requisito estudado; o usuário deve ainda respeitar sua finalidade e condições.')
add(964,'Air bag: equipamento suplementar e recorte de fabricação','Arts. 1º–4º',
 ['Air bag frontal é equipamento suplementar de segurança passiva para condutor e passageiro dianteiro.', 'O art. 2º alcança M1 e N1 fabricados a partir de 1º/01/2014.', 'Há dispensas específicas no art. 4º, como veículos de uso bélico.'],
 'Suplementar significa adicional, não substituto do cinto. Não transformar o marco de fabricação em obrigação automática de adaptar qualquer veículo antigo.',
 'Um automóvel comum M1 fabricado em 2025 é apresentado sem air bag frontal obrigatório.',
 'O ano de fabricação o coloca fora do recorte da norma?', 'Não. Ele é posterior a 1º/01/2014 e se enquadra na categoria, ressalvadas dispensas específicas que não foram dadas no caso.',
 'A questão trata de veículo de uso bélico.', 'É necessário aplicar a dispensa expressa do art. 4º, e não a regra sem exceções.')
add(963,'Rodas especiais: troca precisa atender à segurança','Arts. 2º–4º',
 ['Rodas especiais substituem as originais ou opcionais de fábrica.', 'A disciplina estudada alcança automóveis e camionetas de uso misto deles derivadas.', 'É proibida circulação com rodas substitutas que não cumpram os requisitos do Anexo.'],
 'Aparência ou encaixe da roda não comprovam atendimento aos requisitos. A alteração do conjunto roda/pneu também precisa seguir a regulamentação pertinente.',
 'Um automóvel recebe rodas fora das especificações mínimas do Anexo, embora caibam nos cubos.',
 'O encaixe físico torna regular a circulação?', 'Não. O art. 4º exige os requisitos de segurança, além da mera possibilidade de montagem.',
 'Foram comprovados os requisitos técnicos da roda e das modificações do conjunto roda/pneu.', 'A análise é de conformidade técnica; o caso anterior não era irregular simplesmente por ser uma roda especial.')
add(962,'Mato Grosso: prazos da pandemia encerrados','Arts. 1º–4º e Anexo',
 ['O ato alcança condutores habilitados pelo órgão do Mato Grosso.', 'O cronograma contempla CNH/ACC vencidas de março de 2020 a dezembro de 2022.', 'A última data do Anexo é 31/01/2023.'],
 'Consulta histórica: não ensinar este calendário como prorrogação vigente em 2026.',
 'Uma CNH de Mato Grosso vence em 2026 e seu titular cita o cronograma da pandemia.',
 'Esse vencimento está contemplado?', 'Não. O cronograma tem recorte temporal encerrado e não inclui vencimentos de 2026.',
 'A pergunta descreve CNH vencida em dezembro de 2022 e exige o prazo excepcional daquele período.', 'No enquadramento histórico indicado, o Anexo prevê renovação até 31/01/2023.',True)
add(961,'Acessibilidade: equipamento e informação no CRLV-e','Arts. 1º–3º',
 ['Acessibilidade abrange os requisitos do veículo e a informação de suas características no CRLV-e.', 'O art. 3º remete ao Anexo I para a indicação das características ou tipos de acessibilidade.'],
 'Não presumir que a presença de um equipamento dispensa os demais requisitos ou a informação documental.',
 'Um ônibus acessível tem equipamento adequado, mas o responsável afirma que as características não precisam aparecer no CRLV-e.',
 'A informação documental é dispensada?', 'Não. O art. 3º exige a apresentação das características ou tipos de acessibilidade no CRLV-e.',
 'O documento informa a acessibilidade, mas um requisito técnico não foi atendido.', 'A inscrição documental não substitui a conformidade técnica do veículo.')
add(960,'Vidros: avaliar o conjunto e a área de visão','Arts. 4º, 8º e 10; alteração 989/2022',
 ['Nas áreas indispensáveis à dirigibilidade, o limite mínimo de transmitância é 70%.', 'Película não refletiva deve preservar os limites do conjunto vidro-película.', 'A 989/2022 alterou o regime das demais áreas: não copiar o antigo mínimo de 28% sem a ressalva atual.'],
 'A chancela da película não prova, sozinha, a transmitância final do conjunto. Este guia não esgota as dispensas, áreas excluídas nem a medição técnica.',
 'Em uma área lateral indispensável à dirigibilidade, o conjunto vidro-película apresenta transmitância de 65%.',
 'A película com chancela de 70% torna o conjunto conforme?', 'Não. O requisito do caso é do conjunto, que ficou abaixo de 70%.',
 'O conjunto apresenta 75%, mas a película é refletiva.', 'O percentual isolado não elimina a proibição específica de película refletiva.')
add(959,'Ônibus M3: CAT e comprovação técnica','Arts. 1º–3º',
 ['O objeto são ônibus e micro-ônibus da categoria M3, nacionais e importados.', 'Pedidos de CAT precisam demonstrar atendimento aos requisitos previstos.', 'A preservação de CAT antigo depende das condições do art. 3º, não apenas da data de emissão.'],
 'Não confundir CAT, CCT e CRLV-e. Os ensaios de estabilidade e estrutura são exigências próprias; não foram integralmente auditados neste guia.',
 'Um fabricante pede CAT para ônibus M3 sem comprovar os requisitos técnicos que o art. 2º exige.',
 'A identificação como M3 dispensa a comprovação?', 'Não. A categoria define o recorte, mas o pedido precisa atender às exigências da resolução.',
 'O caso trata de micro-ônibus M2.', 'Deve-se consultar o regime próprio da 939/2022; não aplicar automaticamente o guia da M3.')
add(958,'Emissões: motor, combustível e ano importam','Arts. 1º–3º',
 ['A resolução abrange emissões, procedimentos de fiscalização, gases do cárter e sons de equipamentos.', 'As tabelas do art. 3º para ciclo Otto distinguem ano de fabricação e combustível.', 'O ato também revogou a observação 9 do Anexo V da 916/2022.'],
 'Não memorizar um único limite de CO para toda a frota. Este guia não certifica todas as tabelas, instrumentos ou normas ambientais referenciadas.',
 'Uma questão aplica a mesma linha de limite de CO a veículos com anos e combustíveis diferentes, sem consultar a tabela.',
 'A comparação é suficiente?', 'Não. É preciso enquadrar ano de fabricação, combustível e procedimento na tabela aplicável.',
 'Os veículos têm o mesmo combustível, mas anos de fabricação distintos.', 'A igualdade do combustível não dispensa verificar a faixa de ano de cada veículo.')
add(957,'Veículo de coleção: idade não basta','Arts. 2º–3º',
 ['A definição do art. 2º exige antiguidade e valor histórico próprio, admitindo original ou modificado.', 'A preservação de características é avaliada para o CVCOL nos termos próprios.'],
 'O art. 2º usa “mais de trinta anos” e o art. 3º usa “trinta anos ou mais”. O caso evita a fronteira exata; não criar exercício automático para resolver essa diferença textual.',
 'Um veículo com 35 anos é apresentado como de coleção apenas pela idade, sem demonstrar valor histórico ou os demais requisitos.',
 'A idade sozinha é suficiente?', 'Não. A definição exige valor histórico próprio, e o registro e licenciamento seguem requisitos específicos.',
 'Um veículo com 35 anos tem valor histórico e atende aos requisitos comprovados para seu registro.', 'O enquadramento passa pela antiguidade e pelos demais requisitos; não pela idade isolada.')
add(956,'Eixo elétrico auxiliar: auxiliar não substitui tração','Arts. 1º–2º',
 ['O eixo converte energia regenerada em torque auxiliar, sem substituir a tração principal.', 'Mesmo instalado opcionalmente, deve cumprir os requisitos do Anexo.', 'Semirreboque com eixo elétrico precisa de código específico e CAT, conforme o art. 2º.'],
 'Opcionalidade de instalação não dispensa segurança, ensaios ou identificação específica.',
 'Um fabricante instala o eixo como opcional e afirma que, por isso, não precisa atender ao Anexo.',
 'A justificativa procede?', 'Não. O art. 1º, § 2º determina atendimento mesmo na instalação opcional.',
 'O equipamento é descrito como substituto completo da tração principal.', 'Isso não corresponde à definição de eixo elétrico auxiliar estudada no art. 1º.')
add(955,'Bicicleta externa: placa e lanternas precisam aparecer','Arts. 2º–6º',
 ['Carga e suporte precisam respeitar limites do veículo e dos fabricantes.', 'Encobrimento da sinalização exige régua de sinalização; encobrimento da placa exige segunda placa traseira.', 'Amarração não pode comprometer visibilidade e estabilidade.'],
 'Não corrigir o encobrimento da placa com papel manuscrito. As exigências de placa e sinalização são distintas e podem coexistir.',
 'Bicicletas no suporte traseiro encobrem tanto a placa quanto as lanternas.',
 'Basta instalar uma segunda placa?', 'Não. O art. 5º exige a solução de identificação e, para a sinalização encoberta, a régua correspondente.',
 'As lanternas estão livres, mas a placa continua parcialmente coberta.', 'A exigência relativa à placa permanece; “parcialmente” também está abrangido.')
add(954,'Estabilidade: cronograma corrigido pela Deliberação 264','Arts. 1º–3º e 7º; Deliberação 264/2022',
 ['O sistema exigido depende da categoria e das alternativas permitidas no art. 3º.', 'A Deliberação 264 corrigiu os marcos de projeto do cronograma.', 'Para M2, M3, N2, N3, O3 e O4, o marco dos projetos novos passou a 1º/07/2023; os anteriores seguem a exigência a partir de 1º/01/2025.'],
 'Não usar o PDF original sozinho para o art. 7º. A alteração substitui datas do projeto e não significa que todos os veículos antigos em circulação devem receber adaptação.',
 'Uma questão sobre o cronograma mantém 14/12/2016 como marco de projeto dos veículos do inciso II, ignorando a Deliberação 264.',
 'A data continua sendo a referência desse inciso?', 'Não. A deliberação alterou o marco para 1º/07/2023, com o regime dos projetos anteriores indicado no inciso.',
 'A pergunta exige adaptação universal de qualquer veículo usado, apenas porque chegou 2025.', 'O cronograma é de veículos produzidos/importados no recorte da norma; não autoriza essa extensão universal.')
add(953,'Protetor lateral: dispensa de região não é dispensa total','Arts. 2º–3º; alteração 987/2022',
 ['O art. 2º trata de caminhões, reboques e semirreboques com PBT superior a 3.500 kg, no recorte de fabricação e alterações definido.', 'A 987/2022 mudou a dispensa da região posterior aos eixos para carroçaria basculante ou silo basculante.', 'O art. 3º enumera regiões longitudinais dispensadas.'],
 'Não generalizar a dispensa de uma região para todo o veículo. Ler o inciso IV na redação de 2023, não na original.',
 'Um caminhão basculante invoca a dispensa da região posterior aos eixos para retirar também a proteção exigida em outra região.',
 'A dispensa autoriza a retirada integral?', 'Não. O art. 3º trata de regiões determinadas, não de autorização geral para retirar o equipamento.',
 'A pergunta se limita à região posterior aos eixos do caminhão com carroçaria basculante.', 'É necessário considerar a redação do inciso IV dada pela 987/2022.')
add(952,'Para-choque traseiro: categoria e alteração do veículo','Arts. 1º–3º',
 ['O recorte abrange N2, N3, O3 e O4.', 'O art. 3º alcança fabricação ou importação a partir de 1º/01/2017.', 'Alterações que exigem inspeção para CSV também atraem as especificações do Anexo I, conforme o § 1º.'],
 'Não usar o marco de 2017 para dispensar automaticamente um veículo modificado enquadrado no § 1º. Ensaios e exceções têm disciplina própria.',
 'Um veículo da categoria alcançada sofreu modificação que exige CSV; o responsável diz que seu ano antigo basta para afastar todas as especificações.',
 'O argumento resolve o caso?', 'Não. O art. 3º, § 1º também disciplina as alterações com inspeção exigida para CSV.',
 'A questão descreve automóvel M1 comum.', 'Ele não entra no recorte de categorias do art. 1º apenas porque possui para-choque traseiro.')
add(951,'Cintos e ancoragem: conjunto técnico, não só presença','Arts. 1º–3º; alteração 997/2023',
 ['Cinto, ancoragem e apoio de cabeça têm requisitos técnicos nos anexos.', 'O art. 3º define o recorte de produção/importação a partir de 30/01/2020.', 'A 997/2023 alterou o Anexo I quanto aos apoios de cabeça; consultar a redação atual do ponto específico.'],
 'Ter um cinto instalado não prova que sua ancoragem atende ao ensaio. As exceções de apoio de cabeça não se transformam em dispensa universal de cintos.',
 'Um fabricante demonstra somente que há cintos, sem verificar a ancoragem exigida.',
 'A demonstração cobre todos os requisitos estudados?', 'Não. O art. 2º exige o atendimento técnico dos cintos, da ancoragem e dos apoios de cabeça, conforme sua aplicação.',
 'Uma hipótese de exceção da 997/2023 é citada para dispensar todos os cintos do veículo.', 'A exceção precisa ser aplicada ao item e ao recorte exatos; não se amplia automaticamente para outros equipamentos.')
add(950,'Transporte internacional: inspeção e certificado','Arts. 1º–3º',
 ['O órgão máximo executivo de trânsito da União realiza a inspeção por empresas licenciadas no regime do art. 2º.', 'Veículo aprovado recebe selo de segurança vinculado ao certificado.', 'O certificado é de porte obrigatório na forma prevista pela resolução.'],
 'Não confundir o selo com dispensa do certificado, nem empresa licenciada com qualquer oficina.',
 'Um veículo de transporte rodoviário internacional aprovado traz o selo no para-brisa, mas seu responsável diz que não precisa portar o certificado.',
 'O selo elimina o requisito documental?', 'Não. O art. 3º vincula selo e certificado e exige o porte deste nos termos da resolução.',
 'A inspeção foi feita por oficina sem o licenciamento exigido para essa atividade.', 'O vínculo com empresa licenciada também integra o regime de competência do art. 2º.')
add(949,'Impacto lateral: retificação muda datas do cronograma','Arts. 1º–5º, com foco na retificação de 07/06/2022',
 ['Impacto lateral contra barreira e impacto contra poste têm ensaios próprios.', 'A retificação do art. 5º, I, a substituiu 22/01/2018 por 1º/01/2020.', 'A retificação do art. 5º, II, a substituiu 31/12/2018 por 1º/01/2026.'],
 'Em outubro de 2026, não apresentar o marco de janeiro de 2026 como futuro. O alcance depende do ensaio, categoria e condições do dispositivo; o cronograma original está retificado.',
 'Uma questão exige a data do art. 5º, II, a e oferece apenas a redação original de 31/12/2018.',
 'Qual marco consta da retificação oficial?', '1º de janeiro de 2026. O PDF original deve ser lido com a retificação de 07/06/2022.',
 'A pergunta se refere ao art. 5º, I, a.', 'Nesse outro dispositivo, a data corrigida é 1º de janeiro de 2020; não trocar os dois marcos.')
add(948,'Retrorrefletivos: a transição de 2024 já terminou','Arts. 1º–3º e 8º; Deliberação 263/2022 e ratificação 981/2022',
 ['Película retrorrefletiva aumenta a visibilidade diurna e noturna.', 'As categorias do art. 2º devem atender às disposições dos anexos.', 'O prazo da descrição “APROVADO SENATRAN” foi estendido até 1º/01/2024.'],
 'A transição não permanece aberta em 2026. Película retrorrefletiva de sinalização não é película de escurecimento de vidro, regulada por outro ato.',
 'Um responsável invoca em 2026 a extensão até janeiro de 2024 para continuar sem a descrição exigida.',
 'O prazo antigo ainda justifica a falta?', 'Não. A extensão tem marco encerrado; é necessário aplicar a exigência e suas condições atuais.',
 'A pergunta trata de película escura no para-brisa.', 'O objeto muda: deve-se consultar o regime de vidros da 960/2022 e sua alteração, não a 948.')
add(946,'Granel: conter e cobrir a carga','Arts. 2º–3º',
 ['Carga sólida a granel não está acondicionada em embalagem.', 'Nas hipóteses do art. 2º, cobertura deve ser integral, ancorada e conservada.', 'A regra geral tem ressalva para transporte com regulamentação específica.'],
 'Guardas laterais não substituem a cobertura exigida. A previsão especial da cana inteira não autoriza cordas em qualquer carga.',
 'Areia é transportada diretamente em carroceria aberta com laterais fechadas, mas sem a cobertura exigida.',
 'As laterais bastam?', 'Não. Nas condições do art. 2º, também é necessária cobertura integral e eficaz, sem prejudicar equipamentos obrigatórios.',
 'O veículo possui cobertura, mas a areia ultrapassa os limites da carroceria.', 'A cobertura não elimina a exigência de respeitar os limites da carroceria do art. 2º, § 4º.')
add(945,'Amarração: corda da lona não amarra a carga','Arts. 2º–4º',
 ['Amarração e ancoragem devem conter a carga nas condições esperadas da viagem.', 'O art. 4º prevê cintas, correntes ou cabos de aço e requisitos de capacidade.', 'Cordas são proibidas para amarração da carga, mas podem fixar a lona de cobertura.'],
 'A regra geral não elimina regimes específicos ou veículos com sistema próprio de contenção, nos termos do art. 2º. Não confundir cobertura com amarração.',
 'Em transporte sujeito à regra geral, caixas são amarradas apenas por cordas.',
 'É suficiente se a corda parecer resistente?', 'Não. O art. 4º, § 3º proíbe cordas como dispositivo de amarração da carga.',
 'A carga está amarrada com os dispositivos adequados e a corda prende somente a lona.', 'Esse uso da corda é admitido pela ressalva; ainda devem ser cumpridos os demais requisitos de segurança.')
add(944,'Identificação auxiliar: não é base do AIT','Arts. 2º–4º',
 ['O sistema auxiliar de identificação é facultativo, respeitadas as especificações.', 'O art. 3º veda fundamentar a identificação para AIT nesse sistema auxiliar.', 'Caracteres diferentes da placa de registro têm consequência específica no art. 4º.'],
 'Faixa de identificação auxiliar não substitui a placa oficial, mesmo que seja mais fácil de visualizar.',
 'O agente identifica o veículo para o AIT exclusivamente pela inscrição auxiliar, sem fundamento na identificação oficial.',
 'O procedimento atende ao art. 3º?', 'Não. A norma impede que a identificação para o AIT se fundamente no sistema auxiliar.',
 'A inscrição auxiliar coincide com a placa, mas é apresentada como obrigatória para toda a frota.', 'O art. 2º trata de uso facultativo; coincidência de caracteres não altera a natureza dessa previsão.')
add(943,'Motofrete e mototáxi: categoria e equipamentos','Arts. 2º–4º',
 ['Veículo autorizado para transporte remunerado deve ser registrado na categoria aluguel.', 'A proteção de pernas e motor e o aparador de linha integram os equipamentos do art. 3º.', 'A autorização do serviço e as exigências do veículo são requisitos diferentes.'],
 'Não confundir categoria de aluguel do veículo com categoria da CNH. Este guia não certifica todas as exigências pessoais ou municipais do serviço.',
 'Uma motocicleta foi autorizada para motofrete, mas continua registrada como particular.',
 'A autorização dispensa o registro na categoria aluguel?', 'Não. O art. 2º exige a categoria de registro adequada para o serviço remunerado autorizado.',
 'O registro está correto, mas falta um equipamento de segurança exigido no art. 3º.', 'A categoria correta não substitui as exigências dos equipamentos.')
add(942,'Siderúrgicos: classificar a carga antes de amarrar','Arts. 2º–4º',
 ['A classificação distingue produtos siderúrgicos e seus insumos.', 'O carvão, a granel ou ensacado, é considerado insumo pelo art. 3º.', 'Arrumação e amarração seguem as condições específicas da resolução.'],
 'Não aplicar uma única configuração a barras, bobinas e outros materiais diferentes. Este guia não certifica os esquemas técnicos de cada tipo.',
 'Uma questão exclui o carvão ensacado do regime sob a justificativa de que não é produto metálico acabado.',
 'A exclusão corresponde ao art. 3º?', 'Não. A resolução considera o carvão a granel ou ensacado como insumo de produtos siderúrgicos.',
 'O caso troca barras por bobinas e mantém a configuração de amarração sem reavaliar a carga.', 'É preciso conferir as condições próprias do material; a classificação interfere na arrumação e contenção.')
add(941,'Vistoria de identificação: habilitação prévia','Arts. 1º–2º; leitura com a alteração 977/2022',
 ['A responsabilidade da vistoria de identificação é do órgão executivo estadual ou distrital.', 'Pessoa jurídica pública ou privada pode prestar o serviço quando previamente habilitada.', 'A vistoria de identificação não é automaticamente a inspeção técnica para emissão de CSV.'],
 'A 977/2022 alterou o regime de habilitação; consultar suas condições para casos específicos. Este guia não dá autorização genérica para vistoria móvel.',
 'Uma empresa privada oferece vistoria de identificação sem a habilitação prevista.',
 'Ser pessoa jurídica privada basta?', 'Não. O art. 2º admite a execução por pessoa jurídica previamente habilitada, mantendo a responsabilidade do órgão de trânsito.',
 'A empresa é habilitada e a hipótese exige vistoria de identificação.', 'A condição de prestador foi atendida, mas o procedimento e o laudo ainda precisam seguir as regras aplicáveis.')
add(940,'Capacete: óculos comuns não substituem proteção','Arts. 1º–4º',
 ['Capacete precisa estar afixado pela cinta jugular e engate abaixo do maxilar inferior.', 'Capacete deve ter viseira ou, na ausência dela, óculos de proteção.', 'Óculos de sol, corretivos ou EPI usados isoladamente não substituem os óculos de proteção.'],
 'As regras não se aplicam aos triciclos e quadriciclos com cabine fechada indicados no art. 1º. Exceção de cabine não é dispensa para motocicleta aberta.',
 'Um motociclista usa capacete sem viseira e somente óculos de grau.',
 'Os óculos de grau, sozinhos, atendem à exigência?', 'Não. O art. 4º, § 2º proíbe usá-los isoladamente em substituição aos óculos de proteção.',
 'Usa óculos de proteção que permitem os óculos de grau simultaneamente.', 'Essa combinação é prevista na definição do § 1º, respeitadas as condições de uso e os demais requisitos.')
add(939,'Micro-ônibus M2: cronograma retificado','Arts. 1º–4º; retificação de 27/05/2022',
 ['A resolução se aplica a micro-ônibus da categoria M2.', 'A retificação substituiu o marco do projeto no art. 4º, I por 1º/01/2023.', 'O inciso II prevê o alcance geral dos requisitos da Tabela 2 a partir de 1º/01/2025, no recorte do dispositivo.'],
 'Não memorizar 28/12/2018 do PDF original no inciso retificado. M2 e M3 têm normas técnicas distintas.',
 'A questão apresenta 28/12/2018 como marco de projeto vigente no art. 4º, I.',
 'Qual correção precisa ser considerada?', 'A retificação oficial de 27/05/2022 passou o marco para 1º de janeiro de 2023.',
 'O caso trata de ônibus da categoria M3.', 'Consulte o regime próprio da 959/2022, em vez de transferir automaticamente o cronograma da M2.')
add(938,'Cronotacógrafo: registros além da velocidade','Arts. 1º–4º',
 ['O aparelho registra velocidade e tempo de forma instantânea e inalterável.', 'Pode ser mecânico, eletrônico ou integrar conjunto computadorizado.', 'O art. 3º exige informações das últimas 24 horas de operação, incluindo distância e interrupções.'],
 '“Últimas 24 horas de operação” não é um prazo trabalhista de jornada autorizada. Este guia não certifica os limites legais de trabalho e descanso.',
 'Um aparelho mostra apenas a velocidade atual, sem os registros mínimos das últimas 24 horas de operação.',
 'Isso atende ao art. 3º?', 'Não. A norma exige as informações mínimas de operação, não apenas um velocímetro instantâneo.',
 'O cronotacógrafo integra um conjunto computadorizado que exerce outras funções.', 'A integração é admitida pelo art. 2º, desde que preserve as funções e os requisitos exigidos.')
add(937,'Engate: capacidade declarada pelo fabricante','Arts. 1º–4º',
 ['O recorte inclui veículos com PBT de até 3.500 kg com capacidade de tracionar declarada.', 'A norma trata do engate não original de fábrica e exige requisitos próprios.', 'A plaqueta de rastreabilidade informa fabricante, modelo de aplicação e outras características.'],
 'Instalar engate não cria capacidade de tração que o fabricante não declarou. O índice traz “01.04.222”; adotada a publicação de 01/04/2022 confirmada no PDF oficial. O objeto não é qualquer engate de qualquer veículo.',
 'Um veículo de 3.000 kg recebe engate, mas não possui capacidade de tracionar reboques declarada pelo fabricante.',
 'O peso abaixo de 3.500 kg basta para autorizar a utilização no regime estudado?', 'Não. O art. 1º também exige a capacidade declarada de tracionar.',
 'Há capacidade declarada, mas o engate não atende ao licenciamento e requisitos aplicáveis.', 'A capacidade do veículo é necessária, mas não substitui a conformidade do acessório.')
add(936,'Aviso do cinto: posição do condutor e retificação','Arts. 1º–4º; retificação de 07/07/2022',
 ['A posição do condutor deve ter o aviso de não afivelamento, conforme aplicação da norma.', 'Quando instalados nas posições dos passageiros indicados no art. 3º, os dispositivos também precisam cumprir os requisitos.', 'O cronograma usa 1º/01/2021 como marco de projeto após a retificação; o inciso II alcança os projetos anteriores a partir de 1º/01/2024.'],
 'Aviso sonoro/visual não substitui a obrigação de usar o cinto. Não repetir 31/12/2018 do cronograma original retificado.',
 'Uma questão descreve o aviso do assento do condutor como facultativo em veículo abrangido pelo art. 2º.',
 'A classificação é correta?', 'Não. A posição do condutor tem exigência obrigatória no regime aplicável.',
 'A questão pede o marco do projeto do art. 4º, I após a retificação.', 'O marco é 1º de janeiro de 2021, e não 31 de dezembro de 2018.')
add(935,'Rochas ornamentais: verificação durante o percurso','Arts. 3º–4º',
 ['O transporte de blocos e chapas serradas exige condutor aprovado e certificado em CETCI.', 'O condutor deve verificar periodicamente travas e tensionamento durante o percurso.', 'Reaperto é necessário quando a verificação demonstrar a necessidade.'],
 'Inspeção antes da partida não dispensa as verificações periódicas. O conteúdo e a realização atual do curso devem ser conferidos na regulamentação de formação vigente.',
 'O motorista verifica a amarração somente antes da saída e recusa qualquer conferência durante a viagem.',
 'A conduta atende ao art. 4º?', 'Não. A norma atribui ao condutor verificação periódica durante o percurso, com reaperto quando necessário.',
 'A verificação do percurso revela afrouxamento das cintas.', 'Deve realizar o reaperto necessário; a conferência não é mera formalidade.')
add(932,'RENAINF: autuar e arrecadar são funções distintas','Arts. 2º–4º',
 ['O registro nacional integra-se ao RENAVAM e ao RENACH.', 'Órgão autuador autua, julga defesa de autuação e aplica multa no recorte definido.', 'Órgão arrecadador efetua cobrança e recebimento, segundo a definição do art. 4º.'],
 'Receber o valor da multa não transforma, por si só, o arrecadador no autor da autuação ou julgador da defesa.',
 'Um órgão recebe o pagamento da multa e é tratado como autuador apenas por esse recebimento.',
 'As duas funções são necessariamente iguais?', 'Não. As definições do art. 4º distinguem autuação e arrecadação; podem envolver órgãos com funções diferentes.',
 'A pergunta indica o órgão que efetivamente autuou e aprecia a defesa da autuação.', 'A função descrita corresponde ao órgão autuador, não somente à arrecadação.')
add(931,'SNE: adesão e disponibilização da notificação','Arts. 2º, 4º–5º',
 ['O SNE é meio de comunicação virtual mediante adesão prévia.', 'Abrange notificações e meios de defesa e recurso previstos no art. 4º.', 'A expedição da notificação de autuação corresponde à efetiva disponibilização no sistema, registrada, para o prazo de 30 dias referido no art. 5º.'],
 'Não confundir expedição com o momento em que o usuário abre a mensagem. Este guia não promete desconto automático por instalar aplicativo.',
 'No regime do SNE aplicável, a notificação é disponibilizada e registrada, mas o usuário só a abre dias depois.',
 'A abertura tardia é o marco da expedição do art. 5º?', 'Não. O dispositivo usa a efetiva disponibilização no SNE, devidamente registrada.',
 'A questão afirma que o sistema serve apenas para enviar multas, sem comportar defesa prévia ou recurso.', 'A afirmação não corresponde ao art. 4º, que contempla esses instrumentos de comunicação.')
add(927,'Aptidão: restrição não é inaptidão definitiva','Arts. 8º–9º, com foco nos resultados do exame médico',
 ['Apto com restrições envolve registro de restrição ou adaptação veicular.', 'Inapto temporário corresponde a motivo passível de tratamento ou correção.', 'Inapto corresponde, na definição do art. 8º, a motivo irreversível para a categoria pretendida.'],
 'Resultado médico e resultado psicológico têm classificações próprias. A necessidade de adaptação não autoriza presumir inaptidão; procedimentos de habilitação devem ser lidos com a 1020/2025.',
 'O médico conclui que o candidato pode conduzir com uma restrição a registrar na CNH.',
 'Isso equivale automaticamente a inapto?', 'Não. A categoria descrita no art. 8º é apto com restrições.',
 'O motivo da reprovação é passível de tratamento ou correção.', 'A classificação médica descrita é inapto temporário, não inaptidão irreversível.')
add(926,'Infração sem veículo: prazo de expedição da autuação','Arts. 1º–4º',
 ['O objeto é a infração expressamente prevista no CTB sob responsabilidade de pessoa física/jurídica sem utilização de veículo.', 'No regime do art. 4º, ressalvado o art. 5º, a NA deve ser expedida em até 30 dias da constatação.', 'A defesa de autuação tem prazo próprio, não inferior a 30 dias conforme o dispositivo.'],
 'Expedir notificação e receber correspondência são eventos diferentes. Não aplicar o regime sem identificar a infração e as exceções do art. 5º.',
 'Em hipótese alcançada pelo art. 4º, sem a exceção do art. 5º, a NA só é expedida 40 dias após a constatação.',
 'Foi respeitado o limite de expedição estudado?', 'Não. O limite do caso é de 30 dias contados da constatação.',
 'A expedição ocorreu em 20 dias, mas o recebimento foi posterior.', 'Não concluir atraso de expedição só pela data de recebimento; os dois eventos precisam ser distinguidos.')
add(924,'Transporte escolar: campos de visão, não só presença de câmera','Arts. 2º–4º; retificação de 27/05/2022',
 ['Os campos de visão podem ser obtidos por retrovisores, câmera-monitor, combinação ou outros dispositivos tecnicamente eficientes.', 'O equipamento precisa cumprir as especificações dos anexos.', 'A retificação do art. 4º, I substituiu 1º/01/2019 por 1º/01/2024 como marco do projeto.'],
 'Não dispensar campos de visão apenas porque existe uma câmera. O cronograma original deve ser lido com a retificação; não presumir adaptação universal a partir do resumo.',
 'Um transporte escolar tem câmera, mas não proporciona um campo de visão exigido pelo anexo aplicável.',
 'A câmera, por si só, atende à norma?', 'Não. A alternativa tecnológica precisa obter os campos de visão e atender às especificações técnicas exigidas.',
 'A solução combina retrovisores e câmera e comprova os campos de visão.', 'A combinação é admitida pelo art. 2º; o resultado técnico e as demais condições precisam ser atendidos.')
add(923,'Toxicológico: prazo do laudo atualizado para 30 dias','Arts. 2º–4º e 9º; redação da 1009/2024',
 ['O exame estudado tem análise retrospectiva mínima de 90 dias em amostra queratínica.', 'Todas as etapas precisam de cadeia de custódia com validade forense.', 'O prazo do art. 9º para entrega do laudo passou de 15 para 30 dias contados da coleta pela 1009/2024.'],
 'O PDF original conserva o prazo antigo de 15 dias. Não confundir janela retrospectiva, validade do resultado e prazo de entrega, nem tratar a lista desta resolução como exaustiva de toda exigência do CTB atual.',
 'Um laboratório usa a redação original para afirmar que o art. 9º vigente mantém prazo máximo de 15 dias para entrega do laudo.',
 'Qual é a redação modificadora conferida?', 'A 1009/2024 alterou o prazo máximo para trinta dias contados da coleta.',
 'A questão chama os 90 dias de análise retrospectiva de prazo para entrega do laudo.', 'São grandezas diferentes: retrospectiva refere-se à janela de detecção; a entrega segue o art. 9º atualizado.')
add(922,'CSV: inspeção de segurança não é mera identificação','Arts. 1º–3º',
 ['A resolução disciplina ITL e ETP na prestação de serviços para emissão do CSV.', 'O art. 2º inclui inspeção de veículos modificados e outros casos indicados.', 'Laudos previstos no art. 3º têm finalidades próprias; não se confundem automaticamente com o CSV.'],
 'Uma vistoria de identificação não substitui a inspeção de segurança exigida para a modificação. Conferir a instituição e o procedimento aplicáveis.',
 'Uma modificação exige inspeção de segurança para CSV, mas o proprietário apresenta apenas vistoria de identificação.',
 'Os procedimentos são intercambiáveis?', 'Não. A vistoria de identificação e a inspeção de segurança têm objetos distintos; deve ser atendida a inspeção exigida.',
 'A inspeção cabível é feita pela instituição habilitada e resulta no CSV exigido.', 'Esse é o documento do regime de segurança; ainda devem ser cumpridas as demais exigências da modificação e do registro.')
add(921,'Tanque suplementar: autorização antes da instalação','Arts. 2º–5º',
 ['Tanque suplementar é instalado após registro/licenciamento e destinado à propulsão ou equipamento especializado.', 'Instalação e alteração da capacidade exigem prévia autorização.', 'O art. 3º prevê limite de 1.200 litros para tanques de veículos automotores e regime próprio de 350 litros em reboques/semirreboques para equipamentos especializados.'],
 'Não transferir o limite de 1.200 litros para qualquer tanque em reboque. O regime varia conforme veículo e finalidade.',
 'Um caminhão recebe tanque suplementar antes de pedir a autorização competente.',
 'Pedir a autorização depois satisfaz a exigência de autorização prévia?', 'Não. O art. 5º exige autorização antes da instalação ou da alteração da capacidade.',
 'Um semirreboque usa tanque para equipamento especializado durante o transporte e invoca o limite de 1.200 litros.', 'O art. 3º, § 3º prevê para esse caso o limite de 350 litros; os recortes não são equivalentes.')
add(920,'Fiscalização não metrológica também exige conformidade','Arts. 1º–4º',
 ['Os sistemas possuem registrador de imagem e tipos de instalação definidos.', 'A conformidade do modelo deve ser avaliada pelo INMETRO ou entidade acreditada.', 'Precisam atender aos requisitos mínimos da infração a detectar.'],
 '“Não metrológico” não significa sem controle técnico. Não aplicar esta disciplina automaticamente a medidores de velocidade.',
 'Uma câmera de fiscalização é usada sem avaliação de conformidade do modelo, sob a alegação de que o sistema não é metrológico.',
 'A alegação afasta o art. 3º?', 'Não. O dispositivo exige avaliação de conformidade do modelo mesmo nesse tipo de sistema.',
 'A avaliação existe, mas o sistema não atende ao requisito específico da infração detectada.', 'A conformidade geral do modelo não substitui o atendimento dos requisitos específicos mínimos.')
add(919,'Extintor: obrigatório em ônibus, facultativo em automóvel','Arts. 2º–3º',
 ['Ônibus, micro-ônibus, caminhão e demais categorias do art. 2º têm instalação obrigatória.', 'Em automóveis e outras categorias do § 1º, a instalação é facultativa por opção do proprietário.', 'Quem opta por instalar deve seguir as especificações da resolução.'],
 'Facultativo não significa permitido instalar equipamento vencido ou inadequado. Não estender a opção do automóvel ao ônibus.',
 'Um ônibus circula sem extintor e seu responsável cita a faculdade prevista para automóveis.',
 'A faculdade se aplica ao ônibus?', 'Não. Ônibus está no grupo de instalação obrigatória do art. 2º.',
 'O proprietário de automóvel particular opta por instalar extintor.', 'A escolha é facultativa no recorte do § 1º, mas o equipamento instalado deve cumprir as normas aplicáveis.')
add(918,'Multas: autuação e penalidade são etapas distintas','Arts. 2º–4º; leitura com a alteração 991/2023',
 ['O AIT inicia o processo administrativo; NA e notificação de penalidade têm funções distintas.', 'No regime do art. 4º, a NA deve ser expedida em até 30 dias do cometimento.', 'A não expedição da NA no prazo leva ao arquivamento do AIT, na hipótese estudada.'],
 'O prazo é de expedição, não de recebimento. Há exceção remissiva ao art. 3º, § 5º. A 991/2023 alterou o regime de multa pela não identificação: não reproduzir o artigo correspondente só pelo PDF original.',
 'Fora da exceção indicada, o órgão só expede a NA 40 dias depois do cometimento da infração.',
 'Qual efeito prevê o art. 4º, § 1º?', 'Arquivamento do AIT pela não expedição no prazo de trinta dias.',
 'A NA foi expedida em prazo regular, mas o proprietário a recebeu depois.', 'O recebimento posterior, sozinho, não comprova descumprimento do prazo de expedição; analisar os eventos corretos.')
add(917,'Madeira: a fronteira de 2,50 metros','Arts. 2º–4º',
 ['Tora é madeira bruta com comprimento superior a 2,50 m.', 'Toras seguem transporte longitudinal com as disposições previstas.', 'Madeira bruta de até 2,50 m pode ser transportada longitudinal ou transversalmente, cumpridas as condições próprias.'],
 'Não classificar madeira de exatamente 2,50 m como “superior a 2,50 m”. A orientação permitida não dispensa contenção e amarração.',
 'A carga contém madeira bruta de exatamente 2,50 metros de comprimento.',
 'Ela é tora pela definição desta resolução?', 'Não. A definição exige comprimento superior a 2,50 m; o caso está no recorte do art. 4º.',
 'O comprimento passa a 2,60 metros.', 'Entra na definição de tora e no regime de transporte longitudinal do art. 3º.')
add(916,'Modificação: autorização, CAT e CSV têm funções próprias','Arts. 3º–4º; alterações 958/2022 e 1021/2026 com retificação',
 ['Modificação em veículo registrado exige autorização prévia da autoridade responsável.', 'Novo código/CAT e inspeção/CSV dependem das hipóteses dos anexos.', 'O Anexo IV deve ser lido com a 1021/2026; a observação 9 do Anexo V foi revogada pela 958/2022.'],
 'Não transformar emissão de CSV em autorização automática para qualquer modificação. A 1021/2026 teve ementa retificada; consultar o ato relacionado para o Anexo IV atual.',
 'Um proprietário realiza a modificação e só depois solicita a autorização para o veículo já registrado.',
 'A ordem atende ao art. 4º, I?', 'Não. A autorização exigida deve ser prévia, e as demais exigências dependem da modificação.',
 'A autorização foi obtida, mas a modificação exige inspeção e CSV segundo o anexo aplicável.', 'A autorização não dispensa a inspeção e o documento de segurança exigidos para aquele caso.')
add(915,'ABS e CBS: funções diferentes na frenagem','Art. 3º, I–II; art. 4º',
 ['ABS evita o travamento das rodas durante a frenagem.', 'CBS distribui proporcionalmente a força de frenagem entre as rodas.', 'A exigência e as alternativas dependem do tipo de veículo e dos requisitos aplicáveis.'],
 'Os dois sistemas não são sinônimos. A definição não autoriza substituir qualquer ABS por CBS; cronogramas e categorias precisam ser conferidos no dispositivo próprio.',
 'Uma questão define como ABS o sistema cuja função descrita é distribuir proporcionalmente a força de frenagem entre as rodas.',
 'A definição corresponde ao art. 3º?', 'Não. A descrição é de CBS. O ABS tem como finalidade evitar o travamento das rodas.',
 'O sistema evita travamento por sensores e unidade de comando.', 'Essa é a função de ABS, sem que a identificação da função dispense os requisitos técnicos aplicáveis.')

if __name__ == '__main__':
    assert len(guides) == 50
    Path('docs/library/contran-guides-authored-2026-10-12-batch02.json').write_text(
        json.dumps(guides,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(len(guides),'explicit guides;',sum(not g['historical'] for g in guides.values()),'for current study')
