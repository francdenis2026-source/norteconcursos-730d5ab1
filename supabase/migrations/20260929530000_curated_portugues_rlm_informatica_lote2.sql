-- Curated (authored) questions, lote 2: Língua Portuguesa, Raciocínio
-- Lógico e Informática. Same authoring approach as lote 1
-- (20260929520000): original stems/alternatives/explanations written from
-- scratch, general topics only used as inspiration, no text reproduced
-- from any third-party PDF.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Ortografia e acentuação',
  $q$Julgue o item a seguir.
As palavras "júri", "possível" e "acórdão" são acentuadas pela mesma regra, por serem todas paroxítonas terminadas em ditongo, "l" e "-ão", respectivamente.$q$,
  'E',
  $q$Errado. As três palavras são paroxítonas (a sílaba tônica é a penúltima), mas não seguem a mesma regra de acentuação. "Júri" é acentuada porque paroxítonas terminadas em "i" recebem acento; "possível" é acentuada porque paroxítonas terminadas em "l" também recebem acento; já "acórdão" é acentuada porque termina em ditongo crescente "ão" precedido de vogal tônica aberta, regra distinta das duas primeiras. O item erra ao afirmar que a mesma regra explica as três — cada terminação (i, l, ditongo) tem sua própria justificativa dentro das regras de acentuação de paroxítonas.
Exemplo: é como dizer que "táxi" e "fácil" são acentuadas "pelo mesmo motivo" só porque as duas são paroxítonas — na verdade, uma termina em "i" e outra em "l", motivos diferentes dentro da mesma categoria geral (paroxítona).$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Colocação pronominal',
  $q$Julgue o item a seguir.
Na frase "Não se afaste do local até a chegada da perícia", a colocação do pronome "se" antes do verbo (próclise) está correta, pois a presença do advérbio de negação "não" atrai o pronome para antes do verbo.$q$,
  'C',
  $q$Certo. Palavras de sentido negativo (como "não", "nunca", "jamais", "ninguém") são palavras atrativas: quando aparecem antes do verbo, "puxam" o pronome oblíquo átono para antes dele também, exigindo a próclise. Em "Não se afaste", o "não" atrai o "se" para antes do verbo "afaste" — exatamente como está escrito na frase, o que confirma que a colocação pronominal está correta segundo a norma-padrão.
Exemplo: é a mesma lógica de "Nunca me diga isso de novo" (próclise, por causa do "nunca") ou "Ninguém se importou com o caso" (próclise, por causa de "ninguém") — a negação sempre puxa o pronome para antes do verbo.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Conectivos e conjunções',
  $q$Julgue o item a seguir.
Na frase "O suspeito foi liberado, uma vez que não havia provas suficientes contra ele", a locução "uma vez que" introduz uma oração de valor temporal, indicando o momento exato em que o suspeito foi liberado.$q$,
  'E',
  $q$Errado. A locução "uma vez que" pode até parecer temporal pela palavra "vez", mas nesse contexto ela tem valor causal — equivale a "porque" ou "já que", explicando o MOTIVO da liberação (a falta de provas), e não o momento em que ela ocorreu. Reescrevendo a frase com "porque" no lugar de "uma vez que" ("O suspeito foi liberado porque não havia provas suficientes"), o sentido permanece exatamente o mesmo, o que confirma o valor causal, não temporal, da locução.
Exemplo: em "Uma vez que ele confessou, o caso foi encerrado", também não se trata de "no momento em que ele confessou", mas sim de "porque/já que ele confessou" — a causa do encerramento do caso.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Redação oficial',
  $q$Considerando as disposições do Manual de Redação da Presidência da República acerca da redação oficial, julgue o item a seguir.
A clareza e a objetividade são atributos desejáveis da redação oficial, mas isso não significa que se deva abrir mão da formalidade e do padrão culto da língua, ainda que o texto trate de assunto técnico e complexo.$q$,
  'C',
  $q$Certo. A redação oficial busca ser clara e objetiva justamente para facilitar o entendimento do cidadão e da administração, mas isso não é incompatível com a formalidade: o texto oficial deve sempre seguir a norma culta e manter um padrão de impessoalidade e polidez, mesmo quando o assunto é técnico. Clareza não é sinônimo de informalidade ou simplificação excessiva da linguagem — é possível (e exigido) ser claro sem abandonar o registro formal esperado em comunicações do serviço público.
Exemplo: é a diferença entre explicar um procedimento técnico "em bom português formal, mas sem rodeios" e explicá-lo "de forma solta e coloquial" — a redação oficial exige a primeira opção, nunca a segunda, mesmo quando o tema é complicado.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Concordância nominal',
  $q$Julgue o item a seguir.
Em "Seguem anexo os documentos solicitados pela autoridade policial", há erro de concordância, pois a palavra "anexo", quando usada como esse tipo de adjetivo, deve concordar em gênero e número com o substantivo a que se refere.$q$,
  'C',
  $q$Certo. "Anexo" funciona como adjetivo nesse tipo de construção e, como todo adjetivo, deve concordar em gênero e número com o substantivo que ele qualifica. Como "documentos" é masculino plural, o correto seria "Seguem anexos os documentos solicitados...". A forma "anexo" (no singular, invariável) está errada aqui — esse é um erro comum porque muita gente trata "anexo" como se fosse um advérbio invariável (como "em anexo"), mas, sem a preposição "em", ele se comporta como adjetivo comum e varia normalmente.
Exemplo: é a diferença entre "Segue em anexo o documento" (aqui "em anexo" é uma locução invariável, funciona quase como advérbio) e "Seguem anexas as fotos" (aqui "anexas" concorda com "fotos", porque é adjetivo puro, sem o "em").$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Equivalências lógicas',
  $q$Julgue o item a seguir.
A proposição "Se o mandado for válido, então a busca é legal" é logicamente equivalente a "Se a busca não é legal, então o mandado não é válido".$q$,
  'C',
  $q$Certo. Toda condicional "Se P, então Q" é logicamente equivalente à sua contrapositiva "Se não Q, então não P" — as duas têm exatamente a mesma tabela-verdade, ou seja, são verdadeiras ou falsas exatamente nas mesmas situações. Aqui, P = "o mandado é válido" e Q = "a busca é legal"; a contrapositiva troca e nega os dois termos, dando "Se não Q, então não P" = "Se a busca não é legal, então o mandado não é válido", que é exatamente a proposição apresentada no item.
Exemplo: "Se chove, a rua fica molhada" equivale logicamente a "Se a rua não está molhada, não choveu" — as duas frases dizem, de formas diferentes, exatamente a mesma coisa sobre a relação entre chuva e rua molhada.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Sequências e padrões',
  $q$Considere a sequência numérica 3, 7, 15, 31, 63, ... , em que cada termo, a partir do segundo, segue um padrão fixo em relação ao termo anterior. Julgue o item a seguir.
O próximo termo dessa sequência, após 63, é igual a 127.$q$,
  'C',
  $q$Certo. Observando a diferença entre termos consecutivos, cada termo é igual ao dobro do anterior somado a 1: 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63. Aplicando a mesma regra ao último termo dado: 63×2+1 = 126+1 = 127. Esse tipo de questão exige identificar o padrão (aqui, "dobro mais um") a partir dos termos já apresentados e aplicá-lo de forma consistente para prever o próximo.
Exemplo: é o mesmo raciocínio usado em provas de concurso com sequências como 1, 3, 7, 15, ... — primeiro se testa uma hipótese simples ("dobro mais um", "soma de potências de 2" etc.) contra os termos conhecidos e, confirmando que ela funciona em todos eles, aplica-se ao termo seguinte.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Proposições compostas',
  $q$Julgue o item a seguir.
A proposição composta "P e Q", em que P é falsa e Q é verdadeira, tem valor lógico verdadeiro.$q$,
  'E',
  $q$Errado. A conjunção "e" (representada logicamente como P ∧ Q) só é verdadeira quando as DUAS proposições que ela liga são verdadeiras ao mesmo tempo. Se qualquer uma das duas for falsa — como no caso do item, em que P é falsa —, a conjunção inteira já é falsa, independentemente do valor de Q. Não existe meio-termo: "e" exige que tudo seja verdadeiro para o conjunto ser verdadeiro.
Exemplo: dizer "Choveu e o jogo foi cancelado" só é uma afirmação verdadeira se as duas coisas realmente aconteceram; se não choveu (mesmo que o jogo tenha sido cancelado por outro motivo), a frase inteira já é falsa, porque uma das duas partes falhou.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Redes de computadores',
  $q$Julgue o item a seguir, relativo a conceitos de redes de computadores.
Uma VPN (Virtual Private Network) cria um túnel criptografado entre o dispositivo do usuário e um servidor remoto, o que permite que o tráfego de dados trafegue de forma protegida mesmo utilizando uma rede pública, como o Wi-Fi de um aeroporto.$q$,
  'C',
  $q$Certo. Esse é exatamente o funcionamento básico de uma VPN: ela estabelece uma conexão criptografada ("túnel") entre o dispositivo do usuário e um servidor da própria VPN, de modo que os dados trafeguem protegidos mesmo passando por redes que não são confiáveis, como o Wi-Fi público de um aeroporto ou café. Qualquer pessoa tentando interceptar o tráfego nessa rede pública veria apenas dados criptografados, sem conseguir ler o conteúdo real.
Exemplo: é como enviar uma carta dentro de um cofre lacrado por um caminho perigoso — mesmo que alguém intercepte o caminho, não consegue abrir o cofre para ler a carta; só quem tem a chave (o servidor VPN e o dispositivo do usuário) consegue.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'b2a1b459-a544-41c4-8ff8-db030d25841b', 'auth-info-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Backup',
  $q$Julgue o item a seguir, relativo a conceitos de backup de dados.
No backup incremental, cada nova cópia armazena apenas os arquivos que foram criados ou modificados desde o último backup realizado, seja ele completo ou incremental, o que geralmente resulta em cópias mais rápidas e menores do que o backup completo.$q$,
  'C',
  $q$Certo. O backup incremental é justamente pensado para economizar tempo e espaço: em vez de copiar tudo de novo a cada rotina (como faz o backup completo), ele copia só o que mudou desde a ÚLTIMA cópia realizada, seja ela completa ou incremental. Isso torna cada rotina de backup mais rápida e ocupa menos espaço de armazenamento, com a contrapartida de que, para restaurar os dados por completo, é preciso reunir o último backup completo e todos os incrementais feitos depois dele, em sequência.
Exemplo: é como ir salvando só as páginas novas de um caderno a cada dia, em vez de fotocopiar o caderno inteiro toda vez — mais rápido no dia a dia, mas para reconstruir o caderno completo é preciso juntar a cópia original com todas as páginas novas, na ordem certa.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Malware',
  $q$Julgue o item a seguir, relativo a conceitos de segurança da informação.
Um ransomware é um tipo de código malicioso que sequestra o acesso aos dados da vítima, geralmente por meio de criptografia, e exige o pagamento de um resgate para restabelecer esse acesso, podendo se espalhar por uma rede corporativa a partir de um único computador infectado.$q$,
  'C',
  $q$Certo. Essa é a definição central de ransomware: um malware que "sequestra" os dados da vítima — na prática, criptografando arquivos de modo que o usuário não consiga mais abri-los — e só promete devolver o acesso mediante pagamento (o "resgate", daí o nome). Em ambientes corporativos, um ransomware que infecta uma única máquina pode se propagar pela rede interna, criptografando arquivos em outros computadores e servidores conectados, ampliando bastante o estrago.
Exemplo: é como um assaltante trocar a fechadura da sua casa e só devolver a chave nova se você pagar — os móveis (seus arquivos) continuam lá dentro, intactos, mas você não consegue mais acessá-los sem a "chave" que o criminoso está retendo.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '47c74dc1-0035-4427-bfcb-8e9ad424e734', 'auth-info-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Planilhas eletrônicas',
  $q$Julgue o item a seguir, relativo ao uso de planilhas eletrônicas (Microsoft Excel, versão padrão de instalação).
A função PROCV permite buscar um valor na primeira coluna de um intervalo de células e retornar um valor correspondente em outra coluna da mesma linha, sendo necessário indicar o número da coluna de onde o resultado deve ser extraído.$q$,
  'C',
  $q$Certo. A função PROCV (Procura Vertical) funciona exatamente assim: ela recebe o valor que se quer buscar, o intervalo onde a busca deve ocorrer (sempre olhando a PRIMEIRA coluna desse intervalo), o número da coluna — contando a partir da primeira coluna do intervalo — de onde deve vir o resultado, e um parâmetro indicando se a busca deve ser exata ou aproximada. Se o valor procurado não estiver na primeira coluna do intervalo selecionado, a função simplesmente não o encontra, mesmo que ele exista em outra coluna da planilha.
Exemplo: é como procurar um nome numa lista telefônica organizada por nome (primeira "coluna") para descobrir o telefone correspondente (a coluna do resultado) — não adianta tentar localizar o nome numa lista organizada por telefone, porque o PROCV sempre olha primeiro a coluna combinada como referência de busca.$q$,
  'média'
);
