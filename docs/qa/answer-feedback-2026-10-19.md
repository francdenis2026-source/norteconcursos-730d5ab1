# Questões públicas e correção das respostas

## Acesso anônimo conferido

- API pública `get_daily_guest_questions`, sem sessão autenticada: HTTP 200 com 7 questões. As 7 passaram pelo filtro de elegibilidade do cliente.
- Site publicado em contexto limpo: `/desafio-diario` abriu as 7 questões no desktop; enunciado e botões Certo/Errado ficaram disponíveis.
- Site publicado, sem login, em 390 px: `/dashboard/question-trainer` redirecionou para `/desafio-diario`, permitindo iniciar a rodada pública.
- A conferência no site real não enviou respostas nem alterou dados. A rodada observada usava a data do Acre retornada pelo servidor, 2026-10-18.

## Melhoria de interface

Um componente comum às duas áreas mostra “Você acertou” ou “Você errou”, seguido de sua resposta e gabarito lado a lado. Texto, ícone e cor identificam o resultado; as escolhas também sinalizam o gabarito e a resposta incorreta selecionada. O bloco entra na área visível após confirmação, sem deslocar o foco do usuário. Não há correção antecipada, antes da confirmação ou quando a resposta não pôde ser salva.

Mantidos limites de visitante e plano, pontuação, armazenamento das respostas, explicações, fontes e renovação à meia-noite do Acre. Nenhum enunciado ou gabarito foi alterado.

## Validação

- Typecheck e build de produção: passaram.
- Regressões de progresso de visitantes, limites de planos, filtros e aprendizado do Treinador: passaram.
- `scripts/qa/daily-challenge.py`: temas claro/escuro, larguras 320/390/768/1024/1440/1920 px; acerto e erro explícitos, comparação correta, bloco visível e ausência de overflow. Recarregar preservou progresso; 10 respostas mantiveram o bloqueio diário.
- `scripts/qa/answer-feedback.py`: C/E em 390 px e alternativas em 1280 px, acerto/erro, temas claro/escuro; gabarito e resposta selecionada corretos; payload salvo com `is_correct` correspondente; falha simulada de salvamento não mostrou resultado e permitiu nova tentativa. Ícone acompanha a cor semântica do resultado.
- Capturas do resultado de erro inspecionadas em mobile e desktop.

Testes funcionais em Chromium com RPCs e escritas interceptadas localmente; nenhum teste escreveu no banco real. Não foram usados aparelhos físicos.
