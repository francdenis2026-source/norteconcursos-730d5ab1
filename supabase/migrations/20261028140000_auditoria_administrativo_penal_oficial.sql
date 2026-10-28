begin;
update public.study_materials
set source_note=coalesce(source_note,'') || ' Auditoria oficial concluída em 28/10/2026: conferido o texto legal vigente, alterações legislativas e necessidade de separar redação histórica de regra atual.',
    legal_basis=legal_basis || case when discipline='Direito Administrativo' then '[{"title":"Lei nº 14.133/2021 — Planalto","url":"https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm"},{"title":"Constituição Federal — Planalto","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb else '[{"title":"Código Penal compilado — Planalto","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"},{"title":"Lei nº 14.994/2024 — Planalto","url":"https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14994.htm"},{"title":"Lei nº 15.358/2026 — Planalto","url":"https://planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15358.htm"}]'::jsonb end,
    law_version_checked_at=now(), reviewed_at=now(), updated_at=now()
where content_status='active' and discipline in ('Direito Administrativo','Direito Penal');
update public.study_materials set body_md=body_md || $penal$
## Atualização legislativa conferida em 28/10/2026

A Lei nº 14.994/2024 tornou o feminicídio crime autônomo no art. 121-A do Código Penal e alterou normas correlatas. A Lei nº 15.358/2026 instituiu o marco legal de combate ao crime organizado e alterou o Código Penal, o CPP e leis especiais. Questões antigas devem ser confrontadas com esses textos.$penal$, source_note=coalesce(source_note,'') || ' Atualizado com conferência das Leis nº 14.994/2024 e nº 15.358/2026.' where slug='penal-acervo-consolidado-2026';
update public.study_materials set body_md=body_md || $adm$
## Atualização de licitações conferida em 28/10/2026

A Lei nº 8.666/1993 aparece apenas como referência histórica nos materiais antigos. Para novas licitações e contratos, a referência principal é a Lei nº 14.133/2021, observadas alterações posteriores e regulamentos aplicáveis.$adm$, source_note=coalesce(source_note,'') || ' Atualizado com conferência da Lei nº 14.133/2021 e alterações posteriores.' where slug='administrativo-acervo-licitacoes-14133';
commit;
