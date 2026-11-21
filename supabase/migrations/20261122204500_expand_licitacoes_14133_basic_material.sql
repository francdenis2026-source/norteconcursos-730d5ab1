UPDATE study_materials SET body_md=body_md || '

## Como reconhecer modalidades e critérios na prova

**Modalidade não é critério de julgamento.** Pregão, concorrência, concurso, leilão e diálogo competitivo são modalidades previstas na Lei 14.133/2021. Já menor preço, maior desconto, melhor técnica ou conteúdo artístico, técnica e preço, maior lance e maior retorno econômico são critérios de julgamento. A banca pode apresentar um critério como se fosse modalidade.

**Exemplo cotidiano:** um órgão precisa contratar um serviço comum, cujos padrões de desempenho e qualidade possam ser objetivamente definidos no edital. O pregão é a modalidade prevista para bens e serviços comuns, observadas as regras e exceções legais. Não se deve concluir que todo contrato público será feito por pregão.

**Contratação direta:** dispensa e inexigibilidade não são sinônimos. Na inexigibilidade, a competição é inviável; na dispensa, a lei autoriza contratar diretamente em hipóteses determinadas. Ambas exigem instrução e justificativas legalmente cabíveis.

**Dica de prova:** identifique primeiro se o enunciado descreve modalidade, critério de julgamento, procedimento auxiliar ou contratação direta. O sistema de registro de preços é procedimento auxiliar, não uma sexta modalidade.
',quiz=quiz || '[{"q":"O sistema de registro de preços é uma das cinco modalidades de licitação previstas na Lei 14.133/2021.","a":false,"why":"Errado. O sistema de registro de preços é procedimento auxiliar. As modalidades previstas na Lei 14.133/2021 são pregão, concorrência, concurso, leilão e diálogo competitivo."},{"q":"Na Lei 14.133/2021, menor preço e maior desconto são critérios de julgamento, não modalidades licitatórias.","a":true,"why":"Certo. A lei diferencia modalidades de licitação e critérios de julgamento. Menor preço e maior desconto são critérios utilizados conforme o objeto e as regras aplicáveis."}]'::jsonb,updated_at=now() WHERE slug='administrativo-acervo-licitacoes-14133' AND content_status='active' AND jsonb_array_length(quiz)=1 AND body_md NOT LIKE '%## Como reconhecer modalidades e critérios na prova%';