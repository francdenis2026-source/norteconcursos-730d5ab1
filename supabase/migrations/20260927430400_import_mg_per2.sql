-- Importação das provas objetivas da FGV (PC-SC 2024 e PC-MG 2025). Gerado por scripts/review/import_fgv.py.

-- Polícia Civil de Minas Gerais – Perito Criminal – Área II (2025): 80 itens extraídos, 80 no gabarito; sem gabarito: []; gabarito além dos itens: []

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro',$q$Prova objetiva (Tipo 1) – Polícia Civil de Minas Gerais – Perito Criminal – Área II (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$,'vigente',$q$Caderno oficial aplicado em 26/01/2025; publicado pela banca.$q$),
('outro',$q$Gabarito oficial definitivo (Tipo 1) – Polícia Civil de Minas Gerais – Perito Criminal – Área II (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$,'vigente',$q$Gabarito definitivo publicado pela banca; * = questão anulada.$q$)
on conflict (url) do update set checked_at=now(), status=excluded.status;
-- @@

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select $q$Polícia Civil de Minas Gerais$q$,$q$Perito Criminal – Área II$q$,2025,$q$FGV$q$,id,'active' from public.content_sources where url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id;
-- @@

insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select ed.id,$q$Histórico 2025$q$,v.d,v.o,$q$Conteúdo cobrado na prova de 2025 (levantado do caderno); edital a cotejar antes de qualquer publicação.$q$,'under_review'
from (select id from public.syllabus_editions where contest_name=$q$Polícia Civil de Minas Gerais$q$ and role_name=$q$Perito Criminal – Área II$q$ and contest_year=2025) ed cross join (values ($q$Língua Portuguesa$q$,1),($q$Raciocínio Lógico-Matemático$q$,2),($q$Informática Básica$q$,3),($q$Lei Orgânica da PCMG$q$,4),($q$Direito Constitucional / Direitos Humanos$q$,5),($q$Noções de Direito Penal, Processual Penal e Legislação Extravagante$q$,6),($q$Noções de Medicina Legal$q$,7),($q$Noções de Criminalística$q$,8),($q$Biologia$q$,9),($q$Física$q$,10),($q$Informática$q$,11)) v(d,o)
on conflict (edition_id,discipline,topic_order) do nothing;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (1,$q$Língua Portuguesa$q$,$q$Analise o cartaz a seguir. Assinale a opção que se mostra adequada aos termos e às imagens do cartaz acima.
(A) A data mostrada indica a motivação do cartaz.
(B) As formas de imperativo indicam ordens ao leitor.
(C) A mensagem, pela posição do globo, se dirige exclusivamente ao Brasil.
(D) A gota de água caindo mostra a primeira consequência de abrir-se a torneira.
(E) O homem sobre a torneira a está abrindo para que a água mostre sua serventia.$q$,$q$A$q$,3,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(2,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta a frase que se insere entre os textos de tipo argumentativo.
(A) Após a vitória, afie sua faca!
(B) Amigo, oculta a tua vida e propaga teu espírito.
(C) Goste de quem o aconselhe e não de quem o elogie.
(D) Não se deve imitar somente um, ainda que seja o mais sábio.
(E) O que busco, antes de mais nada, é a grandeza: o que é grande sempre é belo.$q$,$q$E$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(3,$q$Língua Portuguesa$q$,$q$As opções a seguir apresentam cinco formas diferentes de redigir o mesmo período. Assinale a opção em que a forma indicada corresponde ao período de melhor redação, considerando correção, clareza, concisão e elegância.
(A) Sem a companhia dos tolos, ficaria sempre muito desajeitado um homem de espírito.
(B) Um homem de espírito ficaria sempre muito desajeitado sem a companhia dos tolos.
(C) Sem a companhia dos tolos um homem de espírito ficaria sempre muito desajeitado.
(D) Um homem de espírito, sem a companhia dos tolos, ficaria muito desajeitado sempre.
(E) Ficaria sempre muito desajeitado, um homem de espírito, sem a companhia dos tolos.$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(4,$q$Língua Portuguesa$q$,$q$Um dos problemas mais graves da escrita é a presença de ambiguidades. Assinale a opção que mostra a frase que não apresenta esse tipo de problema.
(A) A professora disse que expulsou o aluno errado.
(B) Conheço um jogador do futebol inglês.
(C) O atleta enjoado participou do jogo.
(D) Deixou desarrumada a sala.
(E) Comprou o carro rápido.$q$,$q$D$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(5,$q$Língua Portuguesa$q$,$q$As frases a seguir mostram a presença de vírgulas. Assinale aquela em que a justificativa para essa presença se mostra adequada.
(A) Tiradentes, nosso herói, deu nome a uma cidade. / separar elemento anteposto.
(B) Ministro, temos reunião marcada. / presença de aposto.
(C) A juventude tem vantagens, claro! / separar elementos externos inseridos na frase.
(D) Rio de Janeiro, 1º de dezembro de 2024. / separar o vocativo.
(E) Ele é flamenguista e eu, vascaíno. / isolar termos explicativos.$q$,$q$C$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(6,$q$Língua Portuguesa$q$,$q$Todas as frases a seguir mostram dois termos sublinhados que podem ser empregados na frase. Assinale a opção em que o primeiro termo é o mais adequado.
(A) Marta não quis que existisse / ocorresse qualquer desentendimento com o noivo.
(B) O posto de líder, que me deram, foi uma oferta / oferenda generosa.
(C) O ministro bolou / imaginou toda essa estratégia política para a reunião de cúpula.
(D) Senti a necessidade de, na reunião, sustentar- me / permanecer calada.
(E) Teria ele misturado / confundido os dois processos?$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(7,$q$Língua Portuguesa$q$,$q$Assinale a opção que indica a frase em que houve a troca indevida entre as expressões ao pé, a pé, de pé e em pé.
(A) Minha casa está ao pé da serra.
(B) Nada ficou em pé após o terremoto.
(C) Os funcionários puseram-se de pé com a presença do chefe.
(D) Preferiu caminhar a pé em vez de pegar um táxi.
(E) Ajoelhou-se a pé da imagem da santa.$q$,$q$E$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(8,$q$Língua Portuguesa$q$,$q$Os pronomes de tratamento mostram diferentes formas e direcionamentos. Assinale a opção em que o tratamento indicado mostra corretamente a quem ele se dirige.
(A) Vossa Santidade / santos.
(B) Vossa Reverência / ministros.
(C) Vossa Alteza / autoridades em geral.
(D) Vossa Senhoria / pessoas íntimas.
(E) Vossa Excelência / altas autoridades.$q$,$q$E$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (9,$q$Língua Portuguesa$q$,$q$Na produção de textos, devemos ter cuidado com o emprego do gerúndio. Assinale a opção que indica a frase em que ele está bem empregado.
(A) Fumando, entrou na sala.
(B) Arrastando os pés, sentou-se.
(C) Levantou-se, dirigindo-se à saída.
(D) Ficou quieto, reclamando após meia hora.
(E) Entrou no teatro, sentando-se na primeira fila.$q$,$q$A$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(10,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta a frase que mostra uma oração concessiva.
(A) A fantasia não tem limites, ainda que a arte os tenha.
(B) Não devemos nunca nos acostumar com a vida, pois isso seria a morte.
(C) Uma forma de expressão estabelecida é também uma forma de opressão.
(D) É muito mais fácil perdoar um inimigo depois que acertamos as contas com ele.
(E) Quanto mais tempo discutimos, tanto mais longe nos achamos do fim da discussão.$q$,$q$A$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(11,$q$Raciocínio Lógico-Matemático$q$,$q$Uma lei penal fictícia estabelece o seguinte: É crime praticar qualquer ato que gere dano a outra pessoa e ocorra de forma premeditada ou com intenção de lucro. Com base no que é estabelecido textualmente por esta lei e de acordo com os fundamentos da lógica proposicional, é correto concluir que
(A) um indivíduo que aja premeditadamente e cause dano a outra sem intenção de lucro comete crime.
(B) um indivíduo que cause a outrem dano não premeditado e sem intenção de lucro não poderá ser criminalizado.
(C) um indivíduo que cause a outrem dano não premeditado e sem intenção de lucro deverá ser criminalizado.
(D) apenas atos premeditados e que gerem lucro são considerados crime.
(E) não há crime se o dano causado a outrem não gerar lucro, independentemente de premeditação.$q$,$q$A$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(12,$q$Raciocínio Lógico-Matemático$q$,$q$Um perito criminal precisa analisar um conjunto de quatro amostras coletadas de uma cena de crime. As amostras incluem os seguintes itens distintos: • cinco fibras de tecido; • três fios de cabelo; • dois fragmentos de vidro; e • uma amostra de solo. Para realizar a análise, ele precisa escolher exatamente três itens entre as amostras, mas cada item deve pertencer a uma amostra diferente. O número total de diferentes trios de itens que o perito pode escolher é
(A) 59.
(B) 60.
(C) 61.
(D) 62.
(E) 63.$q$,$q$C$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(13,$q$Raciocínio Lógico-Matemático$q$,$q$Durante as investigações de um sinistro, foram obtidos exatos 20 minutos e 15 segundos contínuos de gravação de uma câmera de segurança. Por um dano na câmera, ao longo de toda a gravação, alternam-se 2 minutos de imagens nítidas com períodos variáveis de imagens sem qualquer nitidez. O primeiro trecho sem nitidez dura 1 segundo e cada um dos demais dura o dobro do tempo do trecho defeituoso precedente. Dessa forma, nos primeiros minutos da gravação, vê-se, nessa ordem: 2 minutos de imagens nítidas, seguidos de 1 segundo de imagens sem nitidez, seguido de 2 minutos de imagens nítidas, seguidos de 2 segundos de imagens sem nitidez, seguidos de 2 minutos de imagens nítidas, seguidos de 4 segundos de imagens sem nitidez. Com base nessas informações, é correto concluir que o tempo total de imagens sem nitidez nessa gravação é de exatamente
(A) 4 minutos.
(B) 4 minutos e 3 segundos.
(C) 4 minutos e 7 segundos.
(D) 4 minutos e 15 segundos.
(E) 5 minutos e 31 segundos.$q$,$q$D$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(14,$q$Raciocínio Lógico-Matemático$q$,$q$Um perito criminal está analisando dados sobre a criminalidade em cinco áreas diferentes de uma cidade. Tais dados são apresentados na tabela a seguir: Área Crimes registrados População 1 20 10.000 2 15 8.000 3 25 12.000 4 30 18.000 5 10 4.000 A área que apresenta a maior taxa de criminalidade por 1.000 habitantes é a de número
(A) 1.
(B) 2.
(C) 3.
(D) 4.
(E) 5.$q$,$q$E$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(15,$q$Raciocínio Lógico-Matemático$q$,$q$No centro de uma sala retangular com 40 m2 de área, foi instalado um dispositivo de emissão de ondas curtas com alcance circular de 2,5 metros de raio. O dispositivo foi escolhido de modo que seu alcance fosse máximo, sem extrapolar a região delimitada pelas paredes dessa sala. O perímetro dessa sala é
(A) 21,0 m.
(B) 26,0 m.
(C) 27,5 m.
(D) 28,5 m.
(E) 37,0 m.$q$,$q$B$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(16,$q$Raciocínio Lógico-Matemático$q$,$q$Em uma operação policial, exatos quatro pacotes foram apreendidos por conterem substâncias ilegais. Esses pacotes e as suas respectivas massas são: • Pacote A: 300 g • Pacote B: 450 g • Pacote C: 350 g • Pacote D: 480 g Dois dos pacotes continham apenas a substância ilícita 𝑆1 e os demais, apenas a substância ilícita 𝑆2. Os pacotes que continham a substância 𝑆1, juntos, totalizaram 20 gramas a menos do que a massa total dos outros dois pacotes. Nos pacotes A e B, a quantidade de substância ilícita correspondeu a 60% das massas dos respectivos pacotes. Nos pacotes C e D, a quantidade de substância ilícita correspondeu a 40% das massas dos respectivos pacotes. Pode-se concluir corretamente que, nessa operação, a quantidade apreendida de substância 𝑆1, quando comparada à quantidade apreendida de substância 𝑆2, foi
(A) 38 gramas inferior.
(B) 38 gramas superior.
(C) igual.
(D) 148 gramas inferior.
(E) 149 gramas superior.$q$,$q$A$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (17,$q$Raciocínio Lógico-Matemático$q$,$q$Um perito criminal está analisando a dispersão de uma substância química em solução líquida após o vazamento em um tanque. Devido à variação de pressão no interior do tanque, a solução foi projetada a diferentes distâncias. Dessa forma, a quantidade de substância encontrada pelo perito no local do sinistro é inversamente proporcional à distância em relação ao ponto de origem do vazamento. A 50 cm do ponto de origem do vazamento, havia 180 g da substância química. A diferença entre as quantidades encontradas dessa substância a 1,5 m e a 2,0 m de distância da origem do vazamento é de
(A) 10 g.
(B) 15 g.
(C) 75 g.
(D) 150 g.
(E) 180 g.$q$,$q$B$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(18,$q$Raciocínio Lógico-Matemático$q$,$q$Um perito criminal investiga marcas de frenagem em uma estrada após uma série de acidentes em um mesmo trecho. As distâncias das marcas de frenagem (em metros) foram medidas em relação ao ponto de colisão, obtendo-se os seguintes valores, que foram registrados pelo perito: 19 – 22 – 20 – 18 – 23 – 30 – 22 – 18 – 21 – 19 – 24 – 18 – 21 – 20 Escrevendo-se essa lista em ordem crescente, pode-se dividi-la em dois grupos de sete valores. Em cada um desses grupos, haverá um termo central, denominado quartil. O quartil do grupo formado pelos menores valores é representado por 𝑄1, enquanto o quartil do outro grupo é representado por 𝑄3. Em um conjunto de dados, valores fora do padrão são ditos outliers. São considerados outliers os valores maiores que 𝑄3 + 1,5 × (𝑄3 −𝑄1) e os menores que 𝑄1 −1,5 × (𝑄3 −𝑄1). Com base nessas informações, pode-se afirmar, corretamente, que o conjunto de distâncias registradas pelo perito
(A) não possui outlier.
(B) possui um único outlier, sendo esse maior do que 𝑄3.
(C) possui um único outlier, sendo esse menor do que 𝑄1.
(D) possui dois únicos outliers, sendo ambos maiores do que 𝑄3.
(E) possui dois únicos outliers, sendo um deles maior do que 𝑄3 e o outro menor do que 𝑄1.$q$,$q$B$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(19,$q$Raciocínio Lógico-Matemático$q$,$q$Um perito criminal está investigando o furto, sem arrombamento, do conteúdo em um cofre que bloqueia automaticamente a sua abertura após três tentativas incorretas e consecutivas de se digitar a senha. A perícia indica que o suspeito tinha um conjunto de 10 sequências possíveis de dígitos no momento do sinistro, sendo apenas uma a senha correta. O perito supõe que o suspeito não tinha qualquer preferência entre as sequências que detinha e, por essa razão, todas teriam a mesma probabilidade de serem escolhidas. Com base nessas informações e sabendo-se que uma sequência, uma vez utilizada, foi descartada de novas escolhas, antes de o suspeito fazer qualquer tentativa, a probabilidade de ele conseguir abrir o cofre, antes do bloqueio, por meio da senha correta era
(A) 8,1%.
(B) 25,0%.
(C) 27,1%.
(D) 30,0%.
(E) 32,1%.$q$,$q$D$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(20,$q$Raciocínio Lógico-Matemático$q$,$q$Um crime financeiro foi cometido em uma empresa, e o perito criminal precisa determinar se o gerente participou do desvio de verba. Os seguintes fatos foram apurados: • Se o gerente tivesse aprovado a transação suspeita, então ela deveria ter sido registrada no sistema até o dia 15. • A transação não foi registrada no sistema até o dia 15. • Se a transação não foi registrada no sistema até o dia 15, então o gerente não a aprovou. Com base nessas informações, o perito pode concluir corretamente que
(A) o gerente aprovou a transação suspeita, mas alguém falhou em registrá-la.
(B) a transação suspeita foi registrada após o dia 15.
(C) não é possível determinar se o gerente aprovou a transação.
(D) o gerente não aprovou a transação suspeita, mas alguém a registrou em alguma data posterior ao dia 15.
(E) o gerente não aprovou a transação suspeita.$q$,$q$E$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(21,$q$Informática Básica$q$,$q$No sistema operacional Linux, a estrutura de diretórios segue o padrão do Filesystem Hierarchy Standard (FHS), que organiza os arquivos e diretórios de forma hierárquica. Assinale a opção que indica corretamente a finalidade do diretório /var.
(A) Armazenar os arquivos de configuração estática do sistema e serviços, como o arquivo fstab.
(B) Conter os arquivos essenciais do sistema necessários para o boot, como o kernel e os inicializadores.
(C) Armazenar arquivos de dados variáveis, como logs do sistema e arquivos temporários de serviços.
(D) Servir como local para bibliotecas compartilhadas usadas por binários em /usr e /bin.
(E) Conter os arquivos e dados pessoais dos usuários, organizados por nome de usuário.$q$,$q$C$q$,6,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(22,$q$Informática Básica$q$,$q$No sistema Linux, as permissões de arquivos são controladas por bits associados ao proprietário, grupo e outros usuários. Considere que um arquivo possui as seguintes permissões: -rwxr-xr— Assinale a opção que descreve corretamente os níveis de acesso atribuídos a diferentes categorias de usuários para este arquivo.
(A) O proprietário pode executar e modificar o arquivo, enquanto o grupo tem permissão apenas para ler.
(B) O grupo tem permissão para executar o arquivo, mas não pode modificá-lo ou lê-lo.
(C) Outros usuários têm permissão de leitura, mas não podem executar ou modificar o arquivo.
(D) O proprietário, grupo e outros usuários podem executar o arquivo, mas apenas o proprietário pode modificá-lo.
(E) Todos os usuários têm permissão total de leitura, escrita e execução para este arquivo.$q$,$q$X$q$,6,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(23,$q$Informática Básica$q$,$q$No contexto das redes de computadores, considere as funções dos dispositivos de interconexão a seguir: hubs, repetidores, bridges e comutadores (switches). Assinale a opção que descreve corretamente o papel de um switch em comparação aos demais dispositivos.
(A) Um switch opera na camada física (camada 1) e retransmite sinais elétricos para todos os dispositivos conectados.
(B) Um switch segmenta a rede em domínios de broadcast, restringindo o tráfego de pacotes.
(C) Um switch opera na camada de enlace (camada 2), encaminhando quadros para destinos específicos com base em endereços MAC.
(D) Um switch replica pacotes para todos os dispositivos da rede, independentemente do destino, como faz um hub.
(E) Um switch só pode interconectar dois segmentos de rede, como faz uma bridge, mas com menor eficiência.$q$,$q$C$q$,6,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(24,$q$Informática Básica$q$,$q$De acordo com o Marco Civil da Internet (Lei nº 12.965/2014), assinale a alternativa que indica o princípio fundamental que orienta a neutralidade da rede.
(A) Garantir que os provedores de conexão priorizem serviços de maior demanda para melhorar a experiência do usuário.
(B) Assegurar que os provedores de conexão tratem todos os pacotes de dados da mesma forma, sem discriminação por conteúdo, origem ou destino.
(C) Permitir que os provedores bloqueiem ou restrinjam conteúdos considerados prejudiciais ou ilegais, sem necessidade de ordem judicial.
(D) Priorizar o tráfego de dados relacionado a serviços essenciais, como saúde e segurança pública, em detrimento de outros.
(E) Autorizar os provedores a ajustar velocidades de conexão com base nos planos contratados pelos usuários, mesmo que isso comprometa a neutralidade da rede.$q$,$q$B$q$,6,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (25,$q$Informática Básica$q$,$q$As Diretrizes para Distribuições de Sistemas Livres (GNU FSDG) estabelecem requisitos para que uma distribuição de software seja considerada livre. Assinale a opção que descreve corretamente uma das obrigações fundamentais dessas diretrizes.
(A) Incluir qualquer software proprietário que seja amplamente utilizado, desde que possua relevância prática para os usuários.
(B) Garantir que todo software distribuído seja compatível com licenças permissivas, como as licenças BSD.
(C) Evitar a inclusão de softwares que recomendem, sugiram ou facilitem a instalação de programas não livres.
(D) Permitir que os usuários modifiquem o sistema apenas para uso pessoal, sem redistribuição.
(E) Assegurar que apenas softwares que exigem assinatura digital do autor original sejam aceitos na distribuição.$q$,$q$C$q$,6,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(26,$q$Lei Orgânica da PCMG$q$,$q$De acordo com a Lei Complementar Estadual nº 129/2013, o policial civil, no período do estágio probatório, será avaliado por comissão de acompanhamento e avaliação especial de desempenho, composta por policiais civis estáveis, instituída por ato do Chefe da PCMG. De acordo com a narrativa e considerando as disposições da Lei Complementar Estadual nº 129/2013, avalie as afirmativas a seguir. I. Em se tratando de perito criminal em estágio probatório, a comissão de acompanhamento e avaliação especial de desempenho será composta por um Delegado de Polícia da Corregedoria-Geral de Polícia Civil, por um Delegado de Polícia da Superintendência de Investigação e Polícia Judiciária e por um Delegado de Polícia da Academia de Polícia Civil. II. O Corregedor-Geral de Polícia Civil poderá, a qualquer tempo do estágio probatório, de ofício ou mediante provocação, impugnar, fundamentadamente, a permanência do policial civil no cargo efetivo de carreira para o qual foi nomeado. III. Ao Conselho Superior da PCMG compete o ato declaratório de estabilidade, no qual constará a nova condição do policial civil para o desenvolvimento na carreira. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$B$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(27,$q$Lei Orgânica da PCMG$q$,$q$O Corregedor-Geral de Polícia Civil ministrou, na Academia de Polícia, uma palestra aos novos peritos criminais, tendo como objeto as possíveis penalidades aplicáveis aos servidores da Polícia Civil do Estado de Minas Gerais. Nesse cenário, considerando as disposições da Lei Estadual nº 5.406/1969, assinale a afirmativa correta.
(A) A pena de suspensão poderá ser convertida em multa pela autoridade que a aplicou, na base de 30% por dia de vencimento ou remuneração, sendo o servidor, nesse caso, obrigado a permanecer em serviço.
(B) A pena de repreensão será aplicada oralmente e, em princípio, corresponderá às faltas de cumprimento de deveres e às transgressões consideradas de natureza leve ou média.
(C) As faltas de cumprimento de deveres, havendo dolo ou má-fé, serão punidas com a pena de demissão a bem do serviço público.
(D) A pena de suspensão, que não exceder 60 dias, será aplicada no caso da falta grave ou de reincidência.
(E) O servidor policial suspenso perderá todas as vantagens e todos os direitos decorrentes do exercício do cargo.$q$,$q$E$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(28,$q$Lei Orgânica da PCMG$q$,$q$Lucas, Chefe da Polícia Civil do Estado de Minas Gerais, afastou-se, temporariamente, do exercício de suas funções, em observância às formalidades legais. Considerando as disposições da Lei Complementar Estadual nº 129/2013, assinale a opção que indica quem o substituirá.
(A) O Chefe Adjunto da Polícia Civil.
(B) O Diretor da Academia de Polícia.
(C) O Corregedor-Geral de Polícia Civil.
(D) O Chefe de Gabinete da Polícia Civil.
(E) O Superintendente de Investigação e Polícia Judiciária.$q$,$q$A$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(29,$q$Lei Orgânica da PCMG$q$,$q$Após ser aprovado no concurso público para integrar os quadros da Polícia Civil do Estado de Minas Gerais, Matheus resolveu analisar a legislação a que estará submetido após ser empossado no cargo público almejado, em especial os princípios básicos da disciplina policial. As opções a seguir apresentam, segundo a Lei Estadual nº 5.406/1969, os princípios básicos da disciplina policial, à exceção de uma. Assinale-a.
(A) O espírito de camaradagem e de cooperação, salvo quando de folga o servidor policial.
(B) O atendimento ao público em geral de acordo com as normas de urbanidade e sem preferências.
(C) A observância das condições e das normas necessárias para a boa execução das atividades policiais.
(D) A cooperação e o respeito às autoridades de corporações policiais diversas e de outros poderes ou secretarias de Estado.
(E) A apuração ou a comunicação à autoridade competente, pela via hierárquica respectiva, da prática de transgressão disciplinar.$q$,$q$A$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(30,$q$Lei Orgânica da PCMG$q$,$q$Bruno, médico-legista, Lucas, perito criminal, Antônio, investigador de polícia e João, escrivão de polícia, conversaram, durante um curso obrigatório na Academia de Polícia, sobre a hierarquia existente na Polícia Civil do Estado de Minas Gerais. De acordo com a narrativa, considerando as disposições da Lei Complementar Estadual nº 129/2013, avalie as afirmativas a seguir: I. Bruno e Lucas, que estão em posição de igualdade, são hierarquicamente superiores a Antônio e João. II. Não há subordinação hierárquica entre Bruno, Lucas, Antônio e João. III. Bruno é hierarquicamente superior a Lucas, Antônio e João. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e II, apenas.
(E) I, II e III.$q$,$q$B$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(31,$q$Direito Constitucional / Direitos Humanos$q$,$q$O Estado Alfa, no exercício da competência legislativa concorrente em matéria de integração de pessoas com determinada espécie de deficiência, editou a Lei Estadual nº X. Em momento posterior, a União, que ainda não tinha legislado sobre essa matéria em particular, editou a Lei Federal nº Y, estabelecendo normas gerais a respeito da temática em sentido diametralmente oposto ao da referida lei estadual. Considerando a situação descrita, é correto afirmar que
(A) a Lei Estadual nº X foi revogada.
(B) a eficácia da Lei Estadual nº X está suspensa.
(C) a Lei Estadual nº X continuará a ser aplicada pelo período indicado na Lei Federal nº Y.
(D) a Lei Estadual nº X, em razão do princípio da especialidade, continuará a ser aplicada em Alfa.
(E) a Lei Estadual nº X continuará a ser aplicada nos 12 meses subsequentes à entrada em vigor da Lei Federal nº Y.$q$,$q$B$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(32,$q$Direito Constitucional / Direitos Humanos$q$,$q$Ana compareceu a determinada repartição pública estadual e requereu a expedição de certidão, visando à defesa de uma situação de interesse pessoal, o que foi devidamente esclarecido em seu requerimento. A autoridade competente, em seu despacho inaugural, determinou que Ana providenciasse a juntada aos autos do comprovante de recolhimento da taxa de expediente, o que possibilitaria a análise do seu requerimento. Antes de realizar o recolhimento da taxa, Ana analisou a Constituição da República, tendo concluído, corretamente, que a referida exigência é
(A) inconstitucional, pois o requerimento deve ser atendido de forma gratuita.
(B) constitucional, salvo se Ana for hipossuficiente, o que deve ser objeto de comprovação.
(C) constitucional, pois será realizada uma atividade estatal em prol do interesse exclusivo de Ana.
(D) inconstitucional, pois é vedada a cobrança pelo exercício dos direitos individuais de natureza constitucional.
(E) constitucional, considerando que o princípio da solidariedade exige o pagamento pelo exercício dos direitos individuais, de modo a não sobrecarregar a coletividade.$q$,$q$A$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (33,$q$Direito Constitucional / Direitos Humanos$q$,$q$Em razão de uma grande enchente que assolou determinada região do país, o que caracterizou grave ameaça à paz social no território atingido, o Presidente da República reuniu seus assessores diretos com o objetivo de verificar a medida passível de ser adotada para restabelecer a normalidade e em cuja vigência fosse admitida a restrição aos direitos individuais referidos na ordem constitucional. Considerando os balizamentos constitucionais, é correto afirmar que pode ser decretado
(A) o estado de sítio.
(B) o estado de defesa.
(C) a intervenção federal.
(D) o estado de emergência.
(E) o estado de calamidade pública.$q$,$q$B$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(34,$q$Direito Constitucional / Direitos Humanos$q$,$q$O Brasil iniciou, nos anos 1990, um movimento de ratificação de diversos tratados internacionais de direitos humanos, alinhado com o propósito de fortalecimento da democracia recém- conquistada. Nesse contexto, assinale a afirmativa correta.
(A) As medidas de prevenção e combate à tortura são relativas, uma vez que a adoção do protocolo de Istambul é facultativa pelo Estado brasileiro.
(B) Os tratados e as convenções internacionais sobre direitos humanos podem ser equivalentes às emendas constitucionais, caso sejam aprovados por um quórum qualificado em cada casa do Congresso Nacional.
(C) A Declaração Universal dos Direitos Humanos tem natureza supralegal, de acordo com decisão do Supremo Tribunal Federal (STF), pois é a norma jurídica que orienta a interpretação das outras convenções.
(D) A sentença condenatória do Caso Favela Nova Brasília não pode ser executada no Brasil, tendo em vista que os casos julgados aconteceram em momento anterior à ratificação da Convenção Americana sobre Direitos Humanos.
(E) O STF reconheceu a natureza constitucional das convenções internacionais de direitos humanos, tendo em vista o disposto no Art. 5º, § 2º da CRFB/88.$q$,$q$B$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(35,$q$Direito Constitucional / Direitos Humanos$q$,$q$A promoção e a garantia de direitos dos grupos vulneráveis tiveram avanços normativos no sistema jurídico brasileiro, além de importantes julgados proferidos pelo STF. Sobre o tema, avalie as afirmativas a seguir. I. O STF reconheceu os crimes de homofobia e transfobia, os quais devem ser enquadrados como crimes de racismo. II. O crime de racismo, equiparado ao crime de injúria racial, são crimes inafiançáveis e imprescritíveis. III. O atendimento policial e pericial especializado à mulher em situação de violência doméstica serão realizados, exclusivamente, por servidor do sexo feminino. Está correto o que se afirma em
(A) II, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$B$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(36,$q$Noções de Direito Penal, Processual Penal e Legislação Extravagante$q$,$q$Matheus, perito criminal, compareceu ao local de determinada infração penal perpetrada no Município de Santa Luzia/MG. Durante a realização dos trabalhos técnicos, João, particular, ofereceu R$ 5 mil para que o referido agente público descartasse todos os vestígios que pudessem incriminar um conhecido. Matheus, imediatamente, recusou a proposta, prendendo João em flagrante. Considerando as disposições do Código Penal sobre o crime praticado, ele responderá por
(A) peculato consumado, na modalidade simples.
(B) corrupção passiva tentada, na modalidade simples.
(C) corrupção ativa tentada, na modalidade qualificada.
(D) corrupção ativa consumada, na modalidade simples.
(E) corrupção passiva consumada, na modalidade qualificada.$q$,$q$D$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(37,$q$Noções de Direito Penal, Processual Penal e Legislação Extravagante$q$,$q$Bruno, residente e domiciliado em Belo Horizonte/MG, é proprietário de um pequeno estabelecimento especializado na compra e venda de bens móveis de natureza eletrônica. Nesse contexto, em certa ocasião, Bruno expôs à venda, em proveito próprio, no exercício de atividade comercial, um telefone celular que deveria saber ser produto de crime. Considerando as disposições do Código Penal, é correto afirmar que Bruno responderá pelo crime de
(A) apropriação indébita, na modalidade qualificada.
(B) fraude no comércio, na modalidade qualificada.
(C) receptação, na modalidade qualificada.
(D) estelionato, na modalidade simples.
(E) furto, na modalidade qualificada.$q$,$q$C$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(38,$q$Noções de Direito Penal, Processual Penal e Legislação Extravagante$q$,$q$João, primário e portador de bons antecedentes, foi capturado em flagrante pela prática do crime de tráfico de drogas, sendo certo que houve a arrecadação de 60 pinos de cocaína, totalizando 50 gramas da referida substância ilícita. Sendo assim, João foi encaminhado à Delegacia de Polícia de plantão para a adoção das medidas legais cabíveis. Nesse cenário, considerando as disposições do Código de Processo Penal, é correto afirmar que o Delegado de Polícia
(A) poderá conceder fiança a João, desde que o submeta, cumulativamente, a outras medidas cautelares de natureza diversa da prisão.
(B) não poderá conceder fiança a João, já que ele foi capturado em flagrante pela prática do crime de tráfico de drogas.
(C) não poderá conceder fiança a João, por se tratar de instituto sujeito, em qualquer caso, à reserva de jurisdição.
(D) poderá conceder fiança a João, em razão da arrecadação de reduzida quantidade de material entorpecente.
(E) poderá conceder fiança a João, por se tratar de capturado primário e portador de bons antecedentes.$q$,$q$B$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(39,$q$Noções de Direito Penal, Processual Penal e Legislação Extravagante$q$,$q$Após representação realizada pela autoridade policial titular da Delegacia Especializada de Homicídios de Santa Luzia/MG, ratificada pelo Ministério Público, o Juiz competente expediu mandado de busca e apreensão, a ser cumprido no endereço residencial de Túlio. De acordo com a narrativa, considerando as disposições do Código de Processo Penal, avalie as afirmativas a seguir. I. A busca domiciliar será executada de dia, salvo se o morador consentir que se realize à noite, e, antes de penetrarem na casa, os executores mostrarão e lerão o mandado ao morador, ou a quem o represente, intimando-o, em seguida, a abrir a porta. II. Recalcitrando o morador, será permitido o emprego de força contra coisas existentes no interior da casa, para o descobrimento do que se procura. III. Finda a diligência, os executores lavrarão auto circunstanciado, assinando-o, se possível, com uma testemunha presencial. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$B$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(40,$q$Noções de Direito Penal, Processual Penal e Legislação Extravagante$q$,$q$Antônio, policial civil, está atuando em complexa investigação. Em razão dos reflexos práticos para o deslinde do procedimento investigatório, Antônio resolveu analisar a legislação que trata dos crimes hediondos, cotejando-a com os delitos que teriam sido praticados pelos investigados, residentes na cidade de Nova Lima/MG. De acordo com a narrativa, considerando as disposições da Lei nº 8.072/1990, avalie as afirmativas a seguir. I. Lesão corporal dolosa de natureza grave, em razão do perigo de vida, em detrimento de um policial civil no exercício das funções. II. Roubo circunstanciado pelo emprego de arma branca. III. Posse ilegal de arma de fogo de uso proibido. Assinale a opção que indica crimes hediondos.
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$C$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (41,$q$Noções de Medicina Legal$q$,$q$Sabemos, por meio da análise do Art. 158-A do CPP, que o início da cadeia de custódia ocorre com procedimentos policiais ou periciais em que se detecte a existência de um vestígio. Sobre as etapas da cadeia de custódia, assinale a afirmativa incorreta.
(A) O isolamento é a primeira etapa, definida como ato de evitar que se altere o estado das coisas.
(B) O reconhecimento deve anteceder o isolamento e corresponde ao ato de se distinguir um elemento como sendo de potencial interesse para a produção da prova pericial.
(C) O processamento corresponde ao exame pericial propriamente dito, incluindo a confecção do laudo.
(D) A fixação corresponde à descrição completa do vestígio, incluindo a sua posição na cena do encontro.
(E) O descarte só pode acontecer ao final com autorização judicial.$q$,$q$A$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(42,$q$Noções de Medicina Legal$q$,$q$A Antropologia Forense é a ciência que auxilia na identificação de cadáveres em estado avançado de decomposição. Acerca da obtenção do perfil biológico, assinale a afirmativa correta.
(A) A extremidade esternal da quarta costela é útil na investigação do sexo do indivíduo.
(B) O osso pélvico só tem importância na determinação do sexo do indivíduo e não na idade.
(C) O estudo das suturas cranianas é considerado o método mais fidedigno para a determinação da idade do indivíduo.
(D) O desgaste da sínfise púbica é um método muito utilizado para a obtenção do intervalo de faixa etária do indivíduo.
(E) O estudo da transparência radicular dos dentes unirradiculares pode ser utilizado em qualquer fase da vida para adquirir a estimativa da idade.$q$,$q$D$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(43,$q$Noções de Medicina Legal$q$,$q$Acerca da cronotanatognose, avalie as afirmativas a seguir. I. A mancha verde abdominal marca o início da putrefação e tem início entre 8 a 12 horas após a morte. II. A fase de esqueletização termina após três meses quando o indivíduo já está totalmente esqueletizado. III. A circulação póstuma de Brouardel acontece na mesma fase em que surge a mancha verde abdominal, ou seja, na fase de coloração. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III$q$,$q$C$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(44,$q$Noções de Medicina Legal$q$,$q$As asfixias mecânicas são as que ocorrem com mais frequência. Nesse sentido, correlacione as colunas de acordo com a definição de cada tipo de asfixia. 1. Sufocação direta 2. Sufocação indireta 3. Soterramento 4. Enforcamento 5. Estrangulamento ( ) Necessita do peso do corpo para o acionamento do mecanismo de constrição. ( ) Costuma ser caracterizado por sulcos em disposição horizontal. ( ) Corresponde à obstrução das vias aéreas superiores. ( ) Há impedimento de entrada de ar por constrição da parede do tórax. ( ) Há alteração do meio ambiente podendo ocorrer obstrução de vias aéreas superiores e constrição da parede do tórax. Assinale a opção que indica a relação correta, segundo a ordem apresentada.
(A) 4 – 2 – 1 – 5 – 3.
(B) 5 – 3 – 2 – 1 – 4.
(C) 5 – 2 – 1 – 4 – 3.
(D) 4 – 5 – 1 – 2 – 3.
(E) 4 – 1 – 3 – 2 – 5.$q$,$q$D$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(45,$q$Noções de Medicina Legal$q$,$q$A balística é o ramo da Mecânica que estuda os projéteis, sendo fundamental a compreensão dos movimentos que interferem na sua aerodinâmica. Nesse sentido, associe os movimentos a seguir às respectivas definições. 1. Nutação 2. Precessão 3. Rotação 4. Translação ( ) Movimento ocasionado pela raiação do cano da arma. ( ) Movimento que corresponde ao deslocamento do projétil pelo ar, em forma parabólica. ( ) Movimento vibratório de pequena amplitude na base do projétil, durante o movimento cônico de precessão. ( ) Movimento em que é gerada uma evolução cônica de revolução do projétil na base e cujo vértice é a extremidade anterior da ogiva. Assinale a opção que indica a associação correta, na ordem apresentada.
(A) 1 – 2 – 3 – 4.
(B) 1 – 4 – 3 – 2.
(C) 2 – 3 – 1 – 4.
(D) 3 – 4 – 1 – 2.
(E) 4 – 1 – 2 – 3.$q$,$q$D$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(46,$q$Noções de Criminalística$q$,$q$Acerca da criminalística, assinale a afirmativa correta.
(A) É o conjunto de normas e princípios que define as infrações penais e as respectivas penas.
(B) Corresponde aos estudos sobre a vítima e as políticas públicas voltadas à prevenção da criminalidade sobre esse perfil social.
(C) Tem por objetivo o reconhecimento e a interpretação dos indícios materiais extrínsecos, relativos ao crime ou à identidade do criminoso.
(D) É constituída pela análise empírica e interdisciplinar dos discursos criminológicos.
(E) Estabelece as normas processuais penais e o funcionamento do sistema de justiça criminal.$q$,$q$C$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(47,$q$Noções de Criminalística$q$,$q$Analise o fragmento a seguir. Se a diligência consistir na produção de prova _____, o Juiz Presidente nomeará Perito e formulará quesitos. Assinale a opção que completa corretamente a lacuna do fragmento acima.
(A) confessional
(B) testemunhal
(C) documental
(D) pericial
(E) complementar$q$,$q$D$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(48,$q$Noções de Criminalística$q$,$q$Acerca das formas de prova e do exame de corpo de delito, assinale a afirmativa correta.
(A) Na falta de perito oficial, o exame poderá ser realizado por duas pessoas com curso superior na área específica.
(B) As provas indiretas demostram de forma precisa o que se pretende esclarecer quanto ao delito.
(C) As provas diretas são também chamadas de subjetivas, indiciárias, circunstanciais ou informativas.
(D) A realização de exame de corpo de delito é facultativa em todo crime que possui indícios.
(E) A confissão do réu pode suprir o exame de corpo de delito.$q$,$q$A$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (49,$q$Noções de Criminalística$q$,$q$Acerca do local do crime, avalie as afirmativas e assinale (V) para a verdadeira e (F) para a falsa. ( ) Local externo é aquele que não sofreu alterações, tendo sido preservado tal como foi deixado após a consumação do crime. ( ) Local inidôneo é aquele que foi mal protegido, resultando em prejuízo ao exame pericial. ( ) Local interno é o espaço coberto, podendo ter ou não sua área confinada por paredes. As afirmativas são, respectivamente,
(A) F – F – V.
(B) F – V – V.
(C) V – F – F.
(D) V – V – F.
(E) V – F – V.$q$,$q$B$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(50,$q$Noções de Criminalística$q$,$q$No que se refere ao local do crime, relacione os componentes a seguir às respectivas definições. I. Indícios II. Vestígios III. Provas ( ) Constituem o conjunto de meios idôneos que visam afirmar a existência ou não de um fato. ( ) São as circunstâncias conhecidas e provadas que permitem presumir a existência de outros fatos relacionados ao crime. ( ) São todos os objetos ou materiais brutos que se relacionam à infração penal. Assinale a opção que indica a relação correta, na ordem apresentada.
(A) I – II – III.
(B) II – I – III.
(C) III – I – II.
(D) III – II – I.
(E) II – III – I.$q$,$q$C$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(51,$q$Biologia$q$,$q$A Polícia Civil cumpriu, em 2023, mandado de busca e apreensão em um curtume em São Sebastião do Paraíso (MG). Na ocasião, foram coletadas amostras de resíduos de efluentes descartados, de forma irregular, em um córrego. A análise do material constatou que o nível do metal pesado cromo estava acima do permitido pelas normas. Com relação à situação descrita, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Suponha a cadeia alimentar junto ao córrego, formada por plantas aquáticas → caramujos → peixes. Se realizada a análise da concentração de cromo nos tecidos dos organismos, espera-se que o maior teor do metal seja encontrado em plantas aquáticas, já que elas ocupam o primeiro nível trófico. ( ) O uso de bactérias capazes de metabolizar o cromo, diminuindo sua toxicidade no ambiente, é um exemplo de biorremediação. ( ) O descarte irregular de cromo irá favorecer a proliferação de organismos produtores, o que poderá ocasionar a eutrofização do córrego. As afirmativas são, respectivamente,
(A) F – V – F.
(B) F – V – V.
(C) V – F – F.
(D) V – V – F.
(E) F – F – V.$q$,$q$A$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(52,$q$Biologia$q$,$q$O exame de material biológico encontrado em um corpo enterrado em uma cova rasa, próxima à cidade de Buenos Aires, permitiu correlacionar um potencial suspeito ao local do crime. A análise comparou a composição palinológica encontrada na cena do crime com a flora local, com as roupas da vítima e com amostras obtidas de pás e botas apreendidas na residência do suspeito. A análise palinológica é o estudo de estruturas, como
(A) os esporos, os gametas de vegetais como os fungos e as pteridófitas.
(B) os grãos de pólen, presentes em gimnospermas e angiospermas.
(C) os esporos, as células reprodutoras de bactérias e os fungos.
(D) os grãos de pólen, os gametas de pteridófitas e angiospermas.
(E) os esporos e as células bacterianas resistentes a condições adversas.$q$,$q$B$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(53,$q$Biologia$q$,$q$[Enunciado não extraído do PDF; conferir no caderno oficial.]$q$,$q$A$q$,12,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Observações: enunciado não extraído. Pode depender de figura/tabela do caderno.$q$),(54,$q$Biologia$q$,$q$Uma forma de reconhecer os vestígios deixados pelos criminosos, utilizada em larga escala e com resultados bastante satisfatórios, é o uso de moléculas presentes nas células e que são únicas para cada ser vivo: é o DNA. Em uma cena de crime foi encontrado um fio de cabelo de onde se podia extrair DNA. Existiam três suspeitos (indivíduos A, B e C), cujos DNAs foram coletados para análise. Os mesmos três loci foram analisados, comparando as amostras dos três suspeitos (A, B e C) e do DNA encontrado na cena do crime (F).Na imagem vemos os resultados em que se usou a reação em cadeia da polimerase (PCR) e a eletroforese em gel. (Adaptado de ALBERTS et al. Biologia molecular da célula. 6. ed. Porto Alegre: Artmed, 2017.) Embora pessoas diferentes possam ter várias bandas em comum, o padrão geral é bastante distinto para cada pessoa. Assim, podemos dizer que o(s) indivíduo(s) que, pelo DNA, pode(m) ser eliminado(s) da investigação é(são)
(A) O homem não é o pai, pois não há como nascer um filho Rh positivo de um casal em que ambos são Rh negativo.
(B) O homem tem 50% de chance de ser o pai, pois o genótipo dele para o sistema ABO é IBIB.
(C) O homem tem 100% de chance de ser o pai, pois o genótipo dele é IBIB Dd.
(D) O homem tem 50% de chance de ser o pai, pois o genótipo dele para o sistema ABO é IBi.
(E) O homem tem 100% de chance de ser o pai, pois o genótipo dele é IBi DD.$q$,$q$E$q$,12,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(55,$q$Biologia$q$,$q$Leia o fragmento a seguir. Uma funcionária do Instituto de Criminalística Carlos Éboli, no Rio, recorda quando foi chamada para periciar um homem enforcado. Apesar do rosto desfigurado, o corpo apresentava um estado incomum de conservação. Os legistas apostavam em uma morte recente. Ao investigar os insetos, ela percebeu o erro. As larvas mais velhas de insetos, aquelas que os peritos criminais procuram em primeiro lugar, testemunhavam uma morte ocorrida há semanas. (Adaptado de G1, 10/10/2010) Com relação aos insetos, assinale (V) para a afirmativa verdadeira e (F) para a falsa. ( ) Por causa do exoesqueleto e sua troca periódica, o crescimento dos insetos não é contínuo: há momentos sem nenhum crescimento, alternados com outros de crescimento. ( ) A metamorfose é uma característica do desenvolvimento encontrada em todos os grupos de insetos. ( ) O corpo de um inseto é dividido em três regiões: cabeça, tórax e abdome. Nesse último estão presas as asas, sendo que a maioria dos insetos possui dois pares de asas. As afirmativas são, respectivamente,
(A) F – V – V.
(B) F – V – F.
(C) V – F – V.
(D) V – F – F.
(E) F – F – V.$q$,$q$D$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(56,$q$Física$q$,$q$Uma partícula M parte do repouso com uma aceleração constante de 0,5 m/s2. Nesse mesmo instante, passa por M, uma partícula N com velocidade constante de 5 m/s e no mesmo sentido do movimento. A velocidade da partícula M, no instante que encontrar N novamente, será de
(A) 5 m/s.
(B) 10 m/s.
(C) 15 m/s.
(D) 20 m/s.
(E) 25 m/s.$q$,$q$B$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (57,$q$Física$q$,$q$O sistema mostrado na figura a seguir está em repouso. Os fios e as roldanas são ideais, todos os atritos são desprezíveis, as esferas têm massas iguais e os blocos têm massa m e m', sendo m > m`. Se o fio que prende a esfera da esquerda à roldana se romper, os blocos passarão a deslizar sobre o piso horizontal para a direita e a tensão no fio que prende um ao outro se tornará igual a T. No entanto, se o fio que prende a esfera da direita à roldana se romper, os blocos passarão a deslizar para a esquerda e a tensão no fio, que prende um ao outro, se tornará igual a T`. Essas tensões T e T` são tais que: 𝑇 𝑚 𝑇` =
(A)  𝑚` 𝑇 𝑚` 𝑇` =
(B)  𝑚 𝑇 𝑚−𝑚` 𝑇` =
(C)  𝑚+𝑚` 𝑇 𝑚+𝑚` 𝑇` =
(D)  𝑚−𝑚` 𝑇 𝑇` = 1
(E) $q$,$q$A$q$,13,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(58,$q$Física$q$,$q$Um bloco de pequenas dimensões, de massa igual a 0,25 kg, está se movendo em um trilho vertical, cujo perfil está representado na figura a seguir. Ele passa pelo ponto A do trecho horizontal do trilho com uma velocidade 𝑉⃗ de módulo igual a 4 m/s e consegue chegar, no máximo, ao ponto B a uma altura de 0,70 m. Considere g = 10 m/s2. O trabalho realizado pelos diversos atritos que se opõem ao movimento do bloco, enquanto ele se desloca de A até B, é igual a
(A) – 0,20 J.
(B) – 0,25 J.
(C) – 0,40 J.
(D) – 0,50 J.
(E) – 0,75 J.$q$,$q$B$q$,13,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(59,$q$Física$q$,$q$A figura a seguir representa as características de tensão – corrente de dois resistores R1 e R2. Para alimentá-los, dispõe-se de um gerador ideal (isto é, de resistência interna desprezível). Eles podem ser ligados ao gerador como ilustram os esquemas a seguir. Suponha desprezíveis as resistências dos fios de ligação e considere o amperímetro ideal. Quando eles estão ligados como ilustra o esquema (I), o amperímetro indica 6 A. Já quando eles estão ligados, como ilustra o esquema (II), o amperímetro indica
(A) 12 A.
(B) 14 A.
(C) 16 A.
(D) 18 A.
(E) 20 A.$q$,$q$X$q$,14,$q$annulled$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(60,$q$Física$q$,$q$Um estudante ganhou um termômetro de líquido graduado em uma escala desconhecida. Ele verificou que, quando o termômetro do laboratório marcava 280 K, o da escala desconhecida marcava -5; observou, ainda, que uma elevação de 9 K na temperatura correspondia a uma elevação de 12 graus na escala desconhecida. Esse termômetro graduado nessa escala desconhecida e um termômetro graduado na escala Celsius darão a mesma indicação quando a temperatura for
(A) – 41oC.
(B) 13oC.
(C) 43oC.
(D) 862oC.
(E) 1135oC.$q$,$q$C$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(61,$q$Informática$q$,$q$Os componentes de um computador podem ser classificados em hardware e software, com funções distintas, mas complementares. Assinale a opção que descreve corretamente a relação entre hardware e software em um sistema computacional.
(A) O hardware é responsável por executar diretamente todas as funções lógicas de um sistema, sem a necessidade de software.
(B) O software atua como intermediário entre o hardware e o usuário, traduzindo comandos para o sistema executar.
(C) O hardware controla o software, determinando quais programas podem ou não ser executados.
(D) O software consiste apenas nos aplicativos usados diretamente pelo usuário, como navegadores e editores de texto.
(E) O hardware é composto exclusivamente por dispositivos externos, como monitores, teclados e impressoras.$q$,$q$B$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(62,$q$Informática$q$,$q$Os sistemas de entrada, saída e armazenamento desempenham papéis fundamentais no funcionamento de um computador, permitindo a interação com o usuário e o processamento eficiente de dados. Assinale a opção que descreve corretamente a função de um dispositivo de armazenamento secundário.
(A) Um dispositivo de armazenamento secundário armazena temporariamente os dados necessários para o funcionamento imediato do sistema.
(B) Um dispositivo de armazenamento secundário é responsável por captar informações do usuário e transmiti-las ao processador.
(C) Um dispositivo de armazenamento secundário mantém dados de forma permanente, mesmo quando o computador é desligado.
(D) Um dispositivo de armazenamento secundário processa dados de saída para exibição em dispositivos como monitores e impressoras.
(E) Um dispositivo de armazenamento secundário é integrado exclusivamente à memória RAM para aumentar sua capacidade.$q$,$q$C$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(63,$q$Informática$q$,$q$Os principais processadores do mercado, como os desenvolvidos pelas empresas Intel e AMD, apresentam características específicas que os diferenciam em termos de desempenho, arquitetura e consumo energético. Assinale a opção que descreve corretamente uma característica comum à maioria dos processadores modernos.
(A) Processadores modernos possuem apenas núcleos físicos, pois núcleos lógicos não aumentam o desempenho real.
(B) A maioria dos processadores utiliza arquiteturas RISC, que são mais eficientes para desktops e servidores.
(C) O uso de tecnologia de litografia menor (medida em nanômetros) permite maior eficiência energética e maior densidade de transistores.
(D) Processadores modernos não suportam virtualização por padrão, sendo necessário hardware adicional para essa função.
(E) A frequência base do processador é o único fator que determina seu desempenho em todas as aplicações.$q$,$q$C$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(64,$q$Informática$q$,$q$As tecnologias de virtualização permitem executar sistemas operacionais e aplicativos de maneira isolada, utilizando recursos como emuladores, máquinas virtuais e paravirtualização. Assinale a opção que descreve corretamente uma característica específica da paravirtualização.
(A) Cria uma cópia completa de hardware físico para executar sistemas operacionais não modificados.
(B) Permite que o sistema operacional convidado seja modificado para interagir diretamente com o hipervisor, melhorando o desempenho.
(C) É mais eficiente que as máquinas virtuais, pois utiliza hardware físico sem qualquer camada intermediária.
(D) Substitui completamente a necessidade de hipervisores em sistemas operacionais modernos.
(E) É utilizada exclusivamente para emular sistemas operacionais que não foram projetados para a arquitetura do hardware subjacente.$q$,$q$B$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (65,$q$Informática$q$,$q$RAID (Redundant Array of Independent Disks) é uma tecnologia que combina vários discos para melhorar desempenho, confiabilidade ou ambos. Assinale a opção que descreve corretamente a característica principal do RAID 5.
(A) Utiliza espelhamento puro entre discos para garantir a redundância de dados, duplicando todas as informações armazenadas.
(B) Distribui os dados e a paridade entre todos os discos, permitindo a recuperação de informações em caso de falha de um único disco.
(C) É focado exclusivamente em desempenho, sem oferecer redundância ou tolerância a falhas.
(D) Requer apenas dois discos para sua implementação, mas não utiliza paridade em sua configuração.
(E) É uma configuração voltada para sistemas de armazenamento de pequeno porte, sem suporte a grandes volumes de dados.$q$,$q$B$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(66,$q$Informática$q$,$q$A Programação Orientada a Objetos (POO) é um paradigma que organiza o código em torno de objetos e classes, utilizando conceitos como herança e polimorfismo para promover reutilização e flexibilidade. Assinale a opção que descreve corretamente o conceito de polimorfismo em POO.
(A) É a capacidade de uma classe herdar os atributos e métodos de outra classe, permitindo a reutilização de código.
(B) É a capacidade de criar múltiplas classes que compartilham o mesmo nome, mas possuem implementações completamente diferentes.
(C) É a capacidade de um método ou objeto se comportar de diferentes maneiras dependendo do contexto ou do tipo do objeto.
(D) É a técnica de usar métodos com o mesmo nome, mas assinaturas diferentes, em uma mesma classe.
(E) É a técnica de restringir o acesso aos atributos de uma classe, garantindo a segurança dos dados.$q$,$q$C$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(67,$q$Informática$q$,$q$A linguagem SQL (Structured Query Language) é amplamente utilizada para gerenciar e manipular bancos de dados relacionais. Assinale a opção que representa corretamente uma consulta SQL para retornar todos os dados da tabela clientes em que a coluna cidade é igual a "São Paulo".
(A) SELECT * FROM clientes WHERE cidade LIKE 'São Paulo';
(B) SELECT * FROM clientes WHERE cidade = 'São Paulo';
(C) SELECT * FROM clientes WHERE cidade IN 'São Paulo';
(D) SELECT * FROM clientes WHERE cidade NOT IN 'São Paulo';
(E) SELECT cidade, * FROM clientes WHERE cidade = 'São Paulo';$q$,$q$B$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(68,$q$Informática$q$,$q$Considere as características fundamentais da linguagem Java e seus recursos no desenvolvimento de aplicações. Com base nos conceitos básicos de orientação a objetos, em relação ao uso de classes e objetos no Java, assinale a afirmativa correta.
(A) Em Java, uma classe pode ser instanciada apenas se tiver um construtor público ou um construtor com especificadores de acesso adequados.
(B) O modificador public impede que um método ou variável de instância seja acessado fora da sua própria classe.
(C) Uma classe semi-abstrata não pode ser instanciada diretamente, mas pode conter métodos implementados e não implementados.
(D) O conceito de polimorfismo permite que um objeto se comporte de forma diferente dependendo do tipo da referência usada para acessá-lo.
(E) O uso da palavra-chave super é utilizado para acessar membros da classe pai em classes que herdam de outra classe.$q$,$q$E$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(69,$q$Informática$q$,$q$Python possui recursos específicos que facilitam a programação, como o uso de list comprehensions. Com base nisso, assinale a opção que indica a principal vantagem do uso de list comprehension em Python em comparação com um loop for convencional para criar listas.
(A) É exclusivamente mais rápido em todas as situações, devido à sua implementação interna otimizada.
(B) Resulta sempre em uma sintaxe mais concisa e legível quando comparado a um loop for convencional.
(C) Só funciona para números inteiros, enquanto o loop for pode criar listas a partir de qualquer sequência.
(D) Impede o uso de condições nos laços, enquanto os loops for permitem maior flexibilidade.
(E) É obrigatório no Python para criar listas no caso de grandes quantidades de dados.$q$,$q$B$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(70,$q$Informática$q$,$q$Estruturas de dados são fundamentais para armazenar e organizar informações de forma eficiente em um sistema computacional. A escolha dos métodos de acesso, busca, inserção e ordenação pode impactar significativamente o desempenho do programa. Com base nisso, assinale a opção que indica o método de busca que é mais eficiente quando aplicado em uma lista ordenada contendo milhares de elementos.
(A) Busca Linear.
(B) Busca Binária.
(C) Busca Hash.
(D) Busca Sequencial.
(E) Busca por Interpolação.$q$,$q$B$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(71,$q$Informática$q$,$q$A análise da complexidade de algoritmos é essencial para avaliar seu desempenho e eficiência, especialmente em cenários com grandes volumes de dados. Assinale a opção que representa a complexidade O (n log n) mais comummente observada em algoritmos de ordenação eficientes.
(A) Algoritmos de ordenação por bolha (Bubble Sort).
(B) Algoritmos de ordenação por seleção (Selection Sort).
(C) Algoritmos de ordenação rápida (QuickSort).
(D) Algoritmos de ordenação por inserção (Insertion Sort).
(E) Algoritmos de ordenação usando contagem (Counting Sort).$q$,$q$C$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(72,$q$Informática$q$,$q$A ITIL v4 é um framework amplamente utilizado para a gestão de serviços de TI, fornecendo orientações para alinhar as práticas de TI às necessidades de negócios. Um dos pilares da ITIL v4 é o conceito de Sistema de Valor do Serviço (SVS). Assinale a opção que descreve corretamente um dos componentes principais do SVS.
(A) Governança, que assegura que as ações de TI estejam em conformidade com os requisitos legais, mas não interfere na criação de valor.
(B) Cadeia de Valor do Serviço, que organiza atividades e interações necessárias para transformar a demanda em valor para o cliente.
(C) Práticas de gerenciamento, que definem exclusivamente os processos operacionais para equipes técnicas.
(D) Melhoria Contínua, que estabelece um conjunto fixo de regras para alcançar a excelência nos serviços, sem espaço para adaptações.
(E) Princípios orientadores, que representam os serviços disponíveis no catálogo para os consumidores finais.$q$,$q$B$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área II$q$,2025,$q$Perito Criminal – Área II$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (73,$q$Informática$q$,$q$A computação em nuvem é uma tecnologia que tem transformado a maneira como armazenamos, acessamos e processamos dados em larga escala. Assinale a opção que indica o modelo de serviço da computação em nuvem que fornece infraestrutura básica, como servidores, armazenamento e redes, para que os usuários possam implementar e gerenciar suas próprias aplicações e sistemas.
(A) SaaS (Software as a Service).
(B) PaaS (Platform as a Service).
(C) IaaS (Infrastructure as a Service).
(D) FaaS (Function as a Service).
(E) DaaS (Desktop as a Service).$q$,$q$C$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(74,$q$Informática$q$,$q$A segurança da informação é uma preocupação fundamental para organizações de todos os portes e setores, garantindo a proteção de dados e a continuidade das operações. As normas NBR ISO/IEC 27001:2013 e 27002:2013 fornecem diretrizes importantes para implementar e gerenciar um sistema de gestão de segurança da informação (SGSI). Assinale a opção que representa corretamente o principal objetivo da norma NBR ISO/IEC 27001:2013.
(A) Estabelecer um conjunto de diretrizes para controle de acesso físico e lógico às instalações e sistemas.
(B) Fornecer especificações para a implementação de práticas técnicas de segurança em redes privadas.
(C) Definir requisitos para estabelecer, implementar, manter, avaliar e melhorar continuamente um Sistema de Gestão de Segurança da Informação (SGSI).
(D) Estabelecer um plano de resposta a incidentes e contingência em caso de falhas críticas de segurança.
(E) Prover instruções específicas para o uso de antivírus e ferramentas de proteção de software.$q$,$q$C$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(75,$q$Informática$q$,$q$O modelo COBIT 2019 é um framework amplamente utilizado para implementar boas práticas na governança e gestão de TI. Ele define uma série de processos essenciais que auxiliam as organizações a alinhar suas estratégias e operações de TI com seus objetivos corporativos. Assinale a opção que indica o processo do COBIT 2019 responsável por garantir que as necessidades da organização sejam identificadas e alinhadas às iniciativas e planos estratégicos de TI.
(A) Gerenciamento de Riscos (Manage Risks).
(B) Gerenciamento de Desempenho (Monitor, Evaluate, and Assess - MEA).
(C) Planejamento e Organização (Align, Plan, and Organize - APO).
(D) Aquisição e Implementação (Build, Acquire, and Implement - BAI).
(E) Gerenciamento de Recursos (Manage Services).$q$,$q$C$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(76,$q$Informática$q$,$q$O PMBOK (Project Management Body of Knowledge), na sua 7ª edição, é uma referência essencial para o gerenciamento de projetos, oferecendo diretrizes, boas práticas e abordagens flexíveis para o gerenciamento eficiente de projetos em diversos contextos organizacionais. Assinale a opção que indica o foco principal do PMBOK 7ª edição em comparação às edições anteriores.
(A) Prescrever processos fixos e sequenciais para todas as etapas de um projeto.
(B) Adotar abordagens ágeis e híbridas como opções complementares para atender diferentes contextos de gerenciamento de projetos.
(C) Concentrar-se exclusivamente em técnicas de controle financeiro para gerenciamento de riscos.
(D) Reduzir a ênfase na adaptação às necessidades do projeto, focando em práticas padronizadas.
(E) Priorizar exclusivamente a fase de planejamento em detrimento da execução e monitoramento.$q$,$q$B$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(77,$q$Informática$q$,$q$A segurança em redes sem fio é um tema essencial para proteger dados e garantir a privacidade de informações em um ambiente conectado. Os protocolos de segurança EAP, WEP, WPA e WPA2 são amplamente utilizados para assegurar a proteção das redes sem fio contra acessos não autorizados. Nesse sentido, assinale a opção que indica o protocolo de segurança para redes sem fio que é considerado o mais seguro e que, atualmente, é amplamente utilizado.
(A) WEP.
(B) WPA.
(C) WPA2.
(D) EAP.
(E) WP3.$q$,$q$C$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(78,$q$Informática$q$,$q$Os algoritmos simétricos e assimétricos desempenham um papel fundamental na proteção de dados em processos de criptografia. Os algoritmos RSA, Diffie-Hellman, AES e RC4 são comumente utilizados para garantir segurança em várias aplicações. Nesse sentido, assinale a opção que indica um exemplo de criptografia simétrica segura e amplamente recomendada nos padrões modernos, que utiliza a mesma chave para criptografar e descriptografar dados.
(A) RSA.
(B) Diffie-Hellman.
(C) AES.
(D) RC4.
(E) RSA2.$q$,$q$C$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(79,$q$Informática$q$,$q$No cenário atual de ameaças cibernéticas, as ferramentas de segurança desempenham um papel essencial na proteção de redes e sistemas contra ataques e acessos não autorizados. Dentre as ferramentas mais utilizadas para garantir a segurança, destacam-se o firewall, o sistema de detecção de intrusão (IDS/IPS) e o antivírus. A ferramenta que tem como principal função monitorar o tráfego de rede em busca de atividades suspeitas e prevenir possíveis invasões, é denominada
(A) Firewall.
(B) Antivírus.
(C) Sistema de Detecção de Intrusão (IDS/IPS).
(D) Roteador.
(E) Proxy.$q$,$q$C$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(80,$q$Informática$q$,$q$Os sistemas de arquivos são essenciais para organizar, armazenar e gerenciar dados em dispositivos de armazenamento. Cada sistema de arquivos possui características específicas que determinam sua compatibilidade, desempenho e capacidade de armazenamento. Assinale a opção que corretamente associa um sistema de arquivos a sua característica principal.
(A) O sistema de arquivos FAT32 suporta tamanhos de arquivos superiores a 4 GB e é amplamente utilizado em unidades modernas.
(B) O sistema de arquivos NTFS oferece suporte a permissões de arquivo baseadas em ACLs (Access Control Lists) e compressão nativa.
(C) O sistema de arquivos EXT2 introduziu o recurso de journaling para maior resiliência contra falhas.
(D) O sistema de arquivos HFS foi projetado exclusivamente para dispositivos móveis e não é usado em computadores pessoais.
(E) O sistema de arquivos VFAT é uma extensão do FAT32 que suporta criptografia de arquivos. Realização$q$,$q$B$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-iicns302-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área II$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@
