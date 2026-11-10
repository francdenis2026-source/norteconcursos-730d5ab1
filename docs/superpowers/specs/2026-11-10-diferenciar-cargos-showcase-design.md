# Design: diferenciação visual dos cargos no showcase de concursos

## Intenção

Permitir que o aluno reconheça imediatamente qual cargo está escolhendo quando várias oportunidades pertencem ao mesmo concurso ou órgão.

## Decisão

Manter os cartões lado a lado, mas usar uma identidade cargo-primeiro: sigla/nome do concurso como contexto, cargo como título principal, e carreira, escolaridade e banca como metadados visíveis. O destaque seguirá a mesma hierarquia para não criar duas regras visuais.

## Fora do escopo

Não alterar dados, seleção do objetivo, URLs oficiais ou regras de carregamento.

## Critério de sucesso

Dois cargos do mesmo concurso devem ter títulos e etiquetas diferentes sem depender da linha secundária; a ação “Definir como objetivo” deve continuar vinculada ao `contest.id` correto.
