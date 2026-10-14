# Ranking dedicado com paginação

A página existente `/dashboard/ranking`, acessível por **Desempenho → Ranking**, passou a ter busca pelo nome público, seções Geral/Questões/Simulados, seleção de 20/50/100 candidatos por página, total de participantes, posição própria e botão para chegar à página do aluno. Filtros ficam na URL. A busca não recalcula posições: uma pessoa na posição 234 continua nessa posição ao ser encontrada.

## Dados e privacidade

A nova RPC `get_ranking_page` calcula pontuação e posições no servidor, entrega apenas a página solicitada e informa a posição própria independentemente da busca. Geral inclui todos os perfis de candidatos, inclusive com zero pontos. Questões/Simulados incluem quem tem pontuação na seção. Administradores continuam excluídos. Horas de estudo são uma métrica, conforme a regra já registrada no projeto.

Busca e resultado usam apenas o nome abreviado público; nomes completos, sobrenomes ocultos e dados de contato não são retornados nem pesquisáveis. A conta localizada anteriormente por “Liberdade” usa o nome público **ANTÔNIA S.**: sua ausência na lista antiga resulta de zero pontos, não de bloqueio da conta. Nenhum nome ou resposta foi modificado.

A aplicação mostra erros e permite tentar novamente. Até a nova função ser publicada, usa a RPC antiga como compatibilidade, com aviso explícito de lista parcial. Essa alternativa não resolve a exclusão de candidatos com zero pontos nem comprova a lista completa.

## Publicação do banco

**Pendente no ambiente desta entrega.** Não há `SUPABASE_ACCESS_TOKEN` disponível. A senha PostgreSQL e a chave administrativa REST anteriormente fornecidas não substituem um token de gerenciamento HTTPS; a conexão PostgreSQL foi bloqueada na sessão anterior.

Foram salvos no rascunho do ambiente o requisito de segredo `SUPABASE_ACCESS_TOKEN` e o destino `api.supabase.com`. Isso não aplica SQL: o usuário precisa preencher o valor nas configurações seguras, salvar e publicar o ambiente. Não colocar o token no código ou chat.

Depois de disponível, executar:

```sh
NODE_USE_ENV_PROXY=1 node scripts/ranking/publish-ranking.mjs
```

O publicador aplica a regra existente `20261012120000_ranking_without_study_time.sql` e a nova `20261014030000_paginated_student_ranking.sql` em transação, com conferência das versões anteriores das funções para detectar atualização concorrente. Guarda versões anteriores e evidências em `outputs` ignorados e confere que a conta solicitada recebeu posição. Não altera tabelas de respostas ou perfis e não grava credenciais. Uma falha posterior à publicação deve ser investigada, pois confirmação de gravação e execução são etapas distintas.

Alternativa para administrador com acesso ao SQL Editor: gerar um pacote único revisável, sem publicar:

```sh
node scripts/ranking/publish-ranking.mjs --dry-run --emit-sql
```

O arquivo fica em `outputs/ranking-publication-2026-10-14.sql`. Conferir alterações concorrentes das funções antes de aplicar manualmente. Esse pacote contém apenas definição/permissões das funções e recarga do esquema; não contém credenciais. Depois de aplicar, confirmar a nova RPC e a presença da conta na página correspondente.

## Validação

- 461 testes da aplicação e TypeScript aprovados.
- PostgreSQL local via PGlite 0.5.9: 237 perfis, 3 administradores excluídos, 234 candidatos em 12 páginas, candidato de zero pontos na última página, posição preservada na busca, busca sem acentos, limites, pesquisa literal de `%`/`_`, ausência de nomes privados e recusa de acesso anônimo. Ambas as migrações do pacote foram executadas no banco de teste.
- Chromium com respostas de banco simuladas: 240 candidatos, paginação, localização própria, busca, URL, resultado vazio, tamanho da página, troca de seção, erro/recarga, compatibilidade parcial e celular sem rolagem horizontal.
- Build de produção em cópia isolada aprovado. Dados e funções da produção não foram modificados nesta entrega.

Para repetir o teste SQL sem acessar produção, instalar `@electric-sql/pglite@0.5.9` em diretório temporário e executar `scripts/ranking/verify-page-sql.mjs` com `RANKING_SQL_TEST_MODULE` apontando para `dist/index.js` desse pacote.
