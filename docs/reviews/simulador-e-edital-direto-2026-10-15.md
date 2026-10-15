# Simulador de provas e acesso direto pelo edital — 15/10/2026

## Funções distintas

- **Treinador:** estudo questão por questão, com correção imediata e comentários após confirmar a resposta.
- **Simulador:** tentativa cronometrada, mapa, marcações, gabarito oculto até finalizar e diagnóstico ao final.

O simulador antes usava basicamente sorteio por filtros. Agora oferece:

1. **Resolver uma prova cadastrada:** busca por concurso/cargo/banca/ano; todos os itens elegíveis disponíveis da prova selecionada, sem completar com outros concursos ou autorais. Ordena pelo número do item quando disponível. Informa que o caderno pode ser parcial e que a duração é escolhida pelo aluno, não certificada como oficial.
2. **Criar meu simulado:** nome, filtros, quantidade e duração; sorteio sem repetição dentro da seleção. A falta de questões é informada, sem preenchimento com outros conteúdos.

A área ENEM mantém o recorte exclusivo por suas disciplinas/áreas. Permissões e limites dos planos foram preservados.

## Funcionamento

- Ranking duplicado e exploração secundária do acervo foram substituídos por links às áreas dedicadas.
- Alternativas são identificadas pelo enunciado: múltipla escolha CEBRASPE não é convertida automaticamente em Certo/Errado. Cada controle de resposta mostra o texto da alternativa.
- Textos de apoio vinculados às questões oficiais são carregados como no treinador. Itens sem contexto necessário continuam excluídos.
- IDs internos incluem a tabela para evitar colisões; a gravação mantém o UUID original da questão.
- Sessão salva neste navegador, por conta e por área, com posição, respostas, marcações e prazo original. Retomada confere o catálogo atual e recusa itens removidos ou com enunciado/gabarito alterado. Fechar não pausa nem renova o prazo; uma sessão vencida é finalizada ao retomar.
- Tentativa usa UUID estável. Resumo e respostas são inseridos sem sobrescrever registros existentes e conferidos por leitura posterior. Nova tentativa de salvar usa o mesmo UUID e ordens, sem duplicar a tentativa. Falhas parciais oferecem **Salvar novamente**; descartar resultado não salvo exige ação explícita. Continua sendo uma operação em duas tabelas, sem transação única: a interface só confirma depois de ler resumo e detalhes.
- Resultado informa acerto bruto e reforço nas disciplinas com erros/itens em branco, com link ao treinador. Não apresenta o percentual como nota oficial, pontuação com penalização ou TRI.

## Meu edital: direto às questões

**Resolver questões desta prova** inicia diretamente o treinador com a edição fixa, sem configuração/filtros. O atalho de edição não herda o limite automático de dez itens do atalho genérico; mantém os limites diários do plano e revisão das respostas anteriores. Seleção vazia ou indisponível não abre questões de outro concurso nem mostra filtros como saída automática.

A edição da Câmara dos Deputados / Policial Legislativo Federal / 2026 tinha banca ausente, embora as questões oficiais identificassem CEBRASPE. Esse campo pode agora ser resolvido somente quando há uma única banca nos itens elegíveis do mesmo concurso/cargo/ano. Se houver ambiguidade, a seleção continua bloqueada. A origem da identificação é informada na tela.

Conferência de leitura no Supabase real:

- Edição `4a921f62-cece-4638-9170-2dbdcc190f28`: banca nula no cadastro.
- 165 registros oficiais ativos; **79 questões elegíveis** após os critérios atuais de conteúdo/contexto, identificadas como CEBRASPE.
- Não é certificação de prova integral. Questões pendentes não foram liberadas para aumentar a contagem.
- Evidência privada em `outputs/simulator-2026-10-15/camara-verification.json`, ignorada pelo Git.

## Validação e limites

- **581 testes passaram**, cobrindo escopo, banca ausente inequívoca/ambígua, alternativas, sorteio, retomada, conteúdo alterado e repetição após falha de gravação.
- TypeScript e build de produção passaram.
- Chromium com Supabase simulado: prova específica, ordem de itens, múltipla escolha CEBRASPE, correção oculta, retomada de respostas/marcações, falha de detalhes e repetição sem duplicar tentativa, criação personalizada, cancelamento, prazo vencido, ENEM isolado e tela de 390 px.
- Chromium com contas gratuita e paga: Meu edital → primeira questão sem filtros, escopo restrito, retomada, edição vazia, erro de consulta e identificação da banca ausente no exemplo da Câmara.
- Testes de interface não gravaram respostas em contas reais. A conferência da Câmara foi somente de leitura; nenhum conteúdo ou metadado editorial foi alterado no banco nesta tarefa.
- Retomada local ao navegador, sem sincronização entre aparelhos. O código na main depende do deploy para aparecer no site.
