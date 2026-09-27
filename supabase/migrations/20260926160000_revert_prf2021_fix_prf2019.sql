-- Correction: the retyped answer sheet applied in 20260926140000 (which updated
-- PRF 2021) actually belonged to PRF 2019, per the candidate. This migration:
--   1) reverts PRF 2021 back to its original grading from the initial import
--      (20260926080000_prf_2021_official_exam_import.sql) — 55 corretas, 51
--      erradas, 10 anuladas, 4 em branco, nota líquida 14;
--   2) applies that same retyped answer sheet to PRF 2019 instead, confronted
--      against the official gabarito already used in
--      20260926070000_prf_2019_official_exam_import.sql (12 anuladas: itens 3,
--      31, 33, 61, 62, 71, 72, 76, 83, 91, 109, 113) — 66 corretas, 38 erradas,
--      12 anuladas, 4 em branco (itens 23, 40, 92, 120), nota líquida 40 (was 34).

update public.student_exam_documents
set correct_count = 55,
    wrong_count = 51,
    blank_count = 4,
    score_net = 14,
    extracted_data = '{
      "method": "leitura manuscrita item a item confrontada com o gabarito oficial definitivo",
      "items": {
        "1":"anulada","2":"correta","3":"correta","4":"correta","5":"correta","6":"errada","7":"correta","8":"errada",
        "9":"correta","10":"errada","11":"errada","12":"errada","13":"errada","14":"correta","15":"correta","16":"errada",
        "17":"correta","18":"correta","19":"errada","20":"correta","21":"errada","22":"errada","23":"errada","24":"correta",
        "25":"correta","26":"correta","27":"correta","28":"errada","29":"correta","30":"correta","31":"correta","32":"correta",
        "33":"correta","34":"errada","35":"correta","36":"correta","37":"errada","38":"branco","39":"anulada","40":"errada",
        "41":"correta","42":"errada","43":"errada","44":"branco","45":"anulada","46":"correta","47":"errada","48":"correta",
        "49":"errada","50":"correta","51":"errada","52":"errada","53":"branco","54":"correta","55":"correta","56":"errada",
        "57":"errada","58":"errada","59":"correta","60":"correta","61":"errada","62":"errada","63":"errada","64":"correta",
        "65":"correta","66":"correta","67":"anulada","68":"errada","69":"anulada","70":"errada","71":"correta","72":"errada",
        "73":"errada","74":"errada","75":"correta","76":"anulada","77":"correta","78":"errada","79":"errada","80":"errada",
        "81":"errada","82":"branco","83":"anulada","84":"correta","85":"correta","86":"errada","87":"correta","88":"errada",
        "89":"anulada","90":"errada","91":"errada","92":"errada","93":"correta","94":"correta","95":"correta","96":"errada",
        "97":"anulada","98":"anulada","99":"correta","100":"correta","101":"correta","102":"errada","103":"errada","104":"errada",
        "105":"correta","106":"errada","107":"correta","108":"correta","109":"errada","110":"errada","111":"correta","112":"correta",
        "113":"correta","114":"correta","115":"errada","116":"correta","117":"errada","118":"correta","119":"correta","120":"errada"
      }
    }'::jsonb,
    notes = 'Nota líquida final 14, pelo padrão CEBRASPE (55 corretas − 51 erradas + 10 anuladas), 4 itens em branco. Restaurado ao valor original após reversão de uma correção aplicada por engano em 20260926140000 (a planilha usada ali era da PRF 2019, não 2021).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';

update public.student_exam_documents
set correct_count = 66,
    wrong_count = 38,
    blank_count = 4,
    score_net = 40,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (MATRIZ_440_PRF_001_00_Pag 9) — substitui a leitura anterior feita a partir das fotos do caderno manuscrito",
      "items": {
        "1":"correta","2":"correta","3":"anulada","4":"correta","5":"errada","6":"errada","7":"correta","8":"correta",
        "9":"correta","10":"correta","11":"correta","12":"correta","13":"correta","14":"correta","15":"correta","16":"correta",
        "17":"correta","18":"correta","19":"correta","20":"correta","21":"correta","22":"correta","23":"branco","24":"correta",
        "25":"correta","26":"errada","27":"correta","28":"errada","29":"errada","30":"correta","31":"anulada","32":"errada",
        "33":"anulada","34":"correta","35":"correta","36":"correta","37":"errada","38":"correta","39":"correta","40":"branco",
        "41":"correta","42":"errada","43":"errada","44":"errada","45":"errada","46":"errada","47":"errada","48":"errada",
        "49":"errada","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"errada",
        "57":"correta","58":"errada","59":"errada","60":"correta","61":"anulada","62":"anulada","63":"correta","64":"correta",
        "65":"correta","66":"correta","67":"correta","68":"errada","69":"errada","70":"errada","71":"anulada","72":"anulada",
        "73":"errada","74":"errada","75":"errada","76":"anulada","77":"errada","78":"correta","79":"correta","80":"correta",
        "81":"correta","82":"errada","83":"anulada","84":"correta","85":"correta","86":"correta","87":"correta","88":"errada",
        "89":"correta","90":"correta","91":"anulada","92":"branco","93":"errada","94":"correta","95":"correta","96":"errada",
        "97":"errada","98":"errada","99":"errada","100":"correta","101":"correta","102":"correta","103":"errada","104":"errada",
        "105":"errada","106":"correta","107":"correta","108":"correta","109":"anulada","110":"errada","111":"correta","112":"correta",
        "113":"anulada","114":"correta","115":"errada","116":"correta","117":"correta","118":"correta","119":"correta","120":"branco"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo (a mesma planilha usada por engano na PRF 2021 pertencia, na verdade, à PRF 2019). Nota líquida final 40, pelo padrão CEBRASPE (66 corretas − 38 erradas + 12 anuladas), 4 itens em branco (23, 40, 92, 120).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2019'
  and doc_type = 'resultado';
