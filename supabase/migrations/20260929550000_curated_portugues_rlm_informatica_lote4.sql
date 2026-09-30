-- Curated (authored) questions, lote 4: Língua Portuguesa, Raciocínio
-- Lógico e Informática. Same authoring approach as lotes 1-3
-- (20260929520000, 20260929530000, 20260929540000): original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Sintaxe — período composto',
  $q$Julgue o item a seguir.
Na frase "O agente informou que o suspeito havia fugido pela janela dos fundos", a oração "que o suspeito havia fugido pela janela dos fundos" funciona como objeto direto do verbo "informar", classificando-se como uma oração subordinada substantiva objetiva direta.$q$,
  'C',
  $q$Certo. O verbo "informar", nesse contexto, é transitivo direto (informou ALGO) — e esse "algo" pode ser expresso por uma oração inteira, funcionando como o objeto direto do verbo principal. Essa oração, introduzida por "que" e completando o sentido do verbo da oração principal, é chamada de oração subordinada substantiva objetiva direta, exatamente como o item descreve.
Exemplo: é como transformar "O agente informou o fato" (objeto direto simples: "o fato") em "O agente informou que o suspeito havia fugido" (o mesmo papel de objeto direto, só que preenchido por uma oração inteira em vez de uma palavra só).$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Semântica — sinonímia e polissemia',
  $q$Julgue o item a seguir.
No trecho "A denúncia foi arquivada por falta de provas", o verbo "arquivar" está empregado em sentido figurado, referindo-se ao encerramento formal do processo, e não ao sentido literal de "guardar fisicamente em um arquivo".$q$,
  'C',
  $q$Certo. "Arquivar" tem, literalmente, o sentido de guardar fisicamente um documento em um arquivo (uma gaveta, uma pasta). No contexto jurídico, porém, "arquivar uma denúncia" é uma expressão que passou a significar, por extensão de sentido (metáfora), o encerramento formal daquele procedimento — não se trata necessariamente do ato físico de guardar papel em uma gaveta, mas de uma decisão administrativa/jurídica de não dar prosseguimento ao caso. Esse uso figurado é tão consolidado na linguagem jurídica que passou a ser o sentido predominante da expressão nesse contexto.
Exemplo: é semelhante a "engavetar um projeto" — ninguém entende isso literalmente como colocar papéis numa gaveta física; a expressão significa, por extensão, que o projeto foi abandonado ou colocado de lado.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Emprego do "que" e do "se"',
  $q$Julgue o item a seguir.
Em "Trata-se de um caso complexo, que exige atenção redobrada da equipe", a partícula "se" em "Trata-se" tem função de índice de indeterminação do sujeito, e não de partícula apassivadora.$q$,
  'C',
  $q$Certo. O verbo "tratar-se de" é uma construção pronominal em que "se" atua como índice de indeterminação do sujeito — a frase não tem um sujeito definido praticando a ação de "tratar", apenas se afirma que "há, existe, refere-se a" um caso complexo. Isso é diferente da partícula apassivadora, que ocorre com verbos transitivos diretos formando voz passiva sintética (como em "Vendem-se casas", equivalente a "Casas são vendidas"). Como "tratar de" é intransitivo nesse sentido (não tem objeto direto passível de virar sujeito paciente), o "se" aqui só pode ser índice de indeterminação, não apassivador.
Exemplo: compare com "Vende-se apartamentos" (voz passiva sintética, pois "vender" é transitivo direto e "apartamentos" poderia virar sujeito: "Apartamentos são vendidos") e "Trata-se de apartamentos" (aqui não há transformação possível para "Apartamentos são tratados-se de", o que confirma que a função do "se" é outra: indeterminar o sujeito).$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Diagramas lógicos',
  $q$Considere que todo policial civil é servidor público e que nenhum servidor público está isento de prestar contas de seus atos. Com base nessas informações, julgue o item a seguir.
Conclui-se corretamente que nenhum policial civil está isento de prestar contas de seus atos.$q$,
  'C',
  $q$Certo. Usando diagramas de conjuntos: o conjunto "policiais civis" está totalmente contido no conjunto "servidores públicos" (primeira premissa), e o conjunto "servidores públicos" não tem nenhuma intersecção com "isentos de prestar contas" (segunda premissa). Se todo policial civil está dentro de "servidor público", e "servidor público" inteiro está fora de "isento de prestar contas", então todo policial civil também está automaticamente fora de "isento de prestar contas" — ou seja, nenhum policial civil é isento. A conclusão decorre necessariamente das duas premissas.
Exemplo: é como dizer "todo cachorro é mamífero" e "nenhum mamífero é peixe" — daí se conclui, com segurança, que "nenhum cachorro é peixe", só encadeando os conjuntos um dentro do outro.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Problemas de idade',
  $q$Atualmente, a idade de Renata é o dobro da idade de seu filho. Daqui a 10 anos, a idade de Renata será o triplo da idade que o filho tinha há 5 anos. Julgue o item a seguir.
A idade atual do filho de Renata é igual a 20 anos.$q$,
  'E',
  $q$Errado. Chamando a idade atual do filho de "x", a idade atual de Renata é "2x". Daqui a 10 anos, Renata terá "2x + 10". A idade do filho há 5 anos era "x − 5", e o triplo disso é "3(x − 5) = 3x − 15". Igualando as duas expressões que descrevem a idade futura de Renata: 2x + 10 = 3x − 15. Isolando x: 10 + 15 = 3x − 2x, ou seja, x = 25. Logo, a idade atual do filho é 25 anos, e não 20 como afirma o item.
Exemplo: esse tipo de questão se resolve sempre da mesma forma — transformar cada frase do enunciado numa expressão algébrica (com uma variável para representar a idade desconhecida) e depois igualar as expressões que descrevem a mesma coisa, aqui "a idade de Renata daqui a 10 anos", contada de duas formas diferentes no enunciado.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Negação de proposições com quantificadores',
  $q$Julgue o item a seguir.
A negação da proposição "Todos os agentes participaram do treinamento" é "Nenhum agente participou do treinamento".$q$,
  'E',
  $q$Errado. A negação de "Todos são X" não é "Nenhum é X" — é "Pelo menos um não é X" (ou, em outras palavras, "Algum não é X"). Isso porque, para provar que "Todos os agentes participaram" é falso, basta encontrar UM agente que não participou; não é necessário que NENHUM tenha participado. "Nenhum participou" é uma afirmação muito mais forte do que a simples negação de "todos participaram", e por isso está incorreta como negação lógica.
Exemplo: se alguém diz "Todos os alunos passaram na prova" e isso é falso, a forma correta de expressar essa falsidade é "Pelo menos um aluno não passou" — pode ser que 29 de 30 tenham passado e só 1 não, o que já basta para tornar "todos passaram" falso, sem que seja verdade que "nenhum aluno passou".$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Navegadores de internet',
  $q$Julgue o item a seguir, relativo a conceitos de navegação na internet.
A navegação anônima (ou privativa), disponível nos principais navegadores, impede que o histórico de navegação e os cookies daquela sessão fiquem gravados no computador utilizado, mas não torna o usuário anônimo perante o provedor de internet ou os sites visitados.$q$,
  'C',
  $q$Certo. A navegação anônima/privativa afeta apenas o que fica salvo LOCALMENTE no computador: ao fechar a janela anônima, o navegador descarta o histórico daquela sessão, os cookies e dados de formulário temporários. Isso é útil, por exemplo, para não deixar rastro num computador compartilhado. Porém, esse modo não esconde a atividade do usuário do provedor de internet (que continua vendo os sites acessados) nem dos próprios sites visitados (que podem identificar o IP e outras informações do dispositivo) — ou seja, não é uma ferramenta de anonimato real na rede, diferente de uma VPN, por exemplo.
Exemplo: é como ler um livro emprestado sem escrever anotações nele (não deixa "rastro" no livro/computador), mas isso não impede que a biblioteca (o provedor de internet) saiba que você pegou aquele livro emprestado.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'b2a1b459-a544-41c4-8ff8-db030d25841b', 'auth-info-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Armazenamento em nuvem',
  $q$Julgue o item a seguir, relativo a conceitos de armazenamento em nuvem.
Serviços de armazenamento em nuvem, como Google Drive e OneDrive, permitem sincronizar arquivos entre múltiplos dispositivos, de modo que uma alteração feita em um arquivo em um dispositivo seja refletida automaticamente nos demais dispositivos conectados à mesma conta, desde que haja conexão com a internet.$q$,
  'C',
  $q$Certo. Essa é a principal vantagem prática do armazenamento em nuvem sobre um simples pen drive ou HD externo: os arquivos ficam guardados em servidores remotos e, sempre que um dispositivo conectado à mesma conta está online, ele sincroniza automaticamente as mudanças — editar um documento no computador do trabalho faz essa edição aparecer também no celular e no computador de casa, sem precisar transferir o arquivo manualmente. Sem conexão com a internet, porém, o dispositivo só enxerga a última versão que já havia sido baixada/sincronizada anteriormente.
Exemplo: é como um quadro de avisos compartilhado que todo mundo vê ao mesmo tempo — quando alguém atualiza uma informação nele, todos que têm acesso enxergam a mudança automaticamente, desde que estejam "olhando" para o quadro (conectados à internet) no momento.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Criptografia',
  $q$Julgue o item a seguir, relativo a conceitos de criptografia.
Na criptografia assimétrica, também chamada de criptografia de chave pública, são utilizadas duas chaves distintas e matematicamente relacionadas: uma chave pública, que pode ser distribuída livremente, e uma chave privada, que deve ser mantida em sigilo pelo seu titular.$q$,
  'C',
  $q$Certo. Essa é a característica central da criptografia assimétrica: diferentemente da criptografia simétrica (que usa uma única chave, compartilhada entre quem envia e quem recebe, para cifrar e decifrar), a assimétrica usa um par de chaves matematicamente ligadas. Uma delas — a chave pública — pode ser divulgada sem problema, inclusive publicamente; a outra — a chave privada — deve ficar em sigilo absoluto com o dono, pois é ela que garante a segurança do sistema (por exemplo, permitindo decifrar mensagens cifradas com a chave pública correspondente, ou assinar digitalmente documentos).
Exemplo: é como um cadeado que qualquer pessoa pode fechar (a chave pública, distribuída livremente), mas que só uma chave específica, guardada apenas pelo dono, consegue abrir (a chave privada) — qualquer um pode "trancar" uma mensagem para você, mas só você consegue "destrancá-la".$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '47c74dc1-0035-4427-bfcb-8e9ad424e734', 'auth-info-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Apresentações eletrônicas',
  $q$Julgue o item a seguir, relativo ao uso de aplicativos de apresentação de slides (Microsoft PowerPoint, versão padrão de instalação).
O modo de exibição "Classificação de Slides" permite visualizar todos os slides da apresentação em miniatura, em formato de grade, facilitando a reorganização da ordem dos slides por meio de arrastar e soltar, mas não permite a edição do conteúdo textual de cada slide individualmente nesse modo.$q$,
  'C',
  $q$Certo. O modo "Classificação de Slides" foi projetado especificamente para dar uma visão geral e panorâmica da apresentação inteira, mostrando cada slide como uma miniatura numa grade. Isso facilita bastante reorganizar a ordem dos slides (bastando arrastar e soltar as miniaturas), duplicar ou excluir slides, mas, por ser um modo de visualização em miniatura, ele não permite clicar dentro de um slide para editar textos ou objetos — para isso, é necessário voltar ao modo de exibição "Normal", que mostra o slide em tamanho de edição completo.
Exemplo: é como olhar as páginas de um álbum de fotos em miniatura para decidir a ordem em que elas vão ficar, mas, para escrever uma legenda embaixo de uma foto específica, é preciso abrir aquela página em tamanho grande primeiro.$q$,
  'fácil'
);
