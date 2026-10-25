-- Cadastro da prova objetiva da Polícia Penal do RS 2026 (cargo 24 - Policial Penal, banca Fundatec, Concurso Público nº 01/2026, aplicada em 09/08/2026). Gerado em 2026-10-18.
-- Fontes oficiais: caderno da prova (Fundatec, página de provas do concurso 1092), gabaritos DEFINITIVOS (Edital nº 24/2026, de 09/09/2026, Anexo II) e edital de abertura.
-- Gabarito definitivo do cargo 24 (1-80, * = anulada): BEAEBCCDDBEAACBA*ECABEABDCCDEAEADDABCBCDADADCEECBBEAECADBCDDBABCACDEACCEED*ECADB
-- Anuladas: 17 e 75 (official_answer = X).
-- Auditoria: chaves conferidas por resolução própria nas disciplinas não jurídicas; legislação federal conferida no texto compilado do Planalto (incluindo as alterações de 2024 a 2026 na LEP e na Lei Maria da Penha); itens de legislação estadual do RS, normas infralegais e documento do Governo Federal ficam em under_review com o motivo no review_note.
-- Destaques em negrito do caderno aparecem entre aspas angulares.
begin;
insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro','Prova objetiva PP-RS 2026 - Policial Penal (Fundatec)','Fundatec / Polícia Penal RS','https://www.fundatec.org.br/home/portal/concursos/provas/1092.024_Policial_Penal_NS_DM_POS-PRELO.PDF','vigente','Caderno de prova objetiva do cargo 24 - Policial Penal, 80 questões; aplicação em 09/08/2026.'),
('outro','Gabaritos definitivos PP-RS 2026 (Edital nº 24/2026, Fundatec)','Fundatec / Polícia Penal RS','https://concursos-publicacoes.s3.amazonaws.com/1092/publico/1092-EditalnA24-2026-DivulgaAAodosGabaritosDefinitivosdasProvasTeArico-Objetivas_6aa21274c9f5b.pdf','vigente','Gabaritos definitivos de todos os cargos; * = questão anulada (17 e 75 no cargo 24).'),
('outro','Edital de Abertura PP-RS 2026 (Concurso Público nº 01/2026, Fundatec)','Fundatec / Polícia Penal RS','https://concursos-publicacoes.s3.amazonaws.com/1092/publico/edital_abertura/edital_abertura_10926acfed10daaed.pdf','vigente','Edital de abertura, programas (Anexo XIII).')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;
insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id)
select 'Polícia Penal do Estado do Rio Grande do Sul','Policial Penal',2026,'FUNDATEC',(select id from public.content_sources where url='https://concursos-publicacoes.s3.amazonaws.com/1092/publico/edital_abertura/edital_abertura_10926acfed10daaed.pdf')
where not exists (select 1 from public.syllabus_editions where contest_name='Polícia Penal do Estado do Rio Grande do Sul' and role_name='Policial Penal' and contest_year=2026);
with edition as (
  select id from public.syllabus_editions where contest_name='Polícia Penal do Estado do Rio Grande do Sul' and role_name='Policial Penal' and contest_year=2026
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Prova objetiva',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Leitura, interpretação e relação entre ideias de textos; implícitos e efeitos de sentido; coesão e coerência; léxico, sinônimos e antônimos; ortografia e acentuação (Acordo Ortográfico vigente); figuras de linguagem; classes de palavras; sintaxe; concordância, regência, crase e pontuação; colocação pronominal; formação de palavras; vozes verbais.'),
  ('Informática','Microsoft Windows 10; Microsoft Word, Excel e PowerPoint; navegadores (Google Chrome e Mozilla Firefox); inteligência artificial generativa; segurança da informação.'),
  ('Raciocínio Lógico','Estrutura lógica de relações arbitrárias; sequências lógicas; diagramas lógicos; proposições e conectivos; tabelas-verdade; tautologias; equivalência e implicação; Leis de De Morgan; sentenças abertas; quantificadores; argumentos dedutivos e categóricos.'),
  ('Conhecimentos Gerais Relativos ao Sistema Prisional','Estrutura do sistema prisional; Constituição Federal e direitos fundamentais do detento; Lei 7.210/1984 (Lei de Execução Penal); normas estaduais do RS: LC 16.449/2025 (Estatuto da Polícia Penal), Instruções Normativas 014/2023 e 001/2025 GAB/SUP.'),
  ('Legislação Aplicada/Direito','Lei 11.340/2006 (Maria da Penha); Constituição Federal (princípios fundamentais, direitos e garantias, administração pública, Poder Judiciário); Constituição do Estado do RS; Lei 8.429/1992; Código Penal; Leis 8.072/1990, 10.826/2003, 11.343/2006, 9.455/1997 e 7.960/1989; Lei de Execução Penal; Decreto 678/1992 (Convenção Americana sobre Direitos Humanos).')
) as d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;
with imported(item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,legal_basis,review_note,tested_topic) as (values
(1,$q$Língua Portuguesa$q$,$q$Considerando o exposto pelo texto, é correto afirmar que:
(A) A motivação e a disciplina são fatores que podem gerar procrastinação devido à pressão causada pelo estresse decorrente da vida moderna.
(B) A autossabotagem pode ser vista como o modo pelo qual o cérebro responde a determinadas situações quando há a percepção de perigo, revestindo-se da ideia de autoproteção.
(C) A sabotagem é um comportamento característico do ser humano, sobretudo como mecanismo de autoproteção, pois pressupõe conhecimento prévio de ações iminentes.
(D) Perfeccionismo, pessimismo, autocrítica e indisciplina são mecanismos para contenção da autossabotagem, evitando que ela interfira na concretização de planos e no alcance de objetivos.
(E) A autossabotagem e a prática de procrastinação estão relacionadas à pressão sofrida pelas amígdalas, ou seja, são comportamentos de ordem eminentemente física.$q$,$q$Considerando o exposto pelo texto, é correto afirmar que:
(A) A motivação e a disciplina são fatores que podem gerar procrastinação devido à pressão causada pelo estresse decorrente da vida moderna.
(B) A autossabotagem pode ser vista como o modo pelo qual o cérebro responde a determinadas situações quando há a percepção de perigo, revestindo-se da ideia de autoproteção.
(C) A sabotagem é um comportamento característico do ser humano, sobretudo como mecanismo de autoproteção, pois pressupõe conhecimento prévio de ações iminentes.
(D) Perfeccionismo, pessimismo, autocrítica e indisciplina são mecanismos para contenção da autossabotagem, evitando que ela interfira na concretização de planos e no alcance de objetivos.
(E) A autossabotagem e a prática de procrastinação estão relacionadas à pressão sofrida pelas amígdalas, ou seja, são comportamentos de ordem eminentemente física.$q$,'B',4,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Interpretação de texto: autossabotagem como autoproteção$q$),
(2,$q$Língua Portuguesa$q$,$q$Conforme as normas ortográficas vigentes, assinale a alternativa que preenche, correta e respectivamente, as lacunas tracejadas dos trechos a seguir, retirados do texto:
 “Talvez você tenha __________ o tempo necessário”.  “Ela pode assumir muitas formas diferentes, incluindo procrastinação, compulsão alimentar, gastos excessivos, _______ por jogos de azar ou vícios diversos”.  “As pessoas também tendem a ____________ o presente e desconsiderar o futuro”.
(A) sub-estimado – obseção – supervalorizar
(B) subestimado – obceção – supervalorizar
(C) sub-estimado – obscessão – super-valorizar
(D) sub-estimado – obsessão – super-valorizar
(E) subestimado – obsessão – supervalorizar$q$,$q$Conforme as normas ortográficas vigentes, assinale a alternativa que preenche, correta e respectivamente, as lacunas tracejadas dos trechos a seguir, retirados do texto:
 “Talvez você tenha __________ o tempo necessário”.  “Ela pode assumir muitas formas diferentes, incluindo procrastinação, compulsão alimentar, gastos excessivos, _______ por jogos de azar ou vícios diversos”.  “As pessoas também tendem a ____________ o presente e desconsiderar o futuro”.
(A) sub-estimado – obseção – supervalorizar
(B) subestimado – obceção – supervalorizar
(C) sub-estimado – obscessão – super-valorizar
(D) sub-estimado – obsessão – super-valorizar
(E) subestimado – obsessão – supervalorizar$q$,'E',4,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Ortografia: hífen e grafia de palavras$q$),
(3,$q$Língua Portuguesa$q$,$q$Conforme as normas de flexão verbal e acentuação gráfica, assinale a alternativa que preenche, correta e respectivamente, as lacunas tracejadas dos trechos a seguir, retirados do texto:
 “comportamentos que parecem protetores no momento [...] podem impedir que as pessoas alcancem os objetivos que mais lhes importam, muitas vezes sem que elas se _____ conta”.  “Muitos desses ciclos de medo apenas os ______ estagnados ou até mesmo os fazem regredir”.  “Muitas pessoas também ‘simplesmente ___ muita dificuldade em associar ações a resultados’”.
(A) deem – mantêm – têm
(B) dêem – mantém – tem
(C) deêm – mantem – tem
(D) deem – mantém – têm
(E) dêem – mantêm – tem$q$,$q$Conforme as normas de flexão verbal e acentuação gráfica, assinale a alternativa que preenche, correta e respectivamente, as lacunas tracejadas dos trechos a seguir, retirados do texto:
 “comportamentos que parecem protetores no momento [...] podem impedir que as pessoas alcancem os objetivos que mais lhes importam, muitas vezes sem que elas se _____ conta”.  “Muitos desses ciclos de medo apenas os ______ estagnados ou até mesmo os fazem regredir”.  “Muitas pessoas também ‘simplesmente ___ muita dificuldade em associar ações a resultados’”.
(A) deem – mantêm – têm
(B) dêem – mantém – tem
(C) deêm – mantem – tem
(D) deem – mantém – têm
(E) dêem – mantêm – tem$q$,'A',4,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Flexão verbal e acentuação gráfica$q$),
(4,$q$Língua Portuguesa$q$,$q$A partir do fragmento “A maioria das pessoas experimenta alguma forma de autossabotagem em algum momento”, retirado do texto, é correto inferir que:
(A) Um número exíguo de pessoas experimenta o fato citado.
(B) O fato citado é experimentado por um número de pessoas aquém do que se considera mínimo.
(C) O fato citado é experimentado por todo ser humano.
(D) Muitas pessoas, quiçá a metade, experimentam o fato citado.
(E) Um menor número de pessoas não experimenta o fato citado.$q$,$q$A partir do fragmento “A maioria das pessoas experimenta alguma forma de autossabotagem em algum momento”, retirado do texto, é correto inferir que:
(A) Um número exíguo de pessoas experimenta o fato citado.
(B) O fato citado é experimentado por um número de pessoas aquém do que se considera mínimo.
(C) O fato citado é experimentado por todo ser humano.
(D) Muitas pessoas, quiçá a metade, experimentam o fato citado.
(E) Um menor número de pessoas não experimenta o fato citado.$q$,'E',4,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Inferência a partir de quantificadores$q$),
(5,$q$Língua Portuguesa$q$,$q$Com base nas normas de regência verbal e da necessidade do uso de crase, assinale a alternativa que preenche, correta e respectivamente, as lacunas pontilhadas dos trechos a seguir, retirados do texto:
 “você pode estar vivenciando uma forma de autossabotagem, um padrão ‘que impomos ..... nós mesmos’”.  “A autossabotagem se refere ..... pensamentos e sentimentos que minam seus objetivos de longo prazo”.  “afirma Tim Pychyl, psicólogo que estuda ..... procrastinação”.  “pessoas que sofreram negligência emocional por parte dos pais ou que tiveram pais emocionalmente imaturos podem ser mais propensas ..... autossabotagem”.
(A) a – a – à – a
(B) a – a – a – à
(C) à – à – a – à
(D) à – a – à – a
(E) a – à – à – a$q$,$q$Com base nas normas de regência verbal e da necessidade do uso de crase, assinale a alternativa que preenche, correta e respectivamente, as lacunas pontilhadas dos trechos a seguir, retirados do texto:
 “você pode estar vivenciando uma forma de autossabotagem, um padrão ‘que impomos ..... nós mesmos’”.  “A autossabotagem se refere ..... pensamentos e sentimentos que minam seus objetivos de longo prazo”.  “afirma Tim Pychyl, psicólogo que estuda ..... procrastinação”.  “pessoas que sofreram negligência emocional por parte dos pais ou que tiveram pais emocionalmente imaturos podem ser mais propensas ..... autossabotagem”.
(A) a – a – à – a
(B) a – a – a – à
(C) à – à – a – à
(D) à – a – à – a
(E) a – à – à – a$q$,'B',5,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Regência verbal e crase$q$),
(6,$q$Língua Portuguesa$q$,$q$Analise o fragmento a seguir, retirado do texto: “O prazo de entrega da tarefa está no seu calendário ..... semanas. Mas, na noite anterior, o trabalho ainda não está concluído. Talvez você tenha __________ o tempo necessário, pensado demais em como fazer tudo certo ou se preocupado com a recepção do público. «Se» esse cenário lhe parece familiar, você pode estar vivenciando uma forma de autossabotagem”. Nesse trecho, é correto afirmar que a partícula “se”, destacada em negrito, classifica-se como:
(A) Índice de indeterminação do sujeito.
(B) Pronome apassivador.
(C) Conjunção subordinativa.
(D) Pronome reflexivo.
(E) Palavra expletiva.$q$,$q$Analise o fragmento a seguir, retirado do texto: “O prazo de entrega da tarefa está no seu calendário ..... semanas. Mas, na noite anterior, o trabalho ainda não está concluído. Talvez você tenha __________ o tempo necessário, pensado demais em como fazer tudo certo ou se preocupado com a recepção do público. «Se» esse cenário lhe parece familiar, você pode estar vivenciando uma forma de autossabotagem”. Nesse trecho, é correto afirmar que a partícula “se”, destacada em negrito, classifica-se como:
(A) Índice de indeterminação do sujeito.
(B) Pronome apassivador.
(C) Conjunção subordinativa.
(D) Pronome reflexivo.
(E) Palavra expletiva.$q$,'C',5,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Classificação da partícula "se"$q$),
(7,$q$Língua Portuguesa$q$,$q$Considere o seguinte fragmento do texto: “comportamentos que parecem protetores no momento — adiamento, evitação, autocrítica — podem impedir que as pessoas alcancem os objetivos que mais lhes importam, muitas vezes sem que elas se ____ conta”.
No fragmento supracitado, o pronome “lhes” retoma:
(A) Protetores.
(B) Objetivos.
(C) Pessoas.
(D) Elas.
(E) Comportamentos.$q$,$q$Considere o seguinte fragmento do texto: “comportamentos que parecem protetores no momento — adiamento, evitação, autocrítica — podem impedir que as pessoas alcancem os objetivos que mais lhes importam, muitas vezes sem que elas se ____ conta”.
No fragmento supracitado, o pronome “lhes” retoma:
(A) Protetores.
(B) Objetivos.
(C) Pessoas.
(D) Elas.
(E) Comportamentos.$q$,'C',5,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Pronome oblíquo: referente$q$),
(8,$q$Língua Portuguesa$q$,$q$Considere o seguinte fragmento do texto: “comportamentos que parecem protetores no momento — adiamento, evitação, autocrítica — podem impedir que as pessoas alcancem os objetivos que mais lhes importam, muitas vezes sem que elas se ____ conta”.
No fragmento supracitado, o pronome “lhes” exerce qual função sintática?
(A) Adjunto adnominal.
(B) Complemento nominal.
(C) Sujeito.
(D) Objeto indireto.
(E) Objeto direto.$q$,$q$Considere o seguinte fragmento do texto: “comportamentos que parecem protetores no momento — adiamento, evitação, autocrítica — podem impedir que as pessoas alcancem os objetivos que mais lhes importam, muitas vezes sem que elas se ____ conta”.
No fragmento supracitado, o pronome “lhes” exerce qual função sintática?
(A) Adjunto adnominal.
(B) Complemento nominal.
(C) Sujeito.
(D) Objeto indireto.
(E) Objeto direto.$q$,'D',5,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Pronome oblíquo: função sintática$q$),
(9,$q$Língua Portuguesa$q$,$q$No trecho “Algumas pesquisas sugerem que pessoas que sofreram negligência emocional por parte dos pais ou que tiveram pais emocionalmente imaturos podem ser mais propensas ..... autossabotagem”, retirado do texto, caso a palavra “pessoas” fosse substituída por “um indivíduo”, quantas outras alterações seriam obrigatoriamente necessárias para manter a correção gramatical?
(A) Uma.
(B) Duas.
(C) Três.
(D) Quatro.
(E) Cinco.$q$,$q$No trecho “Algumas pesquisas sugerem que pessoas que sofreram negligência emocional por parte dos pais ou que tiveram pais emocionalmente imaturos podem ser mais propensas ..... autossabotagem”, retirado do texto, caso a palavra “pessoas” fosse substituída por “um indivíduo”, quantas outras alterações seriam obrigatoriamente necessárias para manter a correção gramatical?
(A) Uma.
(B) Duas.
(C) Três.
(D) Quatro.
(E) Cinco.$q$,'D',5,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Concordância: substituição de sujeito plural por singular$q$),
(10,$q$Língua Portuguesa$q$,$q$Conforme as normas gramaticais vigentes, assinale a alternativa que preenche, correta e respectivamente, as lacunas pontilhadas dos trechos a seguir, retirados do texto:
 “O prazo de entrega da tarefa está no seu calendário ..... semanas”.  “O que leva à autossabotagem? Provavelmente ..... uma profusão de causas”.
(A) há – a
(B) há – há
(C) a – a
(D) há – à
(E) a – há$q$,$q$Conforme as normas gramaticais vigentes, assinale a alternativa que preenche, correta e respectivamente, as lacunas pontilhadas dos trechos a seguir, retirados do texto:
 “O prazo de entrega da tarefa está no seu calendário ..... semanas”.  “O que leva à autossabotagem? Provavelmente ..... uma profusão de causas”.
(A) há – a
(B) há – há
(C) a – a
(D) há – à
(E) a – há$q$,'B',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Emprego de há e a (tempo)$q$),
(11,$q$Língua Portuguesa$q$,$q$Assinale a alternativa que apresenta uma proposta de alteração em um trecho do texto que NÃO acarretaria incorreção gramatical ou alteração de sentido no contexto de ocorrência.
(A) “De uma perspectiva evolutiva, a resposta foi projetada para proteger o indivíduo” – substituição de “para proteger” por “para dar proteção”.
(B) “Ameaças modernas, como prazos ou críticas, ainda podem ativar essa resposta, mesmo que não sejam fisicamente perigosas, acrescenta Pychyl” – substituição de “ainda podem ativar” por “certamente ativam”.
(C) “as pessoas podem recorrer a comportamentos que reduzem o desconforto ou proporcionam uma sensação de segurança momentânea, como ignorar prazos” – substituição de “reduzem o desconforto” por “subtrai o conforto”.
(D) “Além disso, sob estresse, a atividade no córtex pré-frontal do cérebro — responsável pelo planejamento e autocontrole — pode ser reduzida, dificultando a supressão dos impulsos de evitação gerados pela amígdala” – substituição de “dificultando a supressão” por “provocando a inserção”.
(E) “Ironicamente, o medo de fracassar me impede de fazer algo” – substituição de “Ironicamente” por “De modo irônico”.$q$,$q$Assinale a alternativa que apresenta uma proposta de alteração em um trecho do texto que NÃO acarretaria incorreção gramatical ou alteração de sentido no contexto de ocorrência.
(A) “De uma perspectiva evolutiva, a resposta foi projetada para proteger o indivíduo” – substituição de “para proteger” por “para dar proteção”.
(B) “Ameaças modernas, como prazos ou críticas, ainda podem ativar essa resposta, mesmo que não sejam fisicamente perigosas, acrescenta Pychyl” – substituição de “ainda podem ativar” por “certamente ativam”.
(C) “as pessoas podem recorrer a comportamentos que reduzem o desconforto ou proporcionam uma sensação de segurança momentânea, como ignorar prazos” – substituição de “reduzem o desconforto” por “subtrai o conforto”.
(D) “Além disso, sob estresse, a atividade no córtex pré-frontal do cérebro — responsável pelo planejamento e autocontrole — pode ser reduzida, dificultando a supressão dos impulsos de evitação gerados pela amígdala” – substituição de “dificultando a supressão” por “provocando a inserção”.
(E) “Ironicamente, o medo de fracassar me impede de fazer algo” – substituição de “Ironicamente” por “De modo irônico”.$q$,'E',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Reescrita sem alteração de sentido$q$),
(12,$q$Língua Portuguesa$q$,$q$Em relação ao fragmento “Quando isso acontece«,» as pessoas podem recorrer a comportamentos que reduzem o desconforto ou proporcionam uma sensação de segurança momentânea” (l. 34-35), analise as assertivas a seguir e assinale a alternativa correta.
I. A vírgula hachurada tem a função de isolar uma oração adverbial. II. O pronome demonstrativo “isso” remete a uma informação constante no parágrafo anterior. III. A forma verbal “podem” agrega ao período a ideia de possibilidade. IV. A palavra “momentânea” funciona como determinante do substantivo “segurança”.
(A) Todas as assertivas estão corretas.
(B) Todas as assertivas estão incorretas.
(C) Apenas as assertivas I e III estão corretas.
(D) Apenas as assertivas II e III estão corretas.
(E) Apenas as assertivas I, II e IV estão corretas.$q$,$q$Em relação ao fragmento “Quando isso acontece«,» as pessoas podem recorrer a comportamentos que reduzem o desconforto ou proporcionam uma sensação de segurança momentânea” (l. 34-35), analise as assertivas a seguir e assinale a alternativa correta.
I. A vírgula hachurada tem a função de isolar uma oração adverbial. II. O pronome demonstrativo “isso” remete a uma informação constante no parágrafo anterior. III. A forma verbal “podem” agrega ao período a ideia de possibilidade. IV. A palavra “momentânea” funciona como determinante do substantivo “segurança”.
(A) Todas as assertivas estão corretas.
(B) Todas as assertivas estão incorretas.
(C) Apenas as assertivas I e III estão corretas.
(D) Apenas as assertivas II e III estão corretas.
(E) Apenas as assertivas I, II e IV estão corretas.$q$,'A',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Pontuação e referenciação: oração adverbial e demonstrativo$q$),
(13,$q$Língua Portuguesa$q$,$q$Assinale a alternativa em que a transposição do fragmento “essas escolhas frequentemente geram consequências, afirma Heriot-Maitland” para a voz passiva analítica está correta e mantém a relação de sentido estabelecida na frase original.
(A) Heriot-Maitland afirma que consequências são frequentemente geradas por essas escolhas.
(B) Consequências geram-se por essas escolhas, afirma frequentemente Heriot-Maitland.
(C) Frequentemente gera-se consequências por essas escolhas, afirma Heriot-Maitland.
(D) Gera-se consequências por essas escolhas frequentemente, afirma Heriot-Maitland.
(E) Heriot-Maitland afirma que essas consequências são frequentes face às escolhas.$q$,$q$Assinale a alternativa em que a transposição do fragmento “essas escolhas frequentemente geram consequências, afirma Heriot-Maitland” para a voz passiva analítica está correta e mantém a relação de sentido estabelecida na frase original.
(A) Heriot-Maitland afirma que consequências são frequentemente geradas por essas escolhas.
(B) Consequências geram-se por essas escolhas, afirma frequentemente Heriot-Maitland.
(C) Frequentemente gera-se consequências por essas escolhas, afirma Heriot-Maitland.
(D) Gera-se consequências por essas escolhas frequentemente, afirma Heriot-Maitland.
(E) Heriot-Maitland afirma que essas consequências são frequentes face às escolhas.$q$,'A',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Voz passiva analítica$q$),
(14,$q$Língua Portuguesa$q$,$q$Sobre alguns sinais de pontuação empregados no texto, assinale a alternativa correta.
(A) As aspas empregadas no primeiro e no segundo parágrafos marcam a voz da autora do texto.
(B) Os travessões das linhas 10 e 11 separam uma oração explicativa.
(C) As vírgulas da linha 14 são empregadas para separar uma oração intercalada.
(D) Todas as vírgulas das linhas 20 e 21 são empregadas em virtude da mesma regra.
(E) Na linha 26, o sinal que separa o verbo do pronome e os sobrenomes do professor citado é chamado de travessão.$q$,$q$Sobre alguns sinais de pontuação empregados no texto, assinale a alternativa correta.
(A) As aspas empregadas no primeiro e no segundo parágrafos marcam a voz da autora do texto.
(B) Os travessões das linhas 10 e 11 separam uma oração explicativa.
(C) As vírgulas da linha 14 são empregadas para separar uma oração intercalada.
(D) Todas as vírgulas das linhas 20 e 21 são empregadas em virtude da mesma regra.
(E) Na linha 26, o sinal que separa o verbo do pronome e os sobrenomes do professor citado é chamado de travessão.$q$,'C',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Pontuação: aspas, travessões e vírgulas$q$),
(15,$q$Língua Portuguesa$q$,$q$Sobre os vocábulos abaixo, presentes no texto, analise as seguintes assertivas:
I. “Procrastinação” possui um prefixo em sua estrutura. II. “Inconscientemente” é formado por prefixação e sufixação. III. “Silencioso” é formado por prefixação.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) Apenas II e III.$q$,$q$Sobre os vocábulos abaixo, presentes no texto, analise as seguintes assertivas:
I. “Procrastinação” possui um prefixo em sua estrutura. II. “Inconscientemente” é formado por prefixação e sufixação. III. “Silencioso” é formado por prefixação.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) Apenas II e III.$q$,'B',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Formação de palavras: prefixação e sufixação$q$),
(16,$q$Língua Portuguesa$q$,$q$Em “O que leva à autossabotagem? Provavelmente ..... uma profusão de causas, e mais pesquisas são necessárias para compreendê-la completamente”, sem prejuízo ao sentido do trecho original, o vocábulo “profusão” poderia ser substituído por qual dos vocábulos abaixo?
(A) Abundância.
(B) Proliferação.
(C) Perpetuação.
(D) Confusão.
(E) Prolixidade.$q$,$q$Em “O que leva à autossabotagem? Provavelmente ..... uma profusão de causas, e mais pesquisas são necessárias para compreendê-la completamente”, sem prejuízo ao sentido do trecho original, o vocábulo “profusão” poderia ser substituído por qual dos vocábulos abaixo?
(A) Abundância.
(B) Proliferação.
(C) Perpetuação.
(D) Confusão.
(E) Prolixidade.$q$,'A',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Sinonímia: profusão$q$),
(17,$q$Língua Portuguesa$q$,$q$Sobre a palavra “psicobiologia”, mencionada no texto, é correto afirmar que:
(A) Trata-se de uma palavra formada por derivação.
(B) É a contração de três palavras.
(C) É composta por um sufixo e um prefixo.
(D) Há, em sua construção, três radicais.
(E) Trata-se de uma redução.$q$,$q$Sobre a palavra “psicobiologia”, mencionada no texto, é correto afirmar que:
(A) Trata-se de uma palavra formada por derivação.
(B) É a contração de três palavras.
(C) É composta por um sufixo e um prefixo.
(D) Há, em sua construção, três radicais.
(E) Trata-se de uma redução.$q$,'X',7,'annulled',false,false,null,$q$Questão anulada pela banca (gabarito definitivo do Edital nº 24/2026 = *). Não deve ser usada em treino.$q$,$q$Formação de palavras: psicobiologia$q$),
(18,$q$Língua Portuguesa$q$,$q$Com base no texto, analise as seguintes asserções e a relação proposta entre elas:
I. A procrastinação está sempre presente no cotidiano de todas as pessoas.
II. Embora ocasionalmente, todos praticam a autossabotagem durante a vida.
A respeito dessas asserções, assinale a alternativa correta.
(A) As asserções I e II são proposições verdadeiras, e a II é uma justificativa da I.
(B) As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa da I.
(C) A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.
(D) A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.
(E) As asserções I e II são proposições falsas.$q$,$q$Com base no texto, analise as seguintes asserções e a relação proposta entre elas:
I. A procrastinação está sempre presente no cotidiano de todas as pessoas.
II. Embora ocasionalmente, todos praticam a autossabotagem durante a vida.
A respeito dessas asserções, assinale a alternativa correta.
(A) As asserções I e II são proposições verdadeiras, e a II é uma justificativa da I.
(B) As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa da I.
(C) A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.
(D) A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.
(E) As asserções I e II são proposições falsas.$q$,'E',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Asserções: relação entre proposições verdadeiras$q$),
(19,$q$Língua Portuguesa$q$,$q$Considere o seguinte fragmento do texto: “A autossabotagem também pode ser aprendida e se tornar um hábito”.
Mantendo a correção gramatical e o sentido original do trecho, qual das alterações a seguir seria obrigatoriamente necessária caso “tornar” fosse substituído por “transformar”?
(A) Nenhuma alteração obrigatória seria necessária.
(B) Supressão da partícula “se”.
(C) Inserção de preposição, considerando a regência do verbo.
(D) Supressão do artigo indefinido.
(E) Inserção de uma conjunção, considerando a relação de dependência entre os termos.$q$,$q$Considere o seguinte fragmento do texto: “A autossabotagem também pode ser aprendida e se tornar um hábito”.
Mantendo a correção gramatical e o sentido original do trecho, qual das alterações a seguir seria obrigatoriamente necessária caso “tornar” fosse substituído por “transformar”?
(A) Nenhuma alteração obrigatória seria necessária.
(B) Supressão da partícula “se”.
(C) Inserção de preposição, considerando a regência do verbo.
(D) Supressão do artigo indefinido.
(E) Inserção de uma conjunção, considerando a relação de dependência entre os termos.$q$,'C',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Regência do verbo transformar$q$),
(20,$q$Língua Portuguesa$q$,$q$Considere o seguinte fragmento do texto: “A autossabotagem também pode ser aprendida e se tornar um hábito”.
É correto afirmar que o emprego da expressão “se tornar” indica:
(A) Mudança de estado.
(B) Permanência de estado.
(C) Um ponto de vista diferente.
(D) Reforço da condição existente.
(E) Manutenção de modo.$q$,$q$Considere o seguinte fragmento do texto: “A autossabotagem também pode ser aprendida e se tornar um hábito”.
É correto afirmar que o emprego da expressão “se tornar” indica:
(A) Mudança de estado.
(B) Permanência de estado.
(C) Um ponto de vista diferente.
(D) Reforço da condição existente.
(E) Manutenção de modo.$q$,'A',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Valor semântico de "se tornar"$q$),
(21,$q$Informática$q$,$q$Considere que o arquivo concurso.docx, criado no Microsoft Word 2019, está armazenado na unidade local C: de um computador executando o Microsoft Windows 10, em sua configuração padrão e versão em português. O que acontecerá se, no Explorador de Arquivos, um usuário, após selecionar o arquivo, pressionar o atalho de teclado Shift + Delete?
(A) O arquivo será movido imediatamente para a Lixeira.
(B) Será apresentada uma caixa de diálogo perguntando se o usuário deseja excluir permanentemente o arquivo, sem enviá-lo para a Lixeira.
(C) O arquivo será excluído permanentemente do local original e uma cópia dele será criada na pasta Documentos.
(D) O arquivo será marcado como oculto.
(E) Se o arquivo estiver aberto em algum programa, será fechado instantaneamente.$q$,$q$Considere que o arquivo concurso.docx, criado no Microsoft Word 2019, está armazenado na unidade local C: de um computador executando o Microsoft Windows 10, em sua configuração padrão e versão em português. O que acontecerá se, no Explorador de Arquivos, um usuário, após selecionar o arquivo, pressionar o atalho de teclado Shift + Delete?
(A) O arquivo será movido imediatamente para a Lixeira.
(B) Será apresentada uma caixa de diálogo perguntando se o usuário deseja excluir permanentemente o arquivo, sem enviá-lo para a Lixeira.
(C) O arquivo será excluído permanentemente do local original e uma cópia dele será criada na pasta Documentos.
(D) O arquivo será marcado como oculto.
(E) Se o arquivo estiver aberto em algum programa, será fechado instantaneamente.$q$,'B',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Windows 10: Shift + Delete$q$),
(22,$q$Informática$q$,$q$Assinale a alternativa que corresponde a um nome de arquivo permitido pelo sistema operacional Microsoft Windows 10, em sua configuração padrão.
(A) policia:penal.xlsx
(B) ?policia.txt
(C) policia<penal>.docx
(D) "policia".pdf
(E) policia!.txt$q$,$q$Assinale a alternativa que corresponde a um nome de arquivo permitido pelo sistema operacional Microsoft Windows 10, em sua configuração padrão.
(A) policia:penal.xlsx
(B) ?policia.txt
(C) policia<penal>.docx
(D) "policia".pdf
(E) policia!.txt$q$,'E',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Windows 10: caracteres permitidos em nomes de arquivo$q$),
(23,$q$Informática$q$,$q$No Word do Microsoft 365, em sua configuração padrão e versão em português, em qual guia da faixa de opções está disponível o botão Tabela, que permite a inclusão de uma tabela no documento?
(A) Inserir.
(B) Layout.
(C) Design.
(D) Exibir.
(E) Início.$q$,$q$No Word do Microsoft 365, em sua configuração padrão e versão em português, em qual guia da faixa de opções está disponível o botão Tabela, que permite a inclusão de uma tabela no documento?
(A) Inserir.
(B) Layout.
(C) Design.
(D) Exibir.
(E) Início.$q$,'A',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Word: guia Inserir e botão Tabela$q$),
(24,$q$Informática$q$,$q$No Word do Microsoft 365, em sua configuração padrão e versão em português, qual opção de configuração de parágrafo corresponde ao controle de linhas isoladas de um parágrafo, ou seja, quando uma linha de um parágrafo fica sozinha no início ou no fim de uma página do documento?
(A) Manter linhas juntas.
(B) Controle de linhas órfãs/viúvas.
(C) Manter com o próximo.
(D) Espaçamento entre linhas.
(E) Quebra de página antes/depois.$q$,$q$No Word do Microsoft 365, em sua configuração padrão e versão em português, qual opção de configuração de parágrafo corresponde ao controle de linhas isoladas de um parágrafo, ou seja, quando uma linha de um parágrafo fica sozinha no início ou no fim de uma página do documento?
(A) Manter linhas juntas.
(B) Controle de linhas órfãs/viúvas.
(C) Manter com o próximo.
(D) Espaçamento entre linhas.
(E) Quebra de página antes/depois.$q$,'B',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Word: controle de linhas órfãs e viúvas$q$),
(25,$q$Informática$q$,$q$São recursos de classificação e ordenação de dados no Excel do Microsoft 365, em sua configuração padrão e versão em português, EXCETO:
(A) Optar em diferenciar maiúsculas de minúsculas.
(B) Escolher múltiplos níveis de classificação.
(C) Classificar as células por sua cor de preenchimento.
(D) Definir qualquer linha do intervalo selecionado como a linha de cabeçalho.
(E) Ordenar datas da mais antiga para a mais nova ou vice-versa.$q$,$q$São recursos de classificação e ordenação de dados no Excel do Microsoft 365, em sua configuração padrão e versão em português, EXCETO:
(A) Optar em diferenciar maiúsculas de minúsculas.
(B) Escolher múltiplos níveis de classificação.
(C) Classificar as células por sua cor de preenchimento.
(D) Definir qualquer linha do intervalo selecionado como a linha de cabeçalho.
(E) Ordenar datas da mais antiga para a mais nova ou vice-versa.$q$,'D',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Excel: recursos de classificação e ordenação$q$),
(26,$q$Informática$q$,$q$Em relação à edição de dados em uma planilha do Excel do Microsoft 365, em sua configuração padrão e versão em português, para identificar a célula ativa, o Excel usa, por padrão, um(a):
(A) Borda dupla tracejada na cor azul com um pequeno triângulo no canto superior direito da célula.
(B) Preenchimento sombreado na cor amarelo claro com um pequeno quadrado no canto inferior direito da célula.
(C) Borda verde mais espessa com um pequeno quadrado no canto inferior direito da célula.
(D) Linha de grade pontilhada na cor vermelha com um pequeno triângulo no canto superior direito da célula.
(E) Seta indicativa apontando para o centro da célula com um pequeno retângulo em seu canto superior direito.$q$,$q$Em relação à edição de dados em uma planilha do Excel do Microsoft 365, em sua configuração padrão e versão em português, para identificar a célula ativa, o Excel usa, por padrão, um(a):
(A) Borda dupla tracejada na cor azul com um pequeno triângulo no canto superior direito da célula.
(B) Preenchimento sombreado na cor amarelo claro com um pequeno quadrado no canto inferior direito da célula.
(C) Borda verde mais espessa com um pequeno quadrado no canto inferior direito da célula.
(D) Linha de grade pontilhada na cor vermelha com um pequeno triângulo no canto superior direito da célula.
(E) Seta indicativa apontando para o centro da célula com um pequeno retângulo em seu canto superior direito.$q$,'C',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Excel: identificação da célula ativa$q$),
(27,$q$Informática$q$,$q$Assinale a alternativa que apresenta uma fórmula sintaticamente INCORRETA para o Excel do Microsoft 365, em sua configuração padrão e versão em português.
(A) =SE(A1>B2;"Sim")
(B) =SES(C1>=90;"Excelente";C1>=70;"Bom";C1>=50;"Regular";C1>=30;"Ruim")
(C) =CONT.SE(E5:E20;">0";"<9")
(D) =SOMASE(F12:F18;">=2";E12:E18)
(E) =SOMA(A5:E5;G1:G5)$q$,$q$Assinale a alternativa que apresenta uma fórmula sintaticamente INCORRETA para o Excel do Microsoft 365, em sua configuração padrão e versão em português.
(A) =SE(A1>B2;"Sim")
(B) =SES(C1>=90;"Excelente";C1>=70;"Bom";C1>=50;"Regular";C1>=30;"Ruim")
(C) =CONT.SE(E5:E20;">0";"<9")
(D) =SOMASE(F12:F18;">=2";E12:E18)
(E) =SOMA(A5:E5;G1:G5)$q$,'C',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Excel: sintaxe de fórmulas$q$),
(28,$q$Informática$q$,$q$No navegador Google Chrome, em sua configuração padrão e versão atualizada para computador, os botões de navegação, a barra de endereços e o botão/ícone de extensões localizam-se na barra de:
(A) Guias.
(B) Status.
(C) Acesso rápido.
(D) Ferramentas.
(E) Favoritos.$q$,$q$No navegador Google Chrome, em sua configuração padrão e versão atualizada para computador, os botões de navegação, a barra de endereços e o botão/ícone de extensões localizam-se na barra de:
(A) Guias.
(B) Status.
(C) Acesso rápido.
(D) Ferramentas.
(E) Favoritos.$q$,'D',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Google Chrome: barra de ferramentas$q$),
(29,$q$Informática$q$,$q$Em relação ao navegador Mozilla Firefox, em sua configuração padrão e versão atualizada para computador, o recurso de proteção aprimorada contra rastreamento protege automaticamente a privacidade do usuário enquanto ele navega. No modo Normal, a proteção aprimorada contra rastreamento bloqueia, por padrão:
(A) O download de arquivos executáveis.
(B) A execução de qualquer código javascript das páginas visitadas.
(C) Todos os cookies primários de qualquer site visitado.
(D) O acesso ao histórico de downloads local do usuário.
(E) Conteúdos com rastreamento em janelas privativas.$q$,$q$Em relação ao navegador Mozilla Firefox, em sua configuração padrão e versão atualizada para computador, o recurso de proteção aprimorada contra rastreamento protege automaticamente a privacidade do usuário enquanto ele navega. No modo Normal, a proteção aprimorada contra rastreamento bloqueia, por padrão:
(A) O download de arquivos executáveis.
(B) A execução de qualquer código javascript das páginas visitadas.
(C) Todos os cookies primários de qualquer site visitado.
(D) O acesso ao histórico de downloads local do usuário.
(E) Conteúdos com rastreamento em janelas privativas.$q$,'E',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Firefox: proteção aprimorada contra rastreamento$q$),
(30,$q$Informática$q$,$q$Segundo o Guia de Inteligência Artificial Generativa do Governo Federal (2026), elaborado como parte das ações do Núcleo de Inteligência Artificial (NIA) do Ministério da Gestão e da Inovação de Serviços Públicos (MGI), são características fundamentais de ferramentas de inteligência artificial generativas como o ChatGPT, o Gemini e o Copilot, EXCETO:
(A) Capacidade de fazer inferências e prever um estado futuro para fornecer suporte à decisão humana.
(B) Interação direta, chamada prompt, baseada em linguagem natural humana, em que o usuário escreve um comando, e a ferramenta interpreta a solicitação para gerar a resposta.
(C) Capacidade de criar conteúdos originais, como textos, áudios, imagens, vídeos e códigos de software.
(D) Utilização de modelos computacionais avançados, que aprendem padrões a partir de grandes volumes de dados.
(E) Funcionamento por meio de uma estrutura de probabilidades, construindo respostas de forma incremental.$q$,$q$Segundo o Guia de Inteligência Artificial Generativa do Governo Federal (2026), elaborado como parte das ações do Núcleo de Inteligência Artificial (NIA) do Ministério da Gestão e da Inovação de Serviços Públicos (MGI), são características fundamentais de ferramentas de inteligência artificial generativas como o ChatGPT, o Gemini e o Copilot, EXCETO:
(A) Capacidade de fazer inferências e prever um estado futuro para fornecer suporte à decisão humana.
(B) Interação direta, chamada prompt, baseada em linguagem natural humana, em que o usuário escreve um comando, e a ferramenta interpreta a solicitação para gerar a resposta.
(C) Capacidade de criar conteúdos originais, como textos, áudios, imagens, vídeos e códigos de software.
(D) Utilização de modelos computacionais avançados, que aprendem padrões a partir de grandes volumes de dados.
(E) Funcionamento por meio de uma estrutura de probabilidades, construindo respostas de forma incremental.$q$,'A',10,'under_review',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A). Mantida em revisão: Depende do Guia de Inteligência Artificial Generativa do Governo Federal (2026), documento cuja versão oficial não foi conferida.$q$,$q$Inteligência artificial generativa: características (guia do Governo Federal)$q$),
(31,$q$Raciocínio Lógico$q$,$q$Segundo as Leis de Morgan, a negação lógica da proposição “Ana é pedagoga e Antônio não é dentista” é:
(A) Ana não é pedagoga e Antônio não é dentista.
(B) Ana não é pedagoga e Antônio é dentista.
(C) Ana é pedagoga ou Antônio é dentista.
(D) Ana não é pedagoga ou Antônio não é dentista.
(E) Ana não é pedagoga ou Antônio é dentista.$q$,$q$Segundo as Leis de Morgan, a negação lógica da proposição “Ana é pedagoga e Antônio não é dentista” é:
(A) Ana não é pedagoga e Antônio não é dentista.
(B) Ana não é pedagoga e Antônio é dentista.
(C) Ana é pedagoga ou Antônio é dentista.
(D) Ana não é pedagoga ou Antônio não é dentista.
(E) Ana não é pedagoga ou Antônio é dentista.$q$,'E',10,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Negação lógica: Leis de Morgan$q$),
(32,$q$Raciocínio Lógico$q$,$q$Se Maria é arquiteta, então Lucas é enfermeiro. Se Lucas é enfermeiro, então Júlia não é fisioterapeuta. Se Júlia não é fisioterapeuta, então Ana é professora. Se Ana é professora, então Liz é psicóloga. Se Liz é psicóloga, então Pedro é engenheiro. Considerando que Pedro não seja engenheiro, é correto afirmar que:
(A) Liz não é psicóloga.
(B) Pedro é enfermeiro.
(C) Lucas é enfermeiro e Júlia é fisioterapeuta.
(D) Ana é professora.
(E) Maria é arquiteta e Liz é psicóloga.$q$,$q$Se Maria é arquiteta, então Lucas é enfermeiro. Se Lucas é enfermeiro, então Júlia não é fisioterapeuta. Se Júlia não é fisioterapeuta, então Ana é professora. Se Ana é professora, então Liz é psicóloga. Se Liz é psicóloga, então Pedro é engenheiro. Considerando que Pedro não seja engenheiro, é correto afirmar que:
(A) Liz não é psicóloga.
(B) Pedro é enfermeiro.
(C) Lucas é enfermeiro e Júlia é fisioterapeuta.
(D) Ana é professora.
(E) Maria é arquiteta e Liz é psicóloga.$q$,'A',10,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Condicionais encadeadas: contrapositiva$q$),
(33,$q$Raciocínio Lógico$q$,$q$É correto afirmar que a frase “Você comeu hoje?” é uma
(A) proposição simples.
(B) proposição composta.
(C) frase sem verbo, logo, não é uma proposição.
(D) frase interrogativa, logo, não é uma proposição.
(E) frase imperativa, logo, é uma proposição.$q$,$q$É correto afirmar que a frase “Você comeu hoje?” é uma
(A) proposição simples.
(B) proposição composta.
(C) frase sem verbo, logo, não é uma proposição.
(D) frase interrogativa, logo, não é uma proposição.
(E) frase imperativa, logo, é uma proposição.$q$,'D',10,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Proposições: frase interrogativa$q$),
(34,$q$Raciocínio Lógico$q$,$q$Analise as assertivas abaixo:
I. Ela foi a melhor jogadora de vôlei do torneio nacional. II. x + y = 10 é um número inteiro. III. O Brasil conquistou o pentacampeonato mundial de futebol na Copa de 2002.
Quais são sentenças abertas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) Apenas I e III.$q$,$q$Analise as assertivas abaixo:
I. Ela foi a melhor jogadora de vôlei do torneio nacional. II. x + y = 10 é um número inteiro. III. O Brasil conquistou o pentacampeonato mundial de futebol na Copa de 2002.
Quais são sentenças abertas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) Apenas I e III.$q$,'D',10,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Sentenças abertas$q$),
(35,$q$Raciocínio Lógico$q$,$q$Assinale a alternativa que apresenta uma afirmação que corresponde à negação lógica da afirmação “todas as pessoas foram salvas e nenhuma ficou ferida”.
(A) Existe pelo menos uma pessoa que não foi salva ou pelo menos uma pessoa ficou ferida.
(B) Se pelo menos uma pessoa não foi salva, então nenhuma pessoa ficou ferida.
(C) Nenhuma pessoa foi salva e todas as pessoas ficaram feridas.
(D) Algumas pessoas foram salvas ou alguma pessoa ficou ferida.
(E) Se alguma pessoa foi salva, então todas as pessoas ficaram feridas.$q$,$q$Assinale a alternativa que apresenta uma afirmação que corresponde à negação lógica da afirmação “todas as pessoas foram salvas e nenhuma ficou ferida”.
(A) Existe pelo menos uma pessoa que não foi salva ou pelo menos uma pessoa ficou ferida.
(B) Se pelo menos uma pessoa não foi salva, então nenhuma pessoa ficou ferida.
(C) Nenhuma pessoa foi salva e todas as pessoas ficaram feridas.
(D) Algumas pessoas foram salvas ou alguma pessoa ficou ferida.
(E) Se alguma pessoa foi salva, então todas as pessoas ficaram feridas.$q$,'A',11,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Negação de proposição com quantificador$q$),
(36,$q$Raciocínio Lógico$q$,$q$Considere a seguinte operação lógica: (r ∧s) → (p ∨q). Para que o resultado final seja falso, os valores de r, s, p e q devem ser, respectivamente:
(A) Verdadeiro – falso – falso – falso.
(B) Verdadeiro – verdadeiro – falso – falso.
(C) Falso – falso – verdadeiro – verdadeiro.
(D) Falso – verdadeiro – falso – verdadeiro.
(E) Verdadeiro – falso – verdadeiro – falso.$q$,$q$Considere a seguinte operação lógica: (r ∧s) → (p ∨q). Para que o resultado final seja falso, os valores de r, s, p e q devem ser, respectivamente:
(A) Verdadeiro – falso – falso – falso.
(B) Verdadeiro – verdadeiro – falso – falso.
(C) Falso – falso – verdadeiro – verdadeiro.
(D) Falso – verdadeiro – falso – verdadeiro.
(E) Verdadeiro – falso – verdadeiro – falso.$q$,'B',11,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Condicional falsa: valores lógicos$q$),
(37,$q$Raciocínio Lógico$q$,$q$Pedro, Tiago e João estavam conversando sobre suas profissões e seus filhos. Sabe-se que cada um dos homens tem apenas um(a) filho(a), que os nomes das crianças são Ana, Carol e Luiz, e que eles exercem profissões distintas: um é policial, outro é advogado, e o outro, juiz. Além disso, sabe-se que:
I. O pai de Ana não é advogado e não se chama João. II. O pai de Carol não é juiz. III. Pedro é policial e não é pai de Carol. IV. Tiago tem uma filha que não se chama Ana. V. O pai de Luiz não é advogado.
Sendo assim, é correto afirmar que:
(A) Carol é filha de João.
(B) Pedro é policial e pai de Luiz.
(C) João é juiz e pai de Luiz.
(D) Tiago é advogado e pai de Ana.
(E) O pai de Ana é juiz.$q$,$q$Pedro, Tiago e João estavam conversando sobre suas profissões e seus filhos. Sabe-se que cada um dos homens tem apenas um(a) filho(a), que os nomes das crianças são Ana, Carol e Luiz, e que eles exercem profissões distintas: um é policial, outro é advogado, e o outro, juiz. Além disso, sabe-se que:
I. O pai de Ana não é advogado e não se chama João. II. O pai de Carol não é juiz. III. Pedro é policial e não é pai de Carol. IV. Tiago tem uma filha que não se chama Ana. V. O pai de Luiz não é advogado.
Sendo assim, é correto afirmar que:
(A) Carol é filha de João.
(B) Pedro é policial e pai de Luiz.
(C) João é juiz e pai de Luiz.
(D) Tiago é advogado e pai de Ana.
(E) O pai de Ana é juiz.$q$,'C',11,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Lógica de argumentação: associação de pessoas, profissões e filhos$q$),
(38,$q$Raciocínio Lógico$q$,$q$Considere que todo pedagogo gosta de ler e que alguns pedagogos são professores e outros não. A partir dessas informações, é correto concluir que:
(A) Os pedagogos que são professores não gostam de ler.
(B) Os pedagogos que não são professores gostam de ler.
(C) Não há professores que gostam de ler.
(D) Os pedagogos que não são professores não gostam de ler.
(E) Os pedagogos que gostam de ler não são professores.$q$,$q$Considere que todo pedagogo gosta de ler e que alguns pedagogos são professores e outros não. A partir dessas informações, é correto concluir que:
(A) Os pedagogos que são professores não gostam de ler.
(B) Os pedagogos que não são professores gostam de ler.
(C) Não há professores que gostam de ler.
(D) Os pedagogos que não são professores não gostam de ler.
(E) Os pedagogos que gostam de ler não são professores.$q$,'B',11,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Silogismo categórico$q$),
(39,$q$Raciocínio Lógico$q$,$q$Se Maria é tia de Augusto, então Ana é dentista. Se Enzo não é sobrinho de Maria, então Lucas não é professor. Sabendo que Ana é engenheira e tem apenas essa profissão e que Lucas é professor, é correto concluir que:
(A) Maria é mãe de Augusto.
(B) Augusto e Enzo são irmãos.
(C) Maria não é tia de Augusto.
(D) Enzo não é sobrinho de Maria.
(E) Ana é sobrinha de Maria, e Augusto não é.$q$,$q$Se Maria é tia de Augusto, então Ana é dentista. Se Enzo não é sobrinho de Maria, então Lucas não é professor. Sabendo que Ana é engenheira e tem apenas essa profissão e que Lucas é professor, é correto concluir que:
(A) Maria é mãe de Augusto.
(B) Augusto e Enzo são irmãos.
(C) Maria não é tia de Augusto.
(D) Enzo não é sobrinho de Maria.
(E) Ana é sobrinha de Maria, e Augusto não é.$q$,'C',11,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Condicionais e contrapositiva$q$),
(40,$q$Raciocínio Lógico$q$,$q$Analise a sequência lógica a seguir:
–7, 7/2, –14, 7, –28, X
O número que substitui corretamente o X como próximo termo da sequência é:
(A) –14.
(B) –7.
(C) –3,5.
(D) 14.
(E) 28.$q$,$q$Analise a sequência lógica a seguir:
–7, 7/2, –14, 7, –28, X
O número que substitui corretamente o X como próximo termo da sequência é:
(A) –14.
(B) –7.
(C) –3,5.
(D) 14.
(E) 28.$q$,'D',12,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 2026-10-18 (disciplina não jurídica).$q$,$q$Sequência numérica alternada$q$),
(41,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Com base no disposto na Lei nº 7.210/1984, Lei de Execução Penal, no que diz respeito ao trabalho do condenado, analise as assertivas a seguir:
I. O trabalho do condenado, como dever social e condição de dignidade humana, terá finalidade educativa e produtiva. II. O trabalho do preso no interior do cárcere está sujeito ao regime da Consolidação das Leis do Trabalho. III. As tarefas executadas como prestação de serviço à comunidade poderão ser remuneradas, nos termos da Lei.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) I, II e III.$q$,$q$Com base no disposto na Lei nº 7.210/1984, Lei de Execução Penal, no que diz respeito ao trabalho do condenado, analise as assertivas a seguir:
I. O trabalho do condenado, como dever social e condição de dignidade humana, terá finalidade educativa e produtiva. II. O trabalho do preso no interior do cárcere está sujeito ao regime da Consolidação das Leis do Trabalho. III. As tarefas executadas como prestação de serviço à comunidade poderão ser remuneradas, nos termos da Lei.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) I, II e III.$q$,'A',12,'active',true,false,'[{"title": "LEP, arts. 28 e 30", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, arts. 28 e 30; chave A confere com o gabarito definitivo. O trabalho do condenado tem finalidade educativa e produtiva (art. 28), não se sujeita à CLT (art. 28, § 2º) e a prestação de serviço à comunidade não é remunerada (art. 30): só a assertiva I está correta.$q$,$q$LEP: trabalho do condenado$q$),
(42,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Conforme dispõe a Lei de Execução Penal, o trabalho interno ao condenado à pena privativa de liberdade é ___________ na medida de suas aptidões e capacidades. Nesse caso, a jornada normal de trabalho não será inferior a _____ nem superior a _____ horas, com descanso nos domingos e feriados.
Assinale a alternativa que preenche, correta e respectivamente, as lacunas do trecho acima.
(A) facultativo – 4 – 8
(B) facultativo – 4 – 10
(C) facultativo – 6 – 8
(D) obrigatório – 6 – 8
(E) obrigatório – 4 – 10$q$,$q$Conforme dispõe a Lei de Execução Penal, o trabalho interno ao condenado à pena privativa de liberdade é ___________ na medida de suas aptidões e capacidades. Nesse caso, a jornada normal de trabalho não será inferior a _____ nem superior a _____ horas, com descanso nos domingos e feriados.
Assinale a alternativa que preenche, correta e respectivamente, as lacunas do trecho acima.
(A) facultativo – 4 – 8
(B) facultativo – 4 – 10
(C) facultativo – 6 – 8
(D) obrigatório – 6 – 8
(E) obrigatório – 4 – 10$q$,'D',12,'active',true,false,'[{"title": "LEP, arts. 31 e 33", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, arts. 31 e 33; chave D confere com o gabarito definitivo. O condenado à pena privativa de liberdade está obrigado ao trabalho (art. 31); a jornada não será inferior a seis nem superior a oito horas (art. 33).$q$,$q$LEP: trabalho interno e jornada$q$),
(43,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Nos termos da Lei de Execução Penal, constituem deveres do condenado os apresentados a seguir, EXCETO:
(A) Constituição de pecúlio.
(B) Conduta oposta aos movimentos individuais ou coletivos de fuga ou de subversão à ordem ou à disciplina.
(C) Execução das tarefas e das ordens recebidas.
(D) Submissão à sanção disciplinar imposta.
(E) Urbanidade e respeito no trato com os demais condenados.$q$,$q$Nos termos da Lei de Execução Penal, constituem deveres do condenado os apresentados a seguir, EXCETO:
(A) Constituição de pecúlio.
(B) Conduta oposta aos movimentos individuais ou coletivos de fuga ou de subversão à ordem ou à disciplina.
(C) Execução das tarefas e das ordens recebidas.
(D) Submissão à sanção disciplinar imposta.
(E) Urbanidade e respeito no trato com os demais condenados.$q$,'A',12,'active',true,false,'[{"title": "LEP, art. 39", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, art. 39; chave A confere com o gabarito definitivo. A constituição de pecúlio não consta do rol de deveres do condenado do art. 39.$q$,$q$LEP: deveres do condenado$q$),
(44,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Considerando as disposições da Lei Complementar nº 16.449/2025, que dispõe sobre o Estatuto da Polícia Penal do Estado do Rio Grande do Sul, analise a sentença abaixo:
Compete à Corregedoria-Geral da Polícia Penal, dentre outras atribuições, expedir sugestões e orientações (1ª parte). A Corregedoria-Geral da Polícia Penal não poderá agir de ofício (2ª parte). É necessário, dentre outros requisitos, diploma de graduação em Direito para o cargo de corregedor-geral (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 3ª partes.
(E) Todas as partes.$q$,$q$Considerando as disposições da Lei Complementar nº 16.449/2025, que dispõe sobre o Estatuto da Polícia Penal do Estado do Rio Grande do Sul, analise a sentença abaixo:
Compete à Corregedoria-Geral da Polícia Penal, dentre outras atribuições, expedir sugestões e orientações (1ª parte). A Corregedoria-Geral da Polícia Penal não poderá agir de ofício (2ª parte). É necessário, dentre outros requisitos, diploma de graduação em Direito para o cargo de corregedor-geral (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 3ª partes.
(E) Todas as partes.$q$,'D',13,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D). Mantida em revisão: Lei Complementar estadual (RS) 16.449/2025: fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Estatuto da Polícia Penal do RS: Corregedoria-Geral$q$),
(45,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Conforme previsto no Estatuto da Polícia Penal do Estado do Rio Grande do Sul, os servidores nomeados na classe inicial das carreiras que compõem o Quadro de Cargos de Provimento Efetivo da Polícia Penal serão lotados na Academia da Polícia Penal para frequência no curso de formação profissional, processo que é parte integrante do estágio probatório, de caráter obrigatório. Sobre essa etapa, analise as assertivas abaixo:
I. O curso de formação profissional será organizado e ministrado exclusivamente pela Academia da Polícia Penal. II. Será aprovado no curso de formação profissional o servidor que obtiver aproveitamento mínimo de 70% em cada disciplina. III. A reprovação no curso de formação será admitida uma única vez, sendo obrigatória a aprovação em segunda oportunidade.
Quais estão corretas?
(A) Apenas I.
(B) Apenas III.
(C) Apenas I e II.
(D) Apenas II e III.
(E) I, II e III.$q$,$q$Conforme previsto no Estatuto da Polícia Penal do Estado do Rio Grande do Sul, os servidores nomeados na classe inicial das carreiras que compõem o Quadro de Cargos de Provimento Efetivo da Polícia Penal serão lotados na Academia da Polícia Penal para frequência no curso de formação profissional, processo que é parte integrante do estágio probatório, de caráter obrigatório. Sobre essa etapa, analise as assertivas abaixo:
I. O curso de formação profissional será organizado e ministrado exclusivamente pela Academia da Polícia Penal. II. Será aprovado no curso de formação profissional o servidor que obtiver aproveitamento mínimo de 70% em cada disciplina. III. A reprovação no curso de formação será admitida uma única vez, sendo obrigatória a aprovação em segunda oportunidade.
Quais estão corretas?
(A) Apenas I.
(B) Apenas III.
(C) Apenas I e II.
(D) Apenas II e III.
(E) I, II e III.$q$,'C',13,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C). Mantida em revisão: Lei Complementar estadual (RS) 16.449/2025: fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Estatuto da Polícia Penal do RS: curso de formação$q$),
(46,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Considerando as disposições do Estatuto da Polícia Penal do Estado do Rio Grande do Sul no que diz respeito às carreiras da Polícia Penal, analise as assertivas abaixo:
I. São compostas por cargos de provimento efetivo, estruturados em cinco classes. II. As promoções ordinárias dos servidores das carreiras da Polícia Penal consistem na passagem de uma classe para a imediatamente superior àquela a que pertence nas respectivas categorias funcionais e realizadas nas modalidades merecimento e antiguidade, alternadamente. III. Não poderá ser promovido o servidor que houver sofrido qualquer tipo de punição disciplinar nos últimos 12 meses.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e III.
(E) I, II e III.$q$,$q$Considerando as disposições do Estatuto da Polícia Penal do Estado do Rio Grande do Sul no que diz respeito às carreiras da Polícia Penal, analise as assertivas abaixo:
I. São compostas por cargos de provimento efetivo, estruturados em cinco classes. II. As promoções ordinárias dos servidores das carreiras da Polícia Penal consistem na passagem de uma classe para a imediatamente superior àquela a que pertence nas respectivas categorias funcionais e realizadas nas modalidades merecimento e antiguidade, alternadamente. III. Não poderá ser promovido o servidor que houver sofrido qualquer tipo de punição disciplinar nos últimos 12 meses.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e III.
(E) I, II e III.$q$,'E',13,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E). Mantida em revisão: Lei Complementar estadual (RS) 16.449/2025: fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Estatuto da Polícia Penal do RS: carreiras e promoções$q$),
(47,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Com base no disposto na Instrução Normativa nº 014/2023 GAB/SUP, que regulamenta o ingresso de visitas e materiais em estabelecimentos prisionais do Estado do Rio Grande do Sul, analise a sentença abaixo:
Compete à Delegacia Penitenciária Regional apreciar o pedido de credenciamento e cadastro formulado por organização religiosa/espiritual (1ª parte). Compete ao supervisor da sala de revista proibir o ingresso ou a permanência do visitante que descumprir os protocolos de segurança (2ª parte). Compete à direção do estabelecimento prisional designar o supervisor da sala de revista (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 2ª partes.
(E) Todas as partes.$q$,$q$Com base no disposto na Instrução Normativa nº 014/2023 GAB/SUP, que regulamenta o ingresso de visitas e materiais em estabelecimentos prisionais do Estado do Rio Grande do Sul, analise a sentença abaixo:
Compete à Delegacia Penitenciária Regional apreciar o pedido de credenciamento e cadastro formulado por organização religiosa/espiritual (1ª parte). Compete ao supervisor da sala de revista proibir o ingresso ou a permanência do visitante que descumprir os protocolos de segurança (2ª parte). Compete à direção do estabelecimento prisional designar o supervisor da sala de revista (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 2ª partes.
(E) Todas as partes.$q$,'E',14,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E). Mantida em revisão: Norma infralegal da Polícia Penal do RS (IN 014/2023 GAB/SUP): fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$IN 014/2023 GAB/SUP: ingresso de visitas e materiais$q$),
(48,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Com base nas disposições da Instrução Normativa nº 014/2023 GAB/SUP, analise as assertivas a seguir a respeito dos procedimentos relacionados à realização de visitas:
I. É vedada a realização de revista íntima para ingresso de visitantes nos estabelecimentos penais. II. É vedada a visita conjugal com visitante menor de 18 anos. Tal vedação somente poderá ser afastada nos casos de casamento ou união estável devidamente formalizada em registro público para pessoas entre 16 e 18 anos de idade. III. A visita inicial à pessoa que (re)ingressa no sistema prisional exige a apresentação da Carteira de Visitante.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas I e II.
(D) Apenas II e III.
(E) I, II e III.$q$,$q$Com base nas disposições da Instrução Normativa nº 014/2023 GAB/SUP, analise as assertivas a seguir a respeito dos procedimentos relacionados à realização de visitas:
I. É vedada a realização de revista íntima para ingresso de visitantes nos estabelecimentos penais. II. É vedada a visita conjugal com visitante menor de 18 anos. Tal vedação somente poderá ser afastada nos casos de casamento ou união estável devidamente formalizada em registro público para pessoas entre 16 e 18 anos de idade. III. A visita inicial à pessoa que (re)ingressa no sistema prisional exige a apresentação da Carteira de Visitante.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas I e II.
(D) Apenas II e III.
(E) I, II e III.$q$,'C',14,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C). Mantida em revisão: Norma infralegal da Polícia Penal do RS (IN 014/2023 GAB/SUP): fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$IN 014/2023 GAB/SUP: procedimentos de visita$q$),
(49,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Pedro cumpre pena em regime fechado e não recebe visitas presenciais. A irmã de Pedro, Joana, recentemente deu à luz um bebê, chamado Benício. Em função do nascimento de Benício, Joana solicita a realização de televisitas ao seu irmão Pedro. Considerando o caso apresentado e as disposições da Instrução Normativa nº 001/2025 GAB/SUP, a televisita, se autorizada, poderá ser realizada até que Benício complete quantos meses de idade?
(A) 04.
(B) 06.
(C) 12.
(D) 18.
(E) 24.$q$,$q$Pedro cumpre pena em regime fechado e não recebe visitas presenciais. A irmã de Pedro, Joana, recentemente deu à luz um bebê, chamado Benício. Em função do nascimento de Benício, Joana solicita a realização de televisitas ao seu irmão Pedro. Considerando o caso apresentado e as disposições da Instrução Normativa nº 001/2025 GAB/SUP, a televisita, se autorizada, poderá ser realizada até que Benício complete quantos meses de idade?
(A) 04.
(B) 06.
(C) 12.
(D) 18.
(E) 24.$q$,'B',14,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B). Mantida em revisão: Norma infralegal da Polícia Penal do RS (IN 001/2025 GAB/SUP): fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$IN 001/2025 GAB/SUP: televisita$q$),
(50,$q$Conhecimentos Gerais Relativos ao Sistema Prisional$q$,$q$Nos termos da Instrução Normativa nº 001/2025 GAB/SUP, no que diz respeito à realização de televisitas no âmbito da Polícia Penal, analise a sentença abaixo:
A realização da televisita ocorrerá sempre na presença de um servidor penitenciário(1ª parte). A televisita poderá ocorrer em sala de videoconferência ou, ainda, por telefone fixo ou celular funcional, exclusivamente no viva-voz na sala de atendimento(2ª parte). A televisita poderá ser realizada semanalmente, com duração máxima de 20 minutos(3ª parte).
Quais partes estão corretas?
(A) Apenas a 2ª parte.
(B) Apenas a 1ª e a 2ª partes.
(C) Apenas a 1ª e a 3ª partes.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,$q$Nos termos da Instrução Normativa nº 001/2025 GAB/SUP, no que diz respeito à realização de televisitas no âmbito da Polícia Penal, analise a sentença abaixo:
A realização da televisita ocorrerá sempre na presença de um servidor penitenciário(1ª parte). A televisita poderá ocorrer em sala de videoconferência ou, ainda, por telefone fixo ou celular funcional, exclusivamente no viva-voz na sala de atendimento(2ª parte). A televisita poderá ser realizada semanalmente, com duração máxima de 20 minutos(3ª parte).
Quais partes estão corretas?
(A) Apenas a 2ª parte.
(B) Apenas a 1ª e a 2ª partes.
(C) Apenas a 1ª e a 3ª partes.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,'B',14,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B). Mantida em revisão: Norma infralegal da Polícia Penal do RS (IN 001/2025 GAB/SUP): fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$IN 001/2025 GAB/SUP: regras da televisita$q$),
(51,$q$Legislação Aplicada/Direito$q$,$q$Com base no disposto na Constituição do Estado do Rio Grande do Sul sobre a política penitenciária, analise a sentença abaixo:
A política penitenciária do Estado do Rio Grande do Sul tem como objetivo a reintegração social das pessoas presas (1ª parte). A regionalização dos estabelecimentos penais é uma das prioridades da política penitenciária do Estado do Rio Grande do Sul (2ª parte). Todo estabelecimento prisional destinado a mulheres terá, em local anexo e independente, creche atendida por pessoal especializado, para menores de até 6 anos de idade (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,$q$Com base no disposto na Constituição do Estado do Rio Grande do Sul sobre a política penitenciária, analise a sentença abaixo:
A política penitenciária do Estado do Rio Grande do Sul tem como objetivo a reintegração social das pessoas presas (1ª parte). A regionalização dos estabelecimentos penais é uma das prioridades da política penitenciária do Estado do Rio Grande do Sul (2ª parte). Todo estabelecimento prisional destinado a mulheres terá, em local anexo e independente, creche atendida por pessoal especializado, para menores de até 6 anos de idade (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,'E',15,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E). Mantida em revisão: Constituição do Estado do Rio Grande do Sul: fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Constituição do RS: política penitenciária$q$),
(52,$q$Legislação Aplicada/Direito$q$,$q$Considerando as disposições gerais sobre segurança pública presentes na Constituição do Estado do Rio Grande do Sul, analise as assertivas abaixo:
I. Os Conselhos de Defesa e Segurança da Comunidade são o meio pelo qual a sociedade participa no encaminhamento e na solução dos problemas atinentes à segurança pública. II. Os Municípios têm o dever constitucional e a obrigatoriedade de constituir guardas municipais. III. O Estado possui ampla liberdade para operar serviços de informações, podendo monitorar quaisquer atividades sociais, independentemente de a lei defini-las ou não como delinquência. IV. A segurança pública no Rio Grande do Sul é exercida exclusivamente através da Brigada Militar, da Polícia Civil, da Polícia Rodoviária Estadual e da Polícia Penal.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas II e III.
(D) Apenas III e IV.
(E) I, II, III e IV.$q$,$q$Considerando as disposições gerais sobre segurança pública presentes na Constituição do Estado do Rio Grande do Sul, analise as assertivas abaixo:
I. Os Conselhos de Defesa e Segurança da Comunidade são o meio pelo qual a sociedade participa no encaminhamento e na solução dos problemas atinentes à segurança pública. II. Os Municípios têm o dever constitucional e a obrigatoriedade de constituir guardas municipais. III. O Estado possui ampla liberdade para operar serviços de informações, podendo monitorar quaisquer atividades sociais, independentemente de a lei defini-las ou não como delinquência. IV. A segurança pública no Rio Grande do Sul é exercida exclusivamente através da Brigada Militar, da Polícia Civil, da Polícia Rodoviária Estadual e da Polícia Penal.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas II e III.
(D) Apenas III e IV.
(E) I, II, III e IV.$q$,'A',15,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A). Mantida em revisão: Constituição do Estado do Rio Grande do Sul: fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Constituição do RS: segurança pública$q$),
(53,$q$Legislação Aplicada/Direito$q$,$q$Com base no art. 137 da Constituição do Estado do Rio Grande do Sul, são prioridades da política penitenciária do Estado do Rio Grande do Sul:
I. A execução de políticas públicas voltadas à qualificação da custódia e aos mecanismos de classificação das pessoas presas, com vistas à individualização da execução da pena. II. A expansão da assistência jurídica, social, religiosa, material, à saúde e à educação. III. A elevação dos níveis de escolaridade, educação profissional e empregabilidade da população prisional.
Quais estão corretas?
(A) Apenas I.
(B) Apenas III.
(C) Apenas I e II.
(D) Apenas II e III.
(E) I, II e III.$q$,$q$Com base no art. 137 da Constituição do Estado do Rio Grande do Sul, são prioridades da política penitenciária do Estado do Rio Grande do Sul:
I. A execução de políticas públicas voltadas à qualificação da custódia e aos mecanismos de classificação das pessoas presas, com vistas à individualização da execução da pena. II. A expansão da assistência jurídica, social, religiosa, material, à saúde e à educação. III. A elevação dos níveis de escolaridade, educação profissional e empregabilidade da população prisional.
Quais estão corretas?
(A) Apenas I.
(B) Apenas III.
(C) Apenas I e II.
(D) Apenas II e III.
(E) I, II e III.$q$,'E',15,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E). Mantida em revisão: Constituição do Estado do Rio Grande do Sul (art. 137): fonte oficial fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Constituição do RS: art. 137 e prioridades da política penitenciária$q$),
(54,$q$Legislação Aplicada/Direito$q$,$q$Com base no disposto no art. 5º da Constituição Federal de 1988, assinale a alternativa correta.
(A) O réu poderá ser considerado culpado antes do trânsito em julgado da sentença penal condenatória.
(B) Ao preso não será concedida a identificação dos responsáveis por sua prisão ou por seu interrogatório policial.
(C) Ninguém será levado à prisão ou nela mantido, quando a lei admitir a liberdade provisória, com ou sem fiança.
(D) No processo, as provas obtidas por meios ilícitos podem ser admitidas nos casos em que comprovem a prática do crime.
(E) A prisão poderá ser relaxada pelo Delegado de Polícia.$q$,$q$Com base no disposto no art. 5º da Constituição Federal de 1988, assinale a alternativa correta.
(A) O réu poderá ser considerado culpado antes do trânsito em julgado da sentença penal condenatória.
(B) Ao preso não será concedida a identificação dos responsáveis por sua prisão ou por seu interrogatório policial.
(C) Ninguém será levado à prisão ou nela mantido, quando a lei admitir a liberdade provisória, com ou sem fiança.
(D) No processo, as provas obtidas por meios ilícitos podem ser admitidas nos casos em que comprovem a prática do crime.
(E) A prisão poderá ser relaxada pelo Delegado de Polícia.$q$,'C',16,'active',true,false,'[{"title": "CF, art. 5º, LXVI", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CF, art. 5º, LXVI; chave C confere com o gabarito definitivo. Ninguém será levado à prisão ou nela mantido quando a lei admitir a liberdade provisória, com ou sem fiança.$q$,$q$CF, art. 5º: prisão e presunção de inocência$q$),
(55,$q$Legislação Aplicada/Direito$q$,$q$Em relação aos direitos e deveres individuais e coletivos previstos na Constituição Federal de 1988, analise as assertivas abaixo:
I. A prisão civil por inadimplemento voluntário e inescusável de dívida alimentícia é admitida no Brasil. II. É livre a manifestação do pensamento, inclusive de forma anônima. III. O Brasil admite a pena de banimento em situações excepcionais, nos termos da lei.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,$q$Em relação aos direitos e deveres individuais e coletivos previstos na Constituição Federal de 1988, analise as assertivas abaixo:
I. A prisão civil por inadimplemento voluntário e inescusável de dívida alimentícia é admitida no Brasil. II. É livre a manifestação do pensamento, inclusive de forma anônima. III. O Brasil admite a pena de banimento em situações excepcionais, nos termos da lei.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,'A',16,'active',true,false,'[{"title": "CF, art. 5º, IV, XLVII, d, e LXVII", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CF, art. 5º, IV, XLVII, d, e LXVII; chave A confere com o gabarito definitivo. A prisão civil do devedor voluntário de alimentos é admitida (LXVII); o anonimato é vedado (IV) e o banimento é proibido (XLVII, d).$q$,$q$CF, art. 5º: prisão civil, anonimato e banimento$q$),
(56,$q$Legislação Aplicada/Direito$q$,$q$Com base no disposto na Constituição Federal de 1988, analise a sentença abaixo:
Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações penais, inclusive as militares (1ª parte). Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública (2ª parte). Às polícias penais, vinculadas ao órgão administrador do sistema penal da unidade federativa a que pertencem, cabe a segurança dos estabelecimentos penais (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,$q$Com base no disposto na Constituição Federal de 1988, analise a sentença abaixo:
Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações penais, inclusive as militares (1ª parte). Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública (2ª parte). Às polícias penais, vinculadas ao órgão administrador do sistema penal da unidade federativa a que pertencem, cabe a segurança dos estabelecimentos penais (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,'D',16,'active',true,false,'[{"title": "CF, art. 144, §§ 4º, 5º e 5º-A", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CF, art. 144, §§ 4º, 5º e 5º-A; chave D confere com o gabarito definitivo. A polícia civil apura infrações penais, exceto as militares (§ 4º); a 1ª parte está errada; 2ª e 3ª partes (§§ 5º e 5º-A) estão corretas.$q$,$q$CF, art. 144: competências das polícias$q$),
(57,$q$Legislação Aplicada/Direito$q$,$q$Conforme disposto na Constituição Federal de 1988, o Tribunal de Justiça do Estado do Rio Grande do Sul (TJRS) deverá observar, em sua composição, a regra do quinto constitucional, a qual prevê que um quinto dos seus membros será oriundo do Ministério Público e da Advocacia. Após a realização de processo eleitoral próprio e formação da lista tríplice, a escolha do indicado a ser nomeado como novo membro do TJRS compete ao:
(A) Senado.
(B) Governador do Rio Grande do Sul.
(C) Presidente da Assembleia Legislativa do Rio Grande do Sul.
(D) Presidente do Tribunal de Justiça do Rio Grande do Sul.
(E) Presidente da Associação dos Magistrados do Estado do Rio Grande do Sul.$q$,$q$Conforme disposto na Constituição Federal de 1988, o Tribunal de Justiça do Estado do Rio Grande do Sul (TJRS) deverá observar, em sua composição, a regra do quinto constitucional, a qual prevê que um quinto dos seus membros será oriundo do Ministério Público e da Advocacia. Após a realização de processo eleitoral próprio e formação da lista tríplice, a escolha do indicado a ser nomeado como novo membro do TJRS compete ao:
(A) Senado.
(B) Governador do Rio Grande do Sul.
(C) Presidente da Assembleia Legislativa do Rio Grande do Sul.
(D) Presidente do Tribunal de Justiça do Rio Grande do Sul.
(E) Presidente da Associação dos Magistrados do Estado do Rio Grande do Sul.$q$,'B',16,'active',true,false,'[{"title": "CF, art. 94, parágrafo único", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CF, art. 94, parágrafo único; chave B confere com o gabarito definitivo. Recebida a lista tríplice, o tribunal a envia ao Poder Executivo, que escolhe um dos integrantes para nomeação: no TJRS, o Governador.$q$,$q$CF: quinto constitucional$q$),
(58,$q$Legislação Aplicada/Direito$q$,$q$De acordo com as disposições da Lei nº 8.429/1992, conhecida como Lei de Improbidade Administrativa, consideram-se atos de improbidade administrativa as seguintes condutas, EXCETO:
(A) Receber vantagem econômica de qualquer natureza, direta ou indiretamente, para omitir ato de ofício, providência ou declaração a que esteja obrigado.
(B) Conceder benefício administrativo ou fiscal sem a observância das formalidades legais ou regulamentares aplicáveis à espécie.
(C) Causar lesão ao patrimônio público por ação ou omissão culposa, decorrente de negligência, imprudência ou imperícia.
(D) Revelar fato ou circunstância de que tem ciência em razão das atribuições e que deva permanecer em segredo.
(E) Receber, para si ou para outrem, vantagem econômica, direta ou indireta, de quem tenha interesse, direto ou indireto, que possa ser atingido ou amparado por ação ou omissão decorrente das atribuições do agente público.$q$,$q$De acordo com as disposições da Lei nº 8.429/1992, conhecida como Lei de Improbidade Administrativa, consideram-se atos de improbidade administrativa as seguintes condutas, EXCETO:
(A) Receber vantagem econômica de qualquer natureza, direta ou indiretamente, para omitir ato de ofício, providência ou declaração a que esteja obrigado.
(B) Conceder benefício administrativo ou fiscal sem a observância das formalidades legais ou regulamentares aplicáveis à espécie.
(C) Causar lesão ao patrimônio público por ação ou omissão culposa, decorrente de negligência, imprudência ou imperícia.
(D) Revelar fato ou circunstância de que tem ciência em razão das atribuições e que deva permanecer em segredo.
(E) Receber, para si ou para outrem, vantagem econômica, direta ou indireta, de quem tenha interesse, direto ou indireto, que possa ser atingido ou amparado por ação ou omissão decorrente das atribuições do agente público.$q$,'C',17,'active',true,false,'[{"title": "Lei 8.429/1992, art. 10 (redação da Lei 14.230/2021)", "url": "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 8.429/1992, art. 10 (redação da Lei 14.230/2021); chave C confere com o gabarito definitivo. A lesão ao erário somente configura improbidade quando dolosa; a conduta culposa, descrita na alternativa C, não configura mais ato de improbidade.$q$,$q$Lei de Improbidade Administrativa: condutas$q$),
(59,$q$Legislação Aplicada/Direito$q$,$q$Em relação às previsões da Lei de Execução Penal sobre deveres, direitos e disciplina, analise as assertivas a seguir:
I. O preso condenado por crime contra a mulher por razões da condição do sexo feminino não poderá usufruir do direito à visita íntima ou conjugal. II. A fuga do estabelecimento prisional constitui falta de natureza grave. III. A advertência verbal não constitui sanção disciplinar.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) I, II e III.$q$,$q$Em relação às previsões da Lei de Execução Penal sobre deveres, direitos e disciplina, analise as assertivas a seguir:
I. O preso condenado por crime contra a mulher por razões da condição do sexo feminino não poderá usufruir do direito à visita íntima ou conjugal. II. A fuga do estabelecimento prisional constitui falta de natureza grave. III. A advertência verbal não constitui sanção disciplinar.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas III.
(D) Apenas I e II.
(E) I, II e III.$q$,'D',17,'active',true,false,'[{"title": "LEP, arts. 41, § 2º, 50, II, e 53, I", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, arts. 41, § 2º, 50, II, e 53, I; chave D confere com o gabarito definitivo. Condenado por crime contra a mulher por razões do sexo feminino não tem visita íntima (art. 41, § 2º); a fuga é falta grave (art. 50, II); a advertência verbal é sanção disciplinar (art. 53, I).$q$,$q$LEP: direitos, deveres e disciplina$q$),
(60,$q$Legislação Aplicada/Direito$q$,$q$Considerando o disposto na Lei de Execução Penal sobre o Conselho Nacional de Política Criminal e Penitenciária (CNPCP), analise a sentença abaixo:
O CNPCP é subordinado ao Ministério da Justiça (1ª parte). O mandato dos membros do CNPCP terá duração de 4 anos (2ª parte). Ao CNPCP, no exercício de suas atividades, em âmbito federal ou estadual, incumbe representar à autoridade competente para a interdição, no todo ou em parte, de estabelecimento penal (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 3ª partes.
(E) Todas as partes.$q$,$q$Considerando o disposto na Lei de Execução Penal sobre o Conselho Nacional de Política Criminal e Penitenciária (CNPCP), analise a sentença abaixo:
O CNPCP é subordinado ao Ministério da Justiça (1ª parte). O mandato dos membros do CNPCP terá duração de 4 anos (2ª parte). Ao CNPCP, no exercício de suas atividades, em âmbito federal ou estadual, incumbe representar à autoridade competente para a interdição, no todo ou em parte, de estabelecimento penal (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 3ª partes.
(E) Todas as partes.$q$,'D',17,'active',true,false,'[{"title": "LEP, arts. 62, 63 e 64, X", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, arts. 62, 63 e 64, X; chave D confere com o gabarito definitivo. O CNPCP é subordinado ao Ministério da Justiça (art. 62); o mandato dos membros é de 2 anos (art. 63); incumbe-lhe representar para a interdição de estabelecimento penal (art. 64, X).$q$,$q$LEP: Conselho Nacional de Política Criminal e Penitenciária$q$),
(61,$q$Legislação Aplicada/Direito$q$,$q$Considerando as disposições do Decreto nº 46.534/2009, que aprova o Regimento Disciplinar Penitenciário do Estado do Rio Grande do Sul, da Resolução CNPCP nº 14/1994, que fixa as Regras Mínimas para o Tratamento do Preso no Brasil, e da Lei de Execução Penal, assinale a alternativa INCORRETA.
(A) A infração disciplinar atribuída ao preso deverá ser apurada por meio de procedimento disciplinar próprio.
(B) É permitida a aplicação de sanções disciplinares coletivas em casos de rebelião e tumulto.
(C) As sanções disciplinares a serem aplicadas respeitarão os direitos fundamentais dos presos.
(D) Ao diretor/administrador das casas prisionais caberá a competência para o exercício do poder disciplinar no interior do estabelecimento prisional.
(E) Todo preso terá direito à ampla defesa e ao contraditório nos procedimentos disciplinares a que for submetido.$q$,$q$Considerando as disposições do Decreto nº 46.534/2009, que aprova o Regimento Disciplinar Penitenciário do Estado do Rio Grande do Sul, da Resolução CNPCP nº 14/1994, que fixa as Regras Mínimas para o Tratamento do Preso no Brasil, e da Lei de Execução Penal, assinale a alternativa INCORRETA.
(A) A infração disciplinar atribuída ao preso deverá ser apurada por meio de procedimento disciplinar próprio.
(B) É permitida a aplicação de sanções disciplinares coletivas em casos de rebelião e tumulto.
(C) As sanções disciplinares a serem aplicadas respeitarão os direitos fundamentais dos presos.
(D) Ao diretor/administrador das casas prisionais caberá a competência para o exercício do poder disciplinar no interior do estabelecimento prisional.
(E) Todo preso terá direito à ampla defesa e ao contraditório nos procedimentos disciplinares a que for submetido.$q$,'B',17,'active',true,false,'[{"title": "LEP, art. 45, § 3º", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, art. 45, § 3º; chave B confere com o gabarito definitivo. São vedadas as sanções coletivas: a alternativa B (incorreta) afirma o contrário.$q$,$q$Disciplina penitenciária: sanções coletivas$q$),
(62,$q$Legislação Aplicada/Direito$q$,$q$De acordo com as previsões da Lei de Execução Penal, o condenado à pena de reclusão em regime inicial fechado será submetido obrigatoriamente à identificação do perfil genético, mediante extração de DNA, por técnica adequada e indolor, por ocasião do ingresso no estabelecimento prisional. Caso haja recusa do condenado em submeter-se ao procedimento de identificação do perfil genético, é correto afirmar que esse ato:
(A) Constitui falta grave.
(B) Constitui falta média.
(C) Constitui falta leve.
(D) Constitui crime de desobediência.
(E) Não constitui infração disciplinar.$q$,$q$De acordo com as previsões da Lei de Execução Penal, o condenado à pena de reclusão em regime inicial fechado será submetido obrigatoriamente à identificação do perfil genético, mediante extração de DNA, por técnica adequada e indolor, por ocasião do ingresso no estabelecimento prisional. Caso haja recusa do condenado em submeter-se ao procedimento de identificação do perfil genético, é correto afirmar que esse ato:
(A) Constitui falta grave.
(B) Constitui falta média.
(C) Constitui falta leve.
(D) Constitui crime de desobediência.
(E) Não constitui infração disciplinar.$q$,'A',18,'active',true,false,'[{"title": "LEP, arts. 9º-A e 50", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, arts. 9º-A e 50; chave A confere com o gabarito definitivo. A recusa do condenado em se submeter à identificação do perfil genético constitui falta grave (art. 9º-A, § 8º).$q$,$q$LEP: identificação do perfil genético$q$),
(63,$q$Legislação Aplicada/Direito$q$,$q$A Lei de Execução Penal prevê que a prática de fato previsto como crime doloso constitui falta grave e, quando ocasionar subversão da ordem ou disciplina internas, sujeitará o preso ao regime disciplinar diferenciado, sem prejuízo da respectiva sanção penal. São características do regime disciplinar diferenciado, EXCETO:
(A) Recolhimento em cela individual.
(B) Entrevistas sempre monitoradas, inclusive aquelas com seu defensor.
(C) Fiscalização do conteúdo da correspondência do preso.
(D) Participação em audiências judiciais preferencialmente por videoconferência, garantindo-se a participação do defensor no mesmo ambiente do preso.
(E) Direito do preso à saída da cela por 2 horas diárias para banho de sol, em grupos de até 4 presos, desde que não haja contato com presos do mesmo grupo criminoso.$q$,$q$A Lei de Execução Penal prevê que a prática de fato previsto como crime doloso constitui falta grave e, quando ocasionar subversão da ordem ou disciplina internas, sujeitará o preso ao regime disciplinar diferenciado, sem prejuízo da respectiva sanção penal. São características do regime disciplinar diferenciado, EXCETO:
(A) Recolhimento em cela individual.
(B) Entrevistas sempre monitoradas, inclusive aquelas com seu defensor.
(C) Fiscalização do conteúdo da correspondência do preso.
(D) Participação em audiências judiciais preferencialmente por videoconferência, garantindo-se a participação do defensor no mesmo ambiente do preso.
(E) Direito do preso à saída da cela por 2 horas diárias para banho de sol, em grupos de até 4 presos, desde que não haja contato com presos do mesmo grupo criminoso.$q$,'B',18,'active',true,false,'[{"title": "LEP, art. 52", "url": "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra LEP, art. 52; chave B confere com o gabarito definitivo. No RDD as entrevistas são monitoradas, exceto as com o defensor (art. 52, V); a alternativa B contraria o texto.$q$,$q$LEP: regime disciplinar diferenciado$q$),
(64,$q$Legislação Aplicada/Direito$q$,$q$João foi condenado pelo crime de tráfico de drogas. Contudo, após o trânsito em julgado da sentença condenatória, o Juízo verificou a ocorrência da prescrição da pretensão punitiva estatal pela pena concretamente aplicada. Com base no disposto no Código Penal Brasileiro, a prescrição é causa que:
(A) Interrompe o cumprimento da pena.
(B) Suspende o cumprimento da pena.
(C) Extingue a punibilidade do agente.
(D) Reduz pela metade a pena imposta ao agente.
(E) Beneficia o preso com a progressão para regime mais brando.$q$,$q$João foi condenado pelo crime de tráfico de drogas. Contudo, após o trânsito em julgado da sentença condenatória, o Juízo verificou a ocorrência da prescrição da pretensão punitiva estatal pela pena concretamente aplicada. Com base no disposto no Código Penal Brasileiro, a prescrição é causa que:
(A) Interrompe o cumprimento da pena.
(B) Suspende o cumprimento da pena.
(C) Extingue a punibilidade do agente.
(D) Reduz pela metade a pena imposta ao agente.
(E) Beneficia o preso com a progressão para regime mais brando.$q$,'C',18,'active',true,false,'[{"title": "CP, arts. 107, IV, e 109", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CP, arts. 107, IV, e 109; chave C confere com o gabarito definitivo. A prescrição é causa de extinção da punibilidade.$q$,$q$Código Penal: prescrição$q$),
(65,$q$Legislação Aplicada/Direito$q$,$q$Considerando as disposições do Código Penal Brasileiro, assinale a alternativa INCORRETA.
(A) A suspensão condicional da pena é também aplicável aos condenados reincidentes em crime doloso, desde que a pena imposta não seja superior a 2 anos.
(B) A reincidência agrava a pena do condenado na segunda fase do cálculo dosimétrico.
(C) A confissão espontânea da autoria do crime, em Juízo, é uma causa que atenua a pena do condenado.
(D) A limitação de fim de semana é uma das espécies de penas restritivas de direitos previstas em lei.
(E) A multa é uma das espécies de pena previstas pelo Código Penal.$q$,$q$Considerando as disposições do Código Penal Brasileiro, assinale a alternativa INCORRETA.
(A) A suspensão condicional da pena é também aplicável aos condenados reincidentes em crime doloso, desde que a pena imposta não seja superior a 2 anos.
(B) A reincidência agrava a pena do condenado na segunda fase do cálculo dosimétrico.
(C) A confissão espontânea da autoria do crime, em Juízo, é uma causa que atenua a pena do condenado.
(D) A limitação de fim de semana é uma das espécies de penas restritivas de direitos previstas em lei.
(E) A multa é uma das espécies de pena previstas pelo Código Penal.$q$,'A',18,'active',true,false,'[{"title": "CP, arts. 32, 43, 61, I, 65, III, d, e 77, I", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CP, arts. 32, 43, 61, I, 65, III, d, e 77, I; chave A confere com o gabarito definitivo. A suspensão condicional da pena exige que o condenado não seja reincidente em crime doloso (art. 77, I): a alternativa A está incorreta.$q$,$q$Código Penal: penas, reincidência e atenuantes$q$),
(66,$q$Legislação Aplicada/Direito$q$,$q$Tendo por base o disposto no Código Penal Brasileiro sobre a ação penal, analise as assertivas abaixo:
I. A ação penal pública será promovida pelo Ministério Público. II. A ação penal privada também será promovida pelo Ministério Público, mas dependerá de representação expressa do ofendido. III. O perdão do ofendido, nos crimes em que somente se procede mediante queixa, obsta ao prosseguimento da ação penal.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,$q$Tendo por base o disposto no Código Penal Brasileiro sobre a ação penal, analise as assertivas abaixo:
I. A ação penal pública será promovida pelo Ministério Público. II. A ação penal privada também será promovida pelo Ministério Público, mas dependerá de representação expressa do ofendido. III. O perdão do ofendido, nos crimes em que somente se procede mediante queixa, obsta ao prosseguimento da ação penal.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,'C',19,'active',true,false,'[{"title": "CP, arts. 100, § 1º, e 105", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CP, arts. 100, § 1º, e 105; chave C confere com o gabarito definitivo. A ação pública é promovida pelo Ministério Público (art. 100, § 1º); o perdão do ofendido obsta o prosseguimento da ação privada; a assertiva II confunde ação privada e pública condicionada.$q$,$q$Código Penal: ação penal$q$),
(67,$q$Legislação Aplicada/Direito$q$,$q$Acerca do concurso de pessoas, conforme previsto no Código Penal Brasileiro, analise a sentença abaixo:
Quem, de qualquer modo, concorre para o crime incide nas penas a este cominadas, na medida de sua culpabilidade (1ª parte). Ainda que a participação seja de menor importância, a pena não poderá ser diminuída em sentença (2ª parte). O ajuste, a determinação ou instigação e o auxílio, salvo disposição expressa em contrário, não são puníveis se o crime não chega, pelo menos, a ser tentado (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 3ª partes.
(E) Todas as partes.$q$,$q$Acerca do concurso de pessoas, conforme previsto no Código Penal Brasileiro, analise a sentença abaixo:
Quem, de qualquer modo, concorre para o crime incide nas penas a este cominadas, na medida de sua culpabilidade (1ª parte). Ainda que a participação seja de menor importância, a pena não poderá ser diminuída em sentença (2ª parte). O ajuste, a determinação ou instigação e o auxílio, salvo disposição expressa em contrário, não são puníveis se o crime não chega, pelo menos, a ser tentado (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 3ª partes.
(E) Todas as partes.$q$,'D',19,'active',true,false,'[{"title": "CP, arts. 29, § 1º, e 31", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra CP, arts. 29, § 1º, e 31; chave D confere com o gabarito definitivo. Participação de menor importância permite diminuição da pena de 1/6 a 1/3 (art. 29, § 1º): a 2ª parte está errada; 1ª e 3ª estão corretas.$q$,$q$Código Penal: concurso de pessoas$q$),
(68,$q$Legislação Aplicada/Direito$q$,$q$Com base na Lei Federal nº 8.072/1990, conhecida como Lei dos Crimes Hediondos, e no Código Penal Brasileiro, analise o caso a seguir:
José de Alencar foi condenado pela morte de Luís Paulo, posto que desferiu dois disparos certeiros de arma de fogo em direção à vítima. A motivação do crime foi considerada torpe pelo Conselho de Sentença quando do julgamento do caso pelo Tribunal do Júri, uma vez que foi decorrente do não pagamento de uma dívida de jogo, no valor de R$ 100,00. A pena final foi estabelecida em 18 anos de reclusão, não cabendo mais recurso. Nesse contexto, o crime cometido por José de Alencar é considerado _________, e o cumprimento da pena deverá ser iniciado em regime _____________.
Assinale a alternativa que preenche, correta e respectivamente, as lacunas do trecho acima.
(A) comum – fechado
(B) comum – semiaberto
(C) comum – aberto
(D) hediondo – semiaberto
(E) hediondo – fechado$q$,$q$Com base na Lei Federal nº 8.072/1990, conhecida como Lei dos Crimes Hediondos, e no Código Penal Brasileiro, analise o caso a seguir:
José de Alencar foi condenado pela morte de Luís Paulo, posto que desferiu dois disparos certeiros de arma de fogo em direção à vítima. A motivação do crime foi considerada torpe pelo Conselho de Sentença quando do julgamento do caso pelo Tribunal do Júri, uma vez que foi decorrente do não pagamento de uma dívida de jogo, no valor de R$ 100,00. A pena final foi estabelecida em 18 anos de reclusão, não cabendo mais recurso. Nesse contexto, o crime cometido por José de Alencar é considerado _________, e o cumprimento da pena deverá ser iniciado em regime _____________.
Assinale a alternativa que preenche, correta e respectivamente, as lacunas do trecho acima.
(A) comum – fechado
(B) comum – semiaberto
(C) comum – aberto
(D) hediondo – semiaberto
(E) hediondo – fechado$q$,'E',19,'active',true,false,'[{"title": "Lei 8.072/1990, art. 1º, I, e CP, art. 33, § 2º, a", "url": "https://www.planalto.gov.br/ccivil_03/leis/l8072.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 8.072/1990, art. 1º, I, e CP, art. 33, § 2º, a; chave E confere com o gabarito definitivo. Homicídio qualificado é crime hediondo; pena superior a 8 anos exige regime inicial fechado.$q$,$q$Lei dos Crimes Hediondos: homicídio qualificado e regime inicial$q$),
(69,$q$Legislação Aplicada/Direito$q$,$q$Nos termos da Lei dos Crimes Hediondos, são considerados crimes hediondos os listados a seguir, EXCETO:
(A) Tráfico de drogas.
(B) Feminicídio.
(C) Estupro.
(D) Estupro de vulnerável.
(E) Sequestro e cárcere privado cometido contra menor de 18 anos.$q$,$q$Nos termos da Lei dos Crimes Hediondos, são considerados crimes hediondos os listados a seguir, EXCETO:
(A) Tráfico de drogas.
(B) Feminicídio.
(C) Estupro.
(D) Estupro de vulnerável.
(E) Sequestro e cárcere privado cometido contra menor de 18 anos.$q$,'A',19,'active',true,false,'[{"title": "Lei 8.072/1990, arts. 1º e 2º", "url": "https://www.planalto.gov.br/ccivil_03/leis/l8072.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 8.072/1990, arts. 1º e 2º; chave A confere com o gabarito definitivo. O tráfico de drogas é equiparado a hediondo (art. 2º), não consta do rol do art. 1º; os demais itens estão no rol (inclusive sequestro e cárcere privado de menor de 18 anos, art. 1º, XI).$q$,$q$Lei dos Crimes Hediondos: rol de crimes$q$),
(70,$q$Legislação Aplicada/Direito$q$,$q$Em se tratando de crimes hediondos ou equiparados a hediondos, com base no disposto na Lei dos Crimes Hediondos, o prazo máximo da prisão temporária, desconsiderada a possibilidade de prorrogação, será de:
(A) 10 dias.
(B) 15 dias.
(C) 30 dias.
(D) 45 dias.
(E) 90 dias.$q$,$q$Em se tratando de crimes hediondos ou equiparados a hediondos, com base no disposto na Lei dos Crimes Hediondos, o prazo máximo da prisão temporária, desconsiderada a possibilidade de prorrogação, será de:
(A) 10 dias.
(B) 15 dias.
(C) 30 dias.
(D) 45 dias.
(E) 90 dias.$q$,'C',20,'active',true,false,'[{"title": "Lei 8.072/1990, art. 2º, § 4º", "url": "https://www.planalto.gov.br/ccivil_03/leis/l8072.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 8.072/1990, art. 2º, § 4º; chave C confere com o gabarito definitivo. Nos crimes hediondos e equiparados, a prisão temporária tem prazo de trinta dias, prorrogável por igual período.$q$,$q$Lei dos Crimes Hediondos: prisão temporária$q$),
(71,$q$Legislação Aplicada/Direito$q$,$q$Considerando as disposições da Lei Federal nº 10.826/2003, que dispõe sobre registro, posse e comercialização de armas de fogo e munição, sobre o Sistema Nacional de Armas (Sinarm), define crimes e dá outras providências, analise o caso a seguir:
Alírio de Jesus, advogado, vem sendo ameaçado por um antigo cliente que se mostrou insatisfeito com o resultado de um processo patrocinado pelo causídico. Conversando com um colega de profissão, Alírio descobriu que, considerando a situação, pode pleitear a obtenção de autorização para porte de arma de fogo, a fim de garantir a sua proteção pessoal.
O fornecimento da autorização para porte de arma de fogo nesse caso compete ao(à):
(A) Ordem dos Advogados do Brasil.
(B) Polícia Militar.
(C) Polícia Federal.
(D) Comando do Exército.
(E) Ministério da Justiça.$q$,$q$Considerando as disposições da Lei Federal nº 10.826/2003, que dispõe sobre registro, posse e comercialização de armas de fogo e munição, sobre o Sistema Nacional de Armas (Sinarm), define crimes e dá outras providências, analise o caso a seguir:
Alírio de Jesus, advogado, vem sendo ameaçado por um antigo cliente que se mostrou insatisfeito com o resultado de um processo patrocinado pelo causídico. Conversando com um colega de profissão, Alírio descobriu que, considerando a situação, pode pleitear a obtenção de autorização para porte de arma de fogo, a fim de garantir a sua proteção pessoal.
O fornecimento da autorização para porte de arma de fogo nesse caso compete ao(à):
(A) Ordem dos Advogados do Brasil.
(B) Polícia Militar.
(C) Polícia Federal.
(D) Comando do Exército.
(E) Ministério da Justiça.$q$,'C',20,'active',true,false,'[{"title": "Lei 10.826/2003, art. 10", "url": "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 10.826/2003, art. 10; chave C confere com o gabarito definitivo. A autorização para o porte de arma de fogo de uso permitido é de competência da Polícia Federal.$q$,$q$Estatuto do Desarmamento: autorização de porte$q$),
(72,$q$Legislação Aplicada/Direito$q$,$q$Com base na Lei nº 10.826/2003, analise as assertivas abaixo:
I. Alterar ou suprimir o número de identificação de arma de fogo de uso restrito constitui crime. II. Comete crime aquele que possui arma de fogo de uso permitido em desacordo com determinação legal ou regulamentar, ainda que no interior de sua residência ou dependência desta. III. Comete crime aquele que deixar de observar as cautelas necessárias para impedir que menor de 18 anos se apodere de arma de fogo que esteja sob sua posse ou que seja de sua propriedade.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,$q$Com base na Lei nº 10.826/2003, analise as assertivas abaixo:
I. Alterar ou suprimir o número de identificação de arma de fogo de uso restrito constitui crime. II. Comete crime aquele que possui arma de fogo de uso permitido em desacordo com determinação legal ou regulamentar, ainda que no interior de sua residência ou dependência desta. III. Comete crime aquele que deixar de observar as cautelas necessárias para impedir que menor de 18 anos se apodere de arma de fogo que esteja sob sua posse ou que seja de sua propriedade.
Quais estão corretas?
(A) Apenas I.
(B) Apenas I e II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,'E',20,'active',true,false,'[{"title": "Lei 10.826/2003, arts. 12, 13 e 16, § 1º, I", "url": "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 10.826/2003, arts. 12, 13 e 16, § 1º, I; chave E confere com o gabarito definitivo. As três condutas descritas constituem crime.$q$,$q$Estatuto do Desarmamento: crimes$q$),
(73,$q$Legislação Aplicada/Direito$q$,$q$Segundo a Lei nº 11.343/2006, conhecida como Lei de Drogas, são requisitos para o reconhecimento do tráfico de drogas em sua forma privilegiada, implicando possibilidade de redução de pena, as condições a seguir em relação ao agente, EXCETO:
(A) Ser primário.
(B) Ter bons antecedentes.
(C) Não se dedicar à prática de atividades criminosas.
(D) Não integrar organização criminosa.
(E) Confessar o crime em Juízo.$q$,$q$Segundo a Lei nº 11.343/2006, conhecida como Lei de Drogas, são requisitos para o reconhecimento do tráfico de drogas em sua forma privilegiada, implicando possibilidade de redução de pena, as condições a seguir em relação ao agente, EXCETO:
(A) Ser primário.
(B) Ter bons antecedentes.
(C) Não se dedicar à prática de atividades criminosas.
(D) Não integrar organização criminosa.
(E) Confessar o crime em Juízo.$q$,'E',20,'active',true,false,'[{"title": "Lei 11.343/2006, art. 33, § 4º", "url": "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 11.343/2006, art. 33, § 4º; chave E confere com o gabarito definitivo. O tráfico privilegiado exige agente primário, de bons antecedentes, que não se dedique a atividades criminosas nem integre organização criminosa; a confissão não é requisito.$q$,$q$Lei de Drogas: tráfico privilegiado$q$),
(74,$q$Legislação Aplicada/Direito$q$,$q$Com base no disposto na Lei nº 9.455/1997, que define os crimes de tortura e dá outras providências, analise a sentença abaixo:
O crime de tortura é inafiançável (1ª parte). Incorre na mesma pena do crime de tortura aquele que submete pessoa presa a sofrimento físico ou mental, por intermédio da prática de ato não previsto em lei ou não resultante de medida legal (2ª parte). Aquele que se omite em face de condutas que configuram crime de tortura quando tinha o dever de evitá-las ou apurá-las incorre nas mesmas penas previstas para o praticante da tortura (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 2ª partes.
(E) Todas as partes.$q$,$q$Com base no disposto na Lei nº 9.455/1997, que define os crimes de tortura e dá outras providências, analise a sentença abaixo:
O crime de tortura é inafiançável (1ª parte). Incorre na mesma pena do crime de tortura aquele que submete pessoa presa a sofrimento físico ou mental, por intermédio da prática de ato não previsto em lei ou não resultante de medida legal (2ª parte). Aquele que se omite em face de condutas que configuram crime de tortura quando tinha o dever de evitá-las ou apurá-las incorre nas mesmas penas previstas para o praticante da tortura (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 2ª parte.
(C) Apenas a 3ª parte.
(D) Apenas a 1ª e a 2ª partes.
(E) Todas as partes.$q$,'D',21,'active',true,false,'[{"title": "Lei 9.455/1997, art. 1º, §§ 1º, 2º e 6º", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9455.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 9.455/1997, art. 1º, §§ 1º, 2º e 6º; chave D confere com o gabarito definitivo. A tortura é inafiançável (§ 6º) e há a hipótese do § 1º; a omissão (§ 2º) é punida com detenção de um a quatro anos, e não com a mesma pena do torturador.$q$,$q$Lei de Tortura: crimes e penas$q$),
(75,$q$Legislação Aplicada/Direito$q$,$q$Considerando as disposições da Lei nº 7.960/1989, que dispõe sobre prisão temporária, assinale a alternativa INCORRETA.
(A) Caberá prisão temporária quando o indicado não tiver residência fixa ou não fornecer elementos necessários ao esclarecimento de sua identidade.
(B) A prisão temporária poderá ser decretada pelo Delegado de Polícia.
(C) Em se tratando de crime comum, a prisão temporária terá o prazo de 5 dias, prorrogável por igual período em caso de extrema e comprovada necessidade.
(D) O mandado de prisão conterá necessariamente o período de duração da prisão temporária, bem como o dia em que o preso deverá ser libertado.
(E) Inclui-se o dia do cumprimento do mandado de prisão no cômputo do prazo de prisão temporária.$q$,$q$Considerando as disposições da Lei nº 7.960/1989, que dispõe sobre prisão temporária, assinale a alternativa INCORRETA.
(A) Caberá prisão temporária quando o indicado não tiver residência fixa ou não fornecer elementos necessários ao esclarecimento de sua identidade.
(B) A prisão temporária poderá ser decretada pelo Delegado de Polícia.
(C) Em se tratando de crime comum, a prisão temporária terá o prazo de 5 dias, prorrogável por igual período em caso de extrema e comprovada necessidade.
(D) O mandado de prisão conterá necessariamente o período de duração da prisão temporária, bem como o dia em que o preso deverá ser libertado.
(E) Inclui-se o dia do cumprimento do mandado de prisão no cômputo do prazo de prisão temporária.$q$,'X',21,'annulled',true,false,null,$q$Questão anulada pela banca (gabarito definitivo do Edital nº 24/2026 = *). Não deve ser usada em treino.$q$,$q$Lei da Prisão Temporária$q$),
(76,$q$Legislação Aplicada/Direito$q$,$q$Com base no disposto na Lei nº 11.340/2006, conhecida como Lei Maria da Penha, analise as assertivas abaixo:
I. Maria, servidora pública federal, encontra-se em situação de violência doméstica e familiar, motivo pelo qual terá assegurada prioridade em sua remoção. II. Joana, que se encontra em situação de violência doméstica e familiar por parte de seu marido, não dispondo de recursos para os devidos trâmites jurídicos em relação ao seu divórcio, terá assegurado o encaminhamento à assistência judiciária. III. Larissa encontra-se em situação de violência doméstica e familiar, motivo pelo qual terá assegurado o seu cadastramento nos programas assistenciais do governo federal, estadual e municipal.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,$q$Com base no disposto na Lei nº 11.340/2006, conhecida como Lei Maria da Penha, analise as assertivas abaixo:
I. Maria, servidora pública federal, encontra-se em situação de violência doméstica e familiar, motivo pelo qual terá assegurada prioridade em sua remoção. II. Joana, que se encontra em situação de violência doméstica e familiar por parte de seu marido, não dispondo de recursos para os devidos trâmites jurídicos em relação ao seu divórcio, terá assegurado o encaminhamento à assistência judiciária. III. Larissa encontra-se em situação de violência doméstica e familiar, motivo pelo qual terá assegurado o seu cadastramento nos programas assistenciais do governo federal, estadual e municipal.
Quais estão corretas?
(A) Apenas I.
(B) Apenas II.
(C) Apenas I e III.
(D) Apenas II e III.
(E) I, II e III.$q$,'E',21,'active',true,false,'[{"title": "Lei 11.340/2006, art. 9º", "url": "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 11.340/2006, art. 9º; chave E confere com o gabarito definitivo. Remoção prioritária de servidora pública, encaminhamento à assistência judiciária e cadastro em programas assistenciais estão previstos no art. 9º.$q$,$q$Lei Maria da Penha: assistência à mulher$q$),
(77,$q$Legislação Aplicada/Direito$q$,$q$Mário dos Anjos, motivado por intenso ciúme e inconformado com o término do relacionamento amoroso que mantinha com Joana da Silva, assassinou os dois filhos do casal com o intuito de fazer Joana sofrer. Nos termos da Lei Maria da Penha, os fatos narrados caracterizam violência doméstica e familiar contra a mulher em sua forma:
(A) Psicológica.
(B) Moral.
(C) Vicária.
(D) Física.
(E) Parental.$q$,$q$Mário dos Anjos, motivado por intenso ciúme e inconformado com o término do relacionamento amoroso que mantinha com Joana da Silva, assassinou os dois filhos do casal com o intuito de fazer Joana sofrer. Nos termos da Lei Maria da Penha, os fatos narrados caracterizam violência doméstica e familiar contra a mulher em sua forma:
(A) Psicológica.
(B) Moral.
(C) Vicária.
(D) Física.
(E) Parental.$q$,'C',21,'active',true,false,'[{"title": "Lei 11.340/2006, art. 7º, VI", "url": "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 11.340/2006, art. 7º, VI; chave C confere com o gabarito definitivo. A violência vicária é a praticada contra descendentes ou pessoas de sua rede de apoio para atingir a mulher (inciso VI, incluído pela Lei 15.384/2026).$q$,$q$Lei Maria da Penha: violência vicária$q$),
(78,$q$Legislação Aplicada/Direito$q$,$q$Lilian está sofrendo violência doméstica e familiar por parte de seu ex-marido, que não aceita o fim do casamento e vem lhe perseguindo e ameaçando constantemente. Em virtude da situação, Lilian precisará afastar-se da cidade e do trabalho na empresa XYZ, a fim de preservar sua integridade física até que uma solução mais duradoura seja encontrada. Nesses termos, conforme disposto na Lei Maria da Penha, o juiz assegurará à mulher em situação de violência doméstica e familiar a manutenção do vínculo trabalhista, quando necessário o afastamento do local de trabalho, por até:
(A) 6 meses.
(B) 5 meses.
(C) 4 meses.
(D) 3 meses.
(E) 2 meses.$q$,$q$Lilian está sofrendo violência doméstica e familiar por parte de seu ex-marido, que não aceita o fim do casamento e vem lhe perseguindo e ameaçando constantemente. Em virtude da situação, Lilian precisará afastar-se da cidade e do trabalho na empresa XYZ, a fim de preservar sua integridade física até que uma solução mais duradoura seja encontrada. Nesses termos, conforme disposto na Lei Maria da Penha, o juiz assegurará à mulher em situação de violência doméstica e familiar a manutenção do vínculo trabalhista, quando necessário o afastamento do local de trabalho, por até:
(A) 6 meses.
(B) 5 meses.
(C) 4 meses.
(D) 3 meses.
(E) 2 meses.$q$,'A',22,'active',true,false,'[{"title": "Lei 11.340/2006, art. 9º, § 2º, II", "url": "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 11.340/2006, art. 9º, § 2º, II; chave A confere com o gabarito definitivo. O juiz assegura a manutenção do vínculo trabalhista, quando necessário o afastamento do local de trabalho, por até seis meses.$q$,$q$Lei Maria da Penha: manutenção do vínculo trabalhista$q$),
(79,$q$Legislação Aplicada/Direito$q$,$q$Com base nas disposições da Lei Maria da Penha, analise a sentença abaixo:
Descumprir decisão judicial que defere medidas protetivas de urgência é considerado crime, punido com detenção (1ª parte). Na hipótese de prisão em flagrante, apenas a autoridade judicial poderá conceder fiança (2ª parte). A pena será aumentada se o descumprimento decorrer da violação das áreas de exclusão monitoradas eletronicamente ou da remoção, violação ou alteração do dispositivo de monitoração sem autorização judicial (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 3ª parte.
(C) Apenas a 1ª e a 2ª partes.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,$q$Com base nas disposições da Lei Maria da Penha, analise a sentença abaixo:
Descumprir decisão judicial que defere medidas protetivas de urgência é considerado crime, punido com detenção (1ª parte). Na hipótese de prisão em flagrante, apenas a autoridade judicial poderá conceder fiança (2ª parte). A pena será aumentada se o descumprimento decorrer da violação das áreas de exclusão monitoradas eletronicamente ou da remoção, violação ou alteração do dispositivo de monitoração sem autorização judicial (3ª parte).
Quais partes estão corretas?
(A) Apenas a 1ª parte.
(B) Apenas a 3ª parte.
(C) Apenas a 1ª e a 2ª partes.
(D) Apenas a 2ª e a 3ª partes.
(E) Todas as partes.$q$,'D',22,'active',true,false,'[{"title": "Lei 11.340/2006, art. 24-A", "url": "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Lei 11.340/2006, art. 24-A; chave D confere com o gabarito definitivo. A pena do art. 24-A é de reclusão de 2 a 5 anos (1ª parte errada); apenas a autoridade judicial concede fiança (§ 2º); há aumento de pena em caso de violação do monitoramento eletrônico (§ 4º).$q$,$q$Lei Maria da Penha: descumprimento de medidas protetivas$q$),
(80,$q$Legislação Aplicada/Direito$q$,$q$O Decreto nº 678/1992 promulgou a Convenção Americana sobre Direitos Humanos. Segundo o referido Decreto, a Comissão Interamericana de Direitos Humanos é composta por _____ membros, e a Corte Interamericana de Direitos Humanos, por ______ juízes nacionais dos Estados-Membros da Organização.
Assinale a alternativa que preenche, correta e respectivamente, as lacunas do trecho acima.
(A) 05 – 05
(B) 07 – 07
(C) 09 – 09
(D) 11 – 11
(E) 15 – 15$q$,$q$O Decreto nº 678/1992 promulgou a Convenção Americana sobre Direitos Humanos. Segundo o referido Decreto, a Comissão Interamericana de Direitos Humanos é composta por _____ membros, e a Corte Interamericana de Direitos Humanos, por ______ juízes nacionais dos Estados-Membros da Organização.
Assinale a alternativa que preenche, correta e respectivamente, as lacunas do trecho acima.
(A) 05 – 05
(B) 07 – 07
(C) 09 – 09
(D) 11 – 11
(E) 15 – 15$q$,'B',22,'active',true,false,'[{"title": "Decreto 678/1992, arts. 34 e 52", "url": "https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm", "checked_at": "2026-10-18"}]'::jsonb,$q$Auditado em 2026-10-18 contra Decreto 678/1992, arts. 34 e 52; chave B confere com o gabarito definitivo. A Comissão Interamericana compõe-se de sete membros e a Corte, de sete juízes.$q$,$q$Convenção Americana sobre Direitos Humanos: composição da Comissão e da Corte$q$)
), resolved as (
  select imported.*, qsrc.id question_source_id, asrc.id answer_key_source_id, topic.id syllabus_topic_id
  from imported
  join public.syllabus_editions ed on ed.contest_name='Polícia Penal do Estado do Rio Grande do Sul' and ed.role_name='Policial Penal' and ed.contest_year=2026
  join public.syllabus_topics topic on topic.edition_id=ed.id and topic.discipline=imported.subject and topic.topic_order=1
  join public.content_sources qsrc on qsrc.url='https://www.fundatec.org.br/home/portal/concursos/provas/1092.024_Policial_Penal_NS_DM_POS-PRELO.PDF'
  join public.content_sources asrc on asrc.url='https://concursos-publicacoes.s3.amazonaws.com/1092/publico/1092-EditalnA24-2026-DivulgaAAodosGabaritosDefinitivosdasProvasTeArico-Objetivas_6aa21274c9f5b.pdf'
)
insert into public.official_exam_questions (
  question_source_id,answer_key_source_id,syllabus_topic_id,current_syllabus_topic_id,contest_name,career_name,exam_board,exam_year,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,
  legal_basis,law_version_checked_at,legal_audit_completed,review_note,verified_at,tested_topic,state,career_category,role_type
)
select question_source_id,answer_key_source_id,syllabus_topic_id,
  case when legal_basis is not null then syllabus_topic_id end,
  'Polícia Penal do Estado do Rio Grande do Sul','Policial Penal','FUNDATEC',2026,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,
  coalesce(legal_basis,'[]'::jsonb),case when legal_basis is not null then now() end,legal_basis is not null,review_note,now(),tested_topic,'RS','Polícia Penal','Policial Penal'
from resolved
on conflict (contest_name,career_name,exam_year,item_number) do nothing;
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select '4a9a3b10-de43-47df-bc2d-e61389024595','Texto — Saiba como evitar a autossabotagem, Erica Sweeney (itens 1 a 20)','Saiba como evitar a autossabotagem
Por Erica Sweeney
01 O prazo de entrega da tarefa está no seu calendário ..... semanas. Mas, na noite anterior,
02 o trabalho ainda não está concluído. Talvez você tenha __________ o tempo necessário, pensado
03 demais em como fazer tudo certo ou se preocupado com a recepção do público. Se esse cenário
04 lhe parece familiar, você pode estar vivenciando uma forma de autossabotagem, um padrão “que
05 impomos ..... nós mesmos, muitas vezes inconscientemente, e que acaba sabotando nossas
06 vidas, nossos planos ou até nossos objetivos”, afirma Charlie Heriot-Maitland, psicóloga clínica.
07 Em vez de uma falta de motivação ou disciplina, a autossabotagem pode ter origem na
08 forma como o cérebro reage a ameaças percebidas. Heriot-Maitland argumenta que ela pode
09 “derivar de mecanismos evolutivos de sobrevivência”.
10 O resultado é um ciclo silencioso: comportamentos que parecem protetores no momento —
11 adiamento, evitação, autocrítica — podem impedir que as pessoas alcancem os objetivos que
12 mais lhes importam, muitas vezes sem que elas se _____ conta. “Muitos desses ciclos de medo
13 apenas os ______ estagnados ou até mesmo os fazem regredir”, acrescenta Heriot-Maitland.
14 Entender por que a autossabotagem acontece, dizem os pesquisadores, é o primeiro passo
15 para interrompê-la. A autossabotagem se refere ..... pensamentos e sentimentos que minam
16 seus objetivos de longo prazo, afirma Tim Pychyl, psicólogo que estuda ..... procrastinação. A
17 maioria das pessoas experimenta alguma forma de autossabotagem em algum momento, dizem
18 os pesquisadores, embora para algumas ela permaneça ocasional, enquanto para outras se torna
19 persistente e prejudicial.
20 Ela pode assumir muitas formas diferentes, incluindo procrastinação, compulsão alimentar,
21 gastos excessivos, _______ por jogos de azar ou vícios diversos, afirma Pychyl. Além de
22 comportamentos nocivos como perfeccionismo, pessimismo, autocrítica ou automutilação,
23 acrescenta Heriot-Maitland. O estresse é um dos fatores que pode ativar o mecanismo de
24 autossabotagem e aprender a lidar melhor com as emoções pode contribuir com a saúde mental.
25 O que leva à autossabotagem? Provavelmente ..... uma profusão de causas, e mais
26 pesquisas são necessárias para compreendê-la completamente, afirma Philip Jean-Richard Dit
27 Bressel, professor da Universidade de Nova Gales do Sul, na Austrália, que se debruça sobre a
28 psicobiologia da tomada de decisões e do comportamento.
29 Um mecanismo fundamental é a resposta de luta ou fuga, ou resposta ao estresse, explica
30 Pychyl. De uma perspectiva evolutiva, a resposta foi projetada para proteger o indivíduo de
31 ameaças que representavam risco de morte para os primeiros humanos. Ameaças modernas,
32 como prazos ou críticas, ainda podem ativar essa resposta, mesmo que não sejam fisicamente
33 perigosas, acrescenta Pychyl.
34 Quando isso acontece, as pessoas podem recorrer a comportamentos que reduzem o
35 desconforto ou proporcionam uma sensação de segurança momentânea, como ignorar prazos,
36 tomar decisões precipitadas ou ser autocríticas, mesmo quando essas escolhas frequentemente
37 geram consequências, afirma Heriot-Maitland. Dessa forma, a autossabotagem se torna um
38 mecanismo de autoproteção. Além disso, sob estresse, a atividade no córtex pré-frontal do
39 cérebro — responsável pelo planejamento e autocontrole — pode ser reduzida, dificultando a
40 supressão dos impulsos de evitação gerados pela amígdala.
41 A autossabotagem também pode ser aprendida e se tornar um hábito. As experiências da
42 infância podem ser importantes. Algumas pesquisas sugerem que pessoas que sofreram
43 negligência emocional por parte dos pais ou que tiveram pais emocionalmente imaturos podem
44 ser mais propensas ..... autossabotagem.
45 O medo do fracasso é outro fator comum, afirma Hal Hershfield, da Universidade da
46 Califórnia: “Ironicamente, o medo de fracassar me impede de fazer algo, e então acabo
47 fracassando”. As pessoas também tendem a ____________ o presente e desconsiderar o futuro,
48 o que leva à procrastinação, diz Hershfield. Muitas pessoas também “simplesmente ___ muita
49 dificuldade em associar ações a resultados”, acrescenta Jean-Richard Dit Bressel.','Polícia Penal do Estado do Rio Grande do Sul',2026,'FUNDATEC','Caderno de prova objetiva PP-RS 2026 (Fundatec, cargo 24 - Policial Penal), https://www.fundatec.org.br/home/portal/concursos/provas/1092.024_Policial_Penal_NS_DM_POS-PRELO.PDF' where not exists (select 1 from public.question_support_texts where label='Texto — Saiba como evitar a autossabotagem, Erica Sweeney (itens 1 a 20)');
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Texto — Saiba como evitar a autossabotagem, Erica Sweeney (itens 1 a 20)' limit 1) where contest_name='Polícia Penal do Estado do Rio Grande do Sul' and career_name='Policial Penal' and exam_year=2026 and item_number in (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
commit;
