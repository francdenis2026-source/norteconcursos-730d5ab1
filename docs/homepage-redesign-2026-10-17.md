# Homepage — reorganização visual de 17/10/2026

A homepage foi refeita para reduzir a fragmentação, dar hierarquia ao conteúdo e acomodar os blocos no desktop e no celular. Os estilos agora usam o escopo próprio `.home`, em vez de depender das várias gerações de regras `.lp` e `.hp` do arquivo global. As páginas internas mantêm seus layouts.

A abertura combina uma mensagem principal com o vídeo de introdução em uma área própria. O conteúdo e a navegação ficam disponíveis durante a reprodução. O vídeo mantém a proporção integral de 1280 × 660, oferece pausa e repetição e não baixa automaticamente com redução de movimento ou economia de dados. Falhas de carregamento mantêm a página utilizável.

O acesso gratuito, o Desafio diário e o catálogo foram agrupados; as seis ferramentas usam uma grade; as quatro etapas seguem uma sequência; as campanhas PCPR e PCAC compartilham a mesma seção. Os detalhes da prova do Paraná ficam em um bloco expansível. Carreiras, rastreabilidade, quatro planos, perguntas frequentes e todos os destinos institucionais foram preservados. As faixas animadas e chamadas decorativas repetidas deram lugar a informações estáticas organizadas.

A paleta usa azul profundo na abertura e no encerramento, superfícies neutras e dourado com contraste ajustado. Os temas claro e escuro continuam disponíveis e persistem após recarga. O cabeçalho tem menu móvel com navegação por âncoras e acesso à conta. As correções acessíveis incluem nome do botão do vídeo coerente com seu texto, marca identificada como imagem e nome nativo do link do desafio.

## Validação

- Os 602 testes existentes passaram. O lint dos arquivos TS/TSX alterados e a verificação de whitespace passaram.
- O build de produção Vite/Nitro foi validado em uma cópia descartável, preservando os identificadores de versão rastreados no checkout.
- Chromium/Playwright: larguras de 320, 360, 390, 768, 1440 e 1920 pixels, com tema claro e também escuro no celular. Nenhum elemento ultrapassou a largura da janela; nenhuma âncora interna ficou sem destino. Menu móvel, seis ferramentas, detalhes da prova e perguntas expansíveis foram verificados. Não houve erro de execução capturado nesses cenários.
- Reprodução automática, pausa, repetição, preferência por movimento reduzido, economia de dados, bloqueio de autoplay e falha de mídia foram exercitados. O vídeo só foi solicitado após interação nos dois modos de economia. A contagem de questões foi exercitada também com dados simulados grandes, e a persistência do tema foi conferida após recarga.
- axe-core: nenhuma violação nos critérios automatizados WCAG A/AA executados na homepage clara em 1440 e 390 pixels e escura em 390 pixels. Isso não substitui uma auditoria manual completa de acessibilidade.
- O typecheck do repositório continua com cinco diagnósticos anteriores, fora da homepage: propriedades opcionais de `QuestionFigures` em errors, mock-exams, question-trainer e desafio-diario, além de `SimulatorQuestion.figures`. Não houve diagnóstico nos arquivos alterados.

A lógica de limite e renovação das dez questões gratuitas diárias no horário do Acre foi preservada. Não houve alteração de questões ou de configurações de pagamento neste trabalho. O envio à `main` sincroniza as alterações com o repositório conectado; a publicação do site depende do pipeline existente.

## Execução local do build

O build padrão Cloudflare foi gerado com sucesso. O comando existente `npm run preview` procura `dist/server/server.js`, enquanto o Nitro gera `.output`; essa incompatibilidade de preview não foi alterada nesta tarefa. Para verificar também a renderização de produção local, a cópia descartável foi construída com `NITRO_PRESET=node-server npm run build` e servida pelo entrypoint `.output/server/index.mjs`, sem mudar o preset ou o script do repositório. O servidor retornou HTTP 200 com HTML da homepage renderizado, e as verificações de layout e interação também passaram nesse build.
