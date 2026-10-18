-- Cadastro da prova objetiva PM-SC 2023 (Soldado da Polícia Militar, banca Cebraspe, aplicada em 27/08/2023). Gerado em 17/10/2026.
-- Fontes oficiais (cdn.cebraspe.org.br): caderno da prova objetiva, gabarito oficial DEFINITIVO e justificativas de alterações do gabarito.
-- Gabarito definitivo (X = anulada): 1-20: C A X C E D E A B D E A E D C B B D X E | 21-40: B C A C D B D E E X A A D A C B D E B E | 41-58: C C D A B X C C E A B B E D C A X D
-- Anuladas: 3, 19, 30, 46 e 57 (conferidas com o documento de justificativas). official_answer das anuladas = X.
-- Auditoria (17/10/2026): leis federais conferidas no texto compilado do Planalto; jurisprudência com fonte do STJ; itens doutrinários, de legislação estadual de SC e dependentes de figura ficam em under_review com o motivo no review_note.
-- Edital considerado: Edital de Abertura atualizado (itens 16.33/16.34: legislação em vigor até a data do edital é objeto de avaliação).
begin;
insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro','Prova objetiva PM-SC 2023 - Soldado da Polícia Militar (Cebraspe)','Cebraspe / PMSC','https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/862_PMSC_SOLDADO_001_01.PDF','vigente','Caderno oficial da prova objetiva (matriz 862_PMSC_SOLDADO_001_01), 58 questões; aplicação em 27/08/2023.'),
('outro','Gabarito oficial definitivo PM-SC 2023 - Soldado da Polícia Militar (Cebraspe)','Cebraspe / PMSC','https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/GAB_DEFINITIVO_862_PMSC_SOLDADO_001_01.PDF','vigente','Gabaritos oficiais definitivos; X = questão anulada (3, 19, 30, 46, 57).'),
('outro','Justificativas de alteração do gabarito PM-SC 2023 - Soldado (Cebraspe)','Cebraspe / PMSC','https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/PM_SC_23_SOLDADO_JUSTIFICATIVAS_DE_ALTERAES_DE_GABARITO.PDF','vigente','Cinco anulações deferidas: 3, 19, 30, 46 e 57.'),
('outro','Edital de Abertura (atualizado) PM-SC 2023 - Soldado (Cebraspe)','Cebraspe / PMSC','https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/Ed_2_2022_PMSC_Abertura_Soldado_atualizado.pdf','vigente','Objetos de avaliação, cronograma e regras do concurso.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;
insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id)
select 'Polícia Militar de Santa Catarina','Soldado da Polícia Militar',2023,'CEBRASPE',(select id from public.content_sources where url='https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/Ed_2_2022_PMSC_Abertura_Soldado_atualizado.pdf')
where not exists (select 1 from public.syllabus_editions where contest_name='Polícia Militar de Santa Catarina' and role_name='Soldado da Polícia Militar' and contest_year=2023);
with edition as (
  select id from public.syllabus_editions where contest_name='Polícia Militar de Santa Catarina' and role_name='Soldado da Polícia Militar' and contest_year=2023
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Prova objetiva',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Direito Constitucional','Constituição de 1988: princípios fundamentais; aplicabilidade das normas constitucionais; direitos e garantias fundamentais, nacionalidade, direitos políticos e partidos; organização político-administrativa (Estado federal); administração pública e servidores.'),
  ('Direito Penal','Aplicação da lei penal; fato típico, tentativa e concurso de crimes; ilicitude e culpabilidade; concurso de pessoas; crimes contra a pessoa, o patrimônio, a fé pública e a administração pública; Lei 8.072/1990; entendimento dos tribunais superiores.'),
  ('Direito Processual Penal','Processo penal constitucional; sistemas e princípios; aplicação da lei processual no tempo, no espaço e em relação às pessoas; disposições preliminares do CPP; inquérito policial.'),
  ('Legislação Institucional','Lei 6.218/1983 (Estatuto dos Policiais-Militares de SC); Decreto 12.112/1980 (RDPMSC); Decreto-lei 667/1969; Decreto 88.777/1983 (R-200); LC 587/2013; Lei 6.215/1983 e Decreto 19.236/1983 (promoção de oficiais); LC 614/2013 (subsídio); Decreto 1.601/2021 (organização básica da PMSC).'),
  ('Língua Portuguesa','Compreensão e interpretação de textos; tipologia textual; ortografia; acentuação; classes de palavras; crase; sintaxe; pontuação; concordância; regência; significação das palavras; redação de correspondências oficiais (Manual de Redação da Presidência).'),
  ('Informática','Internet e intranet; tecnologias e procedimentos de informática; LibreOffice (texto, planilhas, apresentações); Windows 10; navegação e correio eletrônico; segurança: vírus, worms e derivados.'),
  ('Raciocínio Lógico','Proposições e valores lógicos; sentenças abertas; número de linhas da tabela-verdade; conectivos; tautologia; operações com conjuntos; porcentagens.')
) as d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;
with imported(item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,legal_basis,review_note,tested_topic) as (values
(1,$q$Direito Constitucional$q$,$q$Considerando os princípios fundamentais, os direitos de nacionalidade e a organização do Estado brasileiro, assinale a opção correta de acordo com a Constituição Federal de 1988 (CF).
(A) Os entes da Federação, em seus três níveis — União, estados e municípios —, possuem soberania.
(B) Para fins constitucionais, a população do Brasil é formada apenas por brasileiros natos.
(C) A erradicação da pobreza e da marginalização é objetivo fundamental da República Federativa do Brasil.
(D) A CF adota a separação rígida dos Poderes, de modo que cada Poder possui funções especializadas que os demais não podem exercer, ainda que excepcionalmente.
(E) A CF expressamente elenca a orientação sexual entre os fatores com base nos quais não se admite tratamento jurídico diferenciado de pessoas.$q$,$q$Considerando os princípios fundamentais, os direitos de nacionalidade e a organização do Estado brasileiro, assinale a opção correta de acordo com a Constituição Federal de 1988 (CF).
(A) Os entes da Federação, em seus três níveis — União, estados e municípios —, possuem soberania.
(B) Para fins constitucionais, a população do Brasil é formada apenas por brasileiros natos.
(C) A erradicação da pobreza e da marginalização é objetivo fundamental da República Federativa do Brasil.
(D) A CF adota a separação rígida dos Poderes, de modo que cada Poder possui funções especializadas que os demais não podem exercer, ainda que excepcionalmente.
(E) A CF expressamente elenca a orientação sexual entre os fatores com base nos quais não se admite tratamento jurídico diferenciado de pessoas.$q$,'C',1,'active',true,false,'[{"title": "CF, art. 3º, III", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CF, art. 3º, III; chave C confere com o gabarito definitivo Cebraspe. Erradicar a pobreza e a marginalização é objetivo fundamental da República.$q$,$q$Objetivos fundamentais da República: erradicação da pobreza$q$),
(2,$q$Direito Constitucional$q$,$q$A respeito da eficácia das normas constitucionais, assinale a opção correta.
(A) Mesmo normas constitucionais programáticas possuem algum nível de eficácia.
(B) Certas normas constitucionais são completamente destituídas de efeito.
(C) A norma constitucional que define um plano de ação para os órgãos públicos é de eficácia plena.
(D) A eficácia das normas constitucionais não pode, em nenhum caso, depender de normas hierarquicamente inferiores.
(E) Apenas as normas constitucionais de eficácia plena produzem o efeito de condicionar aos seus preceitos novas normas criadas posteriormente pelo Poder Legislativo.$q$,$q$A respeito da eficácia das normas constitucionais, assinale a opção correta.
(A) Mesmo normas constitucionais programáticas possuem algum nível de eficácia.
(B) Certas normas constitucionais são completamente destituídas de efeito.
(C) A norma constitucional que define um plano de ação para os órgãos públicos é de eficácia plena.
(D) A eficácia das normas constitucionais não pode, em nenhum caso, depender de normas hierarquicamente inferiores.
(E) Apenas as normas constitucionais de eficácia plena produzem o efeito de condicionar aos seus preceitos novas normas criadas posteriormente pelo Poder Legislativo.$q$,'A',1,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A). Mantida em revisão: Item doutrinário (eficácia das normas programáticas): sem texto legal que valide a chave.$q$,$q$Eficácia das normas constitucionais programáticas$q$),
(3,$q$Direito Constitucional$q$,$q$No que se refere aos direitos e deveres individuais e coletivos, julgue os itens que se seguem. I Um integrante de uma associação poderá, por decisão da maioria de seus membros reunidos em assembleia, ficar proibido de desligar-se do quadro de sócios. II O direito de propriedade não tem natureza de direito absoluto. III Não é permitido ingressar na casa de alguém no período noturno, ainda que com mandado judicial. IV Em casos de urgência e de perigo à ordem pública, a polícia poderá realizar interceptação telefônica desde que previamente peça e obtenha, em até 48 horas, autorização do Ministério Público e do Poder Judiciário. Estão certos apenas os itens
(A) I e II.
(B) I e IV.
(C) II e III.
(D) I, III e IV.
(E) II, III e IV.$q$,$q$No que se refere aos direitos e deveres individuais e coletivos, julgue os itens que se seguem. I Um integrante de uma associação poderá, por decisão da maioria de seus membros reunidos em assembleia, ficar proibido de desligar-se do quadro de sócios. II O direito de propriedade não tem natureza de direito absoluto. III Não é permitido ingressar na casa de alguém no período noturno, ainda que com mandado judicial. IV Em casos de urgência e de perigo à ordem pública, a polícia poderá realizar interceptação telefônica desde que previamente peça e obtenha, em até 48 horas, autorização do Ministério Público e do Poder Judiciário. Estão certos apenas os itens
(A) I e II.
(B) I e IV.
(C) II e III.
(D) I, III e IV.
(E) II, III e IV.$q$,'X',1,'annulled',true,false,null,$q$Questão anulada pelo Cebraspe (gabarito oficial definitivo = X; ver justificativas de alteração do gabarito). Não deve ser usada em treino.$q$,$q$Direitos individuais: associação, propriedade, domicílio e interceptação telefônica$q$),
(4,$q$Direito Constitucional$q$,$q$No Brasil, os partidos políticos
(A) têm direito de acesso gratuito ao rádio e à televisão, desde que sejam registrados na justiça eleitoral.
(B) não são indispensáveis ao funcionamento do regime democrático.
(C) não necessitam de autorização estatal prévia para se constituir.
(D) integram a estrutura da administração pública.
(E) podem ter qualquer finalidade e receber recursos de qualquer origem, em virtude do princípio da liberdade partidária.$q$,$q$No Brasil, os partidos políticos
(A) têm direito de acesso gratuito ao rádio e à televisão, desde que sejam registrados na justiça eleitoral.
(B) não são indispensáveis ao funcionamento do regime democrático.
(C) não necessitam de autorização estatal prévia para se constituir.
(D) integram a estrutura da administração pública.
(E) podem ter qualquer finalidade e receber recursos de qualquer origem, em virtude do princípio da liberdade partidária.$q$,'C',1,'active',true,false,'[{"title": "CF, art. 17, caput", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CF, art. 17, caput; chave C confere com o gabarito definitivo Cebraspe. A criação de partidos é livre; não depende de autorização estatal prévia.$q$,$q$Partidos políticos: livre criação sem autorização estatal prévia$q$),
(5,$q$Direito Constitucional$q$,$q$Na Federação brasileira, os estados
(A) detêm soberania frente às decisões da União.
(B) podem organizar-se livremente por meio de Constituição estadual, dispensada de observar as regras da Constituição Federal.
(C) possuem a mesma estrutura de Poderes que os municípios.
(D) têm Poder Legislativo organizado de forma bicameral, com dois órgãos legislativos, tal qual a União.
(E) podem, apesar da autonomia municipal, intervir nos municípios, em algumas circunstâncias.$q$,$q$Na Federação brasileira, os estados
(A) detêm soberania frente às decisões da União.
(B) podem organizar-se livremente por meio de Constituição estadual, dispensada de observar as regras da Constituição Federal.
(C) possuem a mesma estrutura de Poderes que os municípios.
(D) têm Poder Legislativo organizado de forma bicameral, com dois órgãos legislativos, tal qual a União.
(E) podem, apesar da autonomia municipal, intervir nos municípios, em algumas circunstâncias.$q$,'E',1,'active',true,false,'[{"title": "CF, art. 35", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CF, art. 35; chave E confere com o gabarito definitivo Cebraspe. O Estado pode intervir nos municípios nas hipóteses do art. 35.$q$,$q$Federação: intervenção do estado nos municípios$q$),
(6,$q$Direito Constitucional$q$,$q$Em relação aos municípios da Federação brasileira, assinale a opção correta.
(A) Em todas as câmaras municipais, o controle externo será exercido com o auxílio do tribunal de contas dos municípios.
(B) A lei orgânica dos municípios deve ser aprovada pela assembleia legislativa dos respectivos estados.
(C) A lei orgânica dos municípios define livremente o número de vereadores das respectivas câmaras municipais, de acordo com a realidade e a decisão política de cada município.
(D) Os prefeitos municipais que praticarem crime comum no exercício da função e em razão dela deverão ser julgados, em regra, pelo tribunal de justiça estadual.
(E) No caso de divergência entre a orientação do Poder Executivo municipal e a do estadual, esta última deverá prevalecer.$q$,$q$Em relação aos municípios da Federação brasileira, assinale a opção correta.
(A) Em todas as câmaras municipais, o controle externo será exercido com o auxílio do tribunal de contas dos municípios.
(B) A lei orgânica dos municípios deve ser aprovada pela assembleia legislativa dos respectivos estados.
(C) A lei orgânica dos municípios define livremente o número de vereadores das respectivas câmaras municipais, de acordo com a realidade e a decisão política de cada município.
(D) Os prefeitos municipais que praticarem crime comum no exercício da função e em razão dela deverão ser julgados, em regra, pelo tribunal de justiça estadual.
(E) No caso de divergência entre a orientação do Poder Executivo municipal e a do estadual, esta última deverá prevalecer.$q$,'D',1,'active',true,false,'[{"title": "CF, art. 29, X", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CF, art. 29, X; chave D confere com o gabarito definitivo Cebraspe. O prefeito é julgado pelo Tribunal de Justiça.$q$,$q$Municípios: foro do prefeito no Tribunal de Justiça$q$),
(7,$q$Direito Constitucional$q$,$q$Considerando as disposições gerais da CF acerca da administração pública, assinale a opção correta.
(A) Em razão do princípio da legalidade, todas as normas constitucionais devem ser objeto de lei ordinária para que a administração pública possa agir de forma legítima com base nelas.
(B) Todos os princípios aplicáveis à administração pública devem estar expressos na CF, que não admite princípios implícitos.
(C) Em regra, se não houver norma específica que imponha a publicidade de um ato administrativo, não é necessário torná-lo público.
(D) Atos jurídicos da administração pública devem considerar apenas as regras jurídicas objetivas; considerações sobre moralidade, por exemplo, não interferem na validade desses atos.
(E) Por força do princípio da impessoalidade, os atos da administração pública não são atribuídos à pessoa física que os pratica, mas ao órgão ou ente público que esta representa.$q$,$q$Considerando as disposições gerais da CF acerca da administração pública, assinale a opção correta.
(A) Em razão do princípio da legalidade, todas as normas constitucionais devem ser objeto de lei ordinária para que a administração pública possa agir de forma legítima com base nelas.
(B) Todos os princípios aplicáveis à administração pública devem estar expressos na CF, que não admite princípios implícitos.
(C) Em regra, se não houver norma específica que imponha a publicidade de um ato administrativo, não é necessário torná-lo público.
(D) Atos jurídicos da administração pública devem considerar apenas as regras jurídicas objetivas; considerações sobre moralidade, por exemplo, não interferem na validade desses atos.
(E) Por força do princípio da impessoalidade, os atos da administração pública não são atribuídos à pessoa física que os pratica, mas ao órgão ou ente público que esta representa.$q$,'E',1,'active',true,false,'[{"title": "CF, art. 37, caput e §1º", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CF, art. 37, caput e §1º; chave E confere com o gabarito definitivo Cebraspe. Impessoalidade: os atos são imputados ao órgão ou ente, não à pessoa que os pratica (§1º).$q$,$q$Administração pública: princípio da impessoalidade$q$),
(8,$q$Direito Constitucional$q$,$q$Com base nas normas da CF acerca dos servidores públicos e de aspectos a eles relacionados, assinale a opção correta.
(A) Em regra, é inadmitida a acumulação de cargos e empregos públicos.
(B) Cada estado-membro e cada município, devido a sua autonomia, decidem livremente, em lei, o regime jurídico de seus servidores públicos.
(C) O prazo de validade dos concursos públicos é, em regra, de quatro anos, prorrogável uma vez, por igual período.
(D) Todo agente público é contratado por prazo indeterminado, não sendo admitidos no serviço público vínculos profissionais de caráter temporário.
(E) Eventuais acréscimos pecuniários percebidos por servidor público serão computados para fins de concessão de acréscimos ulteriores.$q$,$q$Com base nas normas da CF acerca dos servidores públicos e de aspectos a eles relacionados, assinale a opção correta.
(A) Em regra, é inadmitida a acumulação de cargos e empregos públicos.
(B) Cada estado-membro e cada município, devido a sua autonomia, decidem livremente, em lei, o regime jurídico de seus servidores públicos.
(C) O prazo de validade dos concursos públicos é, em regra, de quatro anos, prorrogável uma vez, por igual período.
(D) Todo agente público é contratado por prazo indeterminado, não sendo admitidos no serviço público vínculos profissionais de caráter temporário.
(E) Eventuais acréscimos pecuniários percebidos por servidor público serão computados para fins de concessão de acréscimos ulteriores.$q$,'A',2,'active',true,false,'[{"title": "CF, art. 37, XVI", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CF, art. 37, XVI; chave A confere com o gabarito definitivo Cebraspe. É vedada a acumulação remunerada de cargos públicos, salvo as exceções constitucionais.$q$,$q$Servidores públicos: vedação à acumulação de cargos$q$),
(9,$q$Direito Penal$q$,$q$Acerca da aplicação da lei penal, assinale a opção correta.
(A) Compete ao juízo das execuções a aplicação da lei penal mais benéfica ao acusado, ainda que não transitada em julgado a sentença condenatória.
(B) Sem prejuízo de convenções, tratados e regras de direito internacional, aplica-se a lei penal brasileira aos fatos ocorridos em aeronaves privadas estrangeiras durante seu voo sobre o território brasileiro.
(C) A lei excepcional ou temporária, quando decorrido o período de sua duração ou cessadas as circunstâncias que a determinaram, não se aplica ao fato praticado durante sua vigência.
(D) Para efeito de análise do local do crime, a legislação brasileira adota a teoria da atividade.
(E) Na contagem dos prazos previstos no Código Penal (CP), exclui-se o dia do começo do prazo e inclui-se o do vencimento.$q$,$q$Acerca da aplicação da lei penal, assinale a opção correta.
(A) Compete ao juízo das execuções a aplicação da lei penal mais benéfica ao acusado, ainda que não transitada em julgado a sentença condenatória.
(B) Sem prejuízo de convenções, tratados e regras de direito internacional, aplica-se a lei penal brasileira aos fatos ocorridos em aeronaves privadas estrangeiras durante seu voo sobre o território brasileiro.
(C) A lei excepcional ou temporária, quando decorrido o período de sua duração ou cessadas as circunstâncias que a determinaram, não se aplica ao fato praticado durante sua vigência.
(D) Para efeito de análise do local do crime, a legislação brasileira adota a teoria da atividade.
(E) Na contagem dos prazos previstos no Código Penal (CP), exclui-se o dia do começo do prazo e inclui-se o do vencimento.$q$,'B',2,'active',true,false,'[{"title": "CP, art. 5º, §2º", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CP, art. 5º, §2º; chave B confere com o gabarito definitivo Cebraspe. A lei brasileira se aplica a crimes a bordo de aeronaves estrangeiras privadas em voo no espaço aéreo brasileiro.$q$,$q$Lei penal no espaço: aeronaves privadas estrangeiras$q$),
(10,$q$Direito Penal$q$,$q$Admite-se punição para a forma tentada de
(A) contravenção penal.
(B) crime habitual.
(C) crime culposo.
(D) crime praticado com dolo eventual.
(E) crime omissivo próprio.$q$,$q$Admite-se punição para a forma tentada de
(A) contravenção penal.
(B) crime habitual.
(C) crime culposo.
(D) crime praticado com dolo eventual.
(E) crime omissivo próprio.$q$,'D',2,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D). Mantida em revisão: Item doutrinário/jurisprudencial (tentativa e dolo eventual): sem fonte do tribunal verificada.$q$,$q$Tentativa: dolo eventual$q$),
(11,$q$Direito Penal$q$,$q$Em relação ao concurso de pessoas, assinale a opção correta.
(A) O ajuste, a determinação ou instigação e o auxílio, salvo disposição expressa em contrário, não são puníveis se o crime houver sido tentado.
(B) O concurso de pessoas caracteriza-se pelo necessário ajuste prévio entre os colaboradores para a prática do delito.
(C) Se a participação for de menor importância, o juiz poderá aplicar o perdão judicial.
(D) Quem, de qualquer modo, concorre para o crime incide nas penas a este cominadas, na medida de sua personalidade.
(E) Se a intenção de algum dos concorrentes fosse participar de crime menos grave, ser-lhe-á aplicada a pena deste, a qual será aumentada até a metade na hipótese de ter sido previsível o resultado mais grave.$q$,$q$Em relação ao concurso de pessoas, assinale a opção correta.
(A) O ajuste, a determinação ou instigação e o auxílio, salvo disposição expressa em contrário, não são puníveis se o crime houver sido tentado.
(B) O concurso de pessoas caracteriza-se pelo necessário ajuste prévio entre os colaboradores para a prática do delito.
(C) Se a participação for de menor importância, o juiz poderá aplicar o perdão judicial.
(D) Quem, de qualquer modo, concorre para o crime incide nas penas a este cominadas, na medida de sua personalidade.
(E) Se a intenção de algum dos concorrentes fosse participar de crime menos grave, ser-lhe-á aplicada a pena deste, a qual será aumentada até a metade na hipótese de ter sido previsível o resultado mais grave.$q$,'E',2,'active',true,false,'[{"title": "CP, art. 29, §2º", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CP, art. 29, §2º; chave E confere com o gabarito definitivo Cebraspe. Cooperação dolosamente distinta: aplica-se a pena do crime menos grave, aumentada até metade se previsível o mais grave.$q$,$q$Concurso de pessoas: cooperação em crime menos grave$q$),
(12,$q$Direito Penal$q$,$q$Nos termos do CP, a pena pelo crime de feminicídio é aumentada de um terço até a metade se o crime tiver sido praticado
(A) enquanto a vítima estava gestante ou nos três meses posteriores ao parto.
(B) em descumprimento de medida protetiva de urgência referente ao dever de pagar alimentos provisórios.
(C) na presença física de terceiros.
(D) na presença virtual de descendentes do acusado.
(E) em descumprimento de medida protetiva de urgência referente ao dever de comparecimento do agressor a programas de recuperação e reeducação.$q$,$q$Nos termos do CP, a pena pelo crime de feminicídio é aumentada de um terço até a metade se o crime tiver sido praticado
(A) enquanto a vítima estava gestante ou nos três meses posteriores ao parto.
(B) em descumprimento de medida protetiva de urgência referente ao dever de pagar alimentos provisórios.
(C) na presença física de terceiros.
(D) na presença virtual de descendentes do acusado.
(E) em descumprimento de medida protetiva de urgência referente ao dever de comparecimento do agressor a programas de recuperação e reeducação.$q$,'A',2,'active',true,false,'[{"title": "CP, art. 121-A, §2º, I", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CP, art. 121-A, §2º, I; chave A confere com o gabarito definitivo Cebraspe. A pena do feminicídio aumenta de 1/3 até a metade se praticado durante a gestação ou nos 3 meses posteriores ao parto.$q$,$q$Feminicídio: causas de aumento de pena$q$),
(13,$q$Direito Penal$q$,$q$Caso um indivíduo seja preso em flagrante pela prática de furto a uma residência, ele será isento de pena se tiver cometido o crime em prejuízo de
(A) sua namorada, desde que coabite com ela.
(B) sua mãe, desde que ela tenha sessenta anos ou mais de idade.
(C) seu irmão, desde que coabite com ele.
(D) seu filho, desde que coabite com ele.
(E) seu cônjuge, na constância da sociedade conjugal.$q$,$q$Caso um indivíduo seja preso em flagrante pela prática de furto a uma residência, ele será isento de pena se tiver cometido o crime em prejuízo de
(A) sua namorada, desde que coabite com ela.
(B) sua mãe, desde que ela tenha sessenta anos ou mais de idade.
(C) seu irmão, desde que coabite com ele.
(D) seu filho, desde que coabite com ele.
(E) seu cônjuge, na constância da sociedade conjugal.$q$,'E',2,'active',true,false,'[{"title": "CP, arts. 181, I e 183, III", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CP, arts. 181, I e 183, III; chave E confere com o gabarito definitivo Cebraspe. É isento de pena o crime patrimonial em prejuízo do cônjuge, na constância da sociedade conjugal.$q$,$q$Imunidades nos crimes patrimoniais entre parentes$q$),
(14,$q$Direito Penal$q$,$q$Quando o agente, mediante mais de uma ação ou omissão, pratica dois ou mais crimes, idênticos ou não, aplicam-se cumulativamente as penas privativas de liberdade em que haja incorrido. Nessa hipótese, ocorre
(A) crime continuado.
(B) concurso formal imperfeito.
(C) concurso formal.
(D) concurso material.
(E) crime multitudinário.$q$,$q$Quando o agente, mediante mais de uma ação ou omissão, pratica dois ou mais crimes, idênticos ou não, aplicam-se cumulativamente as penas privativas de liberdade em que haja incorrido. Nessa hipótese, ocorre
(A) crime continuado.
(B) concurso formal imperfeito.
(C) concurso formal.
(D) concurso material.
(E) crime multitudinário.$q$,'D',2,'active',true,false,'[{"title": "CP, art. 69", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CP, art. 69; chave D confere com o gabarito definitivo Cebraspe. Mais de uma ação ou omissão com dois ou mais crimes: concurso material, penas somadas.$q$,$q$Concurso material de crimes$q$),
(15,$q$Direito Penal$q$,$q$A conduta de funcionário público, fora do exercício de sua função, mas em razão dela, exigir o pagamento de uma vantagem indevida configura o crime de
(A) extorsão.
(B) prevaricação.
(C) concussão.
(D) corrupção passiva.
(E) advocacia administrativa.$q$,$q$A conduta de funcionário público, fora do exercício de sua função, mas em razão dela, exigir o pagamento de uma vantagem indevida configura o crime de
(A) extorsão.
(B) prevaricação.
(C) concussão.
(D) corrupção passiva.
(E) advocacia administrativa.$q$,'C',2,'active',true,false,'[{"title": "CP, art. 316", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CP, art. 316; chave C confere com o gabarito definitivo Cebraspe. Exigir vantagem indevida, ainda que fora da função, mas em razão dela, é concussão.$q$,$q$Concussão: exigência de vantagem fora da função$q$),
(16,$q$Direito Penal$q$,$q$Segundo o entendimento jurisprudencial do Superior Tribunal de Justiça (STJ), inserir informação falsa em currículo Lattes configura
(A) crime de falsificação de documento particular.
(B) conduta atípica.
(C) crime de falsidade ideológica.
(D) crime de estelionato.
(E) crime de falsificação de documento público.$q$,$q$Segundo o entendimento jurisprudencial do Superior Tribunal de Justiça (STJ), inserir informação falsa em currículo Lattes configura
(A) crime de falsificação de documento particular.
(B) conduta atípica.
(C) crime de falsidade ideológica.
(D) crime de estelionato.
(E) crime de falsificação de documento público.$q$,'B',2,'active',true,false,'[{"title": "STJ, RHC 81.451/RJ", "url": "https://www.stj.jus.br/websecstj/cgi/revista/REJ.cgi/ATC?seq=75113488&tipo=91&nreg=201700438088&dt=20170831&formato=PDF&salvar=false", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra STJ, RHC 81.451/RJ; chave B confere com o gabarito definitivo Cebraspe. Para o STJ, a informação falsa em currículo (Lattes) é conduta atípica, por ser passível de verificação.$q$,$q$Informação falsa em currículo Lattes: atipicidade (STJ)$q$),
(17,$q$Direito Processual Penal$q$,$q$No que se refere à aplicação da lei processual penal no tempo, assinale a opção correta.
(A) Nova lei processual penal, mesmo que favorável ao agente de crime, é aplicável aos fatos anteriores a ela, ainda que já haja decisão a respeito desses fatos em sentença condenatória transitada em julgado.
(B) Nova lei processual penal tem aplicação imediata em processos que já estejam em andamento.
(C) A lei processual penal não admite interpretação extensiva nem aplicação analógica, por força do princípio da legalidade.
(D) Nova lei processual penal tem aplicação imediata, o que impõe a necessidade de renovação dos atos praticados de acordo com a lei anterior, para que estejam em conformidade com a nova legislação.
(E) A lei processual penal será aplicada exclusivamente aos processos iniciados durante sua vigência.$q$,$q$No que se refere à aplicação da lei processual penal no tempo, assinale a opção correta.
(A) Nova lei processual penal, mesmo que favorável ao agente de crime, é aplicável aos fatos anteriores a ela, ainda que já haja decisão a respeito desses fatos em sentença condenatória transitada em julgado.
(B) Nova lei processual penal tem aplicação imediata em processos que já estejam em andamento.
(C) A lei processual penal não admite interpretação extensiva nem aplicação analógica, por força do princípio da legalidade.
(D) Nova lei processual penal tem aplicação imediata, o que impõe a necessidade de renovação dos atos praticados de acordo com a lei anterior, para que estejam em conformidade com a nova legislação.
(E) A lei processual penal será aplicada exclusivamente aos processos iniciados durante sua vigência.$q$,'B',3,'active',true,false,'[{"title": "CPP, art. 2º", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CPP, art. 2º; chave B confere com o gabarito definitivo Cebraspe. A lei processual penal tem aplicação imediata, sem prejuízo dos atos praticados sob a lei anterior.$q$,$q$Lei processual penal no tempo$q$),
(18,$q$Direito Processual Penal$q$,$q$Assinale a opção correta acerca do processo penal constitucional.
(A) Ninguém será considerado culpado até o seu julgamento em segunda instância.
(B) Permite-se, excepcionalmente, a criação de juízo ou de tribunal especial para julgar crimes graves.
(C) O princípio da inadmissibilidade das provas ilícitas será afastado quando a prova, ainda que obtida por meios ilícitos, for absolutamente necessária para estabelecer a verdade real dos fatos.
(D) O princípio do contraditório constitui corolário do devido processo legal.
(E) Por força do princípio da intranscendência, é terminantemente vedado estender aos sucessores do condenado a obrigação de reparar o dano por ele causado.$q$,$q$Assinale a opção correta acerca do processo penal constitucional.
(A) Ninguém será considerado culpado até o seu julgamento em segunda instância.
(B) Permite-se, excepcionalmente, a criação de juízo ou de tribunal especial para julgar crimes graves.
(C) O princípio da inadmissibilidade das provas ilícitas será afastado quando a prova, ainda que obtida por meios ilícitos, for absolutamente necessária para estabelecer a verdade real dos fatos.
(D) O princípio do contraditório constitui corolário do devido processo legal.
(E) Por força do princípio da intranscendência, é terminantemente vedado estender aos sucessores do condenado a obrigação de reparar o dano por ele causado.$q$,'D',3,'active',true,false,'[{"title": "CF, art. 5º, LIV e LV", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CF, art. 5º, LIV e LV; chave D confere com o gabarito definitivo Cebraspe. O contraditório decorre do devido processo legal.$q$,$q$Processo penal constitucional: contraditório e devido processo legal$q$),
(19,$q$Direito Processual Penal$q$,$q$Considerando-se os sistemas processuais, é correto afirmar que uma das características do sistema acusatório é
(A) a separação das funções de acusar, defender e julgar, ficando cada qual a cargo de uma pessoa distinta.
(B) a existência, em regra, de decisões sigilosas.
(C) o reconhecimento do réu como objeto de direito.
(D) a neutralidade do juiz.
(E) a iniciativa probatória de ofício.$q$,$q$Considerando-se os sistemas processuais, é correto afirmar que uma das características do sistema acusatório é
(A) a separação das funções de acusar, defender e julgar, ficando cada qual a cargo de uma pessoa distinta.
(B) a existência, em regra, de decisões sigilosas.
(C) o reconhecimento do réu como objeto de direito.
(D) a neutralidade do juiz.
(E) a iniciativa probatória de ofício.$q$,'X',3,'annulled',true,false,null,$q$Questão anulada pelo Cebraspe (gabarito oficial definitivo = X; ver justificativas de alteração do gabarito). Não deve ser usada em treino.$q$,$q$Sistema processual acusatório$q$),
(20,$q$Direito Processual Penal$q$,$q$Segundo o princípio de vedação da autoincriminação (nemo tenetur se detegere), o acusado
(A) é obrigado a fornecer padrões vocais necessários para subsidiar prova pericial de verificação de interlocutor.
(B) é obrigado a fornecer material para exame grafotécnico, para fins de reconhecimento de escritos por comparação de letra.
(C) é obrigado a participar da reconstituição do crime a ele imputado.
(D) não pode mentir, sob pena de perjúrio.
(E) tem direito ao silêncio, o que não implica direito de falsear a verdade quanto à identidade pessoal.$q$,$q$Segundo o princípio de vedação da autoincriminação (nemo tenetur se detegere), o acusado
(A) é obrigado a fornecer padrões vocais necessários para subsidiar prova pericial de verificação de interlocutor.
(B) é obrigado a fornecer material para exame grafotécnico, para fins de reconhecimento de escritos por comparação de letra.
(C) é obrigado a participar da reconstituição do crime a ele imputado.
(D) não pode mentir, sob pena de perjúrio.
(E) tem direito ao silêncio, o que não implica direito de falsear a verdade quanto à identidade pessoal.$q$,'E',3,'active',true,false,'[{"title": "STJ, Súmula 522", "url": "https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/2025/17062025-Crime-de-falsa-identidade-nao-exige-obtencao-de-vantagem-e-se-consuma-no-ato-de-fornecer-dado-incorreto.aspx", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra STJ, Súmula 522; chave E confere com o gabarito definitivo Cebraspe. O silêncio é direito, mas atribuir-se falsa identidade perante a autoridade policial é típico (STJ, Súmula 522).$q$,$q$Nemo tenetur: direito ao silêncio e falsa identidade$q$),
(21,$q$Direito Processual Penal$q$,$q$No tocante ao inquérito policial, julgue os itens seguintes, à luz do Código de Processo Penal (CPP). I Para repressão do crime de tráfico de pessoas, o membro do Ministério Público poderá requisitar diretamente às empresas prestadoras de serviço de telecomunicações que disponibilizem imediatamente os sinais que permitam a localização da vítima do delito em curso. II O policial militar que figure como investigado em inquérito policial cujo objeto seja a investigação de fatos relacionados ao uso de força letal no exercício profissional poderá constituir defensor. III O ofendido, ou seu representante legal, e o indiciado poderão requisitar qualquer diligência, que será realizada pela autoridade policial, em respeito ao princípio da isonomia. Assinale a opção correta.
(A) Apenas o item I está certo.
(B) Apenas o item II está certo.
(C) Apenas os itens I e III estão certos.
(D) Apenas os itens II e III estão certos.
(E) Todos os itens estão certos.$q$,$q$No tocante ao inquérito policial, julgue os itens seguintes, à luz do Código de Processo Penal (CPP). I Para repressão do crime de tráfico de pessoas, o membro do Ministério Público poderá requisitar diretamente às empresas prestadoras de serviço de telecomunicações que disponibilizem imediatamente os sinais que permitam a localização da vítima do delito em curso. II O policial militar que figure como investigado em inquérito policial cujo objeto seja a investigação de fatos relacionados ao uso de força letal no exercício profissional poderá constituir defensor. III O ofendido, ou seu representante legal, e o indiciado poderão requisitar qualquer diligência, que será realizada pela autoridade policial, em respeito ao princípio da isonomia. Assinale a opção correta.
(A) Apenas o item I está certo.
(B) Apenas o item II está certo.
(C) Apenas os itens I e III estão certos.
(D) Apenas os itens II e III estão certos.
(E) Todos os itens estão certos.$q$,'B',3,'active',true,false,'[{"title": "CPP, arts. 13-B, 14 e 14-A", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CPP, arts. 13-B, 14 e 14-A; chave B confere com o gabarito definitivo Cebraspe. Sinais de localização exigem autorização judicial (13-B); o policial investigado por uso de força letal pode constituir defensor (14-A); diligências requeridas são realizadas a juízo da autoridade (14).$q$,$q$Inquérito policial: requisição de sinais, defensor do policial e diligências$q$),
(22,$q$Direito Processual Penal$q$,$q$João estava sendo investigado por um crime, no entanto, devido à falta de indícios suficientes de autoria, o inquérito policial foi arquivado mediante pedido do Ministério Público e determinação da autoridade judiciária competente. Passados dois anos, a polícia civil descobriu uma nova prova relevante que apontava para o possível envolvimento de João no crime em questão. Essa prova consistia em imagens de câmeras de segurança de residências, na vizinhança onde ocorrera o delito, captadas no momento exato da sua prática, mas cuja existência só foi descoberta posteriormente. Com base nessa nova evidência, o delegado responsável pelo caso pretende desarquivar o inquérito policial para retomar as investigações. Considerando a situação hipotética precedente, assinale a opção correta.
(A) O inquérito policial não poderá ser reaberto, pois se operou a coisa julgada material.
(B) A reabertura das investigações poderá decorrer de simples mudança de opinião ou reavaliação da situação, em razão do princípio da verdade real.
(C) Dada a notícia de prova nova, é possível o desarquivamento do inquérito policial.
(D) Não poderá haver o desarquivamento do inquérito, uma vez que as imagens foram captadas antes do seu arquivamento.
(E) O arquivamento do inquérito por falta de justa causa poderia ter sido diretamente determinado pela autoridade policial, sem a necessidade de manifestação do Ministério Público ou do juiz.$q$,$q$João estava sendo investigado por um crime, no entanto, devido à falta de indícios suficientes de autoria, o inquérito policial foi arquivado mediante pedido do Ministério Público e determinação da autoridade judiciária competente. Passados dois anos, a polícia civil descobriu uma nova prova relevante que apontava para o possível envolvimento de João no crime em questão. Essa prova consistia em imagens de câmeras de segurança de residências, na vizinhança onde ocorrera o delito, captadas no momento exato da sua prática, mas cuja existência só foi descoberta posteriormente. Com base nessa nova evidência, o delegado responsável pelo caso pretende desarquivar o inquérito policial para retomar as investigações. Considerando a situação hipotética precedente, assinale a opção correta.
(A) O inquérito policial não poderá ser reaberto, pois se operou a coisa julgada material.
(B) A reabertura das investigações poderá decorrer de simples mudança de opinião ou reavaliação da situação, em razão do princípio da verdade real.
(C) Dada a notícia de prova nova, é possível o desarquivamento do inquérito policial.
(D) Não poderá haver o desarquivamento do inquérito, uma vez que as imagens foram captadas antes do seu arquivamento.
(E) O arquivamento do inquérito por falta de justa causa poderia ter sido diretamente determinado pela autoridade policial, sem a necessidade de manifestação do Ministério Público ou do juiz.$q$,'C',3,'active',true,false,'[{"title": "CPP, art. 18", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CPP, art. 18; chave C confere com o gabarito definitivo Cebraspe. Arquivado o inquérito, a autoridade policial pode fazer novas pesquisas se tiver notícia de outras provas.$q$,$q$Arquivamento do inquérito e prova nova$q$),
(23,$q$Direito Processual Penal$q$,$q$O inquérito policial é um procedimento
(A) de natureza inquisitiva.
(B) indispensável.
(C) público em todos os seus atos.
(D) passível de ser presidido pelo Ministério Público.
(E) não oficioso.$q$,$q$O inquérito policial é um procedimento
(A) de natureza inquisitiva.
(B) indispensável.
(C) público em todos os seus atos.
(D) passível de ser presidido pelo Ministério Público.
(E) não oficioso.$q$,'A',3,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A). Mantida em revisão: Item doutrinário (natureza do inquérito policial): sem texto legal que valide a chave.$q$,$q$Natureza do inquérito policial$q$),
(24,$q$Direito Processual Penal$q$,$q$Uma vez instaurado pelo delegado de polícia, o inquérito policial deve ser concluído no prazo de
(A) cinco dias, em caso de prisão em flagrante.
(B) quinze dias, caso o investigado esteja solto.
(C) dez dias, em caso de prisão preventiva.
(D) trinta dias, em caso de crime hediondo.
(E) dez dias, sendo prorrogável por igual período, em caso de prisão em flagrante.$q$,$q$Uma vez instaurado pelo delegado de polícia, o inquérito policial deve ser concluído no prazo de
(A) cinco dias, em caso de prisão em flagrante.
(B) quinze dias, caso o investigado esteja solto.
(C) dez dias, em caso de prisão preventiva.
(D) trinta dias, em caso de crime hediondo.
(E) dez dias, sendo prorrogável por igual período, em caso de prisão em flagrante.$q$,'C',3,'active',true,false,'[{"title": "CPP, art. 10", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra CPP, art. 10; chave C confere com o gabarito definitivo Cebraspe. O inquérito termina em 10 dias se o indiciado está preso preventivamente ou em flagrante, e em 30 dias se solto.$q$,$q$Prazo para conclusão do inquérito policial$q$),
(25,$q$Legislação Institucional$q$,$q$José, aluno-oficial do primeiro ano do curso de formação de oficiais da Polícia Militar de Santa Catarina (PMSC), conheceu Maria, turista espanhola de passagem pelo Brasil. Embora soubesse que o curso exigia a condição de solteiro, José casou-se com Maria às escondidas. Após o casamento, o casal viajou por sete dias. Ao retornar, José informou à corporação que se casara e que estivera em lua de mel no referido período. Nessa situação hipotética, conforme o Estatuto dos Policiais Militares do Estado de Santa Catarina (Lei n.º 6.218/1983), José
(A) deveria ter sido considerado desaparecido pela corporação policial militar no período em que se ausentou do curso de formação de oficiais.
(B) tinha direito ao afastamento total do serviço por motivo de núpcias.
(C) poderá permanecer, se for do interesse da corporação, na graduação de terceiro-sargento da PMSC, desde que tranque definitivamente sua matrícula no curso de formação de oficiais.
(D) deve ser excluído da corporação, sem qualquer direito a remuneração ou indenização.
(E) terá agido corretamente se, por ocasião de seu retorno, tiver apresentado documentação que justificasse sua ausência.$q$,$q$José, aluno-oficial do primeiro ano do curso de formação de oficiais da Polícia Militar de Santa Catarina (PMSC), conheceu Maria, turista espanhola de passagem pelo Brasil. Embora soubesse que o curso exigia a condição de solteiro, José casou-se com Maria às escondidas. Após o casamento, o casal viajou por sete dias. Ao retornar, José informou à corporação que se casara e que estivera em lua de mel no referido período. Nessa situação hipotética, conforme o Estatuto dos Policiais Militares do Estado de Santa Catarina (Lei n.º 6.218/1983), José
(A) deveria ter sido considerado desaparecido pela corporação policial militar no período em que se ausentou do curso de formação de oficiais.
(B) tinha direito ao afastamento total do serviço por motivo de núpcias.
(C) poderá permanecer, se for do interesse da corporação, na graduação de terceiro-sargento da PMSC, desde que tranque definitivamente sua matrícula no curso de formação de oficiais.
(D) deve ser excluído da corporação, sem qualquer direito a remuneração ou indenização.
(E) terá agido corretamente se, por ocasião de seu retorno, tiver apresentado documentação que justificasse sua ausência.$q$,'D',4,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D). Mantida em revisão: Legislação estadual (Lei SC 6.218/1983): fonte oficial (ALESC) fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Estatuto dos Policiais Militares de SC: casamento de aluno-oficial$q$),
(26,$q$Legislação Institucional$q$,$q$Em 7/7/2023, sexta-feira, Alberto chegou ao 1.º Batalhão da PMSC para cumprir escala de serviço como guarda do quartel, porém foi preso por estar visivelmente embriagado. No alojamento, começou a furtar dinheiro da carteira de Carlos, que o surpreendeu e passou a agredi-lo. Ato contínuo, Mário tentou impedir as agressões, mas foi agredido seriamente por Carlos. Utilizando-se dos meios necessários, Mário repeliu a injusta agressão de Carlos, momento em que este foi lesionado por Mário. Após os ânimos se acalmarem, Alberto, Carlos e Mário decidiram não comunicar o fato a seus superiores, porém o soldado André, que havia presenciado tudo, comunicou o ocorrido ao seu chefe imediato, por escrito, no dia seguinte, mencionando, inclusive, que Alberto tinha sido seu companheiro de curso de formação policial e que ambos ingressaram na corporação em 1.º/5/2014. Em relação a essa situação hipotética, assinale a opção correta segundo o Regulamento Disciplinar da PMSC e o Estatuto dos Policiais Militares do Estado de Santa Catarina.
(A) André não fez a comunicação do fato em conformidade com a forma legal prevista no referido regulamento.
(B) Mário não deverá ser punido por ter lesionado Carlos na tentativa de conter as agressões, haja vista ter agido em legítima defesa.
(C) Alberto deverá ser submetido ao Conselho de Disciplina, na forma do referido estatuto.
(D) Caso se sinta prejudicado e injustiçado, Alberto poderá ajuizar representação, solicitando à autoridade que determinou sua punição disciplinar que reexamine sua decisão e a reconsidere.
(E) O início do cumprimento da punição disciplinar imposta a Alberto se dará com a publicação da punição disciplinar em boletim da organização policial militar.$q$,$q$Em 7/7/2023, sexta-feira, Alberto chegou ao 1.º Batalhão da PMSC para cumprir escala de serviço como guarda do quartel, porém foi preso por estar visivelmente embriagado. No alojamento, começou a furtar dinheiro da carteira de Carlos, que o surpreendeu e passou a agredi-lo. Ato contínuo, Mário tentou impedir as agressões, mas foi agredido seriamente por Carlos. Utilizando-se dos meios necessários, Mário repeliu a injusta agressão de Carlos, momento em que este foi lesionado por Mário. Após os ânimos se acalmarem, Alberto, Carlos e Mário decidiram não comunicar o fato a seus superiores, porém o soldado André, que havia presenciado tudo, comunicou o ocorrido ao seu chefe imediato, por escrito, no dia seguinte, mencionando, inclusive, que Alberto tinha sido seu companheiro de curso de formação policial e que ambos ingressaram na corporação em 1.º/5/2014. Em relação a essa situação hipotética, assinale a opção correta segundo o Regulamento Disciplinar da PMSC e o Estatuto dos Policiais Militares do Estado de Santa Catarina.
(A) André não fez a comunicação do fato em conformidade com a forma legal prevista no referido regulamento.
(B) Mário não deverá ser punido por ter lesionado Carlos na tentativa de conter as agressões, haja vista ter agido em legítima defesa.
(C) Alberto deverá ser submetido ao Conselho de Disciplina, na forma do referido estatuto.
(D) Caso se sinta prejudicado e injustiçado, Alberto poderá ajuizar representação, solicitando à autoridade que determinou sua punição disciplinar que reexamine sua decisão e a reconsidere.
(E) O início do cumprimento da punição disciplinar imposta a Alberto se dará com a publicação da punição disciplinar em boletim da organização policial militar.$q$,'B',4,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B). Mantida em revisão: Legislação estadual (Decreto SC 12.112/1980 e Lei SC 6.218/1983): fonte oficial (ALESC) fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Regulamento disciplinar e Estatuto da PMSC: transgressão, punição e recurso$q$),
(27,$q$Legislação Institucional$q$,$q$Com base no Decreto-lei n.º 667/1969, que reorganiza as polícias militares e os corpos de bombeiros militares dos estados, dos territórios e do Distrito Federal, assinale a opção correta.
(A) A legislação dos regimes próprios de previdência social dos servidores públicos, a partir de 1.º de janeiro de 2025, será aplicada ao sistema de proteção social dos militares dos estados, do Distrito Federal e dos territórios.
(B) É permitido ao policial militar em serviço ativo fazer parte de firmas comerciais de empresas industriais de qualquer natureza.
(C) Cumprido o tempo mínimo de 35 anos de serviço, dos quais no mínimo 30 anos sejam de exercício de atividade de natureza militar, o policial terá direito a aposentaria proporcional, por ocasião da transferência para a inatividade remunerada.
(D) O policial reformado por invalidez decorrente do exercício da função tem direito a remuneração integral, com base na remuneração do posto ou da graduação que possuir por ocasião da transferência para a inatividade remunerada.
(E) Para fins de recebimento da pensão militar, o valor do benefício da remuneração do militar da ativa ou em inatividade será acrescido da vantagem pessoal nominalmente identificada (VPNI).$q$,$q$Com base no Decreto-lei n.º 667/1969, que reorganiza as polícias militares e os corpos de bombeiros militares dos estados, dos territórios e do Distrito Federal, assinale a opção correta.
(A) A legislação dos regimes próprios de previdência social dos servidores públicos, a partir de 1.º de janeiro de 2025, será aplicada ao sistema de proteção social dos militares dos estados, do Distrito Federal e dos territórios.
(B) É permitido ao policial militar em serviço ativo fazer parte de firmas comerciais de empresas industriais de qualquer natureza.
(C) Cumprido o tempo mínimo de 35 anos de serviço, dos quais no mínimo 30 anos sejam de exercício de atividade de natureza militar, o policial terá direito a aposentaria proporcional, por ocasião da transferência para a inatividade remunerada.
(D) O policial reformado por invalidez decorrente do exercício da função tem direito a remuneração integral, com base na remuneração do posto ou da graduação que possuir por ocasião da transferência para a inatividade remunerada.
(E) Para fins de recebimento da pensão militar, o valor do benefício da remuneração do militar da ativa ou em inatividade será acrescido da vantagem pessoal nominalmente identificada (VPNI).$q$,'D',4,'active',true,false,'[{"title": "Decreto-lei 667/1969, art. 24-A, II", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del0667.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra Decreto-lei 667/1969, art. 24-A, II; chave D confere com o gabarito definitivo Cebraspe. O militar reformado por invalidez decorrente do exercício da função tem remuneração integral, com base no posto ou graduação.$q$,$q$Decreto-lei 667/1969: inatividade e remuneração dos militares$q$),
(28,$q$Legislação Institucional$q$,$q$À luz do Decreto n.º 88.777/1983, que aprova o regulamento para as polícias militares e os corpos de bombeiros militares (R-200), assinale a opção correta.
(A) Os anos de serviço correspondem ao tempo mínimo de permanência no posto ou na graduação, nas condições de merecimento e antiguidade.
(B) Quando se fizer necessário o aproveitamento de seus conhecimentos técnicos e especializados, policiais militares reformados poderão ser designados para o serviço ativo.
(C) Enquanto permanecer à disposição de outra corporação policial militar, o policial militar não será considerado no exercício de função policial militar.
(D) A grave perturbação ou subversão da ordem configura-se pelo exercício dinâmico do poder de polícia, no campo da segurança pública, manifestado por atuações predominantemente ostensivas.
(E) O aprestamento consiste no conjunto de medidas que incluem instrução, adestramento e preparo logístico para tornar uma organização policial militar pronta para emprego imediato.$q$,$q$À luz do Decreto n.º 88.777/1983, que aprova o regulamento para as polícias militares e os corpos de bombeiros militares (R-200), assinale a opção correta.
(A) Os anos de serviço correspondem ao tempo mínimo de permanência no posto ou na graduação, nas condições de merecimento e antiguidade.
(B) Quando se fizer necessário o aproveitamento de seus conhecimentos técnicos e especializados, policiais militares reformados poderão ser designados para o serviço ativo.
(C) Enquanto permanecer à disposição de outra corporação policial militar, o policial militar não será considerado no exercício de função policial militar.
(D) A grave perturbação ou subversão da ordem configura-se pelo exercício dinâmico do poder de polícia, no campo da segurança pública, manifestado por atuações predominantemente ostensivas.
(E) O aprestamento consiste no conjunto de medidas que incluem instrução, adestramento e preparo logístico para tornar uma organização policial militar pronta para emprego imediato.$q$,'E',4,'active',true,false,'[{"title": "Decreto 88.777/1983 (R-200), art. 2º, item 4", "url": "https://www.planalto.gov.br/ccivil_03/decreto/d88777.htm", "checked_at": "2026-10-17"}]'::jsonb,$q$Auditado em 17/10/2026 contra Decreto 88.777/1983 (R-200), art. 2º, item 4; chave E confere com o gabarito definitivo Cebraspe. Aprestamento: instrução, adestramento e preparo logístico para a pronta emprego.$q$,$q$R-200: conceitos (aprestamento)$q$),
(29,$q$Legislação Institucional$q$,$q$Assinale a opção correta de acordo com a Lei estadual n.º 6.215/1983, que dispõe acerca da promoção de oficiais da PMSC.
(A) A antiguidade no posto é contada a partir da data do ato de promoção, inclusive para os casos de promoção post mortem, por bravura e em ressarcimento de preterição.
(B) O oficial da PMSC que, agregado, for promovido, mas continuar na mesma situação, preencherá o quadro de vagas a serem consideradas para promoção.
(C) As exigências para a promoção por ato de bravura abrangem as mesmas da promoção por outro critério.
(D) A Comissão de Promoção de Oficiais da PMSC tem caráter temporário e é constituída por membros natos e presidida pelo comandante-geral da corporação.
(E) O oficial que falecer em consequência de ferimento sofrido na manutenção da ordem pública terá direito à promoção post mortem.$q$,$q$Assinale a opção correta de acordo com a Lei estadual n.º 6.215/1983, que dispõe acerca da promoção de oficiais da PMSC.
(A) A antiguidade no posto é contada a partir da data do ato de promoção, inclusive para os casos de promoção post mortem, por bravura e em ressarcimento de preterição.
(B) O oficial da PMSC que, agregado, for promovido, mas continuar na mesma situação, preencherá o quadro de vagas a serem consideradas para promoção.
(C) As exigências para a promoção por ato de bravura abrangem as mesmas da promoção por outro critério.
(D) A Comissão de Promoção de Oficiais da PMSC tem caráter temporário e é constituída por membros natos e presidida pelo comandante-geral da corporação.
(E) O oficial que falecer em consequência de ferimento sofrido na manutenção da ordem pública terá direito à promoção post mortem.$q$,'E',4,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E). Mantida em revisão: Legislação estadual (Lei SC 6.215/1983): fonte oficial (ALESC) fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Promoção de oficiais da PMSC (Lei 6.215/1983)$q$),
(30,$q$Legislação Institucional$q$,$q$Considerando as disposições do Decreto n.º 19.236/1983 a respeito da promoção de oficiais da PMSC, assinale a opção correta.
(A) Os oficiais estagiários que não satisfizerem às condições para sua efetivação no primeiro posto serão exonerados por ato do comandante-geral da corporação, mediante proposta do comandante do estagiário.
(B) Os oficiais habilitados ao acesso por antiguidade serão organizados em ordem crescente de antiguidade e submetidos à aprovação do comandante-geral da corporação.
(C) O oficial que tenha sido punido com prisão, no posto atual, por transgressão atentatória à dignidade e ao pundonor policial militar será excluído do quadro de acesso por merecimento já organizado ou dele não poderá constar.
(D) Em relação ao número de vagas para o posto de segundo-tenente da PMSC, será efetuada uma única promoção por antiguidade e uma única por merecimento.
(E) Considera-se como posto inicial para o ingresso na carreira de oficial da PMSC, no quadro de oficiais policiais militares, o de aspirante a oficial, por promoção do aluno a oficial.$q$,$q$Considerando as disposições do Decreto n.º 19.236/1983 a respeito da promoção de oficiais da PMSC, assinale a opção correta.
(A) Os oficiais estagiários que não satisfizerem às condições para sua efetivação no primeiro posto serão exonerados por ato do comandante-geral da corporação, mediante proposta do comandante do estagiário.
(B) Os oficiais habilitados ao acesso por antiguidade serão organizados em ordem crescente de antiguidade e submetidos à aprovação do comandante-geral da corporação.
(C) O oficial que tenha sido punido com prisão, no posto atual, por transgressão atentatória à dignidade e ao pundonor policial militar será excluído do quadro de acesso por merecimento já organizado ou dele não poderá constar.
(D) Em relação ao número de vagas para o posto de segundo-tenente da PMSC, será efetuada uma única promoção por antiguidade e uma única por merecimento.
(E) Considera-se como posto inicial para o ingresso na carreira de oficial da PMSC, no quadro de oficiais policiais militares, o de aspirante a oficial, por promoção do aluno a oficial.$q$,'X',5,'annulled',true,false,null,$q$Questão anulada pelo Cebraspe (gabarito oficial definitivo = X; ver justificativas de alteração do gabarito). Não deve ser usada em treino.$q$,$q$Promoção de oficiais da PMSC (Decreto 19.236/1983)$q$),
(31,$q$Legislação Institucional$q$,$q$Com relação ao subsídio mensal dos militares de Santa Catarina disposto na Lei Complementar n.º 614/2013, assinale a opção correta.
(A) O regime de compensação de horas consiste no registro do quantitativo de horas, excedentes ou insuficientes, em relação ao quantitativo estabelecido para a jornada de trabalho individual do militar estadual.
(B) O subtenente militar estadual, ao ingressar na inatividade, perceberá proventos correspondentes ao subsídio que possuía enquanto militar da ativa.
(C) O subsídio dos militares estaduais não exclui o direito à percepção das vantagens pessoais nominalmente identificadas (VPNI), de qualquer origem e natureza.
(D) A indenização por regime especial de serviço ativo constitui verba de natureza remuneratória e se incorpora ao subsídio, aos proventos e à pensão por morte, não sendo isenta da incidência de contribuição previdenciária.
(E) A ajuda de custo devida ao militar estadual corresponderá a 75% do respectivo subsídio quando ele não possuir dependentes.$q$,$q$Com relação ao subsídio mensal dos militares de Santa Catarina disposto na Lei Complementar n.º 614/2013, assinale a opção correta.
(A) O regime de compensação de horas consiste no registro do quantitativo de horas, excedentes ou insuficientes, em relação ao quantitativo estabelecido para a jornada de trabalho individual do militar estadual.
(B) O subtenente militar estadual, ao ingressar na inatividade, perceberá proventos correspondentes ao subsídio que possuía enquanto militar da ativa.
(C) O subsídio dos militares estaduais não exclui o direito à percepção das vantagens pessoais nominalmente identificadas (VPNI), de qualquer origem e natureza.
(D) A indenização por regime especial de serviço ativo constitui verba de natureza remuneratória e se incorpora ao subsídio, aos proventos e à pensão por morte, não sendo isenta da incidência de contribuição previdenciária.
(E) A ajuda de custo devida ao militar estadual corresponderá a 75% do respectivo subsídio quando ele não possuir dependentes.$q$,'A',5,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A). Mantida em revisão: Legislação estadual (LC SC 614/2013): fonte oficial (ALESC) fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Subsídio dos militares de Santa Catarina (LC 614/2013)$q$),
(32,$q$Legislação Institucional$q$,$q$Em consonância com o Decreto n.º 1.601/2021, que aprova o regulamento da Lei n.º 6.217/1983, acerca da organização básica da PMSC, assinale a opção correta.
(A) O planejamento, a coordenação e a direção da execução da polícia ostensiva e da preservação da ordem pública constituem uma das competências da PMSC.
(B) Os pelotões são frações de tropa com dois ou mais grupos de policiais militares e podem ser incorporados, destacados ou independentes.
(C) Os órgãos de execução são as organizações policiais militares que desenvolvem as atividades finalísticas da PMSC, podendo ser grandes comandos, unidades e subunidades.
(D) São órgãos de direção setorial da PMSC a Diretoria de Pessoal, a Divisão de Inteligência, a Divisão Operacional e a Diretoria de Apoio Logístico e Finanças.
(E) Os Comandos Regionais de Polícia Militar (CRPM) são grandes comandos responsáveis pela polícia ostensiva e pela preservação da ordem pública em circunscrições delimitadas às quais são subordinadas duas ou mais subunidades.$q$,$q$Em consonância com o Decreto n.º 1.601/2021, que aprova o regulamento da Lei n.º 6.217/1983, acerca da organização básica da PMSC, assinale a opção correta.
(A) O planejamento, a coordenação e a direção da execução da polícia ostensiva e da preservação da ordem pública constituem uma das competências da PMSC.
(B) Os pelotões são frações de tropa com dois ou mais grupos de policiais militares e podem ser incorporados, destacados ou independentes.
(C) Os órgãos de execução são as organizações policiais militares que desenvolvem as atividades finalísticas da PMSC, podendo ser grandes comandos, unidades e subunidades.
(D) São órgãos de direção setorial da PMSC a Diretoria de Pessoal, a Divisão de Inteligência, a Divisão Operacional e a Diretoria de Apoio Logístico e Finanças.
(E) Os Comandos Regionais de Polícia Militar (CRPM) são grandes comandos responsáveis pela polícia ostensiva e pela preservação da ordem pública em circunscrições delimitadas às quais são subordinadas duas ou mais subunidades.$q$,'A',5,'under_review',true,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A). Mantida em revisão: Legislação estadual (Decreto SC 1.601/2021): fonte oficial (ALESC) fora da lista de domínios aceitos e vigência não conferida.$q$,$q$Organização básica da PMSC (Decreto 1.601/2021)$q$),
(33,$q$Língua Portuguesa$q$,$q$A afirmação que inicia o texto 1A5-I é confirmada, entre outros fatores, por meio da
(A) descrição de estudos sobre a aplicabilidade dos algoritmos.
(B) indicação de que um algoritmo pode ter uma dezena de linhas de programação ou milhões delas.
(C) informação de dados estatísticos do uso de algoritmos em diversas áreas.
(D) apresentação de exemplos do uso dos algoritmos em diferentes setores da sociedade.
(E) definição de que algoritmo é uma sequência de etapas para resolver um problema.$q$,$q$A afirmação que inicia o texto 1A5-I é confirmada, entre outros fatores, por meio da
(A) descrição de estudos sobre a aplicabilidade dos algoritmos.
(B) indicação de que um algoritmo pode ter uma dezena de linhas de programação ou milhões delas.
(C) informação de dados estatísticos do uso de algoritmos em diversas áreas.
(D) apresentação de exemplos do uso dos algoritmos em diferentes setores da sociedade.
(E) definição de que algoritmo é uma sequência de etapas para resolver um problema.$q$,'D',5,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Interpretação de texto: algoritmos e exemplos de uso$q$),
(34,$q$Língua Portuguesa$q$,$q$Nos segmentos “atividades cotidianas prosaicas” e “objetos intangíveis” (primeiro período do segundo parágrafo), os vocábulos “prosaicas” e “intangíveis” poderiam ser respectivamente substituídos, sem prejuízo da coerência das ideias do texto 1A5-I, por
(A) comuns e incompreensíveis.
(B) banais e inatacáveis.
(C) triviais e imprecisos.
(D) práticas e inalcançáveis.
(E) vulgares e incontestáveis.$q$,$q$Nos segmentos “atividades cotidianas prosaicas” e “objetos intangíveis” (primeiro período do segundo parágrafo), os vocábulos “prosaicas” e “intangíveis” poderiam ser respectivamente substituídos, sem prejuízo da coerência das ideias do texto 1A5-I, por
(A) comuns e incompreensíveis.
(B) banais e inatacáveis.
(C) triviais e imprecisos.
(D) práticas e inalcançáveis.
(E) vulgares e incontestáveis.$q$,'A',5,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Significação de palavras: prosaicas e intangíveis$q$),
(35,$q$Língua Portuguesa$q$,$q$No terceiro período do primeiro parágrafo, o termo “ante” poderia ser substituído, sem prejuízo da correção gramatical e do sentido original do texto 1A5-I, por I diante de. II perante. III face à. Assinale a opção correta.
(A) Apenas o item II está certo.
(B) Apenas o item III está certo.
(C) Apenas os itens I e II estão certos.
(D) Apenas os itens I e III estão certos.
(E) Todos os itens estão certos.$q$,$q$No terceiro período do primeiro parágrafo, o termo “ante” poderia ser substituído, sem prejuízo da correção gramatical e do sentido original do texto 1A5-I, por I diante de. II perante. III face à. Assinale a opção correta.
(A) Apenas o item II está certo.
(B) Apenas o item III está certo.
(C) Apenas os itens I e II estão certos.
(D) Apenas os itens I e III estão certos.
(E) Todos os itens estão certos.$q$,'C',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Substituição de "ante" por locuções prepositivas$q$),
(36,$q$Língua Portuguesa$q$,$q$No segundo parágrafo do texto 1A5-I, a oração introduzida pelo vocábulo “Embora” exprime, em relação à oração seguinte, circunstância de
(A) condição.
(B) concessão.
(C) explicação.
(D) conformidade.
(E) comparação.$q$,$q$No segundo parágrafo do texto 1A5-I, a oração introduzida pelo vocábulo “Embora” exprime, em relação à oração seguinte, circunstância de
(A) condição.
(B) concessão.
(C) explicação.
(D) conformidade.
(E) comparação.$q$,'B',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Oração concessiva$q$),
(37,$q$Língua Portuguesa$q$,$q$Estariam mantidos os sentidos e a correção gramatical do texto1A5-I caso o travessão empregado no primeiro período do segundo parágrafo fosse substituído por
(A) ponto final, pois as orações que seguem o travessão podem constituir um período isolado.
(B) pelo vocábulo e, pois o travessão, no contexto em questão, é empregado para separar orações coordenadas aditivas.
(C) ponto e vírgula, pois o travessão, no contexto em que se insere, separa ideias distintas e orações independentes.
(D) vírgula, pois o travessão separa uma oração de sentido explicativo.
(E) dois-pontos, pois o travessão introduz uma enumeração em relação à ideia anterior.$q$,$q$Estariam mantidos os sentidos e a correção gramatical do texto1A5-I caso o travessão empregado no primeiro período do segundo parágrafo fosse substituído por
(A) ponto final, pois as orações que seguem o travessão podem constituir um período isolado.
(B) pelo vocábulo e, pois o travessão, no contexto em questão, é empregado para separar orações coordenadas aditivas.
(C) ponto e vírgula, pois o travessão, no contexto em que se insere, separa ideias distintas e orações independentes.
(D) vírgula, pois o travessão separa uma oração de sentido explicativo.
(E) dois-pontos, pois o travessão introduz uma enumeração em relação à ideia anterior.$q$,'D',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Emprego do travessão$q$),
(38,$q$Língua Portuguesa$q$,$q$Estariam mantidos os sentidos e a correção gramatical do texto 1A5-II caso se substituísse a expressão “de modo que (último período do primeiro parágrafo) por
(A) de forma à que.
(B) na medida em que.
(C) desde que.
(D) ainda que.
(E) de sorte que.$q$,$q$Estariam mantidos os sentidos e a correção gramatical do texto 1A5-II caso se substituísse a expressão “de modo que (último período do primeiro parágrafo) por
(A) de forma à que.
(B) na medida em que.
(C) desde que.
(D) ainda que.
(E) de sorte que.$q$,'E',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Conectivo "de modo que"$q$),
(39,$q$Língua Portuguesa$q$,$q$Assinale a opção em que a proposta de reescrita do último período do texto1A5-II preserva os seus sentidos e a correção gramatical.
(A) Isso nos coloca no jogo de criatividade e pensamento crítico.
(B) Isso nos coloca em situação duvidosa no que se refere à criatividade e ao pensamento crítico.
(C) Isso nos coloca em dúvida a cerca da criatividade e do pensamento crítico.
(D) O que nos coloca em perigo no que concerne a criatividade e ao pensamento crítico.
(E) Fato que nos ameaça no tocante a criatividade e o pensamento crítico.$q$,$q$Assinale a opção em que a proposta de reescrita do último período do texto1A5-II preserva os seus sentidos e a correção gramatical.
(A) Isso nos coloca no jogo de criatividade e pensamento crítico.
(B) Isso nos coloca em situação duvidosa no que se refere à criatividade e ao pensamento crítico.
(C) Isso nos coloca em dúvida a cerca da criatividade e do pensamento crítico.
(D) O que nos coloca em perigo no que concerne a criatividade e ao pensamento crítico.
(E) Fato que nos ameaça no tocante a criatividade e o pensamento crítico.$q$,'B',6,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Reescrita de período: coesão e correção$q$),
(40,$q$Língua Portuguesa$q$,$q$Considerando que coesão e coerência, segundo o Manual de Redação da Presidência da República, são atributos que favorecem a conexão, a ligação e a harmonia entre os elementos de um texto, é correto afirmar que, no texto 1A5-III, a expressão “Essa ação” (segundo parágrafo do texto do documento) é empregada em relação
(A) ao ofício em si.
(B) à solicitação de senha.
(C) ao acesso ao sistema SISREG.
(D) à humanização dos serviços, ao controle do fluxo e à otimização na utilização dos recursos.
(E) à implantação da Central de Regulação de Consultas e Exames do Município.$q$,$q$Considerando que coesão e coerência, segundo o Manual de Redação da Presidência da República, são atributos que favorecem a conexão, a ligação e a harmonia entre os elementos de um texto, é correto afirmar que, no texto 1A5-III, a expressão “Essa ação” (segundo parágrafo do texto do documento) é empregada em relação
(A) ao ofício em si.
(B) à solicitação de senha.
(C) ao acesso ao sistema SISREG.
(D) à humanização dos serviços, ao controle do fluxo e à otimização na utilização dos recursos.
(E) à implantação da Central de Regulação de Consultas e Exames do Município.$q$,'E',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Coesão: referenciação em ofício$q$),
(41,$q$Língua Portuguesa$q$,$q$Com base no Manual de Redação da Presidência da República, julgue os itens a seguir, relativos ao texto 1A5-III. I A forma de tratamento empregada no endereçamento do documento é adequada ao cargo ocupado pelo destinatário. II No parágrafo de introdução do documento, a substituição de “Tenho o prazer de dirigir-me ao Senhor para solicitar” por Solicito conferiria maior formalidade ao texto. III Dada a hierarquia das autoridades envolvidas na correspondência apresentada, o fecho adequado para o documento seria o exposto a seguir. Atenciosamente, Assinale a opção correta.
(A) Apenas o item I está certo.
(B) Apenas o item II está certo.
(C) Apenas os itens I e III estão certos.
(D) Apenas os itens II e III estão certos.
(E) Todos os itens estão certos.$q$,$q$Com base no Manual de Redação da Presidência da República, julgue os itens a seguir, relativos ao texto 1A5-III. I A forma de tratamento empregada no endereçamento do documento é adequada ao cargo ocupado pelo destinatário. II No parágrafo de introdução do documento, a substituição de “Tenho o prazer de dirigir-me ao Senhor para solicitar” por Solicito conferiria maior formalidade ao texto. III Dada a hierarquia das autoridades envolvidas na correspondência apresentada, o fecho adequado para o documento seria o exposto a seguir. Atenciosamente, Assinale a opção correta.
(A) Apenas o item I está certo.
(B) Apenas o item II está certo.
(C) Apenas os itens I e III estão certos.
(D) Apenas os itens II e III estão certos.
(E) Todos os itens estão certos.$q$,'C',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Redação oficial: ofício, tratamento e fecho$q$),
(42,$q$Língua Portuguesa$q$,$q$Considerem-se os trechos hipotéticos de documentos oficiais apresentados nos itens a seguir. I Com os meus melhores cumprimentos, venho, por meio deste, encaminhar a essa Coordenação o documento em anexo, emitido pela Diretoria de Comunicação – DICOM. II Encaminho a essa Coordenação o documento em anexo, emitido pela Diretoria de Comunicação – DICOM. Levando-se em consideração as características básicas da comunicação oficial, é correto afirmar que a redação do item II se diferencia da redação do item I pela
(A) coesão e coerência.
(B) clareza e formalidade.
(C) objetividade e concisão.
(D) precisão e padronização.
(E) formalidade e impessoalidade.$q$,$q$Considerem-se os trechos hipotéticos de documentos oficiais apresentados nos itens a seguir. I Com os meus melhores cumprimentos, venho, por meio deste, encaminhar a essa Coordenação o documento em anexo, emitido pela Diretoria de Comunicação – DICOM. II Encaminho a essa Coordenação o documento em anexo, emitido pela Diretoria de Comunicação – DICOM. Levando-se em consideração as características básicas da comunicação oficial, é correto afirmar que a redação do item II se diferencia da redação do item I pela
(A) coesão e coerência.
(B) clareza e formalidade.
(C) objetividade e concisão.
(D) precisão e padronização.
(E) formalidade e impessoalidade.$q$,'C',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Redação oficial: características da comunicação oficial$q$),
(43,$q$Informática$q$,$q$Considerando conceitos relacionados a Internet e intranet, assinale a opção correta.
(A) SMTP (Simple Mail Transfer Protocol) é o protocolo padrão de navegação na Internet, responsável pela estruturação do conteúdo e pela apresentação de páginas da Web.
(B) Nas redes, denomina-se hashtag qualquer conjunto formado por palavra-chave posposta ao sinal tipográfico da cerquilha (#), com o que se identificam conteúdos que se deseja ocultar.
(C) Intranet é uma rede de equipamentos que permite acesso externo controlado, para negócios específicos ou propósitos educacionais, sendo uma extensão da rede local de uma organização, disponibilizada para usuários externos a ela.
(D) O protocolo padrão da Internet é o TCP/IP (Transmission Control Protocol/Internet Protocol), responsável por fornecer uma base confiável e eficiente para a comunicação entre dispositivos em redes de computadores.
(E) O protocolo padrão da Internet é o DHCP (Dynamic Host Configuration Protocol), responsável por fornecer uma base confiável e eficiente para a comunicação entre dispositivos em redes de computadores.$q$,$q$Considerando conceitos relacionados a Internet e intranet, assinale a opção correta.
(A) SMTP (Simple Mail Transfer Protocol) é o protocolo padrão de navegação na Internet, responsável pela estruturação do conteúdo e pela apresentação de páginas da Web.
(B) Nas redes, denomina-se hashtag qualquer conjunto formado por palavra-chave posposta ao sinal tipográfico da cerquilha (#), com o que se identificam conteúdos que se deseja ocultar.
(C) Intranet é uma rede de equipamentos que permite acesso externo controlado, para negócios específicos ou propósitos educacionais, sendo uma extensão da rede local de uma organização, disponibilizada para usuários externos a ela.
(D) O protocolo padrão da Internet é o TCP/IP (Transmission Control Protocol/Internet Protocol), responsável por fornecer uma base confiável e eficiente para a comunicação entre dispositivos em redes de computadores.
(E) O protocolo padrão da Internet é o DHCP (Dynamic Host Configuration Protocol), responsável por fornecer uma base confiável e eficiente para a comunicação entre dispositivos em redes de computadores.$q$,'D',7,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Internet e intranet: protocolos$q$),
(44,$q$Informática$q$,$q$No que se refere ao LibreOffice, assinale a opção correta.
(A) O formato de arquivo nativo do LibreOffice é o OpenDocument (ODF), mas no programa também é possível abrir e salvar documentos em outros formatos.
(B) O LibreOffice funciona em arquitetura específica de hardware e restrita a sistemas operacionais Windows.
(C) A interface de usuário do LibreOffice, incluindo-se ortografia, hifenização e dicionário de sinônimos, está disponível somente em português, pois é uma suíte construída no Brasil.
(D) No LibreOffice, não é possível abrir arquivos no formato HTML.
(E) As ferramentas do LibreOffice não são integradas, então o corretor ortográfico, por exemplo, é exclusivo do LibreOffice Writer.$q$,$q$No que se refere ao LibreOffice, assinale a opção correta.
(A) O formato de arquivo nativo do LibreOffice é o OpenDocument (ODF), mas no programa também é possível abrir e salvar documentos em outros formatos.
(B) O LibreOffice funciona em arquitetura específica de hardware e restrita a sistemas operacionais Windows.
(C) A interface de usuário do LibreOffice, incluindo-se ortografia, hifenização e dicionário de sinônimos, está disponível somente em português, pois é uma suíte construída no Brasil.
(D) No LibreOffice, não é possível abrir arquivos no formato HTML.
(E) As ferramentas do LibreOffice não são integradas, então o corretor ortográfico, por exemplo, é exclusivo do LibreOffice Writer.$q$,'A',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$LibreOffice: formatos e ODF$q$),
(45,$q$Informática$q$,$q$A partir da figura anterior, que ilustra a caixa de diálogo Salvar como no LibreOffice em um computador hipotético, assinale a opção correta.
(A) Nesse computador, os arquivos criados com o LibreOffice Writer só podem ser salvos na pasta Meus documentos.
(B) Para proteger o Documento 1 e restringir o acesso ao seu conteúdo, deve-se utilizar a opção Salvar com senha.
(C) Se o usuário clicar na opção Cancelar, o Documento 1 será deletado.
(D) Nesse computador, os arquivos criados com o LibreOffice Draw serão gravados necessariamente na pasta Imagens.
(E) A opção Extensão de arquivo automática, marcada na caixa de diálogo, tem a finalidade de autorizar o LibreOffice a salvar documentos automaticamente.$q$,$q$A partir da figura anterior, que ilustra a caixa de diálogo Salvar como no LibreOffice em um computador hipotético, assinale a opção correta.
(A) Nesse computador, os arquivos criados com o LibreOffice Writer só podem ser salvos na pasta Meus documentos.
(B) Para proteger o Documento 1 e restringir o acesso ao seu conteúdo, deve-se utilizar a opção Salvar com senha.
(C) Se o usuário clicar na opção Cancelar, o Documento 1 será deletado.
(D) Nesse computador, os arquivos criados com o LibreOffice Draw serão gravados necessariamente na pasta Imagens.
(E) A opção Extensão de arquivo automática, marcada na caixa de diálogo, tem a finalidade de autorizar o LibreOffice a salvar documentos automaticamente.$q$,'B',8,'under_review',false,true,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B). Mantida em revisão: A questão depende de uma figura (caixa Salvar como do LibreOffice) que não foi reproduzida.$q$,$q$LibreOffice: caixa de diálogo Salvar como$q$),
(46,$q$Informática$q$,$q$Acerca do Windows 10, assinale a opção correta.
(A) Os ícones da Área de Trabalho são dispostos de acordo com a instalação do Windows 10, não sendo possível alterar tal disposição.
(B) A Cortana, assistente inteligente do Windows 10, responde a perguntas relacionadas ao Windows em qualquer idioma.
(C) No Windows 10, é denominada Central de Configurações a opção que permite explorar, alterar e renomear arquivos.
(D) No Windows 10, um item que for copiado ficará armazenado na Área de Trabalho.
(E) O Windows 10 é um sistema operacional da Microsoft utilizável em desktops, laptops, aparelhos de video game e dispositivos móveis como tablets.$q$,$q$Acerca do Windows 10, assinale a opção correta.
(A) Os ícones da Área de Trabalho são dispostos de acordo com a instalação do Windows 10, não sendo possível alterar tal disposição.
(B) A Cortana, assistente inteligente do Windows 10, responde a perguntas relacionadas ao Windows em qualquer idioma.
(C) No Windows 10, é denominada Central de Configurações a opção que permite explorar, alterar e renomear arquivos.
(D) No Windows 10, um item que for copiado ficará armazenado na Área de Trabalho.
(E) O Windows 10 é um sistema operacional da Microsoft utilizável em desktops, laptops, aparelhos de video game e dispositivos móveis como tablets.$q$,'X',8,'annulled',false,false,null,$q$Questão anulada pelo Cebraspe (gabarito oficial definitivo = X; ver justificativas de alteração do gabarito). Não deve ser usada em treino.$q$,$q$Windows 10$q$),
(47,$q$Informática$q$,$q$Assinale a opção em que é apresentada uma ferramenta de pesquisa na Internet.
(A) Explorador de Arquivos do Windows
(B) LibreOffice Math
(C) ChatGPT
(D) LibreOffice Draw
(E) hiperlink$q$,$q$Assinale a opção em que é apresentada uma ferramenta de pesquisa na Internet.
(A) Explorador de Arquivos do Windows
(B) LibreOffice Math
(C) ChatGPT
(D) LibreOffice Draw
(E) hiperlink$q$,'C',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Ferramentas de pesquisa na Internet$q$),
(48,$q$Informática$q$,$q$No que se refere a ferramentas e aplicativos de navegação, bem como à segurança da informação, assinale a opção correta.
(A) Hiperlink é um programa de computador que habilita os usuários a interagir com documentos virtuais na Internet, também conhecidos como páginas da Web.
(B) Cookies são vírus que afetam arquivos executáveis e que funcionam apenas quando o usuário abre o arquivo infectado.
(C) Plug-ins são módulos de código instalados no browser que permitem a apresentação de arquivos com formatos diferentes do HTML.
(D) O uso do software TCP/IP evita a infecção de vírus ao se baixarem arquivos em páginas da Internet.
(E) O IP de um computador é uma ferramenta de busca que permite acessar informações de vídeos e imagens.$q$,$q$No que se refere a ferramentas e aplicativos de navegação, bem como à segurança da informação, assinale a opção correta.
(A) Hiperlink é um programa de computador que habilita os usuários a interagir com documentos virtuais na Internet, também conhecidos como páginas da Web.
(B) Cookies são vírus que afetam arquivos executáveis e que funcionam apenas quando o usuário abre o arquivo infectado.
(C) Plug-ins são módulos de código instalados no browser que permitem a apresentação de arquivos com formatos diferentes do HTML.
(D) O uso do software TCP/IP evita a infecção de vírus ao se baixarem arquivos em páginas da Internet.
(E) O IP de um computador é uma ferramenta de busca que permite acessar informações de vídeos e imagens.$q$,'C',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Navegação e segurança: plug-ins e cookies$q$),
(49,$q$Informática$q$,$q$Assinale a opção que corresponde a um exemplo correto de endereço de email de um soldado da Polícia Militar do Estado de Santa Catarina, considerando-se que, para que o endereço de email seja viável, o nome do soldado seja usado, sem espaços, no lugar do termo nomesoldado.
(A) @nomesoldado.pm.sc.gov.br
(B) https://www.pm.sc.gov.br@nomesoldado
(C) pm.sc.gov.br@nomesoldado
(D) https://www.pm.sc.gov.br/nomesoldado
(E) nomesoldado@pm.sc.gov.br$q$,$q$Assinale a opção que corresponde a um exemplo correto de endereço de email de um soldado da Polícia Militar do Estado de Santa Catarina, considerando-se que, para que o endereço de email seja viável, o nome do soldado seja usado, sem espaços, no lugar do termo nomesoldado.
(A) @nomesoldado.pm.sc.gov.br
(B) https://www.pm.sc.gov.br@nomesoldado
(C) pm.sc.gov.br@nomesoldado
(D) https://www.pm.sc.gov.br/nomesoldado
(E) nomesoldado@pm.sc.gov.br$q$,'E',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Correio eletrônico: endereço institucional$q$),
(50,$q$Informática$q$,$q$Assinale a opção em que é indicado um tipo de malware projetado para coletar informações relativas à atividade do usuário sem o seu conhecimento ou consentimento.
(A) spyware
(B) cavalo de Troia (trojan)
(C) adware
(D) ransomware
(E) vírus de arquivo$q$,$q$Assinale a opção em que é indicado um tipo de malware projetado para coletar informações relativas à atividade do usuário sem o seu conhecimento ou consentimento.
(A) spyware
(B) cavalo de Troia (trojan)
(C) adware
(D) ransomware
(E) vírus de arquivo$q$,'A',8,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Malware: spyware$q$),
(51,$q$Raciocínio Lógico$q$,$q$A partir do texto 1A7-I e considerando que João seja um dos elementos do conjunto V, assinale a opção que apresenta o número de linhas da tabela-verdade da proposição w(João).
(A) 2
(B) 4
(C) 8
(D) 16
(E) 32$q$,$q$A partir do texto 1A7-I e considerando que João seja um dos elementos do conjunto V, assinale a opção que apresenta o número de linhas da tabela-verdade da proposição w(João).
(A) 2
(B) 4
(C) 8
(D) 16
(E) 32$q$,'B',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Tabela-verdade: número de linhas$q$),
(52,$q$Raciocínio Lógico$q$,$q$Tendo em vista o texto 1A7-I e considerando que os símbolos “~”, “˄”, “˅”, “→” e “↔” representem, respectivamente, as expressões “não [...]”, “e”, “ou”, “se [...], então [...]” e “se, e somente se”, e que Mário seja um dos elementos do conjunto C, mas não do conjunto L, assinale a opção em que é apresentada uma proposição verdadeira.
(A) c(Mário) ˄ l(Mário)
(B) c(Mário) ˅ l(Mário)
(C) c(Mário) → l(Mário)
(D) c(Mário) ↔ l(Mário)
(E) ~c(Mário) ˅ l(Mário)$q$,$q$Tendo em vista o texto 1A7-I e considerando que os símbolos “~”, “˄”, “˅”, “→” e “↔” representem, respectivamente, as expressões “não [...]”, “e”, “ou”, “se [...], então [...]” e “se, e somente se”, e que Mário seja um dos elementos do conjunto C, mas não do conjunto L, assinale a opção em que é apresentada uma proposição verdadeira.
(A) c(Mário) ˄ l(Mário)
(B) c(Mário) ˅ l(Mário)
(C) c(Mário) → l(Mário)
(D) c(Mário) ↔ l(Mário)
(E) ~c(Mário) ˅ l(Mário)$q$,'B',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave B); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Valor lógico de proposições compostas$q$),
(53,$q$Raciocínio Lógico$q$,$q$Ainda no que se refere ao texto 1A7-I, para que o conjunto verdade de w(x) coincida com o conjunto V
(A) C e L devem esgotar o universo (C ꓴ L = V).
(B) L e C devem ser disjuntos (L ∩ C = ∅).
(C) C e L devem coincidir (C = L).
(D) C deve conter L (L ⸦ C).
(E) L deve conter C (C ⸦ L).$q$,$q$Ainda no que se refere ao texto 1A7-I, para que o conjunto verdade de w(x) coincida com o conjunto V
(A) C e L devem esgotar o universo (C ꓴ L = V).
(B) L e C devem ser disjuntos (L ∩ C = ∅).
(C) C e L devem coincidir (C = L).
(D) C deve conter L (L ⸦ C).
(E) L deve conter C (C ⸦ L).$q$,'E',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave E); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Conjuntos verdade e condicional$q$),
(54,$q$Raciocínio Lógico$q$,$q$Tendo o texto 1A7-I como referência e considerando que Priscila seja um dos elementos do conjunto V, assinale a opção que apresenta a proposição obtida a partir da sentença w(x) quando sua variável assume o valor x = Priscila.
(A) Priscila confunde crime com liberdade de expressão.
(B) Priscila confunde liberdade de expressão com crime e Priscila confunde crime com liberdade de expressão.
(C) Priscila confunde liberdade de expressão com crime.
(D) Se Priscila confunde crime com liberdade de expressão, então Priscila confunde liberdade de expressão com crime.
(E) Se Priscila confunde liberdade de expressão com crime, então Priscila confunde crime com liberdade de expressão.$q$,$q$Tendo o texto 1A7-I como referência e considerando que Priscila seja um dos elementos do conjunto V, assinale a opção que apresenta a proposição obtida a partir da sentença w(x) quando sua variável assume o valor x = Priscila.
(A) Priscila confunde crime com liberdade de expressão.
(B) Priscila confunde liberdade de expressão com crime e Priscila confunde crime com liberdade de expressão.
(C) Priscila confunde liberdade de expressão com crime.
(D) Se Priscila confunde crime com liberdade de expressão, então Priscila confunde liberdade de expressão com crime.
(E) Se Priscila confunde liberdade de expressão com crime, então Priscila confunde crime com liberdade de expressão.$q$,'D',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Sentença aberta: valoração com um valor da variável$q$),
(55,$q$Raciocínio Lógico$q$,$q$Assinale a opção em que é apresentada uma tautologia.
(A) Gosto do trabalho, mas não gosto de trabalhar.
(B) Conserto o computador se, e somente se, o computador estragar.
(C) Sou feliz ou não com quem eu sou.
(D) Não me lembro se molhei ou não a grama.
(E) Se eu estudar, então serei aprovado, e se eu fui aprovado, então estudei.$q$,$q$Assinale a opção em que é apresentada uma tautologia.
(A) Gosto do trabalho, mas não gosto de trabalhar.
(B) Conserto o computador se, e somente se, o computador estragar.
(C) Sou feliz ou não com quem eu sou.
(D) Não me lembro se molhei ou não a grama.
(E) Se eu estudar, então serei aprovado, e se eu fui aprovado, então estudei.$q$,'C',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave C); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Tautologia$q$),
(56,$q$Raciocínio Lógico$q$,$q$Assinale a opção que apresenta uma proposição equivalente a Você faltou com a verdade.
(A) Você não falou a verdade.
(B) Você não falou mentira.
(C) Você faltou com a mentira.
(D) Você falou a verdade.
(E) Você não disse mentira.$q$,$q$Assinale a opção que apresenta uma proposição equivalente a Você faltou com a verdade.
(A) Você não falou a verdade.
(B) Você não falou mentira.
(C) Você faltou com a mentira.
(D) Você falou a verdade.
(E) Você não disse mentira.$q$,'A',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave A); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Equivalência lógica: negação$q$),
(57,$q$Raciocínio Lógico$q$,$q$De 100 candidatos a determinada prova, 65 disseram sentir-se preparados e 80 disseram ter estudado. Nessa situação hipotética, o menor número possível de candidatos que não disseram sentir-se preparados ou ter estudado é igual a
(A) 15.
(B) 20.
(C) 35.
(D) 45.
(E) 65.$q$,$q$De 100 candidatos a determinada prova, 65 disseram sentir-se preparados e 80 disseram ter estudado. Nessa situação hipotética, o menor número possível de candidatos que não disseram sentir-se preparados ou ter estudado é igual a
(A) 15.
(B) 20.
(C) 35.
(D) 45.
(E) 65.$q$,'X',9,'annulled',false,false,null,$q$Questão anulada pelo Cebraspe (gabarito oficial definitivo = X; ver justificativas de alteração do gabarito). Não deve ser usada em treino.$q$,$q$Conjuntos: interseção mínima$q$),
(58,$q$Raciocínio Lógico$q$,$q$O salário líquido de Letícia é calculado de tal forma que do salário bruto são descontados 14% para previdência social e, sobre o valor remanescente, são descontados 27,5% de imposto de renda. Com base na situação hipotética apresentada e considerando que não haja mais descontos, o percentual do salário bruto que corresponde ao salário líquido de Letícia é igual a
(A) 23,65%.
(B) 41,5%.
(C) 58,5%.
(D) 62,35%.
(E) 72,5%.$q$,$q$O salário líquido de Letícia é calculado de tal forma que do salário bruto são descontados 14% para previdência social e, sobre o valor remanescente, são descontados 27,5% de imposto de renda. Com base na situação hipotética apresentada e considerando que não haja mais descontos, o percentual do salário bruto que corresponde ao salário líquido de Letícia é igual a
(A) 23,65%.
(B) 41,5%.
(C) 58,5%.
(D) 62,35%.
(E) 72,5%.$q$,'D',9,'active',false,false,null,$q$Importada do caderno oficial e conferida com o gabarito definitivo (chave D); coerência da chave com o conteúdo verificada em 17/10/2026 (disciplina não jurídica).$q$,$q$Porcentagens: descontos sucessivos$q$)
), resolved as (
  select imported.*, qsrc.id question_source_id, asrc.id answer_key_source_id, topic.id syllabus_topic_id
  from imported
  join public.syllabus_editions ed on ed.contest_name='Polícia Militar de Santa Catarina' and ed.role_name='Soldado da Polícia Militar' and ed.contest_year=2023
  join public.syllabus_topics topic on topic.edition_id=ed.id and topic.discipline=imported.subject and topic.topic_order=1
  join public.content_sources qsrc on qsrc.url='https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/862_PMSC_SOLDADO_001_01.PDF'
  join public.content_sources asrc on asrc.url='https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/GAB_DEFINITIVO_862_PMSC_SOLDADO_001_01.PDF'
)
insert into public.official_exam_questions (
  question_source_id,answer_key_source_id,syllabus_topic_id,current_syllabus_topic_id,contest_name,career_name,exam_board,exam_year,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,
  legal_basis,law_version_checked_at,legal_audit_completed,review_note,verified_at,tested_topic,state,career_category,role_type
)
select question_source_id,answer_key_source_id,syllabus_topic_id,
  case when legal_basis is not null then syllabus_topic_id end,
  'Polícia Militar de Santa Catarina','Soldado da Polícia Militar','CEBRASPE',2023,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,
  coalesce(legal_basis,'[]'::jsonb),case when legal_basis is not null then now() end,legal_basis is not null,review_note,now(),tested_topic,'SC','Polícia Militar','Soldado'
from resolved
on conflict (contest_name,career_name,exam_year,item_number) do nothing;
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select 'ea85ff2d-a3e7-4766-92fe-1a935995a1b5','Texto 1A5-I — Os algoritmos estão em toda parte (itens 33 a 37)','Texto 1A5-I Os algoritmos estão em toda parte. Quando a bolsa de valores sobe ou desce, eles geralmente estão envolvidos. Segundo dados divulgados em 2016 pelo Instituto de Pesquisa Econômica Aplicada (IPEA), robôs investidores programados para reagir instantaneamente ante determinadas situações são responsáveis por mais de 40% das decisões de compra e venda no mercado de ações no país — nos Estados Unidos, o percentual chegou a 70%. O sucesso de uma simples pesquisa no Google depende de uma dessas receitas escritas em linguagem de programação computacional, que é capaz de filtrar, em segundos, bilhões de páginas na Web — a importância de uma página, definida por um algoritmo, baseia-se na quantidade e na boa procedência de links que remetem a ela. Na fronteira da pesquisa em engenharia automotiva, conjuntos de algoritmos utilizados por carros autônomos processam informações captadas por câmeras e sensores, tomando instantaneamente as decisões ao volante sem intervenção humana. Embora influenciem até mesmo atividades cotidianas prosaicas, como a procura de atalhos no trânsito com a ajuda de aplicativos de celular, os algoritmos costumam ser vistos como objetos intangíveis pela população em geral — que sente seus efeitos, mas não conhece ou compreende seu formato e modo de ação. Um algoritmo nada mais é do que uma sequência de etapas para resolver um problema ou realizar uma tarefa de forma automática, quer ele tenha apenas uma dezena de linhas de programação ou milhões delas empilhadas em uma espécie de pergaminho virtual. “É o átomo de qualquer processo computacional”, define o cientista da computação Roberto Marcondes Cesar Junior, pesquisador do Instituto de Matemática e Estatística da Universidade de São Paulo (IME-USP). Bruno de Pierro. O mundo mediado por algoritmos. Internet: <revistapesquisa.fapesp.br> (com adaptações).','Polícia Militar de Santa Catarina',2023,'CEBRASPE','Caderno oficial CEBRASPE/PM-SC 2023 (matriz 862_PMSC_SOLDADO_001_01), https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/862_PMSC_SOLDADO_001_01.PDF' where not exists (select 1 from public.question_support_texts where label='Texto 1A5-I — Os algoritmos estão em toda parte (itens 33 a 37)');
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select 'f5c91a7e-2fe9-467a-8ef0-e42b34c77f3f','Texto 1A5-II — Chatbot e ChatGPT (itens 38 e 39)','Texto 1A5-II Um chatbot pode ser resumido em sua tradução — “robô de bate-papo”. Porém, atualmente, o ChatGPT, um tipo de chatbot, tem chamado atenção pela sua capacidade de manter a coesão e a coerência: “Ele funciona como um modelo de linguagem e consegue fazer uma redação com conteúdo e produção de sentido, de modo que não se sabe se aquele texto foi produzido por um humano ou por um robô”, explica o professor Rogério de Almeida da Faculdade de Educação da USP. O professor brinca e pergunta para o chatbot como ele vê a principal preocupação dos acadêmicos com o chat. O próprio ChatGPT pontua cinco questões: a primeira seria a existência de um viés, mediado pelos algoritmos, que pode reproduzir preconceitos; a segunda, ética, relacionada a como o chat seria utilizado; a terceira tem relação com a privacidade, já que ele funciona com o uso de diversos dados; a quarta está relacionada a controle, pois ele é imprevisível e é importante prezar pelo bem-estar das pessoas; a quinta, a transparência de como essa ferramenta funciona. Porém, o especialista não segue a linha de raciocínio dessa inteligência artificial: “Eu vou por outro caminho. O que eu acho que ele nos coloca é uma questão muito interessante daquilo que nós consideramos humano. Porque, de certa forma, a inteligência artificial aprende conosco, ela é treinada com os textos que nós produzimos. Isso nos coloca em xeque em relação à criatividade e ao pensamento crítico”. Internet: <jornal.usp.br> (com adaptações).','Polícia Militar de Santa Catarina',2023,'CEBRASPE','Caderno oficial CEBRASPE/PM-SC 2023 (matriz 862_PMSC_SOLDADO_001_01), https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/862_PMSC_SOLDADO_001_01.PDF' where not exists (select 1 from public.question_support_texts where label='Texto 1A5-II — Chatbot e ChatGPT (itens 38 e 39)');
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select 'f15f768e-745b-4a4e-922d-476e36787f00','Texto 1A5-III — Ofício: solicitação de senha (itens 40 e 41)','Texto 1A5-III OFÍCIO No 000/ano/siglas do setor Cidade-UF, data. Ao Senhor [Nome] Gerente dos Complexos Reguladores Endereço CEP Cidade/UF Assunto: Solicitação de senha. Senhor Gerente, Tenho o prazer de dirigir-me ao Senhor para solicitar senha de acesso ao sistema SISREG, perfil administrador, objetivando a implantação da Central de Regulação de Consultas e Exames do Município. Essa ação visa à humanização dos serviços, ao controle do fluxo e à otimização na utilização dos recursos. Agradecendo a colaboração, renovo protestos de estima, (espaço para assinatura) [NOME DO SIGNATÁRIO] Secretário Municipal de Saúde','Polícia Militar de Santa Catarina',2023,'CEBRASPE','Caderno oficial CEBRASPE/PM-SC 2023 (matriz 862_PMSC_SOLDADO_001_01), https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/862_PMSC_SOLDADO_001_01.PDF' where not exists (select 1 from public.question_support_texts where label='Texto 1A5-III — Ofício: solicitação de senha (itens 40 e 41)');
insert into public.question_support_texts(id,label,body,contest_name,exam_year,exam_board,source_note) select 'aecf2fac-81cb-4fc4-9138-9d359495c7a8','Texto 1A7-I — Sentenças abertas c(x), l(x) e w(x) (itens 51 a 54)','Texto 1A7-I Considere-se que C, L e W representem, respectivamente, os conjuntos verdade das seguintes sentenças abertas, todas com a variável x = “pessoa” tomada no conjunto universo V de todos os cidadãos de determinada cidade. c(x): a pessoa confunde crime com liberdade de expressão l(x): a pessoa confunde liberdade de expressão com crime w(x): a pessoa que confunde crime com liberdade de expressão confunde liberdade de expressão com crime','Polícia Militar de Santa Catarina',2023,'CEBRASPE','Caderno oficial CEBRASPE/PM-SC 2023 (matriz 862_PMSC_SOLDADO_001_01), https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/862_PMSC_SOLDADO_001_01.PDF' where not exists (select 1 from public.question_support_texts where label='Texto 1A7-I — Sentenças abertas c(x), l(x) e w(x) (itens 51 a 54)');
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Texto 1A5-I — Os algoritmos estão em toda parte (itens 33 a 37)' limit 1) where contest_name='Polícia Militar de Santa Catarina' and career_name='Soldado da Polícia Militar' and exam_year=2023 and item_number in (33,34,35,36,37);
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Texto 1A5-II — Chatbot e ChatGPT (itens 38 e 39)' limit 1) where contest_name='Polícia Militar de Santa Catarina' and career_name='Soldado da Polícia Militar' and exam_year=2023 and item_number in (38,39);
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Texto 1A5-III — Ofício: solicitação de senha (itens 40 e 41)' limit 1) where contest_name='Polícia Militar de Santa Catarina' and career_name='Soldado da Polícia Militar' and exam_year=2023 and item_number in (40,41);
update public.official_exam_questions set support_text_id=(select id from public.question_support_texts where label='Texto 1A7-I — Sentenças abertas c(x), l(x) e w(x) (itens 51 a 54)' limit 1) where contest_name='Polícia Militar de Santa Catarina' and career_name='Soldado da Polícia Militar' and exam_year=2023 and item_number in (51,52,53,54);
commit;
