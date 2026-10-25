"""Explicit article reviews from the current official source; never approve unlisted units."""
import json
from pathlib import Path

P = 'https://www.planalto.gov.br/ccivil_03/'
STF = 'https://noticias.stf.jus.br/postsnoticias/stf-reune-ministerio-publico-e-defensorias-publicas-para-discutir-lei-antifaccao/'
units = {}

def add(n, simples, pontos, atencao, exemplo, prova, refs=()):
    units[f'art-{n}'] = dict(simples=simples, pontos=pontos, atencao=atencao, exemplo=exemplo,
                            prova=prova, termos=[], remissoes=list(refs))

add(3,
    'Favorecimento ao domínio social estruturado pune promover, fundar, aderir ou apoiar os agrupamentos definidos na lei, além das condutas específicas de incitação, armas/explosivos, uso de local, informações e falsa vinculação. A pena literal é reclusão de 12 a 20 anos e multa. Nos incisos II a V, observe o vínculo com os atos do art. 2º; no VI, a falsa alegação deve buscar vantagem ou intimidação.',
    ['No inciso II, exige-se intenção de incitar: divulgar notícia sobre a facção não equivale, sozinho, ao tipo.', 'O inciso VI alcança falsa alegação de pertencimento; não exige vínculo verdadeiro.', 'O parágrafo único remete aos §§4º a 8º do art. 2º, não ao §9º sobre preventiva.'],
    ['Não presumir dolo, apoio criminoso ou adesão a partir de contato social, profissão ou local de residência. A existência de crime depende dos elementos da conduta.', 'A lei é objeto das ADIs 7952, 7956, 7957 e 7958; este estudo da literalidade não resolve o controle constitucional.'],
    'Um agente finge integrar uma facção para intimidar um comerciante e obter dinheiro: a falsa vinculação é hipótese expressa do inciso VI, a ser demonstrada no caso. Variação: um jornalista reproduz notícia sem intenção de incitar; a divulgação isolada não preenche a intenção do inciso II.',
    ['É necessário pertencer realmente ao grupo para o inciso VI? Não; ele trata de alegação falsa para obter vantagem ou intimidar.', 'O art. 3º remete expressamente ao §9º do art. 2º? Não; a remissão termina no §8º e não autoriza preventiva automática.'], ['Art. 2º', 'Art. 4º', STF])

add(4,
    'O artigo classifica como hediondos os crimes nele indicados e determina aplicação, no que couber, das disposições materiais da Lei 12.850 às formas especiais de organização criminosa. Hediondez não elimina a prova dos elementos do tipo, a individualização da pena ou o controle judicial.',
    ['O texto remete ao caput e aos §§1º e 3º do art. 2º e ao art. 3º.', 'O §3º do art. 2º foi vetado: a remissão residual não cria um crime nesse parágrafo.', 'O parágrafo único também menciona CP 288-A; aplicação no que couber não é identidade integral dos regimes.'],
    ['Não inventar conteúdo para dispositivo vetado nem concluir que hediondez impõe prisão ou regime fechado automaticamente. Progressão exige leitura da LEP vigente.', 'A classificação legal e sua discussão constitucional são planos distintos.'],
    'Ao estudar a lista, a candidata encontra referência ao art. 2º, §3º, mas o parágrafo está vetado: não há conduta a memorizar ali. Variação: reconhecer a hediondez de um delito não dispensa o exame dos requisitos de uma medida cautelar.',
    ['Uma remissão ao parágrafo vetado permite inventar o crime ausente? Não; veto não fornece tipo penal aplicável.', 'A expressão no que couber autoriza copiar toda regra de outra lei sem exame? Não; exige compatibilidade com a hipótese e com o regime próprio.'], ['Art. 2º', 'Lei nº 12.850/2013', 'Lei nº 7.210/1984'])

add(5,
    'O inquérito dos crimes desta lei tem prazos próprios: 90 dias com indiciado preso e 270 dias solto, prorrogável por igual período. O juiz decide em 15 dias desde a conclusão dos autos; o MP opina em 5 dias desde o recebimento. Na urgência ou no risco de ineficácia, manifestação e decisão têm prazo simultâneo de 24 horas, admitida manifestação posterior.',
    ['Simultâneo significa que não se somam 24 horas do MP a outras 24 do juiz.', 'Indeferimento da representação, sem recurso do MP: delegado pode provocar a instância ministerial superior em 48 horas; ela delibera no mesmo prazo, conforme a Lei Orgânica.', 'Aplicação ao procedimento investigatório do MP ocorre no que couber.'],
    ['O §4º afasta relaxamento automático pelo mero descumprimento do prazo; não autoriza prisão indefinida nem afasta controle concreto de excesso de prazo.', 'Prazo de inquérito não é prazo de prisão temporária nem substitui requisitos da preventiva.'],
    'Na urgência, a representação chega ao órgão competente: não se deve calcular um total automático de 48 horas para parecer e decisão. Variação: ultrapassar 90 dias com indiciado preso exige examinar prorrogação e circunstâncias; não produz, sozinho, nem soltura automática nem autorização ilimitada para mantê-lo preso.',
    ['Na urgência, os prazos de 24 horas se somam? Não; o §3º os define como simultâneos.', 'O §4º elimina todo controle judicial de excesso de prazo? Não; exige avaliação das circunstâncias concretas e não legitima custódia indefinida.'], ['Art. 9º', STF])

add(6,
    'Forças-tarefa permitem investigação, persecução e inteligência coordenadas, preservando competências constitucionais e independência funcional. Um termo de cooperação fixa objetivos, área, prazos, chefia e critérios de sigilo e intercâmbio. Compartilhar dados e apoio não transfere automaticamente atribuições de um órgão a outro.',
    ['O sigilo restringe informação operacional às pessoas necessárias; medidas judiciais continuam sujeitas às formalidades legais.', 'MPF, MPs estaduais e distrital, Gaecos e equivalentes podem participar, preservada a independência funcional.', 'O §5º trata do eventual descumprimento deste artigo, não de licença geral para produzir prova ilícita.'],
    ['Não ampliar a regra de ausência de nulidade para interceptação ilegal, tortura ou violação de garantias constitucionais.', 'Integração administrativa não substitui reserva de jurisdição ou competência legal.'],
    'PF e órgão estadual formalizam objetivos e acesso restrito para uma operação conjunta. Variação: faltar uma formalidade de cooperação não torna lícita uma interceptação sem a autorização exigida por lei; são problemas jurídicos distintos.',
    ['A força-tarefa apaga as competências constitucionais dos órgãos? Não; o caput determina que sejam observadas.', 'O §5º autoriza qualquer método ilegal de investigação? Não; sua referência ao descumprimento do artigo não afasta as demais garantias.'], ['Art. 7º', 'Art. 8º'])

add(7,
    'Se a conduta for transnacional ou envolver cooperação de organizações estrangeiras, a União, por seus órgãos competentes, pode celebrar e executar acordos policiais ou de inteligência. As finalidades incluem investigação, persecução, extradição, recuperação de ativos e combate ao crime organizado internacional.',
    ['Caráter transnacional OU cooperação com organizações estrangeiras são hipóteses alternativas do caput.', 'Tratados, convenções e reciprocidade delimitam a cooperação.', 'Poder celebrar acordo não significa obter automaticamente extradição ou bens no exterior.'],
    ['Cooperação internacional não autoriza agente brasileiro a ignorar soberania, direitos fundamentais ou requisitos do procedimento aplicável.'],
    'Uma investigação identifica ativos ligados ao grupo em outro país e aciona o mecanismo de cooperação competente. Variação: a existência de um acordo não dispensa os requisitos próprios para extraditar uma pessoa.',
    ['O acordo torna automática a extradição? Não; o artigo prevê cooperação, sujeita aos instrumentos e procedimentos pertinentes.', 'A cooperação só pode ter finalidade de prisão? Não; inclui inteligência e recuperação de ativos, entre outras finalidades.'], ['Art. 14º'])

add(8,
    'Na apuração e na instrução, aplicam-se, no que couber, os meios investigatórios e de obtenção de prova do Capítulo II da Lei 12.850 e as disposições da Lei 9.613. A remissão não dispensa requisitos próprios de colaboração, infiltração, acesso a informações ou medidas patrimoniais.',
    ['A lei remete a regimes existentes; não cria autorização irrestrita para todas as técnicas.', 'Distinguir informação de inteligência, meio de obtenção de prova e prova submetida ao contraditório.'],
    ['Aplicação no que couber exige compatibilidade. Não presumir renúncia ao silêncio, dispensa de corroboração ou afastamento de reserva judicial.'],
    'A equipe considera infiltração para investigar o grupo e consulta as condições específicas da Lei 12.850. Variação: apenas invocar o art. 8º não supre autorização ou fundamentação exigidas pela técnica.',
    ['A remissão elimina os requisitos da técnica investigatória? Não; os instrumentos conservam seu regime próprio.', 'A Lei 9.613 também é mencionada? Sim; a aplicação deve respeitar a hipótese concreta.'], ['Art. 32º', 'Lei nº 12.850/2013', 'Lei nº 9.613/1998'])

add(9,
    'Medidas assecuratórias dependem de indícios suficientes dos crimes dos arts. 2º e 3º e de fundamentação de necessidade, adequação e proporcionalidade. O rol alcança bens, ativos digitais, atividades e serviços, além de outras restrições. O artigo combina cautela patrimonial, defesa da origem lícita, uso provisório, alienação e perdimento extraordinário: não são uma única etapa automática.',
    ['O contraditório pode ser diferido; intimado, o investigado ou acusado tem 10 dias para apresentar ou requerer provas da origem lícita.', 'A liberação de armas segue legislação específica, mesmo quando comprovada a origem lícita.', 'Custódia pelo poder público é a regra; exceção técnica/material e nomeação de pessoa ligada ao investigado exigem decisão fundamentada.', 'Lesado e terceiro de boa-fé têm proteção expressa contra o perdimento extraordinário.'],
    ['O §8º prevê perdimento independente de condenação quando clara a origem ilícita. Isso é texto legal controvertido, não autorização para confisco sem processo nem conclusão sobre as ADIs.', 'O §12º prevê até 3 dias úteis, juros e condições para devolução na absolvição; sua remissão literal ao §7º não deve ser corrigida ou ampliada silenciosamente.', 'Afastamento cautelar remunerado do inciso VII não é o afastamento automático por indiciamento já invalidado em outra lei.'],
    'Um bloqueio atinge criptoativos e a pessoa intimada apresenta prova da origem lícita dentro de 10 dias; o juiz deve examinar o pedido e as ressalvas. Variação: a autoridade não pode tratar um terceiro de boa-fé como destinatário automático do perdimento extraordinário.',
    ['Os 10 dias para apresentar provas correm de qual marco? Da intimação, conforme o §6º.', 'A previsão de perdimento extraordinário dispensa proteção do terceiro de boa-fé? Não; o §9º contém ressalva expressa e o instituto continua sujeito ao devido processo.'], ['Art. 10º', 'Art. 12º', STF])

add(10,
    'Havendo indícios concretos de benefício de uma pessoa jurídica pelo agrupamento, o juiz determina intervenção cautelar e afastamento dos sócios mediante pedido do MP ou representação do delegado. Busca-se interromper a atividade criminosa, preservar empregos e contratos de boa-fé e assegurar destino lícito dos bens, sem confundir cautela com condenação definitiva.',
    ['Interventor idôneo e tecnicamente qualificado: 6 meses, renováveis por iguais períodos se persistirem as razões.', 'Contas ao juízo e ao MP são trimestrais; não confundir com o prazo semestral da intervenção.', 'A venda antecipada pode ocorrer se houver valor econômico lícito ou possibilidade de saneamento, com quitação de passivos legítimos.', 'Investigação local: fundo estadual/DF; PF: FNSP; atuação conjunta: partes iguais. Tráfico de drogas conserva seu regime e fundo próprios.'],
    ['Suspender contratos públicos exige decisão judicial ou administrativa fundamentada; atingir outra empresa exige comprovar sua utilização criminosa.', 'Restituir aos sócios de boa-fé, liquidar e decretar perda total são desfechos distintos do §10º; não presumir liquidação pela simples investigação.'],
    'Uma empresa ainda viável entra em intervenção por 6 meses e presta contas ao fim do trimestre. Variação: se os ativos envolverem tráfico de drogas, não se aplica automaticamente a divisão patrimonial geral deste artigo.',
    ['Prestação trimestral de contas significa intervenção de apenas 3 meses? Não; são marcos diferentes: contas a cada trimestre e administração inicialmente por 6 meses.', 'O patrimônio de tráfico segue automaticamente a destinação geral? Não; o §11º preserva o regime jurídico específico.'], ['Art. 11º', STF])

add(11,
    'Depois do trânsito em julgado da condenação pelos arts. 2º ou 3º, e se não ocorreu perdimento extraordinário, o artigo prevê desarticulação financeira definitiva. Reúne perda de bens, confisco ampliado, dissolução/liquidação, restrições e comunicações. A prova da origem ou destinação ilícita e os requisitos de cada hipótese não desaparecem por haver condenação.',
    ['O confisco ampliado considera os 5 anos anteriores ao fato criminoso, não os anteriores à sentença.', 'Responsabilidade de quem recebeu benefício patrimonial é limitada ao proveito obtido no inciso VIII; não é pena criminal herdada.', 'Uso provisório depende de autorização do juiz da execução.', 'O inciso VI usa a expressão proibição definitiva, mas também fixa prazo mínimo de 12 a 15 anos desde o trânsito; estudar a tensão textual sem inventar uma duração única.'],
    ['Não transformar responsabilidade patrimonial sucessória em transmissão de pena criminal. O artigo está sujeito a controle constitucional.', 'Distinguir destinação e competência; a existência de ativos de tráfico exige confrontar o regime específico protegido no art. 10, §11º.'],
    'A condenação transita em julgado e são examinados bens incompatíveis com a renda nos 5 anos antes do fato. Variação: um sucessor que recebeu benefício não responde automaticamente por todo patrimônio ilícito ou pela pena do condenado; examinam-se o limite patrimonial e as garantias aplicáveis.',
    ['O período do inciso II é contado retroativamente da sentença? Não; o texto toma como marco o fato criminoso.', 'O inciso VIII autoriza cobrar qualquer valor de qualquer herdeiro? Não; exige benefício e limita a responsabilidade ao proveito, sem transmitir pena criminal.'], ['Art. 10º', 'Art. 12º', STF])

add(12,
    'A ação civil autônoma busca extinguir direitos sobre produto, proveito ou bens relacionados à atividade ilícita e transferi-los ao ente competente, sem indenização pelo perdimento declarado. Pode alcançar coisas, direitos incorpóreos e frutos. Se produto/proveito não for encontrado ou estiver no exterior, admite-se valor equivalente.',
    ['O §3º enuncia imprescritibilidade; isso é a redação da lei, não afirmação de jurisprudência consolidada.', 'Autonomia civil não elimina as ressalvas dos arts. 13 e 17 nem a defesa no processo.'],
    ['Não confundir perda civil com indenização criminal, apreensão policial imediata ou pena automática.', 'A validade e o alcance constitucional da imprescritibilidade precisam de exame judicial; não generalizar essa regra para todas as ações civis.'],
    'Produto de crime do regime está no exterior e a ação pede valor equivalente, demonstrando o vínculo legal. Variação: esse mecanismo não converte todo patrimônio legítimo da pessoa em bem confiscável nem elimina a proteção do lesado e do terceiro de boa-fé.',
    ['A ação prevista aqui se limita a objetos físicos? Não; o §1º inclui direitos e frutos de coisas corpóreas e incorpóreas.', 'A literalidade da imprescritibilidade prova que toda ação civil é imprescritível? Não; o dispositivo é específico e sua aplicação está sujeita ao controle constitucional.'], ['Art. 13º', 'Art. 17º', STF])

add(13,
    'As hipóteses de perda civil exigem vínculo do bem com os crimes desta lei: origem, uso instrumental, relação/destinação, ocultação ou negócio com os bens abrangidos. Transferir o bem a terceiro não afasta, por si só, o perdimento, mas a lei protege o lesado e o terceiro de boa-fé sem condições de conhecer a situação ilícita.',
    ['Bem substituído por permuta ou venda pode integrar a hipótese do inciso V.', 'A ressalva de boa-fé exige examinar as circunstâncias e a natureza do negócio; não presumir ciência nem proteção só pela data do contrato.'],
    ['A compra de um bem não garante imunidade absoluta ao perdimento, assim como o simples parentesco não prova má-fé.'],
    'O titular troca por outro veículo um automóvel relacionado aos crimes do regime: o negócio deve ser examinado pelo inciso V. Variação: adquirente de boa-fé que não tinha condições de conhecer a situação ilícita conta com a ressalva do §2º.',
    ['A transmissão sempre impede a perda civil? Não; o §1º afasta esse efeito automático.', 'A lei protege terceiro de boa-fé? Sim; nas condições específicas do §2º, além da proteção do lesado.'], ['Art. 12º', 'Art. 14º'])

add(14,
    'Bens situados no Brasil podem sofrer perda civil ainda que a atividade ilícita tenha ocorrido no exterior. Quando houver solicitação de autoridade estrangeira e não houver previsão em tratado, bens ou valores da alienação são repartidos em partes iguais entre Brasil e Estado requerente, depois das despesas previstas.',
    ['Situação do bem no Brasil e local da atividade ilícita são fatores diferentes.', 'Deduzir guarda, manutenção, alienação ou devolução antes da divisão.', 'A divisão supletiva pressupõe falta de previsão em tratado, não simples preferência de uma autoridade.'],
    ['Não aplicar a divisão pela metade a toda investigação internacional nem ignorar tratado que discipline a repartição.'],
    'Sem regra em tratado, uma solicitação estrangeira gera R$ 100 mil de alienação e R$ 20 mil de despesas admitidas: o saldo de R$ 80 mil é dividido, R$ 40 mil para cada Estado. Variação: existindo tratado com regra própria, a divisão supletiva não deve ser aplicada mecanicamente.',
    ['A divisão ocorre antes da dedução das despesas? Não; o §2º determina a dedução prévia.', 'Toda perda internacional exige dividir pela metade? Não; é necessário verificar solicitação estrangeira e falta de previsão em tratado.'], ['Art. 7º', 'Art. 12º'])

add(15,
    'MP e órgão de representação judicial da pessoa jurídica legitimada podem instaurar procedimento preparatório da ação de perda civil. Na obtenção de documentos e informações, o MP pode requisitar, enquanto o órgão de representação judicial pode solicitar, observados os sujeitos e dados descritos no parágrafo único.',
    ['Procedimento preparatório ainda não é sentença de perdimento.', 'O prazo assinalado considera urgência e complexidade; o artigo não fixa número geral de dias.', 'Distinguir requisição ministerial de solicitação pela representação judicial.'],
    ['A referência a bancos de dados públicos não é autorização irrestrita para quebrar qualquer sigilo sem o procedimento cabível.'],
    'O órgão de representação judicial solicita informação necessária para instruir o procedimento, com prazo compatível com a perícia. Variação: não se deve trocar a palavra solicitar por requisitar e atribuir a todo participante o mesmo poder.',
    ['O artigo fixa um prazo único de 10 dias para toda diligência? Não; o prazo é assinalado conforme urgência e complexidade.', 'Instaurar o procedimento já transfere a propriedade dos bens? Não; a preparação instrui a ação e não substitui decisão de perda.'], ['Art. 16º', 'Art. 18º'])

add(16,
    'Órgão ou entidade pública que identifique indícios de bens nas hipóteses de perda civil deve comunicar o MP e a representação judicial da pessoa jurídica de direito público à qual está vinculado. Se houver interesse de outra pessoa jurídica de direito público, as informações devem ser compartilhadas com seus órgãos correspondentes.',
    ['O gatilho é indício, não exigência de condenação definitiva.', 'Comunicação não equivale a decisão que confisca o bem.', 'Interesse de outro ente ativa o compartilhamento do parágrafo único.'],
    ['Preservar os controles de acesso e sigilos aplicáveis; comunicar indícios não é expor dados pessoais indiscriminadamente.'],
    'Uma entidade estadual identifica bens aparentemente abrangidos e comunica o MP e a representação judicial do Estado. Variação: se os dados também revelam interesse da União, o parágrafo único determina compartilhar com os órgãos correspondentes.',
    ['O órgão precisa esperar condenação para comunicar indícios? Não; a obrigação nasce da verificação dos indícios descritos.', 'A comunicação administrativa já declara a perda? Não; ela fornece informação ao procedimento competente.'], ['Art. 15º', 'Art. 18º'])

add(17,
    'A perda civil não depende, em regra, da aferição de responsabilidade civil/criminal ou do desfecho das ações correlatas. Há ressalva expressa: sentença penal absolutória que taxativamente reconheça a inexistência do fato. Improcedência definitiva por insuficiência de provas permite outra ação de legitimado com o mesmo fundamento, desde que baseada em nova prova.',
    ['Absolvição por inexistência do fato não se confunde com ausência de prova suficiente de autoria.', 'Nova ação exige nova prova; não basta reapresentar o acervo que fracassou.', 'O dispositivo não permite afirmar que toda absolvição é irrelevante.'],
    ['Estudar a autonomia e a ressalva como redação legislativa, sem declarar resolvidas as controvérsias sobre garantias, coisa julgada e controle constitucional.'],
    'Uma sentença reconhece expressamente que o fato não existiu: a ressalva do caput impede tratar a autonomia como absoluta. Variação: pedido civil fracassou por insuficiência probatória e surge prova nova; a lei prevê nova ação por legitimado.',
    ['O art. 17 manda ignorar toda sentença absolutória? Não; ressalva aquela que taxativamente reconhece a inexistência do fato.', 'É possível repetir a demanda por insuficiência probatória sem prova nova? Não; o parágrafo único exige nova prova.'], ['Art. 25º', STF])

add(18,
    'Podem propor a ação os entes federativos e suas entidades indiretas, o MPF na competência cível federal e MPs estaduais/distrital nos demais casos. Quando não for autor, o MP atua obrigatoriamente como fiscal da ordem jurídica. Nessa atuação pode aditar a inicial e assume a titularidade se houver desistência ou abandono pelo ente legitimado.',
    ['Competência cível federal delimita a legitimidade do MPF indicada no inciso II.', 'MP autor e MP fiscal são posições processuais distintas.', 'Fiscalização obrigatória não torna o MP autor desde o primeiro momento.'],
    ['Não atribuir legitimidade a qualquer particular só por ter informações sobre os bens.'],
    'Um Município propõe a ação e o MP intervém como fiscal. Variação: se o ente abandona a ação, o §2º determina que o MP assuma a titularidade ativa.',
    ['O MP sempre atua exclusivamente como autor? Não; pode ser fiscal quando não propõe a ação.', 'O MP fiscal pode assumir em caso de abandono pelo ente? Sim; é a previsão expressa do §2º.'], ['Art. 19º'])

add(19,
    'A ação é dirigida contra o titular ou possuidor dos bens, direitos ou valores. Para pessoa jurídica estrangeira, preposto, gerente ou administrador presume-se autorizado a receber a citação inicial. Receber citação da empresa não significa responder pessoalmente pelo patrimônio discutido.',
    ['Propriedade e posse são vínculos alternativos para integrar o polo passivo.', 'Citação inicial e condenação são atos distintos.'],
    ['Não confundir representante apto a receber citação com titular do bem ou responsável automático pelo ilícito.'],
    'O gerente recebe a citação inicial de empresa estrangeira conforme a presunção legal. Variação: só receber esse ato não transforma o gerente em proprietário do bem nem prova sua participação no crime.',
    ['Apenas o proprietário formal pode ser réu? Não; o caput também menciona o possuidor.', 'A presunção sobre o gerente é de culpa criminal? Não; trata da autorização para receber a citação inicial.'], ['Art. 20º'])

add(20,
    'Se proprietário ou possuidor não puder ser identificado, a ação terá réus incertos, citados por edital com descrição dos bens. Quem se apresentar como titular pode ingressar no polo passivo e recebe o processo na fase em que está. Aos réus incertos será nomeado curador especial, mesmo na hipótese do ingresso prevista no §1º.',
    ['Desconhecimento do titular não impede propor a ação.', 'O edital deve descrever os bens.', 'Curador especial é garantia processual, não confissão ou prova de ilicitude.'],
    ['Não afirmar que apresentação posterior do titular automaticamente reinicia todo o processo ou dispensa a previsão de curadoria do §2º.'],
    'Um bem sem titular identificável é descrito no edital e há nomeação de curador. Variação: alguém se apresenta depois como titular; ingressa recebendo a causa na fase atual, observada a regra expressa sobre os réus incertos.',
    ['O edital pode omitir a descrição dos bens? Não; o caput a exige.', 'A chegada posterior do titular faz o processo voltar automaticamente ao início? Não; ele o recebe na fase e no estado em que se encontra.'], ['Art. 19º', 'Art. 21º'])

add(21,
    'A ação pode tramitar no foro do local do fato ou do dano. Se esses locais forem desconhecidos, são previstos o foro da situação dos bens ou do domicílio do réu. Propor a ação previne a competência para demandas posteriores com a mesma causa de pedir ou o mesmo objeto.',
    ['Os foros subsidiários pressupõem desconhecimento dos locais do fato/dano.', 'Mesma causa de pedir OU mesmo objeto bastam para a prevenção descrita.'],
    ['Não inverter a ordem legal nem exigir identidade simultânea de causa de pedir e objeto. Respeitar também a competência constitucional aplicável.'],
    'Local do fato conhecido: a equipe examina esse foro ou o do dano. Variação: sendo ambos desconhecidos, considera a situação dos bens ou o domicílio do réu, e não um foro arbitrário.',
    ['Basta o mesmo objeto para a prevenção prevista? Sim; o parágrafo usa a alternativa ou.', 'O domicílio do réu é apresentado como primeira opção incondicional? Não; o artigo o prevê quando fato e dano não forem conhecidos.'], ['Art. 22º'])

add(22,
    'Medidas de urgência podem proteger o resultado da ação a qualquer tempo, mesmo antes de identificar o titular. Se concedidas em caráter preparatório, perdem eficácia quando a ação não é proposta em 365 dias desde a efetivação, prorrogáveis por igual período mediante reconhecimento fundamentado da necessidade.',
    ['O marco é a efetivação da medida, não simplesmente a data do despacho.', 'Prorrogação não é automática e depende de decisão fundamentada.', 'Depois da constrição, o juiz delibera imediatamente sobre alienação antecipada ou administrador; o processo tem prioridade.', 'Liberação e conservação são examinadas caso a caso, respeitados os pressupostos cautelares.'],
    ['Medida preparatória não é perdimento definitivo e não autoriza cautela eterna após cessarem seus pressupostos.'],
    'Uma medida é efetivada hoje: desse marco se examinam os 365 dias para a ação, com eventual prorrogação justificada. Variação: deixar de propor a ação no prazo aplicável não transforma a constrição em propriedade pública; a medida preparatória perde eficácia.',
    ['Os 365 dias começam necessariamente no despacho? Não; o §1º fala em efetivação.', 'A prorrogação por igual período dispensa fundamentação? Não; depende de reconhecimento judicial fundamentado da necessidade.'], ['Art. 23º'])

add(23,
    'Quando necessário, o juiz nomeia pessoa física ou jurídica qualificada para administrar bens submetidos às medidas de urgência. Deve antes ouvir o MP, e a nomeação é acompanhada de termo de compromisso. Administração para conservação não se confunde com aquisição dos bens pelo administrador.',
    ['A necessidade e a qualificação devem ser examinadas.', 'Pessoa jurídica também pode administrar.', 'Ouvir MP não significa delegar a ele a nomeação judicial.'],
    ['Não confundir este administrador de bens com o interventor empresarial do art. 10 ou presumir identidade de remuneração e prazos.'],
    'Um imóvel exige gestão de aluguéis e conservação; o juiz ouve o MP e nomeia entidade qualificada com termo. Variação: se não houver necessidade, a lei não exige contratar administrador para todo bem apreendido.',
    ['Somente pessoa física pode ser nomeada? Não; o artigo admite pessoa física ou jurídica qualificada.', 'A nomeação aqui é obrigatória em todo caso? Não; o artigo condiciona à necessidade.'], ['Art. 24º'])

add(24,
    'O administrador tem remuneração fixada judicialmente de até 10% do valor dos bens envolvidos, satisfeita preferencialmente com seus frutos. Presta contas nos momentos previstos, conserva os bens e pode contratar seguro. Não pode alienar o domínio por sua própria administração; a cessão onerosa de uso é hipótese distinta.',
    ['Até 10% é teto, não taxa fixa obrigatória.', 'Prestação de contas: periodicamente no prazo judicial, na destituição, no encerramento do conhecimento e quando determinada.', 'Na cessão onerosa, seguro pelo cessionário pode ser exigido pelo juiz conforme bem e uso.'],
    ['Não importar as contas trimestrais do interventor do art. 10: neste artigo o prazo periódico é fixado pelo juiz.', 'Ceder uso não transfere propriedade e não elimina a proibição de alienar domínio.'],
    'Administrador aluga temporariamente um bem, nos limites da gestão, sem vender sua propriedade. Variação: não pode decidir vender o bem alegando que o aluguel também envolve terceiro; cessão de uso e alienação de domínio são diferentes.',
    ['A remuneração será sempre exatamente 10%? Não; é teto, cabendo ao juiz fixá-la.', 'O administrador pode vender livremente o domínio do bem? Não; o inciso III veda esse ato no exercício da administração.'], ['Art. 23º', 'Art. 10º'])

add(25,
    'Se o pedido for procedente, o juiz determina as medidas necessárias à transferência definitiva dos bens, direitos ou valores. Se a improcedência decorrer de insuficiência de provas, legitimado pode propor nova ação de fundamento idêntico, desde que instruída com nova prova.',
    ['Procedência autoriza ordenar a transferência definitiva; não confundir com urgência inicial.', 'A exceção de nova demanda é vinculada à insuficiência de provas e à novidade probatória.'],
    ['Não transformar toda improcedência em licença para repetir a mesma demanda indefinidamente com as mesmas provas.'],
    'Pedido fracassa por insuficiência probatória; depois surge documento novo relevante e um legitimado avalia nova demanda. Variação: simplesmente reapresentar a mesma prova não satisfaz o parágrafo único.',
    ['Nova ação por insuficiência probatória exige prova nova? Sim; é condição expressa.', 'Uma cautelar inicial já equivale à transferência definitiva deste artigo? Não; são etapas e pressupostos diferentes.'], ['Art. 17º', 'Art. 27º'])

add(26,
    'A ação tem regime especial de despesas: não há adiantamento geral nem condenação do autor em honorários, custas e despesas, salvo comprovada má-fé. Para perícia, preferem-se peritos públicos; se for imprescindível perito externo, solicitado pelo autor ou de ofício, o ente interessado adianta as despesas, nos termos do §2º.',
    ['Perito público é preferência, não exclusividade absoluta.', 'Ao final, despesas e honorários externos são pagos pelo réu vencido ou pelo ente correspondente.', 'O regime de perícia externa é ressalva específica à regra geral de não adiantamento.'],
    ['Não afirmar que o profissional externo deve trabalhar sem pagamento nem ocultar a exceção de má-fé do autor.'],
    'Uma perícia indispensável requer especialista externo inexistente no quadro público; o ente interessado adianta as despesas da hipótese legal. Variação: se ficar comprovada má-fé do autor, a imunidade geral a honorários e despesas não pode ser invocada.',
    ['É proibido nomear perito fora da administração? Não; a lei admite quando imprescindível.', 'A regra de não adiantamento elimina o §2º sobre perícia externa? Não; existe disciplina específica de adiantamento pelo ente interessado.'], ['Art. 27º'])

add(27,
    'Procedência definitiva incorpora ao ente competente os recursos da perda civil e as multas previstas. Na improcedência, os valores são restituídos ao titular com correção monetária. Destinação depende da hipótese legal; não se presume que todo produto pertence à União.',
    ['União, Estados, DF ou Municípios são possíveis destinatários, conforme o caso.', 'Definitividade da procedência não é equivalente a simples constrição inicial.', 'Correção monetária na restituição não se confunde com multa ao titular.'],
    ['Não confundir esta restituição com as regras específicas de juros e prazo do art. 9, §12º.'],
    'Pedido civil é improcedente e o titular recebe os valores corrigidos. Variação: na procedência definitiva, o ente destinatário deve ser identificado, sem encaminhar automaticamente todo recurso ao fundo federal.',
    ['A improcedência permite restituir apenas o valor nominal? Não; o parágrafo exige correção monetária.', 'Só a União pode receber os recursos? Não; o caput menciona os outros entes, conforme o caso.'], ['Art. 25º', 'Art. 9º'])

add(28,
    'Terceiro que não seja réu na ação penal correlata pode ter retribuição de até 5% do produto da liquidação se espontaneamente fornecer informação/prova efetivamente relevante para o mérito e também colaborar eficazmente na localização dos bens. O juiz fixa a retribuição fundamentadamente na sentença.',
    ['Relevância para os fatos E eficácia na localização são requisitos cumulativos.', 'Até 5% é limite, não pagamento fixo automático.', 'Retribuição patrimonial não é prêmio de colaboração penal ao réu.'],
    ['Não prometer 5% a qualquer denunciante nem remunerar mera informação vaga sem os requisitos.'],
    'Terceiro fora da ação penal fornece espontaneamente prova relevante e ajuda de modo eficaz a localizar ativos. Variação: só repetir notícia genérica sem contribuição efetiva não basta para a retribuição.',
    ['O percentual de 5% é obrigatoriamente fixo? Não; é teto e a sentença deve fundamentar a fixação.', 'Basta dar informação relevante sem colaborar eficazmente na localização? Não; o caput exige ambas as contribuições.'], ['Art. 27º'])

add(29,
    'A lei institui banco nacional e exige bancos estaduais/DF interoperáveis, com atualização local em tempo real. O prazo legislativo é de até 180 dias desde a publicação para regulamentação federal e criação local. O artigo descreve critérios colegiados e uma presunção para fins administrativos, operacionais e de cooperação, não uma condenação criminal.',
    ['O prazo de implementação não é validade individual de cada cadastro.', 'Criação e integração local condicionam convênios, cooperação e repasses voluntários da União no Susp; não generalizar para toda transferência constitucional.', 'O §6º exige inclusão formalizada nos termos do regulamento; cadastro não substitui prova penal.'],
    ['A publicação ocorreu em 25/03/2026; o prazo normativo já decorreu, mas isso não prova que regulamentação, bancos e integração foram efetivamente implantados.', 'Critérios como convívio prisional e a presunção do §6º exigem análise de garantias e controle constitucional; não presumir culpa ou justificar prisão pelo cadastro.'],
    'Um agente consulta registro formalizado para cooperação institucional dentro de suas atribuições. Variação: encontrar um nome no cadastro não autoriza afirmar que os elementos de um crime já foram provados ou que a pessoa deva ser presa.',
    ['Decorrerem 180 dias prova que todos os bancos foram implantados? Não; prazo legislativo e implementação real são fatos diferentes.', 'O cadastro equivale a condenação criminal? Não; o §6º descreve fins administrativos, operacionais e de cooperação, sujeito a garantias e controle.'], [STF])

add(30,
    'O texto exclui a prisão cautelar ou a execução em regime fechado de membro do agrupamento, pelos crimes desta lei, como fato gerador de auxílio-reclusão. O benefício tem destinatários e requisitos previdenciários próprios; não é dinheiro pago diretamente ao preso. Há ainda a regra do art. 2º, §6º, com redação e alcance próprios.',
    ['O art. 30 menciona regime fechado; o art. 2º, §6º, também menciona semiaberto para suas hipóteses.', 'Ler conduta, vínculo e regime do artigo aplicável; não tratar qualquer preso como automaticamente alcançado.'],
    ['A restrição a dependentes envolve discussão constitucional e não é aqui apresentada como tese judicial definitivamente resolvida.', 'Não criar promessa de benefício ou conclusão de indeferimento a partir de um exemplo sem conferir os requisitos previdenciários e decisões aplicáveis.'],
    'Uma questão de prova chama auxílio-reclusão de salário do preso: a premissa está errada, pois o benefício se dirige aos dependentes nas condições previdenciárias. Variação: para estudar a restrição da lei nova, compare os regimes mencionados no art. 30 e no art. 2º, §6º, sem resolver o controle constitucional pela literalidade.',
    ['Auxílio-reclusão é pagamento direto ao preso? Não; a lei previdenciária disciplina benefício aos dependentes nas suas condições.', 'Art. 30 e art. 2º, §6º, têm redação idêntica sobre regimes? Não; o §6º inclui semiaberto, enquanto o art. 30 menciona fechado, além da prisão cautelar.'], ['Art. 2º', P+'leis/l8213cons.htm', STF])

add(31,
    'O regime da lei não afasta retenção, apreensão, perdimento e destinação administrativa por Receita Federal, Banco Central ou outros órgãos com regramento próprio aplicável. Preservar competência administrativa não significa equipará-la ao confisco judicial ou dispensar o procedimento legal de cada órgão.',
    ['Medida administrativa e cautela judicial têm fundamentos e autoridades distintos.', 'Regramento próprio precisa existir e ser aplicável à hipótese.'],
    ['Não usar a cláusula para atribuir poder ilimitado de confisco a qualquer agente público ou impor dupla destinação incompatível do mesmo bem.'],
    'A Receita examina uma infração administrativa sob sua legislação enquanto há investigação penal. Variação: um órgão sem competência ou base normativa não adquire poder de perdimento apenas por invocar o art. 31.',
    ['A lei eliminou todos os regimes administrativos de perdimento? Não; o artigo os preserva nas suas hipóteses.', 'Qualquer órgão pode confiscar sem fundamento próprio? Não; o texto exige regramento aplicável e competências legais.'], ['Art. 9º'])

add(32,
    'O artigo reafirma aplicação, no que couber, dos instrumentos investigatórios e meios de obtenção de prova do Capítulo II da Lei 12.850 aos crimes deste diploma. Não cria nova biblioteca de técnicas nem elimina condições da lei remetida; deve ser lido em conjunto com o art. 8º.',
    ['O Capítulo II é o recorte da remissão.', 'Aplicação compatível não dispensa fundamentação, autorização ou limites próprios de cada técnica.'],
    ['A repetição da remissão não justifica criar dois materiais duplicados nem apresentar uma técnica como ilimitada.'],
    'A investigação utiliza uma técnica prevista na Lei 12.850, conferindo o regime que a disciplina. Variação: citar também o art. 32 não dispensa requisitos que o art. 8º já preservava.',
    ['A remissão alcança instrumentos do Capítulo II? Sim; esse é o recorte expresso.', 'A existência de duas remissões permite ignorar requisitos da técnica? Não; ambas conservam a expressão no que couber.'], ['Art. 8º', 'Lei nº 12.850/2013'])

add(44,
    'A lei entrou em vigor na publicação: 25/03/2026, segundo o registro do DOU indicado no Planalto. A data de assinatura, 24/03/2026, é diferente. Vigência imediata não elimina prazos específicos de regulamentação nem autoriza retroatividade penal mais gravosa.',
    ['Assinatura, publicação, conferência editorial e atualização normativa são datas diferentes.', 'O art. 29 prevê 180 dias para implementação normativa; esse prazo não adia a vigência integral da lei.'],
    ['Não ensinar que todos os sistemas operacionais já existem porque a lei está vigente.', 'Para fato anterior, verificar direito intertemporal; não aplicar automaticamente pena nova mais grave.'],
    'Um fato ocorreu em 24/03/2026: não basta a assinatura nessa data para aplicar retroativamente incriminação mais grave publicada no dia seguinte. Variação: a publicação em 25/03 inicia a vigência, mas não prova que todo sistema previsto já esteja operacional.',
    ['A lei entrou em vigor na data de assinatura, 24/03? Não; o art. 44 fixa publicação, indicada como 25/03/2026.', 'Os 180 dias do art. 29 são vacância geral da lei? Não; são prazo específico, diferente da vigência fixada pelo art. 44.'], ['Art. 29º'])

add(33,
    'Este artigo altera vários dispositivos do CP; sua transcrição de março de 2026 não é o CP completo atual. Reúne efeitos patrimoniais, CNPJ, homicídio, lesão, ameaça, sequestro, furto, roubo, extorsão e receptação no contexto definido. As penas e frações diferem: não existe uma única majorante para todo crime de facção.',
    ['CP 121, §2º-D, e 129, §3º-A: faixa específica de 20 a 40 anos; na lesão, o §8º-A exclui essa hipótese da majorante de 2/3.', 'CP 147-C: 1 a 3 anos; 148, §3º: 12 a 20; 155, §9º: 4 a 10 e multa.', 'CP 157, §4º: triplo do caput, desprezadas as demais causas de aumento; §5º: resultado morte com faixa própria. CP 158, §4º: triplo; 159, §5º, e 180, §8º: aumento de 2/3.', 'CP 92: suspensão de CNPJ por 180 dias; reincidência tem inaptidão e interdição de administrador responsável por 5 anos. CP 180, §5º, foi revogado.'],
    ['O CP atual já contém mudanças posteriores: roubo simples tem caput de 6 a 10 anos pela Lei 15.397/2026. Não usar o antigo mínimo de 4 anos ao estudar a remissão ao triplo, sem conferir tempo do fato.', 'O veto à alteração de CP 91, II, não revogou todo o inciso vigente. Leia o compilado, os requisitos do contexto e o controle constitucional; não presumir agravamento por simples cadastro.'],
    'A candidata compara lesão seguida de morte do §3º-A com outra lesão do §8º-A: a ressalva impede somar automaticamente 2/3 à faixa especial. Variação: no roubo do §4º, o cálculo remete ao caput atual, não a uma pena antiga reproduzida num material de março.',
    ['A majorante de lesão do §8º-A inclui a hipótese do §3º-A? Não; o texto a excepciona expressamente.', 'O art. 33 permite estudar todas as penas pelo mesmo multiplicador? Não; há faixas próprias, triplo e aumento de 2/3, além dos requisitos de cada dispositivo.'], [P+'decreto-lei/del2848compilado.htm', STF])

add(34,
    'O artigo insere no rol de hediondos o domínio social estruturado e seu favorecimento. Deve ser lido com a Lei 8.072 vigente e com os tipos dos arts. 2º e 3º. A remissão ao art. 2º, §3º, permanece no texto, embora esse parágrafo tenha sido vetado.',
    ['A inclusão ocorre no art. 1º, parágrafo único, VIII, da Lei 8.072.', 'O veto não produz tipo penal para preencher a remissão residual.', 'Qualificação como hediondo e requisitos de prisão/progressão são questões diferentes.'],
    ['Não transformar a transcrição em lista completa dos hediondos nem ensinar regime fechado automático.'],
    'O candidato localiza a nova hipótese no inciso VIII do parágrafo único, sem confundi-la com os incisos do caput. Variação: a referência a um parágrafo vetado não permite formular questão sobre um crime que não foi criado ali.',
    ['A hipótese entrou no caput ou no parágrafo único da Lei 8.072? No parágrafo único, inciso VIII.', 'A menção ao §3º vetado cria conduta punível nesse trecho? Não; a remissão residual não substitui o tipo ausente.'], ['Art. 4º', P+'leis/l8072.htm'])

add(35,
    'A alteração da LEP envolve monitoramento de visitas, controle judicial separado de comunicação advogado-cliente, transferência de presos e progressão. Estude os dispositivos vigentes da LEP, não a transcrição como tabela completa. Os percentuais de 70%, 75%, 80% e 85% correspondem a hipóteses distintas, não a todo preso ou a qualquer reincidência.',
    ['LEP 41-B: razões fundadas de conluio criminoso reconhecidas judicialmente; análise exclusiva por juízo de controle distinto do juízo da instrução/julgamento. Conteúdo ilícito ou indeferido não pode chegar direta ou indiretamente à instrução.', 'LEP 86: decisão em 24 horas; transferência administrativa excepcional por risco iminente e grave deve ser imediatamente comunicada, para decisão sobre destinos em 24 horas.', 'LEP 112, V: 70% para primário em hediondo/equiparado; VI: 75% para suas hipóteses; VII: 80% na reincidência indicada; VIII: 85% na reincidência com resultado morte.', 'A LEP atual também contém mudanças posteriores da Lei 15.402/2026; a transcrição não esgota caput, incisos e requisitos subjetivos.'],
    ['Comunicação com a defesa não é gravável livremente: há condições específicas, sigilo profissional e discussão constitucional.', 'Percentuais materiais mais gravosos não retroagem automaticamente a fatos anteriores. Tráfico privilegiado tem ressalva expressa na LEP 112, §5º; não o classificar como hediondo por essa tabela.'],
    'Gravação fundada em suspeita judicialmente reconhecida de conluio passa pelo juízo de controle antes de eventual envio à instrução. Variação: a administração não pode entregar toda conversa com advogado ao julgador como se a mera condição de preso afastasse o sigilo.',
    ['O juízo da instrução pode acessar conteúdo declarado ilícito? Não; o art. 41-B, §3º, veda acesso direto e indireto.', 'O percentual de 70% vale para todo condenado? Não; o inciso V tem hipótese própria, e as outras regras e requisitos devem ser conferidos.'], [P+'leis/l7210.htm', STF])

add(36,
    'O novo art. 40-A da Lei de Drogas dobra as penas dos arts. 33 a 37 quando preenchidos vínculo ao agrupamento e contexto/finalidade do regime novo. O parágrafo único prevê concurso material quando o crime é praticado com arma de fogo, independentemente das relações com a mercancia nele descritas. Essa alteração não certifica toda a Lei de Drogas nem resolve sozinha controvérsias de concurso.',
    ['O intervalo é arts. 33 a 37, não toda a Lei 11.343.', 'Dobro não é aumento de 2/3: o art. 37 da Antifacção altera outro diploma.', 'A Lei de Drogas compilada conserva a alteração no art. 40-A.'],
    ['Número de integrantes, presença no território ou apreensão de arma, isoladamente, não provam todos os elementos do caput.', 'Não reproduzir como universal a antiga absorção da arma pelo tráfico nem impor dupla valoração automática; examinar lei aplicável ao fato e controle judicial.'],
    'Para aplicar o dobro ao crime do art. 33, o caso deve demonstrar os elementos do art. 40-A, além do próprio tráfico. Variação: um exercício que dobra a pena de qualquer usuário ou qualquer infrator da Lei de Drogas amplia indevidamente os arts. 33 a 37.',
    ['O art. 40-A dobra automaticamente a pena de qualquer artigo da Lei de Drogas? Não; o caput delimita arts. 33 a 37 e os demais requisitos.', 'Dobro equivale ao aumento de 2/3 do Estatuto do Desarmamento? Não; são frações e hipóteses distintas.'], [P+'_ato2004-2006/2006/lei/l11343.htm', 'Art. 37º', STF])

add(37,
    'A alteração cria o art. 21-A do Estatuto do Desarmamento: aumento de 2/3 nos crimes dos arts. 12, 14 e 16, nas hipóteses descritas de concurso com delito de drogas, ligação à mercancia ou uso do artefato para assegurar seu sucesso. A redação precisa ser confrontada com os fatos, sem substituir sua análise por fórmula genérica.',
    ['O rol é arts. 12, 14 e 16; não inclui indistintamente todos os crimes de armas.', 'Aumento de 2/3 leva, no cálculo isolado, a cinco terços da base, e não ao dobro.', 'Não transportar para este artigo o mínimo numérico das definições associativas nem inventar elemento que seu texto não enuncia.'],
    ['A relação entre concurso, vínculo com tráfico e utilização deve ser analisada no caso; esta explicação não anuncia interpretação judicial definitiva da lei nova.', 'Arma de uso permitido, restrito e proibido têm enquadramentos próprios; a majorante não substitui a definição do crime-base.'],
    'Uma questão afirma que a nova regra alcança indistintamente todos os delitos do Estatuto: o rol legal é mais restrito. Variação: calcular aumento de 2/3 como se fosse dobro confunde essa regra com o art. 40-A da Lei de Drogas.',
    ['O art. 21-A lista também todos os demais crimes do Estatuto? Não; lista expressamente os arts. 12, 14 e 16.', 'Aumento de 2/3 e dobro produzem o mesmo fator? Não; isoladamente são cinco terços e duas vezes a base, respectivamente.'], [P+'leis/2003/l10.826compilado.htm', 'Art. 36º'])

add(38,
    'A transcrição altera custódia por videoconferência, competência em homicídios do contexto especial, admissão da preventiva e efeitos de recurso em sentido estrito. No CPP atual, a hipótese nova do art. 313, V, convive com os requisitos do art. 312 e com a vedação de antecipar pena. Admissibilidade não é prisão automática.',
    ['Custódia: 24 horas desde a prisão, presença da defesa e MP, entrevista prévia reservada e privacidade na oitiva.', 'CPP 310, §11º: falha atribuível ao tribunal ou provedor contratado exige repetição completa, sem convalidar ato incompleto.', 'CPP 584, §4º: efeito suspensivo ou ativo pode ser requerido ao tribunal com os requisitos descritos; não se concede automaticamente.', 'Exceção textual à prevalência do júri deve ser confrontada com a garantia constitucional e o controle judicial, não tratada como tese constitucional resolvida.'],
    ['Videoconferência não elimina defesa técnica, entrevista inviolável nem decisão fundamentada. A forma da custódia também é debatida nas ADIs.', 'O CPP recebeu mudanças posteriores, inclusive art. 313, VI, pela Lei 15.487/2026: esta transcrição não é o rol atual completo.', 'CPP 312, §4º, veda gravidade abstrata como fundamento; CPP 313, §2º, veda preventiva como efeito imediato de investigação ou denúncia.'],
    'A transmissão falha por problema do provedor contratado pelo tribunal: o §11º prevê repetição completa da audiência. Variação: citar o art. 313, V, sem demonstrar os requisitos cautelares não transforma a admissão legal em prisão obrigatória.',
    ['A hipótese do art. 313 substitui todos os requisitos do art. 312? Não; o caput do art. 313 os preserva, e há vedação de antecipar pena.', 'A falha imputável ao tribunal autoriza convalidar um ato incompleto? Não; o §11º determina repetição completa.'], [P+'decreto-lei/del3689compilado.htm', P+'constituicao/constituicao.htm', STF])

add(39,
    'As alterações na Lei de Lavagem distinguem destinação conforme competência federal, estadual ou distrital. Depósito, incorporação após condenação e perda após trânsito têm etapas próprias. Lesado e terceiro de boa-fé conservam direitos ressalvados; instrumentos sem valor podem ser inutilizados ou doados quando houver interesse de conservação.',
    ['Justiça Federal: destinação à União; Justiça estadual/DF: ao respectivo ente, nas hipóteses legais.', 'A regulamentação de destinação respeita a competência e, nos processos locais, a preferência dos órgãos com funções correspondentes.', 'Não é autorização para destinar todo valor a qualquer entidade escolhida livremente.'],
    ['A transcrição não altera a invalidade do afastamento automático por indiciamento do art. 17-D, reconhecida na ADI 4911.', 'Distinguir bem apreendido de perda definitiva e preservar direitos de boa-fé.'],
    'Num processo estadual, os depósitos e a perda seguem o regime do ente correspondente, não uma transferência automática à União. Variação: existir investigação de lavagem não afasta por si o direito de um terceiro de boa-fé sobre o bem.',
    ['Toda perda prevista na Lei de Lavagem é destinada indistintamente à União? Não; a competência federal, estadual ou distrital importa.', 'A alteração tornou válido o afastamento automático do art. 17-D? Não; não elimina a declaração de inconstitucionalidade já registrada.'], [P+'leis/l9613.htm', 'Lei nº 9.613/1998, art. 17-D'])

add(40,
    'A lei inseriu no Código Eleitoral impedimento de alistamento enquanto houver recolhimento prisional, mesmo sem condenação definitiva, e prisão provisória como causa de cancelamento. São enunciados legais que precisam ser separados das garantias constitucionais: CF 15, III, vincula suspensão de direitos políticos à condenação transitada em julgado, enquanto durarem seus efeitos.',
    ['Código Eleitoral 5, IV, trata de alistamento; 71, VI, de cancelamento. Não são a mesma operação.', 'Não confundir prisão cautelar com condenação definitiva.', 'A presença dos trechos no compilado não resolve sua validade constitucional.'],
    ['Não ensinar que todo preso provisório perdeu definitivamente direitos políticos nem gerar exercício automático que confirme essa afirmação.', 'O andamento processual completo das ADIs não foi acessível na conferência; este lote não certifica liminar, suspensão ou tese de mérito para esse dispositivo.'],
    'Uma pergunta chama a prisão provisória de condenação transitada em julgado: há erro conceitual, independentemente da alteração legal. Variação: ao estudar a nova causa de cancelamento, é necessário explicitar a tensão com CF 15, III, em vez de anunciar que a controvérsia acabou.',
    ['Prisão provisória equivale a condenação transitada em julgado? Não; são situações processuais diferentes.', 'A mera transcrição da alteração prova que sua constitucionalidade está resolvida? Não; é preciso distinguir texto legislativo, Constituição e decisões aplicáveis.'], [P+'leis/l4737compilado.htm', P+'constituicao/constituicao.htm', STF])

add(41,
    'O FNSP permanece gerido pelo Ministério da Justiça e Segurança Pública e recebe novos objetivos de combate integrado e qualificação prisional. A transcrição altera conselho e destinações, mas deve ser lida no diploma atual: uma parcela de recursos tem aplicação descentralizada e vinculação específica, não livre distribuição de todo o fundo.',
    ['Os incisos XIII a XV do art. 5º da Lei 13.756 abrangem estrutura prisional, tecnologia e operações integradas.', 'Pelo menos 60% refere-se à fonte do art. 3º, II, c, não a 60% de todas as receitas.', 'Na transferência fundo a fundo dessa parcela, exige-se subconta específica e vedação de transposição para outras finalidades.', 'Entre 10% e 15% do FNSP têm destinação aos programas previstos no §1º; não confundir esse intervalo com a regra dos 60%.'],
    ['A MP 1.394/2026 alterou o regime de apostas e receitas em setembro; receitas e destinações exigem confronto com o texto atual e as disposições de transição.', 'Prazo de conferência editorial não é data de atualização normativa; a consulta de hoje não transforma todas as regras em normas novas.'],
    'O ente recebe transferência vinculada à parcela específica e mantém os valores em subconta para as ações previstas. Variação: usar o percentual de 60% sobre toda receita do fundo ou transferir a verba para finalidade alheia amplia indevidamente a regra.',
    ['A regra de 60% incide sobre todas as receitas do FNSP? Não; o §5º identifica uma fonte específica.', 'A subconta vinculada pode ser transposta livremente para outras ações? Não; o §6º veda essa utilização e transposição.'], [P+'_ato2015-2018/2018/lei/l13756.htm', P+'_Ato2023-2026/2026/Mpv/mpv1394.htm'])

add(42,
    'Este artigo mostra as alterações de março na Lei de Apostas, mas já há mudança posterior: MP 1.394, publicada em 25/09/2026. O compilado atual do art. 21-A inclui comunicação ao Coaf, perdimento administrativo com contraditório/ampla defesa e destinação ao FNSP. A MP também revoga dispositivos e preserva aplicação transitória; não estudar todo o fragmento de março como regime completo atual.',
    ['O art. 21-A exige constatação pela autoridade competente e procedimentos regulamentares; bloqueio não elimina ressarcimento de apostadores.', 'Os arts. 24-A a 24-C tratam de interoperabilidade, risco, mecanismos Pix e diligência reforçada, com requisitos de regulamentação.', 'A MP 1.394, art. 29, revoga, entre outros, arts. 25 a 40 da Lei 14.790; por isso as alterações de arts. 39 e 40 aqui reproduzidas não devem ser ensinadas como regime geral atual sem a ressalva transitória.', 'O prazo legislativo de 60 dias para normas no art. 24-A, §3º, não prova implantação técnica efetiva.'],
    ['O art. 29, parágrafo único, da MP conserva aplicação a fatos durante autorizações e obrigações transitórias descritas. Separar revogação geral, fatos anteriores e transição.', 'MP é ato sujeito a conversão, perda de eficácia ou outros eventos; não chamar a MP 1.394 de lei convertida sem conferência. Esta leitura não certifica todas as normas operacionais do BC/MF.'],
    'O estudante compara o art. 21-A de março com o atual e encontra comunicação ao Coaf e perdimento em processo administrativo acrescentados em setembro. Variação: para fatos ligados a autorizações anteriores, deve examinar a transição da MP, sem aplicar indiscriminadamente a revogação ou o texto antigo.',
    ['O fragmento de março contém todas as regras atuais do art. 21-A? Não; a MP 1.394 trouxe modificações posteriores em setembro de 2026.', 'A revogação autoriza ignorar toda regra para fatos e autorizações anteriores? Não; o art. 29, parágrafo único, da MP contém disciplina transitória específica.'], [P+'_ato2023-2026/2023/lei/l14790.htm', P+'_Ato2023-2026/2026/Mpv/mpv1394.htm'])

if __name__ == '__main__':
    destination = Path('scripts/explicacoes/antifaccao-procedimentos-revisao-aplicada-2026-10-12.json')
    destination.write_text(json.dumps(dict(course_slug='antifaccao', units=units), ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(len(units), 'explicitly authored units')
