# Revisão do treinador de questões — 14/10/2026

## Experiência

A configuração foi organizada em três passos: objetivo da prática, conteúdo e tamanho/ordem da sessão. Disciplina, assunto e banca ficam em destaque; concurso, cargo, prova, origem e outros recortes passam para Refinar seleção. Filtros sem alternativas úteis são omitidos, preservando restrições já selecionadas. ENEM e concursos continuam em acervos exclusivos, com limpeza dos filtros ao trocar de área.

O cabeçalho usa uma apresentação simples, sem a fotografia decorativa. A resolução remove os indicadores duplicados de ranking e a moldura que imitava uma janela. Eliminar alternativas passa a ser uma ferramenta opcional. Questões sem texto de apoio ficam excluídas, com uma explicação recolhida sobre a indisponibilidade; a opção de incluí-las no treino foi retirada.

Após salvar uma resposta, a correção aparece na própria questão, com a alternativa marcada, gabarito e trecho do comentário existente. Comentário completo, fontes e materiais continuam acessíveis por ação explícita. A janela automática de correção e o botão de conteúdo bloqueado antes de responder foram retirados. Materiais só são consultados ao abrir a explicação após a resposta; a discussão da questão é secundária e carrega ao ser aberta.

Falhas de gravação aparecem junto à resposta e são limpas ao tentar novamente, sem revelar a correção antes de salvar. Isso evita uma mensagem antiga de falha cobrindo uma resposta já registrada.

O resultado mostra aproveitamento, acertos, erros e quantidade, distingue revisão de primeira resposta e oferece configurar um novo treino ou consultar desempenho. A configuração retorna ao próprio treinador, sem encaminhar para um banco diferente.

## Integridade do treino

- O tamanho efetivo respeita o acervo disponível e o saldo diário conhecido de novas respostas. Revisão permanece separada da pontuação e desse limite.
- Cada sessão começa com um novo identificador de resposta; o mesmo identificador é reutilizado em uma tentativa de gravação que falha, evitando sobrescrever uma resposta de outra sessão.
- Respostas de reforço já salvas ficam bloqueadas ao voltar à questão na mesma sessão. O histórico temporário retém modo e respostas ao navegar para outra área e retornar, com validação dos dados restaurados e compatibilidade com registros antigos.
- A proteção de saída continua ativa após a última resposta até que o aluno abra o resultado. O relógio de questão já registrada não é reapresentado como um novo tempo de resolução ao revisitá-la.

Sem criação/edição de questões, alteração de gabaritos ou migração de banco nesta revisão. Regras de acesso e fontes jurídicas existentes foram preservadas.

## Validação

519 testes passaram, incluindo regressões para tamanho da sessão, saldo diário, revisão sem consumo de novas respostas e restauração de tentativas válidas/inválidas. TypeScript e build de produção verificados.

No Chromium, com autenticação, acervo de questões fictícias e persistência simulados: isolamento ENEM/concursos, filtros de erros, correção na tela sem abertura automática de janela, bloqueio de reenvio no reforço, abertura dos materiais após responder, confirmação de saída inclusive após a última resposta, resultado/configuração, eliminação opcional e recuperação de falha de gravação passaram. Navegar para outra rota e retornar preservou modo, seleção e bloqueio do reforço sem outra gravação. Verificadas telas de 320 e 390 px sem rolagem horizontal. O teste não usou contas de alunos nem gravou respostas no Supabase de produção.
