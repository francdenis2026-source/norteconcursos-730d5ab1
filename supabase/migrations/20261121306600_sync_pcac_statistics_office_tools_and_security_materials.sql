begin;
insert into public.study_materials select * from jsonb_populate_recordset(null::public.study_materials, $materials$[]$materials$::jsonb) on conflict (slug) do nothing;
insert into public.curated_question_catalog select * from jsonb_populate_recordset(null::public.curated_question_catalog, $questions$[]$questions$::jsonb) on conflict (source_id, external_item_key) do nothing;
commit;