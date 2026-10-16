-- Figuras (cartaz, gráfico, esquema) que fazem parte do enunciado de questões de prova.
alter table public.board_exam_questions add column if not exists figure_urls text[] not null default '{}';
-- @@
comment on column public.board_exam_questions.figure_urls is 'URLs públicas das figuras do enunciado, na ordem em que aparecem no caderno.';
-- @@
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('question-figures', 'question-figures', true, 5242880, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
