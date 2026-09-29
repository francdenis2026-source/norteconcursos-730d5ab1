-- Explicações do dia a dia: Contabilidade Geral, PF 2018, itens 101-112
-- (lote 2). Mesmo padrão dos lotes anteriores: mecanismo contábil
-- reexplicado + bloco "Exemplo:". Cada item foi reconferido (inclusive as
-- contas de depreciação pelo método da soma dos dígitos e o resultado com
-- mercadorias) antes de escrever.

-- 101: fato modificativo sempre passa por uma conta de resultado (grupo 4: despesas/receitas).
update public.official_exam_questions set review_note=$q$Correto. Fato modificativo é aquele que muda o patrimônio líquido — e toda vez que o PL muda por uma operação do dia a dia (não uma reavaliação direta), isso passa antes por uma conta de resultado: uma receita (aumenta o PL) ou uma despesa (diminui o PL). No exercício, essas contas de resultado são exatamente as do grupo 4 (depreciação, vendas, salários).
Exemplo: é como todo gasto ou ganho do mês de uma família passar primeiro pelo "extrato do cartão" antes de afetar o quanto sobrou no fim do mês — o extrato (grupo 4) é a passagem obrigatória antes de mexer no saldo final (patrimônio líquido).$q$
where exam_year=2018 and item_number=101 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 102: crédito no grupo1 (ativo) + débito nos grupos 2(passivo) e 4(despesa) = fato misto (permutativo + modificativo juntos).
update public.official_exam_questions set review_note=$q$Correto. Um "fato misto" é quando um único lançamento junta as duas coisas ao mesmo tempo: uma troca sem afetar o patrimônio líquido (permutativo — aqui, ativo caindo e passivo caindo) e uma mudança real no patrimônio líquido (modificativo — aqui, a despesa do grupo 4). Como o lançamento do item mexe nos dois tipos de conta ao mesmo tempo, é misto por definição.
Exemplo: é como pagar uma conta de luz atrasada com multa: parte do pagamento quita a dívida (troca, sem afetar seu patrimônio líquido) e a multa é um gasto puro (reduz seu patrimônio líquido) — os dois efeitos acontecem juntos, no mesmo pagamento.$q$
where exam_year=2018 and item_number=102 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 103: "estoques em trânsito" é conta de ATIVO (natureza devedora), não credora.
update public.official_exam_questions set review_note=$q$Errado. "Estoques em trânsito" é uma conta de ATIVO — ela representa mercadorias que já são da empresa, só ainda não chegaram fisicamente. Toda conta de ativo tem natureza devedora (aumenta com débito), o contrário do que o item afirma.
Exemplo: é como um pacote que você já comprou e pagou, mas que ainda está a caminho pelos Correios — ele já é seu (um bem, um ativo), mesmo sem estar na sua mão ainda.$q$
where exam_year=2018 and item_number=103 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 104: estoque em trânsito é ativo circulante (estoques), NÃO "ativo disponível" (caixa/equivalentes).
update public.official_exam_questions set review_note=$q$Errado. "Ativo disponível" é reservado pra dinheiro e coisas que viram dinheiro na hora (caixa, saldo em banco, aplicações de liquidez imediata). Mercadoria em trânsito é estoque — parte do ativo circulante, mas num grupo diferente do disponível, porque ainda vai virar venda antes de virar dinheiro.
Exemplo: o dinheiro na sua carteira é "disponível" — pode ser gasto agora. Uma encomenda a caminho de casa não é "dinheiro disponível", mesmo já sendo sua: ela só vira uso (ou venda) depois de chegar.$q$
where exam_year=2018 and item_number=104 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 105: compra de mercadoria gera débito em estoques e crédito em fornecedores (a prazo) ou caixa (à vista).
update public.official_exam_questions set review_note=$q$Correto. Toda compra de mercadoria pra revenda é um débito na conta de estoques — e a contrapartida (o crédito) depende de como foi pago: se foi a prazo, credita Fornecedores (uma dívida); se foi à vista, credita Caixa/Bancos (o dinheiro que saiu). São as duas únicas formas possíveis de "fechar" esse lançamento.
Exemplo: comprar mantimentos no mercado — se você paga na hora, seu dinheiro (caixa) diminui; se você "fia" na mercearia do bairro, sua dívida com o dono (fornecedor) aumenta. De um jeito ou de outro, os mantimentos (estoque) entram.$q$
where exam_year=2018 and item_number=105 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 106: compra à vista com desconto já negociado no ato = lançamento simples (1 débito, 1 crédito), pelo valor líquido já pago.
update public.official_exam_questions set review_note=$q$Correto. Como o desconto de R$ 4.000 foi negociado ANTES da compra (não é um desconto financeiro concedido depois por pagamento antecipado), o veículo simplesmente "custou" R$ 80.000 — não precisa de uma terceira conta pra registrar o desconto. O lançamento fica simples: debita Veículos R$ 80.000, credita Caixa/Bancos R$ 80.000. Uma conta debitada, uma creditada — é o "lançamento de primeira fórmula".
Exemplo: é como negociar o preço de um carro usado antes de fechar negócio — se o vendedor já baixa o preço na conversa, você simplesmente paga o valor combinado; não tem "desconto" separado pra registrar depois, o preço já saiu menor desde o início.$q$
where exam_year=2018 and item_number=106 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 107: regime de competência: despesa reconhecida quando incorrida (usada), não quando paga.
update public.official_exam_questions set review_note=$q$Correto. O regime de competência manda reconhecer a despesa no momento em que ela acontece de verdade (o imóvel foi usado), não no momento em que o dinheiro sai do caixa. Como o aluguel foi usado neste exercício, ele é despesa deste exercício — mesmo que o pagamento só ocorra no ano seguinte (fica registrado como uma dívida, "aluguéis a pagar").
Exemplo: usar o carro alugado o mês inteiro e só pagar a fatura no mês seguinte não muda o fato de que você USOU o carro em outubro — a despesa é de outubro, o pagamento é que atrasou.$q$
where exam_year=2018 and item_number=107 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 108: o mecanismo contábil está certo, mas a JUSTIFICATIVA está errada — é regime de competência, não de caixa.
update public.official_exam_questions set review_note=$q$Errado. A parte técnica do lançamento até está certa (débito em Caixa, crédito numa conta de passivo — "Adiantamento de Clientes"), mas o item erra a justificativa: isso NÃO é regime de caixa, é justamente o regime de COMPETÊNCIA. Como o serviço ou produto ainda não foi entregue, a empresa não pode reconhecer aquele dinheiro como receita ainda — por isso ele vira uma dívida (obrigação de entregar), até a entrega acontecer.
Exemplo: quando você paga um sinal por um móvel sob encomenda, a loja não pode "contar" esse dinheiro como venda ainda — ela registra como uma dívida com você (te deve o móvel), só vira venda de fato quando o móvel é entregue.$q$
where exam_year=2018 and item_number=108 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 109: resultado com mercadorias = receita líquida (10.000) - CMV (5.500) = 4.500.
update public.official_exam_questions set review_note=$q$Correto. O resultado com mercadorias (lucro bruto da venda) é sempre: receita líquida da venda menos o custo do que foi vendido (CMV). Aqui: R$ 10.000 (venda líquida) − R$ 5.500 (baixa do estoque vendido) = R$ 4.500.
Exemplo: é a conta de "quanto sobrou" de vender algo — se você revende um celular usado por R$ 1.000 e ele te custou R$ 600, seu resultado com aquela venda foi R$ 400, não os R$ 1.000 inteiros.$q$
where exam_year=2018 and item_number=109 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 110: a diferença de 3.000 no desconto bancário não vira despesa integral na hora — fica em "despesas financeiras a apropriar", reconhecida aos poucos pela competência.
update public.official_exam_questions set review_note=$q$Errado. A diferença entre o valor nominal (R$ 100.000) e o valor recebido (R$ 97.000) é o custo do desconto bancário — mas pela competência, esse custo se refere aos 60 dias até o vencimento do título, que ainda não passaram. Por isso ele não vira despesa financeira "de uma vez só" no momento do desconto: entra como um valor a apropriar (uma espécie de despesa antecipada), que vai virando despesa aos poucos, mês a mês, até o vencimento.
Exemplo: é como pagar de uma vez o seguro do carro pra 12 meses — você não lança o valor inteiro como gasto no mês do pagamento, vai "gastando" um pedaço por mês, porque a proteção (ou aqui, o custo do empréstimo) se estende ao longo do tempo.$q$
where exam_year=2018 and item_number=110 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 111: depreciação pelo método da soma dos dígitos: base depreciável 54.000 (60.000-10% residual), 3ª cota = (5-3+1)/15 × 54.000 = 10.800.
update public.official_exam_questions set review_note=$q$Correto. Valor residual é 10% de R$ 60.000 = R$ 6.000, então a base que se deprecia é R$ 54.000. No método da soma dos dígitos (5 anos: 5+4+3+2+1=15), a fração da 3ª cota é (5−3+1)/15 = 3/15. Multiplicando: 54.000 × 3/15 = R$ 10.800 — bate exatamente com o item. Depreciação acumulada é uma conta credora que vai "encolhendo" o valor do ativo ao longo do tempo.
Exemplo: no método da soma dos dígitos, a depreciação é maior nos primeiros anos e vai diminuindo — como o valor de revenda de um carro novo, que cai mais forte logo nos primeiros anos e desacelera depois.$q$
where exam_year=2018 and item_number=111 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 112: balancete só detecta erros que quebram a igualdade débito=crédito, não TODOS os erros possíveis.
update public.official_exam_questions set review_note=$q$Errado. O balancete detecta só um tipo específico de erro: quando o total de débitos não bate com o total de créditos. Ele NÃO pega erros como lançar um valor certo na conta errada, esquecer um lançamento inteiro, ou dois erros que "se anulam" (um a mais e outro a menos, no mesmo valor) — esses passam batido, mesmo com o balancete "fechando" perfeitamente.
Exemplo: é como conferir se o total de uma nota fiscal bate com o total pago — se bater, não quer dizer que cada item da nota está certo, só que a soma final está igual. Um item trocado por outro de mesmo preço passaria despercebido.$q$
where exam_year=2018 and item_number=112 and career_name='Agente de Polícia Federal' and official_answer='E';
