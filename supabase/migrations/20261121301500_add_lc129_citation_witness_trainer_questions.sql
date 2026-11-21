with q as (
 select * from (values
 ('pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos','pcac-pad-citacao-01','LC nº 129/2004 — citação pessoal','Qual é a antecedência mínima da citação pessoal do acusado para a audiência inicial do PAD, conforme o material?','(A) 12 horas.\n(B) 24 horas.\n(C) 48 horas.\n(D) 5 dias.\n(E) 10 dias.','C','O material indica antecedência mínima de 48 horas para a citação pessoal, acompanhada da cópia da portaria com motivo e enquadramento legal.'),
 ('pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos','pcac-pad-edital-02','LC nº 129/2004 — citação por edital','Se o acusado não for encontrado e seu paradeiro for ignorado, qual procedimento de citação o material descreve?','(A) Apenas mensagem eletrônica.\n(B) Edital com prazo de 15 dias, publicado durante três dias no Diário Oficial.\n(C) Carta simples com prazo de 48 horas.\n(D) Citação exclusivamente pelo superior hierárquico.\n(E) Dispensa de citação.','B','O material descreve citação por edital com prazo de 15 dias e publicação durante três dias no Diário Oficial.'),
 ('pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos','pcac-pad-testemunhas-03','LC nº 129/2004 — testemunhas','Quantas testemunhas o acusado pode arrolar, segundo o material?','(A) Até três.\n(B) Até cinco.\n(C) Até seis.\n(D) Até oito.\n(E) Até dez.','D','O material indica que o acusado pode arrolar até oito testemunhas. A comissão também pode arrolar até oito, em limite próprio.'),
 ('pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos','pcac-pad-denunciante-04','LC nº 129/2004 — declarações do denunciante','Conforme o material, quando o denunciante presta declarações e qual é a posição do acusado durante essa inquirição?','(A) Antes da citação, com o acusado presente.\n(B) Entre a citação e o interrogatório; o acusado não assiste, mas conhece as declarações antes de ser interrogado.\n(C) Somente depois da defesa escrita.\n(D) Durante o julgamento pelo Conselho Superior.\n(E) Apenas por escrito, sem acesso posterior do acusado.','B','O material indica que o denunciante presta declarações entre a citação e o interrogatório, salvo risco à sua segurança. O acusado não assiste à inquirição, mas toma conhecimento das declarações antes de ser interrogado.')
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
