-- Terceiro lote da Biblioteca: Direito Processual Civil.
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('processo-civil-tutela-provisoria', 'Direito Processual Civil', 'Tutela provisória', 10, 'Tutela provisória: urgência e evidência', 'Tutela antecipada e cautelar, requisitos, estabilização, prazos e as quatro hipóteses da tutela da evidência.', $md$## Ideia central

A **tutela provisória** pode se fundamentar em **urgência** ou em **evidência** (CPC, art. 294). A tutela de **urgência**, **cautelar** ou **antecipada**, pode ser pedida em caráter **antecedente** ou **incidental**.

| | Tutela antecipada | Tutela cautelar |
|---|---|---|
| **Natureza** | **Satisfativa**: antecipa os efeitos do pedido final | **Assecuratória**: conserva o direito até o julgamento |
| **Exemplos de efetivação** | Medidas adequadas, como no cumprimento provisório | Arresto, sequestro, arrolamento de bens, registro de protesto contra alienação (art. 301) |

## Requisitos da tutela de urgência (art. 300)

- **Probabilidade do direito** e **perigo de dano** ou **risco ao resultado útil do processo**.
- O juiz **pode** exigir **caução** (real ou fidejussória) para ressarcir danos à outra parte. É **facultativo**, e a caução pode ser **dispensada** se a parte hipossuficiente não puder oferecê-la (§ 1º).
- Pode ser concedida **liminarmente** ou após **justificação prévia** (§ 2º).
- A **antecipada não será concedida** se houver **perigo de irreversibilidade** dos efeitos da decisão (§ 3º).

## Tutela antecipada em caráter antecedente (arts. 303 e 304)

1. Quando a urgência é contemporânea à propositura, a petição inicial pode se limitar ao **pedido de tutela antecipada** e à **indicação do pedido final**.
2. **Concedida** a tutela, o autor **adita a inicial em 15 dias** (ou prazo maior fixado pelo juiz). O réu é citado para a **audiência de conciliação ou mediação**.
3. **Não aditada**, o processo é **extinto sem resolução do mérito**.
4. Se o juiz entender que **não há elementos** para conceder, determina a **emenda da inicial em até 5 dias**, sob pena de indeferimento e extinção sem resolução do mérito (art. 303, § 6º).

### Estabilização (art. 304)

- A tutela antecipada **se torna estável** se **não for interposto o respectivo recurso**; nesse caso o processo é **extinto**.
- Qualquer das partes pode **demandar a outra** para rever, reformar ou invalidar a tutela estabilizada.
- Esse direito **se extingue em 2 anos**, contados da **ciência da decisão que extinguiu o processo**.
- A decisão **não faz coisa julgada**: a **estabilidade dos efeitos** só cai por decisão proferida na ação de revisão.

## Tutela cautelar em caráter antecedente (arts. 305 a 310)

- O **réu é citado para contestar em 5 dias** (art. 306).
- **Efetivada** a tutela, o **pedido principal** deve ser formulado em **30 dias**, nos mesmos autos e sem novas custas (art. 308).
- **Cessa a eficácia** se o autor não formular o pedido principal no prazo, se a tutela não for efetivada em 30 dias, ou se o pedido principal for julgado improcedente ou o processo extinto sem mérito (art. 309).

## Tutela da evidência (art. 311)

Concedida **independentemente de perigo de dano** ou de risco ao resultado útil do processo, quando:

1. houver **abuso do direito de defesa** ou **manifesto propósito protelatório**;
2. as alegações de fato puderem ser **comprovadas apenas documentalmente** e houver **tese firmada em casos repetitivos** ou em **súmula vinculante**;
3. for **pedido reipersecutório** fundado em prova documental do **contrato de depósito** (ordem de entrega do objeto, sob multa);
4. a inicial for instruída com **prova documental suficiente** dos fatos constitutivos e o réu **não opuser prova capaz de gerar dúvida razoável**.

Nas hipóteses **II e III**, o juiz **pode decidir liminarmente** (parágrafo único).

> **Atualização legislativa (conferida no Planalto, CPC/2015):** o mapa mental de origem diz que a estabilização ocorre quando o "réu não impugna". O **texto da lei (art. 304)** fala em **não interposição do recurso**. Para a prova, siga o texto legal, salvo se o enunciado citar entendimento jurisprudencial. Os prazos de **15 dias** (aditamento), **5 dias** (emenda e contestação cautelar), **30 dias** (pedido principal) e **2 anos** (ação de revisão) foram conferidos nos arts. 303, 304, 306 e 308.$md$, 'Polícia Federal', 1, 'Reescrito a partir do mapa mental de Processo Civil da pasta Apostilas, com organização e destaques próprios, e conferido artigo por artigo com o texto do CPC (Lei nº 13.105/2015) no Planalto.', '[{"title": "Código de Processo Civil (Lei nº 13.105/2015)", "url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm"}]'::jsonb, '[{"f": "Tutela antecipada × cautelar", "b": "Antecipada é satisfativa (antecipa os efeitos do pedido). Cautelar é assecuratória (conserva o direito)."}, {"f": "Requisitos da tutela de urgência", "b": "Probabilidade do direito e perigo de dano ou risco ao resultado útil do processo (art. 300)."}, {"f": "Quando a antecipada não é concedida?", "b": "Quando houver perigo de irreversibilidade dos efeitos da decisão (art. 300, § 3º)."}, {"f": "Estabilização da tutela antecipada", "b": "Ocorre se da decisão não for interposto recurso (art. 304). Não faz coisa julgada; revisão em até 2 anos."}, {"f": "Tutela da evidência", "b": "Dispensa perigo de dano. Quatro hipóteses do art. 311; nos incisos II e III o juiz pode decidir liminarmente."}]'::jsonb, '[{"q": "A caução para a tutela de urgência é sempre obrigatória.", "a": false, "why": "O juiz pode exigi-la, e ela pode ser dispensada à parte hipossuficiente (art. 300, § 1º)."}, {"q": "A tutela antecipada estabilizada faz coisa julgada.", "a": false, "why": "Não faz coisa julgada; apenas estabilidade dos efeitos (art. 304, § 6º)."}, {"q": "Na tutela cautelar antecedente, efetivada a medida, o pedido principal deve ser formulado em 30 dias.", "a": true, "why": "É o prazo do art. 308."}, {"q": "A tutela da evidência exige a demonstração de perigo de dano.", "a": false, "why": "É concedida independentemente de perigo de dano ou risco ao resultado útil (art. 311)."}]'::jsonb),
('processo-civil-formacao-suspensao-extincao', 'Direito Processual Civil', 'Processo', 20, 'Formação, suspensão e extinção do processo', 'Quando a ação é proposta, os casos de suspensão e as hipóteses de extinção com e sem resolução do mérito.', $md$## Formação do processo (art. 312)

Considera-se **proposta a ação** quando a **petição inicial é protocolada**. Contra o **réu**, porém, os efeitos do art. 240 só se produzem **depois que ele for validamente citado**.

## Suspensão do processo (art. 313)

Suspende-se o processo:

1. pela **morte** ou **perda da capacidade processual** da parte, de seu representante legal ou de seu procurador;
2. pela **convenção das partes**;
3. pela **arguição de impedimento ou de suspeição**;
4. pela admissão de **incidente de resolução de demandas repetitivas (IRDR)**;
5. quando a sentença de mérito **depender do julgamento de outra causa** ou de declaração sobre relação jurídica que seja objeto de outro processo, ou tiver de ser proferida só após **fato ou prova** requisitada a outro juízo;
6. por **motivo de força maior**;
7. quando se discutir questão decorrente de **acidentes e fatos da navegação** de competência do **Tribunal Marítimo**;
8. nos **demais casos** que o Código regula;
9. pelo **parto ou adoção**, quando a **advogada** for a **única patrona** da causa;
10. quando o **advogado** for o **único patrono** e tornar-se **pai**.

## Extinção do processo (arts. 316 e 317)

- A extinção dá-se **por sentença**.
- **Antes** de decidir **sem resolução do mérito**, o juiz deve dar à parte **oportunidade para corrigir o vício**, se possível.

### Sem resolução do mérito (art. 485)

O juiz não resolve o mérito quando: indeferir a inicial; o processo ficar **parado mais de 1 ano** por negligência das partes; o autor **abandonar a causa por mais de 30 dias**; faltarem **pressupostos processuais**; houver **perempção, litispendência ou coisa julgada**; faltar **legitimidade ou interesse**; acolher **convenção de arbitragem**; **homologar a desistência**; a ação for **intransmissível** após a morte da parte; e nos demais casos do Código.

- Nos incisos **II e III** (parado e abandono), a parte é **intimada pessoalmente** para suprir a falta em **5 dias** (§ 1º).
- **Oferecida a contestação**, o autor **não pode desistir** sem o consentimento do réu (§ 4º), e a extinção **por abandono** depende de **requerimento do réu** (§ 6º). Isso corresponde à **Súmula 240 do STJ**.
- A desistência pode ser apresentada **até a sentença** (§ 5º).

### Com resolução do mérito (art. 487)

O juiz: **acolhe ou rejeita o pedido** (na ação ou na reconvenção); decide sobre **decadência ou prescrição**; **homologa** o reconhecimento da procedência do pedido, a **transação** ou a **renúncia** à pretensão.

> **Atualização legislativa (conferida no Planalto, CPC/2015):** o mapa de origem lista, como causa de suspensão, "dissolução de sociedade". **Isso não consta do art. 313**; o inciso VIII é uma cláusula geral ("demais casos que este Código regula"). Já os incisos **IX e X** (parto ou adoção da advogada e paternidade do advogado, únicos patronos da causa) foram **incluídos pela Lei nº 13.363/2016**. Além disso, o mapa diz que a sentença "não extingue o processo, apenas a fase de conhecimento": o **art. 316** estabelece que a **extinção do processo dá-se por sentença**.$md$, 'Polícia Federal', 1, 'Reescrito a partir do mapa mental de Processo Civil da pasta Apostilas, com organização e destaques próprios, e conferido artigo por artigo com o texto do CPC (Lei nº 13.105/2015) no Planalto.', '[{"title": "Código de Processo Civil (Lei nº 13.105/2015)", "url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm"}]'::jsonb, '[{"f": "Quando se considera proposta a ação?", "b": "Quando a petição inicial é protocolada (art. 312). Contra o réu, os efeitos do art. 240 dependem da citação válida."}, {"f": "Suspensão: casos de força maior e IRDR", "b": "Estão no art. 313: motivo de força maior (VI) e admissão de IRDR (IV)."}, {"f": "Lei 13.363/2016 e a suspensão", "b": "Incluiu os incisos IX e X do art. 313: parto ou adoção da advogada e paternidade do advogado, quando únicos patronos."}, {"f": "Antes de extinguir sem resolver o mérito", "b": "O juiz deve dar à parte oportunidade para corrigir o vício, se possível (art. 317)."}, {"f": "Abandono da causa pelo autor", "b": "Depende de requerimento do réu após a contestação (art. 485, § 6º; Súmula 240 do STJ). Intimação pessoal e 5 dias para suprir a falta."}]'::jsonb, '[{"q": "A dissolução de sociedade é causa de suspensão do processo prevista no art. 313.", "a": false, "why": "Não consta do art. 313; há apenas a cláusula geral do inciso VIII."}, {"q": "A homologação de transação extingue o processo com resolução do mérito.", "a": true, "why": "Está no art. 487, III, b."}, {"q": "Oferecida a contestação, o autor pode desistir da ação sem o consentimento do réu.", "a": false, "why": "Depois da contestação, a desistência depende do consentimento do réu (art. 485, § 4º)."}, {"q": "A homologação da desistência da ação é hipótese de extinção sem resolução do mérito.", "a": true, "why": "Art. 485, VIII."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
