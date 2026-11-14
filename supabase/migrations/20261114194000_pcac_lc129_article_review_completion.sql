-- Completa a revisão oficial dos arts. 100, 124, 129, 130 e 131 da LC 129/2004.
update public.study_materials
set body_md=replace(body_md,
'**Nota de atualização:** a LC nº 129/2004 recebeu alterações em 2025 e 2026. O conteúdo desta aula reproduz apenas os dispositivos e trechos localizados nas fontes oficiais consultadas; antes de questões de literalidade, conferir a consolidação integral e eventuais alterações pontuais dos artigos citados.',
'**Nota de atualização:** os arts. 100, 124, 129, 130 e 131 foram conferidos na versão consolidada oficial da LC nº 129/2004, incluindo as alterações históricas indicadas no próprio texto. As LCs nº 496/2025 e nº 526/2026 foram verificadas quanto ao seu alcance; não alteraram a redação dos dispositivos específicos tratados nesta aula. A LC nº 526/2026 concentrou as mudanças relevantes ao ingresso, formação, estágio probatório e lotação (arts. 64 a 79-E).')
|| E'\n\n## 7. Conferência de literalidade\n\n- Art. 100: deveres funcionais e representação hierárquica com ampla defesa.\n- Art. 124: investigação preliminar, sindicância ou processo administrativo; despacho fundamentado; vedação de prova ilícita e denúncia anônima; silêncio não pode ser interpretado contra a defesa.\n- Art. 129: PAD obrigatório quando a infração puder levar à demissão a bem do serviço público.\n- Art. 130: abertura determinada pelo Delegado-Geral; recusa sujeita a reexame ex officio pelo Conselho Superior em cinco dias.\n- Art. 131: Comissão Especial de três membros, designada pelo Delegado-Geral, observadas as regras de hierarquia e impedimento.',
legal_review=jsonb_build_object(
 'status','reviewed_against_official_consolidated_text',
 'review_date','2026-11-14',
 'articles',jsonb_build_array(100,124,129,130,131),
 'source','Assembleia Legislativa do Acre, LC 129/2004 consolidada, PDF-texto, páginas 62–82; Portal LEGIS, LC 496/2025 e LC 526/2026.',
 'notes','Arts. 100, 124, 129, 130 e 131 conferidos no texto consolidado oficial. LC 526/2026 altera principalmente o bloco de ingresso, formação, estágio e lotação; não altera os artigos desta aula.'
),
source_note='Assembleia Legislativa do Acre, LC nº 129/2004 consolidada (arts. 100, 124, 129, 130 e 131, páginas 62–82); conferência de alcance das LCs nº 496/2025 e nº 526/2026 em 14/11/2026.',
updated_at=now()
where slug='pcac-2026-lc129-deveres-investigacao-e-processo-disciplinar';
