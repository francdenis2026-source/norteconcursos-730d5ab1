-- Keep legal-subject and statutory-basis questions out of the active trainer until source/version review is completed.
update public.curated_question_catalog
set content_status = 'under_review'
where external_item_key in ('pcac-const-art5-01','pcac-const-art37-01','pcac-penal-falsidade-01','pcac-penal-fraude-01','pcac-adm-org-01','pcac-adm-atos-01','pcac-acre-resex-01');