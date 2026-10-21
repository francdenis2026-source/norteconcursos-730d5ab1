# Uma sessão por conta, em qualquer dispositivo

A implementação anterior usava Web Locks, que só detecta abas do mesmo navegador. O bloqueio entre dispositivos depende desta migração no Supabase:

`supabase/migrations/20261022010000_enforce_single_authenticated_session.sql`

## Ativação

Execute **o arquivo inteiro**, de `begin;` até `commit;`, no SQL Editor do projeto `gkwphadbveiyjcwiiizw`. Alternativamente, configure `SUPABASE_ACCESS_TOKEN` nas configurações seguras do ambiente e execute:

```sh
node scripts/auth/publish-single-session.mjs
```

O comando aplica apenas esta migração e verifica a função, os gatilhos e as permissões. Depois de aplicar, atualize as páginas abertas para usar a RPC instalada. `--dry-run` apenas identifica o arquivo e seu hash. A chave pública e a chave de serviço REST não substituem o token de gerenciamento para executar SQL.

**Enviar código à main não aplica esta migração.** O cliente integrado usa `verify_account_session`; na ausência dessa função, conserva a compatibilidade com a tabela de sessões já existente. O bloqueio transacional de gravações entre dispositivos só passa a existir depois da instalação desta migração. Erros de conexão ou permissão não recebem a exceção de compatibilidade.


## Funcionamento

- Cada inserção de uma sessão no Supabase Auth registra o proprietário da conta no servidor. O navegador não pode escrever nessa tabela nem reivindicar uma sessão antiga. IPs compartilhados e troca de rede não alteram a regra.
- A ordenação usa `auth.sessions.created_at` e, no empate, o ID da sessão. A renovação do token preserva a sessão; não provoca expulsões.
- A sessão anterior recebe a mudança via Realtime; uma verificação a cada dois segundos cobre perda de eventos. Retorno à aba, reconexão e restauração da página também reconferem a sessão. Dispositivos suspensos ou sem rede só conseguem atualizar a interface quando voltam, mas suas gravações já estão bloqueadas no banco.
- Gatilhos de instrução validam todas as gravações autenticadas nas tabelas públicas existentes, incluindo alterações feitas por RPCs `SECURITY DEFINER`. Um bloqueio transacional na linha do proprietário impede que uma gravação já autorizada termine depois da conclusão da troca de titularidade.
- A saída do aparelho anterior usa apenas o escopo `local`; não desconecta o novo aparelho nem envia um último salvamento com respostas antigas.
- O registro de propriedade permanece após a saída. Uma sessão antiga não volta a ser proprietária quando o aparelho novo sai.
- Sem confirmação do servidor, o cliente suspende a área autenticada e tenta novamente, preservando os tokens em falhas de rede.

Fluxos anônimos, trabalhos administrativos com `service_role` e o Desafio diário público mantêm suas permissões existentes. A migração não apaga respostas. A cada novo login, revoga também as sessões mais antigas do Auth e seus tokens de renovação, preservando a regra da implementação existente. Tokens de acesso já emitidos são recusados pelos gatilhos de gravação.

Ao criar novas tabelas públicas, instale também o gatilho `norte_require_current_session` nessa migração futura. Funções de servidor que usam `service_role` em nome de um usuário precisam validar a sessão do usuário antes de executar mutações privilegiadas; não recebem essa proteção automaticamente.

## Validação

```sh
node --import ./scripts/alias.mjs --test scripts/account-session.test.mjs scripts/device-session-database.test.mjs scripts/session-idle.test.mjs scripts/session-tab.test.mjs scripts/session-resume.test.mjs scripts/study-clock.test.mjs scripts/session-snapshots.test.mjs
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/device-sessions.mjs
```

Os testes PostgreSQL locais usam PGlite e executam o SQL real contra um esquema de Auth representativo. Verificam migração repetida, sessões existentes, login novo, token renovado, logout, inserção atrasada, permissões da tabela, gravações diretas e RPC com privilégios elevados. O teste de navegador usa contextos independentes para aluno e administrador, incluindo perda de rede e retorno do dispositivo antigo. Os testes não alteram contas reais.
