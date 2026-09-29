-- Explicações do dia a dia: Contabilidade Geral, PF 2014 (itens 81-90) e
-- PF 2018 (itens 97-100). Mesmo padrão das migrations anteriores: mecanismo
-- contábil reexplicado em linguagem simples + bloco "Exemplo:" com analogia
-- do dia a dia. Cada item foi reconferido pela teoria contábil (partidas
-- dobradas, classificação de despesas, identidade Ativo=Passivo+PL etc.)
-- antes de escrever — não é matéria de legislação, então não depende de
-- consulta ao Planalto.

-- 81: o seguro já foi pago à vista (débito em "Seguros a Vencer" no ato do pagamento).
-- A apropriação mensal só reconhece a despesa, sem mexer em caixa/bancos de novo.
update public.official_exam_questions set review_note=$q$Errado. O dinheiro do seguro de 12 meses já saiu do caixa/banco no dia do PAGAMENTO — foi lá que se creditou Caixa/Bancos e debitou "Seguros a Vencer" (um ativo, o direito de ser segurado nos meses seguintes). Todo mês, a apropriação só transfere um pedacinho desse direito pra despesa: débito em Despesa de Seguros, crédito em Seguros a Vencer — Caixa e Bancos não entram de novo nessa conta.
Exemplo: é como comprar uma van de 12 passagens de ônibus de uma vez (pagou tudo no banco na hora da compra) e ir "gastando" uma passagem por mês. O mês em que você usa a passagem não tira dinheiro do banco de novo — o gasto já tinha saído lá atrás; agora só está sendo contabilizado aos poucos.$q$
where exam_year=2014 and item_number=81 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 82: direito de explorar jazida de terceiro é um bem incorpóreo (intangível), como uma concessão.
update public.official_exam_questions set review_note=$q$Correto. Bem incorpóreo (intangível) é aquele que não se pode tocar, mas tem valor econômico — marcas, patentes, concessões. O direito de explorar uma jazida que é de outro dono é exatamente esse tipo de direito: você não é dono do minério em si, mas tem um direito valioso de extraí-lo.
Exemplo: é como o direito de um restaurante de usar o nome de uma franquia famosa — não dá pra "segurar" esse direito com a mão, mas ele vale dinheiro e entra na contabilidade da empresa como um ativo intangível.$q$
where exam_year=2014 and item_number=82 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 83: pagar uma duplicata já registrada é fato permutativo (Ativo caixa desce, Passivo fornecedores desce, PL não muda).
update public.official_exam_questions set review_note=$q$Correto. Fato permutativo é aquele que troca um elemento do patrimônio por outro sem alterar o patrimônio líquido. Pagar uma duplicata é isso: o Caixa/Banco diminui (ativo) e a dívida com o fornecedor também diminui (passivo) — o mesmo valor sai dos dois lados, e o "quanto a empresa vale" no fim não muda.
Exemplo: é como pagar a fatura do cartão de crédito — o saldo da sua conta cai, mas a dívida que você tinha cai na mesma proporção; sua "riqueza líquida" (o que você tem menos o que deve) continua igual.$q$
where exam_year=2014 and item_number=83 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 85: plano de contas é feito sob medida pra cada empresa/operação.
update public.official_exam_questions set review_note=$q$Correto. O plano de contas é a "lista de gavetas" onde cada empresa organiza seus registros contábeis, e cada negócio tem operações diferentes — uma fábrica precisa de contas de estoque de matéria-prima que uma prestadora de serviços nunca vai usar, por exemplo. Por isso o plano de contas varia bastante de empresa para empresa.
Exemplo: é como a lista de pastas do computador de um contador que atende clínicas versus um que atende transportadoras — as pastas gerais (financeiro, clientes) parecem com as mesmas categorias, mas o detalhe de cada uma muda conforme o negócio.$q$
where exam_year=2014 and item_number=85 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 86: superveniência ativa (ganho inesperado) e insubsistência passiva (dívida que "sumiu", também ganho) têm o MESMO efeito, não oposto.
update public.official_exam_questions set review_note=$q$Errado. Superveniência ativa é um ganho inesperado (ex.: recuperar um crédito que já tinha sido dado como perdido) e insubsistência passiva é uma dívida que deixa de existir por ter sido superestimada (ex.: uma provisão de imposto que não vai mais ser cobrada) — as duas AUMENTAM o patrimônio líquido, no mesmo sentido, não em sentidos opostos como o item afirma.
Exemplo: achar R$100 que você achava perdidos (superveniência ativa) e descobrir que uma conta de R$100 que você ia pagar foi cancelada (insubsistência passiva) têm o mesmo efeito no seu bolso: você fica mais rico nos dois casos, não um rico e outro pobre.$q$
where exam_year=2014 and item_number=86 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 88: comissão de vendedor é despesa COMERCIAL/de vendas, não administrativa.
update public.official_exam_questions set review_note=$q$Errado. Comissão de vendedor é despesa ligada diretamente ao esforço de vender — por isso entra no grupo de "despesas comerciais" (ou "despesas com vendas"), separado das despesas administrativas, que são os custos de manter a estrutura da empresa funcionando (RH, contabilidade, diretoria).
Exemplo: o salário do vendedor que ganha por comissão é como o combustível de um carro de entrega — está ligado direto à venda/entrega. Já o salário da recepcionista do escritório é como o aluguel da garagem: mantém a estrutura, mas não está ligado a uma venda específica.$q$
where exam_year=2014 and item_number=88 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 89: venda de partes beneficiárias/bônus de subscrição vira Reserva de Capital.
update public.official_exam_questions set review_note=$q$Correto. Dinheiro que entra na empresa sem ser pela venda normal de produtos/serviços nem pela venda de ações — como na alienação de partes beneficiárias ou bônus de subscrição — é registrado como Reserva de Capital, um tipo de reserva que fica "guardada" separada do lucro operacional da empresa.
Exemplo: é como o dinheiro que uma empresa recebe ao vender um direito especial de participação nos lucros pra um investidor — não é venda de mercadoria nem lucro do negócio, então vai pra uma "gaveta" própria do patrimônio líquido, separada do resultado do ano.$q$
where exam_year=2014 and item_number=89 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 90: balancete vem do Razão (saldos das contas), não do Diário (registro cronológico dos lançamentos).
update public.official_exam_questions set review_note=$q$Errado. O balancete de verificação lista os SALDOS de cada conta — e esses saldos vêm do livro Razão, onde cada conta (Caixa, Fornecedores, etc.) acumula seus lançamentos e mostra o saldo atual. O livro Diário só registra os lançamentos na ordem em que aconteceram, sem juntar tudo por conta.
Exemplo: o livro Diário é como o extrato de um banco (tudo em ordem cronológica, uma transação atrás da outra); o Razão é como o "resumo" que agrupa quanto entrou e saiu de cada categoria (mercado, transporte, lazer). O balancete usa esse resumo, não o extrato bruto.$q$
where exam_year=2014 and item_number=90 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 97: objeto da contabilidade = o patrimônio da entidade.
update public.official_exam_questions set review_note=$q$Correto. A contabilidade nasceu justamente pra acompanhar o patrimônio de uma entidade — o conjunto de bens, direitos e obrigações dela — e é isso que ela estuda e registra ao longo do tempo. É a definição mais clássica da matéria.
Exemplo: assim como a medicina tem o corpo humano como objeto de estudo, a contabilidade tem o patrimônio da empresa (ou de qualquer entidade) como seu "paciente" — ela observa, mede e relata a saúde financeira desse patrimônio.$q$
where exam_year=2018 and item_number=97 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 98: patrimônio (conceito amplo: bens+direitos+obrigações) != patrimônio líquido (ativo-passivo).
update public.official_exam_questions set review_note=$q$Errado. O item confunde dois conceitos: "patrimônio" é o conjunto de bens, direitos e obrigações de uma entidade (uma visão mais ampla); "ativo menos passivo" é o PATRIMÔNIO LÍQUIDO, um número específico dentro desse patrimônio. Usar "patrimônio" como sinônimo exato de "ativo − passivo" é o erro clássico que a banca cobra aqui.
Exemplo: o "patrimônio" de uma pessoa é tudo que ela tem e deve (casa, carro, dívidas, direitos) — já o "quanto ela realmente vale líquido" (patrimônio líquido) é só a conta de bens menos dívidas. São coisas relacionadas, mas não a mesma coisa.$q$
where exam_year=2018 and item_number=98 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 99: contabilidade é ciência social aplicada, não ciência exata.
update public.official_exam_questions set review_note=$q$Errado. Apesar de usar muitos números, a contabilidade é classificada como uma ciência SOCIAL APLICADA, porque estuda o patrimônio dentro do contexto de decisões humanas, econômicas e sociais das entidades — não é uma ciência exata como a matemática ou a física, mesmo usando ferramentas quantitativas.
Exemplo: usar números não faz uma área virar "ciência exata" — a economia também usa muita matemática e continua sendo ciência social. O que define a categoria é o objeto de estudo (fenômenos sociais/organizacionais), não a ferramenta usada pra medir.$q$
where exam_year=2018 and item_number=99 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 100: Ativo(grupo1)=730k = Passivo(grupo2)=230k + PL(grupo3)=500k -> contas batem, "incompleto" é falso.
update public.official_exam_questions set review_note=$q$Errado. Somando o grupo 1 (ativo): 10.000+350.000+250.000+120.000 = 730.000. Somando o grupo 2 (passivo): 100.000+80.000+50.000 = 230.000. Grupo 3 (patrimônio líquido): 400.000+100.000 = 500.000. Confira: 230.000 + 500.000 = 730.000, batendo exatamente com o ativo — a identidade contábil Ativo = Passivo + Patrimônio Líquido fecha certinho. O rol de contas está completo, não incompleto; o item usa um argumento (grupo1+grupo2 > grupo3) que nem prova incompletude nem é o teste certo pra isso.
Exemplo: é como conferir se as contas de uma família fecham: tudo que a família TEM (ativo) precisa ser igual à soma do que ela DEVE (passivo) mais o que sobrou de patrimônio próprio (PL). Se bater, as contas "fecham" — e aqui elas fecham.$q$
where exam_year=2018 and item_number=100 and career_name='Agente de Polícia Federal' and official_answer='E';
