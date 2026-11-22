-- Seed four original, IDECAN-style probability questions for the PC-AC study track.
-- The live catalog rows were inserted and verified in Supabase; this migration
-- keeps the same content reproducible in environments that replay migrations.

do $$
declare
  v_source_id uuid := 'ad99dcf6-2e35-4e27-836d-c5e1b8226806';
  v_topic_id uuid := 'dcf59d51-2edf-4244-afc3-9cc5c43b17ba';
begin
  insert into public.curated_question_catalog
    (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year,
     career_name, exam_board, subject, subtopic, question_text, official_answer,
     explanation, difficulty, content_status, is_original, verified_at, didactic_provenance)
  values
    (v_source_id,v_topic_id,'pcac-seq-idecan-q1','PC-AC 2026',2026,'Investigador de Polícia','AUTORAL — formato semelhante à IDECAN','Estatística','Probabilidade: união, independência, condicional e eventos mutuamente exclusivos',
     'Durante a análise de 200 boletins de ocorrência, verificou-se que 70 registravam furto, 50 registravam dano ao patrimônio e 20 registravam simultaneamente os dois fatos. Selecionado um boletim ao acaso, a probabilidade de ele registrar furto ou dano ao patrimônio é:
A) 35%
B) 45%
C) 50%
D) 60%
E) 70%',
     'C','União: 70+50−20=100 boletins. Dividindo por 200, obtemos 50%. Subtraímos a interseção porque os 20 boletins com os dois fatos foram contados nos dois grupos.','fácil','active',true,now(),
     jsonb_build_object('type','original_didactic_question','origin','assistant_authored','learning_sequence','probabilidade-basica-idecan','answer_options',jsonb_build_array('35%','45%','50%','60%','70%'),'quick_tip','OU = some e retire a parte comum uma vez.')),
    (v_source_id,v_topic_id,'pcac-seq-idecan-q2','PC-AC 2026',2026,'Investigador de Polícia','AUTORAL — formato semelhante à IDECAN','Estatística','Probabilidade: união, independência, condicional e eventos mutuamente exclusivos',
     'Durante uma avaliação, a probabilidade de um candidato acertar uma questão de Direito Penal é de 40%, e a probabilidade de acertar uma questão de Direito Constitucional é de 50%. Considerando que os eventos são independentes, a probabilidade de acertar ambas as questões é:
A) 10%
B) 20%
C) 40%
D) 45%
E) 90%',
     'B','Como os eventos são independentes e a questão pede acertar ambas, multiplicamos 0,40×0,50=0,20, ou 20%.','fácil','active',true,now(),
     jsonb_build_object('type','original_didactic_question','origin','assistant_authored','learning_sequence','probabilidade-basica-idecan','answer_options',jsonb_build_array('10%','20%','40%','45%','90%'),'quick_tip','AMBAS + independentes = multiplicar.')),
    (v_source_id,v_topic_id,'pcac-seq-idecan-q3','PC-AC 2026',2026,'Investigador de Polícia','AUTORAL — formato semelhante à IDECAN','Estatística','Probabilidade: união, independência, condicional e eventos mutuamente exclusivos',
     'Durante uma análise de 100 registros policiais, 40 ocorreram durante a noite. Entre esses 40 registros, 16 apresentaram vestígios. Escolhido aleatoriamente um registro, sabendo que ele ocorreu durante a noite, a probabilidade de apresentar vestígios é:
A) 16%
B) 24%
C) 30%
D) 40%
E) 60%',
     'D','A expressão “sabendo que ocorreu durante a noite” restringe o universo aos 40 registros noturnos. Assim, 16÷40=0,40=40%.','fácil','active',true,now(),
     jsonb_build_object('type','original_didactic_question','origin','assistant_authored','learning_sequence','probabilidade-basica-idecan','answer_options',jsonb_build_array('16%','24%','30%','40%','60%'),'quick_tip','SABENDO QUE = use o grupo condicionado como denominador.')),
    (v_source_id,v_topic_id,'pcac-seq-idecan-q4','PC-AC 2026',2026,'Investigador de Polícia','AUTORAL — formato semelhante à IDECAN','Estatística','Probabilidade: união, independência, condicional e eventos mutuamente exclusivos',
     'Em um único lançamento de um dado comum, considere A o evento “obter o número 2” e B o evento “obter o número 5”. Assinale a alternativa correta:
A) Os eventos são independentes, pois têm a mesma probabilidade.
B) Os eventos podem ocorrer simultaneamente.
C) Os eventos são mutuamente exclusivos, pois não podem ocorrer juntos.
D) A probabilidade de os dois eventos ocorrerem juntos é de 50%.
E) Os eventos são complementares.',
     'C','Em um único lançamento, só pode ocorrer uma face. Não é possível obter 2 e 5 ao mesmo tempo. Logo, a interseção é zero e os eventos são mutuamente exclusivos. Não são complementares, pois existem outras faces.','fácil','active',true,now(),
     jsonb_build_object('type','original_didactic_question','origin','assistant_authored','learning_sequence','probabilidade-basica-idecan','answer_options',jsonb_build_array('Os eventos são independentes, pois têm a mesma probabilidade.','Os eventos podem ocorrer simultaneamente.','Os eventos são mutuamente exclusivos, pois não podem ocorrer juntos.','A probabilidade de os dois eventos ocorrerem juntos é de 50%.','Os eventos são complementares.'),'quick_tip','Mutuamente exclusivos = não podem acontecer juntos.'))
  on conflict (external_item_key) do nothing;
end $$;
