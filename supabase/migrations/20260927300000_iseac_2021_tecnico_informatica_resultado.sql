-- First personal gabarito result for ISE-AC 2021 (Técnico Administrativo e
-- Operacional - Técnico de Informática, cargo M05, caderno Tipo X, matching
-- the candidate's own booklet, applied in the afternoon per the candidate).
--
-- Official gabarito from the same IBADE PDF used for the Agente
-- Socioeducativo result (20260927290000): "Gabarito Final da Prova
-- Objetiva" (https://ibade.org.br/wp-content/uploads/2026/05/Gabarito-da-
-- Prova-Objetiva-IBADE-17.pdf, page 13/21 — Cargo M05, Prova X). 5 annulled
-- items for this version: 2, 12, 13, 26, 98.
--
-- Same scoring rule as M01 (Edital nº 001 SEPLAG/ISE, item 8.5): all 100
-- questions worth 1 point each (10 Língua Portuguesa + 10 Raciocínio Lógico
-- Quantitativo + 10 História e Geografia do Acre + 10 Atualidades + 60
-- Conhecimentos Específicos = 100 pts total), no negative marking.
-- Elimination (item 8.6): at least 50 points overall AND non-zero in every
-- discipline.
--
-- Result: 75 corretas (incl. 5 anuladas), 25 erradas. SCORE: 75/100.
-- Clears the elimination floor (>=50) and no discipline scored zero.
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, file_name, storage_path,
   correct_count, wrong_count, blank_count, score_net, score_raw, extracted_data, notes)
select
  u.id,
  'Instituto Socioeducativo do Estado do Acre - Técnico de Informática',
  '2021',
  'IBADE',
  'resultado',
  'ISEAC_2021_tecnico_informatica_resultado_franc_denis.txt',
  'manual-entry/iseac-2021-tecnico-informatica-franc-denis',
  75,
  25,
  0,
  75,
  75,
  jsonb_build_object(
      'method', 'gabarito pessoal do candidato confrontado item a item com o Gabarito Final da Prova Objetiva oficial do IBADE (Cargo M05, Prova X), pontuado conforme a fórmula do Edital nº 001 SEPLAG/ISE (item 8.5): 1 ponto por questão, sem desconto por erro.',
      'items', '{
        "1":"correta","2":"anulada","3":"correta","4":"errada","5":"errada","6":"correta","7":"correta","8":"correta","9":"errada","10":"errada",
        "11":"errada","12":"anulada","13":"anulada","14":"errada","15":"errada","16":"errada","17":"correta","18":"errada","19":"errada","20":"errada",
        "21":"correta","22":"correta","23":"correta","24":"correta","25":"correta","26":"anulada","27":"correta","28":"errada","29":"correta","30":"correta",
        "31":"correta","32":"correta","33":"correta","34":"correta","35":"correta","36":"correta","37":"correta","38":"correta","39":"correta","40":"correta",
        "41":"correta","42":"correta","43":"correta","44":"correta","45":"correta","46":"correta","47":"correta","48":"correta","49":"correta","50":"correta",
        "51":"errada","52":"correta","53":"correta","54":"correta","55":"correta","56":"correta","57":"correta","58":"correta","59":"correta","60":"correta",
        "61":"correta","62":"correta","63":"correta","64":"correta","65":"errada","66":"correta","67":"correta","68":"errada","69":"correta","70":"correta",
        "71":"correta","72":"correta","73":"correta","74":"errada","75":"errada","76":"correta","77":"correta","78":"correta","79":"correta","80":"errada",
        "81":"errada","82":"errada","83":"correta","84":"errada","85":"correta","86":"correta","87":"errada","88":"correta","89":"errada","90":"correta",
        "91":"correta","92":"correta","93":"correta","94":"errada","95":"correta","96":"correta","97":"errada","98":"anulada","99":"correta","100":"correta"
      }'::jsonb,
      'candidate_answers', '{
        "1":"B","2":"D","3":"D","4":"A","5":"A","6":"D","7":"E","8":"A","9":"A","10":"A",
        "11":"B","12":"A","13":"C","14":"B","15":"C","16":"B","17":"B","18":"B","19":"D","20":"D",
        "21":"D","22":"E","23":"D","24":"B","25":"A","26":"B","27":"A","28":"B","29":"A","30":"B",
        "31":"D","32":"D","33":"B","34":"C","35":"E","36":"A","37":"C","38":"D","39":"A","40":"E",
        "41":"C","42":"B","43":"E","44":"A","45":"C","46":"B","47":"D","48":"C","49":"A","50":"B",
        "51":"C","52":"E","53":"A","54":"D","55":"A","56":"B","57":"C","58":"A","59":"A","60":"B",
        "61":"E","62":"A","63":"C","64":"A","65":"E","66":"B","67":"C","68":"C","69":"E","70":"A",
        "71":"C","72":"E","73":"D","74":"A","75":"A","76":"D","77":"C","78":"A","79":"E","80":"B",
        "81":"C","82":"C","83":"B","84":"B","85":"C","86":"A","87":"D","88":"A","89":"B","90":"B",
        "91":"E","92":"A","93":"C","94":"D","95":"D","96":"C","97":"B","98":"B","99":"A","100":"B"
      }'::jsonb,
      'by_subject', jsonb_build_object(
        'Língua Portuguesa', jsonb_build_object('total',10,'correct',6,'wrong',4,'annulled',1,'blank',0),
        'Raciocínio Lógico Quantitativo', jsonb_build_object('total',10,'correct',3,'wrong',7,'annulled',2,'blank',0),
        'História e Geografia do Acre', jsonb_build_object('total',10,'correct',9,'wrong',1,'annulled',1,'blank',0),
        'Atualidades', jsonb_build_object('total',10,'correct',10,'wrong',0,'annulled',0,'blank',0),
        'Conhecimentos Específicos', jsonb_build_object('total',60,'correct',47,'wrong',13,'annulled',1,'blank',0)
      ),
      'criterio_eliminatorio', jsonb_build_object(
        'minimo_geral_exigido', 50,
        'obtido', 75,
        'zerou_alguma_disciplina', false,
        'passou_no_criterio_objetivo', true,
        'observacao', 'Posicionamento dentro da faixa de vagas (28ª ampla concorrência para M05) não verificado nesta análise — depende da lista de classificação de todos os candidatos.'
      )
    ),
  'Gabarito oficial obtido em ibade.org.br (Gabarito Final da Prova Objetiva, Cargo M05 - Técnico Administrativo e Operacional - Técnico de Informática, Prova X — mesma versão do caderno do candidato). Mesma regra de pontuação do Edital nº 001 SEPLAG/ISE usada para M01: 1 ponto por questão em todas as disciplinas, sem desconto por erro. Resultado: 75 corretas (incluindo 5 anuladas: itens 2, 12, 13, 26, 98), 25 erradas. SCORE: 75/100. Passa no critério eliminatório do item 8.6. Pior desempenho: Raciocínio Lógico Quantitativo (3/10, com 2 anuladas ajudando).'
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;
