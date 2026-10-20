# Histórico de questões e ranking entre modalidades

## Escopo e estado

O treinador, o caderno de erros e o simulador passam a consultar a mesma primeira resposta. A identidade é `tabela:id`, compatível com o código permanente da questão. Branco não é resposta. Uma primeira resposta errada ou rápida demais para pontuar também impede novas tentativas de serem tratadas como inéditas. O desempenho integral da tentativa continua salvo em `simulator_attempts` e `simulator_responses`, independentemente da elegibilidade para ranking.

A migração `20261020120000_cross_mode_question_identity.sql` foi criada e testada em PostgreSQL embutido (PGlite). **Não foi aplicada ao projeto Supabase de produção nesta entrega: faltam credenciais administrativas.** Até a aplicação, a interface usa uma leitura compatível das duas modalidades; a proteção nova no banco e o resumo de pontos não estão ativos. Erros de autorização/rede não são escondidos pelo fallback.

## Banco e concorrência

- Adiciona `question_table` e `ranking_first` às respostas, sem alterar conteúdo de questões ou reescrever tentativas anteriores.
- Cria `question_first_answers`, com chave única `(user_id, question_table, question_id)` e escrita exclusiva dos gatilhos. A reserva persiste mesmo se uma resposta for apagada. Somente o dono pode consultar seu histórico.
- Faz o inventário das respostas antigas e recusa toda a transação caso exista um ID legado ambíguo entre tabelas de uma mesma origem. Esses casos precisam de auditoria individual; não são deduplicados pelo enunciado.
- Reserva a primeira resposta dentro da mesma transação da gravação. `ON CONFLICT DO NOTHING` e o índice único garantem uma única reserva. Uma tentativa repetida é armazenada normalmente, com `ranking_first=false`.
- O servidor confere o gabarito e impede alterações de identidade/resposta em registros salvos. Reenvios usam inserção idempotente.
- Mantém as fórmulas e o caminho de cálculo dos registros históricos (`ranking_first IS NULL`). Somente as novas inserções são submetidas à reserva. Não apaga, reseta ou recalcula notas armazenadas.
- Expõe `get_question_first_answers()` e `get_simulator_ranking_result(attempt_id)`, restritas à sessão do dono. Resultado da tentativa e pontos elegíveis para ranking são exibidos separadamente.

## Aplicação

1. Obter acesso administrativo pelo mecanismo seguro do ambiente (`SUPABASE_ACCESS_TOKEN` para `api.supabase.com`, ou conexão administrativa equivalente). Não colocar tokens em Git, chat ou relatórios.
2. Conferir no banco real as tabelas, políticas, funções atuais e histórico de migrações; há outras contas trabalhando neste projeto. Comparar a função atual `score_events` com a versão usada nesta migração antes de substituí-la.
3. Fazer backup e comparar a saída de `score_events()` antes/depois em uma cópia de staging. Não aplicar sobre uma função remota divergente sem integrar as diferenças.
4. Executar a migração na ordem do mecanismo de deploy existente. Ela é transacional e bloqueia gravações de respostas durante a preparação. Se detectar ambiguidades, corrigir somente após auditoria, sem descartar dados.
5. Validar com dois usuários de teste e duas conexões PostgreSQL reais: resposta no treinador seguida de simulado, primeira resposta errada, dois envios simultâneos, branco seguido de resposta, histórico completo e isolamento entre contas.
6. Confirmar as RPCs na sessão autenticada e a implantação da aplicação separadamente. Push na `main` não comprova migração ou implantação.

PGlite serializa comandos em uma conexão: os testes exercitam a restrição única e as transações, mas não substituem o teste de disputa entre conexões no Supabase real. O teste do banco também usa tabelas mínimas; não comprova compatibilidade com modificações remotas não visíveis neste checkout.

## Verificação reproduzível

```sh
npm run typecheck
npm test
npm install --prefix /tmp/norte-db-tests --cache /tmp/norte-npm-cache --no-package-lock @electric-sql/pglite@0.3.14
NORTE_TEST_DEPS_DIR=/tmp/norte-db-tests node --test scripts/cross-mode-db.test.mjs
```

O teste independente de banco não exige credenciais e nunca conecta ao Supabase. Para build, usar a cópia temporária do checkout documentada nas instruções do ambiente: o plugin de build reescreve arquivos gerados rastreados.

## Limites desta etapa

Não foram confirmadas duplicações específicas da PC-PR no banco real. Não foi criada equivalência entre fontes por semelhança de texto: itens distintos podem compartilhar textos de apoio. O caderno Estudar depois continua local ao navegador. Regras de nota líquida ou ponderada por edição e sincronização desse caderno não fazem parte desta etapa; não inferir a regra de correção apenas pelo nome da banca.

## Resultado da validação desta entrega

- Checagem de tipos e build completo (client/SSR): passaram.
- Suíte padrão: 687 testes, 686 passaram, 1 falha preexistente em `filter-taxonomy.test.mjs` (Estatística: `0 !== 2`).
- Banco PGlite: 11 testes passaram, incluindo reserva única, rollback, permissões, histórico legado e tentativa de 100 questões.
- Navegador Chromium: hook de histórico validado com RPC nova, fallback legado e autorização negada, usando respostas HTTP simuladas. Não equivale a uma sessão autenticada real em produção.
