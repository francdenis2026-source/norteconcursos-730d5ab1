do $$
declare
  v_section text := $section$
## Passivo circulante: obrigações de curto prazo

### O que é?
Passivo circulante é o conjunto das dívidas e obrigações que a entidade espera pagar no curto prazo, normalmente dentro do ciclo operacional ou do período de até doze meses, conforme os critérios de classificação aplicáveis.

Pense em uma loja: se ela precisa pagar fornecedores, salários, tributos e parcelas de empréstimos no curto prazo, essas obrigações compõem o passivo circulante.

### Exemplos comuns
- **Fornecedores:** valores devidos pela compra de mercadorias ou serviços.
- **Salários e encargos a pagar:** remunerações e encargos trabalhistas ainda não pagos.
- **Empréstimos de curto prazo:** parcelas ou obrigações financeiras exigíveis no curto prazo.
- **Tributos a recolher:** impostos e contribuições que a empresa ainda deve pagar.

### Como calcular o total?
Quando o enunciado informa que todas as obrigações são de curto prazo, some os valores de todas elas:

**Passivo Circulante = fornecedores + salários/encargos a pagar + empréstimos de curto prazo + tributos a recolher + outras obrigações de curto prazo.**

Exemplo didático:
Uma empresa tem R$ 4.000 de fornecedores, R$ 2.000 de salários a pagar, R$ 3.000 de empréstimos de curto prazo e R$ 1.000 de tributos a recolher.

Total: 4.000 + 2.000 + 3.000 + 1.000 = R$ 10.000 de Passivo Circulante.

### Atenção às pegadinhas
1. Não some contas do Ativo, como caixa, bancos, estoques ou clientes a receber: elas não são dívidas.
2. Não confunda passivo circulante com passivo não circulante. O que define a classificação é o prazo de exigibilidade e os critérios contábeis aplicáveis.
3. Empréstimos podem ser circulantes ou não circulantes: observe o prazo de vencimento. Se o enunciado disser que são de curto prazo, entram no passivo circulante.
4. Não deixe de fora salários, encargos ou tributos só porque não são fornecedores: todos são obrigações quando ainda estão a pagar/recolher.
5. Em questões de soma, primeiro identifique quais valores são obrigações de curto prazo; depois some somente esses valores.

### Como a IDECAN pode cobrar
A banca pode apresentar uma lista de contas misturando Ativo e Passivo e pedir o total do Passivo Circulante. Também pode misturar dívidas de curto e longo prazo para testar se o candidato observa a exigibilidade. Leia cada descrição, classifique a conta e só então faça a soma.

### Relação com o edital PC-AC 2026
Para Oficial Investigador, o Anexo III prevê expressamente:
- Item 1.3: Ativo, passivo e patrimônio líquido.
- Item 4.1: Balanço patrimonial.

A identificação e a soma das obrigações do Passivo Circulante estão diretamente relacionadas a esses conteúdos expressos. Prioridade alta para a preparação.
$section$;
  v_cards jsonb := $cards$
[
 {"f":"O que é Passivo Circulante?","b":"Conjunto das dívidas e obrigações exigíveis no curto prazo."},
 {"f":"Fornecedores a pagar no curto prazo entram em qual grupo?","b":"No Passivo Circulante, pois representam obrigação de curto prazo."},
 {"f":"Salários e encargos ainda não pagos entram no Passivo Circulante?","b":"Sim, quando são obrigações exigíveis no curto prazo."},
 {"f":"Empréstimos sempre são Passivo Circulante?","b":"Não. Só a parcela/obrigação exigível no curto prazo; a parte de longo prazo é classificada no Passivo Não Circulante, conforme as regras aplicáveis."},
 {"f":"Tributos a recolher no curto prazo entram em qual grupo?","b":"No Passivo Circulante."},
 {"f":"Como calcular o total do Passivo Circulante em uma questão de soma?","b":"Identifique todas as obrigações de curto prazo e some seus valores; não inclua contas do Ativo nem obrigações de longo prazo."}
]
$cards$::jsonb;
  v_quiz jsonb := $quiz$
[
 {"a":true,"q":"Fornecedores, salários a pagar e tributos a recolher, quando exigíveis no curto prazo, integram o Passivo Circulante.","tip":"São valores que a empresa ainda deve pagar em breve.","why":"Todos representam obrigações de curto prazo e, por isso, compõem o Passivo Circulante.","difficulty":"fácil"},
 {"a":false,"q":"O saldo de caixa e os estoques devem ser somados ao Passivo Circulante porque representam valores da empresa.","tip":"Caixa e estoques são bens/recursos, não dívidas.","why":"Caixa e estoques integram o Ativo, não o Passivo. O Passivo Circulante reúne obrigações de curto prazo.","difficulty":"fácil"},
 {"a":true,"q":"Se uma questão informar quatro obrigações e afirmar que todas são de curto prazo, o total do Passivo Circulante será obtido pela soma dos quatro valores.","tip":"Primeiro confirme que todos são obrigações de curto prazo; depois some.","why":"A classificação já foi dada pelo enunciado. Todas as obrigações listadas devem compor o total do Passivo Circulante.","difficulty":"fácil"}
]
$quiz$::jsonb;
begin
  update public.study_materials
  set body_md = case
      when position('## Passivo circulante: obrigações de curto prazo' in coalesce(body_md,'')) > 0 then body_md
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
  where slug='contabilidade-balanco-patrimonial-estrutura';

  update public.curated_question_catalog
  set explanation = $explanation$
COMENTÁRIO DIDÁTICO — PASSIVO CIRCULANTE

Passivo Circulante é o conjunto das dívidas e obrigações que precisam ser pagas no curto prazo.

A questão informa quatro obrigações de curto prazo:
• Fornecedores: dívida com quem vendeu mercadorias/serviços.
• Salários e encargos a pagar: valores devidos aos trabalhadores e encargos relacionados.
• Empréstimos: entram no Passivo Circulante quando exigíveis no curto prazo.
• Tributos a recolher: impostos e contribuições ainda não pagos.

Como o enunciado já afirma que todas são obrigações de curto prazo, todas entram na soma. O procedimento é adicionar os quatro valores informados, sem incluir contas do Ativo e sem excluir salários, empréstimos ou tributos.

EXEMPLO MAIS SIMPLES:
Uma loja deve R$ 4.000 ao fornecedor, R$ 2.000 de salários, R$ 3.000 de empréstimo de curto prazo e R$ 1.000 de tributos. O total das obrigações de curto prazo é a soma dessas quatro dívidas.

PEGADINHA:
Caixa, bancos, clientes a receber e estoques são contas do Ativo, não devem ser somadas ao Passivo Circulante. Empréstimos não são automaticamente todos circulantes: observe o vencimento. O enunciado desta questão já informa que os empréstimos são obrigações de curto prazo.

RELAÇÃO COM O EDITAL PC-AC 2026 — OFICIAL INVESTIGADOR:
Anexo III, item 1.3 (Ativo, passivo e patrimônio líquido) e item 4.1 (Balanço patrimonial). Conteúdo diretamente relacionado ao edital.
$explanation$,
    tested_topic='Passivo circulante: classificação e soma de obrigações de curto prazo'
  where id='43dd82f7-ec4f-486e-98ee-502fc535f844';
end $$;