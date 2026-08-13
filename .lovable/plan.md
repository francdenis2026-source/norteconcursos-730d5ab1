# Plano de Implementação: Gamificação e Refinamento de Conteúdo

Este plano foca em transformar o Norte Concurso de uma ferramenta funcional em uma experiência engajadora e rica em conteúdo, preenchendo as lacunas identificadas na auditoria de Agosto de 2026.

## Funcionalidades a Criar

### 1. Sistema de Gamificação (Engajamento)
- **Study Streaks (Ofensivas)**: Implementar um contador de dias consecutivos de estudo com ícone de fogo no cabeçalho.
- **Conquistas e Medalhas**: Criar um sistema de badges (ex: "Madrugador", "Mestre da Sintaxe") visíveis no perfil.
- **Ranking Real de Simulados**: Evoluir o ranking anônimo para processar resultados reais de `mock_exam_results` do banco de dados.

### 2. Enriquecimento Pedagógico
- **Suporte a Imagens e Fórmulas**: Atualizar o editor Rich Text e o motor de questões para suportar uploads de imagens (via Supabase Storage) e renderização de LaTeX para fórmulas matemáticas.
- **Links de Teoria**: Adicionar campos para URLs de vídeo-aulas ou PDFs de teoria diretamente nos comentários do professor.

### 3. Automação do Plano de Estudos
- **Gerador de Ciclos Inteligente**: Criar um algoritmo que sugere a distribuição de horas baseada no peso da matéria no edital e no desempenho histórico do aluno (matérias com menor acerto ganham mais tempo).

### 4. Refinamento PWA e Mobile
- **Modo Offline**: Configurar o Service Worker para cachear blocos de questões, permitindo o estudo sem conexão ativa.

## Detalhes Técnicos

### Banco de Dados (Supabase)
- **Tabela `user_streaks`**: Para rastrear `last_activity_date` e `current_streak`.
- **Tabela `achievements`**: Para armazenar definições de conquistas.
- **Tabela `user_achievements`**: Tabela de ligação para conquistas conquistadas.
- **Tabela `question_media`**: Para gerenciar anexos de imagens vinculados a `questions`.

### Frontend (React/TanStack)
- **Componente `StreakCounter`**: Widget flutuante no sidebar/header.
- **Integração `react-katex`**: Para renderização de fórmulas matemáticas nas questões.
- **Hook `useGamification`**: Para centralizar a lógica de verificação de conquistas após cada resposta.

## Próximos Passos Sugeridos
1. Criar a infraestrutura de banco de dados para Streaks e Rankings reais.
2. Implementar o suporte a imagens no editor admin e na exibição de questões.
3. Adicionar o widget de ofensiva (streak) no dashboard para feedback imediato ao usuário.
