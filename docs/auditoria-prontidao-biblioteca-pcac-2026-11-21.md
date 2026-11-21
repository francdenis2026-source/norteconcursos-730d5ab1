# Auditoria de prontidão da biblioteca PC-AC — 21/11/2026

## Inventário confirmado no Supabase
- 454 registros em `study_materials`.
- 30 registros com `content_status = under_review`: Informática 17; Raciocínio Lógico 5; Contabilidade Geral 5; Direito Processual Civil 2; Direito Constitucional 1.
- Os 17 registros de Informática em revisão são marcadores de importação de PDF (aprox. 155 caracteres) e não aulas desenvolvidas; todos estão sem `quiz`. **Não publicar como conteúdo concluído.**
- Os cinco materiais de RLM em revisão contêm texto, mas não questões em `quiz`.
- Os materiais jurídicos em revisão somam 43 questões no campo `quiz` (3 + 20 + 20).
- Não há evidência de que o número histórico “48” corresponda a 48 materiais jurídicos ainda pendentes. Não confundir lotes e métricas.

## Critérios objetivos de liberação
1. Substituir cada marcador de Informática por aula revisada, rastreada até seu PDF original, com explicação acessível, exemplos e duas questões autorais comentadas.
2. Adicionar e testar questões para os cinco materiais de RLM; validar cálculos e gabaritos.
3. Revisar as cinco aulas de Contabilidade contra CPC/NBC aplicáveis.
4. Revisar os três materiais jurídicos contra fontes oficiais e jurisprudência vigente, com ressalvas onde necessárias.
5. Validar contagem, persistência e feedback do treinador, visualização no modo claro/escuro e testes de regressão.
6. Não alterar `content_status` para `active` sem revisão substancial e testes.

## Correções já efetuadas diretamente no banco
- Pensão alimentícia: justificativa do art. 1.700 do CC, com ressalvas jurisprudenciais.
- Formação/suspensão/extinção: justificativas dos arts. 312 e 486 do CPC e interpretação do art. 313, VIII.

## Consultas de validação
```sql
select discipline, count(*) from public.study_materials
where content_status = 'under_review'
group by discipline order by discipline;

select slug, length(coalesce(body_md,'')) as caracteres,
       jsonb_array_length(coalesce(quiz::jsonb,'[]'::jsonb)) as questoes
from public.study_materials
where content_status = 'under_review'
order by discipline, slug;
```

**Estado:** inventário verificado; revisão de conteúdo e testes ainda pendentes. Este documento não constitui aprovação dos materiais.
