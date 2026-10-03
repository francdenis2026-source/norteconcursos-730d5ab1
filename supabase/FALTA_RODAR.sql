-- Atualiza o texto de materiais de Contabilidade já publicados (não altera status nem datas).
begin;
update public.study_materials set body_md = $md$## Capital

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

> **Atualização legislativa (conferida no Planalto, texto compilado da Lei nº 6.404/1976):** a **Lei nº 11.638/2007** revogou as alíneas "c" e "d" do § 1º do art. 182, de modo que o **prêmio na emissão de debêntures** e as **doações e subvenções para investimento** deixaram de ser reservas de capital (hoje seguem o regime das reservas de lucros). Itens de prova ou resumos antigos que as listem como reservas de capital estão **desatualizados**. A reserva legal continua em **5% do lucro líquido, limitada a 20% do capital social** (art. 193), e pode ser dispensada quando ela somada às reservas de capital passar de **30%** do capital (art. 193, § 1º).$md$, legal_basis = '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb where slug = 'contabilidade-patrimonio-liquido-capital-reservas';
update public.study_materials set body_md = $md$## Exercício social

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

> **Conferido no Planalto (Lei nº 6.404, art. 176, § 6º, incluído pela Lei nº 11.638/2007):** a companhia fechada com patrimônio líquido, na data do balanço, **inferior a R$ 2.000.000,00** **não é obrigada** a elaborar e publicar a demonstração dos fluxos de caixa. Ou seja, **a partir de R$ 2 milhões** a DFC é exigida.$md$, legal_basis = '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb where slug = 'contabilidade-demonstracoes-contabeis-lei-6404';
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

> **Cai em prova:** a Constituição **veda a cassação** dos direitos políticos. Só existem perda e suspensão, nas hipóteses do art. 15.

> **Atualização legislativa (conferida na Constituição anotada do STF):** a **EC nº 97/2017** deu nova redação ao art. 17, § 1º: os partidos têm autonomia para adotar o regime de suas coligações **nas eleições majoritárias**, sendo **vedada a coligação nas eleições proporcionais**. Foram conferidos o art. 14, § 3º, VI (idades de 35, 30, 21 e 18 anos), o art. 14, § 4º (inelegíveis: inalistáveis e analfabetos) e as cinco hipóteses do art. 15 (naturalização cancelada, incapacidade civil absoluta, condenação criminal transitada, recusa de obrigação a todos imposta e improbidade administrativa).$md$, 'Polícia Federal', 1, 'Reescrito a partir dos mapas mentais da pasta Apostilas (100 mapas mentais gratuitos), com organização, exemplos e destaques de prova próprios. Aguardando conferência com a Constituição e as leis citadas.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb, '[{"f": "Plebiscito × referendo", "b": "Plebiscito é anterior ao ato (aprovar ou denegar); referendo é posterior (ratificar ou rejeitar)."}, {"f": "Idade mínima: Presidente, Vice e Senador", "b": "35 anos."}, {"f": "Idade mínima: Governador e Vice", "b": "30 anos."}, {"f": "Idade mínima: Deputado, Prefeito e Juiz de paz", "b": "21 anos. Vereador: 18 anos."}, {"f": "Cassação de direitos políticos", "b": "É vedada. Só há perda ou suspensão, nas hipóteses do art. 15 da Constituição."}]'::jsonb, '[{"q": "O voto é facultativo para os maiores de 70 anos.", "a": true, "why": "Também é facultativo para analfabetos e para maiores de 16 e menores de 18 anos."}, {"q": "A Constituição admite a cassação de direitos políticos em caso de improbidade administrativa.", "a": false, "why": "A cassação é vedada; a improbidade pode gerar suspensão, nos casos do art. 15."}, {"q": "A idade mínima para ser Senador é de 35 anos.", "a": true, "why": "Presidente, Vice-Presidente e Senador exigem 35 anos."}]'::jsonb),
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

> **Atualização legislativa (conferida no Planalto):** a ação punitiva da Administração Pública Federal **prescreve em 5 anos**, contados da prática do ato (ou do fim da infração permanente ou continuada). Incide a **prescrição intercorrente** quando o procedimento fica **paralisado por mais de 3 anos**, pendente de julgamento ou despacho (art. 1º, § 1º). A **Lei nº 11.941/2009** incluiu a interrupção pela **notificação** e pela **tentativa de conciliação** interna e criou a prescrição de **5 anos para a execução da multa** (art. 1º-A). A lei **não se aplica** a infrações de **natureza funcional** nem a procedimentos **tributários** (art. 5º).

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
