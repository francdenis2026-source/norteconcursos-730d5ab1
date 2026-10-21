# Uma sessão por conta entre dispositivos

O login mais recente assume o acesso. O aplicativo verifica a propriedade antes de
montar páginas autenticadas, a cada 15 segundos e ao retornar ao primeiro plano ou
recuperar a conexão. Eventos Realtime da tabela antecipam essa conferência quando
a publicação está habilitada. A aba/dispositivo anterior limpa seus tokens locais
e abre `/auth?reason=another-device`. O bloqueio de abas do mesmo navegador e o
logout por cinco minutos de inatividade continuam independentes.

## Implantação

A tabela `public.active_user_sessions` já existe no projeto. Enquanto a função
abaixo não estiver implantada, o cliente usa essa tabela: apenas um novo login pode
substituir a chave; restauração, refresh de token, polling e nova tentativa apenas
consultam. Uma conta existente pode registrar a chave somente se a linha estiver
vazia, usando inserção que não sobrescreve conflitos. A chave identifica a sessão
do Supabase Auth, não o tipo de aparelho ou sua impressão digital.

Aplicar integralmente pelo SQL Editor do Supabase ou pelo fluxo de migrações:

`supabase/migrations/20261021170000_enforce_account_session.sql`

Depois, aplicar a migração complementar:

`supabase/migrations/20261021213000_register_account_session_on_auth_login.sql`

Ela registra automaticamente o novo login por um trigger `AFTER INSERT` em
`auth.sessions`, sem depender de o cliente chamar a RPC. Também registra a sessão
mais recente de cada conta já existente e revoga as antigas, inclusive das contas
que ainda não passaram pelo guard. Preserva usuários, perfis e progresso. A
inserção de uma sessão de Auth é o evento de login; `UPDATE`/renovação de token
não reassume a conta. A migração é transacional e pode ser repetida. O trigger
usa o mesmo bloqueio por conta e a mesma ordem de sessões da RPC de verificação.

Depois, recarregar os clientes. A migração pode ser executada novamente e preserva
a tabela. Ela habilita Realtime quando a publicação `supabase_realtime` existe,
retira escrita direta dos clientes e instala `verify_account_session(boolean)`.
A função usa `auth.uid()`, `auth.jwt().session_id` e a ordem de criação em
`auth.sessions`. Somente o login válido mais recente pode assumir a conta. Sessões
anteriores são excluídas de `auth.sessions`, revogando seus refresh tokens por
cascata. Sessões criadas posteriormente não são apagadas, mesmo em uma corrida
entre logins. Nenhuma credencial administrativa é enviada ao navegador.

Sem essa migração, a exclusividade é imposta pela interface usando a tabela
existente; a revogação centralizada de sessões/refresh tokens e a prevenção de
escrita direta por um cliente modificado dependem do SQL. Tokens de acesso já
emitidos continuam sujeitos à validade do JWT; excluir uma sessão de Auth não
invalida instantaneamente o JWT em todo endpoint externo. Não usar essa proteção
de interface como substituta das políticas RLS dos dados.

Uma falha de rede ou de permissão não é tratada como outro dispositivo: a área
autenticada é bloqueada com nova tentativa, sem apagar os tokens. Uma divergência
confirmada de sessão provoca logout local, mesmo se a chamada Auth estiver lenta.
Não se usa `signOut(scope: 'global')`, que encerraria também o login vencedor.

A RPC usa o token atual já recebido pelo observador de autenticação em uma
requisição direta, sem esperar pelo `getSession()` ou pelo Web Lock do SDK. A
renovação do token atualiza essa referência sem recriar ou reassumir a sessão.
O prazo de oito segundos cobre a operação inteira, mesmo se uma dependência
ignorar o sinal de cancelamento. Respostas atrasadas não podem reabrir acesso
depois de uma falha ou revogação. O teste de navegador mantém o Web Lock real do
Supabase preso e confirma a consulta e o logout local nessa condição.

## Validação

- `node --import ./scripts/alias.mjs --test scripts/account-session.test.mjs scripts/session-idle.test.mjs scripts/session-tab.test.mjs`
- `PGLITE_MODULE=/caminho/pglite/dist/index.js node scripts/qa/account-session-sql.mjs`
- `PGLITE_MODULE=/caminho/pglite/dist/index.js node scripts/qa/account-session-login-sql.mjs`
- `PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/account-devices.mjs`

Os testes de navegador usam contextos isolados e endpoints simulados, sem contas
reais. O teste SQL executa a migração real em um PostgreSQL isolado com o esquema
Auth mínimo, incluindo verificação da cascata e das permissões.
