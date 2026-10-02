-- Material de estudo: Estrutura conceitual (informação útil e definição de ativo, passivo e PL).
-- Entra como `under_review`: o aluno só vê depois que um admin conferir o texto com o CPC 00 e ativar.
-- Requer as colunas flashcards/quiz (20261001070000 e 20261001160000).
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('contabilidade-estrutura-conceitual-informacao-util', 'Contabilidade Geral', 'Estrutura conceitual', 15,
 'Estrutura conceitual: informação útil e definição de ativo, passivo e PL',
 'As características qualitativas da informação contábil e as definições de ativo, passivo e patrimônio líquido da Estrutura Conceitual (CPC 00).',
 $md$## A ideia central

A **Estrutura Conceitual** (CPC 00) é a base da contabilidade: diz **que informação vale a pena produzir** e **o que é um ativo, um passivo e o patrimônio líquido**. As provas copiam frases dela, então aqui vale o texto exato, e não o cálculo.

## Informação contábil útil: as características qualitativas

| Tipo | Características |
|---|---|
| **Fundamentais** | **Relevância** e **representação fidedigna** |
| **De melhoria** | Comparabilidade, verificabilidade, tempestividade e compreensibilidade |

- **Relevância:** a informação faz diferença nas decisões dos usuários. A **materialidade** é um **aspecto da relevância**, específico de cada entidade; não é uma característica à parte.
- **Representação fidedigna:** a informação retrata o fenômeno como ele é (completa, neutra e livre de erro). Cuidado com o nome: não é apenas "fidedignidade".
- **Comparabilidade** é o **objetivo**; a **consistência** (usar os mesmos métodos para os mesmos itens, de um período a outro) é **um meio** de alcançá-lo, e não a mesma coisa.
- As características de melhoria **aumentam** a utilidade da informação que já é relevante e fidedigna; não a substituem.

> **Cai em prova:** trocar "representação fidedigna" por "fidedignidade", listar a **materialidade** entre as fundamentais ou dizer que a **comparabilidade** é fundamental.

## Os elementos: ativo, passivo e patrimônio líquido

| Elemento | Definição |
|---|---|
| **Ativo** | Recurso econômico **presente**, **controlado** pela entidade como resultado de **evento passado** |
| **Recurso econômico** | **Direito** que tem o **potencial de produzir benefícios econômicos** |
| **Passivo** | **Obrigação presente** da entidade de transferir um recurso econômico como resultado de **evento passado** |
| **Patrimônio líquido** | **Interesse residual** nos ativos da entidade depois de deduzidos todos os passivos (PL = A − P) |

Três gatilhos para o ativo: **controle**, **evento passado** e **potencial de benefício**. Se faltar qualquer um, não é ativo. Um bem sem potencial de gerar benefícios econômicos (por exemplo, uma máquina quebrada, sem conserto e sem valor de venda) **não se enquadra** na definição de ativo.

Para o passivo vale o mesmo teste: a **intenção** de comprar um equipamento no ano que vem não é passivo hoje, porque não é obrigação **presente** nem veio de um evento **passado**.

> **Cai em prova:** "bens sem potencial de serviços ou incapazes de gerar benefícios econômicos não se enquadram na definição de ativo" (certo). Também já caiu que a contabilidade é uma **ciência social**, e não exata.

## Fora deste material

As **bases de mensuração** (custo histórico e valor corrente) ficam para outro material.
$md$,
 'Polícia Federal', 1, 'Material próprio, baseado na Estrutura Conceitual para Relatório Financeiro (CPC 00 R2 / NBC TG Estrutura Conceitual) e no Resumão de Contabilidade Geral (Gran Cursos Online, prof. Feliphe Araújo). Aguardando conferência do texto com o pronunciamento e inclusão da fonte oficial antes da publicação.', '[]'::jsonb,
 '[{"f": "Quais são as características qualitativas fundamentais da informação contábil?", "b": "Relevância e representação fidedigna."}, {"f": "Quais são as características qualitativas de melhoria?", "b": "Comparabilidade, verificabilidade, tempestividade e compreensibilidade."}, {"f": "A materialidade é característica fundamental?", "b": "Não. É um aspecto da relevância, específico de cada entidade."}, {"f": "Qual a relação entre consistência e comparabilidade?", "b": "A comparabilidade é o objetivo; a consistência (mesmos métodos para os mesmos itens) ajuda a alcançá-lo."}, {"f": "Como se define ativo?", "b": "Recurso econômico presente, controlado pela entidade como resultado de evento passado. Recurso econômico é um direito com potencial de gerar benefícios econômicos."}, {"f": "Como se define passivo?", "b": "Obrigação presente da entidade de transferir um recurso econômico como resultado de evento passado."}, {"f": "Como se define patrimônio líquido?", "b": "Interesse residual nos ativos da entidade depois de deduzidos todos os passivos."}]'::jsonb,
 '[{"q": "Relevância, materialidade e representação fidedigna são as características qualitativas fundamentais da informação contábil útil.", "a": false, "why": "A materialidade é um aspecto da relevância; as fundamentais são relevância e representação fidedigna."}, {"q": "Comparabilidade, verificabilidade, tempestividade e compreensibilidade são características qualitativas de melhoria.", "a": true, "why": "São as quatro características de melhoria da Estrutura Conceitual."}, {"q": "A consistência é um meio de alcançar a comparabilidade.", "a": true, "why": "A comparabilidade é o objetivo; a consistência é o uso dos mesmos métodos que ajuda a atingi-lo."}, {"q": "Um bem sem potencial de gerar benefícios econômicos não se enquadra na definição de ativo.", "a": true, "why": "Faltando o potencial de benefício, o recurso econômico deixa de existir."}, {"q": "A intenção de comprar um equipamento no próximo exercício já é um passivo da entidade.", "a": false, "why": "Passivo exige obrigação presente decorrente de evento passado."}, {"q": "O patrimônio líquido é o interesse residual nos ativos depois de deduzidos todos os passivos.", "a": true, "why": "É a definição da Estrutura Conceitual: PL = A − P."}, {"q": "A contabilidade é uma ciência exata.", "a": false, "why": "É uma ciência social: estuda e registra fatos do patrimônio das entidades."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz
  where public.study_materials.content_status = 'under_review';

commit;
