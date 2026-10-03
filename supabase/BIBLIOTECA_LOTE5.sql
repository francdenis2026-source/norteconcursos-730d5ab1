-- Quinto lote da Biblioteca: Direito Administrativo (licitações).
-- Entram como `under_review`. Requer a migração das colunas flashcards/quiz (20261001070000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('administrativo-licitacoes-lei-14133-modalidades', 'Direito Administrativo', 'Licitações e contratos', 50, 'Licitações: princípios, modalidades e inexigibilidade na Lei nº 14.133/2021', 'Os princípios do art. 5º, as cinco modalidades, o que desapareceu da Lei nº 8.666/1993 e os casos de inexigibilidade.', $md$## Qual lei vale

A **Lei nº 14.133/2021** é a **Nova Lei de Licitações e Contratos Administrativos**. O art. 193 **revoga** a **Lei nº 8.666/1993**, a **Lei nº 10.520/2002** (pregão) e os **arts. 1º a 47-A da Lei nº 12.462/2011** (RDC), **após decorridos 2 anos da publicação oficial** da nova lei.

> **Atualização legislativa (conferida no Planalto):** o texto compilado da Lei nº 14.133/2021 traz diversos decretos que **atualizam os valores** de dispensa por valor e de outros limites. **Não use valores em reais de provas antigas**: confira o decreto vigente. O art. 193, II fixa **2 anos** de transição, mas confirme no texto compilado a **data efetiva** de revogação da Lei nº 8.666/1993, pois o prazo foi tratado em alterações posteriores. A lei também **proíbe misturar os regimes**: não se aplicam combinadamente as regras da lei nova e as das leis antigas.

## Princípios (art. 5º)

Legalidade, impessoalidade, moralidade, publicidade, eficiência, interesse público, probidade administrativa, igualdade, **planejamento**, **transparência**, **eficácia**, **segregação de funções**, motivação, vinculação ao edital, julgamento objetivo, segurança jurídica, razoabilidade, **competitividade**, proporcionalidade, **celeridade**, **economicidade** e **desenvolvimento nacional sustentável**, além das disposições da **LINDB** (Decreto-Lei nº 4.657/1942).

## As cinco modalidades (art. 28)

| Modalidade | Para quê |
|---|---|
| **Pregão** | **Obrigatória** para **bens e serviços comuns**; julgamento por **menor preço** ou **maior desconto** |
| **Concorrência** | Bens e serviços **especiais** e **obras e serviços comuns e especiais de engenharia** |
| **Concurso** | Escolha de **trabalho técnico, científico ou artístico**, por **melhor técnica ou conteúdo artístico**, com prêmio ou remuneração ao vencedor |
| **Leilão** | **Alienação** de bens **imóveis** ou de bens **móveis inservíveis ou legalmente apreendidos**, a quem der o **maior lance** |
| **Diálogo competitivo** | Obras, serviços e compras em que a Administração **dialoga com licitantes previamente selecionados** para desenvolver alternativas, e depois recebe a **proposta final** |

- É **vedado criar outras modalidades** ou **combinar** as existentes (art. 28, § 2º).
- **Convite** e **tomada de preços**, da Lei nº 8.666/1993, **não constam** do rol da lei atual.
- A **modalidade nova** é o **diálogo competitivo**.
- A lei admite ainda **procedimentos auxiliares** (art. 28, § 1º).

## Inexigibilidade (art. 74)

É **inexigível** a licitação quando **inviável a competição**, **em especial** nos casos de:

1. **Fornecedor exclusivo** (produtor, empresa ou representante comercial exclusivo). A Administração deve demonstrar a inviabilidade com atestado ou contrato de exclusividade, declaração do fabricante ou documento idôneo, **vedada a preferência por marca específica** (§ 1º).
2. **Profissional do setor artístico**, diretamente ou por empresário exclusivo, **consagrado pela crítica especializada ou pela opinião pública**. O empresário exclusivo precisa ter exclusividade **permanente e contínua**, e não apenas para evento ou local específico (§ 2º).
3. **Serviços técnicos especializados de natureza predominantemente intelectual**, com profissionais ou empresas de **notória especialização**, como estudos técnicos e projetos, consultorias e auditorias, fiscalização e supervisão de obras, patrocínio ou defesa de causas judiciais ou administrativas e restauração de obras de arte. **Vedada a inexigibilidade para serviços de publicidade e divulgação**.

O rol do art. 74 é **exemplificativo** ("em especial"). Na hipótese do inciso III, é **vedada a subcontratação** de outras empresas e a atuação de profissionais diferentes dos que justificaram a inexigibilidade (§ 4º).

> **Cai em prova:** inexigibilidade é **inviabilidade de competição**; dispensa é possibilidade de competir, mas com autorização legal para não licitar. E o **pregão** é **obrigatório** para bens e serviços comuns.$md$, 'Polícia Federal', 1, 'Elaborado diretamente a partir do texto da Lei nº 14.133/2021 no Planalto (arts. 5º, 6º, 28, 74 e 193), com organização e destaques próprios. Não usa o resumo de licitações da pasta Apostilas.', '[{"title": "Lei nº 14.133/2021 (Nova Lei de Licitações e Contratos Administrativos)", "url": "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm"}]'::jsonb, '[{"f": "Quais são as modalidades de licitação da Lei 14.133/2021?", "b": "Pregão, concorrência, concurso, leilão e diálogo competitivo (art. 28). É vedado criar outras ou combiná-las."}, {"f": "Modalidade nova da Lei 14.133/2021", "b": "O diálogo competitivo. Convite e tomada de preços, da Lei 8.666/1993, não constam do rol atual."}, {"f": "Pregão", "b": "Obrigatório para bens e serviços comuns; critério de menor preço ou maior desconto."}, {"f": "Inexigibilidade (art. 74)", "b": "Quando inviável a competição, em especial: fornecedor exclusivo, artista consagrado e serviço técnico especializado de natureza intelectual com notória especialização."}, {"f": "Leilão", "b": "Alienação de imóveis ou de móveis inservíveis ou legalmente apreendidos, a quem oferecer o maior lance."}]'::jsonb, '[{"q": "A tomada de preços continua sendo modalidade de licitação na Lei 14.133/2021.", "a": false, "why": "O art. 28 lista cinco modalidades e não inclui convite nem tomada de preços."}, {"q": "O pregão é obrigatório para a aquisição de bens e serviços comuns.", "a": true, "why": "É o que diz o art. 6º, XLI, da lei."}, {"q": "É permitida a inexigibilidade de licitação para serviços de publicidade e divulgação com notória especialização.", "a": false, "why": "O art. 74, III, veda a inexigibilidade para serviços de publicidade e divulgação."}, {"q": "A Administração pode criar novas modalidades de licitação combinando as previstas em lei.", "a": false, "why": "O art. 28, § 2º, veda a criação de outras modalidades e a combinação das existentes."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
