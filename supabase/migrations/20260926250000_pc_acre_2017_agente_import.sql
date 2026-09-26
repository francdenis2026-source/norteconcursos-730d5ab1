-- Official Polícia Civil do Acre (PC-AC) 2017 exam import, cargo: Agente de
-- Polícia Civil (Edital nº 001/2017 - Governo do Estado do Acre / SEPC, banca
-- IBADE, aplicação 7/5/2017, caderno S01 - Versão V). 80 itens objetivos de
-- múltipla escolha (A-E, sem marcação negativa), com pontuação ponderada por
-- disciplina conforme a capa da prova do candidato:
--   Língua Portuguesa (1-10): 1 pt/questão (10 pts)
--   Noções de Informática (11-15): 1 pt/questão (5 pts)
--   Raciocínio Lógico (16-20): 1 pt/questão (5 pts)
--   Noções de Direito Administrativo (21-30): 1 pt/questão (10 pts)
--   Noções de Direito Constitucional (31-40): 1 pt/questão (10 pts)
--   Noções de Direito Penal (41-50): 2 pt/questão (20 pts)
--   Noções de Direito Processual Penal (51-60): 2 pt/questão (20 pts)
--   Legislação de Direito Penal e Processual Penal Especial (61-70): 1 pt/questão (10 pts)
--   Noções de Medicina Legal (71-80): 1 pt/questão (10 pts)
--   TOTAL: 100 pontos
--
-- Gabarito oficial ("Gabarito Final da Prova Objetiva", banca IBADE) localizado via
-- mirror do qconcursos.com (antigo.ibade.org.br está inacessível):
-- https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf
-- Este documento publica o gabarito separadamente para cada versão do caderno
-- (S01-T/V/W/X e demais cargos). Conferido: o código do caderno do candidato
-- (S01 V) corresponde exatamente à seção "Prova: V" desse PDF — usado aqui.
--
-- IMPORTANTE (transparência): o texto verbatim das 80 questões da VERSÃO V não
-- foi localizado nesta sessão — o PDF de prova disponível no qconcursos é da
-- versão T (mesmo enunciado provável, mas ordem das alternativas embaralhada
-- entre versões pela banca IBADE, então não é seguro reaproveitar o texto sem
-- confirmar). Por isso, question_text fica como placeholder explícito e
-- content_status='under_review' — nunca deve ser exibido como questão ativa
-- até a transcrição verbatim da versão V ser confirmada.
alter table public.official_exam_questions drop constraint if exists official_exam_questions_official_answer_check;
alter table public.official_exam_questions add constraint official_exam_questions_official_answer_check
  check (official_answer in ('A','B','C','D','E','X'));

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('edital','Edital nº 001/2017 - Governo do Estado do Acre/SEPC, Polícia Civil do Acre','Governo do Estado do Acre / SEPC / IBADE','https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf','vigente','Gabarito Final da Prova Objetiva, banca IBADE, cargo Agente de Polícia Civil, caderno S01, todas as versões (T/V/W/X). Consultado via mirror qconcursos.com pois antigo.ibade.org.br está inacessível (conexão recusada). Versão V confirmada como a do caderno do candidato.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Civil do Acre','Agente de Polícia Civil',2017,'IBADE',id,'active'
from public.content_sources where url='https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Civil do Acre' and role_name='Agente de Polícia Civil' and contest_year=2017
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Histórico 2017',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Compreensão de texto, sintaxe, semântica, coesão e pontuação.'),
  ('Noções de Informática','Windows, Office, Internet, malware e backup.'),
  ('Raciocínio Lógico','Lógica proposicional, sequências e problemas de raciocínio.'),
  ('Noções de Direito Administrativo','Princípios, atos e poderes administrativos, licitações e servidores públicos.'),
  ('Noções de Direito Constitucional','Direitos e garantias fundamentais, organização do Estado e segurança pública.'),
  ('Noções de Direito Penal','Parte geral e especial do Código Penal.'),
  ('Noções de Direito Processual Penal','Inquérito policial, prisões e procedimentos do CPP.'),
  ('Legislação de Direito Penal e Processual Penal Especial','Leis penais e processuais especiais.'),
  ('Noções de Medicina Legal','Tanatologia, traumatologia e perícia médico-legal.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;

with src as (select id from public.content_sources where url='https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Civil do Acre' and role_name='Agente de Polícia Civil' and contest_year=2017),
topic_map(item_from,item_to,discipline) as (values
  (1,10,'Língua Portuguesa'),(11,15,'Noções de Informática'),(16,20,'Raciocínio Lógico'),
  (21,30,'Noções de Direito Administrativo'),(31,40,'Noções de Direito Constitucional'),
  (41,50,'Noções de Direito Penal'),(51,60,'Noções de Direito Processual Penal'),
  (61,70,'Legislação de Direito Penal e Processual Penal Especial'),(71,80,'Noções de Medicina Legal')
),
gabarito(item_number,official_answer) as (values
(1,'C'),(2,'A'),(3,'C'),(4,'A'),(5,'E'),(6,'D'),(7,'C'),(8,'A'),(9,'A'),(10,'D'),
(11,'B'),(12,'A'),(13,'A'),(14,'D'),(15,'A'),
(16,'B'),(17,'A'),(18,'A'),(19,'B'),(20,'E'),
(21,'A'),(22,'D'),(23,'E'),(24,'C'),(25,'E'),(26,'X'),(27,'E'),(28,'C'),(29,'A'),(30,'B'),
(31,'E'),(32,'B'),(33,'B'),(34,'E'),(35,'A'),(36,'C'),(37,'E'),(38,'A'),(39,'C'),(40,'D'),
(41,'B'),(42,'B'),(43,'D'),(44,'A'),(45,'B'),(46,'C'),(47,'C'),(48,'B'),(49,'E'),(50,'C'),
(51,'D'),(52,'C'),(53,'D'),(54,'C'),(55,'C'),(56,'C'),(57,'C'),(58,'C'),(59,'B'),(60,'B'),
(61,'E'),(62,'C'),(63,'B'),(64,'A'),(65,'B'),(66,'C'),(67,'B'),(68,'B'),(69,'D'),(70,'B'),
(71,'C'),(72,'D'),(73,'E'),(74,'D'),(75,'B'),(76,'A'),(77,'D'),(78,'D'),(79,'A'),(80,'D')
)
insert into public.official_exam_questions
  (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,
   item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,
   legal_review_required,context_review_required,legal_basis,review_note)
select
  src.id, src.id, t.id, 'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE',
  gabarito.item_number,
  coalesce(tm.discipline,'Geral'),
  '[TEXTO VERBATIM DA VERSÃO V AINDA NÃO CONFIRMADO — apenas o gabarito oficial foi localizado nesta sessão; a prova disponível publicamente (qconcursos) é da versão T, com ordem de alternativas diferente da versão V do candidato. Não exibir como questão ativa até a transcrição verbatim ser confirmada.]',
  '[TEXTO VERBATIM DA VERSÃO V AINDA NÃO CONFIRMADO — apenas o gabarito oficial foi localizado nesta sessão; a prova disponível publicamente (qconcursos) é da versão T, com ordem de alternativas diferente da versão V do candidato. Não exibir como questão ativa até a transcrição verbatim ser confirmada.]',
  gabarito.official_answer, null,
  case when gabarito.official_answer='X' then 'annulled' else 'under_review' end,
  true, true, '[]'::jsonb,
  case when gabarito.official_answer='X'
    then 'Item anulado no gabarito oficial (legenda "Questão Anulada" no documento da banca); não deve ser exibido aos estudantes.'
    else 'Apenas o gabarito oficial (resposta correta) foi confirmado nesta sessão, no "Gabarito Final da Prova Objetiva" da banca IBADE, seção "Prova: V". Texto da questão ainda pendente de transcrição verbatim da versão V — content_status permanece under_review até então.'
  end
from gabarito
cross join src
cross join edition
join topic_map tm on gabarito.item_number between tm.item_from and tm.item_to
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=coalesce(tm.discipline,'Geral')
on conflict (exam_year,item_number) do update set
  official_answer=excluded.official_answer, content_status=excluded.content_status, review_note=excluded.review_note;

-- Student's own graded attempt (Franc Denis, CPF 69598193268), caderno S01 -
-- Versão V. Todos os 80 itens confrontados item a item com o gabarito oficial.
-- 1 anulada (item 26, conta como acerto para todos). IBADE, assim como a
-- IBFC, não aplica marcação negativa — pontuação é ponderada por disciplina,
-- não é contagem simples de acertos.
-- Recomputado por disciplina (pontos, não nº de acertos, exceto onde 1pt=1acerto):
--   Língua Portuguesa (1-10): 2 corretas = 2 pts (acertos: 1,10)
--   Noções de Informática (11-15): 5 corretas = 5 pts
--   Raciocínio Lógico (16-20): 1 correta = 1 pt (acerto: 16)
--   Direito Administrativo (21-30): 5 corretas (21,24,26*anulada,28,30) = 5 pts
--   Direito Constitucional (31-40): 5 corretas (31,33,34,36,39) = 5 pts
--   Direito Penal (41-50): 4 corretas x2 (46,47,49,50) = 8 pts
--   Direito Processual Penal (51-60): 6 corretas x2 (51,52,55,56,58,60) = 12 pts
--   Legislação Penal/Proc. Especial (61-70): 5 corretas (65,66,67,68,70) = 5 pts
--   Medicina Legal (71-80): 8 corretas (72,73,74,75,76,78,79,80) = 8 pts
--   TOTAL: 51 de 100 pontos. 41 acertos brutos (incluindo a anulada) de 80, 39 erros, 0 em branco.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,score_raw,extracted_data,notes)
select u.id,'Polícia Civil do Acre','2017','IBADE','resultado',
  'PC_Acre_2017_resultado_franc_denis.txt','manual-entry/pc-acre-2017-franc-denis',
  41, 39, 0, 51, 51,
  '{
    "method": "respostas informadas pelo próprio candidato, confrontadas item a item com o Gabarito Final da Prova Objetiva oficial da banca IBADE (seção Prova: V), e pontuadas conforme a tabela de pesos por disciplina da capa da prova",
    "escala_oficial": "0 a 100 pontos (soma ponderada por disciplina)",
    "pontuacao_obtida": {
      "lingua_portuguesa": {"corretas": 2, "de": 10, "pontos": 2},
      "informatica": {"corretas": 5, "de": 5, "pontos": 5},
      "raciocinio_logico": {"corretas": 1, "de": 5, "pontos": 1},
      "direito_administrativo": {"corretas": 5, "de": 10, "pontos": 5},
      "direito_constitucional": {"corretas": 5, "de": 10, "pontos": 5},
      "direito_penal": {"corretas": 4, "de": 10, "pontos": 8},
      "direito_processual_penal": {"corretas": 6, "de": 10, "pontos": 12},
      "legislacao_penal_especial": {"corretas": 5, "de": 10, "pontos": 5},
      "medicina_legal": {"corretas": 8, "de": 10, "pontos": 8},
      "total": 51
    },
    "items": {
      "1":"correta","2":"errada","3":"errada","4":"errada","5":"errada","6":"errada","7":"errada","8":"errada","9":"errada","10":"correta",
      "11":"correta","12":"correta","13":"correta","14":"correta","15":"correta",
      "16":"correta","17":"errada","18":"errada","19":"errada","20":"errada",
      "21":"correta","22":"errada","23":"errada","24":"correta","25":"errada","26":"anulada","27":"errada","28":"correta","29":"errada","30":"correta",
      "31":"correta","32":"errada","33":"correta","34":"correta","35":"errada","36":"correta","37":"errada","38":"errada","39":"correta","40":"errada",
      "41":"errada","42":"errada","43":"errada","44":"errada","45":"errada","46":"correta","47":"correta","48":"errada","49":"correta","50":"correta",
      "51":"correta","52":"correta","53":"errada","54":"errada","55":"correta","56":"correta","57":"errada","58":"correta","59":"errada","60":"correta",
      "61":"errada","62":"errada","63":"errada","64":"errada","65":"correta","66":"correta","67":"correta","68":"correta","69":"errada","70":"correta",
      "71":"errada","72":"correta","73":"correta","74":"correta","75":"correta","76":"correta","77":"errada","78":"correta","79":"correta","80":"correta"
    }
  }'::jsonb,
  'Prova IBADE (múltipla escolha A-E, sem marcação negativa), caderno S01 - Versão V. Pontuação ponderada por disciplina conforme capa da prova (Direito Penal e Direito Processual Penal valem 2 pts/questão; as demais 1 pt/questão), escala 0-100. Resultado: Língua Portuguesa 2/10, Informática 5/5, Raciocínio Lógico 1/5, Direito Administrativo 5/10, Direito Constitucional 5/10, Direito Penal 4/10 (8 pts), Direito Processual Penal 6/10 (12 pts), Legislação Penal Especial 5/10, Medicina Legal 8/10. TOTAL: 51/100 pontos. Item 26 anulado (conta como acerto). Nota de corte oficial ainda não localizada nesta sessão — não é possível afirmar classificação sem essa referência.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

insert into public.contest_reference_info (contest_name,contest_year,exam_board,cutoff_score,scoring_rule,source_url,notes) values
('Polícia Civil do Acre','2017','IBADE',null,'Pontuação ponderada por disciplina (Direito Penal e Direito Processual Penal valem 2 pts/questão; demais 1 pt/questão), total 0-100.',null,'NÃO LOCALIZADO com confiança nesta sessão — antigo.ibade.org.br (fonte oficial) está inacessível e a busca na web não retornou o resultado final/classificação consolidada para o cargo de Agente de Polícia Civil do Edital nº 001/2017. Precisa de verificação no Diário Oficial do Estado do Acre.')
on conflict (contest_name, contest_year) do update set
  exam_board = excluded.exam_board,
  scoring_rule = excluded.scoring_rule,
  notes = excluded.notes;

create index if not exists idx_official_exam_questions_pcacre2017
  on public.official_exam_questions(contest_name,exam_year) where contest_name='Polícia Civil do Acre';
