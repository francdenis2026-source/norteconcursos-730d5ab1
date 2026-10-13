-- Auditoria PF 2021 Agente de Polícia Federal — lote 3 (9 itens de
-- Contabilidade Geral). A tabela do patrimônio da empresa (31/12/2020) foi
-- capturada integralmente no enunciado do item 96, permitindo auditar os
-- cálculos com segurança: caixa 20.000; duplicatas a receber 50.000;
-- empréstimos a pagar 30.000; estoques 40.000; imóveis de uso próprio
-- 200.000; depreciação acumulada 10.000; capital social 220.000;
-- fornecedores 20.000; salários a pagar 50.000; reservas de lucros 10.000;
-- depósitos em bancos 10.000; impostos a recolher 10.000; aplicações
-- financeiras de liquidez imediata 30.000. Item 106 já está anulado.

update public.official_exam_questions
set review_note=$q$Correto. O patrimônio líquido é a soma das contas de capital próprio: capital social (R$ 220.000) + reservas de lucros (R$ 10.000) = R$ 230.000.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=97;

update public.official_exam_questions
set review_note=$q$Correto. Pelo princípio do custo histórico, imóveis de uso próprio são avaliados pelo custo de aquisição, deduzido da depreciação acumulada — a diferença entre o saldo bruto de "imóveis de uso próprio" (R$ 200.000) e "depreciação acumulada" (R$ 10.000) resulta no valor contábil líquido (R$ 190.000).$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=98;

update public.official_exam_questions
set review_note=$q$Errado. Caixa e estoques são contas do ATIVO, cuja natureza contábil é DEVEDORA — não credora. Contas de natureza credora são as do passivo e do patrimônio líquido.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=99;

update public.official_exam_questions
set review_note=$q$Errado. As disponibilidades somam caixa (R$ 20.000) + depósitos em bancos (R$ 10.000) + aplicações financeiras de liquidez imediata (R$ 30.000) = R$ 60.000, e não R$ 30.000 como afirma o item.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=100;

update public.official_exam_questions
set review_note=$q$Errado. O ativo total soma caixa (20.000) + duplicatas a receber (50.000) + estoques (40.000) + imóveis de uso próprio líquido (200.000 − 10.000 = 190.000) + depósitos em bancos (10.000) + aplicações financeiras (30.000) = R$ 340.000, não R$ 350.000. O capital de terceiros (passivo exigível: empréstimos a pagar 30.000 + fornecedores 20.000 + salários a pagar 50.000 + impostos a recolher 10.000) soma R$ 110.000, não R$ 120.000.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=101;

update public.official_exam_questions
set review_note=$q$Correto. A quitação antecipada de uma dívida com desconto é um fato contábil MISTO: altera simultaneamente elementos quantitativos (reduz o passivo por valor menor que o originalmente devido) e qualitativos (gera uma receita financeira pelo desconto obtido) — por isso combina efeitos permutativos e modificativos.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=102;

update public.official_exam_questions
set review_note=$q$Correto. Pelo regime de competência, o desconto obtido na quitação antecipada deve ser reconhecido como receita financeira na própria data da quitação, momento em que o ganho se realiza — independentemente do efetivo recebimento ou pagamento em caixa.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=103;

update public.official_exam_questions
set review_note=$q$Errado. A versão ampliada da equação patrimonial é: ATIVO + DESPESAS = PASSIVO + PATRIMÔNIO LÍQUIDO + RECEITAS. O item inverte os termos, colocando "receitas e ganhos" do lado do ativo e "despesas e perdas" do lado do passivo — o oposto da formulação correta.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=104;

update public.official_exam_questions
set review_note=$q$Correto. O livro Razão é o registro contábil que apresenta, para cada conta, os lançamentos e o saldo das contas representativas dos elementos patrimoniais e de resultado de uma entidade.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=105;
