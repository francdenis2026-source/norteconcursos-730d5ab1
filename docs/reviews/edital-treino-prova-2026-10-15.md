# Treino da prova escolhida em Meu edital — 15/10/2026

## Diagnóstico e mudança

Meu edital já oferecia prática por assunto na página de cada tópico. Esse vínculo usa o edital atual ao qual uma questão foi classificada e pode conter itens originalmente aplicados em outros concursos. Não existia uma ação geral para resolver somente a prova da edição selecionada.

A página da edição agora oferece **Resolver questões desta prova**, com a quantidade de itens oficiais elegíveis identificados no acervo. O recorte exige concurso, cargo, banca e ano, reutilizando a normalização existente para variações de nomes. Não usa apenas disciplina ou vínculo ao assunto. Questões autorais, pessoais, de repertório, sem texto de apoio necessário ou de outras provas não entram. A validação editorial e de vigência continua a cargo do catálogo compartilhado já existente.

O treinador recebe a edição por URL, consulta sua identificação e restringe o catálogo antes de aplicar os demais filtros. Os seletores podem refinar esse recorte; não conseguem ampliá-lo para outros concursos. A tela identifica a prova e oferece retorno ao edital na mesma aba. Retomada e histórico continuam funcionando. O modo catálogo permite revisar questões já respondidas sem pontuar novamente.

A funcionalidade é genérica para as edições e para contas gratuitas/pagas, mantendo autenticação, limites diários e regras de pontuação. Quando não há itens identificados ou faltam metadados para identificar a prova, a edição informa a indisponibilidade. Não oferece um botão que abriria questões de outra prova. Falhas de consulta ao edital bloqueiam o treino restrito e oferecem tentativa novamente.

As quantidades refletem somente o acervo elegível disponível e não certificam que o caderno integral da prova esteja cadastrado. Os atalhos de prática por assunto foram preservados e sua diferença em relação ao treino da prova está explícita.

## Verificação

- 571 testes automatizados passaram, incluindo distinção de ano, banca, cargo, estado, fonte e vínculo a assunto remapeado; metadados incompletos não produzem seleção ampla.
- TypeScript e build de produção passaram.
- Chromium, com Supabase simulado: fluxo Meu edital → treinador em conta gratuita e paga, seleção restrita, retomada após recarregar, filtro conflitante vazio, edição sem questões, falha de consulta e tentativa novamente; largura de 390 px sem transbordamento.
- Consulta somente de leitura no Supabase real: 53 edições disponíveis, 41 com correspondência nos metadados de questões oficiais ativas. Esse número não é cobertura editorial: o catálogo aplica filtros adicionais de elegibilidade e pode reduzir a quantidade. Evidência bruta em `outputs/edital-practice-2026-10-15/`, fora do Git.
- Nenhuma questão, gabarito, edital ou credencial foi alterado no banco por esta tarefa. A disponibilidade do código no site depende do deploy após o push à main.
