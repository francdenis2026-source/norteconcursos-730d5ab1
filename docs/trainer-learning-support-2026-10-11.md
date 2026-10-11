# Revisão integrada no treinador

O botão “Estou em dúvida” foi substituído por “Entender este assunto”. Antes de responder, o clique exibe um aviso acessível e discreto com ícone SVG de cadeado. A revisão só abre após a confirmação do salvamento da resposta da questão atual, inclusive para respostas recuperadas do histórico. Selecionar uma alternativa, aguardar um salvamento ou ter uma falha de rede não libera o conteúdo. Navegar entre questões fecha a revisão e limpa o aviso.

Após responder, a revisão reúne o gabarito, o comentário existente, exemplos destacados, fontes vinculadas e até três materiais ativos da biblioteca. A relação jurídica usa a identidade oficial do diploma; outras disciplinas exigem correspondência de assunto na mesma disciplina. O primeiro material da disciplina deixou de ser usado como indicação automática. Quando não há vínculo suficiente, a interface informa a ausência em vez de recomendar conteúdo alheio.

Os flashcards existentes do material selecionado são carregados sob demanda e permitem revelar respostas dentro da revisão. O aluno pode abrir o conteúdo completo em outra aba sem abandonar o treino. Não há geração de conteúdo jurídico, criação de questões ou alteração de materiais nesta entrega.

A consulta posterior não modifica a resposta salva nem reduz a pontuação por ajuda prévia. Novas respostas usam `asked_for_help: false`, pois não há ajuda disponível antes do envio. O selo ambíguo “Não afeta ranking” foi corrigido para “Ranking de questões”. Registros históricos permanecem preservados.

Validação: testes de acesso e correspondência por disciplina/lei, suíte de regressão, TypeScript e compilação de produção. A verificação não inclui uma sessão de aluno autenticada em produção; a publicação visual depende do deploy associado à main.
