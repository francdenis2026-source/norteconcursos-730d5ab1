# Recuperação do carregamento da página e do aplicativo

## Falhas reproduzidas

1. A folha de estilos do Google Fonts estava no cabeçalho SSR como `rel=stylesheet`. Ao manter sua resposta pendente no Chromium, a versão publicada permaneceu com `document.readyState=loading`, sem first paint ou first contentful paint após oito segundos. Os scripts inline posteriores também podem aguardar folhas de estilos anteriores. Isso permite uma tela vazia mesmo com o HTML principal retornando HTTP 200.
2. Com uma sessão local expirada e o endpoint de renovação sem resposta, `/dashboard` permaneceu em “Verificando seu acesso…” durante os 25 segundos observados. O provedor aguardava `getSession()` sem prazo nem ação de recuperação.

Os dois problemas são reproduzíveis por simulação de rede. A simulação não confirma qual requisição ficou pendente na rede do usuário.

## Correções

- Google Fonts foi removido das folhas de estilos obrigatórias do HTML. A folha opcional é acrescentada depois da montagem com `media=print` e passa para `media=all` apenas após o carregamento. As fontes de reserva existentes permitem renderizar imediatamente; a tipografia aprovada continua sendo usada quando disponível.
- A verificação inicial de autenticação oferece erro recuperável após 15 segundos. O painel não interpreta timeout como logout e não redireciona para a página inicial enquanto a verificação falhou. “Tentar novamente” reinicia a verificação, sem apagar tokens ou cadernos. Uma conclusão válida tardia ainda é aceita; não há liberação de dados protegidos antes de confirmar o usuário.

## Validação

- Chromium desktop/celular, folha externa pendente: first contentful paint observado em aproximadamente 1,4 s e 0,6 s no servidor local, com conteúdo visível.
- Folha externa respondendo ou falhando: página também renderiza; a folha só se torna ativa quando carregada.
- Renovação de sessão sem resposta: erro após 15 segundos, token preservado, rota preservada, botão de nova tentativa funcional.
- Visitante sem sessão continua sendo redirecionado para fora do painel protegido.
- A versão publicada foi navegada sem sessão em `/`, `/auth`, `/dashboard`, `/dashboard/question-trainer`, `/dashboard/mock-exams` e `/desafio-diario`, em desktop e celular. Não houve falhas de JavaScript/chunks nesses testes. `www` redirecionou para o domínio principal e o link Entrar levou ao formulário de login.
- O service worker atual só intercepta manifesto e ícones, sem cache de HTML, JS ou respostas do Supabase. Não foi necessário apagar sessões ou alterar o banco.

## Reproduzir os testes de navegador

Com `npm run dev -- --host 0.0.0.0 --port 3000` em execução, um Chromium em `/usr/bin/chromium` e `@playwright/test` instalado em um prefixo externo:

```sh
NORTE_TEST_DEPS_DIR=/caminho/do/prefixo node scripts/qa/optional-font-loading.mjs
NORTE_TEST_DEPS_DIR=/caminho/do/prefixo node scripts/qa/auth-startup.mjs
```

Os testes usam interceptação HTTP e credenciais sintéticas; não entram em contas reais nem gravam dados no Supabase. O deploy precisa ser confirmado separadamente do push na main.
