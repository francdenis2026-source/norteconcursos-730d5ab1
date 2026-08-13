# Plano de Desenvolvimento: Norte Concurso - Finalização do MVP

Este plano detalha a implementação das funcionalidades pendentes e o refinamento das ferramentas existentes para concluir o MVP da plataforma Norte Concurso.

## Objetivos
1. Transformar placeholders em funcionalidades reais (Cadernos e Meu Concurso).
2. Refinar o Cronômetro e o Plano de Estudos com lógica funcional.
3. Implementar a importação em massa de questões no Painel Admin.
4. Fortalecer a persistência de dados no Supabase.

## Ações Propostas

### 1. Funcionalidade "Meus Cadernos" (`/dashboard/notebooks`)
- Criar interface para listar, criar e editar cadernos de questões.
- Implementar seleção de questões para adicionar a cadernos específicos.
- Salvar cadernos no Supabase/localStorage via `MockService`.

### 2. Funcionalidade "Meu Concurso" (`/dashboard/my-contest`)
- Tela de acompanhamento do concurso focado.
- Exibir progresso específico por edital verticalizado (checklist de matérias estudadas).
- Widget de contagem regressiva para a data da prova.

### 3. Refinamento de Ferramentas
- **Timer (`/dashboard/timer`):** Adicionar modo Pomodoro com intervalos e registro automático de tempo estudado no perfil do usuário.
- **Plano de Estudos (`/dashboard/study-plan`):** Permitir edição real dos blocos (drag-and-drop ou formulário) e salvar a configuração.
- **Simulados (`/dashboard/mock-exams`):** Implementar o fluxo real de geração de prova com questões aleatórias filtradas por concurso.

### 4. Expansão Admin (`/dashboard/admin`)
- **Importação CSV/Excel:** Criar ferramenta para upload de arquivos e processamento em massa de questões.
- **Gerenciamento de Entitlements:** Interface para editar permissões granulares por plano.

### 5. Persistência e Integração
- Garantir que todas as ações (respostas, cadernos, planos) tentem sincronizar com o Supabase antes de cair no fallback local.

## Detalhes Técnicos
- **Banco de Dados:** Utilizar as tabelas `notebooks`, `study_plans`, `questions` e `user_responses` já mapeadas.
- **Estado Global:** Refinar o hook `useDashboardData` para gerenciar o estado dos cadernos e concursos.
- **UI/UX:** Manter o padrão de Navy Blue, Emerald Green e Gold com componentes shadcn/ui.
