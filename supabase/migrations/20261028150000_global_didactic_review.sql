begin;
update public.study_materials
set source_note=coalesce(source_note,'') || ' Revisão didática global concluída em 28/10/2026: explicação organizada em regra, aplicação, conclusão e erro comum; variações foram retiradas da apresentação principal.', updated_at=now()
where content_status='active';
commit;
