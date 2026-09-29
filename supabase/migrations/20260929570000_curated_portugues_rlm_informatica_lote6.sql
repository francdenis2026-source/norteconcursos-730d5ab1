-- Curated (authored) questions, lote 6: Língua Portuguesa, Raciocínio
-- Lógico, Informática e Estatística. Same authoring approach as prior
-- lotes: original content only, no reproduction of any source text.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Crase — casos especiais',
  $q$Julgue o item a seguir.
Em "Ele age à moda dos antigos investigadores", o acento indicativo de crase está correto, pois a expressão "à moda de" é uma locução adverbial feminina consagrada pelo uso, que admite o artigo antes de "moda".$q$,
  'C',
  $q$Certo. Locuções adverbiais femininas formadas por "à(s)" mais um substantivo feminino — como "à moda de", "às pressas", "à vontade" — são consagradas pelo uso da língua e recebem o acento indicativo de crase mesmo sem seguir estritamente a regra de "preposição a + artigo a" explícita a cada caso: aqui, "à moda dos antigos investigadores" é uma locução tradicional (equivalente a "da maneira dos antigos investigadores"), e o "à" já incorpora o artigo feminino antes de "moda", justificando o acento.
Exemplo: é o mesmo padrão de "Ele fez o trabalho à moda antiga" ou "Saímos às pressas" — expressões fixas, já consolidadas com o acento de crase, que não exigem reconstruir a regra do zero a cada uso.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Tipologia textual',
  $q$Texto: "Primeiro, o perito isola a área. Em seguida, fotografa os vestígios. Por fim, coleta o material para análise laboratorial."
Julgue o item a seguir.
O texto apresenta predominantemente sequência tipológica injuntiva (ou instrucional), pois organiza etapas de um procedimento em ordem cronológica, orientando a execução de uma ação.$q$,
  'C',
  $q$Certo. Textos injuntivos (também chamados instrucionais) são aqueles que orientam o leitor a realizar uma sequência de ações ou etapas, geralmente organizados em ordem cronológica com marcadores temporais como "primeiro", "em seguida", "por fim". O texto do item descreve exatamente esse tipo de estrutura: uma sequência ordenada de passos de um procedimento pericial, o que caracteriza a tipologia injuntiva, diferente de textos narrativos (que contam uma história com personagens e conflito) ou descritivos (que retratam características de algo, sem indicar uma sequência de ações a seguir).
Exemplo: é o mesmo tipo de estrutura de uma receita culinária ("primeiro misture os ingredientes, depois leve ao forno") ou de um manual de instruções — o foco está em orientar passos, não em narrar uma história ou apenas descrever algo estático.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Homônimos e parônimos',
  $q$Julgue o item a seguir.
Na frase "O delegado deferiu o pedido de prisão preventiva", o verbo empregado está correto quanto à ortografia e ao sentido, distinguindo-se de "diferir", que significa adiar ou ser diferente.$q$,
  'C',
  $q$Certo. "Deferir" e "diferir" são parônimos (palavras parecidas na escrita e na pronúncia, mas com sentidos distintos). "Deferir" significa atender, conceder, aprovar um pedido — exatamente o sentido usado na frase, em que o delegado concede (defere) o pedido de prisão preventiva. Já "diferir" tem dois sentidos possíveis: adiar algo para depois, ou ser diferente de outra coisa. Como a frase trata de uma decisão favorável a um pedido, o verbo correto e efetivamente empregado é "deferir", não "diferir".
Exemplo: "O juiz deferiu a liminar" (concedeu) é bem diferente de "O julgamento foi diferido para o mês seguinte" (adiado) — apesar de parecidas, as palavras não podem ser trocadas sem mudar completamente o sentido da frase.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Problemas de misturas e médias',
  $q$Uma turma de 20 candidatos obteve média 6,0 em uma prova. Sabendo que 8 desses candidatos obtiveram média 9,0, julgue o item a seguir.
A média dos 12 candidatos restantes foi igual a 4,0.$q$,
  'C',
  $q$Certo. A soma total dos pontos da turma inteira é média × número de pessoas: 6,0 × 20 = 120 pontos. A soma dos pontos dos 8 candidatos com média 9,0 é 9,0 × 8 = 72 pontos. Subtraindo essa soma do total, sobra 120 − 72 = 48 pontos para os 12 candidatos restantes. Dividindo 48 pelos 12 candidatos, a média deles é 48 ÷ 12 = 4,0, exatamente como afirma o item.
Exemplo: esse tipo de questão sempre parte da mesma ideia — "some tudo, divida pela quantidade" para achar a média, e o caminho inverso (multiplicar a média pela quantidade para achar a soma) para descobrir uma parte desconhecida de um grupo maior.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Regra de três composta',
  $q$Sabe-se que 5 peritos, trabalhando 8 horas por dia, concluem a análise de um lote de provas em 6 dias. Julgue o item a seguir.
Mantendo o mesmo ritmo de trabalho, 4 peritos trabalhando 10 horas por dia concluiriam o mesmo lote em 6 dias.$q$,
  'C',
  $q$Certo. Nesse tipo de problema (regra de três composta), o "trabalho total" pode ser medido multiplicando peritos × horas por dia × dias: 5 × 8 × 6 = 240 "unidades de trabalho" necessárias. Com 4 peritos trabalhando 10 horas por dia, para descobrir os dias necessários, divide-se o trabalho total pelo produto de peritos e horas diárias: 240 ÷ (4 × 10) = 240 ÷ 40 = 6 dias. Como o resultado também dá 6 dias, a afirmação do item está correta.
Exemplo: é como calcular quantos "homens-hora" um serviço exige no total e depois redistribuir esse total entre um número diferente de trabalhadores e horas diárias — o total de esforço necessário não muda, só a forma como ele é dividido entre pessoas e tempo.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Negação de conjunção e disjunção',
  $q$Julgue o item a seguir.
A negação da proposição "O suspeito estava armado e tentou fugir" é "O suspeito não estava armado ou não tentou fugir".$q$,
  'C',
  $q$Certo. Pelas Leis de De Morgan, a negação de uma conjunção ("P e Q") transforma-se em uma disjunção das negações ("não P ou não Q") — e vice-versa. Negar "estava armado E tentou fugir" não significa que nenhuma das duas coisas aconteceu; basta que UMA delas seja falsa para que a afirmação conjunta original seja falsa. Por isso, a negação correta troca o "e" por "ou" e nega cada uma das partes separadamente, exatamente como apresentado no item.
Exemplo: negar "Ele é médico e engenheiro" não é "Ele não é médico e não é engenheiro" (que seria bem mais forte) — é "Ele não é médico ou não é engenheiro", bastando faltar uma das duas profissões para a afirmação original cair.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Hardware — componentes básicos',
  $q$Julgue o item a seguir, relativo a conceitos básicos de hardware.
A memória RAM (Random Access Memory) é um tipo de memória volátil, ou seja, seu conteúdo é perdido quando o computador é desligado, diferentemente do armazenamento em disco (HD ou SSD), que mantém os dados mesmo sem energia.$q$,
  'C',
  $q$Certo. A RAM é usada pelo computador para armazenar temporariamente os dados e instruções que estão sendo processados no momento — é uma memória rápida, mas volátil, o que significa que seu conteúdo depende de energia elétrica contínua para ser mantido; ao desligar o computador, tudo que estava na RAM se perde. Já os dispositivos de armazenamento permanente, como HD (disco rígido) e SSD (unidade de estado sólido), são não voláteis: os dados gravados neles permanecem salvos mesmo sem energia, por isso são usados para guardar arquivos, programas e o sistema operacional de forma duradoura.
Exemplo: é a diferença entre um quadro-branco (RAM: rápido de escrever e apagar, mas tudo se perde quando alguém limpa) e um caderno (HD/SSD: mais lento para escrever, mas guarda o conteúdo mesmo depois de fechado e guardado na mochila).$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Engenharia social',
  $q$Julgue o item a seguir, relativo a conceitos de segurança da informação.
O "pretexting" é uma técnica de engenharia social em que o atacante cria uma história ou cenário fictício plausível para convencer a vítima a fornecer informações sigilosas ou realizar uma ação que comprometa a segurança, explorando a confiança da vítima em vez de vulnerabilidades técnicas do sistema.$q$,
  'C',
  $q$Certo. O "pretexting" (do inglês "pretext", pretexto) é justamente isso: o atacante inventa uma situação convincente — por exemplo, se passando por um funcionário do suporte técnico, um auditor ou um colega de trabalho — para ganhar a confiança da vítima e conseguir que ela revele senhas, dados sigilosos ou realize alguma ação (como instalar um programa) que comprometa a segurança. Assim como o phishing, é uma técnica de engenharia social, que explora o fator humano (confiança, boa-fé, medo de contrariar uma autoridade aparente), e não uma falha técnica de software.
Exemplo: é como alguém ligar se passando por um técnico da operadora de telefone, criando uma "desculpa" convincente (uma suposta manutenção urgente) para convencer a vítima a informar um código de verificação recebido por SMS.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '47c74dc1-0035-4427-bfcb-8e9ad424e734', 'auth-info-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Planilhas — funções condicionais',
  $q$Julgue o item a seguir, relativo ao uso de planilhas eletrônicas (Microsoft Excel, versão padrão de instalação).
A função SE (IF) permite testar uma condição lógica e retornar um valor caso ela seja verdadeira e outro valor caso seja falsa, podendo ser aninhada dentro de outra função SE para tratar mais de duas possibilidades de resultado.$q$,
  'C',
  $q$Certo. A função SE tem a estrutura básica =SE(teste_lógico; valor_se_verdadeiro; valor_se_falso), testando uma condição e retornando um dos dois resultados possíveis conforme o teste seja verdadeiro ou falso. Quando há mais de duas possibilidades a considerar (por exemplo, classificar uma nota em "insuficiente", "regular" ou "boa"), é comum aninhar uma função SE dentro do argumento "valor_se_falso" de outra função SE, criando uma cadeia de testes sucessivos até chegar à condição que se aplica ao caso.
Exemplo: =SE(nota>=7;"boa";SE(nota>=5;"regular";"insuficiente")) primeiro testa se a nota é boa; se não for, testa dentro do "senão" se ela é ao menos regular; e, se nenhuma das duas condições for verdadeira, cai no último "senão", classificando como insuficiente.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'b2a1b459-a544-41c4-8ff8-db030d25841b', 'auth-info-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Internet das Coisas (IoT)',
  $q$Julgue o item a seguir, relativo a conceitos de Internet das Coisas (IoT).
Dispositivos de Internet das Coisas, como câmeras de segurança e assistentes domésticos conectados, ampliam a superfície de ataque de uma rede, pois cada dispositivo conectado representa um ponto adicional que pode ser explorado por invasores caso não esteja devidamente protegido e atualizado.$q$,
  'C',
  $q$Certo. Quanto mais dispositivos estão conectados a uma rede — cada câmera, cada assistente doméstico, cada eletrodoméstico "inteligente" —, mais pontos de entrada potenciais existem para um invasor tentar comprometer a rede como um todo. Muitos desses dispositivos de IoT têm configurações de segurança fracas por padrão (senhas padrão nunca trocadas, falta de atualizações de firmware), o que os torna alvos relativamente fáceis; uma vez comprometido um único dispositivo, o invasor pode usá-lo como porta de entrada para tentar acessar outros equipamentos na mesma rede.
Exemplo: é como um prédio com muitas portas e janelas — quanto mais entradas existem, mais pontos um invasor pode tentar forçar; cada dispositivo IoT mal protegido funciona como uma janela extra deixada sem tranca na rede.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Estatística', 'Medidas de tendência central',
  $q$Considere o seguinte conjunto de valores, referente ao número de ocorrências registradas por dia em uma delegacia durante uma semana: 5, 7, 7, 8, 9, 10, 12. Julgue o item a seguir.
A mediana desse conjunto de dados é igual a 8.$q$,
  'C',
  $q$Certo. A mediana é o valor que fica exatamente no meio de um conjunto de dados já ORDENADO. Como o conjunto {5, 7, 7, 8, 9, 10, 12} tem 7 valores (número ímpar) e já está em ordem crescente, a mediana é o valor central, ou seja, o 4º valor da lista (com 3 valores antes e 3 depois dele). Contando: 5, 7, 7, [8], 9, 10, 12 — o quarto valor é 8, que é, portanto, a mediana.
Exemplo: para um número ímpar de dados já ordenados, basta contar do início e do fim até "encontrar" o valor exatamente no meio, que sobra sozinho sem par — nesse caso, o 8, com três valores menores e três maiores ao redor dele.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Estatística', 'Média aritmética simples',
  $q$Em cinco dias de operação, uma equipe realizou 4, 6, 5, 9 e 6 abordagens, respectivamente. Julgue o item a seguir.
A média de abordagens por dia, nesse período, foi igual a 6.$q$,
  'C',
  $q$Certo. A média aritmética simples é calculada somando todos os valores e dividindo pela quantidade de valores. Somando as abordagens: 4 + 6 + 5 + 9 + 6 = 30. Dividindo pelo número de dias (5): 30 ÷ 5 = 6. Logo, a média de abordagens por dia realmente foi igual a 6, confirmando o item.
Exemplo: é o mesmo cálculo usado para saber "quantos gols um time faz por jogo, em média" — soma-se todos os gols da temporada e divide pelo número de jogos disputados, obtendo um valor único que representa o "meio-termo" de todos os jogos.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Uso da vírgula em orações adverbiais',
  $q$Julgue o item a seguir.
Em "Quando a perícia chegou ao local, os vestígios já haviam sido alterados", a vírgula separando a oração subordinada adverbial temporal antecipada da oração principal é obrigatória segundo a norma-padrão.$q$,
  'C',
  $q$Certo. Quando uma oração subordinada adverbial (nesse caso, temporal, iniciada por "quando") vem ANTES da oração principal — ou seja, em ordem inversa à mais comum —, a norma-padrão exige o uso de vírgula para separá-la da oração principal. Essa é uma das regras mais consistentes de pontuação em português: orações adverbiais deslocadas para o início do período (antepostas) sempre pedem vírgula antes da oração principal, diferentemente de quando vêm depois dela, situação em que a vírgula passa a ser apenas facultativa em muitos casos.
Exemplo: compare "Se chover, cancelaremos o evento" (vírgula obrigatória, oração condicional anteposta) com "Cancelaremos o evento se chover" (vírgula facultativa/dispensável, mesma oração posposta) — a posição da oração adverbial em relação à principal é o que determina a obrigatoriedade da vírgula.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Concordância — verbos de ligação',
  $q$Julgue o item a seguir.
Na frase "A maior dificuldade da investigação foram as provas insuficientes", o verbo "foram" concorda corretamente com o predicativo "as provas insuficientes", e não com o sujeito "a maior dificuldade".$q$,
  'C',
  $q$Certo. Quando o verbo de ligação está entre um sujeito no singular e um predicativo no plural (ou vice-versa), a norma-padrão permite — e em muitos casos recomenda — que o verbo concorde com o termo no PLURAL, especialmente quando esse termo plural designa pessoas ou, como neste caso, quando a concordância com o plural soa mais natural. Aqui, "a maior dificuldade" (singular) é o sujeito, e "as provas insuficientes" (plural) é o predicativo; a concordância do verbo "foram" com o predicativo plural, em vez do sujeito singular, é uma construção aceita e frequentemente preferida pela norma culta nesse tipo de estrutura.
Exemplo: é o mesmo padrão de "O problema são os recursos limitados" — soa mais natural concordar com "os recursos limitados" (plural) do que forçar "O problema é os recursos limitados", ainda que tecnicamente a concordância com o sujeito também não seja considerada incorreta em todos os manuais.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Interpretação — pressuposição',
  $q$Texto: "O novo sistema de identificação biométrica também reduziu o tempo de análise dos processos."
Julgue o item a seguir.
A palavra "também" pressupõe que o sistema de identificação biométrica trouxe, além da redução do tempo de análise, pelo menos um outro benefício mencionado anteriormente no contexto mais amplo do texto.$q$,
  'C',
  $q$Certo. A palavra "também" é um advérbio de inclusão/adição que sempre pressupõe a existência de pelo menos um outro elemento da mesma natureza mencionado antes. Ao dizer que o sistema "também" reduziu o tempo de análise, o texto está implicitamente afirmando que existe, em algum ponto anterior ao trecho citado, pelo menos outro benefício ou efeito positivo do sistema já mencionado — o "também" só faz sentido em relação a essa outra informação prévia, mesmo que ela não apareça no recorte específico do texto apresentado.
Exemplo: se alguém diz "Ele também passou no concurso", a palavra "também" só faz sentido pressupondo que outra pessoa (mencionada antes) passou no concurso — a frase, isolada, já revela essa informação implícita sobre o contexto anterior.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Certificado digital',
  $q$Julgue o item a seguir, relativo a conceitos de segurança da informação.
Um certificado digital tem a função de associar uma chave pública a uma identidade (pessoa física, jurídica ou site), sendo emitido por uma Autoridade Certificadora (AC), o que permite verificar a autenticidade dessa identidade em transações eletrônicas.$q$,
  'C',
  $q$Certo. O certificado digital funciona como uma espécie de "documento de identidade eletrônico": ele vincula formalmente uma chave pública a uma identidade específica (uma pessoa, uma empresa, um site), sendo assinado digitalmente por uma Autoridade Certificadora confiável — uma entidade responsável por validar essa identidade antes de emitir o certificado. Quando um site tem um certificado digital válido, por exemplo, o navegador consegue confirmar (por meio dessa cadeia de confiança com a AC) que aquele site realmente pertence a quem afirma ser, o que é essencial para transações seguras, assinaturas eletrônicas e comunicação criptografada confiável.
Exemplo: é como um documento de identidade emitido por um órgão oficial (a Autoridade Certificadora) que atesta "esta chave pública pertence realmente a esta pessoa/empresa" — sem esse "documento", qualquer um poderia alegar ser o dono de uma chave pública sem provar isso.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Juros simples',
  $q$Um valor de R$ 2.000,00 foi aplicado a juros simples de 3% ao mês, por um período de 5 meses. Julgue o item a seguir.
Ao final desse período, o montante total (capital mais juros) será superior a R$ 2.250,00.$q$,
  'C',
  $q$Certo. Nos juros simples, o valor de juros de cada período é calculado sempre sobre o capital inicial (e não sobre o saldo acumulado, como nos juros compostos). A taxa mensal de 3% sobre R$ 2.000,00 gera R$ 60,00 de juros por mês (2.000 × 0,03). Em 5 meses, o total de juros acumulado é 5 × 60 = R$ 300,00. O montante final é o capital mais os juros: 2.000 + 300 = R$ 2.300,00, valor que é, de fato, superior a R$ 2.250,00.
Exemplo: nos juros simples, é como "colar" o mesmo valor de juros todo mês, sempre calculado sobre o valor original aplicado — diferente dos juros compostos, em que o juro do mês seguinte já incide também sobre os juros acumulados dos meses anteriores.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Problemas de velocidade média',
  $q$Uma viatura percorre 180 km em 3 horas, mantendo velocidade constante. Julgue o item a seguir.
Mantendo essa mesma velocidade, a viatura percorreria 300 km em 5 horas.$q$,
  'C',
  $q$Certo. A velocidade é constante, então a distância percorrida é diretamente proporcional ao tempo gasto. A velocidade da viatura é 180 km ÷ 3 h = 60 km/h. Mantendo essa velocidade por 5 horas, a distância percorrida seria 60 km/h × 5 h = 300 km, confirmando exatamente o valor apresentado no item.
Exemplo: é a mesma lógica de "se um carro anda sempre no mesmo ritmo, dobrar o tempo de viagem dobra a distância percorrida" — velocidade constante significa uma relação direta e proporcional entre tempo e distância.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '47c74dc1-0035-4427-bfcb-8e9ad424e734', 'auth-info-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Compactação de arquivos',
  $q$Julgue o item a seguir, relativo a conceitos de manipulação de arquivos.
Arquivos compactados no formato ZIP podem conter múltiplos arquivos e pastas em um único arquivo, o que facilita o compartilhamento e reduz o espaço de armazenamento necessário, sendo possível, na maioria dos casos, proteger o conteúdo compactado com senha.$q$,
  'C',
  $q$Certo. O formato ZIP é um dos padrões mais usados para compactação de arquivos justamente por reunir vários arquivos e pastas em um único arquivo compacto, o que facilita tanto o envio (por e-mail, por exemplo) quanto a organização, além de reduzir o espaço ocupado no disco por meio de algoritmos de compressão. A maioria das ferramentas de compactação (incluindo o suporte nativo do Windows e programas dedicados) permite também proteger o arquivo ZIP com senha, adicionando uma camada extra de segurança para quem deseja restringir o acesso ao conteúdo compactado.
Exemplo: é como colocar vários documentos soltos dentro de uma única pasta lacrada e reduzida de tamanho — mais fácil de carregar e enviar do que cada papel avulso, e, com uma senha, só quem a possui consegue abrir a pasta.$q$,
  'fácil'
);
