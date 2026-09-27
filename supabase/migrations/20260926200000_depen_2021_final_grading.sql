-- Final DEPEN 2021 grading. The candidate resent his answer sheet retyped (more
-- reliable than the original handwritten-photo reading), replacing the partial
-- reading in 20260926190000 (47/43/5/25 pendentes). Confronted all 120 items
-- against the official gabarito (Matriz_541_DEPEN_008_00, CB2, CG2; 5 anuladas:
-- itens 6, 34, 52, 54, 100).
--
-- Result: 56 corretas, 46 erradas, 5 anuladas, 13 em branco. CEBRASPE net score:
-- 56-46+5 = 15 (was a partial 9, with 25 items unconfirmed).
update public.student_exam_documents
set correct_count = 56,
    wrong_count = 46,
    blank_count = 13,
    score_net = 15,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (Matriz_541_DEPEN_008_00, CB2, CG2) — substitui a leitura anterior feita a partir das fotos do caderno manuscrito",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"correta","5":"errada","6":"anulada","7":"errada","8":"correta",
        "9":"branco","10":"correta","11":"branco","12":"correta","13":"errada","14":"errada","15":"correta","16":"correta",
        "17":"errada","18":"errada","19":"correta","20":"branco","21":"branco","22":"correta","23":"errada","24":"correta",
        "25":"correta","26":"correta","27":"correta","28":"errada","29":"errada","30":"correta","31":"correta","32":"correta",
        "33":"errada","34":"anulada","35":"branco","36":"correta","37":"errada","38":"correta","39":"correta","40":"correta",
        "41":"errada","42":"errada","43":"errada","44":"correta","45":"errada","46":"errada","47":"errada","48":"correta",
        "49":"errada","50":"correta","51":"correta","52":"anulada","53":"correta","54":"anulada","55":"errada","56":"errada",
        "57":"correta","58":"correta","59":"errada","60":"errada","61":"correta","62":"correta","63":"correta","64":"branco",
        "65":"correta","66":"branco","67":"errada","68":"correta","69":"errada","70":"errada","71":"correta","72":"errada",
        "73":"correta","74":"correta","75":"errada","76":"errada","77":"correta","78":"errada","79":"branco","80":"errada",
        "81":"correta","82":"correta","83":"correta","84":"errada","85":"correta","86":"correta","87":"errada","88":"correta",
        "89":"errada","90":"correta","91":"errada","92":"branco","93":"correta","94":"errada","95":"correta","96":"correta",
        "97":"correta","98":"correta","99":"branco","100":"anulada","101":"errada","102":"errada","103":"errada","104":"branco",
        "105":"errada","106":"errada","107":"correta","108":"correta","109":"correta","110":"errada","111":"correta","112":"correta",
        "113":"errada","114":"correta","115":"errada","116":"branco","117":"errada","118":"correta","119":"correta","120":"branco"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo, substituindo a leitura anterior feita a partir das fotos do caderno manuscrito. Nota líquida final 15, pelo padrão CEBRASPE (56 corretas − 46 erradas + 5 anuladas), 13 itens em branco. Conferência completa, sem itens pendentes.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Departamento Penitenciário Nacional'
  and contest_year = '2021'
  and doc_type = 'resultado';
