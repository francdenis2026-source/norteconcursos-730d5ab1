-- Sétimo lote da Biblioteca: Direito Administrativo (atos, processo e controle).
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('administrativo-atos-administrativos-requisitos-atributos', 'Direito Administrativo', 'Atos administrativos', 80, 'Atos administrativos: requisitos, atributos, espécies e extinção', 'Competência, finalidade, forma, motivo e objeto; presunção de legitimidade e os demais atributos; licença × autorização; anulação, revogação e convalidação.', $md$## Requisitos (elementos) do ato

| Requisito | Ideia central |
|---|---|
| **Competência** | Poder legal para praticar o ato. Decorre **sempre de lei**, é **intransferível**, **imodificável pela vontade do agente**, **imprescritível** e **irrenunciável**, salvo autorização legal |
| **Finalidade** | **Sentido amplo**: interesse público. **Sentido estrito**: o fim legal específico. O defeito é o **desvio de finalidade** (exemplo clássico: remoção como forma de punição) |
| **Forma** | **Revestimento exteriorizador** do ato. A forma essencial, quando descumprida, **torna o ato nulo** |
| **Motivo** | **Pressuposto de fato e de direito** que autoriza ou exige a prática do ato |
| **Objeto** | O **efeito jurídico imediato** que o ato produz |

- **Teoria dos motivos determinantes:** os fatos que serviram de suporte à decisão **integram a validade do ato**; ele só é válido se os motivos enunciados **realmente existiram**.
- **Motivação** (art. 50 da Lei nº 9.784/1999): é a exposição dos **fatos** e dos **fundamentos jurídicos**. Pode ser **contextual** (no próprio ato) ou **aliunde** (em outro documento, como parecer ao qual se remete).

### Competência: delegação e avocação (Lei nº 9.784/1999)

- **Delegação** (arts. 12 a 14): possível mesmo a órgão **não subordinado**, **revogável a qualquer tempo**. **Não se delegam** atos normativos, decisão de recursos administrativos e competência exclusiva.
- **Avocação** (art. 15): **excepcional e temporária**, por motivos relevantes justificados, de competência de órgão **hierarquicamente inferior**.

### Vinculado × discricionário (doutrina)

Em todo ato, **competência, finalidade e forma** são **vinculadas**. A **discricionariedade** está em **motivo** e **objeto**, e forma o **mérito administrativo** (conveniência e oportunidade). O Judiciário controla **legalidade e legitimidade**; **não** controla o **mérito**. A própria Administração controla também o mérito.

## Atributos

| Atributo | Significado |
|---|---|
| **Presunção de legitimidade e veracidade** | O ato se presume conforme a lei (legitimidade) e os fatos alegados se presumem verdadeiros (veracidade). A presunção é **relativa** (*juris tantum*): cabe prova em contrário |
| **Imperatividade** | Impõe-se a terceiros **independentemente de sua vontade**. **Não há** nos atos que **outorgam direitos**, como permissão e autorização |
| **Autoexecutoriedade** | Executa-se **sem ordem judicial**, por meios diretos. Exige **previsão em lei** ou **situação de urgência** |
| **Exigibilidade** | Impele o destinatário à obediência por **meios indiretos** (multa, por exemplo) |
| **Tipicidade** | O ato deve corresponder a **figuras previamente definidas em lei** |

## Espécies mais cobradas

| Ato | Natureza | Ideia |
|---|---|---|
| **Licença** | **Vinculado** e **definitivo** | Direito do requerente que preenche os requisitos. Ex.: licença para construir |
| **Autorização** | **Discricionário** e **precário** | Interesse predominante do particular; sem direito subjetivo à obtenção. Ex.: porte de arma |
| **Permissão de uso de bem público** | **Discricionário** e **precário** | Uso privativo de bem público |
| **Permissão de serviço público** | **Contrato administrativo** (Lei nº 8.987/1995) | Não é ato administrativo unilateral |
| **Parecer vinculante** | **É** ato administrativo | O facultativo e o obrigatório são **opinativos**: a autoridade **não está vinculada** |
| **Atos punitivos** | Multa, interdição, destruição de coisa (externos) e sanções disciplinares (internos) | |

## Anulação, revogação e convalidação (Lei nº 9.784/1999, arts. 53 a 55)

- **Anulação** (art. 53): a Administração **deve** anular os atos com **vício de legalidade**.
- **Revogação** (art. 53): a Administração **pode** revogar por **conveniência ou oportunidade**, **respeitados os direitos adquiridos**.
- **Decadência** (art. 54): o direito de anular atos de que decorram **efeitos favoráveis** aos destinatários **decai em 5 anos**, contados da prática do ato, **salvo comprovada má-fé**. Nos efeitos patrimoniais contínuos, conta-se do **primeiro pagamento**.
- **Convalidação** (art. 55): atos com **defeitos sanáveis** podem ser convalidados pela própria Administração, se **não houver lesão ao interesse público nem prejuízo a terceiros**.
- **Motivação obrigatória** (art. 50) nos atos que, entre outros, neguem ou limitem direitos, imponham sanções, decidam recursos, dispensem licitação ou **importem anulação, revogação, suspensão ou convalidação** de ato.

> **Conferido no Planalto (Lei nº 9.784/1999, texto compilado):** os arts. 12 a 15, 50 e 53 a 55 foram conferidos. A classificação dos atos, as espécies e os atributos acima vêm do **resumo de doutrina** (Strauss e Leite) e **não são texto de lei**: ao responder a uma questão, cite-os como entendimento doutrinário.$md$, 'Polícia Federal', 1, 'Reescrito a partir do material de mapas mentais de Direito Administrativo (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido com o texto da Lei nº 9.784/1999 e da Constituição no Planalto. Os pontos de doutrina estão indicados como tal.', '[{"title": "Lei nº 9.784/1999 (Processo Administrativo Federal), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9784.htm"}, {"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb, '[{"f": "Requisitos do ato administrativo", "b": "Competência, finalidade, forma, motivo e objeto. Os três primeiros são sempre vinculados."}, {"f": "Teoria dos motivos determinantes", "b": "O ato só é válido se os motivos enunciados efetivamente ocorreram."}, {"f": "Licença × autorização", "b": "Licença é vinculada e definitiva (direito do requerente). Autorização é discricionária e precária (sem direito subjetivo)."}, {"f": "Decadência do direito de anular (Lei 9.784, art. 54)", "b": "5 anos da prática do ato, nos atos de efeito favorável, salvo má-fé. Efeitos patrimoniais contínuos: do primeiro pagamento."}, {"f": "Convalidação (art. 55)", "b": "Possível para defeitos sanáveis, se não houver lesão ao interesse público nem prejuízo a terceiros."}]'::jsonb, '[{"q": "A autoexecutoriedade do ato administrativo exige, em regra, ordem judicial prévia.", "a": false, "why": "Executa-se sem ordem judicial, mediante previsão em lei ou urgência."}, {"q": "A licença é ato discricionário e precário.", "a": false, "why": "A licença é vinculada e definitiva; discricionária e precária é a autorização."}, {"q": "O direito de a Administração anular atos de que decorram efeitos favoráveis decai em cinco anos, salvo comprovada má-fé.", "a": true, "why": "Art. 54 da Lei 9.784/1999."}, {"q": "O Poder Judiciário pode controlar o mérito do ato administrativo discricionário.", "a": false, "why": "O Judiciário controla legalidade e legitimidade, não o mérito."}]'::jsonb),
('administrativo-processo-administrativo-lei-9784', 'Direito Administrativo', 'Processo administrativo', 90, 'Processo administrativo federal (Lei nº 9.784/1999)', 'Âmbito, princípios, início, interessados, impedimento e suspeição, intimação, instrução, decisão, recursos e a decisão coordenada.', $md$## Âmbito (art. 1º e art. 69)

Regula o **processo administrativo na Administração Federal**, direta e indireta, e os **órgãos dos Poderes Legislativo e Judiciário da União** quando no desempenho de **função administrativa**. Os processos **específicos** (como o PAD da Lei nº 8.112/1990) regem-se por **lei própria**, e a Lei nº 9.784/1999 se aplica a eles **apenas subsidiariamente**.

## Princípios (art. 2º)

Legalidade, finalidade, **motivação**, razoabilidade, proporcionalidade, moralidade, **ampla defesa**, **contraditório**, segurança jurídica, interesse público e eficiência. Entre os critérios do parágrafo único: **proibição de cobrança de despesas processuais**, **impulsão de ofício** e **vedação de aplicação retroativa de nova interpretação** da norma administrativa.

## Início e interessados (arts. 5º a 10)

- O processo pode iniciar-se **de ofício** ou **a pedido** do interessado (art. 5º).
- O requerimento inicial é **por escrito**, salvo solicitação oral admitida (art. 6º). É **vedada a recusa imotivada** de recebimento de documentos (art. 6º, parágrafo único).
- **Legitimados** (art. 9º): quem inicia o processo, quem tem direitos ou interesses **afetados pela decisão**, **organizações e associações** (interesses coletivos) e pessoas ou associações quanto a **interesses difusos**.
- **Capacidade** (art. 10): **maiores de 18 anos**, salvo previsão especial.

## Impedimento e suspeição (arts. 18 a 21)

| | **Impedimento** (art. 18) | **Suspeição** (art. 20) |
|---|---|---|
| **Causas** | Interesse direto ou indireto; participação como **perito, testemunha ou representante**; **litígio** com o interessado ou cônjuge | **Amizade íntima** ou **inimizade notória** com interessado, cônjuge, companheiro ou parentes até o 3º grau |
| **Consequência** | O impedido deve **comunicar** e se abster. A **omissão** do dever de comunicar é **falta grave** (art. 19) | A suspeição **pode ser arguida** |

O indeferimento da alegação de suspeição cabe **recurso, sem efeito suspensivo** (art. 21).

## Forma, prazos e intimação (arts. 22 a 28)

- **Informalismo:** os atos não dependem de forma determinada, salvo quando a lei exigir (art. 22). Realizam-se em **dias úteis**, no horário de funcionamento (art. 23).
- **Prazo geral** dos atos: **5 dias**, **prorrogáveis até o dobro**, mediante justificação (art. 24).
- **Intimação** (art. 26): com antecedência mínima de **3 dias úteis**; por ciência no processo, **via postal com AR**, telegrama ou outro meio que assegure a ciência; para interessados indeterminados, **publicação oficial**. É **nula** a intimação irregular, mas o **comparecimento** do administrado **supre** a falta (§ 5º).
- O **desatendimento** da intimação **não importa reconhecimento da verdade dos fatos** nem renúncia a direito (art. 27).

## Instrução (arts. 29 a 47)

- É **inadmissível** a prova **obtida por meio ilícito** (art. 30).
- **Consulta pública** (art. 31) e **audiência pública** (art. 32) em matérias de interesse geral.
- **Ônus da prova** do interessado quanto aos fatos que alegou (art. 36), mas a Administração obtém **de ofício** documentos que estejam em seus arquivos (art. 37).
- **Provas recusáveis** (art. 38, § 2º), por decisão fundamentada: **ilícitas, impertinentes, desnecessárias ou protelatórias**.
- **Parecer obrigatório**: prazo máximo de **15 dias** (art. 42). Se for **vinculante** e não emitido, o processo **não segue**; se **não vinculante**, pode ser decidido sem ele.
- Encerrada a instrução, o interessado tem **10 dias** para se manifestar (art. 44). Em **risco iminente**, a Administração pode adotar **providências acauteladoras** sem ouvir o interessado (art. 45).

## Decisão (arts. 48 e 49)

A Administração tem o **dever de decidir** explicitamente. Concluída a instrução, o prazo é de **até 30 dias**, **prorrogável por igual período**, motivadamente.

## Recursos (arts. 56 a 65)

| Ponto | Regra |
|---|---|
| **Cabimento** | Cabe recurso **por razões de legalidade e de mérito** |
| **Reconsideração** | O recurso vai à autoridade que decidiu, que pode **reconsiderar em 5 dias**; se não, o **encaminha à superior** |
| **Caução** | **Independe de caução**, salvo exigência legal |
| **Instâncias** | **No máximo 3** instâncias administrativas |
| **Prazo para recorrer** | **10 dias** da ciência ou divulgação oficial |
| **Prazo para decidir** | **30 dias**, prorrogáveis por igual período |
| **Efeito** | **Em regra sem efeito suspensivo**; pode ser concedido em caso de justo receio de prejuízo de difícil reparação |
| **Não conhecimento** | Fora do prazo, órgão incompetente, ilegitimidade ou esfera administrativa exaurida. **Não impede** a revisão de ofício do ato ilegal |
| **Reformatio in pejus** | Se a decisão puder **agravar** a situação do recorrente, ele deve ser **cientificado** para se manifestar (art. 64, parágrafo único) |
| **Revisão** | Processos com **sanção** podem ser revistos **a qualquer tempo**, com fatos novos, e **sem agravamento** da sanção (art. 65) |

## Prazos (arts. 66 e 67)

Contam-se **excluindo o dia do começo e incluindo o do vencimento**. Prazos em dias são **contínuos**. Em regra os prazos processuais **não se suspendem**, salvo força maior comprovada.

## Prioridade (art. 69-A)

Têm prioridade os processos em que figure pessoa com **60 anos ou mais**, **pessoa com deficiência** e pessoa com **doença grave** listada na lei.

> **Atualização legislativa (conferida no Planalto):** a **Lei nº 14.210/2021** incluiu na Lei nº 9.784/1999 a **decisão coordenada** (arts. 49-A a 49-G), para decisões que exijam a participação de **3 ou mais setores, órgãos ou entidades**, quando for justificável pela relevância da matéria e houver discordância que prejudique a celeridade. **Não se aplica** a processos de **licitação**, ao **poder sancionador** ou com autoridades de **Poderes distintos** (art. 49-A, § 6º). A decisão coordenada **não exclui a responsabilidade originária** de cada órgão. Resumos anteriores a 2021 **não trazem** esse instituto.$md$, 'Polícia Federal', 1, 'Reescrito a partir do material de mapas mentais de Direito Administrativo (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido com o texto da Lei nº 9.784/1999 e da Constituição no Planalto. Os pontos de doutrina estão indicados como tal.', '[{"title": "Lei nº 9.784/1999 (Processo Administrativo Federal), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l9784.htm"}]'::jsonb, '[{"f": "Âmbito de aplicação da Lei 9.784/1999", "b": "Administração Federal direta e indireta, e órgãos do Legislativo e do Judiciário da União em função administrativa. Para processos específicos (como o PAD), aplica-se só subsidiariamente."}, {"f": "Prazo do recurso administrativo (Lei 9.784)", "b": "10 dias da ciência ou divulgação oficial da decisão; decisão em até 30 dias, prorrogáveis por igual período."}, {"f": "Efeito do recurso administrativo", "b": "Em regra, sem efeito suspensivo; pode ser concedido se houver justo receio de prejuízo de difícil ou incerta reparação."}, {"f": "Decisão coordenada (Lei 14.210/2021)", "b": "Para decisões que exijam participação de 3 ou mais setores, órgãos ou entidades, quando justificável e houver discordância que prejudique a celeridade; não vale para licitação nem poder sancionador."}, {"f": "Prova obtida por meio ilícito", "b": "É inadmissível no processo administrativo (art. 30)."}]'::jsonb, '[{"q": "O recurso administrativo tramita, em regra, por no máximo três instâncias.", "a": true, "why": "Art. 57 da Lei 9.784/1999."}, {"q": "A Lei 9.784/1999 se aplica a processos administrativos específicos, como o PAD, com prevalência sobre a lei própria.", "a": false, "why": "Aplica-se apenas subsidiariamente aos processos regidos por lei própria (art. 69)."}, {"q": "A Lei 14.210/2021 introduziu a decisão coordenada na Lei 9.784/1999.", "a": true, "why": "Arts. 49-A a 49-G."}, {"q": "A omissão do dever de comunicar o próprio impedimento é falta grave para efeitos disciplinares.", "a": true, "why": "Art. 19, parágrafo único."}]'::jsonb),
('administrativo-controle-da-administracao-publica', 'Direito Administrativo', 'Controle da Administração', 100, 'Controle da Administração Pública', 'Controle interno, externo e popular; controle prévio, concomitante e posterior; legalidade e mérito; e o que dizem os arts. 70, 71 e 74 da Constituição.', $md$## Conceito

Conjunto de instrumentos pelos quais a **própria Administração**, os Poderes **Judiciário** e **Legislativo** e o **povo** exercem **fiscalização, orientação e revisão** da atuação administrativa.

## Classificações

### Quanto à origem

| Tipo | Ideia | Exemplo |
|---|---|---|
| **Interno** | Dentro do **mesmo Poder**, por órgãos de sua estrutura | Controle interno dos três Poderes (CF, art. 74) |
| **Externo** | De **um Poder sobre outro**, ou da administração direta sobre a indireta | Fiscalização do **Congresso Nacional com auxílio do TCU** (CF, arts. 70 e 71) |
| **Popular** | Pela coletividade | **Ação popular** (CF, art. 5º, LXXIII) |

### Quanto ao momento

**Prévio** (preventivo, antes da conclusão do ato), **concomitante** (durante a realização) e **posterior** (corretivo, depois do ato, para desfazer, corrigir ou confirmar).

### Quanto ao aspecto controlado

- **Legalidade e legitimidade:** confronta o ato com a ordem jurídica. Resulta em **validade, anulação ou convalidação**.
- **Mérito:** conveniência e oportunidade. **Em regra, só o próprio Poder** que editou o ato (revogação). O **Judiciário nunca** controla o **mérito** de ato de outro Poder.

### Quanto à amplitude

- **Hierárquico:** dentro da mesma pessoa jurídica, **relação de subordinação**; é sempre interno.
- **Finalístico (tutela, supervisão ministerial):** da administração direta sobre a indireta, **relação de vinculação**; depende de **lei** que fixe meios e ocasiões.

### Quanto ao órgão

- **Administrativo:** pela própria Administração, por **autotutela**, de ofício ou provocada, sobre legalidade e mérito.
- **Legislativo:** político e financeiro. Meios: **CPI**, convocação de autoridades, pedidos de informação, fiscalização contábil, financeira e orçamentária e **sustação de atos normativos**.
- **Judiciário:** só **legalidade e legitimidade**, sobre atos de qualquer dos Poderes.

## O que a Constituição diz

- **Art. 70:** a fiscalização **contábil, financeira, orçamentária, operacional e patrimonial** da União e das entidades da administração direta e indireta, quanto à **legalidade, legitimidade, economicidade**, aplicação de subvenções e renúncia de receitas, é exercida pelo **Congresso Nacional** (controle externo) e pelo **sistema de controle interno de cada Poder**.
- **Art. 71:** o controle externo, a cargo do Congresso Nacional, é exercido **com o auxílio do Tribunal de Contas da União**.
- **Art. 74:** os Poderes Legislativo, Executivo e Judiciário **manterão, de forma integrada, sistema de controle interno**, com finalidades como avaliar o cumprimento das metas do plano plurianual e comprovar a legalidade e avaliar os resultados da gestão.
- **Art. 5º, LXXIII:** **qualquer cidadão** é parte legítima para propor **ação popular** contra ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural, ficando o autor, **salvo comprovada má-fé, isento de custas e de ônus da sucumbência**.

> **Conferido na Constituição (Planalto e Constituição anotada do STF):** os arts. 5º, LXXIII, 70, 71 e 74 foram conferidos. As **classificações** acima vêm de **doutrina** (resumo de Strauss e Leite) e **não são texto constitucional**. Meios do controle legislativo além dos previstos na Constituição não foram conferidos aqui.$md$, 'Polícia Federal', 1, 'Reescrito a partir do material de mapas mentais de Direito Administrativo (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido com o texto da Lei nº 9.784/1999 e da Constituição no Planalto. Os pontos de doutrina estão indicados como tal.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb, '[{"f": "Controle interno × externo", "b": "Interno: dentro do mesmo Poder. Externo: de um Poder sobre outro. O controle externo da União é do Congresso Nacional, com auxílio do TCU (CF, art. 71)."}, {"f": "Quem faz o controle de mérito?", "b": "Em regra o próprio Poder que editou o ato (revogação). O Judiciário não controla mérito de ato de outro Poder."}, {"f": "Ação popular", "b": "Qualquer cidadão pode propô-la contra ato lesivo ao patrimônio público, à moralidade, ao meio ambiente e ao patrimônio histórico-cultural; salvo má-fé, não paga custas nem sucumbência (CF, art. 5º, LXXIII)."}, {"f": "Controle hierárquico × finalístico", "b": "Hierárquico: subordinação dentro da mesma pessoa. Finalístico (tutela): vinculação entre administração direta e indireta, que depende de lei."}, {"f": "Controle interno (CF, art. 74)", "b": "Os três Poderes mantêm, de forma integrada, sistema de controle interno."}]'::jsonb, '[{"q": "O controle externo da Administração federal é exercido pelo Congresso Nacional com o auxílio do Tribunal de Contas da União.", "a": true, "why": "Art. 71 da Constituição."}, {"q": "O Poder Judiciário pode revogar atos administrativos por razões de conveniência e oportunidade.", "a": false, "why": "O Judiciário controla legalidade e legitimidade, nunca o mérito de ato de outro Poder."}, {"q": "O autor da ação popular, salvo comprovada má-fé, é isento de custas judiciais e do ônus da sucumbência.", "a": true, "why": "Art. 5º, LXXIII, da Constituição."}, {"q": "O controle finalístico dos entes da administração indireta independe de previsão legal.", "a": false, "why": "Depende de norma legal que estabeleça meios e ocasiões de controle."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
