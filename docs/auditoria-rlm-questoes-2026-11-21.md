# Questões autorais de RLM — espelho de conteúdo da biblioteca

Data: 2026-11-21. Fonte: registros `study_materials.quiz` conferidos no Supabase.

| Slug | Questões autorais | Assunto |
|---|---:|---|
| `rlm-argumentos-validade` | 2 | validade e afirmação do consequente |
| `rlm-equivalencias-leis-morgan` | 2 | De Morgan e contrapositiva |
| `rlm-estatistica-basica-medidas` | 2 | média e mediana |
| `rlm-porcentagem-razao-proporcao` | 2 | percentuais sucessivos e proporção |
| `rlm-sequencias-padroes` | 2 | progressões aritmética e geométrica |

**Verificação:** todos os cinco registros retornaram `jsonb_array_length(quiz::jsonb) = 2`, mantendo `content_status = 'under_review'`.

## Limite importante de integração
`study_materials.quiz` é um campo separado de `curated_question_catalog`. A inserção nas aulas **não prova** que as 10 questões aparecem no treinador ou no contador geral. Não duplicar cegamente as questões no catálogo: antes verificar o fluxo de ingestão, os campos obrigatórios, o vínculo com o edital e a deduplicação.

## Informática
Há 16 registros ativos na disciplina, dos quais 15 são aulas temáticas com 20 questões cada; o 16º é uma trilha consolidada com duas questões. Os 17 registros em revisão continuam marcadores de PDF sem aula integral. Evitar reaproveitar conteúdo temático como se fosse transcrição dos PDFs originais sem verificar correspondência.

## Consulta de regressão
```sql
select slug, jsonb_array_length(quiz::jsonb) as questions, content_status
from public.study_materials
where slug in (
  'rlm-argumentos-validade',
  'rlm-equivalencias-leis-morgan',
  'rlm-estatistica-basica-medidas',
  'rlm-porcentagem-razao-proporcao',
  'rlm-sequencias-padroes'
)
order by slug;
```
