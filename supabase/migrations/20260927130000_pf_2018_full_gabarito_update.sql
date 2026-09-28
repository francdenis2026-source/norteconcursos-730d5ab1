-- Candidate resent his personal gabarito for PF 2018 (2026-09-27), initially
-- pasted under the wrong year (2014) and corrected by the candidate to 2018.
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2018, career_name='Agente de Polícia Federal'). Compared to the
-- previous submission (20260926120000, 60/51/3/15), this resend fills in the
-- 2 items that were previously blank (83 and 95) — both come out errada —
-- so correct_count stays at 60 but wrong_count rises from 51 to 53 and
-- blank_count drops from 3 to 1 (item 94 only). Annuladas unchanged at 6
-- (itens 29, 30, 51, 78, 91, 117).
-- New net score: 60 - 53 + 6 = 13 (was 15).
update public.student_exam_documents
set correct_count = 60,
    wrong_count = 53,
    blank_count = 1,
    score_net = 13,
    extracted_data = '{
      "method": "gabarito pessoal completo retranscrito pelo candidato (2026-09-27), confrontado item a item com public.official_exam_questions (exam_year=2018, career_name=Agente de Polícia Federal)",
      "items": {
        "1":"correta","2":"correta","3":"errada","4":"correta","5":"correta","6":"errada","7":"correta","8":"correta",
        "9":"errada","10":"errada","11":"correta","12":"errada","13":"correta","14":"errada","15":"correta","16":"errada",
        "17":"correta","18":"errada","19":"correta","20":"errada","21":"correta","22":"correta","23":"errada","24":"errada",
        "25":"correta","26":"correta","27":"correta","28":"correta","29":"anulada","30":"anulada","31":"errada","32":"errada",
        "33":"errada","34":"errada","35":"errada","36":"correta","37":"errada","38":"errada","39":"correta","40":"correta",
        "41":"correta","42":"correta","43":"errada","44":"errada","45":"correta","46":"errada","47":"correta","48":"errada",
        "49":"correta","50":"errada","51":"anulada","52":"errada","53":"correta","54":"correta","55":"errada","56":"errada",
        "57":"correta","58":"errada","59":"correta","60":"errada","61":"errada","62":"correta","63":"correta","64":"errada",
        "65":"errada","66":"errada","67":"correta","68":"errada","69":"correta","70":"errada","71":"correta","72":"correta",
        "73":"correta","74":"errada","75":"errada","76":"correta","77":"correta","78":"anulada","79":"correta","80":"correta",
        "81":"errada","82":"errada","83":"errada","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta",
        "89":"correta","90":"correta","91":"anulada","92":"correta","93":"correta","94":"branco","95":"errada","96":"errada",
        "97":"correta","98":"correta","99":"errada","100":"correta","101":"correta","102":"correta","103":"errada","104":"errada",
        "105":"errada","106":"correta","107":"correta","108":"correta","109":"errada","110":"correta","111":"errada","112":"errada",
        "113":"correta","114":"errada","115":"errada","116":"errada","117":"anulada","118":"correta","119":"errada","120":"errada"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":24,"correct":13,"wrong":11,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":4,"wrong":0,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":4,"correct":0,"wrong":2,"annulled":2,"blank":0},
        "Direito Penal e Processual Penal": {"total":4,"correct":1,"wrong":3,"annulled":0,"blank":0},
        "Legislação Especial": {"total":4,"correct":2,"wrong":2,"annulled":0,"blank":0},
        "Estatística": {"total":10,"correct":5,"wrong":5,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":10,"correct":4,"wrong":5,"annulled":1,"blank":0},
        "Informática": {"total":36,"correct":20,"wrong":13,"annulled":2,"blank":1},
        "Contabilidade Geral": {"total":24,"correct":11,"wrong":12,"annulled":1,"blank":0}
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito pessoal quase completo (apenas item 94 em branco, contra 3 itens em branco na versão anterior). Confrontado item a item com o gabarito oficial definitivo cadastrado em official_exam_questions. Resultado: 60 corretas, 53 erradas, 6 anuladas, 1 em branco. Nota líquida final 13 (60-53+6), padrão CEBRASPE. Substitui a apuração anterior (60/51/3/15). Este gabarito havia sido inicialmente aplicado por engano à prova de 2014 (ver 20260927120000_revert_pf_2014_wrong_gabarito.sql) e foi corrigido para 2018 pelo próprio candidato.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2018'
  and doc_type = 'resultado';
