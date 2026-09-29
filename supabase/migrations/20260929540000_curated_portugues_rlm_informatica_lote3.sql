-- Curated (authored) questions, lote 3: Língua Portuguesa, Raciocínio
-- Lógico e Informática. Same authoring approach as lotes 1-2
-- (20260929520000, 20260929530000): original stems/alternatives/
-- explanations written from scratch, no text reproduced from any
-- third-party source.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Regência nominal',
  $q$Julgue o item a seguir.
Na frase "O delegado estava atento aos detalhes do depoimento", o adjetivo "atento" exige a preposição "a" para introduzir o complemento que indica aquilo a que se dá atenção, conforme a norma-padrão.$q$,
  'C',
  $q$Certo. Assim como os verbos têm regência (preposição exigida), os adjetivos e substantivos também têm regência nominal fixa. "Atento" é um exemplo clássico: pede a preposição "a" para introduzir seu complemento ("atento a algo/alguém"). Na frase do item, "atento aos detalhes" (com a preposição "a" fundida ao artigo "os") está de acordo com essa regência esperada.
Exemplo: é a mesma lógica de "favorável a", "propício a" ou "obediente a" — adjetivos que, por tradição da língua, sempre pedem a preposição "a" para ligar o adjetivo ao que ele qualifica.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Vozes verbais',
  $q$Julgue o item a seguir.
Na frase "O suspeito foi detido pelos agentes na saída do aeroporto", o verbo está na voz passiva analítica, e o termo "pelos agentes" exerce a função de agente da passiva.$q$,
  'C',
  $q$Certo. A voz passiva analítica é formada por um verbo auxiliar (aqui, "foi") mais o particípio do verbo principal ("detido"), e o responsável pela ação — quem pratica o ato de deter — vem introduzido por uma preposição, geralmente "por", formando o chamado agente da passiva. Na frase, "O suspeito foi detido" é a construção passiva, e "pelos agentes" indica quem praticou a ação de deter, exercendo exatamente a função de agente da passiva.
Exemplo: comparando com a voz ativa equivalente — "Os agentes detiveram o suspeito" —, percebe-se que quem era sujeito ativo ("os agentes") na voz ativa vira o agente da passiva ("pelos agentes") quando a frase é reescrita na voz passiva.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Interpretação e inferência',
  $q$Texto: "Embora a tecnologia tenha facilitado o acesso à informação, ela também ampliou a velocidade com que notícias falsas se espalham, exigindo do leitor um esforço maior de verificação antes de compartilhar qualquer conteúdo."
Com base nesse texto, julgue o item.
Depreende-se do texto que a tecnologia, isoladamente, é a única responsável pela disseminação de notícias falsas, sem que caiba ao leitor qualquer responsabilidade nesse processo.$q$,
  'E',
  $q$Errado. O texto não atribui a responsabilidade apenas à tecnologia — ele afirma que a tecnologia "ampliou a velocidade" de disseminação (ou seja, é um facilitador, não a única causa), e conclui explicitamente que isso "exige do leitor um esforço maior de verificação antes de compartilhar". Essa última parte atribui uma responsabilidade direta ao leitor (verificar antes de compartilhar), contrariando a ideia de que só a tecnologia seria responsável.
Exemplo: é como dizer que uma estrada mais rápida (a tecnologia) faz os carros chegarem mais rápido a um destino, mas quem dirige (o leitor) ainda precisa prestar atenção ao caminho — a velocidade da estrada não tira do motorista a responsabilidade de dirigir com cuidado.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Coesão referencial',
  $q$Texto: "Os peritos concluíram o laudo na sexta-feira. Ele foi entregue à autoridade policial na segunda-feira seguinte."
Julgue o item a seguir.
No texto, o pronome "Ele" retoma o termo "laudo", e não "peritos", pois concorda em gênero e número com esse antecedente.$q$,
  'C',
  $q$Certo. Em coesão referencial, um pronome retoma o termo com o qual concorda em gênero e número, quando essa concordância permite identificar claramente o antecedente. "Laudo" é masculino singular, assim como "Ele"; já "peritos" é masculino PLURAL, o que não bateria com o pronome "Ele" (singular). Logo, apenas "laudo" é compatível gramaticalmente com "Ele", confirmando que é esse o termo retomado — e faz sentido no contexto, já que é o laudo (não os peritos) que é "entregue à autoridade".
Exemplo: em "Os relatórios foram arquivados. Ele continha erros", perceberíamos de imediato um problema de concordância, porque "ele" (singular) não pode retomar "relatórios" (plural) — o texto exigiria "eles" nesse caso, mostrando como o gênero e número guiam a identificação do antecedente correto.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Argumentos e validade',
  $q$Considere o argumento a seguir.
Premissa 1: Todo policial aprovado passou pelo curso de formação.
Premissa 2: Marcos não passou pelo curso de formação.
Conclusão: Marcos não é um policial aprovado.
Julgue o item a seguir.
O argumento apresentado é válido, pois a conclusão decorre necessariamente das premissas, segundo a forma lógica do modus tollens.$q$,
  'C',
  $q$Certo. O argumento segue exatamente a estrutura do modus tollens: "Se P, então Q" (todo aprovado passou pelo curso: P = ser aprovado, Q = ter passado pelo curso) e "não Q" (Marcos não passou pelo curso) permitem concluir com certeza "não P" (Marcos não é aprovado). Essa é uma das formas de argumento válidas mais conhecidas da lógica: negar o consequente de uma condicional verdadeira obriga a negar também o antecedente.
Exemplo: "Se é fogo, produz calor" e "isto não produz calor" permitem concluir com segurança que "isto não é fogo" — a mesma estrutura usada no argumento sobre Marcos e o curso de formação.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Porcentagem',
  $q$Em um concurso, 800 candidatos foram inscritos para determinada vaga. Desses, 35% não compareceram à prova. Julgue o item a seguir.
O número de candidatos que compareceram à prova foi superior a 500.
$q$,
  'C',
  $q$Certo. Se 35% dos candidatos não compareceram, então 100% − 35% = 65% compareceram. Calculando 65% de 800: 0,65 × 800 = 520 candidatos compareceram. Como 520 é maior que 500, o item está correto.
Exemplo: é o mesmo raciocínio usado para calcular quantas pessoas "sobram" depois de tirar uma fatia percentual do total — primeiro descobre-se a porcentagem que interessa (aqui, quem compareceu, e não quem faltou), depois aplica-se essa porcentagem sobre o total.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Tabela-verdade',
  $q$Julgue o item a seguir.
A proposição "P ou Q" (disjunção inclusiva) é falsa apenas quando P e Q são, simultaneamente, falsas.$q$,
  'C',
  $q$Certo. A disjunção inclusiva "P ou Q" (P ∨ Q) só é falsa em um único caso: quando as duas proposições são falsas ao mesmo tempo. Em qualquer outra combinação — P verdadeira e Q falsa, P falsa e Q verdadeira, ou as duas verdadeiras — a disjunção inclusiva é verdadeira, pois basta que UMA das partes seja verdadeira para o "ou" inclusivo se confirmar.
Exemplo: "Vou de carro ou de ônibus" (sentido inclusivo, sem excluir a possibilidade de fazer as duas coisas em partes diferentes do trajeto) só seria uma afirmação falsa se a pessoa não fosse nem de carro nem de ônibus — qualquer um dos dois meios (ou os dois) já tornaria a frase verdadeira.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Razão e proporção',
  $q$Em uma delegacia, o número de agentes está para o número de escrivães na razão de 5 para 2. Sabendo que há, ao todo, 35 agentes, julgue o item a seguir.
O número de escrivães nessa delegacia é igual a 14.$q$,
  'C',
  $q$Certo. A razão 5 para 2 significa que, para cada grupo de 5 agentes, há 2 escrivães, na mesma proporção. Se há 35 agentes, isso corresponde a 35 ÷ 5 = 7 "grupos" dessa proporção. Multiplicando o número de escrivães por grupo (2) pela quantidade de grupos (7), chega-se a 2 × 7 = 14 escrivães, mantendo a razão 5:2 entre os dois totais (35 para 14, que simplificada também dá 5 para 2).
Exemplo: é a mesma lógica de uma receita culinária na razão "3 xícaras de farinha para 1 xícara de açúcar" — se alguém usa 15 xícaras de farinha (5 vezes a quantidade da receita original), precisa usar 5 xícaras de açúcar para manter a mesma proporção.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '27745888-c2b6-4849-822d-3fc6ed67b1ef', 'auth-info-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Correio eletrônico',
  $q$Julgue o item a seguir, relativo a conceitos de correio eletrônico.
Ao utilizar o campo "Cco" (Com Cópia Oculta) em uma mensagem de e-mail, os destinatários incluídos nesse campo recebem a mensagem, mas seus endereços não são visíveis para os demais destinatários listados nos campos "Para" e "Cc".$q$,
  'C',
  $q$Certo. O campo "Cco" (Com Cópia Oculta, também chamado de "Bcc" em inglês) existe justamente para permitir que alguém receba uma cópia da mensagem sem que os outros destinatários saibam disso. Quem está em "Para" ou "Cc" consegue ver os endereços uns dos outros normalmente, mas não enxerga quem recebeu a mensagem via "Cco" — essa é a diferença central entre "Cc" (cópia visível a todos) e "Cco" (cópia oculta dos demais).
Exemplo: é como mandar uma carta com cópia para o chefe sem que os outros destinatários da carta original saibam que o chefe também recebeu uma via — só quem está enviando (e o próprio chefe) sabe dessa cópia extra.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Autenticação e senhas',
  $q$Julgue o item a seguir, relativo a conceitos de segurança da informação.
A autenticação de dois fatores (2FA) aumenta a segurança de uma conta ao exigir, além da senha, um segundo elemento de verificação — como um código enviado por SMS ou gerado por aplicativo —, de modo que a posse da senha, isoladamente, não seja suficiente para acessar a conta.$q$,
  'C',
  $q$Certo. A autenticação de dois fatores combina duas categorias diferentes de prova de identidade — tipicamente "algo que você sabe" (a senha) e "algo que você tem" (um celular que recebe um código por SMS, ou um aplicativo gerador de código, por exemplo). Mesmo que um invasor descubra a senha da vítima, ele ainda precisaria do segundo fator (o código momentâneo) para conseguir entrar na conta, o que eleva bastante a segurança em comparação com usar só a senha.
Exemplo: é como um cofre que só abre com uma combinação numérica E uma chave física ao mesmo tempo — descobrir só a combinação (a senha) não adianta se a pessoa não tiver também a chave física (o segundo fator) em mãos.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '47c74dc1-0035-4427-bfcb-8e9ad424e734', 'auth-info-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Editor de texto',
  $q$Julgue o item a seguir, relativo ao uso de editores de texto (Microsoft Word, versão padrão de instalação).
O recurso de "Controle de Alterações" (Track Changes) permite que edições feitas em um documento — inclusões, exclusões e comentários — sejam registradas visualmente no texto, possibilitando que o autor original aceite ou rejeite cada alteração individualmente antes de finalizar o documento.$q$,
  'C',
  $q$Certo. O Controle de Alterações é um recurso justamente pensado para revisão colaborativa de documentos: quando ativado, qualquer texto inserido, excluído ou comentado por um revisor fica marcado visualmente (geralmente com cores e riscos), sem apagar de fato o conteúdo original até que alguém decida. O autor do documento pode, então, revisar alteração por alteração e escolher aceitar (incorporando a mudança definitivamente) ou rejeitar (voltando ao texto original) cada uma delas.
Exemplo: é como usar caneta vermelha para marcar correções numa prova impressa sem apagar o que o aluno escreveu — quem corrige depois decide quais marcações "valem" (aceitar) e quais não fazem sentido manter (rejeitar), mas o texto original nunca é destruído durante esse processo.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Sistemas operacionais',
  $q$Julgue o item a seguir, relativo a conceitos de sistemas operacionais.
Em sistemas operacionais com suporte a multitarefa preemptiva, como o Windows e as distribuições Linux modernas, o sistema operacional pode interromper a execução de um processo para dar lugar a outro, sem que o processo interrompido precise "liberar" o processador voluntariamente.$q$,
  'C',
  $q$Certo. Na multitarefa preemptiva, quem decide quando um processo deve ceder o processador para outro é o próprio sistema operacional (por meio do seu escalonador de processos), e não o processo em execução. Isso significa que o sistema pode interromper ("preemptar") um processo a qualquer momento — por exemplo, para dar tempo de CPU a um processo mais prioritário — independentemente de o processo interrompido estar disposto a isso ou não. Esse modelo é o padrão em sistemas modernos como Windows e Linux, e evita que um único programa travado monopolize o processador e trave o computador inteiro.
Exemplo: é diferente de um sistema "cooperativo" antigo, em que um programa só cedia a vez quando "quisesse" — nos sistemas modernos, é como um árbitro que pode parar o jogo e trocar o jogador em campo a qualquer momento, sem depender da vontade de quem está jogando.$q$,
  'média'
);
