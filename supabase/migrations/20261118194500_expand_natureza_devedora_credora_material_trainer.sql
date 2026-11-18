-- Expande natureza devedora/credora no material e no comentário pós-resposta do Treinador.
do $$
declare
  v_section text := $section$
## Natureza devedora e natureza credora das contas

### 1. Primeiro: débito e crédito não significam bom e ruim

Na Contabilidade, **débito** e **crédito** são os dois lados do registro:
- Débito = lado esquerdo da conta.
- Crédito = lado direito da conta.

Eles não significam, por si só, entrada ou saída de dinheiro, nem algo positivo ou negativo. O efeito depende do tipo de conta.

### 2. O que significa natureza de uma conta?

A natureza indica o lado em que a conta normalmente apresenta saldo e pelo qual aumenta.

- **Natureza devedora:** normalmente aumenta por débito e diminui por crédito.
- **Natureza credora:** normalmente aumenta por crédito e diminui por débito.

Pense na natureza como o “lado normal” daquela conta.

### 3. Regra simples para memorizar

| Grupo de contas | Natureza usual | Para aumentar |
|---|---|---|
| Ativo (Caixa, Bancos, Clientes, Estoques, Máquinas) | Devedora | Débito |
| Despesas (Salários, Aluguel, Energia) | Devedora | Débito |
| Custos (Custo das Mercadorias Vendidas, custos de produção) | Devedora | Débito |
| Passivo (Empréstimos a pagar, Fornecedores, Salários a pagar) | Credora | Crédito |
| Patrimônio Líquido (Capital Social, Reservas) | Credora | Crédito |
| Receitas (Receita de Vendas, Receita de Serviços) | Credora | Crédito |

**Macete:** Ativo, Despesa e Custo costumam ser devedores. Passivo, Patrimônio Líquido e Receita costumam ser credores.

Atenção: existem contas retificadoras, cuja natureza é oposta à do grupo que reduzem. Exemplos: depreciação acumulada e perdas estimadas em créditos de liquidação duvidosa são credoras, embora reduzam contas do Ativo; ações em tesouraria e capital a integralizar são redutoras do Patrimônio Líquido e têm natureza devedora.

### 4. Exemplo do cotidiano: Caixa

A empresa começa com R$ 1.000 no Caixa.

- Recebe R$ 300 de um cliente: debita Caixa em R$ 300. O saldo de Caixa aumenta para R$ 1.300.
- Paga R$ 200 de energia: credita Caixa em R$ 200. O saldo de Caixa cai para R$ 1.100.

Caixa é Ativo e tem natureza devedora: aumenta por débito e diminui por crédito.

### 5. Exemplo do cotidiano: Empréstimo a pagar

A empresa contrata um empréstimo de R$ 5.000.

- A obrigação “Empréstimos a pagar” aumenta por crédito.
- Quando a empresa paga R$ 1.000 do principal, debita Empréstimos a pagar: a dívida diminui.

Empréstimos a pagar é Passivo e tem natureza credora: aumenta por crédito e diminui por débito.

### 6. Por que salários a pagar é credora, mas despesa com salários é devedora?

Não confunda duas contas com nomes parecidos:

- **Despesa com salários:** representa o gasto com o trabalho dos empregados. É conta de resultado de natureza devedora.
- **Salários a pagar:** representa o valor que a empresa ainda deve aos empregados. É obrigação, conta do Passivo de natureza credora.

Exemplo: a empresa reconhece R$ 2.000 de salários ainda não pagos:
- Débito: Despesa com salários — R$ 2.000.
- Crédito: Salários a pagar — R$ 2.000.

A mesma operação gera uma despesa de natureza devedora e uma obrigação de natureza credora.

### 7. Como resolver questões que pedem todas as contas de natureza credora

Faça uma triagem de cada nome:
1. É dinheiro, bem ou direito? Em regra, Ativo — natureza devedora.
2. É despesa ou custo? Natureza devedora.
3. É obrigação a pagar? Passivo — natureza credora.
4. É capital, reserva ou outra conta do PL? Em regra, natureza credora.
5. É receita? Natureza credora.
6. É conta redutora? Confira: sua natureza costuma ser oposta à do grupo que ela reduz.

Não escolha uma alternativa porque uma conta parece “positiva”. Classifique cada conta individualmente. Uma única conta de natureza diferente torna a alternativa inteira incorreta.

### 8. Pegadinhas frequentes

- **Caixa** é devedora; não confunda com empréstimos a pagar.
- **Contas a receber** é direito (Ativo), portanto devedora.
- **Empréstimos a pagar** é obrigação (Passivo), portanto credora.
- **Despesa com salários** é devedora; **salários a pagar** é credora.
- **Receita de vendas** é credora.
- **Máquinas e equipamentos** são Ativo e, em regra, têm natureza devedora.
- **Depreciação acumulada** é uma exceção importante: conta redutora do Ativo com natureza credora.

### 9. Roteiro de prova

Leia cada conta e pergunte: “A empresa tem/tem direito a receber?”, “A empresa deve?”, “É receita?”, “É despesa?”. Depois associe:
- Tem ou tem direito a receber → Ativo → normalmente devedora.
- Deve → Passivo → normalmente credora.
- Receita → credora.
- Despesa/custo → devedora.

$section$;
  v_cards jsonb := $cards$
[
 {"f":"O que significa natureza devedora?","b":"A conta normalmente aumenta por débito e diminui por crédito."},
 {"f":"O que significa natureza credora?","b":"A conta normalmente aumenta por crédito e diminui por débito."},
 {"f":"Qual é a natureza usual das contas do Ativo?","b":"Devedora: aumentam por débito."},
 {"f":"Qual é a natureza usual das contas do Passivo?","b":"Credora: aumentam por crédito."},
 {"f":"Qual é a natureza usual das contas de receita?","b":"Credora: receitas aumentam por crédito."},
 {"f":"Qual é a natureza usual das despesas e dos custos?","b":"Devedora: aumentam por débito."},
 {"f":"Qual a diferença entre Despesa com salários e Salários a pagar?","b":"Despesa com salários é conta de resultado de natureza devedora; Salários a pagar é obrigação do Passivo, de natureza credora."},
 {"f":"Qual a natureza de Empréstimos a pagar?","b":"Credora, porque representa uma obrigação (Passivo)."},
 {"f":"Qual a natureza de Contas a receber?","b":"Devedora, porque representa um direito (Ativo)."},
 {"f":"Qual a natureza de Receita de vendas?","b":"Credora, porque é conta de receita."},
 {"f":"Débito sempre significa entrada de dinheiro?","b":"Não. Débito é o lado esquerdo do lançamento; o efeito depende da natureza da conta."},
 {"f":"Cite uma conta redutora do Ativo de natureza credora.","b":"Depreciação acumulada ou perdas estimadas em créditos de liquidação duvidosa."}
]
$cards$::jsonb;
  v_quiz jsonb := $quiz$
[
 {"a":true,"q":"Caixa é uma conta do Ativo e possui natureza devedora.","tip":"Dinheiro disponível é recurso da entidade; Ativo aumenta por débito.","why":"Caixa é Ativo e seu saldo normal é devedor.","difficulty":"fácil"},
 {"a":false,"q":"Empréstimos a pagar possui natureza devedora porque representa dinheiro recebido pela empresa.","tip":"Separe o dinheiro que entrou (Caixa/Bancos) da dívida que nasceu.","why":"O dinheiro recebido aumenta o Ativo (devedor), mas Empréstimos a pagar é Passivo, de natureza credora.","difficulty":"média"},
 {"a":true,"q":"Salários a pagar é uma obrigação e, por isso, possui natureza credora.","tip":"A expressão 'a pagar' indica uma dívida com os empregados.","why":"A obrigação integra o Passivo e aumenta por crédito.","difficulty":"fácil"},
 {"a":false,"q":"Despesa com salários e Salários a pagar possuem necessariamente a mesma natureza.","tip":"Uma conta representa o gasto; a outra representa a dívida ainda não paga.","why":"Despesa com salários é devedora; Salários a pagar é credora.","difficulty":"média"},
 {"a":true,"q":"Receita de vendas é uma conta de resultado de natureza credora.","tip":"Receitas aumentam o resultado e normalmente aumentam por crédito.","why":"Receita é conta de resultado com natureza credora.","difficulty":"fácil"},
 {"a":false,"q":"Contas a receber é de natureza credora porque o cliente deve dinheiro à empresa.","tip":"Pergunte quem tem o direito de receber: a própria empresa.","why":"Para a empresa, contas a receber é um direito (Ativo), de natureza devedora.","difficulty":"média"},
 {"a":true,"q":"Máquinas e equipamentos são, em regra, contas do Ativo de natureza devedora.","tip":"São bens controlados pela entidade.","why":"O imobilizado integra o Ativo e aumenta por débito.","difficulty":"fácil"},
 {"a":true,"q":"A depreciação acumulada é uma conta redutora do Ativo com natureza credora.","tip":"Contas retificadoras costumam ter natureza oposta à do grupo que reduzem.","why":"Ela reduz o valor contábil do imobilizado e apresenta saldo credor.","difficulty":"difícil"}
]
$quiz$::jsonb;
begin
  update public.study_materials
  set body_md = case
      when position('## Natureza devedora e natureza credora das contas' in coalesce(body_md,'')) > 0 then body_md
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

  update public.official_exam_questions
  set review_note = $note$
COMENTÁRIO DIDÁTICO — Natureza devedora e natureza credora das contas

Antes de olhar as alternativas, entenda: débito e crédito são apenas os dois lados do registro contábil. Débito é o lado esquerdo; crédito é o lado direito. Não significam, por si só, entrada/saída de dinheiro nem bom/ruim.

Natureza devedora: a conta normalmente aumenta por débito e diminui por crédito.
Natureza credora: a conta normalmente aumenta por crédito e diminui por débito.

REGRA PARA MEMORIZAR:
• Ativo (Caixa, Contas a receber, Máquinas): natureza devedora.
• Despesas (Despesa com salários) e custos: natureza devedora.
• Passivo (Empréstimos a pagar, Salários a pagar, Fornecedores): natureza credora.
• Patrimônio Líquido (Capital Social, Reservas): natureza credora.
• Receitas (Receita de vendas): natureza credora.

EXEMPLO SIMPLES:
A empresa reconhece R$ 2.000 de salários ainda não pagos:
D — Despesa com salários: R$ 2.000 (despesa de natureza devedora).
C — Salários a pagar: R$ 2.000 (obrigação de natureza credora).
Perceba: os nomes são parecidos, mas as naturezas são diferentes. A despesa representa o gasto; salários a pagar representa a dívida com os empregados.

COMO ANALISAR AS ALTERNATIVAS:
A) Caixa e equivalentes, contas a receber e máquinas/equipamentos: são contas do Ativo, normalmente de natureza devedora.
B) Despesas com salários e máquinas/equipamentos são de natureza devedora; receita de vendas é credora. A lista mistura naturezas.
C) Contas a receber é Ativo e de natureza devedora; empréstimos a pagar e salários a pagar são Passivo e de natureza credora. A lista mistura naturezas.
D) Empréstimos a pagar e salários a pagar são obrigações (Passivo), de natureza credora; receita de vendas também é credora. Todas as contas da lista têm natureza credora.
E) Caixa e equivalentes são Ativo (devedor); despesas com salários são devedoras; empréstimos a pagar é credora. A lista mistura naturezas.

ATALHO DE PROVA:
“Tem ou tem direito a receber?” → Ativo → normalmente devedora.
“Deve pagar?” → Passivo → normalmente credora.
“É receita?” → credora.
“É despesa ou custo?” → devedora.

CUIDADO COM EXCEÇÕES: contas retificadoras têm natureza oposta ao grupo que reduzem. Depreciação acumulada, por exemplo, reduz o Ativo e tem natureza credora. Ações em tesouraria reduzem o PL e têm natureza devedora.

O gabarito oficial da questão é D. Não escolha pela aparência do nome: classifique cada conta individualmente.
$note$,
    tested_topic='Contas contábeis: natureza devedora e credora',
    verified_at=now()
  where id='3ef79fc5-5345-45ed-8db6-f7a34f5d8a37';
end $$;