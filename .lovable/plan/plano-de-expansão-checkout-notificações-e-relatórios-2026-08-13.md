# Plano de Expansão: Checkout, Notificações e Relatórios

Este plano detalha a implementação do fluxo financeiro real, sistema de alertas e relatórios avançados para o Norte Concurso.

## Objetivos
1. Criar página de Checkout dedicada e gerenciar ciclos de assinatura.
2. Implementar sistema de notificações (estudos e concursos).
3. Gerar relatórios mensais consolidados com exportação em PDF.
4. Refinar a busca e filtros em "Meus Cadernos".

## Ações Propostas

### 1. Checkout e Assinaturas (`/checkout` e `/dashboard/profile`)
- **Página de Checkout**: Nova rota `/checkout/$planId` para revisão do plano e seleção de método de pagamento (Stripe).
- **Gerenciamento**: No perfil, exibir status da assinatura (Ativa, Pendente, Cancelada) com botões para Downgrade/Upgrade e Cancelamento.
- **Lógica de Servidor**: Atualizar `src/lib/stripe.functions.ts` para suportar diferentes tipos de transação.

### 2. Sistema de Notificações
- **Central de Notificações**: Menu no Dashboard para visualizar alertas.
- **Alertas de Estudo**: Lembretes baseados no `study-plan` (ex: "Hora de Português!").
- **Alertas de Concurso**: Notificações automáticas X dias antes da prova do concurso focado.
- **Implementação**: Persistência em nova tabela `notifications` no Supabase.

### 3. Relatórios e Performance (`/dashboard/performance`)
- **Relatório Mensal**: View dedicada com gráficos de evolução mensal comparativa.
- **Exportação PDF**: Gerar documento formatado com logo do Norte Concurso, estatísticas do mês e recomendações do mentor.

### 4. Busca e Filtros em Cadernos (`/dashboard/notebooks`)
- **Busca por Assunto**: Campo de pesquisa rápida.
- **Filtros Avançados**: Filtrar questões dentro de um caderno por Banca, Dificuldade ou Status (Respondida/Não).

## Detalhes Técnicos
- **PDF**: Utilizar `@react-pdf/renderer` ou `jspdf`/`html2canvas` para geração de relatórios.
- **Real-time**: Supabase Realtime para notificações instantâneas.
- **Stripe**: Integração com Stripe Checkout e Billing Portal.
