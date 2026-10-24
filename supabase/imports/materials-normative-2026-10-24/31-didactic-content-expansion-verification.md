# Expansão didática segura — 24/10/2026

Atualização aplicada diretamente em `public.study_materials.body_md` no Supabase, sem alterações em componentes React, rotas, migrações, permissões, tabelas ou código de produção.

## Materiais ampliados

| Slug | Novo bloco |
| --- | --- |
| contabilidade-conceito-objeto-usuarios | Oficina aplicada — quem precisa da informação contábil? |
| contabilidade-patrimonio-equacao-fundamental | Oficina aplicada — a equação em quatro movimentos |
| contabilidade-estoques-cpc-16 | Oficina aplicada — custo de aquisição e valor realizável líquido |
| contabilidade-demonstracoes-contabeis-lei-6404 | Oficina aplicada — qual demonstração é exigida? |
| informatica-protocolos-dns-dhcp-http | Laboratório de diagnóstico — o que falhou? |
| rlm-proposicoes-negacao-condicionais | Oficina aplicada — negação e contrapositiva |

## Validação

Após as atualizações, uma consulta de leitura confirmou:
- seis materiais com `content_status='active'`;
- presença do novo bloco didático em todos os seis;
- `jsonb_array_length(quiz)=20` em cada um;
- comprimento do conteúdo Markdown maior que antes da ampliação.

O conteúdo foi adicionado ao final de `body_md`, sem alterar `quiz`, `flashcards`, identificadores ou vínculos de edital.

**Limitação:** verificação realizada no banco. Não foi executado build nem teste visual do site; nenhuma mudança de código de interface foi feita neste commit.

## Consulta de conferência

```sql
select slug, content_status, length(body_md) as body_length,
       jsonb_array_length(quiz) as quiz_count,
       (body_md like '%## Oficina aplicada%' or
        body_md like '%## Laboratório de diagnóstico%') as has_workshop
from public.study_materials
where slug in (
  'contabilidade-conceito-objeto-usuarios',
  'contabilidade-patrimonio-equacao-fundamental',
  'contabilidade-estoques-cpc-16',
  'contabilidade-demonstracoes-contabeis-lei-6404',
  'informatica-protocolos-dns-dhcp-http',
  'rlm-proposicoes-negacao-condicionais'
)
order by slug;
```
