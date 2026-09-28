-- Importação das provas objetivas da FGV (PC-SC 2024 e PC-MG 2025). Gerado por scripts/review/import_fgv.py.

-- Polícia Civil de Minas Gerais – Perito Criminal – Área I (2025): 80 itens extraídos, 80 no gabarito; sem gabarito: []; gabarito além dos itens: []

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro',$q$Prova objetiva (Tipo 1) – Polícia Civil de Minas Gerais – Perito Criminal – Área I (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$,'vigente',$q$Caderno oficial aplicado em 26/01/2025; publicado pela banca.$q$),
('outro',$q$Gabarito oficial definitivo (Tipo 1) – Polícia Civil de Minas Gerais – Perito Criminal – Área I (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$,'vigente',$q$Gabarito definitivo publicado pela banca; * = questão anulada.$q$)
on conflict (url) do update set checked_at=now(), status=excluded.status;
-- @@

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select $q$Polícia Civil de Minas Gerais$q$,$q$Perito Criminal – Área I$q$,2025,$q$FGV$q$,id,'active' from public.content_sources where url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id;
-- @@

insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select ed.id,$q$Histórico 2025$q$,v.d,v.o,$q$Conteúdo cobrado na prova de 2025 (levantado do caderno); edital a cotejar antes de qualquer publicação.$q$,'under_review'
from (select id from public.syllabus_editions where contest_name=$q$Polícia Civil de Minas Gerais$q$ and role_name=$q$Perito Criminal – Área I$q$ and contest_year=2025) ed cross join (values ($q$Língua Portuguesa$q$,1),($q$Raciocínio Lógico-Matemático$q$,2),($q$Informática Básica$q$,3),($q$Lei Orgânica da PCMG$q$,4),($q$Direito Constitucional / Direitos Humanos$q$,5),($q$Noções de Direito Penal, Processual Penal e Legislação Extravagante$q$,6),($q$Noções de Medicina Legal$q$,7),($q$Noções de Criminalística$q$,8),($q$Biologia$q$,9),($q$Física$q$,10),($q$Química$q$,11)) v(d,o)
on conflict (edition_id,discipline,topic_order) do nothing;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
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
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
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
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
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
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
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
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
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
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
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
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
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
(E) II – III – I.$q$,$q$C$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(51,$q$Biologia$q$,$q$Leia o fragmento a seguir. Nos Estados Unidos, os genes e agentes biológicos com potencial de uso no bioterrorismo estão sob a fiscalização e o controle do Center for Disease Control (CDC), que possui um banco de informações sobre os principais micro-organismos e as principais toxinas, bem como os antídotos e os procedimentos a serem adotados em caso de ataque. Disponível em: (https://www.scielo.br/j/bioet/a/RtrGZzZxcGJywgdBgpVVXMS/?lang=pt.) Acesso em: 10/1/2025. Adaptado. Assinale a opção que apresenta exemplos de patógenos zoonóticos com potencial utilização em bioterrorismo.
(A) Vírus Marburg, varíola e a bactéria Yersinia pestis.
(B) Hantavírus e as bactérias Bacillus anthracis e Toxoplasma gondii.
(C) Vírus ebola, Monkeypox e a bactéria Histoplasma capsulatum.
(D) Hantavírus e as bactérias Rickettsia rickettsii e Trichomonas tenax.
(E) Vírus ebola e as bactérias Histoplasma capsulatum e Clostridium botulinum.$q$,$q$X$q$,11,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(52,$q$Biologia$q$,$q$Leia o trecho a seguir. Entre as etapas de investigação sugeridas no roteiro para exames em locais de crimes ambientais, estão a descrição da área, incluindo o bioma a que pertence, a presença de vegetação nativa e/ou exótica, informações sobre o clima, o solo etc. Além disso, é aconselhado o registro do número de árvores cortadas, da presença de espécies ameaçadas de extinção e de animais nativos etc. DIAS FILHO, C.R & FRANCEZ, P. A. da C. (orgs). Introdução à Biologia Forense. Millenium, 2018. – Campinas-SP. Considere uma investigação realizada em uma área de Cerrado. Com relação a esse bioma, avalie as afirmativas a seguir. I. A vegetação arbórea e arbustiva do Cerrado stricto sensu caracteriza-se pelos troncos tortuosos, ramos retorcidos, súber espesso e folhas grossas. II. Entre as espécies nativas, o buriti, o jatobá e ipê-amarelo estão presentes no extrato arbóreo, enquanto a braquiária e o capim-colonião estão no extrato herbáceo. III. O Cerrado ocupa uma área relevante do Estado de Minas Gerais. Por abrigar inúmeras espécies endêmicas e em perigo de extinção, esse bioma é considerado um hotspot de biodiversidade. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$C$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(53,$q$Biologia$q$,$q$Leia o trecho a seguir. A identificação dos tipos de fungos encontrados em um cadáver pode auxiliar na determinação do intervalo post mortem. Um estudo realizado no Ceará, analisou amostras retiradas de cadáveres em diferentes estágios de decomposição e os resultados mostraram, de modo geral: prevalência dos gêneros Aspergillus e Candida, no período gasoso; Candida, no período coliquativo; e Aspergillus, Penicillium e Mucor, no período de esqueletização. D.A.D. WEÇOSKI & P. DALZOTO. Revista Brasileira de Criminologia. 12(2), p. 112-121, 2023. (Adaptado). Com relação aos fungos de interesse forense, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Para diferenciar fungos unicelulares de células bacterianas crescendo sobre cadáveres, pode-se avaliar a composição da parede celular. Nos fungos, ela contém predominantemente celulose, enquanto nas bactérias, a composição é de peptidoglicana. ( ) Alguns fungos são dimórficos, apresentando duas formas de crescimento – filamentosa ou levedura – e podem passar de uma forma para outra quando mudam as condições ambientais. ( ) A dosagem de etanol em amostras biológicas post mortem pode sofrer interferência devido à presença de leveduras que realizam a fermentação. As afirmativas são, respectivamente,
(A) F – V – F.
(B) F – V – V.
(C) V – F – F.
(D) V – V – F.
(E) F – F – V.$q$,$q$B$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(54,$q$Biologia$q$,$q$Leia o fragmento a seguir. Agrotóxicos foram usados em 305 casos de tentativa de envenenamento na última década. Dados do Ministério da Saúde mostram que o agrotóxico mais usado nos casos de violência está banido do país desde 2012. Trata-se do aldicarbe, popularmente conhecido como chumbinho e usado ilegalmente como veneno de ratos. (Fonte: https://reporterbrasil.org.br/2021/01/ sem-fiscalizacao-agrotoxico-vira-arma-para-violencia-domestica/. (Adaptado). O aldicarbe é um agrotóxico do tipo carbamato que pode levar à morte, pois ele inativa a enzima acetilcolinesterase. Sobre essa enzima, assinale a afirmativa correta.
(A) Atua na hematose. Sua inativação impede a oxigenação dos tecidos.
(B) Participa da cadeia transportadora de elétrons. Sua inibição impede a respiração celular.
(C) Catalisa a metabolização do álcool no fígado. Sua inibição leva ao coma e à depressão respiratória.
(D) Transporta o gás oxigênio no interior das hemácias. Sua inativação interrompe a obtenção de energia pelas células.
(E) Hidrolisa moléculas neurotransmissoras na fenda sináptica. Sua inibição ocasiona hiperestimulação das fibras musculares.$q$,$q$E$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(55,$q$Biologia$q$,$q$Leia o trecho a seguir. Os radioisótopos podem ser usados em perícias para o combate a fraudes alimentares. Em 2018, pesquisadores do Centro de Energia Nuclear na Agricultura, da Universidade de São Paulo, demonstraram que a maior parte das marcas de shoyu consumidas no Brasil são à base de milho e não à base de soja, que deveria ser o seu ingrediente principal. A constatação se baseou na diferença de composição isotópica das plantas: por usarem diferentes mecanismos de fixação de carbono, o milho possui maior proporção do isótopo pesado do carbono (13C) em seus tecidos, se comparado à soja. Mesmo depois do processamento dos grãos para a fabricação do molho, essa diferença continua a se expressar no produto final, como uma assinatura de origem. Revista Perícia Federal, no 45. 2020. Com relação ao tema acima, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) A incorporação de átomos de carbono aos tecidos vegetais ocorre por meio dos processos de fotossíntese e respiração celular. ( ) A fotossíntese do tipo C3 gera, durante a fase clara do ciclo de Calvin, um composto orgânico com 3 átomos de carbono. Já a fotossíntese do tipo C4 gera, durante essa mesma fase do Ciclo, um composto com 4 átomos de carbono. ( ) Plantas de soja e milho são, respectivamente, exemplos de planta C3 e C4. A fotossíntese do tipo C4 é especialmente vantajosa em regiões quentes e com intensa luminosidade, onde os estômatos estão parcialmente fechados durante o dia. As afirmativas são, respectivamente,
(A) F – V – F.
(B) F – V – V.
(C) V – F – F.
(D) V – V – F.
(E) F – F – V.$q$,$q$E$q$,12,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(56,$q$Biologia$q$,$q$— Vocês acharam o corpo em uma floresta? — Não. Em um descampado. — O homicídio não ocorreu lá. Tudo indica que foi dentro de uma mata fechada. O assassino, no interior de Minas Gerais, tornou o cadáver irreconhecível. A pista que levou os policiais a procurarem o criminoso nas cidades vizinhas, as larvas encontradas no corpo, pertenciam a espécies de insetos da mata e não havia florestas no município onde o corpo foi encontrado. (Adaptado de G1, 10/10/2010). Os insetos que, na metamorfose, apresentam forma larvar são chamados de
(A) holometábolos, como os ortópteros. Esses artrópodes apresentam peças bucais mastigadoras e, em várias espécies, o último par de patas adaptados ao salto.
(B) hemimetábolos, como os dípteros. Esses artrópodes apresentam peças bucais perfuradoras e sugadoras e são alados.
(C) holometábolos, como os dípteros. Esses artrópodes têm as asas traseiras reduzidas, que são chamadas halteres.
(D) hemimetábolos, como os ortópteros. Esses artrópodes apresentam peças bucais mastigadoras e as formas aladas têm asas traseiras membranosas.
(E) ametábolos, como os afídeos. Esses artrópodes apresentam peças bucais perfuradoras e sugadoras e são alados.$q$,$q$C$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (57,$q$Biologia$q$,$q$Leia o trecho a seguir: Nosso organismo sem enzimas não funcionaria. Um exemplo que podemos utilizar para evidenciar a importância dessas proteínas é o da doença conhecida como fenilcetonúria. Essa é uma patologia de origem genética, com padrão de herança autossômico recessivo, na qual o organismo não é capaz de produzir a enzima que catalisa o metabolismo do aminoácido fenilalanina. O acúmulo de fenilalanina no organismo causa diversos problemas e, em casos extremos, pode levar à morte. Por isso, o portador da doença deve ter uma alimentação altamente regrada. (Adaptado de CHEMELLO, E. Ciência Forense. Química Virtual, março de 2007). Um homem que não apresenta a fenilcetonúria diz ser o pai de uma criança com fenilcetonúria. Sabendo que a frequência do alelo para a fenilcetonúria nessa população corresponde a 0,006 e, na falta de outras informações, a chance de o homem ter o genótipo necessário para ser pai da criança é, aproximadamente,
(A) 0,0036%.
(B) 1,2%.
(C) 3,6%.
(D) 12%.
(E) 36%.$q$,$q$B$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(58,$q$Biologia$q$,$q$Em um roubo de obras de arte, foram encontradas amostras biológicas deixadas pelo(a) criminoso(a) que permitiram construir o seguinte idiograma: Disponível em: https://edif.blogs.sapo.pt). Acesso em: 10/1/2025. Adaptado. Pela análise da imagem, entre os suspeitos a seguir, o único que pode ser o(a) criminoso(a) é o indivíduo com
(A) hipertricose auricular.
(B) cariótipo 46, X em suas células.
(C) síndrome de Turner.
(D) dois corpúsculos de Barr em suas células.
(E) síndrome de Klinefelter.$q$,$q$D$q$,13,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(59,$q$Biologia$q$,$q$Em um assassinato famoso na década de 2010, em que a vítima foi encontrada morta dentro do lago de uma represa do interior de São Paulo, a botânica forense foi fundamental para associar o então suspeito ao local do crime. A análise de vestimentas e sapatos do suspeito apresentavam fragmentos ósseos, sangue e restos de alga. As amostras, porém, não se mostraram úteis para a análise de DNA, com exceção dos fragmentos de um tipo de alga, colocando o suspeito diretamente na cena do crime. Assinale a alternativa que indica a espécie de alga que permitiu a identificação do criminoso.
(A) Ciliophora, eucarionte endêmica dos corpos lóticos da região onde o corpo foi encontrado.
(B) Chlorophyta, procarionte muito comum em todo Brasil, inclusive na região onde o corpo foi encontrado.
(C) Rhizopoda, eucarionte muito comum em todo Brasil, inclusive na região onde o corpo foi encontrado.
(D) Chlorophyta, eucarionte endêmica dos corpos lóticos da região onde o corpo foi encontrado.
(E) Rhizopoda, procarionte muito comum em todo Brasil, inclusive na região onde o corpo foi encontrado.$q$,$q$X$q$,13,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(60,$q$Biologia$q$,$q$Estava escuro. Mesmo assim, a vítima não teve dúvidas em identificar um homem, então com 32 anos, como aquele que a estuprou e agrediu. Apesar de jurar a sua inocência, ele foi julgado e condenado a cinquenta anos de prisão apenas com base no testemunho da vítima. Depois de vinte e cinco anos na cadeia, sua inocência foi finalmente reconhecida por um tribunal, graças a um teste de DNA que provou, sem margem para dúvidas, que não fora ele. (Adaptado de CHEMELLO, E. Ciência Forense. Química Virtual, março de 2007). Com relação ao material genético e à sua utilização na investigação criminal, avalie os itens a seguir. I. No DNA, as ligações entre os pares de bases são mais fortes do que as ligações açúcar-fosfato. Isso permite que as duas fitas de DNA sejam separadas sem danificar suas cadeias principais, facilitando a duplicação do DNA. II. Na eletroforese em gel, os fragmentos maiores de DNA migram mais lentamente do que os menores. Após algum tempo, os fragmentos de DNA se espalham pelo gel de acordo com seu tamanho, formando bandas individuais, cada uma composta por um conjunto de moléculas de DNA de mesmo comprimento. III. Utilizando pares iniciadores que têm como alvo sequências genômicas que são conhecidas por não sofrerem variações na população humana, a reação em cadeia da polimerase (PCR) torna possível gerar uma impressão digital de DNA (DNA fingerprint) distinta para cada pessoa. Tais análises forenses podem ser usadas para identificar indivíduos que cometeram crimes, mas também para exonerar indivíduos que foram acusados injustamente. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e III, apenas.
(E) I, II e III.$q$,$q$B$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(61,$q$Física$q$,$q$Uma partícula M parte do repouso com uma aceleração constante de 0,5 m/s2. Nesse mesmo instante, passa por M, uma partícula N com velocidade constante de 5 m/s e no mesmo sentido do movimento. A velocidade da partícula M, no instante que encontrar N novamente, será de
(A) 5 m/s.
(B) 10 m/s.
(C) 15 m/s.
(D) 20 m/s.
(E) 25 m/s.$q$,$q$B$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(62,$q$Física$q$,$q$Um projétil é disparado do solo, obliquamente com ângulo de tiro de θ = 60o. A figura abaixo ilustra a trajetória percorrida por ele, supondo desprezível a resistência do ar. Sejam H a altura máxima atingida pelo projétil e R o raio de curvatura da trajetória no ponto mais alto atingido. A razão H/R é igual a
(A) 2. 3 2.
(B) 
(C) 1. 2
(D)  3. 1 2.
(E) $q$,$q$B$q$,14,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(63,$q$Física$q$,$q$Um bloco de pequenas dimensões, de massa igual a 0,25 kg, está se movendo em um trilho vertical, cujo perfil está representado na figura a seguir. Ele passa pelo ponto A do trecho horizontal do trilho com uma velocidade 𝑉⃗ de módulo igual a 4 m/s e consegue chegar, no máximo, ao ponto B a uma altura de 0,70 m. Considere g = 10 m/s2. O trabalho realizado pelos diversos atritos que se opõem ao movimento do bloco, enquanto ele se desloca de A até B, é igual a
(A) – 0,20 J.
(B) – 0,25 J.
(C) – 0,40 J.
(D) – 0,50 J.
(E) – 0,75 J.$q$,$q$B$q$,14,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(64,$q$Física$q$,$q$O sistema mostrado na figura a seguir está em repouso. Os fios e as roldanas são ideais, todos os atritos são desprezíveis, as esferas têm massas iguais e os blocos têm massa m e m', sendo m > m`. Se o fio que prende a esfera da esquerda à roldana se romper, os blocos passarão a deslizar sobre o piso horizontal para a direita e a tensão no fio que prende um ao outro se tornará igual a T. No entanto, se o fio que prende a esfera da direita à roldana se romper, os blocos passarão a deslizar para a esquerda e a tensão no fio, que prende um ao outro, se tornará igual a T`. Essas tensões T e T` são tais que: 𝑇 𝑚 𝑇` =
(A)  𝑚` 𝑇 𝑚` 𝑇` =
(B)  𝑚 𝑇 𝑚−𝑚` 𝑇` =
(C)  𝑚+𝑚` 𝑇 𝑚+𝑚` 𝑇` =
(D)  𝑚−𝑚` 𝑇 𝑇` = 1
(E) $q$,$q$A$q$,15,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (65,$q$Física$q$,$q$O capitão de uma embarcação em repouso em relação à âncora vê uma lancha se aproximando à 20 m/s. O apito tem frequência de 640 Hz para o piloto da lancha. Seja a velocidade do som no ar 340 m/s. O capitão da embarcação registrará a frequência do apito em
(A) 600 Hz.
(B) 640 Hz.
(C) 660 Hz.
(D) 680 Hz.
(E) 700 Hz.$q$,$q$D$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(66,$q$Física$q$,$q$Um estudante ganhou um termômetro de líquido graduado em uma escala desconhecida. Ele verificou que, quando o termômetro do laboratório marcava 280 K, o da escala desconhecida marcava -5; observou, ainda, que uma elevação de 9 K na temperatura correspondia a uma elevação de 12 graus na escala desconhecida. Esse termômetro graduado nessa escala desconhecida e um termômetro graduado na escala Celsius darão a mesma indicação quando a temperatura for
(A) – 41oC.
(B) 13oC.
(C) 43oC.
(D) 862oC.
(E) 1135oC.$q$,$q$C$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(67,$q$Física$q$,$q$A figura a seguir representa as características de tensão – corrente de dois resistores R1 e R2. Para alimentá-los, dispõe-se de um gerador ideal (isto é, de resistência interna desprezível). Eles podem ser ligados ao gerador como ilustram os esquemas a seguir. Suponha desprezíveis as resistências dos fios de ligação e considere o amperímetro ideal. Quando eles estão ligados como ilustra o esquema (I), o amperímetro indica 6 A. Já quando eles estão ligados, como ilustra o esquema (II), o amperímetro indica
(A) 12 A.
(B) 14 A.
(C) 16 A.
(D) 18 A.
(E) 20 A.$q$,$q$X$q$,15,$q$annulled$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(68,$q$Física$q$,$q$Duas cargas 1 e 2 de mesmo sinal, a primeira com velocidade 𝑣 e a segunda com velocidade 2.𝑣 penetram perpendicularmente em uma região onde há um campo magnético uniforme 𝛽 . Ao penetrar no campo, as cargas passam a se deslocar em trajetórias circulares com movimentos uniformes. A primeira com período T1 e a segunda com período T2. A razão T2/T1 é
(A) 1/4.
(B) 1/2.
(C) 1.
(D) 2.
(E) 4.$q$,$q$C$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(69,$q$Física$q$,$q$210 𝑅𝑛 Um dos radionuclídeos do Radônio , decai para um dos 86 isótopos do Polônio, por meio da emissão de partículas alfa. Das reações listadas a seguir, assinale a que descreve essa reação nuclear. 210 214 𝑅𝑛 → 𝛼 + 𝑃𝑜
(A)  . 86 84 210 212 𝑅𝑛 → 𝛼 + 𝑃𝑜
(B)  . 86 84 210 210 𝑅𝑛 → 𝛼 + 𝑃𝑜
(C)  . 86 84 210 208 𝑅𝑛 → 𝛼 + 𝑃𝑜
(D)  . 86 84 210 206 𝑅𝑛 → 𝛼 + 𝑃𝑜
(E)  . 86 84$q$,$q$E$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(70,$q$Física$q$,$q$Quatro cargas pontuais q2, q3, q4 e q5 ocupam os vértices 2, 3, 4 e 5 de um pentágono regular, como mostra a figura. No caso, a intensidade do campo elétrico no vértice 1 é nula: 𝐸⃗ 1 = 0⃗ . Remove-se para muito longe a carga q2 > 0, que se encontrava no vértice 2, e a intensidade do campo elétrico no vértice 1 passa `` ≠0⃗ . a ser 𝐸⃗ 1 Assinale o segmento orientado que indica corretamente a direção e o sentido de 𝐸⃗ 1 ``.
(A) 
(B) 
(C) 
(D) 
(E) $q$,$q$A$q$,16,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(71,$q$Química$q$,$q$Muitas minas de carvão no Brasil liberam quantidades consideráveis de ácido sulfúrico e hidróxido de ferro nos rios locais. A liberação de piritas durante a drenagem ácida das minas, em contato com oxigênio e água, geram as seguintes reações: FeS2 + 7/2 O2 + H2O ↔ Fe2+ + 2 HSO4─ I. II. Fe2+ + 1/4 O2 + 1/2 H2O ↔ Fe3+ + OH─ III. Fe3+ + 3 H2O ↔ Fe(OH)3 + 3 H+ Assinale a opção que indica quantos mols de ácido sulfúrico são liberados nos rios para um mol de pirita produzido.
(A) 7.
(B) 2.
(C) 3.
(D) 4.
(E) 8.$q$,$q$B$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(72,$q$Química$q$,$q$A descoberta da Penicilina G ou Benzilpenicilina e o seu subsequente uso terapêutico representou um marco na terapia medicamentosa, pois o seu surgimento no passado produziu uma acentuada redução da mortalidade. Assinale a opção que indica as funções orgânicas presentes nessa molécula.
(A) Éter e Amida.
(B) Álcool e Amina.
(C) Amina e Ácido Carboxílico.
(D) Amida e Ácido Carboxílico.
(E) Ácido Carboxílico e Álcool.$q$,$q$D$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Perito Criminal – Área I$q$,2025,$q$Perito Criminal – Área I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (73,$q$Química$q$,$q$Órgãos ambientais, recentemente, divulgaram que os gases de efeito estufa (GEE) emitidos no Brasil são provenientes, principalmente, da agropecuária e das mudanças no uso da terra, das queimadas e do desmatamento das florestas. Sabendo que COV é definido como composto orgânico volátil, assinale a opção que contêm GEE e GEE indiretos na troposfera.
(A) CO2, N2O, CH4, CO, COV e NOx.
(B) CO2, N2O, Cl2, CH4, CFC e O3.
(C) CO2, NO2, N2, HFC, SF6 e O3.
(D) CO2, N2O, CFC, HF, COV e N2.
(E) CO2, NO2, CFC, HF, COV e OH.$q$,$q$A$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(74,$q$Química$q$,$q$O abaixamento relativo da pressão de vapor da água a 100C, em uma solução de ureia em água, é de 0,36%. Sabendo que a massa molecular da água e da ureia são, respectivamente, 18 g e 60 g, e admitindo o comportamento ideal para o vapor e a pressão de vapor do solvente igual a 1 atm., a concentração da solução de ureia dissolvidos em 1.000 g de água e a pressão de vapor da solução de ureia são, respectivamente,
(A) 10 g e 0,765 atm.
(B) 18 g e 1,034 atm.
(C) 12 g e 0,996 atm.
(D) 15 g e 0,822 atm.
(E) 14 g e 1,086 atm.$q$,$q$X$q$,17,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(75,$q$Química$q$,$q$As drogas de interesse forense são divididas em grupos de substâncias com base em publicações da Agência Nacional de Vigilância Sanitária (ANVISA). No Brasil, um produto que contém como princípios ativos os canabinoides e canabidiol é registrado como medicamento. Eles podem ser identificados e quantificados utilizando cromatografia líquida de alta eficiência (CLAE) ou por cromatografia em fase gasosa (CG). Em relação a essas técnicas analíticas, assinale a afirmativa correta.
(A) A CLAE usa o gás de arraste como sua fase móvel, armazenados em cilindros de alta pressão, que não podem interagir com a fase estacionária e nem com a amostra, além de possuir alta pureza.
(B) A CG é uma técnica utilizada na separação dos vários componentes de uma mistura de substâncias, com o objetivo de identificar esses componentes, quantificá-los ou purificá- los; é usada em análises de compostos não voláteis ou instáveis termicamente, onde a CG não pode ser utilizada.
(C) A CG é uma técnica de separação com diversas vantagens que envolve pequenos volumes de injeção, requer que a amostra seja solúvel na fase móvel e a fase estacionária pode ser utilizada inúmeras vezes.
(D) O forno é um componente na CG e deve ter baixa taxa de aquecimento, baixa taxa de resfriamento, baixa estabilidade térmica, ampla faixa de temperatura, sistema de segurança e operar em temperaturas que dependam do injetor e do detector.
(E) A CG acoplada à espectrometria de massas é usada para realizar a separação dos compostos semivoláteis e voláteis da amostra com base em suas interações com a coluna cromatográfica e o gás de arraste, enquanto o espectrômetro de massas identifica e quantifica os compostos com base na sua relação massa/carga.$q$,$q$E$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(76,$q$Química$q$,$q$Durante o tratamento de efluentes, diversas técnicas são utilizadas a fim de obter uma boa eficiência de remoção dos principais parâmetros de poluição. Em relação ao tratamento primário, assinale a afirmativa correta.
(A) A flotação se aplica à remoção de material orgânico suspenso no efluente, em particular os metais pesados, presentes em elevados teores em efluentes de indústrias metalúrgicas, mecânicas e de galvanoplastia.
(B) A floculação deve ser aplicada principalmente para efluentes com altos teores de óleos e graxas e/ou detergentes, como os oriundos de indústrias petroquímicas, de pescado, frigoríficas, de laticínios e de lavanderias.
(C) A coagulação é o processo de estabilização de coloides e floculação como o processo de agregação e neutralização de coloides, mas, geralmente, esses processos ocorrem separadamente, chamando-se assim o processo de coagulação/floculação.
(D) A desestabilização de coloides, durante a coagulação, pode ser conseguida por diversos meios: calor, agitação, adição de agentes coagulantes químicos, processos biológicos, passagem de corrente elétrica, ou, ainda, a eletrocoagulação com a adição de coagulantes químicos.
(E) O processo de coagulação é governado principalmente pela concentração das partículas em suspensão; quanto menos concentrado for o meio, maior é a resistência à coagulação e a velocidade pode ser calculada por meio do equilíbrio de forças atuantes sobre a partícula na direção horizontal, do qual resulta a lei de Stokes.$q$,$q$D$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(77,$q$Química$q$,$q$A gestão de resíduos agrícolas e agroindustriais de forma adequada traz benefícios relacionados à prevenção da poluição de cursos de água e do solo, à diminuição de foco de doenças para as lavouras e à produção de adubos orgânicos para uso agrícola. Sobre o tema, avalie as afirmativas a seguir. I. No processo de compostagem, a ação microbiológica é intensa e as bactérias formam o grupo mais ativo no processo inicial da compostagem e em toda fase termofílica. Açúcares e outros carboidratos tendem a ser completamente biodegradados na compostagem enquanto lipídios, celulose e hemicelulose podem ser reduzidos em 60 a 75% num período aproximado de 60 dias de compostagem. II. A compostagem permite a redução do volume e peso do material original, algo importante considerando o tratamento de resíduos orgânicos. A perda de carbono, por meio da formação do CaCO3, e a intensa perda de umidade é responsável por reduções de 25 a 50% no volume e de 40 a 80% no peso total. III. Durante o processo de compostagem, a decomposição de moléculas orgânicas mineraliza nutrientes resultando em fosfato (PO43-), íon potássio (K+), amônio (NH4+) e nitrato (NO3-). Enquanto o nitrogênio e o fósforo são imobilizados por bactérias, o potássio resultante de decomposição de tecidos vegetais continua em sua forma iônica, sujeito à lixiviação. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$C$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(78,$q$Química$q$,$q$Na etapa do tratamento secundário dos esgotos domésticos, ocorrem vários processos biológicos de tratamento, tanto os de natureza aeróbica quanto os de natureza anaeróbica. Em relação aos processos de tratamento de lodos ativados e digestores anaeróbicos, assinale a afirmativa correta.
(A) Entre os processos anaeróbicos, o de lodos ativados é um dos mais aplicados e de maior eficiência. Lodos ativados designam a massa microbiana sedimentada que se forma quando esgotos e outros efluentes biodegradáveis são submetidos à aeração.
(B) A digestão anaeróbica é um processo bioquímico complexo, composto por várias reações sequenciais, cada uma com sua população bacteriana específica. Consiste na estabilização da matéria orgânica, pela ação de bactérias anaeróbicas, que é convertida em metano e compostos inorgânicos.
(C) Algumas vantagens da digestão anaeróbica em comparação com os processos aeróbicos são: necessita do uso de aeração e, em decorrência, apresenta alto consumo de energia e alto consumo de nutrientes em função da menor produção de biomassa, além de gerar gás combustível com baixo teor calorífico.
(D) O processo de digestão anaeróbica é bastante flexível e pode ser adaptado para tratar uma grande variedade de efluentes, com poluentes predominantemente de origem inorgânica. Diferentes tipos de processo já foram desenvolvidos e são chamadas variantes do processo.
(E) Algumas desvantagens da digestão anaeróbica em comparação com os processos de lodos ativados são: as bactérias anaeróbias são menos susceptíveis à inibição por poluentes tóxicos e inibidores e geram sempre maus odores.$q$,$q$B$q$,18,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(79,$q$Química$q$,$q$O óxido de cobre pode ser produzido de diversas maneiras e, devido às suas propriedades únicas, ele encontra aplicações em diversas áreas, tais como, indústria de cerâmica, catalisadores e semicondutores. Um dos métodos mais comuns envolve a oxidação do metal cobre em presença de ar. São conhecidas a 298K, as seguintes entalpias e entropias a T e P constantes: Entalpia Entropia Substância (Kcal/mol) (Kcal/mol K) O2 0 49 Cu 0 7,97 CuO -37 10,4 Cu2O -39,84 24,1 Em relação ao óxido de cobre, assinale a afirmativa correta.
(A) O CuO tem maior tendência de se formar do que o Cu2O, pois o CuO tem maior variação de entropia.
(B) O Cu2O não tem tendência de se formar, pois o cálculo da variação da energia de Gibbs é maior que zero.
(C) A variação da energia de Gibbs para a formação do Cu2O é menor, logo tem maior tendência de se formar do que o CuO.
(D) A variação da energia de Gibbs para a formação do CuO é menor, logo tem maior tendência de se formar do que o Cu2O.
(E) O cálculo da variação da energia de Gibbs na formação do CuO e Cu2O são iguais a zero, logo não se formarão durante a oxidação.$q$,$q$C$q$,18,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(80,$q$Química$q$,$q$O processo de lodos ativados é um dos mais aplicados e de maior eficiência e os componentes físicos do sistema podem ser: um tanque de aeração, um decantador secundário e um sistema de reciclo dos flocos sedimentados para o tanque de aeração. A figura a seguir apresenta, de forma simplificada, os componentes do sistema de lodos ativados, bem como as correntes de efluente bruto e tratado, licor misto (efluente + lodo – linha de reciclo) e lodo de excesso. Q = vazão da corrente de alimentação V = volume útil do reator So = concentração de substrato na corrente de alimentação Se = concentração de substrato na corrente de efluente tratado Xe = concentração de biomassa no reator Xu = concentração de biomassa no fundo do sedimentador W = vazão de purga de lodo r = razão de reciclo = rQ/Q Com base nessas informações, assinale a afirmativa correta.
(A) No decantador secundário ocorre a metabolização dos compostos biodegradáveis presentes na corrente de alimentação. Nesse tanque é essencial uma boa mistura e aeração.
(B) Qualquer problema de separação de sólidos indica um balanceamento no componente biológico do processo. Portanto, o processo tem como ponto crítico a sedimentabilidade do lodo.
(C) A concentração de substrato na corrente de alimentação é purgada do fundo do sedimentador e enviado para tratamento e descarte adequados. O sobrenadante clarificado pode ser descartado ou seguir para um tratamento complementar.
(D) No tanque de aeração, ocorre a separação do lodo (biomassa) do efluente tratado. Parte do lodo sedimentado é enviada por meio de bombas e uma linha de reciclo para o tanque de aeração, assegurando elevada concentração de biomassa no interior do reator.
(E) A agitação constante no tanque de aeração e a recirculação do lodo prejudicam o crescimento de organismos superiores. As espécies microbianas dominantes no sistema dependerão das condições ambientais, do projeto do processo, do modo de operação da planta e das características do afluente. Realização$q$,$q$E$q$,18,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/perito-criminal-area-icns301-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmperito1-002pcmg.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Perito Criminal – Área I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@
