# Verificações de banco (somente em PostgreSQL descartável, nunca produção)

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
