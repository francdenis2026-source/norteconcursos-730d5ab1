# Presença de visitantes e rodadas públicas

## Presença

A raiz da aplicação agora participa de um canal público do Supabase Realtime com um identificador aleatório salvo no navegador. Não envia conta, e-mail, IP ou impressão digital. O cliente de presença é anônimo e isolado: não recebe tokens da conta nem consome URLs de confirmação de e-mail. Tanto as páginas públicas quanto o painel participam; abas visíveis com a mesma chave contam uma vez. Ocultar/fechar uma aba retira sua presença; outra aba visível do mesmo navegador mantém a contagem. Erros de conexão exibem indisponibilidade, sem inventar zero.

O indicador passou a se chamar “visitantes online”, pois mede navegadores conectados com uma aba visível, não pessoas únicas nem apenas estudo de cadastrados. Se o armazenamento estiver bloqueado, o identificador é temporário e a deduplicação entre abas fica limitada.

Testes reais de Realtime em Chromium: visitante anônimo; aba duplicada sem duplicar a contagem; painel autenticado com usuário/REST simulados somado à homepage anônima; remoção ao desconectar; indisponibilidade e recuperação após ficar offline. Cabeçalho sem overflow de 320 a 1440 px.

## Rodadas

A seleção original tinha 10 posições, mas três questões arquivadas não eram mais servidas. O reparo da rodada atual substituiu só essas três, preservando sete IDs/posições válidos e sem tocar em respostas, cotas, enunciados, gabaritos ou comentários. A API pública foi conferida com dez itens elegíveis.

Após autorização explícita do usuário, foram reparadas também as próximas 13 rodadas: 70 posições futuras faltantes/inválidas, mantendo as válidas. Conferência posterior somente por leitura confirmou 14 rodadas de 18 a 31/10/2026, 140 posições elegíveis, posições 1–10 e sem duplicidade dentro de cada dia. A data de referência inicial veio do relógio do Acre; não da data UTC do aparelho.

`scripts/guest/repair-daily-selection.mjs` usa `SUPABASE_SECRET_KEY` apenas do ambiente, começa em modo de validação e limita-se a um dia por padrão. `--apply` grava só posições inválidas/vazias, depois de conferir concorrência e a data do Acre. Exige autorização adicional antes de ampliar o intervalo. Backups e planos ficam em `outputs/`, fora do Git.

## Migração preparada, não aplicada

`supabase/migrations/20261019060000_repair_daily_guest_gaps.sql` foi validada em PostgreSQL local (PGlite). Ela repõe lacunas quando um item de uma seleção salva é arquivado posteriormente, preservando posições válidas, estoque revisado, privacidade, teto de dez e renovação do Acre. Não foi aplicada em produção: o ambiente dispõe da API de dados, mas não de uma credencial administrativa válida para publicar funções SQL. As 14 rodadas acima já foram corrigidas pela API de dados. Para ativar a reposição automática permanente, executar a migração inteira no SQL Editor do Supabase.

Comandos de validação: testes `study-presence.test.mjs`, `daily-guest-repair.test.mjs` e `guest-progress.test.mjs`; `scripts/qa/study-presence.py`; `GUEST_SQL_TEST_MODULE=<pglite>/dist/index.js node scripts/guest/verify-daily-repair-sql.mjs`. Nenhum teste SQL local se conecta ao projeto real.
