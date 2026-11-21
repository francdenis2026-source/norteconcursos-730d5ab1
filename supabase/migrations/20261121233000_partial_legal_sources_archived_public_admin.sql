-- Record partial legal-source verification, without approval or publication.
UPDATE public.study_materials
SET legal_review=jsonb_build_object(
 'status','pending_full_review',
 'scope','Conferência parcial das fontes oficiais; não constitui certificação jurídica integral.',
 'checked_at','2026-11-21',
 'verified_points',jsonb_build_array(
   'CF/1988, art. 37: princípios da administração pública',
   'CF/1988, arts. 70 e 71: controle externo pelo Congresso Nacional com auxílio do TCU',
   'DL 200/1967, art. 6º: planejamento, coordenação, descentralização, delegação de competência e controle'
 ),
 'official_sources',jsonb_build_array(
   'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
   'https://www.planalto.gov.br/ccivil_03/decreto-lei/del0200.htm'
 ),
 'remaining','Verificar dispositivos específicos e vigência integral, histórico de reformas, aderência ao edital e razão do arquivamento antes de ativar.'
),updated_at=now()
WHERE discipline='Administração Pública' AND content_status='archived' AND legal_review IS NULL;