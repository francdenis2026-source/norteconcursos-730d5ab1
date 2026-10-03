-- Nono lote da Biblioteca: Contabilidade Geral (DRE, notas explicativas, grande porte).
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('contabilidade-dre-dfc-dva-lei-6404', 'Contabilidade Geral', 'Lei das S.A.', 165, 'DRE, fluxos de caixa e valor adicionado (Lei nº 6.404/1976)', 'A ordem da demonstração do resultado, o regime de competência no resultado e os três fluxos da DFC.', $md$## Demonstração do resultado do exercício (art. 187)

A DRE **discrimina**, nesta ordem:

1. a **receita bruta** das vendas e serviços, as **deduções**, os **abatimentos** e os **impostos**;
2. a **receita líquida**, o **custo das mercadorias e serviços vendidos** e o **lucro bruto**;
3. as **despesas com vendas**, as **despesas financeiras** (deduzidas das receitas), as **despesas gerais e administrativas** e outras despesas operacionais;
4. o **lucro ou prejuízo operacional**, as **outras receitas** e as **outras despesas**;
5. o **resultado antes do Imposto sobre a Renda** e da provisão para o imposto;
6. as **participações** de debêntures, empregados, administradores e partes beneficiárias, e de instituições ou fundos de assistência ou previdência de empregados, que não se caracterizem como despesa;
7. o **lucro ou prejuízo líquido** do exercício e o seu **montante por ação** do capital social.

### Regime de competência no resultado (art. 187, § 1º)

Computam-se na apuração do resultado:

- as **receitas e rendimentos ganhos no período**, **independentemente da sua realização em moeda**; e
- os **custos, despesas, encargos e perdas, pagos ou incorridos**, correspondentes a essas receitas e rendimentos.

## Fluxos de caixa e valor adicionado (art. 188)

- **Demonstração dos fluxos de caixa (DFC):** as **alterações no saldo de caixa e equivalentes de caixa**, segregadas em, **no mínimo, 3 fluxos**: das **operações**, dos **financiamentos** e dos **investimentos**.
- **Demonstração do valor adicionado (DVA):** o **valor da riqueza gerada** pela companhia e sua **distribuição** entre os que contribuíram para gerá-la (empregados, financiadores, acionistas, governo e outros).

## Quem elabora o quê

Pelo **art. 176, § 6º**, a **companhia fechada** com patrimônio líquido **inferior a R$ 2 milhões** não é obrigada a elaborar a DFC. Pelo quadro do resumo de origem, a **DVA** é exigida das companhias **abertas**.

> **Conferido no Planalto (Lei nº 6.404/1976, texto compilado):** os arts. 187 e 188 foram conferidos, inclusive a lista da DRE, o § 1º do art. 187 e os **três fluxos mínimos** da DFC. Os **exemplos e as classificações do CPC 26** que aparecem no resumo de origem **não foram conferidos** neste material.

> **Cai em prova:** o resultado se apura pelo **regime de competência**: a receita **ganha** entra no resultado **mesmo sem ter sido recebida**, e a despesa **incorrida** entra **mesmo sem ter sido paga**.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização e destaques próprios, e conferido com o texto compilado da Lei nº 6.404/1976 e da Lei nº 11.638/2007 no Planalto. As normas do CPC citadas e os exemplos não foram conferidos, e o texto indica onde.', '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}]'::jsonb, '[{"f": "Ordem da DRE (Lei 6.404, art. 187)", "b": "Receita bruta, deduções, receita líquida, CMV, lucro bruto, despesas operacionais, resultado operacional, resultado antes do IR, participações e lucro líquido por ação."}, {"f": "Três fluxos mínimos da DFC", "b": "Das operações, dos financiamentos e dos investimentos (art. 188, I)."}, {"f": "Regime de competência no resultado", "b": "Receitas ganhas e despesas incorridas entram no resultado, independentemente de recebimento ou pagamento (art. 187, § 1º)."}, {"f": "O que mostra a DVA?", "b": "O valor da riqueza gerada pela companhia e sua distribuição entre empregados, financiadores, acionistas, governo e outros (art. 188, II)."}, {"f": "Companhia fechada e DFC", "b": "Não é obrigada a elaborar a DFC se tiver patrimônio líquido inferior a R$ 2 milhões na data do balanço (art. 176, § 6º)."}]'::jsonb, '[{"q": "Pela Lei 6.404/1976, a DFC deve segregar as alterações do caixa em, no mínimo, três fluxos.", "a": true, "why": "Operações, financiamentos e investimentos (art. 188, I)."}, {"q": "Pelo regime de competência, a receita só entra no resultado quando recebida em dinheiro.", "a": false, "why": "Entram as receitas ganhas no período, independentemente da realização em moeda."}, {"q": "A demonstração do resultado discrimina a receita líquida, o custo das mercadorias vendidas e o lucro bruto.", "a": true, "why": "Art. 187, II."}, {"q": "A DVA demonstra o valor da riqueza gerada pela companhia e a sua distribuição.", "a": true, "why": "Art. 188, II."}]'::jsonb),
('contabilidade-notas-explicativas-grande-porte-avp', 'Contabilidade Geral', 'Lei das S.A.', 175, 'Notas explicativas, sociedades de grande porte e ajuste a valor presente', 'O conteúdo das notas explicativas, quem assina as demonstrações, o critério de grande porte e quando se ajusta a valor presente.', $md$## Notas explicativas (art. 176, §§ 4º e 5º)

As demonstrações são **complementadas por notas explicativas** e outros quadros analíticos necessários para esclarecer a situação patrimonial e os resultados. As notas devem:

1. apresentar informações sobre a **base de preparação** das demonstrações e as **práticas contábeis** específicas aplicadas;
2. divulgar informações exigidas pelas práticas contábeis brasileiras que **não estejam em outra parte** das demonstrações;
3. fornecer **informações adicionais** necessárias a uma apresentação adequada;
4. indicar, entre outros pontos, os **principais critérios de avaliação** (estoques, depreciação, amortização, exaustão, provisões e perdas prováveis), os **investimentos relevantes em outras sociedades**, os **ônus reais, garantias e responsabilidades contingentes**, a **taxa de juros, as datas de vencimento e as garantias** das obrigações de longo prazo, o **número, espécies e classes das ações**, os **ajustes de exercícios anteriores** e os **eventos subsequentes** ao encerramento do exercício com efeito relevante.

## Quem assina (art. 177, § 4º)

As demonstrações financeiras são **assinadas pelos administradores** e por **contabilistas legalmente habilitados**.

## Sociedades de grande porte (Lei nº 11.638/2007, art. 3º)

Aplicam-se às **sociedades de grande porte**, **ainda que não constituídas como S.A.**, as disposições da Lei das S.A. sobre **escrituração**, **elaboração de demonstrações financeiras** e a **obrigatoriedade de auditoria independente** por auditor registrado na CVM.

Considera-se de grande porte (para os fins exclusivos dessa lei) a sociedade, ou o conjunto de sociedades sob controle comum, que tiver **no exercício anterior**:

- **ativo total superior a R$ 240 milhões**; **ou**
- **receita bruta anual superior a R$ 300 milhões**.

## Ajuste a valor presente (art. 183, VIII)

- Os elementos do ativo decorrentes de **operações de longo prazo** são **ajustados a valor presente**.
- Os **demais** elementos são ajustados **quando houver efeito relevante**.

*Resumo de origem:* o ajuste a valor presente **exclui os juros embutidos** nas compras e vendas a prazo, em atenção à **essência sobre a forma**. Na **venda a prazo**: D Clientes / C Receita de vendas e C **Ajuste a Valor Presente sobre Clientes** (retificadora do ativo); depois, apropria-se a **receita financeira**. Na **compra a prazo**: D Estoques e D **Juros a Transcorrer** (retificadora do passivo) / C Fornecedores; depois, a **despesa financeira**.

## Instrumentos financeiros (art. 183, I)

As aplicações em instrumentos financeiros, derivativos e títulos de crédito, no circulante ou no longo prazo, são avaliadas **pelo valor justo**, quando destinadas à **negociação** ou **disponíveis para venda**; as **demais**, **pelo custo de aquisição** (ou valor de emissão), atualizado conforme a lei ou o contrato, **ajustado ao valor provável de realização** se este for inferior.

> **Conferido no Planalto (Lei nº 6.404/1976 e Lei nº 11.638/2007):** os arts. 176, §§ 4º e 5º, 177, § 4º, 183 (incisos I e VIII) e o art. 3º da Lei nº 11.638/2007 foram conferidos. **Não foram conferidos** neste material: a **classificação em circulante e não circulante pelo CPC 26**, a **classificação dos instrumentos financeiros pelo CPC 48** (custo amortizado, valor justo por meio do resultado e por meio de outros resultados abrangentes) e a afirmação do resumo de que as sociedades de grande porte "**não estão obrigadas a publicar**" as demonstrações, que **não consta do art. 3º**. Para esses pontos, consulte a norma do CFC ou da CVM antes de usar.$md$, 'Polícia Federal', 3, 'Reescrito a partir do Resumão de Contabilidade Geral para a Polícia Federal (Gran Cursos Online, prof. Feliphe Araújo), com organização e destaques próprios, e conferido com o texto compilado da Lei nº 6.404/1976 e da Lei nº 11.638/2007 no Planalto. As normas do CPC citadas e os exemplos não foram conferidos, e o texto indica onde.', '[{"title": "Lei nº 6.404/1976 (Lei das S.A.), texto compilado", "url": "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm"}, {"title": "Lei nº 11.638/2007", "url": "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11638.htm"}]'::jsonb, '[{"f": "Critério de sociedade de grande porte (Lei 11.638/2007, art. 3º)", "b": "Ativo total superior a R$ 240 milhões ou receita bruta anual superior a R$ 300 milhões, no exercício anterior."}, {"f": "Consequência de ser sociedade de grande porte", "b": "Aplicam-se, mesmo sem ser S.A., as regras da Lei das S.A. sobre escrituração e demonstrações financeiras e a auditoria independente por auditor registrado na CVM."}, {"f": "Quem assina as demonstrações financeiras?", "b": "Os administradores e contabilistas legalmente habilitados (art. 177, § 4º)."}, {"f": "Ajuste a valor presente (art. 183, VIII)", "b": "Obrigatório nos elementos do ativo de longo prazo; nos demais, quando houver efeito relevante."}, {"f": "O que as notas explicativas devem trazer?", "b": "Base de preparação, práticas contábeis, informações exigidas e não apresentadas em outro lugar, informações adicionais e itens como critérios de avaliação, garantias, taxas de juros e eventos subsequentes."}]'::jsonb, '[{"q": "A sociedade limitada de grande porte está sujeita à auditoria independente, ainda que não seja S.A.", "a": true, "why": "Lei 11.638/2007, art. 3º."}, {"q": "Considera-se de grande porte a sociedade com ativo total superior a R$ 240 milhões ou receita bruta anual superior a R$ 300 milhões.", "a": true, "why": "Critérios do art. 3º, parágrafo único, da Lei 11.638/2007."}, {"q": "As demonstrações financeiras da companhia são assinadas apenas pelos administradores.", "a": false, "why": "Também são assinadas por contabilistas legalmente habilitados (art. 177, § 4º)."}, {"q": "Pelo art. 183, os elementos do ativo de operações de longo prazo são ajustados a valor presente.", "a": true, "why": "Art. 183, VIII."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
