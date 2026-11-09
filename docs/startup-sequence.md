# Abertura do site

A abertura agora é direta: arte da marca → hidratação da rota → homepage. A
tela de abertura permanece apenas enquanto o router prepara a página; não existe
vídeo, introdução cinematográfica ou animação longa bloqueando o conteúdo.

A logomarca tem somente uma entrada curta e discreta (fade-in com deslocamento
mínimo). O slogan e os textos acompanham a entrada sem atrasos em cascata. A
preferência de movimento reduzido desativa as animações.

`startupSequence.ts` libera a homepage assim que a rota confirma a hidratação.
A sequência não aguarda mídia, autenticação em rotas públicas ou um evento de
vídeo. O watchdog de dez segundos é apenas uma proteção para falha total de
hidratação e revela o conteúdo SSR caso o JavaScript não consiga iniciar.

O carregamento inicial prioriza apenas a imagem de abertura, a logomarca e a
imagem principal da homepage. Insígnias não essenciais deixaram de competir
pela prioridade de rede durante a primeira pintura.

Verificações:

- `bun run test` inclui `scripts/startup-sequence.test.mjs`.
- `scripts/qa/startup-sequence.mjs` deve confirmar que a homepage aparece
  após a hidratação e que nenhum vídeo de introdução é solicitado.
- `scripts/qa/initial-loading.mjs` verifica o fallback SSR, acessibilidade e
  ausência de JavaScript.
