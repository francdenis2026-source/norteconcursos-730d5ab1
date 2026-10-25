-- Limites comerciais alinhados ao posicionamento abaixo do mercado.
-- Apenas o Premium permanece ilimitado; Plus tem franquia alta, mas finita.
create or replace function public.daily_question_limit(p_tier text)
returns integer
language sql
immutable
as $$
  select case p_tier
    when 'free' then 20
    when 'essential' then 60
    when 'plus' then 180
    else null
  end
$$;

create or replace function public.monthly_mock_limit(p_tier text)
returns integer
language sql
immutable
as $$
  select case p_tier
    when 'free' then 1
    when 'essential' then 2
    when 'plus' then 4
    else null
  end
$$;
