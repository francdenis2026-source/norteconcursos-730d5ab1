-- First personal gabarito result for SEFAZ/AC 2023 (Especialista da Fazenda
-- Estadual, Cargo 3). This exam board (CEBRASPE) applied here is DIFFERENT
-- from the standard PF/PRF/DEPEN "Certo/Errado com desconto" format the
-- candidate asked to double-check: this is a 5-alternative (A-E) multiple
-- choice, WITHOUT negative marking for wrong answers, confirmed directly in
-- Edital nº 001 SEAD/SEFAZ (13/12/2023), item 8.11.2.1: "1,00 ponto, caso a
-- resposta do candidato esteja em concordância com o gabarito oficial
-- definitivo... 0,00 ponto, caso... discorde, não haja marcação ou haja
-- mais de uma marcação." Item 8.1: 60,00 pontos totais para o Cargo 3 (30
-- Conhecimentos Gerais P1 + 30 Conhecimentos Específicos P2, 1 pt/questão).
-- Elimination (item 8.11.5): reprovado se nota < 15 em P1 OU < 15 em P2.
--
-- CRITICAL FINDING: this exam shuffles the A-E alternative order PER
-- CANDIDATE (unlike the PF/PRF/DEPEN CEBRASPE exams, which use a single
-- fixed caderno). Confirmed by comparing the candidate's own booklet photos
-- against the official reference content PDFs (cdn.cebraspe.org.br,
-- "946_SEFAZ_AC_CG2_01.PDF" for Gerais/Contador+Especialista and
-- "946_SEFAZ_AC_003_01.PDF" for Específicos/Especialista) item by item: same
-- question text, same 5 statements, different lettering per version. A
-- direct letter-to-letter comparison against the officially published
-- gabarito (which refers to ONE reference ordering) is therefore invalid.
--
-- Methodology: for all 60 items, matched the full TEXT of each alternative
-- between (a) the official reference PDF (which the official gabarito
-- letters refer to) and (b) the candidate's own booklet photo, to translate
-- the officially-correct content into the candidate's own lettering, then
-- compared against his actually submitted answer for that item.
--
-- Result: 16/30 Gerais, 19/30 Específicos = 35/60 total. Both blocks clear
-- the >=15 elimination floor (item 8.11.5), so the candidate is HABILITADO
-- on the objective test's elimination criteria. Classification/cutoff
-- position was not checked here (would require the full candidate ranking
-- list, not part of this exam-scoring task).
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, file_name, storage_path,
   correct_count, wrong_count, blank_count, score_net, score_raw, extracted_data, notes)
select
  u.id,
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre',
  '2023',
  'CEBRASPE',
  'resultado',
  'SEFAZ_AC_2023_resultado_franc_denis.txt',
  'manual-entry/sefaz-ac-2023-especialista-franc-denis',
  35,
  25,
  0,
  35,
  35,
  jsonb_build_object(
    'method', 'Gabarito pessoal do candidato confrontado, TEXTO por TEXTO (não letra por letra, pois a prova embaralha a ordem A-E por candidato), com o conteúdo de referência oficial do CEBRASPE (cdn.cebraspe.org.br: 946_SEFAZ_AC_CG2_01.PDF para Gerais e 946_SEFAZ_AC_003_01.PDF para Específicos) e o gabarito oficial definitivo (GAB_DEFINITIVO_946_SEFAZ_AC_CG2_01.PDF e equivalente para Específicos Cargo 3). Pontuação conforme Edital nº 001 SEAD/SEFAZ, item 8.11.2.1: 1 ponto por questão certa, 0 por errada/branco/dupla marcação — sem desconto por erro.',
    'candidate_answers', '{
      "1":"A","2":"E","3":"D","4":"A","5":"E","6":"E","7":"B","8":"B","9":"C","10":"B",
      "11":"A","12":"B","13":"D","14":"B","15":"C","16":"D","17":"E","18":"A","19":"C","20":"E",
      "21":"A","22":"D","23":"C","24":"B","25":"B","26":"A","27":"E","28":"A","29":"A","30":"B",
      "31":"E","32":"E","33":"D","34":"C","35":"A","36":"B","37":"A","38":"B","39":"C","40":"E",
      "41":"A","42":"B","43":"C","44":"A","45":"E","46":"D","47":"B","48":"A","49":"B","50":"E",
      "51":"C","52":"D","53":"E","54":"E","55":"E","56":"D","57":"C","58":"E","59":"B","60":"D"
    }'::jsonb,
    'items', '{
      "1":"errada","2":"correta","3":"errada","4":"errada","5":"errada","6":"correta","7":"correta","8":"correta","9":"correta","10":"correta",
      "11":"correta","12":"errada","13":"errada","14":"errada","15":"errada","16":"correta","17":"correta","18":"correta","19":"errada","20":"errada",
      "21":"correta","22":"errada","23":"correta","24":"correta","25":"correta","26":"correta","27":"errada","28":"correta","29":"errada","30":"errada",
      "31":"correta","32":"correta","33":"errada","34":"correta","35":"correta","36":"correta","37":"errada","38":"correta","39":"errada","40":"correta",
      "41":"correta","42":"correta","43":"correta","44":"errada","45":"correta","46":"errada","47":"errada","48":"correta","49":"correta","50":"correta",
      "51":"correta","52":"correta","53":"correta","54":"correta","55":"errada","56":"errada","57":"errada","58":"errada","59":"correta","60":"errada"
    }'::jsonb,
    'by_subject', jsonb_build_object(
      'Conhecimentos Gerais (P1)', jsonb_build_object('total',30,'correct',16,'wrong',14,'annulled',0,'blank',0,'minimo_exigido',15),
      'Conhecimentos Específicos (P2)', jsonb_build_object('total',30,'correct',19,'wrong',11,'annulled',0,'blank',0,'minimo_exigido',15)
    ),
    'criterio_eliminatorio', jsonb_build_object(
      'gerais_minimo', 15, 'gerais_obtido', 16,
      'especificos_minimo', 15, 'especificos_obtido', 19,
      'passou_no_criterio_objetivo', true,
      'observacao', 'Posicionamento/classificação entre candidatos não verificado nesta análise — depende da lista completa de classificação, não disponível nesta sessão.'
    )
  ),
  'Prova com formato DIFERENTE das demais provas CEBRASPE já registradas (PF/PRF/DEPEN usam Certo/Errado com desconto por erro; esta usa múltipla escolha A-E de 5 alternativas, SEM desconto por erro, confirmado no Edital nº 001 SEAD/SEFAZ item 8.11.2.1). Também diferente do padrão de outras provas: esta embaralha a ordem das alternativas por candidato (confirmado comparando o caderno do candidato com o PDF de referência oficial do CEBRASPE, mesmo texto de questão e das 5 opções, ordem de letras diferente). Por isso a comparação foi feita por conteúdo de cada alternativa, não por letra. Resultado: 16/30 Gerais + 19/30 Específicos = 35/60. Ambos os blocos acima do mínimo eliminatório de 15 (item 8.11.5) — candidato HABILITADO no critério objetivo.'
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;
