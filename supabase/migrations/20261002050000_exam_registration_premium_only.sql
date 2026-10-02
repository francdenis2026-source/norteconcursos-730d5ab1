-- Cadastro das próprias provas (tela "Minhas provas" > "Adicionar prova" e envio de fotos) é
-- um recurso do plano mais completo (Premium). A tela esconde o recurso para os outros planos,
-- mas a regra de verdade fica aqui no banco: só admin ou Premium com assinatura em dia consegue
-- criar registros em student_exam_documents e enviar arquivos ao bucket 'student-exams'.
-- A leitura continua liberada para o dono dos próprios registros.

create or replace function public.can_register_student_exams(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.has_role(p_user, 'admin')
    or exists (
      select 1
      from public.profiles p
      where p.id = p_user
        and p.subscription_tier = 'premium'
        and (p.subscription_expires_at is null or p.subscription_expires_at > now())
    );
$$;

grant execute on function public.can_register_student_exams(uuid) to authenticated;

drop policy if exists "Users can insert own exam documents" on public.student_exam_documents;
create policy "Users can insert own exam documents"
  on public.student_exam_documents for insert to authenticated
  with check (
    auth.uid() = user_id
    and public.can_register_student_exams(auth.uid())
  );

drop policy if exists "Users can upload own student exam files" on storage.objects;
create policy "Users can upload own student exam files"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'student-exams'
    and (storage.foldername(name))[1] = auth.uid()::text
    and public.can_register_student_exams(auth.uid())
  );
