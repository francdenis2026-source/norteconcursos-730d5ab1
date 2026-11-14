-- Corrige metadados de fonte dos nove materiais de Direito Penal e Processo Penal do PC-AC 2026.
-- A revisão jurídica formal permanece pendente; não marcar legal_review como aprovada.
-- As três aulas novas receberam timestamp futuro na migration anterior; limpar o campo até revisão
-- artigo por artigo, evitando declarar uma conferência temporal que não ocorreu.

update public.study_materials
set
  legal_basis = case slug
    when 'pcac-2026-penal-01-aplicacao-lei-penal' then '[
      {"title":"Código Penal — Decreto-Lei nº 2.848/1940, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-penal-02-teoria-crime' then '[
      {"title":"Código Penal — Decreto-Lei nº 2.848/1940, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-penal-03-crimes-pessoa-patrimonio' then '[
      {"title":"Código Penal — Decreto-Lei nº 2.848/1940, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-penal-04-crimes-sexuais-fe-publica' then '[
      {"title":"Código Penal — Decreto-Lei nº 2.848/1940, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-penal-05-crimes-administracao-justica' then '[
      {"title":"Código Penal — Decreto-Lei nº 2.848/1940, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-penal-06-tortura-abuso-autoridade' then '[
      {"title":"Lei nº 9.455/1997 — Crimes de tortura, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/leis/l9455.htm"},
      {"title":"Lei nº 13.869/2019 — Abuso de autoridade, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-processo-penal-07-inquerito-policial' then '[
      {"title":"Código de Processo Penal — Decreto-Lei nº 3.689/1941, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"},
      {"title":"Lei nº 12.037/2009 — Identificação criminal","url":"https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm"},
      {"title":"Lei nº 7.960/1989 — Prisão temporária","url":"https://www.planalto.gov.br/ccivil_03/leis/l7960.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos' then '[
      {"title":"Código de Processo Penal — Decreto-Lei nº 3.689/1941, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    when 'pcac-2026-processo-penal-09-identificacao-prisoes-cautelares' then '[
      {"title":"Código de Processo Penal — Decreto-Lei nº 3.689/1941, texto compilado","url":"https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm"},
      {"title":"Lei nº 12.037/2009 — Identificação criminal","url":"https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm"},
      {"title":"Lei nº 7.960/1989 — Prisão temporária","url":"https://www.planalto.gov.br/ccivil_03/leis/l7960.htm"},
      {"title":"Edital nº 001 SEAD/PCAC, de 05/11/2026 — Anexo III","url":"https://sead.ac.gov.br/wp-content/uploads/2026/11/Edital-no-001-PCAC-Edital-de-abertura-05-11-2026.pdf"}
    ]'::jsonb
    else legal_basis
  end,
  source_note = case
    when slug like 'pcac-2026-processo-penal-%' then 'Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III, p. 48; Código de Processo Penal — texto compilado oficial do Planalto: https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm. Conferência jurídica artigo por artigo ainda pendente.'
    when slug = 'pcac-2026-penal-06-tortura-abuso-autoridade' then 'Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III; Leis nº 9.455/1997 e nº 13.869/2019, textos compilados oficiais do Planalto. Conferência jurídica artigo por artigo ainda pendente.'
    when slug like 'pcac-2026-penal-%' then 'Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III; Código Penal — texto compilado oficial do Planalto: https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm. Conferência jurídica artigo por artigo ainda pendente.'
    else source_note
  end,
  law_version_checked_at = case
    when slug in (
      'pcac-2026-processo-penal-07-inquerito-policial',
      'pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos',
      'pcac-2026-processo-penal-09-identificacao-prisoes-cautelares'
    ) then null
    else law_version_checked_at
  end
where contest_name = 'PC-AC 2026'
  and discipline = 'Noções de Direito Penal e Processual Penal'
  and content_status = 'active'
  and slug in (
    'pcac-2026-penal-01-aplicacao-lei-penal',
    'pcac-2026-penal-02-teoria-crime',
    'pcac-2026-penal-03-crimes-pessoa-patrimonio',
    'pcac-2026-penal-04-crimes-sexuais-fe-publica',
    'pcac-2026-penal-05-crimes-administracao-justica',
    'pcac-2026-penal-06-tortura-abuso-autoridade',
    'pcac-2026-processo-penal-07-inquerito-policial',
    'pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos',
    'pcac-2026-processo-penal-09-identificacao-prisoes-cautelares'
  );
