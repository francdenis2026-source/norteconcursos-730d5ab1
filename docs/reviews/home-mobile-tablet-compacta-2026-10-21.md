# Homepage compacta no celular e no tablet

| Antes | Depois | Por quê |
| --- | --- | --- |
| Três colunas de navegação, QR Code e contatos empilhados | Dois grupos de links; acesso junto da marca; QR apenas no desktop | Reduzir altura sem perder os destinos de navegação |
| E-mail e telefone extensos nos espaços estreitos | Ações E-mail e WhatsApp, com destinos e nomes acessíveis completos | Evitar quebras e manter contato direto |
| Marca com distintivo duplicado e assinatura na borda da tela | Marca compacta e crédito no rodapé em telas até 1100 px | Liberar espaço e reduzir competição visual |
| Fundo nítido sob blocos de leitura no mobile/tablet | Blur estático de 3 px somente na camada fixa de fundo | Destacar o texto mantendo a identidade da imagem |
| Introduções soltas no fundo | Superfícies de vidro discretas nas introduções e no rodapé | Contraste consistente nos dois temas, sem desfocar os textos |
| Sete descrições de ferramentas sempre expostas | Itens nativos expansíveis, com abertura exclusiva | Manter todos os textos e reduzir a altura inicial |
| Cadastro e desafio repetidos na apresentação das ferramentas | Convites concentrados na hero e acessos mantidos no rodapé | Evitar repetição sem remover jornadas |
| Margens herdadas e espaços vazios | Espaçamentos menores e remoção da linha anual vazia do plano Gratuito | Compactar a composição sem esconder condições dos planos |

## Medidas locais

Chromium, viewport com 1000 px de altura, tema claro, seções no estado inicial. São medidas de navegador, não de celular físico.

| Largura | Rodapé antes → depois | Homepage antes → depois |
| --- | --- | --- |
| 390 px | 796 → 561 px (−30%) | 5433 → 4634 px (−15%) |
| 768 px | 673 → 395 px (−41%) | 4577 → 4193 px (−8%) |
| 1024 px | 621 → 395 px (−36%) | 4356 → 4049 px (−7%) |

## Validação

- TypeScript, ESLint do arquivo alterado (excetuada a regra de formatação já pendente no arquivo) e build de produção aprovados. Build em cópia temporária para preservar arquivos de versão.
- Chromium nas larguras 320, 390, 600, 768, 1024, 1100 e 1440 px, em ambos os temas, sem transbordamento horizontal ou erros JavaScript.
- Links do rodapé com altura mínima de 44 px até 1100 px; QR aparece somente acima desse limite.
- Abertura exclusiva das ferramentas, fechamento por teclado, navegação do rodapé para a aba Carreiras e alternância das demais abas aprovados.
- Blur restrito ao fundo; links e textos sem filtro. As superfícies têm fundo sólido como reserva quando backdrop-filter não está disponível, além de variantes para transparência reduzida e cores forçadas.
- Navegação, textos e condições dos planos, fontes, FAQ e regras do Desafio diário preservados.

**Approve:** implementação e verificação no navegador. Validação em aparelhos físicos continua pendente.
