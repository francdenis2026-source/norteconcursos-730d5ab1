-- Quarto lote da Biblioteca: Direito Administrativo (improbidade e responsabilidade civil).
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('administrativo-improbidade-lei-8429-reforma-14230', 'Direito Administrativo', 'Improbidade administrativa', 30, 'Improbidade administrativa após a Lei nº 14.230/2021', 'Só há improbidade dolosa, as três espécies de ato, as sanções e prazos atuais e o que a reforma mudou em relação aos resumos antigos.', $md$## Base constitucional

A Constituição (art. 37, § 4º) prevê que os atos de improbidade importarão **suspensão dos direitos políticos**, **perda da função pública**, **indisponibilidade dos bens** e **ressarcimento ao erário**, **na forma e gradação previstas em lei**, **sem prejuízo da ação penal cabível**. A lei é a **Lei nº 8.429/1992**, **muito alterada pela Lei nº 14.230/2021**.

> **Atualização legislativa (conferida no Planalto, texto compilado da Lei nº 8.429/1992):** o resumo de origem deste material é **anterior à Lei nº 14.230/2021** e traz regras que **não valem mais**. Abaixo, tudo foi refeito com o texto vigente. Quadro das principais mudanças:

| Tema | Resumo antigo | **Texto vigente** |
|---|---|---|
| Dolo e culpa | Prejuízo ao erário admitia ação ou omissão **dolosa ou culposa** | Só **condutas dolosas**. Dolo é a **vontade livre e consciente** de alcançar o resultado ilícito; **não basta a voluntariedade** (art. 1º, §§ 1º e 2º) |
| Suspensão dos direitos políticos | 8 a 10 anos (art. 9º), 5 a 8 (art. 10), 3 a 5 (art. 11) | **Até 14 anos** (art. 9º), **até 12 anos** (art. 10) e **não há** suspensão no art. 11 (art. 12) |
| Proibição de contratar | 10, 5 e 3 anos | **Até 14, 12 e 4 anos** |
| Multa civil | Até 3x o acréscimo (art. 9º), até 2x o dano (art. 10) e até 100x a remuneração (art. 11) | **Valor do acréscimo** (art. 9º), **valor do dano** (art. 10) e **até 24x a remuneração** (art. 11) |
| Prescrição | 5 anos após o fim do mandato ou função | **8 anos** contados do fato (art. 23) |
| Quem propõe a ação | Ministério Público e pessoa jurídica interessada | O texto atual do art. 17 diz que a ação **será proposta pelo Ministério Público**. O texto compilado remete à **ADI 7042 e ADI 7043** (STF): confirme o entendimento do STF antes de usar numa resposta discursiva |
| Acordo | Vedada transação, acordo ou conciliação | **Acordo de não persecução civil** pelo Ministério Público (art. 17-B) |

## As três espécies de ato (arts. 9º, 10 e 11)

| Espécie | Ideia central |
|---|---|
| **Enriquecimento ilícito** (art. 9º) | Auferir, mediante ato **doloso**, **vantagem patrimonial indevida** em razão do cargo, mandato, função, emprego ou atividade |
| **Lesão ao erário** (art. 10) | Ação ou omissão **dolosa** que enseje, **efetiva e comprovadamente**, perda patrimonial, desvio, apropriação, malbaratamento ou dilapidação |
| **Violação de princípios** (art. 11) | Ação ou omissão **dolosa** que viole os deveres de **honestidade, imparcialidade e legalidade**, caracterizada por **uma das condutas** listadas no artigo |

Também vale o seguinte (art. 1º): o **mero exercício da função**, sem comprovação de ato doloso com fim ilícito, **afasta a improbidade** (§ 3º), e aplicam-se ao sistema os **princípios do direito administrativo sancionador** (§ 4º).

## Sanções (art. 12), aplicáveis isolada ou cumulativamente

- **Art. 9º:** perda dos bens acrescidos ilicitamente, perda da função pública, suspensão dos direitos políticos **até 14 anos**, multa **igual ao acréscimo patrimonial** e proibição de contratar ou receber benefícios fiscais ou creditícios por **até 14 anos**.
- **Art. 10:** perda dos bens acrescidos (se houver), perda da função, suspensão dos direitos políticos **até 12 anos**, multa **igual ao valor do dano** e proibição de contratar por **até 12 anos**.
- **Art. 11:** multa de **até 24 vezes a remuneração** do agente e proibição de contratar por **até 4 anos**.

A **perda da função pública** e a **suspensão dos direitos políticos** só se efetivam com o **trânsito em julgado** (art. 20). O juiz pode **afastar o agente** do cargo, **sem prejuízo da remuneração**, quando necessário à instrução ou para evitar novos ilícitos, por **até 90 dias, prorrogáveis uma vez** (art. 20, §§ 1º e 2º).

## Prescrição e investigação (art. 23)

- A ação prescreve em **8 anos**, contados do fato ou, nas infrações permanentes, do dia em que cessou a permanência.
- A instauração de **inquérito civil** ou de processo administrativo **suspende** o prazo por **no máximo 180 dias**.
- O **inquérito civil** deve ser concluído em **365 dias**, prorrogáveis **uma única vez** por igual período.
- O **ressarcimento ao erário** tem tratamento próprio na Constituição (art. 37, § 5º), que ressalva as ações de ressarcimento da regra de prescrição da lei.

> **Cai em prova:** questões antigas que digam que a improbidade por prejuízo ao erário admite **culpa** estão **desatualizadas**. Hoje **só há ato de improbidade doloso**.$md$, 'Polícia Federal', 1, 'Reescrito a partir do material de mapas mentais de Direito Administrativo (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido com o texto atual da Constituição e da Lei nº 8.429/1992 no Planalto.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}, {"title": "Lei nº 8.429/1992 (Lei de Improbidade Administrativa), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"}]'::jsonb, '[{"f": "Improbidade culposa após a Lei 14.230/2021", "b": "Não existe mais. Os atos de improbidade são apenas condutas dolosas (art. 1º, § 1º)."}, {"f": "O que é dolo para a Lei de Improbidade?", "b": "Vontade livre e consciente de alcançar o resultado ilícito tipificado; não basta a voluntariedade do agente (art. 1º, § 2º)."}, {"f": "Prazo prescricional da ação de improbidade", "b": "8 anos, contados da ocorrência do fato (art. 23). O inquérito civil suspende o prazo por no máximo 180 dias."}, {"f": "Multa civil do art. 11", "b": "Até 24 vezes o valor da remuneração do agente; proibição de contratar por até 4 anos (art. 12, III)."}, {"f": "Acordo na improbidade", "b": "O Ministério Público pode celebrar acordo de não persecução civil, com ressarcimento integral e reversão da vantagem indevida (art. 17-B)."}]'::jsonb, '[{"q": "Segundo a Lei 8.429/1992 atual, o ato que causa lesão ao erário pode ser praticado de forma culposa.", "a": false, "why": "Após a Lei 14.230/2021, só há improbidade por conduta dolosa."}, {"q": "A perda da função pública só se efetiva com o trânsito em julgado da sentença condenatória.", "a": true, "why": "Regra do art. 20, mantida pela reforma."}, {"q": "A suspensão dos direitos políticos de oito a dez anos é a sanção do ato de enriquecimento ilícito na lei vigente.", "a": false, "why": "A lei vigente prevê suspensão por até 14 anos para o art. 9º."}, {"q": "A Lei de Improbidade em vigor proíbe qualquer acordo de não persecução civil.", "a": false, "why": "O art. 17-B prevê o acordo de não persecução civil, a ser celebrado pelo Ministério Público."}]'::jsonb),
('administrativo-responsabilidade-civil-do-estado', 'Direito Administrativo', 'Responsabilidade civil', 40, 'Responsabilidade civil do Estado', 'Quem responde, por quê, a conduta comissiva e a omissiva, a ação regressiva e os atos legislativos e judiciais.', $md$## Base constitucional (art. 37, § 6º)

> *As pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa.*

O texto constitucional **não usa a palavra "objetiva"**; a responsabilidade **sem necessidade de provar culpa** do Estado é a leitura da **doutrina e da jurisprudência** (teoria do **risco administrativo**).

## Quem responde

| Responde na forma do art. 37, § 6º | Observação |
|---|---|
| Administração **direta**, autarquias e fundações públicas | Pessoas jurídicas de **direito público** |
| Empresas públicas, sociedades de economia mista e fundações **prestadoras de serviço público** | Direito privado, mas **prestadoras de serviço público** |
| **Concessionárias, permissionárias e autorizadas** de serviço público | Delegatárias |

Estatais **exploradoras de atividade econômica** ficam **fora** dessa regra: seguem o regime do direito privado (civil ou comercial).

A responsabilidade das prestadoras de serviço público abrange os danos aos **usuários** e também a **terceiros não usuários** (entendimento consolidado pelo STF). O agente deve estar **exercendo a função** ou agir **nessa qualidade**.

## Conduta comissiva × omissiva

| | Conduta **comissiva** (ação) | Conduta **omissiva** |
|---|---|---|
| **Teoria** | **Risco administrativo** | **Culpa administrativa** (culpa anônima, falta do serviço) |
| **Natureza** | Objetiva | Em regra **subjetiva**: é preciso demonstrar a **falta do serviço** |
| **Prova** | Dano, conduta e nexo causal | Também a omissão culposa |

**Excludentes** de responsabilidade (ou atenuantes, conforme o caso): **culpa exclusiva da vítima**, **fato exclusivo de terceiro** e **força maior**.

## Atos legislativos e judiciais

- **Legislativos:** em regra **não geram** responsabilidade; as exceções clássicas são **lei inconstitucional** e **lei de efeitos concretos**.
- **Judiciais:** regra geral de **irresponsabilidade**, mas o Estado **indeniza o condenado por erro judiciário** e quem **ficar preso além do tempo fixado na sentença** (CF, art. 5º, LXXV).

## Ação de reparação e ação regressiva

- A vítima pode obter **acordo administrativo** ou ajuizar ação **contra a pessoa jurídica** (e não direto contra o agente, entendimento do STF no mapa de origem).
- O Estado, depois de indenizar, move **ação regressiva** contra o agente, **desde que** haja **condenação prévia** do Estado e **dolo ou culpa** do agente (CF, art. 37, § 6º, parte final).
- Para o **prazo prescricional** da ação de reparação contra a Fazenda, o resumo de origem cita **5 anos** (Decreto nº 20.910/1932 e Lei nº 9.494/1997, art. 1º-C). Esses diplomas e o entendimento do STJ **não foram conferidos** aqui.

> **Conferido na Constituição (Planalto e Constituição anotada do STF):** o art. 37, § 6º e o art. 5º, LXXV foram conferidos com o texto atual. O reconhecimento da responsabilidade **objetiva**, a distinção entre ação e omissão e as teses sobre **terceiros não usuários** vêm de **doutrina e de jurisprudência** do STF, não do texto constitucional: ao responder, cite-as como entendimento, e não como dispositivo.$md$, 'Polícia Federal', 1, 'Reescrito a partir do material de mapas mentais de Direito Administrativo (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido com o texto atual da Constituição e da Lei nº 8.429/1992 no Planalto.', '[{"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb, '[{"f": "Texto do art. 37, § 6º da CF", "b": "Pessoas jurídicas de direito público e privadas prestadoras de serviço público respondem pelos danos que seus agentes, nessa qualidade, causarem a terceiros, com direito de regresso contra o responsável nos casos de dolo ou culpa."}, {"f": "Conduta comissiva × omissiva", "b": "Comissiva: risco administrativo (responsabilidade objetiva). Omissiva: em regra culpa administrativa, com prova da falta do serviço."}, {"f": "Estatais que ficam fora do art. 37, § 6º", "b": "As exploradoras de atividade econômica, regidas pelo direito privado."}, {"f": "Requisitos da ação regressiva", "b": "Condenação prévia do Estado a indenizar e dolo ou culpa do agente."}, {"f": "Responsabilidade por atos judiciais", "b": "Em regra irresponsabilidade, mas o Estado indeniza o erro judiciário e a prisão além do tempo fixado na sentença (CF, art. 5º, LXXV)."}]'::jsonb, '[{"q": "O art. 37, § 6º da CF afirma expressamente que a responsabilidade do Estado é objetiva.", "a": false, "why": "O texto não usa a palavra objetiva; essa leitura é de doutrina e jurisprudência."}, {"q": "A ação regressiva exige dolo ou culpa do agente público.", "a": true, "why": "É o que diz a parte final do art. 37, § 6º."}, {"q": "Empresa pública exploradora de atividade econômica responde na forma do art. 37, § 6º.", "a": false, "why": "Ficam fora da regra as exploradoras de atividade econômica."}, {"q": "O Estado indeniza quem ficar preso além do tempo fixado na sentença.", "a": true, "why": "Art. 5º, LXXV, da Constituição."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
