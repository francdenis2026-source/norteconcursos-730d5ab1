-- Correction to the PRF 2021 personal grading. The candidate resent his answer
-- sheet retyped (more reliable than the original handwritten-photo reading from
-- 20260926080000_prf_2021_official_exam_import.sql) and asked for a fresh
-- item-by-item confrontation against the same official gabarito
-- (578_PRF_001_01 + 578_PRF_ING_01), 10 anuladas: itens 1, 39, 45, 67, 69, 76,
-- 83, 89, 97, 98.
--
-- New result: 51 corretas, 55 erradas, 10 anuladas, 4 em branco (itens 23, 40,
-- 92, 120). CEBRASPE net score: 51-55+10 = 6 (was 14, from the photo-based
-- reading).
update public.student_exam_documents
set correct_count = 51,
    wrong_count = 55,
    blank_count = 4,
    score_net = 6,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (578_PRF_001_01 + 578_PRF_ING_01) — substitui a leitura anterior feita a partir das fotos do caderno manuscrito",
      "items": {
        "1":"anulada","2":"errada","3":"errada","4":"correta","5":"errada","6":"errada","7":"errada","8":"correta",
        "9":"correta","10":"errada","11":"correta","12":"correta","13":"correta","14":"errada","15":"correta","16":"correta",
        "17":"correta","18":"errada","19":"errada","20":"correta","21":"correta","22":"correta","23":"branco","24":"errada",
        "25":"correta","26":"errada","27":"errada","28":"correta","29":"errada","30":"errada","31":"correta","32":"errada",
        "33":"errada","34":"errada","35":"errada","36":"errada","37":"correta","38":"errada","39":"anulada","40":"branco",
        "41":"correta","42":"errada","43":"errada","44":"correta","45":"anulada","46":"errada","47":"correta","48":"errada",
        "49":"errada","50":"correta","51":"correta","52":"correta","53":"errada","54":"correta","55":"errada","56":"errada",
        "57":"correta","58":"errada","59":"correta","60":"correta","61":"errada","62":"errada","63":"correta","64":"correta",
        "65":"errada","66":"correta","67":"anulada","68":"correta","69":"anulada","70":"errada","71":"errada","72":"correta",
        "73":"errada","74":"correta","75":"errada","76":"anulada","77":"correta","78":"errada","79":"correta","80":"correta",
        "81":"correta","82":"errada","83":"anulada","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta",
        "89":"anulada","90":"errada","91":"errada","92":"branco","93":"errada","94":"errada","95":"errada","96":"errada",
        "97":"anulada","98":"anulada","99":"correta","100":"errada","101":"correta","102":"errada","103":"errada","104":"errada",
        "105":"correta","106":"correta","107":"correta","108":"errada","109":"errada","110":"correta","111":"errada","112":"errada",
        "113":"errada","114":"correta","115":"errada","116":"correta","117":"correta","118":"errada","119":"correta","120":"branco"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: reenvio das respostas retranscritas, substituindo a leitura anterior feita a partir das fotos do caderno manuscrito. Nota líquida final 6, pelo padrão CEBRASPE (51 corretas − 55 erradas + 10 anuladas), 4 itens em branco (23, 40, 92, 120).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';
