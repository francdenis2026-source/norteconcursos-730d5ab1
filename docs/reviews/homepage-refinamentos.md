# Refinamento da homepage existente

O usuário esclareceu que deseja aperfeiçoar a página atual, sem substituí-la por uma composição diferente. A exploração foi retirada: rota, componentes e capturas dos três protótipos foram removidos. Nenhuma das três versões foi promovida.

| Before | After | Why |
| --- | --- | --- |
| Faixa de preparação com margem externa da seção e preenchimento interno de 48 px | Sem preenchimento externo duplicado; preenchimento interno de 32 px e mínimo de 400 px no desktop | Reduzir espaços mantendo a imagem, os textos e as duas colunas |
| Painel desktop de 292 px | Painel de 272 px; celular permanece em 240 px, com rolagem acessível | Preservar altura ao alternar entre as quatro abas |
| Texto de apoio nas abas com 12 px | 13 px, quebra de palavras e coluna com min-width:0 | Melhorar leitura sem expandir a faixa |
| Cartões inclinando com quatro variáveis CSS por evento de ponteiro | Cartões estáveis; feedback nas bordas e ações | Reduzir trabalho de estilo e manter o conteúdo legível |
| Hover de ações também aplicado a toque | Movimento de hover condicionado a mouse; pressão de 100 ms e movimento reduzido respeitado | Evitar deslocamento persistente após toque |
| Menu com entrada de 240 ms e saída ease-in | Ponteiro: 180/120 ms com --ease-out; teclado: imediato | Resposta rápida sem atraso em teclado |
| Algumas ações de concursos com 36–40 px no celular | Mínimo de 44 px | Melhorar precisão de toque |
| “1 questões disponíveis / 1 cadastradas” | “1 questão disponível / 1 cadastrada” | Corrigir pluralização |

**Approve para o movimento alterado.** Propósito: feedback e indicação de estado. Sem nova biblioteca. O efeito do distintivo e a introdução em vídeo existentes foram preservados; não se declara revisão integral de toda a animação legada.

Validação: título, lista/ordem das quatro seções principais e URLs de imagens comparados automaticamente com a página anterior, sem mudanças. As quatro abas foram verificadas em 320/390/768/1440 px, claro/escuro: 32 estados, sem overflow horizontal e sem aumento da faixa ao alternar. Cadastro e desafio usam os componentes reais; a contagem unitária foi simulada apenas no navegador. Teclado nas abas, foco ao fechar o menu, Escape, abertura por teclado sem animação e abertura por ponteiro em 180 ms passaram. Sem exceções JavaScript.

Typecheck e build de produção passaram. ESLint de lógica passou para os arquivos TSX alterados; o arquivo index.tsx contém formatação Prettier preexistente e foi verificado com essa regra desativada para evitar reformatar toda a página. Não houve verificação de toque, safe areas ou PWA em aparelho físico. Nenhuma alteração em quota ou renovação do desafio diário.

## Correção dos fundos das faixas

| Before | After | Why |
| --- | --- | --- |
| Arte de concursos limitada a uma miniatura lateral de 166 px | A mesma imagem como fundo absoluto da seção inteira | Recuperar a faixa ilustrada de ponta a ponta |
| Fundo de planos com 58% de largura, 280 px de altura, opacidade 16% e máscara que o apaga | Fundo de largura/altura integral, incluindo comparação e FAQ, sem máscara | Manter a composição contínua até o final da seção |
| Opacidade do fundo reduzida a 5% no claro | Imagem com opacidade integral e véu de contraste próprio do tema | Preservar a imagem sem perder o tema claro |
| Leitura diretamente sobre detalhes da arte | Proteção localizada nas condições do teste, aviso, comparação e FAQ | Evitar apagar o fundo inteiro para proteger textos pequenos |

Chromium: 320/390/768/1440 px em claro/escuro, sem overflow horizontal, arte de concursos cobrindo a seção e fundo de planos com a mesma altura da área completa. Abertura do FAQ e da comparação verificada. Sem exceções JavaScript; typecheck e build passaram. Capturas verificadas em desktop e celular emulado. Conteúdo, imagens e destinos das ações preservados. As imagens usam enquadramento responsivo `cover`, sem o recorte fixo anterior em uma miniatura. Validação em hardware físico continua pendente.

## Fechamento das quatro pendências de movimento

| Before | After | Why |
| --- | --- | --- |
| Distintivo com entrada de 1,5 s, giro ao clicar, acompanhamento do ponteiro e flutuação/brilho/sombra em loop | Entrada única de 200 ms com `--ease-out`, transform/opacity, seguida de pose estática (`src/styles/home.css:4492`); a imagem e as camadas de profundidade permanecem (`src/components/landing/HeroBadge.tsx:6`) | A entrada suaviza a chegada após a introdução. Os demais movimentos decorativos competiam com a mensagem; removê-los elimina listeners, variáveis herdáveis por quadro e o reflow forçado do giro |
| Carrossel suave também no teclado | Setas e ativação de botões pelo teclado usam `instant`; clique/toque nos controles mantém `smooth`, respeitando movimento reduzido (`src/components/landing/HomeRail.tsx:63`) | Resposta imediata em ações frequentes, preservando navegação por toque |
| Hover de cartões com transform/sombra sem distinção de ponteiro | Regras de hover desses cartões dentro de `(hover:hover) and (pointer:fine)`; cartões e ações também não se deslocam com movimento reduzido (`src/styles/home-refinements.css:78`) | Evitar deslocamentos persistentes em toque e respeitar acessibilidade |
| Regra de hover claro também alcançava a aba ativa | Hover apenas em abas não selecionadas, com mouse (`src/styles/home-light.css:117`) | Preservar de forma explícita a distinção da seleção |

**Approve para as quatro pendências revisadas no ambiente testado.** Movimento novo: apenas entrada decorativa ocasional de 200 ms, com a curva compartilhada e sem propriedades de layout/filtro animadas. Sem nova dependência. O distintivo não recebe eventos de ponteiro nem simula um controle sem acessibilidade. A navegação, o vídeo de introdução, as imagens, as seções e os fundos corrigidos na etapa anterior permanecem.

Verificação Chromium em claro/escuro, mouse e toque emulado: nenhum loop no distintivo, entrada de 200 ms, cor/fundo da aba ativa estáveis sob hover, cartões imóveis no toque, hover preservado no mouse, carrossel imediato nas setas e botões acionados pelo teclado, clique suave e movimento reduzido sem animação. Cartões imóveis também com movimento reduzido em desktop. Larguras adicionais de 320/768 px sem overflow; sem exceções JavaScript. Typecheck, lint dos componentes e build de produção passaram.

**Celular físico continua pendente.** Não há aparelho conectado ao ambiente; emulação não certifica gesto real, Safari/iOS, safe areas, PWA ou desempenho a 60/120 FPS. A aprovação acima se restringe ao código e aos comportamentos verificados no navegador, sem promessa de desempenho em hardware real.
