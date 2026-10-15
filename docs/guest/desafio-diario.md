# Questões públicas do desafio diário

A interface usa apenas `get_daily_guest_questions(10)`. O catálogo completo e o histórico de seleção continuam privados. A cota permanece em dez respostas por navegador, com renovação à meia-noite do Acre e data consultada no servidor.

A migração `20261015010000_balanced_daily_guest_questions.sql` prepara uma seleção diária compartilhada:

- prioriza itens aprovados dos últimos três anos, sem excluir automaticamente repertório antigo ainda válido;
- busca cinco questões de múltipla escolha e cinco de certo ou errado, com seis questões de carreiras policiais e quatro de outras carreiras, quando há estoque compatível;
- reserva combinações de formato/carreira antes da escolha, diversifica disciplinas e respostas oficiais e preserva a ordem das alternativas;
- compara cadastro e conteúdo normalizado com o histórico; usa questões ainda não servidas antes de reciclar as mais antigas, quando o estoque se esgota;
- exige tópico atual em edição ativa, revisão jurídica quando necessária, fonte legal verificada e alternativas completas;
- inclui o texto de apoio compartilhado pelo servidor, sem abrir sua tabela ao visitante;
- mantém o conjunto do dia e retira itens que forem colocados em revisão durante o dia.

A seleção trabalha somente com registros existentes e aprovados. Não altera enunciados originais, gabaritos nem status de publicação. A anexação do texto de apoio ocorre na resposta da função.

## Publicação no Supabase

O código da interface e a migração podem ser enviados ao GitHub independentemente. O novo sorteio só entra em produção depois da execução da migração no banco. Uma chave `sb_secret_…` de acesso aos dados não substitui um token administrativo de gerenciamento.

Com `SUPABASE_ACCESS_TOKEN` configurado nas variáveis seguras do ambiente:

```sh
node scripts/guest/publish-daily-questions.mjs --dry-run
node scripts/guest/publish-daily-questions.mjs
```

O primeiro comando prepara `outputs/guest-daily-publication.sql`. O segundo salva a definição anterior, verifica alterações concorrentes, aplica a mudança em uma transação e confirma os privilégios do visitante. Alternativamente, execute a migração no editor SQL do projeto Supabase. Nenhuma credencial deve ser colocada no repositório ou no chat.

## Verificação

`npm test` cobre retomada após recarregar, limite diário, deduplicação, migração do contador antigo, data original de uma sessão que cruza a meia-noite, formatos e bloqueio de itens inadequados.

O teste SQL roda exclusivamente em PostgreSQL local compatível, usando PGlite instalado fora do repositório:

```sh
GUEST_SQL_TEST_MODULE=/caminho/temporario/node_modules/@electric-sql/pglite/dist/index.js node scripts/guest/verify-daily-sql.mjs
```

A versão desta mudança foi também simulada com uma cópia somente para leitura do acervo: 4.888 registros oficiais; 1.266 elegíveis sob as regras conservadoras do teste (303 de múltipla escolha e 963 de certo ou errado, sem carregar os textos compartilhados da base nessa simulação). O conjunto de exemplo reuniu cinco questões de cada formato, seis policiais e quatro de outras carreiras, com dez disciplinas e provas de 2024 a 2026. Esses números descrevem a simulação, não uma publicação no banco.
