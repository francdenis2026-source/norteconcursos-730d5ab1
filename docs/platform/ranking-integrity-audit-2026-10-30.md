# Auditoria de integridade do ranking — 30/10/2026

## Escopo
Código e funções SQL do ranking Geral, Questões e Simulados, sem mudança em pesos, elegibilidade, planos ou desempates. Auditoria somente de leitura no Supabase de produção.

## Critérios existentes (preservados)
- A pontuação é derivada da função `public.score_events()`. Ela só contabiliza questões ativas com gabarito e deduplica respostas por aluno/questão; práticas de repetição não devem render pontuação adicional.
- Questões: pontos derivados do acerto, erro e pedido de ajuda, com controles anti-abuso (4 segundos de resposta, espaçamento e limite por dia); Simulados: critérios próprios de acerto, duração, mínimo de questões para bônus. Não foram alterados.
- Geral: soma dos pontos das questões, simulados, flashcards e redações; horas de estudo aparecem como dado de dedicação e não contam no total da classificação.
- Administradores são excluídos; na listagem Geral, candidatos com zero ponto continuam visíveis; Questões e Simulados exigem pontuação positiva. Busca não altera a posição de classificação.
- Empates são desempatados pelo identificador de usuário para uma ordem estável. Essa é uma limitação existente, não uma nova regra. Não foi alterada sem aprovação do usuário.

## Conferência real (30/10/2026)
- 12 perfis cadastrados; 1 papel administrativo; 11 alunos com eventos de pontuação.
- 329 respostas do Treinador (6 marcadas como repetidas) e 44 respostas de simulados (21 marcadas como repetidas).
- 204 respostas legadas do Treinador sem `question_table` e 20 de simulados: no banco atual, não há colisões de IDs entre as três tabelas de questões ativas, nem respostas legadas com origem ambígua.
- Nenhuma duplicidade de `user_id` foi retornada por `score_events()`.
- Soma atual de eventos: 363 pontos em questões; 60 em simulados; 0 em flashcards/redações; 340 questões consideradas e 2 tentativas de simulado pontuadas.
- Ranking Geral legado versus cálculo independente da ordenação: 11 participantes, **zero divergências de pontos e posições**.
- Rankings de seção: 5 candidatos com pontos de Questões, 1 com pontos de Simulados, zero entradas de pontuação não positiva nesses rankings.

## Proteção implementada
`readRankingPage` rejeita cargas de ranking com usuários duplicados, posições repetidas ou fora de ordem. Assim, dados inconsistentes não aparecem como classificação válida. Testes cobrem os três cenários, sem alterar quem ganha pontos ou como se calcula a posição.

## Pontos de atenção (sem alterar regras)
1. O desempate por UUID mantém ordem determinística, mas não é critério meritocrático. Qualquer substituição por precisão ou data de conquista constitui alteração de regra e exige decisão explícita.
2. A plataforma ainda guarda respostas antigas sem tabela de origem; nenhum problema ativo foi identificado no conjunto atual. É aconselhável continuar atribuindo `question_table` às novas respostas e auditar futuras colisões.
3. Testar a RPC `get_ranking_page` como usuário autenticado após implantação para conferir paginação, busca e a posição própria; a análise somente de leitura não substitui esse teste.
4. Nenhum perfil, resposta, medalha, contador ou pontuação de produção foi alterado nesta auditoria.
