-- Cinco materiais que faltavam em Contabilidade Geral para cobrir o edital da PF (linha 3):
-- NBC TSP Estrutura Conceitual, bases de mensuração, imobilizado e intangível, DLPA/DMPL/DRA e
-- instrumentos financeiros (CPC 48). Entram como `under_review`: o aluno só vê depois que um admin
-- conferir o texto com o pronunciamento e ativar.
begin;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('contabilidade-nbc-tsp-estrutura-conceitual', 'Contabilidade Geral', 'Estrutura conceitual', 17,
 'NBC TSP Estrutura Conceitual: a contabilidade no setor público',
 'Objetivos da informação contábil pública, características qualitativas e a definição de ativo com potencial de serviços.',
 $md$## A ideia central

A **NBC TSP Estrutura Conceitual** é o "CPC 00 do setor público". Usa a mesma lógica da contabilidade privada, com uma diferença de foco: a entidade pública não busca lucro. A informação contábil existe para **prestar contas** sobre o uso dos recursos públicos e para **apoiar decisões**.

## Objetivos e usuários

- **Prestação de contas e responsabilização:** mostrar como os recursos foram obtidos e usados.
- **Tomada de decisão:** dar base para decidir sobre a alocação de recursos.
- **Usuários principais:** quem recebe os serviços públicos e quem fornece os recursos (cidadãos, contribuintes, legislativo e seus representantes).

## Características qualitativas

A norma do setor público lista seis, sem a divisão "fundamentais e de melhoria" do CPC 00:

| Característica | Ideia |
|---|---|
| **Relevância** | A informação faz diferença para o objetivo da prestação de contas e da decisão |
| **Representação fidedigna** | Retrata o fenômeno como ele é |
| **Compreensibilidade** | Pode ser entendida pelos usuários |
| **Tempestividade** | Chega a tempo de ser útil |
| **Comparabilidade** | Permite comparar entre períodos e entidades |
| **Verificabilidade** | Observadores independentes chegam à mesma conclusão |

## Ativo e passivo no setor público

- **Ativo** é um recurso presente controlado pela entidade como resultado de evento passado. **Recurso** é um item com **potencial de serviços** ou com capacidade de gerar benefícios econômicos. Por isso um bem sem potencial de serviços e incapaz de gerar benefícios **não** é ativo.
- **Passivo** é uma obrigação presente da entidade de transferir recursos como resultado de evento passado.

> **Cai em prova:** a expressão **"potencial de serviços"** na definição de ativo, que é a marca da norma do setor público. Na PF 2021, a questão sobre bens "sem potencial de serviços" pedia exatamente isso.
$md$,
 'Polícia Federal', 3, 'Material próprio, baseado na NBC TSP Estrutura Conceitual (Conselho Federal de Contabilidade) e no Resumão de Contabilidade Geral (Gran Cursos Online, prof. Feliphe Araújo). Aguardando conferência do texto com o pronunciamento e inclusão da fonte oficial antes da publicação.', '[]'::jsonb,
 '[{"f": "Quais são os objetivos da informação contábil no setor público?", "b": "Prestação de contas e responsabilização, e apoio à tomada de decisão."}, {"f": "Quais são os usuários principais da informação contábil pública?", "b": "Quem recebe os serviços públicos e quem fornece os recursos, e seus representantes."}, {"f": "Quais são as seis características qualitativas na norma do setor público?", "b": "Relevância, representação fidedigna, compreensibilidade, tempestividade, comparabilidade e verificabilidade."}, {"f": "O que é um recurso, na definição de ativo do setor público?", "b": "Um item com potencial de serviços ou com capacidade de gerar benefícios econômicos."}]'::jsonb,
 '[{"q": "No setor público, a informação contábil tem como único objetivo apurar o resultado (lucro) da entidade.", "a": false, "why": "Os objetivos são a prestação de contas e o apoio à tomada de decisão."}, {"q": "Na definição de ativo do setor público, o recurso pode ter potencial de serviços, e não apenas capacidade de gerar benefícios econômicos.", "a": true, "why": "É a característica própria da norma do setor público."}, {"q": "Um bem sem potencial de serviços e incapaz de gerar benefícios econômicos não se enquadra na definição de ativo.", "a": true, "why": "Faltando potencial de serviços e de benefícios, não há recurso."}, {"q": "Compreensibilidade e tempestividade estão entre as características qualitativas da informação do setor público.", "a": true, "why": "A norma lista relevância, representação fidedigna, compreensibilidade, tempestividade, comparabilidade e verificabilidade."}]'::jsonb),
('contabilidade-bases-de-mensuracao', 'Contabilidade Geral', 'Estrutura conceitual', 18,
 'Bases de mensuração: setor privado (CPC 00) e setor público (NBC TSP)',
 'Custo histórico, valor justo, valor em uso e custo corrente, e as bases próprias do setor público, incluindo o custo de liberação.',
 $md$## A ideia central

**Mensurar** é atribuir um valor em reais a um ativo ou passivo para colocá-lo no balanço. A Estrutura Conceitual diz quais bases são aceitas. O setor privado e o setor público têm listas parecidas, mas **não iguais**, e a prova explora a diferença.

## Setor privado (CPC 00)

| Base | Ideia |
|---|---|
| **Custo histórico** | Valor da transação que originou o item, atualizado por consumo (depreciação), perdas e juros |
| **Valor justo** | Preço que seria recebido pela venda de um ativo (ou pago pela transferência de um passivo) em transação não forçada entre participantes do mercado |
| **Valor em uso** (ativos) e **valor de cumprimento** (passivos) | Valor presente dos fluxos de caixa esperados do uso do ativo, ou do cumprimento da obrigação |
| **Custo corrente** | Custo, hoje, de um ativo equivalente (ou valor que se receberia hoje por assumir passivo equivalente), incluindo custos de transação |

O **valor corrente** reúne valor justo, valor em uso ou de cumprimento, e custo corrente.

## Setor público (NBC TSP)

- **Ativos:** custo histórico, valor de mercado, custo de reposição, preço líquido de venda e valor em uso.
- **Passivos:** custo histórico, custo de cumprimento, valor de mercado, **custo de liberação** e preço presumido.

O **custo de liberação** é o montante que o credor aceitaria para liquidar a obrigação, ou que um terceiro cobraria para assumi-la. É base de **passivos**, e não de ativos.

> **Cai em prova:** afirmar que o "custo de liberação" é base de mensuração dos **ativos** em geral é erro: ele vale para passivos. Na PF 2021, a questão 111 dependia dessa troca.
$md$,
 'Polícia Federal', 3, 'Material próprio, baseado na Estrutura Conceitual para Relatório Financeiro (CPC 00 R2) e na NBC TSP Estrutura Conceitual, e no Resumão de Contabilidade Geral (Gran Cursos Online, prof. Feliphe Araújo). Aguardando conferência do texto com o pronunciamento e inclusão da fonte oficial antes da publicação.', '[]'::jsonb,
 '[{"f": "Quais são as bases de mensuração do CPC 00?", "b": "Custo histórico e valor corrente (valor justo, valor em uso ou de cumprimento, e custo corrente)."}, {"f": "O que é o valor justo?", "b": "O preço que seria recebido pela venda de um ativo ou pago pela transferência de um passivo, em transação não forçada entre participantes do mercado."}, {"f": "Valor em uso e valor de cumprimento: a quê se aplicam?", "b": "Valor em uso, a ativos; valor de cumprimento, a passivos. Ambos são valor presente de fluxos de caixa esperados."}, {"f": "A que o custo de liberação se aplica, no setor público?", "b": "A passivos: o montante que o credor aceitaria para liquidar a obrigação ou que um terceiro cobraria para assumi-la."}]'::jsonb,
 '[{"q": "Custo histórico e valor corrente são as grandes categorias de bases de mensuração do CPC 00.", "a": true, "why": "O valor corrente reúne valor justo, valor em uso/cumprimento e custo corrente."}, {"q": "O valor justo é o preço de uma venda forçada, em liquidação.", "a": false, "why": "O valor justo pressupõe transação não forçada entre participantes do mercado."}, {"q": "O custo de liberação é uma base de mensuração aplicável aos ativos em geral.", "a": false, "why": "Ele é base de mensuração de passivos."}, {"q": "O valor de cumprimento é o valor presente dos fluxos de caixa que a entidade espera transferir ao cumprir um passivo.", "a": true, "why": "É a base de valor presente aplicada aos passivos."}]'::jsonb),
('contabilidade-imobilizado-intangivel-reconhecimento', 'Contabilidade Geral', 'Pronunciamentos CPC', 135,
 'Imobilizado e intangível: custo, reconhecimento e amortização (CPC 27 e CPC 04)',
 'O que entra no custo do imobilizado, o que vai para despesa, e as regras do intangível com vida útil definida e indefinida.',
 $md$## Imobilizado (CPC 27): o que entra no custo

O custo do bem é o **preço de aquisição** (mais impostos de importação e não recuperáveis, menos descontos comerciais e abatimentos) mais os **custos diretamente atribuíveis** para colocá-lo em condição de uso: preparação do local, frete e manuseio, instalação e montagem, testes e honorários profissionais. Entra também a estimativa inicial de desmontagem e restauração do local.

**Não** entram no custo, e vão para despesa: abertura de nova instalação, introdução de novo produto (propaganda), mudança de local ou treinamento, e custos administrativos e indiretos.

| Gasto | Tratamento |
|---|---|
| Manutenção e reparos | Resultado, quando incorridos |
| Peças de reposição e paradas programadas relevantes | Somam-se ao valor contábil do ativo |

## Intangível (CPC 04)

**Intangível** é um ativo não monetário, identificável e sem substância física. Reconhece-se quando é provável que gere benefícios futuros e o custo é mensurável.

- **Vida útil definida:** é **amortizado**, a partir do momento em que está disponível para uso.
- **Vida útil indefinida:** **não** se amortiza, mas passa por teste de recuperabilidade pelo menos uma vez por ano.
- **Ágio por expectativa de rentabilidade futura:** não se amortiza; é testado anualmente.
- **Pesquisa** vai para despesa; **desenvolvimento** pode virar ativo se cumprir os critérios. Marcas e listas de clientes gerados internamente **não** são reconhecidos.

> **Cai em prova:** o início da amortização é a **disponibilidade para uso**, e não a data da compra; frete e instalação **entram** no custo; manutenção **não**.
$md$,
 'Polícia Federal', 3, 'Material próprio, baseado no CPC 27 (Ativo Imobilizado), no CPC 04 (Ativo Intangível) e no Resumão de Contabilidade Geral (Gran Cursos Online, prof. Feliphe Araújo). Aguardando conferência do texto com o pronunciamento e inclusão da fonte oficial antes da publicação.', '[]'::jsonb,
 '[{"f": "O que compõe o custo de um item do imobilizado?", "b": "Preço de aquisição (com impostos não recuperáveis, sem descontos), custos diretamente atribuíveis (frete, instalação, testes) e estimativa de desmontagem."}, {"f": "Manutenção e reparos entram no custo do imobilizado?", "b": "Não. São reconhecidos no resultado quando incorridos."}, {"f": "Quando começa a amortização de um intangível?", "b": "Quando o ativo está disponível para uso."}, {"f": "Intangível com vida útil indefinida: amortiza?", "b": "Não. Faz-se teste de recuperabilidade pelo menos uma vez por ano."}]'::jsonb,
 '[{"q": "Os custos de frete e de instalação necessários para o bem funcionar compõem o custo do imobilizado.", "a": true, "why": "São custos diretamente atribuíveis."}, {"q": "Os custos com a abertura de uma nova instalação são incluídos no custo do imobilizado.", "a": false, "why": "Vão para o resultado, assim como propaganda e treinamento."}, {"q": "A amortização de um intangível com vida útil definida começa no momento da compra, mesmo que o ativo ainda não possa ser usado.", "a": false, "why": "Começa quando o ativo está disponível para uso."}, {"q": "Um intangível com vida útil indefinida não é amortizado, mas é testado anualmente quanto à recuperabilidade.", "a": true, "why": "É a regra do CPC 04."}]'::jsonb),
('contabilidade-dlpa-dmpl-dra', 'Contabilidade Geral', 'Lei das S.A.', 167,
 'DLPA, DMPL e demonstração do resultado abrangente',
 'O que cada demonstração mostra e quais são exigidas de cada tipo de companhia.',
 $md$## A ideia central

Além do balanço e da DRE, três demonstrações explicam **o patrimônio líquido** e o **resultado total**. A prova cobra o que cada uma mostra e **quem é obrigado a fazê-la**.

## O que cada uma mostra

| Demonstração | O que mostra |
|---|---|
| **DLPA** (lucros ou prejuízos acumulados) | Saldo inicial, ajustes de exercícios anteriores, reversões de reservas, lucro líquido do exercício, as destinações (reservas, dividendos, capital) e o saldo final |
| **DMPL** (mutações do patrimônio líquido) | A variação de **todos** os componentes do PL no período: capital, reservas, ajustes de avaliação patrimonial, prejuízos acumulados |
| **DRA** (resultado abrangente) | Parte do lucro líquido e soma os **outros resultados abrangentes**, como o ajuste a valor justo de títulos mensurados por VJORA, chegando ao resultado abrangente total |

A DLPA pode ser **incluída na DMPL**, quando esta é elaborada e publicada.

## Quem elabora

| Tipo de companhia | Demonstrações |
|---|---|
| Aberta (Lei das S.A.) | Balanço, DRE, DLPA (ou DMPL), DFC e DVA |
| Fechada (Lei das S.A.) | Balanço, DRE, DLPA e DFC (esta, se o PL for de pelo menos R$ 2 milhões) |
| Aberta (CPC 26 e CVM) | Balanço, DRE, DRA, DMPL, DFC e DVA |

A **DVA** é exigida só da companhia aberta, e a **DMPL** é facultativa para a fechada.

> **Cai em prova:** companhia fechada com PL inferior a R$ 2 milhões **não** precisa da DFC; a DVA é **só** da aberta.
$md$,
 'Polícia Federal', 3, 'Material próprio, baseado na Lei nº 6.404/1976 (arts. 176 e 186), no CPC 26 (R1) e no Resumão de Contabilidade Geral (Gran Cursos Online, prof. Feliphe Araújo). Aguardando conferência do texto com o pronunciamento e inclusão da fonte oficial antes da publicação.', '[]'::jsonb,
 '[{"f": "O que a DLPA mostra?", "b": "A movimentação dos lucros ou prejuízos acumulados: saldo inicial, ajustes, lucro líquido, destinações e saldo final."}, {"f": "O que a DMPL mostra?", "b": "A variação de todos os componentes do patrimônio líquido no período."}, {"f": "O que a DRA acrescenta ao resultado líquido?", "b": "Os outros resultados abrangentes, chegando ao resultado abrangente total."}, {"f": "Quais companhias são obrigadas à DVA?", "b": "Apenas as companhias abertas."}]'::jsonb,
 '[{"q": "A DLPA pode ser incluída na DMPL quando esta é elaborada e publicada pela companhia.", "a": true, "why": "A DMPL já mostra a movimentação dos lucros acumulados."}, {"q": "A companhia fechada com patrimônio líquido inferior a R$ 2 milhões está dispensada da demonstração dos fluxos de caixa.", "a": true, "why": "É a dispensa prevista na Lei das S.A. para companhias fechadas."}, {"q": "A demonstração do valor adicionado é obrigatória para todas as sociedades anônimas, abertas ou fechadas.", "a": false, "why": "É exigida das companhias abertas."}, {"q": "A demonstração do resultado abrangente inclui os outros resultados abrangentes além do lucro líquido.", "a": true, "why": "É o que a distingue da DRE."}]'::jsonb),
('contabilidade-instrumentos-financeiros-cpc-48', 'Contabilidade Geral', 'Pronunciamentos CPC', 170,
 'Instrumentos financeiros (CPC 48): classificação e mensuração dos ativos',
 'Os dois testes que definem custo amortizado, VJORA ou VJR, e o efeito de cada um no balanço e no resultado.',
 $md$## A ideia central

Um ativo financeiro (um título, por exemplo) é classificado em **três categorias**, e a categoria define **como ele é medido** e **onde a variação aparece**: no resultado ou no patrimônio líquido. A classificação sai de dois testes.

## Os dois testes

1. **Os fluxos de caixa contratuais são somente pagamento de principal e juros (SPPI)?**
2. **Qual é o modelo de negócio:** manter para receber os fluxos, receber os fluxos e vender, ou outro?

| Categoria | Quando se aplica |
|---|---|
| **Custo amortizado** | SPPI e modelo de **manter para receber** os fluxos |
| **VJORA** (valor justo por outros resultados abrangentes) | SPPI e modelo de **receber os fluxos e vender** |
| **VJR** (valor justo por meio do resultado) | **Demais casos** |

## Balanço e resultado

| Categoria | Valor no balanço | O que vai para o resultado |
|---|---|---|
| Custo amortizado | Custo de aquisição + rendimentos | Rendimentos pela taxa de juros |
| VJR | Valor justo | Valor justo − custo de aquisição |
| VJORA | Valor justo | Só os rendimentos (juros); o ajuste a valor justo vai ao PL |

**Exemplo:** título comprado por 100.000, com juros de 10% ao ano, e valor justo de 108.000 no fim do ano.
- Custo amortizado: balanço 110.000; resultado 10.000.
- VJR: balanço 108.000; resultado 8.000.
- VJORA: balanço 108.000; resultado 10.000 (juros) e ajuste de −2.000 em ajustes de avaliação patrimonial, no PL.

> **Cai em prova:** o ajuste a valor justo de um título VJORA **não** passa pelo resultado; só os juros passam. Em VJR, tudo passa pelo resultado.
$md$,
 'Polícia Federal', 3, 'Material próprio, baseado no CPC 48 (Instrumentos Financeiros) e no Resumão de Contabilidade Geral (Gran Cursos Online, prof. Feliphe Araújo). Aguardando conferência do texto com o pronunciamento e inclusão da fonte oficial antes da publicação.', '[]'::jsonb,
 '[{"f": "Em que consiste o teste SPPI?", "b": "Verificar se os fluxos de caixa contratuais são somente pagamento de principal e juros sobre o principal em aberto."}, {"f": "Quando um ativo financeiro é mensurado ao custo amortizado?", "b": "Quando passa no SPPI e o modelo de negócio é manter para receber os fluxos de caixa contratuais."}, {"f": "Quando se classifica em VJORA?", "b": "Quando passa no SPPI e o modelo de negócio é receber os fluxos e também vender."}, {"f": "Onde vai o ajuste a valor justo de um ativo VJORA?", "b": "Para o patrimônio líquido (ajustes de avaliação patrimonial); só os juros vão ao resultado."}]'::jsonb,
 '[{"q": "Um ativo financeiro cujo modelo de negócio é manter para receber os fluxos e que passa no teste SPPI é medido ao custo amortizado.", "a": true, "why": "É o critério do CPC 48."}, {"q": "Os ajustes a valor justo dos ativos VJORA são reconhecidos no resultado do exercício.", "a": false, "why": "Vão para o patrimônio líquido; só os juros passam pelo resultado."}, {"q": "Os ativos VJR são apresentados no balanço pelo valor justo, e a variação passa pelo resultado.", "a": true, "why": "Em VJR, o ajuste a valor justo é reconhecido no resultado."}, {"q": "Os ativos que não passam no teste SPPI são classificados ao custo amortizado.", "a": false, "why": "Os que não passam no SPPI ficam no valor justo por meio do resultado."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  topic_label = excluded.topic_label, sort_order = excluded.sort_order,
  syllabus_topic_order = excluded.syllabus_topic_order,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
