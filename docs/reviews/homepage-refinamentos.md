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
