# Cenários da primeira tentativa no ranking

Teste da migração `20261020120000_first_attempt_identity_and_attempt_history.sql` contra um
PostgreSQL descartável (nunca o banco de produção):

```sh
createdb norte_first_attempt
psql -v ON_ERROR_STOP=1 -d norte_first_attempt -f scripts/db/first-attempt/stub-schema.sql
psql -v ON_ERROR_STOP=1 -d norte_first_attempt -f supabase/migrations/20261020120000_first_attempt_identity_and_attempt_history.sql
psql -v ON_ERROR_STOP=1 -d norte_first_attempt -f scripts/db/first-attempt/scenarios.sql
```

`stub-schema.sql` cria só as tabelas mínimas que a migração lê (não reproduz o esquema real).
Os cenários cobrem: resposta rápida errada que consome a questão, repetição certa que não pontua,
mesma questão cadastrada para dois cargos, duas abas gravando a mesma resposta, itens diferentes com
o mesmo texto de apoio, e o resumo de ranking por tentativa de simulado.
