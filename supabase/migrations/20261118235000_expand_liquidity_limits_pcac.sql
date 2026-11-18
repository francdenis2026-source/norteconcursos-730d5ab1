do $$
declare
  v_section text := $section$
## Limitações dos índices de liquidez: por que índice corrente acima de 1 não garante pagamento pontual?

### 1. O que a liquidez corrente mede?
A liquidez corrente compara os recursos classificados no ativo circulante com as obrigações do passivo circulante.

**Fórmula:** Liquidez Corrente = Ativo Circulante ÷ Passivo Circulante.

Exemplo: ativo circulante de R$ 20.000 e passivo circulante de R$ 10.000 resultam em liquidez corrente igual a 2,0. Em termos simples, para cada R$ 1,00 de obrigação de curto prazo, há R$ 2,00 em ativos circulantes.

### 2. O índice é uma fotografia, não uma garantia
O índice é calculado com saldos contábeis de uma data. Ele não mostra sozinho se cada ativo será convertido em dinheiro a tempo de pagar cada dívida.

Exemplo: a empresa tem R$ 20.000 de ativo circulante, mas R$ 19.000 estão em estoques e apenas R$ 1.000 em caixa. Se há R$ 10.000 de contas a pagar nos próximos dias, a empresa pode enfrentar dificuldade, mesmo com liquidez corrente de 2,0. Ela precisa vender o estoque e receber o dinheiro antes dos vencimentos.

### 3. O que o índice corrente não revela sozinho?
- **Prazo de vencimento:** quando as dívidas precisam ser pagas e quando os ativos serão recebidos ou realizados.
- **Qualidade dos recebíveis:** se os clientes pagarão, se há atrasos ou risco de inadimplência.
- **Conversão dos estoques:** se os produtos serão vendidos rapidamente, pelo preço esperado e sem perdas.
- **Disponibilidade imediata:** parte do ativo circulante pode não ser dinheiro disponível naquele momento.
- **Concentração dos vencimentos:** muitas dívidas podem vencer antes da entrada de recursos.

### 4. Diferença entre liquidez corrente, seca e imediata
- **Liquidez corrente:** considera todo o ativo circulante, inclusive estoques.
  Fórmula: Ativo Circulante ÷ Passivo Circulante.
- **Liquidez seca:** retira os estoques do ativo circulante, pois eles precisam ser vendidos para virar dinheiro.
  Fórmula simplificada: (Ativo Circulante − Estoques) ÷ Passivo Circulante.
- **Liquidez imediata:** considera apenas disponibilidades imediatas, como caixa e equivalentes de caixa, conforme a classificação adotada.
  Fórmula usual: Disponibilidades ÷ Passivo Circulante.

### 5. Exemplo comparativo
Ativo circulante: R$ 20.000, sendo R$ 19.000 em estoques e R$ 1.000 em caixa. Passivo circulante: R$ 10.000.

- Liquidez corrente = 20.000 ÷ 10.000 = 2,0.
- Liquidez seca simplificada = (20.000 − 19.000) ÷ 10.000 = 0,1.
- Liquidez imediata = 1.000 ÷ 10.000 = 0,1.

A empresa parece confortável pela liquidez corrente, mas os outros índices mostram que há pouco recurso sem depender da venda do estoque. Isso não prova insolvência, mas recomenda investigação da qualidade, dos prazos e do fluxo de caixa.

### 6. Pegadinhas de prova
1. Índice corrente superior a 1 não elimina risco de inadimplência.
2. O índice não informa sozinho a data em que cada ativo vira dinheiro.
3. Estoque integra o ativo circulante, mas não é dinheiro disponível imediatamente.
4. Recebíveis podem atrasar ou não ser integralmente recebidos.
5. Índice de liquidez é ferramenta de análise; não é promessa de pagamento pontual.

### 7. Como a IDECAN pode cobrar
A banca pode apresentar um índice corrente acima de 1 e afirmar que isso garante o pagamento de todas as obrigações. Desconfie de expressões absolutas como “garante”, “elimina todo risco” e “por si só”. A interpretação correta considera prazos, qualidade dos recebíveis e conversão dos ativos em caixa.

### 8. Relação com o edital PC-AC 2026
Para Oficial Investigador, o Anexo III inclui Contabilidade Geral e Análise Financeira, especialmente o item 4.4 — Interpretação básica de demonstrações contábeis. As limitações dos índices de liquidez são aprofundamento diretamente relacionado a esse conteúdo. Relevância alta para a preparação, embora a expressão exata “limitações dos índices” não apareça literalmente no edital.
$section$;
  v_cards jsonb := $cards$
[
 {"f":"O que significa liquidez corrente igual a 2?","b":"Para cada R$ 1,00 de passivo circulante, a entidade apresenta R$ 2,00 de ativo circulante. Isso não garante pagamento pontual."},
 {"f":"Liquidez corrente acima de 1 garante que todas as dívidas serão pagas no vencimento?","b":"Não. É preciso analisar prazos de vencimento, qualidade dos recebíveis, realização dos estoques e disponibilidade de caixa."},
 {"f":"Por que o estoque pode limitar a capacidade de pagamento imediato?","b":"Porque precisa ser vendido e convertido em dinheiro; a venda pode demorar ou ocorrer por valor inferior ao esperado."},
 {"f":"O que a liquidez seca exclui da liquidez corrente?","b":"Os estoques, para avaliar a cobertura das obrigações de curto prazo sem depender da venda deles."},
 {"f":"Quais fatores devem complementar a análise da liquidez corrente?","b":"Prazos de vencimento, qualidade dos recebíveis, giro e realização dos estoques e fluxo de caixa."}
]
$cards$::jsonb;
  v_quiz jsonb := $quiz$
[
 {"a":true,"q":"Uma entidade apresenta liquidez corrente de 1,80. Esse resultado, isoladamente, assegura que todas as obrigações serão pagas pontualmente?","tip":"Pense se o índice informa quando os estoques serão vendidos e quando os clientes pagarão.","why":"Não. O índice compara saldos do ativo e passivo circulantes em determinada data, mas não demonstra sozinho a compatibilidade dos vencimentos, a qualidade dos recebíveis nem a conversão dos estoques em caixa.","difficulty":"média"},
 {"a":true,"q":"Uma empresa possui ativo circulante de R$ 50.000, dos quais R$ 35.000 correspondem a estoques, e passivo circulante de R$ 25.000. Embora a liquidez corrente seja 2,0, a análise deve considerar que:","tip":"O estoque entra na liquidez corrente, mas precisa ser vendido para virar dinheiro.","why":"A liquidez corrente é 50.000 ÷ 25.000 = 2,0. Entretanto, R$ 35.000 estão em estoques; portanto, é necessário avaliar a velocidade e o valor de realização desses estoques, os recebíveis e os vencimentos das obrigações.","difficulty":"média"},
 {"a":true,"q":"Na avaliação da capacidade de pagamento de curto prazo, além da liquidez corrente, o analista deve examinar os prazos de vencimento das obrigações, a qualidade dos créditos a receber e a capacidade de conversão dos ativos em caixa.","tip":"Índices ajudam a analisar, mas não substituem a avaliação do fluxo financeiro.","why":"A afirmação está correta. A liquidez corrente é uma medida estática e agregada; a análise de solvência de curto prazo exige avaliar prazos, recebibilidade e realização dos ativos.","difficulty":"difícil"}
]
$quiz$::jsonb;
begin
  update public.study_materials
  set body_md = case
      when position('## Limitações dos índices de liquidez:' in coalesce(body_md,'')) > 0 then body_md
      else coalesce(body_md,'') || E'\n\n' || v_section
    end,
    flashcards = coalesce(flashcards,'[]'::jsonb) || (
      select coalesce(jsonb_agg(card),'[]'::jsonb)
      from jsonb_array_elements(v_cards) as n(card)
      where not exists (
        select 1 from jsonb_array_elements(coalesce(study_materials.flashcards,'[]'::jsonb)) as o(card)
        where o.card->>'f'=n.card->>'f'
      )
    ),
    quiz = coalesce(quiz,'[]'::jsonb) || (
      select coalesce(jsonb_agg(item),'[]'::jsonb)
      from jsonb_array_elements(v_quiz) as n(item)
      where not exists (
        select 1 from jsonb_array_elements(coalesce(study_materials.quiz,'[]'::jsonb)) as o(item)
        where o.item->>'q'=n.item->>'q'
      )
    ),
    updated_at=now()
  where slug='pcac-2026-contabilidade-04-demonstracoes-balanco-dre-regimes';

  update public.curated_question_catalog
  set explanation = $explanation$
COMENTÁRIO DIDÁTICO — LIMITAÇÕES DA LIQUIDEZ CORRENTE

A liquidez corrente compara o Ativo Circulante com o Passivo Circulante. Um índice acima de 1 indica que, na data do balanço, o valor contábil do ativo circulante supera o passivo circulante.

Mas isso NÃO garante, por si só, que todas as contas serão pagas pontualmente.

Exemplo simples:
Ativo circulante = R$ 20.000, sendo R$ 19.000 em estoques e R$ 1.000 em caixa.
Passivo circulante = R$ 10.000.
Liquidez corrente = 20.000 ÷ 10.000 = 2,0.

Apesar do índice 2,0, a empresa tem somente R$ 1.000 em caixa. Para pagar as obrigações, depende de vender estoques e/ou receber clientes a tempo.

O índice não revela sozinho:
1. Quando as dívidas vencem.
2. Se os clientes pagarão os valores a receber.
3. Se os estoques serão vendidos rapidamente e pelo valor esperado.
4. Se haverá caixa disponível no momento do pagamento.

DIFERENÇA ENTRE OS ÍNDICES:
• Liquidez corrente: inclui estoques no ativo circulante.
• Liquidez seca: exclui estoques.
• Liquidez imediata: considera disponibilidades imediatas.

DICA IDECAN:
Desconfie de afirmações absolutas dizendo que liquidez corrente acima de 1 “garante” pagamento ou “elimina” risco. O índice é útil, mas precisa ser interpretado junto com prazos, qualidade dos recebíveis e conversão dos ativos em caixa.

PC-AC 2026:
Anexo III, Contabilidade Geral e Análise Financeira, item 4.4 — interpretação básica de demonstrações contábeis. Conteúdo de alta relevância como aprofundamento direto do edital.
$explanation$,
    subtopic='Limitações dos índices de liquidez',
    tested_topic='Análise das demonstrações contábeis e índices de liquidez',
    didactic_provenance=coalesce(didactic_provenance,'{}'::jsonb) || jsonb_build_object('pcac_2026_editalscope','Anexo III, item 4.4 — interpretação básica de demonstrações contábeis','relevance','alta','reviewed_at',now())
  where id='78931ed4-8f77-4039-99af-660eb281233e';

  insert into public.curated_question_catalog
  (source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,content_status,is_original,state,career_category,role_type,tested_topic,didactic_provenance)
  values
  ('b2a15f6c-7cad-417c-8407-67e33fc9dc47','9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-limites-011','Polícia Civil do Acre',2026,'Oficial Investigador de Polícia','IDECAN — estilo autoral','Contabilidade Geral e Análise Financeira','Limitações dos índices de liquidez',
   $q1$Uma sociedade apresenta ativo circulante de R$ 80.000 e passivo circulante de R$ 40.000. Desse ativo, R$ 60.000 correspondem a estoques. Considerando a interpretação dos índices de liquidez, assinale a afirmativa correta.

(A) A liquidez corrente de 2,0 comprova que todas as obrigações serão pagas no vencimento.
(B) A existência de estoques elimina o risco de falta de caixa.
(C) A liquidez corrente é 2,0, mas a dependência de estoques exige análise adicional sobre sua realização e os prazos das obrigações.
(D) A liquidez corrente é 0,5, pois os estoques devem ser excluídos.
(E) A entidade não possui ativo circulante disponível.$q1$,
   'C',
   $e1$A liquidez corrente é 80.000 ÷ 40.000 = 2,0. Entretanto, R$ 60.000 estão em estoques. O índice não garante pagamento pontual: é necessário avaliar a realização dos estoques, os recebíveis e os vencimentos das obrigações. A alternativa C reconhece o limite interpretativo do indicador.$e1$,
   '[]'::jsonb,'média','active',true,'AC','policial','Oficial Investigador de Polícia','Análise das demonstrações contábeis e índices de liquidez',
   jsonb_build_object('kind','original_question','authored',true,'source_board_style','IDECAN','target_exam','PC-AC 2026 — Oficial Investigador de Polícia','not_official_exam',true,'relevance','alta'))
  on conflict (external_item_key) do nothing;

  insert into public.curated_question_catalog
  (source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,content_status,is_original,state,career_category,role_type,tested_topic,didactic_provenance)
  values
  ('b2a15f6c-7cad-417c-8407-67e33fc9dc47','9a3535c6-f720-472a-9138-8acf5f212b31','pcac26-liquidez-limites-012','Polícia Civil do Acre',2026,'Oficial Investigador de Polícia','IDECAN — estilo autoral','Contabilidade Geral e Análise Financeira','Liquidez corrente, seca e imediata',
   $q2$Uma empresa possui liquidez corrente superior a 1, mas apresenta liquidez seca significativamente inferior à liquidez corrente. Essa diferença pode indicar que:

(A) o passivo circulante foi excluído do cálculo da liquidez seca.
(B) os estoques possuem participação relevante na composição do ativo circulante utilizado para cobrir obrigações de curto prazo.
(C) a empresa não possui dívidas de curto prazo.
(D) a liquidez seca considera os estoques em dobro.
(E) a entidade necessariamente apresentou prejuízo no exercício.$q2$,
   'B',
   $e2$A liquidez corrente inclui os estoques no ativo circulante; a liquidez seca os exclui. Quando a liquidez seca fica bem abaixo da corrente, isso pode indicar participação relevante dos estoques na cobertura contábil das obrigações de curto prazo. Não significa, por si só, insolvência ou prejuízo.$e2$,
   '[]'::jsonb,'média','active',true,'AC','policial','Oficial Investigador de Polícia','Análise das demonstrações contábeis e índices de liquidez',
   jsonb_build_object('kind','original_question','authored',true,'source_board_style','IDECAN','target_exam','PC-AC 2026 — Oficial Investigador de Polícia','not_official_exam',true,'relevance','alta'))
  on conflict (external_item_key) do nothing;
end $$;