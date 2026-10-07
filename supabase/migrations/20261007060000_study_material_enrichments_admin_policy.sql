-- Hoje só o script externo (scripts/import-study-enrichment.mjs, com chave de
-- service-role) consegue gravar em study_material_enrichments — não existe
-- política de RLS que permita um admin logado no próprio app publicar um
-- exemplo/ilustração. Isso obriga a pedir pra alguém rodar SQL manualmente
-- toda vez. Replica aqui a mesma política que study_materials já tem: admin
-- (has_role) pode gerenciar via UPSERT/UPDATE feito pela própria sessão
-- autenticada, com reviewed_by/reviewed_at preenchidos pelo auth.uid() real
-- de quem publicou — nunca por automação.
begin;

drop policy if exists "Admins manage study material enrichments" on public.study_material_enrichments;
create policy "Admins manage study material enrichments" on public.study_material_enrichments
for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

commit;
