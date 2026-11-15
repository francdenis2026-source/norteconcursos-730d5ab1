-- Nota editorial da questão Consulplan/CFC 2020.1 sobre ROI: distinguir giro do ativo de capital de giro.
update public.study_materials set body_md=body_md||'

### Nota de auditoria da redação — questão ROI (CFC 2020.1)

A afirmativa III do enunciado usa a expressão “capital de giro”, mas a comparação numérica de 1,20 e 1,22 corresponde ao **giro do ativo** (vendas ÷ ativo), não ao capital de giro líquido (ativo circulante − passivo circulante). A alternativa B (I, III e IV) acompanha a interpretação numérica de giro do ativo adotada pela questão. Em prova, não confunda os dois conceitos; a redação da afirmativa é imprecisa.
',updated_at=now() where slug='pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio' and content_status='active' and body_md not like '%Nota de auditoria da redação — questão ROI (CFC 2020.1)%';