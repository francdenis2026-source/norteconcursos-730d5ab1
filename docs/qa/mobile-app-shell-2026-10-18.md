# App shell mobile

O painel autenticado agora ocupa o viewport visível e mantém cabeçalho e navegação inferior fora da área rolável. O conteúdo tem um identificador estável para a restauração do TanStack Router. Ao voltar para uma tela com carregamento assíncrono, um ResizeObserver aguarda a altura necessária para recuperar o ponto de leitura; a primeira interação do usuário cancela essa espera.

O mesmo shell é usado em telas estreitas e em dispositivos de toque até 1023px, incluindo celulares na horizontal. Em desktop com mouse, a rolagem continua no documento. Os comandos de voltar ao início de mídia, flashcards e simulados usam o proprietário de rolagem correspondente. Cabeçalho, menu e rodapé respeitam safe areas; o visual viewport fornece altura e deslocamento quando há teclado. A navegação inferior é ocultada durante a redução do viewport com um campo editável em foco, sem desabilitar zoom.

O aviso modal global de preferência por computador foi removido. O manifesto passa a iniciar o app instalado em `/dashboard?source=pwa`; a autenticação existente continua responsável pelo acesso e redirecionamento. O service worker continua sem armazenar dados privados ou páginas dinâmicas.

## Verificação

- `npm run typecheck`.
- `node --import ./scripts/alias.mjs --test scripts/app-scroll.test.mjs scripts/internal-navigation.test.mjs scripts/guest-progress.test.mjs`.
- `npm run build`.
- Chromium local com Playwright, perfil fictício e todas as chamadas Supabase interceptadas: layout em 320/390px e desktop em 1280px durante a primeira inspeção; confirmação funcional final em 390×844 e paisagem 844×390. Nenhuma consulta ou escrita em contas reais.
- Na confirmação: documento sem rolagem horizontal, barras dentro do viewport, conteúdo com rolagem própria, menu acessível, posição zerada em nova navegação e restaurada para 400px no retorno após carregamento assíncrono, teclado simulado reduzindo o viewport/ocultando a navegação inferior e página pública sem o bloqueio de rolagem do painel.

A simulação de teclado verifica a integração com VisualViewport; não substitui teste físico do teclado/instalação em iOS e Android. O fluxo de foco pausado foi ajustado para participar do layout mobile, em vez de encobrir o cabeçalho.

## Correção da oscilação no navegador

O shell, menu e busca usam `100svh` fora do teclado. Eventos de rolagem e redimensionamento do VisualViewport não aplicam mais altura e deslocamento ao painel inteiro durante animações da barra de endereço. A altura visual é aplicada apenas com campo editável em foco e redução superior a 120px; ao fechar o teclado, as propriedades temporárias são removidas. A referência de altura é renovada quando a largura muda, incluindo rotação.

Confirmação em Chromium mobile: três pares simulados de redução/deslocamento do VisualViewport (40/15px, 70/30px e 0/0px) preservaram exatamente o retângulo do shell. Retrato, paisagem, rolagem interna, menu, retorno com restauração para 400px, teclado simulado e saída para página pública passaram. Typecheck, 27 testes e build de produção passaram. A animação de barras foi simulada; não houve verificação em aparelho físico.
