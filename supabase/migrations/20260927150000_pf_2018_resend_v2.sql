-- Candidate resent his personal gabarito for PF 2018 a second time
-- (2026-09-27), this time with a large block of items left blank
-- (35,36,45,57-80,91-100 — 35 blanks total), replacing the previous
-- near-complete submission (20260927130000: 60/53/1/13). Candidate confirmed
-- explicitly (via clarifying question) that this new sheet is 2018, not 2014,
-- despite the blank pattern closely resembling the 2014 sheet.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2018, career_name='Agente de Polícia Federal'). Per the CEBRASPE
-- scoring rule stored in public.exam_board_scoring_rules, blank items are NOT
-- discounted: nota_liquida = corretas - erradas + anuladas.
-- Result: 50 corretas, 29 erradas, 6 anuladas (itens 29,30,51,78,91,117),
-- 35 em branco. Nota líquida: 50 - 29 + 6 = 27.
update public.student_exam_documents
set correct_count = 50,
    wrong_count = 29,
    blank_count = 35,
    score_net = 27,
    extracted_data = '{
      "method": "gabarito pessoal reenviado pelo candidato (2026-09-27, segunda versão), confrontado item a item com public.official_exam_questions (exam_year=2018, career_name=Agente de Polícia Federal). Nota líquida calculada conforme regra CEBRASPE em public.exam_board_scoring_rules (brancas não descontam).",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"errada","5":"correta","6":"correta","7":"errada","8":"errada",
        "9":"errada","10":"correta","11":"correta","12":"correta","13":"correta","14":"errada","15":"correta","16":"correta",
        "17":"errada","18":"correta","19":"correta","20":"correta","21":"correta","22":"correta","23":"errada","24":"errada",
        "25":"correta","26":"errada","27":"errada","28":"errada","29":"anulada","30":"anulada","31":"correta","32":"correta",
        "33":"correta","34":"errada","35":"branco","36":"branco","37":"correta","38":"correta","39":"correta","40":"correta",
        "41":"errada","42":"correta","43":"correta","44":"correta","45":"branco","46":"correta","47":"errada","48":"errada",
        "49":"correta","50":"correta","51":"anulada","52":"errada","53":"correta","54":"correta","55":"errada","56":"correta",
        "57":"branco","58":"branco","59":"branco","60":"branco","61":"branco","62":"branco","63":"branco","64":"branco",
        "65":"branco","66":"branco","67":"branco","68":"branco","69":"branco","70":"branco","71":"branco","72":"branco",
        "73":"branco","74":"branco","75":"branco","76":"branco","77":"branco","78":"anulada","79":"branco","80":"branco",
        "81":"correta","82":"errada","83":"errada","84":"errada","85":"correta","86":"correta","87":"correta","88":"errada",
        "89":"correta","90":"errada","91":"anulada","92":"branco","93":"branco","94":"branco","95":"branco","96":"branco",
        "97":"branco","98":"branco","99":"branco","100":"branco","101":"correta","102":"correta","103":"correta","104":"errada",
        "105":"correta","106":"correta","107":"errada","108":"errada","109":"correta","110":"correta","111":"correta","112":"correta",
        "113":"errada","114":"correta","115":"correta","116":"correta","117":"anulada","118":"correta","119":"correta","120":"errada"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":24,"correct":14,"wrong":10,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":1,"wrong":3,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":4,"correct":2,"wrong":0,"annulled":2,"blank":0},
        "Direito Penal e Processual Penal": {"total":4,"correct":1,"wrong":1,"annulled":0,"blank":2},
        "Legislação Especial": {"total":4,"correct":4,"wrong":0,"annulled":0,"blank":0},
        "Estatística": {"total":10,"correct":6,"wrong":3,"annulled":0,"blank":1},
        "Raciocínio Lógico": {"total":10,"correct":3,"wrong":2,"annulled":1,"blank":4},
        "Informática": {"total":36,"correct":5,"wrong":5,"annulled":2,"blank":24},
        "Contabilidade Geral": {"total":24,"correct":14,"wrong":5,"annulled":1,"blank":4}
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato (2026-09-27, segundo reenvio): gabarito com 35 itens em branco, confirmado pelo candidato como pertencente a 2018 (mesmo com padrão de brancos parecido ao de 2014). Confrontado item a item com o gabarito oficial definitivo. Resultado: 50 corretas, 29 erradas, 6 anuladas, 35 em branco. Nota líquida final 27 (50-29+6), pela regra CEBRASPE (brancas não descontam, ver public.exam_board_scoring_rules). Substitui a apuração anterior (60/53/1/13, que era um envio quase sem brancos).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2018'
  and doc_type = 'resultado';
