# Espaço de estudo e cronômetro por questão — 19/10/2026

## Diagnóstico

Em Chromium com questões curtas de teste, o desafio público em 1024×1366 ocupava aproximadamente 321 px de altura na coluna da questão. O restante ficava vazio. O treinador logado tinha cronômetro, mas não aproveitava o espaço inferior com apoio ao estudo. O desafio público não exibia tempo por questão.

## Alterações

- Componente compartilhado de orientação de estudo abaixo da questão, no desafio diário e no treinador logado. Reutiliza a imagem local `painel-aluno-estudo.webp`, sem novas dependências ou downloads externos.
- Painel adapta a orientação antes/depois da confirmação, sem antecipar gabarito ou inventar explicações. A questão, a correção e a navegação permanecem antes do painel.
- No tablet, a coluna pública usa a altura disponível com limite de composição de 980 px. A questão mantém sua altura natural; o espaço adicional fica no painel de estudo. No treinador, o painel mantém altura natural para não acrescentar uma tela vazia abaixo dos controles já existentes. No celular, imagem e texto se empilham.
- Desafio público ganha identificação da questão e o relógio compartilhado com o treinador: mostrador analógico com marcações, arco dos segundos e leitura digital em alto contraste, em preto e dourado. Não é uma contagem regressiva nem impõe prazo para responder.
- Novo controlador público mede tempo monotônico por questão, pausa com aba oculta ou 120 segundos sem interação, congela após confirmação e reinicia ao trocar de questão. A contagem é local à questão aberta; não é gravada no banco nem persistida após recarregar a página. O controle e a persistência de tempo já existentes do treinador foram preservados.
- Leitores de tela podem consultar `role=timer`, sem anúncio a cada segundo. Estados pausado/finalizado possuem texto; contraste e cores forçadas preservados.

Não houve alteração de questões, gabaritos, explicações, cotas, planos, regras de renovação no Acre ou escrita no Supabase.

## Verificação

- 650 testes existentes passaram; TypeScript e build de produção passaram.
- Chromium com fixtures: desafio em 320, 390, 768, 1024 e 1440 px, claro/escuro; introdução, alternativas, confirmação, correção e explicação sem overflow. Progresso preservado após recarregar, rodada de dez respostas e bloqueio diário conferidos.
- Relógio público com tempo controlado no navegador: avança; não conta 60 segundos de aba oculta; retoma; pausa por inatividade; congela após resposta; reinicia na próxima questão.
- Treinador logado com fixtures: relógio avança e cabe em 320, 390, 768, 1024 e 1280 px; painel de estudo disponível. Capturas de tablet em pé 1024×1366 e inspeção visual realizadas.
- Capturas e logs em `/tmp`, fora do Git. Não foram usados históricos privados de alunos nem aparelhos físicos.
