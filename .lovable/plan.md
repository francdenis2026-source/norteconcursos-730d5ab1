# Plano de Implementação: Expansão e Refinamento do Norte Concurso

Este plano detalha as próximas etapas para transformar os placeholders atuais em funcionalidades completas e robustas, focando na experiência do estudante e na gestão administrativa.

## Mudanças Propostas

### 1. Simulação Completa de Provas (Mock Exams)
- Implementar um motor de geração de simulados que seleciona questões baseado no edital do concurso foco.
- Adicionar cronômetro persistente (mesmo com refresh da página) e sistema de "marcar para depois".
- Criar a tela de correção comentada pós-simulado com cálculo de nota de corte estimada.

### 2. Edital Verticalizado Dinâmico (My Contest)
- Substituir a lista estática por um sistema que puxa os tópicos do edital cadastrado no banco.
- Permitir que o usuário marque tópicos como "Lido", "Resumido" ou "Revisado", com barra de progresso visual.
- Integrar com o banco de questões para mostrar a performance do usuário em cada tópico específico do edital.

### 3. Sistema de Notificações Inteligentes
- Implementar lembretes de estudo baseados no "Plano de Estudos" configurado.
- Adicionar alertas de "reta final" (ex: "Faltam 10 dias para a prova da PF!").
- Criar um centro de notificações (Inbox) para avisos do sistema e novos materiais.

### 4. Gestão Avançada de Questões (Admin)
- Implementar o upload de imagens para enunciados e alternativas.
- Criar sistema de "Comentários do Professor" em Markdown/Rich Text.
- Adicionar ferramenta de importação em massa via CSV com validação de esquema.

### 5. Persistência de Cronômetro e Metas
- Sincronizar as sessões do Pomodoro com o histórico de estudos para gerar gráficos de "Horas Líquidas".
- Permitir a configuração de metas semanais de questões e horas de estudo no Dashboard.

## Detalhes Técnicos

### Banco de Dados (Supabase)
- Criar tabela `exam_mockups` para armazenar sessões de simulados em andamento.
- Criar tabela `syllabus_progress` para o edital verticalizado (relação `user_id`, `contest_id`, `topic_id`).
- Criar tabela `study_goals` para metas personalizadas.
- Criar tabela `notifications` com suporte a `read_at` e `type`.

### Frontend (React/TanStack)
- Utilizar `useInterval` customizado para o cronômetro do simulado.
- Implementar componentes de "Rich Text Editor" (ex: Tiptap ou similar leve) para o Admin.
- Refatorar `MockService` para utilizar `createServerFn` nas operações críticas de validação e escrita.

## Próximos Passos
1. Executar migrações SQL para as novas tabelas.
2. Implementar a lógica de geração de simulados em `MockService`.
3. Criar a interface de progresso do edital em `my-contest.tsx`.
4. Integrar o sistema de metas no `performance.tsx`.
