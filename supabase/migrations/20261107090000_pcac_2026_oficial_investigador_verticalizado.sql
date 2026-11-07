-- PC-AC 2026: matriz oficial do cargo Oficial Investigador de Polícia.
-- Fonte: Edital nº 001/2026 – SEAD/PCAC, publicado no DOE/AC em 06/11/2026.
insert into public.content_sources (source_type, title, issuer, url, published_on, status, notes)
values (
  'edital',
  'Edital nº 001/2026 – SEAD/PCAC – Oficial Investigador de Polícia',
  'Secretaria de Estado de Administração / Polícia Civil do Estado do Acre / IDECAN',
  'https://www.diario.ac.gov.br/',
  '2026-11-06',
  'vigente',
  'Edital oficial enviado para conferência. Prova objetiva: 100 questões; 24 básicas, 16 jurídicas e 60 específicas com peso 2, total de 160 pontos. Prova discursiva: redação sobre conhecimentos específicos, de 20 a 30 linhas, valendo 40 pontos. Oficial Investigador: 74 vagas, distribuídas por município: Acrelândia 3, Assis Brasil 6 (1 PcD), Capixaba 2, Epitaciolândia 3, Feijó 3, Jordão 4, Mâncio Lima 2, Manoel Urbano 8 (1 PcD), Marechal Thaumaturgo 5 (1 PcD), Plácido de Castro 6 (1 PcD), Porto Acre 2, Porto Walter 4, Rodrigues Alves 2, Santa Rosa do Purus 5 (1 PcD), Sena Madureira 8 (1 PcD), Tarauacá 9 (1 PcD) e Xapuri 2. Etapas: objetiva, discursiva, títulos, aptidão física, psicotécnico, exame médico/toxicológico e investigação criminal/social.'
)
on conflict (url) do update set title=excluded.title, issuer=excluded.issuer, published_on=excluded.published_on, status=excluded.status, notes=excluded.notes, checked_at=now();

insert into public.syllabus_editions (contest_name, role_name, contest_year, exam_board, source_id, status)
select 'Polícia Civil do Acre', 'Oficial Investigador de Polícia', 2026, 'IDECAN', id, 'active'
from public.content_sources where title='Edital nº 001/2026 – SEAD/PCAC – Oficial Investigador de Polícia'
on conflict (contest_name, role_name, contest_year) do update set source_id=excluded.source_id, exam_board=excluded.exam_board, status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Civil do Acre' and role_name='Oficial Investigador de Polícia' and contest_year=2026
)
insert into public.syllabus_topics (edition_id, block_name, discipline, topic_order, topic_text)
select edition.id, v.block_name, v.discipline, v.topic_order, v.topic_text
from edition cross join (values
  ('Conhecimentos básicos','Língua Portuguesa',1,'Compreensão e interpretação; gêneros textuais; coesão, coerência, reescrita, significação, ortografia, acentuação, pontuação, morfologia, sintaxe, concordância, regência, colocação pronominal, crase, variação linguística e linguagem digital.'),
  ('Conhecimentos básicos','Raciocínio Lógico',1,'Proposições, conectivos, tabelas-verdade, equivalências, negações, argumentos, verdades e mentiras, sequências, progressões, conjuntos, porcentagem, juros, combinatória, probabilidade, médias e gráficos.'),
  ('Conhecimentos básicos','Noções de Informática',1,'Windows 11 e Linux Ubuntu; Word/Writer; Excel/Calc; PowerPoint/Impress; internet, navegadores, e-mail, nuvem, sistemas de informação, bancos de dados, permissões, autenticação e segurança.'),
  ('Conhecimentos básicos','Realidade do Estado do Acre',1,'História, geografia, formação social, povos indígenas, cultura, política, economia, municípios, regionais, fronteiras, infraestrutura, desenvolvimento sustentável e segurança pública do Acre.'),
  ('Conhecimentos jurídicos','Noções de Direito Constitucional',1,'Princípios fundamentais; direitos e garantias; remédios constitucionais; Administração Pública e servidores (arts. 37 a 41); segurança pública (art. 144); Constituição do Estado do Acre e Polícia Civil.'),
  ('Conhecimentos jurídicos','Noções de Direito Administrativo',1,'Princípios; Administração direta e indireta; centralização, descentralização e desconcentração; poderes administrativos; poder de polícia; atos, agentes públicos, responsabilidade civil e improbidade administrativa atualizada.'),
  ('Conhecimentos jurídicos','Noções de Direito Penal e Processual Penal',1,'Aplicação da lei penal; teoria do crime; crimes contra pessoa, patrimônio, dignidade sexual, mortos, fé pública e Administração; tortura; abuso de autoridade; inquérito, provas, cadeia de custódia, identificação criminal, prisões e cautelares.'),
  ('Conhecimentos jurídicos','Legislação Institucional',1,'Lei Federal nº 14.735/2023; LC Estadual nº 129/2004; Lei Estadual nº 2.250/2009; LC Estadual nº 39/1993, nos dispositivos aplicáveis ao cargo.'),
  ('Conhecimentos específicos','Contabilidade Geral e Análise Financeira',1,'Patrimônio, contas, escrituração, partidas dobradas, balancete, demonstrações, regimes, matemática financeira, operações bancárias, PIX/TED e análise de movimentações financeiras.'),
  ('Conhecimentos específicos','Estatística',1,'Estatística descritiva e inferencial; população e amostra; frequências, tabelas, gráficos, média, mediana, moda, dispersão, quartis, probabilidade, correlação, regressão, séries temporais e outliers.'),
  ('Conhecimentos específicos','Arquivologia',1,'Princípios arquivísticos, classificação, ciclo de vida, gestão documental, protocolo, arquivamento, avaliação, temporalidade, conservação, documentos digitais, metadados, autenticidade e controle de acesso.'),
  ('Conhecimentos específicos','Tecnologia da Informação e Segurança da Informação',1,'Sistemas, dados, arquivos, planilhas, bancos de dados, redes, IP, protocolos, confidencialidade, integridade, disponibilidade, autenticação, criptografia, backups, metadados e tratamento de informações digitais.'),
  ('Conhecimentos específicos','Análise de Dados e Informações',1,'Qualidade e organização de dados; cruzamento de registros; padrões; análise temporal, de vínculos, comunicações e geográfica; hipóteses, inconsistências, relatórios, visualizações, rastreabilidade e proteção de informações.'),
  ('Conhecimentos específicos','Noções de Administração',1,'Funções administrativas; eficiência, eficácia e efetividade; estruturas; trabalho em equipe; processos; gestão do tempo; informação e conhecimento; recursos materiais; atendimento, ética e sigilo.')
) as v(block_name, discipline, topic_order, topic_text)
on conflict (edition_id, discipline, topic_order) do update set block_name=excluded.block_name, topic_text=excluded.topic_text, content_status='current';
