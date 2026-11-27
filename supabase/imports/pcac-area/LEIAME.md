# Questões da Área de estudo PC-AC no treinador

Cadastra as 1018 questões da Área de estudo (só conteúdo do cargo de Oficial Investigador) em `board_exam_questions`,
a mesma tabela das provas da IDECAN. Com elas no catálogo, o banco passa a guardar **uma única primeira tentativa por
questão** (`question_first_answers`), valendo para o treinador, o simulado e a área.

## Como aplicar
1. Rode os arquivos `01` a `23` no SQL Editor do Supabase, na ordem. Cada um é idempotente (`on conflict do nothing`).
2. Rode `99-conferir.sql`: esperado `total = 1018` e `sem_topico = 0`.
3. Gerado por `scripts/build-pcac-area-catalog.py` (os ids vêm do enunciado; rodar de novo não os altera).

## Observações
- Itens marcados como `active` por serem questões autorais não jurídicas já exibidas aos alunos na própria área.
- `syllabus_topic_id` aponta para a disciplina na matriz do Edital 001/2026 SEAD/PCAC (Oficial Investigador).
