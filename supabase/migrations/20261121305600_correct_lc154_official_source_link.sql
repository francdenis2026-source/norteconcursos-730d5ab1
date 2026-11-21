update public.study_materials
set body_md=replace(body_md,'LC nº 154/2005 (revogações previdenciárias e de tempo de serviço): https://legis.ac.gov.br/detalhar/??? .','LC nº 154/2005 (revogações previdenciárias e de tempo de serviço): https://legis.ac.gov.br/detalhar/128.'),
source_note=replace(coalesce(source_note,''),'LC nº 154/2005','LC nº 154/2005 (https://legis.ac.gov.br/detalhar/128)')
where slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025';