-- Curated (authored) questions, lote 1: Língua Portuguesa, Raciocínio
-- Lógico e Informática. Inspired by the general topics covered in the
-- reference PDFs the user uploaded to Google Drive on 2026-09-29 (folders
-- "PORTUGUES QUESTOES" and "SIMULADOS E QUESTOES") — none of those PDFs'
-- text is reproduced here. Every stem, alternative and explanation below
-- was written from scratch for this migration, CEBRASPE Certo/Errado
-- style, tied to the PF 2025 Agente syllabus edition/topics already used
-- by the existing curated_question_catalog rows.
--
-- These subjects don't fall under official_exam_questions_active_legal_audit_check
-- (no legal_basis needed): grammar, logic and generic informatics concepts
-- don't change with legislative updates, unlike legal disciplines.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Crase',
  $q$Julgue o item a seguir.
Em "A denúncia foi encaminhada à autoridade competente", o acento indicativo de crase é obrigatório, pois há fusão da preposição "a", exigida pelo verbo "encaminhar", com o artigo feminino "a" que antecede "autoridade".$q$,
  'C',
  $q$Certo. A crase é a fusão da preposição "a" com o artigo feminino "a" (ou com o "a" de pronomes demonstrativos como "aquele"). Aqui, o verbo "encaminhar" pede a preposição "a" ("encaminhar a algo/alguém") e o substantivo "autoridade" é feminino e vem determinado por artigo ("a autoridade competente", e não "autoridade competente" em geral) — por isso as duas condições que geram a crase estão presentes, e o acento é obrigatório.
Exemplo: é a mesma lógica de "Entreguei o relatório à diretora" (crase, pois "entregar a" + "a diretora") versus "Entreguei o relatório a autoridades diversas" (sem crase, porque "autoridades" aqui está indeterminado, sem artigo).$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Regência verbal',
  $q$Julgue o item a seguir.
Na frase "O delegado assistiu ao depoimento da testemunha sem interromper", o verbo "assistir", no sentido de "presenciar", está corretamente empregado com a preposição "a", conforme a norma-padrão.$q$,
  'C',
  $q$Certo. O verbo "assistir" muda de regência conforme o sentido: quando significa "presenciar, ver" (assistir A um filme, A um depoimento), pede a preposição "a" — é transitivo indireto. Já quando significa "prestar assistência, ajudar" (assistir O paciente), é transitivo direto, sem preposição. Como o item usa "assistir" no sentido de presenciar o depoimento, a regência com "a" está correta.
Exemplo: "O médico assistiu o paciente durante a cirurgia" (ajudou, sem preposição) é diferente de "A família assistiu à cirurgia pela câmera" (presenciou, com preposição "a").$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Concordância verbal',
  $q$Julgue o item a seguir.
Em "Fazem dez anos que o edital foi publicado", há erro de concordância verbal, pois o verbo "fazer", quando indica tempo decorrido, é impessoal e deve permanecer na terceira pessoa do singular.$q$,
  'C',
  $q$Certo. Quando o verbo "fazer" expressa tempo decorrido (como em "faz dez anos que..."), ele é impessoal — não tem sujeito, e por isso deve ficar sempre na 3ª pessoa do singular, mesmo que o numeral que o acompanhe pareça "pedir" o plural. O correto seria "Faz dez anos que o edital foi publicado". A forma "Fazem dez anos" é um erro comum, mas segue sendo erro em concursos.
Exemplo: é o mesmo caso de "Faz três meses que não chove" — ninguém diria "Fazem três meses", porque "fazer" aqui não tem sujeito nenhum a concordar; ele só indica quanto tempo passou.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Pontuação',
  $q$Julgue o item a seguir.
Em "Os agentes, que participaram da operação, receberam elogios da chefia", o uso das vírgulas isolando a oração "que participaram da operação" está correto, pois se trata de uma oração explicativa, aplicável a todos os agentes.$q$,
  'E',
  $q$Errado. O uso das vírgulas muda o sentido da frase. Com vírgulas (oração explicativa), a frase afirma que TODOS os agentes participaram da operação e todos foram elogiados — a informação é um comentário a mais, não uma condição. Sem vírgulas (oração restritiva: "Os agentes que participaram da operação receberam elogios"), a frase restringe o grupo: só os agentes QUE participaram (e não outros) receberam elogios. Como o item não dá nenhum contexto que indique que "todos os agentes" participaram da operação, o mais provável — e o padrão que a banca cobra nesse tipo de questão — é que a ideia pretendida seja restritiva, sem vírgulas; portanto, usar vírgulas aqui está incorreto para o sentido mais natural da frase.
Exemplo: é a diferença entre "Os alunos, que estudaram muito, passaram" (todos os alunos estudaram e passaram) e "Os alunos que estudaram muito passaram" (só os que estudaram muito passaram — outros podem ter reprovado).$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Coesão e paráfrase',
  $q$Julgue o item a seguir.
O trecho "Embora tivesse provas suficientes, o delegado optou por aguardar a perícia complementar" pode ser reescrito, sem alteração de sentido e mantendo a correção gramatical, como "O delegado tinha provas suficientes, mas optou por aguardar a perícia complementar".$q$,
  'C',
  $q$Certo. "Embora" introduz uma oração concessiva (uma ideia que contraria o que se esperaria, mas não impede o fato principal). A conjunção "mas" tem o mesmo valor de contraste quando liga duas orações coordenadas. Reescrever "Embora tivesse provas suficientes, [ele] optou por..." como "[Ele] tinha provas suficientes, mas optou por..." preserva exatamente essa relação de concessão/contraste, apenas trocando a subordinação (com "embora") pela coordenação (com "mas") — recurso comum e correto de reescrita em provas de Português.
Exemplo: "Embora estivesse chovendo, saímos para correr" equivale a "Estava chovendo, mas saímos para correr" — a ideia de contraste entre a chuva e a decisão de sair continua a mesma nas duas versões.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Negação de proposições',
  $q$Julgue o item a seguir.
A negação da proposição "Se o suspeito confessar, então o inquérito será arquivado" é logicamente equivalente a "O suspeito confessou e o inquérito não foi arquivado".$q$,
  'C',
  $q$Certo. A negação de uma condicional "Se P, então Q" não é "Se P, então não Q" nem "Se não P, então Q" — é sempre "P e não Q". Isso porque a condicional só é falsa em um único caso: quando o "se" (P) acontece mas o "então" (Q) não se confirma. Negar a condicional significa afirmar exatamente essa situação que a torna falsa: P verdadeiro e Q falso. Aqui, P = "o suspeito confessar" e Q = "o inquérito será arquivado"; a negação correta é "o suspeito confessou e o inquérito não foi arquivado" — que é exatamente o que o item apresenta.
Exemplo: negar "Se chover, o jogo será cancelado" não é "Se não chover, o jogo não será cancelado" — é "Choveu e o jogo não foi cancelado", que é a única situação capaz de provar a promessa original errada.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Conjuntos',
  $q$Considere que, em uma delegacia com 60 policiais, 35 atuam na área de investigação, 28 atuam na área administrativa e 10 atuam em ambas as áreas simultaneamente. Com base nessa situação, julgue o item.
O número de policiais que não atuam em nenhuma das duas áreas é igual a 7.$q$,
  'C',
  $q$Certo. Para não contar duas vezes quem está nas duas áreas, soma-se investigação e administrativa e depois subtrai a interseção (os que fazem as duas coisas): 35 + 28 − 10 = 53 policiais atuam em pelo menos uma das duas áreas. Como a delegacia tem 60 policiais no total, os que não atuam em nenhuma das duas são 60 − 53 = 7.
Exemplo: é como contar quantas pessoas gostam de café OU chá numa sala — se simplesmente somar "gosta de café" com "gosta de chá", quem gosta dos dois é contado duas vezes; por isso se subtrai uma vez a interseção antes de descobrir quem sobrou fora dos dois grupos.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Análise combinatória',
  $q$Julgue o item a seguir.
Uma equipe de abordagem deve ser formada por 3 policiais escolhidos entre 8 disponíveis, sem distinção de função entre os escolhidos. Nessa situação, existem exatamente 56 equipes distintas possíveis.$q$,
  'C',
  $q$Certo. Como a ordem não importa (os 3 escolhidos formam a mesma equipe independentemente da ordem em que são selecionados) e não há repetição (cada policial só pode estar uma vez na equipe), o cálculo correto é uma combinação simples: C(8,3) = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56.
Exemplo: é diferente de escolher "quem é o motorista, quem é o atirador e quem é o observador" entre 8 pessoas — aí a ordem/o papel de cada um importaria, e o cálculo seria um arranjo, não uma combinação. Aqui, como os três escolhidos formam só "a equipe", sem papéis distintos, usa-se combinação.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Probabilidade',
  $q$Uma urna contém 4 bolas vermelhas e 6 bolas azuis, idênticas ao tato. Retirando-se uma bola aleatoriamente, julgue o item a seguir.
A probabilidade de a bola retirada ser vermelha é igual a 40%.$q$,
  'C',
  $q$Certo. A probabilidade de um evento simples é o número de casos favoráveis dividido pelo número total de casos possíveis. Aqui, há 4 bolas vermelhas (casos favoráveis) em um total de 4 + 6 = 10 bolas (casos possíveis). A probabilidade é, portanto, 4/10 = 0,4, ou seja, 40%.
Exemplo: é a mesma lógica de dizer que, numa caixa com 10 bilhetes, 4 premiados, a chance de tirar um bilhete premiado é "4 em 10" — basta dividir o que interessa (4) pelo total (10) para achar a probabilidade.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Atalhos de teclado',
  $q$Julgue o item a seguir, relativo a aplicativos do ambiente Microsoft Office, em sua configuração padrão.
No Microsoft Word, o atalho de teclado Ctrl+Shift+C, seguido de Ctrl+Shift+V em outro trecho do texto, permite copiar a formatação de um texto e aplicá-la a outro trecho, sem copiar o conteúdo textual em si.$q$,
  'C',
  $q$Certo. Esses atalhos correspondem à ferramenta "Pincel de Formatação" usada por teclado: Ctrl+Shift+C copia apenas as características de formatação (fonte, tamanho, cor, negrito etc.) do texto selecionado, e Ctrl+Shift+V aplica essa mesma formatação a outro trecho selecionado depois — sem alterar o conteúdo (as palavras) desse segundo trecho, só a aparência dele.
Exemplo: é como copiar "o estilo da roupa", não a roupa em si — se um parágrafo está em negrito, azul e tamanho 14, usar esses atalhos em outro parágrafo faz ele ficar com a mesma aparência, mas o texto escrito nele continua o que já era.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'b2a1b459-a544-41c4-8ff8-db030d25841b', 'auth-info-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Computação em nuvem',
  $q$Julgue o item a seguir, relativo a conceitos de computação em nuvem.
No modelo de serviço SaaS (Software as a Service), o usuário final é responsável por instalar, atualizar e manter o sistema operacional e a infraestrutura de servidores utilizados pela aplicação.$q$,
  'E',
  $q$Errado. É exatamente o contrário: no SaaS, o provedor da nuvem cuida de tudo — servidores, sistema operacional, infraestrutura e até da própria aplicação — e o usuário apenas acessa e usa o software pronto, geralmente pelo navegador (como Gmail, Google Docs ou um sistema de webmail corporativo), sem precisar instalar nem manter nada. Quem instala e mantém servidor e sistema operacional é responsabilidade típica de modelos como IaaS (Infraestrutura como Serviço), não do SaaS.
Exemplo: usar o Gmail é SaaS — você só faz login e usa; já alugar um servidor virtual vazio, onde você mesmo instala o sistema operacional e os programas, é IaaS, um nível bem mais "por baixo dos panos" da nuvem.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Segurança da informação',
  $q$Julgue o item a seguir, relativo a conceitos de segurança da informação.
Phishing é uma técnica de ataque em que o criminoso tenta induzir a vítima, por meio de mensagens fraudulentas que imitam comunicações legítimas, a fornecer dados sigilosos, como senhas e números de cartão, e não depende necessariamente da exploração de uma falha técnica no sistema da vítima.$q$,
  'C',
  $q$Certo. Phishing é, antes de tudo, um golpe de engenharia social: o atacante engana a vítima psicologicamente (fazendo-a acreditar que está falando com o banco, uma empresa conhecida etc.) para que ela mesma entregue as informações sigilosas, geralmente por e-mail, SMS ou site falso que imita um site real. Diferente de um ataque que explora uma vulnerabilidade técnica no software, o phishing explora a confiança e a falta de atenção da própria pessoa — por isso costuma funcionar mesmo em sistemas tecnicamente bem protegidos.
Exemplo: é como alguém se passar por entregador para conseguir entrar num prédio e roubar um apartamento — não é preciso arrombar fechadura nenhuma (falha técnica); basta convencer o porteiro (a vítima) a abrir a porta por conta própria.$q$,
  'fácil'
);
