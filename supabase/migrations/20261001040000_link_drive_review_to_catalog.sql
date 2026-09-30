-- Apenas registra revisão textual já realizada; não publica nem sobrescreve revisões.
with matched as (
 select q.id as candidate_id,c.external_item_key,c.official_answer,c.explanation,c.legal_basis,c.syllabus_topic_id,c.law_version_checked_at
 from public.drive_question_import_candidates q join public.curated_question_catalog c
 on c.external_item_key='drive-'||q.drive_id||'-'||(q.payload->>'source_item_number')
 where q.drive_id='1PKj-SV8e-8bWKTNhIj5LVBIZJaMRHqSn' and c.is_original=false
 and c.content_status='under_review' and c.law_version_checked_at is not null
 and not(q.payload ? 'individual_text_review')
)
update public.drive_question_import_candidates q set payload=q.payload||jsonb_build_object(
 'catalog_external_item_key',m.external_item_key,
 'answer_candidate',m.official_answer,
 'individual_text_review',jsonb_build_object(
   'result','texto_e_gabarito_compativeis_com_fonte_oficial',
   'historical_answer',m.official_answer,'current_answer',m.official_answer,
   'legal_basis',m.legal_basis,'explanation',m.explanation,'checked_at','2026-09-30',
   'publication_blockers',jsonb_build_array('conferencia_visual_do_pdf_pendente','contexto_e_duplicatas_semanticas_pendentes')
 ))
from matched m where q.id=m.candidate_id;
