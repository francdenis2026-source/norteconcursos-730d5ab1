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

> **Cai em prova:** o Razão aparece como "facultativo", mas as bancas cobram que é **obrigatório** para o contribuinte do lucro real.$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[{"title": "Código Civil (Lei nº 10.406/2002), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm"}, {"title": "Lei Complementar nº 123/2006, texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm"}]'::jsonb),
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

> **Como pensar:** na competência pergunte "o fato **aconteceu**?". No caixa pergunte "o dinheiro **entrou ou saiu**?". A contabilidade adota, como regra, o regime de competência.$md$, 'Polícia Federal', 1, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
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

> **Cai em prova:** a EPCLD **nunca** reduz o PL diretamente de uma vez: ela passa pelo **resultado** (despesa) e só então reduz o ativo.$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
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

> **Cai em prova:** depreciação acumulada é **retificadora do ativo** (saldo credor). Não é passivo.$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb),
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

> **Cai em prova:** os tributos **recuperáveis** saem do custo da compra, porque serão compensados depois. Já os **não recuperáveis** ficam no custo.$md$, 'Polícia Federal', 2, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
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

> **Cai em prova:** frete de **compra** é custo; frete de **venda** é despesa. Decore o par.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
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

> **Cai em prova:** o valor residual pode **aumentar**; a despesa de depreciação será zero enquanto o residual for igual ou maior que o valor contábil.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
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

> **Resultado na venda = Valor de alienação − Valor contábil**$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[]'::jsonb),
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

> **Cai em prova:** o limite de **R$ 2 milhões de PL** vale para a **DFC** das companhias **fechadas**. A DVA é obrigatória só para as **abertas**.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização, exemplos e destaques de prova próprios. Aguardando conferência das normas e dos exemplos.', '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis
  where public.study_materials.content_status = 'under_review';

commit;
-- Flashcards e itens Certo/Errado por material (revisados junto com o texto).
begin;
alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;
update public.study_materials set flashcards = '[{"f": "Qual é o objeto da contabilidade?", "b": "O patrimônio das entidades (não o lucro)."}, {"f": "Qual é a finalidade da contabilidade?", "b": "Fornecer informações aos usuários."}, {"f": "Quais são as quatro técnicas contábeis?", "b": "Escrituração, demonstrações contábeis, auditoria e análise das demonstrações."}, {"f": "A contabilidade se aplica a entidades sem fins lucrativos?", "b": "Sim. O campo de aplicação inclui aziendas com ou sem fins lucrativos, pessoas físicas ou jurídicas."}, {"f": "Cite usuários das demonstrações contábeis.", "b": "Governo, administradores, investidores, empregados, credores, fornecedores e clientes."}]'::jsonb, quiz = '[{"q": "O objeto da contabilidade é o lucro das entidades.", "a": false, "why": "O objeto é o patrimônio; o lucro é uma das informações que ela produz."}, {"q": "A contabilidade pode ser aplicada a entidades sem fins lucrativos.", "a": true, "why": "O campo de aplicação abrange entidades com ou sem fins lucrativos."}, {"q": "Auditoria é uma das técnicas contábeis.", "a": true, "why": "As técnicas são escrituração, demonstrações, auditoria e análise das demonstrações."}]'::jsonb where slug = 'contabilidade-conceito-objeto-usuarios';
update public.study_materials set flashcards = '[{"f": "Equação fundamental do patrimônio", "b": "Ativo = Passivo exigível + Patrimônio Líquido."}, {"f": "Como calcular o PL?", "b": "PL = Ativo − Passivo exigível."}, {"f": "Sinônimos de Patrimônio Líquido", "b": "Capital próprio, situação líquida e passivo não exigível."}, {"f": "O que é passivo a descoberto?", "b": "Situação líquida negativa: Ativo < Passivo exigível, com PL < 0."}, {"f": "Sinônimos de passivo exigível", "b": "Passivo real, capital de terceiros e capital alheio."}]'::jsonb, quiz = '[{"q": "Situação líquida e patrimônio líquido são expressões equivalentes.", "a": true, "why": "Situação líquida é outro nome do PL."}, {"q": "PL positivo significa que a empresa teve lucro no período.", "a": false, "why": "Significa apenas que o ativo supera as dívidas."}, {"q": "Se o Ativo é menor que o Passivo exigível, a situação líquida é positiva.", "a": false, "why": "Nesse caso a situação líquida é negativa (passivo a descoberto)."}]'::jsonb where slug = 'contabilidade-patrimonio-equacao-fundamental';
update public.study_materials set flashcards = '[{"f": "Ato × fato", "b": "Ato administrativo não altera o patrimônio; fato contábil altera."}, {"f": "Fato permutativo", "b": "Troca elementos patrimoniais e não altera o PL. Ex.: compra de mercadoria à vista."}, {"f": "Fato modificativo aumentativo", "b": "Aumenta o PL. Ex.: receita de aluguel apropriada."}, {"f": "Insubsistência do passivo", "b": "Reduz o passivo e é classificada como receita."}, {"f": "Truque de memória das variações", "b": "O que melhora o PL vira receita; o que piora vira despesa."}]'::jsonb, quiz = '[{"q": "A assinatura de um contrato, por si só, é um fato contábil.", "a": false, "why": "É ato administrativo: não altera o patrimônio."}, {"q": "A superveniência passiva aumenta o passivo e é classificada como despesa.", "a": true, "why": "Aumento de passivo piora o PL e é despesa."}, {"q": "A compra de mercadoria à vista é um fato modificativo diminutivo.", "a": false, "why": "É permutativo: troca Caixa por Mercadorias, sem alterar o PL."}]'::jsonb where slug = 'contabilidade-atos-fatos-contabeis';
update public.study_materials set flashcards = '[{"f": "O que é a conta?", "b": "O meio de controle do patrimônio."}, {"f": "O que compõe o plano de contas?", "b": "Elenco, função e funcionamento das contas."}, {"f": "Duplicata para quem recebe", "b": "Ativo (direito): duplicatas a receber."}, {"f": "Adiantamento a fornecedores", "b": "Direito, ativo. Eu paguei antes."}, {"f": "Adiantamento de clientes", "b": "Obrigação, passivo. O cliente pagou antes."}]'::jsonb, quiz = '[{"q": "Adiantamento de clientes é um direito, classificado no ativo.", "a": false, "why": "É obrigação de entregar, portanto passivo."}, {"q": "Cheque à vista recebido aumenta o ativo Caixa.", "a": true, "why": "O cheque à vista é tratado como Caixa (bem)."}, {"q": "O plano de contas deve ser flexível e permitir incluir ou excluir contas.", "a": true, "why": "Se surgir fato não previsto, adapta-se o elenco."}]'::jsonb where slug = 'contabilidade-contas-plano-de-contas';
update public.study_materials set flashcards = '[{"f": "Princípio das partidas dobradas", "b": "A soma dos débitos é sempre igual à soma dos créditos."}, {"f": "Livro Diário", "b": "Principal, comum e cronológico. Obrigatório pelo Código Civil."}, {"f": "Livro Razão", "b": "Principal e sistemático (por conta). Facultativo, mas obrigatório para quem apura lucro real."}, {"f": "Requisitos da escrituração", "b": "Idioma e moeda nacionais, ordem cronológica, sem rasuras, entrelinhas ou emendas."}, {"f": "Quem autentica o Diário?", "b": "Junta Comercial (empresas mercantis) ou Registro Civil de Pessoas Jurídicas (civis)."}]'::jsonb, quiz = '[{"q": "O Livro Razão é sempre facultativo, sem exceção.", "a": false, "why": "É obrigatório para o contribuinte do lucro real e pela ITG 2000 (R1)."}, {"q": "A escrituração deve seguir ordem cronológica de dia, mês e ano.", "a": true, "why": "É um dos requisitos de escrituração."}, {"q": "Na escrituração é permitido corrigir erro com emenda no próprio lançamento.", "a": false, "why": "Emendas e rasuras são vedadas; só cabe retificação logo após o erro, como \"digo\"."}]'::jsonb where slug = 'contabilidade-escrituracao-partidas-dobradas-livros';
update public.study_materials set flashcards = '[{"f": "Regime de caixa", "b": "Receita recebida e despesa paga."}, {"f": "Regime de competência", "b": "Receita ganha e despesa incorrida, independentemente de receber ou pagar."}, {"f": "Receita ganha e não recebida", "b": "Competência: sim. Caixa: não."}, {"f": "Despesa não incorrida, mas paga", "b": "Competência: não. Caixa: sim."}, {"f": "Pergunta-chave de cada regime", "b": "Competência: o fato aconteceu? Caixa: o dinheiro entrou ou saiu?"}]'::jsonb, quiz = '[{"q": "Receita ganha e ainda não recebida é reconhecida no regime de competência.", "a": true, "why": "A competência considera o fato ocorrido, não o recebimento."}, {"q": "No regime de caixa, despesa incorrida e não paga é reconhecida.", "a": false, "why": "Pelo caixa só se reconhece o que foi pago."}, {"q": "Receita recebida antecipadamente, ainda não ganha, entra no regime de caixa mas não no de competência.", "a": true, "why": "Caixa olha o recebimento; competência exige que a receita seja ganha."}]'::jsonb where slug = 'contabilidade-regimes-caixa-competencia';
update public.study_materials set flashcards = '[{"f": "Seguro pago antecipadamente", "b": "D Seguros a vencer (ativo circulante) / C Caixa."}, {"f": "Venda de mercadorias", "b": "D Caixa ou Clientes / C Receita de vendas. Baixa: D CMV / C Estoques."}, {"f": "Adiantamento de cliente", "b": "D Caixa / C Adiantamento de clientes (passivo)."}, {"f": "Compensação de ICMS", "b": "D ICMS a recolher (passivo) / C ICMS a recuperar (ativo)."}, {"f": "Desconto de duplicata no banco", "b": "D Bancos e D Encargos a transcorrer / C Duplicatas descontadas (passivo)."}]'::jsonb, quiz = '[{"q": "Desconto financeiro concedido é lançado a débito de despesa financeira.", "a": true, "why": "D Descontos financeiros concedidos / C Caixa ou Valores a receber."}, {"q": "Seguro pago adiantado gera um passivo.", "a": false, "why": "Gera ativo (despesa antecipada), apropriado mês a mês."}, {"q": "Se o cliente não paga a duplicata descontada, debita-se Duplicatas descontadas e credita-se Bancos.", "a": true, "why": "O banco debita a empresa no vencimento."}]'::jsonb where slug = 'contabilidade-lancamentos-operacoes-diversas';
update public.study_materials set flashcards = '[{"f": "Provisão", "b": "Passivo de prazo ou valor incertos."}, {"f": "Saída de recursos provável", "b": "Contabiliza a provisão e divulga em notas explicativas."}, {"f": "Saída de recursos possível", "b": "Não contabiliza; divulga o passivo contingente."}, {"f": "Saída de recursos remota", "b": "Não contabiliza e não divulga."}, {"f": "EPCLD: natureza e constituição", "b": "Retificadora do ativo. D Despesa com EPCLD / C EPCLD."}]'::jsonb, quiz = '[{"q": "Passivo contingente de perda possível deve ser provisionado.", "a": false, "why": "Perda possível não é provisionada; apenas divulgada."}, {"q": "A EPCLD é conta retificadora do ativo.", "a": true, "why": "Reduz as contas a receber."}, {"q": "Passivo de perda remota é divulgado em notas explicativas.", "a": false, "why": "Perda remota não é contabilizada nem divulgada."}]'::jsonb where slug = 'contabilidade-provisoes-passivo-contingente-epcld';
update public.study_materials set flashcards = '[{"f": "O que o balancete verifica?", "b": "A correta aplicação das partidas dobradas (igualdade de débitos e créditos)."}, {"f": "Balancete é obrigatório?", "b": "Não. É um demonstrativo auxiliar."}, {"f": "De onde se elabora o balancete?", "b": "Do Livro Razão."}, {"f": "Balancete equilibrado garante escrituração correta?", "b": "Não. Erros que mantêm a igualdade passam despercebidos."}, {"f": "Número de colunas do balancete", "b": "De 2 a 8 colunas."}]'::jsonb, quiz = '[{"q": "Se o balancete fechou, está provado que não há erros de escrituração.", "a": false, "why": "Lançar na conta errada com valor certo mantém a igualdade."}, {"q": "O balancete é elaborado a partir do Livro Razão.", "a": true, "why": "Relaciona os saldos das contas do Razão."}, {"q": "O balancete de verificação é demonstração obrigatória.", "a": false, "why": "É auxiliar e não obrigatório."}]'::jsonb where slug = 'contabilidade-balancete-verificacao';
update public.study_materials set flashcards = '[{"f": "Grupos do ativo não circulante", "b": "Realizável a longo prazo, Investimentos, Imobilizado e Intangível."}, {"f": "Imobilizado × Intangível", "b": "Imobilizado: bens corpóreos. Intangível: bens incorpóreos."}, {"f": "Depreciação acumulada", "b": "Retificadora do ativo, com saldo credor."}, {"f": "Contas redutoras do PL", "b": "Capital a integralizar, ações em tesouraria e prejuízos acumulados."}, {"f": "Duplicatas descontadas", "b": "Conta do passivo (e Encargos a transcorrer a retifica)."}]'::jsonb, quiz = '[{"q": "A depreciação acumulada é classificada no passivo.", "a": false, "why": "É retificadora do ativo."}, {"q": "Fundo de comércio adquirido integra o Intangível.", "a": true, "why": "O Intangível abrange bens incorpóreos, inclusive o fundo de comércio adquirido."}, {"q": "Ações em tesouraria são conta redutora do Patrimônio Líquido.", "a": true, "why": "Aparecem como (−) no PL."}]'::jsonb where slug = 'contabilidade-balanco-patrimonial-estrutura';
update public.study_materials set flashcards = '[{"f": "Fórmula do CMV", "b": "CMV = Estoque inicial + Compras líquidas − Estoque final."}, {"f": "Receita líquida", "b": "Receita bruta − deduções (devoluções, descontos incondicionais, abatimentos e tributos sobre vendas)."}, {"f": "Desconto comercial (incondicional)", "b": "Deduz a receita bruta e reduz a base de ICMS, PIS e COFINS."}, {"f": "Desconto financeiro (condicional)", "b": "Despesa financeira; não deduz a receita."}, {"f": "Tributos recuperáveis nas compras", "b": "Saem do custo da compra, pois serão compensados."}]'::jsonb, quiz = '[{"q": "Desconto financeiro condicional é dedução da receita bruta.", "a": false, "why": "É despesa financeira; só o desconto incondicional deduz a receita."}, {"q": "CMV = Estoque inicial + Compras líquidas − Estoque final.", "a": true, "why": "Fórmula do custo das mercadorias vendidas."}, {"q": "Tributos não recuperáveis compõem o custo das compras.", "a": true, "why": "Os recuperáveis saem do custo; os não recuperáveis permanecem."}]'::jsonb where slug = 'contabilidade-mercadorias-cmv-resultado-bruto';
update public.study_materials set flashcards = '[{"f": "Frete sobre compras", "b": "Custo do estoque."}, {"f": "Frete sobre vendas", "b": "Despesa do período."}, {"f": "Custo de aquisição inclui...", "b": "Preço, tributos não recuperáveis, frete, seguro e manuseio."}, {"f": "Custo de aquisição deduz...", "b": "Descontos comerciais, abatimentos e tributos recuperáveis."}, {"f": "Desperdício anormal de materiais", "b": "Não entra no custo; é despesa do período."}]'::jsonb, quiz = '[{"q": "O frete sobre vendas compõe o custo do estoque.", "a": false, "why": "Frete sobre vendas é despesa de comercialização."}, {"q": "Tributos recuperáveis não integram o custo de aquisição.", "a": true, "why": "Eles são deduzidos do custo."}, {"q": "Matérias-primas e materiais de almoxarifado são estoques.", "a": true, "why": "Materiais ou suprimentos a consumir na produção são estoques."}]'::jsonb where slug = 'contabilidade-estoques-cpc-16';
update public.study_materials set flashcards = '[{"f": "Depreciação linear anual", "b": "(Custo − Valor residual) ÷ Vida útil em anos."}, {"f": "Depreciação × amortização × exaustão", "b": "Bens físicos; direitos de duração limitada; recursos minerais ou florestais."}, {"f": "Lançamento da depreciação", "b": "D Despesa de depreciação / C Depreciação acumulada (retificadora do ativo)."}, {"f": "Valor depreciável", "b": "Custo − valor residual."}, {"f": "Quando começa a depreciação?", "b": "Quando o bem está disponível para uso."}]'::jsonb, quiz = '[{"q": "A depreciação altera o valor original do bem.", "a": false, "why": "O valor original permanece; a depreciação acumula em conta retificadora."}, {"q": "O valor residual é depreciado ao longo da vida útil.", "a": false, "why": "O valor residual não se deprecia."}, {"q": "Sem indicação de método, usa-se o linear (quotas constantes).", "a": true, "why": "É a regra de prova."}]'::jsonb where slug = 'contabilidade-depreciacao-amortizacao-exaustao';
update public.study_materials set flashcards = '[{"f": "Valor recuperável", "b": "O maior entre o valor justo líquido de despesas de venda e o valor em uso."}, {"f": "Quando há perda por impairment?", "b": "Quando o valor contábil excede o valor recuperável."}, {"f": "Lançamento da perda", "b": "D Perda com desvalorização (despesa) / C Perdas estimadas (retificadora do ativo)."}, {"f": "Resultado na alienação", "b": "Valor de alienação − Valor contábil."}, {"f": "Reversão de perda", "b": "D Perdas estimadas / C Reversão de perda (receita)."}]'::jsonb, quiz = '[{"q": "O valor recuperável é o menor entre o valor líquido de venda e o valor em uso.", "a": false, "why": "É o maior dos dois."}, {"q": "Há perda quando o valor contábil é superior ao valor recuperável.", "a": true, "why": "A perda é o excesso do contábil sobre o recuperável."}, {"q": "O resultado na venda de um ativo é o valor de alienação menos o valor contábil.", "a": true, "why": "Positivo é ganho; negativo é perda."}]'::jsonb where slug = 'contabilidade-impairment-cpc-01-baixa-ativos';
update public.study_materials set flashcards = '[{"f": "Reserva legal", "b": "5% do lucro líquido, até 20% do capital social. Compensa prejuízos ou aumenta o capital."}, {"f": "Única reserva de lucros obrigatória", "b": "A reserva legal."}, {"f": "Mnemônico LERO", "b": "Legal, Estatutária, Retenção de lucros e dividendos obrigatórios não distribuídos."}, {"f": "Entrada mínima na constituição", "b": "10% do preço de emissão das ações subscritas, em dinheiro."}, {"f": "Ações em tesouraria", "b": "Ações próprias readquiridas; conta redutora do PL."}]'::jsonb, quiz = '[{"q": "Todas as reservas de lucros são obrigatórias.", "a": false, "why": "Só a reserva legal é obrigatória."}, {"q": "O ágio na emissão de ações é reserva de capital.", "a": true, "why": "Reservas de capital são lançadas diretamente no PL."}, {"q": "A reserva legal pode ser usada para pagar dividendos.", "a": false, "why": "Só serve para compensar prejuízos ou aumentar o capital."}]'::jsonb where slug = 'contabilidade-patrimonio-liquido-capital-reservas';
update public.study_materials set flashcards = '[{"f": "Duração do exercício social", "b": "Um ano; o término é fixado no estatuto."}, {"f": "DFC na companhia fechada", "b": "Obrigatória se o PL for igual ou superior a R$ 2 milhões."}, {"f": "DVA", "b": "Obrigatória só para companhias abertas."}, {"f": "Saldos pequenos no balanço", "b": "Podem ser agregados, desde que não excedam 1/10 do grupo e se indique a natureza."}, {"f": "Designações vedadas", "b": "Genéricas, como \"diversas contas\" ou \"contas correntes\"."}]'::jsonb, quiz = '[{"q": "A DVA é obrigatória para toda companhia fechada.", "a": false, "why": "É obrigatória apenas para as abertas."}, {"q": "A companhia fechada com PL de R$ 2 milhões ou mais deve elaborar a DFC.", "a": true, "why": "O critério é PL igual ou superior a R$ 2 milhões."}, {"q": "É permitido usar a designação \"diversas contas\" no balanço.", "a": false, "why": "Designações genéricas são vedadas."}]'::jsonb where slug = 'contabilidade-demonstracoes-contabeis-lei-6404';
commit;
-- Segundo lote da Biblioteca: Direito Constitucional, Administrativo e Penal (PF).
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('constitucional-nacionalidade-medidas-retirada', 'Direito Constitucional', 'Nacionalidade', 10, 'Nacionalidade: brasileiros natos e naturalizados', 'Quem é nato, quem é naturalizado, cargos privativos de nato e as medidas de retirada do estrangeiro.', $md$## Conceitos que não se confundem

| Termo | Alcance |
|---|---|
| **Nacionalidade** | Só os nacionais (natos ou naturalizados) de um Estado |
| **Povo** | O conjunto de nacionais |
| **População** | Nacionais, estrangeiros e apátridas |
| **Cidadania** | Qualifica o nacional para os direitos políticos, ativos (votar) e passivos (ser votado) |

> **Cuidado:** estrangeiros e apátridas **não** são cidadãos brasileiros.

## Nacionalidade originária e secundária

- **Originária (primária):** resulta de fato natural, o nascimento. É unilateral e independe da vontade do indivíduo.
- **Secundária (adquirida):** resulta de fato voluntário, a naturalização. É bilateral e depende de requerimento.

## Brasileiros natos (art. 12, I)

1. Nascidos no Brasil, ainda que de pais estrangeiros, desde que estes **não estejam a serviço de seu país** (critério *jus soli*).
2. Nascidos no estrangeiro, de pai ou mãe brasileiros, **a serviço do Brasil** (critério *jus sanguinis*).
3. Nascidos no estrangeiro, de pai ou mãe brasileiros, que sejam **registrados em repartição brasileira competente** ou **venham a residir no Brasil e optem**, a qualquer tempo, depois de atingida a maioridade, pela nacionalidade brasileira.

## Brasileiros naturalizados (art. 12, II)

| Naturalização | Requisitos |
|---|---|
| **Ordinária** | Originários de países de língua portuguesa: residência por **um ano ininterrupto** e idoneidade moral |
| **Extraordinária (quinzenária)** | Estrangeiros de qualquer nacionalidade, residentes há **mais de 15 anos ininterruptos**, **sem condenação penal**, que a requeiram |

A lei não pode distinguir natos de naturalizados, **salvo** nos casos previstos na Constituição.

## Cargos privativos de brasileiro nato

Presidente e Vice-Presidente da República, Presidente da Câmara, Presidente do Senado, Ministro do STF, carreira diplomática, oficial das Forças Armadas e Ministro de Estado da Defesa.

## Perda e reaquisição

Perde a nacionalidade brasileira (art. 12, § 4º) quem:

1. tiver **cancelada a naturalização, por sentença judicial**, em virtude de **fraude relacionada ao processo de naturalização** ou de **atentado contra a ordem constitucional e o Estado Democrático**;
2. fizer **pedido expresso de perda da nacionalidade** perante autoridade brasileira competente, **ressalvadas as situações que acarretem apatridia**.

A **renúncia** (pedido expresso) **não impede** que o interessado **readquira** a nacionalidade brasileira **originária**, nos termos da lei (art. 12, § 5º).

> **Atualização legislativa (conferida no Planalto): Emenda Constitucional nº 131, de 3/10/2023.** Passou a **não** haver perda da nacionalidade pela mera **aquisição de outra nacionalidade**: as antigas alíneas "a" e "b" do inciso II foram **revogadas**. A perda por cancelamento da naturalização agora exige fraude no processo de naturalização ou atentado contra a ordem constitucional (antes: "atividade nociva ao interesse nacional"). Surgiu a **perda a pedido**, vedada se gerar apatridia. Provas anteriores a 2023 que afirmem "adquirir outra nacionalidade faz perder a brasileira" estão **desatualizadas**.

## Medidas de retirada ou de proteção

| Medida | Natureza | Ideia central |
|---|---|---|
| **Extradição** | Cooperação internacional | Entrega de pessoa a outro Estado que tenha **condenação criminal definitiva** ou responda a **processo penal em curso** (art. 81). Ativa: feita pelo Brasil. Passiva: solicitada ao Brasil |
| **Expulsão** | Administrativa | Retirada compulsória, com impedimento de reingresso por prazo determinado, com base em **condenação transitada em julgado** por certos crimes (art. 54) |
| **Deportação** | Administrativa | Retirada compulsória de pessoa em situação migratória **irregular**, precedida de notificação com prazo de regularização não inferior a **60 dias** (art. 50) |
| **Repatriação** | Administrativa | **Devolução** de pessoa em situação de impedimento (sem visto) |
| **Refúgio** | Humanitário | Perseguição por raça, religião, nacionalidade, opinião política; tratamento mais coletivo |
| **Asilo político** | Político | Acolhimento de perseguido por **fatos não criminosos**, de natureza política |

> **Atualização legislativa (conferida no Planalto):** essas medidas são hoje regidas pela **Lei nº 13.445/2017 (Lei de Migração)**, que substituiu o antigo Estatuto do Estrangeiro (Lei nº 6.815/1980). Pontos que mudaram a cobrança: a **extradição** cabe também para **instrução de processo penal em curso**, e não só após condenação (art. 81); a **expulsão** exige condenação com **trânsito em julgado** por crime de genocídio, contra a humanidade, de guerra ou de agressão, ou por crime comum doloso com pena privativa de liberdade (art. 54); a **deportação** é precedida de notificação com prazo de regularização de **no mínimo 60 dias** (art. 50). **Não se concede extradição de brasileiro nato** (art. 82, I).

> **Cai em prova:** o brasileiro **nato** não é extraditado. Diferencie **extradição** (cooperação com outro Estado), **expulsão** (condenação por crime) e **deportação** (irregularidade migratória).$md$, 'Polícia Federal', 1, 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Aguardando conferência com a Constituição e as leis citadas.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}, {"title": "Emenda Constitucional nº 131/2023", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc131.htm"}, {"title": "Lei nº 13.445/2017 (Lei de Migração)", "url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm"}]'::jsonb, '[{"f": "Nacionalidade × cidadania", "b": "Nacionalidade: vínculo com o Estado (nato ou naturalizado). Cidadania: gozo dos direitos políticos, ativos e passivos."}, {"f": "Naturalização ordinária", "b": "Países de língua portuguesa: um ano de residência ininterrupta e idoneidade moral."}, {"f": "Naturalização extraordinária (quinzenária)", "b": "Mais de 15 anos de residência ininterrupta, sem condenação penal, e requerimento."}, {"f": "Cargos privativos de nato", "b": "Presidente e Vice, presidentes da Câmara e do Senado, Ministro do STF, diplomata, oficial das Forças Armadas e Ministro da Defesa."}, {"f": "Extradição × expulsão × deportação", "b": "Extradição: entrega a outro Estado por condenação definitiva ou processo penal em curso. Expulsão: retirada por condenação transitada em julgado. Deportação: retirada por situação migratória irregular."}]'::jsonb, '[{"q": "Estrangeiros e apátridas são cidadãos brasileiros.", "a": false, "why": "Cidadania pressupõe nacionalidade; estrangeiros e apátridas não são cidadãos brasileiros."}, {"q": "Quem nasce no Brasil, filho de pais estrangeiros que estão a serviço do país deles, é brasileiro nato.", "a": false, "why": "A regra do jus soli exclui os filhos de estrangeiros a serviço de seu país."}, {"q": "A deportação decorre de situação migratória irregular.", "a": true, "why": "É a retirada compulsória de pessoa em situação migratória irregular."}, {"q": "Após a EC 131/2023, o brasileiro que adquire outra nacionalidade perde, por isso, a brasileira.", "a": false, "why": "A mera aquisição de outra nacionalidade deixou de gerar a perda; só há perda por cancelamento judicial da naturalização ou por pedido expresso, sem gerar apatridia."}]'::jsonb),
('constitucional-direitos-politicos-elegibilidade', 'Direito Constitucional', 'Direitos políticos', 20, 'Direitos políticos, elegibilidade e partidos políticos', 'Sufrágio, plebiscito e referendo, idades mínimas, condições de elegibilidade e a diferença entre suspensão e perda.', $md$## Formas de exercício da soberania popular

**Sufrágio universal**, **voto direto e secreto**, **plebiscito**, **referendo** e **iniciativa popular**.

| | Plebiscito | Referendo |
|---|---|---|
| **Consulta** | Ao povo, sobre matéria relevante (constitucional, legislativa ou administrativa) | Igual |
| **Quando** | **Antes** do ato | **Depois** do ato |
| **Para quê** | Aprovar ou denegar | Ratificar ou rejeitar |

A convocação é feita pelo **Congresso Nacional**.

## Voto

| Situação | Voto |
|---|---|
| Maiores de 18 anos | **Obrigatório** |
| Analfabetos, maiores de 70 anos, maiores de 16 e menores de 18 | **Facultativo** |
| Estrangeiros e conscritos (durante o serviço militar obrigatório) | **Inalistáveis** |

## Condições de elegibilidade

Nacionalidade brasileira, pleno exercício dos direitos políticos, alistamento eleitoral, domicílio eleitoral na circunscrição, filiação partidária e **idade mínima**:

| Cargo | Idade mínima |
|---|---|
| Presidente, Vice-Presidente e Senador | **35** anos |
| Governador e Vice-Governador | **30** anos |
| Deputado, Prefeito, Vice-Prefeito e Juiz de paz | **21** anos |
| Vereador | **18** anos |

Os **analfabetos** são **inelegíveis**.

## Militar alistável

- **Menos de 10 anos de serviço:** deve afastar-se da atividade.
- **Mais de 10 anos:** é agregado pela autoridade superior e, se eleito, passa para a inatividade.

## Impugnação do mandato eletivo

Perante a **Justiça Eleitoral**, no prazo de **15 dias** contados da diplomação, nos casos de abuso do poder econômico, corrupção ou fraude.

## Perda × suspensão

É **vedada a cassação** de direitos políticos. A perda ou a suspensão só ocorre nos casos:

- cancelamento da naturalização por sentença transitada em julgado;
- incapacidade civil absoluta;
- condenação criminal transitada em julgado, enquanto durarem seus efeitos;
- recusa de cumprir obrigação a todos imposta ou prestação alternativa;
- improbidade administrativa.

## Partidos políticos (art. 17)

É **livre** a criação, fusão, incorporação e extinção, com caráter nacional e prestação de contas à Justiça Eleitoral. São **proibidos** o recebimento de recursos de entidade ou governo estrangeiros e a subordinação a eles. Têm **autonomia** para definir sua estrutura interna, a escolha, formação e duração de seus órgãos e para formar coligações nas eleições majoritárias, nos termos da lei.

> **Cai em prova:** a Constituição **veda a cassação** dos direitos políticos. Só existem perda e suspensão, nas hipóteses do art. 15.$md$, 'Polícia Federal', 1, 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Aguardando conferência com a Constituição e as leis citadas.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb, '[{"f": "Plebiscito × referendo", "b": "Plebiscito é anterior ao ato (aprovar ou denegar); referendo é posterior (ratificar ou rejeitar)."}, {"f": "Idade mínima: Presidente, Vice e Senador", "b": "35 anos."}, {"f": "Idade mínima: Governador e Vice", "b": "30 anos."}, {"f": "Idade mínima: Deputado, Prefeito e Juiz de paz", "b": "21 anos. Vereador: 18 anos."}, {"f": "Cassação de direitos políticos", "b": "É vedada. Só há perda ou suspensão, nas hipóteses do art. 15 da Constituição."}]'::jsonb, '[{"q": "O voto é facultativo para os maiores de 70 anos.", "a": true, "why": "Também é facultativo para analfabetos e para maiores de 16 e menores de 18 anos."}, {"q": "A Constituição admite a cassação de direitos políticos em caso de improbidade administrativa.", "a": false, "why": "A cassação é vedada; a improbidade pode gerar suspensão, nos casos do art. 15."}, {"q": "A idade mínima para ser Senador é de 35 anos.", "a": true, "why": "Presidente, Vice-Presidente e Senador exigem 35 anos."}]'::jsonb),
('administrativo-poderes-vinculado-discricionario-hierarquico', 'Direito Administrativo', 'Poderes administrativos', 10, 'Poderes vinculado, discricionário, hierárquico, disciplinar e regulamentar', 'Como cada poder funciona, o que o superior pode fazer com o ato do subordinado e os tipos de regulamento.', $md$## Ideia geral

A finalidade da Administração é garantir o **interesse público**. Os **poderes** são meios instrumentais e **prerrogativas** de direito público. Não são absolutos: sofrem os limites dos direitos e garantias dos cidadãos. São **irrenunciáveis** e, para o agente, funcionam como **poder-dever de agir**.

## Vinculado × discricionário

| | Poder vinculado | Poder discricionário |
|---|---|---|
| **Margem de valoração** | Mínima ou inexistente | Juízo de **conveniência e oportunidade** |
| **Mérito administrativo** | Inexistente | Existe |

O **mérito** é formado por **motivo** e **objeto**. Mesmo no ato discricionário, **competência, finalidade e forma** são **sempre vinculados**.

## Poder hierárquico

Organiza as funções dos agentes e define superiores que **emitem ordens e fiscalizam**. Está presente em todos os poderes e esferas.

- **Avocar:** o superior traz para si atribuições do subordinado, que **não sejam privativas** por previsão legal.
- **Delegar:** transferência **precária** de atribuições. **Não pode ser negada** pelo subordinado. **Não se delegam**: atribuições exclusivas, atos de natureza política e a atribuição de um Poder para outro (salvo previsão constitucional).

### Revisão do ato do subordinado

Manter, **convalidar** (sanear o defeito por um segundo ato) ou **desfazer**: **revogação** (ato inconveniente ou inoportuno) ou **anulação** (ato com vício).

| Reconsideração | Revisão |
|---|---|
| Pela **própria** autoridade que emitiu o ato | Pela autoridade **superior** |

## Poder disciplinar

Capacidade de **verificar infrações e aplicar penalidades** a quem tenha **vínculo** com a Administração, seja funcional (servidores, decorre do poder hierárquico) ou contratual (particulares contratados). Tem caráter predominantemente **discricionário**.

## Poder regulamentar × poder normativo

O **poder normativo** é mais amplo: abrange todos os atos normativos, exceto os do chefe do Executivo. O **poder regulamentar** é do **chefe do Executivo**.

| Regulamento | Características |
|---|---|
| **Executivo** | Geral e abstrato, viabiliza o **fiel cumprimento da lei**, é ato **secundário** e **não inova**. Competência **indelegável** |
| **Autônomo** | Privativo do chefe do Executivo, pode ser delegado a Ministros, é ato **primário** e **pode inovar** |
| **Autorizado (delegado)** | Editado por órgãos da Administração mediante **delegação por lei**, que fixa as diretrizes. Ato secundário, mas **pode inovar** |

> **Cai em prova:** o regulamento **executivo** não inova; só os **autônomos** e os **autorizados** podem inovar.$md$, 'Polícia Federal', 1, 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Aguardando conferência com a Constituição e as leis citadas.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb, '[{"f": "Elementos sempre vinculados do ato", "b": "Competência, finalidade e forma, mesmo no ato discricionário."}, {"f": "Mérito administrativo", "b": "Formado por motivo e objeto; existe só no ato discricionário."}, {"f": "Avocar × delegar", "b": "Avocar: o superior traz atribuição do subordinado, se não for privativa. Delegar: transferência precária de atribuição."}, {"f": "Reconsideração × revisão", "b": "Reconsideração: pela própria autoridade que editou o ato. Revisão: pela autoridade superior."}, {"f": "Regulamento que não inova", "b": "O executivo (decreto regulamentar), ato secundário que viabiliza o fiel cumprimento da lei."}]'::jsonb, '[{"q": "O subordinado pode se recusar a cumprir uma delegação de atribuição.", "a": false, "why": "A delegação não pode ser negada pelo subordinado."}, {"q": "Revogação e anulação são formas de desfazer o ato: a primeira por inconveniência, a segunda por vício.", "a": true, "why": "Revoga-se o ato inconveniente ou inoportuno; anula-se o ato com vício."}, {"q": "O regulamento executivo pode inovar a ordem jurídica.", "a": false, "why": "É ato secundário e não inova; os autônomos e autorizados podem inovar."}]'::jsonb),
('administrativo-poder-de-policia-ciclo-prescricao', 'Direito Administrativo', 'Poderes administrativos', 20, 'Poder de polícia: atributos, ciclo e prescrição', 'Conceito, polícia administrativa × judiciária, atributos e as quatro fases do ciclo de polícia.', $md$## Conceito

Capacidade do Estado de **restringir direitos e garantias individuais** em benefício da coletividade, aplicada de forma moderada e buscando o interesse público. Só pode ser exercida por entidades de **direito público**.

| Espécie | Quem exerce |
|---|---|
| **Originário** | Órgãos dos entes políticos (Administração **direta**) |
| **Derivado** | Entidades de direito público da Administração **indireta** |

## Polícia administrativa × judiciária

| | Administrativa | Judiciária |
|---|---|---|
| **Caráter** | Predominantemente **preventivo** | Predominantemente **repressivo** |
| **Atua sobre** | Bens, direitos e atividades | **Pessoas** |
| **Quem exerce** | De forma ampla na Administração | Apenas alguns órgãos |
| **Investiga** | Ilícitos **administrativos** | Ilícitos **penais** |

## Atributos

1. **Discricionariedade:** análise de oportunidade e conveniência.
2. **Autoexecutoriedade:** a Administração decide e executa **sem recorrer ao Judiciário**. Só ocorre quando **prevista em lei** ou em caso de **urgência**. Divide-se em **exigibilidade** (decisões executórias, por meios indiretos de coação) e **executoriedade** (executar a decisão, podendo usar força física, por meios diretos).
3. **Coercibilidade:** impor a própria vontade. **Só os atos autoexecutórios** têm coercibilidade.

## Ciclo de polícia

1. **Ordem de polícia:** norma que obriga a fazer ou deixar de fazer algo em função do interesse público.
2. **Consentimento de polícia:** ato que permite ao particular exercer atividade ou usar a propriedade.
3. **Fiscalização de polícia:** verificar se as ordens são obedecidas e se as atividades consentidas estão regulares.
4. **Sanção de polícia:** punição efetiva pelo descumprimento.

## Prescrição (esfera federal, Lei nº 9.873/1999)

- Existe a **prescrição intercorrente** (no curso do processo, por inércia da Administração).
- É **interrompida** pela notificação ou citação do acusado, por qualquer ato inequívoco de apuração do fato, pela decisão condenatória recorrível e por ato inequívoco que importe tentativa de solução conciliatória no âmbito interno.
- Se o fato também constituir **crime**, aplicam-se os prazos da **lei penal**.

## Abuso de poder

| Excesso de poder | Desvio de poder (de finalidade) |
|---|---|
| O agente extrapola os limites da **competência** | O agente busca fim diverso do previsto ou contrário ao interesse público |
| Vício na **competência** | Vício na **finalidade** |

As duas hipóteses formam o **abuso de poder**.$md$, 'Polícia Federal', 1, 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Aguardando conferência com a Constituição e as leis citadas.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}, {"title": "Lei nº 9.873/1999 (prescrição da ação punitiva federal)", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9873.htm"}]'::jsonb, '[{"f": "Polícia administrativa × judiciária", "b": "Administrativa: preventiva, atua sobre bens e atividades, ilícito administrativo. Judiciária: repressiva, atua sobre pessoas, ilícito penal."}, {"f": "Quando há autoexecutoriedade?", "b": "Quando prevista em lei ou em situação de urgência."}, {"f": "Quatro fases do ciclo de polícia", "b": "Ordem, consentimento, fiscalização e sanção."}, {"f": "Excesso de poder", "b": "O agente extrapola sua competência; vício no elemento competência."}, {"f": "Desvio de poder", "b": "Também chamado de desvio de finalidade; vício no elemento finalidade."}]'::jsonb, '[{"q": "Só os atos autoexecutórios têm coercibilidade.", "a": true, "why": "A coercibilidade acompanha os atos que gozam de autoexecutoriedade."}, {"q": "A polícia judiciária é predominantemente preventiva.", "a": false, "why": "É predominantemente repressiva e investiga ilícitos penais."}, {"q": "O poder de polícia pode ser exercido por qualquer entidade de direito privado.", "a": false, "why": "Só entidades de direito público o exercem."}]'::jsonb),
('penal-principios-direito-penal', 'Direito Penal', 'Princípios', 10, 'Princípios do Direito Penal', 'Legalidade, irretroatividade, insignificância (MARI), intervenção mínima, ofensividade e os demais princípios do mapa.', $md$## Legalidade e anterioridade

> *Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal.*

- **Reserva legal:** só a **lei** define as condutas que são crime.
- **Anterioridade:** a lei deve ser anterior ao fato.
- **Irretroatividade:** a lei penal **não retroage**, exceto **para beneficiar o réu**, inclusive com trânsito em julgado.
- **Extra-atividade:** mesmo revogada, a lei pode continuar regulando fatos de sua vigência (**ultra-atividade**) ou retroagir (**retroatividade**).
- **Tempus regit actum:** aplica-se a lei vigente ao tempo do fato.

## Intervenção mínima, fragmentariedade e subsidiariedade

- **Intervenção mínima (*ultima ratio*):** o Direito Penal só intervém quando nenhum outro ramo puder dar resposta efetiva.
- **Fragmentariedade:** pune apenas as ações ou omissões **mais graves** contra os **bens jurídicos mais importantes**. Não sanciona todas as condutas.

## Insignificância (mnemônico MARI)

Exclui a tipicidade material quando presentes, ao mesmo tempo:

- **M**ínima ofensividade da conduta;
- **A**usência de periculosidade social da ação;
- **R**eduzido grau de reprovabilidade do comportamento;
- **I**nexpressividade da lesão jurídica provocada.

## Demais princípios

| Princípio | Ideia |
|---|---|
| **Ofensividade (lesividade)** | Só há crime se houver **lesão ou ameaça de lesão** a bem jurídico |
| **Alteridade** | Não se pune conduta que não ofenda bem jurídico **de outra pessoa** (não se pune a autolesão) |
| **Responsabilidade pessoal** | Nenhuma pena passará da pessoa do condenado |
| **Humanidade** | São inconstitucionais penas cruéis, infamantes, tortura e maus-tratos |
| **Consunção** | O fato mais grave **absorve** o menos grave |
| **Especialidade** | A norma **especial** afasta a **geral** |

> **Cai em prova:** a irretroatividade **tem exceção**: a lei penal **benéfica** retroage, mesmo depois do trânsito em julgado.$md$, 'Polícia Federal', 1, 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Aguardando conferência com a Constituição e as leis citadas.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}, {"title": "Código Penal (Decreto-Lei nº 2.848/1940)", "url": "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"}]'::jsonb, '[{"f": "Regra de irretroatividade penal", "b": "A lei penal não retroage, exceto para beneficiar o réu, inclusive após o trânsito em julgado."}, {"f": "Mnemônico MARI (insignificância)", "b": "Mínima ofensividade, Ausência de periculosidade social, Reduzido grau de reprovabilidade, Inexpressividade da lesão."}, {"f": "Intervenção mínima", "b": "O Direito Penal é a última ratio: só atua quando outros ramos não bastam."}, {"f": "Alteridade", "b": "Não se pune a conduta que não ofende bem jurídico de outra pessoa, como a autolesão."}, {"f": "Consunção × especialidade", "b": "Consunção: o fato mais grave absorve o menos grave. Especialidade: a norma especial afasta a geral."}]'::jsonb, '[{"q": "A lei penal posterior mais benéfica não retroage depois do trânsito em julgado.", "a": false, "why": "Ela retroage para beneficiar o réu, inclusive após o trânsito em julgado."}, {"q": "Para o princípio da insignificância, basta a inexpressividade da lesão, sem outros requisitos.", "a": false, "why": "Exigem-se os quatro vetores do MARI em conjunto."}, {"q": "Pelo princípio da alteridade, a autolesão não é punida.", "a": true, "why": "Não há crime sem ofensa a bem jurídico de terceiro."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
