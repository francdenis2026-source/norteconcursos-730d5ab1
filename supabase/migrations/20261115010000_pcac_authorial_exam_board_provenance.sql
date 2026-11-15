-- PC-AC 2026: distinguish author-created practice questions from applied IDECAN exam items.
-- The affected rows were authored by Norte Concursos; IDECAN is their target style, not their publisher.
with candidates as (
  select id
  from public.curated_question_catalog
  where contest_year = 2026
    and career_name ilike '%Oficial Investigador%'
    and content_status = 'active'
    and exam_board = 'IDECAN'
    and (
      (
        contest_name = 'Polícia Civil do Acre'
        and (
          external_item_key like 'pcac26-autoria-draft-%'
          or external_item_key like 'pcac26-autoria-json-%'
          or didactic_provenance->>'origin' = 'Norte Concursos — questão autoral'
          or didactic_provenance->>'kind' in ('didactic_original', 'original_question')
        )
      )
      or (
        contest_name = 'PC-AC 2026'
        and didactic_provenance->>'authored' = 'true'
      )
    )
)
update public.curated_question_catalog q
set exam_board = 'AUTORAL',
    didactic_provenance = case
      when q.didactic_provenance is null then jsonb_build_object(
        'kind', 'original_question',
        'source', 'Norte Concursos — elaboração autoral para PC-AC 2026',
        'target_exam', 'PC-AC 2026 — Oficial Investigador de Polícia',
        'target_style', 'IDECAN',
        'source_board_style', 'IDECAN',
        'authored', true,
        'not_official_exam', true,
        'review_note', 'Questão autoral de treinamento; não é questão oficial aplicada pela IDECAN.'
      )
      else q.didactic_provenance || jsonb_build_object(
        'authored', true,
        'not_official_exam', true,
        'source_board_style', 'IDECAN'
      )
    end
from candidates c
where q.id = c.id;

-- Keep the classification change auditable and idempotent: only IDECAN-labelled
-- active rows with explicit authorial provenance are changed by this migration.
