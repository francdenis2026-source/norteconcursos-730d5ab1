-- Conteúdo mínimo autoral para validar o catálogo sem misturar dados fictícios com concursos oficiais.
insert into public.segments (name, slug) values
  ('Segurança Pública', 'seguranca-publica'),
  ('Administrativa', 'administrativa'),
  ('Tribunais', 'tribunais')
on conflict (slug) do nothing;

insert into public.careers (segment_id, name, slug)
select id, 'Carreira Policial', 'carreira-policial' from public.segments where slug = 'seguranca-publica'
on conflict (slug) do nothing;
insert into public.careers (segment_id, name, slug)
select id, 'Carreira Administrativa', 'carreira-administrativa' from public.segments where slug = 'administrativa'
on conflict (slug) do nothing;

insert into public.disciplines (name, slug) values
  ('Língua Portuguesa', 'lingua-portuguesa'),
  ('Raciocínio Lógico', 'raciocinio-logico'),
  ('Informática', 'informatica'),
  ('Direito Constitucional', 'direito-constitucional'),
  ('Direito Administrativo', 'direito-administrativo'),
  ('Atualidades', 'atualidades'),
  ('Administração Pública', 'administracao-publica')
on conflict (slug) do nothing;

insert into public.subjects (discipline_id, name, position)
select id, 'Interpretação de textos', 1 from public.disciplines where slug = 'lingua-portuguesa'
on conflict do nothing;
insert into public.subjects (discipline_id, name, position)
select id, 'Direitos e garantias fundamentais', 1 from public.disciplines where slug = 'direito-constitucional'
on conflict do nothing;

