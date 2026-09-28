-- Ranking and star progression created automatically for every registered candidate.
create table if not exists public.user_rank_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_points integer not null default 0 check (total_points >= 0),
  stars integer not null default 1 check (stars between 1 and 5),
  level_name text not null default 'Aspirante',
  completed_simulators integer not null default 0,
  total_questions integer not null default 0,
  total_correct integer not null default 0,
  best_accuracy numeric(5,2) not null default 0,
  last_activity_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_rank_profiles enable row level security;
drop policy if exists "Users read own rank profile" on public.user_rank_profiles;
create policy "Users read own rank profile" on public.user_rank_profiles for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Admins read all rank profiles" on public.user_rank_profiles;
create policy "Admins read all rank profiles" on public.user_rank_profiles for select to authenticated using (public.has_role(auth.uid(),'admin'));
create index if not exists idx_user_rank_profiles_points on public.user_rank_profiles(total_points desc, best_accuracy desc, updated_at asc);

insert into public.user_rank_profiles (user_id)
select id from auth.users on conflict (user_id) do nothing;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email) values (new.id, new.raw_user_meta_data->>'full_name', new.email) on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'user') on conflict (user_id, role) do nothing;
  insert into public.user_streaks (user_id) values (new.id) on conflict (user_id) do nothing;
  insert into public.user_rank_profiles (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

create or replace function public.update_rank_after_simulator()
returns trigger language plpgsql security definer set search_path = public as $$
declare earned_points integer; new_total integer;
begin
  earned_points := greatest(10, (new.correct_answers * 10) - (new.wrong_answers * 2) + case when new.accuracy >= 90 then 100 when new.accuracy >= 80 then 60 when new.accuracy >= 70 then 30 else 0 end);
  insert into public.user_rank_profiles (user_id,total_points,completed_simulators,total_questions,total_correct,best_accuracy,last_activity_at,updated_at)
  values (new.user_id,earned_points,1,new.total_questions,new.correct_answers,new.accuracy,new.finished_at,now())
  on conflict (user_id) do update set total_points=public.user_rank_profiles.total_points+earned_points, completed_simulators=public.user_rank_profiles.completed_simulators+1, total_questions=public.user_rank_profiles.total_questions+new.total_questions, total_correct=public.user_rank_profiles.total_correct+new.correct_answers, best_accuracy=greatest(public.user_rank_profiles.best_accuracy,new.accuracy), last_activity_at=new.finished_at, updated_at=now()
  returning total_points into new_total;
  update public.user_rank_profiles set
    stars=case when new_total>=3000 then 5 when new_total>=1500 then 4 when new_total>=750 then 3 when new_total>=250 then 2 else 1 end,
    level_name=case when new_total>=3000 then 'Elite' when new_total>=1500 then 'Especialista' when new_total>=750 then 'Avançado' when new_total>=250 then 'Competidor' else 'Aspirante' end
  where user_id=new.user_id;
  return new;
end;
$$;

drop trigger if exists update_rank_after_simulator_trigger on public.simulator_attempts;
create trigger update_rank_after_simulator_trigger after insert on public.simulator_attempts for each row execute function public.update_rank_after_simulator();

create or replace function public.get_public_leaderboard(limit_count integer default 20)
returns table (rank_position bigint,user_id uuid,display_name text,total_points integer,stars integer,level_name text,completed_simulators integer,best_accuracy numeric)
language sql stable security definer set search_path = public as $$
  select row_number() over (order by r.total_points desc,r.best_accuracy desc,r.updated_at asc), r.user_id,
    case when coalesce(trim(p.full_name),'')='' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name),'\s+'),1)=1 then trim(p.full_name)
         else split_part(trim(p.full_name),' ',1)||' '||left((regexp_split_to_array(trim(p.full_name),'\s+'))[array_length(regexp_split_to_array(trim(p.full_name),'\s+'),1)],1)||'.' end,
    r.total_points,r.stars,r.level_name,r.completed_simulators,r.best_accuracy
  from public.user_rank_profiles r left join public.profiles p on p.id=r.user_id
  order by r.total_points desc,r.best_accuracy desc,r.updated_at asc limit least(greatest(limit_count,1),100)
$$;
revoke all on function public.get_public_leaderboard(integer) from public;
grant execute on function public.get_public_leaderboard(integer) to authenticated;
