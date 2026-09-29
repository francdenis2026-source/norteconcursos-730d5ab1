-- Curated (authored) questions, lote 5: Língua Portuguesa, Raciocínio
-- Lógico e Informática. Same authoring approach as lotes 1-4: original
-- content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Concordância verbal — sujeito composto',
  $q$Julgue o item a seguir.
Na frase "Chegou ao local o delegado e três investigadores", há erro de concordância verbal, pois, havendo sujeito composto posposto ao verbo, este deveria estar no plural, ainda que seja aceitável a concordância com o núcleo mais próximo em alguns contextos formais.$q$,
  'C',
  $q$Certo. Quando o sujeito composto vem DEPOIS do verbo (sujeito posposto), a norma-padrão aceita duas construções: concordar o verbo no plural com todo o sujeito composto ("Chegaram ao local o delegado e três investigadores") ou concordar apenas com o núcleo mais próximo do verbo, no singular ("Chegou ao local o delegado e três investigadores" — concordando com "o delegado", que está logo depois do verbo). A frase do item usa essa segunda possibilidade, que é gramaticalmente aceita quando o sujeito vem depois do verbo, embora a concordância no plural também estivesse correta.
Exemplo: é a mesma lógica de "Saiu correndo o cão e o gato" (aceita, concordando com "o cão", mais próximo) versus "Saíram correndo o cão e o gato" (também aceita, plural com o sujeito composto inteiro) — as duas formas coexistem quando o sujeito vem depois do verbo.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Figuras de linguagem',
  $q$Texto: "A cidade inteira parou para assistir à operação policial."
Julgue o item a seguir.
No trecho "A cidade inteira parou", há uma metonímia, uma vez que o termo "cidade" é usado para representar os habitantes da cidade, e não o espaço físico/geográfico em si.$q$,
  'C',
  $q$Certo. A metonímia é a figura de linguagem em que se usa uma palavra no lugar de outra com a qual mantém uma relação lógica de proximidade — como o continente pelo conteúdo, a causa pelo efeito, ou, como neste caso, o lugar pelos habitantes desse lugar. "A cidade parou" não significa literalmente que prédios e ruas pararam de existir; significa que as PESSOAS que vivem na cidade (o conteúdo, os habitantes) interromperam suas atividades. Esse uso do lugar para designar quem vive nele é um exemplo clássico de metonímia.
Exemplo: é o mesmo recurso usado em "O Brasil comemorou o título" (não é o território que comemora, são os brasileiros) ou "Tomei um copo de água" (não se bebe o copo, mas o líquido dentro dele) — em ambos, um termo substitui outro por associação lógica direta.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Paralelismo sintático',
  $q$Julgue o item a seguir.
A frase "O plano previa reforçar a segurança, a capacitação das equipes e monitorar as fronteiras" apresenta quebra de paralelismo sintático, pois mistura estruturas verbais (infinitivos) com uma estrutura nominal (substantivo) na enumeração dos elementos.$q$,
  'C',
  $q$Certo. O paralelismo sintático exige que elementos coordenados entre si (ligados por vírgulas ou conjunções, numa enumeração) mantenham a mesma estrutura gramatical. Na frase, "reforçar a segurança" e "monitorar as fronteiras" são estruturas verbais no infinitivo, mas "a capacitação das equipes" é uma estrutura nominal (substantivo + complemento), quebrando o padrão esperado. O ideal, para manter o paralelismo, seria escrever todos os itens da lista da mesma forma — por exemplo, "reforçar a segurança, capacitar as equipes e monitorar as fronteiras" (todos no infinitivo) ou "o reforço da segurança, a capacitação das equipes e o monitoramento das fronteiras" (todos como substantivos).
Exemplo: é como dizer "Gosto de correr, nadar e a leitura" — misturar verbos no infinitivo ("correr", "nadar") com um substantivo ("a leitura") soa estranho justamente por quebrar o padrão; o correto seria manter todos no mesmo formato, como "correr, nadar e ler".$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Problemas de trabalho e rendimento',
  $q$Uma equipe de 4 peritos consegue analisar um lote de evidências em 12 dias, trabalhando todos no mesmo ritmo. Julgue o item a seguir, considerando que a produtividade de cada perito permanece constante.
Se a equipe fosse reduzida para 3 peritos, o mesmo lote de evidências seria analisado em 16 dias.$q$,
  'C',
  $q$Certo. Esse é um problema de grandezas inversamente proporcionais: quanto mais peritos trabalhando, menos dias são necessários, e vice-versa. O "trabalho total" pode ser medido em peritos × dias: 4 peritos × 12 dias = 48 "unidades de trabalho" necessárias para concluir a análise. Reduzindo para 3 peritos, divide-se o total de trabalho pelo novo número de peritos: 48 ÷ 3 = 16 dias. Isso confirma que, com menos gente trabalhando (mesmo ritmo individual), o mesmo serviço demora mais tempo, na proporção inversa exata.
Exemplo: é a mesma lógica de "quanto menos pessoas pintando uma casa, mais dias a pintura demora" — se o total de "trabalho" necessário não muda, reduzir a equipe pela metade dobra aproximadamente o tempo necessário, e assim por diante, na proporção inversa.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Princípio da casa dos pombos',
  $q$Em uma sala há 13 policiais. Julgue o item a seguir.
É correto afirmar que, necessariamente, pelo menos dois desses policiais fazem aniversário no mesmo mês do ano.$q$,
  'C',
  $q$Certo. O ano tem 12 meses possíveis para um aniversário, e há 13 pessoas na sala. Pelo Princípio da Casa dos Pombos (ou Princípio das Gavetas), se há mais "pombos" (13 pessoas) do que "casas" (12 meses), pelo menos uma "casa" precisa abrigar mais de um "pombo" — ou seja, é matematicamente impossível distribuir 13 aniversários em 12 meses sem que pelo menos dois caiam no mesmo mês, não importa como a distribuição aconteça.
Exemplo: é a mesma ideia de tentar guardar 13 cartas em 12 gavetas, colocando no máximo uma carta por gaveta — não importa como você organize, sempre sobra pelo menos uma carta que precisa dividir gaveta com outra, porque faltam gavetas para todas ficarem sozinhas.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Conectivos lógicos — condicional',
  $q$Julgue o item a seguir.
A proposição condicional "Se P, então Q" é falsa apenas quando P é verdadeira e Q é falsa, sendo verdadeira em todos os demais casos, inclusive quando P é falsa, independentemente do valor de Q.$q$,
  'C',
  $q$Certo. A condicional (P → Q) tem uma tabela-verdade que costuma surpreender quem está estudando lógica pela primeira vez: ela só é falsa em UM caso — quando o "se" (antecedente) é verdadeiro, mas o "então" (consequente) não se confirma. Em todos os outros três casos possíveis (P verdadeira e Q verdadeira; P falsa e Q verdadeira; P falsa e Q falsa), a condicional é considerada verdadeira — inclusive quando a premissa P nunca chega a se realizar, situação em que a condicional é "verdadeira por padrão", já que não há como contradizê-la.
Exemplo: a promessa "Se eu passar no concurso, comprarei um carro" só seria considerada quebrada (falsa) se a pessoa passasse no concurso e não comprasse o carro; se ela não passar no concurso, a promessa nunca chega a ser testada, e por convenção lógica ela é tratada como verdadeira, não quebrada.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '27745888-c2b6-4849-822d-3fc6ed67b1ef', 'auth-info-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Firewall',
  $q$Julgue o item a seguir, relativo a conceitos de segurança de redes.
Um firewall tem como função principal controlar o tráfego de rede que entra e sai de um sistema, permitindo ou bloqueando conexões com base em um conjunto de regras predefinidas, o que não o torna, por si só, capaz de eliminar um malware já instalado no dispositivo.$q$,
  'C',
  $q$Certo. O firewall atua como uma espécie de "porteiro" entre a rede interna (ou o próprio dispositivo) e redes externas, decidindo, com base em regras (endereços, portas, protocolos permitidos etc.), quais conexões podem passar e quais devem ser bloqueadas. Sua função é filtrar TRÁFEGO de rede, e não examinar ou remover arquivos maliciosos já presentes no sistema — essa é a função de um antivírus/antimalware. Por isso, um firewall bem configurado pode impedir que um malware se comunique com um servidor externo, mas não substitui uma ferramenta de detecção e remoção de malware já instalado.
Exemplo: é como um segurança na porta de um prédio, que decide quem entra e quem sai — ele não vai até os apartamentos verificar se algo de errado já está lá dentro; sua função é só controlar quem passa pela porta.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Teclas de atalho — navegação',
  $q$Julgue o item a seguir, relativo a atalhos de teclado comuns em navegadores de internet (configuração padrão).
O atalho Ctrl+Shift+T reabre, na maioria dos navegadores modernos, a última aba que foi fechada, funcionando de forma cumulativa caso o atalho seja pressionado várias vezes seguidas.$q$,
  'C',
  $q$Certo. Esse atalho é um recurso padrão nos principais navegadores (Chrome, Firefox, Edge) para recuperar rapidamente uma aba fechada por engano. E ele funciona de forma cumulativa: se o usuário fechar três abas seguidas e depois pressionar Ctrl+Shift+T três vezes, o navegador reabre as três abas na ordem inversa em que foram fechadas (a mais recentemente fechada volta primeiro). Isso é útil justamente para desfazer um fechamento acidental de múltiplas abas.
Exemplo: é como um "Ctrl+Z" (desfazer) só que específico para abas fechadas — cada vez que se aperta o atalho, uma aba a mais volta, na ordem inversa de fechamento, até esgotar o histórico recente de abas fechadas.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'b2a1b459-a544-41c4-8ff8-db030d25841b', 'auth-info-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Modelos de nuvem — público, privado e híbrido',
  $q$Julgue o item a seguir, relativo a modelos de implantação de computação em nuvem.
Na nuvem híbrida, uma organização combina recursos de nuvem privada (infraestrutura dedicada, geralmente com maior controle e segurança) com recursos de nuvem pública (compartilhados entre diversos clientes do provedor), permitindo, por exemplo, manter dados sensíveis na nuvem privada e usar a nuvem pública para cargas de trabalho que exigem maior escalabilidade.$q$,
  'C',
  $q$Certo. A nuvem híbrida existe justamente para unir o melhor dos dois modelos: a nuvem privada oferece mais controle, segurança e isolamento (a infraestrutura não é compartilhada com outros clientes), o que a torna adequada para dados sensíveis ou sistemas críticos; já a nuvem pública é compartilhada entre vários clientes do mesmo provedor, com custo geralmente menor e maior elasticidade (facilidade de escalar recursos sob demanda). Numa arquitetura híbrida, a organização decide estrategicamente o que fica em cada ambiente, conforme a sensibilidade e a necessidade de cada carga de trabalho.
Exemplo: é como uma empresa manter seus documentos mais sigilosos num cofre próprio, dentro do prédio (nuvem privada), mas alugar um espaço maior num depósito compartilhado para guardar itens menos sensíveis e que variam bastante de volume (nuvem pública) — cada tipo de conteúdo vai para o lugar mais adequado à sua necessidade.$q$,
  'média'
);
