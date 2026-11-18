do $$
begin
  update public.study_materials
  set body_md = case
    when position('### Exemplo de fixação: receita líquida de R$ 20.000' in coalesce(body_md,'')) > 0 then body_md
    else coalesce(body_md,'') || E'\n\n' || $section$
### Exemplo de fixação: receita líquida de R$ 20.000

Uma empresa apresenta receita líquida de R$ 20.000 e lucro líquido de R$ 4.000.

1. Divida o lucro líquido pela receita líquida: 4.000 ÷ 20.000 = 0,20.
2. Multiplique por 100 para obter o percentual: 0,20 × 100 = 20%.
3. Interprete: a cada R$ 100 de receita líquida, R$ 20 correspondem ao lucro líquido.

**Atenção ao erro comum:** R$ 4.000 não é 5% de R$ 20.000. Para conferir, 5% de R$ 20.000 seria R$ 1.000. A alternativa que representa R$ 20 de lucro por R$ 100 de receita corresponde a 20%.
$section$
  end,
  flashcards = case
    when exists (select 1 from jsonb_array_elements(coalesce(flashcards,'[]'::jsonb)) c where c->>'f'='Se a receita líquida é R$ 20.000 e o lucro líquido é R$ 4.000, qual é a margem líquida?')
    then flashcards
    else coalesce(flashcards,'[]'::jsonb) || jsonb_build_array(jsonb_build_object('f','Se a receita líquida é R$ 20.000 e o lucro líquido é R$ 4.000, qual é a margem líquida?','b','20%. Divida 4.000 por 20.000 = 0,20 e multiplique por 100. Isso significa R$ 20 de lucro a cada R$ 100 de receita líquida.'))
  end,
  updated_at=now()
  where slug='pcac-2026-contabilidade-04-demonstracoes-balanco-dre-regimes';

  update public.curated_question_catalog
  set explanation = coalesce(explanation,'') || E'\n\nEXEMPLO DE FIXAÇÃO E CORREÇÃO DO ERRO: Receita líquida de R$ 20.000 e lucro líquido de R$ 4.000. Faça 4.000 ÷ 20.000 = 0,20; depois multiplique por 100 = 20%. Logo, para cada R$ 100 de receita líquida, R$ 20 são lucro líquido. Cuidado: 5% de R$ 20.000 seriam R$ 1.000, não R$ 4.000.',
    didactic_provenance=coalesce(didactic_provenance,'{}'::jsonb) || jsonb_build_object('reinforcement_example','R$ 20.000 receita líquida / R$ 4.000 lucro líquido = 20% margem líquida','reinforcement_added_at',now())
  where id='1c39e0bc-d706-44cc-9a4c-9889f2a8e406';
end $$;