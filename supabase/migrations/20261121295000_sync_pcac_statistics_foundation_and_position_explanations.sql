-- Keep the direct Supabase trainer corrections for foundational and positional statistics reproducible.
-- Only explanation text is changed; quiz prompts, answer keys, tips, steps and order are preserved.
update public.study_materials m
set quiz = (
  select jsonb_agg(
    case
      when m.slug = 'pcac-2026-estatistica-01-fundamentos-populacao-amostra-variaveis'
       and x.ordinality = 10
      then jsonb_set(
        x.value,
        '{why}',
        to_jsonb('O intervalo sistemático é calculado por k=N÷n, em que N é o tamanho da população e n é o tamanho da amostra. Com 600 registros e amostra de 60, k=600÷60=10. Após selecionar o início, escolhe-se aproximadamente um elemento a cada dez posições. Antes de aplicar, confira se a lista não tem uma periodicidade que coincida com k e gere viés.'::text),
        true
      )
      when m.slug = 'pcac-2026-estatistica-mediana-moda-quartis-percentis'
       and x.ordinality = 2
      then jsonb_set(
        x.value,
        '{why}',
        to_jsonb('Com quantidade par de dados ordenados, não existe um único elemento central: há dois. A mediana é a média aritmética desses dois valores. Exemplo: em 2, 4, 8 e 10, os centrais são 4 e 8; mediana=(4+8)÷2=6. Não escolha apenas o maior ou o menor dos dois.'::text),
        true
      )
      else x.value
    end
    order by x.ordinality
  )
  from jsonb_array_elements(m.quiz) with ordinality x(value, ordinality)
),
updated_at = now()
where m.contest_name = 'PC-AC 2026'
  and m.discipline = 'Estatística'
  and m.slug in (
    'pcac-2026-estatistica-01-fundamentos-populacao-amostra-variaveis',
    'pcac-2026-estatistica-mediana-moda-quartis-percentis'
  );
