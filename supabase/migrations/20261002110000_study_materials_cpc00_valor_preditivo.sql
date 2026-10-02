-- Material "Estrutura conceitual: informação útil e definição de ativo, passivo e PL" (CPC 00):
-- acrescenta o valor preditivo e confirmatório da informação relevante (caiu na PF 2018, item 119, e
-- na PF 2025, item 119) e mais um flashcard e dois itens Certo/Errado ligados às provas.
-- Só altera o material enquanto ele estiver sob revisão.
update public.study_materials
set
  body_md = replace(
    body_md,
    '- **Relevância:** a informação faz diferença nas decisões dos usuários. A **materialidade** é um **aspecto da relevância**, específico de cada entidade; não é uma característica à parte.',
    '- **Relevância:** a informação faz diferença nas decisões dos usuários. Ela tem valor **preditivo** (ajuda a prever resultados futuros), valor **confirmatório** (confirma ou corrige avaliações anteriores) ou **ambos**. A **materialidade** é um **aspecto da relevância**, específico de cada entidade; não é uma característica à parte.'
  ),
  flashcards = coalesce(flashcards, '[]'::jsonb) || '[{"f": "Quando uma informação contábil é relevante?", "b": "Quando é capaz de fazer diferença nas decisões dos usuários. Pode ter valor preditivo, valor confirmatório ou ambos."}]'::jsonb,
  quiz = coalesce(quiz, '[]'::jsonb) || '[{"q": "A informação contábil relevante pode ter valor preditivo, valor confirmatório ou ambos.", "a": true, "why": "É a forma como o CPC 00 explica a capacidade de fazer diferença nas decisões."}, {"q": "A relevância e a compreensibilidade são as características qualitativas fundamentais da informação contábil.", "a": false, "why": "As fundamentais são a relevância e a representação fidedigna; a compreensibilidade é de melhoria."}]'::jsonb
where slug = 'contabilidade-estrutura-conceitual-informacao-util'
  and content_status = 'under_review';
