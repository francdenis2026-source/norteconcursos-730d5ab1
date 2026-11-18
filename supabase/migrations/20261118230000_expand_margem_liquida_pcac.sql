do $$
declare
  v_section text := $section$
## Indicador de rentabilidade: margem líquida

### 1. O que a margem líquida mostra?
A margem líquida indica quanto do valor das vendas líquidas se transforma em lucro líquido. Em linguagem simples: de cada R$ 100 de receita líquida, quantos reais sobram como lucro depois dos custos, despesas e tributos sobre o resultado.

### 2. Fórmula
**Margem Líquida = (Lucro Líquido ÷ Receita Líquida) × 100**

- **Lucro líquido:** resultado final positivo que sobra após o reconhecimento dos custos, despesas e tributos sobre o resultado.
- **Receita líquida:** receita de vendas depois das deduções aplicáveis, como devoluções, abatimentos e tributos incidentes sobre vendas.

### 3. Exemplo do cotidiano
Uma loja teve receita líquida de R$ 10.000 no mês. Depois de considerar custos e despesas, o lucro líquido foi de R$ 2.000.

Margem líquida = (2.000 ÷ 10.000) × 100 = **20%**.

Isso significa que, para cada R$ 100 de receita líquida, a empresa ficou com R$ 20 de lucro líquido.

### 4. Não confunda os termos
- Receita bruta: valor inicial das vendas antes das deduções.
- Receita líquida: valor das vendas após as deduções pertinentes.
- Lucro bruto: receita líquida menos custo das mercadorias/serviços vendidos.
- Lucro líquido: resultado final após custos, despesas e tributos sobre o resultado.
- Margem líquida: percentual que relaciona lucro líquido e receita líquida.

### 5. Como interpretar
Em regra, quanto maior a margem líquida, maior a parcela da receita líquida que se converte em lucro. Compare empresas ou períodos com cuidado, pois setores e estruturas de custos diferentes podem produzir margens diferentes. Margem negativa indica prejuízo líquido no período.

### 6. Pegadinhas de prova
1. Não confunda margem líquida com liquidez: margem líquida é rentabilidade; liquidez trata da capacidade de pagar obrigações.
2. O numerador é lucro líquido, não lucro bruto.
3. O denominador é receita líquida, não ativo total, patrimônio líquido ou estoque.
4. Se a questão pedir percentual, multiplique o quociente por 100.
5. Não use receita bruta quando a fórmula indicada exigir receita líquida.

### 7. Como a IDECAN pode cobrar
A banca pode pedir a relação entre lucro líquido e receita líquida, apresentar valores para calcular o percentual ou trocar os conceitos de receita bruta, receita líquida, lucro bruto e lucro líquido. Identifique primeiro o indicador: margem líquida é uma medida de rentabilidade.

### 8. Relação com o edital PC-AC 2026
Para Oficial Investigador, o Anexo III prevê expressamente o item 4.2 — Demonstração do Resultado do Exercício — e o item 4.4 — interpretação básica de demonstrações contábeis. O termo “margem líquida” não aparece literalmente. É um aprofundamento possível desses itens, com relevância intermediária; priorize os conteúdos expressamente listados antes de aprofundamentos.
$section$;
  v_cards jsonb := $cards$
[
 {"f":"O que a margem líquida mede?","b":"Quanto da receita líquida se transforma em lucro líquido, em percentual."},
 {"f":"Qual é a fórmula da margem líquida?","b":"(Lucro Líquido ÷ Receita Líquida) × 100."},
 {"f":"O que significa margem líquida de 20%?","b":"Que, para cada R$ 100 de receita líquida, a empresa obteve R$ 20 de lucro líquido."},
 {"f":"Margem líquida é indicador de liquidez ou rentabilidade?","b":"Rentabilidade. Mede a parcela da receita líquida que se transforma em lucro."},
 {"f":"Qual a diferença entre receita bruta e receita líquida?","b":"A receita líquida corresponde à receita de vendas após as deduções aplicáveis, como devoluções, abatimentos e tributos sobre vendas."}
]
$cards$::jsonb;
  v_quiz jsonb := $quiz$
[
 {"a":true,"q":"A margem líquida relaciona o lucro líquido obtido pela entidade com a receita líquida do período, geralmente expressando o resultado em percentual.","tip":"Pergunte: quanto sobrou de lucro em relação ao que efetivamente foi vendido?","why":"A margem líquida é indicador de rentabilidade e é calculada dividindo-se o lucro líquido pela receita líquida, multiplicando por 100.","difficulty":"fácil"},
 {"a":true,"q":"Uma empresa apresenta receita líquida de R$ 50.000 e lucro líquido de R$ 5.000. Sua margem líquida é de 10%.","tip":"Divida 5.000 por 50.000 e transforme em percentual.","why":"5.000 ÷ 50.000 = 0,10; multiplicando por 100, obtém-se 10%.","difficulty":"média"},
 {"a":false,"q":"A margem líquida é calculada pela divisão do ativo circulante pelo passivo circulante, indicando a capacidade de pagamento das dívidas de curto prazo.","tip":"Essa descrição é de um índice de liquidez, não de rentabilidade.","why":"Ativo Circulante ÷ Passivo Circulante é a fórmula da liquidez corrente. A margem líquida relaciona lucro líquido e receita líquida.","difficulty":"média"}
]
$quiz$::jsonb;
begin
  update public.study_materials
  set body_md = case
      when position('## Indicador de rentabilidade: margem líquida' in coalesce(body_md,'')) > 0 then body_md
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
COMENTÁRIO DIDÁTICO — MARGEM LÍQUIDA

A margem líquida mostra quanto da receita líquida das vendas se transforma em lucro líquido.

Imagine uma loja que teve R$ 10.000 de receita líquida e, depois de reconhecer custos, despesas e tributos sobre o resultado, terminou com R$ 2.000 de lucro líquido.

Margem líquida = (Lucro Líquido ÷ Receita Líquida) × 100
= (2.000 ÷ 10.000) × 100
= 20%.

Em palavras simples: a cada R$ 100 de receita líquida, sobraram R$ 20 de lucro líquido.

TERMOS:
• Receita líquida: vendas após as deduções aplicáveis.
• Lucro líquido: resultado final depois dos custos, despesas e tributos sobre o resultado.
• Margem líquida: percentual do lucro líquido em relação à receita líquida.

NÃO CONFUNDA:
Margem líquida é rentabilidade. Liquidez corrente (Ativo Circulante ÷ Passivo Circulante) mede capacidade de pagamento de curto prazo.

DICA IDECAN:
Se a questão perguntar “relação entre quais contas?”, lembre-se de lucro líquido sobre receita líquida. Se fornecer valores, divida o lucro líquido pela receita líquida e multiplique por 100.

PC-AC 2026 — OFICIAL INVESTIGADOR:
Anexo III, item 4.2 (DRE) e item 4.4 (interpretação básica de demonstrações contábeis). O edital não cita literalmente “margem líquida”; é aprofundamento possível, de relevância intermediária.
$explanation$,
    tested_topic='Indicadores de rentabilidade: margem líquida',
    didactic_provenance=coalesce(didactic_provenance,'{}'::jsonb) || jsonb_build_object('pcac_2026_editaiscope','Anexo III, itens 4.2 DRE e 4.4 interpretação básica; margem líquida não citada literalmente, aprofundamento indireto','reviewed_at',now())
  where id='1c39e0bc-d706-44cc-9a4c-9889f2a8e406';
end $$;