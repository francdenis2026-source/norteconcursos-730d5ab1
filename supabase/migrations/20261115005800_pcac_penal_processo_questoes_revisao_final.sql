-- PC-AC 2026 — final legal/editorial review of the 48 Criminal Law and Procedure drafts.
-- 35 are activated after review; 13 semantic duplicates are archived, not deleted.
-- All items are original study questions, not official IDECAN exam questions.

update public.curated_question_catalog
set content_status='active',
    verified_at=now(),
    law_version_checked_at=now(),
    didactic_provenance=jsonb_set(
      jsonb_set(
        jsonb_set(coalesce(didactic_provenance,'{}'::jsonb),
                  '{review_state}','"final_legal_review_passed"'::jsonb),
        '{activation_blocked}','false'::jsonb),
      '{final_review_note}',
      to_jsonb('Revisado contra legislação federal consolidada vigente até a data de corte do edital PC-AC 2026 (06/11/2026), com conferência de gabarito, pertinência ao Anexo III e explicação. Questão autoral, não oficial IDECAN.'::text))
where external_item_key in ('pcac-2026-direito-penal-lote-complementar-q01','pcac-2026-direito-penal-lote-complementar-q06','pcac-2026-direito-penal-lote-complementar-q07','pcac-2026-direito-penal-lote-complementar-q08','pcac-2026-direito-penal-lote-complementar-q09','pcac-2026-direito-penal-lote-complementar-q10','pcac-2026-direito-penal-lote-complementar-q11','pcac-2026-penal-lote3-q01','pcac-2026-penal-lote3-q02','pcac-2026-penal-lote3-q03','pcac-2026-penal-lote3-q04','pcac-2026-penal-lote3-q05','pcac-2026-penal-lote3-q06','pcac-2026-penal-lote3-q07','pcac-2026-penal-lote3-q08','pcac-2026-penal-lote4-q01','pcac-2026-penal-lote4-q02','pcac-2026-penal-lote4-q03','pcac-2026-penal-lote4-q04','pcac-2026-processo-lote3-q02','pcac-2026-processo-lote3-q04','pcac-2026-processo-lote3-q05','pcac-2026-processo-lote3-q06','pcac-2026-processo-lote3-q07','pcac-2026-processo-lote3-q08','pcac-2026-processo-lote4-q05','pcac-2026-processo-lote4-q08','pcac-2026-processo-penal-lote2-q01','pcac-2026-processo-penal-lote2-q02','pcac-2026-processo-penal-lote2-q03','pcac-2026-processo-penal-lote2-q04','pcac-2026-processo-penal-lote2-q05','pcac-2026-processo-penal-lote2-q06','pcac-2026-processo-penal-lote2-q10','pcac-2026-processo-penal-lote2-q11')
  and contest_year=2026
  and subject='Noções de Direito Penal e Processual Penal'
  and content_status='draft';

update public.curated_question_catalog q
set content_status='archived',
    verified_at=now(),
    law_version_checked_at=now(),
    didactic_provenance=jsonb_set(
      jsonb_set(coalesce(q.didactic_provenance,'{}'::jsonb),
                '{review_state}','"archived_semantic_duplicate"'::jsonb),
      '{final_review_note}',
      to_jsonb(('Arquivada por duplicidade temática; questão ativa de referência: ' || d.duplicate_of || '.')::text))
from (values
('pcac-2026-direito-penal-lote-complementar-q02','pcac26-autoria-draft-56'),
('pcac-2026-direito-penal-lote-complementar-q03','pcac26-autoria-draft-54'),
('pcac-2026-direito-penal-lote-complementar-q04','pcac26-autoria-draft-55'),
('pcac-2026-direito-penal-lote-complementar-q05','pcac26-autoria-draft-58'),
('pcac-2026-direito-penal-lote-complementar-q12','pcac26-autoria-draft-2'),
('pcac-2026-processo-lote3-q01','pcac26-autoria-draft-43'),
('pcac-2026-processo-lote3-q03','pcac26-autoria-draft-45'),
('pcac-2026-processo-lote4-q06','pcac26-penal-proc-205-art158-167-corpo-delito'),
('pcac-2026-processo-lote4-q07','pcac26-penal-proc-207-art159-perito-nao-oficial'),
('pcac-2026-processo-penal-lote2-q07','pcac26-penal-proc-204-art155-prova-investigacao'),
('pcac-2026-processo-penal-lote2-q08','pcac26-penal-proc-205-art158-167-corpo-delito'),
('pcac-2026-processo-penal-lote2-q09','pcac26-autoria-draft-43'),
('pcac-2026-processo-penal-lote2-q12','pcac26-penal-proc-209-arts280-281-suspeicao-interprete')
) as d(external_item_key,duplicate_of)
where q.external_item_key=d.external_item_key
  and q.contest_year=2026
  and q.subject='Noções de Direito Penal e Processual Penal'
  and q.content_status='draft';

-- Update the vulnerable-rape item to reflect the absolute presumption in Law 15.353/2026.
update public.curated_question_catalog
set explanation='O art. 217-A, caput, considera vulnerável a pessoa menor de 14 anos. A Lei nº 15.353/2026 acrescentou o § 4º-A, que declara absoluta a presunção de vulnerabilidade e inadmissível sua relativização; o § 5º determina a aplicação das penas independentemente do consentimento, experiência sexual anterior ou gravidez. Assim, namoro, consentimento ou experiência sexual não afastam o tipo básico.',
    legal_basis=coalesce(legal_basis,'[]'::jsonb) || jsonb_build_array(jsonb_build_object(
      'lei','Lei nº 15.353/2026',
      'url','https://legis.senado.leg.br/norma/42878591/publicacao/42881818',
      'title','Lei nº 15.353/2026 — presunção absoluta de vulnerabilidade',
      'artigo','art. 2º; alteração do art. 217-A, §§ 4º-A e 5º')),
    didactic_provenance=jsonb_set(coalesce(didactic_provenance,'{}'::jsonb),
      '{review_note_2026_11_15}',
      to_jsonb('Atualizada a explicação para refletir a Lei nº 15.353/2026 e a presunção absoluta de vulnerabilidade.'::text))
where external_item_key='pcac-2026-penal-lote3-q03';

-- Add the controlling STF precedent for temporary detention.
update public.curated_question_catalog
set legal_basis=coalesce(legal_basis,'[]'::jsonb) || jsonb_build_array(jsonb_build_object(
      'lei','STF — ADIs 3.360 e 4.109',
      'url','https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=481715&ori=1',
      'title','STF define critérios para decretação da prisão temporária',
      'artigo','cinco requisitos cumulativos')),
    didactic_provenance=jsonb_set(coalesce(didactic_provenance,'{}'::jsonb),
      '{review_note_2026_11_15}',
      to_jsonb('Fundamento jurisprudencial do STF adicionado à base legal da questão.'::text))
where external_item_key='pcac-2026-processo-lote3-q08';

-- Add the current statutory basis for the custody hearing.
update public.curated_question_catalog
set legal_basis=coalesce(legal_basis,'[]'::jsonb) || jsonb_build_array(jsonb_build_object(
      'lei','Lei nº 15.358/2026',
      'url','https://www2.camara.leg.br/legin/fed/lei/2026/lei-15358-24-marco-2026-798846-norma-pl.html',
      'title','Lei nº 15.358/2026 — alteração do art. 310 do CPP',
      'artigo','art. 2º; nova redação do art. 310')),
    didactic_provenance=jsonb_set(coalesce(didactic_provenance,'{}'::jsonb),
      '{review_note_2026_11_15}',
      to_jsonb('Fundamento da redação atual do art. 310 do CPP adicionado à base legal.'::text))
where external_item_key='pcac-2026-processo-lote3-q05';

-- Record the 2025 CPP amendment considered in the preventive-detention item.
update public.curated_question_catalog
set legal_basis=coalesce(legal_basis,'[]'::jsonb) || jsonb_build_array(jsonb_build_object(
      'lei','Lei nº 15.272/2025',
      'url','https://legis.senado.leg.br/norma/41759201',
      'title','Lei nº 15.272/2025 — alterações no CPP sobre prisão preventiva',
      'artigo','alterações dos arts. 310, 310-A e 312')),
    didactic_provenance=jsonb_set(coalesce(didactic_provenance,'{}'::jsonb),
      '{review_note_2026_11_15}',
      to_jsonb('Atualização normativa de 2025 adicionada à base legal da questão de prisão preventiva.'::text))
where external_item_key='pcac-2026-processo-lote3-q06';
