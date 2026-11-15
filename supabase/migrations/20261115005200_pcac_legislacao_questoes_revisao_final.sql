-- PC-AC 2026 — final legal review and activation of 24 institutional-law questions.
-- One general edital-cutoff item is deliberately kept outside the discipline scope.
-- The source questions are original study items, not official IDECAN questions.

update public.curated_question_catalog
set content_status = 'active',
    verified_at = now(),
    law_version_checked_at = now(),
    didactic_provenance =
      jsonb_set(
        jsonb_set(
          jsonb_set(coalesce(didactic_provenance, '{}'::jsonb),
                    '{review_state}', '"final_legal_review_passed"'::jsonb),
          '{activation_blocked}', 'false'::jsonb),
        '{final_review_note}',
        to_jsonb(case
          when external_item_key like 'pcac-2026-legislacao-institucional-lote1-%'
            then 'Revisado contra o texto atualizado da Lei nº 14.735/2023 (incluindo veto promulgado em 2024), LC nº 496/2025, Lei nº 2.250/2009, LC nº 525/2026 e edital oficial publicado em 06/11/2026. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote3-q06'
            then 'Revisado contra LC nº 496/2025, arts. 1º a 3º, texto oficial da Assembleia Legislativa do Acre. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote4-q09'
            then 'Revisado contra LC nº 129/2004 consolidada, arts. 120 e 121, inclusive prazo máximo, prorrogação e preservação de vencimentos e prerrogativas. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote4-q10'
            then 'Revisado contra LC nº 129/2004 consolidada, art. 127, redação da LC nº 293/2014: prazo de 30 dias prorrogável mediante solicitação fundamentada, sem fixar limite expresso de uma única prorrogação. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote4-q11'
            then 'Revisado contra LC nº 129/2004 consolidada, art. 118: prescrição de seis meses para advertência, dois anos para suspensão e cinco anos para demissão a bem do serviço público, cassação de aposentadoria ou disponibilidade. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote4-q12'
            then 'Revisado contra LC nº 129/2004 consolidada, art. 131, §§ 1º e 2º, com redação da LC nº 208/2010. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote3-q01'
            then 'Revisado contra LC nº 129/2004 consolidada, art. 100, incisos I, III, IV e V. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote3-q02'
            then 'Revisado contra LC nº 129/2004 consolidada, arts. 124 a 128, especialmente art. 126. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote3-q03'
            then 'Revisado contra LC nº 129/2004 consolidada, art. 129. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote3-q04'
            then 'Revisado contra LC nº 129/2004 consolidada, art. 130 e parágrafo único. Questão autoral e não oficial IDECAN.'
          when external_item_key = 'pcac-2026-institucional-lote3-q05'
            then 'Revisado contra LC nº 129/2004 consolidada, arts. 105, 106, 106-A e 106-B. Questão autoral e não oficial IDECAN.'
          else 'Revisado contra a norma primária indicada na base legal e sua redação vigente na data de publicação do edital PC-AC 2026. Questão autoral e não oficial IDECAN.'
        end))
where external_item_key in ('pcac-2026-institucional-lote3-q01','pcac-2026-institucional-lote3-q02','pcac-2026-institucional-lote3-q03','pcac-2026-institucional-lote3-q04','pcac-2026-institucional-lote3-q05','pcac-2026-institucional-lote3-q06','pcac-2026-institucional-lote4-q09','pcac-2026-institucional-lote4-q10','pcac-2026-institucional-lote4-q11','pcac-2026-institucional-lote4-q12','pcac-2026-legislacao-institucional-lote1-q01','pcac-2026-legislacao-institucional-lote1-q02','pcac-2026-legislacao-institucional-lote1-q03','pcac-2026-legislacao-institucional-lote1-q04','pcac-2026-legislacao-institucional-lote1-q05','pcac-2026-legislacao-institucional-lote1-q06','pcac-2026-legislacao-institucional-lote1-q07','pcac-2026-legislacao-institucional-lote1-q08','pcac-2026-legislacao-institucional-lote1-q09','pcac-2026-legislacao-institucional-lote1-q10','pcac-2026-legislacao-institucional-lote1-q11','pcac-2026-legislacao-institucional-lote1-q12','pcac-2026-legislacao-institucional-lote1-q13','pcac-2026-legislacao-institucional-lote1-q14')
  and contest_year = 2026
  and subject = 'Legislação Institucional';

update public.curated_question_catalog
set content_status = 'under_review',
    verified_at = now(),
    law_version_checked_at = now(),
    didactic_provenance =
      jsonb_set(
        jsonb_set(coalesce(didactic_provenance, '{}'::jsonb),
                  '{review_state}', '"kept_out_of_subject_scope"'::jsonb),
        '{final_review_note}',
        '"A regra dos subitens 11.5.4/11.5.5 é uma orientação geral do edital sobre data de corte legislativa, não conteúdo autônomo do Anexo III. Manter fora do banco de questões da disciplina Legislação Institucional até eventual decisão editorial de criar uma categoria específica de regras do edital."'::jsonb)
where external_item_key = 'pcac-2026-legislacao-institucional-lote1-q15'
  and contest_year = 2026
  and subject = 'Legislação Institucional';
