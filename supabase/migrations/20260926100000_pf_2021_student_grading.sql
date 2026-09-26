-- Franc Denis's personal graded attempt for PF 2021 (CPF 69598193268), built from
-- his own re-typed answer sheet, confronted item by item against the official
-- gabarito definitivo (Matriz_577_PF_002_00 — Edital nº 1 – DGP/PF, de 15/1/2021,
-- cargo Agente de Polícia Federal). 5 anuladas confirmed: itens 28, 92, 106, 108, 119.
--
-- First time this attempt is persisted to Supabase. The "58 certas / 17 erradas / 1
-- anulada / 44 sem marcação" figure mentioned in prior chat history/HANDOFF.md was
-- never written to the database and does not match a verified item-by-item
-- confrontation against the official gabarito — this insert (38 corretas, 35
-- erradas, 5 anuladas, 42 em branco) replaces it as the first persisted, verified
-- figure for this attempt.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2021','CEBRASPE','resultado',
  'PF_2021_resultado_franc_denis.txt','manual-entry/pf-2021-franc-denis',
  38, 35, 42, 8,
  '{
    "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (Matriz_577_PF_002_00)",
    "items": {
      "1":"correta","2":"correta","3":"errada","4":"correta","5":"errada","6":"errada","7":"branco","8":"correta",
      "9":"errada","10":"correta","11":"errada","12":"branco","13":"correta","14":"errada","15":"errada","16":"correta",
      "17":"correta","18":"branco","19":"errada","20":"correta","21":"errada","22":"branco","23":"errada","24":"branco",
      "25":"errada","26":"branco","27":"errada","28":"anulada","29":"correta","30":"correta","31":"correta","32":"correta",
      "33":"correta","34":"errada","35":"correta","36":"errada","37":"branco","38":"branco","39":"branco","40":"branco",
      "41":"branco","42":"branco","43":"correta","44":"branco","45":"branco","46":"branco","47":"branco","48":"branco",
      "49":"errada","50":"errada","51":"branco","52":"errada","53":"errada","54":"branco","55":"errada","56":"correta",
      "57":"correta","58":"correta","59":"errada","60":"branco","61":"errada","62":"errada","63":"correta","64":"branco",
      "65":"correta","66":"errada","67":"correta","68":"errada","69":"correta","70":"correta","71":"correta","72":"correta",
      "73":"branco","74":"branco","75":"errada","76":"branco","77":"correta","78":"correta","79":"correta","80":"branco",
      "81":"errada","82":"branco","83":"correta","84":"branco","85":"branco","86":"errada","87":"branco","88":"branco",
      "89":"errada","90":"correta","91":"branco","92":"anulada","93":"correta","94":"errada","95":"branco","96":"branco",
      "97":"errada","98":"correta","99":"correta","100":"branco","101":"errada","102":"errada","103":"correta","104":"branco",
      "105":"branco","106":"anulada","107":"correta","108":"anulada","109":"correta","110":"branco","111":"errada","112":"branco",
      "113":"branco","114":"branco","115":"errada","116":"branco","117":"errada","118":"correta","119":"anulada","120":"branco"
    }
  }'::jsonb,
  'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo e confrontadas item a item com o gabarito oficial definitivo (cargo Agente de Polícia Federal, Edital nº 1 – DGP/PF de 15/1/2021). Primeira vez que esse resultado é gravado no banco — substitui qualquer contagem anterior mencionada apenas em conversa. Nota líquida final 8, pelo padrão CEBRASPE (38 corretas − 35 erradas + 5 anuladas), 42 itens em branco.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;
