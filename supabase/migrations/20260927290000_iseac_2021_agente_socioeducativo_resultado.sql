-- First personal gabarito result for ISE-AC 2021 (Agente Socioeducativo -
-- Masculino, cargo M01, caderno Tipo Z, matching the candidate's own
-- booklet already in storage). No official_exam_questions rows existed for
-- this contest before this session (0 acertos/0 erros shown in the panel).
--
-- Official gabarito sourced from IBADE's official "Gabarito Final da Prova
-- Objetiva" (https://ibade.org.br/wp-content/uploads/2026/05/Gabarito-da-
-- Prova-Objetiva-IBADE-17.pdf, page 3/21 — Cargo M01, Prova Z), matching the
-- candidate's own caderno version. 3 annulled items for this version:
-- 11, 22, 71 (Legenda: "Questão Anulada").
--
-- Scoring rule confirmed directly in Edital nº 001 SEPLAG/ISE, de 04/10/2021
-- (item 8.5): all 100 questions worth 1 point each (10 Língua Portuguesa +
-- 10 Raciocínio Lógico Quantitativo + 10 História e Geografia do Acre + 10
-- Atualidades + 60 Conhecimentos Específicos = 100 pts total), NO negative
-- marking for wrong answers (item 8.9: unmarked/double-marked/erased = 0,
-- not negative). Elimination (item 8.6): candidate needs at least 50 points
-- overall AND a non-zero score in every discipline.
--
-- Result: 83 corretas (incl. 3 anuladas), 17 erradas. SCORE: 83/100.
-- Well above the 50-point elimination floor, and non-zero in every
-- discipline, so the candidate clears the objective-test elimination
-- criteria (item 8.6) on both counts. Whether he actually made the cutoff
-- position (532ª ampla concorrência for M01) is not determined here — would
-- require the candidate ranking list, which was not part of this check.
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, file_name, storage_path,
   correct_count, wrong_count, blank_count, score_net, score_raw, extracted_data, notes)
select
  u.id,
  'Instituto Socioeducativo do Estado do Acre - Agente Socioeducativo',
  '2021',
  'IBADE',
  'resultado',
  'ISEAC_2021_resultado_franc_denis.txt',
  'manual-entry/iseac-2021-agente-socioeducativo-franc-denis',
  83,
  17,
  0,
  83,
  83,
  jsonb_build_object(
      'method', 'gabarito pessoal do candidato confrontado item a item com o Gabarito Final da Prova Objetiva oficial do IBADE (Cargo M01, Prova Z), pontuado conforme a fórmula do Edital nº 001 SEPLAG/ISE (item 8.5): 1 ponto por questão, sem desconto por erro.',
      'items', '{
        "1":"errada","2":"correta","3":"errada","4":"errada","5":"errada","6":"correta","7":"correta","8":"correta","9":"correta","10":"correta",
        "11":"anulada","12":"correta","13":"correta","14":"correta","15":"correta","16":"errada","17":"errada","18":"correta","19":"correta","20":"errada",
        "21":"correta","22":"anulada","23":"errada","24":"correta","25":"correta","26":"errada","27":"correta","28":"correta","29":"correta","30":"errada",
        "31":"correta","32":"correta","33":"correta","34":"errada","35":"correta","36":"correta","37":"correta","38":"correta","39":"correta","40":"correta",
        "41":"correta","42":"correta","43":"correta","44":"correta","45":"correta","46":"correta","47":"correta","48":"correta","49":"correta","50":"errada",
        "51":"correta","52":"correta","53":"correta","54":"correta","55":"correta","56":"correta","57":"correta","58":"correta","59":"correta","60":"correta",
        "61":"errada","62":"errada","63":"correta","64":"correta","65":"correta","66":"correta","67":"correta","68":"correta","69":"errada","70":"correta",
        "71":"anulada","72":"correta","73":"correta","74":"correta","75":"correta","76":"correta","77":"errada","78":"correta","79":"correta","80":"correta",
        "81":"correta","82":"correta","83":"correta","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta","89":"errada","90":"correta",
        "91":"correta","92":"correta","93":"correta","94":"correta","95":"correta","96":"correta","97":"correta","98":"correta","99":"correta","100":"correta"
      }'::jsonb,
      'candidate_answers', '{
        "1":"E","2":"A","3":"B","4":"E","5":"E","6":"E","7":"B","8":"D","9":"C","10":"A",
        "11":"C","12":"E","13":"C","14":"D","15":"E","16":"B","17":"B","18":"E","19":"C","20":"B",
        "21":"B","22":"E","23":"D","24":"C","25":"D","26":"A","27":"A","28":"B","29":"B","30":"C",
        "31":"D","32":"B","33":"B","34":"E","35":"A","36":"D","37":"E","38":"B","39":"A","40":"A",
        "41":"A","42":"D","43":"B","44":"E","45":"B","46":"E","47":"B","48":"C","49":"C","50":"A",
        "51":"E","52":"C","53":"B","54":"D","55":"C","56":"D","57":"B","58":"A","59":"E","60":"D",
        "61":"B","62":"E","63":"B","64":"A","65":"A","66":"E","67":"B","68":"C","69":"A","70":"B",
        "71":"B","72":"A","73":"D","74":"C","75":"C","76":"A","77":"A","78":"C","79":"A","80":"D",
        "81":"D","82":"E","83":"B","84":"D","85":"E","86":"E","87":"B","88":"C","89":"B","90":"C",
        "91":"A","92":"D","93":"C","94":"A","95":"A","96":"C","97":"E","98":"A","99":"B","100":"C"
      }'::jsonb,
      'by_subject', jsonb_build_object(
        'Língua Portuguesa', jsonb_build_object('total',10,'correct',6,'wrong',4,'annulled',0,'blank',0),
        'Raciocínio Lógico Quantitativo', jsonb_build_object('total',10,'correct',7,'wrong',3,'annulled',1,'blank',0),
        'História e Geografia do Acre', jsonb_build_object('total',10,'correct',7,'wrong',3,'annulled',1,'blank',0),
        'Atualidades', jsonb_build_object('total',10,'correct',9,'wrong',1,'annulled',0,'blank',0),
        'Conhecimentos Específicos', jsonb_build_object('total',60,'correct',54,'wrong',6,'annulled',1,'blank',0)
      ),
      'criterio_eliminatorio', jsonb_build_object(
        'minimo_geral_exigido', 50,
        'obtido', 83,
        'zerou_alguma_disciplina', false,
        'passou_no_criterio_objetivo', true,
        'observacao', 'Posicionamento dentro da faixa de vagas (532ª ampla concorrência para M01) não verificado nesta análise — depende da lista de classificação de todos os candidatos.'
      )
    ),
  'Gabarito oficial obtido em ibade.org.br (Gabarito Final da Prova Objetiva, Cargo M01 - Agente Socioeducativo Masculino, Prova Z — mesma versão do caderno do candidato). Regra de pontuação confirmada no Edital nº 001 SEPLAG/ISE de 04/10/2021, item 8.5: 1 ponto por questão em todas as disciplinas (Língua Portuguesa, Raciocínio Lógico Quantitativo, História e Geografia do Acre, Atualidades = 10 pts cada; Conhecimentos Específicos = 60 pts), sem desconto por erro (item 8.9). Resultado: 83 corretas (incluindo 3 anuladas: itens 11, 22, 71), 17 erradas. SCORE: 83/100. Passa no critério eliminatório do item 8.6 (mínimo 50 pontos gerais e não pode zerar nenhuma disciplina) com folga.'
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;
