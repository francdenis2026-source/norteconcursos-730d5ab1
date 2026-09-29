-- Explicações do dia a dia: Contabilidade Geral, lote 4 — PF 2021 (itens
-- 107, 109, 113-118, 120) e PF 2025 (itens 97-99). Mesmo padrão dos lotes
-- anteriores, cada conceito reconferido antes de escrever.

-- 107: fornecedores e impostos a recolher são PASSIVO, natureza credora, não devedora.
update public.official_exam_questions set review_note=$q$Errado. Fornecedores e impostos a recolher são dívidas da empresa — contas de PASSIVO, com natureza credora (aumentam com crédito). O item inverte a regra: só contas de ativo e despesa têm natureza devedora; passivo, patrimônio líquido e receita têm natureza credora.
Exemplo: uma fatura de cartão que você ainda vai pagar é uma dívida sua — ela "cresce" quando você compra mais (crédito), não quando você usa dinheiro (débito). É o oposto de uma conta de bem, como o saldo do seu banco.$q$
where exam_year=2021 and item_number=107 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 109: terceira fórmula = várias contas devedoras E várias credoras ao mesmo tempo, não "1 devedora e 2+ credoras" (isso é segunda fórmula).
update public.official_exam_questions set review_note=$q$Errado. O item descreve a SEGUNDA fórmula de lançamento (uma conta devedora e várias credoras). A TERCEIRA fórmula (complexa) é diferente: tem VÁRIAS contas devedoras E várias credoras ao mesmo tempo, todas no mesmo lançamento.
Exemplo: pagar um fornecedor usando parte do dinheiro do caixa e parte de um empréstimo novo, quitando ao mesmo tempo duas dívidas diferentes — aí sim você tem múltiplas contas dos dois lados (devedor e credor) juntas, isso é fórmula complexa.$q$
where exam_year=2021 and item_number=109 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 113: avaliar recebíveis pelo valor líquido de realização, com ajuste pra perdas estimadas (PECLD) — correto, é a regra padrão.
update public.official_exam_questions set review_note=$q$Correto. Quando existe dúvida real sobre receber um valor, a contabilidade não pode fingir que aquele dinheiro com certeza vai entrar — ela precisa ajustar o valor desse recebível pra baixo, reconhecendo uma perda estimada, de forma que o patrimônio mostrado reflita a realidade (o quanto a empresa realmente espera receber), não o valor "de fachada" da venda original.
Exemplo: é como um caça-níqueis de cobrança — se você sabe que uma parte dos boletos emitidos nunca vai ser paga, é mais honesto já reduzir essa expectativa nas contas do que fingir que 100% vai entrar e depois levar um susto.$q$
where exam_year=2021 and item_number=113 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 114: a contrapartida certa é uma conta RETIFICADORA (PECLD), não a própria conta do recebível — creditar direto a conta do recebível seria "baixa" (write-off), não estimativa de perda.
update public.official_exam_questions set review_note=$q$Errado. A perda estimada não é lançada direto contra a conta original do recebível — ela usa uma conta "retificadora" separada (tipo Perda Estimada com Créditos de Liquidação Duvidosa), que fica ao lado da conta de recebíveis só reduzindo o valor apresentado dela. Creditar direto a conta original só acontece depois, quando a perda vira certeza (baixa definitiva) — são dois momentos diferentes.
Exemplo: é como colocar um "desconto estimado" numa etiqueta de preço sem apagar o preço original — você mostra os dois lado a lado (valor cheio e o ajuste), em vez de já riscar o preço de vez.$q$
where exam_year=2021 and item_number=114 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 115: adiantamento a empregado é ATIVO (a empresa tem a receber, será descontado do salário depois), não despesa/DRE.
update public.official_exam_questions set review_note=$q$Errado. Adiantamento a empregado não é despesa — é um ATIVO: a empresa "emprestou" um valor que vai descontar do salário do funcionário depois. Como é um direito a receber (mesmo que via desconto em folha), fica no balanço patrimonial, não na demonstração do resultado.
Exemplo: é como um vale que você dá pro seu funcionário antes do dia do pagamento — isso não é um gasto seu ainda, é um crédito que você tem contra o salário dele, que vai ser descontado depois.$q$
where exam_year=2021 and item_number=115 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 116: deduções sobre vendas = itens específicos (devoluções, abatimentos, impostos sobre vendas), não "todas as despesas" ligadas à venda.
update public.official_exam_questions set review_note=$q$Errado. "Deduções sobre vendas" é um grupo bem específico — devoluções de mercadorias, abatimentos concedidos e impostos que incidem direto sobre a venda (como ICMS, PIS, COFINS). Despesas comerciais e administrativas (como comissão de vendedor ou salário do gerente) também têm relação com a venda, mas não são "deduções sobre vendas" — ficam num grupo à parte na demonstração de resultado.
Exemplo: se você vende um produto e o cliente devolve, ou você dá desconto, isso reduz direto a venda em si. Já pagar o motoboy pra entregar é um gasto separado — está ligado à venda, mas não "desconta" o valor dela.$q$
where exam_year=2021 and item_number=116 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 117: no setor industrial, custo das vendas é chamado de CPV (custo do produto vendido).
update public.official_exam_questions set review_note=$q$Correto. O nome do "custo do que foi vendido" muda conforme o tipo de negócio: empresa comercial usa CMV (custo da mercadoria vendida); empresa industrial usa CPV (custo do produto vendido, já que ela fabrica, não só revende); empresa de serviços usa CSP (custo do serviço prestado).
Exemplo: é a mesma ideia com nomes diferentes — um mercado "revende" (CMV), uma fábrica "produz e vende" (CPV), uma empresa de limpeza "presta e cobra" (CSP).$q$
where exam_year=2021 and item_number=117 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 118: dívida mantida com intuito de negociação (trading) classifica-se no passivo circulante (regra do CPC de instrumentos financeiros).
update public.official_exam_questions set review_note=$q$Correto. Uma dívida mantida "para negociação" (trading) é, por natureza, algo de curto prazo — a intenção de negociar já indica giro rápido, não uma obrigação de longo prazo. Por isso as normas contábeis (CPC) mandam classificá-la no passivo circulante, independentemente do prazo de vencimento contratual.
Exemplo: é como comprar e vender ações no "day trade" — a intenção já é de curtíssimo prazo, então mesmo que o papel tecnicamente "vença" só daqui a anos, o jeito como você pretende usá-lo é de curto prazo.$q$
where exam_year=2021 and item_number=118 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 120: intangível de vida útil definida é amortizado a partir do momento em que está disponível pra uso (regra do CPC 04, paralela à depreciação).
update public.official_exam_questions set review_note=$q$Correto. Um ativo intangível com vida útil definida (como um software com prazo de uso estimado) precisa ser amortizado ao longo do tempo — e essa amortização começa quando o ativo fica pronto e disponível pra uso, mesmo que a empresa ainda não tenha começado a usá-lo de fato. É a mesma lógica da depreciação de um bem físico.
Exemplo: é como o prazo de validade de uma licença de software começar a contar a partir do dia da ativação, não do dia em que alguém efetivamente abre o programa pela primeira vez.$q$
where exam_year=2021 and item_number=120 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 97 (2025): compra de terreno à vista: DÉBITO em Terrenos (entra bem), CRÉDITO em Bancos (sai dinheiro) — o item inverteu.
update public.official_exam_questions set review_note=$q$Errado. O item inverteu os lados do lançamento. Quando um bem entra no patrimônio (o terreno), a conta dele é DEBITADA (ativo aumentando); quando o dinheiro sai do banco pra pagar, a conta Bancos é CREDITADA (ativo diminuindo). O certo é: débito em Terrenos, crédito em Bancos — o oposto do que o item descreve.
Exemplo: comprar algo com o cartão de débito — o que você ganha (o produto) "entra" pra você, e o dinheiro que "sai" da sua conta é o que diminui. O item trocou qual conta cresce e qual diminui.$q$
where exam_year=2025 and item_number=97 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 98 (2025): plano de contas NÃO é livro contábil obrigatório registrado em junta comercial — é uma ferramenta organizacional interna.
update public.official_exam_questions set review_note=$q$Errado. Plano de contas não é um livro contábil obrigatório registrado em junta comercial — é uma lista organizada das contas que a empresa usa, criada e ajustada internamente conforme a necessidade do negócio. Quem de fato precisa ser registrado e autenticado é o livro Diário (e, dependendo do caso, outros livros formais) — o plano de contas é só um instrumento de apoio, sem essa exigência legal.
Exemplo: é como a lista de categorias que você cria no seu aplicativo de finanças pessoais (mercado, transporte, lazer) — super útil pra organizar, mas ninguém registra isso em cartório; é diferente de um documento formal exigido por lei.$q$
where exam_year=2025 and item_number=98 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 99 (2025): relatório financeiro para fins gerais serve principalmente aos usuários EXTERNOS, não internos (Estrutura Conceitual/CPC 00).
update public.official_exam_questions set review_note=$q$Errado. O relatório financeiro de propósito geral existe justamente pra atender quem NÃO tem acesso direto às informações internas da empresa — investidores, credores e outros usuários externos. A administração (usuário interno) já tem acesso a relatórios internos muito mais detalhados, sob medida; o relatório de fins gerais não foi criado pra ela, e sim pra quem está de fora.
Exemplo: é a diferença entre o balanço público que uma empresa de capital aberto divulga (pra qualquer investidor entender a saúde financeira dela) e a planilha de gestão que só o diretor financeiro vê por dentro — são públicos e propósitos diferentes.$q$
where exam_year=2025 and item_number=99 and career_name='Agente de Polícia Federal' and official_answer='E';
