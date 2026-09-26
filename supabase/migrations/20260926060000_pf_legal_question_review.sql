-- Individual legal audit of PF official questions (2014, 2018, 2021 and 2025).
-- Federal legislation was checked against the compiled text on Planalto;
-- case-law items use only STF/STJ official repositories. Historical items are
-- linked to the active PF 2025 syllabus before they can become active.

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('lei','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Federais','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm','vigente','Texto compilado conferido em 26/09/2026.'),
('lei','Lei nº 14.133/2021 – Lei de Licitações e Contratos Administrativos','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm','vigente','Texto compilado conferido em 26/09/2026.'),
('lei','Lei nº 9.784/1999 – Processo Administrativo Federal','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm','vigente','Texto compilado conferido em 26/09/2026.'),
('lei','Lei nº 7.960/1989 – Prisão Temporária','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/l7960.htm','vigente','Texto compilado conferido em 26/09/2026.'),
('lei','Lei nº 10.446/2002 – Infrações de Repercussão Interestadual ou Internacional','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/2002/l10446.htm','vigente','Texto compilado conferido em 26/09/2026.'),
('lei','Lei nº 7.116/1983 – Carteira de Identidade','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/1980-1988/l7116.htm','vigente','Texto compilado conferido em 26/09/2026.'),
('decreto','Decreto nº 10.977/2022 – Carteira de Identidade e Serviço de Identificação do Cidadão','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d10977.htm','vigente','Texto compilado conferido em 26/09/2026.'),
('decreto','Decreto nº 592/1992 – Pacto Internacional sobre Direitos Civis e Políticos','Presidência da República','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0592.htm','vigente','Texto oficial promulgado no Brasil.'),
('decreto','Decreto nº 40/1991 – Convenção contra a Tortura','Presidência da República','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm','vigente','Texto oficial promulgado no Brasil.'),
('decreto','Decreto nº 50.215/1961 – Convenção Relativa ao Estatuto dos Refugiados','Presidência da República','https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d50215.htm','vigente','Texto oficial promulgado no Brasil.'),
('manual','Regras Mínimas das Nações Unidas para o Tratamento de Reclusos (Regras de Nelson Mandela)','Organização das Nações Unidas','https://digitallibrary.un.org/record/816764','vigente','Resolução A/RES/70/175 da Assembleia Geral da ONU.'),
('sumula','Súmula Vinculante nº 11 – Uso de algemas','Supremo Tribunal Federal','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=1220','vigente','Enunciado e precedentes no portal oficial do STF.'),
('sumula','Súmula nº 145 – Flagrante preparado','Supremo Tribunal Federal','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2119','vigente','Enunciado no portal oficial do STF.'),
('sumula','Súmula nº 500 – Corrupção de menores','Superior Tribunal de Justiça','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&i=177&l=100&operador=AND&ordenacao=-%40NUM&p=false&tipo=SUMULA+OR+SU','vigente','Enunciado e precedentes no repositório oficial do STJ.'),
('sumula','Súmula nº 587 – Tráfico interestadual','Superior Tribunal de Justiça','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&i=1&l=10&livre=%22587%22+INPATH%28NUM%29&operador=AND&ordenacao=-%40NUM&p=false','vigente','Enunciado e precedentes no repositório oficial do STJ.'),
('sumula','Súmula nº 607 – Tráfico transnacional','Superior Tribunal de Justiça','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&i=1&l=10&livre=%22607%22+INPATH%28NUM%29&operador=AND&ordenacao=-%40NUM&p=false','vigente','Enunciado e precedentes no repositório oficial do STJ.'),
('jurisprudencia','STJ Informativo 528 – Apropriação indébita previdenciária','Superior Tribunal de Justiça','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisarumaedicao&livre=%40cod%3D0528','vigente','Dolo genérico no art. 168-A do Código Penal.'),
('jurisprudencia','STJ Informativo 548 – Descaminho e via administrativa','Superior Tribunal de Justiça','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40cnot%3D014994','vigente','Consumação do descaminho independe do esgotamento da via administrativa.'),
('jurisprudencia','STJ Informativo 602 – Crime ambiental e insignificância','Superior Tribunal de Justiça','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?livre=%40CNOT%3D016278','vigente','Admite insignificância quando concretamente ausente lesividade ambiental.'),
('jurisprudencia','STJ Informativo 842 – Cabo de vassoura como arma branca imprópria','Superior Tribunal de Justiça','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&b=INFJ&i=226&l=25&livre=reserva+do+&p=true&refinar=S.DISP.','vigente','AREsp 2.589.697/DF, julgado em 11/02/2025.'),
('jurisprudencia','STJ Informativo 529 – Prova da escalada no furto','Superior Tribunal de Justiça','https://scon.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27014444%27','vigente','Outros meios idôneos podem suprir a perícia da escalada.'),
('jurisprudencia','STF Tema 940 – Responsabilidade civil do agente público','Supremo Tribunal Federal','https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=940','vigente','Repercussão geral; usado para sinalizar conflito editorial do item 12/2025.'),
('jurisprudencia','STF – Reserva de vagas para pessoas com deficiência','Supremo Tribunal Federal','https://stf.jus.br/arquivo/informativo/documento/informativo480.htm','vigente','Precedente oficial sobre duas vagas e os limites percentuais.'),
('jurisprudencia','STJ – Homicídio privilegiado-qualificado','Superior Tribunal de Justiça','https://www.stj.jus.br/websecstj/cgi/revista/REJ.cgi/ITA?CodOrgaoJgdr=&SeqCgrmaSessao=&dt=20160629&formato=PDF&nreg=201101977340&salvar=false&seq=1522375&tipo=0','vigente','Compatibilidade entre privilégio subjetivo e qualificadora objetiva.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

alter table public.official_exam_questions
  add column if not exists current_syllabus_topic_id uuid references public.syllabus_topics(id),
  add column if not exists legal_audit_completed boolean not null default false;

-- Every legal item is explicitly mapped to the current PF 2025 syllabus.
with mapping(exam_year,item_number,discipline,topic_order) as (values
  (2014,101,'Direito Penal e Processual Penal',1),(2014,102,'Direito Penal e Processual Penal',2),(2014,103,'Direito Penal e Processual Penal',2),(2014,104,'Direito Penal e Processual Penal',2),
  (2014,105,'Direito Penal e Processual Penal',4),(2014,106,'Direito Penal e Processual Penal',4),(2014,107,'Direito Penal e Processual Penal',4),(2014,108,'Direito Penal e Processual Penal',4),
  (2014,109,'Noções de Direito Administrativo',2),(2014,110,'Noções de Direito Administrativo',1),(2014,111,'Noções de Direito Administrativo',3),(2014,112,'Noções de Direito Administrativo',3),
  (2014,113,'Noções de Direito Constitucional',1),(2014,114,'Noções de Direito Constitucional',1),(2014,115,'Direito Penal e Processual Penal',4),(2014,116,'Noções de Direito Constitucional',1),
  (2014,117,'Legislação Especial',2),(2014,118,'Noções de Direito Constitucional',2),(2014,119,'Legislação Especial',2),(2014,120,'Legislação Especial',3),
  (2018,25,'Noções de Direito Administrativo',1),(2018,26,'Noções de Direito Administrativo',1),(2018,27,'Noções de Direito Administrativo',3),(2018,28,'Noções de Direito Administrativo',3),
  (2018,29,'Noções de Direito Constitucional',1),(2018,30,'Noções de Direito Constitucional',1),(2018,31,'Noções de Direito Constitucional',2),(2018,32,'Noções de Direito Constitucional',2),
  (2018,33,'Direito Penal e Processual Penal',2),(2018,34,'Direito Penal e Processual Penal',1),(2018,35,'Direito Penal e Processual Penal',3),(2018,36,'Direito Penal e Processual Penal',4),
  (2018,37,'Direito Penal e Processual Penal',4),(2018,38,'Legislação Especial',2),(2018,39,'Legislação Especial',1),(2018,40,'Legislação Especial',2),
  (2021,25,'Noções de Direito Administrativo',2),(2021,26,'Noções de Direito Administrativo',3),(2021,27,'Noções de Direito Administrativo',3),(2021,28,'Noções de Direito Constitucional',2),
  (2021,29,'Noções de Direito Constitucional',1),(2021,30,'Noções de Direito Constitucional',1),(2021,31,'Direito Penal e Processual Penal',4),(2021,32,'Direito Penal e Processual Penal',2),
  (2021,33,'Direito Penal e Processual Penal',4),(2021,34,'Legislação Especial',2),(2021,35,'Legislação Especial',1),(2021,36,'Legislação Especial',2),
  (2025,11,'Noções de Direito Administrativo',2),(2025,12,'Noções de Direito Administrativo',3),(2025,13,'Noções de Direito Administrativo',1),(2025,14,'Noções de Direito Administrativo',2),
  (2025,15,'Noções de Direito Administrativo',3),(2025,16,'Noções de Direito Administrativo',3),(2025,17,'Noções de Direito Constitucional',1),(2025,18,'Noções de Direito Constitucional',1),
  (2025,19,'Noções de Direito Constitucional',2),(2025,20,'Noções de Direito Constitucional',2),(2025,21,'Noções de Direito Constitucional',2),(2025,22,'Noções de Direito Constitucional',2),
  (2025,23,'Direito Penal e Processual Penal',2),(2025,24,'Direito Penal e Processual Penal',2),(2025,25,'Direito Penal e Processual Penal',4),(2025,26,'Direito Penal e Processual Penal',3),
  (2025,27,'Direito Penal e Processual Penal',3),(2025,28,'Direito Penal e Processual Penal',1),(2025,29,'Direitos Humanos',2),(2025,30,'Direitos Humanos',2),
  (2025,31,'Direitos Humanos',2),(2025,32,'Direitos Humanos',1),(2025,33,'Direitos Humanos',2),(2025,34,'Direitos Humanos',2),
  (2025,35,'Legislação Especial',2),(2025,36,'Legislação Especial',1),(2025,37,'Legislação Especial',1),(2025,38,'Legislação Especial',2),
  (2025,39,'Legislação Especial',2),(2025,40,'Legislação Especial',3),(2025,41,'Legislação Especial',3),(2025,42,'Legislação Especial',3),
  (2025,43,'Legislação Especial',2),(2025,44,'Legislação Especial',2)
), active_topics as (
  select t.id,t.discipline,t.topic_order
  from public.syllabus_topics t
  join public.syllabus_editions e on e.id=t.edition_id
  where e.contest_name='Polícia Federal' and e.role_name='Agente de Polícia Federal'
    and e.contest_year=2025 and e.status='active' and t.content_status='current'
)
update public.official_exam_questions q
set current_syllabus_topic_id=t.id, law_version_checked_at=now(), verified_at=now()
from mapping m join active_topics t using (discipline,topic_order)
where q.exam_year=m.exam_year and q.item_number=m.item_number;

-- Start from a conservative state. Only the explicit allow-list below is published.
update public.official_exam_questions
set content_status=case when official_answer='X' then 'annulled' else 'under_review' end,
    legal_audit_completed=false,
    legal_review_required=case when official_answer='X' then false else true end,
    legal_basis='[]'::jsonb,
    review_note=case when official_answer='X'
      then 'Item anulado no gabarito definitivo da banca; preservado apenas para auditoria histórica e nunca exibido aos estudantes.'
      else 'Revisão jurídica iniciada em 26/09/2026; publicação bloqueada até conclusão documentada.' end
where current_syllabus_topic_id is not null;

-- Planalto: Constitution, codes and federal statutes.
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'))
where (exam_year,item_number) in ((2014,109),(2014,113),(2014,114),(2014,116),(2018,29),(2018,30),(2018,31),(2018,32),(2021,28),(2021,29),(2021,30),(2025,12),(2025,17),(2025,19),(2025,20),(2025,21),(2025,22));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Código Penal – texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'))
where (exam_year,item_number) in ((2014,101),(2014,102),(2014,103),(2014,104),(2018,33),(2018,34),(2021,32),(2025,23),(2025,24),(2025,25),(2025,28));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'))
where (exam_year,item_number) in ((2014,105),(2014,106),(2014,107),(2014,113),(2014,115),(2018,35),(2018,36),(2018,37),(2021,31),(2021,33),(2025,25),(2025,26),(2025,27));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm'))
where (exam_year,item_number) in ((2014,109),(2014,110),(2021,25),(2025,14));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm'))
where (exam_year,item_number) in ((2018,27),(2018,28),(2021,26),(2021,27),(2025,16));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')) where exam_year=2025 and item_number=15;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 7.960/1989','url','https://www.planalto.gov.br/ccivil_03/leis/l7960.htm')) where exam_year=2014 and item_number=108;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990 – ECA compilado','url','https://www.planalto.gov.br/ccivil_03/leis/l8069compilado.htm')) where (exam_year,item_number) in ((2014,117),(2025,35));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 11.343/2006 – Lei de Drogas','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm')) where (exam_year,item_number) in ((2014,119),(2018,38),(2021,34),(2025,38));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 9.605/1998 – Crimes Ambientais','url','https://www.planalto.gov.br/ccivil_03/leis/l9605.htm')) where (exam_year,item_number) in ((2014,118),(2018,40),(2021,36),(2025,44));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 13.445/2017 – Lei de Migração','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm')) where (exam_year,item_number) in ((2018,39),(2021,35),(2025,37));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 10.446/2002','url','https://www.planalto.gov.br/ccivil_03/leis/2002/l10446.htm')) where (exam_year,item_number) in ((2014,120),(2025,42));
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 14.967/2024 – Estatuto da Segurança Privada','url','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm')) where exam_year=2025 and item_number=36;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 9.455/1997 – Crimes de Tortura','url','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm')) where exam_year=2025 and item_number=39;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 7.116/1983','url','https://www.planalto.gov.br/ccivil_03/leis/1980-1988/l7116.htm')) where exam_year=2025 and item_number=40;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Decreto nº 10.977/2022','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d10977.htm')) where exam_year=2025 and item_number=41;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Lei nº 10.826/2003 – Estatuto do Desarmamento','url','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm')) where exam_year=2025 and item_number=43;

-- Human-rights instruments in their official repositories.
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Regras de Nelson Mandela – Resolução A/RES/70/175','url','https://digitallibrary.un.org/record/816764')) where exam_year=2025 and item_number between 29 and 31;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Pacto Internacional sobre Direitos Civis e Políticos – Decreto nº 592/1992','url','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0592.htm')) where exam_year=2025 and item_number=32;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Convenção contra a Tortura – Decreto nº 40/1991','url','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm')) where exam_year=2025 and item_number=33;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','Convenção Relativa ao Estatuto dos Refugiados – Decreto nº 50.215/1961','url','https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d50215.htm')) where exam_year=2025 and item_number=34;

-- Official STF/STJ complements for questions that depend on case law.
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – homicídio privilegiado-qualificado','url','https://www.stj.jus.br/websecstj/cgi/revista/REJ.cgi/ITA?CodOrgaoJgdr=&SeqCgrmaSessao=&dt=20160629&formato=PDF&nreg=201101977340&salvar=false&seq=1522375&tipo=0')) where exam_year=2014 and item_number=104;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STF – reserva de vagas para pessoas com deficiência','url','https://stf.jus.br/arquivo/informativo/documento/informativo480.htm')) where exam_year=2014 and item_number=109;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STF – Súmula Vinculante nº 11','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=1220')) where exam_year=2014 and item_number=114;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Súmula nº 500','url','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&i=177&l=100&operador=AND&ordenacao=-%40NUM&p=false&tipo=SUMULA+OR+SU')) where exam_year=2014 and item_number=117;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Informativo 602','url','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?livre=%40CNOT%3D016278')) where exam_year=2014 and item_number=118;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Súmula nº 587','url','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&i=1&l=10&livre=%22587%22+INPATH%28NUM%29&operador=AND&ordenacao=-%40NUM&p=false')) where exam_year=2018 and item_number=38;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Informativo 548','url','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40cnot%3D014994')) where exam_year=2021 and item_number=32;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STF – Súmula nº 145','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2119')) where exam_year=2021 and item_number=33;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Súmula nº 607','url','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&i=1&l=10&livre=%22607%22+INPATH%28NUM%29&operador=AND&ordenacao=-%40NUM&p=false')) where exam_year=2021 and item_number=34;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Informativo 842','url','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&b=INFJ&i=226&l=25&livre=reserva+do+&p=true&refinar=S.DISP.')) where exam_year=2025 and item_number=24;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Informativo 529','url','https://scon.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisar&aplicacao=informativo&livre=%40CNOT%3D%27014444%27')) where exam_year=2025 and item_number=25;
update public.official_exam_questions set legal_basis=legal_basis || jsonb_build_array(jsonb_build_object('title','STJ – Informativo 528','url','https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisarumaedicao&livre=%40cod%3D0528')) where exam_year=2014 and item_number=102;
update public.official_exam_questions set legal_basis=jsonb_build_array(jsonb_build_object('title','STF Tema 940','url','https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=940')) where exam_year=2025 and item_number=12;

-- 59 items are self-contained, match the active syllabus and retain a correct
-- official answer under the law/case law checked on 26/09/2026.
update public.official_exam_questions
set content_status='active', legal_review_required=false, legal_audit_completed=true,
    review_note='Questão oficial revisada em 26/09/2026: resposta preservada, matéria vinculada ao edital PF 2025 e fundamento vigente conferido em fonte oficial.'
where (exam_year=2014 and item_number in (101,102,103,104,106,107,108,109,113,114,116,117,118,119,120))
   or (exam_year=2018 and item_number in (27,28,31,32,33,34,35,36,37,38,39))
   or (exam_year=2021 and item_number in (29,30,31,32,33,34,35,36))
   or (exam_year=2025 and item_number in (14,15,17,19,20,21,22,23,24,25,26,27,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44));

-- The remaining non-annulled items stay quarantined for a documented reason.
update public.official_exam_questions set review_note='Extração incompleta: o item perdeu parte essencial do enunciado-base. Exige recorte manual do caderno oficial antes de qualquer publicação.',context_review_required=true where (exam_year,item_number) in ((2014,105),(2014,115),(2018,40),(2021,25),(2021,26),(2021,27),(2025,28));
update public.official_exam_questions set review_note='Item conceitual/doutrinário: o gabarito não pode ser validado exclusivamente em texto legal oficial. Permanece bloqueado para revisão editorial especializada.' where (exam_year,item_number) in ((2014,110),(2014,112),(2018,25),(2018,26),(2025,11),(2025,13),(2025,16),(2025,18));
update public.official_exam_questions set review_note='Conflito detectado entre o gabarito importado e a tese do STF no Tema 940. Permanece bloqueado até conferência manual da justificativa oficial da banca.' where exam_year=2025 and item_number=12;

-- A publication guard prevents future accidental activation of unaudited legal content.
alter table public.official_exam_questions drop constraint if exists official_exam_questions_active_legal_audit_check;
alter table public.official_exam_questions add constraint official_exam_questions_active_legal_audit_check check (
  content_status <> 'active'
  or subject not in ('Direito Administrativo','Noções de Direito Administrativo','Direito Constitucional','Noções de Direito Constitucional','Direito Penal e Processual Penal','Direitos Humanos','Legislação Especial')
  or (legal_audit_completed and current_syllabus_topic_id is not null and law_version_checked_at is not null and jsonb_array_length(legal_basis) > 0)
);

create index if not exists idx_official_exam_questions_current_syllabus
  on public.official_exam_questions(current_syllabus_topic_id,content_status);
