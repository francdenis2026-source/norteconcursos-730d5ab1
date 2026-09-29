-- Curated (authored) questions, lote 9 (final lote of this batch of 100):
-- Língua Portuguesa, Raciocínio Lógico, Informática. Same authoring
-- approach as lotes 1-8: original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-035',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Interpretação — relação de causa e consequência',
  $q$Texto: "Como as evidências foram coletadas sem observância da cadeia de custódia, o juiz determinou a exclusão das provas do processo."
Julgue o item a seguir.
A oração iniciada por "Como", no início do período, estabelece uma relação de causa, explicando o motivo da decisão do juiz de excluir as provas.$q$,
  'C',
  $q$Certo. A conjunção "como", quando inicia um período (posição inicial) e antecede uma oração seguida de vírgula antes da oração principal, frequentemente assume valor causal, equivalente a "porque" ou "já que". No texto, "Como as evidências foram coletadas sem observância da cadeia de custódia" explica a RAZÃO pela qual o juiz determinou a exclusão das provas — substituindo "como" por "porque" no início da frase, o sentido permanece o mesmo, confirmando o valor causal dessa oração.
Exemplo: "Como estava chovendo, adiamos a operação" tem o mesmo valor de "Porque estava chovendo, adiamos a operação" — o "como" inicial, nesse tipo de estrutura, quase sempre indica a causa de algo que vem a seguir.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-036',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Concordância com "a maioria de"',
  $q$Julgue o item a seguir.
Na frase "A maioria dos policiais concordou com a nova diretriz", a concordância verbal no plural ("concordou" flexionado com o núcleo "maioria", no singular) está correta, sendo também gramaticalmente aceita a forma "concordaram", concordando com o termo "policiais".$q$,
  'E',
  $q$Errado. Há uma inversão na descrição do item: "concordou" está no SINGULAR (não no plural como o item afirma), concordando com o núcleo gramatical "a maioria" (singular). A norma-padrão realmente aceita as duas formas em expressões partitivas como "a maioria de + substantivo plural" — tanto a concordância com o núcleo "maioria" no singular ("A maioria dos policiais concordou") quanto a concordância atrativa com o termo mais próximo, no plural ("A maioria dos policiais concordaram") são consideradas corretas por parte da gramática normativa. O erro do item está em classificar "concordou" como estando "no plural", quando na verdade essa forma está no singular.
Exemplo: tanto "A maioria dos alunos passou" quanto "A maioria dos alunos passaram" são aceitas pela norma culta — mas é preciso identificar corretamente qual das duas formas verbais está sendo usada em cada frase antes de avaliar a concordância.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Tabelas-verdade — bicondicional',
  $q$Julgue o item a seguir.
A proposição bicondicional "P se e somente se Q" é verdadeira quando P e Q têm o mesmo valor lógico (ambas verdadeiras ou ambas falsas), sendo falsa quando os valores de P e Q são diferentes.$q$,
  'C',
  $q$Certo. O bicondicional (P ↔ Q) é, na prática, a junção de duas condicionais: "se P, então Q" e "se Q, então P" ao mesmo tempo — por isso é chamado de "se e somente se". Ele só é verdadeiro quando as duas proposições "caminham juntas", ou seja, têm exatamente o mesmo valor lógico: as duas verdadeiras, ou as duas falsas. Se uma for verdadeira e a outra falsa (em qualquer das duas combinações), o bicondicional inteiro é falso, pois a equivalência entre P e Q se quebra.
Exemplo: "Um número é par se e somente se for divisível por 2" é verdadeira porque as duas condições sempre "andam juntas" — não existe número par que não seja divisível por 2, nem número divisível por 2 que não seja par; qualquer exceção a essa equivalência tornaria a afirmação bicondicional falsa.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '27745888-c2b6-4849-822d-3fc6ed67b1ef', 'auth-info-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Endereçamento IP',
  $q$Julgue o item a seguir, relativo a conceitos de redes de computadores.
Um endereço IP privado, como os da faixa 192.168.x.x, é utilizado para identificar dispositivos dentro de uma rede local e não é diretamente roteável na internet pública, sendo necessário um processo de tradução de endereços (NAT) para que dispositivos dessa rede se comuniquem com a internet.$q$,
  'C',
  $q$Certo. Faixas de endereços IP privados (como 192.168.x.x, 10.x.x.x e 172.16.x.x a 172.31.x.x) foram reservadas justamente para uso interno em redes locais, sem exigir um endereço único e público para cada dispositivo doméstico ou corporativo. Como esses endereços não são roteáveis diretamente na internet pública (o mesmo endereço privado pode se repetir em milhões de redes locais diferentes ao redor do mundo, sem conflito), o roteador da rede usa NAT (Network Address Translation) para "traduzir" as requisições dos dispositivos internos para o único endereço IP público da rede, permitindo o acesso à internet de forma coordenada.
Exemplo: é como um prédio de apartamentos em que cada unidade tem um número interno (o endereço IP privado, tipo "apto 302"), mas todo o prédio compartilha um único endereço de rua visível externamente (o IP público) — a portaria (o NAT) é quem sabe direcionar correspondências entre o mundo externo e cada apartamento específico internamente.$q$,
  'média'
);
