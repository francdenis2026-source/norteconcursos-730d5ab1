# Retomada do treinador e integração de desempenho — 15/10/2026

## Correções

- O treinador antes dependia do cleanup de React para salvar uma sessão e removia a cópia ao restaurá-la. Agora salva posição, filtros, alternativa, riscos, resultados e tempo ativo no navegador, por conta, durante o treino e no descarregamento da página. Retoma após atualizar, valida as referências no catálogo elegível atual e mantém as respostas confirmadas sem reenviá-las. Não expira uma sessão só por terem passado quatro horas. Encerrar ou concluir a sessão remove a retomada. Não há sincronização desse rascunho entre aparelhos.
- Meu desempenho antes descartava todas as fontes quando `my_difficulty_analysis` não estava disponível (confirmado PGRST202 no banco). Cada fonte agora é independente. O fallback por disciplina usa a primeira resposta de cada questão/fonte e limita tempos antigos a 900 segundos; não inventa assunto. Dados indisponíveis são sinalizados, sem tratá-los como histórico vazio.
- Atualização dos indicadores a cada 30 segundos com a página visível e ao voltar à janela; o relógio ativo existente continua independente. Não foi criada uma promessa de atualização instantânea.
- Trilha conecta leituras marcadas, atividades declaradas no cronograma, questões, simulados e ações de reforço por disciplina. Sinais de reforço exigem cinco respostas e acerto inferior a 60%. As marcações de vídeo/PDF não são apresentadas como prova de consumo integral. Atividades antigas não registradas não são reconstruídas.
- Erros da primeira resposta sem classificação de revisão contam como pendentes no histórico. O caderno de erros mantém seu filtro de questões ainda ativas; contagens históricas podem incluir itens que saíram de circulação.

## Conteúdo publicado no Supabase

Apenas dois registros de `official_exam_questions`, referentes ao mesmo item de responsabilidade civil do Estado nas provas PC-SE 2021 (Escrivão e Agente):

- `91b670cc-2823-4cc8-ae6e-8cfcf1aabed8`.
- `5e3ce656-a340-43ca-b705-40329931ed4f`.

Foram alterados somente `review_note` e `law_version_checked_at`. Explicação simples do gabarito C, culpa exclusiva versus concorrente, risco administrativo, ônus da prova, exemplos contrastantes e atualização do STF. Enunciado, gabarito, origem, vínculos e status preservados. O publicador admite agora o propósito restrito `explanation-improvement` para itens ativos, preservando as salvaguardas do fluxo anterior.

Fontes oficiais conferidas:

- [Constituição, art. 37, § 6º — Planalto](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm).
- [STF, Tema 1.237, ARE 1.385.315](https://noticias.stf.jus.br/postsnoticias/stf-decide-que-estado-tem-responsabilidade-por-morte-ou-ferimento-de-vitimas-de-armas-de-fogo-em-operacao-policial/). Notícia de 11/04/2024, com atualização sobre embargos de dezembro de 2024; conferência em 15/10/2026.

Dry-run com consulta atual ao banco e validação do edital oficial ativo: dois registros pendentes. Publicação: dois atualizados. Reconsulta integral posterior: dois preservados, zero pendentes, nenhuma diferença fora do patch. Cada gravação exige correspondência de todos os campos anteriores para não sobrescrever alterações concorrentes.

Snapshots, pacote completo, fontes brutas e relatórios de execução ficam somente em `outputs/review-responsabilidade-2026-10-15/`, ignorado pelo Git. Nenhuma credencial foi gravada nos arquivos.

## Verificação

- 567 testes automatizados passaram, incluindo falha de RPC opcional, análise por disciplina, isolamento de fontes, revisão pendente e publicação concorrente.
- TypeScript e build de produção passaram. As consultas novas de leituras e cronograma também foram executadas com sucesso no banco real.
- Chromium com Supabase simulado: retomada na questão 2 com seleção, riscos e tempo preservados, primeira resposta não reenviada, encerramento removendo o rascunho; indisponibilidade de RPC preservando os demais indicadores; falha de respostas mantendo simulados/leituras/cronograma; largura de 390 px sem transbordamento.
- Os testes de interface usam dados controlados, sem escrever respostas de alunos no banco real. A publicação das duas explicações foi validada no Supabase real. A disponibilização do código no site depende do deploy após o push.

## Evidências privadas

- `package.json`: SHA-256 `9560c43b8534556ed3da8c427e83bc2a50215be9936cd14efbfd6b50f5ca01b8`.
- `norte-cf-current.html`: SHA-256 `9ab6cdda21d659df53457a5638fa6585a4211b3b220b8e48e155e059760d7bcf`.
- `norte-stf-bala.json`: SHA-256 `9a0434dad85f42ed7a078e0b855066493f3c3b1a5b2e965ed56cbb4cd78d3e96`.
