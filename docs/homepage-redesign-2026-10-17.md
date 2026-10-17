# Homepage — imagens restauradas e layout compacto

A abertura voltou a usar a imagem original `landing-hero.webp` como fundo. O vídeo de introdução toca uma vez e, ao terminar, sai com uma transição breve e é removido do DOM. A imagem e o conteúdo assumem a mesma área, sem player permanente nem aumento de altura. O visitante pode pular a introdução. Redução de movimento e economia de dados mostram a imagem diretamente; bloqueio de autoplay, erro ou carregamento travado também liberam a imagem. O cabeçalho continua disponível durante a abertura.

As imagens originais `careers-team.webp` e `lineup-carreiras-ajustada.webp` foram restauradas nas seções de carreiras e encerramento. A campanha PCAC mantém sua imagem. O layout continua com temas claro e escuro, navegação móvel e acesso ao Desafio diário.

Para encurtar a página, as descrições das seis ferramentas, os detalhes das provas, os recursos dos quatro planos e os critérios de revisão jurídica ficam em blocos expansíveis. As oito carreiras permanecem visíveis. O rodapé passou a ter três grupos expansíveis, preservando todos os links institucionais e de acesso. Não foram reduzidas as cotas gratuitas nem modificados dados de questões ou planos.

## Medições e validação

As medições abaixo usam Chromium, na mesma largura de janela e com os detalhes recolhidos. A coluna anterior corresponde à versão `9a87879`.

| Tela                 | Altura anterior | Altura atual | Rodapé fechado |
| -------------------- | --------------: | -----------: | -------------: |
| desktop (1440 px)    |         4991 px |      3567 px |         117 px |
| mobile (390 px)      |         7713 px |      5026 px |         158 px |
| mobile-dark (390 px) |         7713 px |      5026 px |         158 px |
| narrow (320 px)      |         8838 px |      5334 px |         158 px |
| tablet (768 px)      |         5532 px |      3861 px |         161 px |

- Chromium/Playwright: imagens carregadas, nenhuma largura excedida, âncoras válidas, oito carreiras e quatro planos preservados; abertura e fechamento dos detalhes de ferramentas, recursos dos planos, fontes, rodapé e provas; menu móvel fechando por Escape. Sem erros de execução capturados nesses cenários.
- Oito cenários da introdução: desktop, celular, pular, movimento reduzido, economia de dados, autoplay bloqueado, mídia indisponível e conexão travada. Todos terminaram sem vídeo no DOM, com foto carregada e conteúdo visível. Os dois modos de economia não solicitaram o vídeo.
- O build padrão Cloudflare de produção foi concluído com sucesso. Os 602 testes existentes passaram. Lint dos arquivos alterados e verificação de whitespace passaram.
- axe-core: nenhuma violação detectada nos critérios automatizados WCAG A/AA executados na homepage clara em 1440 e 390 pixels e escura em 390 pixels. Isso não substitui uma auditoria manual completa.
- O typecheck continua com os cinco diagnósticos anteriores, fora da homepage, sobre propriedades opcionais de `QuestionFigures` e `SimulatorQuestion.figures`. Nenhum diagnóstico nos arquivos desta alteração.

O build de produção é executado em cópia descartável para preservar os identificadores de versão rastreados no checkout. O script de preview existente procura `dist/server/server.js`, enquanto o Nitro gera `.output`; essa configuração anterior não foi alterada. A publicação do site segue o pipeline do repositório conectado após o envio à `main`.
