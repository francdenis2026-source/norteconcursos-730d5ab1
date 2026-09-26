-- Global, original question catalog derived from official police-career syllabuses.
-- Question wording is original; source documents are used only as syllabus matrices.
create table if not exists public.curated_question_catalog (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.content_sources(id),
  syllabus_topic_id uuid not null references public.syllabus_topics(id),
  external_item_key text not null,
  contest_name text not null,
  contest_year integer not null,
  career_name text not null,
  exam_board text not null default 'CEBRASPE',
  subject text not null,
  subtopic text,
  question_text text not null,
  official_answer text not null check (official_answer in ('C','E')),
  explanation text not null,
  legal_basis jsonb not null default '[]'::jsonb,
  difficulty text not null default 'média',
  content_status text not null default 'active' check (content_status in ('draft','active','under_review','obsolete','revoked','archived')),
  is_original boolean not null default true,
  verified_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (source_id,external_item_key)
);

alter table public.curated_question_catalog enable row level security;
create policy "Authenticated users can read active curated questions" on public.curated_question_catalog for select to authenticated using (content_status='active');
create policy "Admins manage curated questions" on public.curated_question_catalog for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

insert into public.content_sources (source_type,title,issuer,url,published_on,status,notes) values
('edital','Edital nº 1/2025 – PC-CE – Delegado','Polícia Civil do Ceará / CEBRASPE','https://cdn.cebraspe.org.br/concursos/pc_ce_25_delegado/arquivos/Ed_1_2025_PC_CE_Delegado_Abertura.pdf','2025-03-14','vigente','Matriz oficial; questões do catálogo são autorais.'),
('edital','Edital PMDF CFO 2025 – versão atualizada','Polícia Militar do Distrito Federal / CEBRASPE','https://cdn.cebraspe.org.br/concursos/pm_df_25_cfo/arquivos/Ed_03.2025_PMDF_CFO_25_abertura_atualizado_ret_39.pdf','2025-02-27','vigente','Matriz oficial; questões do catálogo são autorais.'),
('edital','Edital nº 1/2025 – PC-MG – Auxiliar de Perícia','Polícia Civil de Minas Gerais / CEBRASPE','https://cdn.cebraspe.org.br/concursos/PC_MG_25_TPAG/arquivos/3DE09EB25BF7FB9DAD45DD6B6BFD98BEB4081058640F5A31E7B9620D1F9D2A68.html','2025-11-06','vigente','Matriz oficial; questões do catálogo são autorais.'),
('edital','Edital nº 1/2025 – PF Administrativo','Polícia Federal / CEBRASPE','https://cdn.cebraspe.org.br/concursos/pf_25_adm/arquivos/Ed_1_2025_PF_Administrativo_Abertura_atualizado.pdf','2025-04-25','vigente','Matriz oficial; questões do catálogo são autorais.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Civil do Ceará','Delegado de Polícia Civil',2025,'CEBRASPE',id,'active'
from public.content_sources where url like '%pc_ce_25_delegado%'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Civil de Minas Gerais','Auxiliar de Perícia',2025,'CEBRASPE',id,'active'
from public.content_sources where url like '%PC_MG_25_TPAG%'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Civil do Ceará' and role_name='Delegado de Polícia Civil' and contest_year=2025
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text)
select edition.id,'Conhecimentos jurídicos',q.discipline,q.topic_order,q.topic_text
from edition cross join (values
  ('Direito Constitucional',1,'Direitos e deveres fundamentais; direitos e garantias individuais e coletivos; aplicabilidade das normas constitucionais.'),
  ('Direito Penal',1,'Lei penal: vigência, aplicação no tempo e no espaço, irretroatividade e retroatividade benéfica.'),
  ('Direito Processual Penal',1,'Inquérito policial: natureza, finalidade, valor probatório, instauração, garantias, conclusão e prazos.')
) q(discipline,topic_order,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text,content_status='current';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Civil de Minas Gerais' and role_name='Auxiliar de Perícia' and contest_year=2025
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text)
select edition.id,'Eixo geral',q.discipline,q.topic_order,q.topic_text
from edition cross join (values
  ('Língua Portuguesa',1,'Compreensão, interpretação e mecanismos de coesão textual, incluindo referenciação e substituição.'),
  ('Informática',1,'Internet, sistemas operacionais, arquivos, backup, aplicativos de escritório, segurança e computação em nuvem.'),
  ('Raciocínio Lógico-Matemático',1,'Sequências, tabelas, operações, proporções, regra de três e noções de probabilidade.')
) q(discipline,topic_order,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text,content_status='current';

with pf as (select id from public.content_sources where url='https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Federal' and role_name='Agente de Polícia Federal' and contest_year=2025),
q(key,subject,subtopic,statement,answer,explanation,legal_basis,difficulty,topic_discipline,topic_order) as (values
('pf25-001','Direito Constitucional','Segurança pública','A Polícia Federal é órgão permanente, organizado e mantido pela União e estruturado em carreira.','C','A descrição corresponde ao art. 144, § 1º, da Constituição Federal.','[{"norma":"Constituição Federal","artigo":"144, § 1º","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]','fácil','Noções de Direito Constitucional',2),
('pf25-002','Direito Constitucional','Inviolabilidade do domicílio','Durante a noite, uma ordem judicial, por si só, autoriza o ingresso forçado em domicílio sem consentimento do morador.','E','A ordem judicial autoriza o ingresso durante o dia; à noite permanecem as hipóteses constitucionais de flagrante, desastre ou socorro.','[{"norma":"Constituição Federal","artigo":"5º, XI","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]','média','Noções de Direito Constitucional',1),
('pf25-003','Direito Administrativo','Organização administrativa','Na descentralização administrativa por outorga, a entidade criada mantém vínculo de controle finalístico com a Administração direta, e não relação hierárquica.','C','A descentralização cria pessoa distinta; há vinculação e supervisão finalística, não subordinação hierárquica.','[]','média','Noções de Direito Administrativo',1),
('pf25-004','Direito Administrativo','Atos administrativos','A presunção de legitimidade dos atos administrativos é relativa e admite prova em contrário.','C','Trata-se de presunção relativa, que pode ser afastada mediante demonstração de ilegalidade ou falsidade.','[]','fácil','Noções de Direito Administrativo',2),
('pf25-005','Direito Penal','Crime impossível','A ineficácia absoluta do meio empregado ou a impropriedade absoluta do objeto impedem a punição da tentativa.','C','É a regra do crime impossível prevista no art. 17 do Código Penal vigente.','[{"norma":"Código Penal","artigo":"17","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"}]','média','Direito Penal e Processual Penal',1),
('pf25-006','Direito Processual Penal','Prisão em flagrante','Qualquer pessoa pode prender quem seja encontrado em flagrante delito, enquanto as autoridades policiais e seus agentes têm o dever de fazê-lo.','C','O enunciado reproduz a distinção do art. 301 do CPP entre faculdade do cidadão e dever funcional.','[{"norma":"Código de Processo Penal","artigo":"301","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm"}]','fácil','Direito Penal e Processual Penal',4),
('pf25-007','Legislação Especial','Lei de Migração','A deportação possui natureza de pena criminal aplicada ao migrante em situação documental irregular.','E','A deportação é medida administrativa de retirada compulsória, observadas as garantias da Lei de Migração; não é pena criminal.','[{"norma":"Lei nº 13.445/2017","artigo":"50","url":"https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm"}]','média','Legislação Especial',1),
('pf25-008','Legislação Especial','Segurança privada','A autorização e a fiscalização nacional dos serviços de segurança privada integram as competências atribuídas à Polícia Federal pela legislação vigente.','C','A Lei nº 14.967/2024 atribui à Polícia Federal funções de autorização, controle e fiscalização do setor.','[{"norma":"Lei nº 14.967/2024","artigo":"40","url":"https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm"}]','média','Legislação Especial',1),
('pf25-009','Raciocínio Lógico','Equivalências','A proposição “se P, então Q” é logicamente equivalente a “se não Q, então não P”.','C','A segunda proposição é a contrapositiva da primeira e possui a mesma tabela-verdade.','[]','fácil','Raciocínio Lógico',1),
('pf25-010','Estatística','Probabilidade condicional','Se dois eventos de probabilidade positiva são independentes, então a probabilidade da interseção é o produto de suas probabilidades.','C','Para eventos independentes, P(A∩B)=P(A)P(B).','[]','fácil','Estatística',2),
('pf25-011','Informática','Redes','O DNS é empregado para resolver nomes de domínio em endereços IP e pode operar sobre UDP ou TCP.','C','Consultas usuais usam UDP; respostas extensas, transferências de zona e outros casos podem usar TCP.','[]','média','Informática',2),
('pf25-012','Informática','Segurança da informação','Uma função hash criptográfica adequada deve permitir reconstruir diretamente a mensagem original a partir do resumo gerado.','E','Funções hash são projetadas para serem unidirecionais; não se trata de criptografia reversível.','[]','fácil','Informática',3),
('pf25-013','Contabilidade Geral','Equação patrimonial','Se o ativo de uma entidade é superior ao passivo exigível, seu patrimônio líquido é positivo.','C','Pela equação patrimonial, patrimônio líquido é igual ao ativo menos o passivo exigível.','[]','fácil','Contabilidade Geral',1),
('pf25-014','Língua Portuguesa','Concordância verbal','Na construção “Faz dois anos que estudo”, o verbo fazer permanece no singular por indicar tempo decorrido.','C','Quando impessoal e indicando tempo transcorrido, o verbo fazer fica na terceira pessoa do singular.','[]','fácil','Língua Portuguesa',2)
)
insert into public.curated_question_catalog (source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty)
select pf.id,t.id,q.key,'Polícia Federal',2025,'Agente de Polícia Federal',q.subject,q.subtopic,q.statement,q.answer,q.explanation,q.legal_basis::jsonb,q.difficulty
from pf cross join edition cross join q join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=q.topic_discipline and t.topic_order=q.topic_order
on conflict (source_id,external_item_key) do update set syllabus_topic_id=excluded.syllabus_topic_id,question_text=excluded.question_text,official_answer=excluded.official_answer,explanation=excluded.explanation,legal_basis=excluded.legal_basis,content_status='active',verified_at=now();

with pcce as (select id from public.content_sources where url like '%pc_ce_25_delegado%'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Civil do Ceará' and role_name='Delegado de Polícia Civil' and contest_year=2025)
insert into public.curated_question_catalog (source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty)
select pcce.id,t.id,q.key,'Polícia Civil do Ceará',2025,'Delegado de Polícia Civil',q.subject,q.subtopic,q.statement,q.answer,q.explanation,q.legal_basis::jsonb,q.difficulty
from pcce cross join edition cross join (values
('pcce25-001','Direito Penal','Aplicação da lei penal','A lei posterior mais benéfica aplica-se aos fatos anteriores, ainda que já exista condenação transitada em julgado.','C','A retroatividade da lei penal benéfica decorre da Constituição e do art. 2º, parágrafo único, do Código Penal.','[{"norma":"Código Penal","artigo":"2º, parágrafo único","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"}]','média'),
('pcce25-002','Direito Processual Penal','Inquérito policial','O inquérito policial é indispensável ao oferecimento da denúncia, mesmo quando o Ministério Público já dispõe de elementos suficientes de autoria e materialidade.','E','O inquérito é dispensável quando já existem elementos informativos suficientes para a ação penal.','[{"norma":"Código de Processo Penal","artigo":"12 e 39, § 5º","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm"}]','média'),
('pcce25-003','Direito Constitucional','Direitos fundamentais','As normas definidoras dos direitos e garantias fundamentais têm aplicação imediata.','C','É a regra expressa do art. 5º, § 1º, da Constituição.','[{"norma":"Constituição Federal","artigo":"5º, § 1º","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]','fácil')
) q(key,subject,subtopic,statement,answer,explanation,legal_basis,difficulty)
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=q.subject and t.topic_order=1
on conflict (source_id,external_item_key) do update set syllabus_topic_id=excluded.syllabus_topic_id,question_text=excluded.question_text,official_answer=excluded.official_answer,explanation=excluded.explanation,legal_basis=excluded.legal_basis,content_status='active',verified_at=now();

with pcmg as (select id from public.content_sources where url like '%PC_MG_25_TPAG%'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Civil de Minas Gerais' and role_name='Auxiliar de Perícia' and contest_year=2025)
insert into public.curated_question_catalog (source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,subject,subtopic,question_text,official_answer,explanation,difficulty)
select pcmg.id,t.id,q.key,'Polícia Civil de Minas Gerais',2025,'Auxiliar de Perícia',q.subject,q.subtopic,q.statement,q.answer,q.explanation,q.difficulty
from pcmg cross join edition cross join (values
('pcmg25-001','Língua Portuguesa','Coesão textual','A substituição de um termo por pronome pode promover coesão referencial, desde que o referente permaneça identificável.','C','A retomada pronominal é mecanismo de coesão e deve preservar clareza e referência.','fácil'),
('pcmg25-002','Raciocínio Lógico-Matemático','Conjuntos','Para dois conjuntos finitos, a quantidade de elementos da união é a soma das quantidades individuais menos a quantidade da interseção.','C','É o princípio da inclusão-exclusão para dois conjuntos.','fácil'),
('pcmg25-003','Informática','Segurança','A autenticação multifator exige fatores independentes e não se caracteriza apenas pelo uso de duas senhas diferentes.','C','Duas senhas pertencem ao mesmo fator de conhecimento; MFA combina categorias distintas.','média')
) q(key,subject,subtopic,statement,answer,explanation,difficulty)
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=q.subject and t.topic_order=1
on conflict (source_id,external_item_key) do update set syllabus_topic_id=excluded.syllabus_topic_id,question_text=excluded.question_text,official_answer=excluded.official_answer,explanation=excluded.explanation,content_status='active',verified_at=now();

create index if not exists idx_curated_questions_filters on public.curated_question_catalog(content_status,contest_year,subject);
