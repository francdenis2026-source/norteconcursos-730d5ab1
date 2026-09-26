-- Franc Denis's personal graded attempt for PF 2018 (CPF 69598193268), built from
-- his own re-typed answer sheet, confronted item by item against the official
-- gabarito definitivo (408_DGPPF012_Pag 9, cargo 12: Agente de Polícia Federal,
-- aplicação 16/9/2018). 6 anuladas confirmed: itens 29, 30, 51, 78, 91, 117.
--
-- First time this attempt is persisted to Supabase (a previous submission of this
-- answer sheet was reported by the candidate as sent in error and was never
-- inserted). 60 corretas, 51 erradas, 6 anuladas, 3 em branco (itens 83, 94, 95).
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2018','CEBRASPE','resultado',
  'PF_2018_resultado_franc_denis.txt','manual-entry/pf-2018-franc-denis',
  60, 51, 3, 15,
  '{
    "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (408_DGPPF012_Pag 9)",
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
      "81":"errada","82":"errada","83":"branco","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta",
      "89":"correta","90":"correta","91":"anulada","92":"correta","93":"correta","94":"branco","95":"branco","96":"errada",
      "97":"correta","98":"correta","99":"errada","100":"correta","101":"correta","102":"correta","103":"errada","104":"errada",
      "105":"errada","106":"correta","107":"correta","108":"correta","109":"errada","110":"correta","111":"errada","112":"errada",
      "113":"correta","114":"errada","115":"errada","116":"errada","117":"anulada","118":"correta","119":"errada","120":"errada"
    }
  }'::jsonb,
  'Resultado registrado a pedido do candidato: respostas retranscritas por ele mesmo e confrontadas item a item com o gabarito oficial definitivo (Cargo 12: Agente de Polícia Federal, aplicação 16/9/2018). Um envio anterior deste ano foi reportado pelo próprio candidato como equivocado e nunca chegou a ser gravado. Nota líquida final 15, pelo padrão CEBRASPE (60 corretas − 51 erradas + 6 anuladas), 3 itens em branco.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;
