# Central de exercícios
Desenho para aprovação no chat. Evolui `/dashboard/exercicios`; não cria rota nova.

## Intenção
Área para aprender resolvendo: o aluno escolhe disciplina e assunto, lê o exercício, tenta resolver e, a qualquer momento, vê a resposta e o passo a passo. Difere do Treinador, que mede desempenho por baterias e ranking.

## Objetivos
- Filtros de disciplina e assunto sobre todos os exercícios da plataforma: autorais dos materiais e banco de questões de provas.
- Resposta oculta por padrão; botão "Ver resposta e passo a passo" sempre disponível, antes ou depois de responder.
- Visual de folha, largura inteira da janela, sem caixas extras.

## Não objetivos
- Sem ranking, medalhas ou alteração de desempenho (continua como hoje: "nada disso altera o ranking").
- Sem mudança de servidor, tabelas ou regras de acesso.
- Não substitui o Treinador nem o Caderno de erros.

## Antiobjetivo
Inventar passo a passo. Questão sem `resolutionSteps` mostra gabarito e explicação, com aviso de que não há resolução passo a passo.

## Abordagens consideradas
1. Evoluir `/dashboard/exercicios` (escolhida): reaproveita `PracticeSession` e o tipo `Question`, evita tela duplicada.
2. Página nova: mais rápida, mas duplica a área de exercícios.
3. Modo "estudo" no Treinador: mistura duas áreas que devem ser distintas.

## Desenho
- Fonte unificada: exercícios autorais (`authoredMaterialPractice`, como hoje) + questões do catálogo (`useQuestionCatalog`), normalizados para `Question`.
- Filtros: Disciplina → Assunto (assuntos derivados da disciplina escolhida, com contagem). Sem filtro, nada carrega.
- Um exercício por vez, com anterior/próximo e contador "4 de 12".
- Resposta: o aluno marca Certo/Errado (ou alternativa) e/ou abre "Ver resposta e passo a passo", que mostra gabarito, `explanation`, `resolutionSteps`, `studyTip`, base legal quando houver.
- Estado vazio, carregando e erro tratados; botão "Tentar novamente".

## A critério de quem constrói
Tamanho da lista por assunto, ordenação (autorais primeiro) e rótulos exatos dos botões.
