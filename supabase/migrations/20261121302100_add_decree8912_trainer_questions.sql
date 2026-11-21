with q as (
 select * from (values
 ('pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-dec8912-art6','Decreto nº 8.912/2018 — instauração','Segundo o art. 6º do Decreto nº 8.912/2018, como se inicia formalmente o processo de promoção?','(A) Por requerimento verbal do servidor.\n(B) Mediante portaria do Secretário de Estado da Polícia Civil.\n(C) Por decisão exclusiva do chefe imediato.\n(D) Por publicação de edital do Conselho Superior.\n(E) Automaticamente ao completar 36 meses.','B','O art. 6º determina que o processo de promoção se realize mediante portaria do Secretário de Estado da Polícia Civil. Completar o interstício, sozinho, não substitui a instauração formal do processo.'),
 ('pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-dec8912-art7','Decreto nº 8.912/2018 — contagem do interstício','Como o art. 7º do Decreto nº 8.912/2018 determina a apuração do interstício para habilitação à promoção?','(A) Apenas em meses corridos desde a posse.\n(B) Em dias, a partir do ingresso no serviço público ou da vigência da última promoção.\n(C) Em anos, a partir da publicação do edital do concurso.\n(D) A partir da primeira avaliação de desempenho.\n(E) A partir da homologação do curso de formação, em qualquer hipótese.','B','O art. 7º prevê apuração em dias e fixa como marco inicial o ingresso no serviço público ou a data de vigência da última promoção. A regra posterior da LC nº 526/2026 sobre cessão deve ser considerada quando aplicável.'),
 ('pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','pcac-dec8912-art14','Decreto nº 8.912/2018 — recursos humanos','Qual providência cabe à Gerência de Recursos Humanos, conforme o art. 14, IV, do Decreto nº 8.912/2018?','(A) Homologar a promoção.\n(B) Julgar recurso contra a comissão.\n(C) Comunicar com três meses de antecedência os nomes dos servidores que completarem o tempo mínimo para pleitear promoção.\n(D) Constituir a comissão de promoção.\n(E) Aplicar penalidade disciplinar ao servidor.','C','O art. 14 atribui à Gerência de Recursos Humanos, entre outras tarefas, comunicar com três meses de antecedência ao Secretário e à Comissão Permanente os nomes dos servidores que completarem o tempo mínimo para pleitear promoção.')
 ) as t(material_slug,external_item_key,subtopic,question_text,options_text,answer,explanation)
)
insert into public.curated_question_catalog
(source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,difficulty,content_status,is_original,state,career_category,role_type,tested_topic,import_content_key,import_unique_key,didactic_provenance)
select '43712f0d-aad2-48b5-a685-6937551f2d74','d204d14f-8aa6-4c57-92ad-3fb3c3e901f1',
 external_item_key,'Norte Concursos — treino autoral PC-AC 2026',2026,'Oficial Investigador de Polícia','AUTORAL',
 'Legislação Institucional',subtopic,question_text||E'\n\n'||options_text,answer,explanation,
 'média','active',true,'AC','Polícia Civil','Oficial Investigador de Polícia',
 subtopic,external_item_key,'pcac-2026-'||external_item_key,
 jsonb_build_object('kind','didactic_original','authored',true,'target_exam','PC-AC 2026 — Oficial Investigador de Polícia','not_official_exam',true,'license_note','Questão autoral inédita; não é item oficial da IDECAN','linked_study_material_slug',material_slug,'source_material_slug',material_slug,'source_exam_reference','Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III')
from q
on conflict (source_id,external_item_key) do update set
 question_text=excluded.question_text,official_answer=excluded.official_answer,explanation=excluded.explanation,
 didactic_provenance=excluded.didactic_provenance,content_status='active',subtopic=excluded.subtopic;
