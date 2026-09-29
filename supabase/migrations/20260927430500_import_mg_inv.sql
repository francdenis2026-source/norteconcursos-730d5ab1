-- Importação das provas objetivas da FGV (PC-SC 2024 e PC-MG 2025). Gerado por scripts/review/import_fgv.py.

-- Polícia Civil de Minas Gerais – Investigador de Polícia I (2025): 70 itens extraídos, 70 no gabarito; sem gabarito: []; gabarito além dos itens: []

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro',$q$Prova objetiva (Tipo 1) – Polícia Civil de Minas Gerais – Investigador de Polícia I (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$,'vigente',$q$Caderno oficial aplicado em 26/01/2025; publicado pela banca.$q$),
('outro',$q$Gabarito oficial definitivo (Tipo 1) – Polícia Civil de Minas Gerais – Investigador de Polícia I (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$,'vigente',$q$Gabarito definitivo publicado pela banca; * = questão anulada.$q$)
on conflict (url) do update set checked_at=now(), status=excluded.status;
-- @@

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select $q$Polícia Civil de Minas Gerais$q$,$q$Investigador de Polícia I$q$,2025,$q$FGV$q$,id,'active' from public.content_sources where url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id;
-- @@

insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select ed.id,$q$Histórico 2025$q$,v.d,v.o,$q$Conteúdo cobrado na prova de 2025 (levantado do caderno); edital a cotejar antes de qualquer publicação.$q$,'under_review'
from (select id from public.syllabus_editions where contest_name=$q$Polícia Civil de Minas Gerais$q$ and role_name=$q$Investigador de Polícia I$q$ and contest_year=2025) ed cross join (values ($q$Língua Portuguesa$q$,1),($q$Raciocínio Lógico-Matemático$q$,2),($q$Informática Básica$q$,3),($q$Lei Orgânica da Polícia Civil do Estado de Minas Gerais$q$,4),($q$Noções de Direito Administrativo$q$,5),($q$Noções de Direito Constitucional$q$,6),($q$Noções de Direito Penal$q$,7),($q$Noções de Direito Processual Penal$q$,8),($q$Noções de Legislação Penal e Processual Extravagante$q$,9),($q$Noções de Direitos Humanos$q$,10),($q$Noções de Medicina Legal$q$,11),($q$Noções de Criminologia$q$,12)) v(d,o)
on conflict (edition_id,discipline,topic_order) do nothing;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (1,$q$Língua Portuguesa$q$,$q$Analise o cartaz a seguir. Sobre o cartaz acima, assinale a afirmativa correta.
(A) Todas as frases do cartaz estão gramaticalmente corretas.
(B) A frase “que te sustenta” tem valor conclusivo, em relação à frase anterior.
(C) “Beba muita água e evite desperdícios” é um conselho de valor medicinal.
(D) Pela presença da garrafa ao pé do cartaz, nota-se que a água referida é a água mineral.
(E) A presença da borboleta, do beija-flor e da própria flor documentam a vida sustentada pela água.$q$,$q$E$q$,2,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(2,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta a frase que documenta a linguagem figurada.
(A) Serviço sem pagamento é castigo.
(B) Nosso objetivo é dominar o mundo, como a Microsoft.
(C) Pior do que não ter dinheiro é ter dinheiro em excesso.
(D) Um povo só se deixa guiar quando lhe apontam um futuro.
(E) O homem esquece mais facilmente a morte do pai que a perda do patrimônio.$q$,$q$B$q$,2,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(3,$q$Língua Portuguesa$q$,$q$Assinale a opção que indica o texto classificado como descritivo.
(A) Seja feliz!
(B) A riqueza é a felicidade na Terra.
(C) Trabalhe sempre e muito e ficará rico.
(D) Nunca deixe para hoje o que pode fazer amanhã.
(E) Trabalhei muito, economizei bastante, fiquei rico.$q$,$q$B$q$,2,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(4,$q$Língua Portuguesa$q$,$q$Assinale a frase que está expressa em discurso indireto.
(A) O capital é trabalho roubado.
(B) Fazer bons negócios é ver primeiro que os demais.
(C) Quer que seus negócios continuem bem? Faça-os você.
(D) Já foi dito que dinheiro disponível é uma lâmpada de Aladim.
(E) Quando o assunto é dinheiro, todos os homens pertencem à mesma religião.$q$,$q$D$q$,2,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(5,$q$Língua Portuguesa$q$,$q$Os adjetivos em Língua Portuguesa expressam estados, qualidades, características e relações; assinale a opção em que o adjetivo sublinhado mostra um estado.
(A) País feliz.
(B) Homem alto.
(C) Mesa arranhada.
(D) Produto importado.
(E) Discurso presidencial.$q$,$q$C$q$,2,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(6,$q$Língua Portuguesa$q$,$q$Em todas as frases a seguir foi indicada uma inferência, ou seja, algo que pode ser deduzido da leitura. Assinale a opção que apresenta a frase em que a dedução é inadequada.
(A) O Flamengo ganhou o campeonato mundial. / O time do Flamengo é magnífico.
(B) As mulheres já podem servir nas Forças Armadas. / As mulheres mostram ascensão na sociedade.
(C) Muita gente no Rio de Janeiro vive nas favelas. / As favelas do Rio são lugares aprazíveis.
(D) Uma multidão atacou o supermercado de alimentos. / O país atravessa uma crise social.
(E) A temperatura no estádio atingiu 40 graus. / O futebol devia alterar alguns horários de partidas.$q$,$q$C$q$,2,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(7,$q$Língua Portuguesa$q$,$q$Observe o seguinte ato comunicativo: O gerente da loja pegou o cartaz feito pela empresa de publicidade contratada e o colocou na entrada da loja. A promessa de preços mais baixos deveria atrair clientes, promessa essa ajudada pelas belas imagens das camisas. Sobre esse ato, assinale a afirmativa inadequada.
(A) O emissor do cartaz é o gerente da loja.
(B) A mensagem do cartaz é de tipo publicitário.
(C) O código empregado é feito de palavras e imagens.
(D) Os receptores pretendidos são possíveis clientes.
(E) Preços mais baixos são argumento para a venda.$q$,$q$A$q$,2,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(8,$q$Língua Portuguesa$q$,$q$Nas frases abaixo, o termo sublinhado foi substituído por outro termo, indicado ao final da frase. Assinale a opção em que esse novo termo é intensificador do anterior.
(A) Ela ficou magra após a dieta. / abatida.
(B) Ele se separou da esposa. / abandonou.
(C) As páginas do livro grudaram. / se uniram.
(D) Após o acidente, ela ficou pálida. / apavorada.
(E) O aluno rabiscou as páginas do livro. / escreveu.$q$,$q$B$q$,2,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (9,$q$Língua Portuguesa$q$,$q$As frases a seguir tentam tornar suas informações mais precisas. A forma de fazer isso que não está corretamente indicada, é:
(A) As medidas propostas – redução de impostos, demissão de funcionários, abandono de projetos – não foram bem recebidas / enumeração.
(B) Nesse nosso imenso país – quatorze vezes maior que a França – os casos de escravidão são raríssimos / elemento informativo acidental.
(C) Três mil e cem de pessoas manifestaram seu protesto / quantificação precisa.
(D) O empresário Henry Ford defendia a divisão de tarefas / o emprego de nomes próprios.
(E) Não se trata das importações, mas das exportações / utilização de palavras de sentido próximo.$q$,$q$E$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(10,$q$Língua Portuguesa$q$,$q$Procurando reduzir a extensão dos textos, em todas as frases abaixo as orações substantivas sublinhadas foram substituídas por substantivos. Assinale a opção em que isso foi feito de forma adequada.
(A) Quem não escuta é feliz. / o surdo-mudo.
(B) Quem vive sozinho não conversa. / o solitário.
(C) Quem não se casou perde tempo na vida. / o viúvo.
(D) Quem vive pedindo na rua se vicia. / o desempregado.
(E) Quem vive de herança pode descansar. / o preguiçoso.$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(11,$q$Raciocínio Lógico-Matemático$q$,$q$Durante uma operação da polícia civil para investigar fraudes fiscais, constatou-se que, em uma amostra de 600 documentos analisados, 55% apresentaram indícios de irregularidades. Ao examinar mais detalhadamente esses documentos com indícios, apurou-se que 30% dos valores neles declarados foram fraudados. Além disso, desses valores fraudulentos, um terço correspondeu a fraudes envolvendo notas “frias” emitidas por empresas fictícias. Com base nessas informações, o número total de documentos analisados que apresentaram indícios e que envolvem fraudes relacionadas a notas “frias” emitidas por empresas fictícias é
(A) 30.
(B) 32.
(C) 33.
(D) 35.
(E) 36.$q$,$q$C$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(12,$q$Raciocínio Lógico-Matemático$q$,$q$Uma delegacia recebeu, no mês de dezembro de 2024, denúncias relacionadas a três tipos de crimes: roubo, fraude eletrônica e tráfico de drogas. Após uma triagem, constatou-se que: • 44% das denúncias são sobre roubos; • 36% das denúncias são sobre fraudes eletrônicas; • 20% das denúncias são sobre tráfico de drogas. Historicamente, sabe-se que 30% das denúncias contra fraudes eletrônicas são improcedentes, assim como 10% das denúncias contra roubo e 20% das denúncias contra tráfico de drogas. Se uma denúncia é escolhida ao acaso, a probabilidade de ela ser contra roubo, sabendo-se que é uma denúncia procedente, é de aproximadamente
(A) 50%.
(B) 49%.
(C) 48%.
(D) 47%.
(E) 46%.$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(13,$q$Raciocínio Lógico-Matemático$q$,$q$A polícia civil recebeu um relatório sobre o número de ocorrências registradas em uma delegacia ao longo de um mês. A tabela a seguir apresenta dados parciais sobre as quantidades de ocorrências e o número de casos solucionados para diferentes tipos de crimes: Tipo de Crime Ocorrências Casos Solucionados Roubo 180 135 Tráfico de Drogas 45 Estelionato 120 Lesão Corporal 30 Sabendo-se que a proporção de casos solucionados em relação às ocorrências é a mesma para cada tipo de crime, pode-se concluir corretamente que as ocorrências de roubo, com relação ao total de ocorrências registradas, correspondem a
(A) 45%.
(B) 48%.
(C) 50%.
(D) 54%.
(E) 55%.$q$,$q$A$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(14,$q$Raciocínio Lógico-Matemático$q$,$q$Em uma investigação, a quantidade de policiais trabalhando é inversamente proporcional ao tempo necessário para a sua conclusão. Se houvesse apenas três policiais desde o início da investigação, o tempo para a sua conclusão seria de 20 dias. A inclusão de um policial a mais no início da investigação permitiria que a conclusão do trabalho fosse antecipada em
(A) um dia.
(B) dois dias.
(C) três dias.
(D) quatro dias.
(E) cinco dias.$q$,$q$E$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(15,$q$Raciocínio Lógico-Matemático$q$,$q$Uma delegacia de polícia está investigando uma série de quatro ataques a caixas eletrônicos ocorridos em diferentes localidades da cidade. Os policiais que conduzem a investigação identificaram que os criminosos aparentemente seguem um padrão de ataque baseado em dias específicos e em distâncias da delegacia. O histórico dos ataques é o seguinte: • 1º ataque: domingo, dia 1º de dezembro, a 5 km da delegacia. • 2º ataque: terça-feira, dia 3 de dezembro, a 6 km da delegacia. • 3º ataque: sexta-feira, dia 6 de dezembro, a 8 km da delegacia. • 4º ataque: terça-feira, dia 10 de dezembro, a 11 km da delegacia. Com base no padrão identificado, provavelmente o próximo ataque, se ocorrer, acontecerá
(A) na sexta-feira, dia 13 de dezembro, a 13 km da delegacia.
(B) no sábado, dia 14 de dezembro, a 15 km da delegacia.
(C) no sábado, dia 15 de dezembro, a 16 km da delegacia.
(D) no domingo, dia 15 de dezembro, a 15 km da delegacia.
(E) no domingo, dia 16 de dezembro, a 14 km da delegacia.$q$,$q$D$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(16,$q$Raciocínio Lógico-Matemático$q$,$q$Um policial civil está analisando os tempos de resposta de diferentes equipes em várias ocorrências. Ele solicitou a coleta dos tempos de resposta de oito patrulhas, em minutos, e recebeu um relatório com tais registros e a mediana, já calculada, do conjunto de valores. No entanto, ao ler o relatório, percebeu que um dos valores estava ilegível, como ilustrado a seguir: Com base nos dados fornecidos, ele conseguiu recuperar o valor ilegível e, com isso, calculou, corretamente, a média desse conjunto de valores. O valor que o policial obteve para a média foi
(A) 27,00.
(B) 27,25.
(C) 27,50.
(D) 28,00.
(E) 28,15.$q$,$q$B$q$,4,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (17,$q$Informática Básica$q$,$q$Com o crescimento da internet ao longo dos anos, a quantidade de endereços IP disponíveis no protocolo IPv4 tornou-se insuficiente. Para solucionar esse problema e incorporar outras melhorias tecnológicas, o protocolo IPv6 foi desenvolvido como sucessor do IPv4. No contexto dos protocolos de internet IPv4 e IPv6, assinale a afirmativa correta.
(A) O IPv4 utiliza endereços de 64 bits, enquanto o IPv6 utiliza endereços de 128 bits.
(B) O IPv6 elimina completamente a necessidade de NAT (Network Address Translation).
(C) O IPv4 oferece maior eficiência no roteamento, pois possui cabeçalhos menores que o IPv6.
(D) O IPv6 inclui o suporte nativo a funcionalidades como segurança e mobilidade, que são apenas opcionais no IPv4.
(E) O IPv6 permite até quatro vezes mais endereços únicos do que o IPv4.$q$,$q$D$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(18,$q$Informática Básica$q$,$q$No início da Internet, as redes eram predominantemente cabeadas. Com a crescente demanda por mobilidade, as redes sem fio (Wi-Fi) surgiram e se tornaram amplamente utilizadas, tanto nos ambientes corporativos quanto nos ambientes domésticos. Considere os aspectos técnicos e operacionais de redes com fio (Ethernet) e redes sem fio. Assinale a opção que apresenta uma comparação tecnicamente correta e mais abrangente entre essas duas tecnologias.
(A) Redes sem fio alcançam taxas de latência menores que redes com fio devido à ausência de infraestrutura física de cabeamento.
(B) Redes com fio oferecem maior estabilidade, largura de banda e segurança física, enquanto redes sem fio priorizam mobilidade e flexibilidade de implantação.
(C) Redes sem fio são imunes a interferências de dispositivos externos devido à utilização de canais exclusivos para transmissão de dados.
(D) Redes com fio utilizam cabeamento coaxial como padrão principal, enquanto redes sem fio operam exclusivamente na frequência de 2,4 GHz para evitar congestionamento.
(E) Redes sem fio oferecem maior largura de banda e maior alcance em comparação às redes com fio devido ao uso de ondas de rádio para transmissão.$q$,$q$B$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(19,$q$Informática Básica$q$,$q$Processadores de texto são programas de computador projetados para criar, editar, formatar e imprimir documentos textuais. Eles são amplamente utilizados em diversos contextos, como no ambiente profissional, acadêmico e pessoal, devido à sua capacidade de produzir documentos bem estruturados de forma eficiente. Apesar de termos uma variedade de opções no mercado, os editores de texto mais famosos e mais utilizados são o Microsoft Word e LibreOffice Writer. O Microsoft Word e o LibreOffice Writer possuem funcionalidades semelhantes para facilitar a formatação de documentos. As opções a seguir apresentam funcionalidades comuns nativas entre os dois softwares, à exceção de uma. Assinale-a.
(A) Inserção de tabelas para a organização de dados.
(B) Aplicação de estilos para formatar títulos e parágrafos.
(C) Inserção de mala direta para o envio de documentos personalizados.
(D) Colaboração em tempo real com múltiplos usuários diretamente no arquivo.
(E) Exportação de documentos no formato PDF.$q$,$q$D$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(20,$q$Informática Básica$q$,$q$Planilhas eletrônicas são programas projetados para criar, organizar, calcular e analisar dados em formato tabular. Elas são amplamente utilizadas para tarefas que vão desde cálculos simples até análises complexas, sendo uma ferramenta essencial em áreas como finanças, gestão, estatística, ciência de dados e muitas outras. Existem várias opções no mercado, sendo os mais famosos e utilizados o Microsoft Excel e o LibreOffice Calc. No Microsoft Excel e no LibreOffice Calc, é possível realizar diversas operações para a manipulação e análise de dados. Assinale a funcionalidade que não é nativamente suportada por ambos os softwares.
(A) Criação de gráficos a partir de dados em planilhas.
(B) Aplicação de filtros automáticos em tabelas.
(C) Uso de tabelas dinâmicas para sumarização de dados.
(D) Programação de macros em Python.
(E) Importação de arquivos CSV para edição.$q$,$q$D$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(21,$q$Informática Básica$q$,$q$Um malware (abreviação de malicious software, ou “software malicioso”) é qualquer programa ou código projetado para prejudicar, explorar ou comprometer dispositivos, redes ou usuários. Ele pode roubar informações, causar danos ao sistema, espionar atividades ou obter controle de dispositivos sem a permissão do usuário. Entre os tipos principais de malware podemos citar worm, cavalo de Troia, spyware, adware, phishing, botnets, entre outros. Assinale a opção que descreve corretamente a principal diferença entre um worm e um cavalo de Troia.
(A) Worms dependem de um programa legítimo para se espalhar, enquanto cavalos de Troia são autônomos e se replicam automaticamente.
(B) Worms podem se replicar automaticamente e se espalhar por redes, enquanto cavalos de Troia precisam ser instalados pelo usuário como se fossem programas legítimos.
(C) Worms roubam informações sensíveis sem o conhecimento do usuário, enquanto cavalos de Troia criptografam dados para pedir resgate.
(D) Worms não causam danos diretos, enquanto cavalos de Troia são exclusivamente destrutivos.
(E) Worms exigem interação do usuário para ativação, enquanto cavalos de Troia se propagam sem necessidade de ação humana.$q$,$q$B$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(22,$q$Informática Básica$q$,$q$João, um profissional de TI, recebeu um e-mail com o título “Atualize sua senha agora para evitar bloqueio de conta”. O e-mail continha um link que levava a uma página idêntica ao site de sua instituição bancária, onde ele inseriu suas credenciais. Dias depois, João percebeu que sua conta havia sido acessada sem autorização, resultando em um prejuízo financeiro. Com base na situação descrita, assinale a opção que classifica corretamente o ataque cibernético sofrido por João.
(A) Ransomware, pois houve uma tentativa de bloqueio do acesso à conta de João, o que caracteriza o ataque.
(B) Phishing, pois o atacante usou um e-mail fraudulento para capturar as credenciais de João.
(C) DoS (Denial of Service), já que a conta de João foi acessada sem autorização, prejudicando o serviço.
(D) Spoofing, porque João foi induzido a revelar informações sensíveis.
(E) Malware, porque o e-mail provavelmente continha um programa malicioso que invadiu o sistema de João.$q$,$q$B$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(23,$q$Informática Básica$q$,$q$Considere o uso de criptografia assimétrica em uma transação online. Maria deseja enviar uma mensagem confidencial para João, garantindo que apenas ele possa ler o conteúdo. Para que essa segurança seja alcançada, Maria deve criptografar a mensagem
(A) usando a chave privada dela, garantindo que apenas João consiga descriptografar.
(B) usando a chave pública de João, garantindo que somente João possa descriptografar com sua chave privada.
(C) usando a chave pública dela, para que João possa descriptografar com sua chave privada.
(D) com a chave privada de João, pois apenas João poderá descriptografá-la com sua chave pública.
(E) com uma chave simétrica gerada por João, garantindo que ambos tenham acesso à mesma chave.$q$,$q$B$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(24,$q$Informática Básica$q$,$q$As licenças BSD, GPLv2 e GPLv3 possuem diferenças importantes quanto às permissões e restrições no uso, na modificação e na redistribuição de software. Assinale a opção que descreve corretamente uma característica distintiva entre essas licenças.
(A) A licença BSD exige que qualquer redistribuição de código modificado seja feita sob a mesma licença, assim como as licenças GPLv2 e GPLv3.
(B) A GPLv3 introduz cláusulas adicionais para proteção contra práticas como a implementação de DRM (Digital Rights Management), o que não é abordado pela GPLv2.
(C) As licenças BSD e GPLv2 possuem a mesma abordagem em relação à obrigatoriedade de compartilhar modificações do código.
(D) A GPLv3 permite que o software licenciado sob a GPLv2 seja automaticamente compatível com a nova versão, independentemente do termo, ou qualquer versão posterior.
(E) A licença BSD impede explicitamente o uso do software em projetos proprietários, o que a diferencia das licenças GPLv2 e GPLv3.$q$,$q$B$q$,5,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (25,$q$Lei Orgânica da Polícia Civil do Estado de Minas Gerais$q$,$q$João e Matheus, investigadores de polícia e integrantes de um mesmo Departamento da Polícia Civil do Estado de Minas Gerais (PCMG), estão interessados em realizar remoção por permuta. Nesse cenário, considerando as disposições da Lei Complementar Estadual nº 129/2013, a remoção de investigadores de polícia por permuta, nos limites de determinado Departamento de Polícia Civil, ingressa na competência da
(A) Superintendência de Informações e Inteligência Policial.
(B) Superintendência de Planejamento, Gestão e Finanças.
(C) Superintendência de Investigação e Polícia Judiciária.
(D) Corregedoria-Geral de Polícia Civil.
(E) Chefia Adjunta da PCMG.$q$,$q$C$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(26,$q$Lei Orgânica da Polícia Civil do Estado de Minas Gerais$q$,$q$O Corregedor-Geral de Polícia Civil ministrou palestra aos novos policiais civis da PCMG, abordando, entre outros tópicos, a temática disciplinar, dando enfoque às penalidades previstas em lei. De acordo com a narrativa, avalie as afirmativas a seguir. I. Ausência do serviço, sem causa justificável, por mais de 30 dias, interpoladamente, durante um ano. II. Exercício de qualquer atividade remunerada, estando o servidor licenciado para tratamento de saúde. III. Procedimento irregular de natureza grave. Considerando as disposições da Lei Estadual nº 5.406/1969, será aplicada a pena de demissão na hipótese(s) elencada(s) em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$D$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(27,$q$Lei Orgânica da Polícia Civil do Estado de Minas Gerais$q$,$q$Lucas, policial civil do Estado de Minas Gerais, responde, na esfera administrativa, por ter praticado, em tese, transgressão disciplinar. Após a observância do contraditório e da ampla defesa, constatou-se que existia, no caso apresentado, uma causa justificante, influindo no julgamento em andamento. Nesse cenário, considerando as disposições da Lei Estadual nº 5.406/1969, assinale a opção que apresenta uma causa justificante.
(A) Ter o transgressor confessado, espontaneamente, a falta perante a autoridade sindicante.
(B) Apresentar motivo de força maior plenamente comprovado e justificado.
(C) Ter sido cometida a transgressão para evitar mal maior.
(D) Ter bom comportamento anterior.
(E) Ter prestado serviços relevantes.$q$,$q$B$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(28,$q$Lei Orgânica da Polícia Civil do Estado de Minas Gerais$q$,$q$Aos integrantes das carreiras da PCMG, de acordo com a Lei Complementar Estadual nº 129/2013, serão atribuídas verbas indenizatórias e de gratificação, observados os respectivos critérios e requisitos. Nesse caso, considerando as disposições da Lei Complementar Estadual nº 129/2013, avalie se serão atribuídas aos policiais civis do Estado de Minas Gerais as seguintes verbas: I. Auxílio-natalidade, devido pelo nascimento de filho ou adoção, no valor da remuneração percebida pelo servidor na ocasião do nascimento ou da adoção, a ser paga à vista de certidão, admitida uma única percepção no caso de pai e mãe serem dos quadros da PCMG. II. Ajuda de custo, em caso de remoção de ofício ou a pedido ou designação para serviço ou estudo que importe em alteração do domicílio, no valor de um mês de vencimento do servidor. III. Translado ou remoção quando ferido, acidentado ou falecido em serviço. Está correto o que se apresenta em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e III, apenas.
(E) I, II e III.$q$,$q$D$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(29,$q$Lei Orgânica da Polícia Civil do Estado de Minas Gerais$q$,$q$Carlos, policial civil do Estado de Minas Gerais, pretende afastar- se de suas funções, sem prejuízo da remuneração, com o objetivo de frequentar determinado curso. Para tanto, o referido agente público buscou informações na legislação que trata da matéria. De acordo com a narrativa, avalie as afirmativas a seguir. I. O Chefe da PCMG poderá conceder afastamento ao policial civil, sem prejuízo da remuneração, para frequentar cursos relacionados com o exercício das funções do cargo ocupado pelo policial civil, pelo prazo de seis meses, prorrogável até o máximo de seis meses. II. O policial civil que tenha se afastado das funções para estudo, especialização ou aperfeiçoamento, sem prejuízo da remuneração ou com ônus para a PCMG, ficará obrigado a prestar serviços pelo menos por mais cinco anos após o período do afastamento ou a ressarcir o Estado da importância despendida, inclusive com o custeio da viagem, em conformidade com o disposto em regulamento. III. O policial civil afastado não pode exercer nenhuma de suas funções, ou outra, pública ou particular, diversa da que motivou o ato, sob pena de cassação do ato de afastamento e do imediato retorno às atividades. Nesse cenário, considerando as disposições da Lei Complementar Estadual nº 129/2013, está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$C$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(30,$q$Lei Orgânica da Polícia Civil do Estado de Minas Gerais$q$,$q$Matheus tomou conhecimento, por determinação do seu superior hierárquico, de que integrará comissão responsável pelo processamento de um pedido de revisão de pena aplicada no bojo de determinado processo administrativo disciplinar, sob o fundamento de que a decisão tomada foi contrária ao texto expresso na lei. Dessa forma, o referido agente público resolveu analisar a legislação de regência, com o objetivo de se atualizar sobre o instituto da revisão de processo administrativo. Nesse cenário, considerando as disposições da Lei Estadual nº 5.406/1969 (Lei Orgânica da Polícia Civil do Estado de Minas Gerais), assinale a afirmativa incorreta.
(A) A revisão poderá ser pedida pelo próprio punido ou por procurador legalmente habilitado, vedada, em caso de morte, a postulação por cônjuge sobrevivente.
(B) Aquele que houver integrado a comissão de processo administrativo será impedido de atuar na revisão.
(C) A Administração, julgada procedente a revisão, determinará a redução ou o cancelamento da pena.
(D) A revisão, que poderá verificar-se a qualquer tempo, não autoriza a agravação da pena.
(E) A simples alegação de injustiça da penalidade não constitui fundamento para revisão.$q$,$q$A$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(31,$q$Noções de Direito Administrativo$q$,$q$Antes de ser nomeado e empossado na qualidade de inspetor de polícia, Lucas, com o objetivo de melhor entender as funções que futuramente desempenhará, resolveu analisar como a Polícia Civil do Estado de Minas Gerais está inserida no contexto da Administração Pública. Considerando os entendimentos doutrinário e jurisprudencial dominantes, é correto afirmar que a Polícia Civil do Estado de Minas Gerais é
(A) um órgão público, integrante da Administração Pública Direta, fruto da desconcentração administrativa.
(B) um órgão público, integrante da Administração Pública Direta, fruto da descentralização administrativa.
(C) um órgão público, integrante da Administração Pública Indireta, fruto da desconcentração administrativa.
(D) uma autarquia, integrante da Administração Pública Indireta, fruto da desconcentração administrativa.
(E) uma autarquia, integrante da Administração Pública Indireta, fruto da descentralização administrativa.$q$,$q$A$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(32,$q$Noções de Direito Administrativo$q$,$q$Durante o cumprimento de uma diligência externa, determinada pela autoridade policial, Carlos, policial civil do Estado de Minas Gerais, agindo de forma negligente, acabou por atropelar um transeunte. Registre-se que, realizada perícia no local dos fatos, constatou-se que o pedestre não teve qualquer culpa para o advento do resultado danoso. Considerando as disposições da Constituição Federal e os entendimentos doutrinário e jurisprudencial dominantes, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) O Estado de Minas Gerais poderá ser responsabilizado, subsidiariamente, em razão da conduta praticada por Carlos, caso este não tenha capacidade para arcar com eventual indenização fixada em benefício do transeunte. ( ) A responsabilidade civil de Carlos, na qualidade de agente público, é objetiva, pressupondo-se a demonstração do elemento anímico. ( ) Para que a responsabilidade civil do Estado de Minas Gerais possa ser invocada, é necessário que se demonstre, em juízo, no que consistiu a conduta negligente de Carlos. As afirmativas são, respectivamente,
(A) V – F – V.
(B) F – F – F.
(C) V – V – F.
(D) F – V – F.
(E) V – V – V.$q$,$q$B$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (33,$q$Noções de Direito Administrativo$q$,$q$Após ser aprovado em concorrido concurso público, José passará, em breve, a atuar na qualidade de inspetor de polícia da Polícia Civil do Estado de Minas Gerais. Nesse cenário, considerando os entendimentos doutrinário e jurisprudencial dominantes, é correto afirmar que José será um servidor público
(A) estatutário, espécie de agente público de fato, ocupante de um emprego público.
(B) estatutário, espécie de agente público de direito, ocupante de um emprego público.
(C) estatutário, espécie de agente público de direito, ocupante de um cargo público.
(D) celetista, espécie de agente público de direito, ocupante de um cargo público.
(E) celetista, espécie de agente público de fato, ocupante de um cargo público.$q$,$q$C$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(34,$q$Noções de Direito Administrativo$q$,$q$Após longa investigação, a Polícia Civil apurou que o agente público João, em março de 2024, agindo com dolo, teria percebido vantagem econômica direta para facilitar a contratação de serviços por preço superior ao valor de mercado, por parte do Estado de Minas Gerais. De acordo com a narrativa e considerando as disposições da Lei nº 8.429/1992, analise as afirmativas a seguir. I. João praticou ato de improbidade administrativa que importa enriquecimento ilícito. II. No curso da ação judicial, será assegurado a João o direito de ser interrogado sobre os fatos de que trata a demanda, e a sua recusa ou o seu silêncio não implicarão confissão. III. Em caso de condenação em primeira instância, a sentença de procedência estará sujeita ao instituto do reexame obrigatório. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e II, apenas.
(E) I, II e III.$q$,$q$D$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(35,$q$Noções de Direito Administrativo$q$,$q$A autoridade competente, no âmbito da Polícia Civil de Minas Gerais, editou um decreto, com o objetivo de esmiuçar determinada legislação aprovada pela Assembleia Legislativa e sancionada pelo Governador do Estado, aplicável à referida instituição policial. Registre-se que, após alguns meses, descobriu-se que João, policial civil, havia descumprido, dolosamente, diversas determinações existentes no decreto. Com efeito, após a observância do contraditório e da ampla defesa, o agente público foi punido na esfera administrativa. Nesse cenário, considerando os entendimentos doutrinário e jurisprudencial dominantes, é correto afirmar que o decreto editado pela autoridade competente, no âmbito da Polícia Civil de Minas Gerais,
(A) é uma manifestação do poder regulamentar. Por sua vez, a punição suportada por João é fruto do poder disciplinar.
(B) é uma manifestação do poder regulamentar. Por sua vez, a punição suportada por João é fruto do poder de polícia.
(C) é uma manifestação do poder hierárquico. Por sua vez, a punição suportada por João é fruto do poder de polícia.
(D) é uma manifestação do poder de polícia. Por sua vez, a punição suportada por João é fruto do poder disciplinar.
(E) e a punição suportada por João são manifestações do poder de polícia.$q$,$q$A$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(36,$q$Noções de Direito Administrativo$q$,$q$Fábio, agente público, tomou conhecimento de que existe uma investigação em curso em seu detrimento, em razão da suposta prática de ato doloso de improbidade administrativa. O referido servidor, além de entrar em contato com um(a) advogado(a), passou a buscar informações junto à legislação de regência, em especial porque ele já teria sido punido pelo órgão de controle interno da sua instituição. De acordo com a narrativa e considerando as disposições da Lei nº 8.429/1992, analise as afirmativas a seguir. I. Na apuração dos ilícitos previstos na Lei de Improbidade Administrativa, será garantido ao investigado a oportunidade de manifestação por escrito e de juntada de documentos que comprovem suas alegações e auxiliem na elucidação dos fatos. II. As provas produzidas perante os órgãos de controle e as correspondentes decisões deverão ser consideradas na formação da convicção do Juiz, sem prejuízo da análise acerca do dolo na conduta do agente. III. As sanções eventualmente aplicadas em outras esferas deverão ser compensadas com as sanções aplicadas nos termos da Lei de Improbidade Administrativa. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e III, apenas.
(E) I, II e III.$q$,$q$E$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(37,$q$Noções de Direito Constitucional$q$,$q$Após amplos estudos realizados pelo Ministério competente, foi sugerido ao Presidente da República a apresentação de projeto de lei estabelecendo uma política pública especificamente direcionada a duas regiões do país, fundada em níveis de desenvolvimento humano, o que redundaria em direcionamento diferenciado de recursos e tratamento mais favorecido, quando cotejado com aquele dispensado às demais regiões. O presidente do partido político Alfa, que tem grande penetração nas regiões preteridas, solicitou que sua assessoria analisasse a sua compatibilidade com os objetivos fundamentais da República Federativa do Brasil. A assessoria esclareceu corretamente que a proposta
(A) não possui conformidade constitucional por destoar do objetivo fundamental de garantir o desenvolvimento nacional.
(B) deve ser veiculada por meio de emenda constitucional, de modo a excepcionar a exigência de tratamento igualitário entre os entes federativos.
(C) afronta a concepção de igualdade formal que deve reger o Estado de Direito, legitimando distinções de caráter arbitrário que buscarão amparo no subjetivismo do gestor.
(D) é expressamente vedada pela ordem constitucional, que exige uniformidade das políticas públicas promovidas por cada ente federativo no interior do seu território.
(E) se ajusta ao objetivo fundamental de reduzir as desigualdades sociais e regionais, ainda que redunde em tratamento inicial distinto entre as regiões do país.$q$,$q$E$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(38,$q$Noções de Direito Constitucional$q$,$q$De acordo com a Lei Federal nº X, a generalidade das pessoas maiores e capazes, que se encontrem no pleno gozo dos seus direitos políticos, deveria participar de determinada atividade de interesse coletivo desenvolvida pelas estruturas estatais de poder. A participação ocorreria mediante convocação e em caráter gratuito. Jonas foi convocado com base nesse diploma normativo, mas se sentiu extremamente desconfortável em atuar, pois a atividade a ser desenvolvida era francamente contrária à sua convicção política. Na situação descrita, consoante a ordem constitucional, é correto afirmar que Jonas
(A) praticará crime inafiançável, se não cumprir a obrigação legal a todos imposta.
(B) não pode eximir-se, em nenhuma hipótese, de cumprir obrigação legal a todos imposta.
(C) estará em harmonia com a juridicidade caso cumpra prestação alternativa fixada em lei.
(D) somente pode deixar de cumprir a obrigação legal, por motivo de crença religiosa, se a lei for inconstitucional.
(E) somente pode eximir-se de cumprir obrigação legal a todos imposta por motivo de crença religiosa, o que não é o caso.$q$,$q$C$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(39,$q$Noções de Direito Constitucional$q$,$q$João, cientista político, ao analisar as características do Estado de Direito Alfa, constatou que se trata de unidade existencial que apregoa uma concepção de máximo desenvolvimento material, ainda que redunde em sacrifício da liberdade individual. Ao analisar a referida característica à luz da finalidade do Estado, João concluiu corretamente que se está perante fins
(A) limitados.
(B) subjetivos.
(C) descritivos.
(D) expansivos.
(E) dogmáticos.$q$,$q$D$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(40,$q$Noções de Direito Constitucional$q$,$q$Foi identificada uma grave crise política no Município Beta, localizado no território do Estado Sigma e no qual está situado um importante porto nacional, de grande relevância estratégica para a exportação de determinado gênero alimentício. Por essa razão, diversas estruturas orgânicas federais se reuniram com o objetivo de apresentar ao Presidente da República proposta de decretação de intervenção federal no referido município. Com isso, almejavam evitar possíveis impactos na balança comercial brasileira. Ao fim da reunião, concluiu-se corretamente que
(A) a decretação da intervenção pressupõe prévia autorização do Supremo Tribunal Federal.
(B) em razão do nível federativo no qual os fatos ocorreram, a União não pode decretar a intervenção.
(C) a intervenção pode ser decretada, considerando que a narrativa não descreve típico interesse local.
(D) a decretação da intervenção pressupõe requerimento nesse sentido do Chefe do Poder Executivo de Beta.
(E) a intervenção pode ser decretada pelo Presidente da República independentemente da provocação de outro órgão.$q$,$q$B$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (41,$q$Noções de Direito Constitucional$q$,$q$O Secretário de Administração Penitenciária do Estado Alfa, autoridade máxima do sistema penitenciário e do seu órgão administrador, foi comunicado do início de uma rebelião na unidade prisional Kappa, no qual se encontravam os presos provisórios da região norte do Estado. Em razão desses acontecimentos, a assessoria do Secretário constatou a necessidade de ser reforçada a segurança no local, o que lhe foi devidamente comunicado. À luz da sistemática constitucional, é correto afirmar que o Secretário
(A) pode determinar que a polícia penal ou a polícia militar realize a segurança do local.
(B) pode determinar que a polícia penal, vinculada que é à Secretaria, realize a segurança do local.
(C) deve requerer ao Governador do Estado que determine à polícia penal a realização da segurança do local.
(D) deve requerer ao Comandante Geral da Polícia Militar que determine o comparecimento de efetivo ao local.
(E) deve requerer ao Governador do Estado que determine a realização da segurança do local, o que pode ser feito pela polícia penal ou pela polícia militar.$q$,$q$B$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(42,$q$Noções de Direito Constitucional$q$,$q$A Lei Federal nº X, com o objetivo de exasperar o combate ao crime organizado, dispôs que o silêncio dos investigados que se encontrem presos provisoriamente pela prática da infração penal de organização criminosa, bem como pela prática de crimes conexos, seria interpretado em seu desfavor. Esse diploma normativo, comemorado por alguns setores do ambiente sociopolítico, foi duramente criticado por outros. Considerando os balizamentos estabelecidos pela ordem constitucional, é correto afirmar que
(A) esse diploma normativo afronta o direito fundamental ao silêncio, de modo que a prova produzida com base na Lei Federal nº X é ilícita.
(B) a prova a ser obtida é lícita, na medida em que foi produzida em harmonia com a lei, logo, pode ser considerada pela autoridade competente.
(C) ainda que se trate de prova ilícita, pode ser considerada pela autoridade competente na medida em que se mostre relevante para a conclusão da investigação.
(D) a sistemática de combate às organizações criminosas não pode ser objeto de disciplina diferenciada, sob pena de afronta à isonomia, logo, a Lei Federal nº X é inconstitucional.
(E) o silêncio, enquanto projeção da personalidade individual, não é matéria afeta a padrões normativos, mas mera circunstância fática, que pode ser avaliada conforme a lei, logo, a Lei Federal nº X é constitucional.$q$,$q$A$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(43,$q$Noções de Direito Penal$q$,$q$Daniel, ao ter conhecimento de que um colega de trabalho foi vítima de determinado crime contra o patrimônio, ensejando elevado prejuízo financeiro, dirigiu-se a ele e, agindo com dolo, solicitou, para si, a quantia de três salários mínimos, a pretexto de influir em ato praticado por policiais civis da Delegacia de Polícia da cidade, com o objetivo de agilizar as investigações. Disse, por fim, que os referidos agentes públicos eram seus amigos há anos e que atenderiam ao seu pleito. Nesse cenário, considerando as disposições do Código Penal, é correto afirmar que Daniel responderá pelo crime de
(A) advocacia administrativa.
(B) exploração de prestígio.
(C) tráfico de influência.
(D) corrupção passiva.
(E) corrupção ativa.$q$,$q$C$q$,9,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(44,$q$Noções de Direito Penal$q$,$q$Após o encerramento da jornada de trabalho diária, Maria, maior e capaz, residente e domiciliada em Vespasiano/MG, ingressou em um coletivo com destino à sua casa, sentando-se ao lado de Luís, que ela desconhecia. Durante o trajeto do ônibus, Maria percebeu que o agente estava tocando suas próprias partes íntimas, enquanto olhava, incessantemente, para ela. Diante do intenso incômodo, a vítima pediu para que Luís interrompesse o comportamento em curso, mas ele deu continuidade à conduta, praticando ato libidinoso com o objetivo de satisfazer a própria lascívia. Nesse cenário, considerando as disposições do Código Penal, é correto afirmar que Luís responderá pelo crime de
(A) importunação sexual, com a incidência de uma causa de aumento de pena, já que a conduta ocorreu no interior de um transporte coletivo de passageiros.
(B) assédio sexual, com a incidência de uma causa de aumento de pena, já que a conduta ocorreu no interior de um transporte coletivo de passageiros.
(C) violação sexual mediante fraude, sem causas de aumento de pena.
(D) importunação sexual, sem causas de aumento de pena.
(E) assédio sexual, sem causas de aumento de pena.$q$,$q$D$q$,10,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(45,$q$Noções de Direito Penal$q$,$q$Em janeiro de 2025, no Município de Viçosa/MG, Jonas se aproximou de um transeunte e, mediante grave ameaça, consubstanciada no emprego de uma faca, determinou a entrega do seu telefone celular, sendo atendido. Em seguida, Jonas, na posse da res furtiva, correu, mas acabou sendo capturado em flagrante por um policial civil à paisana, três quarteirões depois. Sendo assim, a vítima logrou recuperar o bem móvel que havia sido levado. Nesse cenário, considerando as disposições do Código Penal, é correto afirmar que Jonas responderá pelo crime de
(A) extorsão tentada, sem a incidência de causas de aumento de pena, pois o emprego de arma branca deixou de ser majorante no referido delito.
(B) roubo tentado, sem a incidência de causas de aumento de pena, pois o emprego de arma branca deixou de ser majorante no referido delito.
(C) extorsão consumada, com a incidência da causa de aumento de pena atrelada ao emprego de arma branca.
(D) roubo tentado, com a incidência da causa de aumento de pena atrelada ao emprego de arma branca.
(E) roubo consumado, com a incidência da causa de aumento de pena atrelada ao emprego de arma branca.$q$,$q$E$q$,10,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(46,$q$Noções de Direito Penal$q$,$q$Lucas, investigador de polícia, cumprindo ordens da autoridade policial, compareceu ao imóvel de Matheus, localizado na cidade de Divinópolis/MG, com o objetivo de intimá-lo para ser ouvido em um inquérito policial em curso. Nesse contexto, ao tomar ciência dos fatos, Matheus, irritado e agindo com dolo de lesionar, desferiu dois socos no rosto de Lucas. Em razão da conduta praticada, o policial permaneceu afastado de suas funções por uma semana. Nesse cenário, considerando as disposições do Código Penal, é correto afirmar que Matheus responderá pelo crime de lesão corporal
(A) simples, sendo certo que a pena será aumentada de um a dois terços, já que a conduta foi praticada contra policial civil, no exercício da função.
(B) culposa, sendo certo que o fato de a vítima ser policial civil, no exercício da função, não dá azo ao aumento da pena.
(C) simples, sendo certo que o fato de a vítima ser policial civil, no exercício da função, não dá azo ao aumento da pena.
(D) gravíssima, já que a conduta foi praticada contra policial civil, no exercício da função.
(E) grave, já que a conduta foi praticada contra policial civil, no exercício da função.$q$,$q$A$q$,10,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(47,$q$Noções de Direito Penal$q$,$q$João, servidor público do Município de Belo Horizonte/MG, agindo com dolo, compareceu a uma delegacia de polícia, afirmando que Lucas, colega de repartição pública, estaria desviando bens públicos em proveito próprio. Registre-se que João tinha conhecimento da inocência de Lucas, mas agiu para prejudicá-lo. Instaurado um inquérito policial para apurar os fatos, constatou- se que as alegações eram falsas. Nesse cenário, considerando as disposições do Código Penal, é correto afirmar que João responderá pelo crime de
(A) comunicação falsa de crime, na modalidade qualificada, por envolver alegação de prática de crime contra a Administração Pública.
(B) denunciação caluniosa, na modalidade qualificada, por envolver alegação de prática de crime contra a Administração Pública.
(C) falso testemunho, na modalidade qualificada, por envolver alegação de prática de crime contra a Administração Pública.
(D) comunicação falsa de crime, na modalidade simples.
(E) denunciação caluniosa, na modalidade simples.$q$,$q$E$q$,10,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(48,$q$Noções de Direito Processual Penal$q$,$q$Encerrado o curso de formação na Academia de Polícia, João foi designado para atuar, na qualidade de plantonista, no norte do Estado de Minas Gerais. Nesse contexto, logo no início do primeiro plantão do referido agente público, a Polícia Militar encaminhou Caio, capturado em flagrante, à Delegacia de Polícia. De acordo com a narrativa, avalie as afirmativas a seguir. I. Apresentado o preso à autoridade competente, esta ouvirá o condutor e colherá, desde logo, sua assinatura, entregando- lhe a cópia do termo e o recibo de entrega do preso. Em seguida, procederá à oitiva das testemunhas que o acompanharem e ao interrogatório do acusado sobre a imputação que lhe é feita, colhendo, após cada oitiva, suas respectivas assinaturas, lavrando, a autoridade, afinal, o auto. II. A prisão de qualquer pessoa e o local onde se encontra serão comunicados, em até 24 horas, ao Ministério Público e à família do preso ou à pessoa por ele indicada. III. Em até 48 horas após a realização da prisão, será encaminhado ao Juiz competente o auto de prisão em flagrante e, caso o autuado não informe o nome de seu(sua) advogado(a), a cópia integral para a Defensoria Pública. Considerando as disposições do Código de Processo Penal, está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e III, apenas.
(E) I, II e III.$q$,$q$A$q$,11,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (49,$q$Noções de Direito Processual Penal$q$,$q$João, agindo com dolo, efetuou disparos de arma de fogo em Bruno, seu desafeto, o qual, imediatamente, faleceu, ensejando forte repercussão social na municipalidade. Assim que tiver conhecimento da infração penal, a autoridade policial pode, com base no Código de Processo Penal, assumir os procedimentos a seguir, à exceção de um. Assinale-o.
(A) Deverá colher informações sobre a existência de filhos, respectivas idades, se possuem alguma deficiência e o nome e o contato de eventual responsável pelos cuidados dos filhos, indicados pela pessoa presa.
(B) Deverá dirigir-se ao local, providenciando para que não se alterem o estado e a conservação das coisas, até a chegada dos peritos criminais.
(C) Deverá apreender os objetos que tiverem relação com o fato, após liberados pelos investigadores de polícia.
(D) Deverá determinar, se for o caso, que se proceda a exame de corpo de delito e a quaisquer outras perícias.
(E) Deverá colher todas as provas que servirem para o esclarecimento do fato e suas circunstâncias.$q$,$q$C$q$,11,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(50,$q$Noções de Direito Processual Penal$q$,$q$Jonas, recém-empossado no cargo de investigador de polícia, durante o curso de formação realizado na Academia de Polícia, participou de diversas palestras que tinham o inquérito policial como tema. Nesse cenário, considerando as disposições do Código de Processo Penal, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Depois de ordenado o arquivamento do inquérito pela autoridade judiciária, por falta de base para a denúncia, a autoridade policial não poderá proceder a novas pesquisas, inclusive se tiver notícia de outras provas. ( ) O Ministério Público não poderá requerer a devolução do inquérito à autoridade policial, senão para novas diligências, imprescindíveis ao oferecimento da denúncia. ( ) A autoridade policial não poderá mandar arquivar os autos de inquérito. As afirmativas são, respectivamente,
(A) V – F – V.
(B) F – V – F.
(C) V – V – F.
(D) V – V – V.
(E) F – V – V.$q$,$q$E$q$,11,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(51,$q$Noções de Direito Processual Penal$q$,$q$O direito de representação no contexto da ação penal, de acordo com o Código de Processo Penal, poderá ser exercido, pessoalmente ou por procurador, com poderes especiais. Em relação ao tema, avalie as afirmativas a seguir. I. Se com a representação forem oferecidos elementos que habilitem o Ministério Público a promover a ação penal, o órgão ministerial solicitará que o inquérito policial seja concluído no prazo de 15 dias, findo o qual oferecerá denúncia. II. Oferecida ou reduzida a termo a representação, a autoridade policial procederá a inquérito, ou, não sendo competente, remetê-lo-á à autoridade que o for. III. A representação conterá todas as informações que possam servir à apuração do fato e da autoria. Considerando as disposições do Código de Processo Penal, está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$D$q$,11,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(52,$q$Noções de Direito Processual Penal$q$,$q$Acerca da teoria geral da prova, segundo o Código de Processo Penal, avalie as afirmativas a seguir. I. O Juiz formará sua convicção pela livre apreciação da prova produzida em contraditório judicial, não podendo fundamentar sua decisão exclusivamente nos elementos informativos colhidos na investigação, ressalvadas as provas cautelares, não repetíveis e antecipadas. II. São inadmissíveis, devendo ser desentranhadas do processo, as provas ilícitas, assim entendidas aquelas obtidas em violação a normas constitucionais ou legais. III. Preclusa a decisão de desentranhamento da prova declarada inadmissível, esta será inutilizada por decisão judicial, facultado às partes acompanhar o incidente. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$E$q$,12,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(53,$q$Noções de Legislação Penal e Processual Extravagante$q$,$q$Após ser agredida, física e verbalmente, por seu companheiro, Maria, rompendo com o ciclo de violência existente, resolve se encaminhar à Delegacia de Polícia, onde pretende narrar o ocorrido. Considerando as disposições da Lei nº 11.340/2006, avalie se a inquirição de Maria deve seguir as diretrizes abaixo: I. A garantia de que, em nenhuma hipótese, ela terá contato direto com investigados ou suspeitos ou com pessoas a eles relacionadas. II. A não revitimização da depoente, evitando sucessivas inquirições sobre o mesmo fato nos âmbitos criminal, cível e administrativo, bem como questionamentos sobre a vida privada. III. A salvaguarda da integridade física, psíquica e emocional da depoente, considerada a sua condição peculiar de pessoa em situação de violência doméstica e familiar. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$E$q$,12,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(54,$q$Noções de Legislação Penal e Processual Extravagante$q$,$q$Fábio, reincidente em crime doloso, cumpre pena definitiva, em regime fechado, pela prática do crime de roubo circunstanciado pelo emprego de arma de fogo. No curso da execução penal, sobrevém o falecimento do cônjuge do apenado. Nesse cenário, considerando as disposições da Lei de Execução Penal, é correto afirmar que Fábio
(A) tem direito à permissão de saída, que será concedida pelo diretor do estabelecimento onde se encontra preso.
(B) tem direito à saída temporária, que será concedida pelo diretor do estabelecimento onde se encontra preso.
(C) tem direito à saída temporária, mediante escolta, perdurando pelo tempo necessário à finalidade da saída.
(D) não tem direito à permissão de saída, por estar cumprindo pena em regime fechado.
(E) não tem direito à permissão de saída, por ser reincidente em crime doloso.$q$,$q$A$q$,12,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(55,$q$Noções de Legislação Penal e Processual Extravagante$q$,$q$Após ser capturado em flagrante com 500 pinos de cocaína, em local dominado pelo tráfico de drogas, Mário foi encaminhado, por policiais militares, à Delegacia de Polícia de plantão. Sobre a hipótese narrada, considerando as disposições da Lei nº 11.343/2006, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Para efeito da lavratura do auto de prisão em flagrante e do estabelecimento da materialidade do delito, é suficiente o laudo de constatação da natureza e quantidade da droga, firmado por perito oficial ou, na falta deste, por duas pessoas idôneas. ( ) Recebida a cópia do auto de prisão em flagrante, o Juiz, no prazo de dez dias, certificará a regularidade formal do laudo de constatação e determinará a destruição das drogas apreendidas, guardando-se amostra necessária à realização do laudo definitivo. ( ) A destruição das drogas será executada pelo Delegado de Polícia competente no prazo de 30 dias na presença do Juiz, do Ministério Público e da autoridade sanitária. As afirmativas são, respectivamente,
(A) V – F – V.
(B) V – V – V.
(C) F – V – F.
(D) F – F – F.
(E) F – V – V.$q$,$q$C$q$,12,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(56,$q$Noções de Legislação Penal e Processual Extravagante$q$,$q$De acordo com a Lei nº 12.850/2013, a infiltração de agentes de polícia em tarefas de investigação, representada pelo Delegado de Polícia ou requerida pelo Ministério Público, após manifestação técnica do Delegado de Polícia quando solicitada no curso de inquérito policial, será precedida de circunstanciada, motivada e sigilosa autorização judicial, que estabelecerá seus limites. De acordo com a narrativa e considerando as disposições da Lei nº 12.850/2013, avalie as afirmativas a seguir. I. No curso do inquérito policial, o Delegado de Polícia poderá determinar aos seus agentes, e o Ministério Público poderá requisitar, a qualquer tempo, relatório da atividade de infiltração. II. A infiltração será autorizada pelo prazo de seis meses, prorrogável uma única vez, por igual período, desde que comprovada sua necessidade. III. Na hipótese de representação do Delegado de Polícia, o Juiz competente, antes de decidir, ouvirá o Ministério Público. Está correto o que se afirme em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$C$q$,13,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (57,$q$Noções de Direitos Humanos$q$,$q$Assinale a opção que apresenta corretamente uma característica dos Direitos Humanos, aqueles direitos essenciais e indispensáveis à vida digna.
(A) Renunciabilidade, pois o titular do direito pode abdicar do seu exercício.
(B) Alienabilidade, uma vez que podem ser objetos de ação indenizatória, quando violados.
(C) Essencialidade, em razão de serem essenciais por natureza, do ponto de vista material e formal.
(D) Prescritibilidade, posto que devem ser exercidos em um determinado período, sob pena de preclusão.
(E) Dependência, uma vez que são direitos autônomos, que são exercidos de forma independente, um dos outros.$q$,$q$C$q$,13,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(58,$q$Noções de Direitos Humanos$q$,$q$O Estado Brasileiro integra o Sistema Interamericano de Direitos Humanos. Nesse contexto, assinale a afirmativa correta.
(A) O Sistema interamericano de Direitos Humanos é composto pela Comissão Interamericana de Direitos Humanos e pela Corte Internacional de Justiça.
(B) A Convenção Interamericana contra o Racismo, a Discriminação Racial e Formas Correlatas de Intolerância foi incorporada pelo Brasil com status de emenda constitucional.
(C) A sentença do Caso Favela Nova Brasília para ser válida, precisa ser homologada pelo Superior Tribunal de Justiça, conforme o rito das sentenças estrangeiras.
(D) A Declaração Americana de Direitos Humanos é o instrumento normativo fundamental da Organização dos Estados Americanos.
(E) O sistema interamericano pode ser acionado por qualquer cidadão, que tenha um direito humano violado, que sempre terá seu caso diretamente julgado pela Corte DH.$q$,$q$B$q$,13,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(59,$q$Noções de Direitos Humanos$q$,$q$O Estado Brasileiro faz parte do Sistema Global de Proteção dos Direitos Humanos, decorrente da Organização das Nações Unidas (ONU). Sobre este assunto, assinale a afirmativa correta.
(A) A Declaração Universal dos Direitos Humanos é norma jurídica de observância obrigatória por todos os Estados que a ratificaram.
(B) O Pacto Internacional sobre direitos civis e políticos foi incorporado automaticamente no âmbito interno do Brasil, com a sua ratificação perante a ONU.
(C) O Caso Alyne Pimentel é um caso de condenação do Brasil sobre morte materna proferida pelo Comitê pela Eliminação de Todas as Formas de Discriminação contra a Mulher.
(D) Com a criação das Nações Unidas, os Estados integrantes do Sistema ONU se obrigaram a observar os Direitos Humanos previstos nos tratados aprovados por aquele colegiado.
(E) A Convenção sobre os direitos da Criança é um exemplo de normativa que foi ratificada, sem ressalvas, por todos os Estados-membros da ONU.$q$,$q$X$q$,13,$q$annulled$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(60,$q$Noções de Direitos Humanos$q$,$q$A Emenda Constitucional nº 45/2004 aprimorou as regras de internalização dos tratados internacionais sobre Direitos Humanos. Sobre essa temática, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Prevalece o entendimento do Supremo Tribunal Federal de que, após o advento da EC nº 45/2004, todos os tratados de Direitos Humanos têm natureza de norma constitucional. ( ) Os tratados e convenções internacionais sobre Direitos Humanos que forem aprovados, em cada Casa do Congresso Nacional, em dois turnos, por três quintos dos votos dos respectivos membros, serão equivalentes às emendas constitucionais. ( ) Os tratados e convenções de Direitos Humanos ratificados pelo Brasil não precisam ser aprovados pelo Congresso Nacional, tendo em vista o disposto no Art. 5º, § 1º, da Constituição Federal. As afirmativas são, respectivamente,
(A) F – V – F.
(B) F – F – V.
(C) F – F – F.
(D) V – V – F.
(E) V – F – V.$q$,$q$A$q$,13,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(61,$q$Noções de Medicina Legal$q$,$q$Sobre perícia, como o conjunto de procedimentos técnicos que tem como finalidade o esclarecimento de um fato à Justiça, assinale a afirmativa correta.
(A) O laudo pericial sempre será um documento sigiloso.
(B) A perícia não pode ser negada às partes pelo Juiz ou autoridade policial.
(C) O Juiz não ficará adstrito ao laudo, podendo rejeitá-lo no todo ou em partes.
(D) A perícia pode ser substituída pela confissão do acusado, mesmo quando a infração deixar vestígios.
(E) A perícia é um ato de instrução exclusivo da fase de inquérito policial, não podendo ser realizada na fase processual penal.$q$,$q$C$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(62,$q$Noções de Medicina Legal$q$,$q$Relacione as etapas do rastreamento do vestígio que compõem a cadeia de custódia, listadas a seguir, às respectivas características. 1. Fixação 2. Isolamento 3. Reconhecimento 4. Descarte 5. Processamento ( ) Ato de distinguir um elemento como de potencial interesse para a produção da prova pericial. ( ) Descrição detalhada do vestígio, como foi encontrado na cena do crime. ( ) Ato pericial propriamente dito, manipulação do vestígio e confecção do laudo. ( ) Ato de evitar que se altere o estado das coisas, preservando o ambiente imediato, mediato e relacionado aos vestígios do local de crime. ( ) Liberação do vestígio mediante autorização judicial. Assinale a opção que apresenta a relação correta, segundo a ordem apresentada.
(A) 1 – 3 – 4 – 5 – 2.
(B) 2 – 1 – 5 – 3 – 4.
(C) 2 – 5 – 1 – 4 – 3.
(D) 3 – 1 – 5 – 2 – 4.
(E) 3 – 2 – 1 – 5 – 4.$q$,$q$D$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(63,$q$Noções de Medicina Legal$q$,$q$Sobre a identificação humana, assinale a afirmativa incorreta.
(A) O exame de DNA é sempre a melhor opção para a identificação de remanescentes humanos.
(B) O exame odontológico para identificação depende do confronto de informações ante mortem e post mortem.
(C) Os ossos do crânio e da pelve permitem a estimativa do sexo do indivíduo por métodos não métricos ou morfológicos.
(D) A primeira fase da identificação necropapiloscópica busca coincidências entre as figuras delta, arco, presilhas externa e interna e verticilo.
(E) São necessários doze pontos coincidentes e nenhum excludente para a comprovação da identificação necropapiloscópica.$q$,$q$A$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(64,$q$Noções de Medicina Legal$q$,$q$Os elementos da balística terminal são importantes para estimar a distância entre a vítima e o atirador. Sobre o anel de Fisch, assinale a afirmativa correta.
(A) Só existe em disparos a curta distância.
(B) Corresponde aos orifícios de saída de arma longa.
(C) É formado por orla de equimose, escoriação e enxugo.
(D) Está presente em orifícios de entrada com cano encostado.
(E) É formado por zonas de tatuagem, queimadura e esfumaçamento.$q$,$q$C$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Investigador de Polícia I$q$,2025,$q$Investigador de Polícia I$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (65,$q$Noções de Medicina Legal$q$,$q$A tanatologia forense estuda, por meio da cronotanatognose, a sequência de fenômenos cadavéricos para determinação da hora da morte. Sobre esse período, assinale a afirmativa correta.
(A) O resfriamento é o primeiro sinal de morte.
(B) A putrefação tem início após 48 horas de morte.
(C) A rigidez cadavérica é o primeiro sinal de certeza de morte.
(D) A rigidez cadavérica e a putrefação são sinais precoces de morte.
(E) O período de incerteza corresponde às primeiras seis horas após a morte.$q$,$q$E$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(66,$q$Noções de Criminologia$q$,$q$O fenômeno criminológico que se refere à estatística de crimes cometidos por funcionários públicos contra vítimas que não denunciam o fato por temor de represálias é denominado:
(A) Cifra negra.
(B) Cifra amarela.
(C) Cifra dourada.
(D) Cifra verde.
(E) Cifra cinza.$q$,$q$B$q$,14,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(67,$q$Noções de Criminologia$q$,$q$No que se refere às Escolas da Criminologia, assinale a afirmativa correta.
(A) A Escola Clássica da Criminologia tinha como principal expoente Cesare Lombroso.
(B) A Escola da Criminologia Crítica tem como principal objeto de estudo o delinquente.
(C) A Criminologia Radical rechaça a metodologia interdisciplinar.
(D) A Teoria do Etiquetamento Penal preconiza a noção de atavismo.
(E) A Escola da Criminologia Positivista baseia-se no paradigma etiológico.$q$,$q$E$q$,14,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(68,$q$Noções de Criminologia$q$,$q$Pierri participou de um congresso sobre Criminologia. Nos grupos de trabalho, algumas apresentações de estudantes lhe chamaram a atenção. São elas: I. “O discurso Tolerância Zero surgiu a partir da política de segurança pública implementada na Colômbia a partir de 1994.” II. “O Direito Penal do Inimigo é a teoria cunhada pelo jurista alemão Claus Roxin que preconiza dois direitos penais.” III. “A Política Criminal Atuarial se baseia em análises quantitativas e previsões estatísticas com foco na prevenção do delito.” IV. “O Direito Penal Mínimo defende a limitação do poder punitivo com respeito aos direitos e às garantias fundamentais.” Analisando o conteúdo acima descrito, conclui-se que está correto o que se afirma em
(A) I, III e IV.
(B) II, III e IV.
(C) I, II e III.
(D) IV, apenas.
(E) III e IV, apenas.$q$,$q$E$q$,15,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(69,$q$Noções de Criminologia$q$,$q$Com relação aos modelos de prevenção ao delito, assinale a afirmativa correta.
(A) A implementação de políticas públicas de saúde, de educação e de saneamento básico é compreendida como prevenção secundária ao delito.
(B) Entende-se por prevenção primária o monitoramento de grupos sociais mais propensos à prática delitiva.
(C) A prevenção terciária pretende evitar a reincidência criminal por meio de políticas voltadas à ressocialização do apenado.
(D) O modelo de prevenção integral ou integrada preconiza a redução da criminalidade apenas por meio de políticas criminais.
(E) Os programas de prevenção primária e secundária devem ser implementados pelas instituições policiais.$q$,$q$C$q$,15,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(70,$q$Noções de Criminologia$q$,$q$Acerca do conceito de Criminologia e saberes penais afins, relacione os enunciados aos respectivos termos. I. Estudo empírico e interdisciplinar que se propõe a explicar as causas da criminalidade. II. Se refere ao conjunto de medidas e programas governamentais voltados à prevenção e à repressão do delito. III. Compreende o arcabouço de normas e princípios que estabelecem os crimes e suas respectivas sanções. ( ) Dogmática Penal ( ) Política Criminal ( ) Criminologia Assinale a opção que indica a relação correta, na ordem apresentada.
(A) III – II – I.
(B) III – I – II.
(C) II – III – I.
(D) II – I – III.
(E) I – II – III. Realização$q$,$q$A$q$,15,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/investigador-de-policia-icns401-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpinvestigador.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Investigador de Polícia I$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@
