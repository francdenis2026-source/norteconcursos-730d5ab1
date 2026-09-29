-- Curated (authored) questions, lote 7: Língua Portuguesa, Raciocínio
-- Lógico, Informática e Estatística. Same authoring approach as prior
-- lotes: original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Emprego de "porque/por que/porquê/por quê"',
  $q$Julgue o item a seguir.
Na frase "O motivo por que o inquérito foi arquivado ainda não foi divulgado", o emprego de "por que" (separado, sem acento) está correto, pois equivale a "pelo qual" e retoma o substantivo "motivo".$q$,
  'C',
  $q$Certo. "Por que" separado (sem acento) é usado, entre outros casos, quando pode ser substituído por "pelo qual", "pela qual", "pelos quais" ou "pelas quais" — geralmente em orações que retomam um substantivo relacionado a causa ou razão, como "motivo", "razão". Aqui, "o motivo por que o inquérito foi arquivado" pode ser reescrito como "o motivo pelo qual o inquérito foi arquivado", confirmando que essa é a forma gramaticalmente adequada, e não "porque" (junto, usado em respostas e explicações diretas) nem "por quê" (com acento, usado no fim de frase ou isolado).
Exemplo: "Não sei por que ele saiu" (equivale a "por qual motivo") é diferente de "Ele saiu porque estava atrasado" (explicação direta, uma só palavra) — a diferença está em se a palavra pode ser substituída por "pelo qual" ou funciona como resposta/explicação.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Verbos irregulares',
  $q$Julgue o item a seguir.
Na frase "Se ele vier amanhã, entregaremos o relatório pessoalmente", a forma verbal "vier" está corretamente flexionada no futuro do subjuntivo do verbo "vir".$q$,
  'C',
  $q$Certo. O verbo "vir" é irregular, e sua flexão no futuro do subjuntivo é "vier, vieres, vier, viermos, vierdes, vierem" — usada tipicamente em orações condicionais iniciadas por "se" que expressam uma hipótese futura ("Se ele vier..."). A forma "vier" no item está corretamente empregada, seguindo esse padrão de conjugação irregular do futuro do subjuntivo, comumente cobrado em provas justamente por gerar confusão com o pretérito perfeito "veio".
Exemplo: é fácil confundir com "Ele veio ontem" (pretérito perfeito, fato já ocorrido), mas em orações com "se" indicando algo que ainda pode acontecer no futuro, a forma correta é sempre a do futuro do subjuntivo: "Se ele vier", "quando ele vier", nunca "se ele veio".$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Interpretação — ambiguidade',
  $q$Julgue o item a seguir.
A frase "O policial viu o suspeito com o binóculo" é ambígua, pois admite duas interpretações: a de que o policial usou o binóculo para ver o suspeito, ou a de que o suspeito estava portando o binóculo no momento em que foi avistado.$q$,
  'C',
  $q$Certo. A ambiguidade nessa frase decorre da posição do termo "com o binóculo", que pode se referir tanto ao instrumento usado pelo POLICIAL para enxergar ("o policial, usando um binóculo, viu o suspeito") quanto a um objeto que o próprio SUSPEITO estava carregando no momento em que foi visto ("o policial viu o suspeito, que estava com um binóculo"). Como o contexto da frase, isolada, não deixa claro qual das duas leituras é a pretendida, ela é de fato ambígua — um problema clássico de interpretação que costuma ser cobrado em provas de Português.
Exemplo: é o mesmo tipo de ambiguidade de "Vi o professor com binóculos" — pode ser "eu usei binóculos para vê-lo" ou "eu vi o professor, que estava com binóculos"; só o contexto mais amplo resolveria qual sentido é o correto.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Problemas de conjuntos — três grupos',
  $q$Em uma pesquisa com 100 policiais, verificou-se que 50 possuem curso de informática, 40 possuem curso de idiomas e 15 possuem ambos os cursos. Julgue o item a seguir.
O número de policiais que não possuem nenhum dos dois cursos é igual a 25.$q$,
  'C',
  $q$Certo. Somando os dois grupos e subtraindo a interseção (para não contar duas vezes quem tem os dois cursos): 50 + 40 − 15 = 75 policiais têm pelo menos um dos dois cursos. Como o total pesquisado é 100, os que não têm nenhum dos dois cursos são 100 − 75 = 25, exatamente como afirma o item.
Exemplo: é o mesmo raciocínio de somar "quem gosta de café" com "quem gosta de chá", descontar quem gosta dos dois (para não contar em dobro), e depois subtrair esse total do grupo inteiro para descobrir quantos não gostam de nenhum dos dois.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Múltiplos e divisores',
  $q$Julgue o item a seguir.
O menor número inteiro positivo que é divisível simultaneamente por 4, 6 e 9 é igual a 36.$q$,
  'C',
  $q$Certo. Encontrar o menor número divisível por vários números ao mesmo tempo é calcular o Mínimo Múltiplo Comum (MMC) entre eles. Fatorando: 4 = 2², 6 = 2×3, 9 = 3². O MMC pega cada fator primo elevado ao seu MAIOR expoente entre os três números: 2² (do 4) × 3² (do 9) = 4 × 9 = 36. Conferindo: 36 ÷ 4 = 9 (exato), 36 ÷ 6 = 6 (exato), 36 ÷ 9 = 4 (exato) — confirmando que 36 é de fato divisível pelos três números, e é o menor valor que atende a essa condição.
Exemplo: é a mesma lógica usada para descobrir de quantos em quantos dias três eventos periódicos diferentes (que se repetem a cada 4, 6 e 9 dias, por exemplo) voltam a acontecer no mesmo dia — a resposta é sempre o MMC entre os períodos de cada evento.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Ataques de negação de serviço',
  $q$Julgue o item a seguir, relativo a conceitos de segurança da informação.
Um ataque de negação de serviço distribuído (DDoS) tem como objetivo tornar um sistema, serviço ou rede indisponível para seus usuários legítimos, geralmente sobrecarregando-o com um volume excessivo de requisições provenientes de múltiplas origens simultâneas, muitas vezes coordenadas por uma rede de dispositivos comprometidos (botnet).$q$,
  'C',
  $q$Certo. O objetivo central de um ataque DDoS (Distributed Denial of Service) não é roubar dados, mas sim tirar do ar ou tornar extremamente lento um serviço, sobrecarregando-o com uma quantidade de requisições muito maior do que ele consegue processar. A característica "distribuída" vem justamente do fato de que essas requisições partem de múltiplas origens ao mesmo tempo — frequentemente de uma botnet, uma rede de dispositivos infectados e controlados remotamente pelo atacante sem o conhecimento de seus donos —, o que torna o ataque mais difícil de bloquear do que um ataque vindo de uma única origem.
Exemplo: é como se milhares de pessoas ligassem ao mesmo tempo para uma única central telefônica com o objetivo de lotar todas as linhas, impedindo que clientes reais consigam completar suas ligações — o serviço continua "existindo", mas fica inacessível pela sobrecarga.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Sistema de arquivos',
  $q$Julgue o item a seguir, relativo a conceitos de sistemas de arquivos.
No sistema operacional Windows, exclusivamente ao usar o atalho Delete (sem pressionar Shift), o arquivo é movido para a Lixeira, permanecendo recuperável até que esta seja esvaziada, ao passo que Shift+Delete exclui o arquivo de forma permanente, sem passar pela Lixeira.$q$,
  'C',
  $q$Certo. No comportamento padrão do Windows, apertar apenas "Delete" em um arquivo o envia para a Lixeira, um local temporário de onde ele ainda pode ser restaurado à sua pasta original, até que o usuário decida esvaziar a Lixeira definitivamente. Já o atalho "Shift+Delete" pula essa etapa intermediária e exclui o arquivo diretamente, sem passar pela Lixeira — tornando a recuperação por meios convencionais (como simplesmente "desfazer" ou restaurar da Lixeira) impossível, embora ferramentas especializadas de recuperação de dados ainda possam, em alguns casos, recuperar vestígios do arquivo no disco.
Exemplo: é a diferença entre jogar um papel numa lixeira comum, de onde ainda dá para pegá-lo de volta (Delete simples), e jogá-lo direto numa trituradora de papel (Shift+Delete) — depois de triturado, recuperar o documento fica muito mais difícil.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '27745888-c2b6-4849-822d-3fc6ed67b1ef', 'auth-info-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Protocolos de internet',
  $q$Julgue o item a seguir, relativo a protocolos de internet.
O protocolo HTTPS utiliza criptografia para proteger a comunicação entre o navegador e o servidor, o que impede que terceiros interceptem e leiam o conteúdo trafegado, mas não garante, por si só, que o site acessado seja legítimo ou confiável em termos de conteúdo.$q$,
  'C',
  $q$Certo. O "S" de HTTPS vem de "Secure" e indica que a comunicação entre o navegador e o servidor é criptografada (geralmente via TLS/SSL), impedindo que alguém no meio do caminho (como em uma rede Wi-Fi pública) consiga ler o conteúdo trafegado, como senhas digitadas em um formulário. Porém, o HTTPS garante apenas que a CONEXÃO é segura e, em geral, que o certificado corresponde ao domínio acessado — ele não analisa nem garante que o conteúdo do site seja verdadeiro, confiável ou livre de golpes: um site falso de phishing também pode ter HTTPS, criptografando a comunicação enquanto engana a vítima.
Exemplo: é como um envelope lacrado e à prova de violação (HTTPS) entregue por um motoboy confiável — ninguém no caminho consegue abrir e ler a carta, mas isso não impede que o CONTEÚDO da carta, escrito por quem a enviou, seja uma mentira ou um golpe.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Estatística', 'Desvio padrão — noção básica',
  $q$Julgue o item a seguir, relativo a conceitos básicos de estatística descritiva.
O desvio padrão é uma medida de dispersão que indica o quanto, em média, os valores de um conjunto de dados se afastam da média aritmética desse conjunto; quanto maior o desvio padrão, mais dispersos (heterogêneos) são os dados em relação à média.$q$,
  'C',
  $q$Certo. Diferente das medidas de tendência central (como média e mediana), que indicam um "valor típico" do conjunto, o desvio padrão é uma medida de DISPERSÃO: ele mostra o quanto os valores individuais tendem a se afastar da média. Um desvio padrão baixo indica que os dados estão concentrados, próximos da média (mais homogêneos); um desvio padrão alto indica que os dados estão mais espalhados, com valores bem distantes da média em ambas as direções (mais heterogêneos).
Exemplo: duas equipes podem ter a mesma média de idade, mas se uma tem todo mundo com idades bem próximas (baixo desvio padrão) e a outra mistura pessoas muito jovens com pessoas bem mais velhas (alto desvio padrão), o desvio padrão é o número que capta essa diferença de "espalhamento", mesmo com a média sendo igual nas duas equipes.$q$,
  'média'
);
