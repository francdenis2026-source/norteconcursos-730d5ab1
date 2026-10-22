# Auditoria dos menus da área do aluno — 22/10/2026

## Escopo e método

Visita no navegador às 35 páginas disponíveis na configuração atual do aluno, inspeção dos títulos, seleção da seção e navegação contextual, e leitura dos componentes e rotas. Autenticação e respostas Supabase simuladas localmente, sem alteração de contas ou dados de produção. Os estados vazios foram observados com esse conjunto controlado; não significam ausência de conteúdo no banco real. A auditoria avalia arquitetura de informação e navegação, não comprova todos os fluxos de edição, pagamento, importação ou resolução com dados reais.

Nove seções principais mais o painel inicial. “Resolver com IA” está desativado por `AI_ENABLED = false`, portanto não foi contado como página disponível. Acesso administrativo fica fora do menu do aluno.

Nenhum menu foi removido ou movido nesta auditoria. As recomendações abaixo são uma proposta de organização.

## Diagnóstico prioritário

1. **Planejamentos concorrentes.** Estratégia de estudos já tem semana, horários e distribuição; Cronograma por edital organiza outra execução por tópicos; Plano por resultados também pede carreira, horas e data. São funções diferentes, mas a repetição de configuração sugere três planos concorrentes. Apresentar uma entrada principal “Meu planejamento”, com etapas “Configuração”, “Agenda por edital” e “Ajustes pelos resultados”. Antes de fundir configurações, verificar a sincronização entre as fontes de dados.
2. **Objetivo e edital pouco distintos.** Meu concurso é um resumo do objetivo; Concursos e editais escolhe oportunidades; Meu edital, sem edição selecionada, mostra novamente um catálogo. O aluno precisa entender onde escolhe o concurso e onde acompanha o edital escolhido. Usar “Meu objetivo”, “Buscar concursos” e “Estudar pelo edital”, com a seleção atual explícita.
3. **Materiais jurídicos dispersos.** Legislação e súmulas e Leis extravagantes têm buscas relacionadas. Manter uma entrada principal de legislação com filtro/localizador de leis especiais, preservando os conteúdos e suas rotas. “Extravagantes” é um termo técnico e precisa de descrição.
4. **“Ferramentas” mistura rotina com conteúdo.** Cronômetro é rotina de estudo; Painel do CTB é material jurídico interativo; calculadora é recurso especializado. Levar Foco e revisão para o planejamento, CTB para legislação e manter a calculadora como recurso jurídico relacionado. Evitar redistribuir antes de atualizar os atalhos e a busca global.
5. **Página sem identificação no estado vazio.** Minhas provas e diagnóstico exibe “Você ainda não cadastrou nenhuma prova” sem `h1` da área nesse estado. Preservar título e descrição, explicando que são provas de concursos realizados, não simulados da plataforma.
6. **Contexto de público.** ENEM é uma área própria e útil, mas aparece no mesmo nível da preparação policial. Identificar como outro objetivo de estudo e manter o contexto ENEM ao abrir ferramentas compartilhadas.

## Revisão de cada item

| Grupo atual | Item | Avaliação e recomendação |
| --- | --- | --- |
| Planejamento | Área do aluno | Correto como painel inicial separado das funções de planejamento. “Início” ou “Meu painel” é mais direto. |
| Planejamento | Estratégia de estudos | Correto no grupo. Definir como configuração principal da preparação; já oferece visão semanal. |
| Planejamento | Cronograma por edital | Correto no grupo. Explicar que é a execução dos tópicos do edital, evitando parecer outro plano independente. |
| Planejamento | Plano por resultados | Correto no grupo, mas sobrepõe configurações. Apresentar como ajuste do planejamento pelos resultados, com origem dos dados explícita. |
| Meu concurso | Meu concurso | Correto como resumo do objetivo. “Meu objetivo” distingue a página do catálogo. |
| Meu concurso | Meu edital | O lugar está correto; o nome promete um edital já escolhido, mas sem seleção mostra um catálogo. Preferir “Estudar pelo edital” e indicar a edição ativa. |
| Meu concurso | Carreiras | Útil para explorar objetivos; não substitui concurso específico. Preferir acesso dentro da seleção de objetivo, sem removê-lo. |
| Meu concurso | Concursos e editais | Página de descoberta e escolha; “Buscar concursos” comunica melhor a ação e reduz sobreposição com Meu edital. |
| Meu concurso | Radar do edital | Função analítica válida: cruza programa e histórico de cobrança. Agrupar com panorama e bancas em “Análise do concurso”. |
| Meu concurso | Panorama das provas | Mantê-lo como análise do acervo, distinguindo de desempenho pessoal. O título “Panorama e tendências” deve corresponder ao menu. |
| Meu concurso | Perfil das bancas | Correto junto da análise do concurso. Não é redundância do panorama: o recorte é a banca. |
| Material didático | Visão geral do material | Hub útil, mesmo com links também presentes no menu. Usar um título que identifique Material didático antes da frase promocional. |
| Material didático | Legislação e súmulas | Correto. A página se apresenta como Biblioteca de leis; uniformizar os nomes e manter súmulas claramente localizáveis. |
| Material didático | Leis extravagantes | Sobreposição de descoberta com a biblioteca. Manter como categoria/localizador “Leis especiais” dentro da legislação. |
| Material didático | Disciplinas | Correto. As disciplinas já reúnem materiais e vídeos: deixar claro que este é o acesso por matéria. |
| Material didático | Videoaulas e podcasts | Correto como acesso por formato. Não apagar por haver vídeos nas disciplinas; usar os mesmos conteúdos e filtros. |
| Material didático | Dicionário de estudo | Complementar. Pode ser acesso secundário e consulta contextual nos textos, sem a mesma prioridade dos materiais principais. |
| Material didático | Redação para concursos | Adequado como aprendizado de discursivas. Uniformizar com o título “Treino de redação” e explicar a relação com Redação do ENEM. |
| Ferramentas | Foco e revisão | Melhor junto do planejamento/rotina. A revisão rápida de flashcards é um atalho útil, não um segundo cadastro de cartões. |
| Ferramentas | Calculadora penal | Recurso jurídico especializado; associar à legislação penal, com acesso secundário em ferramentas se necessário. |
| Ferramentas | Painel do CTB | Melhor em legislação/Trânsito: organiza conteúdo de multas, pontos, prazos e resoluções, não apenas uma ferramenta genérica. |
| Questões | Treinador de questões | Correto como entrada principal de prática. |
| Questões | Caderno de erros | Correto. Tornar explícito que é automático a partir dos erros do treinador. |
| Questões | Flashcards | Revisão por cartões, não apenas questões. Pode ficar no grupo se renomeado “Questões e revisão”; preservar um único baralho e agendamento. |
| Questões | Meus cadernos | Correto. Nome próximo de Caderno de erros; “Coleções de questões” ou “Meus cadernos de questões” explica que são organizados manualmente. |
| Questões | Acervo de questões | Catálogo que abre o treinador com filtros: não é outro motor de resolução. “Explorar questões” diferencia descoberta e prática. |
| Provas | Simulador de provas | Correto. Padronizar “Simulados” com o atalho inferior do celular. |
| Provas | Minhas provas e diagnóstico | Correto como registro de provas realizadas. Preferir “Provas realizadas e diagnóstico”; manter identificação da página mesmo quando vazia. |
| ENEM | ENEM | Área independente com materiais, questões e redação. Manter explicitamente separada dos objetivos policiais e evitar perder o contexto nos atalhos compartilhados. |
| Desempenho | Meu desempenho | Correto. Já explica que mede estudo na plataforma e aponta para provas realizadas; manter essa distinção. |
| Desempenho | Histórico de atividades | Correto. A página usa “Histórico de estudos”; uniformizar nome. Histórico cronológico e indicadores agregados são complementares. |
| Desempenho | Ranking | Correto como comparação; é secundário em relação ao progresso pessoal. |
| Desempenho | Medalhas | Correto como conquistas; pode ficar em um subgrupo junto do ranking, sem remoção. |
| Conta | Plano e uso | Correto. A página diz “Planos e uso”; preferir “Plano e assinatura”, incluindo consumo de recursos na descrição. |
| Conta | Perfil | Correto para dados pessoais. Há resumo e gestão de assinatura também aqui; manter resumo com link para a área principal de plano, evitando dois locais de gestão. |

## Repetições úteis que devem ser preservadas

- Barra inferior do celular e menu completo podem abrir as mesmas páginas: são atalhos para destinos únicos.
- Hub de materiais, estudo por disciplina e filtro por vídeo são portas distintas para o mesmo acervo.
- Caderno de erros, cadernos manuais e flashcards têm objetivos diferentes; precisam de descrições, não de exclusão.
- Meu desempenho mede atividades na plataforma; provas realizadas analisam concursos registrados. A ligação entre eles é útil.
- Revisão rápida em Foco e revisão reaproveita os flashcards existentes; o acesso completo ao baralho permanece em Flashcards.

## Proposta de hierarquia

1. Início.
2. Meu planejamento: configuração, agenda por edital, ajustes pelos resultados, sessão de foco.
3. Meu objetivo: objetivo ativo, buscar concursos, estudar pelo edital, análise do concurso (radar, panorama e bancas).
4. Materiais: legislação e súmulas, leis especiais e CTB como categorias jurídicas, disciplinas, vídeos e podcasts, redação e dicionário.
5. Questões e revisão: treinador, explorar questões, erros, coleções e flashcards.
6. Provas: simulados e provas realizadas com diagnóstico.
7. Desempenho: indicadores, histórico e conquistas (ranking/medalhas).
8. Conta: dados pessoais, plano e assinatura.
9. ENEM: espaço separado para esse objetivo, preservando acesso às funções compartilhadas com o contexto correto.

A calculadora penal pode ser recurso contextual dentro da legislação penal; nenhum recurso precisa ser eliminado.

## Evidências no projeto

- `src/components/dashboard/DashboardLayout.tsx`: inventário, autorização e atalhos móveis.
- `src/components/dashboard/DashboardNavigation.tsx`: nove seções e descrições.
- `src/components/dashboard/StudentSectionNavigation.tsx`: acessos internos por seção.
- `src/components/dashboard/StudyPlanningNav.tsx`: três planejamentos já separados com descrições próprias.
- `src/lib/studentNavigation.ts`: destinos principais de cada seção.
- `src/lib/navigationSearch.ts`: descrições e sinônimos da busca; atualizar junto de qualquer renomeação.
- Rotas visitadas: todas as 35 do inventário acima, incluindo `library?collection=laws`.
- `study-coach` usa `study_profiles`; a seleção de concurso usa `profiles.focused_contest_id`. São configurações distintas; isso exige revisar a continuidade do objetivo, não permite presumir sincronização automática.
- A página `performance` já diferencia explicitamente estudos na plataforma de provas realizadas; preservar essa explicação.

## Ordem sugerida de execução

Primeiro padronizar nomes e descrições, manter os títulos nos estados vazios e explicitar a função dos três planejamentos. Depois reorganizar materiais e recursos jurídicos. Por último revisar a continuidade de objetivo/configurações entre áreas, que exige validação com dados e rotinas reais. Não fundir bancos de dados, apagar páginas ou alterar regras de acesso como consequência automática de uma mudança de menu.


## Implementação após a auditoria

Aplicada a organização por Meu planejamento, Meu objetivo, Materiais, Questões e revisão, Provas, Desempenho e Conta. ENEM permanece separado em Outros objetivos. Sessão de foco passou ao planejamento; CTB e calculadora penal passaram a Materiais/Legislação. As páginas de objetivo e materiais têm segmentos identificados, sem aumentar a largura da barra lateral.

Os quatro acessos de planejamento explicam configuração, agenda, ajustes pelos resultados e foco. Nomes de menu e títulos foram alinhados; nomes anteriores continuam aceitos na busca. Os dados e as configurações de cada função foram preservados, com a origem dos parâmetros do diagnóstico explícita. Não houve fusão automática de planos ou migração de dados.

Gestão de assinatura, histórico, cancelamentos e recibos foram concentrados em Plano e assinatura; o perfil mantém dados pessoais, resumo do plano, saída da conta e acesso direto à gestão. A página de provas realizadas preserva título e identificação nos estados vazio, de carregamento e de erro. Foco aberto pelo ENEM mantém matérias e links do exame.

Verificação com autenticação e dados simulados: todas as 35 páginas, busca pelos nomes anteriores, seleção de seção, consulta de legislação com parâmetro preservado, menus em 390 e 820 px e separação da área administrativa.

A pedido posterior, os relógios de data/hora e tempo ativo foram retirados da barra superior. O registro de estudo permanece independente da interface. O cronômetro de questão foi movido para uma linha própria, com mostrador tático e tempo digital em colunas separadas, preservando estados pausado/finalizado.
