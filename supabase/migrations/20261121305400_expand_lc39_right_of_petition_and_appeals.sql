update public.study_materials
set body_md=body_md||E'\n\n## 87. Direito de petição e recursos administrativos — LC nº 39/1993, arts. 154 a 159\n\nO Estatuto geral também disciplina como o servidor pode pedir providências e contestar decisões administrativas. Esses artigos são especialmente importantes para não confundir o recurso geral da LC nº 39/1993 com os prazos específicos da sindicância e do PAD da LC nº 129/2004.\n\n- **Art. 154 — direito de petição:** o servidor pode requerer aos Poderes Públicos para defender direito ou interesse legítimo.\n- **Art. 155 — encaminhamento:** o requerimento é dirigido à autoridade competente para decidir e encaminhado por intermédio da autoridade à qual o requerente está imediatamente subordinado.\n- **Art. 156 — pedido de reconsideração:** é dirigido à autoridade que expediu o ato ou proferiu a primeira decisão; não pode ser renovado.\n- **Art. 157 — recurso hierárquico:** cabe contra o indeferimento do pedido de reconsideração e contra decisões dos recursos sucessivamente interpostos. É dirigido à autoridade imediatamente superior e segue, sucessivamente, a escala hierárquica, também por intermédio da chefia imediata.\n- **Art. 158 — prazo:** pedido de reconsideração ou recurso deve ser apresentado em até 30 dias, contados da publicação ou da ciência da decisão pelo interessado.\n- **Art. 159 — efeitos:** pedido de reconsideração e recurso não têm, em regra, efeito suspensivo; a autoridade pode atribuí-lo excepcionalmente. Se o recurso for provido, os efeitos da decisão retroagem à data do ato impugnado.\n\n**Exemplo cotidiano:** um servidor recebe decisão que nega um direito. Primeiro pode pedir reconsideração à própria autoridade que decidiu. Se o pedido for indeferido, pode recorrer à autoridade superior. O prazo geral do Estatuto é de 30 dias, contado da publicação ou da ciência.\n\n**Pegadinha que mistura leis:** não aplicar automaticamente os 30 dias da LC nº 39/1993 aos recursos específicos da LC nº 129/2004. Na sindicância da Polícia Civil, o material registra recurso de 15 dias (art. 128); no PAD da LC nº 129/2004, o recurso contra o relatório tem prazo de 10 dias (art. 148-A). Quando a questão mencionar expressamente o procedimento especial da Polícia Civil, prevalece o prazo especial correspondente; os 30 dias são a regra geral de petição/recurso do Estatuto.\n\n**Fontes:** LC nº 39/1993, arts. 154 a 159, texto compilado: https://legis.ac.gov.br/detalhar/110. A regra do prazo de 30 dias está no art. 158; a tramitação hierárquica, no art. 157; e os efeitos do recurso, no art. 159.\n',
source_note='LC nº 39/1993, arts. 154–159, texto compilado no Portal LEGIS do Estado do Acre; Manual de Sindicância e Processo Administrativo Disciplinar da Corregedoria-Geral da Justiça do Acre para explicação procedimental complementar.',
updated_at=now()
where slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025';

with q as (select * from (values
('pcac-lc39-right-petition-49','LC nº 39/1993 — direito de petição','O art. 158 da LC nº 39/1993 estabelece que o prazo para pedido de reconsideração ou recurso administrativo é de:','(A) 5 dias.\n(B) 10 dias.\n(C) 15 dias.\n(D) 30 dias, contados da publicação ou da ciência da decisão.\n(E) 60 dias.','D','O art. 158 prevê 30 dias, contados da publicação ou da ciência, pelo interessado, da decisão recorrida.'),
('pcac-lc39-appeal-effects-50','LC nº 39/1993 — efeitos do recurso','Conforme o art. 159 da LC nº 39/1993, o pedido de reconsideração e o recurso administrativo:','(A) têm sempre efeito suspensivo.\n(B) têm, em regra, efeito devolutivo; a autoridade pode conceder efeito suspensivo excepcionalmente, e o provimento faz os efeitos retroagirem ao ato impugnado.\n(C) nunca podem ser recebidos após a publicação.\n(D) são sempre encaminhados diretamente ao Governador.\n(E) não podem alterar os efeitos da decisão anterior.','B','O art. 159 estabelece, como regra, ausência de efeito suspensivo, admitindo concessão excepcional; o parágrafo único prevê retroação dos efeitos quando o recurso é provido.')
) as t(external_item_key,subtopic,question_text,options_text,answer,explanation))
insert into public.curated_question_catalog
(source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,difficulty,content_status,is_original,state,career_category,role_type,tested_topic,import_content_key,import_unique_key,didactic_provenance,legal_basis,law_version_checked_at)
select
'43712f0d-aad2-48b5-a685-6937551f2d74',
'd204d14f-8aa6-4c57-92ad-3fb3c3e901f1',
external_item_key,
'Norte Concursos — treino autoral PC-AC 2026',
2026,
'Oficial Investigador de Polícia',
'AUTORAL',
'Legislação Institucional',
subtopic,
question_text||E'\n\n'||options_text,
answer,
explanation,
'média',
'active',
true,
'AC',
'Polícia Civil',
'Oficial Investigador de Polícia',
subtopic,
external_item_key,
'pcac-2026-'||external_item_key,
jsonb_build_object('kind','didactic_original','authored',true,'target_exam','PC-AC 2026 — Oficial Investigador de Polícia','not_official_exam',true,'license_note','Questão autoral inédita; não é item oficial da IDECAN','linked_study_material_slug','pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','source_material_slug','pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025','source_exam_reference','Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III'),
jsonb_build_array(jsonb_build_object('title','Estatuto dos Servidores Públicos Civis do Estado do Acre','lei','Lei Complementar Estadual nº 39/1993','artigo','154 a 159','url','https://legis.ac.gov.br/detalhar/110')),
now()
from q
on conflict (source_id,external_item_key) do update
set question_text=excluded.question_text,
official_answer=excluded.official_answer,
explanation=excluded.explanation,
didactic_provenance=excluded.didactic_provenance,
legal_basis=excluded.legal_basis,
law_version_checked_at=excluded.law_version_checked_at,
content_status='active',
subtopic=excluded.subtopic;