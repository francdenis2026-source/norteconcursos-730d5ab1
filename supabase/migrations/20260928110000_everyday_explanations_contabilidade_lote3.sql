-- Explicações do dia a dia: Contabilidade Geral, lote 3 — PF 2018 (itens
-- 115, 116, 118) e PF 2021 (itens 97-105). Mesmo padrão dos lotes
-- anteriores. Cada soma/subtração do balanço foi refeita do zero antes de
-- escrever (inclusive o "truque" do item 101, que mistura ativo bruto com
-- capital de terceiros pra parecer que fecha).

-- 115: soma do ativo = caixa+duplicatas a receber+estoques+máquinas+terrenos+marcas = 500.000.
update public.official_exam_questions set review_note=$q$Correto. Somando só as contas de ATIVO da tabela — caixa (10.000) + duplicatas a receber (80.000) + estoques (50.000) + máquinas (100.000) + terrenos (160.000) + marcas e patentes (100.000) — dá exatamente R$ 500.000. As demais contas da tabela (fornecedores, duplicatas descontadas, salários a pagar, capital social) são passivo ou PL, não entram nessa soma.
Exemplo: é como separar, numa lista de "coisas da família", só o que é bem/direito (casa, carro, dinheiro) e ignorar as dívidas — o ativo é só a metade "do que a empresa tem".$q$
where exam_year=2018 and item_number=115 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 116: lucro bruto = vendas(1.000.000) - CMV(600.000) = 400.000, não 50.000.
update public.official_exam_questions set review_note=$q$Errado. Lucro bruto é receita de vendas menos o custo do que foi vendido (CMV): R$ 1.000.000 − R$ 600.000 = R$ 400.000 — bem diferente dos R$ 50.000 do item. As despesas administrativas, comerciais, financeiras e o IR/CSLL vêm DEPOIS do lucro bruto, pra chegar no lucro líquido; não entram nessa conta.
Exemplo: lucro bruto é "quanto sobrou de vender a mercadoria em si" — os outros gastos da empresa (aluguel, salários do escritório, juros) só entram na conta seguinte, pra saber o que realmente sobrou no fim do mês.$q$
where exam_year=2018 and item_number=116 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 118: Lei 6.404/76 regula tanto companhias abertas (com ações na bolsa) quanto fechadas (sem).
update public.official_exam_questions set review_note=$q$Correto. A Lei das Sociedades por Ações (Lei nº 6.404/1976) vale pra toda sociedade anônima, seja ela "aberta" (com ações negociadas em bolsa) ou "fechada" (sem ações na bolsa) — a diferença entre os dois tipos está dentro da própria lei (regras extras pra quem é aberta), não uma exclusão de quem é fechada.
Exemplo: é como uma lei de trânsito que vale pra todo carro registrado, tenha ele placa de aplicativo ou não — o fato de circular numa plataforma específica (aqui, a bolsa de valores) não tira a empresa de dentro da mesma lei geral.$q$
where exam_year=2018 and item_number=118 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 97 (PF2021): PL = capital social(220.000)+reservas de lucros(10.000) = 230.000.
update public.official_exam_questions set review_note=$q$Correto. O patrimônio líquido é a soma das contas "de capital" da empresa: capital social (R$ 220.000) + reservas de lucros (R$ 10.000) = R$ 230.000. As demais contas da lista (caixa, duplicatas, empréstimos, fornecedores etc.) são ativo ou passivo exigível, não entram no PL.
Exemplo: é "quanto sobraria pros donos" se a empresa vendesse tudo (ativo) e pagasse todas as dívidas (passivo) — nesse caso, R$ 230.000.$q$
where exam_year=2021 and item_number=97 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 98: imóveis avaliados pelo custo histórico menos depreciação acumulada (valor contábil líquido) — método padrão.
update public.official_exam_questions set review_note=$q$Correto. A forma padrão de avaliar um bem do ativo imobilizado (como um imóvel) é pelo custo de aquisição, subtraindo a depreciação acumulada até aquela data — o chamado "valor contábil líquido". Aqui, os imóveis custaram R$ 200.000 e têm R$ 10.000 de depreciação acumulada, então valem R$ 190.000 líquidos nas demonstrações — exatamente o método descrito no item.
Exemplo: é como avaliar um carro usado — parte do "quanto custou" (preço de tabela) e desconta um valor pelo desgaste (anos de uso), chegando no valor real de hoje.$q$
where exam_year=2021 and item_number=98 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 99: caixa e estoques são ATIVO (natureza devedora), não credora.
update public.official_exam_questions set review_note=$q$Errado. Caixa e estoques são bens — contas de ATIVO — e toda conta de ativo tem natureza devedora (aumenta com débito), não credora. O item inverte a regra básica: contas devedoras (ativo, despesa) crescem no débito; contas credoras (passivo, PL, receita) crescem no crédito.
Exemplo: pensa no seu bolso — o dinheiro que você TEM (ativo, como caixa) é bem diferente do que você DEVE (passivo) — são naturezas opostas, e caixa está sempre do lado de "o que eu tenho".$q$
where exam_year=2021 and item_number=99 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 100: disponibilidades = caixa(20.000)+depósitos em bancos(10.000)+aplicações de liquidez imediata(30.000) = 60.000, não 30.000.
update public.official_exam_questions set review_note=$q$Errado. "Disponibilidades" reúne TODAS as contas de dinheiro pronto pra usar: caixa (R$ 20.000) + depósitos em bancos (R$ 10.000) + aplicações financeiras de liquidez imediata (R$ 30.000) = R$ 60.000. O item conta só as aplicações financeiras (R$ 30.000) e esquece o caixa e o banco — um erro clássico de "esquecer de somar tudo que é da mesma família".
Exemplo: seu "dinheiro disponível" não é só o que está na poupança — é a soma da carteira, da conta corrente E da poupança, tudo junto.$q$
where exam_year=2021 and item_number=100 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 101: ativo líquido real = 340.000 (não 350.000) e capital de terceiros real = 110.000 (não 120.000) — o item soma o ativo bruto (sem descontar a depreciação) e, pra "fechar a conta", trata a depreciação acumulada como se fosse dívida (capital de terceiros), o que é um erro de classificação.
update public.official_exam_questions set review_note=$q$Errado. Somando certo: ativo líquido = caixa(20.000)+duplicatas a receber(50.000)+estoques(40.000)+imóveis(200.000)−depreciação acumulada(10.000)+depósitos em bancos(10.000)+aplicações(30.000) = R$ 340.000, não R$ 350.000. E capital de terceiros (as dívidas reais com fora da empresa) = empréstimos(30.000)+fornecedores(20.000)+salários a pagar(50.000)+impostos a recolher(10.000) = R$ 110.000, não R$ 120.000. O item só "fecha" (350−120=230) porque trata a depreciação acumulada como se fosse uma dívida — mas ela não é: é um redutor do próprio ativo, não uma obrigação com terceiros.
Exemplo: é como calcular "quanto seu carro vale de verdade" já descontando o desgaste, em vez de somar o preço de tabela e fingir que o desgaste é uma dívida com o mecânico — são coisas diferentes, mesmo que os números "batam" se você errar de propósito os dois lados igual.$q$
where exam_year=2021 and item_number=101 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 102: quitação antecipada com desconto obtido = fato misto (permutativo + modificativo/receita).
update public.official_exam_questions set review_note=$q$Correto. Pagar a dívida faz uma troca (caixa desce, a dívida quita — permutativo), mas o desconto obtido é um ganho que aumenta o patrimônio líquido (modificativo, uma receita financeira). Como os dois efeitos acontecem no mesmo lançamento, é um fato misto.
Exemplo: é como quitar um boleto antes do vencimento e ganhar um desconto — parte do dinheiro paga a dívida (troca), e o desconto que você "ganhou" é um lucrinho extra (ganho) que entra no seu bolso.$q$
where exam_year=2021 and item_number=102 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 103: desconto obtido reconhecido como receita financeira na data da quitação, coerente com competência (o evento e o reconhecimento coincidem).
update public.official_exam_questions set review_note=$q$Correto. O regime de competência manda reconhecer o ganho no momento em que ele efetivamente acontece — e aqui o desconto só existe, de fato, no exato momento da quitação antecipada (antes disso era só uma possibilidade). Por isso reconhecer a receita financeira na mesma data do pagamento está certo, sem violar a competência.
Exemplo: o desconto só "nasce" quando você realmente paga adiantado — antes disso era só uma promessa. Por isso o ganho é registrado no dia em que ele de fato se concretiza.$q$
where exam_year=2021 and item_number=103 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 104: a equação expandida correta é Ativo+Despesas+Perdas = Passivo+PL+Receitas+Ganhos; o item inverteu os dois lados.
update public.official_exam_questions set review_note=$q$Errado. A equação patrimonial expandida certa é: Ativo + Despesas + Perdas = Passivo + Patrimônio Líquido + Receitas + Ganhos. Despesas e perdas "encolhem" o patrimônio líquido, então elas ficam do mesmo lado do ativo (lado devedor); receitas e ganhos "aumentam" o PL, então ficam do lado do passivo/PL (lado credor). O item colocou receitas e ganhos do lado errado (com o ativo) e despesas/perdas do lado errado (com o passivo) — inverteu tudo.
Exemplo: pensa em dois pratos de uma balança — de um lado ficam "o que eu tenho + o que eu gastei" e do outro "o que eu devo + o que eu ganhei + o que sobrou de patrimônio". Trocar os lados desmonta a balança.$q$
where exam_year=2021 and item_number=104 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 105: livro Razão mostra os saldos por conta.
update public.official_exam_questions set review_note=$q$Correto. O livro Razão é onde cada conta (Caixa, Fornecedores, Estoques etc.) acumula seus lançamentos e mostra o saldo atualizado — é a "ficha" individual de cada elemento do patrimônio. É exatamente esse saldo por conta que alimenta o balancete de verificação depois.
Exemplo: é como o extrato individual de cada cartão de crédito que você tem — cada um mostra seu próprio saldo, separado dos outros, antes de você somar tudo numa visão geral.$q$
where exam_year=2021 and item_number=105 and career_name='Agente de Polícia Federal' and official_answer='C';
