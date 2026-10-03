-- Primeiro lote da Biblioteca de estudo: Contabilidade Geral (Polícia Federal).
-- Todos os materiais entram como `under_review`: o aluno NÃO os vê até que um admin
-- confira as normas e os exemplos e ative cada um (revisor + data de conferência).
begin;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis)
values
('contabilidade-conceito-objeto-usuarios', 'Contabilidade Geral', 'Conceitos e finalidades', 10, 'Contabilidade: conceito, objeto e usuários', 'O que a contabilidade estuda, para que serve e quem usa suas informações.', $md$## A ideia central

A contabilidade **registra, controla e informa** sobre o patrimônio das entidades. Ela transforma os fatos que afetam o patrimônio em informação útil para quem precisa decidir.

| Elemento | Resposta |
|---|---|
| **Objeto** | O patrimônio das entidades |
| **Objetivo** | Controlar o patrimônio |
| **Finalidade** | Fornecer informações aos usuários |
| **Campo de aplicação** | Entidades econômico-administrativas (aziendas), com ou sem fins lucrativos, pessoas físicas ou jurídicas |

## Quem usa as demonstrações contábeis

- Governo
- Administradores
- Investidores (decidem comprar, manter ou vender uma participação)
- Empregados
- Credores por empréstimos
- Fornecedores e clientes

## Técnicas contábeis

São quatro: **escrituração**, **demonstrações contábeis**, **auditoria** e **análise das demonstrações** (análise de balanços).

> **Cai em prova:** o objeto da contabilidade é o **patrimônio**, não o lucro. E o campo de aplicação **inclui** entidades sem fins lucrativos.$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-patrimonio-equacao-fundamental', 'Contabilidade Geral', 'Patrimônio', 20, 'Patrimônio, balanço e equação fundamental', 'Ativo, passivo e patrimônio líquido, seus sinônimos e os três tipos de situação líquida.', $md$## Os componentes do patrimônio

- **Ativo** = bens + direitos. Mostra **onde** os recursos foram aplicados.
- **Passivo exigível** = obrigações com terceiros. Mostra a **origem** dos recursos que vêm de fora.
- **Patrimônio Líquido (PL)** = o que sobra para os donos: **Ativo − Passivo exigível**.

## Equação fundamental

> **Ativo = Passivo exigível + Patrimônio Líquido**, ou **PL = Ativo − Passivo exigível**

## Sinônimos que as bancas adoram

| Termo | Equivale a |
|---|---|
| Ativo | Patrimônio bruto, ativo total, capital investido, capital aplicado, aplicação de recursos |
| Passivo exigível | Passivo real, capital de terceiros, capital alheio |
| Patrimônio líquido | Capital próprio, situação líquida, passivo não exigível |

## Situação líquida

| Situação | Relação | PL |
|---|---|---|
| **Positiva** | Ativo > Passivo exigível | PL > 0 |
| **Negativa** (passivo a descoberto) | Ativo < Passivo exigível | PL < 0 |
| **Nula** (equilibrada) | Ativo = Passivo exigível | PL = 0 |

> **Cai em prova:** "situação líquida" é só outro nome do **PL**. E PL positivo **não** significa que a empresa teve lucro: significa apenas que o ativo supera as dívidas.$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-atos-fatos-contabeis', 'Contabilidade Geral', 'Atos e fatos', 30, 'Atos e fatos contábeis: permutativos, modificativos e mistos', 'Como classificar um acontecimento conforme ele mexe (ou não) no patrimônio líquido.', $md$## Ato × fato

- **Ato administrativo:** não altera o patrimônio (por exemplo, assinar um contrato ou uma procuração).
- **Fato contábil:** altera o patrimônio, em quantidade, em qualidade ou nas duas.

## Classificação dos fatos

| Fato | O que faz | PL | Exemplo |
|---|---|---|---|
| **Permutativo** | Troca elementos patrimoniais | Não muda | Compra de mercadoria à vista: D Mercadorias / C Caixa |
| **Modificativo aumentativo** | Aumenta o PL | Aumenta | Receita de aluguel ainda não recebida: D Aluguel a receber / C Receita de aluguel |
| **Modificativo diminutivo** | Diminui o PL | Diminui | Despesa de salários não paga: D Despesa de salários / C Salários a pagar |
| **Misto aumentativo** | Parte permutativa e parte modificativa | Aumenta | Recebimento de duplicatas com juros |
| **Misto diminutivo** | Parte permutativa e parte modificativa | Diminui | Pagamento de duplicatas com juros |

## Fatos complexos

São fatos que alteram o PL de forma quantitativa, mas **não envolvem contas de resultado**. O exemplo clássico é a **integralização de capital em dinheiro** (D Caixa / C Capital Social). A doutrina majoritária o trata como modificativo; há corrente minoritária que o considera permutativo. Observe o critério adotado no enunciado.

## Insubsistências e superveniências

| Fato | Efeito | Classificação |
|---|---|---|
| Insubsistência do ativo | Reduz o ativo | Despesa |
| Insubsistência do passivo | Reduz o passivo | Receita |
| Superveniência do ativo (ativa) | Aumenta o ativo | Receita |
| Superveniência do passivo (passiva) | Aumenta o passivo | Despesa |

> **Truque de memória:** o que **melhora** o patrimônio líquido vira **receita**; o que **piora** vira **despesa**.$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-contas-plano-de-contas', 'Contabilidade Geral', 'Contas', 40, 'Contas, plano de contas e títulos de crédito', 'Como o patrimônio é controlado por contas e como classificar duplicatas, cheques e promissórias.', $md$## A conta

A conta é o **meio de controle do patrimônio**. Registra bens, direitos, obrigações e PL (**contas patrimoniais**) e receitas e despesas (**contas de resultado**).

**Elementos essenciais:** nome da conta, data do fato, histórico, valor debitado, valor creditado e saldo.

## Plano de contas

É o conjunto de todas as contas de uma entidade, para uniformizar os registros. Deve ser **flexível**: se surgir um fato não previsto, adapta-se incluindo ou excluindo contas. Compõe-se de:

- **Elenco de contas:** a relação das contas usadas.
- **Função das contas:** representar elementos patrimoniais e de resultado.
- **Funcionamento das contas:** como a conta é debitada e creditada (método das partidas dobradas).

## Classificação de operações com títulos

| Título | Quem emite | Para quem **recebe** | Para quem **deve** |
|---|---|---|---|
| Duplicata | O credor | Ativo (direito): Duplicatas a receber | Passivo (obrigação): Duplicatas a pagar |
| Nota promissória | O devedor | Ativo (direito): Promissórias a receber | Passivo (obrigação): Promissórias a pagar |
| Cheque pré-datado | O devedor | Ativo (direito): Contas a receber | Passivo (obrigação): Contas a pagar |
| Cheque à vista | O devedor | Ativo (bem): Caixa | Sai dinheiro do banco |

## Para fixar

- **Fornecedores:** obrigação, passivo.
- **Adiantamento a fornecedores:** direito, ativo.
- **Clientes:** direito, ativo.
- **Adiantamento de clientes:** obrigação, passivo.

> **Cai em prova:** repare no sentido do adiantamento. Se **eu pago** antes, tenho um **direito** (ativo). Se **o cliente me paga** antes, tenho uma **obrigação** (passivo).$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-escrituracao-partidas-dobradas-livros', 'Contabilidade Geral', 'Escrituração', 50, 'Escrituração, partidas dobradas e livros contábeis', 'Requisitos do registro, o método veneziano e os livros Diário, Razão e Caixa.', $md$## Escrituração e lançamento

**Escrituração** é a técnica de registrar os fatos contábeis em livros, por meio de contas. Cada registro é um **lançamento**.

### Requisitos

- Idioma e moeda **nacionais**.
- Forma contábil.
- Ordem **cronológica** de dia, mês e ano.
- Sem espaços em branco, entrelinhas, borrões, rasuras ou emendas.
- Com base em documentos de origem ou, na falta, em elementos que comprovem o fato.

### Ressalva

Retificação de um histórico corrigido **logo depois do erro**, com expressões como "digo" ou "ou melhor".

## Método das partidas dobradas (veneziano)

1. A soma dos **débitos** é sempre igual à soma dos **créditos**.
2. Débitos em uma ou mais contas correspondem a créditos de valor equivalente em uma ou mais contas.
3. O ativo total é sempre igual ao passivo exigível mais o PL.

## Livros principais

| Livro | Característica | Obrigatoriedade |
|---|---|---|
| **Diário** | Principal, comum, cronológico | Obrigatório (Código Civil) |
| **Razão** | Principal, sistemático (organiza as informações por conta) | Facultativo, mas obrigatório para quem apura lucro real e pela ITG 2000 (R1) |
| **Caixa** | Controle do caixa | Obrigatório no regime simplificado da LC 123/06 ou na tributação pelo lucro presumido |
| **Registro de Inventário** | Controle dos estoques | Conforme a legislação |

## Formalidades do Livro Diário

- **Extrínsecas:** encadernado, folhas numeradas, autenticado pela Junta Comercial (empresas mercantis) ou pelo Registro Civil de Pessoas Jurídicas (empresas civis), com termos de abertura e de encerramento.
- **Intrínsecas:** ordem cronológica, sem rasuras e entrelinhas, método uniforme, língua e moeda nacionais.

> **Cai em prova:** o Razão aparece como "facultativo", mas as bancas cobram que é **obrigatório** para o contribuinte do lucro real.

> **Conferido no site do CFC:** a **ITG 2000 (R1)**, que trata da escrituração contábil, está **em vigor** (DOU 12/12/2014) e se aplica a **todas as entidades**, independentemente de natureza e porte. Confirmei a **versão vigente da norma**. As regras do Código Civil e da LC 123/2006 citadas no texto seguem em conferência.$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[{"title": "Código Civil (Lei nº 10.406/2002), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm"}, {"title": "Lei Complementar nº 123/2006, texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm"}]'::jsonb),
('contabilidade-regimes-caixa-competencia', 'Contabilidade Geral', 'Regimes contábeis', 60, 'Regimes de caixa e de competência', 'Quando uma receita ou despesa é reconhecida em cada regime, com a tabela das seis combinações.', $md$## Definições

- **Regime de caixa:** receitas **recebidas** e despesas **pagas**.
- **Regime de competência:** receitas **ganhas** (realizadas) e despesas **incorridas**, independentemente do recebimento ou do pagamento.

## A tabela que resolve a questão

| Situação | Competência | Caixa |
|---|---|---|
| Receita ganha e recebida | **Sim** | **Sim** |
| Receita ganha e **não** recebida | **Sim** | Não |
| Receita **não** ganha, mas recebida | Não | **Sim** |
| Despesa incorrida e paga | **Sim** | **Sim** |
| Despesa incorrida e **não** paga | **Sim** | Não |
| Despesa **não** incorrida, mas paga | Não | **Sim** |

> **Como pensar:** na competência pergunte "o fato **aconteceu**?". No caixa pergunte "o dinheiro **entrou ou saiu**?". A contabilidade adota, como regra, o regime de competência.

> **Conferido no Planalto (Lei das S.A., art. 177, redação da Lei nº 11.941/2009):** a escrituração da companhia deve observar métodos ou critérios contábeis uniformes no tempo e registrar as mutações patrimoniais **segundo o regime de competência**. A tabela do material é aplicação dessa regra.$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-lancamentos-operacoes-diversas', 'Contabilidade Geral', 'Operações contábeis', 70, 'Lançamentos de operações diversas', 'Os lançamentos mais cobrados: juros, descontos, aluguéis, câmbio, seguros, vendas, folha e duplicatas descontadas.', $md$Convenção: **D** = débito, **C** = crédito.

## Juros, descontos, aluguéis e câmbio

| Operação | Débito | Crédito |
|---|---|---|
| Despesa de juros | Despesa de juros | Empréstimos, Juros a transcorrer ou Caixa |
| Receita de juros | Caixa, Aplicação financeira ou Receita financeira a apropriar | Receita de juros |
| Desconto financeiro **obtido** | Caixa ou Valores a pagar | Descontos financeiros obtidos (receita financeira) |
| Desconto financeiro **concedido** | Descontos financeiros concedidos (despesa financeira) | Caixa ou Valores a receber |
| Despesa de aluguel | Despesa de aluguel | Aluguel a pagar ou Caixa/Bancos |
| Receita de aluguel | Aluguel a receber ou Caixa/Bancos | Receita de aluguel |
| Variação cambial passiva | Variação cambial passiva (despesa) | Empréstimos em moeda estrangeira |
| Variação cambial ativa | Empréstimos em moeda estrangeira | Variação cambial ativa (receita) |

## Operações do dia a dia

- **Seguro pago antecipadamente:** D Seguros a vencer (ativo circulante) / C Caixa.
- **Compra de bem de uso a prazo:** D Veículo (imobilizado) / C Fornecedor ou Financiamento (passivo circulante).
- **Adiantamento de cliente:** D Caixa / C Adiantamento de clientes (passivo).
- **Compensação de ICMS:** D ICMS a recolher (passivo) / C ICMS a recuperar (ativo).
- **Venda de mercadorias:** D Caixa ou Clientes / C Receita de vendas. Baixa do estoque: D CMV / C Estoques.
- **Tributo sobre vendas:** D ICMS sobre vendas (reduz o PL) / C ICMS a recolher (passivo).
- **Folha de pagamento:** D Despesa com salários / C Salários a pagar. Pagamento: D Salários a pagar / C Caixa.
- **Compra de mercadoria a prazo com ICMS recuperável:** D Mercadorias para revenda e D ICMS a recuperar / C Fornecedores.
- **Integralização de capital em bens:** D Bens de uso / C Capital social.
- **Pagamento de fornecedores:** D Fornecedores / C Caixa.

## Duplicatas descontadas

1. **Desconto da duplicata no banco:** D Bancos conta movimento e D Encargos financeiros a transcorrer (retificadora do passivo) / C Duplicatas descontadas (passivo).
2. **Apropriação dos juros:** D Despesa de juros / C Encargos financeiros a transcorrer.
3. **No vencimento, se o cliente paga:** D Duplicatas descontadas / C Duplicatas a receber.
4. **No vencimento, se o cliente não paga:** D Duplicatas descontadas / C Bancos conta movimento (o banco debita a empresa).

## Receitas e despesas antecipadas

- **Receita antecipada** (adiantamento de cliente) gera **passivo**; ao entregar, vira receita: D Adiantamento de clientes / C Receita de vendas.
- **Despesa antecipada** (seguro pago adiantado) gera **ativo**; mês a mês: D Despesa de seguros / C Seguros a vencer.$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-provisoes-passivo-contingente-epcld', 'Contabilidade Geral', 'Operações contábeis', 80, 'Provisões, passivos contingentes e EPCLD', 'Quando contabilizar ou apenas divulgar, e os cinco lançamentos da estimativa de perdas com créditos.', $md$## Provisão

**Provisão** é um passivo de **prazo ou valor incertos**.

| Probabilidade de saída de recursos | Provisão | Notas explicativas |
|---|---|---|
| **Provável** | Contabiliza | Divulga |
| **Possível** (não provável) | **Não** contabiliza | Divulga o passivo contingente |
| **Remota** | Não contabiliza | **Não** divulga |

## EPCLD: estimativa de perdas com créditos de liquidação duvidosa

É uma conta **retificadora do ativo** (reduz as contas a receber).

1. **Constituição:** D Despesa com EPCLD (resultado) / C EPCLD (retificadora do ativo).
2. **Cliente considerado incobrável:** D EPCLD / C Duplicatas a receber ou Clientes.
3. **Perda maior que a estimada:** D EPCLD e D Perdas com clientes (resultado) / C Duplicatas a receber. O excesso vai para o resultado.
4. **Reversão** (parte do valor foi recebida): D EPCLD / C Reversão de EPCLD (receita).
5. **Recuperação de crédito já baixado:** D Caixa / C Receita com recuperação de crédito.

> **Cai em prova:** a EPCLD **nunca** reduz o PL diretamente de uma vez: ela passa pelo **resultado** (despesa) e só então reduz o ativo.

> **Conferido no site do CFC:** provisões e passivos contingentes estão em vigor como **CPC 25**, versão brasileira **NBC TG 25 (R2)**. Confirmei a **versão vigente**. A estimativa de perdas com créditos (EPCLD) e seus lançamentos vêm do resumo do professor e seguem em conferência.$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-balancete-verificacao', 'Contabilidade Geral', 'Balancete', 90, 'Balancete de verificação', 'Para que serve, o que prova e o que não prova o balancete.', $md$## Características

- Demonstrativo **auxiliar** e **não obrigatório**.
- Relaciona as contas de acordo com a **natureza do saldo** (devedor ou credor).
- Evidencia a **igualdade matemática** dos lançamentos do período.
- Verifica a **correta aplicação do método das partidas dobradas**.
- Elaborado a partir do **Livro Razão**.
- Pode ter de **2 a 8 colunas**.

## O que ele **não** faz

O balancete **não identifica todos os erros** de escrituração. Detecta só aqueles que quebram a igualdade entre débitos e créditos. Erros que mantêm a igualdade passam despercebidos, por exemplo lançar na conta errada com o valor certo, ou omitir um lançamento inteiro.

> **Cai em prova:** "o balancete fechou, logo não há erros" é a pegadinha clássica. Balancete equilibrado **não** garante escrituração correta.$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-balanco-patrimonial-estrutura', 'Contabilidade Geral', 'Balanço patrimonial', 100, 'Balanço patrimonial: estrutura e classificação das contas', 'Os grupos do ativo e do passivo e as contas mais frequentes em prova.', $md$## Estrutura

**Ativo:** Circulante e Não Circulante (Realizável a Longo Prazo, Investimentos, Imobilizado e Intangível).
**Passivo:** Circulante e Não Circulante.
**Patrimônio Líquido:** Capital Social, Reservas de Capital, Ajustes de Avaliação Patrimonial, Reservas de Lucros, Ações em Tesouraria (−) e Prejuízos Acumulados (−).

## O que entra em cada grupo do ativo

| Grupo | Definição |
|---|---|
| **Circulante** | Disponibilidades, direitos realizáveis no curso do exercício seguinte e aplicações em despesas do exercício seguinte |
| **Realizável a longo prazo** | Direitos realizáveis após o término do exercício seguinte, e os derivados de vendas, adiantamentos ou empréstimos a coligadas, controladas, diretores, acionistas ou participantes no lucro, que não sejam negócios usuais da companhia |
| **Investimentos** | Participações permanentes em outras sociedades e direitos não classificáveis no circulante, que não se destinem à manutenção da atividade |
| **Imobilizado** | Direitos sobre **bens corpóreos** destinados à manutenção das atividades |
| **Intangível** | Direitos sobre **bens incorpóreos** destinados à manutenção da atividade, inclusive o fundo de comércio adquirido |

## Contas frequentes em prova

- **Ativo:** Clientes, Caixa, Bancos, Estoque, Valores a receber, Impostos a recuperar, Despesas antecipadas, Adiantamentos a empregados e a fornecedores, Imóveis, Terrenos, (−) Depreciação, amortização ou exaustão acumulada.
- **Passivo:** Fornecedores, Salários a pagar, Valores a pagar, Tributos a recolher, Empréstimos e financiamentos, Debêntures, Provisões, Adiantamento de clientes, Duplicatas descontadas, (−) Encargos financeiros a transcorrer.
- **PL:** Capital social, (−) Capital a integralizar, Reservas de capital, Reservas de lucros, (−) Ações em tesouraria, Ajustes de avaliação patrimonial, (−) Prejuízos acumulados, (−) Gastos com emissão de títulos.

> **Cai em prova:** depreciação acumulada é **retificadora do ativo** (saldo credor). Não é passivo.

> **Conferido no Planalto (Lei das S.A., texto compilado):** o art. 179 classifica o ativo em circulante, realizável a longo prazo, investimentos, imobilizado e intangível (este com o fundo de comércio adquirido), como no quadro acima. O patrimônio líquido se divide em capital social, reservas de capital, ajustes de avaliação patrimonial, reservas de lucros, ações em tesouraria e prejuízos acumulados (art. 178, § 2º, III, incluído pela Lei nº 11.941/2009). Se o **ciclo operacional** da empresa for maior que o exercício social, a classificação em circulante ou longo prazo usa o prazo desse ciclo (art. 179, parágrafo único).$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb),
('contabilidade-mercadorias-cmv-resultado-bruto', 'Contabilidade Geral', 'Demonstração do resultado', 110, 'Operações com mercadorias, CMV e resultado bruto', 'Receita bruta até lucro bruto, os descontos e as fórmulas do CMV e das compras líquidas.', $md$## Do faturamento ao lucro bruto

1. **Receita bruta** (vendas brutas)
2. **(−) Deduções da receita:** devoluções e vendas canceladas, descontos incondicionais, abatimentos e tributos sobre vendas (ICMS, ISS, PIS, COFINS)
3. **= Receita líquida**
4. **(−) Custo das mercadorias vendidas (CMV)**
5. **= Resultado com mercadorias (lucro bruto)**

## Descontos e abatimentos

| Item | Quando ocorre | Onde aparece |
|---|---|---|
| **Desconto comercial (incondicional)** | Negociado no momento da venda, sem condição | **Deduz** a receita bruta; reduz a base de ICMS, PIS e COFINS |
| **Desconto financeiro (condicional)** | Concedido sob condição (por exemplo, pagar antes) | **Despesa financeira** (não deduz a receita) |
| **Abatimento** | Depois da venda | Deduz a receita bruta; não há tributação |

## Fórmulas

- **CMV = Estoque inicial + Compras líquidas − Estoque final**
- **Compras líquidas = Compras brutas + IPI + fretes e seguros − devoluções, abatimentos e descontos − tributos recuperáveis**

> **Cai em prova:** os tributos **recuperáveis** saem do custo da compra, porque serão compensados depois. Já os **não recuperáveis** ficam no custo.

> **Conferido no Planalto (Lei das S.A., art. 187):** a demonstração do resultado discrimina a **receita bruta** das vendas e serviços, as **deduções**, os **abatimentos** e os **impostos**; a **receita líquida**; o **custo das mercadorias e serviços vendidos**; e o **lucro bruto**. A sequência do material acompanha esse artigo. As fórmulas de CMV e de compras líquidas vêm do resumo do professor e não são texto de lei.$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-estoques-cpc-16', 'Contabilidade Geral', 'Pronunciamentos CPC', 120, 'Estoques (CPC 16): o que compõe o custo', 'Definição de estoques, custo de aquisição e o que é custo ou despesa.', $md$## Estoques são ativos

- Mantidos **para venda** no curso normal dos negócios (mercadorias e produtos acabados).
- **Em processo de produção** para venda.
- Na forma de **materiais ou suprimentos** a consumir na produção ou na prestação de serviços (matérias-primas e almoxarifado).

## Custo de aquisição

**Inclui:** preço de compra, impostos de importação e outros tributos **não recuperáveis**, transporte (frete), seguro, manuseio e outros custos atribuíveis à aquisição.

**Deduz:** descontos comerciais, abatimentos e tributos **recuperáveis**.

## Custo ou despesa?

| Gasto | Classificação |
|---|---|
| Frete **sobre compras** (matéria-prima, mercadorias) | **Custo** |
| Frete **sobre vendas** | **Despesa** |
| Armazenagem de matéria-prima (no processo produtivo) | **Custo** |
| Armazenagem de mercadorias ou produtos acabados | **Despesa** |

## Não entram no custo (viram despesa do período)

- Desperdício anormal de materiais, mão de obra ou outros insumos.
- Armazenamento, salvo se necessário entre fases da produção.
- Despesas administrativas que não ajudam a trazer o estoque ao local e à condição atuais.
- Despesas de comercialização (venda e entrega ao cliente).

> **Cai em prova:** frete de **compra** é custo; frete de **venda** é despesa. Decore o par.

> **Conferido no site do CFC (Normas Completas):** o pronunciamento de estoques está em vigor como **CPC 16 (R1)** no CPC, com a versão brasileira **NBC TG 16 (R2)** do CFC. Confirmei a **versão vigente da norma**, e não cada afirmação do texto; os exemplos de custo e despesa vêm do resumo do professor e seguem em conferência.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-depreciacao-amortizacao-exaustao', 'Contabilidade Geral', 'Pronunciamentos CPC', 130, 'Depreciação, amortização e exaustão', 'Os conceitos de valor (original, contábil, residual, depreciável), a fórmula e as regras de início.', $md$## Qual é qual

| Termo | Perda de valor de... |
|---|---|
| **Depreciação** | Bens físicos, por desgaste, ação da natureza ou obsolescência |
| **Amortização** | Direitos de propriedade industrial ou comercial e outros com duração limitada |
| **Exaustão** | Direitos sobre recursos minerais ou florestais, pela exploração |

## Os valores

- **Valor original:** o custo de aquisição registrado. **Não é alterado** pela depreciação.
- **Valor contábil:** custo − depreciação acumulada − perdas por redução ao valor recuperável.
- **Valor residual:** o que se espera obter ao fim da vida útil, líquido das despesas de venda. **Não se deprecia.**
- **Valor depreciável:** custo − valor residual.

## Fórmula (método linear)

> **Depreciação anual = (Custo de aquisição − Valor residual) ÷ Vida útil em anos**

## Regras importantes

1. A depreciação **começa** quando o bem está disponível para uso. Sem data de início no enunciado, considere a data da compra.
2. Bem posto em uso durante o ano: a taxa é **proporcional aos meses** de uso, e a fração de mês conta como **mês integral**.
3. Lançamento: **D** Despesa de depreciação (resultado) / **C** Depreciação acumulada (retificadora do ativo).
4. Ao atingir 100%, para o cálculo. O bem fica pelo valor original, com depreciação acumulada de valor idêntico, até a baixa.
5. Se a questão não indicar o método, use o **linear (quotas constantes)**. Outros: soma dos dígitos (Cole), horas de trabalho, unidades produzidas.
6. **Depreciação acelerada:** coeficiente 1,0 (1 turno de 8 h), 1,5 (2 turnos) e 2,0 (3 turnos).
7. **Bens usados:** prazo é o **maior** entre a metade da vida útil do bem novo e o restante da vida útil, considerada desde a primeira instalação.

> **Cai em prova:** o valor residual pode **aumentar**; a despesa de depreciação será zero enquanto o residual for igual ou maior que o valor contábil.

> **Conferido no site do CFC:** a norma de ativo imobilizado é o **CPC 27**, versão brasileira **NBC TG 27 (R4)**. Confirmei a **versão vigente**. Os coeficientes de depreciação acelerada (1,0, 1,5 e 2,0) e o prazo para bens usados vêm de **regras fiscais do Imposto de Renda**, e não do CPC 27; **não foram conferidos aqui**, então confirme-os na legislação tributária antes de usar.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-impairment-cpc-01-baixa-ativos', 'Contabilidade Geral', 'Pronunciamentos CPC', 140, 'Redução ao valor recuperável (CPC 01) e baixa de ativos', 'O teste de recuperabilidade em três passos, a contabilização da perda e o resultado na alienação.', $md$## Objetivo do CPC 01

Garantir que os ativos **não fiquem registrados por mais do que podem render** com o uso ou com a venda.

## Conceitos

- **Valor recuperável:** o **maior** entre o valor justo líquido de despesas de venda e o valor em uso.
- **Perda por desvalorização (impairment):** o quanto o valor contábil excede o valor recuperável.

## Teste em três passos

1. Determine o **valor recuperável** (o maior entre valor líquido de venda e valor em uso).
2. Determine o **valor contábil** (custo − depreciação, amortização ou exaustão acumulada − perdas estimadas).
3. **Compare:**
   - Contábil **>** recuperável: há perda. **D** Perda com desvalorização de ativos (despesa) / **C** Perdas estimadas por desvalorização (retificadora do ativo).
   - Contábil **<** recuperável e **sem** perdas anteriores: nenhum ajuste.
   - Contábil **<** recuperável **com** perdas já reconhecidas: **reversão**. **D** Perdas estimadas (retificadora) / **C** Reversão de perda (receita).

## Baixa e alienação

O valor contábil de um ativo é baixado na **alienação** ou quando **não há expectativa de benefício econômico futuro** (por exemplo, extinção do bem).

> **Resultado na venda = Valor de alienação − Valor contábil**

> **Conferido no site do CFC e do CPC:** a norma vigente é o **CPC 01 (R1)**, em versão brasileira **NBC TG 01 (R4)** (DOU 22/12/2017). O **CPC 01 original foi revogado**; se um material citar a redação antiga, está desatualizado. Confirmei a **versão vigente**, e não cada passo do teste de recuperabilidade.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
('contabilidade-patrimonio-liquido-capital-reservas', 'Contabilidade Geral', 'Lei das S.A.', 150, 'Patrimônio líquido: capital, reservas e ações em tesouraria', 'Os tipos de capital, as reservas de capital e de lucros, a reserva legal e o mnemônico LERO.', $md$## Capital

| Termo | Significado |
|---|---|
| **Capital autorizado** | Valor previsto no estatuto para aumento do capital sem reforma estatutária |
| **Capital social (subscrito)** | Formado pelas ações subscritas na constituição ou em aumentos |
| **Capital a realizar (a integralizar)** | Parte que os sócios ainda não pagaram: capital social − capital realizado |
| **Capital integralizado (realizado)** | Parte que já foi paga |

Na constituição da companhia, exige-se entrada mínima de **10%** do preço de emissão das ações subscritas **em dinheiro**.

## Reservas (contas credoras do PL)

**Reservas de capital** (lançadas direto no PL, art. 182, § 1º): contribuição do subscritor que ultrapassar o valor nominal das ações (**ágio na emissão**) e o **produto da alienação de partes beneficiárias e bônus de subscrição**. O § 2º acrescenta o resultado da correção monetária do capital realizado, enquanto não capitalizado.

**Reservas de lucros** (destinações do lucro líquido): legal (**a única obrigatória**), estatutária, para contingências, de lucros a realizar, de incentivos fiscais, de retenção de lucros e especial de dividendos obrigatórios não distribuídos.

### Uso das reservas de capital

Absorver prejuízos que superem lucros acumulados e reservas de lucros; resgatar, reembolsar ou comprar ações; resgatar partes beneficiárias; incorporar ao capital; pagar dividendo a ações preferenciais, se assegurado.

## Ações em tesouraria

São ações da própria empresa readquiridas. A conta é **redutora do PL**. O limite do saldo é o dos lucros acumulados e reservas, **exceto a reserva legal**.

## Reserva legal

- **Cálculo:** 5% do lucro líquido do exercício.
- **Limite:** não ultrapassa 20% do capital social.
- **Uso:** só para **compensar prejuízos** ou **aumentar o capital**.

## Mnemônico LERO

As reservas de lucros cuja soma **não pode ultrapassar o capital social**: **L**egal, **E**statutária, **R**etenção de lucros e **O** (especial de dividendos obrigatórios não distribuídos). Ficam de fora contingências, incentivos fiscais, lucros a realizar e prêmio de debêntures.

> **Cai em prova:** das reservas de lucros, só a **legal** é obrigatória.

> **Atualização legislativa (conferida no Planalto, texto compilado da Lei nº 6.404/1976):** a **Lei nº 11.638/2007** revogou as alíneas "c" e "d" do § 1º do art. 182, de modo que o **prêmio na emissão de debêntures** e as **doações e subvenções para investimento** deixaram de ser reservas de capital (hoje seguem o regime das reservas de lucros). Itens de prova ou resumos antigos que as listem como reservas de capital estão **desatualizados**. A reserva legal continua em **5% do lucro líquido, limitada a 20% do capital social** (art. 193), e pode ser dispensada quando ela somada às reservas de capital passar de **30%** do capital (art. 193, § 1º).$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb),
('contabilidade-demonstracoes-contabeis-lei-6404', 'Contabilidade Geral', 'Lei das S.A.', 160, 'Demonstrações contábeis e a Lei nº 6.404/1976', 'Quais demonstrações cada tipo de companhia elabora e regras dos arts. 175 e 176.', $md$## Exercício social

Dura **um ano**, e a data de término é fixada no estatuto. Pode ter duração diversa na constituição da companhia e em alterações estatutárias (art. 175).

## Regras de apresentação (art. 176)

- Contas semelhantes podem ser **agrupadas**.
- Pequenos saldos podem ser **agregados**, desde que indicada a natureza e que não ultrapassem **1/10** do valor do grupo.
- É **vedado** usar designações genéricas, como "diversas contas" ou "contas correntes".
- As demonstrações registram a destinação dos lucros **conforme a proposta da administração**, no pressuposto de aprovação pela assembleia geral.

## Quadro das demonstrações

| Demonstração | Companhia aberta | Companhia fechada |
|---|---|---|
| Balanço patrimonial (BP) | Sim | Sim |
| Demonstração do resultado do exercício (DRE) | Sim | Sim |
| Lucros ou prejuízos acumulados (DLPA) ou Mutações do PL (DMPL) | Sim | Sim |
| Resultado abrangente (DRA), pelo CPC 26 | Sim | Conforme as normas aplicáveis |
| Fluxo de caixa (DFC) | Sim | Se o PL for **igual ou superior a R$ 2 milhões** |
| Valor adicionado (DVA) | Sim | Não obrigatória |

A DLPA pode estar dentro da DMPL, quando esta for elaborada e publicada.

> **Cai em prova:** o limite de **R$ 2 milhões de PL** vale para a **DFC** das companhias **fechadas**. A DVA é obrigatória só para as **abertas**.

> **Conferido no Planalto (Lei nº 6.404, art. 176, § 6º, incluído pela Lei nº 11.638/2007):** a companhia fechada com patrimônio líquido, na data do balanço, **inferior a R$ 2.000.000,00** **não é obrigada** a elaborar e publicar a demonstração dos fluxos de caixa. Ou seja, **a partir de R$ 2 milhões** a DFC é exigida.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis
  where public.study_materials.content_status = 'under_review';

commit;
