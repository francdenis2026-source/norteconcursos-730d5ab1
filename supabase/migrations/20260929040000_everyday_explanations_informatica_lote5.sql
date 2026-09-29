-- Explicações do dia a dia: Informática, lote 5 — PF 2021 (itens 83-96,
-- metadados/mineração de dados/banco de dados) e SEFAZ-AC 2023 (itens
-- 16-18). Os itens do SEFAZ-AC foram reconferidos contra o gabarito e a
-- prova originais da CEBRASPE (mesmo processo da migration
-- 20260928140000/20260928170000) — aqui as letras já batiam certo com o
-- conteúdo gravado no banco, mesmo com a ordem das alternativas
-- diferente da prova real, então não precisou de correção de dado.

-- 83: metadado descreve PROPRIEDADES do próprio arquivo (autor, data, tamanho), não o "destino final" definido pelo remetente.
update public.official_exam_questions set review_note=$q$Errado. Metadados são informações SOBRE o arquivo — quem criou, quando, tamanho, formato — não uma definição de "pra onde o arquivo deve ir". Confundir metadado com "destino da mensagem" troca o conceito por outra coisa (mais parecido com um endereço de envio de email, que é uma informação separada).
Exemplo: os metadados de uma foto no celular guardam a data, o modelo da câmera e às vezes a localização de onde foi tirada — nada disso tem a ver com "pra quem" você vai mandar essa foto depois.$q$
where exam_year=2021 and item_number=83 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 86: clustering agrupa objetos parecidos entre si, separando-os dos objetos de outros grupos — definição padrão.
update public.official_exam_questions set review_note=$q$Correto. É a definição clássica de análise de agrupamento (clustering): organizar os dados de forma que itens parecidos fiquem no mesmo grupo, e itens diferentes fiquem em grupos separados — sem que ninguém precise dizer de antemão quais são os grupos certos (o algoritmo descobre isso sozinho).
Exemplo: é como organizar uma gaveta de roupas por semelhança sem seguir uma lista fixa de categorias — camisetas parecidas ficam juntas, casacos ficam num grupo à parte, naturalmente pela semelhança entre as peças.$q$
where exam_year=2021 and item_number=86 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 87: essa descrição ("medida de certeza de que o intervalo contém um parâmetro") é de INTERVALO DE CONFIANÇA (estatística), não de entropia da informação.
update public.official_exam_questions set review_note=$q$Errado. O item descreve o conceito de INTERVALO DE CONFIANÇA (usado em estatística pra estimar onde um valor populacional provavelmente está), não entropia da informação. Entropia é outra coisa completamente diferente: uma medida de o quanto de "surpresa" ou incerteza existe numa fonte de informação, usada em teoria da informação e aprendizado de máquina.
Exemplo: intervalo de confiança é tipo dizer "tenho 95% de certeza que a média real está entre 10 e 12" — entropia é mais parecido com medir "quão imprevisível é o próximo resultado de um dado viciado" — são medidas de áreas diferentes, aplicadas a perguntas diferentes.$q$
where exam_year=2021 and item_number=87 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 88: big data envolve dados de formatos variados (inclusive não relacionais/NoSQL), não exclusivamente tabelas relacionais.
update public.official_exam_questions set review_note=$q$Errado. Uma das características centrais do big data é justamente a VARIEDADE dos formatos de dados — texto, imagem, vídeo, logs, redes sociais — muitos deles nem cabem bem em tabelas relacionais tradicionais. Inclusive, boa parte das tecnologias de big data existe justamente pra lidar com dados que NÃO são relacionais (bancos NoSQL, por exemplo).
Exemplo: os dados de big data de uma rede social incluem fotos, textos, curtidas, localização, vídeos — uma mistura de formatos que não caberia direito numa única tabela relacional tradicional.$q$
where exam_year=2021 and item_number=88 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 89: atributos (colunas) e registros (linhas) são conceitos diferentes — quantidade de um não determina a do outro.
update public.official_exam_questions set review_note=$q$Errado. Atributos são as COLUNAS de uma tabela (as características que cada registro tem, como nome, idade, endereço); registros são as LINHAS (cada item individual armazenado). Uma tabela com 205 atributos pode ter qualquer quantidade de registros — zero, um, milhões — os dois números não têm relação direta.
Exemplo: uma planilha pode ter 205 colunas de informações sobre cada funcionário, mas isso não define quantos funcionários (linhas) existem na planilha — podem ser 3 ou 3.000, independente do número de colunas.$q$
where exam_year=2021 and item_number=89 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 90: entidade no modelo ER geralmente representa um objeto/conceito do mundo real — definição básica de modelagem.
update public.official_exam_questions set review_note=$q$Correto. No modelo entidade-relacionamento, uma "entidade" é a representação de algo concreto ou conceitual do mundo real que faz sentido guardar informações sobre — como "cliente", "produto" ou "funcionário".
Exemplo: ao modelar o banco de dados de uma loja, "cliente" e "produto" viram entidades porque representam coisas reais e concretas do negócio que precisam ser registradas e consultadas.$q$
where exam_year=2021 and item_number=90 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 91: restrições de integridade garantem confiabilidade dos dados armazenados num SGBD — conceito básico correto.
update public.official_exam_questions set review_note=$q$Correto. Restrições de integridade são regras que o banco de dados aplica automaticamente pra impedir dados inconsistentes ou inválidos — como não deixar um CPF duplicado ou uma idade negativa. Isso garante que o que está armazenado seja confiável de usar depois.
Exemplo: é como as regras de um formulário online que não deixam você cadastrar um email sem "@" — essas travas garantem que os dados guardados façam sentido e sejam confiáveis.$q$
where exam_year=2021 and item_number=91 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 93: hiperchave (superchave) é um CONJUNTO DE ATRIBUTOS (colunas) que identifica uma linha, não uma "tupla" (que é a própria linha).
update public.official_exam_questions set review_note=$q$Errado. Hiperchave (ou superchave) é um conjunto de COLUNAS (atributos) que, juntas, conseguem identificar de forma única cada linha de uma tabela — ela não é "uma tupla" (tupla é o nome técnico pra uma linha/registro inteiro). O item confunde o conceito de chave (um conjunto de colunas identificadoras) com o de tupla (o próprio registro).
Exemplo: numa tabela de alunos, "CPF" sozinho, ou "nome + data de nascimento" juntos, podem ser hiperchaves — são as COLUNAS usadas pra identificar o aluno, não o registro do aluno inteiro.$q$
where exam_year=2021 and item_number=93 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 94: dados estruturados têm formato rígido e cabem em campos de tabela relacional — definição padrão que os diferencia dos não estruturados.
update public.official_exam_questions set review_note=$q$Correto. Dados estruturados seguem um formato fixo e organizado (como linhas e colunas de uma planilha ou tabela de banco relacional) — cada informação tem seu "lugar certo". Dados não estruturados (como um texto livre, um áudio ou uma imagem) não têm esse encaixe rígido, sendo mais difíceis de guardar direto numa tabela tradicional.
Exemplo: uma planilha de clientes com colunas fixas (nome, telefone, endereço) é dado estruturado; um áudio de atendimento ao cliente, sem formato fixo pra "encaixar em colunas", é dado não estruturado.$q$
where exam_year=2021 and item_number=94 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 95: comandos de controle de transação (às vezes chamados DTL, mais comumente TCL) gerenciam operações como COMMIT e ROLLBACK dentro do banco.
update public.official_exam_questions set review_note=$q$Correto. Os comandos que controlam transações dentro de um banco de dados — como confirmar (COMMIT) ou desfazer (ROLLBACK) um conjunto de operações — formam essa categoria de comandos SQL voltada especificamente pra gerenciar transações, garantindo que operações sejam aplicadas por completo ou canceladas por completo.
Exemplo: é como o "salvar" ou "desfazer tudo" de um editor de texto, mas aplicado a um conjunto de mudanças no banco de dados — ou tudo é confirmado, ou tudo volta atrás, sem ficar "pela metade".$q$
where exam_year=2021 and item_number=95 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 96: API não é um "padrão XML" — é um conceito geral de interface de comunicação entre programas, que pode usar XML, JSON ou nenhum formato específico.
update public.official_exam_questions set review_note=$q$Errado. API (Interface de Programação de Aplicações) não é um padrão específico de XML — é um conceito bem mais amplo: um conjunto de regras que permite que programas diferentes conversem entre si, podendo usar XML, JSON, ou até nenhum formato de troca de dados baseado em texto, dependendo de como foi criada.
Exemplo: uma API de previsão do tempo pode responder em JSON, outra em XML — o formato de resposta é só um detalhe de implementação, não a definição do que é uma API.$q$
where exam_year=2021 and item_number=96 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 16 (SEFAZ-AC 2023): "Verificar Acessibilidade" no Word facilita leitura/edição pra pessoas com deficiência (letras da prova reordenadas no nosso banco, conteúdo conferido).
update public.official_exam_questions set review_note=$q$Correto. O recurso "Verificar Acessibilidade" do Word 365 analisa o documento e aponta problemas que dificultariam a leitura por pessoas com deficiência (como imagens sem descrição ou contraste ruim de cores), sugerindo correções.
Exemplo: é como um "revisor" automático que aponta, por exemplo, que uma foto no documento não tem descrição em texto — informação essencial pra quem usa leitor de tela.$q$
where exam_year=2023 and item_number=16 and career_name='Especialista da Fazenda Estadual' and official_answer='D';

-- 17 (SEFAZ-AC 2023): "allintitle:" restringe a busca do Google a páginas com os termos no TÍTULO.
update public.official_exam_questions set review_note=$q$Correto. O operador "allintitle:" do Google filtra os resultados pra mostrar só páginas que tenham TODOS os termos buscados no título da página — é exatamente o comando certo pra procurar "SEFAZ AC" especificamente no título de uma página.
Exemplo: é como filtrar buscas de emprego só pelo "cargo no título do anúncio", ignorando anúncios que só mencionam o termo no meio do texto.$q$
where exam_year=2023 and item_number=17 and career_name='Especialista da Fazenda Estadual' and official_answer='E';

-- 18 (SEFAZ-AC 2023): OneDrive é serviço de armazenamento em nuvem; as outras opções são navegador, VPN, cliente de email e streaming de música.
update public.official_exam_questions set review_note=$q$Correto. OneDrive é um serviço de armazenamento de arquivos em nuvem da Microsoft — as outras opções são coisas completamente diferentes: NordVPN é serviço de VPN, Thunderbird é cliente de email, Spotify é streaming de música, e Google Chrome é navegador. Só o OneDrive de fato guarda arquivos na nuvem.
Exemplo: é a mesma ideia do Google Drive ou do Dropbox — um espaço na internet pra guardar arquivos e acessá-los de qualquer dispositivo conectado.$q$
where exam_year=2023 and item_number=18 and career_name='Especialista da Fazenda Estadual' and official_answer='A';
