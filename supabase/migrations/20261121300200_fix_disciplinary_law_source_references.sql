update public.study_materials
set legal_basis=jsonb_build_array(
 jsonb_build_object('title','LC nº 39/1993 — texto consolidado, Portal LEGIS do Acre','url','https://legis.ac.gov.br/detalhar/110'),
 jsonb_build_object('title','LC nº 525/2026 — revogação do § 4º do art. 282','url','https://legis.ac.gov.br/detalhar/6864-1')
),source_note='LC nº 39/1993 consolidada, arts. 168 a 208; alterações oficiais registradas no Portal LEGIS, inclusive LC nº 525/2026 (revogação específica do § 4º do art. 282).',
updated_at=now()
where slug='pcac-2026-lc39-deveres-acumulacao-penalidades-prescricao-pad';

update public.study_materials
set legal_basis=jsonb_build_array(
 jsonb_build_object('title','LC nº 129/2004 — texto consolidado, Portal LEGIS do Acre','url','https://legis.ac.gov.br/detalhar/674-1'),
 jsonb_build_object('title','LC nº 208/2010 — alterações do regime disciplinar','url','https://legis.ac.gov.br/detalhar/3897'),
 jsonb_build_object('title','LC nº 293/2014 — alterações do PAD e competências','url','https://legis.ac.gov.br/detalhar/3980'),
 jsonb_build_object('title','LC nº 496/2025 — alterações da carreira policial civil','url','https://legis.ac.gov.br/detalhar/674-1'),
 jsonb_build_object('title','LC nº 526/2026 — alterações recentes da LC nº 129/2004','url','https://legis.ac.gov.br/detalhar/674-1')
),source_note='LC nº 129/2004 consolidada, arts. 100, 124, 129, 130 e 131; redações introduzidas especialmente pela LC nº 208/2010. Conferidas as alterações posteriores da LC nº 496/2025 e LC nº 526/2026 no texto consolidado oficial.',
updated_at=now()
where slug='pcac-2026-lc129-deveres-investigacao-e-processo-disciplinar';

update public.study_materials
set legal_basis=jsonb_build_array(
 jsonb_build_object('title','LC nº 129/2004 — texto consolidado, Portal LEGIS do Acre','url','https://legis.ac.gov.br/detalhar/674-1'),
 jsonb_build_object('title','LC nº 208/2010 — alterações do regime disciplinar','url','https://legis.ac.gov.br/detalhar/3897'),
 jsonb_build_object('title','LC nº 293/2014 — alterações do PAD e competências','url','https://legis.ac.gov.br/detalhar/3980')
),source_note='LC nº 129/2004 consolidada, arts. 129 a 151, com redações relevantes das LCs nº 208/2010 e nº 293/2014; conferir a versão oficial consolidada antes de memorizar prazos.',
updated_at=now()
where slug='pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos';

update public.study_materials
set legal_basis=jsonb_build_array(
 jsonb_build_object('title','LC nº 129/2004 — texto consolidado, Portal LEGIS do Acre','url','https://legis.ac.gov.br/detalhar/674-1'),
 jsonb_build_object('title','LC nº 208/2010 — alterações de sindicância, prazos e penalidades','url','https://legis.ac.gov.br/detalhar/3897'),
 jsonb_build_object('title','LC nº 293/2014 — alterações da LC nº 129/2004','url','https://legis.ac.gov.br/detalhar/3980')
),source_note='LC nº 129/2004 consolidada, arts. 118, 119, 124, 125, 125-A, 126, 127 e 128; alterações da LC nº 208/2010 e LC nº 293/2014. Conferir a redação consolidada oficial para questões literais.',
updated_at=now()
where slug='pcac-2026-lc129-sindicancia-prazos-prescricao-extincao';

update public.study_materials
set legal_basis=jsonb_build_array(
 jsonb_build_object('title','LC nº 129/2004 — texto consolidado, Portal LEGIS do Acre','url','https://legis.ac.gov.br/detalhar/674-1'),
 jsonb_build_object('title','LC nº 208/2010 — alterações das transgressões e penalidades','url','https://legis.ac.gov.br/detalhar/3897'),
 jsonb_build_object('title','LC nº 293/2014 — alterações disciplinares e do PAD','url','https://legis.ac.gov.br/detalhar/3980')
),source_note='LC nº 129/2004 consolidada, arts. 101 a 114, com alterações da LC nº 208/2010 e demais alterações posteriores que incidam no texto; portal oficial LEGIS do Acre.',
updated_at=now()
where slug='pcac-2026-lc129-transgressoes-penalidades-responsabilidades';