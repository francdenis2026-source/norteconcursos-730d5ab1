-- Import of Câmara dos Deputados 2026 official exam items for the career
-- "Técnico Legislativo – Especialidade: Policial Legislativo Federal"
-- (Edital nº 1 – CD/PLF, de 23 de janeiro de 2026, CEBRASPE, aplicação em
-- 26/4/2026). This is the FIRST import for this contest/career combination.
--
-- Source material read verbatim from Google Drive folder "CÂMARA DOS
-- DEPUTADOS 26 POLICIAL LEGISLATIVO FEDERAL" (fileId
-- 1YZ1v0qHKdm5tgrMbcBu888gA146wSn9L):
--   - Prova objetiva - Conhecimentos Gerais (fileId
--     1iIlZ8ULGoN80iffDX1jBRegWuNfKMaY2), itens 1 a 90.
--   - Prova objetiva - Conhecimentos Específicos (fileId
--     139uVVRFXKRgzQ4O_hIh1cfvIwWplinAz), itens 91 a 180.
--   - Gabarito definitivo - Conhecimentos Gerais (fileId
--     1LqdsTfgFDOkAc2Q-8XuGuVLKj5TeL-NP), itens 1 a 90.
--   - Gabarito definitivo - Conhecimentos Específicos (fileId
--     1aZPmGJkZ8bG8D19vdf8nU6kOQkyej45N), itens 91 a 180.
--   - Edital nº 1 - Abertura (fileId 1K56dLM4QovvYRO18mnc9RDHtl_AjJxzG),
--     used to confirm exact career wording, código de vaga (CDAL-015) and
--     banca (CEBRASPE).
-- Item counts cross-checked: prova objetiva (CG 1-90 + CE 91-180 = 180
-- itens) matches gabarito definitivo (CG 1-90 + CE 91-180 = 180 itens).
-- ( X ) no gabarito = item anulado -> content_status='annulled'.
--
-- Career/contest naming confirmed from the edital cover: cargo "Técnico
-- Legislativo – Especialidade: Policial Legislativo Federal", código
-- CDAL-015, órgão "Câmara dos Deputados", banca CEBRASPE, ano 2026.

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro','Prova objetiva - Conhecimentos Gerais - Câmara dos Deputados - Policial Legislativo Federal - 2026','Câmara dos Deputados / CEBRASPE','https://www.cebraspe.org.br/concursos/cd_26_policial_legislativo/prova_objetiva_conhecimentos_gerais.pdf/view','vigente','Caderno oficial usado para extração auditável de itens 1-90 (Google Drive fileId 1iIlZ8ULGoN80iffDX1jBRegWuNfKMaY2, texto lido verbatim nesta sessão). Edital nº 1 - CD/PLF, de 23/1/2026; aplicação 26/4/2026.'),
('outro','Prova objetiva - Conhecimentos Específicos - Câmara dos Deputados - Policial Legislativo Federal - 2026','Câmara dos Deputados / CEBRASPE','https://www.cebraspe.org.br/concursos/cd_26_policial_legislativo/prova_objetiva_conhecimentos_especificos.pdf/view','vigente','Caderno oficial usado para extração auditável de itens 91-180 (Google Drive fileId 139uVVRFXKRgzQ4O_hIh1cfvIwWplinAz, texto lido verbatim nesta sessão). Edital nº 1 - CD/PLF, de 23/1/2026; aplicação 26/4/2026.'),
('outro','Gabarito definitivo - Conhecimentos Gerais - Câmara dos Deputados - Policial Legislativo Federal - 2026','Câmara dos Deputados / CEBRASPE','https://www.cebraspe.org.br/concursos/cd_26_policial_legislativo/gabarito_definitivo_conhecimentos_gerais.pdf/view','vigente','Gabarito oficial definitivo itens 1-90, arquivo 175_CDPLF_CG1_01 (Google Drive fileId 1LqdsTfgFDOkAc2Q-8XuGuVLKj5TeL-NP); X identifica item anulado.'),
('outro','Gabarito definitivo - Conhecimentos Específicos - Câmara dos Deputados - Policial Legislativo Federal - 2026','Câmara dos Deputados / CEBRASPE','https://www.cebraspe.org.br/concursos/cd_26_policial_legislativo/gabarito_definitivo_conhecimentos_especificos.pdf/view','vigente','Gabarito oficial definitivo itens 91-180, arquivo 175_CDPLF_001_01 (Google Drive fileId 1aZPmGJkZ8bG8D19vdf8nU6kOQkyej45N); X identifica item anulado.'),
('outro','Edital nº 1 – CD/PLF, de 23 de janeiro de 2026 (Abertura)','Câmara dos Deputados / CEBRASPE','https://www.cebraspe.org.br/concursos/cd_26_policial_legislativo/edital_1_abertura.pdf/view','vigente','Edital de abertura do concurso; usado para confirmar denominação exata do cargo (Técnico Legislativo – Especialidade: Policial Legislativo Federal, código CDAL-015) e banca (Google Drive fileId 1K56dLM4QovvYRO18mnc9RDHtl_AjJxzG).')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year)
select 'Câmara dos Deputados','Técnico Legislativo – Especialidade: Policial Legislativo Federal',2026
where not exists (
  select 1 from public.syllabus_editions
  where contest_name='Câmara dos Deputados' and role_name='Técnico Legislativo – Especialidade: Policial Legislativo Federal' and contest_year=2026
);

with edition as (
  select id from public.syllabus_editions
  where contest_name='Câmara dos Deputados' and role_name='Técnico Legislativo – Especialidade: Policial Legislativo Federal' and contest_year=2026
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Prova objetiva',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Compreensão e interpretação de textos, coesão e coerência, correção gramatical, sintaxe e classes de palavras.'),
  ('Língua Inglesa','Compreensão e interpretação de textos em língua inglesa sobre policiamento democrático e segurança parlamentar.'),
  ('Raciocínio Lógico-Matemático','Lógica proposicional, lógica de primeira ordem, análise combinatória, probabilidade e estatística (medidas de tendência central, dispersão e padronização).'),
  ('Direito Constitucional','Organização do Estado, princípios fundamentais, administração pública, segurança pública, Poder Legislativo, imunidades parlamentares e processo legislativo, à luz da Constituição Federal de 1988 e da jurisprudência do STF.'),
  ('Legislação Aplicável à Câmara dos Deputados','Regimento Interno da Câmara dos Deputados e Resolução da Câmara dos Deputados nº 18/2003, quanto à segurança institucional e à Polícia da Câmara dos Deputados.'),
  ('Direito Administrativo','Organização administrativa, atos e processos administrativos, agentes públicos, responsabilidade civil do Estado, Lei de Acesso à Informação, Lei Geral de Proteção de Dados, Lei nº 8.429/1992 (improbidade administrativa), bens públicos, licitações e contratos, e administração orçamentária e financeira.'),
  ('Noções de Informática','Sistemas operacionais, ferramentas de produtividade e nuvem, segurança da informação, redes, bancos de dados, Big Data, Android, malware e inteligência artificial generativa.'),
  ('Direito Penal','Crimes contra a administração pública (peculato), concurso de agentes, relação de causalidade, imputação penal, causas de extinção da punibilidade, lei penal no tempo e no espaço, imunidades, culpabilidade e exclusão da responsabilidade penal.'),
  ('Legislação Penal Especial - Juizados Especiais Criminais','Lei n.º 9.099/1995: atos processuais, termo circunstanciado de ocorrência e transação penal.'),
  ('Direito Processual Penal','Prisão em flagrante, prisão preventiva, liberdade provisória, mandado de prisão, interceptação telefônica (Lei n.º 9.296/1996) e prisão temporária (Lei n.º 7.960/1989).'),
  ('Lei de Abuso de Autoridade','Condutas tipificadas na Lei n.º 13.869/2019: ação penal, instauração de procedimento investigatório e condução coercitiva.'),
  ('Perícia Criminal','Exames periciais, prazos de laudo, exame documentoscópico e exame de corpo de delito.'),
  ('Criminologia','Modelos de reação ao delito, teorias sociológicas da criminologia (neutralização, identificação diferencial, subcultura delinquente), escolas criminológicas e controle social.'),
  ('Local de Crime e Cadeia de Custódia','Preservação do local de crime, vestígio, indício e evidência, etapas da cadeia de custódia e fraude processual.'),
  ('Direitos Humanos','Incorporação de tratados internacionais de direitos humanos na Constituição Federal, Convenção Americana sobre Direitos Humanos (Pacto de São José da Costa Rica) e Declaração Universal dos Direitos Humanos.'),
  ('Uso da Força e Atuação Policial','Princípios básicos sobre a utilização da força e de armas de fogo pelos funcionários responsáveis pela aplicação da lei.'),
  ('Atividade de Inteligência','Funções da atividade de inteligência, metodologia de produção de conhecimentos, contrainteligência, Política Nacional de Inteligência, análise de risco e controle da atividade de inteligência.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;
