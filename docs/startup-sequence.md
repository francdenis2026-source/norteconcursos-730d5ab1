# Abertura do site

A abertura é uma sequência por documento: preparação → introdução opcional →
site. A homepage é preparada atrás da tela de abertura e só fica visível e
clicável ao concluir ou pular a introdução. Não voltar a liberar a homepage antes
de iniciar o vídeo.

`startupSequence.ts` coordena a prontidão da rota e o encerramento da introdução,
independentemente da ordem dos efeitos React. `norte:boot-ready` significa que
toda a abertura terminou; não deve ser usado para começar a carregar o vídeo.
O vídeo é preparado durante a abertura e sua moldura é montada por portal no
mesmo `#norte-initial-loading` que contém a arte SSR. O primeiro frame real revela
a moldura; o término/pulo faz uma única transição para a homepage.

Um vídeo que não começa em quatro segundos, falha ou tem autoplay bloqueado é
descartado. A reprodução tem um limite de nove segundos. Economia de dados,
conexão explicitamente lenta e movimento reduzido omitem o vídeo sem baixá-lo.
Depois de revelar o site, uma resposta atrasada nunca pode reabrir a introdução.
O watchdog de vinte segundos preserva o acesso ao conteúdo SSR em caso de falha
total de hidratação. Sem JavaScript, o conteúdo público permanece acessível.

`claimDocumentIntro` mantém a regra: somente abertura/refresh de um documento que
começou na homepage pode tocar o vídeo. Navegação entre menus, retorno do painel,
logout, histórico e retorno da tela de login não repetem a abertura.

Verificações:

- `node --import ./scripts/alias.mjs --test scripts/startup-sequence.test.mjs scripts/document-intro.test.mjs`
- `scripts/qa/startup-sequence.mjs`: vídeo real, registros por frame, falhas de
  mídia/autoplay, preferências, vídeo atrasado e hidratação após o watchdog.
- `scripts/qa/intro-navigation.mjs`: menus, histórico, logout e refresh.
- `scripts/qa/initial-loading.mjs`: arte SSR responsiva, autenticação, ausência de
  JavaScript e recuperação de página inexistente.

Os scripts de navegador usam `PLAYWRIGHT_MODULE` e `BASE_URL` quando necessários;
as chamadas de conta são simuladas e não alteram contas de produção.
