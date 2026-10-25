# Desafio diário — revisão visual

A página usa agora uma área de até 1600 px, com apresentação fotográfica, uma única ação de início, resumo da rodada e lista dinâmica de disciplinas. As instruções ficam em uma faixa compacta. Durante o treino, questão e explicação ocupam a coluna principal; o progresso fica ao lado no desktop e acima no mobile. Mantidos os temas claro/escuro e o destaque dourado.

A lógica de elegibilidade, respostas, armazenamento e renovação do dia no Acre permanece intacta. A quantidade exibida vem das questões realmente disponíveis, separada do limite diário de 10 respostas.

## Verificação realizada

- `npm run typecheck`: passou.
- `npm run build`: passou (avisos de tamanho de chunks já existentes).
- `node --import ./scripts/alias.mjs --test scripts/guest-progress.test.mjs`: passou.
- `python scripts/qa/daily-challenge.py`: passou em Chromium, temas claro/escuro, larguras 320, 390, 768, 1024, 1440 e 1920 px. Conferidos início, escolha, confirmação, explicação e ausência de overflow horizontal.
- Fluxo de 10 respostas: recarregar conserva o progresso, as questões respondidas não reaparecem, resultado é exibido e recarregar após concluir mantém o bloqueio diário.
- Capturas locais da introdução e do treino inspecionadas em desktop e mobile.

Os testes de navegador usam questões fictícias e RPCs interceptadas; não escrevem no banco. Não foi realizado teste em aparelho físico. A publicação na hospedagem depende do deploy após o push.
