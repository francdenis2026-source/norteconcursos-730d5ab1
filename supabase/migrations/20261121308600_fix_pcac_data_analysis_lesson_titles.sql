-- Corrige títulos desalinhados com o conteúdo dos módulos de Análise de Dados.
update public.study_materials as m
set title=v.title, summary=v.summary, updated_at=now()
from (values
('pcac-2026-guia-analise-dados-04-cruzamento-registros-vinculacao','04 · Cruzamento de registros e vinculação de dados','Chaves e identificadores, padronização, correspondência determinística e aproximada, falsos positivos e negativos, duplicidades, validação, privacidade e rastreabilidade.'),
('pcac-2026-guia-analise-dados-08-estatistica-outliers-hipoteses','08 · Métodos de análise: hipóteses, consistência e causalidade','Distingue fatos, inferências e hipóteses; formula e compara explicações; identifica contradições e lacunas; avalia consistência e correlação versus causalidade.')
) as v(slug,title,summary)
where m.slug=v.slug;