-- Franc Denis's personal graded attempt for PF 2014 (CPF 69598193268), built from
-- his own re-typed answer sheet (reliable, not handwritten-photo OCR this time),
-- confronted item by item against the official gabarito definitivo
-- (120DPFAGENTE14_001_01 — 7 anuladas: itens 21, 46, 57, 61, 76, 84, 111).
--
-- This is the first time this attempt is persisted to Supabase — the "57 certas /
-- 16 erradas / 44 em branco" figure mentioned in prior chat history/HANDOFF.md was
-- never actually written to the database, so there is nothing to overwrite; this is
-- a fresh, more accurate insert (52 corretas, 18 erradas, 7 anuladas, 43 em branco).
-- contest_name matches the career_name already used by the PF 2014
-- official_exam_questions rows ('Agente de Polícia Federal') so the "Pontos fracos
-- por disciplina" breakdown in Central de Provas joins correctly.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2014','CEBRASPE','resultado',
  'PF_2014_resultado_franc_denis.txt','manual-entry/pf-2014-franc-denis',
  52, 18, 43, 41,
  '{
    "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (120DPFAGENTE14_001_01)",
    "items": {
      "1":"correta","2":"correta","3":"errada","4":"correta","5":"errada","6":"correta","7":"correta","8":"errada",
      "9":"correta","10":"correta","11":"correta","12":"correta","13":"correta","14":"correta","15":"errada","16":"correta",
      "17":"correta","18":"correta","19":"errada","20":"correta","21":"anulada","22":"correta","23":"correta","24":"correta",
      "25":"correta","26":"errada","27":"correta","28":"correta","29":"correta","30":"correta","31":"correta","32":"correta",
      "33":"errada","34":"correta","35":"branco","36":"branco","37":"correta","38":"correta","39":"correta","40":"errada",
      "41":"correta","42":"correta","43":"errada","44":"correta","45":"branco","46":"anulada","47":"errada","48":"correta",
      "49":"correta","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"correta",
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
  'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo (mais confiável que leitura de foto manuscrita) e confrontadas item a item com o gabarito oficial definitivo. Substitui qualquer contagem anterior mencionada apenas em conversa (nunca gravada no banco). Nota líquida final 41, pelo padrão CEBRASPE (52 corretas − 18 erradas + 7 anuladas), 43 itens em branco (deixados sem marcação pelo próprio candidato).'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;
