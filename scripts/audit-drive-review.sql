with staging as (
 select id,drive_id,payload,content_status,
 md5(regexp_replace(lower(regexp_replace(regexp_replace(payload->>'question_text_candidate','(?is)\s+Certo\s+Errado.*$',''),'^[[:space:]]*[0-9]+[.)]?[[:space:]]*','')),'[^[:alnum:]]','','g')) as fingerprint
 from public.drive_question_import_candidates
), existing as (
 select 'catalog' as origin,id,external_item_key,md5(regexp_replace(lower(question_text),'[^[:alnum:]]','','g')) as fingerprint from public.curated_question_catalog
 union all select 'official',id,null::text,md5(regexp_replace(lower(question_text),'[^[:alnum:]]','','g')) from public.official_exam_questions
 union all select 'bank',id,null::text,md5(regexp_replace(lower(question_text),'[^[:alnum:]]','','g')) from public.question_bank
), matches as (
 select s.id,s.drive_id,s.payload->>'source_title' as source_title,s.payload->>'source_item_number' as item,e.origin,e.id as existing_id,coalesce(e.external_item_key='drive-'||s.drive_id||'-'||(s.payload->>'source_item_number'),false) as same_source_item
 from staging s join existing e using(fingerprint)
)
select jsonb_build_object(
 'documents_md5',(select md5(string_agg(drive_id||':'||md5(raw_text),',' order by drive_id collate "C")) from public.drive_question_import_documents),
 'counts',(select jsonb_build_object('documents',(select count(*) from public.drive_question_import_documents),'candidates',count(*),'under_review',count(*) filter(where content_status='under_review'),'obsolete',count(*) filter(where content_status='obsolete'),'rejected',count(*) filter(where content_status='rejected'),'duplicate',count(*) filter(where content_status='duplicate'),'individual_text_review',count(*) filter(where payload ? 'individual_text_review'),'legal_candidates',count(*) filter(where payload->>'legal_review_required'='true'),'with_rule_alerts',count(*) filter(where jsonb_array_length(payload->'rule_alerts')>0),'normalized_duplicate_suggestions',(select count(distinct id) from matches),'published_candidates',count(*) filter(where payload->>'publishable'='true')) from staging),
 'suggested_matches',(select coalesce(jsonb_agg(to_jsonb(m)),'[]'::jsonb) from matches m),
 'rls',(select jsonb_agg(jsonb_build_object('table',c.relname,'enabled',c.relrowsecurity)) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname in('drive_question_import_documents','drive_question_import_candidates')),
 'policies',(select jsonb_agg(jsonb_build_object('table',tablename,'name',policyname,'roles',roles,'using',qual,'check',with_check)) from pg_policies where schemaname='public' and tablename in('drive_question_import_documents','drive_question_import_candidates'))
) as audit;
