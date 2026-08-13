# Plano de Desenvolvimento: Norte Concurso - Fase 2 (Demonstrativa)

Este plano descreve a implementação da Fase 2 da plataforma Norte Concurso, focada na experiência do aluno e ferramentas de estudo, utilizando exclusivamente dados locais (localStorage e mocks), sem conexões com banco de dados.

## 1. Arquitetura de Dados e Serviços
- **Tipos (src/types):** Definição de interfaces TS para Concursos, Questões, Planos de Estudo, Simulados, etc.
- **Mocks (src/data/mock):** Dados iniciais para demonstração (40+ questões, concursos fictícios).
- **Serviços (src/services):** Camada de abstração que gerencia o localStorage e simula operações de backend.
- **Hooks (src/hooks):** Custom hooks para gerenciar o estado global da aplicação (ex: concurso focado, progresso).

## 2. Área do Aluno (Dashboard e Navegação)
- **Layout:** Sidebar recolhível (Desktop) e Bottom Nav (Mobile).
- **Dashboard:** Resumo de métricas (horas estudadas, taxa de acerto, meta semanal) com gráficos Recharts.
- **Meu Concurso:** Detalhes do foco atual e acesso ao edital verticalizado.

## 3. Banco de Questões e Resolução
- **Listagem:** Filtros avançados por disciplina, assunto, banca e dificuldade.
- **Engine de Questões:** Interface de resolução com cronômetro, riscador de alternativas e feedback imediato/pós-prova.
- **Caderno de Erros:** Fluxo automático de inclusão de questões erradas e revisões sugeridas.

## 4. Planejador e Ferramentas
- **Planejador:** Wizard para gerar cronograma de estudos local.
- **Simulados:** Gerador de provas personalizadas com modo "Prova" (cronômetro regressivo).
- **Cronômetro:** Sessões de estudo contínuas entre abas.
- **Revisões:** Sistema de repetição espaçada (24h, 7d, 30d) baseado em feedback do aluno.

## 5. Painel Administrativo (Demonstrativo)
- Interfaces para gestão de conteúdos (Concursos, Questões) com avisos claros de que as alterações são locais.

## 6. Documentação
- Criação do arquivo `FASE-2-PREPARACAO-BANCO.md` com o mapeamento para a futura integração.

## Detalhes Técnicos
- **Persistência:** `localStorage` para manter o progresso durante a sessão.
- **Gráficos:** `recharts` para visualização de desempenho.
- **Animações:** `framer-motion` para transições suaves.
- **UI:** Mantendo o tema Navy Blue, Emerald Green e Gold.

---
**NENHUM BANCO DE DADOS SERÁ CRIADO OU ALTERADO NESTA ETAPA.**
