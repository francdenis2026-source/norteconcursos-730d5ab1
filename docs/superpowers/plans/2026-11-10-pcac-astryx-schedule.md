# Cronograma PC-AC com Astryx
Continuação autorizada da remodelação compacta: instalar os pacotes indicados e aplicar o mesmo padrão ao cronograma, conferindo interações, temas e tela cheia.
- Instalar Core, Neutral, StyleX e CLI; inicializar documentação. Fixar 0.7.11 para respeitar o mínimo de 24h do bunfig.
- Extrair PcAcCronogramaCard para componente testável, preservando cálculo, persistência, cargos e PDFs.
- Aplicar TabList e Button Astryx, sincronizar tema com o aplicativo, corrigir cascade layers, rótulos e mensagens de erro.
- Usar painel flexível, sem alturas fixas diferentes por modo; grade compacta e tabela detalhada adaptada ao celular.
- Verificar navegação por mouse/teclado, preferências, dias mínimos, recarga, cargo, PDFs e contraste em claro/escuro e tela normal/cheia.
- Executar TypeScript, build, suíte e doctor da Astryx antes de integrar na main.

## Resultado e verificação
- Core/Neutral/CLI 0.7.11, StyleX 0.19.1 instalados; bun.lock atualizado sem desabilitar minimumReleaseAge.
- TabList e Buttons Astryx reais; tema acompanha a classe dark do app. Abas móveis em duas colunas, painel com rolagem interna, rótulos associados aos campos e pelo menos um dia ativo.
- Recalcular altura em resize, mudança do modo de foco e fullscreenchange; remover aplicação da classe legada de cronograma à página.
- Corrigida exportação PDF Norte + QR: SVG rasterizado para PNG antes de addImage. Erro reproduzido pelo navegador antes da correção, download confirmado depois.
- Chromium com o componente real e cargo convidado: matriz de 16 casos (320/390/768/1366 px, claro/escuro, modo de foco/normal) passou sem overflow e com um painel ativo; entrada/saída de fullscreen nativo passou.
- Interações: horas/horário persistem após recarga; último dia não pode ser removido; navegação por teclado; troca de cargo remove plano exclusivo do Investigador e retorna à semana; mudança de tema em tempo real; downloads dos dois PDFs — todos passaram.
- Build de produção, TypeScript e ESLint nos arquivos alterados passaram. Astryx doctor --built .output/public: zero falhas; avisos de detecção de importação do tema/fonte externa permanecem.
- Suíte completa final: 869 passaram e 3 falharam nas mesmas importações JSON preexistentes de discipline-hub, library-navigation e material-practice, já reproduzidas na base.
- Limite: testes de navegador usaram entrada local isolada e o componente de produção; não havia sessão de aluno autenticada para validar a rota em produção e sincronização remota.
- Revisão própria: preservados cálculo do cronograma, isolamentos por usuário/cargo, progresso e exportações; nenhum dado remoto alterado.
