# Verificações de banco (somente em PostgreSQL descartável, nunca produção)

- `import-duplicates-stub.sql` + migração `20261021100000_question_import_duplicate_guard.sql` +
  `import-duplicates-scenarios.sql`: verificam duplicatas por conteúdo, tentativas de contornar
  as colunas de controle, atualização de textos de apoio, manutenção de registros históricos,
  distinção entre cargos/anos/usuários e itens que dependem de figuras.

```sh
createdb norte_import_check
psql -v ON_ERROR_STOP=1 -d norte_import_check -f scripts/db/import-duplicates-stub.sql
psql -v ON_ERROR_STOP=1 -d norte_import_check -f supabase/migrations/20261021100000_question_import_duplicate_guard.sql
psql -v ON_ERROR_STOP=1 -d norte_import_check -f scripts/db/import-duplicates-scenarios.sql
```

Em produção, aplicar **somente a migração**, pelo fluxo habitual do Supabase. Os arquivos `stub`
e `scenarios` são exclusivamente para banco descartável. A migração não remove duplicatas antigas,
não muda enunciados/gabaritos/status e não altera referências dos alunos. Acrescenta duas colunas
de controle e índices nas quatro tabelas de questões e em `question_support_texts`; a criação exige
um bloqueio de escrita enquanto calcula os índices. Programe a aplicação fora de importações ativas.

A tela de bancas faz a pré-verificação no arquivo e no acervo mesmo antes da migração; a proteção
contra concorrência e importações por SQL/CLI depende de a migração estar aplicada. Ela usa índice
único, além da conferência no trigger. Prova/banca/ano/cargo são preservados; no banco pessoal,
cada usuário tem seu próprio escopo. Comparações não removem acentos, números, sinais matemáticos,
alternativas ou referências de figuras. Sem uma figura disponível, itens visuais de números distintos
não são considerados iguais automaticamente. Questões diferentes podem compartilhar o mesmo texto
de apoio. Cadastros repetidos do próprio texto de apoio são bloqueados no mesmo contexto de prova.

- `audit-shared-exam-items.sql`: somente leitura; lista itens idênticos cadastrados para cargos diferentes.
- `equivalent-reservation-stub.sql` + migrações `20261020120000`, `20261020130000`, `20261020140000` +
  `equivalent-reservation-scenarios.sql`: provam, com asserções, que um cadastro equivalente respondido antes
  não pontua de novo e que várias linhas iguais no mesmo cargo não são unidas.

```sh
createdb norte_check
for f in scripts/db/equivalent-reservation-stub.sql \
  supabase/migrations/20261020120000_cross_mode_question_identity.sql \
  supabase/migrations/20261020130000_attempt_results_and_study_later.sql \
  supabase/migrations/20261020140000_equivalent_first_answer_reservation.sql \
  scripts/db/equivalent-reservation-scenarios.sql; do psql -v ON_ERROR_STOP=1 -d norte_check -f $f; done
```

### Erro `42601: unterminated dollar-quoted string`

Esse erro indica uma consulta cortada no meio de um bloco. A migração agora usa comandos
explícitos para cada tabela, sem o antigo `do $$`/`foreach`. Sua lógica e transação são as mesmas.

No SQL Editor, abra uma **nova consulta** e cole o arquivo completo
`supabase/migrations/20261021100000_question_import_duplicate_guard.sql`, desde `begin;`
até o último `commit;`. Execute sem selecionar apenas parte do texto. Se a linha 89 ainda
mostrar `do $$`, o editor continua com uma cópia antiga. Não execute os arquivos de teste
em produção.

Se estiver reutilizando uma conexão que ficou em transação com erro, execute `rollback;`
antes de tentar novamente. Não basta adicionar `$$` ao trecho cortado: faltariam os índices,
os gatilhos e a confirmação final. O arquivo completo inclui todas essas etapas.

### Erro `23514: official_exam_questions_active_legal_audit_check`

Há registros anteriores à constraint `NOT VALID` que não satisfazem sua expressão. PostgreSQL
mantém esses registros antigos, mas reavalia o CHECK em qualquer UPDATE, inclusive de metadados.
A migração avalia os CHECKs não validados de cada tabela e preenche chaves somente em registros
que os satisfazem. Não desabilita, remove ou altera constraints e não modifica conteúdo/status.

As linhas preservadas com chaves nulas continuam protegidas: o trigger compara seu conteúdo
normalizado ao analisar uma nova importação. Elas permanecem sujeitas à revisão editorial habitual
antes de qualquer alteração. Os testes incluem um legado que viola o CHECK, confirmam que ele
fica intacto, bloqueiam sua reimportação e verificam que a auditoria continua obrigatória.
