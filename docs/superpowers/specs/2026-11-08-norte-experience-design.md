# Norte Concursos — Design de experiência orientada por desempenho

## Intenção
Transformar o Norte Concursos em uma experiência guiada pela próxima melhor ação de estudo. O aluno deve entender rapidamente seu objetivo, o que precisa fazer hoje e como seu desempenho está evoluindo.

## Usuários e contexto
Candidatos a concursos públicos, principalmente de segurança pública, que alternam entre edital, legislação, questões, simulados e revisão em celular, tablet ou desktop.

## Objetivos
- reduzir a dúvida sobre por onde começar;
- conectar edital, treino, revisão e desempenho;
- manter a biblioteca completa disponível sem torná-la o centro da navegação;
- preservar regras atuais de conteúdo jurídico, progresso, desafio diário e autenticação;
- manter acessibilidade, responsividade e suporte offline já previstos no produto.

## Não objetivos
- reescrever a arquitetura do Supabase;
- remover ferramentas existentes;
- alterar regras de pontuação, quotas ou conteúdo jurídico;
- ativar pagamentos ou IA sem validar suas integrações.

## Critério de falha
A remodelação falha se acrescentar mais cartões, menus ou indicadores sem tornar a próxima ação do aluno mais clara.

## Abordagens consideradas
1. **Biblioteca como centro:** privilegia a amplitude de materiais e ferramentas. É coerente com o escopo atual, mas mantém a escolha excessiva para iniciantes.
2. **Treinador orientado por desempenho — escolhida:** usa objetivo, edital, desempenho e erros para recomendar a próxima ação. Reduz carga de decisão e aproveita as regras e dados já existentes.
3. **Fluxo totalmente linear:** força todos os alunos a seguir a mesma sequência. Simplifica a interface, mas não atende candidatos em fases ou editais diferentes.

A abordagem 2 foi escolhida porque preserva a plataforma completa e cria uma entrada simples para o estudo diário.

## Direção de experiência
A navegação principal deve se organizar em cinco jornadas: Objetivo, Hoje, Treino, Revisão e Progresso. Biblioteca, leis, materiais e ferramentas continuam acessíveis como recursos de apoio.

A área inicial do aluno deve responder, nesta ordem:
1. qual concurso/edital está ativo;
2. qual é a próxima ação recomendada;
3. por que ela foi recomendada;
4. quanto já foi feito e qual lacuna merece atenção;
5. como retomar uma sessão interrompida.

## Decisões do builder
- começar pela área autenticada do aluno, mantendo a faixa de boas-vindas existente;
- reutilizar hooks, navegação e métricas existentes antes de criar novas entidades;
- tratar o dashboard como orquestrador, deixando o treinador e o desempenho como destinos detalhados;
- validar cada área em mobile e desktop antes de avançar para a seguinte.

## Próximas etapas
1. mapear o dashboard e a navegação atuais;
2. identificar a menor mudança que cria uma próxima ação clara;
3. implementar essa área isoladamente;
4. validar typecheck, lint e testes relevantes;
5. repetir para Treino, Revisão e Progresso.
