create table public.study_material_enrichments (
 id uuid primary key,
 material_slug text not null references public.study_materials(slug),
 version text not null,
 source_body_sha256 text not null check(length(source_body_sha256)=64),
 content jsonb not null check(jsonb_typeof(content->'cases')='array' and jsonb_array_length(content->'cases')>0),
 sources jsonb not null default '[]'::jsonb,
 checked_at timestamptz not null,
 status text not null default 'under_review' check(status in ('under_review','active','archived')),
 reviewed_by uuid references auth.users(id),
 reviewed_at timestamptz,
 unique(material_slug,version),
 check(status<>'active' or (reviewed_by is not null and reviewed_at is not null))
);
alter table public.study_material_enrichments enable row level security;
create policy "Read published study examples" on public.study_material_enrichments
 for select to authenticated using(status='active' and exists(select 1 from public.study_materials m where m.slug=material_slug and m.content_status='active'));
grant select on public.study_material_enrichments to authenticated;
create index study_enrichment_material on public.study_material_enrichments(material_slug,checked_at desc);
