with o as (
select q.*,coalesce(t.content_status='current' and e.status='active',false) valid_topic
from public.official_exam_questions q left join public.syllabus_topics t on t.id=coalesce(q.current_syllabus_topic_id,q.syllabus_topic_id)
left join public.syllabus_editions e on e.id=t.edition_id
), c as (
select q.*,coalesce(t.content_status='current' and e.status='active',false) valid_topic
from public.curated_question_catalog q left join public.syllabus_topics t on t.id=q.syllabus_topic_id
left join public.syllabus_editions e on e.id=t.edition_id
), ready_o as (
select * from o where content_status='active' and official_answer<>'X' and not coalesce(context_review_required,false) and valid_topic
and public.has_verified_question_basis(subject,legal_basis,law_version_checked_at)
and (not coalesce(legal_review_required,false) or (coalesce(legal_audit_completed,false) and public.has_verified_question_basis('Direito',legal_basis,law_version_checked_at)))
), ready_c as (
select * from c where content_status='active' and official_answer<>'X' and valid_topic
and public.has_verified_question_basis(subject,legal_basis,law_version_checked_at)
)
select jsonb_build_object('summary_before',public.get_public_question_summary(),
'official_holds',(select count(*) from o where content_status='active')-(select count(*) from ready_o),
'catalog_holds',(select count(*) from c where content_status='active')-(select count(*) from ready_c),
'personal_holds',(select count(*) from public.question_bank where content_status='active'),
'available_after_proposal',(select count(*) from ready_o)+(select count(*) from ready_c)+(select count(*) from public.board_exam_questions where content_status='active'),
'official_remaining',(select count(*) from ready_o),'catalog_remaining',(select count(*) from ready_c)) as proposed_impact;
