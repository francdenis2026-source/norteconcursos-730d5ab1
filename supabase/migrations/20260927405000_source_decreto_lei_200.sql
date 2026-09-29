insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('decreto','Decreto-Lei nº 200/1967 – Organização da Administração Federal','Presidência da República','https://www.planalto.gov.br/ccivil_03/decreto-lei/del0200.htm','vigente','Conferidos em 27/09/2026: art. 4º e art. 10.')
on conflict (url) do update set checked_at=now(), status=excluded.status, notes=excluded.notes;
