-- Sexto lote da Biblioteca: Direito Administrativo (Lei 8.112).
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('servidores-lei-8112-posse-exercicio-vacancia-remocao', 'Direito Administrativo', 'Servidores públicos', 60, 'Lei nº 8.112/1990: posse, exercício, vacância, remoção e redistribuição', 'Prazos de posse e exercício, as hipóteses de exoneração e vacância, e a diferença entre remoção e redistribuição.', $md$## Posse e exercício

| Ato | Regra | Prazo |
|---|---|---|
| **Posse** (art. 13) | Dá-se pela **assinatura do termo**, com atribuições, deveres, responsabilidades e direitos do cargo, que **não podem ser alterados unilateralmente** | **30 dias**, contados da **publicação do ato de provimento** |
| **Exercício** (art. 15) | Efetivo desempenho das atribuições do cargo | **15 dias**, contados da **posse** |

Se o servidor tomar posse e **não entrar em exercício no prazo**, é **exonerado** (art. 15, § 2º).

## Vacância (art. 33)

A vacância do cargo decorre de: **exoneração**, **demissão**, **readaptação**, **aposentadoria**, **posse em outro cargo inacumulável** e **falecimento**. A promoção, que constava do rol, foi **revogada** pela Lei nº 9.527/1997.

### Exoneração

- **Cargo efetivo (art. 34):** **a pedido** ou **de ofício**. De ofício, quando **não satisfeitas as condições do estágio probatório** ou quando, tendo tomado posse, o servidor **não entrar em exercício** no prazo.
- **Cargo em comissão e função de confiança (art. 35):** **a juízo da autoridade competente**.
- **Exoneração não é sanção.** A **demissão** (art. 132) é **penalidade disciplinar**.

## Remoção e redistribuição (arts. 36 e 37)

| | **Remoção** | **Redistribuição** |
|---|---|---|
| **O que se desloca** | O **servidor** | O **cargo** (de provimento efetivo, ocupado ou vago) |
| **Onde** | No **mesmo quadro**, com ou sem mudança de sede | Para **outro órgão ou entidade do mesmo Poder** |
| **Modalidades** | **De ofício**, no interesse da Administração; **a pedido, a critério da Administração**; **a pedido, independentemente do interesse da Administração** (casos do art. 36, parágrafo único, III) | Exige **interesse da administração**, **equivalência de vencimentos** e **prévia apreciação do órgão central do SIPEC** |

Nem a remoção nem a redistribuição são forma de **provimento** ou de **vacância**.

## Reintegração (art. 28)

É a **reinvestidura do servidor estável** no cargo anterior (ou no resultante de sua transformação), quando **invalidada a demissão** por decisão administrativa ou judicial, **com ressarcimento de todas as vantagens**. Se o cargo foi extinto, o servidor fica em **disponibilidade**; se estiver provido, o ocupante é **reconduzido** ao cargo de origem, **sem direito a indenização**, ou aproveitado em outro cargo.

> **Atualização legislativa (conferida no Planalto):** o resumo de origem afirma que o **estágio probatório** dura **3 anos**. O **art. 20 da Lei nº 8.112/1990** ainda fala em **24 meses**, mas o texto compilado remete à **Emenda Constitucional nº 19/1998**, que alterou a Constituição (art. 41). Para a prova, siga o **prazo constitucional de 3 anos** para a estabilidade, mas saiba que **o número da lei é 24 meses**. A Constituição não foi conferida nesta parte; confirme o art. 41 antes de usar numa resposta discursiva. Conferi também que a **promoção** deixou de ser forma de vacância (Lei nº 9.527/1997).$md$, 'Polícia Federal', 1, 'Reescrito a partir do material de mapas mentais de Direito Administrativo (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido artigo por artigo com o texto da Lei nº 8.112/1990 no Planalto.', '[{"title": "Lei nº 8.112/1990 (Regime Jurídico dos Servidores Públicos Civis da União), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm"}]'::jsonb, '[{"f": "Prazos de posse e exercício (Lei 8.112)", "b": "Posse: 30 dias da publicação do ato de provimento. Exercício: 15 dias da posse."}, {"f": "Exoneração de ofício do cargo efetivo", "b": "Quando não satisfeitas as condições do estágio probatório, ou quando o servidor toma posse e não entra em exercício no prazo (art. 34)."}, {"f": "Remoção × redistribuição", "b": "Remoção desloca o servidor no mesmo quadro. Redistribuição desloca o cargo para outro órgão do mesmo Poder, com prévia apreciação do SIPEC."}, {"f": "A exoneração é sanção?", "b": "Não. A demissão é que é penalidade disciplinar (art. 132)."}, {"f": "Reintegração", "b": "Reinvestidura do servidor estável no cargo anterior quando invalidada a demissão, com ressarcimento de todas as vantagens (art. 28)."}]'::jsonb, '[{"q": "Segundo a Lei 8.112/1990, a posse deve ocorrer em até 30 dias contados da publicação do ato de provimento.", "a": true, "why": "Art. 13, § 1º."}, {"q": "A exoneração é uma penalidade disciplinar aplicada ao servidor.", "a": false, "why": "A penalidade é a demissão; a exoneração não é sanção."}, {"q": "A redistribuição é o deslocamento do servidor, a pedido ou de ofício, no âmbito do mesmo quadro.", "a": false, "why": "Isso é a remoção. A redistribuição desloca o cargo para outro órgão do mesmo Poder."}, {"q": "Tomando posse e não entrando em exercício no prazo legal, o servidor é exonerado.", "a": true, "why": "Art. 15, § 2º, e art. 34, parágrafo único, II."}]'::jsonb),
('servidores-lei-8112-pad-sindicancia-ritos-prescricao', 'Direito Administrativo', 'Servidores públicos', 70, 'Processo administrativo disciplinar: sindicância, ritos, prazos e prescrição', 'Quando cabe sindicância ou PAD, o rito ordinário e o sumário, os prazos de cada fase e a prescrição da ação disciplinar.', $md$## Dever de apurar (art. 143)

A autoridade que tiver **ciência de irregularidade** no serviço público é **obrigada** a promover a **apuração imediata**, por **sindicância** ou **processo administrativo disciplinar (PAD)**, **assegurada ampla defesa** ao acusado.

**Denúncia** (art. 144): só é apurada se tiver a **identificação e o endereço do denunciante** e for **formulada por escrito**. Por isso **não pode ser anônima**.

## Sindicância (art. 145)

Pode resultar em: **arquivamento**, **advertência ou suspensão de até 30 dias**, ou **instauração de PAD**. O prazo de conclusão é de **até 30 dias**, prorrogável por **igual período**, a critério da autoridade superior.

## Quando o PAD é obrigatório (art. 146)

Sempre que o ilícito ensejar **suspensão por mais de 30 dias**, **demissão**, **cassação de aposentadoria ou disponibilidade** ou **destituição de cargo em comissão**.

## PAD pelo rito ordinário

| Ponto | Regra |
|---|---|
| **Comissão** (art. 149) | **3 servidores estáveis**. O presidente deve ocupar cargo efetivo superior ou de mesmo nível, ou ter escolaridade igual ou superior à do indiciado. **Não pode** participar cônjuge, companheiro ou parente do acusado até o 3º grau |
| **Conclusão** (art. 152) | **60 dias** da publicação do ato que constitui a comissão, **prorrogáveis por igual prazo** |
| **Contraditório** (art. 153) | O **inquérito administrativo** obedece ao contraditório e à ampla defesa |
| **Defesa** (art. 161) | **10 dias** após citação do indiciado (**20 dias**, prazo comum, se houver dois ou mais indiciados). Pode ser prorrogada **pelo dobro** para diligências indispensáveis |
| **Julgamento** (art. 167) | **20 dias** contados do recebimento do processo |
| **Afastamento preventivo** (art. 147) | **Medida cautelar**, para o servidor não influir na apuração: **até 60 dias**, **sem prejuízo da remuneração** (prorrogável por igual prazo, nos termos do parágrafo único) |

## PAD pelo rito sumário (arts. 133, 138, 139 e 140)

Usado nos casos de **acumulação ilegal de cargos**, **abandono de cargo** e **inassiduidade habitual**.

- **Abandono de cargo:** ausência **intencional** por **mais de 30 dias consecutivos** (art. 138).
- **Inassiduidade habitual:** faltas **sem causa justificada** por **60 dias**, **interpoladamente**, em **12 meses** (art. 139).
- **Comissão:** **2 servidores estáveis**.
- **Fases:** instauração, **instrução sumária** (indiciação, defesa e relatório) e julgamento.
- **Prazos:** conclusão em **30 dias**, prorrogáveis por **até 15 dias** (art. 133, § 7º); julgamento em **5 dias** (art. 133, § 4º). Na acumulação, a defesa tem **5 dias**.

## Quadro de prazos (soma de conclusão e julgamento)

| Procedimento | Conclusão | Prorrogação | Julgamento | Total |
|---|---|---|---|---|
| Sindicância | 30 | 30 | 20 | **80 dias** |
| PAD, rito ordinário | 60 | 60 | 20 | **140 dias** |
| PAD, rito sumário | 30 | 15 | 5 | **50 dias** |

## Penalidade de demissão (art. 132)

Aplica-se em: crime contra a administração pública; abandono de cargo; inassiduidade habitual; improbidade administrativa; incontinência pública e conduta escandalosa; insubordinação grave; ofensa física em serviço; aplicação irregular de dinheiros públicos; revelação de segredo; lesão aos cofres públicos e dilapidação do patrimônio nacional; corrupção; acumulação ilegal de cargos; e transgressão dos incisos IX a XVI do art. 117.

## Prescrição da ação disciplinar (art. 142)

| Pena | Prazo |
|---|---|
| **Demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão** | **5 anos** |
| **Suspensão** | **2 anos** |
| **Advertência** | **180 dias** |

- O prazo **começa a correr** da data em que o **fato se tornou conhecido** (§ 1º).
- Para infração **também capitulada como crime**, valem os **prazos da lei penal** (§ 2º).
- A abertura de **sindicância** ou a instauração de **PAD** **interrompe** a prescrição **até a decisão final** (§ 3º), e o prazo **recomeça** do dia em que cessar a interrupção (§ 4º).

> **Atualização legislativa (conferida no Planalto):** o resumo de origem diz que a sindicância tem "comissão de 2 ou 3 servidores estáveis" e que a lei não traz fases para ela. Essa composição **não consta dos arts. 143 a 145**; a regra expressa de **3 servidores estáveis** é a do **PAD** (art. 149). O resumo também afirma que a prescrição "recomeça após o prazo da decisão final". O texto legal (art. 142, § 4º) diz apenas que o prazo recomeça **do dia em que cessar a interrupção**; a **contagem de 140 dias** (60 + 60 + 20) vem de **entendimento jurisprudencial** que **não foi conferido** aqui.$md$, 'Polícia Federal', 1, 'Reescrito a partir do material de mapas mentais de Direito Administrativo (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido artigo por artigo com o texto da Lei nº 8.112/1990 no Planalto.', '[{"title": "Lei nº 8.112/1990 (Regime Jurídico dos Servidores Públicos Civis da União), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm"}]'::jsonb, '[{"f": "Quando o PAD é obrigatório?", "b": "Quando o ilícito ensejar suspensão por mais de 30 dias, demissão, cassação de aposentadoria ou disponibilidade ou destituição de cargo em comissão (art. 146)."}, {"f": "Prazos do PAD rito ordinário", "b": "Conclusão em 60 dias, prorrogáveis por igual prazo, e julgamento em 20 dias (arts. 152 e 167)."}, {"f": "Hipóteses do rito sumário", "b": "Acumulação ilegal de cargos, abandono de cargo e inassiduidade habitual (arts. 133, 138 e 139)."}, {"f": "Prescrição da ação disciplinar", "b": "5 anos para demissão e penas expulsivas, 2 anos para suspensão e 180 dias para advertência (art. 142)."}, {"f": "Afastamento preventivo", "b": "Medida cautelar de até 60 dias, sem prejuízo da remuneração, para o servidor não influir na apuração (art. 147)."}]'::jsonb, '[{"q": "A denúncia anônima basta, por si só, para a instauração de PAD pela Lei 8.112/1990.", "a": false, "why": "O art. 144 exige identificação e endereço do denunciante e forma escrita."}, {"q": "Abandono de cargo é a ausência intencional por mais de trinta dias consecutivos.", "a": true, "why": "Art. 138."}, {"q": "Prescreve em 2 anos a ação disciplinar relativa à pena de advertência.", "a": false, "why": "A advertência prescreve em 180 dias; 2 anos é o prazo da suspensão (art. 142)."}, {"q": "O PAD pelo rito sumário é conduzido por comissão de três servidores estáveis.", "a": false, "why": "No rito sumário a comissão é composta por dois servidores estáveis (art. 133, I)."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
