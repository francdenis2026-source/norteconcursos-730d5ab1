# Design: fluxo de concurso, cargo e disciplinas no edital

## Intenção

Corrigir a tela de Edital eletrônico para que o aluno escolha primeiro um concurso ativo da plataforma, depois um cargo daquele concurso, e só então veja as disciplinas e os assuntos cadastrados para a edição selecionada.

## Objetivos

- Listar concursos ativos sem misturar cargos na primeira escolha.
- Mostrar apenas os cargos disponíveis para o concurso escolhido.
- Carregar disciplinas e assuntos da edição exata (concurso + cargo + ano).
- Limpar cargo, edição e tópicos quando o concurso muda.
- Manter a contagem de questões e os links dos assuntos existentes.

## Fora do escopo

- Alterar tabelas, políticas ou dados do Supabase.
- Mudar a página de detalhe do assunto.
- Criar uma seleção “todos os concursos”.

## Abordagens consideradas

1. **Dois seletores dependentes (escolhida):** concurso ativo → cargo → edição e tópicos. É o fluxo pedido, torna a dependência explícita e requer apenas ajuste do estado e das consultas da tela.
2. **Seletor hierárquico único:** concurso como grupo e cargos como opções internas. Economiza espaço, mas torna a escolha menos clara e piora a navegação em telas pequenas.

## Decisões de implementação

- A consulta inicial continua em `syllabus_editions` com `status = active`.
- Concursos são agrupados por nome; o rótulo inclui ano quando houver mais de uma edição para o mesmo cargo.
- Depois do concurso, cargos são derivados das edições filtradas e ordenados alfabeticamente.
- Se um cargo tiver mais de um ano, um terceiro seletor de edição/ano aparece para evitar escolher uma edição arbitrária.
- A consulta de `syllabus_topics` só roda quando existe uma edição selecionada.
- Ao trocar concurso, cargo ou edição, o estado dependente e os tópicos anteriores são zerados antes do novo carregamento.

## Critério de sucesso

Ao selecionar um concurso ativo, o cargo correspondente aparece; ao selecionar o cargo (e, se necessário, o ano), a tela mostra as disciplinas e os assuntos daquela edição, sem depender da primeira linha retornada pelo banco.
