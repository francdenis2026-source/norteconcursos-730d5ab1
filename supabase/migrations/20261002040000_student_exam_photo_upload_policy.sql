-- Permite que cada aluno envie as fotos das próprias provas (tela "Minhas provas" >
-- "Enviar fotos desta prova"). O arquivo precisa ficar na pasta com o id do próprio usuário
-- dentro do bucket privado 'student-exams'. A leitura continua regida por
-- 20260926010000_student_exam_storage_access.sql (só enxerga o que tem registro no seu nome).

insert into storage.buckets (id, name, public)
values ('student-exams', 'student-exams', false)
on conflict (id) do nothing;

drop policy if exists "Users can upload own student exam files" on storage.objects;
create policy "Users can upload own student exam files"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'student-exams'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
