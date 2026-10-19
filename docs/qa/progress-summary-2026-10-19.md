# Retomada: desempenho, presença e rodadas públicas — 19/10/2026

## Estado encontrado e preservado

Repositório atualizado por fast-forward até `9f58428`. A correção da presença já estava na main (`f430961`): validade por tempo monotônico, falha visível e nova consulta periódica. A API real retornou HTTP 200, com zero pessoas e janela de 90 segundos; zero é um resultado válido. Não houve nova mudança nessa funcionalidade.

Conferência no Supabase real das rodadas de **18 a 31/10/2026**, correspondentes à rodada original e às próximas 13 autorizadas: **14 rodadas, 140 posições**, todas já preenchidas com questões elegíveis no pool atual do servidor. Cada rodada tem posições 1–10, dez IDs e hashes distintos, hashes iguais ao conteúdo elegível e gabaritos 5 C/5 E. Não foi necessário substituir qualquer posição nesta retomada. Não alteramos questões, cotas, rodadas posteriores ou dados de alunos.

A consulta de data oficial retornou **18/10 no Acre**, embora a data UTC já fosse 19/10. A distinção foi preservada. O pool elegível tinha 660 questões na consulta inicial. Elegibilidade é a aplicação das regras atuais do servidor, não uma nova auditoria jurídica de cada questão.

Auditoria reproduzível, somente leitura:

```sh
# SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem existir no ambiente autorizado.
NODE_USE_ENV_PROXY=1 node scripts/guest/audit-scheduled-rounds.mjs 2026-10-18 14
```

Snapshots e resultados brutos ficam em `outputs/round-repair-2026-10-19/`, ignorado pelo Git. Credenciais não são gravadas pelo script.

## Implementação desta retomada

Resumo “Seu progresso” na página existente **Meu desempenho**, antes dos cartões de tempo e trilha:

- Períodos de 7 dias, 30 dias e histórico completo, por datas do Acre; padrão 30 dias.
- Aproveitamento visual, acertos e questões novas respondidas; dias com prática e simulados concluídos separados.
- Evolução em pontos percentuais entre duas metades temporais do período, exigindo ao menos cinco questões em cada metade.
- Maior aproveitamento por disciplina e pontos a fortalecer: amostra mínima de cinco questões por disciplina; reforço abaixo de 60%.
- Atalhos para o treinador com disciplina pré-selecionada e início automático, reutilizando `practiceSearch` e os limites existentes do plano.
- Histórico completo e análise por assunto existentes preservados e identificados como tais. A sequência de estudos continua no indicador existente.

Aproveitamento usa a **primeira resposta histórica** a cada par origem/questão, antes de aplicar o filtro de período. Repetições contam como atividade, sem inflar o aproveitamento. Simulados não são somados aos acertos do treinador. “Dias com prática” considera respostas e simulados concluídos; não afirma medir todas as leituras ou horas estudadas. Relógio compartilhado da plataforma, datas inválidas e futuras excluídas. Falha de consulta exibe indisponibilidade, não zero inventado. Nenhuma nova tabela, rastreamento ou alteração de plano.

## Validação

- **649 testes passaram**, incluindo seis novos testes de período, fronteira de data do Acre, duplicatas e fontes distintas, dados vazios, evolução e amostras mínimas.
- TypeScript e build de produção passaram.
- Chromium com respostas simuladas, sem usar contas reais: filtros alteram contagens; link mantém disciplina e início automático; operação por teclado; botões de no mínimo 44 px; larguras 320/390/768/1280 sem overflow; temas claro e escuro; histórico vazio; respostas indisponíveis sem zeros falsos; sem erros JavaScript.
- Testes existentes de presença passaram. A presença foi consultada na API real; a interface de desempenho foi validada com fixtures, não com o histórico privado de um aluno.

O progresso usa a atualização já existente de 30 segundos enquanto a página está visível. Não é uma previsão de aprovação nem certificação de domínio. A disponibilidade dos atalhos depende do acervo elegível na disciplina e do plano do aluno.
