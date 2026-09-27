-- Candidate resent a FULL personal gabarito for PF 2014 (only item 94 left
-- blank, versus the previous submission which had 44 items unanswered).
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2014, career_name='Agente de Polícia Federal'): 57 corretas,
-- 55 erradas, 7 anuladas (itens 21,46,57,61,77,84,111), 1 em branco (item 94).
-- CEBRASPE net score: 57 - 55 + 7 = 9.
-- This supersedes the 20260926110000 correction (50/19/44/38), which was
-- based on an incomplete transcription.
update public.student_exam_documents
set correct_count = 57,
    wrong_count = 55,
    blank_count = 1,
    score_net = 9,
    extracted_data = '{
      "method": "gabarito pessoal completo retranscrito pelo candidato (2026-09-27), confrontado item a item com public.official_exam_questions (exam_year=2014, career_name=Agente de Polícia Federal)",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"errada","5":"errada","6":"errada","7":"errada","8":"correta",
        "9":"correta","10":"errada","11":"correta","12":"errada","13":"correta","14":"correta","15":"errada","16":"errada",
        "17":"errada","18":"errada","19":"errada","20":"errada","21":"anulada","22":"correta","23":"correta","24":"correta",
        "25":"correta","26":"correta","27":"errada","28":"errada","29":"correta","30":"errada","31":"errada","32":"errada",
        "33":"correta","34":"correta","35":"errada","36":"errada","37":"errada","38":"errada","39":"correta","40":"errada",
        "41":"correta","42":"correta","43":"correta","44":"errada","45":"errada","46":"anulada","47":"correta","48":"correta",
        "49":"correta","50":"errada","51":"errada","52":"correta","53":"correta","54":"errada","55":"correta","56":"errada",
        "57":"anulada","58":"correta","59":"errada","60":"errada","61":"anulada","62":"errada","63":"correta","64":"correta",
        "65":"correta","66":"errada","67":"errada","68":"correta","69":"correta","70":"correta","71":"errada","72":"correta",
        "73":"correta","74":"correta","75":"errada","76":"correta","77":"anulada","78":"errada","79":"correta","80":"errada",
        "81":"errada","82":"correta","83":"correta","84":"anulada","85":"correta","86":"errada","87":"correta","88":"errada",
        "89":"correta","90":"errada","91":"correta","92":"correta","93":"correta","94":"branco","95":"correta","96":"correta",
        "97":"errada","98":"errada","99":"correta","100":"correta","101":"errada","102":"correta","103":"correta","104":"correta",
        "105":"errada","106":"correta","107":"errada","108":"correta","109":"errada","110":"correta","111":"anulada","112":"correta",
        "113":"correta","114":"errada","115":"errada","116":"errada","117":"correta","118":"correta","119":"errada","120":"errada"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":30,"correct":12,"wrong":17,"annulled":1,"blank":0},
        "Informática": {"total":18,"correct":7,"wrong":10,"annulled":1,"blank":0},
        "Atualidades": {"total":8,"correct":4,"wrong":4,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":14,"correct":7,"wrong":5,"annulled":2,"blank":0},
        "Administração Pública": {"total":6,"correct":4,"wrong":2,"annulled":0,"blank":0},
        "Administração Financeira e Orçamentária": {"total":2,"correct":0,"wrong":1,"annulled":1,"blank":0},
        "Ética no Serviço Público": {"total":2,"correct":1,"wrong":1,"annulled":0,"blank":0},
        "Contabilidade Geral": {"total":10,"correct":5,"wrong":4,"annulled":1,"blank":0},
        "Economia": {"total":10,"correct":7,"wrong":2,"annulled":0,"blank":1},
        "Direito Penal e Processual Penal": {"total":8,"correct":5,"wrong":3,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":2,"wrong":1,"annulled":1,"blank":0},
        "Legislação Especial": {"total":3,"correct":1,"wrong":2,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":5,"correct":2,"wrong":3,"annulled":0,"blank":0}
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): reenvio do gabarito pessoal, desta vez quase completo (apenas item 94 em branco, contra 44 itens em branco na versão anterior). Confrontado item a item com o gabarito oficial definitivo cadastrado em official_exam_questions. Resultado: 57 corretas, 55 erradas, 7 anuladas, 1 em branco. Nota líquida final 9 (57-55+7), padrão CEBRASPE. Substitui a apuração anterior (50/19/44/38) que era baseada em transcrição incompleta.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';
