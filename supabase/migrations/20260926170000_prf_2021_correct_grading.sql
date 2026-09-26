-- Correct PRF 2021 grading. The candidate confirmed this retyped answer sheet is
-- genuinely PRF 2021 (unlike the previous one in 20260926140000, which turned out
-- to belong to PRF 2019 and was reverted in 20260926160000). Confronted against
-- the official gabarito (578_PRF_001_01 + 578_PRF_ING_01, 10 anuladas: itens 1,
-- 39, 45, 67, 69, 76, 83, 89, 97, 98).
--
-- Result: 53 corretas, 42 erradas, 10 anuladas, 15 em branco. CEBRASPE net score:
-- 53-42+10 = 21 (was 14 from the photo-based reading).
update public.student_exam_documents
set correct_count = 53,
    wrong_count = 42,
    blank_count = 15,
    score_net = 21,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (578_PRF_001_01 + 578_PRF_ING_01)",
      "items": {
        "1":"anulada","2":"correta","3":"correta","4":"correta","5":"correta","6":"errada","7":"errada","8":"branco",
        "9":"correta","10":"errada","11":"errada","12":"errada","13":"errada","14":"correta","15":"correta","16":"errada",
        "17":"correta","18":"correta","19":"errada","20":"branco","21":"errada","22":"errada","23":"errada","24":"correta",
        "25":"correta","26":"correta","27":"correta","28":"branco","29":"errada","30":"correta","31":"branco","32":"branco",
        "33":"correta","34":"correta","35":"errada","36":"correta","37":"errada","38":"branco","39":"anulada","40":"errada",
        "41":"correta","42":"errada","43":"branco","44":"branco","45":"anulada","46":"correta","47":"errada","48":"correta",
        "49":"errada","50":"correta","51":"errada","52":"errada","53":"branco","54":"correta","55":"branco","56":"correta",
        "57":"errada","58":"errada","59":"correta","60":"correta","61":"errada","62":"errada","63":"errada","64":"correta",
        "65":"correta","66":"correta","67":"anulada","68":"errada","69":"anulada","70":"errada","71":"correta","72":"correta",
        "73":"correta","74":"branco","75":"errada","76":"anulada","77":"correta","78":"errada","79":"branco","80":"errada",
        "81":"errada","82":"branco","83":"anulada","84":"correta","85":"errada","86":"errada","87":"correta","88":"errada",
        "89":"anulada","90":"errada","91":"correta","92":"correta","93":"correta","94":"correta","95":"correta","96":"errada",
        "97":"anulada","98":"anulada","99":"correta","100":"correta","101":"correta","102":"errada","103":"errada","104":"correta",
        "105":"correta","106":"errada","107":"correta","108":"correta","109":"errada","110":"errada","111":"branco","112":"correta",
        "113":"branco","114":"correta","115":"correta","116":"correta","117":"errada","118":"correta","119":"correta","120":"correta"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato com uma nova planilha confirmada como sendo genuinamente da PRF 2021 (a anterior, aplicada em 20260926140000, era da PRF 2019 por engano e já foi revertida). Nota líquida final 21, pelo padrão CEBRASPE (53 corretas − 42 erradas + 10 anuladas), 15 itens em branco.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';
