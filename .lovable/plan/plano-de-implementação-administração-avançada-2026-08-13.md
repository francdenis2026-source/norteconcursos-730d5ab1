---
title: Gestão Administrativa Avançada e Exportação de Assinaturas
description: Implementação de exportação CSV de logs, modal de confirmação administrativa e lógica de datas efetivas para assinaturas.
---

# Plano de Implementação - Administração Avançada

Implementar ferramentas de controle administrativo mais robustas, incluindo exportação de dados, interfaces de confirmação seguras e precisão temporal no acesso dos usuários.

## Alterações Propostas

### Backend / Mock Service (`src/services/mockService.ts`)
- **Exportação CSV**: Criar função utilitária para converter `subscription_audit_logs` em formato CSV compatível com Excel/Sheets.
- **Lógica de Datas Efetivas**: 
    - Adicionar campos `effective_date` nos logs de downgrade e cancelamento.
    - Atualizar `useAuthStatus` (ou o loader correspondente) para verificar se a data atual ultrapassou a `effective_date` antes de aplicar a restrição de acesso.
- **Emails Reais**: Implementar integração com o provedor de e-mail (ou simular com logs detalhados de template) para envio de confirmações de alteração de plano.

### Interface Administrativa (`src/routes/dashboard/admin.tsx`)
- **Exportação de Logs**: Adicionar botão "Exportar CSV" na aba de Histórico/Audit.
- **Modal de Confirmação**: 
    - Substituir `prompt()` por um componente `Dialog` (shadcn).
    - Incluir campo de "Motivo" obrigatório com validação visual.
    - Exibir resumo do plano atual vs. novo plano e a data em que a mudança entrará em vigor.

### Segurança e Auditoria
- **Garante que o motivo seja persistido** no metadado do log de auditoria do Supabase.
- **Validação no Client**: Impedir ações administrativas sem a presença de um motivo preenchido no modal.

## Detalhes Técnicos
- Utilizar `Blob` e `URL.createObjectURL` para download do CSV no navegador.
- O campo `effective_date` será calculado com base no final do ciclo de faturamento (simulado como 30 dias após o início ou fim do mês atual).

## Próximos Passos
1. Modificar o service para suportar exportação e metadados de data.
2. Criar o componente de Modal de Ação Administrativa.
3. Integrar o modal nas ações de Downgrade e Cancelamento no `admin.tsx`.
4. Adicionar a funcionalidade de download de CSV.
