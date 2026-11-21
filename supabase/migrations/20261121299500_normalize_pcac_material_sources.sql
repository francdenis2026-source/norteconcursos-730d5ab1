-- Normalize legacy study_materials.legal_basis strings to the object shape consumed by the library UI.
-- Existing serialized JSON objects are parsed; only verified official URLs are attached.
with normalized as (
 select m.id,
 jsonb_agg(
  case
   when jsonb_typeof(e.value)='object' then e.value
   else
    case
     when trim(e.value #>> '{}') like '{%' then (e.value #>> '{}')::jsonb
     else jsonb_build_object(
      'title',trim(e.value #>> '{}'),
      'url',case
       when trim(e.value #>> '{}') ilike '%Constituição do Estado do Acre%' then 'https://legis.ac.gov.br/detalhar_constituicao'
       when trim(e.value #>> '{}') ilike '%Constituição Federal%' then 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
       when trim(e.value #>> '{}') ilike '%Emenda Constitucional estadual nº 63/2022%' then 'https://legis.ac.gov.br/detalhar_emendas/64'
       when trim(e.value #>> '{}') ilike '%LC Estadual do Acre nº 129/2004%' or trim(e.value #>> '{}') ilike '%LC Estadual nº 129/2004%' or trim(e.value #>> '{}') ilike '%Lei Complementar Estadual do Acre nº 129/2004%' then 'https://legis.ac.gov.br/detalhar/674-1'
       when trim(e.value #>> '{}') ilike '%LC Estadual do Acre nº 39/1993%' or trim(e.value #>> '{}') ilike '%LC Estadual nº 39/1993%' or trim(e.value #>> '{}') ilike '%Lei Complementar Estadual do Acre nº 39/1993%' then 'https://legis.ac.gov.br/detalhar/110'
       when trim(e.value #>> '{}') ilike '%LC Estadual do Acre nº 496/2025%' or trim(e.value #>> '{}') ilike '%LC Estadual nº 496/2025%' or trim(e.value #>> '{}') ilike '%Lei Complementar Estadual do Acre nº 496/2025%' then 'https://legis.ac.gov.br/detalhar_imprimir/6527'
       when trim(e.value #>> '{}') ilike '%LC Estadual do Acre nº 525/2026%' or trim(e.value #>> '{}') ilike '%LC Estadual nº 525/2026%' then 'https://legis.ac.gov.br/detalhar/6864-1'
       when trim(e.value #>> '{}') ilike '%LC Estadual do Acre nº 526/2026%' or trim(e.value #>> '{}') ilike '%LC Estadual nº 526/2026%' then 'https://legis.ac.gov.br/detalhar/6874'
       when trim(e.value #>> '{}') ilike '%Lei Estadual do Acre nº 2.250/2009%' or trim(e.value #>> '{}') ilike '%Lei Estadual nº 2.250/2009%' then 'https://legis.ac.gov.br/detalhar/417-0'
       when trim(e.value #>> '{}') ilike '%Lei Estadual do Acre nº 3.228/2017%' then 'https://legis.ac.gov.br/detalhar/2499'
       when trim(e.value #>> '{}') ilike '%Lei Estadual do Acre nº 3.288/2017%' then 'https://legis.ac.gov.br/detalhar/2741'
       when trim(e.value #>> '{}') ilike '%Lei Estadual nº 3.883/2021%' then 'https://legis.ac.gov.br/detalhar/4985'
       when trim(e.value #>> '{}') ilike '%Lei Federal nº 14.735/2023%' then 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm'
       when trim(e.value #>> '{}') ilike '%Lei Federal nº 14.230/2021%' then 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14230.htm'
       when trim(e.value #>> '{}') ilike '%Lei Federal nº 8.429/1992%' then 'https://www.planalto.gov.br/ccivil_03/leis/l8429.htm'
       when trim(e.value #>> '{}') ilike '%Lei Federal nº 12.876/2013%' then 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12876.htm'
       else null
      end
     )
    end
  end order by e.ord
 ) as basis
 from public.study_materials m
 cross join lateral jsonb_array_elements(coalesce(m.legal_basis,'[]'::jsonb)) with ordinality e(value,ord)
 where m.contest_name='PC-AC 2026' and m.content_status='active'
 and jsonb_typeof(m.legal_basis)='array'
 and exists(select 1 from jsonb_array_elements(m.legal_basis) x where jsonb_typeof(x)='string')
 group by m.id
)
update public.study_materials m
set legal_basis=n.basis,updated_at=now()
from normalized n where m.id=n.id;
