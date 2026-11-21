-- Clarify age measurement scale and percentile-rank interpretation in PC-AC statistics lessons.
-- Exact phrase replacements keep the change idempotent and preserve questions and answer keys.

update public.study_materials
set body_md = replace(
  body_md,
  $old$- altura: 1,74 m.$old$,
  $new$- altura: 1,74 m.

**Atenção especial à idade:** se a idade for registrada com precisão (anos, meses, dias ou frações), é uma medida quantitativa contínua. Se o sistema registrar somente anos completos (18, 19, 20...), os valores observados aparecem em números inteiros e podem ser tratados como discretos naquela forma de registro. Em prova, observe como a variável foi definida e medida.$new$
),
updated_at = now()
where slug = 'pcac-2026-estatistica-01-fundamentos-populacao-amostra-variaveis'
  and body_md like '%- altura: 1,74 m.%';

update public.study_materials
set body_md = replace(
  body_md,
  $old$**Exemplo cotidiano:** estar no percentil 90 de uma pontuação significa que a pontuação está acima ou igual à maior parte dos resultados, conforme a definição e o método usados. Não significa ter acertado 90% da prova.$old$,
  $new$**Exemplo cotidiano:** se uma pontuação está no percentil 90 (P90), ela está no ponto que deixa aproximadamente 90% das observações iguais ou abaixo e cerca de 10% acima, conforme a convenção de cálculo e o tratamento de empates. Isso descreve posição relativa no grupo, não a porcentagem de questões acertadas. Uma pessoa no P90 não necessariamente acertou 90% da prova.$new$
),
updated_at = now()
where slug = 'pcac-2026-estatistica-mediana-moda-quartis-percentis'
  and body_md like '%**Exemplo cotidiano:** estar no percentil 90 de uma pontuação%';
