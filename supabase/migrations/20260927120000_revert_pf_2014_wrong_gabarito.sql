-- Reverts 20260927110000_pf_2014_full_gabarito_recheck.sql: the "full personal
-- gabarito" pasted by the candidate actually belongs to the PF 2018 exam, not
-- 2014 (candidate correction, 2026-09-27). Restores the PF 2014 resultado row
-- to the last known-good state from 20260926110000_pf_2014_grading_correction.sql
-- (50 corretas, 19 erradas, 44 em branco, nota líquida 38).
update public.student_exam_documents
set correct_count = 50,
    wrong_count = 19,
    blank_count = 44,
    score_net = 38,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (120DPFAGENTE14_001_01)",
      "items": {
        "1":"correta","2":"correta","3":"errada","4":"correta","5":"errada","6":"correta","7":"correta","8":"errada",
        "9":"correta","10":"correta","11":"correta","12":"correta","13":"correta","14":"correta","15":"errada","16":"correta",
        "17":"correta","18":"correta","19":"errada","20":"correta","21":"anulada","22":"correta","23":"correta","24":"correta",
        "25":"correta","26":"errada","27":"correta","28":"correta","29":"correta","30":"correta","31":"correta","32":"correta",
        "33":"errada","34":"correta","35":"branco","36":"branco","37":"errada","38":"correta","39":"correta","40":"errada",
        "41":"correta","42":"correta","43":"errada","44":"correta","45":"branco","46":"anulada","47":"errada","48":"correta",
        "49":"correta","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"branco",
        "57":"anulada","58":"branco","59":"branco","60":"branco","61":"anulada","62":"branco","63":"branco","64":"branco",
        "65":"branco","66":"branco","67":"branco","68":"branco","69":"branco","70":"branco","71":"branco","72":"branco",
        "73":"branco","74":"branco","75":"branco","76":"anulada","77":"branco","78":"branco","79":"branco","80":"branco",
        "81":"branco","82":"branco","83":"branco","84":"anulada","85":"branco","86":"branco","87":"branco","88":"branco",
        "89":"branco","90":"branco","91":"branco","92":"branco","93":"branco","94":"branco","95":"branco","96":"branco",
        "97":"branco","98":"branco","99":"branco","100":"branco","101":"errada","102":"correta","103":"errada","104":"correta",
        "105":"correta","106":"correta","107":"correta","108":"errada","109":"correta","110":"correta","111":"anulada",
        "112":"errada","113":"errada","114":"correta","115":"correta","116":"correta","117":"errada","118":"correta",
        "119":"correta","120":"errada"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo (mais confiável que leitura de foto manuscrita) e confrontadas item a item com o gabarito oficial definitivo. Nota líquida final 38, pelo padrão CEBRASPE (50 corretas − 19 erradas + 7 anuladas), 44 itens em branco (deixados sem marcação pelo próprio candidato). [Restaurado em 2026-09-27 após o candidato identificar que o gabarito completo enviado era, na verdade, da prova de 2018 — ver 20260927130000_pf_2018_full_gabarito.sql]'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';
