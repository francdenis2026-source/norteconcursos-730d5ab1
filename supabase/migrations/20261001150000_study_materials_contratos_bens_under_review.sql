-- Oitavo lote da Biblioteca: Direito Administrativo (contratos e bens públicos).
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('administrativo-contratos-administrativos-lei-14133', 'Direito Administrativo', 'Licitações e contratos', 110, 'Contratos administrativos: prerrogativas, alteração, extinção e sanções (Lei nº 14.133/2021)', 'Prerrogativas da Administração, garantia, alteração unilateral, equilíbrio econômico-financeiro, extinção e as quatro sanções.', $md$## Prerrogativas da Administração (art. 104)

O regime dos contratos confere à Administração as prerrogativas de:

1. **modificar** o contrato **unilateralmente**, respeitados os direitos do contratado;
2. **extingui-lo** unilateralmente, nos casos da lei;
3. **fiscalizar** a execução;
4. **aplicar sanções** motivadas pela inexecução total ou parcial;
5. **ocupar provisoriamente** bens móveis e imóveis e utilizar pessoal e serviços vinculados ao objeto, em caso de **risco à prestação de serviços essenciais** ou para **acautelar a apuração de faltas contratuais**, inclusive após a extinção do contrato.

As **cláusulas econômico-financeiras e monetárias** **não podem ser alteradas** sem **prévia concordância do contratado** (§ 1º). Na alteração unilateral, elas **devem ser revistas** para manter o **equilíbrio contratual** (§ 2º).

## Garantia (arts. 96 a 99)

- **A critério da autoridade**, e **mediante previsão no edital**, pode ser exigida nas contratações de obras, serviços e fornecimentos.
- **O contratado escolhe** a modalidade: **caução** (dinheiro ou títulos da dívida pública escriturais), **seguro-garantia**, **fiança bancária** ou **título de capitalização** custeado por pagamento único (art. 96, § 1º).
- **Limite:** até **5%** do valor inicial, com possibilidade de **até 10%**, desde que justificada pela **complexidade técnica e pelos riscos** (art. 98).
- **Obras e serviços de engenharia de grande vulto:** pode ser exigido **seguro-garantia com cláusula de retomada**, em até **30%** do valor inicial (art. 99).

## Alteração do contrato (arts. 124 a 126)

| Tipo | Quando |
|---|---|
| **Unilateral** (art. 124, I) | Modificação do **projeto ou das especificações**, para melhor adequação técnica; ou **acréscimo ou diminuição quantitativa** do objeto, nos limites legais |
| **Por acordo** (art. 124, II) | Substituição da garantia, mudança do regime de execução, mudança da forma de pagamento e **restabelecimento do equilíbrio econômico-financeiro** |

- **Limite:** o contratado é obrigado a aceitar acréscimos ou supressões de até **25%** do valor inicial atualizado; na **reforma de edifício ou de equipamento**, o limite para **acréscimos** é de **50%** (art. 125).
- As alterações unilaterais **não podem transfigurar o objeto** da contratação (art. 126).

### Equilíbrio econômico-financeiro (art. 124, II, "d")

Admite-se acordo para **restabelecer o equilíbrio inicial** em caso de **força maior, caso fortuito, fato do príncipe** ou fatos **imprevisíveis** (ou previsíveis de consequências incalculáveis) que inviabilizem a execução, **respeitada a repartição objetiva de risco** prevista no contrato.

*Doutrina (resumo de origem):* a **álea ordinária** (risco empresarial) é suportada pelo contratado; a **álea extraordinária**, administrativa (alteração unilateral, **fato do príncipe**, **fato da administração**) ou econômica (**teoria da imprevisão**), dá direito ao restabelecimento do equilíbrio.

## Extinção (arts. 137 e 138)

A extinção deve ser **formalmente motivada**, com **contraditório e ampla defesa**. Entre os motivos: descumprimento de cláusulas, prazos ou projetos; desatendimento de determinações da fiscalização; alteração social da empresa que restrinja sua capacidade; **falência, insolvência ou falecimento**; **caso fortuito ou força maior**; **interesse público** justificado pela autoridade máxima; e descumprimento das cotas de **pessoas com deficiência, reabilitados ou aprendizes**.

**O contratado tem direito à extinção** quando houver: supressão além do limite do art. 125; **suspensão por ordem da Administração por mais de 3 meses**; suspensões repetidas que somem **90 dias úteis**; **atraso superior a 2 meses** nos pagamentos; ou **não liberação** de área, local ou objeto nos prazos contratuais.

A extinção pode ser **unilateral** (exceto se o descumprimento decorrer de conduta da própria Administração), **consensual** (acordo, conciliação, mediação ou comitê de resolução de disputas) ou por **decisão arbitral ou judicial** (art. 138).

## Sanções (arts. 156 a 158)

| Sanção | Regra |
|---|---|
| **Advertência** | Só para a infração do art. 155, I, quando não justificar penalidade mais grave |
| **Multa** | De **0,5% a 30%** do valor do contrato. Defesa em **15 dias úteis** (art. 157) |
| **Impedimento de licitar e contratar** | Até **3 anos**, na Administração direta e indireta **do ente que aplicou** |
| **Declaração de inidoneidade** | De **3 a 6 anos**, na Administração de **todos os entes federativos**. **Competência exclusiva** de ministro de Estado, secretário estadual ou municipal, ou da autoridade máxima de autarquia ou fundação, **precedida de análise jurídica** |

As sanções de advertência, impedimento e inidoneidade podem ser **cumuladas com multa**. Para impedimento e inidoneidade, exige-se **processo de responsabilização**, conduzido por **comissão de 2 ou mais servidores estáveis**, com defesa em **15 dias úteis** (art. 158).

> **Atualização legislativa (conferida no Planalto):** o resumo de origem segue a **Lei nº 8.666/1993** e traz regras **diferentes** das atuais. **Suspensão temporária de até 2 anos** virou **impedimento de licitar e contratar por até 3 anos**; **declaração de inidoneidade por mínimo de 2 anos** agora é de **3 a 6 anos**; o **limite de 5% de garantia** continua, com **teto de 10%** justificado; o **atraso de pagamento** que dá ao contratado direito à extinção passou de **90 dias** para **mais de 2 meses**; e **título de capitalização** é nova modalidade de garantia. A **rescisão** da lei antiga passou a se chamar **extinção**. A competência exclusiva para a inidoneidade foi mantida e estendida a autarquias e fundações.$md$, 'Polícia Federal', 1, 'Elaborado a partir do texto da Lei nº 14.133/2021 no Planalto (arts. 96 a 99, 104, 124 a 126, 137, 138 e 155 a 158), com comparação com o resumo de contratos da pasta Apostilas, que segue a Lei nº 8.666/1993. Pontos de doutrina indicados como tal.', '[{"title": "Lei nº 14.133/2021 (Nova Lei de Licitações e Contratos Administrativos)", "url": "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm"}]'::jsonb, '[{"f": "Limite da garantia contratual (Lei 14.133)", "b": "Até 5% do valor inicial, podendo chegar a 10% se justificado pela complexidade e riscos. Em obras de engenharia de grande vulto, seguro-garantia com retomada de até 30%."}, {"f": "Limites das alterações unilaterais", "b": "Acréscimos ou supressões de até 25% do valor inicial atualizado; na reforma de edifício ou equipamento, acréscimos de até 50% (art. 125)."}, {"f": "Impedimento de licitar × inidoneidade", "b": "Impedimento: até 3 anos, no ente que aplicou. Inidoneidade: de 3 a 6 anos, em todos os entes federativos, com competência exclusiva de ministro ou secretário."}, {"f": "Direito do contratado à extinção", "b": "Suspensão por ordem da Administração por mais de 3 meses, atraso superior a 2 meses nos pagamentos, ou supressão acima do limite do art. 125, entre outros."}, {"f": "Multa na Lei 14.133", "b": "De 0,5% a 30% do valor do contrato; defesa em 15 dias úteis (arts. 156, § 3º, e 157)."}]'::jsonb, '[{"q": "Na Lei 14.133/2021, a declaração de inidoneidade tem prazo mínimo de dois anos.", "a": false, "why": "O prazo é de no mínimo 3 e no máximo 6 anos (art. 156, § 5º)."}, {"q": "As cláusulas econômico-financeiras do contrato não podem ser alteradas sem a prévia concordância do contratado.", "a": true, "why": "Art. 104, § 1º."}, {"q": "O contratado só pode pedir a extinção do contrato pela via judicial, sem nenhuma hipótese de extinção por direito próprio.", "a": false, "why": "O art. 137, § 2º, prevê hipóteses de direito do contratado à extinção, como suspensão por mais de 3 meses."}, {"q": "A garantia pode, em regra, chegar a 10% do valor do contrato, desde que justificada pela complexidade técnica e pelos riscos.", "a": true, "why": "Art. 98."}]'::jsonb),
('administrativo-bens-publicos-classificacao-uso', 'Direito Administrativo', 'Bens públicos', 120, 'Bens públicos: classificação, regime e uso privativo', 'O que é bem público, as três categorias do Código Civil, inalienabilidade, usucapião e as formas de uso privativo.', $md$## Conceito (Código Civil, art. 98)

**Públicos** são os bens do **domínio nacional** pertencentes às **pessoas jurídicas de direito público interno**; **todos os outros são particulares**, seja qual for a pessoa a que pertençam.

## Categorias (art. 99)

| Categoria | Exemplos | Regime |
|---|---|---|
| **Uso comum do povo** | Rios, mares, estradas, ruas e praças | **Inalienáveis** enquanto conservarem a qualificação (art. 100) |
| **Uso especial** | Edifícios ou terrenos destinados a **serviço ou estabelecimento** da administração, inclusive de autarquias | **Inalienáveis** enquanto conservarem a qualificação (art. 100) |
| **Dominicais** | Patrimônio das pessoas jurídicas de direito público, como objeto de direito pessoal ou real | **Podem ser alienados**, observadas as exigências da lei (art. 101) |

- **Sem lei em contrário, são dominicais** os bens de pessoas jurídicas de direito público com **estrutura de direito privado** (art. 99, parágrafo único).
- **Os bens públicos não estão sujeitos a usucapião** (art. 102).
- O **uso comum** pode ser **gratuito ou retribuído**, conforme a lei da entidade (art. 103).

## Bens da União (Constituição, art. 20)

São bens da União, entre outros, os que **atualmente lhe pertencem** ou **vierem a ser atribuídos** (inciso I), as **terras devolutas indispensáveis** à defesa das fronteiras, de fortificações e construções militares, de vias federais de comunicação e à preservação ambiental, **definidas em lei** (inciso II), e os **lagos, rios e correntes de água** em terrenos de seu domínio, ou que **banhem mais de um Estado**, sirvam de limite com outros países ou se estendam a território estrangeiro, além dos terrenos marginais e praias fluviais (inciso III).

## Uso privativo de bem público (doutrina)

| Instrumento | Natureza | Pontos centrais |
|---|---|---|
| **Autorização de uso** | Ato **discricionário, unilateral e precário** | Predomina o interesse do particular. **Sem licitação** prévia. Ex.: fechar uma rua para festa popular |
| **Permissão de uso** | Ato **discricionário, unilateral e precário** | Interesses do particular **e** da coletividade. **Em regra, com licitação**. Ex.: banca de revista |
| **Concessão de uso** | **Contrato administrativo** | **Prazo determinado**, sem precariedade, com autorização legislativa e/ou licitação. **Direito pessoal**. Ex.: lanchonete em repartição |
| **Concessão de direito real de uso** | **Contrato administrativo** | Uso de terreno público ou espaço aéreo, remunerado ou gratuito, **em regra com licitação**. Gera **direito real resolúvel**, transferível *inter vivos* ou por sucessão |

> **Conferido no Planalto (Código Civil e Constituição):** os arts. 98 a 103 do Código Civil e os incisos I a III do art. 20 da Constituição foram conferidos. O resumo de origem cita a **faixa de fronteira**, as **ilhas**, a **plataforma continental** e os **terrenos de marinha** como bens da União: esses itens **não foram conferidos** nesta versão. O mesmo vale para a **tabela de uso privativo**, que é **doutrina** e está regulada em legislação especial (como a concessão de direito real de uso). O resumo também chama as **terras devolutas** de "bens da União": a Constituição só atribui à União as devolutas **indispensáveis** a certas finalidades (art. 20, II), e **não** todas.$md$, 'Polícia Federal', 1, 'Reescrito a partir do resumo de bens públicos (Strauss e Leite) da pasta Apostilas, com organização e destaques próprios, e conferido com os arts. 98 a 103 do Código Civil e o art. 20 da Constituição no Planalto. Pontos de doutrina e de legislação especial indicados como não conferidos.', '[{"title": "Código Civil (Lei nº 10.406/2002), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm"}, {"title": "Constituição Federal de 1988", "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb, '[{"f": "Conceito de bem público (CC, art. 98)", "b": "Bens do domínio nacional pertencentes às pessoas jurídicas de direito público interno; os demais são particulares."}, {"f": "Categorias de bens públicos (CC, art. 99)", "b": "Uso comum do povo, uso especial e dominicais."}, {"f": "Quais bens públicos são alienáveis?", "b": "Os dominicais, observadas as exigências da lei. Os de uso comum e uso especial são inalienáveis enquanto conservarem a qualificação."}, {"f": "Bens públicos e usucapião", "b": "Não estão sujeitos a usucapião (CC, art. 102)."}, {"f": "Autorização × permissão de uso de bem público", "b": "Ambas são atos discricionários e precários. Autorização: interesse predominante do particular, sem licitação. Permissão: interesse também coletivo, em regra com licitação."}]'::jsonb, '[{"q": "Os bens públicos dominicais podem ser alienados, observadas as exigências da lei.", "a": true, "why": "Art. 101 do Código Civil."}, {"q": "Os bens públicos de uso comum do povo são sempre alienáveis.", "a": false, "why": "São inalienáveis enquanto conservarem sua qualificação (art. 100)."}, {"q": "Os bens públicos podem ser adquiridos por usucapião.", "a": false, "why": "Art. 102 do Código Civil: não estão sujeitos a usucapião."}, {"q": "Todas as terras devolutas pertencem à União, segundo o art. 20 da Constituição.", "a": false, "why": "O art. 20, II, atribui à União apenas as terras devolutas indispensáveis às finalidades que enumera."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
