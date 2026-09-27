-- Populates contest_reference_info with cutoff scores (nota de corte) for every
-- contest already in the candidate's panels. Confidence varies per row — see
-- notes. Values not independently confirmed against an official source are left
-- NULL rather than guessed (rows still inserted so the UI can show "não
-- localizado" instead of nothing).
insert into public.contest_reference_info (contest_name,contest_year,exam_board,cutoff_score,scoring_rule,source_url,notes) values
('Agente de Polícia Federal','2014','CEBRASPE',64.00,'Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.',null,'1.416 candidatos classificados na ampla concorrência. Conferido item a item nos PDFs oficiais da CEBRASPE em sessão anterior (ver HANDOFF.md do projeto).'),
('Agente de Polícia Federal','2018','CEBRASPE',68.00,'Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.',null,'551 candidatos classificados na ampla concorrência. Conferido item a item nos PDFs oficiais da CEBRASPE em sessão anterior.'),
('Agente de Polícia Federal','2021','CEBRASPE',75.00,'Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.',null,'2.118 candidatos classificados na ampla concorrência. Conferido item a item nos PDFs oficiais da CEBRASPE em sessão anterior.'),
('Agente de Polícia Federal','2025','CEBRASPE',82.00,'Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.',null,'1.460 candidatos classificados na ampla concorrência. Nota confirmada pelo BDI oficial da CEBRASPE (boletim de desempenho individual do próprio candidato).'),
('Polícia Rodoviária Federal','2019',null,null,'Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.',null,'NÃO LOCALIZADO com confiança nesta sessão — buscas na web retornaram dados conflitantes/misturados com o concurso PRF 2021. Precisa de verificação em fonte oficial (Diário Oficial da União ou edital de resultado final da CEBRASPE).'),
('Polícia Rodoviária Federal','2021','CEBRASPE',73.00,'Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.','https://lsensino.com.br/noticia/resultado-prf-nota-de-corte-e-de-73-pontos-para-ampla-concorrencia-e-de-69-pontos-para-cotas/','Confiança MÉDIA: valor de 73 pontos (ampla concorrência) e 69 (cotas) citado de forma consistente por múltiplas fontes de imprensa especializada em concursos, mas não confirmado diretamente no documento oficial de resultado final da CEBRASPE nesta sessão.'),
('Departamento Penitenciário Nacional','2021',null,null,'Nota líquida (corretas - erradas + anuladas), padrão CEBRASPE.',null,'NÃO LOCALIZADO com confiança nesta sessão — apenas a nota do 1º colocado (122,48) foi encontrada; o ranking do site olhonavaga.com.br está com os valores de nota bloqueados (exige assinatura). Precisa de verificação no Diário Oficial da União (resultado final, publicado em 20/07/2021).'),
('Polícia Penal do Acre','2023',null,null,'Pontuação ponderada: Gerais 1pt/questão (máx 30), Específicos 2pt/questão (máx 60), total 0-90.',null,'NÃO LOCALIZADO com confiança nesta sessão — resultado final foi retificado múltiplas vezes pelo IAPEN/AC; não encontrei o número consolidado definitivo. Precisa de verificação no Diário Oficial do Estado do Acre.')
on conflict (contest_name, contest_year) do update set
  cutoff_score = excluded.cutoff_score,
  scoring_rule = excluded.scoring_rule,
  source_url = excluded.source_url,
  notes = excluded.notes;
