-- Alinha os rótulos do banco aos nomes oficiais do Anexo III do edital PC-AC 2026.
update public.curated_question_catalog
set subject='Noções de Administração'
where contest_name='Polícia Civil do Acre'
  and contest_year=2026
  and career_name='Oficial Investigador de Polícia'
  and subject='Administração'
  and external_item_key in ('pcac26-autoria-draft-26','pcac26-autoria-draft-27');

update public.curated_question_catalog
set subject='Contabilidade Geral e Análise Financeira'
where contest_name='Polícia Civil do Acre'
  and contest_year=2026
  and career_name='Oficial Investigador de Polícia'
  and subject in ('Contabilidade','Análise Financeira');
