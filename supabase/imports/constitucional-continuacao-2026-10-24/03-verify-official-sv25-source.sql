-- Fonte oficial efetivamente consultada; atualização restrita à SV 25.
-- Preserva título, URL, tipo e observações anteriores. Não altera questões nem material.
begin;
do $guard$
begin
 if not exists(select 1 from public.content_sources where id='08b768e4-0a5f-436f-877c-5d1de1035a60'::uuid and url='https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=1268' and is_official and status='em_revisao' and checked_at='2026-10-11 00:15:07.866941+00'::timestamptz)
 and not exists(select 1 from public.content_sources where id='08b768e4-0a5f-436f-877c-5d1de1035a60'::uuid and url='https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=1268' and is_official and status='vigente' and notes like '%SV25-constitucional-continuacao-20261024%') then
  raise exception 'Fonte alterada em concorrência; nenhuma atualização aplicada.';
 end if;
end $guard$;
update public.content_sources
set status='vigente',checked_at='2026-10-24T20:54:31.843369+00:00'::timestamptz,notes=coalesce(notes,'')||E'\n'||'Consulta oficial da Súmula Vinculante 25 e dos precedentes reproduzidos nesta página em 24/10/2026. Confirmação limitada à vedação de prisão civil de depositário infiel e ao recorte de tratados de direitos humanos empregado no lote; não certifica toda jurisprudência. SHA-256: bc86006e17122d1adbcb84afabff011071c4d7aa66f1fdfb642aa303fefe8861. SV25-constitucional-continuacao-20261024'
where id='08b768e4-0a5f-436f-877c-5d1de1035a60'::uuid and url='https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=1268' and is_official and status='em_revisao' and checked_at='2026-10-11 00:15:07.866941+00'::timestamptz and coalesce(notes,'') not like '%SV25-constitucional-continuacao-20261024%';
select id,url,status,is_official,checked_at from public.content_sources where id='08b768e4-0a5f-436f-877c-5d1de1035a60'::uuid;
commit;
