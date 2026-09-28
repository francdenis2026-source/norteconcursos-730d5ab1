-- Importação das provas objetivas da FGV (PC-SC 2024 e PC-MG 2025). Gerado por scripts/review/import_fgv.py.

-- Polícia Civil de Minas Gerais – Médico-Legista (2025): 80 itens extraídos, 80 no gabarito; sem gabarito: []; gabarito além dos itens: []

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro',$q$Prova objetiva (Tipo 1) – Polícia Civil de Minas Gerais – Médico-Legista (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$,'vigente',$q$Caderno oficial aplicado em 26/01/2025; publicado pela banca.$q$),
('outro',$q$Gabarito oficial definitivo (Tipo 1) – Polícia Civil de Minas Gerais – Médico-Legista (2025, FGV)$q$,$q$FGV$q$,$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$,'vigente',$q$Gabarito definitivo publicado pela banca; * = questão anulada.$q$)
on conflict (url) do update set checked_at=now(), status=excluded.status;
-- @@

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select $q$Polícia Civil de Minas Gerais$q$,$q$Médico-Legista$q$,2025,$q$FGV$q$,id,'active' from public.content_sources where url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id;
-- @@

insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select ed.id,$q$Histórico 2025$q$,v.d,v.o,$q$Conteúdo cobrado na prova de 2025 (levantado do caderno); edital a cotejar antes de qualquer publicação.$q$,'under_review'
from (select id from public.syllabus_editions where contest_name=$q$Polícia Civil de Minas Gerais$q$ and role_name=$q$Médico-Legista$q$ and contest_year=2025) ed cross join (values ($q$Língua Portuguesa$q$,1),($q$Direito Administrativo$q$,2),($q$Direito Constitucional$q$,3),($q$Direitos Humanos$q$,4),($q$Lei Orgânica da PCMG$q$,5),($q$Medicina Legal$q$,6),($q$Toxicologia Forense$q$,7),($q$Patologia$q$,8),($q$Psiquiatria Forense$q$,9)) v(d,o)
on conflict (edition_id,discipline,topic_order) do nothing;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (1,$q$Língua Portuguesa$q$,$q$Analise o cartaz a seguir. Sobre o cartaz, assinale a afirmativa correta.
(A) Há dois erros formais no título do cartaz.
(B) A vida está representada pela velha torneira.
(C) Como indicado na imagem, nosso bem mais precioso são as crianças.
(D) As folhas nascendo da torneira mostram o abandono do cuidado com a água.
(E) As árvores grandes seguidas das pequenas indicam o futuro das plantas sem a água.$q$,$q$A$q$,3,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(2,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta o segmento que se insere entre os textos narrativos.
(A) Levantei-me, comi, dormi: eis um dia de vida.
(B) Se vocês têm a força, a nós nos resta o direito.
(C) Não há maior escravidão que uma grande carreira.
(D) Poucas vezes quem ganha o que não merece agradece o que ganha.
(E) Quem é fiel nas coisas mínimas é fiel também no muito, e quem é iníquo no mínimo é iníquo também no muito.$q$,$q$A$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(3,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta o texto publicitário ou propagandístico que apela para a intimidação do leitor.
(A) Faça o bem sem olhar a quem.
(B) Se gosta de seu filho, vacine-o!
(C) Ama o teu próximo como a ti mesmo.
(D) Leia! O futuro é do conhecimento!
(E) Amor de mãe não tem limite.$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(4,$q$Língua Portuguesa$q$,$q$Assinale a frase que mostra um problema gramatical em sua construção.
(A) A letra mata, o espírito vivifica.
(B) Odeio vítimas que respeitam seus carrascos.
(C) O que os olhos não veem, o coração pressente.
(D) O espírito conduz o mundo, e não a inteligência.
(E) Aceite as mudanças. Vai acontecer, você goste ou não.$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(5,$q$Língua Portuguesa$q$,$q$Entre os tipos de documentos a seguir selecionados, assinale o que mostra uma definição adequada.
(A) Ofício: comunicação escrita e formal entre autoridades da mesma categoria, ou de inferiores a superiores hierárquicos.
(B) Memorando: petição redigida dentro das formalidades legais.
(C) Requerimento: narração mais ou menos minuciosa daquilo que se viu ou observou.
(D) Relatório: opinião fundamentada sobre determinado assunto, emitido por especialista.
(E) Parecer: nota diplomática de uma nação para outra sobre o estado de uma questão.$q$,$q$A$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(6,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta a frase que foi construída com base em uma outra frase bastante conhecida.
(A) Cínico é o homem que sabe o valor de tudo e o valor de nada.
(B) Cinismo é uma maneira desagradável de dizer a verdade.
(C) Saúde e paz! Todo o resto vem atrás!
(D) Os tabus são feitos para serem quebrados.
(E) É impossível ser maravilhoso sempre!$q$,$q$C$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(7,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta a frase que exemplifica o discurso indireto.
(A) Não existe travesseiro mais macio do que uma consciência limpa.
(B) Já disseram que nada parece interessante quando é nosso.
(C) Meias-verdades são as mais espertas mentiras.
(D) Faça amigos. É uma segunda existência.
(E) Necessidade é a mãe da atração.$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(8,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta a frase que não mostra antônimos em sua composição.
(A) É mais fácil perdoar um inimigo que um amigo.
(B) Perdoar é cristão, mas esquecer é de sem-vergonha.
(C) O melhor do novo é que responde a um desejo antigo.
(D) Perde merecidamente o próprio quem cobiça o alheio.
(E) Odiar o próximo deve ser uma das boas razões para amar.$q$,$q$B$q$,3,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (9,$q$Língua Portuguesa$q$,$q$Assinale a opção que apresenta a frase inteiramente construída em linguagem lógica (não figurada).
(A) Ceticismo é um suicídio lento.
(B) Ter a consciência limpa é ter a memória fraca.
(C) Observa, escuta, cala, julga pouco, pergunta muito.
(D) Se quereis triunfar no mundo, matai vossa consciência.
(E) O conformismo é o carcereiro da liberdade e o inimigo do crescimento.$q$,$q$C$q$,3,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(10,$q$Língua Portuguesa$q$,$q$Assinale a frase que se mostra inteiramente correta em termos de pontuação.
(A) Há apenas o nariz, entre o riso e a lágrima.
(B) Pessoas felizes, não acreditam em milagres.
(C) Se tivesse que fazê-lo, uma vez mais eu o faria.
(D) O ódio é sempre mais clarividente, e mais engenhoso do que a amizade.
(E) Não sei quem foi meu avô, estou muito preocupado em saber: qual vai ser o futuro do neto dele.$q$,$q$C$q$,4,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(11,$q$Direito Administrativo$q$,$q$A Administração Pública, em seu sentido subjetivo, compreende as pessoas jurídicas e seus respectivos órgãos que executam atividades administrativas. A respeito do tema, assinale a opção correta.
(A) A administração direta compreende o terceiro setor, com exceção das organizações sociais.
(B) A administração indireta corresponde aos órgãos públicos dos Entes federativos criados por meio da desconcentração.
(C) A administração direta compreende as entidades que exercem funções administrativas, criadas por meio da descentralização.
(D) A desconcentração representa a transferência da atividade administrativa para outra pessoa, física ou jurídica, integrante ou não do aparelho estatal.
(E) A administração indireta é composta por entidades administrativas, criadas por descentralização legal e vinculadas ao respectivo Ente federado.$q$,$q$E$q$,4,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(12,$q$Direito Administrativo$q$,$q$Acerca da responsabilidade civil do Estado, assinale a afirmativa correta.
(A) Adota-se como regra a teoria do risco integral para embasar a responsabilidade civil do Estado.
(B) A teoria do risco administrativo não admite causas excludentes do nexo de causalidade.
(C) A conduta comissiva ou omissiva atribuída ao Poder Público, o dano e o nexo causal são elementos da responsabilidade civil objetiva do Estado.
(D) A propositura de ação contra o Estado para discutir a sua responsabilidade civil só é possível se houver identificação do agente público responsável pela conduta.
(E) Às pessoas jurídicas de direito privado, que prestam serviços públicos, não se aplica a responsabilidade objetiva, uma vez que não compõem a Administração Pública.$q$,$q$C$q$,4,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(13,$q$Direito Administrativo$q$,$q$Assinale a opção que apresenta a conduta de improbidade administrativa que atenta contra os princípios da Administração Pública, prevista no Art. 11 da Lei nº 8.429/1992.
(A) Permitir, facilitar ou concorrer para que terceiro se enriqueça ilicitamente.
(B) Conceder benefício administrativo ou fiscal sem a observância das formalidades legais ou regulamentares aplicáveis à espécie.
(C) Receber vantagem econômica de qualquer natureza, direta ou indiretamente, para omitir ato de ofício, providência ou declaração a que esteja obrigado.
(D) Negar publicidade aos atos oficiais, exceto em razão de sua imprescindibilidade para a segurança da sociedade e do Estado ou de outras hipóteses instituídas em lei.
(E) Revelar fato ou circunstância de que tem ciência em razão das atribuições e que deva permanecer em segredo, ainda que não haja beneficiamento por informação privilegiada ou risco à segurança da sociedade e do Estado.$q$,$q$D$q$,4,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(14,$q$Direito Administrativo$q$,$q$Assinale a opção que apresenta, corretamente, princípios do serviço público.
(A) Seletividade, eficiência e segurança.
(B) Continuidade, igualdade e modicidade.
(C) Imutabilidade, generalidade e cortesia.
(D) Neutralidade, seletividade e atualidade.
(E) Continuidade, imutabilidade e seletividade.$q$,$q$B$q$,4,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(15,$q$Direito Administrativo$q$,$q$Assinale a opção que apresenta uma manifestação do poder de polícia.
(A) A edição de atos administrativos gerais para fiel execução das leis.
(B) A punição de agentes públicos que cometeram infração funcional.
(C) A aplicação de multa contratual à empresa contratada pela administração.
(D) A fiscalização dos hospitais particulares por órgãos da vigilância sanitária.
(E) A edição, pelo Presidente do Tribunal de Justiça no exercício de sua função atípica, de atos administrativos que deverão ser observados pelos servidores subordinados.$q$,$q$D$q$,4,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(16,$q$Direito Constitucional$q$,$q$Maria, de nacionalidade austríaca, encontra-se no território brasileiro desde meados do último ano. Em razão de sua integração, ainda que temporária, à sociedade brasileira, buscou se inteirar em relação aos direitos fundamentais de estatura constitucional que possui. Após analisar a Constituição da República, Maria concluiu corretamente que
(A) tem os mesmos direitos dos brasileiros natos.
(B) tem os mesmos direitos dos brasileiros naturalizados.
(C) não tem sua esfera jurídica alcançada pelos direitos fundamentais.
(D) possui os direitos fundamentais não privativos de brasileiros, natos ou naturalizados.
(E) tem os direitos fundamentais assegurados no ato que admitiu sua residência no território nacional.$q$,$q$D$q$,5,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (17,$q$Direito Constitucional$q$,$q$Com o objetivo de obter recursos para a aquisição de determinado bem, Pedro celebrou contrato de cessão fiduciária em garantia, no qual transferiu, à instituição financeira que lhe disponibilizou os recursos necessários, a titularidade do bem adquirido. O bem, no entanto, permaneceu em poder de Pedro. Em razão de atrasos no pagamento das prestações acordadas, Pedro recebeu uma notificação extrajudicial informando que a não quitação da dívida acarretaria a necessidade de devolver o bem que estava em seu poder, sendo que a negativa de devolução poderia causar a sua prisão. Ao receber a notificação e analisar a sistemática vigente, Pedro concluiu corretamente que
(A) pode ser preso, salvo se for pessoa idosa.
(B) pode ser preso, caso se torne depositário infiel.
(C) não pode ser preso, pois não há prisão civil por dívida.
(D) não pode ser preso, considerando a natureza da dívida descrita no enunciado.
(E) não pode ser preso, pois a prisão somente é admitida por ordem escrita e fundamentada de autoridade judiciária.$q$,$q$D$q$,5,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(18,$q$Direito Constitucional$q$,$q$Uma sociedade empresária dedicada à produção de radioisótopos a serem utilizados para pesquisa e uso médicos, ao acondicionar os resíduos da matéria-prima utilizada, para fins de transporte e descarte, não vinha adotando as medidas de segurança necessárias, o que gerou danos ao meio ambiente. Irresignada com essa situação, Joana, vereadora no município no qual estava situada a sede da referida sociedade, consultou um advogado em relação à ação passível de ser ajuizada por ela para que esse estado de coisas seja alterado e a sociedade empresária condenada a ressarcir os danos causados. O advogado informou corretamente que
(A) pode ser ajuizada ação popular.
(B) pode ser ajuizada ação civil pública.
(C) pode ser impetrado mandado de segurança coletivo.
(D) somente pode ser formulada representação ao Ministério Público, não cabendo a Joana ajuizar uma ação, por se tratar de direito coletivo.
(E) somente pode ser exercido o direito de petição, junto à estrutura de poder que permitiu a atuação da sociedade empresária, não cabendo a Joana ajuizar uma ação.$q$,$q$A$q$,5,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(19,$q$Direito Constitucional$q$,$q$Lideranças políticas dos Municípios Alfa e Beta, situados no Estado Sigma, iniciaram um debate público no qual sustentavam que o primeiro desses municípios deveria ser incorporado ao segundo. Em razão da plena aceitação da proposta no ambiente sociopolítico, analisaram a Constituição da República de 1988 e constataram que, sem prejuízo de outras exigências previstas na ordem jurídica, a referida incorporação pressupõe
(A) a edição de leis municipais no âmbito de Alfa e Beta.
(B) o referendo das populações dos municípios envolvidos.
(C) a edição de lei complementar estadual autorizativa da incorporação.
(D) a realização pela Assembleia Legislativa de Sigma, de estudo de viabilidade municipal.
(E) a realização de consulta prévia às populações dos municípios envolvidos, no período fixado em lei complementar federal.$q$,$q$E$q$,5,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(20,$q$Direito Constitucional$q$,$q$Em razão de uma onda de crimes contra a pessoa praticados na região norte do Estado Kappa, o Governador do Estado, em coletiva de imprensa, informou que determinou, ao Ministério Público (MP) e à Polícia Civil (PC) do Estado, a adoção das providências imediatas visando à identificação dos autores dos referidos crimes, com a designação do quantitativo de agentes que definiu, para viabilizar a realização desse objetivo. À luz da sistemática constitucional, a “determinação” exarada pelo Chefe do Poder Executivo Estadual I. é vinculante apenas para o MP. II. é vinculante apenas para a PC. III. é vinculante para o MP e para a PC. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$B$q$,5,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(21,$q$Direitos Humanos$q$,$q$Sobre a teoria geral dos direitos humanos, assinale a afirmativa correta.
(A) Os direitos humanos são alienáveis, tendo em vista que podem ser atribuídos valores para fins de venda.
(B) Direitos fundamentais e direitos humanos são sinônimos, uma vez que são aqueles previstos em normas internacionais na defesa da dignidade da pessoa humana.
(C) A ideia de que os direitos humanos são indivisíveis decorre do reconhecimento de que possuem a mesma proteção jurídica, sendo essenciais para uma vida digna.
(D) Um dos princípios basilares dos direitos humanos é a universalidade, uma vez que todo cidadão pode exercer o seu direito, mesmo que em detrimento de outrem.
(E) A teoria jusnaturalista busca explicar os direitos humanos como aqueles que decorrem do ordenamento jurídico produzido pelo homem, que regula os fatos da natureza.$q$,$q$C$q$,5,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(22,$q$Direitos Humanos$q$,$q$A Agenda 2030 é um plano de ação global para promover o desenvolvimento sustentável, erradicar a pobreza e promover vida digna para todos, até 2030. Sobre essa temática, avalie as afirmativas a seguir. I. A Agenda 2030 é composta por 17 objetivos de desenvolvimento sustentável, entre eles a erradicação da pobreza, segurança alimentar, saúde, educação e igualdade de gênero. II. O Brasil propôs um 18º ODS, que se compromete pela busca da igualdade étnico-racial. III. A inobservância dos objetivos previstos na Agenda 2030 acarretam sanção ao Estado-parte pelas Nações Unidas. IV. A Agenda 2030 está de acordo com os objetivos fundamentais da República Federativa do Brasil. Está correto o que se afirma em
(A) II e IV, apenas.
(B) I, II e III, apenas.
(C) I, III e IV, apenas.
(D) I, II e IV, apenas.
(E) I, II, III e IV.$q$,$q$D$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(23,$q$Direitos Humanos$q$,$q$A Constituição da República de 1988 é o principal instrumento de reconhecimento e fortalecimento da democracia na República Federativa do Brasil, consolidando diversos direitos e garantias fundamentais. Sobre essa temática, avaie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) A lei punirá qualquer discriminação atentatória dos direitos e das liberdades fundamentais. ( ) A lei penal não retroagirá nas hipóteses previstas na Constituição Federal de 1988. ( ) Ninguém será submetido à tortura nem a tratamento desumano ou degradante, salvo nos casos previstos em lei que configurem estado de necessidade. As afirmativas são, respectivamente,
(A) F – V – F.
(B) F – F – V.
(C) V – F – F.
(D) V – V – F.
(E) V – F – V.$q$,$q$C$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(24,$q$Direitos Humanos$q$,$q$O Brasil integra o Sistema Global e o Sistema Interamericano de Proteção dos Direitos Humanos. Nesse contexto, assinale a afirmativa correta.
(A) A Comissão Interamericana de direitos humanos é o órgão jurisdicional que compõe o sistema interamericano de direitos humanos.
(B) Com o advento da Constituição Federal de 1988, a prisão civil de depositário infiel, qualquer que seja a modalidade de depósito, é considerada lícita.
(C) O Tribunal Penal Internacional, que integra o sistema interamericano de direitos humanos, tem competência jurisdicional reconhecida pelo Estado brasileiro.
(D) A Declaração Universal dos direitos humanos foi proclamada pela Assembleia Geral das Nações Unidas em 10 de dezembro de 1948, constituindo importante marco teórico dos direitos humanos.
(E) O Protocolo de Minnesota é o conjunto de diretrizes internacionais para a investigação de mortes suspeitas, cuja observância é obrigatória pelos Estados integrantes do Sistema Global de Proteção de Direitos Humanos.$q$,$q$D$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (25,$q$Direitos Humanos$q$,$q$Com o processo de democratização do Brasil, houve a ratificação de diversos tratados e convenções sobre direitos humanos. Nesse contexto, assinale a afirmativa correta.
(A) As normas constitucionais definidoras dos direitos e das garantias fundamentais precisam ser regulamentadas, portanto têm aplicabilidade diferida.
(B) O Supremo Tribunal Federal reconhece a natureza de norma supralegal dos tratados de direitos humanos incorporados ao âmbito interno, sem a observância do quórum qualificado.
(C) As garantias e os direitos fundamentais previstos na Constituição Federal devem observar as regras do poder constituinte derivado, que podem suprimir regras em razão de seu mandato ilimitado.
(D) Os direitos e as garantias expressos em tratados internacionais em que a República Federativa do Brasil seja parte prevalecem sobre os previstos na Constituição Federal de 1988, em razão do seu caráter vinculante.
(E) Os tratados internacionais sobre direitos humanos que forem aprovados em apreciação única, em cada casa do Congresso Nacional, por maioria simples dos votos dos respectivos membros, serão equivalentes às emendas constitucionais.$q$,$q$B$q$,6,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(26,$q$Lei Orgânica da PCMG$q$,$q$Após ser empossado no cargo de Médico-Legista, Matheus, com o objetivo de conhecer adequadamente a Polícia Civil do Estado de Minas Gerais (PCMG), resolveu analisar a legislação que trata da instituição. Durante os estudos, Matheus constatou a existência, dentro da estrutura do Conselho Superior da PCMG, de uma Câmara Disciplinar. Nesse cenário, considerando as disposições da Lei Complementar Estadual nº 129/2013, é correto afirmar que a Câmara Disciplinar, no âmbito da PCMG, será presidida pelo
(A) Chefe da Polícia e integrada pelos membros do Conselho Superior titulares de unidades, à exceção do Chefe Adjunto, e julgará recursos contra atos emanados do Corregedor-Geral de Polícia Civil.
(B) Chefe Adjunto e integrada pelos membros do Conselho Superior titulares de unidades, à exceção do Chefe da Polícia, e julgará recursos contra atos emanados do Corregedor-Geral de Polícia Civil.
(C) Chefe da Polícia e integrada pelos membros do Conselho Superior titulares de unidades, à exceção do Corregedor-Geral de Polícia Civil, e julgará recursos contra atos emanados desse.
(D) Chefe Adjunto e integrada pelos membros do Conselho Superior titulares de unidades, à exceção do Chefe da Polícia, e julgará recursos contra atos emanados desse.
(E) Chefe da Polícia e integrada pelos membros do Conselho Superior titulares de unidades, à exceção do Chefe Adjunto, e julgará recursos contra atos emanados desse.$q$,$q$B$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(27,$q$Lei Orgânica da PCMG$q$,$q$João, policial civil, praticou conduta que poderá, em tese, após a observância do contraditório e da ampla defesa, ensejar a sua suspensão por noventa dias. Nesse cenário, considerando as disposições da Lei Estadual nº 5.406/1969, são competentes para a aplicação da penalidade de suspensão por noventa dias o
(A) Secretário da Segurança Pública, o órgão disciplinar de Polícia Civil, o Corregedor-Geral de Polícia, os Superintendentes, o Diretor da Academia de Polícia e os Chefes de Departamentos.
(B) Secretário da Segurança Pública, o órgão disciplinar de Polícia Civil, o Corregedor-Geral de Polícia, os Superintendentes e o Diretor da Academia de Polícia.
(C) Governador do Estado, o Secretário da Segurança Pública, o órgão disciplinar de Polícia Civil e o Corregedor-Geral de Polícia.
(D) Governador do Estado, o Secretário da Segurança Pública e o órgão disciplinar de Polícia Civil.
(E) Governador do Estado e o Secretário da Segurança Pública.$q$,$q$E$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(28,$q$Lei Orgânica da PCMG$q$,$q$De acordo com a Lei Complementar Estadual nº 129/2013, a Superintendência de Polícia Técnico-Científica, órgão de caráter permanente, é unidade administrativa, técnica e de pesquisa que tem por finalidade coordenar e articular ações para a realização de exames periciais criminais e médico-legais, promover estudos e pesquisas inerentes à produção de provas objetivas para o suporte às atividades de investigação criminal, ao exercício da polícia judiciária e ao processo judicial criminal. Nesse cenário, considerando as disposições da Lei Complementar Estadual nº 129/2013, não compete à Superintendência de Polícia Técnico-Científica
(A) planejar, estabelecer e priorizar as necessidades logísticas e de pessoal para a realização das atividades de perícia técnica e de medicina legal e subsidiar as atividades de suprimento de recursos pela Superintendência de Planejamento, Gestão e Finanças.
(B) gerir, planejar, coordenar, orientar, administrar o funcionamento, dirigir, supervisionar, controlar e avaliar a gestão e a execução do serviço de perícia oficial de natureza criminal no Estado.
(C) promover a articulação entre o Instituto de Criminalística e o Instituto Médico-Legal, bem como entre os demais órgãos da polícia técnico-científica, no âmbito nacional e internacional.
(D) remover os Médicos-Legistas e os peritos criminais, bem como controlar a distribuição de integrantes das referidas carreiras em unidades da PCMG.
(E) manter intercâmbio com órgãos e instituições relacionadas às áreas técnico-científicas correspondentes.$q$,$q$D$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(29,$q$Lei Orgânica da PCMG$q$,$q$Após ser condenado, na esfera administrativa, pela prática de conduta que teria caracterizado transgressão disciplinar, Bruno, policial civil, resolveu consultar um advogado, o qual, ao lhe prestar a devida consultoria jurídica, abordou potenciais cenários de revisão do processo administrativo. De acordo com a narrativa e considerando as disposições da Lei Estadual nº 5.406/1969, avalie os itens a seguir. I. Após a decisão, se descobrirem novas provas da inocência do punido ou de circunstâncias que autorizem pena mais branda. II. A decisão se fundar em depoimento, exames ou documentos comprovadamente falsos ou errados. III. A decisão for contrária a textos expressos de lei ou à evidência dos autos. Nesse cenário, considerando as disposições da Lei Estadual nº 5.406/1969, admite-se a revisão dos processos findos, mediante provocação do punido, em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$E$q$,7,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(30,$q$Lei Orgânica da PCMG$q$,$q$À luz das disposições da Lei Complementar Estadual nº 129/2013, avalie as afirmativas a seguir. I. O policial civil acometido de doença grave definida em portaria ministerial ou legislação específica será compulsoriamente licenciado, com vencimento ou remuneração proporcional ao tempo de serviço e demais vantagens. II. A licença para tratamento de saúde será concedida a pedido do policial civil ou de ofício, sem prejuízo dos vencimentos e demais vantagens, sendo indispensável a avaliação médica. III. O policial civil licenciado para tratamento de saúde não poderá dedicar-se a qualquer atividade remunerada. Nesse cenário, considerando as disposições da Lei Complementar Estadual nº 129/2013, está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$D$q$,8,$q$under_review$q$,true,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(31,$q$Medicina Legal$q$,$q$A Medicina Legal é a ciência que faz a interface entre a Medicina e o Direito. Sobre a legislação pertinente ao tema, assinale a afirmativa incorreta.
(A) O Juiz não está adstrito ao laudo pericial, podendo rejeitá-lo no todo ou em parte.
(B) Quando a infração deixar vestígios, torna-se indispensável o exame de corpo de delito.
(C) Quando a infração deixar vestígios, a confissão do acusado pode suprir o exame de corpo de delito.
(D) O Juiz indeferirá a perícia quando a prova, de fato, não depender de conhecimento especial técnico.
(E) Por terem base científica, as provas periciais geralmente têm prevalência em relação a outros elementos de convicção.$q$,$q$C$q$,8,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(32,$q$Medicina Legal$q$,$q$Sobre a atuação dos assistentes técnicos nas perícias judiciais, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Serão facultados ao Ministério Público, ao assistente de acusação, ao ofendido, ao querelante e ao acusado a formulação de quesitos e indicação de assistente técnico. ( ) Apesar dos questionamentos dos assistentes técnicos, o laudo após encerrado não poderá ser complementado. ( ) O assistente técnico será admitido pelo Juiz na fase de processo penal, depois de concluída a etapa do inquérito policial. As afirmativas são, respectivamente,
(A) V – F – F.
(B) V – V – F.
(C) F – V – F.
(D) V – F – V.
(E) F – F – V.$q$,$q$D$q$,8,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (33,$q$Medicina Legal$q$,$q$Correlacione os segmentos humanos para identificação listados a seguir às respectivas utilidades. ( ) identificação comparativa 1. Sínfise púbica ( ) estatura 2. Segundo metatarsiano ( ) fim do fechamento das 3. Clavícula fises 4. Eminência mentual ( ) idade 5. Dentes ( ) sexo Assinale a opção que apresenta correlação correta, na ordem apresentada.
(A) 4 – 2 – 3 – 5 – 1.
(B) 1 – 3 – 5 – 2 – 5.
(C) 5 – 2 – 3 – 1 – 4.
(D) 5 – 3 – 4 – 1 – 2.
(E) 5 – 4 – 2 – 3 – 1.$q$,$q$C$q$,8,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(34,$q$Medicina Legal$q$,$q$Sobre a identificação judiciária, que pode ser feita por meio da papiloscopia segundo a classificação proposta por Vucetich, assinale a afirmativa incorreta.
(A) Na presença do “arco”, não encontramos a figura delta.
(B) Quando temos “presilha interna”, o delta está à direita do observador.
(C) Quando temos “presilha externa“, o delta está à esquerda do observador.
(D) Na presença de “verticilo”, existe um delta à direita e outro à esquerda.
(E) A figura delta não é considerada nos tipos fundamentais dos padrões observados nas impressões digitais.$q$,$q$E$q$,8,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(35,$q$Medicina Legal$q$,$q$A rigidez cadavérica é o sinal tardio de morte mais conhecido. Sobre a sequência dos músculos acometidos pela rigidez, assinale a afirmativa correta.
(A) O músculo cardíaco é o primeiro a entrar em rigidez.
(B) A rigidez atinge seu ápice em torno de 12 horas após a morte.
(C) A rigidez se desfaz dos membros inferiores para os membros superiores.
(D) Os músculos intercostais e o diafragma obedecem à ordem e entram em rigidez entre os membros superiores e inferiores.
(E) A marcha da rigidez tem sentido crânio caudal, portanto os músculos da face e do pescoço antecedem o diafragma e o coração.$q$,$q$X$q$,8,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(36,$q$Medicina Legal$q$,$q$Apesar da capacidade de adaptação do ser humano a locais com pressões maiores ou menores, as alterações rápidas ou intensas podem causar transtornos. Sobre as baropatias, assinale a afirmativa correta.
(A) Os barotraumas auditivos são frequentes em aviadores e mergulhadores.
(B) As doenças descompressivas dos mergulhadores só acontecem nas subidas.
(C) A doença das montanhas se instala após a chegada imediata a locais com mais de 5 mil metros de altitude.
(D) O oxigênio é o gás que causa impregnação dos tecidos, principalmente após 80 metros de profundidade.
(E) Os indivíduos que permanecem por tempo prolongado em locais de grande altitude terão adaptações crônicas sem repercussões clínicas.$q$,$q$A$q$,8,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(37,$q$Medicina Legal$q$,$q$As asfixias são provenientes da ação físico-química. Sobre esse tipo de morte, assinale a afirmativa correta.
(A) O sulco do estrangulado é tipicamente horizontalizado.
(B) As mortes por sufocação direta podem não deixar nenhuma marca externa no cadáver.
(C) O sulco do enforcado tende a ser oblíquo e mais profundo em local antagonista ao do nó.
(D) No soterramento a asfixia se dá apenas pela alteração de meio ambiente em que o ar é substituído por partículas de terra.
(E) Nas mortes por afogamento, ocorre alteração de meio ambiente e o cadáver tende a flutuar imediatamente após a morte.$q$,$q$X$q$,9,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(38,$q$Medicina Legal$q$,$q$Na avaliação do impacto dos projéteis de arma de fogo no corpo e as lesões consequentes, segundo a balística terminal, assinale a afirmativa correta.
(A) A orla de tatuagem pode ser removida, se o cadáver for lavado.
(B) A orla de queimadura pode estar presente nos orifícios de entrada e de saída.
(C) A orla de tatuagem estará presente nos disparos a curta distância, com o cano encostado.
(D) As orlas de equimose, escoriação e enxugo (anel de Fisch) estão presentes apenas nos disparos a curta distância.
(E) Nos disparos com o cano encostado, havendo anteparo rígido, as bordas da lesão não serão invertidas devido à saída dos gases.$q$,$q$E$q$,9,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(39,$q$Medicina Legal$q$,$q$Sobre as lesões causadas por objetos perfurantes, que apresentam características diferentes de acordo com o calibre do mesmo, assinale a afirmativa correta.
(A) Todas as lesões produzidas por objetos perfurantes têm formato de casa de botão.
(B) As leis de Filhos e Langer se reportam apenas a objetos perfurantes de calibre médio.
(C) As lesões causadas por objetos perfuro cortantes obedecem à lei do paralelismo (Lei do Paralelismo).
(D) As lesões causadas por objetos corto contundentes podem ter aspecto de ponta de seta ou de quadrilátero.
(E) De acordo com a primeira lei de Filhos, as lesões causadas por instrumentos de pequeno calibre tendem a ser semelhantes entre si (Lei da Semelhança).$q$,$q$B$q$,9,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(40,$q$Medicina Legal$q$,$q$Sobre as características das lesões causadas por ação contundente, as mais frequentemente observadas na prática pericial, assinale a afirmativa correta.
(A) As bordas são regulares.
(B) A profundidade predomina sobre a largura.
(C) A extensão predomina sobre a profundidade.
(D) As bordas são invertidas na entrada e evertidas na saída.
(E) As bordas são irregulares com traves de tecido íntegro no fundo.$q$,$q$E$q$,9,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (41,$q$Medicina Legal$q$,$q$Sobre os fenômenos cadavéricos que, por meio da cronotanatognose, auxiliam na determinação ou estimativa da época da morte, assinale a afirmativa correta.
(A) A rigidez cadavérica é um sinal de presunção de morte.
(B) A mancha verde abdominal surge 48 horas depois da morte e marca o início da putrefação.
(C) A fase coliquativa ocorre depois da fase de esqueletização com a decomposição dos tecidos.
(D) A circulação póstuma de Brouardel pode ser observada nas primeiras doze horas após a morte.
(E) Os livores cadavéricos são um sinal tardio de morte, contudo, nas mortes por asfixia tem instalação precoce.$q$,$q$E$q$,9,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(42,$q$Medicina Legal$q$,$q$As opções a seguir apresentam características do crime conhecido como crime epilético (cometido por um epilético criminoso), à exceção de uma. Assinale-a.
(A) Amnésia anterior ao crime.
(B) Ausência de motivação para o crime.
(C) Nenhuma preocupação em esconder a arma do crime.
(D) Multiplicidade de golpes (desnecessários e incompreensíveis).
(E) Grande remorso do autor, que se sente culpado por ser epilético.$q$,$q$E$q$,9,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(43,$q$Medicina Legal$q$,$q$Correlacione os tipos de embriaguez listados a seguir às respectivas características. 1. Embriaguez culposa 2. Embriaguez preter dolosa 3. Proveniente de caso fortuito ou força maior 4. Embriaguez acidental 5. Embriaguez pré-ordenada ou voluntária ( ) A pessoa não sabe que há teor alcoólico na bebida. ( ) A pessoa, apesar de não querer o resultado, sabe que pode cometer crimes quando embriagada. ( ) O indivíduo bebe com objetivo de cometer crimes. ( ) A pessoa que fica totalmente incapaz, a ponto de não entender o caráter ilícito do fato, fica isenta de pena. ( ) Há negligência ou imprudência por beber em demasia, sem isenção de responsabilidade. Assinale a opção que indica a correlação correta, na ordem apresentada.
(A) 3 – 2 – 5 – 4 – 1.
(B) 2 – 4 – 3 – 1 – 5.
(C) 4 – 5 – 3 – 2 – 1.
(D) 4 – 2 – 5 – 3 – 1.
(E) 1 – 4 – 3 – 2 – 5.$q$,$q$D$q$,9,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(44,$q$Medicina Legal$q$,$q$Durante a prática da perícia médica, o perito com frequência se depara com periciados que não informam a realidade durante os exames médicos. A esse respeito, assinale a opção que apresenta a definição incorreta.
(A) Simulação: prática frequente em qualquer faixa etária sob vários pretextos. O periciado alega queixas inexistentes.
(B) Dissimulação: pode ocorrer quando uma mulher finge estar grávida para obter alguma vantagem.
(C) Metassimulação: prática em que o periciado exacerba queixas existentes.
(D) Parassimulação: o periciado mistura queixas reais com problemas que não existem.
(E) Dissimulação: o periciado esconde lesões ou doenças, ou a mulher grávida finge não estar grávida.$q$,$q$B$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(45,$q$Medicina Legal$q$,$q$Desde o surgimento do Estatuto da Criança e do Adolescente (ECA), existe uma constante preocupação da Justiça com a proteção infantil. Sobre as síndromes de maus tratos às crianças, assinale a afirmativa correta.
(A) A faixa etária mais acometida pela síndrome é a de crianças de 6 a 12 anos.
(B) A síndrome de Silverman-Caffey se reporta especificamente às fraturas em diferentes épocas evolutivas.
(C) A principal característica da síndrome do bebê sacudido são lesões cervicais consequentes a traumas torcionais.
(D) A síndrome da criança espancada ou battered child syndrome corresponde a violências físicas exclusivamente.
(E) A síndrome de Silverman-Caffey é caracterizada por lesões produzidas por ação contundente em diferentes fases de evolução.$q$,$q$X$q$,10,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(46,$q$Medicina Legal$q$,$q$No estudo das lesões causadas por energias de ordem mista, existe um tipo especial de meio lesivo denominado sevícia. As opções a seguir apresentam características das sevícias, à exceção de uma. Assinale-a.
(A) São de natureza dolosa.
(B) Podem ser causadas por ação e omissão.
(C) Podem causar efeito lesivo imediato ou tardio.
(D) São de natureza culposa, podendo haver dolo eventual.
(E) Representam conjunto heterogêneo de mecanismos subjetivos e objetivos capazes de afetar a integridade física ou psíquica da vítima.$q$,$q$D$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(47,$q$Medicina Legal$q$,$q$O pacote anticrime criado a partir do projeto de lei de 2019 normatizou as etapas da cadeia de custódia, que corresponde a todo o caminho percorrido pela prova. A seguir são apresentadas etapas da cadeia de custódia a ser assegurada quando do encontro de uma prova pericial. 1. Coleta: ato de recolher o vestígio. 2. Recebimento: ato formal de transferência da posse do vestígio. 3. Processamento: exame pericial em si e confecção do laudo. 4. Fixação: descrição detalhada do vestígio como encontrado. 5. Isolamento: ato de se evitar que se altere o estado das coisas. 6. Reconhecimento: distinção do elemento como de potencial interesse para a investigação. Assinale a opção que indica a ordem correta dessas etapas.
(A) 6 – 5 – 4 – 1 – 2 – 3.
(B) 5 – 6 – 4 – 1 – 2 – 3.
(C) 1 – 4 – 6 – 5 – 2 – 3.
(D) 5 – 6 – 2 – 1 – 4 – 3.
(E) 5 – 6 – 1 – 3 – 4 – 2.$q$,$q$A$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(48,$q$Medicina Legal$q$,$q$A Himenologia Forense é o estudo das lesões da membrana himenal, utilizada para entendimento de crimes sexuais. Sobre o estudo do hímen, assinale a afirmativa correta.
(A) As lesões himenais cicatrizam em forma de “V”.
(B) Os entalhes são lesões himenais cicatrizadas em forma de “V”.
(C) O tempo de cicatrização de uma lesão himenal está em torno de dez dias.
(D) Os entalhes são descontinuidades da borda himenal em forma de “U”.
(E) As roturas himenais, quando causadas por penetração peniana, na maioria das vezes não atingem toda a altura de sua orla.$q$,$q$D$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (49,$q$Medicina Legal$q$,$q$Sobre a coleta de material a ser realizada no exame de corpo de delito nos crimes de estupro, assinale a afirmativa correta.
(A) A coleta do material para pesquisa de DNA só tem validade no mesmo dia do evento.
(B) A pesquisa de espermatozoides será sempre positiva em caso de ejaculação no canal vaginal.
(C) O PSA pode ser pesquisado em até duas semanas após o evento, por sua meia-vida ser longa no canal vaginal.
(D) O DNA de células masculinas pode ser encontrado em estômagos de larvas necrófilas em estudo entomológico.
(E) Apenas o exame de DNA positivo para a presença de células masculinas na cavidade vaginal pode levar à constatação de que houve estupro.$q$,$q$D$q$,10,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(50,$q$Medicina Legal$q$,$q$Sobre o conceito atual dos crimes contra a dignidade sexual, segundo a redação dada pela Lei nº 12015/2009, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Homens podem ser vítimas de crime sexual, correspondente ao ato libidinoso diverso da conjunção carnal. ( ) Os crimes de estupro e atentado violento ao pudor são praticados mediante violência ou grave ameaça, sendo as vítimas sempre enquadradas no critério de vulnerabilidade. ( ) O crime de estupro corresponde a constranger alguém, mediante violência ou grave ameaça, a ter conjunção carnal ou outro ato libidinoso, podendo a vítima ser homem ou mulher. As afirmativas são, respectivamente,
(A) V – V – F.
(B) V – F – V.
(C) F – V – F.
(D) V – F – F.
(E) F – F – V.$q$,$q$B$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(51,$q$Toxicologia Forense$q$,$q$Leia o fragmento a seguir. A coleta de sangue no morto deve ser feita através de aspiração com uso de agulha ou seringa, podendo ser feita a coleta de sangue cardíaco ou periférico. PASSAGLI, M. F. Toxicologia Forense - teoria e prática. 3ª ed. Campinas (SP): Millenium, 2013, p. 385.. Com relação ao sangue utilizado nas análises toxicológicas post- mortem, avalie as afirmativas a seguir. I. O sangue periférico é, em geral, menos suscetível à redistribuição post mortem, sendo recomendável sua coleta sempre que possível, principalmente para a realização de análises quantitativas. II. O método mais indicado para a coleta de sangue cardíaco é a punção “cega" através da parede torácica. III. O uso de soro sanguíneo é extremamente comum nas análises toxicológicas post-mortem, uma vez que a autólise das células facilita a separação entre as frações líquidas e celulares do sangue. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$A$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(52,$q$Toxicologia Forense$q$,$q$Considerando os vários tipos de matrizes biológicas que podem ser empregados para fins de análises toxicológicas, avalie as afirmativas a seguir I. Vísceras coletadas de cadáveres devem ser, preferencialmente, fixadas em formol, visando à posterior análise toxicológica. II. Para um mesmo periciado, resultados obtidos da análise de matrizes biológicas diversas podem ser totalmente diferentes entre si. III. Humor vítreo e larvas de insetos são amostras indicadas, sempre que disponíveis, para a determinação da presença de determinados toxicantes em cadáveres em decomposição. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$D$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(53,$q$Toxicologia Forense$q$,$q$Acerca da interpretação do resultado de um laudo quantitativo de análise toxicológica, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) A constatação de um nível sanguíneo potencialmente fatal de um fármaco consiste em um elemento que, necessariamente, é conclusivo para a determinação da causa da morte de uma pessoa. ( ) O tipo de amostra coletada, bem como seu local de coleta no corpo humano, precisam ser considerados na avaliação do resultado. ( ) Sempre que disponível, o histórico clínico do indivíduo e as informações policiais acerca do caso devem ser associados aos achados analíticos. As afirmativas são, respectivamente,
(A) V – V – F.
(B) V – V – V.
(C) F – V – V.
(D) F – V – F.
(E) F – F – V.$q$,$q$C$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(54,$q$Toxicologia Forense$q$,$q$A entomotoxicologia é a área da entomologia que determina substâncias tóxicas em artrópodes que se alimentam de cadáveres humanos. Tem sua importância principalmente nos casos em que não há amostra biológica da vítima para ser analisada ou essa se encontra comprometida pelos processos de decomposição. HODECEK, J. Revisiting the concept of entomotoxicology. Forensic Science International: Synergy. 2020: 2, 282-286. Adaptado). Com relação ao tema, avalie as afirmativas a seguir. I. Mesmo em cadáveres esqueletizados, pode-se usar restos de insetos quitinizados como matriz de interesse toxicológico. II. É possível extrapolar com exatidão os níveis dos toxicantes no inseto para a quantidade do toxicante ativo na vítima ao momento da morte. III. Podem ser analisadas diversas formas do ciclo animal, tais como ovo, larva, pupa, adulto, exúvia e fezes de besouros. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$C$q$,11,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(55,$q$Toxicologia Forense$q$,$q$Sobre os procedimentos que caracterizam o crime de conduzir veículo automotor com capacidade psicomotora alterada em razão da influência de álcool, de acordo com a Resolução CONTRAN nº 432/2013, avalie as afirmativas a seguir. I. Exame de sangue que apresente como resultado qualquer concentração de álcool por litro de sangue. II. Exame de sangue que apresente resultado igual ou superior a 6 decigramas de álcool por litro de sangue. III. Teste de etilômetro com medição realizada igual ou superior a 0,034 miligrama de álcool por litro de ar alveolar expirado. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e II, apenas.
(E) II e III, apenas.$q$,$q$B$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(56,$q$Toxicologia Forense$q$,$q$A pesquisa de cianeto deve ser considerada na rotina de avaliação de intoxicação de vítimas que inalaram fumaça de incêndios, uma vez que uma variedade de materiais inflamáveis liberam quantidade significativa de cianeto. STOLL, S.; ROIDER, G.; KEIL, W. Concentrations of cyanide in blood samples of corpses after smoke inhalation of varying origin. Int J Legal Med. 2017: 131(1), 123-129. Sobre o cianeto, assinale a afirmativa correta.
(A) A absorção do cianeto ocorre somente pelas vias oral e inalatória.
(B) O cianeto e o monóxido de carbono são tóxicos sinérgicos, potencializando seus efeitos no organismo humano.
(C) O cianeto pode produzir hipóxia grave, ligando-se sempre de forma irreversível ao íon férrico no sistema citocromo oxidado mitocondrial.
(D) A hipóxia ocorre primariamente pela redução da quantidade de oxigênio no sangue devido à inibição do sistema citocromo oxidase.
(E) O cianeto tem uma curva dose-resposta indicativa de efeito lento, todavia o organismo consegue desintoxicar-se sob a ação de pequenas doses.$q$,$q$B$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (57,$q$Toxicologia Forense$q$,$q$Os benzodiazepínicos são fármacos largamente utilizados no tratamento da ansiedade e da insônia. Apesar de serem considerados relativamente seguros, seus efeitos adversos podem prejudicar a condução de veículos, provocar amnésia anterógrada, incapacitar vítimas de crimes sexuais e até mesmo, em casos mais graves, levar à morte. Sobre os benzodiazepínicos, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) Os benzodiazepínicos aumentam a síntese do GABA, intensificando a sua ação inibitória sobre o SNC. ( ) São extensamente metabolizados pelas CYP hepáticas, particularmente CYPs 3A4 e 2C19. Dessa forma, fármacos inibidores da CYP 3A4, tais como a eritromicina, o itraconazol e o cetoconazol, podem diminuir o metabolismo dos benzodiazepínicos. ( ) O uso de benzodiazepínicos, concomitante a outros depressores do sistema nervoso central, aumenta o risco do surgimento de efeitos tóxicos, tais como sedação, letargia e depressão respiratória. As afirmativas são, respectivamente,
(A) F – F – V.
(B) F – V – V.
(C) V – V – F.
(D) V – F – V.
(E) V – V – V.$q$,$q$B$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(58,$q$Toxicologia Forense$q$,$q$Leia o trecho a seguir. O chumbinho é um produto clandestino irregularmente utilizado como raticida e também utilizado com frequência com propósitos homicidas e suicidas. Fisicamente é caracterizado por pequenos grânulos de coloração cinza-chumbo e sua composição pode conter carbamatos e organofosforados. Agência Nacional de Vigilância Sanitária - ANVISA. Chumbinho. Disponível em: <https://www.gov.br/anvisa/pt- br/acessoainformacao/perguntasfrequentes/agrotoxicos/chumbinho>. Acesso em: 20 nov. 2024. Sobre os compostos organofosforados e carbamatos, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) A maioria desses compostos apresenta caráter lipofílico, podendo se acumular no tecido adiposo. ( ) Seus componentes atuam como inibidores da enzima acetilcolinesterase, impedindo a hidrólise da acetilcolina que, quando acumulada, pode ocasionar síndrome colinérgica. ( ) A inibição das colinesterases pelos carbamatos é considerada instável e reversível. As afirmativas são, respectivamente,
(A) V – V – V.
(B) V – V – F.
(C) F – F – V.
(D) F – V – F.
(E) F – V – V.$q$,$q$A$q$,12,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(59,$q$Toxicologia Forense$q$,$q$Leia o fragmento a seguir. Quando um toxicante atinge a corrente circulatória, passando ou não por processos de absorção, ele se encontra disponível para distribuição. DORTA, D. J.; YONAMINE, M.; COSTA, J. L.; MARTINS B. S. Toxicologia Forense. São Paulo: Blucher, 2018. p. 60. Sobre o processo toxicocinético da distribuição, avalie as afirmativas a seguir. I. A toxicidade de um xenobiótico não depende do seu volume de distribuição. II. A ligação de um xenobiótico com proteínas plasmáticas, tais como a albumina e globulinas, altera a sua distribuição para outros tecidos. III. O volume de distribuição relaciona a quantidade da substância no organismo à sua concentração no sangue ou plasma; a divisão da quantidade dessa substância presente no corpo, pela sua concentração plasmática, nunca será superior ao volume corporal do indivíduo. Está correto o que se afirma em
(A) II, apenas.
(B) I e II, apenas
(C) I e III, apenas
(D) II e III, apenas.
(E) I, II e III.$q$,$q$A$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(60,$q$Toxicologia Forense$q$,$q$Sobre a produção post-mortem de substâncias de interesse toxicológico, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) A produção endógena de etanol pela Escherichia coli e pela Candida albicans pode ocorrer a partir do substrato glicose. ( ) A produção de espécies químicas nas matrizes biológicas pode ser inibida pela adição de fluoreto de sódio à amostra. ( ) O ácido gama-hidroxibutírico (GHB) pode ser produzido post- mortem em fluidos biológicos putrefeitos. As afirmativas são, respectivamente,
(A) V – V – V.
(B) V – F – F.
(C) F – V – V.
(D) F – F – V.
(E) F – F – F.$q$,$q$A$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(61,$q$Patologia$q$,$q$Na necessidade de realizarmos um experimento em um laboratório de investigação ou diagnóstico, é importante conhecermos as boas práticas adotadas no laboratório e os materiais permanentes e descartáveis disponíveis para uso. A esse respeito, avalie as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa. ( ) O tubo de ensaio é usado para a execução de reações químicas em pequena escala. ( ) A proveta é usada para a medida de volumes de líquidos sem precisão. ( ) O balão volumétrico é usado no preparo de soluções com volumes 100% precisos e prefixados. As afirmativas são, respectivamente,
(A) V – F – F.
(B) F – F – V.
(C) V – V – F.
(D) F – V – F.
(E) V – F – V.$q$,$q$E$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(62,$q$Patologia$q$,$q$Paciente do gênero masculino, 53 anos, foi admitido no PS com queixas de dores no peito, com dificuldade para falar e respirar. Com base nos sintomas clínicos mencionados, assinale a opção que indica os exames específicos que deverão ser solicitados para o diagnóstico dessa ocorrência.
(A) LDH1; CK-MB; Troponina.
(B) Creatinina, IL-1; T4 Livre.
(C) Hemoglobina glicada (HbA1c ) e insulina.
(D) LDH-3 e CK- Total.
(E) Albumina e colesterol.$q$,$q$A$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(63,$q$Patologia$q$,$q$A sífilis é uma doença infectocontagiosa, transmitida pela via sexual e verticalmente durante a gestação. No laboratório clínico temos os testes treponêmicos e não treponêmicos. Em relação a esses testes, assinale a afirmativa correta.
(A) FTA-Abs é um teste de biologia molecular padrão ouro para sífilis utilizado nas rotinas de diagnósticos e pesquisas.
(B) Para evitar o efeito prozona no teste VDRL são realizadas diluições seriadas diminuindo resultados falsos negativos.
(C) Os principais testes treponêmicos são VDRL, RPR, USR e TRUST.
(D) A sífilis é causada pelo parasita Treponema Pallidum.
(E) A detecção da sífilis é realizada apenas por meio de exames imunológicos.$q$,$q$B$q$,13,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(64,$q$Patologia$q$,$q$O líquido cefalorraquidiano ou líquor é um humor com composição semelhante a um ultrafiltrado de plasma. Sua homeostasia pode ser danificada na presença de tumores, isquemias, hidrocefalias e infecções, o que pode provocar mudanças na produção e/ou composição desse fluido. A esse respeito, avalie as afirmativas a seguir. I. O aspecto da amostra de líquor deve ser observado em local com boa iluminação e pode ser definido como límpido, em casos de LCR normal. II. Xantocromia é o termo utilizado para designar que o sobrenadante do LCR é rosa, laranja ou amarelo. III. Os aspectos das amostras de líquor não são influenciados pela presença de leucócitos, proteínas, lipídios, microrganismos e hemácias. IV. Turvo, fortemente turvo e purulento são descrições utilizadas para relatar a turvação das amostras de líquor. Está correto o que se afirma em
(A) IV, apenas.
(B) II e III, apenas.
(C) I, II e IV, apenas.
(D) II, III e IV, apenas.
(E) I, II, III e IV.$q$,$q$C$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (65,$q$Patologia$q$,$q$A malária é uma doença infecciosa causada por um parasito do gênero Plasmodium, que é transmitido para humanos pela picada das fêmeas infectadas dos mosquitos Anopheles. Uma das técnicas utilizadas para a detecção desse parasito é o PCR em tempo real (qPCR). As fases dessa técnica contemplam as seguintes etapas:
(A) desnaturação, anelamento, extensão e aplicação do produto da reação de PCR em tempo real no gel de agarose.
(B) anelamento, extensão e aplicação do produto da reação de PCR em tempo real no gel de agarose.
(C) anelamento e extensão.
(D) desnaturação, anelamento e extensão.
(E) extensão e aplicação do produto da reação de PCR em tempo real no gel de agarose.$q$,$q$D$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(66,$q$Patologia$q$,$q$A microscopia óptica está relacionada ao uso de qualquer tipo de microscópio que necessita de luz para a observação das amostras e outros materiais. Em elação à microscopia óptica, é correto afirmar que
(A) uma iluminação ideal não é um fator essencial para obter uma imagem nítida no microscópio.
(B) microscópio estereoscópico é constituído por vários componentes que captam e redirecionam a luz para formar uma imagem ampliada do material em análise.
(C) microscópio óptico possui dois sistemas de lentes: condensadoras e oculares, que podem auxiliar na análise de materiais.
(D) no sistema mecânico do microscópio óptico, o diafragma do condensador é a parte superior do microscópio que suporta os sistemas de lentes.
(E) utilizando o microscópio óptico, não é possível obter a formação de imagem invertida.$q$,$q$B$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(67,$q$Patologia$q$,$q$Paciente MJN, gênero feminino, foi atendida em um hospital com ferimento de objeto pontiagudo. O médico responsável pelo atendimento constatou a necessidade de transfusão de concentrado de hemácias e plasma fresco. Foi realizada a tipagem sanguínea completa da paciente com os seguintes resultados: ABO
(A) deverá ser realizada a prova cruzada com amostra da bolsa de plasma do doador e amostra de sangue da receptora.
(B) obrigatoriamente será realizada com plasma ABO (A) ou (AB) e RH negativo.
(C) a paciente poderá receber plasma de doador ABO (A) ou (AB) RH positivo ou negativo.
(D) a prova cruzada será realizada com amostra de plasma do doador ABO (O) RH negativo.
(E) a prova cruzada será realizada com amostra de plasma do doador ABO (A) RH positivo ou negativo.$q$,$q$C$q$,14,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(68,$q$Patologia$q$,$q$Nas lentes objetivas dos microscópios ópticos, é possível observar diversas inscrições que apontam características importantes dessas lentes, entre elas o valor da abertura numérica. Assinale a propriedade da imagem que está diretamente relacionada à abertura numérica.
(A) Magnificação.
(B) Paralaxe.
(C) Resolução.
(D) Correção de aberração cromática.
(E) Correção de aberração esférica.$q$,$q$C$q$,14,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(69,$q$Patologia$q$,$q$Sobre a pesquisa de sangue oculto em amostras de fezes, avalie as afirmativas a seguir. I. O teste de sangue oculto nas fezes guaiáco (g-FOBT) é um exame colorimétrico acessível capaz de detectar a presença de hemoglobina humana e animal; pode ter reação falso-positiva por ser sensível à peroxidase proveniente de alimentos, como carne vermelha, e suplementos de vitamina C. II. O teste imunoquímico fecal (i-FOBT) é um exame capaz de detectar a presença de sangramento oculto, ligando-se apenas à hemoglobina humana, não ocasionando falso positivo por interferência com antioxidantes, como a vitamina C ou peroxidases vegetais. III. O teste imunoquímico fecal (i-FOBT) é mais sensível do que o método colorimétrico, detectando quantidades muito pequenas de hemoglobina; nesse teste, pode haver reação cruzada, gerando falso positivo com a hemoglobina de outros mamíferos. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) I e III, apenas.
(D) I e II, apenas.
(E) I, II e III.$q$,$q$X$q$,14,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(70,$q$Patologia$q$,$q$A cristalúria, identificada em análise de sedimento urinário, está relacionada à composição da dieta habitual do indivíduo, situações metabólicas particulares, ou algumas doenças (metabólicas ou infecciosas). Observe as imagens de sedimento urinário, identificadas respectivamente com as letras A, B e C. • Em A, é possível observar cristais em forma de placa de vidro retangular empilhadas com entalhes nos vértices. • Em B, é possível observar dois cristais com formato piramidal transparentes. • Em C, é possível observar um cristal em forma de roseta com pontas em aspecto de agulha refringentes e incolores. Fonte: Máximo AS, Domingueti CP e da Silva RS (2020). Atlas de Urinálise, Universidade Federal de São João Del-Rei – UFSJ. Adaptado. Com base nas imagens de sedimento urinário, avalie as afirmativas e assinale (V) para a verdadeira e (F) para a falsa. ( ) Na imagem A, observa-se a presença de cristais de fosfato- amoníaco-magnesiano ou fosfato triplo, que podem estar relacionados à infecção por bactérias como Proteus mirabilis e Pseudomonas aeroginosa. ( ) Na imagem B, é possível observar cristais de oxalato de cálcio di-hidratado, encontrado em urinas ácidas. ( ) A imagem C apresenta cristais de tirosina, que podem ser observados em pacientes portadores de hepatopatias graves. As afirmativas são, respectivamente,
(A) F – V – F.
(B) F – V – V.
(C) V – F – V.
(D) V – V – F.
(E) V – V – V.$q$,$q$B$q$,15,$q$under_review$q$,false,true,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo. Pode depender de figura/tabela do caderno.$q$),(71,$q$Psiquiatria Forense$q$,$q$Sobre a perícia psiquiátrica, avalie as afirmativas a seguir. I. É todo e qualquer ato ou exame realizado com a finalidade de contribuir com autoridades administrativas, policiais ou judiciárias na formação e juízos referentes às condições de saúde mental de alguém. II. É realizada em processos judiciais por um assistente técnico escolhido pelo juiz em comum acordo com as partes. III. É um rito ordinário em causas criminais e cíveis. Está correto o que se afirma em
(A) I, apenas.
(B) II, apenas.
(C) III, apenas.
(D) I e II, apenas.
(E) II e III, apenas.$q$,$q$A$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(72,$q$Psiquiatria Forense$q$,$q$Conforme dispõe o Artigo 212 do Código Civil, a perícia pode ser considerada um dos mais técnicos elementos de prova existentes, dado seu teor científico e a clareza que, idealmente, dela promana, sob a forma de laudo. BARROS e TEIXEIRA. Manual de Perícias Psiquiátricas. Porto Alegre: Artmed. 2015. De acordo com a referência acima e a legislação vigente, assinale a afirmativa correta.
(A) A perícia somente pode ser realizada na presença do indivíduo que é sujeito dessa perícia.
(B) Segundo o Código do Processo Civil, quando a prova do fato depender de conhecimento técnico ou científico, as partes são assistidas por peritos.
(C) A perícia, assim como documentos apresentados tanto na inicial quanto durante o percurso do processo, também é considerada uma prova técnica.
(D) A perícia psiquiátrica normalmente carece de elementos materiais (como exames) que baseiem a conclusão do perito técnico, uma vez que a condição mental é subjetiva.
(E) Um Médico Generalista pode realizar perícias de qualquer área médica, uma vez que especialidades não são reconhecidas legalmente como domínios exclusivos de aplicação do saber.$q$,$q$X$q$,15,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@

insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)
select qs.id,gs.id,t.id,$q$Polícia Civil de Minas Gerais – Médico-Legista$q$,2025,$q$Médico-Legista$q$,$q$FGV$q$,v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note
from (values (73,$q$Psiquiatria Forense$q$,$q$Conforme a Lei nº 10.216/2001, também conhecida como Lei da Reforma Psiquiátrica, após uma internação involuntária, o estabelecimento de saúde deve notificar o Ministério Público Estadual em até:
(A) 24 horas.
(B) 48 horas.
(C) 72 horas.
(D) 96 horas.
(E) Não consta obrigatoriedade de notificação.$q$,$q$C$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(74,$q$Psiquiatria Forense$q$,$q$Assinale a opção que indica a condição que não é compatível com a inimputabilidade jurídica.
(A) Esquizofrenia.
(B) Depressão psicótica.
(C) Demência de Alzheimer.
(D) Transtorno de personalidade antissocial.
(E) Epilepsia do lobo temporal (crises parciais/focais complexas).$q$,$q$D$q$,15,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(75,$q$Psiquiatria Forense$q$,$q$Segundo a CID-11 (icd.who.int/), as opções a seguir apresentam condições que devem ser excluídas no diagnóstico de Burnout (QD85), à exceção de uma. Assinale-a.
(A) Transtorno depressivo.
(B) Transtorno dissociativo.
(C) Transtornos de ansiedade.
(D) Transtorno de ajustamento.
(E) Transtorno de estresse pós-traumático.$q$,$q$B$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(76,$q$Psiquiatria Forense$q$,$q$O Art. 26 do Código Penal Brasileiro estabelece que uma pessoa é isenta de pena se, no momento da ação ou omissão, era incapaz de compreender o caráter ilícito do ato ou de controlar suas ações. Isso acontece quando a pessoa sofre de doença mental ou desenvolvimento mental incompleto ou retardado. Nesse sentido, conforme o Manual de Perícias Psiquiátricas, de Barros e Teixeira, avalie as afirmativas a seguir. I. A capacidade de entender refere-se à possibilidade que o indivíduo tem de conhecer e compreender a natureza, as condições e as consequências do ato ilícito. II. A capacidade de determinar-se está relacionada diretamente ao componente volitivo (vontade) da ação, ou seja, à possibilidade de o indivíduo escolher entre praticar ou não o ato, estando em condições mentais adequadas para uma reflexão prévia dentro de um processo volitivo normal. III. Pessoas parcialmente capazes de entender ou de se autodeterminar em relação ao ato ilícito serão considerados semi-imputáveis. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$E$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(77,$q$Psiquiatria Forense$q$,$q$Um possível estado de embriaguez deve ser atentado de rotina na perícia psiquiátrica. A esse respeito, as afirmativas a seguir estão corretas, à exceção de uma. Assinale-a.
(A) Conforme o Art. 28 do Código Penal, a embriaguez, voluntária ou culposa, pelo álcool ou substância de efeitos análogos não exclui imputabilidade.
(B) Algumas situações específicas podem resultar em inimputabilidade ou semi-imputabilidade, como embriaguez patológica, quando o uso da substância é relacionado a transtorno mental/comportamental de uso de substâncias psicoativas (no CID 10, F1x.x).
(C) O uso intencional de etílicos pelo autor do crime descaracteriza a inimputabilidade naturalmente constatada em virtude de uma doença mental alienante previamente instalada.
(D) Conforme o Art. 28, § 1º, do Código Penal, é isento de pena o agente que, por embriaguez completa, proveniente de caso fortuito ou força maior, era, ao tempo da ação ou da omissão, inteiramente incapaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento. Logo, mesmo sem a identificação de um transtorno mental ao exame pericial, a pessoa pode se enquadrar nessa isenção caso haja evidências de que a pessoa desconhecia a composição etílica da bebida que ingeriu.
(E) Conforme o Art. 61 do Código Penal, que considera o uso de etílicos como um agravante do crime, é necessário estabelecer o nexo entre a intenção de uso da substância para facilitar o autor do crime a cometê-lo.$q$,$q$X$q$,16,$q$annulled$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(78,$q$Psiquiatria Forense$q$,$q$Sobre perícias no Direito Cível, conforme o Manual de Perícias Psiquiátricas de Barros e Teixeira, avalie as afirmativas a seguir. I. A capacidade civil permite a uma pessoa adquirir direitos e contrair obrigações por conta própria, sem necessidade de representante legal. Porém, essa capacidade pode ser relativa, como no caso de pessoas “excepcionais”, sem desenvolvimento mental completo. II. No Direito Cível, causa incapacidade absoluta qualquer doença psiquiátrica que seja grave o suficiente para levar à privação do discernimento, como a esquizofrenia e as demências. O perito deverá definir qual patologia afeta o periciando (diagnóstico clínico) e avaliar se esse quadro clínico afeta sua capacidade de discernimento (diagnóstico médico-legal). III. Uma ação cível de interdição é promovida quando o indivíduo perde sua capacidade de gerir a sua própria pessoa; essa ação pode ser solicitada sempre pelo pai, mãe ou tutor, bem como pelo cônjuge ou algum parente próximo. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III.$q$,$q$C$q$,16,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(79,$q$Psiquiatria Forense$q$,$q$Quando houver dúvida sobre a sanidade mental do acusado, o Juiz determinará a perícia médica, instaurando o auto de Incidente de Insanidade Mental. Esse pode ser pedido pelo magistrado, pelo Ministério Público ou pelo defensor, entre outros. Sobre a regulação da perícia médica no Código de Processo Penal, assinale a afirmativa correta.
(A) Os peritos têm acesso aos autos do processo a despeito da marcha do processo (Art. 150, § 2º).
(B) Para o efeito do exame, o acusado, se estiver preso, será liberado para a realização do exame (Art. 150).
(C) O exame não durará mais de 45 dias, salvo se os peritos demonstrarem a necessidade de maior prazo (Art. 150, § 1º).
(D) O exame somente pode ser ordenado durante o processo jurídico, não cabendo a referida avaliação na fase de inquérito (Art. 149, § 1º).
(E) Se os peritos concluírem que o acusado é, ao tempo do processo, irresponsável nos termos do Art. 26 do CP, o processo prosseguirá com a presença do curador (Art. 151).$q$,$q$C$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$),(80,$q$Psiquiatria Forense$q$,$q$O assunto personalidade e suas alterações é um dos mais difíceis e polêmicos de toda a psicopatologia (...) Personalidade é o conjunto integrado de traços psíquicos, consistindo no total das características individuais, em sua relação com o meio, conjugando tendências inatas e experiências adquiridas no curso de sua existência. Dalgalarrondo. Psicopatologia e Semiologia dos Transtornos Mentais. 3ª edição. Artmed: Porto Alegre, 2019. Sobre a psicopatia, avalie as afirmativas a seguir. I. Para Kurt Schneider, as personalidades anormais relevantes para a psiquiatria seriam as chamadas personalidades psicopáticas, que incluiriam as pessoas cuja anormalidade de personalidade lhes faria sofrer e causaria sofrimento à sociedade (as pessoas que com elas convivem); para Schneider, as personalidades anormais, inclusive as psicopáticas, não são doenças mentais (que para ele deveriam ter substrato corporal conhecido ou suposto); são apenas variações de normas populacionais; essa ideia permeia os conceitos atuais de transtorno de personalidade. II. O Transtorno de Personalidade Antissocial é a forma de se compreender “sociopatias”, “psicopatias”, sendo critérios para o diagnóstico, conforme o DSM-5: i. fracasso em ajustar- se às normas sociais relativas a comportamentos legais; ii. tendência à falsidade, a mentir repetidamente, a falsificar nomes, documentos, trapacear para ganho pessoal ou por prazer; iii. extremo autocontrole, planejando cuidadosamente suas ações futuras; iv. ausência de remorso, verificada pela indiferença ou racionalização em relação a ter ferido, maltratado, prejudicado gravemente ou roubado outras pessoas. Assim, verifica-se a incapacidade de experimentar culpa e de aprender com a experiência, particularmente com a punição. III. O tratamento do transtorno de personalidade antissocial normalmente é bem-sucedido, com psicoterapias (em especial a psicanalítica) e medidas de reabilitação social. Está correto o que se afirma em
(A) I, apenas.
(B) I e II, apenas.
(C) I e III, apenas.
(D) II e III, apenas.
(E) I, II e III. Realização$q$,$q$A$q$,17,$q$under_review$q$,false,false,$q$Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo.$q$)) v(n,subj,txt,ans,pg,st,legal,ctx,note)
join public.content_sources qs on qs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/medico-legistacns201-tipo-1.pdf$q$ join public.content_sources gs on gs.url=$q$https://conhecimento.fgv.br/sites/default/files/concursos/gabaritodefinitivo_pcgmpmedico-002.pdf$q$
join public.syllabus_editions ed on ed.contest_name=$q$Polícia Civil de Minas Gerais$q$ and ed.role_name=$q$Médico-Legista$q$ and ed.contest_year=2025
join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj
on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;
-- @@
