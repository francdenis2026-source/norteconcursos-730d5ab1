# Destaques dos rótulos da homepage

| Antes | Depois | Motivo |
| --- | --- | --- |
| Pequenos textos soltos sobre a imagem | Borda lateral dourada, losango e superfície translúcida | Tornar a hierarquia perceptível sem alterar títulos ou seções |
| Acesso aberto com ícone separado | Selo informativo com ícone e texto agrupados | Identificar o estado de acesso com clareza |
| Link de planos semelhante ao texto informativo | Contorno próprio, alvo de 44 px e foco visível | Distinguir ação de informação |
| Destaques com cores divergentes no tema claro | Dourado escuro herdado do token de âmbar da homepage | Manter a relação com as imagens e a legibilidade |

Nove rótulos compartilham o padrão: hero, acesso aberto, preparação, radar de concursos, PCPR, PC-PI, PCAC, planos e FAQ. Elementos informativos ficam estáticos e sem cursor de botão. O link tem transição de cor de 160 ms, sem deslocamento; foco por teclado e movimento reduzido têm resposta imediata.

Validação: TypeScript e ESLint dos arquivos TSX alterados aprovados (sem a regra de formatação preexistente). Chromium em 320, 390, 768, 1024 e 1440 px nos temas claro e escuro, sem transbordamento dos rótulos ou da página e sem erros JavaScript. Destino do link de planos, área de toque e foco por teclado verificados. Nenhum conteúdo, regra do Desafio diário ou condição de plano foi alterado. Validação física em celular/tablet não realizada.
