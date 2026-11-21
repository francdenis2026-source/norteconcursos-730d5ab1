-- Registra a revisão individual de gabaritos e melhora a correspondência
-- das questões de Matemática Financeira com a aula específica no treinador.
update public.study_materials
set summary = 'Aula 5 — juros simples e compostos, taxas proporcionais, equivalentes, nominais e efetivas, descontos comerciais e racionais e atualização de valores.',
    updated_at = now(),
    practice_review = jsonb_set(
      coalesce(practice_review,'{}'::jsonb),
      '{review_date}',
      '"2026-11-20"'::jsonb
    )
where slug = 'pcac-2026-contabilidade-05-matematica-financeira-juros-descontos';

update public.curated_question_catalog
set verified_at = now(),
    didactic_provenance = coalesce(didactic_provenance,'{}'::jsonb) ||
      jsonb_build_object('review_2026_11_20', jsonb_build_object(
        'status','approved',
        'scope','individual answer-key review',
        'note','Gabarito conferido com a regra, fórmula ou definição do conteúdo programático; questões autorais, não oficiais.'
      ))
where contest_year = 2026
  and career_name ilike '%Investigador%'
  and subject in (
    'Noções de Informática',
    'Tecnologia da Informação e Segurança da Informação',
    'Raciocínio Lógico',
    'Estatística'
  )
  and content_status = 'active';
