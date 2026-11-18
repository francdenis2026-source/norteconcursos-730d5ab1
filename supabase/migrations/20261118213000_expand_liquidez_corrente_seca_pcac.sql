do $$
declare
  v_section text := $section$
## Índices de liquidez: corrente e seca

### 1. O que a questão está avaliando?
A questão compara dois indicadores usados para analisar a capacidade de pagamento das obrigações de curto prazo. O detalhe decisivo é o tratamento dos **estoques**: eles entram na liquidez corrente, mas são retirados da liquidez seca.

### 2. Liquidez corrente
Fórmula:

**Liquidez Corrente = Ativo Circulante ÷ Passivo Circulante**

O Ativo Circulante pode incluir caixa, bancos, aplicações de curto prazo, contas a receber e estoques, conforme a classificação contábil.

Exemplo: se o Ativo Circulante é R$ 10.000 e o Passivo Circulante é R$ 5.000, a liquidez corrente é 2,00. Em termos simplificados, há R$ 2,00 de ativos circulantes para cada R$ 1,00 de obrigação de curto prazo.

### 3. Liquidez seca
Fórmula simplificada usada em questões:

**Liquidez Seca = (Ativo Circulante − Estoques) ÷ Passivo Circulante**

Ela retira os estoques porque mercadorias ainda precisam ser vendidas para se converterem em dinheiro. A liquidez seca verifica a cobertura das dívidas de curto prazo sem depender da venda dos estoques.

### 4. O que acontece quando só os estoques aumentam?
Considere:
- Ativo Circulante inicial: R$ 10.000.
- Estoques iniciais: R$ 3.000.
- Passivo Circulante: R$ 5.000.

Liquidez corrente inicial = 10.000 ÷ 5.000 = **2,00**.
Liquidez seca inicial = (10.000 − 3.000) ÷ 5.000 = **1,40**.

Agora os estoques aumentam R$ 1.000, sem alteração do passivo circulante nem dos demais componentes do ativo:
- Novo Ativo Circulante: R$ 11.000.
- Novos estoques: R$ 4.000.
- Passivo Circulante: R$ 5.000.

Nova liquidez corrente = 11.000 ÷ 5.000 = **2,20**.
Nova liquidez seca = (11.000 − 4.000) ÷ 5.000 = **1,40**.

**Conclusão:** a liquidez corrente aumenta; a liquidez seca não se altera. O estoque aumenta o ativo circulante, mas é subtraído integralmente na fórmula da liquidez seca.

### 5. Entenda como se fosse uma loja
Uma loja tem dinheiro e mercadorias. Se ela compra mais mercadorias, o valor do ativo circulante pode aumentar. A liquidez corrente enxerga esse aumento. Já a liquidez seca pergunta: “Quanto consigo cobrir das dívidas sem depender de vender o estoque?”. Por isso, o aumento isolado do estoque não muda a liquidez seca.

### 6. Pegadinhas de prova
- Não diga que estoque é dinheiro disponível: estoque precisa ser vendido.
- Não confunda liquidez corrente com liquidez seca: somente a seca exclui estoques.
- O denominador das duas fórmulas é o Passivo Circulante.
- A conclusão desta questão depende da condição expressa no enunciado: passivo circulante e demais componentes do ativo permanecem constantes.
- Se o estoque aumentar por compra a prazo e também houver aumento do passivo, o efeito poderá ser diferente. Não aplique a conclusão sem conferir as condições do enunciado.

### 7. Como a IDECAN pode cobrar
A banca pode apresentar uma alteração isolada no estoque e perguntar o efeito nos índices; fornecer valores para calcular os dois quocientes; ou trocar a definição de liquidez corrente pela seca. Primeiro identifique o que entra e o que sai de cada fórmula, depois faça a conta.

### 8. Relação com o edital PC-AC 2026
Para o cargo de Oficial Investigador de Polícia, o Anexo III inclui Contabilidade Geral e Análise Financeira, especialmente o item 4.4 — interpretação básica de demonstrações contábeis. O edital não menciona literalmente “liquidez corrente” ou “liquidez seca”; estes índices são um aprofundamento possível do item de interpretação. Portanto, estude-os com prioridade intermediária, depois dos tópicos expressamente listados.
$section$;
  v_cards jsonb := $cards$
[
 {"f":"Qual é a fórmula da liquidez corrente?","b":"Ativo Circulante dividido pelo Passivo Circulante. Considera os estoques."},
 {"f":"Qual é a fórmula simplificada da liquidez seca?","b":"(Ativo Circulante menos Estoques) dividido pelo Passivo Circulante."},
 {"f":"Por que a liquidez seca exclui os estoques?","b":"Porque as mercadorias ainda precisam ser vendidas para se converterem em dinheiro."},
 {"f":"Se apenas os estoques aumentam, com passivo e demais ativos constantes, o que ocorre com a liquidez corrente?","b":"Aumenta, pois os estoques integram o Ativo Circulante."},
 {"f":"Se apenas os estoques aumentam, com passivo e demais ativos constantes, o que ocorre com a liquidez seca?","b":"Não se altera: o aumento do estoque no Ativo Circulante é anulado pela subtração dos estoques na fórmula."}
]
$cards$::jsonb;
  v_quiz jsonb := $quiz$
[
 {"a":true,"q":"Mantidos constantes o Passivo Circulante e os demais componentes do Ativo Circulante, o aumento isolado dos estoques eleva a liquidez corrente e não altera a liquidez seca.","tip":"A corrente inclui estoque; a seca retira estoque.","why":"O Ativo Circulante aumenta, elevando o numerador da liquidez corrente. Na liquidez seca, o estoque acrescido é subtraído do Ativo Circulante, mantendo o numerador constante.","difficulty":"média"},
 {"a":false,"q":"A liquidez seca considera os estoques integralmente, pois eles representam recursos disponíveis para pagamento imediato.","tip":"Mercadoria em prateleira ainda precisa ser vendida.","why":"A fórmula simplificada da liquidez seca exclui os estoques justamente para avaliar a cobertura das obrigações sem depender da venda dessas mercadorias.","difficulty":"fácil"},
 {"a":true,"q":"Uma entidade possui Ativo Circulante de R$ 18.000, estoques de R$ 6.000 e Passivo Circulante de R$ 6.000. Sua liquidez corrente é 3,00 e sua liquidez seca é 2,00.","tip":"Corrente: 18.000 ÷ 6.000. Seca: (18.000 − 6.000) ÷ 6.000.","why":"A liquidez corrente é 3,00. A liquidez seca é 12.000 ÷ 6.000 = 2,00.","difficulty":"média"}
]
$quiz$::jsonb;
begin
  update public.study_materials
  set body_md = case
      when position('## Índices de liquidez: corrente e seca' in coalesce(body_md,'')) > 0 then body_md
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
EXPLICAÇÃO DIDÁTICA — Liquidez corrente x liquidez seca

A questão pergunta o efeito do aumento isolado dos estoques, mantendo constantes o Passivo Circulante e os demais componentes do Ativo Circulante.

1. Liquidez corrente = Ativo Circulante ÷ Passivo Circulante.
Ela considera o estoque. Se o estoque aumenta e o Passivo Circulante fica igual, o numerador aumenta e o índice sobe.

2. Liquidez seca = (Ativo Circulante − Estoques) ÷ Passivo Circulante.
Ela exclui o estoque, porque mercadorias ainda precisam ser vendidas para virar dinheiro. Se o estoque aumenta R$ 1.000, o Ativo Circulante aumenta R$ 1.000, mas a parcela de estoques também subtrai R$ 1.000. O numerador da liquidez seca fica igual.

EXEMPLO:
Antes: Ativo Circulante R$ 10.000; Estoques R$ 3.000; Passivo Circulante R$ 5.000.
Liquidez corrente = 10.000/5.000 = 2,00.
Liquidez seca = (10.000−3.000)/5.000 = 1,40.

Depois do aumento isolado de R$ 1.000 nos estoques:
Ativo Circulante R$ 11.000; Estoques R$ 4.000; Passivo Circulante R$ 5.000.
Liquidez corrente = 11.000/5.000 = 2,20.
Liquidez seca = (11.000−4.000)/5.000 = 1,40.

Portanto, o índice corrente aumenta e o índice seco permanece inalterado.

DICA IDECAN: “corrente” considera o Ativo Circulante completo; “seca” retira os estoques. A conclusão depende da condição do enunciado de que os demais componentes e o passivo permanecem constantes. Se a compra de estoque também criar uma dívida, refaça a análise.

RELAÇÃO COM O EDITAL PC-AC 2026: para Oficial Investigador, o Anexo III prevê Contabilidade Geral e Análise Financeira e, no item 4.4, interpretação básica de demonstrações contábeis. Os nomes dos índices não aparecem expressamente no edital. É aprofundamento possível desse item, com prioridade intermediária, não conteúdo literal e destacado.
$explanation$,
    tested_topic='Demonstrações contábeis: interpretação básica e índices de liquidez',
    didactic_provenance = coalesce(didactic_provenance,'{}'::jsonb) || jsonb_build_object('pcac_2026_editaiscope','Item 4.4 — interpretação básica de demonstrações contábeis; índices de liquidez não citados literalmente, aprofundamento indireto','reviewed_at',now())
  where id='dfc98577-4f16-4b1a-94ed-33b551f2e079';
end $$;