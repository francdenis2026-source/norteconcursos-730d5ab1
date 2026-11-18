-- Amplia o estudo das quatro fórmulas de lançamento e explica a questão PC-SE 2021 no treinador.
do $$
declare
  v_section text := $section$
## Fórmulas de lançamento da partida dobrada

A partida dobrada determina que **o total dos débitos deve ser igual ao total dos créditos** em cada lançamento. Isso não significa que sempre exista apenas uma conta de cada lado: um lançamento pode envolver várias contas.

As fórmulas classificam o lançamento pela quantidade de contas debitadas e creditadas:

| Fórmula | Estrutura | Como reconhecer |
|---|---|---|
| 1ª fórmula | 1 débito e 1 crédito | Uma conta de cada lado |
| 2ª fórmula | 1 débito e 2 ou mais créditos | Um débito, vários créditos |
| 3ª fórmula | 2 ou mais débitos e 1 crédito | Vários débitos, um crédito |
| 4ª fórmula | 2 ou mais débitos e 2 ou mais créditos | Vários débitos e vários créditos |

### Exemplo do cotidiano: compra de equipamento, parte à vista e parte a prazo

Imagine que uma empresa compre uma máquina por R$ 10.000. Paga R$ 4.000 na hora e deixa R$ 6.000 para pagar depois.

O que aconteceu?
- A máquina entrou na empresa: aumenta o Imobilizado.
- Uma parte saiu do banco: diminui Caixa/Bancos.
- A parte restante virou dívida: aumenta Fornecedores ou Obrigações a pagar.

Lançamento:

| Conta | Débito | Crédito |
|---|---:|---:|
| Máquinas e equipamentos (Imobilizado) | R$ 10.000 | — |
| Bancos (parcela paga) | — | R$ 4.000 |
| Fornecedores/Contas a pagar (parcela futura) | — | R$ 6.000 |
| **Total** | **R$ 10.000** | **R$ 10.000** |

Há **um débito e dois créditos**. Portanto, é lançamento de **2ª fórmula**, e não de 3ª fórmula.

### Como não confundir a 2ª com a 3ª fórmula?

Observe quantas contas aparecem de cada lado, não quantas parcelas foram pagas.

- 2ª fórmula: um débito de R$ 10.000 e dois créditos (R$ 4.000 + R$ 6.000).
- 3ª fórmula: dois débitos, por exemplo, Equipamentos de R$ 8.000 e Despesas de instalação de R$ 2.000, contra um único crédito em Bancos de R$ 10.000, se essa for a operação reconhecida.

### Macete para memorizar

- **1ª:** 1 para 1.
- **2ª:** 1 para vários créditos.
- **3ª:** vários débitos para 1.
- **4ª:** vários débitos para vários créditos.

A soma dos valores debitados sempre deve ser igual à soma dos valores creditados. A fórmula é definida pela quantidade de contas em cada lado, e não pelo valor, pelo número de pagamentos ou pelo fato de a compra ser à vista ou a prazo.

### Roteiro de prova

1. Identifique todas as contas do lançamento.
2. Conte quantas contas recebem débito.
3. Conte quantas contas recebem crédito.
4. Compare com a tabela das quatro fórmulas.
5. Confira se a soma dos débitos é igual à soma dos créditos.

$section$;
  v_cards jsonb := $cards$
[
 {"f":"O que determina a fórmula de lançamento?","b":"A quantidade de contas debitadas e de contas creditadas no lançamento."},
 {"f":"Qual é a estrutura da 1ª fórmula?","b":"Um débito e um crédito (1 para 1)."},
 {"f":"Qual é a estrutura da 2ª fórmula?","b":"Um débito e dois ou mais créditos (1 para vários)."},
 {"f":"Qual é a estrutura da 3ª fórmula?","b":"Dois ou mais débitos e um crédito (vários para 1)."},
 {"f":"Qual é a estrutura da 4ª fórmula?","b":"Dois ou mais débitos e dois ou mais créditos (vários para vários)."},
 {"f":"Compra de máquina com parte paga na hora e parte a prazo: qual fórmula, se houver um débito no imobilizado e dois créditos?","b":"2ª fórmula: um débito e dois créditos (Bancos e Fornecedores)."},
 {"f":"O que deve ser igual em todo lançamento pelo método das partidas dobradas?","b":"A soma dos valores debitados deve ser igual à soma dos valores creditados."}
]
$cards$::jsonb;
  v_quiz jsonb := $quiz$
[
 {"a":false,"q":"Um lançamento com um débito e dois créditos utiliza a terceira fórmula de partida dobrada.","tip":"Conte as contas em cada lado: um débito e vários créditos.","why":"É a segunda fórmula. A terceira fórmula exige dois ou mais débitos e apenas um crédito.","difficulty":"fácil"},
 {"a":true,"q":"A segunda fórmula de lançamento possui um débito e dois ou mais créditos.","tip":"Segunda fórmula: um débito para vários créditos.","why":"A classificação depende da quantidade de contas em cada lado do lançamento.","difficulty":"fácil"},
 {"a":true,"q":"Na compra de equipamento com parte à vista e parte a prazo, pode haver um débito no imobilizado e créditos em Bancos e Fornecedores.","tip":"A máquina entra; o pagamento imediato sai do banco; o restante vira obrigação.","why":"O imobilizado é debitado pelo valor total; Bancos e Fornecedores são creditados pelas respectivas parcelas. É a segunda fórmula.","difficulty":"média"},
 {"a":false,"q":"A quarta fórmula ocorre quando há vários débitos e apenas um crédito.","tip":"Vários débitos e um crédito correspondem à terceira fórmula.","why":"A quarta fórmula exige vários débitos e vários créditos. A terceira possui vários débitos e um crédito.","difficulty":"média"}
]
$quiz$::jsonb;
begin
  update public.study_materials
  set body_md = case
      when position('## Fórmulas de lançamento da partida dobrada' in coalesce(body_md,'')) > 0 then body_md
      else coalesce(body_md,'') || E'\n\n' || v_section
    end,
    flashcards = (
      select coalesce(jsonb_agg(card),'[]'::jsonb)
      from (
        select old_items.card
        from jsonb_array_elements(coalesce(study_materials.flashcards,'[]'::jsonb)) as old_items(card)
        union all
        select new_items.card
        from jsonb_array_elements(v_cards) as new_items(card)
        where not exists (
          select 1 from jsonb_array_elements(coalesce(study_materials.flashcards,'[]'::jsonb)) as old_cards(card)
          where old_cards.card->>'f'=new_items.card->>'f'
        )
      ) cards
    ),
    quiz = (
      select coalesce(jsonb_agg(item),'[]'::jsonb)
      from (
        select old_items.item
        from jsonb_array_elements(coalesce(study_materials.quiz,'[]'::jsonb)) as old_items(item)
        union all
        select new_items.item
        from jsonb_array_elements(v_quiz) as new_items(item)
        where not exists (
          select 1 from jsonb_array_elements(coalesce(study_materials.quiz,'[]'::jsonb)) as old_items(item)
          where old_items.item->>'q'=new_items.item->>'q'
        )
      ) quiz_items
    ),
    updated_at=now()
  where slug='pcac-2026-contabilidade-02-contas-receitas-despesas-fatos';

  update public.curated_question_catalog
  set explanation = $explanation$
EXPLICAÇÃO DIDÁTICA — As quatro fórmulas de lançamento

A partida dobrada exige igualdade: o total dos débitos deve ser igual ao total dos créditos. As fórmulas indicam quantas contas aparecem em cada lado:
• 1ª fórmula: um débito e um crédito.
• 2ª fórmula: um débito e dois ou mais créditos.
• 3ª fórmula: dois ou mais débitos e um crédito.
• 4ª fórmula: dois ou mais débitos e dois ou mais créditos.

Exemplo simples: uma empresa compra uma máquina por R$ 10.000, paga R$ 4.000 imediatamente e deixa R$ 6.000 para depois.

D — Máquinas e equipamentos (Imobilizado): R$ 10.000.
C — Bancos: R$ 4.000.
C — Fornecedores/Contas a pagar: R$ 6.000.

Por quê? A máquina entra pelo valor total; o dinheiro pago sai do banco; a parte não paga vira uma obrigação. Temos um débito e dois créditos. Portanto, é a SEGUNDA fórmula.

A afirmação pergunta se é obrigatório usar a terceira fórmula. Isso está errado: a terceira fórmula seria vários débitos e apenas um crédito.

MACETE:
1ª = 1 débito / 1 crédito.
2ª = 1 débito / vários créditos.
3ª = vários débitos / 1 crédito.
4ª = vários débitos / vários créditos.

Não confunda quantidade de parcelas com quantidade de contas debitadas ou creditadas. Conte as contas de cada lado. E confira sempre: total dos débitos = total dos créditos.
$explanation$,
    tested_topic='Escrituração: fórmulas de lançamento da partida dobrada'
  where id='96699a38-357d-4781-b696-c29f388f1e7f';
end $$;