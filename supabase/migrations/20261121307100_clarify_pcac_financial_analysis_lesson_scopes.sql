-- Clarifica o escopo de duas aulas de análise financeira para evitar sobreposição de títulos.
update public.study_materials as m
set title = v.title, summary = v.summary, updated_at = now()
from (values
("pcac-2026-contabilidade-07-analise-movimentacoes-financeiras-conciliacao","Conciliação financeira e rastreabilidade de demonstrativos","Organiza a conciliação entre extratos, razão, comprovantes e controles internos, explicando lançamentos pendentes, diferenças de datas, estornos, tarifas e rastreabilidade."),
("pcac-2026-contabilidade-analise-financeira-conciliacao-fracionamento-atipicidade","Análise de fluxos financeiros e operações atípicas","Ensina a reconstruir fluxos de entradas e saídas, identificar recorrência, fracionamento, concentração e circularidade, e separar fatos, indícios, hipóteses e conclusões.")
) as v(slug, title, summary)
where m.slug = v.slug;