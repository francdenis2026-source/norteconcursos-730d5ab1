-- Medalhas com progressão real: cada medalha tem uma métrica e uma meta; o servidor concede.
alter table public.achievements add column if not exists metric text;
alter table public.achievements add column if not exists target integer;
alter table public.achievements add column if not exists sort_order integer not null default 100;

insert into public.achievements (code, name, description, metric, target, sort_order) values
('FIRST_10',     'Primeiras 10',          'Resolva 10 questões.',                          'answered', 10,   10),
('ANSWERED_100', 'Centurião',             'Resolva 100 questões.',                         'answered', 100,  11),
('ANSWERED_500', 'Veterano de Questões',  'Resolva 500 questões.',                         'answered', 500,  12),
('ANSWERED_1000','Mil Questões',          'Resolva 1.000 questões.',                       'answered', 1000, 13),
('CORRECT_50',   'Mira Afiada',           'Acumule 50 acertos.',                           'correct',  50,   20),
('CORRECT_250',  'Tiro Certeiro',         'Acumule 250 acertos.',                          'correct',  250,  21),
('CORRECT_1000', 'Elite do Gabarito',     'Acumule 1.000 acertos.',                        'correct',  1000, 22),
('STREAK_3',     'Ritmo Inicial',         'Estude 3 dias seguidos.',                       'streak',   3,    30),
('STREAK_7',     'Semana de Foco',        'Estude 7 dias seguidos.',                       'streak',   7,    31),
('STREAK_30',    'Disciplina de Ferro',   'Estude 30 dias seguidos.',                      'streak',   30,   32),
('MOCK_1',       'Primeiro Simulado',     'Conclua um simulado.',                          'mocks',    1,    40),
('PERFECT_SCORE','Gabarito',              'Acerte 100% de um simulado (mín. 10 questões).','perfect',  1,    41),
('ESSAY_1',      'Pena Afiada',           'Salve sua primeira redação.',                   'essays',   1,    50),
('ESSAY_5',      'Redator Dedicado',      'Salve 5 redações.',                             'essays',   5,    51)
on conflict (code) do update set
  name = excluded.name, description = excluded.description,
  metric = excluded.metric, target = excluded.target, sort_order = excluded.sort_order;

-- Valor atual de cada métrica para o usuário logado.
create or replace function public.medal_metrics(_uid uuid)
returns table (metric text, value integer)
language sql
stable
security definer
set search_path = public
as $$
  select 'answered', count(*)::int from public.user_responses where user_id = _uid
  union all select 'correct', count(*)::int from public.user_responses where user_id = _uid and is_correct
  union all select 'streak', coalesce((select longest_streak from public.user_streaks where user_id = _uid), 0)
  union all select 'mocks', count(*)::int from public.mock_exam_results where user_id = _uid
  union all select 'perfect', count(*)::int from public.mock_exam_results
            where user_id = _uid and total_questions >= 10 and correct_answers = total_questions
  union all select 'essays', count(*)::int from public.user_essays where user_id = _uid
$$;
revoke all on function public.medal_metrics(uuid) from public;

-- Concede as medalhas cuja meta foi atingida e devolve as novas.
create or replace function public.award_achievements()
returns setof public.achievements
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  return query
  with ins as (
    insert into public.user_achievements (user_id, achievement_id)
    select uid, a.id
    from public.achievements a
    join public.medal_metrics(uid) m on m.metric = a.metric
    where a.target is not null and m.value >= a.target
    on conflict (user_id, achievement_id) do nothing
    returning achievement_id
  )
  select a.* from public.achievements a join ins on ins.achievement_id = a.id;
end $$;
revoke all on function public.award_achievements() from public;
grant execute on function public.award_achievements() to authenticated;

-- Progresso de todas as medalhas (conquistadas ou não) do usuário logado.
create or replace function public.medal_progress()
returns table (code text, name text, description text, target integer, current integer, earned boolean)
language sql
stable
security definer
set search_path = public
as $$
  select a.code, a.name, a.description, a.target,
         least(coalesce(m.value, 0), a.target) as current,
         exists (select 1 from public.user_achievements ua where ua.user_id = auth.uid() and ua.achievement_id = a.id) as earned
  from public.achievements a
  left join public.medal_metrics(auth.uid()) m on m.metric = a.metric
  where a.target is not null
  order by a.sort_order
$$;
revoke all on function public.medal_progress() from public;
grant execute on function public.medal_progress() to authenticated;

-- Medalhas só são concedidas pelo servidor: o aluno não pode se auto-conceder.
drop policy if exists "Users can insert own achievements" on public.user_achievements;
