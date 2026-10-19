# Modo claro: contraste, superfícies e cabeçalho — 19/10/2026

## Diagnóstico e resultado

A paleta anterior usava cartões/popovers/menu lateral em branco puro (`#FFFFFF`) e fundo `#F5F6F8`. A medição inicial encontrou o atalho `Ctrl K` com texto sem contraste no menu lateral e alguns links dourados do painel/treinador a **4,22:1**, abaixo de 4,5:1 para texto comum.

Os fundos compartilhados passam a `#E8EDF3`, cartões/popovers a `#F7F9FC` e menu lateral a `#EEF2F7`. Texto principal `#202834`, apoio `#536171`, bordas `#C8D1DC`. A luminância relativa do fundo cai de 0,921 para 0,842, e dos cartões de 1 para 0,946: redução da emissão da cor no modelo sRGB, sem pretender medir o brilho físico de cada aparelho. Não foram recoloridos documentos, figuras de questões ou imagens para leitura.

O dourado textual e o foco no fundo claro usam `#87570F`, preservando o dourado da marca nos botões e destaques. O atalho de teclado ganha texto e fundo semânticos legíveis. O link de recuperação de senha também usa o tom com contraste suficiente na nova superfície.

| Par de cores | Contraste |
| --- | ---: |
| Texto principal / cartão | 14,08:1 |
| Texto de apoio / cartão | 6,00:1 |
| Dourado textual / cartão | 5,86:1 |
| Texto secundário / controle do header | 5,55:1 |
| Texto principal / cenário claro conservador do header | 8,24:1 |
| Texto escuro / botão dourado | 7,11:1 |

## Cabeçalho e overlays

Header do site público, painel e desafio diário em grafite, com linha dourada e vidro discreto (`blur(18px)`, saturação 1,12). Texto claro, ícones dourados e controles em ardósia tornam a barra distinta do conteúdo. Cores locais ficam restritas ao header, inclusive no celular. Busca, relógios, selo de teste, troca de tema e menu mantêm seus comportamentos.

Os overlays claros na foto principal da homepage e nas imagens de entrada do treinador/concursos perdem o véu residual do lado da imagem. O lado do texto mantém a área opaca para leitura. O vídeo/introdução mantém estrutura e temporização. Os novos estilos de header e overlay são limitados ao modo claro; o tema escuro foi conferido na troca de tema.

## Validação e limites

- **651 testes passaram**, TypeScript e build de produção passaram.
- Chromium com fixtures: homepage, login, painel, treinador, desempenho com histórico carregado e biblioteca. **608 verificações automáticas sem falhas** nos textos avaliados na amostra final, incluindo oito textos do header medidos separadamente com fundo conservador.
- Scanner usa luminância WCAG 2.x: 4,5:1 para texto comum e 3:1 para texto grande. Fotografia/gradientes, transparência sem fundo resolvido e opacidade são excluídos da medição simples. O header recebe estimativa conservadora de fundo `rgb(61,74,92)`; fotografias e recortes foram inspecionados visualmente. Isso não certifica toda combinação de conteúdo, gráfico ou estado da plataforma como WCAG conforme.
- Header conferido em 320, 390, 768, 1024 e 1440 px, sem overflow; busca abre e fecha; menu móvel abre e fecha; alternância claro/escuro funciona.
- Evidências brutas e capturas em `outputs/light-theme-2026-10-19/`, ignorado pelo Git. Testes com conta fictícia e rede simulada, sem escrita no Supabase nem consulta de históricos privados.

Reprodução: `python scripts/qa/light-theme.py after`, com o servidor local na porta 8080. O modo `before` serve para registrar a versão sob inspeção antes de uma mudança; não recria automaticamente uma versão antiga.
