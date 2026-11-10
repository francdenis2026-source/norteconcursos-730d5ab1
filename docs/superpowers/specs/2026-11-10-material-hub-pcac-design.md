# Área de materiais orientada ao PC-AC 2026

## Intenção
Tornar `/dashboard/material` uma central de estudo clara para quem se prepara para concursos, com o PC-AC 2026 em destaque e o catálogo geral preservado para outros objetivos.

## Objetivos
- Mostrar imediatamente o edital PC-AC 2026, cargo selecionado e progresso.
- Priorizar disciplinas e tópicos do edital que já possuem materiais, trilhas, vídeos e questões.
- Manter leis, súmulas e materiais gerais acessíveis na mesma página.
- Reduzir a sensação de catálogo genérico e melhorar a hierarquia visual em celular e desktop.

## Fora do escopo
- Alterar o conteúdo oficial do edital.
- Remover materiais de outros concursos.
- Inventar disciplinas, pesos ou tópicos que não estejam no edital verticalizado existente.
- Substituir a rota completa do edital PC-AC.

## Abordagem escolhida
Adicionar um bloco de destaque do PC-AC 2026 no topo do hub, alimentado pelos dados já existentes em `pc-acre-edital.tsx`/`pcAcreMasterPlan`, com links para o edital verticalizado, cronograma e materiais por disciplina. Abaixo, manter busca global, leis, disciplinas gerais e recursos complementares, com separação visual clara.

## Resultado esperado
A primeira ação da página será continuar o estudo do PC-AC 2026; quem estuda outro concurso continuará encontrando o catálogo geral sem mudança de rota.
