# Questões da FGV (importadas de PDFs oficiais)

Ordem para aplicar no SQL Editor do Supabase:

1. `supabase/migrations/20261004130000_board_exam_questions.sql` (cria a tabela; já está em `APLICAR_TUDO_20261004.sql`).
2. Cada arquivo `*.sql` desta pasta (um por prova, ~100 KB). Podem ser rodados mais de uma vez.
3. Todas entram como `under_review`: o aluno não vê nada ainda.
4. Depois de revisar (e de confirmar a autorização de uso do material da FGV), rode `ATIVAR_APOS_REVISAO.sql`.

Cada linha traz o link do caderno e do gabarito definitivo oficiais. A disciplina foi atribuída pela ordem do caderno
e deve ser conferida; questões com figura, fórmula ou texto possivelmente truncado vêm com `needs_visual = true`.
