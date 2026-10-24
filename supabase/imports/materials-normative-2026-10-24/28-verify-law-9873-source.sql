-- Atualização de metadados da fonte oficial Lei nº 9.873/1999.
-- O texto oficial do Planalto foi consultado em 2026-10-24.
-- Atualiza apenas a fonte específica que estava em revisão; não altera questões.
begin;
do $guard$
begin
  if not exists (
    select 1 from public.content_sources
    where id='badf2944-50f6-429e-88a9-077fc8c8a4d3'
      and url='https://www.planalto.gov.br/ccivil_03/leis/l9873.htm'
      and status='em_revisao'
  ) and not exists (
    select 1 from public.content_sources
    where id='badf2944-50f6-429e-88a9-077fc8c8a4d3'
      and url='https://www.planalto.gov.br/ccivil_03/leis/l9873.htm'
      and status='vigente'
      and title='Lei nº 9.873/1999 — prescrição da ação punitiva federal'
  ) then
    raise exception 'Fonte alterada em concorrência; conferir manualmente';
  end if;
end $guard$;
update public.content_sources
set title='Lei nº 9.873/1999 — prescrição da ação punitiva federal',
    status='vigente',
    checked_at=now(),
    notes='Texto oficial do Planalto consultado em 24/10/2026. Abrange prescrição da ação punitiva federal, prescrição intercorrente, causas de interrupção e prescrição da execução da multa; não se aplica a infrações funcionais nem a procedimentos tributários.'
where id='badf2944-50f6-429e-88a9-077fc8c8a4d3'
  and url='https://www.planalto.gov.br/ccivil_03/leis/l9873.htm'
  and status='em_revisao';
commit;
