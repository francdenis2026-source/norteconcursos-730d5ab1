with revised as (
 select m.id,
 jsonb_agg(
  case
   when e.value->>'title'='LC Estadual do Acre nº 208/2010' then jsonb_set(e.value,'{url}','"https://legis.ac.gov.br/detalhar/3897"'::jsonb,true)
   when e.value->>'title'='LC Estadual do Acre nº 293/2014' then jsonb_set(e.value,'{url}','"https://legis.ac.gov.br/detalhar/3980"'::jsonb,true)
   when e.value->>'title'='LC Estadual do Acre nº 51/1996' then jsonb_set(e.value,'{url}','"https://legis.ac.gov.br/detalhar/111-1"'::jsonb,true)
   when e.value->>'title'='Promulgação de vetos publicada em 13/06/2024' then jsonb_set(e.value,'{url}','"https://pesquisa.in.gov.br/imprensa/servlet/INPDFViewer?captchafield=firstAccess&data=13%2F06%2F2024&jornal=515&pagina=24"'::jsonb,true)
   else e.value
  end order by e.ord
 ) legal_basis
 from public.study_materials m
 cross join lateral jsonb_array_elements(coalesce(m.legal_basis,'[]'::jsonb)) with ordinality e(value,ord)
 where m.contest_name='PC-AC 2026' and m.content_status='active' and m.discipline='Legislação Institucional'
 and e.value->>'url' is null
 and e.value->>'title' in ('LC Estadual do Acre nº 208/2010','LC Estadual do Acre nº 293/2014','LC Estadual do Acre nº 51/1996','Promulgação de vetos publicada em 13/06/2024')
 group by m.id
)
update public.study_materials m set legal_basis=r.legal_basis,updated_at=now()
from revised r where m.id=r.id;