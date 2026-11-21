-- Clarify complement probability example in the PC-AC statistics trainer.
update public.study_materials m
set quiz=(
 select jsonb_agg(
  case when x.ordinality=3 then jsonb_set(x.value,'{why}',to_jsonb(((x.value->>'why') || ' O complemento é o evento contrário: se A representa 30% dos resultados, todos os resultados restantes representam 70%. A soma precisa fechar 100%: 30% + 70% = 100%.')::text),true)
  else x.value end order by x.ordinality
 )
 from jsonb_array_elements(m.quiz) with ordinality x(value,ordinality)
),updated_at=now()
where m.contest_name='PC-AC 2026'
and m.discipline='Estatística'
and m.slug='pcac-2026-estatistica-06-probabilidade-eventos-condicional';
