# Faixas deslizáveis e introdução em tablets

## Decisões

- Planos: quatro cartões juntos no desktop; faixa horizontal até 1100 px, com dois cartões e indicação do próximo em tablets, ou um cartão maior e indicação do próximo em celulares.
- Oportunidades: duas entradas lado a lado em telas maiores; faixa horizontal até 700 px.
- Etapas, carreiras, critérios jurídicos, FAQ e comparação de planos continuam fixos ou expansíveis: são conteúdos de consulta, não precisam de um carrossel adicional.

A faixa usa rolagem nativa com snap, sem biblioteca adicional e sem avanço automático. Há controles anterior/próximo, indicação da posição e acesso por teclado. O gesto vertical e o zoom não são interceptados. As condições e preços dos planos não mudaram.

## Vídeo

A regra anterior ignorava qualquer tela abaixo de 768 px, incluindo tablets compactos em orientação vertical. O início automático agora é elegível a partir de 600 px, mantendo a imagem inicial em telefones pequenos, economia de dados e redução de movimento.

O arquivo MP4 existente foi inspecionado: H.264 High, yuv420p, 1280×660, 5 segundos, sem necessidade de recodificação. Ele agora é a primeira opção de fonte, seguido por WebM. Propriedades muted/defaultMuted/playsInline e atributo de compatibilidade são configurados antes de uma única tentativa explícita de play.

Se houver NotAllowedError, a imagem e as ações permanecem disponíveis e o botão “Ver introdução” permite uma tentativa pelo gesto do usuário. Erro de mídia usa a imagem como reserva. Reprodução, fim, pular e limites de tempo preservam o fade e a remoção do vídeo.

## Evidência

TypeScript e build de produção aprovados. `scripts/qa/homepage-rails.py` verifica reprodução/retry em 600/768/1024, MP4 real no Chromium em viewport de tablet, fontes/atributos, fim e retorno à imagem, controles/teclado/rolagem em 1440/1024/768/600/390/320, economia de movimento e erro de mídia. Cenários de bloqueio e falha usam eventos de mídia controlados.

`scripts/qa/homepage-rail-touch.py` verifica gesto de toque nativo via CDP a partir da posição zero, deslocamento dos cartões, ausência de transbordamento da página e captura do tema escuro. Isso valida Chromium com entrada de toque e dimensões de tablet; não constitui teste em um iPad físico ou no Safari instalado nele.

Nos testes de larguras, cada caso usa uma página independente para que a restauração de rolagem da navegação não misture posições entre casos. A roda horizontal avança a largura de um cartão para respeitar o snap nativo.

Nenhum registro de produção, limite gratuito ou política de plano foi alterado.
