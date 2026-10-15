# Concursos e editais: diagnóstico e correção — 15/10/2026

## Diagnóstico

A rota `/dashboard/questions`, então identificada como “Concursos disponíveis”, consultava apenas `contests`. A leitura do Supabase retornou **zero registros** nessa tabela. Os seletores de carreira e banca dependiam desses registros e eram renderizados mesmo vazios. Não era uma falha de clique do seletor: não havia opções para selecionar.

O acervo em `syllabus_editions` já tinha **53 edições**, das quais uma do ENEM. Há **52 edições de concursos para estudo**, incluindo referências de provas e edições históricas. Elas não são oportunidades com inscrições abertas. O catálogo já utilizado em “Meu edital” oferecia busca, ano, documentação e acesso ao programa; manter outra lista de estudos em paralelo seria redundante.

## Implementação

- A página passa a se chamar **Concursos e editais**, com navegação e chamadas da página inicial consistentes.
- O catálogo de edições foi extraído para um componente compartilhado com “Meu edital”, e a consulta das edições utiliza a mesma função. A página de objetivo exibe as 52 edições de concursos e mantém ENEM fora dessa seleção.
- A busca aceita órgão, cargo e banca, com palavras sem acentos. Os filtros de ano/documentação, paginação, limpeza de filtros e links para a edição exata permanecem comuns às duas entradas.
- Os filtros de oportunidades só aparecem se houver oportunidades publicadas. Quando houver, detalhes e definição de foco continuam disponíveis, separados das edições para estudo.
- A leitura das oportunidades exige `content_status=publicado`, inclusive para administradores, evitando expor rascunhos na experiência do aluno.
- A definição de foco exige o retorno da linha com o identificador da conta e o concurso escolhido antes de apresentar sucesso. Falha no cache local não invalida uma gravação confirmada no banco.
- Falha ao consultar o foco não esconde todo o catálogo. Erros no carregamento de edições oferecem nova tentativa, e catálogos totalmente vazios direcionam ao acervo de questões sem seletores inertes.

Não foram cadastradas oportunidades, inventadas datas, publicados editais ou alterados dados dos alunos nesta correção. As ações de gravação foram exercitadas apenas com requisições simuladas no teste de navegador.

## Verificação

- 558 testes passaram, incluindo proteção para não misturar ENEM na seleção de concursos.
- Tipos e build passaram.
- Chromium com sessão e respostas simuladas: oportunidades vazias com edições existentes; busca sem acentos; filtros de ano/documentação; paginação; limpeza; abertura da edição correta; catálogo compartilhado com “Meu edital”; erro e recuperação; detalhes e filtros de oportunidades; falha de confirmação do foco sem falso sucesso; gravação confirmada para a conta correta; catálogo totalmente vazio; largura de 390 px.
- Leitura atual do Supabase realizada; sessão real autenticada em produção não foi testada.
