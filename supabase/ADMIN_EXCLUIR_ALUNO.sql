-- Permite que administradores excluam a conta de um aluno pelo painel "Alunos e planos".
-- Roda com privilégio do dono, mas só depois de confirmar que quem chama é admin.
create or replace function public.admin_delete_user(_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Apenas administradores podem excluir alunos';
  end if;
  if _user_id = auth.uid() then
    raise exception 'Você não pode excluir a sua própria conta';
  end if;
  if public.has_role(_user_id, 'admin') then
    raise exception 'Não é possível excluir outro administrador';
  end if;
  delete from auth.users where id = _user_id;
end;
$$;

revoke all on function public.admin_delete_user(uuid) from public, anon;
grant execute on function public.admin_delete_user(uuid) to authenticated;
