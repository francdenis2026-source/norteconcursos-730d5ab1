-- PC-AC 2026 — financial movement analysis.
-- Removes misplaced CPC 26 and adds evidence traceability, contextual analysis
-- and reporting standards for financial-flow review.

update public.study_materials
set body_md=split_part(body_md,E'\n## Classificação dos passivos financeiros — CPC 26',1)
|| E'\n\n## 8. Rastreabilidade e integridade dos registros\n\nUma análise financeira confiável precisa permitir que outra pessoa refaça o caminho do dado até a conclusão. Registre a fonte de cada informação, data e hora de obtenção, identificador da transação, conta de origem e destino, valor, documento de suporte e qualquer transformação feita na planilha ou sistema. Preserve o arquivo original e trabalhe sobre cópias controladas.\n\nNão altere o registro original para “corrigir” uma divergência. Documente o ajuste, a justificativa, o responsável e a data. Isso mantém trilha de auditoria e permite reproduzir a análise.\n\n## 9. Indicadores e alertas: como interpretar sem concluir além das provas\n\nSinais que podem justificar aprofundamento: transferências repetidas em intervalos curtos, valores fracionados, movimentação incompatível com o histórico conhecido, concentração de créditos e débitos em poucos participantes, circularidade de transferências e divergências entre documentos.\n\nEsses padrões não comprovam, sozinhos, fraude ou crime. Podem ter explicações legítimas, como pagamentos parcelados, fluxo de caixa, operações entre empresas relacionadas ou prazos bancários. A análise deve comparar contexto, documentação, origem, destino e padrão histórico.\n\n## 10. Estrutura de um relatório objetivo\n\nUm relatório deve separar fatos observados, método, divergências, hipóteses, limitações e conclusão proporcional às evidências. Indique dados faltantes, períodos incompletos, documentos não disponíveis e restrições de acesso.\n\n**Dica de prova:** indício orienta investigação; não substitui prova. Use linguagem proporcional à evidência e não transforme uma coincidência temporal em relação causal sem suporte.\n',
updated_at=now()
where contest_name='PC-AC 2026'
and slug='pcac-2026-contabilidade-07-analise-movimentacoes-financeiras-conciliacao';

-- Preserve nine trainer items, including the two previously duplicated concepts,
-- which are replaced with distinct numerical and evidentiary reasoning questions.
