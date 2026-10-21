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
