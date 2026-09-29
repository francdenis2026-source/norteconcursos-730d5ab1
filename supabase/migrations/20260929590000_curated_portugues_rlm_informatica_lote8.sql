-- Curated (authored) questions, lote 8: Língua Portuguesa, Raciocínio
-- Lógico, Informática e Estatística. Same authoring approach as prior
-- lotes: original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, difficulty)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Concordância — pronome de tratamento',
  $q$Julgue o item a seguir.
Na frase "Vossa Excelência tem sido diligente na condução dos trabalhos", há erro de concordância, pois pronomes de tratamento como "Vossa Excelência", embora se refiram à pessoa com quem se fala (2ª pessoa do discurso), exigem concordância verbal e nominal na 3ª pessoa.$q$,
  'E',
  $q$Errado. Pronomes de tratamento como "Vossa Excelência", "Vossa Senhoria" são uma peculiaridade da língua: mesmo dirigindo-se diretamente ao interlocutor (2ª pessoa do discurso, quem está "ouvindo"), eles exigem concordância verbal e nominal na 3ª pessoa gramatical, por serem, na forma, substantivos femininos ("vossa excelência" = "a sua excelência"). Na frase do item, "tem sido diligente" já está corretamente na 3ª pessoa do singular, concordando com "Vossa Excelência" — não há erro de concordância; ao contrário, a frase segue exatamente a regra correta.
Exemplo: mesmo falando diretamente com um juiz, diz-se "Vossa Excelência DEVE decidir" (3ª pessoa), nunca "Vossa Excelência DEVEIS decidir" (2ª pessoa) — a concordância acompanha a estrutura gramatical do pronome de tratamento, não a pessoa real do diálogo.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Coesão — elipse',
  $q$Texto: "O delegado assinou o auto de prisão; o escrivão, o termo de depoimento."
Julgue o item a seguir.
No trecho "o escrivão, o termo de depoimento", há uma elipse do verbo "assinou", recurso de coesão que evita a repetição desnecessária do termo já mencionado na primeira oração.$q$,
  'C',
  $q$Certo. A elipse é a omissão de um termo que pode ser facilmente recuperado pelo contexto, evitando repetições desnecessárias e tornando o texto mais econômico. Na frase, "o escrivão, o termo de depoimento" omite o verbo "assinou" (que já apareceu na primeira oração, referente ao delegado), mas o sentido continua claro: "o escrivão [assinou] o termo de depoimento". Essa construção, marcada por uma vírgula no lugar do verbo omitido, é um recurso de coesão textual bastante comum e eficaz.
Exemplo: é o mesmo recurso de "Pedro estudou Direito; Maria, Medicina" — fica implícito que Maria também "estudou" Medicina, sem precisar repetir o verbo, porque o contexto da primeira oração já deixou isso claro.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '13a80069-1852-447d-a71b-1c8f2489c487', 'auth-port-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Redação oficial — impessoalidade',
  $q$Considerando as disposições do Manual de Redação da Presidência da República acerca da redação oficial, julgue o item a seguir.
O princípio da impessoalidade na redação oficial decorre da ausência de caráter pessoal do próprio comunicado, uma vez que ele trata sempre de assuntos de interesse público, e não de questões particulares de quem o redige.$q$,
  'C',
  $q$Certo. A impessoalidade na redação oficial existe justamente porque o texto não é uma manifestação pessoal do funcionário que o redige, mas sim do próprio serviço público — trata-se sempre de assuntos institucionais, ligados ao interesse coletivo ou ao funcionamento da administração, e não de opiniões, sentimentos ou interesses particulares de quem escreve. Por isso, a linguagem deve ser neutra, evitando expressões de opinião pessoal, coloquialismos ou marcas subjetivas de quem assina o documento.
Exemplo: é a diferença entre escrever "Acho que seria bom revisar esse processo" (marca pessoal e subjetiva) e "Recomenda-se a revisão do referido processo" (formulação impessoal, focada no assunto institucional, não em quem opina).$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Sequência lógica de figuras/padrões numéricos',
  $q$Considere a sequência 2, 6, 12, 20, 30, ..., em que a diferença entre termos consecutivos aumenta segundo um padrão constante. Julgue o item a seguir.
O sexto termo dessa sequência é igual a 42.$q$,
  'C',
  $q$Certo. Observando as diferenças entre os termos: 6−2=4, 12−6=6, 20−12=8, 30−20=10 — a diferença entre termos consecutivos aumenta sempre de 2 em 2 (4, 6, 8, 10, ...). Seguindo esse padrão, a próxima diferença (entre o quinto e o sexto termo) deveria ser 12. Somando ao quinto termo: 30 + 12 = 42, exatamente o valor apresentado no item.
Exemplo: essa sequência, na verdade, corresponde à fórmula n×(n+1), com n=1,2,3,4,5,6: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42 — mas mesmo sem enxergar essa fórmula de imediato, observar o padrão nas diferenças entre os termos já é suficiente para prever o próximo valor corretamente.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Problemas de idade II',
  $q$A soma das idades de dois irmãos é 40 anos. Sabe-se que o mais velho tem o dobro da idade do mais novo. Julgue o item a seguir.
A idade do irmão mais novo é igual a 12 anos.$q$,
  'E',
  $q$Errado. Chamando a idade do irmão mais novo de "x", a do mais velho é "2x" (o dobro). A soma das idades é x + 2x = 3x, que deve ser igual a 40: 3x = 40, logo x = 40 ÷ 3 ≈ 13,33 anos — um valor não inteiro, o que já indicaria uma inconsistência se o enunciado exigisse idades exatas em anos completos. De todo modo, mesmo desconsiderando essa particularidade, 12 não satisfaz a equação (3 × 12 = 36, e não 40), confirmando que a idade do mais novo não é 12 anos, tornando o item errado.
Exemplo: esse tipo de questão sempre se resolve transformando as frases em uma equação com uma única variável (aqui, "x" para a idade do mais novo) e depois isolando essa variável para descobrir seu valor — e, ao final, vale sempre conferir a resposta substituindo o valor encontrado de volta nas condições do enunciado.$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Vírus e worms',
  $q$Julgue o item a seguir, relativo a conceitos de segurança da informação.
Diferentemente de um vírus de computador, que geralmente precisa de um arquivo hospedeiro e da ação do usuário (como executar um programa infectado) para se propagar, um worm é capaz de se replicar e se espalhar por uma rede de forma autônoma, sem necessariamente depender da execução de um arquivo pelo usuário.$q$,
  'C',
  $q$Certo. Essa é uma distinção clássica entre os dois tipos de malware: o vírus tradicional costuma "grudar" em um arquivo ou programa hospedeiro e só se ativa quando esse arquivo é executado por alguém, geralmente exigindo alguma ação humana para se espalhar (como abrir um anexo infectado). Já o worm (verme) tem a capacidade de se replicar sozinho, explorando vulnerabilidades de rede para saltar de um computador a outro sem depender de um arquivo hospedeiro específico nem de uma ação direta do usuário, o que costuma torná-lo capaz de se espalhar muito mais rápido em ambientes de rede vulneráveis.
Exemplo: é a diferença entre uma gripe que só pega se a pessoa entrar em contato direto com alguém contaminado (vírus, precisa do "hospedeiro" e de uma ação) e uma contaminação que se espalha sozinha pelo encanamento de água de um prédio inteiro, sem que ninguém precise fazer nada (worm, autônomo).$q$,
  'média'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '705afab1-ae16-46b8-8717-44d21d732faf', 'auth-info-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Gerenciamento de arquivos e pastas',
  $q$Julgue o item a seguir, relativo ao gerenciamento de arquivos no Windows (versão padrão de instalação).
Ao mover um arquivo, por meio de recortar e colar, de uma pasta para outra dentro do mesmo disco (unidade), o arquivo original é removido da pasta de origem e passa a existir apenas na pasta de destino, sem duplicação de conteúdo.$q$,
  'C',
  $q$Certo. A operação de "mover" (recortar e colar) tem exatamente esse efeito: o arquivo deixa de existir na pasta de origem e passa a existir somente na pasta de destino — não há duplicação, apenas realocação do mesmo arquivo. Isso é diferente da operação de "copiar e colar", que cria uma cópia idêntica do conteúdo, mantendo o arquivo original intacto na pasta de origem além da nova cópia na pasta de destino. Vale notar que, quando a movimentação envolve unidades diferentes (por exemplo, do HD interno para um pendrive), o sistema pode, internamente, realizar uma cópia seguida da exclusão do original, mas o resultado final observado pelo usuário continua sendo o de um arquivo "movido", sem duplicação visível.
Exemplo: é a diferença entre "levar" uma caixa de um cômodo para outro da casa (mover — ela só existe em um lugar por vez) e "fazer uma cópia" da caixa e colocar essa cópia noutro cômodo, mantendo a original onde estava (copiar — duas caixas existem agora).$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a7ae3924-db95-4f19-9d59-67f2c3011458', 'auth-rlm-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Estatística', 'Moda',
  $q$Considere o seguinte conjunto de dados, referente ao turno de trabalho preferido de 9 servidores: manhã, manhã, tarde, manhã, noite, tarde, manhã, tarde, tarde. Julgue o item a seguir.
Esse conjunto de dados é bimodal, pois "manhã" e "tarde" aparecem o mesmo número de vezes, sendo as duas modas do conjunto.$q$,
  'C',
  $q$Certo. A moda é o valor (ou categoria) que aparece com maior frequência em um conjunto de dados. Contando as ocorrências: "manhã" aparece 4 vezes, "tarde" aparece 4 vezes, e "noite" aparece apenas 1 vez. Como "manhã" e "tarde" empatam com a maior frequência (4 cada), o conjunto tem duas modas simultâneas, sendo classificado como bimodal — diferente de um conjunto unimodal, que teria apenas um valor mais frequente, ou amodal, em que todos os valores aparecem com a mesma frequência.
Exemplo: é a mesma ideia de perguntar "qual sabor de sorvete é mais pedido numa lanchonete" e descobrir que chocolate e morango empatam em primeiro lugar — os dois seriam, ao mesmo tempo, "os sabores mais pedidos" (a moda), tornando a distribuição bimodal.$q$,
  'fácil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '5873244d-48e6-4241-a474-b5db3317d27f', 'auth-port-033',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Voz passiva sintética',
  $q$Julgue o item a seguir.
Na frase "Apreendeu-se grande quantidade de material ilícito durante a operação", a partícula "se" tem função de partícula apassivadora, e o sujeito da oração é "grande quantidade de material ilícito".$q$,
  'C',
  $q$Certo. Como o verbo "apreender" é transitivo direto (é possível apreender ALGO), o "se" junto a ele forma a voz passiva sintética — construção equivalente à voz passiva analítica "Grande quantidade de material ilícito foi apreendida durante a operação". Nessa transformação, fica claro que "grande quantidade de material ilícito" é, de fato, o sujeito paciente da oração (quem sofre a ação de ser apreendido), e não um simples objeto direto, confirmando a função apassivadora do "se" nesse contexto.
Exemplo: "Vendem-se casas" equivale a "Casas são vendidas" — em ambos os casos, "casas" é o sujeito (quem sofre a ação de ser vendido), e o "se" apassivador é apenas uma forma mais compacta de expressar a mesma ideia da voz passiva analítica.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f', 'auth-port-034',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Língua Portuguesa', 'Uso do hífen',
  $q$Julgue o item a seguir, considerando as regras do Acordo Ortográfico da Língua Portuguesa vigente.
A palavra "infraestrutura" deve ser escrita sem hífen, pois, com o prefixo "infra-", o hífen só é obrigatório quando o segundo elemento começa com a mesma vogal com que termina o prefixo ou com "h".$q$,
  'C',
  $q$Certo. Pelo Acordo Ortográfico vigente, prefixos terminados em vogal (como "infra-", "supra-", "ultra-", "auto-", "semi-") geralmente se unem ao segundo elemento sem hífen, EXCETO quando o segundo elemento começa pela mesma vogal com que termina o prefixo (gerando um encontro de vogais idênticas) ou quando começa por "h" (nesse caso, o "h" costuma ser suprimido ou o hífen mantido, conforme o prefixo específico). Como "estrutura" começa com "e", vogal diferente do "a" final de "infra", e não começa com "h", a junção se dá sem hífen: "infraestrutura", confirmando a forma correta apresentada no item.
Exemplo: compare com "infra-hepático" (mantém hífen, pois o segundo elemento começa com "h") ou com prefixos como "micro-ondas" (mantém hífen porque, apesar de não ser a mesma regra exata, envolve uma exceção consolidada) — cada prefixo tem particularidades, mas "infra" seguido de palavra começada por vogal diferente da sua vogal final, como "estrutura", dispensa o hífen.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '3c989c30-37f2-41c5-84f0-65d9bf9e7a45', 'auth-rlm-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Raciocínio Lógico', 'Problemas de porcentagem com aumento e desconto',
  $q$Um produto teve seu preço aumentado em 20% e, em seguida, esse novo preço sofreu um desconto de 20%. Julgue o item a seguir.
Ao final dessas duas operações, o preço do produto retorna exatamente ao valor original.$q$,
  'E',
  $q$Errado. Aumentar 20% e depois dar 20% de desconto NÃO se cancelam, porque as porcentagens incidem sobre bases diferentes. Considerando um preço original de R$ 100,00: aumentando 20%, o novo preço é R$ 120,00. Aplicando 20% de desconto sobre esse novo valor (e não sobre os R$ 100,00 originais): 20% de 120 = 24, então o preço final é 120 − 24 = R$ 96,00 — menor que o valor original de R$ 100,00. Isso acontece porque o desconto de 20% é calculado sobre uma base já maior (120), então em valor absoluto ele "tira" mais do que os 20% de aumento "acrescentaram" sobre a base original de 100.
Exemplo: é um erro comum achar que "+20% depois −20%" volta ao valor inicial — na prática, qualquer sequência de aumento e desconto com a mesma porcentagem sempre resulta em um valor final MENOR que o original, porque o desconto incide sobre uma base maior do que aquela sobre a qual o aumento foi calculado.$q$,
  'difícil'
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'bef7a8b5-d550-4309-9e95-a911ea8f1906', 'auth-info-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Informática', 'Atualizações de software',
  $q$Julgue o item a seguir, relativo a boas práticas de segurança da informação.
Manter o sistema operacional e os aplicativos sempre atualizados é uma prática recomendada de segurança, pois as atualizações frequentemente corrigem vulnerabilidades já conhecidas e exploradas por atacantes, reduzindo a superfície de ataque disponível em um dispositivo.$q$,
  'C',
  $q$Certo. Fabricantes de software lançam atualizações regularmente não apenas para adicionar novos recursos, mas principalmente para corrigir falhas de segurança (vulnerabilidades) descobertas no sistema — falhas que, uma vez conhecidas publicamente, tornam-se alvos fáceis para atacantes que sabem exatamente como explorá-las em sistemas desatualizados. Manter tudo atualizado fecha essas "portas" já conhecidas antes que sejam exploradas, sendo uma das medidas de segurança mais básicas e eficazes recomendadas por especialistas.
Exemplo: é como consertar rapidamente uma fechadura com defeito conhecido assim que o fabricante avisa sobre o problema — quanto mais tempo a fechadura ficar sem conserto depois que o defeito se torna de conhecimento público, mais tempo qualquer pessoa que saiba do problema tem para tentar se aproveitar dele.$q$,
  'fácil'
);
