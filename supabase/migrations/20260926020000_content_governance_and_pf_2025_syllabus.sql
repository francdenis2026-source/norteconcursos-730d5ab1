-- Official-source governance for syllabus and question authoring.
create table if not exists public.content_sources (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('edital','lei','decreto','constituicao','sumula','jurisprudencia','manual','outro')),
  title text not null,
  issuer text not null,
  url text not null unique,
  published_on date,
  checked_at timestamptz not null default now(),
  status text not null default 'vigente' check (status in ('vigente','parcialmente_revogado','revogado','substituido','em_revisao')),
  is_official boolean not null default true,
  notes text
);

create table if not exists public.syllabus_editions (
  id uuid primary key default gen_random_uuid(),
  contest_name text not null,
  role_name text not null,
  contest_year integer not null,
  exam_board text,
  source_id uuid not null references public.content_sources(id),
  status text not null default 'active' check (status in ('active','superseded','archived')),
  created_at timestamptz not null default now(),
  unique (contest_name, role_name, contest_year)
);

create table if not exists public.syllabus_topics (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.syllabus_editions(id) on delete cascade,
  block_name text not null,
  discipline text not null,
  topic_order integer not null,
  topic_text text not null,
  content_status text not null default 'current' check (content_status in ('current','obsolete','revoked','under_review')),
  created_at timestamptz not null default now(),
  unique (edition_id, discipline, topic_order)
);

alter table public.content_sources enable row level security;
alter table public.syllabus_editions enable row level security;
alter table public.syllabus_topics enable row level security;
drop policy if exists "Authenticated users can read content sources" on public.content_sources;
create policy "Authenticated users can read content sources" on public.content_sources for select to authenticated using (true);
drop policy if exists "Authenticated users can read syllabus editions" on public.syllabus_editions;
create policy "Authenticated users can read syllabus editions" on public.syllabus_editions for select to authenticated using (true);
drop policy if exists "Authenticated users can read syllabus topics" on public.syllabus_topics;
create policy "Authenticated users can read syllabus topics" on public.syllabus_topics for select to authenticated using (true);
drop policy if exists "Admins manage content sources" on public.content_sources;
create policy "Admins manage content sources" on public.content_sources for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
drop policy if exists "Admins manage syllabus editions" on public.syllabus_editions;
create policy "Admins manage syllabus editions" on public.syllabus_editions for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
drop policy if exists "Admins manage syllabus topics" on public.syllabus_topics;
create policy "Admins manage syllabus topics" on public.syllabus_topics for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

alter table public.question_bank add column if not exists syllabus_topic_id uuid references public.syllabus_topics(id);
alter table public.question_bank add column if not exists content_status text not null default 'active' check (content_status in ('draft','active','under_review','obsolete','revoked','archived'));
alter table public.question_bank add column if not exists verification_source_id uuid references public.content_sources(id);
alter table public.question_bank add column if not exists verified_at timestamptz;
alter table public.question_bank add column if not exists law_version_checked_at timestamptz;

insert into public.content_sources (source_type,title,issuer,url,published_on,status,notes) values
('edital','Edital nº 1 – PF – Policial, atualizado até a Retificação nº 4','Polícia Federal / CEBRASPE','https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf','2025-05-20','vigente','Matriz curricular oficial do concurso PF 2025.'),
('constituicao','Constituição da República Federativa do Brasil de 1988','Presidência da República','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm','1988-10-05','vigente','Usar sempre o texto compilado.'),
('lei','Código Penal – Decreto-Lei nº 2.848/1940','Presidência da República','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm','1940-12-07','vigente','Texto compilado; revisar alterações antes de publicar questões.'),
('lei','Código de Processo Penal – Decreto-Lei nº 3.689/1941','Presidência da República','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm','1941-10-03','vigente','Texto compilado; revisar alterações antes de publicar questões.'),
('lei','Lei nº 14.967/2024 – Estatuto da Segurança Privada','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm','2024-09-09','vigente','Substitui a antiga Lei nº 7.102/1983 no conteúdo atual.'),
('lei','Lei nº 10.357/2001 – Controle de produtos químicos','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10357.htm','2001-12-27','vigente',null),
('lei','Lei nº 13.445/2017 – Lei de Migração','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm','2017-05-24','vigente',null),
('lei','Lei nº 11.343/2006 – Lei de Drogas','Presidência da República','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm','2006-08-23','vigente',null),
('lei','Lei nº 9.455/1997 – Crimes de Tortura','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm','1997-04-07','vigente',null),
('lei','Lei nº 8.069/1990 – Estatuto da Criança e do Adolescente','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm','1990-07-13','vigente',null),
('lei','Lei nº 10.826/2003 – Estatuto do Desarmamento','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm','2003-12-22','vigente',null),
('lei','Lei nº 9.605/1998 – Crimes Ambientais','Presidência da República','https://www.planalto.gov.br/ccivil_03/leis/l9605.htm','1998-02-12','vigente',null)
on conflict (url) do update set checked_at=now(), status=excluded.status, notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Federal','Agente de Polícia Federal',2025,'CEBRASPE',id,'active' from public.content_sources
where url='https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (select id from public.syllabus_editions where contest_name='Polícia Federal' and role_name='Agente de Polícia Federal' and contest_year=2025)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text)
select edition.id, data.block_name, data.discipline, data.topic_order, data.topic_text from edition cross join (values
('Bloco I','Língua Portuguesa',1,'Compreensão e interpretação; tipos e gêneros textuais; ortografia; coesão; tempos e modos verbais.'),
('Bloco I','Língua Portuguesa',2,'Morfossintaxe: classes de palavras, coordenação, subordinação, pontuação, concordância, regência, crase e colocação pronominal.'),
('Bloco I','Língua Portuguesa',3,'Reescrita, significação, substituição e reorganização de textos; redação oficial conforme o Manual da Presidência.'),
('Bloco I','Noções de Direito Administrativo',1,'Organização administrativa; administração direta e indireta; autarquias, fundações, empresas públicas e sociedades de economia mista.'),
('Bloco I','Noções de Direito Administrativo',2,'Atos administrativos; agentes públicos; Lei nº 8.112/1990; cargos, empregos e funções públicas.'),
('Bloco I','Noções de Direito Administrativo',3,'Poderes administrativos; licitações; controle da Administração; responsabilidade civil do Estado; regime jurídico-administrativo.'),
('Bloco I','Noções de Direito Constitucional',1,'Direitos e garantias fundamentais, direitos sociais, nacionalidade, cidadania, direitos políticos e partidos políticos.'),
('Bloco I','Noções de Direito Constitucional',2,'Poder Executivo; defesa do Estado; segurança pública; ordem social, meio ambiente, família, povos indígenas e grupos protegidos.'),
('Bloco I','Direito Penal e Processual Penal',1,'Princípios, aplicação da lei penal, fato típico, consumação, tentativa, ilicitude e causas de exclusão.'),
('Bloco I','Direito Penal e Processual Penal',2,'Crimes contra a pessoa, patrimônio, fé pública e Administração Pública.'),
('Bloco I','Direito Penal e Processual Penal',3,'Inquérito policial: instauração, investigação, indiciamento, garantias e conclusão.'),
('Bloco I','Direito Penal e Processual Penal',4,'Prova penal, preservação do local, nulidades, reconhecimento, acareação, indícios, busca e apreensão; prisão em flagrante.'),
('Bloco I','Direitos Humanos',1,'Direitos humanos na Constituição e sistemas internacionais de proteção.'),
('Bloco I','Direitos Humanos',2,'Convenções sobre genocídio, refugiados, discriminação, tortura e desaparecimento forçado; regras da ONU para pessoas presas.'),
('Bloco I','Direitos Humanos',3,'Uso da força: Lei nº 13.060/2014 e Decreto nº 12.341/2024.'),
('Bloco I','Legislação Especial',1,'Lei nº 14.967/2024; Lei nº 10.357/2001; Lei nº 13.445/2017.'),
('Bloco I','Legislação Especial',2,'Lei nº 11.343/2006; Lei nº 9.455/1997; Lei nº 8.069/1990; Lei nº 10.826/2003; Lei nº 9.605/1998.'),
('Bloco I','Legislação Especial',3,'Lei nº 10.446/2002; Lei nº 13.444/2017; Lei nº 14.534/2023; Lei nº 7.116/1983 e Decreto nº 10.977/2022.'),
('Bloco I','Legislação Especial',4,'Decreto nº 11.797/2023; Lei nº 9.545/1997; Decreto nº 11.491/2023 – Convenção sobre Crime Cibernético.'),
('Bloco I','Estatística',1,'Estatística descritiva e análise exploratória; tabelas, gráficos e medidas de posição, dispersão, assimetria e curtose.'),
('Bloco I','Estatística',2,'Probabilidade, probabilidade condicional, independência, Bayes e probabilidade total; variáveis aleatórias e distribuições.'),
('Bloco I','Estatística',3,'Distribuições uniforme, Bernoulli, binomial e normal; medidas de tendência central e dispersão; correlação de Pearson.'),
('Bloco I','Estatística',4,'Amostragem, teorema central do limite, estimação, testes de hipóteses, regressão linear, análise de variância e resíduos.'),
('Bloco I','Raciocínio Lógico',1,'Estruturas lógicas; argumentação; lógica proposicional; tabelas-verdade; equivalências; Leis de Morgan e diagramas.'),
('Bloco I','Raciocínio Lógico',2,'Lógica de primeira ordem; contagem e probabilidade; conjuntos; problemas aritméticos, geométricos e matriciais.'),
('Bloco II','Informática',1,'Internet, intranet, navegação, correio, busca, sistemas operacionais, acesso remoto, arquivos, edição de textos, planilhas e apresentações.'),
('Bloco II','Informática',2,'Redes, OSI/TCP-IP, IPv4/IPv6, Ethernet, TCP, UDP, DNS, DHCP, SNMP, VPN, TLS e redes sem fio.'),
('Bloco II','Informática',3,'Segurança, malwares, antivírus, firewall, MFA, criptografia, hash e assinaturas digitais.'),
('Bloco II','Informática',4,'Sistemas de informação, bancos de dados, SQL, modelagem, mineração, aprendizado de máquina, Big Data e análise de dados.'),
('Bloco II','Informática',5,'Python e R; APIs; ETL/ELT; metadados; formatos NIST, XML e JSON; IA e computação em nuvem.'),
('Bloco III','Contabilidade Geral',1,'Conceitos e finalidades; patrimônio; atos e fatos; contas; plano de contas; escrituração e regimes contábeis.'),
('Bloco III','Contabilidade Geral',2,'Operações contábeis, balancete, balanço patrimonial e demonstração do resultado.'),
('Bloco III','Contabilidade Geral',3,'Lei nº 6.404/1976, pronunciamentos CPC e NBC TSP Estrutura Conceitual.')
) as data(block_name,discipline,topic_order,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text,content_status='current';

update public.question_bank q set
  content_status='active',
  verification_source_id=s.id,
  verified_at=now()
from public.content_sources s
where s.source_type='edital'
  and s.url='https://cdn.cebraspe.org.br/concursos/PF_25/arquivos/Ed_1_PF_25_Abertura_Atualizado_ate_ret_4.pdf'
  and q.subject in ('Estatística','Raciocínio Lógico-Matemático');

create index if not exists idx_syllabus_topics_edition on public.syllabus_topics(edition_id,discipline);
create index if not exists idx_question_bank_content_status on public.question_bank(content_status);
