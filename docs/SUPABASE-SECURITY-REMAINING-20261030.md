# Auditoria Supabase — riscos restantes (30/10/2026)

Projeto: `gkwphadbveiyjcwiiizw`. Diagnósticos do Supabase Security Advisor, após a migração `20261030100000`.

## Situação confirmada

| Verificação | Alertas |
|---|---:|
| Funções com search_path alterável | 0 |
| Funções SECURITY DEFINER acessíveis por anon | 12 |
| Funções SECURITY DEFINER acessíveis por authenticated | 58 |
| Tabelas com RLS ativo e sem políticas | 4 |
| Proteção contra senhas vazadas | 1 |

Os alertas são pontos para revisão, não provas automáticas de exploração. As 9 correções de search_path e as revogações de EXECUTE foram aplicadas e verificadas com nova execução do Security Advisor.

## Funções ainda acessíveis sem login

- Utilitários/dados aparentemente públicos: `contains_profanity`, `exam_panorama`, `get_daily_guest_questions`, `get_public_leaderboard`, `get_public_question_count`, `get_public_question_summary`, `get_public_study_presence`, `get_question_comments`, `get_question_training_stats`, `get_ranking`.
- Envio de suporte para visitantes: `submit_support_request`.
- Verificação de função: `has_role(uuid, app_role)`.

**Não revogar todas essas permissões indiscriminadamente**: o visitante precisa das funcionalidades públicas. A função `has_role` exige revisão de privacidade e chamadas indiretas: 58 políticas RLS públicas a referenciam, portanto uma mudança sem testes poderia bloquear o aplicativo.

## Tabelas RLS sem políticas

- `daily_guest_question_items`
- `daily_guest_question_sets`
- `idecan_admin_explanation_audit`
- `idecan_admin_metadata_audit`

É possível que seja intencional para bloquear acesso direto, enquanto operações internas usam funções `SECURITY DEFINER`. Não adicionar políticas permissivas apenas para eliminar alertas.

## Atenções para etapa seguinte

1. Testar visitantes e contas Free/Essential/Plus/Premium; testar administração de alunos, login e registro.
2. Inspecionar a função legada `check_user_tier_limit`: há condições ambiguamente escritas (`user_id = user_id`) e mapeamento antigo de roles para planos. Não alterar políticas de planos sem verificar consumidores.
3. Revisar o corpo, as chamadas e a exposição de dados de `has_role` e das funções públicas de estatísticas.
4. Ativar manualmente a proteção de senhas vazadas no painel Auth do Supabase, avaliando compatibilidade de plano.
5. Revisar as 58 funções `SECURITY DEFINER` acessíveis a usuários autenticados, mantendo checagens internas de admin, assinatura e propriedade dos dados.
6. Investigar índices de chaves estrangeiras assinalados pelo Performance Advisor, priorizando consultas reais; criar índices apenas após análise do custo.

Nenhuma correção de RLS ou de assinaturas é incluída neste documento.
