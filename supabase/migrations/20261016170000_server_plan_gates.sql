-- Recursos que o plano Gratuito não inclui também são recusados no servidor (antes valia só na interface):
-- Flashcards, Redação (caderno de 30 linhas e discursivas). Usa effective_plan_tier (migração 20261016160000),
-- que repete a regra do aplicativo: durante a fase de testes todos valem como Essencial; depois, quem não
-- tem plano pago volta ao Gratuito. Só bloqueia CRIAR (insert): o que o aluno já guardou continua dele.
-- Não cobertos aqui: Cadernos (ficam só no navegador do aluno), Radar do edital e Panorama (leitura de dados
-- públicos calculados no aplicativo) e o contador diário da Biblioteca.

create or replace function public.block_free_plan_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Sem sessão de aluno (service role, importações) ou escrita em nome de outro usuário: não se aplica.
  if auth.uid() is null or new.user_id is distinct from auth.uid() then return new; end if;
  if public.effective_plan_tier(new.user_id) = 'free' then
    raise exception 'Este recurso não está incluído no plano Gratuito.' using errcode = 'P0403';
  end if;
  return new;
end $$;

drop trigger if exists block_free_plan_insert on public.flashcards;
create trigger block_free_plan_insert before insert on public.flashcards
  for each row execute function public.block_free_plan_insert();

drop trigger if exists block_free_plan_insert on public.flashcard_reviews;
create trigger block_free_plan_insert before insert on public.flashcard_reviews
  for each row execute function public.block_free_plan_insert();

drop trigger if exists block_free_plan_insert on public.user_essays;
create trigger block_free_plan_insert before insert on public.user_essays
  for each row execute function public.block_free_plan_insert();

drop trigger if exists block_free_plan_insert on public.essay_submissions;
create trigger block_free_plan_insert before insert on public.essay_submissions
  for each row execute function public.block_free_plan_insert();
