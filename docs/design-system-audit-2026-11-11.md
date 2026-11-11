# Auditoria visual e UX — Norte Concursos

**Skills combinadas:** Impeccable 4.8.2, High-end Visual Design, UI/UX Pro Max e Design System.

## Estado inicial

A varredura estática do Impeccable percorreu 692 arquivos CSS, TS e TSX e encontrou 80 ocorrências de padrões visuais repetidos, principalmente barras laterais coloridas de 3–4 px. Também foram encontrados usos de Inter em superfícies de estudo, fundos decorativos em grade e uma transição elástica.

A varredura estática é um inventário inicial; contraste, texto pequeno, clipping e comportamento real precisam de navegador em desktop e mobile.

## Prioridade de trabalho

1. Consolidar tokens semânticos de cor, tipografia, foco, borda, raio e espaçamento.
2. Reduzir camadas CSS sobrepostas no shell autenticado e na homepage.
3. Unificar navegação desktop/mobile sem duplicação de comandos.
4. Revisar dashboard, edital, cronograma, biblioteca, questões e simulados como superfícies de alta frequência.
5. Validar estados vazios, carregamento, erro, confirmação, acessibilidade e responsividade.
6. Revisar homepage pública, administração e áreas de conta.

## Critérios de entrega

Cada área deve preservar dados, permissões, regras de estudo e rotas; funcionar em 1440, 1024 e 390 px; manter claro/escuro legível; ter foco visível, alvos de toque adequados e nenhum conteúdo cortado. Cada fase deve passar typecheck, lint, build, testes relevantes e revisão visual no navegador.
