-- Explicações do dia a dia: Contabilidade Geral, lote 5 (FINAL) — PF 2025,
-- itens 100-120. Fecha as 66 questões da matéria. Mesmo padrão dos lotes
-- anteriores; o balancete dos itens 107-110 foi reconferido conta a conta
-- (ativo, passivo circulante, PL e resultado do exercício).

-- 100: movimentação pura entre ativo e passivo é PERMUTATIVA (não altera PL), não modificativa como o item afirma.
update public.official_exam_questions set review_note=$q$Errado. Uma troca só entre contas de ativo e passivo (sem passar por receita ou despesa) é um fato PERMUTATIVO — o patrimônio líquido não muda, só a composição interna do patrimônio. Modificativo é quando o PL de fato aumenta ou diminui, o que exige uma receita ou despesa no meio do caminho, não simplesmente mexer em ativo/passivo.
Exemplo: pegar um empréstimo (passivo sobe) que vira dinheiro no banco (ativo sobe) não te deixa "mais rico" — você só trocou uma coisa por outra; seu patrimônio líquido continua igual.$q$
where exam_year=2025 and item_number=100 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 101: PL = bens+direitos (ativo) − obrigações (passivo) — definição padrão.
update public.official_exam_questions set review_note=$q$Correto. É a fórmula mais básica da contabilidade: o patrimônio líquido é tudo que a entidade tem (bens e direitos, o ativo) menos tudo que ela deve (obrigações, o passivo). É o "quanto sobra" pros donos depois de descontar as dívidas.
Exemplo: o patrimônio líquido de uma pessoa é a soma de tudo que ela possui menos tudo que ela deve — se ela tem R$ 50 mil em bens e deve R$ 20 mil, seu patrimônio líquido é R$ 30 mil.$q$
where exam_year=2025 and item_number=101 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 102: aumento simultâneo de ativo e passivo (mesmo valor) CONTINUA sendo fato permutativo, pois o PL não muda — o item erra ao negar isso.
update public.official_exam_questions set review_note=$q$Errado. A primeira parte do item está certa, mas a conclusão final está errada: um aumento simultâneo de ativo e passivo (por exemplo, comprar mercadoria a prazo — o estoque sobe e a dívida com o fornecedor sobe, no mesmo valor) CONTINUA sendo fato permutativo, porque o patrimônio líquido não se altera. O que importa pra classificar como permutativo não é "só o ativo se mexer" — é o PL ficar igual, e ele fica igual aqui também.
Exemplo: comprar um celular parcelado — seu bem (celular) aumenta e sua dívida (parcelas a pagar) aumenta no mesmo valor. Seu patrimônio líquido continua o mesmo, só trocou "dinheiro futuro" por "celular hoje".$q$
where exam_year=2025 and item_number=102 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 103: competência = receita total(125.000) - despesa total(110.000) = 15.000, independente do que foi de fato recebido/pago.
update public.official_exam_questions set review_note=$q$Correto. Pelo regime de competência, o que importa é o valor TOTAL vendido e gasto, não o que efetivamente entrou/saiu do caixa. Receita: R$ 125.000 (mesmo recebendo só R$ 115.000 agora). Despesa: R$ 110.000 (mesmo pagando só R$ 108.000 agora). Lucro = 125.000 − 110.000 = R$ 15.000.
Exemplo: se você vendeu R$ 1.000 em produtos mas só recebeu R$ 900 até agora, pela competência seu resultado considera os R$ 1.000 inteiros — o resto ainda vai entrar, só está registrado como "a receber".$q$
where exam_year=2025 and item_number=103 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 104: elementos padrão de um lançamento no livro Diário, em ordem cronológica.
update public.official_exam_questions set review_note=$q$Correto. Todo lançamento no livro Diário precisa ter: a data, qual conta foi debitada, qual foi creditada, um histórico explicando a operação e o valor — tudo isso na ordem em que os fatos aconteceram (cronológica). É o "diário de bordo" oficial da empresa.
Exemplo: é como um diário pessoal onde cada página tem data, o que aconteceu e os valores envolvidos, sempre em ordem — sem pular datas nem escrever fora de ordem.$q$
where exam_year=2025 and item_number=104 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 105: reconhecer receita só no recebimento do dinheiro é regime de CAIXA, não competência.
update public.official_exam_questions set review_note=$q$Errado. O item descreve o regime de CAIXA, que é o oposto do que a pergunta afirma. Pelo regime de COMPETÊNCIA, a receita é reconhecida quando o produto é entregue ou o serviço é prestado — não quando o dinheiro efetivamente entra. O recebimento pode vir depois, sem mudar quando a receita "aconteceu" contabilmente.
Exemplo: quando você entrega uma encomenda e o cliente promete pagar em 30 dias, a venda já aconteceu no dia da entrega — o fato de o dinheiro só chegar depois não muda quando a receita é contabilizada.$q$
where exam_year=2025 and item_number=105 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 106: aluguel pago antecipado é despesa antecipada (ativo), apropriado mensalmente conforme o uso.
update public.official_exam_questions set review_note=$q$Correto. Pagar 6 meses de aluguel de uma vez não vira despesa imediata — vira um direito de usar a sala pelos próximos 6 meses, registrado como ativo ("despesas antecipadas"). Todo mês, um pedaço desse direito é "consumido" e vira despesa de fato, até zerar no fim do período contratado.
Exemplo: é como comprar uma van de passagens de ônibus pros próximos 6 meses — o valor todo já saiu do seu bolso, mas você vai "gastando" uma passagem por mês, não tudo de uma vez.$q$
where exam_year=2025 and item_number=106 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 107: PL total (incluindo resultado) = capital(100.000) + lucro do exercício(3.500) = 103.500, não 100.000.
update public.official_exam_questions set review_note=$q$Errado. O capital (R$ 100.000) é só uma PARTE do patrimônio líquido. Somando o resultado do exercício — receita de serviços (7.000) menos despesas com taxas (1.500) e pró-labore (2.000) = lucro de R$ 3.500 — o PL total fica R$ 100.000 + R$ 3.500 = R$ 103.500, não R$ 100.000 como o item afirma. O item "esquece" de somar o lucro do período.
Exemplo: se você começou o ano com R$ 100 mil guardados e lucrou mais R$ 3.500 no ano, seu patrimônio no fim não é mais R$ 100 mil — é R$ 103.500, o lucro se soma ao que você já tinha.$q$
where exam_year=2025 and item_number=107 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 108: passivo circulante = contas a pagar = 5.700, única dívida da lista.
update public.official_exam_questions set review_note=$q$Correto. Olhando a lista de saldos, a única conta de dívida (passivo) é "contas a pagar", no valor de R$ 5.700. As outras contas ou são ativo (bancos, materiais, máquinas, despesa antecipada) ou são de resultado/PL (receita, despesas, capital).
Exemplo: é filtrar, numa lista de contas de uma família, só o que é "boleto a pagar" e ignorar o resto — aqui só tem um boleto na lista, de R$ 5.700.$q$
where exam_year=2025 and item_number=108 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 109: ativo = bancos(95.000)+materiais(4.000)+máquinas(9.000)+despesa antecipada(1.200) = 109.200.
update public.official_exam_questions set review_note=$q$Correto. Somando as contas de ativo do balancete — bancos (95.000) + materiais de consumo (4.000) + máquinas (9.000) + despesa antecipada (1.200, que é um direito, portanto ativo) — dá exatamente R$ 109.200. As contas de passivo (contas a pagar) e de resultado (receita, despesas) e o capital ficam de fora dessa soma.
Exemplo: é somar só "o que a empresa tem guardado ou vai usar depois" — dinheiro no banco, material em estoque, máquinas e o direito de usar a sala já paga — sem contar dívidas nem o resultado do período.$q$
where exam_year=2025 and item_number=109 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 110: lucro = receita(7.000) - despesas com taxas(1.500) - pró-labore(2.000) = 3.500.
update public.official_exam_questions set review_note=$q$Correto. O resultado do exercício é receita menos despesas: R$ 7.000 (receita de serviços) − R$ 1.500 (despesas com taxas) − R$ 2.000 (pró-labore) = R$ 3.500 de lucro. Esse é o mesmo valor que, somado ao capital, fecha o patrimônio líquido total em R$ 103.500 (item 107).
Exemplo: é a "sobra do mês" de um prestador de serviço autônomo — recebeu R$ 7.000, pagou R$ 1.500 de taxas e tirou R$ 2.000 de pró-labore pra si mesmo, sobrando R$ 3.500 de lucro na empresa.$q$
where exam_year=2025 and item_number=110 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 113: receita líquida = receita bruta - deduções (devoluções, impostos sobre vendas, descontos comerciais).
update public.official_exam_questions set review_note=$q$Correto. A receita líquida é o valor "real" que sobra depois de tirar da receita bruta tudo que não é de fato ganho da empresa: mercadorias devolvidas, impostos que incidem sobre a venda (como ICMS) e descontos dados aos clientes. É o número que de fato entra na demonstração de resultado como ponto de partida do lucro.
Exemplo: é como o salário líquido de um trabalhador — o salário bruto (o que está no contrato) menos os descontos (INSS, imposto de renda) é o que realmente cai na conta. Receita líquida é a mesma ideia aplicada à empresa.$q$
where exam_year=2025 and item_number=113 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 114: ativo ocioso continua sendo depreciado, salvo se já totalmente depreciado ou depreciação vinculada ao uso (unidades produzidas).
update public.official_exam_questions set review_note=$q$Correto. Depreciação normalmente é ligada ao TEMPO, não ao uso — então mesmo uma máquina parada continua "envelhecendo" e perdendo valor, precisando continuar sendo depreciada. As únicas exceções são: o bem já estar 100% depreciado (não tem mais o que depreciar) ou a empresa usar um método de depreciação vinculado à produção (tipo "por unidades produzidas"), onde parar de produzir naturalmente já zera a depreciação daquele período.
Exemplo: um carro parado na garagem continua perdendo valor com o tempo, mesmo sem rodar — a não ser que ele já esteja "no fim da vida útil" ou que você meça o desgaste por quilômetro rodado (aí, parado, realmente não desgasta).$q$
where exam_year=2025 and item_number=114 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 115: provisão é reconhecida quando a perda é PROVÁVEL, não meramente possível (perda possível só vai em nota explicativa).
update public.official_exam_questions set review_note=$q$Errado. A regra contábil (CPC 25) distingue três níveis de chance: perda PROVÁVEL vira provisão no passivo; perda POSSÍVEL só é divulgada em nota explicativa (sem lançar no passivo); perda REMOTA nem isso. O item confunde "possível" com "provável" — só a chance provável exige o reconhecimento contábil da provisão.
Exemplo: é a diferença entre "é bem provável que eu perca esse processo" (aí você já se prepara financeiramente, guarda dinheiro) e "existe uma chance, mas é pouco provável" (aí você só menciona o risco, sem reservar dinheiro ainda).$q$
where exam_year=2025 and item_number=115 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 116: provisão de férias deve ser constituída mês a mês (competência), não só no momento do gozo.
update public.official_exam_questions set review_note=$q$Errado. Pela competência, o direito às férias vai se acumulando mês a mês (1/12 do direito a cada mês trabalhado) — então a provisão também precisa ser registrada mês a mês, à medida que o direito nasce, não de uma vez só quando o empregado efetivamente sai de férias. Esperar o gozo pra reconhecer a despesa violaria a competência.
Exemplo: é como ir guardando um "décimo terceiro" mês a mês em vez de descobrir em dezembro que precisa pagar tudo de uma vez — a obrigação vai crescendo aos poucos, junto com o tempo trabalhado.$q$
where exam_year=2025 and item_number=116 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 118: características qualitativas FUNDAMENTAIS são relevância e representação fidedigna (não compreensibilidade, que é de melhoria).
update public.official_exam_questions set review_note=$q$Errado. Pela Estrutura Conceitual da Contabilidade, as duas características FUNDAMENTAIS da informação contábil são relevância e representação fidedigna — não compreensibilidade. Compreensibilidade é uma característica "de melhoria" (junto com comparabilidade, verificabilidade e tempestividade), importante, mas de um nível diferente das fundamentais.
Exemplo: é como a diferença entre os requisitos "essenciais" de um remédio (ser eficaz e seguro — sem isso ele nem deveria existir) e requisitos "que ajudam" (ser fácil de tomar, ter sabor melhor) — os dois importam, mas em categorias diferentes.$q$
where exam_year=2025 and item_number=118 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 119: relevância = capacidade de influenciar decisões econômicas dos usuários — definição correta.
update public.official_exam_questions set review_note=$q$Correto. É exatamente essa a definição de relevância na Estrutura Conceitual: uma informação é relevante quando ela é capaz de fazer diferença nas decisões que os usuários tomam — se a informação não muda em nada a decisão de ninguém, ela não é relevante, por mais "verdadeira" que seja.
Exemplo: saber o lucro trimestral de uma empresa é relevante pra um investidor decidir comprar ou vender ações — já saber a cor da parede do escritório dela, mesmo sendo verdade, não influencia decisão nenhuma.$q$
where exam_year=2025 and item_number=119 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 120: a descrição do item é de VALOR EM USO (valor presente de fluxos futuros), não de custo corrente (valor de reposição hoje).
update public.official_exam_questions set review_note=$q$Errado. O item descreve "valor em uso" (o valor presente dos fluxos de caixa futuros esperados do ativo) — mas chama isso de "custo corrente", que é outra coisa: custo corrente é quanto custaria HOJE comprar ou repor um ativo equivalente, sem olhar pra fluxos futuros. São duas formas diferentes de medir um ativo, e o item trocou os nomes.
Exemplo: "custo corrente" é perguntar "quanto custa comprar essa máquina nova hoje?"; "valor em uso" é perguntar "quanto dinheiro essa máquina, do jeito que está, ainda vai gerar pra mim no futuro?" — perguntas bem diferentes.$q$
where exam_year=2025 and item_number=120 and career_name='Agente de Polícia Federal' and official_answer='E';
