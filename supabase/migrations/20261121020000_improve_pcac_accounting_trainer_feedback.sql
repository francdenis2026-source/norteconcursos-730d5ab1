-- Improve contextual feedback for PC-AC accounting trainer items.
-- Preserve every question, answer key, option and order.
-- Replace only the generic feedback used by the 43 true/false items
-- and correct three mismatched tips identified during the audit.

with rebuilt as (
  select m.id,
         jsonb_agg(
           case
             when coalesce(x.value->>'wrong_feedback','') ilike '%provavelmente confundiu o conceito%'
               and coalesce(x.value->>'a','')='true'
             then jsonb_set(
                    x.value,
                    '{wrong_feedback}',
                    to_jsonb(('A afirmação está CERTA. ' || coalesce(x.value->>'why','') ||
                      case when coalesce(x.value->>'tip','')<>'' then E'\n\nDica para fixar: ' || (x.value->>'tip') else '' end)::text)
                  )
             when m.slug='pcac-2026-contabilidade-02-contas-receitas-despesas-fatos' and x.ordinality=6
               then jsonb_set(x.value,'{tip}',to_jsonb('Ato contábil não altera o patrimônio; fato contábil altera. Se houver pagamento, recebimento ou outro efeito patrimonial, já não é mero ato.'::text))
             when m.slug='pcac-2026-contabilidade-05-matematica-financeira-juros-descontos' and x.ordinality=4
               then jsonb_set(x.value,'{tip}',to_jsonb('Para calcular percentual: transforme 10% em 0,10 e multiplique pela base: 500 × 0,10 = R$ 50.'::text))
             when m.slug='pcac-2026-contabilidade-05-matematica-financeira-juros-descontos' and x.ordinality=16
               then jsonb_set(x.value,'{tip}',to_jsonb('Desconto comercial simples: D = N × i × n. Substitua: 2.000 × 0,02 × 3 = R$ 120.'::text))
             else x.value
           end order by x.ordinality
         ) as quiz
  from public.study_materials m
  cross join lateral jsonb_array_elements(m.quiz) with ordinality x(value,ordinality)
  where m.contest_name='PC-AC 2026'
    and m.discipline ilike '%contabilidade%'
  group by m.id
)
update public.study_materials m
set quiz=rebuilt.quiz, updated_at=now()
from rebuilt
where m.id=rebuilt.id;
