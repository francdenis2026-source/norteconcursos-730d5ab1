-- Detalhes de cadastro para o administrador: datas de cadastro e login, plano, pagamentos e pendências.
-- Lê auth.users (inacessível ao cliente), por isso usa security definer com checagem de admin.

-- Linha resumida de todos os alunos (cadastro e último login).
create or replace function public.admin_students_access()
returns table (id uuid, created_at timestamptz, last_sign_in_at timestamptz, email_confirmed boolean)
language sql
stable
security definer
set search_path = public, auth
as $$
  select u.id, u.created_at, u.last_sign_in_at, u.email_confirmed_at is not null
  from auth.users u
  where public.has_role(auth.uid(), 'admin')
$$;
revoke all on function public.admin_students_access() from public;
grant execute on function public.admin_students_access() to authenticated;

-- Ficha completa de um aluno.
create or replace function public.admin_student_details(_user_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare r jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Acesso restrito ao administrador' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'id', u.id,
    'full_name', p.full_name,
    'email', u.email,
    'cpf', p.cpf,
    'created_at', u.created_at,
    'email_confirmed_at', u.email_confirmed_at,
    'last_sign_in_at', u.last_sign_in_at,
    'tier', coalesce(p.subscription_tier, 'free'),
    'is_activated', coalesce(p.is_activated, false),
    'expires_at', p.subscription_expires_at,
    'is_admin', public.has_role(u.id, 'admin'),
    'last_study_date', s.last_activity_date,
    'current_streak', coalesce(s.current_streak, 0),
    'longest_streak', coalesce(s.longest_streak, 0),
    'answered', (select count(*) from public.user_responses x where x.user_id = u.id),
    'correct', (select count(*) from public.user_responses x where x.user_id = u.id and x.is_correct),
    'essays', (select count(*) from public.user_essays x where x.user_id = u.id),
    'exams', (select count(*) from public.student_exam_documents x where x.user_id = u.id),
    'medals', (select count(*) from public.user_achievements x where x.user_id = u.id),
    'paid_total_cents', coalesce((select sum(f.amount_cents) from public.finance_entries f
                                  where f.student_id = u.id and f.kind = 'receita'), 0),
    'payments', coalesce((select jsonb_agg(t order by t.entry_date desc, t.created_at desc) from (
                  select f.entry_date, f.category, f.description, f.amount_cents, f.plan_id, f.created_at
                  from public.finance_entries f
                  where f.student_id = u.id and f.kind = 'receita'
                  order by f.entry_date desc, f.created_at desc limit 8) t), '[]'::jsonb),
    'plan_history', coalesce((select jsonb_agg(t order by t.created_at desc) from (
                  select l.event_type, l.old_tier, l.new_tier, l.created_at, l.metadata->>'reason' as reason
                  from public.subscription_audit_logs l
                  where l.user_id = u.id
                  order by l.created_at desc limit 8) t), '[]'::jsonb)
  ) into r
  from auth.users u
  left join public.profiles p on p.id = u.id
  left join public.user_streaks s on s.user_id = u.id
  where u.id = _user_id;

  return r;
end $$;
revoke all on function public.admin_student_details(uuid) from public;
grant execute on function public.admin_student_details(uuid) to authenticated;
