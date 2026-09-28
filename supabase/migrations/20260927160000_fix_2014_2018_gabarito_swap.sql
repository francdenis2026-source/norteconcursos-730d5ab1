-- Corrects a misattribution: the candidate sent two answer sheets in this
-- session. When asked to clarify which year the second one (heavy-blank
-- pattern) belonged to, the candidate answered "2018" — but a direct
-- letter-by-letter comparison against the pre-session stored data proves
-- otherwise:
--   * "msg1" (near-complete, few blanks) matches the ORIGINAL pre-session
--     2018 record on 112/114 comparable items (98%) -> genuinely 2018.
--   * "msg2" (large blank block 35-80/91-100) matches the ORIGINAL
--     pre-session 2014 record on 102/113 comparable items (90%), differing
--     only by filling in items 81-90 (previously blank) plus items 37 and 56
--     -> genuinely a refinement of 2014, NOT 2018.
--
-- This migration:
--  1) Reverts 2018 back to the correct state derived from msg1
--     (20260927130000_pf_2018_full_gabarito_update.sql: 60/53/1/13),
--     undoing the erroneous 20260927150000_pf_2018_resend_v2.sql.
--  2) Updates 2014 with the refined msg2 gabarito: 60 corretas, 19 erradas,
--     7 anuladas, 34 em branco. Nota líquida = 60 - 19 + 7 = 48.

-- Step 1: restore PF 2018 to the msg1-derived state
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
      }
    }'::jsonb,
    notes = 'Corrigido em 2026-09-27: o candidato havia confirmado por engano que o gabarito com muitos itens em branco (2026-09-27, segundo envio da sessão) era de 2018. Comparação letra a letra com os dados já salvos antes desta sessão provou que esse gabarito pertence a 2014, não 2018. Restaurado o resultado correto de 2018 (derivado do primeiro gabarito enviado nesta sessão, que bate 98% com o registro pré-sessão de 2018): 60 corretas, 53 erradas, 6 anuladas, 1 em branco. Nota líquida final 13.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2018'
  and doc_type = 'resultado';

-- Step 2: update PF 2014 with the refined msg2 gabarito (fills items 81-90,
-- flips item 37, fills item 56, versus the previously stored 2014 state)
update public.student_exam_documents
set correct_count = 60,
    wrong_count = 19,
    blank_count = 34,
    score_net = 48,
    extracted_data = '{
      "method": "gabarito pessoal reenviado pelo candidato (2026-09-27), inicialmente atribuído por engano a 2018 e corrigido para 2014 após comparação letra a letra com o registro pré-sessão. Confrontado item a item com public.official_exam_questions (exam_year=2014, career_name=Agente de Polícia Federal). Nota líquida calculada conforme regra CEBRASPE em public.exam_board_scoring_rules (brancas não descontam).",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"correta","5":"errada","6":"correta","7":"correta","8":"errada",
        "9":"correta","10":"correta","11":"correta","12":"errada","13":"correta","14":"correta","15":"errada","16":"errada",
        "17":"correta","18":"errada","19":"errada","20":"correta","21":"anulada","22":"correta","23":"correta","24":"correta",
        "25":"correta","26":"correta","27":"errada","28":"correta","29":"correta","30":"errada","31":"correta","32":"correta",
        "33":"errada","34":"correta","35":"branco","36":"branco","37":"errada","38":"correta","39":"correta","40":"errada",
        "41":"errada","42":"correta","43":"errada","44":"correta","45":"branco","46":"anulada","47":"errada","48":"correta",
        "49":"correta","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"correta",
        "57":"anulada","58":"branco","59":"branco","60":"branco","61":"anulada","62":"branco","63":"branco","64":"branco",
        "65":"branco","66":"branco","67":"branco","68":"branco","69":"branco","70":"branco","71":"branco","72":"branco",
        "73":"branco","74":"branco","75":"branco","76":"anulada","77":"branco","78":"branco","79":"branco","80":"branco",
        "81":"correta","82":"correta","83":"correta","84":"anulada","85":"correta","86":"errada","87":"correta","88":"correta",
        "89":"correta","90":"correta","91":"branco","92":"branco","93":"branco","94":"branco","95":"branco","96":"branco",
        "97":"branco","98":"branco","99":"branco","100":"branco","101":"errada","102":"correta","103":"errada","104":"correta",
        "105":"correta","106":"correta","107":"correta","108":"errada","109":"correta","110":"correta","111":"anulada",
        "112":"errada","113":"errada","114":"correta","115":"correta","116":"correta","117":"errada","118":"correta",
        "119":"correta","120":"correta"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":30,"correct":23,"wrong":6,"annulled":1,"blank":0},
        "Informática": {"total":18,"correct":10,"wrong":4,"annulled":1,"blank":3},
        "Atualidades": {"total":8,"correct":7,"wrong":1,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":14,"correct":0,"wrong":0,"annulled":2,"blank":12},
        "Administração Pública": {"total":6,"correct":0,"wrong":0,"annulled":0,"blank":6},
        "Administração Financeira e Orçamentária": {"total":2,"correct":0,"wrong":0,"annulled":1,"blank":1},
        "Ética no Serviço Público": {"total":2,"correct":0,"wrong":0,"annulled":0,"blank":2},
        "Contabilidade Geral": {"total":10,"correct":8,"wrong":1,"annulled":1,"blank":0},
        "Economia": {"total":10,"correct":0,"wrong":0,"annulled":0,"blank":10},
        "Direito Penal e Processual Penal": {"total":8,"correct":5,"wrong":3,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":2,"wrong":1,"annulled":1,"blank":0},
        "Legislação Especial": {"total":3,"correct":2,"wrong":1,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":5,"correct":3,"wrong":2,"annulled":0,"blank":0}
      }
    }'::jsonb,
    notes = 'Corrigido em 2026-09-27: gabarito reenviado pelo candidato nesta sessão (inicialmente atribuído por engano a 2018) refina o registro de 2014, preenchendo os itens 81-90 (antes em branco) e ajustando os itens 37 e 56. Resultado: 60 corretas, 19 erradas, 7 anuladas, 34 em branco. Nota líquida final 48 (60-19+7), pela regra CEBRASPE (brancas não descontam, ver public.exam_board_scoring_rules). Substitui a apuração anterior (50/19/44/38).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';
